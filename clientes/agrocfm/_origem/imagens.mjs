// Converte as fotos baixadas do site atual (wp-content/uploads, pasta orig/) para webp em public/assets/img e grava dim.json.
// Uso: node clientes/agrocfm/_origem/imagens.mjs <pasta-orig>
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const sharp = createRequire(import.meta.url)(path.join(aqui, '../../../node_modules/sharp'));
const O = process.argv[2];
const D = path.join(aqui, '../public/assets/img');
const fotos = { // nome: [arquivo do site atual, largura máxima]
  'hero-rebanho': ['home1.jpg', 1600], 'pasto-ceu': ['Foto2-NovaSafraTouros-TourosCFM-scaled.jpg', 1600], 'rebanho-serra': ['Novilha_Sobreano_CFM_17-scaled.jpg', 1600],
  'rebanho-arvore': ['MATERIA-TECNICA-Vaca_CFM_12-scaled.jpg', 1400], 'rebanho-sombra': ['RUBS8695.jpg', 1400], 'novilhas-arvore': ['novilhas_arvore2.jpg', 1400],
  'touros-pasto': ['Touros_CFM.jpg', 1400], 'touros-diogo': ['Touros-Nelore-CFM-por-Diogo-Franca.jpg', 1600], 'touros-close': ['TOUROSCFM2.jpg', 640],
  'novilhas': ['novilhas_CFM-scaled.jpg', 1400], 'rebanho-lago': ['DSCN3113.jpg', 1200], 'aerea-pasto': ['Foto3-Prevensao-FazendaCFM-scaled.jpg', 1600],
  'paisagem': ['IMG_9267.jpg', 1400], 'serra-mata': ['foto-prducao-sustentavel-TourosCFM.jpg', 1200], 'equipe': ['Foto-EquipeCFM.jpg', 1200],
  'leilao-pista': ['Megaleilao2023_fotoCFM.jpg', 1200], 'leilao-pista-2': ['Megaleilao-IMG_8663.jpg', 1200], 'leilao-recinto': ['IMG_8695.jpg', 1200],
  'leilao-ceip': ['MegaleilaoCFM2014_25-scaled.jpg', 1200], 'leilao-curral': ['MegaleilaoCFM2014_50-scaled.jpg', 1200], 'leilao-curral-2': ['foto-leilao-tourosCFM.jpg', 1200],
  'pecuaria': ['empresa-pecuaria.jpg', 640], 'pecuaria-2': ['empresa-pecuaria-1.jpg', 640], 'cana': ['empresa-cana.jpg', 640], 'floresta': ['empresa-floresta.jpg', 640],
  'faixa-pecuaria': ['pagina-interna-pecuaria-de-corte.jpg', 1110], 'faixa-cana': ['pagina-interna-cana-de-acucar.jpg', 1110], 'faixa-floresta': ['pagina-interna-floresta.jpg', 1110],
  'avaliacao': ['foto-avaliacao-genetica.jpg', 562], 'touro-indice': ['foto-touro-indiceCFM.jpg', 408], 'touro-centrais': ['foto-touro-CFM-Centrais.jpg', 534],
  'fabuloso-chao': ['cfm-encontro-scaled.jpg', 1200], 'rebanho-midia': ['foto-cfm-na-midia.jpg', 621],
  'leilao-2026': ['Post_Leilao-Virtual-Nelore-2026.jpg', 900], 'leilao-2026-info': ['leilao-5.jpg', 800],
  'sumario-2026': ['sum-1.jpg', 700], 'sumario-2025': ['Sumamio-Nelore-CFM-2025-2026-capa.png', 700],
  'news-leilao': ['news-cfm-2.jpg', 800], 'news-carne': ['news-sdsds.png', 800], 'news-elnino': ['news-ddssd.png', 800], 'news-estrategia': ['news-dsa.png', 800], 'news-monta': ['news-Imagem1.png', 800],
  'parc-bellman': ['parceiros-Bellman-1.jpg', 400], 'parc-neogen': ['parceiros-Neogen.jpg', 400], 'parc-belavista': ['Central-Bela-Vista.png', 400],
};
for (const n of ['Colosso', 'Diesel', 'Eleito', 'Encontro', 'Fabuloso', 'Guru', 'Heroi', 'Hulk', 'Imperador', 'Supremo']) fotos[`touro-${n.toLowerCase()}`] = [`CFM-${n}.jpg`, 500];
fs.mkdirSync(D, { recursive: true });
const dim = {};
for (const [k, [f, w]] of Object.entries(fotos)) {
  const info = await sharp(path.join(O, f)).resize({ width: w, withoutEnlargement: true }).webp({ quality: 76 }).toFile(path.join(D, `${k}.webp`));
  dim[k] = [info.width, info.height];
}
// Logo: o SVG original do site (verde, vermelho e preto) e uma versão clara para fundos escuros.
const svg = fs.readFileSync(path.join(aqui, 'logo-original.svg'), 'utf8');
const branco = svg.replace(/#006130/g, '#FFFFFF').replace(/#9D9D9C/g, '#FFFFFF').replace(/<path(?![^>]*fill=)/g, '<path fill="#FFFFFF"');
for (const [nome, s] of [['logo', svg], ['logo-branco', branco]]) await sharp(Buffer.from(s), { density: 600 }).resize({ width: 630 }).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(D, `../${nome}.webp`));
await sharp(path.join(O, 'cropped-logo_AgroCFM_icon.png')).resize(96).webp({ quality: 90 }).toFile(path.join(D, '../favicon.webp'));
fs.writeFileSync(path.join(aqui, 'dim.json'), JSON.stringify(dim, null, 0));
console.log(Object.keys(dim).length, 'fotos');
