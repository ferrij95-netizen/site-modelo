// Conteúdo do site dos Laticínios Nosso (marca Millano). Textos copiados de queijosmillano.com.br
// (páginas Home, Quem Somos, Produtos, Receitas, Representantes e Contato), com acentuação e erros de digitação corrigidos.
// O que foi escrito por nós está marcado com "nosso:" no comentário ao lado.

export const empresa = {
  nome: 'Millano',
  razao: 'Laticínios Nosso Ltda.',
  url: 'https://laticiniosnosso.overtus.com.br/',
  antigo: 'https://queijosmillano.com.br/',
  telefones: ['(32) 3330-1315', '(32) 3330-1364'],
  email: 'contato@queijosmillano.com.br',
  endereco: 'Estrada da Borda, km 03, s/n',
  cidade: 'Antônio Carlos, MG',
  mapa: 'Laticínios Nosso Estrada da Borda Antônio Carlos MG',
  facebook: 'https://www.facebook.com/queijosmillano/',
  instagram: 'https://www.instagram.com/queijosmillano/',
  fundacao: 1992,
  marcas: ['Millano', 'Bambino', 'Palmyra', 'Borboleta'],
};

export const resumo = 'O Laticínios Nosso Ltda., detentor da marca Millano, é uma empresa familiar criada pelo técnico em laticínios Moacir Lucas Vidal, em 1992. Ele adquiriu experiência trabalhando em grandes empresas do Brasil e da América do Sul, mas sempre sonhou em ter seu próprio negócio.';

export const historia = [
  'O Laticínios Nosso Ltda., detentor da marca Millano, é uma empresa familiar criada pelo técnico em laticínios Moacir Lucas Vidal, em 1992. Ele adquiriu experiência trabalhando em grandes empresas do Brasil e da América do Sul, mas sempre sonhou em ter seu próprio negócio. Quando veio trabalhar em um grande laticínio em Antônio Carlos, Minas Gerais, constituiu sua família e viu a oportunidade de realizar o desejo de ter um laticínio.',
  'Ele e sua esposa, Aparecida Moraes, começaram a produção de queijos de forma bem artesanal em uma pequena casa na zona rural de Antônio Carlos. Na época, o casal já tinha o primeiro filho e esperava por outro.',
  'Com o passar dos anos, a produção cresceu e a pequena casa já não suportava a demanda, fazendo-se necessária a construção de um pequeno laticínio. Desde o começo, o foco da produção foi o queijo reino, carro-chefe da empresa até os dias atuais. Isso porque a geografia e as condições climáticas que a Serra da Mantiqueira proporciona são ideais para a produção desse tipo de queijo.',
  'O Laticínios Nosso Ltda. é o maior produtor de queijo tipo reino do Brasil, sendo o fabricante das marcas Millano, Palmyra e Borboleta. A região Nordeste é o maior mercado consumidor dessas marcas no país. Atualmente, a empresa possui um mix variado de produtos, empregando cerca de 80 colaboradores.',
];

// Linha do tempo: ordem tirada do texto da história (só 1992 tem data no site atual).
export const linhaTempo = [
  { marca: '1992', titulo: 'O começo', texto: 'Moacir Lucas Vidal, técnico em laticínios, e Aparecida Moraes começam a fazer queijo de forma artesanal numa pequena casa na zona rural de Antônio Carlos.' },
  { marca: 'Crescimento', titulo: 'O laticínio', texto: 'A produção cresce, a casa já não comporta a demanda e é construído um pequeno laticínio. Desde o começo, o foco é o queijo reino.' },
  { marca: 'Mantiqueira', titulo: 'O lugar certo', texto: 'Um dos pontos mais altos da Serra da Mantiqueira, uma das poucas regiões do Brasil adequadas para queijos finos.' },
  { marca: 'Hoje', titulo: 'O maior do reino', texto: 'Maior produtor de queijo tipo reino do Brasil, com as marcas Millano, Palmyra e Borboleta, cerca de 80 colaboradores e o Nordeste como maior mercado.' },
];

