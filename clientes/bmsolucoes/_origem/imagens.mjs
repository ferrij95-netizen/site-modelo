// Prepara as imagens do site em public/assets/ (webp leves, logos, favicon, ícones).
// Rodar só quando chegar foto nova: node clientes/bmsolucoes/_origem/imagens.mjs
// Todas as fotos vêm do site atual (bmsolucoesemacos.com.br), baixadas pelo proxy de imagens do GitHub (lista em imagens.md).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ori = f => path.join(aqui, 'img', f);
const pub = path.join(aqui, '../public/assets');
const dest = path.join(pub, 'img');
fs.mkdirSync(dest, { recursive: true });

const salvar = (nome, f, larg = 1600, q = 78) => sharp(ori(f)).resize({ width: larg, withoutEnlargement: true }).webp({ quality: q }).toFile(path.join(dest, nome + '.webp'));

const fotos = {
  // Banners do carrossel do site atual (2500 px).
  'banner-inox': ['51654656.jpg', 2000], 'banner-carbono': ['321321321.jpg', 2000], 'banner-chapa': ['Novo-Projeto.webp', 2000],
  'banner-laser': ['84846648864.jpg', 2000], 'banner-telas-oficina': ['BM-Solucoes-Banner-1-1.jpg', 2000], 'banner-sanitario': ['48864864-1.jpg', 2000],
  'sede-aerea': ['BM-Solucoes-Banner-2.jpg', 2000], 'sede-outdoor': ['444444.png', 1100], 'sede-outdoor-2': ['84846846846.png', 1100],
  'laser-feixe': ['BG-HERO.webp', 1920], 'laser-chapa': ['banner-corte-a-laser.webp', 2000], 'laser-mesa': ['banner-chapa-de-aco-1.webp', 2000],
  'conexoes-mesa': ['banner-conexoes.webp', 2000], 'telas-rolos': ['banner-telas.webp', 2000],
  'fundo-alambrado': ['vecteezy_abstract-line-grid-seamless-pattern-texture-background-of_7875508.jpg', 1400, 70],
  // Fotos de obra (biblioteca do site atual).
  'obra-cerca-branca': ['87897798.jpg', 1080], 'obra-cerca-verde': ['1123321213.jpg', 1080], 'obra-guarda-corpo': ['78987798.jpg', 1080],
  'obra-galpao': ['222.jpg', 1080], 'obra-quadra': ['1.jpg', 1080],
  // Empresa.
  'equipe-tela': ['img-sobre-a-empresa-3.jpg', 366], 'maquina-laser': ['img-sobre-a-empresa-4.jpg', 366], 'chapa-mesa': ['asd864a846486.png', 366],
  'rolos-chapa': ['img-sobre-a-empresa-5.webp', 366], 'laser-pg': ['img-pg-corte-a-laser-1.webp', 560],
  'mao-chapa': ['321213213.png', 350], 'rolos-expandida': ['21313132.png', 350], 'laser-maquina-2': ['848484684.png', 350],
  'acessorios-corrimao-2': ['233121321.jpg', 900], 'spotfeeder': ['Sem-Titulo-1.jpg', 900], 'suinos': ['Sem-Titulo-2.png', 520],
  // Corte a laser.
  'laser-solicitacao': ['img-solicitacao.jpg', 598], 'laser-orcamento': ['img-orcamento.jpg', 868], 'laser-dimensoes': ['img-dimensoes.jpg', 595],
  'material-carbono': ['img-Aco-carbono.jpg', 185], 'material-galvanizado': ['img-Aco-galvanizado2.jpg', 185], 'material-inox': ['img-Aco-inox.jpg', 185], 'material-aluminio': ['img-aluminio.webp', 185],
  // Especialidades (fotos redondas da home atual).
  'esp-laser': ['4848468.png', 350], 'esp-chapa': ['Titulo.png', 350], 'esp-telas': ['telasicon.png', 512], 'esp-aco': ['987987987987.png', 350], 'esp-conexoes': ['565445354.png', 350],
  // Produtos.
  'prod-laser': ['img1.png', 184], 'prod-chapas': ['img3.png', 184], 'prod-conexoes': ['img4.png', 184], 'prod-arames': ['img6.png', 184], 'prod-aco': ['comercializacaodeaco22.png', 184], 'prod-concertinas': ['img9.png', 184],
  'aco-tubos': ['comercializacao-de-aco.webp', 350], 'aco-chapas': ['img-chapa-em-inox-1.webp', 350], 'aco-tubos-2': ['898989899889.png', 184], 'aco-chapas-2': ['84684684684.png', 184],
  // Telas.
  'tela-soldada-5x10': ['img-Tela-soldada-5x10-fio-1.9mm_.jpg', 463], 'tela-soldada-5x15': ['img-Tela-soldada-5x15-fio-2.3mm.jpg', 463],
  'tela-pvc': ['Tela-Soldada-Plastica-Verde-150Metro-Malha-10x5CM-Morlan-FG1104441-MORLAN.webp', 700], 'tela-viveiro': ['sg-11134201-22100-5z1lwf1q0uiv01.jpg', 700],
  'tela-galinheiro': ['img-Tela-Galinheiro.jpg', 463], 'tela-mangueirao': ['img-tela-mangeirao.jpg', 463], 'tela-fachanet': ['img-Tela-fachanet-reboco.jpg', 463],
  'tela-multy': ['img-Tela-multy-uso.jpg', 463], 'gradil-nr12': ['gradil-insul-g12-pintado-3-80mm-malha-2-5x20cm-3.webp', 700],
  'gradil-galvanizado': ['img-Gradil-G5.webp', 463], 'gradil-epoxi': ['img-Gradil-G4.webp', 463], 'gradil-pvc': ['img-Gradil-revestido.webp', 463],
  'tela-alambrado': ['img-Tela-alambrado.webp', 463], 'tela-otis': ['img-Tela-otis.webp', 463],
  'malha-alambrado': ['01-malha-fio-a-fio.webp', 418], 'malha-otis': ['02-malha-fio-a-fio.webp', 418],
  // Chapas expandidas.
  'chapa-diagrama': ['121231213.png', 930],
  'malha-5x10': ['MT-10-Malha-5x10-min.jpg', 600], 'malha-8x16': ['MT-16-Malha-8x16-min.jpg', 600], 'malha-9x20': ['MT-20-Malha-9x20-min.jpg', 600],
  'malha-12x25': ['MT-25-Malha-12x25-12-min.jpg', 600], 'malha-25x50': ['MT-50-Malha-25x50-min.jpg', 600], 'malha-38x75': ['MT-75-Malha-38x75-min.jpg', 600], 'malha-50x100': ['1-4-Malha-50x100-min.jpg', 600],
  // Conexões.
  'con-galvanizadas': ['img-Conexoes-galvanizadas-.webp', 365], 'con-carbono': ['Conexoes-em-aco-carbono.webp', 365], 'con-inox-solda': ['Conexoes-em-aco-inox-solda.webp', 365],
  'con-inox-od': ['Conexoes-em-aco-inox-padrao-od-.webp', 365], 'con-inox-rosca': ['Conexoes-em-aco-inox-roscadas.webp', 365], 'con-flanges': ['Flange-em-aco-inox-e-carbono.webp', 365],
  'con-valvulas': ['Valvulas.webp', 365], 'con-corrimao': ['32323232.jpg', 365],
  // Arames.
  'arame-farpado': ['img-arame-farpado2.webp', 365], 'arame-galvanizado': ['img-Arame-galvanizado1.webp', 365], 'arame-revestido': ['img-Arame-revestido.jpg', 365],
  'arame-farpado-rolos': ['img5.png', 184],
  // Concertinas.
  'concertina-muro': ['Ativo-8.png', 711], 'concertina-tunel': ['Ativo-4.png', 200], 'concertina-arcos': ['Ativo-7.png', 422], 'concertina-curva': ['Ativo-5.png', 339],
  'concertina-flat': ['Concertina-Flat.webp', 365], 'concertina-flat-2': ['Ativo-9.png', 238], 'concertina-flat-3': ['Ativo-10.png', 258],
  'rede-laminada': ['Rede-Laminada.webp', 365], 'rede-laminada-2': ['Ativo-11.png', 279], 'lanca-v': ['Kit-Lanca-para-Muro-Perfurante-.webp', 365], 'lanca-v-2': ['Ativo-13.png', 251], 'lanca-v-3': ['Ativo-14.png', 176],
};
for (const [nome, [f, larg, q]] of Object.entries(fotos)) await salvar(nome, f, larg, q);
// Rolos de concertina: só a argola, sem o texto que vem ao lado na arte do site atual (o texto vai em HTML).
const argola = async (nome, f, ini, fim) => { const m = await sharp(ori(f)).metadata(); const l = Math.round(m.width * ini); await sharp(ori(f)).extract({ left: l, top: 0, width: Math.round(m.width * fim) - l, height: m.height }).webp({ quality: 84 }).toFile(path.join(dest, nome + '.webp')); };
await argola('concertina-simples-30', 'Ativo-1.png', 0, .43); await argola('concertina-simples-45', 'Ativo-2.png', .58, 1);
await argola('concertina-dupla-30', 'Ativo-5-1.png', 0, .40); await argola('concertina-dupla-45', 'Ativo-6.png', .64, 1);
for (let i = 1; i <= 10; i++) await salvar('obra-' + i, `img-Obras${i}.webp`, 272, 84);

