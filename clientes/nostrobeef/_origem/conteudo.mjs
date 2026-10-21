// Textos e dados da Nostro Beef. Tudo em `textos`, `linhas` e `receitas` veio do site atual (nostrobeef.com.br),
// só com erros de digitação corrigidos ("Premiumm", "bovíno", "Bífes"). Títulos de seção e legendas são nossos.

export const empresa = {
  nome: 'Nostro Beef',
  nomeLongo: 'Nostro Beef Alimentos',
  razao: 'Nostro Beef Alimentos Importação e Exportação EIRELI ME',
  tipo: 'Entreposto frigorífico',
  url: 'https://nostrobeef.overtus.com.br/',
  antigo: 'http://www.nostrobeef.com.br/',
  fone: '(45) 3323-7442',
  foneHref: '+554533237442',
  // celular que aparece no Google Maps; confirmar se é WhatsApp comercial
  whats: '5545991271317',
  whatsTxt: '(45) 99127-1317',
  cidade: 'Cascavel - PR',
};

export const textos = {
  intro: 'frigorífico especializado na produção e comércio de carne bovina resfriada, congelada, com osso e desossada, além de vários subprodutos como farinha de carne e ossos e sebo.',
  rebanho: 'Conhecido pela qualidade do seu rebanho selecionado de regiões que apresentam chuvas constantes, o que proporciona ao animal uma alimentação orgânica, saudável e natural, refletindo em um produto de excelente qualidade.',
  premium: 'Apresenta uma linha Premium produzida a partir de gados certificados da raça Brangus e Braford, onde sua carne se destaca pela qualidade de marmoreio, precocidade, sabor, suculência e maciez.',
  mercado: 'Nosso mercado é formado por atacadistas, supermercadistas, hipermercados, redes de restaurantes e churrascarias.',
  porcionados: 'Facilitamos e agilizamos o seu dia-a-dia com os cortes porcionados e levamos à sua mesa carne com qualidade de padrão internacional.',
  semPerdas: 'Não há perdas ou desperdícios, produzimos conforme o pedido do cliente.',
  selo: 'Carnes Selecionadas',
};

export const mercado = ['Atacadistas', 'Supermercadistas', 'Hipermercados', 'Redes de restaurantes', 'Churrascarias'];
export const qualidades = ['Marmoreio', 'Precocidade', 'Sabor', 'Suculência', 'Maciez'];
export const formas = ['Resfriada', 'Congelada', 'Com osso', 'Desossada'];

export const linhas = [
  {
    slug: 'tradicionais', nome: 'Linha Cortes Tradicionais', curto: 'Tradicionais',
    texto: 'Cortes do traseiro e do dianteiro, embalados a vácuo e entregues em caixa Nostro Beef.',
    cortes: ['Alcatra c/ maminha', 'Aranha', 'Bananinha', 'Bife do vazio (pacu)', 'Capa de filé', 'Contra filé', 'Cordão do filé mignon', 'Coxão mole', 'Coxão duro', 'Filé mignon s/ cordão', 'Fraldinha', 'Lagarto', 'Miolo de alcatra', 'Músculo do traseiro', 'Ponta de alcatra', 'Acém', 'Paleta com músculo', 'Peito', 'Costela tira', 'Costela ripa', 'Cupim', 'Recorte', 'Carne em cubos'],
    fotos: ['trad-84', 'trad-62', 'trad-73', 'trad-74', 'trad-80', 'trad-89'],
  },
  {
    slug: 'porcionados', nome: 'Linha Cortes Porcionados', curto: 'Porcionados',
    texto: 'Não há perdas ou desperdícios, produzimos conforme o pedido do cliente.',
    cortes: ['Bifes', 'Cubos', 'Iscas', 'Medalhões', 'Moídos', 'Tiras', 'Frações'],
    fotos: ['porc-carne-porcionada-01', 'porc-carne-vacuna-porcionada-y-limpia', 'porc-pulpa-de-res-pierna-450g'],
  },
  {
    slug: 'premium', nome: 'Linha Premium Do Cheff', curto: 'Premium Do Cheff',
    texto: 'Produzida a partir de gados certificados da raça Brangus e Braford.',
    cortes: ['Alcatra completa', 'Bife ancho', 'Chorizo', 'Fraldão A', 'Filé mignon', 'Maminha especial', 'Picanha A', 'Picanha fatiada'],
    fotos: ['prem-3', 'prem-1', 'prem-2', 'prem-4', 'prem-5'],
  },
];

export const subprodutos = [
  { slug: 'farinha', nome: 'Farinha de carne e ossos', foto: 'sub-farinha-de-carne-e-ossos', w: 532, h: 300 },
  { slug: 'sebo', nome: 'Sebo bovino', foto: 'sub-sebo-bovino', w: 282, h: 267 },
];

