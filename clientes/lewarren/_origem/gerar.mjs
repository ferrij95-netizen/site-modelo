// node clientes/lewarren/_origem/gerar.mjs  (prints: node componentes/gerador/prints.mjs lewarren https://www.lewarren.com/)
import path from 'node:path';
import C from './conteudo.mjs';
import { gerarUS } from '../../../componentes/gerador/us-shop.mjs';
import { prepImgs } from '../../../componentes/gerador/webp.mjs';
const aqui = path.dirname(new URL(import.meta.url).pathname);
const RAW = '/mnt/project-files/prospeccao/cnc-usa/selecao-15/raw/lewarren/img';
const gal = ['transferline_entry01', 'bar_transfer_line', 'fuel_cell', 'clamp_assembly', 'conveyor_tubes', 'v_rails', 'bandsaw_roll_line', 'polisher_bar_feed', 'machine_delivery', 'cobra08', 'redwings_rims04', 'seatmold02', 'drill_fixture', 'sm_parts', 'transferline_entry03', 'shoprat_rims04'];
await prepImgs(path.join(aqui, '../public'), RAW, {
  'hero-1': 'bar_transfer_line.jpg', 'hero-2': 'fuel_cell.jpg', 'hero-3': 'cobra08.jpg', 'hero-4': 'transferline_entry04.jpg',
  'serv-design': 'seatmold01.jpg', 'serv-linha': 'transferline_entry02.jpg', 'serv-peca': '36in_chuck04.jpg', 'serv-cnc': 'hurco_64t.jpg', 'serv-reparo': 'lucas_bore_mill.jpg', 'serv-solda': 'salow_boltstr05.jpg',
  'ind-aco': 'conveyor_tubes.jpg', 'ind-man': 'doosan1_turning_center.jpg', 'ind-moto': 'redwings_rims01.jpg',
  sobre: 'shop_eastface1.jpg', ...Object.fromEntries(gal.map((f, i) => [`g${String(i + 1).padStart(2, '0')}`, `${f}.jpg`])),
}, null, { inset: 6 });
await prepImgs(path.join(aqui, '../public'), RAW, {}, C.logo);
await gerarUS(C, path.join(aqui, '..'));
