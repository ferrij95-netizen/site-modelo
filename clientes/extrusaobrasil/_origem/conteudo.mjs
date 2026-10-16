// Textos do novo site da Extrusão Brasil. Tudo veio do site atual (extrusaobrasil.com.br), com erros de digitação
// corrigidos. As frases curtas que explicam cada equipamento de linha de frente são descrições gerais, porque a página
// atual desses equipamentos está "em manutenção" e só traz os nomes; nenhuma tem número inventado.

export const site = {
  nome: 'Extrusão Brasil',
  dominio: 'https://extrusaobrasil.overtus.com.br',
  endereco: 'R. Tupinambás, 407 - Vila Conceição, Diadema - SP, 09991-090',
  enderecoCurto: 'R. Tupinambás, 407 · Diadema (SP)',
  fone: '(11) 4056-8069',
  foneHref: 'tel:+551140568069',
  fonesExtra: ['(11) 4056-8095', '(11) 4055-5497'],
  whats: '(11) 94702-6870',
  whatsHref: 'https://wa.me/5511947026870?text=' + encodeURIComponent('Olá! Vim pelo site da Extrusão Brasil e gostaria de um orçamento.'),
  email: 'vendas@extrusaobrasil.com.br',
  mapa: 'https://maps.google.com/maps?q=R.%20Tupinamb%C3%A1s%2C%20407%20-%20Vila%20Concei%C3%A7%C3%A3o%2C%20Diadema%20-%20SP%2C%2009991-090&t=m&z=16&output=embed',
  mapaLink: 'https://www.google.com/maps/search/?api=1&query=R.+Tupinamb%C3%A1s%2C+407%2C+Diadema+SP',
  resumo: 'A EXTRUSÃO BRASIL conquistou ao longo de anos uma vasta experiência no desenvolvimento, fabricação e comercialização de extrusoras e linhas completas para extrusão dos mais variados produtos e matérias-primas.',
};

export const empresa = {
  quemSomos: [
    'A EXTRUSÃO BRASIL conquistou ao longo de anos uma vasta experiência no desenvolvimento, fabricação e comercialização de extrusoras e linhas completas para extrusão dos mais variados produtos e matérias-primas.',
    'Nossa relevância no mercado destaca-se permanentemente pela excelência em qualidade, know-how tecnológico diferenciado e agilidade no atendimento pós-venda (instalação, assistência técnica e reposição de peças).',
    'Estas condições, somadas à alta produtividade dos equipamentos, nos posicionam entre os principais fabricantes de equipamentos para extrusão de termoplásticos no Brasil, inclusive com reconhecimento internacional.',
  ],
  fabricamos: 'Fabricamos extrusoras Mono Rosca, Dupla Roscas Contra-Rotantes (Paralelas e Cônicas) e Dupla Roscas Co-Rotantes.',
  linhaFrente: 'À frente destas extrusoras somam-se os demais equipamentos (designados por "linha de frente") para extrusão de perfis, tubos, laminados, mangueiras, reciclagem / granulação etc.',
  perifericos: 'Periféricos como misturadores e outros acessórios complementam os projetos.',
  aplicacoes: ['Perfis', 'Tubos', 'Laminados', 'Mangueiras', 'Reciclagem / granulação', 'Telhas de PVC', 'Forros de PVC', 'Compostos e masterbatches'],
  queremos: 'Oferecer soluções com racionalidade, qualidade e tecnologia.',
  queremos2: 'Estes elementos contribuirão para entregar 100% de satisfação ao cliente e permanecermos como referência entre os fabricantes de equipamentos para a indústria plástica.',
  mvv: [
    ['Missão', 'Oferecer soluções completas em extrusão de termoplásticos, com alta qualidade, tecnologia e produtividade, garantindo a total satisfação dos nossos clientes e contribuindo para o desenvolvimento da indústria plástica.'],
    ['Visão', 'Ser reconhecida como referência nacional e internacional na fabricação de extrusoras e linhas completas, destacando-se pela inovação constante, excelência técnica e compromisso com o sucesso dos nossos clientes.'],
    ['Valores', 'Ser reconhecida por nossa excelência, inovação e compromisso com a satisfação do cliente, entregando produtos de alta qualidade, com agilidade no atendimento e transparência nas relações comerciais.'],
  ],
  posVenda: [['Instalação', 'Montagem e partida da linha na sua fábrica.'], ['Assistência técnica', 'Equipe especializada no equipamento que nós mesmos projetamos.'], ['Reposição de peças', 'Peças originais com as especificações do projeto.']],
};

