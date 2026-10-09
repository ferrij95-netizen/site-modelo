// Textos da Instor. Fonte: site atual instor.com.br (lido em 2026-10-09). O que está marcado com
// "proposta" foi escrito para o novo site e precisa ser confirmado pela Instor.

export const site = {
  nome: 'Instor',
  razao: 'Instor Projetos e Robótica',
  slogan: 'Robótica a serviço da humanidade',
  dominio: 'https://instor.overtus.com.br',
  atual: 'https://instor.com.br/',
  email: 'contato@instor.com.br',
  vendas: { email: 'vendas@instor.com.br', tel: '(51) 9752-2728', zap: '555197522728' },
  compras: { email: 'compras@instor.com.br', tel: '(51) 99477-1412', zap: '5551994771412' },
  financeiro: { email: 'financeiro@instor.com.br', tel: '(51) 99872-1613', zap: '5551998721613' },
  gerencia: 'gerencia@instor.com.br',
  matriz: ['Matriz', 'Av. Sen. Salgado Filho, 7000, sala 276', 'Jardim Krahe, Viamão/RS', 'CEP 94440-000'],
  filial: ['Filial', 'Rua Vicente Apa', 'Engenho do Porto, Duque de Caxias/RJ', 'CEP 25011-040'],
  youtube: 'https://www.youtube.com/channel/UCFZr_Yze9RAmmrCTwOjAx1A',
  linkedin: 'https://www.linkedin.com/company/3132363/',
};

export const nav = [
  ['empresa', 'Empresa'],
  ['solucoes', 'Soluções'],
  ['robos', 'Robôs'],
  ['servicos', 'Serviços'],
  ['clientes', 'Clientes'],
  ['imprensa', 'Imprensa'],
  ['contato', 'Contato'],
];

export const missao = 'Reduzir a exposição humana a situações de alto risco e aumentar a eficiência dos processos com robótica móvel.';
export const visao = 'Ser referência em robótica móvel de alta qualidade.';
export const valores = [
  ['Paixão pelo que faz', 'Cada robô nasce de engenharia própria, do projeto mecânico ao software.'],
  ['Vontade de vencer desafios', 'Problemas que ninguém resolveu ainda são o ponto de partida dos nossos projetos.'],
  ['Inovação fora da caixa', 'Da inovação incremental à radical, sempre com o pé na operação do cliente.'],
];

// Números tirados da história no site atual.
export const numeros = [
  ['2008', 'fundada em Porto Alegre, a partir da UFRGS'],
  ['2012', 'fornecedora cadastrada da Petrobras'],
  ['10+', 'robôs próprios desenvolvidos'],
  ['6', 'setores atendidos'],
];

export const setores = [
  { id: 'oleo-e-gas', nome: 'Óleo e gás', resumo: 'Robôs autônomos para inspeção de áreas classificadas, com certificação Ex.', texto: 'Inspeção de rotina em áreas com risco de explosão, pintura em altura e inspeção de tanques. Os robôs Tupã Ex e Guaraci foram desenvolvidos em parceria com a Petrobras.', robos: ['tupa-ex', 'macuxi', 'guaraci'], foto: 'petrobras-tanques' },
  { id: 'mineracao', nome: 'Mineração', resumo: 'Robôs teleoperados para inspeção e transporte em áreas de risco.', texto: 'Inspeção térmica remota, transporte de carga em espaço confinado e em escadas, longe da exposição do operador. O Tupã foi desenvolvido em parceria com a Vale.', robos: ['tupa', 'anhanga', 'thor'], foto: 'tupa' },
  { id: 'logistica', nome: 'Logística', resumo: 'Robôs autônomos do tipo AMR para movimentação interna.', texto: 'O Jaguar AMR navega sozinho entre estações, com lidar, câmeras 3D e paradas de segurança conforme a NR12.', robos: ['jaguar'], foto: 'jaguar-galpao' },
  { id: 'agricultura', nome: 'Agricultura', resumo: 'Coleta autônoma de amostras de grãos.', texto: 'Braço autônomo para amostragem de grãos e dois projetos aprovados em 2025, Jasuka e Nhandecy, voltados a pequenas e médias propriedades rurais.', robos: ['coletor'], foto: 'coletor' },
  { id: 'nuclear', nome: 'Nuclear', resumo: 'Robôs teleoperados para inspeção de áreas perigosas.', texto: 'Inspeção remota em ambientes onde a presença humana precisa ser evitada, com robôs teleoperados, câmeras e sensores embarcados.', robos: ['tupa', 'anhanga'], foto: 'tupa-braco' },
  { id: 'saude', nome: 'Saúde', resumo: 'Robôs autônomos para desinfecção de ambientes.', texto: 'A Jaci combina luz UV-C e névoa ozonizada para desinfetar quartos, centros cirúrgicos e áreas de risco de infecção.', robos: ['jaci'], foto: 'jaci-quarto' },
];

