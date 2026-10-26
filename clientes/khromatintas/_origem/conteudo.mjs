// Textos e dados da Khroma Tintas, tirados do site atual (khromatintas.com.br, WordPress/Elementor, lido pela API wp-json em 26/10/2026).
// O que foi escrito por nós (não está no site atual) está marcado com "// nosso" e listado no LEIA-ME.

export const empresa = {
  nome: 'Khroma Tintas',
  url: 'https://khromatintas.overtus.com.br/',
  antigo: 'https://khromatintas.com.br/',
  fundacao: 2010,
  certificacao: 2020,
  endereco: 'Rua José Bonifácio de Andrada e Silva, 40',
  cidade: 'Bom Jesus dos Perdões',
  uf: 'SP',
  cep: '12955-000',
  whats: '5511940854429',
  whatsTxt: '(11) 94085-4429',
  instagram: 'https://www.instagram.com/khromatintas/',
  facebook: 'https://www.facebook.com/khromatintas/',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Jos%C3%A9+Bonif%C3%A1cio+de+Andrada+e+Silva+40+Bom+Jesus+dos+Perd%C3%B5es+SP',
  mapaEmbed: 'https://www.google.com/maps?q=Rua+Jos%C3%A9+Bonif%C3%A1cio+de+Andrada+e+Silva+40,+Bom+Jesus+dos+Perd%C3%B5es+-+SP,+12955-000&output=embed',
};

export const textos = {
  heroTitulo: 'Produtos diretos do fabricante',
  heroTexto: 'Você pode ter produtos de demarcação viária e residencial direto da fabricante! Entre em contato e saiba um pouco mais sobre os produtos Khroma.',
  slogan: 'Demarcação viária e tintas residenciais em um só local!',
  sobre: [
    'A KHROMA Tintas nasceu em 2010 atuando no mercado de fabricação de tintas para demarcação viária. De lá para cá, visionando o mercado com novas expectativas de crescimento, lançou uma nova linha de tintas imobiliárias. Prezando sempre pelo alto padrão de qualidade, em 2020 certificou-se no INMETRO e na ABNT.',
    'Competência, eficiência, qualidade e muito sentimento em tudo que faz! É assim que nossa equipe trabalha. A KHROMA Tintas investe na qualificação de seus colaboradores, funcionários capacitados, prontos para desenvolver soluções surpreendentes dentro dos mais altos padrões de qualidade.',
  ],
  missao: 'Produzir e comercializar produtos de excelente qualidade, utilizando-se das melhores tecnologias e colaboradores altamente capacitados, a fim de superar as expectativas e a satisfação de cada cliente, levando a melhor experiência desde a compra até a utilização de cada linha.',
  visao: 'Ser modelo de referência em excelência na qualidade e produção, sempre reconhecida pelos colaboradores, clientes e profissionais, com alta qualificação técnica e pessoal. Ser liderança no mercado brasileiro de sinalização horizontal e linha imobiliária.',
  valores: 'A Khroma tem como maior inspiração oferecer às pessoas não somente produtos que superem suas expectativas, mas também honrar nosso compromisso com qualidade, trabalho em equipe e, acima de tudo, humanidade e respeito com todos os que deram e dão sentido à nossa história.',
  infoTecnica: 'Gostaria de saber mais informações sobre os nossos produtos, como Boletim Técnico e FISPQ? Preencha o formulário e entraremos em contato.',
  canal: 'Gostaria de comprar produtos Khroma direto da fábrica? Entre em contato conosco agora mesmo e retornaremos o quanto antes!',
  representante: 'Preencha o formulário e fique por dentro de como a Khroma pode agregar ao seu negócio.',
  // nosso: as etapas de aplicação juntam os dados das fichas técnicas do site atual (diluição, microesferas, liberação ao tráfego)
  etapasViaria: [
    { t: 'Pavimento', d: 'Betuminoso ou concreto, limpo e seco.' },
    { t: 'Diluição', d: 'Diluente ANL 117, até 5% em volume.' },
    { t: 'Aplicação', d: 'Película de 0,4 mm (45 m² por 18 L) ou de 0,6 mm (30 m² por 18 L).' },
    { t: 'Microesferas', d: 'Tipo 1B pré-misturada (200 a 250 g/L) e tipos 2A e 2C aspergidas (300 a 400 g/m²).' },
    { t: 'Tráfego liberado', d: 'Cerca de 30 minutos com 0,6 mm úmidos, a 25 °C e 50% de umidade.' },
  ],
  // nosso: ordem de uso dos produtos da linha imobiliária, com os dados das fichas
  etapasImob: [
    { t: 'Nivelar', d: 'Massa niveladora em camadas finas, com desempenadeira e espátula de aço.', p: 'massa' },
    { t: 'Selar', d: 'Seladora acrílica corrige a absorção da parede e economiza tinta no acabamento.', p: 'seladora' },
    { t: 'Pintar ou texturizar', d: 'Látex Econômico, Standard ou Premium, textura acrílica ou grafiato.', p: 'latex' },
  ],
};

