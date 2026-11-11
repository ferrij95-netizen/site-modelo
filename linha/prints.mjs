// Prints do site atual de cada empresa, em tamanho pequeno, para a aba "Aprovar" do hub.
//
//   node prints.mjs lista.csv|json [--limite 20] [--refazer] [--paralelo 3]
//
// A lista precisa ter a coluna "id" (o mesmo id da empresa no canvas, ex.: agro-012), "empresa" e "site".
// Saída em <dados>/prints/: <id>.d.jpg (computador), <id>.m.jpg (celular) e prints.json (o que deu certo ou errado em cada site).
// Depois, no hub: aba Aprovar > Importar prints > escolher todos os arquivos dessa pasta.
// Não usa IA: só abre o site num navegador de verdade e tira dois prints da primeira tela (≈ 60 KB e 25 KB).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { DADOS } from './config.mjs';
import { lerLista, lerJson, gravarJson, slugDe, log } from './lib/util.mjs';
import { semGoogle } from './lib/semgoogle.mjs';

const args = process.argv.slice(2);
const opcao = (n, padrao) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : padrao; };
const posicionais = [];
for (let k = 0; k < args.length; k++) { if (args[k].startsWith('--')) { if (args[k] !== '--refazer') k++; } else posicionais.push(args[k]); }
const arquivo = posicionais[0];
if (!arquivo) { console.log('uso: node prints.mjs lista.csv|json [--limite 20] [--refazer] [--paralelo 3]'); process.exit(1); }
const pasta = path.join(DADOS, 'prints');
fs.mkdirSync(pasta, { recursive: true });
const manifesto = path.join(pasta, 'prints.json');

const UA_PC = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const UA_CEL = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

// Endereços a tentar, na ordem: como veio, outro protocolo, com/sem www (sites antigos só abrem de um jeito).
export function candidatos(site) {
  const base = site.startsWith('http') ? site : 'http://' + site;
  let u; try { u = new URL(base); } catch { return []; }
  const lista = [u.href];
  const outro = new URL(u.href); outro.protocol = u.protocol === 'https:' ? 'http:' : 'https:'; lista.push(outro.href);
  const www = new URL(u.href); www.hostname = u.hostname.startsWith('www.') ? u.hostname.slice(4) : 'www.' + u.hostname; lista.push(www.href);
  const www2 = new URL(outro.href); www2.hostname = www.hostname; lista.push(www2.href);
  return [...new Set(lista)];
}
export function erroLegivel(e) {
  const m = String(e?.message || e);
  if (/ERR_NAME_NOT_RESOLVED/.test(m)) return 'O endereço não existe mais (domínio não encontrado)';
  if (/ERR_CONNECTION_REFUSED|ERR_CONNECTION_RESET|ERR_CONNECTION_CLOSED|ERR_EMPTY_RESPONSE/.test(m)) return 'O servidor recusou ou derrubou a conexão';
  if (/ERR_CONNECTION_TIMED_OUT|Timeout/.test(m)) return 'Demorou mais de 30 segundos para abrir';
  if (/ERR_TOO_MANY_REDIRECTS/.test(m)) return 'O site entra em loop de redirecionamento';
  if (/^HTTP (\d+)/.test(m)) return 'O site responde com erro ' + m.match(/^HTTP (\d+)/)[1];
  return m.split('\n')[0].replace(/^page\.goto: /, '').slice(0, 140);
}

let navegador = null;
// Um único navegador para todos os trabalhadores (guarda a promessa, senão cada um abriria o seu).
function abrir() {
  navegador ??= (async () => {
    const { chromium } = await import('playwright');
    const opc = { args: ['--ignore-certificate-errors'] };
    if (process.env.CHROME) opc.executablePath = process.env.CHROME;
    if (process.env.LINHA_PROXY) opc.proxy = { server: process.env.LINHA_PROXY };
    return chromium.launch(opc);
  })();
  return navegador;
}

async function abrirPagina(pg, site) {
  let primeiro;
  for (const [n, url] of candidatos(site).entries()) {
    try {
      // A primeira tentativa espera até 30 s; as alternativas (outro protocolo, com/sem www) só 12 s.
      const r = await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: n === 0 ? 30000 : 12000 });
      if (r && r.status() >= 400) { primeiro ??= new Error('HTTP ' + r.status()); continue; }
      return r;
    } catch (e) { primeiro ??= e; }
  }
  // O erro que vale é o do endereço como veio na lista (os outros foram só tentativas).
  throw primeiro || new Error('endereço inválido');
}
const reduzir = (buf, largura, qualidade) => sharp(buf).resize({ width: largura, withoutEnlargement: true }).jpeg({ quality: qualidade, mozjpeg: true }).toBuffer();

