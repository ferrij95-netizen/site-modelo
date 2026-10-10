// Textos do site da 360 POA Gastrobar. Fonte: site atual (360poa.com, lido em 2026-10-10),
// matéria da Prefeitura de Porto Alegre sobre a inauguração (out/2018) e matéria do Bom Gourmet (dez/2018).
// Nada aqui é inventado: o que ainda precisa ser confirmado com o restaurante está em LEIA-ME.md.

export const site = {
  nome: '360 POA Gastrobar',
  curto: '360 POA',
  dominio: 'https://360poa.overtus.com.br',
  zap: '5551992795006',
  fone: '(51) 99279-5006',
  email: 'contato@360poa.com',
  endereco: 'Av. Pres. João Goulart, 551',
  bairro: 'Centro Histórico, Porto Alegre/RS',
  cep: '90010-120',
  horario: 'Aberto das 11:00 às 22:30',
  abre: [11, 0],
  fecha: [22, 30],
  lat: -30.03399,
  lon: -51.24320,
  cardapioPdf: 'https://www.360poa.com/docs/cardapio-360.pdf',
  redes: [
    ['Instagram', 'https://www.instagram.com/360gastro/', '@360gastro'],
    ['Facebook', 'https://www.facebook.com/360gastrobar', '/360gastrobar'],
  ],
  mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.100015609102!2d-51.24320128488514!3d-30.03398838188608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197917f3424b09%3A0x2b3e378ea238516f!2sAv.%20Pres.%20Jo%C3%A3o%20Goulart%2C%20551%20-%20Centro%20Hist%C3%B3rico%2C%20Porto%20Alegre%20-%20RS%2C%2090010-120!5e0!3m2!1spt-BR!2sbr!4v1629148083248!5m2!1spt-BR!2sbr',
  rota: 'https://www.google.com/maps/dir/?api=1&destination=360+POA+Gastrobar,+Av.+Pres.+Jo%C3%A3o+Goulart,+551,+Porto+Alegre',
};

// Mesmo menu do site atual (Home, O Restaurante, Cardápio, Eventos, Contato), mais Galeria e Reservas.
export const menu = [
  ['index', 'Home'],
  ['o-restaurante', 'O Restaurante'],
  ['cardapio', 'Cardápio'],
  ['eventos', 'Eventos'],
  ['galeria', 'Galeria'],
  ['contato', 'Contato'],
];

export const paginas = {
  index: ['360 POA Gastrobar · gastronomia com vista para o Guaíba', 'Restaurante na orla do Guaíba, no Parque Moacyr Scliar, em Porto Alegre. Gastronomia contemporânea sulista, carnes nobres e o pôr do sol mais bonito da cidade. Aberto das 11:00 às 22:30.'],
  'o-restaurante': ['O Restaurante · 360 POA Gastrobar', 'Inaugurado em outubro de 2018, junto ao Parque Moacyr Scliar, às margens do Guaíba. Conheça a história e o espaço do 360 POA Gastrobar.'],
  cardapio: ['Cardápio · 360 POA Gastrobar', 'Gastronomia contemporânea sulista, com foco em carnes nobres e ingredientes frescos, em grande parte orgânicos. Veja o cardápio do 360 POA.'],
  eventos: ['Eventos · 360 POA Gastrobar', 'Faça seu evento no 360 POA Gastrobar, com áreas interna e externa e vista para o Guaíba. Fale com a equipe pelo WhatsApp.'],
  galeria: ['Galeria · 360 POA Gastrobar', 'Olhares do 360 POA Gastrobar: o deck, o salão envidraçado e o pôr do sol no Guaíba.'],
  contato: ['Contato e reservas · 360 POA Gastrobar', 'Faça sua reserva, tire dúvidas ou peça informações. Av. Pres. João Goulart, 551, Centro Histórico, Porto Alegre/RS. Aberto das 11:00 às 22:30.'],
};

