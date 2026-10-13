// Textos da Overtus para indústrias (primeira versão, mais curta que a de construtoras). Mesmas regras: sem preços, sem clientes ou números inventados.
// O portfólio são os estudos de redesenho do site da agência, com a mesma legenda obrigatória.

export default {
  slug: 'industrias',
  dominio: 'https://industrias.overtus.com.br',
  segmento: 'Indústrias',
  curto: 'Indústrias',
  meta: 'Overtus para indústrias',

  hero: {
    rotulo: 'Overtus para indústrias',
    titulo: 'O tamanho da sua fábrica, <em>visível no site.</em>',
    tituloSimples: 'O tamanho da sua fábrica, visível no site.',
    lead: 'Sites institucionais com estrutura, produtos e certificações, catálogo com pedido de cotação, portal para representantes e a rotina comercial que transforma cotação em pedido.',
    vidro: 'Você vê o novo site da sua indústria pronto, em duas versões, antes de falar de preço.',
  },
  faixa: ['Site institucional', 'Catálogo técnico', 'Pedido de cotação', 'Três idiomas', 'Portal de representantes', 'Feiras e prospecção', 'CRM e painel comercial'],

  dores: {
    rotulo: 'O que costuma travar as vendas',
    titulo: 'A fábrica é grande. O site ainda não mostra isso.',
    itens: [
      ['Site que não mostra a operação', 'O comprador não vê o parque fabril, as certificações e a capacidade de entrega, e compara a sua indústria com um revendedor.'],
      ['Catálogo em PDF', 'A linha de produtos está em um arquivo pesado, sem busca, e o pedido de cotação depende de e-mail e telefone.'],
      ['Representantes sem material', 'Cada representante trabalha com uma versão diferente de tabela, catálogo e apresentação.'],
      ['Comprador estrangeiro sem idioma', 'A empresa exporta ou quer exportar, mas o site só existe em português.'],
    ],
  },

  grupos: [
    {
      slug: 'sites',
      nome: 'Site institucional',
      titulo: 'A indústria apresentada como ela é.',
      resumo: 'Site com a história, o parque fabril, as certificações, os setores atendidos e as linhas de produto, em português, inglês e espanhol quando a empresa vende para fora.',
      lead: 'Cada site é desenhado a partir da identidade real da indústria: logo, cores, fotos da fábrica e produtos. Nada de modelo pronto com o nome trocado.',
      itens: [
        ['Estrutura e capacidade', 'Páginas para o parque fabril, os equipamentos, as certificações e a capacidade produtiva, com fotos reais da operação.', ['Fotos da fábrica e dos processos', 'Certificações em destaque', 'Setores e aplicações atendidos']],
        ['Processo produtivo', 'As etapas de produção apresentadas de forma visual, do recebimento da matéria-prima à expedição.', ['Etapas ilustradas', 'Controle de qualidade explicado', 'Vídeo da operação quando houver']],
        ['Três idiomas', 'Versões em português, inglês e espanhol com tradução revisada, para compradores e distribuidores de outros países.', ['Troca de idioma em todas as páginas', 'Textos técnicos revisados', 'Endereços próprios por idioma']],
      ],
    },
    {
      slug: 'catalogo',
      nome: 'Catálogo e cotação',
      titulo: 'O comprador encontra o produto e pede a cotação no mesmo lugar.',
      resumo: 'Catálogo com busca, filtros e ficha técnica, em que o comprador monta uma lista e envia o pedido de cotação direto ao comercial.',
      lead: 'O catálogo em PDF vira um catálogo navegável, com uma página para cada produto e um caminho curto até o pedido de cotação.',
      itens: [
        ['Catálogo técnico', 'Linhas e produtos com busca, filtros, ficha técnica, desenhos e documentos para baixar.', ['Busca por código e aplicação', 'Ficha técnica em cada produto', 'Documentos para baixar']],
        ['Pedido de cotação', 'O comprador monta a lista de itens e quantidades e envia o pedido, que chega ao comercial por e-mail ou WhatsApp.', ['Lista de cotação em poucos cliques', 'Pedido com dados da empresa', 'Entrega por e-mail ou WhatsApp']],
      ],
    },
    {
      slug: 'representantes',
      nome: 'Representantes e prospecção',
      titulo: 'Representantes e distribuidores com a mesma informação.',
      resumo: 'Portal para representantes com tabela, catálogo e materiais, listas de prospecção por segmento e estrutura para feiras.',
      lead: 'A venda industrial passa por representantes, distribuidores e feiras. Organizamos o material e os contatos de cada um desses canais.',
      itens: [
        ['Portal de representantes', 'Acesso com tabela, catálogo, apresentações e cadastro de clientes para cada representante.', ['Material sempre atualizado', 'Acesso por representante', 'Cadastro de clientes pelo portal']],
        ['Prospecção por segmento', 'Listas de empresas do segmento e da região atendidos, com contatos e roteiro de abordagem.', ['Listas por segmento e região', 'Roteiro de ligação e de mensagem', 'Registro de cada tentativa no CRM']],
        ['Feiras', 'Página da feira, agenda de reuniões no estande e cadastro dos visitantes direto no CRM.', ['Agenda de reuniões no estande', 'Cadastro de visitantes', 'Retorno organizado depois da feira']],
      ],
    },
    {
      slug: 'comercial',
      nome: 'Estrutura comercial',
      titulo: 'Cada cotação acompanhada até o pedido.',
      resumo: 'CRM para venda técnica, painel comercial e atendimento automático para que nenhuma cotação fique sem resposta.',
      lead: 'Site, catálogo e representantes trazem cotações. A estrutura comercial garante que cada uma tenha resposta, acompanhamento e retorno.',
      itens: [
        ['CRM para venda técnica', 'Cotações, propostas e pedidos organizados em etapas, com histórico de cada cliente e a próxima ação de cada vendedor.', ['Funil por linha de produto', 'Histórico de cada cliente', 'Lembretes de retorno']],
        ['Painel comercial', 'Cotações novas, propostas em andamento e pedidos da semana em uma tela para a diretoria.', ['Visão da semana em uma tela', 'Por linha, região e representante', 'Acesso pelo celular']],
      ],
    },
  ],

  jornada: {
    rotulo: 'Do primeiro contato ao pedido recorrente',
    titulo: 'Uma estrutura para cada etapa da venda industrial.',
    lead: 'O comprador industrial pesquisa, compara, pede cotação e só depois fecha. Cada etapa precisa de uma resposta clara da sua empresa.',
    fases: [
      ['Pesquisa', 'Ser encontrado por quem procura o que você fabrica.', ['Site institucional', 'Busca no Google', 'Três idiomas']],
      ['Avaliação', 'Mostrar estrutura, qualidade e capacidade.', ['Parque fabril', 'Certificações', 'Processo produtivo']],
      ['Cotação', 'Encurtar o caminho até o pedido de preço.', ['Catálogo técnico', 'Lista de cotação', 'WhatsApp do comercial']],
      ['Pedido', 'Responder rápido e acompanhar cada proposta.', ['CRM', 'Lembretes de retorno', 'Painel comercial']],
      ['Recompra', 'Manter o cliente comprando de novo.', ['Portal do cliente', 'Comunicados técnicos', 'Novos produtos']],
    ],
  },

  demo: null,

  diferencial: {
    rotulo: 'Como começamos',
    titulo: 'Você vê o novo site da sua indústria pronto antes de falar de preço.',
    texto: 'Estudamos a sua empresa e o seu site atual e montamos duas versões completas do novo site, com o seu logo, as suas cores, as fotos da fábrica e os seus produtos. As duas ficam no ar em um link de prévia.',
    pontos: [
      ['Identidade real', 'Logo, cores, fotos e produtos da sua indústria.'],
      ['Duas versões', 'Coerentes com a sua marca, em estilos diferentes.'],
      ['No ar', 'Um link para abrir no computador e no celular.'],
    ],
  },

  etapas: [
    ['Estudo', 'Analisamos a empresa, o site atual, as linhas de produto e como o comprador chega até vocês.', 'Reunião de 30 minutos e acesso ao material que você já tem.'],
    ['Duas versões no ar', 'Desenhamos duas versões completas do novo site e publicamos cada uma em um link de prévia.', 'Links para abrir no computador e no celular.'],
    ['Escolha e ajustes', 'Você escolhe a versão, pede os ajustes e aprova cada página.', 'Lista de ajustes acompanhada até a aprovação.'],
    ['Publicação', 'Site no seu domínio, com catálogo, idiomas, busca do Google e medição de contatos.', 'Cotações chegando no lugar certo.'],
    ['Acompanhamento', 'Atualizamos o catálogo, cuidamos dos anúncios e organizamos a rotina comercial.', 'Pedidos atendidos por mensagem e relatório de cotações.'],
  ],

  paraQuem: {
    rotulo: 'Para quem',
    titulo: 'Indústrias que vendem para outras empresas.',
    itens: [
      ['Metalmecânica', 'Usinagem, caldeiraria, estruturas e equipamentos.'],
      ['Agroindústria', 'Beneficiamento, alimentos, genética e insumos.'],
      ['Plásticos e químicos', 'Embalagens, masterbatch, resinas e produtos químicos.'],
      ['Indústria médica', 'Equipamentos e materiais para hospitais e clínicas.'],
      ['Engenharia e montagem', 'Montagem industrial, manutenção e automação.'],
    ],
  },

  // Estudos de redesenho (mesmos do site da agência): [img, segmento, texto].
  projetos: [
    ['p-texian', 'Engenharia e montagem industrial', 'Site institucional com vídeo de abertura, áreas de atuação e dezenas de páginas internas.'],
    ['p-instor', 'Robótica móvel', 'Site em português, inglês e espanhol com soluções organizadas por aplicação.'],
    ['p-engenho-am', 'Beneficiamento de arroz', 'Site com a linha de beneficiamento apresentada etapa por etapa.'],
    ['p-sulpol', 'Plásticos e masterbatch', 'Catálogo de produtos com páginas por linha e pedido de orçamento.'],
    ['p-vordex', 'Fabricação e manutenção industrial', 'Site com serviços, estrutura própria e pedido de orçamento.'],
    ['p-toniolo', 'Rejeitos, barragens e dragagem', 'Site em três idiomas com soluções, números da operação e catálogo.'],
  ],
  legendaProjetos: 'Projetos desenvolvidos pela Overtus como estudos de redesenho. Marcas e conteúdos pertencem às respectivas empresas. A apresentação não indica relação comercial.',

  faq: [
    ['O catálogo em PDF pode virar catálogo no site?', 'Sim. Partimos do catálogo atual, organizamos as linhas e criamos uma página por produto, com ficha técnica e pedido de cotação.'],
    ['Vocês fazem o site em inglês e espanhol?', 'Sim, com tradução revisada dos textos técnicos e troca de idioma em todas as páginas.'],
    ['Precisamos fotografar a fábrica?', 'Usamos as fotos que a empresa já tem. Quando faltar alguma, indicamos o que vale fotografar e dizemos onde a imagem é provisória.'],
  ],

  chamada: {
    titulo: 'Estrutura comercial para quem vende de verdade.',
    texto: 'Agende uma conversa com a nossa equipe. Avaliamos o seu site e a sua presença comercial e apresentamos um plano objetivo de melhoria.',
    nota: 'Conversa sem compromisso, por vídeo.',
  },

  menu: [
    ['solucoes', 'Soluções'],
    ['jornada', 'Da pesquisa ao pedido'],
    ['como-trabalhamos', 'Como trabalhamos'],
    ['perguntas', 'Perguntas'],
    ['contato', 'Contato'],
  ],

  paginas: {
    index: ['Overtus para indústrias', 'Sites institucionais, catálogo com pedido de cotação, portal de representantes e estrutura comercial para indústrias. Você vê o site pronto antes de falar de preço.'],
    solucoes: ['Soluções para indústrias · Overtus', 'Site institucional em três idiomas, catálogo técnico e cotação, portal de representantes, prospecção, feiras e CRM para venda técnica.'],
    'solucoes/sites': ['Site institucional para indústrias · Overtus', 'Parque fabril, certificações, processo produtivo e linhas de produto, em português, inglês e espanhol.'],
    'solucoes/catalogo': ['Catálogo e cotação para indústrias · Overtus', 'Catálogo técnico com busca, filtros e ficha técnica e pedido de cotação direto ao comercial.'],
    'solucoes/representantes': ['Representantes e prospecção · Overtus', 'Portal de representantes, listas de prospecção por segmento e estrutura para feiras.'],
    'solucoes/comercial': ['Estrutura comercial para indústrias · Overtus', 'CRM para venda técnica e painel comercial para acompanhar cada cotação até o pedido.'],
    jornada: ['Da pesquisa ao pedido · Overtus', 'A estrutura comercial de uma indústria em cada etapa: pesquisa, avaliação, cotação, pedido e recompra.'],
    'como-trabalhamos': ['Como trabalhamos com indústrias · Overtus', 'Estudo, duas versões completas no ar, escolha e ajustes, publicação e acompanhamento.'],
    perguntas: ['Perguntas frequentes · Overtus para indústrias', 'Respostas sobre catálogo, idiomas, fotos da fábrica e o trabalho da Overtus com indústrias.'],
    contato: ['Agendar conversa · Overtus para indústrias', 'Agende uma conversa com a Overtus. Avaliamos o seu site e a sua presença comercial.'],
  },
};
