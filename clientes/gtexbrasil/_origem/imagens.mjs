// Converte as imagens do site atual da GTEX em arquivos leves para public/assets/img/.
// Os originais (46 MB, baixados pelo proxy de imagens do GitHub, lista em imagens.md) ficam fora do repositório,
// na pasta do projeto: /mnt/project-files/gtexbrasil/originais. Rodar só quando chegar foto nova:
//   ORIGINAIS=/mnt/project-files/gtexbrasil/originais node clientes/gtexbrasil/_origem/imagens.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { produtos } from './conteudo.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = process.env.ORIGINAIS || '/mnt/project-files/gtexbrasil/originais';
const dest = path.join(aqui, '../public/assets/img');
fs.mkdirSync(dest, { recursive: true });

// [nome final, arquivo original, largura máxima]
const lista = [
  ['marca-urca', '2025_03_urca-gtex.png', 400], ['marca-baby-soft', '2025_07_baby-soft-gtex2.png', 400],
  ['marca-ufe', '2025_03_ufe-gtex.png', 400], ['marca-ruth', '2025_03_ruth-gtex.png', 400],
  ['marca-classic', '2025_03_classic-gtex.png', 400], ['marca-amazon', '2025_06_amazon-gtex.png', 400],
  ['eureciclo', '2025_06_banner-home-reciclo.png', 300],
  // banners e fotos do site atual
  ['banner-tira-manchas', '2026_03_banner-home-mar26-tira-mancha-5L-fundo.jpg', 1920],
  ['banner-desinfetantes', '2026_03_banner-home-mar26-novas-versoes-desinf3.jpg', 1920],
  ['banner-cristal', '2026_03_banner-home-mar26-cristal-fundo.jpg', 1920],
  ['fundo-sala', '2025_08_fundo-banner-1-gtex.jpg', 1920], ['fundo-cozinha', '2025_07_fundo-banner2-home.jpg', 1920], ['fundo-toalhas', '2025_08_fundo-banner3-home3.jpg', 1920],
  ['linha-completa', '2026_03_pag-produtos-mar26-topo.png', 1400],
  ['evento', '2025_09_gtex-home-quem-somos-set25.jpg', 1024], ['colaborador', '2026_03_Imagem8.png', 963],
  ['equipe', '2025_09_foto-trabalhe-conosco-home-ago25.png', 1280],
  ['cat-lavanderia', '2025_06_categorias-lavanderia-1024x697.jpg', 1024], ['cat-toda-a-casa', '2025_06_categorias-toda-a-casa-1024x697.jpg', 1024],
  ['cat-cozinha', '2025_06_categorias-cozinha-1024x697.jpg', 1024], ['cat-linha-coco', '2025_06_categorias-linha-coco-1024x697.jpg', 1024],
  ['urca-familia', '2025_08_Group-296.png', 727], ['babysoft-familia', '2025_08_foto-topo-marcas-baby-soft2.png', 625],
  ['bsft-po', '2026_04_GTEX-BSFT-BANNERS-abr26-2.jpg', 1400], ['bsft-ame', '2025_11_GTEX_BSFT_003_BANNERS_LP_BANNER-1-1.jpg', 1400],
  ['bsft-vermelho', '2025_11_GTEX_BSFT_003_BANNERS_LP_BANNER-4-1.jpg', 1400], ['bsft-cobre', '2025_11_GTEX_BSFT_003_BANNERS_LP_BANNER-5-1.jpg', 1400],
  ['ufe-banner', '2025_09_Babysoft_banner-1-1.png', 1440], ['ruth-banner', '2026_04_ruth-care-banner-produtos-2026.png', 1102],
  ['classic-banner', '2025_09_classic-banner-foto2-1.jpg', 676], ['classic-logo-banner', '2025_09_classic-banner-logo.jpg', 464],
  ['amazon-banner', '2026_04_amazonh2o-banner-foto2.png', 524],
];
// embalagens de cada produto
for (const p of produtos) for (const e of p.emb) lista.push([e.img, e.f, 640]);

let n = 0;
for (const [nome, arq, w] of lista) {
  const src = path.join(ori, arq);
  if (!fs.existsSync(src)) { console.warn('faltou', arq); continue; }
  await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80, alphaQuality: 90 }).toFile(path.join(dest, nome + '.webp'));
  n++;
}
await sharp(path.join(ori, '2025_03_logo-gtex.png')).toFile(path.join(dest, 'logo-gtex.png'));
await sharp(path.join(ori, '2025_03_logo-gtex.png')).webp({ quality: 90 }).toFile(path.join(dest, 'logo-gtex.webp'));
await sharp(path.join(ori, '2025_03_cropped-favicon-gtex-270x270.png')).resize(180).png().toFile(path.join(dest, 'favicon.png'));
console.log(`gtexbrasil: ${n} imagens em public/assets/img`);