// Números tirados das próprias páginas de equipamentos (o site atual mostra "+0" nos contadores).
export const numeros = [
  ['23', 'modelos de extrusoras', 'nas séries MR, DR, DRcn e DRC'],
  ['Ø 22 a 150', 'mm de diâmetro de rosca', 'da co-rotante de laboratório à mono rosca de 150 mm'],
  ['até 1.200', 'kg/hora', 'de produção nas extrusoras mono rosca'],
  ['1ª edição', 'Feiplastic e Interplast', 'parceira das feiras desde o início'],
];

export const equipamentos = [
  {
    slug: 'extrusoras-dupla-roscas-co-rotantes', nome: 'Extrusoras Dupla Roscas Co-Rotantes', curto: 'Dupla Roscas Co-Rotantes', serie: 'Série DRC',
    img: 'co-rotante-slide', galeria: [['drc-30', 'Extrusora DRC 30:40'], ['drc-cilindro', 'Cilindro segmentado da co-rotante'], ['drc-roscas', 'Roscas segmentadas da co-rotante']],
    resumo: 'Equipamentos utilizados na fabricação de compostos com fibras e cargas minerais, fabricação de masterbatches e granulações em geral.',
    grupos: [['Série DRC', ['Ø 22 mm · mod. EB-DRC 22:36', 'Ø 30 mm · mod. EB-DRC 30:40', 'Ø 46 mm · mod. EB-DRC 46:40', 'Ø 50 mm · mod. EB-DRC 50:44', 'Ø 65 mm · mod. EB-DRC 65:48']]],
    textoTitulo: 'Aplicação',
    texto: ['A Extrusora Dupla Roscas Co-Rotantes, com diâmetros de 22 a 65 mm, é utilizada na fabricação de compostos com fibras e cargas minerais, fabricação de masterbatches e granulações em geral.', 'As extrusoras co-rotantes proporcionam maior dispersão e uma perfeita homogeneização em todos os termoplásticos.'],
    listaTitulo: 'Principais características',
    lista: ['Cilindros segmentados possibilitam a alimentação de materiais em pontos específicos para melhor performance do processo.', 'Roscas segmentadas possibilitam a montagem de acordo com a necessidade do processo (mistura, transporte, cisalhamento etc.).', 'L/D de 1:36 a 1:48', 'Rotação: 0 a 600 RPM', 'Redutor / caixa de transmissão para alto torque', 'Alto desempenho em plásticos de engenharia e compostos'],
    fichas: [['Ø', '22 a 65 mm'], ['L/D', '1:36 a 1:48'], ['RPM', '0 a 600']],
  },
  {
    slug: 'extrusoras-dupla-roscas-contra-rotantes', nome: 'Extrusoras Dupla Roscas Contra-Rotantes', curto: 'Dupla Roscas Contra-Rotantes', serie: 'Séries DR e DRcn',
    img: 'dr-67', galeria: [['dr-80', 'Extrusora DR 80'], ['dr-67', 'Extrusora DR 67'], ['contra-rotante-slide', 'Extrusora dupla roscas']],
    resumo: 'Equipamentos utilizados basicamente para trabalhar com PVC rígido ou flexível.',
    grupos: [['Série DR · roscas paralelas', ['Ø 45 mm · mod. EB-DR 45', 'Ø 67 mm · mod. EB-DR 67', 'Ø 75 mm · mod. EB-DR 75', 'Ø 90 mm · mod. EB-DR 90']], ['Série DRcn · roscas cônicas', ['Ø 55 mm · mod. EB-DRcn 55', 'Ø 65 mm · mod. EB-DRcn 65', 'Ø 80 mm · mod. EB-DRcn 80', 'Ø 92 mm · mod. EB-DRcn 92']]],
    textoTitulo: 'Aplicação',
    texto: ['As extrusoras dupla roscas contra-rotantes são equipamentos utilizados basicamente para trabalhar com PVC rígido ou flexível.', 'Com as respectivas "linhas de frente", estes equipamentos são a melhor opção para a produção de tubos, perfis, telhas, compostos e outros produtos que tenham sempre como base o PVC.'],
    listaTitulo: 'Vantagens',
    lista: ['Alta produtividade', 'Trabalham com materiais em pó, granulados, moídos ou micronizados', 'Excelente homogeneização em PVC rígido ou flexível', 'Baixa potência de motores, que reduz o consumo de energia'],
    fichas: [['Ø', '45 a 92 mm'], ['Roscas', 'paralelas e cônicas'], ['Material', 'PVC rígido e flexível']],
  },
  {
    slug: 'extrusoras-mono-rosca', nome: 'Extrusoras Mono Rosca', curto: 'Mono Rosca', serie: 'Série MR',
    img: 'mr-90', galeria: [['mr-90', 'Extrusora Mono Rosca 90 mm'], ['mr-150', 'Extrusora MR 150']],
    resumo: 'Alta produção ao processar os mais variados termoplásticos virgens ou reciclados: PS, PP, PE, PC, PET, ABS, PVC etc.',
    grupos: [['Série MR', ['Ø 25 mm · mod. EB-MR 25:30', 'Ø 35 mm · mod. EB-MR 35:30', 'Ø 45 mm · mod. EB-MR 45:30', 'Ø 50 mm · mod. EB-MR 50:30', 'Ø 60 mm · mod. EB-MR 60:30', 'Ø 75 mm · mod. EB-MR 75:30', 'Ø 90 mm · mod. EB-MR 90:30', 'Ø 100 mm · mod. EB-MR 100:35', 'Ø 120 mm · mod. EB-MR 120:35', 'Ø 150 mm · mod. EB-MR 150:35']]],
    textoTitulo: 'Principais características',
    texto: ['A qualidade das extrusoras da série MR tem reconhecimento nacional e internacional devido à alta produção ao processar os mais variados termoplásticos virgens ou reciclados: PS, PP, PE, PC, PET, ABS, PVC etc.', 'Com diâmetros de 25 a 150 mm, são projetadas para oferecer produções entre 5 e 1.200 kg/hora, com relações L/D = 1:25 a 1:35. As roscas são fabricadas com geometria especial para cada tipo de termoplástico e finalidade de produção, com ou sem estágio para degasagem.', 'Trabalham geralmente com materiais granulados ou moídos.'],
    listaTitulo: 'Termoplásticos',
    lista: ['PS', 'PP', 'PE', 'PC', 'PET', 'ABS', 'PVC', 'Virgens ou reciclados'],
    chips: true,
    fichas: [['Ø', '25 a 150 mm'], ['Produção', '5 a 1.200 kg/h'], ['L/D', '1:25 a 1:35']],
  },
  {
    slug: 'misturadores-resfriadores', nome: 'Misturadores / Resfriadores', curto: 'Misturadores / Resfriadores', serie: 'Mistura de compostos',
    img: 'misturador-duplo', galeria: [['misturador-duplo', 'Conjunto misturador / resfriador'], ['misturador-externo', 'Misturador, vista externa'], ['misturador-interno', 'Misturador, vista interna das hélices']],
    resumo: 'Homogeneização dos compostos de PVC, PP e PE para uma perfeita plastificação na extrusão (10 a 1.500 kg/hora).',
    grupos: [],
    textoTitulo: 'Como funciona',
    texto: ['A confiabilidade é uma consequência real de toda experiência e da tecnologia desenvolvida pela Extrusão Brasil, que vem agregando permanentemente as mais importantes evoluções, proporcionando uma elevada produtividade (10 a 1.500 kg/hora). O resultado é a homogeneização dos compostos de PVC, PP e PE, o que possibilita uma perfeita plastificação na extrusão.', 'Com o seu sistema de pré-alimentadores automáticos, o misturador/resfriador permite ciclos contínuos de misturas sem a interrupção dos motores, proporcionando baixo consumo de energia.', 'Os recipientes (misturador/resfriador) são construídos em aço inoxidável com camisas para os sistemas de aquecimento e resfriamento, além de um moderno conjunto de hélices misturadoras/resfriadoras também em aço inox.', 'O conjunto é montado em plataforma monobloco em aço estrutural, com acesso através de escadas.'],
    listaTitulo: 'Benefícios',
    lista: ['Perfeita homogeneização dos compostos', 'Baixo consumo de energia', 'Diminuição de custos operacionais', 'Assistência técnica permanente'],
    fichas: [['Produção', '10 a 1.500 kg/h'], ['Construção', 'aço inox'], ['Compostos', 'PVC, PP e PE']],
  },
  {
    slug: 'equipamentos-para-linhas-de-frente', nome: 'Equipamentos para Linhas de Frente', curto: 'Linhas de Frente', serie: 'Cabeçotes, calibração, puxadores e corte',
    img: 'serra-simples', galeria: [],
    resumo: 'Os equipamentos montados à frente da extrusora para dar forma, resfriar, puxar, cortar e receber o produto.',
    grupos: [],
    textoTitulo: 'O que é a linha de frente',
    texto: ['À frente das extrusoras somam-se os demais equipamentos, designados por "linha de frente", para extrusão de perfis, tubos, laminados, mangueiras, reciclagem / granulação etc.', 'Cada linha é montada conforme o produto: o cabeçote dá a forma, a calibração e o resfriamento fixam a medida, o puxador mantém a velocidade constante e o corte entrega o produto no comprimento certo.'],
    listaTitulo: '',
    lista: [],
    fichas: [['Itens', '11 equipamentos'], ['Produtos', 'tubos, perfis e granulado'], ['Linhas', 'simples e duplas']],
  },
  {
    slug: 'conjunto-completo-para-fabricacao-de-telhas-em-pvc', nome: 'Conjunto completo para fabricação de telhas em PVC', curto: 'Telhas em PVC', serie: 'Linha Colonial e Linha Minionda',
    img: 'telhas-conjunto', galeria: [['telhas-1', 'Linha de telhas de PVC em operação'], ['telhas-2', 'Telhas de PVC saindo da linha'], ['telhas-3', 'Detalhe da linha de telhas de PVC']],
    resumo: 'Linha Colonial e Linha Minionda, com produtividade de 10 a 1.000 kg/hora.',
    grupos: [['Linhas', ['Linha Colonial', 'Linha Minionda']]],
    textoTitulo: 'Linha Colonial e Linha Minionda',
    texto: ['A confiabilidade é uma consequência real de toda experiência e da tecnologia desenvolvida pela Extrusão Brasil, que vem agregando permanentemente as mais importantes evoluções, proporcionando uma elevada produtividade (10 a 1.000 kg/hora). O resultado é a homogeneização dos compostos de PVC, PP e PE, o que possibilita uma perfeita plastificação na extrusão.'],
    listaTitulo: '',
    lista: [],
    fichas: [['Produção', '10 a 1.000 kg/h'], ['Modelos', 'Colonial e Minionda'], ['Compostos', 'PVC, PP e PE']],
    anuncios: [['telhas-linhas', 'Linha completa para extrusão de telhas de PVC: Linha Colonial e Linha Minionda'], ['telhas-anuncio', 'Conjunto completo de extrusão para fabricação de telhas de PVC']],
  },
];

