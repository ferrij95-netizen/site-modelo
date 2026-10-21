// Conteúdo do site da ACG Móveis, copiado do site atual (acgmoveis.com.br, Wix, ©2020) e do Catálogo 2024 em PDF
// (link "Catálogo de produtos" do site atual). Medidas em metros, como no catálogo.

export const empresa = {
  nome: 'ACG Móveis',
  url: 'https://acgmoveis.overtus.com.br/',
  antigo: 'https://www.acgmoveis.com.br/',
  // Endereço e e-mail da contracapa do Catálogo 2024 (o site atual, de 2020, ainda mostra Av. Vital Zambotto, 671, Área Industrial III).
  endereco: 'Rua Othomar Germano Spode, 69',
  bairro: 'Distrito Industrial II',
  cidade: 'Lagoa Vermelha - RS',
  cep: '95300-000',
  telefones: ['(54) 3358-2033', '(54) 3358-1713', '(54) 3358-5487'],
  email: 'comercial.compras@acgmoveis.com.br',
  pedidos: 'http://131.108.180.208:5000/pedidos3/login.asp',
  catalogo: '/assets/catalogo-acg-moveis-2024.pdf',
  mapa: 'https://www.google.com/maps/search/?api=1&query=ACG+M%C3%B3veis+Lagoa+Vermelha+RS',
};

// Texto do site atual ("Nossa empresa") e do catálogo 2024 ("Bem-vindo à ACG Móveis...").
export const sobre = {
  curto: 'A ACG Móveis surge da ideia de oferecer produtos com estilo e sofisticação. Desenvolvidos com materiais de última geração e sempre seguindo a tendência do mercado brasileiro.',
  catalogo: [
    'Bem-vindo à ACG Móveis, onde qualidade e elegância se encontram para transformar seus espaços.',
    'Dedicamo-nos a criar móveis que combinam funcionalidade, estilo e durabilidade. Com um compromisso incessante com a excelência, nossa fábrica utiliza materiais de primeira qualidade e técnicas de fabricação avançadas para garantir produtos que superam expectativas.',
    'Explore nosso catálogo e descubra como os nossos móveis podem elevar o seu ambiente, tornando cada espaço único e acolhedor. Seja em casa, na sua sala de jantar e estar, na ACG Móveis estamos aqui para transformar suas ideias em realidade.',
  ],
  // As cinco palavras da arte do topo do site atual.
  palavras: ['Requinte', 'Bom gosto', 'Sofisticação', 'Personalidade', 'Estilo'],
};

export const categorias = [
  { id: 'conjuntos', nome: 'Conjuntos de jantar', curto: 'Conjuntos', texto: 'Mesa e cadeiras desenhadas juntas, com tampo em madeira ou madeira com vidro e vários tamanhos.', img: 'antonella', faixa: 'faixa-conjunto' },
  { id: 'bistros', nome: 'Bistrôs e banquetas', curto: 'Bistrô', texto: 'Mesas altas de tampo quadrado ou redondo com banquetas giratórias, para cozinhas e espaços gourmet.', img: 'bistro-adhara', faixa: 'bistro-perola' },
  { id: 'cristaleiras', nome: 'Cristaleiras', curto: 'Cristaleiras', texto: 'Madeira e vidro com iluminação interna, de uma ou duas portas, para valorizar louças e cristais.', img: 'cristaleira-kelli', contem: true, faixa: 'faixa-cristaleira' },
  { id: 'mesas', nome: 'Mesas e cadeiras avulsas', curto: 'Mesas e cadeiras', texto: 'Mesas extensíveis e cadeiras vendidas separadamente, para compor o ambiente do seu jeito.', img: 'mesa-carla', contem: true, faixa: 'alice-aurora' },
  { id: 'centro', nome: 'Mesas de centro e aparadores', curto: 'Centro e aparadores', texto: 'Peças para a sala de estar: mesas de centro com ratan indiano e aparadores.', img: 'centro-valentine', contem: true, faixa: 'faixa-balcao' },
];

