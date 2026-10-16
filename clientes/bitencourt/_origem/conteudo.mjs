// Textos do site da Fundição Bitencourt. Tudo vem do site atual (fundicaobitencourt.com.br): início, empresa,
// produtos (15 fichas) e materiais (16 ligas em /material/<código>), com erros de digitação corrigidos.
// A "Planta 2" (BR 101, Içara) está comentada no HTML do site atual, por isso fica de fora até a empresa confirmar.
// Nada de número inventado: os números são os que o site atual publica.
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
export const produtos = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));
export const ligas = JSON.parse(fs.readFileSync(path.join(aqui, 'ligas.json'), 'utf8'));

export const site = {
  nome: 'Fundição Bitencourt',
  dominio: 'https://bitencourt.overtus.com.br',
  fone: '(48) 3433-0147',
  foneHref: 'tel:+554834330147',
  email: 'contato@fundicaobitencourt.com.br',
  horario: 'Seg a Sex, 08:00 às 18:00',
  desde: 1986,
  plantas: [
    { nome: 'Fábrica', rua: 'Rua Otávio Fontana, 300', bairro: 'São Simão', cidade: 'Criciúma / SC', cep: '88811-460',
      mapa: 'Rua Otávio Fontana, 300, São Simão, Criciúma, SC, 88811-460' },
  ],
  atual: 'https://www.fundicaobitencourt.com.br/',
};

export const lema = 'Contribuindo com o desenvolvimento desde 1986';
export const chamada = 'Seu projeto, produto ou processo com o melhor custo-benefício, no menor tempo e com o toque de qualidade que o seu negócio precisa.';

// Frases do carrossel da capa do site atual.
export const slides = [
  'Processos de fundição estáveis que garantem as propriedades da liga que o seu projeto precisa.',
  'Usinagem na medida certa para a sua necessidade.',
  'Matéria-prima selecionada para garantir a composição química adequada ao seu produto.',
];

export const pilares = [
  ['Especialidade', 'Fabricação de peças acabadas em ligas de cobre e ligas de alumínio, pelos processos de fundição em areia, molde permanente ou coquilhamento, centrifugação e semicentrifugação.', 'capacete'],
  ['Qualidade', 'Certificação ISO 9000 e utilização dos principais sistemas de padronização internacionais na produção de ligas metálicas não ferrosas.', 'certificado'],
  ['Responsabilidade', 'Rigorosa gestão de resíduos sólidos, líquidos e gasosos.', 'reciclo'],
  ['Satisfação do cliente', 'Somos referência em fundição de metais não ferrosos no sul do Brasil, com foco na excelência da produção e da entrega do produto final.', 'aperto'],
];

export const excelencia = {
  titulo: 'Comprometimento com a excelência',
  texto: 'Nos propomos a adotar as melhores práticas da indústria e a basear-nos em padrões de referência das normas internacionais de mercado. Acreditamos em relações de negócios de longo prazo, baseadas em objetivos comuns, práticas comerciais éticas e busca contínua pela qualidade.',
};

export const efetividade = {
  titulo: 'Máxima efetividade',
  texto: 'Colaboramos no desenvolvimento do seu projeto, produto ou processo, com o melhor custo-benefício, no menor tempo e com o toque de qualidade que o seu negócio precisa.',
};

export const chegamos = {
  titulo: 'Nossos produtos até você',
  texto: 'Dispomos de parcerias logísticas e fornecemos para todo o Brasil, focando nos mais diversos segmentos econômicos, com maior destaque para indústrias de máquinas e equipamentos, mineração, agroindústria, transporte e construção civil.',
  segmentos: ['Máquinas e equipamentos', 'Mineração', 'Agroindústria', 'Transporte', 'Construção civil'],
};

export const quemSomos = [
  'A Fundição Bitencourt, fundição de Criciúma, no sul de Santa Catarina, atua no setor de fundição de não ferrosos e é especializada na fabricação de peças acabadas em ligas de cobre e ligas de alumínio, pelos processos de fundição em areia verde, shell molding, coquilhamento e centrifugação, obedecendo às normas e padrões de referência AA, SAE, UNS, ASTM, EN e JIS.',
  'Estamos prontos para colaborar no desenvolvimento do seu projeto, produto ou processo, com o melhor custo-benefício, no menor tempo e com o toque de qualidade que o seu negócio precisa.',
  'Fornecemos para todo o Brasil, focando nos mais diversos segmentos econômicos, com maior destaque para indústrias de máquinas e equipamentos, mineração, agroindústria, transporte e construção civil.',
];

