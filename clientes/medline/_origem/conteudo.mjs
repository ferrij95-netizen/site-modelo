// Conteúdo do site, copiado de www.medline.com.br (empresa.asp, segmento.asp, contato.asp, localizacao.asp e as páginas de cada marca).
// O que foi escrito por nós está marcado com "// nosso".

export const empresa = {
  nome: 'Medline',
  razao: 'Medline Produtos Médicos e Hospitalares Ltda.',
  url: 'https://medline.overtus.com.br/',
  antigo: 'http://www.medline.com.br/',
  fone: '(11) 5666-4838',
  foneHref: '+551156664838',
  email: 'medline@medline.com.br',
  endereco: ['Rua Leonor Alvim, 48 · Jardim Leblon', '04802-190 · São Paulo · SP'],
  enderecoLinha: 'Rua Leonor Alvim, 48, Jardim Leblon, São Paulo, SP, 04802-190',
  lat: -23.706231, lng: -46.704104,
  instagram: 'https://instagram.com/medlinedermato',
  youtube: 'https://www.youtube.com/channel/UC6ynTg3kZ8C6xeMLRhqhcFg',
  facebook: 'https://www.facebook.com/pages/Medline/1437061399854845',
};

export const intro = [
  'A Medline busca o que há de mais moderno no mercado de produtos médicos, hospitalares, dermatológicos e de cosmiatria.',
  'Hoje representamos grandes marcas referência nesses setores. Todos os produtos distribuídos possuem certificado de qualidade, são registrados e regulamentados pela ANVISA.',
  'Dispomos de uma equipe treinada e especializada no suporte técnico necessário à utilização dos nossos produtos e mantemos um canal direto com nossos clientes para ouvir suas sugestões.',
  'Oferecer ao mercado brasileiro novas tecnologias e equipamentos de última geração é nosso compromisso.',
];

export const mvv = [
  { nome: 'Missão', texto: 'Fornecer sempre a melhor tecnologia em produtos e serviços na área da saúde.' },
  { nome: 'Visão', texto: 'Contribuir com o cuidado médico e hospitalar do maior número possível de vidas.' },
  { nome: 'Valores', texto: 'Comprometimento com a ética e transparência nas ações.' },
];

// Os três compromissos do texto institucional, em forma de etapas. // nosso (títulos curtos)
export const compromissos = [
  { n: '01', nome: 'Marcas referência', texto: 'Representamos fabricantes líderes, no Brasil e no exterior, em cirurgia, dermatologia e outras tecnologias.' },
  { n: '02', nome: 'Registro na ANVISA', texto: 'Todos os produtos distribuídos possuem certificado de qualidade, são registrados e regulamentados pela ANVISA.' },
  { n: '03', nome: 'Suporte técnico', texto: 'Equipe treinada e especializada no suporte necessário à utilização de cada produto.' },
  { n: '04', nome: 'Canal direto', texto: 'Um contato direto com médicos, hospitais e clínicas para ouvir sugestões e responder rápido.' },
];

export const fotosEmpresa = [
  { src: 'sede-lateral.webp', w: 475, h: 317, alt: 'Fachada da sede da Medline em São Paulo' },
  { src: 'sede-arvore.webp', w: 475, h: 317, alt: 'Jardim e entrada da sede da Medline' },
  { src: 'sala-reuniao.webp', w: 577, h: 385, alt: 'Sala de reunião da Medline' },
  { src: 'estande-feira.webp', w: 500, h: 332, alt: 'Estande da Medline em feira do setor' },
];

