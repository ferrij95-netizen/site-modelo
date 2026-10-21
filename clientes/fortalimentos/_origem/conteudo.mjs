// Textos e dados da Fort Alimentos. Produtos, marcas, categorias, receitas e os textos da empresa vieram do site atual
// (fortalimentossorocaba.com.br). Pesos e embalagens só onde o site atual informa. Títulos de seção e legendas são nossos.
import fs from 'node:fs';

export const empresa = {
  nome: 'Fort Alimentos',
  nomeLongo: 'Fort Alimentos Sorocaba',
  descricao: 'Distribuidora e Atacado de Alimentos',
  url: 'https://fortalimentos.overtus.com.br/',
  antigo: 'http://fortalimentossorocaba.com.br/',
  fone: '(15) 3322-2246',
  foneHref: '+551533222246',
  cel: '(15) 99113-8912',
  celHref: '+5515991138912',
  whats: '5515991138912',
  endereco: 'Rua Giacomo Zorzi, 79 - Vila Rica',
  cidade: 'Sorocaba/SP',
  mapa: 'https://www.google.com/maps?q=Rua+Giacomo+Zorzi,+79+-+Vila+Rica,+Sorocaba+-+SP&output=embed',
  mapaLink: 'https://www.google.com/maps/search/?api=1&query=Rua+Giacomo+Zorzi,+79,+Sorocaba,+SP',
  facebook: 'https://www.facebook.com/pages/Fort-Alimentos-Sorocaba/713575295362051',
  parceiro: { nome: 'JF Hortfrut', texto: 'Atacado de Frutas e Legumes Sorocaba', url: 'https://jfhortfrut.com.br/site/' },
};

export const textos = {
  titulo: 'Atacado de Frios e Laticínios',
  intro: 'Distribuímos frios, laticínios, conservas condimentos e muitos outros produtos, atendendo clientes de pequeno (micro-empresas) e médio porte de Sorocaba e Região. Entre seus clientes destacam-se supermercados, açougues, restaurantes, padarias e outros comércios de bairro.',
  historia: [
    'Com a ampliação dos setores de venda e o crescimento dos negócios, a Fort Alimentos Sorocaba evoluiu e conquistou, entre outros objetivos, a sua própria sede de atendimento e distribuição de alimentos perecíveis e não perecíveis, a qual está localizada no bairro Jardim Nova Manchester – Sorocaba/SP.',
    'Estes elementos tornam a Fort Alimentos Sorocaba cada dia uma empresa reconhecida pelos seus clientes por ser parceira, confiável, responsável e qualificada na entrega do produto certo e no prazo combinado.',
  ],
  missao: 'Promover a satisfação do consumidor final por meio de venda diferenciada de produtos de qualidade, aliada com a entrega rápida, agregando valores aos serviços dos clientes e que gerem confiança e fidelidade.',
  visao: 'Ser reconhecido por clientes e colaboradores como uma EMPRESA MODELO na venda e distribuição de alimentos perecíveis e não perecíveis em Sorocaba e Região.',
  valores: ['Responsável', 'confiável', 'honesta', 'fiel', 'parceira', 'ética'],
  disk: 'Disk Entrega',
  regiao: 'Sorocaba e Região',
  slides: ['Linha completa de Frios e Laticínios', 'Uma linha completa e diferenciada com a maior variedade em queijos.', 'Na Fort Alimentos você encontra tudo para o seu comércio.'],
  receitas: 'Aqui você sempre encontra algo novo',
  newsletter: 'Digite seu email abaixo para receber mais informações sobre nossa empresa',
};

export const clientes = [
  { id: 'supermercados', nome: 'Supermercados' },
  { id: 'acougues', nome: 'Açougues' },
  { id: 'restaurantes', nome: 'Restaurantes' },
  { id: 'padarias', nome: 'Padarias' },
  { id: 'bairro', nome: 'Comércios de bairro' },
];