// Linha de frente: nomes e fotos do site atual (página "em manutenção"), na ordem da linha.
export const linhaFrente = [
  ['lf-cabecote-granulacao', 'Cabeçote para Granulação', 'Forma os fios de plástico que depois são resfriados e cortados em grânulos.'],
  ['lf-cabecote-duplo', 'Cabeçote Duplo para Tubos de PVC', 'Extruda dois tubos ao mesmo tempo a partir de uma só extrusora.'],
  ['lf-tanque', 'Tanque de Calibragem a Vácuo para Tubos', 'Fixa o diâmetro do tubo enquanto ele resfria sob vácuo.'],
  ['lf-mesa', 'Mesa de Calibração 600 - 3000', 'Calibra e resfria perfis e forros logo na saída do cabeçote.'],
  ['lf-leito-fluido', 'Sistema de Resfriamento com Leito Fluido para PVC', 'Resfria o material granulado em leito fluido.'],
  ['lf-puxador-simples', 'Puxador Caterpillar Simples', 'Puxa o produto em velocidade constante com esteiras de tacos.'],
  ['lf-puxador-duplo', 'Puxador Caterpillar Duplo', 'Duas esteiras independentes para linhas duplas de tubos ou forros.'],
  ['lf-serra-simples', 'Serra Simples para Tubos e Perfis', 'Corta o produto no comprimento programado, sem parar a linha.'],
  ['lf-serra-dupla', 'Serra Dupla para Tubos e Perfis', 'Corte automático para as duas saídas de uma linha dupla.'],
  ['lf-corte-perfis', 'Sistema de Corte para Perfis', 'Guilhotina para perfis e chapas.'],
  ['lf-calha', 'Calha Receptora para Tubos e Perfis', 'Recebe as peças cortadas no fim da linha.'],
];

