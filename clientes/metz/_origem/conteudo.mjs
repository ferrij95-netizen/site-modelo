// Textos do site da REM Consultoria Metz. Tudo vem do site atual (metzconsultoria.com.br, lido em 2026-10-09),
// reescrito em tom mais formal. Nada de número, cliente ou serviço que não esteja lá.

export const site = {
  dominio: 'https://metz.overtus.com.br',
  nome: 'REM Consultoria Metz',
  extenso: 'Reestruturação Empresarial Metz',
  razao: 'Christian Metz Consultoria Empresarial LTDA',
  cnpj: '39.149.282/0001-29',
  fone: '(51) 99336-0538',
  zap: '5551993360538',
  email: 'contato@metzconsultoria.com.br',
  atual: 'https://metzconsultoria.com.br/',
  flowmap: 'https://metodoflowmap.admx.tech',
  video: 'https://metzconsultoria.com.br/wp-content/uploads/2025/09/depoimento-cliente-Metz.mp4',
  redes: [
    ['LinkedIn', 'https://br.linkedin.com/in/christian-metz-15637b32'],
    ['Instagram', 'https://instagram.com/rem.christian.metz'],
    ['Facebook', 'https://www.facebook.com/rembrasil20/'],
  ],
};

// [slug, título da aba, descrição]
export const paginas = {
  index: ['REM Consultoria Metz · Reestruturação empresarial com o Sistema Toyota', 'Consultoria em reestruturação empresarial com a metodologia do Sistema Toyota de Produção: eficiência, redução de desperdícios e resultados mensuráveis.'],
  sobre: ['A empresa · REM Consultoria Metz', 'Conheça a REM Consultoria Metz, fundada por Christian Metz: missão, visão e valores de uma consultoria orientada à melhoria contínua.'],
  solucoes: ['Soluções · REM Consultoria Metz', 'Consultoria estratégica, Método FlowMAP, palestras, mentoria, e-book e jogos de excelência operacional.'],
  'solucoes/consultoria-estrategica': ['Consultoria Estratégica · REM Consultoria Metz', 'Construção de uma cultura de alto desempenho fundamentada em método, a partir de um diagnóstico inicial sem compromisso.'],
  'solucoes/metodo-flowmap': ['Método FlowMAP · REM Consultoria Metz', 'O Método FlowMAP conecta o fluxo de valor da operação aos indicadores de lucro da empresa.'],
  'solucoes/palestras': ['Palestras · REM Consultoria Metz', 'Palestras técnicas e estratégicas sobre excelência operacional, ministradas por Christian Metz.'],
  'solucoes/mentoria': ['Mentoria O Próximo Nível · REM Consultoria Metz', 'Acompanhamento direto para profissionais que desejam construir autoridade e posicionamento no mercado.'],
  'solucoes/ebook-lean-manufacturing': ['E-book Lean Manufacturing na Prática · REM Consultoria Metz', 'Guia para lideranças que desejam passar de uma operação reativa a um fluxo de valor otimizado e sustentável.'],
  'solucoes/jogos': ['Jogos de excelência operacional · REM Consultoria Metz', 'Jornada Lean: simulação para que as equipes identifiquem e implementem melhorias em ambiente seguro.'],
  metodologia: ['Metodologia · REM Consultoria Metz', 'Sistema Toyota de Produção aplicado com A3, Kaizen e VSM, em conformidade com a ISO 9001 e os ODS da ONU.'],
  artigos: ['Artigos · REM Consultoria Metz', 'Artigos de Christian Metz sobre gestão, Lean e excelência operacional.'],
  contato: ['Contato · REM Consultoria Metz', 'Solicite um diagnóstico ou fale com a REM Consultoria Metz por telefone, WhatsApp ou e-mail.'],
};

export const menu = [
  ['index', 'Início'],
  ['sobre', 'A empresa'],
  ['solucoes', 'Soluções'],
  ['metodologia', 'Metodologia'],
  ['artigos', 'Artigos'],
  ['contato', 'Contato'],
];

