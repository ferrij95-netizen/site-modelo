// Monta as páginas das versões A ("Faixa", fiel ao site atual: topo vermelho, logo oval, faixa amarela em arco com o menu,
// fotos dos "doces momentos" e as três chamadas da home) e B ("Lata", mais moderna, puxada pelo amarelo da lata e pela história desde 1907).
// As páginas internas usam o mesmo conteúdo; topo, rodapé e home mudam por versão. Estilos em public/assets/{base,a,b}.css.
import {
  empresa as E, telHref, empresaTexto as ET, cocadaTexto as CT, linhaTempo, numeros, produto, receitas, clientes, estados, momentos,
} from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, cls = '', extra = '') => `<img class="${cls}" src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;

export const nomesVersao = { a: 'Faixa', b: 'Lata' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'cocada-bahiana', nome: 'A Cocada Bahiana', caminho: 'cocada-bahiana/' },
  { slug: 'receitas', nome: 'Receitas', caminho: 'receitas/' },
  { slug: 'clientes', nome: 'Clientes', caminho: 'clientes/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];
const link = (v, slug) => `/${v}/${nav.find(n => n.slug === slug).caminho}`;
const linkReceita = (v, r) => `/${v}/receitas/${r.slug}/`;

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v2H8v4h2v7h4v-7h3l1-4h-4V8z"/>',
  tw: '<path d="M4 4l16 16M20 4L4 20"/>',
  fabrica: '<path d="M3 21V10l6 4V10l6 4V5h6v16z"/><path d="M7 17h2M12 17h2M17 17h2"/>',
  caminhao: '<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  loja: '<path d="M4 10v10h16V10"/><path d="M3 10l2-6h14l2 6zM9 20v-5h6v5"/>',
  colher: '<path d="M7 3c2.5 0 4 2.2 4 4.5S9.5 12 7 12 3 9.8 3 7.5 4.5 3 7 3zM7 12v9"/><path d="M15 3v6a2 2 0 002 2h0a2 2 0 002-2V3M17 11v10"/>',
  folha: '<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15"/><path d="M5 19l7-7"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(E.mapa)}`;

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
<meta property="og:site_name" content="Quysanta Alimentos">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#c41400' : '#fac83b'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
`;
}

const itensMenu = (v, slug) => nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('');

function topo(v, slug) {
  if (v === 'a') {
    // Versão A: o topo do site atual, redesenhado em vetor: fundo vermelho com brilho, logo oval e a faixa amarela em arco com o menu.
    return `<header class="topo-a${slug === 'index' ? ' topo-home' : ''}">
  <div class="topo-brilho" aria-hidden="true"></div>
  <a class="marca" href="/a/" aria-label="Quysanta Alimentos, página inicial"><img src="/assets/logo.svg" alt="Quysanta Alimentos" width="1188" height="528"></a>
  <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  <div class="arco">
    <svg class="arco-faixa" viewBox="0 0 1200 170" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="fx" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3f466"/><stop offset=".55" stop-color="#e3e331"/><stop offset="1" stop-color="#c9c51f"/></linearGradient></defs>
      <path d="M0 170 C 120 40 420 0 600 0 C 780 0 1080 40 1200 170 L 1200 170 C 1060 92 800 66 600 66 C 400 66 140 92 0 170 Z" fill="#b8a420" transform="translate(0 6)"/>
      <path d="M0 170 C 120 40 420 0 600 0 C 780 0 1080 40 1200 170 C 1060 92 800 66 600 66 C 400 66 140 92 0 170 Z" fill="url(#fx)"/>
    </svg>
    <nav id="menu" aria-label="Principal"><ul>${itensMenu(v, slug)}</ul></nav>
  </div>
</header>
<main id="conteudo">
`;
  }
  return `<div class="barra"><div class="in">
  <span>Montes Claros · Norte de Minas · Cocada Bahiana desde 1907</span>
  <span class="barra-dir"><a href="tel:${telHref(E.telefones[0])}">${ic('tel')}${E.telefones[0]}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span>