// Etapas de uma linha de extrusão, ilustradas com as fotos dos próprios equipamentos.
export const etapas = [
  ['misturador-duplo', 'Mistura', 'Misturador / resfriador', 'O composto de PVC, PP ou PE é homogeneizado antes de entrar na extrusora.'],
  ['mr-90', 'Extrusão', 'Extrusora mono ou dupla rosca', 'A rosca plastifica o material e empurra a massa para o cabeçote.'],
  ['lf-cabecote-duplo', 'Forma', 'Cabeçote', 'O cabeçote dá a forma do produto: tubo, perfil, chapa, telha ou fio para granular.'],
  ['lf-tanque', 'Calibração', 'Tanque a vácuo ou mesa', 'O produto resfria com a medida fixada pela calibração.'],
  ['lf-puxador-simples', 'Tração', 'Puxador caterpillar', 'Esteiras puxam o produto em velocidade constante.'],
  ['lf-serra-simples', 'Corte', 'Serra ou guilhotina', 'O corte automático entrega a peça no comprimento certo.'],
  ['lf-calha', 'Recebimento', 'Calha receptora', 'As peças prontas são recebidas no fim da linha.'],
];

export const pecas = {
  intro: ['Com o objetivo de atender melhor ao grande número de clientes para os quais tivemos o privilégio de fornecer um equipamento de nossa fabricação, e também aos que o adquiriram de forma indireta, a EXTRUSÃO BRASIL disponibiliza uma estrutura dedicada ao fornecimento de peças de reposição, com o suporte técnico de uma equipe especializada.', 'Adquira peças originais EXTRUSÃO BRASIL para que seus equipamentos alcancem a melhor performance e confiabilidade, atendendo às especificações técnicas do projeto original que somente o fabricante pode oferecer. E, tão importante quanto isso, com o menor custo praticado.'],
  consulte: ['Conjuntos de cilindro e rosca (mono ou dupla)', 'Segmentos para roscas co-rotantes', 'Rolamentos tandem', 'Engrenagens e eixos para caixas de transmissão', 'Componentes elétricos e eletrônicos', 'Resistências e capas térmicas'],
  outros: 'Sob consulta e avaliação, também fornecemos peças para equipamentos de outros fabricantes.',
  fotos: [['pc-2x1-dr67', '2 x 1 DR 67 mm'], ['pc-tanque', 'Tanque de Calibragem a Vácuo para Tubos'], ['pc-cabecote-duplo', 'Cabeçote Duplo Tubos'], ['pc-troca-telas', 'Cabeçote Troca Telas'], ['pc-cabecote-simples', 'Cabeçote Tubos Simples'], ['pc-canhoes', 'Canhões para Máquinas Dupla Roscas'], ['pc-roscas', 'Roscas para Extrusoras Mono e Dupla'], ['pc-pinhao-1', 'Pinhão Movido - Pinhão Motor'], ['pc-pinhao-2', 'Pinhão Movido - Pinhão Motor'], ['pc-rosca-dosador', 'Rosca Dosador']],
  aviso: 'A EXTRUSÃO BRASIL não autoriza nenhuma empresa a comercializar ou fabricar suas linhas de equipamentos, peças ou componentes sob qualquer pretexto. Também proíbe o uso de imagens, nome e logomarca, da qual possui certificado de registro. Tais atos implicarão em ação judicial cabível contra as partes.',
};

