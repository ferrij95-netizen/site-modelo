// Peças comuns às duas versões: documento com SEO completo, logo em vetor, formulário de contato.
import { site, paginas } from './conteudo.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const num = i => String(i + 1).padStart(2, '0');
export const zap = (n = site.vendas.zap, txt = 'Olá! Vim pelo site da Instor e gostaria de falar com a equipe.') => `https://wa.me/${n}?text=${encodeURIComponent(txt)}`;
export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;

// Emblema redesenhado em vetor a partir do logo do site atual (hexágono com anel verde).
export const emblema = (cls = '') => `<svg class="emblema ${cls}" viewBox="0 0 100 112" aria-hidden="true">
  <path d="M50 4 93 28.5v55L50 108 7 83.5v-55Z" fill="none" stroke="var(--logo-cinza, #606060)" stroke-width="11" stroke-linejoin="miter"/>
  <rect x="0" y="46" width="100" height="20" fill="var(--logo-fundo, #fff)"/>
  <rect x="2" y="51" width="27" height="10" fill="var(--logo-cinza, #606060)"/><rect x="71" y="51" width="27" height="10" fill="var(--logo-cinza, #606060)"/>
  <path d="M50 26 75 40.5v31L50 86 25 71.5v-31Z" fill="none" stroke="var(--logo-cinza, #606060)" stroke-width="7"/>
  <path d="M60 22 68 36M40 90 32 76" stroke="var(--logo-fundo, #fff)" stroke-width="5"/>
  <circle cx="50" cy="56" r="14.5" fill="none" stroke="var(--logo-verde, #80b838)" stroke-width="6.5"/>
</svg>`;

export const logo = (cls = '') => `<span class="logo ${cls}">${emblema()}<span class="logo-txt"><b>instor</b><i>Projetos &amp; Robótica</i></span></span>`;

export const formContato = () => `<form class="form" data-form>
  <label><span>Nome</span><input name="nome" required autocomplete="name"></label>
  <label><span>Empresa</span><input name="empresa" required autocomplete="organization"></label>
  <label><span>E-mail</span><input name="email" type="email" required autocomplete="email"></label>
  <label><span>Telefone</span><input name="telefone" type="tel" autocomplete="tel"></label>
  <label class="cheia"><span>Assunto</span><select name="assunto">
    <option>Quero conhecer um robô</option><option>Serviço de inspeção ou pintura</option><option>Projeto especial</option><option>Compras</option><option>Financeiro</option><option>Trabalhe conosco</option>
  </select></label>
  <label class="cheia"><span>Mensagem</span><textarea name="mensagem" rows="4" placeholder="Conte o ambiente, o risco e o que precisa ser feito."></textarea></label>
  <div class="form-acoes cheia"><button class="btn btn-prim" type="submit" data-via="email">Enviar por e-mail</button><button class="btn btn-sec" type="submit" data-via="zap">Enviar pelo WhatsApp</button></div>
</form>`;

const FONTES = 'https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;0,500;0,700;1,400&family=Source+Sans+3:wght@400;600;700&display=swap';

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
<meta property="og:site_name" content="Instor Projetos e Robótica">
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
<link rel="stylesheet" href="/assets/instor-base.css">
<link rel="stylesheet" href="/assets/${versao}.css">
</head>
<body class="v-${versao} p-${slug.split('/')[0]}" data-email="${site.vendas.email}" data-zap="${site.vendas.zap}">
${corpo}
<script src="/assets/instor.js" defer></script>
</body>
</html>
`;
}

export { FONTES };
