// Monta as páginas das versões A ("Clínica", clara, mosaico com o desenho do símbolo) e B ("Rede de gases", azul,
// caminho do gás no hospital), em pt, en e es. As páginas internas usam o mesmo conteúdo; muda o topo, a home e o estilo
// (public/assets/base.css + a.css ou b.css).
import { empresa as E, catalogo, documentos, eventos, slugs, destaques, gases, caminho, ambientes, T } from './conteudo.mjs';

export const nomesVersao = { a: 'Clínica', b: 'Rede de gases' };
const LANGS = ['pt', 'en', 'es'];
const pre = L => (L === 'pt' ? '' : `${L}/`);

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const par = s => esc(s).split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
const foto = (n, alt, extra = '') => `<img src="/assets/img/p/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
for (const p of catalogo.produtos) p.pt.desc = p.pt.desc.replace('umidifcadores', 'umidificadores');
const porId = Object.fromEntries(catalogo.produtos.map(p => [p.id, p]));
const whats = L => `https://wa.me/${E.vendasWhatsHref}?text=${encodeURIComponent(T[L].whatsMsg)}`;

const I = {
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  pdf: '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/><path d="M9 14h6M9 17h4"/>',
  baixar: '<path d="M12 4v11M7 10l5 5 5-5"/><path d="M5 19h14"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  baixo: '<path d="M6 9l6 6 6-6"/>',
  whats: '<path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z"/><path d="M8.5 8.5c.3 2.6 2.4 5 5 5.6l1.3-1.3 2 1c-.3 1.2-1.4 1.9-2.6 1.7-3.6-.6-6.4-3.5-6.9-7.1-.2-1.2.6-2.3 1.8-2.5l1 2z"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  pessoas: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2c3 .2 5.5 2.6 5.5 5.8"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const redeIc = {
  Facebook: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" fill="currentColor" stroke="none"/>',
  Instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
  LinkedIn: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 10v7"/>',
  YouTube: '<path d="M22 8.2a3 3 0 00-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 002 8.2 31 31 0 001.6 12 31 31 0 002 15.8a3 3 0 002.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 002.1-2.1 31 31 0 00.4-3.8 31 31 0 00-.4-3.8zM10 15V9l5.2 3z" fill="currentColor" stroke="none"/>',
};
const redes = () => E.redes.map(r => `<a href="${r.url}" target="_blank" rel="noopener" aria-label="${r.nome}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${redeIc[r.nome]}</svg></a>`).join('');
// Bandeiras como no site atual (Brasil, Espanha, Reino Unido), em SVG.
const bandeira = {
  pt: '<svg viewBox="0 0 28 20"><rect width="28" height="20" fill="#229e45"/><path d="M14 3l10 7-10 7-10-7z" fill="#f8e509"/><circle cx="14" cy="10" r="4" fill="#2b49a3"/><path d="M10.2 9.2c2.6-.5 5.3.1 7.6 1.6" stroke="#fff" stroke-width=".8" fill="none"/></svg>',
  es: '<svg viewBox="0 0 28 20"><rect width="28" height="20" fill="#c60b1e"/><rect y="5" width="28" height="10" fill="#ffc400"/></svg>',
  en: '<svg viewBox="0 0 28 20"><rect width="28" height="20" fill="#012169"/><path d="M0 0l28 20M28 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l28 20M28 0L0 20" stroke="#c8102e" stroke-width="1.6"/><path d="M14 0v20M0 10h28" stroke="#fff" stroke-width="6"/><path d="M14 0v20M0 10h28" stroke="#c8102e" stroke-width="3.4"/></svg>',
};

// ---------- endereços ----------
const raiz = (v, L) => `/${v}/${pre(L)}`;
const link = (v, L, chave, resto = '') => `${raiz(v, L)}${chave ? `${slugs[L][chave]}/` : ''}${resto}`;
const nomeCat = (lista, id, L) => (lista.find(c => c.id === id) || {})[L] || id;
const contar = cat => catalogo.produtos.filter(p => p.cats.includes(cat)).length;
// Foto de capa de cada linha (produtos reais da linha).
const capaLinha = { anestesia: '549', pressao: '12', emergencia: '72', gases: '54', respiratoria: '29' };

