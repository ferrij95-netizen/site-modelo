// Converte as imagens do site atual (img/orig e img/clientes) em webp para public/assets/img/.
// Rodar só quando chegar imagem nova: node clientes/vectora/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(path.join(dest, 'clientes'), { recursive: true });

// [nome final, arquivo em img/orig, largura máxima]. Tudo vem do site atual (vectora.com.br/portal).
const lista = [
  ['hero-vrp', 'slide-slides-3.jpg', 1900],
  ['hero-dutos', 'slide-slides-1.jpg', 1900],
  ['hero-sistema', 'slide-slides-2.jpg', 1900],
  ['corte-autobox', 'slide-autobox.png', 620],
  ['corte-datalogger', 'slide-datalogger.png', 620],
  ['corte-vt460', 'slide-VT460_1.png', 600],
  ['corte-login', 'slide-login.png', 480],
  ['sede', 'office-1.jpg', 1082],
  ['case-saneamento', 'gallery-case_saneamento.png', 1000],
  ['case-petroleo', 'gallery-case_petroleo.png', 1000],
  ['autobox-detalhe', 'gallery-autobox_form.png', 620],
  ['p-vt471', 'gallery-autobox.png', 1000],
  ['p-vt490', 'gallery-vt490.png', 1000],
  ['p-vt490lc', 'gallery-vt490lc.png', 1000],
  ['p-vt490e', 'gallery-VT490E.png', 1000],
  ['p-vz670', 'gallery-vectorasys.png', 1000],
  ['p-vx511', 'gallery-vx511.png', 1000],
  ['p-vt460', 'gallery-vt460_2.png', 900],
  ['p-vr520', 'gallery-vr520.png', 1000],
  ['p-vt701', 'gallery-vt701.png', 900],
  ['p-vt601', 'gallery-vt601.png', 900],
  ['p-vt600', 'gallery-vt600.png', 900],
  ['p-vt462', 'gallery-vt462.png', 900],
];

// Imagens pequenas do site atual: aumentar no máximo 2x.
for (const [nome, arq, larg] of lista) {
  const f = path.join(aqui, 'img/orig', arq);
  const meta = await sharp(f).metadata();
  await sharp(f).toColourspace('srgb').resize({ width: Math.min(larg, meta.width * 2) }).webp({ quality: 84, alphaQuality: 90 }).toFile(path.join(dest, nome + '.webp'));
}
for (const f of fs.readdirSync(path.join(aqui, 'img/clientes'))) {
  await sharp(path.join(aqui, 'img/clientes', f)).webp({ quality: 90 }).toFile(path.join(dest, 'clientes', f.replace(/^grid-/, '').replace(/\.png$/, '.webp')));
}
for (const f of ['logo-vectora.svg', 'logo-vectora-branco.svg']) fs.copyFileSync(path.join(aqui, 'img', f), path.join(dest, f));
console.log('vectora: imagens convertidas');
