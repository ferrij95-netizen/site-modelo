// Textos da DHT Indústria Médica. Dados cadastrais vieram do registro público (CNPJ 42.233.000/0001-81).
// Linhas de produto, números e textos são propostas: confirmar com a DHT.
export const site = {
  nome: 'DHT',
  razao: 'DHT Indústria Médica Ltda.',
  cnpj: '42.233.000/0001-81',
  dominio: 'https://dht.overtus.com.br',
  tagline: 'Indústria e distribuição de insumos médico-hospitalares',
  telefone: '(51) 98422-2626',
  whats: '5551984222626',
  email: 'dht.contato@gmail.com',
  endereco: 'Rua Barão de Tramandaí, 196 · Passo da Areia',
  cidade: 'Porto Alegre, RS · CEP 91030-380',
  horario: 'Segunda a sexta, das 8h às 18h',
};

export const nav = [
  ['produtos', 'Produtos'],
  ['solucoes', 'Para quem'],
  ['fabricacao', 'Fabricação'],
  ['qualidade', 'Qualidade'],
  ['empresa', 'Empresa'],
  ['contato', 'Contato'],
];

// Linhas de produto. "fab" = fabricação própria; "dist" = distribuição.
export const linhas = [
  { id: 'instrumentais', nome: 'Instrumentais cirúrgicos', origem: 'fab', ico: 'pinca',
    resumo: 'Pinças, tesouras, porta-agulhas e cabos de bisturi em aço inoxidável, fabricados em Porto Alegre.',
    itens: [
      ['DHT-101', 'Pinça anatômica dente de rato', 'pinca', 'Aço inox AISI 420', '12, 14 e 16 cm'],
      ['DHT-102', 'Pinça hemostática Kelly', 'hemostatica', 'Aço inox AISI 420', 'Reta e curva, 14 cm'],
      ['DHT-110', 'Tesoura Metzenbaum', 'tesoura', 'Aço inox AISI 420', 'Reta e curva, 15 e 18 cm'],
      ['DHT-111', 'Tesoura Mayo', 'tesoura', 'Aço inox AISI 420', 'Reta e curva, 14 e 17 cm'],
      ['DHT-120', 'Porta-agulha Mayo-Hegar', 'portaagulha', 'Aço inox AISI 420', '14, 16 e 18 cm'],
      ['DHT-130', 'Cabo de bisturi nº 3 e nº 4', 'bisturi', 'Aço inox AISI 304', 'Unidade'],
    ] },
  { id: 'inox', nome: 'Inox hospitalar', origem: 'fab', ico: 'cuba',
    resumo: 'Cubas, bandejas, caixas para esterilização e utensílios de apoio em aço inox polido.',
    itens: [
      ['DHT-201', 'Cuba rim', 'cuba', 'Aço inox AISI 304', '20 e 26 cm'],
      ['DHT-205', 'Cúpula redonda', 'cupula', 'Aço inox AISI 304', '6, 8 e 10 cm'],
      ['DHT-210', 'Bandeja retangular', 'bandeja', 'Aço inox AISI 304', '22 × 12 a 40 × 30 cm'],
      ['DHT-220', 'Caixa para esterilização', 'caixa', 'Aço inox AISI 304, perfurada', '20 × 10 × 5 a 40 × 20 × 10 cm'],
      ['DHT-230', 'Tambor para gaze', 'tambor', 'Aço inox AISI 304', '12 × 12 e 15 × 15 cm'],
      ['DHT-240', 'Bacia para assepsia', 'bacia', 'Aço inox AISI 304', '2, 4 e 6 litros'],
    ] },
  { id: 'descartaveis', nome: 'Descartáveis', origem: 'dist', ico: 'seringa',
    resumo: 'Seringas, agulhas, luvas, compressas e máscaras de fabricantes registrados na ANVISA.',
    itens: [
      ['DHT-301', 'Seringa descartável sem agulha', 'seringa', 'Polipropileno', '1, 3, 5, 10 e 20 ml'],
      ['DHT-305', 'Agulha hipodérmica', 'agulha', 'Aço inox, canhão PP', '13 × 4,5 a 40 × 12'],
      ['DHT-310', 'Luva de procedimento', 'luva', 'Látex ou nitrílica', 'Caixa com 100, P a G'],
      ['DHT-320', 'Compressa de gaze', 'gaze', 'Algodão 13 fios', 'Pacote com 500'],
      ['DHT-330', 'Máscara cirúrgica tripla', 'mascara', 'TNT com filtro', 'Caixa com 50'],
      ['DHT-340', 'Avental descartável', 'avental', 'TNT 30 g', 'Pacote com 10'],
    ] },
  { id: 'odonto-lab', nome: 'Odontologia e laboratório', origem: 'fab', ico: 'espelho',
    resumo: 'Instrumentais odontológicos e utensílios de laboratório para clínicas, faculdades e análises.',
    itens: [
      ['DHT-401', 'Cabo para espelho odontológico', 'espelho', 'Aço inox AISI 304', 'Unidade'],
      ['DHT-405', 'Sonda exploradora nº 5', 'sonda', 'Aço inox AISI 420', 'Unidade'],
      ['DHT-410', 'Pinça clínica odontológica', 'pincaodonto', 'Aço inox AISI 420', '16 cm'],
      ['DHT-420', 'Estante para tubos de ensaio', 'estante', 'Aço inox AISI 304', '12, 24 e 40 furos'],
      ['DHT-430', 'Pinça para cadinho', 'cadinho', 'Aço inox AISI 304', '20 e 25 cm'],
      ['DHT-440', 'Espátula de laboratório', 'espatula', 'Aço inox AISI 304', '15 e 20 cm'],
    ] },
];

