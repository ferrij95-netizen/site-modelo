// Textos da Overtus para indústrias. Mesmas regras de construtoras: sem preços, sem clientes ou números inventados.
// A versão em inglês (conteudo-industrias-en.mjs) tem as mesmas chaves e é pensada para oficinas de usinagem e indústrias dos EUA.
// A demonstração de cotação usa produtos fictícios, com aviso na tela.
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
        ['Qualidade e certificações', 'Uma página para o sistema de qualidade: certificações, controle, ensaios e políticas, com os certificados para baixar.', ['Certificados para baixar', 'Controle de qualidade explicado', 'Políticas e normas atendidas']],
        ['Encontrado no Google', 'Títulos, descrições e uma página por linha de produto, para aparecer quando o comprador pesquisa o que você fabrica.', ['Página por produto e aplicação', 'Imagem de compartilhamento em todas as páginas', 'Leve no celular']],
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
        ['Desenho anexado', 'Para peças sob encomenda, o comprador anexa o desenho ou o modelo 3D junto com o pedido, e o comercial recebe tudo de uma vez.', ['Arquivos PDF, DWG, DXF e STEP', 'Quantidade e prazo desejados', 'Material e acabamento']],
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
        ['Atendimento automático', 'Um agente treinado com os produtos da empresa responde dúvidas frequentes no site e no WhatsApp, inclusive fora do horário, e passa o contato para o comercial.', ['Treinado com o catálogo da empresa', 'Atende fora do horário comercial', 'Encaminha para o vendedor certo']],
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

  // Demonstração do catálogo com lista de cotação: produtos fictícios.
  demo: {
    tipo: 'cotacao',
    rotulo: 'Demonstração',
    titulo: 'Catálogo com lista de cotação, como o comprador usa.',
    lead: 'Busque, filtre por linha, monte a lista com as quantidades e anexe um desenho. No site real, o pedido chega ao comercial com os dados da empresa compradora.',
    aviso: 'Demonstração com produtos e códigos fictícios. Nenhum dado ou arquivo sai desta página.',
    catalogo: 'Catálogo de produtos',
    linhas: [['flanges', 'Flanges'], ['buchas', 'Buchas e mancais'], ['polias', 'Polias'], ['eixos', 'Eixos e pinos'], ['suportes', 'Suportes']],
    produtos: [
      ['FL-150', 'Flange cega', 'flanges', 'Aço carbono · 4" · classe 150', 'flange'],
      ['FL-310', 'Flange de pescoço', 'flanges', 'Aço inox 316 · 2" · classe 300', 'flange'],
      ['BU-120', 'Bucha de bronze', 'buchas', 'Bronze TM-23 · Ø 40 x 50 mm', 'bucha'],
      ['MC-205', 'Mancal bipartido', 'buchas', 'Ferro fundido · eixo de 50 mm', 'anel'],
      ['PO-2A', 'Polia em V, dois canais', 'polias', 'Ferro fundido · perfil A · Ø 150 mm', 'polia'],
      ['PO-3B', 'Polia em V, três canais', 'polias', 'Ferro fundido · perfil B · Ø 200 mm', 'polia'],
      ['EX-450', 'Eixo retificado', 'eixos', 'Aço 1045 · Ø 30 x 450 mm', 'eixo'],
      ['PN-012', 'Pino guia', 'eixos', 'Aço temperado · Ø 12 x 60 mm', 'eixo'],
      ['SP-90', 'Suporte em L', 'suportes', 'Aço carbono zincado · 90 x 90 mm', 'suporte'],
      ['SP-140', 'Suporte de fixação reforçado', 'suportes', 'Aço carbono pintado · 140 x 100 mm', 'suporte'],
    ],
    tx: {
      produtos: 'produtos', linhas: 'linhas', busca: 'Buscar por código, nome ou material', filtro: 'Linhas de produto', todas: 'Todas',
      adicionar: 'Adicionar', naLista: 'Na lista', remover: 'Remover', qtd: 'Quantidade', nada: 'Nenhum produto encontrado.',
      lista: 'Lista de cotação', itens: 'itens', vazia: 'Adicione produtos do catálogo para montar o pedido.',
      anexar: 'Anexar desenho', formatos: '.pdf,.dwg,.dxf,.step,.stp,.igs,.iges', formatosTx: 'PDF, DWG, DXF ou STEP', arquivos: 'arquivo(s) anexado(s)',
      enviar: 'Enviar pedido de cotação',
      enviado: 'Pedido montado nesta demonstração. No site real, ele chega ao comercial por e-mail ou WhatsApp com a lista, as quantidades e os anexos.',
    },
  },

  // O site por dentro: as páginas de um site industrial e o que entra em cada uma.
  anatomia: {
    rotulo: 'O site por dentro',
    titulo: 'O que entra no site de uma indústria.',
    lead: 'Cada página responde a uma pergunta que o comprador faz antes de pedir preço. Escolha uma página para ver o que vai nela.',
    dominio: 'suaindustria.com.br',
    porqueRotulo: 'Por que importa',
    paginas: [
      ['Início', '/', 'Quem é a empresa, o que fabrica e para quem, em uma tela, com o caminho para a cotação sempre à vista.', ['Abertura com foto ou vídeo da fábrica', 'Linhas de produto', 'Setores atendidos', 'Certificações', 'Pedido de cotação'], 'É a página que o comprador abre primeiro, muitas vezes no celular, para decidir se continua.'],
      ['Empresa', '/empresa', 'A história, os marcos, a liderança e onde a fábrica fica.', ['História e marcos', 'Missão e valores', 'Liderança e equipe', 'Localização e mapa'], 'O comprador industrial quer saber com quem está negociando antes de mandar um pedido.'],
      ['Estrutura', '/estrutura', 'O parque fabril com fotos reais, os equipamentos e a capacidade produtiva.', ['Galeria da fábrica', 'Lista de equipamentos', 'Capacidade produtiva', 'Processo produtivo em etapas'], 'Mostra que a empresa tem condição de entregar o volume e o prazo que o comprador precisa.'],
      ['Produtos', '/produtos', 'O catálogo organizado por linha, com busca, ficha técnica e cotação em cada produto.', ['Linhas de produto', 'Busca e filtros', 'Ficha técnica e documentos', 'Botão de cotação'], 'Cada produto com página própria também aparece no Google para quem procura por ele.'],
      ['Qualidade', '/qualidade', 'O sistema de qualidade, as certificações, os ensaios e as políticas da empresa.', ['Certificações', 'Controle e ensaios', 'Certificados para baixar', 'Políticas'], 'Em muitas compras, a certificação é requisito para entrar na lista de fornecedores.'],
      ['Idiomas', '/en', 'O mesmo site em inglês e espanhol, com os textos técnicos traduzidos e o contato para distribuidores.', ['Troca de idioma no topo', 'Textos técnicos traduzidos', 'Contato para distribuidores'], 'O comprador de fora decide em poucos segundos se a empresa consegue atendê-lo.'],
      ['Contato', '/contato', 'Os caminhos para falar com o comercial, o endereço e o trabalhe conosco.', ['Formulário de cotação com anexo', 'WhatsApp do comercial', 'Endereço e mapa', 'Trabalhe conosco'], 'Cada contato chega ao lugar certo, com a origem registrada.'],
    ],
  },

  // Página de setores: o que o comprador de cada setor procura e o que o site mostra.
  setores: {
    rotulo: 'Setores',
    titulo: 'Cada setor compra de um jeito.',
    lead: 'O comprador de uma usinagem procura coisas diferentes do comprador de uma agroindústria. O site mostra primeiro o que pesa na decisão de cada setor.',
    procuraRotulo: 'O que o comprador procura',
    mostraRotulo: 'O que o site mostra',
    itens: [
      ['Metalmecânica e usinagem', 'Capacidade das máquinas, tolerâncias, materiais trabalhados e prazo de entrega.', ['Lista de equipamentos', 'Peças já produzidas', 'Materiais e tolerâncias', 'Cotação com desenho anexado']],
      ['Agroindústria', 'Origem, qualidade do produto, capacidade de entrega e representantes na região.', ['Processo do campo à expedição', 'Certificações e laudos', 'Representantes por região', 'Versão em inglês e espanhol']],
      ['Plásticos e químicos', 'Ficha técnica, aplicações, documentação de segurança e lote mínimo.', ['Catálogo por aplicação', 'Fichas técnicas e de segurança', 'Pedido de amostra', 'Pedido de cotação']],
      ['Indústria médica', 'Registros, rastreabilidade, distribuidores e suporte técnico.', ['Registros e certificações', 'Catálogo para hospitais e revendas', 'Rede de distribuidores', 'Material técnico para baixar']],
      ['Engenharia e montagem', 'Obras realizadas, equipe técnica, segurança e capacidade de mobilização.', ['Obras e projetos realizados', 'Áreas de atuação', 'Segurança e normas', 'Trabalhe conosco']],
      ['Máquinas e equipamentos', 'Modelos, especificações, assistência técnica e peças de reposição.', ['Página por máquina', 'Vídeos de funcionamento', 'Assistência e peças', 'Representantes e revendas']],
    ],
  },

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
      ['Máquinas e equipamentos', 'Fabricantes de máquinas, implementos e linhas industriais.'],
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
    ['O pedido de cotação chega para quem?', 'Para quem a empresa definir: o e-mail do comercial, o WhatsApp de um vendedor ou o CRM. Cada pedido chega com a lista de itens, as quantidades, os anexos e os dados de quem pediu.'],
    ['Dá para separar os pedidos por representante ou região?', 'Sim. O pedido pode ser encaminhado pelo estado ou pela região de quem pediu, e cada representante vê os seus contatos no portal.'],
    ['Vocês mantêm o nosso logo e as nossas cores?', 'Sim. O novo site parte da identidade atual da indústria: logo, cores, fontes, fotos e produtos. Se o site atual tem uma estrutura que o cliente conhece, ela é mantida e melhorada.'],
    ['Quanto tempo leva para ver as duas versões?', 'Depois da conversa e do acesso ao material da empresa, as duas versões ficam no ar em um link de prévia para você navegar no computador e no celular.'],
    ['E depois que o site estiver no ar?', 'Seguimos cuidando: atualização do catálogo, novas páginas, anúncios e a rotina comercial. Os pedidos de ajuste são feitos por mensagem.'],
  ],

  chamada: {
    titulo: 'Estrutura comercial para quem vende de verdade.',
    texto: 'Agende uma conversa com a nossa equipe. Avaliamos o seu site e a sua presença comercial e apresentamos um plano objetivo de melhoria.',
    nota: 'Conversa sem compromisso, por vídeo.',
  },

  menu: [
    ['solucoes', 'Soluções'],
    ['setores', 'Setores'],
    ['jornada', 'Da pesquisa ao pedido'],
    ['como-trabalhamos', 'Como trabalhamos'],
    ['contato', 'Contato'],
  ],

  paginas: {
    index: ['Overtus para indústrias', 'Sites institucionais, catálogo com pedido de cotação, portal de representantes e estrutura comercial para indústrias. Você vê o site pronto antes de falar de preço.'],
    solucoes: ['Soluções para indústrias · Overtus', 'Site institucional em três idiomas, catálogo técnico e cotação, portal de representantes, prospecção, feiras e CRM para venda técnica.'],
    'solucoes/sites': ['Site institucional para indústrias · Overtus', 'Parque fabril, certificações, processo produtivo e linhas de produto, em português, inglês e espanhol.'],
    'solucoes/catalogo': ['Catálogo e cotação para indústrias · Overtus', 'Catálogo técnico com busca, filtros e ficha técnica e pedido de cotação direto ao comercial.'],
    'solucoes/representantes': ['Representantes e prospecção · Overtus', 'Portal de representantes, listas de prospecção por segmento e estrutura para feiras.'],
    'solucoes/comercial': ['Estrutura comercial para indústrias · Overtus', 'CRM para venda técnica e painel comercial para acompanhar cada cotação até o pedido.'],
    setores: ['Setores industriais · Overtus', 'O que o comprador de cada setor procura e o que o site da indústria mostra: metalmecânica, agroindústria, plásticos, indústria médica, engenharia e máquinas.'],
    jornada: ['Da pesquisa ao pedido · Overtus', 'A estrutura comercial de uma indústria em cada etapa: pesquisa, avaliação, cotação, pedido e recompra.'],
    'como-trabalhamos': ['Como trabalhamos com indústrias · Overtus', 'Estudo, duas versões completas no ar, escolha e ajustes, publicação e acompanhamento.'],
    perguntas: ['Perguntas frequentes · Overtus para indústrias', 'Respostas sobre catálogo, idiomas, fotos da fábrica e o trabalho da Overtus com indústrias.'],
    contato: ['Agendar conversa · Overtus para indústrias', 'Agende uma conversa com a Overtus. Avaliamos o seu site e a sua presença comercial.'],
  },
};
