// Conteúdo da Quysanta Alimentos. Tudo o que é fato vem do site atual (quysantaalimentos.ind.br: Home, Empresa,
// A Cocada Bahiana, Receitas e as quatro receitas, Clientes, Contato). O que foi escrito por nós está marcado com "nosso:".

export const empresa = {
  nome: 'Quysanta Alimentos',
  razao: 'Santa Quitéria Indústria Alimentícia Ltda.',
  url: 'https://quysanta.overtus.com.br/',
  antigo: 'http://www.quysantaalimentos.ind.br/',
  endereco: 'Av. Comendador Antônio Loureiro Ramos, 740',
  bairro: 'Distrito Industrial',
  cep: '39.404-003',
  cidade: 'Montes Claros, MG',
  mapa: 'Av. Comendador Antônio Loureiro Ramos, 740, Distrito Industrial, Montes Claros, MG',
  telefones: ['(38) 3224-4489', '(38) 3084-6167'],
  email: 'contato@quysantaalimentos.com.br',
  facebook: 'https://www.facebook.com/pages/Quysanta-Alimentos/144055368992940',
  twitter: 'https://twitter.com/quysanta',
  slogan: 'Aproveite os doces momentos da vida!',
};
export const telHref = t => `+55${t.replace(/\D/g, '')}`;

export const empresaTexto = {
  quemSomos: [
    'Fundada em 2000, a Quysanta Alimentos começou a produção de um dos doces mais saborosos e tradicionais do Brasil, a Cocada Bahiana, que anteriormente tinha sua produção desenvolvida por outra empresa.',
    'Para seu desenvolvimento inicial foi feito um investimento em um galpão de 4.800 m², o início de uma nova era na indústria de doces mineiros. Atualmente contamos com fornecedores e parceiros em todo o território nacional, e mais de 20 colaboradores diretos nesta linha específica de produto, dada sua alta automatização.',
    'Localizada no distrito industrial de Montes Claros, Norte de Minas, a Quysanta Alimentos contribui intensamente para o desenvolvimento e crescimento de sua região, orgulhando-se desse feito.',
  ],
  missao: 'Temos a missão de oferecer o que há de melhor na indústria de doces para as famílias brasileiras, unindo qualidade, preço e praticidade em um único produto. Atuamos para atender as necessidades de nossos clientes, colaboradores e parceiros.',
  visao: 'Atuar em nosso campo profissional buscando o crescimento constante dentro do mercado, sendo reconhecida pelo nosso público como uma empresa que busca o desenvolvimento social.',
  valores: 'Manter a família como base e referência a tudo, aliando sempre honestidade e fé ao trabalho, fortalecendo assim a ética e a responsabilidade social.',
  sustentavel: 'A Quysanta Alimentos trabalha dentro de todas as leis ambientais, buscando o crescimento por meio do desenvolvimento sustentável e com preocupação com o meio ambiente, a sociedade e principalmente com a segurança do seu maior patrimônio, os seus funcionários.',
};

export const cocadaTexto = {
  abertura: 'Um dos doces mais saborosos e tradicionais do Brasil é a Cocada Bahiana. Nosso doce possui tradição centenária, uma história que se inicia no ano de 1907 em Belo Horizonte, capital de Minas Gerais, época em que a Cocada ainda dava seus primeiros passos rumo ao sucesso de vendas que se tornou hoje, unindo em um mesmo produto qualidade, preço e um sabor especial para as famílias brasileiras.',
  multinacional: 'Durante um bom tempo de sua história a Cocada foi produzida por uma empresa multinacional que atuava em diversos países do mundo.',
  novaEra: 'No ano 2000 começa uma nova era. A Cocada passa a ser produzida pela Quysanta Alimentos, uma empresa genuinamente brasileira que assume a missão de espalhar ainda mais por todo o nosso Brasil o sabor irresistível deste doce.',
  hoje: 'Hoje continuamos trabalhando fortemente para que essa tradição continue fazendo parte do cotidiano das famílias brasileiras e também dos nossos parceiros, para que ambos tenham plena satisfação com nosso produto.',
};

