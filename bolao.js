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
// Ícones SVG do sprite no index.html (#i-<nome>): crescem com o texto e usam a cor de onde estão
const icon = (key, cls = "") => `<svg class="ico ic-${key} ${cls}" aria-hidden="true"><use href="#i-${key}"/></svg>`;
// Cor do avatar de cada participante (o avatar mostra a inicial do nome)
const AVATAR_COLORS = ["#4f46e5", "#a855f7", "#ec4899", "#f59e0b", "#10b981", "#0ea5e9", "#ef4444", "#14b8a6", "#f97316", "#64748b"];
const MEDALS = ["is-gold", "is-silver", "is-bronze"];
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
  avatarFor: null,  // participante (ou "new") com a grade de cores aberta
  newColor: null,   // cor escolhida para o próximo participante
  openDetails: new Set(), // listas recolhíveis abertas (continuam abertas quando a tela se atualiza)
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
// Os mesmos participantes que o schema.sql cadastra
const DEMO_PEOPLE = [
  ["Stingnel", "#4f46e5"], ["Manito", "#f59e0b"], ["Ortelas", "#a855f7"],
  ["Balothalis", "#ef4444"], ["Lolo", "#10b981"], ["Gabriel", "#0ea5e9"],
];

function demoId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const h = () => Math.floor(Math.random() * 0x10000).toString(16).padStart(4, "0");
  return `${h()}${h()}-${h()}-4${h().slice(1)}-8${h().slice(1)}-${h()}${h()}${h()}`;
}

