// node clientes/toolcomp/_origem/gerar.mjs  (prints: node componentes/gerador/prints.mjs toolcomp https://www.toolcomp.com/)
import path from 'node:path';
import C from './conteudo.mjs';
import { gerarUS } from '../../../componentes/gerador/us-shop.mjs';
import { prepImgs } from '../../../componentes/gerador/webp.mjs';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const RAW = '/mnt/project-files/prospeccao/cnc-usa/selecao-15/raw/toolcomp/img';
await prepImgs(path.join(aqui, '../public'), RAW, {
  'hero-1': 'turning345.jpg', 'hero-2': 'c-milling1.jpg', 'hero-3': 'c-grinding1.jpg', 'hero-4': 'grinding345.jpg',
  'serv-fresa': 'milling345.jpg', 'serv-retifica': 'c-grinding1.jpg', 'serv-torno': 'c-turning1.jpg', 'serv-furo': 'c-drilling12.jpg',
  sobre: 'company_blb.jpg',
  g1: 'turning345.jpg', g2: 'milling345.jpg', g3: 'grinding345.jpg', g4: 'c-milling1.jpg', g5: 'c-grinding1.jpg', g6: 'c-turning1.jpg', g7: 'c-drilling12.jpg', g8: 'company_blb.jpg',
}, C.logo);
await gerarUS(C, path.join(aqui, '..'));
