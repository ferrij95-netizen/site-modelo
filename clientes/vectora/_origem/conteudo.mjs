// Textos do site novo da Vectora. Tudo tirado do site atual (vectora.com.br/portal) em 2026-10-13,
// com a ortografia corrigida (Indústria, Econômica, Óleo). O que não existe no site atual está marcado "a confirmar" no LEIA-ME.

export const site = {
  nome: 'Vectora Indústria',
  razao: 'Vectora Indústria de Equipamentos Eletro-Eletrônicos Ltda',
  slogan: 'Soluções em telemetria e gestão de perdas',
  dominio: 'https://vectora.overtus.com.br',
  fone: '+55 (19) 2223-8888',
  foneHref: '+551922238888',
  email: 'comercial@vectora.com.br',
  endereco: 'Rua Papa Pio XII, 625 · Distrito Industrial I',
  cidade: "Santa Bárbara d'Oeste · SP",
  cep: '13457-196',
  mapaLink: 'https://www.google.com/maps/search/?api=1&query=Rua+Papa+Pio+XII+625+Santa+Barbara+d+Oeste+SP+13457-196',
  mapaEmbed: 'https://maps.google.com/maps?q=Rua%20Papa%20Pio%20XII%2C%20625%2C%20Santa%20B%C3%A1rbara%20d%27Oeste%20-%20SP%2C%2013457-196&z=15&output=embed',
};

// Menu na mesma ordem do site atual. Empresa abre Quem Somos e Relatório de Igualdade Salarial.
export const menu = [
  ['index', 'Home'],
  ['produtos', 'Produtos e Serviços'],
  ['clientes', 'Clientes'],
  ['solucoes', 'Soluções'],
  ['empresa', 'Empresa', [['empresa', 'Quem Somos'], ['igualdade-salarial', 'Relatório de Igualdade Salarial']]],
  ['contato', 'Contato'],
];

export const empresa = {
  intro: 'A Vectora Indústria é especializada no desenvolvimento de soluções completas que vão ao encontro das necessidades únicas de cada cliente.',
  intro2: 'Criamos projetos customizados, transformando ideias em realidade e buscando atingir novos paradigmas de competitividade. Com profissionais capacitados, recursos avançados e aprimoramento contínuo, a Vectora Indústria está sempre preparada para atender com rapidez e eficiência as solicitações de nossos clientes.',
  pilares: [
    ['folha', 'Sustentabilidade', 'Social, Ambiental e Econômica', 'Os compromissos da Vectora com a comunidade onde está localizada e com o meio ambiente estão pautados pelas ações que visam contribuir e modificar o planeta.'],
    ['suporte', 'Suporte Técnico', 'Especialistas', 'Com profissionais capacitados, recursos avançados e aprimoramento contínuo, a Vectora está sempre preparada para atender com rapidez e eficiência os clientes.'],
    ['engrenagem', 'Tecnologia', 'Avançada', 'A Vectora emprega sempre em seus equipamentos e projetos as tecnologias mais avançadas disponíveis no mercado.'],
  ],
};

// Slides do site atual, com os mesmos títulos e os mesmos produtos em destaque.
export const slides = [
  { foto: 'hero-vrp', itens: [
    { pre: 'Automatização de', titulo: 'VRP', sub: 'Válvula Redutora de Pressão', corte: 'corte-autobox', link: 'produtos/vt471-autobox' },
    { pre: 'Datalogger para', titulo: 'Monitoramento', sub: 'Pressão e Vazão', corte: 'corte-datalogger', link: 'produtos/vt490-datalogger' },
  ] },
  { foto: 'hero-dutos', itens: [
    { pre: 'Monitoramento', titulo: 'Proteção Catódica', sub: 'Tubulação de Óleo e Gás', corte: 'corte-vt460', link: 'produtos/vt460-protecao-catodica' },
  ] },
  { foto: 'hero-sistema', itens: [
    { pre: 'Sistema Web', titulo: 'VectoraSYS', sub: 'Totalmente integrado aos equipamentos', corte: 'corte-login', link: 'produtos/vz670-vectorasys' },
  ] },
];

