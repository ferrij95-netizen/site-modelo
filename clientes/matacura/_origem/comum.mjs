// Peças comuns às duas versões: documento com SEO, topo, rodapé, ícones e cartões de produto.
import { site, menu, linhas, produtos } from './conteudo.mjs';

export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;
export const linkDe = v => slug => (/^https?:|^mailto:|^tel:|^#/.test(slug) ? slug : `/${v}/${slug === 'index' ? '' : slug + '/'}`);
export const linha = id => linhas.find(l => l.id === id);
export const daLinha = id => produtos.filter(p => p.linha === id);

// Ícones de traço, na cor do texto.
const P = {
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
  zap: '<path d="M4 20l1.4-4.2A8 8 0 1 1 8.6 19Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.6-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2Z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fechar: '<path d="M6 6l12 12M18 6 6 18"/>',
  busca: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
  escudo: '<path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  gota: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/>',
  folha: '<path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z"/><path d="M5 19 13 11"/>',
  pata: '<circle cx="7" cy="9" r="1.8"/><circle cx="11" cy="6" r="1.8"/><circle cx="15.5" cy="6.5" r="1.8"/><circle cx="18.5" cy="10" r="1.8"/><path d="M8 17c0-3 2-5.5 4.5-5.5S17 14 17 17c0 2-1.5 2.5-4.5 2.5S8 19 8 17Z"/>',
  gato: '<path d="M5 20v-9l-1-6 4 3h8l4-3-1 6v9Z"/><path d="M9 13h0M15 13h0M10.5 16.5h3"/>',
  vento: '<path d="M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3"/>',
  coracao: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
  bolha: '<circle cx="9" cy="14" r="5"/><circle cx="16.5" cy="7.5" r="3"/><circle cx="18" cy="15.5" r="1.6"/>',
  curativo: '<rect x="2.8" y="8.2" width="18.4" height="7.6" rx="3.8" transform="rotate(-45 12 12)"/><path d="M10.5 10.5h0M13.5 13.5h0M10.5 13.5h0M13.5 10.5h0"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  doc: '<path d="M7 3h7l5 5v13H7Z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
  luva: '<path d="M8 21v-5l-3-4V7a1.5 1.5 0 0 1 3 0v4V4.5a1.5 1.5 0 0 1 3 0V11V3.5a1.5 1.5 0 0 1 3 0V11V5a1.5 1.5 0 0 1 3 0v9l-2 3v4Z"/>',
  alerta: '<path d="M12 3 2 20h20Z"/><path d="M12 10v4M12 17h0"/>',
  loja: '<path d="M4 9h16l-1-5H5Z"/><path d="M5 9v11h14V9M9 20v-6h6v6"/>',
  pessoas: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14c3 0 5 2.2 5 5"/>',
  fabrica: '<path d="M3 21V10l5 3v-3l5 3v-3l5 3V4h3v17Z"/><path d="M7 17h2M12 17h2"/>',
  play: '<path d="M8 5v14l11-7Z"/>',
  baixar: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  instagram: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r=".6"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z"/>',
  youtube: '<rect x="3" y="6" width="18" height="12" rx="4"/><path d="m10 9.5 5 2.5-5 2.5Z"/>',
  linkedin: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 10v6M8 7.5h0M12 16v-6M12 12.5c0-1.5 1-2.5 2.3-2.5S16 11 16 12.5V16"/>',
};
export const ico = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || P.check}</svg>`;

// Selo "Desde 1945" no desenho do logo: faixa creme, faixa preta e o nome.
export const selo = (txt = 'Matacura') => `<span class="selo"><span>${esc(txt)}</span></span>`;

export function doc({ v, slug, titulo, descricao, corpo, classe = '' }) {
  const url = `${site.dominio}/${v}/${slug === 'index' ? '' : slug + '/'}`;
  const t = slug === 'index' ? `${site.nome}: ${titulo}` : `${titulo} | ${site.nome}`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t)}</title>
<meta name="description" content="${esc(descricao)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#fdd011">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${site.nome}">
<meta property="og:title" content="${esc(t)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.dominio}/assets/og-${v}.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/icone.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&family=Noto+Serif:ital,wght@1,700&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v} ${classe}">
${topo({ v, slug })}
<main id="conteudo">
${corpo}
</main>
${rodape({ v })}
<a class="zap-flutua" href="${site.zap}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ico('zap')}</a>
<script src="/assets/site.js" defer></script>
</body>
</html>`;
}

