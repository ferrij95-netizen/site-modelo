// Monta as páginas das versões A ("Sorriso": fiel ao site atual, faixa colorida, azul VRC, círculos e o caminho do encerado à coroa)
// e B ("Bancada": clara e técnica, a VRC em cada etapa do laboratório, Lótus Ceram em destaque). Estilos em public/assets/{base,a,b}.css.
import { empresa as E, textos as T, linhas, depoimentos, revendas, ufs, produtos, prod } from './conteudo.mjs';

export const nomesVersao = { a: 'Sorriso', b: 'Bancada' };

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fotoP = (p, n = 0, extra = '', alt = p.nome) => { const [w, h] = p.fotos[n] || p.fotos[0]; return `<img src="/assets/img/p/${p.slug}-${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`; };
const img = (src, alt, w, h, extra = '') => `<img src="/assets/img/${src}" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const daLinha = id => produtos.filter(p => p.linha === id);
const nomeLinha = id => linhas.find(l => l.id === id).nome;

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'sobre', nome: 'Sobre', caminho: 'sobre/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'onde-comprar', nome: 'Onde comprar', caminho: 'onde-comprar/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  chave: '<path d="M14.5 6.5a4 4 0 105 5l-1.5-1.5-2 .5-.5-2-1.5-1.5z"/><path d="M14 10l-9 9 2 2 2-2-1-1 2-2 1 1 3-3"/>',
  caminhao: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  play: '<circle cx="12" cy="12" r="10"/><path d="M10 8.5l5.5 3.5-5.5 3.5z"/>',
  fone: '<path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  loja: '<path d="M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9h16M9 20v-6h6v6"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 13h6M9 17h6"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  yt: '<rect x="2.5" y="6" width="19" height="12" rx="4"/><path d="M10 9.5l5 2.5-5 2.5z"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da VRC Equipamentos e gostaria de mais informações.') => `https://wa.me/${E.whats.wa}?text=${encodeURIComponent(txt)}`;
const faixaCor = '<div class="faixa-cor" aria-hidden="true"></div>';

// ---------- moldura ----------
function head(v, caminho, titulo, descricao, og = `${E.url}assets/og-${v}.jpg`) {
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
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');

function topo(v, atual) {
  const suporte = `<a class="btn-suporte" href="${E.suporte}" target="_blank" rel="noopener">${ic('fone')}<span>Suporte</span></a>`;
  if (v === 'a') return `${faixaCor}
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="VRC Equipamentos, página inicial"><img src="/assets/logo.webp" alt="VRC Equipamentos, uma marca do Grupo Cumbica" width="1000" height="147"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}${suporte}</nav>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
  return `<div class="pre"><div class="in"><span>${ic('relogio')} ${E.horario}</span><a href="tel:${E.fones[0].href}">${ic('tel')} ${E.fones[0].n}</a><a href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} ${E.whats.n}</a><a class="pre-sup" href="${E.suporte}" target="_blank" rel="noopener">Área de suporte ${ic('seta')}</a></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="VRC Equipamentos, página inicial"><img src="/assets/logo.webp" alt="VRC Equipamentos, uma marca do Grupo Cumbica" width="1000" height="147"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="so-cel" href="${E.suporte}" target="_blank" rel="noopener">Suporte</a></nav>
  <a class="btn btn-topo" href="/b/onde-comprar/">${ic('loja')} Onde comprar</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape">${v === 'a' ? faixaCor : ''}<div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.webp" alt="VRC Equipamentos" width="1000" height="147" loading="lazy"><p>${T.tripe}</p>
  <div class="redes"><a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('fb')}</a><a href="${E.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${ic('yt')}</a></div></div>
  <nav aria-label="Rodapé"><h3>Menu</h3>${menu(v, '')}<a href="${E.suporte}" target="_blank" rel="noopener">Suporte</a></nav>
  <div><h3>Linhas</h3>${linhas.map(l => `<a href="/${v}/produtos/#${l.id}">${l.nome}</a>`).join('')}</div>
  <div><h3>Entre em contato</h3><p><a href="${E.mapa}" target="_blank" rel="noopener">${E.endereco.join('<br>')}</a></p>
  <p>${E.fones.map(f => `<a href="tel:${f.href}">${f.n}</a>`).join('<br>')}<br><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp ${E.whats.n}</a></p>
  <p><a href="mailto:${E.email}">${E.email}</a></p></div>
