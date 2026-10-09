// Textos do site, tirados do site atual (vordexengenharia.com.br) e da apresentação da empresa em 2026-10-09.
// O que não estava no site e precisa de confirmação está em LEIA-ME.md.

export const site = {
  nome: 'Vordex',
  extenso: 'Vordex Soluções Industriais',
  dominio: 'https://vordex.overtus.com.br',
  fone: '(31) 99687-7284',
  zap: '5531996877284',
  email: 'comercial@vordexengenharia.com.br',
  emails: [
    ['Comercial', 'comercial@vordexengenharia.com.br'],
    ['Administrativo', 'administrativo@vordexengenharia.com.br'],
    ['Suprimentos', 'suprimentos@vordexengenharia.com.br'],
  ],
  denuncias: 'denuncias@vordexengenharia.com.br',
  curriculos: 'administrativo@vordexengenharia.com.br',
  endereco: 'Rua Francisco Ribeiro Filho, 55, Amaro Ribeiro',
  cidade: 'Conselheiro Lafaiete, MG',
  mapa: 'https://maps.google.com/maps?q=Rua%20Francisco%20Ribeiro%20Filho%2C%2055%20-%20Amaro%20Ribeiro%2C%20Conselheiro%20Lafaiete&t=m&z=15&output=embed&iwloc=near',
  rota: 'https://www.google.com/maps/search/?api=1&query=Rua+Francisco+Ribeiro+Filho+55+Amaro+Ribeiro+Conselheiro+Lafaiete+MG',
  fundacao: 2016,
  redes: [
    ['Instagram', 'https://www.instagram.com/vordex_engenharia/'],
    ['LinkedIn', 'https://www.linkedin.com/company/vordex-comercio-e-servi%C3%A7os-ltda/'],
    ['Facebook', 'https://www.facebook.com/vordexsolucoesindustriais'],
  ],
};

export const anos = 2026 - site.fundacao;

// [slug, rótulo no menu]
export const menu = [
  ['servicos', 'Serviços'],
  ['estrutura', 'Estrutura'],
  ['quem-somos', 'Quem somos'],
  ['canal-de-denuncias', 'Canal de denúncias'],
  ['trabalhe-conosco', 'Trabalhe conosco'],
  ['contato', 'Contato'],
];

// Título da aba e descrição (SEO) de cada página.
export const paginas = {
  index: ['Vordex Soluções Industriais · Fabricação, montagem, locação e terraplanagem', 'Fabricação industrial, manutenção e montagem, locação de equipamentos e terraplanagem em Conselheiro Lafaiete, MG, desde 2016. Atendimento 24 horas.'],
  servicos: ['Serviços · Vordex Soluções Industriais', 'Fabricação industrial, manutenção e montagem industrial, locação de equipamentos e terraplanagem para a indústria e a mineração.'],
  'servicos/fabricacao-industrial': ['Fabricação industrial · Vordex', 'Fabricação de tubulação e estrutura metálica, silos, tanques e cabines, do projeto à montagem, em fábrica própria em Conselheiro Lafaiete.'],
  'servicos/manutencao-e-montagem-industrial': ['Manutenção e montagem industrial · Vordex', 'Paradas programadas, ampliação e montagem de novas plantas: tubulação, equipamentos mecânicos, caldeiraria, elétrica, instrumentação e estrutura metálica.'],
  'servicos/locacao-de-equipamentos': ['Locação de equipamentos · Vordex', 'Guindastes, caminhões munck, pranchas e carretas para içamento, remoção industrial e transporte de cargas pesadas, com equipamentos rastreados.'],
  'servicos/terraplanagem': ['Terraplanagem · Vordex', 'Preparação de terrenos, movimentação de terra, nivelamento e escavação com frota própria de escavadeiras, patrols, rolos e tratores de esteira.'],
  estrutura: ['Estrutura e frota · Vordex', 'Quatro bases próprias com 3.750 m², cerca de 220 colaboradores, frota própria e atendimento 24 horas em Conselheiro Lafaiete, MG.'],
  'quem-somos': ['Quem somos · Vordex Soluções Industriais', 'Desde 2016 em Conselheiro Lafaiete, MG, com uma política de serviços focada em qualidade, transparência e segurança.'],
  'canal-de-denuncias': ['Canal de denúncias · Vordex', 'Canal para relatar, inclusive de forma anônima, violações do Código de Conduta, condutas antiéticas, assédio e riscos à segurança ou ao meio ambiente.'],
  'trabalhe-conosco': ['Trabalhe conosco · Vordex', 'Quer fazer parte da equipe Vordex? Envie o seu currículo.'],
  contato: ['Contato · Vordex Soluções Industriais', 'Fale com a Vordex: (31) 99687-7284, comercial@vordexengenharia.com.br. Rua Francisco Ribeiro Filho, 55, Amaro Ribeiro, Conselheiro Lafaiete, MG.'],
};