// specs: [rótulo, valor]. Todos tirados das páginas de produto do site atual.
export const robos = [
  {
    id: 'tupa-ex', nome: 'Tupã Ex', tipo: 'Inspeção autônoma', setor: 'oleo-e-gas', foto: 'tupa-ex', fotos: ['tupa-ex-render'],
    selo: 'Primeiro do tipo na América Latina',
    resumo: 'Robô autônomo à prova de explosão para inspeção de rotina em áreas classificadas Zona 1.',
    texto: 'Desenvolvido com a Petrobras, o Tupã Ex percorre rotas programadas em plantas com risco de explosão e faz sozinho a ronda que hoje expõe o operador: mede gases, temperatura, ruído e corrosão, lê instrumentos e procura vazamentos.',
    destaques: ['Navegação autônoma com rotas programadas e detecção de obstrução em rotas de fuga', 'Detecção de CH4, LEL, H2S, CO e O2 com mapa de concentração', 'Termografia com histórico por ponto de inspeção', 'Câmera OGI para identificar chamas e vazamentos', 'Mapeamento 3D e mapa de corrosão em tempo real', 'Leitura de etiquetas e instrumentos analógicos e digitais'],
    specs: [['Certificação', 'Ex db ib pxb h IIB T3 Gb'], ['Área', 'Zona 1'], ['Autonomia', '6 horas'], ['Gases', 'CH4, LEL, H2S, CO, O2'], ['Conectividade', 'Wi-Fi, 4G LTE e 5G'], ['Parceria', 'Petrobras']],
  },
  {
    id: 'macuxi', nome: 'Macuxi', tipo: 'Pintura', setor: 'oleo-e-gas', foto: 'macuxi', fotos: [],
    resumo: 'Robô teleoperado para pintura em locais de difícil acesso.',
    texto: 'O Macuxi aplica qualquer tipo de tinta ou revestimento em superfícies de aço carbono, em altura, sem andaime e sem gente pendurada. Também é oferecido pela Instor como serviço de pintura robotizada.',
    destaques: ['Aplica qualquer tipo de tinta ou revestimento', 'Trabalha em altura sobre aço carbono', 'Controle remoto com tela LCD', 'Iluminação LED para trabalho noturno', 'Câmera HD para a operação remota'],
    specs: [['Aplicação', 'até 200 m²/h'], ['Diâmetro mínimo', '14 m'], ['Proteção', 'IP65'], ['Operação', 'Teleoperado'], ['Lançamento', '2018']],
  },
  {
    id: 'guaraci', nome: 'Guaraci', tipo: 'Inspeção de tanques', setor: 'oleo-e-gas', foto: 'guaraci', fotos: ['guaraci-tanque'],
    selo: 'Primeiro do tipo na América Latina',
    resumo: 'Robô hexápode que escala superfícies metálicas para inspecionar tanques.',
    texto: 'Com seis patas e aderência magnética, o Guaraci anda sobre superfícies complexas e sobe paredes de aço de tanques levando ultrassom para medir corrosão. Em desenvolvimento com a Petrobras.',
    destaques: ['Locomoção em superfícies complexas', 'Escalada magnética em superfícies ferromagnéticas', 'Ultrassom embarcado para inspeção de corrosão', 'Iluminação LED', 'Relatório de inspeção digital'],
    specs: [['Alcance sem fio', 'até 1 km'], ['Autonomia', 'cerca de 4 horas'], ['Proteção', 'IP66'], ['Operação', 'Teleoperado'], ['Parceria', 'Petrobras']],
  },
  {
    id: 'tupa', nome: 'Tupã', tipo: 'Inspeção térmica', setor: 'mineracao', foto: 'tupa', fotos: ['tupa-braco'],
    resumo: 'Robô teleoperado com braço articulado para inspeção térmica remota.',
    texto: 'Desenvolvido em parceria com a Vale, o Tupã leva câmera 4K e sensor térmico na ponta de um braço de cinco graus de liberdade até onde não é seguro mandar uma pessoa, e transmite tudo em tempo real.',
    destaques: ['Câmera PTZ 4K com sensor térmico no braço', 'Duas câmeras HD na base, frente e traseira', 'Braço articulado de 1.260 mm com 5 graus de liberdade', 'Tração 4x4 com suspensão independente', 'Umbilical opcional em carretel para resgate'],
    specs: [['Alcance', 'até 1 km em área aberta'], ['Velocidade', 'até 9 km/h'], ['Rampa', 'até 45°'], ['Autonomia', '2 a 10 horas'], ['Proteção', 'IP66'], ['Parceria', 'Vale']],
  },
  {
    id: 'anhanga', nome: 'Anhangá', tipo: 'Transporte', setor: 'mineracao', foto: 'anhanga', fotos: [],
    resumo: 'Robô teleoperado de esteiras para transporte de carga em espaços apertados e escadas.',
    texto: 'O Anhangá carrega até 200 kg por corredores estreitos, rampas e escadas, com freio eletromagnético que trava as esteiras em caso de falha, mesmo em inclinação.',
    destaques: ['Radar anticolisão com sensores sonar', 'Parada de emergência no controle e nas duas pontas do veículo', 'Freio eletromagnético em rampas de até 35°', 'Guarda-corpos removíveis e de altura ajustável', 'Olhais para içamento e pontos de amarração'],
    specs: [['Carga', '200 kg'], ['Peso', '300 kg'], ['Autonomia', '6 horas'], ['Velocidade', '2 km/h'], ['Degrau', 'até 200 mm'], ['Dimensões', '1200 × 600 × 410 mm'], ['Proteção', 'IP65']],
  },
  {
    id: 'thor', nome: 'Thor', tipo: 'Veículo elétrico', setor: 'mineracao', foto: 'thor', fotos: [],
    resumo: 'Veículo elétrico 4x4 para transporte de carga em espaço restrito.',
    texto: 'Utilitário 100% elétrico com esterçamento nas quatro rodas: anda de lado, gira no próprio eixo e entra onde um veículo comum não manobra. Pode levar mini guindaste e ser operado à distância.',
    destaques: ['Tração e esterçamento nas quatro rodas', 'Desloca-se de lado ou gira no próprio eixo', 'Mini guindaste opcional com patolas eletro-hidráulicas', 'Controle remoto completo por joystick', 'Cabine adequada a pessoas com mobilidade reduzida'],
    specs: [['Motorização', '100% elétrica'], ['Autonomia', 'até 8 horas'], ['Guindaste', 'até 800 kg, giro de 180°'], ['Tração', '4x4'], ['Suspensão', 'Independente']],
  },
  {
    id: 'jaguar', nome: 'Jaguar AMR', tipo: 'Transporte autônomo', setor: 'logistica', foto: 'jaguar-galpao', fotos: ['jaguar', 'jaguar-estoque'],
    resumo: 'Robô móvel autônomo para logística interna.',
    texto: 'O Jaguar leva carga entre estações sem trilho e sem operador. Calcula a rota e desvia de obstáculos em tempo real com lidar, câmeras 3D e odometria. Lançado em 2021, com apoio da Finep.',
    destaques: ['Navegação com lidar, câmeras 3D e odometria', 'Para-choques, sensores anticolisão e ultrassônicos', 'Comunicação por Wi-Fi, Bluetooth, RFID, QR code e beacons', 'Estação de recarga com ou sem contato'],
    specs: [['Faixa de carga', '60 a 1.500 kg'], ['Autonomia', 'até 8 horas'], ['Velocidade', 'até 3 m/s'], ['Segurança', 'NR12'], ['Apoio', 'Finep']],
  },
  {
    id: 'coletor', nome: 'Coletor de Amostras', tipo: 'Amostragem autônoma', setor: 'agricultura', foto: 'coletor', fotos: [],
    resumo: 'Braço autônomo para amostragem de grãos.',
    texto: 'Coleta amostras de grãos de forma rápida, precisa e segura, sem intervenção do operador em nenhuma etapa. Desenvolvido em parceria com a Saur.',
    destaques: ['Amostragem totalmente automática', 'Rapidez e precisão na coleta', 'Operador fora da área de risco', 'Confiabilidade de operação contínua'],
    specs: [['Operação', 'Autônoma'], ['Aplicação', 'Amostragem de grãos'], ['Parceria', 'Saur']],
  },
  {
    id: 'jaci', nome: 'Jaci', tipo: 'Desinfecção', setor: 'saude', foto: 'jaci-quarto', fotos: ['jaci', 'jaci-centro'],
    selo: 'Primeiro robô autônomo brasileiro de desinfecção',
    resumo: 'Robô autônomo que combina luz UV-C e névoa ozonizada para desinfetar ambientes.',
    texto: 'A Jaci percorre o ambiente iluminando as superfícies com UV-C e lança névoa ozonizada nas áreas de sombra. Elimina 99% de vírus e bactérias do ambiente, com menos tempo, menos produto químico e histórico de desinfecção por sala. Testada em cinco hospitais, entre eles o Incor.',
    destaques: ['Emissores UV-C de alta potência', 'Gerador de névoa ozonizada para ar e superfícies', 'Torre telescópica de 1,8 m que alcança o teto', 'Detecção de pessoas por inteligência artificial', 'Acionamento remoto por aplicativo e relatórios por sala'],
    specs: [['Eficácia', '99% de vírus e bactérias'], ['Capacidade', '300 m² por hora'], ['Raio de ação', 'mais de 5 m'], ['Torre', '1,8 m telescópica'], ['Fabricação', '100% nacional'], ['Apoio', 'Finep e Fapergs']],
  },
];

