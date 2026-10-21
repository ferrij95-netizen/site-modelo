// Conteúdo do site, tirado de fundi.art.br (outubro de 2026). Legendas das obras como estão no site atual, com erros de digitação corrigidos.
export const empresa = {
  nome: 'Fundiart',
  razao: 'Fundiart Fundição Artística Ltda.',
  url: 'https://fundiart.overtus.com.br/',
  antigo: 'http://www.fundi.art.br/',
  fone: '(19) 3124-3500', foneHref: '+551931243500',
  fax: '(19) 3124-3501',
  email: 'contato@fundi.art.br',
  endereco: ['Rua Francisco Carlos de Castro Neves, 1.551', 'Distrito Industrial Unileste', 'CEP 13.422-170 · Piracicaba, SP'],
  enderecoLinha: 'Rua Francisco Carlos de Castro Neves, 1551, Distrito Industrial Unileste, Piracicaba - SP, 13422-170',
  mapa: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Rua Francisco Carlos de Castro Neves, 1551, Piracicaba - SP'),
  mapaEmbed: 'https://maps.google.com/maps?q=-22.728047,-47.595091&z=15&output=embed',
  rotas: ['Campinas', 'São Paulo', 'São Pedro', 'Rio Claro', 'Limeira', 'Tietê'],
  metais: ['Bronze', 'Alumínio', 'Latão'],
};

// Texto da página Apresentação do site atual, em parágrafos.
export const apresentacao = [
  'A FUNDIART é uma tradicional fundição de metais não ferrosos (alumínio, bronze e latão), especializada em obras de arte, objetos de decoração, utilitários, ornamentos para jazigo, placas em geral, troféus, bustos, monumentos de grande porte entre outros.',
  'Nossa clientela é formada por artistas plásticos, designers, arquitetos, marmoristas, órgãos públicos e particulares.',
  'Para atendermos esta vasta gama de clientes possuímos um quadro de funcionários do mais alto nível, os quais interagem diretamente com os clientes atendendo suas necessidades e transformando suas ideias em realidade.',
  'Conquistamos também nossos clientes pela qualidade de nossos produtos e fidelidade na reprodução das peças.',
  'Temos também um grande compromisso com o meio ambiente utilizando matérias-primas recicláveis.',
  'Por todos esses motivos a FUNDIART se tornou a maior fundição do Brasil e continuará sempre crescendo e inovando para poder atingir o melhor objetivo: o seu.',
];

export const publicos = ['Artistas plásticos', 'Designers', 'Arquitetos', 'Marmoristas', 'Órgãos públicos', 'Particulares'];
export const fazemos = ['Obras de arte', 'Objetos de decoração', 'Utilitários', 'Ornamentos para jazigo', 'Placas em geral', 'Troféus', 'Bustos', 'Monumentos de grande porte'];

export const categorias = [
  { slug: 'esculturas', nome: 'Esculturas', texto: 'Peças de artistas plásticos reproduzidas em bronze, alumínio e latão, com pátina, polimento ou pintura.' },
  { slug: 'monumentos', nome: 'Monumentos', texto: 'Monumentos e bustos de grande porte, figuras em tamanho natural para praças, parques e órgãos públicos.' },
  { slug: 'trofeus', nome: 'Troféus', texto: 'Troféus de autor para festivais, prêmios e competições, fundidos em série com o mesmo acabamento.' },
  { slug: 'jazigos', nome: 'Ornamentos para jazigos', texto: 'Imagens sacras, vasos, crucifixos, placas, letras e puxadores em bronze para marmoristas.' },
];

