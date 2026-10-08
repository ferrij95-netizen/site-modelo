// Um worker para todos os previews: <cliente>.overtus.com.br serve dist/_clientes/<cliente>/,
// qualquer outro endereço serve o site da raiz (dist/).
import { noticias } from './noticias.js';

const PREFIX = '/_clientes/';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname;
    const sub = host.split('.')[0];
    const cliente = host.endsWith('.overtus.com.br') && sub !== 'site-modelo' ? sub : null;

    if (!cliente) {
      if (url.pathname.startsWith(PREFIX)) return new Response('Not found', { status: 404 });
      return env.ASSETS.fetch(request);
    }

    // Painel e notícias dinâmicas (só para clientes com notícias; os demais seguem direto).
    // O conteúdo muda sem novo build, então aqui o arquivo é pedido sem cache condicional (sem 304).
    const dyn = await noticias(request, env, cliente, url, u => servir(env, cliente, new URL(u), request, true));
    if (dyn) return dyn;
    return servir(env, cliente, url, request);
  },
};

async function servir(env, cliente, url, request, fresco = false) {
  const base = PREFIX + cliente;
  url = new URL(url);
  url.pathname = base + url.pathname;
  let req = new Request(url, request);
  if (fresco) {
    const h = new Headers(request.headers);
    h.delete('if-none-match'); h.delete('if-modified-since');
    req = new Request(url, { method: 'GET', headers: h });
  }
  const res = await env.ASSETS.fetch(req);
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
}