export const segmentos = [
  {
    slug: 'cirurgia', nome: 'Cirurgia', curto: 'Cirurgia minimamente invasiva',
    foto: { src: 'cirurgia-laparoscopia.webp', w: 1400, h: 2520, alt: 'Cirurgião durante cirurgia por videolaparoscopia' },
    largo: { src: 'centro-cirurgico.webp', w: 1600, h: 1066, alt: 'Sala cirúrgica preparada para videolaparoscopia' },
    resumo: 'Trocartes, instrumentos de mão, clipes de polímero e manipuladores uterinos para cirurgia geral, ginecologia e urologia.', // nosso
    texto: [
      'Atuamos com a mais alta tecnologia nas áreas de Cirurgia Geral, Cirurgia do Aparelho Digestivo, Ginecologia, Cirurgia Torácica, Urologia e Transplantes. Não só dispomos dos melhores materiais e equipamentos, mas o nosso diferencial está na qualidade dos serviços que prestamos à comunidade médica e seus pacientes.',
      'Nosso parceiro é a marca TAIMIN com os trocartes, instrumentos de mão descartáveis e reprocessáveis, clipes de polímero, manipuladores uterinos, sacos de coleta de espécime e outros tantos produtos, que agregam ao dia a dia dos nossos clientes eficiência, eficácia e muita segurança.',
    ],
    areas: ['Cirurgia Geral', 'Aparelho Digestivo', 'Ginecologia', 'Cirurgia Torácica', 'Urologia', 'Transplantes'],
    marcas: ['taimin'],
  },
  {
    slug: 'dermatologia-cosmiatria', nome: 'Dermatologia & Cosmiatria', curto: 'Cosmecêuticos e tratamentos faciais',
    foto: { src: 'dermato-cuidado.webp', w: 960, h: 640, alt: 'Paciente aplicando creme no rosto' },
    largo: { src: 'dermato-serum.webp', w: 960, h: 640, alt: 'Aplicação de sérum facial com conta-gotas' },
    resumo: 'Cosmecêuticos YNS feitos nos EUA e a tecnologia HydraFacial MD para consultórios e clínicas.', // nosso
    texto: [
      'Cosmiatria, palavra composta por três radicais gregos: Kosmetos (embelezar ou preservar a beleza) + Iatros (ideia de médico, relativo à medicina) + Ia (emprego, ofício, profissão, ou ainda arte ou ciência).',
      'É, etimologicamente, a arte ou ciência médica que estuda e trata a beleza humana em todos os seus aspectos e concepções.',
    ],
    etimologia: [
      { raiz: 'Kosmetos', sig: 'embelezar ou preservar a beleza' },
      { raiz: 'Iatros', sig: 'ideia de médico, relativo à medicina' },
      { raiz: 'Ia', sig: 'emprego, ofício, profissão, ou ainda arte ou ciência' },
    ],
    marcas: ['yns', 'hydrafacial'],
  },
  {
    slug: 'outras-tecnologias', nome: 'Outras Tecnologias', curto: 'Coagulação e próteses',
    foto: { src: 'laboratorio.webp', w: 1400, h: 1050, alt: 'Laboratório hospitalar' },
    largo: { src: 'laboratorio.webp', w: 1400, h: 1050, alt: 'Laboratório hospitalar' },
    resumo: 'Tromboelastometria Rotem para UTI e transplantes, e próteses WillowWood para pacientes amputados.', // nosso
    texto: [
      'A medicina é uma das muitas áreas do conhecimento ligada à manutenção e restauração da saúde. Ela trabalha, num sentido amplo, com a prevenção e cura das doenças humanas, visando o bem-estar físico, mental, psicológico e social do indivíduo.',
      'Nossa missão é fornecer a melhor tecnologia em produtos e serviços, dessa forma nosso diferencial está no portfólio da empresa, que reúne as marcas e tecnologias líderes do mercado global.',
    ],
    areas: ['Análise da coagulação', 'Transplantes hepáticos', 'Rotinas de UTI', 'Cirurgias complexas', 'Próteses para amputados'],
    marcas: ['rotem', 'willowwood'],
  },
];

export const marcas = {
  taimin: {
    nome: 'Taimin', logo: { src: 'marca-taimin.webp', w: 700, h: 248 }, seg: 'cirurgia',
    texto: [
      'A CIENLABOR Indústria e Comércio Ltda., com sede em João Pessoa (PB) e filial na capital de São Paulo, atua no Brasil com a sua marca TAIMIN desde 1998, disponibilizando produtos e equipamentos médico-hospitalares com a competência, a responsabilidade e a dedicação que o mercado exige.',
      'A TAIMIN oferece produtos na área de cirurgia geral, urologia e ginecologia minimamente invasiva, aliando qualidade e inovação.',
    ],
    itens: ['Trocartes', 'Instrumentos de mão descartáveis', 'Instrumentos reprocessáveis', 'Clipes de polímero', 'Manipuladores uterinos', 'Sacos de coleta de espécime'],
    fato: 'No Brasil desde 1998',
  },
  yns: {
    nome: 'YNS Med Spa', logo: { src: 'marca-yns.webp', w: 276, h: 34 }, seg: 'dermatologia-cosmiatria',
    texto: ['YNS® Med Spa, Inc. vem desenvolvendo produtos para cuidados da pele por mais de 10 anos. Feitos nos EUA.'],
    fato: 'Cosmecêuticos feitos nos EUA',
  },
  hydrafacial: {
    nome: 'HydraFacial MD', logo: { src: 'marca-hydrafacial.webp', w: 296, h: 70 }, seg: 'dermatologia-cosmiatria',
    texto: ['Tecnologia HydraFacial MD para tratamentos faciais em consultórios e clínicas de dermatologia.'], // nosso (o site atual só tem o logo)
    fato: 'Tratamento facial em consultório',
  },
  rotem: {
    nome: 'Rotem', logo: { src: 'marca-rotem.webp', w: 700, h: 263 }, seg: 'outras-tecnologias',
    texto: ['O equipamento de tromboelastometria Rotem é a última tecnologia disponível no mercado mundial para análise do processo de coagulação. Sua utilização é imprescindível nos transplantes hepáticos, rotinas de UTI e outras cirurgias complexas.'],
    fato: 'Fabricante: TEM Innovations',
  },
  willowwood: {
    nome: 'WillowWood', logo: { src: 'marca-willowwood.webp', w: 196, h: 54 }, seg: 'outras-tecnologias',
    texto: [
      'A WillowWood é uma empresa dedicada a produtos protéticos de alta tecnologia.',
      'Fundada em 1907, em Ohio (EUA), por William E. Arbogast, um amputado bilateral, hoje oferece uma linha diferenciada de produtos, como liners (Alpha liners), pés protéticos, joelheiras, locks e acessórios para o conforto, mantendo-se na vanguarda da indústria de produtos que proporcionam segurança, conforto e mobilidade a seus pacientes amputados.',
    ],
    itens: ['Alpha liners', 'Pés protéticos', 'Joelheiras', 'Locks', 'Acessórios para o conforto'],
    fato: 'Desde 1907, Ohio (EUA)',
    video: 'https://www.youtube.com/watch?v=gpn6wSJCnpc',
  },
};