// Demonstração começa zerada, como o banco de verdade: só os participantes, sem
// palpites, pagamentos nem compras. O que for feito na tela fica na memória até recarregar.
function makeDemo() {
  const people = DEMO_PEOPLE.map(([name, color], i) => ({
    id: `00000000-0000-4000-8000-${String(i + 1).padStart(12, "0")}`, name, color, active: true,
  }));
  return {
    participants: people, guesses: [], payments: [], expenses: [], closures: [],
    config: { pix_key: "", pix_name: "", pix_city: "" }, results: {}, firstDay: CAL_START,
  };
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
  async closeMonth(row) { demo.data.closures.push({ closed_at: new Date().toISOString(), ...row }); },
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
  hit: { icon: "check", label: "acertou" },
  miss: { icon: "x", label: "errou" },
  void: { icon: "pause", label: "anulado (acertou na véspera)" },
  absent: { icon: "minus", label: "dia anulado (falta)" },
  pending: { icon: "hourglass", label: "aguardando a camisa" },
  open: { icon: "lock", label: "palpite guardado" },
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
    if (top > 0 && r.hits === top) r.badges.push(["crown", "Líder em pontos"]);
    if (bestRate > 0 && r.charged >= 3 && r.rate === bestRate) r.badges.push(["target", "Mira afiada: melhor aproveitamento"]);
    if (mostPlayed >= 3 && r.charged === mostPlayed) r.badges.push(["heart", "Fiel ao bolão: mais palpites"]);
    if (coldest >= 3 && r.coldStreak === coldest) r.badges.push(["snow", `Pé-frio: ${r.coldStreak} erros seguidos`]);
    if (today && isResting(r.p.id, today)) r.badges.push(["pause", "Acertou e descansa no próximo palpite"]);
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
const initialOf = (name) => (String(name).trim().charAt(0) || "?").toUpperCase();
const avatar = (p, cls = "") =>
  `<span class="bp-avatar ${cls}" style="--c:${p.color}" aria-hidden="true">${escapeHtml(initialOf(p.name))}</span>`;
const bolaoNote = (html) => `<p class="bg-note">${html}</p>`;

function renderBolao() {
  $("#bolao").classList.toggle("hidden", !bolao.available);
  if (!bolao.available || !state) return;
  if (bolao.demo) applyBolao(demoSnapshot());
  $("#bolaoDemo").classList.toggle("hidden", !bolao.demo);
  $("#bolaoDemo").innerHTML = bolao.demo
    ? `<strong>${icon("eye")}Modo demonstração</strong>
       <span>O bolão ainda não foi ativado no banco de dados. Tudo começa zerado e dá para testar à vontade,
       mas nada é salvo: ao recarregar a página, volta ao zero. A camisa registrada no calendário é real e
       já entra no resultado.</span>`
    : "";
  bolao.month = clampMonth(bolao.month ?? monthOf(todayKey()));
  renderBolaoHero();
  renderBolaoWallet();
  renderBolaoGuess();
  renderBolaoRank();
  renderBolaoAdmin();
  if (!$("#payModal").classList.contains("hidden")) renderPay();
  if (!$("#buyModal").classList.contains("hidden")) renderBuyPreview();
}

// Cabeçalho: bolão do dia, caixa do mês e líder do mês
function renderBolaoHero() {
  $("#bolaoHeroSub").textContent = `Palpite a camisa do ${state.friend}, junte o caixa do lanche e dispute a sobra do mês.`;
  const day = guessDay();
  const pot = day ? bolao.guesses.filter((g) => g.day === day).length * GUESS_CENTS : 0;
  const ym = clampMonth(monthOf(todayKey()));
  const cash = cashFor(ym);
  const leader = rankingFor((d) => monthOf(d) === ym).list.find((r) => r.hits > 0);
  $("#bolaoHeroStats").innerHTML = `
    <div class="bh-stat">
      <span>${day === todayKey() ? "Bolão de hoje" : "Próximo bolão"}</span>
      <b>${money(pot)}</b>
    </div>
    <div class="bh-stat">
      <span>Caixa de ${monthLabel(ym).split(" ")[0].toLowerCase()}</span>
      <b>${money(cash.received)}</b>
    </div>
    <div class="bh-stat bh-leader">
      <span>Líder do mês</span>
      ${leader ? `<b title="${escapeHtml(leader.p.name)}">${avatar(leader.p, "is-sm")}<span class="bh-name">${escapeHtml(leader.p.name)}</span><small>${leader.hits} pts</small></b>` : "<b>—</b>"}
    </div>`;
}

// Saldo do caixa desde o início: o que entrou (Pix confirmados) menos lanche e prêmios pagos
function walletStats() {
  const sum = (list, f) => list.reduce((a, x) => a + f(x), 0);
  const confirmed = bolao.payments.filter((p) => p.confirmed);
  const received = sum(confirmed, (p) => p.amount_cents);
  const snacks = sum(bolao.expenses, (x) => x.amount_cents);
  const prizes = sum(bolao.closures, (c) => c.prize_cents);

  const moves = [
    ...confirmed.map((p) => ({ at: p.created_at, cents: p.amount_cents, icon: "coin", label: `Pix de ${participantById(p.participant_id)?.name ?? "?"}` })),
    ...bolao.expenses.map((x) => ({ at: x.created_at, cents: -x.amount_cents, icon: "receipt", label: x.description })),
    ...bolao.closures.filter((c) => c.prize_cents > 0).map((c) => ({
      at: c.closed_at ?? c.month, cents: -c.prize_cents, icon: "trophy",
      label: `Prêmio de ${monthLabel(monthOf(c.month)).toLowerCase()}${c.winners ? ` · ${c.winners}` : ""}`,
    })),
  ].sort((a, b) => String(b.at).localeCompare(String(a.at)));

  return { received, snacks, moves, balance: received - snacks - prizes };
}

function renderBolaoWallet() {
  const w = walletStats();
  const signed = (c) => `${c < 0 ? "−" : "+"}${money(Math.abs(c))}`;
  const when = (at) => formatDate(toKey(new Date(at)), { day: "2-digit", month: "2-digit" });
  $("#bolaoWallet").innerHTML = `
    <div class="bw-card">
      <div class="bw-main">
        <span class="bw-icon">${icon("wallet")}</span>
        <div class="bw-text">
          <span class="bw-label">Saldo do caixa</span>
          <strong class="bw-value ${w.balance < 0 ? "is-neg" : ""}" aria-label="${money(w.balance)}"><span class="bw-cur">R$</span> <span id="bolaoBalance" aria-hidden="true">${formatBalance(walletMotion.visible ? walletMotion.current : 0)}</span></strong>
          <span class="bw-hint">Saldo fictício controlado pelo app: o dinheiro de verdade fica na conta Pix do caixa.</span>
        </div>
      </div>
      <ul class="bw-flow">
        <li><span>Entrou</span><b class="${w.received ? "is-in" : ""}">${w.received ? signed(w.received) : money(0)}</b></li>
        <li><span>Lanche</span><b class="${w.snacks ? "is-out" : ""}">${w.snacks ? signed(-w.snacks) : money(0)}</b></li>
      </ul>
      <div class="bw-actions">
        <button class="btn btn-primary" id="bolaoBuyOpen" type="button">${icon("receipt")}Registrar compra do lanche</button>
        ${activeParticipants().length ? `<button class="btn btn-ghost" id="bolaoPayOpen" type="button">${icon("card")}Pagar com Pix</button>` : ""}
      </div>
    </div>
    ${w.moves.length ? `
    <details class="bw-moves" data-keep="moves" ${bolao.openDetails.has("moves") ? "open" : ""}>
      <summary>Extrato do caixa (${w.moves.length})</summary>
      <ul>${w.moves.slice(0, 40).map((m) => `
        <li>${icon(m.icon)}<span class="bw-move-label">${escapeHtml(m.label)}</span><time>${when(m.at)}</time>
          <b class="${m.cents < 0 ? "is-out" : "is-in"}">${signed(m.cents)}</b></li>`).join("")}
      </ul>
    </details>` : ""}`;

  // Se o saldo mudou (compra, pagamento) ou a tela foi redesenhada no meio da contagem, conta até o valor novo
  if (walletMotion.visible && Math.round(walletMotion.current * 100) !== w.balance) countBalance(w.balance, walletMotion.current);
}

/* ---------------- Animação do saldo ---------------- */
// Anime.js, utils.roundPad: o saldo "carrega" contando de R$ 0,00 até o valor do caixa,
// sempre com 2 casas decimais. Quando o saldo muda, conta do valor antigo até o novo.
const walletMotion = { visible: false, current: 0, anim: null };

// 1234.5 -> "1.234,50" (roundPad garante as 2 casas; aqui só vira o formato brasileiro)
function formatBalance(reais) {
  const fixed = window.anime?.utils?.roundPad ? window.anime.utils.roundPad(reais, 2) : Number(reais).toFixed(2);
  const [int, dec = "00"] = String(fixed).split(".");
  return `${int.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${dec}`;
}

function countBalance(toCents, fromReais) {
  const el = document.getElementById("bolaoBalance");
  if (!el) return;
  const to = toCents / 100;
  const lib = window.anime;
  walletMotion.anim?.pause();
  if (!lib?.animate || !lib?.utils?.roundPad || fromReais === to || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    walletMotion.current = to;
    el.textContent = formatBalance(to);
    return;
  }
  walletMotion.anim = lib.animate(el, {
    innerHTML: [fromReais, to],
    modifier: (v) => {
      walletMotion.current = Number(v);
      return formatBalance(v);
    },
    duration: 1600,
    ease: "out(3)",
  });
}

// Conta a partir do zero sempre que o saldo aparece na tela (ao abrir o bolão ou rolar até ele)
if ("IntersectionObserver" in window) {
  new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting && !walletMotion.visible && document.getElementById("bolaoBalance")) {
        walletMotion.visible = true;
        walletMotion.current = 0;
        countBalance(walletStats().balance, 0);
      } else if (!e.isIntersecting && walletMotion.visible) {
        walletMotion.visible = false;
        walletMotion.anim?.pause();
      }
    }
  }, { threshold: 0.3 }).observe(document.getElementById("bolaoWallet"));
} else {
  walletMotion.visible = true;
}

