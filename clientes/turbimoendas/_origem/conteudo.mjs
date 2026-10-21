// Conteúdo da Turbimoendas, tirado do site atual (turbimoendas.com.br, páginas home, empresa, equipamentos,
// produtos, serviços, instalações e contato). Títulos de seção e frases curtas de apoio são nossos.

export const empresa = {
  nome: 'Turbimoendas',
  razao: 'Turbimoendas Usinagem de Peças Ltda.',
  url: 'https://turbimoendas.overtus.com.br/',
  antigo: 'http://www.turbimoendas.com.br/',
  fone: '(19) 3425-1900',
  foneHref: '+551934251900',
  fone2: '(19) 3917-0210',
  fone2Href: '+551939170210',
  email: 'turbimoendas@turbimoendas.com.br',
  endereco: ['Rua Abelardo Benedicto Libório, 380', 'Distrito Industrial Uninorte', 'CEP 13413-071 · Piracicaba, SP'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Abelardo+Benedicto+Lib%C3%B3rio+380+Piracicaba+SP',
  area: '7.500 m²',
  pontes: '20, 25 e 25 t',
};

export const textos = {
  empresa: [
    'A Turbimoendas Usinagem de Peças Ltda. é uma indústria que atua com tecnologia e precisão em todo e qualquer processo de usinagem.',
    'Instalada no Distrito Industrial Uninorte, em Piracicaba (SP), numa área total de 7.500 m², possui três pontes rolantes com capacidade para elevar 20, 25 e 25 toneladas.',
    'Há mais de três décadas no mercado de fabricação e usinagem, atende setores como energia, mineração, turbinas e redutores, motores, bombas, sucroalcooleiro, cereais, borracha e papel, entre outros.',
    'Tem como principal meta a qualidade, a confiança, o atendimento e a pontualidade no prazo de entrega, buscando atender as necessidades do mercado com a experiência profissional do seu corpo técnico, numa postura inovadora.',
  ],
  qualidade: 'A Turbimoendas está comprometida com a satisfação das necessidades dos seus clientes, através da melhoria contínua de seus processos na fabricação ou reforma de peças industriais e equipamentos, contando com pessoal treinado, qualificado e conscientizado, apoiados num Sistema de Gestão da Qualidade que atende aos seus objetivos e metas e aos requisitos regulamentares estabelecidos.',
  missao: 'Trabalhar de forma segura e rentável, com responsabilidade ambiental e social. Fornecer sempre serviços que atendam de forma plena as necessidades e expectativas dos nossos clientes.',
  visao: 'Se tornar uma empresa referência em excelência de qualidade no campo de usinagem de médio e grande porte. Investir sempre em novas tecnologias e capacitação de pessoas, expandindo o nosso mercado.',
  valores: ['Compromisso e ética', 'Excelência', 'Responsabilidade ambiental e social', 'Empreender continuamente'],
  objetivos: [
    'Melhorar a qualidade em atendimento e serviços, buscando sempre a satisfação do cliente',
    'Atender aos requisitos relacionados aos produtos e serviços',
    'Avaliar constantemente nossos fornecedores',
    'Buscar tecnologia de ponta',
    'Buscar aperfeiçoamento e desenvolvimento dos colaboradores',
    'Melhorar continuamente as condições de meio ambiente, segurança e saúde no trabalho',
  ],
};

export const atividades = [
  'Fabricação de cilindros coquilhados e forjados',
  'Retífica de cilindros gastos (paralelo ou bombê)',
  'Confecção de mancais e engrenagens',
  'Troca de buchas de bronze',
  'Raiação de cilindro',
  'Prestação de serviços de usinagem média e pesada',
];

export const setores = ['Energia', 'Mineração', 'Turbinas e redutores', 'Motores', 'Bombas', 'Sucroalcooleiro', 'Cereais', 'Borracha', 'Papel'];
export const faixasSetor = [
  { img: 'setor-01', nome: 'Energia' },
  { img: 'setor-02', nome: 'Hidrelétricas' },
  { img: 'setor-03', nome: 'Mineração' },
  { img: 'setor-04', nome: 'Indústria de processo' },
];

export const produtos = [
  { id: 'borracha', nome: 'Cilindro para borracha', fotos: ['f97', 'f41', 'f40'], itens: ['Cilindros coquilhados para misturadores', 'Cilindros coquilhados para calandras', 'Cilindros coquilhados para refinadores', 'Cilindros coquilhados para quebradores', 'Cilindros coquilhados para laminadores', 'Engrenagens', 'Buchas', 'Mancais'] },
  { id: 'cereais', nome: 'Cilindro para cereais', fotos: ['f87', 'f86', 'f88'], itens: ['Cilindros laminadores', 'Cilindros quebradores', 'Cilindros granuladores', 'Engrenagens', 'Buchas', 'Mancais'] },
  { id: 'papel', nome: 'Cilindro para papel', fotos: ['f31', 'f57', 'f56'], itens: ['Rolo prensa', 'Rolo secador', 'Rolo para calandra', 'Engrenagens', 'Buchas', 'Mancais', 'Peneiras'] },
  { id: 'laminacao', nome: 'Cilindro para laminação', fotos: ['f42', 'f59', 'f58'], itens: ['Cilindros de ferro coquilhado', 'Cilindros de aço forjado'] },
  { id: 'moenda', nome: 'Eixo de moenda', fotos: ['f44', 'f55', 'f43'], itens: ['Eixos de moenda para usinas de açúcar e etanol'] },
];

export const servicos = [
  { id: 'retifica', nome: 'Retífica cilíndrica', fotos: ['f35', 'f46', 'f45'], cap: '1.000 × 6.600 mm', peso: '20 t', itens: ['Eixo de gerador', 'Eixo de turbina', 'Eixo de motor', 'Eixo de redutor', 'Eixo de bomba', 'Cilindros'] },
  { id: 'mandrilhadora', nome: 'Mandrilhadora', fotos: ['f96', 'f50', 'f49'], cap: '2.500 × 2.300 mm de mesa', peso: '20 t', itens: ['Corpo de prensas', 'Carcaças de turbina', 'Carcaças de redutor', 'Carcaças de bomba', 'Furação profunda em camisa de moenda', 'Espelhos', 'Peneiras'] },
  { id: 'tornos', nome: 'Tornos horizontais', fotos: ['f34', 'f54', 'f53'], cap: '2.080 × 10.000 mm', peso: '20 t', itens: ['Eixo de gerador', 'Eixo de turbina', 'Eixo de motor', 'Eixo de redutor', 'Eixo de bomba', 'Cilindros'] },
  { id: 'fresadoras', nome: 'Fresadoras portal', fotos: ['f32', 'f48', 'f47'], cap: '6.000 × 1.400 mm', peso: '20 t', itens: ['Bases de bomba', 'Bases de redutor', 'Paleta diretriz', 'Quadrado e chavetas em eixos', 'Bombas', 'Guias longitudinais', 'Endireitamento de chapas brutas'] },
  { id: 'reformas', nome: 'Reformas', fotos: ['f95', 'f52', 'f51'], cap: null, peso: null, itens: ['Calibragem de cilindros', 'Reforma de bombas', 'Montagens em geral', 'Automação de prensas com CLP'] },
  { id: 'centro', nome: 'Centro de usinagem', fotos: ['f98', 'f99', 'f100'], cap: 'X 1.500 · Y 680 · Z 670 mm', peso: null, itens: ['Acoplamentos', 'Palhetas diretrizes', 'Carcaças de redutores', 'Carcaças de bombas', 'Usinagem de perfis', 'Peças de alta complexidade'] },
];

// Parque de máquinas, como na página "Equipamentos" (e no PDF) do site atual.
export const equipamentos = [
  { grupo: 'Mandrilhadoras', maquinas: [
    { nome: 'Mandrilhadora CNC Wotan Rapid 2 R', dados: [['Fuso', '140 mm'], ['Curso longitudinal do eixo Z', '800 mm'], ['Curso longitudinal da coluna W', '1.250 mm'], ['Curso vertical do cabeçote Y', '2.280 mm'], ['Curso transversal da mesa X', '2.500 mm'], ['Superfície de trabalho', '1.800 × 1.400 mm'], ['Interpolação dos eixos', 'X, Y e Z']] },
    { nome: 'Mandrilhadora Union BFT 125-5', dados: [['Leitura digital', '3 eixos (X, Y, Z)'], ['Fuso', '125 mm'], ['Curso longitudinal do eixo', '1.100 mm'], ['Curso longitudinal da mesa', '3.000 mm'], ['Curso vertical do cabeçote', '1.900 mm'], ['Curso transversal da mesa', '2.800 mm'], ['Superfície de trabalho', '1.800 × 2.000 mm']] },
    { nome: 'Mandrilhadora Union BFT 125-1', dados: [['Leitura digital', '3 eixos (X, Y, Z)'], ['Fuso', '125 mm'], ['Curso longitudinal do eixo', '1.100 mm'], ['Curso longitudinal da mesa', '2.000 mm'], ['Curso vertical do cabeçote', '1.500 mm'], ['Curso transversal da mesa', '1.600 mm'], ['Superfície de trabalho', '1.600 × 1.900 mm']] },
    { nome: 'Mandrilhadora Diplomat MAN 110C', dados: [['Leitura digital', '3 eixos (X, Y, Z)'], ['Fuso', '110 mm'], ['Curso transversal (X)', '1.600 mm'], ['Curso vertical (Y)', '1.200 mm'], ['Curso longitudinal (Z)', '1.400 mm'], ['Superfície de trabalho', '1.250 × 1.100 mm']] },
    { nome: 'Mandrilhadora TOSS', dados: [['Leitura digital', '3 eixos (X, Y, Z)'], ['Fuso', '100 mm'], ['Curso longitudinal do eixo', '1.000 mm'], ['Curso longitudinal da mesa', '1.500 mm'], ['Curso vertical do cabeçote', '1.200 mm'], ['Curso transversal da mesa', '1.500 mm'], ['Superfície de trabalho', '1.200 × 1.100 mm']] },
  ] },
  { grupo: 'Centro de usinagem', maquinas: [
    { nome: 'Centro de usinagem Travis M-1500', dados: [['Curso eixo X', '1.500 mm'], ['Curso eixo Y', '680 mm'], ['Curso eixo Z', '670 mm']] },
  ] },
  { grupo: 'Tornos paralelos', tabela: true, maquinas: [
    { nome: 'Torno paralelo AM 650', dados: [['Diâmetro × comprimento', '1.300 × 10.000 mm (com leitura digital)']] },
    { nome: 'Torno paralelo JW GH61208Z/8000', dados: [['Diâmetro × comprimento', '2.080 × 8.000 mm (com leitura digital)']] },
    { nome: 'Torno paralelo Nardini NL 600', dados: [['Diâmetro × comprimento', '1.400 × 5.000 mm']] },
    { nome: 'Torno paralelo Nardini AM 500B', dados: [['Diâmetro × comprimento', '1.000 × 4.000 mm']] },
    { nome: 'Torno paralelo Romi MHS II', dados: [['Diâmetro × comprimento', '950 × 3.800 mm']] },
    { nome: 'Torno paralelo Nardini NL-500', dados: [['Diâmetro × comprimento', '1.000 × 3.000 mm']] },
    { nome: 'Torno paralelo Promeca IS-750', dados: [['Diâmetro × comprimento', '750 × 3.000 mm']] },
    { nome: 'Torno paralelo Stanko-Import (2 unidades)', dados: [['Diâmetro × comprimento', '700 × 2.800 mm']] },
  ] },
  { grupo: 'Retíficas cilíndricas', maquinas: [
    { nome: 'Retífica cilíndrica TOS Hostivar', dados: [['Diâmetro admissível', '1.010 mm'], ['Comprimento admissível', '6.600 mm'], ['Executa', 'Côncavo e convexo'], ['Peso admissível', '17.000 kg sem luneta']] },
    { nome: 'Retífica Norton', dados: [['Diâmetro admissível', '650 mm'], ['Comprimento admissível', '2.000 mm'], ['Executa', 'Paralelo e cônico']] },
  ] },
  { grupo: 'Plainas, fresadora e furadeira', maquinas: [
    { nome: 'Plaina de mesa fresadora e limadora Mario Carnaghi', dados: [['Curso longitudinal da mesa', '6.000 mm'], ['Curso transversal', '1.400 mm'], ['Curso vertical', '1.400 mm']] },
    { nome: 'Plaina de mesa fresadora e limadora Mayer Schaedler (com leitura digital)', dados: [['Curso longitudinal da mesa', '5.500 mm'], ['Curso transversal', '1.320 mm'], ['Curso vertical', '1.100 mm']] },
    { nome: 'Fresadora vertical Sundstrand', dados: [['Curso longitudinal da mesa', '2.000 mm'], ['Curso transversal', '550 mm'], ['Curso vertical', '600 mm']] },
    { nome: 'Furadeira radial HCP', dados: [['Furação', '70 mm'], ['Bandeira', '2.000 mm']] },
  ] },
];
export const outrosEquip = ['2 serras hidráulicas Franho', '2 máquinas de solda Bambozzi', '1 furadeira de coluna', '2 furadeiras de eletroímã', '1 conjunto MIG Smashweld 350 Topflex com instrumento'];
export const medicao = [['Micrômetros externos', '0 a 1.400 mm'], ['Micrômetros internos', '6 a 30 mm'], ['Micrômetros tubulares', '50 a 1.500 mm'], ['Paquímetros', '0 a 1.000 mm'], ['Súbito', '35 a 350 mm'], ['Rugosímetro', ''], ['Durômetro', '']];

// Página "Nossas Instalações" do site atual (fotos maiores; legendas são nossas, descrevendo o que aparece).
export const galeria = [
  ['f20', 'Galpão de usinagem'], ['f17', 'Eixos prontos para expedição'], ['f101', 'Cilindro na retífica'], ['f65', 'Torno AM 650 com cilindro'],
  ['f10', 'Torno paralelo de grande porte'], ['f60', 'Vazamento de ferro para cilindro coquilhado'], ['f24', 'Eixo de turbina no torno'], ['f104', 'Usinagem de carcaça'],
  ['f105', 'Mandrilhadora CNC'], ['f22', 'Montagem de bombas'], ['f75', 'Cilindros no torno'], ['f77', 'Eixo pintado no torno'],
  ['f68', 'Carcaça na mandrilhadora'], ['f89', 'Rotor de turbina'], ['f94', 'Eixo embalado para expedição'], ['f82', 'Cilindros embalados'],
  ['f84', 'Eixos com engrenagens'], ['f80', 'Medição com micrômetro'], ['f06', 'Rugosímetro sobre cilindro retificado'], ['f12', 'Bloco usinado'],
  ['f63', 'Eixo no torno'], ['f67', 'Recebimento de cilindro'], ['f69', 'Torno de grande porte'], ['f70', 'Bombas reformadas'],
  ['f71', 'Cilindro na fresadora portal'], ['f72', 'Ajuste de eixo'], ['f73', 'Peça na mandrilhadora'], ['f79', 'Inspeção de peça'],
  ['f83', 'Fresadora vertical'], ['f90', 'Mandrilhadoras'], ['f91', 'Carcaça no centro de torneamento'], ['f93', 'Torno com eixo'],
  ['f18', 'Eixo longo no torno'], ['f23', 'Cilindro de laminação'], ['f25', 'Mandrilhadora com peça'], ['f02', 'Plaina de mesa'],
  ['f03', 'Cilindro no torno'], ['f04', 'Eixo embalado no caminhão'], ['f08', 'Buchas de bronze'], ['f13', 'Cilindros retificados'],
  ['f21', 'Torneamento de eixo'], ['f01', 'Eixo longo na retífica'], ['f09', 'Fachada da fábrica'], ['f14', 'Vista da fábrica'],
];
