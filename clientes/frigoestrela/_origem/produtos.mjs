// Catálogo das quatro marcas, tirado das páginas de marca do site atual (2026-10-13).
// Cada produto: [nome, embalagem ou peso ('' se o site não informa), conservação, validade em dias (365 = 1 ano)].
import { T } from './conteudo.mjs';

// Conservação: código -> texto e tipo (resfriado, congelado ou ambiente) para o filtro.
export const cons = {
  r05: { t: T('0 °C a 5 °C', '0 °C to 5 °C'), tipo: 'resfriado' },
  r08: { t: T('0 °C a 8 °C', '0 °C to 8 °C'), tipo: 'resfriado' },
  r48: { t: T('4 °C a 8 °C', '4 °C to 8 °C'), tipo: 'resfriado' },
  c12: { t: T('-12 °C', '-12 °C'), tipo: 'congelado' },
  c18: { t: T('-18 °C', '-18 °C'), tipo: 'congelado' },
  a22: { t: T('Local seco e fresco até 22 °C', 'Cool, dry place up to 22 °C'), tipo: 'ambiente' },
  a26: { t: T('Local seco e fresco até 26 °C', 'Cool, dry place up to 26 °C'), tipo: 'ambiente' },
  s26: { t: T('0 °C a 26 °C', '0 °C to 26 °C'), tipo: 'ambiente' },
  nd: { t: T('Consultar', 'Ask us'), tipo: '' },
};
export const validade = (d, lang) => (d === 0 ? (lang === 'en' ? 'Ask us' : 'Consultar') : d >= 365 ? (lang === 'en' ? '1 year' : '1 ano') : `${d} ${lang === 'en' ? 'days' : 'dias'}`);

const lista = (c, d, nomes) => nomes.map(n => [n, '', c, d]);

