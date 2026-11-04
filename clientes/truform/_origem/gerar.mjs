// node clientes/truform/_origem/gerar.mjs  (prints: node componentes/gerador/prints.mjs truform https://www.truformmachine.com/)
// Fotos tiradas do Brochure.pdf do cliente (JPEG CMYK invertido, corrigido) + site atual.
import path from 'node:path';
import C from './conteudo.mjs';
import { gerarUS } from '../../../componentes/gerador/us-shop.mjs';
import { prepImgs } from '../../../componentes/gerador/webp.mjs';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const RAW = '/mnt/project-files/prospeccao/cnc-usa/selecao-15/raw/truform/img';
await prepImgs(path.join(aqui, '../public'), RAW, {
  'hero-1': ['oficina-c.jpg', 2000], 'hero-2': 'pdf-pecas.jpg',
  'serv-torno': ['oficina-c.jpg', 1400], 'serv-pecas': 'pdf-pecas.jpg', 'serv-acab': 'coloredparts.jpg', 'serv-okuma': 'lu.jpg',
  premios: 'pdf-premios.jpg', sobre: 'pdf-predio.jpg', aero: 'pdf-asa.jpg',
  g1: 'pdf-pecas.jpg', g2: ['oficina-c.jpg', 1200], g3: 'pdf-premios.jpg', g4: 'pdf-predio.jpg', g5: 'coloredparts.jpg',
}, C.logo);
await gerarUS(C, path.join(aqui, '..'));
