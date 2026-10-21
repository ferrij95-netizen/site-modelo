// Conteúdo da Madeireira Nobre Maringá, tirado do site atual (madeireiranobremaringa.com.br) em 21/10/2026.
// Textos dos produtos e medidas são os do site atual, só revisados (cm → m nos compensados, erros de digitação).

export const empresa = {
  nome: 'Madeireira Nobre',
  nomeCompleto: 'Madeireira Nobre Maringá',
  url: 'https://madeireiranobre.overtus.com.br/',
  antigo: 'https://www.madeireiranobremaringa.com.br/',
  fundacao: 2008,
  anos: 18,
  fone: '(44) 3031-4989',
  foneHref: '+554430314989',
  celular: '(44) 99138-4020',
  celularHref: '+5544991384020',
  wa: '5544991384020',
  email: 'madeireiranobremaringa@hotmail.com',
  endereco: 'Av. Dr. Alexandre Rasgulaeff, 4458',
  bairro: 'Jardim Imperial',
  cidade: 'Maringá / PR',
  mapa: 'https://goo.gl/maps/PdNjdShqrHmH4Umn8',
  mapaEmbed: 'https://www.google.com/maps?q=Madeireira+Nobre+Maring%C3%A1,+Av.+Dr.+Alexandre+Rasgulaeff,+4458&output=embed',
  horario: [['Segunda a quinta', '07:30 às 18:00'], ['Sexta', '07:30 às 17:00']],
  redes: {
    instagram: 'https://www.instagram.com/madeireiranobremaringa/',
    facebook: 'https://www.facebook.com/madeireiranobremaringa',
    tiktok: 'https://www.tiktok.com/@madeireiranobre',
  },
};

export const sobre = {
  titulo: 'Madeiras de qualidade, direto da serraria',
  texto: [
    'A Madeireira Nobre Maringá é uma empresa fundada em 2008 que se destaca pela qualidade, confiança e preço justo de seus produtos.',
    'Atua no ramo de madeiras há 18 anos, buscando sempre o bom atendimento. Nossas madeiras vêm diretamente da serraria.',
  ],
  lema: 'Madeiras direto da serraria, qualidade e preço justo aos nossos clientes.',
  convite: 'Entre em contato e faça um orçamento sem compromisso.',
};

