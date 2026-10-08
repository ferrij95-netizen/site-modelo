// Notícias com painel: o cliente entra em <cliente>.overtus.com.br/admin com senha, publica,
// e a notícia aparece no site na hora (sem novo build). Textos e imagens ficam no D1 (binding NOTICIAS).
//
// No design do cliente:
//   - página "noticias" com um elemento <div data-noticias data-vazio="..."> (a lista entra dentro dele);
//   - página "noticia" (modelo de uma notícia) com data-noticia-titulo, -data, -imagem, -corpo;
//   - qualquer página pode ter <div data-noticias-ultimas="3"> (últimas notícias, ex.: na home).
// Os cartões saem com classes .noticia-card*, que o CSS do cliente estiliza.
// Senha: tabela acessos (hash PBKDF2), criada por quem configura o cliente.

import { painelHtml } from './painel.js';

export const CLIENTES = {
  nelsonwendt: { nome: 'Nelson Wendt', lang: 'pt', cor: '#0B3B2E', locale: 'pt-BR' },
};

const POR_PAGINA = 12;
const MAX_IMG = 1.8 * 1024 * 1024;
const SESSAO_HORAS = 12;
const enc = new TextEncoder();

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const json = (d, status = 200, h = {}) => new Response(JSON.stringify(d), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...h } });
const hex = b => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');

export function slugify(s) {
  return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'noticia';
}

