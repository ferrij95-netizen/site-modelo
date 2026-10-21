// Monta as páginas das versões A ("Claridade": fiel ao site atual, faixa verde no topo, selo cinza da araucária,
// lista de serviços com as bolinhas do site) e B ("Araucária": Curitiba e vidro, verde mata, serviços por ambiente
// e linha do tempo da família). Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, anos, historia, grupos, etapas, fotos, tamanhos, creditos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt = fotos[n] || '', extra = '') => {
  const [w, h] = tamanhos[n];
  return `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}"${/loading=/.test(extra) ? '' : ' loading="lazy"'} decoding="async"${extra}>`;
};
const fig = (n, cls = '', legenda = fotos[n]) => `<figure${cls ? ` class="${cls}"` : ''}>${img(n)}<figcaption>${esc(legenda)}</figcaption></figure>`;

export const nomesVersao = { a: 'Claridade', b: 'Araucária' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'A empresa', caminho: 'empresa/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'fotos', nome: 'Fotos', caminho: 'fotos/' },
  { slug: 'contato', nome: 'Fale conosco', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fax: '<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="9" rx="2"/><path d="M7 14h10v7H7z"/>',
  estrela: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  cartao: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// Selo do site atual (araucária preta na caixa cinza) + nome em caixa alta, como no topo do site antigo.
const marca = (claro = false) => `<span class="marca${claro ? ' claro' : ''}"><img src="/assets/marca.svg" alt="" width="34" height="42"><span class="marca-txt"><b>Vidraçaria<br>Paraná Ltda</b><small>${E.slogan}</small></span></span>`;

function head(v, p, titulo, descricao) {
  const url = `${E.url}${v}/${p}`;
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
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#3f7d1c">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Arimo:wght@400;600;700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const botaoMenu = '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">' + ic('menu') + '</button>';

function topo(v, atual) {
  if (v === 'a') return `<div class="faixa"><div class="in">
  <span>${ic('pin')} ${E.endereco[0]} · Parolin, Curitiba</span>
  <span class="so-pc"><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></span>
  <a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
</div></div>
<header class="topo"><div class="in">
  <a class="logo" href="/a/" aria-label="${E.nome}, página inicial">${marca()}</a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="btn btn-topo" href="/a/contato/#orcamento">Pedir orçamento</a>
  ${botaoMenu}
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="logo" href="/b/" aria-label="${E.nome}, página inicial">${marca(true)}</a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="tel-topo" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
  ${botaoMenu}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${marca(true)}<p>Vidros, temperados, box, espelhos, lapidação e tampos em Curitiba desde ${E.ano}. Empresa de família, hoje na terceira geração.</p></div>
  <div><h3>Endereço</h3><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Como chegar</a></div>
  <div><h3>Fale conosco</h3><p><a href="tel:${E.foneHref}">Tel. ${E.fone}</a><br>Fax ${E.fax}</p><p><a href="mailto:${E.email}">${E.email}</a></p></div>
  <nav aria-label="Rodapé" class="rod-nav">${menu(v, '')}</nav>
</div><p class="rod-fim">© ${E.razao} · Curitiba, PR · desde ${E.fundacao}</p></footer>`;
}

const pagina = (v, slug, titulo, descricao, corpo) => `${head(v, nav.find(n => n.slug === slug).caminho, titulo, descricao)}
<body class="v-${v} p-${slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

const nota = `<a class="nota" href="${E.mapa}" target="_blank" rel="noopener"><span class="estrelas">${ic('estrela')}${ic('estrela')}${ic('estrela')}${ic('estrela')}${ic('estrela', 'ic meia')}</span><b>${E.nota}</b> no Google</a>`;

// ---------- blocos comuns ----------
const opcoes = grupos.flatMap(g => g.itens).map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('');
const form = () => `<form class="form" id="orcamento" data-mailto="${E.email}" data-assunto="Pedido de orçamento pelo site">
  <div class="campos">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>Telefone<input name="Telefone" type="tel" required autocomplete="tel"></label>
    <label>E-mail<input name="E-mail" type="email" autocomplete="email"></label>
    <label>Serviço<select name="Serviço" data-servico><option value="">Escolha</option>${opcoes}<option value="Outro">Outro</option></select></label>
    <label>Medidas (largura x altura)<input name="Medidas" placeholder="Ex.: 1,20 m x 1,90 m"></label>
    <label>Bairro ou cidade<input name="Local" placeholder="Ex.: Água Verde, Curitiba"></label>
    <label class="largo">O que você precisa?<textarea name="Mensagem" rows="4" placeholder="Tipo de vidro, cor, acabamento, se precisa de instalação"></textarea></label>
  </div>
  <div class="form-acoes"><button class="btn" type="submit">${ic('mail')} Enviar pedido por e-mail</button><a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')} Ou ligue ${E.fone}</a></div>
</form>`;

const contatoInfo = () => `<ul class="contato-lista">
  <li>${ic('pin')}<span><b>Endereço</b>${E.endereco.join(', ')}<br><a href="${E.mapa}" target="_blank" rel="noopener">Abrir no mapa</a></span></li>
  <li>${ic('tel')}<span><b>Telefone</b><a href="tel:${E.foneHref}">${E.fone}</a></span></li>
  <li>${ic('fax')}<span><b>Fax</b>${E.fax}</span></li>
  <li>${ic('mail')}<span><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></span></li>
</ul>`;
const pagamento = `<div class="pagamento">${ic('cartao')}<div><h3>Formas de pagamento</h3><p>Consulte as condições de pagamento na loja ou pelo telefone ${E.fone}.</p></div></div>`;
const mapa = `<div class="mapa"><iframe title="Mapa: ${esc(E.nome)}" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
const linkOrc = (v, item) => `/${v}/contato/?servico=${encodeURIComponent(item)}#orcamento`;
const etapasHtml = () => `<ol class="etapas">${etapas.map((e, i) => `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>`;
const creditosHtml = `<section class="creditos"><div class="in"><p>A foto da cortina de vidro é da Vidraçaria Paraná. As demais são ilustrativas, de bancos de imagem livres: ${creditos.map(([f, a, l, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(fotos[f])}</a> (${esc(a)}, ${l})`).join('; ')}.</p></div></section>`;
const galeria = [
  ['Box, banheiros e espelhos', ['box-temperado', 'banheiro-espelho', 'box-banheiro', 'banheiro-vidro']],
  ['Sacadas, fachadas e comércio', ['cortina', 'fachada', 'interior', 'escada']],
  ['Oficina e estoque', ['chapas', 'corte', 'galpao']],
];

// ================= VERSÃO A · Claridade =================
const A = {
  home: () => pagina('a', 'index', `${E.nome} · Vidros, box e espelhos em Curitiba desde ${E.ano}`, `Vidraçaria em Curitiba desde ${E.ano}: vidros temperados e laminados, box, cortina de vidro, espelhos, lapidação, bisotê, jateamento e tampos de mesa. Rua João Viana Seiler, 526, Parolin.`, `
<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">Curitiba · desde ${E.ano}</p>
    <h1>Vendemos claridade há ${anos} anos.</h1>
    <p>Vidros, temperados, box, cortina de vidro, espelhos e lapidação feitos na medida, por uma empresa de família que já está na terceira geração.</p>
    <div class="botoes"><a class="btn btn-branco" href="/a/contato/#orcamento">Pedir orçamento ${ic('seta')}</a><a class="btn btn-vazado" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div>
    ${nota}
  </div>
  <figure class="hero-foto">${img('cortina', fotos.cortina, ' fetchpriority="high" loading="eager"')}<figcaption>Cortina de vidro instalada pela Vidraçaria Paraná</figcaption></figure>
</div></section>

<section class="numeros"><div class="in">
  <div><b>${E.ano}</b><span>Aberta por Hugo Morgenstern Júnior com os filhos Marília e Sérgio</span></div>
  <div><b>3ª</b><span>geração da família à frente da vidraçaria</span></div>
  <div><b>18</b><span>tipos de serviço em vidro e espelho, do box ao troféu</span></div>
  <div><b>${E.nota}</b><span>de nota no Google</span></div>
</div></section>

<section class="servicos-home"><div class="in">
  <div class="sec-tit lado"><div><p class="eyebrow">Especializada nos seguintes serviços</p><h2>Do vidro da janela ao tampo da mesa.</h2></div><a class="link" href="/a/servicos/">Ver todos os serviços ${ic('seta')}</a></div>
  <div class="colunas">${grupos.map(g => `<div class="col"><a class="col-foto" href="/a/servicos/#${g.slug}">${img(g.foto)}</a><h3><a href="/a/servicos/#${g.slug}">${g.nome}</a></h3><ul class="bolinhas">${g.itens.map(i => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}</div>
</div></section>

<section class="processo"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Sob medida</p><h2>Como um vidro sai da nossa oficina.</h2></div>
  ${etapasHtml()}
</div></section>

<section class="familia"><div class="in">
  <figure>${img('por-do-sol')}</figure>
  <div class="familia-txt"><p class="eyebrow">Desde ${E.fundacao}</p><h2>Uma vidraçaria de família no Parolin.</h2><p>${historia[0]}</p><p>${historia[2]}</p><a class="btn" href="/a/empresa/">Conheça a empresa ${ic('seta')}</a></div>
</div></section>

<section class="fotos-home"><div class="in">
  <div class="sec-tit lado"><div><p class="eyebrow">Fotos</p><h2>Vidro bem instalado não aparece. A claridade, sim.</h2></div><a class="link" href="/a/fotos/">Ver as fotos ${ic('seta')}</a></div>
  <div class="mosaico">${fig('fachada', 'g1')}${fig('box-banheiro', 'g2')}${fig('escada', 'g3')}${fig('banheiro-espelho', 'g4')}</div>
</div></section>

<section class="faixa-verde"><div class="in"><div><h2>Precisa de vidro, box ou espelho?</h2><p>Mande as medidas e o que precisa. Respondemos com o orçamento.</p></div><div class="botoes"><a class="btn btn-branco" href="/a/contato/#orcamento">Pedir orçamento ${ic('seta')}</a><a class="btn btn-vazado" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div></div></section>

<section class="onde"><div class="in">
  <div><p class="eyebrow">Onde estamos</p><h2>${E.endereco[0]}</h2><p>No bairro Parolin, perto do centro de Curitiba.</p>${contatoInfo()}</div>
  ${mapa}
</div></section>`),

  empresa: () => pagina('a', 'empresa', `A empresa · ${E.nome}`, `A Vidraçaria Paraná foi fundada em ${E.fundacao} por Hugo Morgenstern Júnior e os filhos Marília e Sérgio. Hoje está na terceira geração.`, `
<section class="capa"><div class="in"><p class="eyebrow">A empresa</p><h1>${anos} anos de vidraçaria, três gerações da mesma família.</h1></div></section>
<section class="historia"><div class="in">
  <div class="historia-txt">${historia.map(p => `<p>${p}</p>`).join('')}</div>
  <figure>${img('cortina')}<figcaption>${fotos.cortina}</figcaption></figure>
</div></section>
<section class="linha"><div class="in">
  <ol class="tempo">
    <li><b>${E.ano}</b><h3>A fundação</h3><p>Hugo Morgenstern Júnior abre a Vidraçaria Paraná com Marília e Sérgio Morgenstern.</p></li>
    <li><b>De lá para cá</b><h3>Acompanhando o mercado</h3><p>Sempre atenta às inovações e tendências, oferecendo qualidade e segurança.</p></li>
    <li><b>Hoje</b><h3>Terceira geração</h3><p>A mesma família, o mesmo endereço no Parolin e o mesmo jeito de atender.</p></li>
  </ol>
</div></section>
<section class="valores"><div class="in">
  <div><h3>Qualidade</h3><p>Produtos de excelente qualidade e acabamento feito com cuidado.</p></div>
  <div><h3>Segurança</h3><p>Vidro certo para cada uso: temperado e laminado onde a segurança pede.</p></div>
  <div><h3>Atendimento</h3><p>Atendimento diferenciado e profissionais altamente qualificados.</p></div>
</div></section>
<section class="faixa-verde"><div class="in"><div><h2>Venha nos visitar no Parolin.</h2><p>${E.endereco.join(', ')}.</p></div><div class="botoes"><a class="btn btn-branco" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Como chegar</a></div></div></section>`),

  servicos: () => pagina('a', 'servicos', `Serviços · ${E.nome}`, 'Vidros, temperados, laminados, box, cortina de vidro, fachadas, vitrines, espelhos, lapidação, bisotê, furos, jateamento, tampos de mesa, molduras, placas e troféus em Curitiba.', `
<section class="capa"><div class="in"><p class="eyebrow">Serviços</p><h1>Especializada em vidros, espelhos e acabamento.</h1><p>Os mesmos serviços de sempre, organizados para você achar o que precisa.</p></div></section>
<nav class="indice" aria-label="Grupos de serviço"><div class="in">${grupos.map(g => `<a href="#${g.slug}">${g.nome}</a>`).join('')}</div></nav>
<section class="serv-lista"><div class="in">${grupos.map((g, i) => `
  <article class="serv" id="${g.slug}">
    <figure>${img(g.foto)}</figure>
    <div class="serv-txt"><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${g.nome}</h2><p>${g.texto}</p>
    <ul class="bolinhas">${g.itens.map(it => `<li><a href="${linkOrc('a', it)}">${esc(it)}</a></li>`).join('')}</ul>
    <a class="link" href="${linkOrc('a', g.itens[0])}">Pedir orçamento ${ic('seta')}</a></div>
  </article>`).join('')}
</div></section>
<section class="processo"><div class="in"><div class="sec-tit"><p class="eyebrow">Sob medida</p><h2>Do orçamento à instalação.</h2></div>${etapasHtml()}</div></section>`),

  fotos: () => pagina('a', 'fotos', `Fotos · ${E.nome}`, 'Fotos de box, espelhos, cortina de vidro, fachadas e da oficina de vidros.', `
<section class="capa"><div class="in"><p class="eyebrow">Fotos</p><h1>Vidro, espelho e claridade.</h1><p>Uma amostra do tipo de serviço que fazemos.</p></div></section>
${galeria.map(([t, fs], i) => `<section class="galeria${i % 2 ? ' alt' : ''}"><div class="in"><h2>${t}</h2><div class="grade n${fs.length}">${fs.map(f => fig(f)).join('')}</div></div></section>`).join('')}
${creditosHtml}`),

  contato: () => pagina('a', 'contato', `Fale conosco · ${E.nome}`, `Peça um orçamento para a Vidraçaria Paraná: ${E.fone}, ${E.email}, ${E.endereco[0]}, Parolin, Curitiba.`, `
<section class="capa"><div class="in"><p class="eyebrow">Fale conosco</p><h1>Peça seu orçamento.</h1><p>Diga o que precisa e, se tiver, as medidas. Respondemos por telefone ou e-mail.</p></div></section>
<section class="contato"><div class="in">
  <div>${form()}</div>
  <aside>${contatoInfo()}${pagamento}</aside>
</div></section>
<section class="onde so-mapa"><div class="in">${mapa}</div></section>`),
};

// ================= VERSÃO B · Araucária =================
const ambientes = [
  { id: 'banheiro', nome: 'Banheiro', grupos: ['vidros', 'espelhos'], foto: 'box-banheiro', t: 'Box em vidro temperado e espelho na medida da parede.' },
  { id: 'sacada', nome: 'Sacada e casa', grupos: ['vidros', 'acabamento'], foto: 'cortina', t: 'Cortina de vidro para abrir a sacada inteira, janelas e portas com vidro temperado ou laminado.' },
  { id: 'loja', nome: 'Loja e escritório', grupos: ['comercial', 'acabamento'], foto: 'fachada', t: 'Fachada, vitrine, divisória, balcão e expositor para o seu comércio.' },
  { id: 'sala', nome: 'Sala e decoração', grupos: ['mesas', 'espelhos'], foto: 'interior', t: 'Tampo de mesa, aparador, moldura, porta-retrato e espelho decorativo.' },
  { id: 'empresa', nome: 'Empresas e eventos', grupos: ['homenagens'], foto: 'chapas', t: 'Placas de homenagem e troféus em vidro.' },
];
const porId = Object.fromEntries(grupos.map(g => [g.slug, g]));

const B = {
  home: () => pagina('b', 'index', `${E.nome} · Claridade para Curitiba desde ${E.ano}`, `Vidraçaria de família em Curitiba desde ${E.ano}: box, cortina de vidro, temperados, laminados, espelhos, lapidação, jateamento e tampos de mesa no Parolin.`, `
<section class="hero">
  <figure class="hero-foto">${img('araucarias', fotos.araucarias, ' fetchpriority="high" loading="eager"')}</figure>
  <div class="in">
    <div class="hero-txt">
      <p class="eyebrow">Vidraçaria Paraná · Curitiba · ${E.ano}</p>
      <h1>Claridade para Curitiba desde ${E.ano}.</h1>
      <p>Box, cortina de vidro, temperados, espelhos e lapidação na medida certa. ${anos} anos no Parolin, na terceira geração da família Morgenstern.</p>
      <div class="botoes"><a class="btn" href="/b/contato/#orcamento">Pedir orçamento ${ic('seta')}</a><a class="btn btn-vidro" href="/b/servicos/">Ver serviços</a></div>
    </div>
  </div>
  <div class="hero-pe"><div class="in"><span>${nota}</span><span>${ic('pin')} ${E.endereco[0]}, Parolin</span><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div></div>
</section>

<section class="ambientes" data-abas><div class="in">
  <div class="sec-tit"><p class="eyebrow">Onde vai o vidro?</p><h2>Escolha o ambiente.</h2></div>
  <div class="abas" role="tablist">${ambientes.map((a, i) => `<button type="button" role="tab" id="aba-${a.id}" aria-controls="amb-${a.id}" aria-selected="${i === 0}">${a.nome}</button>`).join('')}</div>
  ${ambientes.map((a, i) => `<div class="amb" id="amb-${a.id}" role="tabpanel" aria-labelledby="aba-${a.id}"${i ? ' hidden' : ''}>
    <figure>${img(a.foto)}</figure>
    <div class="amb-txt"><h3>${a.nome}</h3><p>${a.t}</p>
      <ul class="itens">${a.grupos.flatMap(s => porId[s].itens).map(it => `<li><a href="${linkOrc('b', it)}">${esc(it)} ${ic('seta')}</a></li>`).join('')}</ul></div>
  </div>`).join('')}
</div></section>

<section class="processo"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Sob medida</p><h2>Quatro passos entre a medida e a claridade.</h2></div>
  ${etapasHtml()}
</div></section>

<section class="familia"><div class="in">
  <div class="familia-txt"><p class="eyebrow">Desde ${E.fundacao}</p><h2>Três gerações cortando vidro em Curitiba.</h2>
  <ol class="tempo">
    <li><b>${E.ano}</b><p>Hugo Morgenstern Júnior abre a vidraçaria com os filhos Marília e Sérgio.</p></li>
    <li><b>De lá para cá</b><p>Acompanhando as inovações e tendências do mercado, com qualidade e segurança.</p></li>
    <li><b>Hoje</b><p>A terceira geração mantém o atendimento de família no Parolin.</p></li>
  </ol>
  <a class="btn btn-claro" href="/b/empresa/">Nossa história ${ic('seta')}</a></div>
  <figure class="familia-foto">${img('por-do-sol')}<figcaption>${fotos['por-do-sol']}</figcaption></figure>
</div></section>

<section class="fotos-home"><div class="in">
  <div class="sec-tit lado"><div><p class="eyebrow">Fotos</p><h2>Vidro que deixa a luz entrar.</h2></div><a class="link" href="/b/fotos/">Ver todas ${ic('seta')}</a></div>
  <div class="tira">${['cortina', 'box-temperado', 'fachada', 'escada', 'banheiro-vidro'].map(f => fig(f)).join('')}</div>
</div></section>

<section class="chamada"><div class="in"><img class="arvore" src="/assets/arvore.svg" alt="" width="816" height="1016"><div><h2>Mande as medidas. A gente manda o orçamento.</h2><p>${E.fone} · ${E.email}</p></div><a class="btn" href="/b/contato/#orcamento">Pedir orçamento ${ic('seta')}</a></div></section>`),

  empresa: () => pagina('b', 'empresa', `Nossa história · ${E.nome}`, `Vidraçaria Paraná, Curitiba: fundada em ${E.fundacao} por Hugo Morgenstern Júnior com Marília e Sérgio Morgenstern, hoje na terceira geração.`, `
<section class="capa"><figure>${img('por-do-sol')}</figure><div class="in"><p class="eyebrow">Nossa história</p><h1>Desde ${E.fundacao}, a mesma família.</h1></div></section>
<section class="historia"><div class="in">
  <p class="destaque">${historia[0]}</p>
  <div class="historia-col"><p>${historia[1]}</p><p>${historia[2]}</p></div>
</div></section>
<section class="geracoes"><div class="in">
  <div><span>1ª geração</span><h3>Hugo Morgenstern Júnior</h3><p>Fundador, em ${E.ano}.</p></div>
  <div><span>2ª geração</span><h3>Marília e Sérgio Morgenstern</h3><p>Ao lado do pai desde a abertura.</p></div>
  <div><span>3ª geração</span><h3>Hoje</h3><p>A família segue à frente da vidraçaria no Parolin.</p></div>
</div></section>
<section class="valores"><div class="in">
  <div><b>Qualidade</b><p>dos serviços e dos produtos</p></div>
  <div><b>Segurança</b><p>vidro certo para cada uso</p></div>
  <div><b>Atendimento</b><p>diferenciado, com profissionais qualificados</p></div>
</div></section>
<section class="chamada"><div class="in"><img class="arvore" src="/assets/arvore.svg" alt="" width="816" height="1016"><div><h2>Passe na loja.</h2><p>${E.endereco.join(', ')}</p></div><a class="btn" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Como chegar</a></div></section>`),

  servicos: () => pagina('b', 'servicos', `Serviços · ${E.nome}`, 'Serviços da Vidraçaria Paraná em Curitiba: vidros, temperados, box, cortina de vidro, fachadas, espelhos, lapidação, jateamento, tampos, molduras, placas e troféus.', `
<section class="capa"><figure>${img('galpao')}</figure><div class="in"><p class="eyebrow">Serviços</p><h1>18 serviços em vidro e espelho.</h1></div></section>
<section class="serv-b"><div class="in">${grupos.map((g, i) => `
  <article class="linha-serv" id="${g.slug}">
    <span class="n">${String(i + 1).padStart(2, '0')}</span>
    <div class="ls-txt"><p class="eyebrow">${g.ambiente}</p><h2>${g.nome}</h2><p>${g.texto}</p><a class="link" href="${linkOrc('b', g.itens[0])}">Pedir orçamento ${ic('seta')}</a></div>
    <ul class="itens">${g.itens.map(it => `<li><a href="${linkOrc('b', it)}">${esc(it)} ${ic('seta')}</a></li>`).join('')}</ul>
    <figure>${img(g.foto)}</figure>
  </article>`).join('')}
</div></section>
<section class="processo"><div class="in"><div class="sec-tit"><p class="eyebrow">Sob medida</p><h2>Do orçamento à instalação.</h2></div>${etapasHtml()}</div></section>
<section class="chamada"><div class="in"><img class="arvore" src="/assets/arvore.svg" alt="" width="816" height="1016"><div><h2>Mande as medidas. A gente manda o orçamento.</h2><p>${E.fone} · ${E.email}</p></div><a class="btn" href="/b/contato/#orcamento">Pedir orçamento ${ic('seta')}</a></div></section>`),

  fotos: () => pagina('b', 'fotos', `Fotos · ${E.nome}`, 'Fotos de box, espelhos, cortina de vidro, fachadas e da oficina de vidros.', `
<section class="capa curta"><div class="in"><p class="eyebrow">Fotos</p><h1>Vidro que deixa a luz entrar.</h1></div></section>
${galeria.map(([t, fs]) => `<section class="galeria"><div class="in"><h2>${t}</h2><div class="grade n${fs.length}">${fs.map(f => fig(f)).join('')}</div></div></section>`).join('')}
${creditosHtml}`),

  contato: () => pagina('b', 'contato', `Fale conosco · ${E.nome}`, `Orçamento na Vidraçaria Paraná: ${E.fone}, ${E.email}, ${E.endereco[0]}, Parolin, Curitiba.`, `
<section class="capa curta"><div class="in"><p class="eyebrow">Fale conosco</p><h1>Peça seu orçamento.</h1><p>Medidas, tipo de vidro e acabamento: quanto mais detalhe, mais rápido o orçamento.</p></div></section>
<section class="contato"><div class="in">
  <div>${form()}</div>
  <aside>${contatoInfo()}${pagamento}</aside>
</div></section>
<section class="so-mapa"><div class="in">${mapa}</div></section>`),
};

export function gerarVersao(v) {
  const P = v === 'a' ? A : B;
  return { index: P.home(), empresa: P.empresa(), servicos: P.servicos(), fotos: P.fotos(), contato: P.contato() };
}