</div><p class="rod-fim">© VRC Equipamentos · uma marca do Grupo Cumbica · Guarulhos, SP</p></footer>
<a class="wa-flut" href="${waLink()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('wa')}</a>`;
}

const pagina = (v, slug, caminho, titulo, descricao, corpo, og) => `${head(v, caminho, titulo, descricao, og)}
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

const capa = (v, eyebrow, titulo, sub) => v === 'a'
  ? `<section class="capa"><div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`
  : `<section class="capa"><div class="in"><nav class="trilha" aria-label="Você está em"><a href="/b/">Home</a><span>/</span>${eyebrow}</nav><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

// ---------- blocos ----------
const contaRevendas = `${revendas.length} dentais em ${ufs.length} estados`;

// Depoimentos. A: carrossel em faixa azul, como no site atual. B: lista de nomes que troca o depoimento.
function depoA() {
  return `<section class="depo"><div class="in">
  <h2>${T.indica}</h2>
  <div class="depo-trilho" data-carrossel>${depoimentos.map((d, i) => `<figure class="depo-item"${i ? ' hidden' : ''}>
    <blockquote><p>“${esc(d.texto)}”</p></blockquote>
    <figcaption>${img(`dep/${d.foto}.webp`, d.nome, 250, 250)}<span><b>${esc(d.nome)}</b>${d.memoria ? '<small>Em memória</small>' : ''}</span></figcaption>
    <ul class="depo-cv">${d.cv.slice(0, 4).map(c => `<li>${esc(c)}</li>`).join('')}</ul>
  </figure>`).join('')}</div>
  <div class="depo-ctrl"><button type="button" data-ant aria-label="Depoimento anterior">${ic('seta')}</button><div class="depo-pontos" data-pontos></div><button type="button" data-prox aria-label="Próximo depoimento">${ic('seta')}</button></div>
</div></section>`;
}
function depoB() {
  return `<section class="depo"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Depoimentos</p><h2>${T.indica}</h2><p>Professores, técnicos em prótese dentária e cirurgiões-dentistas que usam e indicam os equipamentos VRC.</p></div>
  <div class="depo-grade" data-troca-depo>
    <ul class="depo-nomes" role="tablist" aria-label="Quem indica">${depoimentos.map((d, i) => `<li><button role="tab" type="button" id="dt-${i}" aria-controls="dp-${i}" aria-selected="${i === 0}">${img(`dep/${d.foto}.webp`, '', 250, 250)}<span><b>${esc(d.nome)}</b><small>${esc(d.cv[0])}</small></span></button></li>`).join('')}</ul>
    ${depoimentos.map((d, i) => `<figure class="depo-painel" role="tabpanel" id="dp-${i}" aria-labelledby="dt-${i}"${i ? ' hidden' : ''}><blockquote><p>${esc(d.texto)}</p></blockquote><figcaption><b>${esc(d.nome)}</b>${d.memoria ? ' <small>(em memória)</small>' : ''}<ul>${d.cv.slice(0, 5).map(c => `<li>${esc(c)}</li>`).join('')}</ul></figcaption></figure>`).join('')}
  </div>
</div></section>`;
}

const mvv = (v) => `<div class="mvv" data-sanfona>
  <details open><summary><span>Missão</span></summary><p>${T.missao}</p></details>
  <details><summary><span>Visão</span></summary><p>${T.visao}</p></details>
  <details><summary><span>Valores</span></summary><ol class="valores">${T.valores.map(x => `<li>${x}</li>`).join('')}</ol></details>
</div>`;