export const categorias = [
  { slug: 'mortadelas', nome: 'Mortadelas', curto: 'Mortadela' },
  { slug: 'calabresa', nome: 'Linguiças Calabresa', curto: 'Calabresa' },
  { slug: 'mussarela', nome: 'Queijos Mussarela', curto: 'Mussarela' },
  { slug: 'queijo-prato', nome: 'Queijos Prato', curto: 'Prato' },
  { slug: 'provolone', nome: 'Queijos Provolone', curto: 'Provolone' },
  { slug: 'parmesao', nome: 'Queijos Parmesão', curto: 'Parmesão' },
  { slug: 'gorgonzola', nome: 'Queijos Gorgonzola', curto: 'Gorgonzola' },
  { slug: 'requeijoes', nome: 'Requeijões', curto: 'Requeijão' },
];

export const marcas = [
  { slug: 'sadia', nome: 'Sadia' }, { slug: 'seara', nome: 'Seara' }, { slug: 'aurora', nome: 'Aurora' },
  { slug: 'rezende', nome: 'Rezende' }, { slug: 'marba', nome: 'Marba' }, { slug: 'ceratti', nome: 'Ceratti' },
  { slug: 'quata', nome: 'Quatá' }, { slug: 'tres-marias', nome: 'Três Marias' }, { slug: 'crioulo', nome: 'Crioulo' },
  { slug: 'dona-beja', nome: 'Dona Beja' }, { slug: 'd-vovo', nome: 'D Vovó' }, { slug: 'santo-creme', nome: 'Santo Creme' },
  { slug: 'da-fazenda', nome: 'Da Fazenda' },
];