/* ---------------- Compra do lanche ---------------- */

function openBuy() {
  $("#buyForm").reset();
  renderBuyPreview();
  $("#buyModal").classList.remove("hidden");
  syncModalLock();
  if (matchMedia("(hover: hover)").matches) setTimeout(() => $("#buyDesc").focus(), 50);
}

function closeBuy() {
  if ($("#buyModal").classList.contains("hidden")) return;
  $("#buyModal").classList.add("hidden");
  syncModalLock();
}

// Mostra como o saldo fica depois da compra, enquanto o valor é digitado
function renderBuyPreview() {
  const { balance } = walletStats();
  const cents = parseCents($("#buyValue").value);
  const after = balance - (cents ?? 0);
  $("#buyPreview").innerHTML = `
    <div><span>Saldo agora</span><b>${money(balance)}</b></div>
    <span class="buy-arrow" aria-hidden="true">→</span>
    <div><span>Depois da compra</span><b class="${cents && after < 0 ? "is-neg" : ""}">${cents ? money(after) : "—"}</b></div>
    ${cents && after < 0 ? `<p class="buy-warn">O saldo vai ficar negativo: faltam ${money(-after)} no caixa.</p>` : ""}`;
}

async function submitBuy() {
  const description = $("#buyDesc").value.trim().slice(0, 60);
  const cents = parseCents($("#buyValue").value);
  if (!description) return;
  if (!cents) { toast("Valor inválido. Ex.: 23,90"); return; }
  const ym = payMonth();
  const ok = await bolaoWrite(
    () => backend().addExpense({ month: `${ym}-01`, description, amount_cents: cents }),
    "Mês encerrado: não dá para registrar compras.",
  );
  if (!ok) return;
  closeBuy();
  await refreshBolao();
  toast(`Compra registrada. Saldo do caixa: ${money(walletStats().balance)}`);
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
        <span class="bg-meta">${icon("clock")}Fecha ao meio-dia${isToday ? ` · ${timeLeft(day)}` : ""} · ${done.length} de ${people.length - resting.length} já palpitaram</span>
        <span class="bg-pot">${icon("coin")}Bolão do dia: <b>${money(pot * GUESS_CENTS)}</b> em ${pot} ${pot === 1 ? "palpite" : "palpites"}</span>
      </div>`;

    if (!people.length) {
      html += bolaoNote("Cadastre os participantes em <b>Participantes e caixa</b>, no fim desta seção.");
    } else {
      html += `<p class="bg-step"><span>1</span>Quem vai palpitar?</p>
        <div class="bg-people">` + people.map((p) => {
          const did = Boolean(guessOf(day, p.id));
          const rest = !did && isResting(p.id, day);
          const title = did ? "Já palpitou (palpite guardado até fechar)" : rest ? "Acertou no dia anterior: descansa hoje" : "Escolher";
          return `
            <button class="bg-person ${p.id === bolao.picked ? "is-picked" : ""} ${did ? "is-done" : ""} ${rest ? "is-resting" : ""}"
                    data-person="${p.id}" type="button" ${did || rest ? "disabled" : ""} aria-pressed="${p.id === bolao.picked}" title="${title}">
              ${avatar(p)}<span class="bg-person-name">${escapeHtml(p.name)}</span>${did ? icon("check", "is-tag") : rest ? icon("pause", "is-tag") : ""}
            </button>`;
        }).join("") + `</div>`;

      html += `<p class="bg-step ${picked ? "" : "is-waiting"}"><span>2</span>${picked ? `Qual camisa <b>${escapeHtml(picked.name)}</b> acha que vem?` : "Qual camisa vem? (escolha quem palpita primeiro)"}</p>
        <div class="bg-shirts ${picked ? "" : "is-waiting"}">` + state.shirts.map((s) => `
          <button class="bg-shirt" data-guess="${escapeHtml(s.id)}" type="button" ${picked ? "" : "disabled"}>
            <span class="bg-media">${shirtMedia(s)}</span>
            <span class="bg-name" title="${escapeHtml(s.name)}">${escapeHtml(s.name)}</span>
          </button>`).join("") + `</div>
        <p class="bg-rule">${icon("lock")}Cada palpite vale ${money(GUESS_CENTS)} e é definitivo: não dá para trocar nem excluir.</p>`;
    }
  }

  $("#bolaoGuess").innerHTML = html;
  $("#bolaoReveal").innerHTML = renderReveal() || bolaoNote("O resultado aparece aqui depois do primeiro dia de palpites.");
}

// Palpites do último dia fechado: quem acertou, quem errou e quem descansou
function renderReveal() {
  const day = revealDay();
  if (!day) return "";
  const result = resultOf(day);
  const shirt = result && result !== ABSENT ? shirtById(result) : null;
  const status = result === ABSENT ? "Faltou: dia anulado"
    : shirt ? `Veio de <b>${escapeHtml(shirt.name)}</b>`
    : `Camisa ainda não registrada · <a href="#inicio">registrar no calendário</a>`;
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
      <span class="bg-mark" title="${STATUS_INFO[st].label}">${icon(STATUS_INFO[st].icon)}</span>
    </li>`).join("");

  return `
    <div class="bg-reveal">
      <div class="bg-reveal-head">
        <span>Palpites de ${formatDate(day, { weekday: "short", day: "2-digit", month: "2-digit" })}</span>
        <span class="muted">${status}</span>
      </div>
      ${list.length ? `<ul>${rows}</ul>` : `<p class="muted">Ninguém palpitou nesse dia.</p>`}
      ${charged ? `<p class="bg-rested">${icon("coin")}${charged} ${charged === 1 ? "palpite valeu" : "palpites valeram"} ${money(charged * GUESS_CENTS)} para o caixa</p>` : ""}
      ${rested.length ? `<p class="bg-rested">${icon("pause")}Descansou (acertou na véspera): ${rested.map((p) => escapeHtml(p.name)).join(", ")}</p>` : ""}
    </div>`;
}

