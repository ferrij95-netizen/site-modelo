// Dados do canvas de prospecção (página inicial do hub), no D1 "prospeccao".
// Tabela empresas: id, lista, doc (JSON com todos os campos da empresa), versao, atualizado (ms), apagado (0/1).
// Só é chamado pelo hub depois do login. A página usa hub/inicio/dados.js para falar com estas rotas.
//   GET  /api/empresas?lista=x&desde=ms  -> { agora, docs:[{id, versao, ...campos}], apagados:[id] }
//   GET  /api/empresas/<id>              -> { doc }
//   POST /api/empresas/<id> {op, data}   -> op "update" mescla os campos enviados, "set" substitui, "delete" apaga
// Apagar só marca apagado=1: o registro continua no banco e pode ser recuperado.

const json = (v, status = 200) => new Response(JSON.stringify(v), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
});
const erro = (code, msg, status) => json({ code, erro: msg }, status);
// Igual ao banco do artifact: update mescla objetos em profundidade (contato, marca, proposta...),
// listas são trocadas inteiras e {"__delete__": true} remove o campo.
const objeto = v => v && typeof v === 'object' && !Array.isArray(v);
function mesclar(base, patch) {
  const out = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    if (objeto(v) && v.__delete__ === true) delete out[k];
    else if (objeto(v) && objeto(out[k])) out[k] = mesclar(out[k], v);
    else out[k] = v;
  }
  return out;
}
const ler = row => ({ id: row.id, versao: row.versao, ...JSON.parse(row.doc) });

export async function prospeccao(request, env, url) {
  const db = env.PROSPECCAO;
  if (!db) return erro('sem_banco', 'Banco de prospecção não configurado', 500);
  const id = decodeURIComponent(url.pathname.slice('/api/empresas/'.length));

  if (request.method === 'GET' && url.pathname === '/api/empresas') {
    const lista = url.searchParams.get('lista') || '';
    const desde = Number(url.searchParams.get('desde')) || 0;
    // Margem de 5 s: uma gravação que termine durante a consulta aparece de novo na próxima, em vez de se perder.
    const agora = Date.now() - 5000;
    const { results } = await db.prepare('SELECT id, doc, versao, apagado FROM empresas WHERE lista = ? AND atualizado > ?').bind(lista, desde).all();
    return json({
      agora,
      docs: results.filter(r => !r.apagado).map(ler),
      apagados: desde ? results.filter(r => r.apagado).map(r => r.id) : [],
    });
  }

  // Carga em lote (cópia inicial do artifact): só cria o que ainda não existe, então rodar de novo não estraga nada.
  if (request.method === 'POST' && url.pathname === '/api/empresas/_lote') {
    const docs = await request.json().catch(() => null);
    if (!docs || typeof docs !== 'object' || Array.isArray(docs)) return erro('invalid_argument', 'envie {id: doc}', 400);
    const agora = Date.now();
    const st = db.prepare('INSERT INTO empresas (id, lista, doc, versao, atualizado, apagado) VALUES (?, ?, ?, 1, ?, 0) ON CONFLICT(id) DO NOTHING');
    const lote = Object.entries(docs).filter(([k, d]) => k && !k.includes('/') && d && typeof d === 'object')
      .map(([k, d]) => st.bind(k, String(d.lista || 'minhas'), JSON.stringify({ ...d, lista: String(d.lista || 'minhas') }), agora));
    const r = lote.length ? await db.batch(lote) : [];
    return json({ recebidos: lote.length, criados: r.reduce((n, x) => n + (x.meta?.changes || 0), 0) });
  }
  if (request.method === 'GET' && url.pathname === '/api/empresas/_contagem') {
    const { results } = await db.prepare('SELECT lista, COUNT(*) AS n FROM empresas WHERE apagado = 0 GROUP BY lista ORDER BY lista').all();
    return json({ listas: results });
  }

  if (url.pathname === '/api/empresas/_pedidos') return pedidos(request, db);

  if (!id || id.includes('/') || id.length > 200) return erro('invalid_argument', 'id inválido', 400);

  if (request.method === 'GET') {
    const row = await db.prepare('SELECT id, doc, versao FROM empresas WHERE id = ? AND apagado = 0').bind(id).first();
    return json({ doc: row ? ler(row) : null });
  }

  if (request.method !== 'POST') return erro('invalid_argument', 'método não suportado', 405);
  if (!(request.headers.get('Content-Type') || '').includes('application/json')) return erro('invalid_argument', 'envie JSON', 415);
  const body = await request.json().catch(() => null);
  const op = body?.op;
  const data = body?.data;
  if (op !== 'delete' && (!data || typeof data !== 'object' || Array.isArray(data))) return erro('invalid_argument', 'data precisa ser um objeto', 400);
  if (data) { delete data.id; delete data.versao; }
  const agora = Date.now();

  if (op === 'delete') {
    await db.prepare('UPDATE empresas SET apagado = 1, versao = versao + 1, atualizado = ? WHERE id = ?').bind(agora, id).run();
    return json({ ok: true });
  }

  if (op === 'set') {
    const lista = String(data.lista || 'minhas');
    const doc = { ...data, lista };
    await db.prepare(`INSERT INTO empresas (id, lista, doc, versao, atualizado, apagado) VALUES (?, ?, ?, 1, ?, 0)
      ON CONFLICT(id) DO UPDATE SET lista = excluded.lista, doc = excluded.doc, versao = empresas.versao + 1, atualizado = excluded.atualizado, apagado = 0`)
      .bind(id, lista, JSON.stringify(doc), agora).run();
    return json({ doc });
  }

  if (op === 'update') {
    // Lê, junta os campos e grava só se ninguém mudou o registro no meio; se mudou, tenta de novo.
    for (let i = 0; i < 5; i++) {
      const row = await db.prepare('SELECT doc, versao FROM empresas WHERE id = ? AND apagado = 0').bind(id).first();
      if (!row) return erro('not_found', 'Empresa não encontrada', 404);
      const doc = mesclar(JSON.parse(row.doc), data);
      const lista = String(doc.lista || 'minhas');
      const r = await db.prepare('UPDATE empresas SET doc = ?, lista = ?, versao = versao + 1, atualizado = ? WHERE id = ? AND versao = ?')
        .bind(JSON.stringify(doc), lista, Date.now(), id, row.versao).run();
      if (r.meta.changes) return json({ doc });
    }
    return erro('conflito', 'A empresa mudou várias vezes seguidas; tente de novo', 409);
  }

  return erro('invalid_argument', 'op deve ser update, set ou delete', 400);
}

