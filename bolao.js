/* =========================================================
   Esquilook — Bolão do lanche
   Todos usam o mesmo login; cada palpite escolhe o nome do participante.
   - R$ 1 por palpite, um por participante por dia, até o meio-dia (Brasília)
     ou até a camisa do dia ser registrada, o que vier primeiro. A aula começa
     às 13:00: registrada a camisa, resultado, caixa e ranking se atualizam.
   - Palpite é definitivo: não dá para trocar nem excluir.
   - Quem acerta descansa no próximo dia útil (não palpita, não paga),
     mas continua com os pontos. Assim ninguém dispara na frente.
   - Dia de falta do Sahymon é anulado: ninguém pontua e ninguém paga.
   - O caixa paga o lanche; no fim do mês a sobra vai para quem fez mais
     pontos (empate divide).
   - Pagamento por Pix (QR Code / copia e cola): quem paga informa e o caixa
     confirma depois de conferir o extrato.
   Sem as tabelas no banco, abre em modo demonstração (dados de exemplo, nada é salvo).
   Quem garante as regras é o banco (supabase/schema.sql); aqui é só a tela.
   Carregado antes do app.js: usa as funções dele só depois que o app abre.
   ========================================================= */

const GUESS_CENTS = 100;
const GUESS_CUTOFF = "12:00"; // o mesmo horário de bolao_cutoff() no banco
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const AVATARS = ["🐿️", "🦊", "🐼", "🐸", "🦁", "🐯", "🐨", "🐵", "🦉", "🐙", "🦄", "🐢", "🐧", "🐻", "🐰", "🐶"];
const AVATAR_COLORS = ["#4f46e5", "#a855f7", "#ec4899", "#f59e0b", "#10b981", "#0ea5e9", "#ef4444", "#14b8a6"];
const MEDALS = ["🥇", "🥈", "🥉"];
const KEY_PLAYER = "esquilook:bolao-jogador"; // último participante escolhido neste aparelho
const DEMO_PIX = { key: "caixa-do-lanche@exemplo.com", name: "Caixa do lanche", city: "VITORIA" };
const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const money = (cents) => BRL.format(cents / 100);
const pct = (x) => `${Math.round(x * 100)}%`;

const bolao = {
  available: false, // tabelas no banco ou modo demonstração
  demo: false,      // banco ainda sem as tabelas: dados de exemplo, nada é salvo
  probedAt: 0,      // última vez que o banco foi consultado no modo demonstração
  participants: [],
  guesses: [],      // shirt_id vem vazio enquanto o dia está aberto
  payments: [],
  expenses: [],
  closures: [],
  pix: { key: "", name: "", city: "" },
  month: null,      // "YYYY-MM" do caixa e do ranking mensal
  scope: "month",   // ranking: "month" ou "all"
  picked: null,     // participante escolhido para palpitar
};

/* ---------------- Carregar ---------------- */

async function loadBolao() {
  // No modo demonstração, só pergunta ao banco de novo a cada 5 minutos
  if (bolao.demo && Date.now() - bolao.probedAt < 5 * 60_000) return;
  let d;
  try {
    d = await api.fetchBolao();
  } catch (ex) {
    if (ex instanceof AuthError) throw ex;
    if (ex.status === 404) { // tabelas ainda não criadas no Supabase
      bolao.demo = true;
      bolao.available = true;
      bolao.probedAt = Date.now();
    }
    return; // outras falhas: mantém o que já tinha e tenta de novo na próxima
  }
  if (bolao.demo) { bolao.demo = false; demo.data = null; bolao.picked = null; }
  applyBolao(d);
}

// Valida e guarda o que veio do banco (ou da demonstração)
function applyBolao(d) {
  const ids = new Set();
  bolao.participants = (d.participants || [])
    .filter((p) => UUID_RE.test(p.id) && typeof p.name === "string" && p.name.trim() && !ids.has(p.id) && ids.add(p.id))
    .map((p) => ({
      id: p.id,
      name: p.name.trim().slice(0, 24),
      emoji: typeof p.emoji === "string" && p.emoji.length <= 8 ? p.emoji : AVATARS[0],
      color: COLOR_RE.test(p.color) ? p.color : AVATAR_COLORS[0],
      active: p.active !== false,
    }));
  bolao.guesses = (d.guesses || [])
    .filter((g) => DAY_RE.test(g.day) && ids.has(g.participant_id))
    .map((g) => ({ day: g.day, participant_id: g.participant_id, shirt_id: typeof g.shirt_id === "string" ? g.shirt_id : null }));
  bolao.payments = (d.payments || [])
    .filter((p) => UUID_RE.test(p.id) && ids.has(p.participant_id) && DAY_RE.test(p.month) && Number.isInteger(p.amount_cents))
    .map((p) => ({ ...p, confirmed: p.confirmed !== false }));
  bolao.expenses = (d.expenses || []).filter((x) => UUID_RE.test(x.id) && DAY_RE.test(x.month) && Number.isInteger(x.amount_cents) && typeof x.description === "string");
  bolao.closures = (d.closures || []).filter((c) => DAY_RE.test(c.month) && Number.isInteger(c.prize_cents));
  const str = (v) => (typeof v === "string" ? v : "");
  bolao.pix = { key: str(d.config?.pix_key), name: str(d.config?.pix_name), city: str(d.config?.pix_city) };
  bolao.available = true;
}

// Recarrega só o bolão depois de uma ação
async function refreshBolao() {
  try {
    await loadBolao();
  } catch (ex) {
    handleApiError(ex);
    return;
  }
  renderBolao();
}

// Escritas vão para o banco ou, na demonstração, ficam só na memória
const backend = () => (bolao.demo ? demoApi : api);

/* ---------------- Modo demonstração ---------------- */

const demo = { data: null };
const DEMO_PEOPLE = [["Gabriel", "🦊"], ["Lucas", "🐼"], ["Mari", "🐸"], ["Pedro", "🦁"], ["Julia", "🐨"]];

function demoId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const h = () => Math.floor(Math.random() * 0x10000).toString(16).padStart(4, "0");
  return `${h()}${h()}-${h()}-4${h().slice(1)}-8${h().slice(1)}-${h()}${h()}${h()}`;
}

// Um mês de exemplo: 20 dias úteis de palpites, pagamentos e gastos. Os dias que já
// têm camisa registrada no calendário de verdade usam o resultado real.
function makeDemo() {
  let seed = 20261001;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const shirts = state.shirts.map((s) => s.id);
  const people = DEMO_PEOPLE.map(([name, emoji], i) => ({
    id: `00000000-0000-4000-8000-${String(i + 1).padStart(12, "0")}`, name, emoji, color: AVATAR_COLORS[i], active: true,
  }));
  const results = {};
  const guesses = [];
  const days = [];
  for (let d = todayKey(), i = 0; i < 20; i++) days.unshift((d = stepWeekday(d, -1)));

  days.forEach((day, i) => {
    const result = state.log[day] ?? (rnd() < 0.08 || !shirts.length ? ABSENT : shirts[Math.floor(rnd() ** 1.7 * shirts.length)]);
    if (!state.log[day]) results[day] = result;
    if (!shirts.length) return;
    for (const p of people) {
      const prev = guesses.find((g) => g.day === days[i - 1] && g.participant_id === p.id);
      if (prev && prev.shirt_id === (state.log[days[i - 1]] ?? results[days[i - 1]])) continue; // acertou ontem: descansa
      if (rnd() < 0.12) continue; // esqueceu de palpitar
      const shirt = result !== ABSENT && rnd() < 0.33 ? result : shirts[Math.floor(rnd() * shirts.length)];
      guesses.push({ day, participant_id: p.id, shirt_id: shirt });
    }
  });

  // Dia aberto: dois participantes já palpitaram (quem acertou na véspera descansa)
  const open = guessDay();
  if (open && shirts.length) {
    const prevDay = stepWeekday(open, -1);
    const prevResult = state.log[prevDay] ?? results[prevDay];
    const awake = people.filter((p) => !guesses.some((g) => g.day === prevDay && g.participant_id === p.id && g.shirt_id === prevResult));
    for (const p of awake.slice(0, 2)) guesses.push({ day: open, participant_id: p.id, shirt_id: shirts[Math.floor(rnd() * shirts.length)] });
  }

  const month = `${monthOf(days.at(-1))}-01`;
  const at = (i) => new Date(Date.now() - i * 864e5).toISOString();
  const payments = [
    { id: demoId(), participant_id: people[0].id, month, amount_cents: 500, confirmed: true, created_at: at(6) },
    { id: demoId(), participant_id: people[1].id, month, amount_cents: 1000, confirmed: true, created_at: at(4) },
    { id: demoId(), participant_id: people[3].id, month, amount_cents: 300, confirmed: false, created_at: at(1) },
  ];
  const expenses = [
    { id: demoId(), month, description: "Pão de queijo e suco", amount_cents: 1850, created_at: at(5) },
    { id: demoId(), month, description: "Frutas da feira", amount_cents: 1200, created_at: at(2) },
  ];
  return { participants: people, guesses, payments, expenses, closures: [], config: { pix_key: "", pix_name: "", pix_city: "" }, results, firstDay: days[0] };
}