// id = número do produto no site atual (produto_detalhe.php?produtos=id) e nome do arquivo em assets/prod/.
const P = (id, slug, nome, cat, marca, ficha = {}) => ({ id, slug, nome, cat, marca, ficha });
export const produtos = [
  P(662, 'mortadela-aurora-5kg', 'Mortadela Aurora 5 kg', 'mortadelas', 'aurora', { 'Peso': '5 kg' }),
  P(660, 'mortadela-marba-5kg', 'Mortadela Marba 5 kg', 'mortadelas', 'marba', { 'Peso': '5 kg' }),
  P(661, 'mortadela-ceratti', 'Mortadela Bologna Ceratti Tradicional', 'mortadelas', 'ceratti'),
  P(654, 'calabresa-reta-sadia', 'Linguiça Calabresa Reta Sadia', 'calabresa', 'sadia', { 'Formato': 'Reta' }),
  P(656, 'calabresa-curva-sadia', 'Linguiça Calabresa Curva Sadia', 'calabresa', 'sadia', { 'Formato': 'Curva' }),
  P(655, 'calabresa-reta-seara', 'Linguiça Calabresa Reta Seara', 'calabresa', 'seara', { 'Formato': 'Reta' }),
  P(659, 'calabresa-curva-seara', 'Linguiça Calabresa Curva Seara', 'calabresa', 'seara', { 'Formato': 'Curva' }),
  P(652, 'calabresa-reta-aurora', 'Linguiça Calabresa Reta Aurora', 'calabresa', 'aurora', { 'Formato': 'Reta' }),
  P(658, 'calabresa-curva-aurora', 'Linguiça Calabresa Curva Aurora', 'calabresa', 'aurora', { 'Formato': 'Curva' }),
  P(653, 'calabresa-reta-rezende', 'Linguiça Calabresa Reta Rezende', 'calabresa', 'rezende', { 'Formato': 'Reta' }),
  P(657, 'calabresa-curva-rezende', 'Linguiça Calabresa Curva Rezende', 'calabresa', 'rezende', { 'Formato': 'Curva' }),
  P(644, 'mussarela-dona-beja-500g', 'Queijo Mussarela Dona Beja 500 g', 'mussarela', 'dona-beja', { 'Peso': '500 g' }),
  P(645, 'mussarela-d-vovo-500g', 'Queijo Mussarela D Vovó 500 g', 'mussarela', 'd-vovo', { 'Peso': '500 g' }),
  P(648, 'mussarela-crioulo', 'Queijo Mussarela Crioulo', 'mussarela', 'crioulo'),
  P(642, 'prato-tres-marias-3-5kg', 'Queijo Prato Três Marias 3,5 kg', 'queijo-prato', 'tres-marias', { 'Peso': '3,5 kg' }),
  P(643, 'prato-crioulo-500g', 'Queijo Prato Crioulo 500 g', 'queijo-prato', 'crioulo', { 'Peso': '500 g' }),
  P(646, 'provolone-crioulo-5kg', 'Queijo Provolone Crioulo 5 kg', 'provolone', 'crioulo', { 'Procedência': 'Minas Gerais', 'Peso bruto': '5 kg', 'Peso líquido': '5 kg', 'Embalagem': 'Vácuo acompanhado de rede' }),
  P(647, 'provolone-tres-marias-2kg', 'Queijo Provolone Três Marias 2 kg', 'provolone', 'tres-marias', { 'Procedência': 'Minas Gerais', 'Peso bruto': '2 kg', 'Peso líquido': '2 kg', 'Embalagem': 'Vácuo acompanhado de rede' }),
  P(649, 'provolone-quata-5kg', 'Queijo Provolone Quatá 5 kg', 'provolone', 'quata', { 'Peso bruto': '5 kg', 'Peso líquido': '5 kg' }),
  P(650, 'parmesao-tres-marias-5kg', 'Queijo Parmesão Três Marias 5 kg', 'parmesao', 'tres-marias', { 'Procedência': 'Brasil', 'Peso bruto': '5 kg aproximados', 'Peso líquido': '5 kg aproximados', 'Embalagem': 'Plástica a vácuo', 'Quantidade': 'Avulso' }),
  P(651, 'parmesao-quata', 'Queijo Parmesão Quatá', 'parmesao', 'quata'),
  P(663, 'gorgonzola-quata-3kg', 'Queijo Gorgonzola Quatá peça 3 kg', 'gorgonzola', 'quata', { 'Procedência': 'Brasil', 'Peso bruto': '3 kg', 'Peso líquido': '3 kg', 'Embalagem': 'Papel alumínio' }),
  P(664, 'gorgonzola-cunha-quata-250g', 'Gorgonzola Cunha Quatá 250 g', 'gorgonzola', 'quata', { 'Procedência': 'Brasil', 'Peso bruto': '250 g', 'Peso líquido': '250 g', 'Embalagem': 'Papel alumínio' }),
  P(639, 'requeijao-crioulo-200g', 'Requeijão Cremoso Crioulo 200 g', 'requeijoes', 'crioulo', { 'Procedência': 'Brasil/SP', 'Peso bruto': '220 g', 'Peso líquido': '200 g', 'Embalagem': 'Copo de vidro' }),
  P(640, 'requeijao-bisnaga-santo-creme', 'Requeijão Bisnaga Santo Creme 1,8 kg', 'requeijoes', 'santo-creme', { 'Peso': '1,8 kg', 'Embalagem': 'Bisnaga' }),
  P(641, 'requeijao-bisnaga-da-fazenda', 'Requeijão Bisnaga Da Fazenda 1,8 kg', 'requeijoes', 'da-fazenda', { 'Peso': '1,8 kg', 'Embalagem': 'Bisnaga' }),
];

// Os destaques da página inicial do site atual, na mesma ordem.
export const destaquesHome = [664, 663, 662, 661, 660, 659, 658, 657, 656];

export const receitas = JSON.parse(fs.readFileSync(new URL('./receitas.json', import.meta.url), 'utf8'));

export const creditos = 'Fotos de apoio (Wikimedia Commons): armazém refrigerado, Walmart Corporate (CC BY 2.0); mortadela no supermercado, Simplus Menegati (CC BY-SA 4.0); sanduíche de mortadela no Mercadão, Eugenio Hansen, OFS (CC BY-SA 4.0); rodas de parmesão, Wittylama (CC BY-SA); balcão de queijos, Peachyeung316 (CC BY-SA 4.0). Fotos dos produtos, marcas e receitas: site atual da Fort Alimentos.';

export const catDe = slug => categorias.find(c => c.slug === slug);
export const marcaDe = slug => marcas.find(m => m.slug === slug);
