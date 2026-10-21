// Monta as páginas das versões A ("Faixa": fiel ao site atual, palco preto com a colagem de setores, faixa diagonal laranja e cinza dos slides,
// barra de menu grafite com "Outros serviços") e B ("Rotação": clara e técnica, processo em etapas com fotos, peças em faixa, antes e depois).
// Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, textos as T, pecas, setores, etapas } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;

export const nomesVersao = { a: 'Faixa', b: 'Rotação' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'balanceamento', nome: 'Balanceamento', caminho: 'balanceamento/' },
  { slug: 'metalizacao', nome: 'Metalização', caminho: 'metalizacao/', outros: true },
  { slug: 'diferenciais', nome: 'Diferenciais', caminho: 'diferenciais/', outros: true },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  baixo: '<path d="M6 9l6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cert: '<path d="M7 3h10v12l-5 3-5-3z"/><path d="M9.5 9l2 2 3.5-3.5"/>',
  gira: '<path d="M20 12a8 8 0 11-2.3-5.6"/><path d="M20 4v4h-4"/>',
  ponte: '<path d="M3 6h18M5 6v14M19 6v14M12 6v6"/><path d="M10 12h4v3h-4z"/>',
  raio: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  fresa: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// Faixa diagonal dos slides do site atual: linha cinza, cunha laranja e base grafite, com o vértice à direita.
const faixa = (cls = '', base = 'var(--grafite)') => `<svg class="faixa ${cls}" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0L860 92L1200 8V120H0Z" fill="#a7a7a7"/><path d="M0 9L860 101L1200 17V120H0Z" fill="#fff"/><path d="M0 14L860 106L1200 22V120H0Z" fill="var(--laranja)"/><path d="M0 58L860 120L1200 64V120H0Z" fill="${base}"/></svg>`;

// ---------- moldura ----------
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
<meta property="og:site_name" content="${E.nomeLongo}">
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@112,600;112,700;112,800;125,800;125,900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const link = (v, n, atual) => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`;

function topo(v, atual) {
  const fones = E.fones.map(f => `<a href="tel:${f.href}">${f.fone.replace('(19) ', '')}</a>`).join(' | ');
  if (v === 'a') {
    const outrosAtivo = nav.some(n => n.outros && n.slug === atual);
    return `<div class="tarja" aria-hidden="true"></div>
<header class="cab"><div class="in">
  <a class="marca" href="/a/" aria-label="Destil, página inicial"><img src="/assets/logo.svg" alt="Destil Balanceamentos Industriais" width="200" height="69"></a>
  <div class="cab-info">
    <a class="info" href="mailto:${E.email}"><span class="bola">${ic('mail')}</span><span><b>E-mail</b>${E.email}</span></a>
    <span class="info"><span class="bola">${ic('tel')}</span><span><b>Telefones</b>+55 (19) ${fones}</span></span>
  </div>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>
<nav class="barra" aria-label="Principal"><div class="in" id="menu">
  ${nav.filter(n => !n.outros).slice(0, 3).map(n => link(v, n, atual)).join('')}
  <div class="sub${outrosAtivo ? ' ativo' : ''}"><button type="button" aria-expanded="false">Outros serviços ${ic('baixo')}</button><div class="sub-lista">${nav.filter(n => n.outros).map(n => link(v, n, atual)).join('')}</div></div>
  ${link(v, nav.at(-1), atual)}
</div></nav>`;
  }
  return `<header class="cab"><div class="in">
  <a class="marca" href="/b/" aria-label="Destil, página inicial"><img src="/assets/logo.svg" alt="Destil Balanceamentos Industriais" width="160" height="55"></a>
  <nav id="menu" class="menu" aria-label="Principal">${nav.slice(1).map(n => link(v, n, atual)).join('')}<a class="menu-tel" href="tel:${E.fones[0].href}">${ic('tel')} ${E.fones[0].fone}</a></nav>
  <a class="btn btn-cab" href="/b/contato/">Agendar serviço</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape">${v === 'a' ? faixa('faixa-rod') : ''}<div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Destil Balanceamentos Industriais" width="190" height="65"><p>${T.slogan}</p></div>
  <div><h3>Quem somos</h3><ul class="rod-links">${nav.slice(1).map(n => `<li><a href="/${v}/${n.caminho}">${n.nome}</a></li>`).join('')}</ul></div>
  <div><h3>Onde estamos</h3><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Ver no mapa</a></div>
  <div><h3>Fale com a gente</h3><p>${E.fones.map(f => `<a href="tel:${f.href}">${f.fone}</a>`).join('<br>')}<br><a href="mailto:${E.email}">${E.email}</a></p></div>
