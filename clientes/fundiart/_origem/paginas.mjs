// Monta as páginas das versões A ("Fornalha": fiel ao site atual, fundo preto, fogo, faixa de menu laranja, obras passando com legenda)
// e B ("Bronze": clara, galeria em mosaico, processo com foto fixa que troca). Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, apresentacao, publicos, fazemos, categorias, obras, destaques, processo, etapas, foco } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const porId = Object.fromEntries(obras.map(o => [o.id, o]));
const dimFoto = Object.fromEntries([...obras, ...processo].map(o => [o.id, [o.w, o.h]]));
const img = (id, alt, extra = '') => {
  const [w, h] = dimFoto[id] || (foco.includes(id) ? ([1061, 1063, 1064].includes(id) ? [480, 640] : [640, 480]) : [640, 480]);
  return `<img src="/assets/img/obras/${id}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
};
const altObra = o => `${o.titulo}${o.autor ? `, de ${o.autor}` : ''}${o.material ? ` (${o.material.toLowerCase()})` : ''}`;
const ficha = o => [o.autor && `<span>Autor: ${esc(o.autor)}</span>`, o.dim && `<span>Dimensões: ${esc(o.dim)}</span>`, o.material && `<span>Material: ${esc(o.material)}</span>`].filter(Boolean).join('');

export const nomesVersao = { a: 'Fornalha', b: 'Bronze' };

export const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'apresentacao', nome: 'Apresentação', caminho: 'apresentacao/' },
  { slug: 'processo', nome: 'Processo', caminho: 'processo/' },
  { slug: 'trabalhos', nome: 'Trabalhos', caminho: 'trabalhos/' },
  { slug: 'clientes', nome: 'Clientes', caminho: 'clientes/' },
  { slug: 'artistas-em-foco', nome: 'Artistas em foco', caminho: 'artistas-em-foco/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  rota: '<path d="M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4z"/><path d="M6 15V9a3 3 0 013-3h3M18 9v6a3 3 0 01-3 3h-3"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const rotaLink = c => `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(c + ', SP')}&destination=${encodeURIComponent(E.enderecoLinha)}`;
const href = (v, slug, hash = '') => `/${v}/${nav.find(n => n.slug === slug).caminho}${hash}`;

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
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#0e0605' : '#ffffff'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Arimo:wght@500;700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/apresenta.css">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/apresenta.js" defer></script>
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');

function topo(v, atual) {
  if (v === 'a') return `<header class="topo">
  <div class="topo-in in">
    <a class="marca" href="/a/" aria-label="Fundiart, página inicial"><img src="/assets/logo-branco.svg" alt="Fundiart Fundição Artística Ltda." width="232" height="62"></a>
    <div class="topo-cont"><a href="tel:${E.foneHref}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></div>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
  <nav id="menu" class="menu" aria-label="Principal"><div class="in">${menu(v, atual)}</div></nav>
</header>`;
  return `<header class="topo"><div class="topo-in in">
  <a class="marca" href="/b/" aria-label="Fundiart, página inicial"><img src="/assets/logo.svg" alt="Fundiart Fundição Artística Ltda." width="206" height="55"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="btn btn-topo" href="${href(v, 'contato', '#orcamento')}">Pedir orçamento</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in rod-grade">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Fundiart Fundição Artística Ltda." width="232" height="62"><p>Fundição de metais não ferrosos: bronze, alumínio e latão. Obras de arte, monumentos, troféus e ornamentos para jazigo.</p></div>
  <div><h2>Fábrica</h2><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')}Ver no mapa</a></div>
  <div><h2>Fale com a gente</h2><p><a href="tel:${E.foneHref}">Fone ${E.fone}</a><br>Fax ${E.fax}<br><a href="mailto:${E.email}">${E.email}</a></p></div>
  <nav aria-label="Rodapé"><h2>Site</h2>${nav.map(n => `<a href="/${v}/${n.caminho}">${n.nome}</a>`).join('')}</nav>