export function topo({ v, slug }) {
  const L = linkDe(v);
  const ativo = s => (slug === s || slug.startsWith(s + '/') ? ' aria-current="page"' : '');
  const mm = linhas.map(l => `<div class="mm-col">
          <a class="mm-linha" href="${L('produtos/linha/' + l.id)}">${img('l-' + l.id, l.nome, 'width="150" height="50"')}<small>${esc(l.assinatura)}</small></a>
          ${daLinha(l.id).slice(0, 5).map(p => `<a class="mm-p" href="${L('produtos/' + p.slug)}" style="--c:${p.cor}"><span class="mm-pic">${img(p.foto, '', 'width="26" height="60"')}</span><span>${esc(p.curto)}<small>${esc(p.conteudo)}</small></span></a>`).join('')}
          ${daLinha(l.id).length > 5 ? `<a class="mm-mais" href="${L('produtos/linha/' + l.id)}">Mais ${daLinha(l.id).length - 5} produtos</a>` : ''}
        </div>`).join('');
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<div class="barra-topo"><div class="wrap">
  <span class="bt-redes">Siga a Matacura ${site.redes.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n}">${ico(n.toLowerCase())}</a>`).join('')}</span>
  <span class="bt-contato"><a href="tel:${site.sac0800Href}">${ico('fone')} ${site.sac0800}</a><a href="${site.zap}" target="_blank" rel="noopener">${ico('zap')} ${site.fone}</a></span>
</div></div>
<header class="topo" data-topo>
  <div class="wrap">
    <a class="marca" href="${L('index')}" aria-label="Matacura, início"><img src="/assets/img/logo.png" alt="Matacura desde 1945" width="200" height="87"></a>
    <nav class="nav" id="nav" aria-label="Principal">
      ${menu.map(([s, t]) => s === 'produtos'
        ? `<div class="tem-sub"><a href="${L(s)}"${ativo(s)}>${t}<span class="seta-b" aria-hidden="true"></span></a>
        <div class="mm"><div class="mm-in">${mm}
          <a class="mm-todos" href="${L('produtos')}">Ver todos os ${produtos.length} produtos ${ico('seta')}</a>
        </div></div></div>`
        : `<a href="${L(s)}"${ativo(s)}>${t}</a>`).join('\n      ')}
      <a class="btn btn-cta nav-cta" href="${L('onde-comprar')}">${ico('loja')} Onde comprar</a>
    </nav>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav">${ico('menu')}<span>Menu</span></button>
  </div>
</header>`;
}

export function rodape({ v }) {
  const L = linkDe(v);
  return `<footer class="rodape">
  <div class="faixa-logo" aria-hidden="true"></div>
  <div class="wrap r-grid">
    <div class="r-marca">
      <img src="/assets/img/logo.png" alt="Matacura desde 1945" width="220" height="95" loading="lazy">
      <p>${esc(site.razao)}. Higiene, beleza e tratamento para cães e gatos, fabricados em São Miguel do Oeste (SC) desde 1945.</p>
      <div class="redes">${site.redes.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n}">${ico(n.toLowerCase())}</a>`).join('')}</div>
    </div>
    <div><h3>Linhas</h3><ul>${linhas.map(l => `<li><a href="${L('produtos/linha/' + l.id)}">${esc(l.nome)}</a></li>`).join('')}<li><a href="${L('produtos')}">Todos os produtos</a></li></ul></div>
    <div><h3>Matacura</h3><ul>
      <li><a href="${L('empresa')}">Empresa</a></li><li><a href="${L('empresa/historia')}">Nossa história</a></li><li><a href="${L('onde-comprar')}">Onde comprar</a></li>
      <li><a href="${L('representantes')}">Representantes</a></li><li><a href="${L('contato')}">Contato</a></li><li><a href="${site.catalogo}" target="_blank" rel="noopener">Catálogo em PDF</a></li></ul></div>
    <div><h3>Atendimento</h3><ul class="r-contato">
      <li>${ico('pin')}<span>${site.endereco}<br>${site.cidade}, CEP ${site.cep}</span></li>
      <li>${ico('fone')}<span><a href="tel:${site.foneHref}">${site.fone}</a><br><a href="tel:${site.sac0800Href}">${site.sac0800}</a> (ligação gratuita)</span></li>
      <li>${ico('zap')}<a href="${site.zap}" target="_blank" rel="noopener">WhatsApp ${site.fone}</a></li>
      <li>${ico('mail')}<a href="mailto:${site.email}">${site.email}</a></li></ul></div>
  </div>
  <div class="wrap r-base"><span>© ${site.razao}. Todos os direitos reservados. Uso veterinário.</span><span>Prévia de novo site, em avaliação.</span></div>
</footer>`;
}

// Etiquetas de uso (cães, gatos, cavalos).
export const paraQuem = p => p.para.map(x => `<span class="pq">${ico(x === 'gatos' ? 'gato' : 'pata')}${{ caes: 'Cães', gatos: 'Gatos', cavalos: 'Cavalos' }[x]}</span>`).join('');

// Cartão de produto. Formatos: "prateleira" (embalagem em pé no palco da cor), "lista" (linha horizontal) e "mini".
export function cartao(p, v, forma = 'prateleira') {
  const L = linkDe(v);
  return `<a class="cp cp-${forma}" href="${L('produtos/' + p.slug)}" style="--c:${p.cor};--c2:${p.cor2}" data-linha="${p.linha}" data-tags="${p.tags.join(' ')} ${p.para.join(' ')}">
  <div class="cp-palco">${img(p.foto, p.nome, 'width="200" height="420"')}</div>
  <div class="cp-txt">
    <span class="cp-tipo">${esc(p.tipo)} · ${esc(p.conteudo)}</span>
    <h3>${esc(p.curto)}</h3>
    ${forma !== 'mini' ? `<p>${esc(p.resumo)}</p>` : ''}
    <span class="cp-pq">${paraQuem(p)}</span>
  </div>
</a>`;
}

// Faixa de chamada no fim das páginas: onde comprar e revenda.
export const chamada = (v, titulo = 'Encontre Matacura perto de você', texto = 'Os produtos Matacura estão em pet shops, agropecuárias e lojas online de todos os estados. Fale com um representante para revender.') => {
  const L = linkDe(v);
  return `<section class="chamada"><div class="wrap"><div class="ch-in">
  <div class="ch-txt"><span class="eyebrow">Onde comprar</span><h2>${titulo}</h2><p>${texto}</p></div>
  <div class="ch-acoes">
    <a class="btn btn-escuro" href="${L('onde-comprar')}">${ico('loja')} Lojas e pet shops</a>
    <a class="btn btn-linha" href="${L('representantes')}">${ico('pessoas')} Quero revender</a>
    <a class="ch-fone" href="tel:${site.sac0800Href}">${ico('fone')}<span><small>Ligação gratuita</small>${site.sac0800}</span></a>
  </div></div></div></section>`;
};

// Cabeçalho das páginas internas, com trilha.
export const cabecalho = (v, { titulo, sub = '', trilha = [], extra = '' }) => {
  const L = linkDe(v);
  return `<section class="cab"><div class="wrap">
  <nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${trilha.map(([s, t]) => s ? `<a href="${L(s)}">${esc(t)}</a>` : `<span>${esc(t)}</span>`).join('')}</nav>
  <h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}${extra}
</div></section>`;
};
