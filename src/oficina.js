// Área do cliente para oficinas (primeira: Auto Serviços ISA).
// O dono entra em <cliente>.overtus.com.br/admin com usuário e senha e tem:
//   - fotos de serviços: envia pelo celular, o navegador converte para WEBP e a foto aparece na seção Serviços do site
//     (elemento <div data-servicos-fotos> na home; some se não houver fotos);
//   - mini CRM de WhatsApp: clientes, carro, serviço, status, retorno, histórico e mensagens prontas que abrem o WhatsApp;
//   - cliques nos botões de WhatsApp e telefone do site (o site manda /api/clique).
// Tudo fica no D1 NOTICIAS (tabelas servicos_fotos, crm_contatos, crm_registros, site_cliques, imagens, acessos),
// nada vira arquivo estático (o limite de arquivos do Workers Free está quase cheio).

import { assina, hashSenha, igual, logado } from './noticias.js';
import { painelOficinaHtml } from './oficina-painel.js';

export const OFICINAS = {
  autoisa: {
    nome: 'Auto Serviços ISA',
    curto: 'ISA',
    usuario: 'autoisa',
    whatsapp: '5521988573533',
    endereco: 'R. Aristides Lobo, 160, Rio Comprido, Rio de Janeiro/RJ',
    avaliacao: 'https://www.google.com/maps/search/?api=1&query=Auto+Servi%C3%A7os+ISA+Rua+Aristides+Lobo+160+Rio+de+Janeiro',
    servicos: ['Manutenção preventiva', 'Revisões técnicas', 'Diagnóstico eletrônico', 'Restauração', 'Carroceria', 'Pintura de rodas'],
  },
};

export const STATUS = ['novo', 'orcamento', 'agendado', 'oficina', 'pronto', 'entregue', 'perdido'];
const ROTULO = { novo: 'Novo contato', orcamento: 'Orçamento enviado', agendado: 'Agendado', oficina: 'Na oficina', pronto: 'Pronto para retirada', entregue: 'Entregue', perdido: 'Não fechou' };
const MAX_FOTO = 1.5 * 1024 * 1024;
const MAX_MINI = 400 * 1024;
const MAX_FOTOS_SITE = 24;
const SESSAO_HORAS = 24 * 14;

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const json = (d, status = 200, h = {}) => new Response(JSON.stringify(d), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...h } });
const hex = b => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
const txt = (v, n) => String(v ?? '').trim().slice(0, n);

// Telefone só com dígitos, com DDI 55 quando vier só DDD + número.
export function fone(v) {
  let d = String(v || '').replace(/\D/g, '');
  if (d.startsWith('0')) d = d.replace(/^0+/, '');
  if (d.length === 10 || d.length === 11) d = '55' + d;
  return d.slice(0, 15);
}
const dataOk = v => (/^\d{4}-\d{2}-\d{2}$/.test(v || '') ? v : null);