// Retrato da demonstração no mesmo formato do banco (camisas escondidas nos dias abertos)
function demoSnapshot() {
  demo.data ??= makeDemo();
  const d = demo.data;
  return { ...d, guesses: d.guesses.map((g) => ({ ...g, shirt_id: dayOpen(g.day) ? null : g.shirt_id })) };
}

const demoFail = (message) => { throw new ApiError(message, 400, "P0001"); };

// Mesmas regras do banco, aplicadas na memória
const demoApi = {
  async placeGuess(day, pid, shirt) {
    const d = demo.data;
    if (day !== guessDay()) demoFail("O horário virou: os palpites agora são para outro dia. Confira e tente de novo.");
    if (!d.participants.some((p) => p.id === pid && p.active)) demoFail("Participante não encontrado.");
    if (d.guesses.some((g) => g.day === day && g.participant_id === pid)) demoFail("Esse participante já palpitou hoje. Palpite não pode ser trocado.");
    if (isResting(pid, day)) demoFail("Quem acertou no dia anterior descansa hoje.");
    d.guesses.push({ day, participant_id: pid, shirt_id: shirt });
  },
  async addParticipant(row) {
    if (demo.data.participants.some((p) => p.name.toLowerCase() === row.name.toLowerCase())) throw new ApiError("duplicado", 409, "23505");
    demo.data.participants.push({ id: demoId(), active: true, ...row });
  },
  async updateParticipant(id, patch) { Object.assign(demo.data.participants.find((p) => p.id === id) ?? {}, patch); return [{}]; },
  async addPayment(row) { demo.data.payments.push({ id: demoId(), confirmed: true, created_at: new Date().toISOString(), ...row }); },
  async deletePayment(id) { demo.data.payments = demo.data.payments.filter((p) => p.id !== id); return [{}]; },
  async confirmPayment(id) { Object.assign(demo.data.payments.find((p) => p.id === id) ?? {}, { confirmed: true }); return [{}]; },
  async addExpense(row) { demo.data.expenses.push({ id: demoId(), created_at: new Date().toISOString(), ...row }); },
  async deleteExpense(id) { demo.data.expenses = demo.data.expenses.filter((x) => x.id !== id); return [{}]; },
  async closeMonth(row) { demo.data.closures.push(row); },
  async setPixConfig(patch) { Object.assign(demo.data.config, patch); return [{}]; },
};

/* ---------------- Regras ---------------- */

const cutoffOf = (day) => new Date(`${day}T${GUESS_CUTOFF}:00-03:00`); // Brasília (sem horário de verão)
const monthOf = (day) => day.slice(0, 7);
const closureOf = (ym) => bolao.closures.find((c) => monthOf(c.month) === ym);
const participantById = (id) => bolao.participants.find((p) => p.id === id);
const activeParticipants = () => bolao.participants.filter((p) => p.active);
const guessOf = (day, pid) => bolao.guesses.find((g) => g.day === day && g.participant_id === pid);

// Camisa do dia: a do calendário; na demonstração, os dias de exemplo têm resultado próprio
const resultOf = (day) => state.log[day] ?? (bolao.demo ? demo.data?.results[day] : undefined);

// Registro do dia travado: o mês já foi encerrado no bolão (usado também pelo app.js)
const isDayLocked = (day) => bolao.available && !bolao.demo && Boolean(closureOf(monthOf(day)));

function stepWeekday(key, delta) {
  const d = fromKey(key);
  do d.setDate(d.getDate() + delta); while (isWeekend(toKey(d)));
  return toKey(d);
}

const dayOpen = (day) =>
  !isWeekend(day) && Date.now() < cutoffOf(day).getTime() && !resultOf(day) && !closureOf(monthOf(day));

// Dia que recebe palpites agora: hoje até o meio-dia, depois o próximo dia útil
function guessDay() {
  let day = todayKey() < CAL_START ? CAL_START : todayKey();
  if (!dayOpen(day)) day = stepWeekday(day, 1);
  return day <= CAL_END && dayOpen(day) ? day : null;
}

// Último dia útil que já fechou (os palpites dele já podem ser vistos)
function revealDay() {
  let day = todayKey() > CAL_END ? CAL_END : todayKey();
  if (isWeekend(day) || dayOpen(day)) day = stepWeekday(day, -1);
  return day >= (bolao.demo ? demo.data?.firstDay ?? CAL_START : CAL_START) ? day : null;
}

function timeLeft(day) {
  const min = Math.ceil((cutoffOf(day).getTime() - Date.now()) / 60000);
  if (min <= 0) return "encerrado";
  const h = Math.floor(min / 60);
  return h ? `faltam ${h}h${String(min % 60).padStart(2, "0")}` : `faltam ${min} min`;
}

// Acertou naquele dia? (o mesmo que bolao_hit() no banco)
function hitOn(pid, day) {
  const g = guessOf(day, pid);
  const result = resultOf(day);
  return Boolean(g?.shirt_id && result && result !== ABSENT && g.shirt_id === result);
}

// Quem acertou no dia útil anterior descansa
const isResting = (pid, day) => hitOn(pid, stepWeekday(day, -1));

// hit | miss | void (anulado: acertou na véspera) | absent (falta do Sahymon) | pending | open
function guessStatus(g) {
  const result = resultOf(g.day);
  if (result === ABSENT) return "absent";
  if (!result || !g.shirt_id) return dayOpen(g.day) ? "open" : "pending";
  if (isResting(g.participant_id, g.day)) return "void";
  return g.shirt_id === result ? "hit" : "miss";
}

const STATUS_INFO = {
  hit: { icon: "✅", label: "acertou" },
  miss: { icon: "❌", label: "errou" },
  void: { icon: "⏸️", label: "anulado (acertou na véspera)" },
  absent: { icon: "➖", label: "dia anulado (falta)" },
  pending: { icon: "⏳", label: "aguardando a camisa" },
  open: { icon: "🔒", label: "palpite guardado" },
};

// Participante lembrado neste aparelho (cada um costuma usar o próprio celular)
function rememberedPlayer() {
  try {
    const id = localStorage.getItem(KEY_PLAYER);
    return activeParticipants().some((p) => p.id === id) ? id : null;
  } catch { return null; }
}
function rememberPlayer(id) {
  try { localStorage.setItem(KEY_PLAYER, id); } catch { /* sem armazenamento: tudo bem */ }
}

