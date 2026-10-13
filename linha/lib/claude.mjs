// Conversa com a IA. Três modos, todos gravando a resposta no mesmo arquivo, então as etapas não sabem qual foi usado:
//  - direto: chama a API na hora (precisa de ANTHROPIC_API_KEY).
//  - lote:   junta os pedidos de todas as empresas e manda pela Batch API (metade do preço, resposta em até 24 h).
//  - manual: só grava o pedido em disco; alguém (uma sessão do Claude) grava a resposta. Usado nos testes sem chave.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { DADOS, MODELOS, ESFORCO, PRECOS } from '../config.mjs';
import { arq, lerJson, gravarJson, log } from './util.mjs';

export const MODO = process.env.LINHA_MODO || (process.env.ANTHROPIC_API_KEY ? 'direto' : 'manual');
let cliente = null;
async function api() {
  if (!cliente) { const { default: Anthropic } = await import('@anthropic-ai/sdk'); cliente = new Anthropic(); }
  return cliente;
}

const respostaDe = (slug, etapa) => arq(slug, 'ia', `${etapa}.resposta.json`);
const pedidoDe = (slug, etapa) => arq(slug, 'ia', `${etapa}.pedido.json`);
const fila = []; // pedidos do modo lote, enviados juntos em enviarLote()

// Monta os blocos de conteúdo. Imagens chegam como { imagem: '/caminho.jpg' } e viram base64 só na hora de enviar.
async function blocos(conteudo, paraDisco) {
  const out = [];
  for (const b of conteudo) {
    if (typeof b === 'string') out.push({ type: 'text', text: b });
    else if (b.imagem) {
      if (paraDisco) { out.push({ type: 'image', arquivo: b.imagem }); continue; }
      const buf = fs.readFileSync(b.imagem);
      out.push({ type: 'image', source: { type: 'base64', media_type: b.imagem.endsWith('.png') ? 'image/png' : b.imagem.endsWith('.webp') ? 'image/webp' : 'image/jpeg', data: buf.toString('base64') } });
    }
  }
  return out;
}

// "traducao-en" usa o modelo e o esforço de "traducao".
const base = etapa => etapa.split('-')[0];

function parametros(etapa, sistema, msgs, esquema, maxTokens) {
  return {
    model: MODELOS[base(etapa)],
    max_tokens: maxTokens,
    // As regras fixas ficam no começo e em cache: nas próximas empresas custam 10% do preço.
    system: [{ type: 'text', text: sistema, cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: msgs }],
    output_config: { effort: ESFORCO[base(etapa)], format: { type: 'json_schema', schema: esquema } },
  };
}

// Pede uma resposta em JSON. Devolve o objeto, ou null se a resposta ainda não chegou (lote ou manual).
export async function pedir({ slug, etapa, sistema, conteudo, esquema, maxTokens = 8000 }) {
  const salva = lerJson(respostaDe(slug, etapa));
  if (salva?.json) return salva.json;

  if (MODO === 'manual') {
    gravarJson(pedidoDe(slug, etapa), { etapa, modelo: MODELOS[base(etapa)], sistema, conteudo: await blocos(conteudo, true), esquema, maxTokens });
    return null;
  }
  const params = parametros(etapa, sistema, await blocos(conteudo), esquema, maxTokens);
  if (MODO === 'lote') { fila.push({ custom_id: `${slug}__${etapa}`.slice(0, 64), params }); return null; }

  const c = await api();
  const r = await c.messages.stream(params).finalMessage();
  return guardar(slug, etapa, r, false);
}

function guardar(slug, etapa, r, lote) {
  if (r.stop_reason === 'refusal') throw new Error(`${etapa}: a IA recusou`);
  const texto = r.content.filter(b => b.type === 'text').map(b => b.text).join('');
  const json = JSON.parse(texto);
  gravarJson(respostaDe(slug, etapa), { json, modelo: r.model, usage: r.usage, lote });
  registrarCusto({ slug, etapa, modelo: r.model, lote, usage: r.usage });
  return json;
}

