// node clientes/pmtmachining/_origem/gerar.mjs  (prints: node componentes/gerador/prints.mjs pmtmachining http://pmtmachining.com/)
import path from 'node:path';
import C from './conteudo.mjs';
import { gerarUS } from '../../../componentes/gerador/us-shop.mjs';
import { prepImgs } from '../../../componentes/gerador/webp.mjs';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const RAW = '/mnt/project-files/prospeccao/cnc-usa/selecao-15/raw/pmtmachining/img';
await prepImgs(path.join(aqui, '../public'), RAW, {
  'hero-1': 'P1010065_md.jpg', 'hero-2': 'P1010018_md.jpg', 'hero-3': 'P1010053_md.jpg', 'hero-4': 'P1010036_md.jpg',
  'serv-cnc': 'P1010082_md.jpg', 'serv-oem': 'P1010020_md.jpg', 'serv-plast': 'P1010042_md.jpg', 'serv-fab': 'P1010049_md.jpg', 'serv-dist': 'rollerbearings.jpg',
  sobre: 'building2014.jpg',
  g1: 'P1010018_md.jpg', g2: 'P1010065_md.jpg', g3: 'P1010036_md.jpg', g4: 'P1010058_md.jpg', g5: 'P1010034_md.jpg', g6: 'P1010086_md.jpg', g7: 'P1010040_md.jpg', g8: 'P1010043_md.jpg',
  g9: 'P1010022_md.jpg', g10: 'P1010053_md.jpg', g11: 'P1010039_md.jpg', g12: 'P1010049_md.jpg',
}, null);
await gerarUS(C, path.join(aqui, '..'));
