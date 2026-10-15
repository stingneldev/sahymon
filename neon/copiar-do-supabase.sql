-- =========================================================
-- Esquilook — copiar os dados do Supabase para o Neon (uso único)
-- 1. Rode ESTA consulta no SQL Editor do SUPABASE. Ela só LÊ os dados.
-- 2. Ela devolve uma única célula ("copiar_para_o_neon") com comandos insert.
-- 3. Copie o conteúdo inteiro da célula, cole no SQL Editor do NEON e rode
--    (depois de já ter rodado o neon/schema.sql lá).
-- A ordem respeita as ligações entre tabelas. Rodar a cópia duas vezes não duplica nada.
-- =========================================================

select string_agg(line, E'\n' order by ord, line) as copiar_para_o_neon from (

  -- Camisas
  select 1 as ord, format(
    'insert into public.shirts (id, name, color, img, position, created_at) values (%L, %L, %L, %L, %s, %L) on conflict (id) do nothing;',
    id, name, color, img, position, created_at) as line
  from public.shirts

  -- Registros do calendário
  union all
  select 2, format(
    'insert into public.entries (day, status, shirt_id, created_at) values (%L, %L, %L, %L) on conflict (day) do nothing;',
    day, status, shirt_id, created_at)
  from public.entries

  -- Nome do amigo
  union all
  select 3, format(
    'insert into public.settings (key, value) values (%L, %L) on conflict (key) do update set value = excluded.value;',
    key, value)
  from public.settings

  -- Pix do caixa
  union all
  select 4, format(
    'insert into public.bolao_config (id, pix_key, pix_name, pix_city) values (true, %L, %L, %L) on conflict (id) do update set pix_key = excluded.pix_key, pix_name = excluded.pix_name, pix_city = excluded.pix_city;',
    pix_key, pix_name, pix_city)
  from public.bolao_config

  -- Participantes: o schema do Neon já cria os mesmos nomes com outro id;
  -- aqui o id volta a ser o do Supabase, para os palpites e pagamentos continuarem ligados.
  union all
  select 5, format(
    'insert into public.bolao_participants (id, name, color, active, created_at) values (%L, %L, %L, %L, %L) on conflict (name) do update set id = excluded.id, color = excluded.color, active = excluded.active, created_at = excluded.created_at;',
    id, name, color, active, created_at)
  from public.bolao_participants

  -- Palpites
  union all
  select 6, format(
    'insert into public.bolao_guesses (day, participant_id, shirt_id, created_at) values (%L, %L, %L, %L) on conflict (day, participant_id) do nothing;',
    day, participant_id, shirt_id, created_at)
  from public.bolao_guesses

  -- Pagamentos
  union all
  select 7, format(
    'insert into public.bolao_payments (id, participant_id, month, amount_cents, confirmed, created_at) values (%L, %L, %L, %s, %L, %L) on conflict (id) do nothing;',
    id, participant_id, month, amount_cents, confirmed, created_at)
  from public.bolao_payments

  -- Gastos do caixa
  union all
  select 8, format(
    'insert into public.bolao_expenses (id, month, description, amount_cents, created_at) values (%L, %L, %L, %s, %L) on conflict (id) do nothing;',
    id, month, description, amount_cents, created_at)
  from public.bolao_expenses

  -- Meses encerrados (por último: depois disso o mês não aceita mais mudanças)
  union all
  select 9, format(
    'insert into public.bolao_closures (month, prize_cents, winners, closed_at) values (%L, %s, %L, %L) on conflict (month) do nothing;',
    month, prize_cents, winners, closed_at)
  from public.bolao_closures

) t;