// Categorias na mesma ordem do site atual. etapa = em que fase da obra o produto entra (seção "Da fundação ao telhado").
export const categorias = [
  { slug: 'vigas', nome: 'Vigas', curto: 'Eucalipto e pinus 5 × 10 cm', etapa: 'telhado', banner: 'hero-vigas',
    intro: 'Vigas serradas de eucalipto e de pinus para a estrutura do telhado e para a obra em geral.',
    itens: [
      { slug: 'viga-de-eucalipto-5cm-x-10cm', nome: 'Viga de Eucalipto 5 cm × 10 cm', madeira: 'Eucalipto', secao: [5, 10],
        texto: 'Viga de eucalipto serrado, 5 cm de espessura × 10 cm de largura. Ideal para telhados e para a construção civil em geral, pois é resistente e durável.',
        ficha: [['Seção', '5 × 10 cm'], ['Madeira', 'Eucalipto serrado'], ['Comprimentos', 'de 2 m a 6 m']] },
      { slug: 'viga-de-pinus-5cm-x-10cm', nome: 'Viga de Pinus 5 cm × 10 cm', madeira: 'Pinus', secao: [5, 10],
        texto: 'Viga de pinus serrado, 5 cm de espessura × 10 cm de largura, usada para a sustentação de telhados em construções e reformas.',
        ficha: [['Seção', '5 × 10 cm'], ['Madeira', 'Pinus serrado'], ['Comprimento', '3 m']] },
    ] },
  { slug: 'caibros', nome: 'Caibros', curto: 'Eucalipto e pinus 5 × 5 cm', etapa: 'telhado',
    intro: 'Caibros de seção quadrada que apoiam as ripas e as telhas.',
    itens: [
      { slug: 'caibro-de-eucalipto-5cm-x-5cm', nome: 'Caibro de Eucalipto 5 cm × 5 cm', madeira: 'Eucalipto', secao: [5, 5],
        texto: 'Caibro de eucalipto serrado, 5 cm × 5 cm, formato quadrado. Indicado para áreas internas e secas e ideal para telhados, pois é resistente e durável.',
        ficha: [['Seção', '5 × 5 cm'], ['Madeira', 'Eucalipto serrado'], ['Comprimentos', 'de 2 m a 6 m']] },
      { slug: 'caibro-de-pinus-5cm-x-5cm', nome: 'Caibro de Pinus 5 cm × 5 cm', madeira: 'Pinus', secao: [5, 5],
        texto: 'Caibro de pinus serrado, 5 cm × 5 cm, formato quadrado, usado para a sustentação de telhados em construções e reformas.',
        ficha: [['Seção', '5 × 5 cm'], ['Madeira', 'Pinus serrado'], ['Comprimento', '3 m']] },
    ] },
  { slug: 'ripoes', nome: 'Ripões', curto: 'Eucalipto e pinus 5 × 2 cm', etapa: 'telhado',
    intro: 'Ripões serrados para o telhado, a obra, artesanato e móveis.',
    itens: [
      { slug: 'ripao-de-eucalipto', nome: 'Ripão de Eucalipto', madeira: 'Eucalipto', secao: [2.3, 5],
        texto: 'Ripão de eucalipto serrado, 5 cm de largura × 2,3 cm de espessura, usado na construção civil.',
        ficha: [['Seção', '5 × 2,3 cm'], ['Madeira', 'Eucalipto serrado'], ['Comprimentos', 'de 2 m a 6 m']] },
      { slug: 'ripao-de-pinus', nome: 'Ripão de Pinus', madeira: 'Pinus', secao: [2, 5],
        texto: 'Ripão de pinus serrado, 5 cm de largura × 2 cm de espessura, usado na construção civil, em artesanato e na fabricação de móveis.',
        ficha: [['Seção', '5 × 2 cm'], ['Madeira', 'Pinus serrado'], ['Comprimento', '3 m']] },
    ] },
  { slug: 'tabuas', nome: 'Tábuas', curto: 'Pinus de 10 a 30 cm', etapa: 'fundacao', banner: 'hero-tabuas',
    intro: 'Tábuas de pinus usadas do começo ao fim da obra, da caixaria das fundações ao acabamento.',
    itens: [
      { slug: 'tabuas-de-pinus', nome: 'Tábuas de Pinus', madeira: 'Pinus', secao: [2, 30],
        texto: 'A tábua de pinus pode ser usada na construção civil do início ao fim da obra, partindo das fundações (caixaria) até o final.',
        medidas: ['10 × 2 cm × 3 m', '15 × 2 cm × 3 m', '20 × 2 cm × 3 m', '25 × 2 cm × 3 m', '30 × 2 cm × 3 m'],
        ficha: [['Larguras', '10, 15, 20, 25 e 30 cm'], ['Espessura', '2 cm'], ['Comprimento', '3 m']] },
    ] },
  { slug: 'compensados-madeirites', nome: 'Compensados / Madeirites', curto: 'Fenólico e plastificado', etapa: 'estrutura', banner: 'hero-compensados',
    intro: 'Chapas de compensado (madeirite) para fôrmas de concreto, tapumes e instalações de canteiro.',
    itens: [
      { slug: 'compensado-madeirite-fenolico', nome: 'Compensado / Madeirite Fenólico',
        texto: 'Madeirites de cola fenólica, ou compensados, são formados pela sobreposição de lâminas de madeira. Por ter grande superfície e custo atrativo, é muito usado em fôrmas para lajes, vigas e pilares, como tapume no perímetro da obra e em instalações provisórias do canteiro, como refeitórios, banheiros e almoxarifados.',
        ficha: [['Chapa', '1,10 × 2,20 m'], ['Rendimento', '2,42 m² por chapa'], ['Espessuras', '10, 12, 14 e 17 mm']] },
      { slug: 'compensado-madeirite-plastificado', nome: 'Compensado / Madeirite Plastificado',
        texto: 'Muito usado na produção de fôrmas para concreto aparente, também serve para piso de carroceria de caminhão e até para móveis. As chapas são prensadas com cola preta e a face externa é coberta por uma película (o filme).',
        ficha: [['Chapa', '1,10 × 2,20 m'], ['Rendimento', '2,42 m² por chapa'], ['Espessuras', '12, 14, 17 e 20 mm']] },
    ] },
  { slug: 'estacas', nome: 'Estacas', curto: 'De caibro e de ripa', etapa: 'fundacao',
    intro: 'Estacas para marcar a obra, travar a caixaria e para jardinagem.',
    itens: [
      { slug: 'estaca-de-caibro', nome: 'Estaca de Caibro', texto: 'Estaca de caibro usada para marcação de obra, travamento de caixaria e jardinagem.', ficha: [['Uso', 'Marcação de obra, caixaria e jardim']] },
      { slug: 'estaca-de-ripa', nome: 'Estaca de Ripa', texto: 'Estaca de ripão usada para marcação de obra, travamento de caixaria e jardinagem.', ficha: [['Uso', 'Marcação de obra, caixaria e jardim']] },
    ] },
  { slug: 'escoras-de-eucalipto', nome: 'Escoras de Eucalipto', curto: 'De 3 m a 6 m', etapa: 'estrutura',
    intro: 'Escoras roliças de eucalipto de reflorestamento para escorar lajes.',
    itens: [
      { slug: 'escora-de-eucalipto', nome: 'Escora de Eucalipto', texto: 'Escora de eucalipto, madeira de reflorestamento, para o escoramento de lajes.', ficha: [['Madeira', 'Eucalipto de reflorestamento'], ['Comprimentos', 'de 3 m a 6 m']] },
    ] },
  { slug: 'telhas-onduladas', nome: 'Telhas Onduladas', curto: 'Brasilit, Eternit e Infibra', etapa: 'cobertura', banner: 'hero-telhas',
    intro: 'Telhas onduladas de fibrocimento das marcas Brasilit, Eternit e Infibra, em sete comprimentos.',
    comum: [['Largura', '1,10 m'], ['Largura útil', '1,05 m'], ['Espessura', '6 mm'], ['Comprimentos', '1,22 · 1,53 · 1,83 · 2,13 · 2,44 · 3,05 · 3,66 m'], ['Vão livre máximo', '1,69 m (2 apoios até 1,83 m; 3 apoios de 2,13 m em diante)'], ['Inclinação mínima', '9% (5°)']],
    itens: [
      { slug: 'telhas-brasilit-ondulada-de-fibrocimento', nome: 'Telha Brasilit Ondulada de Fibrocimento', marca: 'Brasilit', garantia: '10 anos',
        texto: 'Ideal para todo tipo de instalação (residencial, comercial, industrial e do agronegócio). A Telha Ondulada Brasilit tem a tecnologia CRFS (Cimento Reforçado com Fio Sintético), sem amianto.',
        ficha: [['Garantia', '10 anos']] },
      { slug: 'telhas-eternit-ondulada-de-fibrocimento', nome: 'Telha Eternit Ondulada de Fibrocimento', marca: 'Eternit', garantia: '5 anos',
        texto: 'Se o foco da obra é rapidez e praticidade, a Telha Eternit Ondulada é a melhor alternativa. Por isso é muito usada em escolas, hospitais, indústrias e conjuntos habitacionais.',
        ficha: [['Garantia', '5 anos']] },
      { slug: 'telhas-infibra-ondulada-de-fibrocimento', nome: 'Telha Infibra Ondulada de Fibrocimento', marca: 'Infibra', garantia: '5 anos',
        texto: 'A Telha de Superfibra Ondulada Infibra é versátil e de fácil montagem, para vários tipos de cobertura, com peças complementares que ajudam na instalação e na durabilidade.',
        ficha: [['Garantia', '5 anos']] },
    ] },
  { slug: 'telhas-de-concreto', nome: 'Telhas de Concreto', curto: 'Coppo Veneto d\'Itália', etapa: 'cobertura',
    intro: 'Telha de concreto de perfil clássico, que combina com projetos do clássico ao contemporâneo.',
    itens: [
      { slug: 'telha-de-concreto-coppo-veneto-ditalia', nome: 'Telha de Concreto Coppo Veneto d\'Itália', marca: 'd\'Itália',
        texto: 'A Coppo Veneto é a telha de cimento tradicional da marca d\'Itália. Perfil elegante, instalação rápida e encaixes perfeitos: une beleza, qualidade e economia em um só produto.',
        ficha: [['Marca', 'd\'Itália'], ['Rendimento', '10,5 telhas por m²']] },
    ] },
  { slug: 'parafusos-telhas-fibrocimento', nome: 'Parafusos Telhas Fibrocimento', curto: 'Telheiro 5/16 × 110 mm', etapa: 'cobertura',
    intro: 'Parafuso telheiro com vedação para fixar telhas onduladas.',
    itens: [
      { slug: 'parafuso-telha-fibrocimento', nome: 'Parafuso Telha Fibrocimento',
        texto: 'O parafuso telheiro 5/16 × 110 mm fixa telhas de fibrocimento (Brasilit, Eternit e todas as onduladas padrão), plásticas, de fibra e de policarbonato. Já vem com o conjunto de vedação 5/16 (arruela de PVC e arruela côncava zincada).',
        ficha: [['Medida', '5/16 × 110 mm'], ['Acompanha', 'Arruela de PVC e arruela côncava zincada']] },
    ] },
  { slug: 'pregos', nome: 'Pregos', curto: 'Do 15 × 15 ao 22 × 48', etapa: 'estrutura',
    intro: 'Prego comum para a obra e para a marcenaria.',
    itens: [
      { slug: 'prego-comum', nome: 'Prego Comum', texto: 'Pregos são muito usados na construção civil e em trabalhos de marcenaria.',
        medidas: ['15 × 15', '15 × 21', '17 × 21', '17 × 27', '18 × 24', '19 × 36', '20 × 42', '22 × 48'],
        ficha: [['Bitolas', '15×15 a 22×48']] },
    ] },
  { slug: 'arames-recozido', nome: 'Arames Recozido', curto: 'Para fôrmas e ferragem', etapa: 'estrutura',
    intro: 'Arame recozido para amarrar fôrmas e ferragens.',
    itens: [
      { slug: 'arame-recozido', nome: 'Arame Recozido', texto: 'O arame recozido é extremamente versátil: amarra as fôrmas de madeira e as barras de aço da estrutura interna das vigas e dos pilares que vão sustentar a obra.', ficha: [['Uso', 'Amarração de fôrmas e ferragens']] },
    ] },
];

