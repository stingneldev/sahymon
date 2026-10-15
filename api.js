/* =========================================================
   Esquilook — conexão com o Neon
   Login: Neon Auth (Managed Better Auth). Dados: Neon Data API (PostgREST).
   Tudo via fetch, sem biblioteca externa e sem cookies de outro domínio:
     1. POST /sign-in/email      -> token de sessão (guardado no localStorage)
     2. GET  /token  (Bearer)    -> JWT de curta duração
     3. Data API     (Bearer JWT) -> leitura e gravação, com RLS no banco
   ========================================================= */

const CFG = window.ESQUILOOK_CONFIG || {};
const AUTH_STORE = "esquilook:neon-auth";

// Erros que a interface trata de forma diferente
class AuthError extends Error {}
class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

// Lê o conteúdo (payload) de um JWT sem verificar a assinatura (quem verifica é o servidor)
function jwtPayload(token) {
  try {
    const part = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(escape(atob(part))));
  } catch {
    return {};
  }
}

const api = {
  session: null, // { token: sessão do Neon Auth, email }
  jwt: null,     // { token, exp } usado na Data API

  // URLs do Neon (ou localhost para testes) preenchidas em config.js
  configured() {
    const ok = (u) => /^(https:\/\/[a-z0-9.-]+\.neon\.tech|http:\/\/localhost:\d+)\/[a-z0-9_/-]+$/.test(String(u || ""));
    return ok(CFG.authUrl) && ok(CFG.dataUrl);
  },

  /* ---------- Sessão ---------- */

  loadSession() {
    try {
      const s = JSON.parse(localStorage.getItem(AUTH_STORE));
      if (s && typeof s.token === "string" && s.token) this.session = s;
    } catch { /* sessão corrompida: ignora */ }
    return this.session;
  },

  saveSession(token, email) {
    this.session = { token, email: String(email || "") };
    this.jwt = null;
    try { localStorage.setItem(AUTH_STORE, JSON.stringify(this.session)); } catch { /* vale só nesta aba */ }
  },

  clearSession() {
    this.session = null;
    this.jwt = null;
    try { localStorage.removeItem(AUTH_STORE); } catch { /* nada a fazer */ }
  },

  // Nome de login (parte antes do @)
  username() {
    return (this.session?.email || "").split("@")[0];
  },

  async authFetch(path, { method = "GET", body, bearer } = {}) {
    const headers = {};
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (bearer) headers.Authorization = `Bearer ${bearer}`;
    try {
      return await fetch(`${CFG.authUrl}${path}`, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        credentials: "omit", // nada de cookie de outro domínio (o Safari bloquearia)
      });
    } catch {
      throw new ApiError("Sem conexão com o servidor.", 0);
    }
  },

  async signIn(email, password) {
    const res = await this.authFetch("/sign-in/email", { method: "POST", body: { email, password, rememberMe: true } });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (res.status === 429) throw new ApiError("Muitas tentativas. Aguarde alguns minutos.", 429);
      if (data.code === "EMAIL_NOT_VERIFIED") {
        throw new ApiError("Conta ainda não verificada no Neon Auth.", res.status, "email_not_confirmed");
      }
      // Aberto como arquivo (duplo clique no index.html): o navegador não informa o site
      if (data.code === "MISSING_OR_NULL_ORIGIN" || location.protocol === "file:") {
        throw new ApiError("Abra o site pelo endereço (link do GitHub Pages ou localhost), não pelo arquivo.", res.status, "null_origin");
      }
      if (res.status === 403 && /origin/i.test(data.message || "")) {
        throw new ApiError("Este endereço do site não está liberado no Neon Auth.", 403, "invalid_origin");
      }
      throw new AuthError(data.message || "Usuário ou senha inválidos.");
    }
    if (!data.token) throw new ApiError("O servidor de login não devolveu a sessão.", res.status);
    this.saveSession(data.token, data.user?.email || email);
    // Confirma já no login que a sessão vale para a Data API. Se a senha passou mas esta
    // etapa falhar, avisa com outra mensagem (não é usuário/senha errados).
    try {
      await this.getJwt();
    } catch (ex) {
      this.clearSession();
      if (ex instanceof AuthError) {
        throw new ApiError("Senha aceita, mas o Neon não liberou o acesso aos dados (etapa do token).", 401, "token_failed");
      }
      throw ex;
    }
  },

  async signOut() {
    const token = this.session?.token;
    this.clearSession();
    if (!token) return;
    try {
      await this.authFetch("/sign-out", { method: "POST", body: {}, bearer: token });
    } catch { /* sem rede: a sessão local já foi apagada */ }
  },

  // JWT para a Data API. Reaproveita enquanto faltar mais de 1 min para vencer;
  // chamadas em paralelo esperam o mesmo pedido.
  jwtRequest: null,

  getJwt(force = false) {
    if (!this.session) return Promise.reject(new AuthError("Sessão encerrada."));
    if (!force && this.jwt && this.jwt.exp - Date.now() > 60_000) return Promise.resolve(this.jwt.token);
    this.jwtRequest ??= (async () => {
      const res = await this.authFetch("/token", { bearer: this.session.token });
      if (res.status === 401 || res.status === 403) {
        this.clearSession();
        throw new AuthError("Sessão expirada.");
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.token) throw new ApiError("Não foi possível validar a sessão.", res.status);
      const exp = Number(jwtPayload(data.token).exp) * 1000 || Date.now() + 5 * 60_000;
      this.jwt = { token: data.token, exp };
      return data.token;
    })().finally(() => { this.jwtRequest = null; });
    return this.jwtRequest;
  },

  /* ---------- Requisições na Data API ---------- */

  async request(path, { method = "GET", body, prefer } = {}, retried = false) {
    const jwt = await this.getJwt(retried);
    const headers = { Authorization: `Bearer ${jwt}` };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (prefer) headers.Prefer = prefer;

    let res;
    try {
      res = await fetch(`${CFG.dataUrl}${path}`, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        credentials: "omit",
      });
    } catch {
      throw new ApiError("Sem conexão com o servidor.", 0);
    }

    // JWT vencido ou recusado: pega outro uma vez; se a sessão acabou, getJwt avisa
    if (res.status === 401 && !retried) return this.request(path, { method, body, prefer }, true);
    if (res.status === 401) {
      this.clearSession();
      throw new AuthError("Sessão expirada.");
    }

    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = null; }
    if (!res.ok) throw new ApiError(data?.message || `Erro ${res.status}`, res.status, data?.code);
    return data;
  },

  /* ---------- Dados ---------- */

  async fetchAll() {
    const [shirts, entries, settings] = await Promise.all([
      this.request("/shirts?select=id,name,color,img,position,created_at&order=position.asc,created_at.asc"),
      this.request("/entries?select=day,status,shirt_id&order=day.asc"),
      this.request("/settings?select=key,value"),
    ]);
    return { shirts, entries, settings };
  },

  // Versão leve para a sincronização periódica: sem as fotos das camisas
  async fetchLight() {
    const [shirtIds, entries, settings] = await Promise.all([
      this.request("/shirts?select=id&order=id.asc"),
      this.request("/entries?select=day,status,shirt_id&order=day.asc"),
      this.request("/settings?select=key,value"),
    ]);
    return { shirtIds: shirtIds.map((x) => x.id), entries, settings };
  },

  addEntry(day, shirtId) {
    const row = shirtId ? { day, status: "shirt", shirt_id: shirtId } : { day, status: "absent", shirt_id: null };
    return this.request("/entries", { method: "POST", body: row, prefer: "return=minimal" });
  },

  // return=representation: num mês encerrado do bolão o banco não apaga e volta vazio
  deleteEntry(day) {
    return this.request(`/entries?day=eq.${encodeURIComponent(day)}`, { method: "DELETE", prefer: "return=representation" });
  },

  addShirt(shirt) {
    return this.request("/shirts", { method: "POST", body: shirt, prefer: "return=minimal" });
  },

  // return=representation: se o banco recusar (camisa de mês encerrado), volta vazio
  deleteShirt(id) {
    return this.request(`/shirts?id=eq.${encodeURIComponent(id)}&select=id`, { method: "DELETE", prefer: "return=representation" });
  },

  setSetting(key, value) {
    return this.request("/settings?on_conflict=key", {
      method: "POST",
      body: { key, value },
      prefer: "resolution=merge-duplicates,return=minimal",
    });
  },

  /* ---------- Bolão do lanche ---------- */

  async fetchBolao() {
    const [participants, guesses, payments, expenses, closures, config] = await Promise.all([
      this.request("/bolao_participants?select=id,name,color,active,created_at&order=created_at.asc"),
      this.request("/rpc/bolao_guess_list"),
      this.request("/bolao_payments?select=id,participant_id,month,amount_cents,confirmed,created_at&order=created_at.asc"),
      this.request("/bolao_expenses?select=id,month,description,amount_cents,created_at&order=created_at.asc"),
      this.request("/bolao_closures?select=month,prize_cents,winners,closed_at"),
      this.request("/bolao_config?select=pix_key,pix_name,pix_city"),
    ]);
    return { participants, guesses, payments, expenses, closures, config: config?.[0] };
  },

  // Palpite definitivo: o banco confere horário, castigo e duplicidade e recusa com uma mensagem
  placeGuess(day, participantId, shirtId) {
    return this.request("/rpc/bolao_place_guess", {
      method: "POST",
      body: { p_day: day, p_participant: participantId, p_shirt: shirtId },
    });
  },

  addParticipant(row) {
    return this.request("/bolao_participants", { method: "POST", body: row, prefer: "return=minimal" });
  },

  updateParticipant(id, patch) {
    return this.request(`/bolao_participants?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH", body: patch, prefer: "return=representation",
    });
  },

  addPayment(row) {
    return this.request("/bolao_payments", { method: "POST", body: row, prefer: "return=minimal" });
  },

  // return=representation: se o banco recusar (mês encerrado), volta vazio em vez de erro
  deletePayment(id) {
    return this.request(`/bolao_payments?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", prefer: "return=representation" });
  },

  // O caixa confirma um pagamento informado pelo QR Code
  confirmPayment(id) {
    return this.request(`/bolao_payments?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH", body: { confirmed: true }, prefer: "return=representation",
    });
  },

  addExpense(row) {
    return this.request("/bolao_expenses", { method: "POST", body: row, prefer: "return=minimal" });
  },

  deleteExpense(id) {
    return this.request(`/bolao_expenses?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", prefer: "return=representation" });
  },

  closeMonth(row) {
    return this.request("/bolao_closures", { method: "POST", body: row, prefer: "return=minimal" });
  },

  // { pix_key, pix_name, pix_city }
  setPixConfig(patch) {
    return this.request("/bolao_config?id=eq.true", {
      method: "PATCH", body: patch, prefer: "return=representation",
    });
  },

  // Importação: o que já existir na nuvem é mantido
  importShirts(rows) {
    if (!rows.length) return null;
    return this.request("/shirts?on_conflict=id", {
      method: "POST", body: rows, prefer: "resolution=ignore-duplicates,return=minimal",
    });
  },

  importEntries(rows) {
    if (!rows.length) return null;
    return this.request("/entries?on_conflict=day", {
      method: "POST", body: rows, prefer: "resolution=ignore-duplicates,return=minimal",
    });
  },
};