</div></div>
<header class="topo-b"><div class="in">
  <a class="marca" href="/b/" aria-label="Quysanta Alimentos, página inicial"><img src="/assets/logo-faixa.svg" alt="Quysanta Alimentos" width="1080" height="360"></a>
  <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  <nav id="menu" aria-label="Principal"><ul>${itensMenu(v, slug)}</ul></nav>
</div></header>
<main id="conteudo">
`;
}

function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca">
      <img src="/assets/${v === 'a' ? 'logo' : 'logo-faixa'}.svg" alt="Quysanta Alimentos" class="rod-logo" width="1188" height="528">
      <p>${E.razao}<br>Fabricante da Cocada Bahiana, doce de coco cremoso.</p>
    </div>
    <div>
      <h3>Fábrica</h3>
      <p><a href="${mapa}" target="_blank" rel="noopener">${E.endereco}<br>${E.bairro} · CEP ${E.cep}<br>${E.cidade}</a></p>
    </div>
    <div>
      <h3>Fale com a gente</h3>
      <p>${E.telefones.map(t => `<a href="tel:${telHref(t)}">${t}</a>`).join('<br>')}<br><a href="mailto:${E.email}">${E.email}</a></p>
      <p class="rod-redes"><a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('fb')}</a><a href="${E.twitter}" target="_blank" rel="noopener" aria-label="X (Twitter)">${ic('tw')}</a></p>
    </div>
    <div>
      <h3>Navegue</h3>
      <ul class="rod-lista">${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul>
    </div>
  </div>
  <div class="in rod-base"><span>© ${new Date().getFullYear()} Quysanta Alimentos · ${E.razao}</span><span>${E.slogan}</span></div>
</footer>
<script src="/assets/site.js" defer></script>
</body>
</html>`;
}

const pagina = (v, slug, caminho, titulo, desc, corpo) => head(v, caminho, titulo, desc) + topo(v, slug) + corpo + rodape(v);

// Topo das páginas internas
const capa = (v, eyebrow, titulo, sub) => `<section class="capa"><div class="in">
  <p class="eyebrow">${eyebrow}</p>
  <h1>${titulo}</h1>
  ${sub ? `<p class="lead">${sub}</p>` : ''}
</div></section>`;

// ---------- blocos ----------
const blocoMomentos = () => `<div class="momentos" aria-label="${esc(E.slogan)}">
  <div class="momentos-fotos">${momentos.map((m, i) => img(`momento-${i + 1}`, m, '', ' width="240" height="300"')).join('')}</div>
  <img class="momentos-frase" src="/assets/img/frase-momentos.webp" alt="${esc(E.slogan)}" width="1040" height="104">
</div>`;

const blocoNumeros = () => `<dl class="numeros">${numeros.map(n => `<div><dt>${n.valor}</dt><dd>${n.rotulo}</dd></div>`).join('')}</dl>`;

const blocoLinhaTempo = () => `<ol class="linha-tempo">${linhaTempo.map(h => `<li><span class="lt-ano">${h.ano}</span><h3>${h.titulo}</h3><p>${h.texto}</p></li>`).join('')}</ol>`;

const blocoClientes = (cls = '') => `<ul class="logos ${cls}">${clientes.map(c => `<li><img src="/assets/clientes/${c.img}.webp" alt="${esc(c.nome)}" width="180" height="114" loading="lazy"></li>`).join('')}</ul>`;

const cartaoReceita = (v, r, cls = '') => `<a class="receita ${cls}" href="${linkReceita(v, r)}">
  <span class="receita-foto">${img(r.foto, r.nome, '', ' width="400" height="276"')}</span>
  <span class="receita-txt"><strong>${r.nome}</strong><span>${r.resumo}</span><em>${ic('relogio')}${r.tempo}</em></span>
</a>`;

const blocoMissao = () => `<div class="mvv">
  <div class="mvv-item"><h3>Missão</h3><p>${ET.missao}</p></div>
  <div class="mvv-item"><h3>Visão</h3><p>${ET.visao}</p></div>
  <div class="mvv-item"><h3>Valores</h3><p>${ET.valores}</p></div>
</div>`;

