// Textos e dados da Disk Embalagens. Tudo que está entre aspas veio do site atual (diskembalagem.com.br),
// menos o que está marcado "nosso" (títulos de seção, passos do pedido, chamadas curtas).
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const dados = JSON.parse(fs.readFileSync(path.join(aqui, 'dados.json'), 'utf8'));

export const empresa = {
  nome: 'Disk Embalagens',
  razao: 'Del Distribuidora Comercial de Embalagens Ltda.',
  url: 'https://diskembalagem.overtus.com.br/',
  antigo: 'http://www.diskembalagem.com.br/',
  fones: [{ txt: '54 3223.3000', href: '+555432233000' }, { txt: '54 3028.3004', href: '+555430283004' }],
  // Não há e-mail nem WhatsApp no site atual: quando a Disk passar, preencher e o formulário e a lista enviam direto.
  email: '',
  whatsapp: '',
  rua: 'R. Irmã Zago, 1197',
  bairro: 'Sagrada Família',
  cidade: 'Caxias do Sul - RS',
  cep: '95054-170',
  desde: 'dezembro de 1998',
  anoDesde: 1998,
};
empresa.enderecoLinha = `${empresa.rua} - ${empresa.bairro}, ${empresa.cidade}, ${empresa.cep}`;

// Institucional (página "Institucional" do site atual, texto original)
export const institucional = [
  { t: 'História', p: 'Del Distribuidora Comercial de Embalagens - Disk Embalagens - iniciou suas atividades em dezembro de 1998.' },
  { t: 'Missão', p: 'Oferecer ao mercado soluções em: Embalagens, descartáveis, produtos químicos, equipamentos e sistemas de higiene e limpeza entre outros, atendendo as necessidades dos mais diversos segmentos.' },
  { t: 'Valores', p: 'Ética e Honestidade norteiam nossos Princípios.' },
  { t: 'Mercado', p: 'Constante desenvolvimento de novos fornecedores e produtos, trazendo com isso ganhos de competividades e rentabilidade para ambas: fornecedor e cliente.' },
];
export const rodapeInstitucional = 'Produtos com Registro na ANVISA e Serviços de Qualidade, garantem Satisfação e Economia.';
export const variedade = ['Embalagens', 'Descartáveis', 'Higiene', 'Limpeza', 'Materiais p/Escritório', 'Sistemas Para Higiene e Limpeza', 'Equipamentos, Acessórios', 'Lixeiras e Coletores'];
export const rapidez = 'Rapidez e agilidade para atender seu pedido';
export const orcamento = 'Faça seu Orçamento Conosco!';

// Os três banners do site atual (texto original, botão com o destino original)
export const banners = [
  { img: 'banner1', titulo: 'Produtos de limpeza', texto: 'Oferecemos uma grande e diversificada linha de produtos de limpeza para manter sua empresa sempre limpa e perfumada.', botao: 'Conheça nossos produtos para limpeza', cat: 'limpeza', cor: ['#0aa3ea', '#0b83d6'] },
  { img: 'banner2', titulo: 'Equipamentos para Banheiros e Afins', texto: 'Comercializamos os melhores equipamentos sanitários para você oferecer o máximo em conforto e higiene aos seus clientes', botao: 'Conheça nossos equipamentos sanitários', cat: 'higiene', cor: ['#0a5aa6', '#03336f'] },
  { img: 'banner3', titulo: 'Material de escritório', texto: 'Ligue e receba em sua empresa produtos para escritório das melhores marcas com preços competitivos e atendimento Personalizado.', botao: 'Conheça nossos materiais de escritório', cat: 'escritorio', cor: ['#049977', '#02684f'] },
];

// Categorias: nomes do menu do site atual; slug novo (curto, sem os acentos quebrados do endereço antigo)
const CATS = [
  ['copa-e-cozinha', 'copa-e-cozinha', 'Copa e Cozinha', 'Garrafa Térmica Pressione Inox 1,9 Litros'],
  ['descarta-veis', 'descartaveis', 'Descartáveis', 'Copo Plást. Cristal Supremo 300ml'],
  ['embalagens', 'embalagens', 'Embalagens', 'Bobina Kraft'],
  ['embalagens-p-alimentaa-a-o', 'embalagens-para-alimentacao', 'Embalagens p/ Alimentação', 'Marmitex de Alumínio Nº 8 e Nº 9'],
  ['equipamentos', 'equipamentos', 'Equipamentos', 'Balde Espremedor 30 litros 2 Águas Bralimpia'],
  ['materiais-de-higiene', 'higiene', 'Materiais de Higiene', 'Papel Higiênico BR 60M FD c/ 12 rolos Paloma'],
  ['material-de-limpeza', 'limpeza', 'Material de Limpeza', 'Rodo Sekito'],
  ['material-para-escrita-rio', 'escritorio', 'Material para Escritório', 'Caneta Bic'],
];

const slugify = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// nome do produto: só tira espaços duplos e põe a primeira letra maiúscula (o resto fica como a Disk escreveu)
const limpaNome = s => { const t = s.replace(/\s+/g, ' ').replace(/\s+-\s*/g, ' - ').trim(); return t.charAt(0).toUpperCase() + t.slice(1); };
const limpaSub = s => s.replace(/\s*\/\s*/g, ' / ').replace(/\s+/g, ' ').trim().replace(/^(.)/, c => c.toUpperCase());

