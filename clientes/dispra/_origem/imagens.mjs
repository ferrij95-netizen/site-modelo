// Converte as imagens do site atual (img/) e as fotos de banco em webp leves para public/assets/img/.
// Rodar só quando chegar foto nova: node clientes/dispra/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = path.join(aqui, 'img');
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });

// [nome final, arquivo original, largura máxima]. "real-*" vêm do site atual; "*-banco" são fotos de banco (Unsplash).
const lista = [
  ['caminhoes', 'real-caminhoes.jpg', 1600],
  ['laboratorio', 'real-laboratorio.jpg', 1000],
  ['fabrica-pni', 'real-fabrica-pni.jpg', 900],
  ['fabrica-bpf', 'real-fabrica-bpf.jpg', 1100],
  ['sede', 'real-sede.jpg', 600],
  ['selos', 'real-selos-bpf-haccp.png', 540],
  ['gado-corte-real', 'real-gado-corte.jpg', 1400],
  ['gado-leite-real', 'real-gado-leite.jpg', 1600],
  ['telemarketing', 'real-telemarketing.jpg', 350],
  ['caminhao-mapa', 'real-caminhao-mapa.jpg', 380],
  ['nt51', 'real-nt51.jpg', 216],
  ['raktil', 'real-raktil.png', 218],
  ['logo-pni', 'logo-pni.png', 400],
  ['hero-corte', 'corte5-banco.jpg', 2000],
  ['hero-leite', 'leite2-banco.jpg', 2000],
  ['corte', 'corte2-banco.jpg', 1000],
  ['leite', 'leite3-banco.jpg', 900],
  ['leite-rebanho', 'leite1-banco.jpg', 1400],
  ['suinos', 'suino1-banco.jpg', 900],
  ['equinos', 'equino1-banco.jpg', 900],
  ['ovinos', 'ovino-banco.jpg', 900],
  ['caprinos', 'caprino-banco.jpg', 900],
  ['aves', 'aves1-banco.jpg', 900],
  ['vaca', 'vaca-banco.jpg', 900],
];

// Fotos pequenas do site atual: aumentar só um pouco (até 2x) para não ficarem minúsculas em telas grandes.
for (const [nome, arq, larg] of lista) {
  const meta = await sharp(path.join(ori, arq)).metadata();
  const alvo = Math.min(larg, (meta.width || larg) * 2);
  await sharp(path.join(ori, arq)).toColourspace('srgb').resize({ width: alvo }).webp({ quality: 82 }).toFile(path.join(dest, nome + '.webp'));
  console.log(nome, alvo);
}
for (const f of ['logo-dispra.svg', 'logo-dispra-branco.svg']) fs.copyFileSync(path.join(ori, f), path.join(dest, f));
