// node clientes/hhmach/_origem/gerar.mjs  (prints: node componentes/gerador/prints.mjs hhmach https://www.hhmach.com/)
import path from 'node:path';
import C from './conteudo.mjs';
import { gerarUS } from '../../../componentes/gerador/us-shop.mjs';
import { prepImgs } from '../../../componentes/gerador/webp.mjs';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const RAW = '/mnt/project-files/prospeccao/cnc-usa/selecao-15/raw/hhmach/img';
await prepImgs(path.join(aqui, '../public'), RAW, {
  'hero-1': 'HHM_20087.jpg', 'hero-2': 'HHM_20083.jpg', 'hero-3': 'HHM_20034.jpg', 'hero-4': 'HHM_20092.jpg',
  'serv-swiss': 'HHM_20042.jpg', 'serv-cnc': 'HHM_20089.jpg', 'serv-screw': 'HHM_20015.jpg', 'serv-asm': 'HHM_20067.jpg', 'serv-kanban': 'HHM_20094.jpg',
  'ind-energy': 'HHM_20013.jpg', 'ind-med': 'HHM_20043.jpg', 'ind-elec': 'HHM_20064.jpg', 'ind-plast': 'HHM_20036.jpg', 'ind-trans': 'HHM_20063.jpg', 'ind-equip': 'HHM_20001.jpg',
  sobre: 'HHM_20085.jpg', qual: 'HHM_20071.jpg', mazak: 'Mazak_final.jpg', haas: 'HaasMiniMill20.jpg',
  g1: 'HHM_20087.jpg', g2: 'HHM_20083.jpg', g3: 'HHM_20028.jpg', g4: 'HHM_20056.jpg', g5: 'HHM_20033.jpg', g6: 'HHM_20047.jpg', g7: 'HHM_20012.jpg', g8: 'HHM_20062.jpg',
  g9: 'HHM_20066.jpg', g10: 'HHM_20023.jpg', g11: 'HHM_20075.jpg', g12: 'HHM_20039.jpg',
}, C.logo);
await gerarUS(C, path.join(aqui, '..'));
