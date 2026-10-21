// Monta as páginas das versões A ("Estrutura", clara e técnica) e B ("Canteiro", guiada pelas fotos das obras).
// As páginas internas usam o mesmo conteúdo; o topo, a capa e a home mudam por versão. Estilos em public/assets/{base,a,b}.css.
import { empresa as E, sobre, fabricamos, etapas, segmentos, obras, vantagens, parceiros, noticias, clientes } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const obrasDe = seg => obras.filter(o => o.seg === seg);
const capaObra = o => `${o.slug}-1`;
const capaSeg = s => s.capa || capaObra(obrasDe(s.slug)[0]);
const segNome = slug => segmentos.find(s => s.slug === slug).nome;
const dataBR = d => d.split('-').reverse().join('/');

export const nomesVersao = { a: 'Estrutura', b: 'Canteiro' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'A Emmig', caminho: 'empresa/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/', filhos: [
    ...segmentos.map(s => ({ slug: `servicos/${s.slug}`, nome: s.nome, caminho: `servicos/${s.slug}/` })),
    { slug: 'construcao-em-aco', nome: 'Construção em aço', caminho: 'construcao-em-aco/' },
  ] },
  { slug: 'parceiros', nome: 'Parceiros', caminho: 'parceiros/' },
  { slug: 'noticias', nome: 'Notícias', caminho: 'noticias/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  baixo: '<path d="M6 9l6 6 6-6"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  fechar: '<path d="M6 6l12 12M18 6L6 18"/>',
  esq: '<path d="M15 6l-6 6 6 6"/>',
  dir: '<path d="M9 6l6 6-6 6"/>',
};
const icone = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
// Perfil I (viga) desenhado, usado como marcador e divisor nas duas versões.
const viga = (cls = 'viga') => `<svg class="${cls}" viewBox="0 0 40 40" aria-hidden="true"><path d="M6 6h28v6H23v16h11v6H6v-6h11V12H6z" fill="currentColor"/></svg>`;

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
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,500..900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

function menu(v, atual) {
  const ativo = slug => slug === atual || (slug === 'servicos' && atual.startsWith('servicos')) ? ' aria-current="page"' : '';
  return nav.map(i => i.filhos
    ? `<li class="tem-sub"><a href="/${v}/${i.caminho}"${ativo(i.slug)}>${i.nome}${icone('baixo', 'ic seta-sub')}</a><ul class="sub">${i.filhos.map(f => `<li><a href="/${v}/${f.caminho}"${f.slug === atual ? ' aria-current="page"' : ''}>${f.nome}</a></li>`).join('')}</ul></li>`
    : `<li><a href="/${v}/${i.caminho}"${ativo(i.slug)}>${i.nome}</a></li>`).join('');
}

