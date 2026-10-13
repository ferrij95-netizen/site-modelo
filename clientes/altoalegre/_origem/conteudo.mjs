// Textos e dados do site da Alto Alegre, tirados do site atual (altoalegre.com.br) em 2026-10-09.
// Depois de mudar qualquer coisa aqui: node clientes/altoalegre/_origem/gerar.mjs

export const site = {
  nome: 'Alto Alegre',
  razao: 'Usina Alto Alegre',
  dominio: 'https://altoalegre.overtus.com.br',
  antigo: 'https://www.altoalegre.com.br/',
  fone: '18 3229 2955',
  foneHref: '+551832292955',
  vendas0800: '0800 771 2955',
  vendas0800Href: '08007712955',
  sac0800: '0800 014 2955',
  sac0800Href: '08000142955',
  email: 'falecom@altoalegre.com.br',
  emailVendas: 'vendas@altoalegre.com.br',
  endereco: 'Rua José Leite, 40, Jardim Bongiovani',
  cidade: 'Presidente Prudente, SP',
  cep: '19050-240',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Jos%C3%A9+Leite+40+Jardim+Bongiovani+Presidente+Prudente+SP',
  redes: [
    ['Instagram', 'https://www.instagram.com/acucaraltoalegre/'],
    ['Facebook', 'https://www.facebook.com/acucaraltoalegre/'],
    ['YouTube', 'https://www.youtube.com/channel/UCL38QKrFTfsmIeh-lpzvXRA'],
  ],
  oficinaInscricao: 'https://portal.altoalegre.com.br/Kids/Inscricao/Index',
};

// Categorias do catálogo, na ordem do menu do site atual.
export const categorias = [
  { id: 'acucar', nome: 'Açúcar', resumo: 'Cristal, refinado, demerara e sachê, em embalagens de 5 g a 50 kg.' },
  { id: 'etanol', nome: 'Etanol', resumo: 'Anidro e hidratado combustível, a granel, com certificado de qualidade.' },
  { id: 'energia', nome: 'Energia', resumo: 'Energia elétrica renovável gerada com o bagaço da cana.' },
];

const nutri = (sodio100 = '0', sodio5 = '0') => [
  ['Valor energético (kcal)', '400', '20', '1'],
  ['Carboidratos (g)', '100', '5', '2'],
  ['Açúcares totais (g)', '100', '5', ''],
  ['Açúcares adicionados (g)', '0', '0', '0'],
  ['Proteínas (g)', '0', '0', '0'],
  ['Gorduras totais (g)', '0', '0', '0'],
  ['Gorduras saturadas (g)', '0', '0', '0'],
  ['Gorduras trans (g)', '0', '0', '0'],
  ['Fibra alimentar (g)', '0', '0', '0'],
  ['Sódio (mg)', sodio100, sodio5, '0'],
];