const garantiaBloco = (v) => `<section class="garantia"><div class="in">
  ${img('selo-garantia.webp', 'Selo de garantia VRC', 250, 250, ' class="selo-g"')}
  <div class="gar-txt"><p class="eyebrow">Termo de garantia</p><h2>${T.garantia}</h2><p>${T.frete}</p><p class="gar-frase">${T.fraseGarantia}</p></div>
  <ul class="gar-lista">
    <li>${ic('escudo')}<span><b>1 ano de garantia</b>em todos os equipamentos (18 meses no Forno Lótus)</span></li>
    <li>${ic('chave')}<span><b>Assistência autorizada</b>em várias regiões do país e na fábrica, em São Paulo</span></li>
    <li>${ic('caminhao')}<span><b>Frete por conta da VRC</b>ida e volta, na garantia</span></li>
  </ul>
</div></section>`;

const formContato = (v, assunto = 'Contato pelo site', extra = '') => `<form class="form" data-mailto="${E.email}" data-assunto="${esc(assunto)}">
  <div class="campos">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>Laboratório ou empresa<input name="Empresa" autocomplete="organization"></label>
    <label>E-mail<input name="E-mail" type="email" autocomplete="email"></label>
    <label>Telefone ou WhatsApp<input name="Telefone" type="tel" required autocomplete="tel"></label>
    <label class="largo">Cidade / UF<input name="Cidade"></label>
    ${extra}
    <label class="largo">Mensagem<textarea name="Mensagem" rows="4"></textarea></label>
  </div>
  <div class="form-acoes"><button class="btn" type="submit">${ic('mail')} Enviar por e-mail</button><button class="btn btn-wa" type="button" data-wa="${E.whats.wa}">${ic('wa')} Enviar pelo WhatsApp</button></div>
</form>`;

