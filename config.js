/* =========================================================
   Esquilook — configuração do Neon
   As duas URLs são públicas: quem protege os dados são as regras de
   segurança do banco (neon/schema.sql). NUNCA coloque aqui a connection
   string (postgresql://...) nem senhas.
   ========================================================= */

window.ESQUILOOK_CONFIG = {
  authUrl: "https://ep-crimson-firefly-b6ts3lsa.neonauth.c-2.sa-east-1.aws.neon.tech/neondb/auth",
  dataUrl: "https://ep-crimson-firefly-b6ts3lsa.apirest.c-2.sa-east-1.aws.neon.tech/neondb/rest/v1",
  // Login só com o nome: "sahymon" vira "sahymon@esquilook.app" na conta do Neon Auth.
  // É um endereço de fachada (nenhum e-mail é enviado), então nenhum e-mail real fica exposto.
  loginDomain: "esquilook.app",
};