const V = 'https://extrusaobrasil.com.br/wp-content/uploads/';
export const videos = [
  ['coletor-solar', 'Conjunto de Extrusão para Perfis (Coletor Solar)', V + '2025/05/Incasol-03.mp4', []],
  ['tubos-pvc', 'Conjunto Extrusão Tubos de PVC', V + '2025/07/Conjunto-Extrusao-Tubos-de-PVC.mp4', ['Extrusora Dupla Roscas', 'Tanque a Vácuo', 'Puxador Caterpillar Simples com Tacos', 'Serra Automática', 'Calha Receptora Simples']],
  ['chapas-laminadas', 'Conjunto para Chapas Laminadas', V + '2025/07/Conjunto-para-Chapas-Laminadas.mp4', ['Extrusora Mono Rosca', 'Mesa de Calibração', 'Puxador Caterpillar Simples com Tacos', 'Guilhotina Pneumática', 'Calha Receptora Simples']],
  ['forro-simples', 'Conjunto Extrusão Simples Forro PVC', V + '2025/07/Conjunto-Extrusao-Simples-Forro-PVC.mp4', ['Extrusora Dupla Roscas Contra-Rotantes', 'Mesa de Calibração', 'Puxador Caterpillar Simples', 'Serra Automática Simples', 'Calha Receptora Simples']],
  ['forro-duplo', 'Conjunto Extrusão Dupla Forros PVC', V + '2025/07/Conjunto-Extrusao-Dupla-Forros-PVC.mp4', ['Extrusora Dupla Roscas Contra-Rotantes', 'Mesa de Calibração', 'Puxador Caterpillar Duplo', 'Serra Automática Dupla', 'Calha Receptora Dupla']],
  ['granulacao-co-rotante', 'Conjunto Granulação – Extrusora Co-Rotante', V + '2025/07/Conjunto-Granulacao-%E2%80%93-Extrusora-Co-Rotante.mp4', ['Extrusora Dupla Roscas Co-Rotantes', 'Cabeçote p/ Granulação', 'Banheira de Resfriamento', 'Granulador SAGEC']],
  ['granulacao-seco', 'Conjunto para Granulação a Seco de PVC', V + '2025/07/Conjunto-para-Granulacao-a-Seco-de-PVC.mp4', ['Extrusora Dupla Roscas Contra-Rotantes Cônicas', 'Cabeçote Granulador', 'Sistema de Transporte', 'Conjunto de Resfriamento']],
];