export const inicio = {
  titulo: 'Experiência de quem entende a sua necessidade',
  lead: 'Fabricação, manutenção e montagem industrial, locação de equipamentos e terraplanagem, com estrutura própria e equipe qualificada em Conselheiro Lafaiete, MG.',
  // Os três cartões do site atual, na mesma ordem.
  destaques: [
    ['icone-7-anos', `${anos} anos`, `Mais de ${anos} anos de atuação contribuindo com o mercado industrial.`],
    ['icone-equipamentos', 'Equipamentos', 'Investimento constante em equipamentos de ponta e na capacitação dos nossos profissionais.'],
    ['icone-estrutura', 'Estrutura', 'Sede moderna e ampla infraestrutura, localizada no polo industrial de Conselheiro Lafaiete.'],
  ],
  missao: 'Prestar serviços de qualidade que proporcionem confiabilidade, confiança e segurança aos nossos clientes.',
  chamada: ['Contribuímos com projetos de grandes empresas.', 'Agora queremos contribuir com a sua.'],
};

// Os quatro serviços, na ordem do menu do site atual.
export const servicos = [
  {
    slug: 'fabricacao-industrial', nome: 'Fabricação industrial', curto: 'Fabricação',
    circulo: 'circ-fabricacao', foto: 'fab-estrutura',
    resumo: 'Tubulação e estrutura metálica produzidas em fábrica própria, do projeto à embalagem.',
    intro: 'Produção em escala de bens e produtos com técnicas e equipamentos especializados.',
    pontos: [
      'Processo de produção em grande escala de bens e produtos, com técnicas e equipamentos especializados.',
      'Transformação de matérias-primas em produtos acabados por uma série de etapas: projeto, prototipagem, fabricação, montagem e embalagem.',
      'Produção projetada para otimizar a eficiência e a produtividade, com máquinas e equipamentos controlados por computador para tarefas repetitivas e complexas.',
    ],
    etapas: ['Projeto', 'Prototipagem', 'Fabricação', 'Montagem', 'Embalagem'],
    linhas: ['Tubulação', 'Estrutura metálica'],
    galeria: [['fab-silo-1', 'Estrutura de silo em fabricação'], ['fab-silo-2', 'Silo pintado em verde industrial'], ['fab-tanque-1', 'Tanque com bocais revestidos'], ['fab-tanque-2', 'Caixa com quatro bocais de saída'], ['fab-cabine', 'Cabine metálica fabricada pela Vordex'], ['planta-escadas', 'Estrutura metálica com escadas e plataformas em obra']],
  },
  {
    slug: 'manutencao-e-montagem-industrial', nome: 'Manutenção e montagem industrial', curto: 'Manutenção e montagem',
    circulo: 'circ-manutencao', foto: 'soldador',
    resumo: 'Paradas programadas, ampliações e montagem de novas plantas industriais.',
    intro: 'Equipes especializadas para manter a sua planta operando e para montar a próxima.',
    pontos: [
      'Atuação em paradas programadas, ampliação e montagem de novas plantas industriais.',
      'Serviços de montagem, manutenção, caldeiraria, elétrica, instrumentação e estrutura metálica.',
      'Controle de qualidade rigoroso e equipe especializada para soluções customizadas.',
    ],
    linhas: ['Tubulação', 'Equipamentos mecânicos', 'Caldeiraria', 'Elétrica', 'Instrumentação', 'Estrutura metálica'],
    galeria: [['montagem-1', 'Montagem de estrutura em planta de mineração'], ['montagem-2', 'Plataformas e guarda-corpos montados'], ['montagem-3', 'Tubulação e estrutura em planta industrial'], ['montagem-4', 'Equipe Vordex em montagem de estrutura'], ['planta-esteiras', 'Transportadores de correia em planta de mineração']],
  },
  {
    slug: 'locacao-de-equipamentos', nome: 'Locação de equipamentos', curto: 'Locação',
    circulo: 'circ-locacao', foto: 'frota-locacao-1',
    resumo: 'Guindastes, munck, pranchas e carretas, com atendimento imediato e carga assegurada.',
    intro: 'Nossa principal meta é a satisfação do cliente, com qualidade, seriedade e segurança nos serviços prestados.',
    pontos: [
      'Carregamento e descarregamento de cargas diversas.',
      'Içamento em geral.',
      'Remoção industrial.',
      'Movimentação de cargas pesadas.',
      'Transporte de cargas pesadas ou excedentes.',
    ],
    compromisso: 'Para reafirmar o compromisso com o cliente, seguimos uma política de qualidade baseada na convicção de que nossos clientes merecem o melhor em modernidade, qualidade e segurança.',
    frotaTexto: 'Atendimento imediato, equipamentos rastreados e carga sempre assegurada.',
    frota: [[6, 'Caminhões caçamba'], [4, 'Caminhões munck'], [4, 'Carretas carroceria'], [5, 'Guindastes'], [2, 'Pranchas para transporte de grandes cargas'], [2, 'Caçambas'], [2, 'Retroescavadeiras']],
    laminas: [['frota-locacao-1', 'Frota para locação: 6 caminhões caçamba, 4 caminhões munck e 4 carretas carroceria'], ['frota-locacao-2', 'Frota para locação: 5 guindastes, 2 pranchas para transporte de grandes cargas, 2 caçambas e 2 retroescavadeiras']],
  },
  {
    slug: 'terraplanagem', nome: 'Terraplanagem', curto: 'Terraplanagem',
    circulo: 'circ-terraplanagem', foto: 'frota-terra-2',
    resumo: 'Transformamos terrenos em oportunidades, com frota própria e equipe treinada.',
    intro: 'Transformamos terrenos em oportunidades.',
    pontos: [
      'Equipamentos de última geração para resultados precisos e eficientes.',
      'Profissionais altamente treinados, que garantem um trabalho de qualidade.',
      'Serviços realizados com respeito e responsabilidade ambiental.',
    ],
    oferecidos: ['Preparação de terrenos para construção', 'Movimentação de terra', 'Nivelamento de superfícies', 'Escavação'],
    frota: [[9, 'Escavadeiras'], [4, 'Patrols'], [15, 'Caminhões traçado caçamba'], [4, 'Rolos compactadores'], [5, 'Retroescavadeiras'], [3, 'Tratores de esteira D6']],
    laminas: [['frota-terra-1', 'Frota de terraplanagem: 9 escavadeiras, 4 patrols e 15 caminhões traçado caçamba'], ['frota-terra-2', 'Frota de terraplanagem: 4 rolos compactadores, 5 retroescavadeiras e 3 tratores de esteira D6']],
  },
];

