// Monta as páginas das versões A ("Balcão") e B ("Pedido rápido") do SOS Atacadista.
import { empresa as E, setores, quemSomos, lema, entregaTexto, retiradaTexto, regioes, faq, avisos, encarte, marcas, segmentos, destaques, creditos, produtos, departamentos } from './conteudo.mjs';

export const nomesVersao = { a: 'Balcão', b: 'Pedido rápido' };

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const sem = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const porRef = Object.fromEntries(produtos.map(p => [p.ref, p]));
const depNome = Object.fromEntries(departamentos.map(d => [d.id, d.nome]));
const subNome = Object.fromEntries(departamentos.flatMap(d => d.subs.map(s => [s.id, s.nome])));
const contaDep = id => produtos.filter(p => p.dep === id).length;
const waLink = (txt, num = E.whatsNum) => `https://wa.me/${num}?text=${encodeURIComponent(txt)}`;

// ---------- ícones (traço, 24px) ----------
const IC = {
  busca: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  tel: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  whats: '<path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-1 .8a4 4 0 0 1-2.1-2.1l.8-1-1-2z"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
  sacola: '<path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fechar: '<path d="M6 6l12 12M18 6 6 18"/>',
  caminhao: '<path d="M2 6h12v10H2zM14 10h4l3 3v3h-7"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  loja: '<path d="M4 10v10h16V10M3 10l2-6h14l2 6zM9 20v-5h6v5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pino: '<path d="M12 21s-7-6.3-7-12a7 7 0 0 1 14 0c0 5.7-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  cadastro: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
  cartao: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h3"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  esq: '<path d="m15 6-6 6 6 6"/>',
  dir: '<path d="m9 6 6 6-6 6"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  menos: '<path d="M5 12h14"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  lixo: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  pizza: '<path d="M12 3 3 19c6 3 12 3 18 0z"/><circle cx="11" cy="13" r="1.2"/><circle cx="14" cy="16" r="1"/><circle cx="12" cy="9" r=".8"/>',
  pao: '<path d="M4 13c0-4 3.6-7 8-7s8 3 8 7v5H4z"/><path d="M9 9l-1 4M13 8.5 12.5 13M17 10l-1.5 3"/>',
  pastel: '<path d="M3 15a9 9 0 0 1 18 0z"/><path d="M3 15c2 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0"/>',
  copo: '<path d="M6 4h12l-1.5 16h-9z"/><path d="M7 9h10"/>',
  carrinho: '<path d="M3 4h2l2.4 11h11l2-8H6.2"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
  hotel: '<path d="M4 20V5h16v15M9 20v-4h6v4M8 8h2M14 8h2M8 12h2M14 12h2"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]}</svg>`;
const icSeg = { pizzaria: 'pizza', padaria: 'pao', pastelaria: 'pastel', 'lanchonete-e-bar': 'copo', mercado: 'carrinho', 'hotel-e-restaurante': 'hotel' };

// ---------- moldura ----------
function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${E.nomeLongo}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#0E4A22' : '#FFD200'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const navA = [
  { slug: 'index', caminho: '', nome: 'Início' },
  { slug: 'produtos', caminho: 'produtos/', nome: 'Produtos' },
  { slug: 'ofertas', caminho: 'ofertas/', nome: 'Ofertas da semana' },
  { slug: 'entrega', caminho: 'entrega-e-retirada/', nome: 'Entrega e retirada' },
  { slug: 'quem-somos', caminho: 'quem-somos/', nome: 'Quem somos' },
  { slug: 'duvidas', caminho: 'duvidas/', nome: 'Dúvidas' },
  { slug: 'contato', caminho: 'contato/', nome: 'Fale conosco' },
];
const navB = [
  { slug: 'index', caminho: '', nome: 'Início' },
  { slug: 'pedido', caminho: 'pedido/', nome: 'Fazer pedido' },
  { slug: 'segmentos', caminho: 'segmentos/pizzaria/', nome: 'Por negócio' },
  { slug: 'ofertas', caminho: 'ofertas/', nome: 'Encarte' },
  { slug: 'entrega', caminho: 'entrega-e-retirada/', nome: 'Entrega e retirada' },
  { slug: 'quem-somos', caminho: 'quem-somos/', nome: 'Quem somos' },
  { slug: 'contato', caminho: 'contato/', nome: 'Contato' },
];
const link = (v, n, atual) => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`;
const logo = (w = 240) => `<img src="/assets/logo.webp" alt="SOS Atacadista" width="${w}" height="${Math.round(w * 590 / 1114)}">`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnPedido = v => `<a class="btn-pedido" href="/${v}/pedido/">${ic('sacola')}<span>Meu pedido</span><b data-conta-pedido>0</b></a>`;

function topo(v, atual) {
  if (v === 'a') return `<div class="faixa-topo"><div class="in">
  <span>${ic('relogio')} Tele-atendimento: ${E.horarioCurto}</span>
  <span class="ft-dir"><a href="${waLink('Olá! Vim pelo site da SOS e quero fazer um pedido.')}">${ic('whats')} Vendas ${E.whats}</a><a href="https://instagram.com/${E.instagram}">${ic('insta')} @${E.instagram}</a></span>
</div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="SOS Atacadista, início">${logo(210)}</a>
  <form class="busca" action="/a/produtos/" role="search"><label class="sr" for="q-topo">Pesquisar produtos</label><input id="q-topo" name="q" type="search" placeholder="Pesquisar: mussarela, farinha, caixa de pizza…" autocomplete="off"><button type="submit" aria-label="Pesquisar">${ic('busca')}</button></form>
  <div class="atend"><small>Atendimento</small><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a href="${waLink('Olá! Vim pelo site da SOS.')}">${ic('whats')} ${E.whats}</a></div>
  ${btnPedido(v)}
  ${menuBtn}
</div>
<nav id="menu" class="menu" aria-label="Principal"><div class="in">${navA.map(n => link(v, n, atual)).join('')}</div></nav>
</header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="SOS Atacadista, início">${logo(150)}</a>
  <nav id="menu" class="menu" aria-label="Principal">${navB.map(n => link(v, n, atual)).join('')}</nav>
  <a class="topo-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
  ${btnPedido(v)}
  ${menuBtn}