const blocoContatoFaixa = v => `<section class="faixa-contato"><div class="in fc-grade">
  <div>
    <h2>Quer a Cocada Bahiana na sua loja?</h2>
    <p>Distribuidores, atacadistas e supermercados: fale com a equipe de atendimento da Quysanta.</p>
  </div>
  <div class="botoes"><a class="btn btn-prim" href="tel:${telHref(E.telefones[0])}">${ic('tel')}${E.telefones[0]}</a><a class="btn btn-sec" href="${link(v, 'contato')}?assunto=revenda">Pedir contato ${ic('seta')}</a></div>
</div></section>`;

// ---------- home A ----------
function homeA() {
  return `${blocoMomentos()}
<section class="sec tres"><div class="in tres-grade">
  <article class="porta">
    <a class="porta-foto" href="${link('a', 'empresa')}">${img('fabrica-fachada', 'Fachada da fábrica da Quysanta no Distrito Industrial de Montes Claros', '', ' width="872" height="570"')}</a>
    <h2><a href="${link('a', 'empresa')}">Empresa</a></h2>
    <p class="porta-chamada">Conheça mais sobre a história da Quysanta Alimentos.</p>
    <p>${ET.quemSomos[0]}</p>
    <a class="link-seta" href="${link('a', 'empresa')}">Ler mais ${ic('seta')}</a>
  </article>
  <article class="porta porta-lata">
    <a class="porta-foto" href="${link('a', 'cocada-bahiana')}">${img('lata', 'Lata de Cocada Bahiana, doce de coco cremoso, 800 g', '', ' width="696" height="860"')}</a>
    <h2><a href="${link('a', 'cocada-bahiana')}">A Cocada Bahiana</a></h2>
    <p class="porta-chamada">Saiba mais sobre este incrível doce tão tradicional em nosso país.</p>
    <p>Um dos doces mais saborosos e tradicionais do Brasil, com uma história que começa em 1907 em Belo Horizonte.</p>
    <a class="link-seta" href="${link('a', 'cocada-bahiana')}">Ler mais ${ic('seta')}</a>
  </article>
  <article class="porta">
    <a class="porta-foto" href="${link('a', 'receitas')}">${img('cozinheira', 'Cozinheira preparando uma receita', '', ' width="288" height="372"')}</a>
    <h2><a href="${link('a', 'receitas')}">Receitas</a></h2>
    <p class="porta-chamada">Aprenda várias receitas de dar água na boca e adoce a sua vida.</p>
    <ul class="porta-lista">${receitas.map(r => `<li><a href="${linkReceita('a', r)}">${r.nome}</a></li>`).join('')}</ul>
    <a class="link-seta" href="${link('a', 'receitas')}">Conferir ${ic('seta')}</a>
  </article>
</div></section>
<section class="sec faixa-amarela"><div class="in fa-grade">
  <div class="fa-txt">
    <p class="eyebrow">Tradição centenária</p>
    <h2>Desde 1907 adoçando as famílias brasileiras</h2>
    <p>${CT.novaEra}</p>
    <a class="btn btn-verm" href="${link('a', 'cocada-bahiana')}">A história da Cocada ${ic('seta')}</a>
  </div>
  ${blocoNumeros()}
</div></section>
<section class="sec receitas-home"><div class="in">
  <div class="sec-cab"><h2>Receitas com Cocada Bahiana</h2><a class="link-seta" href="${link('a', 'receitas')}">Ver todas ${ic('seta')}</a></div>
  <div class="receitas-grade">${receitas.map(r => cartaoReceita('a', r)).join('')}</div>
</div></section>
<section class="sec clientes-home"><div class="in">
  <div class="sec-cab"><h2>Quem vende a Cocada Bahiana</h2><a class="link-seta" href="${link('a', 'clientes')}">Nossos clientes ${ic('seta')}</a></div>
  ${blocoClientes()}
</div></section>
<section class="sec redes"><div class="in redes-grade">
  <div><h2>Redes sociais</h2><p>Nos acompanhe pelas redes sociais.</p></div>
  <div class="redes-botoes"><a class="btn btn-azul" href="${E.facebook}" target="_blank" rel="noopener">${ic('fb')}Facebook</a><a class="btn btn-preto" href="${E.twitter}" target="_blank" rel="noopener">${ic('tw')}Twitter</a></div>
</div></section>
${blocoContatoFaixa('a')}`;
}

