/* =========================================================
   Camisômetro — registro da camisa do dia
   Tudo é salvo no localStorage do navegador.
   ========================================================= */

const KEY_SESSION = "camisometro:session";

// Login único. A senha não fica em texto puro: guardamos só o SHA-256 de "sal:senha".
const AUTH_USER = "sahymon";
const AUTH_SALT = "camisometro";
const AUTH_HASH = "086f1777dc760c51bc70d9baceb4c9ed8beb81ccc7088b885ae8b31ebfda03e1";
const dataKey = (user) => `camisometro:data:${user}`;

const DATA_VERSION = 2;

// Camisas do armário: o esquilo vestindo cada uma
const DEFAULT_SHIRTS = [
  { id: "brasil-azul", name: "Brasil azul", color: "#1e3a8a", img: "camisas/esquilo_brasil.webp" },
  { id: "chelsea", name: "Chelsea", color: "#1d4ed8", img: "camisas/esquilo_chelsea.webp" },
];

// Camisas de exemplo da primeira versão, removidas na migração se nunca foram usadas
const OLD_DEFAULT_NAMES = ["Preta básica", "Branca lisa", "Azul marinho", "Vermelha", "Cinza mescla", "Verde musgo"];

const $ = (sel) => document.querySelector(sel);

let currentUser = null;
let state = null;

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
  $("#dayInput").value = todayKey();
  $("#dayInput").max = todayKey();
  render();
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
  renderGrid();
  renderRanking();
  renderHistory();
}

function renderHero() {
  $("#friendName").textContent = state.friend;
  $("#todayLabel").textContent = formatDate(todayKey(), { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
  const shirt = shirtById(state.log[todayKey()]);
  if (shirt) {
    $("#todayStatus").innerHTML = `Hoje foi de <b>${escapeHtml(shirt.name)}</b>. Clique em outra camisa para trocar.`;
    $("#heroToday").innerHTML = shirtMedia(shirt);
  } else {
    $("#todayStatus").textContent = "Ainda não marcado hoje. Escolha a camisa no armário abaixo.";
    $("#heroToday").innerHTML = `<span class="q">?</span>`;
  }
}

function renderStats() {
  const counts = getCounts();
  const entries = sortedLog();
  $("#statDays").textContent = entries.length;
  $("#statShirts").textContent = state.shirts.length;
  $("#statStreak").textContent = getStreak();
  const top = state.shirts.slice().sort((a, b) => counts[b.id] - counts[a.id])[0];
  $("#statFav").textContent = top && counts[top.id] > 0 ? top.name : "—";
  $("#statFav").title = $("#statFav").textContent;
}

function renderGrid() {
  const counts = getCounts();
  const selectedId = state.log[$("#dayInput").value];
  const cards = state.shirts.map((s) => `
    <button class="card ${s.id === selectedId ? "selected" : ""}" data-id="${s.id}" type="button">
      <div class="card-media">${shirtMedia(s)}</div>
      <div class="card-name" title="${escapeHtml(s.name)}">${escapeHtml(s.name)}</div>
      <div class="card-meta">${counts[s.id]} ${counts[s.id] === 1 ? "dia" : "dias"}</div>
      <span class="card-del" data-del="${s.id}" role="button" aria-label="Remover camisa" title="Remover">✕</span>
    </button>`).join("");

  $("#shirtGrid").innerHTML = cards + `
    <button class="card card-add" id="addCard" type="button">
      <span class="plus">+</span>
      <span>Nova camisa</span>
    </button>`;
}

function renderRanking() {
  const counts = getCounts();
  const ranked = state.shirts
    .filter((s) => counts[s.id] > 0)
    .sort((a, b) => counts[b.id] - counts[a.id] || a.name.localeCompare(b.name));
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const max = ranked.length ? counts[ranked[0].id] : 1;

  if (!ranked.length) {
    $("#ranking").innerHTML = `<li class="empty">Nenhum registro ainda. Marque a primeira camisa!</li>`;
    return;
  }

  $("#ranking").innerHTML = ranked.map((s, i) => {
    const c = counts[s.id];
    const pct = Math.round((c / total) * 100);
    const medal = ["🥇", "🥈", "🥉"][i] ?? `${i + 1}º`;
    return `
      <li class="rank-item">
        <span class="rank-pos">${medal}</span>
        <div class="rank-thumb">${shirtMedia(s)}</div>
        <div class="rank-info">
          <div class="rank-top"><span>${escapeHtml(s.name)}</span><span>${c}d · ${pct}%</span></div>
          <div class="bar"><div style="width:${(c / max) * 100}%"></div></div>
        </div>
      </li>`;
  }).join("");
}

function renderHistory() {
  const entries = sortedLog();
  $("#historyCount").textContent = entries.length ? `${entries.length} registro${entries.length > 1 ? "s" : ""}` : "";
  if (!entries.length) {
    $("#history").innerHTML = `<li class="empty">O histórico aparece aqui conforme você marca os dias.</li>`;
    return;
  }
  $("#history").innerHTML = entries.slice(0, 30).map(([day, id]) => {
    const s = shirtById(id);
    return `
      <li>
        <div class="rank-thumb">${shirtMedia(s)}</div>
        <div class="h-info">
          <div class="h-date">${formatDate(day, { weekday: "short", day: "2-digit", month: "short" })}</div>
          <div class="h-name">${escapeHtml(s.name)}</div>
        </div>
        <button class="icon-btn" data-unmark="${day}" type="button" title="Remover registro" aria-label="Remover registro">✕</button>
      </li>`;
  }).join("");
}

/* ---------------- Ações ---------------- */

function markShirt(id) {
  const day = $("#dayInput").value || todayKey();
  const shirt = shirtById(id);
  if (state.log[day] === id) {
    delete state.log[day];
    toast(`Registro de ${formatDate(day, { day: "2-digit", month: "short" })} removido`);
  } else {
    state.log[day] = id;
    toast(`✔ ${shirt.name} marcada em ${formatDate(day, { day: "2-digit", month: "short" })}`);
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
$("#dayInput").addEventListener("change", renderGrid);

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
