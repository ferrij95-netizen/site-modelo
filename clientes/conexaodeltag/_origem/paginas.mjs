// Monta as páginas das versões A ("Tradição": fiel ao site atual, faixa vermelha com o logo, menu bordô, fundo creme)
// e B ("Genômica": clara e direta, foto do touro em tela cheia, o programa em ciclo, índice em barras). Estilos em public/assets/{base,a,b}.css.
import {
  empresa as E, pdf, diferenciais, selos, quemSomos, diretoria, etapas, indices, beneficiosPad, tourosJovens, criteriosTj,
  ceip, genomica, sumario as S, parceiros, apoiadores, conectados, touros, noticias,
} from './conteudo.mjs';

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (f, alt, w, h, extra = '') => `<img src="/assets/img/${f}" alt="${esc(alt)}"${w ? ` width="${w}" height="${h}"` : ''} loading="lazy" decoding="async"${extra}>`;
const ext = (url, txt, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="${esc(url)}" target="_blank" rel="noopener">${txt}</a>`;

export const nomesVersao = { a: 'Tradição', b: 'Genômica' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'conexao', nome: 'A Conexão', caminho: 'conexao/' },
  { slug: 'melhoramento', nome: 'Melhoramento genético', caminho: 'melhoramento/' },
  { slug: 'sumario', nome: 'Sumário', caminho: 'sumario/' },
  { slug: 'touros', nome: 'Touros em centrais', caminho: 'touros/' },
  { slug: 'noticias', nome: 'Notícias', caminho: 'noticias/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  down: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

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
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const btnMenu = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, atual) {
  if (v === 'a') return `<header class="topo">
  <div class="faixa"><div class="in">
    <a class="marca" href="/a/" aria-label="Conexão Delta G, página inicial"><img src="/assets/logo-branco.svg" alt="Conexão Delta G" width="516" height="78"></a>
    <div class="faixa-cont">
      <a href="tel:${E.fones[0].href}">${ic('tel')}${E.fones[0].txt} · ${E.fones[1].txt}</a>
      ${ext(E.facebook, `${ic('fb')}facebook.com/conexaodeltag`)}
    </div>
    ${btnMenu}
  </div></div>
  <nav id="menu" class="menu" aria-label="Principal"><div class="in">${menu(v, atual)}</div></nav>
</header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Conexão Delta G, página inicial"><img src="/assets/logo.svg" alt="Conexão Delta G" width="516" height="78"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-tel" href="tel:${E.fones[0].href}">${ic('tel')} ${E.fones[0].txt}</a></nav>
  <a class="btn-sum" href="/b/sumario/">${ic('down')}<span>Sumário</span></a>
  ${btnMenu}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Conexão Delta G" width="258" height="39"><p>Associação de agroempresas que gera e usa tecnologia para aumentar a rentabilidade da pecuária de corte, com as raças Hereford e Braford.</p></div>
  <div><h3>Endereço</h3><p>${E.endereco.join('<br>')}</p>${ext(E.mapa, `${ic('pin')} Ver no mapa`, 'rod-link')}</div>
  <div><h3>Contato</h3><p>${E.fones.map(f => `<a href="tel:${f.href}">${f.txt}</a>`).join('<br>')}<br><a href="mailto:${E.email}">${E.email}</a></p>${ext(E.facebook, `${ic('fb')} Facebook`, 'rod-link')}</div>
  <div><h3>Navegue</h3><nav class="rod-nav">${menu(v, '')}</nav></div>
</div><div class="rod-fim"><div class="in"><span>© ${new Date().getFullYear()} Conexão Delta G</span><span>Programa chancelado pelo MAPA e pela ABHB</span></div></div></footer>`;
}

function pagina(v, slug, caminho, titulo, descricao, corpo) {
  return `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, slug.startsWith('noticia') ? 'noticias' : slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>`;
}

const cabecalho = (v, eyebrow, titulo, sub, foto) => `<section class="cab${foto ? ' cab-foto' : ''}">${foto ? `<div class="cab-img">${img(foto, '', 1600, 353)}</div>` : ''}<div class="in">
  <p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p class="cab-sub">${sub}</p>` : ''}
</div></section>`;

// ---------- blocos comuns ----------
const touroItem = (t, v) => `<li class="touro" data-raca="${t.raca}">
  <a class="touro-foto" href="${esc(t.link)}" target="_blank" rel="noopener" aria-label="${esc(t.nome)} na central ${esc(t.central)}">${img(`touro-${t.slug}.webp`, `Touro ${t.nome} (${t.raca})`, 900, Math.round(900 * t.h / t.w))}</a>
  <div class="touro-info">
    <p class="touro-raca">${t.raca}</p>
    <h3>${esc(t.nome)}</h3>
    <dl><div><dt>Nascimento</dt><dd>${t.nasc}</dd></div><div><dt>Criador</dt><dd>${esc(t.criador)}</dd></div></dl>
    <div class="touro-central"><img src="/assets/img/central-${t.logo}.png" alt="${esc(t.central)}" loading="lazy" height="28">${ext(t.link, `Ver na central ${ic('ext')}`, 'link')}</div>
  </div>
</li>`;

const filtroRaca = (n) => `<div class="filtro" role="group" aria-label="Filtrar por raça">
  <button type="button" data-filtro="" aria-pressed="true">Todos <small>${n.todos}</small></button>
  <button type="button" data-filtro="Hereford" aria-pressed="false">Hereford <small>${n.Hereford}</small></button>
  <button type="button" data-filtro="Braford" aria-pressed="false">Braford <small>${n.Braford}</small></button>
</div>`;
const contaRaca = () => ({ todos: touros.length, Hereford: touros.filter(t => t.raca === 'Hereford').length, Braford: touros.filter(t => t.raca === 'Braford').length });

const linkNoticia = (v, n) => n.slug ? `/${v}/noticias/${n.slug}/` : n.original;
const noticiaItem = (v, n, resumo = true) => `<li><a href="${linkNoticia(v, n)}"${n.slug ? '' : ' target="_blank" rel="noopener"'}>
  <time>${n.data}</time><h3>${esc(n.titulo)}</h3>${resumo ? `<p>${esc(n.resumo.replace(/\.\.\.$/, '…'))}</p>` : ''}
</a></li>`;

const logos = (lista, cls = 'logos') => `<ul class="${cls}">${lista.map(p => `<li>${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener" title="${esc(p.nome)}">` : '<span>'}${img(`logo-${p.logo}.webp`, p.nome)}${p.url ? '</a>' : '</span>'}</li>`).join('')}</ul>`;

const barras = (lista, legenda) => `<figure class="indice">
  <div class="indice-barra" role="img" aria-label="${esc(legenda)}: ${lista.map(([n, , p]) => `${n} ${p}%`).join(', ')}">${lista.map(([n, s, p], k) => `<span class="seg s${k % 9}${p < 10 ? ' seg-p' : ''}" style="flex:${p}" title="${esc(n)}: ${p}%"><b>${p}%</b></span>`).join('')}</div>
  <figcaption><strong>${legenda}</strong></figcaption>
  <ol class="indice-leg">${lista.map(([n, s, p], k) => `<li><i class="s${k % 9}"></i><span>${esc(n)}</span><b>${p}%</b></li>`).join('')}</ol>
</figure>`;

const numeros = (cls = 'numeros') => `<ul class="${cls}">${diferenciais.map(d => `<li><b data-conta>${d.n}</b><span>${d.t}</span></li>`).join('')}</ul>`;

function formContato(v) {
  return `<form class="form" data-mailto="${E.email}" data-assunto="Contato pelo site da Conexão Delta G">
  <label>Nome *<input name="Nome" required autocomplete="name"></label>
  <label>E-mail *<input name="E-mail" type="email" required autocomplete="email"></label>
  <label>Telefone<input name="Telefone" type="tel" autocomplete="tel"></label>
  <label>Assunto<select name="Assunto"><option>Informações sobre o programa</option><option>Sumário de touros</option><option>Quero fazer parte da Conexão</option><option>Leilões e remates</option><option>Imprensa</option><option>Outro</option></select></label>
  <label class="full">Mensagem *<textarea name="Mensagem" rows="5" required></textarea></label>
  <div class="form-acoes full"><button class="btn" type="submit">${ic('mail')} Enviar por e-mail</button><button class="btn btn-sec" type="button" data-wa="${E.wa}">${ic('wa')} Enviar por WhatsApp</button></div>
  <p class="full form-nota">* Campos obrigatórios</p>
</form>`;
}

// ---------- home A ----------
function homeA() {
  const v = 'a';
  return `<section class="hero-a">
  <div class="hero-img">${img('banner.webp', 'Touros Hereford e Braford no campo', 1600, 353, ' fetchpriority="high" loading="eager"')}</div>
  <div class="in hero-txt">
    <p class="eyebrow">Hereford e Braford · há mais de 30 anos</p>
    <h1>Melhoramento genético para uma pecuária de corte mais rentável</h1>
    <div class="acoes"><a class="btn" href="/a/sumario/">${ic('down')} Sumário de Touros</a><a class="btn btn-claro" href="/a/melhoramento/">Conheça o programa ${ic('seta')}</a></div>
  </div>
</section>

<section class="sec dif"><div class="in">
  <div class="dif-cab"><h2>Conheça os diferenciais da Conexão Delta G</h2><p>Rigoroso processo de seleção, que leva em conta a avaliação de 21 características de real importância econômica.</p></div>
  <div class="dif-grade">
    <div class="dif-fotos">${img('campo-1.webp', 'Lote de animais Hereford e Braford', 700, 444)}${img('campo-4.webp', 'Touros Braford na sombra do mato', 700, 444)}</div>
    <div>${numeros()}<ul class="selos">${selos.map(s => `<li>${s}</li>`).join('')}</ul></div>
  </div>
</div></section>

<section class="sec sum-a"><div class="in">
  <a class="sum-capa" href="/a/sumario/">${img('sumario.webp', 'Capa do Sumário de Touros Hereford e Braford 2023/2024', 1000, 722)}</a>
  <div class="sum-txt">
    <p class="eyebrow">Sumário de Touros ${S.edicao}</p>
    <h2>${S.titulo}</h2>
    <p>${S.texto}</p>
    <div class="acoes">${ext(pdf.sumario, `${ic('down')} Baixar o sumário em PDF`, 'btn')}<a class="btn btn-sec" href="/a/touros/">Touros em centrais</a></div>
  </div>
</div></section>

<section class="sec etapas-a"><div class="in">
  <div class="sec-cab"><p class="eyebrow">O Programa</p><h2>Do brinco ao acasalamento, em seis etapas</h2></div>
  <ol class="setas">${etapas.map((e, k) => `<li><span class="n">${k + 1}</span><b>${e.t}</b><small>${e.r}</small></li>`).join('')}</ol>
  <a class="link" href="/a/melhoramento/">Ver o programa completo ${ic('seta')}</a>
</div></section>

<section class="sec touros-a"><div class="in">
  <div class="sec-cab lado"><div><p class="eyebrow">Touros em centrais</p><h2>Genética da Conexão nas centrais de inseminação</h2></div><a class="link" href="/a/touros/">Ver os ${touros.length} touros ${ic('seta')}</a></div>
  <ul class="touros trilho">${touros.slice(0, 8).map(t => touroItem(t, v)).join('')}</ul>
</div></section>

<section class="sec not-a"><div class="in not-grade">
  <div><div class="sec-cab"><p class="eyebrow">Notícias</p><h2>Últimas da Conexão</h2></div>
    <ul class="noticias">${noticias.slice(0, 4).map(n => noticiaItem(v, n)).join('')}</ul>
    <a class="link" href="/a/noticias/">Todas as notícias ${ic('seta')}</a></div>
  <aside class="leiloes"><h3>${ic('cal')} Leilões</h3><p>Agenda de remates das empresas integrantes da Conexão Delta G.</p><p class="vazio">Não há remates cadastrados no momento.</p><p>Os reprodutores com DEP genômica para resistência ao carrapato são vendidos nos leilões dos membros.</p><a class="link" href="/a/conexao/#conectados">Conheça os membros ${ic('seta')}</a></aside>
</div></section>

<section class="sec apoio"><div class="in"><h2 class="mini">Apoiadores</h2>${logos(apoiadores)}</div></section>`;
}

// ---------- home B ----------
function cicloB() {
  const n = etapas.length;
  return `<div class="ciclo" data-ciclo>
  <div class="ciclo-roda" aria-hidden="true">
    <svg viewBox="0 0 400 400"><circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 7"/></svg>
    <img class="ciclo-simbolo" src="/assets/simbolo.svg" alt="" width="130" height="78">
    ${etapas.map((e, k) => { const a = -90 + k * 360 / n; const x = 50 + 37.5 * Math.cos(a * Math.PI / 180), y = 50 + 37.5 * Math.sin(a * Math.PI / 180); return `<span class="ciclo-no" style="left:${x.toFixed(2)}%;top:${y.toFixed(2)}%" data-k="${k}">${k + 1}</span>`; }).join('')}
  </div>
  <ol class="ciclo-lista">${etapas.map((e, k) => `<li data-k="${k}"${k === 0 ? ' class="on"' : ''}><button type="button" aria-expanded="${k === 0}"><span class="n">${String(k + 1).padStart(2, '0')}</span>${e.t}</button><div class="ciclo-txt"><p><b>${e.r}</b></p><p>${e.p[0]}</p></div></li>`).join('')}</ol>
</div>`;
}

function homeB() {
  const v = 'b';
  const tracos = ['Ganho de peso', 'Conformação', 'Precocidade', 'Musculatura', 'Perímetro escrotal', 'Resistência ao carrapato', 'Facilidade de parto', 'Caracterização racial'];
  const hf = touros.filter(t => t.raca === 'Hereford').slice(0, 2), bf = touros.filter(t => t.raca === 'Braford').slice(0, 4);
  return `<section class="hero-b">
  <div class="hero-img">${img('classico-grande.webp', 'Touro Hereford Clássico, criação Wolf Genética', 1512, 1080, ' fetchpriority="high" loading="eager"')}</div>
  <div class="in hero-txt">
    <p class="eyebrow">Programa de melhoramento genético · Hereford e Braford</p>
    <h1>Touros avaliados em 21 características de real importância econômica</h1>
    <p class="hero-sub">Uma associação de agroempresas brasileiras que gera e usa tecnologia de ponta para aumentar a rentabilidade da pecuária de corte.</p>
    <div class="acoes"><a class="btn" href="/b/sumario/">${ic('down')} Sumário de Touros</a><a class="btn btn-claro" href="/b/touros/">Touros em centrais ${ic('seta')}</a></div>
  </div>
  <div class="hero-num"><div class="in">${numeros('numeros num-hero')}</div></div>
</section>

<div class="tracos" aria-label="Características avaliadas"><div class="tracos-trilho">${[...tracos, ...tracos].map((t, k) => `<span${k >= tracos.length ? ' aria-hidden="true"' : ''}>${t}</span>`).join('')}</div></div>

<section class="sec prog-b"><div class="in prog-grade">
  <div class="sec-cab"><p class="eyebrow">O Programa</p><h2>Um ciclo que se repete a cada safra</h2><p>Idealizado há mais de trinta anos pelo Dr. Luiz Alberto Fries, com as avaliações genéticas feitas pela GenSys. Cada geração selecionada é o ponto de partida da próxima.</p><a class="link" href="/b/melhoramento/">Ver as seis etapas em detalhe ${ic('seta')}</a></div>
  ${cicloB()}
</div></section>

<section class="sec indice-b"><div class="in">
  <div class="sec-cab lado"><div><p class="eyebrow">Índice final</p><h2>O peso de cada característica na seleção</h2></div><p>Na desmama e no sobreano, as características medidas viram um índice único. É por ele que o criador separa os melhores para a reprodução.</p></div>
  ${barras(indices.final, 'Índice final (desmama + sobreano)')}
</div></section>

<section class="sec gen-b"><div class="in gen-grade">
  <figure class="gen-foto">${img('campo-3.webp', 'Animais Hereford e Braford a campo', 700, 444)}</figure>
  <div>
    <p class="eyebrow">Genômica</p>
    <h2>DEP genômica para resistência ao carrapato</h2>
    <p>${genomica[1]}</p>
    <ul class="gen-num"><li><b data-conta>4 mil</b><span>animais avaliados e genotipados no RS</span></li><li><b>US$ 3,4 bi</b><span>de prejuízo anual com o carrapato na cadeia</span></li><li><b data-conta data-conta-de="1990">2009</b><span>início do projeto com Embrapa e GenSys</span></li></ul>
    <a class="link" href="/b/melhoramento/#genomica">Entenda a genômica ${ic('seta')}</a>
  </div>
</div></section>

<section class="sec touros-b"><div class="in">
  <div class="sec-cab lado"><div><p class="eyebrow">Touros em centrais</p><h2>Reprodutores da Conexão nas centrais de IA</h2></div><a class="link" href="/b/touros/">Ver os ${touros.length} touros ${ic('seta')}</a></div>
  <ul class="touros grade">${[...hf, ...bf].map(t => touroItem(t, v)).join('')}</ul>
</div></section>

<section class="sum-b"><div class="in sum-grade">
  <div class="sum-txt">
    <p class="eyebrow">Sumário de Touros ${S.edicao}</p>
    <h2>${S.titulo}</h2>
    <p>${S.texto}</p>
    <ul class="sum-num">${S.destaques.map(([n, t]) => `<li><b>${n}</b><span>${t}</span></li>`).join('')}</ul>
    ${ext(pdf.sumario, `${ic('down')} Baixar o sumário em PDF`, 'btn btn-claro')}
  </div>
  <a class="sum-capa" href="${pdf.sumario}" target="_blank" rel="noopener">${img('sumario.webp', 'Capa do Sumário de Touros 2023/2024', 1000, 722)}</a>
</div></section>

<section class="sec not-b"><div class="in">
  <div class="sec-cab lado"><div><p class="eyebrow">Notícias</p><h2>Da Conexão para o campo</h2></div><a class="link" href="/b/noticias/">Todas as notícias ${ic('seta')}</a></div>
  <ul class="noticias lista-b">${noticias.slice(0, 4).map(n => noticiaItem(v, n)).join('')}</ul>
</div></section>

<section class="sec membros-b"><div class="in">
  <div class="sec-cab lado"><div><p class="eyebrow">Conectados</p><h2>${conectados.length} agroempresas, um só programa</h2></div><a class="link" href="/b/conexao/#conectados">Ver os membros ${ic('seta')}</a></div>
  <ul class="membros-logos">${conectados.map(m => `<li title="${esc(m.nome)}">${m.logo ? img(m.logo, m.nome, m.lw, m.lh) : `<span>${esc(m.nome)}</span>`}</li>`).join('')}</ul>
</div></section>

<section class="sec apoio"><div class="in"><h2 class="mini">Apoiadores</h2>${logos(apoiadores)}</div></section>`;
}

// ---------- páginas internas (mesmo conteúdo nas duas versões) ----------
function conexao(v) {
  return `${cabecalho(v, 'A Conexão Delta G', 'Agroempresas unidas pelo melhoramento genético', 'Fazendas no Sul, Sudeste e Centro-Oeste do Brasil, com produção baseada nas raças Hereford e Braford.', v === 'a' ? 'banner.webp' : '')}
<section class="sec"><div class="in duas">
  <div class="texto">${quemSomos.map(p => `<p>${p}</p>`).join('')}<ul class="selos">${selos.map(s => `<li>${s}</li>`).join('')}</ul></div>
  <figure class="foto-lado">${img('campo-2.webp', 'Touros Hereford e Braford a campo', 700, 444)}<figcaption>Rebanho de um dos membros da Conexão Delta G.</figcaption></figure>
</div></section>

<section class="sec sec-alt" id="diretoria"><div class="in">
  <div class="sec-cab"><p class="eyebrow">Diretoria</p><h2>Gestão atual</h2></div>
  <dl class="diretoria">${diretoria.map(d => `<div><dt>${d.cargo}</dt>${d.nomes.map(n => `<dd>${n}</dd>`).join('')}</div>`).join('')}</dl>
</div></section>

<section class="sec" id="conectados"><div class="in">
  <div class="sec-cab"><p class="eyebrow">Conectados</p><h2>Os ${conectados.length} membros da Conexão</h2><p>Os leilões destas empresas levam ao mercado os reprodutores avaliados pelo programa.</p></div>
  <ul class="membros">${conectados.map(m => `<li>
    <div class="membro-logo">${m.logo ? img(m.logo, m.nome, m.lw, m.lh) : ''}</div>
    <div><h3>${esc(m.nome)}</h3><p class="membro-resp">${esc(m.resp)}</p><p class="membro-cid">${ic('pin')} ${esc(m.cidade)}</p>
    <p class="membro-cont">${m.fone ? `<a href="tel:+55${m.fone.replace(/\D/g, '')}">${esc(m.fone)}</a>` : ''}${m.email ? `<a href="mailto:${esc(m.email)}">${esc(m.email)}</a>` : ''}${m.site ? ext('http://' + m.site.replace(/^https?:\/\//, ''), esc(m.site)) : ''}</p></div>
  </li>`).join('')}</ul>
</div></section>

<section class="sec sec-alt" id="parceiros"><div class="in">
  <div class="sec-cab"><p class="eyebrow">Parceiros</p><h2>Pesquisa e tecnologia ao lado do programa</h2></div>
  ${logos(parceiros, 'logos logos-grandes')}
</div></section>

<section class="sec" id="downloads"><div class="in">
  <div class="sec-cab"><p class="eyebrow">Downloads</p><h2>Documentos do programa</h2></div>
  <ul class="downloads">
    <li>${ext(pdf.manual, `${ic('down')}<span><b>Manual técnico</b><small>PDF</small></span>`)}</li>
    <li>${ext(pdf.trabalhos, `${ic('down')}<span><b>Trabalhos publicados</b><small>PDF</small></span>`)}</li>
    <li>${ext(pdf.portaria, `${ic('down')}<span><b>CEIP: Portaria do MAPA</b><small>PDF</small></span>`)}</li>
    <li>${ext(pdf.sumario, `${ic('down')}<span><b>Sumário de Touros ${S.edicao}</b><small>PDF</small></span>`)}</li>
  </ul>
</div></section>`;
}

function melhoramento(v) {
  const fotos = ['programa-1.webp', 'programa-2.webp', 'programa-3.webp', 'programa-4.webp', 'rebanho-1.webp', 'rebanho-2.webp'];
  return `${cabecalho(v, 'Melhoramento genético', 'O Programa de Melhoramento Genético', 'O trabalho da Conexão Delta G descrito etapa por etapa, do controle individual dos animais ao planejamento dos acasalamentos.', v === 'a' ? 'banner.webp' : '')}
<nav class="subnav" aria-label="Nesta página"><div class="in"><a href="#programa">O Programa</a><a href="#indices">Índices</a><a href="#touros-jovens">Touros Jovens</a><a href="#ceip">CEIP</a><a href="#genomica">Genômica</a></div></nav>

<section class="sec" id="programa"><div class="in">
  <ol class="linha-etapas">${etapas.map((e, k) => `<li>
    <div class="le-n"><span>${k + 1}</span></div>
    <div class="le-txt"><h2>${e.t}</h2><p class="le-r">${e.r}</p>${e.p.map(p => `<p>${p}</p>`).join('')}${k === 5 ? `<ul class="check">${beneficiosPad.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}</div>
    ${k < 5 ? `<figure class="le-foto">${img(fotos[k], `Etapa ${k + 1}: ${e.t}`, 255, 172)}</figure>` : ''}
  </li>`).join('')}</ol>
</div></section>

<section class="sec sec-alt" id="indices"><div class="in">
  <div class="sec-cab"><p class="eyebrow">Seleção dos animais</p><h2>O peso de cada característica nos índices</h2><p>A seleção dos animais jovens acontece na desmama e no sobreano. Cada característica entra no índice com um peso diferente.</p></div>
  <div class="indices">${barras(indices.desmama, 'Índice desmama')}${barras(indices.final, 'Índice final')}</div>
</div></section>

<section class="sec" id="touros-jovens"><div class="in duas">
  <div class="texto"><p class="eyebrow">Touros Jovens</p><h2>Os 1% melhores machos com CEIP</h2>${tourosJovens.map(p => `<p>${p}</p>`).join('')}
    <h3>Critérios do PAD na escolha dos touros jovens</h3><ul class="check">${criteriosTj.map(c => `<li>${c}</li>`).join('')}</ul></div>
  <div>
    <figure class="foto-lado">${img('touro-jovem-1.webp', 'Touros jovens da Conexão Delta G', 540, 127)}${img('touro-jovem-2.webp', 'Touros jovens no campo', 539, 127)}</figure>
    <h3 class="mini">Listas de touros jovens</h3>
    <ul class="downloads compacto">${pdf.tj.map(t => `<li>${ext(t.url, `${ic('down')}<span><b>Touros Jovens ${t.ano}</b><small>PDF</small></span>`)}</li>`).join('')}</ul>
  </div>
</div></section>

<section class="sec sec-alt" id="ceip"><div class="in duas">
  <div class="texto"><p class="eyebrow">CEIP</p><h2>Certificado Especial de Identificação e Produção</h2>${ceip.map(p => `<p>${p}</p>`).join('')}${ext(pdf.portaria, `${ic('down')} Portaria do MAPA (PDF)`, 'btn btn-sec')}</div>
  <figure class="foto-lado ceip-img">${img('ceip.webp', 'Exemplo de certificado CEIP emitido pela Conexão Delta G', 539, 385)}<figcaption>Modelo de certificado CEIP.</figcaption></figure>
</div></section>

<section class="sec" id="genomica"><div class="in duas">
  <div class="texto"><p class="eyebrow">Genômica</p><h2>DEP genômica para resistência ao carrapato</h2>${genomica.map(p => `<p>${p}</p>`).join('')}${ext(pdf.genomico, `Sumário Genômico de Touros Hereford e Braford (Embrapa) ${ic('ext')}`, 'link')}</div>
  <div class="fotos-2">${img('campo-1.webp', 'Animais a campo', 700, 444)}${img('campo-3.webp', 'Lote Hereford e Braford', 700, 444)}</div>
</div></section>`;
}

function sumarioPag(v) {
  return `${cabecalho(v, 'Sumário', `${S.titulo} ${S.edicao}`, 'A publicação anual com a avaliação genética dos reprodutores da Conexão Delta G.', '')}
<section class="sec"><div class="in sum-pag">
  <a class="sum-capa" href="${pdf.sumario}" target="_blank" rel="noopener">${img('sumario.webp', 'Capa do Sumário de Touros 2023/2024', 1000, 722)}</a>
  <div class="texto">
    <p>${S.texto}</p>
    <p>O sumário é elaborado em parceria com a GenSys. Por meio da genômica, também aponta touros que dão origem a terneiros com melhor conformação para o parto, característica muito procurada pelos produtores.</p>
    <ul class="sum-num">${S.destaques.map(([n, t]) => `<li><b>${n}</b><span>${t}</span></li>`).join('')}</ul>
    <div class="acoes">${ext(pdf.sumario, `${ic('down')} Baixar o sumário em PDF`, 'btn')}<a class="btn btn-sec" href="/${v}/touros/">Touros em centrais</a></div>
  </div>
</div></section>`;
}

function tourosPag(v) {
  return `${cabecalho(v, 'Touros em centrais', 'Touros em centrais de Inseminação Artificial', 'Reprodutores Hereford e Braford criados por membros da Conexão Delta G e disponíveis nas centrais. Clique na foto para ver o touro na central.', '')}
<section class="sec"><div class="in">
  ${filtroRaca(contaRaca())}
  <ul class="touros grade" data-lista-touros>${touros.map(t => touroItem(t, v)).join('')}</ul>
</div></section>`;
}

function noticiasPag(v) {
  const porAno = {};
  noticias.forEach(n => (porAno[n.data.slice(-4)] ||= []).push(n));
  return `${cabecalho(v, 'Notícias', 'Notícias da Conexão Delta G', `${noticias.length} notícias publicadas desde 2016 sobre genética, mercado e manejo.`, '')}
<section class="sec"><div class="in not-pag">
  <div>
    <ul class="noticias destaque">${noticias.slice(0, 6).map(n => noticiaItem(v, n)).join('')}</ul>
    ${Object.entries(porAno).sort((a, b) => b[0] - a[0]).map(([ano, l]) => { const resto = l.filter(n => n.i >= 6); return resto.length ? `<details class="ano"${ano === '2023' ? ' open' : ''}><summary>${ano} <small>${resto.length} notícias</small></summary><ul class="noticias compacta">${resto.map(n => noticiaItem(v, n, false)).join('')}</ul></details>` : ''; }).join('')}
  </div>
  <aside class="leiloes" id="leiloes"><h3>${ic('cal')} Leilões</h3><p>Agenda de remates das empresas integrantes da Conexão Delta G.</p><p class="vazio">Não há remates cadastrados no momento.</p>${ext(E.facebook, `${ic('fb')} Acompanhe no Facebook`, 'link')}</aside>
</div></section>`;
}

function noticiaPag(v, n) {
  const k = noticias.indexOf(n), prox = noticias.slice(0, 12).filter(x => x !== n).slice(0, 3);
  return `<article class="sec artigo"><div class="in estreito">
  <a class="voltar" href="/${v}/noticias/">← Notícias</a>
  <p class="eyebrow"><time>${n.data}</time></p>
  <h1>${esc(n.titulo)}</h1>
  ${n.texto.map(p => `<p>${esc(p)}</p>`).join('')}
</div></article>
<section class="sec sec-alt"><div class="in"><h2 class="mini">Leia também</h2><ul class="noticias lista-b">${prox.map(x => noticiaItem(v, x)).join('')}</ul></div></section>`;
}

function contato(v) {
  return `${cabecalho(v, 'Contato', 'Fale com a Conexão Delta G', 'Para entrar em contato, preencha o formulário ou envie um e-mail.', '')}
<section class="sec"><div class="in contato">
  <div class="cont-info">
    <div><h3>${ic('mail')} E-mail</h3><p><a href="mailto:${E.email}">${E.email}</a></p></div>
    <div><h3>${ic('tel')} Telefones</h3><p>${E.fones.map(f => `<a href="tel:${f.href}">${f.txt}</a>`).join('<br>')}</p></div>
    <div><h3>${ic('pin')} Endereço</h3><p>${E.endereco.join('<br>')}</p>${ext(E.mapa, 'Ver no mapa', 'link')}</div>
    <div><h3>${ic('fb')} Facebook</h3><p>${ext(E.facebook, 'facebook.com/conexaodeltag')}</p></div>
  </div>
  ${formContato(v)}
</div></section>`;
}

// ---------- montagem ----------
export function gerarVersao(v) {
  const P = {};
  P.index = pagina(v, 'index', '', 'Conexão Delta G · Melhoramento genético Hereford e Braford', 'Associação de agroempresas com programa de melhoramento genético das raças Hereford e Braford: sumário de touros, touros em centrais, CEIP e genômica.', v === 'a' ? homeA() : homeB());
  P.conexao = pagina(v, 'conexao', 'conexao/', 'A Conexão · Conexão Delta G', 'Quem somos, diretoria, membros conectados, parceiros e downloads da Conexão Delta G.', conexao(v));
  P.melhoramento = pagina(v, 'melhoramento', 'melhoramento/', 'Melhoramento genético · Conexão Delta G', 'O programa de melhoramento genético em seis etapas, índices de seleção, touros jovens, CEIP e genômica.', melhoramento(v));
  P.sumario = pagina(v, 'sumario', 'sumario/', 'Sumário de Touros · Conexão Delta G', 'Sumário de Touros Hereford e Braford da Conexão Delta G, para download em PDF.', sumarioPag(v));
  P.touros = pagina(v, 'touros', 'touros/', 'Touros em centrais · Conexão Delta G', 'Touros Hereford e Braford da Conexão Delta G em centrais de inseminação artificial.', tourosPag(v));
  P.noticias = pagina(v, 'noticias', 'noticias/', 'Notícias · Conexão Delta G', 'Notícias da Conexão Delta G sobre genética, mercado e manejo na pecuária de corte.', noticiasPag(v));
  P.contato = pagina(v, 'contato', 'contato/', 'Contato · Conexão Delta G', 'Endereço, telefones e formulário de contato da Conexão Delta G em Santana do Livramento (RS).', contato(v));
  for (const n of noticias.filter(n => n.slug)) P[`noticias/${n.slug}`] = pagina(v, 'noticia', `noticias/${n.slug}/`, `${n.titulo} · Conexão Delta G`, n.resumo.slice(0, 155), noticiaPag(v, n));
  return P;
}
