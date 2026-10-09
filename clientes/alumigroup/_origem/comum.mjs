// Peças comuns às duas versões: logo, ícones, documento com SEO completo, topo, rodapé e formulários.
import { site, paginas, menu } from './conteudo.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const num = i => String(i + 1).padStart(2, '0');
export const zap = (txt = 'Olá! Estou no site da Alumigroup e gostaria de informações.') => `https://wa.me/${site.zap}?text=${encodeURIComponent(txt)}`;
export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;
export const linkDe = versao => slug => `/${versao}/${slug === 'index' ? '' : slug + '/'}`;
export const mapa = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

// Logo da Alumigroup redesenhado em vetor a partir do PNG do site atual (143 x 50 px):
// símbolo em alumínio escovado com as faixas azul e vermelha, "ALUMI GROUP" em Montserrat.
let n = 0;
export function logo({ texto = '#fff', titulo = true } = {}) {
  const id = 'lg' + n++;
  return `<svg class="logo" viewBox="0 0 143 50" role="img" aria-label="Alumigroup"><defs>
<linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f4f4"/><stop offset=".5" stop-color="#b4b7bb"/><stop offset=".75" stop-color="#e2e3e5"/><stop offset="1" stop-color="#9a9ea3"/></linearGradient>
<linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a7aaae"/><stop offset=".55" stop-color="#f0f0f0"/><stop offset="1" stop-color="#8a8e93"/></linearGradient></defs>
<g fill="none" stroke-miterlimit="10">
<path d="M5 47 L25.5 4.5 L33.5 14" stroke="#4b4e52" stroke-width="7.4" transform="translate(1.1 1.1)"/><path d="M5 47 L25.5 4.5 L33.5 14" stroke="url(#${id}a)" stroke-width="7"/>
<path d="M37.5 12.5 L20 46 L55 46 L45 34 L34 34" stroke="#4b4e52" stroke-width="7.4" transform="translate(1.1 1.1)"/><path d="M37.5 12.5 L20 46 L55 46 L45 34 L34 34" stroke="url(#${id}b)" stroke-width="7"/>
<path d="M9.6 32.5 H21.5" stroke="#1d4ea6" stroke-width="3.2"/><path d="M34.5 34 H45.5" stroke="#b01f29" stroke-width="3.2"/></g>
${titulo ? `<g fill="${texto}" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="25"><text x="60" y="24" textLength="70" lengthAdjust="spacingAndGlyphs">ALUMI</text><text x="60" y="47.5" textLength="82" lengthAdjust="spacingAndGlyphs">GROUP</text></g>` : ''}</svg>`;
}

