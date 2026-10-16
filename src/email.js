// E-mail da Overtus dentro do hub (hub.overtus.com.br/email/), pela API do Hostinger Mail.
// O token fica só no segredo HOSTINGER_MAIL_TOKEN do Worker (Cloudflare > Workers > site-modelo > Settings >
// Variables and Secrets). Nunca no código: o repositório é público.
//
// GET  /api/email/pastas                          -> pastas com contagem de não lidas
// GET  /api/email/mensagens?pasta=INBOX&pagina=1&q= -> lista (q busca em assunto, remetente, destinatário e corpo)
// GET  /api/email/mensagem?pasta=INBOX&uid=12     -> cabeçalho + texto + html (marca como lida)
// GET  /api/email/anexo?pasta=INBOX&uid=12&id=... -> baixa um anexo
// POST /api/email/enviar  {para, cc, assunto, texto, respondendo:{pasta,uid}} -> envia
// Nada é apagado por aqui.

const API = 'https://api.mail.hostinger.com/api/v1';
const NOME = 'João Vitor · Overtus';

const json = (v, status = 200) => new Response(JSON.stringify(v), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
});

let caixa = null; // { id, endereco }, descoberto em /me na primeira chamada

// Acha o token mesmo se o nome no painel vier com espaço, minúsculas ou traço no lugar do sublinhado.
function tokenDe(env) {
  if (typeof env.HOSTINGER_MAIL_TOKEN === 'string' && env.HOSTINGER_MAIL_TOKEN.trim()) return env.HOSTINGER_MAIL_TOKEN.trim();
  const nome = Object.keys(env).find(k => typeof env[k] === 'string' && /^hostinger[\s_-]*mail[\s_-]*token$/i.test(k.trim()));
  return nome ? env[nome].trim() : '';
}

async function api(env, caminho, init = {}) {
  const headers = { Accept: 'application/json', ...(init.headers || {}) };
  // Nos testes locais o proxy da nuvem já põe o token; no Worker ele vem do segredo.
  const token = tokenDe(env);
  if (token) headers.Authorization = 'Bearer ' + token.replace(/^Bearer\s+/i, '');
  return fetch(API + caminho, { ...init, headers });
}

async function lerJson(res) {
  const txt = await res.text();
  try { return txt ? JSON.parse(txt) : {}; } catch { return { error: txt.slice(0, 300) }; }
}

async function falha(res) {
  const d = await lerJson(res);
  const code = res.status === 401 || res.status === 403 ? 'token_invalido' : (d.code || 'erro_api');
  return json({ code, erro: d.error || `A API do e-mail respondeu ${res.status}`, detalhes: d.params }, res.status === 422 ? 422 : 502);
}

async function descobrirCaixa(env) {
  if (caixa) return caixa;
  const res = await api(env, '/me');
  if (!res.ok) throw res;
  const d = await lerJson(res);
  const lista = d.data?.mailboxes || d.mailboxes || (Array.isArray(d.data) ? d.data : []);
  const m = lista.find(x => /joaovitor@/i.test(x.address || x.email || '')) || lista[0];
  if (!m) throw new Response(JSON.stringify({ error: 'nenhuma caixa no token' }), { status: 404 });
  caixa = { id: m.mailboxResourceId || m.resourceId || m.id, endereco: m.address || m.email || '' };
  return caixa;
}

const pastaValida = p => /^[\w .\-]{1,100}$/.test(p || '') ? p : null;
const lista = v => String(v || '').split(/[,;\s]+/).map(s => s.trim()).filter(Boolean);
const emailOk = e => /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(e);

