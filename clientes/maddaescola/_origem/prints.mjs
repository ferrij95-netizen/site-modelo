// Refaz os prints da página de escolha (public/assets/apresentacao), as imagens Open Graph (og-a/og-b) e a capa do hub.
// Precisa do site servido em http://localhost:4321 (pasta public/) e do Playwright: node clientes/maddaescola/_origem/prints.mjs
// O print do site atual (atual-pc.webp) vem de prospeccao/nichos/escolas/prints: o maddaescola.com.br bloqueia o acesso daqui.
import path from 'node:path';
import fs from 'node:fs';
import sharp from 'sharp';
import { chromium } from 'playwright';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const base = 'http://localhost:4321';
const b = await chromium.launch({ executablePath: process.env.CHROME || undefined });
const ap = path.join(pub, 'assets/apresentacao');
fs.mkdirSync(ap, { recursive: true });

async function abre(url, w, h, escala = 1) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: escala });
  await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch(() => {});
  await p.evaluate(async () => {
    document.querySelectorAll('img[loading=lazy]').forEach(i => { i.loading = 'eager'; });
    for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); }
    scrollTo(0, 0);
  });
  await p.waitForLoadState('networkidle').catch(() => {});
  await p.addStyleTag({ content: '.topo{position:relative!important}.pontos{display:none!important}' }).catch(() => {});
  await p.waitForTimeout(800);
  return p;
}
for (const v of ['a', 'b']) {
  let p = await abre(`${base}/${v}/`, 1440, 900);
  await sharp(await p.screenshot({ fullPage: true })).resize({ width: 1000 }).webp({ quality: 70 }).toFile(`${ap}/${v}-pc.webp`);
  await sharp(await p.screenshot()).resize(1200, 630, { position: 'top' }).jpeg({ quality: 78 }).toFile(`${pub}/assets/og-${v}.jpg`);
  if (v === 'a') await sharp(await p.screenshot({ clip: { x: 0, y: 0, width: 1440, height: 756 } })).jpeg({ quality: 80 }).toFile(`${pub}/../capa.jpg`);
  await p.close();
  p = await abre(`${base}/${v}/`, 390, 844, 2);
  await sharp(await p.screenshot({ fullPage: true })).resize({ width: 600 }).webp({ quality: 66 }).toFile(`${ap}/${v}-cel.webp`);
  await p.close();
}
await b.close();
console.log('prints prontos');