export const clientes = [
  ['Hospitais', 'Centro cirúrgico, CME, enfermarias e almoxarifado central.'],
  ['Clínicas e consultórios', 'Pequenas cirurgias, curativos e procedimentos ambulatoriais.'],
  ['Odontologia', 'Clínicas, faculdades e redes de consultórios odontológicos.'],
  ['Laboratórios', 'Análises clínicas, ensino e pesquisa.'],
  ['Distribuidores', 'Revenda com marca DHT ou fornecimento sob encomenda.'],
  ['Prefeituras e órgãos públicos', 'Atendimento a licitações com documentação completa.'],
];

export const numeros = [
  ['2021', 'início da fábrica em Porto Alegre'],
  ['4', 'linhas de produto'],
  ['24 h', 'para responder uma cotação'],
  ['100%', 'das peças inspecionadas uma a uma'],
];

export const etapasFab = [
  ['Corte e forjamento', 'Barras de aço inox cortadas e conformadas no formato de cada peça.'],
  ['Usinagem', 'Encaixes, serrilhas e articulações usinados com gabarito, peça por peça.'],
  ['Têmpera', 'Tratamento térmico que dá dureza às pontas e às lâminas.'],
  ['Polimento', 'Acabamento acetinado ou espelhado, sem rebarbas que acumulem sujeira.'],
  ['Passivação', 'Banho químico que reforça a camada protetora do inox contra corrosão.'],
  ['Inspeção e gravação', 'Cada peça é conferida, gravada com lote e embalada individualmente.'],
];

export const passosCompra = [
  ['Monte a lista', 'Escolha os produtos no catálogo e adicione à cotação, ou mande sua planilha.'],
  ['Receba o orçamento', 'Preço, prazo e frete em até 24 horas úteis, por e-mail ou WhatsApp.'],
  ['Receba o pedido', 'Faturamento com nota fiscal e envio por transportadora para todo o Brasil.'],
];

export const qualidade = [
  ['Rastreabilidade por lote', 'Cada instrumental sai gravado com lote; a ficha registra matéria-prima, data e responsável pela inspeção.'],
  ['Aço inox de procedência', 'Matéria-prima com certificado de composição do fornecedor, AISI 420 para corte e AISI 304 para utensílios.'],
  ['Inspeção 100%', 'Articulação, alinhamento de pontas e acabamento conferidos em todas as peças, não por amostragem.'],
  ['Fornecedores registrados', 'Na linha de distribuição, só trabalhamos com produtos com registro ou notificação vigente na ANVISA.'],
  ['Documentação para licitação', 'Fichas técnicas, laudos e certidões organizados para compras públicas.'],
  ['Garantia de fabricação', 'Defeito de fabricação nos instrumentais é reposto sem custo.'],
];