// cor: cor da embalagem real, usada no palco do produto. foto: embalagem (PNG do site atual).
export const produtos = [
  {
    slug: 'acucar-cristal', cat: 'acucar', nome: 'Açúcar Cristal', sub: 'Classe cristal branco, tipo cristal',
    foto: 'p-cristal', foto2: 'p-cristal-2', cor: '#1b2e75', cor2: '#2a9fd8', tag: 'Tipo cristal',
    embalagens: [['2 kg', 'Pacote'], ['5 kg', 'Pacote'], ['50 kg', 'Saco']],
    resumo: 'Cristais bem definidos e uniformes, para o dia a dia da cozinha, da confeitaria e da indústria.',
    texto: [
      'Açúcar de origem vegetal, constituído fundamentalmente por sacarose de cana-de-açúcar. Sólido com cristais bem definidos, de cor branca no padrão e marrom-claro na versão VHP, com odor e sabor próprios do produto.',
      'É o açúcar das receitas de família: bolos, caldas, pé de moleque, cocadas e doces de festa. Vem em pacotes de 2 kg e 5 kg para o varejo e sacos de 50 kg para padarias, confeitarias e indústrias.',
    ],
    composicao: [['Sacarose', 'mínimo 99,6%', 99.6], ['Sais minerais', 'máximo 0,10%', 0.1], ['Umidade', 'máximo 0,07%', 0.07], ['Outros componentes', '0,23%', 0.23]],
    nutri: nutri(),
    usos: ['Bolos e massas', 'Caldas e doces de corte', 'Confeitaria e panificação', 'Indústria de alimentos'],
  },
  {
    slug: 'acucar-refinado', cat: 'acucar', nome: 'Açúcar Refinado', sub: 'Classe cristal branco, tipo refinado amorfo',
    foto: 'p-refinado', foto2: 'p-refinado-2', cor: '#c8202b', cor2: '#e9575d', tag: '',
    embalagens: [['1 kg', 'Pacote'], ['5 kg', 'Pacote'], ['25 kg', 'Saco']],
    resumo: 'Fino e solúvel, dissolve rápido em bebidas, cremes, coberturas e massas leves.',
    texto: [
      'Açúcar refinado de origem vegetal, constituído fundamentalmente por sacarose de cana-de-açúcar. Sólido amorfo, de cor branca, com odor e sabor próprios do produto.',
      'Pela textura fina, dissolve com facilidade e deixa cremes, chantilly, coberturas e massas mais lisos. Disponível em pacotes de 1 kg e 5 kg e sacos de 25 kg.',
    ],
    composicao: [['Sacarose', 'mínimo 99,5%', 99.5], ['Glicose e frutose', 'máximo 0,4%', 0.4], ['Sais minerais', 'máximo 0,2%', 0.2], ['Umidade', 'máximo 0,3%', 0.3]],
    nutri: nutri('5', '0,25'),
    usos: ['Cafés, sucos e bebidas', 'Chantilly e coberturas', 'Cremes e mousses', 'Massas leves'],
  },
  {
    slug: 'acucar-demerara', cat: 'acucar', nome: 'Açúcar Demerara', sub: 'Classe cristal bruto, tipo demerara',
    foto: 'p-demerara', foto2: 'p-demerara-2', cor: '#5a3a1c', cor2: '#c99558', tag: '100% do Brasil',
    embalagens: [['1 kg', 'Pacote']],
    resumo: 'Cristais marrom-claros, menos processados, com o sabor característico da cana.',
    texto: [
      'Açúcar demerara de origem vegetal, constituído fundamentalmente por sacarose de cana-de-açúcar. Sólido com cristais bem definidos, de cor marrom-clara, com odor e sabor próprios do produto.',
      'Produzido na Unidade Floresta desde 2018. Vai bem em receitas integrais, geleias, pães de fermentação natural, bolos rústicos e no café.',
    ],
    composicao: [['Sacarose', 'mínimo 98,5%', 98.5], ['Sais minerais', 'máximo 0,20%', 0.2], ['Umidade', 'máximo 0,10%', 0.1], ['Outros componentes', '0,23%', 0.23]],
    nutri: nutri(),
    usos: ['Geleias e compotas', 'Pães e roscas', 'Bolos integrais', 'Café e chás'],
  },
  {
    slug: 'acucar-refinado-sache', cat: 'acucar', nome: 'Açúcar Refinado Sachê 5 g', sub: 'Caixa de 2 kg com 400 sachês',
    foto: 'p-sache', foto2: 'p-sache-2', cor: '#4d6b3c', cor2: '#cfc9b0', tag: 'Food service',
    embalagens: [['Caixa 2 kg', '400 sachês de 5 g']],
    resumo: 'Porção individual de 5 g para cafeterias, restaurantes, hotéis e escritórios.',
    texto: [
      'Açúcar refinado de origem vegetal, constituído fundamentalmente por sacarose de cana-de-açúcar. Sólido amorfo, de cor branca, com odor e sabor próprios do produto.',
      'Cada sachê traz 5 g, a porção de uma colher de chá, com a assinatura da marca: "A alegria tem sabor". Vendido em caixas de 2 kg com 400 sachês.',
    ],
    composicao: [['Sacarose', 'mínimo 99,5%', 99.5], ['Glicose e frutose', 'máximo 0,4%', 0.4], ['Sais minerais', 'máximo 0,2%', 0.2], ['Umidade', 'máximo 0,3%', 0.3]],
    nutri: nutri('5', '0,25'),
    usos: ['Cafeterias e padarias', 'Restaurantes e hotéis', 'Escritórios', 'Eventos'],
  },
  {
    slug: 'etanol-anidro', cat: 'etanol', nome: 'Etanol Anidro Combustível', sub: 'Etanol etílico anidro, a granel',
    foto: 'f-usina-campo', cor: '#0b6b4a', cor2: '#2fb37a', tag: 'Granel',
    embalagens: [['Granel', 'Carregamento em caminhão-tanque']],
    resumo: 'Etanol de alto teor alcoólico, misturado à gasolina pelas distribuidoras.',
    texto: [
      'Produto a granel, líquido límpido e incolor, de validade indeterminada. É o etanol que as distribuidoras misturam à gasolina vendida nos postos.',
      'Cada tanque tem amostra-testemunha guardada pelo controle de qualidade por 2 meses, a 18 ºC ou menos, e o carregamento sai com Certificado de Qualidade.',
    ],
    spec: 'anidro',
    usos: ['Distribuidoras de combustível', 'Mistura à gasolina'],
  },
  {
    slug: 'etanol-hidratado', cat: 'etanol', nome: 'Etanol Hidratado Combustível', sub: 'Etanol etílico hidratado, a granel',
    foto: 'f-usina', cor: '#0b6b4a', cor2: '#2fb37a', tag: 'Granel',
    embalagens: [['Granel', 'Carregamento em caminhão-tanque']],
    resumo: 'O etanol vendido na bomba dos postos para carros flex.',
    texto: [
      'Produto a granel, líquido límpido e incolor, de validade indeterminada. É o etanol que abastece diretamente os carros flex e a álcool.',
      'Cada tanque tem amostra-testemunha guardada pelo controle de qualidade por 2 meses, a 18 ºC ou menos, e o carregamento sai com Certificado de Qualidade.',
    ],
    spec: 'hidratado',
    usos: ['Distribuidoras de combustível', 'Abastecimento de veículos flex'],
  },
  {
    slug: 'energia-eletrica', cat: 'energia', nome: 'Energia Elétrica', sub: 'Cogeração a partir do bagaço da cana',
    foto: 'f-fabrica-pb', cor: '#1b2e75', cor2: '#f2b33d', tag: 'Renovável',
    embalagens: [],
    resumo: 'Energia limpa e renovável, vendida a concessionárias do Sul e do Sudeste.',
    texto: [
      'A Usina Alto Alegre é licenciada para gerar energia elétrica a partir do bagaço da cana que ela mesma usa para fazer açúcar e etanol. É uma fonte limpa e renovável.',
      'Cerca de metade da energia é reaproveitada dentro da usina, movendo motores e iluminando as áreas de produção e administrativas. O restante é vendido a concessionárias das regiões Sul e Sudeste, que cuidam da compra, distribuição e venda.',
      'Em 2007 a usina produziu 241.103 MWh, o suficiente para abastecer uma cidade do porte de Presidente Prudente. Hoje a capacidade de cogeração é de cerca de 418 mil MWh por safra.',
    ],
    usos: ['Consumo próprio da usina', 'Venda a concessionárias do Sul e Sudeste'],
  },
];

