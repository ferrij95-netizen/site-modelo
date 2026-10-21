// Monta as páginas das versões A ("Lavoura": o topo grafite do site atual com a faixa de lavoura, as três colunas
// Quem Somos / Nossos Produtos / Entre em contato com as cores verde, laranja e vermelha, e o mostruário de grãos)
// e B ("Corretora": claro com amarelo do logo, títulos em itálico como o logo, mesa de operações, catálogo trilíngue com cotação).
// Três idiomas como o site atual: /a/ (pt), /a/en/, /a/es/. Estilos em public/assets/{base,a,b}.css.
import { empresa as E, langs, langNome, langHtml, langOg, familias, produtos, feiras, faixas, T, creditosFotos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (src, alt, extra = '', w = 1800, h = 1200, sizes = '(max-width: 800px) 100vw, 60vw') => `<img src="/assets/img/${src}.webp" srcset="/assets/img/${src}-p.webp 900w, /assets/img/${src}.webp 1800w" sizes="${sizes}" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
// Foto de família: as faixas do site atual (rot-0N, 960 px) ou uma foto de banco.
const fotoFam = (f, l, extra, sizes) => f.foto.startsWith('rot-')
  ? `<img src="/assets/faixa/${f.foto}.webp" alt="${esc(f.nome[l])}" width="960" height="215" decoding="async"${extra}>`
  : foto(f.foto, f.nome[l], extra, 1800, 1200, sizes);
const grao = (p, l, extra = '') => `<img src="/assets/graos/${p.img}.webp" alt="${esc(p.nome[l])}" width="145" height="145" loading="lazy" decoding="async"${extra}>`;
const fam = slug => familias.find(f => f.slug === slug);
const doFam = slug => produtos.filter(p => p.fam === slug);

export const nomesVersao = { a: 'Lavoura', b: 'Corretora' };

const base = (v, l) => `/${v}/${l === 'pt' ? '' : l + '/'}`;
const paginasNav = ['index', 'empresa', 'produtos', 'contato'];
const caminhoDe = slug => (slug === 'index' ? '' : `${slug}/`);

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fax: '<path d="M7 9V3h10v6M7 17H4v-8h16v8h-3"/><rect x="7" y="14" width="10" height="7"/>',
  lupa: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  globo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// Bandeiras pequenas como as do topo do site atual.
const bandeira = {
  pt: '<svg viewBox="0 0 22 15" aria-hidden="true"><rect width="22" height="15" fill="#229e45"/><path d="M11 2l8.5 5.5L11 13 2.5 7.5z" fill="#f8e509"/><circle cx="11" cy="7.5" r="3.3" fill="#2b49a3"/></svg>',
  en: '<svg viewBox="0 0 22 15" aria-hidden="true"><rect width="22" height="15" fill="#fff"/><g fill="#b22234">' + [0, 2, 4, 6, 8, 10, 12].map(i => `<rect y="${i * 15 / 13}" width="22" height="${15 / 13}"/>`).join('') + '</g><rect width="9.5" height="8.1" fill="#3c3b6e"/></svg>',
  es: '<svg viewBox="0 0 22 15" aria-hidden="true"><rect width="22" height="15" fill="#c60b1e"/><rect y="3.75" width="22" height="7.5" fill="#ffc400"/></svg>',
};

// ---------- moldura ----------
function head(v, l, cam, titulo, descricao, ogImg) {
  const url = `${E.url.replace(/\/$/, '')}${base(v, l)}${cam}`;
  const alt = langs.map(x => `<link rel="alternate" hreflang="${langHtml[x]}" href="${E.url.replace(/\/$/, '')}${base(v, x)}${cam}">`).join('\n');
  return `<!doctype html>
<html lang="${langHtml[l]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
${alt}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Burmann Alimentos">
<meta property="og:locale" content="${langOg[l]}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${ogImg || v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#191919' : '#F4F2EC'}">
<link rel="icon" href="/assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,400;0,600;0,700;0,800;1,700;1,800;1,900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
<!-- ${esc(creditosFotos)} -->
</head>`;
}

const trocaIdioma = (v, l, cam, cls) => `<nav class="${cls}" aria-label="${T[l].idioma}">${langs.map(x => `<a href="${base(v, x)}${cam}" hreflang="${langHtml[x]}" lang="${langHtml[x]}"${x === l ? ' aria-current="true"' : ''} title="${langNome[x]}">${bandeira[x]}<span>${x.toUpperCase()}</span></a>`).join('')}</nav>`;
const menuLinks = (v, l, atual) => paginasNav.map(s => `<a href="${base(v, l)}${caminhoDe(s)}"${s === atual ? ' aria-current="page"' : ''}>${T[l].menu[s]}</a>`).join('');

// Formulário: abre o e-mail com a mensagem pronta (o site atual também só tem nome, e-mail, telefone e mensagem).
const formulario = (l, cls) => {
  const f = T[l].form;
  return `<form class="${cls}" data-mailto="${E.contatos[l === 'pt' ? 0 : 1].email}" data-assunto="${esc(l === 'pt' ? 'Contato pelo site' : l === 'en' ? 'Website contact' : 'Contacto por el sitio')}">
  <label><span>${f.nome}</span><input name="nome" required autocomplete="name"></label>
  <label><span>${f.email}</span><input name="email" type="email" required autocomplete="email"></label>
  <label><span>${f.tel}</span><input name="tel" type="tel" autocomplete="tel"></label>
  <label class="larga"><span>${f.msg}</span><textarea name="msg" rows="5" required></textarea></label>
  <button type="submit">${f.enviar} ${ic('seta')}</button>
  <p class="form-nota">${f.nota}</p>
</form>`;
};

const enderecoHtml = l => `${E.rua}<br>${E.bairro} · ${E.cep}<br>${E.cidade} · ${E.uf} · ${T[l].pais}`;

// =====================================================================
// Versão A · Lavoura
// =====================================================================
function topoA(l, atual, cam) {
  return `<header class="a-topo">
  <div class="a-topo-in">
    <a class="a-logo" href="${base('a', l)}"><img src="/assets/logo.svg" alt="Burmann Alimentos" width="267" height="106"></a>
    ${trocaIdioma('a', l, cam, 'a-idiomas')}
    <button class="a-burger" aria-expanded="false" aria-controls="a-menu" aria-label="Menu">${ic('menu')}</button>
    <nav class="a-menu" id="a-menu">${menuLinks('a', l, atual)}</nav>
  </div>
</header>`;
}

function rodapeA(l) {
  const t = T[l];
  return `<footer class="a-rod">
  <div class="a-rod-in">
    <div class="a-rod-marca"><img src="/assets/logo.svg" alt="Burmann Alimentos" width="200" height="79" loading="lazy"><p>${t.atua.join(' · ')}<br>${l === 'pt' ? 'Desde' : l === 'en' ? 'Since' : 'Desde'} ${E.desde}</p></div>
    <nav class="a-rod-menu">${menuLinks('a', l, '')}</nav>
    <div class="a-rod-ct">
      <p>${enderecoHtml(l)}</p>
      <p><a href="tel:${E.telHref}">${E.tel}</a><br>${E.contatos.map(c => `<a href="mailto:${c.email}">${c.email}</a>`).join('<br>')}</p>
    </div>
  </div>
  <div class="a-rod-fim"><span>${t.direitos} © ${E.razao}</span><span class="a-rod-cred">${t.creditos}</span></div>
</footer>`;
}

// Faixa de lavoura (o rotativo do site atual) com as fotos trocando devagar; o nome da cultura aparece na etiqueta.
function faixaA(l, inicio = 0, so = null) {
  const lista = so ? faixas.filter(f => so.includes(f.img)) : faixas;
  const ord = [...lista.slice(inicio), ...lista.slice(0, inicio)];
  return `<div class="a-faixa"${ord.length > 1 ? ' data-faixa' : ''}>
  ${ord.map((f, i) => `<figure${i === 0 ? ' class="on"' : ''}><img src="/assets/faixa/${f.img}.webp" alt="${esc(f.nome[l])}" width="960" height="215"${i ? ' loading="lazy"' : ''}><figcaption>${esc(f.nome[l])}</figcaption></figure>`).join('\n  ')}
</div>`;
}

function mostruarioA(l, comAbas = true) {
  const t = T[l];
  return `<div class="a-most" data-abas>
  ${comAbas ? `<div class="a-abas" role="tablist"><button role="tab" aria-selected="true" data-aba="">${t.todos} <small>${produtos.length}</small></button>${familias.map((f, i) => `<button role="tab" aria-selected="false" data-aba="${f.slug}">${esc(f.nome[l])} <small>${doFam(f.slug).length}</small></button>`).join('')}</div>` : ''}
  ${familias.map((f, i) => `<div class="a-most-fam" data-painel="${f.slug}">
    <h3 class="a-most-t">${esc(f.nome[l])}</h3>
    <ul class="a-pratos">${doFam(f.slug).map(p => `<li><span class="a-prato">${grao(p, l)}</span><span>${esc(p.nome[l])}</span></li>`).join('')}</ul>
    <a class="a-link" href="${base('a', l)}produtos/${f.slug}/">${esc(f.nome[l])}: ${t.produtosN(doFam(f.slug).length)} ${ic('seta')}</a>
  </div>`).join('\n  ')}
</div>`;
}

function linhaFeirasA(l) {
  return `<ol class="a-feiras" data-rev>
  ${feiras.map(f => `<li><b>${f.ano}</b><span class="a-feira-c">${esc(f.cidade[l])}</span><span class="a-feira-n">${esc(f.nome[l])}</span></li>`).join('\n  ')}
</ol>`;
}

function paginaA(l, slug, cam, titulo, desc, corpo, extraBody = '') {
  return `${head('a', l, cam, titulo, desc)}
<body class="va"${extraBody}>
<a class="pular" href="#conteudo">${l === 'pt' ? 'Pular para o conteúdo' : l === 'en' ? 'Skip to content' : 'Saltar al contenido'}</a>
${topoA(l, slug, cam)}
<main id="conteudo">
${corpo}
</main>
${rodapeA(l)}
</body>
</html>
`;
}

const tituloInternoA = (l, txt, faixaIdx, so) => `<section class="a-int-topo">
  <div class="a-cont">
    ${faixaA(l, faixaIdx, so)}
    <h1 class="a-barra">${esc(txt)}</h1>
  </div>
</section>`;

function inicioA(l) {
  const t = T[l]; const b = base('a', l);
  const cores = ['verde', 'laranja', 'vermelho'];
  const destaqueProd = t.destaques.map((n, i) => {
    const pt = T.pt.destaques[i];
    const p = produtos.find(x => x.nome.pt === pt || x.nome.pt.startsWith(pt));
    return `<li><a href="${b}produtos/${p.fam}/">${esc(n)}</a></li>`;
  }).join('');
  const corpo = `<section class="a-hero">
  <div class="a-cont">
    <div class="a-hero-txt">
      <p class="a-sobre">${t.atua.join(' · ')} · ${E.cidade}, RS</p>
      <h1>${esc(t.chamada)}</h1>
      <p>${esc(t.sub)}</p>
      <div class="a-bts"><a class="bt bt-am" href="${b}produtos/">${t.verProdutos} ${ic('seta')}</a><a class="bt bt-cl" href="${b}contato/">${t.falar}</a></div>
    </div>
    ${faixaA(l, 3)}
  </div>
</section>

<section class="a-tres">
  <div class="a-cont a-tres-in">
    <article class="a-col verde" data-rev>
      <h2 class="a-barra">${t.quem}</h2>
      <p class="a-dest">${esc(t.quemDestaque)}</p>
      <p>${esc(t.quemTexto)}</p>
      <a class="a-faixa-bt" href="${b}empresa/">${t.saibaMais}</a>
    </article>
    <article class="a-col laranja" data-rev style="--d:120ms">
      <h2 class="a-barra">${t.nossos}</h2>
      <p class="a-dest">${esc(t.nossosDestaque)}</p>
      <ul class="a-destaques">${destaqueProd}</ul>
      <a class="a-faixa-bt" href="${b}produtos/">${t.verTodos}</a>
    </article>
    <article class="a-col vermelho" data-rev style="--d:240ms">
      <h2 class="a-barra">${t.contatoT}</h2>
      <p class="a-dest">${esc(t.contatoDestaque)}</p>
      <p>${esc(t.contatoTexto)}</p>
      <a class="a-faixa-bt" href="${b}contato/">${t.entrarContato}</a>
    </article>
  </div>
</section>

<section class="a-etapas">
  <div class="a-cont a-etapas-in">
    <figure class="a-etapas-foto" data-rev>${foto('sacos', l === 'pt' ? 'Sacos de feijões e grãos' : l === 'en' ? 'Sacks of beans and grains' : 'Sacos de frijoles y granos', '', 1024, 681)}</figure>
    <div>
      <h2 class="a-tit">${t.etapasT}</h2>
      <p class="a-sub">${t.etapasSub}</p>
      <ol class="a-passos">${t.etapas.map(([h, p], i) => `<li data-rev style="--d:${i * 110}ms"><span class="a-passo-n">${String(i + 1).padStart(2, '0')}</span><div><h3>${esc(h)}</h3><p>${esc(p)}</p></div></li>`).join('')}</ol>
    </div>
  </div>
</section>

<section class="a-escuro">
  <div class="a-cont">
    <div class="a-cab"><h2 class="a-tit">${t.mostruario}</h2><p class="a-sub">${t.mostruarioSub}</p></div>
    ${mostruarioA(l)}
  </div>
</section>

<section class="a-feiras-sec">
  <div class="a-cont">
    <div class="a-cab"><h2 class="a-tit">${t.feirasT}</h2><p class="a-sub">${esc(t.feirasSub)}</p></div>
    ${linhaFeirasA(l)}
  </div>
</section>

<section class="a-sede">
  ${foto('cais', 'Cais Mauá, Porto Alegre', ' class="a-sede-img"', 1800, 622, '100vw')}
  <div class="a-cont a-sede-in">
    <div class="a-sede-box" data-rev>
      <h2>${t.sede}</h2>
      <p>${enderecoHtml(l)}</p>
      <p><a href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a></p>
      <a class="bt bt-am" href="${b}contato/">${t.entrarContato} ${ic('seta')}</a>
    </div>
  </div>
</section>`;
  return paginaA(l, 'index', '', t.titulo, t.descricao, corpo);
}

function empresaA(l) {
  const t = T[l]; const cam = 'empresa/';
  const corpo = `${tituloInternoA(l, t.empresaT, 1)}
<section class="a-int">
  <div class="a-cont a-emp">
    <div class="a-emp-txt">
      ${t.empresaP.map(p => `<p>${esc(p)}</p>`).join('\n      ')}
      <ul class="a-atua">${t.atua.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>
    <figure class="a-emp-foto" data-rev>${foto('trigo', l === 'pt' ? 'Lavoura de trigo' : l === 'en' ? 'Wheat field' : 'Campo de trigo')}<figcaption>${E.desde}</figcaption></figure>
  </div>
</section>
<section class="a-mvv">
  <div class="a-cont a-tres-in">
    <article class="a-col verde" data-rev><h2 class="a-barra">${t.missao}</h2><p>${esc(t.missaoT)}</p></article>
    <article class="a-col laranja" data-rev style="--d:120ms"><h2 class="a-barra">${t.visao}</h2><p>${esc(t.visaoT)}</p></article>
    <article class="a-col vermelho" data-rev style="--d:240ms"><h2 class="a-barra">${t.valores}</h2><ul class="a-valores">${t.valoresL.map(x => `<li>${esc(x)}</li>`).join('')}</ul></article>
  </div>
</section>
<section class="a-feiras-sec">
  <div class="a-cont">
    <div class="a-cab"><h2 class="a-tit">${t.feirasT}</h2><p class="a-sub">${esc(t.feirasSub)}</p></div>
    ${linhaFeirasA(l)}
  </div>
</section>`;
  return paginaA(l, 'empresa', cam, `${t.empresaT} · Burmann Alimentos`, t.empresaP[0].slice(0, 155), corpo);
}

function produtosA(l) {
  const t = T[l]; const b = base('a', l); const cam = 'produtos/';
  const corpo = `${tituloInternoA(l, t.produtosT, 1)}
<section class="a-int">
  <div class="a-cont">
    <p class="a-lead">${esc(t.produtosSub)}</p>
    <nav class="a-fam-nav">${familias.map(f => `<a href="#${f.slug}">${esc(f.nome[l])} <small>${doFam(f.slug).length}</small></a>`).join('')}</nav>
    ${familias.map(f => `<section class="a-fam" id="${f.slug}">
      <header><h2>${esc(f.nome[l])}</h2><a class="a-link" href="${b}produtos/${f.slug}/">${t.produtosN(doFam(f.slug).length)} ${ic('seta')}</a></header>
      <ul class="a-grade">${doFam(f.slug).map(p => `<li><a href="${b}produtos/${f.slug}/#p${p.img}">${grao(p, l)}<span>${esc(p.nome[l])}</span></a></li>`).join('')}</ul>
    </section>`).join('\n    ')}
    <p class="a-nao">${t.naoEncontrou} <a href="${b}contato/">${t.envie}</a>.</p>
  </div>
</section>`;
  return paginaA(l, 'produtos', cam, `${t.produtosT} · Burmann Alimentos`, t.produtosSub, corpo);
}

function familiaA(l, f) {
  const t = T[l]; const b = base('a', l); const cam = `produtos/${f.slug}/`;
  const lista = doFam(f.slug);
  const corpo = `<section class="a-fam-topo">
  ${fotoFam(f, l, ' class="a-fam-topo-img"', '100vw')}
  <div class="a-cont a-fam-topo-in">
    <p class="a-migalha"><a href="${b}produtos/">${t.produtosT}</a> / ${esc(f.nome[l])}</p>
    <h1>${esc(f.nome[l])}</h1>
    <p>${esc(f.texto[l])}</p>
  </div>
</section>
<section class="a-int">
  <div class="a-cont">
    <ul class="a-fichas">${lista.map(p => `<li id="p${p.img}" data-rev><span class="a-prato g">${grao(p, l)}</span><div><h2>${esc(p.nome[l])}</h2><p>${langs.filter(x => x !== l).map(x => `<span lang="${langHtml[x]}">${esc(p.nome[x])}</span>`).join(' · ')}</p><a href="${b}contato/?produto=${encodeURIComponent(p.nome[l])}">${t.cotacao} ${ic('seta')}</a></div></li>`).join('')}</ul>
    <h2 class="a-outras">${t.outras}</h2>
    <nav class="a-fam-nav">${familias.filter(x => x !== f).map(x => `<a href="${b}produtos/${x.slug}/">${esc(x.nome[l])} <small>${doFam(x.slug).length}</small></a>`).join('')}<a href="${b}produtos/">${t.voltar}</a></nav>
  </div>
</section>`;
  return paginaA(l, 'produtos', cam, `${f.nome[l]} · Burmann Alimentos`, f.texto[l], corpo);
}

function contatoA(l) {
  const t = T[l]; const cam = 'contato/';
  const corpo = `${tituloInternoA(l, t.contatoPg, 5)}
<section class="a-int">
  <div class="a-cont a-ct">
    <div class="a-ct-dados">
      <p class="a-dest vermelho-t">${esc(t.contatoDestaque)}</p>
      <dl>
        <dt>${ic('pin')} ${t.endereco}</dt><dd><strong>${E.razao}</strong><br>${enderecoHtml(l)}<br><a href="${E.mapa}" target="_blank" rel="noopener">${t.verMapa}</a></dd>
        <dt>${ic('tel')} ${t.telefone}</dt><dd><a href="tel:${E.telHref}">${E.tel}</a></dd>
        <dt>${ic('fax')} ${t.fax}</dt><dd>${E.fax}</dd>
        ${E.contatos.map(c => `<dt>${ic('mail')} ${esc(c.papel[l])}</dt><dd><strong>${esc(c.nome)}</strong><br><a href="mailto:${c.email}">${c.email}</a></dd>`).join('\n        ')}
      </dl>
    </div>
    <div class="a-ct-form">
      <h2>${t.contatoTexto.split('.')[0]}.</h2>
      ${formulario(l, 'form a-form')}
    </div>
  </div>
</section>
<figure class="a-ct-foto">${foto('poa', 'Porto Alegre', '', 1800, 1010, '100vw')}</figure>`;
  return paginaA(l, 'contato', cam, `${t.contatoPg} · Burmann Alimentos`, t.contatoTexto, corpo);
}

// =====================================================================
// Versão B · Corretora
// =====================================================================
function topoB(l, atual, cam) {
  const t = T[l];
  return `<div class="b-faixa-top"><div class="b-cont"><span>${t.atua.join(' · ')}</span><a href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a>${trocaIdioma('b', l, cam, 'b-idiomas')}</div></div>
<header class="b-topo">
  <div class="b-cont b-topo-in">
    <a class="b-logo" href="${base('b', l)}"><img src="/assets/logo-claro.svg" alt="Burmann Alimentos" width="267" height="106"></a>
    <button class="b-burger" aria-expanded="false" aria-controls="b-menu" aria-label="Menu">${ic('menu')}</button>
    <nav class="b-menu" id="b-menu">${menuLinks('b', l, atual)}<a class="b-menu-cta" href="${base('b', l)}produtos/#cotacao">${t.cotacao}</a></nav>
  </div>
</header>`;
}

function rodapeB(l) {
  const t = T[l];
  return `<footer class="b-rod">
  <div class="b-cont b-rod-in">
    <div><img src="/assets/logo.svg" alt="Burmann Alimentos" width="190" height="75" loading="lazy"><p class="b-rod-desde">${t.atua.join(' · ')} · ${E.desde}</p></div>
    <div><h3>${t.endereco}</h3><p>${enderecoHtml(l)}</p></div>
    <div><h3>${t.contatoPg}</h3><p><a href="tel:${E.telHref}">${E.tel}</a><br>${E.contatos.map(c => `<a href="mailto:${c.email}">${c.email}</a>`).join('<br>')}</p></div>
    <nav>${menuLinks('b', l, '')}</nav>
  </div>
  <div class="b-cont b-rod-fim"><span>${t.direitos} © ${E.razao}</span><span>${t.creditos}</span></div>
</footer>`;
}

function paginaB(l, slug, cam, titulo, desc, corpo) {
  return `${head('b', l, cam, titulo, desc)}
<body class="vb">
<a class="pular" href="#conteudo">${l === 'pt' ? 'Pular para o conteúdo' : l === 'en' ? 'Skip to content' : 'Saltar al contenido'}</a>
${topoB(l, slug, cam)}
<main id="conteudo">
${corpo}
</main>
${rodapeB(l)}
</body>
</html>
`;
}

// Fileira de amostras (círculos sobrepostos) de uma família.
const amostras = (l, slug, max = 8) => `<span class="b-amostras">${doFam(slug).slice(0, max).map(p => `<span>${grao(p, l, ' aria-hidden="true" alt=""').replace(/alt="[^"]*" /, '')}</span>`).join('')}</span>`;

function mesaB(l) {
  const t = T[l];
  const origem = { pt: ['Pequenos produtores', 'Cooperativas de cereais', 'Importação'], en: ['Small producers', 'Grain cooperatives', 'Imports'], es: ['Pequeños productores', 'Cooperativas de cereales', 'Importación'] }[l];
  const destino = { pt: ['Distribuidores', 'Supermercados', 'Indústrias alimentícias', 'Exportação'], en: ['Distributors', 'Supermarkets', 'Food manufacturers', 'Exports'], es: ['Distribuidores', 'Supermercados', 'Industrias alimentarias', 'Exportación'] }[l];
  const cab = { pt: ['Origem', 'Burmann', 'Destino'], en: ['Origin', 'Burmann', 'Destination'], es: ['Origen', 'Burmann', 'Destino'] }[l];
  return `<div class="b-mesa" data-rev>
  <div class="b-mesa-col"><h3>${cab[0]}</h3><ul>${origem.map(x => `<li>${x}</li>`).join('')}</ul></div>
  <svg class="b-mesa-seta" viewBox="0 0 80 24" aria-hidden="true"><path d="M0 12h72M62 3l10 9-10 9" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>
  <div class="b-mesa-col b-mesa-meio"><h3>${cab[1]}</h3><ol>${t.etapas.slice(1, 3).map(([h, p]) => `<li><b>${esc(h)}</b><span>${esc(p)}</span></li>`).join('')}</ol></div>
  <svg class="b-mesa-seta" viewBox="0 0 80 24" aria-hidden="true"><path d="M0 12h72M62 3l10 9-10 9" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>
  <div class="b-mesa-col"><h3>${cab[2]}</h3><ul>${destino.map(x => `<li>${x}</li>`).join('')}</ul></div>
</div>`;
}

function rotasB(l) {
  // Linha do tempo das feiras com a distância de Porto Alegre (aprox., em linha reta).
  const km = { 2002: '10.900 km', 2004: '18.400 km', 2005: '10.800 km', 2006: '10.600 km', 2010: '10.600 km', 2013: '10.800 km' };
  const kmFmt = s => (l === 'pt' || l === 'es' ? s : s.replace('.', ','));
  return `<ol class="b-rotas" data-rev>
  <li class="b-rota-origem"><b>POA</b><span>${E.cidade}, ${T[l].pais}</span></li>
  ${feiras.map(f => `<li><b>${f.ano}</b><span class="c">${esc(f.cidade[l])}</span><span class="n">${esc(f.nome[l])}</span><small>${kmFmt(km[f.ano])}</small></li>`).join('\n  ')}
</ol>`;
}

function inicioB(l) {
  const t = T[l]; const b = base('b', l);
  const anos = new Date('2026-10-21').getFullYear() - E.desde;
  const corpo = `<section class="b-hero">
  <div class="b-cont b-hero-in">
    <div class="b-hero-txt">
      <p class="b-etq">${E.cidade} · RS · ${T[l].pais} · ${l === 'pt' ? 'desde' : l === 'en' ? 'since' : 'desde'} ${E.desde}</p>
      <h1>${esc(t.chamada)}</h1>
      <p>${esc(t.sub)}</p>
      <div class="b-bts"><a class="bt bt-pr" href="${b}produtos/">${t.verProdutos} ${ic('seta')}</a><a class="bt bt-ln" href="${b}contato/">${t.falar}</a></div>
    </div>
    <figure class="b-hero-foto">${foto('colheita', l === 'pt' ? 'Grãos saindo da colheitadeira' : l === 'en' ? 'Grain pouring from a combine' : 'Granos saliendo de la cosechadora', ' fetchpriority="high" loading="eager"')}
      <figcaption>${t.atua.map(x => `<span>${esc(x)}</span>`).join('')}</figcaption>
    </figure>
  </div>
  <div class="b-cont">
    <ul class="b-numeros">
      <li><b data-conta>${anos}</b><span>${t.anos}</span></li>
      <li><b data-conta>${produtos.length}</b><span>${t.produtosNum}</span></li>
      <li><b data-conta>${feiras.length}</b><span>${t.feirasNum}</span></li>
      <li><b>3</b><span>${t.idiomasNum}: PT · EN · ES</span></li>
    </ul>
  </div>
</section>

<section class="b-quem">
  <div class="b-cont b-quem-in">
    <h2 class="b-tit">${t.quem}</h2>
    <div>
      <p class="b-grande">${esc(t.quemDestaque)}</p>
      <p>${esc(t.empresaP[0])}</p>
      <a class="b-link" href="${b}empresa/">${t.saibaMais} ${ic('seta')}</a>
    </div>
  </div>
</section>

<section class="b-escuro">
  <div class="b-cont">
    <h2 class="b-tit">${t.etapasT}</h2>
    <p class="b-sub">${t.etapasSub}</p>
    ${mesaB(l)}
  </div>
</section>

<section class="b-cat">
  <div class="b-cont">
    <div class="b-cab"><h2 class="b-tit">${t.nossos}</h2><p class="b-sub">${t.mostruarioSub}</p></div>
    <ul class="b-fams">${familias.map((f, i) => `<li data-rev style="--d:${i * 70}ms"><a href="${b}produtos/${f.slug}/"><span class="b-fams-n">${String(i + 1).padStart(2, '0')}</span><span class="b-fams-t"><b>${esc(f.nome[l])}</b><small>${t.produtosN(doFam(f.slug).length)}</small></span>${amostras(l, f.slug)}${ic('seta', 'ic b-fams-s')}</a></li>`).join('')}</ul>
    <p class="b-nao">${t.naoEncontrou} <a href="${b}contato/">${t.envie}</a>.</p>
  </div>
</section>

<section class="b-feiras">
  <div class="b-cont">
    <div class="b-cab"><h2 class="b-tit">${t.feirasT}</h2><p class="b-sub">${esc(t.feirasSub)}</p></div>
    ${rotasB(l)}
  </div>
</section>

<section class="b-navio">
  <div class="b-cont b-navio-in">
    <figure data-rev>${foto('navio', l === 'pt' ? 'Navio graneleiro carregando em terminal de grãos' : l === 'en' ? 'Bulk carrier loading at a grain terminal' : 'Buque granelero cargando en una terminal de granos', '', 1800, 1200)}</figure>
    <div>
      <h2 class="b-tit">${t.contatoT}</h2>
      <p class="b-grande">${esc(t.contatoDestaque)}</p>
      <ul class="b-mesas">${E.contatos.map(c => `<li><small>${esc(c.papel[l])}</small><b>${esc(c.nome)}</b><a href="mailto:${c.email}">${c.email}</a></li>`).join('')}</ul>
      <p><a class="bt bt-pr" href="${b}contato/">${t.entrarContato} ${ic('seta')}</a></p>
    </div>
  </div>
</section>`;
  return paginaB(l, 'index', '', t.titulo, t.descricao, corpo);
}

function empresaB(l) {
  const t = T[l]; const cam = 'empresa/';
  const corpo = `<section class="b-int-topo">
  <div class="b-cont b-int-topo-in">
    <div><p class="b-etq">${E.desde} · ${E.cidade}</p><h1>${t.empresaT}</h1><p class="b-grande">${esc(t.quemDestaque)}</p></div>
    <figure>${foto('trigo', l === 'pt' ? 'Lavoura de trigo' : l === 'en' ? 'Wheat field' : 'Campo de trigo', ' fetchpriority="high" loading="eager"')}</figure>
  </div>
</section>
<section class="b-sec">
  <div class="b-cont b-emp">
    <ul class="b-atua">${t.atua.map((x, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${esc(x)}</li>`).join('')}</ul>
    <div class="b-emp-txt">${t.empresaP.map(p => `<p>${esc(p)}</p>`).join('')}</div>
  </div>
</section>
<section class="b-escuro">
  <div class="b-cont b-mvv">
    <div><h2>${t.missao}</h2><p>${esc(t.missaoT)}</p></div>
    <div><h2>${t.visao}</h2><p>${esc(t.visaoT)}</p></div>
    <div><h2>${t.valores}</h2><ul>${t.valoresL.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
  </div>
</section>
<section class="b-feiras">
  <div class="b-cont">
    <div class="b-cab"><h2 class="b-tit">${t.feirasT}</h2><p class="b-sub">${esc(t.feirasSub)}</p></div>
    ${rotasB(l)}
  </div>
</section>`;
  return paginaB(l, 'empresa', cam, `${t.empresaT} · Burmann Alimentos`, t.empresaP[0].slice(0, 155), corpo);
}

// Catálogo em tabela: nome nos três idiomas (para importadores), filtro por família, busca e lista de cotação.
function tabelaB(l, lista, comFiltro) {
  const t = T[l]; const b = base('b', l);
  const busca = { pt: 'Buscar produto', en: 'Search product', es: 'Buscar producto' }[l];
  const cab = { pt: ['Produto', 'Família', 'Cotação'], en: ['Product', 'Family', 'Quote'], es: ['Producto', 'Familia', 'Cotización'] }[l];
  const outros = langs.filter(x => x !== l);
  return `<div class="b-catalogo" data-catalogo data-email="${E.contatos[l === 'pt' ? 0 : 1].email}" data-msg="${esc(t.cotacaoMsg)}" data-rotulo0="${esc(t.cotacaoSel(0))}" data-rotulo1="${esc(t.cotacaoSel(1))}" data-rotulon="${esc(t.cotacaoSel(2))}">
  ${comFiltro ? `<div class="b-filtros">
    <label class="b-busca">${ic('lupa')}<input type="search" placeholder="${busca}" aria-label="${busca}" data-busca></label>
    <div class="b-chips" role="group"><button aria-pressed="true" data-fam="">${t.todos} <small>${produtos.length}</small></button>${familias.map(f => `<button aria-pressed="false" data-fam="${f.slug}">${esc(f.nome[l])} <small>${doFam(f.slug).length}</small></button>`).join('')}</div>
  </div>` : ''}
  <table class="b-tab">
    <thead><tr><th scope="col" colspan="2">${cab[0]}</th>${outros.map(x => `<th scope="col" class="b-tab-l">${langNome[x]}</th>`).join('')}<th scope="col" class="b-tab-f">${cab[1]}</th><th scope="col" class="b-tab-c">${cab[2]}</th></tr></thead>
    <tbody>${lista.map(p => `<tr id="p${p.img}" data-f="${p.fam}" data-t="${esc(langs.map(x => p.nome[x]).join(' ').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase())}">
      <td class="b-tab-img">${grao(p, l)}</td><th scope="row">${esc(p.nome[l])}</th>${outros.map(x => `<td class="b-tab-l" lang="${langHtml[x]}">${esc(p.nome[x])}</td>`).join('')}<td class="b-tab-f"><a href="${b}produtos/${p.fam}/">${esc(fam(p.fam).nome[l])}</a></td><td class="b-tab-c"><label><input type="checkbox" value="${esc(p.nome[l])}"><span class="sr">${t.cotacao}: ${esc(p.nome[l])}</span></label></td></tr>`).join('\n    ')}</tbody>
  </table>
  <div class="b-cot" id="cotacao"><span data-cot-lista></span><a class="bt bt-pr" data-cot href="mailto:${E.contatos[0].email}">${t.cotacaoSel(0)} ${ic('mail')}</a></div>
</div>`;
}

function produtosB(l) {
  const t = T[l]; const cam = 'produtos/';
  const corpo = `<section class="b-int-cab">
  <div class="b-cont"><p class="b-etq">${t.produtosN(produtos.length)} · PT · EN · ES</p><h1>${t.produtosT}</h1><p class="b-grande">${esc(t.produtosSub)}</p></div>
</section>
<section class="b-sec b-sec-cat">
  <div class="b-cont">${tabelaB(l, produtos, true)}
  <p class="b-nao">${t.naoEncontrou} <a href="${base('b', l)}contato/">${t.envie}</a>.</p></div>
</section>`;
  return paginaB(l, 'produtos', cam, `${t.produtosT} · Burmann Alimentos`, t.produtosSub, corpo);
}

function familiaB(l, f) {
  const t = T[l]; const b = base('b', l); const cam = `produtos/${f.slug}/`;
  const lista = doFam(f.slug);
  const i = familias.indexOf(f);
  const corpo = `<section class="b-int-topo">
  <div class="b-cont b-int-topo-in">
    <div><p class="b-etq"><a href="${b}produtos/">${t.produtosT}</a> · ${String(i + 1).padStart(2, '0')} / ${String(familias.length).padStart(2, '0')}</p><h1>${esc(f.nome[l])}</h1><p class="b-grande">${esc(f.texto[l])}</p></div>
    <figure>${fotoFam(f, l, ' fetchpriority="high" loading="eager"')}</figure>
  </div>
</section>
<section class="b-sec">
  <div class="b-cont">
    <ul class="b-amostra-grade">${lista.map(p => `<li data-rev><span class="b-amostra-img">${grao(p, l)}</span><b>${esc(p.nome[l])}</b>${langs.filter(x => x !== l).map(x => `<small lang="${langHtml[x]}">${x.toUpperCase()} · ${esc(p.nome[x])}</small>`).join('')}</li>`).join('')}</ul>
  </div>
</section>
<section class="b-sec b-sec-cat">
  <div class="b-cont"><h2 class="b-tit">${t.cotacao}</h2>${tabelaB(l, lista, false)}</div>
</section>
<section class="b-sec b-outras">
  <div class="b-cont"><h2 class="b-tit">${t.outras}</h2>
  <ul class="b-fams">${familias.filter(x => x !== f).map(x => `<li><a href="${b}produtos/${x.slug}/"><span class="b-fams-n">${String(familias.indexOf(x) + 1).padStart(2, '0')}</span><span class="b-fams-t"><b>${esc(x.nome[l])}</b><small>${t.produtosN(doFam(x.slug).length)}</small></span>${amostras(l, x.slug, 6)}${ic('seta', 'ic b-fams-s')}</a></li>`).join('')}</ul></div>
</section>`;
  return paginaB(l, 'produtos', cam, `${f.nome[l]} · Burmann Alimentos`, f.texto[l], corpo);
}

function contatoB(l) {
  const t = T[l]; const cam = 'contato/';
  const corpo = `<section class="b-int-cab">
  <div class="b-cont"><p class="b-etq">${E.cidade} · RS · ${T[l].pais}</p><h1>${t.contatoPg}</h1><p class="b-grande">${esc(t.contatoTexto)}</p></div>
</section>
<section class="b-sec">
  <div class="b-cont b-ct">
    <div>
      <ul class="b-mesas b-mesas-g">${E.contatos.map(c => `<li><small>${esc(c.papel[l])}</small><b>${esc(c.nome)}</b><a href="mailto:${c.email}">${ic('mail')} ${c.email}</a></li>`).join('')}</ul>
      <dl class="b-ct-dl">
        <div><dt>${t.endereco}</dt><dd>${E.razao}<br>${enderecoHtml(l)}<br><a href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} ${t.verMapa}</a></dd></div>
        <div><dt>${t.telefone}</dt><dd><a href="tel:${E.telHref}">${E.tel}</a></dd></div>
        <div><dt>${t.fax}</dt><dd>${E.fax}</dd></div>
      </dl>
    </div>
    ${formulario(l, 'form b-form')}
  </div>
</section>
<section class="b-poa">${foto('poa', 'Porto Alegre', '', 1800, 1010, '100vw')}</section>`;
  return paginaB(l, 'contato', cam, `${t.contatoPg} · Burmann Alimentos`, t.contatoTexto, corpo);
}

// ---------- saída ----------
export function gerarVersao(v) {
  const out = {};
  for (const l of langs) {
    const pre = l === 'pt' ? '' : `${l}/`;
    const F = v === 'a' ? { inicio: inicioA, empresa: empresaA, produtos: produtosA, familia: familiaA, contato: contatoA }
      : { inicio: inicioB, empresa: empresaB, produtos: produtosB, familia: familiaB, contato: contatoB };
    out[`${pre}index`] = F.inicio(l);
    out[`${pre}empresa`] = F.empresa(l);
    out[`${pre}produtos`] = F.produtos(l);
    for (const f of familias) out[`${pre}produtos/${f.slug}`] = F.familia(l, f);
    out[`${pre}contato`] = F.contato(l);
  }
  return out;
}