// Linha de Demarcação Viária (página /linha-viaria/ do site atual e as páginas de cada produto)
export const viaria = [
  {
    slug: 'tinta-de-demarcacao', nome: 'Tinta de Demarcação', sub: 'Base de solvente', foto: 'demarcacao-solvente', fotos: [],
    texto: 'Tinta acrílica para demarcação viária em pavimentos betuminosos e de concreto, com acabamento em brilho e liberação rápida ao tráfego.',
    ficha: [
      ['Normas', 'ABNT NBR 11862, DER SP 3.09, DERSA OP 0621, DER SP 3.16, DNIT, CET SP ETSH 14, DER-G, NBR 8169 II'],
      ['Pavimentos', 'Betuminoso e concreto'],
      ['Diluição', 'ANL 117 até 5% em volume'],
      ['Rendimento', 'Película 0,4 mm: 45 m² / 18 L · Película 0,6 mm: 30 m² / 18 L'],
      ['Acabamento', 'Brilho'],
      ['Refletorização', 'Pré-misturar na tinta microesferas tipo 1B (200 a 250 g/L). Aspergir na superfície microesferas tipo 2A e 2C (300 a 400 g/m²), dupla ou simples aspersão'],
      ['Liberação ao tráfego', 'Estimada em 30 minutos, com espessura úmida de 0,6 mm, 25 °C e umidade relativa de 50%'],
    ],
  },
  {
    slug: 'tinta-de-demarcacao-base-agua', nome: 'Tinta de Demarcação', sub: 'Base de água', foto: 'demarcacao-agua', fotos: [],
    texto: 'Versão à base de água da tinta de demarcação, para pavimentos betuminosos e de concreto.',
    ficha: [
      ['Norma', 'ABNT NBR 13699'],
      ['Pavimentos', 'Betuminoso e concreto'],
      ['Diluição', 'ANL 117 até 5% em volume'],
      ['Rendimento', 'Película 0,4 mm: 45 m² / 18 L · Película 0,6 mm: 30 m² / 18 L'],
      ['Acabamento', 'Brilho'],
      ['Refletorização', 'Pré-misturar na tinta microesferas tipo 1B (200 a 250 g/L). Aspergir na superfície microesferas tipo 2A e 2C (300 a 400 g/m²), dupla ou simples aspersão'],
      ['Liberação ao tráfego', 'Estimada em 30 minutos, com espessura úmida de 0,6 mm, 25 °C e umidade relativa de 50%'],
    ],
  },
  {
    slug: 'diluente-de-demarcacao', nome: 'Diluente de Demarcação', sub: 'Base de solvente', foto: 'diluente', fotos: [],
    texto: 'Produto destinado à tinta de demarcação viária à base de resina acrílica, desenvolvido para proporcionar o melhor desempenho na aplicação e na secagem.',
    ficha: [['Uso', 'Diluição de tinta de demarcação viária à base de resina acrílica'], ['Embalagem', '18 litros']],
  },
  {
    slug: 'termoplastico', nome: 'Termoplástico', sub: 'Hot spray e extrudado', foto: 'termoplastico', fotos: [],
    texto: 'Material de alta durabilidade para sinalização horizontal, aplicado a quente por aspersão (hot spray) ou extrusão.',
    ficha: [
      ['Norma', 'ABNT NBR 13132/1994'],
      ['Temperatura de aplicação', 'Entre 180 e 200 °C'],
      ['Espessura recomendada', 'Hot spray: 1,5 mm · Extrudado: 3,0 mm'],
      ['Rendimento', 'Hot spray: 3,0 kg/m² · Extrudado: 6,0 kg/m²'],
      ['Acabamento', 'Semibrilho'],
      ['Refletorização', 'Aspergir na superfície microesferas tipo 2A e 2C (300 a 400 g/m²), dupla ou simples aspersão'],
      ['Liberação ao tráfego', 'Estimada em 2 minutos, com 1,5 mm, 25 °C e umidade relativa de 50%'],
    ],
  },
  {
    slug: 'microesfera', nome: 'Microesfera de Vidro', sub: 'Refletorização', foto: 'microesfera', fotos: [],
    texto: 'Microesferas de vidro que deixam a sinalização refletiva à noite: tipo 1B para pré-misturar na tinta e tipos 2A e 2C para aspergir na superfície.', // nosso (a página atual só diz "Teste")
    ficha: [['Tipo 1B', 'Pré-mistura na tinta, 200 a 250 g por litro'], ['Tipos 2A e 2C', 'Aspersão na superfície, 300 a 400 g/m²']],
  },
  {
    slug: 'tacha', nome: 'Tacha', sub: 'Refletiva', foto: 'tacha-cristal', fotos: [['tacha-cristal-2', 'Tacha cristal com refletivo vermelho'], ['tacha-lado', 'Tacha cristal vista de lado'], ['tacha-pino', 'Tacha com pino de fixação']],
    texto: 'Tacha refletiva em tronco prismático, com corpo âmbar ou cristal e refletivo amarelo, branco ou vermelho.',
    ficha: [
      ['Forma', 'Tronco prismático'],
      ['Cor do corpo', 'Amarelo (âmbar) ou branco (cristal)'],
      ['Cor do refletivo', 'Amarelo, branco ou vermelho'],
      ['Refletância mínima', 'Amarelo 220 mcd · Branco 400 mcd · Vermelho 90 mcd'],
      ['Dimensão aproximada', '110 x 80 x 20 mm'],
    ],
  },
  {
    slug: 'tachao', nome: 'Tachão', sub: 'Refletivo', foto: 'tachao-amarelo', fotos: [['tachao-lado', 'Tachão amarelo com dois pinos de fixação'], ['tachao-frente', 'Tachão amarelo visto de frente'], ['tachao-pino', 'Tachão amarelo com pino']],
    texto: 'Tachão refletivo em tronco prismático, com corpo âmbar ou cristal e refletivo amarelo, branco ou vermelho.',
    ficha: [
      ['Forma', 'Tronco prismático'],
      ['Cor do corpo', 'Amarelo (âmbar) ou branco (cristal)'],
      ['Cor do refletivo', 'Amarelo, branco ou vermelho'],
      ['Refletância mínima', 'Amarelo 220 mcd · Branco 400 mcd · Vermelho 90 mcd'],
      ['Dimensão aproximada', '110 x 80 x 20 mm'],
    ],
  },
];

