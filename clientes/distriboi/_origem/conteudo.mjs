// Textos do site da DistriBoi. Tudo aqui vem de fonte pública (lista em LEIA-ME.md):
// cadastro do CNPJ (Receita Federal), relação de estabelecimentos SIF (Abrafrigo/MAPA), LinkedIn da empresa,
// comunicado da FriGol (05/03/2026) e matéria do Governo de Rondônia (13/09/2017).
// O que é descrição geral do processo (etapas, serviços) não traz número inventado.

export const site = {
  nome: 'DistriBoi',
  razao: 'DistriBoi - Indústria, Comércio e Transporte de Carne Bovina Ltda.',
  cnpj: '22.882.054/0003-22',
  slogan: 'Carne bovina direto do produtor',
  fone: '(69) 3416-9400',
  foneHref: '+556934169400',
  email: 'distriboi@distriboi.com.br',
  endereco: 'Av. Brasil, 5930, Lote 01-A, Estrada do Aeroporto, Habitar Brasil',
  cidade: 'Ji-Paraná (RO)',
  cep: '76909-899',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Distriboi+Av.+Brasil+5930+Ji-Paran%C3%A1',
  linkedin: 'https://www.linkedin.com/company/distriboi',
};

export const numeros = [
  ['1987', 'início das atividades, em Seringueiras (RO)'],
  ['2', 'plantas frigoríficas com SIF, em Ji-Paraná e Rolim de Moura'],
  ['1,2 mil', 'empregos diretos em Rondônia'],
  ['6', 'mercados no exterior já atendidos ou habilitados'],
];

export const sobre = {
  titulo: 'Uma indústria de carne bovina nascida em Rondônia',
  texto: [
    'A DistriBoi começou em 1987 em Seringueiras, no interior de Rondônia, e cresceu junto com a pecuária do estado. Hoje opera duas plantas frigoríficas com Inspeção Federal, em Ji-Paraná e em Rolim de Moura, onde faz o abate, a desossa e o processamento de bovinos.',
    'O nome resume o jeito de trabalhar: carne bovina direto do produtor. O gado vem das fazendas da região, passa pela inspeção federal em cada etapa e sai das câmaras frias pronto para o mercado interno e para a exportação.',
  ],
  missao: 'Transformar o gado de Rondônia em carne bovina de qualidade, com inspeção federal, segurança e responsabilidade com quem produz, quem trabalha e quem consome.',
};

export const historia = [
  ['1987', 'Começo em Seringueiras', 'Início das atividades da matriz, em Seringueiras (RO), na BR-429.'],
  ['2009', 'Unidade em Cacoal', 'A empresa abre filial em Cacoal (RO), na RO-383.'],
  ['2012', 'Planta de Ji-Paraná', 'Abertura da unidade de Ji-Paraná, na Estrada do Aeroporto, registrada no SIF 4695.'],
  ['2016', 'Planta de Rolim de Moura', 'Abertura da unidade de Rolim de Moura, na RO-010, registrada no SIF 4334.'],
  ['2017', 'Exportação', 'A DistriBoi já exporta para Hong Kong, Egito e Chile e gera cerca de 1,2 mil empregos diretos em Rondônia.'],
  ['2026', 'Contrato com a FriGol', 'As duas plantas passam a industrializar carne para a FriGol, com habilitações para mercados como China, Israel, Chile e Canadá.'],
];

export const servicos = [
  {
    slug: 'abate-e-desossa', ico: 'faca', nome: 'Abate e desossa',
    curto: 'Abate de bovinos e desossa nas plantas de Ji-Paraná e Rolim de Moura, sob Inspeção Federal.',
    texto: [
      'O abate de bovinos é a atividade principal da DistriBoi. As duas plantas recebem o gado das fazendas da região e fazem todo o processo dentro das normas do Serviço de Inspeção Federal (SIF), do Ministério da Agricultura.',
      'Depois do abate, as carcaças seguem para o resfriamento e para a desossa, onde são separadas nos cortes que vão para a embalagem.',
    ],
    itens: ['Recebimento e descanso do gado', 'Inspeção ante e post mortem pelo SIF', 'Abate e preparo das carcaças', 'Resfriamento em câmaras frias', 'Desossa e separação dos cortes'],
  },
  {
    slug: 'produtos-de-carne', ico: 'corte', nome: 'Industrialização da carne',
    curto: 'Processamento dos cortes bovinos, embalados e conservados para o mercado interno e a exportação.',
    texto: [
      'Além do abate, a DistriBoi fabrica produtos de carne: os cortes desossados são embalados, identificados e conservados em câmaras frias até a expedição.',
      'É esse serviço de industrialização (abate, desossa e processamento) que a DistriBoi presta à FriGol desde março de 2026 nas duas plantas de Rondônia.',
    ],
    itens: ['Cortes bovinos desossados', 'Embalagem e identificação dos lotes', 'Conservação em câmaras frias', 'Produção para mercado interno e exportação'],
  },
  {
    slug: 'subprodutos', ico: 'ciclo', nome: 'Subprodutos do abate',
    curto: 'Preparação dos subprodutos do abate, para que nada do animal se perca.',
    texto: [
      'A DistriBoi também prepara os subprodutos do abate, atividade registrada no cadastro da empresa. Aproveitar o animal por inteiro reduz o desperdício e gera renda para toda a cadeia.',
    ],
    itens: ['Preparação dos subprodutos do abate', 'Aproveitamento integral do animal', 'Destinação conforme as normas sanitárias'],
  },
  {
    slug: 'transporte', ico: 'caminhao', nome: 'Transporte de cargas',
    curto: 'Transporte rodoviário de carga intermunicipal, interestadual e internacional.',
    texto: [
      'O transporte está no nome e na origem da empresa: a matriz, em Seringueiras, foi aberta em 1987 para o transporte rodoviário de cargas. Hoje a DistriBoi faz transporte intermunicipal, interestadual e internacional.',
      'Nas plantas, as docas de expedição carregam as carretas frigoríficas direto das câmaras frias, sem quebrar a cadeia do frio.',
    ],
    itens: ['Transporte intermunicipal e interestadual', 'Transporte internacional', 'Carregamento direto das câmaras frias'],
  },
];

