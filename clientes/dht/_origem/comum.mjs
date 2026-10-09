// Esqueleto comum: SEO completo (Open Graph, Twitter, canonical), fontes, marca e peças das duas versões.
import { site, paginas, linhas } from './conteudo.mjs';
import { ilustra } from './ilustra.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const num = i => String(i + 1).padStart(2, '0');
export const linha = id => linhas.find(l => l.id === id);
export const todos = () => linhas.flatMap(l => l.itens.map(([cod, nome, ico, mat, med]) => ({ cod, nome, ico, mat, med, linha: l })));
export const zap = (txt = 'Olá! Vim pelo site e gostaria de uma cotação.') => `https://wa.me/${site.whats}?text=${encodeURIComponent(txt)}`;

export const marca = (cls = '') => `<span class="marca ${cls}"><svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="6" fill="currentColor"/><path d="M13 7h6v6h6v6h-6v6h-6v-6H7v-6h6z" fill="var(--marca-cruz, #fff)"/></svg><span class="marca-txt"><b>DHT</b><small>Indústria Médica</small></span></span>`;

export const selo = l => `<span class="selo selo-${l.origem}">${l.origem === 'fab' ? 'Fabricação própria' : 'Distribuição'}</span>`;

export const botaoCotacao = p => `<button class="add-cot" type="button" data-cod="${p.cod}" data-nome="${esc(p.nome)}"><span class="add-mais" aria-hidden="true">+</span><span class="add-txt">Adicionar à cotação</span></button>`;

export const cartao = p => `<article class="produto" data-busca="${esc((p.cod + ' ' + p.nome + ' ' + p.mat + ' ' + p.linha.nome).toLowerCase())}" data-linha="${p.linha.id}">
  <div class="produto-img">${ilustra(p.ico, p.nome)}</div>
  <div class="produto-info"><span class="produto-cod">${p.cod}</span><h3>${p.nome}</h3><p>${p.mat}<br>${p.med}</p></div>
  ${botaoCotacao(p)}
</article>`;

export const formCotacao = catalogo => `<form class="form" data-form>
  <div class="form-lista" data-lista><p class="form-vazia">Nenhum produto na lista ainda. Você pode escolher no <a href="${catalogo}">catálogo</a> ou descrever abaixo.</p></div>
  <label><span>Nome</span><input name="nome" required autocomplete="name"></label>
  <label><span>Empresa ou instituição</span><input name="empresa" required autocomplete="organization"></label>
  <label><span>CNPJ</span><input name="cnpj" inputmode="numeric"></label>
  <label><span>Cidade / UF</span><input name="cidade" autocomplete="address-level2"></label>
  <label><span>E-mail</span><input name="email" type="email" required autocomplete="email"></label>
  <label><span>Telefone / WhatsApp</span><input name="telefone" type="tel" autocomplete="tel"></label>
  <label class="cheia"><span>Produtos, quantidades e observações</span><textarea name="mensagem" rows="4"></textarea></label>
  <div class="form-acoes cheia"><button class="btn btn-prim" type="submit" data-via="zap">Enviar pelo WhatsApp</button><button class="btn btn-sec" type="submit" data-via="email">Enviar por e-mail</button></div>
</form>`;

export function documento({ versao, slug, css, corpo, tema }) {
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
<meta property="og:site_name" content="DHT Indústria Médica">
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/dht-base.css">
<link rel="stylesheet" href="/assets/${css}">
</head>
<body class="v-${versao} p-${slug.replace('/', '-')}" data-zap="${site.whats}" data-email="${site.email}">
${corpo}
<script src="/assets/dht.js" defer></script>
</body>
</html>
`;
}
