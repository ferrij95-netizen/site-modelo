// Peças comuns às duas versões: documento com SEO, topo, rodapé, formulário, ícones e chamadas.
import { site, menu, produtos } from './conteudo.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const num = i => String(i + 1).padStart(2, '0');
export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}"${attrs.includes('loading=') ? '' : ' loading="lazy"'} decoding="async"${attrs ? ' ' + attrs : ''}>`;
export const linkDe = versao => slug => `/${versao}/${slug === 'index' ? '' : slug + '/'}`;
export const produto = slug => produtos.find(p => p.slug === slug);
export const nomeCurto = p => p.curto || p.nome;
export const whatsLink = (texto = 'Olá! Vim pelo site da Pato Indústria e gostaria de solicitar um orçamento.') => `https://wa.me/${site.whats}?text=${encodeURIComponent(texto)}`;

const FONTES = 'https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600&family=Inter:wght@400;500;600&display=swap';

// Ícones de traço simples (24x24).
const I = {
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  email: '<path d="M3 6h18v12H3z"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  voltar: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  whats: '<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.5-1.5-1-2-2l1-1-1-2z"/>',
  escudo: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  alvo: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  olho: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  estrela: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
  ar: '<path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>',
  camadas: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  muro: '<path d="M3 5h18v14H3zM3 10h18M3 15h18M9 5v5M15 10v5M9 15v4"/>',
  escada: '<path d="M7 3v18M17 3v18M7 7h10M7 12h10M7 17h10"/>',
  silo: '<path d="M5 21V9l7-5 7 5v12z"/><path d="M5 13h14M5 17h14M12 4V2"/>',
  fabrica: '<path d="M3 21V10l6 4V10l6 4V5h6v16z"/><path d="M7 17h2M12 17h2M17 17h2"/>',
  chave: '<path d="M14.5 6.5a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3l9-9a4 4 0 0 0-2-2z"/>',
  caminhao: '<path d="M2 6h12v10H2zM14 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
};
export const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

export function documento({ versao, slug, titulo, desc, corpo, tema }) {
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
<meta property="og:site_name" content="Pato Indústria">
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
<link rel="icon" href="/assets/img/icone.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTES}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${versao}.css">
</head>
<body class="v-${versao} p-${slug.split('/')[0]}${slug.includes('/') ? ' p-detalhe' : ''}">
${corpo}
<a class="whats-flutua" href="${whatsLink()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ico('whats')}</a>
<script src="/assets/pato.js" defer></script>
</body>
</html>
`;
}

// Topo: logo branco sobre a foto; na versão A vira barra clara ao rolar (logo colorido), na B continua escuro.
export function topo({ versao, slug, sobreFoto }) {
  const L = linkDe(versao);
  const raiz = slug.split('/')[0];
  const ativo = s => (raiz === s ? ' aria-current="page"' : '');
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo${sobreFoto ? ' sobre-foto' : ''}" data-topo>
  <div class="in">
    <a class="marca" href="${L('index')}" aria-label="Pato Indústria, início">
      <img class="lg-branco" src="/assets/img/logo-branco.png" alt="Pato Indústria · Silos e Secadores" width="200" height="39">
      <img class="lg-cor" src="/assets/img/logo-cor.png" alt="" width="200" height="39" aria-hidden="true">
    </a>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
    <nav id="nav" aria-label="Menu principal">
      ${menu.map(([s, t]) => s === 'produtos'
        ? `<div class="sub"><a href="${L(s)}"${ativo(s)}>${t}</a><div class="sub-lista">${produtos.map(p => `<a href="${L('produtos/' + p.slug)}">${p.nome}</a>`).join('')}</div></div>`
        : `<a href="${L(s)}"${ativo(s)}>${t}</a>`).join('\n      ')}
      <a class="nav-insta" href="${site.instagram}" target="_blank" rel="noopener" aria-label="Instagram da Pato Indústria">${ico('insta')}</a>
      <a class="btn btn-orc" href="${L('contato')}">Solicitar orçamento</a>
    </nav>
  </div>
</header>`;
}

export function rodape({ versao }) {
  const L = linkDe(versao);
  return `<footer class="rodape">
  <div class="in r-grade">
    <div class="r-marca"><img src="/assets/img/marca-branca.png" alt="Pato Indústria · Silos e Secadores" width="190" height="107" loading="lazy">
      <p>Fabricação, montagem e manutenção de silos e secadores. Desde 1999 em Pato Branco/PR, atuando em todo o Brasil.</p>
      <a class="r-insta" href="${site.instagram}" target="_blank" rel="noopener">${ico('insta')}Curta no Instagram</a></div>
    <div><h3>Linha de Produtos</h3><ul class="r-prod">${produtos.map(p => `<li><a href="${L('produtos/' + p.slug)}">${p.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Fale Conosco</h3><ul>
      ${site.fones.map(([t, h]) => `<li><a href="tel:${h}">${ico('fone')}${t}</a></li>`).join('')}
      <li><a href="mailto:${site.email}">${ico('email')}${site.email}</a></li></ul></div>
    <div><h3>Localização</h3><ul>${site.unidades.map(u => `<li><a href="${u.mapa}" target="_blank" rel="noopener">${ico('pin')}<span>${u.linhas.join('<br>')}</span></a></li>`).join('')}</ul></div>
  </div>
  <div class="in r-base"><span>© Pato Indústria · Todos os direitos reservados</span><span>Pato Branco/PR · Luís Eduardo Magalhães/BA</span></div>
</footer>`;
}

export const formOrcamento = () => `<form class="form" data-form>
  <div class="f2">
    <label><span>Nome</span><input name="nome" required autocomplete="name"></label>
    <label><span>Fazenda ou empresa</span><input name="empresa" autocomplete="organization"></label>
  </div>
  <div class="f2">
    <label><span>Telefone / WhatsApp</span><input name="fone" type="tel" required autocomplete="tel"></label>
    <label><span>Cidade / UF</span><input name="cidade" autocomplete="address-level2"></label>
  </div>
  <label><span>Equipamento de interesse</span><select name="produto"><option value="">Unidade completa / vários equipamentos</option>${produtos.map(p => `<option>${p.nome}</option>`).join('')}</select></label>
  <label><span>Mensagem</span><textarea name="msg" rows="4" placeholder="Capacidade desejada, tipo de grão, prazo..."></textarea></label>
  <button class="btn btn-prim" type="submit">${ico('whats')}Enviar pelo WhatsApp</button>
  <p class="f-nota">O pedido abre no WhatsApp da Pato Indústria, já preenchido. Se preferir, escreva para <a href="mailto:${site.email}">${site.email}</a>.</p>
</form>`;

export const listaContato = () => `<ul class="lista-contato">
  <li>${ico('fone')}<div><b>Telefones</b>${site.fones.map(([t, h]) => `<a href="tel:${h}">${t}</a>`).join('')}</div></li>
  <li>${ico('email')}<div><b>E-mail</b><a href="mailto:${site.email}">${site.email}</a></div></li>
  ${site.unidades.map(u => `<li>${ico('pin')}<div><b>${u.nome}</b><a href="${u.mapa}" target="_blank" rel="noopener">${u.linhas.join('<br>')}</a></div></li>`).join('')}
</ul>`;