export const etapas = [
  ['Gado do produtor', 'Os bovinos chegam das fazendas de Rondônia e descansam nos currais antes do abate.', 'campo'],
  ['Inspeção federal', 'Os fiscais do SIF examinam os animais antes e depois do abate.', 'escudo'],
  ['Abate', 'Abate e preparo das carcaças dentro das normas do Ministério da Agricultura.', 'faca'],
  ['Desossa', 'As carcaças resfriadas são desossadas e separadas em cortes.', 'corte'],
  ['Câmaras frias', 'Os cortes são embalados, identificados e conservados no frio.', 'floco'],
  ['Expedição', 'As carretas frigoríficas saem das docas para o Brasil e o exterior.', 'caminhao'],
];

export const unidades = [
  {
    slug: 'ji-parana', nome: 'Ji-Paraná', sif: '4695', desde: '2012',
    endereco: 'Av. Brasil, 5930, Lote 01-A, Estrada do Aeroporto, Habitar Brasil, Ji-Paraná (RO), CEP 76909-899',
    fone: '(69) 3416-9400', foneHref: '+556934169400',
    mapa: 'https://www.google.com/maps/search/?api=1&query=Distriboi+Av.+Brasil+5930+Ji-Paran%C3%A1',
    texto: 'A planta de Ji-Paraná fica na Avenida Brasil, na saída para o aeroporto. Faz abate, desossa e processamento de bovinos e é a unidade que aparece na foto da fachada, com a placa "Carne Bovina Direto do Produtor".',
  },
  {
    slug: 'rolim-de-moura', nome: 'Rolim de Moura', sif: '4334', desde: '2016',
    endereco: 'Rodovia RO-010, km 02, saída para Pimenta Bueno, Zona Rural, Rolim de Moura (RO)',
    fone: '(69) 3442-4821', foneHref: '+556934424821',
    mapa: 'https://www.google.com/maps/search/?api=1&query=Distriboi+RO-010+Rolim+de+Moura',
    texto: 'A planta de Rolim de Moura fica na RO-010, na saída para Pimenta Bueno. Também faz abate, desossa e processamento de bovinos com Inspeção Federal e integra o contrato com a FriGol.',
  },
];

export const mercados = {
  interno: 'Carne bovina inspecionada para todo o Brasil, saindo de Rondônia, um dos maiores rebanhos do país.',
  externo: [
    ['China', 'CN'], ['Israel', 'IL'], ['Chile', 'CL'], ['Canadá', 'CA'], ['Hong Kong', 'HK'], ['Egito', 'EG'],
  ],
  eua: 'Com a FriGol, as plantas da DistriBoi abrem caminho para o mercado dos Estados Unidos.',
};

export const noticia = {
  slug: 'contrato-frigol', data: '05 de março de 2026',
  titulo: 'FriGol firma contrato com a DistriBoi para produção de carne em Rondônia',
  resumo: 'As duas plantas da DistriBoi, em Ji-Paraná e Rolim de Moura, passam a fazer abate, desossa e processamento para a FriGol.',
  texto: [
    'A FriGol, uma das principais e mais tradicionais processadoras de carne bovina do Brasil, firmou em 3 de março de 2026 contrato de prestação de serviços de industrialização com o frigorífico DistriBoi, contemplando as duas plantas da empresa, em Ji-Paraná e Rolim de Moura, ambas em Rondônia.',
    'A FriGol passa a ser responsável pela compra dos animais e pela comercialização dos produtos, enquanto a DistriBoi realiza o abate, a desossa e o processamento em suas unidades.',
    'Segundo a FriGol, as unidades da DistriBoi possuem habilitações para exportação para diversos mercados em que a companhia já atua, como China, Israel, Chile e Canadá, além de possibilitar a entrada no mercado dos Estados Unidos.',
  ],
  fonte: ['Comunicado da FriGol', 'https://www.frigol.com.br/noticias/frigol-firma-contrato-com-distriboi-para-producao-de-carne-em-rondonia/'],
};

export const areasTrabalho = ['Produção (abate e desossa)', 'Qualidade e laboratório', 'Manutenção', 'Logística e transporte', 'Administrativo'];

// Fotos ilustrativas (Wikimedia Commons). As demais (fachada, logo, fundo vermelho com o boi) são da própria DistriBoi.
export const creditos = {
  'banco-nelore': 'Alex S Araujo, CC BY-SA 3.0',
  'banco-linha': 'USDA, domínio público',
  'banco-camara': 'USDA, domínio público',
  'banco-desossa': 'USDA, domínio público',
  'banco-inspecao': 'USDA, domínio público',
};