async function capturar(e) {
  const b = await abrir();
  const sinais = [];
  const out = { id: e.id, nome: e.nome, site: e.site, em: new Date().toISOString() };
  // Computador (1366 x 800): só a primeira tela, que é o que o dono vê ao abrir.
  const pc = await b.newContext({ viewport: { width: 1366, height: 800 }, userAgent: UA_PC, locale: 'pt-BR', ignoreHTTPSErrors: true });
  await semGoogle(pc);
  try {
    const pg = await pc.newPage();
    const t0 = Date.now();
    await abrirPagina(pg, e.site);
    await pg.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    await pg.waitForTimeout(600);
    const ms = Date.now() - t0;
    out.url_final = pg.url();
    if (pg.url().startsWith('http://')) sinais.push('Sem HTTPS (aparece "Não seguro")');
    if (ms > 6000) sinais.push(`Demora ${Math.round(ms / 1000)} s para abrir`);
    const ano = await pg.evaluate(() => { const t = (document.querySelector('footer')?.innerText || document.body.innerText.slice(-2500)); const m = t.match(/(?:©|copyright|todos os direitos)[^\n]{0,40}?((?:19|20)\d{2})/i); return m ? +m[1] : 0; }).catch(() => 0);
    if (ano && ano <= new Date().getFullYear() - 4) sinais.push(`Rodapé de ${ano}`);
    const buf = await pg.screenshot({ type: 'jpeg', quality: 82 });
    fs.writeFileSync(path.join(pasta, `${e.id}.d.jpg`), await reduzir(buf, 1000, 62));
  } finally { await pc.close(); }
  // Celular (390 x 844): também só a primeira tela, e confere se o site cabe na largura.
  const cel = await b.newContext({ viewport: { width: 390, height: 844 }, userAgent: UA_CEL, isMobile: true, hasTouch: true, locale: 'pt-BR', ignoreHTTPSErrors: true });
  await semGoogle(cel);
  try {
    const pg = await cel.newPage();
    await pg.goto(out.url_final, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await pg.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    await pg.waitForTimeout(600);
    const info = await pg.evaluate(() => ({ larg: document.documentElement.scrollWidth, viewport: !!document.querySelector('meta[name="viewport"]') }));
    if (!info.viewport || info.larg > 398) sinais.push('Não se adapta ao celular');
    const buf = await pg.screenshot({ type: 'jpeg', quality: 82 });
    fs.writeFileSync(path.join(pasta, `${e.id}.m.jpg`), await reduzir(buf, 340, 60));
  } finally { await cel.close(); }
  out.ok = true; out.sinais = sinais;
  return out;
}

const feitos = Object.fromEntries((lerJson(manifesto, []) || []).map(r => [r.id, r]));
let lista = lerLista(arquivo).map(e => ({ ...e, id: e.id || slugDe(e.nome, e.site) })).filter(e => e.site);
if (!args.includes('--refazer')) lista = lista.filter(e => !(feitos[e.id] && (feitos[e.id].ok || feitos[e.id].erro)));
lista = lista.slice(0, Number(opcao('limite', lista.length)));
log(`${lista.length} sites para tirar print (pasta ${pasta})`);

let i = 0, ok = 0, falha = 0;
async function trabalhador() {
  while (i < lista.length) {
    const e = lista[i++];
    let r;
    try { r = await capturar(e); ok++; log(`${e.id}: ok${r.sinais.length ? ' (' + r.sinais.join('; ') + ')' : ''}`); }
    catch (err) { r = { id: e.id, nome: e.nome, site: e.site, erro: erroLegivel(err), em: new Date().toISOString() }; falha++; log(`${e.id}: ${r.erro}`); }
    feitos[e.id] = r;
    gravarJson(manifesto, Object.values(feitos));
  }
}
await Promise.all(Array.from({ length: Math.max(1, Number(opcao('paralelo', 3))) }, trabalhador));
if (navegador) await (await navegador).close();
log(`pronto: ${ok} com print, ${falha} que não abriram. No hub: Aprovar > Importar prints > escolha os arquivos de ${pasta}`);
