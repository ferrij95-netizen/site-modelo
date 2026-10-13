// Peças comuns às duas versões: documento com SEO, topo com menu de produtos, rodapé, ícones e cartões.
import { site, menu, produtos, categorias } from './conteudo.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const num = i => String(i + 1).padStart(2, '0');
export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;
export const linkDe = v => slug => (/^https?:|^mailto:|^tel:/.test(slug) ? slug : `/${v}/${slug === 'index' ? '' : slug + '/'}`);
export const prod = slug => produtos.find(p => p.slug === slug);

// Ícones de traço, na cor do texto.
const P = {
  folha: '<path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z"/><path d="M5 19 13 11"/>',
  cana: '<path d="M8 21V3M16 21V3M8 8h0M8 14h0"/><path d="M5 8h6M5 14h6M13 6h6M13 12h6M13 18h6"/>',
  cubo: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
  gota: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/>',
  raio: '<path d="M13 2 4 14h7l-1 8 9-12h-7Z"/>',
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  porcao: '<path d="M4 13h16a8 8 0 0 1-16 0Z"/><path d="M9 9c0-2 1-3 1-5M14 9c0-2 1-3 1-5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  doc: '<path d="M7 3h7l5 5v13H7Z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
  baixar: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  pessoas: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14c3 0 5 2.2 5 5"/>',
  escudo: '<path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  caixa: '<path d="M3 8 12 3l9 5v8l-9 5-9-5Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  caminhao: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  planeta: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',
  usina: '<path d="M3 21V11l5 3V11l5 3V7h3l1-4h2l1 4v14Z"/><path d="M7 18h2M12 18h2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  instagram: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r=".6"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z"/>',
  youtube: '<rect x="3" y="6" width="18" height="12" rx="4"/><path d="m10 9.5 5 2.5-5 2.5Z"/>',
};
export const ico = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;

// Curva verde da marca (a mesma onda dos banners do site atual).
export const onda = (cls = '') => `<svg class="onda ${cls}" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 120V70C260 10 520 0 760 30s520 70 680 20v70Z" fill="currentColor"/><path d="M0 74C260 14 520 4 760 34s520 70 680 20" fill="none" stroke="#009540" stroke-width="6"/></svg>`;

