// Textos da Overtus para construtoras e incorporadoras. As duas versões (A e B) usam os mesmos textos.
// Sem preços, sem clientes, depoimentos ou números inventados. A tabela de disponibilidade é uma demonstração com dados fictícios, identificada como tal.

export default {
  slug: 'construtoras',
  dominio: 'https://construtoras.overtus.com.br',
  segmento: 'Construtoras e incorporadoras',
  curto: 'Construtoras',
  meta: 'Overtus para construtoras e incorporadoras',

  hero: {
    rotulo: 'Overtus para construtoras e incorporadoras',
    titulo: 'Do pré-lançamento à <em>última unidade vendida.</em>',
    tituloSimples: 'Do pré-lançamento à última unidade vendida.',
    lead: 'Sites de empreendimento, captação de contatos, tabela de disponibilidade online e a rotina comercial com corretores e imobiliárias parceiras, organizados por uma equipe especializada em incorporação.',
    vidro: 'Você vê o site de um empreendimento seu pronto, em duas versões, antes de falar de preço.',
  },
  faixa: ['Site de empreendimento', 'Book digital e tour', 'Pré-lançamento', 'Anúncios por empreendimento', 'Tabela de disponibilidade', 'Portal do corretor', 'CRM e painel de vendas'],

  // O que costuma travar as vendas (dores do setor, sem números).
  dores: {
    rotulo: 'O que costuma travar as vendas',
    titulo: 'O empreendimento é bom. O caminho até a venda é que se perde.',
    itens: [
      ['Contatos espalhados', 'Os interessados chegam por portal, WhatsApp, Instagram e plantão, cada um em um lugar. No fim do mês ninguém sabe quantos viraram visita ao decorado.'],
      ['Tabela desatualizada', 'A tabela circula em PDF e planilha. O corretor oferece uma unidade que já foi reservada e a imobiliária parceira trabalha com o preço do mês passado.'],
      ['Anúncio sem página própria', 'A campanha leva para a página inicial da construtora ou para um book pesado, e o interessado desiste antes de achar a planta que procurava.'],
      ['Lançamento sem fila', 'O pré-lançamento não forma uma lista de interessados, e o evento de lançamento depende só do esforço da equipe nos últimos dias.'],
    ],
  },

  // Soluções: cada grupo tem página própria em /solucoes/<slug>/.
  grupos: [
    {
      slug: 'sites',
      nome: 'Sites e empreendimentos',
      titulo: 'Cada empreendimento com a sua própria vitrine.',
      resumo: 'Site institucional da construtora e uma página completa para cada empreendimento, com plantas, localização, book digital, tour e andamento de obra.',
      lead: 'O comprador de imóvel pesquisa muito antes de visitar o decorado. Cada empreendimento ganha uma página feita para responder o que ele procura e levá-lo a falar com um corretor.',
      itens: [
        ['Site institucional', 'A história da construtora, as obras entregues e os empreendimentos organizados por fase: lançamento, em obras e prontos para morar.', ['Empreendimentos por fase e por cidade', 'Obras entregues com fotos reais', 'Versões em outros idiomas quando preciso']],
        ['Página de empreendimento', 'Localização com mapa e pontos próximos, diferenciais, plantas com metragem, galeria, ficha técnica e memorial descritivo, com WhatsApp do plantão em todas as telas.', ['Plantas por tipologia, com metragem', 'Mapa com o entorno do terreno', 'Memorial e ficha técnica para baixar']],
        ['Book digital e tour virtual', 'O book do empreendimento vira uma página leve que abre no celular, com tour 360, vídeos e o decorado virtual incorporados.', ['Abre rápido no celular', 'Tour 360 e vídeo do decorado', 'Link próprio para o corretor enviar']],
        ['Andamento de obra', 'Uma página por empreendimento com as etapas da obra e as fotos de cada mês, para quem já comprou e para quem ainda está decidindo.', ['Etapas com percentual informado pela obra', 'Galeria mensal de fotos', 'Atualização feita pela própria equipe']],
      ],
    },
    {
      slug: 'lancamentos',
      nome: 'Lançamentos e captação',
      titulo: 'Lançamento com fila de interessados antes do evento.',
      resumo: 'Pré-lançamento com lista de espera, anúncios por empreendimento, simulação de financiamento e cada contato registrado com origem e empreendimento.',
      lead: 'O resultado de um lançamento começa semanas antes. Montamos a página de pré-lançamento, as campanhas e a captação para que a equipe chegue ao evento com uma lista de interessados qualificados.',
      itens: [
        ['Pré-lançamento com lista de espera', 'Página de cadastro do futuro empreendimento, com prioridade de escolha, convite para o evento e mensagens de aquecimento para quem se cadastrou.', ['Cadastro com faixa de interesse', 'Convite e lembrete do evento', 'Lista entregue ao comercial antes do lançamento']],
        ['Anúncios por empreendimento', 'Campanhas no Google e nas redes segmentadas por região e perfil de comprador, cada uma levando para a página do empreendimento certo.', ['Campanhas separadas por empreendimento', 'Página de destino própria', 'Custo por contato acompanhado']],
        ['Simulação de financiamento', 'Simulador no site em que o interessado informa valor, entrada e prazo e recebe uma estimativa, e o corretor recebe um contato com essas informações.', ['Estimativa de parcelas na página', 'Contato chega já com as informações', 'Texto de aviso de estimativa revisado']],
        ['Captação por empreendimento', 'Formulários, WhatsApp, portais e plantão registrados no mesmo lugar, cada contato marcado com o empreendimento e o canal de origem.', ['Origem de cada contato registrada', 'Um lugar só para todos os canais', 'Relatório por empreendimento e canal']],
      ],
    },
    {
      slug: 'vendas',
      nome: 'Vendas e parceiros',
      titulo: 'A mesma tabela para toda a força de vendas.',
      resumo: 'Tabela de disponibilidade online, portal do corretor e das imobiliárias parceiras, reserva de unidade e distribuição de contatos entre a equipe.',
      lead: 'Equipe própria, corretores autônomos e imobiliárias parceiras vendendo o mesmo empreendimento precisam enxergar a mesma informação, ao mesmo tempo.',
      itens: [
        ['Tabela de disponibilidade online', 'O espelho de vendas por torre e andar, com cada unidade disponível, reservada ou vendida, atualizado no momento da venda e com acesso controlado.', ['Status de cada unidade em tempo real', 'Condições por unidade', 'Acesso por perfil: equipe, parceiro, diretoria']],
        ['Portal do corretor e das imobiliárias', 'Um acesso único com tabela, book, plantas, imagens, regras de comissão e cadastro de clientes para cada parceiro.', ['Material de venda sempre atualizado', 'Cadastro de cliente pelo parceiro', 'Regras de atendimento claras para todos']],
        ['Reserva de unidade', 'Pedido de reserva feito pelo portal, com prazo definido, aprovação da incorporadora e liberação automática da unidade quando o prazo vence.', ['Prazo de reserva controlado', 'Aprovação pela incorporadora', 'Unidade liberada sem trabalho manual']],
        ['Distribuição de contatos', 'Os contatos novos são distribuídos entre corretores e imobiliárias por regra combinada, com prazo para o primeiro atendimento e redistribuição se ninguém responder.', ['Regra de distribuição combinada', 'Prazo para o primeiro contato', 'Redistribuição automática']],
      ],
    },
    {
      slug: 'comercial',
      nome: 'Comercial e relacionamento',
      titulo: 'Cada contato acompanhado até a assinatura e as chaves.',
      resumo: 'CRM para incorporação, painel do lançamento para a diretoria, atendimento automático no WhatsApp e área do cliente para o pós-venda.',
      lead: 'Site, anúncios e parceiros trazem contatos. A estrutura comercial garante que cada um seja atendido, acompanhado e convertido, e que o comprador continue bem informado até a entrega.',
      itens: [
        ['CRM para incorporação', 'Funil do primeiro contato à visita, à proposta, à assinatura e ao repasse, separado por empreendimento e com a próxima ação de cada corretor.', ['Funil por empreendimento', 'Histórico de cada interessado', 'Tarefas e lembretes para a equipe']],
        ['Painel do lançamento', 'Contatos, visitas, propostas, reservas e vendas por empreendimento e por canal, em uma tela que a diretoria acompanha semana a semana.', ['Visão por empreendimento e canal', 'Acesso pelo computador e pelo celular', 'Indicadores combinados com a diretoria']],
        ['Atendimento automático no WhatsApp', 'Agente treinado com as informações do empreendimento, que responde dúvidas de planta, localização e condições a qualquer hora e agenda a visita ao decorado.', ['Responde fora do horário do plantão', 'Agenda visita ao decorado', 'Passa a conversa ao corretor']],
        ['Área do cliente', 'Depois da assinatura, o comprador acompanha a obra, recebe comunicados, acessa documentos e agenda a vistoria e a entrega das chaves.', ['Andamento de obra e comunicados', 'Documentos em um só lugar', 'Agendamento de vistoria e entrega']],
      ],
    },
  ],

  // Jornada do empreendimento: seção visual, um "prédio" que sobe a cada fase.
  jornada: {
    rotulo: 'Do pré-lançamento às chaves',
    titulo: 'Uma estrutura para cada fase do empreendimento.',
    lead: 'O que o comprador precisa ver muda ao longo da vida do empreendimento. A estrutura comercial acompanha cada fase, do cadastro de interessados à entrega das chaves.',
    fases: [
      ['Pré-lançamento', 'Formar a fila de interessados antes do evento.', ['Página de cadastro', 'Lista de espera', 'Anúncios de aquecimento']],
      ['Lançamento', 'Apresentar o empreendimento e levar ao decorado.', ['Site do empreendimento', 'Book digital e tour', 'Agenda de visitas']],
      ['Vendas', 'Dar a toda a força de vendas a mesma informação.', ['Tabela de disponibilidade', 'Portal do corretor', 'Reservas e CRM']],
      ['Obras', 'Manter quem comprou seguro da decisão.', ['Andamento de obra', 'Comunicados', 'Fotos mensais']],
      ['Entrega', 'Encerrar bem e começar o próximo lançamento.', ['Área do cliente', 'Vistoria e chaves', 'Pedido de indicação']],
    ],
  },

  demo: {
    rotulo: 'Demonstração',
    titulo: 'A tabela de disponibilidade, como o corretor vê.',
    lead: 'Toque em uma unidade para ver os detalhes. No sistema real, a reserva feita aqui aparece na hora para a equipe, para os parceiros e para a diretoria.',
    aviso: 'Demonstração com dados fictícios. Nenhum empreendimento real é representado.',
  },

  diferencial: {
    rotulo: 'Como começamos',
    titulo: 'Você vê o site de um empreendimento seu pronto antes de falar de preço.',
    texto: 'Escolhemos um empreendimento da sua carteira e montamos duas versões completas: o site da construtora e a página do empreendimento, com as plantas, as fotos e a identidade reais. As duas ficam no ar em um link de prévia para você e a sua equipe comercial navegarem.',
    pontos: [
      ['Um empreendimento real', 'Plantas, fotos e textos do seu próprio lançamento.'],
      ['Duas versões', 'Coerentes com a sua marca, em estilos diferentes.'],
      ['No ar', 'Um link para abrir no computador e no celular.'],
    ],
  },

  etapas: [
    ['Estudo', 'Analisamos o site atual, os empreendimentos em carteira, os canais de venda e como corretores e imobiliárias trabalham hoje.', 'Reunião de 30 minutos e acesso ao material de um empreendimento.'],
    ['Duas versões no ar', 'Desenhamos o site da construtora e a página de um empreendimento, em duas versões, e publicamos cada uma em um link de prévia.', 'Links para abrir no computador e no celular.'],
    ['Escolha e ajustes', 'Você escolhe a versão, a equipe comercial opina e aprovamos página por página. Só então conversamos sobre o projeto.', 'Lista de ajustes acompanhada até a aprovação.'],
    ['Publicação e integração', 'Site no seu domínio, páginas de empreendimento, anúncios, tabela, portal e CRM configurados e ligados entre si.', 'Contatos chegando no lugar certo, com origem registrada.'],
    ['Acompanhamento por lançamento', 'Cada novo empreendimento ganha a sua página, as suas campanhas e o seu painel, no mesmo padrão.', 'Relatório por empreendimento e ajustes de campanha.'],
  ],

  paraQuem: {
    rotulo: 'Para quem',
    titulo: 'Quem vende imóvel na planta, em obra ou pronto.',
    itens: [
      ['Incorporadoras', 'Lançamentos residenciais e comerciais com força de vendas própria e parceira.'],
      ['Construtoras residenciais', 'Empresas que constroem e vendem os próprios empreendimentos.'],
      ['Loteadoras e urbanizadoras', 'Loteamentos e condomínios horizontais com mapa de lotes no lugar da tabela de unidades.'],
      ['Construtoras de obras corporativas', 'Site institucional com portfólio de obras, capacidade técnica e pedido de orçamento.'],
      ['Imobiliárias de lançamentos', 'Imobiliárias que vendem empreendimentos de várias incorporadoras.'],
    ],
  },

  faq: [
    ['Preciso de um site novo para cada empreendimento?', 'Não necessariamente. Cada empreendimento ganha uma página completa dentro do site da construtora, e pode ter um endereço próprio para anúncios e materiais quando fizer sentido.'],
    ['Quem atualiza a tabela de disponibilidade?', 'A própria equipe comercial, pelo sistema, no momento da reserva ou da venda. A atualização aparece na hora para todos que têm acesso.'],
    ['Vocês substituem o CRM que já usamos?', 'Só se for o melhor caminho. Quando a empresa já tem um CRM que funciona, ligamos o site, os anúncios e o portal a ele.'],
    ['Os contatos dos portais imobiliários entram no mesmo lugar?', 'Sim, sempre que o portal permite o envio dos contatos, eles entram no mesmo CRM com a origem registrada.'],
    ['Já temos agência de marketing. Faz sentido?', 'Faz. Podemos cuidar do site, da tabela, do portal e da estrutura comercial e trabalhar junto com a agência que cuida da comunicação.'],
    ['E se o empreendimento ainda não tem imagens?', 'Começamos pelo pré-lançamento, com a página de cadastro e o que já está aprovado, e completamos a página conforme o material fica pronto.'],
  ],

  chamada: {
    titulo: 'O próximo lançamento começa pelo site.',
    texto: 'Agende uma conversa com a nossa equipe. Olhamos o seu site, os seus empreendimentos e a sua rotina de vendas e apresentamos um plano objetivo para o próximo lançamento.',
    nota: 'Conversa sem compromisso, por vídeo.',
  },

  menu: [
    ['solucoes', 'Soluções'],
    ['jornada', 'Do lançamento às chaves'],
    ['como-trabalhamos', 'Como trabalhamos'],
    ['perguntas', 'Perguntas'],
    ['contato', 'Contato'],
  ],

  paginas: {
    index: ['Overtus para construtoras e incorporadoras', 'Sites de empreendimento, pré-lançamento, tabela de disponibilidade online, portal do corretor e CRM para construtoras e incorporadoras. Você vê o site pronto antes de falar de preço.'],
    solucoes: ['Soluções para construtoras e incorporadoras · Overtus', 'Sites e páginas de empreendimento, lançamentos e captação, tabela de disponibilidade e portal do corretor, CRM e relacionamento com o comprador.'],
    'solucoes/sites': ['Sites e páginas de empreendimento · Overtus', 'Site institucional da construtora e página completa para cada empreendimento: plantas, localização, book digital, tour virtual e andamento de obra.'],
    'solucoes/lancamentos': ['Lançamentos e captação de contatos · Overtus', 'Pré-lançamento com lista de espera, anúncios por empreendimento, simulação de financiamento e captação com origem registrada.'],
    'solucoes/vendas': ['Tabela de disponibilidade e portal do corretor · Overtus', 'Espelho de vendas online, portal para corretores e imobiliárias parceiras, reserva de unidade e distribuição de contatos.'],
    'solucoes/comercial': ['CRM e relacionamento para incorporação · Overtus', 'CRM do primeiro contato ao repasse, painel do lançamento, atendimento automático no WhatsApp e área do cliente no pós-venda.'],
    jornada: ['Do pré-lançamento às chaves · Overtus', 'A estrutura comercial de um empreendimento em cada fase: pré-lançamento, lançamento, vendas, obras e entrega.'],
    'como-trabalhamos': ['Como trabalhamos com construtoras · Overtus', 'Estudo, duas versões no ar com um empreendimento real seu, escolha e ajustes, publicação e acompanhamento por lançamento.'],
    perguntas: ['Perguntas frequentes · Overtus para construtoras', 'Respostas sobre sites de empreendimento, tabela de disponibilidade, CRM, portais imobiliários e trabalho com a sua agência.'],
    contato: ['Agendar conversa · Overtus para construtoras', 'Agende uma conversa com a Overtus. Olhamos o seu site, os seus empreendimentos e a sua rotina de vendas.'],
  },
};
