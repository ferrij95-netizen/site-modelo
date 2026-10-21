// Conteúdo do site do Grupo RTS Engenharia de Instalações. Textos da empresa copiados de rts.eng.br (21/10/2026);
// o que foi escrito por nós está marcado com "nosso" (resumos das disciplinas, títulos de seção, etapas).

export const empresa = {
  nome: 'Grupo RTS',
  completo: 'Grupo RTS Engenharia de Instalações',
  curto: 'RTS Engenharia',
  url: 'https://rtsengenharia.overtus.com.br/',
  antigo: 'http://www.rts.eng.br/',
  fundacao: 'maio de 1994',
  ano: 1994,
  cidade: 'Salvador - BA',
  endereco: 'Rua Nilson Costa, 356',
  bairro: 'Vila Laura',
  cep: '40270-130',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Nilson+Costa+356+Vila+Laura+Salvador+BA',
  mapaEmbed: 'https://www.google.com/maps?q=Rua+Nilson+Costa,+356,+Vila+Laura,+Salvador+-+BA,+40270-130&output=embed',
  fones: [
    { txt: '(71) 3233-1947', href: '+557132331947' },
    { txt: '(71) 3233-0068', href: '+557132330068' },
  ],
  celular: { txt: '(71) 99972-3342', href: '+5571999723342' },
  wa: '5571999723342',
};

export const textos = {
  // site atual, página inicial
  boasVindas: 'Com sede em Salvador no Estado da Bahia e constituída em maio de 1994, a RTS Engenharia atua em Consultorias, Projetos e Instalações.',
  objetivo: 'Nosso objetivo é trabalhar com excelência e usar toda a nossa competência, talento e força para atendê-los melhor.',
  qualidade: 'Nossos projetos são de ótima qualidade com preços competitivos.',
  // site atual, Serviços
  servicos: 'Elaboramos projetos de instalações para as áreas pública e privada, diretamente com o cliente ou através de parceiros. Utilizamos também a tecnologia BIM.',
  papel: 'Independentemente do papel que viermos a desempenhar quando nos contratam para elaborar os seus projetos, nós disponibilizamos nosso conhecimento na área para finalizar o seu projeto respeitando os prazos e de maneira eficiente.',
  sucesso: 'Participamos de vários projetos de grande sucesso na concepção e posterior construção, seja da forma direta ou indireta (associados a parceiros comerciais).',
  parceirosIntro: 'A RTS Engenharia tem o prazer de trabalhar com as seguintes empresas e as recomenda para suas necessidades em suas áreas de atuação:',
  // site atual, Quem Somos
  empenho: 'Nós nos empenhamos continuamente para atingir um sucesso sustentável na indústria de construção, renovação e melhorias em residências e empresas.',
  mercado: 'A RTS Engenharia está no mercado desde 1994 e hoje está voltada para atender as necessidades dos clientes e parceiros em projetos de instalações.',
  metodos: 'Utilizamos somente métodos e meios atualizados na execução de nossos projetos, de acordo com nosso contrato. Isso nos permite balancear a carga de trabalho e executar projetos de maneira rápida e eficiente.',
};

// As três frentes da página inicial do site atual (losangos), com o texto curto escrito por nós.
export const frentes = [
  { slug: 'projetos', nome: 'Projetos', img: 'losango-projetos', foto: 'reuniao-projeto', texto: 'Projetos de instalações para obras públicas e privadas, elaborados também em BIM.' },
  { slug: 'consultorias', nome: 'Consultorias', img: 'losango-consultoria', foto: 'mesa-esquadro', texto: 'Apoio técnico a clientes, construtoras e escritórios de arquitetura em cada disciplina.' },
  { slug: 'instalacoes', nome: 'Instalações', img: 'losango-solar', foto: 'engenheiros-obra', texto: 'Acompanhamento da obra para que o que foi projetado seja o que é instalado.' },
];

