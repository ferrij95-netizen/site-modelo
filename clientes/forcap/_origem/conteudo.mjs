// Conteúdo da Força P Volare, tirado do site atual (forcap.com.br/volare): textos das páginas Empresa e Peças e Serviços,
// as 8 linhas com modelos e capacidades, as páginas de detalhe e as fichas técnicas em PDF (catálogos Volare de 2017).
export const empresa = {
  nome: 'Força P Volare',
  razao: 'Força P Caminhões e Ônibus · Grupo Pelegrini',
  url: 'https://forcap.overtus.com.br/',
  antigo: 'http://www.forcap.com.br/volare/',
  fundacao: 1992,
  fone: '(34) 3291-8825', foneHref: '+553432918825',
  whats: '(34) 99979-7673', wa: '5534999797673',
  fonePecas: '(34) 3291-8800', fonePecasHref: '+553432918800',
  whatsPecas: '(34) 99694-8965', waPecas: '5534996948965',
  email: 'forcap@pelegrini.com.br',
  endereco: ['Rua Dr. Luiz Antônio Waack, 560', 'Uberlândia, MG · 38402-030'],
  horario: [['Segunda a sexta', '08:00 às 18:00'], ['Sábado', '08:00 às 12:00']],
  mapa: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Rua Dr. Luiz Antônio Waack, 560, Uberlândia, MG'),
  mapaEmbed: 'https://maps.google.com/maps?q=' + encodeURIComponent('Rua Dr. Luiz Antônio Waack, 560, Uberlândia, MG') + '&z=16&output=embed',
  facebook: 'https://www.facebook.com/OnibusVolare/',
  seminovos: 'http://www.volareseminovos.com.br/seminovos?id_state=11&city=2389',
  pdf: p => `http://www.forcap.com.br/volare/arquivos/veiculos/${p}.pdf`,
};

export const textos = {
  empresa: [
    'A Força P Volare é uma empresa pertencente ao Grupo Pelegrini, fundado em 1992, atuante no segmento de autopeças e assistência técnica especializada na cidade de Uberlândia/MG e região.',
    'Somos especialistas no varejo e atacado de peças genuínas e originais das principais fábricas do mercado brasileiro e concessionária de caminhões e ônibus. Optamos em nos especializar a fim de apresentar soluções com agilidade e produtos de alta qualidade para nossos clientes.',
  ],
  convite: 'Venha nos conhecer, faça sua cotação conosco!',
  missao: 'Fornecer soluções para o mercado automotivo com as melhores marcas, produtos e serviços criando vínculos fortes e duradouros com nossos clientes.',
  valores: ['Ética nas relações', 'Inovação', 'Compromisso com os resultados', 'Sustentabilidade'],
  objetivo: 'Conquistar e manter a liderança na venda e distribuição de peças, caminhões e serviços, com inovação, rentabilidade e profissionalismo.',
  pecas: [
    'A Força P e a Casa da Transmissão são empresas do Grupo Pelegrini especializadas em veículos de linha DIESEL, sendo posto de serviço autorizado e distribuidor das marcas: MWM, CUMMINS, EATON, MERITOR e PERKINS, além de ser concessionária das montadoras VOLARE, AGRALE e INTERNATIONAL.',
    'Apresentamos soluções com agilidade e produtos de alta qualidade para nossos clientes, além de ter um amplo estoque de peças, equipe de vendas e técnica treinada e especializada, televendas e serviço de entrega em todo território nacional.',
  ],
  aviso: '*As configurações dos produtos disponibilizados no site são meramente informativas, podendo sofrer alterações sem aviso prévio.',
};

export const grupo = [
  { nome: 'Casa do Chevrolet', txt: 'Autopeças' },
  { nome: 'Casa da Transmissão', txt: 'Linha diesel · (34) 3291-8800' },
  { nome: 'Força P Centro Automotivo', txt: 'Assistência técnica' },
  { nome: 'Força P Caminhões e Ônibus', txt: 'Concessionária Volare e Agrale' },
];

export const marcasPecas = ['MWM', 'Cummins', 'Eaton', 'Meritor', 'Perkins'];
export const montadoras = ['Volare', 'Agrale', 'International'];

