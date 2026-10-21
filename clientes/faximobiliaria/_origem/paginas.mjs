// Páginas das versões A e B da Fax Imobiliária. Cada versão tem header, footer e home próprios; as páginas
// internas (imóveis, ficha, venda, aluguel, serviços, empresa, avaliação, contato) seguem o menu do site atual
// e usam a mesma estrutura com o visual de cada versão (a.css / b.css).
import {
  empresa as E, servicos as SV, docsComprador, notasComprador, docsLocacao, imoveis, porId, vendas, alugueis,
  CATS, cidades, bairros, contaCat, contaCidade, destaquesVenda, destaquesAluguel, creditos,
} from './dados.mjs';

export const nomesVersao = { a: 'Segurança e satisfação', b: 'Endereço certo em Fortaleza' };

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plural = (n, um, varios) => `${n.toLocaleString('pt-BR')} ${n === 1 ? um : varios}`;
const anos = new Date().getFullYear() - E.desde;
const mail = (assunto, corpo = '') => `mailto:${E.email}?subject=${encodeURIComponent(assunto)}${corpo ? `&body=${encodeURIComponent(corpo)}` : ''}`;

// Ícones de traço (24px), sem emoji.
const I = {
  cama: '<path d="M3 18v-6.5A2.5 2.5 0 0 1 5.5 9h13a2.5 2.5 0 0 1 2.5 2.5V18M3 15h18M6 9V6.5A1.5 1.5 0 0 1 7.5 5h9A1.5 1.5 0 0 1 18 6.5V9M3 18v1.5M21 18v1.5"/>',
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
  escudo: '<path d="M12 3.5 19 6v5.5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  balanca: '<path d="M12 4v16M7 20h10M5 7h14M5 7l-2.5 6a3 3 0 0 0 5 0zM19 7l-2.5 6a3 3 0 0 0 5 0z"/>',
  lupaDoc: '<path d="M6 3.5h7l4 4V11M13 3.5v4h4M6 3.5v17h6"/><circle cx="16" cy="16" r="3"/><path d="m18.2 18.2 2.3 2.3"/>',
  pessoas: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5.5M17.5 14a5 5 0 0 1 3 5"/>',
  foto: '<path d="M4 7.5h3.5L9 5.5h6l1.5 2H20V19H4z"/><circle cx="12" cy="13" r="3.5"/>',
  predio: '<path d="M5 20.5V4.5h9v16M14 9.5h5v11M3.5 20.5h17M8 8h3M8 11.5h3M8 15h3"/>',
  relogio: '<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/>',
  regua: '<path d="m4 15 11-11 5 5-11 11z"/><path d="m8 11 2 2M11 8l2 2M14 5l2 2"/>',
  calendario: '<path d="M4 6h16v14H4zM4 10h16M8 3.5v4M16 3.5v4"/>',
};
const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// Faixas em chevron do logo, usadas como grafismo (mesma geometria das três barras do emblema)
const faixas = (cls = '') => `<svg class="faixas ${cls}" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10 L49 2 V9 L0 17Z M51 2 L100 10 V17 L51 9Z M0 25 L49 17 V24 L0 32Z M51 17 L100 25 V32 L51 24Z M0 40 L49 32 V39 L0 47Z M51 32 L100 40 V47 L51 39Z" fill="currentColor"/><path d="M53 47 L94 48 L53 55Z" class="faixas-red"/></svg>`;

const negTxt = i => i.negocio === 'venda' ? 'à venda' : 'para alugar';
const precoHtml = i => i.negocio === 'aluguel' ? `${esc(i.precoTxt)}<small>/mês</small>` : esc(i.precoTxt);
const areaTxt = a => a >= 10000 ? `${(a / 10000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} ha` : `${a.toLocaleString('pt-BR')} m²`;
const local = i => i.cidade === 'Fortaleza' ? `${i.bairro}, Fortaleza` : (i.bairro === i.cidade ? i.cidade : `${i.bairro}, ${i.cidade}`);
const specs = i => [
  i.quartos && [ic('cama'), plural(i.quartos, 'quarto', 'quartos')],
  i.suites && [ic('suite'), plural(i.suites, 'suíte', 'suítes')],
  i.vagas && [ic('carro'), plural(i.vagas, 'vaga', 'vagas')],
  i.area && [ic('area'), areaTxt(i.area)],
].filter(Boolean);
const specsCurtas = i => specs(i).filter((_, k, l) => l.length < 4 || k !== 1);

const dataAttrs = i => `data-negocio="${i.negocio}" data-cat="${i.cat}" data-cidade="${esc(i.cidade)}" data-bairro="${esc(i.bairro)}" data-preco="${i.preco}" data-quartos="${i.quartos}" data-area="${i.area}" data-cod="${i.cod}" data-id="${i.id}"`;
const cardImovel = (v, i, extra = '') => `<article class="im-card" ${dataAttrs(i)}${extra}>
  <a class="im-foto" href="/${v}/imovel/${i.id}/"><img src="${i.fotos[0]}" alt="${esc(`${i.tipo} ${negTxt(i)} em ${local(i)}`)}" loading="lazy" decoding="async" width="600" height="450"><span class="im-neg im-neg-${i.negocio}">${i.negocio === 'venda' ? 'Venda' : 'Aluguel'}</span>${i.fotos.length > 1 ? `<span class="im-nfotos">${ic('foto')}${i.fotos.length}</span>` : ''}</a>
  <div class="im-info">
    <p class="im-tipo">${esc(i.tipo)} · ${esc(local(i))}</p>
    <h3 class="im-tit"><a href="/${v}/imovel/${i.id}/">${esc(i.titulo)}</a></h3>
    <ul class="im-specs">${specsCurtas(i).map(([ico, t]) => `<li>${ico}${t}</li>`).join('')}</ul>
    <div class="im-rodape"><p class="im-preco">${precoHtml(i)}</p><p class="im-cod">Cód. ${i.cod}</p></div>
  </div>
</article>`;