/* ---------------- Placar ---------------- */

// Placar de um período. Ponto = acerto. Só os palpites com camisa registrada são cobrados.
function scoreboard(inPeriod) {
  const rows = new Map();
  const row = (p) => {
    if (!rows.has(p.id)) rows.set(p.id, { p, hits: 0, charged: 0, voids: 0, results: [] });
    return rows.get(p.id);
  };
  bolao.participants.filter((p) => p.active).forEach(row);

  const sorted = bolao.guesses.filter((g) => inPeriod(g.day)).sort((a, b) => a.day.localeCompare(b.day));
  let lastScored = null;
  for (const g of sorted) {
    const p = participantById(g.participant_id);
    const st = guessStatus(g);
    if (!p || st === "open" || st === "pending") continue;
    const r = row(p);
    r.results.push({ day: g.day, st });
    if (st === "hit" || st === "miss") {
      r.charged++;
      lastScored = g.day;
      if (st === "hit") r.hits++;
    }
    if (st === "void") r.voids++;
  }

  const list = [...rows.values()].map((r) => {
    const graded = r.results.filter((x) => x.st === "hit" || x.st === "miss");
    let coldStreak = 0;
    for (let i = graded.length - 1; i >= 0 && graded[i].st === "miss"; i--) coldStreak++;
    return { ...r, rate: r.charged ? r.hits / r.charged : 0, coldStreak, last: r.results.slice(-5) };
  });
  // Posição só pelos pontos (empate = mesma posição); aproveitamento desempata a ordem
  list.sort((a, b) => b.hits - a.hits || b.rate - a.rate || a.charged - b.charged || a.p.name.localeCompare(b.p.name));
  list.forEach((r) => { r.pos = 1 + list.filter((x) => x.hits > r.hits).length; });
  return { list, lastScored };
}

// Placar + setas de subida/descida desde o último dia com resultado + destaques
function rankingFor(inPeriod) {
  const now = scoreboard(inPeriod);
  if (now.lastScored) {
    const before = scoreboard((d) => inPeriod(d) && d < now.lastScored);
    const prevPos = new Map(before.list.filter((r) => r.charged).map((r) => [r.p.id, r.pos]));
    now.list.forEach((r) => { if (prevPos.has(r.p.id)) r.move = prevPos.get(r.p.id) - r.pos; });
  }

  const played = now.list.filter((r) => r.charged);
  const top = played.length ? Math.max(...played.map((r) => r.hits)) : 0;
  const bestRate = Math.max(0, ...played.filter((r) => r.charged >= 3).map((r) => r.rate));
  const mostPlayed = Math.max(0, ...played.map((r) => r.charged));
  const coldest = Math.max(0, ...played.map((r) => r.coldStreak));
  const today = guessDay();
  now.list.forEach((r) => {
    r.badges = [];
    if (top > 0 && r.hits === top) r.badges.push(["👑", "Líder em pontos"]);
    if (bestRate > 0 && r.charged >= 3 && r.rate === bestRate) r.badges.push(["🎯", "Mira afiada: melhor aproveitamento"]);
    if (mostPlayed >= 3 && r.charged === mostPlayed) r.badges.push(["🐿️", "Fiel ao bolão: mais palpites"]);
    if (coldest >= 3 && r.coldStreak === coldest) r.badges.push(["🥶", `Pé-frio: ${r.coldStreak} erros seguidos`]);
    if (today && isResting(r.p.id, today)) r.badges.push(["⏸️", "Acertou e descansa no próximo palpite"]);
  });
  return now;
}

// Caixa do mês. Só pagamento confirmado conta como recebido.
function cashFor(ym) {
  const { list } = scoreboard((d) => monthOf(d) === ym);
  const paidBy = new Map();
  const pendingBy = new Map();
  for (const pay of bolao.payments) {
    if (monthOf(pay.month) !== ym) continue;
    const map = pay.confirmed ? paidBy : pendingBy;
    map.set(pay.participant_id, (map.get(pay.participant_id) ?? 0) + pay.amount_cents);
  }
  const people = list.map((r) => {
    const paid = paidBy.get(r.p.id) ?? 0;
    const pending = pendingBy.get(r.p.id) ?? 0;
    return { ...r, paid, pending, owed: r.charged * GUESS_CENTS - paid };
  });
  const sum = (map) => [...map.values()].reduce((a, b) => a + b, 0);
  const received = sum(paidBy); // inclui quem pagou e depois saiu do bolão
  const spent = bolao.expenses.filter((x) => monthOf(x.month) === ym).reduce((a, x) => a + x.amount_cents, 0);
  const expected = people.reduce((a, r) => a + r.charged * GUESS_CENTS, 0);
  const missing = people.reduce((a, r) => a + Math.max(0, r.owed), 0);
  const top = Math.max(0, ...people.map((r) => r.hits));
  const winners = top > 0 ? people.filter((r) => r.hits === top) : [];
  return { people, received, pending: sum(pendingBy), spent, expected, missing, winners, prize: Math.max(0, received - spent) };
}

// "3,50", "3.50", "R$ 1.234,56" -> centavos
function parseCents(text) {
  let t = String(text).trim().replace(/^R\$\s*/i, "");
  t = t.includes(",") ? t.replace(/\./g, "").replace(",", ".") : t;
  if (!/^\d{1,6}(\.\d{1,2})?$/.test(t)) return null;
  const cents = Math.round(Number(t) * 100);
  return cents > 0 ? cents : null;
}

/* ---------------- Render ---------------- */

const firstMonth = () => {
  const start = monthKey(CAL_START);
  const demoStart = bolao.demo && demo.data ? monthOf(demo.data.firstDay) : start;
  return demoStart < start ? demoStart : start;
};
const lastMonth = () => (monthOf(todayKey()) < monthKey(CAL_END) ? monthOf(todayKey()) : monthKey(CAL_END));
const clampMonth = (ym) => (ym < firstMonth() ? firstMonth() : ym > lastMonth() ? lastMonth() : ym);
const avatar = (p, cls = "") => `<span class="bp-avatar ${cls}" style="--c:${p.color}" aria-hidden="true">${escapeHtml(p.emoji)}</span>`;
const bolaoNote = (html) => `<p class="bg-note">${html}</p>`;

function renderBolao() {
  $("#bolao").classList.toggle("hidden", !bolao.available);
  if (!bolao.available || !state) return;
  if (bolao.demo) applyBolao(demoSnapshot());
  $("#bolaoDemo").classList.toggle("hidden", !bolao.demo);
  $("#bolaoDemo").innerHTML = bolao.demo
    ? `<strong>👀 Modo demonstração</strong>
       <span>O bolão ainda não foi ativado no banco de dados. Participantes, palpites e pagamentos abaixo são
       de exemplo e nada é salvo: ao recarregar a página, tudo volta ao início. A camisa registrada no
       calendário é real e já entra no resultado.</span>`
    : "";
  bolao.month = clampMonth(bolao.month ?? monthOf(todayKey()));
  renderBolaoGuess();
  renderBolaoMonth();
  renderBolaoRank();
  renderBolaoAdmin();
  if (!$("#payModal").classList.contains("hidden")) renderPay();
}

