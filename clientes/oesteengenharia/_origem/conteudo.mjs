// Conteúdo do site atual (oeste-eng.com.br, copiado em 21/10/2026). Textos da empresa, áreas, realizações e clientes
// são os do site; o que foi escrito por nós está marcado com "nosso".
export const empresa = {
  nome: 'Oeste Engenharia',
  razao: 'OESTE – Organização, Estradas, Topografia e Engenharia Ltda',
  assinatura: 'Organização, Estradas, Topografia e Engenharia',
  fundacao: 1979,
  slogan: 'A escolha certa faz toda a diferença.',
  url: 'https://oesteengenharia.overtus.com.br/',
  antigo: 'http://www.oeste-eng.com.br/',
  email: 'oeste@oeste-eng.com.br',
  fone: { t: '(71) 3345-6166', h: '+557133456166' },
  celular: { t: '(71) 9 9966-2572', h: '+5571999662572' },
  endereco: ['Rua Rubem Berta, nº 447', 'Pituba, Salvador – BA', 'CEP 41.810-045'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Rubem+Berta+447+Pituba+Salvador+BA',
  // coordenada aproximada da Pituba (nosso, só para os rótulos de levantamento da versão B)
  coord: '12°59′S · 38°27′W',
};

export const sobre = [
  'A OESTE ENGENHARIA, fundada no ano de 1979, em Salvador, Bahia, é uma empresa de consultoria que atua na área de Topografia, Engenharia e Arquitetura.',
  'Há mais de 35 anos executando serviços de grande expressão para empreendimentos públicos e privados, a OESTE ENGENHARIA preza pela boa qualidade, prazos e custos, como elementos importantes na competitividade empresarial.',
  'Com este conceito, contamos com um grupo de profissionais que além de especializados, são altamente qualificados a oferecer todo o tipo de apoio em suas áreas específicas.',
  'Desde sua criação, formamos equipes com a capacidade de manter o compromisso com a nossa política, satisfazendo todas as necessidades de nossos clientes internos e externos, buscando aprimorar os serviços a cada projeto, bem como gerenciando e fiscalizando obras com a responsabilidade de uma coordenação geral extremamente eficiente.',
  'Com atuação nacional e internacional, a OESTE ENGENHARIA está pronta para participar de seu empreendimento.',
];

// Pilares tirados do próprio texto da empresa (nosso: só a divisão em três).
export const pilares = [
  { t: 'Qualidade, prazo e custo', d: 'Os três elementos que a Oeste trata como parte da competitividade de cada empreendimento.' },
  { t: 'Equipe especializada', d: 'Profissionais qualificados para dar apoio em cada área específica, do campo ao projeto.' },
  { t: 'Coordenação geral', d: 'Gerenciamento e fiscalização de obras com a responsabilidade de uma coordenação eficiente.' },
];

// As seis áreas de atuação, na ordem do site atual. "resumo" é nosso; "servicos" e "projetos" são do site.
export const areas = [
  {
    slug: 'agrimensura', nome: 'Engenharia de Agrimensura', curto: 'Agrimensura',
    resumo: 'Topografia, georreferenciamento, cadastro e batimetria: a base de medição de cada obra e de cada imóvel.',
    servicos: ['Serviços Especializados de Topografia', 'Cadastro Urbano e Rural', 'Georreferenciamento', 'Batimetria', 'Acompanhamento de Obras Civis', 'Locação de Mão de Obra Especializada'],
    fotos: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    slug: 'civil', nome: 'Engenharia Civil', curto: 'Engenharia Civil',
    resumo: 'Estudos hidrológicos e projetos de geometria, terraplenagem, drenagem, pavimentação, saneamento e estruturas.',
    servicos: ['Estudos Hidrológicos'],
    projetos: ['Geometria', 'Terraplenagem', 'Drenagem', 'Pavimentação', 'Abastecimento de Água', 'Esgotamento Sanitário', 'Estrutural', 'Estabilização de Encostas e Taludes'],
    fotos: [6, 1, 2, 3, 4, 5],
  },
  {
    slug: 'arquitetura', nome: 'Arquitetura, Urbanismo e Paisagismo', curto: 'Arquitetura e Urbanismo',
    resumo: 'Projetos arquitetônicos, urbanísticos e paisagísticos, planos diretores e regularização fundiária.',
    servicos: ['Estudos Sociais', 'Planos Diretores de Desenvolvimento Urbano e Ambiental', 'Plano Local e Projetos de Regularização Fundiária'],
    projetos: ['Arquitetônico', 'Urbanístico', 'Paisagístico', 'Sinalização e Comunicação Visual'],
    fotos: [1, 2, 3, 4, 5, 6],
  },
  {
    slug: 'meio-ambiente', foto: 'ambiente', nome: 'Meio Ambiente', curto: 'Meio Ambiente',
    resumo: 'Análise, diagnóstico e avaliação de impacto ambiental, projeto básico e licenciamento.',
    servicos: ['Análise Ambiental', 'Diagnóstico Ambiental', 'Estudo e Avaliação de Impacto Ambiental', 'Projeto Básico', 'Licenciamento Ambiental'],
    fotos: [1, 2],
  },
  {
    slug: 'obras', nome: 'Gerenciamento, Fiscalização e Supervisão de Obras', curto: 'Gerenciamento de Obras',
    resumo: 'Gerenciamento, fiscalização, supervisão e assessoramento técnico e administrativo de obras públicas e privadas.',
    servicos: ['Gerenciamento', 'Fiscalização', 'Supervisão', 'Assessoramento Técnico e Administrativo'],
    fotos: [1, 2, 3],
  },
  {
    slug: 'avaliacao', nome: 'Avaliação e Perícia', curto: 'Avaliação e Perícia',
    resumo: 'Avaliação e perícia de imóveis urbanos, rurais e industriais, máquinas, equipamentos e complexos industriais.',
    servicos: ['Avaliação e Perícia de Imóveis Urbanos, Rurais e Industriais', 'Avaliação Econômica Financeira', 'Avaliação de Máquinas, Equipamentos e Complexos Industriais', 'Assessoria Pericial'],
    fotos: [1, 2, 3],
  },
];
for (const a of areas) a.imgs = a.fotos.map(n => `/assets/img/${a.foto || a.slug}-${n}.jpg`);

// Realizações (página "Algumas Realizações"). "local" separado do texto por nós para a tabela da versão B.
export const realizacoes = {
  agrimensura: [
    ['Serviços Especializados de Topografia Georreferenciados na Avenida Luis Viana Filho (Av. Paralela)', 'Salvador – BA'],
    ['Serviços Especializados de Topografia Georreferenciados em diversas áreas dos municípios', 'Camaçari e Simões Filho – BA'],
    ['Serviços Especializados de Topografia Georreferenciados na Orla Marítima', 'Salvador – BA'],
    ['Medições e Demarcações de Imóveis Rurais georreferenciados para fins de Regularização Fundiária', 'Bahia e outros estados'],
    ['Batimetria no Terminal Marítimo de São Joaquim', 'Salvador – BA'],
    ['Batimetria no Parque Metropolitano de Pituaçu', 'Salvador – BA'],
    ['Batimetria no Rio Paraguaçu', 'São Félix e Cachoeira – BA'],
  ],
  civil: [
    ['Projeto Executivo de Geometria, Terraplenagem, Drenagem e Pavimentação do Sistema Viário e Estacionamentos do Condomínio Residencial Noblesse Residence', 'Luanda – Angola'],
    ['Projeto Executivo de Geometria, Terraplenagem, Drenagem e Pavimentação do Sistema Viário e Estacionamentos do Condomínio Residencial Vila dos Corais, Reserva do Paiva', 'Cabo de Santo Agostinho – PE'],
    ['Projeto Executivo de Geometria, Terraplenagem, Drenagem e Pavimentação da Interseção da BR 101, Km 174 / Acesso ao Centro de Distribuição de Produtos de Cosméticos', 'São Gonçalo dos Campos – BA'],
    ['Projeto Executivo de Geometria, Terraplenagem, Drenagem e Pavimentação do Acesso à Fábrica de Cerveja', 'Alagoinhas – BA'],
    ['Projeto Executivo de Geometria, Terraplenagem, Drenagem e Pavimentação para Requalificação Viária das Ruas Celika Nogueira, 20 de Setembro, Glória, General Figueiredo, João Batista, São José, Palmeiras, Nova Brasília, Ladeira do Ipiranga e Travessa Vila Romana e Implantação de Via em Cajazeiras', 'Salvador – BA'],
    ['Projeto Executivo de Geometria, Terraplenagem, Drenagem e Pavimentação da Via de Ligação da Avenida Luis Eduardo Magalhães / Estrada do Curralinho', 'Salvador – BA'],
  ],
  arquitetura: [
    ['Elaboração do Plano Geral e Projetos de Urbanização, Arquitetura, Paisagismo, Infraestrutura, Estudos de Meio Ambiente e demais Projetos Complementares para Recuperação Ambiental e Equipamentos de Lazer do Dique do Tororó e seu entorno', 'Salvador – BA'],
    ['Projeto Executivo de Arquitetura no Dique do Tororó', 'Salvador – BA'],
    ['Elaboração de Plano Local e Projetos de Regularização Fundiária em Comunidades de Baixa Renda', 'Salvador e Região Metropolitana – BA'],
    ['Plano Diretor de Desenvolvimento Urbano e Ambiental – PDDUA do município de Porto Seguro', 'Porto Seguro – BA'],
    ['Plano Diretor de Desenvolvimento Urbano e Ambiental – PDDUA no município de Jequié', 'Jequié – BA'],
    ['Plano Diretor de Desenvolvimento Urbano e Ambiental – PDDUA no município de Madre de Deus', 'Madre de Deus – BA'],
  ],
  'meio-ambiente': [
    ['Projeto de Requalificação Ambiental na Reserva Imbassaí', 'Mata de São João – BA'],
    ['Projeto de Requalificação Ambiental do Dique do Tororó e seu entorno', 'Salvador – BA'],
  ],
  obras: [
    ['Fiscalização das Obras de implantação do Aterro Sanitário de Salvador', 'Salvador – BA'],
    ['Fiscalização das Obras de Ampliação do Corredor Central', 'Feira de Santana – BA'],
    ['Fiscalização das Obras de implantação do Aterro Sanitário do município de Jequié', 'Jequié – BA'],
  ],
  avaliacao: [
    ['Avaliação de Imóveis tombados do Patrimônio Histórico, no Centro Histórico', 'Salvador – BA'],
    ['Avaliação de Imóveis Residenciais e Comerciais em Salvador e no Estado da Bahia', 'Bahia'],
    ['Avaliação de Imóveis Agro-Industriais no Estado da Bahia', 'Bahia'],
  ],
};

// Destaques da home (nosso: escolha de quatro realizações com foto do próprio site).
export const destaques = [
  { area: 'arquitetura', i: 0, img: '/assets/img/arquitetura-1.jpg', titulo: 'Dique do Tororó', local: 'Salvador – BA' },
  { area: 'civil', i: 0, img: '/assets/img/civil-2.jpg', titulo: 'Noblesse Residence', local: 'Luanda – Angola' },
  { area: 'agrimensura', i: 6, img: '/assets/img/agrimensura-7.jpg', titulo: 'Batimetria no Rio Paraguaçu', local: 'São Félix e Cachoeira – BA' },
  { area: 'obras', i: 0, img: '/assets/img/obras-1.jpg', titulo: 'Aterro Sanitário de Salvador', local: 'Salvador – BA' },
];

// Etapas de um empreendimento cobertas pelas áreas da Oeste (nosso: a ordem e os textos curtos; os serviços são do site).
export const etapas = [
  { t: 'Levantamento', d: 'Topografia, cadastro, georreferenciamento e batimetria do terreno ou do corpo d’água.', area: 'agrimensura' },
  { t: 'Estudos', d: 'Estudos hidrológicos, sociais e diagnóstico ambiental do lugar.', area: 'meio-ambiente' },
  { t: 'Projeto', d: 'Geometria, terraplenagem, drenagem, pavimentação, saneamento, arquitetura e paisagismo.', area: 'civil' },
  { t: 'Licenciamento', d: 'Avaliação de impacto ambiental, projeto básico e licenciamento.', area: 'meio-ambiente' },
  { t: 'Obra', d: 'Gerenciamento, fiscalização e supervisão, com acompanhamento topográfico.', area: 'obras' },
  { t: 'Avaliação', d: 'Avaliação e perícia de imóveis, máquinas e complexos industriais.', area: 'avaliacao' },
];

// Clientes (página "Clientes – Principais Parceiros"). A separação público/privado é nossa.
export const clientes = {
  publico: [
    ['Banco do Nordeste do Brasil'], ['Caixa Econômica Federal'], ['CDA', 'Coordenação de Desenvolvimento Agrário'],
    ['CHESF', 'Companhia Hidroelétrica do São Francisco'], ['CONDER', 'Companhia de Desenvolvimento Urbano do Estado da Bahia'],
    ['DESAL', 'Companhia de Desenvolvimento Urbano de Salvador'], ['DESENBAHIA', 'Agência de Fomento do Estado da Bahia S/A'],
    ['EMBASA', 'Empresa Baiana de Água e Saneamento'], ['FMLF', 'Fundação Mário Leal Ferreira'],
    ['INCRA', 'Instituto Nacional de Colonização e Reforma Agrária'], ['IPAC', 'Instituto do Patrimônio Artístico e Cultural'],
    ['PETROBRAS', 'Petróleo Brasileiro S.A.'], ['Prefeitura Municipal de Camaçari – BA'], ['Prefeitura Municipal de Feira de Santana – BA'],
    ['SAEB', 'Secretaria de Administração do Estado da Bahia'], ['SEC', 'Secretaria de Educação do Estado da Bahia'],
    ['SECULT', 'Secretaria de Educação e Cultura do Estado da Bahia'], ['SETUR', 'Secretaria de Turismo do Estado da Bahia'],
    ['SMED', 'Secretaria Municipal de Educação e Cultura'], ['SINDEC', 'Secretaria de Infraestrutura, Habitação e Defesa Civil'],
    ['SUCOP', 'Superintendência de Conservação e Obras Públicas'], ['SUDIC', 'Superintendência de Desenvolvimento Industrial e Comercial'],
  ],
  privado: [
    ['Alstom Brasil'], ['Assaí Atacadista'], ['ATP Engenharia'], ['BDG Construtora'], ['CONCREMAT', 'Soluções Integradas de Engenharia'],
    ['Construtora A. Gaspar'], ['Construtora Andrade Gutierrez'], ['Construtora Norberto Odebrecht'], ['ETOILE Engenharia'],
    ['Escola Pan Americana da Bahia'], ['FIEB', 'Federação das Indústrias do Estado da Bahia'], ['Gafisa S.A.'], ['G Barbosa Cencosud'],
    ['Grupo Boticário'], ['Grupo Petrópolis'], ['Grupo Planos'], ['Igreja Universal do Reino de Deus'], ['J. Macêdo', 'Alimentos do Nordeste'],
    ['LABCHECAP', 'Núcleo de Tecnologia Laboratorial'], ['Kimberly Clark Brasil'], ['Liga Engenharia'], ['OAS Empreendimentos'],
    ['PDG Construtora'], ['Pelzer da Bahia'], ['SINART', 'Sociedade Nacional de Apoio Rodoviário e Turístico'], ['Tenda Construtora S.A.'],
    ['TTC', 'Engenharia de Tráfego'],
  ],
};

export const totalRealizacoes = Object.values(realizacoes).reduce((s, l) => s + l.length, 0);
export const totalClientes = clientes.publico.length + clientes.privado.length;
export const anos = new Date().getFullYear() - empresa.fundacao;