</div><div class="in rod-fim"><span>© ${E.razao} · Piracicaba, SP</span><a href="/">Ver as duas versões</a></div></footer>
<div class="lb" id="lb" hidden role="dialog" aria-modal="true" aria-label="Foto ampliada"><button class="lb-x" type="button" aria-label="Fechar">×</button><button class="lb-ant" type="button" aria-label="Anterior">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-prox" type="button" aria-label="Próxima">›</button></div>`;
}

const pagina = (v, slug, titulo, desc, corpo) => `${head(v, slug === 'index' ? '' : nav.find(n => n.slug === slug).caminho, titulo, desc)}
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

// ---------- peças comuns ----------
// Galeria com filtro por categoria e ampliação (lightbox). data-legenda vai para a foto ampliada.
function galeria(v) {
  const abas = [{ slug: 'todas', nome: 'Todas' }, ...categorias];
  return `<div class="filtro" role="tablist" aria-label="Filtrar trabalhos">${abas.map((c, i) => `<button type="button" role="tab" data-filtro="${c.slug}" aria-selected="${i ? 'false' : 'true'}">${c.nome}<small>${c.slug === 'todas' ? obras.length : obras.filter(o => o.cat === c.slug).length}</small></button>`).join('')}</div>
<ul class="galeria" data-galeria>${obras.map(o => `<li data-cat="${o.cat}"><a href="/assets/img/obras/${o.id}.webp" data-amplia data-legenda="${esc([o.titulo, o.autor && `Autor: ${o.autor}`, o.dim && `Dimensões: ${o.dim}`, o.material && `Material: ${o.material}`].filter(Boolean).join(' · '))}">${img(o.id, altObra(o))}<span class="g-leg"><b>${esc(o.titulo)}</b>${o.autor ? `<span>${esc(o.autor)}</span>` : ''}</span></a></li>`).join('')}</ul>`;
}

function artistas() {
  const nomes = {};
  for (const o of obras) if (o.autor) (nomes[o.autor] ||= []).push(o);
  nomes['Giuseppe Bosica'] ||= [];
  return Object.entries(nomes).sort((a, b) => a[0].localeCompare(b[0], 'pt'));
}

const formContato = () => `<form class="form" id="orcamento" data-mailto="${E.email}" data-assunto="Contato pelo site da Fundiart">
  <div class="campos">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>Empresa ou ateliê<input name="Empresa" autocomplete="organization"></label>
    <label>Cidade e estado<input name="Cidade" autocomplete="address-level2"></label>
    <label>Telefone<input name="Telefone" type="tel" autocomplete="tel" required></label>
    <label class="larga">E-mail<input name="E-mail" type="email" autocomplete="email" required></label>
    <label class="larga">O que você quer fundir?<select name="Tipo de peça"><option>Escultura</option><option>Monumento ou busto</option><option>Troféu</option><option>Ornamento para jazigo</option><option>Placa</option><option>Outro</option></select></label>
    <label class="larga">Mensagem<textarea name="Mensagem" rows="5" placeholder="Material, tamanho aproximado, quantidade e prazo"></textarea></label>
  </div>
  <button class="btn" type="submit">${ic('mail')}Enviar mensagem</button>
  <p class="form-nota">A mensagem abre no seu e-mail já preenchida, endereçada a ${E.email}.</p>
</form>`;

const blocoRotas = v => `<div class="rotas"><h3>Como chegar</h3><p>Rota até a fábrica saindo de:</p><div class="rotas-l">${E.rotas.map(c => `<a href="${rotaLink(c)}" target="_blank" rel="noopener">${ic('rota')}${c}</a>`).join('')}</div></div>`;

// =====================================================================
// Versão A · Fornalha
// =====================================================================
function capaA(eyebrow, titulo, sub = '') {
  return `<section class="capa"><div class="capa-fogo" aria-hidden="true"></div><div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p class="capa-sub">${sub}</p>` : ''}</div></section>`;
}

