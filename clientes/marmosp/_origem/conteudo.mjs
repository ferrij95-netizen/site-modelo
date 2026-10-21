// Conteúdo da Marmoraria São Paulo. Textos do site atual (marmosp.com.br, Wix) e do Instagram @marmoraria_saopaulo;
// o que foi escrito por nós (descrição de ambientes, etapas) está marcado em LEIA-ME.md como "a confirmar".
export const empresa = {
  nome: 'Marmoraria São Paulo',
  curto: 'MSP',
  desde: 1952,
  anos: 2026 - 1952,
  url: 'https://marmosp.overtus.com.br/',
  antigo: 'http://www.marmosp.com.br/',
  fone: '(11) 2309-5322',
  foneHref: '+551123095322',
  wa: '5511982055775',
  waTexto: '(11) 98205-5775',
  email: 'marmosp@hotmail.com',
  instagram: 'https://www.instagram.com/marmoraria_saopaulo/',
  arroba: '@marmoraria_saopaulo',
  rua: 'R. Nova dos Portugueses, 978',
  bairro: 'Chora Menino',
  cidade: 'São Paulo - SP',
  cep: '02462-081',
  mapa: 'https://www.google.com/maps?q=Marmoraria+S%C3%A3o+Paulo,+R.+Nova+dos+Portugueses,+978+-+Chora+Menino,+S%C3%A3o+Paulo+-+SP,+02462-081&output=embed',
  rotas: 'https://www.google.com/maps/dir/?api=1&destination=R.+Nova+dos+Portugueses,+978+-+Chora+Menino,+S%C3%A3o+Paulo+-+SP,+02462-081',
};

// Texto "Quem somos nós" do site atual, palavra por palavra.
export const quemSomos = 'Desde 1952 oferecendo os melhores serviços. Nós trabalhamos com os melhores tipos de mármore do mercado e em muitas variações, assim como também realizamos as instalações com a melhor qualidade possível! Atendemos pessoa física e jurídica.';

export const historia = [
  `A Marmoraria São Paulo trabalha com pedra desde ${1952}. São mais de ${2026 - 1952} anos cortando, polindo e instalando mármores e granitos. Hoje a loja e a oficina ficam na rua Nova dos Portugueses, no Chora Menino, Zona Norte de São Paulo.`,
  'A fachada da loja é o nosso cartão de visita: um muro montado com retalhos de dezenas de pedras diferentes, ao lado do portão vermelho e da placa que muita gente da região conhece de longe.',
  'Atendemos pessoa física e jurídica: o morador que reforma a cozinha, o arquiteto que especifica uma ilha em ônix e a construtora que precisa de bancadas, soleiras e peitoris para a obra inteira.',
];

export const ambientes = [
  { id: 'cozinhas', nome: 'Cozinhas e ilhas', foto: 'ilha-onix', alt: 'Ilha de cozinha e pia em Ônix Cristallo', legenda: 'Ilha e pia em Ônix Cristallo',
    texto: 'Bancadas, ilhas e pias com a pedra escolhida por você, cortadas na medida do projeto, com recortes para cooktop e cuba e acabamento das bordas.',
    itens: ['Bancadas e ilhas', 'Pias com cuba esculpida ou de embutir', 'Frontões e saias', 'Recorte para cooktop e torneira'] },
  { id: 'banheiros', nome: 'Banheiros e lavabos', foto: 'banheiro-branco', alt: 'Bancada branca de banheiro com metais dourados', legenda: 'Bancada de banheiro com cuba esculpida',
    texto: 'Bancadas com cuba esculpida na própria pedra, nichos, saias e revestimento de parede para banheiros e lavabos.',
    itens: ['Cuba esculpida', 'Bancadas e nichos', 'Revestimento de parede', 'Soleiras e baguetes de box'] },
  { id: 'externas', nome: 'Áreas externas e piscinas', foto: 'piscina-cascata', alt: 'Parede de pedra com cascata junto à piscina', legenda: 'Parede de pedra com cascata na piscina',
    texto: 'Pedras para quem vive a área externa: bordas de piscina, paredes com cascata, pisos e churrasqueiras.',
    itens: ['Bordas de piscina', 'Paredes e cascatas em pedra', 'Pisos antiderrapantes', 'Churrasqueiras e bancadas gourmet'] },
  { id: 'pecas', nome: 'Peças especiais', foto: 'cuba-pedra', alt: 'Cuba esculpida em pedra natural translúcida', legenda: 'Cuba esculpida em pedra natural',
    texto: 'Peças sob medida para dar o toque final: cubas esculpidas em pedra bruta, tampos de mesa, escadas, soleiras e peitoris.',
    itens: ['Cubas em pedra bruta', 'Tampos de mesa', 'Escadas e degraus', 'Soleiras e peitoris'] },
];