// ---------- home B ----------
function homeB() {
  const [r1, ...rs] = receitas;
  return `<section class="heroi"><div class="in heroi-grade">
  <div class="heroi-txt">
    <p class="eyebrow">${produto.tipo} · Montes Claros, MG</p>
    <h1>A Cocada Bahiana que adoça o Brasil desde 1907</h1>
    <p class="lead">Fabricada pela Quysanta Alimentos no Distrito Industrial de Montes Claros, com qualidade, preço e praticidade em um único produto.</p>
    <div class="botoes"><a class="btn btn-verm" href="${link('b', 'cocada-bahiana')}">Conheça a Cocada ${ic('seta')}</a><a class="btn btn-linha" href="${link('b', 'receitas')}">Ver receitas</a></div>
  </div>
  <div class="heroi-palco">
    <span class="heroi-disco" aria-hidden="true"></span>
    ${img('coco', 'Coco aberto ao meio', 'heroi-coco', ' width="1400" height="1050"')}
    <img class="heroi-lata" src="/assets/img/lata.webp" alt="Lata de Cocada Bahiana, doce de coco cremoso, peso líquido 800 g" width="696" height="860" fetchpriority="high">
    <span class="heroi-selo"><b>${produto.peso}</b>peso líquido</span>
  </div>
</div></section>
<section class="sec historia"><div class="in">
  <div class="sec-cab"><div><p class="eyebrow">Tradição centenária</p><h2>Uma receita que atravessou o século</h2></div><a class="link-seta" href="${link('b', 'cocada-bahiana')}">A história completa ${ic('seta')}</a></div>
  ${blocoLinhaTempo()}
</div></section>
<section class="sec numeros-faixa"><div class="in">${blocoNumeros()}</div></section>
<section class="sec caminho"><div class="in">
  <div class="sec-cab"><div><p class="eyebrow">Da fábrica à sua mesa</p><h2>O caminho da lata</h2></div></div>
  <ol class="etapas">
    <li class="etapa">${img('fabrica-fachada', 'Fábrica da Quysanta em Montes Claros', '', ' width="872" height="570"')}<span class="etapa-n">01</span><h3>${ic('fabrica')}Fábrica em Montes Claros</h3><p>Galpão de 4.800 m² no Distrito Industrial, Norte de Minas.</p></li>
    <li class="etapa">${img('fabrica-producao', 'Linha de produção e envase da Cocada Bahiana', '', ' width="872" height="570"')}<span class="etapa-n">02</span><h3>${ic('colher')}Linha automatizada</h3><p>Mais de 20 colaboradores diretos numa linha de alta automatização.</p></li>
    <li class="etapa">${img('fabrica-caminhao', 'Caminhão na área de carga da fábrica', '', ' width="872" height="570"')}<span class="etapa-n">03</span><h3>${ic('caminhao')}Parceiros no Brasil todo</h3><p>Fornecedores e parceiros em todo o território nacional.</p></li>
    <li class="etapa etapa-logos"><div class="etapa-logos-grade">${clientes.slice(0, 4).map(c => `<img src="/assets/clientes/${c.img}.webp" alt="${esc(c.nome)}" width="180" height="114" loading="lazy">`).join('')}</div><span class="etapa-n">04</span><h3>${ic('loja')}Distribuidores e mercados</h3><p>Atacadistas e supermercados levam a lata até a sua cozinha.</p></li>
  </ol>
</div></section>
<section class="sec receitas-b"><div class="in">
  <div class="sec-cab"><div><p class="eyebrow">Na cozinha</p><h2>Receitas para adoçar a vida</h2></div><a class="link-seta" href="${link('b', 'receitas')}">Todas as receitas ${ic('seta')}</a></div>
  <div class="receitas-mosaico">${cartaoReceita('b', r1, 'receita-grande')}<div class="receitas-lista">${rs.map(r => cartaoReceita('b', r, 'receita-linha')).join('')}</div></div>
</div></section>
<section class="sec missao-b"><div class="in mb-grade">
  ${img('fabrica-caminhao', 'Área de carga da fábrica da Quysanta', 'mb-foto', ' width="872" height="570"')}
  <div><p class="eyebrow">Quem somos</p><h2>Família, honestidade e fé no trabalho</h2><p>${ET.valores}</p><p>${ET.missao}</p><a class="link-seta" href="${link('b', 'empresa')}">Conheça a empresa ${ic('seta')}</a></div>
</div></section>
<section class="sec clientes-b"><div class="in"><h2 class="centro">Presente nas prateleiras de grandes redes</h2>${blocoClientes('logos-faixa')}</div></section>
${blocoContatoFaixa('b')}`;
}

