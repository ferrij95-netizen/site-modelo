// Dados da AgroBrasil Frigorífico. Só entra aqui o que foi confirmado em fonte pública (ver LEIA-ME.md):
// site atual (logo), Google Maps, Facebook, CNPJ 44.865.458/0001-89 (Receita), lista SIE da SEAPI/RS e Programa Agregar RS Carnes.
// Os textos corridos são nossos, escritos a partir desses dados.
import fs from 'node:fs';
import path from 'node:path';

export const empresa = {
  nome: 'AgroBrasil Frigorífico',
  razao: 'AgroBrasil Frigorífico Ltda.',
  cnpj: '44.865.458/0001-89',
  abertura: '2022',
  url: 'https://agrobrasil.overtus.com.br/',
  antigo: 'https://agrobrasilfrigorifico.com/',
  fone: '(51) 99563-8156',
  foneHref: '+5551995638156',
  wa: 'https://wa.me/5551995638156',
  email: 'financeiro@agrobrasilfrigorifico.com',
  endereco: 'Rodovia BR-386, km 415,5',
  bairro: 'Vendinha, Montenegro – RS',
  cep: '92532-000',
  enderecoCnpj: 'BR-386, corredor de acesso, km 415,5, Fazenda Quadros, Triunfo – RS, CEP 95840-000',
  mapa: 'https://www.google.com/maps/place/AgroBrasil+Frigor%C3%ADfico/@-29.8205832,-51.4656501,15z',
  mapaEmbed: 'https://www.openstreetmap.org/export/embed.html?bbox=-51.4856%2C-29.8325%2C-51.4456%2C-29.8085&layer=mapnik&marker=-29.8205832%2C-51.4656501',
  horario: 'Atendimento a partir das 7h30',
  instagram: 'https://www.instagram.com/frigorificoagrobrasil/',
  facebook: 'https://www.facebook.com/agrobrasilfrigorifico/',
  sie: '419',
  agregar: '516/2026',
};