</div></header>`;
}

function rodape(v) {
  const nav = v === 'a' ? navA : navB;
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(200)}<p>Fornecimento para pizzarias, padarias, pastelarias, mercados, hotéis e ramos alimentícios desde ${E.fundacao}.</p></div>
  <div><h3>Pedidos</h3><p><a class="rod-tel" href="tel:${E.foneHref}">${E.fone}</a><br><a href="${waLink('Olá! Vim pelo site da SOS.')}">WhatsApp ${E.whats}</a><br>${E.horario}</p></div>
  <div><h3>Loja e retirada</h3><p>${E.endereco}<br>${E.bairro}<br>CEP ${E.cep}<br><a href="${E.mapa}">Ver no mapa</a></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${nav.map(n => link(v, n, '')).join('')}<a href="/${v}/trabalhe-conosco/">Trabalhe conosco</a></nav>
</div>
<div class="rod-avisos"><div class="in"><p class="rod-pag"><b>Formas de pagamento</b>Visa, Mastercard, Diners, American Express, Visa Electron e boleto, liberadas com o cadastro aprovado. Na retirada do encarte: dinheiro ou Pix.</p><ul>${avisos.map(a => `<li>${a}</li>`).join('')}</ul></div></div>
<p class="rod-fim">© ${E.razao} · ${E.endereco}, ${E.bairro} · <a href="https://instagram.com/${E.instagram}">@${E.instagram}</a></p><p class="rod-cred">${creditos}</p></footer>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo) => `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${sl}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, sl)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
<a class="whats-flutua" href="${waLink('Olá! Vim pelo site da SOS e quero fazer um pedido.')}" aria-label="Falar com vendas pelo WhatsApp">${ic('whats')}</a>
</body>
</html>
`;

// ---------- blocos comuns ----------
const foto = (p, w = 260, cls = '') => p.img
  ? `<img${cls ? ` class="${cls}"` : ''} src="/assets/prod/${p.img[0]}" alt="${esc(p.nome)}" width="${p.img[1]}" height="${p.img[2]}" loading="lazy">`
  : `<span class="sem-foto${cls ? ` ${cls}` : ''}" aria-hidden="true">${ic('sacola')}<small>Foto em breve</small></span>`;
const texto = p => esc(sem(`${p.nome} ${p.desc} ${subNome[p.sub]} ${depNome[p.dep]} ${p.ref}`));
const qtd = p => `<div class="qtd" data-qtd="${p.ref}"><button type="button" data-qtd-menos aria-label="Diminuir ${esc(p.nome)}">${ic('menos')}</button><input type="number" min="0" inputmode="numeric" value="0" aria-label="Quantidade de ${esc(p.nome)}"><button type="button" data-qtd-mais aria-label="Aumentar ${esc(p.nome)}">${ic('mais')}</button></div>`;
const btnAdd = p => `<button class="add" type="button" data-add="${p.ref}">${ic('mais')}<span>Adicionar</span></button>`;

// A: produto na prateleira
const tile = p => `<li class="tile" data-item data-dep="${p.dep}" data-sub="${p.sub}" data-texto="${texto(p)}">
  <div class="tile-foto">${foto(p)}</div>
  <p class="tile-sub">${subNome[p.sub]}</p>
  <h3>${esc(p.nome)}</h3>
  <p class="tile-meta">Ref. ${p.ref}${p.venda ? ` · venda por ${p.venda}` : ''}</p>
  ${btnAdd(p)}
</li>`;

// B: linha da tabela de pedido
const linha = p => `<tr data-item data-dep="${p.dep}" data-sub="${p.sub}" data-texto="${texto(p)}">
  <td class="ln-foto">${foto(p, 64)}</td>
  <th scope="row"><span class="ln-nome">${esc(p.nome)}</span><span class="ln-sub">${subNome[p.sub]} · Ref. ${p.ref}</span></th>
  <td class="ln-venda">${p.venda || '—'}</td>
  <td class="ln-qtd">${qtd(p)}</td>
</tr>`;
const tabela = lista => `<div class="tab-wrap"><table class="tab-pedido"><thead><tr><th scope="col"><span class="sr">Foto</span></th><th scope="col">Produto</th><th scope="col">Venda por</th><th scope="col">Quantidade</th></tr></thead><tbody>${lista.map(linha).join('')}</tbody></table><p class="vazio" data-vazio hidden>Nenhum produto com esse nome. Fale com a atendente: o estoque muda toda semana.</p></div>`;

const busca = (id, ph) => `<div class="filtro-busca"><label class="sr" for="${id}">Pesquisar no catálogo</label>${ic('busca')}<input id="${id}" type="search" data-busca placeholder="${ph}" autocomplete="off"></div>`;
const chipsDep = (todos = 'Todos') => `<div class="chips" role="group" aria-label="Departamentos"><button type="button" data-dep-filtro="" aria-pressed="true">${todos}</button>${departamentos.map(d => `<button type="button" data-dep-filtro="${d.id}" aria-pressed="false">${d.nome}</button>`).join('')}</div>`;

const oferta = (o, v) => {
  const p = porRef[o.ref];
  const [r, c] = o.preco.split(',');
  return `<li class="of">
  <div class="of-foto">${foto(p)}</div>
  <h3>${esc(o.nome)}</h3>
  <p class="of-preco" aria-label="R$ ${o.preco} por ${o.por}"><small>R$</small><b>${r}</b><sup>,${c}</sup><em>${o.por}</em></p>
  ${v === 'a' ? btnAdd(p) : `<button class="add" type="button" data-add="${p.ref}">${ic('mais')}<span>Pôr no pedido</span></button>`}
