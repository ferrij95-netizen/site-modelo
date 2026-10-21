// Conteúdo da Coomat. Tudo o que é fato vem do site atual (coomat.com.br, páginas Home, Serviços, Sobre, Publicações e Contato)
// e do Edital AGE/2024 publicado nele. O que foi escrito por nós está marcado com "nosso:" nos comentários.

export const empresa = {
  nome: 'Coomat',
  razao: 'Cooperativa Mista dos Agricultores de Toropi Ltda.',
  url: 'https://coomat.overtus.com.br/',
  antigo: 'https://coomat.com.br/',
  fundacao: '29 de abril de 1964',
  cidade: 'Toropi, RS',
  telefone: '(55) 93300-3129',
  telefoneHref: '+5555933003129',
  email: 'coomat@coomat.com.br',
  presidente: 'Sergio Renato Rossi de Freitas',
};

export const historia = {
  fundacao: 'A fundação da COOMAT se deu na década de 60, no dia 29 de abril de 1964, na reunião de 62 agricultores, que decidiram fundar a Cooperativa Mista dos Agricultores de Toropi Ltda., já elegendo seu primeiro presidente, Teobaldo Junges.',
  motivos: 'Conseguir melhores preços para a produção local e reduzir custos de insumos foram alguns dos motivos que incentivaram os 62 corajosos agricultores, liderados pelo pastor Ari Pfluck, a buscar uma situação de vida mais digna no campo e para o bem-estar de todos.',
  crescimento: 'A COOMAT no seu começo comercializava produtos coloniais produzidos nas comunidades locais, e logo passou a trabalhar também com arroz, soja, milho e outros grãos. Foi assim que a COOMAT lutou e prosperou, e sem demora aumentou sua estrutura de armazéns.',
};

// Painel "Visão, Negócio, Missão, Princípios" da página Sobre (imagem no site atual, transcrita aqui).
export const identidade = {
  visao: 'Ser referência em qualidade e competitividade.',
  negocio: 'Cooperação e desenvolvimento.',
  missao: 'Valorizar, orientar e qualificar associados e colaboradores na busca de soluções para melhoria da qualidade de vida.',
  principios: [
    'Trabalhar com honestidade, transparência e ética',
    'Atuar com competência e responsabilidade',
    'Ser leal e humano',
    'Agir com comprometimento e credibilidade',
    'Acompanhar a evolução tecnológica preservando o meio ambiente',
  ],
};

export const numeros = [
  { valor: '1964', rotulo: 'ano de fundação, em Toropi' },
  { valor: '62', rotulo: 'agricultores fundadores' },
  { valor: '4.408', rotulo: 'associados em situação de voto (out/2024)' },
  { valor: '5', rotulo: 'unidades: matriz e quatro filiais' },
];

// Faixa verde da home atual: Qualidade, Assistência, Insumo. nosso: as frases de cada um.
export const pilares = [
  { titulo: 'Qualidade', texto: 'Trabalhamos com as melhores marcas do mercado agrícola, com garantia de qualidade.' },
  { titulo: 'Assistência', texto: 'Orientação ao associado da escolha do insumo até a lavoura colhida.' },
  { titulo: 'Insumo', texto: 'Sementes, adubos e defensivos para a safra, com preço de cooperativa.' },
];

// Página Serviços do site atual: quatro áreas, todas "em construção". nosso: os textos, sem marcas nem números.
export const servicos = [
  { slug: 'sementes', titulo: 'Sementes e adubo', foto: 'sulcos', texto: 'Insumos para o plantio de soja, milho, arroz, trigo e pastagens, com orientação técnica na escolha e no manejo.' },
  { slug: 'defensivos', titulo: 'Defensivos', foto: 'milho-trigo', texto: 'Produtos para proteger a lavoura, com recomendação de uso correto e seguro para o produtor e para o meio ambiente.' },
  { slug: 'desenvolvimento', titulo: 'Desenvolvimento', foto: 'trator', texto: 'Acompanhamento do associado para produzir mais e melhor, com a cooperação como caminho para o desenvolvimento do campo.' },
  { slug: 'ambiente', titulo: 'Meio ambiente', foto: 'pastagem', texto: 'Acompanhar a evolução tecnológica preservando o meio ambiente é um dos princípios da Coomat.' },
];

