// Páginas das versões A e B. Cada versão tem header, footer e home próprios; listagem, ficha do imóvel,
// empresa, anuncie, financiamento e contato usam a mesma estrutura com o visual de cada versão (a.css / b.css).
import { empresa as E, imoveis, porId, vendas, alugueis, bairros, contaBairro, CATS, contaCat, referencias, destaquesVenda, destaquesAluguel } from './dados.mjs';

export const nomesVersao = { a: 'Tradição no Ipiranga', b: 'Portal do bairro' };

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;
const zap = msg => `https://wa.me/${E.whats}?text=${encodeURIComponent(msg)}`;

// Ícones de traço (24px), sem emoji.
const I = {
  cama: '<path d="M3 18v-6.5A2.5 2.5 0 0 1 5.5 9h13a2.5 2.5 0 0 1 2.5 2.5V18M3 15h18M6 9V6.5A1.5 1.5 0 0 1 7.5 5h9A1.5 1.5 0 0 1 18 6.5V9M3 18v1.5M21 18v1.5"/>',
  banho: '<path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2ZM6 12V5.5A1.5 1.5 0 0 1 7.5 4c.9 0 1.5.6 1.5 1.5M7 19l-1 1.5M17 19l1 1.5"/>',
  carro: '<path d="M5 16h14M5 16v2.5M19 16v2.5M4 16v-3.5L6 8a2 2 0 0 1 1.8-1h8.4A2 2 0 0 1 18 8l2 4.5V16M4 12.5h16M7.5 13.8h.01M16.5 13.8h.01"/>',
  area: '<path d="M4 4h16v16H4zM4 9h3M4 14h3M9 4v3M14 4v3"/>',
  suite: '<path d="M4 20V9l8-5 8 5v11M9 20v-6h6v6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  fone: '<path d="M5 4h3.5l1.5 4.5-2.2 1.3a11 11 0 0 0 6.4 6.4l1.3-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z"/>',
  mail: '<path d="M3.5 6h17v12h-17zM4 6.5l8 6 8-6"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  lupa: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fechar: '<path d="M6 6l12 12M18 6 6 18"/>',
  chave: '<circle cx="8" cy="15" r="4"/><path d="m11 12 8.5-8.5M16 7l2.5 2.5M14 9l2 2"/>',
  casa: '<path d="M4 11.5 12 5l8 6.5V20H4z"/><path d="M10 20v-5h4v5"/>',
  doc: '<path d="M7 3.5h7l4 4V20.5H7z"/><path d="M14 3.5v4h4M10 12h5M10 15.5h5"/>',
  banco: '<path d="M4 10h16M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3.5 20.5h17M12 3.5 20 8H4z"/>',
  foto: '<path d="M4 7.5h3.5L9 5.5h6l1.5 2H20V19H4z"/><circle cx="12" cy="13" r="3.5"/>',
  pessoa: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
};
const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const icWhats = '<svg class="ic" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.8 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3Z"/></svg>';

const reais = s => { const n = Number(String(s).replace(/\./g, '').replace(',', '.')); return n ? 'R$ ' + n.toLocaleString('pt-BR', { maximumFractionDigits: 0 }) : s; };
const negTxt = i => i.negocio === 'venda' ? 'à venda' : 'para alugar';
const precoHtml = i => i.negocio === 'aluguel' ? `${esc(i.precoTxt)}<small>/mês</small>` : esc(i.precoTxt);
const specs = i => [
  i.quartos && [ic('cama'), plural(i.quartos, 'quarto', 'quartos')],
  i.suites && [ic('suite'), plural(i.suites, 'suíte', 'suítes')],
  i.banheiros && [ic('banho'), plural(i.banheiros, 'banheiro', 'banheiros')],
  i.vagas && [ic('carro'), plural(i.vagas, 'vaga', 'vagas')],
  i.area && [ic('area'), `${i.area} m²`],
].filter(Boolean);
const specsCurtas = i => specs(i).filter((_, k) => k !== 1).slice(0, 4);

// Card de imóvel com os data-* que a busca usa (site.js).
const dataAttrs = i => `data-negocio="${i.negocio}" data-cat="${i.cat}" data-bairro="${esc(i.bairro)}" data-preco="${i.preco || 0}" data-quartos="${i.quartos || 0}" data-area="${i.area || 0}" data-cod="${esc(i.cod.toLowerCase())}" data-id="${i.id}"`;
const cardImovel = (v, i, extra = '') => `<article class="im-card" ${dataAttrs(i)}${extra}>
  <a class="im-foto" href="/${v}/imovel/${i.id}/"><img src="${i.fotos[0]}" alt="${esc(`${i.tipo} ${negTxt(i)} no ${i.bairro}`)}" loading="lazy" decoding="async" width="600" height="450"><span class="im-neg im-neg-${i.negocio}">${i.negocio === 'venda' ? 'Venda' : 'Aluguel'}</span>${i.fotos.length > 1 ? `<span class="im-nfotos">${ic('foto')}${i.fotos.length}</span>` : ''}</a>
  <div class="im-info">
    <p class="im-tipo">${esc(i.tipo)} · ${esc(i.bairro)}</p>
    <h3 class="im-tit"><a href="/${v}/imovel/${i.id}/">${esc(i.titulo)}</a></h3>
    <ul class="im-specs">${specsCurtas(i).map(([ico, t]) => `<li>${ico}${t}</li>`).join('')}</ul>
    <p class="im-preco">${precoHtml(i)}</p>
    <p class="im-cod">Cód. ${esc(i.cod)}</p>
  </div>
</article>`;

const fontes = {
  a: 'https://fonts.googleapis.com/css2?family=Arimo:wght@500;700&family=Inter:wght@400;500;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Open+Sans:wdth,wght@75,600;75,700;75,800&family=Source+Sans+3:wght@400;600;700&display=swap',
};

