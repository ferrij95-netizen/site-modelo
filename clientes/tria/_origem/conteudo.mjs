// Conteúdo do site da Tria Sistemas de Arquitetura, tirado de www.tria.com.br (Quem Somos, Projetos e as 22 fichas de projeto)
// e da página da empresa no Facebook (cidade e frase de apresentação). Acentos corrigidos (o site atual mostra "CÃºpula").
export const empresa = {
  nome: 'Tria',
  nomeLongo: 'Tria Sistemas de Arquitetura',
  url: 'https://tria.overtus.com.br/',
  antigo: 'https://www.tria.com.br/',
  email: 'info@tria.com.br',
  cidade: 'Porto Alegre, RS',
  fundacao: 1993,
  instagram: 'https://www.instagram.com/triasistemasdearquitetura/',
  facebook: 'https://www.facebook.com/profile.php?id=100048890446192',
  frase: ['modular', 'solar', 'sustentabilidade'],
  quemSomos: 'A Tria Sistemas de Arquitetura, fundada em 1993, é uma empresa de soluções em sistemas de arquitetura modular, estandes, energia solar e sustentabilidade na construção.',
  facebookFrase: 'Soluções rápidas, eficazes e criativas na área da arquitetura corporativa.',
  associacoes: [
    { sigla: 'AHK POA', nome: 'Câmara de Comércio e Indústria Brasil-Alemanha do RS' },
    { sigla: 'AsBEA RS', nome: 'Associação Brasileira dos Escritórios de Arquitetura' },
    { sigla: 'IUA', nome: 'Instituto Urbano Ambiental' },
    { sigla: 'BFI', nome: 'Buckminster Fuller Institute, Nova York' },
  ],
};

export const areas = [
  {
    slug: 'estandes', nome: 'Estandes e exposições', curto: 'Estandes',
    texto: 'A Tria desenvolve e executa projetos especiais de arquitetura efêmera no Brasil e no mundo desde 1993.',
    texto2: 'Utilizando o exclusivo sistema Mezzo, importado da Alemanha, unimos um excelente design a valores compatíveis com a realidade, enquanto respeitamos o meio ambiente, pois usamos um mínimo de materiais não recicláveis.',
    foto: 26,
  },
  {
    slug: 'energia-solar', nome: 'Energia solar', curto: 'Energia solar',
    texto: 'O visionário inventor Thomas Edison declarou, em 1931, pouco tempo antes de morrer, que colocaria todo o seu dinheiro em energia solar.',
    texto2: 'A Tria Sistemas de Arquitetura tem projetos implantados de geração de energia solar fotovoltaica desde 2009.',
    foto: 15,
  },
  {
    slug: 'arquitetura', nome: 'Arquitetura', curto: 'Arquitetura',
    texto: 'A arquitetura é uma paixão, uma vocação, um chamado. Ela tem sido descrita como uma arte social e uma ciência artística, que propicia ao homem saúde e bem-estar, em harmonia com o meio ambiente.',
    texto2: 'Proporciona oportunidades econômicas e a criação de um legado que reflete e simboliza a cultura e as tradições de uma determinada época.',
    foto: 17,
  },
];