const T3 = ['1,60 / 1,80 x 0,90', '2,00 x 1,00', '2,20 x 1,10'];
const MV = 'Mesa em madeira ou madeira com vidro';

// tipo: conjuntos | bistros | cristaleiras | mesas | centro.
// pecas: [nome, ref]; cadeira: [altura, largura, profundidade]; alturaMesa; tamanhos: tampo (comprimento x largura).
// foto: imagem grande; fotoGrande: true quando há foto em alta do site atual (as demais vêm do catálogo em PDF).
export const produtos = [
  { slug: 'rubi', nome: 'Conjunto Rubi', tipo: 'conjuntos', novo: true, pecas: [['Mesa Rubi', 'M2256'], ['Cadeira Rubi', 'M2257']], cadeira: [0.83, 0.53, 0.49], alturaMesa: 0.79, tamanhos: ['2,00 x 1,00', '2,20 x 1,10'], foto: 'rubi', fotoGrande: true, frase: 'Base escultural em arco e cadeiras de encosto envolvente.' },
  { slug: 'safira', nome: 'Conjunto Safira', tipo: 'conjuntos', novo: true, pecas: [], cadeira: [0.89, 0.64, 0.56], alturaMesa: 0.79, tamanhos: ['2,00 x 1,00', '2,20 x 1,10'], foto: 'safira', fotoGrande: true, frase: 'Base vazada em curva e cadeiras com braço.' },
  { slug: 'lisboa', nome: 'Conjunto Lisboa', tipo: 'conjuntos', novo: true, pecas: [['Mesa Lisboa', 'M2258'], ['Cadeira Lisboa', 'M2259']], cadeira: [0.89, 0.56, 0.57], alturaMesa: 0.79, tamanhos: T3, foto: 'lisboa', frase: 'Pés inclinados em trapézio e cadeiras estofadas de linhas suaves.' },
  { slug: 'roma', nome: 'Conjunto Roma', tipo: 'conjuntos', novo: true, pecas: [['Mesa Roma', 'M2056'], ['Cadeira Roma', 'M2057']], cadeira: [0.90, 0.52, 0.54], alturaMesa: 0.79, tamanhos: T3, foto: 'roma', frase: 'Cadeiras com encosto em palha e mesa de pés afinados.' },
  { slug: 'londres', nome: 'Conjunto Londres', tipo: 'conjuntos', novo: true, pecas: [['Mesa Londres', 'M2235'], ['Cadeira Londres', 'M2228']], cadeira: [0.89, 0.51, 0.51], alturaMesa: 0.77, tamanhos: T3, foto: 'londres', frase: 'Mesa retangular e cadeiras com encosto em palha.' },
  { slug: 'perola', nome: 'Conjunto Pérola', tipo: 'conjuntos', novo: true, pecas: [['Mesa Pérola', 'M2252'], ['Cadeira Pérola', 'M2024']], cadeira: [0.85, 0.58, 0.55], alturaMesa: 0.78, tamanhos: ['1,00 x 1,00', '1,20 x 1,20', '1,37 x 1,37', '1,50 x 1,50'], obs: 'Mesa com tampo em madeira ou madeira com vidro', foto: 'perola', frase: 'Mesa redonda de base cônica e cadeiras de pés cruzados.' },
  { slug: 'agata', nome: 'Conjunto Ágata', tipo: 'conjuntos', novo: true, pecas: [['Mesa Ágata', 'M2023'], ['Cadeira Ágata', 'M2253']], cadeira: [0.93, 0.59, 0.52], alturaMesa: 0.78, tamanhos: ['1,80 x 0,90', '2,00 x 1,00', '2,20 x 1,10'], obs: 'Mesa em madeira tingida', foto: 'agata', fotoGrande: true, frase: 'Base cônica em madeira tingida e cadeiras com braço.' },
  { slug: 'antonella', nome: 'Conjunto Antonella', tipo: 'conjuntos', pecas: [['Mesa Antonella', 'M1416'], ['Cadeira Antonella', 'M1214']], cadeira: [0.98, 0.60, 0.64], alturaMesa: 0.78, tamanhos: ['1,37 x 1,37', '1,50 x 1,50'], obs: MV, foto: 'antonella', fotoGrande: true, frase: 'Mesa quadrada de base em pirâmide e cadeiras capitonê.' },
  { slug: 'celine', nome: 'Conjunto Celine', tipo: 'conjuntos', pecas: [['Mesa Celine', 'M2260'], ['Cadeira Celine', 'M2261']], cadeira: [0.92, 0.47, 0.49], alturaMesa: 0.79, tamanhos: T3, obs: `${MV}. Opção de cadeira Celine com ratan sextavado indiano.`, foto: 'celine', fotoGrande: true, extra: 'cadeira-celine-ratan', frase: 'Base em trapézio e cadeiras com encosto em ratan.' },
  { slug: 'valentine', nome: 'Conjunto Valentine', tipo: 'conjuntos', pecas: [['Mesa Valentine', 'M2243'], ['Cadeira Valentine', 'M2249']], cadeira: [0.91, 0.51, 0.53], alturaMesa: 0.77, tamanhos: T3, obs: 'Mesa em madeira e cadeira com ratan indiano', foto: 'valentine', frase: 'Madeira natural e cadeiras com ratan indiano.' },
  { slug: 'dominique', nome: 'Conjunto Dominique', tipo: 'conjuntos', pecas: [['Mesa Dominique', 'M2251'], ['Cadeira Dominique', 'M2250']], cadeira: [0.97, 0.50, 0.51], alturaMesa: 0.78, tamanhos: T3, foto: 'dominique', fotoGrande: true, frase: 'Base em X cruzado e cadeiras com encosto em X.' },
  { slug: 'vicenza', nome: 'Conjunto Vicenza', tipo: 'conjuntos', pecas: [['Mesa Vicenza', 'M2239'], ['Cadeira Vicenza', 'M2237']], cadeira: [0.93, 0.52, 0.62], alturaMesa: 0.79, tamanhos: ['1,20 / 1,40 / 1,60 / 1,80 x 0,90', '2,00 x 1,00', '2,20 x 1,10'], obs: MV, foto: 'vicenza', frase: 'Clássico de cadeiras com encosto em ripas verticais.' },
  { slug: 'madri', nome: 'Conjunto Madri', tipo: 'conjuntos', pecas: [['Mesa Madri', 'M2208'], ['Cadeira Madri', 'M2209']], cadeira: [0.85, 0.52, 0.51], alturaMesa: 0.78, tamanhos: ['1,37 x 1,37', '1,50 x 1,50'], obs: MV, foto: 'madri', frase: 'Mesa redonda de base em pés curvos.' },
  { slug: 'milano-orion', nome: 'Conjunto Mesa Milano com Cadeira Orion', curto: 'Milano + Orion', tipo: 'conjuntos', pecas: [['Mesa Milano', 'M2212'], ['Cadeira Orion', 'M1404']], cadeira: [0.89, 0.51, 0.51], alturaMesa: 0.78, tamanhos: ['1,20 x 1,20', '1,37 x 1,37'], foto: 'milano-orion', frase: 'Mesa redonda em cone e cadeiras giratórias de pés palito.' },
  { slug: 'berlim', nome: 'Conjunto Berlim', tipo: 'conjuntos', pecas: [['Mesa Berlim', 'M2201'], ['Cadeira Berlim', 'M2200']], cadeira: [0.98, 0.50, 0.55], alturaMesa: 0.78, tamanhos: ['1,20 x 1,20', '1,37 x 1,37', '1,50 x 1,50'], obs: MV, foto: 'berlim', fotoGrande: true, frase: 'Mesa quadrada com base em cruz e cadeiras de encosto alto.' },
  { slug: 'higia-adhara', nome: 'Conjunto Mesa Higia com Cadeira Adhara', curto: 'Higia + Adhara', tipo: 'conjuntos', pecas: [['Mesa Higia', 'M1400'], ['Cadeira Adhara', 'M1406']], cadeira: [0.92, 0.47, 0.55], alturaMesa: 0.78, tamanhos: ['1,00 x 1,00', '1,20 x 1,20'], obs: MV, foto: 'higia-adhara', fotoGrande: true, frase: 'Base de pés palito em tripé e cadeiras giratórias.' },
  { slug: 'lerida', nome: 'Conjunto Lérida', tipo: 'conjuntos', pecas: [['Mesa Lérida', 'M2236'], ['Cadeira Lérida', 'M2221']], cadeira: [0.90, 0.52, 0.55], alturaMesa: 0.78, tamanhos: T3, obs: MV, foto: 'lerida', frase: 'Base em curva e cadeiras estofadas.' },
  { slug: 'veneza', nome: 'Conjunto Veneza', tipo: 'conjuntos', pecas: [['Mesa Veneza', 'M2232'], ['Cadeira Veneza', 'M031']], cadeira: [1.05, 0.51, 0.49], alturaMesa: 0.78, tamanhos: ['1,00 x 1,00', '1,20 x 1,20', '1,37 x 1,37', '1,50 x 1,50'], obs: MV, foto: 'veneza', frase: 'Cadeiras de encosto alto com leque em madeira.' },
  { slug: 'alice-aurora', nome: 'Conjunto Mesa Alice Extensível com Cadeira Aurora', curto: 'Alice + Aurora', tipo: 'conjuntos', pecas: [['Mesa Alice extensível', 'M3305'], ['Cadeira Aurora', 'M3309']], cadeira: [0.97, 0.48, 0.56], alturaMesa: 0.78, tamanhos: ['Tamanho 01: 1,20 fechada / 1,80 aberta x 0,97', 'Tamanho 02: 1,40 fechada / 2,00 aberta x 0,97'], foto: 'alice-aurora', frase: 'Mesa extensível que cresce para receber mais gente.' },
  { slug: 'helena', nome: 'Conjunto Helena', tipo: 'conjuntos', pecas: [['Mesa Helena', 'M3322'], ['Cadeira Helena', 'M1211']], cadeira: [1.02, 0.49, 0.53], alturaMesa: 0.78, tamanhos: ['1,20 / 1,60 / 1,80 x 0,90', '1,20 x 1,20', '1,37 x 1,37', '1,50 x 1,50', '2,00 x 1,00', '2,20 x 1,10'], obs: MV, foto: 'helena', fotoGrande: true, frase: 'Cadeiras com encosto em losangos e mesa de pés palito.' },
  { slug: 'tereza', nome: 'Conjunto Tereza', tipo: 'conjuntos', pecas: [['Mesa Tereza', 'M3314'], ['Cadeira Tereza', 'M3313']], cadeira: [0.90, 0.52, 0.55], alturaMesa: 0.78, tamanhos: ['1,20 / 1,60 / 1,80 x 0,90', '1,20 x 1,20', '1,37 x 1,37', '1,50 x 1,50', '2,00 x 1,00', '2,20 x 1,10'], obs: MV, foto: 'tereza', frase: 'Linhas retas e cadeiras com detalhe em madeira no encosto.' },
  { slug: 'bethania', nome: 'Conjunto Bethânia', tipo: 'conjuntos', pecas: [['Mesa Bethânia', 'M3307'], ['Cadeira Bethânia', 'M3306']], cadeira: [0.97, 0.48, 0.56], alturaMesa: 0.78, tamanhos: ['1,20 / 1,60 / 1,80 x 0,90', '1,20 x 1,20', '1,37 x 1,37', '1,50 x 1,50', '2,00 x 1,00'], obs: MV, foto: 'bethania', fotoGrande: true, frase: 'Mesa de tampo em vidro e cadeiras estofadas de encosto reto.' },
  { slug: 'kelly', nome: 'Conjunto Kelly', tipo: 'conjuntos', pecas: [['Mesa Kelli', 'M3303'], ['Cadeira Kelli', 'M3302']], cadeira: [0.97, 0.48, 0.56], alturaMesa: 0.78, tamanhos: ['1,20 / 1,60 / 1,80 x 0,90', '1,20 x 1,20', '1,37 x 1,37', '1,50 x 1,50', '2,00 x 1,00', '2,20 x 1,10'], obs: MV, foto: 'kelly', frase: 'Madeira escura e cadeiras estofadas claras.' },
  { slug: 'joana', nome: 'Conjunto Joana', tipo: 'conjuntos', pecas: [['Mesa Joana', 'M3301'], ['Cadeira Joana', 'M3300']], cadeira: [0.97, 0.48, 0.56], alturaMesa: 0.78, tamanhos: ['1,20 / 1,60 / 1,80 x 0,90', '1,20 x 1,20', '1,37 x 1,37', '1,50 x 1,50', '2,00 x 1,00'], obs: MV, foto: 'joana', frase: 'Tampo de vidro e cadeiras estofadas claras.' },

  { slug: 'bistro-perola', nome: 'Conjunto Bistrô Pérola', curto: 'Bistrô Pérola', tipo: 'bistros', pecas: [['Bistrô Pérola', 'M1419'], ['Banqueta Pérola', 'M2073']], medidas: [['Bistrô', 'altura 1,04 · tampo 0,80 x 0,80'], ['Banqueta', 'altura 0,97 · 0,57 x 0,53']], foto: 'bistro-perola', frase: 'Banquetas de concha branca e bistrô redondo.' },
  { slug: 'bistro-adhara', nome: 'Conjunto Bistrô Adhara', curto: 'Bistrô Adhara', tipo: 'bistros', pecas: [['Bistrô Adhara', 'M1420'], ['Banqueta Adhara', 'M2072']], medidas: [['Bistrô', 'altura 1,10 · tampo 0,80 x 0,80'], ['Banqueta', 'altura 1,05 · 0,52 x 0,53']], obs: 'Bistrô com tampo quadrado ou redondo', foto: 'bistro-adhara', fotoGrande: true, frase: 'Banquetas giratórias em capitonê e bistrô em tripé.' },
  { slug: 'bistro-higia', nome: 'Bistrô Higia e Banqueta Orion', curto: 'Higia + Orion', tipo: 'bistros', pecas: [['Bistrô Higia redondo e quadrado', 'M1414'], ['Banqueta Orion', 'M1410']], medidas: [['Bistrô', 'altura 1,10 · tampo 0,70 x 0,70'], ['Banqueta', 'altura 1,05 · 0,52 x 0,53']], foto: 'bistro-higia', recorte: true, extra: 'banqueta-orion', frase: 'Bistrô de tampo quadrado ou redondo e banqueta estofada.' },

  { slug: 'cristaleira-kelli', nome: 'Cristaleira Kelli', tipo: 'cristaleiras', pecas: [['Cristaleira Kelli', 'M1197']], foto: 'cristaleira-kelli', recorte: true, frase: 'Duas gavetas e pés palito.' },
  { slug: 'cristaleira-valentine', nome: 'Cristaleira Valentine', tipo: 'cristaleiras', pecas: [['Cristaleira Valentine', 'M2025']], foto: 'cristaleira-valentine', recorte: true, frase: 'Portas com ratan indiano.' },
  { slug: 'cristaleira-isis', nome: 'Cristaleira Ísis', tipo: 'cristaleiras', pecas: [['Cristaleira Ísis', 'M900']], foto: 'cristaleira-isis', recorte: true, frase: 'Duas portas de vidro e duas gavetas.' },
  { slug: 'cristaleira-alice', nome: 'Cristaleira Alice', tipo: 'cristaleiras', pecas: [['Cristaleira Alice', 'M800']], foto: 'cristaleira-alice', recorte: true, frase: 'Vidro em três faces e base com gavetas.' },
  { slug: 'cristaleira-iris', nome: 'Cristaleira Íris', tipo: 'cristaleiras', pecas: [['Cristaleira Íris', 'M1234']], foto: 'cristaleira-iris', recorte: true, frase: 'Coluna estreita de vidro, para cantos.' },
  { slug: 'cristaleira-julia', nome: 'Cristaleira Julia', tipo: 'cristaleiras', pecas: [['Cristaleira Julia', 'M500']], foto: 'cristaleira-julia', recorte: true, frase: 'Frente curva e portas de madeira.' },
  { slug: 'cristaleira-mariana', nome: 'Cristaleira Mariana', tipo: 'cristaleiras', pecas: [['Cristaleira Mariana', 'M700']], foto: 'cristaleira-mariana', recorte: true, frase: 'Cantos arredondados e duas gavetas.' },

  { slug: 'mesa-lorena', nome: 'Mesa de Jantar Lorena Extensível', curto: 'Mesa Lorena', tipo: 'mesas', pecas: [['Mesa Lorena', 'M1222'], ['Base Betina', 'M1916']], medidas: [['Fechada 1,40', 'aberta 2,00 x 0,97'], ['Fechada 1,60', 'aberta 2,30 x 0,97'], ['Fechada 2,00', 'aberta 2,80 x 0,97'], ['Altura', '0,78']], obs: `${MV}. Também com base Betina.`, foto: 'mesa-lorena', recorte: true, extra: 'base-betina', frase: 'Abre até 2,80 m para os dias de casa cheia.' },
  { slug: 'cadeira-lorena', nome: 'Cadeira Lorena', tipo: 'mesas', pecas: [['Cadeira Lorena', 'M1415']], foto: 'cadeira-lorena', recorte: true, frase: 'Estofada, com encosto em gomos horizontais.' },
  { slug: 'mesa-carla', nome: 'Mesa de Jantar Carla', curto: 'Mesa Carla', tipo: 'mesas', pecas: [['Mesa Carla', 'M3318']], foto: 'mesa-carla', recorte: true, frase: 'Madeira maciça, pés retos e cantos suaves.' },
  { slug: 'cadeira-anne', nome: 'Cadeira Anne', tipo: 'mesas', pecas: [['Cadeira Anne', 'M3329']], foto: 'cadeira-anne', recorte: true, frase: 'Encosto em travessas e assento estofado.' },

  { slug: 'centro-perola', nome: 'Mesa de Centro Pérola', tipo: 'centro', pecas: [['Mesa de Centro Pérola', 'M2027']], medidas: [['Maior', 'altura 0,34'], ['Menor', 'altura 0,30']], foto: 'centro-perola', recorte: true, frase: 'Duas mesas que se encaixam, com ratan indiano.' },
  { slug: 'centro-valentine', nome: 'Mesa de Centro Valentine', tipo: 'centro', pecas: [['Mesa de Centro Valentine', 'M2026']], obs: 'Mesa com ratan indiano', foto: 'centro-valentine', recorte: true, frase: 'Dois nichos de ratan indiano no tampo.' },
  { slug: 'aparador-esparta', nome: 'Aparador Esparta', tipo: 'centro', pecas: [], foto: 'aparador-esparta', fotoGrande: true, frase: 'Nicho aberto, gavetas brancas e pés palito.' },
];