// Obras das galerias Trabalhos do site atual (id = foto em /assets/img/obras/<id>.webp).
export const obras = [{"id":959,"cat":"esculturas","w":472,"h":640,"titulo":"Três Jovens","autor":"Lasar Segall","dim":"1,20 m","material":"Bronze patinado"},
  {"id":961,"cat":"esculturas","w":240,"h":180,"titulo":"Escultura"},
  {"id":960,"cat":"esculturas","w":236,"h":480,"titulo":"Namoro","autor":"Margarita Farre","material":"Alumínio pintado"},
  {"id":962,"cat":"esculturas","w":480,"h":502,"titulo":"Estrela Guia","autor":"Fernando Cardoso","dim":"1,12 m x 70 x 77 cm","material":"Bronze patinado"},
  {"id":963,"cat":"esculturas","w":386,"h":640,"titulo":"O Muro","autor":"Margarita Farre"},
  {"id":977,"cat":"esculturas","w":500,"h":375,"titulo":"Escultura"},
  {"id":990,"cat":"esculturas","w":480,"h":640,"titulo":"Escultura"},
  {"id":991,"cat":"esculturas","w":480,"h":640,"titulo":"Escultura"},
  {"id":992,"cat":"esculturas","w":452,"h":640,"titulo":"Escultura"},
  {"id":993,"cat":"esculturas","w":425,"h":336,"titulo":"Escultura"},
  {"id":999,"cat":"esculturas","w":433,"h":640,"titulo":"Escultura"},
  {"id":1000,"cat":"esculturas","w":180,"h":247,"titulo":"Escultura"},
  {"id":1034,"cat":"esculturas","w":480,"h":640,"titulo":"Niana","autor":"Eliana Kertesz","material":"Bronze patinado"},
  {"id":1035,"cat":"esculturas","w":346,"h":640,"titulo":"Companheiro","autor":"Fernando Cardoso","material":"Bronze polido"},
  {"id":1036,"cat":"esculturas","w":416,"h":640,"titulo":"Ballet","autor":"Alaydes Ruschel","material":"Alumínio e bronze"},
  {"id":1037,"cat":"esculturas","w":394,"h":640,"titulo":"Escultura"},
  {"id":1038,"cat":"esculturas","w":315,"h":513,"titulo":"Rodopio","autor":"Alaydes Ruschel","material":"Bronze e resina"},
  {"id":1039,"cat":"esculturas","w":290,"h":400,"titulo":"Evolutio","autor":"Yole Travassos","material":"Bronze"},
  {"id":1040,"cat":"esculturas","w":260,"h":400,"titulo":"Repouso","autor":"Yole Travassos","material":"Bronze"},
  {"id":1041,"cat":"esculturas","w":455,"h":640,"titulo":"Escultura","autor":"Sara Nach","material":"Bronze"},
  {"id":1042,"cat":"esculturas","w":171,"h":300,"titulo":"Escultura","autor":"Sara Nach","material":"Bronze"},
  {"id":1051,"cat":"esculturas","w":480,"h":640,"titulo":"Escultura"},
  {"id":1052,"cat":"esculturas","w":480,"h":640,"titulo":"Escultura"},
  {"id":1053,"cat":"esculturas","w":618,"h":410,"titulo":"Escultura"},
  {"id":1054,"cat":"esculturas","w":618,"h":410,"titulo":"Escultura"},
  {"id":1055,"cat":"esculturas","w":480,"h":640,"titulo":"Escultura"},
  {"id":953,"cat":"monumentos","w":480,"h":640,"titulo":"Cavaleiro","autor":"Neusa Moraes","dim":"6x5 m","material":"Bronze (em acabamento)"},
  {"id":954,"cat":"monumentos","w":240,"h":328,"titulo":"Carlos Drummond de Andrade e Mario Quintana","autor":"Francisco Stockinger","dim":"3 m de altura","material":"Bronze patinado"},
  {"id":986,"cat":"monumentos","w":360,"h":480,"titulo":"Monumento"},
  {"id":987,"cat":"monumentos","w":361,"h":480,"titulo":"Padre Eustáquio","autor":"Edu Santos","dim":"3,3 m de altura","material":"Bronze com pátina"},
  {"id":988,"cat":"monumentos","w":418,"h":640,"titulo":"Monumento"},
  {"id":989,"cat":"monumentos","w":405,"h":640,"titulo":"Passaredo","autor":"Odette Eid","material":"Bronze patinado"},
  {"id":998,"cat":"monumentos","w":260,"h":390,"titulo":"Monumento aos Imigrantes, Manoel Giesteira","autor":"Alcione","dim":"Figuras em tamanho natural","material":"Bronze patinado"},
  {"id":1031,"cat":"monumentos","w":384,"h":480,"titulo":"Namoro","autor":"Margarita Farre","material":"Bronze patinado"},
  {"id":1032,"cat":"monumentos","w":500,"h":375,"titulo":"Portadora de Perfume","autor":"Victor Brecheret","material":"Bronze patinado"},
  {"id":1033,"cat":"monumentos","w":480,"h":360,"titulo":"Monumento"},
  {"id":1043,"cat":"monumentos","w":481,"h":640,"titulo":"Golias","dim":"Tamanho natural","material":"Bronze","autor":"Edu Santos"},
  {"id":1044,"cat":"monumentos","w":641,"h":480,"titulo":"Golias","dim":"Tamanho natural","material":"Bronze","autor":"Edu Santos"},
  {"id":1049,"cat":"monumentos","w":426,"h":640,"titulo":"Monumento"},
  {"id":1050,"cat":"monumentos","w":480,"h":640,"titulo":"Monumento"},
  {"id":958,"cat":"trofeus","w":640,"h":480,"titulo":"Troféus do Festival de Teatro Curta Santos","autor":"Luis Garcia","dim":"30 cm","material":"Bronze patinado"},
  {"id":980,"cat":"trofeus","w":640,"h":480,"titulo":"Troféu"},
  {"id":981,"cat":"trofeus","w":640,"h":480,"titulo":"Troféu APCA","autor":"Francisco Brennand","material":"Bronze patinado"},
  {"id":996,"cat":"trofeus","w":341,"h":480,"titulo":"Troféu Fórmula Truck","autor":"Luis Garcia","material":"Bronze patinado e alumínio polido"},
  {"id":997,"cat":"trofeus","w":640,"h":480,"titulo":"Troféu"},
  {"id":1027,"cat":"trofeus","w":480,"h":640,"titulo":"Troféu"},
  {"id":1028,"cat":"trofeus","w":480,"h":640,"titulo":"Troféu"},
  {"id":1029,"cat":"trofeus","w":640,"h":480,"titulo":"Troféu"},
  {"id":1030,"cat":"trofeus","w":480,"h":640,"titulo":"Troféu"},
  {"id":1045,"cat":"trofeus","w":480,"h":640,"titulo":"Troféu"},
  {"id":1046,"cat":"trofeus","w":480,"h":640,"titulo":"Troféu"},
  {"id":1047,"cat":"trofeus","w":267,"h":480,"titulo":"Troféu"},
  {"id":1048,"cat":"trofeus","w":545,"h":480,"titulo":"Troféu"},
  {"id":967,"cat":"jazigos","w":480,"h":640,"titulo":"Vaso"},
  {"id":970,"cat":"jazigos","w":480,"h":640,"titulo":"Vaso Bojudo 4 Rosas","material":"Bronze polido"},
  {"id":994,"cat":"jazigos","w":640,"h":480,"titulo":"Conjunto de imagens em jazigo"},
  {"id":968,"cat":"jazigos","w":372,"h":640,"titulo":"Imagem sacra"},
  {"id":982,"cat":"jazigos","w":422,"h":640,"titulo":"Anjo"},
  {"id":983,"cat":"jazigos","w":428,"h":640,"titulo":"Anjo"},
  {"id":985,"cat":"jazigos","w":481,"h":640,"titulo":"Nossa Senhora"},
  {"id":995,"cat":"jazigos","w":360,"h":480,"titulo":"Imagem sacra"},
  {"id":1003,"cat":"jazigos","w":476,"h":640,"titulo":"Anjo"},
  {"id":1014,"cat":"jazigos","w":480,"h":640,"titulo":"Imagem sacra"},
  {"id":1016,"cat":"jazigos","w":480,"h":640,"titulo":"Nossa Senhora"},
  {"id":1004,"cat":"jazigos","w":476,"h":640,"titulo":"Imagem sacra"},
  {"id":1017,"cat":"jazigos","w":481,"h":640,"titulo":"Anjo"},
  {"id":1015,"cat":"jazigos","w":481,"h":640,"titulo":"Imagem sacra"},
  {"id":969,"cat":"jazigos","w":480,"h":640,"titulo":"Puxador argolão liso","material":"Bronze polido"},
  {"id":964,"cat":"jazigos","w":640,"h":480,"titulo":"Molduras para foto"},
  {"id":1001,"cat":"jazigos","w":481,"h":640,"titulo":"Crucifixo"},
  {"id":1002,"cat":"jazigos","w":481,"h":640,"titulo":"Crucifixo"},
  {"id":984,"cat":"jazigos","w":641,"h":480,"titulo":"Placa de identificação"},
  {"id":1005,"cat":"jazigos","w":640,"h":480,"titulo":"Placa de identificação"},
  {"id":1009,"cat":"jazigos","w":641,"h":480,"titulo":"Placa de identificação"},
  {"id":1010,"cat":"jazigos","w":641,"h":480,"titulo":"Placa de identificação"},
  {"id":1018,"cat":"jazigos","w":641,"h":480,"titulo":"Placa de identificação"},
  {"id":966,"cat":"jazigos","w":640,"h":480,"titulo":"Datas em metal"},
  {"id":1006,"cat":"jazigos","w":640,"h":480,"titulo":"Letras cursivas"},
  {"id":1019,"cat":"jazigos","w":641,"h":480,"titulo":"Letras cursivas"},
  {"id":1013,"cat":"jazigos","w":641,"h":480,"titulo":"Placa em forma de livro"},
  {"id":1007,"cat":"jazigos","w":640,"h":480,"titulo":"Puxadores"},
  {"id":1008,"cat":"jazigos","w":640,"h":480,"titulo":"Molduras para foto"},
  {"id":1011,"cat":"jazigos","w":480,"h":640,"titulo":"Nossa Senhora Aparecida"},
  {"id":1012,"cat":"jazigos","w":480,"h":640,"titulo":"Puxador cabeça de leão"},
  {"id":1020,"cat":"jazigos","w":641,"h":480,"titulo":"Cristos para crucifixo"},
  {"id":1021,"cat":"jazigos","w":481,"h":640,"titulo":"Nossa Senhora Aparecida"}];

