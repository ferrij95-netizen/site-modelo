// Converte as fotos reais (site atual + apresentação comercial em PDF) para public/assets/img/*.webp.
// Rodar uma vez: node clientes/transperola/_origem/prepara-fotos.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.dirname(new URL(import.meta.url).pathname);
const orig = f => path.join(dir, 'fotos-originais', f);
const pub = path.join(dir, '../public/assets');
fs.mkdirSync(path.join(pub, 'img'), { recursive: true });

// [saída, arquivo original, recorte {left, top, width, height} ou null, largura final]
const fotos = [
  ['cavalo-vermelho', 'bc.png', { left: 0, top: 0, width: 268, height: 271 }, 536],
  ['sider-ceu', 'bc.png', { left: 317, top: 0, width: 327, height: 271 }, 654],
  ['reflexo', 'bc.png', { left: 697, top: 0, width: 263, height: 271 }, 526],
  ['noite-chuva', 'estrada_chuva.webp', null, 1536],
  ['doca', 'apres-doca.jpg', null, 633],
  ['galpao', 'apres-galpao.jpg', null, 747],
  ['napra', 'apres-napra.jpg', null, 996],
  ['matriz-arte', 'apres-matriz.jpg', null, 946],
  ['bitrem', 'img-frota2.jpg', null, 560],
  ['frota-toco', 'img-frota.jpg', { left: 0, top: 0, width: 560, height: 190 }, 560],
  ['premio', 'img-premios.jpg', { left: 30, top: 0, width: 270, height: 214 }, 270],
  ['estrada', 'banner-01.jpg', { left: 330, top: 0, width: 630, height: 271 }, 630],
];
for (const [nome, f, rec, w] of fotos) {
  let s = sharp(orig(f));
  if (rec) s = s.extract(rec);
  await s.resize({ width: w, kernel: 'lanczos3' }).sharpen({ sigma: 0.6 }).webp({ quality: 82 }).toFile(path.join(pub, 'img', `${nome}.webp`));
  const m = await sharp(path.join(pub, 'img', `${nome}.webp`)).metadata();
  console.log(nome, m.width, m.height);
}

// Logo (PNG transparente que está dentro do Logo.svg do site atual) e favicon (a pérola).
await sharp(orig('Logo-emb0.png')).resize({ width: 640 }).png({ compressionLevel: 9 }).toFile(path.join(pub, 'logo.png'));
await sharp(orig('Logo-emb0.png')).resize({ width: 640 }).webp({ quality: 90 }).toFile(path.join(pub, 'logo.webp'));
await sharp(orig('favicon-emb0.png')).extract({ left: 236, top: 296, width: 330, height: 330 }).resize(96).png().toFile(path.join(pub, 'favicon.png'));
console.log('logo e favicon prontos');