export async function oficina(request, env, cliente, url, asset) {
  const cfg = OFICINAS[cliente];
  if (!cfg || !env.NOTICIAS) return null;
  const db = env.NOTICIAS;
  const p = url.pathname;

  if (p === '/admin' || p.startsWith('/admin/')) return admin(request, db, cliente, cfg, url);

  const mFoto = p.match(/^\/fotos\/(\d+)\.webp$/);
  if (mFoto) {
    const r = await db.prepare('SELECT tipo, dados FROM imagens WHERE id = ? AND cliente = ?').bind(+mFoto[1], cliente).first();
    if (!r) return new Response('Not found', { status: 404 });
    return new Response(new Uint8Array(r.dados), { headers: { 'content-type': r.tipo, 'cache-control': 'public, max-age=31536000, immutable' } });
  }

  if (p === '/api/clique' && request.method === 'POST') {
    const tipo = (await request.text().catch(() => '')).trim();
    if (['whatsapp', 'telefone', 'instagram'].includes(tipo)) {
      const dia = new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10);
      await db.prepare('INSERT INTO site_cliques (cliente, dia, tipo, n) VALUES (?, ?, ?, 1) ON CONFLICT (cliente, dia, tipo) DO UPDATE SET n = n + 1').bind(cliente, dia, tipo).run();
    }
    return new Response(null, { status: 204 });
  }

  // Home: galeria de fotos na seção Serviços.
  if (request.method === 'GET' && (p === '/' || p === '/index.html')) {
    const res = await asset(url);
    if (res.status !== 200 || !(res.headers.get('content-type') || '').includes('text/html')) return res;
    const fotos = (await db.prepare('SELECT f.id, f.imagem_id, f.thumb_id, f.servico, f.legenda FROM servicos_fotos f WHERE f.cliente = ? AND f.visivel = 1 ORDER BY f.ordem DESC, f.id DESC LIMIT ?').bind(cliente, MAX_FOTOS_SITE).all()).results;
    const rw = new HTMLRewriter().on('[data-servicos-fotos]', { element: el => {
      if (!fotos.length) return el.remove();
      el.setInnerContent(galeria(fotos), { html: true });
    } });
    const out = new Response(rw.transform(res).body, res);
    out.headers.delete('etag'); out.headers.delete('last-modified');
    out.headers.set('cache-control', 'public, max-age=60');
    return out;
  }
  return null;
}

function galeria(fotos) {
  const figs = fotos.map(f => {
    const alt = [f.servico, f.legenda].filter(Boolean).join(': ') || 'Serviço na oficina';
    return `<figure class="obra"><a href="/fotos/${f.imagem_id}.webp" data-foto><img src="/fotos/${f.thumb_id}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"></a>`
      + `<figcaption>${f.servico ? `<b>${esc(f.servico)}</b>` : ''}${f.legenda ? `<span>${esc(f.legenda)}</span>` : ''}</figcaption></figure>`;
  }).join('');
  return `<p class="eyebrow ladeado">Na oficina</p><div class="obras-grade">${figs}</div>`;
}

// ---------- Painel ----------

const cookieSessao = v => `painel=${encodeURIComponent(v)}; Path=/admin; HttpOnly; Secure; SameSite=Strict; Max-Age=${v ? SESSAO_HORAS * 3600 : 0}`;