</div><div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Destil Balanceamentos Industriais. Todos os direitos reservados.</span><span>Piracicaba · SP</span></div></div></footer>`;
}

function pagina(v, slug, titulo, desc, corpo) {
  const p = slug === 'index' ? '' : `${slug}/`;
  return `${head(v, p, titulo, desc)}
<body class="v-${v}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;
}

// ---------- blocos comuns ----------
const capaA = (foto, eyebrow, titulo, sub) => `<section class="capa"><div class="capa-foto">${img(foto, '', ' fetchpriority="high" loading="eager"')}</div><div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${faixa('', '#fff')}</section>`;
const capaB = (foto, eyebrow, titulo, sub) => `<section class="capa"><div class="in"><div class="capa-txt"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div><figure class="capa-foto">${img(foto, '', ' fetchpriority="high" loading="eager"')}</figure></div></section>`;
const capa = (v, ...a) => (v === 'a' ? capaA : capaB)(...a);

const mesmoDia = v => `<section class="mesmo-dia"><div class="in">
  <span class="md-ic">${ic('relogio')}</span>
  <div><h2>Serviço e entrega no mesmo dia</h2><p>${T.mesmoDia} <small>*${T.mesmoDiaNota}</small></p></div>
  <a class="btn btn-escuro" href="/${v}/contato/">Agendar ${ic('seta')}</a>
</div></section>`;

const antesDepois = `<div class="ad">
  <figure class="ad-antes">${img('antes', 'Eixo desgastado antes da metalização')}<figcaption>Antes</figcaption></figure>
  <figure class="ad-depois">${img('depois', 'Eixo recuperado depois da metalização')}<figcaption>Depois</figcaption></figure>
</div>`;

const etapasBloco = (v) => `<ol class="etapas">${etapas.map((e, i) => `<li><figure>${img(e.img, e.tit)}</figure><span class="et-n">${String(i + 1).padStart(2, '0')}</span><h3>${e.tit}</h3><p>${e.txt}</p></li>`).join('')}</ol>`;

const pecasBloco = `<ul class="pecas">${pecas.map(p => `<li><figure>${img(p.img, p.nome)}</figure><h3>${p.nome}</h3><p>${p.txt}</p></li>`).join('')}</ul>`;

const estrutura = [
  { ic: 'escudo', t: 'Instalações certificadas', d: 'Estrutura preparada para o serviço industrial em Piracicaba.' },
  { ic: 'ponte', t: 'Pontes rolantes', d: 'Movimentação segura de peças grandes, com ponte de 15 t.' },
  { ic: 'raio', t: 'Elétrica com ART', d: 'Instalações elétricas seguindo normas técnicas e ARTs.' },
];

