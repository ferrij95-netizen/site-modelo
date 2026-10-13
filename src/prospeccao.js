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
