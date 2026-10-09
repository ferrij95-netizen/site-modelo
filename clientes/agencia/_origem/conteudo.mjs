// Textos do site da Overtus. As duas versões usam os mesmos textos; só o visual muda.
// Sem preços (a precificação ainda não foi aprovada) e sem clientes ou depoimentos inventados.

export const site = {
  nome: 'Overtus',
  dominio: 'https://agencia.overtus.com.br',
  agenda: 'https://cal.com/overtus',
  calLink: 'overtus',
  slogan: 'Estrutura comercial para quem vende de verdade.',
  linha2: 'Sites sob medida, sistemas e a rotina comercial que transformam visita em contato e contato em venda.',
};

export const menu = [
  ['servicos', 'Serviços'],
  ['projetos', 'Projetos'],
  ['como-trabalhamos', 'Como trabalhamos'],
  ['sobre', 'Sobre'],
  ['contato', 'Contato'],
];

// Grupos de serviço: cada um tem página própria em /servicos/<slug>/.
export const grupos = [
  {
    slug: 'sites',
    nome: 'Sites',
    titulo: 'Sites sob medida, com a identidade real da sua empresa.',
    resumo: 'Criação e reformulação de sites institucionais com várias páginas, em mais de um idioma quando a empresa vende para fora, com hospedagem e atualização inclusas no cuidado.',
    lead: 'Cada site é desenhado do zero a partir da sua marca: o seu logo, as suas cores, os seus produtos e as suas fotos. Nada de modelo pronto com o nome trocado.',
    itens: [
      ['Criação de sites sob medida', 'Site institucional completo, com páginas para empresa, produtos ou serviços, estrutura, contato e o que mais o seu negócio pedir. Pensado para o celular desde o início.', ['Várias páginas, nunca uma página só', 'Versões em português, inglês e espanhol', 'Botões de WhatsApp, telefone e orçamento']],
      ['Reformulação de sites', 'Partimos do site que você já tem: mantemos a ordem que o seu cliente conhece, os textos e a identidade, e refazemos o acabamento, a velocidade e a forma de apresentar.', ['Estudo do site atual antes de desenhar', 'Conteúdo existente aproveitado e revisado', 'Duas versões prontas para você escolher']],
      ['Atualização de sites', 'Troca de textos, fotos, produtos, novas páginas e notícias sempre que a empresa mudar. Você pede, nós publicamos.', ['Pedidos por mensagem', 'Novas páginas no mesmo padrão visual', 'Revisão periódica de links e formulários']],
      ['Hospedagem e domínio', 'O site fica em servidor rápido e seguro, com certificado, cópia do conteúdo e o seu domínio configurado.', ['Certificado de segurança (https)', 'Endereço com o domínio da empresa', 'Monitoramento de disponibilidade']],
    ],
  },
  {
    slug: 'marketing',
    nome: 'Marketing e aquisição',
    titulo: 'Ser encontrado por quem procura o que você vende.',
    resumo: 'SEO, anúncios no Google, geração de leads e social media para levar visitantes qualificados ao site e transformar essas visitas em contatos.',
    lead: 'Um bom site precisa de visitas. Trabalhamos a busca orgânica, os anúncios e as redes para que o cliente certo chegue até você, e medimos o que vira contato.',
    itens: [
      ['SEO', 'Estrutura técnica, textos e páginas pensados para a busca do Google, do título de cada página à imagem que aparece quando o link é compartilhado.', ['Títulos, descrições e endereços revisados', 'Páginas por produto, serviço e região', 'Velocidade e leitura no celular']],
      ['Anúncios no Google', 'Campanhas de pesquisa para os termos que o seu comprador digita, com páginas de destino próprias e acompanhamento do que gera contato.', ['Palavras-chave por linha de produto', 'Páginas de destino dedicadas', 'Relatório de contatos gerados']],
      ['Geração de leads', 'Formulários, botões de WhatsApp, pedidos de orçamento e agenda online distribuídos no site para que cada visita interessada deixe um contato.', ['Pedido de orçamento por produto', 'Contatos organizados em um só lugar', 'Origem de cada contato registrada']],
      ['Social media', 'Publicações para Instagram e LinkedIn alinhadas ao site e à identidade da marca, com calendário e aprovação antes de publicar.', ['Calendário mensal de publicações', 'Artes no padrão visual da empresa', 'Aprovação antes de cada post']],
    ],
  },
  {
    slug: 'sistemas',
    nome: 'Sistemas e automação',
    titulo: 'Ferramentas que trabalham junto com o seu site.',
    resumo: 'Agente de IA para atendimento, catálogo e cotação para indústrias, painel de notícias, agendamento online e sistemas sob medida.',
    lead: 'Quando o site precisa fazer mais do que apresentar a empresa, desenvolvemos o sistema que falta: do catálogo com pedido de cotação ao atendimento automático fora do horário comercial.',
    itens: [
      ['Agente de IA', 'Atendimento automático treinado com as informações da sua empresa, que responde dúvidas frequentes, recebe pedidos e encaminha o contato para a pessoa certa.', ['Treinado com os seus produtos e serviços', 'Atende fora do horário comercial', 'Passa o contato para a equipe']],
      ['Catálogo e cotação para indústrias', 'Catálogo de produtos com busca, filtros e ficha técnica, em que o cliente monta a lista e envia o pedido de cotação direto ao comercial.', ['Busca e filtros por linha de produto', 'Lista de cotação em poucos cliques', 'Pedido entregue por e-mail ou WhatsApp']],
      ['Painel de notícias', 'Área administrativa simples para a própria empresa publicar notícias, comunicados e novidades no site, sem depender de ninguém.', ['Publicação com título, foto e texto', 'Acesso com usuário e senha', 'Notícias no padrão visual do site']],
      ['Agendamento online', 'Agenda integrada ao site para visitas técnicas, reuniões e atendimentos, com confirmação e lembrete automáticos.', ['Horários disponíveis em tempo real', 'Confirmação e lembrete por e-mail', 'Integrada ao seu calendário']],
      ['Sistemas sob medida', 'Sistemas internos e portais para clientes, desenhados a partir da rotina da sua equipe.', ['Levantamento da rotina antes de desenvolver', 'Acesso pelo navegador e pelo celular', 'Evolução contínua depois da entrega']],
    ],
  },
  {
    slug: 'comercial',
    nome: 'Estrutura comercial',
    titulo: 'O comercial da sua empresa, organizado em uma tela.',
    resumo: 'CRM, prospecção ativa e painel comercial para que nenhum contato se perca e a equipe saiba, toda semana, onde estão os negócios.',
    lead: 'Site e anúncios trazem contatos. A estrutura comercial garante que cada um deles seja atendido, acompanhado e convertido em negócio.',
    itens: [
      ['CRM', 'Contatos, empresas e negócios em andamento organizados em etapas, com histórico de cada conversa e a próxima ação de cada vendedor.', ['Funil por etapa de negociação', 'Histórico de cada cliente', 'Tarefas e lembretes para a equipe']],
      ['Prospecção', 'Listas de empresas do seu segmento e da sua região, com os dados de contato e roteiro de abordagem para a equipe comercial.', ['Listas por segmento e região', 'Roteiro de ligação e de mensagem', 'Registro de cada tentativa no CRM']],
      ['Painel comercial', 'Uma tela com os contatos novos, os negócios em andamento e as decisões da semana, atualizada todos os dias.', ['Visão da semana em uma tela', 'Acesso pelo computador e pelo celular', 'Indicadores que a diretoria acompanha']],
    ],
  },
];