export const catalogo = {
  'marcas/estrela-alimentos': {
    intro: T('Carnes bovinas e suínas, embutidos e industrializados: a Estrela da sua mesa em todas as refeições.', 'Beef and pork, sausages and processed foods: the star of your table at every meal.'),
    foto: 'picanha-crua', faixa: 'banner-cuiabana',
    grupos: [
      { t: T('Carnes bovinas', 'Beef'), foto: 'carne-bovina', d: T('Cortes selecionados para tornar qualquer momento inesquecível.', 'Selected cuts to make any moment unforgettable.'), linhas: [
        { t: T('Linha Momentos Especiais', 'Special Moments line'), p: lista('r05', 90, ['Fraldinha', 'Filé de Costela', 'Filé Mignon', 'Miolo de Alcatra', 'Cupim', 'Contra Filé', 'Maminha da Alcatra', 'Picanha']) },
        { t: T('Linha Dia a Dia', 'Everyday line'), d: T('Mais de 20 cortes para atender o seu dia a dia e também aquele churrasco com os amigos.', 'More than 20 cuts for everyday meals and that barbecue with friends.'), p: [
          ...lista('r05', 90, ['Filé de Costela', 'Filé Mignon sem Cordão', 'Capa do Coxão Mole', 'Coxão Mole', 'Fralda Grill', 'Patinho', 'Coxão Duro', 'Músculo Duro', 'Lagarto']),
          ...lista('c12', 365, ['Cordão Filé Mignon', 'Aranha', 'Bananinha', 'Coração', 'Rabo']),
          ['Bucho', '', 'c12', 90],
          ...lista('c12', 365, ['Língua', 'Fígado', 'Rim', 'Paleta ou Acém em cubos', 'Paleta ou Acém em iscas']),
          ...lista('r05', 90, ['Paleta', 'Cupim A']),
          ...lista('c12', 365, ['Costela Gaúcha', 'Costela Minga', 'Costela em Tiras', 'Costela Quadrada']),
          ...lista('r05', 90, ['Picanha Grill', 'Picanha Fatiada', 'Picanha Dia a Dia', 'Alcatra com Maminha', 'Miolo de Alcatra', 'Contra Filé Fracionado', 'Contra Filé Grill', 'Maminha de Alcatra', 'Capa de Filé', 'Contra Filé', 'Peito', 'Acém']),
        ] },
      ] },
      { t: T('Carnes suínas', 'Pork'), foto: 'carne-suina', d: T('Desenvolvida e produzida na planta de Tupã (SP), com atenção ao bem-estar animal, para garantir sabor e suculência.', 'Developed and produced at the Tupã (SP) plant with attention to animal welfare, for flavor and juiciness.'), linhas: [
        { t: T('Processados', 'Processed'), p: [['Bacon Fracionado', '', 'a26', 90], ['Paleta Defumada', '', 'a26', 90], ['Banha Suína', '1 kg', 'a26', 180], ['Bacon Manta', '', 'a26', 90], ['Fressura', '', 'a26', 90],
          ['Rabo Salgado', 'Interfolhado', 's26', 120], ['Máscara com Orelha Salgada', 'Interfolhado', 's26', 120], ['Pele Salgada', '', 'a26', 120], ['Pé Aberto Salgado', '', 'a26', 120]] },
        { t: T('Temperados', 'Seasoned'), p: [...lista('c12', 180, ['Sobrepaleta Temperada', 'Picanha Temperada']), ['Kit Baby Estrela', T('Pernil, paleta, costela com barriga e carré', 'Ham, shoulder, belly ribs and loin'), 'c12', 180],
          ['Costela Temperada', T('Com osso', 'Bone-in'), 'c12', 180], ...lista('c12', 180, ['Leitão à Moda Passarinho Temperado', 'Filézinho Temperado', 'Lombo Temperado', 'Joelho Temperado'])] },
        { t: T('Dia a Dia', 'Everyday'), p: [...lista('c18', 365, ['Joelho Suíno', 'Pé Aberto', 'Barriga sem Osso', 'Sobrepaleta com Osso']), ['Bisteca', 'Interfolhado', 'c18', 365],
          ...lista('c18', 365, ['Copa Lombo sem Osso', 'Picanha Suína', 'Carré', 'Lombo Suíno', 'Filézinho Suíno', 'Paleta com Pele e com Osso', 'Paleta sem Pele e sem Osso', 'Pernil com Pele e com Osso', 'Paleta sem Pele e com Osso', 'Costela com Osso', 'Costelinha Suína', 'Toucinho Lombar', 'Pernil sem Pele e sem Osso (Aberto)', 'Pernil sem Pele e com Osso']),
          ['Meia Carcaça sem Cabeça', '', 'c12', 10]] },
      ] },
      { t: T('Embutidos', 'Sausages and cold cuts'), foto: 'linguica-queijo', d: T('Muita variedade, com sabor e qualidade para qualquer ocasião.', 'Plenty of variety, with flavor and quality for any occasion.'), linhas: [
        { t: T('Salsichas', 'Frankfurters'), p: [['Salsicha Vinagrete', '400 g', 'a26', 120], ['Salsicha Vinagrete', '1,3 kg', 'a26', 120], ['Salsicha a Vinagrete', '2 kg', 'a26', 120],
          ['Salsicha Hot Dog Resfriada', '3 kg', 'r48', 45], ['Salsicha Hot Dog Congelada', '3 kg', 'c12', 120], ['Salsicha Hot Dog Congelada', '5 kg', 'c12', 179], ['Salsicha Aperitivo', '1 kg', 'r48', 45]] },
        { t: T('Mortadelas', 'Mortadella'), p: [['Mortadela Estrela', '400 g', 'a26', 60], ['Mortadela Estrela', '1 kg', 'a26', 60], ['Mortadela de Frango', '1 kg', 'a26', 60], ['Mortadela Estrela', '3,2 kg', 'a26', 60]] },
        { t: T('Frios', 'Cold cuts'), p: [['Fiambre Estrelanche', '', 'r08', 90], ['Apresuntado', '', 'r08', 90], ['Lombo Canadense', '', 'r08', 90], ['Afiambrado', '', 'r48', 90], ['Presunto Cozido', '', 'r08', 90], ['Lanche de Frango', '', 'r48', 90], ['Tender Bolinha', T('Venda sazonal', 'Seasonal'), 'r48', 90]] },
        { t: T('Linguiças', 'Sausages'), p: [['Linguiça de Pernil', '5 kg', 'c12', 150], ['Linguiça Toscana', '5 kg', 'c12', 90], ['Linguiça Cuiabana Bovina', '600 g', 'c12', 90], ['Linguiça Toscana', '600 g', 'c12', 90],
          ['Linguiça Cuiabana de Frango', '600 g', 'c12', 90], ['Linguiça de Pernil Estrela', '600 g', 'c12', 150], ['Linguiça Suína Apimentada', '600 g', 'c12', 150], ['Linguiça Calabresa Estrela', '450 g', 'a26', 90],
          ['Paio', '', 'a26', 90], ['Linguiça Calabresa Reta', '2,5 kg', 'a26', 90], ['Linguiça Calabresa Estrela', '2,5 kg', 'a26', 90]] },
      ] },
      { t: T('Industrializados', 'Processed foods'), foto: 'industrializados', d: T('Hambúrguer e carne moída Estrela, práticos para o dia a dia.', 'Estrela burgers and ground beef, practical for everyday meals.'), linhas: [
        { t: T('Hambúrguer', 'Burgers'), p: ['90', '60', '36', '10'].map(n => ['Hambúrguer de Carne Bovina', T(`Caixa com ${n} unidades de 56 g`, `Box of ${n} × 56 g`), 'c12', 120]) },
        { t: T('Carne moída', 'Ground beef'), p: [['Carne Moída Estrela', '500 g', 'c12', 180], ['Carne Moída Estrela', '1 kg', 'c12', 180]] },
      ] },
    ],
  },
  'marcas/linhas-especiais': {
    intro: T('Seleção de cortes especiais do programa Angus Frigoestrela, da Novilha Jovem e do Suíno Selection.', 'A selection of special cuts from the Frigoestrela Angus program, Young Heifer and Pork Selection.'),
    foto: 'hero-especiais', faixa: 'banner-tbone',
    grupos: [
      { t: T('Angus Selection', 'Angus Selection'), selo: T('Selo dourado', 'Gold seal'), foto: 'angus-selection', d: T('Linha premium do programa Angus Frigoestrela: animais com no mínimo 50% de sangue Angus, até 24 meses de idade e pelo menos 3 meses de confinamento.', 'Premium line of the Frigoestrela Angus program: animals with at least 50% Angus blood, up to 24 months old and at least 3 months in feedlot.'), linhas: [
        { t: T('Cortes', 'Cuts'), p: [
          ...lista('c12', 365, ['Costela do Dianteiro', 'Assado de Tiras', 'Prime Rib', 'Prime Rib Fracionado', 'Tibone', 'Tibone Fracionado', 'Ossobuco', 'Ossobuco Fracionado', 'Short Rib', 'Short Rib Fracionado']),
          ...lista('r05', 90, ['Miolo de Acém', 'Ancho', 'Ancho Fracionado', 'Contra Filé', 'Contra Filé Fracionado', 'Filé Mignon', 'Picanha', 'Coração de Alcatra', 'Maminha', 'Lagarto', 'Coxão Duro', 'Coxão Duro Fracionado', 'Coxão Mole', 'Patinho', 'Coração da Paleta', 'Peito', 'Peito Fracionado']),
          ...lista('r05', 60, ['Fralda', 'Fralda Red', 'Raquete Red', 'Raquete Fracionada', 'Peixinho Red']),
          ...lista('nd', 0, ['Picanha Fatiada', 'Coxão Mole Red']),
        ] },
      ] },
      { t: T('Angus Series', 'Angus Series'), selo: T('Selo prata', 'Silver seal'), foto: 'angus-series', d: T('Cortes Angus do programa Frigoestrela para o dia a dia e para o churrasco.', 'Angus cuts from the Frigoestrela program for everyday meals and barbecues.'), linhas: [
        { t: T('Cortes', 'Cuts'), p: [
          ...lista('c12', 365, ['Prime Rib', 'Prime Rib Fracionado', 'Tibone Fracionado', 'Ossobuco', 'Short Rib Fracionado', 'Costela do Dianteiro', 'Assado em Tiras', 'Costela Janela', 'Costela Quadrada', 'Costela Minga']),
          ...lista('r05', 90, ['Picanha', 'Picanha Fatiada', 'Coração de Alcatra', 'Lagarto', 'Coxão Duro Fracionado', 'Coxão Mole', 'Patinho', 'Coração da Paleta', 'Peito', 'Peito Fracionado', 'Miolo do Acém', 'Capa de Filé', 'Ancho', 'Ancho Fracionado', 'Chorizo', 'Chorizo Fracionado', 'Bananinha']),
          ...lista('r05', 60, ['Fralda', 'Fralda Red', 'Raquete Fracionada', 'Peixinho Red']),
          ...lista('nd', 0, ['Tibone', 'Ossobuco Fracionado', 'Tomahawk', 'Filé Mignon', 'Short Rib', 'Coxão Duro', 'Maminha']),
        ] },
      ] },
      { t: T('Novilha Jovem', 'Young Heifer'), foto: 'novilha-jovem', d: T('Fêmeas da raça Nelore e cruzamentos, com até 24 meses, terminadas no confinamento da Fazenda Turbilhão.', 'Nelore and crossbred heifers up to 24 months old, finished in the Fazenda Turbilhão feedlot.'), linhas: [
        { t: T('Cortes', 'Cuts'), p: [
          ...lista('c12', 365, ['Short Rib', 'Short Rib Fracionado', 'Costela do Dianteiro', 'Costela Janela', 'Costela Quadrada', 'Costela Minga', 'Prime Rib', 'Prime Rib Fracionado', 'Tibone', 'Tibone Fracionado', 'Ossobuco', 'Ossobuco Fracionado']),
          ...lista('r05', 90, ['Cupim', 'Lagarto', 'Coxão Duro', 'Coxão Mole', 'Patinho', 'Coração da Paleta', 'Peito', 'Capa de Filé', 'Contra Filé', 'Contra Filé Fracionado', 'Bananinha', 'Filé Mignon', 'Picanha', 'Picanha Fatiada', 'Coração de Alcatra']),
          ...lista('r05', 60, ['Fralda', 'Raquete Fracionada', 'Peixinho Red']),
          ...lista('nd', 0, ['Maminha', 'Bife Ancho', 'Bife Ancho Fracionado']),
        ] },
      ] },
      { t: T('Suíno Selection', 'Pork Selection'), foto: 'suinos', d: T('Cortes suínos selecionados, congelados a -12 °C.', 'Selected pork cuts, frozen at -12 °C.'), linhas: [
        { t: T('Cortes', 'Cuts'), p: lista('c12', 365, ['Carré Fracionado', 'Carré com Pele', 'Picanha', 'Costelinha', 'Carré Suíno', 'Paleta', 'Sobrepaleta', 'Pernil']) },
      ] },
    ],
  },
  'marcas/donna-estrela': {
    intro: T('Ingredientes selecionados e muito sabor na linha de frios e embutidos Donna Estrela.', 'Selected ingredients and lots of flavor in the Donna Estrela cold cuts and sausages line.'),
    foto: 'donna-capa', faixa: 'donna-faixa',
    grupos: [
      { t: T('Frios e embutidos', 'Cold cuts and sausages'), foto: 'donna-embutidos', d: T('Mortadelas, salame italiano, salaminho e calabresinha.', 'Mortadella, Italian salami, mini salami and calabresa.'), linhas: [
        { t: T('Produtos', 'Products'), p: [['Mortadela Donna Estrela', T('Peça de aprox. 1 kg', 'Approx. 1 kg piece'), 'a26', 60], ['Salame Italiano Donna Estrela', T('Aprox. 580 g', 'Approx. 580 g'), 'a22', 150],
          ['Salaminho Donna Estrela', T('Aprox. 300 g', 'Approx. 300 g'), 'a22', 150], ['Mortadela Donna Estrela', T('Peça de aprox. 4 kg', 'Approx. 4 kg piece'), 'a26', 60], ['Calabresinha Donna Estrela', T('4 unidades', '4 units'), 'a26', 90]] },
      ] },
    ],
  },
  'marcas/tche': {
    intro: T('Linhas Tchê e Refeição: mortadelas, linguiças, bacon e lanches para o comércio e para a sua casa.', 'Tchê and Refeição lines: mortadella, sausages, bacon and luncheon meat for shops and for your home.'),
    foto: 'tche-linguica', faixa: 'hero-tche',
    grupos: [
      { t: T('Linha Tchê', 'Tchê line'), foto: 'tche-apimentada', d: T('Nossa Calabresa Tchê e toda a linha de embutidos com o sabor do Sul.', 'Our Tchê Calabresa and the whole sausage line with the taste of southern Brazil.'), linhas: [
        { t: T('Mortadelas', 'Mortadella'), p: [
          ...['400 g', '1 kg', '2,5 kg', '3,5 kg'].map(w => ['Mortadela com Toucinho em Cubos', w, 'a26', 90]),
          ...['400 g', '1 kg', '2,5 kg', '3,5 kg'].map(w => ['Mortadela sem Toucinho em Cubos', w, 'a26', 90]),
        ] },
        { t: T('Frios', 'Cold cuts'), p: [['Apresuntado Fatiado', '', 'r48', 90], ['Lombo Cozido', '', 'r48', 90]] },
        { t: T('Linguiças e bacon', 'Sausages and bacon'), p: [['Linguiça Toscana', '5 kg', 'c12', 365], ['Linguiça Toscana Apimentada', '1 kg', 'c12', 180], ['Linguiça de Carne Suína', '5 kg', 'c12', 180],
          ['Linguiça de Pernil', '5 kg', 'c12', 365], ['Linguiça de Carne Suína Cozida', '300 g', 'c12', 90], ['Bacon', '5 kg', 'a26', 90], ['Bacon Fracionado', '2,5 a 3 kg', 'a26', 90], ['Filezinho', '', 'c12', 365]] },
      ] },
      { t: T('Linha Refeição', 'Refeição line'), foto: 'tche-salsicha', d: T('Linguiça e lanche em embalagens maiores, para restaurantes e cozinhas industriais.', 'Sausage and luncheon meat in larger packs for restaurants and industrial kitchens.'), linhas: [
        { t: T('Produtos', 'Products'), p: [['Linguiça Suína Refeição', '1 kg', 'c12', 180], ['Linguiça Suína Refeição', '5 kg', 'c12', 180], ['Lanche Refeição', T('Aprox. 2,7 kg', 'Approx. 2.7 kg'), 'r48', 90], ['Lanche Refeição', T('Aprox. 5,5 kg', 'Approx. 5.5 kg'), 'r48', 90]] },
      ] },
    ],
  },
};