// As 9 receitas da página Receitas, na ordem do site. `foto` é a imagem que o site usa ao lado de cada uma.
export const receitas = [
  { slug: 'bife-de-chorizo', nome: 'Bife de Chorizo', foto: 'receita-20', corte: 'Chorizo', linha: 'premium',
    resumo: 'Muito popular na Argentina, o bife de chorizo é cortado do contrafilé do gado europeu.',
    ingredientes: ['1,5 kg de bife de chorizo', 'Sal grosso'],
    preparo: ['Corte a peça em 3 partes de 20 cm, mais ou menos.', 'Corte em bifes grossos de 3 cm de espessura, no sentido longitudinal, com 18 a 20 cm de comprimento.', 'Polvilhe sal grosso nos dois lados da carne.', 'Coloque na grelha.', 'Asse em braseiro forte até o ponto desejado.'],
    dica: ['Calculamos 250 g de carne por pessoa.', 'Por ser uma carne muito rígida, deve ser assada apenas na grelha.'] },
  { slug: 'bife-super-macio', nome: 'Bife super macio', foto: 'receita-18', corte: 'Contra filé', linha: 'tradicionais',
    ingredientes: ['1,5 kg de bife de contra filé', 'Sal grosso', 'Azeite'],
    preparo: ['Em uma frigideira coloque um fio de azeite.', 'Coloque o bife na frigideira e coloque o sal grosso por cima do bife.', 'Depois de 2 minutos vire o bife e coloque mais um pouco de sal grosso.', 'Retire a carne da frigideira, bata para tirar o excesso de sal grosso.', 'Sirva com arroz branco e legumes.'] },
  { slug: 'brocolis-alho-e-oleo', nome: 'Brócolis ao alho e óleo', foto: 'receita-23', acompanhamento: true,
    ingredientes: ['1 maço de brócolis', '3 colheres (sopa) de azeite', '1 dente de alho', '1 colher (sopa) de sal', 'Pimenta-do-reino a gosto'],
    preparo: ['Retire as folhas do maço de brócolis. Separe em florzinhas, ou seja, desmanche o maço em vários buquês. Com uma faca afiada, corte a parte mais grossa do talo de cada buquê. (Você pode reservar esses talos para preparar uma sopa).', 'Leve uma panela com água, suficiente para cobrir os brócolis, e a 1 colher (sopa) de sal ao fogo alto. Depois que ela ferver, coloque os brócolis na panela e deixe cozinhar por aproximadamente 5 minutos. Tome cuidado para que os brócolis não cozinhem demais. Verifique o ponto de cozimento espetando com um garfo. Quando os brócolis estiverem macios, retire do fogo.', 'Passe os brócolis por um escorredor, descartando a água. Transfira os brócolis para uma tigela com água e gelo para interromper o cozimento. Quando eles estiverem frios, escorra novamente a água.', 'Descasque o alho e fatie fino.', 'Coloque o azeite numa panela e leve ao fogo médio. Deixe aquecer, junte o alho e mexa até dourar.', 'Adicione os brócolis e misture bem. Verifique o sabor e, se preferir, tempere com pimenta-do-reino. Sirva imediatamente.'] },
  { slug: 'churrasco-de-contra-file', nome: 'Churrasco de contra filé', foto: 'grelha', fotoBanco: true, corte: 'Contra filé', linha: 'tradicionais',
    ingredientes: ['1,2 kg de contrafilé', '100 gramas de sal grosso'],
    preparo: ['Acenda o fogo na churrasqueira com bastante carvão (sugiro um saco inteiro de 5 quilos).', 'Quando o braseiro estiver bem vivo, despeje o sal em uma forma larga.', 'Fatie a carne em pedaços de aproximadamente 3 cm e, em seguida, passe no sal grosso.', 'Imediatamente a coloque na grelha a 20 cm do fogo, por mais ou menos cinco minutos de cada lado, se quiser servir ao ponto. Se preferir mal passada, três minutos serão suficientes; se quiser bem passado, deixe sete minutos.'],
    dica: ['Esse tempo depende sempre de três fatores principais: da intensidade do fogo, da espessura e da temperatura da carne. Por isso, sugiro tirar a carne da geladeira uma hora antes de assar para ficar em temperatura ambiente.'] },
  { slug: 'costela-assada-ao-forno', nome: 'Costela assada ao forno', foto: 'receita-21', corte: 'Costela', linha: 'tradicionais',
    ingredientes: ['3 kg de costela não muito gordurosa', 'Alho', 'Sal a gosto', 'Pimenta bode a gosto', 'Cebola', '2 sachês Sazón para carne (embalagem vermelha)', 'Papel alumínio'],
    preparo: ['Amasse o alho, juntamente com o sal, pimenta, cebola e Sazón, e passe esse tempero muito bem na costela.', 'Envolva a costela já temperada no papel alumínio por três vezes (três folhas de papel alumínio).', 'Deixe a costela em contato com o lado mais brilhante do papel, lembrando de apertar bem as bordas para ficar bem lacrado.', 'Leve ao forno quente por 2 horas.', 'Depois deste tempo retire o papel alumínio e deixe no forno para dar uma douradinha.'],
    dica: ['É melhor quando temperada de véspera.'] },
  { slug: 'espetinho-de-carne-com-legumes', nome: 'Espetinho de carne com legumes', foto: 'receita-24', corte: 'Filé mignon', linha: 'tradicionais',
    ingredientes: ['500 gramas de filé-mignon cortado em cubos', '1 pimentão verde sem sementes cortado em quadradinhos', '1 pimentão vermelho sem sementes cortado em quadradinhos', '2 cebolas cortadas em pedaços', '1 abobrinha italiana pequena cortada em rodelas', '1 linguiça calabresa cortada em rodelas', '½ colher (sopa) de tempero completo com ou sem pimenta', 'Azeite de oliva'],
    preparo: ['Coloque a carne em uma tigela, acrescente o tempero e mexa bem. Utilize espetinhos de bambu para churrasquinho umedecidos em água.', 'Monte os espetinhos intercalando todos os ingredientes. Pincele os espetinhos com o azeite.', 'Coloque os espetinhos sobre a grelha quente também untada com azeite. Às vezes, vire os espetinhos para que dourem de todos os lados.'] },
  { slug: 'pescada-branca', nome: 'Pescada branca', foto: 'receita-25', acompanhamento: true,
    ingredientes: ['4 filés de pescada branca (150 g cada)', '3 colheres (sopa) de azeite', 'Sal e pimenta do reino a gosto', 'Margarina para untar', 'Molho: 3 colheres (sopa) de manteiga', 'Molho: 1 xícara (chá) de alho poró em rodelas finas', 'Molho: 2 xícaras (chá) de creme de leite fresco', 'Sal a gosto', 'Alecrim fresco para polvilhar'],
    preparo: ['Em uma tigela, tempere os filés com o azeite, sal e pimenta.', 'Coloque em uma fôrma untada e leve ao forno médio, preaquecido, por 25 minutos.', 'À parte, derreta a manteiga em uma panela, frite o alho poró por 3 minutos, junte o creme de leite e tempere com sal.', 'Retire o peixe do forno, despeje o molho e polvilhe com alecrim.', 'Sirva em seguida.'],
    info: 'Rendimento: 4 porções · Tempo de preparo: 40 minutos' },
  { slug: 'picadinho-com-batata', nome: 'Picadinho com batata', foto: 'receita-27', corte: 'Carne em cubos', linha: 'tradicionais',
    ingredientes: ['4 colheres de óleo', '1 dente de alho amassado', '1 cebola ralada', '1 kg de carne tipo patinho picado', '4 tomates picados em rodelas', '2 sachês de tempero em pó', '500 g de batata sem casca e cortada em quadrado', 'Cebolinha verde a gosto', '500 ml de água quente'],
    preparo: ['Leve ao fogo na panela de pressão o óleo, o alho e a cebola e deixe fritar até dourar levemente.', 'Adicione a carne e deixe refogar por 10 minutos, mexendo sempre.', 'Adicione a água e o tempero em pó e cozinhe por 30 minutos após chiar.', 'Retire do fogo e, após sair a pressão, acrescente o tomate e a batata e cozinhe por mais 5 minutos na pressão, ou até a batata amolecer.', 'Retire do fogo, polvilhe cebolinha verde e sirva com arroz branco.'] },
  { slug: 'salmao-ao-forno', nome: 'Salmão ao forno', foto: 'receita-28', acompanhamento: true,
    ingredientes: ['300 gramas de salmão em postas', '1 colher de sopa de manteiga', '1 limão siciliano: raspas e suco', 'Salsinha e cebolinha picada (variação: coentro)', 'Azeite de oliva', 'Temperos: pimenta do reino branca, sal e pimenta do reino moída no final'],
    preparo: ['Pré-aqueça o forno a 180 °C.', 'Tempere o salmão com sal e pimenta do reino branca. Coloque as postas num pirex que possa ir ao forno.', 'Regue com um pouco de azeite de oliva e leve ao forno por 15 minutos.', 'Numa panela, derreta a manteiga. Adicione as raspas e o suco do limão siciliano.', 'Mexa até levantar fervura e desligue o fogo.', 'Sirva o molho de limão sobre o peixe.', 'Finalize com a salsinha e cebolinha picadas e um pouco de pimenta do reino moída na hora.'] },
];

export const creditos = 'Fotos do rebanho, das caixas e das receitas: site atual da Nostro Beef. Fotos de carne crua e grelha: rawpixel (CC0), usadas só nesta prévia até chegarem fotos próprias.';
