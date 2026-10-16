// Fotos reais do site atual (globalmicrofusao.com.br/wp-content/uploads) convertidas para webp em public/assets/img.
// O site atual tem só três fotos de fábrica (001, 002 e fundicao; 002 e fundicao são a mesma cena): daqui saem os recortes.
// Rodar quando chegar foto nova: node clientes/globalmicrofusao/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = f => path.join(aqui, 'img', f);
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });
const webp = (img, n, q = 80) => img.webp({ quality: q }).toFile(path.join(dest, n + '.webp'));

await webp(sharp(ori('vazamento.jpg')).resize({ width: 1920 }), 'vazamento');
await webp(sharp(ori('vazamento.jpg')).extract({ left: 540, top: 470, width: 760, height: 610 }).sharpen({ sigma: 0.6 }), 'cacho');
await webp(sharp(ori('vazamento.jpg')).extract({ left: 860, top: 90, width: 940, height: 640 }), 'panela');
await webp(sharp(ori('faiscas.jpg')), 'faiscas');
await webp(sharp(ori('faiscas.jpg')).extract({ left: 380, top: 60, width: 900, height: 700 }), 'faiscas-perto');
await webp(sharp(ori('diagrama.jpg')).resize({ width: 900, kernel: 'lanczos3' }).sharpen({ sigma: 0.8 }), 'diagrama', 88);
await webp(sharp(ori('banco-inox-ornl.jpg')), 'banco-inox');
console.log('globalmicrofusao: imagens', fs.readdirSync(dest).length);