export const servicos = [
  { id: 'caldeiras', nome: 'Inspeção robotizada de caldeiras', foto: 'caldeiras', texto: 'Inspeção de caldeiras com robô e registro digital de cada ponto medido, sem montar andaime e com a equipe fora do espaço confinado.', itens: ['Medição de espessura e mapeamento de corrosão', 'Imagens e dados georreferenciados por ponto', 'Relatório digital ao final da parada'], proposta: true },
  { id: 'tanques', nome: 'Inspeção de tanques', foto: 'angoera', texto: 'Inspeção de fundo e costado de tanques com o scanner Angoerá e o hexápode Guaraci, inclusive em versão Ex para áreas classificadas.', itens: ['Scanner Angoerá e Angoerá Ex', 'Sonda Ex para áreas classificadas', 'Ultrassom embarcado para corrosão'], proposta: true },
  { id: 'pintura', nome: 'Pintura robotizada', foto: 'macuxi', texto: 'O robô Macuxi aplica tinta e revestimento em superfícies de aço carbono em altura, operado à distância pela equipe da Instor.', itens: ['Até 200 m² por hora', 'Qualquer tinta ou revestimento', 'Trabalho noturno com iluminação LED'] },
  { id: 'projetos', nome: 'Projetos especiais', foto: 'chassi', texto: 'Quando o robô que resolve o problema ainda não existe, a Instor projeta. Mecânica, eletrônica e software feitos em casa, do estudo de viabilidade ao protótipo em campo.', itens: ['Estudo de viabilidade técnica e econômica', 'Projeto mecânico, eletrônico e de software', 'Protótipo, testes em campo e certificação'] },
];