function renderBolaoGuess() {
  const day = guessDay();
  const people = activeParticipants();
  let html = "";

  if (!day) {
    html += bolaoNote("O bolão terminou junto com o calendário.");
  } else {
    const done = people.filter((p) => guessOf(day, p.id));
    const resting = people.filter((p) => !guessOf(day, p.id) && isResting(p.id, day));
    const canPick = (id) => people.some((p) => p.id === id && !guessOf(day, p.id) && !isResting(p.id, day));
    const isToday = day === todayKey();
    if (!canPick(bolao.picked)) bolao.picked = canPick(rememberedPlayer()) ? rememberedPlayer() : null;
    const picked = participantById(bolao.picked);
    const pot = bolao.guesses.filter((g) => g.day === day).length;

    html += `
      <div class="bg-head">
        <span class="bg-eyebrow">${isToday ? "Palpite de hoje" : "Próximo palpite"}</span>
        <strong class="bg-day">${formatDate(day)}</strong>
        <span class="bg-meta">⏰ Fecha ao meio-dia${isToday ? ` · ${timeLeft(day)}` : ""} · ${done.length} de ${people.length - resting.length} já palpitaram</span>
        <span class="bg-pot">💰 Bolão do dia: <b>${money(pot * GUESS_CENTS)}</b> em ${pot} ${pot === 1 ? "palpite" : "palpites"}</span>
      </div>`;

    if (!people.length) {
      html += bolaoNote("Cadastre os participantes em <b>⚙️ Participantes e caixa</b>, no fim desta seção.");
    } else {
      html += `<p class="bg-step"><span>1</span>Quem vai palpitar?</p>
        <div class="bg-people">` + people.map((p) => {
          const did = Boolean(guessOf(day, p.id));
          const rest = !did && isResting(p.id, day);
          const title = did ? "Já palpitou (palpite guardado até fechar)" : rest ? "Acertou no dia anterior: descansa hoje" : "Escolher";
          return `
            <button class="bg-person ${p.id === bolao.picked ? "is-picked" : ""} ${did ? "is-done" : ""} ${rest ? "is-resting" : ""}"
                    data-person="${p.id}" type="button" ${did || rest ? "disabled" : ""} aria-pressed="${p.id === bolao.picked}" title="${title}">
              ${avatar(p)}<span class="bg-person-name">${escapeHtml(p.name)}</span>${did ? `<i>✓</i>` : rest ? `<i>⏸️</i>` : ""}
            </button>`;
        }).join("") + `</div>`;

      html += `<p class="bg-step ${picked ? "" : "is-waiting"}"><span>2</span>${picked ? `Qual camisa <b>${escapeHtml(picked.name)}</b> acha que vem?` : "Qual camisa vem? (escolha quem palpita primeiro)"}</p>
        <div class="bg-shirts ${picked ? "" : "is-waiting"}">` + state.shirts.map((s) => `
          <button class="bg-shirt" data-guess="${escapeHtml(s.id)}" type="button" ${picked ? "" : "disabled"}>
            <span class="bg-media">${shirtMedia(s)}</span>
            <span class="bg-name" title="${escapeHtml(s.name)}">${escapeHtml(s.name)}</span>
          </button>`).join("") + `</div>
        <p class="bg-rule">🔒 Cada palpite vale ${money(GUESS_CENTS)} e é definitivo: não dá para trocar nem excluir.</p>`;
    }
  }

  $("#bolaoGuess").innerHTML = html + renderReveal();
}

// Palpites do último dia fechado: quem acertou, quem errou e quem descansou
function renderReveal() {
  const day = revealDay();
  if (!day) return "";
  const result = resultOf(day);
  const shirt = result && result !== ABSENT ? shirtById(result) : null;
  const status = result === ABSENT ? "Faltou: dia anulado"
    : shirt ? `Veio de <b>${escapeHtml(shirt.name)}</b>`
    : "Camisa ainda não registrada";
  const order = { hit: 0, miss: 1, void: 2, absent: 3, pending: 4, open: 5 };
  const list = bolao.guesses
    .filter((g) => g.day === day)
    .map((g) => ({ g, p: participantById(g.participant_id), st: guessStatus(g) }))
    .filter((x) => x.p)
    .sort((a, b) => order[a.st] - order[b.st] || a.p.name.localeCompare(b.p.name));
  const rested = activeParticipants().filter((p) => !guessOf(day, p.id) && isResting(p.id, day));
  const charged = list.filter((x) => x.st === "hit" || x.st === "miss").length;

  const rows = list.map(({ g, p, st }) => `
    <li class="is-${st}">
      ${avatar(p, "is-sm")}
      <span class="bg-who">${escapeHtml(p.name)}</span>
      <span class="bg-what">${escapeHtml(shirtById(g.shirt_id)?.name ?? "—")}</span>
      <span class="bg-mark" title="${STATUS_INFO[st].label}">${STATUS_INFO[st].icon}</span>
    </li>`).join("");

  return `
    <div class="bg-reveal">
      <div class="bg-reveal-head">
        <span>Palpites de ${formatDate(day, { weekday: "short", day: "2-digit", month: "2-digit" })}</span>
        <span class="muted">${status}</span>
      </div>
      ${list.length ? `<ul>${rows}</ul>` : `<p class="muted">Ninguém palpitou nesse dia.</p>`}
      ${charged ? `<p class="bg-rested">💰 ${charged} ${charged === 1 ? "palpite valeu" : "palpites valeram"} ${money(charged * GUESS_CENTS)} para o caixa</p>` : ""}
      ${rested.length ? `<p class="bg-rested">⏸️ Descansou (acertou na véspera): ${rested.map((p) => escapeHtml(p.name)).join(", ")}</p>` : ""}
    </div>`;
}

function renderBolaoMonth() {
  const ym = bolao.month;
  const cash = cashFor(ym);
  const closure = closureOf(ym);
  $("#bolaoMonthLabel").textContent = monthLabel(ym);
  $("#bolaoPrev").disabled = ym <= firstMonth();
  $("#bolaoNext").disabled = ym >= lastMonth();

  let html = "";
  if (closure) {
    html += `
      <div class="bm-closed"><span aria-hidden="true">🏆</span><div><strong>Mês encerrado</strong>
        <span>${closure.winners
          ? `Prêmio de ${money(closure.prize_cents)} para ${escapeHtml(closure.winners)}`
          : `Ninguém pontuou: a sobra de ${money(closure.prize_cents)} fica com o grupo`}</span></div></div>`;
  }

  html += `
    <div class="bm-cash">
      <div><span>Recebido</span><b>${money(cash.received)}</b></div>
      <div><span>Lanche</span><b>${money(cash.spent)}</b></div>
      <div class="bm-prize"><span>${closure ? "Prêmio" : "Sobra (prêmio)"}</span><b>${money(closure ? closure.prize_cents : cash.prize)}</b></div>
    </div>
    <p class="bm-note muted">${cash.expected ? `${money(cash.expected)} em palpites valendo` : "Nenhum palpite valendo ainda"}${cash.missing ? ` · faltam ${money(cash.missing)} a receber` : ""}${cash.pending ? ` · ${money(cash.pending)} aguardando confirmação` : ""}</p>`;

  if (!closure && activeParticipants().length) {
    html += `<button class="btn btn-primary btn-block bm-pay" id="bolaoPayOpen" type="button">💳 Pagar com Pix</button>`;
  }

  const debtors = cash.people.filter((r) => r.owed > 0).sort((a, b) => b.owed - a.owed);
  if (debtors.length) {
    html += `<div class="bm-debts"><span class="bm-label">A pagar · toque para pagar</span>` +
      debtors.map((r) => `
        <button class="bm-debt" data-pay="${r.p.id}" type="button" ${closure ? "disabled" : ""}>
          ${avatar(r.p, "is-xs")}${escapeHtml(r.p.name)} <b>${money(r.owed)}</b>${r.pending ? ` <small>⏳ ${money(r.pending)}</small>` : ""}
        </button>`).join("") + `</div>`;
  } else if (cash.expected) {
    html += `<p class="bm-paid">✅ Todo mundo em dia</p>`;
  }

  const expenses = bolao.expenses.filter((x) => monthOf(x.month) === ym);
  if (expenses.length) {
    html += `
      <details class="bm-expenses">
        <summary>Gastos com lanche (${expenses.length})</summary>
        <ul>${expenses.map((x) => `<li><span>${escapeHtml(x.description)}</span><b>${money(x.amount_cents)}</b></li>`).join("")}</ul>
      </details>`;
  }

  $("#bolaoMonth").innerHTML = html;
}

