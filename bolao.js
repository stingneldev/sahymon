/* =========================================================
   Esquilook — Bolão do lanche
   Todos usam o mesmo login; cada palpite escolhe o nome do participante.
   - R$ 1 por palpite, um por participante por dia, até as 11:00 (Brasília)
     ou até a camisa do dia ser registrada, o que vier primeiro.
   - Palpite é definitivo: não dá para trocar nem excluir.
   - Quem acerta descansa no próximo dia útil (não palpita, não paga),
     mas continua com os pontos. Assim ninguém dispara na frente.
   - Dia de falta do Sahymon é anulado: ninguém pontua e ninguém paga.
   - O caixa paga o lanche; no fim do mês a sobra vai para quem fez mais
     pontos (empate divide).
   Quem garante as regras é o banco (supabase/schema.sql); aqui é só a tela.
   Carregado antes do app.js: usa as funções dele só depois que o app abre.
   ========================================================= */

const GUESS_CENTS = 100;
const GUESS_CUTOFF = "11:00"; // o mesmo horário de bolao_cutoff() no banco
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const AVATARS = ["🐿️", "🦊", "🐼", "🐸", "🦁", "🐯", "🐨", "🐵", "🦉", "🐙", "🦄", "🐢", "🐧", "🐻", "🐰", "🐶"];
const AVATAR_COLORS = ["#4f46e5", "#a855f7", "#ec4899", "#f59e0b", "#10b981", "#0ea5e9", "#ef4444", "#14b8a6"];
const MEDALS = ["🥇", "🥈", "🥉"];
const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const money = (cents) => BRL.format(cents / 100);
const pct = (x) => `${Math.round(x * 100)}%`;

const bolao = {
  available: false, // some quando o banco ainda não tem as tabelas do bolão
  participants: [],
  guesses: [],      // shirt_id vem vazio enquanto o dia está aberto
  payments: [],
  expenses: [],
  closures: [],
  pixKey: "",
  month: null,      // "YYYY-MM" do caixa e do ranking mensal
  scope: "month",   // ranking: "month" ou "all"
  picked: null,     // participante escolhido para palpitar
};

/* ---------------- Carregar ---------------- */

