// Converte as imagens do site atual (img/orig e img/pecas) em webp para public/assets/img/.
// As colagens de produto e obra do site atual foram separadas em fotos soltas por separar-colagens.py (img/pecas).
// Rodar só quando chegar imagem nova: node clientes/patoindustria/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });

// [nome final, arquivo, largura máxima]. Tudo vem do site atual (patoindustria.com.br).
const lista = [
  ['hero-1', 'orig/slider-slide-1.jpg', 1920],
  ['hero-2', 'orig/slider-slide-2.jpg', 1920],
  ['hero-3', 'orig/slider-slide-3.jpg', 1920],
  ['titulo', 'orig/page-title.jpg', 1920],
  ['obra-capa-1', 'orig/obras-img-1.jpg', 600],
  ['obra-capa-2', 'orig/obras-img-2.jpg', 600],
  ['obra-capa-3', 'orig/obras-img-3.jpg', 600],
  ['obra-capa-4', 'orig/obras-img-4.jpg', 600],
];
for (const f of fs.readdirSync(path.join(aqui, 'img/pecas'))) lista.push([f.replace(/\.jpg$/, ''), 'pecas/' + f, 1000]);

// Fotos pequenas do site atual: aumentar no máximo 1,6x.
for (const [nome, arq, larg] of lista) {
  const f = path.join(aqui, 'img', arq);
  const meta = await sharp(f).metadata();
  await sharp(f).resize({ width: Math.min(larg, Math.round(meta.width * 1.6)) }).webp({ quality: 82 }).toFile(path.join(dest, nome + '.webp'));
}
for (const f of ['logo-branco.png', 'logo-cor.png', 'marca-cor.png', 'marca-branca.png', 'icone.png']) fs.copyFileSync(path.join(aqui, 'img', f), path.join(dest, f));
console.log('patoindustria: imagens convertidas');
