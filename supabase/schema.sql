-- =========================================================
-- Esquilook — estrutura do banco no Supabase
-- Como usar: Supabase → SQL Editor → New query → cole tudo → Run.
-- Pode rodar de novo sem problema: nada é duplicado nem apagado.
-- =========================================================

-- ---------- Tabelas ----------

-- Camisas do armário
create table if not exists public.shirts (
  id          text primary key
              check (id ~ '^[a-z0-9_-]{1,40}$' and id <> '__faltou__'),
  name        text not null check (char_length(name) between 1 and 32),
  color       text not null default '#64748b' check (color ~ '^#[0-9a-fA-F]{6}$'),
  -- Foto: uma das imagens do site ou uma foto enviada (JPEG pequeno em base64)
  img         text check (
                img is null
                or img ~ '^camisas/[a-z0-9_-]+\.webp$'
                or (img ~ '^data:image/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$' and octet_length(img) <= 300000)
              ),
  position    integer not null default 100,
  created_at  timestamptz not null default now()
);

-- Um registro por dia: camisa ou falta
create table if not exists public.entries (
  day         date primary key,
  status      text not null check (status in ('shirt', 'absent')),
  shirt_id    text references public.shirts (id) on delete cascade,
  created_at  timestamptz not null default now(),
  created_by  uuid default auth.uid(),
  constraint entries_shirt_matches_status check ((status = 'shirt') = (shirt_id is not null)),
  constraint entries_in_range check (day between date '2026-10-01' and date '2027-12-31'),
  constraint entries_weekday check (extract(isodow from day) < 6)  -- sábado e domingo: luto
);

-- Configurações (por enquanto, só o nome do amigo)
create table if not exists public.settings (
  key    text primary key check (key in ('friend')),
  value  text not null check (char_length(value) between 1 and 24)
);

-- ---------- Limpeza da 1ª versão do bolão ----------
-- A primeira versão usava um login por pessoa e nunca chegou a ser usada.
-- Estes nomes não existem na versão atual, então apagar é seguro mesmo rodando de novo.
drop trigger if exists bolao_on_auth_user on auth.users;
drop table if exists public.guesses, public.payments, public.expenses, public.profiles cascade;
drop function if exists public.bolao_new_profile() cascade;
drop function if exists public.bolao_role() cascade;
drop function if exists public.bolao_guess_open(date) cascade;
drop function if exists public.bolao_open_counts() cascade;

-- ---------- Tabelas do bolão do lanche ----------
-- Todos usam o mesmo login; cada palpite escolhe o nome do participante.
-- R$ 1 por palpite. Quem acerta descansa no próximo dia útil (mas mantém os pontos).
-- O caixa paga o lanche do mês e a sobra vai para quem fez mais pontos (empate divide).

-- Participantes
create table if not exists public.bolao_participants (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique check (char_length(btrim(name)) between 1 and 24),
  color       text not null default '#4f46e5' check (color ~ '^#[0-9a-fA-F]{6}$'),  -- cor do avatar (inicial do nome)
  active      boolean not null default true,  -- sem exclusão: quem sai é desativado e o histórico fica
  created_at  timestamptz not null default now()
);

-- Palpites: um por participante por dia, definitivo (só entra pela função bolao_place_guess)
create table if not exists public.bolao_guesses (
  day             date not null,
  participant_id  uuid not null references public.bolao_participants (id) on delete restrict,
  -- restrict: camisa com palpite não pode sair do armário (apagaria o resultado do bolão)
  shirt_id        text not null references public.shirts (id) on delete restrict,
  created_at      timestamptz not null default now(),
  primary key (day, participant_id),
  constraint bolao_guesses_in_range check (day between date '2026-10-01' and date '2027-12-31'),
  constraint bolao_guesses_weekday check (extract(isodow from day) < 6)
);

-- Pagamentos (valores em centavos; month = dia 1 do mês).
-- Quem paga pelo QR Code "informa" (confirmed = false); o caixa confere o extrato e confirma.
create table if not exists public.bolao_payments (
  id              uuid primary key default gen_random_uuid(),
  participant_id  uuid not null references public.bolao_participants (id) on delete restrict,
  month           date not null check (extract(day from month) = 1),
  amount_cents    integer not null check (amount_cents between 1 and 100000),
  confirmed       boolean not null default true,
  created_at      timestamptz not null default now()
);
alter table public.bolao_payments add column if not exists confirmed boolean not null default true;