export const categorias = [
  ['saneamento', 'Saneamento'],
  ['oleo-gas', 'Óleo e Gás'],
  ['web', 'Web'],
  ['iot', 'IoT'],
];

// Produtos na ordem do catálogo atual. Descrições e listas de características das páginas de cada produto.
export const produtos = [
  { slug: 'vt471-autobox', cod: 'VT471', nome: 'Autobox', titulo: 'Controlador de VRP', cats: ['saneamento'], img: 'p-vt471', foto: 'autobox-detalhe',
    resumo: 'Controlador eletrônico para válvulas redutoras de pressão, com sensores de pressão e registro de vazão.',
    texto: [
      'O AUTOBOX é um controlador eletrônico, multiponto e contínuo para válvulas globo autooperadas, com sensores de pressão incorporados e registro de dados de vazão e pressão. Atua diretamente na câmara da válvula, de forma independente do sistema de piloto original.',
      'Funciona com baterias internas e tem gabinete compacto e selado com grau de proteção IP-68, próprio para instalação em caixas subterrâneas. O modem GPRS/3G interno permite configurar e acompanhar o equipamento a distância, pela internet. Também tem interface serial RS232 ou USB para configuração local.',
    ],
    specs: ['2 canais digitais de pressão relativa', '2 canais de vazão unidirecional (pulso)', '1 canal analógico 4 a 20 mA, resolução de 12 bits', '2 entradas digitais de estado (0/1, contato seco), debouncer de 12 Hz e proteção ESD', 'Baterias de lítio seladas, internas ao gabinete, não recarregáveis', 'Gabinete plástico reforçado', 'Grau de proteção IP-68 (2 mca), lacrado de fábrica', 'Integração com aplicativo Android', 'Engates rápidos metálicos para 200 mca de pressão de trabalho, para mangueiras de nylon de 6 mm'] },
  { slug: 'vt490-datalogger', cod: 'VT490', nome: 'Datalogger', titulo: 'Pressão e Vazão', cats: ['saneamento'], img: 'p-vt490',
    resumo: 'Registrador de pressão e vazão com modem GPRS/3G e baterias para longa autonomia.',
    texto: [
      'O VT490 é um registrador de dados microprocessado, alimentado por bateria interna e montado em gabinete com vedação IP-68 ou IP-66. O baixo consumo garante longa autonomia e, em situações específicas, ele pode ser alimentado externamente.',
      'O modem GPRS/3G incorporado transmite os dados em intervalos regulares e permite a configuração remota do equipamento.',
    ],
    specs: ['2 canais de pressão', '2 canais de vazão (pulso reverso)', '2 canais 4 a 20 mA, resolução de 12 bits', '3 saídas digitais em coletor aberto, corrente máxima de 100 mA', '8 entradas digitais de estado (0/1, contato seco), debouncer de 12 Hz e proteção ESD', 'Baterias de lítio seladas, internas ao gabinete, não recarregáveis', 'Gabinete em alumínio ou plástico de engenharia', 'Grau de proteção IP-68 (2 mca), lacrado de fábrica', 'Integração com aplicativo Android', 'Engates rápidos metálicos para 200 mca de pressão de trabalho, para mangueiras de nylon de 6 mm'] },
  { slug: null, cod: 'VT490', nome: 'Datalogger B. Custo', titulo: 'Baixo custo', cats: ['saneamento'], img: 'p-vt490lc',
    resumo: 'Versão de baixo custo do datalogger VT490. Consulte a equipe comercial.' },
  { slug: 'vt490e-utr-ethernet', cod: 'VT490E', nome: 'UTR (Ethernet)', titulo: 'Pressão e Vazão', cats: ['saneamento'], img: 'p-vt490e',
    resumo: 'Unidade terminal remota com Ethernet, Modbus/TCP, HTTP e HTTPS para integrar a sistemas SCADA.',
    texto: [
      'O VT490E é uma Unidade Terminal Remota (UTR) microprocessada com interface Ethernet. Trabalha com os protocolos Modbus/TCP, HTTP e HTTPS e por isso se integra a qualquer sistema de supervisão compatível com Modbus/TCP, como o Elipse e os sistemas SCADA em geral.',
    ],
    specs: ['Canais de vazão pulsados', 'Entradas digitais', 'Entradas analógicas 4 a 20 mA', 'Sensor de pressão interno ao gabinete', 'Canal de comunicação Modbus para leitura de até 5 variáveis', 'Interface de configuração USB'] },
  { slug: 'vz670-vectorasys', cod: 'VZ670', nome: 'VectoraSys', titulo: 'Sistema Web', cats: ['web'], img: 'p-vz670',
    resumo: 'Software web para gerenciar, monitorar e controlar os equipamentos Vectora em campo.',
    texto: [
      'O VectoraSys é o sistema web da Vectora Indústria para gerenciamento, monitoramento e controle dos equipamentos. Pode ser acessado de qualquer computador com internet, o que facilita a supervisão e a administração dos equipamentos instalados em campo.',
    ],
    specs: ['Compatível com os principais navegadores do mercado', 'Exportação de dados em XLS, TXT, CSV e XML', 'Telas personalizáveis', 'Unidades de medida configuráveis', 'Idioma, padrão de telas e formato de data configuráveis', 'Quatro perfis de acesso de usuário', 'Registro das ações dos usuários em log', 'Geração de arquivos de configuração para atualizar os equipamentos em campo'] },
  { slug: 'vx511-meterlogger', cod: 'VX511', nome: 'Meterlogger', titulo: 'Datalogger de baixo custo', cats: ['saneamento'], img: 'p-vx511',
    resumo: 'Datalogger de vazão com canal Modbus RS-485, modem GPRS/3G e opção de alimentação externa.',
    texto: [
      'O VX511 é um registrador de dados microprocessado, alimentado por bateria interna e montado em gabinete com vedação IP-68 ou IP-66. O baixo consumo garante longa autonomia e, em situações específicas, ele pode ser alimentado externamente.',
      'O modem GPRS/3G incorporado transmite os dados em intervalos regulares e permite a configuração remota.',
    ],
    specs: ['2 canais de vazão (pulso)', '1 canal 4 a 20 mA, resolução de 12 bits', '1 canal de comunicação Modbus RS-485 (Modbus-RTU Mestre)', 'Baterias de lítio seladas, internas ao gabinete, não recarregáveis', 'Alimentação AC/DC 110/220 V na versão GPRS, ou 24 VDC', 'Gabinete em ABS e fibra de vidro', 'Grau de proteção IP-65 (alimentação externa)', 'Grau de proteção IP-68 na versão a bateria sem GPRS (lacrado de fábrica)'] },
  { slug: 'vt460-protecao-catodica', cod: 'VT460', nome: 'Catódica', titulo: 'Proteção Catódica', cats: ['oleo-gas'], img: 'p-vt460',
    resumo: 'Monitoramento remoto de retificadores e pontos de drenagem em sistemas de proteção catódica.',
    texto: [
      'O VT460 é uma ferramenta de monitoramento remoto de retificadores e pontos de drenagem em sistemas de proteção catódica. Faz as leituras em intervalos pré-configurados e disponibiliza os dados pela porta USB, por modem GPRS/3G ou por transmissão via satélite para um servidor, acessado por interface web.',
    ],
    specs: ['Monitora o potencial tubo-solo e a corrente e a tensão de saída do retificador', 'Tempo de operação com horímetro integrado (opcional)', 'Alarmes de porta do painel aberta, fusível queimado, presença de energia da rede e outros'] },
  { slug: 'vr520-detector-de-corrente', cod: 'VR520', nome: 'Detector de Corrente', titulo: 'Detector de Corrente', cats: ['oleo-gas'], img: 'p-vr520',
    resumo: 'Detector de corrente com interfaces analógica e digital, para aplicações industriais.',
    texto: [
      'O VR520 é um detector de corrente feito para aplicações que exigem confiabilidade, precisão e flexibilidade de uso. Tem interfaces analógica e digital e atende aplicações industriais de vários segmentos.',
      'A saída digital indica se a corrente medida está acima ou abaixo de um limite pré-ajustado. Ligado ao horímetro VT380, registra as horas de funcionamento de acordo com o nível de corrente.',
    ],
    specs: ['Alimentação interna por pilhas AA de lítio, 2400 mAh no total', 'Autonomia de 3 a 5 anos', 'Grau de proteção IP53', 'Temperatura de operação de 0 a 85 °C', 'Peso aproximado de 79 g', 'Dimensões 70 x 55 x 30 (C x L x A)', 'Caixa em ABS preto, formato padrão DIN', 'Resolução de 60 microvolts', 'Precisão de 0,2 microvolt', 'Faixa da entrada analógica de 0 a 60 microvolts', 'Saída digital em contato seco 0,3 A / 110 VDC'] },
  { slug: 'vt701-controlador-booster', cod: 'VT701', nome: 'Controlador Booster', titulo: 'Controlador de Booster', cats: ['saneamento'], img: 'p-vt701',
    resumo: 'Controle de sistemas de bombeamento para reduzir energia, desgaste e perdas no abastecimento.',
    texto: [
      'O VT701 é um equipamento microprocessado desenvolvido para o controle de sistemas de bombeamento. Tem como objetivo reduzir o consumo de energia, aumentar a vida útil do conjunto motobomba e diminuir as perdas nos sistemas de abastecimento de água.',
      'O modem GPRS/3G/4G transmite os dados armazenados nos intervalos definidos pelo usuário.',
    ],
    specs: ['3 canais de vazão', '2 canais digitais de pressão', '2 canais 4 a 20 mA, resolução de 12 bits', '3 saídas digitais em coletor aberto, corrente máxima de 100 mA', '8 entradas digitais de estado (0/1, contato seco)', 'Coleta de até 5 variáveis Modbus configuráveis', 'Envio da configuração de operação do inversor via Modbus', 'Memória de 8 MB (cerca de 2.000.000 de registros)', 'Temperatura ambiente', 'Modem GPRS/3G/4G para transmissão dos dados'] },
  { slug: 'vt601-micro-macro-medicao', cod: 'VT601', nome: 'Micro/Macro Medição', titulo: 'Datalogger IoT', cats: ['saneamento', 'iot'], img: 'p-vt601',
    resumo: 'Datalogger IoT com duas entradas de vazão, bateria interna e configuração remota.',
    texto: [
      'O VT601 é um registrador de dados microprocessado, alimentado por bateria interna e montado em gabinete com vedação IP-68 ou IP-66. O baixo consumo garante longa autonomia.',
      'A comunicação IoT incorporada envia os dados em intervalos regulares e permite a configuração remota. Tem duas entradas para medição de vazão.',
    ],
    specs: ['2 canais de vazão', 'Bateria de lítio selada, interna ao gabinete, não recarregável', 'Gabinete em plástico de engenharia', 'Grau de proteção IP-68 (2 mca), lacrado de fábrica', 'Comunicação IoT com envio em intervalos regulares', 'Configuração remota'] },
  { slug: 'vt600-controle-valvula', cod: 'VT600', nome: 'Contr. Válvula ON/OFF', titulo: 'Datalogger IoT', cats: ['saneamento', 'iot'], img: 'p-vt600',
    resumo: 'Datalogger IoT de pressão e vazão com saídas para abrir e fechar válvulas até DN25.',
    texto: [
      'O VT600 é um registrador de dados microprocessado, alimentado por bateria interna e montado em gabinete com vedação IP-68 ou IP-66. O baixo consumo garante longa autonomia, e a comunicação IoT incorporada envia os dados em intervalos regulares e permite a configuração remota.',
      'Tem um canal de pressão e duas saídas digitais para controle ON/OFF de válvulas, que abrem ou fecham tubulações de até DN25.',
    ],
    specs: ['1 canal de pressão', '2 canais de vazão (pulso reverso)', '2 saídas digitais em coletor aberto, corrente máxima de 100 mA', 'Baterias de lítio seladas, internas ao gabinete, não recarregáveis', 'Gabinete em plástico de engenharia', 'Grau de proteção IP-68 (2 mca), lacrado de fábrica'] },
  { slug: 'vt462-teste-protecao-catodica', cod: 'VT462', nome: 'Teste Proteção Catódica', titulo: 'Proteção Catódica IoT', cats: ['oleo-gas', 'iot'], img: 'p-vt462',
    resumo: 'Monitoramento remoto de retificadores e pontos de teste (PTEs) por comunicação IoT.',
    texto: [
      'O VT462 é uma ferramenta avançada para o monitoramento remoto de retificadores e pontos de teste (PTEs) em sistemas de proteção catódica. Faz as leituras em intervalos pré-configurados, disponibiliza os dados pela porta USB e os envia por comunicação IoT para um servidor acessado por interface web.',
    ],
    specs: ['Monitora o potencial tubo-solo', 'Bateria de lítio selada, interna ao gabinete, não recarregável', 'Gabinete em plástico de engenharia', 'Grau de proteção IP-68 (2 mca), lacrado de fábrica'] },
];

