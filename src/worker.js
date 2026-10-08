// Um worker para todos os previews: <cliente>.overtus.com.br serve dist/_clientes/<cliente>/,
// qualquer outro endereço serve o site da raiz (dist/).
const PREFIX = '/_clientes/';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.split(':')[0];
    const sub = host.split('.')[0];
    const cliente = host.endsWith('.overtus.com.br') && sub !== 'site-modelo' ? sub : null;

    if (!cliente) {
      if (url.pathname.startsWith(PREFIX)) return new Response('Not found', { status: 404 });
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
