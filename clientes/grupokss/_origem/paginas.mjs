// Monta as páginas das versões A ("Centro Cirúrgico", clara, segue a ordem da home atual) e B ("Linha Completa", azul, navegação por linhas).
// As páginas internas usam o mesmo conteúdo; o topo, a home e o acabamento mudam por versão. Estilos em public/assets/{base,a,b}.css.
import { empresa as E, textos as T, depoimentos, linhas, solucoes, produtos, eventos, videos, galerias, skyled, visionT4 } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const fotoP = (p, i = 0, extra = '') => foto(`p/${p.fotos[i].f.replace('.webp', '')}`, p.nome, extra);

export const nomesVersao = { a: 'Centro Cirúrgico', b: 'Linha Completa' };

const I = {
  casa: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  baixo: '<path d="M6 9l6 6 6-6"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  play: '<path d="M8 5l11 7-11 7z" fill="currentColor"/>',
  lupa: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fechar: '<path d="M6 6l12 12M18 6L6 18"/>',
  fabrica: '<path d="M3 21V10l6 4V10l6 4V5h6v16z"/><path d="M7 17h2M12 17h2M17 17h2"/>',
  regua: '<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
  caminhao: '<path d="M2 6h12v10H2zM14 10h4l3 3v3h-7"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  mapa: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  aperto: '<path d="M8 13l3 3 6-6"/><circle cx="12" cy="12" r="9"/>',
  alvo: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  olho: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  estrela: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  whats: '<path d="M4 20l1.2-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z" fill="currentColor" stroke="none"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const redeIc = {
  Facebook: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" fill="currentColor" stroke="none"/>',
  Instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
  LinkedIn: '<path d="M4 9h4v11H4zM6 3.5a2 2 0 110 4 2 2 0 010-4zM10 9h3.8v1.6c.6-1 2-1.9 3.8-1.9 3.4 0 4 2.2 4 5V20h-4v-5.3c0-1.3 0-3-1.8-3s-2 1.4-2 2.9V20h-4z" fill="currentColor" stroke="none"/>',
  YouTube: '<path d="M22 8.2a3 3 0 00-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 002 8.2 31 31 0 001.6 12 31 31 0 002 15.8a3 3 0 002.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 002.1-2.1 31 31 0 00.4-3.8 31 31 0 00-.4-3.8zM10 15V9l5.2 3z" fill="currentColor" stroke="none"/>',
};
const redes = () => E.redes.map(r => `<a href="${r.url}" target="_blank" rel="noopener" aria-label="${r.nome}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${redeIc[r.nome]}</svg></a>`).join('');

// Cruz de pontos do símbolo do logo (azul no centro, vermelho nas pontas), para fundos.
export function cruz(cls = 'cruz') {
  const pts = [];
  for (let x = -4; x <= 4; x++) for (let y = -4; y <= 4; y++) {
    const braco = (Math.abs(x) <= 1 || Math.abs(y) <= 1);
    if (!braco) continue;
    const d = Math.max(Math.abs(x), Math.abs(y));
    const azul = (x === 0 || y === 0) && d <= 3;
    const r = azul ? (d === 0 ? 4.2 : 3.4 - d * 0.35) : 2.6 - d * 0.18;
    pts.push(`<circle cx="${50 + x * 10}" cy="${50 + y * 10}" r="${r.toFixed(2)}" class="${azul ? 'ca' : 'cv'}"/>`);
  }
  return `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true">${pts.join('')}</svg>`;
}

// ---------- navegação ----------
const menu = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'quem-somos', nome: 'Quem Somos', caminho: 'quem-somos/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/', mega: true },
  { slug: 'midias', nome: 'Mídias', caminho: 'midias/' },
  { slug: 'eventos', nome: 'Eventos', caminho: 'eventos/' },
  { slug: 'fale-conosco', nome: 'Fale Conosco', caminho: 'fale-conosco/' },
];

function mega(v) {
  return `<div class="mega"><div class="mega-in">
${linhas.map(l => `<div class="mega-col"><a class="mega-tit" href="/${v}/produtos/?linha=${l.slug}">${esc(l.nome)}</a>
${l.subs.length > 1 ? `<ul>${l.subs.map(s => `<li><a href="/${v}/produtos/?cat=${s.slug}">${esc(s.nome)}</a></li>`).join('')}</ul>` : ''}</div>`).join('\n')}
<a class="mega-todos" href="/${v}/produtos/">Ver todos os ${produtos.length} produtos ${ic('seta')}</a>
</div></div>`;
}