// Serviços: o site atual só traz os nomes, com a linha "Elétricos / Hidráulicos / Treinamentos".
export const servicos = [
  ['painel', 'Montagem de Painéis Elétricos'],
  ['capelo', 'Treinamentos'],
  ['chave', 'Instalações'],
  ['regua', 'Projetos Customizados'],
  ['antena', 'Telemetria'],
  ['engrenagem', 'Manutenção de Equipamentos'],
];

export const tecnologias = [
  ['Bluetooth', 'Conexão ponta a ponta', 'Transmite dados entre equipamentos próximos, em conexão direta.'],
  ['GPRS / 3G', 'Conexão através da internet', 'Envio de dados remotos pela rede celular, de baixo custo, usado em sistemas de monitoramento a distância.'],
  ['RFID', 'Conexão ponta a ponta', 'Identificação eletrônica segura e econômica, usada para reconhecer produtos e controlar acessos, entre outras finalidades.'],
  ['MESH', 'Conexão multipontos', 'Rede sem fio de alta velocidade, usada em automação industrial, que dispensa grandes instalações de cabos.'],
  ['Fibra óptica', 'Conexão ponta a ponta', 'Transmissão de informações em alta velocidade por meio de luz, o que possibilita aplicações de fotônica.'],
  ['IoT', 'Conexão multipontos', 'Internet das Coisas: torna objetos automatizados e acessíveis ou controláveis online.'],
];

