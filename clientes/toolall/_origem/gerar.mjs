// node clientes/toolall/_origem/gerar.mjs  (prints: node componentes/gerador/prints.mjs toolall http://www.toolall.com/)
import path from 'node:path';
import C from './conteudo.mjs';
import { gerarUS } from '../../../componentes/gerador/us-shop.mjs';
import { prepImgs } from '../../../componentes/gerador/webp.mjs';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const RAW = '/mnt/project-files/prospeccao/cnc-usa/selecao-15/raw/toolall/img';
await prepImgs(path.join(aqui, '../public'), RAW, {
  'hero-1': 'IMG_1336.JPG', 'hero-2': 'DSC_0145.JPG', 'hero-3': 'IMG_1341.JPG',
  'serv-design': 'DSC_0036.JPG', 'serv-hsm': 'IMG_1346.JPG', 'serv-edm': 'IMG_1335.JPG', 'serv-ret': 'IMG_1342.JPG', 'serv-proto': 'DSC_0065.JPG',
  'ind-auto': 'DSC_0121.JPG', 'ind-com': 'DSC_0041.JPG', 'ind-med': 'DSC_0060.JPG', 'ind-comp': 'DSC_0110.JPG', 'ind-cons': 'DSC_0082.JPG', 'ind-term': 'DSC_0162.JPG',
  'eq-v33': 'IMG_1325.JPG', 'eq-snc': 'IMG_1327.JPG', 'eq-hyper': 'IMG_1347.JPG', 'eq-edge': 'IMG_1338.JPG',
  sobre: 'IMG_1328.JPG',
  g1: 'DSC_0145.JPG', g2: 'DSC_0049.JPG', g3: 'DSC_0104.JPG', g4: 'DSC_0116.JPG', g5: 'DSC_0040.JPG', g6: 'DSC_0101.JPG', g7: 'DSC_0158.JPG', g8: 'DSC_0084.JPG',
  g9: 'DSC_0113.JPG', g10: 'DSC_0144.JPG', g11: 'DSC_0151.JPG', g12: 'DSC_0092.JPG',
}, C.logo);
await gerarUS(C, path.join(aqui, '..'));
