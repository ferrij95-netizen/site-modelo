// API do hub para agentes (qualquer IA ou programa, não só o Claude): as mesmas rotas /api/* que as páginas do hub usam,
// liberadas com uma chave em vez do login. Guia para o agente: docs/api-do-hub.md e GET /api/openapi.json (público).
//
// Chave: segredo HUB_API_KEY do worker no Cloudflare (Workers > site-modelo > Settings > Variables and Secrets).
// Pode ter várias chaves separadas por vírgula, uma por agente, para tirar uma sem mexer nas outras.
// O agente manda "Authorization: Bearer <chave>" (ou "X-API-Key: <chave>"). A chave nunca vai para o repositório.
// Com chave o agente não usa /api/email/ (mandar e-mail não tem volta): isso continua só com o login do João.
//
// Rotas novas, só para agentes (as outras estão em prospeccao.js, lembretes.js, posvenda.js, resultados.js):
//   GET /api/                -> guia curto em JSON (público)
//   GET /api/openapi.json    -> especificação OpenAPI 3 (pública, sem dados)
//   GET /api/eu              -> confere se a chave funciona
//   GET /api/busca?q=&lista=&status=&limite=  -> procura empresas em todas as listas por nome, site, cidade ou segmento
//   GET /api/listas          -> listas do canvas com quantas empresas cada uma tem
//   GET /api/sites?setor=&q= -> sites de clientes publicados (gerado no build por scripts/hub.mjs em /_hub/sites.json)
// Ações (gravam no D1 do mesmo jeito que os botões do hub, para o canvas mostrar igual):
//   POST /api/acoes/criar     {nome, site, lista?, ...}       -> cria uma empresa, se não houver outra com o mesmo domínio ou telefone
//   POST /api/acoes/importar  {lista, empresas:[...], reserva?} -> lote (ex.: Prospector), mesma checagem de duplicata
//   POST /api/acoes/triagem   {id, triagem, motivo?}          -> fazer | talvez | descartar | "" (limpa)
//   POST /api/acoes/contato   {id, resultado, nota?, proxAcao?, proxData?, status?} -> registra contato e o próximo passo
//   POST /api/acoes/etapa     {id, status, motivo?}           -> muda a etapa de venda

import { dominio, mudar } from './prospeccao.js';

const json = (v, status = 200) => new Response(JSON.stringify(v, null, 1), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
});
const erro = (code, msg, status) => json({ code, erro: msg }, status);

