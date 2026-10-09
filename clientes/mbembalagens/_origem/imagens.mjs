// Converte as imagens baixadas do site atual (img/) em webp leves para public/assets/img/,
// e recorta o logo (azul e branco). Rodar só quando chegar foto nova: node clientes/mbembalagens/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = f => path.join(aqui, 'img', f);
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });

// [nome final, arquivo original, largura máxima]
const lista = [
  ['banca-bobinas', 'banner1.png', 1600], ['banca-bobinas-q', 'banner1-mob.png', 900],
  ['hortifruti', 'banner2.png', 1600], ['hortifruti-q', 'banner2-mob.png', 900],
  ['sacolas-rua', 'banner3.png', 1600], ['sacolas-rua-q', 'banner3-mob.png', 900],
  ['linha-sacarias', 'product1.png', 840], ['linha-bobinas', 'product2.png', 840], ['linha-sacolas', 'product3.png', 840],
  ['sacola-frutas', 'body-1.png', 730], ['lanchonete', 'body-2.png', 730],
  ['faixa-bobinas', '01.jpg', 1498], ['faixa-sacarias', '02.jpg', 1498], ['faixa-sacolas', '03.jpg', 1498],
  ['p-milheiro', '01_0028_19.jpg'], ['p-reforcada', '01_0026_21.jpg'], ['p-utilitarias', '01_0024_23.jpg'],
  ['p-baixa', '01_0021_26.jpg'], ['p-media', '01_0020_27.jpg'], ['p-industriais', '01_0018_29.jpg'],
  ['p-multi-milheiro', '01_0046_1.jpg'], ['p-multi-peso', '01_0000_47.jpg'],
  ['p-sacos-capacidade', '01_0005_42.jpg'], ['p-sacos-utilidade', '01_0002_45.jpg'], ['p-sacos-frigorifico', '01_0047_51.jpg'],
  ['p-sacola-light', '01_0030_17.jpg'], ['p-sacola-padrao', '01_0029_18.jpg'], ['p-sacola-plus', '01_0031_16.jpg'],
];
for (const [nome, f, w = 420] of lista) {
  await sharp(ori(f)).flatten({ background: '#ffffff' }).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(dest, nome + '.webp'));
}

// Logo: recorte justo do PNG do site atual; versão branca para fundos azuis; ícone só com "MB".
const logo = sharp(ori('Logo-MB-com-transparencia.png')).ensureAlpha().extract({ left: 135, top: 202, width: 590, height: 392 });
const azul = await logo.png().toBuffer();
await sharp(azul).resize({ width: 400 }).png().toFile(path.join(dest, '../logo-mb.png'));
const { data, info } = await sharp(azul).raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) { data[i] = data[i + 1] = data[i + 2] = 255; }
await sharp(data, { raw: info }).resize({ width: 400 }).png().toFile(path.join(dest, '../logo-mb-branco.png'));
await sharp(azul).extract({ left: 0, top: 0, width: 590, height: 295 }).resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(dest, '../favicon.png'));
await sharp(ori('print-site-atual.png')).extract({ left: 0, top: 0, width: 1440, height: 900 }).resize({ width: 1200 }).jpeg({ quality: 78 }).toFile(path.join(dest, '../site-atual.jpg'));
console.log(`mbembalagens: ${lista.length} imagens em public/assets/img, logo e print do site atual em public/assets`);