export const laticinioIntro = 'O Laticínios Nosso Ltda. valoriza a qualidade de seus produtos e tem como objetivo produzir queijos com a mais alta tecnologia de fabricação e segurança alimentar, sem deixar de lado os sabores característicos de cada produto. Para realizar essa missão, adotamos as seguintes medidas:';

// As medidas da página Quem Somos; títulos curtos escritos por nós.
export const medidas = [
  { titulo: 'No campo', ic: 'vaca', texto: 'Contamos com uma equipe de campo com técnicos que trabalham junto aos nossos produtores para o aprimoramento da qualidade do leite, com palestras e orientações sobre o correto manejo dos animais e a higienização na hora da ordenha.' },
  { titulo: 'No laboratório', ic: 'frasco', texto: 'O leite é analisado em laboratório e pasteurizado antes de seguir para o processamento.' },
  { titulo: 'Na fabricação', ic: 'escudo', texto: 'A empresa emprega Boas Práticas de Fabricação (BPF) e Análise de Perigos e Pontos Críticos de Controle (APPCC).' },
  { titulo: 'No soro', ic: 'gota', texto: 'O soro do queijo é desnatado e depois concentrado: é aproveitado em sua totalidade e não se torna um problema para o meio ambiente.' },
  { titulo: 'Na natureza', ic: 'arvore', texto: 'A fazenda tem plantação de eucaliptos para as caldeiras e preserva 30% de mata nativa onde está o laticínio, que conta com estação de tratamento de efluentes (ETE) e filtro de gases nas caldeiras.' },
];

export const mantiqueira = 'O Laticínios Nosso foi criado em um dos pontos mais altos da Serra da Mantiqueira, uma das poucas regiões adequadas para a produção de queijos finos no Brasil, em especial o queijo reino.';

export const numeros = [
  { valor: '1992', rotulo: 'ano da fundação, em Antônio Carlos (MG)' },
  { valor: 'Nº 1', rotulo: 'maior produtor de queijo tipo reino do Brasil' },
  { valor: '80', rotulo: 'colaboradores, aproximadamente' },
  { valor: '30%', rotulo: 'de mata nativa preservada na fazenda' },
];