// Fotos que passam no topo da home do site atual, com a legenda de lá.
export const destaques = [962, 959, 954, 1036, 953];

// Galeria Processo do site atual. Legendas escritas por nós a partir das fotos (só a 956 tem legenda original).
export const processo = [
  { id: 952, w: 480, h: 640, legenda: 'Modelagem da peça no ateliê da fábrica' },
  { id: 955, w: 480, h: 640, legenda: 'Modelo de busto pronto para a fundição' },
  { id: 956, w: 640, h: 480, legenda: 'Escultor Giuseppe Bosica acompanha seu trabalho' },
  { id: 957, w: 640, h: 480, legenda: 'Fusão do metal no forno' },
  { id: 1023, w: 641, h: 480, legenda: 'Galpão de fundição' },
  { id: 1024, w: 641, h: 480, legenda: 'Equipe na fundição' },
  { id: 1025, w: 641, h: 480, legenda: 'Metal líquido' },
  { id: 1026, w: 640, h: 480, legenda: 'Vazamento do metal no molde' },
  { id: 1022, w: 481, h: 640, legenda: 'Acabamento de peça de grande porte' },
  { id: 950, w: 481, h: 640, legenda: 'Montagem e solda de monumento' },
];

// Etapas (texto nosso, descrevendo o que as fotos do site atual mostram).
export const etapas = [
  { n: '01', nome: 'Modelo', foto: 952, texto: 'O artista entrega o modelo ou acompanha a modelagem na fábrica. Nossa equipe conversa direto com ele para entender cada detalhe da peça.' },
  { n: '02', nome: 'Fusão', foto: 957, texto: 'Bronze, alumínio ou latão vão ao forno. Usamos matérias-primas recicláveis, um compromisso da Fundiart com o meio ambiente.' },
  { n: '03', nome: 'Vazamento', foto: 1026, texto: 'O metal líquido é vazado no molde. É aqui que a fidelidade da reprodução se decide, de um troféu de 30 cm a um monumento de 6 metros.' },
  { n: '04', nome: 'Acabamento', foto: 950, texto: 'Montagem, solda, polimento e pátina. A peça sai pronta: bronze patinado, polido, alumínio pintado ou como o artista pedir.' },
];

// Página Artistas em Foco do site atual (visitas e eventos). Sem legenda no original.
export const foco = [1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065];