export const cases = [
  { slug: 'saneamento', setor: 'Saneamento', titulo: 'Controle de Pressão e Vazão', img: 'case-saneamento', foto: 'hero-vrp',
    resumo: 'Monitoramento e automação das redes de distribuição de água das empresas de saneamento.',
    intro: 'Pensando nas empresas de saneamento, que precisam monitorar e automatizar suas redes de distribuição de água, a Vectora Indústria desenvolveu um sistema de monitoramento e controle de pressão e vazão em redes de tubulação.',
    pontos: [
      ['Controle remoto de VRP', 'O operador programa a vazão de saída da válvula redutora de pressão para os períodos de menor uso da rede, evitando picos de pressão.'],
      ['Registro de dados', 'O sistema guarda o histórico de pressão e vazão da rede ou dos pontos de fiscalização.'],
      ['Conexão com a nuvem', 'Os dados coletados seguem via GPRS para um software na internet, onde são analisados em gráficos e onde os equipamentos são configurados a distância.'],
    ],
    resultado: 'Com isso, a rede de saneamento passa a ser totalmente gerenciada, o que ajuda a evitar a fadiga da tubulação e a prevenir acidentes.',
    equipamentos: ['vt471-autobox', 'vt490-datalogger'] },
  { slug: 'oleo-e-gas', setor: 'Óleo e Gás', titulo: 'Monitoramento de Dutos', img: 'case-petroleo', foto: 'hero-dutos',
    resumo: 'Controle e monitoramento da proteção catódica de dutos de transporte de derivados de petróleo.',
    intro: 'Controlar e monitorar os sistemas de proteção catódica, com seus retificadores e pontos de drenagem, é uma tarefa difícil e importante nos dutos de transporte de produtos petroquímicos. A Vectora Indústria desenvolveu um sistema de monitoramento remoto para essa necessidade.',
    pontos: [
      ['Medições em campo', 'Acompanha o potencial tubo-solo, a corrente e a tensão de saída dos retificadores e o tempo de operação.'],
      ['Alarmes', 'Avisa sobre porta do painel aberta, fusível queimado e falta de energia da rede.'],
      ['Interface 100% web', 'Gerencia perfis de usuário e filtros, mostra o histórico e o estado dos equipamentos, gera gráficos e exporta os dados em formatos padrão.'],
    ],
    resultado: 'Equipamentos utilizados: VT460 (telemetria remota do potencial de proteção catódica), VT350 (telemetria remota de ponto de teste, PTE) e VR520 (detector de corrente).',
    equipamentos: ['vt460-protecao-catodica', 'vr520-detector-de-corrente'] },
];

