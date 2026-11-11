// Etapas com IA. Cada uma lê o arquivo da etapa anterior e devolve o seu (null = resposta ainda não chegou).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { REPO, DADOS } from '../config.mjs';
import { pedir } from '../lib/claude.mjs';
import { arq, lerJson, gravarJson, existe, log } from '../lib/util.mjs';
import { avaliar, resumo } from '../lib/genericos.mjs';
import * as P from '../lib/prompts.mjs';

// Recorta e reduz um print para a IA ver gastando pouco (imagem custa largura x altura / 750 tokens).
async function reduzir(origem, destino, largura, alturaMax) {
  if (existe(destino)) return destino;
  const m = await sharp(origem).metadata();
  const alt = Math.min(m.height, Math.round(alturaMax * m.width / largura));
  await sharp(origem).extract({ left: 0, top: 0, width: m.width, height: alt }).resize({ width: largura }).jpeg({ quality: 72 }).toFile(destino);
  return destino;
}

// ---------- 2. Triagem ----------
export async function triagem(slug) {
  const p = arq(slug, 'prints');
  const pc = await reduzir(path.join(p, 'atual-computador.jpg'), path.join(p, 'ia-computador.jpg'), 800, 1400);
  const cel = await reduzir(path.join(p, 'atual-celular.jpg'), path.join(p, 'ia-celular.jpg'), 390, 1500);
  return pedir({ slug, etapa: 'triagem', sistema: P.TRIAGEM_SISTEMA, esquema: P.TRIAGEM_ESQUEMA, maxTokens: 2000,
    conteudo: ['Print do computador:', { imagem: pc }, 'Print do celular:', { imagem: cel }, 'Avalie.'] });
}

// ---------- 3. Conteúdo ----------
// Texto compacto da captura: título das seções e parágrafos, uma linha cada, com limite por página.
function textoPagina(blocos = [], limite) {
  let s = '';
  for (const b of blocos) { const l = b.h ? `\n## ${b.t}\n` : `${b.t}\n`; if (s.length + l.length > limite) break; s += l; }
  return s;
}

export async function conteudo(slug) {
  const c = lerJson(arq(slug, 'captura.json'));
  const h = c.home;
  const partes = [
    `EMPRESA (da lista de prospecção): ${JSON.stringify(c.empresa)}`,
    `SITE: ${h.url} | título: ${h.titulo} | descrição: ${h.descricao} | https: ${h.https} | carregou em ${h.tempoCarga} ms | ${h.copyright} | tecnologia: ${h.tecnologia}`,
    `CELULAR: largura do conteúdo ${c.celular?.larguraConteudo}px numa tela de 390px; meta viewport: ${c.celular?.temViewport}`,
    `MENU: ${h.menu.map(m => `${m.texto} -> ${m.url}`).join(' | ')}`,
    `IDIOMAS DETECTADOS: ${h.idiomas.join(', ')}`,
    `CORES (fundo por área pintada): ${h.cores.area.map(x => x.c).join(', ')} | títulos: ${h.cores.titulos.join(', ')} | botões: ${h.cores.botoes.join(', ')}`,
    `FONTES: títulos ${h.fontes.titulo} | texto ${h.fontes.texto} | ${h.fontes.carregadas.join(' ')}`,
    `CONTATOS ACHADOS: ${JSON.stringify(h.contatos)}`,
    `IMAGENS BAIXADAS (id, tamanho, onde, alt): \n${c.imagens.map(i => `${i.id} ${i.real?.w || i.w}x${i.real?.h || i.h} ${i.ctx} ${i.logo ? 'LOGO ' : ''}${i.alt}`).join('\n')}`,
    `=== HOME ===\n${textoPagina(h.blocos, 14000)}`,
    ...c.paginas.filter(p => !p.erro).map(p => `=== PÁGINA "${p.menu}" (${p.url}) ===\n${textoPagina(p.blocos, 6000)}`),
  ];
  const conteudo = [partes.join('\n\n')];
  const logo = c.imagens.find(i => i.logo);
  if (logo) {
    const destino = arq(slug, 'prints', 'ia-logo.png');
    if (!existe(destino)) await sharp(arq(slug, 'img', logo.arquivo)).flatten({ background: '#ffffff' }).resize({ width: 400, withoutEnlargement: true }).png().toFile(destino).catch(() => {});
    if (existe(destino)) conteudo.push(`Logo (${logo.id}):`, { imagem: destino });
  }
  return pedir({ slug, etapa: 'conteudo', sistema: P.CONTEUDO_SISTEMA, esquema: P.conteudoEsquema(P.FONTES_TITULO), conteudo, maxTokens: 12000 });
}

