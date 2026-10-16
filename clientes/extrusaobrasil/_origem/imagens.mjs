// Fotos reais do site atual (extrusaobrasil.com.br/wp-content/uploads) convertidas para webp em public/assets/img.
// As fotos pequenas (menos de 700 px) são ampliadas 2x com nitidez leve; o logo (206x154 no site atual) 3x.
// Rodar quando chegar foto nova: node clientes/extrusaobrasil/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = path.join(aqui, 'img');
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(path.join(dest, 'feiras'), { recursive: true });

async function conv(arq, saida, { max = 1400 } = {}) {
  const img = sharp(path.join(ori, arq));
  const { width } = await img.metadata();
  let p = img;
  if (width < 700) p = p.resize({ width: width * 2, kernel: 'lanczos3' }).sharpen({ sigma: 0.7 });
  else if (width > max) p = p.resize({ width: max });
  await p.webp({ quality: 82, alphaQuality: 90 }).toFile(path.join(dest, saida));
}

for (const f of fs.readdirSync(ori)) {
  if (!/\.(png|jpe?g)$/.test(f) || f === 'logo.png') continue;
  await conv(f, f.replace(/\.(png|jpe?g)$/, '.webp'));
}
// Logo: só existe em 206x154 no site atual. Ampliado 3x até a empresa mandar o vetor.
await sharp(path.join(ori, 'logo.png')).resize({ width: 618, kernel: 'lanczos3' }).sharpen({ sigma: 0.6 }).png().toFile(path.join(dest, 'logo.png'));
await sharp(path.join(ori, 'logo.png')).resize({ width: 618, kernel: 'lanczos3' }).sharpen({ sigma: 0.6 }).webp({ quality: 90 }).toFile(path.join(dest, 'logo.webp'));
// Fotos das feiras (256 px no site atual), sem as capas e sem a arte de fundo de 1280 px.
for (const f of fs.readdirSync(path.join(ori, 'feiras'))) {
  const m = f.match(/^(\w+)-(\d{4})-Extrusao-Brasil-(\d+)\./);
  if (!m) continue;
  const meta = await sharp(path.join(ori, 'feiras', f)).metadata();
  if (meta.width > 600 || meta.width < 240) continue;
  await sharp(path.join(ori, 'feiras', f)).resize({ width: 480, kernel: 'lanczos3' }).sharpen({ sigma: 0.6 }).webp({ quality: 80 })
    .toFile(path.join(dest, 'feiras', `${m[1].toLowerCase()}-${m[2]}-${m[3].padStart(2, '0')}.webp`));
}
console.log('extrusaobrasil: imagens', fs.readdirSync(dest).length, '+ feiras', fs.readdirSync(path.join(dest, 'feiras')).length);
