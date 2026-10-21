// Conteúdo da LacFrios, tirado do site atual (lacfrios.com.br e as páginas antigas home/fabrica/produtos/mapa e os popups de receita).
// Nada aqui é inventado: o que não está no site atual fica de fora ou vira campo livre na lista de pedido.

export const empresa = {
  nome: 'LacFrios',
  nomeLongo: 'LacFrios Distribuidora',
  url: 'https://lacfrios.overtus.com.br/',
  antigo: 'http://www.lacfrios.com.br/',
  slogan: 'Distribuidor de frios, laticínios e conservas',
  desde: 1999,
  bairro: 'Portão',
  endereco: 'Rua João Borsato, 350',
  cidade: 'Curitiba - PR',
  cep: '81070-160',
  telefones: [
    { rotulo: '(41) 3229-7997', href: '+554132297997' },
    { rotulo: '(41) 3229-0123', href: '+554132290123' },
  ],
  // No site está "(41) 9115-5429" (antes do nono dígito). A confirmar se é WhatsApp.
  celular: { rotulo: '(41) 99115-5429', href: '+5541991155429', wa: '5541991155429' },
  email: 'lacfrios@lacfrios.com.br',
  contatos: 'Marli e Julio Cesar',
  entrega: 'Entregas em toda Curitiba e Região Metropolitana',
  mapa: 'https://www.google.com/maps?q=Rua+Jo%C3%A3o+Borsato,+350,+Port%C3%A3o,+Curitiba+-+PR&output=embed',
  mapaLink: 'https://www.google.com/maps/search/?api=1&query=Rua+Jo%C3%A3o+Borsato,+350,+Port%C3%A3o,+Curitiba+-+PR',
};

export const textos = {
  historia: 'A LacFrios foi fundada em 1999 no bairro do Portão, em Curitiba, como um atacado e varejo de produtos cuidadosamente selecionados.',
  linhaQueijos: 'A linha de produtos abrange os melhores queijos: mussarela, parmesão, provolone, prato, ricota, parmesão ralado, gorgonzola, gouda, gruyère, edam, estepe, minas e manteiga.',
  principais: 'Queijos, manteigas, requeijão, enlatados, congelados, embutidos, doces, secos, molhos e muito mais. Venha conhecer nossa loja.',
};

// Quem a LacFrios atende (linha cinza abaixo do logo no site atual). "sugestao" = itens do catálogo que o segmento costuma usar,
// só para começar a lista; o cliente edita.
export const segmentos = [
  { id: 'hoteis', nome: 'Hotéis', foto: 'hotel-buffet', texto: 'Queijos, frios, manteiga e requeijão para o café da manhã e a cozinha do hotel.', sugestao: ['mussarela', 'prato', 'minas', 'manteiga', 'requeijao', 'embutidos'] },
  { id: 'pizzarias', nome: 'Pizzarias', foto: 'pizza', texto: 'Mussarela em peça, provolone, gorgonzola e parmesão ralado para a pizza, mais molhos e conservas para a cozinha.', sugestao: ['mussarela', 'provolone', 'gorgonzola', 'parmesao-ralado', 'molhos', 'enlatados'] },
  { id: 'panificadoras', nome: 'Panificadoras', foto: 'pao-frances', texto: 'Frios para o balcão e para os lanches, manteiga e requeijão para a produção.', sugestao: ['mussarela', 'prato', 'manteiga', 'requeijao', 'embutidos'] },
  { id: 'lanchonetes', nome: 'Lanchonetes', foto: 'mortadela', texto: 'Queijo prato e mussarela, embutidos e congelados para manter o cardápio sempre completo.', sugestao: ['prato', 'mussarela', 'embutidos', 'congelados', 'molhos'] },
  { id: 'restaurantes', nome: 'Restaurantes', foto: 'balcao-frios', texto: 'Queijos para a cozinha e para o buffet, secos, conservas e molhos.', sugestao: ['parmesao', 'mussarela', 'gruyere', 'secos', 'enlatados', 'molhos'] },
  { id: 'cachorro-quente', nome: 'Cachorro-quente', foto: 'cachorro-quente', texto: 'Embutidos, molhos, conservas e queijo para quem vende lanche na rua ou no balcão.', sugestao: ['embutidos', 'molhos', 'enlatados', 'mussarela'] },
  { id: 'supermercados', nome: 'Supermercados', foto: 'supermercado', texto: 'Laticínios, frios e mercearia para a gôndola e o balcão de frios.', sugestao: ['mussarela', 'prato', 'requeijao', 'manteiga', 'embutidos', 'doces'] },
];

