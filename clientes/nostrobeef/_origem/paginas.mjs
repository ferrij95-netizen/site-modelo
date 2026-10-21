// Monta as páginas das versões A ("Selo": o azul-marinho do menu atual, a faixa de grama com o selo no meio,
// os painéis de canto arredondado sobre o rebanho e os botões vermelhos) e B ("Corte": claro, o bordô e o dourado
// do selo, o caminho do pasto ao pedido e uma lista de cotação de cortes que vira mensagem de WhatsApp).
// Estilos em public/assets/{base,a,b}.css.
import { empresa as E, textos as T, linhas, subprodutos, receitas, mercado, qualidades, formas, creditos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (src, alt, w, h, extra = '') => `<img src="/assets/${src}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const TAM = {
  'img/nelore-pasto': [2000, 1708], 'img/rebanho-preto': [767, 513], 'img/rebanho-misto': [720, 480], 'img/grama': [1920, 1280],
  'img/campo': [1920, 1200], 'img/rebanho-celular': [724, 289], 'img/marmoreio': [1024, 683], 'img/ancho-cru': [1024, 683], 'img/grelha': [1024, 480],
  'img/do-cheff': [500, 596],
  'prod/trad-62': [288, 400], 'prod/trad-73': [295, 400], 'prod/trad-74': [332, 400], 'prod/trad-80': [309, 400], 'prod/trad-84': [400, 400], 'prod/trad-89': [400, 400],
  'prod/prem-1': [225, 400], 'prod/prem-2': [351, 400], 'prod/prem-3': [400, 400], 'prod/prem-4': [400, 400], 'prod/prem-5': [400, 400],
  'prod/porc-carne-porcionada-01': [533, 400], 'prod/porc-carne-vacuna-porcionada-y-limpia': [450, 384], 'prod/porc-pulpa-de-res-pierna-450g': [400, 400],
  'prod/sub-farinha-de-carne-e-ossos': [532, 300], 'prod/sub-sebo-bovino': [282, 267],
};
const foto = (src, alt, extra = '') => { const [w, h] = TAM[src] || [222, 148]; return img(src, alt, w, h, extra); };
const fotoReceita = r => r.fotoBanco ? foto('img/grelha', `${r.nome}: carne na grelha`) : img(`img/${r.foto}`, r.nome, 222, 148);

export const nomesVersao = { a: 'Selo', b: 'Corte' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'contato', nome: 'Fale Conosco', caminho: 'contato/' },
  { slug: 'receitas', nome: 'Receitas', caminho: 'receitas/' },
  { slug: 'parceiros', nome: 'Parceiros', caminho: 'parceiros/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  zap: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1.1z"/><path d="M9 9.5c.3 2 1.8 3.8 4 4.5l1-1.2 1.8.8c-.2 1-1 1.6-2 1.6A6 6 0 017.8 9.6c0-1 .6-1.8 1.6-2l.8 1.8z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  floco: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5L12 7l2.5-2.5M9.5 19.5L12 17l2.5 2.5"/>',
  caixa: '<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  faca: '<path d="M4 20L16 8l3-3c1 1 1 3 0 4l-9 9z"/><path d="M4 20l3-1"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pessoas: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.2c3 0 5.5 2.2 5.5 5.8"/>',
  loja: '<path d="M4 9l1.5-5h13L20 9M4 9h16v11H4zM4 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 2 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3M10 20v-5h4v5"/>',
  carrinho: '<path d="M3 4h2l2.5 11h11L21 7H6.2"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/>',
  prato: '<circle cx="12" cy="13" r="7"/><circle cx="12" cy="13" r="3.5"/><path d="M3 4v5M21 4v5"/>',
  fogo: '<path d="M12 21c-4 0-6.5-2.6-6.5-6 0-4 4-6 4.5-11 2.5 2 3.5 4 3.5 6 1-1 1.5-2 1.5-3 2.5 2.2 3.5 5 3.5 8 0 3.4-2.5 6-6.5 6z"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const iconeMercado = ['caixa', 'carrinho', 'loja', 'prato', 'fogo'];
const iconeForma = ['floco', 'floco', 'faca', 'faca'];

const zap = (msg = 'Olá, vim pelo site da Nostro Beef e gostaria de falar com o comercial.') => `https://wa.me/${E.whats}?text=${encodeURIComponent(msg)}`;

// ---------- moldura ----------
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&family=Inter:wght@400;500;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500;600;700&family=Inter:wght@400;500;600&display=swap',
};
function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${E.nomeLongo}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#16223F' : '#6B1410'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTES[v]}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const ehAtual = (n, atual) => n.slug === atual || (n.slug === 'produtos' && ['bovinos', 'subprodutos'].includes(atual)) || (n.slug === 'receitas' && atual === 'receita');
const link = (v, n, atual) => `<a href="/${v}/${n.caminho}"${ehAtual(n, atual) ? ' aria-current="page"' : ''}>${n.nome}</a>`;
const logo = (w = 160) => `<img src="/assets/logo.webp" alt="Nostro Beef, Carnes Selecionadas" width="${w}" height="${Math.round(w * 637 / 600)}">`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const subProdutos = v => `<span class="sub"><a href="/${v}/produtos/bovinos/">Bovinos</a><a href="/${v}/produtos/subprodutos/">Subprodutos</a></span>`;

