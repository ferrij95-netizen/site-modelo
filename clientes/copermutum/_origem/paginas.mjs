// Monta as páginas das versões A ("Cooperativa", fiel ao site atual: marrom, verde-lima e bege) e B ("Do grão à carne", verde e amarelo do logo).
// As páginas internas usam o mesmo conteúdo; a home, o topo e o rodapé mudam por versão. Estilos em public/assets/{base,a,b}.css.
import {
  empresa as E, numeros, sobre, entrevista, unidades, granja, racoes, fabrica, cadeia, historia, parceiros, noticias, assembleia,
} from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Fotos do banco (Wikimedia Commons) levam o selo "Foto ilustrativa"; as reais começam com "real-".
const foto = (n, alt, cls = '', extra = '') => `<figure class="foto ${cls}"><img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>${n.startsWith('real-') ? '' : '<span class="ilus">Foto ilustrativa</span>'}</figure>`;

export const nomesVersao = { a: 'Cooperativa', b: 'Do grão à carne' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'a-coper', nome: 'Sobre a Coper', caminho: 'a-coper/' },
  { slug: 'granja', nome: 'Granja UPL', caminho: 'granja/' },
  { slug: 'fabrica', nome: 'Fábrica de Rações', caminho: 'fabrica/' },
  { slug: 'cooperado', nome: 'Cooperado', caminho: 'cooperado/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];
const link = (v, slug) => `/${v}/${nav.find(n => n.slug === slug).caminho}`;

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
  predio: '<path d="M4 21V5l8-3 8 3v16"/><path d="M9 21v-5h6v5M8 8h2M14 8h2M8 12h2M14 12h2"/>',
  leitao: '<path d="M4 13c0-4 3.5-6 8-6s8 2 8 5.5c0 1.6-.8 2.9-2 3.7V19h-2.5v-2h-7v2H6v-3c-1.3-.8-2-1.8-2-3z"/><path d="M20 12h1.5M8 6.5L7 4.5"/><circle cx="15.5" cy="11" r=".6" fill="currentColor"/>',
  silo: '<path d="M6 21V8a3 3 0 016 0v13M12 21V10a3 3 0 016 0v11"/><path d="M3 21h18"/>',
  folha: '<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15"/><path d="M5 19l7-7"/>',
  raio: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fechar: '<path d="M6 6l12 12M18 6L6 18"/>',
  face: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" fill="currentColor" stroke="none"/>',
  aspas: '<path d="M10 7H6a2 2 0 00-2 2v4h5v5H4M20 7h-4a2 2 0 00-2 2v4h5v5h-5" />',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const icUnidade = { matriz: 'predio', granja: 'leitao', fabrica: 'silo' };
const mapa = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// ---------- moldura ----------
function head(v, slug, titulo, descricao) {
  const url = `${E.url}${link(v, slug).slice(1)}`;
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
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
`;
}

function topo(v, slug) {
  const itens = nav.map(n => n.slug === 'contato'
    ? `<li><a class="nav-cta${slug === n.slug ? ' ativo' : ''}" href="${link(v, n.slug)}">${n.nome}</a></li>`
    : `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('');
  return `<div class="barra"><div class="in">
  <span>Nova Mutum · Mato Grosso · desde 1990</span>
  <span class="barra-dir"><a href="tel:${E.telefoneHref}">${ic('tel')}${E.telefone}</a><a href="${E.webmail}" target="_blank" rel="noopener">${ic('mail')}Webmail</a><a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></span>
</div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/${v}/" aria-label="Copermutum, página inicial"><img src="/assets/${v === 'a' ? 'logo-branco' : 'logo'}.svg" alt="Copermutum" width="183" height="49"></a>
  <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  <nav id="menu" aria-label="Principal"><ul>${itens}</ul></nav>
</div></header>
<main id="conteudo">
`;
}

function rodape(v) {
  return `</main>
<footer class="rodape"><div class="in">
  <div class="rod-marca">
    <img src="/assets/logo-branco.svg" alt="Copermutum" width="183" height="49">
    <p>${E.razao}<br>CNPJ ${E.cnpj}</p>
  </div>
  <div>
    <h3>Unidades</h3>
    <ul class="rod-lista">${unidades.map(u => `<li><strong>${u.nome}</strong><br><a href="${mapa(u.mapa)}" target="_blank" rel="noopener">${u.endereco}</a></li>`).join('')}</ul>
  </div>
  <div>
    <h3>Navegue</h3>
    <ul class="rod-lista">${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul>
  </div>
  <div>
    <h3>Fale com a Coper</h3>
    <ul class="rod-lista">
      <li><a href="tel:${E.telefoneHref}">${E.telefone}</a></li>
      <li><a href="${E.webmail}" target="_blank" rel="noopener">Webmail</a></li>
      <li><a href="${E.facebook}" target="_blank" rel="noopener">Facebook</a></li>
    </ul>
  </div>
</div>
<div class="in rod-base"><span>© ${new Date().getFullYear()} Copermutum. Nova Mutum, MT.</span><span>Fotos marcadas como ilustrativas: Wikimedia Commons, créditos na página <a href="${link(v, 'contato')}#creditos">Contato</a>.</span></div>
</footer>
<script src="/assets/site.js" defer></script>
</body>
</html>`;
}

const pagina = (v, slug, titulo, desc, corpo) => head(v, slug, titulo, desc) + topo(v, slug) + corpo + rodape(v);

// Topo das páginas internas
const capa = (v, eyebrow, titulo, sub, img) => `<section class="capa">
  ${foto(img, '', 'capa-foto')}
  <div class="in capa-txt">
    <p class="eyebrow">${eyebrow}</p>
    <h1>${titulo}</h1>
    ${sub ? `<p class="lead">${sub}</p>` : ''}
  </div>
</section>`;

// ---------- blocos reutilizados ----------
const blocoNumeros = (cls = '') => `<div class="numeros ${cls}">${numeros.map(n => `<div class="num"><strong>${n.valor}</strong><span>${n.rotulo}</span></div>`).join('')}</div>`;

const blocoCitacao = (c, cls = '') => `<blockquote class="citacao ${cls}">${ic('aspas', 'ic-aspas')}<p>${esc(c.texto)}</p><footer><strong>${c.autor}</strong>, ${c.cargo}</footer></blockquote>`;

const blocoCadeia = () => `<ol class="cadeia">${cadeia.map((c, i) => `<li>
  ${foto(c.foto, c.titulo, 'cadeia-foto')}
  <span class="cadeia-n">${String(i + 1).padStart(2, '0')}</span>
  <h3>${c.titulo}</h3>
  <p>${c.texto}</p>
</li>`).join('')}</ol>`;

const blocoUnidadesLista = v => `<ul class="unid-lista">${unidades.map((u, i) => `<li>
  <span class="unid-ic">${ic(icUnidade[u.slug])}</span>
  <div><h3>${u.nome}<small>${u.subtitulo}</small></h3><p>${u.texto}</p></div>
</li>`).join('')}</ul>`;

const blocoParceiros = () => `<ul class="parceiros">${parceiros.map(p => `<li><a href="${p.url}" target="_blank" rel="noopener"><strong>${p.nome}</strong><span>${p.area}</span>${ic('externo', 'ic-ext')}</a></li>`).join('')}</ul>`;

const blocoNoticias = () => `<ul class="noticias">${noticias.map(n => `<li><a href="${n.url}" target="_blank" rel="noopener"><span class="not-fonte">${n.fonte}</span><strong>${n.titulo}</strong>${ic('seta', 'ic-seta')}</a></li>`).join('')}</ul>`;

const blocoHistoria = () => `<ol class="linha-tempo">${historia.map(h => `<li><span class="lt-ano">${h.ano}</span><p>${h.texto}</p></li>`).join('')}</ol>`;

// Ciclo do biodigestor: dejetos viram biogás e energia para a própria granja.
const ciclo = [
  { t: 'Granja UPL', s: '4.200 matrizes' },
  { t: 'Dejetos', s: 'coletados na granja' },
  { t: 'Biodigestor', s: 'fermentação' },
  { t: 'Biogás', s: 'combustível' },
  { t: 'Energia elétrica', s: 'para a própria UPL' },
];
const blocoCiclo = () => `<div class="ciclo" role="img" aria-label="Ciclo: granja, dejetos, biodigestor, biogás, energia elétrica de volta para a granja">
  <svg class="ciclo-anel" viewBox="0 0 400 400" aria-hidden="true"><defs><marker id="pt" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0l10 5-10 5z" fill="currentColor"/></marker></defs>
  ${ciclo.map((_, i) => { const a1 = (i / ciclo.length) * 2 * Math.PI - Math.PI / 2 + 0.33, a2 = ((i + 1) / ciclo.length) * 2 * Math.PI - Math.PI / 2 - 0.33; const p = a => [200 + 160 * Math.cos(a), 200 + 160 * Math.sin(a)].map(n => n.toFixed(1)).join(' '); return `<path d="M${p(a1)} A160 160 0 0 1 ${p(a2)}" fill="none" stroke="currentColor" stroke-width="2.5" marker-end="url(#pt)"/>`; }).join('')}
  </svg>
  <div class="ciclo-centro">${ic('raio')}<strong>Autossuficiente</strong><span>em energia na UPL</span></div>
  ${ciclo.map((c, i) => { const a = (i / ciclo.length) * 360 - 90; const x = 50 + 40 * Math.cos(a * Math.PI / 180), y = 50 + 40 * Math.sin(a * Math.PI / 180); return `<div class="ciclo-no" style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%"><strong>${c.t}</strong><span>${c.s}</span></div>`; }).join('')}
</div>`;

// ---------- HOME A: Cooperativa (mesma ordem do site atual) ----------
function homeA() {
  const v = 'a';
  return pagina(v, 'index', 'Copermutum · Cooperativa Agropecuária Mista Nova Mutum', 'Desde 1990 a Copermutum transforma o milho e a soja dos cooperados em carne suína, em Nova Mutum, Mato Grosso.', `
<section class="hero-a">
  ${foto('campo-soja', 'Lavoura de soja', 'hero-foto')}
  <div class="in hero-a-txt">
    <p class="eyebrow">Nova Mutum · Mato Grosso · desde 1990</p>
    <h1>Cooperativa Agropecuária Mista Nova Mutum</h1>
    <p class="lead">${sobre.projeto}</p>
    <div class="botoes"><a class="btn btn-lima" href="${link(v, 'a-coper')}">Sobre a Coper ${ic('seta')}</a><a class="btn btn-linha" href="${link(v, 'granja')}">Granja UPL</a></div>
  </div>
</section>
<section class="faixa-lima">${blocoNumeros('in')}</section>

<section class="sec sec-bege" id="cooperativa"><div class="in">
  <div class="dupla">
    <div>
      <p class="eyebrow">A Cooperativa</p>
      <h2>Produtores que uniram forças para enfrentar a crise</h2>
      <p>${sobre.intro}</p>
      <p>Possui 3 unidades, cada uma em uma parte da cidade:</p>
      ${blocoUnidadesLista(v)}
      <a class="link-seta" href="${link(v, 'a-coper')}">Saiba mais sobre a Coper ${ic('seta')}</a>
    </div>
    <div class="dupla-lado">
      <figure class="moldura-real"><img src="/assets/img/real-diversificacao.webp" alt="Diversificação e verticalização: granja, maternidade e suínos da Copermutum" width="300" height="150"><figcaption>Diversificação e verticalização</figcaption></figure>
      ${blocoCitacao(entrevista)}
    </div>
  </div>
  <div class="noticias-bloco">
    <h3 class="sub-tit">Notícias da suinocultura</h3>
    ${blocoNoticias()}
  </div>
</div></section>

<section class="sec sec-branca" id="granja">
  <div class="faixa-titulo"><div class="in"><h2>Granja UPL · Unidade Produtora de Leitões</h2></div></div>
  <div class="in dupla dupla-foto">
    ${foto('maternidade', 'Matriz amamentando leitões', 'foto-alta')}
    <div>
      ${blocoCitacao({ texto: granja.intro, autor: granja.autor, cargo: granja.cargo }, 'citacao-curta')}
      <h3 class="sub-tit">Sítios e tecnologia</h3>
      <ul class="sitios">${granja.sitios.map(s => `<li>${s}</li>`).join('')}</ul>
      <p>${unidades[1].texto}</p>
      <a class="link-seta" href="${link(v, 'granja')}">A Granja ${ic('seta')}</a>
    </div>
  </div>
  <div class="in faixa-bio">
    ${foto('biodigestor', 'Lagoa coberta de biodigestor', 'bio-foto')}
    <div><p class="eyebrow">Biodigestor e compostagem</p><h3>Energia gerada com os dejetos da própria granja</h3><p>${granja.ambiente}</p></div>
  </div>
</section>

<section class="sec sec-verde" id="cadeia"><div class="in">
  <p class="eyebrow">Diversificação e verticalização</p>
  <h2>Do grão do cooperado à carne suína</h2>
  ${blocoCadeia()}
</div></section>

<section class="sec sec-bege" id="fabrica">
  <div class="faixa-titulo"><div class="in"><h2>Fábrica de Rações</h2></div></div>
  <div class="in">
    <p class="lead-escuro largura-texto">${fabrica.intro}</p>
    <div class="racoes">${racoes.map(r => `<article class="racao">${foto(r.foto, r.nome)}<h3>${r.nome}</h3><p>${r.texto}</p></article>`).join('')}</div>
    <a class="link-seta" href="${link(v, 'fabrica')}">Conheça a fábrica ${ic('seta')}</a>
  </div>
</section>

<section class="sec sec-branca" id="parceiros"><div class="in">
  <div class="cab-linha"><div><p class="eyebrow">Parceiros</p><h2>Quem trabalha com a Copermutum</h2></div><p>Empresas parceiras que desenvolvem as melhores tecnologias para os resultados na produção animal.</p></div>
  ${blocoParceiros()}
</div></section>

${blocoContato(v)}
`);
}

// ---------- HOME B: Do grão à carne ----------
function homeB() {
  const v = 'b';
  return pagina(v, 'index', 'Copermutum · Do milho e da soja à carne suína', 'Cooperativa de Nova Mutum (MT) com Granja UPL de 4.200 matrizes, fábrica de ração própria e 150 mil leitões por ano.', `
<section class="hero-b"><div class="in hero-b-grade">
  <div class="hero-b-txt">
    <p class="eyebrow">Cooperativa Agropecuária Mista Nova Mutum · desde 1990</p>
    <h1>Do milho e da soja do cooperado à carne suína.</h1>
    <p class="lead">${sobre.projeto} Granja UPL, fábrica de ração própria e energia do biogás, em Nova Mutum, Mato Grosso.</p>
    <div class="botoes"><a class="btn btn-verde" href="${link(v, 'a-coper')}">Conheça a Coper ${ic('seta')}</a><a class="btn btn-claro" href="${link(v, 'cooperado')}">Área do cooperado</a></div>
  </div>
  <div class="hero-b-midia">
    ${foto('suinos-1', 'Suínos em crescimento', 'hero-b-foto')}
    <div class="selo"><strong>150 mil</strong><span>leitões por ano para as terminações</span></div>
  </div>
</div></section>

<section class="faixa-aerea">
  ${foto('lavouras-aereo', 'Lavouras vistas de cima', 'aerea-foto')}
  <div class="in">${blocoNumeros()}</div>
</section>

<section class="sec" id="cadeia"><div class="in">
  <div class="cab-linha"><div><p class="eyebrow">Como funciona</p><h2>Cinco etapas, uma cadeia só</h2></div><p>O grão sai da lavoura do cooperado e volta como valor agregado: ração, leitões, suínos terminados e carne, abatida na própria cidade.</p></div>
  ${blocoCadeia()}
</div></section>

<section class="sec sec-papel" id="unidades"><div class="in">
  <p class="eyebrow">Três unidades em Nova Mutum</p>
  <h2>Matriz, Granja UPL e Fábrica de Ração</h2>
  <div class="unid-linhas">${unidades.map((u, i) => `<article class="unid-linha${i % 2 ? ' inv' : ''}">
    ${foto(u.foto, u.nome)}
    <div class="unid-linha-txt"><span class="unid-num">0${i + 1}</span><h3>${u.nome}</h3><p class="unid-sub">${u.subtitulo}</p><p>${u.texto}</p>
    <a class="end" href="${mapa(u.mapa)}" target="_blank" rel="noopener">${ic('pin')}${u.endereco}</a>
    ${u.slug !== 'matriz' ? `<a class="link-seta" href="${link(v, u.slug)}">Ver ${u.nome} ${ic('seta')}</a>` : ''}</div>
  </article>`).join('')}</div>
</div></section>

<section class="sec sec-energia" id="energia"><div class="in dupla">
  <div>
    <p class="eyebrow">Meio ambiente</p>
    <h2>A granja gera a própria energia</h2>
    <p>${granja.ambiente}</p>
    <p>${granja.compostagem}</p>
  </div>
  ${blocoCiclo()}
</div></section>

<section class="sec" id="historia"><div class="in">
  <p class="eyebrow">Nossa história</p>
  <h2>Uma cooperativa "à prova de crises"</h2>
  ${blocoHistoria()}
  ${blocoCitacao(entrevista, 'citacao-grande')}
</div></section>

<section class="sec sec-cooperado"><div class="in cooperado-faixa">
  <div><p class="eyebrow">Para o cooperado</p><h2>Assembleias, documentos e webmail</h2><p>Edital, balanço e informações das assembleias da cooperativa em um só lugar.</p></div>
  <div class="botoes"><a class="btn btn-amarelo" href="${link(v, 'cooperado')}">Área do cooperado ${ic('seta')}</a><a class="btn btn-linha" href="${E.webmail}" target="_blank" rel="noopener">Webmail</a></div>
</div></section>

<section class="sec" id="parceiros"><div class="in">
  <div class="cab-linha"><div><p class="eyebrow">Parceiros</p><h2>Tecnologia de quem trabalha com a gente</h2></div><p>Nutrição, saúde animal, gestão e o frigorífico que abate os suínos da cooperativa.</p></div>
  ${blocoParceiros()}
</div></section>

${blocoContato(v)}
`);
}

function blocoContato(v) {
  return `<section class="sec sec-contato" id="contato"><div class="in contato-grade">
  <div>
    <p class="eyebrow">Contate-nos</p>
    <h2>Fale com a Copermutum</h2>
    <p>Informações, dúvidas e currículos: ligue para o escritório central ou visite uma das unidades.</p>
    <a class="btn ${v === 'a' ? 'btn-lima' : 'btn-amarelo'} btn-tel" href="tel:${E.telefoneHref}">${ic('tel')}${E.telefone}</a>
  </div>
  <ul class="enderecos">${unidades.map(u => `<li><span class="end-ic">${ic(icUnidade[u.slug])}</span><div><strong>${u.slug === 'matriz' ? 'Escritório central' : u.nome}</strong><a href="${mapa(u.mapa)}" target="_blank" rel="noopener">${u.endereco}</a></div></li>`).join('')}</ul>
</div></section>`;
}

// ---------- páginas internas ----------
function sobrePag(v) {
  return pagina(v, 'a-coper', 'Sobre a Coper · Copermutum', 'História da Cooperativa Agropecuária Mista Nova Mutum, fundada em 1990 em Nova Mutum (MT): cooperados, unidades e o Frigorífico Excelência.', `
${capa(v, 'Sobre a Coper', 'Cooperativa Agropecuária Mista Nova Mutum', `Fundada em ${E.fundacao}, a cerca de 240 km de Cuiabá.`, 'colheita')}
<section class="sec"><div class="in dupla">
  <div class="texto">
    <h2>Unir forças para enfrentar a crise</h2>
    <p>${sobre.intro}</p>
    <p>${sobre.projeto}</p>
    <p>${sobre.frigorifico}</p>
  </div>
  <div class="dupla-lado">
    <figure class="moldura-real"><img src="/assets/img/real-diversificacao.webp" alt="Diversificação e verticalização: granja, maternidade e suínos da Copermutum" width="300" height="150"><figcaption>Diversificação e verticalização</figcaption></figure>
    ${blocoCitacao(entrevista)}
  </div>
</div></section>
<section class="sec sec-papel"><div class="in">
  <p class="eyebrow">Linha do tempo</p>
  <h2>De 760 matrizes a 150 mil leitões por ano</h2>
  ${blocoHistoria()}
</div></section>
<section class="sec"><div class="in">
  ${blocoNumeros('numeros-claros')}
  <div class="dupla dupla-texto">
    <div class="texto"><h3>Cooperados e equipe</h3><p>${sobre.cooperados}</p><p>${sobre.futuro}</p></div>
    <div class="texto"><h3>Atividade</h3><p>${sobre.atividade}</p></div>
  </div>
</div></section>
<section class="sec sec-papel"><div class="in">
  <p class="eyebrow">Estrutura</p>
  <h2>Três unidades, cada uma em uma parte da cidade</h2>
  ${blocoUnidadesLista(v)}
</div></section>
<section class="sec"><div class="in dupla">
  <div><p class="eyebrow">Na imprensa e em eventos</p><h2>Notícias</h2>${blocoNoticias()}</div>
  <div><p class="eyebrow">Parceiros</p><h2>Quem trabalha com a Coper</h2>${blocoParceiros()}</div>
</div></section>
`);
}

function granjaPag(v) {
  return pagina(v, 'granja', 'Granja UPL · Copermutum', 'Unidade Produtora de Leitões da Copermutum: 4.200 matrizes, 150 mil leitões por ano e energia gerada com biogás.', `
${capa(v, 'Granja UPL', 'Unidade Produtora de Leitões', '4.200 matrizes, duas genéticas e 150 mil leitões por ano para as terminações dos cooperados.', 'suinos-2')}
<section class="sec"><div class="in dupla dupla-foto">
  ${foto('maternidade', 'Matriz amamentando leitões', 'foto-alta')}
  <div class="texto">
    <h2>A Granja</h2>
    <p>${unidades[1].texto}</p>
    ${blocoCitacao({ texto: granja.intro, autor: granja.autor, cargo: granja.cargo })}
  </div>
</div></section>
<section class="sec sec-papel"><div class="in">
  <p class="eyebrow">Sítios e tecnologia</p>
  <h2>Como a granja está organizada</h2>
  <ul class="sitios sitios-grandes">${granja.sitios.map((s, i) => `<li><span>0${i + 1}</span>${s}</li>`).join('')}</ul>
  <ol class="fluxo-granja">
    <li><strong>Matrizes e reprodutores</strong><span>alojados na UPL</span></li>
    <li><strong>Leitões até 60 dias</strong><span>maternidade e creche</span></li>
    <li><strong>Terminações</strong><span>nas propriedades dos cooperados</span></li>
  </ol>
</div></section>
<section class="sec sec-energia"><div class="in dupla">
  <div class="texto">
    <p class="eyebrow">Biodigestor e compostagem</p>
    <h2>Energia elétrica a partir do biogás</h2>
    <p>${granja.ambiente}</p>
    <p>${granja.compostagem} ${granja.estrutura}</p>
  </div>
  ${blocoCiclo()}
</div></section>
<section class="sec"><div class="in fotos-tira">
  ${foto('suinos-1', 'Suínos')}${foto('suinos-3', 'Suínos')}${foto('biodigestor', 'Biodigestor')}
</div></section>
${blocoContato(v)}
`);
}

function fabricaPag(v) {
  return pagina(v, 'fabrica', 'Fábrica de Rações · Copermutum', 'Fábrica de ração da Copermutum em Nova Mutum: rações para a UPL, para as terminações e rações comerciais.', `
${capa(v, 'Fábrica de Rações', 'Milho e soja do cooperado viram nutrição', fabrica.intro, 'milho')}
<section class="sec"><div class="in dupla dupla-foto">
  ${foto('fabrica-silos', 'Silos de fábrica de ração', 'foto-alta')}
  <div class="texto">
    <h2>A Fábrica</h2>
    <p>${unidades[2].texto}</p>
    <p>${fabrica.bpf}</p>
    <a class="end" href="${mapa(unidades[2].mapa)}" target="_blank" rel="noopener">${ic('pin')}${unidades[2].endereco}</a>
  </div>
</div></section>
<section class="sec sec-papel"><div class="in">
  <p class="eyebrow">Linhas de ração</p>
  <h2>Para a granja, para as terminações e para o mercado</h2>
  <div class="racoes">${racoes.map(r => `<article class="racao">${foto(r.foto, r.nome)}<h3>${r.nome}</h3><p>${r.texto}</p></article>`).join('')}</div>
</div></section>
<section class="sec sec-verde"><div class="in">
  <p class="eyebrow">Da lavoura ao frigorífico</p>
  <h2>Onde a fábrica entra na cadeia</h2>
  ${blocoCadeia()}
</div></section>
<section class="sec"><div class="in">
  <div class="cab-linha"><div><p class="eyebrow">Parceiros de nutrição</p><h2>Tecnologia nas rações</h2></div><p>Empresas parceiras que desenvolvem as melhores tecnologias para os resultados na produção animal.</p></div>
  ${blocoParceiros()}
</div></section>
${blocoContato(v)}
`);
}

function cooperadoPag(v) {
  return pagina(v, 'cooperado', 'Área do Cooperado · Copermutum', 'Assembleias, edital, balanço e webmail da Copermutum para os cooperados.', `
${capa(v, 'Cooperado', 'Área do cooperado', 'Assembleias, documentos e acesso ao webmail da cooperativa.', 'soja-linhas')}
<section class="sec"><div class="in dupla">
  <div class="texto">
    <p class="eyebrow">${assembleia.titulo}</p>
    <h2>Caro cooperado</h2>
    <p>${assembleia.texto}</p>
    <p>Orientamos que todos baixem e leiam os documentos antes da assembleia, para que ela seja objetiva e produtiva.</p>
  </div>
  <ul class="docs">${assembleia.docs.map(d => `<li><a href="${d.url}" target="_blank" rel="noopener">${ic('doc', 'ic-doc')}<div><strong>${d.nome}</strong><span>PDF</span></div>${ic('seta', 'ic-seta')}</a></li>`).join('')}
    <li><a href="${E.webmail}" target="_blank" rel="noopener">${ic('mail', 'ic-doc')}<div><strong>Webmail</strong><span>E-mail da cooperativa</span></div>${ic('seta', 'ic-seta')}</a></li>
    <li><a href="${E.facebook}" target="_blank" rel="noopener">${ic('face', 'ic-doc')}<div><strong>Facebook</strong><span>Notícias da Copermutum</span></div>${ic('seta', 'ic-seta')}</a></li>
  </ul>
</div></section>
<section class="sec sec-papel"><div class="in">
  ${blocoNumeros('numeros-claros')}
  <p class="nota">${sobre.cooperados}</p>
</div></section>
${blocoContato(v)}
`);
}

function contatoPag(v) {
  return pagina(v, 'contato', 'Contato · Copermutum', 'Telefone e endereços da Copermutum em Nova Mutum (MT): escritório central, Granja UPL e Fábrica de Ração.', `
${capa(v, 'Contato', 'Entre em contato conosco', 'Informações, dúvidas e currículos.', 'campo-soja')}
<section class="sec"><div class="in dupla">
  <div class="texto">
    <h2>Escritório central</h2>
    <p class="end-grande">${unidades[0].endereco}<br>CEP 78450-000</p>
    <a class="btn ${v === 'a' ? 'btn-lima' : 'btn-verde'} btn-tel" href="tel:${E.telefoneHref}">${ic('tel')}${E.telefone}</a>
    <ul class="enderecos enderecos-claro">${unidades.slice(1).map(u => `<li><span class="end-ic">${ic(icUnidade[u.slug])}</span><div><strong>${u.nome}</strong><a href="${mapa(u.mapa)}" target="_blank" rel="noopener">${u.endereco}</a></div></li>`).join('')}</ul>
    <p><a class="link-seta" href="${E.facebook}" target="_blank" rel="noopener">Facebook da Copermutum ${ic('seta')}</a></p>
  </div>
  <div class="mapa"><iframe title="Mapa do escritório central da Copermutum" src="https://www.google.com/maps?q=${encodeURIComponent(unidades[0].mapa)}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div></section>
<section class="sec sec-papel" id="creditos"><div class="in">
  <h2 class="tit-pequeno">Créditos das fotos ilustrativas</h2>
  <p class="nota">Fotos do Wikimedia Commons: United Soybean Board (CC BY 2.0), Carlos Ebert (CC BY 2.0), Jose.brenner (CC BY-SA 3.0), kallerna (CC BY-SA 4.0), rockindave1 (CC BY 2.0), JoachimKohler-HB (CC BY-SA 4.0), SentinelHub (CC BY 2.0), kjkolb (CC BY-SA 3.0). Serão trocadas por fotos da Copermutum.</p>
</div></section>
`);
}

export function gerarVersao(v) {
  return {
    index: v === 'a' ? homeA() : homeB(),
    'a-coper': sobrePag(v),
    granja: granjaPag(v),
    fabrica: fabricaPag(v),
    cooperado: cooperadoPag(v),
    contato: contatoPag(v),
  };
}