// fotos: [número do arquivo em assets/img/f<n>.webp, legenda]
export const projetos = [
  {
    slug: 'solar-lounge', area: 'energia-solar', titulo: 'Solar Lounge', ano: null, local: null, destaque: true,
    resumo: 'Carregador de dispositivos móveis (celulares, câmeras e tablets) através de energia solar fotovoltaica.',
    texto: ['Carregador de dispositivos móveis, celulares, câmeras e tablets, através de energia solar fotovoltaica.'],
    fotos: [[54, 'Solar Lounge instalado ao ar livre, com o painel solar no alto da coluna'], [53, 'Detalhe da tomada USB na coluna laranja do Solar Lounge'], [44, 'Solar Lounge com os assentos verdes ao redor da coluna']],
  },
  {
    slug: 'estacionamento-colegio-anchieta', area: 'energia-solar', titulo: 'Estacionamento no Colégio Anchieta', ano: 2009, local: 'Porto Alegre, RS', destaque: true,
    resumo: 'Estacionamento pioneiro com 30 painéis fotovoltaicos de 130 Wp, gerando 4 kWp de energia limpa.',
    texto: [
      'Este pioneiro estacionamento com painéis fotovoltaicos está localizado no Colégio Anchieta, em Porto Alegre, e possui 30 painéis de 130 Wp gerando 4 kWp de energia limpa e renovável, além de uma ótima sombra para os veículos dos pais da escola.',
      'Este projeto de cunho técnico-pedagógico proporcionou vários prêmios de inovação e sustentabilidade ao Colégio Anchieta.',
      'Um mostrador digital informa a geração atual, a geração diária e a acumulada de energia.',
    ],
    numeros: [['30', 'painéis fotovoltaicos'], ['130 Wp', 'por painel'], ['4 kWp', 'de energia limpa']],
    fotos: [[15, 'Cobertura do estacionamento com painéis fotovoltaicos no Colégio Anchieta'], [2, 'Vista aérea do estacionamento solar do Colégio Anchieta'], [14, 'Mostrador digital com geração atual, diária e total de energia']],
  },
  {
    slug: 'cupula-portal-do-sol', area: 'arquitetura', titulo: 'Cúpula Portal do Sol', ano: null, local: 'São Francisco de Paula, RS', destaque: true,
    resumo: 'Estrutura geodésica executada em chapas de alumínio composto e policarbonato cristal.',
    texto: ['Estrutura geodésica executada em chapas de alumínio composto e policarbonato cristal, localizada em São Francisco de Paula, RS.'],
    fotos: [[17, 'Cúpula geodésica branca no campo em São Francisco de Paula']],
  },
  {
    slug: 'nova-sede-crea-rs', area: 'arquitetura', titulo: 'Nova sede do CREA-RS', ano: null, local: 'Porto Alegre, RS',
    resumo: 'Adequação interna dos diversos departamentos do CREA-RS, em um projeto de mais de 6 mil m².',
    texto: ['O projeto de adequação interna dos diversos departamentos do CREA-RS foi realizado pela Tria Sistemas de Arquitetura e pelo arquiteto Luiz A. Schneider, em um projeto de mais de 6 mil m².'],
    numeros: [['6 mil m²', 'de projeto interno']],
    fotos: [[16, 'Edifício da nova sede do CREA-RS']],
  },
  {
    slug: 'fabrica-de-cervejas', area: 'arquitetura', titulo: 'Fábrica de cervejas', ano: null, local: null,
    resumo: 'Fábrica de cervejas artesanais com estrutura em madeira laminada, visando neutralizar as emissões de carbono na construção.',
    texto: ['Projeto de fábrica de cervejas artesanais com estrutura em madeira laminada, visando a neutralização das emissões de carbono na construção.'],
    fotos: [[18, 'Fachada da fábrica de cervejas com cobertura em madeira laminada'], [19, 'Vista lateral da fábrica de cervejas em madeira laminada']],
  },
  {
    slug: 'loja-conceito-sebrae-rs', area: 'estandes', titulo: 'Loja-Conceito SEBRAE-RS', ano: 2012, local: 'FIERGS, Porto Alegre, RS',
    resumo: 'Loja-Conceito do SEBRAE-RS na Feira do Empreendedor.',
    texto: ['Loja-Conceito SEBRAE-RS. Feira do Empreendedor, FIERGS, Porto Alegre, RS, 2012.'],
    fotos: [[37, 'Vitrine da Loja-Conceito SEBRAE-RS'], [36, 'Interior da Loja-Conceito SEBRAE-RS visto do alto']],
  },
  {
    slug: 'estande-grupo-tpi', area: 'estandes', titulo: 'Estandes do Grupo TPI', ano: 2011, local: 'BRASVIAS',
    resumo: 'Estandes executados no evento BRASVIAS em Florianópolis (2009) e Foz do Iguaçu (2011).',
    texto: ['Estande executado no evento BRASVIAS, Foz do Iguaçu, PR, em 2011.', 'Estande executado no evento BRASVIAS, Florianópolis, SC, em 2009.'],
    fotos: [[28, 'Estande do Grupo TPI na BRASVIAS, Foz do Iguaçu, 2011'], [27, 'Área de atendimento do estande do Grupo TPI, 2011'], [26, 'Estande do Grupo TPI na BRASVIAS, Florianópolis, 2009']],
  },
  {
    slug: 'alemanha-expointer-2013', area: 'estandes', titulo: 'Alemanha na Expointer 2013', ano: 2013, local: 'Esteio, RS', destaque: true,
    resumo: 'Estande da Alemanha na maior feira de animais, máquinas e implementos agrícolas da América Latina.',
    texto: ['A Expointer é uma feira agropecuária de destaque nacional e internacional, realizada no Parque de Exposições Assis Brasil, na cidade de Esteio, no Rio Grande do Sul. É a maior feira de exposição de animais, máquinas e implementos agrícolas da América Latina.'],
    fotos: [[46, 'Estande "made in Germany" da Alemanha na Expointer 2013']],
  },
  {
    slug: 'premio-destaque-inovacao-sergs-2013', area: 'estandes', titulo: 'Prêmio Destaque Inovação em Engenharia, SERGS', ano: 2013, local: 'Teatro CIEE, Porto Alegre',
    resumo: 'Palco e estruturas de apoio para o prêmio da Sociedade de Engenharia do Rio Grande do Sul.',
    texto: ['Palco e estruturas de apoio. O objetivo do prêmio oferecido pela Sociedade de Engenharia do Rio Grande do Sul é incentivar a inovação e a sustentabilidade no setor de engenharia. O Prêmio Destaque Inovação em Engenharia foi entregue no dia 15 de outubro, no Teatro CIEE.'],
    fotos: [[49, 'Palco do Prêmio Destaque Inovação em Engenharia com painel iluminado e sofás']],
  },
  {
    slug: 'feira-do-livro-2005', area: 'estandes', titulo: 'Feira do Livro', ano: 2005, local: 'Porto Alegre, RS',
    resumo: 'Pavilhão de autógrafos em forma de cúpula geodésica.',
    texto: ['Pavilhão de autógrafos em forma de cúpula geodésica na Feira do Livro, Porto Alegre, RS.'],
    fotos: [[29, 'Pavilhão geodésico de autógrafos na Feira do Livro de Porto Alegre']],
  },
  {
    slug: 'estande-ahk-expohannover-2000', area: 'estandes', titulo: 'Estande AHK na ExpoHannover', ano: 2000, local: 'Hannover, Alemanha',
    resumo: 'Estande com mezanino e torre com o relógio do designer Hans Donner.',
    texto: ['Expositor para promoção da participação da AHK (Câmara de Comércio e Indústria Brasil-Alemanha) na ExpoHannover, no ano 2000.', 'Estande com mezanino e torre com o relógio "Time Dimension", do designer Hans Donner.'],
    fotos: [[24, 'Torre central do estande da AHK na ExpoHannover 2000'], [25, 'Painéis expositores em arco no estande da AHK']],
  },
  {
    slug: 'estande-banco-do-brasil', area: 'estandes', titulo: 'Estandes Banco do Brasil', ano: null, local: 'Expointer, Esteio, RS',
    resumo: 'Estandes executados na Expointer, em Esteio.',
    texto: ['Estandes executados na Expointer, Esteio, RS.'],
    fotos: [[23, 'Estande amarelo do Banco do Brasil na Expointer'], [22, 'Entrada do estande do Banco do Brasil com portal amarelo']],
  },
  {
    slug: 'estande-compugraf-1996', area: 'estandes', titulo: 'Estande Compugraf', ano: 1996, local: 'FENASOFT, Anhembi, SP',
    resumo: 'Estande executado na FENASOFT, no Anhembi.',
    texto: ['Estande executado na FENASOFT, Anhembi, SP.'],
    fotos: [[21, 'Estande da Compugraf na FENASOFT, em alumínio']],
  },
  {
    slug: 'estande-enxuta-festa-da-uva-1993', area: 'estandes', titulo: 'Estande Enxuta, Festa da Uva', ano: 1993, local: 'Caxias do Sul, RS',
    resumo: 'Pioneiro no uso de chapas de alumínio escovado como revestimento em estandes.',
    texto: ['Este projeto foi pioneiro no uso de chapas de alumínio escovado como revestimento em estandes. Caxias do Sul, RS, 1993.'],
    fotos: [[20, 'Estande da Enxuta na Festa da Uva, revestido em alumínio escovado']],
  },
  {
    slug: 'sistema-mezzo', area: 'estandes', titulo: 'Sistema Mezzo', ano: 1996, local: 'Brasil e exterior',
    resumo: 'Desde 1996 a Tria faz parte da rede mundial mezzo systems, com perfis de alumínio alemães de alto acabamento.',
    texto: [
      'Desde 1996, a Tria faz parte da rede mundial mezzo systems, utilizando perfis de alumínio de alto acabamento para feiras e arquitetura corporativa fabricados por esta empresa alemã.',
      'O sistema mezzo está entre as melhores tecnologias do mercado de sistemas modulares de alto acabamento.',
      'Nossos parceiros colocam-se à disposição com o mesmo comprometimento com a qualidade para executar nossos projetos em várias partes do mundo.',
    ],
    fotos: [
      [30, 'Estande em perfis Mezzo com balcão curvo'],
      [34, 'Estande Klöckner-Pentaplast, FIMMA, Bento Gonçalves, RS'],
      [33, 'Exposição em estação de trens na Bélgica, Publi-rent'],
      [32, 'Exposição Vôlei de Praia Banco do Brasil, Praia de Belas Shopping, Porto Alegre'],
      [35, 'Pavilhão da Dinamarca, ExpoZaragoza, Espanha'],
      [31, 'Exposição 18 anos AsBEA RS, Shopping Iguatemi, Porto Alegre'],
    ],
  },
];

