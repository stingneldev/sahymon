/* =========================================================
   Esquilook — conexão com o Supabase
   Fala direto com as APIs REST do Supabase (Auth + PostgREST) via fetch,
   sem biblioteca externa. A sessão (tokens) fica no localStorage.
   ========================================================= */

const CFG = window.ESQUILOOK_CONFIG || {};
const AUTH_STORE = "esquilook:auth";

// Erros que a interface trata de forma diferente
class AuthError extends Error {}
class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

const api = {
  session: null,

  // URL do projeto (ou localhost para testes) + chave preenchidas em config.js
  configured() {
    const url = String(CFG.supabaseUrl || "");
    return /^(https:\/\/[a-z0-9-]+\.supabase\.co|http:\/\/localhost:\d+)$/.test(url) && String(CFG.supabaseKey || "").length > 20;
  },

  /* ---------- Sessão ---------- */

  loadSession() {
    try {
      const s = JSON.parse(localStorage.getItem(AUTH_STORE));
      if (s && typeof s.access_token === "string" && typeof s.refresh_token === "string") this.session = s;
    } catch { /* sessão corrompida: ignora */ }
    return this.session;
  },

  saveSession(data) {
    this.session = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: Date.now() + (Number(data.expires_in) || 3600) * 1000,
    };
    try { localStorage.setItem(AUTH_STORE, JSON.stringify(this.session)); } catch { /* sem armazenamento: vale só nesta aba */ }
  },

  // Nome de login (parte antes do @) lido do token da sessão
  username() {
    try {
      const part = this.session.access_token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      return String(JSON.parse(atob(part)).email || "").split("@")[0];
    } catch {
      return "";
    }
  },

  clearSession() {
    this.session = null;
    try { localStorage.removeItem(AUTH_STORE); } catch { /* nada a fazer */ }
  },

  async authCall(grant, body) {
    let res;
    try {
      res = await fetch(`${CFG.supabaseUrl}/auth/v1/token?grant_type=${grant}`, {
        method: "POST",
        headers: { apikey: CFG.supabaseKey, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch {
      throw new ApiError("Sem conexão com o servidor.", 0);
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (res.status === 429) throw new ApiError("Muitas tentativas. Aguarde alguns minutos.", 429);
      // Conta criada sem "Auto Confirm User": a senha pode estar certa, mas o login é recusado
      if (data.error_code === "email_not_confirmed" || /not confirmed/i.test(data.msg || data.error_description || "")) {
        throw new ApiError("Conta ainda não confirmada no Supabase (marque \"Auto Confirm User\").", res.status, "email_not_confirmed");
      }
      throw new AuthError(data.error_description || data.msg || "Usuário ou senha inválidos.");
    }
    this.saveSession(data);
  },

  signIn(email, password) {
    return this.authCall("password", { email, password });
  },

  // Uma renovação por vez: chamadas em paralelo esperam a mesma (o Supabase
  // invalida o refresh_token depois de usado, então renovar duas vezes derrubaria a sessão)
  refreshing: null,

  refresh() {
    if (!this.session) return Promise.reject(new AuthError("Sessão encerrada."));
    this.refreshing ??= this.authCall("refresh_token", { refresh_token: this.session.refresh_token })
      .catch((e) => {
        if (e instanceof AuthError) this.clearSession();
        throw e;
      })
      .finally(() => { this.refreshing = null; });
    return this.refreshing;
  },

  async signOut() {
    const token = this.session?.access_token;
    this.clearSession();
    if (!token) return;
    try {
      await fetch(`${CFG.supabaseUrl}/auth/v1/logout`, {
        method: "POST",
        headers: { apikey: CFG.supabaseKey, Authorization: `Bearer ${token}` },
      });
    } catch { /* sem rede: a sessão local já foi apagada */ }
  },

  /* ---------- Requisições autenticadas ---------- */

  async request(path, { method = "GET", body, prefer } = {}, retried = false) {
    if (!this.session) throw new AuthError("Sessão encerrada.");
    if (this.session.expires_at - Date.now() < 60_000) await this.refresh();

    const headers = {
      apikey: CFG.supabaseKey,
      Authorization: `Bearer ${this.session.access_token}`,
    };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (prefer) headers.Prefer = prefer;

    let res;
    try {
      res = await fetch(`${CFG.supabaseUrl}${path}`, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } catch {
      throw new ApiError("Sem conexão com o servidor.", 0);
    }

    if (res.status === 401 && !retried) {
      await this.refresh();
      return this.request(path, { method, body, prefer }, true);
    }
    if (res.status === 401) {
      this.clearSession();
      throw new AuthError("Sessão expirada.");
    }

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw new ApiError(data?.message || `Erro ${res.status}`, res.status, data?.code);
    return data;
  },

  /* ---------- Dados ---------- */

  async fetchAll() {
    const [shirts, entries, settings] = await Promise.all([
      this.request("/rest/v1/shirts?select=id,name,color,img,position,created_at&order=position.asc,created_at.asc"),
      this.request("/rest/v1/entries?select=day,status,shirt_id&order=day.asc"),
      this.request("/rest/v1/settings?select=key,value"),
    ]);
    return { shirts, entries, settings };
  },

  // Versão leve para a sincronização periódica: sem as fotos das camisas
  async fetchLight() {
    const [shirtIds, entries, settings] = await Promise.all([
      this.request("/rest/v1/shirts?select=id&order=id.asc"),
      this.request("/rest/v1/entries?select=day,status,shirt_id&order=day.asc"),
      this.request("/rest/v1/settings?select=key,value"),
    ]);
    return { shirtIds: shirtIds.map((x) => x.id), entries, settings };
  },

  addEntry(day, shirtId) {
    const row = shirtId ? { day, status: "shirt", shirt_id: shirtId } : { day, status: "absent", shirt_id: null };
    return this.request("/rest/v1/entries", { method: "POST", body: row, prefer: "return=minimal" });
  },

  // return=representation: num mês encerrado do bolão o banco não apaga e volta vazio
  deleteEntry(day) {
    return this.request(`/rest/v1/entries?day=eq.${encodeURIComponent(day)}`, { method: "DELETE", prefer: "return=representation" });
  },

  addShirt(shirt) {
    return this.request("/rest/v1/shirts", { method: "POST", body: shirt, prefer: "return=minimal" });
  },

  // return=representation: se o banco recusar (camisa de mês encerrado), volta vazio
  deleteShirt(id) {
    return this.request(`/rest/v1/shirts?id=eq.${encodeURIComponent(id)}&select=id`, { method: "DELETE", prefer: "return=representation" });
  },

  setSetting(key, value) {
    return this.request("/rest/v1/settings?on_conflict=key", {
      method: "POST",
      body: { key, value },
      prefer: "resolution=merge-duplicates,return=minimal",
    });
  },

  /* ---------- Bolão do lanche ---------- */

  async fetchBolao() {
    const [participants, guesses, payments, expenses, closures, config] = await Promise.all([
      this.request("/rest/v1/bolao_participants?select=id,name,emoji,color,active,created_at&order=created_at.asc"),
      this.request("/rest/v1/rpc/bolao_guess_list"),
      this.request("/rest/v1/bolao_payments?select=id,participant_id,month,amount_cents,confirmed,created_at&order=created_at.asc"),
      this.request("/rest/v1/bolao_expenses?select=id,month,description,amount_cents,created_at&order=created_at.asc"),
      this.request("/rest/v1/bolao_closures?select=month,prize_cents,winners,closed_at"),
      this.request("/rest/v1/bolao_config?select=pix_key,pix_name,pix_city"),
    ]);
    return { participants, guesses, payments, expenses, closures, config: config?.[0] };
  },

  // Palpite definitivo: o banco confere horário, castigo e duplicidade e recusa com uma mensagem
  placeGuess(day, participantId, shirtId) {
    return this.request("/rest/v1/rpc/bolao_place_guess", {
      method: "POST",
      body: { p_day: day, p_participant: participantId, p_shirt: shirtId },
    });
  },

  addParticipant(row) {
    return this.request("/rest/v1/bolao_participants", { method: "POST", body: row, prefer: "return=minimal" });
  },

  updateParticipant(id, patch) {
    return this.request(`/rest/v1/bolao_participants?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH", body: patch, prefer: "return=representation",
    });
  },

  addPayment(row) {
    return this.request("/rest/v1/bolao_payments", { method: "POST", body: row, prefer: "return=minimal" });
  },

  // return=representation: se o banco recusar (mês encerrado), volta vazio em vez de erro
  deletePayment(id) {
    return this.request(`/rest/v1/bolao_payments?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", prefer: "return=representation" });
  },

  // O caixa confirma um pagamento informado pelo QR Code
  confirmPayment(id) {
    return this.request(`/rest/v1/bolao_payments?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH", body: { confirmed: true }, prefer: "return=representation",
    });
  },

  addExpense(row) {
    return this.request("/rest/v1/bolao_expenses", { method: "POST", body: row, prefer: "return=minimal" });
  },

  deleteExpense(id) {
    return this.request(`/rest/v1/bolao_expenses?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", prefer: "return=representation" });
  },

  closeMonth(row) {
    return this.request("/rest/v1/bolao_closures", { method: "POST", body: row, prefer: "return=minimal" });
  },

  // { pix_key, pix_name, pix_city }
  setPixConfig(patch) {
    return this.request("/rest/v1/bolao_config?id=eq.true", {
      method: "PATCH", body: patch, prefer: "return=representation",
    });
  },

  // Importação: o que já existir na nuvem é mantido
  importShirts(rows) {
    if (!rows.length) return null;
    return this.request("/rest/v1/shirts?on_conflict=id", {
      method: "POST", body: rows, prefer: "resolution=ignore-duplicates,return=minimal",
    });
  },

  importEntries(rows) {
    if (!rows.length) return null;
    return this.request("/rest/v1/entries?on_conflict=day", {
      method: "POST", body: rows, prefer: "resolution=ignore-duplicates,return=minimal",
    });
  },
};