function head(v, { titulo, desc, slug }) {
  const url = `${E.url}${v}/${slug ? slug + '/' : ''}`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(E.nome)}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#003b75">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontes[v]}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>
<body class="v-${v}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>`;
}

const NAV = [
  ['', 'Início'], ['empresa', 'Empresa'], ['imoveis/?negocio=venda', 'Comprar'], ['imoveis/?negocio=aluguel', 'Alugar'],
  ['anuncie', 'Anuncie seu imóvel'], ['financiamento', 'Financiamento'], ['contato', 'Fale conosco'],
];
const navLinks = (v, atual) => NAV.map(([s, n]) => {
  const base = s.split('/')[0];
  const ativo = atual === base && (base !== 'imoveis' || n === 'Comprar') ? ' aria-current="page"' : '';
  return `<a href="/${v}/${s}"${ativo}>${n}</a>`;
}).join('');

function header(v, atual) {
  if (v === 'a') return `<div class="topo-info"><div class="w">
  <span>Corretor credenciado · CRECI ${E.creci}</span>
  <span class="ti-dir"><a href="tel:${E.telHref}">${ic('fone')}${E.tel}</a><a href="${zap('Olá! Vim pelo site da Alexandre Augusto Imóveis.')}" target="_blank" rel="noopener">${icWhats}${E.cel}</a><a href="/a/contato/#trabalhe">Venha trabalhar conosco</a></span>
</div></div>
<header class="cab"><div class="w cab-in">
  <a class="logo" href="/a/" aria-label="${esc(E.nome)}, início"><img src="/assets/logo.svg" alt="${esc(E.nome)}" width="265" height="54"></a>
  <nav class="menu" id="menu" aria-label="Principal">${navLinks(v, atual)}</nav>
  <a class="btn btn-red cab-cta" href="${zap('Olá! Vim pelo site da Alexandre Augusto Imóveis.')}" target="_blank" rel="noopener">${icWhats}WhatsApp</a>
  <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
  return `<header class="cab"><div class="w cab-in">
  <a class="logo" href="/b/" aria-label="${esc(E.nome)}, início"><img src="/assets/logo-branco.svg" alt="${esc(E.nome)}" width="245" height="50"></a>
  <nav class="menu" id="menu" aria-label="Principal">${navLinks(v, atual)}</nav>
  <div class="cab-acoes"><a class="cab-tel" href="tel:${E.telHref}">${ic('fone')}<span>${E.tel}</span></a><a class="btn btn-red" href="${zap('Olá! Vim pelo site da Alexandre Augusto Imóveis.')}" target="_blank" rel="noopener">${icWhats}<span>WhatsApp</span></a></div>
  <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function footer(v) {
  const col1 = `<div class="rod-marca"><img src="/assets/logo-branco.svg" alt="${esc(E.nome)}" width="230" height="47" loading="lazy"><p>${esc(E.especialidade)}. Venda, locação e administração de imóveis há mais de ${E.anos} anos.</p><p class="rod-creci">CRECI ${E.creci}</p></div>`;
  const col2 = `<div><h2>Imóveis</h2><a href="/${v}/imoveis/?negocio=venda">Comprar (${vendas.length})</a><a href="/${v}/imoveis/?negocio=aluguel">Alugar (${alugueis.length})</a>${CATS.map(c => `<a href="/${v}/imoveis/?tipo=${c.k}">${c.n}</a>`).join('')}</div>`;
  const col3 = `<div><h2>A imobiliária</h2><a href="/${v}/empresa/">Empresa</a><a href="/${v}/anuncie/">Anuncie seu imóvel</a><a href="/${v}/financiamento/">Financiamento e consórcio</a><a href="/${v}/contato/#trabalhe">Trabalhe conosco</a><a href="/${v}/contato/">Fale conosco</a></div>`;
  const col4 = `<div class="rod-contato"><h2>Escritório</h2><p>${ic('pin')}<span>${esc(E.rua)}<br>${E.bairro} · ${E.cidade}</span></p><p>${ic('fone')}<a href="tel:${E.telHref}">${E.tel}</a></p><p>${icWhats}<a href="${zap('Olá! Vim pelo site.')}" target="_blank" rel="noopener">${E.cel}</a></p><p>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p><a class="rod-mapa" href="${E.mapa}" target="_blank" rel="noopener">Veja como chegar ${ic('seta')}</a></div>`;
  return `<footer class="rod"><div class="w rod-in">${col1}${col2}${col3}${col4}</div>
<div class="w rod-base"><span>© ${new Date().getFullYear()} ${esc(E.nome)}. Todos os direitos reservados.</span><span>CRECI ${E.creci}</span></div></footer>
<a class="zap-flut" href="${zap('Olá! Vim pelo site da Alexandre Augusto Imóveis.')}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${icWhats}</a>
</body>
</html>`;
}

const pagina = (v, meta, atual, corpo) => `${head(v, meta)}
${header(v, atual)}
<main id="conteudo">
${corpo}
</main>
${footer(v)}`;

// Busca: campos iguais aos do site atual (negócio, tipo, bairro, valor, código) mais quartos.
const opt = (val, txt) => `<option value="${esc(val)}">${esc(txt)}</option>`;
const camposBusca = (comCodigo = true) => `
  <label class="cb"><span>Tipo</span><select name="tipo">${opt('', 'Todos')}${CATS.map(c => opt(c.k, c.n)).join('')}</select></label>
  <label class="cb"><span>Bairro</span><select name="bairro">${opt('', 'Todos')}${bairros.map(b => opt(b, b)).join('')}</select></label>
  <label class="cb"><span>Quartos</span><select name="quartos">${opt('', 'Qualquer')}${[1, 2, 3, 4].map(n => opt(n, `${n}+`)).join('')}</select></label>
  <label class="cb"><span>Valor até</span><input name="max" inputmode="numeric" placeholder="R$ sem limite" autocomplete="off"></label>
  ${comCodigo ? '<label class="cb"><span>Código</span><input name="codigo" placeholder="Ex.: SOBR2801" autocomplete="off"></label>' : ''}`;
const formBusca = (v, cls = '') => `<form class="busca ${cls}" action="/${v}/imoveis/" method="get" role="search">
  <div class="busca-neg" role="radiogroup" aria-label="Negócio">
    <label><input type="radio" name="negocio" value="venda" checked><span>Comprar</span></label>
    <label><input type="radio" name="negocio" value="aluguel"><span>Alugar</span></label>
  </div>
  <div class="busca-campos">${camposBusca()}<button class="btn btn-red busca-ok" type="submit">${ic('lupa')}Buscar</button></div>
</form>`;

// ---------- Home A: clássica, próxima da estrutura atual (banner do museu, busca, destaques, listas) ----------
function homeA() {
  const v = 'a';
  return pagina(v, { titulo: `${E.nome} · Imóveis à venda e para alugar no Ipiranga, São Paulo`, desc: `${E.especialidade}. ${vendas.length} imóveis à venda e ${alugueis.length} para alugar: sobrados, apartamentos, casas e salões comerciais. CRECI ${E.creci}.`, slug: '' }, '', `
<section class="a-hero">
  <div class="w a-hero-in">
    <figure class="a-hero-foto"><img src="/assets/img/museu-ipiranga.webp" alt="Museu do Ipiranga" width="1004" height="350" fetchpriority="high"></figure>
    <div class="a-hero-txt">
      <p class="eyebrow">CRECI ${E.creci} · Ipiranga, São Paulo</p>
      <h1>${E.especialidade}.</h1>
      <p class="a-hero-sub">${E.slogan.replace('!', '')} para comprar, alugar ou anunciar, com quem conhece cada rua do bairro.</p>
    </div>
  </div>
  <div class="w">${formBusca(v, 'a-busca')}</div>
</section>

<section class="a-num"><div class="w a-num-in">
  <p><strong>${imoveis.length}</strong><span>imóveis na carteira</span></p>
  <p><strong>${vendas.length}</strong><span>à venda</span></p>
  <p><strong>${alugueis.length}</strong><span>para alugar</span></p>
  <p><strong>+${E.anos}</strong><span>anos no Ipiranga</span></p>
</div></section>

<section class="sec a-dest" data-abas>
  <div class="w">
    <div class="sec-topo">
      <div><p class="eyebrow">Selecionados</p><h2>Imóveis em destaque</h2></div>
      <div class="abas" role="tablist"><button role="tab" aria-selected="true" data-aba="venda">À venda</button><button role="tab" aria-selected="false" data-aba="aluguel">Para alugar</button></div>
    </div>
    <div class="grade-im" data-painel="venda">${destaquesVenda.map(i => cardImovel(v, i)).join('')}</div>
    <div class="grade-im" data-painel="aluguel" hidden>${destaquesAluguel.map(i => cardImovel(v, i)).join('')}</div>
    <p class="sec-mais"><a class="btn btn-azul" href="/a/imoveis/">Ver todos os ${imoveis.length} imóveis ${ic('seta')}</a></p>
  </div>
</section>

<section class="sec a-tipos"><div class="w">
  <div class="sec-topo"><div><p class="eyebrow">Por tipo</p><h2>O que você procura?</h2></div></div>
  <div class="a-tipos-grade">${CATS.map((c, k) => `<a class="a-tipo${k === 0 ? ' a-tipo-g' : ''}" href="/a/imoveis/?tipo=${c.k}"><img src="${porId[c.foto].fotos[0]}" alt="" loading="lazy"><span class="a-tipo-txt"><strong>${c.n}</strong><span>${plural(contaCat(c.k), 'imóvel', 'imóveis')} ${ic('seta')}</span></span></a>`).join('')}</div>
</div></section>

<section class="a-bairro"><div class="w a-bairro-in">
  <div class="a-bairro-txt">
    <p class="eyebrow eyebrow-claro">Morar no Ipiranga</p>
    <h2>História, metrô e verde a poucas quadras.</h2>
    <p>O Ipiranga é o nosso bairro há mais de ${E.anos} anos. Os imóveis da carteira ficam perto do que faz a diferença no dia a dia:</p>
    <a class="btn btn-red" href="/a/imoveis/?bairro=Ipiranga">Imóveis no Ipiranga (${contaBairro('Ipiranga')}) ${ic('seta')}</a>
  </div>
  <ol class="a-linha">${referencias.map(r => `<li><strong>${esc(r.nome)}</strong><span>${esc(r.txt)}</span></li>`).join('')}</ol>
</div></section>

<section class="sec a-lista"><div class="w">
  <div class="sec-topo"><div><p class="eyebrow">Para comprar</p><h2>Imóveis à venda</h2></div><a class="link-seta" href="/a/imoveis/?negocio=venda">Ver os ${vendas.length} ${ic('seta')}</a></div>
  <div class="a-trilho" data-trilho>${vendas.filter(i => !destaquesVenda.includes(i)).slice(0, 10).map(i => cardImovel(v, i)).join('')}</div>
</div></section>

<section class="sec a-lista a-lista-alt"><div class="w">
  <div class="sec-topo"><div><p class="eyebrow">Para alugar</p><h2>Imóveis para locação</h2></div><a class="link-seta" href="/a/imoveis/?negocio=aluguel">Ver os ${alugueis.length} ${ic('seta')}</a></div>
  <div class="a-trilho" data-trilho>${alugueis.filter(i => !destaquesAluguel.includes(i)).slice(0, 10).map(i => cardImovel(v, i)).join('')}</div>
</div></section>

<section class="sec a-empresa"><div class="w a-empresa-in">
  <div class="a-emp-selo"><img src="/assets/aa.svg" alt="" width="97" height="107"><p><strong>+${E.anos}</strong>anos de Ipiranga</p></div>
  <div class="a-emp-txt">
    <p class="eyebrow">A imobiliária</p>
    <h2>Atendimento com cordialidade e competência.</h2>
    <p>${esc(E.sobre)}</p>
    <ul class="a-serv">${E.servicos.map(s => `<li>${ic('check')}${s}</li>`).join('')}<li>${ic('check')}Financiamento com os principais bancos</li></ul>
    <a class="link-seta" href="/a/empresa/">Conheça a empresa ${ic('seta')}</a>
  </div>
</div></section>

<section class="a-faixa"><div class="w a-faixa-in">
  <div><h2>Quer vender ou alugar o seu imóvel?</h2><p>Cadastre os dados e as fotos e a nossa equipe entra em contato.</p></div>
  <a class="btn btn-red" href="/a/anuncie/">Anuncie seu imóvel ${ic('seta')}</a>
</div></section>`);
}

// ---------- Home B: portal do bairro, azul dominante, busca grande e mosaico de fotos reais ----------
function homeB() {
  const v = 'b';
  const mosaico = [20, 41, 61, 40];
  const recentes = imoveis.slice().sort((a, b) => b.id - a.id).slice(0, 9);
  return pagina(v, { titulo: `${E.nome} · Os melhores imóveis do Ipiranga`, desc: `Compre ou alugue no Ipiranga e região: ${imoveis.length} imóveis com fotos, ficha completa e atendimento pelo WhatsApp. CRECI ${E.creci}.`, slug: '' }, '', `
<section class="b-hero"><div class="w b-hero-in">
  <div class="b-hero-txt">
    <p class="b-selo">${ic('pin')}${E.especialidade}</p>
    <h1>${E.slogan.replace('!', '.')}</h1>
    <p class="b-hero-sub">${vendas.length} imóveis à venda e ${alugueis.length} para alugar no Ipiranga, Vila Mariana, Jardim da Saúde e região, todos com fotos e ficha completa.</p>
  </div>
  <div class="b-mosaico" aria-hidden="true">${mosaico.map((id, k) => `<a href="/b/imovel/${id}/" tabindex="-1" class="b-mos b-mos-${k + 1}"><img src="${porId[id].fotos[0]}" alt="" ${k ? 'loading="lazy"' : 'fetchpriority="high"'}><span>${esc(porId[id].tipo)} · ${precoHtml(porId[id])}</span></a>`).join('')}</div>
  ${formBusca(v, 'b-busca')}
</div></section>

<section class="b-bairros"><div class="w">
  <p class="b-bairros-tit">Buscar por bairro</p>
  <div class="b-chips">${bairros.map(b => `<a class="chip" href="/b/imoveis/?bairro=${encodeURIComponent(b)}">${esc(b)} <span>${contaBairro(b)}</span></a>`).join('')}</div>
</div></section>

<section class="sec b-novos"><div class="w">
  <div class="sec-topo"><div><h2>Chegaram na carteira</h2><p class="sec-sub">Os últimos imóveis cadastrados, de venda e de locação.</p></div><a class="link-seta" href="/b/imoveis/">Ver todos ${ic('seta')}</a></div>
  <div class="b-grade">${recentes.map((i, k) => cardImovel(v, i, k === 0 ? ' data-largo' : '')).join('')}</div>
</div></section>

<section class="b-duplo"><div class="w b-duplo-in">
  <a class="b-lado b-lado-venda" href="/b/imoveis/?negocio=venda"><img src="${porId[2].fotos[0]}" alt="" loading="lazy"><span class="b-lado-txt"><small>Comprar</small><strong>${vendas.length} imóveis à venda</strong><span>De R$ ${Math.min(...vendas.map(i => i.preco)).toLocaleString('pt-BR')} a R$ ${Math.max(...vendas.map(i => i.preco)).toLocaleString('pt-BR')} ${ic('seta')}</span></span></a>
  <a class="b-lado b-lado-aluguel" href="/b/imoveis/?negocio=aluguel"><img src="${porId[56].fotos[0]}" alt="" loading="lazy"><span class="b-lado-txt"><small>Alugar</small><strong>${alugueis.length} imóveis para locação</strong><span>Cadastro analisado com a Porto Seguro ${ic('seta')}</span></span></a>
</div></section>

<section class="sec b-passos"><div class="w">
  <div class="sec-topo"><div><h2>Anuncie com a Alexandre Augusto</h2><p class="sec-sub">O cadastro é o mesmo do nosso site: em poucos minutos o seu imóvel chega à nossa equipe.</p></div></div>
  <ol class="b-etapas">
    <li><span class="b-n">1</span>${ic('pessoa')}<h3>Seus dados</h3><p>Nome, e-mail e telefone do proprietário.</p></li>
    <li><span class="b-n">2</span>${ic('casa')}<h3>O imóvel</h3><p>Endereço, cômodos, vagas e dados do condomínio.</p></li>
    <li><span class="b-n">3</span>${ic('foto')}<h3>Fotos</h3><p>Até 8 fotos, enviadas pelo WhatsApp.</p></li>
    <li><span class="b-n">4</span>${ic('chave')}<h3>Venda ou locação</h3><p>Nossa equipe entra em contato e cuida do resto.</p></li>
  </ol>
  <p class="sec-mais"><a class="btn btn-red" href="/b/anuncie/">Começar o cadastro ${ic('seta')}</a></p>
</div></section>

<section class="b-fin"><div class="w b-fin-in">
  <div>
    <h2>Simule o seu financiamento</h2>
    <p>${esc(E.financiamento)}</p>
    <ul class="b-bancos">${E.bancos.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
  </div>
  ${simulador('b-sim')}
</div></section>

<section class="sec b-sobre"><div class="w b-sobre-in">
  <figure><img src="/assets/img/museu-ipiranga.webp" alt="Museu do Ipiranga" loading="lazy" width="1004" height="350"></figure>
  <div><h2>Há mais de ${E.anos} anos no Ipiranga.</h2><p>${esc(E.sobre)}</p><a class="link-seta" href="/b/empresa/">Sobre a empresa ${ic('seta')}</a></div>
</div></section>`);
}

// Simulador de financiamento (tabela SAC e Price), só estimativa.
const simulador = cls => `<form class="sim ${cls}" data-sim>
  <div class="sim-campos">
    <label><span>Valor do imóvel</span><input name="valor" inputmode="numeric" value="600.000"></label>
    <label><span>Entrada</span><input name="entrada" inputmode="numeric" value="120.000"></label>
    <label><span>Prazo</span><select name="anos">${[10, 15, 20, 25, 30, 35].map(n => `<option value="${n}"${n === 30 ? ' selected' : ''}>${n} anos</option>`).join('')}</select></label>
    <label><span>Juros ao ano</span><input name="juros" inputmode="decimal" value="11,5"></label>
  </div>
  <div class="sim-res" aria-live="polite">
    <p><small>Primeira parcela SAC</small><strong data-sac>—</strong></p>
    <p><small>Parcela fixa Price</small><strong data-price>—</strong></p>
    <p class="sim-fin"><small>Valor financiado</small><span data-fin>—</span></p>
  </div>
  <p class="sim-nota">Estimativa sem seguros e taxas. A taxa e a aprovação dependem do banco; a simulação oficial é feita com os nossos correspondentes.</p>
  <a class="btn btn-red" data-sim-zap href="${zap('Olá! Quero uma simulação de financiamento.')}" target="_blank" rel="noopener">${icWhats}Pedir simulação oficial</a>
</form>`;

// ---------- Listagem com filtros ----------
function listagem(v) {
  const filtros = `<form class="filtros" data-filtros role="search" aria-label="Filtrar imóveis">
    <div class="busca-neg" role="radiogroup" aria-label="Negócio">
      <label><input type="radio" name="negocio" value="" checked><span>Todos</span></label>
      <label><input type="radio" name="negocio" value="venda"><span>Comprar</span></label>
      <label><input type="radio" name="negocio" value="aluguel"><span>Alugar</span></label>
    </div>
    ${camposBusca()}
    <label class="cb"><span>Ordenar</span><select name="ordem">${opt('', 'Mais recentes')}${opt('menor', 'Menor preço')}${opt('maior', 'Maior preço')}${opt('area', 'Maior área')}</select></label>
    <button class="btn btn-linha" type="reset">Limpar filtros</button>
  </form>`;
  const lista = imoveis.slice().sort((a, b) => b.id - a.id);
  return pagina(v, { titulo: `Imóveis à venda e para alugar no Ipiranga · ${E.nome}`, desc: `${imoveis.length} imóveis no Ipiranga e região: ${vendas.length} à venda e ${alugueis.length} para alugar. Filtre por tipo, bairro, quartos, valor ou código.`, slug: 'imoveis' }, 'imoveis', `
<section class="pag-topo"><div class="w">
  <p class="migalha"><a href="/${v}/">Início</a> / Imóveis</p>
  <h1 data-titulo-lista>Imóveis à venda e para alugar</h1>
  <p class="pag-sub"><strong data-conta>${lista.length}</strong> <span data-conta-txt>imóveis encontrados</span></p>
</div></section>
<section class="sec lista-sec"><div class="w lista-in">
  <aside class="lista-filtros">${filtros}</aside>
  <div>
    <div class="grade-im grade-lista" data-lista>${lista.map(i => cardImovel(v, i)).join('')}</div>
    <div class="lista-vazia" data-vazio hidden><h2>Nenhum imóvel com esses filtros.</h2><p>Fale com a gente: muitos imóveis chegam antes de entrar no site.</p><a class="btn btn-red" href="${zap('Olá! Procuro um imóvel no Ipiranga.')}" target="_blank" rel="noopener">${icWhats}Contar o que procuro</a></div>
  </div>
</div></section>`);
}

// ---------- Ficha do imóvel ----------
function fichaImovel(v, i) {
  const msg = `Olá! Tenho interesse no imóvel Cód. ${i.cod} (${i.tipo} ${negTxt(i)} no ${i.bairro}, ${i.precoTxt}${i.negocio === 'aluguel' ? '/mês' : ''}).`;
  const parecidos = imoveis.filter(o => o.id !== i.id && o.negocio === i.negocio && o.cat === i.cat).slice(0, 3);
  const completa = parecidos.length < 3 ? imoveis.filter(o => o.id !== i.id && o.negocio === i.negocio && !parecidos.includes(o)).slice(0, 3 - parecidos.length) : [];
  const ficha = [
    ['Quartos', i.quartos], ['Suítes', i.suites], ['Banheiros', i.banheiros], ['Salas', i.salas], ['Vagas', i.vagas],
    ['Área', i.area && `${i.area} m²`], ['Terreno', i.terreno && `${i.terreno} m²`], ['Andares', i.andares],
    ['Condomínio', i.condominio && reais(i.condominio)], ['IPTU', i.iptu && reais(i.iptu)],
  ].filter(([, x]) => x);
  return pagina(v, {
    titulo: `${i.tipo} ${negTxt(i)} no ${i.bairro} · ${i.precoTxt} · Cód. ${i.cod}`,
    desc: `${i.titulo}. ${specsCurtas(i).map(([, t]) => t).join(', ')}. ${E.nome}, CRECI ${E.creci}.`.slice(0, 300),
    slug: `imovel/${i.id}`,
  }, 'imoveis', `
<section class="ficha-topo"><div class="w">
  <p class="migalha"><a href="/${v}/">Início</a> / <a href="/${v}/imoveis/?negocio=${i.negocio}">Imóveis ${i.negocio === 'venda' ? 'à venda' : 'para alugar'}</a> / ${esc(i.bairro)}</p>
  <div class="ficha-cab">
    <div><p class="im-tipo">${esc(i.tipo)} ${negTxt(i)} · ${esc(i.bairro)}, São Paulo</p><h1>${esc(i.titulo)}</h1></div>
    <div class="ficha-preco"><small>${i.negocio === 'venda' ? 'Valor de venda' : 'Aluguel'}</small><strong>${precoHtml(i)}</strong><span>Cód. ${esc(i.cod)}</span></div>
  </div>
</div></section>
<section class="galeria-sec"><div class="w">
  <div class="galeria" data-galeria>
    <button class="gal-principal" data-gal-abrir="0" aria-label="Ampliar foto" style="--f:url(${i.fotos[0]})"><img src="${i.fotos[0]}" alt="${esc(`${i.tipo} ${negTxt(i)} no ${i.bairro}, foto 1`)}" data-gal-img></button>
    ${i.fotos.length > 1 ? `<div class="gal-miniaturas">${i.fotos.map((f, k) => `<button data-gal-ir="${k}"${k === 0 ? ' aria-current="true"' : ''} aria-label="Foto ${k + 1}"><img src="${f}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
  </div>
</div></section>
<section class="sec ficha-sec"><div class="w ficha-in">
  <div class="ficha-corpo">
    ${specs(i).length ? `<ul class="ficha-specs">${specs(i).map(([ico, t]) => `<li>${ico}<span>${t}</span></li>`).join('')}</ul>` : ''}
    ${i.desc.length ? `<h2>Sobre o imóvel</h2>${i.desc.map(p => `<p>${esc(p)}</p>`).join('')}` : ''}
    ${i.destaqueLocal ? `<p class="ficha-local">${ic('pin')}${esc(i.destaqueLocal)}</p>` : ''}
    ${ficha.length ? `<h2>Ficha</h2><dl class="ficha-dl">${ficha.map(([k, x]) => `<div><dt>${k}</dt><dd>${esc(x)}</dd></div>`).join('')}</dl>` : ''}
    ${i.extras.length ? `<h2>Diferenciais</h2><ul class="ficha-extras">${i.extras.map(x => `<li>${ic('check')}${esc(x)}</li>`).join('')}</ul>` : ''}
  </div>
  <aside class="ficha-lado">
    <div class="ficha-contato">
      <h2>Gostou deste imóvel?</h2>
      <p>Agende uma visita ou tire as suas dúvidas com a nossa equipe.</p>
      <a class="btn btn-red btn-cheio" href="${zap(msg)}" target="_blank" rel="noopener">${icWhats}Falar no WhatsApp</a>
      <a class="btn btn-linha btn-cheio" href="tel:${E.telHref}">${ic('fone')}${E.tel}</a>
      <form class="form-mini" data-zap data-zap-msg="${esc(msg)}">
        <label><span>Nome</span><input name="Nome" required autocomplete="name"></label>
        <label><span>Telefone</span><input name="Telefone" required inputmode="tel" autocomplete="tel"></label>
        <label><span>Mensagem</span><textarea name="Mensagem" rows="3">Quero agendar uma visita.</textarea></label>
        <button class="btn btn-azul btn-cheio" type="submit">Enviar mensagem</button>
      </form>
      <p class="ficha-creci">${esc(E.nome)} · CRECI ${E.creci}</p>
    </div>
  </aside>
</div></section>
<section class="sec parecidos"><div class="w">
  <div class="sec-topo"><div><h2>Imóveis parecidos</h2></div><a class="link-seta" href="/${v}/imoveis/?negocio=${i.negocio}&amp;tipo=${i.cat}">Ver mais ${ic('seta')}</a></div>
  <div class="grade-im grade-3">${[...parecidos, ...completa].map(o => cardImovel(v, o)).join('')}</div>
</div></section>
<dialog class="lightbox" data-lightbox aria-label="Fotos do imóvel">
  <button class="lb-fechar" data-lb-fechar aria-label="Fechar">${ic('fechar')}</button>
  <button class="lb-nav lb-ant" data-lb-ant aria-label="Foto anterior">${ic('seta')}</button>
  <img data-lb-img alt="">
  <button class="lb-nav lb-prox" data-lb-prox aria-label="Próxima foto">${ic('seta')}</button>
  <p class="lb-conta" data-lb-conta></p>
  <script type="application/json" data-fotos>${JSON.stringify(i.fotos)}</script>
</dialog>`);
}

// ---------- Empresa ----------
function paginaEmpresa(v) {
  return pagina(v, { titulo: `Empresa · ${E.nome}`, desc: `${E.nome}: há mais de ${E.anos} anos no Ipiranga, com venda, locação e administração de imóveis. CRECI ${E.creci}.`, slug: 'empresa' }, 'empresa', `
<section class="pag-topo pag-topo-foto"><div class="w">
  <p class="migalha"><a href="/${v}/">Início</a> / Empresa</p>
  <h1>Há mais de ${E.anos} anos no Ipiranga.</h1>
  <p class="pag-sub">${esc(E.especialidade)}. Venda, locação e administração de imóveis.</p>
</div></section>
<section class="sec emp-sec"><div class="w emp-in">
  <div class="emp-txt">
    <h2>Quem somos</h2>
    <p class="emp-lead">${esc(E.sobre)}</p>
    <div class="emp-fatos">
      <p><strong>+${E.anos}</strong><span>anos atuando no Ipiranga</span></p>
      <p><strong>${imoveis.length}</strong><span>imóveis na carteira hoje</span></p>
      <p><strong>${E.creci}</strong><span>CRECI do corretor credenciado</span></p>
    </div>
  </div>
  <figure class="emp-foto"><img src="/assets/img/museu-ipiranga.webp" alt="Museu do Ipiranga" loading="lazy" width="1004" height="350"><figcaption>O Museu do Ipiranga, a poucas quadras do nosso escritório na Rua Clemente Pereira.</figcaption></figure>
</div></section>
<section class="sec emp-serv"><div class="w">
  <h2>O que fazemos</h2>
  <div class="emp-serv-grade">
    <article>${ic('casa')}<h3>Venda</h3><p>Sobrados, casas, apartamentos e imóveis comerciais, inclusive opções exclusivas de alto padrão.</p><a class="link-seta" href="/${v}/imoveis/?negocio=venda">${vendas.length} à venda ${ic('seta')}</a></article>
    <article>${ic('chave')}<h3>Locação</h3><p>${esc(E.locacao)}</p><a class="link-seta" href="/${v}/imoveis/?negocio=aluguel">${alugueis.length} para alugar ${ic('seta')}</a></article>
    <article>${ic('doc')}<h3>Administração</h3><p>Para quem quer alugar sem se preocupar: fale com a nossa equipe sobre a administração do seu imóvel.</p><a class="link-seta" href="/${v}/anuncie/">Anunciar meu imóvel ${ic('seta')}</a></article>
    <article>${ic('banco')}<h3>Financiamento</h3><p>${esc(E.financiamento)}</p><a class="link-seta" href="/${v}/financiamento/">Simular ${ic('seta')}</a></article>
  </div>
</div></section>
${faixaContato(v)}`);
}

const faixaContato = v => `<section class="faixa-contato"><div class="w faixa-contato-in">
  <div><h2>Venha nos visitar</h2><p>${ic('pin')}${esc(E.endereco)}</p></div>
  <div class="faixa-botoes"><a class="btn btn-red" href="${zap('Olá! Quero agendar um atendimento.')}" target="_blank" rel="noopener">${icWhats}WhatsApp</a><a class="btn btn-claro" href="${E.mapa}" target="_blank" rel="noopener">Veja como chegar ${ic('seta')}</a></div>
</div></section>`;

// ---------- Anuncie (mesmos campos do formulário atual) ----------
function paginaAnuncie(v) {
  const c = (n, l, extra = '') => `<label><span>${l}</span><input name="${esc(n)}" ${extra}></label>`;
  const s = (n, l, ops) => `<label><span>${l}</span><select name="${esc(n)}">${ops.map(o => opt(o, o || 'Selecione')).join('')}</select></label>`;
  return pagina(v, { titulo: `Anuncie seu imóvel · ${E.nome}`, desc: `Quer vender ou alugar seu imóvel no Ipiranga? Cadastre os dados do imóvel e a equipe da ${E.nome} entra em contato.`, slug: 'anuncie' }, 'anuncie', `
<section class="pag-topo"><div class="w">
  <p class="migalha"><a href="/${v}/">Início</a> / Anuncie seu imóvel</p>
  <h1>Anuncie seu imóvel</h1>
  <p class="pag-sub">Venda ou locação no Ipiranga e região. Preencha o que souber; o resto a gente vê junto.</p>
</div></section>
<section class="sec"><div class="w anuncie-in">
  <form class="form-grande" data-zap data-zap-msg="Olá! Quero anunciar meu imóvel com a Alexandre Augusto Imóveis.">
    <fieldset><legend><span>1</span>Dados do proprietário</legend><div class="fg">
      ${c('Nome do proprietário', 'Nome', 'required autocomplete="name"')}${c('E-mail', 'E-mail', 'type="email" autocomplete="email"')}${c('Telefone', 'Telefone', 'required inputmode="tel" autocomplete="tel"')}
    </div></fieldset>
    <fieldset><legend><span>2</span>Dados do imóvel</legend><div class="fg">
      ${s('Negócio', 'Quero', ['', 'Vender', 'Alugar', 'Vender ou alugar'])}${s('Tipo', 'Tipo', ['', 'Apartamento', 'Casa', 'Sobrado', 'Cobertura', 'Galpão', 'Salão comercial'])}
      ${c('CEP', 'CEP', 'inputmode="numeric" autocomplete="postal-code"')}${c('Endereço', 'Endereço', 'autocomplete="street-address"')}${c('Número', 'Número')}${c('Complemento', 'Complemento')}${c('Bairro', 'Bairro')}${c('Valor pretendido', 'Valor pretendido', 'inputmode="numeric"')}
    </div></fieldset>
    <fieldset><legend><span>3</span>Cômodos e serviços</legend><div class="fg fg-4">
      ${c('Dormitórios', 'Dormitórios', 'inputmode="numeric"')}${c('Suítes', 'Suítes', 'inputmode="numeric"')}${c('Banheiros', 'Banheiros', 'inputmode="numeric"')}${c('Vagas', 'Vagas', 'inputmode="numeric"')}
      ${s('Vaga coberta', 'Vaga coberta?', ['', 'Sim', 'Não'])}${c('Área (m²)', 'Área (m²)', 'inputmode="numeric"')}
    </div></fieldset>
    <fieldset><legend><span>4</span>Condomínio</legend><div class="fg">
      ${s('Em condomínio', 'É condomínio?', ['', 'Sim', 'Não'])}${c('Nome do condomínio', 'Nome do condomínio')}${c('Torre', 'Nome da torre')}${c('Elevadores', 'Elevadores', 'inputmode="numeric"')}${c('Andares por torre', 'Andares por torre', 'inputmode="numeric"')}${c('Número de torres', 'Número de torres', 'inputmode="numeric"')}
    </div></fieldset>
    <fieldset><legend><span>5</span>Observações e fotos</legend>
      <label class="fg-cheio"><span>Observações</span><textarea name="Observações" rows="4" placeholder="Condomínio, IPTU, estado do imóvel, melhor horário para visita..."></textarea></label>
      <p class="form-nota">${ic('foto')}Depois de enviar, mande até 8 fotos do imóvel na mesma conversa do WhatsApp.</p>
    </fieldset>
    <button class="btn btn-red" type="submit">${icWhats}Enviar cadastro pelo WhatsApp</button>
  </form>
  <aside class="anuncie-lado">
    <h2>Por que anunciar com a gente</h2>
    <ul>
      <li>${ic('pin')}<span><strong>Especialistas no Ipiranga</strong>Mais de ${E.anos} anos no bairro.</span></li>
      <li>${ic('banco')}<span><strong>Comprador com crédito</strong>Correspondentes de Caixa, Santander, Itaú, Banco do Brasil e Bradesco.</span></li>
      <li>${ic('doc')}<span><strong>Locação segura</strong>Análise de cadastro com a Porto Seguro.</span></li>
    </ul>
    <p>Prefere falar direto? <a href="tel:${E.telHref}">${E.tel}</a> ou <a href="mailto:${E.email}">${E.email}</a></p>
  </aside>
</div></section>`);
}

// ---------- Financiamento e consórcio ----------
function paginaFinanciamento(v) {
  return pagina(v, { titulo: `Financiamento e consórcio imobiliário · ${E.nome}`, desc: `Simule o financiamento do seu imóvel: correspondentes de Caixa, Santander, Itaú, Banco do Brasil e Bradesco. Locação com análise da Porto Seguro.`, slug: 'financiamento' }, 'financiamento', `
<section class="pag-topo"><div class="w">
  <p class="migalha"><a href="/${v}/">Início</a> / Financiamento</p>
  <h1>Simulador financeiro</h1>
  <p class="pag-sub">${esc(E.financiamento)}</p>
</div></section>
<section class="sec"><div class="w fin-in">
  ${simulador('sim-grande')}
  <div class="fin-lado">
    <h2>Bancos parceiros</h2>
    <ul class="fin-bancos">${E.bancos.map(b => `<li>${ic('banco')}${esc(b)}</li>`).join('')}<li class="fin-outros">e outros</li></ul>
    <h2>Locação</h2>
    <p>${esc(E.locacao)}</p>
    <h2>Consórcio imobiliário</h2>
    <p>Também orientamos quem prefere comprar pelo consórcio imobiliário. Fale com a nossa equipe para ver as opções.</p>
    <a class="btn btn-azul" href="${zap('Olá! Quero saber sobre consórcio imobiliário.')}" target="_blank" rel="noopener">${icWhats}Perguntar sobre consórcio</a>
  </div>
</div></section>`);
}

// ---------- Contato ----------
function paginaContato(v) {
  return pagina(v, { titulo: `Fale conosco · ${E.nome}`, desc: `${E.endereco}. Telefone ${E.tel}, WhatsApp ${E.cel}, ${E.email}.`, slug: 'contato' }, 'contato', `
<section class="pag-topo"><div class="w">
  <p class="migalha"><a href="/${v}/">Início</a> / Fale conosco</p>
  <h1>Fale conosco</h1>
  <p class="pag-sub">Atendimento por telefone, WhatsApp, e-mail ou no nosso escritório no Ipiranga.</p>
</div></section>
<section class="sec"><div class="w contato-in">
  <div class="contato-canais">
    <a href="tel:${E.telHref}">${ic('fone')}<span><small>Telefone</small>${E.tel}</span></a>
    <a href="${zap('Olá! Vim pelo site.')}" target="_blank" rel="noopener">${icWhats}<span><small>Celular e WhatsApp</small>${E.cel}</span></a>
    <a href="mailto:${E.email}">${ic('mail')}<span><small>E-mail</small>${E.email}</span></a>
    <a href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')}<span><small>Escritório</small>${esc(E.rua)}, ${E.bairro}, ${E.cidade}</span></a>
  </div>
  <form class="form-grande form-contato" data-zap data-zap-msg="Olá! Vim pelo site da Alexandre Augusto Imóveis.">
    <h2>Envie sua mensagem</h2>
    <div class="fg">
      <label><span>Nome</span><input name="Nome" required autocomplete="name"></label>
      <label><span>E-mail</span><input name="E-mail" type="email" autocomplete="email"></label>
      <label><span>Telefone</span><input name="Telefone" required inputmode="tel" autocomplete="tel"></label>
      <label><span>Bairro de interesse</span><input name="Bairro"></label>
    </div>
    <label class="fg-cheio"><span>Mensagem</span><textarea name="Mensagem" rows="4" required></textarea></label>
    <button class="btn btn-red" type="submit">${icWhats}Enviar pelo WhatsApp</button>
    <a class="form-alt" href="mailto:${E.email}">ou escreva para ${E.email}</a>
  </form>
</div></section>
<section class="mapa-sec"><iframe title="Mapa: ${esc(E.endereco)}" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>
<section class="sec trabalhe" id="trabalhe"><div class="w trabalhe-in">
  <div><h2>Venha trabalhar conosco</h2><p>Corretor ou estudante de corretagem que conhece o Ipiranga? Mande seu currículo e conte um pouco da sua experiência.</p></div>
  <a class="btn btn-azul" href="mailto:${E.email}?subject=${encodeURIComponent('Trabalhe conosco')}">${ic('mail')}Enviar currículo</a>
</div></section>`);
}

export function gerarVersao(v) {
  const p = {
    index: v === 'a' ? homeA() : homeB(),
    imoveis: listagem(v),
    empresa: paginaEmpresa(v),
    anuncie: paginaAnuncie(v),
    financiamento: paginaFinanciamento(v),
    contato: paginaContato(v),
  };
  for (const i of imoveis) p[`imovel/${i.id}`] = fichaImovel(v, i);
  return p;
}
