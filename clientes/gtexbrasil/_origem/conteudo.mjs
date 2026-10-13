// Textos e catálogo da GTEX, tirados do site atual (gtexbrasil.com.br) em 2026-10-13.
// Cada produto é uma "família" com as embalagens do site atual; a foto de cada embalagem é a do próprio site.
// Nada de descrição inventada: onde o site não descreve o produto, a página mostra só marca, linha e embalagens.

export const site = {
  nome: 'GTEX',
  dominio: 'https://gtexbrasil.overtus.com.br',
  atual: 'https://www.gtexbrasil.com.br/',
  fone: '0800 727 2297',
  foneHref: '08007272297',
  email: 'sac@gtexbrasil.com.br',
  lgpd: { empresa: 'Embrasi Governança e Consultoria de Tecnologia', nome: 'Miqueias Micheletti', exin: '6330328.20795861', email: 'miqueias.micheletti@gtexbrasil.com.br' },
  redes: [
    ['Facebook', 'https://www.facebook.com/GrupoGtex/'],
    ['Instagram', 'https://www.instagram.com/gtexgrupo/'],
    ['LinkedIn', 'https://br.linkedin.com/company/gtexbrasil'],
  ],
  loja: 'https://casadege.com.br?utm_source=organic&utm_medium=institucional&utm_campaign=site-gtex',
};

// Menu na mesma ordem do site atual (Trade abre FDS, Download e Catálogos).
export const menu = [
  ['index', 'Home'],
  ['quem-somos', 'Quem somos'],
  ['produtos', 'Produtos'],
  ['trade', 'Trade', [['fds', 'FDS'], ['download', 'Download'], ['catalogos', 'Catálogos']]],
  ['onde-comprar', 'Onde comprar'],
  ['trabalhe-conosco', 'Trabalhe conosco'],
  ['contato', 'Contato'],
];

export const marcas = [
  {
    id: 'urca', nome: 'Urca', logo: 'marca-urca', cor: '#e5175a', cor2: '#fde3ec',
    titulo: 'UFA! AINDA BEM QUE TEM', frase: 'UFA, ainda bem que é URCA!',
    texto: ['Para cada desafio na limpeza da sua casa, existe uma solução Urca.'],
    banner: 'urca-familia', catalogo: '2025/08/6196_CatalogosGtex_Urca_8pag_210x297mm-DIGITAL.pdf',
  },
  {
    id: 'baby-soft', nome: 'Baby Soft', logo: 'marca-baby-soft', cor: '#d8262f', cor2: '#e6effa',
    titulo: 'Ame suas roupas por mais tempo', frase: 'Baby Soft, ame suas roupas por mais tempo.',
    texto: [
      'Sabe aquela peça de roupa que tem uma história, que te veste de confiança e boas memórias? Ela merece um cuidado que vai além da limpeza.',
      'Baby Soft apresenta o primeiro e único tratamento completo para tecidos, com uma tecnologia inovadora que protege as fibras a cada lavagem. Mais do que limpar e perfumar, nós renovamos a vida das suas roupas, para que você possa viver seus melhores momentos com elas, de novo e de novo.',
    ],
    banner: 'babysoft-familia', catalogo: '2025/08/6196_CatalogosGtex_BabySoft_6pag_210x297mm-DIGITAL.pdf',
  },
  {
    id: 'ufe', nome: 'UFE Coco', logo: 'marca-ufe', cor: '#1d5a32', cor2: '#eaf3e4',
    titulo: 'UFE Coco: Tradição e qualidade', frase: 'Feito com coco de verdade.',
    texto: ['Há mais de 80 anos, UFE Coco acompanha a geração dos consumidores, oferecendo produtos de alta qualidade para cuidar de suas famílias.'],
    banner: null, catalogo: '2025/08/6196_CatalogosGtex_UFE_4pag_210x280mm-DIGITAL.pdf',
  },
  {
    id: 'ruth-care', nome: 'Ruth Care', logo: 'marca-ruth', cor: '#2f4a12', cor2: '#f4efe2',
    titulo: 'Ruth Care: O cuidado atencioso que suas roupas merecem', frase: 'Linhas Ruth Care Baby e Coco.',
    texto: ['Ruth Care é a marca da GTEX que se identifica com o carinho que você tem pela sua família e pelo seu lar. Suas linhas, Ruth Care Baby e Coco, são de produtos voltados para o tratamento das roupas.'],
    banner: 'ruth-banner', catalogo: '2025/08/6196_CatalogosGtex_Ruth_4pag_210x280mm-DIGITAL.pdf',
  },
  {
    id: 'classic', nome: 'Classic', logo: 'marca-classic', cor: '#d71920', cor2: '#fdeaea',
    titulo: 'Classic: Eficiência e Economia para sua casa', frase: 'Para uma limpeza eficiente e econômica.',
    texto: ['Classic é a marca de confiança presente nos lares brasileiros, oferecendo linhas completas de produtos. Desenvolvidos para facilitar o dia a dia, os produtos Classic unem qualidade, rendimento e preço acessível.'],
    banner: 'classic-banner', catalogo: '2025/08/CatalogosGtex_Classic_210x280mm-GERAL-DIGITAL.pdf',
  },
  {
    id: 'amazon-h2o', nome: 'Amazon H2O', logo: 'marca-amazon', cor: '#2e5a1c', cor2: '#e7f1df',
    titulo: 'Amazon H2O: nosso planeta é o nosso maior tesouro!', frase: 'A linha sustentável que cuida da sua casa e do planeta.',
    texto: ['Pensando em você que quer manter a casa limpa sem deixar de lado o meio ambiente. O futuro e o planeta agradecem!'],
    banner: 'amazon-banner', catalogo: '2025/08/6196_CatalogosGtex_Amazon_210x265mm-DIGITAL.pdf',
  },
];