// Linha do tempo só com datas que estão no site atual.
export const linhaTempo = [
  { ano: 1993, titulo: 'Fundação e Enxuta na Festa da Uva', texto: 'Pioneiro no uso de alumínio escovado como revestimento de estande.', foto: 20, slug: 'estande-enxuta-festa-da-uva-1993' },
  { ano: 1996, titulo: 'Rede mundial mezzo systems', texto: 'Perfis de alumínio alemães de alto acabamento. Compugraf na FENASOFT.', foto: 30, slug: 'sistema-mezzo' },
  { ano: 2000, titulo: 'AHK na ExpoHannover', texto: 'Mezanino e torre com o relógio de Hans Donner, na Alemanha.', foto: 24, slug: 'estande-ahk-expohannover-2000' },
  { ano: 2005, titulo: 'Cúpula na Feira do Livro', texto: 'Pavilhão de autógrafos geodésico em Porto Alegre.', foto: 29, slug: 'feira-do-livro-2005' },
  { ano: 2009, titulo: 'Primeiro projeto solar', texto: 'Estacionamento fotovoltaico do Colégio Anchieta, 4 kWp.', foto: 15, slug: 'estacionamento-colegio-anchieta' },
  { ano: 2012, titulo: 'Loja-Conceito SEBRAE-RS', texto: 'Feira do Empreendedor, FIERGS.', foto: 37, slug: 'loja-conceito-sebrae-rs' },
  { ano: 2013, titulo: 'Expointer e Prêmio SERGS', texto: 'Estande da Alemanha e palco do Prêmio Destaque Inovação.', foto: 46, slug: 'alemanha-expointer-2013' },
];

export const areaDe = slug => areas.find(a => a.slug === slug);