export const textos = {
  bio: 'Frigorífico especializado em carnes bovinas de alto padrão.',
  chamada: 'Abate e processamento de bovinos em Montenegro, na BR-386, com inspeção estadual permanente e equivalência ao SISBI-POA.',
  sobre: [
    'A AgroBrasil Frigorífico começou a operar em 2022 às margens da BR-386, no km 415,5, entre Montenegro e Triunfo, a uma hora de Porto Alegre. A especialidade é a carne bovina de alto padrão: animais de pecuaristas gaúchos, abatidos e resfriados com controle do recebimento à expedição.',
    'É uma empresa conduzida por mulheres empreendedoras e tem registro no Serviço de Inspeção Estadual do Rio Grande do Sul (SIE nº 419), com inspeção permanente e adesão ao SISBI-POA, o sistema que dá à inspeção estadual a mesma validade da federal para vender em todo o país.',
  ],
  // Etapas do processo de um frigorífico de bovinos sob inspeção (nomes gerais; detalhes da AgroBrasil a confirmar).
  etapas: [
    { n: '01', titulo: 'Recebimento', texto: 'Os animais chegam dos produtores, passam pelo descanso e pela avaliação do médico-veterinário antes do abate.' },
    { n: '02', titulo: 'Abate inspecionado', texto: 'Abate com a inspeção estadual presente em toda a operação, como exige o registro SIE com inspeção permanente.' },
    { n: '03', titulo: 'Câmara fria', texto: 'As carcaças descem a temperatura nas câmaras de resfriamento antes de seguir para os quartos e cortes.' },
    { n: '04', titulo: 'Quartos e cortes', texto: 'Divisão em dianteiro, traseiro e ponta de agulha, e preparo dos produtos de carne conforme o pedido.' },
    { n: '05', titulo: 'Expedição', texto: 'Carga refrigerada com rastreabilidade, para o Rio Grande do Sul e, pelo SISBI-POA, para outros estados.' },
  ],
  linhas: [
    { slug: 'bovinos', titulo: 'Carne bovina', curto: 'Bovinos', foto: 'camara-inspetor', alt: 'Meias-carcaças bovinas no trilho da câmara fria',
      texto: 'A especialidade da casa: carcaças, quartos e cortes de bovinos de alto padrão, resfriados na câmara fria.',
      itens: ['Carcaça e meia-carcaça', 'Quarto dianteiro', 'Quarto traseiro', 'Ponta de agulha', 'Cortes do traseiro e do dianteiro'] },
    { slug: 'suinos-bubalinos', titulo: 'Suínos e bubalinos', curto: 'Suínos e búfalos', foto: 'equipe-camara', alt: 'Equipe de jaleco na câmara de resfriamento',
      texto: 'O registro da AgroBrasil inclui também o abate de suínos e de búfalos, para quem trabalha com essas carnes.',
      itens: ['Abate de suínos', 'Abate de bubalinos', 'Carcaças resfriadas'] },
    { slug: 'produtos-de-carne', titulo: 'Produtos de carne', curto: 'Produtos de carne', foto: 'carne-crua', alt: 'Bife de contrafilé cru',
      texto: 'Preparo de produtos de carne a partir da própria matéria-prima, com a mesma inspeção do abate.',
      itens: ['Carnes porcionadas', 'Produtos de carne', 'Sob consulta'] },
    { slug: 'subprodutos', titulo: 'Subprodutos do abate', curto: 'Subprodutos', foto: 'camara-cortes', alt: 'Peça bovina sendo avaliada na câmara fria',
      texto: 'Aproveitamento do que sai do abate: miúdos e demais subprodutos, para indústria e revenda.',
      itens: ['Miúdos', 'Couro e demais subprodutos', 'Sob consulta'] },
  ],
  quartos: [
    { nome: 'Dianteiro', texto: 'Acém, paleta, peito, cupim e músculo dianteiro: cortes de panela e de churrasco lento.' },
    { nome: 'Traseiro', texto: 'Alcatra, picanha, contrafilé, filé mignon, coxão e patinho: os cortes nobres do boi.' },
    { nome: 'Ponta de agulha', texto: 'Costela e fraldinha, a peça do fogo de chão gaúcho.' },
  ],
  qualidade: [
    { sigla: 'SIE 419', titulo: 'Inspeção Estadual do RS', texto: 'Registro no Serviço de Inspeção Estadual da Secretaria da Agricultura do Rio Grande do Sul, com inspeção permanente no estabelecimento.' },
    { sigla: 'SISBI-POA', titulo: 'Venda para todo o Brasil', texto: 'Adesão ao Sistema Brasileiro de Inspeção de Produtos de Origem Animal: a inspeção estadual passa a valer como a federal e os produtos podem ser vendidos em outros estados.' },
    { sigla: 'Agregar RS', titulo: 'Programa Agregar RS Carnes', texto: 'Empresa habilitada no programa estadual de qualidade da carne bovina, ovina e bubalina (Resolução 516/2026, período novembro de 2025 a outubro de 2026).' },
  ],
  pecuarista: {
    titulo: 'Pecuarista, fale com a AgroBrasil',
    texto: 'O frigorífico fica na BR-386, no caminho de quem vem do Vale do Taquari, do Vale do Caí e da Região Metropolitana. Para conversar sobre a venda dos seus animais, ligue ou mande mensagem para o comercial.',
  },
  contato: 'Para pedidos, cotações e informações, fale com a nossa equipe.',
};

// Créditos das fotos de banco (Wikimedia Commons e Flickr do USDA). A AgroBrasil ainda não tem fotos próprias publicadas fora do Instagram.
const cred = JSON.parse(fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), '../creditos-fotos.json'), 'utf8'));
export const creditos = 'Fotos ilustrativas de banco de imagens (Wikimedia Commons e USDA), a substituir pelas fotos da AgroBrasil: '
  + Object.values(cred).map(c => `${c.autor || 'autor desconhecido'} (${c.licenca})`).filter((x, i, a) => a.indexOf(x) === i).join(', ') + '.';
