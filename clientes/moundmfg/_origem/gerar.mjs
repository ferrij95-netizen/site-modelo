// node clientes/moundmfg/_origem/gerar.mjs  (prints: node componentes/gerador/prints.mjs moundmfg http://www.moundmanufacturing.com/)
import path from 'node:path';
import C from './conteudo.mjs';
import { gerarUS } from '../../../componentes/gerador/us-shop.mjs';
import { prepImgs } from '../../../componentes/gerador/webp.mjs';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const RAW = '/mnt/project-files/prospeccao/cnc-usa/selecao-15/raw/moundmfg/img';
await prepImgs(path.join(aqui, '../public'), RAW, {
  'hero-1': 'DSCF0197.jpg', 'hero-2': 'DSCF0126.jpg', 'hero-3': 'DSCF0093.jpg', 'hero-4': 'DSCF0022.jpg',
  'serv-exot': 'DSCF0197.jpg', 'serv-maq': 'DSCF0126.jpg', 'serv-gage': 'Analex_005.jpg', 'serv-proto': 'DSCF0012.jpg',
  sobre: 'Contact-Us__element27.jpg',
  g1: 'DSCF0197.jpg', g2: 'DSCF0126.jpg', g3: 'DSCF0093.jpg', g4: 'DSCF0022.jpg', g5: 'Analex_005.jpg', g6: 'DSCF0012.jpg', g7: 'img2.jpg', g8: 'Contact-Us__element27.jpg',
}, null);
await gerarUS(C, path.join(aqui, '..'));