export const historia = [
  ['2004', 'Os fundadores, ainda estudantes, começam no Laboratório de Metalurgia Física (LAMEF) da Escola de Engenharia da UFRGS.'],
  ['2008', 'Aprovada na incubadora CEI/UFRGS, a Instor é fundada em julho após estudo de viabilidade técnica e econômica.'],
  ['2009', 'Entra no programa do Sebrae-RS para a cadeia de óleo, gás e energia do Rio Grande do Sul.'],
  ['2010', 'Conquista recursos de inovação em editais da Finep (Prime e Pré-Sal), Sebrae-RS, Senai e Fapergs.'],
  ['2012', 'Gradua-se na incubadora, muda para sede própria e torna-se fornecedora cadastrada da Petrobras.'],
  ['2018', 'Lança o Macuxi, robô de pintura industrial.'],
  ['2019', 'Desenvolve o Tupã, robô de inspeção térmica, em parceria com a Vale.'],
  ['2020', 'Entra na robótica Ex com o TUPAEX e lança a Jaci, robô autônomo germicida.'],
  ['2021', 'Lança o Jaguar AMR para o setor de logística.'],
  ['2022', 'Lança o Tupã Ex, robô de esteiras certificado Ex para áreas classificadas, com a Petrobras.'],
  ['2023', 'Desenvolve o Guaraci, hexápode para inspeção de tanques, com a Petrobras.'],
  ['2024', 'Associa-se à SPRINT Robotics e aprova o projeto Hexápode no programa Inovações Radicais para o Setor Elétrico, da Finep.'],
  ['2025', 'Torna-se associada da Abendi e aprova os projetos agrícolas Jasuka e Nhandecy.'],
  ['2026', 'Desenvolve o scanner Angoerá, o Angoerá Ex e a Sonda Ex para prestação de serviços.'],
];