// Produtos: textos do site atual. O texto do doce de leite no site atual é cópia do queijo do reino; o daqui é nosso (confirmar).
export const produtos = [
  {
    slug: 'queijo-do-reino', nome: 'Queijo do Reino', curto: 'O carro-chefe da casa, na bola vermelha e na lata.',
    resumo: 'No período colonial, a corte portuguesa importava queijos tipo Edam da Holanda. O produto demorava meses para chegar ao Brasil, tendo seu sabor, textura e características alterados. Por aqui, recebeu o nome de “queijo do Reino”, de Portugal.',
    texto: [
      'No período colonial, a corte portuguesa importava queijos tipo Edam da Holanda. O produto demorava meses para chegar ao Brasil, tendo seu sabor, textura e características alterados. Por aqui, recebeu o nome de “queijo do Reino”, de Portugal. Com o passar do tempo, os produtores locais começaram a fazer o queijo para suprir a demanda da colônia, e ele se tornou o primeiro queijo curado industrializado no Brasil. Ele se popularizou e hoje é consumido principalmente nas festas juninas e no Natal.',
      'Produzimos queijo tipo reino com as suas características tradicionais, mas nunca deixando de inovar no processo de produção. Segurança alimentar e qualidade são valores primordiais para o Laticínios Nosso. Somos o maior produtor de queijo do reino do Brasil e já fomos premiados diversas vezes no Concurso Nacional de Produtos Lácteos, da EPAMIG.',
    ],
    destaque: 'Maior produtor do Brasil · premiado no Concurso Nacional de Produtos Lácteos (EPAMIG)',
  },
  {
    slug: 'queijo-parmesao', nome: 'Queijo Parmesão', curto: 'Sabor acentuado para massas, molhos e panificação.',
    resumo: 'O queijo parmesão, por seu sabor acentuado, é utilizado tipicamente no acompanhamento de massas, molho de tomate e em diversos tipos de panificação. Esse queijo é originário da região sul do Rio Pó, na Itália.',
    texto: [
      'O queijo parmesão, por seu sabor acentuado, é utilizado tipicamente no acompanhamento de massas, molho de tomate e em diversos tipos de panificação. Esse queijo é originário da região sul do Rio Pó, na Itália.',
      'O queijo parmesão Millano é feito com os melhores fermentos disponíveis no mundo e produzido na Serra da Mantiqueira, lugar cujo clima e altitude são propícios para a produção de queijos finos de qualidade, com microclima parecido com o da região sul do Rio Pó, na Itália.',
    ],
    destaque: 'Fermentos selecionados · microclima parecido com o do Rio Pó',
  },
  {
    slug: 'queijo-minas-padrao', nome: 'Queijo Minas Padrão', curto: 'Feito na terra de origem do Minas Padrão.',
    resumo: 'O Laticínios Nosso está localizado na Serra da Mantiqueira, local de origem do Queijo Minas Padrão no Brasil. O Queijo Minas Padrão Millano é produzido com a melhor matéria-prima, rígidos controles de qualidade e incentivo técnico e financeiro ao produtor rural leiteiro.',
    texto: [
      'O Laticínios Nosso está localizado na Serra da Mantiqueira, local de origem do Queijo Minas Padrão no Brasil.',
      'O Queijo Minas Padrão Millano é produzido com a melhor matéria-prima, rígidos controles de qualidade e incentivo técnico e financeiro ao produtor rural leiteiro.',
      'Sua fabricação segue as técnicas tradicionais, a fim de fazer jus ao título de Patrimônio Histórico (IEPHA), e é reconhecida nacionalmente pelo Instituto do Patrimônio Histórico e Artístico Nacional (IPHAN), que nomeou o queijo Minas como Patrimônio Cultural Imaterial Brasileiro.',
      'A Millano investe em todas as etapas do processo de produção para gerar um produto com textura e sabor incomparáveis, com controle rigoroso desde as matrizes, passando pelo gerenciamento da temperatura durante a produção, até a manipulação correta.',
    ],
    destaque: 'Técnica tradicional · patrimônio reconhecido pelo IEPHA e pelo IPHAN',
  },
  {
    slug: 'queijo-tipo-caccio-cavalo', nome: 'Queijo Tipo Caccio Cavalo', curto: 'De origem italiana, combina com chope e uísque.',
    resumo: 'Esse queijo tem origem italiana e possui um sabor único e diferenciado. Trata-se de um alimento com maior teor de sal. É ideal para acompanhar saladas e massas leves, e harmoniza com uísque e chope.',
    texto: ['Esse queijo tem origem italiana e possui um sabor único e diferenciado. Trata-se de um alimento com maior teor de sal. É ideal para acompanhar saladas e massas leves, e harmoniza com uísque e chope.'],
    destaque: 'Origem italiana · harmoniza com uísque e chope',
  },
  {
    slug: 'queijo-prato', nome: 'Queijo Prato', curto: 'Fermento francês e textura macia para fatiar.',
    resumo: 'O Queijo Prato da Millano é produzido com a melhor matéria-prima e no melhor local para a sua preparação, a Serra da Mantiqueira, em Minas Gerais. Ele é preparado com fermento francês, o que confere um sabor único e especial, além de uma textura macia, que facilita o fatiamento.',
    texto: ['O Queijo Prato da Millano é produzido com a melhor matéria-prima e no melhor local para a sua preparação, a Serra da Mantiqueira, em Minas Gerais. Ele é preparado com fermento francês, o que confere um sabor único e especial ao queijo, além de uma textura macia, que facilita o fatiamento. O Queijo Prato é muito utilizado em sanduíches e pizzas.'],
    destaque: 'Fermento francês · ideal para sanduíches e pizzas',
  },
  {
    slug: 'doce-de-leite', nome: 'Doce de Leite', curto: 'Doce de leite pastoso, na lata Millano.',
    resumo: 'O doce de leite pastoso Millano vem na lata com o rótulo xadrez da marca, feito no mesmo laticínio da Serra da Mantiqueira que produz os nossos queijos.', // nosso: texto escrito a partir da foto da lata ("Doce de Leite · Pastoso")
    texto: ['O doce de leite pastoso Millano vem na lata com o rótulo xadrez da marca, feito no mesmo laticínio da Serra da Mantiqueira que produz os nossos queijos, com o leite dos produtores acompanhados pela nossa equipe de campo.'], // nosso
    destaque: 'Pastoso · lata Millano',
  },
];