// ---------- Home ----------
function home(v) {
  const titulo = 'VRC Equipamentos · Equipamentos para laboratório de prótese dentária';
  if (v === 'a') {
    const lotus = prod('forno-lotus'), prensa = prod('prensa-facil'), white = prod('forno-lotus-ceram-white');
    return pagina(v, 'index', '', titulo, T.apresentacao, `
<section class="hero"><div class="in">
  <div class="hero-txt">
    <h1 class="faixas"><span>${T.slogan[0]}</span><span>${T.slogan[1]}</span></h1>
    <p>Fornos, prensas, polimerizadoras e espatuladores para laboratórios de prótese dentária, de fabricação própria.</p>
    <div class="botoes"><a class="btn btn-branco" href="/a/produtos/">Conheça a linha de produtos ${ic('seta')}</a><a class="btn btn-contorno" href="/a/onde-comprar/">Onde comprar</a></div>
  </div>
  <div class="hero-foto">
    <div class="circ">${fotoP(white, 0, ' fetchpriority="high" loading="eager"', 'Forno Lótus Ceram White')}</div>
    ${img('selo-30.webp', 'Selo 30 anos VRC', 197, 272, ' class="selo-30"')}
    <a class="hero-tag" href="/a/produtos/forno-lotus-ceram-white/">Forno Lótus Ceram White ${ic('seta')}</a>
  </div>
</div></section>

<section class="tripe"><div class="in">
  <h2>${T.tripe}</h2>
  <p>${T.apresentacao}</p>
  <dl class="numeros"><div><dt>Equipamentos vendidos</dt><dd>30.000+</dd></div><div><dt>Continentes</dt><dd>4</dd></div><div><dt>Garantia de fábrica</dt><dd>1 ano</dd></div><div><dt>Revendas no Brasil</dt><dd>${revendas.length}</dd></div></dl>
</div></section>

<section class="caminho"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Do encerado à coroa pronta</p><h2>A VRC no caminho de cada trabalho</h2></div>
  <svg class="caminho-linha" viewBox="0 0 1200 260" preserveAspectRatio="none" aria-hidden="true"><path d="M0 120 C120 110 170 100 230 135 S380 200 480 150 S640 70 720 140 S900 220 1000 165 S1140 110 1200 120"/></svg>
  <ol class="caminho-etapas">
    <li><a href="/a/produtos/#gesso"><span class="circ c-p">${img('casquete.webp', 'Casquete encerado no êmbolo', 228, 366)}</span><b>O encerado</b><small>modelo e revestimento sem bolhas</small></a></li>
    <li><a href="/a/produtos/forno-lotus/"><span class="circ c-g">${fotoP(lotus, 0)}</span><b>Forno Lótus VRC®</b><small>eliminação da cera e fundição</small></a></li>
    <li><a href="/a/produtos/prensa-facil/"><span class="circ c-m">${fotoP(prensa, 0)}</span><b>Prensa Fácil VRC®</b><small>porcelana injetada</small></a></li>
    <li><a href="/a/produtos/forno-lotus-ceram/"><span class="circ c-p">${img('coroas.webp', 'Coroas de cerâmica prontas', 410, 410)}</span><b>A coroa pronta</b><small>queima no Lótus Ceram</small></a></li>
  </ol>
  <p class="centro"><a class="btn" href="/a/produtos/">Clique aqui e conheça toda a nossa linha de produtos ${ic('seta')}</a></p>
</div></section>

<section class="linhas-a"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Produtos VRC</p><h2>Seis linhas para o laboratório inteiro</h2></div>
  <div class="linhas-grade">${linhas.map(l => { const ps = daLinha(l.id); return `<a class="linha-a" href="/a/produtos/#${l.id}"><span class="linha-fotos">${ps.slice(0, 3).map(p => `<span>${fotoP(p, 0, '', '')}</span>`).join('')}</span><span class="linha-txt"><b>${l.nome}</b>${l.texto}<small>${ps.length} ${ps.length === 1 ? 'produto' : 'produtos'} ${ic('seta')}</small></span></a>`; }).join('')}</div>
</div></section>

${depoA()}

<section class="sobre-home"><div class="in">
  <div><p class="eyebrow">Sobre a VRC</p><h2>Missão, visão e valores</h2>${mvv(v)}<a class="link" href="/a/sobre/">Conheça a empresa ${ic('seta')}</a></div>
  <div class="garantia-mini">${img('selo-garantia.webp', 'Selo de garantia VRC', 250, 250)}<h3>${T.garantia}</h3><p>${T.frete}</p><a class="link" href="/a/sobre/#garantia">Termo de garantia ${ic('seta')}</a></div>
</div></section>

<section class="revendas-faixa"><div class="in">
  <div><h2>Encontre nas melhores dentais</h2><p>${contaRevendas}. Encontre a mais perto de você.</p><a class="btn" href="/a/onde-comprar/">Onde comprar ${ic('seta')}</a></div>
  <div class="logos-rola" aria-hidden="true"><div>${[...revendas, ...revendas].slice(0, 40).map(r => img(`rev/${r.logo}.webp`, '', 165, 165).replace(' loading="lazy"', '')).join('')}</div></div>
</div></section>`);
  }

  // B
  const ceram = prod('forno-lotus-ceram');
  return pagina(v, 'index', '', titulo, T.apresentacao, `
<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">Fabricante brasileiro · Grupo Cumbica · Guarulhos, SP</p>
    <h1>Equipamentos para o laboratório de prótese dentária.</h1>
    <p>Fornos, prensas, polimerizadoras, espatuladores e acessórios de fabricação própria. ${T.tripe}</p>
    <div class="botoes"><a class="btn" href="#etapas">Encontre o equipamento ${ic('seta')}</a><a class="btn btn-linha" href="/b/onde-comprar/">Onde comprar</a></div>
    <dl class="numeros"><div><dt>Equipamentos vendidos</dt><dd>30.000+</dd></div><div><dt>Produtos na linha</dt><dd>${produtos.length}</dd></div><div><dt>Dentais revendedoras</dt><dd>${revendas.length}</dd></div></dl>
  </div>
  <figure class="hero-foto">${fotoP(ceram, 3, ' fetchpriority="high" loading="eager"', 'Forno Lótus Ceram com a pinça colocando a peça na base refratária')}<figcaption><a href="/b/produtos/forno-lotus-ceram/"><small>Lançamento</small><b>Forno Lótus Ceram</b> ${ic('seta')}</a></figcaption></figure>
</div></section>

<section class="etapas" id="etapas"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Do gesso à cerâmica</p><h2>A VRC em cada etapa do laboratório</h2><p>Escolha a etapa do trabalho e veja os equipamentos que a VRC fabrica para ela.</p></div>
  <div class="etapas-trilho" role="tablist" aria-label="Etapas do laboratório">${linhas.map((l, i) => `<button role="tab" type="button" id="et-${l.id}" aria-controls="ep-${l.id}" aria-selected="${i === 0}"><span class="n">${String(i + 1).padStart(2, '0')}</span><b>${l.etapa}</b></button>`).join('')}</div>
  ${linhas.map((l, i) => { const ps = daLinha(l.id); return `<div class="etapa-painel" role="tabpanel" id="ep-${l.id}" aria-labelledby="et-${l.id}"${i ? ' hidden' : ''}>
    <div class="ep-txt"><h3>${l.nome}</h3><p>${l.texto}</p><a class="link" href="/b/produtos/#${l.id}">Ver a linha completa ${ic('seta')}</a></div>
    <ul class="ep-prods">${ps.map(p => `<li><a href="/b/produtos/${p.slug}/"><span class="ep-foto">${fotoP(p, 0, '', '')}</span><b>${p.nome}</b><small>${p.curta}</small></a></li>`).join('')}</ul>
  </div>`; }).join('')}
</div></section>

<section class="destaque"><div class="in">
  <div class="dest-txt"><p class="eyebrow">Destaque</p><h2>Forno Lótus Ceram</h2><p>${ceram.desc[0].x}</p>
  <dl class="dest-num"><div><dt>Temperatura máxima</dt><dd>1100 °C</dd></div><div><dt>Receitas programáveis</dt><dd>100</dd></div><div><dt>Tela touch</dt><dd>7"</dd></div><div><dt>Bomba de vácuo</dt><dd>Hypervac</dd></div></dl>
  <div class="botoes"><a class="btn btn-branco" href="/b/produtos/forno-lotus-ceram/">Ver ficha completa ${ic('seta')}</a><a class="btn btn-contorno" href="https://www.youtube.com/watch?v=${ceram.videos[0]}" target="_blank" rel="noopener">${ic('play')} Assistir ao vídeo</a></div></div>
  <div class="dest-fotos">${[1, 2, 4].map(n => `<figure>${fotoP(ceram, n, '', '')}</figure>`).join('')}</div>
</div></section>

${depoB()}

<section class="servico"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Garantia e assistência</p><h2>${T.fraseGarantia}</h2></div>
  <div class="serv-cols">
    <div>${ic('escudo', 'ic-g')}<h3>1 ano de garantia</h3><p>${T.garantia} O Forno Lótus tem 18 meses.</p></div>
    <div>${ic('chave', 'ic-g')}<h3>Assistência pelo Brasil</h3><p>Pontos de assistência técnica autorizada em várias regiões e um setor da fábrica para atender onde ainda não há assistência.</p></div>
    <div>${ic('caminhao', 'ic-g')}<h3>Frete ida e volta</h3><p>${T.frete}</p></div>
  </div>
  <a class="serv-sup" href="${E.suporte}" target="_blank" rel="noopener"><span><b>Área de suporte VRC</b>Abra seu chamado de assistência técnica pelo portal de qualidade.</span>${ic('seta')}</a>
</div></section>

<section class="onde-home"><div class="in">
  <div><p class="eyebrow">Onde comprar</p><h2>${revendas.length} dentais em ${ufs.length} estados</h2><p>Encontre os produtos VRC nas melhores dentais do Brasil.</p><a class="btn" href="/b/onde-comprar/">Ver a lista por estado ${ic('seta')}</a></div>
  <ul class="ufs-home">${ufs.map(u => `<li><a href="/b/onde-comprar/#uf-${u}"><b>${u}</b><small>${revendas.filter(r => r.uf === u).length}</small></a></li>`).join('')}</ul>
</div></section>`);
}

