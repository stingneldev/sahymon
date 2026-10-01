/* =========================================================
   Esquilook — registro da camisa do dia
   Tudo é salvo no localStorage do navegador.
   ========================================================= */

// As chaves mantêm o nome antigo (Camisômetro) para não perder dados já salvos
const KEY_SESSION = "camisometro:session";

// Login único. A senha não fica em texto puro: guardamos só o SHA-256 de "sal:senha".
const AUTH_USER = "sahymon";
const AUTH_SALT = "camisometro";
const AUTH_HASH = "086f1777dc760c51bc70d9baceb4c9ed8beb81ccc7088b885ae8b31ebfda03e1";
const dataKey = (user) => `camisometro:data:${user}`;

const DATA_VERSION = 3;

// Camisas do armário: o esquilo vestindo cada uma
const DEFAULT_SHIRTS = [
  { id: "brasil-azul", name: "Brasil azul", color: "#1e3a8a", img: "camisas/esquilo_brasil.webp" },
  { id: "chelsea", name: "Chelsea", color: "#1d4ed8", img: "camisas/esquilo_chelsea.webp" },
  { id: "cassino", name: "Grand Hotel Cassino", color: "#4a2511", img: "camisas/esquilo_cassino.webp" },
];

// Falta: registrada no lugar da camisa, mas não entra no ranking
const ABSENT = "__faltou__";
const ABSENT_IMG = "camisas/faltou.webp";

// O calendário começa em outubro de 2026
const CAL_START = "2026-10-01";

// Camisas de exemplo da primeira versão, removidas na migração se nunca foram usadas
const OLD_DEFAULT_NAMES = ["Preta básica", "Branca lisa", "Azul marinho", "Vermelha", "Cinza mescla", "Verde musgo"];

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