function formulario(v) {
  return `<form class="form" data-form-email="${E.email}">
  <div class="campos">
    <label>Nome*<input name="Nome" required autocomplete="name"></label>
    <label>Empresa<input name="Empresa" autocomplete="organization"></label>
    <label>E-mail*<input name="E-mail" type="email" required autocomplete="email"></label>
    <label>Telefone / celular<input name="Telefone" type="tel" autocomplete="tel"></label>
    <label class="largo">Assunto*<select name="Assunto" required><option value="">Escolha</option><option>Balanceamento</option><option>Metalização</option><option>Fresamento</option><option>Agendar serviço no mesmo dia</option><option>Outro assunto</option></select></label>
    <label class="largo">Mensagem<textarea name="Mensagem" rows="5" placeholder="Tipo de peça, medidas aproximadas, peso e prazo"></textarea></label>
  </div>
  <button class="btn" type="submit">${ic('mail')} Enviar mensagem</button>
  <p class="form-nota">O botão abre o seu e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;
}

// ---------- páginas ----------
function home(v) {
  const titulo = 'Destil · Balanceamentos industriais de alta precisão';
  if (v === 'a') return pagina(v, 'index', titulo, T.oferece, `
<section class="palco"><div class="in">
  <div class="palco-txt"><p class="eyebrow">Piracicaba · SP</p><h1>Balanceamentos industriais de alta precisão e metalizações</h1><p>${T.oferece}</p>
  <div class="botoes"><a class="btn" href="/a/balanceamento/">Balanceamento ${ic('seta')}</a><a class="btn btn-linha" href="/a/contato/">Fale com a gente</a></div></div>
  <div class="mosaico"><span class="mos-faixa" aria-hidden="true"></span><ul>${setores.map((s, i) => `<li>${img(s.img, s.nome, i < 3 ? ' loading="eager"' : '')}<span>${s.nome}</span></li>`).join('')}</ul></div>
</div>${faixa('faixa-palco', '#fff')}</section>

<section class="intro"><div class="in">
  <figure class="intro-foto">${img('rotor-laranja', 'Rotor helicoidal laranja montado na balanceadora da Destil')}</figure>
  <div class="intro-txt"><p class="eyebrow">Quem somos</p><h2>${T.slogan}</h2><p>${T.quemSomos[0]}</p><p>${T.quemSomos[1]}</p>
  <ul class="atalhos">${[['empresa', 'Empresa'], ['balanceamento', 'Balanceamentos'], ['metalizacao', 'Metalizações'], ['contato', 'Contato']].map(([s, n]) => `<li><a href="/a/${s}/">${ic('seta')} ${n}</a></li>`).join('')}</ul></div>
</div></section>

<section class="servicos"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Serviços</p><h2>O que fazemos</h2></div>
  <article class="serv"><figure>${img('maquina', 'Balanceadora computadorizada com rotor montado')}</figure><div><span class="serv-n">01</span><h3>Balanceamento</h3><p>${T.balanceamento}</p><a class="link" href="/a/balanceamento/">Ver balanceamento ${ic('seta')}</a></div></article>
  <article class="serv inv"><figure>${img('metalizacao', 'Metalização por aspersão térmica em peça no torno')}</figure><div><span class="serv-n">02</span><h3>Metalização</h3><p>${T.metalizacao}</p><a class="link" href="/a/metalizacao/">Ver metalização ${ic('seta')}</a></div></article>
  <article class="serv"><figure>${img('polia-1', 'Polia com remoção de peso feita na fresadora')}</figure><div><span class="serv-n">03</span><h3>Fresamento</h3><p>${T.fresamento}</p><a class="link" href="/a/diferenciais/">Ver diferenciais ${ic('seta')}</a></div></article>
</div></section>

${mesmoDia(v)}

<section class="estrutura"><div class="in">
  <div class="est-fotos"><figure class="e1">${img('galpao-equipe', 'Equipe da Destil trabalhando no galpão')}</figure><figure class="e2">${img('galpao-ponte', 'Galpão com ponte rolante de 15 toneladas')}</figure><figure class="e3">${img('painel', 'Painel elétrico das balanceadoras')}</figure></div>
  <div class="est-txt"><p class="eyebrow">Estrutura</p><h2>Galpão preparado para peças grandes</h2><ul class="est-lista">${estrutura.map(e => `<li>${ic(e.ic)}<span><b>${e.t}</b>${e.d}</span></li>`).join('')}</ul><a class="btn btn-linha-escura" href="/a/empresa/">Conheça a empresa ${ic('seta')}</a></div>
</div></section>`);

  return pagina(v, 'index', titulo, T.oferece, `
<section class="hero"><div class="in">
  <div class="hero-txt"><p class="eyebrow">Balanceamentos industriais · Piracicaba, SP</p><h1>Precisão em cada rotação.</h1><p>${T.oferece} Processo computadorizado, com certificado de conformidade.</p>
  <div class="botoes"><a class="btn" href="/b/contato/">Agendar serviço ${ic('seta')}</a><a class="btn btn-linha" href="#processo">Como funciona</a></div></div>
  <figure class="hero-foto">${img('rotor-laranja', 'Rotor helicoidal laranja montado na balanceadora da Destil', ' fetchpriority="high" loading="eager"')}<figcaption>Rotor helicoidal na balanceadora</figcaption></figure>
</div>
<div class="selos-faixa"><ul class="selos in"><li>${ic('gira')}<span><b>Computadorizado</b>leitura e correção precisas</span></li><li>${ic('cert')}<span><b>Certificado</b>de conformidade em cada peça</span></li><li>${ic('relogio')}<span><b>Mesmo dia</b>com atendimento agendado*</span></li><li>${ic('ponte')}<span><b>Ponte de 15 t</b>para peças grandes</span></li></ul></div>
</section>

<section class="processo" id="processo"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Balanceamento</p><h2>Da chegada da peça ao certificado</h2><p>${T.balanceamento}</p></div>
  ${etapasBloco(v)}
</div></section>

<section class="faixa-pecas"><div class="in">
  <div class="sec-tit lado"><div><p class="eyebrow">Na balanceadora</p><h2>Peças que passam pela Destil</h2></div><a class="link" href="/b/balanceamento/">Ver balanceamento ${ic('seta')}</a></div>
  ${pecasBloco}
</div></section>

<section class="metal"><div class="in">
  <div class="metal-txt"><p class="eyebrow">Metalização</p><h2>Recupera a peça e evita o desgaste antes da hora</h2><p>${T.metalizacao}</p><a class="btn btn-linha" href="/b/metalizacao/">Ver metalização ${ic('seta')}</a></div>
  ${antesDepois}
</div></section>

<section class="setores"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Para quem trabalhamos</p><h2>Indústrias que não podem parar</h2></div>
  <ul class="set-lista">${setores.map(s => `<li>${img(s.img, s.nome)}<span>${s.nome}</span></li>`).join('')}</ul>
</div></section>

<section class="quem"><div class="in">
  <figure>${img('fachada-alta', 'Fachada da Destil em Piracicaba')}</figure>
  <div><p class="eyebrow">Quem somos</p><h2>Balanceamentos e metalizações em Piracicaba</h2><p>${T.quemSomos[0]}</p><p>${T.quemSomos[1]}</p><a class="link" href="/b/empresa/">Conheça a empresa ${ic('seta')}</a></div>
</div></section>

${mesmoDia(v)}`);
}

function empresaPag(v) {
  return pagina(v, 'empresa', 'Empresa · Destil Balanceamentos Industriais', T.quemSomos.join(' '), `
${capa(v, 'fachada', 'Empresa', 'Quem somos', T.oferece)}
<section class="texto-foto"><div class="in">
  <div><h2>${T.slogan}</h2><p>${T.quemSomos[0]}</p><p>${T.quemSomos[1]}</p></div>
  <figure>${img('fachada-alta', 'Fachada da Destil, com o logo na parede e os portões laranja')}</figure>
</div></section>
<section class="estrutura-lista"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Estrutura</p><h2>Instalações</h2></div>
  <ul class="est-lista">${estrutura.map(e => `<li>${ic(e.ic)}<span><b>${e.t}</b>${e.d}</span></li>`).join('')}</ul>
</div></section>
<section class="galeria"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Por dentro</p><h2>O galpão da Destil</h2></div>
  <div class="gal">
    <figure class="g-largo">${img('galpao-equipe', 'Equipe trabalhando no galpão')}<figcaption>Área de montagem e solda</figcaption></figure>
    <figure>${img('galpao-ponte', 'Ponte rolante de 15 t')}<figcaption>Ponte rolante de 15 t</figcaption></figure>
    <figure>${img('eixo-turbina', 'Eixo com rotor içado pela ponte rolante')}<figcaption>Peça movimentada pela ponte</figcaption></figure>
    <figure class="g-alto">${img('painel', 'Painel elétrico das máquinas')}<figcaption>Painel elétrico das máquinas</figcaption></figure>
    <figure>${img('galpao-oficina', 'Oficina com bancadas e máquinas')}<figcaption>Oficina</figcaption></figure>
    <figure>${img('galpao-pecas', 'Peças aguardando balanceamento')}<figcaption>Peças na fila de serviço</figcaption></figure>
    <figure>${img('galpao-entrada', 'Entrada do galpão e escritório')}<figcaption>Escritório e entrada</figcaption></figure>
    <figure>${img('eixo-facas', 'Eixo de facas preparado para o balanceamento')}<figcaption>Eixo de facas na preparação</figcaption></figure>
  </div>
</div></section>
${mesmoDia(v)}`);
}

function balanceamentoPag(v) {
  return pagina(v, 'balanceamento', 'Balanceamento · Destil Balanceamentos Industriais', T.balanceamento, `
${capa(v, 'maquina', 'Balanceamento', 'Balanceamento computadorizado com certificado', T.balanceamento)}
<section class="processo"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Como funciona</p><h2>Etapas do serviço</h2></div>
  ${etapasBloco(v)}
</div></section>
<section class="faixa-pecas"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Peças</p><h2>O que balanceamos</h2><p>Algumas das peças que já passaram pelas nossas máquinas. Tem outra peça? Envie as medidas e o peso pelo contato.</p></div>
  ${pecasBloco}
</div></section>
<section class="galeria"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Na oficina</p><h2>Montagem e preparação</h2></div>
  <div class="gal gal-4">
    <figure>${img('eixo-motor', 'Eixo montado na balanceadora')}</figure>
    <figure>${img('solda', 'Soldador da Destil trabalhando em rotor')}</figure>
    <figure>${img('pas', 'Eixos com pás alinhados')}</figure>
    <figure>${img('rotores-pretos', 'Rotores de pás retas')}</figure>
  </div>
</div></section>
${mesmoDia(v)}`);
}

function metalizacaoPag(v) {
  const beneficios = [
    ['gira', 'Recupera', 'A peça desgastada volta à medida de trabalho.'],
    ['escudo', 'Normaliza', 'Superfície uniforme, pronta para montar.'],
    ['relogio', 'Dura mais', 'Evita desgastes prematuros nas peças do equipamento.'],
    ['cert', 'Menos paradas', 'Diminui as paradas por manutenção corretiva.'],
  ];
  return pagina(v, 'metalizacao', 'Metalização · Destil Balanceamentos Industriais', T.metalizacao, `
${capa(v, 'metalizacao', 'Outros serviços', 'Metalização', T.metalizacao)}
<section class="metal"><div class="in">
  <div class="metal-txt"><p class="eyebrow">Antes e depois</p><h2>Antes e depois da metalização</h2><p>${T.metalizacao}</p></div>
  ${antesDepois}
</div></section>
<section class="beneficios"><div class="in">
  <ul>${beneficios.map(([i, t, d]) => `<li>${ic(i)}<b>${t}</b><p>${d}</p></li>`).join('')}</ul>
</div></section>
${mesmoDia(v)}`);
}

function diferenciaisPag(v) {
  return pagina(v, 'diferenciais', 'Diferenciais · Destil Balanceamentos Industriais', `${T.mesmoDia} ${T.fresamento}`, `
${capa(v, 'polia-1', 'Outros serviços', 'Diferenciais', 'O que faz a Destil diferente no dia a dia da sua manutenção.')}
<section class="difs"><div class="in">
  <article class="dif"><span class="dif-ic">${ic('relogio')}</span><div><p class="eyebrow">Diferencial 01</p><h2>Serviço e entrega no mesmo dia</h2><p>${T.mesmoDia}</p><p class="nota">*${T.mesmoDiaNota}</p><a class="btn" href="/${v}/contato/">Agendar ${ic('seta')}</a></div><figure>${img('maquina', 'Balanceadora pronta para atendimento')}</figure></article>
  <article class="dif inv"><span class="dif-ic">${ic('fresa')}</span><div><p class="eyebrow">Diferencial 02</p><h2>Fresamento</h2><p>${T.fresamento}</p></div><figure>${img('polia-2', 'Polia com rebaixo de peso feito na fresadora')}</figure></article>
</div></section>
<section class="galeria"><div class="in">
  <div class="gal gal-3">
    <figure>${img('polia-1', 'Polia com rebaixos de remoção de peso')}</figure>
    <figure>${img('rotores-1', 'Rotores usinados empilhados')}</figure>
    <figure>${img('rotores-2', 'Lote de rotores de bomba')}</figure>
  </div>
</div></section>`);
}

function contatoPag(v) {
  return pagina(v, 'contato', 'Contato · Destil Balanceamentos Industriais', 'Envie uma mensagem com solicitações ou dúvidas. Rua Tupis, 180, Piracicaba, SP.', `
${capa(v, 'fachada', 'Contato', 'Envie uma mensagem', 'Envie-nos uma mensagem com solicitações ou dúvidas. Ficaremos gratos pela oportunidade de entrar em contato.')}
<section class="contato"><div class="in">
  ${formulario(v)}
  <aside class="ct-info">
    <h2>Destil Balanceamentos Industriais</h2>
    <ul>
      <li>${ic('tel')}<span><b>Telefones</b>${E.fones.map(f => `<a href="tel:${f.href}">${f.fone}</a>`).join('<br>')}</span></li>
      <li>${ic('mail')}<span><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></span></li>
      <li>${ic('pin')}<span><b>Endereço</b>${E.endereco.join('<br>')}</span></li>
    </ul>
    <iframe class="mapa" src="${E.mapaEmbed}" title="Mapa: Rua Tupis, 180, Piracicaba" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </aside>
</div></section>`);
}

export function gerarVersao(v) {
  return {
    index: home(v),
    empresa: empresaPag(v),
    balanceamento: balanceamentoPag(v),
    metalizacao: metalizacaoPag(v),
    diferenciais: diferenciaisPag(v),
    contato: contatoPag(v),
  };
}
