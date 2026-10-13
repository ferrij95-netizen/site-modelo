// Peças comuns às duas versões: documento com SEO, topo, rodapé, ícones e cartões de produto.
import { site, menu, marcas, categorias, produtos, marca, categoria, tipoNome } from './conteudo.mjs';

export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;
export const linkDe = v => slug => (/^https?:|^mailto:|^tel:|^#/.test(slug) ? slug : `/${v}/${slug === 'index' ? '' : slug + '/'}`);
export const ext = 'target="_blank" rel="noopener"';

const P = {
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  baixo: '<path d="m6 9 6 6 6-6"/>',
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  doc: '<path d="M7 3h7l5 5v13H7Z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
  baixar: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  busca: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  carrinho: '<path d="M3 4h2l2.4 11h10.2L20 8H6.3"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/>',
  predio: '<path d="M4 21V5l8-2v18M12 9h8v12M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2"/>',
  pessoas: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14c3 0 5 2.2 5 5"/>',
  caminhao: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  fabrica: '<path d="M3 21V11l5 3V11l5 3V7h3l1-4h2l1 4v14Z"/><path d="M7 18h2M12 18h2"/>',
  casa: '<path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',
  folha: '<path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z"/><path d="M5 19 13 11"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  escudo: '<path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fechar: '<path d="M6 6l12 12M18 6 6 18"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  reciclo: '<path d="M7 9a6 6 0 0 1 10-2l1.5 1.5M18.5 4v4.5H14M17 15a6 6 0 0 1-10 2L5.5 15.5M5.5 20v-4.5H10"/>',
  trofeu: '<path d="M8 4h8v5a4 4 0 0 1-8 0Z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M9 17h6"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z"/>',
  instagram: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r=".6"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
};
export const ico = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;

// O "G" do logo em quartos de círculo, como nas páginas do site atual.
export const arcoG = (cls = '') => `<svg class="arco ${cls}" viewBox="0 0 200 200" aria-hidden="true"><path d="M200 0A200 200 0 0 0 0 200h80A120 120 0 0 1 200 80Z" fill="currentColor"/></svg>`;

const FONTES = {
  a: 'family=Nunito:wght@600;700;800;900&family=Inter:wght@400;500;600;700',
  b: 'family=Rubik:wght@500;600;700;800&family=Inter:wght@400;500;600;700',
};

export function doc({ v, slug, titulo, desc, corpo, cls = '' }) {
  const url = `${site.dominio}/${v}/${slug === 'index' ? '' : slug + '/'}`;
  const t = slug === 'index' ? `GTEX · Produtos de limpeza mais amados dos lares brasileiros` : `${titulo} · GTEX`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="GTEX">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(t)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.dominio}/assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(t)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${site.dominio}/assets/og-${v}.jpg">
<meta name="theme-color" content="${v === 'a' ? '#e6636f' : '#1f5aa6'}">
<link rel="icon" href="/assets/img/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${FONTES[v]}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v} ${cls}">
${topo({ v, slug })}
<main id="conteudo">
${corpo}
</main>
${rodape({ v })}
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

export function topo({ v, slug }) {
  const L = linkDe(v);
  const base = slug.split('/')[0];
  const naProdutos = base === 'produtos' || marcas.some(m => m.id === base) || categorias.some(c => c.id === base);
  const ativo = s => ((s === base || (s === 'produtos' && naProdutos)) ? ' aria-current="page"' : '');
  const mega = `<div class="mm"><div class="mm-in">
      <div class="mm-col"><span class="mm-t">Nossas marcas</span><div class="mm-marcas">${marcas.map(m => `<a href="${L(m.id)}" title="${m.nome}">${img(m.logo, m.nome)}</a>`).join('')}</div></div>
      <div class="mm-col"><span class="mm-t">Categorias</span>${categorias.map(c => `<a class="mm-cat" href="${L(c.id)}">${img(c.foto, '')}<span>${c.nome}<small>${produtos.filter(p => p.cat === c.id).length} produtos</small></span></a>`).join('')}</div>
      <a class="mm-todos" href="${L('produtos')}">Ver todos os ${produtos.length} produtos ${ico('seta')}</a>
    </div></div>`;
  const item = ([s, t, sub]) => {
    if (s === 'produtos') return `<div class="tem-sub mega"><a href="${L(s)}"${ativo(s)}>${t} ${ico('baixo', 'sb')}</a>${mega}</div>`;
    if (sub) return `<div class="tem-sub"><button type="button" class="${sub.some(([x]) => x === base) ? 'on' : ''}">${t} ${ico('baixo', 'sb')}</button><div class="dd">${sub.map(([x, n]) => `<a href="${L(x)}"${ativo(x)}>${n}</a>`).join('')}</div></div>`;
    return `<a href="${L(s)}"${ativo(s)}>${t}</a>`;
  };
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo" data-topo>
  <div class="wrap">
    <a class="logo" href="${L('index')}" aria-label="GTEX, início"><img src="/assets/img/logo-gtex.webp" alt="GTEX" width="490" height="136"></a>
    <nav class="nav" id="nav" aria-label="Principal">
      ${menu.map(item).join('\n      ')}
      <a class="btn nav-cta" href="${L('onde-comprar')}">${ico('carrinho')} Onde comprar</a>
    </nav>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav" aria-label="Abrir menu">${ico('menu')}</button>
  </div>
</header>`;
}

export function rodape({ v }) {
  const L = linkDe(v);
  return `<footer class="rodape">
  <div class="wrap r-grid">
    <div class="r-marca">
      <img src="/assets/img/logo-gtex.webp" alt="GTEX" width="150" height="42" loading="lazy">
      <p>A GTEX é o seu grupo de confiança em cuidados com o lar. Com os produtos mais amados do país, nosso objetivo é estar presente em todos os lares brasileiros.</p>
      <div class="redes">${site.redes.map(([n, u]) => `<a href="${u}" ${ext} aria-label="${n}">${ico(n.toLowerCase())}</a>`).join('')}</div>
    </div>
    <div><h3>Menu rápido</h3><ul>
      <li><a href="${L('index')}">Home</a></li><li><a href="${L('quem-somos')}">Sobre a GTEX</a></li><li><a href="${L('produtos')}">Produtos</a></li>
      <li><a href="${L('trabalhe-conosco')}">Trabalhe conosco</a></li><li><a href="${L('contato')}">Contato</a></li><li><a href="${L('onde-comprar')}">Onde comprar</a></li>
      <li><a href="${L('fds')}">FDS</a> · <a href="${L('download')}">Download</a> · <a href="${L('catalogos')}">Catálogos</a></li></ul></div>
    <div><h3>Nossas marcas</h3><ul>${marcas.map(m => `<li><a href="${L(m.id)}">${m.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="r-contato">
      <li><a href="tel:${site.foneHref}">${ico('fone')}${site.fone}</a></li>
      <li><a href="mailto:${site.email}">${ico('mail')}${site.email}</a></li></ul>
      <h3 class="r-lgpd">LGPD</h3>
      <p class="r-mini">Encarregado de dados: ${site.lgpd.empresa}<br>Responsável: ${site.lgpd.nome} · EXIN ${site.lgpd.exin}<br><a href="mailto:${site.lgpd.email}">${site.lgpd.email}</a></p>
    </div>
  </div>
  <div class="wrap r-base">
    <span>© 2026 GTEX. Todos os direitos reservados.</span>
    <span><a href="https://www.gtexbrasil.com.br/politica-de-privacidade/" ${ext}>Política de Privacidade</a> · <a href="https://www.gtexbrasil.com.br/politica-de-cookies/" ${ext}>Política de Cookies</a></span>
  </div>
</footer>`;
}

// Cartão de produto (catálogo, marcas, categorias). Leva dados para o filtro do catálogo.
export function cartao(p, v, { h = 'h3' } = {}) {
  const L = linkDe(v);
  const m = marca(p.marca);
  const e = p.emb[0];
  return `<article class="pc" style="--mc:${m.cor};--mc2:${m.cor2}" data-marca="${p.marca}" data-cat="${p.cat}" data-tipo="${p.tipo}" data-busca="${esc((p.nome + ' ' + m.nome + ' ' + tipoNome(p.tipo) + ' ' + categoria(p.cat).nome + ' ' + p.emb.map(x => x.r).join(' ')).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase())}">
  <a href="${L('produtos/' + p.slug)}">
    <span class="pc-foto">${img(e.img, p.nome + ' ' + e.r, 'width="640" height="559"')}${p.novo ? '<span class="pc-novo">Novo</span>' : ''}</span>
    <span class="pc-info">
      <span class="pc-marca">${m.nome} · ${tipoNome(p.tipo)}</span>
      <${h} class="pc-nome">${esc(p.nome)}</${h}>
      <span class="pc-emb">${p.emb.slice(0, 3).map(x => `<span>${esc(x.r)}</span>`).join('')}${p.emb.length > 3 ? `<span>+${p.emb.length - 3}</span>` : ''}</span>
    </span>
  </a>
</article>`;
}

export const pdf = caminho => 'https://www.gtexbrasil.com.br/wp-content/uploads/' + caminho;
