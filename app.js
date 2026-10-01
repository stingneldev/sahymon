/* =========================================================
   Esquilook — registro da camisa do dia
   Tudo é salvo no localStorage do navegador.
   ========================================================= */

// As chaves mantêm o nome antigo (Camisômetro) para não perder dados já salvos
const KEY_SESSION = "camisometro:session";
const KEY_LOCK = "camisometro:login-lock";
const dataKey = (user) => `camisometro:data:${user}`;

// Login único. A senha não fica no código: guardamos só o PBKDF2-SHA256 dela,
// com sal aleatório e muitas iterações para encarecer tentativas de adivinhação.
const AUTH_USER = "sahymon";
const AUTH_SALT = "b5a8eb885c77ed2920ea48db01e87b12";
const AUTH_ITERATIONS = 600000;
const AUTH_HASH = "4122321467d4aa963d81a624c4becf6e3d68e0bf8b0e274b44bbc969a1fda772";

const SESSION_DAYS = 30;
const MAX_ATTEMPTS = 5;      // tentativas erradas antes de bloquear
const LOCK_SECONDS = 30;     // bloqueio cresce a cada nova rodada de erros

const DATA_VERSION = 4;

// Camisas do armário: o esquilo vestindo cada uma
const DEFAULT_SHIRTS = [
  { id: "brasil-azul", name: "Brasil azul", color: "#1e3a8a", img: "camisas/esquilo_brasil.webp" },
  { id: "chelsea", name: "Chelsea", color: "#1d4ed8", img: "camisas/esquilo_chelsea.webp" },
  { id: "cassino", name: "Grand Hotel Cassino", color: "#4a2511", img: "camisas/esquilo_cassino.webp" },
  { id: "ifes", name: "IFES preta", color: "#111111", img: "camisas/esquilo_ifes.webp" },
];

// Falta: registrada no lugar da camisa, mas não entra no ranking
const ABSENT = "__faltou__";
const ABSENT_IMG = "camisas/faltou.webp";

// O calendário vai de outubro de 2026 a dezembro de 2027
const CAL_START = "2026-10-01";
const CAL_END = "2027-12-31";

// Camisas de exemplo da primeira versão, removidas na migração se nunca foram usadas
const OLD_DEFAULT_NAMES = ["Preta básica", "Branca lisa", "Azul marinho", "Vermelha", "Cinza mescla", "Verde musgo"];

// Formatos aceitos ao carregar dados do localStorage (que pode ser editado à mão)
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
const ID_RE = /^[a-z0-9_-]{1,40}$/i;
const COLOR_RE = /^#[0-9a-f]{6}$/i;
const IMG_RE = /^(camisas\/[a-z0-9_-]+\.webp|data:image\/(jpeg|png|webp);base64,[a-z0-9+/=]+)$/i;
const MAX_SHIRTS = 50;
const MAX_NAME = 32;
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const MAX_UPLOAD_PIXELS = 40_000_000;

const $ = (sel) => document.querySelector(sel);

let currentUser = null;
let state = null;
let selectedDay = null; // "YYYY-MM-DD" marcado no calendário
let viewMonth = null;   // "YYYY-MM" exibido no calendário

/* ---------------- Utils ---------------- */

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

function todayKey() {
  return toKey(new Date());
}
function toKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function fromKey(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}
// Sábado e domingo: sem aula, sem registro (luto no calendário)
const isWeekend = (key) => [0, 6].includes(fromKey(key).getDay());

function formatDate(key, opts = { weekday: "long", day: "2-digit", month: "long" }) {
  return fromKey(key).toLocaleDateString("pt-BR", opts);
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function readJSON(key, fallback) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
}
function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    toast("Sem espaço para salvar — tente uma foto menor.");
    return false;
  }
}

let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

const hexToBytes = (hex) => new Uint8Array(hex.match(/../g).map((h) => parseInt(h, 16)));

