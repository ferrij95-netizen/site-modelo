// Peças comuns às duas versões: documento com SEO, topo, rodapé, ícones e cartões de peça.
import { site, linhas, produtos, linha } from './conteudo.mjs';

export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const linkDe = v => slug => (/^https?:|^mailto:|^tel:|^#/.test(slug) ? slug : `/${v}/${slug === 'index' ? '' : slug + '/'}`);
export const ext = 'target="_blank" rel="noopener"';
export const semAcento = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
export const zap = txt => `https://wa.me/${site.whats}?text=${encodeURIComponent(txt)}`;

const P = {
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  baixo: '<path d="m6 9 6 6 6-6"/>',
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  whats: '<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2Z"/>',
  baixar: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  busca: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  local: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  fabrica: '<path d="M3 21V11l5 3V11l5 3V7h3l1-4h2l1 4v14Z"/><path d="M7 18h2M12 18h2"/>',
  caminhao: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  globo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3Z"/>',
  fogo: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-3.5 2-5.5.8 1.3 1.6 2 2.5 2C11.5 7 11 5 12 3Z"/>',
  peso: '<path d="M7 8h10l3 12H4Z"/><circle cx="12" cy="5.5" r="2.2"/>',
  qr: '<rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><path d="M14.5 14.5h2v2h-2zM18.5 18.5h2v2h-2zM14.5 18.5h2M18.5 14.5h2"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8Z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  equipe: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14c3 0 5 2.2 5 5"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  escudo: '<path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  engrenagem: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fechar: '<path d="M6 6l12 12M18 6 6 18"/>',
  troca: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
  doc: '<path d="M7 3h7l5 5v13H7Z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
};
export const ico = (n, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;

// Moldura em "pista" (retângulo de pontas redondas) tirada do G do logo e das linhas da capa do catálogo.
export const pista = (cls = '') => `<svg class="pista ${cls}" viewBox="0 0 600 240" fill="none" aria-hidden="true"><path d="M600 1H120A119 119 0 0 0 120 239H600" stroke="currentColor" stroke-width="2"/></svg>`;

const FONTES = 'family=Montserrat:wght@600;700;800&family=Inter:wght@400;500;600;700';
const NOME_V = { a: 'Fundição', b: 'Engenharia' };

export function doc({ v, slug, titulo, desc, corpo, cls = '' }) {
  const url = `${site.dominio}/${v}/${slug === 'index' ? '' : slug + '/'}`;
  const t = slug === 'index' ? `Gramola · ${site.slogan}` : `${titulo} · Gramola`;
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
<meta property="og:site_name" content="Gramola">
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
<meta name="theme-color" content="#0f0e45">
<link rel="icon" href="/assets/img/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${FONTES}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v} ${cls}">
${topo({ v, slug })}
<main id="conteudo">
${corpo}
</main>
${rodape({ v })}
<a class="zap-flut" href="${zap('Olá! Vim pelo site da Gramola e gostaria de um orçamento.')}" ${ext} aria-label="Falar no WhatsApp com o comercial">${ico('whats')}</a>
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

export function topo({ v, slug }) {
  const L = linkDe(v);
  const base = slug.split('/')[0];
  const noCatalogo = base === 'catalogo' || base === 'peca' || linhas.some(l => l.id === base);
  const at = s => ((s === base || (s === 'catalogo' && noCatalogo)) ? ' aria-current="page"' : '');
  const sub = `<div class="dd">${linhas.map(l => `<a href="${L(l.id)}">${l.nome}<small>${produtos.filter(p => p.linha === l.id).length}</small></a>`).join('')}<a class="dd-todos" href="${L('catalogo')}">Catálogo completo ${ico('seta')}</a></div>`;
  const logo = v === 'a' ? 'logo-branco' : 'logo-azul';
  const busca = v === 'b' ? `<form class="topo-busca" action="${L('catalogo')}" role="search"><label class="sr" for="tb">Buscar peça</label>${ico('busca')}<input id="tb" name="q" type="search" placeholder="Código Gramola, original ou veículo"></form>` : '';
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${v === 'a' ? `<div class="faixa"><div class="wrap"><span>${ico('local')} Limeira, SP · desde 1992</span><span class="faixa-f">${site.fones.slice(0, 2).map(([t, h]) => `<a href="tel:+55${h}">${ico('fone')} ${t}</a>`).join('')}<a href="mailto:${site.email}">${ico('mail')} ${site.email}</a></span></div></div>` : ''}
<header class="topo" data-topo>
  <div class="wrap">
    <a class="logo" href="${L('index')}" aria-label="Gramola, início"><img src="/assets/img/${logo}.png" alt="Gramola" width="350" height="175"></a>
    ${busca}
    <nav class="nav" id="nav" aria-label="Principal">
      <a href="${L('index')}"${at('index')}>Início</a>
      <a href="${L('empresa')}"${at('empresa')}>A Gramola</a>
      <a href="${L('fundicao')}"${at('fundicao')}>Fundição</a>
      <div class="tem-sub"><a href="${L('catalogo')}"${at('catalogo')}>Catálogo ${ico('baixo', 'sb')}</a>${sub}</div>
      <a href="${L('contato')}"${at('contato')}>Contato</a>
      <a class="btn nav-cta" href="${L('contato')}#orcamento">${v === 'a' ? 'Pedir orçamento' : 'Orçamento'}</a>
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
      <img src="/assets/img/logo-branco.png" alt="Gramola" width="140" height="70" loading="lazy">
      <p>Desde 1992 a Gramola Fundição fabrica peças para suspensão de ônibus e caminhões, em ferro fundido nodular, cinzento e aço.</p>
      <a class="r-pdf" href="${site.catalogoPdf}" ${ext}>${ico('baixar')} Catálogo em PDF</a>
    </div>
    <div><h3>Empresa</h3><ul>
      <li><a href="${L('empresa')}">A Gramola</a></li><li><a href="${L('fundicao')}">Fundição e capacidade</a></li>
      <li><a href="${L('catalogo')}">Catálogo de peças</a></li><li><a href="${L('contato')}">Contato</a></li><li><a href="${L('contato')}#rh">Trabalhe conosco</a></li></ul></div>
    <div><h3>Linhas</h3><ul>${linhas.map(l => `<li><a href="${L(l.id)}">${l.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Fale conosco</h3><ul class="r-contato">
      ${site.fones.map(([t, h]) => `<li><a href="tel:+55${h}">${ico('fone')}${t}</a></li>`).join('')}
      <li><a href="mailto:${site.email}">${ico('mail')}${site.email}</a></li>
      <li><a href="${site.mapa}" ${ext}>${ico('local')}<span>${site.endereco.join('<br>')}</span></a></li></ul></div>
  </div>
  <div class="wrap r-base">
    <span>© 2026 ${site.razao} Todos os direitos reservados.</span>
    <span>Versão ${NOME_V[v]} · proposta Overtus</span>
  </div>
</footer>`;
}

// Selos do catálogo
export const selos = p => `${p.novo ? '<span class="selo selo-novo">Novo</span>' : ''}${p.exp ? '<span class="selo selo-exp">Exportação</span>' : ''}`;

export const busca = p => semAcento([p.cod, p.cod.replace(/\./g, ''), p.nome, p.aplic, p.original, p.original.replace(/[.\s-]/g, ''), p.obs, linha(p.linha).nome, p.grupo].join(' '));

// Cartão de peça. A: cabeçalho azul como no catálogo impresso. B: foto em destaque e código em etiqueta.
export function cartao(p, v, { h = 'h3' } = {}) {
  const L = linkDe(v);
  const l = linha(p.linha);
  const dados = `data-linha="${p.linha}" data-grupo="${esc(p.grupo)}" data-novo="${p.novo ? 1 : 0}" data-busca="${esc(busca(p))}"`;
  const foto = `<img src="/assets/p/${p.slug}.webp" alt="${esc(p.nome + ' ' + p.cod)}" loading="lazy" decoding="async" width="420" height="420">`;
  if (v === 'a') return `<article class="pc" ${dados}><a href="${L('peca/' + p.slug)}">
  <span class="pc-cab"><strong>${esc(p.cod)}</strong><${h}>${esc(p.nome)}</${h}></span>
  <span class="pc-foto">${foto}${selos(p)}</span>
  <span class="pc-info"><span><b>Aplicação:</b> ${esc(p.aplic || '-')}</span><span><b>Código original:</b> ${esc(p.original || '-')}</span></span>
</a></article>`;
  return `<article class="pc" ${dados}><a href="${L('peca/' + p.slug)}">
  <span class="pc-foto">${foto}<span class="pc-selos">${selos(p)}</span></span>
  <span class="pc-info"><span class="pc-cod">${esc(p.cod)}</span><span class="pc-linha">${l.nome}${p.grupo ? ' · ' + esc(p.grupo) : ''}</span>
  <${h} class="pc-nome">${esc(p.nome)}</${h}>
  <span class="pc-ap">${esc(p.aplic || 'Aplicação sob consulta')}</span>${p.original ? `<span class="pc-or">Orig. ${esc(p.original)}</span>` : ''}
  ${ico('seta', 'pc-seta')}</span>
</a></article>`;
}

// Filtro de catálogo (busca, linhas, grupos, novidades)
export function filtro({ v, linhaId = null, q = true }) {
  const l = linhaId && linha(linhaId);
  const chips = l
    ? (l.grupos ? `<div class="chips" role="group" aria-label="Filtrar por grupo"><button type="button" class="chip on" data-grupo="">Todos</button>${l.grupos.filter(([, n]) => produtos.some(p => p.linha === linhaId && p.grupo === n)).map(([, n]) => `<button type="button" class="chip" data-grupo="${esc(n)}">${esc(n)}</button>`).join('')}</div>` : '')
    : `<div class="chips" role="group" aria-label="Filtrar por linha"><button type="button" class="chip on" data-linha="">Todas</button>${linhas.map(x => `<button type="button" class="chip" data-linha="${x.id}">${x.nome}</button>`).join('')}</div>`;
  return `<div class="filtro" data-filtro>
  <label class="f-busca">${ico('busca')}<span class="sr">Buscar</span><input type="search" data-q placeholder="Busque por código Gramola, código original, veículo ou nome da peça" autocomplete="off"></label>
  ${chips}
  <div class="f-pe"><label class="f-novo"><input type="checkbox" data-novos> Só novidades</label><span class="f-cont" data-cont aria-live="polite"></span></div>
</div>`;
}