// Linha Imobiliária (página /linha-imobiliaria/ e páginas de produto)
export const imob = [
  {
    slug: 'linha-latex', nome: 'Linha Látex', sub: 'Econômico · Standard · Premium', foto: 'trio-latex', fotos: [],
    texto: 'Três tintas látex de secagem rápida e odor suave, conforme ABNT NBR 15079, do interior econômico ao premium para áreas internas e externas.',
    variantes: [
      { nome: 'Látex Econômico', foto: 'trio-economico', classe: 'NBR 11709 tipo 4.5.1', ficha: [['Indicado', 'Interiores e locais sem atrito contra a parede'], ['Diluição', 'Pronto para uso'], ['Aplicação', 'Rolo de lã ou pincel, 2 a 3 demãos com intervalos de 4 h'], ['Rendimento', '18 L: mínimo 70 m² · 3,6 L: mínimo 14 m²'], ['Cores', 'Branco, gelo, palha e marfim']] },
      { nome: 'Látex Standard', foto: 'trio-standard', classe: 'NBR 11709 tipo 4.5.2', ficha: [['Indicado', 'Cimentados, quadras e calçadas, em superfície seca, isenta de mofo, gorduras e pedras'], ['Diluição', 'Água limpa, no máximo 15 a 20% conforme a embalagem'], ['Aplicação', 'Rolo de lã, airless ou pincel. Limpar bem o local antes'], ['Rendimento', '18 L: mínimo 90 m² · 3,6 L: mínimo 18 m²'], ['Cores', 'Sob cartela de cores']] },
      { nome: 'Látex Premium', foto: 'trio-premium', classe: 'NBR 11709 tipo 4.5.3', ficha: [['Indicado', 'Áreas internas e externas, em superfície seca, isenta de mofo, gorduras e pedras'], ['Diluição', 'Água limpa, no máximo 15 a 20% conforme a embalagem'], ['Aplicação', 'Rolo de lã, airless ou pincel. Preparar a parede com Fundo Preparador Acrílico Khroma'], ['Rendimento', '18 L: mínimo 110 m² · 3,6 L: mínimo 22 m²'], ['Cores', 'Sob cartela de cores']] },
    ],
  },
  {
    slug: 'textura-acrilica', nome: 'Textura Acrílica', sub: 'Interior e exterior', foto: 'textura', fotos: [['trio-textura', 'Baldes e barricas de Textura Acrílica Khroma']],
    texto: 'Indicada para criar desenhos decorativos em superfícies internas e externas. Revestimento acrílico com alta resistência às intempéries e característica hidro-repelente, com inúmeras possibilidades de efeitos.',
    ficha: [
      ['Classificação', 'ABNT NBR 11702 tipo 4.6.3'],
      ['Indicado', 'Interior e exterior'],
      ['Diluição', 'Pronto para uso. Se necessário, até 5% de água, misturando até completa homogeneização'],
      ['Aplicação', 'Desempenadeira, espátula de aço e rolo de pintura, conforme o acabamento'],
      ['Secagem', 'Uma demão. Toque em 2 horas, cura total em 12 horas'],
      ['Rendimento', 'Embalagem de 25 kg: até 8 m² por demão'],
      ['Cores', 'Sob cartela de cores'],
    ],
  },
  {
    slug: 'grafiato', nome: 'Grafiato', sub: 'Interior e exterior', foto: 'grafiato', fotos: [['barrica-grafiato', 'Barrica de Grafiato Khroma 25 kg'], ['trio-grafiato', 'Baldes e barricas de Grafiato Khroma']],
    texto: 'Revestimento rústico que, após a aplicação, apresenta aspecto de ranhuras. Ótima resistência às intempéries e ação hidro-repelente, com excelente durabilidade e aderência, evitando a umidade.',
    ficha: [
      ['Classificação', 'ABNT NBR 11702 tipo 4.6.3'],
      ['Indicado', 'Interior e exterior'],
      ['Diluição', 'Pronto para uso. Se necessário, até 5% de água, misturando até completa homogeneização'],
      ['Aplicação', 'Desempenadeira, espátula de aço e rolo de pintura, conforme o acabamento'],
      ['Secagem', 'Uma demão. Toque em 2 horas, cura total em 12 horas'],
      ['Rendimento', 'Embalagem de 25 kg: até 8 m² por demão'],
      ['Cores', 'Sob cartela de cores'],
    ],
  },
  {
    slug: 'seladora-acrilica', nome: 'Seladora Acrílica', sub: 'Preparação', foto: 'seladora', fotos: [['trio-seladora', 'Baldes e barricas de Selador Acrílico Khroma']],
    texto: 'Desenvolvida para corrigir a absorção da parede e fixar resíduos despercebidos na preparação para pintura. Economiza tinta no acabamento final.',
    ficha: [
      ['Indicado', 'Paredes internas e externas, para economia de tinta no acabamento'],
      ['Diluição', 'Pronto para uso'],
      ['Aplicação', 'Rolo de espuma ou pincel'],
      ['Rendimento', 'Galão 3,6 L: até 20 m² · Balde 18 L: até 100 m², conforme a superfície'],
    ],
  },
  {
    slug: 'massa-niveladora', nome: 'Massa Niveladora', sub: 'Acrílica e PVA', foto: 'massa', fotos: [['trio-massa', 'Baldes e barricas de Massa Niveladora Khroma']],
    texto: 'Para nivelar e corrigir a superfície antes da pintura, aplicada em camadas finas.',
    ficha: [
      ['Classificação', 'ABNT NBR 11702:2019 tipo 4.7.1'],
      ['Indicado', 'Acrílica para áreas externas · PVA para áreas internas'],
      ['Diluição', 'Pronto para uso'],
      ['Aplicação', 'Camadas finas com desempenadeira e espátula de aço até o nivelamento desejado'],
      ['Rendimento', 'Embalagem de 25 kg: 40 a 55 m² por aplicação'],
    ],
  },
];

// Galeria de fotos do site atual
export const galeria = [
  ['obra-faixa', 'Faixa de pedestres elevada pintada em vermelho e branco'],
  ['obra-ciclofaixa', 'Ciclofaixa em vermelho em avenida de acesso'],
  ['obra-lombada', 'Faixa de pedestres em vermelho e branco com cones'],
  ['fabrica-latas', 'Latas de tinta Khroma prontas para expedição'],
  ['fabrica-galpao', 'Galpão da fábrica com produtos em estoque'],
  ['fabrica-laboratorio', 'Laboratório da Khroma'],
  ['fabrica-fachada', 'Fachada da fábrica em Bom Jesus dos Perdões'],
  ['fabrica-porta', 'Entrada da fábrica'],
];

// Os mais buscados (mesma seleção da home atual)
export const maisBuscados = ['textura-acrilica', 'tachao', 'tinta-de-demarcacao', 'tacha', 'grafiato'];
