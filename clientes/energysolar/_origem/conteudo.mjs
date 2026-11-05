// Textos e dados da Energy Solar, tirados de energysolarbr.com.br (home, quem somos, serviços, como funciona, obras,
// simulador e rodapé) em 30/10/2026. O que é texto nosso está marcado com "nosso".

export const empresa = {
  nome: 'Energy Solar',
  url: 'https://energysolar.overtus.com.br/',
  antigo: 'https://energysolarbr.com.br/',
  tel: '(71) 98266-2650',
  telHref: '+5571982662650',
  wa: '5571982662650',
  insta: 'https://www.instagram.com/energysolarbr/',
  instaNome: '@energysolarbr',
  rua: 'R. Nilson Costa, 356 – Vila Laura',
  cidade: 'Salvador – BA, 40270-550',
  mapa: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('R. Nilson Costa, 356, Vila Laura, Salvador - BA, 40270-550'),
  horario: [['Segunda a sexta', '9h às 18h'], ['Sábado', '9h às 14h']],
  area: 'Bahia e Sergipe',
};

export const waLink = (txt = 'Olá, vim do site da Energy Solar e gostaria de um orçamento de energia solar.') =>
  `https://wa.me/${empresa.wa}?text=${encodeURIComponent(txt)}`;

export const sobre = {
  frase: 'Empresa especializada na instalação e manutenção de sistemas fotovoltaicos On Grid e Off Grid.',
  area: 'Atuamos em todo território da Bahia e Sergipe. Instalamos sistemas em residências, condomínios, indústrias, comércio e rural.',
  slogan: ['Invista em energia limpa.', 'Faz bem para o planeta, faz bem para o seu bolso!'],
  marcas: 'As melhores marcas do mercado: inversores string e microinversores.',
};

// nosso: os textos curtos de cada tipo de cliente
export const segmentos = [
  { id: 'casa', nome: 'Residências', txt: 'Sistema no telhado da casa para reduzir a conta de luz da família.' },
  { id: 'predio', nome: 'Condomínios', txt: 'Energia para as áreas comuns: elevadores, bombas, portaria e iluminação.' },
  { id: 'fabrica', nome: 'Indústrias', txt: 'Projetos maiores para quem tem consumo alto e quer previsibilidade.' },
  { id: 'loja', nome: 'Comércio', txt: 'Lojas, escritórios e clínicas pagando menos energia todo mês.' },
  { id: 'trator', nome: 'Rural', txt: 'Sítios e fazendas, inclusive com sistema Off Grid onde a rede não chega.' },
];

export const servicos = [
  { id: 'projeto', nome: 'Projeto', txt: 'Elaboramos um projeto único e customizado para atender as suas necessidades.', mais: 'Analisamos a sua conta de luz, o telhado e o espaço disponível para dimensionar quantos painéis e qual inversor fazem sentido para o seu consumo.' },
  { id: 'homologacao', nome: 'Homologação', txt: 'Cuidamos de todo o processo de legalização junto à distribuidora. Sem dor de cabeça para você!', mais: 'Toda a papelada e o pedido de conexão ficam com a nossa equipe, até a troca do medidor pelo relógio bidirecional.' },
  { id: 'instalacao', nome: 'Instalação', txt: 'Instalamos o seu sistema usando os melhores equipamentos do mercado.', mais: 'Equipe própria na montagem dos painéis, do inversor (string ou microinversores) e na ligação com o quadro de luz.' },
  { id: 'manutencao', nome: 'Manutenção', txt: 'Manutenção de sistemas fotovoltaicos On Grid e Off Grid.', mais: 'Limpeza dos painéis, revisão das conexões e verificação do inversor para o sistema continuar gerando o que foi projetado.' },
];

export const tipos = [
  { nome: 'On Grid', txt: 'Ligado à rede da distribuidora. O que sobra de energia vira crédito na conta de luz.' }, // nosso
  { nome: 'Off Grid', txt: 'Com baterias, para lugares onde a rede não chega ou que precisam de independência.' }, // nosso
];

export const etapas = [
  { id: 'painel', nome: 'Painel Solar', txt: 'O painel solar (módulo fotovoltaico) reage com a luz do sol e produz energia elétrica. As placas, instaladas geralmente sobre os telhados, são conectadas entre si e geram a energia que vai para o inversor solar.' },
  { id: 'inversor', nome: 'Inversor Solar', txt: 'O inversor converte a energia dos painéis (corrente contínua, CC) em corrente alternada (CA), que pode ser usada em toda a casa ou empresa: aparelhos eletrônicos, chuveiros, lâmpadas e etc.' },
  { id: 'quadro', nome: 'Energia para a sua casa', txt: 'A energia que sai do inversor vai para o quadro de luz e é distribuída pela casa ou empresa, reduzindo a quantidade de energia comprada da distribuidora. Um sistema bem planejado reduz a conta de luz para o mínimo.' },
  { id: 'medidor', nome: 'Créditos de energia', txt: 'O que não for consumido entra na rede da concessionária pelo relógio de luz bidirecional e fica como crédito por 60 meses, para os períodos noturnos ou quando o consumo aumenta.' },
];

export const comoFunciona = {
  intro: 'A energia solar fotovoltaica é a energia obtida da conversão direta da luz em eletricidade. Isso é possível graças às chamadas células fotovoltaicas, componente dos painéis solares (placa solar de silício).',
  intro2: 'Diferente de outros sistemas, como o de aquecimento solar, a energia fotovoltaica produz eletricidade para a maioria dos equipamentos e aparelhos residenciais, comerciais e industriais.',
};

export const obras = [
  { kwp: '41,40', cidade: 'Salvador-BA', tipo: 'Residencial', foto: 'obra-4140' },
  { kwp: '10,81', cidade: 'Camaçari-BA', tipo: 'Residencial', foto: 'obra-1081' },
  { kwp: '9,45', cidade: 'Camaçari-BA', tipo: 'Residencial', foto: 'obra-945' },
];

// [arquivo, largura, altura, alt]
export const fotos = {
  'obra-4140': ['obra-4140.webp', 1280, 719, 'Vista aérea de casa em Salvador com sistema fotovoltaico de 41,40 kWp instalado pela Energy Solar'],
  'obra-1081': ['obra-1081.webp', 1280, 719, 'Casa em Camaçari com sistema fotovoltaico de 10,81 kWp no telhado'],
  'obra-945': ['obra-945.webp', 1280, 719, 'Casa com piscina em Camaçari e sistema fotovoltaico de 9,45 kWp'],
  instalador: ['instalador.webp', 1280, 960, 'Instalador da Energy Solar montando painéis solares sobre telhado de cerâmica'],
  'painel-ceu': ['painel-ceu.webp', 1151, 768, 'Fileiras de painéis solares sob o céu'],
  'por-do-sol': ['por-do-sol.webp', 854, 330, 'Painéis solares ao pôr do sol'],
  tecnico: ['tecnico.webp', 1400, 933, 'Técnico conferindo um sistema de painéis solares'],
  manutencao: ['manutencao.webp', 1200, 800, 'Técnico fazendo a manutenção de painéis solares'],
};
