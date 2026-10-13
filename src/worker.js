// Um worker para todos os previews: <cliente>.overtus.com.br serve dist/_clientes/<cliente>/,
// qualquer outro endereço serve o site da raiz (dist/).
import { noticias } from './noticias.js';
import { prospeccao } from './prospeccao.js';
import { resultados } from './resultados.js';
import { lembretes } from './lembretes.js';

const PREFIX = '/_clientes/';
// hub.overtus.com.br (dist/_hub/), com tela de login em /entrar/: na raiz o canvas de prospecção, em /sites/ a lista de clientes.
// Nada secreto fica no código: CRED_HASH = sha256("usuario:senha"); o cookie leva sha256("sessao:usuario:senha"),
// que só quem sabe a senha consegue gerar, e o worker confere sha256(cookie) === SESSAO_HASH.
// Para trocar a senha, gere os dois hashes de novo.
const CRED_HASH = '3990a7858587f047c1b71e497dc0d03bad2c397707fa77281ca034092c23a21f';
const SESSAO_HASH = '6d203bd4216f4d75b894163c1d338bc73806eadae35de3a67932f34a99e5ac77';

async function sha256(texto) {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
}

const redirecionar = (local, cookie) => {
  const headers = { Location: local, 'Cache-Control': 'no-store' };
  if (cookie) headers['Set-Cookie'] = cookie;
  return new Response(null, { status: 303, headers });
};

async function hub(request, env, url) {
  if (url.pathname === '/entrar' && request.method === 'POST') {
    const form = await request.formData().catch(() => null);
    const cred = `${String(form?.get('ov_u') || form?.get('email') || '').trim().toLowerCase()}:${form?.get('ov_k') || form?.get('senha') || ''}`;
    if ((await sha256(cred)) !== CRED_HASH) return redirecionar('/entrar/?erro=1');
    const validade = form.get('lembrar') ? '; Max-Age=2592000' : '';
    return redirecionar('/', `hub=${await sha256('sessao:' + cred)}; Path=/; HttpOnly; Secure; SameSite=Lax${validade}`);
  }
  if (url.pathname === '/sair') return redirecionar('/entrar/', 'hub=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');

  const publico = url.pathname.startsWith('/entrar/') || url.pathname.startsWith('/app/') || url.pathname === '/sw.js';
  if (!publico) {
    const cookie = (request.headers.get('Cookie') || '').match(/(?:^|;\s*)hub=([0-9a-f]{64})/);
    if (!cookie || (await sha256(cookie[1])) !== SESSAO_HASH) {
      if (url.pathname.startsWith('/api/')) return new Response('{"code":"session_expired"}', { status: 401, headers: { 'Content-Type': 'application/json' } });
      return redirecionar('/entrar/');
    }
  }
  // Dados do canvas de prospecção (página inicial do hub), no D1.
  if (url.pathname === '/api/empresas' || url.pathname.startsWith('/api/empresas/')) return prospeccao(request, env, url);
  if (url.pathname === '/api/resultados') return resultados(request, env);
  // Lembretes e follow-up (bloco "Hoje" da Visão geral), com todas as listas juntas.
  if (url.pathname === '/api/lembretes') return lembretes(request, env);
  // Enquanto o banco do canvas estiver vazio (antes da cópia dos dados), a raiz continua mostrando a lista de sites.
  if (url.pathname === '/' && env.PROSPECCAO && !(await env.PROSPECCAO.prepare('SELECT 1 FROM empresas LIMIT 1').first().catch(() => null))) {
    url.pathname = '/sites/';
  }
  url.pathname = '/_hub' + url.pathname;
  const res = await env.ASSETS.fetch(new Request(url, request));
  const out = new Response(res.body, res);
  if (!publico) out.headers.set('Cache-Control', 'private, no-store');
  const loc = res.headers.get('Location');
  if (loc) out.headers.set('Location', new URL(loc, url).pathname.replace(/^\/_hub/, '') || '/');
  return out;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname;
    const sub = host.split('.')[0];
    const overtus = host.endsWith('.overtus.com.br');

    if (overtus && sub === 'hub') return hub(request, env, url);

    const cliente = overtus && sub !== 'site-modelo' ? sub : null;

    if (!cliente) {
      if (url.pathname.startsWith(PREFIX) || url.pathname.startsWith('/_hub/')) return new Response('Not found', { status: 404 });
      return env.ASSETS.fetch(request);
    }

    // Painel e notícias dinâmicas (só para clientes com notícias; os demais seguem direto).
    // O conteúdo muda sem novo build, então aqui o arquivo é pedido sem cache condicional (sem 304).
    const dyn = await noticias(request, env, cliente, url, u => servir(env, cliente, new URL(u), request, true));
    return noHub(dyn || await servir(env, cliente, url, request));
  },
};

// O hub abre os sites dos clientes dentro da sua moldura (hub.overtus.com.br/ver/<cliente>/), num iframe.
// O _headers manda X-Frame-Options: SAMEORIGIN para todo o resto; aqui o hub passa a poder emoldurar os previews.
function noHub(res) {
  const out = new Response(res.body, res);
  out.headers.delete('X-Frame-Options');
  out.headers.set('Content-Security-Policy', "frame-ancestors 'self' https://hub.overtus.com.br");
  return out;
}

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