// Especificação técnica do etanol (Portaria ANP de 8 de agosto de 2002, conforme o site atual).
export const especEtanol = [
  ['pH', 'Não aplicável', '7,0 ± 1,0'],
  ['Teor alcoólico em peso (ºINPM)', 'mínimo 99,3', '93,2 ± 0,6'],
  ['Teor alcoólico em volume (ºGL)', 'mínimo 99,58', '95,56 ± 0,43'],
  ['Acidez total, em ácido acético (mg/L)', 'máximo 30', 'máximo 30'],
  ['Aparência', 'Límpido e sem material em suspensão', 'Límpido e sem material em suspensão'],
  ['Condutividade elétrica (mS/m)', 'máximo 500', 'máximo 500'],
  ['Massa específica a 20 ºC (kg/m³)', 'máximo 791,5', '809,3 ± 1,7'],
];

// Receitas da página inicial do site atual. acucar = slugs dos produtos usados.
export const receitas = [
  { slug: 'bolo-de-cenoura', nome: 'Bolo de Cenoura', foto: 'r-bolo-cenoura', rende: '1 bolo', tempo: '1 hora', acucar: ['acucar-refinado'],
    ingr: [['Massa', ['3 ovos', '½ xícara (chá) de óleo', '2 xícaras (chá) de Açúcar Refinado Alto Alegre', '3 cenouras médias', '2 xícaras (chá) de farinha de trigo', '1 colher (sopa) de fermento em pó']], ['Calda', ['1 caixa (200 g) de creme de leite', '4 colheres (sopa) de chocolate em pó', '2 colheres (sopa) de manteiga sem sal', '2 xícaras (chá) de Açúcar Refinado Alto Alegre']]],
    preparo: ['Bata no liquidificador os ovos, o óleo, o açúcar e as cenouras por cerca de 3 minutos.', 'Passe para uma tigela e incorpore com cuidado a farinha e o fermento.', 'Unte e enfarinhe uma forma de 25 cm, coloque a massa e asse em forno médio (180 °C) por cerca de 40 minutos.', 'Para a calda, misture os ingredientes e leve ao fogo até engrossar.', 'Despeje a calda ainda quente sobre o bolo.'] },
  { slug: 'docinho-de-abacaxi', nome: 'Docinho de Abacaxi', foto: 'r-docinho-abacaxi', rende: '40 docinhos', tempo: '40 minutos', acucar: ['acucar-refinado', 'acucar-cristal'],
    ingr: [['', ['1 ½ xícara (chá) de Açúcar Refinado Alto Alegre', '1 abacaxi descascado e triturado', '100 g de coco fresco ralado', 'Açúcar Cristal Alto Alegre para decorar']]],
    preparo: ['Misture o coco, o açúcar refinado e o abacaxi em uma panela.', 'Leve ao fogo e cozinhe até aparecer o fundo da panela.', 'Despeje sobre uma superfície untada e, depois de frio, modele as bolinhas.', 'Passe os docinhos no açúcar cristal.'] },
  { slug: 'geleia-de-frutas-vermelhas', nome: 'Geleia de Frutas Vermelhas', foto: 'r-geleia', rende: '200 g', tempo: '40 minutos', acucar: ['acucar-demerara'],
    ingr: [['', ['150 g de frutas vermelhas congeladas ou frescas: amora, morango, mirtilo e framboesa', '50 g de Açúcar Demerara Alto Alegre', 'Suco de 1 limão']]],
    preparo: ['Triture as frutas no processador.', 'Junte o açúcar e o suco de limão.', 'Leve ao fogo até atingir o ponto de geleia.'] },
  { slug: 'panetone', nome: 'Panetone', foto: 'r-panetone', rende: '3 panetones', tempo: '4 horas', acucar: ['acucar-cristal'],
    ingr: [['Esponja', ['1 colher (sopa) de Açúcar Cristal Alto Alegre', '6 colheres (sopa) de fermento biológico (75 g)', '1 xícara (chá) de farinha de trigo', '1 xícara (chá) de água']], ['Massa', ['6 ½ xícaras (chá) de farinha de trigo', '3 colheres (sopa) de margarina sem sal', '1 ½ xícara (chá) de Açúcar Cristal Alto Alegre', '4 ovos', '1 colher (sopa) de óleo de milho', '1 colher (sopa) de gordura vegetal', '2 xícaras (chá) de leite', '1 colher (sopa) de essência de panetone']], ['Recheio', ['400 g de frutas cristalizadas', '400 g de uva-passa sem semente']]],
    preparo: ['Misture os ingredientes da esponja, cubra com filme plástico e deixe fermentar até dobrar de volume.', 'Sove a farinha com a esponja e os demais ingredientes da massa até ficar homogênea.', 'Incorpore as frutas cristalizadas e a uva-passa.', 'Divida em 3 partes, coloque em formas de 500 g e deixe crescer até dobrar de volume.', 'Asse em forno médio preaquecido por cerca de 1 hora, até dourar.'] },
  { slug: 'ovos-nevados', nome: 'Ovos Nevados', foto: 'r-ovos-nevados', rende: '3 porções', tempo: '2 horas', acucar: ['acucar-refinado'],
    ingr: [['', ['5 xícaras (chá) de leite', '6 ovos', '360 g de Açúcar Refinado Alto Alegre', '1 colher (chá) de essência de baunilha']]],
    preparo: ['Ferva o leite em uma panela.', 'Bata as claras em neve firme e junte 12 colheres (sopa) de açúcar até formar um suspiro.', 'Modele porções do suspiro sobre o leite fervente e cozinhe rapidamente dos dois lados.', 'Escorra os suspiros, coloque em um recipiente fundo e reserve.', 'Bata as gemas peneiradas com o açúcar restante e a baunilha até formar uma gemada fofa.', 'Junte o leite do cozimento já morno e leve ao fogo para engrossar, mexendo sem deixar ferver.', 'Deixe o creme esfriar, despeje sobre os suspiros e sirva gelado.'] },
  { slug: 'bolo-gelado', nome: 'Bolo Gelado', foto: 'r-bolo-gelado', rende: '1 bolo', tempo: '2 horas', acucar: ['acucar-refinado', 'acucar-cristal'],
    ingr: [['Massa', ['¾ de xícara (chá) de margarina', '2 xícaras (chá) de Açúcar Refinado Alto Alegre', '3 ovos', '2 xícaras (chá) de farinha de trigo', '½ vidro (100 ml) de leite de coco', '1 xícara (chá) de leite', '1 colher (sopa) de fermento em pó']], ['Calda', ['200 ml de leite de coco', '200 ml de leite', '200 g de coco ralado', '1 xícara (chá) de Açúcar Cristal Alto Alegre']]],
    preparo: ['Bata as claras em neve e reserve.', 'Na batedeira, bata a margarina, o açúcar refinado e as gemas até formar um creme claro.', 'Junte a farinha peneirada, o leite de coco e o leite e bata novamente.', 'Incorpore delicadamente as claras em neve e o fermento.', 'Asse em assadeira de 30 x 40 cm untada e enfarinhada, a 180 °C, por cerca de 40 minutos.', 'Ferva os ingredientes da calda até engrossar e despeje quente sobre o bolo assado.', 'Depois de frio, corte em quadrados, passe no coco, embrulhe em papel-alumínio e leve à geladeira.'] },
  { slug: 'torta-de-morango', nome: 'Torta de Morango', foto: 'r-torta-morango', rende: '1 torta', tempo: '4 horas', acucar: ['acucar-cristal', 'acucar-refinado'],
    ingr: [['Pão de ló', ['6 gemas', '2 xícaras (chá) de Açúcar Cristal Alto Alegre', '1 xícara (chá) de água', '2 xícaras (chá) de farinha de trigo', '1 xícara (chá) de amido de milho', '6 claras em neve', '1 colher (sopa) de fermento em pó']], ['Brigadeiro branco', ['1 lata de leite condensado', '1 gema peneirada', '1 colher (sopa) de manteiga']], ['Crocante', ['1 xícara (chá) de Açúcar Cristal Alto Alegre', '1 xícara (chá) de castanha-de-caju moída']], ['Chantilly', ['600 g de creme de leite fresco', '6 colheres (sopa) de Açúcar Refinado Alto Alegre']], ['Morangos e calda', ['6 bandejas de morangos', '6 colheres (sopa) de Açúcar Refinado Alto Alegre', '1 xícara (chá) de leite', '4 colheres (sopa) de Açúcar Refinado Alto Alegre']], ['Montagem', ['400 g de suspiros']]],
    preparo: ['Bata as gemas, o açúcar cristal e a água até formar um creme claro. Incorpore a farinha e o amido, depois o fermento e as claras. Asse em duas formas redondas de 30 cm por cerca de 40 minutos.', 'Cozinhe os ingredientes do brigadeiro branco até formar um creme macio.', 'Derreta o açúcar cristal, misture rápido com a castanha, espalhe numa superfície untada, deixe esfriar e triture.', 'Bata o creme de leite com o açúcar refinado até firmar.', 'Fatie os morangos e tempere com açúcar refinado. Misture o leite com o açúcar da calda.', 'Monte alternando discos umedecidos com a calda, morangos, chantilly, suspiros e o brigadeiro no meio. Cubra com chantilly, crocante e morangos.'] },
  { slug: 'casadinho', nome: 'Casadinho', foto: 'r-casadinho', rende: '50 unidades', tempo: '1 hora e 30 minutos', acucar: ['acucar-cristal'],
    ingr: [['Massa', ['½ xícara (chá) de Açúcar Cristal Alto Alegre', '½ xícara (chá) de margarina sem sal', '½ xícara (chá) e 3 colheres (sopa) de farinha de trigo', '2 ovos']], ['Recheio', ['400 g de doce de leite']]],
    preparo: ['Bata a margarina, o açúcar e os ovos até formar um creme claro.', 'Junte a farinha e bata novamente.', 'Em forma forrada com papel-manteiga, distribua a massa com colher ou saco de confeitar com bico perlê.', 'Asse em forno médio (180 °C) por cerca de 30 minutos, até dourar.', 'Una as bolachinhas duas a duas com doce de leite.'] },
  { slug: 'sobremesa-de-bombons', nome: 'Sobremesa de Bombons', foto: 'r-bombons', rende: '6 porções', tempo: '30 minutos', acucar: ['acucar-refinado'],
    ingr: [['', ['12 bombons', '1 l de leite', '395 ml de leite condensado', '600 ml de creme de leite', '3 ovos', '9 colheres (sopa) de amido de milho', '9 colheres (sopa) de Açúcar Refinado Alto Alegre', '200 g de raspas de chocolate']]],
    preparo: ['Misture o leite, o leite condensado, as gemas peneiradas e o amido em uma panela.', 'Leve ao fogo, mexendo até formar um creme, e deixe esfriar.', 'Junte metade do creme de leite sem soro e misture.', 'Coloque o creme em um refratário e distribua os bombons picados por cima.', 'Bata as claras em neve com o açúcar e, por último, o restante do creme de leite, formando um merengue.', 'Cubra os bombons com o merengue, decore com raspas de chocolate e leve para gelar.'] },
  { slug: 'rosca-de-abobora-com-coco', nome: 'Rosca de Abóbora com Recheio de Coco', foto: 'r-rosca', rende: '1 rosca grande', tempo: '2 horas', acucar: ['acucar-demerara'],
    ingr: [['Esponja', ['50 g de farinha de trigo', '5 g de fermento biológico seco', '100 ml de água']], ['Massa', ['250 g de farinha de trigo', '6 g de sal', '45 g de Açúcar Demerara Alto Alegre', '1 ovo', '90 g de abóbora cozida', '60 g de manteiga']], ['Recheio', ['200 g de coco ralado', '150 g de Açúcar Demerara Alto Alegre', '150 g de manteiga sem sal', '1 ovo', '100 g de uvas-passas pretas hidratadas']]],
    preparo: ['Misture os ingredientes da esponja e deixe descansar por 20 minutos.', 'Junte os ingredientes da massa, menos a manteiga e o sal. Quando ganhar liga, acrescente os dois e sove até o ponto de véu.', 'Deixe crescer por 20 minutos, divida em porções de 200 g e descanse mais 10 minutos.', 'Misture os ingredientes do recheio.', 'Abra retângulos, recheie e enrole como rocambole. Corte ao meio no sentido do comprimento e trance.', 'Deixe crescer por 30 minutos e asse em forno a 160 °C até dourar.'] },
];