// Página Contato do site atual.
export const unidades = [
  { slug: 'matriz', nome: 'Matriz', subtitulo: 'Sede administrativa', endereco: 'Rua 22 de Outubro, 417, Toropi/RS', telefones: ['(55) 93300-3129'], email: 'coomat@coomat.com.br', mapa: 'Rua 22 de Outubro, 417, Toropi, RS', ic: 'predio' },
  { slug: 'sao-pedro', nome: 'Filial 02', subtitulo: 'São Pedro do Sul', endereco: 'Rua José Bonifácio, 216, São Pedro do Sul/RS', telefones: ['(55) 9611-8203', '(55) 9926-0799'], email: 'coomatsps@coomat.com.br', mapa: 'Rua José Bonifácio, 216, São Pedro do Sul, RS', ic: 'loja' },
  { slug: 'mercado', nome: 'Filial 03', subtitulo: 'Mercado', endereco: 'Rua 22 de Outubro, 417, Toropi/RS', telefones: ['(55) 98165-4342'], email: 'mercado@coomat.com.br', mapa: 'Rua 22 de Outubro, 417, Toropi, RS', ic: 'cesta' },
  { slug: 'agroveterinaria', nome: 'Filial 05', subtitulo: 'Agroveterinária', endereco: 'Rua 22 de Outubro, 417, Toropi/RS', telefones: ['(55) 98413-0002'], email: 'agroveterinaria@coomat.com.br', mapa: 'Rua 22 de Outubro, 417, Toropi, RS', ic: 'folha' },
  { slug: 'racoes', nome: 'Filial 07', subtitulo: 'Fábrica de Rações', endereco: 'Rua 22 de Outubro, 417, Toropi/RS', telefones: ['(55) 98413-0002'], email: 'coomat@coomat.com.br', mapa: 'Rua 22 de Outubro, 417, Toropi, RS', ic: 'silo' },
];

// nosso: uma frase sobre o que cada unidade atende, a partir do nome dela.
export const unidadeTexto = {
  matriz: 'Administração da cooperativa, atendimento ao associado e assembleias no Casarão da COOMAT, na mesma rua.',
  'sao-pedro': 'Atendimento aos associados de São Pedro do Sul e região.',
  mercado: 'O mercado da cooperativa em Toropi, aberto a associados e à comunidade.',
  agroveterinaria: 'Produtos agropecuários e veterinários para a lavoura e para a criação.',
  racoes: 'Fabricação de rações em Toropi, junto à matriz.',
};

// Linha do tempo. Datas do site atual e do edital; a ordem das fases é do texto da história.
export const linhaTempo = [
  { ano: '1964', titulo: 'Fundação', texto: '29 de abril: 62 agricultores, liderados pelo pastor Ari Pfluck, fundam a cooperativa e elegem Teobaldo Junges como primeiro presidente.' },
  { ano: 'Começo', titulo: 'Produtos coloniais', texto: 'A COOMAT comercializa os produtos coloniais das comunidades locais.' },
  { ano: 'Grãos', titulo: 'Arroz, soja e milho', texto: 'Passa a trabalhar com arroz, soja, milho e outros grãos e aumenta a estrutura de armazéns.' },
  { ano: 'Filiais', titulo: 'Mercado, agroveterinária e rações', texto: 'Filial em São Pedro do Sul, mercado, agroveterinária e fábrica de rações em Toropi.' },
  { ano: '2024', titulo: '60 anos', texto: 'Festa dos 60 anos em abril e 4.408 associados em situação de voto em outubro.' },
];

// Publicações do site atual.
export const publicacoes = [
  {
    titulo: 'Edital AGE/2024',
    data: '16 de outubro de 2024',
    resumo: 'Convocação da Assembleia Geral Extraordinária no Casarão da COOMAT, Rua 22 de Outubro, 408, Toropi/RS, em 31 de outubro de 2024: às 12h30 em primeira chamada (2/3 dos associados), às 13h30 em segunda (metade mais um) e às 14h30 em terceira e última (mínimo de 10 associados).',
    pauta: ['Reforma estatutária para aprovação da inclusão de novas atividades', 'Alteração das atividades das filiais', 'Assuntos gerais'],
    obs: 'Para fins de verificação de quórum, o número de associados em situação de voto em 16 de outubro de 2024 é de 4.408.',
    assinatura: 'Sergio Renato Rossi de Freitas, Presidente',
    img: 'real-edital-age-2024',
  },
];

// Fotos reais da festa de 60 anos (galeria do site atual, 29/04/2024).
export const galeria60 = [
  { f: 'real-60anos-painel', alt: 'Painel dos 60 anos da Coomat com balões verdes e amarelos' },
  { f: 'real-60anos-equipe', alt: 'Equipe da Coomat na festa de 60 anos' },
  { f: 'real-60anos-colaboradores', alt: 'Colaboradoras e colaboradores na festa de 60 anos' },
  { f: 'real-60anos-conselho', alt: 'Diretoria da Coomat na festa de 60 anos' },
  { f: 'real-60anos-fundadores', alt: 'Associados na festa de 60 anos' },
];