// Receitas do site atual (ingredientes e preparo copiados; "Queijo Milano" corrigido para "queijo Millano").
export const receitas = [
  { slug: 'torta-de-queijo-do-reino', nome: 'Torta de Queijo do Reino', queijo: 'queijo-do-reino', grupos: [
      { t: 'Massa', i: ['2 xícaras de farinha de trigo', '1/2 caixa de creme de leite', '1 colher (chá) de fermento', '1 pitada de sal', 'Manteiga Millano para dar o ponto'] },
      { t: 'Recheio', i: ['4 ovos', '1/2 caixa de creme de leite', '3 xícaras de Queijo do Reino Millano ralado no ralo grosso', 'Noz-moscada a gosto'] }],
    preparo: ['Em uma assadeira pequena de fundo removível, de 18 a 20 cm (pode ser também um refratário, caso não queira desenformar), junte os ingredientes da massa, colocando por último a manteiga, e misture com as mãos até que a massa fique homogênea e solte com facilidade.', 'Espalhe a massa por todo o fundo e as laterais da fôrma, faça furos no fundo com um garfo e reserve.', 'Misture os ingredientes do recheio, verifique o ponto do sal e coloque sobre a massa.', 'Leve para assar em forno preaquecido a 200 °C até que o centro esteja firme e a superfície bem dourada.'] },
  { slug: 'tomate-recheado-com-queijo-minas-padrao', nome: 'Tomate Recheado com Queijo Minas Padrão', queijo: 'queijo-minas-padrao', grupos: [
      { t: 'Ingredientes', i: ['4 tomates grandes', '120 g de queijo minas padrão Millano', '80 g de queijo prato Millano', '2 dentes de alho amassados ou bem picados', '2 colheres (sopa) de requeijão', 'Sal, pimenta-do-reino e orégano a gosto', 'Parmesão ralado a gosto (opcional)', 'Azeite'] }],
    preparo: ['Antes de começar, coloque o forno para aquecer.', 'Lave e seque bem os tomates e retire uma tampa de cada um. Raspe todo o interior com uma colher e disponha-os numa fôrma untada com azeite; tempere com sal e pimenta-do-reino e reserve.', 'Em um refratário, junte o queijo minas padrão, o queijo prato, o alho e o requeijão. Tempere com orégano, sal e pimenta a gosto e misture bem.', 'Recheie os tomates com a mistura e finalize com parmesão ralado. Leve ao forno preaquecido a 200 °C por 20 minutos; depois aumente o fogo e deixe gratinar por cerca de 10 minutos. Finalize com um fio de azeite e sirva.'] },
  { slug: 'risoto-de-brocolis-com-queijo-parmesao', nome: 'Risoto de Brócolis com Queijo Parmesão', queijo: 'queijo-parmesao', grupos: [
      { t: 'Ingredientes', i: ['1 1/2 xícara de arroz arbóreo', '1 litro de caldo de galinha', '3 colheres (sopa) de azeite de oliva', '1 xícara de brócolis', '3/4 xícara de parmesão Millano ralado', '3 folhas de manjericão para decorar'] }],
    preparo: ['Prepare 1 litro de caldo de carne, legumes ou galinha.', 'Frite o arroz no azeite e acrescente o brócolis.', 'Coloque uma concha de caldo por vez e mexa até secar; então acrescente a próxima e repita o processo.', 'Quando o arroz estiver macio, acrescente o parmesão ralado e o manjericão para decorar. Sirva quentinho.'] },
  { slug: 'pizza-alla-millano', nome: 'Pizza alla Millano', grupos: [
      { t: 'Massa', i: ['500 g de farinha de trigo', '50 g de açúcar', '20 g de fermento biológico fresco', '200 ml de água', '50 ml de azeite', 'Sal a gosto'] },
      { t: 'Molho de tomate', i: ['8 tomates sem pele e sem sementes', '3 dentes de alho picados', '60 ml de azeite', 'Sal e folhas de manjericão picadas a gosto'] },
      { t: 'Recheio', i: ['130 g de salame em fatias finíssimas', '120 g de abobrinha italiana em lâminas', '3 dentes de alho', '30 ml de óleo', '1 maço de manjericão', '250 g de queijo Millano ralado'] }],
    preparo: ['Massa: numa bancada higienizada, coloque primeiro os secos (farinha, açúcar e sal) e depois a água com o fermento dissolvido. Finalize com o azeite. Sove bem a massa para desenvolver elasticidade e maciez e deixe descansar por, no mínimo, 20 minutos.', 'Molho: corte os tomates em pedaços grandes. Refogue o alho no azeite, acrescente o tomate e deixe cozinhar por cerca de 20 minutos. Finalize com sal e manjericão.', 'Montagem: abra a massa com um rolo. Faça uma camada de molho, depois uma de queijo e por último o salame e as lâminas de abobrinha. Salpique manjericão e mais queijo e leve ao forno médio (180 °C) até dourar.'] },
  { slug: 'bruschetta-millano', nome: 'Bruschetta Millano', porcoes: '1', tempo: '10 min', grupos: [
      { t: 'Ingredientes', i: ['1 dente de alho', '80 g de queijo Millano com casca', '200 g de creme de leite', '100 ml de azeite', '30 g de presunto Parma', 'Manjericão a gosto', '1 pão italiano'] }],
    preparo: ['Descasque o dente de alho e emulsione-o inteiro no próprio azeite.', 'Num processador, bata o queijo com casca e o creme de leite até virar uma pasta.', 'Passe o alho emulsionado no azeite na base do pão, acrescente a pasta de queijo, uma fatia de presunto cru, mais pasta de queijo e finalize com uma folha de manjericão.', 'Asse em forno ou forninho por 7 minutos.'] },
  { slug: 'risoto-especial', nome: 'Risoto Especial', porcoes: '6', tempo: '30 min', grupos: [
      { t: 'Ingredientes', i: ['20 g de damasco', '15 g de figos', '1 cebola picada', '30 g de manteiga gelada', '250 g de arroz 7 grãos integral', '500 ml de caldo de galinha', '60 g de queijo Millano ralado', '100 ml de vinho branco', '1 maço de alecrim', '20 g de amêndoas'] }],
    preparo: ['Corte os damascos e os figos em tiras e reserve.', 'Refogue a cebola em metade da manteiga até dourar. Em fogo médio, adicione o arroz, frite um pouco e acrescente o caldo devagar, uma concha por vez, à medida que secar.', 'Quando o arroz estiver quase macio, junte o damasco, os figos e o vinho branco. Mexa sempre para evaporar o álcool; se precisar, adicione mais caldo para terminar o cozimento.', 'Fora do fogo, acrescente o restante da manteiga e o queijo ralado e misture bem. Finalize com alecrim e amêndoas e sirva imediatamente.'] },
  { slug: 'sanduiche-incrementado', nome: 'Sanduíche Incrementado', porcoes: '1', tempo: '15 min', grupos: [
      { t: 'Ingredientes', i: ['1 abacaxi', '15 g de castanha-do-pará em lâminas', '40 g de queijo tipo cottage', '1 pão ciabatta com parmesão', '50 g de peito de peru defumado', '100 g de queijo Millano em fatias ou ralado', '1 maço de minirrúcula'] }],
    preparo: ['Descasque o abacaxi e asse em forno médio (180 °C) por 10 minutos. Corte em rodelas de cerca de um dedo de espessura e reserve.', 'Junte a castanha-do-pará com o queijo cottage, formando uma pasta crocante.', 'Corte o ciabatta ao meio e espalhe a pasta. Acrescente o peito de peru, o abacaxi, o queijo e, por último, a minirrúcula. Sirva imediatamente.'] },
  { slug: 'empanado-de-queijo-com-ervas', nome: 'Empanado de Queijo com Ervas', porcoes: '6', tempo: '15 min', grupos: [
      { t: 'Ingredientes', i: ['180 g de queijo Millano', '150 g de farinha de rosca', '100 ml de leite', '80 g de farinha de trigo', '100 ml de vinagre balsâmico', '50 g de açúcar mascavo', 'Ervas finas a gosto', 'Óleo (o necessário)'] }],
    preparo: ['Corte o queijo em cubos médios.', 'Empane-os na farinha com ervas, usando o leite no lugar do ovo.', 'Prepare a redução de vinagre balsâmico com o açúcar mascavo e frite o queijo no óleo.', 'Monte no prato escolhido, com o empanado e a redução de balsâmico por cima.'] },
  { slug: 'batata-rustica', nome: 'Batata Rústica', porcoes: '4', tempo: '30 min', grupos: [
      { t: 'Ingredientes', i: ['300 g de batata Asterix', '2 cebolas roxas', '60 ml de leite', '100 g de farinha de rosca', '80 g de farinha panko', '25 g de páprica picante', '150 g de queijo Millano ralado com casca', '80 ml de catupiry', '100 ml de vinagre balsâmico', '20 g de manteiga sem sal', '50 g de açúcar mascavo', 'Sal a gosto'] }],
    preparo: ['Cozinhe as batatas com casca por 30 minutos.', 'Corte as cebolas roxas em lâminas finas, passe rapidamente no leite, depois na farinha de rosca e na panko com páprica e sal. Reserve.', 'Abra levemente as batatas, retire um pouco da polpa e misture com o queijo ralado e o catupiry, fazendo um purê para rechear.', 'Faça a redução de balsâmico com mascavo e frite as cebolas a 170 °C até ficarem crocantes. Monte a batata com as cebolas por cima e a redução de balsâmico.'] },
  { slug: 'arroz-tropical', nome: 'Arroz Tropical', grupos: [
      { t: 'Ingredientes', i: ['1/2 cebola', '2 dentes de alho', '100 g de abacaxi', '150 g de arroz jasmim', '1 litro de água de coco', '1/2 maço de hortelã', '35 g de manteiga gelada', 'Queijo Millano ralado a gosto'] }],
    preparo: ['Pique o alho e a cebola e reserve. Descasque o abacaxi e corte em cubos grandes.', 'Cozinhe o arroz jasmim no alho e na cebola refogados, regando os grãos com a água de coco.', 'Finalize com a manteiga gelada, a hortelã, os cubos de abacaxi e o queijo ralado.'] },
];

