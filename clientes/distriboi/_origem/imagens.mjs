// Converte as fotos de img/ em webp para public/assets/img. Rodar quando chegar foto nova:
// node clientes/distriboi/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });
const img = f => path.join(aqui, 'img', f);

// Foto real da fachada de Ji-Paraná (677x510): corta a faixa de baixo, que tem marcas cinza.
await sharp(img('fachada-ji-parana.jpg')).extract({ left: 0, top: 40, width: 677, height: 400 }).webp({ quality: 84 }).toFile(path.join(dest, 'fachada.webp'));
await sharp(img('fachada-ji-parana.jpg')).extract({ left: 480, top: 150, width: 197, height: 150 }).resize(394, 300).webp({ quality: 84 }).toFile(path.join(dest, 'fachada-placa.webp'));
// Fundo vermelho com o boi, do aviso "Vem aí um novo site" do distriboi.com.br.
await sharp(img('fundo-boi.png')).webp({ quality: 80 }).toFile(path.join(dest, 'fundo-boi.webp'));
await sharp(img('fundo-boi-celular.png')).webp({ quality: 80 }).toFile(path.join(dest, 'fundo-boi-celular.webp'));
for (const f of fs.readdirSync(path.join(aqui, 'img')).filter(f => /^banco-/.test(f))) {
  await sharp(img(f)).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(dest, f.replace(/\.[a-z]+$/i, '.webp')));
}
console.log('distriboi: imagens', fs.readdirSync(dest).length);
