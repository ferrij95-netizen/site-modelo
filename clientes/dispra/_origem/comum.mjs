// Peças comuns às duas versões: documento com SEO completo, topo, rodapé, formulários e ícones.
import { site, paginas, menu, assuntos, estados } from './conteudo.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const num = i => String(i + 1).padStart(2, '0');
export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;
export const externo = u => /^https?:/.test(u);
export const alvo = u => (externo(u) ? ' target="_blank" rel="noopener"' : '');
export const linkDe = versao => slug => (externo(slug) ? slug : `/${versao}/${slug === 'index' ? '' : slug + '/'}`);
export const banco = '<small class="banco">Foto ilustrativa</small>';

// Ícones de traço simples (24x24).
const I = {
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  caminhao: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  fabrica: '<path d="M3 20V10l5 3V10l5 3V6h3v14zM3 20h18M17 20V4h3v16"/>',
  frasco: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M7.5 15h9"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  email: '<path d="M3 6h18v12H3z"/><path d="m3 7 9 6 9-6"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pessoa: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  campo: '<path d="M3 20h18M6 20V11M6 11c0-3 2-5 5-5-1 3-2 5-5 5zM6 14c0-2.5-2-4-4-4 .5 2.5 2 4 4 4zM14 20v-6M14 14c0-2.5 2-4.5 5-4.5-.5 3-2 4.5-5 4.5z"/>',
  grafico: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  dolar: '<path d="M12 3v18M16.5 7.5c-.8-1.3-2.4-2-4.5-2-2.6 0-4.5 1.3-4.5 3.2 0 4.6 9.5 2.2 9.5 6.8 0 1.9-2 3.3-5 3.3-2.3 0-4-.8-4.8-2.3"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  livro: '<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-1 .2M20 4v14h-7"/>',
  escudo: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  pasta: '<path d="M3 7h18v12H3zM8 7V5h8v2"/>',
  busca: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/>',
};
export const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
export const fb = '<svg class="ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8V6.5c0-.8.2-1.3 1.4-1.3H17V2.2C16.6 2.1 15.6 2 14.5 2 12 2 10.5 3.5 10.5 6.2V8H8v3.2h2.5V22H14V11.2h2.7l.4-3.2z"/></svg>';

export function topo({ versao, slug }) {
  const L = linkDe(versao);
  const ativo = s => (slug === s || slug.startsWith(s + '/') ? ' aria-current="page"' : '');
  return `<div class="faixa-topo"><div class="in">
  <a href="tel:${site.gratisHref}">${ico('fone')}<span>Televendas <b>${site.gratis}</b></span></a>
  <a href="tel:${site.foneHref}" class="so-pc">${site.fone}</a>
  <a href="mailto:${site.email}" class="so-pc">${ico('email')}${site.email}</a>
  <span class="dir"><a href="${L('indicadores')}">${ico('grafico')}Indicadores</a><a href="${site.nfe}" target="_blank" rel="noopener">NF-e</a><a href="${site.facebook}" target="_blank" rel="noopener" aria-label="Dispra no Facebook">${fb}</a></span>
</div></div>
<header class="topo">
  <div class="in">
    <a class="marca" href="${L('index')}" aria-label="Dispra Distribuidora, início"><img src="/assets/img/logo-dispra.svg" alt="Dispra Distribuidora" width="110" height="90"></a>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
    <nav id="nav">${menu.map(([s, t]) => `<a href="${L(s)}"${ativo(s)}>${t}</a>`).join('')}</nav>
  </div>
</header>`;
}

export function rodape({ versao }) {
  const L = linkDe(versao);
  return `<footer class="rodape">
  <div class="in">
    <div class="r-marca"><img src="/assets/img/logo-dispra.svg" alt="Dispra Distribuidora" width="120" height="98" loading="lazy">
      <p>Distribuição de produtos veterinários e suplementos minerais no Sul do Brasil, com frota própria e assistência técnica no campo.</p></div>
    <div><h3>Institucional</h3><ul>${[['empresa', 'Empresa'], ['nutricao', 'Nutrição PNI'], ['dispra-no-campo', 'Dispra no Campo'], ['artigos', 'Artigos Técnicos'], ['trabalhe-conosco', 'Trabalhe conosco']].map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}</ul></div>
    <div><h3>Comercial</h3><ul>${[['produtos', 'Produtos'], ['promocoes', 'Promoções'], ['atendimento', 'Representantes'], ['indicadores', 'Indicadores'], [site.nfe, 'NF-e']].map(([s, t]) => `<li><a href="${L(s)}"${alvo(s)}>${t}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul>
      <li><a href="tel:${site.gratisHref}">${site.gratis} <small>(ligação gratuita)</small></a></li>
      <li><a href="tel:${site.foneHref}">${site.fone}</a></li>
      <li><a href="mailto:${site.email}">${site.email}</a></li>
      <li><a href="${site.mapaLink}" target="_blank" rel="noopener">${site.endereco}<br>${site.cidade} · ${site.cep}</a></li>
      <li><a href="${site.facebook}" target="_blank" rel="noopener">Facebook</a></li></ul></div>
  </div>
  <div class="in r-base"><span>© Dispra Distribuidora · Joaçaba, Santa Catarina</span><span>${site.horario}</span></div>
</footer>`;
}

const opts = (lista, sel) => lista.map(o => `<option${o === sel ? ' selected' : ''}>${o}</option>`).join('');

export const formContato = (assunto = 'Compra de produtos') => `<form class="form" data-form>
  <label class="cheia"><span>Assunto</span><select name="assunto">${opts(assuntos, assunto)}</select></label>
  <label><span>Nome</span><input name="nome" required autocomplete="name"></label>
  <label><span>Telefone</span><input name="telefone" type="tel" required autocomplete="tel"></label>
  <label><span>Cidade</span><input name="cidade" required autocomplete="address-level2"></label>
  <label><span>Estado</span><select name="estado">${estados.map(([uf, n]) => `<option value="${uf}">${n}</option>`).join('')}<option value="Outro">Outro estado</option></select></label>
  <label class="cheia"><span>E-mail</span><input name="email" type="email" required autocomplete="email"></label>
  <label class="cheia"><span>Mensagem</span><textarea name="mensagem" rows="5"></textarea></label>
  <div class="form-acoes cheia"><button class="btn btn-prim" type="submit">Enviar mensagem ${ico('seta')}</button><a class="btn btn-sec" href="tel:${site.gratisHref}">${ico('fone')} ${site.gratis}</a></div>
</form>`;

export const formCadastro = () => `<form class="cadastro" data-cadastro>
  <label><span class="sr">Nome</span><input name="nome" placeholder="Seu nome" required autocomplete="name"></label>
  <label><span class="sr">E-mail</span><input name="email" type="email" placeholder="Seu e-mail" required autocomplete="email"></label>
  <button class="btn btn-prim" type="submit">Cadastrar</button>
</form>`;

export const FONTES = 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,600;0,700;0,800;1,800&family=Inter:wght@400;500;600&display=swap';

export function documento({ versao, slug, corpo, tema }) {
  const [titulo, desc] = paginas[slug];
  const caminho = `/${versao}/${slug === 'index' ? '' : slug + '/'}`;
  const url = site.dominio + caminho;
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
<meta property="og:site_name" content="Dispra Distribuidora">
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
<script src="/assets/dispra.js" defer></script>
</body>
</html>
`;
}