async function hashPassword(password) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: hexToBytes(AUTH_SALT), iterations: AUTH_ITERATIONS },
    key,
    256,
  );
  return [...new Uint8Array(bits)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/* ---------------- Visual da camisa ---------------- */

function isLight(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 > 200;
}

function shirtSVG(color) {
  if (!COLOR_RE.test(color)) color = "#64748b";
  const stroke = isLight(color) ? "#cbd5e1" : "rgba(0,0,0,.18)";
  return `
    <svg class="shirt-art" viewBox="0 0 100 100" aria-hidden="true">
      <path d="M34 10 L42 7 Q50 16 58 7 L66 10 L90 24 L81 42 L71 37 L71 92 L29 92 L29 37 L19 42 L10 24 Z"
            fill="${color}" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M42 7 Q50 16 58 7" fill="none" stroke="${stroke}" stroke-width="2"/>
    </svg>`;
}

function shirtMedia(shirt) {
  return shirt.img ? `<img src="${escapeHtml(shirt.img)}" alt="${escapeHtml(shirt.name)}" />` : shirtSVG(shirt.color);
}

/* ---------------- Auth ---------------- */

function getLock() {
  const lock = readJSON(KEY_LOCK, {});
  return { fails: Number(lock.fails) || 0, until: Number(lock.until) || 0 };
}

async function handleAuth(e) {
  e.preventDefault();
  const err = $("#authError");
  const btn = $("#authSubmit");

  if (!window.crypto?.subtle) {
    err.textContent = "Abra a página por https:// ou localhost para entrar.";
    return;
  }

  const lock = getLock();
  const wait = Math.ceil((lock.until - Date.now()) / 1000);
  if (wait > 0) {
    err.textContent = `Muitas tentativas. Aguarde ${wait}s.`;
    return;
  }

  const user = $("#authUser").value.trim().toLowerCase();
  const pass = $("#authPass").value;

  btn.disabled = true;
  btn.textContent = "Verificando…";
  const ok = user === AUTH_USER && (await hashPassword(pass)) === AUTH_HASH;
  btn.disabled = false;
  btn.textContent = "Entrar";

  if (!ok) {
    lock.fails++;
    if (lock.fails % MAX_ATTEMPTS === 0) lock.until = Date.now() + LOCK_SECONDS * 1000 * (lock.fails / MAX_ATTEMPTS);
    writeJSON(KEY_LOCK, lock);
    err.textContent = lock.until > Date.now()
      ? `Muitas tentativas. Aguarde ${Math.ceil((lock.until - Date.now()) / 1000)}s.`
      : "Usuário ou senha inválidos.";
    return;
  }

  err.textContent = "";
  localStorage.removeItem(KEY_LOCK);
  writeJSON(KEY_SESSION, { user, exp: Date.now() + SESSION_DAYS * 86400000 });
  $("#authForm").reset();
  enterApp(user);
}

// Sessão salva = usuário + validade. Formatos antigos ou vencidos pedem login de novo.
function validSession() {
  const sess = readJSON(KEY_SESSION, null);
  return sess && sess.user === AUTH_USER && Number(sess.exp) > Date.now() ? sess.user : null;
}

function logout() {
  localStorage.removeItem(KEY_SESSION);
  currentUser = null;
  state = null;
  $("#app").classList.add("hidden");
  $("#auth").classList.remove("hidden");
}

/* ---------------- Estado ---------------- */

function loadState(user) {
  const saved = sanitizeState(readJSON(dataKey(user), null));
  if (saved) return migrate(saved);
  return {
    version: DATA_VERSION,
    friend: "Sahymon",
    shirts: DEFAULT_SHIRTS.map((s) => ({ ...s, createdAt: Date.now() })),
    log: {}, // { "YYYY-MM-DD": shirtId }
  };
}

// Descarta tudo que não tiver o formato esperado (dados corrompidos ou editados à mão)
function sanitizeState(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const ids = new Set();
  const shirts = (Array.isArray(data.shirts) ? data.shirts : [])
    .filter((x) => x && typeof x === "object")
    .map((x) => ({
      id: String(x.id ?? ""),
      name: String(x.name ?? "").trim().slice(0, MAX_NAME),
      color: COLOR_RE.test(x.color) ? x.color : "#64748b",
      img: typeof x.img === "string" && IMG_RE.test(x.img) ? x.img : null,
      createdAt: Number(x.createdAt) || Date.now(),
    }))
    .filter((x) => ID_RE.test(x.id) && x.id !== ABSENT && x.name && !ids.has(x.id) && ids.add(x.id))
    .slice(0, MAX_SHIRTS);

  const log = {};
  const rawLog = data.log && typeof data.log === "object" ? data.log : {};
  for (const [day, id] of Object.entries(rawLog)) {
    if (DAY_RE.test(day) && !isWeekend(day) && (id === ABSENT || ids.has(id))) log[day] = id;
  }

  const friend = typeof data.friend === "string" && data.friend.trim() ? data.friend.trim().slice(0, 24) : "Sahymon";
  const version = Number.isInteger(data.version) ? data.version : 1;
  return { version, friend, shirts, log };
}

function migrate(data) {
  if ((data.version ?? 1) < 2) {
    const used = new Set(Object.values(data.log));
    data.shirts = data.shirts.filter((s) => !OLD_DEFAULT_NAMES.includes(s.name) || used.has(s.id));
    const missing = DEFAULT_SHIRTS.filter((d) => !data.shirts.some((s) => s.id === d.id));
    data.shirts.unshift(...missing.map((s) => ({ ...s, createdAt: Date.now() })));
    data.version = 2;
  }
  if (data.version < DATA_VERSION) {
    const missing = DEFAULT_SHIRTS.filter((d) => !data.shirts.some((s) => s.id === d.id));
    data.shirts.push(...missing.map((s) => ({ ...s, createdAt: Date.now() })));
    data.version = DATA_VERSION;
  }
  return data;
}

function save() {
  return writeJSON(dataKey(currentUser), state);
}

function enterApp(user) {
  currentUser = user;
  state = loadState(user);
  save();
  $("#auth").classList.add("hidden");
  $("#app").classList.remove("hidden");
  $("#userChip").innerHTML = `Olá, <b>${escapeHtml(user)}</b>`;
  selectDay(defaultDay());
}

/* ---------------- Cálculos ---------------- */

function getCounts() {
  const counts = Object.fromEntries(state.shirts.map((s) => [s.id, 0]));
  Object.values(state.log).forEach((id) => { if (Object.hasOwn(counts, id)) counts[id]++; });
  return counts;
}

function sortedLog() {
  return Object.entries(state.log)
    .filter(([, id]) => state.shirts.some((s) => s.id === id))
    .sort((a, b) => b[0].localeCompare(a[0]));
}

const countAbsences = () => Object.values(state.log).filter((id) => id === ABSENT).length;

// Todos os registros (camisas e faltas), do mais recente ao mais antigo
function allEntries() {
  return Object.entries(state.log)
    .filter(([, id]) => id === ABSENT || state.shirts.some((s) => s.id === id))
    .sort((a, b) => b[0].localeCompare(a[0]));
}

// Streak: registros seguidos com a mesma camisa. Faltas e dias sem registro não quebram
// a sequência; só uma camisa diferente quebra.
function computeStreaks() {
  const chrono = sortedLog().reverse(); // do mais antigo ao mais recente
  const byDay = {};
  const bestByShirt = {};
  let best = { id: null, count: 0 };
  let run = 0, prev = null;
  for (const [day, id] of chrono) {
    run = id === prev ? run + 1 : 1;
    prev = id;
    byDay[day] = run;
    bestByShirt[id] = Math.max(bestByShirt[id] ?? 0, run);
    if (run > best.count) best = { id, count: run };
  }
  const last = chrono.at(-1);
  const current = last ? { id: last[1], count: run, day: last[0] } : { id: null, count: 0, day: null };
  return { byDay, bestByShirt, best, current };
}

// 0 = sem fogo, 1 = 2 seguidas, 2 = 3–4 seguidas, 3 = 5 ou mais
const fireLevel = (n) => (n >= 5 ? 3 : n >= 3 ? 2 : n >= 2 ? 1 : 0);
const flame = (n) => `<span class="flame flame-${fireLevel(n)}" aria-hidden="true">🔥</span>`;

const shirtById = (id) => state.shirts.find((s) => s.id === id);

/* ---------------- Render ---------------- */

function render() {
  renderHero();
  renderStats();
  renderCalendar();
  renderGrid();
  renderRanking();
  renderHistory();
}

function renderHero() {
  $("#friendName").textContent = state.friend;
  $("#todayLabel").textContent = formatDate(todayKey(), { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
  const shirt = shirtById(state.log[todayKey()]);
  if (isWeekend(todayKey())) {
    $("#todayStatus").innerHTML = `Fim de semana: dia de <b>luto</b> 🖤 Sem aula, sem camisa.`;
    $("#heroToday").innerHTML = `<img class="hero-logo hero-luto" src="assets/logo.webp" alt="" />`;
  } else if (state.log[todayKey()] === ABSENT) {
    $("#todayStatus").innerHTML = `Hoje ele <b>faltou à aula</b> 💔 Aguardando o próximo dia.`;
    $("#heroToday").innerHTML = `<img src="${ABSENT_IMG}" alt="Faltou à aula" />`;
  } else if (shirt) {
    $("#todayStatus").innerHTML = `Hoje foi de <b>${escapeHtml(shirt.name)}</b>. Aguardando o próximo dia.`;
    $("#heroToday").innerHTML = shirtMedia(shirt);
  } else {
    $("#todayStatus").textContent = "Ainda não marcado hoje. Escolha a camisa no armário.";
    $("#heroToday").innerHTML = `<img class="hero-logo" src="assets/logo.webp" alt="" />`;
  }

  const { current } = computeStreaks();
  const streakShirt = shirtById(current.id);
  const hasStreak = current.count >= 2 && streakShirt;
  $("#heroStreak").classList.toggle("hidden", !hasStreak);
  if (hasStreak) {
    $("#heroStreak").innerHTML = `${flame(current.count)} <b>${current.count}</b> seguidas de ${escapeHtml(streakShirt.name)}`;
  }
}

function renderStats() {
  const counts = getCounts();
  const entries = sortedLog();
  $("#statDays").textContent = entries.length;
  $("#statAbsent").textContent = countAbsences();
  const { current, best } = computeStreaks();
  const on = current.count >= 2;
  $("#statStreak").innerHTML = `${flame(on ? current.count : 0)} ${current.count}`;
  $("#streakCard").classList.toggle("on", on);
  $("#streakBest").textContent = best.count >= 2 ? `· recorde ${best.count}` : "";
  $("#streakCard").title = on
    ? `${current.count} registros seguidos com ${shirtById(current.id).name}`
    : "Acende quando ele repete a mesma camisa";
  const top = state.shirts.slice().sort((a, b) => counts[b.id] - counts[a.id])[0];
  $("#statFav").textContent = top && counts[top.id] > 0 ? top.name : "—";
  $("#statFav").title = $("#statFav").textContent;
}

function renderGrid() {
  const counts = getCounts();
  const selectedId = state.log[selectedDay];
  const absences = countAbsences();
  $("#markingDay").textContent = formatDate(selectedDay, { weekday: "long", day: "2-digit", month: "long" });
  const weekend = isWeekend(selectedDay);
  const locked = weekend || Boolean(selectedId);
  $("#shirtGrid").classList.toggle("is-locked", locked);
  renderDayNotice(selectedId, weekend);
  const { current } = computeStreaks();
  const cards = state.shirts.map((s) => {
    const fire = current.id === s.id && current.count >= 2
      ? ` · <span class="card-fire">${flame(current.count)}${current.count} seguidas</span>` : "";
    return `
    <button class="card ${s.id === selectedId ? "selected" : ""}" data-id="${escapeHtml(s.id)}" type="button" aria-disabled="${locked}">
      <div class="card-media">${shirtMedia(s)}</div>
      <div class="card-name" title="${escapeHtml(s.name)}">${escapeHtml(s.name)}</div>
      <div class="card-meta">${counts[s.id]} ${counts[s.id] === 1 ? "dia" : "dias"}${fire}</div>
      <span class="card-del" data-del="${escapeHtml(s.id)}" role="button" aria-label="Remover camisa" title="Remover">✕</span>
    </button>`;
  }).join("");

  const absentCard = `
    <button class="card card-absent ${selectedId === ABSENT ? "selected" : ""}" data-id="${ABSENT}" type="button" aria-disabled="${locked}">
      <div class="card-media"><img src="${ABSENT_IMG}" alt="Faltou à aula" /></div>
      <div class="card-name">Faltou à aula</div>
      <div class="card-meta">${absences} ${absences === 1 ? "falta" : "faltas"}</div>
    </button>`;

  $("#shirtGrid").innerHTML = cards + absentCard + `
    <button class="card card-add" id="addCard" type="button">
      <span class="plus">+</span>
      <span>Nova camisa</span>
    </button>`;
}

// Faixa acima do armário: dia de luto, dia já registrado ou instrução
function renderDayNotice(selectedId, weekend) {
  const el = $("#dayNotice");
  el.className = "day-notice";
  if (weekend) {
    el.classList.add("notice-luto");
    el.innerHTML = `<span class="notice-icon">🖤</span>
      <div><strong>Fim de semana — luto.</strong><span>Não há registro aos sábados e domingos.</span></div>`;
    return;
  }
  if (selectedId) {
    const absent = selectedId === ABSENT;
    const shirt = shirtById(selectedId);
    el.classList.add("notice-done");
    el.innerHTML = `
      <div class="notice-thumb ${absent ? "is-absent" : ""}">${absent ? `<img src="${ABSENT_IMG}" alt="" />` : shirtMedia(shirt)}</div>
      <div><strong>Aguardando o próximo dia.</strong>
        <span>Registrado: ${absent ? "faltou à aula" : escapeHtml(shirt.name)}</span></div>
      <button class="btn btn-ghost btn-sm" id="fixDay" type="button">Corrigir registro</button>`;
    return;
  }
  el.classList.add("notice-open");
  el.innerHTML = `<span class="notice-icon">👆</span>
    <div><strong>Escolha a camisa do dia.</strong><span>Você vai confirmar antes de registrar.</span></div>`;
}

// Laço de luto (desenhado em SVG para aparecer bem sobre o fundo escuro)
const LUTO_RIBBON = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.5c-2.3 0-4.1 1.8-4.1 4.1 0 1.7.8 3.3 2 4.9L4.8 20.5h3.4l3.8-6.2 3.8 6.2h3.4l-5.1-9c1.2-1.6 2-3.2 2-4.9 0-2.3-1.8-4.1-4.1-4.1zm0 2.1c1.1 0 2 .9 2 2 0 1-.6 2.3-2 4-1.4-1.7-2-3-2-4 0-1.1.9-2 2-2z"/></svg>`;

const RANK_COLORS = ["#4f46e5", "#a855f7", "#ec4899", "#f59e0b", "#10b981", "#0ea5e9"];

function renderRanking() {
  const counts = getCounts();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const lastUsed = {};
  for (const [day, id] of sortedLog()) lastUsed[id] ??= day;
  const ranked = state.shirts
    .slice()
    .sort((a, b) => counts[b.id] - counts[a.id] || (lastUsed[b.id] ?? "").localeCompare(lastUsed[a.id] ?? "") || a.name.localeCompare(b.name));
  const used = ranked.filter((s) => counts[s.id] > 0);
  const color = (i) => RANK_COLORS[i % RANK_COLORS.length];
  const pct = (c) => Math.round((c / total) * 100);
  const daysLabel = (c) => `${c} ${c === 1 ? "dia" : "dias"}`;
  const shortDate = (key) => formatDate(key, { day: "2-digit", month: "2-digit" });

  $("#rankSub").textContent = total ? `${daysLabel(total)} com camisa (faltas não contam)` : "Quem vai liderar?";

  if (!used.length) {
    $("#ranking").innerHTML = `
      <div class="rank-empty">
        <span class="rank-empty-icon">🏆</span>
        <p>Nenhum registro ainda.</p>
        <span class="muted">Marque a primeira camisa no armário para abrir o ranking.</span>
      </div>`;
    return;
  }

  const leader = used[0];
  const tie = used[1] && counts[used[1].id] === counts[leader.id];

  const leaderHtml = `
    <div class="leader">
      <div class="leader-media">${shirtMedia(leader)}<span class="leader-crown">👑</span></div>
      <div class="leader-info">
        <span class="leader-tag">${tie ? "Empate no topo" : "Mais usada"}</span>
        <strong class="leader-name">${escapeHtml(leader.name)}</strong>
        <div class="leader-stats">
          <span><b>${counts[leader.id]}</b> ${counts[leader.id] === 1 ? "dia" : "dias"}</span>
          <span><b>${pct(counts[leader.id])}%</b> do total</span>
        </div>
        <span class="muted leader-last">Última vez em ${shortDate(lastUsed[leader.id])}</span>
      </div>
    </div>`;

  const shareHtml = `
    <div class="share" role="img" aria-label="Divisão dos registros por camisa">
      ${used.map((s, i) => `<span style="width:${(counts[s.id] / total) * 100}%;background:${color(i)}" title="${escapeHtml(s.name)}: ${pct(counts[s.id])}%"></span>`).join("")}
    </div>`;

  const max = counts[leader.id];
  const { bestByShirt } = computeStreaks();
  const listHtml = ranked.map((s, i) => {
    const c = counts[s.id];
    const zero = c === 0;
    return `
      <li class="rk-row ${zero ? "rk-zero" : ""} ${i === 0 ? "rk-first" : ""}">
        <span class="rk-pos">${zero ? "–" : `${i + 1}º`}</span>
        <div class="rank-thumb">${shirtMedia(s)}</div>
        <div class="rk-info">
          <div class="rk-top">
            <span class="rk-name"><i class="dot" style="background:${zero ? "var(--border)" : color(i)}"></i>${escapeHtml(s.name)}</span>
            <span class="rk-count">${zero ? "sem uso" : `${daysLabel(c)} · ${pct(c)}%`}</span>
          </div>
          <div class="bar"><div style="width:${(c / max) * 100}%;background:${color(i)}"></div></div>
          ${zero ? "" : `<span class="rk-last">última vez em ${shortDate(lastUsed[s.id])}${(bestByShirt[s.id] ?? 0) >= 2 ? ` · recorde 🔥 ${bestByShirt[s.id]}` : ""}</span>`}
        </div>
      </li>`;
  }).join("");

  $("#ranking").innerHTML = leaderHtml + shareHtml + `<ol class="rk-list">${listHtml}</ol>`;
}

function renderHistory() {
  const entries = allEntries();
  $("#historyCount").textContent = entries.length ? `${entries.length} registro${entries.length > 1 ? "s" : ""}` : "";
  if (!entries.length) {
    $("#history").innerHTML = `<li class="empty">O histórico aparece aqui conforme você marca os dias.</li>`;
    return;
  }
  $("#history").innerHTML = entries.slice(0, 30).map(([day, id]) => {
    const absent = id === ABSENT;
    const s = shirtById(id);
    return `
      <li class="${absent ? "h-absent" : ""}">
        <div class="rank-thumb">${absent ? `<img src="${ABSENT_IMG}" alt="" />` : shirtMedia(s)}</div>
        <div class="h-info">
          <div class="h-date">${formatDate(day, { weekday: "short", day: "2-digit", month: "short" })}</div>
          <div class="h-name">${absent ? "Faltou à aula" : escapeHtml(s.name)}</div>
        </div>
        <button class="icon-btn" data-unmark="${day}" type="button" title="Remover registro" aria-label="Remover registro">✕</button>
      </li>`;
  }).join("");
}

/* ---------------- Calendário ---------------- */

const monthKey = (key) => key.slice(0, 7);
function shiftMonth(ym, delta) {
  const [y, m] = ym.split("-").map(Number);
  return toKey(new Date(y, m - 1 + delta, 1)).slice(0, 7);
}
const monthLabel = (ym) => {
  const [y, m] = ym.split("-").map(Number);
  const t = new Date(y, m - 1, 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  return t.charAt(0).toUpperCase() + t.slice(1);
};

// Dia aberto ao entrar ou ao clicar em "Hoje": hoje, limitado ao período do calendário
function defaultDay() {
  const t = todayKey();
  return t < CAL_START ? CAL_START : t > CAL_END ? CAL_END : t;
}

function fillMonthSelect() {
  const options = [];
  for (let ym = monthKey(CAL_START); ym <= monthKey(CAL_END); ym = shiftMonth(ym, 1)) {
    options.push(`<option value="${ym}">${monthLabel(ym)}</option>`);
  }
  $("#calTitle").innerHTML = options.join("");
}

function selectDay(day) {
  if (!DAY_RE.test(day) || day < CAL_START || day > CAL_END) day = defaultDay();
  selectedDay = day;
  viewMonth = monthKey(day);
  render();
}

function renderCalendar() {
  const [y, m] = viewMonth.split("-").map(Number);
  const first = new Date(y, m - 1, 1);
  const daysInMonth = new Date(y, m, 0).getDate();
  const today = todayKey();

  if (!$("#calTitle").options.length) fillMonthSelect();
  $("#calTitle").value = viewMonth;
  $("#calPrev").disabled = viewMonth <= monthKey(CAL_START);
  $("#calNext").disabled = viewMonth >= monthKey(CAL_END);

  let html = "";
  for (let i = 0; i < first.getDay(); i++) html += `<span class="cal-cell cal-pad"></span>`;

  const { byDay } = computeStreaks();
  let present = 0, absent = 0, pending = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${viewMonth}-${String(d).padStart(2, "0")}`;
    const id = state.log[key];
    const shirt = shirtById(id);
    const future = key > today;
    const weekend = isWeekend(key);
    if (id === ABSENT) absent++;
    else if (shirt) present++;
    else if (!future && !weekend) pending++;

    const cls = ["cal-cell", "cal-day"];
    if (future) cls.push("cal-future");
    if (weekend) cls.push("cal-luto");
    if (key === today) cls.push("cal-today");
    if (key === selectedDay) cls.push("cal-selected");
    if (id === ABSENT) cls.push("cal-absent");
    else if (shirt) cls.push("cal-filled");

    const media = id === ABSENT
      ? `<img src="${ABSENT_IMG}" alt="" />`
      : shirt ? (shirt.img ? `<img src="${escapeHtml(shirt.img)}" alt="" />` : shirtSVG(shirt.color)) : "";
    const run = shirt ? byDay[key] ?? 0 : 0;
    const label = formatDate(key, { weekday: "long", day: "2-digit", month: "long" }) +
      (weekend ? " — luto (fim de semana)" : "") +
      (id === ABSENT ? " — faltou" : shirt ? ` — ${shirt.name}` : "") +
      (run >= 2 ? ` — 🔥 ${run} seguidas` : "");

    html += `
      <button class="${cls.join(" ")}" data-day="${key}" type="button" ${future || weekend ? "disabled" : ""}
              title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}">
        <span class="cal-num">${d}</span>
        ${weekend ? `<span class="cal-luto-icon" aria-hidden="true">${LUTO_RIBBON}</span>` : ""}
        ${media ? `<span class="cal-media">${media}</span>` : ""}
        ${run >= 2 ? `<span class="cal-fire fire-${fireLevel(run)}">🔥${run}</span>` : ""}
      </button>`;
  }
  $("#calGrid").innerHTML = html;

  $("#calSummary").innerHTML = `
    <span><i class="dot" style="background:var(--primary)"></i>${present} com camisa</span>
    <span><i class="dot" style="background:var(--danger)"></i>${absent} ${absent === 1 ? "falta" : "faltas"}</span>
    <span><i class="dot" style="background:var(--border)"></i>${pending} sem registro (dias úteis)</span>
    <span>🖤 fins de semana: luto</span>`;
}

/* ---------------- Ações ---------------- */

// Só dá para marcar dias úteis do calendário que já chegaram
const isMarkable = (day) =>
  DAY_RE.test(day) && day >= CAL_START && day <= CAL_END && day <= todayKey() && !isWeekend(day);

/* ---------------- Confirmação ---------------- */

let confirmResolve = null;

function askConfirm({ title, html, media = "", ok = "Confirmar", danger = false }) {
  $("#confirmTitle").textContent = title;
  $("#confirmText").innerHTML = html;
  $("#confirmMedia").innerHTML = media;
  $("#confirmMedia").classList.toggle("hidden", !media);
  $("#confirmOk").textContent = ok;
  $("#confirmOk").className = `btn ${danger ? "btn-danger" : "btn-primary"}`;
  $("#confirmModal").classList.remove("hidden");
  setTimeout(() => $("#confirmOk").focus(), 50);
  return new Promise((resolve) => { confirmResolve = resolve; });
}

function closeConfirm(result) {
  if (!confirmResolve) return;
  $("#confirmModal").classList.add("hidden");
  confirmResolve(result);
  confirmResolve = null;
}

async function markShirt(id) {
  const day = selectedDay;
  if (!isMarkable(day) || state.log[day] || (id !== ABSENT && !shirtById(id))) return;
  const absent = id === ABSENT;
  const shirt = shirtById(id);
  const longDay = formatDate(day, { weekday: "long", day: "2-digit", month: "long" });

  const ok = await askConfirm({
    title: absent ? "Registrar falta?" : "Registrar camisa do dia?",
    html: absent
      ? `Confirma que ele <b>faltou à aula</b> em <b>${longDay}</b>?`
      : `Confirma <b>${escapeHtml(shirt.name)}</b> em <b>${longDay}</b>?`,
    media: absent ? `<img src="${ABSENT_IMG}" alt="" />` : shirtMedia(shirt),
    ok: absent ? "Registrar falta" : "Registrar",
    danger: absent,
  });
  // Confere de novo: o dia pode ter mudado enquanto a janela estava aberta
  if (!ok || day !== selectedDay || state.log[day] || !isMarkable(day)) return;

  state.log[day] = id;
  if (!save()) { delete state.log[day]; return; }
  render();
  const run = absent ? 0 : computeStreaks().byDay[day] ?? 0;
  toast(run >= 2 ? `🔥 ${run} seguidas! Aguardando o próximo dia.` : "Registrado! Aguardando o próximo dia.");
}

async function unmarkDay(day) {
  if (!Object.hasOwn(state.log, day)) return;
  const id = state.log[day];
  const name = id === ABSENT ? "a falta" : `"${escapeHtml(shirtById(id)?.name ?? "")}"`;
  const ok = await askConfirm({
    title: "Corrigir registro?",
    html: `Isso apaga ${name} de <b>${formatDate(day, { weekday: "long", day: "2-digit", month: "long" })}</b> para você registrar de novo.`,
    ok: "Apagar registro",
    danger: true,
  });
  if (!ok || !Object.hasOwn(state.log, day)) return;
  delete state.log[day];
  save();
  render();
  toast("Registro apagado");
}

function deleteShirt(id) {
  const s = shirtById(id);
  if (!s) return;
  const uses = getCounts()[id];
  const msg = uses
    ? `Remover "${s.name}"? Os ${uses} registro(s) dela também serão apagados.`
    : `Remover "${s.name}"?`;
  if (!confirm(msg)) return;
  state.shirts = state.shirts.filter((x) => x.id !== id);
  for (const [day, sid] of Object.entries(state.log)) if (sid === id) delete state.log[day];
  save();
  render();
  toast("Camisa removida");
}

function renameFriend() {
  const name = prompt("Nome do amigo:", state.friend);
  if (name && name.trim()) {
    state.friend = name.trim().slice(0, 24);
    save();
    renderHero();
  }
}

/* ---------------- Modal: nova camisa ---------------- */

let pendingImg = null;

function openModal() {
  pendingImg = null;
  $("#shirtForm").reset();
  updatePreview();
  $("#modal").classList.remove("hidden");
  setTimeout(() => $("#shirtName").focus(), 50);
}
function closeModal() {
  $("#modal").classList.add("hidden");
}
function updatePreview() {
  $("#shirtPreview").innerHTML = pendingImg ? `<img src="${pendingImg}" alt="" />` : shirtSVG($("#shirtColor").value);
}

// Redimensiona a foto para caber no localStorage
function resizeImage(file, max = 360) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        if (img.width * img.height > MAX_UPLOAD_PIXELS) { reject(new Error("imagem grande demais")); return; }
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function handlePhoto(e) {
  const file = e.target.files[0];
  if (!file) { pendingImg = null; updatePreview(); return; }
  if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type) || file.size > MAX_UPLOAD_BYTES) {
    e.target.value = "";
    pendingImg = null;
    updatePreview();
    toast("Use uma foto JPG, PNG, WEBP ou GIF de até 10 MB");
    return;
  }
  try {
    pendingImg = await resizeImage(file);
  } catch {
    pendingImg = null;
    toast("Não foi possível ler essa imagem");
  }
  updatePreview();
}

function handleAddShirt(e) {
  e.preventDefault();
  const name = $("#shirtName").value.trim().slice(0, MAX_NAME);
  if (!name) return;
  if (state.shirts.length >= MAX_SHIRTS) { toast(`O armário aceita até ${MAX_SHIRTS} camisas`); return; }
  const color = COLOR_RE.test($("#shirtColor").value) ? $("#shirtColor").value : "#64748b";
  const shirt = { id: uid(), name, color, img: pendingImg, createdAt: Date.now() };
  state.shirts.push(shirt);
  if (!save()) { state.shirts.pop(); return; }
  closeModal();
  render();
  toast(`"${name}" adicionada ao armário`);
}

/* ---------------- Eventos ---------------- */

$("#authForm").addEventListener("submit", handleAuth);
$("#logoutBtn").addEventListener("click", logout);
$("#friendName").addEventListener("click", renameFriend);
$("#calPrev").addEventListener("click", () => { viewMonth = shiftMonth(viewMonth, -1); renderCalendar(); });
$("#calNext").addEventListener("click", () => { viewMonth = shiftMonth(viewMonth, 1); renderCalendar(); });
$("#calTitle").addEventListener("change", (e) => { viewMonth = e.target.value; renderCalendar(); });
$("#calToday").addEventListener("click", () => selectDay(defaultDay()));
$("#calGrid").addEventListener("click", (e) => {
  const cell = e.target.closest("[data-day]");
  if (!cell || cell.disabled) return;
  selectDay(cell.dataset.day);
  // No celular o armário fica abaixo do calendário: rola até ele
  if (matchMedia("(max-width: 900px)").matches) {
    $("#shirtGrid").closest(".panel").scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
$("#dayNotice").addEventListener("click", (e) => {
  if (e.target.closest("#fixDay")) unmarkDay(selectedDay);
});
$("#confirmModal").addEventListener("click", (e) => {
  if (e.target === e.currentTarget || e.target.closest('[data-confirm="no"]')) closeConfirm(false);
  else if (e.target.closest('[data-confirm="yes"]')) closeConfirm(true);
});

$("#shirtGrid").addEventListener("click", (e) => {
  const del = e.target.closest("[data-del]");
  if (del) { e.stopPropagation(); deleteShirt(del.dataset.del); return; }
  if (e.target.closest("#addCard")) { openModal(); return; }
  const card = e.target.closest(".card[data-id]");
  if (!card) return;
  if (card.getAttribute("aria-disabled") === "true") {
    toast(isWeekend(selectedDay) ? "Fim de semana é luto 🖤 Sem registro." : "Dia já registrado. Aguardando o próximo dia.");
    return;
  }
  markShirt(card.dataset.id);
});

$("#history").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-unmark]");
  if (btn) unmarkDay(btn.dataset.unmark);
});

$("#shirtColor").addEventListener("input", () => { if (!pendingImg) updatePreview(); });
$("#shirtPhoto").addEventListener("change", handlePhoto);
$("#shirtForm").addEventListener("submit", handleAddShirt);
$("#modal").addEventListener("click", (e) => {
  if (e.target === e.currentTarget || e.target.closest("[data-close]")) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  closeModal();
  closeConfirm(false);
});

/* ---------------- Init ---------------- */

const sessionUser = validSession();
if (sessionUser) {
  enterApp(sessionUser);
} else {
  localStorage.removeItem(KEY_SESSION);
  $("#auth").classList.remove("hidden");
}