// ---------- Sobre ----------
function sobre(v) {
  return pagina(v, 'sobre', 'sobre/', 'Sobre · VRC Equipamentos', T.apresentacao, `
${capa(v, 'Sobre nós', 'A empresa', T.sobreIntro)}
<section class="empresa"><div class="in">
  <div class="emp-txt"><h2>${T.tripe}</h2><p>${T.apresentacao}</p><p>${T.grupo}</p></div>
  <figure class="emp-grupo">${img('grupo-cumbica.webp', 'Grupo Cumbica: criando hoje a tecnologia de amanhã', 700, 270)}<figcaption>A VRC é uma marca do Grupo Cumbica.</figcaption></figure>
</div></section>
<section class="mvv-sec"><div class="in">
  <div class="sec-tit"><h2>Missão, visão e valores</h2></div>
  ${v === 'a' ? mvv(v) : `<div class="mvv-cols"><div><h3>Missão</h3><p>${T.missao}</p></div><div><h3>Visão</h3><p>${T.visao}</p></div><div class="mvv-val"><h3>Valores</h3><ol class="valores">${T.valores.map(x => `<li>${x}</li>`).join('')}</ol></div></div>`}
</div></section>
<div id="garantia"></div>
${garantiaBloco(v)}
<section class="assist"><div class="in"><h2>Assistência técnica</h2><p>${T.assistencia}</p><a class="btn" href="${E.suporte}" target="_blank" rel="noopener">${ic('fone')} Área de suporte</a></div></section>`);
}