async function loadBolao() {
  let d;
  try {
    d = await api.fetchBolao();
  } catch (ex) {
    if (ex instanceof AuthError) throw ex;
    // 404: tabelas ainda não criadas no Supabase. Outras falhas: mantém o que já tinha.
    if (ex.status === 404) bolao.available = false;
    return;
  }
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
  bolao.payments = (d.payments || []).filter((p) => UUID_RE.test(p.id) && ids.has(p.participant_id) && DAY_RE.test(p.month) && Number.isInteger(p.amount_cents));
  bolao.expenses = (d.expenses || []).filter((x) => UUID_RE.test(x.id) && DAY_RE.test(x.month) && Number.isInteger(x.amount_cents) && typeof x.description === "string");
  bolao.closures = (d.closures || []).filter((c) => DAY_RE.test(c.month) && Number.isInteger(c.prize_cents));
  bolao.pixKey = typeof d.config?.pix_key === "string" ? d.config.pix_key : "";
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

/* ---------------- Regras ---------------- */

const cutoffOf = (day) => new Date(`${day}T${GUESS_CUTOFF}:00-03:00`); // Brasília (sem horário de verão)
const monthOf = (day) => day.slice(0, 7);
const closureOf = (ym) => bolao.closures.find((c) => monthOf(c.month) === ym);
const participantById = (id) => bolao.participants.find((p) => p.id === id);
const activeParticipants = () => bolao.participants.filter((p) => p.active);
const guessOf = (day, pid) => bolao.guesses.find((g) => g.day === day && g.participant_id === pid);

// Registro do dia travado: o mês já foi encerrado no bolão (usado também pelo app.js)
const isDayLocked = (day) => bolao.available && Boolean(closureOf(monthOf(day)));

function stepWeekday(key, delta) {
  const d = fromKey(key);
  do d.setDate(d.getDate() + delta); while (isWeekend(toKey(d)));
  return toKey(d);
}

const dayOpen = (day) =>
  !isWeekend(day) && Date.now() < cutoffOf(day).getTime() && !state.log[day] && !closureOf(monthOf(day));

// Dia que recebe palpites agora: hoje até as 11:00, depois o próximo dia útil
function guessDay() {
  let day = todayKey() < CAL_START ? CAL_START : todayKey();
  if (!dayOpen(day)) day = stepWeekday(day, 1);
  return day <= CAL_END && dayOpen(day) ? day : null;
}

// Último dia útil que já fechou (os palpites dele já podem ser vistos)
function revealDay() {
  let day = todayKey() > CAL_END ? CAL_END : todayKey();
  if (isWeekend(day) || dayOpen(day)) day = stepWeekday(day, -1);
  return day >= CAL_START ? day : null;
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
  const result = state.log[day];
  return Boolean(g?.shirt_id && result && result !== ABSENT && g.shirt_id === result);
}

// Quem acertou no dia útil anterior descansa
const isResting = (pid, day) => hitOn(pid, stepWeekday(day, -1));

// hit | miss | void (anulado: acertou na véspera) | absent (falta do Sahymon) | pending | open
function guessStatus(g) {
  const result = state.log[g.day];
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

// Placar + setas de subida/descida desde o último dia com resultado
function rankingFor(inPeriod) {
  const now = scoreboard(inPeriod);
  if (now.lastScored) {
    const before = scoreboard((d) => inPeriod(d) && d < now.lastScored);
    const prevPos = new Map(before.list.filter((r) => r.charged).map((r) => [r.p.id, r.pos]));
    now.list.forEach((r) => { if (prevPos.has(r.p.id)) r.move = prevPos.get(r.p.id) - r.pos; });
  }

  // Destaques
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
  now.top = top;
  return now;
}

// Caixa do mês
function cashFor(ym) {
  const { list } = scoreboard((d) => monthOf(d) === ym);
  const paidBy = new Map();
  for (const pay of bolao.payments) {
    if (monthOf(pay.month) === ym) paidBy.set(pay.participant_id, (paidBy.get(pay.participant_id) ?? 0) + pay.amount_cents);
  }
  const people = list.map((r) => ({ ...r, paid: paidBy.get(r.p.id) ?? 0, owed: r.charged * GUESS_CENTS - (paidBy.get(r.p.id) ?? 0) }));
  // Quem pagou mas saiu do bolão (inativo) também entra no caixa
  const received = [...paidBy.values()].reduce((a, b) => a + b, 0);
  const spent = bolao.expenses.filter((x) => monthOf(x.month) === ym).reduce((a, x) => a + x.amount_cents, 0);
  const expected = people.reduce((a, r) => a + r.charged * GUESS_CENTS, 0);
  const missing = people.reduce((a, r) => a + Math.max(0, r.owed), 0);
  const top = Math.max(0, ...people.map((r) => r.hits));
  const winners = top > 0 ? people.filter((r) => r.hits === top) : [];
  return { people, received, spent, expected, missing, winners, prize: Math.max(0, received - spent) };
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

const firstMonth = () => monthKey(CAL_START);
const lastMonth = () => (monthOf(todayKey()) < monthKey(CAL_END) ? monthOf(todayKey()) : monthKey(CAL_END));
const clampMonth = (ym) => (ym < firstMonth() ? firstMonth() : ym > lastMonth() ? lastMonth() : ym);
const avatar = (p, cls = "") => `<span class="bp-avatar ${cls}" style="--c:${p.color}" aria-hidden="true">${escapeHtml(p.emoji)}</span>`;
const bolaoNote = (html) => `<p class="bg-note">${html}</p>`;

function renderBolao() {
  $("#bolao").classList.toggle("hidden", !bolao.available);
  if (!bolao.available || !state) return;
  bolao.month = clampMonth(bolao.month ?? monthOf(todayKey()));
  renderBolaoGuess();
  renderBolaoMonth();
  renderBolaoRank();
  renderBolaoAdmin();
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
    const isToday = day === todayKey();
    if (!people.some((p) => p.id === bolao.picked && !guessOf(day, p.id) && !isResting(p.id, day))) bolao.picked = null;
    const picked = participantById(bolao.picked);

    html += `
      <div class="bg-head">
        <span class="bg-eyebrow">${isToday ? "Palpite de hoje" : "Próximo palpite"}</span>
        <strong class="bg-day">${formatDate(day)}</strong>
        <span class="bg-meta">⏰ Fecha às ${GUESS_CUTOFF}${isToday ? ` · ${timeLeft(day)}` : ""} · ${done.length} de ${people.length - resting.length} já palpitaram</span>
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
  const result = state.log[day];
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
    <p class="bm-note muted">${cash.expected ? `${money(cash.expected)} em palpites valendo` : "Nenhum palpite valendo ainda"}${cash.missing ? ` · faltam ${money(cash.missing)} a receber` : ""}</p>`;

  const debtors = cash.people.filter((r) => r.owed > 0).sort((a, b) => b.owed - a.owed);
  if (debtors.length) {
    html += `<div class="bm-debts"><span class="bm-label">A pagar</span>` +
      debtors.map((r) => `<span class="bm-debt">${avatar(r.p, "is-xs")}${escapeHtml(r.p.name)} <b>${money(r.owed)}</b></span>`).join("") + `</div>`;
  } else if (cash.expected) {
    html += `<p class="bm-paid">✅ Todo mundo em dia</p>`;
  }

  if (bolao.pixKey) {
    html += `
      <div class="bm-pix">
        <span>Pix do caixa:</span>
        <code>${escapeHtml(bolao.pixKey)}</code>
        <button class="btn btn-ghost btn-sm" id="bolaoCopyPix" type="button">Copiar</button>
      </div>`;
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
  const pays = bolao.payments.filter((p) => monthOf(p.month) === ym);
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
      <div class="ba-head">
        <span class="ba-title">Caixa · ${monthLabel(ym)}</span>
        <div class="ba-actions">
          <button class="btn btn-ghost btn-sm" id="bolaoPixEdit" type="button">${bolao.pixKey ? "Trocar chave Pix" : "Cadastrar chave Pix"}</button>
          ${canClose ? `<button class="btn btn-primary btn-sm" id="bolaoClose" type="button">Encerrar mês</button>` : ""}
        </div>
      </div>
      ${closed ? `<p class="muted">Mês encerrado: pagamentos e gastos travados.</p>` : `
      <div class="ba-forms">
        <form class="ba-form" id="bolaoPayForm">
          <span class="ba-sub">Registrar pagamento</span>
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
          ${pays.length ? `<ul>${pays.map((p) => `<li><span>${escapeHtml(participantById(p.participant_id)?.name ?? "?")} · ${shortDay(p.created_at)}</span><b>${money(p.amount_cents)}</b>${del("data-del-pay", p.id, "Apagar pagamento")}</li>`).join("")}</ul>` : `<p class="muted">Nenhum ainda.</p>`}
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
  const done = await bolaoWrite(() => api.placeGuess(day, person.id, shirtId), "Não foi possível registrar o palpite.");
  if (done) bolao.picked = null;
  await refreshBolao();
  if (done) toast(`🎯 Palpite de ${person.name} registrado!`);
}

async function addPerson() {
  const name = $("#bolaoPersonName").value.trim().slice(0, 24);
  const emoji = AVATARS.includes($("#bolaoPersonEmoji").value) ? $("#bolaoPersonEmoji").value : AVATARS[0];
  if (!name) return;
  if (bolao.participants.some((p) => p.name.toLowerCase() === name.toLowerCase())) { toast("Já existe um participante com esse nome."); return; }
  const color = AVATAR_COLORS[bolao.participants.length % AVATAR_COLORS.length];
  const ok = await bolaoWrite(() => api.addParticipant({ name, emoji, color }), "Não foi possível adicionar.");
  if (ok) { $("#bolaoPersonName").value = ""; toast(`${emoji} ${name} entrou no bolão`); }
  await refreshBolao();
}

async function renamePerson(id) {
  const p = participantById(id);
  const name = p && prompt("Novo nome do participante:", p.name)?.trim().slice(0, 24);
  if (!name || name === p.name) return;
  const ok = await bolaoWrite(() => api.updateParticipant(id, { name }), "Não foi possível renomear.");
  await refreshBolao();
  if (ok) toast("Nome atualizado");
}

async function setPersonEmoji(id, emoji) {
  if (!participantById(id) || !AVATARS.includes(emoji)) return;
  await bolaoWrite(() => api.updateParticipant(id, { emoji }), "Não foi possível trocar o avatar.");
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
  const done = await bolaoWrite(() => api.updateParticipant(id, { active: !p.active }), "Não foi possível alterar.");
  await refreshBolao();
  if (done) toast(p.active ? `${p.name} saiu do bolão` : `${p.name} voltou ao bolão`);
}

async function submitPayment() {
  const pid = $("#bolaoPayWho").value;
  const cents = parseCents($("#bolaoPayValue").value);
  if (!participantById(pid)) return;
  if (!cents) { toast("Valor inválido. Ex.: 5,00"); return; }
  const ok = await bolaoWrite(
    () => api.addPayment({ participant_id: pid, month: `${bolao.month}-01`, amount_cents: cents }),
    "Mês encerrado: não dá para registrar pagamentos.",
  );
  if (ok) {
    $("#bolaoPayValue").value = "";
    toast(`Pagamento de ${money(cents)} de ${participantById(pid).name} registrado`);
  }
  await refreshBolao();
}

async function submitExpense() {
  const description = $("#bolaoExpDesc").value.trim().slice(0, 60);
  const cents = parseCents($("#bolaoExpValue").value);
  if (!description) return;
  if (!cents) { toast("Valor inválido. Ex.: 23,90"); return; }
  const ok = await bolaoWrite(
    () => api.addExpense({ month: `${bolao.month}-01`, description, amount_cents: cents }),
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
    () => (kind === "pay" ? api.deletePayment(id) : api.deleteExpense(id)),
    "Não foi possível apagar: o mês pode ter sido encerrado.",
  );
  await refreshBolao();
  if (done) toast("Lançamento apagado");
}

async function editPixKey() {
  const key = prompt("Chave Pix do caixa (CPF, celular, e-mail ou chave aleatória):", bolao.pixKey)?.trim().slice(0, 77);
  if (key === undefined || key === bolao.pixKey) return;
  const ok = await bolaoWrite(() => api.setPixKey(key), "Não foi possível salvar a chave Pix.");
  await refreshBolao();
  if (ok) toast(key ? "Chave Pix salva" : "Chave Pix removida");
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
      `<br>Depois disso, pagamentos, gastos e registros do mês ficam travados.`,
    ok: "Encerrar mês",
  });
  if (!ok) return;
  const done = await bolaoWrite(
    () => api.closeMonth({ month: `${ym}-01`, prize_cents: cash.prize, winners: names.join(", ").slice(0, 300) }),
    "Só dá para encerrar um mês depois que ele termina.",
  );
  await refreshBolao();
  if (done) toast("🏆 Mês encerrado");
}

function copyPixKey() {
  if (!bolao.pixKey) return;
  navigator.clipboard?.writeText(bolao.pixKey)
    .then(() => toast("Chave Pix copiada"))
    .catch(() => toast("Não deu para copiar. Selecione a chave."));
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
  else if ((el = hit("[data-rename]"))) renamePerson(el.dataset.rename);
  else if ((el = hit("[data-toggle]"))) togglePerson(el.dataset.toggle);
  else if ((el = hit("[data-del-pay]"))) deleteMoneyRow("pay", el.dataset.delPay);
  else if ((el = hit("[data-del-exp]"))) deleteMoneyRow("exp", el.dataset.delExp);
  else if (hit("#bolaoPrev")) moveBolaoMonth(-1);
  else if (hit("#bolaoNext")) moveBolaoMonth(1);
  else if (hit("#bolaoCopyPix")) copyPixKey();
  else if (hit("#bolaoPixEdit")) editPixKey();
  else if (hit("#bolaoClose")) closeBolaoMonth();
});

document.getElementById("bolao").addEventListener("change", (e) => {
  const sel = e.target.closest("[data-emoji]");
  if (sel) setPersonEmoji(sel.dataset.emoji, sel.value);
});

document.getElementById("bolao").addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.id === "bolaoPersonForm") addPerson();
  else if (e.target.id === "bolaoPayForm") submitPayment();
  else if (e.target.id === "bolaoExpForm") submitExpense();
});
