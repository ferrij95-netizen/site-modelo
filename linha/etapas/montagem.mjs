// Etapa 5 (sem IA): monta as duas versões em clientes/<slug>/public a partir dos textos e da marca,
// tira os prints do site novo (para a revisão, o hub e a página de escolha) e grava o site.config.json.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { REPO, AQUI, DOMINIO } from '../config.mjs';
import { arq, lerJson, gravarJson, existe, log } from '../lib/util.mjs';
import { esc, paleta } from '../modelos/comum.mjs';
import { pagina, VERSOES } from '../modelos/versoes.mjs';

const MODELOS = path.join(AQUI, 'modelos');

// Marca final de uma versão: a da ficha com os ajustes pedidos na revisão.
function marcaDa(ficha, v, revisao) {
  const m = { ...ficha.marca };
  for (const a of revisao?.ajustes || []) {
    if (a.versao !== v && a.versao !== 'ambas') continue;
    if (['cor_principal', 'cor_escura', 'cor_destaque', 'fonte_titulo'].includes(a.campo)) m[a.campo] = a.valor;
  }
  return m;
}
function chamadaAjustada(site, v, revisao) {
  const a = (revisao?.ajustes || []).find(x => x.campo === 'imagem_chamada' && (x.versao === v || x.versao === 'ambas'));
  if (!a) return site;
  const s = structuredClone(site);
  if (s.paginas[0]) s.paginas[0].chamada.imagem = a.valor;
  return s;
}

export async function montar(slug, { revisao = null } = {}) {
  const emp = lerJson(arq(slug, 'empresa.json'));
  const cap = lerJson(arq(slug, 'captura.json'));
  const ficha = lerJson(arq(slug, 'ia', 'conteudo.resposta.json')).json;
  const sites = { pt: lerJson(arq(slug, 'ia', 'redacao.resposta.json')).json };
  for (const l of ['en', 'es']) { const t = lerJson(arq(slug, 'ia', `traducao-${l}.resposta.json`)); if (t?.json && ficha.idiomas.includes(l)) sites[l] = t.json; }
  const linguas = Object.keys(sites);

  const sub = emp.sub;
  const dest = path.join(REPO, 'clientes', sub);
  const pub = path.join(dest, 'public');
  fs.rmSync(pub, { recursive: true, force: true });
  fs.mkdirSync(path.join(pub, 'assets', 'img'), { recursive: true });
  for (const f of ['base.css', 'a.css', 'b.css', 'site.js']) fs.copyFileSync(path.join(MODELOS, f), path.join(pub, 'assets', f));

  // Imagens: as baixadas vão junto; sem arquivo (captura feita fora da linha), usa o endereço original.
  const urls = {};
  for (const i of cap.imagens) {
    const local = arq(slug, 'img', i.arquivo || '');
    if (i.arquivo && existe(local)) { fs.copyFileSync(local, path.join(pub, 'assets', 'img', i.arquivo)); urls[i.id] = `/assets/img/${i.arquivo}`; }
    else if (i.src) urls[i.id] = i.src;
  }
  const img = id => (id && urls[id]) || null;
  const base = `https://${sub}.${DOMINIO}`;

  for (const v of ['a', 'b']) {
    const marca = marcaDa(ficha, v, revisao);
    const dados = { ...ficha, marca };
    for (const lingua of linguas) {
      const site = chamadaAjustada(sites[lingua], v, revisao);
      const prefixo = lingua === 'pt' ? '' : lingua + '/';
      const link = (s, l = lingua) => `/${v}/${l === 'pt' ? '' : l + '/'}${s === 'inicio' ? '' : s + '/'}`;
      const slugContato = (site.paginas.find(p => p.secoes.some(s => s.tipo === 'contato')) || site.paginas.find(p => /contat/.test(p.slug)) || site.paginas[0]).slug;
      const ctx = {
        v, lingua, linguas, dados, site, img, paleta: paleta(marca), pesado: marca.fundo !== 'claro',
        logo: img(marca.logo), slugContato,
        link: s => link(s), linkLingua: (s, l) => link(s, l), urlAbs: (s, l) => base + link(s, l),
        ogImagem: `${base}/assets/versao-${v}.jpg`,
      };
      for (const p of site.paginas) {
        const destino = path.join(pub, v, prefixo, p.slug === 'inicio' ? '' : p.slug, 'index.html');
        fs.mkdirSync(path.dirname(destino), { recursive: true });
        fs.writeFileSync(destino, pagina(ctx, p));
      }
    }
  }

  // Prints do site novo (servidor local só para isso).
  await prints(slug, pub, dest);
  fs.writeFileSync(path.join(pub, 'index.html'), escolha(emp, ficha, cap));
  gravarJson(path.join(dest, 'site.config.json'), {
    name: ficha.empresa.nome_curto || ficha.empresa.nome, legalName: ficha.empresa.nome, tagline: sites.pt.slogan,
    domain: base, phone: ficha.contato.telefones[0] || '', email: ficha.contato.emails[0] || '', whatsapp: ficha.contato.whatsapp || '',
    address: ficha.contato.endereco || '', defaultLang: 'pt', langs: linguas, pages: ['index'],
    theme: { brand: paleta(ficha.marca).cor, brandDeep: paleta(ficha.marca).escura }, hubName: ficha.empresa.nome, linha: true,
  });
  const n = sites.pt.paginas.length;
  log(`${slug}: montado em clientes/${sub} (2 versões, ${n} páginas cada, idiomas: ${linguas.join(', ')})`);
}