-- Gastos do caixa com o lanche
create table if not exists public.bolao_expenses (
  id            uuid primary key default gen_random_uuid(),
  month         date not null check (extract(day from month) = 1),
  description   text not null check (char_length(btrim(description)) between 1 and 60),
  amount_cents  integer not null check (amount_cents between 1 and 1000000),
  created_at    timestamptz not null default now()
);

-- Meses encerrados: depois disso, nada daquele mês muda
create table if not exists public.bolao_closures (
  month        date primary key check (extract(day from month) = 1),
  prize_cents  integer not null check (prize_cents >= 0),
  winners      text not null default '' check (char_length(winners) <= 300),
  closed_at    timestamptz not null default now(),
  closed_by    uuid default auth.uid()
);

-- Pix do caixa (uma linha só): chave, nome de quem recebe e cidade, usados no QR Code
create table if not exists public.bolao_config (
  id        boolean primary key default true check (id),
  pix_key   text not null default '' check (char_length(pix_key) <= 77),
  pix_name  text not null default '' check (char_length(pix_name) <= 25),
  pix_city  text not null default '' check (char_length(pix_city) <= 15)
);
alter table public.bolao_config add column if not exists pix_name text not null default '' check (char_length(pix_name) <= 25);
alter table public.bolao_config add column if not exists pix_city text not null default '' check (char_length(pix_city) <= 15);

-- ---------- Funções do bolão ----------

-- Hoje em Brasília
create or replace function public.bolao_today()
returns date
language sql
stable
as $$ select (now() at time zone 'America/Sao_Paulo')::date $$;

-- Palpites de um dia fecham ao meio-dia (horário de Brasília); a aula começa às 13:00
create or replace function public.bolao_cutoff(d date)
returns timestamptz
language sql
stable
as $$ select (d + time '12:00') at time zone 'America/Sao_Paulo' $$;

create or replace function public.bolao_prev_weekday(d date)
returns date
language sql
immutable
as $$ select case extract(isodow from d)::int when 1 then d - 3 when 7 then d - 2 else d - 1 end $$;

create or replace function public.bolao_next_weekday(d date)
returns date
language sql
immutable
as $$ select case extract(isodow from d)::int when 5 then d + 3 when 6 then d + 2 else d + 1 end $$;

create or replace function public.bolao_month_closed(d date)
returns boolean
language sql
stable
security definer
set search_path = public
as $$ select exists (select 1 from public.bolao_closures where month = date_trunc('month', d::timestamp)::date) $$;

-- Dia aberto: antes do meio-dia, sem camisa registrada e com o mês ainda aberto
create or replace function public.bolao_day_open(d date)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select now() < public.bolao_cutoff(d)
     and not exists (select 1 from public.entries where day = d)
     and not public.bolao_month_closed(d)
$$;

-- Dia que recebe palpites agora: hoje até o meio-dia, depois o próximo dia útil
create or replace function public.bolao_guess_day()
returns date
language sql
stable
security definer
set search_path = public
as $$
  select case when extract(isodow from t) < 6 and public.bolao_day_open(t) then t
              else public.bolao_next_weekday(t) end
  from (select public.bolao_today() as t) x
$$;

-- O participante acertou naquele dia?
create or replace function public.bolao_hit(p uuid, d date)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.bolao_guesses g
    join public.entries e on e.day = g.day and e.status = 'shirt' and e.shirt_id = g.shirt_id
    where g.participant_id = p and g.day = d
  )
$$;