export function topo({ v, slug }) {
  const L = linkDe(v);
  const ativo = s => (slug === s || slug.startsWith(s + '/') ? ' aria-current="page"' : '');
  const logo = v === 'a' ? 'logo-cor' : 'logo-branco';
  const grupo = c => produtos.filter(p => p.cat === c.id).map(p => `<a href="${L('produtos/' + p.slug)}" style="--c:${p.cor}">${p.foto.startsWith('p-') ? `<span class="mm-pic">${img(p.foto, '', 'width="40" height="54"')}</span>` : `<span class="mm-pic ic">${ico(p.cat === 'etanol' ? 'gota' : 'raio')}</span>`}<span><b>${p.nome}</b><small>${p.sub}</small></span></a>`).join('');
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo" data-topo>
  <div class="wrap">
    <a class="marca" href="${L('index')}" aria-label="Alto Alegre, início"><img src="/assets/img/${logo}.png" alt="Alto Alegre" width="46" height="55"></a>
    <nav class="nav" id="nav" aria-label="Principal">
      ${menu.map(([s, t]) => s === 'produtos'
        ? `<div class="tem-sub"><a href="${L(s)}"${ativo(s)}>${t} <span class="seta-b" aria-hidden="true"></span></a>
        <div class="mm"><div class="mm-in">
          ${categorias.map(c => `<div class="mm-col"><a class="mm-cat" href="${L('produtos')}#${c.id}">${c.nome}</a>${grupo(c)}</div>`).join('')}
          <a class="mm-todos" href="${L('produtos')}">Ver o catálogo completo ${ico('seta')}</a>
        </div></div></div>`
        : `<a href="${L(s)}"${ativo(s)}>${t}</a>`).join('\n      ')}
      <a class="btn btn-cta nav-cta" href="${L('orcamento')}">Pedir orçamento</a>
    </nav>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav">${ico('menu')}<span>Menu</span></button>
  </div>
</header>`;
}

export function rodape({ v }) {
  const L = linkDe(v);
  return `<footer class="rodape">
  <div class="wrap r-grid">
    <div class="r-marca">
      <img src="/assets/img/logo-branco.png" alt="Alto Alegre" width="76" height="91" loading="lazy">
      <p>Usina Alto Alegre. Açúcar, etanol e energia elétrica da cana, com unidades no Paraná e em São Paulo desde 1978.</p>
      <div class="redes">${site.redes.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n}">${ico(n.toLowerCase())}</a>`).join('')}</div>
    </div>
    <div><h3>Produtos</h3><ul>${produtos.map(p => `<li><a href="${L('produtos/' + p.slug)}">${p.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Institucional</h3><ul>
      <li><a href="${L('sobre')}">Sobre nós</a></li><li><a href="${L('receitas')}">Receitas</a></li><li><a href="${L('sustentabilidade')}">Sustentabilidade</a></li>
      <li><a href="${L('sustentabilidade/oficina-de-doces')}">Oficina de Doces</a></li><li><a href="${L('trabalhe-conosco')}">Trabalhe conosco</a></li><li><a href="${L('contato')}">Contato</a></li></ul></div>
    <div><h3>Atendimento</h3><ul class="r-contato">
      <li>${ico('pin')}<span>${site.endereco}<br>${site.cidade}, ${site.cep}</span></li>
      <li>${ico('fone')}<a href="tel:${site.foneHref}">${site.fone}</a></li>
      <li>${ico('caixa')}<span>Vendas <a href="tel:${site.vendas0800Href}">${site.vendas0800}</a></span></li>
      <li>${ico('pessoas')}<span>SAC <a href="tel:${site.sac0800Href}">${site.sac0800}</a></span></li>
      <li>${ico('mail')}<a href="mailto:${site.email}">${site.email}</a></li></ul></div>
  </div>
  <div class="wrap r-base"><span>© Usina Alto Alegre. Todos os direitos reservados.</span><span>Prévia de novo site, em avaliação.</span></div>
</footer>`;
}

// Faixa de chamada para vendas, usada no fim das páginas.
export const chamada = (v, titulo = 'Precisa de açúcar para o seu negócio?', texto = 'Atendemos varejo, atacado, food service e indústria. Conte o produto, a embalagem e o volume, e nossa equipe de vendas retorna com a proposta.') => {
  const L = linkDe(v);
  return `<section class="chamada"><div class="wrap"><div class="ch-in">
  <div><span class="eyebrow claro">Equipe de vendas</span><h2>${titulo}</h2><p>${texto}</p></div>
  <div class="ch-acoes">
    <a class="btn btn-cta" href="${L('orcamento')}">Pedir orçamento ${ico('seta')}</a>
    <a class="ch-linha" href="tel:${site.vendas0800Href}">${ico('fone')}<span><small>Ligação gratuita</small>${site.vendas0800}</span></a>
    <a class="ch-linha" href="mailto:${site.emailVendas}">${ico('mail')}<span><small>E-mail de vendas</small>${site.emailVendas}</span></a>
  </div></div></div></section>`;
};

// Cartão de produto do catálogo (três formatos: "prateleira", "linha" e "ficha").
export function cartaoProduto(p, v, forma = 'prateleira') {
  const L = linkDe(v);
  const emb = p.embalagens.map(e => e[0]).join(' · ');
  const foto = p.foto.startsWith('p-')
    ? `<div class="cp-palco">${img(p.foto, p.nome, 'width="300" height="400"')}</div>`
    : `<div class="cp-palco foto">${img(p.foto, '', 'width="600" height="300"')}<span class="cp-ico">${ico(p.cat === 'etanol' ? 'gota' : 'raio')}</span></div>`;
  return `<a class="cp cp-${forma}" href="${L('produtos/' + p.slug)}" style="--c:${p.cor};--c2:${p.cor2}" data-cat="${p.cat}">
  ${foto}
  <div class="cp-txt">
    ${p.tag ? `<span class="cp-tag">${p.tag}</span>` : ''}
    <h3>${p.nome}</h3>
    <p>${p.resumo}</p>
    ${emb ? `<span class="cp-emb">${ico('caixa')}${emb}</span>` : ''}
    <span class="cp-ver">Ver produto ${ico('seta')}</span>
  </div>
</a>`;
}

export function cartaoReceita(r, v) {
  const L = linkDe(v);
  const acs = r.acucar.map(s => prod(s).nome.replace('Açúcar ', '')).join(' e ');
  return `<a class="rc" href="${L('receitas/' + r.slug)}" data-acucar="${r.acucar.join(' ')}">
  <div class="rc-foto">${img(r.foto, r.nome, 'width="500" height="334"')}</div>
  <div class="rc-txt"><small>Com açúcar ${acs}</small><h3>${r.nome}</h3>
  <span class="rc-meta"><span>${ico('relogio')}${r.tempo}</span><span>${ico('porcao')}${r.rende}</span></span></div>
</a>`;
}

export const FONTES = 'https://fonts.googleapis.com/css2?family=Noto+Serif+Display:wdth,wght@62.5..100,500..800&family=Inter:wght@400;500;600;700&display=swap';

export function documento({ v, slug, titulo, desc, corpo }) {
  const caminho = `/${v}/${slug === 'index' ? '' : slug + '/'}`;
  const url = site.dominio + caminho;
  const og = `${site.dominio}/assets/og-${v}.jpg`;
  const t = slug === 'index' ? titulo : `${titulo} | Alto Alegre`;
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
<meta property="og:site_name" content="Alto Alegre">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(t)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(t)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${og}">
<meta name="theme-color" content="#1b2e75">
<link rel="icon" href="/assets/img/logo-cor.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTES}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v} p-${slug.split('/')[0]}${slug.includes('/') ? ' interna-2' : ''}" data-vendas="${site.emailVendas}" data-email="${site.email}">
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
