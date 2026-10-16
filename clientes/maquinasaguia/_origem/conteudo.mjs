// Textos do site novo da Máquinas Águia. Tudo vem do site atual (maquinasaguia.com.br/site):
// páginas Home, A empresa, Contato e Localização, o catálogo de 46 máquinas (dados.json) e as 5 notícias.
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
export const dados = JSON.parse(fs.readFileSync(path.join(aqui, 'dados.json'), 'utf8'));

export const site = {
  nome: 'Máquinas Águia',
  razao: 'Ind. e Com. de Máquinas Águia Ltda.',
  dominio: 'https://maquinasaguia.overtus.com.br',
  fone: '(41) 3382-3100',
  foneHref: 'tel:+554133823100',
  whats: '554133823100',
  email: 'aguia@maquinasaguia.com.br',
  endereco: 'Av. Rui Barbosa, 3880, Bairro Afonso Pena',
  cidade: 'São José dos Pinhais, Paraná, Brasil',
  cep: '83056-980',
  caixaPostal: 'Caixa Postal nº 1511',
  facebook: 'https://www.facebook.com/maquinasaguia',
  atual: 'https://www.maquinasaguia.com.br/site/',
  mapa: 'https://www.google.com/maps?q=Av.+Rui+Barbosa,+3880,+Afonso+Pena,+S%C3%A3o+Jos%C3%A9+dos+Pinhais+-+PR&output=embed',
  rota: 'https://www.google.com/maps/dir/?api=1&destination=Av.+Rui+Barbosa,+3880,+S%C3%A3o+Jos%C3%A9+dos+Pinhais+-+PR',
};

export const empresa = {
  intro: 'A Ind. e Com. de Máquinas Águia Ltda. é uma empresa fabricante de máquinas para serraria com foco na precisão de corte e automação: multilâminas, plainas, máquinas para cabos de vassoura e para o beneficiamento de madeira, otimizando o aproveitamento e diminuindo o desperdício.',
  modelos: 'Conta com mais de 50 modelos de máquinas específicas, além de modificações e máquinas especiais.',
  servicos: 'Além da qualidade e do diferencial no atendimento, a empresa presta serviços de restauração de máquinas, assistência técnica e ferramentaria, como recuperação de peças e ferramentas.',
  historia: 'Fundada em 1969 e estabelecida em São José dos Pinhais (PR), na região metropolitana de Curitiba, desde 1975, tornou-se Indústria e Comércio de Máquinas Águia Ltda.',
  estrutura: 'Ocupa uma área construída de aproximadamente 2.000 m², em um terreno de 24.200 m², e conta com a colaboração de aproximadamente 30 funcionários.',
  mercados: 'Além da venda direta pela fábrica, possui revendas em São Paulo (SP), Porto Alegre (RS), Joinville (SC) e Ji-Paraná (RO). Atende todo o país e também os mercados do Mercosul, América Central, Estados Unidos e parte da Europa.',
  missao: 'Fornecer produtos e serviços, dentro de padrões definidos, visando alcançar desta forma a satisfação das necessidades dos clientes.',
  visao: 'Ser empresa referência nas áreas de serrarias, beneficiamento e aproveitamento de madeira, reconhecida por clientes, investidores, fornecedores e colaboradores, pela qualidade de relacionamento, assessoria técnica, produtos e serviços.',
  valores: ['Comprometimento', 'Sustentabilidade', 'Valorização humana', 'Inovação', 'Melhoria contínua'],
  meioAmbiente: 'Utilize madeira de manejos sustentáveis. Preserve o meio ambiente.',
};

export const numeros = [
  ['1969', 'ano de fundação'],
  ['50+', 'modelos de máquinas'],
  ['24.200 m²', 'de área total'],
  ['4', 'revendas no Brasil'],
];

export const revendas = [['São Paulo', 'SP'], ['Porto Alegre', 'RS'], ['Joinville', 'SC'], ['Ji-Paraná', 'RO']];
export const mercados = ['Todo o Brasil', 'Mercosul', 'América Central', 'Estados Unidos', 'Parte da Europa'];

export const depoimentos = [
  { t: 'Nossa empresa é cliente da Máquinas Águia desde que iniciou suas atividades, em 1994, e seu quadro de máquinas é em torno de 80% Águia: equipamentos de alta qualidade e precisão, com profissionais de alta competência e seriedade tanto na área de produção quanto na área administrativa.', n: 'Norberto Ponsoni', e: 'Pondel Ind. de Cabos Ltda.' },
  { t: 'Conheço a Máquinas Águia há mais de 20 anos. Hoje temos nossa própria empresa de palitos em Lagoa da Prata (MG) e já temos 8 máquinas adquiridas da Máquinas Águia, pela qualidade dos produtos e principalmente pelo atendimento. Quando for comprar máquinas para madeira, não deixe de cotar com a Máquinas Águia.', n: 'Gilson', e: 'Palitos FGL Ltda.' },
];

// Capa: os quatro destaques do carrossel do site atual, com as mesmas frases.
export const destaques = [
  { img: 'r-multiprocessador', k: 'Lançamento Máquinas Águia', t: 'Multiprocessador de Blocos', p: 'Multiprocessador para cortar com lâminas de 2,3 mm.', slug: 'multi-processadora-de-blocos' },
  { img: 'r-carro-cpa800', k: 'Serraria', t: 'Carro Porta Toras CPA-800', p: 'O mais rápido e inteligente carro porta toras do mercado atual.', slug: 'carro-porta-toras-pneumatico-cpa-800' },
  { img: 'r-refiladeira', k: 'Serraria', t: 'Serra Circular Refiladeira CA-80', p: 'Máquina extremamente reforçada e de alta performance.', slug: 'serras-circulares-refiladeiras' },
  { img: 'r-torno-ttr160', k: 'Beneficiamento', t: 'Torno TTR-160', p: 'Torno tubular para roletes, com excelente acabamento e alta produtividade.', slug: 'torno-tubular-ttr-160p' },
];

