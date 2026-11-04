// node clientes/g4tool/_origem/gerar.mjs  (prints: node componentes/gerador/prints.mjs g4tool http://g4tool.com/)
import path from 'node:path';
import C from './conteudo.mjs';
import { gerarUS } from '../../../componentes/gerador/us-shop.mjs';
import { prepImgs } from '../../../componentes/gerador/webp.mjs';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const RAW = '/mnt/project-files/prospeccao/cnc-usa/selecao-15/raw/g4tool/img';
await prepImgs(path.join(aqui, '../public'), RAW, {
  'hero-1': 'n5.png', 'hero-2': 'n1.png', 'hero-3': 'n4.png', 'hero-4': 'n3.png',
  'serv-vmc': 'n4.png', 'serv-torno': 'n1.png', 'serv-ve': 'n5.png', 'serv-edm': 'n6.png',
  sobre: 'n6.png',
  g1: 'n5.png', g2: 'n1.png', g3: 'n4.png', g4: 'n3.png', g5: 'n6.png',
}, null);
await gerarUS(C, path.join(aqui, '..'));
