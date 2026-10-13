// Peças comuns às duas versões: documento com SEO completo, topo, rodapé, formulário, ícones.
import fs from 'node:fs';
import path from 'node:path';
import { site, paginas, menu, produtos, anos } from './conteudo.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const num = i => String(i + 1).padStart(2, '0');
export const zap = (txt = 'Olá! Vim pelo site da BM Soluções em Aços e gostaria de um orçamento.') => `https://wa.me/${site.zap}?text=${encodeURIComponent(txt)}`;
export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;
export const linkDe = versao => slug => `/${versao}/${slug === 'index' ? '' : slug + '/'}`;
export const eyebrow = t => `<span class="eyebrow">${t}</span>`;
// Título em duas linhas, como no site atual ("CONHEÇA NOSSAS" fino em cima, "ESPECIALIDADES" forte embaixo).
export const titulo2 = (fino, forte, tag = 'h2') => `<${tag} class="t2"><small>${fino}</small>${forte}</${tag}>`;

// Ícones das áreas de atuação (SVGs do site atual), pintados com a cor do texto.
export const areaSvg = nome => fs.readFileSync(path.join(aqui, 'img', `icon-${nome}.svg`), 'utf8')
  .replace(/fill="#343434"/g, 'fill="currentColor"').replace(/<svg /, '<svg aria-hidden="true" class="area-ic" ').replace(/ width="\d+" height="\d+"/, '');

const svg = {
  fone: '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/>',
  zap: '<path d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.4 5 5.1-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5 0a6.5 6.5 0 0 1-3.3-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.1 11.1 0 0 0 4.3 3.8c1.6.7 2.2.8 3 .6a2.5 2.5 0 0 0 1.7-1.2 2 2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z"/>',
  email: '<path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.4 7H4v.6l8 5.6 8-5.6V7h-.4z"/>',
  local: '<path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>',
  relogio: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7z"/>',
  facebook: '<path d="M14 8V6.2c0-.8.2-1.2 1.4-1.2H17V2h-2.6C11.4 2 10.5 3.4 10.5 5.9V8H8.5v3h2v11H14V11h2.7l.3-3z"/>',
  instagram: '<path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM21.9 7.9c-.1-1.6-.4-3-1.6-4.2S17.7 2.2 16.1 2.1C14.5 2 9.5 2 7.9 2.1 6.3 2.2 4.9 2.5 3.7 3.7S2.2 6.3 2.1 7.9C2 9.5 2 14.5 2.1 16.1c.1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.6.1 6.6.1 8.2 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.6.1-6.6 0-8.2zm-2.1 10.1a3.3 3.3 0 0 1-1.9 1.9c-1.3.5-4.4.4-5.9.4s-4.6.1-5.9-.4a3.3 3.3 0 0 1-1.9-1.9c-.5-1.3-.4-4.4-.4-5.9s-.1-4.6.4-5.9a3.3 3.3 0 0 1 1.9-1.9c1.3-.5 4.4-.4 5.9-.4s4.6-.1 5.9.4a3.3 3.3 0 0 1 1.9 1.9c.5 1.3.4 4.4.4 5.9s.1 4.6-.4 5.9z"/>',
  seta: '<path d="M13.2 5.3 19.9 12l-6.7 6.7-1.4-1.4 4.3-4.3H4v-2h12.1l-4.3-4.3z"/>',
  pdf: '<path d="M6 2h8l6 6v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm7 1.5V9h5.5zM8 13v5h1.3v-1.6h.8a1.7 1.7 0 0 0 0-3.4zm1.3 1.1h.7a.6.6 0 0 1 0 1.2h-.7zm3.1-1.1v5h1.7a2.5 2.5 0 0 0 0-5zm1.3 1.1h.3a1.4 1.4 0 0 1 0 2.8h-.3zM17 13v5h1.3v-2h1.5v-1.1h-1.5v-.8h1.7V13z"/>',
  sac: '<path d="M12 2a8 8 0 0 0-8 8v1.1A3 3 0 0 0 2 14v2a3 3 0 0 0 3 3h2v-8H6v-1a6 6 0 0 1 12 0v1h-1v8h1.2c-.6 1.2-2.2 2-4.4 2.2a1.5 1.5 0 1 0 0 1.8c3.3-.2 5.8-1.7 6.4-4A3 3 0 0 0 22 16v-2a3 3 0 0 0-2-2.9V10a8 8 0 0 0-8-8z"/>',
};
export const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${svg[n]}</svg>`;
export const seta = ic('seta', 'ic-seta');

export const botaoZap = (txt = 'Falar no WhatsApp', cls = 'btn-prim', msg) => `<a class="btn ${cls}" href="${zap(msg)}" target="_blank" rel="noopener">${ic('zap')}${txt}</a>`;
export const botaoPdf = (url, txt = 'Catálogo completo') => `<a class="btn btn-pdf" href="${url}" target="_blank" rel="noopener">${ic('pdf')}${txt}</a>`;

export function topo({ versao, slug, logo }) {
  const L = linkDe(versao);
  const ativo = s => (slug === s || slug.startsWith(s + '/') ? ' aria-current="page"' : '');
  return `<div class="faixa-topo">
  <div class="in">
    <span>${ic('relogio')}${site.horario[0]}, ${site.horario[1].toLowerCase()}</span>
    <span class="ft-dir"><a href="tel:${site.foneHref}">${ic('fone')}${site.fone}</a><a href="${zap()}" target="_blank" rel="noopener">${ic('zap')}${site.zapTxt}</a><a href="mailto:${site.email}">${ic('email')}${site.email}</a>
    ${site.redes.map(([n, u]) => `<a class="rede" href="${u}" target="_blank" rel="noopener" aria-label="${n}">${ic(n.toLowerCase())}</a>`).join('')}</span>
  </div>
