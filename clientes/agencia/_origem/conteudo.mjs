// Textos do site da Overtus (uma versão só, servida na raiz de agencia.overtus.com.br).
// Sem preços (a precificação ainda não foi aprovada) e sem clientes ou depoimentos inventados.

export const site = {
  nome: 'Overtus',
  dominio: 'https://agencia.overtus.com.br',
  agenda: 'https://cal.com/overtus',
  calLink: 'overtus',
  email: 'joaovitor@overtus.com.br',
  slogan: 'Estrutura comercial para quem vende de verdade.',
  linha2: 'Sites sob medida, sistemas e a rotina comercial que transformam visita em contato e contato em venda.',
};

export const menu = [
  ['servicos', 'Serviços'],
  ['setores', 'Setores'],
  ['projetos', 'Projetos'],
  ['como-trabalhamos', 'Como trabalhamos'],
  ['quem-somos', 'Quem somos'],
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

// O cartão à direita de cada etapa, na inicial: o que aparece na tela naquele momento do projeto.
// [título, texto, linhas]. Linhas: ['anexo', nome, detalhe] | ['campo', rótulo, valor] | ['lista', texto, estado].
export const etapasCartao = [
  ['Material da empresa', 'O que reunimos na primeira conversa para desenhar com a identidade real.', [
    ['anexo', 'Logo da empresa', 'vetor ou imagem em boa resolução'],
    ['anexo', 'Fotos da estrutura e dos produtos', 'as que a empresa já tem'],
    ['anexo', 'Textos e páginas do site atual', 'aproveitados e revisados'],
    ['anexo', 'Catálogo ou lista de produtos', 'PDF, planilha ou site'],
  ]],
  ['Prévia no ar', 'Duas versões completas, publicadas em um link para abrir no computador e no celular.', [
    ['versoes'],
    ['campo', 'Endereço da prévia', 'suaempresa.overtus.com.br'],
  ]],
  ['Lista de ajustes', 'Você navega, anota o que mudar e aprova página por página.', [
    ['lista', 'Página inicial', 'Aprovada'],
    ['lista', 'Produtos: trocar a ordem das linhas', 'Ajustado'],
    ['lista', 'Sobre: incluir a foto da equipe', 'Ajustado'],
    ['lista', 'Contato: WhatsApp do comercial', 'Aprovada'],
  ]],
  ['Site no seu domínio', 'O que fica configurado na publicação.', [
    ['lista', 'Domínio da empresa e certificado https', 'Configurado'],
    ['lista', 'Títulos e descrições para o Google', 'Configurado'],
    ['lista', 'Imagem de compartilhamento em todas as páginas', 'Configurado'],
    ['lista', 'Medição de contatos por formulário e WhatsApp', 'Configurado'],
  ]],
  ['Pedidos por mensagem', 'Depois da publicação, a empresa pede e nós publicamos.', [
    ['campo', 'Pedido', 'Trocar a foto da capa e incluir a nova linha de produtos'],
    ['lista', 'Foto da capa', 'Publicado'],
    ['lista', 'Nova linha de produtos', 'Em andamento'],
    ['campo', 'Relatório do mês', 'Contatos por origem: site, anúncios e WhatsApp'],
  ]],
];

// Princípios (por que a Overtus).
export const principios = [
  ['Identidade real', 'Usamos o logo, as fontes, as cores, as fotos e os produtos da sua empresa. Se o seu site já tem uma estrutura que o cliente conhece, ela é mantida e melhorada.'],
  ['Feito para gerar contato', 'Cada página tem um caminho claro para o visitante falar com a empresa: orçamento, WhatsApp, agenda ou formulário.'],
  ['Técnica bem feita', 'Leve no celular, com títulos e descrições para o Google, imagem de compartilhamento em todas as páginas e versões em outros idiomas quando preciso.'],
  ['Tudo em um lugar', 'Site, marketing, sistemas e estrutura comercial com a mesma equipe, sem você precisar coordenar fornecedores.'],
];

// Portfólio: estudos de redesenho, identificados pelo ramo (sem citar as empresas como clientes).
// [pasta em clientes/, setor, ramo, etiquetas fixas (opcional), imagem (opcional)]. Páginas, idiomas e versões
// são contados pelo gerar.mjs a partir de clientes/<pasta>/public.
export const projetos = [
  ['texian', 'industria', 'Engenharia e montagem industrial', ['Multipágina', 'Vídeo na abertura']],
  ['instor', 'industria', 'Robótica móvel'],
  ['globalmicrofusao', 'industria', 'Microfusão de aço'],
  ['abplast', 'industria', 'Embalagens para cosméticos'],
  ['mazzer', 'industria', 'Equipamentos para papel e açúcar'],
  ['extrusaobrasil', 'industria', 'Extrusoras para plástico'],
  ['thermotech', 'industria', 'Tratamento térmico'],
  ['gramola', 'industria', 'Fundição de peças automotivas'],
  ['northeastprecision', 'industria', 'Usinagem CNC nos Estados Unidos'],
  ['alumigroup', 'industria', 'Metais não ferrosos'],
  ['turbimoendas', 'industria', 'Usinagem pesada'],
  ['matacura', 'industria', 'Higiene e cuidado animal'],
  ['fundiart', 'industria', 'Fundição artística'],
  ['sulpol', 'industria', 'Plásticos e masterbatch', ['Catálogo', 'Orçamento']],
  ['engenho-am', 'agro', 'Beneficiamento de arroz'],
  ['agrogen', 'agro', 'Genética avícola', ['Multipágina', 'Identidade preservada']],
  ['altoalegre', 'agro', 'Usina de açúcar e etanol'],
  ['coopasol', 'agro', 'Cooperativa de grãos'],
  ['belominas', 'agro', 'Laticínios'],
  ['frigoestrela', 'agro', 'Frigorífico'],
  ['conexaodeltag', 'agro', 'Melhoramento genético bovino'],
  ['patoindustria', 'agro', 'Silos e secadores'],
  ['copermutum', 'agro', 'Cooperativa e suinocultura'],
  ['distriboi', 'agro', 'Frigorífico de bovinos'],
  ['reina', 'agro', 'Produção de sementes'],
  ['emmig', 'construcao', 'Estruturas metálicas'],
  ['faximobiliaria', 'construcao', 'Imobiliária'],
  ['alexandreaugusto', 'construcao', 'Imobiliária de bairro'],
  ['toniolo', 'construcao', 'Rejeitos, barragens e dragagem'],
  ['dht', 'saude', 'Indústria médica', ['Catálogo', 'Duas versões'], 'v-dht-a'],
  ['unitec', 'saude', 'Fabricante hospitalar'],
  ['grupokss', 'saude', 'Equipamentos para centro cirúrgico'],
  ['medicor', 'saude', 'Descartáveis hospitalares'],
  ['equipamentosvrc', 'saude', 'Equipamentos para prótese dentária'],
  ['produvale', 'saude', 'Distribuidora hospitalar'],
  ['medline', 'saude', 'Representação médica e estética'],
  ['defilippo', 'automotivo', 'Oficina mecânica', ['Serviços', 'WhatsApp']],
  ['classservice', 'automotivo', 'Oficina especializada em uma marca'],
  ['mecanicameier', 'automotivo', 'Câmbio automático'],
  ['tolotti', 'automotivo', 'Mecânica e funilaria'],
  ['forcap', 'automotivo', 'Concessionária de micro-ônibus'],
  ['metz', 'b2b', 'Consultoria empresarial', ['Tom formal', 'Duas versões']],
  ['fuhrcontabilidade', 'b2b', 'Contabilidade'],
  ['aplysia', 'b2b', 'Consultoria ambiental'],
  ['flamarsul', 'distribuicao', 'Distribuidora de alimentos e limpeza'],
  ['dispra', 'distribuicao', 'Distribuidora veterinária'],
];
export const legendaProjetos = 'Projetos desenvolvidos pela Overtus como estudos de redesenho. Marcas e conteúdos pertencem às respectivas empresas. A apresentação não indica relação comercial.';

// Setores: cada um tem página própria em /setores/<slug>/. `site` leva ao site completo da Overtus para o setor, quando existe.
export const setores = [
  {
    slug: 'industria',
    nome: 'Indústria e metalmecânica',
    titulo: 'Site para indústria que mostra a fábrica e recebe pedido de cotação.',
    lead: 'O comprador técnico pesquisa antes de ligar: quer ver capacidade, processo, certificações e catálogo. Se o site não mostra, ele pede orçamento para quem mostra.',
    resumo: 'Fábricas, fundições, usinagens e fabricantes de máquinas e embalagens.',
    dores: [
      ['Catálogo em PDF ou desatualizado', 'O cliente não encontra a peça ou a medida, liga para perguntar ou desiste.'],
      ['A fábrica não aparece', 'Estrutura, máquinas e certificações ficam escondidas, e a empresa parece menor do que é.'],
      ['Comprador de fora sem idioma', 'Distribuidores e clientes de outros países não encontram a empresa em inglês ou espanhol.'],
      ['Pedidos chegam soltos', 'Orçamentos por e-mail, telefone e WhatsApp, sem registro e sem acompanhamento.'],
    ],
    precisa: ['Catálogo com busca, ficha técnica e pedido de cotação', 'Páginas de processo, estrutura e certificações', 'Versões em inglês e espanhol para exportação', 'Área para representantes e distribuidores', 'Pedidos de orçamento direto no CRM do comercial'],
    servicos: ['sites', 'sistemas', 'comercial'],
    perguntas: [
      ['Dá para colocar o catálogo inteiro no site?', 'Sim. Montamos o catálogo com busca, filtros por linha e ficha de cada produto. O cliente monta a lista e envia o pedido de cotação para o comercial.'],
      ['Vocês fazem o site em outros idiomas?', 'Sim, com tradução revisada de todas as páginas em inglês e espanhol e troca de idioma no topo do site.'],
      ['Preciso ter fotos profissionais?', 'Usamos as fotos que a empresa já tem e o conteúdo do site atual. Quando falta alguma imagem, avisamos antes de usar foto de banco.'],
    ],
    site: ['Overtus para indústrias', 'Site institucional em três idiomas, catálogo com pedido de cotação, portal de representantes e CRM para venda técnica.', 'https://industrias.overtus.com.br'],
  },
  {
    slug: 'agro',
    nome: 'Agronegócio e alimentos',
    titulo: 'Site para o agro com a força da operação no campo e na indústria.',
    lead: 'Cooperativas, usinas, frigoríficos e empresas de genética vendem para produtores, distribuidores e redes que querem conhecer a origem, a estrutura e a qualidade antes de fechar.',
    resumo: 'Cooperativas, usinas, frigoríficos, laticínios, sementes e genética.',
    dores: [
      ['História que não aparece', 'Décadas de operação resumidas em um parágrafo, sem fotos da estrutura nem das pessoas.'],
      ['Produtos sem vitrine', 'Linha de produtos sem fotos das embalagens e sem indicação de onde comprar.'],
      ['Cooperado sem canal', 'Notícias, comunicados e informações espalhados em grupos e murais.'],
      ['Comprador sem caminho', 'Distribuidor ou rede de supermercados não sabe com quem falar.'],
    ],
    precisa: ['Linha de produtos com fotos e embalagens reais', 'Processo do campo à indústria contado em etapas', 'Unidades, área de atuação e onde comprar', 'Notícias e comunicados para cooperados', 'Contato separado para produtor, revenda e comprador'],
    servicos: ['sites', 'marketing', 'sistemas'],
    perguntas: [
      ['O site pode ter área para cooperados?', 'Sim. Notícias, comunicados e informações para cooperados podem ser publicados pela própria cooperativa, sem depender de nós.'],
      ['Dá para mostrar o processo de produção?', 'Sim. Contamos o processo em etapas visuais, do campo ou da recepção até a embalagem, com as fotos da própria empresa.'],
      ['Vocês atendem empresas de outros estados?', 'Sim. O trabalho é feito a distância, com reuniões por vídeo e prévias no ar para aprovar.'],
    ],
  },
  {
    slug: 'construcao',
    nome: 'Construção e imóveis',
    titulo: 'Site para construtora e imobiliária que vende antes, durante e depois da obra.',
    lead: 'Quem compra um imóvel ou contrata uma obra quer ver o empreendimento, as obras entregues e a disponibilidade sem precisar ligar.',
    resumo: 'Construtoras, incorporadoras, imobiliárias e empresas de estruturas.',
    dores: [
      ['Empreendimento sem página própria', 'O lançamento vive em um PDF e em posts, sem um endereço para o corretor enviar.'],
      ['Imóveis desatualizados', 'Unidades vendidas continuam anunciadas e as novas demoram a aparecer.'],
      ['Obras entregues sem portfólio', 'O histórico da empresa não aparece para quem está decidindo.'],
      ['Corretor sem material', 'Plantas, fotos e tabela circulam por mensagem, cada um com uma versão.'],
    ],
    precisa: ['Página por empreendimento com plantas, fotos e andamento da obra', 'Busca de imóveis com filtros por tipo, bairro e valor', 'Portfólio de obras entregues', 'Tabela de disponibilidade online', 'Contato direto com o corretor pelo WhatsApp'],
    servicos: ['sites', 'marketing', 'comercial'],
    perguntas: [
      ['Vocês fazem site de lançamento?', 'Sim. Página de pré-lançamento com cadastro de interessados e, depois, a página completa do empreendimento.'],
      ['Dá para usar os imóveis do sistema que a imobiliária já usa?', 'Avaliamos o sistema de hoje. Quando ele permite exportar os imóveis, a busca do site é alimentada a partir dele.'],
      ['E para empresas de obras e estruturas?', 'Montamos o portfólio de obras entregues por tipo, com fotos e dados de cada projeto e pedido de orçamento.'],
    ],
    site: ['Overtus para construtoras e incorporadoras', 'Sites de empreendimento, pré-lançamento, tabela de disponibilidade online, portal do corretor e CRM, do lançamento à entrega das chaves.', 'https://construtoras.overtus.com.br'],
  },
  {
    slug: 'saude',
    nome: 'Saúde e produtos hospitalares',
    titulo: 'Site para empresas da saúde que vendem para hospitais, clínicas e revendas.',
    lead: 'Compradores de hospitais e clínicas procuram registro, linha completa e prazo de entrega. O site precisa responder isso com clareza e levar ao pedido de cotação.',
    resumo: 'Fabricantes, distribuidoras e representantes de produtos médicos.',
    dores: [
      ['Linha extensa sem organização', 'Centenas de itens em listas longas, difíceis de encontrar.'],
      ['Registros e certificações escondidos', 'O comprador não encontra o registro do produto nem as certificações da fábrica.'],
      ['Licitações e revendas sem canal', 'Hospital, clínica e revenda caem no mesmo formulário genérico.'],
      ['Marcas representadas sem destaque', 'A distribuidora não mostra as marcas que tem para oferecer.'],
    ],
    precisa: ['Catálogo por linha com ficha técnica e registro', 'Certificações e boas práticas em destaque', 'Pedido de cotação por produto', 'Página de marcas representadas e de revendas', 'Versões em inglês e espanhol para exportação'],
    servicos: ['sites', 'sistemas', 'comercial'],
    perguntas: [
      ['O site mostra o registro de cada produto?', 'Sim. Cada produto pode ter o número de registro e a ficha técnica, a partir das informações que a empresa fornece.'],
      ['Vocês atendem distribuidoras?', 'Sim. Para distribuidoras, o site é organizado pelas marcas e linhas representadas, com contato direto para cotação.'],
      ['Dá para separar o atendimento de hospitais e revendas?', 'Sim, com caminhos e formulários diferentes para cada tipo de cliente, que chegam ao comercial já identificados.'],
    ],
  },
  {
    slug: 'automotivo',
    nome: 'Oficinas e automotivo',
    titulo: 'Site para oficina e concessionária que enche a agenda.',
    lead: 'Quem procura uma oficina pesquisa no celular, compara e quer agendar rápido. O site precisa passar confiança em poucos segundos e levar ao WhatsApp.',
    resumo: 'Oficinas mecânicas, especializadas, funilarias e concessionárias.',
    dores: [
      ['Pouca confiança na primeira visita', 'Sem fotos da oficina, da equipe e das especialidades, o cliente segue procurando.'],
      ['Agendamento só por telefone', 'Fora do horário, ninguém atende e o cliente liga para outra oficina.'],
      ['Especialidades escondidas', 'Câmbio automático, importados ou uma marca específica não aparecem na busca.'],
      ['Fora do Google da região', 'Quem procura no bairro encontra primeiro os concorrentes.'],
    ],
    precisa: ['Serviços e especialidades com página própria', 'Fotos reais da oficina e da equipe', 'Agendamento e orçamento pelo WhatsApp', 'Endereço, horário e mapa sempre à vista', 'Páginas pensadas para a busca do bairro e da cidade'],
    servicos: ['sites', 'marketing'],
    perguntas: [
      ['O site ajuda a aparecer no Google da minha cidade?', 'Sim. Trabalhamos títulos, páginas por serviço e informações locais para a busca da região, junto com o perfil da empresa no Google.'],
      ['O cliente consegue agendar pelo site?', 'Sim, com botão direto para o WhatsApp ou com uma agenda online com os horários disponíveis.'],
      ['Vocês atendem concessionárias?', 'Sim, com páginas de veículos novos e seminovos, financiamento, peças e serviços.'],
    ],
  },
  {
    slug: 'b2b',
    nome: 'Consultorias e serviços B2B',
    titulo: 'Site para consultorias e escritórios que vendem conhecimento.',
    lead: 'Em serviços profissionais, o cliente contrata confiança. O site precisa mostrar método, equipe e experiência com tom formal e facilitar o primeiro contato.',
    resumo: 'Consultorias, contabilidades, engenharia, meio ambiente e escritórios.',
    dores: [
      ['Serviços descritos de forma genérica', 'Textos que serviriam para qualquer escritório não mostram a especialidade.'],
      ['Equipe e método invisíveis', 'O cliente não sabe quem vai atendê-lo nem como o trabalho é feito.'],
      ['Conteúdo técnico parado', 'Sem artigos e notícias, o site não mostra o conhecimento da equipe.'],
      ['Primeiro contato frio', 'Só um formulário genérico, sem agenda e sem retorno rápido.'],
    ],
    precisa: ['Página por área de atuação', 'Equipe com formação e especialidade', 'Método de trabalho explicado em etapas', 'Artigos publicados pela própria equipe', 'Agendamento de reunião direto no site'],
    servicos: ['sites', 'marketing', 'comercial'],
    perguntas: [
      ['O tom do site pode ser formal?', 'Sim. Para consultorias, escritórios e engenharia, o texto é formal e objetivo, revisado com a equipe antes de publicar.'],
      ['A equipe consegue publicar artigos?', 'Sim, com um painel simples de notícias e artigos, com título, foto e texto.'],
      ['Vocês fazem site para escritório de advocacia?', 'Sim, respeitando as regras de publicidade da OAB: conteúdo informativo, sóbrio e sem promessa de resultado.'],
    ],
  },
  {
    slug: 'distribuicao',
    nome: 'Distribuição e logística',
    titulo: 'Site para distribuidora que mostra o mix e a área de entrega.',
    lead: 'Varejistas e empresas compram de quem entrega certo. O site precisa mostrar marcas, mix, rotas e o caminho para virar cliente.',
    resumo: 'Distribuidoras, atacados e transportadoras.',
    dores: [
      ['Mix de produtos sem vitrine', 'O cliente não sabe quais marcas e linhas a distribuidora trabalha.'],
      ['Área de entrega pouco clara', 'Quem está em outra cidade não sabe se é atendido.'],
      ['Cadastro de cliente demorado', 'Virar cliente depende de várias ligações e trocas de mensagem.'],
      ['Representantes sem material', 'Cada vendedor apresenta a empresa de um jeito.'],
    ],
    precisa: ['Marcas e linhas com fotos', 'Mapa de rotas e cidades atendidas', 'Formulário para quem quer ser cliente', 'Página para representantes e vendedores', 'Pedido e cotação pelo WhatsApp'],
    servicos: ['sites', 'sistemas', 'comercial'],
    perguntas: [
      ['Dá para mostrar as cidades atendidas?', 'Sim, com mapa e lista de rotas, para o cliente saber se recebe na sua região.'],
      ['O site pode receber pedidos?', 'Pode receber pedidos de cotação e cadastros de novos clientes. Para loja online completa, avaliamos cada caso antes.'],
      ['Vocês atendem transportadoras?', 'Sim, com páginas de serviços, frota, cobertura e pedido de cotação de frete.'],
    ],
  },
];

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
  projetos: ['Projetos desenvolvidos · Overtus', 'Mais de 40 estudos de redesenho criados pela Overtus para indústrias, agro, construção, saúde, oficinas e serviços: sites multipágina, com identidade própria e em mais de um idioma.'],
  'como-trabalhamos': ['Como trabalhamos · Overtus', 'Estudo, duas versões completas no ar, escolha e ajustes, publicação e acompanhamento. Você vê o site pronto antes de falar de preço.'],
  setores: ['Setores que atendemos · Overtus', 'Sites, sistemas e estrutura comercial para indústria, agronegócio, construção, saúde, oficinas, consultorias e distribuidoras.'],
  'quem-somos': ['Quem somos · Overtus', 'A Overtus é uma agência especializada em sites, sistemas e estrutura comercial para empresas que vendem de forma consultiva.'],
  contato: ['Agendar conversa · Overtus', 'Agende uma conversa com a Overtus. Avaliamos o seu site e a sua presença comercial e apresentamos um plano objetivo de melhoria.'],
};