</li>`;
};

const slider = (cls = '') => {
  const slides = [...encarte.paginas, '8662', '8659'];
  const n = encarte.paginas.length;
  const alt = i => i === n ? 'Fornecimento para pizzarias, padarias, pastelarias, mercados, hotéis e ramos alimentícios. Telefone para pedidos (11) 2746-1111, WhatsApp (11) 94745-8219.'
    : i === n + 1 ? 'Contatos por WhatsApp: Administração, Compras, Expedição, Financeiro e Vendas.'
      : `Encarte ${encarte.validade}: ${encarte.titulos[i]}. ${encarte.pagamento}`;
  return `<div class="slider ${cls}" data-slider aria-roledescription="carrossel" aria-label="Encarte e avisos">
  <div class="sl-trilho">${slides.map((s, i) => `<figure class="sl-item" aria-roledescription="slide" aria-label="${i + 1} de ${slides.length}"><img src="/assets/encarte/${s}.webp" alt="${esc(alt(i))}" width="1000" height="318"${i > 0 ? ' loading="lazy"' : ''}></figure>`).join('')}</div>
  <button class="sl-seta sl-ant" type="button" data-sl="-1" aria-label="Anterior">${ic('esq')}</button>
  <button class="sl-seta sl-prox" type="button" data-sl="1" aria-label="Próximo">${ic('dir')}</button>
  <div class="sl-pontos">${slides.map((_, i) => `<button type="button" data-sl-ir="${i}" aria-label="Ir para ${i + 1}"${i === 0 ? ' aria-current="true"' : ''}>${i + 1}</button>`).join('')}</div>
