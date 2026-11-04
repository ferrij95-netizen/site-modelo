// Prints para a página de escolha, imagens de compartilhamento e capa do hub.
// Uso: node componentes/gerador/prints.mjs <cliente> [url-do-site-atual]
// Gera public/assets/apresentacao/{a,b}-pc.webp, {a,b}-cel.webp, atual-pc.webp, public/assets/og-{a,b}.jpg e clientes/<c>/capa.jpg
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const sharp = require('sharp');

const [cliente, antigo] = process.argv.slice(2);
const raiz = path.join(path.dirname(new URL(import.meta.url).pathname), '../..');
const pub = path.join(raiz, 'clientes', cliente, 'public');
const tipos = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2', '.mp4': 'video/mp4' };
const srv = http.createServer((q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(pub, p);
  if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'content-type': tipos[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(r);
}).listen(0);
const base = `http://localhost:${srv.address().port}`;
const out = path.join(pub, 'assets/apresentacao');
fs.mkdirSync(out, { recursive: true });

const b = await chromium.launch();
async function foto(url, larg, escala, alturaMax) {
  const p = await b.newPage({ viewport: { width: larg, height: 900 }, deviceScaleFactor: escala });
  await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await p.addStyleTag({ content: '.sobe{opacity:1!important;transform:none!important} .caixa-foto,[class*=cookie]{display:none!important}' });
  for (let y = 0; y < 20000; y += 600) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(60); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(700);
  const h = Math.min(await p.evaluate(() => document.documentElement.scrollHeight), alturaMax);
  const buf = await p.screenshot({ fullPage: true, clip: { x: 0, y: 0, width: larg, height: h } });
  await p.close();
  return buf;
}
for (const v of ['a', 'b']) {
  if (!fs.existsSync(path.join(pub, v, 'index.html'))) continue;
  const pc = await foto(`${base}/${v}/`, 1440, 1, 9000);
  await sharp(pc).resize({ width: 1000 }).webp({ quality: 72 }).toFile(path.join(out, `${v}-pc.webp`));
  await sharp(pc).extract({ left: 0, top: 0, width: 1440, height: 756 }).resize(1200, 630).jpeg({ quality: 80 }).toFile(path.join(pub, `assets/og-${v}.jpg`));
  if (v === 'a') await sharp(pc).extract({ left: 0, top: 0, width: 1440, height: 756 }).jpeg({ quality: 80 }).toFile(path.join(raiz, 'clientes', cliente, 'capa.jpg'));
  const cel = await foto(`${base}/${v}/`, 390, 2, 7000);
  await sharp(cel).resize({ width: 600 }).webp({ quality: 70 }).toFile(path.join(out, `${v}-cel.webp`));
  console.log(`${cliente}: prints da versão ${v.toUpperCase()}`);
}
if (antigo) {
  try {
    const at = await foto(antigo, 1440, 1, 7000);
    await sharp(at).resize({ width: 1000 }).webp({ quality: 70 }).toFile(path.join(out, 'atual-pc.webp'));
    console.log(`${cliente}: print do site atual`);
  } catch (e) { console.log('site atual não abriu:', e.message); }
}
await b.close();
srv.close();
