// Conteúdo da CVL Máquinas, transcrito do site atual (cvlmaquinas.com.br, páginas Empresa, Produtos, Representantes e Contato).
// Os textos das máquinas são os do site; só a ordem e a divisão em listas foram arrumadas.

export const empresa = {
  nome: 'CVL Máquinas',
  razao: 'CVL Máquinas Ltda',
  url: 'https://cvlmaquinas.overtus.com.br/',
  antigo: 'https://www.cvlmaquinas.com.br',
  slogan: 'Desde 1979 formando com você uma parceria perfeita!',
  fundacao: 1979,
  area: '21.000',
  modelos: 'mais de trinta',
  fone: '(49) 3653-3900',
  foneHref: '+554936533900',
  email: 'cvl@cvlmaquinas.com.br',
  endereco: ['Rodovia SC-473, km 23,5', 'Bairro Industrial', 'Anchieta, SC · CEP 89970-000'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=CVL+M%C3%A1quinas+Rodovia+SC-473+Anchieta+SC',
  mapaEmbed: 'https://maps.google.com/maps?q=CVL%20M%C3%A1quinas%2C%20Anchieta%20SC&z=13&output=embed',
  bndes: 'https://www.cartaobndes.gov.br/',
  proger: 'https://www.bb.com.br/site/pra-voce/financiamentos/',
};

export const historia = [
  'Fundada em 1979, inicialmente prestava serviços de manutenção e consertos em equipamentos e possuía apenas um torno e um único funcionário. Começava, então, a história da CVL Máquinas, uma história feita de trabalho, dedicação e sucesso.',
  'Em 1980, já com vários funcionários contratados e com mais recursos físicos, desenvolveu, sob encomenda, a máquina que viria a ser um marco na história da CVL Máquinas: a Perfuradora de Montante de Veneziana.',
  'A partir daí, com a participação decisiva de uma nova geração de colaboradores, a oficina de consertos transformou-se em fábrica. Mudou-se em 1982 para sua sede própria e passou à produção seriada da Perfuradora de Montante de Veneziana.',
  'Em meados de 1986 iniciou o desenvolvimento e a produção, também seriada, de máquinas para fabricação de móveis e aberturas, ramo de atividade em que atua com grande sucesso até hoje.',
  'Sempre sob a direção dos irmãos Célio e Joel Lago, em 2001 a empresa foi transferida para novas e modernas instalações fabris no Parque Industrial do Município de Anchieta (SC), onde ocupa uma área de 21.000 metros quadrados.',
  'Atualmente a CVL desenvolve e produz mais de trinta modelos de máquinas voltadas aos setores moveleiro e madeireiro. Busca incansavelmente, além do aprimoramento de seus produtos, o bem-estar e o crescimento pessoal e profissional de seus colaboradores.',
  'Sempre fiel a seus princípios, conquista seu espaço no mercado produzindo equipamentos de qualidade, valorizando o companheirismo, a ética e o respeito a todos os envolvidos, que são os alicerces desta sólida empresa.',
];

// Marcos tirados do texto da história (sem datas inventadas).
export const marcos = [
  { ano: '1979', titulo: 'Um torno e um funcionário', texto: 'Começa como oficina de manutenção e conserto de equipamentos.' },
  { ano: '1980', titulo: 'A Perfuradora de Montante', texto: 'Desenvolvida sob encomenda, vira o marco da história da CVL.' },
  { ano: '1982', titulo: 'Sede própria', texto: 'A oficina vira fábrica e a perfuradora entra em produção seriada.' },
  { ano: '1986', titulo: 'Móveis e aberturas', texto: 'Começa a produção seriada de máquinas para fabricar móveis e aberturas.' },
  { ano: '2001', titulo: 'Parque Industrial de Anchieta', texto: 'Novas instalações em Anchieta (SC), numa área de 21.000 m².' },
  { ano: 'Hoje', titulo: 'Mais de trinta modelos', texto: 'Máquinas para os setores moveleiro e madeireiro, sob a direção dos irmãos Célio e Joel Lago.' },
];

export const missao = 'Oferecer produtos e serviços de qualidade, com ética, seriedade e respeito promovendo o crescimento econômico e social de todos os envolvidos.';
export const visao = 'Trabalhar para que nosso produto seja indispensável para o sucesso de nosso cliente.';
export const valores = ['Companheirismo', 'Ética', 'Respeito a todos os envolvidos'];

// Linhas na ordem da página "Produtos" do site atual.
export const linhas = [
  { slug: 'coladeiras', nome: 'Coladeiras', sub: 'Coladeiras de bordas', etapa: 'Bordas', verbo: 'Colar a fita de borda', capa: 'futura-vi' },
  { slug: 'seccionadoras', nome: 'Seccionadoras', sub: 'Seccionadoras de painéis', etapa: 'Corte', verbo: 'Cortar as chapas', capa: 'versatil' },
  { slug: 'lixadeiras', nome: 'Lixadeiras', sub: 'Verticais, banda larga e de bordas', etapa: 'Lixamento', verbo: 'Lixar e calibrar', capa: 'lvb-3-grupos' },
  { slug: 'extrusoras', nome: 'Extrusoras', sub: 'De polietileno para perfis redondos', etapa: 'Plastificação', verbo: 'Plastificar cabos e perfis', capa: 'eppr-55-2' },
  { slug: 'perfuradoras', nome: 'Perfuradoras', sub: 'De montantes de veneziana', etapa: 'Esquadrias', verbo: 'Furar montantes de portas e janelas', capa: 'pmp-102' },
  { slug: 'tupia', nome: 'Tupia', sub: 'Tupia moldureira', etapa: 'Fresamento', verbo: 'Fresar, encaixar e acabar', capa: 'tm-1100' },
  { slug: 'furadeiras', nome: 'Furadeiras', sub: 'Furadeiras múltiplas', etapa: 'Furação', verbo: 'Furar componentes em série', capa: 'fmo' },
];

// Fluxo de produção da versão B: a ordem em que um painel passa pelas máquinas.
export const fluxo = [
  { linha: 'seccionadoras', passo: 'Corte', texto: 'A chapa de MDF ou aglomerado vira peças na medida.' },
  { linha: 'coladeiras', passo: 'Bordas', texto: 'A fita de borda é colada, destopada, refilada e polida.' },
  { linha: 'furadeiras', passo: 'Furação', texto: 'Furos de cavilha e montagem em série, com vários cabeçotes.' },
  { linha: 'tupia', passo: 'Fresamento', texto: 'Encaixes, molduras e acabamentos de perfil.' },
  { linha: 'lixadeiras', passo: 'Lixamento', texto: 'Calibrar e lixar antes da pintura ou do verniz.' },
];

const fotoNome = {
  externa: 'Vista geral', externa_1: 'Vista geral', externa1: 'Vista geral', externa2: 'Outro ângulo', externa_2: 'Outro ângulo', externa_3: 'Lateral', externa_4: 'Grupos de trabalho',
  frente: 'Frente', externa_frente: 'Frente', tras: 'Traseira', externa_tras: 'Traseira', entrada: 'Entrada', 'saída': 'Saída', f_externa: 'Versão mesa fixa',
  bitolador: 'Bitolador', mesa: 'Mesa', serra: 'Serra e riscadora', encosto: 'Encosto eletrônico', painel: 'Painel de comando',
  grupos: 'Grupos lixadores', escova: 'Escova', motores: 'Motores', redutor: 'Redutor', conjuntos: 'Conjuntos lixadores', esteira: 'Esteira',
  lixa: 'Lixa', exaustao: 'Exaustão', matriz: 'Matriz', extrusao: 'Extrusão', acionamento_emb: 'Acionamento', mancal_ferramenta: 'Mancal da ferramenta',
  prensor_cremalheira: 'Prensor e cremalheira', cabecotes_furacao: 'Cabeçotes de furação', inclinacao: 'Inclinação', pressionador: 'Pressionador',
  cabecotes: 'Cabeçotes', oscilacao: 'Oscilação',
};

// fotos: nomes dos arquivos originais em /admin/fotos/ (sem .jpg); recorte: foto com fundo removido.
// dim: medidas em mm [comprimento, largura, altura]; modelos: quando a máquina tem tamanhos diferentes.
export const maquinas = [
  {
    slug: 'futura-iv', nome: 'Futura IV', linha: 'coladeiras', recorte: 'futura_iv_externa_1',
    fotos: ['futura_iv_externa_1', 'futura_iv_externa_2', 'futura_iv_externa_3', 'futura_iv_externa_4'],
    resumo: 'Modelo básico para colar bordas retas com precisão.',
    aplicacao: ['Modelo básico, desenvolvida para colar bordas retas com precisão e qualidade, porém não possui tupia de entrada como item de série.'],
    carac: ['Espessura da borda de 0,4 até 3 mm', 'Altura da borda de 8 a 60 mm', 'Velocidade do transporte de 11 a 20 m/min', 'Coleiro', 'Destopador', 'Refilador', 'Polidor'],
    opcionais: ['Raspador', 'Coleiro extra'],
    dim: [2760, 1850, 1600],
  },
  {
    slug: 'futura-v', nome: 'Futura V / V Plus', linha: 'coladeiras', recorte: 'v_externa',
    fotos: ['v_externa', 'v_externa_frente', 'v_externa_tras'],
    resumo: 'Tupia dupla na entrada e controle por CLP com tela touchscreen.',
    aplicacao: ['A linha Futura V e V Plus já possui tupia dupla na entrada, garantindo uma superfície perfeita para a colagem da fita de borda. Além disso, oferece em seus opcionais coleiro extra e também com pré-aquecimento (Plus).'],
    carac: ['Controle por CLP e IHM touchscreen', 'Espessura da borda de 0,4 a 3 mm', 'Altura da borda de 8 a 60 mm', 'Velocidade do transporte de 11 m/min (V) e ajustável de 10 a 20 m/min (Plus)', 'Antiaderente', 'Tupia dupla na entrada', 'Coleiro', 'Destopador', 'Refilador', 'Raspador', 'Polidor'],
    opcionais: ['Coleiro extra', 'Coleiro extra pré-aquecido'],
    dim: [3730, 1850, 1600],
    destaque: ['Tupia', 'Coleiro', 'Destopador', 'Refilador', 'Raspador', 'Polidor'],
  },
  {
    slug: 'futura-vi', nome: 'Futura VI', linha: 'coladeiras', recorte: 'externa_frente',
    fotos: ['externa_frente'],
    resumo: 'O modelo mais completo, com conjunto lixador ou fresador de canal.',
    aplicacao: ['Modelo mais completo, a Futura VI oferece, além de todos os conjuntos disponíveis nos demais modelos, a opção de conjunto lixador ou fresador de canal. Ainda como opcional, pode ser equipada com porta de acesso rápido, visando agilidade no momento de abastecer o coleiro e trocar a fita.'],
    carac: ['Controle por CLP e IHM touchscreen', 'Espessura da borda de 0,4 a 3 mm', 'Altura da borda de 8 a 60 mm', 'Velocidade do transporte ajustável de 10 a 20 m/min', 'Antiaderente', 'Tupia dupla na entrada', 'Coleiro', 'Destopador', 'Refilador', 'Raspador', 'Polidor', 'Lixador'],
    opcionais: ['Fresador de canal', 'Coleiro extra', 'Coleiro extra pré-aquecido', 'Coleiro para cola PUR', 'Porta de acesso rápido'],
    dim: [5800, 1940, 1860],
  },
  {
    slug: 'pratica', nome: 'Prática', linha: 'seccionadoras', recorte: 'pratica_externa',
    fotos: ['pratica_externa', 'pratica_serra', 'pratica_mesa', 'pratica_bitolador'],
    resumo: 'Seccionadora compacta na medida única de 2900 mm.',
    aplicacao: ['A Seccionadora Prática é fornecida na medida única de 2900 mm, com a precisão e eficiência das demais integrantes da linha de Seccionadoras CVL, porém em um equipamento mais compacto.'],
    carac: ['Sistema de retorno temporizado do carro da serra', 'Sistema para troca rápida das serras de corte e riscadora', 'Barra de segurança no prensor', 'Velocidade de avanço variável de 10 a 30 m/min', 'Inversor de frequência no carro da serra', 'Altura de corte de 60 mm'],
    dim: [5100, 5740, 1500],
  },
  {
    slug: 'pratica-plus', nome: 'Prática Plus', linha: 'seccionadoras', recorte: 'pratica-plus_externa',
    fotos: ['pratica-plus_externa', 'pratica-plus_externa_2', 'pratica-plus_encosto', 'pratica-plus_painel'],
    resumo: 'A base da Prática com CLP, encosto eletrônico e tela touchscreen.',
    aplicacao: ['Construída sobre a mesma base da Prática, a versão Plus conta com sistema de CLP, aliando tecnologia com custo x benefício.'],
    carac: ['Sistema de tempo de retorno do carro da serra (CLP)', 'Sistema para troca rápida das serras de corte e riscadora', 'Barra de segurança no prensor', 'Velocidade de avanço variável de 10 a 30 m/min', 'Inversor de frequência no carro da serra', 'Encosto eletrônico controlado por CLP', 'Painel de comandos com IHM (Interface Homem Máquina) touchscreen'],
    dim: [5100, 6600, 1500],
  },
  {
    slug: 'exacta', nome: 'Exacta', linha: 'seccionadoras', recorte: 'scs-exacta_externa',
    fotos: ['scs-exacta_externa'],
    resumo: 'Melhor custo x benefício, em três tamanhos e conforme a NR 12.',
    aplicacao: ['Máquina desenvolvida pensando no melhor custo x benefício, a Seccionadora Exacta está disponível em três tamanhos: 1500, 3400 e 3800 mm. Equipamento de fácil utilização e comandos simplificados, aliando produtividade e qualidade ao trabalho.'],
    carac: ['Sistema de retorno temporizado do carro da serra', 'Sistema para troca rápida das serras de corte e riscadora', 'Barra e cortina de segurança no prensor', 'Tampas de acesso ao carro da serra com sistema de travamento', 'Equipamento em conformidade com a normativa NR 12', 'Velocidade de avanço variável de 10 a 30 m/min', 'Inversor de frequência no carro da serra'],
    modelos: [['Exacta 1500', 3800, 5740, 1520], ['Exacta 3400', 5600, 5740, 1520], ['Exacta 3800', 6000, 5740, 1520]],
  },
  {
    slug: 'versatil', nome: 'Versátil', linha: 'seccionadoras', recorte: 'scs_versatil_externa',
    fotos: ['scs_versatil_externa'],
    resumo: 'Robusta, com encosto eletrônico automático da peça.',
    aplicacao: ['Máquina robusta e confiável, a Seccionadora Versátil traz como diferencial o sistema de encosto eletrônico da peça, proporcionando assim mais qualidade e precisão ao trabalho.'],
    carac: ['Sistema de retorno temporizado do carro da serra', 'Sistema para troca rápida das serras de corte e riscadora', 'Barra e cortina de segurança no prensor', 'Tampas de acesso ao carro da serra com sistema de travamento', 'Equipamento em conformidade com a normativa NR 12', 'Velocidade de avanço variável de 10 a 30 m/min', 'Inversor de frequência no carro da serra', 'Encosto eletrônico automático'],
    modelos: [['Versátil 1500', 3800, 5930, 1600], ['Versátil 3400', 5600, 5930, 1600], ['Versátil 3800', 6000, 5930, 1600]],
  },
  {
    slug: 'maxima', nome: 'Máxima', linha: 'seccionadoras', recorte: 'scs-maxima_externa',
    fotos: ['scs-maxima_externa', 'scs-maxima_painel'],
    resumo: 'A mais completa: CLP, otimizador de corte e supervisório.',
    aplicacao: ['Equipamento mais completo da linha de seccionadoras, a Máxima é dotada de funções controladas por CLP (Controle Lógico Programável), diferencial tecnológico que propicia um trabalho eficiente e muito mais rendimento com cortes programados.', 'Equipada com sistema computadorizado, possui otimizador de corte, aumentando o aproveitamento de material, com capacidade de armazenamento de planos de corte e visualização gráfica dos cortes no momento em que os mesmos estão sendo executados. É oferecida nas medidas de 1500, 3400 e 3800 mm.'],
    carac: ['Sistema de tempo de retorno do carro da serra (CLP)', 'Sistema para troca rápida das serras de corte e riscadora', 'Barra e cortina de segurança no prensor', 'Tampas de acesso ao carro da serra com sistema de travamento', 'Equipamento em conformidade com a normativa NR 12', 'Velocidade de avanço e retorno da serra ajustável até 70 m/min', 'Inversor de frequência no carro da serra', 'Empurrador eletrônico equipado com conjunto de pinças e controlador CLP', 'Painel de comandos computadorizado, com sistema operacional, otimizador de corte e supervisório'],
    modelos: [['Máxima 1500', 3800, 5930, 1600], ['Máxima 3400', 5600, 5930, 1600], ['Máxima 3800', 6000, 5930, 1600]],
    destaque: ['Sistema operacional', 'Otimizador de corte', 'Supervisório', 'Conjunto de pinças', 'Controlador CLP', 'Sistemas de segurança'],
  },
  {
    slug: 'lvb-2-grupos', nome: 'LVB 2 Grupos', linha: 'lixadeiras', recorte: '2_frente',
    fotos: ['2_frente', '2_entrada', '2_saída', '2_tras'],
    resumo: 'Banda larga para lixar e calibrar peças planas, em quatro larguras.',
    aplicacao: ['Lixadeira de banda larga desenvolvida com tecnologia avançada que proporciona maior qualidade nas funções lixar e calibrar e no acamento em peças planas de madeira, MDF, aglomerado, OSB, entre outros materiais.', 'Disponível nos modelos 600, 900, 1100 e 1300 convencional ou com mesa fixa, sistema utilizado em linha de pintura. Neste caso, a mesa é fixada na estrutura inferior da máquina e a regulagem de espessura da peça é feita na estrutura superior.'],
    carac: ['Sistema de segurança em caso de rompimento ou deslocamento lateral das lixas', 'Esticamento pneumático das lixas', 'Bitolador de espessura da peça', 'Oscilação pneumática das lixas por sensor', 'Rolos pressionadores emborrachados', 'Roletes de apoio na entrada e saída da mesa', 'Centralizador automático do tapete transportador', 'Velocidade do tapete transportador variável eletronicamente'],
    modelos: [['LVB 600', 2050, 1200, '2350 / 2600'], ['LVB 900', 2050, 1500, '2350 / 2600'], ['LVB 1100', 2050, 1700, '2350 / 2600'], ['LVB 1300', 2050, 1850, '2350 / 2600']],
    notaModelos: 'Altura convencional / com mesa fixa.',
  },
  {
    slug: 'lvb-3-grupos', nome: 'LVB 3 Grupos', linha: 'lixadeiras', recorte: 'lvb_3g_externa',
    fotos: ['lvb_3g_externa', 'lvb_3g_f_externa', 'lvb_3g_grupos', 'lvb_3g_escova'],
    resumo: 'Três grupos lixadores para acabamento em uma passada.',
    aplicacao: ['Lixadeira de banda larga desenvolvida com tecnologia avançada que proporciona maior qualidade nas funções lixar e calibrar e no acamento em peças planas de madeira, MDF, aglomerado, OSB, entre outros materiais.', 'Disponível nos modelos 600, 900, 1100 e 1300 convencional ou com mesa fixa, sistema utilizado em linha de pintura. Neste caso, a mesa é fixada na estrutura inferior da máquina e a regulagem de espessura da peça é feita na estrutura superior.'],
    carac: ['Três grupos lixadores', 'Sistema de segurança em caso de rompimento ou deslocamento lateral das lixas', 'Esticamento pneumático das lixas', 'Bitolador de espessura da peça', 'Oscilação pneumática das lixas por sensor', 'Rolos pressionadores emborrachados', 'Roletes de apoio na entrada e saída da mesa', 'Centralizador automático do tapete transportador', 'Velocidade do tapete transportador variável eletronicamente'],
    modelos: [['LVB 600/3', 2500, 1200, '2350 / 2600'], ['LVB 900/3', 2500, 1500, '2350 / 2600'], ['LVB 1100/3', 2500, 1700, '2350 / 2600'], ['LVB 1300/3', 2500, 1850, '2350 / 2600']],
    notaModelos: 'Altura convencional / com mesa fixa.',
    destaque: ['Três grupos lixadores', 'Esticamento pneumático', 'Bitolador de espessura', 'Oscilação por sensor', 'Centralizador do tapete', 'Mesa fixa para pintura'],
  },
  {
    slug: 'lv3-250', nome: 'LV3 250', linha: 'lixadeiras', recorte: 'lv3-250_externa',
    fotos: ['lv3-250_externa', 'lv3-250_grupos', 'lv3-250_motores', 'lv3-250_redutor'],
    resumo: 'Compacta, com três grupos lixadores, para peças de até 230 mm.',
    aplicacao: ['Indicada para fabricantes de móveis e esquadrias, é um equipamento compacto que agrega toda a tecnologia das grandes lixadeiras de banda larga.', 'Equipamento utilizado para lixar, calibrar e dar melhor acabamento em peças planas de madeira, MDF, aglomerado, OSB entre outros materiais, com até 230 mm de largura.', 'Sendo um equipamento compacto, além de minimizar o investimento inicial, reduz também os custos de operação e possui regulagens simplificadas, proporcionando maior rapidez e agilidade no processo produtivo.'],
    carac: ['Três grupos lixadores', 'Inversor de frequência no tapete transportador', 'Esticamento pneumático das lixas', 'Largura útil de lixamento de 230 mm', 'Altura útil de lixamento de 165 mm'],
    dim: [730, 1500, 2200],
  },
  {
    slug: 'lvd-250', nome: 'LVD 250', linha: 'lixadeiras', recorte: 'lvd-250_externa',
    fotos: ['lvd-250_externa', 'lvd-250_conjuntos', 'lvd-250_esteira', 'lvd-250_redutor'],
    resumo: 'Lixadeira vertical compacta, menor investimento e operação simples.',
    aplicacao: ['Indicada para fabricantes de móveis e esquadrias, é um equipamento compacto que agrega toda a tecnologia das grandes lixadeiras de banda larga.', 'Equipamento utilizado para lixar, calibrar e dar melhor acabamento em peças planas de madeira, MDF, aglomerado, OSB entre outros materiais, com até 230 mm de largura.', 'Sendo um equipamento compacto, além de minimizar o investimento inicial, reduz também os custos de operação e possui regulagens simplificadas, proporcionando maior rapidez e agilidade no processo produtivo.'],
    carac: ['Inversor de frequência no tapete transportador', 'Esticamento pneumático das lixas', 'Largura útil de lixamento de 230 mm', 'Altura útil de lixamento de 165 mm'],
    dim: [800, 1350, 2250],
  },
  {
    slug: 'lb-185', nome: 'LB-185', linha: 'lixadeiras', recorte: 'lb-185_externa',
    fotos: ['lb-185_externa', 'lb-185_lixa', 'lb-185_exaustao'],
    resumo: 'Lixadeira de bordas oscilante, inclinável de 0 a 90°.',
    aplicacao: ['Ideal para efetuar lixamento em superfícies, bordas de portas e janelas, laterais e rebaixes de almofadas de portas, entre outros. Equipada com sistema oscilante que proporciona maior qualidade no acabamento.'],
    carac: ['Oscilação da lixa de 0 a 30°', 'Conjunto lixador inclinável de 0 a 90°'],
    dim: [1250, 700, 1030],
  },
  {
    slug: 'eppr-55', nome: 'EPPR-55', linha: 'extrusoras', recorte: 'eppr-55_externa',
    fotos: ['eppr-55_externa', 'eppr-55_painel', 'matriz'],
    resumo: 'Revestimento em polietileno de uma cor em perfis redondos.',
    aplicacao: ['A Extrusora de Polietileno é uma máquina projetada para efetuar com desempenho e qualidade o revestimento em polietileno com uma cor, em perfis redondos de vários diâmetros. Utilizada em larga escala na plastificação de cabos de vassoura, componentes de berços infantis, entre outros.'],
    carac: ['A superfície do revestimento pode ser lisa ou estriada', 'Capacidade de plastificação de 200 a 300 g/min', 'Produção variável de 16 a 24 m/min lineares (cabo de Ø 22 mm)', 'Zonas de aquecimento controladas por pirômetro', 'Inversor de frequência para ajuste de velocidade do cabo'],
    dim: [1820, 1230, 1650],
  },
  {
    slug: 'eppr-55-2', nome: 'EPPR-55/2', linha: 'extrusoras', recorte: 'eppr-55_2_externa',
    fotos: ['eppr-55_2_externa', 'eppr-55_2_painel', 'extrusao'],
    resumo: 'A mesma extrusora com aplicação em duas cores.',
    aplicacao: ['A Extrusora de Polietileno é uma máquina projetada para efetuar com desempenho e qualidade o revestimento em polietileno com uma ou duas cores, em perfis redondos de vários diâmetros. Utilizada em larga escala na plastificação de cabos de vassoura, componentes de berços infantis, entre outros.'],
    carac: ['Aplicação em duas cores', 'A superfície do revestimento pode ser lisa ou estriada', 'Capacidade de plastificação de 200 a 300 g/min', 'Produção variável de 16 a 24 m/min lineares (cabo de Ø 22 mm)', 'Zonas de aquecimento controladas por pirômetro', 'Inversor de frequência para ajuste de velocidade do cabo'],
    dim: [2150, 1460, 1670],
  },
  {
    slug: 'pm-101', nome: 'PM-101', linha: 'perfuradoras', recorte: 'pm-101_externa',
    fotos: ['pm-101_externa', 'pm-101_acionamento_emb', 'pm-101_mancal_ferramenta', 'pm-101_prensor_cremalheira'],
    resumo: 'Perfuradora de montantes com comandos manuais de fácil acesso.',
    aplicacao: ['A Perfuradora de Montantes é destinada a quem deseja produzir diversos estilos de portas e janelas, como por exemplo modelos em veneziana, japonesa e portuguesa.', 'Nesta máquina, os comandos são manuais, porém de fácil acesso, simplificando a operação da mesma.'],
    carac: ['Possibilita a realização de furos com 10 a 70 mm de comprimento', 'Permite realizar furação com inclinação de 10 a 45°', 'Dois níveis de produção, 24 ou 36 furos/min'],
    dim: ['800 (sem guia cremalheira) · 2750 (com guia)', 960, 950],
  },
  {
    slug: 'pmp-102', nome: 'PMP-102', linha: 'perfuradoras', recorte: 'pmp-102_externa',
    fotos: ['pmp-102_externa', 'pmp-102_cabecotes_furacao', 'pmp-102_inclinacao', 'pmp-102_pressionador', 'pmp-102_painel'],
    resumo: 'Perfuradora pneumática automatizada, de 30 a 60 furos por minuto.',
    aplicacao: ['A Perfuradora de Montantes Pneumática é destinada a quem deseja produzir diversos estilos de portas e janelas, como por exemplo modelos em veneziana, japonesa, portuguesa, chinesa etc.', 'Seus ajustes são simplificados, visando maior rapidez no trabalho e consequentemente maior produção. Os diversos mecanismos de funcionamento da máquina atuam com acionamento automático.'],
    carac: ['Equipamento moderno com funcionamento automatizado', 'Permite realizar furação com 8 a 70 mm de comprimento', 'Permite realizar furação com inclinação de 0 a 45°', 'Produção de 30 a 60 furos/min', 'Mini CLP (Controle Lógico Programável)'],
    dim: ['1400 (sem guia cremalheira) · 4280 (com guia)', 1000, 1110],
    destaque: ['Funcionamento automatizado', 'Furos de 8 a 70 mm', 'Inclinação de 0 a 45°', '30 a 60 furos/min', 'Mini CLP'],
  },
  {
    slug: 'tm-1100', nome: 'TM-1100', linha: 'tupia', recorte: 'tm-1100_externa2',
    fotos: ['tm-1100_externa1', 'tm-1100_externa2'],
    resumo: 'Tupia moldureira de quatro rotações, essencial na marcenaria.',
    aplicacao: ['Equipamento utilizado em várias funções, como por exemplo fresamento, acabamento, encaixes, dentre outros. Torna-se um produto essencial para toda fábrica de móveis e marcenarias.'],
    carac: ['Gama de rotações de 3600, 5100, 7000 e 9000 rpm', 'Saída de exaustão de 100 mm', 'Eixo de ferramentas com curso de 70 mm', 'Motor com potência de 5 cv'],
    dim: [1120, 750, 1050],
  },
  {
    slug: 'fmo', nome: 'FMO', linha: 'furadeiras', recorte: 'fmo_externa',
    fotos: ['fmo_externa', 'fmo_cabecotes', 'fmo_oscilacao', 'fmo_pressionador'],
    resumo: 'Furadeira múltipla pneumática com mesa oscilante.',
    aplicacao: ['Equipamento projetado para efetuar variados tipos de furação, como por exemplo: furação de componentes de escadas para beliche, cadeiras, barras de cama e montantes com palhetas ou espigas. Possibilita trabalhar com quantidades diferentes de cabeçotes, adequando-se melhor ao trabalho que for executar.', 'Máquina disponível nos modelos 1200, 1500 e 2200.'],
    carac: ['Funções automáticas com comandos pneumáticos', 'Mesa com sistema oscilante', 'Filtro de ar com ajuste de pressão', 'Cilindros com movimentos sincronizados, controlados por fim de curso e válvula gatilho', 'Altura dos furos de 0 a 50 mm', 'Profundidade dos furos de 1 a 60 mm', 'Comprimento dos furos até 70 mm'],
    modelos: [['FMO 1500', 1900, 950, 1300], ['FMO 2200', 2600, 1000, 1280]],
    notaModelos: 'O site atual cita também o modelo 1200, sem medidas.',
  },
];

for (const m of maquinas) {
  m.legendas = m.fotos.map(f => fotoNome[f.replace(/^(futura_iv_|v_|2_|lvb_3g_|lv3-250_|lvd-250_|lb-185_|eppr-55_2_|eppr-55_|pm-101_|pmp-102_|tm-1100_|fmo_|pratica-plus_|pratica_|scs-exacta_|scs_versatil_|scs-maxima_)/, '')] || 'Detalhe');
}

// Representantes, como na página do site atual. uf serve para o filtro.
export const representantes = [
  { nome: 'Fermaplan Comércio de Ferramentas Ltda', uf: 'RS', regiao: ['Planalto e região, RS'], fones: ['(55) 3794-1813', '(55) 99975-6388'], email: 'fermaplan@yahoo.com.br' },
  { nome: 'Ondumaq Com. e Representação Ltda', contato: 'Adelar', uf: 'RS', regiao: ['Bento Gonçalves e região, RS', 'Vale do Rio dos Sinos, RS', 'Litoral, RS'], fones: ['(54) 3453-1292'], whats: '(54) 99116-3569', email: 'adelarantonio@terra.com.br' },
  { nome: 'Emanuel Signori', uf: 'SC', regiao: ['Oeste, SC'], whats: '(49) 99914-6676' },
  { nome: 'Georg Representações', uf: 'SC', regiao: ['Litoral, SC'], whats: '(47) 98896-4443' },
  { nome: 'Niomar Biondo', uf: 'PR', regiao: ['Oeste e Sudoeste, PR'], whats: '(45) 99941-9347' },
  { nome: 'Araújo Representações de Móveis Ltda', contato: 'Edyson', uf: 'PR', regiao: ['Curitiba e Região Metropolitana, PR'], whats: '(41) 99903-4521' },
  { nome: 'JD Representações', uf: 'ES', regiao: ['Espírito Santo'], fones: ['(27) 3233-4320'], email: 'jd_representacoes@hotmail.com' },
  { nome: 'Fresmax do Brasil Ltda', uf: 'MG', regiao: ['Polo de Ubá, MG'], fones: ['(32) 99985-0907'], email: 'fresmaxdobrasil@yahoo.com.br' },
  { nome: 'Rubmaq', contato: 'Rubens Ponce', uf: 'NE', regiao: ['Região Nordeste'], whats: '(41) 99965-2827' },
  { nome: 'Valmir Gomes Teixeira', uf: 'NE', regiao: ['Região Nordeste'], fones: ['(83) 99995-5785'] },
];
export const ufs = [['RS', 'Rio Grande do Sul'], ['SC', 'Santa Catarina'], ['PR', 'Paraná'], ['ES', 'Espírito Santo'], ['MG', 'Minas Gerais'], ['NE', 'Nordeste']];
