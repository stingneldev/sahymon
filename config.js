/* =========================================================
   Esquilook — configuração do Supabase
   A chave "publishable" é pública por natureza: quem protege os dados são
   as regras de segurança do banco (supabase/schema.sql).
   NUNCA coloque aqui uma chave secreta (sb_secret_... / service_role).
   ========================================================= */

window.ESQUILOOK_CONFIG = {
  supabaseUrl: "https://fgqsdmiwdpfpvxedkgta.supabase.co",
  supabaseKey: "sb_publishable_mv1F3dgj5UqwJ21DXyK9SA_3w75J9yJ", // chave publishable do projeto
  // Login só com o nome: "sahymon" vira "sahymon@esquilook.app" na conta do Supabase.
  // É um endereço de fachada (nenhum e-mail é enviado), então nenhum e-mail real fica exposto.
  loginDomain: "esquilook.app",
};