// Textos do site atual, organizados.
export const textos = {
  heroTitulo: 'Bem-vindo!',
  heroSub: 'Gastronomia contemporânea sulista e o pôr do sol do Guaíba, de frente, em 360 graus.',
  conhecaEyebrow: 'Conceito e Qualidade',
  conhecaTitulo: 'Conheça nosso espaço',
  conheca: 'Após 247 anos da fundação de Porto Alegre, foi inaugurado em outubro de 2018 o 360 POA Gastrobar, junto ao Parque Moacyr Scliar, dentro do projeto urbano que devolveu a orla do Guaíba à cidade.',
  conheca2: 'Somos referência entre os restaurantes turísticos do Rio Grande do Sul: gastronomia contemporânea sulista, com foco em carnes nobres e ingredientes frescos, em grande parte orgânicos, num espaço moderno com vista para o pôr do sol.',
  chamada: 'Venha apreciar o que temos de melhor!',
  faleTitulo: 'Fale Conosco',
  fale: 'Entre em contato com a nossa equipe agora mesmo para fazer sua reserva, tirar dúvidas ou solicitar informações.',
  cardapioTitulo: 'Nosso Cardápio',
};

// Números confirmados nas matérias da inauguração (Prefeitura e Bom Gourmet, 2018).
export const numeros = [
  ['2018', 'Inaugurado em 23 de outubro, junto à nova orla do Guaíba'],
  ['250', 'Pessoas ao mesmo tempo, entre salão e áreas externas'],
  ['360°', 'De vista para o Guaíba, num prédio redondo de vidro'],
  ['7 dias', 'Aberto todos os dias, das 11:00 às 22:30'],
];

// O que a cozinha valoriza (site atual + Bom Gourmet).
export const sabores = [
  ['Carnes nobres', 'Cortes selecionados, o foco da casa desde a abertura.'],
  ['Ingredientes frescos', 'Em grande parte orgânicos, escolhidos para cada estação.'],
  ['Butiá', 'A fruta do Sul aparece até na mostarda da casa.'],
  ['Queijo serrano', 'O queijo dos Campos de Cima da Serra, com a cara do Rio Grande.'],
  ['Defumados', 'Sabores de fogo e fumaça, à moda gaúcha.'],
  ['Catchup de goiaba', 'Condimentos feitos na casa, com fruta brasileira.'],
];

// As oito fotos da galeria "Olhares" do site atual, com o que cada uma mostra.
export const fotos = [
  ['vidro-por-do-sol', 'O salão envidraçado sobre o Guaíba ao pôr do sol'],
  ['deck-luzes', 'O jardim e o deck iluminados à noite'],
  ['passarela', 'A passarela da orla, com o 360 POA ao fundo, ao entardecer'],
  ['salao-vidro', 'O sol se pondo atrás do salão de vidro'],
  ['deck-salao', 'Mesas do deck numa noite cheia'],
  ['varanda-noite', 'A varanda coberta, com luzes e plantas, à noite'],
  ['entrada', 'A entrada do 360 POA Gastrobar na orla'],
  ['fachada-por-do-sol', 'O prédio redondo do 360 POA com o céu alaranjado'],
];

// Um dia no 360: os momentos do horário de funcionamento (11:00 às 22:30).
export const momentos = [
  ['11:00', 'Almoço', 'A casa abre para o almoço, com a luz do dia entrando pelo salão de vidro.'],
  ['Tarde', 'Na orla', 'O parque, a passarela e o Guaíba logo ali. Uma mesa no deck faz a tarde render.'],
  ['sol', 'Pôr do sol', 'O momento mais disputado: o céu muda de cor bem na frente das mesas.'],
  ['22:30', 'Noite', 'As luzes do deck se acendem e o jantar segue até o fechamento.'],
];

// Para quem é o espaço de eventos. A casa recebe pedidos de evento pelo WhatsApp (link "Eventos" do site atual).
export const eventos = [
  ['Aniversários', 'Comemore com a família e os amigos com o pôr do sol como cenário.', 'deck-salao'],
  ['Confraternizações', 'Encontros de fim de ano, equipes e turmas, no salão ou no deck.', 'varanda-noite'],
  ['Eventos corporativos', 'Almoços e jantares de negócios com uma vista que impressiona visitantes.', 'salao-vidro'],
  ['Celebrações especiais', 'Pedidos, bodas e datas que merecem um lugar à altura.', 'vidro-por-do-sol'],
];