// Ranking simbólico: só no modo demonstração e só enquanto ninguém tem pontos de verdade.
// Pontos de exemplo para dar para ver o efeito da animação; não entram no saldo nem no caixa.
function symbolicRanking() {
  const sample = [
    { hits: 7, charged: 9, voids: 2, move: 1, last: ["hit", "miss", "void", "hit", "hit"], badges: [["crown", "Líder em pontos"], ["target", "Mira afiada: melhor aproveitamento"]] },
    { hits: 6, charged: 9, voids: 1, move: -1, last: ["hit", "hit", "miss", "void", "hit"], badges: [["pause", "Acertou e descansa no próximo palpite"]] },
    { hits: 5, charged: 10, voids: 1, move: 2, last: ["miss", "hit", "hit", "miss", "hit"], badges: [] },
    { hits: 4, charged: 9, voids: 0, move: 0, last: ["miss", "hit", "miss", "hit", "miss"], badges: [] },
    { hits: 3, charged: 10, voids: 1, move: -2, last: ["miss", "void", "miss", "hit", "miss"], badges: [] },
    { hits: 2, charged: 11, voids: 0, move: 0, last: ["absent", "miss", "miss", "miss", "miss"], badges: [["heart", "Fiel ao bolão: mais palpites"], ["snow", "Pé-frio: 4 erros seguidos"]] },
  ];
  const days = [];
  for (let d = todayKey(), i = 0; i < 5; i++) days.unshift((d = stepWeekday(d, -1)));
  const list = activeParticipants().slice(0, sample.length).map((p, i) => {
    const s = sample[i];
    return { ...s, p, pos: i + 1, rate: s.hits / s.charged, last: s.last.map((st, k) => ({ day: days[k], st })) };
  });
  return { list };
}

