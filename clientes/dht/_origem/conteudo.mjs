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
  ['fabricacao', 'Fabricação'],
  ['distribuicao', 'Distribuição'],
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

export const paginas = {
  index: ['DHT Indústria Médica · Instrumentais e insumos hospitalares', 'Fabricação de instrumentais cirúrgicos e inox hospitalar em Porto Alegre, e distribuição de descartáveis para hospitais, clínicas e laboratórios.'],
  produtos: ['Produtos · DHT Indústria Médica', 'Catálogo de instrumentais cirúrgicos, inox hospitalar, descartáveis, odontologia e laboratório.'],
  fabricacao: ['Fabricação · DHT Indústria Médica', 'Como a DHT fabrica instrumentais cirúrgicos e utensílios em aço inox, do corte à inspeção.'],
  distribuicao: ['Distribuição · DHT Indústria Médica', 'Atendimento a hospitais, clínicas, laboratórios, distribuidores e órgãos públicos em todo o Brasil.'],
  qualidade: ['Qualidade · DHT Indústria Médica', 'Rastreabilidade por lote, inspeção em todas as peças e fornecedores registrados na ANVISA.'],
  empresa: ['Empresa · DHT Indústria Médica', 'Indústria de Porto Alegre que fabrica e distribui insumos médico-hospitalares desde 2021.'],
  contato: ['Cotação e contato · DHT Indústria Médica', 'Peça uma cotação. Resposta em até 24 horas úteis.'],
};
for (const l of linhas) paginas[`produtos/${l.id}`] = [`${l.nome} · DHT Indústria Médica`, l.resumo];
