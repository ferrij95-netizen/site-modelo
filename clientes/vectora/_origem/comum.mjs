// Peças comuns às duas versões: documento com SEO, topo, rodapé, formulários, ícones e cartões.
import { site, menu, paginas, produtos } from './conteudo.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const num = i => String(i + 1).padStart(2, '0');
export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}"${attrs.includes('loading=') ? '' : ' loading="lazy"'} decoding="async"${attrs ? ' ' + attrs : ''}>`;
export const linkDe = versao => slug => `/${versao}/${slug === 'index' ? '' : slug + '/'}`;
export const produto = slug => produtos.find(p => p.slug === slug);

// Ícones de traço simples (24x24).
const I = {
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  email: '<path d="M3 6h18v12H3z"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  voltar: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  folha: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19c3-4 6-7 10-9"/>',
  suporte: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m5.6 5.6 3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6"/>',
  engrenagem: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  gota: '<path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12z"/>',
  chama: '<path d="M12 3c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4.5 2-7 2 1 3 3 3 5 1.5-1.5 1-6 1-9z"/>',
  monitor: '<path d="M3 4h18v12H3zM8 20h8M12 16v4"/>',
  rede: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v5M12 12l-6 5.5M12 12l6 5.5"/>',
  sensor: '<path d="M12 21a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/><path d="M12 13l4-4M8 13h.01M12 8h.01"/>',
  caixa: '<path d="M4 7h16v13H4zM8 7V4h8v3M8 12h8M8 16h5"/>',
  antena: '<path d="M12 12v9M8 21h8"/><circle cx="12" cy="10" r="2"/><path d="M7.8 5.8a6 6 0 0 0 0 8.4M16.2 5.8a6 6 0 0 1 0 8.4M5 3a10 10 0 0 0 0 14M19 3a10 10 0 0 1 0 14"/>',
  grafico: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  painel: '<path d="M4 3h16v18H4zM8 7h3M8 11h3M14 7h2v4h-2zM8 16h8"/>',
  capelo: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6"/>',
  chave: '<path d="M14.5 6.5a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3l9-9a4 4 0 0 0-2-2z"/>',
  regua: '<path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
};
export const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

export function topo({ versao, slug, escuro }) {
  const L = linkDe(versao);
  const raiz = slug.split('/')[0];
  const ativo = s => (raiz === s || (s === 'empresa' && raiz === 'igualdade-salarial') ? ' aria-current="page"' : '');
  const logo = escuro ? 'logo-vectora-branco.svg' : 'logo-vectora.svg';
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo">
  <div class="in">
    <a class="marca" href="${L('index')}" aria-label="Vectora Indústria, início"><img src="/assets/img/${logo}" alt="Vectora · Soluções em telemetria e gestão de perdas" width="220" height="45"></a>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
    <nav id="nav" aria-label="Menu principal">${menu.map(([s, t, sub]) => sub
      ? `<div class="sub"><a href="${L(s)}"${ativo(s)}>${t}</a><div class="sub-lista">${sub.map(([ss, tt]) => `<a href="${L(ss)}">${tt}</a>`).join('')}</div></div>`
      : `<a href="${L(s)}"${ativo(s)}>${t}</a>`).join('')}
      <a class="nav-fone" href="tel:${site.foneHref}">${ico('fone')}${site.fone}</a></nav>
  </div>
</header>`;
}

export const formNoticias = () => `<form class="noticias" data-noticias>
  <label><span class="sr">Seu e-mail</span><input name="email" type="email" placeholder="Seu e-mail" required autocomplete="email"></label>
  <button class="btn btn-prim" type="submit">Registrar</button>
</form>`;

export function rodape({ versao }) {
  const L = linkDe(versao);
  return `<footer class="rodape">
  <div class="in r-grade">
    <div class="r-marca"><img src="/assets/img/logo-vectora-branco.svg" alt="Vectora · Soluções em telemetria e gestão de perdas" width="230" height="47" loading="lazy">
      <p>Equipamentos, sistemas e projetos customizados de telemetria para saneamento, indústria e óleo e gás.</p></div>
    <div><h3>Navegação</h3><ul>${[['produtos', 'Produtos e Serviços'], ['clientes', 'Clientes'], ['solucoes', 'Soluções'], ['empresa', 'Quem Somos'], ['igualdade-salarial', 'Igualdade Salarial'], ['contato', 'Contato']].map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul>
      <li><a href="tel:${site.foneHref}">${ico('fone')}${site.fone}</a></li>
      <li><a href="mailto:${site.email}">${ico('email')}${site.email}</a></li>
      <li><a href="${site.mapaLink}" target="_blank" rel="noopener">${ico('pin')}<span>${site.endereco}<br>${site.cidade} · ${site.cep}</span></a></li></ul></div>
    <div><h3>Assine as notícias</h3><p>Entre com seu e-mail para receber nossas notícias.</p>${formNoticias()}</div>
  </div>
  <div class="in r-base"><span>© ${site.razao}</span><span>Santa Bárbara d'Oeste · São Paulo</span></div>
</footer>`;
}

export const formContato = () => `<form class="form" data-form>
  <label><span>Nome</span><input name="nome" required autocomplete="name"></label>
  <label><span>Empresa</span><input name="empresa" autocomplete="organization"></label>
  <label><span>Telefone</span><input name="telefone" type="tel" required autocomplete="tel"></label>
  <label><span>E-mail</span><input name="email" type="email" required autocomplete="email"></label>
  <label class="cheia"><span>Assunto</span><select name="assunto"><option>Orçamento de equipamentos</option><option>Projetos customizados</option><option>Suporte técnico</option><option>Treinamentos</option><option>Outro assunto</option></select></label>
  <label class="cheia"><span>Mensagem</span><textarea name="mensagem" rows="5"></textarea></label>
  <div class="form-acoes cheia"><button class="btn btn-prim" type="submit">Enviar mensagem ${ico('seta')}</button><a class="btn btn-sec" href="tel:${site.foneHref}">${ico('fone')} ${site.fone}</a></div>
</form>`;

export const FONTES = 'https://fonts.googleapis.com/css2?family=Saira:wght@500;600;700&family=Inter:wght@400;500;600&display=swap';

export function documento({ versao, slug, corpo, tema }) {
  const [titulo, desc] = paginas[slug];
  const url = site.dominio + linkDe(versao)(slug);
  const og = `${site.dominio}/assets/og-${versao}.jpg`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Vectora Indústria">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${og}">
<meta name="theme-color" content="${tema}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTES}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${versao}.css">
</head>
<body class="v-${versao} p-${slug.split('/')[0]}" data-email="${site.email}">
${corpo}
<script src="/assets/vectora.js" defer></script>
</body>
</html>
`;
}
