// Conteúdo da Agromil Sementes. Dados de contato e vendedores vêm do site atual (agromilsementes.com.br);
// razão social, CNPJ, data de abertura e atividade vêm do cadastro do CNPJ 79.878.971/0001-99.
// Espécies das linhas são exemplos do ramo (hortaliças, flores e gramas): confirmar com a Agromil.

export const empresa = {
  nome: 'Agromil Sementes',
  razao: 'Agromil Sementes Olerícolas Ltda.',
  cnpj: '79.878.971/0001-99',
  desde: 1987,
  url: 'https://agromil.overtus.com.br/',
  antigo: 'http://www.agromilsementes.com.br/',
  email: 'agromil@agromilsementes.com.br',
  fone: '(49) 3322-3941',
  foneHref: '+554933223941',
  celular: '(49) 98803-1643',
  celularHref: '+5549988031643',
  whats: '5549988031643',
  endereco: 'Rua Mato Grosso, 1017-D, São Cristóvão',
  cidade: 'Chapecó, SC',
  cep: '89803-048',
  mapa: 'Rua Mato Grosso, 1017, São Cristóvão, Chapecó - SC, 89803-048',
};

export const vendedores = [
  { nome: 'Edinei', fone: '(49) 99970-0444', whats: '5549999700444' },
  { nome: 'Clademir', fone: '(49) 99987-3029', whats: '5549999873029' },
  { nome: 'Rudiney', fone: '(49) 99967-1171', whats: '5549999671171' },
];

// Linhas de sementes. "img" é a foto em public/assets/img (todas ilustrativas).
export const linhas = [
  {
    id: 'folhosas', nome: 'Folhosas', img: 'folhosas',
    texto: 'Sementes para as hortaliças de folha que giram rápido na horta e na gôndola.',
    especies: ['Alface crespa', 'Alface americana', 'Alface lisa', 'Rúcula', 'Couve', 'Repolho', 'Espinafre', 'Acelga', 'Agrião'],
  },
  {
    id: 'frutos', nome: 'Hortaliças de fruto', img: 'frutos',
    texto: 'Tomate, pimentão, pepino e abóboras para estufa e campo aberto.',
    especies: ['Tomate', 'Pimentão', 'Pimenta', 'Pepino', 'Abobrinha', 'Abóbora', 'Moranga', 'Melancia', 'Melão', 'Berinjela', 'Quiabo', 'Vagem'],
  },
  {
    id: 'raizes', nome: 'Raízes e bulbos', img: 'raizes',
    texto: 'Cenoura, beterraba, cebola e rabanete para plantio escalonado o ano todo.',
    especies: ['Cenoura', 'Beterraba', 'Rabanete', 'Cebola', 'Nabo'],
  },
  {
    id: 'temperos', nome: 'Temperos e ervas', img: 'temperos',
    texto: 'Os temperos verdes que não podem faltar em nenhuma horta.',
    especies: ['Salsa', 'Cebolinha', 'Coentro', 'Manjericão', 'Orégano', 'Endro'],
  },
  {
    id: 'flores', nome: 'Flores', img: 'flores',
    texto: 'Sementes de flores para canteiros, jardins, floriculturas e produção de mudas.',
    especies: ['Girassol', 'Zínia', 'Tagetes (cravo-de-defunto)', 'Cosmos', 'Amor-perfeito', 'Petúnia', 'Sálvia'],
  },
  {
    id: 'gramas', nome: 'Gramas', img: 'gramas',
    texto: 'Sementes de grama para jardins, áreas verdes e recuperação de solo.',
    especies: ['Grama batatais', 'Grama bermuda', 'Azevém', 'Mix para sombra'],
  },
];

// Ciclo da semente à colheita (texto nosso, explica o caminho do produto).
export const ciclo = [
  { n: '01', nome: 'Semente', texto: 'A escolha da variedade certa para a época e a região começa na conversa com o vendedor.' },
  { n: '02', nome: 'Semeadura', texto: 'Em bandeja ou direto no canteiro, com a semente bem armazenada e dentro da validade.' },
  { n: '03', nome: 'Muda', texto: 'Germinação uniforme e mudas fortes para o transplante.' },
  { n: '04', nome: 'Lavoura', texto: 'Canteiro, estufa ou campo aberto, conforme a cultura.' },
  { n: '05', nome: 'Colheita', texto: 'Hortaliça e flor de qualidade chegando à mesa e ao mercado.' },
];

// Quem compra da Agromil (atacado de sementes): confirmar com a empresa.
export const clientes = [
  { nome: 'Revendas e agropecuárias', texto: 'Sementes para prateleira, com reposição pelo vendedor da região.' },
  { nome: 'Produtores de hortaliças', texto: 'Variedades para estufa e campo aberto, em embalagens de produção.' },
  { nome: 'Viveiros e produtores de mudas', texto: 'Sementes para bandeja, com germinação uniforme.' },
  { nome: 'Floriculturas e paisagismo', texto: 'Flores e gramas para jardins, praças e áreas verdes.' },
];

export const comoComprar = [
  { nome: 'Escolha a linha', texto: 'Veja as linhas de sementes e monte sua lista no site, ou ligue direto.' },
  { nome: 'Fale com um vendedor', texto: 'Edinei, Clademir ou Rudiney confirmam variedades, embalagens e preço.' },
  { nome: 'Receba o pedido', texto: 'Retirada em Chapecó ou envio combinado com o vendedor.' },
];
