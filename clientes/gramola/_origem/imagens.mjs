// Converte logo, fotos e peças da Gramola em arquivos leves para public/assets/.
// Origem (fora do repositório): /mnt/project-files/gramola/originais (logo e fundo do site atual,
// fotos tiradas do catálogo em PDF) e /mnt/project-files/gramola/pecas (foto de cada peça, recortada do catálogo).
//   node clientes/gramola/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = process.env.ORIGINAIS || '/mnt/project-files/gramola/originais';
const pecas = process.env.PECAS || '/mnt/project-files/gramola/pecas';
const dest = path.join(aqui, '../public/assets/img');
const destP = path.join(aqui, '../public/assets/p');
fs.mkdirSync(dest, { recursive: true });
fs.mkdirSync(destP, { recursive: true });
const o = f => path.join(ori, f);

// logo: azul original, versão branca para fundo escuro
await sharp(o('GRAMOLA-LOGOTIPO-AZUL.png')).png().toFile(path.join(dest, 'logo-azul.png'));
const { data, info } = await sharp(o('GRAMOLA-LOGOTIPO-AZUL.png')).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) { data[i] = data[i + 1] = data[i + 2] = 255; }
await sharp(data, { raw: info }).png().toFile(path.join(dest, 'logo-branco.png'));
await sharp(o('cropped-FAVICONS.png')).resize(180).png().toFile(path.join(dest, 'favicon.png'));

// fundo do site atual (caminhões com azul) e foto aérea da fábrica (página 2 do catálogo)
await sharp(o('BACKGROUND.png')).resize({ width: 1920 }).webp({ quality: 78 }).toFile(path.join(dest, 'hero.webp'));
await sharp(o('catalogo-p2-fabrica.jpg')).extract({ left: 0, top: 2560, width: 2553, height: 1021 }).resize({ width: 1800 }).webp({ quality: 78 }).toFile(path.join(dest, 'fabrica.webp'));
await sharp(o('catalogo-p2-fabrica.jpg')).extract({ left: 250, top: 2580, width: 1700, height: 1000 }).resize({ width: 1000 }).webp({ quality: 78 }).toFile(path.join(dest, 'fabrica-quadro.webp'));
await sharp(o('catalogo-capa.jpg')).resize({ width: 700 }).webp({ quality: 80 }).toFile(path.join(dest, 'capa-catalogo.webp'));

// fotos de abertura de cada marca no catálogo
const marcas = { mercedes: 'mercedes.jpg', scania: 'scania.jpg', volvo: 'volvo.jpg', volkswagen: 'volkswagen.jpg', ford: 'ford.jpg', iveco: 'iveco.jpg' };
for (const [n, f] of Object.entries(marcas)) {
  await sharp(o(f)).resize({ width: 1600, height: 1000, fit: 'cover', position: 'attention' }).webp({ quality: 76 }).toFile(path.join(dest, `marca-${n}.webp`));
  await sharp(o(f)).resize({ width: 640, height: 760, fit: 'cover', position: 'attention' }).webp({ quality: 76 }).toFile(path.join(dest, `marca-${n}-v.webp`));
}

// peças: o nome do arquivo de origem vem de pecas.json (código -> arquivo)
const mapa = JSON.parse(fs.readFileSync(path.join(aqui, 'pecas.json'), 'utf8'));
let n = 0;
for (const [slug, arq] of Object.entries(mapa)) {
  await sharp(path.join(pecas, arq)).resize({ width: 420, height: 420, fit: 'inside', withoutEnlargement: true }).flatten({ background: '#ffffff' }).webp({ quality: 80 }).toFile(path.join(destP, slug + '.webp'));
  n++;
}
console.log(`gramola: ${n} peças em public/assets/p`);