export const categorias = [
  { id: 'lavanderia', nome: 'Lavanderia', foto: 'cat-lavanderia', h2: 'Produtos que garantem o cuidado completo de suas roupas e tecidos!', h3: 'Cuidado que faz a diferença',
    texto: 'A GTEX selecionou produtos pensados para proteger, limpar e conservar suas roupas e tecidos com carinho e eficiência.', curto: 'Produtos que garantem o cuidado completo de suas roupas e tecidos.' },
  { id: 'toda-a-casa', nome: 'Toda a casa', foto: 'cat-toda-a-casa', h2: 'O cuidado que sua família merece!', h3: 'O essencial para o seu lar',
    texto: 'A GTEX entende que, para fazer a diferença no dia a dia das pessoas, precisa oferecer uma linha super completa de produtos, com qualidade de verdade, preços que cabem no bolso e, acima de tudo, respeito aos valores do povo brasileiro.', curto: 'Uma linha especial para cuidar de cada espaço da sua casa.' },
  { id: 'cozinha', nome: 'Cozinha', foto: 'cat-cozinha', h2: 'Facilidade e cuidado para a sua cozinha!', h3: 'Praticidade no seu dia a dia',
    texto: 'Uma linha especial para manter sua cozinha sempre limpa, organizada e pronta para os melhores momentos.', curto: 'Facilidade e cuidado para a sua cozinha.' },
  { id: 'linha-coco', nome: 'Linha coco', foto: 'cat-linha-coco', h2: 'Cuidado especial com produtos à base de coco de verdade.', h3: 'O poder natural do coco',
    texto: 'Produtos desenvolvidos com a pureza do coco para oferecer cuidado suave, eficaz e com aquele perfume que faz a casa toda se sentir acolhida.', curto: 'Cuidado especial com produtos à base de coco de verdade.' },
];

// Tipos (filtro do catálogo), na ordem das prateleiras.
export const tipos = [
  ['lava-roupas', 'Lava roupas'], ['amaciante', 'Amaciantes'], ['tira-manchas', 'Tira manchas'], ['passar', 'Sem passar'],
  ['desinfetante', 'Desinfetantes'], ['sanitaria', 'Água sanitária e cloro'], ['multiuso', 'Multiuso e limpadores'], ['pedra', 'Pedra sanitária'],
  ['loucas', 'Lava louças'], ['pasta', 'Sabão em pasta'], ['barra', 'Sabão em barra'], ['po-coco', 'Sabão de coco em pó'],
];

const DESINF = 'Antibac. Elimina 99,9% dos germes e bactérias comumente encontrados nos lares brasileiros. Modo de uso: aplique puro com um pano limpo e seco, deixe agir por 10 minutos, sem enxágue.';
const LOUCAS = 'Remove a gordura mais difícil. A versão Neutro não tem corante.';
const AMAC = 'Dosagem: no concentrado, uma tampa (20 ml) para até 6 kg de roupa; no diluído, duas tampas em ciclo mínimo de máquina, com até 10 kg de roupa.';
const CONC = 'Concentrado e diluído suavizam da mesma forma, mas o concentrado precisa de bem menos produto: mais praticidade, economia e menos embalagem.';

