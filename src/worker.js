// Um worker para todos os previews: <cliente>.overtus.com.br serve dist/_clientes/<cliente>/,
// qualquer outro endereço serve o site da raiz (dist/).
const PREFIX = '/_clientes/';
// hub.overtus.com.br: lista de todos os clientes (dist/_hub/), protegida por senha.
// Guardamos só o SHA-256 de "usuario:senha"; para trocar, gere o hash de novo.
const HUB_HASH = 'd187aef3a534764677c227938909da17fd8ad6a38314d0fca0de3d0c5acd179f';

async function hubAutorizado(request) {
  const auth = request.headers.get('Authorization') || '';
  if (!auth.startsWith('Basic ')) return false;
  let par;
  try { par = atob(auth.slice(6)); } catch { return false; }
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(par));
  const hex = [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
  return hex === HUB_HASH;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname;
    const sub = host.split('.')[0];
    const overtus = host.endsWith('.overtus.com.br');

    if (overtus && sub === 'hub') {
      if (!(await hubAutorizado(request))) {
        return new Response('Senha necessária', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Overtus", charset="UTF-8"' } });
      }
      url.pathname = '/_hub' + url.pathname;
      const res = await env.ASSETS.fetch(new Request(url, request));
      const out = new Response(res.body, res);
      out.headers.set('Cache-Control', 'private, no-store');
      const loc = res.headers.get('Location');
      if (loc) out.headers.set('Location', new URL(loc, url).pathname.replace(/^\/_hub/, '') || '/');
      return out;
    }

    const cliente = overtus && sub !== 'site-modelo' ? sub : null;

    if (!cliente) {
      if (url.pathname.startsWith(PREFIX) || url.pathname.startsWith('/_hub/')) return new Response('Not found', { status: 404 });
      return env.ASSETS.fetch(request);
    }

    const base = PREFIX + cliente;
    url.pathname = base + url.pathname;
    const res = await env.ASSETS.fetch(new Request(url, request));
    // Redirecionamentos do servidor de arquivos (ex.: /pt/sobre.html -> /pt/sobre) não podem expor a pasta interna.
    const loc = res.headers.get('Location');
    if (loc) {
      const target = new URL(loc, url);
      if (target.pathname.startsWith(base + '/')) {
        target.pathname = target.pathname.slice(base.length);
        const out = new Response(res.body, res);
        out.headers.set('Location', target.pathname + target.search);
        return out;
      }
    }
    return res;
  },
};
