// Monta as páginas das versões A ("Água pura": fiel ao site atual, fundo de água azul-claro, filtros recortados, rodapé azul)
// e B ("Fábrica": branca com faixas azul-marinho, fotos da fábrica em Piracicaba, escolha do filtro pela vazão).
// Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, textos as T, usosFiltro, filtros, filtrosEncomenda, litros, camadas, limpeza, dadosAquecedor, partesAquecedor, instalacao, obsInstalacao, locaisAquecedor } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, w, h, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const fotoFiltro = (f, extra = '') => img(f.img, `Filtro Central Tecsol ${litros(f.vazao)} litros por hora`, f.w, f.h, extra);

export const nomesVersao = { a: 'Água pura', b: 'Fábrica' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'filtros', nome: 'Filtros Centrais', caminho: 'filtros-centrais/' },
  { slug: 'aquecedores', nome: 'Aquecedores Solar', caminho: 'aquecedores-solar/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];
const link = (v, slug) => `/${v}/${nav.find(n => n.slug === slug).caminho}`;

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  gota: '<path d="M12 3s6 6.6 6 11a6 6 0 01-12 0c0-4.4 6-11 6-11z"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  check: '<path d="M5 12l4 4 10-10"/>',
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script>document.documentElement.classList.add("js")</script>
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');

function topo(v, atual) {
  const faixa = v === 'b' ? `<div class="faixa"><div class="in"><span>${ic('pin')} Fábrica em Piracicaba · lojas em Limeira e Rio Claro</span><span>${ic('relogio')} ${E.horario}</span><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div></div>` : '';
  return `${faixa}<header class="topo"><div class="in">
  <a class="marca" href="/${v}/" aria-label="Tecsol, página inicial"><img src="/assets/logo.png" alt="Tecsol Aquecedores Solar e Filtros Centrais" width="200" height="54"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="btn-topo" href="${link(v, 'contato')}#orcamento">Pedir orçamento</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-marca.png" alt="Tecsol" width="200" height="39"><p>Filtros centrais em aço inox e aquecedores solares, fabricados em Piracicaba (SP).</p><p class="rod-h">${ic('relogio')} ${E.horario}</p></div>
  <div class="rod-unid">${E.unidades.map(u => `<div><h3>${u.cidade}</h3><p>${esc(u.end)}</p><a href="tel:${u.href}">${ic('tel')} ${u.fone}</a></div>`).join('')}</div>
  <nav aria-label="Rodapé"><h3>Site</h3>${menu(v, '')}<a href="mailto:${E.email}">${E.email}</a></nav>
</div><p class="rod-fim"><span>© Tecsol · Aquecedores Solar e Filtros Centrais</span><span>Piracicaba · Limeira · Rio Claro</span></p></footer>`;
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

// ---------- blocos comuns ----------
// Corte do filtro com as camadas do elemento filtrante (1 de carvão ativado e 5 de quartzo cristalino).
function corteFiltro() {
  const ys = [0, 1, 2, 3, 4, 5];
  const grao = n => {
    // grãos cada vez maiores de cima (fino) para baixo, desenhados como pontos
    if (n === 0) return '';
    const r = 1.1 + n * .55, gap = r * 3.1;
    let s = '';
    for (let y = 8 + r; y < 46 - r; y += gap) for (let x = 6 + r + ((y / gap) % 2) * gap / 2; x < 174 - r; x += gap) s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}"/>`;
    return s;
  };
  return `<div class="corte" data-rev>
  <svg class="corte-svg" viewBox="0 0 260 420" role="img" aria-label="Corte do filtro: uma camada de carvão ativado e cinco de quartzo cristalino">
    <defs><linearGradient id="inox" x1="0" x2="1"><stop offset="0" stop-color="#8b97a3"/><stop offset=".25" stop-color="#eef2f5"/><stop offset=".55" stop-color="#b9c3cc"/><stop offset="1" stop-color="#6d7984"/></linearGradient>
    <pattern id="carvao" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="#2d3135"/><path d="M1 2l3 1-1 3-3-1zM5 6l3-1 1 3-3 1z" fill="#454b51"/></pattern></defs>
    <rect x="30" y="20" width="200" height="380" rx="26" fill="url(#inox)"/>
    <rect x="40" y="48" width="180" height="330" rx="10" fill="#d9eef8"/>
    ${ys.map(i => `<g transform="translate(40 ${70 + i * 50})"><g class="camada" style="--i:${i}">${i === 0 ? '<rect width="180" height="50" fill="url(#carvao)"/>' : `<rect width="180" height="50" fill="hsl(200 ${18 - i * 2}% ${92 - i * 5}%)"/><g fill="hsl(200 10% ${78 - i * 6}%)" stroke="#fff" stroke-width=".5">${grao(i)}</g>`}</g></g>`).join('')}
    <path class="fluxo" d="M130 4v54" stroke="#00a3e0" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M118 46l12 14 12-14" fill="#00a3e0"/>
  </svg>
  <ol class="corte-leg">${camadas.map((c, i) => `<li style="--i:${i}"><b>${c.nome}</b><span>${c.txt}</span></li>`).join('')}</ol>
</div>`;
}

const passosLimpeza = () => `<ol class="limpeza" data-rev-filhos data-rev-passo="140">${limpeza.map((p, i) => `<li><span class="n">${i + 1}</span><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ol>`;

const tabelaAquecedor = () => `<table class="dados"><caption>Dados técnicos do coletor</caption><tbody>${dadosAquecedor.map(([k, val]) => `<tr><th scope="row">${k}</th><td>${val}</td></tr>`).join('')}</tbody></table>`;

const instalacaoBloco = () => `<figure class="esquema">${img('posicoesrelativas', 'Posições relativas da instalação: caixa de água fria, caixa térmica em aço inox e coletores', 800, 426)}<figcaption><ol>${instalacao.map(p => `<li><b>${p.n}</b> ${p.t}</li>`).join('')}</ol><p>${obsInstalacao}</p></figcaption></figure>`;

function formContato(v) {
  return `<form class="form" id="orcamento" data-mailto="${E.email}" data-assunto="Pedido de orçamento pelo site">
  <div class="campos">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>Empresa ou condomínio<input name="Empresa" autocomplete="organization"></label>
    <label>Telefone<input name="Telefone" type="tel" required autocomplete="tel"></label>
    <label>E-mail<input name="E-mail" type="email" autocomplete="email"></label>
    <label>Cidade<input name="Cidade" autocomplete="address-level2"></label>
    <label>Interesse<select name="Interesse" data-produto>
      <option>Filtro central</option>${filtros.map(f => `<option>Filtro Central ${litros(f.vazao)} l/h</option>`).join('')}<option>Filtro acima de 10.000 l/h</option>
      <option>Aquecedor solar</option><option>Aquecimento de piscina</option><option>Troca do elemento filtrante</option><option>Outro assunto</option>
    </select></label>
    <label class="larga">Mensagem<textarea name="Mensagem" rows="4" placeholder="Ex.: número de pessoas, origem da água (rede, poço), local de instalação"></textarea></label>
  </div>
  <div class="form-acoes"><button class="btn" type="submit">${ic('mail')} Enviar por e-mail</button><a class="btn btn-sec" href="tel:${E.foneHref}">${ic('tel')} Ligar ${E.fone}</a></div>
</form>`;
}

const unidadesBloco = () => `<div class="unidades">${E.unidades.map(u => `<div class="unid"><p class="unid-tipo">${u.tipo}</p><h3>${u.cidade}</h3><p>${esc(u.end)}</p><a href="tel:${u.href}">${ic('tel')} ${u.fone}</a></div>`).join('')}</div>`;

// =========================================================
// VERSÃO A · Água pura
// =========================================================
function aHome() {
  const capa = `<section class="capa" data-slides>
  <div class="capa-slide on"><div class="in">
    <div class="capa-txt"><p class="eyebrow">Filtros Tecsol</p><h1>Nossa saúde em 1º lugar!</h1><p>O Filtro Central TECSOL ajuda a conservá-la: água pura e inodora para beber, cozinhar e para o uso geral da casa, do condomínio ou da empresa.</p>
      <div class="acoes"><a class="btn" href="${link('a', 'filtros')}">Conheça nossa linha completa ${ic('seta')}</a></div>
      <p class="selo-inmetro">${img('inmetro', 'Inmetro', 100, 100)} ${T.inmetro}</p></div>
    <div class="capa-prod">${fotoFiltro(filtros[0], ' class="f1"')}${fotoFiltro(filtros[2], ' class="f2"')}${img('filtro-banner', 'Filtro Central Tecsol de grande vazão', 328, 620, ' class="f3" fetchpriority="high" loading="eager"')}</div>
  </div></div>
  <div class="capa-slide capa-sol"><div class="in">
    <div class="capa-txt"><p class="eyebrow">Aquecedores Solar</p><h2 class="h1">Muita água quente com a energia do sol, que é de graça.</h2><p>Coletores em alumínio com vidro de 3 mm, serpentina de cobre e boiler em aço inox AISI-304. Para residências, hotéis, hospitais, indústrias e piscinas.</p>
      <div class="acoes"><a class="btn" href="${link('a', 'aquecedores')}">Conheça nossa linha completa ${ic('seta')}</a></div></div>
    <div class="capa-foto">${img('aquecedor1', 'Coletores solares Tecsol instalados sobre telhado para aquecimento de piscina', 1000, 480)}</div>
  </div></div>
  <div class="capa-pontos" data-slides-pontos></div>
</section>`;
  const economia = `<section class="sec economia"><div class="in">
  <div class="tit-centro"><h2>Na era atual, a economia é vital!</h2><span class="onda" aria-hidden="true"></span></div>
  <div class="eco-grade">
    <div class="eco-txt">${T.economia.map(p => `<p>${p}</p>`).join('')}</div>
    ${corteFiltro()}
  </div>
</div></section>`;
  const limpezaSec = `<section class="sec limpeza-sec"><div class="in">
  <div class="tit-esq"><p class="eyebrow">Limpeza semanal</p><h2>Inverte o fluxo e, em minutos, o filtro está limpo.</h2></div>
  ${passosLimpeza()}
</div></section>`;
  const linha = `<section class="sec linha-sec"><div class="in">
  <div class="tit-centro"><h2>Uma vazão para cada lugar</h2><span class="onda" aria-hidden="true"></span><p>Seis modelos em aço inoxidável, de 500 a 10.000 litros por hora. Sob encomenda até 50.000 l/h.</p></div>
  <div class="prateleira" data-rev-filhos data-rev-passo="90">${filtros.map(f => `<a href="${link('a', 'filtros')}#filtro-${f.slug}"><span class="pr-foto" style="--alt:${(48 + Math.log10(f.vazao / 500) * 32).toFixed(0)}%">${fotoFiltro(f)}</span><b>${litros(f.vazao)}</b><small>litros/hora</small></a>`).join('')}</div>
  <ul class="usos">${usosFiltro.map(u => `<li>${ic('check')} ${u}</li>`).join('')}</ul>
</div></section>`;
  const solar = `<section class="sec solar-sec"><div class="in">
  <div class="solar-txt"><p class="eyebrow">${ic('sol')} Aquecedores Solar</p><h2>Água quente o ano todo, com a energia que vem de graça.</h2>
    <dl class="numeros"><div><dt>80 °C</dt><dd>temperatura de funcionamento</dd></div><div><dt>6 kgf/cm²</dt><dd>pressão de teste do boiler</dd></div><div><dt>2,0 m²</dt><dd>de área coletora por placa</dd></div></dl>
    <a class="btn btn-claro" href="${link('a', 'aquecedores')}">Ver dados técnicos ${ic('seta')}</a></div>
  <div class="solar-fotos">${img('aquecedor-3', 'Campo de coletores solares Tecsol no topo de um prédio', 800, 600, ' class="sf1"')}${img('aquecedor-1', 'Reservatórios térmicos Tecsol instalados em cobertura', 600, 800, ' class="sf2"')}</div>
</div></section>`;
  const beba = `<section class="beba"><div class="in"><h2>Beba água filtrada!</h2><p>${T.beba}</p><a class="btn btn-claro" href="${link('a', 'contato')}">Entre em contato ${ic('seta')}</a></div></section>`;
  return pagina('a', 'index', 'Tecsol · Filtros Centrais e Aquecedores Solar em Piracicaba', 'Filtros centrais em aço inox de 500 a 50.000 l/h e aquecedores solares. Fábrica em Piracicaba e lojas em Limeira e Rio Claro.', capa + economia + limpezaSec + solar + linha + beba);
}

const aCapaInterna = (eyebrow, titulo, sub) => `<section class="capa-int"><div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

function aEmpresa() {
  const corpo = `${aCapaInterna('Empresa', 'A Tecsol', 'Sistemas de tratamento de água potável e aquecimento solar, fabricados em Piracicaba há mais de 25 anos.')}
<section class="sec"><div class="in emp-grade">
  <div class="emp-txt">${T.empresa.map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="emp-fachada">${img('frente1', 'Fachada da fábrica Tecsol', 1004, 600)}</figure>
</div></section>
<section class="sec estrutura"><div class="in">
  <div class="tit-centro"><h2>Estrutura</h2><span class="onda" aria-hidden="true"></span><p>Cada boiler e cada placa coletora passa pelas mãos da nossa equipe, na fábrica.</p></div>
  <div class="galeria" data-rev-filhos data-rev-passo="90">
    <figure class="g1">${img('empresa1', 'Soldagem do reservatório em aço inox', 800, 600)}<figcaption>Solda do reservatório em aço inox</figcaption></figure>
    <figure class="g2">${img('empresa2', 'Montagem de placa coletora em alumínio', 800, 600)}<figcaption>Montagem da placa coletora</figcaption></figure>
    <figure class="g3">${img('empresa3', 'Bancada de montagem na fábrica Tecsol', 800, 600)}<figcaption>Bancada de montagem</figcaption></figure>
    <figure class="g4">${img('empresa4', 'Equipe Tecsol trabalhando na fábrica', 800, 600)}<figcaption>Nossa equipe</figcaption></figure>
    <figure class="g5">${img('frente2', 'Entrada da fábrica Tecsol', 1004, 600)}<figcaption>Fábrica em Piracicaba</figcaption></figure>
  </div>
</div></section>
<section class="sec usos-sec"><div class="in"><h2>Recomendado para</h2><ul class="usos">${usosFiltro.map(u => `<li>${ic('check')} ${u}</li>`).join('')}</ul></div></section>`;
  return pagina('a', 'empresa', 'Empresa · Tecsol', 'A Tecsol fabrica filtros centrais em aço inox e aquecedores solares em Piracicaba (SP) há mais de 25 anos.', corpo);
}

function aFiltros() {
  const corpo = `${aCapaInterna('Filtros Centrais', 'Filtros Centrais Tecsol', 'Construídos inteiramente em aço inoxidável, com filtragem natural por carvão ativado e quartzo cristalino. A produção desses filtros segue normas internacionais.')}
<section class="sec"><div class="in">
  <div class="modelos">${filtros.map(f => `<article class="modelo" id="filtro-${f.slug}">
    <div class="mod-foto">${fotoFiltro(f)}</div>
    <div class="mod-txt"><h2>Filtro Central <span>${litros(f.vazao)} l/h</span></h2><p>Vazão de ${litros(f.vazao)} litros de água filtrada por hora. Corpo em aço inox, elemento filtrante de 5 camadas de quartzo cristalino e 1 de carvão ativado, válvula de duplo caminho para a limpeza.</p>
    <a class="btn btn-sec" href="${link('a', 'contato')}?produto=${encodeURIComponent(`Filtro Central ${litros(f.vazao)} l/h`)}#orcamento">Pedir orçamento</a></div>
  </article>`).join('')}</div>
  <p class="encomenda">Também estão disponíveis filtros de <b>${filtrosEncomenda.map(litros).join(' · ')}</b> litros por hora.</p>
</div></section>
<section class="sec economia"><div class="in eco-grade">
  <div class="eco-txt"><p class="eyebrow">Como funciona</p><h2>Filtragem natural, em seis camadas</h2><p>${T.beba}</p><p>${T.economia[2]}</p></div>
  ${corteFiltro()}
</div></section>
<section class="sec limpeza-sec"><div class="in"><div class="tit-esq"><p class="eyebrow">Limpeza semanal</p><h2>Abra a torneira, mude a alavanca e pronto.</h2></div>${passosLimpeza()}</div></section>
<section class="selo-faixa"><div class="in">${img('inmetro', 'Inmetro', 100, 100)}<p>${T.inmetro}</p></div></section>`;
  return pagina('a', 'filtros', 'Filtros Centrais em aço inox · Tecsol', 'Filtros centrais Tecsol de 500, 1.000, 2.000, 3.000, 5.000 e 10.000 l/h, e sob encomenda até 50.000 l/h.', corpo);
}

function aAquecedores() {
  const corpo = `<section class="capa-int capa-int-foto"><div class="in"><div><p class="eyebrow">Aquecedores Solar</p><h1>Muita água quente com a energia do sol</h1><p>Coletores, reservatório térmico e suporte fabricados pela Tecsol. Para residências, hospitais, indústrias, hotéis, motéis, camping e aquecimento de piscinas.</p></div>${img('aquecedor1', 'Coletores solares Tecsol para aquecimento de piscina', 1000, 480, ' loading="eager"')}</div></section>
<section class="sec"><div class="in aq-grade">
  ${tabelaAquecedor()}
  ${instalacaoBloco()}
</div></section>
<section class="sec partes-sec"><div class="in">
  <div class="tit-centro"><h2>Peça por peça</h2><span class="onda" aria-hidden="true"></span></div>
  <div class="partes">
    <div class="partes-lista">${partesAquecedor.map((p, i) => `<details${i < 2 ? ' open' : ''}><summary><span class="n">${String(i + 1).padStart(2, '0')}</span>${p.t}</summary><ul>${p.itens.map(x => `<li>${x}</li>`).join('')}</ul></details>`).join('')}</div>
    <div class="partes-fotos">${img('aquecedor-1', 'Reservatórios térmicos (boilers) Tecsol em cobertura', 600, 800)}<figure class="tubo">${img('tubo-cobre', 'Corte do elemento sensível: tubo de cobre envolvido por alumínio', 800, 314)}<figcaption>Tubo de cobre envolvido por alumínio</figcaption></figure></div>
  </div>
</div></section>
<section class="sec locais"><div class="in"><h2>Locais de aplicação</h2><ul class="usos">${locaisAquecedor.map(u => `<li>${ic('sol')} ${u}</li>`).join('')}</ul></div></section>
<section class="beba"><div class="in"><h2>Quer água quente sem pesar na conta de luz?</h2><p>Conte o tipo de imóvel e quantas pessoas usam a água. Nossa equipe dimensiona os coletores e o reservatório.</p><a class="btn btn-claro" href="${link('a', 'contato')}?produto=Aquecedor%20solar#orcamento">Pedir orçamento ${ic('seta')}</a></div></section>`;
  return pagina('a', 'aquecedores', 'Aquecedores Solar · Tecsol', 'Aquecedores solares Tecsol: coletores em alumínio com vidro de 3 mm, elemento em cobre e boiler em aço inox AISI-304.', corpo);
}

function aContato() {
  const corpo = `${aCapaInterna('Contato', 'Fale com a Tecsol', `${E.horario}. Responda pelo formulário, ligue ou passe em uma das nossas unidades.`)}
<section class="sec"><div class="in ct-grade">
  ${formContato('a')}
  <aside class="ct-info"><h2>Fábrica</h2><p>${E.endereco.join('<br>')}</p><p><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><br><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></p><a class="btn btn-sec" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Ver no mapa</a></aside>
</div></section>
<section class="sec unid-sec"><div class="in"><h2>Nossas unidades</h2>${unidadesBloco()}</div></section>`;
  return pagina('a', 'contato', 'Contato · Tecsol', 'Fale com a Tecsol: fábrica em Piracicaba e lojas em Limeira e Rio Claro.', corpo);
}

// =========================================================
// VERSÃO B · Fábrica
// =========================================================
function bHome() {
  const capa = `<section class="capa"><div class="capa-fundo">${img('empresa1', '', 800, 600, ' fetchpriority="high" loading="eager"')}</div><div class="in">
  <p class="eyebrow">Fabricante em Piracicaba (SP)</p>
  <h1>Água filtrada e água quente, feitas em aço inox.</h1>
  <p>Filtros centrais de 500 a 50.000 litros por hora e aquecedores solares completos, da placa coletora ao boiler. Há mais de 25 anos.</p>
  <div class="acoes"><a class="btn" href="#vazao">Escolher meu filtro ${ic('seta')}</a><a class="btn btn-linha" href="${link('b', 'aquecedores')}">Aquecedores solar</a></div>
</div></section>`;
  const duas = `<section class="duas"><a class="duas-it duas-filtro" href="${link('b', 'filtros')}"><div class="duas-txt"><p class="eyebrow">${ic('gota')} Filtros Centrais</p><h2>Água pura e inodora em toda a rede</h2><p>Carvão ativado e cinco camadas de quartzo cristalino, dentro de um corpo de aço inoxidável.</p><span class="mais">Ver os 6 modelos ${ic('seta')}</span></div>${img('filtro-banner', 'Filtro Central Tecsol', 328, 620)}</a>
  <a class="duas-it duas-sol" href="${link('b', 'aquecedores')}"><div class="duas-txt"><p class="eyebrow">${ic('sol')} Aquecedores Solar</p><h2>Banho quente com a energia que vem de graça</h2><p>Coletor em alumínio com vidro de 3 mm, serpentina de cobre e boiler inox AISI-304.</p><span class="mais">Ver dados técnicos ${ic('seta')}</span></div>${img('aquecedor-3', 'Coletores solares Tecsol', 800, 600)}</a></section>`;
  const vazao = `<section class="sec vazao" id="vazao"><div class="in">
  <div class="tit-esq"><p class="eyebrow">Escolha pela vazão</p><h2>Quanta água filtrada você precisa por hora?</h2><p>Arraste para ver o modelo. Na dúvida, a nossa equipe dimensiona pelo número de pessoas e pela origem da água.</p></div>
  <div class="vz" data-vazao>
    <div class="vz-palco">${filtros.map((f, i) => `<figure class="vz-f${i === 1 ? ' on' : ''}" data-i="${i}">${fotoFiltro(f)}</figure>`).join('')}</div>
    <div class="vz-ctrl">
      <output class="vz-num" aria-live="polite"><b data-vz-n>${litros(filtros[1].vazao)}</b> litros por hora</output>
      <input type="range" min="0" max="${filtros.length - 1}" step="1" value="1" aria-label="Vazão do filtro" data-vz-range>
      <div class="vz-marcas">${filtros.map(f => `<span>${f.vazao >= 1000 ? `${f.vazao / 1000}k` : f.vazao}</span>`).join('')}</div>
      <p class="vz-enc">Acima de 10.000 l/h: ${filtrosEncomenda.map(litros).join(', ')} l/h sob encomenda.</p>
      <a class="btn" data-vz-link href="${link('b', 'contato')}?produto=${encodeURIComponent(`Filtro Central ${litros(filtros[1].vazao)} l/h`)}#orcamento">Pedir orçamento deste modelo ${ic('seta')}</a>
    </div>
  </div>
</div></section>`;
  const fabrica = `<section class="sec fabrica"><div class="in">
  <div class="tit-esq claro"><p class="eyebrow">Da chapa ao telhado</p><h2>Tudo é feito aqui, na nossa fábrica.</h2></div>
  <div class="troca" data-troca>
    <div class="troca-midia"><figure class="on">${img('empresa1', 'Soldagem do reservatório em aço inox', 800, 600)}</figure><figure>${img('empresa2', 'Montagem da placa coletora', 800, 600)}</figure><figure>${img('empresa4', 'Equipe montando o elemento sensível', 800, 600)}</figure><figure>${img('aquecedor-1', 'Reservatórios instalados', 600, 800)}</figure></div>
    <ol class="troca-passos">
      <li class="troca-passo on"><span>01</span><h3>Reservatório em aço inox</h3><p>Boiler em aço inox AISI-304 de 1,00 mm, fundos boleados, soldado e testado com pressão de 6 kgf/cm².</p></li>
      <li class="troca-passo"><span>02</span><h3>Placa coletora monobloco</h3><p>Caixa toda em alumínio, vidro plano inteiro de 3 mm calafetado com borracha especial.</p></li>
      <li class="troca-passo"><span>03</span><h3>Elemento sensível em cobre</h3><p>8 tubos verticais de Ø 10 mm e dois receptores de Ø 22 mm, envolvidos por alumínio pintado de preto especial.</p></li>
      <li class="troca-passo"><span>04</span><h3>Instalado e funcionando</h3><p>Coletores, caixa térmica e suporte ajustável em cantoneira ASTM A-36, prontos para residências, hotéis, hospitais e indústrias.</p></li>
    </ol>
  </div>
</div></section>`;
  const numeros = `<section class="numeros-b"><div class="in">
  <div><b data-conta>25+</b><span>anos no mercado</span></div>
  <div><b data-conta>10.000</b><span>l/h no maior modelo de linha</span></div>
  <div><b data-conta>50.000</b><span>l/h sob encomenda</span></div>
  <div><b data-conta>3</b><span>unidades: Piracicaba, Limeira e Rio Claro</span></div>
</div></section>`;
  const como = `<section class="sec como-b"><div class="in como-grade">
  ${corteFiltro()}
  <div><p class="eyebrow">Como o filtro trabalha</p><h2>Filtragem natural, sem complicação</h2><p>${T.beba}</p>${passosLimpeza()}</div>
</div></section>`;
  const usos = `<section class="sec usos-b"><div class="in"><h2>Recomendado para</h2><ul class="usos">${usosFiltro.map(u => `<li>${u}</li>`).join('')}</ul></div></section>`;
  const cta = `<section class="cta-b"><div class="in"><div><h2>Fale com quem fabrica.</h2><p>${E.horario}. Fábrica em Piracicaba e lojas em Limeira e Rio Claro.</p></div><div class="acoes"><a class="btn btn-sol" href="${link('b', 'contato')}#orcamento">Pedir orçamento</a><a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div></div></section>`;
  return pagina('b', 'index', 'Tecsol · Fábrica de filtros centrais e aquecedores solar', 'Filtros centrais em aço inox de 500 a 50.000 l/h e aquecedores solares, fabricados em Piracicaba (SP).', capa + duas + vazao + fabrica + numeros + como + usos + cta);
}

const bCapaInterna = (eyebrow, titulo, sub, foto) => `<section class="capa-int">${foto ? `<div class="capa-fundo">${foto}</div>` : ''}<div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

function bEmpresa() {
  const corpo = `${bCapaInterna('Empresa', 'Há mais de 25 anos fabricando em Piracicaba', 'Tratamento de água potável e aquecimento solar para empresas, condomínios e residências.', img('frente1', '', 1004, 600, ' loading="eager"'))}
<section class="sec"><div class="in emp-b">
  <div class="emp-txt"><p class="lead">${T.empresa[0]}</p>${T.empresa.slice(1).map(p => `<p>${p}</p>`).join('')}</div>
  <ul class="emp-fatos"><li><b>Aço inox</b> no corpo dos filtros e no reservatório térmico</li><li><b>6 kgf/cm²</b> de pressão de teste nos boilers</li><li><b>6 camadas</b> no elemento filtrante: carvão ativado e quartzo cristalino</li></ul>
</div></section>
<section class="sec estrutura-b"><div class="in">
  <div class="tit-esq"><p class="eyebrow">Estrutura</p><h2>Fábrica, equipe e bancada</h2></div>
  <div class="mosaico" data-rev-filhos data-rev-passo="90">
    <figure class="m1">${img('empresa1', 'Soldagem do reservatório em aço inox', 800, 600)}</figure>
    <figure class="m2">${img('empresa2', 'Montagem de placa coletora', 800, 600)}</figure>
    <figure class="m3">${img('empresa3', 'Bancada de montagem', 800, 600)}</figure>
    <figure class="m4">${img('empresa4', 'Equipe Tecsol', 800, 600)}</figure>
    <figure class="m5">${img('frente2', 'Fábrica Tecsol em Piracicaba', 1004, 600)}</figure>
  </div>
</div></section>
<section class="cta-b"><div class="in"><div><h2>Visite a fábrica ou uma das lojas.</h2><p>${E.endereco.join(' · ')}</p></div><div class="acoes"><a class="btn btn-sol" href="${link('b', 'contato')}">Ver endereços</a></div></div></section>`;
  return pagina('b', 'empresa', 'Empresa · Tecsol', 'A Tecsol fabrica filtros centrais em aço inox e aquecedores solares em Piracicaba (SP) há mais de 25 anos.', corpo);
}

function bFiltros() {
  const corpo = `${bCapaInterna('Filtros Centrais', 'Seis vazões. O mesmo aço inox.', 'Filtragem natural por carvão ativado e quartzo cristalino, com válvula de duplo caminho que evita qualquer possibilidade de água poluída ir para o consumo.')}
<section class="sec"><div class="in">
  <div class="linha-b">${filtros.map(f => `<article class="lb" id="filtro-${f.slug}"><div class="lb-foto">${fotoFiltro(f)}</div><h2><b>${litros(f.vazao)}</b> l/h</h2><p>Filtro Central ${litros(f.vazao)} litros por hora</p><a href="${link('b', 'contato')}?produto=${encodeURIComponent(`Filtro Central ${litros(f.vazao)} l/h`)}#orcamento">Orçar ${ic('seta')}</a></article>`).join('')}</div>
  <div class="enc-b"><p><b>Sob encomenda</b></p><ul>${filtrosEncomenda.map(n => `<li>${litros(n)} l/h</li>`).join('')}</ul></div>
</div></section>
<section class="sec como-b"><div class="in como-grade">
  ${corteFiltro()}
  <div><p class="eyebrow">Elemento filtrante</p><h2>1 camada de carvão, 5 de quartzo</h2><p>${T.economia[2]}</p>${passosLimpeza()}</div>
</div></section>
<section class="sec usos-b"><div class="in"><h2>Recomendado para</h2><ul class="usos">${usosFiltro.map(u => `<li>${u}</li>`).join('')}</ul><p class="inm">${img('inmetro', 'Inmetro', 100, 100)} ${T.inmetro}</p></div></section>`;
  return pagina('b', 'filtros', 'Filtros Centrais em aço inox · Tecsol', 'Filtros centrais Tecsol de 500 a 10.000 l/h e sob encomenda até 50.000 l/h.', corpo);
}

function bAquecedores() {
  const corpo = `${bCapaInterna('Aquecedores Solar', 'Do coletor ao boiler, tudo Tecsol.', 'Muita água quente com a energia do sol, que é de graça. Para residências, hospitais, indústrias, hotéis, motéis, camping e piscinas.', img('aquecedor-3', '', 800, 600, ' loading="eager"'))}
<section class="sec"><div class="in aq-b">
  <div><p class="eyebrow">Dados técnicos</p><h2>O coletor em números</h2>${tabelaAquecedor()}</div>
  <div class="aq-fotos">${img('aquecedor1', 'Coletores para aquecimento de piscina sobre telhado', 1000, 480)}${img('aquecedor-1', 'Reservatórios térmicos Tecsol', 600, 800)}</div>
</div></section>
<section class="sec partes-b"><div class="in">
  <div class="tit-esq claro"><p class="eyebrow">Componentes</p><h2>Seis partes, uma fábrica</h2></div>
  <ol class="pb">${partesAquecedor.map((p, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><h3>${p.t}</h3><ul>${p.itens.map(x => `<li>${x}</li>`).join('')}</ul></li>`).join('')}</ol>
</div></section>
<section class="sec"><div class="in inst-b"><div class="tit-esq"><p class="eyebrow">Instalação</p><h2>Posições relativas</h2></div>${instalacaoBloco()}</div></section>
<section class="cta-b"><div class="in"><div><h2>Dimensione o seu aquecedor.</h2><p>Diga o tipo de imóvel e quantas pessoas usam a água quente.</p></div><div class="acoes"><a class="btn btn-sol" href="${link('b', 'contato')}?produto=Aquecedor%20solar#orcamento">Pedir orçamento</a></div></div></section>`;
  return pagina('b', 'aquecedores', 'Aquecedores Solar · Tecsol', 'Aquecedores solares Tecsol: placa coletora Master, Top Line para piscina, elemento em cobre e boiler inox AISI-304.', corpo);
}

function bContato() {
  const corpo = `${bCapaInterna('Contato', 'Pedir orçamento', `${E.horario}. Quanto mais detalhes, mais rápido a resposta.`)}
<section class="sec"><div class="in ct-grade">
  ${formContato('b')}
  <aside class="ct-info"><h2>Direto com a fábrica</h2><p><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><br><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></p><p>${E.endereco.join('<br>')}</p><a class="btn btn-sec" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Ver no mapa</a></aside>
</div></section>
<section class="sec unid-sec"><div class="in"><h2>Unidades</h2>${unidadesBloco()}</div></section>`;
  return pagina('b', 'contato', 'Contato · Tecsol', 'Fale com a Tecsol: fábrica em Piracicaba e lojas em Limeira e Rio Claro.', corpo);
}

export function gerarVersao(v) {
  return v === 'a'
    ? { index: aHome(), 'empresa': aEmpresa(), 'filtros-centrais': aFiltros(), 'aquecedores-solar': aAquecedores(), 'contato': aContato() }
    : { index: bHome(), 'empresa': bEmpresa(), 'filtros-centrais': bFiltros(), 'aquecedores-solar': bAquecedores(), 'contato': bContato() };
}
