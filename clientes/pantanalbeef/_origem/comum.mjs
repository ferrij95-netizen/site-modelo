// Peças comuns às duas versões: cabeçalho, rodapé, metatags, formulários e blocos do catálogo.
import { empresa, linhas, ordemLinhas, produtos, textos } from './dados.mjs';

export const DOM = 'https://pantanalbeef.overtus.com.br';
export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const im = (nome, alt = '', extra = '') => `<img src="/assets/img/${nome}${/\.(png|webp|jpg|svg)$/.test(nome) ? '' : '.webp'}" alt="${esc(alt)}" loading="lazy" decoding="async"${extra ? ' ' + extra : ''}>`;

export const NOMES = { a: 'Origem', b: 'Catálogo' };

export const menu = [
  { slug: '', t: 'Home' },
  { slug: 'institucional', t: 'Institucional', sub: [
    { slug: 'institucional', t: 'Quem somos' },
    { slug: 'pecuaria', t: 'Pecuária' },
    { slug: 'industria', t: 'Indústria' },
    { slug: 'distribuicao', t: 'Distribuição' },
    { slug: 'comercial', t: 'Comercial e exportação' },
  ] },
  { slug: 'sustentabilidade', t: 'Sustentabilidade' },
  { slug: 'marcas', t: 'Marcas' },
  { slug: 'trabalhe-conosco', t: 'Trabalhe conosco' },
  { slug: 'contato', t: 'Fale conosco' },
];

const fontes = {
  a: 'family=Ubuntu:ital,wght@0,500;0,700;1,700&family=Inter:wght@400;500;600',
  b: 'family=Ubuntu:ital,wght@0,500;0,700;1,500;1,700&family=Inter:wght@400;500;600',
};

export function head(v, { titulo, desc, caminho }) {
  const url = `${DOM}/${v}/${caminho ? caminho + '/' : ''}`;
  const t = titulo ? `${titulo} · Pantanal Beef` : 'Pantanal Beef · Frigorífico em Várzea Grande-MT, do Brasil para o mundo';
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Pantanal Beef">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(t)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${DOM}/assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(t)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${DOM}/assets/og-${v}.jpg">
<meta name="theme-color" content="${v === 'a' ? '#ffffff' : '#1d1e22'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontes[v]}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>`;
}

const icones = {
  Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/></svg>',
  Facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21z"/></svg>',
  LinkedIn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 8.5h3V19H5zM6.5 4a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5M10 8.5h2.9v1.4h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.6 2 3.6 4.6V19h-3v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V19h-3z"/></svg>',
};
export const redes = (cls = 'redes') => `<ul class="${cls}">${empresa.redes.map(r => `<li><a href="${r.url}" target="_blank" rel="noopener" aria-label="${r.nome}">${icones[r.nome]}</a></li>`).join('')}</ul>`;

export function cabecalho(v, atual) {
  const L = s => `/${v}/${s ? s + '/' : ''}`;
  const ativo = item => item.slug === atual || (item.sub || []).some(s => s.slug === atual);
  const itens = menu.map(it => it.sub
    ? `<li class="tem-sub${ativo(it) ? ' ativo' : ''}"><a href="${L(it.slug)}">${it.t}</a><button class="abre-sub" aria-label="Abrir ${it.t}" aria-expanded="false"><span></span></button><ul class="sub">${it.sub.map(s => `<li><a href="${L(s.slug)}"${s.slug === atual ? ' aria-current="page"' : ''}>${s.t}</a></li>`).join('')}</ul></li>`
    : `<li${ativo(it) ? ' class="ativo"' : ''}><a href="${L(it.slug)}"${it.slug === atual ? ' aria-current="page"' : ''}>${it.t}</a></li>`).join('');
  return `<a class="pular" href="#conteudo">Ir para o conteúdo</a>
<header class="topo" data-topo>
  <div class="in topo-in">
    <a class="marca" href="${L('')}" aria-label="Pantanal Beef, página inicial">${im(v === 'b' ? 'logo-branco.png' : 'logo', 'Pantanal Beef', 'width="190" height="61"')}</a>
    <nav class="nav" aria-label="Principal" data-nav>
      <ul>${itens}</ul>
      <a class="bt-catalogo${atual === 'catalogo' ? ' ativo' : ''}" href="${L('catalogo')}">Catálogo</a>
    </nav>
    ${redes('redes redes-topo')}
    <button class="bt-menu" aria-label="Abrir menu" aria-expanded="false" data-menu><span></span><span></span><span></span></button>
  </div>
</header>`;
}

