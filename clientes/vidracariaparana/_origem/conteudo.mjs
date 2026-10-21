// Textos e dados da Vidraçaria Paraná. História, lista de serviços, endereço, telefone, fax e e-mail vêm do site atual
// (vidracariaparana.com.br); nota 4,6 e CEP do Google Maps. Agrupamento dos serviços, descrições e etapas foram escritos por nós.
export const empresa = {
  nome: 'Vidraçaria Paraná',
  razao: 'Vidraçaria Paraná Ltda.',
  slogan: 'Vendemos claridade',
  url: 'https://vidracariaparana.overtus.com.br/',
  antigo: 'http://www.vidracariaparana.com.br/',
  fundacao: '31/07/1970', ano: 1970,
  endereco: ['Rua João Viana Seiler, 526', 'Parolin · Curitiba · PR', 'CEP 80220-270'],
  mapa: 'https://www.google.com/maps/place/Vidra%C3%A7aria+Paran%C3%A1+Ltda/@-25.4567303,-49.2653038,17z',
  mapaEmbed: 'https://www.google.com/maps?q=-25.4567303,-49.2653038&z=16&output=embed',
  fone: '(41) 3332-3410', foneHref: '+554133323410',
  fax: '(41) 3332-8500',
  email: 'vidracariaparana@vidracariaparana.com.br',
  nota: '4,6',
};
export const anos = new Date().getFullYear() - empresa.ano;

// História, como está no site atual (corrigida só a contagem de anos, que lá parou em "quase 45").
export const historia = [
  'Em 31 de julho de 1970, o Sr. Hugo Morgenstern Júnior abriu a Vidraçaria Paraná, junto com os filhos Marília Morgenstern e Sérgio Morgenstern.',
  'De lá para cá, a empresa acompanhou as inovações e tendências do mercado, sempre com qualidade e segurança, voltada à plena satisfação do cliente.',
  'Hoje, na terceira geração, a Vidraçaria Paraná se destaca pela qualidade dos serviços, pelo bom atendimento, pelos produtos de excelente qualidade e por profissionais altamente qualificados.',
];

// Os 18 itens do site atual, agrupados. "itens" mantém as palavras do site.
export const grupos = [
  { slug: 'vidros', nome: 'Vidros e temperados', foto: 'box-temperado', ambiente: 'Banheiro e casa',
    texto: 'Vidro comum, temperado e laminado cortado na medida, com box de banheiro e cortina de vidro para fechar a sacada sem perder a vista.',
    itens: ['Vidros', 'Vidros temperados', 'Vidros laminados', 'Box em vidro temperado', 'Cortina de vidro (abertura total do ambiente)'] },
  { slug: 'comercial', nome: 'Fachadas e comércio', foto: 'fachada', ambiente: 'Lojas e empresas',
    texto: 'Vidro para a frente da loja, o balcão e o escritório: fachadas, vitrines, divisórias, expositores e coberturas.',
    itens: ['Vidros para fachadas', 'Vitrines', 'Divisórias', 'Balcões e expositores', 'Coberturas'] },
  { slug: 'espelhos', nome: 'Espelhos', foto: 'banheiro-espelho', ambiente: 'Banheiro, quarto e garagem',
    texto: 'Espelho na medida da parede, com acabamento nas bordas, e também espelhos convexos e retrovisores.',
    itens: ['Espelhos', 'Espelhos convexos', 'Retrovisores'] },
  { slug: 'acabamento', nome: 'Lapidação e acabamento', foto: 'corte', ambiente: 'Feito na oficina',
    texto: 'O acabamento que deixa o vidro seguro e bonito: bordas lapidadas, bisotê, furos, recortes e jateamento.',
    itens: ['Lapidação polida, bisotê e boleado', 'Cantos especiais, cubas e recortes', 'Furos em vidros e espelhos', 'Jateamentos', 'Conserto de cristais com cola U.V.', 'Cortes em garrafa'] },
  { slug: 'mesas', nome: 'Tampos e decoração', foto: 'interior', ambiente: 'Sala e escritório',
    texto: 'Tampos de mesa em vidro, inclusive Diamond Guard e Ébony, pés de mesa, aparadores, molduras e porta-retratos.',
    itens: ['Tampos de mesa (Diamond Guard, Ébony)', 'Pés de mesa e aparadores', 'Molduras', 'Porta-retratos e porta-cartões'] },
  { slug: 'homenagens', nome: 'Placas e troféus', foto: 'chapas', ambiente: 'Empresas e eventos',
    texto: 'Placas de homenagem e troféus em vidro, e massa para vidraceiros no balcão.',
    itens: ['Placas de homenagem', 'Troféus', 'Massa para vidraceiros'] },
];