function dataLonga(iso, locale) {
  const d = new Date(iso + 'T12:00:00Z');
  return isNaN(d) ? iso : d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

// Texto do painel -> HTML. Parágrafos separados por linha em branco, "## " subtítulo, "- " lista,
// **negrito**, [texto](https://link). Tudo é escapado antes, então não entra HTML do usuário.
export function corpoHtml(txt) {
  const inline = s => esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  return String(txt || '').replace(/\r/g, '').split(/\n{2,}/).map(b => b.trim()).filter(Boolean).map(b => {
    if (b.startsWith('## ')) return `<h2>${inline(b.slice(3))}</h2>`;
    const linhas = b.split('\n');
    if (linhas.every(l => /^\s*[-•]\s+/.test(l))) return `<ul>${linhas.map(l => `<li>${inline(l.replace(/^\s*[-•]\s+/, ''))}</li>`).join('')}</ul>`;
    return `<p>${linhas.map(inline).join('<br>')}</p>`;
  }).join('\n');
}

function cartao(n, cfg) {
  const href = `/${cfg.lang}/noticias/${n.slug}`;
  const img = n.imagem_id ? `<figure class="noticia-card-img"><img src="/noticias/img/${n.imagem_id}" alt="" loading="lazy"></figure>` : '';
  return `<article class="noticia-card${n.imagem_id ? '' : ' noticia-card--sem-img'}"><a href="${href}">${img}<div class="noticia-card-txt">`
    + `<time datetime="${esc(n.data)}">${esc(dataLonga(n.data, cfg.locale))}</time><h3>${esc(n.titulo)}</h3>`
    + (n.resumo ? `<p>${esc(n.resumo)}</p>` : '') + `<span class="noticia-card-mais">Ler notícia</span></div></a></article>`;
}

// ---------- Site público ----------

async function publicadas(db, cliente, limite, offset = 0) {
  const r = await db.prepare('SELECT id, slug, titulo, resumo, imagem_id, data FROM noticias WHERE cliente = ? AND publicada = 1 ORDER BY data DESC, id DESC LIMIT ? OFFSET ?')
    .bind(cliente, limite, offset).all();
  return r.results;
}

class Preenche {
  constructor(html) { this.html = html; }
  element(el) { el.setInnerContent(this.html, { html: true }); }
}
class Attr {
  constructor(attr, val) { this.attr = attr; this.val = val; }
  element(el) { el.setAttribute(this.attr, this.val); }
}

// Chamado pelo worker para cada pedido do cliente. Devolve Response ou null (segue o fluxo normal).
export async function noticias(request, env, cliente, url, asset) {
  const cfg = CLIENTES[cliente];
  if (!cfg || !env.NOTICIAS) return null;
  const db = env.NOTICIAS;
  const p = url.pathname;

  if (p === '/admin' || p.startsWith('/admin/')) return admin(request, db, cliente, cfg, url);

  const mImg = p.match(/^\/noticias\/img\/(\d+)$/);
  if (mImg) {
    const r = await db.prepare('SELECT tipo, dados FROM imagens WHERE id = ? AND cliente = ?').bind(+mImg[1], cliente).first();
    if (!r) return new Response('Not found', { status: 404 });
    return new Response(new Uint8Array(r.dados), { headers: { 'content-type': r.tipo, 'cache-control': 'public, max-age=31536000, immutable' } });
  }

  const L = cfg.lang;
  if (p === `/${L}/noticia` || p === `/${L}/noticia.html`) return Response.redirect(new URL(`/${L}/noticias`, url), 301);

  const mPost = p.match(new RegExp(`^/${L}/noticias/([a-z0-9-]+)/?$`));
  if (mPost) {
    const n = await db.prepare('SELECT * FROM noticias WHERE cliente = ? AND slug = ? AND publicada = 1').bind(cliente, mPost[1]).first();
    if (!n) {
      const r404 = await asset(new URL(`/${L}/noticias`, url));
      return dinamico(new HTMLRewriter().on('[data-noticias]', new Preenche('<p class="noticias-vazio">Esta notícia não existe mais.</p>')).transform(r404), 404);
    }
    const res = await asset(new URL(`/${L}/noticia`, url));
    const titulo = `${n.titulo} · ${cfg.nome}`;
    const desc = n.resumo || String(n.corpo).replace(/\s+/g, ' ').slice(0, 155);
    const abs = `${url.origin}/${L}/noticias/${n.slug}`;
    const img = n.imagem_id ? `${url.origin}/noticias/img/${n.imagem_id}` : null;
    let rw = new HTMLRewriter()
      .on('title', new Preenche(esc(titulo)))
      .on('meta[name="description"]', new Attr('content', desc))
      .on('meta[property="og:title"], meta[name="twitter:title"]', new Attr('content', titulo))
      .on('meta[property="og:description"], meta[name="twitter:description"]', new Attr('content', desc))
      .on('meta[property="og:url"]', new Attr('content', abs))
      .on('meta[property="og:type"]', new Attr('content', 'article'))
      .on('link[rel="canonical"]', new Attr('href', abs))
      .on('link[rel="alternate"]', new Attr('href', abs))
      .on('meta[property="og:image:width"], meta[property="og:image:height"]', { element: el => el.remove() })
      .on('[data-noticia-titulo]', new Preenche(esc(n.titulo)))
      .on('[data-noticia-resumo]', new Preenche(esc(n.resumo)))
      .on('[data-noticia-data]', { element: el => { el.setInnerContent(esc(dataLonga(n.data, cfg.locale)), { html: true }); el.setAttribute('datetime', n.data); } })
      .on('[data-noticia-corpo]', new Preenche(corpoHtml(n.corpo)));
    if (img) rw = rw.on('meta[property="og:image"], meta[name="twitter:image"]', new Attr('content', img))
      .on('[data-noticia-imagem]', new Preenche(`<img src="/noticias/img/${n.imagem_id}" alt="${esc(n.titulo)}">`));
    else rw = rw.on('[data-noticia-imagem]', { element: el => el.remove() });
    return dinamico(rw.transform(res));
  }

  if (p === '/sitemap.xml') {
    const res = await asset(url);
    let xml = await res.text();
    const todas = await db.prepare('SELECT slug FROM noticias WHERE cliente = ? AND publicada = 1').bind(cliente).all();
    xml = xml.replace(new RegExp(`\\s*<url><loc>[^<]*/${L}/noticia</loc></url>`), '')
      .replace('</urlset>', todas.results.map(n => `  <url><loc>${url.origin}/${L}/noticias/${n.slug}</loc></url>\n`).join('') + '</urlset>');
    return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
  }

  // Páginas HTML com lista de notícias (página de notícias, home com "últimas"). Arquivos seguem o fluxo normal.
  if (/\.(?!html$)[a-z0-9]+$/i.test(p) || request.method !== 'GET') return null;
  const res = await asset(url);
  if (!(res.headers.get('content-type') || '').includes('text/html') || res.status !== 200) return res;
  const pagina = Math.max(1, parseInt(url.searchParams.get('pagina')) || 1);
  let lista = null, ultimas = {};
  const rw = new HTMLRewriter()
    .on('[data-noticias]', { element: async el => {
      lista ??= await publicadas(db, cliente, POR_PAGINA + 1, (pagina - 1) * POR_PAGINA);
      const itens = lista.slice(0, POR_PAGINA);
      if (!itens.length) return el.setInnerContent(`<p class="noticias-vazio">${esc(el.getAttribute('data-vazio') || 'Nenhuma notícia publicada ainda.')}</p>`, { html: true });
      let nav = '';
      if (pagina > 1 || lista.length > POR_PAGINA) nav = `<nav class="noticias-paginas">`
        + (pagina > 1 ? `<a href="?pagina=${pagina - 1}">← Mais recentes</a>` : '<span></span>')
        + (lista.length > POR_PAGINA ? `<a href="?pagina=${pagina + 1}">Mais antigas →</a>` : '') + '</nav>';
      el.setInnerContent(`<div class="noticias-grade">${itens.map(n => cartao(n, cfg)).join('')}</div>${nav}`, { html: true });
    } })
    .on('[data-noticias-ultimas]', { element: async el => {
      const k = Math.min(12, parseInt(el.getAttribute('data-noticias-ultimas')) || 3);
      ultimas[k] ??= await publicadas(db, cliente, k);
      if (!ultimas[k].length) { const sec = el.getAttribute('data-esconder-vazio'); if (sec !== null) el.remove(); return; }
      el.setInnerContent(`<div class="noticias-grade">${ultimas[k].map(n => cartao(n, cfg)).join('')}</div>`, { html: true });
    } })
    .on('[data-noticias-secao]', { element: async el => {
      ultimas[3] ??= await publicadas(db, cliente, 3);
      if (!ultimas[3].length) el.remove();
    } });
  return dinamico(rw.transform(res));
}

// Página montada na hora: sem ETag do arquivo estático, cache curto.
function dinamico(res, status) {
  const out = new Response(res.body, { status: status || res.status, headers: res.headers });
  out.headers.delete('etag'); out.headers.delete('last-modified');
  out.headers.set('cache-control', 'public, max-age=60');
  return out;
}

// ---------- Painel ----------

async function segredo(db) {
  return (await db.prepare("SELECT valor FROM config WHERE chave = 'segredo_sessao'").first('valor'));
}
async function assina(db, msg) {
  const k = await crypto.subtle.importKey('raw', enc.encode(await segredo(db)), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', k, enc.encode(msg)));
}
export async function hashSenha(senha, salHex) {
  const k = await crypto.subtle.importKey('raw', enc.encode(senha), 'PBKDF2', false, ['deriveBits']);
  const sal = new Uint8Array(salHex.match(/../g).map(h => parseInt(h, 16)));
  return hex(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: sal, iterations: 100000 }, k, 256));
}
function igual(a, b) {
  if (a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}
async function logado(request, db, cliente) {
  const c = (request.headers.get('cookie') || '').match(/(?:^|;\s*)painel=([^;]+)/)?.[1];
  if (!c) return false;
  const [cl, exp, sig] = decodeURIComponent(c).split('.');
  if (cl !== cliente || !(+exp > Date.now())) return false;
  return igual(sig || '', await assina(db, `${cl}.${exp}`));
}

async function admin(request, db, cliente, cfg, url) {
  const p = url.pathname.replace(/\/+$/, '') || '/admin';
  const m = request.method;
  if (!p.startsWith('/admin/api')) {
    if (p !== '/admin') return Response.redirect(new URL('/admin', url), 302);
    return new Response(painelHtml(cfg), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex', 'x-frame-options': 'DENY', 'referrer-policy': 'same-origin' } });
  }
  // Escritas só via fetch do próprio painel (cookie SameSite=Strict + cabeçalho próprio).
  if (m !== 'GET' && request.headers.get('x-painel') !== '1') return json({ erro: 'Pedido inválido' }, 400);

  if (p === '/admin/api/entrar' && m === 'POST') {
    const acc = await db.prepare('SELECT * FROM acessos WHERE cliente = ?').bind(cliente).first();
    if (!acc) return json({ erro: 'Painel ainda não configurado.' }, 403);
    if (acc.bloqueado_ate && new Date(acc.bloqueado_ate + 'Z') > new Date()) return json({ erro: 'Muitas tentativas. Tente de novo em alguns minutos.' }, 429);
    const { senha } = await request.json().catch(() => ({}));
    if (!senha || !igual(await hashSenha(String(senha), acc.sal), acc.senha_hash)) {
      const t = acc.tentativas + 1;
      await db.prepare("UPDATE acessos SET tentativas = ?, bloqueado_ate = CASE WHEN ? >= 5 THEN datetime('now', '+15 minutes') ELSE NULL END WHERE cliente = ?").bind(t >= 5 ? 0 : t, t, cliente).run();
      return json({ erro: 'Senha incorreta.' }, 401);
    }
    await db.prepare('UPDATE acessos SET tentativas = 0, bloqueado_ate = NULL WHERE cliente = ?').bind(cliente).run();
    const exp = Date.now() + SESSAO_HORAS * 3600e3;
    const v = `${cliente}.${exp}.${await assina(db, `${cliente}.${exp}`)}`;
    return json({ ok: true }, 200, { 'set-cookie': `painel=${encodeURIComponent(v)}; Path=/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSAO_HORAS * 3600}` });
  }
  if (p === '/admin/api/sair') return json({ ok: true }, 200, { 'set-cookie': 'painel=; Path=/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=0' });

  if (!(await logado(request, db, cliente))) return json({ erro: 'Sessão expirada. Entre de novo.' }, 401);

  if (p === '/admin/api/sessao') return json({ ok: true, nome: cfg.nome });

  if (p === '/admin/api/senha' && m === 'POST') {
    const { atual, nova } = await request.json().catch(() => ({}));
    const acc = await db.prepare('SELECT * FROM acessos WHERE cliente = ?').bind(cliente).first();
    if (!igual(await hashSenha(String(atual || ''), acc.sal), acc.senha_hash)) return json({ erro: 'A senha atual não confere.' }, 400);
    if (!nova || String(nova).length < 8) return json({ erro: 'A nova senha precisa ter pelo menos 8 caracteres.' }, 400);
    const sal = hex(crypto.getRandomValues(new Uint8Array(16)));
    await db.prepare('UPDATE acessos SET senha_hash = ?, sal = ? WHERE cliente = ?').bind(await hashSenha(String(nova), sal), sal, cliente).run();
    return json({ ok: true });
  }

  if (p === '/admin/api/imagens' && m === 'POST') {
    const tipo = request.headers.get('content-type') || '';
    if (!/^image\/(jpeg|png|webp)$/.test(tipo)) return json({ erro: 'Use uma imagem JPG, PNG ou WEBP.' }, 400);
    const buf = await request.arrayBuffer();
    if (!buf.byteLength || buf.byteLength > MAX_IMG) return json({ erro: 'Imagem grande demais.' }, 400);
    const r = await db.prepare('INSERT INTO imagens (cliente, tipo, dados) VALUES (?, ?, ?)').bind(cliente, tipo, buf).run();
    return json({ id: r.meta.last_row_id });
  }

  if (p === '/admin/api/noticias' && m === 'GET') {
    const r = await db.prepare('SELECT id, slug, titulo, resumo, imagem_id, publicada, data, atualizada FROM noticias WHERE cliente = ? ORDER BY data DESC, id DESC').bind(cliente).all();
    return json({ noticias: r.results, base: `/${cfg.lang}/noticias/` });
  }

  const mId = p.match(/^\/admin\/api\/noticias(?:\/(\d+))?$/);
  if (mId) {
    const id = mId[1] ? +mId[1] : null;
    const atual = id ? await db.prepare('SELECT * FROM noticias WHERE id = ? AND cliente = ?').bind(id, cliente).first() : null;
    if (id && !atual) return json({ erro: 'Notícia não encontrada.' }, 404);
    if (m === 'GET' && id) return json({ noticia: atual });
    if (m === 'DELETE' && id) {
      await db.batch([
        db.prepare('DELETE FROM noticias WHERE id = ?').bind(id),
        db.prepare('DELETE FROM imagens WHERE id = ? AND cliente = ?').bind(atual.imagem_id ?? -1, cliente),
      ]);
      return json({ ok: true });
    }
    if ((m === 'POST' && !id) || (m === 'PUT' && id)) {
      const b = await request.json().catch(() => null);
      const titulo = String(b?.titulo || '').trim().slice(0, 200);
      if (!titulo) return json({ erro: 'Escreva um título.' }, 400);
      const data = /^\d{4}-\d{2}-\d{2}$/.test(b.data) ? b.data : new Date().toISOString().slice(0, 10);
      const resumo = String(b.resumo || '').trim().slice(0, 400);
      const corpo = String(b.corpo || '').slice(0, 50000);
      const imagem_id = b.imagem_id ? +b.imagem_id : null;
      if (imagem_id && !(await db.prepare('SELECT 1 FROM imagens WHERE id = ? AND cliente = ?').bind(imagem_id, cliente).first())) return json({ erro: 'Imagem inválida.' }, 400);
      const publicada = b.publicada ? 1 : 0;
      // Endereço: definido na criação (para links já compartilhados não quebrarem); repete -2, -3 se já existir.
      let slug = atual?.slug;
      if (!slug) {
        const base = slugify(titulo); slug = base;
        for (let i = 2; await db.prepare('SELECT 1 FROM noticias WHERE cliente = ? AND slug = ?').bind(cliente, slug).first(); i++) slug = `${base}-${i}`;
      }
      if (atual) {
        await db.prepare("UPDATE noticias SET titulo = ?, resumo = ?, corpo = ?, imagem_id = ?, publicada = ?, data = ?, atualizada = datetime('now') WHERE id = ?")
          .bind(titulo, resumo, corpo, imagem_id, publicada, data, id).run();
        if (atual.imagem_id && atual.imagem_id !== imagem_id) await db.prepare('DELETE FROM imagens WHERE id = ? AND cliente = ?').bind(atual.imagem_id, cliente).run();
        return json({ id, slug });
      }
      const r = await db.prepare('INSERT INTO noticias (cliente, slug, titulo, resumo, corpo, imagem_id, publicada, data) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
        .bind(cliente, slug, titulo, resumo, corpo, imagem_id, publicada, data).run();
      return json({ id: r.meta.last_row_id, slug });
    }
  }
  return json({ erro: 'Não encontrado' }, 404);
}
