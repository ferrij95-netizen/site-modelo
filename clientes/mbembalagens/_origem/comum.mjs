// Peças comuns às duas versões: documento com SEO completo, logo, tabela de medidas, formulário de orçamento.
import { site, paginas, linhas } from './conteudo.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const num = i => String(i + 1).padStart(2, '0');
export const zap = (txt = 'Olá! Vim pelo site da MB Embalagens e gostaria de um orçamento.') => `https://wa.me/${site.zap}?text=${encodeURIComponent(txt)}`;
export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;
export const logo = (branco = false) => `<img class="logo" src="/assets/logo-mb${branco ? '-branco' : ''}.png" alt="MB Embalagens" width="200" height="133">`;
export const seta = '<svg class="seta" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>';
export const iconeZap = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z"/></svg>';

export const tabela = p => `<div class="tabela-rolo"><table class="tabela">
  <thead><tr>${p.cols.map(c => `<th scope="col">${c}</th>`).join('')}</tr></thead>
  <tbody>${p.rows.map(r => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
</table></div>`;

const opcoes = linhas.flatMap(l => l.produtos.map(p => p.nome));
export const formOrcamento = () => `<form class="form" data-form>
  <label><span>Nome</span><input name="nome" required autocomplete="name"></label>
  <label><span>Empresa</span><input name="empresa" required autocomplete="organization"></label>
  <label><span>Cidade</span><input name="cidade" autocomplete="address-level2"></label>
  <label><span>Telefone ou WhatsApp</span><input name="telefone" type="tel" required autocomplete="tel"></label>
  <label class="cheia"><span>Produto</span><select name="produto">${opcoes.map(o => `<option>${o}</option>`).join('')}<option>Outro ou vários produtos</option></select></label>
  <label class="cheia"><span>Medidas e quantidades</span><textarea name="mensagem" rows="4" placeholder="Ex.: 20 fardos de bobina 5 litros e 10 caixas de sacola Padrão média."></textarea></label>
  <div class="form-acoes cheia"><button class="btn btn-prim" type="submit" data-via="zap">${iconeZap} Enviar pelo WhatsApp</button><button class="btn btn-sec" type="submit" data-via="email">Enviar por e-mail</button></div>
</form>`;

const FONTES = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Inter:wght@400;500;600&display=swap';

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
<meta property="og:site_name" content="MB Embalagens">
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
<link rel="stylesheet" href="/assets/mb-base.css">
<link rel="stylesheet" href="/assets/${versao}.css">
</head>
<body class="v-${versao} p-${slug.replace('/', '-')}" data-email="${site.email}" data-zap="${site.zap}">
${corpo}
<a class="zap-flutuante" href="${zap()}" aria-label="Falar pelo WhatsApp">${iconeZap}</a>
<script src="/assets/mb.js" defer></script>
</body>
</html>
`;
}

export { FONTES };