function renderBolaoRank() {
  const ym = bolao.month;
  const monthly = bolao.scope === "month";
  let rk = rankingFor(monthly ? (d) => monthOf(d) === ym : () => true);
  let played = rk.list.filter((r) => r.charged || r.voids);
  const symbolic = bolao.demo && !played.length && activeParticipants().length > 0;
  if (symbolic) {
    rk = symbolicRanking();
    played = rk.list;
  }

  let html = `
    <div class="br-head">
      <h3>${icon("trophy")}Ranking</h3>
      <div class="br-tabs" role="tablist" aria-label="Período do ranking">
        <button type="button" role="tab" data-scope="month" aria-selected="${monthly}">${monthLabel(ym).split(" ")[0]}</button>
        <button type="button" role="tab" data-scope="all" aria-selected="${!monthly}">Geral</button>
      </div>
    </div>
    ${symbolic ? `<p class="br-symbolic">${icon("eye")}<span><b>Ranking simbólico:</b> pontos de exemplo só para ver o efeito.
      Some sozinho quando houver pontos de verdade.</span></p>` : ""}`;

  if (!played.length) {
    $("#bolaoRank").innerHTML = html + `
      <div class="rank-empty"><span class="rank-empty-icon">${icon("trophy", "is-xl")}</span><p>Ranking vazio por enquanto.</p>
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
      <div class="br-block">${icon("medal", `is-medal ${MEDALS[Math.min(r.pos, 3) - 1]}`)}<small>${pct(r.rate)} de acerto</small></div>
    </div>`).join("") + `</div>`;

  const move = (m) => (m > 0 ? `<small class="br-move up" title="Subiu ${m}">▲${m}</small>`
    : m < 0 ? `<small class="br-move down" title="Caiu ${-m}">▼${-m}</small>` : "");
  html += `<ol class="br-list">` + rk.list.map((r) => `
    <li class="br-row ${r.badges.some((b) => b[0] === "crown") ? "is-lead" : ""} ${r.charged ? "" : "is-idle"}">
      <span class="br-pos">${r.pos}º${move(r.move ?? 0)}</span>
      ${avatar(r.p)}
      <div class="br-main">
        <div class="br-name">${escapeHtml(r.p.name)}
          ${r.badges.map(([key, label]) => `<span class="br-badge" title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}">${icon(key)}</span>`).join("")}
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
      <span>${icon("crown")}líder</span><span>${icon("target")}mira afiada</span><span>${icon("heart")}fiel</span><span>${icon("snow")}pé-frio</span><span>${icon("pause")}descansando</span>
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
  const del = (attr, id, label) => (closed ? "" : `<button class="icon-btn" ${attr}="${id}" type="button" aria-label="${label}" title="${label}">${icon("close", "is-tag")}</button>`);
  const shortDay = (iso) => formatDate(toKey(new Date(iso)), { day: "2-digit", month: "2-digit" });
  // Cores do avatar: a grade abre embaixo de quem está trocando (ou do formulário de novo participante)
  const used = new Set(bolao.participants.map((p) => p.color));
  bolao.newColor ??= AVATAR_COLORS.find((c) => !used.has(c)) ?? AVATAR_COLORS[0];
  const colorGrid = (current, label) => `
    <div class="ba-colors" role="group" aria-label="${label}">${AVATAR_COLORS.map((c) => `
      <button type="button" class="ba-color ${c === current ? "is-on" : ""}" data-color-set="${c}" style="--c:${c}"
              aria-label="Cor ${c}" aria-pressed="${c === current}"></button>`).join("")}
    </div>`;
  const avatarBtn = (p, id) => `
    <button class="ba-avatar-btn" data-avatar-edit="${id}" type="button" aria-expanded="${bolao.avatarFor === id}"
            title="Trocar a cor" aria-label="Trocar a cor${p.name ? ` de ${escapeHtml(p.name)}` : ""}">${avatar(p)}</button>`;

  el.innerHTML = `
    <div class="ba-block">
      <span class="ba-title">Participantes</span>
      <ul class="ba-people">${bolao.participants.map((p) => `
        <li class="${p.active ? "" : "is-off"} ${bolao.avatarFor === p.id ? "is-editing" : ""}">
          <div class="ba-person-row">
            ${avatarBtn(p, p.id)}
            <span class="ba-pname">${escapeHtml(p.name)}${p.active ? "" : " <small>(fora do bolão)</small>"}</span>
            <button class="btn btn-ghost btn-sm" data-rename="${p.id}" type="button">Renomear</button>
            <button class="btn btn-ghost btn-sm" data-toggle="${p.id}" type="button">${p.active ? "Tirar" : "Voltar"}</button>
          </div>
          ${bolao.avatarFor === p.id ? colorGrid(p.color, `Cor de ${escapeHtml(p.name)}`) : ""}
        </li>`).join("")}
      </ul>
      <form class="ba-form ba-new" id="bolaoPersonForm">
        ${avatarBtn({ name: "+", color: bolao.newColor }, "new")}
        <input id="bolaoPersonName" maxlength="24" autocomplete="off" placeholder="Nome do participante" aria-label="Nome do participante" required />
        <button class="btn btn-primary btn-sm" type="submit">Adicionar</button>
        ${bolao.avatarFor === "new" ? colorGrid(bolao.newColor, "Cor do novo participante") : ""}
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
        <div class="ba-month">
          <button id="bolaoPrev" class="icon-btn" type="button" aria-label="Mês anterior" ${ym <= firstMonth() ? "disabled" : ""}>‹</button>
          <span class="ba-title">Caixa · ${monthLabel(ym)}</span>
          <button id="bolaoNext" class="icon-btn" type="button" aria-label="Próximo mês" ${ym >= lastMonth() ? "disabled" : ""}>›</button>
        </div>
        ${canClose ? `<button class="btn btn-primary btn-sm" id="bolaoClose" type="button">Encerrar mês</button>` : ""}
      </div>
      ${closed ? `
      <div class="bm-closed">${icon("trophy", "is-lg")}<div><strong>Mês encerrado</strong>
        <span>${closureOf(ym).winners
          ? `Prêmio de ${money(closureOf(ym).prize_cents)} para ${escapeHtml(closureOf(ym).winners)}`
          : `Ninguém pontuou: a sobra de ${money(closureOf(ym).prize_cents)} fica com o grupo`}</span></div></div>` : ""}
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
          <button class="btn btn-primary btn-sm" type="submit">Registrar ${money(GUESS_CENTS)}</button>
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
              <span>${p.confirmed ? "" : icon("hourglass")}${escapeHtml(participantById(p.participant_id)?.name ?? "?")} · ${shortDay(p.created_at)}</span>
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

const pay = { pid: null, cents: GUESS_CENTS, sent: null };
const payMonth = () => clampMonth(monthOf(todayKey()));

function openPay(pid = null) {
  Object.assign(pay, { pid: pid ?? rememberedPlayer(), cents: GUESS_CENTS, sent: null });
  $("#payModal").classList.remove("hidden");
  syncModalLock();
  renderPay();
}

function closePay() {
  if ($("#payModal").classList.contains("hidden")) return;
  $("#payModal").classList.add("hidden");
  syncModalLock();
  stopQr3d();
  qr3d.payload = null; // ao abrir de novo, o QR Code se forma outra vez
}

function renderPay() {
  const ym = payMonth();
  const cash = cashFor(ym);
  const person = participantById(pay.pid);
  const row = person && cash.people.find((r) => r.p.id === person.id);
  const due = Math.max(0, (row?.owed ?? 0) - (row?.pending ?? 0));
  const step = pay.sent ? 3 : person ? 2 : 1;
  const steps = ["Quem paga", "QR Code", "Pronto"].map((label, i) =>
    `<li class="${i + 1 === step ? "is-now" : i + 1 < step ? "is-done" : ""}"><span>${i + 1 < step ? icon("tick", "is-tag") : i + 1}</span>${label}</li>`).join("");
  let html = `<ol class="pay-steps">${steps}</ol>`;

  if (pay.sent) {
    html += `
      <div class="pay-done">
        <span class="pay-done-icon">${icon("sparkles")}</span>
        <strong>Pagamento de ${money(pay.sent.cents)} informado!</strong>
        <p>Agora o caixa confere o extrato e confirma. Até lá, aparece como aguardando confirmação.</p>
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
    pay.cents = GUESS_CENTS; // cada Pix vale R$ 1,00 (um palpite)
    const symbolic = bolao.demo || !bolao.pix.key;
    const pix = symbolic ? DEMO_PIX : bolao.pix;
    const payload = pixPayload({ key: pix.key, name: pix.name, city: pix.city, cents: pay.cents, txid: `BOLAO${person.name}` });
    html += `
      <div class="pay-who">
        ${avatar(person)}<div><strong>${escapeHtml(person.name)}</strong>
        <span>${due ? `deve ${money(due)} em ${monthLabel(ym).toLowerCase()} (${due / GUESS_CENTS} ${due === GUESS_CENTS ? "Pix" : "Pix de R$ 1,00"})` : "está em dia: pagamento adiantado"}${row?.pending ? ` · ${icon("hourglass")}${money(row.pending)} aguardando` : ""}</span></div>
        <button class="link-btn" data-pay-pick="" type="button">Trocar</button>
      </div>
      <p class="pay-fixed">${icon("coin")}Cada Pix vale <b>${money(GUESS_CENTS)}</b>, o valor de um palpite.</p>
      <div class="pay-qr-wrap">
        <div class="pay-qr ${symbolic ? "is-symbolic" : ""} ${qr3d.payload === payload ? "is-formed" : "is-forming"}" data-payload="${escapeHtml(payload)}">${pixQrSvg(payload, `QR Code Pix de ${money(pay.cents)}`)}${symbolic ? `<span class="pay-qr-tag">SIMBÓLICO</span>` : ""}</div>
        <div class="pay-qr-info">
          <span class="pay-value">${money(pay.cents)}</span>
          <span class="muted">para ${escapeHtml(pix.name || "o caixa do lanche")}</span>
          ${symbolic ? `<p class="pay-warn">${bolao.demo ? "Demonstração: este QR Code é só de exemplo." : "Cadastre a chave Pix do caixa em Participantes e caixa para este QR Code virar um Pix de verdade."} Não pague por ele.</p>` : ""}
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
      <button class="btn btn-primary btn-block" data-pay-sent type="button">${icon("check")}Já fiz o Pix</button>`;
  }
  $("#payBody").innerHTML = html;
  formPayQr();
}