// Os cinco públicos que a DHT quer atender (pedido do Joao em 2026-10-19). Cada um tem página própria,
// com o modelo de negócio, como funciona, o que enviamos e um formulário com os campos certos.
// Campos extras do formulário: [name, rótulo, tipo ('area' = texto longo)].
export const publicos = [
  { id: 'hospitais', nome: 'Hospitais e redes', quem: 'Hospital ou rede', modelo: 'Fornecimento por contrato',
    resumo: 'Contrato de fornecimento com preço acordado, entregas programadas e um só fornecedor para centro cirúrgico, CME e almoxarifado.',
    titulo: 'Fornecimento por contrato para hospitais privados e redes',
    lead: 'Preço acordado para o período, entregas no ritmo do seu consumo e uma só conta para instrumental, inox hospitalar e descartáveis. Para um hospital ou para todas as unidades da rede.',
    oferta: [
      ['Preço fechado no contrato', 'Tabela por item válida durante o contrato. Sua equipe de compras para de cotar os mesmos produtos todo mês.'],
      ['Entregas programadas', 'Cronograma de entregas montado a partir do seu consumo, com reposição prioritária dos itens críticos.'],
      ['Uma nota para o pedido inteiro', 'Instrumental e inox de fabricação própria junto com os descartáveis de giro, no mesmo pedido e na mesma entrega.'],
      ['Redes com várias unidades', 'Uma negociação para a rede e faturamento por CNPJ de cada unidade, se for assim que vocês compram.'],
      ['Caixas e kits montados', 'Caixas cirúrgicas montadas conforme a lista do seu centro cirúrgico, com peças avulsas para reposição.'],
    ],
    passos: [
      ['Levantamento', 'Você manda a lista padrão ou o consumo dos últimos meses.'],
      ['Proposta', 'Devolvemos preço por item, frequência de entrega e condições de pagamento.'],
      ['Homologação', 'Amostras e documentação técnica para a avaliação do hospital.'],
      ['Fornecimento', 'Entregas no cronograma e um responsável fixo pela conta.'],
    ],
    extra: ['O que enviamos para a homologação', [
      ['Fichas técnicas', 'Material, medidas e uso de cada item do contrato.'],
      ['Amostras', 'Peças para avaliação do centro cirúrgico e da CME antes de fechar.'],
      ['Cadastro de fornecedor', 'Dados da empresa e certidões para o cadastro do hospital.'],
      ['Orientação de uso', 'Cuidados de limpeza, esterilização e conservação do instrumental.'],
    ]],
    linhas: ['instrumentais', 'inox', 'descartaveis'],
    form: { titulo: 'Peça uma proposta de contrato', botao: 'Pedir proposta', assunto: 'Proposta de contrato · hospital',
      campos: [['unidades', 'Número de unidades ou leitos', ''], ['itens', 'Itens e consumo mensal estimado', 'area']] } },

  { id: 'distribuidores', nome: 'Distribuidores', quem: 'Distribuidor', modelo: 'Revenda com margem',
    resumo: 'Tabela de revenda com margem para quem leva os produtos DHT a hospitais, clínicas e órgãos públicos da sua região.',
    titulo: 'Seja um distribuidor DHT',
    lead: 'Você tem os clientes e a presença na região. A DHT tem a fábrica. Juntos levamos instrumental e insumos a mais lugares, com tabela de revenda que deixa margem para o seu negócio.',
    oferta: [
      ['Tabela de revenda', 'Preço de fábrica com margem para o distribuidor, por volume e por linha de produto.'],
      ['Reposição sem depender de importação', 'Instrumental e inox são feitos em Porto Alegre. O seu estoque não fica parado esperando navio.'],
      ['Sua marca, se quiser', 'Gravação da marca do distribuidor nas peças para quem vende com marca própria.'],
      ['Material de venda', 'Fichas técnicas e imagens dos produtos para o seu catálogo e as suas propostas.'],
      ['Condições por região', 'Atuação, volume e prazo combinados na proposta de cada distribuidor.'],
    ],
    passos: [
      ['Cadastro', 'Conte onde atua, para quem vende e quais linhas já trabalha.'],
      ['Análise', 'Avaliamos a região e o perfil da sua carteira.'],
      ['Tabela e condições', 'Enviamos a tabela de revenda e as condições comerciais.'],
      ['Primeiro pedido', 'Faturamento para o seu CNPJ e reposição contínua.'],
    ],
    extra: ['O que pedimos no cadastro', [
      ['CNPJ e razão social', 'Empresa do ramo de produtos médico-hospitalares.'],
      ['Região de atuação', 'Estados e cidades onde você vende hoje.'],
      ['Carteira', 'Segmentos atendidos: hospitais, clínicas, odontologia, laboratórios ou órgãos públicos.'],
      ['Linhas atuais', 'O que você já revende, para combinar o mix sem conflito.'],
    ]],
    linhas: ['instrumentais', 'inox', 'odonto-lab'],
    form: { titulo: 'Cadastro de distribuidor', botao: 'Enviar cadastro', assunto: 'Cadastro de distribuidor',
      campos: [['regiao', 'Região de atuação (estados e cidades)', ''], ['segmentos', 'Segmentos que atende', ''], ['linhas', 'Linhas que já revende', 'area']] } },

  { id: 'licitacoes', nome: 'Licitações públicas', quem: 'Órgão público', modelo: 'PNCP e Comprasnet',
    resumo: 'Pregões, dispensas e atas de registro de preços de hospitais públicos, prefeituras, secretarias de saúde e universidades.',
    titulo: 'Licitações públicas pelo PNCP e pelo Comprasnet',
    lead: 'Atendemos compras públicas de hospitais, prefeituras, secretarias de saúde e universidades. Como fabricante, ofertamos preço de fábrica e entregamos com a documentação que o edital exige.',
    oferta: [
      ['Preço de fabricante', 'Instrumental e inox direto da fábrica, sem intermediário entre o órgão e quem produz.'],
      ['Pesquisa de preços', 'Proposta formal para compor o preço de referência do processo, com código, descrição e validade.'],
      ['Documentação organizada', 'Habilitação jurídica, fiscal e técnica reunida para a sessão, sem correria na véspera.'],
      ['Entrega e empenho', 'Entrega após o empenho em qualquer estado, com nota fiscal no CNPJ do órgão.'],
      ['Itens sob especificação', 'Peças fabricadas conforme a especificação técnica do termo de referência.'],
    ],
    passos: [
      ['Edital', 'Acompanhamos os avisos no PNCP, no Compras.gov.br (Comprasnet) e nos portais estaduais e municipais.'],
      ['Proposta', 'Proposta, fichas técnicas e amostras quando o edital pede.'],
      ['Habilitação', 'Documentos enviados no prazo da sessão.'],
      ['Empenho e entrega', 'Fornecimento conforme a ata ou o contrato.'],
    ],
    extra: ['Documentos de habilitação', [
      ['Habilitação jurídica', 'Contrato social e cartão CNPJ.'],
      ['Regularidade fiscal e trabalhista', 'Certidões federal, estadual, municipal, FGTS e trabalhista.'],
      ['Qualificação econômica', 'Balanço e certidão de falência e recuperação judicial, quando exigidos.'],
      ['Qualificação técnica', 'Fichas técnicas, catálogo e documentos sanitários pedidos no edital.'],
    ]],
    portais: [['PNCP', 'Portal Nacional de Contratações Públicas', 'https://pncp.gov.br'], ['Compras.gov.br', 'antigo Comprasnet, do governo federal', 'https://www.gov.br/compras']],
    linhas: ['instrumentais', 'inox', 'descartaveis', 'odonto-lab'],
    form: { titulo: 'Convide a DHT ou peça a documentação', botao: 'Enviar', assunto: 'Licitação',
      campos: [['orgao', 'Órgão', ''], ['edital', 'Número do edital ou processo', ''], ['sessao', 'Data da sessão', ''], ['link', 'Link do edital (PNCP ou portal)', '']] } },

  { id: 'terceiros', nome: 'Fabricação para terceiros', quem: 'Marca ou indústria', modelo: 'Fabricação sob contrato',
    resumo: 'Instrumentais e peças em aço inox produzidos na fábrica da DHT com o seu projeto ou a sua marca.',
    titulo: 'Fabricação sob contrato para a sua marca',
    lead: 'Use a fábrica da DHT em Porto Alegre para produzir instrumentais e peças em aço inox a partir do seu desenho, da sua amostra ou da sua especificação, com a sua marca gravada.',
    oferta: [
      ['Do desenho à peça', 'Produzimos a partir de desenho técnico, amostra física ou especificação.'],
      ['Sua marca na peça', 'Gravação da sua marca e do seu código em cada instrumental.'],
      ['Lote piloto antes da série', 'Você aprova as primeiras peças antes da produção em quantidade.'],
      ['Lotes rastreáveis', 'Cada lote sai gravado e com ficha de matéria-prima, data e inspeção.'],
      ['Sigilo do projeto', 'Acordo de confidencialidade quando o projeto pede.'],
    ],
    passos: [
      ['Projeto', 'Envie o desenho, a amostra ou a especificação da peça.'],
      ['Viabilidade e orçamento', 'Analisamos material, processo, prazo e preço por lote.'],
      ['Lote piloto', 'Primeiras peças para a sua aprovação.'],
      ['Produção em série', 'Lotes no cronograma combinado, inspecionados peça por peça.'],
    ],
    extra: ['O que a fábrica faz', [
      ['Corte e forjamento', 'Barras de aço inox conformadas no formato da peça.'],
      ['Usinagem', 'Encaixes, serrilhas e articulações com gabarito.'],
      ['Têmpera e polimento', 'Dureza nas pontas e acabamento acetinado ou espelhado.'],
      ['Passivação e gravação', 'Proteção contra corrosão, marca e lote em cada peça.'],
    ]],
    linhas: ['instrumentais', 'inox', 'odonto-lab'],
    form: { titulo: 'Peça um orçamento de fabricação', botao: 'Pedir orçamento', assunto: 'Fabricação sob contrato',
      campos: [['peca', 'Tipo de peça', ''], ['material', 'Material', ''], ['quantidade', 'Quantidade por lote', ''], ['projeto', 'Descreva o projeto (tem desenho ou amostra?)', 'area']] } },

  { id: 'opme', nome: 'Convênios e OPME', quem: 'Convênio ou OPME', modelo: 'Via OPME',
    resumo: 'Materiais para procedimentos cobertos por convênios e planos de saúde, com orçamento para autorização e rastreabilidade de lote.',
    titulo: 'Convênios e planos de saúde via OPME',
    lead: 'Para procedimentos cobertos por convênio, a DHT entrega o orçamento formal que a operadora pede para autorizar, o material no prazo da cirurgia e os dados de lote para o prontuário e a auditoria.',
    oferta: [
      ['Orçamento para autorização', 'Proposta com código, descrição e valor de cada item, pronta para o pedido à operadora.'],
      ['Prazo da agenda cirúrgica', 'Entrega combinada com a data do procedimento.'],
      ['Rastreabilidade', 'Lote e dados do material informados para o prontuário do paciente.'],
      ['Faturamento como o convênio pede', 'Nota fiscal para o hospital ou por procedimento, conforme o acordo com a operadora.'],
    ],
    passos: [
      ['Solicitação', 'O hospital, a clínica ou o médico envia a lista de materiais do procedimento.'],
      ['Orçamento', 'Devolvemos o orçamento formal para o pedido de autorização.'],
      ['Autorização', 'A operadora autoriza e o pedido é confirmado.'],
      ['Entrega e faturamento', 'Material no hospital com lote e nota fiscal.'],
    ],
    extra: ['Quem atendemos nesse modelo', [
      ['Hospitais e clínicas', 'Setor de OPME e faturamento de convênios.'],
      ['Cirurgiões', 'Lista de materiais para o procedimento agendado.'],
      ['Operadoras e auditoria', 'Orçamentos e informações de lote para análise.'],
      ['Distribuidores de OPME', 'Fornecimento de instrumental para quem já atua no segmento.'],
    ]],
    linhas: ['instrumentais', 'inox', 'descartaveis'],
    form: { titulo: 'Solicite um orçamento OPME', botao: 'Pedir orçamento', assunto: 'OPME · convênio',
      campos: [['convenio', 'Convênio ou operadora', ''], ['hospital', 'Hospital do procedimento', ''], ['data', 'Data prevista', ''], ['materiais', 'Materiais e quantidades', 'area']] } },
];