// Fases da obra: mesma ordem em que o cliente compra.
export const etapas = [
  { id: 'fundacao', n: '01', nome: 'Fundação e marcação', texto: 'Estacas para marcar o terreno e tábuas de pinus para a caixaria das sapatas e baldrames.' },
  { id: 'estrutura', nome: 'Fôrmas e lajes', n: '02', texto: 'Compensados para as fôrmas, escoras de eucalipto embaixo da laje, arame recozido e pregos para amarrar e fixar.' },
  { id: 'telhado', nome: 'Estrutura do telhado', n: '03', texto: 'Vigas, caibros e ripões serrados, em eucalipto ou pinus, nos comprimentos que o projeto pede.' },
  { id: 'cobertura', nome: 'Cobertura', n: '04', texto: 'Telhas onduladas Brasilit, Eternit e Infibra, telha de concreto Coppo Veneto e os parafusos com vedação.' },
];

// Depoimentos que estão no site atual (sem as fotos, que parecem de banco de imagem).
export const depoimentos = [
  { nome: 'Fernanda Lima', texto: 'A Madeireira Nobre Maringá sempre me surpreende com a qualidade de seus produtos. Confio na sua experiência em madeiras e recomendo a empresa a todos que procuram materiais duráveis e de alta qualidade.' },
  { nome: 'Ana Souza', texto: 'Trabalhar com a Madeireira Nobre Maringá é ter certeza da qualidade dos materiais e de um atendimento excepcional.' },
  { nome: 'Beatriz Almeida', texto: 'Variedade de produtos incomparável e qualidade dos materiais excelente.' },
  { nome: 'Lucas Silva', texto: 'A Madeireira Nobre Maringá oferece produtos de alta qualidade. Recomendo a todos que procuram materiais duráveis.' },
  { nome: 'Gustavo Oliveira', texto: 'A Madeireira Nobre Maringá se preocupa com a sustentabilidade e a preservação do meio ambiente.' },
];

export const slides = [
  { img: 'hero-telhas', cat: 'telhas-onduladas', titulo: 'Telhas onduladas', sub: 'Grande variedade em telhas onduladas', linha: 'Encaixe perfeito, solução ideal.' },
  { img: 'hero-tabuas', cat: 'tabuas', titulo: 'Tábuas de pinus', sub: 'O melhor preço da região', linha: 'Da caixaria ao acabamento da obra.' },
  { img: 'hero-vigas', cat: 'vigas', titulo: 'Vigas de madeira', sub: 'As melhores para a sua obra', linha: 'Eucalipto e pinus direto da serraria.' },
];

export const todosItens = categorias.flatMap(c => c.itens.map(i => ({ ...i, cat: c })));