export async function email(request, env, url) {
  const rota = url.pathname.replace(/^\/api\/email\/?/, '');
  if (!tokenDe(env) && !env.EMAIL_TESTE_LOCAL) {
    // Só os nomes (nunca os valores) das variáveis de texto que o Worker recebeu, para achar um nome trocado.
    const nomes = Object.keys(env).filter(k => typeof env[k] === 'string');
    return json({ code: 'sem_token', erro: 'Falta o segredo HOSTINGER_MAIL_TOKEN no Worker.', nomes }, 503);
  }
  try {
    const cx = await descobrirCaixa(env);
    const base = `/mailboxes/${encodeURIComponent(cx.id)}`;

    if (rota === 'pastas' && request.method === 'GET') {
      const res = await api(env, `${base}/folders?perPage=100`);
      if (!res.ok) return falha(res);
      const d = await lerJson(res);
      return json({ caixa: cx.endereco, pastas: d.data || [] });
    }

    if (rota === 'mensagens' && request.method === 'GET') {
      const pasta = pastaValida(url.searchParams.get('pasta') || 'INBOX');
      if (!pasta) return json({ code: 'pasta_invalida' }, 400);
      const pagina = Math.max(1, parseInt(url.searchParams.get('pagina') || '1', 10) || 1);
      const q = (url.searchParams.get('q') || '').trim().slice(0, 200);
      const qs = `page=${pagina}&perPage=40&sort=-date`;
      const p = `${base}/folders/${encodeURIComponent(pasta)}/messages`;
      const res = q
        ? await api(env, `${p}/search?${qs}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject: q, from: q, to: q, body: q }) })
        : await api(env, `${p}?${qs}`);
      if (!res.ok) return falha(res);
      const d = await lerJson(res);
      return json({ caixa: cx.endereco, mensagens: d.data || [], paginacao: d.pagination || null });
    }

    if (rota === 'mensagem' && request.method === 'GET') {
      const pasta = pastaValida(url.searchParams.get('pasta'));
      const uid = parseInt(url.searchParams.get('uid'), 10);
      if (!pasta || !(uid > 0)) return json({ code: 'parametros' }, 400);
      const p = `${base}/folders/${encodeURIComponent(pasta)}/messages/${uid}`;
      const [rm, rt] = await Promise.all([api(env, p), api(env, p + '/text')]);
      if (!rm.ok) return falha(rm);
      const msg = (await lerJson(rm)).data;
      const txt = rt.ok ? (await lerJson(rt)).data || {} : {};
      if (msg?.unseen) {
        await api(env, p, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ addFlags: ['\\Seen'] }) }).catch(() => {});
        msg.unseen = false;
      }
      return json({ caixa: cx.endereco, mensagem: msg, texto: txt.text || '', html: txt.html || '' });
    }

    if (rota === 'anexo' && request.method === 'GET') {
      const pasta = pastaValida(url.searchParams.get('pasta'));
      const uid = parseInt(url.searchParams.get('uid'), 10);
      const id = url.searchParams.get('id') || '';
      if (!pasta || !(uid > 0) || !/^[\w=+\-]{1,500}$/.test(id)) return json({ code: 'parametros' }, 400);
      const res = await api(env, `${base}/folders/${encodeURIComponent(pasta)}/messages/${uid}/attachments/${encodeURIComponent(id)}`, { headers: { Accept: '*/*' } });
      if (!res.ok) return falha(res);
      const nome = (url.searchParams.get('nome') || 'anexo').replace(/["\\\r\n]/g, '');
      return new Response(res.body, { headers: {
        'Content-Type': res.headers.get('Content-Type') || 'application/octet-stream',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(nome)}`,
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
      } });
    }

    if (rota === 'enviar' && request.method === 'POST') {
      if (!(request.headers.get('Content-Type') || '').includes('application/json')) return json({ code: 'formato' }, 415);
      const b = await request.json().catch(() => null);
      if (!b) return json({ code: 'formato' }, 400);
      const para = lista(b.para), cc = lista(b.cc);
      const ruins = [...para, ...cc].filter(e => !emailOk(e));
      if (!para.length) return json({ code: 'sem_destinatario', erro: 'Falta o destinatário.' }, 400);
      if (ruins.length) return json({ code: 'email_invalido', erro: 'Endereço inválido: ' + ruins.join(', ') }, 400);
      const corpo = {
        to: para, displayName: NOME,
        subject: String(b.assunto || '').slice(0, 400),
        text: String(b.texto || '').slice(0, 100000),
      };
      if (cc.length) corpo.cc = cc;
      const r = b.respondendo;
      if (r && pastaValida(r.pasta) && parseInt(r.uid, 10) > 0) corpo.inReplyTo = { folder: r.pasta, uid: parseInt(r.uid, 10) };
      const res = await api(env, `${base}/send`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) });
      if (!res.ok) return falha(res);
      return json({ ok: true });
    }

    return json({ code: 'nao_encontrado' }, 404);
  } catch (e) {
    if (e instanceof Response) return falha(e);
    return json({ code: 'sem_conexao', erro: 'Não foi possível falar com a API do e-mail.' }, 502);
  }
}