-- Único jeito de palpitar. Confere todas as regras e grava; não existe trocar nem excluir.
create or replace function public.bolao_place_guess(p_day date, p_participant uuid, p_shirt text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  d date := public.bolao_guess_day();
begin
  if auth.uid() is null then
    raise exception 'Faça login para palpitar.';
  end if;
  if p_day is distinct from d then
    raise exception 'O horário virou: os palpites agora são para outro dia. Confira e tente de novo.';
  end if;
  if d > date '2027-12-31' then
    raise exception 'O bolão terminou junto com o calendário.';
  end if;
  if not exists (select 1 from bolao_participants where id = p_participant and active) then
    raise exception 'Participante não encontrado.';
  end if;
  if not exists (select 1 from shirts where id = p_shirt) then
    raise exception 'Camisa não encontrada.';
  end if;
  if not public.bolao_day_open(d) then
    raise exception 'Os palpites desse dia já fecharam.';
  end if;
  if exists (select 1 from bolao_guesses where day = d and participant_id = p_participant) then
    raise exception 'Esse participante já palpitou hoje. Palpite não pode ser trocado.';
  end if;
  if public.bolao_hit(p_participant, public.bolao_prev_weekday(d)) then
    raise exception 'Quem acertou no dia anterior descansa hoje.';
  end if;
  insert into bolao_guesses (day, participant_id, shirt_id) values (d, p_participant, p_shirt);
end
$$;

-- Lista de palpites. Enquanto o dia está aberto, a camisa fica escondida (ninguém copia ninguém).
create or replace function public.bolao_guess_list()
returns table (day date, participant_id uuid, shirt_id text, created_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select g.day, g.participant_id,
         case when public.bolao_day_open(g.day) then null else g.shirt_id end,
         g.created_at
  from public.bolao_guesses g
  order by g.day, g.created_at
$$;

revoke all on function public.bolao_today(), public.bolao_cutoff(date), public.bolao_prev_weekday(date),
  public.bolao_next_weekday(date), public.bolao_month_closed(date), public.bolao_day_open(date),
  public.bolao_guess_day(), public.bolao_hit(uuid, date), public.bolao_place_guess(date, uuid, text),
  public.bolao_guess_list() from public, anon;
grant execute on function public.bolao_today(), public.bolao_cutoff(date), public.bolao_prev_weekday(date),
  public.bolao_next_weekday(date), public.bolao_month_closed(date), public.bolao_day_open(date),
  public.bolao_guess_day(), public.bolao_hit(uuid, date), public.bolao_place_guess(date, uuid, text),
  public.bolao_guess_list() to authenticated;

-- ---------- Segurança: só quem fez login lê ou escreve ----------

alter table public.shirts             enable row level security;
alter table public.entries            enable row level security;
alter table public.settings           enable row level security;
alter table public.bolao_participants enable row level security;
alter table public.bolao_guesses      enable row level security;
alter table public.bolao_payments     enable row level security;
alter table public.bolao_expenses     enable row level security;
alter table public.bolao_closures     enable row level security;
alter table public.bolao_config       enable row level security;

revoke all on public.shirts, public.entries, public.settings, public.bolao_participants, public.bolao_guesses,
  public.bolao_payments, public.bolao_expenses, public.bolao_closures, public.bolao_config from anon;
revoke all on public.shirts, public.entries, public.settings, public.bolao_participants, public.bolao_guesses,
  public.bolao_payments, public.bolao_expenses, public.bolao_closures, public.bolao_config from authenticated;
grant select, insert, delete on public.shirts             to authenticated;
grant select, insert, delete on public.entries            to authenticated;  -- sem update: corrigir = apagar e registrar de novo
grant select, insert, update on public.settings           to authenticated;
grant select, insert, update on public.bolao_participants to authenticated;  -- sem delete: desativa
-- bolao_guesses: nenhum acesso direto. Palpitar = bolao_place_guess(); ler = bolao_guess_list().
grant select, insert, delete on public.bolao_payments     to authenticated;
grant update (confirmed)     on public.bolao_payments     to authenticated;  -- só confirmar um pagamento informado
grant select, insert, delete on public.bolao_expenses     to authenticated;
grant select, insert         on public.bolao_closures     to authenticated;  -- reabrir um mês: só pelo SQL Editor
grant select, update         on public.bolao_config       to authenticated;

drop policy if exists shirts_select on public.shirts;
drop policy if exists shirts_insert on public.shirts;
drop policy if exists shirts_delete on public.shirts;
create policy shirts_select on public.shirts for select to authenticated using (true);
create policy shirts_insert on public.shirts for insert to authenticated with check (true);
-- Camisa usada num mês encerrado do bolão não sai (levaria os registros dela junto)
create policy shirts_delete on public.shirts for delete to authenticated using (
  not exists (select 1 from public.entries e where e.shirt_id = shirts.id and public.bolao_month_closed(e.day))
);

drop policy if exists entries_select on public.entries;
drop policy if exists entries_insert on public.entries;
drop policy if exists entries_delete on public.entries;
create policy entries_select on public.entries for select to authenticated using (true);
-- Não aceita dias futuros (horário de Brasília) nem meses encerrados do bolão
create policy entries_insert on public.entries for insert to authenticated
  with check (day <= public.bolao_today() and not public.bolao_month_closed(day));
create policy entries_delete on public.entries for delete to authenticated
  using (not public.bolao_month_closed(day));

drop policy if exists settings_select on public.settings;
drop policy if exists settings_insert on public.settings;
drop policy if exists settings_update on public.settings;
create policy settings_select on public.settings for select to authenticated using (true);
create policy settings_insert on public.settings for insert to authenticated with check (true);
create policy settings_update on public.settings for update to authenticated using (true) with check (true);

drop policy if exists bolao_participants_select on public.bolao_participants;
drop policy if exists bolao_participants_insert on public.bolao_participants;
drop policy if exists bolao_participants_update on public.bolao_participants;
create policy bolao_participants_select on public.bolao_participants for select to authenticated using (true);
create policy bolao_participants_insert on public.bolao_participants for insert to authenticated with check (true);
create policy bolao_participants_update on public.bolao_participants for update to authenticated using (true) with check (true);

-- Dinheiro: só em meses abertos
drop policy if exists bolao_payments_select on public.bolao_payments;
drop policy if exists bolao_payments_insert on public.bolao_payments;
drop policy if exists bolao_payments_delete on public.bolao_payments;
drop policy if exists bolao_payments_update on public.bolao_payments;
create policy bolao_payments_select on public.bolao_payments for select to authenticated using (true);
create policy bolao_payments_update on public.bolao_payments for update to authenticated
  using (not public.bolao_month_closed(month)) with check (not public.bolao_month_closed(month));
create policy bolao_payments_insert on public.bolao_payments for insert to authenticated
  with check (not public.bolao_month_closed(month));
create policy bolao_payments_delete on public.bolao_payments for delete to authenticated
  using (not public.bolao_month_closed(month));

drop policy if exists bolao_expenses_select on public.bolao_expenses;
drop policy if exists bolao_expenses_insert on public.bolao_expenses;
drop policy if exists bolao_expenses_delete on public.bolao_expenses;
create policy bolao_expenses_select on public.bolao_expenses for select to authenticated using (true);
create policy bolao_expenses_insert on public.bolao_expenses for insert to authenticated
  with check (not public.bolao_month_closed(month));
create policy bolao_expenses_delete on public.bolao_expenses for delete to authenticated
  using (not public.bolao_month_closed(month));

-- Encerrar: só depois que o mês terminou
drop policy if exists bolao_closures_select on public.bolao_closures;
drop policy if exists bolao_closures_insert on public.bolao_closures;
create policy bolao_closures_select on public.bolao_closures for select to authenticated using (true);
create policy bolao_closures_insert on public.bolao_closures for insert to authenticated
  with check (month < date_trunc('month', public.bolao_today()::timestamp)::date);

drop policy if exists bolao_config_select on public.bolao_config;
drop policy if exists bolao_config_update on public.bolao_config;
create policy bolao_config_select on public.bolao_config for select to authenticated using (true);
create policy bolao_config_update on public.bolao_config for update to authenticated using (true) with check (true);

-- ---------- Despertador ----------
-- Projetos gratuitos são pausados após 7 dias sem acesso. O GitHub chama esta
-- função a cada 3 dias (.github/workflows/keepalive.yml). Ela não lê nenhum dado.
create or replace function public.keepalive()
returns integer
language sql
stable
as $$ select 1 $$;

revoke all on function public.keepalive() from public;
grant execute on function public.keepalive() to anon, authenticated;

-- ---------- Dados iniciais ----------

insert into public.shirts (id, name, color, img, position) values
  ('brasil-azul', 'Brasil azul',         '#1e3a8a', 'camisas/esquilo_brasil.webp',  1),
  ('chelsea',     'Chelsea',             '#1d4ed8', 'camisas/esquilo_chelsea.webp', 2),
  ('cassino',     'Grand Hotel Cassino', '#4a2511', 'camisas/esquilo_cassino.webp', 3),
  ('ifes',        'IFES preta',          '#111111', 'camisas/esquilo_ifes.webp',    4)
on conflict (id) do nothing;

insert into public.settings (key, value) values ('friend', 'Sahymon')
on conflict (key) do nothing;

insert into public.bolao_config (id) values (true)
on conflict (id) do nothing;

-- Participantes do bolão (a cor do avatar pode ser trocada pelo app)
insert into public.bolao_participants (name, color) values
  ('Stingnel',   '#4f46e5'),
  ('Manito',     '#f59e0b'),
  ('Ortelas',    '#a855f7'),
  ('Balothalis', '#ef4444'),
  ('Lolo',       '#10b981'),
  ('Gabriel',    '#0ea5e9')
on conflict (name) do nothing;
