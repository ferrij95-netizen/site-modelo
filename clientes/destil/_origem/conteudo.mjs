// Textos e dados da Destil. O que está entre aspas no LEIA-ME veio do site atual (destil.ind.br, textos dentro das imagens dos slides);
// o resto (legendas das peças, etapas do processo, setores) foi escrito por nós a partir das fotos do próprio site.
export const empresa = {
  nome: 'Destil',
  nomeLongo: 'Destil Balanceamentos Industriais',
  url: 'https://destil.overtus.com.br/',
  antigo: 'http://www.destil.ind.br/',
  fones: [
    { fone: '(19) 3422-0310', href: '+551934220310' },
    { fone: '(19) 3422-0441', href: '+551934220441' },
  ],
  email: 'destil@destil.ind.br',
  endereco: ['Rua Tupis, 180, Paulicéia (Jd. Pacaembu)', 'Piracicaba, SP · CEP 13424-302'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Tupis+180+Piracicaba+SP+13424-302',
  mapaEmbed: 'https://www.google.com/maps?q=Rua+Tupis,+180,+Piracicaba,+SP,+13424-302&output=embed',
};

export const textos = {
  oferece: 'A Destil oferece serviços de alta qualidade e precisão em balanceamentos e metalizações.',
  slogan: 'Excelência em balanceamentos industriais de alta precisão e metalizações.',
  quemSomos: [
    'A Destil iniciou suas atividades com o objetivo de oferecer serviços de alta qualidade e precisão em balanceamentos e metalizações.',
    'Instalações certificadas, pontes rolantes e instalações elétricas seguindo normas técnicas e ARTs.',
  ],
  balanceamento: 'Processo totalmente computadorizado e acompanhado de certificado de conformidade, atendendo às normas exigidas por cada empresa, o que garante maior precisão e qualidade.',
  metalizacao: 'Além de recuperar e normalizar, este processo também evita que as peças de equipamentos tenham desgastes prematuros, com diminuição de paradas ocasionadas por manutenções corretivas.',
  mesmoDia: 'Exclusivo atendimento agendado, com serviço e entrega no mesmo dia.',
  mesmoDiaNota: 'Consulte a disponibilidade de agenda antecipadamente.',
  fresamento: 'Processo diferenciado conforme a necessidade técnica da peça, com remoção de peso na fresadora.',
};

// Peças que aparecem nas fotos do site atual (legendas nossas).
export const pecas = [
  { img: 'rotor-laranja', nome: 'Rotores helicoidais', txt: 'Rotor montado na balanceadora, com os sensores de leitura nos mancais.' },
  { img: 'rosca', nome: 'Roscas transportadoras', txt: 'Helicoides longos, balanceados de ponta a ponta.' },
  { img: 'rolos', nome: 'Cilindros e rolos', txt: 'Rolos de grande comprimento, como os de máquinas de papel.' },
  { img: 'picador', nome: 'Rotores de facas', txt: 'Conjuntos com dezenas de facas, conferidos peça a peça.' },
  { img: 'engrenagem', nome: 'Engrenagens e volantes', txt: 'Peças de grande diâmetro na balanceadora.' },
  { img: 'eixo-turbina', nome: 'Eixos com rotor', txt: 'Movimentados com ponte rolante até a máquina.' },
  { img: 'rotores-1', nome: 'Rotores de bomba', txt: 'Lotes de rotores usinados e balanceados.' },
  { img: 'rotores-estrela', nome: 'Rotores de ventilador', txt: 'Pás e cubos de ventiladores e exaustores.' },
];

// Setores da colagem da home atual (seis fotos sobre a faixa laranja).
export const setores = [
  { img: 'setor-energia', nome: 'Energia e usinas' },
  { img: 'setor-papel', nome: 'Papel e celulose' },
  { img: 'setor-petroquimica', nome: 'Petroquímica' },
  { img: 'setor-alimentos', nome: 'Alimentos e bebidas' },
  { img: 'setor-sucro', nome: 'Sucroenergético' },
  { img: 'setor-rotor', nome: 'Indústria em geral' },
];

// Etapas do balanceamento (escritas por nós a partir das fotos e dos textos do site).
export const etapas = [
  { img: 'galpao-ponte', tit: 'Recebimento', txt: 'A peça chega com agendamento e é movimentada pelas pontes rolantes até a área de trabalho.' },
  { img: 'maquina', tit: 'Montagem na balanceadora', txt: 'O conjunto é apoiado nos mancais da máquina e posto em rotação.' },
  { img: 'software', tit: 'Leitura computadorizada', txt: 'O sistema mede o desbalanceamento e indica o ponto e o peso a corrigir.' },
  { img: 'polia-1', tit: 'Correção', txt: 'Remoção de peso na fresadora, conforme a necessidade técnica da peça.' },
  { img: 'rotores-1', tit: 'Certificado e entrega', txt: 'Nova leitura, certificado de conformidade e entrega, no mesmo dia quando agendado.' },
];