// ---------- moldura ----------
function head(v, L, pagina, titulo, descricao, alternos) {
  const t = T[L];
  const fontes = v === 'a'
    ? 'family=Barlow:wght@500;600;700&family=Inter:wght@400;500;600'
    : 'family=Barlow+Semi+Condensed:wght@500;600;700&family=Barlow:wght@500;600&family=Inter:wght@400;500;600';
  const hl = LANGS.map(l => `<link rel="alternate" hreflang="${T[l].lang}" href="${E.url.replace(/\/$/, '')}${alternos[l]}">`).join('');
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${E.url.replace(/\/$/, '')}${alternos[L]}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta name="robots" content="noindex">
${hl}
<link rel="icon" href="/assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontes}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>
<body class="v-${v} pg-${pagina}">`;
}

function topo(v, L, ativo, alternos) {
  const t = T[L]; const m = t.menu;
  const sub = (itens) => `<div class="sub">${itens.map(([h, n]) => `<a href="${h}">${esc(n)}</a>`).join('')}</div>`;
  const grupo = (chave, nome, itens) => `<li class="tem-sub${ativo === chave ? ' ativo' : ''}"><button type="button" aria-expanded="false">${esc(nome)}${ic('baixo', 'ic-p')}</button>${sub(itens)}</li>`;
  const item = (chave, nome, h) => `<li${ativo === chave ? ' class="ativo"' : ''}><a href="${h}">${esc(nome)}</a></li>`;
  const prodItens = [[link(v, L, 'produtos'), m.todosProd], ...catalogo.catsP.map(c => [link(v, L, 'produtos', `?linha=${c.id}`), c[L]]), [link(v, L, 'acessorios'), m.acessorios]];
  const idiomas = LANGS.map(l => `<a href="${alternos[l]}" hreflang="${T[l].lang}" lang="${T[l].lang}" title="${T[l].bandeira}"${l === L ? ' aria-current="true"' : ''}>${bandeira[l]}<span>${l.toUpperCase()}</span></a>`).join('');
  return `<a class="pular" href="#conteudo">${L === 'en' ? 'Skip to content' : L === 'es' ? 'Ir al contenido' : 'Ir para o conteúdo'}</a>
<div class="faixa">
  <div class="faixa-in">
    <p><strong>${esc(t.vendas)}</strong> <a href="https://wa.me/${E.vendasWhatsHref}">${E.vendasWhats}</a> <span class="sep">·</span> <a href="tel:${E.vendasFoneHref}">${E.vendasFone}</a> <span class="sep">·</span> <a href="mailto:${E.emailVendas}">${E.emailVendas}</a></p>
    <p class="faixa-dir"><span class="so-pc"><strong>${esc(t.demais)}</strong> <a href="https://wa.me/${E.demaisWhatsHref}">${E.demaisWhats}</a></span><span class="idiomas">${idiomas}</span></p>
  </div>
</div>
<header class="topo">
  <div class="topo-in">
    <a class="marca" href="${raiz(v, L)}" aria-label="Unitec Hospitalar"><img src="/assets/${v === 'b' ? 'logo-branco' : 'logo'}.png" alt="Unitec Hospitalar" width="200" height="55"></a>
    <nav class="nav" aria-label="Menu">
      <ul>
        ${item('home', m.home, raiz(v, L))}
        ${grupo('empresa', m.empresa, [[link(v, L, 'empresa'), m.quem], [link(v, L, 'qualidade'), m.qualidade], [link(v, L, 'eventos'), m.eventos], [link(v, L, 'certificados'), m.certificados], [link(v, L, 'trabalhe'), m.trabalhe]])}
        ${grupo('produtos', m.produtos, prodItens)}
        ${grupo('catalogos', m.catalogos, [[link(v, L, 'catalogos', '#geral'), m.catGeral], [link(v, L, 'catalogos', '#individuais'), m.catInd]])}
        ${item('contato', m.contato, link(v, L, 'contato'))}
        ${item('sac', m.sac, link(v, L, 'sac'))}
      </ul>
    </nav>
    <form class="busca" action="${link(v, L, 'produtos')}" role="search">
      <label class="vh" for="q-topo">${esc(t.busca)}</label>
      <input id="q-topo" name="q" type="search" placeholder="${esc(t.busca)}" autocomplete="off">
      <button type="submit" aria-label="${esc(t.buscar)}">${ic('busca')}</button>
    </form>
    <a class="btn btn-orc" href="${whats(L)}" target="_blank" rel="noopener">${ic('whats')}<span>${esc(t.orcamento)}</span></a>
    <button class="burger" type="button" aria-label="Menu" aria-expanded="false">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">`;
}

function rodape(v, L) {
  const t = T[L]; const m = t.menu;
  return `</main>
<footer class="rodape">
  <div class="rod-in">
    <div class="rod-marca">
      <img src="/assets/logo-branco.png" alt="Unitec Hospitalar" width="190" height="52">
      <p>${esc(t.rodape)}</p>
      <div class="redes">${redes()}</div>
    </div>
    <div>
      <h3>${esc(m.produtos)}</h3>
      <ul>${catalogo.catsP.map(c => `<li><a href="${link(v, L, 'produtos', `?linha=${c.id}`)}">${esc(c[L])}</a></li>`).join('')}<li><a href="${link(v, L, 'acessorios')}">${esc(m.acessorios)}</a></li></ul>
    </div>
    <div>
      <h3>${esc(m.empresa)}</h3>
      <ul><li><a href="${link(v, L, 'empresa')}">${esc(m.quem)}</a></li><li><a href="${link(v, L, 'qualidade')}">${esc(m.qualidade)}</a></li><li><a href="${link(v, L, 'certificados')}">${esc(m.certificados)}</a></li><li><a href="${link(v, L, 'eventos')}">${esc(m.eventos)}</a></li><li><a href="${link(v, L, 'trabalhe')}">${esc(m.trabalhe)}</a></li><li><a href="${link(v, L, 'catalogos')}">${esc(m.catalogos)}</a></li></ul>
    </div>
    <div class="rod-contato">
      <h3>${esc(m.contato)}</h3>
      <p>${ic('tel')} PABX <a href="tel:${E.pabxHref}">+55 ${E.pabx}</a></p>
      <p>${ic('whats')} ${esc(t.vendas)} <a href="https://wa.me/${E.vendasWhatsHref}">${E.vendasWhats}</a></p>
      <p>${ic('mail')} <a href="mailto:${E.email}">${E.email}</a></p>
      <p>${ic('pin')} <a href="${E.mapa}" target="_blank" rel="noopener">${E.endereco} · ${E.bairro} · ${E.cep}</a></p>
    </div>
  </div>
  <div class="rod-base">
    <p>© 2026 · ${E.razao}</p>
    <p><a href="${E.nano}" target="_blank" rel="noopener">${esc(t.parceiro)}: Nano Incub</a></p>
  </div>
</footer>
<a class="whats-flut" href="${whats(L)}" target="_blank" rel="noopener" aria-label="WhatsApp">${ic('whats')}</a>
</body>
</html>`;
}