function renderBolaoRank() {
  const ym = bolao.month;
  const monthly = bolao.scope === "month";
  const rk = rankingFor(monthly ? (d) => monthOf(d) === ym : () => true);
  const played = rk.list.filter((r) => r.charged || r.voids);

  let html = `
    <div class="br-head">
      <h3>🏆 Ranking</h3>
      <div class="br-tabs" role="tablist" aria-label="Período do ranking">
        <button type="button" role="tab" data-scope="month" aria-selected="${monthly}">${monthLabel(ym).split(" ")[0]}</button>
        <button type="button" role="tab" data-scope="all" aria-selected="${!monthly}">Geral</button>
      </div>
    </div>`;

  if (!played.length) {
    $("#bolaoRank").innerHTML = html + `
      <div class="rank-empty"><span class="rank-empty-icon">🏆</span><p>Ranking vazio por enquanto.</p>
        <span class="muted">Os pontos aparecem quando a camisa de um dia com palpites for registrada.</span></div>`;
    return;
  }

  // Pódio: os três primeiros, com o 1º no meio
  const podium = rk.list.slice(0, 3).filter((r) => r.charged);
  const podiumOrder = podium.length === 3 ? [podium[1], podium[0], podium[2]] : podium.length === 2 ? [podium[1], podium[0]] : podium;
  html += `<div class="br-podium">` + podiumOrder.map((r) => `
    <div class="br-step place-${Math.min(r.pos, 3)}">
      ${avatar(r.p, "is-lg")}
      <strong>${escapeHtml(r.p.name)}</strong>
      <span class="br-step-pts"><b>${r.hits}</b> ${r.hits === 1 ? "ponto" : "pontos"}</span>
      <div class="br-block"><span>${MEDALS[Math.min(r.pos, 3) - 1]}</span><small>${pct(r.rate)} de acerto</small></div>
    </div>`).join("") + `</div>`;

  const move = (m) => (m > 0 ? `<small class="br-move up" title="Subiu ${m}">▲${m}</small>`
    : m < 0 ? `<small class="br-move down" title="Caiu ${-m}">▼${-m}</small>` : "");
  html += `<ol class="br-list">` + rk.list.map((r) => `
    <li class="br-row ${r.badges.some((b) => b[0] === "👑") ? "is-lead" : ""} ${r.charged ? "" : "is-idle"}">
      <span class="br-pos">${r.pos}º${move(r.move ?? 0)}</span>
      ${avatar(r.p)}
      <div class="br-main">
        <div class="br-name">${escapeHtml(r.p.name)}
          ${r.badges.map(([icon, label]) => `<span class="br-badge" title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}">${icon}</span>`).join("")}
        </div>
        <div class="br-bar" aria-hidden="true"><div style="width:${Math.round(r.rate * 100)}%;background:${r.p.color}"></div></div>
        <div class="br-sub">${r.hits} de ${r.charged} ${r.charged === 1 ? "palpite" : "palpites"} · ${pct(r.rate)}${r.voids ? ` · ${r.voids} anulado${r.voids > 1 ? "s" : ""}` : ""}</div>
      </div>
      <div class="br-form" aria-label="Últimos resultados">${r.last.map((x) => `<i class="dot-${x.st}" title="${formatDate(x.day, { day: "2-digit", month: "2-digit" })}: ${STATUS_INFO[x.st].label}"></i>`).join("")}</div>
      <div class="br-pts"><b>${r.hits}</b><span>pts</span></div>
    </li>`).join("") + `</ol>
    <p class="br-legend">
      <span><i class="dot-hit"></i>acerto</span><span><i class="dot-miss"></i>erro</span>
      <span><i class="dot-void"></i>anulado</span><span><i class="dot-absent"></i>falta</span>
      <span>👑 líder · 🎯 mira afiada · 🐿️ fiel · 🥶 pé-frio · ⏸️ descansando</span>
    </p>`;

  $("#bolaoRank").innerHTML = html;
}

// Participantes e caixa. Mantém o que está sendo digitado quando a tela se atualiza sozinha.
function renderBolaoAdmin() {
  const el = $("#bolaoAdmin");
  const kept = Object.fromEntries([...el.querySelectorAll("input[id], select[id]")].map((f) => [f.id, f.value]));
  const focused = el.contains(document.activeElement) ? document.activeElement.id : null;

  const ym = bolao.month;
  const closed = Boolean(closureOf(ym));
  const cash = cashFor(ym);
  const people = activeParticipants();
  const pays = bolao.payments.filter((p) => monthOf(p.month) === ym).sort((a, b) => a.confirmed - b.confirmed);
  const exps = bolao.expenses.filter((x) => monthOf(x.month) === ym);
  const canClose = !closed && ym < monthOf(todayKey());
  const del = (attr, id, label) => (closed ? "" : `<button class="icon-btn" ${attr}="${id}" type="button" aria-label="${label}" title="${label}">✕</button>`);
  const shortDay = (iso) => formatDate(toKey(new Date(iso)), { day: "2-digit", month: "2-digit" });
  const emojiOptions = (current) => AVATARS.map((e) => `<option ${e === current ? "selected" : ""}>${e}</option>`).join("");

  el.innerHTML = `
    <div class="ba-block">
      <span class="ba-title">Participantes</span>
      <ul class="ba-people">${bolao.participants.map((p) => `
        <li class="${p.active ? "" : "is-off"}">
          <select class="ba-emoji" data-emoji="${p.id}" aria-label="Avatar de ${escapeHtml(p.name)}">${emojiOptions(p.emoji)}</select>
          <span class="ba-pname">${escapeHtml(p.name)}${p.active ? "" : " <small>(fora do bolão)</small>"}</span>
          <button class="btn btn-ghost btn-sm" data-rename="${p.id}" type="button">Renomear</button>
          <button class="btn btn-ghost btn-sm" data-toggle="${p.id}" type="button">${p.active ? "Tirar" : "Voltar"}</button>
        </li>`).join("")}
      </ul>
      <form class="ba-form" id="bolaoPersonForm">
        <select id="bolaoPersonEmoji" class="ba-emoji" aria-label="Avatar">${emojiOptions(AVATARS[bolao.participants.length % AVATARS.length])}</select>
        <input id="bolaoPersonName" maxlength="24" autocomplete="off" placeholder="Nome do participante" aria-label="Nome do participante" required />
        <button class="btn btn-primary btn-sm" type="submit">Adicionar</button>
      </form>
    </div>

    <div class="ba-block">
      <span class="ba-title">Pix do caixa (usado no QR Code)</span>
      <form class="ba-form" id="bolaoPixForm">
        <input id="bolaoPixKey" maxlength="77" autocomplete="off" placeholder="Chave Pix (celular +55…, e-mail, CPF ou aleatória)" aria-label="Chave Pix" value="${escapeHtml(bolao.pix.key)}" />
        <input id="bolaoPixName" maxlength="25" autocomplete="off" placeholder="Nome de quem recebe" aria-label="Nome de quem recebe" value="${escapeHtml(bolao.pix.name)}" />
        <input id="bolaoPixCity" maxlength="15" autocomplete="off" placeholder="Cidade" aria-label="Cidade" value="${escapeHtml(bolao.pix.city)}" />
        <button class="btn btn-primary btn-sm" type="submit">Salvar</button>
      </form>
    </div>

    <div class="ba-block">
      <div class="ba-head">
        <span class="ba-title">Caixa · ${monthLabel(ym)}</span>
        ${canClose ? `<button class="btn btn-primary btn-sm" id="bolaoClose" type="button">Encerrar mês</button>` : ""}
      </div>
      ${closed ? `<p class="muted">Mês encerrado: pagamentos e gastos travados.</p>` : `
      <div class="ba-forms">
        <form class="ba-form" id="bolaoPayForm">
          <span class="ba-sub">Registrar pagamento recebido</span>
          <select id="bolaoPayWho" aria-label="Quem pagou" required>
            ${people.map((p) => {
              const owed = cash.people.find((r) => r.p.id === p.id)?.owed ?? 0;
              return `<option value="${p.id}">${escapeHtml(p.name)}${owed > 0 ? ` · deve ${money(owed)}` : ""}</option>`;
            }).join("")}
          </select>
          <input id="bolaoPayValue" inputmode="decimal" autocomplete="off" placeholder="Valor (R$)" aria-label="Valor pago" required />
          <button class="btn btn-primary btn-sm" type="submit">Registrar</button>
        </form>
        <form class="ba-form" id="bolaoExpForm">
          <span class="ba-sub">Registrar gasto com lanche</span>
          <input id="bolaoExpDesc" maxlength="60" autocomplete="off" placeholder="O que foi comprado" aria-label="Descrição do gasto" required />
          <input id="bolaoExpValue" inputmode="decimal" autocomplete="off" placeholder="Valor (R$)" aria-label="Valor do gasto" required />
          <button class="btn btn-primary btn-sm" type="submit">Registrar</button>
        </form>
      </div>`}
      <div class="ba-lists">
        <div>
          <span class="ba-sub">Pagamentos (${pays.length})</span>
          ${pays.length ? `<ul>${pays.map((p) => `
            <li class="${p.confirmed ? "" : "is-pending"}">
              <span>${p.confirmed ? "" : "⏳ "}${escapeHtml(participantById(p.participant_id)?.name ?? "?")} · ${shortDay(p.created_at)}</span>
              <b>${money(p.amount_cents)}</b>
              ${!p.confirmed && !closed ? `<button class="btn btn-ghost btn-sm" data-confirm-pay="${p.id}" type="button">Confirmar</button>` : ""}
              ${del("data-del-pay", p.id, "Apagar pagamento")}
            </li>`).join("")}</ul>` : `<p class="muted">Nenhum ainda.</p>`}
        </div>
        <div>
          <span class="ba-sub">Gastos (${exps.length})</span>
          ${exps.length ? `<ul>${exps.map((x) => `<li><span>${escapeHtml(x.description)} · ${shortDay(x.created_at)}</span><b>${money(x.amount_cents)}</b>${del("data-del-exp", x.id, "Apagar gasto")}</li>`).join("")}</ul>` : `<p class="muted">Nenhum ainda.</p>`}
        </div>
      </div>
    </div>`;

  for (const [id, value] of Object.entries(kept)) {
    const f = document.getElementById(id);
    if (f && value && (f.tagName !== "SELECT" || [...f.options].some((o) => o.value === value))) f.value = value;
  }
  if (focused) document.getElementById(focused)?.focus();
}

/* ---------------- Pagamento com QR Code ---------------- */

const pay = { pid: null, cents: null, custom: false, sent: null };
const payMonth = () => clampMonth(monthOf(todayKey()));

function openPay(pid = null) {
  Object.assign(pay, { pid: pid ?? rememberedPlayer(), cents: null, custom: false, sent: null });
  $("#payModal").classList.remove("hidden");
  syncModalLock();
  renderPay();
}

function closePay() {
  if ($("#payModal").classList.contains("hidden")) return;
  $("#payModal").classList.add("hidden");
  syncModalLock();
}

function renderPay() {
  const ym = payMonth();
  const cash = cashFor(ym);
  const person = participantById(pay.pid);
  const row = person && cash.people.find((r) => r.p.id === person.id);
  const due = Math.max(0, (row?.owed ?? 0) - (row?.pending ?? 0));
  const step = pay.sent ? 3 : person ? 2 : 1;
  const steps = ["Quem paga", "Valor e QR Code", "Pronto"].map((label, i) =>
    `<li class="${i + 1 === step ? "is-now" : i + 1 < step ? "is-done" : ""}"><span>${i + 1 < step ? "✓" : i + 1}</span>${label}</li>`).join("");
  let html = `<ol class="pay-steps">${steps}</ol>`;

  if (pay.sent) {
    html += `
      <div class="pay-done">
        <span class="pay-done-icon">✅</span>
        <strong>Pagamento de ${money(pay.sent.cents)} informado!</strong>
        <p>Agora o caixa confere o extrato e confirma. Até lá, aparece como ⏳ aguardando confirmação.</p>
        <button class="btn btn-primary" data-pay-close type="button">Fechar</button>
      </div>`;
  } else if (!person) {
    html += `<p class="pay-lead">Quem está pagando? (${monthLabel(ym)})</p><div class="pay-people">` +
      activeParticipants().map((p) => {
        const r = cash.people.find((x) => x.p.id === p.id);
        const owe = Math.max(0, (r?.owed ?? 0) - (r?.pending ?? 0));
        return `<button class="pay-person" data-pay-pick="${p.id}" type="button">
          ${avatar(p, "is-lg")}<strong>${escapeHtml(p.name)}</strong>
          <span class="${owe ? "is-owing" : ""}">${owe ? `deve ${money(owe)}` : "em dia"}</span>
        </button>`;
      }).join("") + `</div>`;
  } else {
    pay.cents ??= due || 500;
    const symbolic = bolao.demo || !bolao.pix.key;
    const pix = symbolic ? DEMO_PIX : bolao.pix;
    const payload = pixPayload({ key: pix.key, name: pix.name, city: pix.city, cents: pay.cents, txid: `BOLAO${person.name}` });
    const presets = [...new Set([due, 500, 1000].filter((c) => c > 0))];
    html += `
      <div class="pay-who">
        ${avatar(person)}<div><strong>${escapeHtml(person.name)}</strong>
        <span>${due ? `deve ${money(due)} em ${monthLabel(ym).toLowerCase()}` : "está em dia: pagamento adiantado"}${row?.pending ? ` · ⏳ ${money(row.pending)} aguardando` : ""}</span></div>
        <button class="link-btn" data-pay-pick="" type="button">Trocar</button>
      </div>
      <div class="pay-amounts" role="group" aria-label="Valor">
        ${presets.map((c) => `<button type="button" class="pay-chip ${!pay.custom && pay.cents === c ? "is-on" : ""}" data-pay-amount="${c}">${c === due ? `Tudo (${money(c)})` : money(c)}</button>`).join("")}
        <button type="button" class="pay-chip ${pay.custom ? "is-on" : ""}" data-pay-amount="custom">Outro valor</button>
      </div>
      ${pay.custom ? `<form class="pay-custom" id="payCustomForm"><input id="payCustomValue" inputmode="decimal" autocomplete="off" placeholder="Valor (R$)" aria-label="Outro valor" value="${(pay.cents / 100).toFixed(2).replace(".", ",")}" /><button class="btn btn-ghost btn-sm" type="submit">Usar</button></form>` : ""}
      <div class="pay-qr-wrap">
        <div class="pay-qr ${symbolic ? "is-symbolic" : ""}">${pixQrSvg(payload, `QR Code Pix de ${money(pay.cents)}`)}${symbolic ? `<span class="pay-qr-tag">SIMBÓLICO</span>` : ""}</div>
        <div class="pay-qr-info">
          <span class="pay-value">${money(pay.cents)}</span>
          <span class="muted">para ${escapeHtml(pix.name || "o caixa do lanche")}</span>
          ${symbolic ? `<p class="pay-warn">${bolao.demo ? "Demonstração: este QR Code é só de exemplo." : "Cadastre a chave Pix do caixa em ⚙️ Participantes e caixa para este QR Code virar um Pix de verdade."} Não pague por ele.</p>` : ""}
        </div>
      </div>
      <label class="pay-copy">
        <span>Pix copia e cola</span>
        <span class="pay-copy-row"><input id="payCode" readonly value="${escapeHtml(payload)}" aria-label="Código Pix copia e cola" /><button class="btn btn-ghost btn-sm" data-pay-copy type="button">Copiar</button></span>
      </label>
      <ol class="pay-howto">
        <li>Abra o app do banco → <b>Pix</b> → <b>Ler QR Code</b> (ou <b>Pix copia e cola</b>).</li>
        <li>Confira o valor e o nome de quem recebe.</li>
        <li>Volte aqui e toque em <b>Já fiz o Pix</b>.</li>
      </ol>
      <button class="btn btn-primary btn-block" data-pay-sent type="button">✅ Já fiz o Pix</button>`;
  }
  $("#payBody").innerHTML = html;
}

async function paySent() {
  const person = participantById(pay.pid);
  if (!person || !(pay.cents > 0)) return;
  const done = await bolaoWrite(
    () => backend().addPayment({ participant_id: person.id, month: `${payMonth()}-01`, amount_cents: pay.cents, confirmed: false }),
    "Mês encerrado: não dá para registrar pagamentos.",
  );
  if (!done) return;
  rememberPlayer(person.id);
  pay.sent = { cents: pay.cents };
  await refreshBolao();
  renderPay();
}

function copyText(text, okMsg) {
  navigator.clipboard?.writeText(text)
    .then(() => toast(okMsg))
    .catch(() => toast("Não deu para copiar. Selecione o texto e copie."));
}

/* ---------------- Ações ---------------- */

// Executa uma escrita no banco e mostra o motivo quando ele recusa
async function bolaoWrite(fn, denied) {
  if (busy) return false;
  busy = true;
  try {
    const result = await fn();
    if (Array.isArray(result) && !result.length) { toast(denied); return false; }
    return true;
  } catch (ex) {
    if (ex.code === "P0001") toast(ex.message);               // regra do bolão (mensagem do banco)
    else if (ex.code === "23505") toast("Já existe um participante com esse nome.");
    else if (ex.status === 403 || ex.code === "42501") toast(denied);
    else handleApiError(ex);
    return false;
  } finally {
    busy = false;
  }
}

function pickPerson(id) {
  bolao.picked = bolao.picked === id ? null : id;
  if (bolao.picked) rememberPlayer(id);
  renderBolaoGuess();
}

async function placeGuess(shirtId) {
  const day = guessDay();
  const person = participantById(bolao.picked);
  const shirt = shirtById(shirtId);
  if (!day || !person || !shirt || guessOf(day, person.id) || isResting(person.id, day)) return;
  const ok = await askConfirm({
    title: "Confirmar palpite?",
    html: `${avatar(person, "is-sm")} <b>${escapeHtml(person.name)}</b> acha que vem <b>${escapeHtml(shirt.name)}</b>
      em ${formatDate(day, { weekday: "long", day: "2-digit", month: "2-digit" })}.<br>
      Vale ${money(GUESS_CENTS)} e <b>não dá para trocar nem excluir</b> depois.`,
    media: shirtMedia(shirt),
    ok: "Confirmar palpite",
  });
  if (!ok) return;
  const done = await bolaoWrite(() => backend().placeGuess(day, person.id, shirtId), "Não foi possível registrar o palpite.");
  if (done) bolao.picked = null;
  await refreshBolao();
  if (done) toast(`🎯 Palpite de ${person.name} registrado!`);
}

// Chamado pelo app.js quando a camisa (ou a falta) do dia é registrada no calendário:
// revela os palpites e atualiza resultado, caixa e ranking na hora
async function bolaoAfterResult(day) {
  await refreshBolao();
  if (!bolao.available) return;
  const list = bolao.guesses.filter((g) => g.day === day);
  if (!list.length) return;
  if (resultOf(day) === ABSENT) { toast(`Falta registrada: os ${list.length} palpites do dia foram anulados`); return; }
  const hits = list.filter((g) => guessStatus(g) === "hit").map((g) => participantById(g.participant_id)?.name).filter(Boolean);
  const charged = list.filter((g) => ["hit", "miss"].includes(guessStatus(g))).length;
  toast(hits.length
    ? `🎯 Acertou: ${hits.join(", ")}! +${money(charged * GUESS_CENTS)} no caixa`
    : `Ninguém acertou hoje 🙈 +${money(charged * GUESS_CENTS)} no caixa`);
}

async function addPerson() {
  const name = $("#bolaoPersonName").value.trim().slice(0, 24);
  const emoji = AVATARS.includes($("#bolaoPersonEmoji").value) ? $("#bolaoPersonEmoji").value : AVATARS[0];
  if (!name) return;
  if (bolao.participants.some((p) => p.name.toLowerCase() === name.toLowerCase())) { toast("Já existe um participante com esse nome."); return; }
  const color = AVATAR_COLORS[bolao.participants.length % AVATAR_COLORS.length];
  const ok = await bolaoWrite(() => backend().addParticipant({ name, emoji, color }), "Não foi possível adicionar.");
  if (ok) { $("#bolaoPersonName").value = ""; toast(`${emoji} ${name} entrou no bolão`); }
  await refreshBolao();
}

async function renamePerson(id) {
  const p = participantById(id);
  const name = p && prompt("Novo nome do participante:", p.name)?.trim().slice(0, 24);
  if (!name || name === p.name) return;
  const ok = await bolaoWrite(() => backend().updateParticipant(id, { name }), "Não foi possível renomear.");
  await refreshBolao();
  if (ok) toast("Nome atualizado");
}

async function setPersonEmoji(id, emoji) {
  if (!participantById(id) || !AVATARS.includes(emoji)) return;
  await bolaoWrite(() => backend().updateParticipant(id, { emoji }), "Não foi possível trocar o avatar.");
  await refreshBolao();
}

async function togglePerson(id) {
  const p = participantById(id);
  if (!p) return;
  if (p.active) {
    const ok = await askConfirm({
      title: `Tirar ${p.name} do bolão?`, // o título é texto puro (textContent)
      html: "Ele não aparece mais para palpitar. Os palpites, pontos e pagamentos que já existem continuam guardados.",
      ok: "Tirar do bolão",
      danger: true,
    });
    if (!ok) return;
  }
  const done = await bolaoWrite(() => backend().updateParticipant(id, { active: !p.active }), "Não foi possível alterar.");
  await refreshBolao();
  if (done) toast(p.active ? `${p.name} saiu do bolão` : `${p.name} voltou ao bolão`);
}

async function submitPayment() {
  const pid = $("#bolaoPayWho").value;
  const cents = parseCents($("#bolaoPayValue").value);
  if (!participantById(pid)) return;
  if (!cents) { toast("Valor inválido. Ex.: 5,00"); return; }
  const ok = await bolaoWrite(
    () => backend().addPayment({ participant_id: pid, month: `${bolao.month}-01`, amount_cents: cents }),
    "Mês encerrado: não dá para registrar pagamentos.",
  );
  if (ok) {
    $("#bolaoPayValue").value = "";
    toast(`Pagamento de ${money(cents)} de ${participantById(pid).name} registrado`);
  }
  await refreshBolao();
}

async function confirmPayment(id) {
  const row = bolao.payments.find((p) => p.id === id);
  if (!row || row.confirmed) return;
  const name = participantById(row.participant_id)?.name ?? "?";
  const ok = await askConfirm({
    title: "Confirmar pagamento?",
    html: `Confira no extrato: entrou um Pix de <b>${money(row.amount_cents)}</b> de <b>${escapeHtml(name)}</b>?`,
    ok: "Confirmar",
  });
  if (!ok) return;
  const done = await bolaoWrite(() => backend().confirmPayment(id), "Não foi possível confirmar: o mês pode ter sido encerrado.");
  await refreshBolao();
  if (done) toast(`✅ Pagamento de ${name} confirmado`);
}

async function submitExpense() {
  const description = $("#bolaoExpDesc").value.trim().slice(0, 60);
  const cents = parseCents($("#bolaoExpValue").value);
  if (!description) return;
  if (!cents) { toast("Valor inválido. Ex.: 23,90"); return; }
  const ok = await bolaoWrite(
    () => backend().addExpense({ month: `${bolao.month}-01`, description, amount_cents: cents }),
    "Mês encerrado: não dá para registrar gastos.",
  );
  if (ok) {
    $("#bolaoExpDesc").value = "";
    $("#bolaoExpValue").value = "";
    toast(`Gasto de ${money(cents)} registrado`);
  }
  await refreshBolao();
}

async function deleteMoneyRow(kind, id) {
  const row = (kind === "pay" ? bolao.payments : bolao.expenses).find((x) => x.id === id);
  if (!row) return;
  const what = kind === "pay"
    ? `o pagamento de <b>${escapeHtml(participantById(row.participant_id)?.name ?? "?")}</b>`
    : `o gasto <b>${escapeHtml(row.description)}</b>`;
  const ok = await askConfirm({ title: "Apagar lançamento?", html: `Isso apaga ${what} (${money(row.amount_cents)}).`, ok: "Apagar", danger: true });
  if (!ok) return;
  const done = await bolaoWrite(
    () => (kind === "pay" ? backend().deletePayment(id) : backend().deleteExpense(id)),
    "Não foi possível apagar: o mês pode ter sido encerrado.",
  );
  await refreshBolao();
  if (done) toast("Lançamento apagado");
}

async function savePixConfig() {
  const patch = {
    pix_key: $("#bolaoPixKey").value.replace(/\s+/g, "").slice(0, 77),
    pix_name: $("#bolaoPixName").value.trim().slice(0, 25),
    pix_city: $("#bolaoPixCity").value.trim().slice(0, 15),
  };
  if (patch.pix_key && (!patch.pix_name || !patch.pix_city)) { toast("Preencha também o nome de quem recebe e a cidade."); return; }
  const ok = await bolaoWrite(() => backend().setPixConfig(patch), "Não foi possível salvar o Pix.");
  await refreshBolao();
  if (ok) toast(patch.pix_key ? "Pix do caixa salvo" : "Pix do caixa removido");
}

async function closeBolaoMonth() {
  const ym = bolao.month;
  if (closureOf(ym) || ym >= monthOf(todayKey())) return;
  const cash = cashFor(ym);
  const names = cash.winners.map((r) => r.p.name);
  const each = names.length ? Math.floor(cash.prize / names.length) : 0;
  const ok = await askConfirm({
    title: `Encerrar ${monthLabel(ym).toLowerCase()}?`,
    html: (names.length
      ? `Prêmio de <b>${money(cash.prize)}</b> para <b>${escapeHtml(names.join(", "))}</b>${names.length > 1 ? ` (${money(each)} para cada)` : ""}.`
      : `Ninguém pontuou: a sobra de <b>${money(cash.prize)}</b> fica com o grupo.`) +
      (cash.missing ? `<br>Atenção: ainda faltam <b>${money(cash.missing)}</b> a receber.` : "") +
      (cash.pending ? `<br>Atenção: <b>${money(cash.pending)}</b> em pagamentos ainda não confirmados não entram no caixa.` : "") +
      `<br>Depois disso, pagamentos, gastos e registros do mês ficam travados.`,
    ok: "Encerrar mês",
  });
  if (!ok) return;
  const done = await bolaoWrite(
    () => backend().closeMonth({ month: `${ym}-01`, prize_cents: cash.prize, winners: names.join(", ").slice(0, 300) }),
    "Só dá para encerrar um mês depois que ele termina.",
  );
  await refreshBolao();
  if (done) toast("🏆 Mês encerrado");
}

function moveBolaoMonth(delta) {
  bolao.month = clampMonth(shiftMonth(bolao.month, delta));
  renderBolaoMonth();
  renderBolaoRank();
  renderBolaoAdmin();
}

/* ---------------- Eventos ---------------- */

document.getElementById("bolao").addEventListener("click", (e) => {
  const t = e.target;
  const hit = (sel) => t.closest(sel);
  let el;
  if ((el = hit("[data-person]"))) pickPerson(el.dataset.person);
  else if ((el = hit("[data-guess]"))) placeGuess(el.dataset.guess);
  else if ((el = hit("[data-scope]"))) { bolao.scope = el.dataset.scope; renderBolaoRank(); }
  else if ((el = hit("[data-pay]"))) openPay(el.dataset.pay);
  else if ((el = hit("[data-rename]"))) renamePerson(el.dataset.rename);
  else if ((el = hit("[data-toggle]"))) togglePerson(el.dataset.toggle);
  else if ((el = hit("[data-confirm-pay]"))) confirmPayment(el.dataset.confirmPay);
  else if ((el = hit("[data-del-pay]"))) deleteMoneyRow("pay", el.dataset.delPay);
  else if ((el = hit("[data-del-exp]"))) deleteMoneyRow("exp", el.dataset.delExp);
  else if (hit("#bolaoPayOpen")) openPay();
  else if (hit("#bolaoPrev")) moveBolaoMonth(-1);
  else if (hit("#bolaoNext")) moveBolaoMonth(1);
  else if (hit("#bolaoClose")) closeBolaoMonth();
});

document.getElementById("bolao").addEventListener("change", (e) => {
  const sel = e.target.closest("[data-emoji]");
  if (sel) setPersonEmoji(sel.dataset.emoji, sel.value);
});

document.getElementById("bolao").addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.id === "bolaoPersonForm") addPerson();
  else if (e.target.id === "bolaoPixForm") savePixConfig();
  else if (e.target.id === "bolaoPayForm") submitPayment();
  else if (e.target.id === "bolaoExpForm") submitExpense();
});

document.getElementById("payModal").addEventListener("click", (e) => {
  const t = e.target;
  let el;
  if (t === e.currentTarget || t.closest("[data-pay-close]")) closePay();
  else if ((el = t.closest("[data-pay-pick]"))) {
    pay.pid = el.dataset.payPick || null;
    pay.cents = null;
    pay.custom = false;
    if (pay.pid) rememberPlayer(pay.pid);
    renderPay();
  } else if ((el = t.closest("[data-pay-amount]"))) {
    pay.custom = el.dataset.payAmount === "custom";
    if (!pay.custom) pay.cents = Number(el.dataset.payAmount);
    renderPay();
    if (pay.custom) document.getElementById("payCustomValue")?.focus();
  } else if (t.closest("[data-pay-copy]")) copyText(document.getElementById("payCode").value, "Pix copia e cola copiado");
  else if (t.closest("[data-pay-sent]")) paySent();
});

document.getElementById("payModal").addEventListener("submit", (e) => {
  e.preventDefault();
  const cents = parseCents(document.getElementById("payCustomValue")?.value);
  if (!cents) { toast("Valor inválido. Ex.: 7,50"); return; }
  pay.cents = cents;
  renderPay();
});

document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePay(); });