// Diferencial central.
export const diferencial = {
  rotulo: 'Como começamos',
  titulo: 'Você vê o site pronto antes de qualquer conversa sobre preço.',
  texto: 'Estudamos a sua empresa e o seu site atual e montamos duas versões completas do novo site, com o seu logo, as suas cores e os seus produtos. As duas ficam no ar em um link de prévia. Você navega, compara e escolhe.',
  pontos: [
    ['Duas versões', 'Coerentes com a sua marca, em estilos diferentes.'],
    ['Site completo', 'Várias páginas navegáveis, não uma imagem de exemplo.'],
    ['No ar', 'Um link para abrir no computador e no celular.'],
  ],
};

// Etapas do trabalho (página Como trabalhamos e resumo na inicial).
export const etapas = [
  ['Estudo', 'Analisamos a empresa, o site atual, os concorrentes e o que o seu cliente procura. Reunimos logo, fontes, cores, fotos e textos reais.', 'Reunião de 30 minutos e acesso ao material que você já tem.'],
  ['Duas versões no ar', 'Desenhamos duas versões completas do novo site, com várias páginas, e publicamos cada uma em um link de prévia.', 'Links para abrir no computador e no celular.'],
  ['Escolha e ajustes', 'Você escolhe a versão, pede os ajustes e aprova cada página. Só então conversamos sobre o projeto.', 'Lista de ajustes acompanhada até a aprovação.'],
  ['Publicação', 'O site vai para o seu domínio, com hospedagem, SEO, compartilhamento em redes e medição de contatos configurados.', 'Site no ar e contatos chegando no lugar certo.'],
  ['Acompanhamento', 'Atualizamos o site, cuidamos dos anúncios e organizamos a rotina comercial para que as visitas virem negócio.', 'Pedidos atendidos por mensagem e relatório de contatos.'],
];

// Princípios (por que a Overtus).
export const principios = [
  ['Identidade real', 'Usamos o logo, as fontes, as cores, as fotos e os produtos da sua empresa. Se o seu site já tem uma estrutura que o cliente conhece, ela é mantida e melhorada.'],
  ['Feito para gerar contato', 'Cada página tem um caminho claro para o visitante falar com a empresa: orçamento, WhatsApp, agenda ou formulário.'],
  ['Técnica bem feita', 'Leve no celular, com títulos e descrições para o Google, imagem de compartilhamento em todas as páginas e versões em outros idiomas quando preciso.'],
  ['Tudo em um lugar', 'Site, marketing, sistemas e estrutura comercial com a mesma equipe, sem você precisar coordenar fornecedores.'],
];

