// Peças comuns às duas versões: documento com SEO completo, topo, rodapé, formulários, faixas de frota.
import { site, paginas, menu, servicos } from './conteudo.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const num = i => String(i + 1).padStart(2, '0');
export const zap = (txt = 'Olá. Vim pelo site da Vordex e gostaria de um orçamento.') => `https://wa.me/${site.zap}?text=${encodeURIComponent(txt)}`;
export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;
export const linkDe = versao => slug => `/${versao}/${slug === 'index' ? '' : slug + '/'}`;

// As duas barras inclinadas que a Vordex usa antes de cada título ("//FABRICAÇÃO INDUSTRIAL").
export const barras = '<i class="bb" aria-hidden="true">//</i>';
export const eyebrow = t => `<span class="eyebrow">${barras}${t}</span>`;

// O V do logo em vetor, para marca-d'água (como nas lâminas da apresentação).
export const marcaV = (cls = '') => `<img class="marca-v ${cls}" src="/assets/favicon.png" alt="" aria-hidden="true">`;

export function topo({ versao, slug, logo }) {
  const L = linkDe(versao);
  const ativo = s => (slug === s || slug.startsWith(s + '/') ? ' aria-current="page"' : '');
  return `<header class="topo">
  <div class="in">
    <a class="marca" href="${L('index')}" aria-label="Vordex Soluções Industriais, início"><img src="/assets/${logo}.png" alt="Vordex Soluções Industriais" width="190" height="52"></a>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
    <nav id="nav">
      <div class="sub"><a href="${L('servicos')}"${ativo('servicos')}>Serviços</a>
        <div class="sub-lista">${servicos.map(s => `<a href="${L('servicos/' + s.slug)}">${s.nome}</a>`).join('')}</div></div>
      ${menu.slice(1).map(([s, t]) => `<a href="${L(s)}"${ativo(s)}>${t}</a>`).join('')}
      <a class="btn btn-prim nav-cta" href="${zap()}" target="_blank" rel="noopener">Solicitar orçamento</a></nav>
  </div>
</header>`;
}

export function rodape({ versao, logo }) {
  const L = linkDe(versao);
  return `<footer class="rodape">
  <div class="in r-topo">
    <p class="r-frase">Há ${2026 - site.fundacao} anos contribuindo com o crescimento de diversas empresas.</p>
    <a class="btn btn-prim" href="${zap()}" target="_blank" rel="noopener">Falar pelo WhatsApp</a>
  </div>
  <div class="in r-cols">
    <div class="r-marca"><img src="/assets/${logo}.png" alt="Vordex Soluções Industriais" width="190" height="52"><p>${site.endereco}<br>${site.cidade}</p></div>
    <div><h3>Serviços</h3><ul>${servicos.map(s => `<li><a href="${L('servicos/' + s.slug)}">${s.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Institucional</h3><ul>${menu.slice(1).map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul>
      <li><a href="tel:+${site.zap}">${site.fone}</a></li>
      <li><a href="mailto:${site.email}">${site.email}</a></li>
      ${site.redes.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${n}</a></li>`).join('')}</ul></div>
  </div>
  <div class="in r-base"><span>Vordex Soluções Industriais · Conselheiro Lafaiete, MG</span><span>Atendimento 24 horas</span></div>
</footer>`;
}

// Formulário que abre o e-mail (ou o WhatsApp) já preenchido: o site é estático.
export const formulario = ({ para, assunto, campos, botoes = true, extra = '' }) => `<form class="form" data-form data-para="${para}" data-assunto="${esc(assunto)}">
  ${campos.map(([nome, rotulo, tipo = 'text', obrig = false, cheia = false]) => {
    const cls = cheia || tipo === 'textarea' ? ' class="cheia"' : '';
    const r = obrig ? ' required' : '';
    if (tipo === 'textarea') return `<label${cls}><span>${rotulo}</span><textarea name="${nome}" rows="5"${r}></textarea></label>`;
    if (Array.isArray(tipo)) return `<label${cls}><span>${rotulo}</span><select name="${nome}">${tipo.map(o => `<option>${o}</option>`).join('')}</select></label>`;
    return `<label${cls}><span>${rotulo}</span><input name="${nome}" type="${tipo}"${r}></label>`;
  }).join('\n  ')}
  ${extra}
  <div class="form-acoes cheia"><button class="btn btn-prim" type="submit" data-via="email">Enviar por e-mail</button>${botoes ? '<button class="btn btn-sec" type="submit" data-via="zap">Enviar pelo WhatsApp</button>' : ''}</div>
</form>`;

// Barras laranja com o número grande, como nas lâminas de frota da apresentação.
export const barrasFrota = (lista, cls = '') => `<ul class="frota-barras ${cls}">${lista.map(([n, t], i) => `<li style="--i:${i}"><b>${n}</b><span>${t}</span></li>`).join('')}</ul>`;

export const FONTES = 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,500..900&family=Inter:wght@400;500;600&display=swap';

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
<meta property="og:site_name" content="Vordex Soluções Industriais">
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
<link rel="stylesheet" href="/assets/vordex-base.css">
<link rel="stylesheet" href="/assets/${versao}.css">
</head>
<body class="v-${versao} p-${slug.split('/')[0]}${slug.includes('/') ? ' p-servico' : ''}" data-zap="${site.zap}">
${corpo}
<a class="zap-flutua" href="${zap()}" target="_blank" rel="noopener" aria-label="Falar com a Vordex pelo WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.7 8.7 0 0 1-4.3-3.7c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.4 3.4 14.6 14.6 0 0 0 5.6 4.9c2 .9 2.8 1 3.9.8a3.3 3.3 0 0 0 2.1-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.1-.3-.2-.6-.4z"/></svg></a>
<script src="/assets/vordex.js" defer></script>
</body>
</html>
`;
}
