// Peças comuns às duas versões: documento com SEO completo, topo, rodapé, formulário de contato.
import { site, paginas, menu } from './conteudo.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const num = i => String(i + 1).padStart(2, '0');
export const zap = (txt = 'Olá. Vim pelo site da REM Consultoria Metz e gostaria de conversar sobre um diagnóstico.') => `https://wa.me/${site.zap}?text=${encodeURIComponent(txt)}`;
export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;
export const externo = u => /^https?:/.test(u);
export const alvo = u => (externo(u) ? ' target="_blank" rel="noopener"' : '');

// Link para outra página da mesma versão.
export const linkDe = versao => slug => (externo(slug) ? slug : `/${versao}/${slug === 'index' ? '' : slug + '/'}`);

// Faixa de três cores do logo (laranja, verde-azulado, vermelho): assinatura discreta da marca.
export const faixa = (cls = '') => `<span class="tri ${cls}" aria-hidden="true"><i></i><i></i><i></i></span>`;

export function topo({ versao, slug, logo }) {
  const L = linkDe(versao);
  const ativo = s => (slug === s || slug.startsWith(s + '/') ? ' aria-current="page"' : '');
  return `<header class="topo">
  <div class="in">
    <a class="marca" href="${L('index')}" aria-label="REM Consultoria Metz, início">${img(logo, 'REM Consultoria Metz', 'width="58" height="54" loading="eager"')}<span><b>REM</b> Consultoria Metz</span></a>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
    <nav id="nav">${menu.map(([s, t]) => `<a href="${L(s)}"${ativo(s)}>${t}</a>`).join('')}
      <a class="btn btn-prim nav-cta" href="${L('contato')}">Solicitar diagnóstico</a></nav>
  </div>
</header>`;
}

export function rodape({ versao, logo }) {
  const L = linkDe(versao);
  return `<footer class="rodape">
  <div class="in">
    <div class="r-marca">${img(logo, 'REM Consultoria Metz', 'width="72" height="66"')}<p>${site.extenso}. Consultoria em reestruturação empresarial com a metodologia do Sistema Toyota de Produção.</p></div>
    <div><h3>Navegação</h3><ul>${menu.map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul>
      <li><a href="tel:+${site.zap}">${site.fone}</a></li>
      <li><a href="${zap()}" target="_blank" rel="noopener">WhatsApp</a></li>
      <li><a href="mailto:${site.email}">${site.email}</a></li></ul></div>
    <div><h3>Redes sociais</h3><ul>${site.redes.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${n}</a></li>`).join('')}</ul></div>
  </div>
  <div class="in r-base">${faixa()}<span>${site.razao} · CNPJ ${site.cnpj}</span></div>
</footer>`;
}

export const formContato = () => `<form class="form" data-form>
  <label><span>Nome</span><input name="nome" required autocomplete="name"></label>
  <label><span>Empresa</span><input name="empresa" required autocomplete="organization"></label>
  <label><span>Telefone ou WhatsApp</span><input name="telefone" type="tel" autocomplete="tel"></label>
  <label><span>E-mail</span><input name="email" type="email" required autocomplete="email"></label>
  <label class="cheia"><span>Assunto</span><select name="assunto">
    <option>Diagnóstico sem compromisso</option><option>Consultoria estratégica</option><option>Método FlowMAP</option><option>Palestra</option><option>Mentoria</option><option>E-book ou jogo</option><option>Outro assunto</option>
  </select></label>
  <label class="cheia"><span>Mensagem</span><textarea name="mensagem" rows="5"></textarea></label>
  <div class="form-acoes cheia"><button class="btn btn-prim" type="submit" data-via="email">Enviar por e-mail</button><button class="btn btn-sec" type="submit" data-via="zap">Enviar pelo WhatsApp</button></div>
</form>`;

export const FONTES = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&family=Public+Sans:wght@400;500;600&display=swap';

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
<meta property="og:site_name" content="REM Consultoria Metz">
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
<link rel="stylesheet" href="/assets/metz-base.css">
<link rel="stylesheet" href="/assets/${versao}.css">
</head>
<body class="v-${versao} p-${slug.split('/')[0]}" data-email="${site.email}" data-zap="${site.zap}">
${corpo}
<script src="/assets/metz.js" defer></script>
</body>
</html>
`;
}
