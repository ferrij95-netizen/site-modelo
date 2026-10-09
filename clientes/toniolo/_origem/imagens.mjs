// Prepara as imagens do site em public/assets/ (webp leves, logos, favicon).
// Rodar só quando chegar foto nova: node clientes/toniolo/_origem/imagens.mjs
// Fotos de obra: recortes das artes do blog do site atual (fotos reais da empresa, sem o texto por cima), em fotos/.
// Abertura: foto do Unsplash (licença livre) até a empresa mandar o vídeo de drone que usa hoje no site.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public/assets');
const dest = path.join(pub, 'img');
fs.mkdirSync(path.join(pub, 'clientes'), { recursive: true });
fs.mkdirSync(dest, { recursive: true });

// Fotos de obra (já recortadas em fotos/ por recortes.py).
for (const f of fs.readdirSync(path.join(aqui, 'fotos'))) {
  await sharp(path.join(aqui, 'fotos', f)).webp({ quality: 82 }).toFile(path.join(dest, f.replace(/\.\w+$/, '.webp')));
}
// Capas do blog, inteiras, para a página Blog.
const blog = [['arte-desaguamento', 'blog03-capa.png'], ['arte-anfibia', 'toniolo_blog2_arte.png'], ['arte-desassoreamento', 'blog01-desassoreamento-capa.png'],
  ['arte-descaracterizacao', 'BGTJUL-2.png'], ['arte-macrofitas', 'blog01-arte.png'], ['arte-empilhamento', 'BGTMAI-1.png'], ['arte-interface', 'BLOG-GRUPO-TONIOLO-ABR-1.png'],
  ['arte-dragagem', 'BGTMAR-1.png'], ['arte-sabre', 'BLOG-GRUPO-TONIOLO-OUT25-2.png']];
for (const [n, f] of blog) await sharp(path.join(aqui, 'img', f)).webp({ quality: 80 }).toFile(path.join(dest, n + '.webp'));

// Fotos de banco (Unsplash).
const banco = [['abertura', 'unsplash-1587919968590-fbc98cea6c9a.jpg', 2000], ['mina', 'unsplash-1523848309072-c199db53f137.jpg', 1800], ['cava', 'unsplash-1680463990599-9d318aaecf71.jpg', 1800]];
for (const [n, f, w] of banco) await sharp(path.join(aqui, 'img', f)).resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(dest, n + '.webp'));

// Quadro do vídeo institucional (mesma foto que o site atual usa na seção Quem somos).
await sharp(path.join(aqui, 'img', 'imagem-sobre-toniolo.fw_.png')).extract({ left: 153, top: 27, width: 354, height: 410 }).webp({ quality: 84 }).toFile(path.join(dest, 'video-quadro.webp')).catch(() => {});

// Mapa de atuação, certificado e logos.
await sharp(path.join(aqui, 'img', 'mapa-toniolo-ok.fw_.png')).webp({ quality: 86 }).toFile(path.join(dest, 'mapa.webp'));
await sharp(path.join(aqui, 'img', 'certi-toniolo-1.fw_.png')).webp({ quality: 84 }).toFile(path.join(dest, 'premio-anglo.webp'));
fs.copyFileSync(path.join(aqui, 'img', 'logo.fw_.png'), path.join(pub, 'logo-toniolo-claro.png'));
fs.copyFileSync(path.join(aqui, 'img', 'logo-escuro.png'), path.join(pub, 'logo-toniolo-escuro.png'));
await sharp(path.join(aqui, 'img', 'cropped-favicon-270x270.png')).resize(192, 192).png().toFile(path.join(pub, 'favicon.png'));

const logos = { 'anglo-american': 'anglo-toniolo', vale: 'vale-toniolo', csn: 'csn-toniolo', mosaic: 'mosaic-toniolo', usiminas: 'usiminas-toniolo', anglogold: 'anglo-site' };
for (const c of ['cmoc', 'cr-almeida', 'estre', 'grupo-aterpa', 'inb', 'jmaluceli', 'kinross', 'odebrecht', 'pref-itabirito', 'sanepar', 'santo-antonio', 'tibagi', 'vetria', 'neoenergia', 'nexa']) logos[c] = c + '-site';
for (const [n, f] of Object.entries(logos)) {
  // Os logos vêm em cartões brancos de 200x108; corta a borda para caber no cartão do site novo.
  await sharp(path.join(aqui, 'img', f + '.fw_.png')).extract({ left: 6, top: 6, width: 188, height: 96 }).flatten({ background: '#ffffff' }).png().toFile(path.join(pub, 'clientes', n + '.png'));
}
console.log('toniolo: imagens prontas em public/assets');
