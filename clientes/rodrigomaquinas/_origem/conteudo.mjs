// Todo o conteúdo vem do site atual (rodrigomaquinas.com.br, outubro de 2026): empresa, contatos, texto "Sobre a empresa"
// e as 19 máquinas da "Lista Completa de máquinas" com ano, marca, modelo, preço e as 4 fotos de cada uma.
// Nomes de marca e modelo foram arrumados (no site: "dossan", "Fiat", "B909", "RETROESCAVADERIA"); o original fica em `noSite`.

export const empresa = {
  nome: 'Rodrigo Máquinas',
  sub: 'Comércio de Máquinas Pesadas',
  url: 'https://rodrigomaquinas.overtus.com.br/',
  antigo: 'http://rodrigomaquinas.com.br/',
  rua: 'Avenida Sertório, 5600',
  bairro: 'Jardim Lindóia',
  cidade: 'Porto Alegre/RS',
  cep: '91050-370',
  tels: ['(51) 3026-0702', '(51) 3012-3074'],
  email: 'rodrigo.maquinasvendas@gmail.com',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Avenida+Sert%C3%B3rio%2C+5600+-+Jardim+Lind%C3%B3ia%2C+Porto+Alegre+-+RS%2C+91050-370',
  mapaEmbed: 'https://maps.google.com/maps?q=Avenida%20Sert%C3%B3rio%2C%205600%2C%20Porto%20Alegre%20RS&z=15&output=embed',
};

// "Sobre a empresa", palavra por palavra do site (só "comoas" e "Fiatalles" corrigidos).
export const sobre = [
  'Atuamos no segmento de compra, venda e troca de máquinas para terraplenagem, pavimentação, escavações, perfurações e ar comprimido de diversas marcas e modelos, como também caminhões, empilhadeiras e outros tipos de máquinas pesadas.',
  'Trabalhamos com várias marcas conceituadas como Case, Caterpillar, Fiatallis, Michigan, Komatsu, Massey Ferguson, Randon, JCB e outras.',
  'Com profissionais altamente qualificados e treinados, sempre à disposição para esclarecimentos e informações, com credibilidade no mercado de máquinas pesadas.',
  'Vendemos, compramos e trocamos em todo o território nacional. Conheça as nossas máquinas através do site ou faça-nos uma visita.',
];

export const marcasTexto = ['Case', 'Caterpillar', 'Fiatallis', 'Michigan', 'Komatsu', 'Massey Ferguson', 'Randon', 'JCB'];

// Segmentos citados no "Sobre a empresa".
export const segmentos = ['Terraplenagem', 'Pavimentação', 'Escavações', 'Perfurações', 'Ar comprimido', 'Caminhões', 'Empilhadeiras'];

// Tipos com máquina no pátio hoje (o menu do site atual tem 22 categorias, a maioria vazia).
export const tipos = [
  { slug: 'retroescavadeiras', nome: 'Retroescavadeiras', sing: 'Retroescavadeira' },
  { slug: 'escavadeiras', nome: 'Escavadeiras', sing: 'Escavadeira' },
  { slug: 'motoniveladoras', nome: 'Motoniveladoras', sing: 'Motoniveladora' },
  { slug: 'pas-carregadeiras', nome: 'Pás carregadeiras', sing: 'Pá carregadeira' },
  { slug: 'rolos-compactadores', nome: 'Rolos compactadores', sing: 'Rolo compactador' },
  { slug: 'caminhoes', nome: 'Caminhões', sing: 'Caminhão caçamba' },
];

// Categorias do menu lateral do site atual (para a versão A mostrar o mesmo menu, só com as que têm estoque marcadas).
export const categoriasSite = ['Caminhões', 'Compressor', 'Empilhadeira', 'Escavadeira', 'Garra', 'Manipulador', 'Mini pá carregadeira', 'Mini retroescavadeira', 'Mini-escavadeira', 'Motoniveladora', 'Pá carregadeira', 'Prancha', 'Retroescavadeiras', 'Rolocompactador', 'Trator agrícola', 'Trator de esteira', 'Veículos', 'Vibroacabadora', 'Outros'];