// Estrutura e operações (bloco de ícones do site atual, na mesma ordem dos ícones).
export const estrutura = {
  intro: 'Cada departamento conta com gestão própria e apoio administrativo e operacional, com foco em qualidade, segurança e respeito ao meio ambiente.',
  itens: [
    ['icone-2', '4', 'bases próprias', 'Escritório administrativo, galpão de fábrica, pátio de equipamentos e materiais e garagem de veículos.'],
    ['icone-3', '3.750 m²', 'de área própria', 'Somadas as quatro bases, todas próprias.'],
    ['icone-4', '220', 'colaboradores', 'Equipe uniformizada e identificada.'],
    ['icone-6', 'Gestão', 'por departamento', 'Cada área com gestão própria e apoio administrativo e operacional.'],
    ['icone-7', 'Equipe', 'uniformizada', 'Colaboradores uniformizados e identificados em todas as frentes de trabalho.'],
    ['icone-1', '12', 'contratos permanentes', 'E 278 fornecedores ativos.'],
    ['icone-5', '31', 'veículos e máquinas de apoio', 'Frota própria, além dos veículos locados.'],
    ['icone-8', '24 h', 'de atendimento', 'Serviços disponíveis 24 horas por dia.'],
  ],
  // Frota de apoio citada no site atual.
  frotaApoio: [[8, 'Veículos pequenos'], [6, 'Veículos médios de passageiros'], [4, 'Caminhões munck'], [3, 'Carretas baú'], [2, 'Carretas prancha'], [1, 'Caminhão caçamba'], [1, 'Empilhadeira'], [1, 'Retroescavadeira'], [5, 'Guindastes']],
};

export const quemSomos = {
  intro: 'Conheça um pouco sobre a família Vordex.',
  pontos: [
    ['Desde 2016', 'Estabelecidos em Conselheiro Lafaiete, Minas Gerais, no polo industrial da região.'],
    ['Qualidade e transparência', 'Uma política de prestação de serviços com foco na qualidade e na transparência.'],
    ['Equipe qualificada', 'Profissionais qualificados e comprometidos com a integridade e a eficácia dos serviços.'],
  ],
};

export const denuncia = {
  intro: 'A Vordex conduz seus negócios com ética e integridade. Este canal recebe relatos de suspeitas de violação do nosso Código de Conduta.',
  temas: ['Violações do Código de Conduta', 'Comportamentos antiéticos ou inadequados', 'Riscos à segurança e ao meio ambiente', 'Assédio moral e sexual', 'Outras suspeitas que afetem a integridade da empresa'],
  como: [
    ['Relato', 'Você pode se identificar ou fazer o relato de forma anônima.'],
    ['Registro independente', 'Uma empresa independente registra e administra os relatos.'],
    ['Apuração', 'O relato segue para a equipe interna da Vordex responsável pelas apurações.'],
    ['Proteção', 'Quem relata é protegido contra retaliação e as informações são tratadas com sigilo.'],
  ],
  aviso: 'Este canal é exclusivo para temas de ética e integridade. Outros assuntos devem seguir pelos canais de contato habituais.',
  fone: '(31) 9.9687-7284',
};