async function admin(request, db, cliente, cfg, url) {
  const p = url.pathname.replace(/\/+$/, '') || '/admin';
  const m = request.method;
  if (!p.startsWith('/admin/api')) {
    if (p === '/admin/app.webmanifest') return new Response(JSON.stringify({
      name: `${cfg.nome} · Painel`, short_name: cfg.curto, start_url: '/admin', scope: '/admin', display: 'standalone',
      background_color: '#0A0A0B', theme_color: '#0A0A0B', icons: [{ src: '/admin/icone.svg', sizes: 'any', type: 'image/svg+xml' }],
    }), { headers: { 'content-type': 'application/manifest+json' } });
    if (p === '/admin/icone.svg') return new Response(icone(cfg), { headers: { 'content-type': 'image/svg+xml', 'cache-control': 'public, max-age=86400' } });
    if (p !== '/admin') return Response.redirect(new URL('/admin', url), 302);
    return new Response(painelOficinaHtml(cfg, ROTULO), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex', 'x-frame-options': 'DENY', 'referrer-policy': 'same-origin' } });
  }
  if (m !== 'GET' && request.headers.get('x-painel') !== '1') return json({ erro: 'Pedido inválido' }, 400);

  if (p === '/admin/api/entrar' && m === 'POST') {
    const acc = await db.prepare('SELECT * FROM acessos WHERE cliente = ?').bind(cliente).first();
    if (!acc) return json({ erro: 'Área ainda não configurada.' }, 403);
    if (acc.bloqueado_ate && new Date(acc.bloqueado_ate + 'Z') > new Date()) return json({ erro: 'Muitas tentativas. Tente de novo em alguns minutos.' }, 429);
    const { usuario, senha } = await request.json().catch(() => ({}));
    const userOk = String(usuario || '').trim().toLowerCase() === cfg.usuario;
    const senhaOk = !!senha && igual(await hashSenha(String(senha), acc.sal), acc.senha_hash);
    if (!userOk || !senhaOk) {
      const t = acc.tentativas + 1;
      await db.prepare("UPDATE acessos SET tentativas = ?, bloqueado_ate = CASE WHEN ? >= 5 THEN datetime('now', '+15 minutes') ELSE NULL END WHERE cliente = ?").bind(t >= 5 ? 0 : t, t, cliente).run();
      return json({ erro: 'Usuário ou senha incorretos.' }, 401);
    }
    await db.prepare('UPDATE acessos SET tentativas = 0, bloqueado_ate = NULL WHERE cliente = ?').bind(cliente).run();
    const exp = Date.now() + SESSAO_HORAS * 3600e3;
    return json({ ok: true }, 200, { 'set-cookie': cookieSessao(`${cliente}.${exp}.${await assina(db, `${cliente}.${exp}`)}`) });
  }
  if (p === '/admin/api/sair') return json({ ok: true }, 200, { 'set-cookie': cookieSessao('') });

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

  if (p === '/admin/api/resumo') {
    const hoje = new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10);
    const d7 = new Date(Date.now() - (3 + 24 * 6) * 3600e3).toISOString().slice(0, 10);
    const d30 = new Date(Date.now() - (3 + 24 * 29) * 3600e3).toISOString().slice(0, 10);
    const [st, cl, ft, mes] = await db.batch([
      db.prepare('SELECT status, COUNT(*) n FROM crm_contatos WHERE cliente = ? GROUP BY status').bind(cliente),
      db.prepare('SELECT tipo, SUM(CASE WHEN dia >= ? THEN n ELSE 0 END) d7, SUM(n) d30 FROM site_cliques WHERE cliente = ? AND dia >= ? GROUP BY tipo').bind(d7, cliente, d30),
      db.prepare('SELECT COUNT(*) n, SUM(visivel) v FROM servicos_fotos WHERE cliente = ?').bind(cliente),
      db.prepare("SELECT COUNT(*) n, COALESCE(SUM(valor), 0) v FROM crm_contatos WHERE cliente = ? AND status = 'entregue' AND atualizado >= ?").bind(cliente, hoje.slice(0, 8) + '01'),
    ]);
    return json({ hoje, status: Object.fromEntries(st.results.map(r => [r.status, r.n])), cliques: Object.fromEntries(cl.results.map(r => [r.tipo, { d7: r.d7, d30: r.d30 }])), fotos: ft.results[0], mes: mes.results[0] });
  }

  // ----- Fotos -----
  if (p === '/admin/api/fotos' && m === 'GET') {
    const r = await db.prepare('SELECT id, imagem_id, thumb_id, servico, legenda, ordem, visivel, criada FROM servicos_fotos WHERE cliente = ? ORDER BY ordem DESC, id DESC').bind(cliente).all();
    return json({ fotos: r.results, servicos: cfg.servicos });
  }
  if (p === '/admin/api/fotos' && m === 'POST') {
    const f = await request.formData().catch(() => null);
    const foto = f?.get('foto'), mini = f?.get('mini');
    if (!foto || !mini || typeof foto === 'string' || typeof mini === 'string') return json({ erro: 'Envie a foto.' }, 400);
    if (foto.type !== 'image/webp' || mini.type !== 'image/webp') return json({ erro: 'A foto precisa chegar em WEBP. Atualize a página e tente de novo.' }, 400);
    if (foto.size > MAX_FOTO || mini.size > MAX_MINI) return json({ erro: 'Foto grande demais.' }, 400);
    const servico = cfg.servicos.includes(f.get('servico')) ? f.get('servico') : '';
    const legenda = txt(f.get('legenda'), 140);
    const [a, b] = await db.batch([
      db.prepare("INSERT INTO imagens (cliente, tipo, dados) VALUES (?, 'image/webp', ?)").bind(cliente, await foto.arrayBuffer()),
      db.prepare("INSERT INTO imagens (cliente, tipo, dados) VALUES (?, 'image/webp', ?)").bind(cliente, await mini.arrayBuffer()),
    ]);
    const ordem = (await db.prepare('SELECT COALESCE(MAX(ordem), 0) + 1 o FROM servicos_fotos WHERE cliente = ?').bind(cliente).first('o'));
    const r = await db.prepare('INSERT INTO servicos_fotos (cliente, imagem_id, thumb_id, servico, legenda, ordem) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(cliente, a.meta.last_row_id, b.meta.last_row_id, servico, legenda, ordem).run();
    return json({ id: r.meta.last_row_id });
  }
  const mF = p.match(/^\/admin\/api\/fotos\/(\d+)(\/(subir|descer))?$/);
  if (mF) {
    const id = +mF[1];
    const f = await db.prepare('SELECT * FROM servicos_fotos WHERE id = ? AND cliente = ?').bind(id, cliente).first();
    if (!f) return json({ erro: 'Foto não encontrada.' }, 404);
    if (mF[3] && m === 'POST') {
      const viz = mF[3] === 'subir'
        ? await db.prepare('SELECT id, ordem FROM servicos_fotos WHERE cliente = ? AND (ordem > ? OR (ordem = ? AND id > ?)) ORDER BY ordem ASC, id ASC LIMIT 1').bind(cliente, f.ordem, f.ordem, id).first()
        : await db.prepare('SELECT id, ordem FROM servicos_fotos WHERE cliente = ? AND (ordem < ? OR (ordem = ? AND id < ?)) ORDER BY ordem DESC, id DESC LIMIT 1').bind(cliente, f.ordem, f.ordem, id).first();
      if (viz) {
        const [oa, ob] = viz.ordem === f.ordem ? (mF[3] === 'subir' ? [f.ordem + 1, f.ordem] : [f.ordem - 1, f.ordem]) : [viz.ordem, f.ordem];
        await db.batch([
          db.prepare('UPDATE servicos_fotos SET ordem = ? WHERE id = ?').bind(oa, id),
          db.prepare('UPDATE servicos_fotos SET ordem = ? WHERE id = ?').bind(ob, viz.id),
        ]);
      }
      return json({ ok: true });
    }
    if (m === 'PUT') {
      const b = await request.json().catch(() => ({}));
      const servico = cfg.servicos.includes(b.servico) ? b.servico : '';
      await db.prepare('UPDATE servicos_fotos SET servico = ?, legenda = ?, visivel = ? WHERE id = ?').bind(servico, txt(b.legenda, 140), b.visivel ? 1 : 0, id).run();
      return json({ ok: true });
    }
    if (m === 'DELETE') {
      await db.batch([
        db.prepare('DELETE FROM servicos_fotos WHERE id = ?').bind(id),
        db.prepare('DELETE FROM imagens WHERE cliente = ? AND id IN (?, ?)').bind(cliente, f.imagem_id, f.thumb_id),
      ]);
      return json({ ok: true });
    }
  }

  // ----- CRM -----
  if (p === '/admin/api/contatos' && m === 'GET') {
    const r = await db.prepare(`SELECT c.*, (SELECT texto FROM crm_registros r WHERE r.contato_id = c.id ORDER BY r.id DESC LIMIT 1) ultimo,
      (SELECT criado FROM crm_registros r WHERE r.contato_id = c.id ORDER BY r.id DESC LIMIT 1) ultimo_em
      FROM crm_contatos c WHERE c.cliente = ? ORDER BY c.atualizado DESC LIMIT 2000`).bind(cliente).all();
    return json({ contatos: r.results, servicos: cfg.servicos });
  }
  const mC = p.match(/^\/admin\/api\/contatos(?:\/(\d+))?(\/registros)?$/);
  if (mC) {
    const id = mC[1] ? +mC[1] : null;
    const atual = id ? await db.prepare('SELECT * FROM crm_contatos WHERE id = ? AND cliente = ?').bind(id, cliente).first() : null;
    if (id && !atual) return json({ erro: 'Cliente não encontrado.' }, 404);
    if (mC[2]) {
      if (!id) return json({ erro: 'Não encontrado' }, 404);
      if (m === 'GET') return json({ registros: (await db.prepare('SELECT id, texto, criado FROM crm_registros WHERE contato_id = ? AND cliente = ? ORDER BY id DESC LIMIT 200').bind(id, cliente).all()).results });
      if (m === 'POST') {
        const b = await request.json().catch(() => ({}));
        const t = txt(b.texto, 1000);
        if (!t) return json({ erro: 'Escreva a anotação.' }, 400);
        await db.batch([
          db.prepare('INSERT INTO crm_registros (cliente, contato_id, texto) VALUES (?, ?, ?)').bind(cliente, id, t),
          db.prepare("UPDATE crm_contatos SET atualizado = datetime('now') WHERE id = ?").bind(id),
        ]);
        return json({ ok: true });
      }
    }
    if (m === 'DELETE' && id) {
      await db.batch([
        db.prepare('DELETE FROM crm_registros WHERE contato_id = ? AND cliente = ?').bind(id, cliente),
        db.prepare('DELETE FROM crm_contatos WHERE id = ?').bind(id),
      ]);
      return json({ ok: true });
    }
    if ((m === 'POST' && !id) || (m === 'PUT' && id)) {
      const b = await request.json().catch(() => null);
      const nome = txt(b?.nome, 120);
      if (!nome) return json({ erro: 'Escreva o nome do cliente.' }, 400);
      const status = STATUS.includes(b.status) ? b.status : 'novo';
      const valor = b.valor === '' || b.valor == null ? null : Number(String(b.valor).replace(/\./g, '').replace(',', '.'));
      const v = [nome, fone(b.telefone), txt(b.carro, 80), txt(b.ano, 12), txt(b.placa, 10).toUpperCase(), txt(b.servico, 120), status,
        Number.isFinite(valor) ? valor : null, txt(b.origem, 40), dataOk(b.retorno), txt(b.notas, 4000)];
      if (atual) {
        const reg = [];
        if (atual.status !== status) reg.push(`Status: ${ROTULO[status]}`);
        if ((atual.retorno || null) !== v[9] && v[9]) reg.push(`Retorno marcado para ${v[9].split('-').reverse().join('/')}`);
        await db.batch([
          db.prepare("UPDATE crm_contatos SET nome = ?, telefone = ?, carro = ?, ano = ?, placa = ?, servico = ?, status = ?, valor = ?, origem = ?, retorno = ?, notas = ?, atualizado = datetime('now') WHERE id = ?").bind(...v, id),
          ...reg.map(t => db.prepare('INSERT INTO crm_registros (cliente, contato_id, texto) VALUES (?, ?, ?)').bind(cliente, id, t)),
        ]);
        return json({ id });
      }
      const r = await db.prepare('INSERT INTO crm_contatos (cliente, nome, telefone, carro, ano, placa, servico, status, valor, origem, retorno, notas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').bind(cliente, ...v).run();
      await db.prepare('INSERT INTO crm_registros (cliente, contato_id, texto) VALUES (?, ?, ?)').bind(cliente, r.meta.last_row_id, `Cliente cadastrado (${ROTULO[status]})`).run();
      return json({ id: r.meta.last_row_id });
    }
  }
  return json({ erro: 'Não encontrado' }, 404);
}

function icone(cfg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="96" fill="#0A0A0B"/><circle cx="256" cy="256" r="196" fill="none" stroke="#C9CCD1" stroke-width="14"/><text x="256" y="300" font-family="Georgia,serif" font-size="150" text-anchor="middle" fill="#E6E8EB" letter-spacing="8">${esc(cfg.curto)}</text></svg>`;
}