export const numeros = [
  ['10,8 mi', 'toneladas de cana moídas por safra'],
  ['11,6 mi', 'sacas de açúcar cristal branco'],
  ['418 mil', 'MWh de energia em cogeração'],
  ['1978', 'ano da primeira unidade, em Colorado (PR)'],
];

export const capacidade = [
  ['10,8 milhões', 'de toneladas de cana'],
  ['11,6 milhões', 'de sacas de açúcar cristal branco'],
  ['9,2 milhões', 'de sacas de açúcar VHP'],
  ['5,4 milhões', 'de sacas de açúcar refinado amorfo'],
  ['100 mil', 'sacas de açúcar demerara'],
  ['140 milhões', 'de litros de etanol hidratado e anidro'],
  ['418 mil', 'MWh de energia elétrica em cogeração'],
  ['49.842', 'pessoas, entre empregos diretos e indiretos'],
];

export const unidades = [
  { nome: 'Unidade Junqueira', local: 'Colorado, PR', ano: '1978', faz: 'Açúcar cristal e refinado, etanol', texto: 'A primeira unidade. Começou produzindo só etanol e depois passou a fabricar açúcar cristal e refinado.' },
  { nome: 'Unidade Floresta', local: 'Distrito de Eneida, Presidente Prudente, SP', ano: '', faz: 'Açúcar cristal e demerara, etanol, energia', texto: 'Produz açúcar cristal, etanol e energia elétrica. Desde 2018 fabrica também o açúcar demerara.' },
  { nome: 'Unidade Santo Inácio', local: 'Santo Inácio, PR', ano: '2007', faz: 'Açúcar VHP, etanol, energia', texto: 'Inaugurada em 2007, produz açúcar VHP, etanol e energia elétrica.' },
  { nome: 'Unidade Florestópolis', local: 'Florestópolis, PR', ano: '2010', faz: 'Açúcar VHP, etanol, energia', texto: 'Inaugurada em 2010, produz açúcar VHP, etanol e energia elétrica.' },
  { nome: 'Escritório Central', local: 'Presidente Prudente, SP', ano: '', faz: 'Administração e vendas', texto: 'Sede administrativa, equipe de vendas e atendimento.' },
];

