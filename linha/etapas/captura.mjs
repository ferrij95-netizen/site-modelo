// Etapa 1 (sem IA): abre o site atual num navegador de verdade e guarda tudo o que as outras etapas precisam.
// Saída em dados/empresas/<slug>/: captura.json, prints/ (computador e celular) e img/ (logo e fotos do próprio site).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { MAX_PAGINAS, MAX_FOTOS } from '../config.mjs';
import { arq, gravarJson, log } from '../lib/util.mjs';

let navegador = null;
async function abrir() {
  if (navegador) return navegador;
  const { chromium } = await import('playwright');
  const opc = { args: ['--ignore-certificate-errors'] };
  if (process.env.CHROME) opc.executablePath = process.env.CHROME;
  if (process.env.LINHA_PROXY) opc.proxy = { server: process.env.LINHA_PROXY };
  navegador = await chromium.launch(opc);
  return navegador;
}
export async function fecharNavegador() { if (navegador) await navegador.close(); navegador = null; }

const UA_PC = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const UA_CEL = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

// Roda dentro da página: textos, menu, imagens, cores, fontes, idiomas e contatos.
function lerPagina() {
  const vis = el => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && s.opacity !== '0'; };
  const txt = s => (s || '').replace(/\s+/g, ' ').trim();
  const abs = u => { try { return new URL(u, location.href).href; } catch { return ''; } };

  // Menu: links do cabeçalho/nav, na ordem em que aparecem.
  // Sites antigos nem sempre têm <nav>: escolhe o bloco com mais links visíveis entre os candidatos; senão, os links do alto da página.
  const linkMenu = a => ({ texto: txt(a.innerText || a.querySelector('img')?.alt), url: abs(a.getAttribute('href')) });
  const candidatos = [...document.querySelectorAll('header nav, nav, header, [class*="menu"], [id*="menu"], [class*="nav"], [id*="nav"]')]
    .map(el => [...el.querySelectorAll('a')].filter(vis)).filter(l => l.length >= 2 && l.length <= 30);
  let linksMenu = candidatos.sort((a, b) => b.length - a.length)[0];
  if (!linksMenu) linksMenu = [...document.querySelectorAll('a')].filter(a => vis(a) && a.getBoundingClientRect().top + scrollY < 350);
  const menu = linksMenu.map(linkMenu).filter(m => m.texto && m.texto.length < 40 && !/^(javascript|mailto|tel):/.test(m.url));

  // Blocos de texto na ordem da página, com o título mais próximo.
  const blocos = [];
  let titulo = '';
  for (const el of document.body.querySelectorAll('h1,h2,h3,h4,p,li,blockquote,td,figcaption,.elementor-heading-title,.elementor-text-editor')) {
    if (!vis(el) || el.closest('nav,script,style,noscript')) continue;
    const t = txt(el.innerText);
    if (!t || t.length < 2) continue;
    if (/^H[1-4]$/.test(el.tagName)) { titulo = t; blocos.push({ h: el.tagName, t }); }
    else if (t.length > 3 && !(el.tagName === 'LI' && el.querySelector('p'))) blocos.push({ t: t.slice(0, 1200) });
  }
  // remove repetições (temas que duplicam blocos para o celular)
  const vistos = new Set();
  const blocosUnicos = blocos.filter(b => { const k = (b.h || '') + b.t; if (vistos.has(k)) return false; vistos.add(k); return true; });

  // Imagens: <img> e fundos de CSS, com tamanho na tela.
  const imgs = [];
  for (const el of document.querySelectorAll('img, [style*="background"], section, div')) {
    let src = '';
    if (el.tagName === 'IMG') src = el.currentSrc || el.src;
    else { const bg = getComputedStyle(el).backgroundImage; const m = bg && bg.match(/url\(["']?([^"')]+)/); if (m) src = m[1]; }
    if (!src || src.startsWith('data:')) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 60 || r.height < 40) continue;
    const ctx = el.closest('header') ? 'cabecalho' : el.closest('footer') ? 'rodape' : 'corpo';
    const logo = /logo|marca|brand/i.test(src + ' ' + (el.alt || '') + ' ' + el.className + ' ' + (el.parentElement?.className || ''));
    imgs.push({ src: abs(src), alt: txt(el.alt || ''), w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.top + scrollY), ctx, logo });
  }

  // Cores: área pintada por cada cor de fundo (o "peso" de cada cor no site) e cor dos títulos e botões.
  const area = {};
  for (const el of document.querySelectorAll('body, header, footer, section, div, a, button, nav')) {
    const s = getComputedStyle(el), c = s.backgroundColor;
    if (!c || c === 'rgba(0, 0, 0, 0)' || c === 'transparent') continue;
    const r = el.getBoundingClientRect();
    area[c] = (area[c] || 0) + Math.min(r.width * r.height, 2e6);
  }
  const corDe = sel => [...document.querySelectorAll(sel)].filter(vis).slice(0, 6).map(e => getComputedStyle(e).color);
  const fundoBotoes = [...document.querySelectorAll('a[class*="btn"], a[class*="button"], button, .elementor-button')].filter(vis).slice(0, 8).map(e => getComputedStyle(e).backgroundColor);

  const fonte = sel => { const e = document.querySelector(sel); return e ? getComputedStyle(e).fontFamily : ''; };
  const fontesCarregadas = [...document.querySelectorAll('link[href*="fonts.googleapis"], link[href*="typekit"], link[href*="fonts.bunny"]')].map(l => l.href);

  // Idiomas: hreflang, links /en/ /es/, textos "English", bandeiras.
  const idiomas = new Set([document.documentElement.lang?.slice(0, 2)].filter(Boolean));
  document.querySelectorAll('link[hreflang], a[hreflang]').forEach(l => idiomas.add(l.getAttribute('hreflang').slice(0, 2)));
  document.querySelectorAll('a').forEach(a => {
    const h = a.getAttribute('href') || '', t = txt(a.innerText).toLowerCase(), i = a.querySelector('img');
    if (/\/en(\/|$)|lang=en|english/.test(h + ' ' + t) || (i && /(\/|_|-)(en|us|uk|gb)\.(png|svg|jpg|gif)|flag.*(en|us|uk)|english/i.test(i.src + i.alt))) idiomas.add('en');
    if (/\/es(\/|$)|lang=es|español|espanol/.test(h + ' ' + t) || (i && /(\/|_|-)(es|spain|esp)\.(png|svg|jpg|gif)|flag.*es|espa/i.test(i.src + i.alt))) idiomas.add('es');
  });
  if (document.querySelector('.gtranslate_wrapper, #google_translate_element, [class*="wpml"], [class*="polylang"], .trp-language-switcher')) idiomas.add('tem-tradutor');

  // Contatos.
  const corpo = document.body.innerText;
  const tels = [...new Set([...document.querySelectorAll('a[href^="tel:"]')].map(a => a.getAttribute('href').slice(4)).concat(corpo.match(/\(?\b\d{2}\)?\s?\d{4,5}[-.\s]?\d{4}\b/g) || []))].slice(0, 6);
  const whats = [...new Set([...document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]')].map(a => a.href))].slice(0, 3);
  const emails = [...new Set([...document.querySelectorAll('a[href^="mailto:"]')].map(a => a.getAttribute('href').slice(7).split('?')[0]).concat(corpo.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) || []))].slice(0, 5);
  const redes = [...new Set([...document.querySelectorAll('a[href*="instagram.com"], a[href*="facebook.com"], a[href*="linkedin.com"], a[href*="youtube.com"]')].map(a => a.href))].slice(0, 6);
  const anos = (document.querySelector('footer')?.innerText || corpo.slice(-3000)).match(/(?:©|copyright|todos os direitos)[^\n]{0,40}?(19|20)\d{2}/i);

  return {
    url: location.href, titulo: document.title, descricao: document.querySelector('meta[name="description"]')?.content || '',
    menu, blocos: blocosUnicos.slice(0, 400), imagens: imgs,
    cores: { area: Object.entries(area).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([c, a]) => ({ c, a: Math.round(a) })), titulos: corDe('h1,h2'), links: corDe('a'), botoes: fundoBotoes },
    fontes: { titulo: fonte('h1') || fonte('h2'), texto: fonte('p') || fonte('body'), carregadas: fontesCarregadas },
    idiomas: [...idiomas], contatos: { telefones: tels, whatsapp: whats, emails, redes }, copyright: anos ? anos[0] : '',
    tecnologia: [...document.querySelectorAll('meta[name="generator"]')].map(m => m.content).join(', '),
    altura: document.body.scrollHeight,
  };
}

async function print(pg, arquivo, celular) {
  // Rola até o fim para carregar imagens preguiçosas, depois tira o print da página inteira (até 7000 px).
  await pg.evaluate(async () => { for (let y = 0; y < Math.min(document.body.scrollHeight, 7000); y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); });
  await pg.waitForTimeout(800);
  const alt = Math.min(await pg.evaluate(() => document.body.scrollHeight), 7000);
  const larg = celular ? 390 : 1366;
  const buf = await pg.screenshot({ clip: { x: 0, y: 0, width: larg, height: Math.max(alt, 600) }, type: 'jpeg', quality: 70 });
  fs.writeFileSync(arquivo, buf);
}

export async function capturar(emp) {
  const { slug } = emp;
  const b = await abrir();
  const pastaPrints = arq(slug, 'prints'), pastaImg = arq(slug, 'img');
  fs.mkdirSync(pastaPrints, { recursive: true }); fs.mkdirSync(pastaImg, { recursive: true });
  const url = emp.site.startsWith('http') ? emp.site : 'https://' + emp.site;

  const ctx = await b.newContext({ viewport: { width: 1366, height: 800 }, userAgent: UA_PC, locale: 'pt-BR', ignoreHTTPSErrors: true });
  const pg = await ctx.newPage();
  const t0 = Date.now();
  let resp;
  try { resp = await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); }
  catch (e) {
    if (url.startsWith('https://')) resp = await pg.goto(url.replace('https://', 'http://'), { waitUntil: 'domcontentloaded', timeout: 30000 });
    else throw e;
  }
  await pg.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
  const carregou = Date.now() - t0;
  await print(pg, path.join(pastaPrints, 'atual-computador.jpg'), false);
  const home = await pg.evaluate(lerPagina);
  home.status = resp?.status();
  home.https = pg.url().startsWith('https://');
  home.tempoCarga = carregou;

  // Páginas internas do menu (mesmo domínio, sem âncoras), até MAX_PAGINAS.
  const host = new URL(pg.url()).hostname;
  const internas = [...new Map(home.menu.filter(m => { try { const u = new URL(m.url); return u.hostname === host && u.pathname !== new URL(pg.url()).pathname && !/\.(pdf|jpg|png|zip)$/i.test(u.pathname); } catch { return false; } })
    .map(m => [m.url.split('#')[0], m])).values()].slice(0, MAX_PAGINAS);
  const paginas = [];
  for (const m of internas) {
    try {
      await pg.goto(m.url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await pg.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
      const d = await pg.evaluate(lerPagina);
      paginas.push({ menu: m.texto, url: m.url, titulo: d.titulo, blocos: d.blocos, imagens: d.imagens });
    } catch (e) { paginas.push({ menu: m.texto, url: m.url, erro: e.message.split('\n')[0] }); }
  }
  await ctx.close();

  // Print do celular (só a home).
  const cel = await b.newContext({ viewport: { width: 390, height: 844 }, userAgent: UA_CEL, isMobile: true, hasTouch: true, deviceScaleFactor: 1, ignoreHTTPSErrors: true });
  const pc = await cel.newPage();
  await pc.goto(pg.url() || url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  await pc.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  const celular = await pc.evaluate(() => ({ larguraConteudo: document.documentElement.scrollWidth, temViewport: !!document.querySelector('meta[name="viewport"]') }));
  await print(pc, path.join(pastaPrints, 'atual-celular.jpg'), true);
  await cel.close();

  // Baixa logo e as maiores fotos (vão para o site novo). Converte para webp de até 1600 px.
  const todas = [...home.imagens, ...paginas.flatMap(p => p.imagens || [])];
  const unicas = [...new Map(todas.map(i => [i.src, i])).values()];
  const logos = unicas.filter(i => i.logo && (i.ctx !== 'corpo' || i.y < 400)).sort((a, b) => (a.ctx === 'cabecalho' ? 0 : 1) - (b.ctx === 'cabecalho' ? 0 : 1) || a.y - b.y).slice(0, 3);
  const fotos = unicas.filter(i => !i.logo && i.w * i.h > 15000).sort((a, b) => b.w * b.h - a.w * a.h).slice(0, MAX_FOTOS);
  const baixadas = [];
  let n = 0;
  for (const i of [...logos, ...fotos]) {
    try {
      const r = await fetch(i.src, { headers: { 'User-Agent': UA_PC } });
      if (!r.ok) continue;
      const buf = Buffer.from(await r.arrayBuffer());
      const id = i.logo ? `logo-${n++}` : `foto-${n++}`;
      const svg = /\.svg(\?|$)/i.test(i.src);
      const nome = svg ? `${id}.svg` : `${id}.webp`;
      if (svg) fs.writeFileSync(path.join(pastaImg, nome), buf);
      else {
        const img = sharp(buf, { failOn: 'none' });
        const m = await img.metadata();
        await img.resize({ width: Math.min(m.width || 1600, 1600), withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(pastaImg, nome));
        i.real = { w: m.width, h: m.height };
      }
      baixadas.push({ id, arquivo: nome, ...i });
    } catch {}
  }

  const captura = { empresa: emp, quando: new Date().toISOString(), home, paginas, celular, imagens: baixadas };
  gravarJson(arq(slug, 'captura.json'), captura);
  log(`${slug}: capturado (${paginas.length} páginas internas, ${baixadas.length} imagens, ${carregou} ms)`);
  return captura;
}