function head(v, p, titulo, descricao, ogImg = 'og-' + v) {
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
<meta property="og:image" content="${E.url}assets/${ogImg}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Saira:wdth,wght@112.5,500;112.5,600;112.5,700;125,700;125,800&family=Lato:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

function topo(v, atual) {
  const nav = menu.map(m => {
    const at = m.slug === atual ? ' aria-current="page"' : '';
    if (m.mega) return `<div class="nav-item tem-mega"><a href="/${v}/${m.caminho}"${at}>${m.nome} ${ic('baixo', 'ic seta-mega')}</a>${mega(v)}</div>`;
    return `<a class="nav-item" href="/${v}/${m.caminho}"${at}>${m.slug === 'index' && v === 'a' ? `${ic('casa')}<span class="so-leitor">Início</span>` : m.nome}</a>`;
  }).join('\n');
  const orc = `<a class="btn-orc" href="/${v}/orcamento/">${ic('lista')}<span>Orçamento</span><b data-orc-n hidden>0</b></a>`;
  const barra = v === 'a' ? `<div class="barra"><div class="w barra-in">
<span>${ic('pin')} ${E.nome}, ${E.cidade}</span>
<span class="barra-dir"><span class="redes">${redes()}</span><a href="tel:${E.telHref}">${ic('tel')} <b>${E.tel}</b></a></span>
</div></div>` : '';
  return `${barra}<header class="topo"><div class="w topo-in">
<a class="marca" href="/${v}/"><img src="/assets/logo.png" alt="${E.nome}, ${E.slogan}" width="300" height="48"></a>
<nav class="nav" aria-label="Principal">${nav}</nav>
<div class="topo-acoes">${v === 'b' ? `<a class="topo-tel" href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a>` : ''}${orc}
<button class="btn-menu" aria-label="Abrir menu" aria-expanded="false">${ic('menu')}</button></div>
</div></header>`;
}

function rodape(v, semFaixa) {
  return `${semFaixa ? '' : `<section class="faixa-cta"><div class="w faixa-in">
<div><p class="eyebrow">Fale com o comercial</p><h2>Monte o seu orçamento com quem fabrica</h2><p>Escolha os equipamentos no catálogo e envie a lista. A equipe comercial do Grupo KSS responde com as condições.</p></div>
<div class="faixa-acoes"><a class="btn btn-verm" href="/${v}/orcamento/">Solicitar orçamento ${ic('seta')}</a><a class="btn btn-linha" href="https://wa.me/${E.whats}" target="_blank" rel="noopener">${ic('whats')} WhatsApp</a></div>
</div></section>`}
<footer class="rodape"><div class="w rodape-in">
<div class="rod-marca"><img src="/assets/logo-branco.png" alt="${E.nome}" width="300" height="48"><p>Desde 1987 nosso maior foco é você!</p><div class="redes">${redes()}</div></div>
<div><h3>Links rápidos</h3><ul>${menu.map(m => `<li><a href="/${v}/${m.caminho}">${m.slug === 'index' ? 'Página inicial' : m.nome}</a></li>`).join('')}<li><a href="/${v}/trabalhe-conosco/">Trabalhe Conosco</a></li></ul></div>
<div><h3>Produtos</h3><ul>${linhas.map(l => `<li><a href="/${v}/produtos/?linha=${l.slug}">${esc(l.curto || l.nome)}</a></li>`).join('')}</ul></div>
<div><h3>Contato</h3><ul class="rod-contato">
<li>${ic('tel')}<span><a href="tel:${E.telHref}">${E.tel}</a><br><a href="tel:${E.tel2Href}">${E.tel2}</a></span></li>
<li>${ic('mail')}<span><a href="mailto:${E.emailComercial}">${E.emailComercial}</a></span></li>
<li>${ic('pin')}<span>${E.endereco}</span></li>
<li>${ic('relogio')}<span>${E.horario}</span></li></ul></div>
</div><div class="w rod-base"><span>© ${E.razao}</span><span>Equipamentos médico-hospitalares 100% nacionais</span></div></footer>
<a class="whats-flut" href="https://wa.me/${E.whats}" target="_blank" rel="noopener" aria-label="WhatsApp">${ic('whats')}</a>
<dialog class="caixa" aria-label="Foto ampliada"><button class="caixa-fechar" aria-label="Fechar">${ic('fechar')}</button><img alt=""></dialog>`;
}

function pagina(v, p, atual, titulo, descricao, corpo, ogImg) {
  return `${head(v, p, titulo, descricao, ogImg)}
<body class="v-${v}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, atual)}
<main id="conteudo">
${corpo}
</main>
${rodape(v, p === 'orcamento/')}
</body>
</html>
`;
}

// Cabeçalho das páginas internas.
function cabeca(v, titulo, sub, trilha = [], img = 'feira-2019-6') {
  const migalhas = `<ol class="migalhas"><li><a href="/${v}/">Início</a></li>${trilha.map(([n, h]) => h ? `<li><a href="${h}">${esc(n)}</a></li>` : `<li aria-current="page">${esc(n)}</li>`).join('')}</ol>`;
  if (v === 'a') return `<section class="cab"><div class="w">${migalhas}<h1>${esc(titulo)}</h1>${sub ? `<p>${esc(sub)}</p>` : ''}</div>${cruz('cruz cab-cruz')}</section>`;
  return `<section class="cab"><div class="cab-foto">${foto('site/' + img, '')}</div><div class="w">${migalhas}<h1>${esc(titulo)}</h1>${sub ? `<p>${esc(sub)}</p>` : ''}</div></section>`;
}

// ---------- blocos ----------
const cartaoProduto = (v, p) => `<a class="prod" href="/${v}/produto/${p.slug}/" data-linha="${p.linha}" data-cat="${p.cat}" data-sol="${linhas.find(l => l.slug === p.linha).solucao}" data-busca="${esc((p.nome + ' ' + p.catNome + ' ' + p.linhaNome).toLowerCase())}">
<span class="prod-img${p.fotos[0].alpha ? ' recorte' : ''}">${fotoP(p)}</span>
<span class="prod-txt"><small>${esc(p.catNome)}</small><strong>${esc(p.nome)}</strong></span></a>`;

const depoBloco = () => `<div class="depos">${depoimentos.map(d => `<figure class="depo">
<blockquote>${esc(d.texto)}</blockquote>
<figcaption>${foto('site/' + d.foto, `Centro cirúrgico, ${d.local}`)}<span><strong>${esc(d.nome)}</strong>${esc(d.local)}</span></figcaption></figure>`).join('')}</div>`;

const eventoItem = (v, e) => `<a class="evento" href="/${v}/evento/${e.slug}/">
<span class="evento-img">${foto('site/' + e.foto, e.titulo)}</span>
<span class="evento-txt"><span class="evento-meta"><time>${e.data}</time> · ${esc(e.cidade)}</span><strong>${esc(e.titulo)}</strong><span class="evento-res">${esc(e.resumo)}</span></span></a>`;

// ---------- home A: segue a ordem da home atual (banner, chamada, três pilares, depoimentos) ----------
function homeA(v) {
  const mesa = produtos.find(p => p.slug === 'mesa-cirurgica-eletro-hidraulica-vision-t4-eh');
  const foco = produtos.find(p => p.slug === 'foco-cirurgico-skyled-de-teto-um-braco-160-160000-lux');
  return `<section class="hero-a"><div class="w hero-a-in">
<div class="hero-a-txt">
<p class="eyebrow">Desde 1987 · ${E.cidade}</p>
<h1>${T.heroTitulo}</h1>
<p class="lead">Focos SKYLED, mesas cirúrgicas Vision T, camas, macas e hotelaria hospitalar. Equipamentos 100% nacionais, projetados e fabricados pelo Grupo KSS.</p>
<div class="acoes"><a class="btn btn-azul" href="/${v}/produtos/">Conheça os produtos ${ic('seta')}</a><a class="btn btn-verm" href="/${v}/orcamento/">Solicitar orçamento</a></div>
</div>
<div class="hero-a-img">${cruz('cruz hero-cruz')}<img src="/assets/img/p/${mesa.slug}-8.webp" alt="${esc(mesa.nome)}" width="1200" height="1077">
<a class="hero-tag" href="/${v}/produto/${mesa.slug}/"><small>Destaque da Feira Hospitalar 2025</small><strong>Mesa Cirúrgica Vision T4 EH</strong><span>Suporta pacientes de até 465 kg ${ic('seta')}</span></a></div>
</div>
<ul class="w selos">
<li>${ic('fabrica')}<span><b>Fabricação própria</b> em São José dos Pinhais</span></li>
<li>${ic('check')}<span><b>100% nacionais</b>, do projeto à venda</span></li>
<li>${ic('doc')}<span><b>Normas NBR IEC 60601</b> nos focos SKYLED</span></li>
<li>${ic('mapa')}<span><b>Instalados</b> nos quatro cantos do Brasil</span></li>
</ul></section>

<section class="sec linhas-a"><div class="w">
<div class="sec-cab"><p class="eyebrow">Produtos</p><h2>Linha completa para o centro cirúrgico e a hotelaria hospitalar</h2><a class="link" href="/${v}/produtos/">Ver catálogo completo ${ic('seta')}</a></div>
<div class="linhas-grade">${linhas.map((l, i) => `<a class="linha l${i}" href="/${v}/produtos/?linha=${l.slug}">
<span class="linha-img">${foto('p/' + l.img, l.nome)}</span>
<span class="linha-txt"><strong>${esc(l.nome)}</strong><span>${esc(l.texto)}</span><small>${produtos.filter(p => p.linha === l.slug).length} produtos ${ic('seta')}</small></span></a>`).join('')}</div>
</div></section>

<section class="sec intro-a"><div class="w intro-a-in">
<div class="intro-a-foto">${foto('site/feira-2019-11', 'Estande do Grupo KSS na Feira Hospitalar')}<span class="intro-ano"><b>${new Date().getFullYear() - E.desde}</b> anos de mercado</span></div>
<div><p class="eyebrow">Quem somos</p><h2>${T.intro.titulo}</h2><p class="lead">${T.intro.texto}</p>
<ol class="pilares">${T.pilares.map((p, i) => `<li><span class="num">0${i + 1}</span><div><h3>${p.titulo}</h3><p>${p.texto}</p></div></li>`).join('')}</ol>
<a class="link" href="/${v}/quem-somos/">Conheça o Grupo KSS ${ic('seta')}</a></div>
</div></section>

<section class="sec skyled-a"><div class="w skyled-a-in">
<div class="skyled-a-img"><img src="/assets/img/p/${foco.slug.replace('160-160000', '120-120000')}-2.webp" alt="Cúpula do Foco Cirúrgico SKYLED" loading="lazy"></div>
<div><p class="eyebrow">Foco Cirúrgico SKYLED</p><h2>Luz fria, sem sombra e sem ruído no campo operatório</h2>
<p>LEDs brancos de última geração com lentes de alto rendimento, sem emissão de infravermelho e ultravioleta, o que impede a dessecação dos tecidos. Controle eletrônico da temperatura dos módulos e luz especial para videocirurgia.</p>
<dl class="numeros">${skyled.map(s => `<div><dt>${s.n}<small>${s.u}</small></dt><dd>${s.t}</dd></div>`).join('')}</dl>
<div class="acoes"><a class="btn btn-azul" href="/${v}/produtos/?linha=foco-cirurgico">Ver os focos SKYLED ${ic('seta')}</a><a class="link" href="/${v}/midias/">Assistir aos vídeos ${ic('play')}</a></div></div>
</div></section>

<section class="sec"><div class="w">
<div class="sec-cab"><p class="eyebrow">Depoimentos de clientes</p><h2>Quem opera com KSS recomenda</h2><p>${T.depoimentosIntro}</p></div>
${depoBloco()}
</div></section>

<section class="sec sec-cinza"><div class="w">
<div class="sec-cab"><p class="eyebrow">Eventos</p><h2>Onde o Grupo KSS esteve em 2025</h2><a class="link" href="/${v}/eventos/">Todos os eventos ${ic('seta')}</a></div>
<div class="eventos-grade">${eventos.slice(0, 3).map(e => eventoItem(v, e)).join('')}</div>
</div></section>`;
}

// ---------- home B: entrada pela feira, seletor de linhas, processo e destaque da Vision T4 ----------
function homeB(v) {
  const mesa = produtos.find(p => p.slug === 'mesa-cirurgica-eletro-hidraulica-vision-t4-eh');
  const etapas = [
    { ic: 'regua', t: 'Projetados', d: 'Engenharia própria desenha cada equipamento de acordo com as exigências médicas e as normas de dispositivos médico-hospitalares.' },
    { ic: 'fabrica', t: 'Fabricados', d: 'Linha de produção altamente qualificada, dentro da fábrica do Grupo KSS em São José dos Pinhais.' },
    { ic: 'aperto', t: 'Comercializados', d: 'Venda direta da fábrica, com o melhor custo-benefício e atendimento da equipe comercial.' },
    { ic: 'mapa', t: 'Instalados', d: 'Equipamentos em pleno uso em instituições de saúde nos quatro cantos do Brasil.' },
    { ic: 'estrela', t: 'Pós-venda', d: 'Acompanhamento depois da compra, como contam os clientes que operam com KSS há mais de uma década.' },
  ];
  return `<section class="hero-b">
<div class="hero-b-foto">${foto('site/feira-2019-6', 'Estande do Grupo KSS na Feira Hospitalar', ' loading="eager" fetchpriority="high"')}</div>
<div class="w hero-b-in">
<p class="eyebrow">Grupo KSS · Foco em soluções médicas</p>
<h1>Desde 1987, nosso maior foco é você.</h1>
<p class="lead">Fabricamos focos cirúrgicos, mesas cirúrgicas e equipamentos para hotelaria hospitalar. Tudo projetado, fabricado e comercializado na nossa fábrica, no Paraná.</p>
<div class="acoes"><a class="btn btn-verm" href="/${v}/produtos/">Ver os ${produtos.length} produtos ${ic('seta')}</a><a class="btn btn-linha" href="/${v}/quem-somos/">Quem somos</a></div>
</div>
<dl class="w hero-b-num">
<div><dt>${new Date().getFullYear() - E.desde}</dt><dd>anos no mercado médico-hospitalar</dd></div>
<div><dt>${produtos.length}</dt><dd>produtos em ${linhas.length} linhas</dd></div>
<div><dt>100%</dt><dd>nacionais, feitos na fábrica KSS</dd></div>
<div><dt>160 mil</dt><dd>lux no Foco SKYLED de Teto 160</dd></div>
</dl></section>

<section class="sec seletor"><div class="w">
<div class="sec-cab"><p class="eyebrow">Nossas linhas</p><h2>Escolha a área do hospital e veja o que fabricamos para ela</h2></div>
<div class="sel" data-abas>
<div class="sel-lista" role="tablist">${linhas.map((l, i) => `<button role="tab" data-aba="${l.slug}" aria-selected="${i === 0}"><span class="sel-n">${String(i + 1).padStart(2, '0')}</span>${esc(l.curto || l.nome)}<small>${produtos.filter(p => p.linha === l.slug).length}</small></button>`).join('')}</div>
<div class="sel-paineis">${linhas.map((l, i) => {
    const ps = produtos.filter(p => p.linha === l.slug);
    return `<div class="sel-painel" role="tabpanel" data-painel="${l.slug}"${i ? ' hidden' : ''}>
<div class="sel-img">${foto('p/' + l.img, l.nome)}</div>
<div class="sel-txt"><h3>${esc(l.nome)}</h3><p>${esc(l.texto)}</p>
<ul>${ps.slice(0, 6).map(p => `<li><a href="/${v}/produto/${p.slug}/">${esc(p.nome)}</a></li>`).join('')}</ul>
<a class="btn btn-azul" href="/${v}/produtos/?linha=${l.slug}">${ps.length > 6 ? `Ver os ${ps.length} itens` : 'Ver a linha'} ${ic('seta')}</a></div></div>`;
  }).join('')}</div></div>
</div></section>

<section class="sec vision"><div class="w vision-in">
<div class="vision-txt"><p class="eyebrow">Lançamento · Feira Hospitalar 2025</p><h2>Mesa Cirúrgica Eletro-Hidráulica Vision T4 EH</h2>
<p>Elevado desempenho aliado ao design compacto, com movimentos precisos. Foi a protagonista do estande KSS na Feira Hospitalar 2025.</p>
<ul class="vision-lista">${visionT4.map(t => `<li>${ic('check')}${esc(t)}</li>`).join('')}</ul>
<div class="acoes"><a class="btn btn-verm" href="/${v}/produto/${mesa.slug}/">Ver ficha completa ${ic('seta')}</a><button class="btn btn-linha" data-orc-add="${mesa.slug}">${ic('mais')} Adicionar ao orçamento</button></div></div>
<div class="vision-img"><img src="/assets/img/p/${mesa.slug}-8.webp" alt="${esc(mesa.nome)}" loading="lazy"><img class="vision-tela" src="/assets/img/p/${mesa.slug}-10.webp" alt="Painel LCD touch screen da Vision T4 EH" loading="lazy"></div>
</div></section>

<section class="sec processo"><div class="w">
<div class="sec-cab"><p class="eyebrow">Da prancheta ao centro cirúrgico</p><h2>Um só fabricante do projeto ao pós-venda</h2></div>
<ol class="etapas">${etapas.map((e, i) => `<li><span class="etapa-ic">${ic(e.ic)}</span><span class="etapa-n">0${i + 1}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>
</div></section>

<section class="sec solucoes-b"><div class="w sol-grade">${solucoes.map(s => `<a class="sol" href="/${v}/produtos/?solucao=${s.slug}">${foto(s.img, s.nome)}<span><small>Soluções</small><strong>${s.nome}</strong><em>${s.texto}</em>${ic('seta')}</span></a>`).join('')}</div></section>

<section class="sec depo-b"><div class="w depo-b-in" data-carrossel>
<p class="eyebrow">Depoimentos de clientes</p>
${depoimentos.map((d, i) => `<figure class="depo-g"${i ? ' hidden' : ''}><blockquote>“${esc(d.texto)}”</blockquote><figcaption>${foto('site/' + d.foto, `Centro cirúrgico, ${d.local}`)}<span><strong>${esc(d.nome)}</strong>${esc(d.local)}</span></figcaption></figure>`).join('')}
<div class="car-nav"><button data-car="-1" aria-label="Anterior">${ic('seta')}</button><span data-car-pos>1 / ${depoimentos.length}</span><button data-car="1" aria-label="Próximo">${ic('seta')}</button></div>
</div></section>

<section class="sec agenda"><div class="w">
<div class="sec-cab"><p class="eyebrow">Eventos 2025</p><h2>De Recife a Pinhais, o Grupo KSS vai até você</h2><a class="link" href="/${v}/eventos/">Todos os eventos ${ic('seta')}</a></div>
<ol class="linha-tempo">${[...eventos].reverse().map(e => `<li><a href="/${v}/evento/${e.slug}/"><time>${e.data.slice(3)}</time><strong>${esc(e.evento)}</strong><span>${ic('pin')} ${esc(e.cidade)}</span></a></li>`).join('')}</ol>
</div></section>`;
}

// ---------- páginas internas ----------
function quemSomos(v) {
  return `${cabeca(v, 'Quem Somos', 'Desde 1987 nosso maior foco é você.', [['Quem Somos']], 'feira-2019-1')}
<section class="sec"><div class="w qs-in">
<div class="qs-txt"><p class="eyebrow">Grupo KSS</p><h2>Equipamentos médicos 100% nacionais, projetados e fabricados em São José dos Pinhais</h2>${T.quemSomos.map(p => `<p>${p}</p>`).join('')}</div>
<div class="qs-fotos">${foto('site/feira-2019-2', 'Estande KSS com focos SKYLED')}${foto('site/feira-2018-2', 'Mesa cirúrgica e foco no estande KSS')}${foto('site/evento-induspar-2025', 'Equipe KSS na INDUSPAR 2025')}</div>
</div></section>
<section class="sec sec-cinza"><div class="w mvv">
<div class="mvv-item">${ic('alvo')}<h3>Missão</h3><p>${T.missao}</p></div>
<div class="mvv-item">${ic('olho')}<h3>Visão</h3><p>${T.visao}</p></div>
<div class="mvv-item">${ic('estrela')}<h3>Valores</h3><ul>${T.valores.map(x => `<li>${x}</li>`).join('')}</ul></div>
</div></section>
<section class="sec"><div class="w"><div class="sec-cab"><p class="eyebrow">Depoimentos de clientes</p><h2>Quem opera com KSS recomenda</h2><p>${T.depoimentosIntro}</p></div>${depoBloco()}</div></section>`;
}

function catalogo(v) {
  return `${cabeca(v, 'Produtos', 'Navegue por todos os nossos produtos, por linha ou por solução.', [['Produtos']], 'feira-2019-8')}
<section class="sec cat"><div class="w cat-in" data-catalogo>
<aside class="cat-filtros">
<label class="busca">${ic('lupa')}<input type="search" placeholder="Buscar produto" aria-label="Buscar produto" data-busca-campo></label>
<h3>Soluções</h3><div class="chips">${solucoes.map(s => `<button data-f="sol" data-v="${s.slug}">${s.nome}</button>`).join('')}</div>
<h3>Categorias</h3>
<ul class="cat-arvore"><li><button data-f="" data-v="" aria-pressed="true">Todos os produtos <small>${produtos.length}</small></button></li>
${linhas.map(l => `<li><button data-f="linha" data-v="${l.slug}">${esc(l.nome)} <small>${produtos.filter(p => p.linha === l.slug).length}</small></button>${l.subs.length > 1 ? `<ul>${l.subs.map(s => `<li><button data-f="cat" data-v="${s.slug}">${esc(s.nome)} <small>${produtos.filter(p => p.cat === s.slug).length}</small></button></li>`).join('')}</ul>` : ''}</li>`).join('')}
</ul></aside>
<div><p class="cat-info" data-cat-info aria-live="polite">${produtos.length} produtos</p>
<div class="prods">${produtos.map(p => cartaoProduto(v, p)).join('\n')}</div>
<p class="cat-vazio" data-cat-vazio hidden>Nenhum produto encontrado. <a href="/${v}/fale-conosco/">Fale com o comercial</a>.</p></div>
</div></section>`;
}

function produto(v, p) {
  const linha = linhas.find(l => l.slug === p.linha);
  const rel = produtos.filter(x => x.cat === p.cat && x.slug !== p.slug).concat(produtos.filter(x => x.linha === p.linha && x.cat !== p.cat)).slice(0, 4);
  const fotos = p.fotos.map((f, i) => ({ ...f, src: `/assets/img/p/${f.f}` }));
  return `<section class="prod-pag"><div class="w">
<ol class="migalhas"><li><a href="/${v}/">Início</a></li><li><a href="/${v}/produtos/">Produtos</a></li><li><a href="/${v}/produtos/?linha=${linha.slug}">${esc(linha.nome)}</a></li><li aria-current="page">${esc(p.nome)}</li></ol>
<div class="pp-in">
<div class="galeria" data-galeria>
<button class="gal-principal${fotos[0].alpha ? ' recorte' : ''}" data-ampliar="${fotos[0].src}" aria-label="Ampliar foto"><img src="${fotos[0].src}" alt="${esc(p.nome)}" width="${fotos[0].w}" height="${fotos[0].h}"></button>
${fotos.length > 1 ? `<div class="gal-mini">${fotos.map((f, i) => `<button data-foto="${f.src}" data-alpha="${f.alpha}" aria-label="Foto ${i + 1}"${i ? '' : ' aria-current="true"'}><img src="${f.src}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
</div>
<div class="pp-txt">
<a class="pp-cat" href="/${v}/produtos/?cat=${p.cat}">${esc(p.catNome)}</a>
<h1>${esc(p.nome)}</h1>
<dl class="pp-meta"><div><dt>Linha</dt><dd>${esc(linha.nome)}</dd></div><div><dt>Solução</dt><dd>${linha.solucao === 'cirurgia' ? 'Cirurgia Geral' : 'Hotelaria Hospitalar'}</dd></div>${p.codigo ? `<div><dt>Código</dt><dd>${esc(p.codigo)}</dd></div>` : ''}</dl>
<div class="pp-acoes"><button class="btn btn-verm" data-orc-add="${p.slug}">${ic('mais')} Adicionar ao orçamento</button><a class="btn btn-linha-azul" href="https://wa.me/${E.whats}?text=${encodeURIComponent(`Olá! Gostaria de informações sobre: ${p.nome}`)}" target="_blank" rel="noopener">${ic('whats')} Perguntar no WhatsApp</a></div>
<div class="abas" data-abas>
<div class="abas-bt" role="tablist">${Object.keys(p.abas).map((k, i) => `<button role="tab" data-aba="t${i}" aria-selected="${i === 0}">${esc(k)}</button>`).join('')}</div>
${Object.values(p.abas).map((h, i) => `<div class="aba-txt" role="tabpanel" data-painel="t${i}"${i ? ' hidden' : ''}>${h}</div>`).join('')}
</div>
</div></div></div></section>
${rel.length ? `<section class="sec sec-cinza"><div class="w"><div class="sec-cab"><p class="eyebrow">Produtos relacionados</p><h2>Mais em ${esc(linha.nome)}</h2></div><div class="prods prods-4">${rel.map(x => cartaoProduto(v, x)).join('')}</div></div></section>` : ''}`;
}

function midias(v) {
  return `${cabeca(v, 'Mídias', 'Vídeos dos equipamentos e fotos da nossa participação em feiras.', [['Mídias']], 'feira-2018-1')}
<section class="sec"><div class="w"><div class="sec-cab"><p class="eyebrow">Vídeos</p><h2>Veja os equipamentos em funcionamento</h2></div>
<div class="videos">${videos.map(x => `<figure class="video"><button class="yt" data-yt="${x.id}" aria-label="Assistir: ${esc(x.titulo)}"><img src="https://i.ytimg.com/vi/${x.id}/hqdefault.jpg" alt="" loading="lazy"><span class="yt-play">${ic('play')}</span></button><figcaption>${esc(x.titulo)}</figcaption></figure>`).join('')}</div>
</div></section>
${galerias.map((g, gi) => `<section class="sec${gi ? '' : ' sec-cinza'}"><div class="w"><div class="sec-cab"><p class="eyebrow">Galeria de imagens</p><h2>${g.nome}</h2><p>${g.fotos.length} imagens</p></div>
<div class="galeria-grade">${g.fotos.map(f => `<button data-ampliar="/assets/img/site/${f}.webp" aria-label="Ampliar">${foto('site/' + f, g.nome)}</button>`).join('')}</div></div></section>`).join('')}`;
}

function listaEventos(v) {
  return `${cabeca(v, 'Eventos', 'Confira os eventos que participamos e acompanhamos no decorrer dos anos.', [['Eventos']], 'feira-2019-3')}
<section class="sec"><div class="w"><div class="eventos-lista">${eventos.map(e => eventoItem(v, e)).join('')}</div></div></section>`;
}

function evento(v, e) {
  const outros = eventos.filter(x => x.slug !== e.slug).slice(0, 3);
  return `${cabeca(v, e.titulo, '', [['Eventos', `/${v}/eventos/`], [e.evento]], 'feira-2019-3')}
<section class="sec"><div class="w ev-in">
<article class="ev-txt"><p class="ev-meta"><time>Publicado em ${e.data}</time> · ${esc(e.evento)} · ${esc(e.cidade)}</p>${e.html}</article>
<aside class="ev-lado"><div class="ev-foto">${foto('site/' + e.foto, e.titulo)}</div><h3>Outros eventos</h3>${outros.map(o => `<a class="ev-outro" href="/${v}/evento/${o.slug}/"><time>${o.data}</time>${esc(o.titulo)}</a>`).join('')}</aside>
</div></section>`;
}

function contato(v) {
  return `${cabeca(v, 'Fale Conosco', 'Envie sua mensagem, estamos prontos para atendê-lo(a).', [['Fale Conosco']], 'feira-2019-9')}
<section class="sec"><div class="w contato-in">
<form class="form" data-mailto="${E.emailComercial}" data-assunto="Contato pelo site">
<label>Departamento<select name="Departamento" required data-depto><option value="">Selecione uma opção</option><option data-email="${E.emailComercial}">Comercial</option><option data-email="${E.emailFinanceiro}">Financeiro</option><option data-email="${E.emailComercial}">Marketing</option><option data-email="${E.emailComercial}">Vendas</option><option data-email="${E.emailComercial}">Outro</option></select></label>
<div class="form-2"><label>Nome completo<input name="Nome" required autocomplete="name"></label><label>E-mail<input name="E-mail" type="email" required autocomplete="email"></label></div>
<div class="form-2"><label>Telefone/WhatsApp<input name="Telefone" type="tel" autocomplete="tel"></label><label>Cidade/Estado<input name="Cidade" placeholder="Ex.: Curitiba, PR"></label></div>
<label>Mensagem<textarea name="Mensagem" rows="5" required></textarea></label>
<button class="btn btn-verm" type="submit">Enviar mensagem ${ic('seta')}</button>
<p class="form-nota">Ao enviar, o seu programa de e-mail abre com a mensagem pronta.</p>
</form>
<aside class="contato-lado">
<div class="ct"><h3>${ic('tel')} Telefones</h3><p><a href="tel:${E.telHref}">${E.tel}</a><br><a href="tel:${E.tel2Href}">${E.tel2}</a> (WhatsApp)</p></div>
<div class="ct"><h3>${ic('relogio')} Atendimento</h3><p>${E.horario}</p></div>
<div class="ct"><h3>${ic('mail')} E-mails</h3><p>Comercial: <a href="mailto:${E.emailComercial}">${E.emailComercial}</a><br>Financeiro: <a href="mailto:${E.emailFinanceiro}">${E.emailFinanceiro}</a></p></div>
<div class="ct"><h3>${ic('pin')} Endereço</h3><p>${E.endereco}</p><a class="link" href="${E.mapa}" target="_blank" rel="noopener">Abrir no mapa ${ic('seta')}</a></div>
<a class="ct-trab" href="/${v}/trabalhe-conosco/">Quer fazer parte da equipe? <b>Trabalhe Conosco ${ic('seta')}</b></a>
</aside></div></section>
<div class="mapa"><iframe title="Mapa do Grupo KSS" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('R. Castro, 29 - Jardim Cruzeiro, São José dos Pinhais - PR')}&z=15&output=embed"></iframe></div>`;
}

function trabalhe(v) {
  return `${cabeca(v, 'Trabalhe Conosco', 'Deseja fazer parte de nossa equipe? Preencha esse breve formulário.', [['Trabalhe Conosco']], 'evento-induspar-2025')}
<section class="sec"><div class="w contato-in">
<form class="form" data-mailto="${E.emailComercial}" data-assunto="Currículo pelo site">
<div class="form-2"><label>Nome completo<input name="Nome" required autocomplete="name"></label><label>E-mail<input name="E-mail" type="email" required autocomplete="email"></label></div>
<div class="form-2"><label>Telefone/WhatsApp<input name="Telefone" type="tel" autocomplete="tel"></label><label>Cidade/Estado<input name="Cidade" placeholder="Ex.: Curitiba, PR"></label></div>
<label>Área de interesse e apresentação<textarea name="Apresentação" rows="5"></textarea></label>
<button class="btn btn-verm" type="submit">Enviar ${ic('seta')}</button>
<p class="form-nota">O seu programa de e-mail abre com a mensagem pronta. Anexe o currículo em PDF (até 3 MB) antes de enviar.</p>
</form>
<aside class="contato-lado"><div class="ct"><h3>${ic('fabrica')} Trabalhe em uma indústria com ${new Date().getFullYear() - E.desde} anos de história</h3><p>Uma indústria que nasceu, cresceu e se fortaleceu em São José dos Pinhais, e que hoje atende todo o território nacional.</p></div>${foto('site/evento-hospitalar-2025', 'Equipe do Grupo KSS na Feira Hospitalar 2025')}</aside>
</div></section>`;
}

function orcamento(v) {
  const cat = Object.fromEntries(produtos.map(p => [p.slug, { n: p.nome, c: p.catNome, f: p.fotos[0].f }]));
  return `${cabeca(v, 'Orçamento', 'Selecione os itens no catálogo e preencha o formulário para enviar a sua solicitação.', [['Orçamento']], 'feira-2019-4')}
<section class="sec"><div class="w orc-in">
<div class="orc-lista"><h2>Produtos do orçamento</h2>
<ul data-orc-lista></ul>
<p class="orc-vazio" data-orc-vazio>Sua lista está vazia. Abra um produto e toque em “Adicionar ao orçamento”, ou escolha abaixo.</p>
<label class="orc-add">Adicionar produto<select data-orc-select><option value="">Selecione um produto</option>${linhas.map(l => `<optgroup label="${esc(l.nome)}">${produtos.filter(p => p.linha === l.slug).map(p => `<option value="${p.slug}">${esc(p.nome)}</option>`).join('')}</optgroup>`).join('')}</select></label>
<a class="link" href="/${v}/produtos/">Voltar ao catálogo ${ic('seta')}</a>
</div>
<form class="form" data-mailto="${E.emailComercial}" data-assunto="Solicitação de orçamento pelo site" data-orc-form>
<h2>Dados da empresa</h2>
<div class="form-2"><label>Razão social<input name="Razão social" required></label><label>Responsável<input name="Responsável" required autocomplete="name"></label></div>
<div class="form-2"><label>CNPJ<input name="CNPJ" inputmode="numeric"></label><label>E-mail<input name="E-mail" type="email" required autocomplete="email"></label></div>
<div class="form-2"><label>Telefone/WhatsApp<input name="Telefone" type="tel" required autocomplete="tel"></label><label>CEP<input name="CEP" inputmode="numeric" autocomplete="postal-code"></label></div>
<label>Endereço completo<input name="Endereço" placeholder="Rua, número, bairro, cidade, estado"></label>
<label>Observações ou detalhes<textarea name="Observações" rows="4"></textarea></label>
<button class="btn btn-verm" type="submit">Enviar solicitação ${ic('seta')}</button>
<p class="form-nota">O seu programa de e-mail abre com a lista e os dados prontos, endereçado ao comercial (${E.emailComercial}).</p>
</form></div></section>
<script>window.KSS_CAT=${JSON.stringify(cat)};</script>`;
}

// ---------- montagem ----------
export function gerarVersao(v) {
  const out = {};
  out.index = pagina(v, '', 'index', `${E.nome} | Focos e mesas cirúrgicas, hotelaria hospitalar`, `Desde 1987 o Grupo KSS fabrica focos cirúrgicos SKYLED, mesas cirúrgicas Vision T e equipamentos para hotelaria hospitalar em São José dos Pinhais, PR.`, v === 'a' ? homeA(v) : homeB(v));
  out['quem-somos'] = pagina(v, 'quem-somos/', 'quem-somos', `Quem Somos | ${E.nome}`, 'Presentes no mercado desde 1987, com produtos 100% nacionais projetados, fabricados e comercializados pelo Grupo KSS.', quemSomos(v));
  out.produtos = pagina(v, 'produtos/', 'produtos', `Produtos | ${E.nome}`, `Catálogo com ${produtos.length} produtos: focos cirúrgicos, mesas cirúrgicas, acessórios, aspirador, camas, macas, carros de emergência e hotelaria hospitalar.`, catalogo(v));
  for (const p of produtos) out[`produto/${p.slug}`] = pagina(v, `produto/${p.slug}/`, 'produtos', `${p.nome} | ${E.nome}`, p.resumo || `${p.nome}, ${p.catNome}.`, produto(v, p));
  out.midias = pagina(v, 'midias/', 'midias', `Mídias | ${E.nome}`, 'Vídeos dos equipamentos e galerias das feiras em que o Grupo KSS participou.', midias(v));
  out.eventos = pagina(v, 'eventos/', 'eventos', `Eventos | ${E.nome}`, 'Feiras e congressos do setor de saúde com a participação do Grupo KSS.', listaEventos(v));
  for (const e of eventos) out[`evento/${e.slug}`] = pagina(v, `evento/${e.slug}/`, 'eventos', `${e.titulo} | ${E.nome}`, e.resumo, evento(v, e));
  out['fale-conosco'] = pagina(v, 'fale-conosco/', 'fale-conosco', `Fale Conosco | ${E.nome}`, `Telefone ${E.tel}, e-mail ${E.emailComercial}. ${E.endereco}.`, contato(v));
  out['trabalhe-conosco'] = pagina(v, 'trabalhe-conosco/', '', `Trabalhe Conosco | ${E.nome}`, 'Envie seu currículo para o Grupo KSS.', trabalhe(v));
  out.orcamento = pagina(v, 'orcamento/', '', `Orçamento | ${E.nome}`, 'Monte a lista de equipamentos e solicite um orçamento ao Grupo KSS.', orcamento(v));
  return out;
}
