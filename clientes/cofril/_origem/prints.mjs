// Refaz os prints da página de escolha (public/assets/apresentacao), as imagens Open Graph (og-a/og-b) e a capa do hub.
// Precisa do site servido em http://localhost:4321 (pasta public/) e do Playwright: node clientes/cofril/_origem/prints.mjs
import path from 'node:path';
import sharp from 'sharp';
import { chromium } from 'playwright';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const base = 'http://localhost:4321';
const b = await chromium.launch({ executablePath: process.env.CHROME || undefined });
const ap = path.join(pub, 'assets/apresentacao');
await import('node:fs').then(fs => fs.mkdirSync(ap, { recursive: true }));

async function abre(url, w, h, escala = 1) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: escala });
  await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch(() => {});
  await p.evaluate(() => document.querySelectorAll('img[loading=lazy]').forEach(i => { i.loading = 'eager'; }));
  await p.waitForLoadState('networkidle').catch(() => {});
  await p.addStyleTag({ content: '.topo{position:relative!important}' }).catch(() => {});
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
const p = await abre('https://www.cofril.com.br/', 1440, 900);
await p.evaluate(() => document.querySelectorAll('.mfp-close, .popmake-close, [class*=close]').forEach(e => e.click?.()));
await p.waitForTimeout(800);
await sharp(await p.screenshot({ fullPage: true })).resize({ width: 1000 }).webp({ quality: 70 }).toFile(`${ap}/atual-pc.webp`);
await b.close();
console.log('prints prontos');