</div>
<header class="topo">
  <div class="in">
    <a class="marca" href="${L('index')}" aria-label="BM Soluções em Aços, início"><img src="/assets/${logo}.png" alt="BM Soluções em Aços Ltda." width="520" height="293"></a>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
    <nav id="nav" aria-label="Menu principal">
      ${menu.map(([s, t]) => s !== 'produtos' ? `<a href="${L(s)}"${s === 'index' ? (slug === 'index' ? ' aria-current="page"' : '') : ativo(s)}>${t}</a>`
        : `<div class="sub"><a href="${L(s)}"${ativo(s)}>${t}<i class="caret" aria-hidden="true"></i></a>
        <div class="sub-lista">${produtos.map(p => `<a href="${L('produtos/' + p.slug)}">${img(p.mini, '', 'width="40" height="40"')}<span>${p.nome}</span></a>`).join('')}</div></div>`).join('\n      ')}
      <a class="btn btn-prim nav-cta" href="${zap()}" target="_blank" rel="noopener">Solicitar orçamento</a>
    </nav>
  </div>
</header>`;
}

export function rodape({ versao, logo }) {
  const L = linkDe(versao);
  return `<footer class="rodape">
  <div class="in r-cols">
    <div class="r-marca"><img src="/assets/${logo}.png" alt="BM Soluções em Aços Ltda." width="520" height="293" loading="lazy"><p>Distribuição de aço carbono e inox, corte a laser e fabricação e instalação de telas desde ${site.fundacao}.</p></div>
    <div><h3>Navegação</h3><ul>${menu.map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}</ul></div>
    <div><h3>Produtos</h3><ul>${produtos.map(p => `<li><a href="${L('produtos/' + p.slug)}">${p.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Endereço</h3><p><a href="${site.mapaLink}" target="_blank" rel="noopener">${site.endereco}<br>${site.bairro}</a></p>
      <h3>Horário de atendimento</h3><p>${site.horario[0]}<br>${site.horario[1]}</p></div>
    <div><h3>Contato</h3><ul class="r-contato">
      <li><a href="tel:${site.foneHref}">${ic('fone')}${site.fone}</a></li>
      <li><a href="${zap()}" target="_blank" rel="noopener">${ic('zap')}${site.zapTxt}</a></li>
      <li><a href="mailto:${site.email}">${ic('email')}${site.email}</a></li></ul>
      <h3>Redes sociais</h3><ul class="r-contato">${site.redes.map(([n, u, h]) => `<li><a href="${u}" target="_blank" rel="noopener">${ic(n.toLowerCase())}${h}</a></li>`).join('')}</ul></div>
  </div>
  <div class="r-base"><div class="in"><span>© ${2026} ${site.razao} Todos os direitos reservados.</span><span>Canoas/RS · desde ${site.fundacao}</span></div></div>
</footer>`;
}

// Formulário que abre o e-mail (ou o WhatsApp) já preenchido: o site é estático.
export const formulario = ({ assunto = 'Contato pelo site', campos } = {}) => `<form class="form" data-form data-para="${site.email}" data-assunto="${esc(assunto)}">
  ${(campos || [['nome', 'Nome', 'text', true], ['celular', 'Telefone / WhatsApp', 'tel', true], ['email', 'E-mail', 'email', false, true], ['mensagem', 'Mensagem', 'textarea', true]]).map(([nome, rotulo, tipo = 'text', obrig = false, cheia = false]) => {
    const cls = cheia || tipo === 'textarea' ? ' class="cheia"' : '';
    const r = obrig ? ' required' : '';
    if (tipo === 'textarea') return `<label${cls}><span>${rotulo}</span><textarea name="${nome}" rows="4"${r}></textarea></label>`;
    if (Array.isArray(tipo)) return `<label${cls}><span>${rotulo}</span><select name="${nome}">${tipo.map(o => `<option>${o}</option>`).join('')}</select></label>`;
    return `<label${cls}><span>${rotulo}</span><input name="${nome}" type="${tipo}"${r}></label>`;
  }).join('\n  ')}
  <div class="form-acoes cheia"><button class="btn btn-prim" type="submit" data-via="zap">${ic('zap')}Enviar pelo WhatsApp</button><button class="btn btn-sec" type="submit" data-via="email">${ic('email')}Enviar por e-mail</button></div>
</form>`;

export const FONTES = 'https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@300;400;600;700;800&family=Inter:wght@400;500;600&display=swap';

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
<meta property="og:site_name" content="BM Soluções em Aços">
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
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTES}">
<link rel="stylesheet" href="/assets/bm-base.css">
<link rel="stylesheet" href="/assets/${versao}.css">
</head>
<body class="v-${versao} p-${slug.replace('/', '-')}" data-zap="${site.zap}">
${corpo}
<a class="zap-flutua" href="${zap()}" target="_blank" rel="noopener" aria-label="Falar com a BM pelo WhatsApp">${ic('zap')}</a>
<script src="/assets/bm.js" defer></script>
</body>
</html>
`;
}

export { anos };