const fontes = {
  a: 'https://fonts.googleapis.com/css2?family=Saira:wght@500;600;700&family=Inter:wght@400;500;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Saira:wdth,wght@85..125,600..800&family=IBM+Plex+Sans:wght@400;500;600&display=swap',
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
<meta name="theme-color" content="${v === 'a' ? '#ffffff' : '#111111'}">
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

// Menu igual ao do site atual (A empresa, Venda, Aluguel, Serviços, Onde estamos) mais a busca
const NAV = [
  ['empresa', 'A empresa'], ['venda', 'Venda'], ['aluguel', 'Aluguel'], ['servicos', 'Serviços'], ['imoveis', 'Encontre seu imóvel'], ['contato', 'Onde estamos'],
];
const navLinks = (v, atual) => NAV.map(([s, n]) => `<a href="/${v}/${s}/"${atual === s ? ' aria-current="page"' : ''}>${n}</a>`).join('');

function header(v, atual) {
  if (v === 'a') return `<div class="topo-info"><div class="w">
  <span>Desde ${E.desde} · CRECI/CE ${E.creci}</span>
  <span class="ti-dir"><a href="tel:${E.telHref}">${ic('fone')}${E.tel}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span>
</div></div>
<header class="cab"><div class="w cab-in">
  <a class="logo" href="/a/" aria-label="${esc(E.nome)}, início"><img src="/assets/logo.svg" alt="${esc(E.nome)}" width="92" height="84"></a>
  <nav class="menu" id="menu" aria-label="Principal">${navLinks(v, atual)}</nav>
  <a class="btn btn-red cab-cta" href="/a/avaliacao/">Solicite avaliação</a>
  <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
  return `<header class="cab"><div class="w cab-in">
  <a class="logo" href="/b/" aria-label="${esc(E.nome)}, início"><img src="/assets/logo-branco.svg" alt="${esc(E.nome)}" width="80" height="73"></a>
  <nav class="menu" id="menu" aria-label="Principal">${navLinks(v, atual)}</nav>
  <div class="cab-acoes"><a class="cab-tel" href="tel:${E.telHref}">${ic('fone')}<span>${E.tel}</span></a></div>
  <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function footer(v) {
  const col1 = `<div class="rod-marca"><img src="/assets/logo-branco.svg" alt="${esc(E.nome)}" width="96" height="88" loading="lazy"><p>${esc(E.slogan)} Administração, venda de imóveis e consultoria imobiliária em Fortaleza desde ${E.desde}.</p><p class="rod-creci">CRECI/CE ${E.creci}</p></div>`;
  const col2 = `<div><h2>Imóveis</h2><a href="/${v}/imoveis/?negocio=venda">Comprar (${vendas.length})</a><a href="/${v}/imoveis/?negocio=aluguel">Alugar (${alugueis.length})</a>${CATS.map(c => `<a href="/${v}/imoveis/?tipo=${c.k}">${c.n}</a>`).join('')}</div>`;
  const col3 = `<div><h2>A imobiliária</h2>${NAV.filter(([s]) => s !== 'imoveis').map(([s, n]) => `<a href="/${v}/${s}/">${n}</a>`).join('')}<a href="/${v}/avaliacao/">Solicite avaliação</a></div>`;
  const col4 = `<div class="rod-contato"><h2>Central de atendimento</h2><p>${ic('fone')}<a href="tel:${E.telHref}">${E.tel}</a></p><p>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p><p>${ic('pin')}<span>${esc(E.rua)}<br>${E.bairro} · ${E.cidade}</span></p><a class="rod-mapa" href="${E.mapa}" target="_blank" rel="noopener">Veja como chegar ${ic('seta')}</a></div>`;
  return `<footer class="rod"><div class="w rod-in">${col1}${col2}${col3}${col4}</div>
<div class="w rod-base"><span>© ${new Date().getFullYear()} ${esc(E.nome)}. Todos os direitos reservados. CRECI/CE ${E.creci}.</span><span class="rod-cred">Fotos de Fortaleza: ${creditos.map(c => `<a href="${c.u}" target="_blank" rel="noopener">${esc(c.t)}, ${esc(c.a)}</a>`).join(', ')} (Wikimedia Commons, CC BY-SA).</span></div></footer>
<a class="fone-flut" href="tel:${E.telHref}" aria-label="Ligar para a Fax Imobiliária">${ic('fone')}</a>
</body>
</html>`;
}

const pagina = (v, meta, atual, corpo) => `${head(v, meta)}
${header(v, atual)}
<main id="conteudo">
${corpo}
</main>
${footer(v)}`;

// Busca: os mesmos campos do site atual (cidade, bairro, tipo, faixa de preço, área, código)
const opt = (val, txt) => `<option value="${esc(val)}">${esc(txt)}</option>`;
const camposBusca = (comCodigo = true) => `
  <label class="cb"><span>Tipo</span><select name="tipo">${opt('', 'Todos')}${CATS.map(c => opt(c.k, c.n)).join('')}</select></label>
  <label class="cb"><span>Cidade</span><select name="cidade">${opt('', 'Todas')}${cidades.map(c => opt(c, c)).join('')}</select></label>
  <label class="cb"><span>Bairro</span><select name="bairro">${opt('', 'Todos')}${bairros.map(b => opt(b, b)).join('')}</select></label>
  <label class="cb"><span>Valor até</span><input name="max" inputmode="numeric" placeholder="Sem limite" autocomplete="off"></label>
  ${comCodigo ? '<label class="cb"><span>Código</span><input name="codigo" inputmode="numeric" placeholder="Ex.: 1407" autocomplete="off"></label>' : ''}`;
const formBusca = (v, cls = '') => `<form class="busca ${cls}" action="/${v}/imoveis/" method="get" role="search">
  <div class="busca-neg" role="radiogroup" aria-label="Negócio">
    <label><input type="radio" name="negocio" value="aluguel" checked><span>Alugar</span></label>
    <label><input type="radio" name="negocio" value="venda"><span>Comprar</span></label>
  </div>
  <div class="busca-campos">${camposBusca()}<button class="btn btn-red busca-ok" type="submit">${ic('lupa')}Pesquisar</button></div>
</form>`;

// Linha do tempo da locação (as etapas da página Serviços do site atual)
const etapasLocacao = cls => `<ol class="etapas ${cls}">${SV.etapas.map((e, k) => `<li><span class="et-n">${String(k + 1).padStart(2, '0')}</span><div><h3>${esc(e.t)}</h3><p>${esc(e.d)}</p></div></li>`).join('')}</ol>`;

const listaCheck = itens => `<ul class="lista-check">${itens.map(t => `<li>${ic('check')}<span>${esc(t)}</span></li>`).join('')}</ul>`;

// ---------- Home A: fiel ao site atual (moldura preta e vermelha, costa de Fortaleza, três botões) ----------
function homeA() {
  const v = 'a';
  return pagina(v, { titulo: `${E.nome} · Imóveis para alugar e à venda em Fortaleza`, desc: `${E.slogan} Administração, venda e locação de imóveis em Fortaleza desde ${E.desde}. ${alugueis.length} imóveis para alugar e ${vendas.length} à venda. CRECI/CE ${E.creci}.`, slug: '' }, '', `
<section class="a-hero">
  <div class="a-hero-moldura">
    <img class="a-hero-img" src="/assets/img/iracema.webp" alt="Costa de Fortaleza, Praia de Iracema" width="2000" height="1329" fetchpriority="high">
    <span class="a-hero-veu" aria-hidden="true"></span>
    <div class="w a-hero-in">
      <p class="a-hero-selo">Desde ${E.desde} em Fortaleza</p>
      <h1>Levando segurança<br>e satisfação.</h1>
      <p class="a-hero-sub">Administração, venda de imóveis e consultoria imobiliária com equipe de corretores, agentes de locação e advogados.</p>
    </div>
  </div>
  <div class="w a-busca-box">${formBusca(v, 'a-busca')}</div>
</section>

<section class="a-atalhos"><div class="w a-atalhos-in">
  <a href="/a/imoveis/">${ic('lupa')}<span><strong>Encontre seu imóvel</strong><small>${imoveis.length} imóveis em ${cidades.length} cidades do Ceará</small></span></a>
  <a href="/a/contato/">${ic('fone')}<span><strong>Fale conosco</strong><small>Central de atendimento ${E.tel}</small></span></a>
  <a href="/a/avaliacao/">${ic('regua')}<span><strong>Solicite avaliação</strong><small>Na venda de imóveis, a melhor avaliação</small></span></a>
</div></section>

<section class="sec a-dest" data-abas>
  <div class="w">
    <div class="sec-topo">
      <div><p class="eyebrow">Carteira da Fax</p><h2>Imóveis em destaque</h2></div>
      <div class="abas" role="tablist"><button role="tab" aria-selected="true" data-aba="aluguel">Para alugar</button><button role="tab" aria-selected="false" data-aba="venda">À venda</button></div>
    </div>
    <div class="grade-im" data-painel="aluguel">${destaquesAluguel.map(i => cardImovel(v, i)).join('')}</div>
    <div class="grade-im" data-painel="venda" hidden>${destaquesVenda.map(i => cardImovel(v, i)).join('')}</div>
    <p class="sec-mais"><a class="btn btn-preto" href="/a/imoveis/">Ver os ${imoveis.length} imóveis ${ic('seta')}</a></p>
  </div>
</section>

<section class="a-prop"><div class="w a-prop-in">
  <div class="a-prop-txt">
    ${faixas('a-prop-faixas')}
    <p class="eyebrow eyebrow-claro">Para proprietários</p>
    <h2>Seu imóvel alugado, com o aluguel garantido.</h2>
    <p>${esc(E.convite)}</p>
    <ul class="a-prop-lista">${SV.proprietario.slice(0, 4).map(t => `<li>${ic('check')}${esc(t)}</li>`).join('')}</ul>
    <a class="btn btn-red" href="/a/servicos/">Conheça os serviços ${ic('seta')}</a>
  </div>
  <div class="a-prop-etapas">
    <p class="a-prop-et-tit">Como a Fax cuida da locação</p>
    ${etapasLocacao('etapas-escuro')}
  </div>
</div></section>

<section class="sec a-tipos"><div class="w">
  <div class="sec-topo"><div><p class="eyebrow">Por tipo</p><h2>O que você procura?</h2></div></div>
  <div class="a-tipos-grade">${CATS.map((c, k) => `<a class="a-tipo" href="/a/imoveis/?tipo=${c.k}"><img src="${porId[[1407, 1423, 1413, 1437][k]].fotos[0]}" alt="" loading="lazy"><span class="a-tipo-txt"><strong>${c.n}</strong><span>${plural(contaCat(c.k), 'imóvel', 'imóveis')} ${ic('seta')}</span></span></a>`).join('')}</div>
</div></section>

<section class="sec a-cidades"><div class="w a-cidades-in">
  <div>
    <p class="eyebrow">Onde atuamos</p>
    <h2>Fortaleza e litoral do Ceará.</h2>
    <p>Locação em Fortaleza e venda na capital, na Região Metropolitana e no litoral, de Paracuru a Cascavel.</p>
  </div>
  <ul class="a-cid-lista">${cidades.map(c => `<li><a href="/a/imoveis/?cidade=${encodeURIComponent(c)}"><span>${esc(c)}</span><span class="a-cid-n">${plural(contaCidade(c), 'imóvel', 'imóveis')}</span>${ic('seta')}</a></li>`).join('')}</ul>
</div></section>

<section class="sec a-empresa"><div class="w a-empresa-in">
  <figure class="a-emp-foto"><img src="/assets/img/beira-mar.webp" alt="Avenida Beira Mar, Fortaleza" loading="lazy" width="1800" height="1350"><figcaption><strong>${anos}</strong> anos no mercado imobiliário de Fortaleza</figcaption></figure>
  <div class="a-emp-txt">
    <p class="eyebrow">A empresa</p>
    <h2>Tradição no mercado imobiliário desde ${E.desde}.</h2>
    <p>${esc(E.sobre[1])}</p>
    <ul class="a-equipe">${E.equipe.map(t => `<li>${ic('pessoas')}${t}</li>`).join('')}</ul>
    <a class="link-seta" href="/a/empresa/">Conheça a Fax ${ic('seta')}</a>
  </div>
</div></section>

${faixaContato(v)}`);
}

// ---------- Home B: portal da carteira, faixa preta com o emblema, fotos reais e lista por cidade ----------
function homeB() {
  const v = 'b';
  const mosaico = [1406, 1426, 1407, 1425];
  const recentes = imoveis.slice().sort((a, b) => b.id - a.id).slice(0, 6);
  const faixaPreco = l => `de ${Math.min(...l.map(i => i.preco)).toLocaleString('pt-BR')} a ${Math.max(...l.map(i => i.preco)).toLocaleString('pt-BR')}`;
  return pagina(v, { titulo: `${E.nome} · Alugar e comprar imóveis em Fortaleza`, desc: `Imóveis para alugar e à venda em Fortaleza e no litoral do Ceará, com fotos, ficha completa e atendimento da Fax Imobiliária desde ${E.desde}.`, slug: '' }, '', `
<section class="b-hero"><div class="w b-hero-in">
  <div class="b-hero-txt">
    <p class="b-selo"><span>Desde ${E.desde}</span><span>CRECI/CE ${E.creci}</span></p>
    <h1>O endereço certo em Fortaleza.</h1>
    <p class="b-hero-sub">${alugueis.length} imóveis para alugar e ${vendas.length} à venda, com fotos, ficha completa e a segurança de uma administradora com corretores e advogados.</p>
  </div>
  <div class="b-mosaico">${mosaico.map((id, k) => { const i = porId[id]; return `<a href="/b/imovel/${id}/" class="b-mos b-mos-${k + 1}"><img src="${i.fotos[0]}" alt="${esc(`${i.tipo} ${negTxt(i)} em ${local(i)}`)}" ${k ? 'loading="lazy"' : 'fetchpriority="high"'}><span>${esc(i.tipo)} · ${esc(i.bairro)}<strong>${precoHtml(i)}</strong></span></a>`; }).join('')}</div>
</div>
<div class="w">${formBusca(v, 'b-busca')}</div>
</section>

<section class="b-duplo"><div class="w b-duplo-in">
  <a class="b-lado" href="/b/imoveis/?negocio=aluguel"><small>Alugar</small><strong>${alugueis.length} imóveis para locação</strong><span>Aluguel ${faixaPreco(alugueis)} reais por mês</span>${ic('seta')}</a>
  <a class="b-lado b-lado-red" href="/b/imoveis/?negocio=venda"><small>Comprar</small><strong>${vendas.length} imóveis à venda</strong><span>Valores ${faixaPreco(vendas)} reais</span>${ic('seta')}</a>
</div></section>

<section class="sec b-novos"><div class="w">
  <div class="sec-topo"><div><h2>Chegaram na carteira</h2><p class="sec-sub">Os últimos imóveis cadastrados pela Fax, de venda e de locação.</p></div><a class="link-seta" href="/b/imoveis/">Ver todos ${ic('seta')}</a></div>
  <div class="b-grade">${recentes.map(i => cardImovel(v, i)).join('')}</div>
</div></section>

<section class="sec b-cidades"><div class="w b-cidades-in">
  <div class="b-cid-txt"><h2>Da Aldeota ao litoral.</h2><p>Escolha a cidade e veja só o que interessa.</p><a class="btn btn-red" href="/b/imoveis/">Encontre seu imóvel ${ic('seta')}</a></div>
  <ol class="b-cid-barras">${cidades.map(c => `<li><a href="/b/imoveis/?cidade=${encodeURIComponent(c)}"><span class="b-cid-nome">${esc(c)}</span><span class="b-cid-barra" style="--p:${Math.max(8, Math.round(contaCidade(c) / imoveis.length * 100))}%"></span><span class="b-cid-n">${contaCidade(c)}</span></a></li>`).join('')}</ol>
</div></section>

<section class="b-prop"><div class="w b-prop-in">
  <div class="b-prop-cab">
    <h2>Para quem tem imóvel para alugar</h2>
    <p>${esc(E.convite)}</p>
    <a class="btn btn-branco" href="/b/servicos/">Todos os serviços ${ic('seta')}</a>
  </div>
  <ol class="b-prop-grade">${SV.proprietario.map((t, k) => `<li><span>${String(k + 1).padStart(2, '0')}</span>${esc(t)}</li>`).join('')}</ol>
</div></section>

<section class="sec b-docs" data-abas><div class="w b-docs-in">
  <div>
    <h2>Documentos, sem surpresa.</h2>
    <p class="sec-sub">A lista que a Fax pede em cada negócio, para você separar tudo antes da visita.</p>
    <div class="abas" role="tablist"><button role="tab" aria-selected="true" data-aba="loc">Para alugar</button><button role="tab" aria-selected="false" data-aba="comp">Para comprar</button></div>
  </div>
  <div>
    <div data-painel="loc"><h3>Pessoa física</h3>${listaCheck(docsLocacao.pf)}<h3>Pessoa jurídica</h3>${listaCheck(docsLocacao.pj)}<a class="link-seta" href="/b/aluguel/">Tudo sobre aluguel ${ic('seta')}</a></div>
    <div data-painel="comp" hidden><h3>O que exigir do vendedor</h3>${listaCheck(docsComprador.slice(0, 6))}<a class="link-seta" href="/b/venda/">Ver a lista completa ${ic('seta')}</a></div>
  </div>
</div></section>

<section class="sec b-sobre"><div class="w b-sobre-in">
  <figure><img src="/assets/img/aldeota.webp" alt="Aldeota, Fortaleza" loading="lazy" width="1600" height="1200"></figure>
  <div>
    <h2>${anos} anos de Fax Imobiliária.</h2>
    <p>${esc(E.sobre[0])}</p>
    <dl class="b-fatos"><div><dt>Desde</dt><dd>${E.desde}</dd></div><div><dt>Sede na Aldeota</dt><dd>2002</dd></div><div><dt>CRECI/CE</dt><dd>${E.creci}</dd></div></dl>
    <a class="link-seta" href="/b/empresa/">A empresa ${ic('seta')}</a>
  </div>
</div></section>
${faixaContato(v)}`);
}

const faixaContato = v => `<section class="faixa-contato"><div class="w faixa-contato-in">
  <div><h2>Venha nos visitar</h2><p>${ic('pin')}${esc(E.endereco)}</p></div>
  <div class="faixa-botoes"><a class="btn btn-red" href="tel:${E.telHref}">${ic('fone')}${E.tel}</a><a class="btn btn-claro" href="/${v}/contato/">Fale conosco ${ic('seta')}</a></div>
</div></section>`;

const topo = (v, migalha, h1, sub, cls = '') => `<section class="pag-topo ${cls}"><div class="w">
  <p class="migalha"><a href="/${v}/">Início</a> / ${migalha}</p>
  <h1>${h1}</h1>
  ${sub ? `<p class="pag-sub">${sub}</p>` : ''}
</div></section>`;

// ---------- Listagem com filtros ----------
function listagem(v) {
  const filtros = `<form class="filtros" data-filtros role="search" aria-label="Filtrar imóveis">
    <div class="busca-neg" role="radiogroup" aria-label="Negócio">
      <label><input type="radio" name="negocio" value="" checked><span>Todos</span></label>
      <label><input type="radio" name="negocio" value="aluguel"><span>Alugar</span></label>
      <label><input type="radio" name="negocio" value="venda"><span>Comprar</span></label>
    </div>
    ${camposBusca()}
    <label class="cb"><span>Quartos</span><select name="quartos">${opt('', 'Qualquer')}${[1, 2, 3, 4].map(n => opt(n, `${n} ou mais`)).join('')}</select></label>
    <label class="cb"><span>Ordenar</span><select name="ordem">${opt('', 'Mais recentes')}${opt('menor', 'Menor preço')}${opt('maior', 'Maior preço')}${opt('area', 'Maior área')}</select></label>
    <button class="btn btn-linha" type="reset">Limpar filtros</button>
  </form>`;
  const lista = imoveis.slice().sort((a, b) => b.id - a.id);
  return pagina(v, { titulo: `Encontre seu imóvel em Fortaleza · ${E.nome}`, desc: `${imoveis.length} imóveis: ${alugueis.length} para alugar e ${vendas.length} à venda em Fortaleza e no litoral do Ceará. Filtre por tipo, cidade, bairro, valor ou código.`, slug: 'imoveis' }, 'imoveis', `
<section class="pag-topo"><div class="w">
  <p class="migalha"><a href="/${v}/">Início</a> / Encontre seu imóvel</p>
  <h1 data-titulo-lista>Imóveis para alugar e à venda</h1>
  <p class="pag-sub"><strong data-conta>${lista.length}</strong> <span data-conta-txt>imóveis encontrados</span></p>
</div></section>
<section class="sec lista-sec"><div class="w lista-in">
  <aside class="lista-filtros">${filtros}</aside>
  <div>
    <div class="grade-im grade-lista" data-lista>${lista.map(i => cardImovel(v, i)).join('')}</div>
    <div class="lista-vazia" data-vazio hidden><h2>Nenhum imóvel com esses filtros.</h2><p>Conte o que você procura: muitos imóveis chegam à Fax antes de entrar no site.</p><a class="btn btn-red" href="tel:${E.telHref}">${ic('fone')}${E.tel}</a></div>
  </div>
</div></section>`);
}

// ---------- Ficha do imóvel ----------
function fichaImovel(v, i) {
  const assunto = `Imóvel cód. ${i.cod}: ${i.tipo} ${negTxt(i)} em ${local(i)}`;
  const parecidos = imoveis.filter(o => o.id !== i.id && o.negocio === i.negocio && o.cat === i.cat).slice(0, 3);
  const completa = parecidos.length < 3 ? imoveis.filter(o => o.id !== i.id && o.negocio === i.negocio && !parecidos.includes(o)).slice(0, 3 - parecidos.length) : [];
  const ficha = [
    ['Tipo', i.tipo], ['Condição', i.condicao], ['Quartos', i.quartos], ['Suítes', i.suites], ['Vagas', i.vagas],
    ['Área', i.area && areaTxt(i.area)], ['Condomínio', i.condominio && `R$ ${i.condominio.toLocaleString('pt-BR')} (estimado)`],
    ['Valor do m²', i.m2 && `R$ ${Math.round(i.m2).toLocaleString('pt-BR')}`], ['Previsão de entrega', i.entrega], ['Código', i.cod],
  ].filter(([, x]) => x);
  return pagina(v, {
    titulo: `${i.tipo} ${negTxt(i)} em ${local(i)} · ${i.precoTxt} · Cód. ${i.cod}`,
    desc: `${i.titulo}. ${specsCurtas(i).map(([, t]) => t).join(', ')}. ${E.nome}, CRECI/CE ${E.creci}.`.slice(0, 300),
    slug: `imovel/${i.id}`,
  }, 'imoveis', `
<section class="ficha-topo"><div class="w">
  <p class="migalha"><a href="/${v}/">Início</a> / <a href="/${v}/imoveis/?negocio=${i.negocio}">Imóveis ${negTxt(i)}</a> / ${esc(i.bairro)}</p>
  <div class="ficha-cab">
    <div><p class="im-tipo">${esc(i.tipo)} ${negTxt(i)} · ${esc(local(i))}/CE</p><h1>${esc(i.titulo)}</h1></div>
    <div class="ficha-preco"><small>${i.negocio === 'venda' ? 'Preço' : 'Mensalidade'}</small><strong>${precoHtml(i)}</strong><span>Cód. ${i.cod}</span></div>
  </div>
</div></section>
<section class="galeria-sec"><div class="w">
  <div class="galeria" data-galeria>
    <button class="gal-principal" data-gal-abrir="0" aria-label="Ampliar foto" style="--f:url(${i.fotos[0]})"><img src="${i.fotos[0]}" alt="${esc(`${i.tipo} ${negTxt(i)} em ${local(i)}, foto 1`)}" data-gal-img></button>
    ${i.fotos.length > 1 ? `<div class="gal-miniaturas">${i.fotos.map((f, k) => `<button data-gal-ir="${k}"${k === 0 ? ' aria-current="true"' : ''} aria-label="Foto ${k + 1}"><img src="${f}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
  </div>
</div></section>
<section class="sec ficha-sec"><div class="w ficha-in">
  <div class="ficha-corpo">
    ${specs(i).length ? `<ul class="ficha-specs">${specs(i).map(([ico, t]) => `<li>${ico}<span>${t}</span></li>`).join('')}</ul>` : ''}
    ${i.resumo ? `<p class="ficha-resumo">${esc(i.resumo)}</p>` : ''}
    ${i.desc.length ? `<h2>Características do imóvel</h2>${i.desc.map(p => `<p>${esc(p)}</p>`).join('')}` : ''}
    ${i.empreend.length ? `<h2>Características do empreendimento</h2>${i.empreend.map(p => `<p>${esc(p)}</p>`).join('')}` : ''}
    ${i.referencia.length ? `<h2>Localização</h2><div class="ficha-local">${ic('pin')}<div>${i.referencia.map(p => `<p>${esc(p)}</p>`).join('')}</div></div>` : ''}
    <h2>Ficha</h2><dl class="ficha-dl">${ficha.map(([k, x]) => `<div><dt>${k}</dt><dd>${esc(x)}</dd></div>`).join('')}</dl>
  </div>
  <aside class="ficha-lado">
    <div class="ficha-contato">
      <h2>Marque uma visita</h2>
      <p>Fale com a central de atendimento da Fax e informe o código ${i.cod}.</p>
      <a class="btn btn-red btn-cheio" href="tel:${E.telHref}">${ic('fone')}${E.tel}</a>
      <form class="form-mini" data-mail data-assunto="${esc(assunto)}">
        <label><span>Nome</span><input name="Nome" required autocomplete="name"></label>
        <label><span>Telefone</span><input name="Telefone" required inputmode="tel" autocomplete="tel"></label>
        <label><span>Mensagem</span><textarea name="Mensagem" rows="3">Quero marcar uma visita.</textarea></label>
        <button class="btn btn-preto btn-cheio" type="submit">${ic('mail')}Enviar por e-mail</button>
      </form>
      <p class="ficha-creci">${esc(E.nome)} · CRECI/CE ${E.creci}</p>
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

// ---------- A empresa ----------
function paginaEmpresa(v) {
  return pagina(v, { titulo: `A empresa · ${E.nome}`, desc: `${E.nome}: administração, venda de imóveis e consultoria imobiliária em Fortaleza desde ${E.desde}. Sede na Aldeota. CRECI/CE ${E.creci}.`, slug: 'empresa' }, 'empresa', `
${topo(v, 'A empresa', `Tradição no mercado imobiliário desde ${E.desde}.`, 'Administração, venda de imóveis e consultoria imobiliária em Fortaleza.')}
<section class="sec emp-sec"><div class="w emp-in">
  <div class="emp-txt">
    ${E.sobre.map((p, k) => `<p${k === 0 ? ' class="emp-lead"' : ''}>${esc(p)}</p>`).join('')}
    <div class="emp-fatos">
      <p><strong>${E.desde}</strong><span>início das atividades</span></p>
      <p><strong>2002</strong><span>sede nova na Aldeota</span></p>
      <p><strong>${anos}</strong><span>anos de mercado</span></p>
    </div>
  </div>
  <figure class="emp-foto"><img src="/assets/img/aldeota.webp" alt="Aldeota, Fortaleza" loading="lazy" width="1600" height="1200"><figcaption>Aldeota, onde fica a sede da Fax: local estratégico, de fácil acesso e com amplo estacionamento.</figcaption></figure>
</div></section>
<section class="sec emp-serv"><div class="w">
  <h2>Uma equipe completa</h2>
  <div class="emp-serv-grade">
    <article>${ic('chave')}<h3>Agentes de locação</h3><p>Seleção do locatário, análise de cadastro e vistoria detalhada do imóvel.</p><a class="link-seta" href="/${v}/aluguel/">Aluguel ${ic('seta')}</a></article>
    <article>${ic('casa')}<h3>Corretores</h3><p>Venda com a melhor avaliação e contrato de compra e venda sem custos.</p><a class="link-seta" href="/${v}/venda/">Venda ${ic('seta')}</a></article>
    <article>${ic('balanca')}<h3>Advogados</h3><p>Contratos com acompanhamento jurídico e assistência gratuita aos proprietários.</p><a class="link-seta" href="/${v}/servicos/">Serviços ${ic('seta')}</a></article>
  </div>
</div></section>
<section class="emp-convite"><div class="w"><p>${esc(E.convite)}</p><a class="btn btn-red" href="/${v}/contato/">Fale conosco ${ic('seta')}</a></div></section>`);
}

// ---------- Venda ----------
function paginaVenda(v) {
  return pagina(v, { titulo: `Venda de imóveis · ${E.nome}`, desc: `Documentos que o comprador deve exigir do vendedor e imóveis à venda em Fortaleza e no litoral do Ceará. ${E.nome}.`, slug: 'venda' }, 'venda', `
${topo(v, 'Venda', 'Venda de imóveis', 'Comprar com segurança começa pelos documentos. Veja o que exigir do vendedor e conte com a avaliação e o contrato da Fax.')}
<section class="sec doc-sec"><div class="w doc-in">
  <div class="doc-lista">
    <h2>Documentos que o comprador deve exigir do vendedor</h2>
    <p class="sec-sub">Da localidade do imóvel e do domicílio do vendedor.</p>
    <ol class="doc-num">${docsComprador.map(t => `<li>${esc(t)}</li>`).join('')}</ol>
    ${notasComprador.map(t => `<p class="doc-nota">${ic('doc')}${esc(t)}</p>`).join('')}
  </div>
  <aside class="doc-lado">
    <h2>Na venda, a Fax oferece</h2>
    ${listaCheck(SV.venda)}
    <a class="btn btn-red btn-cheio" href="/${v}/avaliacao/">Solicite uma avaliação</a>
    <a class="btn btn-linha btn-cheio" href="/${v}/contato/">Para maiores informações, fale conosco</a>
  </aside>
</div></section>
<section class="sec parecidos"><div class="w">
  <div class="sec-topo"><div><h2>Imóveis à venda</h2></div><a class="link-seta" href="/${v}/imoveis/?negocio=venda">Ver os ${vendas.length} ${ic('seta')}</a></div>
  <div class="grade-im grade-3">${destaquesVenda.slice(0, 3).map(o => cardImovel(v, o)).join('')}</div>
</div></section>`);
}

// ---------- Aluguel ----------
function paginaAluguel(v) {
  return pagina(v, { titulo: `Aluguel de imóveis em Fortaleza · ${E.nome}`, desc: `Deseja alugar um imóvel em Fortaleza? Documentos para pessoa física e jurídica e ${alugueis.length} imóveis para alugar. ${E.nome}.`, slug: 'aluguel' }, 'aluguel', `
${topo(v, 'Aluguel', 'Aluguel de imóveis', 'Deseja alugar um imóvel em Fortaleza? A Fax Imobiliária possui uma vasta lista de opções com excelentes localizações e ótimos preços.')}
<section class="sec doc-sec"><div class="w">
  <h2>Documentos para formalizar o contrato de locação</h2>
  <div class="doc-duas">
    <article><h3>${ic('pessoas')}Pessoa física</h3>${listaCheck(docsLocacao.pf)}</article>
    <article><h3>${ic('predio')}Pessoa jurídica</h3>${listaCheck(docsLocacao.pj)}</article>
  </div>
  <p class="doc-consulte">${ic('doc')}<span>Consulte também a <a href="https://www.planalto.gov.br/ccivil_03/leis/l8245.htm" target="_blank" rel="noopener">Lei do Inquilinato (Lei 8.245/91)</a>. Os formulários do locatário e do fiador são entregues pela nossa equipe.</span></p>
</div></section>
<section class="sec loc-etapas"><div class="w">
  <div class="sec-topo"><div><p class="eyebrow">Passo a passo</p><h2>Como funciona a locação na Fax</h2></div></div>
  ${etapasLocacao('etapas-claro')}
</div></section>
<section class="sec parecidos"><div class="w">
  <div class="sec-topo"><div><h2>Imóveis para alugar</h2></div><a class="link-seta" href="/${v}/imoveis/?negocio=aluguel">Ver os ${alugueis.length} ${ic('seta')}</a></div>
  <div class="grade-im grade-3">${destaquesAluguel.slice(0, 3).map(o => cardImovel(v, o)).join('')}</div>
</div></section>`);
}

// ---------- Serviços ----------
function paginaServicos(v) {
  const blocos = [
    ['escudo', 'Para o proprietário', SV.proprietario],
    ['casa', 'Na venda', SV.venda],
    ['pessoas', 'Em tudo o que fazemos', SV.geral],
  ];
  return pagina(v, { titulo: `Serviços · ${E.nome}`, desc: `Aluguel garantido, seleção do locatário, análise de cadastro, vistoria, contrato com apoio jurídico e seguro contra incêndio. Serviços da ${E.nome}.`, slug: 'servicos' }, 'servicos', `
${topo(v, 'Serviços', 'Conheça as vantagens e os serviços da Fax', 'Administração completa do seu imóvel, da escolha do inquilino ao pagamento do aluguel, com equipe de corretores, agentes de locação e advogados.')}
<section class="sec loc-etapas"><div class="w">
  <div class="sec-topo"><div><p class="eyebrow">Administração de imóveis</p><h2>Do anúncio ao aluguel no seu bolso</h2></div></div>
  ${etapasLocacao('etapas-claro')}
</div></section>
<section class="sec serv-blocos"><div class="w serv-in">
  ${blocos.map(([ico, t, l]) => `<article class="serv-bloco">${ic(ico)}<h2>${t}</h2>${listaCheck(l)}</article>`).join('')}
</div></section>
<section class="emp-convite"><div class="w"><p>${esc(E.convite)}</p><a class="btn btn-red" href="/${v}/contato/">Fale conosco ${ic('seta')}</a></div></section>`);
}

// ---------- Solicite avaliação (mesmos campos do formulário atual) ----------
const UFS = ['Ceará', 'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'];
function paginaAvaliacao(v) {
  const c = (n, l, extra = '') => `<label><span>${l}</span><input name="${esc(n)}" ${extra}></label>`;
  const s = (n, l, ops) => `<label><span>${l}</span><select name="${esc(n)}">${ops.map(o => opt(o, o || 'Selecione')).join('')}</select></label>`;
  return pagina(v, { titulo: `Solicite uma avaliação · ${E.nome}`, desc: `Quer vender ou alugar seu imóvel em Fortaleza? Solicite uma avaliação à ${E.nome}: na venda de imóveis, a melhor avaliação.`, slug: 'avaliacao' }, 'avaliacao', `
${topo(v, 'Solicite avaliação', 'Solicite uma avaliação', 'Conte sobre o imóvel que deseja vender ou alugar. A equipe da Fax entra em contato para agendar a avaliação.')}
<section class="sec"><div class="w anuncie-in">
  <form class="form-grande" data-mail data-assunto="Solicitação de avaliação de imóvel">
    <fieldset><legend><span>1</span>Dados pessoais</legend><div class="fg">
      ${c('Nome', 'Nome', 'required autocomplete="name"')}${c('E-mail', 'E-mail', 'type="email" autocomplete="email"')}${c('Telefone', 'Telefone', 'required inputmode="tel" autocomplete="tel"')}
      ${c('Cidade', 'Cidade', 'autocomplete="address-level2"')}${s('Estado', 'Estado', UFS)}
    </div></fieldset>
    <fieldset><legend><span>2</span>Dados do imóvel</legend><div class="fg">
      ${s('Tipo de imóvel', 'Tipo de imóvel', ['', 'Casa', 'Apartamento', 'Sala comercial', 'Loja/Comércio', 'Terreno', 'Outro'])}${s('Finalidade', 'Quero', ['', 'Vender', 'Alugar', 'Vender ou alugar'])}
      ${c('Logradouro', 'Logradouro', 'autocomplete="street-address"')}${c('Número', 'Nº')}${c('Complemento', 'Complemento')}${c('Bairro do imóvel', 'Bairro')}
      ${c('Cidade do imóvel', 'Cidade', 'value="Fortaleza"')}${s('Estado do imóvel', 'Estado', UFS)}
    </div></fieldset>
    <fieldset><legend><span>3</span>Observações</legend>
      <label class="fg-cheio"><span>Observações</span><textarea name="Observações" rows="4" placeholder="Área, quartos, vagas, estado de conservação, melhor horário para a visita..."></textarea></label>
    </fieldset>
    <button class="btn btn-red" type="submit">${ic('mail')}Enviar solicitação</button>
    <p class="form-nota">${ic('mail')}O botão abre o seu e-mail com a mensagem pronta para ${E.email}.</p>
  </form>
  <aside class="anuncie-lado">
    <h2>Por que avaliar com a Fax</h2>
    <ul>
      <li>${ic('regua')}<span><strong>A melhor avaliação</strong>Na venda de imóveis, temos a melhor avaliação.</span></li>
      <li>${ic('doc')}<span><strong>Contrato sem custos</strong>Confecção de contrato de compra e venda sem custos.</span></li>
      <li>${ic('escudo')}<span><strong>Aluguel garantido</strong>Com a melhor taxa de administração do mercado.</span></li>
    </ul>
    <p>Prefere falar direto? <a href="tel:${E.telHref}">${E.tel}</a></p>
  </aside>
</div></section>`);
}

// ---------- Fale conosco + Onde estamos ----------
function paginaContato(v) {
  return pagina(v, { titulo: `Onde estamos e fale conosco · ${E.nome}`, desc: `${E.endereco}. Central de atendimento ${E.tel}, ${E.email}.`, slug: 'contato' }, 'contato', `
${topo(v, 'Onde estamos', 'Onde estamos', `A Fax Imobiliária está sediada em Fortaleza/CE, na ${E.rua}, ${E.bairro}. Venha nos visitar: teremos um grande prazer em atender você!`)}
<section class="sec"><div class="w contato-in">
  <div class="contato-canais">
    <a href="tel:${E.telHref}">${ic('fone')}<span><small>Central de atendimento</small>${E.tel}</span></a>
    <a href="mailto:${E.email}">${ic('mail')}<span><small>E-mail</small>${E.email}</span></a>
    <a href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')}<span><small>Sede</small>${esc(E.rua)}, ${E.bairro}, ${E.cidade}</span></a>
  </div>
  <form class="form-grande form-contato" data-mail data-assunto="Contato pelo site">
    <h2>Fale conosco</h2>
    <div class="fg">
      <label><span>Nome</span><input name="Nome" required autocomplete="name"></label>
      <label><span>E-mail</span><input name="E-mail" type="email" autocomplete="email"></label>
      <label><span>Telefone</span><input name="Telefone" required inputmode="tel" autocomplete="tel"></label>
      <label><span>Assunto</span><select name="Assunto">${['Quero alugar', 'Quero comprar', 'Quero alugar ou vender meu imóvel', 'Sou inquilino da Fax', 'Outro assunto'].map(o => opt(o, o)).join('')}</select></label>
    </div>
    <label class="fg-cheio"><span>Mensagem</span><textarea name="Mensagem" rows="4" required></textarea></label>
    <button class="btn btn-red" type="submit">${ic('mail')}Enviar mensagem</button>
    <p class="form-nota">Se preferir, envie uma mensagem para <a href="mailto:${E.email}">${E.email}</a> ou ligue para ${E.tel}.</p>
  </form>
</div></section>
<section class="mapa-sec" id="onde"><iframe title="Mapa: ${esc(E.endereco)}" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`);
}

export function gerarVersao(v) {
  const p = {
    index: v === 'a' ? homeA() : homeB(),
    imoveis: listagem(v),
    empresa: paginaEmpresa(v),
    venda: paginaVenda(v),
    aluguel: paginaAluguel(v),
    servicos: paginaServicos(v),
    avaliacao: paginaAvaliacao(v),
    contato: paginaContato(v),
  };
  for (const i of imoveis) p[`imovel/${i.id}`] = fichaImovel(v, i);
  return p;
}