export const videos = [
  { id: 'YW6H9vziKP0', titulo: 'Reportagem do Globo Rural sobre o queijo do reino Millano' },
  { id: 'PTEmNzPVUW0', titulo: 'Trilhas do Sabor: reportagem sobre o queijo do reino Millano, parte 1' },
  { id: 'gGQtSyApeW8', titulo: 'Trilhas do Sabor: reportagem sobre o queijo do reino Millano, parte 2' },
];

// Representantes (página "Solicite um Representante"); telefones como estão no site atual.
export const representantes = [
  { uf: 'AL', estado: 'Alagoas', empresa: 'Solconsult', contatos: [['Escritório', '(81) 3037-3093'], ['Solange Mendes Pereira', '(81) 99673-2942']], emails: ['solconsult16@yahoo.com.br'] },
  { uf: 'BA', estado: 'Bahia', empresa: 'Original Marcas e Representações', contatos: [['Escritório', '(71) 3016-2020'], ['Roberto Garrido', '(71) 99633-6060']], emails: ['originalmarcas@terra.com.br'] },
  { uf: 'DF', estado: 'Brasília', empresa: 'Jotacê Representações', contatos: [['Escritório', '(61) 3356-8279'], ['Júlio César Barbosa', '(61) 9213-7992']], emails: ['jotace.rep@gmail.com'] },
  { uf: 'CE', estado: 'Ceará', empresa: 'Comércio e Representações Santana', contatos: [['Escritório', '(85) 3261-2238'], ['João Gonçalves Santana', '(85) 8847-0927']], emails: ['comrep@jsantana.com.br'] },
  { uf: 'MG', estado: 'Minas Gerais', empresa: 'Alessandro', contatos: [['Alessandro', '(32) 98454-5566']], emails: [] },
  { uf: 'PA', estado: 'Pará', empresa: 'Mirânda e Soares Representações', contatos: [['Escritório', '(91) 3245-2585'], ['Adalberto Soares', '(91) 98046-9979'], ['', '(91) 98864-5893']], emails: [] },
  { uf: 'PB', estado: 'Paraíba', empresa: 'Solconsult', contatos: [['Escritório', '(81) 3037-3093'], ['Solange Mendes Pereira', '(81) 9673-2942'], ['Waldemir Bezerra Lopes', '(81) 9971-3973']], emails: ['solconsult16@yahoo.com.br'] },
  { uf: 'PE', estado: 'Pernambuco', empresa: 'Solconsult', contatos: [['Escritório', '(81) 3037-3093'], ['Solange Mendes Pereira', '(81) 9673-2942'], ['Waldemir Bezerra Lopes', '(81) 9971-3973']], emails: ['solconsult16@yahoo.com.br'] },
  { uf: 'RJ', estado: 'Rio de Janeiro', empresa: 'Fátima', contatos: [['Fátima', '(21) 99775-6079']], emails: [] },
  { uf: 'RN', estado: 'Rio Grande do Norte', empresa: 'Solconsult', contatos: [['Escritório', '(81) 3037-3093'], ['Solange Mendes Pereira', '(81) 9673-2942'], ['Waldemir Bezerra Lopes', '(81) 9971-3973']], emails: ['solconsult16@yahoo.com.br'] },
  { uf: 'RO', estado: 'Rondônia', empresa: 'Rondonacre Comércio e Representações', contatos: [['Escritório', '(69) 3026-4709'], ['Benedito Almeida', '(69) 9981-5262']], emails: ['rondonacre@bol.com.br'] },
  { uf: 'SP', estado: 'São Paulo', empresa: 'Bambuco Com. Prod. Alimentícios', contatos: [['Escritório', '(48) 3231-8428'], ['José Luis Mourinho', '(11) 99531-6621'], ['', '(11) 99682-6646']], emails: ['j.mourinho@hotmail.com'] },
  { uf: 'SE', estado: 'Sergipe', empresa: 'Francis Representações Ltda.', contatos: [['Escritório', '(79) 3243-4287'], ['Chico Quintino', '(79) 98856-5296'], ['', '(79) 98877-4285']], emails: ['francisrepresentacoes@uol.com.br', 'francisrepresentacoes.chico@gmail.com'] },
];

// Fotos da página Galerias (originais do site atual).
export const galeria = Array.from({ length: 28 }, (_, i) => `g-${i + 1}`);
export const galeriaProduto = { 'queijo-do-reino': 9, 'queijo-parmesao': 4, 'queijo-minas-padrao': 5, 'queijo-tipo-caccio-cavalo': 5, 'queijo-prato': 5, 'doce-de-leite': 7 };