export const historia = [
  ['Século XVIII', 'As famílias Junqueira e Figueiredo chegam de Portugal e formam propriedades rurais no Rio de Janeiro e em Minas Gerais. Depois seguem para o nordeste paulista e concentram suas atividades no Paraná.'],
  ['1978', 'Nasce a Unidade Junqueira, em Colorado (PR), a primeira da Alto Alegre. No início produz apenas etanol; depois vêm o açúcar cristal e o refinado.'],
  ['Floresta', 'A Unidade Floresta, no Distrito de Eneida, em Presidente Prudente (SP), passa a produzir açúcar cristal, etanol e energia elétrica.'],
  ['2007', 'Inauguração da Unidade Santo Inácio (PR), com açúcar VHP, etanol e energia.'],
  ['2010', 'Inauguração da Unidade Florestópolis (PR), com açúcar VHP, etanol e energia.'],
  ['2018', 'A Unidade Floresta começa a produzir o Açúcar Demerara Alto Alegre.'],
];

export const certificacoes = [
  ['ISO 9001', 'Gestão da qualidade nas unidades Floresta e Junqueira desde 2003, em Santo Inácio desde 2009 e, mais recentemente, em Florestópolis.'],
  ['FSSC 22000', 'Segurança de alimentos na Unidade Junqueira: ISO 22000 em 2009 e FSSC 22000 desde 2012.'],
  ['APPCC', 'Análise de Perigos e Pontos Críticos de Controle, para prevenir contaminações e não conformidades.'],
  ['Programa 5S', 'Organização do ambiente de trabalho, a base para atingir a Qualidade Total.'],
];

