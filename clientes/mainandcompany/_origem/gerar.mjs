// node clientes/mainandcompany/_origem/gerar.mjs  (prints: node componentes/gerador/prints.mjs mainandcompany http://mainandcompany.com/)
import path from 'node:path';
import C from './conteudo.mjs';
import { gerarUS } from '../../../componentes/gerador/us-shop.mjs';
import { prepImgs } from '../../../componentes/gerador/webp.mjs';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const RAW = '/mnt/project-files/prospeccao/cnc-usa/selecao-15/raw/mainandcompany/img';
const g = Object.fromEntries([46, 18, 49, 4, 15, 16, 21, 27, 43, 50, 13, 8, 25, 31, 39, 41].map((n, i) => [`g${String(i + 1).padStart(2, '0')}`, [`sample-parts-${String(n).padStart(2, '0')}.jpg`, 1200]]));
await prepImgs(path.join(aqui, '../public'), RAW, {
  'hero-1': 'quality-lab-07.jpg', 'hero-2': 'sample-parts-52.jpg', 'hero-3': 'sample-parts-19.jpg',
  'serv-torno': 'sample-parts-30.jpg', 'serv-fresa': 'sample-parts-10.jpg', 'serv-hogout': 'sample-parts-14.jpg', 'serv-fundido': 'sample-parts-26.jpg', 'serv-cam': ['733761.mg7032.jpg', 800], 'serv-especial': 'sample-parts-07.jpg',
  'ind-aero': 'sample-parts-53.jpg', 'ind-med': 'sample-parts-09.jpg', 'ind-racing': ['683780.mg6933.jpg', 800], 'ind-optica': 'sample-parts-38.jpg',
  'qual-cmm': 'quality-lab-02.jpg', 'qual-lab': 'quality-lab-04.jpg', 'lab-1': 'quality-lab-03.jpg', 'lab-2': 'quality-lab-05.jpg', 'lab-3': 'quality-lab-09.jpg', 'lab-4': 'quality-lab-10.jpg',
  sobre: ['predio.jpg', 900], ...g,
}, C.logo);
await gerarUS(C, path.join(aqui, '..'));