// Representantes, do site atual (nome da empresa, contato, telefones, região). uf: estados atendidos, para o filtro.
export const representantes = [
  { empresa: 'Antonio Carlos Guazi', contato: 'Antonio Carlos', fones: ['(41) 9 8900-1080'], regiao: 'Curitiba e região metropolitana', uf: ['PR'] },
  { empresa: 'Chica Representações', contato: 'Arci', fones: ['(54) 9 9972-2273'], regiao: 'Zona sul, centro e fronteira do RS', uf: ['RS'] },
  { empresa: 'Auriomar Luiz Ramos', contato: 'Auriomar', fones: ['(47) 9 9278-0922', '(47) 9 9171-7737'], regiao: 'Litoral de SC', uf: ['SC'] },
  { empresa: 'Daniel Felini', contato: 'Daniel', fones: ['(54) 9 8422-1517'], regiao: 'Serra Gaúcha, Vale do Taquari, Vale do Caí, Vale do Paranhana e Grande Porto Alegre', uf: ['RS'] },
  { empresa: 'Dfraga Representações', contato: 'Nadir', fones: ['(46) 9 9973-8297', '(46) 9 9106-4894'], regiao: 'Sudoeste e Oeste do PR', uf: ['PR'] },
  { empresa: 'Davoglio Representações', contato: 'Wanderlei', fones: ['(54) 9 9977-0066', '(54) 9 9628-8156'], regiao: 'Norte, Nordeste e Noroeste do RS', uf: ['RS'] },
  { empresa: 'Framinas Representações', contato: 'Geraldo', fones: ['(31) 9 9609-1159', '(31) 9 9490-3727'], regiao: 'Região Metropolitana de Belo Horizonte, Juiz de Fora, Vale do Aço, Vale do Rio Doce e Vale do Mucuri', uf: ['MG'] },
  { empresa: 'IPE Representações', contato: 'Aurelio', fones: ['(31) 9 9952-9919'], regiao: 'Sul e Oeste de MG e BH', uf: ['MG'] },
  { empresa: 'Ary Neuman Representações', contato: 'Jackson', fones: ['(19) 9 8126-2222'], regiao: 'Interior de São Paulo, Guaxupé (MG) e Andradas (MG)', uf: ['SP', 'MG'] },
  { empresa: 'Prata Representações', contato: 'Leandro', fones: ['(71) 9 9992-4740', '(71) 9 9322-1963'], regiao: 'Norte da Bahia: Feira–Irecê, Feira–Juazeiro, BR-116 Norte, Feira–Paulo Afonso e Recôncavo até Seabra', uf: ['BA'] },
  { empresa: 'Mario Antonio Patero', contato: 'Mario Antonio', fones: ['(43) 9 9102-3996'], regiao: 'Norte, Centro-Norte e Noroeste do PR', uf: ['PR'] },
  { empresa: 'Nova Era Representações', contato: 'Nova Era', fones: ['(41) 9 8747-0417', '(41) 3081-7631'], regiao: 'Curitiba e Prudentópolis', uf: ['PR'] },
  { empresa: 'Ranuzio Batista do Nascimento', contato: 'Ranuzio', fones: ['(75) 9 9127-0226'], regiao: 'Norte da BA e Sertão de PE', uf: ['BA', 'PE'] },
  { empresa: 'Renovar Representações', contato: 'Adriano', fones: ['(47) 9 9142-1379', '(47) 9149-6384'], regiao: 'Litoral de SC', uf: ['SC'] },
  { empresa: 'LC Representações', contato: 'Risovaldo', fones: ['(61) 9 8105-9148'], regiao: 'Goiás e Brasília', uf: ['GO', 'DF'] },
  { empresa: 'VC Oliveira', contato: 'Victor', fones: ['(79) 9 9962-5131'], regiao: 'Sergipe e Alagoas', uf: ['SE', 'AL'] },
  { empresa: 'Warley', contato: 'Warley', fones: ['(54) 9 9979-9331'], regiao: 'Norte, Nordeste e Noroeste do RS', uf: ['RS'] },
  { empresa: 'Weber Representações', contato: 'Cristofer', fones: ['(49) 9 8836-1158', '(49) 9 8816-9094'], regiao: 'Oeste e Sudoeste de SC até a BR-153, Lages', uf: ['SC'] },
];

export const ufs = { RS: 'Rio Grande do Sul', SC: 'Santa Catarina', PR: 'Paraná', SP: 'São Paulo', MG: 'Minas Gerais', GO: 'Goiás', DF: 'Distrito Federal', BA: 'Bahia', PE: 'Pernambuco', SE: 'Sergipe', AL: 'Alagoas' };
