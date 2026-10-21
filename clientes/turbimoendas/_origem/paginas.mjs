// Monta as páginas das versões A ("Losango": fiel ao site atual, cinza claro, barra grafite com filete amarelo,
// títulos vinho e o losango amarelo do logo como marcador) e B ("Capacidade": ficha técnica, números grandes,
// régua milimetrada, grafite e amarelo). Estilos em public/assets/{base,a,b}.css.
import { empresa as E, textos as T, atividades, setores, faixasSetor, produtos, servicos, equipamentos, outrosEquip, medicao, galeria } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (src, alt, w = 1100, h = 826, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const zoom = (src, alt, cls = '') => `<button type="button" class="zoom ${cls}" data-zoom="/assets/img/${src}.webp" aria-label="Ampliar foto: ${esc(alt)}">${img(src, alt)}</button>`;

export const nomesVersao = { a: 'Losango', b: 'Capacidade' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'equipamentos', nome: 'Equipamentos', caminho: 'equipamentos/' },
  { slug: 'instalacoes', nome: 'Instalações', caminho: 'instalacoes/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  pdf: '<path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6M12 12v6M9 15l3 3 3-3"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
// Losango do logo (placa amarela com borda preta), usado como marcador e selo.
const losango = (cls = 'los') => `<svg class="${cls}" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5L18.5 10 10 18.5 1.5 10z"/></svg>`;
const orcar = (v, assunto) => `/${v}/contato/?assunto=${encodeURIComponent(assunto)}#orcamento`;

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
<meta name="theme-color" content="#2a2a2a">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@500;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');

function topo(v, atual) {
  const logo = v === 'a' ? 'logo' : 'logo-branco';
  return `${v === 'b' ? `<div class="faixa"><div class="in"><span>Usinagem média e pesada · Piracicaba, SP</span><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a class="so-pc" href="mailto:${E.email}">${ic('mail')} ${E.email}</a></div></div>` : ''}
<header class="topo"><div class="in">
  <a class="marca" href="/${v}/" aria-label="Turbimoendas, página inicial"><img src="/assets/${logo}.png" alt="Turbimoendas Usinagens de Peças Ltda." width="90" height="100"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  ${v === 'a' ? `<a class="topo-tel" href="tel:${E.foneHref}">${ic('tel')}<span>${E.fone}</span></a>` : `<a class="btn btn-am topo-orc" href="/b/contato/#orcamento">Orçamento</a>`}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.png" alt="Turbimoendas" width="90" height="100"><p>Fabricação de cilindros, eixos de moenda e usinagem média e pesada. ${E.area} no Distrito Industrial Uninorte, Piracicaba.</p></div>
  <div><h3>Fábrica</h3><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Ver no mapa</a></div>
  <div><h3>Fale com a gente</h3><p><a href="tel:${E.foneHref}">${E.fone}</a><br><a href="tel:${E.fone2Href}">${E.fone2}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${menu(v, '')}</nav>
</div><p class="rod-fim">© ${E.razao} · Piracicaba, SP</p></footer>
<dialog class="zoom-dlg" data-zoom-dlg><form method="dialog"><button aria-label="Fechar">✕</button></form><img alt=""><p></p></dialog>`;
}

const pagina = (v, sl, titulo, descricao, corpo) => `${head(v, nav.find(n => n.slug === sl).caminho, titulo, descricao)}
<body class="v-${v} p-${sl}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, sl)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// Título de página interna
function capa(v, titulo, sub, foto, alt) {
  if (v === 'a') return `<section class="capa"><div class="in capa-g"><div><p class="sobre">${losango()} Turbimoendas</p><h1>${titulo}</h1><p class="lead">${sub}</p></div>${img(foto, alt, 1100, 826, ' class="capa-foto"')}</div></section>`;
  return `<section class="capa"><div class="capa-foto">${img(foto, alt)}</div><div class="in"><p class="sobre">Turbimoendas / ${titulo}</p><h1>${titulo}</h1><p class="lead">${sub}</p></div><div class="regua" aria-hidden="true"></div></section>`;
}

const ctaFinal = v => `<section class="cta"><div class="in cta-g">
  <div><h2>${v === 'a' ? 'Tem uma peça para fabricar, recuperar ou usinar?' : 'Mande o desenho ou a peça. A gente usina.'}</h2><p>Envie o desenho, as medidas ou fotos da peça gasta. A equipe técnica responde com prazo e orçamento.</p></div>
  <div class="cta-acoes"><a class="btn btn-escuro" href="/${v}/contato/#orcamento">Pedir orçamento ${ic('seta')}</a><a class="cta-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div>
</div></section>`;

// Processo: do bruto à expedição (fotos reais da fábrica)
const etapas = [
  { f: 'f60', t: 'Fabricação', d: 'Cilindros coquilhados e forjados, fabricados sob medida ou a partir do desenho do cliente.' },
  { f: 'f65', t: 'Torneamento', d: 'Tornos paralelos de até 2.080 mm de diâmetro e 10.000 mm de comprimento.' },
  { f: 'f101', t: 'Retífica', d: 'Retífica cilíndrica até 1.000 × 6.600 mm, paralelo, bombê, côncavo e convexo.' },
  { f: 'f06', t: 'Medição', d: 'Micrômetros até 1.500 mm, rugosímetro e durômetro antes da liberação.' },
  { f: 'f94', t: 'Expedição', d: 'Peça embalada e içada pelas pontes rolantes de 20 e 25 toneladas.' },
];
function processo(v) {
  return `<section class="processo"><div class="in">
  <div class="sec-tit"><p class="sobre">${v === 'a' ? losango() + ' ' : ''}Como trabalhamos</p><h2>Do cilindro bruto à peça na carreta</h2></div>
  <ol class="etapas" data-rev-filhos data-rev-passo="120">${etapas.map((e, i) => `<li class="etapa"><figure>${img(e.f, e.t)}</figure><span class="etapa-n">${v === 'a' ? losango('los etapa-los') : ''}<b>${String(i + 1).padStart(2, '0')}</b></span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>
</div></section>`;
}

// ---------- HOME ----------
function homeA() {
  return `<section class="heroa"><div class="in heroa-g">
  <div class="heroa-txt">
    <p class="sobre">${losango()} Turbimoendas Usinagens de Peças Ltda.</p>
    <h1>Usinagem média e pesada com tecnologia e precisão</h1>
    <p class="lead">Cilindros, eixos de moenda, retífica e reforma de peças industriais para energia, mineração, usinas, papel, borracha e cereais. Fábrica de ${E.area} em Piracicaba (SP).</p>
    <div class="acoes"><a class="btn btn-escuro" href="/a/contato/#orcamento">Pedir orçamento ${ic('seta')}</a><a class="btn btn-linha" href="/a/servicos/">Ver serviços</a></div>
  </div>
  <div class="heroa-fotos">
    <figure class="hf1">${img('f17', 'Eixos de moenda prontos no pátio da Turbimoendas', 1100, 826, ' fetchpriority="high" loading="eager"')}</figure>
    <figure class="hf2">${img('f101', 'Cilindro de grande porte na retífica')}</figure>
    <figure class="hf3">${img('f65', 'Cilindro no torno AM 650')}</figure>
    <div class="heroa-selo">${losango('los selo-los')}<span><b>3</b> pontes rolantes<br>de até 25 t</span></div>
  </div>
</div></section>

<section class="empresa-h"><div class="in emp-g">
  <figure class="emp-foto">${img('fachada-amarela', 'Prédio da Turbimoendas no Distrito Industrial Uninorte', 400, 400)}</figure>
  <div>
    <h2>Empresa</h2>
    <p>${T.empresa[0]}</p><p>${T.empresa[1]}</p><p>${T.empresa[2]}</p>
    <a class="link" href="/a/empresa/">Conheça a empresa ${ic('seta')}</a>
  </div>
  <aside class="ativ">
    <h2>Atividades e serviços</h2>
    <ul class="lista-los">${atividades.map(a => `<li>${losango()}${a}</li>`).join('')}</ul>
  </aside>
</div></section>

<section class="numeros"><div class="in nums" data-rev-filhos>
  <div><b data-conta>7.500</b><span>m² de área total</span></div>
  <div><b data-conta>10.000</b><span>mm de comprimento no torno</span></div>
  <div><b data-conta>6.600</b><span>mm de comprimento na retífica</span></div>
  <div><b>20 / 25 / 25</b><span>toneladas nas pontes rolantes</span></div>
</div></section>

<section class="prods"><div class="in">
  <div class="sec-tit"><p class="sobre">${losango()} Produtos</p><h2>Cilindros e eixos fabricados e recuperados</h2></div>
  <div class="prods-g">${produtos.map((p, i) => `<a class="prod" href="/a/produtos/#${p.id}"><figure>${img(p.fotos[0], p.nome)}</figure><span class="prod-nome">${losango()}${p.nome}</span><span class="prod-itens">${p.itens.slice(0, 3).join(' · ')}</span></a>`).join('')}
    <a class="prod prod-sob" href="/a/contato/#orcamento">${losango('los sob-los')}<b>Peça sob desenho</b><span>Engrenagens, mancais, buchas de bronze e peças especiais fabricadas a partir do desenho ou da amostra.</span><em>Enviar desenho ${ic('seta')}</em></a></div>
</div></section>

${processo('a')}

<section class="servs"><div class="in servs-g">
  <div class="servs-tit"><p class="sobre">${losango()} Serviços</p><h2>Seis frentes de usinagem numa só fábrica</h2><p>Retífica, mandrilhamento, torneamento, fresamento, centro de usinagem e reforma de equipamentos, com máquinas de grande porte e equipe própria.</p><a class="btn btn-escuro" href="/a/servicos/">Todos os serviços ${ic('seta')}</a></div>
  <ul class="servs-lista">${servicos.map(s => `<li><a href="/a/servicos/#${s.id}">${img(s.fotos[0], s.nome, 520, 400)}<span><b>${s.nome}</b>${s.cap ? `<small>Até ${s.cap}</small>` : `<small>${s.itens[0]} e mais</small>`}</span>${ic('seta')}</a></li>`).join('')}</ul>
</div></section>

<section class="setores"><div class="in">
  <div class="sec-tit"><p class="sobre">${losango()} Setores atendidos</p><h2>Peças para quem não pode parar</h2></div>
  <div class="faixas">${faixasSetor.map(f => `<figure>${img(f.img, f.nome, 1900, 400)}<figcaption>${f.nome}</figcaption></figure>`).join('')}</div>
  <ul class="chips">${setores.map(s => `<li>${s}</li>`).join('')}</ul>
</div></section>

<section class="inst-h"><div class="in">
  <div class="sec-tit sec-tit-lado"><div><p class="sobre">${losango()} Instalações</p><h2>Conheça nossa fábrica</h2></div><a class="link" href="/a/instalacoes/">Ver as ${galeria.length} fotos ${ic('seta')}</a></div>
  <div class="mosaico">${['f20', 'f24', 'f105', 'f22', 'f75', 'f14'].map(f => zoom(f, galeria.find(g => g[0] === f)?.[1] || 'Fábrica Turbimoendas')).join('')}</div>
</div></section>

${ctaFinal('a')}`;
}

function homeB() {
  return `<section class="herob"><div class="herob-foto">${img('f24', 'Eixo de turbina sendo usinado no torno da Turbimoendas', 1100, 826, ' fetchpriority="high" loading="eager"')}</div>
<div class="in herob-g">
  <div class="herob-txt">
    <p class="sobre">Piracicaba · SP · há mais de três décadas</p>
    <h1>Peças grandes.<br>Tolerâncias pequenas.</h1>
    <p class="lead">Fabricação de cilindros e eixos de moenda, retífica, mandrilhamento e reforma de peças industriais de até 25 toneladas.</p>
    <div class="acoes"><a class="btn btn-am" href="/b/contato/#orcamento">Pedir orçamento ${ic('seta')}</a><a class="btn btn-linha" href="/b/equipamentos/">Ver parque de máquinas</a></div>
  </div>
  <dl class="specs" data-rev-filhos data-rev-passo="100">
    <div><dt>Torno paralelo</dt><dd><b data-conta>10.000</b> mm</dd><small>comprimento máximo · Ø 2.080 mm</small></div>
    <div><dt>Retífica cilíndrica</dt><dd><b data-conta>6.600</b> mm</dd><small>comprimento · Ø 1.010 mm · 17 t</small></div>
    <div><dt>Plaina fresadora</dt><dd><b data-conta>6.000</b> mm</dd><small>curso da mesa · 1.400 mm transversal</small></div>
    <div><dt>Pontes rolantes</dt><dd><b data-conta>25</b> t</dd><small>três pontes: 20, 25 e 25 t</small></div>
  </dl>
</div><div class="regua" aria-hidden="true"></div></section>

<section class="intro-b"><div class="in intro-g">
  <div><p class="sobre">A empresa</p><h2>Tecnologia e precisão em todo e qualquer processo de usinagem</h2></div>
  <div class="intro-txt"><p>${T.empresa[1]}</p><p>${T.empresa[2]}</p><a class="link" href="/b/empresa/">Política da qualidade, missão e valores ${ic('seta')}</a></div>
  <figure class="intro-foto">${img('f09', 'Fachada da Turbimoendas em Piracicaba')}</figure>
  <ul class="ativ-b">${atividades.map((a, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${a}</li>`).join('')}</ul>
</div></section>

<section class="servs-b"><div class="in">
  <div class="sec-tit sec-tit-lado"><div><p class="sobre">Serviços</p><h2>Capacidade de cada frente</h2></div><a class="link" href="/b/servicos/">Detalhes dos serviços ${ic('seta')}</a></div>
  <div class="ficha" role="table" aria-label="Serviços e capacidades">
    <div class="ficha-l ficha-cab" role="row"><span role="columnheader">Serviço</span><span role="columnheader">Capacidade máxima</span><span role="columnheader">Aplicações</span><span role="columnheader"></span></div>
    ${servicos.map(s => `<a class="ficha-l" role="row" href="/b/servicos/#${s.id}"><span role="cell" class="ficha-nome">${img(s.fotos[0], s.nome, 520, 400)}<b>${s.nome}</b></span><span role="cell" class="ficha-cap">${s.cap ? `${s.cap}${s.peso ? ` · ${s.peso}` : ''}` : 'Sob consulta'}</span><span role="cell" class="ficha-ap">${s.itens.slice(0, 4).join(', ')}</span><span role="cell">${ic('seta')}</span></a>`).join('')}
  </div>
</div></section>

<section class="prods-b"><div class="in">
  <div class="sec-tit"><p class="sobre">Produtos</p><h2>Cilindros e eixos para cinco indústrias</h2></div>
  <div class="prods-b-g">${produtos.map((p, i) => `<a class="prodb" href="/b/produtos/#${p.id}"><span class="prodb-n">${String(i + 1).padStart(2, '0')}</span>${img(p.fotos[0], p.nome)}<b>${p.nome}</b><small>${p.itens.length > 1 ? `${p.itens.length} itens` : 'Para usinas de açúcar e etanol'}</small></a>`).join('')}</div>
</div></section>

${processo('b')}

<section class="setores-b"><div class="in setb-g">
  <div><p class="sobre">Setores</p><h2>Onde as nossas peças trabalham</h2><ul class="chips">${setores.map(s => `<li>${s}</li>`).join('')}</ul></div>
  <div class="setb-fotos">${faixasSetor.map(f => `<figure>${img(f.img, f.nome, 1900, 400)}<figcaption>${f.nome}</figcaption></figure>`).join('')}</div>
</div></section>

<section class="inst-b"><div class="in">
  <div class="sec-tit sec-tit-lado"><div><p class="sobre">Instalações</p><h2>${E.area} de chão de fábrica</h2></div><a class="link" href="/b/instalacoes/">Galeria completa ${ic('seta')}</a></div>
  <div class="tira">${['f20', 'f105', 'f75', 'f89', 'f77', 'f22', 'f68', 'f82'].map(f => zoom(f, galeria.find(g => g[0] === f)?.[1] || 'Fábrica Turbimoendas')).join('')}</div>
</div></section>

${ctaFinal('b')}`;
}

// ---------- EMPRESA ----------
function empresaPag(v) {
  return `${capa(v, 'Empresa', 'Indústria de usinagem média e pesada no Distrito Industrial Uninorte, em Piracicaba (SP).', v === 'a' ? 'f14' : 'f20', 'Fábrica da Turbimoendas')}
<section class="emp-txt"><div class="in emp-txt-g">
  <div class="texto">${T.empresa.map(p => `<p>${p}</p>`).join('')}</div>
  <dl class="dados">
    <div><dt>Área total</dt><dd>${E.area}</dd></div>
    <div><dt>Pontes rolantes</dt><dd>3 · ${E.pontes}</dd></div>
    <div><dt>No mercado</dt><dd>Mais de 3 décadas</dd></div>
    <div><dt>Local</dt><dd>Uninorte · Piracicaba, SP</dd></div>
  </dl>
</div></section>
<section class="qualidade"><div class="in qual-g">
  <figure>${img('f80', 'Medição de cilindro com micrômetro')}</figure>
  <div><p class="sobre">${v === 'a' ? losango() + ' ' : ''}Política da qualidade</p><h2>Melhoria contínua na fabricação e na reforma</h2><p>${T.qualidade}</p></div>
</div></section>
<section class="mvv"><div class="in mvv-g">
  <div><h3>Missão</h3><p>${T.missao}</p></div>
  <div><h3>Visão</h3><p>${T.visao}</p></div>
  <div><h3>Valores</h3><ul class="lista-los">${T.valores.map(x => `<li>${losango()}${x}</li>`).join('')}</ul></div>
</div></section>
<section class="objetivos"><div class="in">
  <div class="sec-tit"><p class="sobre">${v === 'a' ? losango() + ' ' : ''}Objetivos da empresa</p><h2>O que buscamos todos os dias</h2></div>
  <ol class="obj">${T.objetivos.map((o, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${o}</li>`).join('')}</ol>
</div></section>
<section class="setores-emp"><div class="in"><h2>Setores atendidos</h2><ul class="chips">${setores.map(s => `<li>${s}</li>`).join('')}</ul></div></section>
${ctaFinal(v)}`;
}

// ---------- PRODUTOS ----------
function produtosPag(v) {
  return `${capa(v, 'Produtos', 'Cilindros coquilhados e forjados, rolos e eixos de moenda: fabricação nova, recuperação e retífica.', 'f23', 'Cilindro usinado')}
<nav class="ancoras"><div class="in">${produtos.map(p => `<a href="#${p.id}">${p.nome}</a>`).join('')}</div></nav>
${produtos.map((p, i) => `<section class="item${i % 2 ? ' item-inv' : ''}" id="${p.id}"><div class="in item-g">
  <div class="item-fotos">${p.fotos.map((f, k) => zoom(f, `${p.nome}, foto ${k + 1}`, k === 0 ? 'z-grande' : '')).join('')}</div>
  <div class="item-txt">
    <p class="sobre">${v === 'a' ? losango() + ' ' : ''}Produto ${String(i + 1).padStart(2, '0')}</p>
    <h2>${p.nome}</h2>
    <ul class="lista-los">${p.itens.map(x => `<li>${losango()}${x}</li>`).join('')}</ul>
    <a class="btn ${v === 'a' ? 'btn-escuro' : 'btn-am'}" href="${orcar(v, p.nome)}">Orçar ${p.nome.toLowerCase()} ${ic('seta')}</a>
  </div>
</div></section>`).join('\n')}
${ctaFinal(v)}`;
}

// ---------- SERVIÇOS ----------
function servicosPag(v) {
  return `${capa(v, 'Serviços', 'Seis frentes de usinagem com máquinas de grande porte, para peças de até 20 toneladas por máquina.', 'f105', 'Mandrilhadora CNC usinando peça')}
<nav class="ancoras"><div class="in">${servicos.map(s => `<a href="#${s.id}">${s.nome}</a>`).join('')}</div></nav>
${servicos.map((s, i) => `<section class="item${i % 2 ? ' item-inv' : ''}" id="${s.id}"><div class="in item-g">
  <div class="item-fotos">${s.fotos.map((f, k) => zoom(f, `${s.nome}, foto ${k + 1}`, k === 0 ? 'z-grande' : '')).join('')}</div>
  <div class="item-txt">
    <p class="sobre">${v === 'a' ? losango() + ' ' : ''}Serviço ${String(i + 1).padStart(2, '0')}</p>
    <h2>${s.nome}</h2>
    ${s.cap ? `<p class="cap"><span>Capacidade máxima</span><b>${s.cap}</b>${s.peso ? `<em>${s.peso}</em>` : ''}</p>` : ''}
    <ul class="lista-los">${s.itens.map(x => `<li>${losango()}${x}</li>`).join('')}</ul>
    <a class="btn ${v === 'a' ? 'btn-escuro' : 'btn-am'}" href="${orcar(v, s.nome)}">Orçar ${s.nome.toLowerCase()} ${ic('seta')}</a>
  </div>
</div></section>`).join('\n')}
${processo(v)}
${ctaFinal(v)}`;
}

// ---------- EQUIPAMENTOS ----------
function equipamentosPag(v) {
  const total = equipamentos.reduce((n, g) => n + g.maquinas.length, 0) + 1;
  return `${capa(v, 'Equipamentos', `Relação de máquinas e equipamentos: ${total} máquinas operatrizes, instrumentos de medição e três pontes rolantes.`, 'f10', 'Torno paralelo de grande porte')}
<section class="equip"><div class="in">
  <div class="equip-barra">
    <label class="busca">${ic('busca')}<input type="search" placeholder="Buscar máquina ou medida (ex.: Nardini, 6.000)" data-busca-eq aria-label="Buscar máquina"></label>
    <a class="btn ${v === 'a' ? 'btn-escuro' : 'btn-am'}" href="/assets/turbimoendas-equipamentos.pdf" target="_blank" rel="noopener">${ic('pdf')} Baixar tabela em PDF</a>
  </div>
  ${equipamentos.map(g => `<div class="eq-grupo" data-eq-grupo><h2>${v === 'a' ? losango() : ''}${g.grupo}</h2>
  ${g.tabela ? `<table class="eq-tab"><thead><tr><th>Máquina</th><th>Diâmetro × comprimento</th></tr></thead><tbody>${g.maquinas.map(m => `<tr data-eq="${esc((m.nome + ' ' + m.dados.map(d => d.join(' ')).join(' ')).toLowerCase())}"><td>${m.nome}</td><td>${m.dados[0][1]}</td></tr>`).join('')}</tbody></table>`
  : `<div class="eq-maqs">${g.maquinas.map(m => `<article class="eq" data-eq="${esc((m.nome + ' ' + m.dados.map(d => d.join(' ')).join(' ')).toLowerCase())}"><h3>${m.nome}</h3><dl>${m.dados.map(([k, val]) => `<div><dt>${k}</dt><dd>${val}</dd></div>`).join('')}</dl></article>`).join('')}</div>`}
  </div>`).join('\n')}
  <p class="eq-vazio" data-eq-vazio hidden>Nenhuma máquina com esse termo. Ligue para ${E.fone} que a equipe confirma a capacidade.</p>
  <div class="eq-extras">
    <div><h2>Aparelhos de medição</h2><table class="eq-tab"><tbody>${medicao.map(([k, val]) => `<tr><td>${k}</td><td>${val || 'Sim'}</td></tr>`).join('')}</tbody></table></div>
    <div><h2>Pontes rolantes</h2><ul class="pontes"><li><b>25 t</b>Ponte rolante</li><li><b>25 t</b>Ponte rolante</li><li><b>20 t</b>Ponte rolante</li></ul>
      <h2>Outros</h2><ul class="lista-los">${outrosEquip.map(x => `<li>${losango()}${x}</li>`).join('')}</ul></div>
  </div>
</div></section>
${ctaFinal(v)}`;
}

// ---------- INSTALAÇÕES ----------
function instalacoesPag(v) {
  return `${capa(v, 'Instalações', `Galpão de ${E.area} no Distrito Industrial Uninorte, com três pontes rolantes e máquinas de grande porte.`, 'f20', 'Galpão de usinagem')}
<section class="galeria"><div class="in"><div class="gal-g">${galeria.map(([f, alt]) => `<figure>${zoom(f, alt)}<figcaption>${alt}</figcaption></figure>`).join('')}</div></div></section>
${ctaFinal(v)}`;
}

// ---------- CONTATO ----------
function contatoPag(v) {
  const opcoes = ['Orçamento de peça nova', ...produtos.map(p => p.nome), ...servicos.map(s => s.nome), 'Outro assunto'];
  return `${capa(v, 'Contato', 'Envie o desenho, as medidas ou fotos da peça. A equipe técnica responde com prazo e orçamento.', 'f67', 'Recebimento de cilindro para reforma')}
<section class="contato" id="orcamento"><div class="in ct-g">
  <form class="form" data-form>
    <h2>Pedido de orçamento</h2>
    <div class="campos">
      <label>Nome<input name="nome" required autocomplete="name"></label>
      <label>Empresa<input name="empresa" autocomplete="organization"></label>
      <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
      <label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label>
      <label class="largo">Assunto<select name="assunto" data-assunto>${opcoes.map(o => `<option>${o}</option>`).join('')}</select></label>
      <label class="largo">Mensagem<textarea name="mensagem" rows="5" placeholder="Tipo de peça, material, medidas, quantidade, prazo desejado"></textarea></label>
    </div>
    <button class="btn ${v === 'a' ? 'btn-escuro' : 'btn-am'}" type="submit">Enviar por e-mail ${ic('seta')}</button>
    <p class="form-nota">O botão abre o seu e-mail com a mensagem pronta para ${E.email}. Desenhos e fotos podem ir anexados.</p>
  </form>
  <aside class="ct-info">
    <h2>Localização</h2>
    <p>${ic('pin')}<span>${E.endereco.join('<br>')}</span></p>
    <p>${ic('tel')}<span><a href="tel:${E.foneHref}">${E.fone}</a><br><a href="tel:${E.fone2Href}">${E.fone2}</a></span></p>
    <p>${ic('mail')}<span><a href="mailto:${E.email}">${E.email}</a></span></p>
    <iframe class="mapa" title="Mapa da Turbimoendas" loading="lazy" src="https://maps.google.com/maps?q=Rua%20Abelardo%20Benedicto%20Lib%C3%B3rio%2C%20380%2C%20Piracicaba%20SP&z=15&output=embed"></iframe>
  </aside>
</div></section>`;
}

export function gerarVersao(v) {
  const t = s => `${s} · Turbimoendas`;
  return {
    index: pagina(v, 'index', 'Turbimoendas · Usinagem média e pesada em Piracicaba', 'Fabricação de cilindros e eixos de moenda, retífica cilíndrica, mandrilhamento, tornos de 10 metros e reforma de peças industriais em Piracicaba (SP).', v === 'a' ? homeA() : homeB()),
    empresa: pagina(v, 'empresa', t('Empresa'), 'Turbimoendas Usinagem de Peças Ltda.: 7.500 m² no Distrito Industrial Uninorte, Piracicaba, com três pontes rolantes.', empresaPag(v)),
    produtos: pagina(v, 'produtos', t('Produtos'), 'Cilindros para borracha, cereais, papel e laminação e eixos de moenda.', produtosPag(v)),
    servicos: pagina(v, 'servicos', t('Serviços'), 'Retífica cilíndrica, mandrilhadora, tornos horizontais, fresadoras portal, reformas e centro de usinagem.', servicosPag(v)),
    equipamentos: pagina(v, 'equipamentos', t('Equipamentos'), 'Relação de máquinas e equipamentos da Turbimoendas.', equipamentosPag(v)),
    instalacoes: pagina(v, 'instalacoes', t('Instalações'), 'Fotos da fábrica da Turbimoendas em Piracicaba.', instalacoesPag(v)),
    contato: pagina(v, 'contato', t('Contato'), 'Endereço, telefones e pedido de orçamento da Turbimoendas.', contatoPag(v)),
  };
}