// Disciplinas listadas em "Quem Somos" no site atual. Resumos, itens e normas escritos por nós (nosso).
export const disciplinas = [
  {
    slug: 'eletricas', nome: 'Elétricas', sigla: 'EL', foto: 'eletrica',
    resumo: 'Instalações elétricas de baixa tensão, da entrada de energia até cada ponto de iluminação e tomada.',
    itens: ['Entrada de energia e medição', 'Quadros de distribuição e diagramas unifilares', 'Circuitos de iluminação, tomadas e força', 'Dimensionamento de condutores e proteções', 'Projeto luminotécnico'],
    normas: ['ABNT NBR 5410', 'Padrões da concessionária (Neoenergia Coelba)'],
  },
  {
    slug: 'energia-solar', nome: 'Energia Solar', sigla: 'FV', foto: 'losango-solar',
    resumo: 'Sistemas fotovoltaicos conectados à rede, do estudo de consumo à documentação para a concessionária.',
    itens: ['Estudo do consumo e da área disponível', 'Dimensionamento de módulos e inversores', 'Diagrama unifilar e memorial descritivo', 'Documentação de acesso junto à concessionária'],
    normas: ['Lei 14.300/2022', 'REN ANEEL 1.000/2021'],
  },
  {
    slug: 'hidraulicas', nome: 'Hidráulicas', sigla: 'HI',
    resumo: 'Água fria e quente, esgoto e águas pluviais, com o traçado compatível com a arquitetura e a estrutura.',
    itens: ['Água fria e água quente', 'Reservatórios e sistemas de recalque', 'Esgoto sanitário e ventilação', 'Drenagem de águas pluviais'],
    normas: ['ABNT NBR 5626', 'ABNT NBR 8160', 'ABNT NBR 10844'],
  },
  {
    slug: 'incendio', nome: 'Incêndio', sigla: 'IN',
    resumo: 'Prevenção e combate a incêndio, com o projeto preparado para a aprovação no Corpo de Bombeiros.',
    itens: ['Hidrantes e mangotinhos', 'Extintores', 'Sinalização e iluminação de emergência', 'Detecção e alarme', 'Saídas de emergência'],
    normas: ['Instruções técnicas do CBMBA', 'ABNT NBR 13714', 'ABNT NBR 17240'],
  },
  {
    slug: 'glp', nome: 'GLP', sigla: 'GLP',
    resumo: 'Redes de gás liquefeito de petróleo para residências, condomínios e comércio, da central ao ponto de consumo.',
    itens: ['Central de GLP', 'Rede de distribuição e prumadas', 'Medição individual', 'Ventilação dos ambientes'],
    normas: ['ABNT NBR 13523', 'ABNT NBR 15526'],
  },
  {
    slug: 'telefonia', nome: 'Telefonia', sigla: 'TE',
    resumo: 'Infraestrutura de telefonia: entrada, distribuição e tubulações até os pontos de voz.',
    itens: ['Entrada e distribuidor geral', 'Tubulações e caixas de passagem', 'Pontos de voz por ambiente', 'Prumadas em edifícios'],
    normas: ['ABNT NBR 16415'],
  },
  {
    slug: 'logica', nome: 'Lógica', sigla: 'LO', foto: 'cabeamento', extra: 'Cabeamento estruturado',
    resumo: 'Cabeamento estruturado para redes de dados, com caminhos, racks e pontos organizados.',
    itens: ['Pontos de rede por ambiente', 'Racks, patch panels e organização', 'Caminhos e espaços de cabeamento', 'Integração com voz, CFTV e Wi-Fi'],
    normas: ['ABNT NBR 14565', 'ABNT NBR 16415'],
  },
  {
    slug: 'spda', nome: 'SPDA', sigla: 'SPDA', extra: 'Proteção contra descargas atmosféricas',
    resumo: 'Sistema de proteção contra descargas atmosféricas, com análise de risco, captação, descidas e aterramento.',
    itens: ['Análise de risco', 'Captores e subsistema de descida', 'Aterramento', 'Equipotencialização'],
    normas: ['ABNT NBR 5419'],
  },
];

// Página Serviços do site atual
export const parceiros = [
  'L. Marquezzo Construções e Empreendimentos', 'Globo Engenharia', 'GBM Arquitetura', 'Futura Arquitetura', 'CS Construções',
  'Metro Engenharia', 'Nossa Casa Engenharia', 'M100 Arquitetura', 'UCSAL - Universidade Católica do Salvador',
];

// Etapas de um projeto (nosso, a partir de "Consultorias, Projetos e Instalações" e da tecnologia BIM)
export const etapas = [
  { n: '01', titulo: 'Consultoria', texto: 'Entendemos a obra, a arquitetura e o que o cliente precisa de cada instalação.' },
  { n: '02', titulo: 'Projeto', texto: 'Desenvolvemos as disciplinas em conjunto, também em BIM, compatibilizadas com arquitetura e estrutura.' },
  { n: '03', titulo: 'Aprovação', texto: 'Preparamos a documentação para concessionárias e Corpo de Bombeiros quando a disciplina exige.' },
  { n: '04', titulo: 'Instalação', texto: 'Acompanhamos a execução para que o que foi projetado seja o que é instalado, no prazo combinado.' },
];
