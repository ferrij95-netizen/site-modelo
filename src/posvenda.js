// Pós-venda do hub: empresas que viraram clientes (status "fechado"), de todas as listas do canvas.
// GET /api/posvenda -> { docs: [...] } com só os campos que o bloco "Pós-venda" usa (hub/inicio/posvenda.js).
// As tarefas (contrato, entrada, domínio, publicação, e-mail, entrega, indicação) ficam no próprio registro,
// em posVenda.tarefas.<chave> = { feito, em, nota }, gravadas pela página com /api/empresas/<id>.

const CAMPOS = `id, lista,
  json_extract(doc, '$.nome') AS nome, json_extract(doc, '$.cidade') AS cidade, json_extract(doc, '$.site') AS site,
  json_extract(doc, '$.statusEm') AS statusEm, json_extract(doc, '$.atualizadoEm') AS atualizadoEm,
  json_extract(doc, '$.posVenda') AS posVenda, json_extract(doc, '$.proposta') AS proposta,
  json_extract(doc, '$.contato.nome') AS responsavel, json_extract(doc, '$.reserva') AS reserva`;

export async function posvenda(request, env) {
  const db = env.PROSPECCAO;
  if (!db) return json({ code: 'sem_banco', erro: 'Banco de prospecção não configurado' }, 500);
  if (request.method !== 'GET') return json({ code: 'invalid_argument', erro: 'método não suportado' }, 405);
  const { results } = await db.prepare(`SELECT ${CAMPOS} FROM empresas
    WHERE apagado = 0 AND lista NOT LIKE '\\_%' ESCAPE '\\'
      AND json_extract(doc, '$.status') = 'fechado'
    LIMIT 1000`).all();
  const obj = s => { try { const v = JSON.parse(s); return v && typeof v === 'object' ? v : {}; } catch { return {}; } };
  const docs = results.map(r => {
    const p = obj(r.proposta);
    return {
      id: r.id, lista: r.lista, nome: r.nome || '', cidade: r.cidade || '', site: r.site || '',
      statusEm: r.statusEm || null, atualizadoEm: r.atualizadoEm || null, reserva: !!r.reserva,
      contato: { nome: r.responsavel || '' },
      proposta: { urlA: p.urlA || '', urlB: p.urlB || '', escolhida: p.escolhida || '' },
      posVenda: obj(r.posVenda),
    };
  });
  return json({ docs });
}

const json = (v, status = 200) => new Response(JSON.stringify(v), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
});
