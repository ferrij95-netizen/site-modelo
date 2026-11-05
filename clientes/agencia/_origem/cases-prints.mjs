// Prints da vitrine de cases: abre a versão escolhida de cada site no ar (1440x900), fecha aviso de cookies,
// reduz para 640x400 e junta em faixas verticais de 10 (public/assets/img/cases-<n>.webp), para gastar poucos arquivos
// no limite de 20.000 do Workers Free. Rodar: NODE_PATH=$(npm root -g) node clientes/agencia/_origem/cases-prints.mjs
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import sharp from 'sharp';
import { cases } from './cases.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const aqui = path.dirname(new URL(import.meta.url).pathname);
const destino = path.join(aqui, '../public/assets/img');
export const POR_FAIXA = 10, W = 640, H = 400;
const navegador = await chromium.launch();
const prints = new Array(cases.length);
let i = 0;
async function trabalhador() {
  while (i < cases.length) {
    const n = i++;
    const [c, v] = cases[n];
    const pg = await navegador.newPage({ viewport: { width: 1440, height: 900 } });
    await pg.goto(`https://${c}.overtus.com.br/${v ? v + '/' : ''}`, { waitUntil: 'load', timeout: 45000 });
    await pg.waitForTimeout(1800);
    for (const b of await pg.locator('button:visible, a:visible').filter({ hasText: /^(aceitar|aceito|accept|ok, entendi|entendi)$/i }).all()) await b.click().catch(() => {});
    await pg.waitForTimeout(400);
    prints[n] = await sharp(await pg.screenshot()).resize(W, H).toBuffer();
    await pg.close();
  }
}
await Promise.all(Array.from({ length: 6 }, trabalhador));
await navegador.close();
for (let f = 0; f * POR_FAIXA < cases.length; f++) {
  const parte = prints.slice(f * POR_FAIXA, (f + 1) * POR_FAIXA);
  await sharp({ create: { width: W, height: H * POR_FAIXA, channels: 3, background: '#e9eef6' } })
    .composite(parte.map((input, k) => ({ input, top: k * H, left: 0 })))
    .webp({ quality: 74 }).toFile(path.join(destino, `cases-${f + 1}.webp`));
}
console.log(`cases-prints: ${cases.length} prints em ${Math.ceil(cases.length / POR_FAIXA)} faixas`);