// ---------- internas ----------
function empresaPag(v) {
  return pagina(v, 'empresa', 'empresa/', 'Empresa · Quysanta Alimentos', 'Fundada em 2000 em Montes Claros (MG), a Quysanta Alimentos produz a Cocada Bahiana num galpão de 4.800 m² com linha de alta automatização.', `
${capa(v, 'Nossa empresa', 'Quem somos', 'Uma indústria de doces mineira, no Distrito Industrial de Montes Claros, Norte de Minas.')}
<section class="sec"><div class="in emp-grade">
  <div class="emp-txt">${ET.quemSomos.map(p => `<p>${p}</p>`).join('')}</div>
  <div class="emp-fotos">
    ${img('fabrica-fachada', 'Fachada da fábrica da Quysanta', 'ef-1', ' width="872" height="570"')}
    ${img('fabrica-producao', 'Equipe na linha de produção', 'ef-2', ' width="872" height="570"')}
    ${img('fabrica-caminhao', 'Caminhão e caixa-d\'água com o logo da Quysanta', 'ef-3', ' width="872" height="570"')}
  </div>
</div></section>
<section class="sec sec-cor"><div class="in">${blocoNumeros()}</div></section>
<section class="sec"><div class="in">${blocoMissao()}</div></section>
<section class="sec sustentavel"><div class="in sus-grade">
  ${ic('folha', 'ic-grande')}
  <div><h2>Desenvolvimento sustentável</h2><p>${ET.sustentavel}</p></div>
</div></section>
${blocoContatoFaixa(v)}`);
}

function cocadaPag(v) {
  return pagina(v, 'cocada-bahiana', 'cocada-bahiana/', 'A Cocada Bahiana · Quysanta Alimentos', 'Cocada Bahiana, doce de coco cremoso em lata de 800 g, com tradição centenária: nasceu em 1907 em Belo Horizonte e é produzida pela Quysanta desde 2000.', `
${capa(v, 'A tradicional Cocada Bahiana', 'Um doce com tradição centenária', 'Doce de coco cremoso, na lata de 800 g que as famílias brasileiras conhecem.')}
<section class="sec"><div class="in prod-grade">
  <div class="prod-palco">${img('lata', 'Lata de Cocada Bahiana, doce de coco cremoso, peso líquido 800 g', 'prod-lata', ' width="696" height="860"')}</div>
  <div class="prod-txt">
    <p>${CT.abertura}</p>
    <dl class="ficha">
      <div><dt>Produto</dt><dd>${produto.marca}</dd></div>
      <div><dt>Tipo</dt><dd>${produto.tipo}</dd></div>
      <div><dt>Embalagem</dt><dd>Lata, peso líquido ${produto.peso}</dd></div>
      <div><dt>Fabricação</dt><dd>${E.cidade}</dd></div>
    </dl>
  </div>
</div></section>
<section class="sec sec-cor historia"><div class="in">
  <h2>De Belo Horizonte para o Brasil</h2>
  ${blocoLinhaTempo()}
</div></section>
<section class="sec"><div class="in hist-grade">
  ${img('doce-cremoso', 'Doce de coco cremoso servido numa tigela', 'hist-foto', ' width="1200" height="1200"')}
  <div class="hist-txt">
    <h2>Uma nova era, genuinamente brasileira</h2>
    <p>${CT.multinacional}</p>
    <p>${CT.novaEra}</p>
    <p>Localizada no distrito industrial de Montes Claros, Norte de Minas, a Quysanta Alimentos contribui intensamente para o desenvolvimento e crescimento de sua região, orgulhando-se desse feito.</p>
    <p>${CT.hoje}</p>
    <a class="btn btn-verm" href="${link(v, 'receitas')}">Receitas com Cocada Bahiana ${ic('seta')}</a>
  </div>
</div></section>
<section class="sec"><div class="in">${blocoMissao()}</div></section>
${blocoContatoFaixa(v)}`);
}