// ---------- Produtos ----------
function produtosPag(v) {
  const filtros = `<div class="filtros">
    <label class="busca">${ic('busca')}<input type="search" placeholder="Pesquise: forno, prensa, resina, gesso…" data-busca aria-label="Pesquisar produto"></label>
    <nav class="chips" aria-label="Linhas">${linhas.map(l => `<a href="#${l.id}">${l.nome}</a>`).join('')}</nav>
  </div><p class="sem-res" data-sem-res hidden>Nenhum produto encontrado. <a href="/${v}/contato/">Fale com a VRC</a>.</p>`;
  const item = p => `<li data-busca-txt="${esc(`${p.nome} ${p.curta} ${nomeLinha(p.linha)}`.toLowerCase())}"><a href="/${v}/produtos/${p.slug}/"><span class="pf">${fotoP(p, 0, '', '')}</span><span class="pt"><b>${p.nome}</b><small>${p.curta}</small></span>${v === 'b' ? ic('seta') : ''}</a></li>`;
  return pagina(v, 'produtos', 'produtos/', 'Produtos · VRC Equipamentos', T.produtosIntro, `
${capa(v, 'Produtos', 'Produtos VRC', T.produtosIntro)}
<section class="catalogo"><div class="in">
  ${filtros}
  ${linhas.map((l, i) => `<section class="linha" id="${l.id}" data-linha><header><span class="n">${String(i + 1).padStart(2, '0')}</span><div><h2>${l.nome}</h2><p>${l.texto}</p></div></header><ul class="prods">${daLinha(l.id).map(item).join('')}</ul></section>`).join('')}
</div></section>`);
}