// Página de escolha: versão A, versão B e o site atual para comparar.
function escolha(emp, ficha, cap) {
  const pal = paleta(ficha.marca);
  const nome = ficha.empresa.nome;
  const card = (cls, href, imgSrc, e, h, p, l, ext) => `<a class="v ${cls}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}><img src="${imgSrc}" alt=""><div><span class="e">${e}</span><h2>${h}</h2><p>${p}</p><b class="l">${l}</b></div></a>`;
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(nome)} · escolha a versão do novo site</title>
<meta name="description" content="Duas versões do novo site da ${esc(nome)} para escolher.">
<meta name="robots" content="noindex">
<meta property="og:title" content="${esc(nome)} · novo site"><meta property="og:image" content="https://${emp.sub}.${DOMINIO}/assets/versao-a.jpg">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${(ficha.marca.fonte_titulo || 'Montserrat').replace(/ /g, '+')}:wght@700&family=Inter:wght@400;600&display=swap">
<style>
  *{box-sizing:border-box} html,body{height:100%} body{margin:0;font:16px/1.5 Inter,system-ui,sans-serif;color:#1d2129;background:#f3f4f6;display:grid;grid-template-rows:auto 1fr}
  header{background:#fff;border-bottom:4px solid ${pal.cor}} header .in{display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:72px}
  header b{font:700 20px/1 '${ficha.marca.fonte_titulo || 'Montserrat'}',sans-serif;color:${pal.escura}} header small{font-weight:600;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#6b7280}
  .in{width:min(100% - 40px,1360px);margin:0 auto} main .in{display:grid;grid-template-columns:1fr 1fr .8fr;gap:20px;padding-block:clamp(16px,3vh,32px);align-content:center;height:100%}
  .v{display:grid;grid-template-rows:auto 1fr;background:#fff;border:1px solid #e2e5ea;border-radius:8px;overflow:hidden;text-decoration:none;color:inherit;transition:box-shadow .15s,border-color .15s;min-height:0}
  .v:hover{border-color:${pal.cor};box-shadow:0 12px 32px rgba(0,0,0,.12)} .v img{width:100%;aspect-ratio:16/10;max-height:50vh;object-fit:cover;object-position:top;border-bottom:1px solid #e2e5ea}
  .v div{display:grid;gap:6px;padding:18px 22px 22px;align-content:start} .e{font-weight:700;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:${pal.cor}}
  .v h2{margin:0;font:700 24px/1.2 '${ficha.marca.fonte_titulo || 'Montserrat'}',sans-serif} .v p{margin:0;color:#5b6270;font-size:15px} .l{font-weight:600}
  .atual{background:transparent;border-style:dashed} .atual img{filter:grayscale(.3)} .atual .e{color:#6b7280}
  @media (max-width:1000px){html,body{height:auto} main .in{grid-template-columns:1fr}}
</style></head><body>
<header><div class="in"><b>${esc(nome)}</b><small>Proposta de novo site · duas versões</small></div></header>
<main><div class="in">
${card('a', '/a/', '/assets/versao-a.jpg', 'Versão A', VERSOES.a.nome, VERSOES.a.descricao, 'Abrir a versão A →')}
${card('b', '/b/', '/assets/versao-b.jpg', 'Versão B', VERSOES.b.nome, VERSOES.b.descricao, 'Abrir a versão B →')}
${card('atual', esc(cap.home.url), '/assets/site-atual.jpg', 'Para comparar', 'Site atual', esc(new URL(cap.home.url).hostname.replace(/^www\./, '')) + ' como está hoje.', 'Abrir o site atual ↗', true)}
</div></main></body></html>
`;
}

const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
// O navegador abre o site num endereço falso e cada pedido é respondido com o arquivo do disco (sem servidor, sem proxy).
const ORIGEM = 'http://site.linha';
async function servirDoDisco(ctx, raiz) {
  await ctx.route(ORIGEM + '/**', rota => {
    let f = path.join(raiz, decodeURIComponent(new URL(rota.request().url()).pathname));
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f)) return rota.fulfill({ status: 404, body: '' });
    rota.fulfill({ status: 200, contentType: TIPOS[path.extname(f)] || 'application/octet-stream', body: fs.readFileSync(f) });
  });
}

async function prints(slug, pub, dest) {
  const { chromium } = await import('playwright');
  const opc = {};
  if (process.env.CHROME) opc.executablePath = process.env.CHROME;
  if (process.env.HTTPS_PROXY) opc.proxy = { server: process.env.HTTPS_PROXY }; // fontes do Google na nuvem
  const b = await chromium.launch(opc);
  const base = ORIGEM;
  const p = arq(slug, 'prints');
  const pc0 = await b.newContext({ viewport: { width: 1366, height: 854 } });
  const cel0 = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await servirDoDisco(pc0, pub); await servirDoDisco(cel0, pub);
  try {
    for (const v of ['a', 'b']) {
      const pc = await pc0.newPage();
      await pc.goto(`${base}/${v}/`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
      await pc.waitForTimeout(600);
      await pc.screenshot({ path: path.join(pub, 'assets', `versao-${v}.jpg`), type: 'jpeg', quality: 78 });
      if (v === 'a') await pc.setViewportSize({ width: 1440, height: 756 }).then(() => pc.screenshot({ path: path.join(dest, 'capa.jpg'), type: 'jpeg', quality: 80 }));
      await pc.setViewportSize({ width: 1366, height: 854 });
      await pc.screenshot({ path: path.join(p, `novo-${v}-computador.jpg`), type: 'jpeg', quality: 72, fullPage: true });
      await pc.close();
      const cel = await cel0.newPage();
      await cel.goto(`${base}/${v}/`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
      await cel.waitForTimeout(400);
      await cel.screenshot({ path: path.join(p, `novo-${v}-celular.jpg`), type: 'jpeg', quality: 72, fullPage: true });
      await cel.close();
    }
  } finally { await b.close(); }
  // Print do site atual para a página de escolha.
  const atual = path.join(p, 'atual-computador.jpg');
  if (existe(atual)) {
    const m = await sharp(atual).metadata();
    await sharp(atual).extract({ left: 0, top: 0, width: m.width, height: Math.min(m.height, Math.round(m.width * 10 / 16)) }).resize({ width: 1200 }).jpeg({ quality: 75 }).toFile(path.join(pub, 'assets', 'site-atual.jpg'));
  }
  for (const f of fs.readdirSync(p).filter(f => f.startsWith('ia-novo-'))) fs.rmSync(path.join(p, f)); // prints da revisão anterior
}