// Linhas e categorias, na mesma divisão do catálogo atual.
export const linhas = {
  serraria: {
    nome: 'Serraria', img: 'linha-instalada',
    texto: 'Máquinas e equipamentos para serrarias: do carro porta toras e das serras de fita de desdobro às serras circulares múltiplas, refiladeiras e equipamentos complementares.',
    cats: [
      ['carro-porta-toras', 'Carro Porta Toras'], ['serras-de-fita', 'Serras de Fita'], ['serra-de-desdobro', 'Serra de Desdobro'],
      ['serras-gemeas', 'Serras Geminadas'], ['serras-circulares-serraria', 'Serras Circulares'], ['equipamento-complementar', 'Equipamento Complementar'],
    ],
  },
  beneficiamento: {
    nome: 'Beneficiamento', img: 'engrenagens',
    texto: 'Máquinas para produção de cabos de vassoura e torneados, rosqueadeiras, serras circulares, refiladeiras, destopadeiras, plainas e equipamentos para a indústria moveleira.',
    cats: [
      ['cabos-de-vassoura', 'Cabos de Vassoura'], ['torneados', 'Torneados'], ['serras-circulares', 'Serras Circulares'],
      ['plainas-e-componentes', 'Plainas e Componentes'], ['industria-moveleira', 'Indústria Moveleira'], ['maquinas-especiais', 'Máquinas Especiais'],
    ],
  },
};

// Da tora à peça pronta: onde cada máquina do catálogo entra na serraria e no beneficiamento.
export const processo = [
  { t: 'Movimentação das toras', p: 'Virar, transportar e unitizar toras e tábuas com segurança.', slugs: ['virador-de-toras-vc-2-vc-3', 'transportador-correntes-transversais-ct-ctt', 'unitizador-de-toras-ou-tabuas'] },
  { t: 'Desdobro da tora', p: 'Carro porta toras e serras de fita para abrir a tora com precisão.', slugs: ['carro-porta-toras-pneumatico-cpa-800', 'serra-de-fita-para-toras', 'serra-de-fita-desdobro-horizontal-dh-110', 'serras-de-fita-geminadas-gemeas'] },
  { t: 'Blocos e múltiplos cortes', p: 'Bloqueadeiras e serras múltiplas que desdobram o bloco em uma só passagem.', slugs: ['multi-processadora-de-blocos', 'serra-circular-geminada-scgt4', 'serra-circular-multipla-cmba-160', 'serra-circular-multilaminas-sm350'] },
  { t: 'Refilo', p: 'Refiladeiras para tirar as costaneiras e padronizar a largura das tábuas.', slugs: ['serras-circulares-refiladeiras', 'serra-circular-srl-75-e-srm10', 'serra-refiladeira-srp-15'] },
  { t: 'Destopo', p: 'Destopadeiras pneumáticas e múltiplas para o comprimento final.', slugs: ['serra-destopadeira-sd-3-e-sd-5', 'dip-destopadeira-inferior-pneumatica', 'destopadeira-multipla-inferior-dmi'] },
  { t: 'Beneficiamento', p: 'Plainas, tornos, lixadeiras e rosqueadeiras para cabos, cavilhas e torneados.', slugs: ['plaina-moldureira-pmr100', 'torno-tubular-ttr-160p', 'lixadeira-dupla-lpd-3200', 'rosqueadeira-externa-pneumatica-rec-p'] },
];

export const servicos = [
  { t: 'Assistência técnica', p: 'Atendimento técnico às máquinas Águia instaladas, com a mesma equipe que projeta e fabrica.', ico: 'chave' },
  { t: 'Restauração de máquinas', p: 'Recuperação de máquinas em uso para que voltem a trabalhar com precisão e segurança.', ico: 'ciclo' },
  { t: 'Ferramentaria', p: 'Recuperação de peças e ferramentas na ferramentaria própria da fábrica.', ico: 'engrenagem' },
  { t: 'Modificações e máquinas especiais', p: 'Além dos mais de 50 modelos de linha, a Águia faz modificações e desenvolve máquinas especiais.', ico: 'projeto' },
];

// Notícias: fotos escolhidas entre as que o próprio post usa no site atual.
export const fotoNoticia = {
  'inovacao-em-sistema-de-corte': 'multi-pro-bloc',
  'homenagem-federacao-das-industrias-do-estado-do-parana-x-maquinas-aguia': 'fiep-1',
  'lignumbrasil': 'lignum',
  'propaganda-na-revista-referencia-industrial': 'revista-capa',
  'novo-site-maquinas-aguia': 'tradicao-capa',
};
export const tituloNoticia = {
  'inovacao-em-sistema-de-corte': 'Inovação em sistema de corte',
  'homenagem-federacao-das-industrias-do-estado-do-parana-x-maquinas-aguia': 'Homenagem da Federação das Indústrias do Estado do Paraná à Máquinas Águia',
  'lignumbrasil': 'Máquinas Águia na Lignum Brasil',
  'propaganda-na-revista-referencia-industrial': 'Máquinas Águia na revista Referência Industrial',
  'novo-site-maquinas-aguia': 'Novo site Máquinas Águia',
};