export const yns = [
  {
    nome: 'Infusion O2', tipo: 'Polipeptídeo · Gel', foto: { src: 'yns-infusion-o2.webp', w: 1000, h: 750 },
    beneficios: ['Suaviza olheiras e bolsas', 'Melhora a elasticidade', 'Aumenta a suavidade'],
    uso: [['Face · noite', 'Aplique Infusion O2 abaixo da área dos olhos, incluindo as pálpebras. Pode ser aplicado por toda a face e é formulado para ser absorvido lentamente.']],
    ingredientes: 'Glycerin, Aqua, Cholesteryl Oleyl Carbonate, Cholesteryl Nonanoate, Cholesteryl Chloride, Perfluorodecalin, Sodium Polyacrylate, Acetyl Hexapeptide-30, Dipeptide Diaminobutyroyl Benzylamide Diacetate, Chrysin, Palmitoyl Oligopeptide, Palmitoyl Tetrapeptide-7, N-Hydroxysuccinimide, Steareth-20, Acetyl Tetrapeptide-5, Arginine, Butylene Glycol, Caprylyl Glycol.',
  },
  {
    nome: 'Radiance', tipo: 'Complexo peptídeo · Creme', foto: { src: 'yns-radiance.webp', w: 1000, h: 750 },
    beneficios: ['Reduz as linhas e rugas', 'Melhora textura e tônus', 'Estimula a produção de colágeno'],
    uso: [['Face · dia e noite', 'Aplique Radiance abaixo da área dos olhos e, em seguida, por toda a face.'], ['Pescoço e colo', 'Aplique Radiance pela manhã e à noite.']],
    ingredientes: 'Água, Acetil Hexapeptídeo-8 (Argireline), Pentapeptídeo-18 (Leuphasyl), Palmitoil Tripeptídeo-38 (Matrixyl Synthe’6), Palmitoil Tripeptídeo-5 (SYN-COLL), Hialuronato de Sódio, PCA de Sódio, Aloe Barbadensis, Pantenol, Óleo de Simmondsia Chinensis, Manteiga de Butyrospermum Parkii, L-Hydroxyprolinate, Leite Hidrolisado, Proteína, Extrato de Fermento, Coco-Caprilato/Caprato, Triglicérides Caprílico/Cáprico, Álcool Cetearílico, Glicerina, Cetearil Glucosídeo, Extrato de Ruscus Aculeatus, Resina de Celulose, Hidroxipropil Ciclodextrina, Alantoína, Extrato de Centella Asiática, Óleo de Calendula Officinalis, Óleo de Cucumis Sativus, Acetil Tetrapeptídeo-17, Platina Coloidal, Extrato de Aesculus Hippocastanum, Frutose, Gluconolactona, Benzil PCA, Fenoxietanol, Butilenoglicol.',
  },
  {
    nome: 'YNS Cell-Tight', tipo: 'Peptídeo de retinol · Sérum', foto: { src: 'yns-cell-tight.webp', w: 800, h: 1067 },
    beneficios: ['Prolonga a vida das células', 'Reduz poros, linhas e rugas', 'Melhora firmeza, textura e tônus', 'Estimula a produção de colágeno'],
    uso: [['Face · dia', 'Aplique abaixo da área dos olhos, evitando contato direto com as pálpebras, e deixe absorver por 2 minutos.'], ['Face · noite', 'Aplique por toda a face, evitando contato direto com as pálpebras, e deixe absorver por 2 minutos.'], ['Pescoço e colo', 'Aplique duas vezes por semana, à noite.']],
    ingredientes: 'Aqua, Teprenone, Hexapeptide-10, Caprylic/Capric Triglyceride, Glycerin, Polysorbate-20, Tocopherol, Retinol, Retinyl Propionate, Caprylyl Glycol, Cellulose Gum, Lecithin, Acetyl Tetrapeptide-17, Colloidal Platinum, Butylene Glycol.',
  },
];

// Palavras da esfera do site atual (logo.swf), usadas como fio da marca.
export const palavrasEsfera = ['Tecnologia', 'Inovação', 'Confiança', 'Comprometimento', 'Parceria', 'Solução', 'Sofisticação', 'Atualização', 'Informação', 'Comunicação', 'Serviços'];

export const creditos = 'Fotos de apoio: Wikimedia Commons (Roohipour1, CC0; Dr. Jayesh Amin e Bobjgalindo, CC BY-SA) e StockSnap (CC0).';