// Logos da página Clientes do site atual, na mesma ordem.
export const clientes = [
  ['aegea', 'AEGEA'], ['sabesp', 'Sabesp'], ['monterey', 'SADM Monterrey'], ['queretaro', 'CEA Querétaro'], ['brk', 'BRK Ambiental'],
  ['daee', 'DAEE'], ['coden', 'CODEN'], ['natura', 'Natura'], ['cordeiropolis', 'SAAE Cordeirópolis'], ['sanasa', 'SANASA'],
  ['copasa', 'COPASA'], ['saneago', 'SANEAGO'], ['spuk', 'Supply UK'], ['cogerh', 'COGERH'], ['corsan', 'CORSAN'],
  ['miya', 'Miya'], ['enorsul', 'Enorsul'], ['rhs', 'RHS Controls'], ['south', 'South Staffs Water'], ['pirelli', 'Pirelli'],
  ['shell', 'Shell'], ['beb', 'B&B Engenharia'], ['conaut', 'Conaut'], ['iec', 'IEC'], ['saae_guarulhos', 'SAAE Guarulhos'],
  ['semarh', 'SEMARH'], ['ifs', 'IFS'], ['bauducco', 'Bauducco'], ['rancharia', 'Prefeitura de Rancharia'], ['cadre', 'Cadre'],
  ['gerentec', 'Gerentec'], ['digitrol', 'Digitrol'], ['semae_pir', 'SEMAE Piracicaba'], ['compesa', 'COMPESA'], ['suez', 'Suez'],
  ['vitalux', 'Vitalux'], ['transpetro', 'Transpetro'], ['catui', 'Catuí'], ['passarelli', 'Passarelli'], ['elevacao', 'Construtora Elevação'],
  ['enops', 'Enops'], ['vita', 'Vita Ambiental'], ['tecbridge', 'Tecbridge'], ['seanatins', 'Saneatins'], ['camargo', 'Camargo Corrêa'],
  ['trail', 'Trail'], ['cobrape', 'Cobrape'], ['contru', 'Construtami'], ['frabetti', 'Frabetti'], ['monte_alegre', 'Monte Alegre do Sul'],
  ['nova_olinda', 'Nova Olinda'], ['aguasdobrasil', 'Águas do Brasil'], ['engeforme', 'Engeforme'], ['gerdau', 'Gerdau'], ['petrobras', 'Petrobras'],
  ['pref_porto_alegre', 'Prefeitura de Porto Alegre'], ['saecil', 'SAECIL'], ['sanepar', 'SANEPAR'], ['sanesul', 'Sanesul'], ['vector_eng', 'Vector Engenharia'],
];
// Os que aparecem primeiro na home.
export const destaqueClientes = ['sabesp', 'petrobras', 'transpetro', 'shell', 'gerdau', 'copasa', 'sanepar', 'corsan', 'brk', 'aegea', 'suez', 'natura'];