function produtoPag(v, p) {
  const outros = daLinha(p.linha).filter(x => x.slug !== p.slug);
  const tabs = p.tabs.map((t, i) => {
    const temKv = t.itens.some(x => x.k);
    const corpo = t.itens.map(x => x.sub ? `<h4>${esc(x.sub)}</h4>` : x.k ? `<div class="kv"><dt>${esc(x.k)}</dt><dd>${esc(x.v)}</dd></div>` : `<li>${esc(x.x)}</li>`).join('')
      .replace(/(<div class="kv">.*?<\/div>)+/g, m => `<dl>${m}</dl>`).replace(/(<li>.*?<\/li>)+/g, m => `<ul>${m}</ul>`);
    return { id: `t${i}`, titulo: t.titulo, corpo, temKv };
  });
  const desc = p.desc.map(b => b.t === 'li' ? `<li>${esc(b.x)}</li>` : `<p>${esc(b.x)}</p>`).join('').replace(/(<li>.*?<\/li>)+/g, m => `<ul class="checks">${m}</ul>`);
  const msg = `Olá! Vim pelo site da VRC Equipamentos e gostaria de um orçamento do ${p.nome}.`;
  return pagina(v, 'produtos', `produtos/${p.slug}/`, `${p.nome} · VRC Equipamentos`, p.curta, `
<section class="prod-topo"><div class="in">
  <nav class="trilha" aria-label="Você está em"><a href="/${v}/produtos/">Produtos</a><span>/</span><a href="/${v}/produtos/#${p.linha}">${nomeLinha(p.linha)}</a><span>/</span>${p.nome}</nav>
  <div class="prod-grade">
    <div class="galeria" data-galeria>
      <figure class="gal-principal">${fotoP(p, p.fotos.length > 1 ? 1 : 0, ' fetchpriority="high" loading="eager"')}</figure>
      ${p.fotos.length > 2 ? `<div class="gal-mini">${p.fotos.map((f, n) => n === 0 ? '' : `<button type="button" aria-label="Foto ${n} de ${p.fotos.length - 1}"${n === 1 ? ' aria-current="true"' : ''} data-src="/assets/img/p/${p.slug}-${n}.webp" data-w="${f[0]}" data-h="${f[1]}">${fotoP(p, n, '', '')}</button>`).join('')}</div>` : ''}
    </div>
    <div class="prod-info">
      <p class="eyebrow">${nomeLinha(p.linha)}</p>
      <h1>${p.nome}</h1>
      <p class="prod-curta">${p.curta}</p>
      <div class="prod-desc">${desc}</div>
      <div class="botoes"><a class="btn" href="${waLink(msg)}" target="_blank" rel="noopener">${ic('wa')} Solicitar orçamento</a><a class="btn btn-linha" href="/${v}/onde-comprar/">${ic('loja')} Onde comprar</a></div>
      ${p.slug === 'forno-lotus-ceram' ? `<a class="link" href="${E.catalogoCeram}" target="_blank" rel="noopener">${ic('doc')} Baixar o catálogo completo do Lótus Ceram</a>` : ''}
      <p class="prod-gar">${ic('escudo')} ${p.slug === 'forno-lotus' ? 'Garantia de 18 meses' : 'Garantia de 1 ano de fábrica'} · ${T.bordao}</p>
    </div>
  </div>
</div></section>
${tabs.length ? `<section class="prod-ficha"><div class="in">
  <div class="abas" data-abas>
    <div class="abas-lista" role="tablist" aria-label="Ficha do produto">${tabs.map((t, i) => `<button role="tab" type="button" id="${t.id}-b" aria-controls="${t.id}" aria-selected="${i === 0}">${esc(t.titulo)}</button>`).join('')}</div>
    ${tabs.map((t, i) => `<div class="aba-painel" role="tabpanel" id="${t.id}" aria-labelledby="${t.id}-b"${i ? ' hidden' : ''}>${t.corpo}</div>`).join('')}
  </div>
</div></section>` : ''}
${p.videos.length ? `<section class="prod-videos"><div class="in"><h2>Vídeos</h2><div class="videos">${p.videos.map(id => `<a class="video" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener" data-yt="${id}"><img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="Vídeo do ${esc(p.nome)} no YouTube" width="480" height="360" loading="lazy">${ic('play', 'ic-play')}</a>`).join('')}</div></div></section>` : ''}
${outros.length ? `<section class="relacionados"><div class="in"><h2>Mais em ${nomeLinha(p.linha).toLowerCase()}</h2><ul class="prods">${outros.map(o => `<li><a href="/${v}/produtos/${o.slug}/"><span class="pf">${fotoP(o, 0, '', '')}</span><span class="pt"><b>${o.nome}</b><small>${o.curta}</small></span></a></li>`).join('')}</ul></div></section>` : ''}`,
    `${E.url}assets/img/p/${p.slug}-0.webp`);
}