// [slug, nome, marca, categoria, tipo, texto, embalagens [[rótulo, arquivo de origem]], fds, destaque]
const P = (slug, nome, marca, cat, tipo, texto, emb, fds = null, extra = {}) => ({ slug, nome, marca, cat, tipo, texto, emb: emb.map(([r, f]) => ({ r, f, img: slug + '-' + r.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') })), fds, ...extra });
const F = 'https://www.gtexbrasil.com.br/arquivos/fds/';

export const produtos = [
  // Urca
  P('urca-lava-roupas-liquido', 'Lava Roupas Líquido Urca', 'urca', 'lavanderia', 'lava-roupas', '', [['1L', '2025_09_URCA-Lava-Roupas-Liquido-1L.jpg'], ['3L', '2025_09_URCA-Lava-Roupas-Liquido-3L.jpg'], ['5L', '2025_09_URCA-Lava-Roupas-Liquido-5L.jpg']], F + 'urca/fds-lava-roupas-liquido-urca-versoes.pdf'),
  P('urca-lava-roupas-po-concentrado', 'Lava Roupas em Pó Concentrado Urca', 'urca', 'lavanderia', 'lava-roupas', '', [['800g', '2025_09_Lava-Roupas-Po-Concentrado-800g.png'], ['2,2kg', '2025_09_Lava-Roupas-Po-Concentrado-22Kg.png'], ['Cartucho Lavanda 2,2kg', '2025_09_URCA-Lava-Rupas-em-Po-Cartucho-Lavanda-2-2Kg.jpg']], F + 'urca/fds-lava-roupas-em-po-urca-maxx.pdf'),
  P('urca-lava-roupas-po-sache', 'Lava Roupas em Pó Sachê Urca', 'urca', 'lavanderia', 'lava-roupas', '', [['400g', '2025_09_URCA-Lava-Roupas-Po-Sache-400g.jpg'], ['800g', '2025_09_URCA-Lava-Roupas-Po-Sache-800g.jpg'], ['2,4kg', '2025_09_URCA-Lava-Roupas-Po-Sache-24kg.jpg'], ['4kg', '2025_09_URCA-Lava-Roupas-Po-Sache-4kg.jpg']], F + 'urca/fds-lava-roupas-em-po-urca-maxx-concentrado.pdf'),
  P('urca-pro', 'Lava Roupas em Pó Urca PRO', 'urca', 'lavanderia', 'lava-roupas', 'Embalagem econômica de alto rendimento.', [['8kg', '2025_09_Lava-Roupas-Po-Urca-PRO-8kg.png']]),
  P('urca-amaciante-concentrado', 'Amaciante Concentrado Urca', 'urca', 'lavanderia', 'amaciante', AMAC, [['500ml', '2025_09_URCA-Amaciante-Concentrado-500ml.jpg'], ['1,5L', '2025_09_URCA-Amaciante-Concentrado-15L.jpg']], F + 'urca/fds-amaciante-urca-versoes.pdf.pdf'),
  P('urca-amaciante-diluido', 'Amaciante Diluído Urca', 'urca', 'lavanderia', 'amaciante', AMAC, [['2L', '2025_09_URCA-Amaciante-Diluido-2L.jpg'], ['3L', '2025_09_URCA-Amaciante-Diluido-3L.jpg'], ['5L', '2025_09_Amaciante-Diluido-5L.png']], F + 'urca/fds-amaciante-urca-versoes.pdf.pdf'),
  P('urca-tira-manchas', 'Tira Manchas Urca', 'urca', 'lavanderia', 'tira-manchas', 'A família Urca cresceu: novo tira-manchas na versão 5L.', [['Pouch 500ml', '2025_09_Tira-manchas-Pouch-500ml.jpg'], ['1,5L', '2025_09_Tira-manchas-15L.jpg'], ['5L', '2025_09_Tira-manchas-5L.png']], F + 'urca/fds-tira-manchas-urca.pdf', { novo: true }),
  P('urca-desinfetante', 'Desinfetante Urca', 'urca', 'toda-a-casa', 'desinfetante', 'Perfuma e desinfeta. O desinfetante mais amado do Brasil, agora com recomendação de médicos infectologistas! ' + DESINF, [['500ml', '2025_09_Desinfetante-500ml.png'], ['2L Cilíndrico', '2025_09_Desinfetante-2L-Cilindrico.jpg'], ['5L', '2025_09_Desinfetante-5L.png']], F + 'urca/fds-desinfetante-urca-versoes.pdf', { destaque: true }),
  P('urca-desinfetante-floral-pink', 'Desinfetante Urca Floral Pink', 'urca', 'toda-a-casa', 'desinfetante', 'Nova fragrância. ' + DESINF, [['500ml', '2025_09_urca-Desinfetante-Floral-Pink-500ml-2026.jpg'], ['2L', '2025_09_urca-Desinfetante-Floral-Pink-2l-2026.jpg']], F + 'urca/fds-desinfetante-urca-versoes.pdf', { novo: true }),
  P('urca-agua-sanitaria', 'Água Sanitária Urca', 'urca', 'toda-a-casa', 'sanitaria', '', [['1L', '2025_09_Agua-Sanitaria-1L.jpg'], ['2L', '2025_09_Agua-Sanitaria-2L.jpg'], ['5L', '2025_09_Agua-Sanitaria-5L.jpg']]),
  P('urca-multiuso', 'Multiuso Urca', 'urca', 'toda-a-casa', 'multiuso', '', [['Com Álcool', '2025_09_Multiuso-Urca-com-Alcool.png'], ['Lavanda', '2025_09_Multiuso-Urca-Lavanda.png'], ['Hortelã', '2025_09_Multiuso-Urca-Hortela.png']], F + 'urca/fds-multiuso-urca-versoes.pdf'),
  P('urca-limpa-vidros', 'Limpa Vidros Urca', 'urca', 'toda-a-casa', 'multiuso', '', [['Limpa Vidros', '2025_09_Limpa-Vidros-Urca.png']], F + 'urca/fds-limpa-vidros-urca.pdf'),
  P('urca-limpador-perfumado', 'Limpador Perfumado Urca', 'urca', 'toda-a-casa', 'multiuso', '', [['500ml', '2025_09_Limpador-Perfumado-500ml.png'], ['1L', '2025_09_Limpador-Perfumado-1L.jpg']]),
  P('urca-pedra-sanitaria', 'Pedra Sanitária Urca', 'urca', 'toda-a-casa', 'pedra', '', [['Lavanda', '2025_11_Pedra-Sanitaria-Lavanda.png'], ['Floral', '2025_11_Pedra-Sanitaria-Floral.png'], ['Jasmin', '2025_11_Pedra-Sanitaria-Jasmin.png']]),
  P('urca-lava-loucas', 'Lava Louças Urca', 'urca', 'cozinha', 'loucas', LOUCAS + ' Versões Limão, Coco, Maçã, Neutro e Clear.', [['500ml', '2025_11_Lava-Loucas.png'], ['5L Clear', '2025_11_Lava-Loucas-5L-Clear.png'], ['5L Neutro', '2025_11_Lava-Loucas-5L-Neutro.png']], F + 'urca/fds-lava-loucas-urca-versoes.pdf'),
  P('urca-sabao-em-pasta', 'Sabão em Pasta Tradicional Urca', 'urca', 'cozinha', 'pasta', '', [['200g', '2025_09_Pasta-Multiuso-Urca-200g.jpg'], ['500g', '2025_09_Pasta-Multiuso-Urca-500g.jpg']], F + 'urca/fds-sabao-em-pasta-urca.pdf'),
  P('urca-saponaceo-cristal', 'Saponáceo em Pasta Cristal', 'urca', 'cozinha', 'pasta', '', [['Cristal', '2025_11_Saponaceo-em-Pasta-Cristal.png']], F + 'urca/fds-pasta-cristal-rosa.pdf', { destaque: true }),
  P('urca-sabao-pasta-rio', 'Sabão em Pasta Rio', 'urca', 'cozinha', 'pasta', '', [['Rio', '2025_11_Saponaceo-em-Pasta-Rio.png']], F + 'urca/fds-sabao-pastoso-rio.pdf'),
  P('urca-coco-lava-roupas', 'Lava Roupas Líquido Urca Coco', 'urca', 'linha-coco', 'lava-roupas', '', [['500ml', '2025_09_Lava-roupas-liquido-Urca-Coco-500ml.jpg'], ['3L', '2025_09_Lava-roupas-liquido-Urca-Coco-3L.jpg']]),
  P('urca-coco-sabao-pedra', 'Sabão em Pedra Urca Coco', 'urca', 'linha-coco', 'barra', '', [['180g', '2025_09_Sabao-em-Pedra-Urca-Coco-180g.png'], ['450g', '2025_09_Sabao-em-Pedra-Urca-Coco-450g.png'], ['900g', '2025_09_Sabao-em-Pedra-Urca-Coco-900g.jpg']], F + 'urca/fds-sabao-em-barra-urca.pdf'),
  P('urca-coco-sabao-pasta', 'Sabão de Coco em Pasta Urca', 'urca', 'linha-coco', 'pasta', '', [['Pasta', '2025_09_Sabao-de-Coco-em-Pasta.png']], F + 'urca/fds-sabao-em-pasta-coco-urca.pdf'),
  P('urca-coco-sabao-po', 'Sabão em Pó Urca Coco', 'urca', 'linha-coco', 'po-coco', '', [['Pó', '2025_09_Sabao-em-Po-Urca-Coco.jpg']]),
  // Baby Soft
  P('baby-soft-lava-roupas-liquido', 'Lava Roupas Líquido Baby Soft', 'baby-soft', 'lavanderia', 'lava-roupas', '', [['1L', '2025_09_Lava-roupas-liquido-1L.jpg'], ['3L', '2025_09_Lava-roupas-liquido-3L.jpg'], ['5L', '2025_09_Lava-roupas-liquido-5L.jpg']]),
  P('baby-soft-lava-roupas-po', 'Lava Roupas em Pó Baby Soft', 'baby-soft', 'lavanderia', 'lava-roupas', 'Nova embalagem.', [['Nova embalagem', '2025_09_Lava-Roupas-concentrado-abr26.jpg'], ['Cartucho 1,6kg', '2025_09_Lava-roupas-em-po-cartucho-16Kg.png'], ['Cartucho 2,2kg', '2025_09_Lava-roupas-em-po-cartucho-22Kg.png'], ['Sachê 800g', '2025_09_Lava-roupas-em-po-sache-800g.png'], ['Sachê 1,6kg', '2025_09_Lava-roupas-em-po-sache-16Kg.png'], ['Sachê 4kg', '2025_09_Lava-roupas-em-po-sache-4Kg.png']], 'https://gtexbrasil.com.br/arquivos/fds/fds-lava-roupas-em-po-baby-soft.pdf'),
  P('baby-soft-amaciante-concentrado', 'Amaciante Concentrado Baby Soft', 'baby-soft', 'lavanderia', 'amaciante', 'Amaciante Concentrado 3L: rende 4x mais! Seu amaciante concentrado favorito agora em uma embalagem econômica de 3 litros. Mais carinho, mais perfume e rendimento que dura por muito mais tempo. ' + CONC, [['500ml', '2025_09_Amaciante-concentrado-500ml.jpg'], ['1,5L', '2025_09_Amaciante-concentrado-15L.jpg'], ['3L', '2025_09_Amaciante-concentrado-3L.jpg']], 'https://gtexbrasil.com.br/arquivos/fds/fds-amaciante-baby-soft-versoes.doc.pdf', { destaque: true, novo: true }),
  P('baby-soft-amaciante-diluido', 'Amaciante Diluído Baby Soft', 'baby-soft', 'lavanderia', 'amaciante', AMAC, [['Refil 1,8L', '2025_09_Amaciante-diluido-refil-18L.jpg'], ['2L', '2025_09_Amaciante-diluido-2L.jpg'], ['5L', '2025_09_Amaciante-diluido-5L.jpg']], 'https://gtexbrasil.com.br/arquivos/fds/fds-amaciante-baby-soft-versoes.doc.pdf'),
  P('baby-soft-sem-passar', 'Sem Passar Baby Soft', 'baby-soft', 'lavanderia', 'passar', '', [['300ml', '2025_09_Sem-passar-300ml.jpg']]),
  // UFE Coco
  P('ufe-lava-roupas-liquido', 'Lava Roupas Líquido UFE Coco', 'ufe', 'linha-coco', 'lava-roupas', 'Feito com coco de verdade.', [['500ml', '2025_09_Lava-Roupas-Liquido-500ml.jpg']], F + 'ufecoco/fds-lava-roupas-liquido-coco-ufe.pdf'),
  P('ufe-sabao-barra', 'Sabão de Coco em Barra UFE', 'ufe', 'linha-coco', 'barra', 'Feito com coco de verdade.', [['Pedra 180g', '2025_09_Sabao-de-Coco-em-Pedra-180g.png'], ['450g', '2025_09_Sabao-de-Coco-em-barra-450g.png'], ['900g', '2025_09_Sabao-de-Coco-em-barra-900g.png']], F + 'ufecoco/fds-sabao-em-barra-coco-ruth-ufe.pdf', { destaque: true }),
  P('ufe-sabao-po', 'Sabão de Coco em Pó UFE', 'ufe', 'linha-coco', 'po-coco', 'Feito com coco de verdade.', [['500g', '2025_09_Sabao-de-Coco-em-Po-500g.png']]),
  P('ufe-sabao-pasta', 'Sabão de Coco em Pasta UFE', 'ufe', 'linha-coco', 'pasta', 'Feito com coco de verdade.', [['500g', '2025_09_Sabao-de-coco-em-pasta-500g.jpg']], F + 'ufecoco/fds-sabao-em-pasta-coco-ufe-ruth.pdf'),
  // Ruth Care
  P('ruth-amaciante', 'Amaciante Ruth Care Baby', 'ruth-care', 'lavanderia', 'amaciante', AMAC, [['Colinho da Vovó 1L', '2025_09_Amaciante-Colinho-da-Vovo-1L.jpg'], ['Doces Sonhos 1L', '2025_09_Amaciante-Doces-Sonhos-1L.jpg']]),
  P('ruth-lava-roupas-xodozinho', 'Lava Roupas Ruth Care Xodozinho', 'ruth-care', 'lavanderia', 'lava-roupas', '', [['1L', '2025_09_Lava-roupas-Xodozinho-1L.jpg']]),
  P('ruth-lava-roupas-coco', 'Lava Roupas Ruth Care Coco', 'ruth-care', 'linha-coco', 'lava-roupas', '', [['500ml e 1L', '2025_09_Lava-roupas-Coco-500ml-e-1L.jpg']], F + 'ruthcare/fds-lava-roupas-coco-ruth-ufe.pdf'),
  P('ruth-sabao-coco-barra', 'Sabão de Coco em Barra Ruth Care', 'ruth-care', 'linha-coco', 'barra', '', [['90g', '2025_09_ruth-care-sabao-coco-90g-2026.jpg'], ['180g', '2025_09_ruth-care-sabao-coco-180g-2026.jpg'], ['450g', '2025_09_ruth-care-sabao-coco-450g-2026.jpg'], ['900g', '2025_09_ruth-care-sabao-coco-900g-2026.jpg']], F + 'ruthcare/fds-sabao-em-barra-coco-ruth-ufe.pdf'),
  P('ruth-sabao-coco-po', 'Sabão de Coco em Pó Ruth Care', 'ruth-care', 'linha-coco', 'po-coco', '', [['500g', '2026_04_ruth-care-sabao-coco-po-2026.jpg']]),
  P('ruth-sabao-coco-pasta', 'Sabão de Coco em Pasta Ruth Care', 'ruth-care', 'linha-coco', 'pasta', '', [['500g', '2026_04_ruth-care-sabao-coco-pasta-2026.jpg']], F + 'ruthcare/fds-sabao-em-pasta-coco-ufe-ruth.pdf'),
  // Classic
  P('classic-agua-sanitaria', 'Água Sanitária Classic', 'classic', 'toda-a-casa', 'sanitaria', '', [['2L', '2025_09_Agua-sanitaria-Classic-2L.png'], ['5L', '2025_09_Agua-sanitaria-Classic-5L.png']], F + 'classic/fds-agua-sanitaria-classic.pdf'),
  P('classic-cloro', 'Cloro Classic', 'classic', 'toda-a-casa', 'sanitaria', '', [['2L', '2025_09_Cloro-Classic-2L.png'], ['5L', '2025_09_Cloro-Classic-5L.png']]),
  P('classic-desinfetante', 'Desinfetante Classic', 'classic', 'toda-a-casa', 'desinfetante', 'Fragrâncias Floral, Lavanda e Capim Limão e Eucalipto.', [['Floral 2L', '2025_09_Desinfetante-Classic-Floral-2L.png'], ['Floral 5L', '2025_09_Desinfetante-Classic-Floral-5L.png'], ['Lavanda 2L', '2025_09_Desinfetante-Classic-Lavanda-2L.png'], ['Lavanda 5L', '2025_09_Desinfetante-Classic-Lavanda-5L.png'], ['Capim Limão e Eucalipto 5L', '2025_09_Desinfetante-Classic-Capim-Limao-e-Eucalipto-5L.png']], F + 'classic/fds-desinfetante-classic-versoes.pdf'),
  P('classic-lava-roupas-liquido', 'Lava Roupas Líquido Classic', 'classic', 'lavanderia', 'lava-roupas', '', [['3L', '2025_09_Lava-roupas-liquido-Classic-3L.png'], ['5L', '2025_09_Lava-roupas-liquido-Classic-5L.png']], F + 'classic/fds-lava-roupas-liquido-classic.pdf'),
  P('classic-lava-roupas-po', 'Lava Roupas em Pó Classic', 'classic', 'lavanderia', 'lava-roupas', '', [['400g', '2025_09_Lava-roupas-em-po-Classic-400g-2026.jpg'], ['1,6kg', '2025_09_Lava-roupas-em-po-Classic-1-6kg.jpg'], ['4kg', '2025_09_Lava-roupas-em-po-Classic-4kg-2026.jpg']]),
  P('classic-tira-manchas', 'Tira Manchas sem Cloro Classic', 'classic', 'lavanderia', 'tira-manchas', '', [['2L', '2025_09_Tira-manchas-sem-cloro-Classic-2L.png']]),
  // Amazon H2O
  P('amazon-stop-mofo', 'Stop Mofo Amazon H2O', 'amazon-h2o', 'toda-a-casa', 'multiuso', '', [['500ml', '2025_09_Stop-Mofo-Amazon-H2O-500ml.jpg']], F + 'amazon/fds-stop-mofo-amazon.pdf'),
  P('amazon-bastao-tira-manchas', 'Bastão Tira Manchas Amazon H2O', 'amazon-h2o', 'lavanderia', 'tira-manchas', '', [['100g', '2025_09_Bastao-Tira-Manchas-100g.jpg']], F + 'amazon/fds-bastao-tira-manchas-amazon.pdf'),
  P('amazon-lava-roupas-po', 'Lava Roupas em Pó Amazon H2O', 'amazon-h2o', 'lavanderia', 'lava-roupas', '', [['1kg', '2025_09_Lava-Roupas-em-Po-1kg.jpg']]),
];

// Promoções do carrossel da home do site atual (março/abril de 2026).
export const destaques = [
  { foto: 'banner-tira-manchas', selo: 'A família urca cresceu', titulo: 'Novo tira-manchas na versão 5L', link: 'produtos/urca-tira-manchas', botao: 'Ver Tira Manchas Urca' },
  { foto: 'banner-desinfetantes', selo: 'Floral, nova fragrância · Brisa 5L, novo tamanho', titulo: 'Perfuma e desinfeta', texto: 'O desinfetante mais amado do Brasil agora com recomendação de médicos infectologistas!', link: 'produtos/urca-desinfetante', botao: 'Ver desinfetantes Urca' },
  { foto: 'bsft-vermelho', selo: 'Baby Soft Concentrado 3L', titulo: 'Rende 4x mais!', texto: 'Seu amaciante concentrado favorito agora em uma embalagem econômica de 3 litros.', link: 'produtos/baby-soft-amaciante-concentrado', botao: 'Ver Baby Soft Concentrado' },
  { foto: 'banner-cristal', selo: 'Urca', titulo: 'Saponáceo em Pasta Cristal', link: 'produtos/urca-saponaceo-cristal', botao: 'Ver Pasta Cristal' },
];

export const numeros = [
  ['+50%', 'dos lares brasileiros', 'cerca de 30 milhões de casas'],
  ['+1.500', 'colaboradores', ''],
  ['4', 'unidades de produção', ''],
  ['5', 'centros de distribuição', ''],
];

export const rankings = [
  ['1º', 'Desinfetantes'], ['1º', 'Sabão em pasta'], ['2º', 'Lava roupas líquido'], ['2º', 'Amaciantes'], ['6º', 'Lava roupas em pó'],
];

export const historia = [
  ['1987', 'José Domingues e Neiva Santos adquirem a Rosatex, fabricante do sabão Urca.'],
  ['2000', 'Expansão com fábricas em Cuiabá (MT) e Paulista (PE).'],
  ['2009', 'Aquisição da marca portuguesa UFE e de uma fábrica em São Luís (MA).'],
  ['2010', 'Venda de 51% das ações para um fundo de investimento inglês.'],
  ['2013', 'A família Santos retoma o controle depois da crise financeira.'],
  ['2014', 'Pedido de recuperação judicial, aprovado.'],
  ['2015', 'Aquisição da Scarlat, fabricante da Baby Soft.'],
  ['2019', 'Talita Santos assume a diretoria executiva e moderniza a governança e a tecnologia.'],
  ['2022', 'Aquisição de mais quatro empresas e consolidação de nove unidades industriais.'],
  ['2023', 'Inauguração do centro de distribuição em Guarulhos (SP).'],
  ['2024', 'Liderança em diversas categorias.'],
];

export const valores = [
  'Determinação e coragem para enfrentar desafios',
  'Humildade e abertura',
  'Questionar e fazer diferente',
  'Pessoas em primeiro lugar',
  'Dinamismo e adaptabilidade',
  'Resultados eficientes',
];

export const faq = [
  ['O produto de vocês é vegano?', 'Priorizamos fornecedores que não utilizam matérias-primas de origem animal, como parte de uma cadeia ética e sustentável.'],
  ['O produto de vocês faz testes em animais?', 'Não. Garantimos que nenhum de nossos produtos passa por testes em animais. Adotamos práticas éticas, sem crueldade, em todo o processo de fabricação.'],
  ['O produto de vocês é hipoalergênico?', 'Sim. O produto é indicado para toda a família e busca uma experiência suave, compatível com diferentes tipos de pele.'],
  ['O produto de vocês pode ser usado em roupas de crianças e bebês?', 'Sim. Os produtos são formulados com cuidado para peças infantis e delicadas, buscando suavidade e segurança.'],
  ['Quanto devo usar do amaciante de vocês?', 'Depende da versão. No concentrado, use uma tampa (20 ml) para até 6 kg de roupa. No diluído, use duas tampas em um ciclo mínimo de máquina com até 10 kg de roupa.'],
  ['Qual é a diferença entre o amaciante diluído e o concentrado?', 'Os dois suavizam da mesma forma, mas o concentrado precisa de bem menos produto. Isso traz mais praticidade, economia e menos embalagem, com menor impacto ambiental.'],
  ['O produto de vocês utiliza plástico reciclável?', 'Sim. As embalagens são de plástico 100% reciclável e têm certificação do selo Eu Reciclo.'],
  ['Por que meu produto está com cheiro ruim?', 'Lamentamos o ocorrido. O odor pode vir de falhas na armazenagem ou na fórmula. Abra uma ocorrência protocolar pelo SAC para investigarmos.'],
  ['Por que meu produto está com separação de fases?', 'A separação pode ter origem na armazenagem ou na formulação. Para análise, abra uma ocorrência protocolar pelo SAC.'],
  ['Como faço para trocar um produto que está com defeito de fabricação?', 'A troca é feita por protocolo, conforme a localidade e a situação. Para iniciar, entre em contato pelo canal de atendimento.'],
  ['Como faço para comprar o produto de vocês?', 'Envie um e-mail com seus dados cadastrais, incluindo endereço, e informe a linha de interesse. Consumidores podem comprar pela loja Casa de GE.'],
  ['Como faço para enviar meu currículo para vocês?', 'Envie por e-mail ou pela página Trabalhe conosco, com o assunto "Currículo + [Nome da Vaga de Interesse]".'],
  ['Posso usar o sabão em barra para tomar banho?', 'Não é recomendado. O sabão em barra foi desenvolvido para lavagem de roupas; siga as indicações do rótulo.'],
  ['Posso dar banho no meu cachorro com o sabão em barra de coco?', 'Não. Para animais de estimação, use produtos específicos.'],
  ['O produto de vocês tem contato com leite em algum processo de produção ou matéria-prima?', 'Não há contato com leite em nenhuma etapa de produção nem nas matérias-primas. O produto é seguro para pessoas alérgicas ao leite.'],
];

// FDS por marca (lista do site atual).
export const fds = [
  ['Baby Soft', [
    ['Amaciante Baby Soft versões', 'https://gtexbrasil.com.br/arquivos/fds/fds-amaciante-baby-soft-versoes.doc.pdf'],
    ['Detergente em pó BS', 'https://gtexbrasil.com.br/arquivos/fds/fds-detergente-em-po-bs.pdf'],
    ['Lava roupas em pó Baby Soft Dayco F13', 'https://gtexbrasil.com.br/arquivos/fds/fds-lava-roupas-em-po-baby-soft-dayco-f13.pdf'],
    ['Lava roupas em pó Baby Soft', 'https://gtexbrasil.com.br/arquivos/fds/fds-lava-roupas-em-po-baby-soft.pdf']]],
  ['Classic', [
    ['Água sanitária Classic', F + 'classic/fds-agua-sanitaria-classic.pdf'],
    ['Amaciante Classic versões', F + 'classic/fds-amaciante-classic-versoes.pdf'],
    ['Desinfetante Classic versões', F + 'classic/fds-desinfetante-classic-versoes.pdf'],
    ['Lava roupas líquido Classic', F + 'classic/fds-lava-roupas-liquido-classic.pdf']]],
  ['Urca', [
    ['Amaciante Urca versões', F + 'urca/fds-amaciante-urca-versoes.pdf.pdf'],
    ['Desengordurante Urca', F + 'urca/fds-desengordurante-urca.pdf'],
    ['Desinfetante Urca versões', F + 'urca/fds-desinfetante-urca-versoes.pdf'],
    ['Lava louças Urca versões', F + 'urca/fds-lava-loucas-urca-versoes.pdf'],
    ['Lava roupas em pó Urca Casa e Roupa', F + 'urca/fds-lava-roupas-em-po-urca-casa-e-roupa.pdf'],
    ['Lava roupas em pó Urca Maxx concentrado', F + 'urca/fds-lava-roupas-em-po-urca-maxx.pdf'],
    ['Lava roupas em pó Urca Maxx', F + 'urca/fds-lava-roupas-em-po-urca-maxx-concentrado.pdf'],
    ['Lava roupas líquido Urca versões', F + 'urca/fds-lava-roupas-liquido-urca-versoes.pdf'],
    ['Limpa vidros Urca', F + 'urca/fds-limpa-vidros-urca.pdf'],
    ['Multilimpador Urca com álcool', F + 'urca/fds-multilimpador-urca-com-alcool.pdf'],
    ['Multilimpador Urca versões', F + 'urca/fds-multilimpador-urca-versoes.pdf'],
    ['Multiuso Urca versões', F + 'urca/fds-multiuso-urca-versoes.pdf'],
    ['Pasta Cristal rosa', F + 'urca/fds-pasta-cristal-rosa.pdf'],
    ['Sabão em barra Urca', F + 'urca/fds-sabao-em-barra-urca.pdf'],
    ['Sabão em pasta coco Urca', F + 'urca/fds-sabao-em-pasta-coco-urca.pdf'],
    ['Sabão em pasta Urca', F + 'urca/fds-sabao-em-pasta-urca.pdf'],
    ['Sabão pastoso Rio', F + 'urca/fds-sabao-pastoso-rio.pdf'],
    ['Tira manchas Urca', F + 'urca/fds-tira-manchas-urca.pdf'],
    ['FISPQ 001 sabão pasta Urca rev. 002', F + 'urca/fispq-001-sabao-pasta-urca-rev-002.pdf'],
    ['FISPQ 001 sabão pastoso Rio rev. 002', F + 'urca/fispq-001-sabao-pastoso-rio-rev-002.pdf'],
    ['FISPQ lava louças Urca versões', F + 'urca/fispq-lava-loucas-urca-versoes.pdf']]],
  ['UFE Coco', [
    ['Desinfetante Ufenol', F + 'ufecoco/fds-desinfetante-ufenol.pdf'],
    ['Lava roupas coco Ruth/UFE', F + 'ufecoco/fds-lava-roupas-coco-ruth-ufe.pdf'],
    ['Lava roupas líquido coco UFE', F + 'ufecoco/fds-lava-roupas-liquido-coco-ufe.pdf'],
    ['Sabão em barra coco Ruth/UFE', F + 'ufecoco/fds-sabao-em-barra-coco-ruth-ufe.pdf'],
    ['Sabão em pasta coco UFE/Ruth', F + 'ufecoco/fds-sabao-em-pasta-coco-ufe-ruth.pdf']]],
  ['Ruth Care', [
    ['Lava roupas coco Ruth/UFE', F + 'ruthcare/fds-lava-roupas-coco-ruth-ufe.pdf'],
    ['Sabão em barra coco Ruth/UFE', F + 'ruthcare/fds-sabao-em-barra-coco-ruth-ufe.pdf'],
    ['Sabão em pasta coco UFE/Ruth', F + 'ruthcare/fds-sabao-em-pasta-coco-ufe-ruth.pdf']]],
  ['Amazon H2O', [
    ['Bastão tira manchas Amazon', F + 'amazon/fds-bastao-tira-manchas-amazon.pdf'],
    ['Stop Mofo Amazon', F + 'amazon/fds-stop-mofo-amazon.pdf']]],
];

// Página Download: embalagens e logos oficiais (arquivos .zip do site atual).
const D = 'https://gtexbrasil.com.br/arquivos/';
export const downloads = [
  ['baby-soft', 'babysoft/', [['Logo oficial', 'logo-babysoft'], ['Amaciante diluído', 'amaciante-diluido'], ['Amaciante concentrado', 'amaciante-concentrado'], ['Lava roupas', 'lava-roupas'], ['Linha care', 'linha-care'], ['Linha delicadas', 'linha-delicadas'], ['Sem passar', 'sem-passar']]],
  ['classic', 'classic/', [['Logo oficial', 'logomarca-classic'], ['Água sanitária', 'agua-sanitaria'], ['Lava roupas', 'lava-roupas'], ['Super cloro', 'super-cloro'], ['Desinfetante', 'desinfetante'], ['Tira manchas', 'tira-manchas']]],
  ['urca', 'urca/', [['Logo oficial', 'logo-urca'], ['Água sanitária', 'agua-sanitaria'], ['Amaciante concentrado', 'amaciante-concentrado'], ['Amaciante diluído', 'amaciante-diluido'], ['Desengordurante', 'desengordurante'], ['Desinfetante', 'desinfetante'], ['Lava louças', 'lava-loucas'], ['Limpa vidros', 'limpa-vidros'], ['Limpador perfumado', 'limpador-perfumado'], ['Linha coco', 'linha-coco'], ['Multiuso', 'multiuso'], ['Pasta multiuso Cristal rosa', 'pasta-multiuso-cristal-rosa'], ['Pasta multiuso Cristal rosa 500g', 'pasta-multiuso-cristal-rosa-urca-500g'], ['Pedra sanitária', 'pedra-sanitaria'], ['Sabão barra glicerinado', 'sabao-barra-glicerinado'], ['Sabão em pasta Dipol', 'sabao-em-pasta-dipol'], ['Sabão em pasta Rio', 'sabao-em-pasta-rio'], ['Sabão em pasta Urca', 'sabao-em-pasta-urca'], ['Tira manchas', 'tira-manchas']]],
  ['ufe', 'ufe-coco/', [['Logo da marca', 'logomarca-ufe-coco'], ['Lava roupas líquido', 'lava-roupas-liquido'], ['Lava roupas líquido íntimo', 'lava-roupas-liquido-intimo'], ['Sabão em barra', 'sabao-em-barra'], ['Sabão em pasta', 'sabao-em-pasta'], ['Sabão em pó', 'sabao-em-po']]],
  ['ruth-care', 'ruth-care/', [['Baby (embalagens e logo)', 'baby'], ['Linha coco (embalagens e logo)', 'linha-coco']]],
  ['amazon-h2o', 'amazon/', [['Logo da marca', 'logo'], ['Gel limpa forno', 'gel-limpa-forno'], ['Lava roupa', 'lava-roupa'], ['Limpa tela', 'limpa-tela'], ['Limpa vidro', 'limpa-vidro'], ['Multiuso', 'multiuso'], ['Stop Mofo', 'stopmofo'], ['Tira manchas', 'tira-manchas']]],
].map(([marca, pasta, itens]) => ({ marca, itens: itens.map(([n, f]) => [n, D + pasta + f + '.zip']) }));

export const UP = 'https://www.gtexbrasil.com.br/wp-content/uploads/';
export const marca = id => marcas.find(m => m.id === id);
export const categoria = id => categorias.find(c => c.id === id);
export const tipoNome = id => (tipos.find(t => t[0] === id) || [, id])[1];
