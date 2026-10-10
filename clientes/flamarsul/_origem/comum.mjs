// Peças comuns às duas versões: documento com SEO completo, topo, rodapé, formulários, faixas.
import { site, paginas, menu, marcas, numeros } from './conteudo.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const num = i => String(i + 1).padStart(2, '0');
export const zap = (txt = site.zapMsg) => `https://wa.me/${site.zap}?text=${encodeURIComponent(txt)}`;
export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;
export const linkDe = versao => slug => `/${versao}/${slug === 'index' ? '' : slug + '/'}`;

// Ícone do site atual usado como máscara (a cor vem do CSS).
export const icone = (nome, extra = '') => `<span class="ico ico-${nome}" style="--ico:url(/assets/img/icone-${nome}.png)" aria-hidden="true">${extra}</span>`;
export const relogio48 = () => icone('relogio', '<b>48</b>');

// As três barras inclinadas do símbolo do logo, usadas como grafismo.
export const barras = (cls = '') => `<span class="barras ${cls}" aria-hidden="true"><i></i><i></i><i></i></span>`;

export const eyebrow = t => `<span class="eyebrow">${t}</span>`;

const svgZap = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.7 8.7 0 0 1-4.3-3.7c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.4 3.4 14.6 14.6 0 0 0 5.6 4.9c2 .9 2.8 1 3.9.8a3.3 3.3 0 0 0 2.1-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.1-.3-.2-.6-.4z"/></svg>';
export const svgFone = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>';
export { svgZap };

export function topo({ versao, slug, logo = 'logo-cor' }) {
  const L = linkDe(versao);
  const ativo = s => (slug === s ? ' aria-current="page"' : '');
  return `<div class="faixa-topo"><div class="in">
  <span>${site.horario[0][0]} · ${site.horario[0][1]}</span>
  <span class="ft-dir"><a href="tel:${site.foneHref}">${svgFone}${site.fone}</a><a href="${zap()}" target="_blank" rel="noopener">${svgZap}${site.zapTexto}</a><a href="${site.etica}" target="_blank" rel="noopener">Canal de Ética</a></span>
</div></div>
<header class="topo">
  <div class="in">
    <a class="marca" href="${L('index')}" aria-label="Flamarsul Distribuidora, início"><img src="/assets/${logo}.svg" alt="Flamarsul Distribuidora" width="196" height="49"></a>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
    <nav id="nav">
      ${menu.slice(1, 5).map(([s, t]) => `<a href="${L(s)}"${ativo(s)}>${t}</a>`).join('')}
      ${menu.slice(5).map(([s, t]) => `<a href="${L(s)}"${ativo(s)}>${t}</a>`).join('')}
      <a class="nav-mob" href="${site.etica}" target="_blank" rel="noopener">Canal de Ética</a>
      <a class="btn btn-prim nav-cta" href="${L('seja-nosso-cliente')}">Quero ser cliente</a>
    </nav>
  </div>
</header>`;
}

export function rodape({ versao }) {
  const L = linkDe(versao);
  return `<footer class="rodape">
  <div class="in r-cols">
    <div class="r-marca">
      <img src="/assets/logo-branco.svg" alt="Flamarsul Distribuidora" width="210" height="53">
      <p>A Flamarsul é referência entre as distribuidoras no Rio Grande do Sul, atuando no segmento há mais de 25 anos. Possui mais de 8 mil clientes e uma equipe de mais de 140 colaboradores pronta para atender o seu negócio com qualidade e agilidade, com entregas em até 48h.</p>
    </div>
    <div><h3>Acesso rápido</h3><ul>
      ${menu.slice(1).map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}
      <li><a href="${site.etica}" target="_blank" rel="noopener">Canal de Ética</a></li>
      <li><a href="${L('transparencia-e-igualdade-salarial')}">Transparência e Igualdade Salarial</a></li></ul></div>
    <div><h3>Horário de atendimento</h3><ul><li>Segunda a sexta</li><li>08:00 às 12:00</li><li>13:00 às 18:00</li></ul></div>
    <div><h3>Contato</h3><ul>
      <li><a href="tel:${site.foneHref}">${site.fone}</a></li>
      <li><a href="${zap()}" target="_blank" rel="noopener">${site.zapTexto} (WhatsApp)</a></li>
      <li><a href="mailto:${site.email}">${site.email}</a></li>
      <li><a href="${site.mapa}" target="_blank" rel="noopener">${site.endereco}<br>${site.bairro}</a></li></ul></div>
  </div>
  <div class="in r-base"><span>Todos os direitos reservados © ${site.razao} · CNPJ ${site.cnpj}</span><span>Cachoeirinha · Rio Grande do Sul</span></div>
</footer>`;
}

// Formulário que abre o e-mail (ou o WhatsApp) já preenchido: o site é estático.
export const formulario = ({ para = site.email, assunto, campos, botoes = true, extra = '', rotuloEnviar = 'Enviar por e-mail' }) => `<form class="form" data-form data-para="${para}" data-assunto="${esc(assunto)}">
  ${campos.map(([nome, rotulo, tipo = 'text', obrig = false, cheia = false]) => {
    const cls = cheia || tipo === 'textarea' ? ' class="cheia"' : '';
    const r = obrig ? ' required' : '';
    const ast = obrig ? ' <i>*</i>' : '';
    if (tipo === 'textarea') return `<label${cls}><span>${rotulo}${ast}</span><textarea name="${nome}" rows="5"${r}></textarea></label>`;
    if (Array.isArray(tipo)) return `<label${cls}><span>${rotulo}${ast}</span><select name="${nome}"${r}><option value="">Selecione</option>${tipo.map(o => `<option>${o}</option>`).join('')}</select></label>`;
    return `<label${cls}><span>${rotulo}${ast}</span><input name="${nome}" type="${tipo}"${r}></label>`;
  }).join('\n  ')}
  ${extra}
  <div class="form-acoes cheia"><button class="btn btn-prim" type="submit" data-via="email">${rotuloEnviar}</button>${botoes ? `<button class="btn btn-sec" type="submit" data-via="zap">${svgZap}Enviar pelo WhatsApp</button>` : ''}</div>
</form>`;

export const listaNumeros = (cls = '') => `<ul class="numeros ${cls}">${numeros.map(([n, t, d]) => `<li><b>${n}</b><span>${t}</span><small>${d}</small></li>`).join('')}</ul>`;

export const gradeMarcas = (L, cls = '') => `<ul class="marcas-grade ${cls}">${marcas.map(m => `<li><a href="${L('produtos')}#${m.slug}" title="${esc(m.nome)}">${img('marca-' + m.slug, m.nome)}</a></li>`).join('')}</ul>`;

export const FONTES = 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,500..800;1,600..800&family=Inter:wght@400;500;600&display=swap';

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
<meta property="og:site_name" content="Flamarsul Distribuidora">
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
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${versao}.css">
</head>
<body class="v-${versao} p-${slug}" data-zap="${site.zap}">
${corpo}
<a class="zap-flutua" href="${zap()}" target="_blank" rel="noopener" aria-label="Falar com a Flamarsul pelo WhatsApp">${svgZap}</a>
<script src="/assets/flamarsul.js" defer></script>
</body>
</html>
`;
}