function topo(v, atual) {
  if (v === 'a') return `<header class="topo">
  <div class="topo-grama"><div class="in">
    <a class="topo-zap" href="${zap()}" target="_blank" rel="noopener">${ic('zap')} WhatsApp</a>
    <a class="marca" href="/a/" aria-label="Nostro Beef, início">${logo(200)}</a>
    <a class="topo-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
  </div></div>
  <div class="topo-menu"><div class="in">
    <a class="marca-cel" href="/a/" aria-label="Nostro Beef, início">${logo(58)}<span>Nostro Beef</span></a>
    <nav id="menu" class="menu" aria-label="Principal">${nav.map(n => n.slug === 'produtos' ? `<span class="tem-sub">${link(v, n, atual)}${subProdutos(v)}</span>` : link(v, n, atual)).join('')}</nav>
    ${menuBtn}
  </div></div>
</header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Nostro Beef, início">${logo(62)}<span class="marca-t"><b>Nostro Beef</b><small>${T.selo}</small></span></a>
  <nav id="menu" class="menu" aria-label="Principal">${nav.map(n => link(v, n, atual)).join('')}
    <a class="btn btn-p menu-cta" href="/b/produtos/bovinos/#cotacao">${ic('lista')} Pedir cotação</a></nav>
  ${menuBtn}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(110)}<p><b>${E.razao.toUpperCase()}</b><br>${E.tipo.toUpperCase()}</p></div>
  <div><h3>Fale conosco</h3><p><a class="rod-tel" href="tel:${E.foneHref}">${E.fone}</a><br><a href="${zap()}" target="_blank" rel="noopener">WhatsApp ${E.whatsTxt}</a></p><p class="rod-uni">${ic('pin')} Unidade ${E.cidade}</p></div>
  <nav aria-label="Produtos"><h3>Produtos</h3>${linhas.map(l => `<a href="/${v}/produtos/bovinos/#${l.slug}">${l.nome.replace('Linha ', '')}</a>`).join('')}<a href="/${v}/produtos/subprodutos/">Subprodutos</a></nav>
  <nav aria-label="Rodapé"><h3>Site</h3>${nav.map(n => link(v, n, '')).join('')}</nav>
</div><p class="rod-fim">© Nostro Beef Alimentos · ${E.cidade}</p><p class="rod-cred">${creditos}</p></footer>
<a class="zap-flutua" href="${zap()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('zap')}</a>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo) => `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${sl}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, sl)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// ---------- blocos comuns ----------
const formContato = () => `<form class="form" data-form>
  <div class="campos">
    <label>Nome<input name="Nome" autocomplete="name" required></label>
    <label>E-mail<input name="E-mail" type="email" autocomplete="email" required></label>
    <label>Telefone<input name="Telefone" type="tel" autocomplete="tel"></label>
    <label>Assunto do contato<select name="Assunto"><option>Comprar / cotação</option><option>Quero ser parceiro</option><option>Subprodutos (farinha e sebo)</option><option>Outros assuntos</option></select></label>
    <label>Cidade<input name="Cidade" autocomplete="address-level2"></label>
    <label>Estado<input name="Estado" autocomplete="address-level1" maxlength="20"></label>
    <label class="largo">Mensagem<textarea name="Mensagem" rows="5" required></textarea></label>
  </div>
  <button class="btn btn-p" type="submit">Enviar ${ic('seta')}</button>
  <p class="form-ok" role="status" hidden>Mensagem pronta. Nesta prévia o envio está desligado; no site no ar ela chega direto no e-mail da Nostro Beef. Enquanto isso, ligue <a href="tel:${E.foneHref}">${E.fone}</a>.</p>
</form>`;

const contatoLados = v => `<div class="contato-dados">
  <a class="cd-item" href="tel:${E.foneHref}">${ic('tel')}<span><small>Telefone</small><b>${E.fone}</b></span></a>
  <a class="cd-item" href="${zap()}" target="_blank" rel="noopener">${ic('zap')}<span><small>WhatsApp</small><b>${E.whatsTxt}</b></span></a>
  <div class="cd-item">${ic('pin')}<span><small>Unidade</small><b>${E.cidade}</b></span></div>
  <p class="cd-razao">${E.razao}<br>${E.tipo}</p>
</div>`;

const galeria = (l, cls = 'gal') => `<div class="${cls}" data-gal>
  <figure class="gal-grande">${foto('prod/' + l.fotos[0], `${l.nome}: produto Nostro Beef`, ' data-gal-alvo')}</figure>
  <div class="gal-mini" role="group" aria-label="Fotos da ${esc(l.nome)}">${l.fotos.map((f, i) => `<button type="button" data-gal-src="/assets/prod/${f}.webp" aria-pressed="${i === 0}" aria-label="Foto ${i + 1}">${foto('prod/' + f, '')}</button>`).join('')}</div>
</div>`;

const receitaLink = (v, r, cls = 'rec') => `<a class="${cls}" href="/${v}/receitas/${r.slug}/"><span class="rec-img">${fotoReceita(r)}</span><span class="rec-t"><b>${r.nome}</b><small>${r.corte ? `Corte: ${r.corte}` : 'Acompanhamento'}</small></span></a>`;

