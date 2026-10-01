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

-- ---------- Segurança: só quem fez login lê ou escreve ----------

alter table public.shirts   enable row level security;
alter table public.entries  enable row level security;
alter table public.settings enable row level security;

revoke all on public.shirts, public.entries, public.settings from anon;
revoke all on public.shirts, public.entries, public.settings from authenticated;
grant select, insert, delete on public.shirts   to authenticated;
grant select, insert, delete on public.entries  to authenticated;  -- sem update: corrigir = apagar e registrar de novo
grant select, insert, update on public.settings to authenticated;

drop policy if exists shirts_select on public.shirts;
drop policy if exists shirts_insert on public.shirts;
drop policy if exists shirts_delete on public.shirts;
create policy shirts_select on public.shirts for select to authenticated using (true);
create policy shirts_insert on public.shirts for insert to authenticated with check (true);
create policy shirts_delete on public.shirts for delete to authenticated using (true);

drop policy if exists entries_select on public.entries;
drop policy if exists entries_insert on public.entries;
drop policy if exists entries_delete on public.entries;
create policy entries_select on public.entries for select to authenticated using (true);
-- Não aceita dias futuros (horário de Brasília)
create policy entries_insert on public.entries for insert to authenticated
  with check (day <= (now() at time zone 'America/Sao_Paulo')::date);
create policy entries_delete on public.entries for delete to authenticated using (true);

drop policy if exists settings_select on public.settings;
drop policy if exists settings_insert on public.settings;
drop policy if exists settings_update on public.settings;
create policy settings_select on public.settings for select to authenticated using (true);
create policy settings_insert on public.settings for insert to authenticated with check (true);
create policy settings_update on public.settings for update to authenticated using (true) with check (true);

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
