// Lembretes e follow-up do hub: junta, de todas as listas do canvas, quem precisa de retorno.
// GET /api/lembretes -> { docs: [...] } com só os campos que o bloco "Hoje" usa (hub/inicio/lembretes.js).
// Entra quem tem data de retorno marcada ou está esperando resposta (link enviado, proposta, em conversa),
// fora fechados, perdidos, reservas e descartados. Quem é "hoje" ou "atrasado" a página decide, no fuso do João.

const CAMPOS = `id, lista,
  json_extract(doc, '$.nome') AS nome, json_extract(doc, '$.cidade') AS cidade, json_extract(doc, '$.segmento') AS segmento,
  json_extract(doc, '$.site') AS site, json_extract(doc, '$.status') AS status,
  json_extract(doc, '$.proxData') AS proxData, json_extract(doc, '$.proxAcao') AS proxAcao,
  json_extract(doc, '$.statusEm') AS statusEm, json_extract(doc, '$.atualizadoEm') AS atualizadoEm,
  json_extract(doc, '$.contatoEm') AS contatoEm,
  json_extract(doc, '$.contato') AS contato, json_extract(doc, '$.proposta') AS proposta,
  json_extract(doc, '$.extra.whatsapp') AS waExtra, json_extract(doc, '$.extra.email') AS emailExtra,
  json_extract(doc, '$.seguimento') AS seguimento, json_extract(doc, '$.enr.subdominio') AS subdominio,
  json_extract(doc, '$.enr.script.followup') AS followup, json_extract(doc, '$.ligacoes') AS ligacoes`;

export async function lembretes(request, env) {
  const db = env.PROSPECCAO;
  if (!db) return json({ code: 'sem_banco', erro: 'Banco de prospecção não configurado' }, 500);
  if (request.method !== 'GET') return json({ code: 'invalid_argument', erro: 'método não suportado' }, 405);
  const { results } = await db.prepare(`SELECT ${CAMPOS} FROM empresas
    WHERE apagado = 0 AND lista NOT LIKE '\\_%' ESCAPE '\\'
      AND (COALESCE(json_extract(doc, '$.proxData'), '') != '' OR json_extract(doc, '$.status') IN ('enviado', 'proposta', 'conversa'))
      AND COALESCE(json_extract(doc, '$.status'), '') NOT IN ('fechado', 'perdido')
      AND COALESCE(json_extract(doc, '$.reserva'), 0) = 0
      AND COALESCE(json_extract(doc, '$.triagem'), '') != 'descartar'
    LIMIT 2000`).all();
  const obj = s => { try { const v = JSON.parse(s); return v && typeof v === 'object' ? v : {}; } catch { return {}; } };
  const lista = s => { try { const v = JSON.parse(s); return Array.isArray(v) ? v : []; } catch { return []; } };
  const docs = results.map(r => {
    const c = obj(r.contato), p = obj(r.proposta);
    return {
      id: r.id, lista: r.lista, nome: r.nome || '', cidade: r.cidade || '', segmento: r.segmento || '', site: r.site || '',
      status: r.status || 'novo', proxData: r.proxData || '', proxAcao: r.proxAcao || '',
      statusEm: r.statusEm || null, atualizadoEm: r.atualizadoEm || null, contatoEm: r.contatoEm || null,
      contato: { nome: c.nome || '', telefone: c.telefone || '', whatsapp: c.whatsapp || r.waExtra || '', email: c.email || r.emailExtra || '', preview: c.preview || '', historico: c.historico || '' },
      proposta: { urlA: p.urlA || '', urlB: p.urlB || '', escolhida: p.escolhida || '', enviadaEm: p.enviadaEm || null },
      seguimento: obj(r.seguimento),
      subdominio: r.subdominio || '', followup: r.followup || '',
      ligacoes: lista(r.ligacoes),
    };
  });
  return json({ docs });
}

const json = (v, status = 200) => new Response(JSON.stringify(v), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
});
