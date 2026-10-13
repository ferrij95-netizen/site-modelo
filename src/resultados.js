// Painel de resultado do hub (hub.overtus.com.br/resultados/): números de toda a base de prospecção (D1 "prospeccao").
// GET /api/resultados -> { agora, listas:{<lista>:{contagens}}, andamento:[...], custos:[...] }
// Só lê. As contagens saem dos campos que o canvas já grava (status, triagem, proposta.escolhida, ligacoes)
// e do custo que a linha de produção deixa na empresa (custo.usd, gravado por linha/hub.mjs devolver).
//
// Ligações: enquanto não houver registro de cada ligação, a etapa diz o que aconteceu:
//   ligada   = passou de "ligar" (link enviado, proposta, em conversa, fechado ou perdido)
//   atendeu  = link enviado, proposta, em conversa ou fechado
// Se a empresa tiver ligacoes:[{em, resultado}] (resultado "atendeu", "nao_atendeu", "numero_errado"...), vale o registro.

const json = (v, status = 200) => new Response(JSON.stringify(v), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
});

const LIGADA = new Set(['enviado', 'proposta', 'conversa', 'fechado', 'perdido']);
const ATENDEU = new Set(['enviado', 'proposta', 'conversa', 'fechado']);
const PROPOSTA = new Set(['proposta', 'conversa', 'fechado']);
const NAO_ATENDEU = new Set(['nao_atendeu', 'numero_errado', 'caixa_postal', 'ocupado']);

export async function resultados(request, env) {
  const db = env.PROSPECCAO;
  if (!db) return json({ code: 'sem_banco', erro: 'Banco de prospecção não configurado' }, 500);
  if (request.method !== 'GET') return json({ code: 'invalid_argument', erro: 'só GET' }, 405);

  const { results } = await db.prepare(`SELECT id, lista,
      json_extract(doc,'$.nome') AS nome, json_extract(doc,'$.status') AS status, json_extract(doc,'$.triagem') AS triagem,
      json_extract(doc,'$.reserva') AS reserva, json_extract(doc,'$.proposta.escolhida') AS escolhida,
      json_extract(doc,'$.custo.usd') AS usd, json_extract(doc,'$.custo.reais') AS reais,
      json_extract(doc,'$.linha.pronto') AS pronto, json_extract(doc,'$.linha.sub') AS sub,
      json_extract(doc,'$.ligacoes') AS ligacoes
    FROM empresas WHERE apagado = 0 AND lista NOT LIKE '\\_%' ESCAPE '\\'`).all();

  const listas = {}, andamento = [], custos = [];
  for (const r of results) {
    if (r.reserva === 1 || r.reserva === true) continue;
    const c = listas[r.lista] ||= { empresas: 0, triadas: 0, aprovadas: 0, descartadas: 0, prontos: 0, ligadas: 0, atenderam: 0, propostas: 0, escolheram: 0, fechados: 0, perdidos: 0, status: {} };
    const st = r.status || 'novo';
    c.empresas++;
    c.status[st] = (c.status[st] || 0) + 1;
    if (r.triagem) c.triadas++;
    if (r.triagem === 'fazer') c.aprovadas++;
    if (r.triagem === 'descartar') c.descartadas++;
    if (r.pronto || ['ligar', ...LIGADA].includes(st)) c.prontos++;
    let lig = [];
    try { lig = r.ligacoes ? JSON.parse(r.ligacoes) : []; } catch { lig = []; }
    const registro = Array.isArray(lig) && lig.length > 0;
    if (registro || LIGADA.has(st)) c.ligadas++;
    if ((registro && lig.some(l => l && l.resultado && !NAO_ATENDEU.has(l.resultado))) || ATENDEU.has(st)) c.atenderam++;
    if (PROPOSTA.has(st) || r.escolhida) c.propostas++;
    if (r.escolhida) c.escolheram++;
    if (st === 'fechado') c.fechados++;
    if (st === 'perdido') c.perdidos++;
    if (PROPOSTA.has(st)) andamento.push({ id: r.id, lista: r.lista, nome: r.nome || r.id, status: st, escolhida: r.escolhida || '' });
    if (typeof r.usd === 'number' || typeof r.reais === 'number') custos.push({ id: r.id, lista: r.lista, nome: r.nome || r.id, sub: r.sub || '', usd: r.usd ?? null, reais: r.reais ?? null, pronto: r.pronto || '' });
  }
  return json({ agora: Date.now(), listas, andamento, custos });
}