export const lideranca = [
  ['Miguel Ignacio Serrano', 'CEO', 'miguel'],
  ['Marta Von Dentz', 'Diretora administrativa e cofundadora', 'marta'],
  ['Diógenes Casagrande', 'Diretor de tecnologia', 'diogenes'],
  ['Luciano Eifler', 'Diretor de inovação e investidor', 'luciano'],
];

export const politicas = [
  ['Qualidade', 'Os parâmetros de qualidade são os requisitos e especificações técnicas de cada cliente. Pesquisas de satisfação orientam a melhoria contínua.'],
  ['Meio ambiente', 'Soluções que não agridem o meio ambiente, prevenção da poluição nos processos e atendimento à legislação ambiental e de segurança do trabalho.'],
  ['Saúde e segurança', 'Usar a robótica para melhorar a segurança e a saúde das pessoas, eliminando riscos de forma preventiva.'],
];

export const equipe = 'Engenheiros mecânicos, eletrônicos, de controle e automação e de produção, técnicos em eletrônica e mecatrônica e equipe administrativa. A equipe multidisciplinar desenvolve o robô inteiro dentro de casa.';

export const clientes = ['Petrobras', 'Vale', 'GE', 'Braskem', 'Technip', 'MKS', 'Capaz', 'Araujo', 'Geremia', 'Triel', 'PUCRS', 'Unicamp', 'UFRJ', 'UFRGS'];
export const parceiros = ['Finep', 'Fapergs', 'Sebrae', 'UFRGS', 'PUCRS', 'Unicamp', 'Unisinos', 'USP', 'Hospital Sírio-Libanês', 'InovaIncor', 'Premiere Hospital', 'Ericsson', 'Conceptmed', 'Cyberia'];
export const comerciais = { internacionais: ['AFI Robotics', 'Technip Energies', 'SNEF', 'Al Maseela'], nacionais: ['Suppress', 'PRK'] };
export const associacoes = ['Fornecedora cadastrada Petrobras desde 2012', 'SPRINT Robotics desde 2024', 'Abendi desde 2025'];

