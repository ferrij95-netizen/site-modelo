// Dados da Maddá Kids House. Origem de cada item no LEIA-ME.md desta pasta.
export const empresa = {
  nome: 'Maddá Kids House',
  url: 'https://maddaescola.overtus.com.br/',
  antigo: 'http://www.maddaescola.com.br/',
  slogan: 'A segunda casa da sua criança.',
  lema: 'Amor ao ensinar, cuidar e estimular.',
  telefone: '(31) 2531-0177',
  telHref: 'tel:+553125310177',
  email: 'maddaescola@maddaescola.com.br',
  horario: 'Seg a sex: 7h às 19h',
  rua: 'Rua Ouro Preto, 1047',
  bairro: 'Santo Agostinho',
  cidade: 'Belo Horizonte - MG',
  cep: '30170-041',
  mapa: 'https://www.openstreetmap.org/export/embed.html?bbox=-43.9584%2C-19.9331%2C-43.9464%2C-19.9251&layer=mapnik&marker=-19.9291%2C-43.9524',
  mapaLink: 'https://www.openstreetmap.org/?mlat=-19.9291&mlon=-43.9524#map=17/-19.9291/-43.9524',
};

// Dimensões reais das fotos (public/assets/img/*.webp).
export const fotos = {
  musica: [780, 780, 'Educador tocando teclado com as crianças sentadas no tapete'],
  'bercario-tatame': [1280, 720, 'Berçário com tatame colorido, blocos de espuma e casinha'],
  'bercario-casinha': [1280, 720, 'Canto do berçário com casinha, estantes de brinquedos e cadeirões'],
  'bercario-sala': [1280, 720, 'Sala do berçário com cadeirões, estante triangular e área de tatame'],
  parquinho: [1280, 720, 'Parquinho com grama, escorregador e casinha'],
  'miniquadra-mascaras': [750, 750, 'Turma com máscaras feitas em sala, na miniquadra'],
  'bebe-brincando': [750, 750, 'Bebê brincando de acertar a bola na boca do palhaço'],
  'sala-espaco': [1280, 720, 'Sala de aula com mural do espaço e a ovelhinha da Maddá astronauta'],
  'sala-casinhas': [1280, 720, 'Sala de aula com mural de casinhas coloridas e alfabeto'],
  'sala-ovelha': [1280, 720, 'Sala de aula com mural de jardim e a ovelhinha da Maddá'],
};

export const boasVindas = 'Seja bem-vindo ao site da Maddá Escola. É uma alegria compartilhar um pouco da nossa história e da nossa prática.';

export const pilares = [
  { verbo: 'Ensinar', cor: 'laranja', foto: 'musica', texto: 'Proposta socioconstrutivista: a criança aprende brincando, convivendo com os colegas e explorando o ambiente, com material didático próprio para cada fase.' },
  { verbo: 'Cuidar', cor: 'verde', foto: 'bercario-sala', texto: 'Espaços pensados para o tamanho da criança, alimentação preparada conforme a orientação do pediatra de cada uma.' },
  { verbo: 'Estimular', cor: 'lilas', foto: 'bebe-brincando', texto: 'Cores, sons, texturas, espelhos e barras para os primeiros passos. Cada canto convida a criança a descobrir alguma coisa nova.' },
];

export const espacos = [
  { id: 'bercario', nome: 'Berçário', foto: 'bercario-tatame', texto: 'Projetado para a interação dos bebês com diversos estímulos: cores, sons, espelhos, texturas e barras para a marcha. Piso emborrachado, miniteatro, cineminha, livros e brinquedos para cada faixa etária.' },
  { id: 'parquinho', nome: 'Parquinho', foto: 'parquinho', texto: 'Área gramada ao ar livre para o banho de sol, as brincadeiras e o desenvolvimento das habilidades motoras.' },
  { id: 'miniquadra', nome: 'Miniquadra', foto: 'miniquadra-mascaras', texto: 'Espaço aberto com minicampo de futebol e basquete, amarelinha e lugar de sobra para as brincadeiras de roda.' },
  { id: 'salas', nome: 'Salas de aula', foto: 'sala-casinhas', texto: 'Organizadas para construir a autonomia e a identidade de cada criança e despertar a curiosidade.' },
  { id: 'banheiros', nome: 'Banheiros', foto: null, icone: 'gota', texto: 'Planejados para as crianças: banheiras e trocadores no mesmo espaço, pias e vasos na altura delas para incentivar a independência.' },
  { id: 'cozinha', nome: 'Cozinha', foto: null, icone: 'colher', texto: 'Cozinha separada que prepara o que a família envia (sucos, papinhas, mamadeiras, refeições e lanches) seguindo a orientação do pediatra de cada criança. A higienização das mamadeiras também é feita aqui.' },
];

export const servicos = [
  { nome: 'Berçário', cor: 'lilas', foto: 'bercario-casinha', texto: 'Para os bebês, num espaço feito de estímulos para cada fase do desenvolvimento.' },
  { nome: 'Educação Infantil', cor: 'verde', foto: 'sala-espaco', texto: 'Turmas da educação infantil com proposta socioconstrutivista e sistema de ensino com material didático.' },
];

export const servicosExtras = [
  { titulo: 'Das 7h às 19h', texto: 'A escola funciona de segunda a sexta, das 7h às 19h.', icone: 'relogio' },
  { titulo: 'Alimentação', texto: 'A cozinha prepara o que a família envia, conforme a orientação do pediatra.', icone: 'colher' },
  { titulo: 'Material didático', texto: 'Sistema de ensino com livros para cada fase da educação infantil.', icone: 'livro' },
  { titulo: 'Bebê Online', texto: 'Acesso para os pais acompanharem o dia do filho à distância.', icone: 'tela' },
];