async function sha256(texto) {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// Chave enviada pelo agente, ou null se ele não mandou nenhuma (aí vale o login normal do hub).
export function chaveEnviada(request) {
  const auth = request.headers.get('Authorization') || '';
  const m = auth.match(/^Bearer\s+(\S+)$/i);
  return m ? m[1] : (request.headers.get('X-API-Key') || '').trim() || null;
}

// Compara pelo hash para não vazar a chave pelo tempo de resposta.
export async function chaveValida(chave, env) {
  const chaves = String(env.HUB_API_KEY || '').split(/[\s,]+/).filter(k => k.length >= 20);
  if (!chave || !chaves.length) return false;
  const h = await sha256(chave);
  for (const k of chaves) if ((await sha256(k)) === h) return true;
  return false;
}

export const publicoApi = url => url.pathname === '/api' || url.pathname === '/api/' || url.pathname === '/api/openapi.json';

const STATUS = ['novo', 'produzir', 'ligar', 'enviado', 'proposta', 'conversa', 'fechado', 'perdido'];

export async function api(request, env, url) {
  const p = url.pathname.replace(/\/$/, '');
  if (p === '/api') return json(GUIA);
  if (p === '/api/openapi.json') return json(openapi(url.origin));
  if (p.startsWith('/api/acoes/')) return acoes(request, env, p.slice('/api/acoes/'.length));
  if (request.method !== 'GET') return erro('invalid_argument', 'método não suportado', 405);
  if (p === '/api/eu') return json({ ok: true, hub: url.origin });

  if (p === '/api/sites') {
    const res = await env.ASSETS.fetch(new Request(new URL('/_hub/sites.json', url)));
    let sites = res.ok ? await res.json() : [];
    const setor = url.searchParams.get('setor');
    const q = (url.searchParams.get('q') || '').trim().toLowerCase();
    if (setor) sites = sites.filter(s => s.setor === setor);
    if (q) sites = sites.filter(s => `${s.slug} ${s.nome} ${s.cidade}`.toLowerCase().includes(q));
    return json({ total: sites.length, sites });
  }

  const db = env.PROSPECCAO;
  if (!db) return erro('sem_banco', 'Banco de prospecção não configurado', 500);

  if (p === '/api/listas') {
    const { results } = await db.prepare(`SELECT lista, COUNT(*) AS empresas, SUM(CASE WHEN json_extract(doc, '$.reserva') THEN 1 ELSE 0 END) AS reservas
      FROM empresas WHERE apagado = 0 AND lista NOT LIKE '\\_%' ESCAPE '\\' GROUP BY lista ORDER BY lista`).all();
    return json({ listas: results });
  }

  if (p === '/api/busca') {
    const q = (url.searchParams.get('q') || '').trim().toLowerCase();
    const lista = url.searchParams.get('lista');
    const status = url.searchParams.get('status');
    const limite = Math.min(Math.max(Number(url.searchParams.get('limite')) || 50, 1), 200);
    if (!q && !lista && !status) return erro('invalid_argument', 'mande q, lista ou status', 400);
    const onde = [`apagado = 0`, `lista NOT LIKE '\\_%' ESCAPE '\\'`];
    const args = [];
    if (q) {
      onde.push(`(lower(json_extract(doc, '$.nome')) LIKE ?1 OR lower(json_extract(doc, '$.site')) LIKE ?1
        OR lower(json_extract(doc, '$.cidade')) LIKE ?1 OR lower(json_extract(doc, '$.segmento')) LIKE ?1 OR id = ?2)`);
      args.push('%' + q.replace(/[%_]/g, '') + '%', q);
    }
    if (lista) { onde.push(`lista = ?${args.length + 1}`); args.push(lista); }
    if (status) { onde.push(`coalesce(json_extract(doc, '$.status'), 'novo') = ?${args.length + 1}`); args.push(status); }
    const { results } = await db.prepare(`SELECT id, lista, versao,
        json_extract(doc, '$.nome') AS nome, json_extract(doc, '$.site') AS site, json_extract(doc, '$.cidade') AS cidade,
        json_extract(doc, '$.segmento') AS segmento, coalesce(json_extract(doc, '$.status'), 'novo') AS status,
        json_extract(doc, '$.triagem') AS triagem, json_extract(doc, '$.proxData') AS proxData,
        json_extract(doc, '$.reserva') AS reserva, json_extract(doc, '$.pedidoSite.estado') AS pedidoSite
      FROM empresas WHERE ${onde.join(' AND ')} ORDER BY atualizado DESC LIMIT ${limite}`).bind(...args).all();
    return json({ total: results.length, empresas: results.map(r => ({ ...r, reserva: !!r.reserva })) });
  }

  return erro('not_found', 'rota não existe; veja GET /api/openapi.json', 404);
}

// ---------- ações ----------
const TRIAGEM = ['fazer', 'talvez', 'descartar', ''];
// Os mesmos resultados do registro de contato do hub (hub/inicio/lembretes.js RESULTADOS):
// [rótulo no histórico, status novo (fn do atual), dias até o próximo contato, resultado gravado em ligacoes]
const RESULTADOS = {
  conversou: ['Conversamos', s => (s === 'proposta' ? 'proposta' : 'conversa'), 3, 'Retornar a conversa', 'atendeu'],
  naoatendeu: ['Não atendeu', s => (['novo', 'produzir', ''].includes(s) ? 'ligar' : s), 1, 'Tentar de novo', 'nao_atendeu'],
  retornar: ['Pediu para retornar', s => (s === 'novo' ? 'ligar' : s), 2, 'Retorno combinado', 'atendeu'],
  mensagem: ['Mandei mensagem', s => (['novo', 'produzir', 'ligar', ''].includes(s) ? 'enviado' : s), 3, 'Ver se respondeu', ''],
  follow: ['Mandei o follow-up', s => s, null, '', ''],
  proposta: ['Mandei a proposta', () => 'proposta', null, '', ''],
  fechou: ['Fechou', () => 'fechado', null, '', ''],
  perdido: ['Sem interesse', () => 'perdido', null, '', ''],
  numeroerrado: ['Número errado', s => s, null, '', 'numero_errado'],
};

// Data e "dd/mm" no fuso do João.
const hojeSP = (mais = 0) => new Date(Date.now() - 3 * 3600e3 + mais * 86400e3).toISOString().slice(0, 10);
const ddmm = () => { const d = hojeSP(); return `${d.slice(8, 10)}/${d.slice(5, 7)}`; };
// Linha no histórico de contato da ficha (o mesmo campo que o hub mostra), mais nova em cima.
const historico = (d, texto) => {
  const h = String(d.contato?.historico || '').trim();
  const linha = `${ddmm()}: ${texto}`;
  return { ...(d.contato || {}), historico: h ? linha + '\n' + h : linha };
};
const fone = s => String(s || '').replace(/\D/g, '').slice(-10);
const texto = (v, n = 2000) => String(v ?? '').trim().slice(0, n);

// Chaves de duplicata de todas as empresas (domínio do site e últimos 10 dígitos do telefone), de todas as listas.
async function indiceDuplicatas(db) {
  const { results } = await db.prepare(`SELECT id, lista, json_extract(doc, '$.nome') AS nome, json_extract(doc, '$.site') AS site,
      json_extract(doc, '$.contato.telefone') AS tel, json_extract(doc, '$.extra.whatsapp') AS wa
    FROM empresas WHERE apagado = 0 AND lista NOT LIKE '\\_%' ESCAPE '\\'`).all();
  const mapa = new Map();
  for (const r of results) for (const k of chaves(r.site, r.tel, r.wa)) if (!mapa.has(k)) mapa.set(k, { id: r.id, lista: r.lista, nome: r.nome });
  return mapa;
}
function chaves(site, ...tels) {
  const out = [];
  const dom = dominio(site);
  // Sites de rede social ou de diretório não identificam a empresa.
  if (/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(dom) && !/(^|\.)(instagram|facebook|linktr|wa|whatsapp|google|goo|youtube|linkedin)\.[a-z.]+$/.test(dom)) out.push('d:' + dom);
  for (const t of tels) if (fone(t).length >= 10) out.push('t:' + fone(t));
  return out;
}
const novaEmpresa = (e, lista, agora, reserva) => {
  const doc = { ...e, lista, status: STATUS.includes(e.status) ? e.status : 'novo', contato: objeto(e.contato) ? e.contato : {}, criadoEm: agora, atualizadoEm: agora };
  if (reserva) doc.reserva = true;
  delete doc.id; delete doc.versao;
  return doc;
};
const objeto = v => v && typeof v === 'object' && !Array.isArray(v);
const novoId = lista => `${lista.replace(/[^a-z0-9-]/gi, '').slice(0, 30) || 'emp'}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

async function acoes(request, env, acao) {
  if (request.method !== 'POST') return erro('invalid_argument', 'use POST com JSON', 405);
  const db = env.PROSPECCAO;
  if (!db) return erro('sem_banco', 'Banco de prospecção não configurado', 500);
  const b = await request.json().catch(() => null);
  if (!objeto(b)) return erro('invalid_argument', 'envie um objeto JSON', 400);

  if (acao === 'criar' || acao === 'importar') {
    const lista = texto(b.lista || (acao === 'criar' ? 'minhas' : ''), 60);
    if (!lista || lista.startsWith('_')) return erro('invalid_argument', 'diga a lista (ver GET /api/listas)', 400);
    const entrada = acao === 'criar' ? [b] : b.empresas;
    if (!Array.isArray(entrada) || !entrada.length || entrada.length > 500) return erro('invalid_argument', 'empresas: lista com 1 a 500 empresas', 400);
    const mapa = await indiceDuplicatas(db);
    const agora = Date.now();
    const criadas = [], duplicadas = [], invalidas = [], st = [];
    entrada.forEach((e, i) => {
      if (!objeto(e) || !texto(e.nome)) return invalidas.push({ indice: i, erro: 'falta nome' });
      const ks = chaves(e.site, e.contato?.telefone, e.extra?.whatsapp);
      const dup = ks.map(k => mapa.get(k)).find(Boolean);
      if (dup) return duplicadas.push({ indice: i, nome: e.nome, ...(dup.novo ? { repetidaNoLote: dup.indice } : { existente: dup }) });
      const id = novoId(lista);
      const doc = novaEmpresa(e, lista, agora, acao === 'importar' && b.reserva);
      for (const k of ks) mapa.set(k, { novo: true, indice: i });
      st.push(db.prepare('INSERT INTO empresas (id, lista, doc, versao, atualizado, apagado) VALUES (?, ?, ?, 1, ?, 0)').bind(id, lista, JSON.stringify(doc), agora));
      criadas.push({ indice: i, id, nome: doc.nome });
    });
    for (let i = 0; i < st.length; i += 100) await db.batch(st.slice(i, i + 100));
    if (acao === 'criar') {
      if (invalidas.length) return erro('invalid_argument', 'falta nome', 400);
      return duplicadas.length ? json({ criada: false, duplicata: duplicadas[0].existente }, 409) : json({ criada: true, id: criadas[0].id });
    }
    return json({ lista, criadas, duplicadas, invalidas });
  }

  const id = typeof b.id === 'string' && b.id && !b.id.includes('/') ? b.id : null;
  if (!id) return erro('invalid_argument', 'falta id da empresa', 400);
  let fn;

  if (acao === 'triagem') {
    const t = b.triagem == null ? '' : String(b.triagem);
    if (!TRIAGEM.includes(t)) return erro('invalid_argument', 'triagem: fazer, talvez, descartar ou "" para limpar', 400);
    const motivo = texto(b.motivo, 500);
    fn = d => {
      const out = { ...d, triagem: t, triagemEm: Date.now(), atualizadoEm: Date.now() };
      if (motivo) out.triagemMotivo = motivo; else delete out.triagemMotivo;
      if (t === 'fazer' && (!d.status || d.status === 'novo')) out.status = 'produzir';
      if (t) out.contato = historico(d, `Triagem: ${t}${motivo ? ' (' + motivo + ')' : ''}`);
      return out;
    };
  } else if (acao === 'contato') {
    const r = RESULTADOS[b.resultado];
    if (!r) return erro('invalid_argument', 'resultado: ' + Object.keys(RESULTADOS).join(', '), 400);
    if (b.status != null && !STATUS.includes(b.status)) return erro('invalid_argument', 'status inválido', 400);
    if (b.proxData && !/^\d{4}-\d{2}-\d{2}$/.test(b.proxData)) return erro('invalid_argument', 'proxData no formato AAAA-MM-DD', 400);
    fn = d => {
      const agora = Date.now();
      const atual = d.status || 'novo';
      const status = b.status || r[1](atual);
      // Sem data enviada vale o padrão do hub para esse resultado (fechado, perdido e proposta ficam sem data).
      const proxData = b.proxData !== undefined ? String(b.proxData || '') : (r[2] != null ? hojeSP(r[2]) : '');
      const out = { ...d, contatoEm: agora, atualizadoEm: agora, proxData, proxAcao: proxData ? texto(b.proxAcao, 300) || r[3] : texto(b.proxAcao, 300) };
      if (status !== atual) { out.status = status; out.statusEm = agora; }
      if (b.resultado === 'proposta' || out.status === 'proposta' && atual !== 'proposta') {
        out.proposta = { ...(d.proposta || {}), enviadaEm: agora }; out.seguimento = { ...(d.seguimento || {}), f1: null, f2: null };
      }
      if (b.resultado === 'follow') {
        const s = d.seguimento || {};
        out.seguimento = { ...s, [s.f1 ? 'f2' : 'f1']: agora };
      }
      if (r[4]) out.ligacoes = [...(Array.isArray(d.ligacoes) ? d.ligacoes : []), { em: agora, resultado: r[4] }];
      out.contato = historico(d, [r[0] + (b.canal ? ' por ' + texto(b.canal, 40) : ''), texto(b.nota)].filter(Boolean).join(': '));
      return out;
    };
  } else if (acao === 'etapa') {
    if (!STATUS.includes(b.status)) return erro('invalid_argument', 'status: ' + STATUS.join(', '), 400);
    const motivo = texto(b.motivo, 500);
    fn = d => {
      const agora = Date.now();
      const out = { ...d, status: b.status, statusEm: agora, atualizadoEm: agora };
      if (b.status === 'proposta' && d.status !== 'proposta') { out.proposta = { ...(d.proposta || {}), enviadaEm: agora }; out.seguimento = { ...(d.seguimento || {}), f1: null, f2: null }; }
      if (motivo) out.motivoEtapa = motivo;
      out.contato = historico(d, `Etapa: ${b.status}${motivo ? ' (' + motivo + ')' : ''}`);
      return out;
    };
  } else return erro('not_found', 'ação não existe: criar, importar, triagem, contato ou etapa', 404);

  try {
    const doc = await mudar(db, id, fn);
    if (!doc) return erro('not_found', 'Empresa não encontrada', 404);
    return json({ ok: true, doc: { id, ...doc } });
  } catch {
    return erro('conflito', 'A empresa mudou várias vezes seguidas; tente de novo', 409);
  }
}

const GUIA = {
  nome: 'API do Overtus Hub',
  autenticacao: 'Header "Authorization: Bearer <chave>" (ou "X-API-Key: <chave>"). Peça a chave ao João.',
  especificacao: '/api/openapi.json',
  comece_por: ['GET /api/eu', 'GET /api/listas', 'GET /api/busca?q=<nome>', 'GET /api/empresas/<id>'],
  acoes: ['POST /api/acoes/criar', 'POST /api/acoes/importar', 'POST /api/acoes/triagem', 'POST /api/acoes/contato', 'POST /api/acoes/etapa'],
  regras: [
    'Prefira as rotas /api/acoes/: elas gravam do mesmo jeito que os botões do hub (histórico, datas, contagem de ligações).',
    'Para mudar uma empresa use POST /api/empresas/<id> com {"op":"update","data":{...}}: só os campos enviados mudam.',
    'Mande sempre "atualizadoEm": <ms agora> junto, como o hub faz.',
    'Não use op "set" (troca o registro inteiro) a não ser para criar uma empresa nova.',
    'Apagar só marca como apagado; dá para recuperar.',
    'E-mail (/api/email/) não está liberado para agentes.',
  ],
};

function openapi(origem) {
  const ref = n => ({ $ref: `#/components/schemas/${n}` });
  const ok = (desc, schema) => ({ 200: { description: desc, content: { 'application/json': { schema } } } });
  const q = (name, description, extra = {}) => ({ name, in: 'query', required: false, description, schema: { type: 'string', ...extra } });
  const idPath = { name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'id da empresa (ex.: agro-012, site-mabc123)' };
  return {
    openapi: '3.0.3',
    info: {
      title: 'Overtus Hub API',
      version: '1.0.0',
      description: 'Dados do hub da Overtus (hub.overtus.com.br): canvas de prospecção (empresas em listas, status de venda, triagem, '
        + 'lembretes, pós-venda), pedidos de site ("Fazer site") e sites de clientes publicados. Respostas em JSON, textos em português. '
        + 'Toda rota, menos / e /openapi.json, pede a chave no header Authorization: Bearer <chave>.',
    },
    servers: [{ url: origem + '/api' }],
    security: [{ chave: [] }],
    paths: {
      '/eu': { get: { summary: 'Confere se a chave funciona', responses: ok('Chave aceita', { type: 'object' }) } },
      '/listas': { get: { summary: 'Listas do canvas e quantas empresas cada uma tem', responses: ok('Listas', { type: 'object', properties: { listas: { type: 'array', items: { type: 'object', properties: { lista: { type: 'string' }, empresas: { type: 'integer' }, reservas: { type: 'integer' } } } } } }) } },
      '/busca': {
        get: {
          summary: 'Procura empresas em todas as listas (resumo de cada uma)',
          description: 'Pelo menos um filtro. q procura em nome, site, cidade e segmento. Para ver o registro inteiro use GET /empresas/{id}.',
          parameters: [q('q', 'texto a procurar'), q('lista', 'chave da lista (ver /listas)'), q('status', 'status de venda', { enum: STATUS }),
            { name: 'limite', in: 'query', required: false, schema: { type: 'integer', default: 50, maximum: 200 } }],
          responses: ok('Empresas encontradas, mais recentes primeiro', { type: 'object', properties: { total: { type: 'integer' }, empresas: { type: 'array', items: ref('Resumo') } } }),
        },
      },
      '/empresas': {
        get: {
          summary: 'Todas as empresas de uma lista (registro completo)',
          parameters: [{ ...q('lista', 'chave da lista'), required: true }, { name: 'desde', in: 'query', required: false, schema: { type: 'integer' }, description: 'só o que mudou depois deste instante (ms); use o "agora" da resposta anterior' }],
          responses: ok('Empresas', { type: 'object', properties: { agora: { type: 'integer' }, docs: { type: 'array', items: ref('Empresa') }, apagados: { type: 'array', items: { type: 'string' } } } }),
        },
      },
      '/empresas/{id}': {
        get: { summary: 'Uma empresa', parameters: [idPath], responses: ok('Empresa, ou doc null se não existe', { type: 'object', properties: { doc: ref('Empresa') } }) },
        post: {
          summary: 'Cria, muda ou apaga uma empresa',
          description: 'op "update": mescla os campos enviados (objetos em profundidade, listas trocadas inteiras, {"__delete__":true} remove o campo). '
            + 'op "set": cria ou substitui o registro inteiro (para criar uma empresa nova, com id novo e lista). op "delete": marca como apagada.',
          parameters: [idPath],
          requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['op'], properties: { op: { type: 'string', enum: ['update', 'set', 'delete'] }, data: ref('Empresa') } },
            example: { op: 'update', data: { status: 'ligar', proxData: '2026-11-03', proxAcao: 'Ligar para o dono', atualizadoEm: 1793500000000 } } } } },
          responses: { ...ok('Registro depois da mudança', { type: 'object', properties: { doc: ref('Empresa') } }), 404: { description: 'Empresa não encontrada' }, 409: { description: 'Conflito; tente de novo' } },
        },
      },
      '/empresas/_pedidos': {
        get: { summary: 'Pedidos de site (aba Fazer site), mais novos primeiro', responses: ok('Pedidos', { type: 'object', properties: { pedidos: { type: 'array', items: ref('Resumo') } } }) },
        post: {
          summary: 'Pede um site (ou cancela um pedido na fila)',
          description: 'Mande {id} de uma empresa do canvas, ou {url, nome?} do site atual (acha a empresa pelo domínio ou cria em "minhas"). {id, cancelar:true} tira da fila.',
          requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { id: { type: 'string' }, url: { type: 'string' }, nome: { type: 'string' }, obs: { type: 'string' }, cancelar: { type: 'boolean' } } } } } },
          responses: ok('Pedido', { type: 'object', properties: { pedido: ref('Resumo'), nova: { type: 'boolean' } } }),
        },
      },
      '/empresas/_lote': {
        post: {
          summary: 'Importa várias empresas de uma vez',
          description: 'Corpo {"<id>": {empresa}, ...}. Só cria as que ainda não existem (rodar de novo não estraga nada). Até umas 500 por chamada.',
          requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: ref('Empresa') } } } },
          responses: ok('Quantas chegaram e quantas foram criadas', { type: 'object', properties: { recebidos: { type: 'integer' }, criados: { type: 'integer' } } }),
        },
      },
      '/acoes/criar': {
        post: {
          summary: 'Cria uma empresa, checando duplicata pelo domínio do site e pelo telefone em todas as listas',
          requestBody: { required: true, content: { 'application/json': { schema: ref('Empresa'), example: { nome: 'Metalúrgica Exemplo', site: 'metalexemplo.com.br', lista: 'minhas', cidade: 'Caxias do Sul, RS', segmento: 'Metalurgia', contato: { telefone: '(54) 3333-0000' } } } } },
          responses: { 200: { description: '{criada:true, id}' }, 409: { description: '{criada:false, duplicata:{id, lista, nome}}: já existe, nada foi criado' } },
        },
      },
      '/acoes/importar': {
        post: {
          summary: 'Importa um lote (ex.: Prospector) para uma lista, pulando duplicatas',
          description: 'Até 500 empresas por chamada. Duplicata = mesmo domínio de site ou mesmos 10 últimos dígitos de telefone, contra todas as listas e dentro do próprio lote. reserva:true importa como reserva (escondida no canvas).',
          requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['lista', 'empresas'], properties: { lista: { type: 'string' }, reserva: { type: 'boolean' }, empresas: { type: 'array', items: ref('Empresa') } } } } } },
          responses: ok('O que foi criado e o que foi pulado', { type: 'object', properties: { lista: { type: 'string' }, criadas: { type: 'array', items: { type: 'object' } }, duplicadas: { type: 'array', items: { type: 'object' } }, invalidas: { type: 'array', items: { type: 'object' } } } }),
        },
      },
      '/acoes/triagem': {
        post: {
          summary: 'Marca a triagem (fazer, talvez, descartar ou "" para limpar), com motivo',
          description: '"fazer" numa empresa nova já põe o status em "produzir" (fila de preview), como o botão do hub. Grava triagemMotivo e uma linha no histórico.',
          requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['id', 'triagem'], properties: { id: { type: 'string' }, triagem: { type: 'string', enum: ['fazer', 'talvez', 'descartar', ''] }, motivo: { type: 'string' } } }, example: { id: 'agro-012', triagem: 'descartar', motivo: 'Site novo, feito em 2025' } } } },
          responses: ok('Registro depois da mudança', { type: 'object', properties: { ok: { type: 'boolean' }, doc: ref('Empresa') } }),
        },
      },
      '/acoes/contato': {
        post: {
          summary: 'Registra um contato (ligação, mensagem...) e marca o próximo passo e a data',
          description: 'Igual ao "Registrar contato" do hub. resultado: conversou, naoatendeu, retornar, mensagem, follow, proposta, fechou, perdido, numeroerrado. '
            + 'Sem status, a etapa muda como no hub (ex.: naoatendeu numa empresa nova vai para "ligar"; fechou vai para "fechado"). '
            + 'Sem proxData, usa o prazo padrão (conversou +3 dias, naoatendeu +1, retornar +2, mensagem +3); mande proxData:"" para não marcar data. '
            + 'Grava contatoEm, ligacoes[] (para os números de ligação) e uma linha em contato.historico.',
          requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['id', 'resultado'], properties: { id: { type: 'string' }, resultado: { type: 'string', enum: Object.keys(RESULTADOS) }, nota: { type: 'string' }, canal: { type: 'string', description: 'whatsapp, e-mail, telefone...' }, proxAcao: { type: 'string' }, proxData: { type: 'string', description: 'AAAA-MM-DD' }, status: { type: 'string', enum: STATUS } } },
            example: { id: 'agro-012', resultado: 'conversou', nota: 'Falei com o dono, gostou da versão A', proxAcao: 'Mandar proposta', proxData: '2026-11-04' } } } },
          responses: ok('Registro depois da mudança', { type: 'object', properties: { ok: { type: 'boolean' }, doc: ref('Empresa') } }),
        },
      },
      '/acoes/etapa': {
        post: {
          summary: 'Muda a etapa de venda (status), com motivo opcional',
          requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', required: ['id', 'status'], properties: { id: { type: 'string' }, status: { type: 'string', enum: STATUS }, motivo: { type: 'string' } } }, example: { id: 'agro-012', status: 'perdido', motivo: 'Já fechou com outra agência' } } } },
          responses: ok('Registro depois da mudança', { type: 'object', properties: { ok: { type: 'boolean' }, doc: ref('Empresa') } }),
        },
      },
      '/lembretes': { get: { summary: 'Quem precisa de retorno (data marcada ou esperando resposta), de todas as listas', responses: ok('Lembretes', { type: 'object' }) } },
      '/posvenda': { get: { summary: 'Clientes fechados e as tarefas de pós-venda de cada um', responses: ok('Pós-venda', { type: 'object' }) } },
      '/resultados': { get: { summary: 'Números da prospecção: contagens por lista, andamento, custos', responses: ok('Resultados', { type: 'object' }) } },
      '/sites': {
        get: {
          summary: 'Sites de clientes publicados em <slug>.overtus.com.br',
          parameters: [q('setor', 'agro, industria, metalmecanica, saude, oficinas, distribuicao, consultoria, construcao...'), q('q', 'texto no nome, slug ou cidade')],
          responses: ok('Sites', { type: 'object', properties: { total: { type: 'integer' }, sites: { type: 'array', items: ref('Site') } } }),
        },
      },
    },
    components: {
      securitySchemes: { chave: { type: 'http', scheme: 'bearer', description: 'Chave do segredo HUB_API_KEY' } },
      schemas: {
        Empresa: {
          type: 'object', additionalProperties: true,
          description: 'Registro livre em JSON; estes são os campos que o hub usa.',
          properties: {
            id: { type: 'string', readOnly: true }, versao: { type: 'integer', readOnly: true },
            nome: { type: 'string' }, site: { type: 'string' }, cidade: { type: 'string' }, segmento: { type: 'string' },
            lista: { type: 'string', description: 'chave da lista (aba do canvas); padrão "minhas"' },
            status: { type: 'string', enum: STATUS, description: 'novo, produzir (fazer preview), ligar, enviado (link enviado), proposta, conversa, fechado, perdido' },
            triagem: { type: 'string', enum: ['fazer', 'talvez', 'descartar'] },
            proxData: { type: 'string', description: 'data do próximo contato, AAAA-MM-DD' }, proxAcao: { type: 'string' },
            notas: { type: 'string' }, reserva: { type: 'boolean', description: 'reserva fica escondida no canvas' },
            contato: { type: 'object', properties: { nome: { type: 'string' }, telefone: { type: 'string' }, email: { type: 'string' }, whatsapp: { type: 'string' } } },
            extra: { type: 'object', description: 'dados da lista de origem (notaGoogle, avaliacoes, notaSite, maps, instagram...)' },
            enr: { type: 'object', description: 'análise da empresa (script de ligação, marca, versões, subdomínio)' },
            proposta: { type: 'object', properties: { urlA: { type: 'string' }, urlB: { type: 'string' }, escolhida: { type: 'string' } } },
            pedidoSite: { type: 'object', description: 'pedido de site: estado fila | producao | pronto | cancelado, em, obs, quem, sub, versoes[{nome,url}]' },
            ligacoes: { type: 'array', items: { type: 'object', properties: { em: { type: 'string' }, resultado: { type: 'string' } } } },
            posVenda: { type: 'object', description: 'posVenda.tarefas.<chave> = {feito, em, nota}' },
            criadoEm: { type: 'integer' }, atualizadoEm: { type: 'integer', description: 'ms; mande Date.now() em toda mudança' },
          },
        },
        Resumo: { type: 'object', properties: { id: { type: 'string' }, lista: { type: 'string' }, nome: { type: 'string' }, site: { type: 'string' }, status: { type: 'string' } }, additionalProperties: true },
        Site: {
          type: 'object', properties: {
            slug: { type: 'string' }, nome: { type: 'string' }, setor: { type: 'string' }, cidade: { type: 'string' },
            url: { type: 'string' }, hub: { type: 'string', description: 'página do site dentro do hub' }, completo: { type: 'boolean' },
            vistas: { type: 'array', items: { type: 'object', properties: { nome: { type: 'string' }, url: { type: 'string' } } } },
          },
        },
      },
    },
  };
}