// Processo, do campo ao produto (resumo do "Sobre a Alto Alegre" do site atual).
export const processo = [
  ['Plantio', 'Cana plantada e cultivada nas áreas das quatro unidades, no Paraná e em São Paulo.', 'folha'],
  ['Colheita e moagem', 'Cerca de 10,8 milhões de toneladas de cana moídas por safra.', 'cana'],
  ['Açúcar', 'Cristal, refinado, demerara e VHP, com ISO 9001 e FSSC 22000.', 'cubo'],
  ['Etanol', 'Anidro e hidratado combustível, com certificado de qualidade por tanque.', 'gota'],
  ['Energia', 'O bagaço vira energia elétrica para a usina e para a rede.', 'raio'],
];

const pdf = id => `https://www.altoalegre.com.br/upload/sustpublicacoes/${id}.pdf`;
export const publicacoes = [
  ['Relatório de Igualdade Salarial', '2º semestre de 2026', pdf('54657f6fff2747e6672256aee0fb96499ec2fdd7')],
  ['Relatório de Igualdade Salarial', '1º semestre de 2026', pdf('119dd6a382c0ae60ca38701b559743136c80bb34')],
  ['Relatório de Igualdade Salarial', '2º semestre de 2025', pdf('003f48294b445ef0f8a05d0d4302afa0fc048a60')],
  ['Relatório de Igualdade Salarial', '1º semestre de 2025', pdf('cba59413d1bdd2c76e2169e3fa341a633f040130')],
  ['Relatório de Igualdade Salarial', '2º semestre de 2024', pdf('4adf1eccf42c2153f2c5ee009f7091900714024e')],
  ['Relatório de Igualdade Salarial', '1º semestre de 2024', pdf('cbe4dee5a6438d0c755211ec44ffdcc4def1f43c')],
  ['Código de Conduta Ética', 'Documento institucional', pdf('db52617ca5be78233c3aa108c0246a1ffa3a0f4d')],
  ['Relatório de Sustentabilidade', '2019', pdf('c7f26cddbcabf1872f44fb09dd114ca599a3d973')],
  ['Relatório de Sustentabilidade', '2017', pdf('cb0ec120e38bcd2ed0343362b59a6fffeb643ed7')],
  ['Relatório de Sustentabilidade', '2016', pdf('e8c9d44d7427c357c09db378f8dcbed035d1c11b')],
  ['Relatório de Sustentabilidade', '2015', pdf('c50277f34883c1c186ece7b83dce3dffecdb29a6')],
  ['Relatório de Sustentabilidade', '2014', pdf('91349bdef12b50ee57e084a0935dec3ebe3ef152')],
  ['Relatório de Sustentabilidade', '2013', pdf('3b33b533bbea51485006bbe70968159df3516ce5')],
  ['Relatório de Sustentabilidade', '2012', pdf('0e73ce3e8a080c7672ccdba8183a9c0dd54e1b5a')],
  ['Relatório de Sustentabilidade', '2011', pdf('02599df85e6c2f8344fb59bcfacd45a23a010025')],
];