</div>`;
};

const faixaMarcas = () => `<div class="marcas" aria-label="Marcas parceiras"><div class="marcas-trilho">${[...marcas, ...marcas].map(([id, n], i) => `<img src="/assets/marcas/${id}.webp" alt="${i < marcas.length ? esc(n) : ''}" width="150" height="100" loading="lazy">`).join('')}</div></div>`;

const listaSetores = () => `<ul class="setores">${setores.map(([s, f, n]) => `<li><span>${s}</span><a href="${waLink(`Olá! Vim pelo site da SOS e quero falar com ${s}.`, n)}">${ic('whats')} ${f}</a></li>`).join('')}</ul>`;

const faqLista = () => `<div class="faq">${faq.map(([q, r], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}</summary><p>${r}</p></details>`).join('')}</div>`;

const formContato = () => `<form class="form" data-form>
  <div class="campo"><label for="f-nome">Nome *</label><input id="f-nome" name="nome" required autocomplete="name"></div>
  <div class="campo"><label for="f-email">E-mail *</label><input id="f-email" name="email" type="email" required autocomplete="email"></div>
  <div class="campo"><label for="f-tel">Telefone *</label><input id="f-tel" name="tel" type="tel" required autocomplete="tel"></div>
  <div class="campo"><label for="f-assunto">Assunto *</label><select id="f-assunto" name="assunto" required><option>Quero ser cliente</option><option>Pedido</option><option>Entrega</option><option>Financeiro</option><option>Produto não encontrado</option><option>Outro</option></select></div>
  <div class="campo campo-todo"><label for="f-msg">Mensagem *</label><textarea id="f-msg" name="msg" rows="5" required></textarea></div>
  <button class="btn" type="submit">Enviar mensagem</button>
  <p class="form-ok" hidden>Esta é uma prévia: a mensagem não foi enviada. No site no ar ela chega ao e-mail da SOS.</p>
</form>`;

const formTrabalhe = () => `<form class="form" data-form>
  <div class="campo"><label for="t-nome">Nome *</label><input id="t-nome" name="nome" required autocomplete="name"></div>
  <div class="campo"><label for="t-email">E-mail *</label><input id="t-email" name="email" type="email" required autocomplete="email"></div>
  <div class="campo"><label for="t-tel">Telefone *</label><input id="t-tel" name="tel" type="tel" required autocomplete="tel"></div>
  <div class="campo"><label for="t-area">Área de interesse</label><select id="t-area" name="area"><option>Vendas e tele-atendimento</option><option>Expedição e estoque</option><option>Entrega (motorista e ajudante)</option><option>Administrativo e financeiro</option></select></div>
  <div class="campo campo-todo"><label for="t-cv">Currículo *</label><input id="t-cv" name="cv" type="file" accept=".pdf,.doc,.docx" required></div>
  <div class="campo campo-todo"><label for="t-obs">Observações</label><textarea id="t-obs" name="obs" rows="4"></textarea></div>
  <button class="btn" type="submit">Enviar currículo</button>
  <p class="form-ok" hidden>Esta é uma prévia: o currículo não foi enviado.</p>
</form>`;

// Lista de pedido montada no navegador e enviada pelo WhatsApp de vendas.
const painelPedido = (v, titulo = 'Seu pedido') => `<div class="pedido" data-pedido>
  <h2>${titulo} <b data-conta-pedido>0</b></h2>
  <ul class="ped-lista" data-lista-pedido><li class="ped-vazio">Nenhum produto ainda. ${v === 'a' ? 'Use o botão “Adicionar” nos produtos.' : 'Escolha a quantidade na tabela.'}</li></ul>
  <form class="ped-form" data-enviar-pedido>
    <div class="campo"><label for="p-est-${v}">Estabelecimento</label><input id="p-est-${v}" name="est" placeholder="Ex.: Pizzaria do Bairro" autocomplete="organization"></div>
    <div class="campo"><label for="p-nome-${v}">Seu nome</label><input id="p-nome-${v}" name="nome" autocomplete="name"></div>
    <div class="campo"><label for="p-bairro-${v}">Bairro ou cidade</label><input id="p-bairro-${v}" name="bairro" placeholder="Ex.: Itaquera, Guarulhos" autocomplete="address-level2"></div>
    <fieldset class="campo ped-modo"><legend>Como prefere receber</legend><label><input type="radio" name="modo" value="Entrega" checked> Entrega</label><label><input type="radio" name="modo" value="Retirada na loja"> Retirada na loja</label></fieldset>
    <div class="campo"><label for="p-obs-${v}">Observação</label><textarea id="p-obs-${v}" name="obs" rows="2"></textarea></div>
    <button class="btn btn-whats" type="submit">${ic('whats')} Enviar pedido pelo WhatsApp</button>
    <p class="ped-nota">O pedido vai para o WhatsApp de vendas ${E.whats}. A atendente confirma preço, estoque e entrega. Primeira compra? O cadastro leva 24 horas.</p>
    <button class="ped-limpar" type="button" data-limpar-pedido>${ic('lixo')} Limpar lista</button>
  </form>
</div>`;

const passos = [
  ['cadastro', 'Cadastro', 'Simples e liberado em 24 horas. Só na primeira compra.'],
  ['lista', 'Pedido', 'Pelo tele-atendimento, pelo WhatsApp ou com um representante.'],
  ['caminhao', 'Entrega ou retirada', 'Entrega em 24 horas, sem custo acima de R$ 500. Retirada com preço de encarte.'],
  ['cartao', 'Pagamento', 'Formas liberadas com o cadastro aprovado. Na retirada: dinheiro ou Pix.'],
];

// ===================== VERSÃO A · Balcão =====================
function sideDeps(atual = '') {
  return `<aside class="deps" aria-label="Departamentos"><h2 class="deps-tit">Departamentos</h2><ul>${departamentos.map(d => `<li><a href="/a/produtos/${d.id}/"${d.id === atual ? ' aria-current="page"' : ''}>${d.nome}<small>${contaDep(d.id)}</small></a></li>`).join('')}</ul></aside>`;
}

function aIndex() {
  const dest = destaques.map(r => porRef[r]);
  const rep = { acessorios: '99', bebidas: '77', conservas: '9', 'derivado-animal': '46', 'derivado-vegetal': '463', 'doces-e-frutas': '73', embalagem: '303', 'frios-e-laticinios': '370', mercearia: '122', 'molho-e-condimentos': '178', 'produto-de-limpeza': '241' };
  const repDep = d => porRef[rep[d.id]] || produtos.find(p => p.dep === d.id && p.img);
  return pagina('a', 'index', '', 'SOS Atacadista de Alimentos · atacado para pizzarias, padarias e mercados em São Paulo', 'Atacado de alimentos na Zona Leste de São Paulo: farinha, queijos, frios, molhos, embalagens e bebidas para pizzarias, padarias, pastelarias, mercados e hotéis. Entrega em 24 horas.', `
<section class="a-hero">
  <div class="in">${slider()}</div>
</section>
<section class="a-chamada"><div class="in">
  <h1>Fornecimento para pizzarias, padarias, pastelarias, mercados, hotéis e ramos alimentícios</h1>
  <p>Mais de 220 produtos em 11 departamentos, entrega em 24 horas na Grande São Paulo e preço especial para retirada na loja da Cidade Líder.</p>
  <div class="acoes"><a class="btn" href="/a/produtos/">Ver todos os produtos ${ic('seta')}</a><a class="btn btn-claro" href="${waLink('Olá! Vim pelo site da SOS e quero fazer um pedido.')}">${ic('whats')} Pedir pelo WhatsApp</a></div>
</div></section>

<section class="a-loja"><div class="in">
  ${sideDeps()}
  <div class="a-loja-cont">
    <div class="tit-aba"><h2>Ofertas da semana</h2><p>${encarte.validade} · preço para retirada, pagamento em dinheiro ou Pix</p><a href="/a/ofertas/">Encarte completo ${ic('seta')}</a></div>
    <ul class="ofertas">${encarte.ofertas.slice(0, 8).map(o => oferta(o, 'a')).join('')}</ul>
    <div class="tit-aba"><h2>Produtos em destaque</h2><a href="/a/produtos/">Ver catálogo ${ic('seta')}</a></div>
    <ul class="prateleira">${dest.map(tile).join('')}</ul>
  </div>
</div></section>

<section class="a-parceiros"><div class="in"><h2 class="tit-aba tit-so">Parceiros</h2></div>${faixaMarcas()}</section>

<section class="a-deps"><div class="in">
  <h2 class="tit-sec">Tudo o que a cozinha pede, num fornecedor só</h2>
  <ul class="a-deps-grade">${departamentos.map((d, i) => { const r = repDep(d); return `<li class="dg dg-${i}"><a href="/a/produtos/${d.id}/"><span class="dg-foto">${r ? foto(r) : ''}</span><span class="dg-txt"><b>${d.nome}</b><small>${d.subs.slice(0, 4).map(s => s.nome).join(' · ')}${d.subs.length > 4 ? '…' : ''}</small></span><span class="dg-n">${contaDep(d.id)} itens</span></a></li>`; }).join('')}</ul>
</div></section>

<section class="a-passos"><div class="in">
  <h2 class="tit-sec">Como comprar na SOS</h2>
  <ol class="passos">${passos.map(([i, t, x], k) => `<li><span class="ps-n">${k + 1}</span>${ic(i, 'ic ps-ic')}<h3>${t}</h3><p>${x}</p></li>`).join('')}</ol>
  <p class="a-passos-cta"><a class="btn" href="/a/duvidas/">Todas as dúvidas</a></p>
</div></section>

<section class="a-rota"><div class="in">
  <div class="rota-txt">
    <h2>Vans e caminhões dedicados</h2>
    <p>${entregaTexto}</p>
    <ul class="rota-fatos"><li><b>24 h</b>entrega de segunda a sexta</li><li><b>R$ 500</b>acima disso, sem custo de entrega</li><li><b>12 h</b>pedido até esse horário na segunda chega no mesmo dia</li></ul>
  </div>
  <figure class="rota-foto"><img src="/assets/img/camara-fria.webp" alt="Câmara fria do estoque da SOS Atacadista" width="240" height="278" loading="lazy"></figure>
  <div class="rota-mapa"><h3>Onde entregamos</h3><ol class="rota">${regioes.map(r => `<li>${r}</li>`).join('')}</ol><p>Consulte-nos sobre atendimento na sua região.</p></div>
</div></section>

<section class="a-contatos"><div class="in">
  <div><h2 class="tit-sec">Fale direto com o setor</h2><p>Cada setor tem o seu WhatsApp. Para pedidos, chame vendas.</p></div>
  ${listaSetores()}
</div></section>`);
}

function aProdutos(dep) {
  const d = dep && departamentos.find(x => x.id === dep);
  const lista = d ? produtos.filter(p => p.dep === d.id) : produtos;
  const tit = d ? d.nome : 'Todos os produtos';
  return pagina('a', 'produtos', d ? `produtos/${d.id}/` : 'produtos/', `${tit} · SOS Atacadista`, d ? `${d.nome} no atacado: ${d.subs.map(s => s.nome).join(', ')}. Entrega em 24 horas na Grande São Paulo.` : 'Catálogo completo do SOS Atacadista: 225 produtos de farinha, frios, laticínios, conservas, molhos, embalagens, bebidas e limpeza.', `
<section class="a-cab"><div class="in">
  <p class="trilha"><a href="/a/">Início</a> › <a href="/a/produtos/">Departamentos</a>${d ? ` › ${d.nome}` : ''}</p>
  <h1>${tit}</h1>
  <p>${lista.length} produtos. Monte sua lista e mande pelo WhatsApp: a atendente confirma preço e entrega.</p>
</div></section>
<section class="a-catalogo"><div class="in">
  ${sideDeps(d?.id)}
  <div class="cat-cont" data-catalogo>
    <div class="cat-barra">${busca('q-cat', 'Pesquisar no ' + (d ? d.nome.toLowerCase() : 'catálogo') + '…')}<a class="btn btn-sm" href="/a/pedido/">${ic('sacola')} Ver meu pedido</a></div>
    ${d ? `<div class="chips" role="group" aria-label="Subcategorias"><button type="button" data-sub-filtro="" aria-pressed="true">Tudo</button>${d.subs.map(s => `<button type="button" data-sub-filtro="${s.id}" aria-pressed="false">${s.nome}</button>`).join('')}</div>` : chipsDep()}
    <ul class="prateleira prat-cat">${lista.map(tile).join('')}</ul>
    <p class="vazio" data-vazio hidden>Nenhum produto encontrado. <a href="/a/contato/">Avise a gente</a>: o estoque muda toda semana.</p>
  </div>
</div></section>`);
}

function aOfertas() {
  return pagina('a', 'ofertas', 'ofertas/', `Ofertas da semana ${encarte.validade} · SOS Atacadista`, `Encarte do SOS Atacadista ${encarte.validade}: farinha, mussarela, frios, molhos, atum, refrigerantes e limpeza com preço especial para retirada.`, `
<section class="a-cab a-cab-verde"><div class="in">
  <p class="trilha"><a href="/a/">Início</a> › Ofertas da semana</p>
  <h1>Ofertas da semana</h1>
  <p><b>${encarte.validade}.</b> ${encarte.pagamento} Ofertas válidas enquanto durar o estoque.</p>
</div></section>
<section class="a-oft"><div class="in">
  <ul class="ofertas ofertas-lg">${encarte.ofertas.map(o => oferta(o, 'a')).join('')}</ul>
  <h2 class="tit-sec">Encarte completo</h2>
  <div class="encarte-lista">${encarte.paginas.map((p, i) => `<figure><img src="/assets/encarte/${p}.webp" alt="${esc(`Encarte ${encarte.validade}: ${encarte.titulos[i]}`)}" width="1000" height="318" loading="lazy"><figcaption>${encarte.titulos[i]}</figcaption></figure>`).join('')}</div>
  <p class="nota">*Imagens meramente ilustrativas. Em caso de divergência de preços, o valor válido é o valor para retirada.</p>
</div></section>`);
}

function aEntrega() {
  return pagina('a', 'entrega', 'entrega-e-retirada/', 'Entrega e retirada · SOS Atacadista', 'Entrega em 24 horas na Grande São Paulo, sem custo acima de R$ 500. Preço especial para retirada na loja da Cidade Líder.', `
<section class="a-cab"><div class="in"><p class="trilha"><a href="/a/">Início</a> › Entrega e retirada</p><h1>Entrega e retirada</h1><p>Duas formas de receber: a SOS leva até você, ou você retira na loja com preço de encarte.</p></div></section>
<section class="a-duas"><div class="in">
  <article class="modo modo-ent">${ic('caminhao', 'ic modo-ic')}<h2>Entrega</h2><p>${entregaTexto}</p>
    <ul class="checks"><li>${ic('check')} Sem custo adicional para compras acima de R$ 500,00</li><li>${ic('check')} Entrega em 24 horas, de segunda a sexta</li><li>${ic('check')} Na segunda-feira, pedidos até as 12h chegam no mesmo dia</li></ul></article>
  <article class="modo modo-ret">${ic('loja', 'ic modo-ic')}<h2>Retirada</h2><p>${retiradaTexto}</p>
    <p class="end">${ic('pino')} ${E.endereco} · ${E.bairro} · CEP ${E.cep}</p><a class="btn" href="${E.mapa}">Como chegar</a></article>
</div></section>
<section class="a-rota"><div class="in">
  <div class="rota-txt"><h2>Regiões atendidas</h2><p>Começamos na Zona Leste e hoje a rota vai da Zona Norte e do ABC até o Alto Tietê.</p></div>
  <figure class="rota-foto"><img src="/assets/img/camara-fria.webp" alt="Câmara fria do estoque da SOS Atacadista" width="240" height="278" loading="lazy"></figure>
  <div class="rota-mapa"><ol class="rota">${regioes.map(r => `<li>${r}</li>`).join('')}</ol><p>Consulte-nos sobre atendimento na sua região.</p></div>
</div></section>`);
}

function aQuem() {
  return pagina('a', 'quem-somos', 'quem-somos/', 'Quem somos · SOS Atacadista', 'Fundada em agosto de 2019 para atender as pizzarias da Zona Leste, a SOS Atacadista hoje abastece padarias, bares, lanchonetes, pastelarias e mercados.', `
<section class="a-cab"><div class="in"><p class="trilha"><a href="/a/">Início</a> › Quem somos</p><h1>Quem somos</h1></div></section>
<section class="a-quem"><div class="in">
  <div class="quem-txt"><p class="quem-lead">Desde ${E.fundacao}, abastecendo quem trabalha com comida.</p><p>${quemSomos}</p><p>${lema}</p></div>
  <aside class="quem-linha"><ol>
    <li><b>2019</b>Fundação para atender pizzarias da Zona Leste</li>
    <li><b>Depois</b>Padarias, bares, lanchonetes, pasteleiros e mercados</li>
    <li><b>Hoje</b>Zona Norte, ABC, Guarulhos e Alto Tietê, com 225 produtos no catálogo</li>
  </ol></aside>
</div></section>
<section class="a-parceiros"><div class="in"><h2 class="tit-aba tit-so">Marcas que distribuímos</h2></div>${faixaMarcas()}</section>`);
}

function aDuvidas() {
  return pagina('a', 'duvidas', 'duvidas/', 'Dúvidas frequentes · SOS Atacadista', 'Como ser cliente, como comprar, formas de pagamento, prazos e custos de entrega do SOS Atacadista.', `
<section class="a-cab"><div class="in"><p class="trilha"><a href="/a/">Início</a> › Dúvidas</p><h1>Central de dúvidas</h1><p>Como comprar, política de preços, entrega e prazos.</p></div></section>
<section class="a-passos a-passos-int"><div class="in"><ol class="passos">${passos.map(([i, t, x], k) => `<li><span class="ps-n">${k + 1}</span>${ic(i, 'ic ps-ic')}<h3>${t}</h3><p>${x}</p></li>`).join('')}</ol></div></section>
<section class="a-faq"><div class="in">${faqLista()}<aside class="faq-lado"><h2>Não achou o produto?</h2><p>Avise a gente pelo formulário ou pelo WhatsApp de vendas: o estoque muda toda semana.</p><a class="btn" href="/a/contato/">Fale conosco</a></aside></div></section>`);
}

function aContato() {
  return pagina('a', 'contato', 'contato/', 'Fale conosco · SOS Atacadista', `Telefone ${E.fone}, WhatsApp de vendas ${E.whats}. ${E.endereco}, ${E.bairro}.`, `
<section class="a-cab"><div class="in"><p class="trilha"><a href="/a/">Início</a> › Fale conosco</p><h1>Fale conosco</h1><p>${E.horario}.</p></div></section>
<section class="a-contato"><div class="in">
  <div class="ct-lado">
    <h2>Telefone para pedidos</h2><p class="ct-fone"><a href="tel:${E.foneHref}">${E.fone}</a></p>
    <h2>WhatsApp por setor</h2>${listaSetores()}
    <h2>Localização</h2><p>${E.razao}<br>${E.endereco} · ${E.bairro}<br>CEP ${E.cep}</p><a class="btn btn-claro" href="${E.mapa}">${ic('pino')} Abrir no mapa</a>
  </div>
  <div class="ct-form"><h2>Envie uma mensagem</h2><p class="nota">(*) Campos obrigatórios</p>${formContato()}<p class="ct-trab">Quer trabalhar na SOS? <a href="/a/trabalhe-conosco/">Envie seu currículo</a>.</p></div>
</div></section>`);
}

function aTrabalhe() {
  return pagina('a', 'contato', 'trabalhe-conosco/', 'Trabalhe conosco · SOS Atacadista', 'Envie seu currículo para o SOS Atacadista de Alimentos, na Cidade Líder, São Paulo.', `
<section class="a-cab"><div class="in"><p class="trilha"><a href="/a/">Início</a> › Trabalhe conosco</p><h1>Trabalhe conosco</h1><p>Nosso lema é fortalecer, crescer e somar benefícios para todos, inclusive para quem trabalha com a gente.</p></div></section>
<section class="a-contato"><div class="in"><div class="ct-form ct-form-so"><p class="nota">(*) Campos obrigatórios</p>${formTrabalhe()}</div></div></section>`);
}

function aPedido() {
  return pagina('a', 'pedido', 'pedido/', 'Meu pedido · SOS Atacadista', 'Monte sua lista de produtos e envie o pedido pelo WhatsApp de vendas do SOS Atacadista.', `
<section class="a-cab"><div class="in"><p class="trilha"><a href="/a/">Início</a> › Meu pedido</p><h1>Meu pedido</h1><p>Confira a lista, ajuste as quantidades e mande para vendas pelo WhatsApp.</p></div></section>
<section class="a-pedido"><div class="in">${painelPedido('a', 'Itens da lista')}<aside class="ped-lado"><h2>Faltou algo?</h2><ul>${departamentos.map(d => `<li><a href="/a/produtos/${d.id}/">${d.nome}</a></li>`).join('')}</ul></aside></div></section>`);
}

// ===================== VERSÃO B · Pedido rápido =====================
function bIndex() {
  return pagina('b', 'index', '', 'SOS Atacadista · faça seu pedido de atacado de alimentos', 'Pedido rápido no SOS Atacadista: 225 produtos para pizzaria, padaria, pastelaria, lanchonete, mercado e hotel. Entrega em 24 horas na Grande São Paulo.', `
<section class="b-hero"><div class="in">
  <div class="b-hero-txt">
    <p class="b-selo">Atacado de alimentos · Zona Leste de São Paulo · desde 2019</p>
    <h1>Fornecimento para pizzarias, padarias, pastelarias, mercados, hotéis e ramos alimentícios</h1>
    <form class="b-busca" action="/b/pedido/" role="search"><label class="sr" for="q-hero">O que você precisa?</label>${ic('busca')}<input id="q-hero" name="q" type="search" placeholder="O que falta hoje? Mussarela, farinha, caixa…" autocomplete="off"><button class="btn" type="submit">Buscar</button></form>
    <p class="b-hero-fone">Ou ligue <a href="tel:${E.foneHref}">${E.fone}</a> · WhatsApp <a href="${waLink('Olá! Vim pelo site da SOS e quero fazer um pedido.')}">${E.whats}</a></p>
  </div>
  <figure class="b-hero-foto"><img src="/assets/img/forno.webp" alt="Pizzaiolo colocando a pizza no forno a lenha" width="1800" height="1200"><figcaption class="b-hero-tag"><b>24 h</b><span>entrega de segunda a sexta</span></figcaption></figure>
</div></section>

<section class="b-segs"><div class="in">
  <h2 class="b-tit">Qual é o seu negócio?</h2>
  <ul class="segs">${segmentos.map(s => `<li><a href="/b/segmentos/${s.slug}/">${ic(icSeg[s.slug], 'ic seg-ic')}<b>${s.nome}</b><small>${new Set(produtos.filter(p => s.subs.includes(p.sub)).map(p => p.ref)).size} produtos</small></a></li>`).join('')}</ul>
</div></section>

<section class="b-ofertas"><div class="in">
  <div class="b-tit-linha"><h2 class="b-tit">Encarte desta semana</h2><p><b>${encarte.validade}</b> · ${encarte.pagamento}</p><a class="btn btn-sm btn-esc" href="/b/ofertas/">Ver as 15 páginas</a></div>
  <ul class="ofertas">${encarte.ofertas.map(o => oferta(o, 'b')).join('')}</ul>
</div></section>

<section class="b-semana"><div class="in">
  <div class="b-semana-txt"><h2 class="b-tit">A semana de quem compra na SOS</h2><p>Tele-atendimento de segunda a sexta. Entrega sem custo nas compras acima de R$ 500,00.</p></div>
  <ol class="semana">
    <li class="dia dia-seg"><b>Seg</b><span class="dia-at">9h–21h30</span><p>Pedido até <strong>12h</strong> chega <strong>no mesmo dia</strong></p></li>
    <li class="dia"><b>Ter</b><span class="dia-at">9h–21h30</span><p>Entrega em 24 h</p></li>
    <li class="dia"><b>Qua</b><span class="dia-at">9h–21h30</span><p>Entrega em 24 h</p></li>
    <li class="dia"><b>Qui</b><span class="dia-at">9h–21h30</span><p>Entrega em 24 h</p></li>
    <li class="dia"><b>Sex</b><span class="dia-at">9h–17h</span><p>Entrega em 24 h</p></li>
  </ol>
</div></section>

<section class="b-rota"><div class="in">
  <div><h2 class="b-tit">De Cidade Líder para a Grande São Paulo</h2><p>${entregaTexto}</p><a class="btn" href="/b/entrega-e-retirada/">Entrega e retirada</a></div>
  <ol class="rota">${regioes.map(r => `<li>${r}</li>`).join('')}</ol>
</div></section>

<section class="b-deps"><div class="in">
  <h2 class="b-tit">Catálogo por departamento</h2>
  <ul class="indice">${departamentos.map(d => `<li><a href="/b/pedido/?dep=${d.id}"><b>${d.nome}</b><span class="ind-pontos" aria-hidden="true"></span><small>${contaDep(d.id)}</small></a><p>${d.subs.map(s => s.nome).join(', ')}</p></li>`).join('')}</ul>
</div></section>

<section class="b-marcas"><div class="in"><h2 class="b-tit b-tit-sm">Marcas parceiras</h2></div>${faixaMarcas()}</section>

<section class="b-contatos"><div class="in"><div><h2 class="b-tit">WhatsApp por setor</h2><p>Para pedidos, chame vendas. Primeira compra? O cadastro é simples e leva 24 horas.</p></div>${listaSetores()}</div></section>`);
}

function bPedido() {
  return pagina('b', 'pedido', 'pedido/', 'Fazer pedido · SOS Atacadista', 'Pedido rápido no SOS Atacadista: pesquise os 225 produtos, escolha as quantidades e envie pelo WhatsApp de vendas.', `
<section class="b-cab"><div class="in"><h1>Fazer pedido</h1><p>Pesquise, escolha a quantidade e envie. A atendente confirma preço, estoque e entrega pelo WhatsApp.</p></div></section>
<section class="b-pedido"><div class="in">
  <div class="cat-cont" data-catalogo>
    <div class="cat-barra">${busca('q-ped', 'Pesquisar entre 225 produtos…')}</div>
    ${chipsDep()}
    ${tabela(produtos)}
  </div>
  <aside class="b-resumo">${painelPedido('b')}</aside>
</div></section>`);
}

function bSegmento(s) {
  const lista = produtos.filter(p => s.subs.includes(p.sub));
  return pagina('b', 'segmentos', `segmentos/${s.slug}/`, `${s.nome} · produtos para ${s.nome.toLowerCase()} no SOS Atacadista`, `${s.frase} ${lista.length} produtos com entrega em 24 horas na Grande São Paulo.`, `
<section class="b-cab b-cab-seg"><div class="in">
  <ul class="segs segs-mini" aria-label="Outros negócios">${segmentos.map(x => `<li><a href="/b/segmentos/${x.slug}/"${x.slug === s.slug ? ' aria-current="page"' : ''}>${ic(icSeg[x.slug], 'ic seg-ic')}${x.nome}</a></li>`).join('')}</ul>
  <h1>${ic(icSeg[s.slug], 'ic h1-ic')} ${s.nome}</h1>
  <p>${s.frase} ${lista.length} produtos separados para você.</p>
</div></section>
<section class="b-pedido"><div class="in">
  <div class="cat-cont" data-catalogo>
    <div class="cat-barra">${busca('q-seg', 'Pesquisar na lista de ' + s.nome.toLowerCase() + '…')}</div>
    ${tabela(lista)}
    <p class="nota">Não encontrou? <a href="/b/pedido/">Veja o catálogo inteiro</a>.</p>
  </div>
  <aside class="b-resumo">${painelPedido('b')}</aside>
</div></section>`);
}

function bOfertas() {
  return pagina('b', 'ofertas', 'ofertas/', `Encarte ${encarte.validade} · SOS Atacadista`, `Encarte do SOS Atacadista ${encarte.validade}, com preço especial para retirada na loja.`, `
<section class="b-cab"><div class="in"><h1>Encarte ${encarte.validade}</h1><p>${encarte.pagamento} Ofertas válidas até o prazo ou enquanto durar o estoque. Toque numa página para ampliar.</p></div></section>
<section class="b-encarte"><div class="in">
  <ol class="tabloide">${encarte.paginas.map((p, i) => `<li><button type="button" data-zoom="/assets/encarte/${p}.webp" aria-label="Ampliar: ${esc(encarte.titulos[i])}"><img src="/assets/encarte/${p}.webp" alt="${esc(`Encarte ${encarte.validade}: ${encarte.titulos[i]}`)}" width="1000" height="318" loading="lazy"></button><span>${String(i + 1).padStart(2, '0')} · ${encarte.titulos[i]}</span></li>`).join('')}</ol>
  <p class="nota">*Imagens meramente ilustrativas. Em caso de divergência de preços, o valor válido é o valor para retirada.</p>
</div></section>
<dialog class="zoom" data-zoom-dlg><button type="button" class="zoom-fechar" data-zoom-fechar aria-label="Fechar">${ic('fechar')}</button><img src="" alt=""></dialog>`);
}

function bEntrega() {
  return pagina('b', 'entrega', 'entrega-e-retirada/', 'Entrega e retirada · SOS Atacadista', 'Entrega em 24 horas, sem custo acima de R$ 500, e preço especial para retirada na Cidade Líder, São Paulo.', `
<section class="b-cab"><div class="in"><h1>Entrega e retirada</h1><p>${entregaTexto}</p></div></section>
<section class="b-modos"><div class="in">
  <table class="comp"><caption class="sr">Entrega ou retirada</caption><thead><tr><th scope="col"></th><th scope="col">${ic('caminhao')} Entrega</th><th scope="col">${ic('loja')} Retirada na loja</th></tr></thead><tbody>
    <tr><th scope="row">Prazo</th><td>24 horas, de segunda a sexta. Segunda: pedido até 12h chega no mesmo dia.</td><td>Combine o horário com a atendente.</td></tr>
    <tr><th scope="row">Custo</th><td>Sem custo adicional acima de R$ 500,00.</td><td>Sem custo.</td></tr>
    <tr><th scope="row">Preço</th><td>Tabela normal, confirmada no pedido.</td><td>Preço especial de encarte.</td></tr>
    <tr><th scope="row">Pagamento</th><td>Formas liberadas após aprovação do cadastro.</td><td>Dinheiro ou Pix nas ofertas do encarte.</td></tr>
    <tr><th scope="row">Onde</th><td>${regioes.join(', ')}.</td><td>${E.endereco}, ${E.bairro}, CEP ${E.cep}.</td></tr>
  </tbody></table>
  <p class="b-modos-cta"><a class="btn" href="/b/pedido/">Fazer pedido</a> <a class="btn btn-esc" href="${E.mapa}">${ic('pino')} Como chegar</a></p>
</div></section>`);
}

function bQuem() {
  return pagina('b', 'quem-somos', 'quem-somos/', 'Quem somos · SOS Atacadista', 'A SOS Atacadista nasceu em agosto de 2019 para atender as pizzarias da Zona Leste de São Paulo.', `
<section class="b-cab"><div class="in"><h1>Quem somos</h1></div></section>
<section class="b-quem"><div class="in">
  <div class="b-quem-txt"><p class="quem-lead">Nascemos em ${E.fundacao} para atender as pizzarias da Zona Leste.</p><p>${quemSomos}</p><p>${lema}</p></div>
  <dl class="numeros"><div><dt>Fundação</dt><dd>2019</dd></div><div><dt>Produtos</dt><dd>${produtos.length}</dd></div><div><dt>Departamentos</dt><dd>${departamentos.length}</dd></div><div><dt>Regiões</dt><dd>${regioes.length}</dd></div></dl>
</div></section>
<section class="b-faq"><div class="in"><h2 class="b-tit">Dúvidas frequentes</h2>${faqLista()}</div></section>
<section class="b-marcas"><div class="in"><h2 class="b-tit b-tit-sm">Marcas que distribuímos</h2></div>${faixaMarcas()}</section>`);
}

function bContato() {
  return pagina('b', 'contato', 'contato/', 'Contato · SOS Atacadista', `Telefone ${E.fone}, WhatsApp ${E.whats}, ${E.endereco}, ${E.bairro}.`, `
<section class="b-cab"><div class="in"><h1>Contato</h1><p>${E.horario}.</p></div></section>
<section class="b-contato"><div class="in">
  <div class="ct-lado"><p class="ct-fone"><small>Pedidos</small><a href="tel:${E.foneHref}">${E.fone}</a></p>${listaSetores()}<p class="ct-end">${ic('pino')} ${E.endereco}<br>${E.bairro} · CEP ${E.cep}<br><a href="${E.mapa}">Abrir no mapa</a></p></div>
  <div class="ct-form"><h2>Mensagem</h2>${formContato()}<p class="ct-trab">Quer trabalhar na SOS? <a href="/b/trabalhe-conosco/">Envie seu currículo</a>.</p></div>
</div></section>`);
}

function bTrabalhe() {
  return pagina('b', 'contato', 'trabalhe-conosco/', 'Trabalhe conosco · SOS Atacadista', 'Envie seu currículo para o SOS Atacadista de Alimentos.', `
<section class="b-cab"><div class="in"><h1>Trabalhe conosco</h1><p>Envie seu currículo. (*) Campos obrigatórios.</p></div></section>
<section class="b-contato"><div class="in"><div class="ct-form ct-form-so">${formTrabalhe()}</div></div></section>`);
}

export function gerarVersao(v) {
  if (v === 'a') {
    const p = { index: aIndex(), produtos: aProdutos(), ofertas: aOfertas(), 'entrega-e-retirada': aEntrega(), 'quem-somos': aQuem(), duvidas: aDuvidas(), contato: aContato(), 'trabalhe-conosco': aTrabalhe(), pedido: aPedido() };
    for (const d of departamentos) p[`produtos/${d.id}`] = aProdutos(d.id);
    return p;
  }
  const p = { index: bIndex(), pedido: bPedido(), ofertas: bOfertas(), 'entrega-e-retirada': bEntrega(), 'quem-somos': bQuem(), contato: bContato(), 'trabalhe-conosco': bTrabalhe() };
  for (const s of segmentos) p[`segmentos/${s.slug}`] = bSegmento(s);
  return p;
}

// Catálogo enxuto para a lista de pedido (site.js).
export const catalogoJson = () => JSON.stringify(Object.fromEntries(produtos.map(p => [p.ref, [p.nome, p.venda, p.img ? p.img[0] : '']])));