function receitasPag(v) {
  return pagina(v, 'receitas', 'receitas/', 'Receitas · Quysanta Alimentos', 'Receitas de dar água na boca com Cocada Bahiana: surpresa de biscoito, pão doce Romeu e Julieta, barrinhas crocantes e rapadura de coco.', `
${capa(v, 'Receitas', 'Adoce a sua vida', 'Aqui você vai aprender sempre uma deliciosa receita usando os doces Quysanta.')}
<section class="sec"><div class="in">
  <div class="receitas-grade receitas-pag">${receitas.map(r => cartaoReceita(v, r)).join('')}</div>
</div></section>
<section class="sec sec-cor"><div class="in dica-grade">
  ${img('coco-ralado', 'Coco ralado sobre a tábua', 'dica-foto', ' width="1200" height="1747"')}
  <div><p class="eyebrow">Dica da casa</p><h2>Sem coco fresco em casa?</h2><p>Na rapadura de coco, uma lata de Cocada Bahiana substitui o coco pequeno ralado. Nas outras receitas ela entra como complemento: dá mais sabor de coco, mas a receita funciona mesmo sem ela.</p><a class="link-seta" href="${linkReceita(v, receitas[3])}">Ver a rapadura de coco ${ic('seta')}</a></div>
</div></section>`);
}

function receitaPag(v, r) {
  const outras = receitas.filter(x => x !== r);
  return pagina(v, 'receitas', `receitas/${r.slug}/`, `${r.nome} · Receitas Quysanta`, `${r.nome}: ${r.resumo} Receita com Cocada Bahiana.`, `
<section class="capa capa-receita"><div class="in">
  <p class="eyebrow"><a href="${link(v, 'receitas')}">Receitas</a></p>
  <h1>${r.nome}</h1>
  <p class="lead">${r.resumo}</p>
</div></section>
<section class="sec"><div class="in rec-grade">
  <aside class="rec-lado">
    ${img(r.foto, r.nome, 'rec-foto', ' width="400" height="276"')}
    <p class="rec-tempo">${ic('relogio')}${r.tempo}</p>
    ${r.grupos.map(g => `<h2>${g.titulo}</h2><ul class="ingredientes">${g.itens.map(i => `<li><label><input type="checkbox"> <span>${i}</span></label></li>`).join('')}</ul>`).join('')}
  </aside>
  <div class="rec-preparo">
    <h2>Modo de preparo</h2>
    <ol class="passos">${r.preparo.map(p => `<li>${p}</li>`).join('')}</ol>
  </div>
</div></section>
<section class="sec sec-suave"><div class="in">
  <div class="sec-cab"><h2>Outras receitas</h2><a class="link-seta" href="${link(v, 'receitas')}">Todas ${ic('seta')}</a></div>
  <div class="receitas-grade tres-col">${outras.map(x => cartaoReceita(v, x)).join('')}</div>
</div></section>`);
}

function clientesPag(v) {
  return pagina(v, 'clientes', 'clientes/', 'Clientes · Quysanta Alimentos', 'Distribuidores, atacadistas e supermercados que levam a Cocada Bahiana da Quysanta às famílias brasileiras.', `
${capa(v, 'Clientes', 'Quem leva a Cocada até você', 'Conheça alguns dos nossos principais clientes.')}
<section class="sec"><div class="in">${blocoClientes('logos-grade')}</div></section>
<section class="sec sec-cor"><div class="in parc-grade">
  <div><h2>Seja um parceiro Quysanta</h2><p>Contamos com fornecedores e parceiros em todo o território nacional. Se você é distribuidor, atacadista ou supermercado e quer ter a Cocada Bahiana nas suas prateleiras, fale com a nossa equipe de atendimento.</p></div>
  <div class="botoes"><a class="btn btn-verm" href="${link(v, 'contato')}?assunto=revenda">Quero revender ${ic('seta')}</a><a class="btn btn-linha" href="tel:${telHref(E.telefones[0])}">${ic('tel')}${E.telefones[0]}</a></div>
</div></section>`);
}

