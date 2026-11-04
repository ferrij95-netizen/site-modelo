// node clientes/suburbantool/_origem/gerar.mjs  (prints: node componentes/gerador/prints.mjs suburbantool http://www.suburbantool.com/)
import path from 'node:path';
import C from './conteudo.mjs';
import { gerarUS } from '../../../componentes/gerador/us-shop.mjs';
import { prepImgs } from '../../../componentes/gerador/webp.mjs';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const RAW = '/mnt/project-files/prospeccao/cnc-usa/selecao-15/raw/suburbantool/img';
await prepImgs(path.join(aqui, '../public'), RAW, {
  'hero-1': 'part-p_molding_lg_png-0.jpg', 'hero-2': 'part-tool-edm-1.jpg', 'hero-3': 'part-tool-milling-1.jpg', 'hero-4': 'part-inspection-tool-0.jpg',
  'serv-eng': 'part-tool-services2-0.jpg', 'serv-molde': 'part-tool-services3-0.jpg', 'serv-edm': 'part-tool-edm-0.jpg', 'serv-reparo': 'laserstar.jpg', 'serv-insp': 'part-inspection-tool-2.jpg',
  sobre: 'predio.jpg',
  g01: 'part-p_molding_lg_png-2.jpg', g02: 'part-tool-edm-1.jpg', g03: 'part-tool-milling-0.jpg', g04: 'tool-lathe.jpg', g05: 'part-inspection-tool-1.jpg', g06: 'part-tool-milling-1.jpg',
  g07: 'part-tool-milling-2.jpg', g08: 'part-tool-services3-1.jpg', g09: 'part-u1036-0.jpg', g10: 'part-u1036-1.jpg', g11: 'part-p_molding_lg_png-1.jpg', g12: 'part-tool-edm-2.jpg',
}, C.logo);
await gerarUS(C, path.join(aqui, '..'));
