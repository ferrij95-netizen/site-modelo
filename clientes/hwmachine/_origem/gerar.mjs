// node clientes/hwmachine/_origem/gerar.mjs  (prints: node componentes/gerador/prints.mjs hwmachine http://www.hwmachine.com/)
// O site atual só tem 3 imagens (montagens P&B). Fotos st-* são CC0 do rawpixel (domínio público); ver LEIA-ME.
import path from 'node:path';
import C from './conteudo.mjs';
import { gerarUS } from '../../../componentes/gerador/us-shop.mjs';
import { prepImgs } from '../../../componentes/gerador/webp.mjs';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const RAW = '/mnt/project-files/prospeccao/cnc-usa/selecao-15/raw/hwmachine/img';
await prepImgs(path.join(aqui, '../public'), RAW, {
  'hero-1': 'st-navy.jpg', 'hero-2': 'c-collage.png',
  'serv-geral': 'st-seminole.jpg', 'serv-tela': 'c-parts.png', 'serv-rolo': 'st-steel.jpg', 'serv-rev': 'c-collage.png', 'serv-cad': 'st-mill.jpg',
  sobre: 'c-collage.png',
}, null);
await gerarUS(C, path.join(aqui, '..'));