// ---------- pedaços ----------
const cartaoProduto = (v, L, p, extra = '') => `<a class="prod" href="${link(v, L, 'produtos', `${p.slug}/`)}" data-cats="${p.cats.join(' ')}" data-busca="${esc([p.pt.nome, p[L].nome, ...p.cod].join(' ').toLowerCase())}"${extra}>
  <span class="prod-foto">${p.img[0] ? foto(p.img[0], p[L].nome) : `<span class="sem-foto"><img src="/assets/simbolo.png" alt="" width="48" height="48">${esc(T[L].semFoto)}</span>`}</span>
  <span class="prod-txt"><span class="prod-linha">${esc(nomeCat(catalogo.catsP, p.cats[0], L))}</span><strong>${esc(p[L].nome)}</strong>${p.cod.length ? `<span class="prod-cod">${esc(p.cod.slice(0, 3).join(' · '))}${p.cod.length > 3 ? ` +${p.cod.length - 3}` : ''}</span>` : ''}</span>
</a>`;

// Mosaico com a forma do símbolo da Unitec: quatro quadrados, cada um com um canto arredondado.
const mosaico = (v, L, ids, cls = '') => `<div class="mosaico ${cls}">${ids.map((id, n) => {
  const p = porId[id];
  return `<a class="mq mq-${n + 1}" href="${link(v, L, 'produtos', `${p.slug}/`)}" aria-label="${esc(p[L].nome)}">${foto(p.img[0], p[L].nome)}</a>`;
}).join('')}</div>`;

function pagHead(v, L, titulo, sub, migalha) {
  return `<section class="ph">
  <div class="ph-in">
    ${migalha ? `<p class="migalha">${migalha}</p>` : ''}
    <h1>${esc(titulo)}</h1>
    ${sub ? `<p class="ph-sub">${esc(sub)}</p>` : ''}
  </div>
  <span class="ph-forma" aria-hidden="true"></span>
</section>`;
}

const ctaContato = (v, L) => {
  const t = T[L];
  return `<section class="cta">
  <div class="cta-in">
    <div><h2>${esc(t.contatoT)}</h2><p>${esc(t.contatoS)}</p></div>
    <div class="cta-acoes">
      <a class="btn btn-claro" href="${whats(L)}" target="_blank" rel="noopener">${ic('whats')} ${esc(t.vendas)}: ${E.vendasWhats}</a>
      <a class="btn btn-borda" href="tel:${E.pabxHref}">${ic('tel')} ${E.pabx}</a>
      <a class="btn btn-borda" href="${link(v, L, 'contato')}">${ic('mail')} ${esc(t.menu.contato)}</a>
    </div>
  </div>
</section>`;
};