// Ficha resumida (catálogos em PDF do site atual e páginas de detalhe).
const motorISF = 'Cummins ISF 3.8 · 152 cv';
const motorISF162 = 'Cummins ISF 3.8 · 162 cv';
const eaton = 'Eaton FSO 4505 C, 5 marchas';
const ficha = {
  W6: { motor: motorISF, cambio: eaton, comprimento: '6,60 m', pbt: '6.500 kg' },
  W7: { motor: motorISF, cambio: eaton, comprimento: '7,40 m', pbt: '8.000 kg' },
  W8C: { motor: motorISF, cambio: eaton, comprimento: '8,24 m', pbt: '8.500 kg' },
  W9C: { motor: motorISF162, cambio: eaton, comprimento: '9,04 m', pbt: '9.200 kg' },
  DW9: { motor: 'Mercedes-Benz OM 924 LA · 156 cv', cambio: 'ZF 5S-580 BO', comprimento: '9,04 m', pbt: '9.400 kg' },
  'W-L': { motor: motorISF162, cambio: eaton, comprimento: '10,15 m', pbt: '10.000 kg' },
  V6L: { motor: motorISF, cambio: eaton, comprimento: '6,54 m', pbt: '6.500 kg' },
  V8L: { motor: motorISF, cambio: eaton, comprimento: '6,54 / 7,39 / 8,45 m (curto, médio, longo)' },
  V9L: { motor: motorISF162, freio: 'Pneumático', pbt: '9.200 kg', tanque: '150 l' },
  '4x4': { motor: motorISF, freio: 'Eletropneumático', tanque: '110 l', tracao: '4x4 para terrenos difíceis' },
  Cinco: { motor: 'Cummins ISF 2.8 · 150 cv', cambio: 'Eaton FSO-2505C, 5 marchas', comprimento: '6,70 m' },
};

// lugares: número máximo (para o filtro); cap: como o site atual escreve.
const m = (nome, cap, lugares, img, pdf, f, extra = {}) => ({ nome, cap, lugares, img, pdf, ficha: f || {}, ...extra });

