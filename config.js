/* =========================================================
   Esquilook — configuração do Neon
   As duas URLs são públicas: quem protege os dados são as regras de
   segurança do banco (neon/schema.sql). NUNCA coloque aqui a connection
   string (postgresql://...) nem senhas.
   ========================================================= */

// Login do Neon. O Neon Auth guarda a sessão num cookie; se o login fosse direto ao
// domínio do Neon, o cookie seria "de outro site" e o Brave e o Safari o bloqueariam.
// Na Vercel, /neon-auth é repassado ao Neon (vercel.json), então o cookie é do próprio site.
const NEON_AUTH_URL = "https://ep-crimson-firefly-b6ts3lsa.neonauth.c-2.sa-east-1.aws.neon.tech/neondb/auth";
const ON_VERCEL = /\.vercel\.app$/.test(location.hostname);

window.ESQUILOOK_CONFIG = {
  authUrl: ON_VERCEL ? "/neon-auth" : NEON_AUTH_URL,
  dataUrl: "https://ep-crimson-firefly-b6ts3lsa.apirest.c-2.sa-east-1.aws.neon.tech/neondb/rest/v1",
  // Login só com o nome: "sahymon" vira "sahymon@esquilook.app" na conta do Neon Auth.
  // É um endereço de fachada (nenhum e-mail é enviado), então nenhum e-mail real fica exposto.
  loginDomain: "esquilook.app",
};