function topo(v, atual, sobreFoto) {
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo${sobreFoto ? ' topo-foto' : ''}" data-topo>
  <div class="topo-in">
    <a class="marca" href="/${v}/" aria-label="EMMIG Estruturas Metálicas Minas Gerais, página inicial"><img src="/assets/logo.png" alt="EMMIG Estruturas Metálicas Minas Gerais" width="309" height="108"></a>
    <nav class="menu" aria-label="Principal"><ul>${menu(v, atual)}</ul></nav>
    <a class="topo-tel" href="tel:${E.telHref}">${icone('tel')}<span><small>(34)</small> 3229-9100</span></a>
    <button class="abre-menu" type="button" aria-label="Abrir menu" aria-expanded="false" data-abre-menu><span></span><span></span><span></span></button>
  </div>
</header>`;
}

function rodape(v) {
  return `<footer class="rodape">
  <div class="rodape-in">
    <div class="rodape-marca">
      <img src="/assets/logo.png" alt="EMMIG Estruturas Metálicas Minas Gerais" width="309" height="108" loading="lazy">
      <p>Estruturas metálicas para indústria e comércio de grande e médio porte. Uberlândia (MG), desde ${E.fundacao}.</p>
    </div>
    <div>
      <h2>Serviços</h2>
      <ul>${segmentos.map(s => `<li><a href="/${v}/servicos/${s.slug}/">${s.nome}</a></li>`).join('')}<li><a href="/${v}/construcao-em-aco/">Construção em aço</a></li></ul>
    </div>
    <div>
      <h2>Empresa</h2>
      <ul><li><a href="/${v}/empresa/">A Emmig</a></li><li><a href="/${v}/parceiros/">Parceiros</a></li><li><a href="/${v}/noticias/">Notícias</a></li><li><a href="/${v}/contato/">Contato</a></li></ul>
    </div>
    <div class="rodape-contato">
      <h2>Contato</h2>
      <p><a href="tel:${E.telHref}">${icone('tel')} ${E.telefone}</a></p>
      <p><a href="mailto:${E.email}">${icone('mail')} ${E.email}</a></p>
      <p><a href="${E.rotaMapa}" target="_blank" rel="noopener">${icone('pin')} ${E.endereco}<br>CEP ${E.cep} · ${E.cidade}</a></p>
    </div>
  </div>
  <div class="rodape-fim"><span>© ${new Date().getFullYear()} EMMIG Estruturas Metálicas Minas Gerais</span><span>Uberlândia · Minas Gerais</span></div>
</footer>`;
}

function pagina(v, slug, titulo, descricao, corpo, { sobreFoto = false } = {}) {
  const p = slug === 'index' ? '' : `${slug}/`;
  return `${head(v, p, titulo, descricao)}
<body class="v-${v}">
${topo(v, slug, sobreFoto)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
<div class="caixa-foto" data-caixa hidden><button class="cf-fechar" type="button" aria-label="Fechar" data-cf-fechar>${icone('fechar')}</button><button class="cf-ant" type="button" aria-label="Foto anterior" data-cf-ant>${icone('esq')}</button><figure><img alt=""><figcaption></figcaption></figure><button class="cf-prox" type="button" aria-label="Próxima foto" data-cf-prox>${icone('dir')}</button></div>
</body>
</html>`;
}

// Capa das páginas internas: A com fundo de papel e régua; B com foto.
function capaInterna(v, { titulo, texto, trilha = [], foto }) {
  const migalha = `<nav class="trilha" aria-label="Você está em"><a href="/${v}/">Home</a>${trilha.map(t => t.url ? ` <span>/</span> <a href="${t.url}">${t.nome}</a>` : ` <span>/</span> <span aria-current="page">${t.nome}</span>`).join('')}</nav>`;
  if (v === 'a') return `<section class="capa-int"><div class="capa-int-in">${migalha}<h1>${titulo}</h1>${texto ? `<p>${texto}</p>` : ''}</div>${foto ? `<div class="capa-int-foto">${img(foto, '', ' loading="eager"')}</div>` : ''}</section>`;
  return `<section class="capa-int">${foto ? `<div class="capa-int-foto">${img(foto, '', ' loading="eager"')}</div>` : ''}<div class="capa-int-in">${migalha}<h1>${titulo}</h1>${texto ? `<p>${texto}</p>` : ''}</div></section>`;
}

const chamada = v => `<section class="chamada">
  <div class="chamada-in">
    <div><p class="sobre">Orçamento</p><h2>Tem uma obra em estrutura metálica pela frente?</h2><p>Mande o projeto ou conte o que precisa. A equipe técnica da EMMIG responde com a melhor solução em aço para o seu prazo.</p></div>
    <div class="chamada-acoes"><a class="botao" href="/${v}/contato/">Pedir orçamento ${icone('seta')}</a><a class="botao botao-linha" href="tel:${E.telHref}">${icone('tel')} ${E.telefone}</a></div>
  </div>
</section>`;

// Galeria de uma obra: primeira foto grande, as outras em grade; tudo abre na caixa de foto.
function galeria(o, max = 99) {
  const fotos = o.fotos.slice(0, max).map((_, i) => `${o.slug}-${i + 1}`);
  return `<div class="galeria" data-galeria="${esc(o.nome)}">${fotos.map((n, i) => `<a href="/assets/img/${n}.webp" class="g-item${i === 0 ? ' g-grande' : ''}" data-foto>${img(n, `${o.nome}, foto ${i + 1}`)}</a>`).join('')}</div>`;
}

// ---------- home A ----------
function homeA() {
  const v = 'a';
  const destaques = ['dmae', 'wbc', 'cargill', 'vertente', 'gabarito'];
  return `<section class="capa-a">
  <div class="capa-a-texto">
    <p class="sobre">${viga()} Estruturas metálicas · desde ${E.fundacao}</p>
    <h1>Estruturas em aço para a indústria e o comércio.</h1>
    <p class="capa-a-lead">Para empresas de grande e médio porte: projeto em 2D e 3D, fabricação própria em Uberlândia e montagem na obra. Coberturas, prédios, mezaninos, torres e caminhos para ponte rolante.</p>
    <div class="capa-acoes"><a class="botao" href="/${v}/contato/">Pedir orçamento ${icone('seta')}</a><a class="botao botao-linha" href="/${v}/servicos/">Ver obras</a></div>
  </div>
  <div class="capa-a-foto">
    ${img('gavea-office-1', 'Estrutura metálica do Gávea Office em montagem', ' loading="eager" fetchpriority="high"')}
    <span class="cota cota-h" aria-hidden="true"><i></i><b>${E.anos} anos</b><i></i></span>
    <span class="cota cota-v" aria-hidden="true"><i></i><b>1967</b><i></i></span>
  </div>
  <dl class="ficha">
    <div><dt>Fundação</dt><dd>${E.fundacao}, Uberlândia (MG)</dd></div>
    <div><dt>Fábrica</dt><dd>BR-452, km 140</dd></div>
    <div><dt>Projeto</dt><dd>2D e 3D, com sequência de montagem</dd></div>
    <div><dt>Atuação</dt><dd>Indústria, comércio, usinas, escolas</dd></div>
  </dl>
</section>

<section class="sec fabricamos">
  <div class="sec-in">
    <header class="sec-cab"><p class="sobre">O que a EMMIG fabrica</p><h2>Do galpão à usina, a estrutura sai pronta da nossa fábrica.</h2></header>
    <div class="fab-grade" data-lista-fab>
      <ol class="lista-fab">
        ${fabricamos.map((f, i) => `<li${i === 0 ? ' class="ativo"' : ''}><span class="num">${String(i + 1).padStart(2, '0')}</span><div><h3>${f.nome}</h3><p>${f.texto}</p><figure class="fab-foto-cel">${img(f.foto, f.nome)}</figure></div></li>`).join('')}
      </ol>
      <div class="fab-fotos">${fabricamos.map((f, i) => `<figure${i === 0 ? ' class="ativo"' : ''}>${img(f.foto, f.nome)}<figcaption>${String(i + 1).padStart(2, '0')} · ${f.nome}</figcaption></figure>`).join('')}</div>
    </div>
  </div>
</section>

<section class="sec processo">
  <div class="sec-in">
    <header class="sec-cab"><p class="sobre">Como trabalhamos</p><h2>Uma só empresa do projeto à montagem.</h2><p>Quem projeta é quem fabrica e quem monta. Isso evita retrabalho entre fornecedores e mantém o prazo.</p></header>
    <ol class="etapas">
      ${etapas.map((e, i) => `<li><span class="etapa-num">${i + 1}</span><figure>${img(e.foto, e.nome)}</figure><h3>${e.nome}</h3><p>${e.texto}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="sec segmentos-a">
  <div class="sec-in">
    <header class="sec-cab sec-cab-linha"><div><p class="sobre">Serviços</p><h2>Obras por segmento</h2></div><a class="link-seta" href="/${v}/servicos/">Todas as ${obras.length} obras ${icone('seta')}</a></header>
    <div class="mosaico">
      ${segmentos.map(s => { const os = obrasDe(s.slug); return `<a class="tile" href="/${v}/servicos/${s.slug}/">${img(capaSeg(s), s.nome)}<span class="tile-txt"><b>${s.nome}</b><small>${os.map(o => o.nome.split(' · ')[0]).join(' · ')}</small></span><span class="tile-n">${String(os.length).padStart(2, '0')}</span></a>`; }).join('')}
    </div>
  </div>
</section>

<section class="faixa-clientes" aria-label="Clientes com obras da EMMIG">
  <div class="rolo" data-rolo><div>${clientes.map(c => `<span>${esc(c)}</span>`).join(viga('viga-sep'))}</div></div>
</section>

<section class="sec destaques-a">
  <div class="sec-in">
    <header class="sec-cab"><p class="sobre">Obras em destaque</p><h2>Estruturas que fazem parte da paisagem do Triângulo Mineiro.</h2></header>
    <div class="destaques-grade">
      ${destaques.map(s => obras.find(o => o.slug === s)).map((o, i) => `<a class="destaque d${i + 1}" href="/${v}/servicos/${o.seg}/#${o.slug}"><figure>${img(capaObra(o), o.nome)}</figure><div><small>${segNome(o.seg)}</small><h3>${o.nome}</h3><p>${o.texto}</p></div></a>`).join('')}
    </div>
  </div>
</section>

<section class="sec numeros-aco">
  <div class="sec-in">
    <header class="sec-cab"><p class="sobre">Por que construir em aço</p><h2>Obra mais rápida, mais leve e mais precisa.</h2></header>
    <div class="numeros">
      ${vantagens.filter(x => x.numero).map(x => `<div><b>${x.ate ? '<small>até</small>' : ''}${x.numero}</b><span>${x.rotulo}</span><p>${x.nome}</p></div>`).join('')}
    </div>
    <a class="link-seta claro" href="/${v}/construcao-em-aco/">As 12 vantagens da construção em aço ${icone('seta')}</a>
  </div>
</section>

<section class="sec empresa-a">
  <div class="sec-in empresa-grade">
    <figure class="empresa-foto">${img('fabrica-1', 'Sede e fábrica da EMMIG em Uberlândia')}<figcaption>Fábrica da EMMIG · BR-452, Uberlândia</figcaption></figure>
    <div>
      <p class="sobre">A Emmig</p>
      <h2>${E.anos} anos construindo em aço a partir de Uberlândia.</h2>
      <p>${sobre.curto} Ao longo desse período, vem desenvolvendo e racionalizando processos e consolidando sua qualidade, solidez e credibilidade.</p>
      <ul class="pilares">${sobre.pilares.map(p => `<li><h3>${p.nome}</h3><p>${p.texto}</p></li>`).join('')}</ul>
      <a class="link-seta" href="/${v}/empresa/">Conheça a empresa ${icone('seta')}</a>
    </div>
  </div>
</section>
${chamada(v)}`;
}

// ---------- home B ----------
function homeB() {
  const v = 'b';
  const slides = [
    ['gavea-business-3', 'Gávea Business', 'Edifício comercial em estrutura metálica'],
    ['dmae-1', 'DMAE · nova sede', '8.073 m² · Av. Rondon Pacheco, Uberlândia'],
    ['gavea-office-5', 'Gávea Office', 'Vigas e tesouras em aço'],
    ['algar-1', 'Algar · Granja Marileusa', 'Edifício comercial · Uberlândia'],
    ['eurobike-1', 'Eurobike', 'Pilares e vigas aparentes'],
  ];
  const filme = ['dmae', 'gavea-office', 'monsanto', 'cocal', 'itapagipe', 'unitri', 'tok-stok', 'praia-clube'].map(s => obras.find(o => o.slug === s));
  return `<section class="capa-b" data-slides>
  <div class="slides">${slides.map(([f, n, d], i) => `<figure class="slide${i === 0 ? ' ativo' : ''}">${img(f, n, i === 0 ? ' loading="eager" fetchpriority="high"' : '')}<figcaption><b>${n}</b><span>${d}</span></figcaption></figure>`).join('')}</div>
  <div class="capa-b-in">
    <p class="sobre">${viga()} EMMIG · Estruturas Metálicas Minas Gerais</p>
    <h1>Levantamos em aço a indústria e o comércio do Triângulo Mineiro desde ${E.fundacao}.</h1>
    <div class="capa-acoes"><a class="botao" href="/${v}/contato/">Pedir orçamento ${icone('seta')}</a><a class="botao botao-vidro" href="/${v}/servicos/">Ver as obras</a></div>
  </div>
  <div class="slides-ctrl" aria-hidden="true"><span class="slides-n"><b>01</b> / ${String(slides.length).padStart(2, '0')}</span><span class="slides-barra"><i></i></span></div>
</section>

<section class="sec intro-b">
  <div class="sec-in intro-grade">
    <div class="intro-ano"><b data-conta>${E.anos}</b><span>anos de estrutura<br>metálica em Uberlândia</span></div>
    <div>
      <p class="intro-lead">${sobre.paragrafos[0]}</p>
      <ul class="intro-fatos">
        <li><b>Projeto 2D e 3D</b><span>interfaces, conexões e sequência de montagem</span></li>
        <li><b>Fábrica própria</b><span>BR-452, km 140, Uberlândia</span></li>
        <li><b>Montagem na obra</b><span>equipe e guindastes</span></li>
      </ul>
    </div>
  </div>
</section>

<section class="sec filme">
  <div class="sec-in"><header class="sec-cab sec-cab-linha"><div><p class="sobre">Obras em destaque</p><h2>De Uberlândia para Minas e Goiás</h2></div><div class="filme-setas"><button type="button" aria-label="Anterior" data-filme="-1">${icone('esq')}</button><button type="button" aria-label="Próxima" data-filme="1">${icone('dir')}</button></div></header></div>
  <div class="filme-trilho" data-filme-trilho>
    ${filme.map(o => `<a class="filme-item" href="/${v}/servicos/${o.seg}/#${o.slug}"><figure>${img(capaObra(o), o.nome)}</figure><small>${segNome(o.seg)}</small><h3>${o.nome}</h3></a>`).join('')}
  </div>
</section>

<section class="sec segmentos-b">
  <div class="sec-in">
    <header class="sec-cab"><p class="sobre">Serviços</p><h2>Escolha o tipo de obra</h2></header>
    <div class="abas" role="tablist" data-abas>${segmentos.map((s, i) => `<button type="button" role="tab" aria-selected="${i === 0}" aria-controls="aba-${s.slug}" id="tab-${s.slug}">${s.nome}<small>${obrasDe(s.slug).length}</small></button>`).join('')}</div>
    ${segmentos.map((s, i) => `<div class="aba" role="tabpanel" id="aba-${s.slug}" aria-labelledby="tab-${s.slug}"${i ? ' hidden' : ''}>
      <div class="aba-cab"><p>${s.texto}</p><a class="link-seta" href="/${v}/servicos/${s.slug}/">Ver ${s.nome.toLowerCase()} ${icone('seta')}</a></div>
      <div class="aba-grade">${obrasDe(s.slug).map(o => `<a href="/${v}/servicos/${s.slug}/#${o.slug}"><figure>${img(capaObra(o), o.nome)}</figure><span>${o.nome}</span></a>`).join('')}</div>
    </div>`).join('')}
  </div>
</section>

<section class="sec troca" data-troca>
  <div class="sec-in troca-grade">
    <div class="troca-fotos">${etapas.map((e, i) => `<figure${i === 0 ? ' class="ativo"' : ''}>${img(e.foto, e.nome)}</figure>`).join('')}</div>
    <div class="troca-passos">
      <header class="sec-cab"><p class="sobre">Do projeto à entrega</p><h2>Quem projeta, fabrica e monta é a mesma equipe.</h2></header>
      ${etapas.map((e, i) => `<article class="passo${i === 0 ? ' ativo' : ''}" data-passo="${i}"><span>${String(i + 1).padStart(2, '0')}</span><h3>${e.nome}</h3><p>${e.texto}</p><figure class="passo-foto">${img(e.foto, e.nome)}</figure></article>`).join('')}
    </div>
  </div>
</section>

<section class="sec vantagens-b">
  <div class="sec-in">
    <header class="sec-cab"><p class="sobre">Construção em aço</p><h2>O que muda na sua obra quando a estrutura é metálica</h2></header>
    <div class="vant-b">${vantagens.filter(x => x.numero).map(x => `<div><b>${x.ate ? '<small>até</small>' : ''}${x.numero}</b><span>${x.rotulo}</span><p>${x.texto}</p></div>`).join('')}</div>
    <a class="botao botao-claro" href="/${v}/construcao-em-aco/">Ver as 12 vantagens ${icone('seta')}</a>
  </div>
</section>

<section class="sec clientes-b">
  <div class="sec-in">
    <header class="sec-cab sec-cab-linha"><div><p class="sobre">Quem já construiu com a EMMIG</p><h2>Clientes de obras do nosso portfólio</h2></div><a class="link-seta" href="/${v}/parceiros/">Arquitetos e construtoras parceiros ${icone('seta')}</a></header>
    <ul class="nomes">${clientes.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
  </div>
</section>
${chamada(v)}`;
}

// ---------- páginas internas ----------
function empresaPag(v) {
  return `${capaInterna(v, { titulo: 'A Emmig', texto: `Estruturas metálicas em Uberlândia (MG) desde ${E.fundacao}.`, trilha: [{ nome: 'A Emmig' }], foto: 'fabrica-1' })}
<section class="sec">
  <div class="sec-in texto-grade">
    <div class="texto-corpo">
      <p class="sobre">Nossa história</p>
      <h2>Qualidade, solidez e credibilidade em ${E.anos} anos de construção em aço.</h2>
      ${sobre.paragrafos.map(p => `<p>${p}</p>`).join('')}
    </div>
    <aside class="texto-lado">
      <dl class="ficha-lado">
        <div><dt>Fundação</dt><dd>${E.fundacao}</dd></div>
        <div><dt>Sede e fábrica</dt><dd>${E.endereco}, ${E.cidade}</dd></div>
        <div><dt>Clientes</dt><dd>Indústria e comércio de grande e médio porte</dd></div>
        <div><dt>Projeto</dt><dd>2D e 3D</dd></div>
      </dl>
    </aside>
  </div>
</section>
<section class="sec sec-papel">
  <div class="sec-in">
    <header class="sec-cab"><p class="sobre">O que fabricamos</p><h2>Estruturas metálicas para</h2></header>
    <ul class="fab-linhas">${fabricamos.map(f => `<li>${viga()}<div><h3>${f.nome}</h3><p>${f.texto}</p></div></li>`).join('')}</ul>
  </div>
</section>
<section class="sec">
  <div class="sec-in">
    <header class="sec-cab"><p class="sobre">Nossos valores</p><h2>O que guia cada obra</h2></header>
    <ul class="pilares pilares-largos">${sobre.pilares.map(p => `<li><h3>${p.nome}</h3><p>${p.texto}</p></li>`).join('')}</ul>
  </div>
</section>
<section class="sec sec-papel">
  <div class="sec-in">
    <header class="sec-cab"><p class="sobre">A fábrica</p><h2>Corte, solda e pintura em Uberlândia</h2></header>
    <div class="galeria" data-galeria="Fábrica da EMMIG">${['capa-fabrica', 'fabrica-1', 'fabrica-2', 'fabrica-3', 'fabrica-4', 'fabrica-5', 'fabrica-6', 'fabrica-7', 'fabrica-8', 'fabrica-9'].map((n, i) => `<a href="/assets/img/${n}.webp" class="g-item${i === 0 ? ' g-grande' : ''}" data-foto>${img(n, 'Fábrica da EMMIG')}</a>`).join('')}</div>
  </div>
</section>
${chamada(v)}`;
}

function servicosPag(v) {
  return `${capaInterna(v, { titulo: 'Serviços', texto: `${obras.length} obras em ${segmentos.length} segmentos: edifícios comerciais, prédios industriais, usinas, shoppings, escolas e obras especiais.`, trilha: [{ nome: 'Serviços' }], foto: 'monsanto-1' })}
<section class="sec">
  <div class="sec-in">
    <div class="filtros" data-filtros><button type="button" aria-pressed="true" data-f="todas">Todas <small>${obras.length}</small></button>${segmentos.map(s => `<button type="button" aria-pressed="false" data-f="${s.slug}">${s.nome} <small>${obrasDe(s.slug).length}</small></button>`).join('')}</div>
    <div class="obras-grade">${obras.map(o => `<a class="obra-item" data-seg="${o.seg}" href="/${v}/servicos/${o.seg}/#${o.slug}"><figure>${img(capaObra(o), o.nome)}<span>${o.fotos.length} fotos</span></figure><small>${segNome(o.seg)}</small><h3>${o.nome}</h3><p>${o.texto}</p></a>`).join('')}</div>
  </div>
</section>
<section class="sec sec-papel">
  <div class="sec-in">
    <header class="sec-cab"><p class="sobre">Segmentos</p><h2>Veja as obras por tipo</h2></header>
    <ul class="seg-lista">${segmentos.map(s => `<li><a href="/${v}/servicos/${s.slug}/">${viga()}<span><b>${s.nome}</b><small>${s.texto}</small></span>${icone('seta')}</a></li>`).join('')}</ul>
  </div>
</section>
${chamada(v)}`;
}

function segmentoPag(v, s) {
  const os = obrasDe(s.slug);
  const i = segmentos.indexOf(s);
  const prox = segmentos[(i + 1) % segmentos.length];
  return `${capaInterna(v, { titulo: s.nome, texto: s.texto, trilha: [{ nome: 'Serviços', url: `/${v}/servicos/` }, { nome: s.nome }], foto: capaSeg(s) })}
<section class="sec">
  <div class="sec-in">
    <nav class="indice-obras" aria-label="Obras nesta página">${os.map(o => `<a href="#${o.slug}">${o.nome}</a>`).join('')}</nav>
    ${os.map((o, n) => `<article class="obra" id="${o.slug}">
      <header class="obra-cab"><span class="obra-n">${String(n + 1).padStart(2, '0')}</span><div><h2>${o.nome}</h2><p>${o.texto}</p></div><small>${o.fotos.length} fotos</small></header>
      ${galeria(o)}
    </article>`).join('')}
    <a class="proximo-seg" href="/${v}/servicos/${prox.slug}/"><small>Próximo segmento</small><b>${prox.nome}</b>${icone('seta')}</a>
  </div>
</section>
${chamada(v)}`;
}

function acoPag(v) {
  return `${capaInterna(v, { titulo: 'Construção em aço', texto: 'O sistema construtivo em aço apresenta características significativas. Veja as principais vantagens.', trilha: [{ nome: 'Serviços', url: `/${v}/servicos/` }, { nome: 'Construção em aço' }], foto: 'gavea-office-5' })}
<section class="sec numeros-aco">
  <div class="sec-in">
    <div class="numeros">${vantagens.filter(x => x.numero).map(x => `<div><b>${x.ate ? '<small>até</small>' : ''}${x.numero}</b><span>${x.rotulo}</span><p>${x.nome}</p></div>`).join('')}</div>
  </div>
</section>
<section class="sec">
  <div class="sec-in">
    <ol class="vantagens">${vantagens.map((x, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><h2>${x.nome}</h2><p>${x.texto}</p></li>`).join('')}</ol>
    <p class="fonte">Dados de pesquisa: CBCA, Centro Brasileiro da Construção em Aço (cbca-acobrasil.org.br).</p>
  </div>
</section>
${chamada(v)}`;
}

function parceirosPag(v) {
  const bloco = (t, l) => `<div class="parc-bloco"><h2>${t}</h2><ul>${l.map(n => `<li>${esc(n)}</li>`).join('')}</ul></div>`;
  return `${capaInterna(v, { titulo: 'Parceiros', texto: 'Arquitetos, engenheiros e construtoras que projetam e constroem com a EMMIG.', trilha: [{ nome: 'Parceiros' }], foto: 'gavea-business-1' })}
<section class="sec">
  <div class="sec-in parc-grade">
    ${bloco('Arquitetura e urbanismo', parceiros.arquitetura)}
    ${bloco('Engenharia e construtoras', parceiros.engenharia)}
  </div>
</section>
<section class="sec sec-papel">
  <div class="sec-in">
    <header class="sec-cab"><p class="sobre">Clientes</p><h2>Empresas com obras no nosso portfólio</h2></header>
    <ul class="nomes">${clientes.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
  </div>
</section>
${chamada(v)}`;
}

function noticiasPag(v) {
  return `${capaInterna(v, { titulo: 'Notícias', texto: 'A EMMIG na imprensa e em eventos de engenharia.', trilha: [{ nome: 'Notícias' }], foto: 'dmae-4' })}
<section class="sec">
  <div class="sec-in">
    ${noticias.map((n, i) => `<article class="noticia${i === 0 ? ' noticia-1' : ''}" id="${n.slug}">
      <figure>${n.fotos ? n.fotos.map(f => `<a href="/assets/img/${f}.webp" data-foto>${img(f, n.titulo)}</a>`).join('') : `<a href="/assets/img/${n.foto}.webp" data-foto>${img(n.foto, n.titulo)}</a>`}</figure>
      <div><time datetime="${n.data}">${dataBR(n.data)}</time><h2>${n.titulo}</h2>${n.texto.map(p => `<p>${p}</p>`).join('')}${n.link ? `<a class="link-seta" href="${n.link.url}" target="_blank" rel="noopener">${n.link.nome} ${icone('seta')}</a>` : ''}</div>
    </article>`).join('')}
  </div>
</section>
${chamada(v)}`;
}

function contatoPag(v) {
  return `${capaInterna(v, { titulo: 'Contato', texto: 'Fale com a EMMIG para orçamentos, projetos e visitas à fábrica.', trilha: [{ nome: 'Contato' }] })}
<section class="sec">
  <div class="sec-in contato-grade">
    <div class="contato-dados">
      <a class="contato-linha" href="tel:${E.telHref}">${icone('tel')}<span><small>Telefone</small>${E.telefone}</span></a>
      <a class="contato-linha" href="mailto:${E.email}">${icone('mail')}<span><small>E-mail</small>${E.email}</span></a>
      <a class="contato-linha" href="${E.rotaMapa}" target="_blank" rel="noopener">${icone('pin')}<span><small>Endereço</small>${E.endereco} · CEP ${E.cep}<br>${E.cidade}</span></a>
    </div>
    <form class="form" data-form data-email="${E.email}">
      <h2>Envie uma mensagem</h2>
      <div class="form-duplo"><label>Nome *<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
      <div class="form-duplo"><label>E-mail *<input name="email" type="email" required autocomplete="email"></label><label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label></div>
      <label>Tipo de obra<select name="tipo"><option value="">Selecione</option>${segmentos.map(s => `<option>${s.nome}</option>`).join('')}<option>Cobertura / galpão</option><option>Mezanino ou torre</option><option>Ponte rolante</option></select></label>
      <label>Assunto<input name="assunto"></label>
      <label>Sua mensagem *<textarea name="mensagem" rows="5" required></textarea></label>
      <button class="botao" type="submit">Enviar ${icone('seta')}</button>
      <p class="form-nota">O envio abre o seu e-mail com a mensagem pronta para ${E.email}.</p>
    </form>
  </div>
</section>
<section class="mapa"><iframe src="${E.mapa}" title="Mapa de localização da EMMIG" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;
}

export function gerarVersao(v) {
  const nome = nomesVersao[v];
  const t = s => `${s} · EMMIG Estruturas Metálicas`;
  const out = {
    index: pagina(v, 'index', 'EMMIG · Estruturas Metálicas Minas Gerais, Uberlândia', `Estruturas metálicas para indústria e comércio desde ${E.fundacao}: coberturas, prédios, mezaninos, torres e caminhos para ponte rolante. Projeto, fabricação e montagem.`, v === 'a' ? homeA() : homeB(), { sobreFoto: v === 'b' }),
    empresa: pagina(v, 'empresa', t('A Emmig'), sobre.curto, empresaPag(v)),
    servicos: pagina(v, 'servicos', t('Serviços e obras'), `${obras.length} obras da EMMIG em estrutura metálica.`, servicosPag(v)),
    'construcao-em-aco': pagina(v, 'construcao-em-aco', t('Construção em aço'), 'As vantagens do sistema construtivo em aço.', acoPag(v)),
    parceiros: pagina(v, 'parceiros', t('Parceiros'), 'Arquitetos, engenheiros e construtoras parceiros da EMMIG.', parceirosPag(v)),
    noticias: pagina(v, 'noticias', t('Notícias'), 'Notícias da EMMIG.', noticiasPag(v)),
    contato: pagina(v, 'contato', t('Contato'), `Telefone ${E.telefone}, ${E.email}, ${E.endereco}, ${E.cidade}.`, contatoPag(v)),
  };
  for (const s of segmentos) out[`servicos/${s.slug}`] = pagina(v, `servicos/${s.slug}`, t(s.nome), s.texto, segmentoPag(v, s));
  void nome;
  return out;
}
