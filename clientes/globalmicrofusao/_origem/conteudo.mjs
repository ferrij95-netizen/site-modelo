// Textos do site da Global Microfusão. Tudo o que é fato veio do site atual (globalmicrofusao.com.br, lido em 2026-10-16),
// com erros de digitação corrigidos; o CNPJ e a data de abertura vêm do cadastro da Receita (12.999.196/0001-59, 11/2010).
// As frases que explicam cada serviço são descrições gerais do que o site atual lista, sem número inventado.

export const site = {
  nome: 'Global Microfusão',
  razao: 'Global Microfusão Ltda',
  cnpj: '12.999.196/0001-59',
  fone: '(54) 3441-2150',
  foneHref: 'tel:+555434412150',
  email: 'globalmicrofusao@globalmicrofusao.com.br',
  endereco: 'Estrada Velha da Vacaria, 1335',
  cidade: 'Veranópolis – RS',
  cep: '95330-000',
  dominio: 'https://globalmicrofusao.overtus.com.br',
  mapa: 'https://www.google.com/maps?q=Estrada+Velha+da+Vacaria,+1335,+Veran%C3%B3polis+-+RS,+95330-000&output=embed',
  mapaLink: 'https://www.google.com/maps/search/?api=1&query=Global+Microfus%C3%A3o+Veran%C3%B3polis',
  siteAtual: 'https://www.globalmicrofusao.com.br/',
};

export const lema = 'Qualidade e compromisso';
export const sublema = 'Há mais de 15 anos produzimos peças em metais e ligas especiais.';

export const vantagens = [
  { ico: 'brilho', t: 'Excelente acabamento superficial', p: 'O processo proporciona excelente acabamento superficial, com o mínimo de resíduos.' },
  { ico: 'regua', t: 'Mínima variação dimensional', p: 'O projeto final sai com mínima variação dimensional, ideal para projetos complexos.' },
  { ico: 'liga', t: 'Peças em metais ou ligas especiais', p: 'Grande capacidade de geração de peças em metais ou ligas especiais.' },
  { ico: 'termometro', t: 'Ligas com baixo ponto de fusão', p: 'Possibilidade de obter ligas metálicas com baixo ponto de fusão, até ligas com elevadas temperaturas de trabalho.' },
];

export const materiais = [
  { t: 'Aço carbono', p: 'Para peças estruturais e mecânicas de uso geral.' },
  { t: 'Aço inoxidável', p: 'Para peças expostas à umidade, a alimentos, a bebidas e a produtos químicos.' },
  { t: 'Aços de alta liga', p: 'Para peças que trabalham com desgaste, esforço ou temperatura elevada.' },
];

export const servicos = {
  intro: 'A Global Microfusão não entra no mercado para ser mais uma: nós trabalhamos juntamente com o cliente para conquistar o melhor resultado final, com custo competitivo e qualidade dos seus produtos. Nossa maior preocupação é a satisfação de nosso cliente, pois acreditamos que o nosso sucesso é consequência do crescimento dos nossos clientes.',
  alem: 'Além de fornecer microfundidos, estamos aptos a auxiliar sua empresa em:',
  principal: { ico: 'cacho', t: 'Microfundidos', p: 'Peças fundidas por cera perdida (investment casting) em aço carbono, aço inoxidável e aços de alta liga, com excelente acabamento superficial e mínima variação dimensional.' },
  itens: [
    { id: 'desenvolvimento', ico: 'desenho', t: 'Desenvolvimento de peças', p: 'Trabalhamos junto com a sua engenharia, a partir do desenho ou da amostra, para chegar à peça certa para a microfusão.' },
    { id: 'usinagem', ico: 'usinagem', t: 'Peças usinadas', p: 'A peça microfundida pode sair usinada, pronta para a montagem, sem precisar de outro fornecedor.' },
    { id: 'montagem', ico: 'montagem', t: 'Montagens de conjuntos', p: 'Entregamos conjuntos montados, reunindo as peças num só fornecimento.' },
    { id: 'moldes', ico: 'molde', t: 'Confecção de moldes', p: 'Fazemos a ferramenta específica de cada peça, onde o modelo em cera é injetado: o primeiro passo do processo.' },
  ],
};

export const segmentos = {
  intro: 'Com anos de experiência, estamos preparados para atender a diversas áreas e produzir produtos com qualidade.',
  itens: [
    { ico: 'maquina', t: 'Indústrias de máquinas e equipamentos' },
    { ico: 'garrafa', t: 'Máquinas para bebidas' },
    { ico: 'caixa', t: 'Equipamentos de embalagem' },
    { ico: 'capsula', t: 'Equipamentos para indústria farmacêutica' },
    { ico: 'hospital', t: 'Equipamentos hospitalares' },
    { ico: 'medico', t: 'Equipamentos médicos' },
    { ico: 'esteira', t: 'Equipamentos de transporte' },
    { ico: 'trator', t: 'Máquinas agrícolas' },
    { ico: 'caminhao', t: 'Implementos rodoviários' },
    { ico: 'carro', t: 'Linha automotiva' },
  ],
};

