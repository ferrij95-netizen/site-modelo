// Conteúdo da Vidraçaria Chile. Textos marcados "(site atual)" vieram de vidracariachile.com.br sem mudança de sentido;
// os demais foram escritos por nós a partir das fotos e das informações do site (ver LEIA-ME.md).

export const empresa = {
  nome: 'Vidraçaria Chile',
  url: 'https://vidracariachile.overtus.com.br/',
  antigo: 'http://www.vidracariachile.com.br/',
  slogan: 'Prestando serviços de qualidade há 40 anos', // (site atual)
  fones: [
    { n: '(41) 3333-5477', href: '+554133335477', wa: true },
    { n: '(41) 3333-8677', href: '+554133338677' },
  ],
  wa: '554133335477', // "Este número também é WhatsApp" (site atual, página Fale Conosco)
  celular: '(41) 9806-6669', // aparece no topo do site atual com o ícone do WhatsApp; a confirmar
  endereco: 'Rua João Negrão, 2150',
  bairro: 'Rebouças',
  cidade: 'Curitiba - PR',
  cep: '80230-150',
  horario: [['Segunda a sexta', '08h às 12h e 13h às 18h'], ['Sábados e domingos', 'Fechado']],
  facebook: 'https://pt-br.facebook.com/vidracariachile',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Vidra%C3%A7aria+Chile+Rua+Jo%C3%A3o+Negr%C3%A3o+2150+Curitiba',
  mapaEmbed: 'https://maps.google.com/maps?q=Rua%20Jo%C3%A3o%20Negr%C3%A3o%2C%202150%2C%20Rebou%C3%A7as%2C%20Curitiba%20-%20PR&z=16&output=embed',
  pagamento: ['Elo', 'Visa', 'Mastercard', 'Boleto'],
  fundacao: 1976,
};

// (site atual) página inicial, "Sobre a empresa"
export const resumo = 'Vidraçaria em Curitiba há 40 anos, comercializando box para banheiro, porta e janela em vidro temperado, esquadrias de alumínio, cobertura de vidro fixa e retrátil, muro de vidro, fachadas, guarda-corpo, espelhos (com ou sem bisotê), painel de espelho, persiana integrada, maxim-ar, janela basculante, divisória de vidro temperado, tampo de mesa, cachepô de vidro e de espelho, molduras para quadros e porta-retratos, sempre pensando na satisfação do cliente.';

// (site atual) página "Sobre a empresa", dividido em partes
export const historia = [
  'A Vidraçaria Chile foi fundada pelo Sr. Ivan Moura Vieira. Ele entrou no ramo do vidro em 1974, como autônomo: tinha um emprego numa estatal e, aos finais de semana, fazia pequenos serviços de colocação de vidros.',
  'Encontrou uma pequena sala para alugar nos fundos de uma casa na Rua Chile (de onde vem o nome da empresa), no bairro Rebouças, onde passou a cortar os seus vidros. Ali só cabiam uma mesa de corte e um pequeno estoque, mas era o suficiente para continuar oferecendo venda e instalação de vidro comum. Regularizou a Vidraçaria Chile em setembro de 1976.',
  'A empresa passou a ser chamada para serviços cada vez maiores, porque o Sr. Ivan era muito conhecido pelos donos de construtoras. Em março de 1980 mudou-se para a Rua João Negrão, 2150, onde funciona até hoje: com estoques maiores, produtos mais variados, equipamentos de grande porte para o beneficiamento do vidro e um showroom para receber a clientela.',
  'Dezesseis anos depois, Ivan partiu para o beneficiamento e a revenda de perfis de alumínio, e a Vidraçaria passou às mãos de sua esposa, Edite, e de seu filho, Julio César. Mãe e filho deram um toque de modernidade à empresa, que se firmou como uma das líderes do segmento e uma das mais completas do varejo de vidros da região.',
  'Em pesquisa feita pela empresa, a maioria dos clientes disse procurar a Vidraçaria Chile por indicação e pela tradição em oferecer serviços de qualidade.',
];
export const citacao = 'Temos aqui quatro fases. A do nascimento; a dos anos 80, quando cresceu o negócio de serralheria e esquadrias; a dos anos 90, em que desenvolvemos o setor de instalação do vidro temperado; e hoje, quando fazemos de tudo, desde vender parafusos até retirar a fachada inteira de um edifício e instalar novamente com caixilho de alumínio e vidro.';