// ---------- 4. Redação (+ autocrítica + tradução) ----------
// etapa/sistema mudam só no comparador (node comparar.mjs), que roda o prompt antigo e o novo lado a lado.
export async function redacao(slug, { etapa = 'redacao', sistema = P.REDACAO_SISTEMA } = {}) {
  const ficha = lerJson(arq(slug, 'ia', 'conteudo.resposta.json')).json;
  const c = lerJson(arq(slug, 'captura.json'));
  const fotos = c.imagens.filter(i => !i.logo).map(i => `${i.id} ${i.real?.w || i.w}x${i.real?.h || i.h} ${i.alt}`).join('\n');
  return pedir({ slug, etapa, sistema, esquema: P.SITE_ESQUEMA, maxTokens: 16000,
    conteudo: [`FICHA DA EMPRESA:\n${JSON.stringify(ficha)}\n\nFOTOS DISPONÍVEIS (id, largura x altura, alt):\n${fotos}\n\nEscreva os textos do site novo.`] });
}

// Autocrítica: o detector (sem IA) aponta o que está genérico ou inventado; o revisor devolve só as trocas.
// O resultado vai para ia/<de>.revisada.json com a nota antes e depois. Se piorar, fica o rascunho.
export async function critica(slug, { de = 'redacao' } = {}) {
  const feito = lerJson(arq(slug, 'ia', `${de}.revisada.json`));
  if (feito?.json) return feito.json;
  const ficha = lerJson(arq(slug, 'ia', 'conteudo.resposta.json')).json;
  const cap = lerJson(arq(slug, 'captura.json'));
  const rascunho = lerJson(arq(slug, 'ia', `${de}.resposta.json`)).json;
  const antes = avaliar(rascunho, ficha, cap);
  const r = await pedir({ slug, etapa: de === 'redacao' ? 'critica' : `critica-${de.replace('redacao-', '')}`, sistema: P.CRITICA_SISTEMA, esquema: P.CRITICA_ESQUEMA, maxTokens: 6000,
    conteudo: [`FICHA DA EMPRESA:\n${JSON.stringify(ficha)}\n\nRASCUNHO:\n${JSON.stringify(rascunho)}\n\nPROBLEMAS DO VERIFICADOR (${resumo(antes)}):\n${antes.problemas.map(p => `- ${p.onde}: ${p.texto}`).join('\n') || '- nenhum'}\n\nRevise.`] });
  if (!r) return null;
  const { site, erros } = aplicarTrocas(rascunho, r);
  const depois = avaliar(site, ficha, cap);
  const fica = depois.nota >= antes.nota ? site : rascunho;
  gravarJson(arq(slug, 'ia', `${de}.revisada.json`), { json: fica, notaAntes: antes.nota, notaDepois: depois.nota, usouRevisao: fica === site,
    trocas: r.trocas.length, remocoes: r.remover.length, errosAoAplicar: erros, problemasRestantes: avaliar(fica, ficha, cap).problemas, avaliacao: r.avaliacao });
  log(`${slug} ${de}: autocrítica ${antes.nota} -> ${depois.nota} (${r.trocas.length} trocas, ${r.remover.length} remoções)`);
  return fica;
}

// Textos finais do site: o revisado pela autocrítica, ou o rascunho.
export const textosDoSite = (slug, de = 'redacao') => (lerJson(arq(slug, 'ia', `${de}.revisada.json`)) || lerJson(arq(slug, 'ia', `${de}.resposta.json`))).json;