// Ícones de traço (cor = currentColor).
const P = {
  orcamento: '<path d="M10 4h15l7 7v15"/><path d="M25 4v7h7"/><path d="M10 4v36h14"/><path d="M15 16h10M15 22h12M15 28h7"/><path d="M34 27v14M30.5 30.5c0-1.6 1.6-2.5 3.5-2.5s3.5 1 3.5 2.6c0 3.6-7 2-7 5.6 0 1.6 1.6 2.6 3.5 2.6s3.5-.9 3.5-2.5"/>',
  solucoes: '<rect x="6" y="5" width="26" height="34" rx="2"/><path d="M11 13l2 2 4-4M11 22l2 2 4-4M11 31l2 2 4-4M21 13h6M21 22h6"/><circle cx="35" cy="34" r="4.5"/><path d="M35 26.5v3M35 38.5v3M27.5 34h3M39.5 34h3M29.7 28.7l2.1 2.1M38.2 37.2l2.1 2.1M29.7 39.3l2.1-2.1M38.2 30.8l2.1-2.1"/>',
  custo: '<path d="M5 8h26v20H17l-7 6v-6H5z"/><path d="M18 11v14M14.5 14.5c0-1.6 1.6-2.5 3.5-2.5s3.5 1 3.5 2.6c0 3.6-7 2-7 5.6 0 1.6 1.6 2.6 3.5 2.6s3.5-.9 3.5-2.5"/><path d="M34 15h9v19h-5v5l-6-5h-9v-3"/>',
  zap: '<path d="M8 40l2.4-7.2A16 16 0 1 1 16.8 39z"/><path d="M17.5 15.5c-.8 0-1.8.8-1.8 2.6 0 4.6 6 10.7 10.7 10.7 1.8 0 2.6-1 2.6-1.8l-.3-1.6-3.3-1.4-1.6 1.6c-2-.8-3.9-2.7-4.7-4.7l1.6-1.6-1.4-3.3z"/>',
  fone: '<path d="M14 6l5 9-3.5 3a19 19 0 0 0 10.5 10.5l3-3.5 9 5-1.5 6.5C25 37 11 23 7.5 7.5z"/>',
  local: '<path d="M24 43s13-12.5 13-23a13 13 0 0 0-26 0c0 10.5 13 23 13 23z"/><circle cx="24" cy="20" r="4.5"/>',
  hora: '<circle cx="24" cy="24" r="17"/><path d="M24 13v11l7 5"/>',
  seta: '<path d="M8 24h31M28 13l11 11-11 11"/>',
  chapa: '<path d="M6 30l14-9 22 6-14 9z"/><path d="M6 30v3l22 6v-3M28 39l14-9v-3"/>',
  bloco: '<path d="M8 18l14-7 18 6-14 7z"/><path d="M8 18v15l18 7V24M26 40l14-7V17"/>',
  vergalhao: '<path d="M6 32l32-18"/><path d="M10 36l32-18"/><path d="M6 32a2.3 2.3 0 0 0 4 4M38 14a2.3 2.3 0 0 1 4 4"/><path d="M14 29l1 3M19 26l1 3M24 23l1 3M29 20l1 3"/>',
  tarugo: '<ellipse cx="12" cy="30" rx="5" ry="8"/><path d="M12 22l26-8M12 38l26-8"/><path d="M38 14a5 8 0 0 1 0 16"/>',
  barra: '<path d="M5 27l8-4 30-10-8 4z"/><path d="M5 27v6l30-10v-6M35 23l8-4v-6"/>',
  vareta: '<path d="M6 34L40 12M9 37l34-22M12 40l34-22"/>',
  bobina: '<ellipse cx="24" cy="24" rx="17" ry="17"/><ellipse cx="24" cy="24" rx="12" ry="12"/><ellipse cx="24" cy="24" rx="7" ry="7"/><circle cx="24" cy="24" r="2.5"/>',
  po: '<path d="M10 38c2-9 7-14 14-14s12 5 14 14z"/><circle cx="16" cy="15" r="1.5"/><circle cx="23" cy="10" r="1.5"/><circle cx="30" cy="15" r="1.5"/><circle cx="20" cy="18" r="1.2"/><circle cx="27" cy="19" r="1.2"/><circle cx="35" cy="10" r="1.2"/><circle cx="12" cy="8" r="1.2"/>',
  prensa: '<path d="M8 6h32M14 6v10h20V6M18 16v6h12v-6"/><path d="M12 30h24v6H12zM6 40h36"/><path d="M24 23v4M21 25l3 3 3-3"/>',
  chama: '<path d="M24 42c-8 0-13-5-13-12 0-8 7-11 8-20 5 3 8 8 7 13 2-1 3-3 3-5 4 3 8 7 8 12 0 7-5 12-13 12z"/><path d="M24 42c-3 0-5-2-5-5 0-4 4-5 5-9 2 2 5 5 5 9 0 3-2 5-5 5z"/>',
  engrenagem: '<circle cx="24" cy="24" r="6"/><path d="M21 6h6l1 5 4 2 4-3 4 4-3 4 2 4 5 1v6l-5 1-2 4 3 4-4 4-4-3-4 2-1 5h-6l-1-5-4-2-4 3-4-4 3-4-2-4-5-1v-6l5-1 2-4-3-4 4-4 4 3 4-2z"/>',
};
export const icone = (nome, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[nome]}</svg>`;

export function topo({ versao, slug, claro = false }) {
  const L = linkDe(versao);
  const ativo = s => (slug === s ? ' aria-current="page"' : '');
  return `<div class="barra-topo"><div class="in">
  <span>${icone('hora', 'ic-p')}Seg. a qui. 07:30 às 18:00 · Sex. até 17:00</span>
  <span class="bt-dir"><a href="tel:${site.fixoHref}">${icone('fone', 'ic-p')}${site.fixo}</a><a href="${zap()}" target="_blank" rel="noopener">${icone('zap', 'ic-p')}${site.celular}</a></span>
</div></div>
<header class="topo">
  <div class="in">
    <a class="marca" href="${L('index')}" aria-label="Alumigroup, página inicial">${logo({ texto: claro ? '#26282c' : '#fff' })}</a>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
    <nav id="nav">${menu.map(([s, t]) => `<a href="${L(s)}"${ativo(s)}>${t}</a>`).join('')}
      <a class="btn btn-prim nav-cta" href="${L('contato')}">Solicitar orçamento</a></nav>
  </div>
