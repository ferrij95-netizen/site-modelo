// Prepara as imagens a partir dos originais baixados do site atual (guardados em /mnt/project-files/quysanta/originais/).
// As fotos do site atual são pequenas (200 a 440 px); aqui são ampliadas 2x com nitidez leve para telas de alta densidade.
// node clientes/quysanta/_origem/imagens.mjs
import sharp from 'sharp';
import path from 'node:path';

const orig = '/mnt/project-files/quysanta/originais';
const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public/assets');
const amplia = (f, saida, { fator = 2, crop, q = 82 } = {}) => {
  let s = sharp(path.join(orig, f));
  if (crop) s = s.extract(crop);
  return s.metadata().then(m => {
    const w = (crop ? crop.width : m.width) * fator;
    return s.resize({ width: w, kernel: 'lanczos3' }).sharpen({ sigma: 0.8 }).webp({ quality: q }).toFile(path.join(pub, saida));
  });
};

await amplia('latacocadagrande.png', 'img/lata.webp', { q: 88 });
await amplia('latacocadagrande.png', 'img/lata-recorte.webp', { crop: { left: 0, top: 0, width: 348, height: 352 }, q: 88 });
await amplia('minilatacocada.png', 'img/lata-mini.webp', { q: 88 });
await amplia('fotoempresa1.jpg', 'img/fabrica-fachada.webp');
await amplia('fotoempresa2.jpg', 'img/fabrica-caminhao.webp');
await amplia('fotoempresa3.jpg', 'img/fabrica-producao.webp');
await amplia('minireceitas.jpg', 'img/cozinheira.webp');
await amplia('surpresa-de-biscoito-e12864.jpg', 'img/receita-surpresa-de-biscoito.webp');
await amplia('torta-romeu-julieta.jpg', 'img/receita-pao-doce-romeu-e-julieta.webp');
await amplia('receita_barrinhas-de-cereai.jpg', 'img/receita-barrinhas-crocantes.webp');
await amplia('como-fazer-rapadura-de-coco.jpg', 'img/receita-rapadura-de-coco.webp');
// Faixa "Aproveite os doces momentos da vida!" do topo do site atual: as sete fotos e a frase, recortadas uma a uma.
const tiras = [[68, 90, 276], [160, 126, 246], [290, 126, 246], [420, 126, 246], [550, 120, 246], [674, 126, 246], [804, 94, 276]];
for (const [i, [x, w, y]] of tiras.entries()) await amplia('bgtopo.jpg', `img/momento-${i + 1}.webp`, { crop: { left: x, top: y, width: w, height: 388 - y } });
await amplia('bgtopo.jpg', 'img/frase-momentos.webp', { crop: { left: 432, top: 394, width: 520, height: 52 }, q: 90 });
for (let i = 1; i <= 8; i++) await sharp(path.join(orig, `clientes/cliente0${i}.jpg`)).webp({ quality: 90 }).toFile(path.join(pub, `clientes/cliente0${i}.webp`));
// Fotos de apoio (Wikimedia Commons, créditos no LEIA-ME): só onde o site atual não tem foto.
await sharp(path.join(orig, 'Coconut__halved___3330701660_.jpg')).resize({ width: 1400 }).webp({ quality: 80 }).toFile(path.join(pub, 'img/coco.webp'));
await sharp(path.join(orig, 'Cocada_amarela.jpg')).resize({ width: 1200 }).webp({ quality: 80 }).toFile(path.join(pub, 'img/doce-cremoso.webp'));
await sharp(path.join(orig, 'Grated_Coconut.jpg')).resize({ width: 1200 }).webp({ quality: 80 }).toFile(path.join(pub, 'img/coco-ralado.webp'));
await sharp(path.join(orig, 'favicon.ico')).resize(64, 64, { kernel: 'nearest' }).png().toFile(path.join(pub, 'favicon.png')).catch(() => {});
console.log('quysanta: imagens prontas');