// [título, veículo, ano, link]
export const imprensa = [
  ['Robótica na agricultura: autonomia pode mudar a forma de produção no campo', 'Embrapa Semear Digital', '2026', 'https://www.semear-digital.cnptia.embrapa.br/noticia/06/2026/robotica-na-agricultura-autonomia-pode-mudar-a-forma-de-producao-no-campo/'],
  ['Embrapa desenvolve robô para a fruticultura', 'Grupo Ahora', '2026', 'https://grupoahora.net.br/conteudos/2026/03/17/embrapa-desenvolve-robo-para-a-fruticultura/'],
  ['Inspeção robotizada de caldeiras', 'Abendi Digital', '', 'https://www1.abendi.org.br/blog-abendi-digital-inspecao-robotizada-de-caldeiras/'],
  ['Jaguar AMR na edição 144 da EAE Máquinas', 'Revista EAE Máquinas', '', 'https://eaemaq.com.br/revistas/edicao-144-eaemaquinas-online/'],
  ['Robô desenvolvido pela Instor será levado para a França', 'Tecnopuc', '', 'https://tecnopuc.pucrs.br/robo-desenvolvido-pela-instor-sera-levado-para-franca/'],
  ['Desenvolvemos robô inédito na indústria de óleo e gás da América Latina', 'Petrobras', '', 'https://petrobras.com.br/fatos-e-dados/desenvolvemos-robo-inedito-na-industria-de-oleo-e-gas-da-america-latina.htm'],
  ['Robô inédito para indústria de óleo e gás da América Latina', 'TN Petróleo', '', 'https://tnpetroleo.com.br/noticia/robo-inedito-para-industria-de-oleo-e-gas-da-america-latina-e-desenvolvido-pela-petrobras/'],
  ['Trabalho pioneiro na UFRGS prevê descontaminação de hospitais com robôs', 'GZH', '2022', 'https://gauchazh.clicrbs.com.br/colunistas/marta-sfredo/noticia/2022/04/trabalho-pioneiro-na-ufrgs-preve-descontaminacao-de-hospitais-com-robos-cl1qr9a7p007f017cj0trioy5.html'],
  ['Petrobras divulga startups selecionadas para edital de inovação de R$ 22 milhões', 'TI Inside', '2021', 'https://tiinside.com.br/03/12/2021/petrobras-divulga-startups-selecionadas-para-edital-de-inovacao-de-r-22-milhoes/'],
  ['Edital da Petrobras seleciona cinco startups gaúchas', 'Guaíba', '2021', 'https://guaiba.com.br/2021/09/08/edital-da-petrobras-seleciona-cinco-startups-gaucha/'],
  ['Com Jaci, primeiro robô autônomo brasileiro para desinfecção, Instor projeta internacionalização', 'Instituto Caldeira', '', 'https://institutocaldeira.org.br/blog/com-jaci-primeiro-robo-autonomo-brasileiro-para-desinfeccao-instor-projeta-internacionalizacao/'],
  ['Instor lança nova versão autônoma do robô Jaci', 'Tecnopuc', '', 'https://tecnopuc.pucrs.br/instor-lanca-nova-versao-autonoma-do-robo-jaci/'],
  ['Apoio da Finep viabiliza o primeiro robô autônomo para desinfecção de ambientes da América Latina', 'Finep', '', 'http://www.finep.gov.br/noticias/todas-noticias/6455-apoio-da-finep-viabiliza-construcao-de-o-primeiro-robo-autonomo-para-desinfeccao-de-ambientes-da-america-latina'],
  ['Primeira empresa contratada do edital Tecnologias 4.0 desenvolve projeto de robótica para a indústria', 'Finep', '', 'http://www.finep.gov.br/noticias/todas-noticias/6273-primeira-empresa-contratada-do-edital-tecnologias-4-0-desenvolve-projeto-de-robotica-inovador-para-industria'],
  ['Startup Instor tem projetos em parceria com o INF', 'Instituto de Informática UFRGS', '', 'https://www.inf.ufrgs.br/site/noticia/startup-instor-tem-projetos-em-parceria-com-o-inf/'],
  ['Jaci, o robô de desinfecção que auxilia no combate à covid-19', 'Tecnopuc', '2020', 'http://www.pucrs.br/tecnopuc/2020/04/29/conheca-jaci-o-robo-de-desinfeccao-que-auxilia-no-combate-covid-19/'],
  ['Na contramão da crise, empresa porto-alegrense de robótica aposta na inovação', 'Jornal do Comércio', '2020', 'https://www.jornaldocomercio.com/_conteudo/colunas/mercado_digital/2020/05/737653-jaci-robo-de-desinfeccao-auxilia-no-combate-a-pandemia.html'],
  ['Empresa de Porto Alegre cria robôs para automatizar tarefas na indústria', 'Jornal do Comércio', '2018', 'https://www.jornaldocomercio.com/_conteudo/ge/noticias/2018/05/630471-dupla-cria-robos-para-automatizarem-tarefas.html'],
  ['Limpeza contínua em tubulações', 'Jornal do Comércio', '2016', 'http://jcrs.uol.com.br/_conteudo/2016/09/especiais/tecnovars/522040-limpeza-continua-em-tubulacoes.html'],
  ['Pré-sal', 'Revista Veja', '2012', 'https://www.instor.com.br/assets/pdfs/7revistaVejaPreSal24102012.pdf'],
];

