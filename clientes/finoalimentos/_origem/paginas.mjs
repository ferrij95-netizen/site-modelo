// Páginas das versões A ("Lavoura") e B ("Sacaria") da Fino Alimentos.
import { empresa as E, numeros, destaque, quemSomos, historia, mvv, qualidade, ambiente, produtosIntro, produtos, processo, creditos } from './conteudo.mjs';

export const nomesVersao = { a: 'Lavoura', b: 'Sacaria' };

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = n => `/assets/img/${n}.webp`;

const fontes = {
  a: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@600;800&family=Inter:wght@400;500;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap',
};

// Ícones simples em traço (o site atual usa ícones do Font Awesome nos círculos vermelhos).
const ic = {
  historia: '<path d="M3 21h18M4 10h16M12 3l9 5H3l9-5zM6 10v8M10 10v8M14 10v8M18 10v8"/>',
  qualidade: '<path d="M12 3l2.5 2 3.2-.3.6 3.1 2.7 1.8-1.4 2.9 1.4 2.9-2.7 1.8-.6 3.1-3.2-.3L12 21l-2.5-2-3.2.3-.6-3.1L3 14.4l1.4-2.9L3 8.6l2.7-1.8.6-3.1 3.2.3z"/><path d="M8.5 12l2.4 2.4 4.6-4.8"/>',
  ambiente: '<path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19c3-4 6-7 10-9"/>',
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  face: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8a0 0 0 0 1 0 0z"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
};
const icone = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ic[n]}</svg>`;

const menu = v => [
  { href: `/${v}/`, t: 'Início', slug: 'index' },
  { href: `/${v}/produtos/`, t: 'Produtos', slug: 'produtos', sub: produtos.map(p => ({ href: `/${v}/produtos/${p.slug}/`, t: p.nome })) },
  { href: `/${v}/empresa/`, t: 'Empresa', slug: 'empresa', sub: [
    { href: `/${v}/empresa/`, t: 'História' }, { href: `/${v}/qualidade/`, t: 'Qualidade' },
    { href: `/${v}/meio-ambiente/`, t: 'Meio Ambiente' }, { href: `/${v}/empresa/#missao`, t: 'Missão, Visão e Valores' }] },
  { href: `/${v}/contato/`, t: 'Contato', slug: 'contato' },
];
const grupo = slug => ['qualidade', 'meio-ambiente'].includes(slug) ? 'empresa' : slug.startsWith('produtos') ? 'produtos' : slug;

function nav(v, atual) {
  return `<nav class="nav" aria-label="Principal"><ul>${menu(v).map(m => `<li${m.sub ? ' class="tem-sub"' : ''}><a href="${m.href}"${grupo(atual) === m.slug ? ' aria-current="page"' : ''}>${m.t}</a>${m.sub ? `<ul class="sub">${m.sub.map(s => `<li><a href="${s.href}">${esc(s.t)}</a></li>`).join('')}</ul>` : ''}</li>`).join('')}</ul></nav>`;
}