// As quatro fases da citação, com as datas da própria história
export const fases = [
  { ano: '1974–1976', titulo: 'Rua Chile', texto: 'Uma mesa de corte nos fundos de uma casa na Rua Chile, no Rebouças. Venda e instalação de vidro comum; empresa regularizada em setembro de 1976.', foto: null },
  { ano: 'Anos 80', titulo: 'João Negrão, 2150', texto: 'Em março de 1980 a vidraçaria muda para o endereço atual, ganha estoque, equipamentos de beneficiamento e showroom. Cresce o negócio de serralheria e esquadrias.', foto: 'loja' },
  { ano: 'Anos 90', titulo: 'Vidro temperado', texto: 'A empresa desenvolve o setor de instalação de vidro temperado: portas, janelas, box e divisórias.', foto: 'temperados-15' },
  { ano: 'Hoje', titulo: 'De parafusos a fachadas', texto: 'De um parafuso a uma fachada inteira retirada e reinstalada com caixilho de alumínio e vidro, sob o comando de Edite e Julio César.', foto: 'fachadas-03' },
];

// (site atual)
export const cultura = {
  missao: 'Atuar na construção civil com foco no setor vidreiro, oferecendo produtos e serviços de qualidade e buscando a satisfação total dos clientes, para conquistar a sua fidelidade e assegurar o crescimento e a rentabilidade do negócio.',
  visao: 'Ser reconhecida por colaboradores, parceiros, clientes e pelo segmento como uma das mais importantes empresas do setor vidreiro e, com esse reconhecimento, estabelecer uma forte identificação com a sociedade.',
  valores: ['Respeito e comprometimento mútuos', 'Participação e trabalho em equipe', 'Objetivos e metas claros e definidos', 'Desenvolvimento pessoal e profissional', 'Inovação e qualidade', 'Empreendedorismo e ousadia'],
};

// Tipos de vidro (site atual, aba "Vidros"), com o desenho do corte na versão B
export const vidros = [
  { id: 'comum', nome: 'Vidro comum (float)', esp: '2 a 19 mm', texto: 'Lisos nas espessuras de 2 a 19 mm e fantasia 4 mm, nas cores incolor, verde, fumê e bronze. Instalados em esquadrias de ferro, madeira ou alumínio, em obras novas ou reposições.', foto: 'vidro-comum' },
  { id: 'laminado', nome: 'Vidro laminado', esp: '2 chapas + PVB', texto: 'Duas ou mais chapas de vidro intercaladas com películas de polivinil butiral (PVB), unidas por pressão e calor. Usado em coberturas, fachadas, sacadas, portas, janelas, divisórias e vitrines.', foto: 'vidro-laminado' },
  { id: 'temperado', nome: 'Vidro temperado', esp: '8 ou 10 mm', texto: 'Vidro tratado termicamente, várias vezes mais resistente que o comum. Usado em box, portas, janelas, divisórias, guarda-corpos e coberturas.', foto: 'temperados-22' },
  { id: 'espelhado', nome: 'Vidro espelhado', esp: 'PVB refletivo', texto: 'Vidro laminado com PVB refletivo ou vidro comum com película refletiva. Para ambientes que pedem privacidade ou controle dos raios solares.', foto: 'vidro-espelhado' },
];