async function hashPassword(password, salt) {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  if (window.crypto?.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return sha256(bytes); // contextos sem crypto.subtle (ex.: http por IP na rede local)
}

// SHA-256 em JS puro, usado só como fallback
function sha256(bytes) {
  const K = [];
  const H = [];
  const isPrime = (n) => { for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
  const frac = (x) => ((x - Math.floor(x)) * 2 ** 32) >>> 0;
  for (let n = 2, i = 0; i < 64; n++) {
    if (!isPrime(n)) continue;
    if (i < 8) H[i] = frac(n ** (1 / 2));
    K[i++] = frac(n ** (1 / 3));
  }
  const len = bytes.length;
  const padded = new Uint8Array(((len + 9 + 63) >> 6) << 6);
  padded.set(bytes);
  padded[len] = 0x80;
  const view = new DataView(padded.buffer);
  view.setUint32(padded.length - 4, len * 8);
  view.setUint32(padded.length - 8, Math.floor(len / 2 ** 29));
  const rotr = (x, n) => (x >>> n) | (x << (32 - n));
  const W = new Uint32Array(64);
  for (let off = 0; off < padded.length; off += 64) {
    for (let t = 0; t < 16; t++) W[t] = view.getUint32(off + t * 4);
    for (let t = 16; t < 64; t++) {
      const s0 = rotr(W[t - 15], 7) ^ rotr(W[t - 15], 18) ^ (W[t - 15] >>> 3);
      const s1 = rotr(W[t - 2], 17) ^ rotr(W[t - 2], 19) ^ (W[t - 2] >>> 10);
      W[t] = (W[t - 16] + s0 + W[t - 7] + s1) >>> 0;
    }
    let [a, b, c, d, e, f, g, h] = H;
    for (let t = 0; t < 64; t++) {
      const t1 = (h + (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) + ((e & f) ^ (~e & g)) + K[t] + W[t]) >>> 0;
      const t2 = ((rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) >>> 0;
      h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
    }
    [a, b, c, d, e, f, g, h].forEach((v, i) => (H[i] = (H[i] + v) >>> 0));
  }
  return H.map((v) => v.toString(16).padStart(8, "0")).join("");
}

/* ---------------- Visual da camisa ---------------- */

function isLight(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 > 200;
}

function shirtSVG(color) {
  const stroke = isLight(color) ? "#cbd5e1" : "rgba(0,0,0,.18)";
  return `
    <svg class="shirt-art" viewBox="0 0 100 100" aria-hidden="true">
      <path d="M34 10 L42 7 Q50 16 58 7 L66 10 L90 24 L81 42 L71 37 L71 92 L29 92 L29 37 L19 42 L10 24 Z"
            fill="${color}" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M42 7 Q50 16 58 7" fill="none" stroke="${stroke}" stroke-width="2"/>
    </svg>`;
}

function shirtMedia(shirt) {
  return shirt.img ? `<img src="${shirt.img}" alt="${escapeHtml(shirt.name)}" />` : shirtSVG(shirt.color);
}

/* ---------------- Auth ---------------- */

async function handleAuth(e) {
  e.preventDefault();
  const user = $("#authUser").value.trim().toLowerCase();
  const pass = $("#authPass").value;

  if (user !== AUTH_USER || (await hashPassword(pass, AUTH_SALT)) !== AUTH_HASH) {
    $("#authError").textContent = "Usuário ou senha inválidos.";
    return;
  }

  $("#authError").textContent = "";
  localStorage.setItem(KEY_SESSION, user);
  $("#authForm").reset();
  enterApp(user);
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
  const saved = readJSON(dataKey(user), null);
  if (saved) return migrate(saved);
  return {
    version: DATA_VERSION,
    friend: "Sahymon",
    shirts: DEFAULT_SHIRTS.map((s) => ({ ...s, createdAt: Date.now() })),
    log: {}, // { "YYYY-MM-DD": shirtId }
  };
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
  selectDay(todayKey() < CAL_START ? CAL_START : todayKey());
}

/* ---------------- Cálculos ---------------- */

function getCounts() {
  const counts = Object.fromEntries(state.shirts.map((s) => [s.id, 0]));
  Object.values(state.log).forEach((id) => { if (id in counts) counts[id]++; });
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

function getStreak() {
  const entries = sortedLog();
  if (!entries.length) return 0;
  const first = entries[0][1];
  let n = 0;
  for (const [, id] of entries) {
    if (id !== first) break;
    n++;
  }
  return n;
}

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
  if (state.log[todayKey()] === ABSENT) {
    $("#todayStatus").innerHTML = `Hoje ele <b>faltou à aula</b> 💔`;
    $("#heroToday").innerHTML = `<img src="${ABSENT_IMG}" alt="Faltou à aula" />`;
  } else if (shirt) {
    $("#todayStatus").innerHTML = `Hoje foi de <b>${escapeHtml(shirt.name)}</b>. Clique em outra camisa para trocar.`;
    $("#heroToday").innerHTML = shirtMedia(shirt);
  } else {
    $("#todayStatus").textContent = "Ainda não marcado hoje. Escolha a camisa no armário.";
    $("#heroToday").innerHTML = `<img class="hero-logo" src="assets/logo.webp" alt="" />`;
  }
}

function renderStats() {
  const counts = getCounts();
  const entries = sortedLog();
  $("#statDays").textContent = entries.length;
  $("#statAbsent").textContent = countAbsences();
  $("#statStreak").textContent = getStreak();
  const top = state.shirts.slice().sort((a, b) => counts[b.id] - counts[a.id])[0];
  $("#statFav").textContent = top && counts[top.id] > 0 ? top.name : "—";
  $("#statFav").title = $("#statFav").textContent;
}

function renderGrid() {
  const counts = getCounts();
  const selectedId = state.log[selectedDay];
  const absences = countAbsences();
  $("#markingDay").textContent = formatDate(selectedDay, { weekday: "long", day: "2-digit", month: "long" });
  $("#clearDay").classList.toggle("hidden", !selectedId);
  const cards = state.shirts.map((s) => `
    <button class="card ${s.id === selectedId ? "selected" : ""}" data-id="${s.id}" type="button">
      <div class="card-media">${shirtMedia(s)}</div>
      <div class="card-name" title="${escapeHtml(s.name)}">${escapeHtml(s.name)}</div>
      <div class="card-meta">${counts[s.id]} ${counts[s.id] === 1 ? "dia" : "dias"}</div>
      <span class="card-del" data-del="${s.id}" role="button" aria-label="Remover camisa" title="Remover">✕</span>
    </button>`).join("");

  const absentCard = `
    <button class="card card-absent ${selectedId === ABSENT ? "selected" : ""}" data-id="${ABSENT}" type="button">
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
          ${zero ? "" : `<span class="rk-last">última vez em ${shortDate(lastUsed[s.id])}</span>`}
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
const lastMonth = () => monthKey(todayKey() < CAL_START ? CAL_START : todayKey());

function selectDay(day) {
  selectedDay = day;
  viewMonth = monthKey(day);
  render();
}

function renderCalendar() {
  const [y, m] = viewMonth.split("-").map(Number);
  const first = new Date(y, m - 1, 1);
  const daysInMonth = new Date(y, m, 0).getDate();
  const today = todayKey();

  const title = first.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  $("#calTitle").textContent = title.charAt(0).toUpperCase() + title.slice(1);
  $("#calPrev").disabled = viewMonth <= monthKey(CAL_START);
  $("#calNext").disabled = viewMonth >= lastMonth();

  let html = "";
  for (let i = 0; i < first.getDay(); i++) html += `<span class="cal-cell cal-pad"></span>`;

  let present = 0, absent = 0, pending = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${viewMonth}-${String(d).padStart(2, "0")}`;
    const id = state.log[key];
    const shirt = shirtById(id);
    const future = key > today;
    const weekend = [0, 6].includes(fromKey(key).getDay());
    if (id === ABSENT) absent++;
    else if (shirt) present++;
    else if (!future && !weekend) pending++;

    const cls = ["cal-cell", "cal-day"];
    if (future) cls.push("cal-future");
    if (weekend) cls.push("cal-weekend");
    if (key === today) cls.push("cal-today");
    if (key === selectedDay) cls.push("cal-selected");
    if (id === ABSENT) cls.push("cal-absent");
    else if (shirt) cls.push("cal-filled");

    const media = id === ABSENT
      ? `<img src="${ABSENT_IMG}" alt="" />`
      : shirt ? (shirt.img ? `<img src="${shirt.img}" alt="" />` : shirtSVG(shirt.color)) : "";
    const label = formatDate(key, { weekday: "long", day: "2-digit", month: "long" }) +
      (id === ABSENT ? " — faltou" : shirt ? ` — ${shirt.name}` : "");

    html += `
      <button class="${cls.join(" ")}" data-day="${key}" type="button" ${future ? "disabled" : ""}
              title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}">
        <span class="cal-num">${d}</span>
        ${media ? `<span class="cal-media">${media}</span>` : ""}
      </button>`;
  }
  $("#calGrid").innerHTML = html;

  $("#calSummary").innerHTML = `
    <span><i class="dot" style="background:var(--primary)"></i>${present} com camisa</span>
    <span><i class="dot" style="background:var(--danger)"></i>${absent} ${absent === 1 ? "falta" : "faltas"}</span>
    <span><i class="dot" style="background:var(--border)"></i>${pending} sem registro (dias úteis)</span>`;
}

/* ---------------- Ações ---------------- */

function markShirt(id) {
  const day = selectedDay;
  const when = formatDate(day, { day: "2-digit", month: "short" });
  if (state.log[day] === id) {
    delete state.log[day];
    toast(`Registro de ${when} removido`);
  } else {
    state.log[day] = id;
    toast(id === ABSENT ? `💔 Falta registrada em ${when}` : `✔ ${shirtById(id).name} marcada em ${when}`);
  }
  save();
  render();
}

function deleteShirt(id) {
  const s = shirtById(id);
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
  const name = $("#shirtName").value.trim();
  if (!name) return;
  const shirt = { id: uid(), name, color: $("#shirtColor").value, img: pendingImg, createdAt: Date.now() };
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
$("#calToday").addEventListener("click", () => selectDay(todayKey() < CAL_START ? CAL_START : todayKey()));
$("#calGrid").addEventListener("click", (e) => {
  const cell = e.target.closest("[data-day]");
  if (!cell || cell.disabled) return;
  selectDay(cell.dataset.day);
  // No celular o armário fica abaixo do calendário: rola até ele
  if (matchMedia("(max-width: 900px)").matches) {
    $("#shirtGrid").closest(".panel").scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
$("#clearDay").addEventListener("click", () => {
  delete state.log[selectedDay];
  save();
  render();
  toast("Registro do dia removido");
});

$("#shirtGrid").addEventListener("click", (e) => {
  const del = e.target.closest("[data-del]");
  if (del) { e.stopPropagation(); deleteShirt(del.dataset.del); return; }
  if (e.target.closest("#addCard")) { openModal(); return; }
  const card = e.target.closest(".card[data-id]");
  if (card) markShirt(card.dataset.id);
});

$("#history").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-unmark]");
  if (!btn) return;
  delete state.log[btn.dataset.unmark];
  save();
  render();
  toast("Registro removido");
});

$("#shirtColor").addEventListener("input", () => { if (!pendingImg) updatePreview(); });
$("#shirtPhoto").addEventListener("change", handlePhoto);
$("#shirtForm").addEventListener("submit", handleAddShirt);
$("#modal").addEventListener("click", (e) => {
  if (e.target === e.currentTarget || e.target.closest("[data-close]")) closeModal();
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

/* ---------------- Init ---------------- */

const sessionUser = localStorage.getItem(KEY_SESSION);
if (sessionUser === AUTH_USER) {
  enterApp(sessionUser);
} else {
  $("#auth").classList.remove("hidden");
}
