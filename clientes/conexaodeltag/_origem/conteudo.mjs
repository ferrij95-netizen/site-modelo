// Textos e dados da Conexão Delta G, tirados do site atual (conexaodeltag.com.br) em 21/10/2026.
// Erros de digitação do original corrigidos ("Filscal", "suplntes", "GENÔNIMCA", "Ãngela").
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const ler = f => JSON.parse(fs.readFileSync(path.join(aqui, f), 'utf8'));
const ORIG = 'http://www.conexaodeltag.com.br/';

export const empresa = {
  nome: 'Conexão Delta G',
  url: 'https://conexaodeltag.overtus.com.br/',
  antigo: ORIG,
  fones: [{ txt: '(55) 3242 3450', href: '+555532423450' }, { txt: '(55) 99978 3450', href: '+5555999783450' }],
  wa: '5555999783450',
  email: 'contato@conexaodeltag.com.br',
  endereco: ['Av. Vinte e Quatro de Maio, 1249', 'CEP 97573-450', 'Santana do Livramento, RS'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Av. Vinte e Quatro de Maio, 1249, Santana do Livramento, RS'),
  facebook: 'https://facebook.com/conexaodeltag',
};

export const pdf = {
  sumario: ORIG + '_files/view.php/download/pasta/1/64f7512e97f28.pdf',
  manual: ORIG + '_files/view.php/download/pasta/5/581cd53837aae.pdf',
  trabalhos: ORIG + '_files/view.php/download/pasta/5/581cd49ee59ed.pdf',
  portaria: ORIG + '_files/view.php/download/pasta/5/581cd3bb14f4d.pdf',
  genomico: 'https://www.embrapa.br/busca-de-publicacoes/-/publicacao/1061758/avaliacao-genomica-para-caracteristicas-de-adaptacao-e-caracterizacao-racial-de-touros-hereford-e-braford-edicao-2016',
  tj: [2016, 2015, 2014, 2013, 2012].map(a => ({ ano: a, url: `${ORIG}TJ${a}.pdf` })),
};

// "Conheça os diferenciais da Conexão Delta G" (home do site atual)
export const diferenciais = [
  { n: '21', t: 'características de real importância econômica avaliadas no processo de seleção' },
  { n: '500 mil', t: 'produtos avaliados' },
  { n: '26', t: 'touros em centrais de inseminação' },
  { n: '1.500', t: 'touros comercializados por ano' },
];
export const selos = ['Parcerias com universidades e instituições de pesquisa', 'Programa chancelado pelo MAPA e pela ABHB'];

export const quemSomos = [
  'A Conexão Delta G é uma associação que reúne um seleto grupo de agroempresas brasileiras, tendo como principal objetivo gerar e utilizar tecnologia de ponta para aumentar a rentabilidade da pecuária de corte.',
  'O programa de melhoramento genético é o forte elo de ligação entre as empresas participantes da Conexão Delta G. Estas empresas têm fazendas distribuídas nas regiões Sul, Sudeste e Centro-Oeste do Brasil. A produção está baseada nas raças Hereford e Braford.',
  'Idealizado há mais de trinta anos pelo saudoso Dr. Luiz Alberto Fries, o Programa conta com a assessoria da GenSys, empresa que também é responsável pelas avaliações genéticas.',
];

export const diretoria = [
  { cargo: 'Presidente', nomes: ['Patricia Guidoux Leal Wolf'] },
  { cargo: 'Vice-presidentes', nomes: ['Adroaldo Bernardo Pötter', 'Clarissa Lopes Peixoto'] },
  { cargo: 'Secretária', nomes: ['Suzana Macedo Salvador'] },
  { cargo: 'Tesoureiro', nomes: ['Eduardo Cavalcanti Eichenberg'] },
  { cargo: 'Conselho Fiscal (titulares)', nomes: ['Frederico Wolf', 'Pedro Monteiro Lopes', 'Reynaldo Salvador'] },
  { cargo: 'Conselho Fiscal (suplentes)', nomes: ['Carlos Edmundo Cirne Lima Eichenberg', 'José Ivo Zart', 'Paulo César Fleck'] },
  { cargo: 'Conselho Técnico', nomes: ['Ângela Linhares da Silva', 'Bernardo Pötter', 'José Fernando Piva Lobato', 'Valter José Pötter', 'GenSys'] },
];

// O Programa de Melhoramento Genético, em etapas (página "O Programa")
export const etapas = [
  { t: 'Identificação dos animais', r: 'Para cada animal, uma identificação diferente.', p: ['A condução do programa de melhoramento genético envolve o controle individual dos animais. Cada animal recebe uma identificação, que pode conter números ou uma combinação de números e letras. A identificação é a “carteira de identidade” do animal.', 'Diferentes métodos de identificação podem ser utilizados: marca a fogo, tatuagem ou brinco nas orelhas.'] },
  { t: 'Manejo dos animais', r: 'As mesmas condições, para que apareçam as diferenças genéticas.', p: ['Os animais são manejados em lotes (grupos de manejo). Os grupos onde os terneiros permanecerão do nascimento até a desmama e, depois, no pós-desmama, são formados no nascimento e na desmama, respectivamente.', 'Todos os animais de um grupo de manejo são manejados em conjunto, recebendo as mesmas oportunidades.'] },
  { t: 'Coleta de dados', r: 'Na desmama (6 a 8 meses) e no sobreano (14 a 18 meses).', p: ['A coleta envolve boa parte da equipe da fazenda, do peão ao técnico, treinados para executá-la. Para garantir a qualidade dos dados, a Conexão promove periodicamente cursos e treinamentos para os avaliadores em diversas regiões do país.', 'As informações são coletadas na reprodução, no nascimento, na desmama e no sobreano, e armazenadas em um sistema informatizado que pode ser operado na própria fazenda.'] },
  { t: 'Avaliações genéticas multirraciais', r: 'Hereford e Braford avaliadas em conjunto, pela GenSys.', p: ['As avaliações genéticas são realizadas pela GenSys, em Porto Alegre (RS). Os procedimentos separam o quanto de cada característica é devido ao ambiente e o quanto é devido à genética, que é a parte transmitida dos pais para os filhos.', 'As avaliações são multirraciais: as raças Hereford e Braford são avaliadas conjuntamente, o que aproveita melhor a variabilidade genética da população.'] },
  { t: 'Seleção dos animais', r: 'Os melhores para a reprodução, os demais para a engorda.', p: ['Com base nos índices genéticos, o criador e o seu técnico selecionam os futuros reprodutores (touros e vacas), destinando os melhores à reprodução e os inferiores à engorda. A seleção dos animais jovens acontece na desmama e no sobreano.'] },
  { t: 'Planejamento dos acasalamentos', r: 'O PAD simula cada matriz com todos os touros disponíveis.', p: ['A seleção de touros e matrizes e os acasalamentos podem ser definidos ao mesmo tempo com o PAD (Programa de Acasalamentos Dirigidos). O criador informa os touros possíveis e as matrizes da propriedade; o programa simula cada acasalamento e indica os melhores.'] },
];

export const indices = {
  desmama: [['Ganho de peso do nascimento ao desmame', 'GND', 52], ['Conformação ao desmame', 'C', 10], ['Precocidade ao desmame', 'P', 19], ['Musculatura ao desmame', 'M', 19]],
  final: [['Ganho de peso do nascimento ao desmame', 'GND', 25], ['Conformação ao desmame', 'C', 4], ['Precocidade ao desmame', 'P', 8], ['Musculatura ao desmame', 'M', 8], ['Ganho de peso do desmame ao sobreano', 'GDS', 25], ['Conformação ao sobreano', 'CS', 4], ['Precocidade ao sobreano', 'PS', 8], ['Musculatura ao sobreano', 'MS', 8], ['Perímetro escrotal ajustado para idade e peso', 'PE', 10]],
};

export const beneficiosPad = [
  'Seleção de touros e matrizes com uso pleno das informações coletadas e geradas no programa',
  'Touros “sob medida”, para as necessidades e os objetivos de cada rebanho',
  'Animais de elevado valor genético, acelerando o progresso genético',
  'Animais cruzados para o abate com elevado desempenho, aproveitando ao máximo os cruzamentos',
  'Combinação de índices genéticos e genotípicos (genética aditiva e não aditiva)',
  'Animais “CEIPados” com índices superiores aos que vinham sendo produzidos',
  'Menor frequência de animais com atributos deficientes',
  'Menos descartes por características raciais e mais pressão de seleção nas características de produção',
  'Controle do nível de endogamia, evitando a depressão endogâmica',
];

export const tourosJovens = [
  'O programa de touros jovens da Conexão Delta G, além de promover e disseminar o progresso genético entre os rebanhos participantes, fornece informações de progênie para identificar de forma mais rápida e precisa os touros superiores, que no futuro poderão ser usados intensivamente na reprodução.',
  'Para participar, os animais são submetidos a uma forte pressão de seleção: devem estar entre os 1% melhores machos com CEIP, escolhidos com o auxílio do PAD, que simula o acasalamento de cada candidato com todas as novilhas da última safra.',
  'O sêmen congelado dos touros jovens é distribuído aleatoriamente entre os rebanhos participantes, de modo que 10% dos produtos de cada rebanho sejam filhos destes touros jovens.',
];
export const criteriosTj = ['Maximização do índice final da futura progênie', 'Acasalamentos corretivos para características produtivas e caracterização racial', 'Melhor balanceamento das DEPs', 'Endogamia em níveis aceitáveis (menor do que 6%)'];

export const ceip = [
  'O CEIP (Certificado Especial de Identificação e Produção) foi instituído para bovinos resultantes de cruzamento planificado de animais com aptidão para corte que, avaliados geneticamente, obtenham classificação superior dentro do grupo de animais submetidos à seleção.',
  'É um documento oficial, emitido com autorização do Ministério da Agricultura, Pecuária e Abastecimento (MAPA), que atesta a qualidade genética dos animais.',
  'Inicialmente, somente os 20% melhores animais (touros jovens e novilhas) de cada safra estão aptos a receber o CEIP, podendo chegar depois a 30%, desde que justificado tecnicamente pela tendência genética e sem exceder 0,5% ao ano.',
];

export const genomica = [
  'Sempre na vanguarda da pesquisa em melhoramento genético de bovinos de corte, a Conexão Delta G apresenta de forma inédita a DEP genômica para resistência ao carrapato.',
  'Fruto de um trabalho iniciado em 2009, em parceria com a Embrapa Pecuária Sul (Bagé, RS) e a GenSys Consultores Associados, com apoio da Associação Brasileira de Hereford e Braford (ABHB), o projeto combina contagens de carrapato e genealogia com informações de DNA para identificar e selecionar os animais mais resistentes. É único no mundo.',
  'O carrapato é um dos principais problemas da criação de bovinos de corte no país: os prejuízos podem chegar a US$ 3,4 bilhões por ano em toda a cadeia. Mais de 4 mil animais de membros da Conexão Delta G no Rio Grande do Sul já foram avaliados e genotipados.',
  'Esta genética diferenciada está ao alcance do produtor nos leilões dos membros da Conexão Delta G, e os touros de IA com essa avaliação podem ser identificados no Sumário Genômico de Touros Hereford e Braford.',
];

export const sumario = {
  titulo: 'Sumário de Touros Hereford e Braford',
  edicao: '2023/2024',
  texto: 'A avaliação genética dos reprodutores das raças Hereford e Braford, adaptada à realidade das condições produtivas do Brasil. O produtor escolhe o touro de acordo com o objetivo da propriedade, como venda de terneiros ou de bois gordos, com mais de 20 características avaliadas e reunidas em um índice final.',
  destaques: [['331', 'touros avaliados na edição 2024/2025'], ['208', 'Braford'], ['123', 'Hereford'], ['450 mil', 'animais na base de dados']],
};

export const parceiros = [
  { nome: 'Embrapa', url: 'https://www.embrapa.br/', logo: 'embrapa' },
  { nome: 'GenSys', url: 'http://www.gensys.com.br', logo: 'gensys' },
  { nome: 'Associação Brasileira de Hereford e Braford', url: 'http://www.abhb.com.br', logo: 'abhb' },
  { nome: 'Alta Genetics', url: 'http://www.altagenetics.com.br/', logo: 'alta-genetics' },
  { nome: 'Progen', url: 'http://www.progen.agr.br/', logo: 'progen' },
];
export const apoiadores = [
  { nome: 'Alta Genetics', url: 'http://www.altagenetics.com.br', logo: 'alta-genetics' },
  { nome: 'ABS Pecplan', url: 'http://www.abspecplan.com.br', logo: 'abs-pecplan' },
  { nome: 'CRV Lagoa', url: 'http://www.crvlagoa.com.br', logo: 'crv-lagoa' },
  { nome: 'Progen', url: 'http://www.progen.agr.br', logo: 'progen' },
  { nome: 'Genex', url: '', logo: 'genex' },
  { nome: 'CORT Genética Brasil', url: '', logo: 'cort' },
  { nome: 'Elanco', url: '', logo: 'elanco' },
  { nome: 'Neogen', url: '', logo: 'neogen' },
];

const titulo = s => s.toLowerCase().replace(/(^|\s)(\p{L})/gu, (m, a, b) => a + b.toUpperCase()).replace(/ (E|Do|Da|De|Dos) /g, m => m.toLowerCase()).replace(/ Ltda$/, ' Ltda');
export const conectados = ler('conectados.json').map(m => ({ ...m, nome: titulo(m.nome) }));
export const touros = ler('dados.json').touros;

const slugN = s => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70).replace(/-[^-]*$/, '');
export const noticias = ler('noticias.json').map((n, i) => ({ ...n, slug: n.texto ? slugN(n.titulo) : null, original: ORIG + n.href, i }));
