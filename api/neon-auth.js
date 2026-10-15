/* =========================================================
   Esquilook — ponte do login (Vercel Edge Function)
   O site chama /neon-auth/... (vercel.json) e esta função repassa ao Neon Auth.
   Assim o cookie de sessão do Neon é gravado no domínio do próprio site e o
   Brave/Safari não o bloqueiam como "cookie de terceiros".
   Repassa só os cabeçalhos necessários (o Neon recusa o host da Vercel).
   ========================================================= */

export const config = { runtime: "edge" };

const TARGET = "https://ep-crimson-firefly-b6ts3lsa.neonauth.c-2.sa-east-1.aws.neon.tech/neondb/auth";
const REQUEST_HEADERS = ["accept", "authorization", "content-type", "cookie", "origin", "user-agent"];
const RESPONSE_HEADERS = ["cache-control", "content-type", "location"];

export default async function handler(request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") || "";
  // Só caminhos simples do Neon Auth (nada de "..", esquemas ou outros hosts)
  if (!/^[a-z0-9._/-]*$/i.test(path) || path.includes("..")) {
    return new Response(JSON.stringify({ message: "Caminho inválido" }), { status: 400 });
  }
  url.searchParams.delete("path");
  const query = url.searchParams.toString();

  const headers = new Headers();
  for (const name of REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  const init = { method: request.method, headers, redirect: "manual" };
  if (!["GET", "HEAD"].includes(request.method)) init.body = await request.arrayBuffer();

  let upstream;
  try {
    upstream = await fetch(`${TARGET}/${path}${query ? `?${query}` : ""}`, init);
  } catch {
    return new Response(JSON.stringify({ message: "Neon Auth indisponível" }), { status: 502 });
  }

  const out = new Headers();
  for (const name of RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) out.set(name, value);
  }
  // Cookies de sessão: sem "Domain" para valerem no domínio do próprio site
  const cookies = upstream.headers.getSetCookie?.() ?? [];
  for (const cookie of cookies) out.append("set-cookie", cookie.replace(/;\s*Domain=[^;]*/i, ""));

  return new Response(upstream.body, { status: upstream.status, headers: out });
}