/* ---------------- QR Code 3D ---------------- */
// Os quadradinhos do QR Code viram cubos 3D que voam até o lugar e formam o código
// (assets/vendor/qr3d.js: Three.js + adaptador de Three.js do Anime.js, fonte em build/).
// No fim aparece o SVG nítido, que é o que o app do banco lê. Sem WebGL, ou para quem
// desativou animações, o QR Code aparece direto.
const qr3d = { payload: null, run: null, box: null, module: null };

function stopQr3d() {
  qr3d.run?.stop();
  qr3d.run = null;
  qr3d.box = null;
}

function showFormedQr(box) {
  box.classList.remove("is-forming");
  box.classList.add("is-formed");
}

async function formPayQr() {
  const box = document.querySelector("#payBody .pay-qr");
  if (qr3d.box && qr3d.box !== box) stopQr3d(); // a tela foi redesenhada ou mudou de passo
  if (!box) return;
  const payload = box.dataset.payload;
  if (qr3d.payload === payload) { showFormedQr(box); return; } // já formado para este código
  qr3d.payload = payload;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || typeof qrcode !== "function") { showFormedQr(box); return; }

  try {
    qr3d.module ??= await import("./assets/vendor/qr3d.js");
    if (!box.isConnected || box.dataset.payload !== qr3d.payload) return; // trocou de tela enquanto carregava
    const qr = qrcode(0, "M");
    qr.addData(payload);
    qr.make();
    const size = qr.getModuleCount();
    const cells = [];
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) if (qr.isDark(r, c)) cells.push([r, c]);
    const pixels = Math.round(box.querySelector("svg").getBoundingClientRect().width);
    qr3d.box = box;
    qr3d.run = qr3d.module.formQr(box, {
      cells, size, pixels,
      onDone: () => {
        showFormedQr(box);
        setTimeout(() => { if (qr3d.box === box) stopQr3d(); }, 500); // depois do esmaecer, libera a placa de vídeo
      },
    });
  } catch (ex) {
    console.warn("QR Code 3D indisponível; mostrando o QR Code direto.", ex);
    showFormedQr(box);
  }
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
  if (done) toast(`Palpite de ${person.name} registrado!`);
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
    ? `Acertou: ${hits.join(", ")}! +${money(charged * GUESS_CENTS)} no caixa`
    : `Ninguém acertou hoje. +${money(charged * GUESS_CENTS)} no caixa`);
}