// ---------- home A ----------
function homeA(v, L) {
  const t = T[L];
  const cats = catalogo.catsP;
  return `<section class="hero-a">
  <div class="hero-a-in">
    <div class="hero-a-txt">
      <p class="eyebrow">${esc(t.desde)}</p>
      <h1>${esc(t.slogan)}</h1>
      <p class="lead">${esc(t.intro)}</p>
      <div class="acoes"><a class="btn btn-azul" href="${link(v, L, 'produtos')}">${esc(t.verProdutos)} ${ic('seta')}</a><a class="btn btn-linha" href="${whats(L)}" target="_blank" rel="noopener">${ic('whats')} ${esc(t.orcamento)}</a></div>
      <ul class="selos-linha"><li>ISO 9001:2015</li><li>ISO 13485:2016</li><li>ANVISA</li><li>INMETRO</li></ul>
    </div>
    ${mosaico(v, L, ['54', '557', '29', '535'], 'mosaico-hero')}
  </div>
</section>

<section class="linhas-a">
  <div class="sec-in">
    <header class="sec-cab"><h2>${esc(t.linhas)}</h2><p>${esc(t.linhasSub)}</p></header>
    <div class="linhas-grade">
      ${cats.map((c, n) => `<a class="linha linha-${n + 1}" href="${link(v, L, 'produtos', `?linha=${c.id}`)}">
        <span class="linha-foto">${foto(porId[capaLinha[c.id]].img[0], c[L])}</span>
        <span class="linha-nome">${esc(c[L])}</span>
        <span class="linha-n">${esc(t.produtosN(contar(c.id)))} ${ic('seta')}</span>
      </a>`).join('')}
      <a class="linha linha-aces" href="${link(v, L, 'acessorios')}"><span class="linha-nome">${esc(t.menu.acessorios)}</span><span class="linha-n">${esc(t.acessoriosN(catalogo.acessorios.length))} ${ic('seta')}</span></a>
    </div>
  </div>
</section>

<section class="destaques-a">
  <div class="sec-in">
    <header class="sec-cab"><p class="eyebrow">${esc(t.destaques)}</p><h2>${esc(t.conheca)}</h2></header>
    ${destaques.map((d, n) => {
      const p = porId[d.id]; const x = d.extra && porId[d.extra];
      return `<article class="dest${n % 2 ? ' dest-inv' : ''}">
      <div class="dest-midia"><span class="dest-forma"></span>${foto(p.img[0], p[L].nome, ' class="dest-f1"')}${x ? foto(x.img[0], x[L].nome, ' class="dest-f2"') : ''}${d.selo ? `<span class="dest-selos">${d.selo.map(s => `<span>${esc(s)}</span>`).join('')}</span>` : ''}</div>
      <div class="dest-txt"><span class="dest-n">0${n + 1}</span><h3>${esc(d[L].t)}</h3><p>${esc(d[L].s)}</p><a class="link-seta" href="${link(v, L, 'produtos', `${p.slug}/`)}">${esc(t.saibaMais)} ${ic('seta')}</a></div>
    </article>`;
    }).join('')}
  </div>
</section>

<section class="gases-a">
  <div class="sec-in gases-in">
    <div class="gases-txt"><h2>${esc(t.gasesT)}</h2><p>${esc(t.gasesS)}</p></div>
    <ul class="gases-lista">${gases.map(g => `<li style="--g:${g.cor}"><span class="g-ponto">${g.sig}</span><span>${esc(g[L])}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="empresa-a">
  <div class="sec-in empresa-a-in">
    <div class="empresa-a-txt">
      <p class="eyebrow">${esc(t.menu.quem)}</p>
      <h2>${esc(t.slogan)}</h2>
      <p>${esc(t.intro2)}</p>
      <a class="link-seta" href="${link(v, L, 'empresa')}">${esc(t.menu.quem)} ${ic('seta')}</a>
    </div>
    <dl class="numeros">${t.numeros.map(([n, r]) => `<div><dt>${n}</dt><dd>${esc(r)}</dd></div>`).join('')}</dl>
  </div>
</section>

<section class="catalogo-faixa">
  <div class="sec-in cat-in">
    <img src="/assets/simbolo.png" alt="" width="72" height="72" loading="lazy">
    <div><h2>${esc(t.catalogoT)}</h2><p>${esc(t.catalogoS)}</p></div>
    <a class="btn btn-azul" href="${documentos.catGeral.url}" target="_blank" rel="noopener">${ic('baixar')} ${esc(t.baixar)}</a>
  </div>
</section>
${ctaContato(v, L)}`;
}

// ---------- home B ----------
function homeB(v, L) {
  const t = T[L];
  return `<section class="hero-b">
  <span class="hb-forma hb-f1" aria-hidden="true"></span><span class="hb-forma hb-f2" aria-hidden="true"></span>
  <div class="hero-b-in">
    <div class="hero-b-txt">
      <p class="eyebrow">${esc(t.desde)} · ISO 9001 · ISO 13485</p>
      <h1>${esc(t.slogan)}</h1>
      <p class="lead">${esc(t.intro)}</p>
      <form class="busca-hero" action="${link(v, L, 'produtos')}" role="search">
        <label class="vh" for="q-hero">${esc(t.busca)}</label>
        <input id="q-hero" name="q" type="search" placeholder="${esc(t.busca)}" autocomplete="off">
        <button class="btn btn-claro" type="submit">${ic('busca')} ${esc(t.buscar)}</button>
      </form>
      <p class="hero-b-rapido">${catalogo.catsP.map(c => `<a href="${link(v, L, 'produtos', `?linha=${c.id}`)}">${esc(c[L])}</a>`).join('')}</p>
    </div>
    <div class="hero-b-palco">
      <div class="hb-grade">
      <figure class="hb-prod hb-p1">${foto(porId['54'].img[0], porId['54'][L].nome)}</figure>
      <figure class="hb-prod hb-p2">${foto(porId['41'].img[0], porId['41'][L].nome)}</figure>
      <figure class="hb-prod hb-p3">${foto(porId['29'].img[0], porId['29'][L].nome)}</figure>
      </div>
      <p class="hb-legenda"><strong>${esc(destaques[0][L].t)}</strong><span>${esc(destaques[0][L].s)} ABNT NBR 16982 · ISO 10524-1</span></p>
    </div>
  </div>
</section>

<section class="caminho">
  <div class="sec-in">
    <header class="sec-cab"><p class="eyebrow">${esc(t.menu.produtos)}</p><h2>${esc(t.caminhoT)}</h2><p>${esc(t.caminhoS)}</p></header>
    <ol class="cam-lista">
      ${caminho.map((c, n) => {
        const p = porId[c.ids[0]];
        return `<li class="cam-etapa">
        <span class="cam-n">${n + 1}</span>
        <a class="cam-foto" href="${link(v, L, 'produtos', `${p.slug}/`)}">${foto(p.img[0], p[L].nome)}</a>
        <h3>${esc(c[L][0])}</h3>
        <p>${esc(c[L][1])}</p>
        <p class="cam-prods">${c.ids.map(id => `<a href="${link(v, L, 'produtos', `${porId[id].slug}/`)}">${esc(porId[id][L].nome)}</a>`).join('')}</p>
      </li>`;
      }).join('')}
    </ol>
  </div>
</section>

<section class="ambientes">
  <div class="sec-in">
    <header class="sec-cab sec-cab-claro"><h2>${esc(t.ambientesT)}</h2><p>${esc(t.ambientesS)}</p></header>
    <div class="amb" data-abas>
      <div class="amb-abas" role="tablist">${ambientes.map((a, n) => `<button type="button" role="tab" id="aba-${a.id}" aria-controls="amb-${a.id}" aria-selected="${n === 0}">${esc(a[L][0])}</button>`).join('')}</div>
      ${ambientes.map((a, n) => `<div class="amb-painel" role="tabpanel" id="amb-${a.id}" aria-labelledby="aba-${a.id}"${n ? ' hidden' : ''}>
        <p class="amb-desc">${esc(a[L][1])}</p>
        <div class="amb-prods">${a.ids.map(id => { const p = porId[id]; return `<a href="${link(v, L, 'produtos', `${p.slug}/`)}"><span>${foto(p.img[0], p[L].nome)}</span><strong>${esc(p[L].nome)}</strong></a>`; }).join('')}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="linhas-b">
  <div class="sec-in">
    <header class="sec-cab"><h2>${esc(t.linhas)}</h2><p>${esc(t.linhasSub)}</p></header>
    <ol class="lb-lista">
      ${catalogo.catsP.map((c, n) => `<li><a href="${link(v, L, 'produtos', `?linha=${c.id}`)}"><span class="lb-n">0${n + 1}</span><span class="lb-nome">${esc(c[L])}</span><span class="lb-qt">${esc(t.produtosN(contar(c.id)))}</span><span class="lb-foto">${foto(porId[capaLinha[c.id]].img[0], c[L])}</span>${ic('seta')}</a></li>`).join('')}
      <li><a href="${link(v, L, 'acessorios')}"><span class="lb-n">06</span><span class="lb-nome">${esc(t.menu.acessorios)}</span><span class="lb-qt">${esc(t.acessoriosN(catalogo.acessorios.length))}</span><span class="lb-foto"></span>${ic('seta')}</a></li>
    </ol>
  </div>
</section>

<section class="cert-b">
  <div class="sec-in cert-b-in">
    <div><h2>${esc(t.certT)}</h2><p>${esc(t.certS)}</p><a class="btn btn-claro" href="${link(v, L, 'certificados')}">${ic('escudo')} ${esc(t.menu.certificados)}</a></div>
    <ul class="cert-selos"><li><strong>ISO 9001</strong><span>2015</span></li><li><strong>ISO 13485</strong><span>2016</span></li><li><strong>ANVISA</strong><span>${documentos.cert.ANVISA.length} ${L === 'en' ? 'registrations' : L === 'es' ? 'registros' : 'registros'}</span></li><li><strong>INMETRO</strong><span>AD-1 · AD-2</span></li></ul>
  </div>
</section>

<section class="eventos-b">
  <div class="sec-in">
    <header class="sec-cab"><h2>${esc(t.eventosT)}</h2><p>${esc(t.eventosObrigado)}</p></header>
    <ol class="linha-tempo">${eventos.map(e => `<li><span class="lt-ano">${e.ano}</span><a href="${e.url}" target="_blank" rel="noopener">${esc(e.nome)}</a></li>`).join('')}</ol>
  </div>
</section>

<section class="catalogo-faixa">
  <div class="sec-in cat-in">
    <img src="/assets/simbolo.png" alt="" width="72" height="72" loading="lazy">
    <div><h2>${esc(t.catalogoT)}</h2><p>${esc(t.catalogoS)}</p></div>
    <a class="btn btn-azul" href="${documentos.catGeral.url}" target="_blank" rel="noopener">${ic('baixar')} ${esc(t.baixar)}</a>
  </div>
</section>
${ctaContato(v, L)}`;
}

// ---------- páginas internas ----------
function pagEmpresa(v, L) {
  const t = T[L];
  return `${pagHead(v, L, t.menu.quem, t.slogan)}
<section class="texto-sec">
  <div class="sec-in empresa-in">
    <div class="prosa">${t.quem.map(p => `<p>${esc(p)}</p>`).join('')}</div>
    <aside class="empresa-lado">
      ${mosaico(v, L, ['92', '59', '111', '12'], 'mosaico-p')}
      <ol class="marcos">${t.marcos.map(([a, d]) => `<li><strong>${a}</strong><span>${esc(d)}</span></li>`).join('')}</ol>
    </aside>
  </div>
</section>
<section class="faixa-num"><div class="sec-in"><dl class="numeros">${t.numeros.map(([n, r]) => `<div><dt>${n}</dt><dd>${esc(r)}</dd></div>`).join('')}</dl></div></section>
${ctaContato(v, L)}`;
}

function pagQualidade(v, L) {
  const t = T[L];
  return `${pagHead(v, L, t.menu.qualidade, t.politicaIntro)}
<section class="texto-sec">
  <div class="sec-in">
    <ol class="propositos">${t.politica.map((p, n) => `<li><span>${n + 1}</span><p>${esc(p)}</p></li>`).join('')}</ol>
    <div class="mvv">${[t.missao, t.visao, t.valores].map(([h, p]) => `<div><h2>${esc(h)}</h2><p>${esc(p)}</p></div>`).join('')}</div>
  </div>
</section>
<section class="catalogo-faixa"><div class="sec-in cat-in"><img src="/assets/simbolo.png" alt="" width="72" height="72" loading="lazy"><div><h2>${esc(t.certT)}</h2><p>${esc(t.certS)}</p></div><a class="btn btn-azul" href="${link(v, L, 'certificados')}">${ic('escudo')} ${esc(t.menu.certificados)}</a></div></section>
${ctaContato(v, L)}`;
}

function pagCertificados(v, L) {
  const t = T[L];
  const grupos = [['ISO', 'ISO 9001 · ISO 13485'], ['ANVISA', 'ANVISA'], ['INMETRO', 'INMETRO'], ['BPF', 'BPF']];
  return `${pagHead(v, L, t.certPag, `${t.certPagS} ${t.docPt}`.trim())}
<section class="texto-sec">
  <div class="sec-in" data-abas>
    <div class="abas" role="tablist">${grupos.map(([g, n], i) => `<button type="button" role="tab" id="aba-${g}" aria-controls="c-${g}" aria-selected="${i === 0}">${esc(n)} <small>${documentos.cert[g].length}</small></button>`).join('')}</div>
    ${grupos.map(([g], i) => `<div class="docs" role="tabpanel" id="c-${g}" aria-labelledby="aba-${g}"${i ? ' hidden' : ''}>${documentos.cert[g].map(d => {
      const m = d.nome.match(/^(.*?)\s*(ANVISA\s*\d+)$/);
      return `<a class="doc" href="${d.url}" target="_blank" rel="noopener">${ic('pdf')}<span><strong>${esc(m ? m[1] : d.nome)}</strong>${m ? `<small>${esc(m[2])}</small>` : ''}</span><em>${esc(t.abrirPdf)}</em></a>`;
    }).join('')}</div>`).join('')}
  </div>
</section>
${ctaContato(v, L)}`;
}

function pagEventos(v, L) {
  const t = T[L];
  return `${pagHead(v, L, t.eventosT, t.eventosObrigado)}
<section class="texto-sec">
  <div class="sec-in eventos-in">
    <div class="prosa"><p>${esc(t.eventosS)}</p></div>
    <ol class="linha-tempo lt-vert">${eventos.map(e => `<li><span class="lt-ano">${e.ano}</span><a href="${e.url}" target="_blank" rel="noopener">${esc(e.nome)}</a></li>`).join('')}</ol>
  </div>
</section>
${ctaContato(v, L)}`;
}

function pagTrabalhe(v, L) {
  const t = T[L];
  return `${pagHead(v, L, t.menu.trabalhe, t.trabalhe[0])}
<section class="texto-sec">
  <div class="sec-in trabalhe-in">
    <div class="prosa">${t.trabalhe.slice(1).map(p => `<p>${esc(p)}</p>`).join('')}<p><a class="btn btn-azul" href="mailto:${E.emailRh}?subject=${encodeURIComponent(t.menu.trabalhe)}">${ic('mail')} ${esc(t.enviarCurriculo)}: ${E.emailRh}</a></p></div>
    ${mosaico(v, L, ['41', '45', '27', '549'], 'mosaico-p')}
  </div>
</section>`;
}

function pagProdutos(v, L) {
  const t = T[L]; const lista = catalogo.produtos;
  return `${pagHead(v, L, t.produtosT, t.produtosS(lista.length))}
<section class="catalogo" data-filtro>
  <div class="sec-in">
    <div class="filtros">
      <div class="chips" role="group" aria-label="${esc(t.linhas)}">
        <button type="button" data-linha="" aria-pressed="true">${esc(t.todas)} <small>${lista.length}</small></button>
        ${catalogo.catsP.map(c => `<button type="button" data-linha="${c.id}" aria-pressed="false">${esc(c[L])} <small>${contar(c.id)}</small></button>`).join('')}
      </div>
      <label class="busca-cat"><span class="vh">${esc(t.busca)}</span>${ic('busca')}<input type="search" data-q placeholder="${esc(t.busca)}" autocomplete="off"></label>
    </div>
    <p class="cat-total" data-total aria-live="polite"></p>
    <div class="grade-prod">${lista.map(p => cartaoProduto(v, L, p)).join('')}</div>
    <p class="cat-vazio" data-vazio hidden>${esc(t.nenhum)}</p>
    <p class="cat-aces"><a class="link-seta" href="${link(v, L, 'acessorios')}">${esc(t.menu.todosAces)} (${catalogo.acessorios.length}) ${ic('seta')}</a></p>
  </div>
</section>`;
}

const tabelaCod = (L, p) => {
  if (!p.cod.length) return '';
  const t = T[L]; const linhas = p.rows[L];
  const cols = Math.max(...linhas.map(r => r.length));
  return `<div class="tabela-wrap"><table class="tabela">
    <thead><tr><th colspan="${cols}">${esc(t.especificacoes)}</th><th>${esc(t.codigo)}</th></tr></thead>
    <tbody>${linhas.map((r, i) => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}${r.length < cols ? `<td colspan="${cols - r.length}"></td>` : ''}<td class="cod">${esc(p.cod[i])}</td></tr>`).join('')}</tbody>
  </table></div>`;
};

function pagProduto(v, L, p) {
  const t = T[L];
  const cat = p.cats[0];
  const outros = catalogo.produtos.filter(o => o.id !== p.id && o.cats.includes(cat)).slice(0, 4);
  const mig = `<a href="${raiz(v, L)}">${esc(t.menu.home)}</a> / <a href="${link(v, L, 'produtos')}">${esc(t.menu.produtos)}</a> / <a href="${link(v, L, 'produtos', `?linha=${cat}`)}">${esc(nomeCat(catalogo.catsP, cat, L))}</a>`;
  return `<section class="ficha">
  <div class="sec-in">
    <p class="migalha">${mig}</p>
    <div class="ficha-grade">
      <div class="galeria" data-galeria>
        <div class="gal-principal">${p.img[0] ? foto(p.img[0], p[L].nome, ' data-gal-alvo') : `<span class="sem-foto"><img src="/assets/simbolo.png" alt="" width="64" height="64">${esc(t.semFoto)}</span>`}</div>
        ${p.img.length > 1 ? `<div class="gal-miniaturas">${p.img.map((n, i) => `<button type="button" data-gal="/assets/img/p/${n}.webp"${i === 0 ? ' aria-current="true"' : ''} aria-label="${i + 1}">${foto(n, '')}</button>`).join('')}</div>` : ''}
      </div>
      <div class="ficha-txt">
        <p class="eyebrow">${esc(nomeCat(catalogo.catsP, cat, L))}</p>
        <h1>${esc(p[L].nome)}</h1>
        <div class="prosa">${par(p[L].desc)}</div>
        <div class="ficha-docs">
          ${p.anvisa.length && p.anvisaPdf.length ? `<a class="doc-mini" href="${p.anvisaPdf[0]}" target="_blank" rel="noopener">${ic('escudo')} ${esc(t.anvisa)} ${esc(p.anvisa[0])}</a>` : p.anvisa.length ? `<span class="doc-mini">${ic('escudo')} ${esc(t.anvisa)} ${esc(p.anvisa[0])}</span>` : ''}
          ${p.pdf.length ? `<a class="doc-mini" href="${p.pdf[0]}" target="_blank" rel="noopener">${ic('pdf')} ${esc(t.catalogoPdf)}</a>` : ''}
        </div>
        <div class="interesse">
          <div><strong>${esc(t.interesse)}</strong><span>${esc(t.interesseS)}</span></div>
          <a class="btn btn-azul" href="https://wa.me/${E.vendasWhatsHref}?text=${encodeURIComponent(`${t.whatsMsg} ${p[L].nome}${p.cod.length ? ` (${p.cod.slice(0, 4).join(', ')})` : ''}`)}" target="_blank" rel="noopener">${ic('whats')} ${esc(t.orcamento)}</a>
        </div>
      </div>
    </div>
    ${tabelaCod(L, p)}
  </div>
</section>
${outros.length ? `<section class="outros"><div class="sec-in"><h2>${esc(t.outros)}</h2><div class="grade-prod grade-4">${outros.map(o => cartaoProduto(v, L, o)).join('')}</div><p><a class="link-seta" href="${link(v, L, 'produtos')}">${esc(t.verLinha)} ${ic('seta')}</a></p></div></section>` : ''}`;
}

function pagAcessorios(v, L) {
  const t = T[L]; const lista = catalogo.acessorios;
  const usadas = catalogo.catsA.filter(c => lista.some(a => a.cats.includes(c.id)));
  return `${pagHead(v, L, t.acessoriosT, t.acessoriosS(lista.length))}
<section class="catalogo" data-filtro>
  <div class="sec-in">
    <div class="filtros">
      <div class="chips" role="group">
        <button type="button" data-linha="" aria-pressed="true">${esc(t.todas)} <small>${lista.length}</small></button>
        ${usadas.map(c => `<button type="button" data-linha="${c.id}" aria-pressed="false">${esc(c[L])} <small>${lista.filter(a => a.cats.includes(c.id)).length}</small></button>`).join('')}
      </div>
      <label class="busca-cat"><span class="vh">${esc(t.busca)}</span>${ic('busca')}<input type="search" data-q placeholder="${esc(t.busca)}" autocomplete="off"></label>
    </div>
    <p class="cat-total" data-total aria-live="polite"></p>
    <div class="lista-aces">${lista.map(a => `<details class="aces prod" data-cats="${a.cats.join(' ')}" data-busca="${esc([a.pt.nome, a[L].nome, ...a.cod].join(' ').toLowerCase())}">
      <summary>
        <span class="aces-foto">${a.img[0] ? foto(a.img[0], a[L].nome) : '<img src="/assets/simbolo.png" alt="" width="28" height="28" class="aces-simb">'}</span>
        <span class="aces-nome"><small>${esc(nomeCat(catalogo.catsA, a.cats[0], L))}</small><strong>${esc(a[L].nome)}</strong></span>
        <span class="aces-cod">${esc(a.cod.slice(0, 2).join(' · '))}${a.cod.length > 2 ? ` +${a.cod.length - 2}` : ''}</span>
        ${ic('baixo', 'ic aces-seta')}
      </summary>
      <div class="aces-corpo">
        ${a[L].desc ? `<div class="prosa">${par(a[L].desc)}</div>` : ''}
        ${tabelaCod(L, a)}
        <a class="link-seta" href="https://wa.me/${E.vendasWhatsHref}?text=${encodeURIComponent(`${t.whatsMsg} ${a[L].nome}${a.cod.length ? ` (${a.cod.slice(0, 4).join(', ')})` : ''}`)}" target="_blank" rel="noopener">${esc(t.orcamento)} ${ic('seta')}</a>
      </div>
    </details>`).join('')}</div>
    <p class="cat-vazio" data-vazio hidden>${esc(t.nenhum)}</p>
  </div>
</section>`;
}

function pagCatalogos(v, L) {
  const t = T[L];
  return `${pagHead(v, L, t.menu.catalogos, t.catalogoS)}
<section class="texto-sec">
  <div class="sec-in">
    <a class="cat-geral" id="geral" href="${documentos.catGeral.url}" target="_blank" rel="noopener">
      ${mosaico(v, L, ['54', '29', '12', '549'], 'mosaico-p')}
      <span><small>PDF</small><strong>${esc(t.menu.catGeral)}</strong><span>${esc(t.catGeralS)}</span><em class="btn btn-azul">${ic('baixar')} ${esc(t.baixar)}</em></span>
    </a>
    <h2 class="h-sec" id="individuais">${esc(t.menu.catInd)}</h2>
    <p class="sub-sec">${esc(t.catIndS)}</p>
    <div class="docs docs-grade">${documentos.catInd.map(d => `<a class="doc" href="${d.url}" target="_blank" rel="noopener">${ic('pdf')}<span><strong>${esc(d.nome)}</strong></span><em>${esc(t.abrirPdf)}</em></a>`).join('')}</div>
  </div>
</section>`;
}

const campo = (id, rot, tipo = 'text', obrig = false, extra = '') => `<label class="campo" for="${id}"><span>${esc(rot)}${obrig ? ' *' : ''}</span>${tipo === 'textarea' ? `<textarea id="${id}" name="${id}" rows="5"${obrig ? ' required' : ''}></textarea>` : `<input id="${id}" name="${id}" type="${tipo}"${obrig ? ' required' : ''}${extra}>`}</label>`;

function pagContato(v, L) {
  const t = T[L]; const f = t.form;
  const dest = [E.email, E.email, E.emailVendas, E.email];
  return `${pagHead(v, L, t.contatoPag, t.contatoPagS)}
<section class="texto-sec">
  <div class="sec-in contato-in">
    <form class="form" data-mailto="${E.email}">
      <label class="campo" for="destinatario"><span>${esc(f.destinatario)} *</span><select id="destinatario" name="destinatario" required data-destino><option value="">${esc(f.selecione)}</option>${f.dest.map((d, i) => `<option value="${dest[i]}">${esc(d)}</option>`).join('')}</select></label>
      <div class="campos-2">${campo('empresa', f.empresa)}${campo('telefone', f.telefone, 'tel', true)}</div>
      <div class="campos-2">${campo('nome', f.nome, 'text', true)}${campo('email', f.email, 'email', true)}</div>
      <div class="campos-2">${campo('cnpj', f.cnpj)}${campo('assunto', f.assunto)}</div>
      ${campo('mensagem', f.mensagem, 'textarea', true)}
      <button class="btn btn-azul" type="submit">${ic('mail')} ${esc(f.enviar)}</button>
      <p class="form-obs">${esc(f.obs)}</p>
    </form>
    <aside class="contato-lado">
      <div class="cl-bloco"><h2>${esc(t.vendas)}</h2><p><a href="https://wa.me/${E.vendasWhatsHref}">${ic('whats')} ${E.vendasWhats}</a></p><p><a href="tel:${E.vendasFoneHref}">${ic('tel')} ${E.vendasFone}</a></p><p><a href="mailto:${E.emailVendas}">${ic('mail')} ${E.emailVendas}</a></p></div>
      <div class="cl-bloco"><h2>${esc(t.demais)}</h2><p><a href="https://wa.me/${E.demaisWhatsHref}">${ic('whats')} ${E.demaisWhats}</a></p><p><a href="tel:${E.pabxHref}">${ic('tel')} PABX ${E.pabx}</a></p><p><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></p></div>
      <div class="cl-bloco"><h2>${esc(t.endereco)}</h2><p>UNITEC Indústria e Comércio de Aparelhos Hospitalares Ltda<br>${E.endereco}<br>${E.bairro}<br>${E.cep}</p><p><a class="link-seta" href="${E.mapa}" target="_blank" rel="noopener">${esc(t.mapa)} ${ic('seta')}</a></p></div>
      <div class="cl-bloco"><h2>${esc(t.redes)}</h2><div class="redes redes-esc">${redes()}</div></div>
    </aside>
  </div>
</section>`;
}

function pagSac(v, L) {
  const t = T[L]; const f = t.form; const s = t.sacCampos;
  return `${pagHead(v, L, t.sacT, t.sacS)}
<section class="texto-sec">
  <div class="sec-in contato-in">
    <form class="form" data-mailto="${E.emailSac}">
      <fieldset class="tipo-sac"><legend>${esc(t.sacDepto)}</legend>${t.sacTipo.map((n, i) => `<label><input type="radio" name="tipo" value="${esc(n)}"${i === 0 ? ' checked' : ''} data-sac-tipo="${i}"> <span>${esc(n)}</span></label>`).join('')}</fieldset>
      <div class="campos-2">${campo('empresa', f.empresa)}${campo('cnpj', f.cnpj)}</div>
      <div class="campos-2">${campo('nome', f.nome, 'text', true)}${campo('email', f.email, 'email', true)}</div>
      <div class="campos-2">${campo('telefone', f.telefone, 'tel', true)}${campo('assunto', f.assunto, 'text', true)}</div>
      ${campo('ocorrencia', s.ocorrencia, 'textarea', true)}
      <fieldset class="dados-prod" data-sac-produto><legend>${esc(s.dados)}</legend>
        <div class="campos-3">${campo('codigo', s.cod)}${campo('lote', s.lote)}${campo('qtde', s.qtde, 'number', false, ' min="0"')}</div>
        ${campo('descricao', s.desc)}
        <div class="campos-3">${campo('aquisicao', s.aquisicao, 'date')}${campo('nf', s.nf)}${campo('inicio', s.inicio, 'date')}</div>
        ${campo('data', s.dataOc, 'date', true)}
      </fieldset>
      <button class="btn btn-azul" type="submit">${ic('mail')} ${esc(f.enviar)}</button>
      <p class="form-obs">${esc(f.obs)}</p>
    </form>
    <aside class="contato-lado">
      <div class="cl-bloco"><h2>${esc(t.menu.sac)}</h2><p><a href="mailto:${E.emailSac}">${ic('mail')} ${E.emailSac}</a></p><p><a href="https://wa.me/${E.demaisWhatsHref}">${ic('whats')} ${E.demaisWhats}</a></p><p><a href="tel:${E.pabxHref}">${ic('tel')} PABX ${E.pabx}</a></p></div>
      <div class="cl-bloco"><h2>${esc(t.endereco)}</h2><p>${E.endereco}<br>${E.bairro}<br>${E.cep}</p></div>
    </aside>
  </div>
</section>`;
}

// ---------- montagem ----------
export function gerarVersao(v) {
  const out = {};
  const paginas = [
    ['home', '', () => (v === 'a' ? homeA : homeB)],
    ['empresa', 'empresa', () => pagEmpresa], ['empresa', 'qualidade', () => pagQualidade], ['empresa', 'certificados', () => pagCertificados],
    ['empresa', 'eventos', () => pagEventos], ['empresa', 'trabalhe', () => pagTrabalhe],
    ['produtos', 'produtos', () => pagProdutos], ['produtos', 'acessorios', () => pagAcessorios],
    ['catalogos', 'catalogos', () => pagCatalogos], ['contato', 'contato', () => pagContato], ['sac', 'sac', () => pagSac],
  ];
  for (const L of LANGS) {
    const t = T[L];
    for (const [ativo, chave, fn] of paginas) {
      const alternos = Object.fromEntries(LANGS.map(l => [l, link(v, l, chave)]));
      const titulo = chave ? `${(chave === 'empresa' ? t.menu.quem : chave === 'trabalhe' ? t.menu.trabalhe : chave === 'catalogos' ? t.menu.catalogos : t.menu[chave] || chave)} | Unitec Hospitalar` : `Unitec Hospitalar | ${t.slogan}`;
      const html = head(v, L, chave || 'home', titulo, t.intro, alternos) + topo(v, L, ativo, alternos) + fn()(v, L) + rodape(v, L);
      out[`${pre(L)}${chave ? slugs[L][chave] : ''}`] = html;
    }
    for (const p of catalogo.produtos) {
      const alternos = Object.fromEntries(LANGS.map(l => [l, link(v, l, 'produtos', `${p.slug}/`)]));
      const desc = p[L].desc.replace(/\s+/g, ' ').slice(0, 155);
      out[`${pre(L)}${slugs[L].produtos}/${p.slug}`] = head(v, L, 'produto', `${p[L].nome} | Unitec Hospitalar`, desc, alternos) + topo(v, L, 'produtos', alternos) + pagProduto(v, L, p) + rodape(v, L);
    }
  }
  return out;
}