export const paginas = {
  index: ['Instor · Robótica móvel para inspeção e operação em áreas de risco', 'Robôs autônomos e teleoperados para óleo e gás, mineração, logística, agricultura, nuclear e saúde. Engenharia própria desde 2008.'],
  empresa: ['Empresa · Instor', 'Da UFRGS à robótica Ex: a história, a equipe e as políticas da Instor Projetos e Robótica.'],
  solucoes: ['Soluções por setor · Instor', 'Robôs e serviços da Instor para óleo e gás, mineração, logística, agricultura, nuclear e saúde.'],
  robos: ['Robôs · Instor', 'Conheça os robôs da Instor: Tupã Ex, Macuxi, Guaraci, Tupã, Anhangá, Thor, Jaguar AMR, Coletor de Amostras e Jaci.'],
  servicos: ['Serviços · Instor', 'Inspeção robotizada de caldeiras e tanques, pintura robotizada e projetos especiais de robótica.'],
  clientes: ['Clientes e parceiros · Instor', 'Empresas, universidades e instituições que trabalham com a Instor.'],
  imprensa: ['Imprensa · Instor', 'A Instor na imprensa: Petrobras, Finep, Embrapa, Tecnopuc, GZH e outros.'],
  contato: ['Contato · Instor', 'Fale com a Instor: vendas, compras e financeiro. Matriz em Viamão/RS e filial em Duque de Caxias/RJ.'],
};
for (const r of robos) paginas['robos/' + r.id] = [`${r.nome} · ${r.tipo} · Instor`, r.resumo];

export const setor = id => setores.find(s => s.id === id);
export const robo = id => robos.find(r => r.id === id);