export const linhas = [
  {
    slug: 'cinco', nome: 'Cinco', foto: 'linha/cinco-executivo-plus', fotoAlt: 'Volare Cinco Executivo Plus na estrada',
    lema: 'Compacto, silencioso e pronto para o dia a dia.',
    txt: 'O Volare Cinco traz praticidade com seu grande espaço interno: facilita o fluxo de pessoas, dá mais conforto e simplifica embarques e desembarques. Dimensões reduzidas e ótima manobrabilidade para vias cada vez mais estreitas.',
    modelos: [
      m('Executivo', '16 + 1', 17, 'modelo/cinco-executivo', 'cinco/executivo', ficha.Cinco, { foto: 'linha/cinco-executivo' }),
      m('Executivo Plus', '13 + 1', 14, 'modelo/cinco-executivo-plus', 'cinco/executivo-plus', ficha.Cinco, { foto: 'linha/cinco-executivo-plus' }),
      m('Escolar', '20 + 1', 21, 'modelo/cinco-escolar', 'cinco/escolar', ficha.Cinco, { foto: 'linha/cinco-escolar' }),
    ],
  },
  {
    slug: 'turismo', nome: 'Turismo', foto: 'linha/turismo', fotoAlt: 'Volare de turismo na orla',
    lema: 'Sinônimo de viagem confortável.',
    txt: 'A agilidade no deslocamento e o maior espaço interno, combinados à economia e baixa manutenção, fazem dos modelos Volare a melhor opção para viagens seguras e confortáveis.',
    modelos: [
      m('V6L', 'Até 21 lugares', 21, 'modelo/turismo-v6l', 'turismo/v6l', ficha.V6L),
      m('V8L', 'Até 25 lugares', 25, 'modelo/turismo-v8l', 'turismo/v8l', ficha.V8L),
      m('V8L 4x4', 'Até 21 lugares', 21, 'modelo/turismo-v8l-4x4', 'turismo/v8l-4x4', ficha['4x4']),
      m('V9L', 'Até 32 lugares', 32, 'modelo/turismo-v9l', null, ficha.V9L),
      m('W6', 'Até 21 lugares', 21, 'modelo/turismo-w6', 'turismo/w6', ficha.W6),
      m('W7', 'Até 25 lugares', 25, 'modelo/turismo-w7', null, ficha.W7),
      m('W8C', 'Até 29 lugares', 29, 'modelo/turismo-w8c', 'turismo/w8c', ficha.W8C),
      m('W9C', 'Até 33 lugares', 33, 'modelo/turismo-w9c', 'turismo/w9c', ficha.W9C),
      m('DW9', 'Até 33 lugares', 33, 'modelo/turismo-dw9', 'turismo/dw9', ficha.DW9),
      m('W-L', 'Até 37 lugares', 37, 'modelo/turismo-w-l', 'turismo/w-l', ficha['W-L']),
    ],
  },
  {
    slug: 'escolar', nome: 'Escolar', foto: 'linha/escolar', fotoAlt: 'Volare Escolarbus amarelo',
    lema: 'Segurança que vai muito além do básico.',
    txt: 'O Escolarbus é fabricado com carroceria e chassi integrados, facilitando reparos e manutenções. Equipado com motor Euro V, tem menor consumo de combustível, garantindo economia e rentabilidade.',
    modelos: [
      m('Escolarbus V6L', 'Até 31 lugares', 31, 'modelo/escolar-escolarbus-v6l', 'escolar/escolarbus-v6l', ficha.V6L),
      m('Escolarbus V8L', 'Até 46 lugares', 46, 'modelo/escolar-escolarbus-v8l', 'escolar/escolarbus-v8l', ficha.V8L),
      m('V8L 4x4', 'Até 27 lugares', 27, 'modelo/escolar-v8l-4x4', null, ficha['4x4']),
      m('Escolarbus W6', 'Até 31 lugares', 31, 'modelo/escolar-escolarbus-w6', null, ficha.W6),
      m('Escolarbus W7', 'Até 36 lugares', 36, 'modelo/escolar-escolarbus-w7', 'escolar/escolarbus-w7', ficha.W7),
      m('Escolarbus W8C', 'Até 41 lugares', 41, 'modelo/escolar-escolarbus-w8c', 'escolar/escolarbus-w8c', ficha.W8C),
      m('Escolarbus W9C', 'Até 46 lugares', 46, 'modelo/escolar-escolarbus-w9c', 'escolar/escolarbus-w9c', ficha.W9C),
      m('Escolarbus DW9', 'Até 46 lugares', 46, 'modelo/escolar-escolarbus-dw9', 'escolar/escolarbus-dw9', ficha.DW9),
      m('Escolarbus W-L', 'Até 51 lugares', 51, 'modelo/escolar-escolarbus-w-l', 'escolar/escolarbus-w-l', ficha['W-L']),
    ],
  },
  {
    slug: 'fretamento', nome: 'Fretamento', foto: 'linha/fretamento', fotoAlt: 'Volare de fretamento na cidade',
    lema: 'Para levar equipes todos os dias, com economia.',
    txt: 'Modelos para fretamento contínuo e eventual, com a economia e a baixa manutenção da Volare e opções de poltronas e revestimentos para cada operação.',
    modelos: [
      m('V6L', 'Até 21 lugares', 21, 'modelo/fretamento-v6l', 'fretamento/v6l', ficha.V6L),
      m('V8L', 'Até 33 lugares', 33, 'modelo/fretamento-v8l', 'fretamento/v8l', ficha.V8L),
      m('V8L 4x4', 'Até 21 lugares', 21, 'modelo/fretamento-v8l-4x4', 'fretamento/v8l-4x4', ficha['4x4']),
      m('W6', 'Até 21 lugares', 21, 'modelo/fretamento-w6', 'fretamento/w6', ficha.W6),
      m('W7', 'Até 25 lugares', 25, 'modelo/fretamento-w7', 'fretamento/w7', ficha.W7),
      m('W8C', 'Até 29 lugares', 29, 'modelo/fretamento-w8c', 'fretamento/w8c', ficha.W8C),
      m('W9C', 'Até 33 lugares', 33, 'modelo/fretamento-w9c', 'fretamento/w9c', ficha.W9C),
      m('DW9', 'Até 33 lugares', 33, 'modelo/fretamento-dw9', 'fretamento/dw9', ficha.DW9),
      m('W-L', 'Até 37 lugares', 37, 'modelo/fretamento-w-l', 'fretamento/w-l', ficha['W-L']),
    ],
  },
  {
    slug: 'urbano', nome: 'Urbano', foto: 'linha/urbano', fotoAlt: 'Volare urbano em rua de paralelepípedo',
    lema: 'Ágil no trânsito, acessível para todos.',
    txt: 'Micro-ônibus para linhas urbanas e alimentadoras, com acessibilidade e o tamanho certo para ruas estreitas e bairros.',
    modelos: [
      m('V8L', 'Até 20 lugares', 20, 'modelo/urbano-v8l', 'urbano/v8l', ficha.V8L),
      m('V9L', 'Até 24 lugares', 24, 'modelo/urbano-v9l', 'urbano/v9l', ficha.V9L),
      m('W9C', 'Até 26 lugares', 26, 'modelo/urbano-w9c', 'urbano/w9c', ficha.W9C),
      m('DW9', 'Até 26 lugares', 26, 'modelo/urbano-dw9', 'urbano/dw9', ficha.DW9),
      m('W-L', 'Até 28 lugares', 28, 'modelo/urbano-w-l', 'urbano/w-l', ficha['W-L']),
    ],
  },
  {
    slug: 'rural', nome: 'Rural', foto: 'linha/rural', fotoAlt: 'Volare V8L Rural ao pôr do sol',
    lema: 'Feito para estrada de terra.',
    txt: 'O V8L Rural leva estudantes e trabalhadores do campo com a robustez do chassi Volare, nas versões curto, médio e longo.',
    modelos: [
      m('V8L Rural', 'Até 31 lugares', 31, 'linha/rural', 'rural/v8l-rural', ficha.V8L),
    ],
  },
  {
    slug: 'unidades-especiais', nome: 'Unidades Especiais', foto: 'linha/unidades-especiais', fotoAlt: 'Volare Anjo Azul, oficina móvel',
    lema: 'Um Volare para cada missão.',
    txt: 'Veículos montados para usos específicos: elétrico, ambulância, oficina móvel, escolta, cinema itinerante e autoescola. Capacidade e configuração sob consulta.',
    modelos: [
      m('Volare.e', 'Sob consulta', 0, 'modelo/unidades-especiais-volare.e', null, { motor: 'Elétrico, motor síncrono de ímãs permanentes (BYD)', bateria: '162 kWh', pbt: '14.500 kg' }, { txt: 'Silencioso e sem emissão de poluentes: piso baixo, suspensão pneumática, comprimento e peso reduzidos. Parceria com a BYD.' }),
      m('Ambulância', 'Sob consulta', 0, 'modelo/unidades-especiais-ambulancia', null, { motor: motorISF }, { txt: 'Espaço interno para remoção e atendimento, com a robustez do chassi Volare.' }),
      m('Anjo Azul', 'Sob consulta', 0, 'modelo/unidades-especiais-anjo-azul', null, { motor: motorISF, freio: 'Pneumático', pbt: '8.500 kg', tanque: '150 l' }, { txt: 'Oficina móvel: nenhum cliente seu precisa esperar horas por um guincho, os reparos são feitos na própria estrada.' }),
      m('Escolta', 'Sob consulta', 0, 'modelo/unidades-especiais-escolta', null, { motor: motorISF, freio: 'Pneumático', pbt: '8.500 kg', tanque: '150 l' }, { txt: 'Equipado com os instrumentos exigidos pela legislação, alia segurança e conforto na proteção das comunidades.' }),
      m('Visione', 'Sob consulta', 0, 'modelo/unidades-especiais-visione', null, { motor: 'MWM Maxxforce 4.8 · 165 cv', freio: 'Pneumático', pbt: '9.200 kg' }, { txt: 'Uma sala de cinema itinerante: a magia do cinema com o conforto de um Volare.' }),
      m('Autoescola (CFC)', 'Sob consulta', 0, 'modelo/unidades-especiais-autoescola-cfc', null, { motor: motorISF, freio: 'Pneumático', pbt: '8.000 kg' }, { txt: 'Vem com a faixa lateral personalizável e atende às normas vigentes para formação de condutores.' }),
    ],
  },
  {
    slug: 'access', nome: 'Access', foto: 'linha/access', fotoAlt: 'Volare Access urbano',
    lema: 'Acessibilidade de verdade.',
    txt: 'A linha Access foi pensada para o transporte de pessoas com mobilidade reduzida, em versões escolar e urbana.',
    modelos: [
      m('Escolar', 'Até 21 lugares', 21, 'modelo/access-escolar', 'access/escolar'),
      m('Urbano', 'Até 23 lugares', 23, 'modelo/access-urbano', 'access/urbano'),
    ],
  },
];

export const poltronas = [
  { img: 'poltrona/executiva-1060-soft', nome: 'Executiva 1060 Soft', sub: 'com corte SL' },
  { img: 'poltrona/executiva-940-soft', nome: 'Executiva 940 Soft', sub: 'com corte SL' },
  { img: 'poltrona/executiva-1060', nome: 'Executiva 1060', sub: '' },
  { img: 'poltrona/executiva-940', nome: 'Executiva 940', sub: '' },
  { img: 'poltrona/executiva-895', nome: 'Executiva 895', sub: '' },
  { img: 'poltrona/lotacao-860', nome: 'Lotação 860', sub: '' },
  { img: 'poltrona/escolar-sofa-1000x800', nome: 'Sofá escolar', sub: '' },
];

export const rotulosFicha = { motor: 'Motor', cambio: 'Câmbio', comprimento: 'Comprimento', pbt: 'Peso bruto total', freio: 'Freio', tanque: 'Tanque', tracao: 'Tração', bateria: 'Bateria' };