// Portfólio: estudos de redesenho, identificados por segmento (sem citar as empresas como clientes).
export const projetos = [
  ['texian', 'Engenharia e montagem industrial', 'Site institucional com vídeo de abertura, áreas de atuação e dezenas de páginas internas.', ['Multipágina', 'Vídeo na abertura']],
  ['instor', 'Robótica móvel', 'Site em português, inglês e espanhol com soluções organizadas por aplicação.', ['3 idiomas', 'Duas versões']],
  ['engenho-am', 'Beneficiamento de arroz', 'Site com a linha de beneficiamento apresentada etapa por etapa.', ['Processo ilustrado', 'Duas versões']],
  ['agrogen', 'Genética avícola', 'Site institucional com estrutura, sanidade, pilares e contato.', ['Multipágina', 'Identidade preservada']],
  ['metz', 'Consultoria empresarial', 'Site formal com soluções, metodologia, artigos e contato.', ['Tom formal', 'Duas versões']],
  ['sulpol', 'Plásticos e masterbatch', 'Catálogo de produtos com páginas por linha e pedido de orçamento.', ['Catálogo', 'Orçamento']],
  ['vordex', 'Fabricação e manutenção industrial', 'Site com serviços, estrutura própria e pedido de orçamento.', ['Multipágina', 'Duas versões']],
  ['toniolo', 'Rejeitos, barragens e dragagem', 'Site em três idiomas com soluções, números da operação e catálogo.', ['3 idiomas', 'Duas versões']],
  ['dht', 'Indústria médica', 'Site B2B para hospitais, clínicas e revendas, com catálogo e pedido de cotação.', ['Catálogo', 'Duas versões'], 'v-dht-a'],
  ['defilippo', 'Oficina mecânica', 'Site com serviços, compromisso de atendimento e orçamento pelo WhatsApp.', ['Serviços', 'WhatsApp']],
];
export const legendaProjetos = 'Projetos desenvolvidos pela Overtus como estudos de redesenho. Marcas e conteúdos pertencem às respectivas empresas. A apresentação não indica relação comercial.';

// Segmentos que atendemos (página Sobre).
export const segmentos = ['Indústria', 'Agronegócio', 'Saúde e indústria médica', 'Engenharia e construção', 'Automotivo', 'Consultorias e serviços B2B', 'Imobiliárias', 'Clínicas e consultórios'];

export const chamada = {
  titulo: 'Estrutura comercial para quem vende de verdade.',
  texto: 'Agende uma conversa com a nossa equipe. Avaliamos o seu site e a sua presença comercial atual e apresentamos um plano objetivo de melhoria.',
  nota: 'Conversa sem compromisso, por vídeo.',
};

// Título e descrição de cada página (SEO).
export const paginas = {
  index: ['Overtus · Sites, sistemas e estrutura comercial', 'Agência especializada em sites sob medida, marketing, sistemas e estrutura comercial. Você vê o site pronto, em duas versões, antes de falar de preço.'],
  servicos: ['Serviços · Overtus', 'Sites sob medida, reformulação, SEO, anúncios no Google, geração de leads, agente de IA, catálogo e cotação, CRM e prospecção.'],
  'servicos/sites': ['Sites sob medida · Overtus', 'Criação e reformulação de sites institucionais multipágina, em mais de um idioma, com hospedagem e atualização.'],
  'servicos/marketing': ['Marketing e aquisição · Overtus', 'SEO, anúncios no Google, geração de leads e social media para levar visitantes qualificados ao site e transformar visitas em contatos.'],
  'servicos/sistemas': ['Sistemas e automação · Overtus', 'Agente de IA, catálogo e cotação para indústrias, painel de notícias, agendamento online e sistemas sob medida.'],
  'servicos/comercial': ['Estrutura comercial · Overtus', 'CRM, prospecção ativa e painel comercial para que nenhum contato se perca e a equipe acompanhe cada negócio.'],
  projetos: ['Projetos desenvolvidos · Overtus', 'Estudos de redesenho criados pela Overtus para indústrias e empresas de serviços: sites multipágina, com identidade própria e em mais de um idioma.'],
  'como-trabalhamos': ['Como trabalhamos · Overtus', 'Estudo, duas versões completas no ar, escolha e ajustes, publicação e acompanhamento. Você vê o site pronto antes de falar de preço.'],
  sobre: ['Sobre a Overtus', 'A Overtus é uma agência especializada em sites, sistemas e estrutura comercial para empresas que vendem de forma consultiva.'],
  contato: ['Agendar conversa · Overtus', 'Agende uma conversa com a Overtus. Avaliamos o seu site e a sua presença comercial e apresentamos um plano objetivo de melhoria.'],
};
