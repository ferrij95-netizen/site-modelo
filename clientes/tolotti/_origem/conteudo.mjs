// Textos e dados da Mecânica Irmãos Tolotti. Serviços, telefones e e-mail vêm do site atual (tolotti.com.br);
// endereço e telefone fixo atualizado vêm do Google Maps. Descrições de cada serviço foram escritas por nós.
export const empresa = {
  nome: 'Mecânica Irmãos Tolotti',
  curto: 'Tolotti',
  razao: 'Mecânica Irmãos Tolotti Ltda.',
  url: 'https://tolotti.overtus.com.br/',
  antigo: 'http://tolotti.com.br/',
  cidade: 'Chapecó · SC',
  endereco: ['R. Imperatriz Leopoldina, 62 E', 'Chapecó · SC'],
  mapa: 'https://www.google.com/maps/place/Mec%C3%A2nica+Irm%C3%A3os+Tolotti/@-27.0882747,-52.6225226,17z',
  mapaEmbed: 'https://www.google.com/maps?q=-27.0882747,-52.6225226&z=16&output=embed',
  fone: '(49) 3322-5412', foneHref: '+554933225412',
  fones: [
    { n: '(49) 3322-5412', h: '+554933225412' },
    { n: '(49) 3323-2033', h: '+554933232033' },
    { n: '(49) 3323-0821', h: '+554933230821' },
  ],
  celulares: [
    { n: '(49) 9 9967-2040', h: '+5549999672040' },
    { n: '(49) 9 9987-8318', h: '+5549999878318' },
  ],
  wa: '5549999672040',
  email: 'tolotti@tolotti.com.br',
  nota: '4,4', avaliacoes: 223,
};

// Os 7 serviços do site atual, na mesma ordem.
export const servicos = [
  { slug: 'mecanica', nome: 'Mecânica em geral', curto: 'Mecânica geral',
    texto: 'Motor, suspensão, freios, embreagem e revisões. Carro no elevador, peça certa e serviço explicado antes de começar.',
    foto: 'mecanica', alt: 'Área de mecânica com carros nos elevadores' },
  { slug: 'chapeacao', nome: 'Chapeação e pintura com estufa', curto: 'Chapeação e pintura',
    texto: 'Funilaria completa e pintura feita dentro da estufa, com laboratório próprio para acertar a cor original do carro.',
    foto: 'estufa', alt: 'Carro branco dentro da estufa de pintura' },
  { slug: 'injecao', nome: 'Injeção eletrônica e elétrica', curto: 'Injeção e elétrica',
    texto: 'Diagnóstico com aparelhos computadorizados: o defeito é lido pelo equipamento antes de qualquer peça ser trocada.',
    foto: 'diagnostico', alt: 'Bancada de diagnóstico eletrônico da oficina' },
  { slug: 'bicos', nome: 'Limpeza de bicos injetores', curto: 'Bicos injetores',
    texto: 'Limpeza e teste dos bicos em máquina própria, para o motor voltar a ter marcha lenta firme e consumo normal.',
    foto: 'bicos', alt: 'Máquina de limpeza e teste de bicos injetores' },
  { slug: 'seguradoras', nome: 'Convênio com todas as seguradoras', curto: 'Seguradoras',
    texto: 'Bateu o carro? A oficina atende pelo seu seguro e cuida da vistoria e do orçamento junto à seguradora.',
    foto: 'chapeacao', alt: 'Carros em reparo na área de chapeação' },
  { slug: 'guincho', nome: 'Guincho 24 horas', curto: 'Guincho 24h',
    texto: 'Guincho próprio, de dia ou de madrugada. O carro sai de onde parou e vai direto para o box.',
    foto: 'guincho', alt: 'Guincho vermelho da Tolotti na frente da oficina' },
  { slug: 'mesa', nome: 'Mesa alinhadora', curto: 'Mesa alinhadora',
    texto: 'Depois de uma batida forte, a carroceria volta às medidas de fábrica presa na mesa alinhadora de chassi.',
    foto: 'mesa', alt: 'Carro preso na mesa alinhadora de chassi' },
];

// Caminho de um carro batido dentro da oficina (seção visual de etapas).
export const percurso = [
  { t: 'Guincho', d: 'Ligou, o guincho 24 horas busca o carro onde ele estiver.', foto: 'guincho' },
  { t: 'Vistoria e orçamento', d: 'Orçamento feito na oficina e enviado para a sua seguradora.', foto: 'recepcao' },
  { t: 'Mesa alinhadora', d: 'A carroceria volta às medidas de fábrica antes da funilaria.', foto: 'mesa-frente' },
  { t: 'Pintura na estufa', d: 'Cor acertada no laboratório de tintas e pintura dentro da estufa.', foto: 'estufa' },
  { t: 'Entrega', d: 'Revisão final da mecânica e o carro volta para você.', foto: 'fachada-lado' },
];

// Fotos reais do site atual (400 a 600 px de largura, ampliadas 2x) com legenda.
export const fotos = {
  fachada: 'Fachada da Mecânica Irmãos Tolotti, em Chapecó',
  'fachada-lado': 'Fachada lateral com o logo pintado na parede',
  'fachada-rua': 'A oficina vista da rua',
  mecanica: 'Área de mecânica com elevadores',
  recepcao: 'Recepção e atendimento',
  estufa: 'Estufa de pintura',
  tintas: 'Laboratório de tintas',
  bicos: 'Máquina de limpeza de bicos injetores',
  diagnostico: 'Equipamentos de diagnóstico eletrônico',
  patio: 'Pátio de chapeação',
  chapeacao: 'Área de chapeação',
  box: 'Boxes de funilaria',
  equipe: 'Equipe da Mecânica Irmãos Tolotti',
  mesa: 'Mesa alinhadora de chassi',
  'mesa-frente': 'Mesa alinhadora vista de frente',
  guincho: 'Guincho próprio',
  'patio-fundos': 'Pátio dos fundos',
};
export const tamanhos = {
  fachada: [1200, 640], 'fachada-lado': [800, 462], 'fachada-rua': [800, 370], mecanica: [1200, 628], recepcao: [1200, 766],
  estufa: [1200, 816], tintas: [1200, 802], bicos: [800, 538], diagnostico: [800, 546], patio: [800, 404], chapeacao: [800, 424],
  box: [800, 394], equipe: [800, 434], mesa: [800, 532], 'mesa-frente': [800, 526], guincho: [800, 412], 'patio-fundos': [800, 408],
};