// ---------- versão A: Selo ----------
const A = {
  index() {
    const [trad, porc, prem] = linhas;
    return `<section class="a-hero">
  ${foto('img/nelore-pasto', 'Rebanho Nelore no pasto', ' fetchpriority="high" loading="eager"')}
  <div class="in a-hero-in">
    <p class="eyebrow">Frigorífico · ${E.cidade}</p>
    <h1>Carne bovina resfriada e congelada, com osso e desossada</h1>
    <p class="a-hero-sub">Do rebanho selecionado às caixas que chegam ao atacado, ao supermercado e à churrascaria.</p>
    <div class="acoes"><a class="btn btn-p" href="/a/produtos/">Ver produtos ${ic('seta')}</a><a class="btn btn-claro" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div>
  </div>
</section>

<section class="a-painel-sec">
  <div class="in a-paineis">
    <article class="a-painel a-painel-texto">
      <p><b>Nostro Beef</b>, ${T.intro}</p>
      <p>${T.rebanho}</p>
      <p>${T.premium}</p>
      <p>${T.mercado}</p>
      <a class="link link-ouro" href="/a/empresa/">Conheça a empresa ${ic('seta')}</a>
    </article>
    <article class="a-painel a-painel-prod">
      <div class="a-pp-topo"><h2>Produtos</h2><div class="a-pp-btns"><a class="btn-verm" href="/a/produtos/bovinos/">Bovinos</a><a class="btn-verm" href="/a/produtos/subprodutos/">Subprodutos</a></div></div>
      ${galeria({ ...trad, fotos: ['trad-84', 'prem-3', 'trad-62', 'porc-carne-porcionada-01', 'prem-2'] }, 'gal gal-painel')}
    </article>
  </div>
</section>

<section class="a-linhas">
  <div class="in">
    <p class="eyebrow">Linha de produtos bovinos</p>
    <h2 class="a-tit">Três linhas para cada tipo de cliente</h2>
    <div class="a-linhas-grade">
      <a class="a-linha" href="/a/produtos/bovinos/#tradicionais">
        <span class="a-linha-img">${foto('prod/trad-89', 'Caixa de cortes tradicionais Nostro Beef')}</span>
        <span class="a-linha-n">${trad.cortes.length} cortes</span><h3>${trad.curto}</h3><p>${trad.cortes.slice(0, 6).join(', ')} e mais.</p>
      </a>
      <a class="a-linha" href="/a/produtos/bovinos/#porcionados">
        <span class="a-linha-img">${foto('prod/porc-carne-vacuna-porcionada-y-limpia', 'Carne porcionada')}</span>
        <span class="a-linha-n">Sob pedido</span><h3>${porc.curto}</h3><p>${porc.cortes.join(', ')}.</p>
      </a>
      <a class="a-linha a-linha-prem" href="/a/produtos/bovinos/#premium">
        <span class="a-linha-img">${foto('prod/prem-4', 'Picanha Do Cheff Premium embalada')}</span>
        <span class="a-linha-n">Brangus e Braford</span><h3>${prem.curto}</h3><p>${prem.cortes.slice(0, 5).join(', ')} e mais.</p>
      </a>
    </div>
  </div>
</section>

<section class="a-semperda">
  <div class="in"><p>${ic('faca')} ${T.semPerdas}</p><a class="btn btn-branco" href="/a/produtos/bovinos/#porcionados">Cortes porcionados ${ic('seta')}</a></div>
</section>

<section class="a-cheff">
  <div class="in a-cheff-in">
    <div class="a-cheff-logo">${foto('img/do-cheff', 'Do Cheff Premium, linha premium da Nostro Beef')}</div>
    <div>
      <p class="eyebrow">Linha Premium</p>
      <h2>Do Cheff Premium</h2>
      <p>${T.premium}</p>
      <ul class="a-quali">${qualidades.map(q => `<li>${q}</li>`).join('')}</ul>
      <p class="a-cheff-cortes">${prem.cortes.join(' · ')}</p>
    </div>
    <figure class="a-cheff-foto">${foto('img/marmoreio', 'Marmoreio da carne')}</figure>
  </div>
</section>

<section class="a-mercado">
  <div class="in">
    <h2 class="a-tit">Para quem vendemos</h2>
    <ul class="a-mercado-lista">${mercado.map((m, i) => `<li>${ic(iconeMercado[i])}<span>${m}</span></li>`).join('')}</ul>
    <p class="a-mercado-txt">${T.porcionados}</p>
  </div>
</section>

<section class="a-receitas">
  <div class="in">
    <div class="a-rec-topo"><div><p class="eyebrow">Receitas</p><h2 class="a-tit">Do frigorífico para a sua mesa</h2></div><a class="link" href="/a/receitas/">Todas as receitas ${ic('seta')}</a></div>
    <div class="a-rec-lista">${receitas.filter(r => !r.acompanhamento).slice(0, 4).map(r => receitaLink('a', r)).join('')}</div>
  </div>
</section>

${A.faixaContato()}`;
  },

  faixaContato() {
    return `<section class="a-cta">
  ${foto('img/campo', '')}
  <div class="in a-cta-in">
    <div><h2>Faça seu pedido</h2><p>Atendemos atacadistas, supermercados, hipermercados, restaurantes e churrascarias.</p></div>
    <div class="a-cta-tel"><a href="tel:${E.foneHref}">${E.fone}</a><a class="btn btn-p" href="${zap('Olá, gostaria de fazer um pedido com a Nostro Beef.')}" target="_blank" rel="noopener">${ic('zap')} Pedir pelo WhatsApp</a></div>
  </div>
</section>`;
  },

  cabeca(eyebrow, titulo, sub = '', fundo = 'img/grama') {
    return `<section class="a-cab">${foto(fundo, '')}<div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;
  },

  empresa() {
    return `${A.cabeca('Empresa', 'Nostro Beef', `Entreposto frigorífico em ${E.cidade}.`, 'img/nelore-pasto')}
<section class="a-sec">
  <div class="in a-emp">
    <div class="a-emp-txt">
      <p class="a-lead"><b>Nostro Beef</b>, ${T.intro}</p>
      <p>${T.rebanho}</p>
      <p>${T.premium}</p>
      <p>${T.mercado}</p>
      <p>${T.porcionados}</p>
    </div>
    <div class="a-emp-fotos">
      <figure>${foto('img/rebanho-misto', 'Gado do rebanho Nostro Beef')}</figure>
      <figure>${foto('img/rebanho-preto', 'Rebanho de gado preto no pasto')}</figure>
    </div>
  </div>
</section>
<section class="a-formas">
  <div class="in"><h2 class="a-tit">Como a carne sai do frigorífico</h2>
  <ul>${formas.map((f, i) => `<li>${ic(iconeForma[i])}<b>${f}</b></li>`).join('')}</ul></div>
</section>
<section class="a-sec a-emp-mercado">
  <div class="in"><h2 class="a-tit">Nosso mercado</h2><ul class="a-mercado-lista">${mercado.map((m, i) => `<li>${ic(iconeMercado[i])}<span>${m}</span></li>`).join('')}</ul></div>
</section>
${A.faixaContato()}`;
  },

  produtos() {
    return `${A.cabeca('Produtos', 'Produtos Nostro Beef', 'Carne bovina em três linhas e subprodutos do abate.')}
<section class="a-sec">
  <div class="in a-prod-duas">
    <a class="a-prod-grande" href="/a/produtos/bovinos/">
      ${foto('prod/trad-84', 'Caixa Nostro Beef com cortes bovinos')}
      <span class="a-pg-t"><small>${linhas.reduce((n, l) => n + l.cortes.length, 0)} itens em 3 linhas</small><b>Bovinos</b><span class="btn-verm">Ver linha bovina ${ic('seta')}</span></span>
    </a>
    <a class="a-prod-grande" href="/a/produtos/subprodutos/">
      ${foto('prod/sub-farinha-de-carne-e-ossos', 'Farinha de carne e ossos')}
      <span class="a-pg-t"><small>Farinha e sebo</small><b>Subprodutos</b><span class="btn-verm">Ver subprodutos ${ic('seta')}</span></span>
    </a>
  </div>
</section>
<section class="a-sec a-sec-cinza">
  <div class="in">
    <h2 class="a-tit">Linhas bovinas</h2>
    <div class="a-prod-linhas">${linhas.map(l => `<a href="/a/produtos/bovinos/#${l.slug}"><b>${l.nome}</b><span>${l.texto}</span><small>${l.cortes.length} ${l.slug === 'porcionados' ? 'formatos' : 'cortes'} ${ic('seta')}</small></a>`).join('')}</div>
  </div>
</section>
${A.faixaContato()}`;
  },

  bovinos() {
    return `${A.cabeca('Produtos · Bovinos', 'Linha de Produtos Bovinos', T.semPerdas)}
<nav class="a-ancoras" aria-label="Linhas"><div class="in">${linhas.map(l => `<a href="#${l.slug}">${l.curto}</a>`).join('')}</div></nav>
${linhas.map((l, i) => `<section class="a-sec a-linha-sec${i % 2 ? ' a-sec-cinza' : ''}${l.slug === 'premium' ? ' a-linha-prem-sec' : ''}" id="${l.slug}">
  <div class="in a-linha-det">
    <div>
      ${l.slug === 'premium' ? `<div class="a-cheff-mini">${foto('img/do-cheff', 'Do Cheff Premium')}</div>` : ''}
      <h2>${l.nome}</h2>
      <p>${l.slug === 'premium' ? T.premium : l.slug === 'porcionados' ? `${T.porcionados} ${T.semPerdas}` : l.texto}</p>
      <ul class="a-cortes">${l.cortes.map(c => `<li>${c}</li>`).join('')}</ul>
      <a class="btn btn-p" href="${zap(`Olá, gostaria de uma cotação da ${l.nome} da Nostro Beef.`)}" target="_blank" rel="noopener">${ic('zap')} Cotar esta linha</a>
    </div>
    ${galeria(l)}
  </div>
</section>`).join('\n')}
${A.faixaContato()}`;
  },

  subprodutos() {
    return `${A.cabeca('Produtos · Subprodutos', 'Linha de Subprodutos', 'Farinha de carne e ossos e sebo bovino, do próprio frigorífico.')}
<section class="a-sec">
  <div class="in a-sub">${subprodutos.map(s => `<article class="a-sub-item">
    <figure>${foto('prod/' + s.foto, s.nome)}</figure>
    <div><h2>${s.nome}</h2><p>Subproduto do abate na Nostro Beef, ${E.cidade}. Consulte volumes e disponibilidade com o comercial.</p>
    <a class="btn btn-p" href="${zap(`Olá, gostaria de informações sobre ${s.nome.toLowerCase()} da Nostro Beef.`)}" target="_blank" rel="noopener">${ic('zap')} Consultar</a></div>
  </article>`).join('')}</div>
</section>
${A.faixaContato()}`;
  },

  receitas() {
    return `${A.cabeca('Receitas', 'Receitas', 'As receitas do site da Nostro Beef, com os cortes da casa.')}
<section class="a-sec">
  <div class="in">
    <div class="a-rec-lista a-rec-todas">${receitas.map(r => receitaLink('a', r)).join('')}</div>
  </div>
</section>`;
  },

  receita(r) {
    const i = receitas.indexOf(r), prox = receitas[(i + 1) % receitas.length];
    return `${A.cabeca('Receitas', r.nome, r.resumo || '')}
<section class="a-sec">
  <div class="in a-rec-det">
    <aside>
      <figure class="a-rec-foto">${fotoReceita(r)}</figure>
      ${r.corte ? `<div class="a-rec-corte"><small>Corte usado</small><b>${r.corte}</b><a class="link" href="/a/produtos/bovinos/#${r.linha}">Ver na linha ${linhas.find(l => l.slug === r.linha).curto} ${ic('seta')}</a></div>` : ''}
    </aside>
    <div>
      <h2>Ingredientes</h2>
      <ul class="a-ingr">${r.ingredientes.map(x => `<li>${x}</li>`).join('')}</ul>
      <h2>Modo de preparo</h2>
      <ol class="a-passos">${r.preparo.map(x => `<li>${x}</li>`).join('')}</ol>
      ${r.dica ? `<div class="a-dica"><b>Dica</b>${r.dica.map(d => `<p>${d}</p>`).join('')}</div>` : ''}
      ${r.info ? `<p class="a-rec-info">${ic('relogio')} ${r.info}</p>` : ''}
      <p class="a-rec-nav"><a class="link" href="/a/receitas/">Todas as receitas</a><a class="link" href="/a/receitas/${prox.slug}/">Próxima: ${prox.nome} ${ic('seta')}</a></p>
    </div>
  </div>
</section>`;
  },

  parceiros() {
    return `${A.cabeca('Parceiros', 'Parceiros comerciais', T.mercado)}
<section class="a-sec">
  <div class="in a-parc">
    <div>
      <h2 class="a-tit">Seja um cliente parceiro</h2>
      <p>${T.porcionados}</p>
      <ul class="a-parc-lista">
        <li>${ic('check')} Cortes tradicionais, porcionados e a linha Premium Do Cheff</li>
        <li>${ic('check')} Carne resfriada ou congelada, com osso ou desossada</li>
        <li>${ic('check')} Porcionamento conforme o pedido, sem perdas</li>
      </ul>
      <div class="acoes"><a class="btn btn-p" href="${zap('Olá, quero ser cliente parceiro da Nostro Beef.')}" target="_blank" rel="noopener">${ic('zap')} Quero ser parceiro</a><a class="btn btn-contorno" href="/a/contato/">Formulário</a></div>
    </div>
    <ul class="a-mercado-lista a-mercado-col">${mercado.map((m, i) => `<li>${ic(iconeMercado[i])}<span>${m}</span></li>`).join('')}</ul>
  </div>
</section>`;
  },

  contato() {
    return `${A.cabeca('Fale Conosco', 'Fale Conosco', 'Pedidos, cotações e parcerias.')}
<section class="a-sec">
  <div class="in a-contato">${contatoLados('a')}<div class="a-form-caixa"><h2>Envie sua mensagem</h2>${formContato()}</div></div>
</section>`;
  },
};

// ---------- versão B: Corte ----------
const B = {
  index() {
    const [trad, porc, prem] = linhas;
    const etapas = [
      { t: 'Rebanho selecionado', txt: T.rebanho, f: 'img/rebanho-misto', alt: 'Gado no pasto' },
      { t: 'Frigorífico', txt: `Carne bovina ${formas.map(f => f.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' e $1')}, embalada a vácuo e em caixa Nostro Beef.`, f: 'prod/trad-84', alt: 'Caixa Nostro Beef com cortes embalados' },
      { t: 'Porcionamento', txt: `${porc.cortes.join(', ')}. ${T.semPerdas}`, f: 'prod/porc-carne-porcionada-01', alt: 'Carne porcionada' },
      { t: 'Seu balcão', txt: T.mercado, f: 'img/grelha', alt: 'Carne na grelha' },
    ];
    return `<section class="b-hero">
  <div class="b-hero-txt">
    <p class="eyebrow">Frigorífico · ${E.cidade}</p>
    <h1>${T.selo}</h1>
    <p>Carne bovina resfriada e congelada, com osso e desossada, para atacado, varejo e food service.</p>
    <div class="acoes"><a class="btn btn-ouro" href="/b/produtos/bovinos/#cotacao">${ic('lista')} Montar cotação</a><a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div>
  </div>
  <figure class="b-hero-foto">${foto('img/nelore-pasto', 'Rebanho Nelore no pasto', ' fetchpriority="high" loading="eager"')}</figure>
</section>
<ul class="b-formas in">${formas.map((f, i) => `<li>${ic(iconeForma[i])}<span>${f}</span></li>`).join('')}</ul>

<section class="b-sec b-intro in">
  <h2>Nostro Beef, ${T.intro}</h2>
  ${logo(220)}
</section>

<section class="b-caminho" data-caminho>
  <div class="in b-cam-in">
    <div class="b-cam-fotos" aria-hidden="true">${etapas.map((e, i) => `<figure${i === 0 ? ' class="on"' : ''}>${foto(e.f, '')}</figure>`).join('')}</div>
    <div class="b-cam-passos">
      <p class="eyebrow">Do pasto ao pedido</p>
      ${etapas.map((e, i) => `<article data-passo="${i}"><span class="b-cam-n">0${i + 1}</span><h3>${e.t}</h3><p>${e.txt}</p><figure class="b-cam-cel">${foto(e.f, e.alt)}</figure></article>`).join('')}
    </div>
  </div>
</section>

<section class="b-sec b-linhas">
  <div class="in">
    <div class="b-tit-linha"><h2>Linhas de produtos</h2><a class="link" href="/b/produtos/">Todos os produtos ${ic('seta')}</a></div>
    <div class="b-linhas-tab">${linhas.map(l => `<a class="b-lt" href="/b/produtos/bovinos/#${l.slug}">
      <span class="b-lt-img">${foto('prod/' + l.fotos[0], l.nome)}</span>
      <span class="b-lt-txt"><small>${l.cortes.length} ${l.slug === 'porcionados' ? 'formatos' : 'cortes'}</small><b>${l.curto}</b><span>${l.cortes.slice(0, 8).join(' · ')}${l.cortes.length > 8 ? ' …' : ''}</span></span>
    </a>`).join('')}</div>
  </div>
</section>

<section class="b-cheff">
  <div class="in b-cheff-in">
    <figure class="b-cheff-foto">${foto('img/ancho-cru', 'Corte bovino com marmoreio')}</figure>
    <div class="b-cheff-txt">
      ${foto('img/do-cheff', 'Do Cheff Premium', ' class="b-cheff-logo"')}
      <h2>Linha Premium Do Cheff</h2>
      <p>${T.premium}</p>
      <ol class="b-quali">${qualidades.map(q => `<li>${q}</li>`).join('')}</ol>
      <a class="btn btn-p" href="/b/produtos/bovinos/#premium">Ver os ${prem.cortes.length} cortes ${ic('seta')}</a>
    </div>
  </div>
</section>

<section class="b-sec b-cot-chamada">
  <div class="in b-cc-in">
    <div><h2>Monte a sua lista de cortes</h2><p>Marque os cortes que você quer, das três linhas, e mande tudo de uma vez para o comercial pelo WhatsApp.</p></div>
    <a class="btn btn-p" href="/b/produtos/bovinos/#cotacao">${ic('lista')} Abrir lista de cotação</a>
  </div>
</section>

<section class="b-sec b-receitas">
  <div class="in">
    <div class="b-tit-linha"><h2>Receitas</h2><a class="link" href="/b/receitas/">Ver as ${receitas.length} receitas ${ic('seta')}</a></div>
    <div class="b-rec-grade">${receitas.filter(r => !r.acompanhamento).slice(0, 3).map(r => receitaLink('b', r, 'b-rec')).join('')}</div>
  </div>
</section>
${B.faixaContato()}`;
  },

  faixaContato() {
    return `<section class="b-cta"><div class="in b-cta-in">
  <div><p class="eyebrow">${mercado.join(' · ')}</p><h2>Fale com o comercial</h2></div>
  <div class="acoes"><a class="btn btn-ouro" href="${zap()}" target="_blank" rel="noopener">${ic('zap')} WhatsApp</a><a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div>
</div></section>`;
  },

  cabeca(eyebrow, titulo, sub = '', trilha = '') {
    return `<section class="b-cab"><div class="in">${trilha ? `<p class="trilha">${trilha}</p>` : ''}<p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p class="b-cab-sub">${sub}</p>` : ''}</div></section>`;
  },

  empresa() {
    return `${B.cabeca('Empresa', 'Nostro Beef', `${E.tipo} em ${E.cidade}.`)}
<section class="b-sec">
  <div class="in b-emp">
    <figure class="b-emp-foto">${foto('img/nelore-pasto', 'Rebanho Nelore no pasto')}</figure>
    <div class="b-emp-txt">
      <p class="b-lead"><b>Nostro Beef</b>, ${T.intro}</p>
      <p>${T.rebanho}</p>
      <p>${T.premium}</p>
      <p>${T.mercado}</p>
      <p>${T.porcionados}</p>
    </div>
  </div>
</section>
<section class="b-sec b-emp-dados">
  <div class="in">
    <dl class="b-ficha">
      <div><dt>Razão social</dt><dd>${E.razao}</dd></div>
      <div><dt>Atividade</dt><dd>${E.tipo}</dd></div>
      <div><dt>Unidade</dt><dd>${E.cidade}</dd></div>
      <div><dt>Carne</dt><dd>${formas.join(', ')}</dd></div>
      <div><dt>Raças da linha Premium</dt><dd>Brangus e Braford</dd></div>
      <div><dt>Subprodutos</dt><dd>${subprodutos.map(s => s.nome).join(' e ')}</dd></div>
    </dl>
  </div>
</section>
${B.faixaContato()}`;
  },

  produtos() {
    return `${B.cabeca('Produtos', 'Produtos', 'Linha bovina em três frentes e subprodutos do abate.')}
<section class="b-sec">
  <div class="in b-prod-indice">
    ${linhas.map((l, i) => `<a class="b-pi" href="/b/produtos/bovinos/#${l.slug}"><span class="b-pi-n">0${i + 1}</span><span class="b-pi-t"><b>${l.nome}</b><small>${l.cortes.length} ${l.slug === 'porcionados' ? 'formatos' : 'cortes'}</small></span><span class="b-pi-img">${foto('prod/' + l.fotos[0], '')}</span>${ic('seta')}</a>`).join('')}
    <a class="b-pi" href="/b/produtos/subprodutos/"><span class="b-pi-n">04</span><span class="b-pi-t"><b>Linha de Subprodutos</b><small>Farinha e sebo</small></span><span class="b-pi-img">${foto('prod/sub-farinha-de-carne-e-ossos', '')}</span>${ic('seta')}</a>
  </div>
</section>
${B.faixaContato()}`;
  },

  bovinos() {
    return `${B.cabeca('Produtos · Bovinos', 'Linha de Produtos Bovinos', 'Marque os cortes que interessam e envie a lista pelo WhatsApp.', `<a href="/b/produtos/">Produtos</a> / Bovinos`)}
<form class="b-cotacao" id="cotacao" data-cotacao data-zap="${E.whats}">
${linhas.map(l => `<section class="b-sec b-linha" id="${l.slug}">
  <div class="in b-linha-in">
    <div class="b-linha-cab">
      ${l.slug === 'premium' ? foto('img/do-cheff', 'Do Cheff Premium', ' class="b-linha-selo"') : ''}
      <h2>${l.nome}</h2>
      <p>${l.slug === 'premium' ? T.premium : l.slug === 'porcionados' ? `${T.porcionados} ${T.semPerdas}` : l.texto}</p>
      ${galeria(l, 'gal gal-b')}
    </div>
    <fieldset class="b-cortes"><legend>${l.curto}: ${l.cortes.length} ${l.slug === 'porcionados' ? 'formatos' : 'cortes'}</legend>
      ${l.cortes.map(c => `<label><input type="checkbox" name="corte" value="${esc(`${c} (${l.curto})`)}"><span>${c}</span></label>`).join('')}
    </fieldset>
  </div>
</section>`).join('\n')}
<div class="b-cot-barra"><div class="in"><span data-cot-conta>Nenhum corte marcado</span><button class="btn btn-ouro" type="submit">${ic('zap')} Enviar lista pelo WhatsApp</button></div></div>
</form>`;
  },

  subprodutos() {
    return `${B.cabeca('Produtos · Subprodutos', 'Linha de Subprodutos', 'Do próprio frigorífico, para quem compra em volume.', `<a href="/b/produtos/">Produtos</a> / Subprodutos`)}
<section class="b-sec">
  <div class="in b-sub">${subprodutos.map((s, i) => `<article class="b-sub-item">
    <figure>${foto('prod/' + s.foto, s.nome)}</figure>
    <div><span class="b-pi-n">0${i + 1}</span><h2>${s.nome}</h2><p>Consulte volumes, embalagem e disponibilidade com o comercial da Nostro Beef.</p>
    <a class="link" href="${zap(`Olá, gostaria de informações sobre ${s.nome.toLowerCase()} da Nostro Beef.`)}" target="_blank" rel="noopener">${ic('zap')} Consultar pelo WhatsApp</a></div>
  </article>`).join('')}</div>
</section>
${B.faixaContato()}`;
  },

  receitas() {
    const carne = receitas.filter(r => !r.acompanhamento), acomp = receitas.filter(r => r.acompanhamento);
    return `${B.cabeca('Receitas', 'Receitas', 'As receitas do site da Nostro Beef, organizadas por corte.')}
<section class="b-sec">
  <div class="in">
    <h2 class="b-sub-t">Com cortes Nostro Beef</h2>
    <div class="b-rec-grade">${carne.map(r => receitaLink('b', r, 'b-rec')).join('')}</div>
    <h2 class="b-sub-t">Acompanhamentos e outras receitas</h2>
    <div class="b-rec-grade b-rec-menor">${acomp.map(r => receitaLink('b', r, 'b-rec')).join('')}</div>
  </div>
</section>`;
  },

  receita(r) {
    const i = receitas.indexOf(r), prox = receitas[(i + 1) % receitas.length];
    return `${B.cabeca(r.corte ? `Receita · ${r.corte}` : 'Receita', r.nome, r.resumo || '', `<a href="/b/receitas/">Receitas</a> / ${r.nome}`)}
<section class="b-sec">
  <div class="in b-rec-det">
    <div class="b-rec-col">
      <figure class="b-rec-foto">${fotoReceita(r)}</figure>
      <h2>Ingredientes</h2>
      <ul class="b-ingr">${r.ingredientes.map(x => `<li><label><input type="checkbox"><span>${x}</span></label></li>`).join('')}</ul>
      ${r.corte ? `<a class="b-rec-corte" href="/b/produtos/bovinos/#${r.linha}"><small>Corte</small><b>${r.corte}</b><span>${linhas.find(l => l.slug === r.linha).nome} ${ic('seta')}</span></a>` : ''}
    </div>
    <div>
      <h2>Modo de preparo</h2>
      <ol class="b-passos">${r.preparo.map(x => `<li>${x}</li>`).join('')}</ol>
      ${r.dica ? `<aside class="b-dica"><b>Dica</b>${r.dica.map(d => `<p>${d}</p>`).join('')}</aside>` : ''}
      ${r.info ? `<p class="b-rec-info">${ic('relogio')} ${r.info}</p>` : ''}
      <p class="b-rec-prox"><a class="link" href="/b/receitas/${prox.slug}/">Próxima receita: ${prox.nome} ${ic('seta')}</a></p>
    </div>
  </div>
</section>`;
  },

  parceiros() {
    return `${B.cabeca('Parceiros', 'Parceiros comerciais', T.mercado)}
<section class="b-sec">
  <div class="in b-parc">
    ${mercado.map((m, i) => `<div class="b-parc-item">${ic(iconeMercado[i])}<b>${m}</b></div>`).join('')}
  </div>
  <div class="in b-parc-txt">
    <p class="b-lead">${T.porcionados}</p>
    <div class="acoes"><a class="btn btn-p" href="${zap('Olá, quero ser cliente parceiro da Nostro Beef.')}" target="_blank" rel="noopener">${ic('zap')} Quero ser parceiro</a><a class="btn btn-linha-escura" href="/b/produtos/bovinos/#cotacao">${ic('lista')} Montar cotação</a></div>
  </div>
</section>`;
  },

  contato() {
    return `${B.cabeca('Fale Conosco', 'Fale Conosco', 'Pedidos, cotações e parcerias.')}
<section class="b-sec">
  <div class="in b-contato">${contatoLados('b')}<div>${formContato()}</div></div>
</section>`;
  },
};