export const feiras = {
  texto: 'A Extrusão Brasil, empresa especializada no desenvolvimento, fabricação e comercialização de máquinas extrusoras, é parceira das feiras Feiplastic e Interplast desde a primeira edição.',
  lista: [['feiplastic', 2015, 'Feiplastic 2015', 'São Paulo (SP)'], ['interplast', 2014, 'Interplast 2014', 'Joinville (SC)'], ['feiplastic', 2013, 'Feiplastic 2013', 'São Paulo (SP)'], ['interplast', 2012, 'Interplast 2012', 'Joinville (SC)'], ['brasilplast', 2011, 'Brasilplast 2011', 'São Paulo (SP)'], ['interplast', 2010, 'Interplast 2010', 'Joinville (SC)']],
};

export const financiamentos = {
  intro: 'Veja como adquirir os nossos produtos. Consulte seu agente financeiro.',
  itens: [
    ['fin-finame', 'FINAME', 'Financiamento para aquisição, exclusivamente, de máquinas novas cadastradas no FINAME. Os recursos do FINAME provêm do BNDES (Banco Nacional de Desenvolvimento Econômico e Social) e são repassados por meio de agentes financeiros aos beneficiários finais, conforme a política de crédito de cada instituição financeira.'],
    ['fin-leasing', 'FINAME Leasing', 'Possui as mesmas características do FINAME, mas com os efeitos fiscais do arrendamento mercantil. É direcionado para pessoas jurídicas: uma operação de arrendamento que permite à sua empresa adquirir máquinas e equipamentos novos escolhendo a forma de pagamento que melhor atenda ao seu fluxo de caixa.'],
    ['fin-bndes', 'BNDES', 'Modalidade de financiamento do BNDES oferecida para micro, pequenas e médias empresas através de parcerias com empresas de cartão de crédito. Financiamento de longo prazo para projetos de investimento da sua empresa: implantação, ampliação, recuperação e modernização de ativos fixos.'],
    ['fin-proger', 'Proger', 'Conjunto de linhas especiais de crédito para financiar quem quer iniciar ou investir no crescimento do próprio negócio, com o objetivo de gerar e manter emprego e renda.'],
  ],
  proger: ['Banco do Brasil', 'Banco do Nordeste', 'Caixa Econômica Federal', 'Banco da Amazônia', 'BNDES (por intermédio de seus agentes financeiros credenciados)'],
};

export const contato = 'Entre em contato conosco para esclarecer suas dúvidas, solicitar orçamentos ou obter mais informações sobre nossos produtos e serviços. Estamos à disposição para atendê-lo da melhor forma possível!';

