// node clientes/superiortd/_origem/gerar.mjs  (prints: node componentes/gerador/prints.mjs superiortd http://www.superiortd.com/)
import path from 'node:path';
import C from './conteudo.mjs';
import { gerarUS } from '../../../componentes/gerador/us-shop.mjs';
import { prepImgs } from '../../../componentes/gerador/webp.mjs';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const RAW = '/mnt/project-files/prospeccao/cnc-usa/selecao-15/raw/superiortd/img';
await prepImgs(path.join(aqui, '../public'), RAW, {
  'hero-1': 'cap-piston-inserter-lg-PU.jpg', 'hero-2': 'custom-machining01.jpg', 'hero-3': 'capse-casting-sawtPU.jpg', 'hero-4': 'pt-press-frame-rebuildPU.jpg',
  'serv-fixture': 'capcm-02-weld-fixture-lg-PU.jpg', 'serv-usinagem': 'custom-machining04.jpg', 'serv-maquina': 'capse-casting-sawtPU.jpg', 'serv-eng': 'custom-machining02.jpg', 'serv-rebuild': 'pt-press-frame-rebuildPU.jpg',
  'ind-heavy': 'pt-weld-fixture-PU.jpg', 'ind-aero': 'guage01.jpg', qual: 'guage01.jpg', sobre: 'cp-01-familyPU.jpg',
  g01: 'cap-piston-inserter-lg-PU.jpg', g02: 'capcm-02-weld-fixture-lg-PU.jpg', g03: 'capse-casting-sawtPU.jpg', g04: 'guage01.jpg', g05: 'pt-press-frame-rebuildPU.jpg', g06: 'pt-weld-fixture-PU.jpg',
  g07: 'pt-adjustable-fixture-PU.jpg', g08: 'pt-casting-gate-trim-PU.jpg', g09: 'custom-machining01.jpg', g10: 'custom-machining02.jpg', g11: 'custom-machining03.jpg', g12: 'el-02-CNC-lathePU.jpg',
}, C.logo);
await gerarUS(C, path.join(aqui, '..'));