export const normas = [
  ['AA', 'Aluminum Association'], ['SAE', 'Society of Automotive Engineers'], ['UNS', 'Unified Numbering System'],
  ['ASTM', 'American Society for Testing and Materials'], ['EN', 'European Norms'], ['JIS', 'Japanese Industrial Standards'],
];

export const historia = [
  ['1986', 'Início das operações', 'A Fundição Bitencourt iniciou suas operações como fundição de materiais não ferrosos, nomeada desta forma pelo seu fundador, Salvato Bitencourt Filho. Começava uma jornada de mais de três décadas, que levaria à construção de uma empresa familiar, nacional e, acima de tudo, empenhada com o crescimento econômico e social da sua região e do Brasil.'],
  ['1990', 'Estátuas e bustos de bronze', 'Ainda aprendendo a aprender e adaptando-se ao cenário econômico instável, a Fundição Bitencourt consegue bons negócios naquela que seria sua primeira grande especialidade: o trabalho artístico e minucioso de produção de grandes estátuas e bustos de bronze. Os bons resultados foram revertidos em investimentos, e a empresa dá seu primeiro salto em direção à produção voltada à indústria de base.'],
  ['1994', 'Incorporação da usinagem', 'Já dedicada à produção industrial, a Fundição Bitencourt, atenta às oportunidades, incorpora processos de usinagem, o que viabilizou o atendimento a um mercado importante na Região Carbonífera de Santa Catarina: a mineração.'],
  ['2000', 'Expansão para o Sul e o Sudeste', 'O conhecimento e a evolução no tratamento dos materiais impulsionaram os negócios, e outras fronteiras passaram a ser exploradas. A empresa estabeleceu novas parcerias locais e regionais, fazendo com que seus produtos chegassem a todos os estados do Sul e, indiretamente, ao principal mercado do país, o Sudeste.'],
  ['2007', 'Certificação ISO 9000', 'Novos desafios e a busca, mais do que nunca, pela pureza e pelas características ótimas dos materiais levaram a Fundição Bitencourt a buscar respaldo na certificação ISO 9000. A aplicação desses conhecimentos e o desenvolvimento de tecnologia levariam a empresa e seu cobre de altíssima qualidade a limites talvez não imaginados na sua fundação.'],
  ['2010', 'Cobre de alta condutividade', 'Com o desenvolvimento de novos processos e tecnologia, fez-se necessária a expansão. Uma planta mais ampla, moderna e segura, com processos mais controláveis e estáveis, garantiu a consolidação e preparou a Fundição Bitencourt para parcerias sólidas e para o atendimento a mercados de extrema exigência.'],
  ['2016', 'Escrevendo juntos este capítulo', 'A satisfação pelo que fazemos, a satisfação dos nossos clientes e, sobretudo, o respeito pelas pessoas e pela sociedade tornaram a Fundição Bitencourt uma empresa de referência na fundição de não ferrosos, que conhece seu papel e ajuda a construir o mundo que queremos para nós e para nossos filhos.'],
];

export const processos = [
  ['Areia verde', 'molde'],
  ['Shell molding', 'casca'],
  ['Coquilhamento', 'coquilha'],
  ['Centrifugação', 'centrifuga'],
  ['Semicentrifugação', 'semi'],
];
export const laboratorio = ['Ensaio de líquidos penetrantes', 'Ensaio de dureza', 'Ensaio de condutividade elétrica', 'Metrologia dimensional', 'Metalografia', 'Espectrometria'];
export const equipamentos = ['Fornos elétricos e à indução', 'Centrífugas horizontais e verticais de grande porte', 'Tornos e centros de usinagem CNC'];
export const socioambientais = [
  ['Energia limpa', 'Usamos energia limpa. Não empregamos combustíveis fósseis na produção.', 'raio'],
  ['Efluentes tratados', 'Tratamos todos os efluentes líquidos e gasosos, além dos rejeitos sólidos gerados nos nossos processos de produção.', 'gota'],
  ['Reaproveitamento', 'Buscamos o equilíbrio ambiental a partir do reaproveitamento de materiais metálicos.', 'reciclo'],
  ['Comunidade', 'Priorizamos o emprego de pessoas das comunidades que nos cercam, garantindo uma evolução sustentável do nosso meio.', 'pessoas'],
  ['Capacitação', 'Investimos na capacitação e na educação dos nossos colaboradores, visando à evolução do seu desenvolvimento profissional, social e econômico.', 'livro'],
];