// Escolha pelo produto final: as linhas vêm da composição dos conjuntos nos vídeos do site atual
// e das páginas de equipamentos (telhas, compostos). Nada de número novo.
export const aplicacoes = [
  { id: 'tubos', nome: 'Tubos de PVC', foto: 'pc-cabecote-duplo', video: 'tubos-pvc', extrusora: 'extrusoras-dupla-roscas-contra-rotantes',
    texto: 'Linha para tubos de PVC rígido com cabeçote simples ou duplo, calibração a vácuo e corte automático.',
    linha: ['Extrusora Dupla Roscas', 'Tanque a Vácuo', 'Puxador Caterpillar Simples com Tacos', 'Serra Automática', 'Calha Receptora Simples'] },
  { id: 'forros', nome: 'Forros de PVC', foto: 'lf-puxador-duplo', video: 'forro-duplo', extrusora: 'extrusoras-dupla-roscas-contra-rotantes',
    texto: 'Conjuntos simples ou duplos: duas réguas de forro saindo ao mesmo tempo da mesma extrusora.',
    linha: ['Extrusora Dupla Roscas Contra-Rotantes', 'Mesa de Calibração', 'Puxador Caterpillar Duplo', 'Serra Automática Dupla', 'Calha Receptora Dupla'] },
  { id: 'perfis', nome: 'Perfis', foto: 'lf-mesa', video: 'coletor-solar', extrusora: 'extrusoras-dupla-roscas-contra-rotantes',
    texto: 'Perfis técnicos como os do coletor solar, com mesa de calibração e sistema de corte para perfis.',
    linha: ['Extrusora Dupla Roscas Contra-Rotantes', 'Mesa de Calibração', 'Puxador Caterpillar', 'Sistema de Corte para Perfis', 'Calha Receptora'] },
  { id: 'chapas', nome: 'Chapas laminadas', foto: 'lf-corte-perfis', video: 'chapas-laminadas', extrusora: 'extrusoras-mono-rosca',
    texto: 'Chapas extrudadas com extrusora mono rosca, calibração e corte por guilhotina pneumática.',
    linha: ['Extrusora Mono Rosca', 'Mesa de Calibração', 'Puxador Caterpillar Simples com Tacos', 'Guilhotina Pneumática', 'Calha Receptora Simples'] },
  { id: 'telhas', nome: 'Telhas de PVC', foto: 'telhas-conjunto', video: '', extrusora: 'conjunto-completo-para-fabricacao-de-telhas-em-pvc',
    texto: 'Conjunto completo para telhas Colonial e Minionda, com produtividade de 10 a 1.000 kg/hora.',
    linha: ['Misturador / Resfriador', 'Extrusora Dupla Roscas', 'Cabeçote e calibração da telha', 'Puxador', 'Corte e recebimento'] },
  { id: 'granulacao', nome: 'Granulação e reciclagem', foto: 'lf-cabecote-granulacao', video: 'granulacao-seco', extrusora: 'extrusoras-dupla-roscas-co-rotantes',
    texto: 'Granulação a seco de PVC ou com banheira de resfriamento, para reciclagem e produção de grânulos.',
    linha: ['Extrusora Dupla Roscas Contra-Rotantes Cônicas', 'Cabeçote Granulador', 'Sistema de Transporte', 'Conjunto de Resfriamento'] },
  { id: 'compostos', nome: 'Compostos e masterbatches', foto: 'drc-roscas', video: 'granulacao-co-rotante', extrusora: 'extrusoras-dupla-roscas-co-rotantes',
    texto: 'Co-rotantes com cilindro e roscas segmentados para compostos com fibras e cargas minerais e masterbatches.',
    linha: ['Extrusora Dupla Roscas Co-Rotantes', 'Cabeçote p/ Granulação', 'Banheira de Resfriamento', 'Granulador SAGEC'] },
];

export const pilares = [
  ['Engenharia própria', 'Know-how tecnológico diferenciado: roscas com geometria especial para cada termoplástico e finalidade de produção, com ou sem estágio de degasagem.'],
  ['Fabricação completa', 'Extrusoras mono rosca, dupla roscas contra-rotantes e co-rotantes, linhas de frente e periféricos como misturadores, tudo do mesmo fabricante.'],
  ['Pós-venda ágil', 'Instalação, assistência técnica e reposição de peças originais, com o suporte de uma equipe especializada.'],
];