// Ícones dos diferenciais (fundo branco no original): o traço vira transparência, para pintar com a cor de cada versão.
const icones = { comprometimento: 'WhatsApp-Image-2023-02-23-at-16.15.08-4.jpeg', qualidade: 'WhatsApp-Image-2023-02-23-at-16.15.08-2.jpeg', 'custo-beneficio': 'WhatsApp-Image-2023-02-23-at-16.15.08-1.jpeg',
  agilidade: 'WhatsApp-Image-2023-02-23-at-16.15.08.jpeg', solucao: 'WhatsApp-Image-2023-02-23-at-16.15.08-3-1.jpeg' };
for (const [n, f] of Object.entries(icones)) {
  const { data, info } = await sharp(ori(f)).greyscale().raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let p = 0; p < info.width * info.height; p++) { rgba[p * 4 + 3] = Math.max(0, Math.min(255, (235 - data[p]) * 1.3)); }
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile(path.join(dest, `icone-${n}.png`));
}

// Logos: grafite metálico (fundo claro) e branco (fundo escuro), recortados sem a margem transparente.
// Logos recortados sem a margem transparente (feito com PIL: o trim do sharp não pega a margem desses PNGs).
// Favicon: o mesmo do site atual.
await sharp(ori('cropped-FAVICON-min.png')).resize(192, 192).png().toFile(path.join(pub, 'favicon.png'));
console.log('bmsolucoes: imagens prontas');