// Catálogo. Os itens com nome vêm do site atual. Nas linhas em que o site só cita a categoria, o cliente escreve o item.
export const categorias = [
  { id: 'queijos', nome: 'Queijos', foto: 'queijos-prateleira', texto: 'Doze queijos, do dia a dia da cozinha aos especiais.' },
  { id: 'manteigas', nome: 'Manteigas e requeijão', foto: 'manteiga', texto: 'Para a produção, o buffet e a gôndola.' },
  { id: 'embutidos', nome: 'Embutidos', foto: 'frios-prato', texto: 'Frios fatiados e em peça.' },
  { id: 'congelados', nome: 'Congelados', foto: 'tabua-frios', texto: 'Linha de congelados das marcas que distribuímos.' },
  { id: 'enlatados', nome: 'Enlatados e conservas', foto: 'conservas', texto: 'Conservas e enlatados para cozinha e revenda.' },
  { id: 'molhos', nome: 'Molhos', foto: 'forno-pizza', texto: 'Molhos para pizzaria, lanchonete e restaurante.' },
  { id: 'doces', nome: 'Doces', foto: 'padaria-vitrine', texto: 'Doces para revenda e confeitaria.' },
  { id: 'secos', nome: 'Secos', foto: 'parmesao', texto: 'Mercearia seca para completar o pedido.' },
];

export const produtos = [
  { id: 'mussarela', nome: 'Mussarela', cat: 'queijos', img: 'mussarela', nota: 'Peça' },
  { id: 'parmesao', nome: 'Parmesão', cat: 'queijos' },
  { id: 'parmesao-ralado', nome: 'Parmesão ralado', cat: 'queijos' },
  { id: 'provolone', nome: 'Provolone', cat: 'queijos', img: 'provolone' },
  { id: 'prato', nome: 'Prato', cat: 'queijos' },
  { id: 'ricota', nome: 'Ricota', cat: 'queijos' },
  { id: 'gorgonzola', nome: 'Gorgonzola', cat: 'queijos', img: 'gorgonzola' },
  { id: 'gouda', nome: 'Gouda', cat: 'queijos', img: 'gouda' },
  { id: 'gruyere', nome: 'Gruyère', cat: 'queijos' },
  { id: 'edam', nome: 'Edam', cat: 'queijos' },
  { id: 'estepe', nome: 'Estepe', cat: 'queijos' },
  { id: 'minas', nome: 'Minas', cat: 'queijos' },
  { id: 'manteiga', nome: 'Manteiga', cat: 'manteigas' },
  { id: 'requeijao', nome: 'Requeijão', cat: 'manteigas' },
  // categorias sem itens nomeados no site: entram na lista como "Embutidos" + o que o cliente escrever
  { id: 'embutidos', nome: 'Embutidos', cat: 'embutidos', livre: true },
  { id: 'congelados', nome: 'Congelados', cat: 'congelados', livre: true },
  { id: 'enlatados', nome: 'Enlatados e conservas', cat: 'enlatados', livre: true },
  { id: 'molhos', nome: 'Molhos', cat: 'molhos', livre: true },
  { id: 'doces', nome: 'Doces', cat: 'doces', livre: true },
  { id: 'secos', nome: 'Secos', cat: 'secos', livre: true },
];

// Logos da página Produtos do site atual.
export const marcas = [
  { id: 'frimesa', nome: 'Frimesa', w: 118, h: 72 },
  { id: 'perdigao', nome: 'Perdigão', w: 83, h: 80 },
  { id: 'sadia', nome: 'Sadia', w: 92, h: 50 },
  { id: 'batavo', nome: 'Batavo', w: 178, h: 120 },
];