const subNome = Object.fromEntries(dados.subs.map(([c, s, n]) => [`${c}/${s}`, n]));
export const categorias = CATS.map(([velho, slug, nome, destaque]) => {
  const subs = dados.subs.filter(([c]) => c === velho).map(([c, s, n]) => ({ velho: s, slug: slugify(n), nome: limpaSub(n) }));
  return { velho, slug, nome, destaque, subs };
});
const catPorVelho = Object.fromEntries(categorias.map(c => [c.velho, c]));

const vistos = new Set();
export const produtos = [];
for (const p of dados.prods) {
  const [cv, sv] = p.cats[0];
  const cat = catPorVelho[cv];
  const sub = cat.subs.find(s => s.velho === sv);
  const nome = limpaNome(p.nome);
  const chave = `${cat.slug}|${nome.toLowerCase()}`;
  if (vistos.has(chave)) continue;
  vistos.add(chave);
  produtos.push({ id: produtos.length + 1, nome, cat: cat.slug, sub: sub.slug, desc: (p.desc || '').trim(), sp: p.sp || null, velho: p.slug });
}
for (const c of categorias) {
  c.n = produtos.filter(p => p.cat === c.slug).length;
  for (const s of c.subs) s.n = produtos.filter(p => p.cat === c.slug && p.sub === s.slug).length;
  c.subs = c.subs.filter(s => s.n);
  c.foto = produtos.find(p => p.nome === limpaNome(c.destaque));
}

// "Produtos em Destaque" da home atual (mesma ordem; Gel Adesivo e Saboneteira Spray não estão em nenhuma categoria, entra a saboneteira de espuma)
const DESTAQUES = ['Coletor de Pilhas e Baterias 25L Inox 027X50CM', 'Gel Adesivo c/ 6 Aplicações e Aplicador', 'Rodo Sekito', 'Dispensador de Sacos Sanitarios Pet', 'Lixeira Inox Redonda', 'Saboneteira Spray', 'Totem Metálico Álcool Gel', 'Purif. Difusor 350ml c/ Palitos', 'Balde Espremedor 30 litros 2 Águas Bralimpia', 'Saboneteira Espuma Clean Premisse'];
export const destaques = DESTAQUES.map(n => produtos.find(p => p.nome === n)).filter(Boolean).slice(0, 8);

// Termos de busca rápida (versão B): só entram os que acham produto no catálogo
export const atalhos = ['Papel higiênico', 'Papel toalha', 'Sacos de lixo', 'Copo', 'Luva', 'Álcool', 'Lixeira', 'Fita', 'Mop']
  .filter(t => produtos.some(p => slugify(p.nome).includes(slugify(t))));

// Compra por ambiente (versão B, nosso): cada ambiente aponta para categorias e subcategorias reais
export const ambientes = [
  { nome: 'Copa e cafezinho', texto: 'Café, açúcar, chás, copos, mexedores e garrafas térmicas.', fotos: ['Café Melitta Tradicional Vacúo', 'Garrafa Térmica Magic Pump', 'Copos Plásticos de 150ml c/100 un.'], link: 'copa-e-cozinha' },
  { nome: 'Banheiros', texto: 'Papel higiênico, papel toalha, sabonetes, dispensers e lixeiras.', fotos: ['Papel Higiênico BR 60M FD c/ 12 rolos Paloma', 'Lixeira Inox Redonda', 'Disp. p/ Protetor de Assento Sanitário'], link: 'higiene' },
  { nome: 'Limpeza pesada', texto: 'Químicos, mops, baldes espremedores, rodos e vassouras.', fotos: ['Balde Espremedor 30 litros 2 Águas Bralimpia', 'Rodo Sekito', 'Alvejante 5 Litros'], link: 'limpeza' },
  { nome: 'Restaurantes e delivery', texto: 'Marmitex, potes, pratos, caixas de pizza, filme PVC e luvas.', fotos: ['Marmitex de Alumínio Nº 8 e Nº 9', 'Pote Retangular 500ml Prafesta c/24un.', 'Emb.Pap. Pizza (Caixa Pizza)'], link: 'embalagens-para-alimentacao' },
  { nome: 'Expedição', texto: 'Fitas, bobinas de plástico bolha, kraft, filme stretch e sacolas.', fotos: ['Fita Adesiva 48x50 Metros', 'Bobina Plástico Bolha Light', 'Filme Strech'], link: 'embalagens' },
  { nome: 'Escritório', texto: 'Canetas, pastas, bobinas, quadros brancos e organizadores de mesa.', fotos: ['Caneta Bic', 'Pasta A-Z Lombo Largo', 'Quadro Branco Moldura de Alumínio'], link: 'escritorio' },
].map(a => ({ ...a, fotos: a.fotos.map(n => produtos.find(p => p.nome === limpaNome(n))).filter(Boolean) }));

// Como pedir (nosso): o site vira o balcão da Disk
export const passos = [
  { t: 'Encontre', p: 'Busque pelo nome ou navegue pelas categorias: são mais de 600 itens com foto.' },
  { t: 'Monte sua lista', p: 'Adicione os produtos e as quantidades. A lista fica salva neste aparelho.' },
  { t: 'Envie ou ligue', p: 'Mande a lista para a Disk ou ligue com ela na mão: o atendente já sabe o que você quer.' },
  { t: 'Receba na empresa', p: 'Ligue e receba em sua empresa, com rapidez e agilidade.' },
];

export const totalProdutos = produtos.length;
export { slugify };