const m = (id, tipo, marca, modelo, ano, valor, extra = {}) => ({ id, tipo, marca, modelo, ano, valor, ...extra });
export const maquinas = [
  m(1716, 'retroescavadeiras', 'Case', '580L', 1999, 115000, { tracao: '4x4', noSite: 'RETROESCAVADEIRA CASE 580L (modelo 580L4X4)' }),
  m(1723, 'caminhoes', 'Ford', 'Cargo 1617', 1995, 95000, { implemento: 'Caçamba', noSite: 'CAÇAMBA 1617 (modelo CARGO 1617)' }),
  m(1713, 'retroescavadeiras', 'New Holland', 'B90B', 2014, 145000, { tracao: '4x2', noSite: 'RETROESCAVADEIRA B909 4X2 (modelo B90B)' }),
  m(1707, 'rolos-compactadores', 'Dynapac', 'CA15', 2001, 160000, { noSite: 'ROLO COMPTADOR CA 15' }),
  m(1674, 'retroescavadeiras', 'John Deere', '310K', 2012, 145000, { noSite: 'RETROESCAVADEIRA JOHN DEERE 310K 2012 (marca "JOHNDEERE 310 K")' }),
  m(1722, 'retroescavadeiras', 'Case', '580L', 1998, 85000, { tracao: '4x2', noSite: 'RETROESCAVADEIRA CASE 580L (modelo RETROESCAVADERIA 580L 4X2)' }),
  m(1657, 'pas-carregadeiras', 'Yale', '1500B', 1983, 125000, { noSite: 'PA CARREGADEIRA 1500B' }),
  m(1714, 'pas-carregadeiras', 'Michigan', '75 III', 1980, 95000, { noSite: 'PA CARREGADEIRA 75III' }),
  m(1720, 'retroescavadeiras', 'New Holland', 'B90B', 2014, 185000, { tracao: '4x4', noSite: 'RETROESCAVADEIRA B90B 4X4' }),
  m(1715, 'retroescavadeiras', 'Randon', 'RK 406B', 2011, 125000, { noSite: 'RETROESCAVADEIRA RK 406 B' }),
  m(1660, 'escavadeiras', 'Caterpillar', '320D', 2010, 290000, { hidraulica: true, noSite: 'ESCAVADEIRA HIDRÁULICA CATERPILLAR 320D' }),
  m(1640, 'rolos-compactadores', 'Dynapac', 'CG 11', 1990, 45000, { noSite: 'ROLO COMPACTADOR (modelo CG 11)' }),
  m(1701, 'retroescavadeiras', 'New Holland', 'B90B', 2014, 185000, { tracao: '4x4', noSite: 'B90B 4X4' }),
  m(1709, 'escavadeiras', 'Doosan', '225', 2011, 330000, { noSite: 'ESCAVADEIRA 225 (marca "dossan")' }),
  m(1719, 'motoniveladoras', 'Huber Warco', '130M', 1980, 65000, { noSite: 'MOTONIVELADORA 130 M' }),
  m(1699, 'retroescavadeiras', 'Randon', 'RD 406', 2013, 145000, { noSite: 'RANDON RD406' }),
  m(1689, 'motoniveladoras', 'Volvo', 'G940', 2008, 290000, { noSite: 'MOTONIVELADORA G 940' }),
  m(1681, 'escavadeiras', 'Fiatallis', 'FX215', 2005, 230000, { noSite: 'ESCAVADEIRA FX 215 (marca "Fiat"; nas fotos a máquina é Fiatallis)' }),
  m(1717, 'rolos-compactadores', 'Tema Terra', 'SPV 735', 1980, 110000, { noSite: 'ROLO COMPACTADOR SPV 735' }),
].map(x => {
  const t = tipos.find(t => t.slug === x.tipo);
  const nome = `${t.sing}${x.hidraulica ? ' hidráulica' : ''} ${x.marca} ${x.modelo}${x.tracao ? ` ${x.tracao}` : ''}`;
  const slug = `${x.tipo.replace(/s$/, '').replace(/-/g, '')}-${x.marca}-${x.modelo}-${x.tracao || ''}-${x.ano}`
    .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') + `-${x.id}`;
  return { ...x, nome, curto: `${x.marca} ${x.modelo}${x.tracao ? ` ${x.tracao}` : ''}`, slug, tipoNome: t.sing, fotos: 4 };
});

export const preco = v => 'R$ ' + v.toLocaleString('pt-BR') + ',00';
export const precoCurto = v => `R$ ${(v / 1000).toLocaleString('pt-BR')} mil`;
