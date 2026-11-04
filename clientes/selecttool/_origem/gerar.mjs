// node clientes/selecttool/_origem/gerar.mjs  (prints: node componentes/gerador/prints.mjs selecttool http://www.selecttoolanddie.com/)
import path from 'node:path';
import C from './conteudo.mjs';
import { gerarUS } from '../../../componentes/gerador/us-shop.mjs';
import { prepImgs } from '../../../componentes/gerador/webp.mjs';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const RAW = '/mnt/project-files/prospeccao/cnc-usa/selecao-15/raw/selecttool/img';
const F = { jaws: 'tube_20mill_20cut-off_20jaws_20ready_20for_20heat_20treat.JP', shaft: 'tube_20mill_20shaft.JPG', mandrel: 'tube_20mill-weld_20roll_20mandrel.JPG', hvac: 'automotive_20HVAC_20duct_20attribute_20gauge.jpg', glass: 'glass_20bottle-_20off_20level_20gauge.JPG', ind: 'digital_20indicator_20back_20and_20arm.JPG', multi: 'multiaxis_20work_20samples.JPG', punch: 'tube_20punching_20machine.JPG', punchcad: 'tube_20punch_20machine_20CAD.JPG', guide: 'tube_20mill_20strip_20guide_20CAD.JPG', farma: 'various_20pharmaceutical_20and_20energy_20industry_20compone', predio: 'DCP_1866356.png' };
await prepImgs(path.join(aqui, '../public'), RAW, {
  'hero-1': F.jaws, 'hero-2': F.punch, 'hero-3': F.hvac,
  'serv-jaws': F.jaws, 'serv-shaft': F.shaft, 'serv-gage': F.hvac, 'serv-maquina': F.punch, 'serv-cnc': F.multi,
  'ind-tubo': F.mandrel, 'ind-auto': F.hvac, 'ind-vidro': F.glass, 'ind-farma': F.farma, sobre: F.predio,
  g01: F.jaws, g02: F.shaft, g03: F.mandrel, g04: F.hvac, g05: F.glass, g06: F.ind, g07: F.multi, g08: F.punch, g09: F.punchcad, g10: F.guide, g11: F.farma, g12: F.predio,
});
await gerarUS(C, path.join(aqui, '..'));
