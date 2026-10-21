// Monta as páginas das versões A ("Fachada": o amarelo da loja da Av. C-1, barra de menu azul como no site atual,
// prateleiras de produtos) e B ("Balcão": catálogo em lista para pedido rápido, azul do logo, etiquetas amarelas).
// Estilos em public/assets/{base,a,b}.css, comportamento (lista de pedido, busca, fotos) em public/assets/site.js.
import { empresa as E, textos as T, departamentos, produtos, kits, destaques } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const porId = Object.fromEntries(produtos.map(p => [p.id, p]));
const doDep = id => produtos.filter(p => p.dep === id);
const depDe = id => departamentos.find(d => d.id === id);
const foto = p => p.fotos[0] ? `/assets/img/p/${p.fotos[0][0]}.webp` : '';
const corte = n => `/assets/img/cut/${n}.webp`;

export const nomesVersao = { a: 'Fachada', b: 'Balcão' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'quem-somos', nome: 'Quem Somos', caminho: 'quem-somos/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'cadastro', nome: 'Cadastro', caminho: 'cadastro/' },
  { slug: 'orcamento', nome: 'Orçamento', caminho: 'orcamento/' },
  { slug: 'localizacao', nome: 'Localização', caminho: 'localizacao/' },
  { slug: 'fale-conosco', nome: 'Fale Conosco', caminho: 'fale-conosco/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  menos: '<path d="M5 12h14"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  sacola: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 016 0v2"/>',
  caminhao: '<path d="M2 6h11v10H2zM13 10h4l3 3v3h-7z"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
  caixa: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  zoom: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M11 8v6M8 11h6"/>',
  lixo: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  predio: '<path d="M4 21V5l8-3v19M12 9h8v12M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da Herpin Embalagens e gostaria de fazer um pedido.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;

// Botão que coloca o item na lista de pedido (site.js guarda no navegador).
const add = (p, rotulo = 'Adicionar') => `<button class="add" type="button" data-add="${p.id}" data-nome="${esc(p.nome)}" data-foto="${foto(p)}" data-dep="${esc(depDe(p.dep).curto)}" aria-label="Adicionar ${esc(p.nome)} ao pedido">${ic('mais')}${ic('ok', 'ic ic-ok')}<span class="t1">${rotulo}</span><span class="t2">No pedido</span></button>`;
const zoom = p => p.fotos.length ? `<button class="zoom" type="button" data-fotos="${p.fotos.map(f => `/assets/img/p/${f[0]}.webp`).join('|')}" data-titulo="${esc(p.nome)}" aria-label="Ver fotos de ${esc(p.nome)}">${ic('zoom')}${p.fotos.length > 1 ? `<span>${p.fotos.length}</span>` : ''}</button>` : '';
const imgP = (p, w = 400) => p.fotos[0]
  ? `<img src="${foto(p)}" alt="${esc(p.nome)}" width="${p.fotos[0][1]}" height="${p.fotos[0][2]}" loading="lazy" decoding="async">`
  : `<span class="sem-foto">${ic('caixa')}<small>Foto sob consulta</small></span>`;
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

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
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:locale" content="pt_BR">
<link rel="icon" href="/assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,500;0,600;0,700;0,800;1,700;1,800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, ativo) => nav.map(n => `<li><a href="/${v}/${n.caminho}"${n.slug === ativo ? ' aria-current="page"' : ''}>${n.nome}</a></li>`).join('');
const contadorPedido = v => `<a class="btn-pedido" href="/${v}/orcamento/">${ic('lista')}<span class="rot">Meu pedido</span><b data-pedido-n>0</b></a>`;
const buscaTopo = (v, cls = 'busca-topo') => `<form class="${cls}" action="/${v}/produtos/" role="search"><label class="vh" for="q-${cls}">Buscar produto</label>${ic('busca')}<input id="q-${cls}" name="q" type="search" placeholder="Buscar entre os ${produtos.length} produtos" autocomplete="off"><button type="submit">Buscar</button></form>`;

function topoA(v, ativo) {
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<div class="faixa"><div class="wrap"><span>${ic('caminhao')} Tele-entregas <a href="tel:${E.telHref}">${E.tel}</a></span><span class="sumir">Atacado e varejo desde ${E.desde}</span><a class="faixa-wa" href="${waLink()}">${ic('wa')} ${E.waTxt}</a></div></div>
<header class="topo"><div class="wrap">
  <a class="marca" href="/${v}/" aria-label="Herpin Embalagens, página inicial"><img src="/assets/img/logo.svg" alt="Herpin Embalagens" width="298" height="116"></a>
  ${buscaTopo(v)}
  ${contadorPedido(v)}
  <button class="btn-menu" type="button" aria-expanded="false" aria-controls="menu">${ic('menu')}<span class="vh">Menu</span></button>
</div></header>
<nav class="menu" id="menu" aria-label="Principal"><div class="wrap"><ul>${menu(v, ativo)}</ul></div></nav>`;
}

function topoB(v, ativo) {
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo"><div class="wrap">
  <a class="marca" href="/${v}/" aria-label="Herpin Embalagens, página inicial"><img src="/assets/img/logo-branco.svg" alt="Herpin Embalagens" width="298" height="116"></a>
  ${buscaTopo(v)}
  <a class="topo-tel" href="tel:${E.telHref}"><small>Tele-entregas</small>${E.tel}</a>
  ${contadorPedido(v)}
  <button class="btn-menu" type="button" aria-expanded="false" aria-controls="menu">${ic('menu')}<span class="vh">Menu</span></button>
</div></header>
<nav class="menu" id="menu" aria-label="Principal"><div class="wrap"><ul>${menu(v, ativo)}</ul>
  <ul class="menu-deps">${departamentos.map(d => `<li><a href="/${v}/produtos/${d.id}/">${d.curto}</a></li>`).join('')}</ul></div></nav>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="wrap">
  <div class="rod-marca"><img src="/assets/img/${v === 'a' ? 'logo-branco' : 'logo'}.svg" alt="Herpin Embalagens" width="298" height="116"><p>Embalagens em geral e produtos de limpeza e higiene, no atacado e no varejo, desde ${E.desde}.</p></div>
  <div><h2>Produtos</h2><ul>${departamentos.map(d => `<li><a href="/${v}/produtos/${d.id}/">${d.nome}</a></li>`).join('')}</ul></div>
  <div><h2>Institucional</h2><ul>${nav.slice(1).map(n => `<li><a href="/${v}/${n.caminho}">${n.nome}</a></li>`).join('')}</ul></div>
  <div><h2>Atendimento</h2><ul class="rod-cont">
    <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}<br>${E.cidade} · CEP ${E.cep}</span></li>
    <li>${ic('tel')}<a href="tel:${E.telHref}">${E.tel}</a></li>
    <li>${ic('wa')}<a href="${waLink()}">${E.waTxt}</a></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
</div><div class="wrap rod-fim"><span>© ${new Date().getFullYear()} Herpin Embalagens · Goiânia - GO</span><span>Prévia desenvolvida pela Overtus</span></div></footer>
<a class="wa-flutua" href="${waLink()}" aria-label="Falar com a Herpin pelo WhatsApp">${ic('wa')}</a>
<div class="aviso-pedido" role="status" aria-live="polite"></div>
<dialog class="galeria" aria-label="Fotos do produto"><button class="gal-fechar" type="button" aria-label="Fechar">×</button><figure><img alt=""><figcaption></figcaption></figure><div class="gal-mini"></div></dialog>`;
}

function pagina(v, n, titulo, descricao, corpo) {
  const caminho = nav.find(x => x.slug === n)?.caminho ?? `produtos/${n.replace('produtos-', '')}/`;
  const ativo = n.startsWith('produtos') ? 'produtos' : n;
  return `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${n.startsWith('produtos-') ? 'dep' : n}">
${v === 'a' ? topoA(v, ativo) : topoB(v, ativo)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;
}

// ---------- blocos comuns ----------
const tituloPag = (v, rotulo, titulo, texto = '', extra = '') => `<section class="cab-pag"><div class="wrap">${v === 'a' ? `<p class="trilha"><a href="/${v}/">Home</a> / ${rotulo}</p>` : `<p class="trilha"><a href="/${v}/">Início</a> <span>›</span> ${rotulo}</p>`}<h1>${titulo}</h1>${texto ? `<p class="cab-txt">${texto}</p>` : ''}${extra}</div></section>`;

function formPedido(v) {
  return `<div class="pedido-grade">
  <section class="pedido-lista" aria-labelledby="t-lista">
    <h2 id="t-lista">${ic('lista')} Itens do pedido <span data-pedido-n>0</span></h2>
    <ul id="pedido-itens" class="pedido-itens"></ul>
    <div class="pedido-vazio" hidden><p>Sua lista ainda está vazia.</p><a class="btn btn-sec" href="/${v}/produtos/">Escolher produtos ${ic('seta')}</a></div>
  </section>
  <form class="form pedido-form" data-envio="pedido">
    <h2>Seus dados</h2>
    <p class="nota">${esc(T.orcamento)} Você também pode escrever o nome e a quantidade dos produtos no campo abaixo.</p>
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>Empresa ou CNPJ <small>(opcional)</small><input name="Empresa"></label>
    <div class="dupla"><label>Telefone<input name="Telefone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="E-mail" type="email" autocomplete="email"></label></div>
    <label>Endereço de entrega <small>(bairro e cidade)</small><input name="Entrega" autocomplete="street-address"></label>
    <label>Nome e quantidade dos produtos <small>(ou observações)</small><textarea name="Observações" rows="4"></textarea></label>
    <div class="acoes"><button class="btn btn-wa" type="submit" data-via="wa">${ic('wa')} Enviar pelo WhatsApp</button><button class="btn btn-sec" type="submit" data-via="email">${ic('mail')} Enviar por e-mail</button></div>
    <p class="nota">O pedido abre pronto no WhatsApp ${E.waTxt} ou no seu e-mail, para ${E.email}.</p>
  </form></div>`;
}

const formSimples = (titulo, campos, assunto) => `<form class="form" data-envio="form" data-assunto="${esc(assunto)}"><h2>${titulo}</h2>${campos}
  <div class="acoes"><button class="btn btn-wa" type="submit" data-via="wa">${ic('wa')} Enviar pelo WhatsApp</button><button class="btn btn-sec" type="submit" data-via="email">${ic('mail')} Enviar por e-mail</button></div></form>`;

const camposCadastro = `<label>Razão social<input name="Razão social" required></label>
  <div class="dupla"><label>CPF/CNPJ<input name="CPF/CNPJ" required inputmode="numeric"></label><label>Nome do responsável<input name="Nome" required autocomplete="name"></label></div>
  <label>Endereço<input name="Endereço" autocomplete="street-address"></label>
  <div class="dupla"><label>Telefone<input name="Telefone" type="tel" autocomplete="tel"></label><label>Celular<input name="Celular" type="tel"></label></div>
  <label>E-mail<input name="E-mail" type="email" required autocomplete="email"></label>`;
const camposFale = `<div class="dupla"><label>Nome<input name="Nome" required autocomplete="name"></label><label>E-mail<input name="E-mail" type="email" required autocomplete="email"></label></div>
  <div class="dupla"><label>Telefone<input name="Telefone" type="tel" autocomplete="tel"></label><label>Assunto<input name="Assunto"></label></div>
  <label>Mensagem<textarea name="Mensagem" rows="5" required></textarea></label>`;

const blocoContato = (cls = '') => `<ul class="lista-cont ${cls}">
  <li>${ic('tel')}<div><small>Tele-entregas</small><a href="tel:${E.telHref}">${E.tel}</a></div></li>
  <li>${ic('wa')}<div><small>WhatsApp</small><a href="${waLink()}">${E.waTxt}</a></div></li>
  <li>${ic('mail')}<div><small>E-mail</small><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><small>Endereço</small><span>${E.rua}, ${E.bairro}<br>${E.cidade} · CEP ${E.cep}</span></div></li></ul>`;

const mapa = `<div class="mapa"><iframe src="${E.mapa}" title="Mapa da Herpin Embalagens na Av. C-1, Jardim América, Goiânia" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

const kitsDados = () => kits.map(k => ({ ...k, prods: k.itens.map(i => porId[i]).filter(Boolean) }));
const kitBotao = k => `<button class="btn btn-kit" type="button" data-kit="${k.prods.map(p => p.id).join(',')}" data-kit-nomes="${esc(JSON.stringify(k.prods.map(p => [p.id, p.nome, foto(p), depDe(p.dep).curto])))}">${ic('lista')} Adicionar os ${k.prods.length} itens ao pedido</button>`;

// =====================================================================
// Versão A · Fachada
// =====================================================================
function homeA(v) {
  const pilha = [
    ['marmitex-aluminio', 'p1'], ['detergente', 'p2'], ['balde', 'p3'], ['sacos-kraft', 'p4'], ['pratos-isopor', 'p5'],
    ['alcool', 'p6'], ['esponja', 'p7'], ['luva', 'p8'], ['papel-higienico', 'p9'], ['marmitex-isopor', 'p10'],
  ];
  const dests = destaques.map(i => porId[i]);
  return `<section class="hero"><div class="bolhas" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><div class="wrap hero-g">
  <div class="hero-txt">
    <p class="selo-ano"><b>${E.desde}</b><span>Atacado e varejo<br>em Goiânia</span></p>
    <h1>Embalagens e produtos de limpeza com entrega própria.</h1>
    <p class="lead">Do marmitex ao desinfetante: ${produtos.length} produtos em seis departamentos para restaurantes, lanchonetes, açougues, mercados e empresas. Monte sua lista aqui e mande pronta no WhatsApp.</p>
    <div class="hero-cta"><a class="btn btn-azul" href="/${v}/produtos/">Ver os produtos ${ic('seta')}</a><a class="btn btn-linha" href="${waLink()}">${ic('wa')} ${E.waTxt}</a></div>
    <a class="hero-tele" href="tel:${E.telHref}">${ic('caminhao')}<span><small>Tele-entregas</small>${E.tel}</span></a>
  </div>
  <div class="hero-pilha" aria-hidden="true">${pilha.map(([n, c]) => `<img class="${c}" src="${corte(n)}" alt="" loading="eager">`).join('')}</div>
</div></section>

<section class="deps"><div class="wrap">
  <div class="sec-cab"><h2>Seis departamentos, um só fornecedor</h2><p>Os mesmos departamentos do balcão da Av. C-1. Clique para ver os produtos com foto.</p></div>
  <div class="deps-g">${departamentos.map((d, i) => `<a class="dep dep-${i + 1}" href="/${v}/produtos/${d.id}/"><span class="dep-n">${String(i + 1).padStart(2, '0')}</span><h3>${d.nome}</h3><p>${d.frase}</p><span class="dep-qt">${doDep(d.id).length} produtos ${ic('seta')}</span><img src="${corte(d.capa)}" alt="" loading="lazy"></a>`).join('')}</div>
</div></section>

<section class="prateleira"><div class="wrap">
  <div class="sec-cab lado"><div><h2>Mais procurados no balcão</h2><p>Toque em <b>Adicionar</b> e a lista de pedido vai sendo montada.</p></div><a class="link-seta" href="/${v}/produtos/">Ver todos ${ic('seta')}</a></div>
  <div class="prat-trilho" tabindex="0" aria-label="Produtos mais procurados">${dests.map(p => `<article class="prod-prat"><div class="pp-img">${imgP(p)}${zoom(p)}</div><p class="pp-dep">${depDe(p.dep).curto}</p><h3>${p.nome}</h3>${add(p)}</article>`).join('')}</div>
</div></section>

<section class="kits"><div class="wrap">
  <div class="sec-cab"><h2>Monte o pedido do seu negócio</h2><p>Listas prontas com o que cada tipo de cliente costuma levar. Adicione tudo de uma vez e ajuste as quantidades no orçamento.</p></div>
  <div class="kits-tabs" role="tablist">${kitsDados().map((k, i) => `<button role="tab" type="button" aria-selected="${i === 0}" aria-controls="kit-${k.id}" id="tab-${k.id}">${k.nome}</button>`).join('')}</div>
  ${kitsDados().map((k, i) => `<div class="kit" role="tabpanel" id="kit-${k.id}" aria-labelledby="tab-${k.id}"${i ? ' hidden' : ''}>
    <img class="kit-capa" src="${corte(k.capa)}" alt="" loading="lazy">
    <ol class="kit-itens">${k.prods.map(p => `<li>${p.fotos[0] ? `<img src="${foto(p)}" alt="" loading="lazy">` : ''}<span>${p.nome}</span><small>${depDe(p.dep).curto}</small></li>`).join('')}</ol>
    ${kitBotao(k)}</div>`).join('')}
</div></section>

<section class="entrega"><div class="wrap">
  <div class="sec-cab"><h2>Do seu pedido até a sua porta</h2><p>${esc(T.diferencial.split(',').slice(0, 1)[0])}: a entrega é feita com transporte próprio da Herpin.</p></div>
  <ol class="rota">
    <li><span class="rota-n">1</span>${ic('lista')}<h3>Você monta a lista</h3><p>No site, pelo telefone ${E.tel} ou no WhatsApp.</p></li>
    <li><span class="rota-n">2</span>${ic('caixa')}<h3>Separamos no depósito</h3><p>Conferência dos itens na loja da Av. C-1, no Jardim América.</p></li>
    <li><span class="rota-n">3</span>${ic('caminhao')}<h3>Nosso caminhão entrega</h3><p>Transporte próprio. ${esc(T.pedido)}</p></li>
  </ol>
</div></section>

<section class="quem"><div class="wrap quem-g">
  <figure class="quem-foto"><img src="/assets/img/fachada.webp" alt="Fachada amarela da loja Herpin Embalagens e Materiais de Limpeza" width="311" height="105" loading="lazy"><figcaption>Nossa loja na Av. C-1, nº 1173</figcaption></figure>
  <div><p class="eyebrow">Quem somos</p><h2>Desde ${E.desde} no Jardim América</h2><p>${esc(T.quemSomos)}</p><a class="link-seta" href="/${v}/quem-somos/">Conheça a Herpin ${ic('seta')}</a></div>
</div></section>

<section class="onde"><div class="wrap onde-g">${mapa}<div><h2>Venha até a loja</h2>${blocoContato()}<a class="btn btn-azul" href="${E.rota}" target="_blank" rel="noopener">${ic('pin')} Como chegar</a></div></div></section>`;
}

function catalogoA(v) {
  return `${tituloPag(v, 'Produtos', 'Produtos', `${produtos.length} produtos em seis departamentos. Busque pelo nome, filtre por departamento e adicione à lista de pedido.`)}
<section class="catalogo"><div class="wrap">
  <div class="filtros">
    <label class="busca-cat">${ic('busca')}<span class="vh">Buscar</span><input type="search" data-busca placeholder="Ex.: marmitex, bobina, detergente" autocomplete="off"></label>
    <div class="chips" role="group" aria-label="Departamentos"><button type="button" data-filtro="" aria-pressed="true">Todos</button>${departamentos.map(d => `<button type="button" data-filtro="${d.id}" aria-pressed="false">${d.curto}</button>`).join('')}</div>
    <p class="conta" aria-live="polite"><b data-conta>${produtos.length}</b> produtos</p>
  </div>
  ${departamentos.map(d => `<div class="cat-bloco" data-bloco="${d.id}"><h2><a href="/${v}/produtos/${d.id}/">${d.nome}</a></h2><div class="grade-prod">${doDep(d.id).map(p => cardA(p)).join('')}</div></div>`).join('')}
  <p class="vazio" hidden>Nenhum produto com esse nome. Escreva o que precisa no <a href="/${v}/orcamento/">orçamento</a> ou chame no <a href="${waLink()}">WhatsApp</a>: a loja tem mais itens do que o site mostra.</p>
</div></section>`;
}
const cardA = p => `<article class="prod" data-item data-nome="${esc(norm(p.nome + ' ' + depDe(p.dep).nome))}" data-dep="${p.dep}"><div class="prod-img">${imgP(p)}${zoom(p)}</div><h3>${p.nome}</h3>${add(p)}</article>`;

function depA(v, d) {
  const lista = doDep(d.id);
  const i = departamentos.indexOf(d);
  return `<section class="cab-dep"><div class="wrap cab-dep-g"><div><p class="trilha"><a href="/${v}/">Home</a> / <a href="/${v}/produtos/">Produtos</a> / ${d.curto}</p><p class="dep-n">${String(i + 1).padStart(2, '0')} de 06</p><h1>${d.nome}</h1><p class="cab-txt">${d.frase} ${lista.length} produtos.</p></div><img src="${corte(d.capa)}" alt="" width="420" height="320"></div></section>
<section class="catalogo"><div class="wrap">
  <div class="grade-prod">${lista.map(p => cardA(p)).join('')}</div>
  <nav class="outros-deps" aria-label="Outros departamentos"><h2>Outros departamentos</h2><ul>${departamentos.filter(x => x !== d).map(x => `<li><a href="/${v}/produtos/${x.id}/"><img src="${corte(x.capa)}" alt="" loading="lazy">${x.nome}</a></li>`).join('')}</ul></nav>
</div></section>`;
}

function quemA(v) {
  return `${tituloPag(v, 'Quem Somos', 'Quem Somos', `Atacado e varejo de embalagens e produtos de limpeza em Goiânia desde ${E.desde}.`)}
<section class="sobre"><div class="wrap sobre-g">
  <div class="sobre-txt"><p class="grande">${esc(T.quemSomos)}</p><p>${esc(T.diferencial)}</p><p><b>${esc(T.pedido)}</b></p><div class="hero-cta"><a class="btn btn-azul" href="/${v}/produtos/">Ver produtos ${ic('seta')}</a><a class="btn btn-linha" href="/${v}/cadastro/">Fazer cadastro</a></div></div>
  <figure class="quem-foto"><img src="/assets/img/fachada.webp" alt="Fachada da Herpin Embalagens e Materiais de Limpeza" width="311" height="105"><figcaption>${E.rua}, ${E.bairro}</figcaption></figure>
</div></section>
<section class="numeros"><div class="wrap"><ul>
  <li><b>${E.desde}</b><span>ano de fundação</span></li>
  <li><b>${produtos.length}</b><span>produtos no site</span></li>
  <li><b>6</b><span>departamentos</span></li>
  <li><b>Própria</b><span>frota de entrega</span></li></ul></div></section>
<section class="valores"><div class="wrap"><h2>O que a Herpin entrega</h2><dl>
  <div><dt>Competitividade e preço</dt><dd>Compra no atacado para revender ou usar no dia a dia, e varejo no balcão.</dd></div>
  <div><dt>Qualidade</dt><dd>Embalagens e produtos de limpeza de marcas conhecidas, com estoque na loja.</dd></div>
  <div><dt>Logística</dt><dd>Entrega com transporte próprio, sem depender de terceiros.</dd></div>
  <div><dt>Seriedade</dt><dd>Respeito e satisfação dos clientes e parceiros desde ${E.desde}.</dd></div></dl></div></section>`;
}

// =====================================================================
// Versão B · Balcão
// =====================================================================
const linhaB = p => `<li class="linha" data-item data-nome="${esc(norm(p.nome + ' ' + depDe(p.dep).nome))}" data-dep="${p.dep}">
  <div class="l-img">${imgP(p)}</div>
  <div class="l-nome"><h3>${p.nome}</h3><small>${depDe(p.dep).nome}</small></div>
  ${zoom(p)}
  <div class="qtd" data-qtd><button type="button" data-q="-1" aria-label="Diminuir">${ic('menos')}</button><input type="number" min="1" value="1" inputmode="numeric" aria-label="Quantidade de ${esc(p.nome)}"><button type="button" data-q="1" aria-label="Aumentar">${ic('mais')}</button></div>
  ${add(p)}</li>`;

const painelPedido = v => `<aside class="painel" aria-labelledby="t-painel"><h2 id="t-painel">${ic('lista')} Seu pedido <b data-pedido-n>0</b></h2><ul class="painel-itens" data-painel></ul><p class="painel-vazio">Adicione produtos com o botão <b>+</b>. A lista fica guardada neste aparelho.</p><a class="btn btn-ver" href="/${v}/orcamento/">Revisar e enviar ${ic('seta')}</a><a class="painel-tel" href="tel:${E.telHref}">${ic('tel')} Prefere ligar? ${E.tel}</a></aside>`;

function homeB(v) {
  const dests = destaques.map(i => porId[i]);
  return `<section class="balcao"><div class="wrap balcao-g">
  <div class="balcao-txt">
    <p class="etiqueta">Desde ${E.desde} · Goiânia</p>
    <h1>Seu pedido de embalagens e limpeza, pronto em minutos.</h1>
    <p class="lead">Ache o produto, escolha a quantidade e envie a lista no WhatsApp. A Herpin separa e entrega com transporte próprio.</p>
    ${buscaTopo(v, 'busca-grande')}
    <p class="sugest">Mais buscados: ${['Marmitex', 'Bobina', 'Filme PVC', 'Sacolas', 'Desinfetante', 'Copo'].map(s => `<a href="/${v}/produtos/?q=${encodeURIComponent(s)}">${s}</a>`).join('')}</p>
  </div>
  <div class="balcao-mosaico" aria-hidden="true">${['marmitex-aluminio', 'sacos-kraft', 'detergente', 'pratos-isopor', 'balde', 'fita', 'papel-higienico', 'bandeja-plastica', 'luva'].map((n, i) => `<span class="bm bm-${i + 1}"><img src="${corte(n)}" alt=""></span>`).join('')}<p class="balcao-selo"><b>${E.tel}</b><span>Tele-entregas</span></p></div>
</div>
</div></section>

<section class="indice"><div class="wrap">
  <h2 class="vh">Departamentos</h2>
  <ol class="indice-l">${departamentos.map((d, i) => `<li><a href="/${v}/produtos/${d.id}/"><span class="ind-n">${String(i + 1).padStart(2, '0')}</span><span class="ind-nome">${d.nome}</span><span class="ind-qt">${doDep(d.id).length}</span><span class="ind-fotos">${doDep(d.id).filter(p => p.fotos[0]).slice(0, 4).map(p => `<img src="${foto(p)}" alt="" loading="lazy">`).join('')}</span>${ic('seta')}</a></li>`).join('')}</ol>
</div></section>

<section class="rapido"><div class="wrap rapido-g">
  <div><div class="sec-cab"><h2>Pedido rápido</h2><p>Os itens que mais saem no balcão. Ajuste a quantidade e toque em adicionar.</p></div>
  <ul class="lista-linhas">${dests.map(linhaB).join('')}</ul>
  <a class="link-seta" href="/${v}/produtos/">Ver os ${produtos.length} produtos ${ic('seta')}</a></div>
  ${painelPedido(v)}
</div></section>

<section class="kitsb"><div class="wrap">
  <div class="sec-cab"><h2>Listas prontas por tipo de negócio</h2><p>Um clique coloca tudo no pedido. Depois é só ajustar as quantidades.</p></div>
  <div class="kitsb-g">${kitsDados().map((k, i) => `<details class="kitb"${i === 0 ? ' open' : ''}><summary><img src="${corte(k.capa)}" alt="" loading="lazy"><span><b>${k.nome}</b><small>${k.prods.length} itens</small></span>${ic('mais')}</summary><ul>${k.prods.map(p => `<li>${p.nome}</li>`).join('')}</ul>${kitBotao(k)}</details>`).join('')}</div>
</div></section>

<section class="tele"><div class="wrap tele-g">
  <div><p class="etiqueta">Entrega própria</p><h2>Tele-entregas com o caminhão da Herpin</h2><p>${esc(T.diferencial)}</p></div>
  <ol class="tele-passos">
    <li><b>Pedido</b><span>Site, telefone ou WhatsApp</span></li>
    <li><b>Separação</b><span>Na loja da Av. C-1</span></li>
    <li><b>Entrega</b><span>Transporte próprio</span></li>
  </ol>
</div></section>

<section class="ondeb"><div class="wrap ondeb-g"><div><p class="etiqueta">Loja e depósito</p><h2>Av. C-1, nº 1173, ao lado do Cepal</h2>${blocoContato('cont-b')}<a class="btn btn-azul" href="${E.rota}" target="_blank" rel="noopener">${ic('pin')} Traçar rota</a></div>${mapa}</div></section>`;
}

function catalogoB(v, d = null) {
  const lista = d ? doDep(d.id) : produtos;
  return `${tituloPag(v, d ? `<a href="/${v}/produtos/">Produtos</a> <span>›</span> ${d.curto}` : 'Produtos', d ? d.nome : 'Catálogo completo', d ? `${d.frase} ${lista.length} produtos.` : `${produtos.length} produtos. Busque, ajuste a quantidade e adicione ao pedido.`)}
<section class="catalogo"><div class="wrap cat-g">
  <nav class="lateral" aria-label="Departamentos"><h2>Departamentos</h2><ul><li><a href="/${v}/produtos/"${!d ? ' aria-current="page"' : ''}>Todos <span>${produtos.length}</span></a></li>${departamentos.map(x => `<li><a href="/${v}/produtos/${x.id}/"${d === x ? ' aria-current="page"' : ''}>${x.curto} <span>${doDep(x.id).length}</span></a></li>`).join('')}</ul></nav>
  <div class="cat-meio">
    <div class="filtros"><label class="busca-cat">${ic('busca')}<span class="vh">Buscar</span><input type="search" data-busca placeholder="Filtrar ${d ? 'neste departamento' : 'por nome'}" autocomplete="off"></label><p class="conta" aria-live="polite"><b data-conta>${lista.length}</b> itens</p></div>
    ${d ? `<ul class="lista-linhas">${lista.map(linhaB).join('')}</ul>` : departamentos.map(x => `<div class="cat-bloco" data-bloco="${x.id}"><h2>${x.nome}</h2><ul class="lista-linhas">${doDep(x.id).map(linhaB).join('')}</ul></div>`).join('')}
    <p class="vazio" hidden>Nada encontrado. Escreva o produto no <a href="/${v}/orcamento/">orçamento</a> ou pergunte no <a href="${waLink()}">WhatsApp</a>.</p>
  </div>
  ${painelPedido(v)}
</div></section>`;
}

function quemB(v) {
  return `${tituloPag(v, 'Quem Somos', 'Quem Somos')}
<section class="sobreb"><div class="wrap sobreb-g">
  <div><p class="grande">${esc(T.quemSomos)}</p><p>${esc(T.diferencial)}</p></div>
  <dl class="ficha"><div><dt>Fundação</dt><dd>${E.desde}</dd></div><div><dt>Atuação</dt><dd>Atacado e varejo</dd></div><div><dt>Linhas</dt><dd>Embalagens em geral, produtos de limpeza e higiene</dd></div><div><dt>Entrega</dt><dd>Transporte próprio</dd></div><div><dt>Endereço</dt><dd>${E.rua}, ${E.bairro}, ${E.cidade}</dd></div></dl>
</div></section>
<section class="sobreb-foto"><div class="wrap"><figure><img src="/assets/img/fachada.webp" alt="Fachada da loja Herpin Embalagens e Materiais de Limpeza" width="311" height="105"><figcaption>A loja da Herpin na Av. C-1, Jardim América.</figcaption></figure>
<div class="sobreb-cta"><h2>${esc(T.pedido)}</h2><a class="btn btn-azul" href="/${v}/produtos/">Abrir o catálogo ${ic('seta')}</a><a class="btn btn-sec" href="/${v}/cadastro/">Cadastrar minha empresa</a></div></div></section>`;
}

// =====================================================================
export function gerarVersao(v) {
  const p = {};
  const nomeSite = 'Herpin Embalagens';
  p.index = pagina(v, 'index', `${nomeSite} · Embalagens e produtos de limpeza em Goiânia`, `Embalagens de alumínio, isopor, papel e plástico, utensílios e produtos de limpeza no atacado e varejo em Goiânia desde ${E.desde}. Entrega com transporte próprio.`, v === 'a' ? homeA(v) : homeB(v));
  p['quem-somos'] = pagina(v, 'quem-somos', `Quem Somos · ${nomeSite}`, `A Herpin Embalagens foi fundada em ${E.desde} no Jardim América, em Goiânia.`, v === 'a' ? quemA(v) : quemB(v));
  p.produtos = pagina(v, 'produtos', `Produtos · ${nomeSite}`, `Catálogo com ${produtos.length} produtos: embalagens de alumínio, isopor, papel e plástico, utensílios e limpeza.`, v === 'a' ? catalogoA(v) : catalogoB(v));
  for (const d of departamentos) p[`produtos/${d.id}`] = pagina(v, `produtos-${d.id}`, `${d.nome} · ${nomeSite}`, `${d.frase} Herpin Embalagens, Goiânia.`, v === 'a' ? depA(v, d) : catalogoB(v, d));
  p.cadastro = pagina(v, 'cadastro', `Cadastro · ${nomeSite}`, 'Cadastre sua empresa para comprar na Herpin Embalagens.',
    `${tituloPag(v, 'Cadastro', 'Cadastro de cliente', 'Cadastre sua empresa para agilizar os próximos pedidos e entregas.')}<section class="sec-form"><div class="wrap form-g">${formSimples('Dados da empresa', camposCadastro, 'Cadastro de cliente pelo site')}<div class="form-lado"><h2>Por que se cadastrar</h2><ul class="lista-ok"><li>${ic('ok')} Pedidos mais rápidos pelo telefone e WhatsApp</li><li>${ic('ok')} Endereço de entrega já registrado</li><li>${ic('ok')} Atendimento no atacado</li></ul>${blocoContato()}</div></div></section>`);
  p.orcamento = pagina(v, 'orcamento', `Orçamento · ${nomeSite}`, 'Monte sua lista de produtos e envie o pedido de orçamento para a Herpin Embalagens.',
    `${tituloPag(v, 'Orçamento', 'Orçamento', 'Confira a lista, ajuste as quantidades e envie. A Herpin responde com preços e prazo de entrega.')}<section class="sec-form"><div class="wrap">${formPedido(v)}</div></section>`);
  p.localizacao = pagina(v, 'localizacao', `Localização · ${nomeSite}`, `${E.rua}, ${E.bairro}, ${E.cidade}.`,
    `${tituloPag(v, 'Localização', 'Localização', `${E.rua}, ${E.bairro}, ${E.cidade}, CEP ${E.cep}.`)}<section class="sec-local"><div class="wrap local-g">${mapa}<div>${blocoContato()}<a class="btn btn-azul" href="${E.rota}" target="_blank" rel="noopener">${ic('pin')} Como chegar</a><figure class="quem-foto pequena"><img src="/assets/img/fachada.webp" alt="Fachada amarela da loja" width="311" height="105" loading="lazy"><figcaption>Procure a fachada amarela.</figcaption></figure></div></div></section>`);
  p['fale-conosco'] = pagina(v, 'fale-conosco', `Fale Conosco · ${nomeSite}`, 'Fale com a Herpin Embalagens por telefone, WhatsApp ou e-mail.',
    `${tituloPag(v, 'Fale Conosco', 'Fale Conosco', esc(T.fale))}<section class="sec-form"><div class="wrap form-g">${formSimples('Mensagem', camposFale, 'Contato pelo site')}<div class="form-lado"><h2>Atendimento</h2>${blocoContato()}</div></div></section>`);
  return p;
}