</header>`;
}

export function rodape({ versao }) {
  const L = linkDe(versao);
  return `<footer class="rodape">
  <div class="in r-grade">
    <div class="r-marca"><a href="${L('index')}" aria-label="Alumigroup, página inicial">${logo()}</a><p>Metais não ferrosos sob medida, moldes planos e circulares para pneus e peças sinterizadas.</p>
      <a class="btn btn-zap" href="${zap()}" target="_blank" rel="noopener">${icone('zap', 'ic-p')}Falar no WhatsApp</a></div>
    <div><h3>Localização</h3>${site.unidades.map(u => `<p class="r-un"><b>${u.nome}</b>${u.linhas.join('<br>')}<br><a href="${mapa(u.mapa)}" target="_blank" rel="noopener">Ver no mapa</a></p>`).join('')}</div>
    <div><h3>Fale conosco</h3><ul>
      <li><a href="tel:${site.fixoHref}">${site.fixo}</a></li>
      <li><a href="${zap()}" target="_blank" rel="noopener">${site.celular} (WhatsApp)</a></li></ul>
      ${site.horario.map(([d, h]) => `<p class="r-h"><b>${d}</b>${h}</p>`).join('')}</div>
    <div><h3>Navegação</h3><ul>${menu.map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}<li><a href="${L('contato')}">Orçamento</a></li></ul></div>
  </div>
  <div class="in r-base"><span>© Alumigroup · Metais e Moldes · Novo Hamburgo/RS</span><span class="r-faixa" aria-hidden="true"><i></i><i></i></span></div>
</footer>`;
}

export const formOrcamento = () => `<form class="form" data-form="orcamento">
  <label><span>Nome</span><input name="Nome" required autocomplete="name"></label>
  <label><span>Empresa</span><input name="Empresa" autocomplete="organization"></label>
  <label><span>Telefone ou WhatsApp</span><input name="Telefone" type="tel" required autocomplete="tel"></label>
  <label><span>Cidade/UF</span><input name="Cidade" autocomplete="address-level2"></label>
  <label class="cheia"><span>Produto</span><select name="Produto">
    <option>Metais (chapas, blocos, tarugos, vergalhões)</option><option>Moldes planos</option><option>Moldes circulares</option><option>Sinterizados</option><option>Revitalização ou alteração de moldes</option><option>Outro assunto</option>
  </select></label>
  <label class="cheia"><span>Liga, formato, medidas e quantidade</span><textarea name="Detalhes" rows="5" placeholder="Ex.: chapa de alumínio 5052, 10 mm, 500 x 1000 mm, 4 peças"></textarea></label>
  <div class="form-acoes cheia"><button class="btn btn-prim" type="submit">${icone('zap', 'ic-p')}Enviar pelo WhatsApp</button><small>O pedido abre no WhatsApp da Alumigroup, já preenchido.</small></div>
</form>`;

export const formCurriculo = () => `<form class="form" data-form="curriculo">
  <label><span>Nome completo</span><input name="Nome" required autocomplete="name"></label>
  <label><span>Telefone ou WhatsApp</span><input name="Telefone" type="tel" required autocomplete="tel"></label>
  <label><span>E-mail</span><input name="E-mail" type="email" autocomplete="email"></label>
  <label><span>Cidade</span><input name="Cidade" autocomplete="address-level2"></label>
  <label class="cheia"><span>Área de interesse</span><input name="Área" placeholder="Ex.: produção, usinagem, expedição, administrativo"></label>
  <label class="cheia"><span>Conte um pouco da sua experiência</span><textarea name="Experiência" rows="4"></textarea></label>
  <label class="cheia arquivo"><span>Anexar currículo (PDF ou foto)</span><input name="curriculo" type="file" accept=".pdf,.doc,.docx,image/*"></label>
  <div class="form-acoes cheia"><button class="btn btn-prim" type="submit">Enviar</button><small>Seus dados abrem no WhatsApp da Alumigroup; anexe o currículo na conversa.</small></div>
</form>`;

export const FONTES = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap';

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
<meta property="og:site_name" content="Alumigroup">
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
<body class="v-${versao} p-${slug}" data-zap="${site.zap}">
${corpo}
<a class="zap-flut" href="${zap()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icone('zap')}</a>
<script src="/assets/alumi.js" defer></script>
</body>
</html>
`;
}