export const inicio = {
  eyebrow: 'Reestruturação Empresarial Metz',
  titulo: 'Transformamos desafios em resultados sustentáveis.',
  lead: 'Consultoria em reestruturação empresarial com a metodologia do Sistema Toyota de Produção. Mais eficiência, menos desperdício e crescimento estruturado, com soluções práticas e resultados mensuráveis.',
  empresaTitulo: 'Consultoria empresarial para resultados de produtividade sustentáveis',
  empresaTexto: [
    'A longevidade e o crescimento de uma empresa dependem da eficiência de seus processos e da clareza de sua gestão.',
    'A REM apoia lideranças, gestores e equipes na conquista de resultados sólidos, mensuráveis e sustentáveis, com estratégia, método e disciplina fundamentados no Sistema Toyota de Produção.',
  ],
  servicosIntro: 'Cada empresa tem uma realidade própria. Por isso, as soluções da REM são construídas a partir das necessidades concretas do negócio, com foco em eficiência operacional, redução de desperdícios e competitividade.',
};

export const pilares = [
  ['Filosofia Toyota aplicada', 'Aplicamos o Sistema Toyota de Produção em sua totalidade, e não como um conjunto de ferramentas isoladas.'],
  ['Conduta de dono', 'Conduzimos cada projeto com o comprometimento e a responsabilidade que dedicaríamos a um negócio próprio.'],
  ['Resultados mensuráveis', 'Cada trabalho é acompanhado por métricas claras e por ganhos tangíveis de produtividade e eficiência.'],
];

// Seis soluções, na ordem do site atual. cta: [rótulo, destino] (destino 'contato' ou URL externa).
export const solucoes = [
  {
    slug: 'consultoria-estrategica', nome: 'Consultoria Estratégica', img: 'christian',
    resumo: 'Construção de uma cultura de alto desempenho fundamentada em método, a partir de um diagnóstico inicial sem compromisso.',
    texto: [
      'A consultoria estratégica da REM tem como objetivo estruturar uma cultura de alto desempenho, sustentada por método e disciplina de gestão.',
      'O trabalho tem início com um diagnóstico sem compromisso, que identifica as prioridades da operação e orienta a aplicação do Sistema Toyota de Produção à realidade da empresa.',
      'A implementação é conduzida em conjunto com a equipe do cliente, com acompanhamento de indicadores desde o início.',
    ],
    cta: ['Solicitar diagnóstico sem compromisso', 'contato'],
  },
  {
    slug: 'metodo-flowmap', nome: 'Método FlowMAP', img: 'flowmap',
    resumo: 'Ferramenta que conecta o fluxo de valor operacional aos indicadores de lucro da empresa.',
    texto: [
      'O Método FlowMAP relaciona o fluxo de valor da operação aos indicadores de lucro do negócio.',
      'Com ele, as decisões de melhoria deixam de ser avaliadas apenas pelo ganho operacional e passam a ser medidas pelo seu efeito sobre o resultado financeiro da empresa.',
    ],
    cta: ['Conhecer o Método FlowMAP', site.flowmap],
  },
  {
    slug: 'palestras', nome: 'Palestras', img: 'palestra',
    resumo: 'Palestras técnicas e estratégicas sobre excelência operacional, ministradas por Christian Metz.',
    texto: [
      'Christian Metz ministra palestras técnicas e estratégicas sobre eficiência de processos e excelência operacional, voltadas a lideranças e equipes.',
      'Na palestra “Uma Nova Visão”, líderes e gestores são convidados a romper com a gestão reativa e a adotar a Excelência Operacional como cultura.',
    ],
    cta: ['Solicitar proposta para a sua empresa', 'contato'],
  },
  {
    slug: 'mentoria', nome: 'Mentoria O Próximo Nível', img: 'mentoria',
    resumo: 'Acompanhamento direto para profissionais que desejam construir autoridade reconhecida e posicionamento sólido no mercado.',
    texto: [
      'A jornada para a excelência exige mais do que conhecimento técnico: exige método, disciplina e uma visão estratégica apurada.',
      'A mentoria “O Próximo Nível” oferece acompanhamento direto de Christian Metz a profissionais que desejam construir autoridade reconhecida e um posicionamento sólido no mercado.',
    ],
    cta: ['Agendar sessão inicial', 'contato'],
  },
  {
    slug: 'ebook-lean-manufacturing', nome: 'E-book Lean Manufacturing na Prática', img: 'ebook',
    resumo: 'Guia para lideranças que desejam passar de uma operação reativa a um fluxo de valor otimizado e sustentável.',
    texto: [
      '“Lean Manufacturing na Prática: como aumentar a eficiência e reduzir desperdícios em processos industriais” é o ponto de partida para a jornada da Excelência Operacional.',
      'O e-book orienta lideranças que desejam deixar uma operação reativa e estruturar um fluxo de valor otimizado e sustentável.',
    ],
    cta: ['Adquirir o e-book', site.flowmap],
  },
  {
    slug: 'jogos', nome: 'Jogos de excelência operacional', img: 'jogo',
    resumo: 'Simulações que permitem às equipes identificar e implementar melhorias em um ambiente seguro e dinâmico.',
    texto: [
      '“Jornada Lean: o desafio da eficiência” é um jogo de simulação que leva os conceitos do Lean para a prática da equipe.',
      'Em um ambiente seguro e dinâmico, os participantes identificam desperdícios, testam melhorias e compreendem seus efeitos no fluxo, antes de aplicá-las na operação.',
    ],
    cta: ['Adquirir o jogo', 'contato'],
  },
];