export const projetosSociais = [
  ['Projeto Chuvisco', 'Treinamentos para as equipes nos dias de chuva, quando o trabalho no campo para.'],
  ['Projeto Bem Estar', 'Refeições no restaurante da empresa, com opção de Cardápio Light.'],
  ['Pensando no Futuro', 'Estágio para estudantes universitários.'],
  ['Programa Trainee', 'Formação de novos profissionais para a liderança.'],
  ['Saúde do Trabalhador', 'Acompanhamento da saúde de quem trabalha na usina.'],
  ['Café com Saúde', 'Café da manhã mensal para colaboradores com doenças crônicas.'],
  ['Capacitação', 'Treinamento, aperfeiçoamento e desenvolvimento de carreira.'],
  ['Integração', 'Acolhida dos novos colaboradores e acompanhamento das famílias pelos agentes sociais.'],
];

export const projetosAmbientais = [
  ['Projeto Reciclar', 'Reciclagem e redução de resíduos nas unidades.'],
  ['Projeto Mais Verde', 'Plantio de árvores: 200 mil mudas em 120 hectares só em 2007.'],
  ['Plantando Verde e Colhendo Vida', 'Programa de educação ambiental com alunos do 5º ano das escolas da região.'],
  ['Viveiro próprio', 'Mais de 80 espécies nativas e mais de 600 mil mudas já produzidas.'],
  ['Crédito de Carbono', 'Créditos de carbono certificados pela ONU na Unidade Floresta.'],
];

export const menu = [
  ['sobre', 'Sobre nós'],
  ['produtos', 'Produtos'],
  ['receitas', 'Receitas'],
  ['sustentabilidade', 'Sustentabilidade'],
  ['trabalhe-conosco', 'Trabalhe conosco'],
  ['contato', 'Contato'],
];