// Pedidos de site feitos pelo botão "Fazer site" do hub (ficha da empresa ou URL colada na aba Fazer site).
// O pedido fica na própria empresa, no campo pedidoSite, e ela entra na fila de desenvolvimento (triagem "fazer", status "produzir"):
//   pedidoSite = { estado: "fila" | "producao" | "pronto" | "cancelado", em, origem: "hub", obs?, quem?: "claude" | "linha", versoes?: [{nome, url}] }
// Quem faz o site (thread do Claude ou a linha de produção) muda o estado direto no D1; ver docs/pedidos-de-site.md.
//   GET  /api/empresas/_pedidos                     -> { pedidos: [{id, lista, nome, site, status, reserva, pedidoSite}] }
//   POST /api/empresas/_pedidos {id, obs?}          -> pede o site de uma empresa que já está no canvas
//   POST /api/empresas/_pedidos {url, nome?, obs?}  -> acha a empresa pelo domínio em qualquer lista ou cria em "Minhas empresas"
//   POST /api/empresas/_pedidos {id, cancelar:true} -> tira da fila (só se ainda não começou)
export const dominio = s => String(s || '').trim().toLowerCase().replace(/^[a-z]+:\/\//, '').replace(/^www\./, '').split(/[/?#]/)[0].replace(/:\d+$/, '');
const nomeDoDominio = d => d.split('.')[0].replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

export async function mudar(db, id, fn) {
  for (let i = 0; i < 5; i++) {
    const row = await db.prepare('SELECT doc, versao FROM empresas WHERE id = ? AND apagado = 0').bind(id).first();
    if (!row) return null;
    const doc = fn(JSON.parse(row.doc));
    const r = await db.prepare('UPDATE empresas SET doc = ?, lista = ?, versao = versao + 1, atualizado = ? WHERE id = ? AND versao = ?')
      .bind(JSON.stringify(doc), String(doc.lista || 'minhas'), Date.now(), id, row.versao).run();
    if (r.meta.changes) return doc;
  }
  throw new Error('conflito');
}

function pedir(doc, obs) {
  const p = doc.pedidoSite;
  if (p && (p.estado === 'fila' || p.estado === 'producao')) return doc; // já pedido: não duplica
  const agora = Date.now();
  return {
    ...doc,
    triagem: 'fazer',
    status: !doc.status || doc.status === 'novo' || doc.status === 'produzir' ? 'produzir' : doc.status,
    pedidoSite: { estado: 'fila', em: new Date(agora).toISOString(), origem: 'hub', ...(obs ? { obs } : {}) },
    atualizadoEm: agora,
  };
}

const resumo = (id, d) => ({ id, lista: d.lista, nome: d.nome, site: d.site || '', status: d.status || 'novo', reserva: !!d.reserva, pedidoSite: d.pedidoSite });

async function pedidos(request, db) {
  if (request.method === 'GET') {
    const { results } = await db.prepare(`SELECT id, doc FROM empresas WHERE apagado = 0 AND lista <> '_prints' AND json_extract(doc, '$.pedidoSite.estado') IS NOT NULL
      ORDER BY json_extract(doc, '$.pedidoSite.em') DESC LIMIT 300`).all();
    return json({ pedidos: results.map(r => resumo(r.id, JSON.parse(r.doc))) });
  }
  if (request.method !== 'POST') return erro('invalid_argument', 'método não suportado', 405);
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return erro('invalid_argument', 'envie JSON', 400);
  const obs = String(body.obs || '').trim().slice(0, 2000);
  let id = typeof body.id === 'string' && body.id && !body.id.includes('/') ? body.id : null;

  try {
    if (id && body.cancelar) {
      const doc = await mudar(db, id, d => d.pedidoSite?.estado === 'fila' ? { ...d, status: d.status === 'produzir' ? 'novo' : d.status, pedidoSite: { ...d.pedidoSite, estado: 'cancelado', canceladoEm: new Date().toISOString() } } : d);
      if (!doc) return erro('not_found', 'Empresa não encontrada', 404);
      return json({ pedido: resumo(id, doc) });
    }
    if (!id) {
      const dom = dominio(body.url);
      if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(dom)) return erro('invalid_argument', 'Cole o endereço do site, por exemplo empresa.com.br', 400);
      // A empresa pode já estar em alguma lista do canvas: procura pelo domínio para não criar repetida.
      const { results } = await db.prepare(`SELECT id, doc FROM empresas WHERE apagado = 0 AND lista <> '_prints' AND lower(json_extract(doc, '$.site')) LIKE ?`)
        .bind('%' + dom + '%').all();
      const achada = results.find(r => dominio(JSON.parse(r.doc).site) === dom);
      if (achada) id = achada.id;
      else {
        const agora = Date.now();
        id = 'site-' + agora.toString(36) + Math.random().toString(36).slice(2, 6);
        const site = /^https?:\/\//i.test(String(body.url).trim()) ? String(body.url).trim() : 'https://' + dom;
        const nome = String(body.nome || '').trim().slice(0, 200) || nomeDoDominio(dom);
        const doc = pedir({ nome, site, lista: 'minhas', status: 'novo', contato: {}, notas: obs, criadoEm: agora }, obs);
        await db.prepare('INSERT INTO empresas (id, lista, doc, versao, atualizado, apagado) VALUES (?, ?, ?, 1, ?, 0)')
          .bind(id, 'minhas', JSON.stringify(doc), agora).run();
        return json({ pedido: resumo(id, doc), nova: true });
      }
    }
    const doc = await mudar(db, id, d => pedir(d, obs));
    if (!doc) return erro('not_found', 'Empresa não encontrada', 404);
    return json({ pedido: resumo(id, doc) });
  } catch (e) {
    return erro('conflito', 'A empresa mudou várias vezes seguidas; tente de novo', 409);
  }
}