function paginasA() {
  const v = 'a', p = {};
  const vitrine = destaques.map(id => porId[id]);
  p.index = pagina(v, 'index', 'Fundiart · Fundição Artística em bronze, alumínio e latão', 'Fundição artística em Piracicaba (SP): esculturas, monumentos, troféus e ornamentos para jazigo em bronze, alumínio e latão.', `
<section class="hero"><div class="hero-fogo" aria-hidden="true"></div><div class="in hero-grade">
  <div class="hero-txt">
    <p class="eyebrow" data-rev>Fundição artística · Piracicaba, SP</p>
    <h1 data-palavras>A ideia do artista, fundida em metal.</h1>
    <p class="hero-sub" data-rev style="--ap-d:200ms">Bronze, alumínio e latão para obras de arte, monumentos de grande porte, troféus e ornamentos para jazigo, com fidelidade na reprodução de cada peça.</p>
    <div class="acoes" data-rev style="--ap-d:320ms"><a class="btn" href="${href(v, 'trabalhos')}">Ver trabalhos${ic('seta')}</a><a class="btn btn-linha" href="${href(v, 'contato', '#orcamento')}">Pedir orçamento</a></div>
  </div>
  <div class="vitrine" data-slides>${vitrine.map((o, i) => `<figure${i ? '' : ' class="on"'}><div class="v-foto">${img(o.id, altObra(o), i ? '' : ' fetchpriority="high" loading="eager"')}</div><figcaption><b>${esc(o.titulo)}</b>${ficha(o)}</figcaption></figure>`).join('')}
    <div class="v-pontos" role="tablist" aria-label="Obras em destaque">${vitrine.map((o, i) => `<button type="button" aria-label="${esc(o.titulo)}"${i ? '' : ' aria-current="true"'}></button>`).join('')}</div>
  </div>
</div></section>

<section class="faixa-metais"><div class="in">${E.metais.map(m => `<span>${m}</span>`).join('')}<span class="fm-txt">Fundição de metais não ferrosos</span></div></section>

<section class="sec intro"><div class="in intro-grade">
  <figure class="intro-foto" data-rev="esq">${img(1026, 'Vazamento do metal líquido no molde, na Fundiart')}</figure>
  <div data-rev>
    <p class="eyebrow">Apresentação</p>
    <h2>Uma tradicional fundição de metais não ferrosos.</h2>
    <p>${apresentacao[0].replace('A FUNDIART', 'A Fundiart')}</p>
    <p>${apresentacao[1]}</p>
    <a class="link" href="${href(v, 'apresentacao')}">Conheça a Fundiart${ic('seta')}</a>
  </div>
</div></section>

<section class="sec linhas"><div class="in">
  <div class="sec-cab" data-rev><p class="eyebrow">Trabalhos</p><h2>O que sai da nossa fornalha.</h2></div>
  <ol class="linhas-l">${categorias.map((c, i) => {
    const fs = obras.filter(o => o.cat === c.slug).slice(0, 4);
    return `<li data-rev style="--ap-d:${i * 80}ms"><a href="${href(v, 'trabalhos', '#' + c.slug)}"><span class="l-n">0${i + 1}</span><span class="l-txt"><b>${c.nome}</b><span>${c.texto}</span></span><span class="l-fotos">${fs.map(o => img(o.id, '')).join('')}</span><span class="l-seta">${ic('seta')}</span></a></li>`;
  }).join('')}</ol>
</div></section>

<section class="sec processo-home"><div class="in">
  <div class="sec-cab" data-rev><p class="eyebrow">Processo</p><h2>Do modelo à pátina, tudo dentro da fábrica.</h2></div>
  <div class="etapas" data-etapas><span class="ap-trilho" aria-hidden="true"></span>${etapas.map(e => `<div class="ap-etapa etapa"><figure>${img(e.foto, `${e.nome}: ${processo.find(x => x.id === e.foto).legenda}`)}</figure><span class="e-n">${e.n}</span><h3>${e.nome}</h3><p>${e.texto}</p></div>`).join('')}</div>
  <a class="link" href="${href(v, 'processo')}">Ver o processo completo${ic('seta')}</a>
</div></section>

<section class="sec artistas-home"><div class="in">
  <div class="sec-cab" data-rev><p class="eyebrow">Clientes</p><h2>Artistas que confiam suas obras à Fundiart.</h2></div>
  <ul class="nomes" data-rev-filhos data-rev-passo="60">${artistas().map(([n]) => `<li>${esc(n)}</li>`).join('')}</ul>
  <a class="link" href="${href(v, 'clientes')}">Ver obras por artista${ic('seta')}</a>
</div></section>

<section class="destaque"><div class="in destaque-grade">
  <div data-rev><p class="eyebrow">Destaque</p><h2>Exposição Fundiart no Engenho Central.</h2><p>Abertura da exposição que aconteceu no Engenho Central, em Piracicaba, e as visitas de artistas à fábrica.</p><a class="btn btn-linha" href="${href(v, 'artistas-em-foco')}">Artistas em foco${ic('seta')}</a></div>
  <div class="destaque-fotos">${[1060, 1063, 1057].map((id, i) => `<figure data-rev="zoom" style="--ap-d:${i * 120}ms">${img(id, 'Artistas em visita à Fundiart')}</figure>`).join('')}</div>
</div></section>

${chamadaA(v)}`);

  p.apresentacao = pagina(v, 'apresentacao', 'Apresentação · Fundiart', 'A Fundiart é uma tradicional fundição de metais não ferrosos (alumínio, bronze e latão), especializada em obras de arte.', `
${capaA('Apresentação', 'Fundição artística de bronze, alumínio e latão.', 'Em Piracicaba, no Distrito Industrial Unileste.')}
<section class="sec"><div class="in apres-grade">
  <figure class="apres-foto" data-rev="esq">${`<img src="/assets/img/apresentacao.webp" alt="Fundição do metal na Fundiart" width="207" height="447" loading="lazy">`}</figure>
  <div class="apres-txt" data-rev>${apresentacao.map((t, i) => i === 0 ? `<p class="lead">${t.replace('A FUNDIART', 'A Fundiart')}</p>` : `<p>${t.replace('a FUNDIART', 'a Fundiart').replace('O SEU', 'o seu')}</p>`).join('')}</div>
</div></section>
<section class="sec sec-escura"><div class="in dupla">
  <div data-rev><p class="eyebrow">Fazemos</p><ul class="lista-tags">${fazemos.map(f => `<li>${f}</li>`).join('')}</ul></div>
  <div data-rev style="--ap-d:120ms"><p class="eyebrow">Para quem</p><ul class="lista-tags">${publicos.map(f => `<li>${f}</li>`).join('')}</ul></div>
</div></section>
<section class="sec"><div class="in valores-a">
  ${[['Qualidade', 'Clientes conquistados pela qualidade dos produtos e pela fidelidade na reprodução das peças.'], ['Equipe', 'Funcionários do mais alto nível, que conversam direto com o cliente e transformam ideias em realidade.'], ['Meio ambiente', 'Compromisso com o meio ambiente, com uso de matérias-primas recicláveis.']].map(([t, d], i) => `<div class="valor" data-rev style="--ap-d:${i * 100}ms"><span>0${i + 1}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
</div></section>
${chamadaA(v)}`);

  p.processo = pagina(v, 'processo', 'Processo · Fundiart', 'Como a Fundiart transforma o modelo do artista em bronze, alumínio ou latão: modelo, fusão, vazamento e acabamento.', `
${capaA('Processo', 'Como a peça nasce na Fundiart.', 'Quatro etapas, todas dentro da fábrica, com o artista acompanhando quando quiser.')}
<section class="sec troca"><div class="in troca-grade" data-troca>
  <div class="ap-troca-midia">${etapas.map((e, i) => `<figure${i ? '' : ' class="ap-on"'}>${img(e.foto, processo.find(x => x.id === e.foto).legenda)}<figcaption>${processo.find(x => x.id === e.foto).legenda}</figcaption></figure>`).join('')}</div>
  <div class="troca-passos">${etapas.map(e => `<div class="ap-troca-passo"><span class="e-n">${e.n}</span><h2>${e.nome}</h2><p>${e.texto}</p></div>`).join('')}</div>
</div></section>
<section class="sec sec-escura"><div class="in">
  <div class="sec-cab" data-rev><p class="eyebrow">Galeria</p><h2>Algumas imagens de nossos processos.</h2></div>
  <ul class="galeria galeria-proc" data-galeria>${processo.map(f => `<li><a href="/assets/img/obras/${f.id}.webp" data-amplia data-legenda="${esc(f.legenda)}">${img(f.id, f.legenda)}<span class="g-leg"><b>${esc(f.legenda)}</b></span></a></li>`).join('')}</ul>
</div></section>
${chamadaA(v)}`);

  p.trabalhos = pagina(v, 'trabalhos', 'Trabalhos · Fundiart', 'Esculturas, monumentos, troféus e ornamentos para jazigos fundidos pela Fundiart.', `
${capaA('Trabalhos', 'Alguns trabalhos executados.', `${obras.length} peças em bronze, alumínio e latão. Toque na foto para ampliar.`)}
<section class="sec"><div class="in">${galeria(v)}</div></section>
${chamadaA(v)}`);

  p.clientes = pagina(v, 'clientes', 'Clientes · Fundiart', 'Artistas plásticos que fundiram suas obras na Fundiart.', `
${capaA('Clientes', 'Artistas que fundem com a gente.', 'Nossa clientela é formada por artistas plásticos, designers, arquitetos, marmoristas, órgãos públicos e particulares.')}
<section class="sec"><div class="in">
  <ul class="artistas">${artistas().map(([n, os]) => `<li data-rev><h2>${esc(n)}</h2>${os.length ? `<div class="art-obras">${os.slice(0, 3).map(o => `<a href="/assets/img/obras/${o.id}.webp" data-amplia data-legenda="${esc(o.titulo + (o.material ? ' · ' + o.material : ''))}">${img(o.id, altObra(o))}<span>${esc(o.titulo)}</span></a>`).join('')}</div>` : `<p class="art-nota">Acompanhou a fundição de seu trabalho na fábrica.</p>`}</li>`).join('')}</ul>
</div></section>
${chamadaA(v)}`);

  p['artistas-em-foco'] = pagina(v, 'artistas-em-foco', 'Artistas em foco · Fundiart', 'Artistas, visitas e a exposição Fundiart no Engenho Central, em Piracicaba.', `
${capaA('Artistas em foco', 'Quem passa pela fábrica.', 'Visitas de artistas e estudantes e a abertura da exposição Fundiart no Engenho Central, em Piracicaba.')}
<section class="sec"><div class="in"><ul class="foco">${foco.map((id, i) => `<li data-rev style="--ap-d:${(i % 3) * 90}ms"><a href="/assets/img/obras/${id}.webp" data-amplia data-legenda="Artistas em foco · Fundiart">${img(id, 'Artistas em visita à Fundiart')}</a></li>`).join('')}</ul></div></section>
${chamadaA(v)}`);

  p.contato = pagina(v, 'contato', 'Contato · Fundiart', `Fale com a Fundiart: ${E.fone}, ${E.email}. Rua Francisco Carlos de Castro Neves, 1.551, Piracicaba (SP).`, `
${capaA('Contato', 'Conte o que você quer fundir.', 'Responderemos o mais brevemente possível.')}
<section class="sec"><div class="in contato-grade">
  <div class="contato-info">
    <h2>Fundiart</h2>
    <p>${E.endereco.join('<br>')}</p>
    <p><a href="tel:${E.foneHref}">${ic('tel')}Fone ${E.fone}</a><br><span class="fax">Fax ${E.fax}</span><br><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></p>
    ${blocoRotas(v)}
  </div>
  ${formContato()}
</div></section>
<section class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa da Fundiart em Piracicaba" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`);
  return p;
}

function chamadaA(v) {
  return `<section class="chamada"><div class="in chamada-in"><h2 data-rev>Tem uma obra para fundir?</h2><p data-rev>Fale com a nossa equipe: bronze, alumínio ou latão, de uma peça única a uma série de troféus.</p><div class="acoes" data-rev><a class="btn btn-claro" href="${href(v, 'contato', '#orcamento')}">Pedir orçamento${ic('seta')}</a><a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')}${E.fone}</a></div></div></section>`;
}

// =====================================================================
// Versão B · Bronze
// =====================================================================
function capaB(eyebrow, titulo, sub, fotos) {
  return `<section class="capa"><div class="in capa-grade"><div><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p class="capa-sub">${sub}</p>` : ''}</div>${fotos ? `<div class="capa-fotos">${fotos.map(id => `<figure>${img(id, porId[id] ? altObra(porId[id]) : (processo.find(x => x.id === id)?.legenda || 'Fundiart'))}</figure>`).join('')}</div>` : ''}</div></section>`;
}

function paginasB() {
  const v = 'b', p = {};
  const mosaico = [953, 959, 1026, 981, 962, 1011];
  p.index = pagina(v, 'index', 'Fundiart · Fundição Artística em bronze, alumínio e latão', 'Fundição artística em Piracicaba (SP): esculturas, monumentos, troféus e ornamentos para jazigo em bronze, alumínio e latão.', `
<section class="hero"><div class="in hero-grade">
  <div class="hero-txt">
    <p class="eyebrow" data-rev>Fundiart · Fundição Artística</p>
    <h1 data-palavras>Bronze, alumínio e latão com a assinatura do artista.</h1>
    <p class="hero-sub" data-rev style="--ap-d:200ms">Em Piracicaba, fundimos esculturas, monumentos de grande porte, troféus e ornamentos para jazigo para artistas, arquitetos, marmoristas e órgãos públicos.</p>
    <div class="acoes" data-rev style="--ap-d:320ms"><a class="btn" href="${href(v, 'contato', '#orcamento')}">Pedir orçamento${ic('seta')}</a><a class="btn btn-linha" href="${href(v, 'trabalhos')}">Ver ${obras.length} trabalhos</a></div>
  </div>
  <div class="mosaico">${mosaico.map((id, i) => `<figure class="m${i + 1}" data-rev="zoom" style="--ap-d:${i * 90}ms">${img(id, porId[id] ? altObra(porId[id]) : 'Vazamento do metal no molde', i < 2 ? ' fetchpriority="high" loading="eager"' : '')}</figure>`).join('')}</div>
</div></section>

<section class="numeros"><div class="in numeros-l">
  <div><b>3</b><span>metais não ferrosos: bronze, alumínio e latão</span></div>
  <div><b>6 x 5 m</b><span>o monumento Cavaleiro, de Neusa Moraes, em bronze</span></div>
  <div><b data-conta>${artistas().length}</b><span>artistas com obras na nossa galeria</span></div>
  <div><b data-conta>${obras.length}</b><span>trabalhos publicados, de troféus a monumentos</span></div>
</div></section>

<section class="sec cats"><div class="in">
  <div class="sec-cab" data-rev><p class="eyebrow">O que fundimos</p><h2>Quatro frentes, a mesma fidelidade na reprodução.</h2></div>
  <div class="cats-grade">${categorias.map((c, i) => {
    const capa = { esculturas: 959, monumentos: 953, trofeus: 996, jazigos: 1003 }[c.slug];
    return `<a class="cat cat-${i + 1}" href="${href(v, 'trabalhos', '#' + c.slug)}" data-rev style="--ap-d:${i * 90}ms"><figure>${img(capa, altObra(porId[capa]))}</figure><span class="cat-txt"><b>${c.nome}</b><span>${c.texto}</span><em>${obras.filter(o => o.cat === c.slug).length} peças ${ic('seta')}</em></span></a>`;
  }).join('')}</div>
</div></section>

<section class="sec sec-escura proc-b"><div class="in">
  <div class="sec-cab" data-rev><p class="eyebrow">Processo</p><h2>Do modelo à pátina.</h2><p>Tudo feito na fábrica de Piracicaba, com a equipe conversando direto com o artista.</p></div>
  <ol class="etapas-b" data-etapas><span class="ap-trilho" aria-hidden="true"></span>${etapas.map(e => `<li class="ap-etapa"><span class="e-n">${e.n}</span><h3>${e.nome}</h3><p>${e.texto}</p></li>`).join('')}</ol>
  <div class="proc-fotos">${[952, 957, 1026, 950].map((id, i) => `<figure data-rev style="--ap-d:${i * 90}ms">${img(id, processo.find(x => x.id === id).legenda)}</figure>`).join('')}</div>
  <a class="link" href="${href(v, 'processo')}">Ver o processo em detalhe${ic('seta')}</a>
</div></section>

<section class="sec citacao"><div class="in cit-grade">
  <figure data-rev="esq">${img(954, altObra(porId[954]))}</figure>
  <div data-rev>
    <p class="eyebrow">Monumento</p>
    <h2>Carlos Drummond de Andrade e Mario Quintana, de Francisco Stockinger.</h2>
    <p>Três metros de altura em bronze patinado. Um dos monumentos fundidos pela Fundiart, ao lado de obras de ${['Neusa Moraes', 'Edu Santos', 'Victor Brecheret', 'Odette Eid'].join(', ').replace(/, ([^,]*)$/, ' e $1')}.</p>
    <a class="link" href="${href(v, 'trabalhos', '#monumentos')}">Ver monumentos${ic('seta')}</a>
  </div>
</div></section>

<section class="sec artistas-b"><div class="in">
  <div class="sec-cab" data-rev><p class="eyebrow">Clientes</p><h2>Artistas que fundem com a gente.</h2></div>
  <ul class="nomes-b">${artistas().map(([n, os]) => `<li><a href="${href(v, 'clientes')}#${slug(n)}"><b>${esc(n)}</b><span>${os.length ? `${os.length} ${os.length > 1 ? 'obras' : 'obra'}` : 'visita à fábrica'}</span></a></li>`).join('')}</ul>
</div></section>

${chamadaB(v)}`);

  p.apresentacao = pagina(v, 'apresentacao', 'Apresentação · Fundiart', 'A Fundiart é uma tradicional fundição de metais não ferrosos (alumínio, bronze e latão), especializada em obras de arte.', `
${capaB('Apresentação', 'Uma tradicional fundição de metais não ferrosos.', 'Alumínio, bronze e latão para obras de arte, decoração, utilitários, jazigos, placas, troféus, bustos e monumentos.', [955, 1024])}
<section class="sec"><div class="in apres-b">
  <div class="apres-txt" data-rev>${apresentacao.slice(1).map(t => `<p>${t.replace('a FUNDIART', 'a Fundiart').replace('O SEU', 'o seu')}</p>`).join('')}</div>
  <aside class="apres-lado" data-rev style="--ap-d:120ms"><h2>Para quem</h2><ul>${publicos.map(f => `<li>${f}</li>`).join('')}</ul><h2>O que fazemos</h2><ul>${fazemos.map(f => `<li>${f}</li>`).join('')}</ul></aside>
</div></section>
<section class="sec sec-cinza"><div class="in valores-b">
  ${[['Fidelidade', 'Reprodução fiel de cada peça, do troféu de 30 cm ao monumento de 6 metros.', 962], ['Equipe', 'Funcionários do mais alto nível, que conversam direto com o cliente.', 956], ['Meio ambiente', 'Matérias-primas recicláveis em toda a produção.', 1025]].map(([t, d, id], i) => `<div class="valor-b" data-rev style="--ap-d:${i * 100}ms"><figure>${img(id, porId[id] ? altObra(porId[id]) : processo.find(x => x.id === id).legenda)}</figure><h3>${t}</h3><p>${d}</p></div>`).join('')}
</div></section>
${chamadaB(v)}`);

  p.processo = pagina(v, 'processo', 'Processo · Fundiart', 'Como a Fundiart transforma o modelo do artista em bronze, alumínio ou latão: modelo, fusão, vazamento e acabamento.', `
${capaB('Processo', 'Do modelo do artista à peça pronta.', 'Quatro etapas dentro da fábrica de Piracicaba.')}
<section class="sec"><div class="in passos-b">${etapas.map((e, i) => {
    const fotos = { '01': [952, 955, 956], '02': [957, 1023, 1024], '03': [1026, 1025], '04': [950, 1022] }[e.n];
    return `<article class="passo${i % 2 ? ' inv' : ''}" data-rev><div class="passo-txt"><span class="e-n">${e.n}</span><h2>${e.nome}</h2><p>${e.texto}</p></div><div class="passo-fotos n${fotos.length}">${fotos.map(id => { const f = processo.find(x => x.id === id); return `<a href="/assets/img/obras/${id}.webp" data-amplia data-legenda="${esc(f.legenda)}">${img(id, f.legenda)}</a>`; }).join('')}</div></article>`;
  }).join('')}</div></section>
${chamadaB(v)}`);

  p.trabalhos = pagina(v, 'trabalhos', 'Trabalhos · Fundiart', 'Esculturas, monumentos, troféus e ornamentos para jazigos fundidos pela Fundiart.', `
${capaB('Trabalhos', 'Alguns trabalhos executados.', `${obras.length} peças em bronze, alumínio e latão. Filtre por tipo e toque na foto para ampliar.`)}
<section class="sec sec-top0"><div class="in">${galeria(v)}</div></section>
${chamadaB(v)}`);

  p.clientes = pagina(v, 'clientes', 'Clientes · Fundiart', 'Artistas plásticos que fundiram suas obras na Fundiart.', `
${capaB('Clientes', 'Artistas, designers, arquitetos e órgãos públicos.', 'Alguns dos artistas que fundiram suas obras na Fundiart.')}
<section class="sec sec-top0"><div class="in"><div class="artistas-b-l">${artistas().map(([n, os]) => `<section class="art-b" id="${slug(n)}" data-rev><h2>${esc(n)}</h2>${os.length ? `<ul>${os.map(o => `<li><a href="/assets/img/obras/${o.id}.webp" data-amplia data-legenda="${esc([o.titulo, o.dim, o.material].filter(Boolean).join(' · '))}">${img(o.id, altObra(o))}</a><b>${esc(o.titulo)}</b>${o.material ? `<span>${esc(o.material)}</span>` : ''}</li>`).join('')}</ul>` : `<p>Acompanhou a fundição de seu trabalho na fábrica.</p>`}</section>`).join('')}</div></div></section>
${chamadaB(v)}`);

  p['artistas-em-foco'] = pagina(v, 'artistas-em-foco', 'Artistas em foco · Fundiart', 'Artistas, visitas e a exposição Fundiart no Engenho Central, em Piracicaba.', `
${capaB('Artistas em foco', 'Exposição Fundiart no Engenho Central.', 'A abertura da exposição em Piracicaba e as visitas de artistas e estudantes à fábrica.')}
<section class="sec sec-top0"><div class="in"><ul class="foco-b">${foco.map(id => `<li><a href="/assets/img/obras/${id}.webp" data-amplia data-legenda="Artistas em foco · Fundiart">${img(id, 'Artistas em visita à Fundiart')}</a></li>`).join('')}</ul></div></section>
${chamadaB(v)}`);

  p.contato = pagina(v, 'contato', 'Contato · Fundiart', `Fale com a Fundiart: ${E.fone}, ${E.email}. Rua Francisco Carlos de Castro Neves, 1.551, Piracicaba (SP).`, `
${capaB('Contato', 'Vamos fundir a sua peça.', 'Conte o material, o tamanho e a quantidade. Responderemos o mais brevemente possível.')}
<section class="sec sec-top0"><div class="in contato-grade">
  ${formContato()}
  <div class="contato-info">
    <div class="ci-bloco"><h2>Telefone</h2><p><a href="tel:${E.foneHref}">${E.fone}</a><br><span class="fax">Fax ${E.fax}</span></p></div>
    <div class="ci-bloco"><h2>E-mail</h2><p><a href="mailto:${E.email}">${E.email}</a></p></div>
    <div class="ci-bloco"><h2>Fábrica</h2><p>${E.endereco.join('<br>')}</p></div>
    ${blocoRotas(v)}
  </div>
</div></section>
<section class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa da Fundiart em Piracicaba" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`);
  return p;
}

const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function chamadaB(v) {
  return `<section class="chamada"><div class="in chamada-in"><div><h2 data-rev>Tem uma obra para fundir?</h2><p data-rev>Bronze, alumínio ou latão, de uma peça única a uma série de troféus.</p></div><div class="acoes" data-rev><a class="btn" href="${href(v, 'contato', '#orcamento')}">Pedir orçamento${ic('seta')}</a><a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')}${E.fone}</a></div></div></section>`;
}

export const gerarVersao = v => (v === 'a' ? paginasA() : paginasB());