export const politica = {
  texto: 'A Fundição Bitencourt tem como objetivo a satisfação do cliente com qualidade diferenciada, a busca do crescimento e o alcance dos melhores resultados, com foco:',
  itens: ['No atendimento às exigências do cliente e da legislação;', 'Na motivação e capacitação dos colaboradores;', 'Na padronização e na melhoria contínua dos processos e dos produtos.'],
};

export const clientes = {
  texto: 'Durante nossas três décadas de operação, atendemos e fidelizamos empresas de médio e grande porte. Entre elas:',
  numeros: [['50', 'empresas de mineração'], ['30', 'fabricantes de máquinas e equipamentos'], ['10', 'empresas de agronegócio'], ['02', 'multinacionais fabricantes de motores']],
};

export const instalacoes = 'Dispomos de uma planta de produção moderna e flexível no sul de Santa Catarina, no município de Criciúma.';

// "Como produzimos": o quadro do site atual (processos.jpg) em três etapas.
export const comoProduzimos = [
  ['Sua necessidade', ['Aplicação', 'Geometria e dimensões', 'Propriedades físicas, mecânicas e elétricas', 'Propriedades químicas', 'Local de entrega e prazos']],
  ['Nossa proposta de solução', ['Material indicado', 'Processo de fundição', 'Plano de usinagem', 'Prazos e logística', 'Preço e condições']],
  ['E a solução', ['Design e modelagem', 'Fundição', 'Acabamento e usinagem', 'Ensaios e certificações', 'Embalagem e entrega']],
];
export const comoFrase = 'Trabalhamos no tempo da sua necessidade!';

// Fotos e legendas (alt).
export const fotos = {
  'galeria/planta-fachada': 'Fachada da planta da Fundição Bitencourt em Criciúma',
  'galeria/planta-jardim': 'Área externa da planta',
  'galeria/exaustao': 'Sistema de exaustão da fundição',
  'galeria/filtros': 'Dutos e filtros de tratamento de gases',
  'galeria/molde-areia': 'Molde de areia aberto',
  'galeria/centrifuga': 'Centrífuga de grande porte',
  'galeria/coquilha': 'Coquilha metálica para fundição em molde permanente',
  'galeria/fundicao-galpao': 'Galpão de fundição com fornos e exaustão',
  'galeria/vazamento': 'Vazamento do metal líquido',
  'galeria/torno-cnc': 'Torno CNC',
  'galeria/usinagem-cobre': 'Usinagem de anel de cobre no torno',
  'galeria/usinagem-bronze': 'Usinagem de peça de bronze',
  'galeria/cavacos-cobre': 'Cavacos de cobre na usinagem',
  'galeria/espectrometro': 'Espectrômetro do laboratório',
  'galeria/condutivimetro': 'Medidor de condutividade elétrica',
  'galeria/microscopio': 'Microscópio de metalografia',
  'galeria/embalagem': 'Peças embaladas para entrega',
  'galeria/carregamento': 'Carregamento de peças no caminhão',
  cadinho: 'Cadinho com metal fundido',
};
export const galeriaOrdem = ['planta-fachada', 'fundicao-galpao', 'vazamento', 'molde-areia', 'coquilha', 'centrifuga', 'torno-cnc', 'usinagem-cobre',
  'usinagem-bronze', 'cavacos-cobre', 'espectrometro', 'condutivimetro', 'microscopio', 'exaustao', 'filtros', 'planta-jardim', 'embalagem', 'carregamento'];