function contatoPag(v) {
  return pagina(v, 'contato', 'contato/', 'Contato · Quysanta Alimentos', 'Fale com a Quysanta Alimentos: (38) 3224-4489, contato@quysantaalimentos.com.br, Distrito Industrial de Montes Claros (MG).', `
${capa(v, 'Contato', 'Fale com a Quysanta', 'Preencha o formulário que logo nossa equipe de atendimento entrará em contato com você.')}
<section class="sec"><div class="in contato-grade">
  <form class="form" id="form-contato" action="mailto:${E.email}" method="post" enctype="text/plain" data-email="${E.email}">
    <div class="campo"><label for="f-nome">Nome</label><input id="f-nome" name="nome" required autocomplete="name"></div>
    <div class="campo-duplo">
      <div class="campo"><label for="f-email">E-mail</label><input id="f-email" name="email" type="email" required autocomplete="email"></div>
      <div class="campo"><label for="f-tel">Telefone</label><input id="f-tel" name="telefone" type="tel" autocomplete="tel"></div>
    </div>
    <div class="campo-duplo">
      <div class="campo"><label for="f-cidade">Cidade</label><input id="f-cidade" name="cidade" autocomplete="address-level2"></div>
      <div class="campo"><label for="f-estado">Estado</label><select id="f-estado" name="estado"><option value="">Selecione</option>${estados.map(e => `<option>${e}</option>`).join('')}</select></div>
    </div>
    <div class="campo"><label for="f-assunto">Assunto</label><select id="f-assunto" name="assunto"><option value="contato">Dúvida ou sugestão</option><option value="revenda">Quero revender a Cocada Bahiana</option><option value="fornecedor">Sou fornecedor</option><option value="trabalhe">Trabalhe conosco</option></select></div>
    <div class="campo"><label for="f-msg">Recado</label><textarea id="f-msg" name="mensagem" rows="5" required placeholder="Digite aqui o seu recado"></textarea></div>
    <button class="btn btn-verm" type="submit">Enviar recado ${ic('seta')}</button>
  </form>
  <div class="contato-lado">
    <div class="cl-item">${ic('tel')}<div><h3>Telefones</h3><p>${E.telefones.map(t => `<a href="tel:${telHref(t)}">${t}</a>`).join('<br>')}</p></div></div>
    <div class="cl-item">${ic('mail')}<div><h3>E-mail</h3><p><a href="mailto:${E.email}">${E.email}</a></p></div></div>
    <div class="cl-item">${ic('pin')}<div><h3>Fábrica</h3><p>${E.endereco}<br>${E.bairro} · CEP ${E.cep}<br>${E.cidade}</p><a class="link-seta" href="${mapa}" target="_blank" rel="noopener">Ver no mapa ${ic('seta')}</a></div></div>
    <div class="cl-redes"><a href="${E.facebook}" target="_blank" rel="noopener">${ic('fb')}Facebook</a><a href="${E.twitter}" target="_blank" rel="noopener">${ic('tw')}Twitter</a></div>
  </div>
</div></section>`);
}

export function gerarVersao(v) {
  const home = pagina(v, 'index', '', v === 'a' ? 'Quysanta Alimentos · Aproveite os doces momentos da vida' : 'Quysanta Alimentos · Cocada Bahiana desde 1907',
    'Quysanta Alimentos, de Montes Claros (MG), fabricante da Cocada Bahiana, doce de coco cremoso com tradição centenária. Empresa, receitas, clientes e contato.',
    v === 'a' ? homeA() : homeB());
  const p = {
    index: home, empresa: empresaPag(v), 'cocada-bahiana': cocadaPag(v), receitas: receitasPag(v), clientes: clientesPag(v), contato: contatoPag(v),
  };
  for (const r of receitas) p[`receitas/${r.slug}`] = receitaPag(v, r);
  return p;
}