// Linha do tempo montada com as datas e fatos do texto "A Tradicional Cocada Bahiana" e "Quem Somos".
export const linhaTempo = [
  { ano: '1907', titulo: 'Nasce em Belo Horizonte', texto: 'A Cocada Bahiana dá seus primeiros passos na capital mineira.' },
  { ano: 'Século XX', titulo: 'Sabor de vários países', texto: 'Durante um bom tempo, o doce é produzido por uma empresa multinacional.' },
  { ano: '2000', titulo: 'Uma nova era', texto: 'A Quysanta, empresa genuinamente brasileira, assume a produção em Montes Claros.' },
  { ano: '4.800 m²', titulo: 'Galpão próprio', texto: 'Investimento inicial no Distrito Industrial, com linha de alta automatização.' },
  { ano: 'Hoje', titulo: 'Em todo o Brasil', texto: 'Fornecedores e parceiros em todo o território nacional.' },
];

export const numeros = [
  { valor: '1907', rotulo: 'ano em que nasceu a receita' },
  { valor: '2000', rotulo: 'produzida pela Quysanta' },
  { valor: '4.800 m²', rotulo: 'de galpão em Montes Claros' },
  { valor: '20+', rotulo: 'colaboradores diretos na linha' },
];

// Rótulo da lata (foto do site atual): "Doce de coco cremoso", "Cocada Bahiana®", "Peso líquido 800 g".
export const produto = { nome: 'Cocada Bahiana', tipo: 'Doce de coco cremoso', peso: '800 g', marca: 'Cocada Bahiana®' };