export const igualdade = {
  titulo: 'Relatório de Igualdade Salarial',
  periodo: '2º semestre de 2025',
  base: ['Lei 14.611/2023', 'Decreto 11.795/2023', 'Portaria MTE nº 3.714/2023', 'Instrução Normativa GM/MTE nº 6/2024'],
  notas: [
    'Estabelecimentos com mais de 100 empregados devem publicar o Relatório de Transparência Salarial a cada semestre, conforme a Lei 14.611/2023.',
    'O relatório foi elaborado pelo Ministério do Trabalho e Emprego (MTE) com dados do eSocial e das declarações de igualdade salarial enviadas pelo Portal Emprega Brasil.',
    'O MTE usou apenas os grandes grupos da Classificação Brasileira de Ocupações (CBO). Por isso, os números não indicam, por si só, diferenças salariais injustificadas ou discriminação.',
    'A empresa publica o relatório em cumprimento ao artigo 5º da Lei 14.611/2023.',
  ],
  compromisso: 'A Vectora reafirma o compromisso com um ambiente de trabalho mais justo, diverso e igualitário.',
};

// Título e descrição de cada página (SEO).
export const paginas = {
  index: ['Vectora Indústria · Soluções em telemetria e gestão de perdas', 'Equipamentos e sistemas de telemetria para saneamento e óleo e gás: controle de VRP, dataloggers de pressão e vazão, proteção catódica e o sistema web VectoraSys.'],
  empresa: ['Quem Somos · Vectora Indústria', "Conheça a Vectora Indústria, de Santa Bárbara d'Oeste (SP): soluções completas e projetos customizados em telemetria e gestão de perdas."],
  produtos: ['Produtos e Serviços · Vectora Indústria', 'Controladores de VRP, dataloggers, UTR Ethernet, proteção catódica, controlador de booster e o sistema web VectoraSys. Serviços elétricos, hidráulicos e treinamentos.'],
  clientes: ['Clientes · Vectora Indústria', 'Empresas de saneamento, indústria e óleo e gás que confiam na Vectora Indústria.'],
  solucoes: ['Soluções · Vectora Indústria', 'Cases de saneamento e óleo e gás e as tecnologias de comunicação usadas nos equipamentos Vectora.'],
  'igualdade-salarial': ['Relatório de Igualdade Salarial · Vectora Indústria', 'Relatório de Transparência Salarial da Vectora Indústria, conforme a Lei 14.611/2023.'],
  contato: ['Contato · Vectora Indústria', "Fale com a Vectora Indústria: +55 (19) 2223-8888, Rua Papa Pio XII, 625, Santa Bárbara d'Oeste (SP)."],
};
for (const p of produtos) if (p.slug) paginas['produtos/' + p.slug] = [`${p.cod} ${p.nome} · Vectora Indústria`, p.resumo];
for (const c of cases) paginas['solucoes/' + c.slug] = [`${c.titulo} · ${c.setor} · Vectora Indústria`, c.resumo];