// Fotos da página "Fábrica" do site atual, na ordem de lá.
export const fabrica = [
  { img: 'fab-vacuo', w: 350, h: 233, legenda: 'Embalagem a vácuo' },
  { img: 'fab-filadeira', w: 350, h: 233, legenda: 'Massa filada saindo da máquina' },
  { img: 'fab-mesa', w: 350, h: 233, legenda: 'Massa na mesa de trabalho' },
  { img: 'fab-mussarela', w: 350, h: 233, legenda: 'Mussarela em peça, embalada' },
  { img: 'fab-camara', w: 362, h: 543, legenda: 'Peças na câmara fria' },
  { img: 'fab-embalada', w: 350, h: 233, legenda: 'Fardos prontos para a expedição' },
  { img: 'fab-peca', w: 350, h: 233, legenda: 'Queijo em formato redondo, embalado' },
];

export const receitas = [
  {
    id: 'bruschettas', nome: 'Bruschettas', chamada: 'Aprecie com mussarela e uma deliciosa cobertura.', img: 'rec-bruschetta', w: 352, h: 223,
    ingredientes: ['Pão italiano amanhecido cortado em fatias de até 2 cm de espessura', 'Fio de azeite para regar cada fatia', 'Alho amassado (em pasta) com sal', 'Cobertura a gosto (por exemplo, mussarela)'],
    preparo: ['Leve as fatias de pão para pré-torrar (não deixe dourar).', 'Retire do forno.', 'Espalhe um fio de azeite em cada fatia e, com a ponta de uma colher de café, passe levemente a pasta de alho e sal.', 'Ponha a cobertura desejada.'],
    usa: ['mussarela'],
  },
  {
    id: 'estufadinhos', nome: 'Estufadinhos de queijo', chamada: 'O sabor do queijo gruyère, saído do forno na sua casa.', img: 'rec-estufadinho', w: 228, h: 122,
    ingredientes: ['1 xícara de farinha de trigo', '1 colher de chá de sal', '1 colher de chá de mostarda em pó', '1 pitada de pimenta-de-caiena', '1 xícara de água', '125 g de manteiga cortada em pedaços', '4 ovos', '75 g de queijo gruyère cortado em cubinhos', '1 colher de sopa de cebolinha bem picada'],
    preparo: [
      'Preaqueça o forno a 200 °C. Unte ligeiramente duas assadeiras grandes. Peneire juntos a farinha de trigo, o sal, a mostarda seca e a pimenta-de-caiena.',
      'Numa frigideira média, ferva a água com a manteiga em fogo médio-alto. Retire do fogo e acrescente a mistura de farinha de uma só vez, batendo com uma colher de pau até que a massa forme uma bola. Leve a frigideira de volta ao fogo e continue batendo por 1 ou 2 minutos para a mistura secar um pouco. Retire do fogo e deixe esfriar por 3 a 5 minutos.',
      'Acrescente 3 ovos à massa, um de cada vez, batendo bem após cada adição. Bata o quarto ovo em uma vasilha pequena e acrescente-o aos poucos, batendo bem até que a massa fique lisa e brilhante. Talvez não seja necessário usar o quarto ovo inteiro; reserve a sobra para pincelar. Misture os cubinhos de gruyère e a cebolinha.',
      'Com o auxílio de duas colheres de chá, faça pequenos montinhos de massa nas assadeiras, afastados 5 cm uns dos outros, pincelando-os com a sobra do ovo batido com 1 colher de sopa de água. Asse por 8 minutos, então reduza a temperatura para 180 °C e deixe por mais 7 a 8 minutos, até que estufem e fiquem dourados. Coloque-os numa grelha para esfriar um pouco. Sirva-os quentes.',
    ],
    usa: ['gruyere', 'manteiga'],
  },
];

export const creditos = 'Fotos de produção, mussarela, Kombi, receitas e logos de marcas: site atual da LacFrios. Demais fotos de comida e de estabelecimentos: bancos de imagem livres (Wikimedia Commons e Rawpixel), só ilustrativas.';