async function addPerson() {
  const name = $("#bolaoPersonName").value.trim().slice(0, 24);
  const color = AVATAR_COLORS.includes(bolao.newColor) ? bolao.newColor : AVATAR_COLORS[0];
  if (!name) return;
  if (bolao.participants.some((p) => p.name.toLowerCase() === name.toLowerCase())) { toast("Já existe um participante com esse nome."); return; }
  const ok = await bolaoWrite(() => backend().addParticipant({ name, color }), "Não foi possível adicionar.");
  if (ok) {
    $("#bolaoPersonName").value = "";
    bolao.newColor = null; // o próximo recebe outra cor livre
    bolao.avatarFor = null;
    toast(`${name} entrou no bolão`);
  }
  await refreshBolao();
}

// Abre/fecha a grade de cores de um participante (ou do formulário de novo participante)
function toggleAvatarGrid(id) {
  bolao.avatarFor = bolao.avatarFor === id ? null : id;
  renderBolaoAdmin();
}

function pickColor(color) {
  if (!AVATAR_COLORS.includes(color)) return;
  const id = bolao.avatarFor;
  bolao.avatarFor = null;
  if (id === "new") { bolao.newColor = color; renderBolaoAdmin(); return; }
  setPersonColor(id, color);
}

async function renamePerson(id) {
  const p = participantById(id);
  const name = p && prompt("Novo nome do participante:", p.name)?.trim().slice(0, 24);
  if (!name || name === p.name) return;
  const ok = await bolaoWrite(() => backend().updateParticipant(id, { name }), "Não foi possível renomear.");
  await refreshBolao();
  if (ok) toast("Nome atualizado");
}

async function setPersonColor(id, color) {
  if (!participantById(id) || !AVATAR_COLORS.includes(color)) return;
  await bolaoWrite(() => backend().updateParticipant(id, { color }), "Não foi possível trocar a cor.");
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
  const cents = GUESS_CENTS; // cada Pix vale um palpite
  if (!participantById(pid)) return;
  const ok = await bolaoWrite(
    () => backend().addPayment({ participant_id: pid, month: `${bolao.month}-01`, amount_cents: cents }),
    "Mês encerrado: não dá para registrar pagamentos.",
  );
  if (ok) toast(`Pagamento de ${money(cents)} de ${participantById(pid).name} registrado`);
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
  if (done) toast(`Pagamento de ${name} confirmado`);
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
  if (done) toast("Mês encerrado");
}