// Produtos e serviços: os 10 itens do menu do site atual, na mesma ordem.
// texto: (site atual) quando a página tinha texto; nas que eram só galeria, escrito por nós.
export const produtos = [
  { slug: 'vidros', nome: 'Vidros', curto: 'Comum, laminado e espelhado, cortados na medida. Tampos de mesa, cachepôs e decoração.', capa: 'decor-02', cat: 'decor',
    texto: ['Vidros comuns (float) lisos de 2 a 19 mm e fantasia 4 mm, nas cores incolor, verde, fumê e bronze, instalados em esquadrias de ferro, madeira ou alumínio, em obras novas ou reposições.', 'Laminados, com duas ou mais chapas e película de PVB, para coberturas, fachadas, sacadas, portas, janelas, divisórias e vitrines. Espelhados, com PVB refletivo ou película, para privacidade e controle solar.', 'Também cortamos tampos de mesa, balcões, prateleiras, cachepôs de vidro e de espelho, molduras para quadros e porta-retratos.'],
    itens: ['Float liso de 2 a 19 mm', 'Fantasia 4 mm', 'Incolor, verde, fumê e bronze', 'Laminado com PVB', 'Espelhado / refletivo', 'Tampos, prateleiras e cachepôs'] },
  { slug: 'temperados', nome: 'Vidros temperados', curto: 'Portas, janelas, fechamentos de sacada, divisórias e vitrines em temperado.', capa: 'temperados-26', cat: 'temperados',
    texto: ['Portas, janelas, fechamentos de varanda e área de churrasqueira, divisórias de escritório e vitrines em vidro temperado, com ferragens e puxadores escolhidos para cada projeto.', 'Atendemos residências, comércio e empresas em Curitiba, com medição, fabricação sob medida e instalação pela nossa equipe.'],
    itens: ['Portas pivotantes e de correr', 'Janelas e maxim-ar', 'Fechamento de sacadas e churrasqueiras', 'Divisórias de escritório', 'Vitrines e fachadas de loja', 'Incolor, verde, fumê, bronze e jateado'] },
  { slug: 'espelhos', nome: 'Espelhos', curto: 'Espelhos Cebrace e Guardian de 3 a 6 mm, com ou sem bisotê, e convexos.', capa: 'espelhos-01', cat: 'espelhos',
    texto: ['Espelhos de altíssima qualidade e resistência à oxidação, das linhas Optimirror da Cebrace e Guardian, com espessuras de 3 a 6 mm. Para portas, decoração de paredes, móveis, banheiros e academias.', 'Convexos de 15, 30 e 50 cm de diâmetro, com ângulo de visão de 90°, para esquinas, corredores, pátios de manobra, garagens, portarias, bancos, hospitais, indústrias e supermercados.'],
    itens: ['Alta resistência à corrosão, sem as manchas pretas', 'Alto grau de reflexão', 'Sem distorção da imagem', 'Proteção da prata contra agentes agressores', 'Com ou sem bisotê, painéis de espelho', 'Convexos de 15, 30 e 50 cm'] },
  { slug: 'box', nome: 'Box para banheiro', curto: 'De canto, frontal ou sobre a banheira, em temperado 8 mm. Box padrão e especiais em inox.', capa: 'box-02', cat: 'box',
    texto: ['O box pode ser de canto, sobre a banheira ou frontal, sempre em vidro temperado 8 mm, com variações como serigrafado, jateado, espelhado, acidado, liso, com detalhes e em cores. Trabalhamos de acordo com a sua necessidade para chegar à melhor solução para o seu projeto.', 'No box padrão, as ferragens vêm em preto, branco, bronze, natural fosco, cromado e champagne; os vidros em incolor, bronze, fumê, verde e azul. Também fazemos box especiais, com ferragens em aço inox, roldanas aparentes e modelo Elegance.'],
    itens: ['Temperado 8 mm', 'Canto, frontal ou sobre banheira', 'Liso, jateado, serigrafado, acidado ou espelhado', 'Ferragens em 6 cores', 'Roldanas aparentes e box Elegance', 'Box especiais em aço inox'] },
  { slug: 'guarda-corpos', nome: 'Guarda-corpos e escadas', curto: 'Escadas, sacadas, mezaninos e piscinas, seguindo as normas de segurança.', capa: 'guarda-13', cat: 'guarda',
    texto: ['Os guarda-corpos e escadas de vidro trazem modernidade, sofisticação e leveza aos ambientes. Trabalhamos com diversos modelos, sempre atendendo às normas de segurança.', 'Vidros temperados-laminados nos modelos sem corrimão, como os de botões; temperados 8 ou 10 mm nos modelos com corrimão em inox ou sistema gradil; e laminados nos modelos em que os vidros ficam encaixilhados.'],
    itens: ['Escadas internas e mezaninos', 'Sacadas e terraços', 'Cercamento de piscina', 'Modelo de botões (sem corrimão)', 'Corrimão em inox ou gradil', 'Temperado, laminado ou temperado-laminado'] },
  { slug: 'fachadas', nome: 'Fachadas', curto: 'Pele de vidro, vitrines e fechamentos de prédios comerciais, com caixilho de alumínio.', capa: 'fachadas-03', cat: 'fachadas',
    texto: ['Fachadas em vidro para prédios comerciais, lojas e residências: pele de vidro com vidro refletivo, fechamentos em temperado e caixilhos de alumínio.', 'Fazemos desde a fachada nova até a retirada da fachada antiga de um edifício e a reinstalação completa com caixilho de alumínio e vidro.'],
    itens: ['Pele de vidro', 'Vidro refletivo e de controle solar', 'Vitrines e lojas', 'Caixilho de alumínio', 'Troca de fachada em prédios ocupados'] },
  { slug: 'coberturas', nome: 'Coberturas', curto: 'Fixas ou retráteis, com estrutura de alumínio ou ferro e vedação contra água.', capa: 'coberturas-10', cat: 'coberturas',
    texto: ['Coberturas estruturadas em alumínio e ferro, fixas ou retráteis. Os vidros podem ser temperados de 8 ou 10 mm com película de segurança, laminados ou refletivos de controle solar.', 'Garantimos excelente acabamento e total vedação contra a entrada de água: em pergolados, áreas de churrasqueira, jardins de inverno, claraboias e terraços.'],
    itens: ['Estrutura em alumínio ou ferro', 'Fixas ou retráteis', 'Temperado 8 ou 10 mm com película', 'Laminado ou refletivo', 'Pergolados e jardins de inverno', 'Vedação contra água'] },
  { slug: 'muros', nome: 'Muros e portões de vidro', curto: 'Muros e portões com quadro de alumínio, deixando a fachada à vista com segurança.', capa: 'muros-01', cat: 'muros',
    texto: ['Muros e portões de vidro que deixam a fachada de casas, prédios e comércios à vista, sem perder a segurança.', 'Montados com vidro temperado ou laminado e quadro de alumínio, inclusive portões de correr e de giro para garagens.'],
    itens: ['Muros residenciais e de condomínios', 'Fachadas de lojas e escritórios', 'Portões de correr e de giro', 'Quadro de alumínio', 'Temperado ou laminado'] },
  { slug: 'esquadrias', nome: 'Esquadrias de alumínio', curto: 'Janelas, portas, basculantes e maxim-ar para casas e prédios.', capa: 'esquadrias-04', cat: 'esquadrias',
    texto: ['Esquadrias de alumínio para casas, sobrados e edifícios: janelas de correr, maxim-ar, basculantes, portas, guarda-corpos e persianas integradas.', 'Da medição à instalação, com vidro comum, temperado ou laminado conforme o vão e o uso.'],
    itens: ['Janelas de correr', 'Maxim-ar e basculantes', 'Portas de alumínio', 'Persiana integrada', 'Obras novas e reformas', 'Edifícios inteiros'] },
  { slug: 'acessorios', nome: 'Acessórios, ferragens e puxadores', curto: 'Linha de puxadores em inox e alumínio, ferragens para box e temperado.', capa: 'acessorios-01', cat: 'acessorios',
    texto: ['Temos uma vasta linha de puxadores em aço inox e alumínio, ferragens para portas de vidro temperado e box, parafusos e acessórios de instalação.', 'Visite nossa loja na Rua João Negrão e confira.'],
    itens: ['Puxadores em aço inox', 'Puxadores em alumínio', 'Dobradiças e fechaduras para temperado', 'Kits e roldanas para box', 'Parafusos e acessórios'] },
];