// ---------- Lote (Batch API) ----------
export async function enviarLote() {
  if (MODO !== 'lote' || !fila.length) return;
  const c = await api();
  const b = await c.messages.batches.create({ requests: fila });
  gravarJson(path.join(DADOS, 'lotes', `${b.id}.json`), { id: b.id, criado: new Date().toISOString(), ids: fila.map(f => f.custom_id), fechado: false });
  log(`lote ${b.id} enviado com ${fila.length} pedidos; rode de novo mais tarde para colher`);
  fila.length = 0;
}

export async function colherLotes() {
  if (MODO !== 'lote') return;
  const dir = path.join(DADOS, 'lotes');
  if (!fs.existsSync(dir)) return;
  const c = await api();
  for (const f of fs.readdirSync(dir)) {
    const reg = lerJson(path.join(dir, f));
    if (!reg || reg.fechado) continue;
    const b = await c.messages.batches.retrieve(reg.id);
    if (b.processing_status !== 'ended') { log(`lote ${reg.id}: ${b.processing_status}, ${b.request_counts.processing} em processamento`); continue; }
    for await (const r of await c.messages.batches.results(reg.id)) {
      const [slug, etapa] = r.custom_id.split('__');
      if (r.result.type === 'succeeded') {
        try { guardar(slug, etapa, r.result.message, true); } catch (e) { log(`${slug} ${etapa}: ${e.message}`); }
      } else log(`${slug} ${etapa}: ${r.result.type}, vai ser pedido de novo`);
    }
    reg.fechado = true;
    gravarJson(path.join(dir, f), reg);
  }
}

// ---------- Custo ----------
export function usd(modelo, u, lote) {
  const p = PRECOS[modelo] || PRECOS[Object.keys(PRECOS).find(k => modelo?.startsWith(k))] || { entrada: 0, saida: 0 };
  const v = ((u.input_tokens || 0) * p.entrada + (u.cache_creation_input_tokens || 0) * p.entrada * 1.25
    + (u.cache_read_input_tokens || 0) * p.entrada * 0.1 + (u.output_tokens || 0) * p.saida) / 1e6;
  return lote ? v / 2 : v;
}

export function registrarCusto({ slug, etapa, modelo, lote, usage, estimado = false }) {
  const linha = { quando: new Date().toISOString(), slug, etapa, modelo, lote, estimado,
    entrada: usage.input_tokens || 0, cacheEscrita: usage.cache_creation_input_tokens || 0, cacheLeitura: usage.cache_read_input_tokens || 0,
    saida: usage.output_tokens || 0, usd: usd(modelo, usage, lote) };
  fs.mkdirSync(DADOS, { recursive: true });
  fs.appendFileSync(path.join(DADOS, 'custo.jsonl'), JSON.stringify(linha) + '\n');
}

// Modo manual: estima os tokens de um pedido/resposta gravados à mão (texto ~3,2 caracteres por token em português;
// imagem = largura x altura / 750). Na API de verdade a conta vem exata em usage.
export async function estimarManual(slug, etapa) {
  const p = lerJson(pedidoDe(slug, etapa)), r = lerJson(respostaDe(slug, etapa));
  if (!p || !r?.json || r.usage) return;
  const tok = s => Math.ceil(s.length / 3.2);
  let entrada = tok(p.sistema) + tok(JSON.stringify(p.esquema));
  for (const b of p.conteudo) {
    if (b.type === 'text') entrada += tok(b.text);
    else { const m = await sharp(b.arquivo).metadata(); entrada += Math.ceil(m.width * m.height / 750); }
  }
  const saida = tok(JSON.stringify(r.json));
  r.usage = { input_tokens: entrada, output_tokens: saida };
  r.modelo = p.modelo;
  gravarJson(respostaDe(slug, etapa), r);
  registrarCusto({ slug, etapa, modelo: p.modelo, lote: false, usage: r.usage, estimado: true });
}
