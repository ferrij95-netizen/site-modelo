// Prints da apresentação, og-*.jpg e ../capa.jpg. Precisa de um servidor local em public/:
//   (cd clientes/khromatintas/public && python3 -m http.server 8765) e depois node clientes/khromatintas/_origem/prints.mjs
// Depois rodar gerar.mjs de novo para montar a página de escolha.
import { createRequire } from 'node:module';
import path from 'node:path';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const sharp = require(path.join(path.dirname(new URL(import.meta.url).pathname), '../../../node_modules/sharp'));
const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public/assets');
const b = await chromium.launch();
async function shot(url, w, scale, full = true, h = 900) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await p.addStyleTag({ content: '.whats-flut{display:none!important}.estrada-linha{animation:none!important}' });
  await p.evaluate(async () => { document.querySelectorAll('img').forEach(i => i.loading = 'eager'); for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 8000) }))); document.querySelectorAll('.topo').forEach(e => e.style.position = 'relative'); });
  await p.waitForTimeout(1200);
  const buf = await p.screenshot({ fullPage: full });
  await p.close(); return buf;
}
for (const v of ['a', 'b']) {
  await sharp(await shot(`http://localhost:8765/${v}/`, 1440, 1)).resize(1000).webp({ quality: 70 }).toFile(`${pub}/apresentacao/${v}-pc.webp`);
  await sharp(await shot(`http://localhost:8765/${v}/`, 390, 2)).resize(600).webp({ quality: 70 }).toFile(`${pub}/apresentacao/${v}-cel.webp`);
  await sharp(await shot(`http://localhost:8765/${v}/`, 1200, 1, false, 630)).jpeg({ quality: 80 }).toFile(`${pub}/og-${v}.jpg`);
}
await sharp(await shot('https://khromatintas.com.br/', 1366, 1)).resize(1000).webp({ quality: 70 }).toFile(`${pub}/apresentacao/atual-pc.webp`);
await sharp(await shot('http://localhost:8765/a/', 1440, 1, false, 900)).resize(1200).jpeg({ quality: 78 }).toFile(path.join(aqui, '../capa.jpg'));
await b.close();
console.log('prints prontos');