function moveBolaoMonth(delta) {
  bolao.month = clampMonth(shiftMonth(bolao.month, delta));
  renderBolaoRank();
  renderBolaoAdmin();
}

/* ---------------- Animação do ranking ---------------- */
// Anime.js, "time staggering": delay e duration crescem a cada posição. Quando o ranking
// aparece na tela, a 1ª posição chega primeiro e mais rápido; as seguintes, um pouco
// depois e mais devagar, cada uma até o seu lugar. O pódio sobe a partir do 1º lugar.
const rankMotion = { seen: false };

function playRankAnimation() {
  const box = $("#bolaoRank");
  const lib = window.anime;
  const steps = [...box.querySelectorAll(".br-step")];
  const rows = [...box.querySelectorAll(".br-row")];
  const canAnimate = lib?.animate && lib?.stagger && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Começa invisível para não piscar na posição final antes de deslizar
  if (canAnimate) [...steps, ...rows].forEach((el) => { el.style.opacity = "0"; });
  box.classList.remove("br-wait");
  if (!canAnimate) return;

  const { animate, stagger } = lib;
  if (steps.length) {
    animate(steps, {
      y: ["3rem", "0rem"],
      opacity: [0, 1],
      delay: stagger(100, { from: "center" }),
      duration: stagger(200, { start: 500, from: "center" }),
      ease: "out(3)",
    });
  }
  if (rows.length) {
    animate(rows, {
      x: ["-17rem", "0rem"],
      opacity: [0, 1],
      delay: stagger(100, { start: steps.length ? 250 : 0 }),
      duration: stagger(200, { start: 500 }),
      ease: "out(3)",
    });
  }
}

// Dispara ao rolar até o ranking; ao sair da tela, fica pronta para tocar de novo
if ("IntersectionObserver" in window) {
  const box = document.getElementById("bolaoRank");
  box.classList.add("br-wait");
  new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting && !rankMotion.seen) {
        rankMotion.seen = true;
        playRankAnimation();
      } else if (!e.isIntersecting && rankMotion.seen) {
        rankMotion.seen = false;
        box.classList.add("br-wait");
      }
    }
  }, { threshold: 0.15 }).observe(box);
}

/* ---------------- Eventos ---------------- */

document.getElementById("bolao").addEventListener("click", (e) => {
  const t = e.target;
  const hit = (sel) => t.closest(sel);
  let el;
  if ((el = hit("[data-person]"))) pickPerson(el.dataset.person);
  else if ((el = hit("[data-guess]"))) placeGuess(el.dataset.guess);
  else if ((el = hit("[data-scope]"))) { bolao.scope = el.dataset.scope; renderBolaoRank(); playRankAnimation(); }
  else if ((el = hit("[data-pay]"))) openPay(el.dataset.pay);
  else if ((el = hit("[data-avatar-edit]"))) toggleAvatarGrid(el.dataset.avatarEdit);
  else if ((el = hit("[data-color-set]"))) pickColor(el.dataset.colorSet);
  else if ((el = hit("[data-rename]"))) renamePerson(el.dataset.rename);
  else if ((el = hit("[data-toggle]"))) togglePerson(el.dataset.toggle);
  else if ((el = hit("[data-confirm-pay]"))) confirmPayment(el.dataset.confirmPay);
  else if ((el = hit("[data-del-pay]"))) deleteMoneyRow("pay", el.dataset.delPay);
  else if ((el = hit("[data-del-exp]"))) deleteMoneyRow("exp", el.dataset.delExp);
  else if (hit("#bolaoPayOpen")) openPay();
  else if (hit("#bolaoBuyOpen")) openBuy();
  else if (hit("#bolaoPrev")) moveBolaoMonth(-1);
  else if (hit("#bolaoNext")) moveBolaoMonth(1);
  else if (hit("#bolaoClose")) closeBolaoMonth();
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
    if (pay.pid) rememberPlayer(pay.pid);
    renderPay();
  } else if (t.closest("[data-pay-copy]")) copyText(document.getElementById("payCode").value, "Pix copia e cola copiado");
  else if (t.closest("[data-pay-sent]")) paySent();
});


document.getElementById("buyModal").addEventListener("click", (e) => {
  if (e.target === e.currentTarget || e.target.closest("[data-buy-close]")) closeBuy();
});
document.getElementById("buyValue").addEventListener("input", renderBuyPreview);
document.getElementById("buyForm").addEventListener("submit", (e) => {
  e.preventDefault();
  submitBuy();
});

// Listas recolhíveis lembram se estavam abertas ("toggle" não borbulha: escuta na captura)
document.getElementById("bolao").addEventListener("toggle", (e) => {
  const key = e.target.dataset?.keep;
  if (!key) return;
  if (e.target.open) bolao.openDetails.add(key);
  else bolao.openDetails.delete(key);
}, true);

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  closePay();
  closeBuy();
});