// Etapas de um serviço sob medida (texto nosso, para a seção visual de processo).
export const etapas = [
  { t: 'Orçamento', d: 'Você liga, manda as medidas por e-mail ou passa na loja do Parolin.' },
  { t: 'Medida no local', d: 'Para box, cortina de vidro, espelho grande e fachada, a medida é tirada no lugar.' },
  { t: 'Corte e acabamento', d: 'Vidro escolhido, cortado e lapidado: borda polida, bisotê, furos ou jateado.' },
  { t: 'Entrega e instalação', d: 'Instalado por quem faz isso todo dia, com o cuidado de uma empresa de família.' },
];

// Fotos: "cortina" é a foto da própria Vidraçaria Paraná no Google Maps; as outras são de bancos livres (ver LEIA-ME).
export const fotos = {
  cortina: 'Cortina de vidro instalada numa sacada em Curitiba (foto da Vidraçaria Paraná)',
  'box-temperado': 'Banheiro com box em vidro temperado',
  'box-banheiro': 'Box de vidro com porta de correr',
  'banheiro-espelho': 'Banheiro com box de vidro e espelho na porta',
  'banheiro-vidro': 'Banheiro amplo com divisória de vidro',
  fachada: 'Fachada envidraçada',
  interior: 'Café com fachada de vidro do chão ao teto',
  escada: 'Escada com guarda-corpo de vidro',
  chapas: 'Chapas de vidro no estoque',
  corte: 'Vidro sobre a mesa de corte',
  galpao: 'Oficina de beneficiamento de vidro',
  araucarias: 'Araucárias em frente a um prédio de vidro em Curitiba',
  'por-do-sol': 'Pôr do sol com araucária em Curitiba',
};
export const tamanhos = {
  araucarias: [1600, 1200], 'banheiro-espelho': [1024, 683], 'banheiro-vidro': [1024, 681], 'box-banheiro': [1024, 684],
  'box-temperado': [681, 1024], chapas: [1600, 1067], corte: [1600, 1067], cortina: [1292, 1600], escada: [1600, 1200],
  fachada: [1600, 1123], galpao: [1600, 1200], interior: [1600, 1067], 'por-do-sol': [1600, 1067],
};

// Créditos das fotos de banco (mostrados no pé da página Fotos): [foto, autor, licença, origem].
export const creditos = [
  ['araucarias', 'Deyvid Setti e Eloy Olindo Setti', 'CC BY-SA', 'https://commons.wikimedia.org/w/index.php?curid=11012130'],
  ['banheiro-espelho', 'autor não informado', 'CC0', 'https://www.rawpixel.com/image/5919752/photo-image-public-domain-shadow-blue'],
  ['banheiro-vidro', 'autor não informado', 'CC0', 'https://www.rawpixel.com/image/6043330/photo-image-public-domain-living-room'],
  ['box-banheiro', 'autor não informado', 'CC0', 'https://www.rawpixel.com/image/6077486/dsc09616'],
  ['box-temperado', 'autor não informado', 'CC0', 'https://www.rawpixel.com/image/6043353/photo-image-public-domain-house-living-room'],
  ['chapas', 'Shixart1985', 'CC BY', 'https://commons.wikimedia.org/w/index.php?curid=197077680'],
  ['corte', 'Shixart1985', 'CC BY', 'https://commons.wikimedia.org/w/index.php?curid=197077725'],
  ['escada', 'Rashed Hossain', 'CC0', 'https://wordpress.org/photos/photo/6726a27c60/'],
  ['fachada', 'Sneha G Gupta', 'CC BY-SA', 'https://commons.wikimedia.org/w/index.php?curid=147156476'],
  ['galpao', 'David Hawgood', 'CC BY-SA', 'https://commons.wikimedia.org/w/index.php?curid=164250043'],
  ['interior', 'Fred Romero from Paris, France', 'CC BY', 'https://commons.wikimedia.org/w/index.php?curid=78001115'],
  ['por-do-sol', 'Renata Alves dos Anjos', 'CC BY', 'https://commons.wikimedia.org/w/index.php?curid=4851474'],
];
