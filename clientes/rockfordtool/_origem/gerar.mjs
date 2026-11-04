// node clientes/rockfordtool/_origem/gerar.mjs  (prints: node componentes/gerador/prints.mjs rockfordtool http://rockford2l.com/)
import path from 'node:path';
import C from './conteudo.mjs';
import { gerarUS } from '../../../componentes/gerador/us-shop.mjs';
import { prepImgs } from '../../../componentes/gerador/webp.mjs';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const RAW = '/mnt/project-files/prospeccao/cnc-usa/selecao-15/raw/rockfordtool/img';
await prepImgs(path.join(aqui, '../public'), RAW, {
  'hero-1': 'r002-010.jpg', 'hero-2': 'r001-004.jpg', 'hero-3': 'building.jpg', 'hero-4': 'r001-021.jpg',
  'serv-die': 'cad.jpg', 'serv-cnc': 'r001-021.jpg', 'serv-edm': 'r001-004.jpg', 'serv-prensa': 'r002-010.jpg', 'serv-pecas': 'r001-015.jpg',
  'qual-cert': ['iso2015.PNG', 900], sobre: 'building.jpg',
  g1: 'building.jpg', g2: 'r002-010.jpg', g3: 'r001-015.jpg', g4: 'r001-004.jpg', g5: 'r001-021.jpg', g6: 'cad.jpg',
}, C.logo);
await gerarUS(C, path.join(aqui, '..'));