export function rodape(v) {
  const L = s => `/${v}/${s ? s + '/' : ''}`;
  return `<footer class="rodape">
  <div class="in rodape-in">
    <div class="rodape-marca">
      ${im(v === 'b' ? 'logo-branco.png' : 'logo', 'Pantanal Beef', 'width="200" height="64"')}
      <p>Frigorífico Pantanal, desde ${empresa.desde}. Carne bovina com selo SIF, de Várzea Grande-MT para o Brasil e para o mundo.</p>
      ${redes()}
    </div>
    <nav class="rodape-links" aria-label="Rodapé">
      <ul><li><a href="${L('institucional')}">Institucional</a></li><li><a href="${L('pecuaria')}">Pecuária</a></li><li><a href="${L('industria')}">Indústria</a></li><li><a href="${L('distribuicao')}">Distribuição</a></li></ul>
      <ul><li><a href="${L('comercial')}">Comercial</a></li><li><a href="${L('marcas')}">Marcas</a></li><li><a href="${L('catalogo')}">Catálogo</a></li><li><a href="${L('sustentabilidade')}">Sustentabilidade</a></li></ul>
      <ul><li><a href="${L('trabalhe-conosco')}">Trabalhe conosco</a></li><li><a href="${L('contato')}">Fale conosco</a></li><li><a href="${L('marcas')}#linha-propria">Linha própria</a></li></ul>
    </nav>
    <address class="rodape-contato">
      <strong>Comercial</strong>
      <a href="tel:${empresa.comercial.href}">${empresa.comercial.tel}</a>
      <a href="mailto:${empresa.comercial.email}">${empresa.comercial.email}</a>
      <strong>SAC</strong>
      <a href="tel:${empresa.sac.href}">${empresa.sac.tel}</a>
      <a href="mailto:${empresa.sac.email}">${empresa.sac.email}</a>
      <span>${empresa.endereco.join('<br>')}</span>
    </address>
  </div>
  <div class="in rodape-base"><span>© ${new Date().getFullYear()} Pantanal Frigorífico. Todos os direitos reservados.</span><span>SIF · Ministério da Agricultura e Pecuária</span></div>
</footer>
<script src="/assets/site.js" defer></script>
</body>
</html>`;
}

export const pagina = (v, meta, atual, corpo, classe = '') => `${head(v, meta)}
<body class="v-${v}${classe ? ' ' + classe : ''}">
${cabecalho(v, atual)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}`;

// ---------- catálogo ----------
export const porLinha = l => produtos.filter(p => p.linha === l);
export const contagem = Object.fromEntries(ordemLinhas.map(l => [l, porLinha(l).length]));

export function tabela(p, cls = 'ficha') {
  const linhasT = [
    ['Código', p.codigo || 'Consultar'],
    p.armazenamento && ['Armazenamento', p.armazenamento],
    p.temperatura && ['Temperatura de conservação', p.temperatura],
    p.qtdCaixa && ['Qtde. média por caixa', p.qtdCaixa],
    p.pesoCaixa && [/ a /.test(p.pesoCaixa) ? 'Peso por caixa (mín. a máx.)' : p.pesoCaixa.includes('médio') ? 'Peso médio por caixa' : 'Peso médio por caixa', p.pesoCaixa.replace(' (médio)', '')],
  ].filter(Boolean);
  return `<table class="${cls}"><tbody>${linhasT.map(([k, val]) => `<tr><th scope="row">${k}</th><td>${esc(val)}</td></tr>`).join('')}</tbody></table>`;
}

export const nomeCurto = p => p.nome.replace(/\s*\(.*\)$/, '');
export const detalhe = p => (p.nome.match(/\((.*)\)$/) || [])[1] || '';

export function filtrosCatalogo() {
  return `<div class="filtros" data-filtros>
    <div class="filtro-grupo" role="group" aria-label="Linha">
      <button class="chip on" data-linha="">Todas <small>${produtos.length}</small></button>
      ${ordemLinhas.map(l => `<button class="chip" data-linha="${l}">${linhas[l].nome} <small>${contagem[l]}</small></button>`).join('')}
    </div>
    <div class="filtro-linha2">
      <div class="filtro-grupo" role="group" aria-label="Conservação">
        <button class="chip chip-s on" data-cons="">Resfriados e congelados</button>
        <button class="chip chip-s" data-cons="Resfriado">Resfriados</button>
        <button class="chip chip-s" data-cons="Congelado">Congelados</button>
      </div>
      <label class="busca"><span class="sr">Buscar corte</span><input type="search" placeholder="Buscar corte ou código" data-busca autocomplete="off"></label>
    </div>
    <p class="resultado" aria-live="polite" data-resultado>${produtos.length} itens</p>
  </div>`;
}

export const busca = p => [p.nome, p.codigo, linhas[p.linha].nome].join(' ').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// ---------- formulários ----------
export function formContato(v, titulo = 'Envie uma mensagem') {
  return `<form class="form" data-form>
    <h2>${titulo}</h2>
    <label class="campo largo"><span>Assunto</span><select name="assunto" required>
      <option value="comercial">Comercial e cotação</option><option value="exportacao">Exportação</option><option value="linha-propria">Linha própria</option><option value="pecuarista">Sou pecuarista (venda de gado)</option><option value="sac">SAC</option><option value="outros">Outros</option>
    </select></label>
    <label class="campo"><span>Nome</span><input name="nome" required autocomplete="name"></label>
    <label class="campo"><span>Empresa</span><input name="empresa" autocomplete="organization"></label>
    <label class="campo"><span>E-mail</span><input type="email" name="email" required autocomplete="email"></label>
    <label class="campo"><span>Telefone</span><input type="tel" name="telefone" autocomplete="tel"></label>
    <label class="campo largo"><span>Mensagem</span><textarea name="mensagem" rows="5" required data-produto></textarea></label>
    <label class="aceite largo"><input type="checkbox" required> <span>${esc(textos.lgpdContato)}</span></label>
    <button class="bt bt-cheio largo" type="submit">Enviar</button>
    <p class="aviso largo" hidden>Prévia do novo site: o envio será ligado ao e-mail da Pantanal Beef na publicação. Por enquanto, fale com o comercial em ${empresa.comercial.tel}.</p>
  </form>`;
}