// "paginas[0].secoes[2].titulo" -> ['paginas', 0, 'secoes', 2, 'titulo']
const partes = c => String(c).replace(/^\$?\.?/, '').split(/\.|\[(\d+)\]/).filter(x => x !== undefined && x !== '').map(x => /^\d+$/.test(x) ? Number(x) : x);
const TIPOS = new Set(['texto', 'cards', 'lista', 'processo', 'numeros', 'galeria', 'marcas', 'depoimentos', 'cta', 'faq', 'contato']);
const CAMPOS = new Set(['slogan', 'botao', 'rodape', 'menu', 'titulo_seo', 'descricao_seo', 'sobretitulo', 'titulo', 'subtitulo', 'texto', 'imagem', 'tipo']);
export function aplicarTrocas(rascunho, { trocas = [], remover = [] }) {
  const site = structuredClone(rascunho);
  const erros = [];
  for (const t of trocas) {
    const ps = partes(t.caminho), campo = ps.at(-1);
    let alvo = site;
    for (const p of ps.slice(0, -1)) alvo = alvo?.[p];
    if (!alvo || typeof alvo !== 'object' || !CAMPOS.has(campo) || (campo === 'tipo' && !TIPOS.has(t.novo))) { erros.push(t.caminho); continue; }
    alvo[campo] = t.novo;
  }
  // Remoções do fim para o começo, para os índices não andarem.
  const rem = remover.map(partes).filter(ps => typeof ps.at(-1) === 'number').sort((a, b) => b.at(-1) - a.at(-1));
  for (const ps of rem) {
    let lista = site;
    for (const p of ps.slice(0, -1)) lista = lista?.[p];
    if (Array.isArray(lista) && ps.at(-1) < lista.length) lista.splice(ps.at(-1), 1); else erros.push(ps.join('.'));
  }
  return { site, erros };
}

export async function traducao(slug, lingua) {
  const site = textosDoSite(slug);
  const nome = { en: 'inglês', es: 'espanhol' }[lingua];
  return pedir({ slug, etapa: `traducao-${lingua}`, sistema: P.TRADUCAO_SISTEMA, esquema: P.SITE_ESQUEMA, maxTokens: 16000,
    conteudo: [`Idioma: ${nome}.\n\n${JSON.stringify(site)}`] });
}

// ---------- 6. Revisão ----------
export async function revisao(slug) {
  const p = arq(slug, 'prints');
  const antigo = await reduzir(path.join(p, 'atual-computador.jpg'), path.join(p, 'ia-computador.jpg'), 800, 1400);
  const conteudo = ['Site ATUAL, computador:', { imagem: antigo }];
  for (const v of ['a', 'b']) {
    conteudo.push(`Versão ${v.toUpperCase()}, computador:`, { imagem: await reduzir(path.join(p, `novo-${v}-computador.jpg`), path.join(p, `ia-novo-${v}-computador.jpg`), 800, 1400) });
    conteudo.push(`Versão ${v.toUpperCase()}, celular:`, { imagem: await reduzir(path.join(p, `novo-${v}-celular.jpg`), path.join(p, `ia-novo-${v}-celular.jpg`), 390, 1300) });
  }
  const ficha = lerJson(arq(slug, 'ia', 'conteudo.resposta.json')).json;
  conteudo.push(`Marca usada: ${JSON.stringify(ficha.marca)}. Fotos: ${lerJson(arq(slug, 'captura.json')).imagens.map(i => i.id).join(', ')}. Revise.`);
  return pedir({ slug, etapa: 'revisao', sistema: P.REVISAO_SISTEMA, esquema: P.revisaoEsquema(P.FONTES_TITULO), conteudo, maxTokens: 3000 });
}

// ---------- 7. Abordagem ----------
const SCRIPT_BASE = [path.join(DADOS, 'script-ligacao.md'), '/mnt/project-files/prospeccao/script-ligacao.md', path.join(REPO, 'linha', 'script-ligacao.md')].find(f => fs.existsSync(f));

export async function abordagem(slug) {
  const c = lerJson(arq(slug, 'captura.json'));
  const ficha = lerJson(arq(slug, 'ia', 'conteudo.resposta.json')).json;
  const tri = lerJson(arq(slug, 'ia', 'triagem.resposta.json'))?.json || {};
  const dados = { empresa: ficha.empresa, site_atual: c.home.url, problemas_vistos_no_print: tri.problemas || [], problemas_tecnicos: ficha.problemas_site,
    o_que_vende: ficha.paginas.map(p => p.rotulo), contato: ficha.contato };
  return pedir({ slug, etapa: 'abordagem', sistema: P.abordagemSistema(fs.readFileSync(SCRIPT_BASE, 'utf8')), esquema: P.ABORDAGEM_ESQUEMA, maxTokens: 6000,
    conteudo: [`DADOS DA EMPRESA:\n${JSON.stringify(dados)}\n\nPrepare a ligação.`] });
}