export const diferenciais = {
  intro: 'A REM não se limita a recomendar: entrega transformação concreta na operação.',
  itens: [
    ['Metodologia Toyota com resultados comprovados', 'Aplicação de ferramentas consagradas do Sistema Toyota de Produção, como A3, Kaizen e VSM.'],
    ['Soluções personalizadas e práticas', 'Trabalho conduzido lado a lado com a equipe do cliente, em vez de soluções genéricas.'],
    ['Gestão alinhada a padrões internacionais', 'Atuação em conformidade com a ISO 9001 e com os Objetivos de Desenvolvimento Sustentável da ONU.'],
  ],
};

// Temas que a REM trata no blog atual (cada um leva ao artigo original).
export const ferramentas = [
  ['VSM', 'Mapeamento do fluxo de valor', 'https://metzconsultoria.com.br/blog/zona-de-excelencia-vsm-mapeamento-fluxo-valor/'],
  ['Hoshin Kanri', 'Desdobramento da estratégia', 'https://metzconsultoria.com.br/blog/zona-de-excelencia-hoshin-kanri-alinhamento-estrategico/'],
  ['SMED', 'Redução do tempo de setup', 'https://metzconsultoria.com.br/blog/zona-de-excelencia-smed-como-reduzir-setups-e-aumentar-a-agilidade-operacional/'],
  ['Andon', 'Gestão visual e resposta imediata', 'https://metzconsultoria.com.br/blog/zona-de-excelencia-andon-lean-accountability/'],
  ['Takt Time', 'Ritmo da produção pela demanda', 'https://metzconsultoria.com.br/blog/takt-time-ritmo-estrategico-producao/'],
  ['8D', 'Resolução estruturada de problemas', 'https://metzconsultoria.com.br/blog/formulario-8d-o-guia-definitivo-para-resolucao-de-problemas/'],
  ['Curva ABC', 'Gestão de estoques', 'https://metzconsultoria.com.br/blog/zona-de-excelencia-curva-abc-logistica/'],
  ['Matriz de Habilidade', 'Competências da equipe', 'https://metzconsultoria.com.br/blog/matriz-de-habilidade-o-mapa-estrategico-da-sua-equipe/'],
];