function cabecalho(v, atual) {
  const logo = v === 'a' ? 'logo.svg' : 'logo-branco.svg';
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${v === 'a' ? `<div class="faixa-topo"><div class="in"><span>Fecularia em Toledo, oeste do Paraná</span><span class="faixa-ct"><a href="tel:${E.telefoneHref}">${icone('fone')}${E.telefone}</a><a href="mailto:${E.email}">${icone('mail')}${E.email}</a></span></div></div>` : ''}
<header class="topo"><div class="in">
  <a class="marca" href="/${v}/" aria-label="Fino Alimentos, início"><img src="/assets/${logo}" alt="Fino Alimentos" width="126" height="55"></a>
  <button class="abre-menu" aria-expanded="false" aria-controls="menu-movel">${icone('menu')}<span>Menu</span></button>
  ${nav(v, atual)}
</div></header>`;
}

function rodape(v) {
  const logo = 'logo-branco.svg';
  return `<footer class="rodape"><div class="in">
  <div class="rp-marca"><img src="/assets/${logo}" alt="Fino Alimentos" width="150" height="65"><p>Amidos nativos e modificados de mandioca para a indústria alimentícia, papel e celulose, farmacêutica, cosmética e têxtil.</p></div>
  <div class="rp-col"><h2>Produtos</h2><ul>${produtos.map(p => `<li><a href="/${v}/produtos/${p.slug}/">${p.nome}</a></li>`).join('')}</ul></div>
  <div class="rp-col"><h2>Empresa</h2><ul><li><a href="/${v}/empresa/">História</a></li><li><a href="/${v}/qualidade/">Qualidade</a></li><li><a href="/${v}/meio-ambiente/">Meio Ambiente</a></li><li><a href="/${v}/empresa/#missao">Missão, Visão e Valores</a></li><li><a href="/${v}/contato/">Contato</a></li></ul></div>
  <div class="rp-col rp-ct"><h2>Fale conosco</h2>
    <p>${icone('pin')}<span>${E.endereco}<br>${E.bairro}<br>${E.cidade}</span></p>
    <p><a href="tel:${E.telefoneHref}">${icone('fone')}${E.telefone}</a></p>
    <p><a href="mailto:${E.email}">${icone('mail')}${E.email}</a></p>
    <p><a href="${E.facebook}" rel="noopener" target="_blank">${icone('face')}facebook.com/finoalimentos</a></p>
  </div>
</div>
<div class="rp-base"><div class="in"><span>Fino Alimentos © 2026</span><span>${creditos}</span><span>Prévia de site por Overtus</span></div></div>
</footer>`;
}

function pagina(v, slug, titulo, desc, corpo, nivel = 1) {
  const canon = `${E.url}${v}/${slug === 'index' ? '' : slug + '/'}`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canon}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canon}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:locale" content="pt_BR">
<meta name="robots" content="noindex">
<meta name="theme-color" content="${v === 'a' ? '#ffffff' : '#DE242A'}">
<link rel="icon" href="/assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontes[v]}">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>
<body class="v-${v} pg-${slug.replace(/\//g, '-')}">
${cabecalho(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;
}

const formulario = v => `<form class="form" data-previa>
  <p class="form-aviso" role="status" hidden>Esta é uma prévia: a mensagem não foi enviada. No site publicado ela chega em ${E.email}.</p>
  <label class="campo larg"><span>Departamento *</span><select name="departamento" required>${E.departamentos.map(d => `<option>${d}</option>`).join('')}</select></label>
  <label class="campo"><span>Nome *</span><input name="nome" required autocomplete="name"></label>
  <label class="campo"><span>Empresa</span><input name="empresa" autocomplete="organization"></label>
  <label class="campo"><span>Cidade</span><input name="cidade" autocomplete="address-level2"></label>
  <label class="campo"><span>Telefone</span><input name="telefone" type="tel" autocomplete="tel"></label>
  <label class="campo larg"><span>E-mail *</span><input name="email" type="email" required autocomplete="email"></label>
  <label class="campo larg"><span>Mensagem *</span><textarea name="mensagem" rows="5" required></textarea></label>
  <button class="btn btn-cheio" type="submit">Enviar mensagem ${icone('seta')}</button>
</form>`;

// ---------------------------------------------------------------- Versão A: Lavoura
const A = {};

A.faixaTitulo = (titulo, trilha, foto = 'lavoura') => `<section class="a-faixa" style="--foto:url(${img(foto)})"><div class="in"><p class="trilha">${trilha}</p><h1>${titulo}</h1></div></section>`;

A.lateral = (atual) => `<aside class="a-lateral"><h2>Empresa</h2><ul>
  <li><a href="/a/empresa/"${atual === 'empresa' ? ' aria-current="page"' : ''}>História</a></li>
  <li><a href="/a/qualidade/"${atual === 'qualidade' ? ' aria-current="page"' : ''}>Qualidade</a></li>
  <li><a href="/a/meio-ambiente/"${atual === 'meio-ambiente' ? ' aria-current="page"' : ''}>Meio Ambiente</a></li>
  <li><a href="/a/empresa/#missao">Missão, Visão e Valores</a></li></ul>
  <a class="a-lat-ct" href="/a/contato/"><strong>Fale com o comercial</strong><span>${E.telefone}</span></a></aside>`;

A.cta = () => `<section class="a-cta" style="--foto:url(${img('aereo')})"><div class="in">
  <div><p class="eyebrow">Comercial</p><h2>Precisa de amido de mandioca para a sua linha?</h2><p>Sacaria de 25 kg ou big-bag, com entrega feita pela própria Fino até a sua empresa.</p></div>
  <div class="a-cta-acoes"><a class="btn btn-cheio" href="/a/contato/">Pedir orçamento ${icone('seta')}</a><a class="a-cta-fone" href="tel:${E.telefoneHref}">${icone('fone')}${E.telefone}</a></div>
</div></section>`;

A.index = () => `
<section class="a-hero" style="--foto:url(${img('lavoura')})">
  <div class="in">
    <figure class="a-hero-saco" data-rev><img src="${img('sacaria')}" alt="Sacos de amido de mandioca Fino Alimentos" width="595" height="380"></figure>
    <div class="a-hero-txt">
      <p class="eyebrow">Fecularia · Toledo, PR</p>
      <h1>${destaque.titulo}</h1>
      <p>${destaque.texto}</p>
      <div class="acoes"><a class="btn btn-cheio" href="/a/produtos/">Saiba mais ${icone('seta')}</a><a class="btn btn-claro" href="/a/contato/">Falar com o comercial</a></div>
    </div>
  </div>
</section>
<section class="a-numeros" aria-label="A Fino em números"><div class="in">${numeros.map(n => `<div class="a-num"><strong><span data-conta>${n.n}</span><small>${n.u}</small></strong><span>${n.t}</span></div>`).join('')}</div></section>

<section class="a-quem"><div class="in">
  <h2 class="a-tit-centro">Quem somos?</h2>
  <div class="a-quem-cols">${quemSomos.map(q => `<article class="a-quem-col" data-rev>
    <span class="a-circulo">${icone(q.icone)}</span><h3>${q.titulo}</h3><p>${q.texto}</p><a class="leia" href="/a/${q.slug}/">Leia + ${icone('seta')}</a></article>`).join('')}</div>
</div></section>

<section class="a-aplic"><div class="in">
  <div class="a-aplic-cab"><div><p class="eyebrow">Produtos</p><h2>Uma linha completa de amidos de mandioca</h2></div><p>${produtosIntro[0]}</p></div>
  <div class="a-mosaico">${produtos.map((p, i) => `<a class="a-tile${i === 0 ? ' a-tile-g' : ''}" href="/a/produtos/${p.slug}/"><img src="${img(p.slug)}" alt="" loading="lazy" width="400" height="300"><span class="a-tile-txt"><small>${esc(p.tipo)}</small><strong>${p.nome}</strong></span></a>`).join('')}</div>
</div></section>

<section class="a-proc"><div class="in">
  <div class="a-proc-cab"><p class="eyebrow">Como trabalhamos</p><h2>Da lavoura ao seu caminhão</h2><p>A raiz colhida no oeste do Paraná vira amido em até 24 horas e sai da fábrica ensacada, paletizada e com entrega própria.</p></div>
  <ol class="a-etapas">${processo.map((e, i) => `<li class="a-etapa" data-rev style="--ap-d:${i * 90}ms"><span class="a-etapa-foto"><img src="${img(e.img)}" alt="" loading="lazy"></span><span class="a-etapa-n">${String(i + 1).padStart(2, '0')}</span><h3>${e.t}</h3><p>${e.p}</p></li>`).join('')}</ol>
</div></section>

<section class="a-emb"><div class="in">
  <figure class="a-emb-foto"><img src="${img('sacaria')}" alt="Sacaria de amido de mandioca Fino" loading="lazy" width="595" height="380"></figure>
  <div class="a-emb-txt"><p class="eyebrow">Embalagens</p><h2>Do saco de 25 kg ao big-bag</h2>
    <dl class="a-emb-lista">
      <div><dt>25 <small>kg</small></dt><dd><strong>Sacaria</strong>Embalagem de papel kraft ou embalagem plástica.</dd></div>
      <div><dt>700 a 1.350 <small>kg</small></dt><dd><strong>Big-bag</strong>Embalagem de grande volume, de 700 a 1.350 kg.</dd></div>
    </dl>
    <p class="a-emb-nota">Produto ensacado de forma automatizada e estocado em paletes dentro da indústria.</p>
  </div>
</div></section>
${A.cta()}`;

A.empresa = () => `${A.faixaTitulo('Nossa história', 'Empresa » História', 'aereo')}
<section class="a-int"><div class="in a-int-grade">
  ${A.lateral('empresa')}
  <div class="a-texto">
    <p class="a-lead">${historia[0]}</p>
    ${historia.slice(1, 2).map(p => `<p>${p}</p>`).join('')}
    <figure class="a-foto-larga"><img src="${img('aereo')}" alt="Vista aérea da Fino Alimentos em Concórdia do Oeste, Toledo" loading="lazy"><figcaption>A fecularia em Concórdia do Oeste, Toledo (PR).</figcaption></figure>
    <div class="a-cap"><div><strong>250 t</strong><span>de mandioca moída por dia</span></div><div><strong>70 t</strong><span>de produto acabado por dia</span></div></div>
    ${historia.slice(3).map(p => `<p>${p}</p>`).join('')}
  </div>
</div></section>
<section class="a-mvv" id="missao"><div class="in">
  <h2 class="a-tit-centro">Missão, Visão e Valores</h2>
  <div class="a-mvv-grade">${mvv.map((m, i) => `<article class="a-mvv-${i}"><h3>${m.t}</h3><p>${m.p}</p></article>`).join('')}</div>
</div></section>
${A.cta()}`;

A.qualidade = () => `${A.faixaTitulo('Qualidade', 'Empresa » Qualidade', 'fecula-tigela')}
<section class="a-int"><div class="in a-int-grade">
  ${A.lateral('qualidade')}
  <div class="a-texto">
    <h2>${qualidade.titulo}</h2>
    <div class="a-selos"><span><strong>BPF</strong>Boas Práticas de Fabricação</span><span><strong>HACCP</strong>Análise de Perigos e Pontos Críticos de Controle</span></div>
    ${qualidade.paragrafos.slice(1, 2).map(p => `<p class="a-lead">${p}</p>`).join('')}
    <h3>Características do amido Fino</h3>
    <ul class="a-checks">${qualidade.controles.map(([c, v]) => `<li>${icone('check')}${c} ${v}</li>`).join('')}</ul>
    <div class="a-24"><strong>24 h</strong><p>é o tempo máximo entre a colheita da raiz e a moagem. Raiz fresca resulta em amido com alto teor amiláceo e cor uniforme.</p></div>
    <p>${qualidade.paragrafos[2]}</p>
  </div>
</div></section>
${A.cta()}`;

A.ambiente = () => `${A.faixaTitulo('Meio Ambiente', 'Empresa » Meio Ambiente', 'planta-mandioca')}
<section class="a-int"><div class="in a-int-grade">
  ${A.lateral('meio-ambiente')}
  <div class="a-texto">
    <h2>${ambiente.titulo}</h2>
    <p class="a-lead">${ambiente.texto}</p>
    <div class="a-energia" aria-label="Energia da caldeira: 70% biogás, 30% madeira de reflorestamento">
      <p class="a-energia-tit">De onde vem a energia da caldeira</p>
      <div class="a-barra"><span class="a-barra-bio" style="--p:70%"><strong>70%</strong> gás do biodigestor</span><span class="a-barra-mad" style="--p:30%"><strong>30%</strong> madeira de reflorestamento</span></div>
      <p class="a-energia-nota">A madeira vem de reflorestamento autorizado, localizado nas proximidades da empresa.</p>
    </div>
    <figure class="a-foto-larga"><img src="${img('planta-mandioca')}" alt="Pé de mandioca em solo vermelho" loading="lazy"><figcaption>Mandioca em solo vermelho, como no oeste do Paraná (foto ilustrativa).</figcaption></figure>
  </div>
</div></section>
${A.cta()}`;

A.produtos = () => `${A.faixaTitulo('Produtos', 'Início » Produtos', 'lavoura')}
<section class="a-int"><div class="in">
  <div class="a-prod-intro"><p class="a-lead">${produtosIntro[0]}</p><p>${produtosIntro[1]}</p></div>
  <div class="a-prod-lista">${produtos.map((p, i) => `<a class="a-prod-item" href="/a/produtos/${p.slug}/" data-rev>
    <img src="${img(p.slug)}" alt="" loading="lazy" width="400" height="300">
    <span class="a-prod-n">${String(i + 1).padStart(2, '0')}</span>
    <span class="a-prod-txt"><small>${esc(p.tipo)}</small><strong>${p.nome}</strong><em>${p.usos.slice(0, 3).join(' · ')}</em></span>
    ${icone('seta', 'a-prod-seta')}</a>`).join('')}</div>
</div></section>
${A.cta()}`;

A.produto = (p, i) => {
  const outros = produtos.filter(o => o.slug !== p.slug);
  return `${A.faixaTitulo(p.nome, `<a href="/a/produtos/">Produtos</a> » ${p.nome}`, p.slug)}
<section class="a-int"><div class="in a-int-grade a-int-prod">
  <aside class="a-lateral"><h2>Produtos</h2><ul>${produtos.map(o => `<li><a href="/a/produtos/${o.slug}/"${o.slug === p.slug ? ' aria-current="page"' : ''}>${o.nome}</a></li>`).join('')}</ul>
  <a class="a-lat-ct" href="/a/contato/"><strong>Pedir amostra ou orçamento</strong><span>${E.telefone}</span></a></aside>
  <div class="a-texto">
    <div class="a-prod-topo">
      <figure><img src="${img(p.slug)}" alt="${esc(p.nome)}: aplicação dos amidos Fino" width="400" height="300"></figure>
      <div><p class="eyebrow">${esc(p.tipo)}</p><h2>${p.nome}</h2>${p.selo ? `<p class="a-selo-sg">${p.selo}</p>` : ''}</div>
    </div>
    ${p.texto.map((t, k) => `<p${k === 0 ? ' class="a-lead"' : ''}>${t}</p>`).join('')}
    <h3>Aplicações</h3>
    <ul class="a-usos">${p.usos.map(u => `<li>${u}</li>`).join('')}</ul>
    <div class="a-prod-emb"><span>Embalagens</span><p>Sacaria de 25 kg (papel kraft ou plástico) · Big-bag de 700 a 1.350 kg</p></div>
    <nav class="a-prod-nav" aria-label="Outros produtos"><a href="/a/produtos/${produtos[(i + produtos.length - 1) % produtos.length].slug}/">← ${produtos[(i + produtos.length - 1) % produtos.length].nome}</a><a href="/a/produtos/${produtos[(i + 1) % produtos.length].slug}/">${produtos[(i + 1) % produtos.length].nome} →</a></nav>
  </div>
</div></section>
${A.cta()}`;
};

A.contato = () => `${A.faixaTitulo('Contato', 'Início » Contato', 'aereo')}
<section class="a-int"><div class="in a-ct-grade">
  <div><h2>Estamos sempre prontos para lhe atender</h2><p class="a-lead">Escolha o departamento abaixo e envie-nos a sua mensagem, responderemos o mais rápido possível.</p>${formulario('a')}</div>
  <aside class="a-ct-info">
    <div class="a-ct-bloco"><h3>Fino Alimentos</h3><p>${icone('pin')}<span>${E.endereco}<br>${E.bairro}<br>${E.cidade}</span></p><p><a href="tel:${E.telefoneHref}">${icone('fone')}${E.telefone}</a></p><p><a href="mailto:${E.email}">${icone('mail')}${E.email}</a></p><a class="btn btn-linha" href="${E.mapa}" target="_blank" rel="noopener">Abrir no Google Maps</a></div>
    <iframe class="a-mapa" title="Mapa: Concórdia do Oeste, Toledo (PR)" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </aside>
</div></section>`;

// ---------------------------------------------------------------- Versão B: Sacaria
const B = {};

B.titulo = (titulo, trilha, texto = '') => `<section class="b-tit"><div class="in"><p class="b-trilha">${trilha}</p><h1>${titulo}</h1>${texto ? `<p class="b-tit-txt">${texto}</p>` : ''}</div></section>`;

B.rotulo = () => `<dl class="b-rotulo" aria-label="Ficha do produto">
  <div><dt>Produto</dt><dd>Amido de mandioca · Fécula</dd></div>
  <div><dt>Linha</dt><dd>Nativos e modificados fisicamente</dd></div>
  <div class="b-rot-peso"><dt>Peso líq.</dt><dd><span>25 kg</span><span>700 a 1.350 kg</span></dd></div>
  <div><dt>Origem</dt><dd>Toledo · Paraná · Brasil</dd></div>
</dl>`;

B.ct = () => `<section class="b-ct"><div class="in">
  <h2>Peça amostra, ficha técnica ou orçamento.</h2>
  <div class="b-ct-lin"><a href="tel:${E.telefoneHref}">${icone('fone')}${E.telefone}</a><a href="mailto:${E.email}">${icone('mail')}${E.email}</a><a class="btn b-btn-branco" href="/b/contato/">Escrever para o comercial ${icone('seta')}</a></div>
</div></section>`;

B.index = () => `
<section class="b-hero"><div class="in">
  <p class="b-hero-sobre">Fecularia · Concórdia do Oeste · Toledo, PR</p>
  <h1>Amido e fécula de mandioca do oeste do Paraná para a sua indústria.</h1>
  <div class="b-hero-grade">
    <div class="b-hero-txt"><p>${destaque.texto}</p><div class="acoes"><a class="btn btn-cheio" href="/b/produtos/">Ver as nove linhas ${icone('seta')}</a><a class="btn btn-linha" href="/b/contato/">Falar com o comercial</a></div></div>
    <figure class="b-hero-saco"><img src="${img('sacaria')}" alt="Sacos de amido de mandioca Fino Alimentos" width="595" height="380"></figure>
    ${B.rotulo()}
  </div>
</div></section>
<section class="b-faixa-num"><div class="in">${numeros.map(n => `<div><strong><span data-conta>${n.n}</span> ${n.u}</strong><span>${n.t}</span></div>`).join('')}</div></section>

<section class="b-caminho" data-troca><div class="in">
  <div class="b-cam-cab"><p class="b-eyebrow">Do campo ao saco</p><h2>Seis etapas, uma mesma fábrica.</h2></div>
  <div class="b-cam-grade">
    <div class="b-cam-midia" aria-hidden="true">${processo.map((e, i) => `<figure class="${i === 0 ? 'ativo' : ''}"><img src="${img(e.img)}" alt="" loading="lazy"></figure>`).join('')}</div>
    <ol class="b-cam-passos">${processo.map((e, i) => `<li class="b-passo${i === 0 ? ' ativo' : ''}"><figure class="b-passo-foto"><img src="${img(e.img)}" alt="" loading="lazy"></figure><span class="b-passo-n">${String(i + 1).padStart(2, '0')}</span><h3>${e.t}</h3><p>${e.p}</p></li>`).join('')}</ol>
  </div>
</div></section>

<section class="b-indice"><div class="in">
  <div class="b-ind-cab"><p class="b-eyebrow">Produtos</p><h2>Nove linhas, uma para cada aplicação.</h2><p>${produtosIntro[1]}</p></div>
  <ol class="b-ind-lista">${produtos.map((p, i) => `<li><a href="/b/produtos/${p.slug}/"><span class="b-ind-n">${String(i + 1).padStart(2, '0')}</span><img class="b-ind-foto" src="${img(p.slug)}" alt="" loading="lazy" width="400" height="300"><span class="b-ind-nome">${p.nome}</span><span class="b-ind-tipo">${esc(p.tipo)}</span><span class="b-ind-usos">${p.usos.slice(0, 3).join(', ')}</span>${icone('seta', 'b-ind-seta')}</a></li>`).join('')}</ol>
</div></section>

<section class="b-quem"><div class="in">
  <figure class="b-quem-foto"><img src="${img('aereo')}" alt="Vista aérea da fecularia Fino Alimentos" loading="lazy"><figcaption>Concórdia do Oeste, Toledo (PR)</figcaption></figure>
  <div class="b-quem-txt"><p class="b-eyebrow">Quem somos?</p>
    <ul>${quemSomos.map(q => `<li><a href="/b/${q.slug}/"><span class="b-quem-ic">${icone(q.icone)}</span><span><strong>${q.titulo}</strong><span>${q.texto}</span></span>${icone('seta', 'b-q-seta')}</a></li>`).join('')}</ul>
  </div>
</div></section>
${B.ct()}`;

B.empresa = () => `${B.titulo('Nossa história', '<a href="/b/">Início</a> / Empresa / História', historia[0])}
<section class="b-sec"><div class="in b-duas">
  <div class="b-texto">${historia.slice(1).map(p => `<p>${p}</p>`).join('')}</div>
  <aside class="b-ficha"><h2>Ficha da fábrica</h2><dl>
    <div><dt>Local</dt><dd>${E.bairro}, Toledo (PR)</dd></div>
    <div><dt>Moagem</dt><dd>250 t de mandioca por dia</dd></div>
    <div><dt>Produção</dt><dd>70 t de produto acabado por dia</dd></div>
    <div><dt>Embalagens</dt><dd>Sacaria 25 kg (kraft ou plástico) · Big-bag 700 a 1.350 kg</dd></div>
    <div><dt>Entrega</dt><dd>Logística própria até o cliente</dd></div>
  </dl></aside>
</div></section>
<figure class="b-panorama"><img src="${img('lavoura')}" alt="Lavoura de mandioca" loading="lazy"></figure>
<section class="b-sec b-mvv" id="missao"><div class="in">
  <p class="b-eyebrow">Missão, Visão e Valores</p>
  <div class="b-mvv-lista">${mvv.map(m => `<div><h2>${m.t}</h2><p>${m.p}</p></div>`).join('')}</div>
</div></section>
${B.ct()}`;

B.qualidade = () => `${B.titulo(qualidade.titulo, '<a href="/b/">Início</a> / Empresa / Qualidade', qualidade.paragrafos[0])}
<section class="b-sec"><div class="in b-duas">
  <div class="b-texto"><p>${qualidade.paragrafos[1]}</p><p>${qualidade.paragrafos[2]}</p>
    <figure class="b-foto"><img src="${img('fecula-tigela')}" alt="Fécula de mandioca" loading="lazy"><figcaption>Fécula de mandioca (foto ilustrativa).</figcaption></figure></div>
  <aside class="b-laudo"><h2>Características do amido</h2><ul>${qualidade.controles.map(([c, v]) => `<li>${icone('check')}<span>${c}</span><em>${v}</em></li>`).join('')}</ul>
    <div class="b-carimbos"><span>BPF</span><span>HACCP</span></div>
    <p class="b-laudo-24"><strong>≤ 24 h</strong> da colheita à moagem</p></aside>
</div></section>
${B.ct()}`;

B.ambiente = () => `${B.titulo(ambiente.titulo, '<a href="/b/">Início</a> / Empresa / Meio Ambiente', ambiente.texto)}
<section class="b-sec"><div class="in">
  <div class="b-energia">
    <div class="b-en-item b-en-bio" style="--p:70"><strong>70%</strong><span>gás gerado pelo biodigestor</span></div>
    <div class="b-en-item b-en-mad" style="--p:30"><strong>30%</strong><span>madeira de reflorestamento autorizado, nas proximidades da empresa</span></div>
  </div>
  <p class="b-en-leg">Energia da caldeira da fecularia</p>
</div></section>
<figure class="b-panorama"><img src="${img('planta-mandioca')}" alt="Pé de mandioca em solo vermelho" loading="lazy"><figcaption>Foto ilustrativa.</figcaption></figure>
${B.ct()}`;

B.produtos = () => `${B.titulo('Produtos', '<a href="/b/">Início</a> / Produtos', produtosIntro[0])}
<section class="b-sec"><div class="in">
  <p class="b-prod-fis">${produtosIntro[1]}</p>
  <div class="b-prod-grade">${produtos.map((p, i) => `<a class="b-prod${[0, 3, 7].includes(i) ? ' b-prod-l' : ''}" href="/b/produtos/${p.slug}/"><figure><img src="${img(p.slug)}" alt="" loading="lazy" width="400" height="300"></figure><span class="b-prod-n">${String(i + 1).padStart(2, '0')}</span><h2>${p.nome}</h2><p>${esc(p.tipo)}</p></a>`).join('')}</div>
</div></section>
${B.ct()}`;

B.produto = (p, i) => {
  const ant = produtos[(i + produtos.length - 1) % produtos.length], prox = produtos[(i + 1) % produtos.length];
  return `<section class="b-ft"><div class="in">
  <p class="b-trilha"><a href="/b/">Início</a> / <a href="/b/produtos/">Produtos</a> / ${p.nome}</p>
  <div class="b-ft-grade">
    <figure class="b-ft-foto"><img src="${img(p.slug)}" alt="${esc(p.nome)}: aplicação dos amidos Fino" width="400" height="300"><span class="b-ft-num">${String(i + 1).padStart(2, '0')}/09</span></figure>
    <div class="b-ft-txt"><p class="b-eyebrow">Linha ${p.nome}</p><h1>${p.nome}</h1>${p.selo ? `<p class="b-selo">${p.selo}</p>` : ''}${p.texto.map(t => `<p>${t}</p>`).join('')}</div>
  </div>
  <div class="b-ficha b-ficha-prod"><h2>Ficha técnica resumida</h2><dl>
    <div><dt>Linha</dt><dd>${p.nome}</dd></div>
    <div><dt>Produto</dt><dd>${esc(p.tipo)}</dd></div>
    <div><dt>Aplicações</dt><dd>${p.usos.join(' · ')}</dd></div>
    <div><dt>Matéria-prima</dt><dd>Mandioca do oeste do Paraná, moída em até 24 h</dd></div>
    <div><dt>Embalagens</dt><dd>Sacaria 25 kg (kraft ou plástico) · Big-bag 700 a 1.350 kg</dd></div>
  </dl></div>
  <nav class="b-ft-nav" aria-label="Outros produtos"><a href="/b/produtos/${ant.slug}/"><small>Anterior</small>${ant.nome}</a><a href="/b/produtos/"><small>Todos</small>9 linhas</a><a href="/b/produtos/${prox.slug}/"><small>Próximo</small>${prox.nome}</a></nav>
</div></section>
${B.ct()}`;
};

B.contato = () => `${B.titulo('Contato', '<a href="/b/">Início</a> / Contato', 'Estamos sempre prontos para lhe atender. Escolha o departamento e envie a sua mensagem: responderemos o mais rápido possível.')}
<section class="b-sec"><div class="in b-duas b-ct-pg">
  ${formulario('b')}
  <aside class="b-ficha"><h2>Fino Alimentos</h2><dl>
    <div><dt>Endereço</dt><dd>${E.endereco}<br>${E.bairro}<br>${E.cidade}</dd></div>
    <div><dt>Telefone</dt><dd><a href="tel:${E.telefoneHref}">${E.telefone}</a></dd></div>
    <div><dt>E-mail</dt><dd><a href="mailto:${E.email}">${E.email}</a></dd></div>
    <div><dt>Facebook</dt><dd><a href="${E.facebook}" target="_blank" rel="noopener">/finoalimentos</a></dd></div>
  </dl><iframe class="b-mapa" title="Mapa: Concórdia do Oeste, Toledo (PR)" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><a class="btn btn-linha" href="${E.mapa}" target="_blank" rel="noopener">Como chegar</a></aside>
</div></section>`;

// ----------------------------------------------------------------
const descs = {
  index: 'Fino Alimentos, fecularia em Toledo (PR): amidos nativos e modificados de mandioca, fécula e polvilho para a indústria alimentícia.',
  empresa: 'História da Fino Alimentos: 250 toneladas de mandioca moídas por dia no oeste do Paraná, sacaria de 25 kg e big-bag, logística própria.',
  qualidade: 'Qualidade Fino Alimentos: BPF, HACCP e moagem em até 24 h após a colheita.',
  'meio-ambiente': 'Meio ambiente na Fino Alimentos: caldeira com 70% de biogás e 30% de madeira de reflorestamento autorizado.',
  produtos: 'Amidos de mandioca Fino Alimentos para panificação, molhos, frigorífico, fécula e polvilhos, pratos prontos, empanados, salgadinhos, tapioca e batata noisette.',
  contato: 'Fale com a Fino Alimentos: comercial, compras e qualidade. +55 45 4102-9700, contato@finoalimentos.com.br.',
};

export function gerarVersao(v) {
  const T = v === 'a' ? A : B;
  const t = s => `${s} · Fino Alimentos`;
  const out = {
    index: pagina(v, 'index', 'Fino Alimentos · Amido e fécula de mandioca · Toledo, PR', descs.index, T.index()),
    empresa: pagina(v, 'empresa', t('História'), descs.empresa, T.empresa()),
    qualidade: pagina(v, 'qualidade', t('Qualidade'), descs.qualidade, T.qualidade()),
    'meio-ambiente': pagina(v, 'meio-ambiente', t('Meio Ambiente'), descs['meio-ambiente'], T.ambiente()),
    produtos: pagina(v, 'produtos', t('Produtos'), descs.produtos, T.produtos()),
    contato: pagina(v, 'contato', t('Contato'), descs.contato, T.contato()),
  };
  produtos.forEach((p, i) => {
    out[`produtos/${p.slug}`] = pagina(v, `produtos/${p.slug}`, t(p.nome), `${p.nome}: ${p.texto[0]}`.slice(0, 158), T.produto(p, i));
  });
  return out;
}