// ---------- Onde comprar ----------
function ondeComprar(v) {
  return pagina(v, 'onde-comprar', 'onde-comprar/', 'Onde comprar · VRC Equipamentos', `Encontre os produtos VRC em ${contaRevendas}.`, `
${capa(v, 'Onde comprar', 'Encontre nas melhores dentais', `Os produtos VRC estão em ${contaRevendas} do Brasil e na América do Sul.`)}
<section class="revendas"><div class="in">
  <nav class="ufs" aria-label="Filtrar por estado" data-ufs><button type="button" aria-pressed="true" data-uf="">Todos <small>${revendas.length}</small></button>${ufs.map(u => `<button type="button" aria-pressed="false" data-uf="${u}">${u} <small>${revendas.filter(r => r.uf === u).length}</small></button>`).join('')}</nav>
  ${ufs.map(u => `<section class="uf-grupo" id="uf-${u}" data-uf-grupo="${u}"><h2>${u}</h2><ul class="rev-lista">${revendas.filter(r => r.uf === u).map(r => `<li>${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener nofollow">` : '<div>'}${img(`rev/${r.logo}.webp`, `Logo ${r.nome}`, 165, 165)}<span><b>${esc(r.nome)}</b>${esc(r.cidade)} · ${u}${r.url ? `<small>Visitar a loja ${ic('seta')}</small>` : ''}</span>${r.url ? '</a>' : '</div>'}</li>`).join('')}</ul></section>`).join('')}
</div></section>
<section class="parceiro" id="parceiro"><div class="in">
  <div class="sec-tit"><h2>Quer se tornar um parceiro da VRC?</h2><p>Envie os dados da sua dental. O comercial da VRC entra em contato.</p></div>
  ${formContato(v, 'Quero ser parceiro VRC', '<label class="largo">Site ou loja virtual<input name="Site" type="url" placeholder="https://"></label>')}
</div></section>`);
}

// ---------- Contato ----------
function contato(v) {
  return pagina(v, 'contato', 'contato/', 'Contato · VRC Equipamentos', 'Para mais informações, dúvidas ou sugestões, fale com a VRC Equipamentos.', `
${capa(v, 'Contato', 'Fale conosco', 'Para mais informações, dúvidas ou sugestões, entre em contato pelo formulário ou pelos nossos telefones.')}
<section class="contato"><div class="in">
  <div class="cont-canais">
    <a class="canal" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')}<span><small>WhatsApp</small><b>${E.whats.n}</b></span></a>
    <div class="canal">${ic('tel')}<span><small>Telefones</small>${E.fones.map(f => `<a href="tel:${f.href}"><b>${f.n}</b></a>`).join('')}</span></div>
    <a class="canal" href="mailto:${E.email}">${ic('mail')}<span><small>E-mail</small><b>${E.email}</b></span></a>
    <a class="canal" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')}<span><small>Fábrica</small><b>${E.endereco[0]}</b>${E.endereco.slice(1).join(' · ')}</span></a>
    <div class="canal">${ic('relogio')}<span><small>Atendimento</small><b>${E.horario}</b></span></div>
    <a class="canal canal-sup" href="${E.suporte}" target="_blank" rel="noopener">${ic('fone')}<span><small>Assistência técnica</small><b>Área de suporte VRC</b></span></a>
  </div>
  <div class="cont-form"><h2>Deixe uma mensagem</h2><p class="cont-sug">${T.sugestoes}</p>${formContato(v, 'Mensagem pelo site', `<label class="largo">Assunto<select name="Assunto"><option>Orçamento</option><option>Dúvida sobre produto</option><option>Assistência técnica</option><option>Sugestões e críticas</option><option>Quero ser revenda</option></select></label>`)}</div>
</div></section>
<section class="mapa-emb"><iframe title="Mapa da fábrica da VRC Equipamentos" src="https://maps.google.com/maps?q=${encodeURIComponent('Av. Justino de Maio, 1111, Cumbica, Guarulhos SP')}&z=15&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`);
}

export function gerarVersao(v) {
  const p = { index: home(v), sobre: sobre(v), produtos: produtosPag(v), 'onde-comprar': ondeComprar(v), contato: contato(v) };
  for (const x of produtos) p[`produtos/${x.slug}`] = produtoPag(v, x);
  return p;
}