export const sobre = {
  titulo: 'Reestruturação Empresarial Metz',
  selo: '5 anos crescendo junto com seus clientes',
  h2: 'Desafios empresariais convertidos em resultados sustentáveis',
  texto: [
    'A REM Consultoria Metz nasceu com o propósito de apoiar empresas em momentos de transformação e de crescimento.',
    'Fundada por Christian Metz, com foco em gestão empresarial e melhoria contínua, a REM consolidou-se como parceira estratégica de organizações que buscam eficiência, inovação e resultados sustentáveis de longo prazo.',
    'Entendemos que a consultoria não deve se restringir à teoria. Nosso trabalho é prático, aplicável e orientado a resultados, de modo a gerar valor imediato e sustentável.',
  ],
  missao: 'Transformar negócios por meio de processos enxutos, gestão clara e resultados mensuráveis, em alinhamento com as melhores práticas internacionais e com as necessidades do mercado.',
  visao: 'Ser reconhecida como referência em consultoria empresarial orientada à melhoria contínua e à aplicação disciplinada do Sistema Toyota de Produção.',
  valores: [
    ['Conduta de dono', 'Responsabilidade plena pelos projetos e pelos resultados do cliente.'],
    ['Ética e transparência', 'Relações baseadas em confiança, clareza de comunicação e integridade.'],
    ['Melhoria contínua', 'Aperfeiçoamento constante de processos e resultados, como cultura de trabalho e não como evento isolado.'],
    ['Resultados mensuráveis', 'Ganhos quantificáveis por métricas claras, vinculadas aos objetivos estratégicos.'],
    ['Responsabilidade social e sustentabilidade', 'Atuação consultiva que considera o impacto social e ambiental das decisões.'],
  ],
};

export const depoimento = {
  // Só a primeira frase é citação literal; o restante do depoimento está no vídeo.
  frase: 'Tive o privilégio de trabalhar com o Christian Metz por 4 anos.',
  resumo: 'Leonardo Linhares destaca o comprometimento, a disciplina e o domínio da produção enxuta de Christian Metz, e sua capacidade de transformar conceitos em ação prática.',
  nome: 'Leonardo Linhares',
  cargo: 'Vice-presidente, TW Transportes & Logística Ltda.',
};

export const artigos = [
  ['06/07/2026', 'O Plano de Negócios como Instrumento de Racionalidade Estratégica e Gestão de Performance', 'https://metzconsultoria.com.br/blog/plano-de-negocios-tecnico-academico/'],
  ['01/07/2026', 'Plano de Negócios: a bússola estratégica que rege o seu crescimento', 'https://metzconsultoria.com.br/blog/plano-de-negocios-estrategia-crescimento/'],
  ['25/06/2026', 'Matriz de Habilidade: o mapa estratégico da sua equipe', 'https://metzconsultoria.com.br/blog/matriz-de-habilidade-o-mapa-estrategico-da-sua-equipe/'],
  ['15/06/2026', 'Takt Time: o ritmo estratégico que rege a lucratividade', 'https://metzconsultoria.com.br/blog/takt-time-ritmo-estrategico-producao/'],
  ['13/06/2026', 'Formulário 8D: o guia definitivo para resolução de problemas', 'https://metzconsultoria.com.br/blog/formulario-8d-o-guia-definitivo-para-resolucao-de-problemas/'],
  ['26/05/2026', 'Zona de Excelência VSM: o mapa estratégico que rege a transformação do seu negócio', 'https://metzconsultoria.com.br/blog/zona-de-excelencia-vsm-mapeamento-fluxo-valor/'],
  ['19/05/2026', 'Zona de Excelência Hoshin Kanri: o alinhamento estratégico que conecta a diretoria ao chão de fábrica', 'https://metzconsultoria.com.br/blog/zona-de-excelencia-hoshin-kanri-alinhamento-estrategico/'],
  ['16/05/2026', 'Zona de Excelência Andon: o ritmo da vitória segundo a segundo', 'https://metzconsultoria.com.br/blog/zona-de-excelencia-andon-lean-accountability/'],
  ['06/05/2026', 'Zona de Excelência Curva ABC: transformando a gestão de estoque em lucro real', 'https://metzconsultoria.com.br/blog/zona-de-excelencia-curva-abc-logistica/'],
  ['28/04/2026', 'Zona de Excelência SMED: como reduzir setups e aumentar a agilidade operacional', 'https://metzconsultoria.com.br/blog/zona-de-excelencia-smed-como-reduzir-setups-e-aumentar-a-agilidade-operacional/'],
];

export const chamada = {
  titulo: 'Pronto para transformar sua empresa?',
  texto: 'Da estratégia à operação, desenvolvemos soluções sob medida para elevar a produtividade, reduzir custos e fortalecer a competitividade da sua empresa.',
};