export const pedras = [
  { id: 'onix', nome: 'Ônix', foto: 'pedra-onix', texto: 'Translúcido e cheio de veios. Fica marcante em ilhas, lavabos e painéis, como a ilha em Ônix Cristallo.' },
  { id: 'branco', nome: 'Mármores brancos', foto: 'pedra-branco', texto: 'Fundo claro com veios cinza ou dourados. O clássico de banheiros e bancadas elegantes.' },
  { id: 'bege', nome: 'Mármores bege', foto: 'pedra-bege', texto: 'Tons quentes e discretos, que combinam com madeira e iluminação indireta.' },
  { id: 'mosaico', nome: 'Granitos', foto: 'pedra-mosaico', texto: 'Resistentes ao uso do dia a dia, em dezenas de cores: do preto absoluto ao amarelo. Todos estão no muro da nossa loja.' },
  { id: 'ardosia', nome: 'Pedras para área externa', foto: 'pedra-ardosia', texto: 'Filetes e pedras rústicas para paredes, cascatas e bordas de piscina.' },
  { id: 'cristal', nome: 'Pedras brutas', foto: 'pedra-cristal', texto: 'Blocos naturais esculpidos à mão para cubas e peças únicas.' },
];

export const etapas = [
  { n: '01', t: 'Visita e medição', d: 'Vamos até a obra, conferimos o projeto e tiramos as medidas no local.' },
  { n: '02', t: 'Escolha da pedra', d: 'Você vê as chapas e amostras na loja e escolhe cor, veio e acabamento.' },
  { n: '03', t: 'Corte e acabamento', d: 'A peça é cortada na medida, com recortes, bordas e polimento.' },
  { n: '04', t: 'Instalação', d: 'Nossa equipe instala e entrega tudo nivelado, vedado e limpo.' },
];

export const obras = [
  { foto: 'ilha-onix', alt: 'Ilha de cozinha e pia em Ônix Cristallo', t: 'Ilha e pia em Ônix Cristallo', d: 'Cozinha', w: 864, h: 1080 },
  { foto: 'banheiro-madeira', alt: 'Banheiro com bancada em pedra e marcenaria', t: 'Bancada de banheiro com nicho', d: 'Banheiro', w: 1080, h: 1440 },
  { foto: 'piscina-cascata', alt: 'Parede de pedra com cascata na piscina', t: 'Parede com cascata', d: 'Área externa', w: 1080, h: 1080 },
  { foto: 'banheiro-branco', alt: 'Bancada branca com metais dourados', t: 'Bancada com cuba esculpida', d: 'Banheiro', w: 1080, h: 1350 },
  { foto: 'cuba-pedra', alt: 'Cuba esculpida em pedra natural', t: 'Cuba em pedra bruta', d: 'Peça especial', w: 1080, h: 1080 },
  { foto: 'fachada', alt: 'Fachada da Marmoraria São Paulo com muro de pedras e portão vermelho', t: 'Nossa fachada', d: 'Mosaico de granitos', w: 1600, h: 1015 },
];

export const marmomac = { foto: 'marmomac-2025', alt: 'Estande com móveis em pedra na feira Marmomac 2025', t: 'Marmomac 2025', d: 'Fomos à Marmomac, a maior feira de pedras naturais do mundo, em Verona (Itália), para trazer as novidades em pedras e acabamentos.' };
