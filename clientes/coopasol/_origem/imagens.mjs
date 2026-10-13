// Recortes da foto dos silos enviada pelo João (img/silos-joao.png, 1280x960) e demais fotos de img/ em webp.
// Rodar quando chegar foto nova: node clientes/coopasol/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });
const ori = path.join(aqui, 'img/silos-joao.png');
const rec = { capa: [0, 40, 1280, 760], 'silos-detalhe': [470, 110, 810, 560], barracao: [0, 250, 1280, 420], gramado: [0, 120, 1280, 560] };
for (const [nome, [left, top, width, height]] of Object.entries(rec)) {
  await sharp(ori).extract({ left, top, width, height }).modulate({ saturation: 1.04 }).webp({ quality: 82 }).toFile(path.join(dest, nome + '.webp'));
}
for (const f of fs.readdirSync(path.join(aqui, 'img')).filter(f => /^banco-/.test(f))) {
  await sharp(path.join(aqui, 'img', f)).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(dest, f.replace(/\.[a-z]+$/i, '.webp')));
}
console.log('coopasol: imagens', fs.readdirSync(dest).length);
