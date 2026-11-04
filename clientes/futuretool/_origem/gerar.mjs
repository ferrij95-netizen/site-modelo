// node clientes/futuretool/_origem/gerar.mjs  (prints: node componentes/gerador/prints.mjs futuretool http://futuretool-inc.com/)
import path from 'node:path';
import C from './conteudo.mjs';
import { gerarUS } from '../../../componentes/gerador/us-shop.mjs';
import { prepImgs } from '../../../componentes/gerador/webp.mjs';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const RAW = '/mnt/project-files/prospeccao/cnc-usa/selecao-15/raw/futuretool/img';
const B = n => `BROCHURE_20PICTURES_200${n}.jpg`;
await prepImgs(path.join(aqui, '../public'), RAW, {
  'hero-1': B('04'), 'hero-2': B(19), 'hero-3': B(43), 'hero-4': B(50),
  'serv-molde': B('04'), 'serv-reverso': B(50), 'serv-conversao': 'web_20page_20collage.jpg', 'serv-cnc': B(19),
  g1: B('04'), g2: B(19), g3: B(43), g4: B(50), g5: 'web_20page_20collage.jpg',
});
await gerarUS(C, path.join(aqui, '..'));