// ---------- montagem ----------
const titulos = {
  index: ['Nostro Beef · Frigorífico em Cascavel, PR', 'Frigorífico em Cascavel, PR: carne bovina resfriada e congelada, com osso e desossada, linha Premium Do Cheff e subprodutos.'],
  empresa: ['Empresa · Nostro Beef', 'A Nostro Beef, entreposto frigorífico em Cascavel, PR: rebanho selecionado e linha Premium Brangus e Braford.'],
  produtos: ['Produtos · Nostro Beef', 'Linha bovina (tradicionais, porcionados e Premium Do Cheff) e subprodutos da Nostro Beef.'],
  bovinos: ['Bovinos · Nostro Beef', 'Cortes tradicionais, porcionados e Premium Do Cheff da Nostro Beef, Cascavel, PR.'],
  subprodutos: ['Subprodutos · Nostro Beef', 'Farinha de carne e ossos e sebo bovino da Nostro Beef.'],
  receitas: ['Receitas · Nostro Beef', 'Receitas com cortes Nostro Beef: bife de chorizo, contra filé, costela, picadinho e mais.'],
  parceiros: ['Parceiros · Nostro Beef', 'Atacadistas, supermercados, hipermercados, restaurantes e churrascarias: seja cliente Nostro Beef.'],
  contato: ['Fale Conosco · Nostro Beef', `Telefone ${E.fone}, WhatsApp e formulário da Nostro Beef, ${E.cidade}.`],
};
const caminhos = { index: '', empresa: 'empresa/', produtos: 'produtos/', bovinos: 'produtos/bovinos/', subprodutos: 'produtos/subprodutos/', receitas: 'receitas/', parceiros: 'parceiros/', contato: 'contato/' };

export function gerarVersao(v) {
  const M = v === 'a' ? A : B, out = {};
  for (const [sl, cam] of Object.entries(caminhos)) {
    const [t, d] = titulos[sl];
    out[cam.replace(/\/$/, '') || 'index'] = pagina(v, sl, cam, t, d, M[sl]());
  }
  for (const r of receitas) {
    const cam = `receitas/${r.slug}/`;
    out[cam.replace(/\/$/, '')] = pagina(v, 'receita', cam, `${r.nome} · Receitas Nostro Beef`, `${r.nome}: ingredientes e modo de preparo.${r.corte ? ` Corte: ${r.corte}.` : ''}`, M.receita(r));
  }
  return out;
}