// Fotos de capa da home A (os mesmos 5 temas dos destaques do site atual, na mesma ordem)
export const destaques = [
  { titulo: 'Guarda-corpo', foto: 'guarda-13', slug: 'guarda-corpos' },
  { titulo: 'Esquadrias de alumínio', foto: 'esquadrias-07', slug: 'esquadrias' },
  { titulo: 'Coberturas', foto: 'coberturas-10', slug: 'coberturas' },
  { titulo: 'Muro de vidro', foto: 'muros-01', slug: 'muros' },
  { titulo: 'Vidros temperados', foto: 'temperados-15', slug: 'temperados' },
];

// "Qual é o seu projeto?" (versão B): ambientes e o que fazemos em cada um
export const ambientes = [
  { id: 'banheiro', nome: 'Banheiro', foto: 'box-02', texto: 'Box de canto, frontal ou sobre a banheira, espelhos com ou sem bisotê e prateleiras de vidro.', slugs: ['box', 'espelhos', 'acessorios'] },
  { id: 'externa', nome: 'Área externa', foto: 'coberturas-16', texto: 'Cobertura sobre a churrasqueira, fechamento da sacada, guarda-corpo da piscina e muro de vidro na frente da casa.', slugs: ['coberturas', 'guarda-corpos', 'muros', 'temperados'] },
  { id: 'interiores', nome: 'Interiores', foto: 'guarda-34', texto: 'Escada e mezanino com guarda-corpo de vidro, divisórias, painéis de espelho e tampos de mesa.', slugs: ['guarda-corpos', 'espelhos', 'vidros', 'temperados'] },
  { id: 'comercio', nome: 'Comércio e prédios', foto: 'fachadas-05', texto: 'Vitrine, porta de loja, divisória de escritório, fachada e esquadrias do prédio inteiro.', slugs: ['fachadas', 'temperados', 'esquadrias', 'muros'] },
];