export const paginas = {
  index: ['DHT Indústria Médica · Instrumentais e insumos hospitalares', 'Fabricação de instrumentais cirúrgicos e inox hospitalar em Porto Alegre, e distribuição de descartáveis para hospitais, clínicas e laboratórios.'],
  produtos: ['Produtos · DHT Indústria Médica', 'Catálogo de instrumentais cirúrgicos, inox hospitalar, descartáveis, odontologia e laboratório.'],
  fabricacao: ['Fabricação · DHT Indústria Médica', 'Como a DHT fabrica instrumentais cirúrgicos e utensílios em aço inox, do corte à inspeção.'],
  distribuicao: ['Distribuição · DHT Indústria Médica', 'Atendimento a hospitais, clínicas, laboratórios, distribuidores e órgãos públicos em todo o Brasil.'],
  qualidade: ['Qualidade · DHT Indústria Médica', 'Rastreabilidade por lote, inspeção em todas as peças e fornecedores registrados na ANVISA.'],
  empresa: ['Empresa · DHT Indústria Médica', 'Indústria de Porto Alegre que fabrica e distribui insumos médico-hospitalares desde 2021.'],
  solucoes: ['Para quem · DHT Indústria Médica', 'Hospitais e redes por contrato, distribuidores, licitações públicas, fabricação para terceiros e convênios via OPME.'],
  contato: ['Cotação e contato · DHT Indústria Médica', 'Peça uma cotação. Resposta em até 24 horas úteis.'],
};
for (const p of publicos) paginas[`solucoes/${p.id}`] = [`${p.titulo} · DHT Indústria Médica`, p.resumo];
for (const l of linhas) paginas[`produtos/${l.id}`] = [`${l.nome} · DHT Indústria Médica`, l.resumo];