export const receitas = [
  {
    slug: 'surpresa-de-biscoito', nome: 'Surpresa de biscoito', foto: 'receita-surpresa-de-biscoito',
    resumo: 'Creme de leite condensado, biscoitos champanhe no chocolate e cobertura de claras com Cocada Bahiana.',
    tempo: '4 h no congelador',
    grupos: [{ titulo: 'Ingredientes', itens: ['1 lata de leite condensado', '2 vezes a mesma medida de leite', '4 ovos', '1 colher de sopa de chocolate em pó', '1 xícara de chá de leite', '1 pacote de biscoitos tipo champanhe', '4 colheres de sopa de açúcar', '1 lata de Cocada Bahiana'] }],
    preparo: ['Misture o leite condensado, o leite e as 4 gemas.', 'Leve ao fogo baixo por cerca de 10 minutos, mexendo até obter consistência cremosa.', 'Coloque numa forma refratária.', 'Dissolva o chocolate no leite e passe os biscoitos pela mistura, colocando-os a seguir sobre o creme.', 'Bata as claras em neve.', 'Junte aos poucos o açúcar e, por último, adicione a Cocada Bahiana, misturando bem.', 'Despeje sobre os biscoitos e leve ao congelador por 4 horas.'],
  },
  {
    slug: 'pao-doce-romeu-e-julieta', nome: 'Pão doce Romeu e Julieta', foto: 'receita-pao-doce-romeu-e-julieta',
    resumo: 'Rosca macia recheada com queijo fresco, goiabada e creme de baunilha.',
    tempo: '20 min de forno a 200 °C',
    grupos: [
      { titulo: 'Ingredientes', itens: ['500 g de farinha de trigo', '50 g de fermento de pão', '100 g de açúcar', '100 g de margarina', '2 ovos', '1 pitada de sal', '1 pitada de vanilina', '1 copo de água, aproximadamente', '1 lata de Cocada Bahiana (usada como complemento; seu uso não é obrigatório para o sucesso da receita)'] },
      { titulo: 'Recheio', itens: ['150 g de queijo fresco em fatias', '150 g de goiabada em fatias', '100 g de creme de baunilha'] },
    ],
    preparo: ['Faça uma esponja com 50 g de farinha de trigo, o fermento e um pouquinho de água.', 'Deixe descansar por uns 10 minutos.', 'Após este descanso, adicione o restante dos ingredientes da massa e faça uma massa bem macia.', 'Deixe-a descansar durante uns 20 minutos coberta com um pano.', 'Faça os modelos em duas roscas, recheie com os ingredientes acima, coloque em uma assadeira untada, pincele com ovos batidos e espere o crescimento até quase atingir o seu dobro.', 'Torne a pincelar e leve para assar em forno pré-aquecido a 200 graus por aproximadamente 20 minutos.'],
  },
  {
    slug: 'barrinhas-crocantes', nome: 'Barrinhas crocantes', foto: 'receita-barrinhas-crocantes',
    resumo: 'Castanha de caju caramelizada, chocolate meio amargo e flocos de arroz.',
    tempo: '2 h na geladeira',
    grupos: [
      { titulo: 'Ingredientes', itens: ['1/2 xícara (chá) de açúcar refinado', '1/2 xícara (chá) de castanhas de caju picadas', '100 g de cobertura de chocolate meio amargo ralada', '1 lata de leite condensado', '1 lata de Cocada Bahiana (usada como complemento; seu uso não é obrigatório para o sucesso da receita)'] },
      { titulo: 'Para guarnecer', itens: ['2 xícaras (chá) de flocos de arroz'] },
      { titulo: 'Para banhar', itens: ['350 g de chocolate hidrogenado de boa qualidade'] },
      { titulo: 'Para decorar', itens: ['1/2 xícara (chá) de flocos de arroz'] },
    ],
    preparo: ['Em uma panela, coloque o açúcar e as castanhas, misture e leve ao fogo médio. Mexa até escurecer.', 'Junte o leite condensado e continue a mexer até que comece a desgrudar do fundo da panela.', 'Adicione o chocolate meio amargo e misture até derreter.', 'Retire do fogo, espere amornar, modele as barrinhas e passe nos flocos de arroz para guarnecer. Se necessário, umedeça as mãos para moldar melhor.', 'Coloque em uma assadeira e leve ao refrigerador por 2 horas.', 'Derreta o chocolate hidrogenado em banho-maria ou micro-ondas e banhe as barrinhas.', 'Sem deixar secar, coloque sobre elas um pouco de flocos de arroz para decorar.'],
  },
  {
    slug: 'rapadura-de-coco', nome: 'Rapadura de coco', foto: 'receita-rapadura-de-coco',
    resumo: 'Quatro ingredientes, uma panela e o mármore: o doce de corte mais simples da casa.',
    tempo: 'até esfriar no mármore',
    grupos: [{ titulo: 'Ingredientes', itens: ['1 lata de leite condensado', '3 latas (a mesma do leite) de açúcar', '1 colher de sobremesa de manteiga', '1 lata de Cocada Bahiana (ou um coco pequeno ralado)'] }],
    preparo: ['Misture todos os ingredientes e leve ao fogo até começar a desprender do fundo da panela.', 'Retire do fogo batendo fortemente até que comece a açucarar.', 'Despeje sobre mármore untado e, depois de frio, corte em quadradinhos.'],
  },
];

// Logos da página Clientes (imagens do site atual; nomes lidos dos logos).
export const clientes = [
  { img: 'cliente01', nome: 'Distribuidora Futura' },
  { img: 'cliente02', nome: 'Época Comércio e Distribuição' },
  { img: 'cliente03', nome: 'Martins' },
  { img: 'cliente04', nome: 'Aliança Atacadista' },
  { img: 'cliente05', nome: 'Megaminas Distribuidora' },
  { img: 'cliente06', nome: 'Supermercados BH' },
  { img: 'cliente07', nome: 'Megafort Distribuidora' },
  { img: 'cliente08', nome: 'JC Distribuição' },
];

export const estados = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'];

// Momentos da faixa do topo do site atual (fotos recortadas de bgtopo.jpg).
export const momentos = [
  'Criança com a lata de Cocada Bahiana', 'Mulher saboreando uma tigela de doce', 'Casal sorrindo no sofá', 'Casal de avós fazendo bolhas de sabão',
  'Família à mesa', 'Crianças abraçadas no píer', 'Casal brincando ao ar livre',
];