export const historia = [
  'Situada na região da serra gaúcha, em Veranópolis, a 167 km de Porto Alegre, com uma área total construída de 2.000 m², a Global Microfusão Ltda trabalha para atender aos mais diversificados segmentos metal-mecânicos com eficiência e competitividade.',
  'A Global trabalha com fundição por cera perdida (investment casting) de aço carbono, aço inoxidável e aços de alta liga.',
  'Para poder atender os clientes de forma competitiva, em janeiro de 2011 a empresa deu início à construção de uma unidade fabril própria e moderna, atendendo aos requisitos de fluxo do processo para minimizar os desperdícios.',
  'Com todo o processo controlado, desde a seleção da matéria-prima até a expedição do produto final, a Global garante que o seu produto atende a todos os requisitos de qualidade.',
  'Para atingir este objetivo, a empresa conta com o seu setor administrativo e técnico totalmente informatizado, permitindo a comunicação entre administração, vendas e produção.',
  'Para ampliar a carteira de clientes e garantir a qualidade de seus produtos, de forma estratégica, a empresa deu início aos trabalhos de adequação e implementação da certificação ISO 9001.',
];

export const marcos = [
  { ano: '2010', t: 'Fundação', p: 'A Global Microfusão Ltda é aberta em Veranópolis, na serra gaúcha.' },
  { ano: '2011', t: 'Fábrica própria', p: 'Em janeiro, começa a construção da unidade fabril própria e moderna, desenhada pelo fluxo do processo.' },
  { ano: '2.000 m²', t: 'Área construída', p: 'Administração, setor técnico e produção informatizados e integrados.' },
  { ano: 'ISO 9001', t: 'Qualidade', p: 'Trabalhos de adequação e implementação da certificação ISO 9001.' },
];

export const numeros = [
  { n: '15+', t: 'anos produzindo microfundidos' },
  { n: '2.000 m²', t: 'de área construída' },
  { n: '13', t: 'etapas controladas' },
  { n: '167 km', t: 'de Porto Alegre' },
];

// As 13 etapas do site atual, na ordem e com o texto original, agrupadas em cinco fases.
export const fases = [
  { id: 'cera', t: 'O modelo em cera', etapas: [
    { ico: 'injecao', t: 'Injeção da cera', p: 'Injeção da peça em cera através de uma ferramenta específica de cada peça.' },
    { ico: 'cacho', t: 'Montagem dos cachos', p: 'Montagem das peças nos cachos em cera.' },
  ] },
  { id: 'casca', t: 'A casca cerâmica', etapas: [
    { ico: 'camadas', t: 'Revestimento cerâmico', p: 'O cacho recebe o revestimento cerâmico, camada por camada.' },
    { ico: 'gota', t: 'Retirada da cera', p: 'A cera é retirada, deixando o molde oco com a forma exata das peças.' },
    { ico: 'chama', t: 'Calcinação', p: 'Calcinação da casca cerâmica.' },
  ] },
  { id: 'metal', t: 'O metal', etapas: [
    { ico: 'panela', t: 'Vazamento', p: 'Recebimento do material líquido.' },
    { ico: 'floco', t: 'Solidificação', p: 'Esfriamento e solidificação.' },
  ] },
  { id: 'peca', t: 'A peça', etapas: [
    { ico: 'martelo', t: 'Quebra da casca', p: 'Quebra e retirada da casca cerâmica.' },
    { ico: 'corte', t: 'Corte do canal', p: 'Retirada das peças presas no canal.' },
    { ico: 'lixa', t: 'Lixamento', p: 'Retirada das marcas de canal através de lixa.' },
    { ico: 'jato', t: 'Jato de granalha', p: 'Acabamento através dos jatos de granalha.' },
  ] },
  { id: 'entrega', t: 'Inspeção e entrega', etapas: [
    { ico: 'lupa', t: 'Inspeção', p: 'Inspeção dimensional e visual das peças.' },
    { ico: 'caixa', t: 'Expedição', p: 'Embalagem, identificação e expedição.' },
  ] },
];

export const fotos = {
  vazamento: 'Metal líquido sendo vazado nos cachos de casca cerâmica',
  cacho: 'Cacho de casca cerâmica incandescente logo após o vazamento',
  panela: 'Panela de vazamento com aço líquido',
  faiscas: 'Fusão do metal com faíscas na fundição',
  'faiscas-perto': 'Metal líquido e faíscas durante a fusão',
  diagrama: 'Esquema da microfusão: cacho em cera, revestimento cerâmico, vazamento e peças prontas',
  'banco-inox': 'Ensaio de material em alta temperatura (foto de banco)',
};
