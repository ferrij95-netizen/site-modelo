// Monta as páginas das versões A ("Balcão": topo branco com o logo e os telefones, faixa amarela do menu e vermelho do site atual,
// prateleira dos destaques da home de hoje) e B ("Pedido": atacado como ferramenta de venda, busca sempre à vista, catálogo em lista
// com quantidade, etapas do pedido). As duas têm a lista de pedido que sai pelo WhatsApp. Estilos em public/assets/{base,a,b}.css.
import { empresa as E, textos as T, clientes, categorias, marcas, produtos, destaquesHome, receitas, creditos, catDe, marcaDe } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nb = s => esc(s).replace(/(\d) (kg|g)\b/g, '$1&nbsp;$2');
const foto = (src, alt, w = 1800, h = 1200, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const emb = (p, extra = '') => `<img src="/assets/prod/${p.id}.webp" alt="${esc(p.nome)}, embalagem" width="600" height="600" loading="lazy" decoding="async"${extra}>`;
const logoMarca = (m, extra = '') => `<img src="/assets/marcas/${m.slug}.webp" alt="${esc(m.nome)}" width="290" height="172" loading="lazy" decoding="async"${extra}>`;
const porId = id => produtos.find(p => p.id === id);

export const nomesVersao = { a: 'Balcão', b: 'Pedido' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'A Empresa', caminho: 'empresa/' },
  { slug: 'produtos', nome: 'Nossos Produtos', caminho: 'produtos/' },
  { slug: 'marcas', nome: 'Marcas', caminho: 'marcas/' },
  { slug: 'receitas', nome: 'Receitas', caminho: 'receitas/' },
  { slug: 'pedido', nome: 'Pedido Online', caminho: 'pedido/' },
  { slug: 'contato', nome: 'Fale Conosco', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  whats: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-2-2l.8-1-1-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  esq: '<path d="M15 5l-7 7 7 7"/>',
  dir: '<path d="M9 5l7 7-7 7"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  lupa: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  menos: '<path d="M5 12h14"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  caminhao: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pessoas: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><path d="M16 5a3 3 0 010 6M18 14c2 .8 3 2.8 3 6"/>',
  carrinho: '<path d="M3 4h2l2.4 11h10.2L20 8H6.2"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  loja: '<path d="M4 10v10h16V10M3 10l2-6h14l2 6M3 10c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 3 3s3-1.3 3-3"/><path d="M10 20v-5h4v5"/>',
  faca: '<path d="M4 20L16 8l3 3c-3 4-8 6-12 9z"/><path d="M16 8l3-3"/>',
  prato: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/>',
  pao: '<path d="M4 15c0-5 3.6-9 8-9s8 4 8 9v3H4z"/><path d="M9 10l1 3M13 9l1 3"/>',
  casa: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  relogio2: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5h4"/>',
  porcao: '<path d="M4 13h16a8 8 0 01-16 0z"/><path d="M9 9c0-2 1.5-2 1.5-4M13 9c0-2 1.5-2 1.5-4"/>',
  chapeu: '<path d="M7 18h10v3H7zM7 18c-2.5-.8-4-3-4-5.5A4 4 0 017.5 9a5 5 0 019 0 4 4 0 014.5 3.5c0 2.5-1.5 4.7-4 5.5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const icCliente = { supermercados: 'carrinho', acougues: 'faca', restaurantes: 'prato', padarias: 'pao', bairro: 'loja' };

const wa = txt => `https://wa.me/${E.whats}?text=${encodeURIComponent(txt)}`;

// ---------- moldura ----------
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
<meta name="theme-color" content="${v === 'a' ? '#9E2A2E' : '#F6B400'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const link = (v, n, atual, cls = '') => `<a href="/${v}/${n.caminho}"${cls ? ` class="${cls}"` : ''}${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`;
const logo = (w = 300) => `<img src="/assets/logo.webp" alt="Fort Alimentos, Distribuidora e Atacado de Alimentos" width="${w}" height="${Math.round(w * 327 / 963)}">`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const botaoLista = v => `<a class="lista-btn" href="/${v}/pedido/" aria-label="Lista de pedido">${ic('lista')}<span class="lista-txt">Lista de pedido</span><span class="lista-n" data-lista-n>0</span></a>`;
const busca = (v, cls = 'busca') => `<form class="${cls}" action="/${v}/produtos/" role="search"><label class="sr" for="q-${cls}">Buscar produto</label><input id="q-${cls}" name="q" type="search" placeholder="${cls === 'busca-cat' ? 'Buscar produto' : 'Busque mortadela, provolone, calabresa...'}" autocomplete="off"><button type="submit" aria-label="Buscar">${ic('lupa')}</button></form>`;

function topo(v, atual) {
  if (v === 'a') return `<div class="pre"><div class="in"><span class="pre-disk">${ic('caminhao')} <b>${T.disk}</b> ${T.regiao}</span><span class="pre-dir"><a href="${E.facebook}" target="_blank" rel="noopener">${ic('facebook')} Siga a Fort Alimentos</a></span></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="Fort Alimentos, início">${logo(300)}</a>
  <div class="topo-fones">
    <a href="tel:${E.foneHref}">${ic('tel')} <span><small>Telefone</small>${E.fone}</span></a>
    <a href="${wa('Olá, Fort Alimentos! Vim pelo site.')}" target="_blank" rel="noopener">${ic('whats')} <span><small>WhatsApp</small>${E.cel}</span></a>
  </div>
  ${botaoLista(v)}
  ${menuBtn}
</div></header>
<nav id="menu" class="menu" aria-label="Principal"><div class="in">${nav.map(n => link(v, n, atual)).join('')}</div></nav>`;
  return `<div class="pre"><div class="in"><span>${ic('caminhao')} ${T.disk} · ${T.regiao}</span><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a href="${wa('Olá, Fort Alimentos! Vim pelo site.')}" target="_blank" rel="noopener">${ic('whats')} ${E.cel}</a></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Fort Alimentos, início">${logo(220)}</a>
  ${busca(v, 'busca')}
  ${botaoLista(v)}
  ${menuBtn}
</div>
<nav id="menu" class="menu" aria-label="Principal"><div class="in">${nav.map(n => link(v, n, atual)).join('')}</div></nav></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><span class="rod-logo">${logo(240)}</span><p>${T.titulo}. ${clientes.map(c => c.nome).join(', ').replace(/, ([^,]*)$/, ' e $1')} de ${T.regiao}.</p></div>
  <div><h3>${T.disk}</h3><p class="rod-regiao">${T.regiao}</p><p><a class="rod-tel" href="tel:${E.foneHref}">${E.fone}</a><br><a class="rod-tel" href="${wa('Olá, Fort Alimentos! Vim pelo site.')}" target="_blank" rel="noopener">${E.cel}</a></p></div>
  <div><h3>Endereço</h3><p>${E.endereco}<br>${E.cidade}</p><p><a href="${E.mapaLink}" target="_blank" rel="noopener">Ver no mapa ${ic('seta')}</a></p><p class="rod-parc"><a href="${E.parceiro.url}" target="_blank" rel="noopener">${E.parceiro.texto}</a></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${nav.map(n => link(v, n, '')).join('')}</nav>
</div><p class="rod-fim">© Fort Alimentos · ${E.descricao} · ${E.cidade}</p><p class="rod-cred">${creditos}</p></footer>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo, extra = '') => `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${sl}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, sl)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
<div class="aviso" data-aviso role="status" aria-live="polite" hidden></div>
${extra}
</body>
</html>
`;

// ---------- blocos comuns ----------
const ficha = p => {
  const linhas = Object.entries(p.ficha);
  const m = marcaDe(p.marca), c = catDe(p.cat);
  return `<table class="ficha"><tbody><tr><th scope="row">Marca</th><td>${m.nome}</td></tr><tr><th scope="row">Categoria</th><td>${c.nome}</td></tr>${linhas.map(([k, x]) => `<tr><th scope="row">${k}</th><td>${x}</td></tr>`).join('')}</tbody></table>`;
};
const qtd = p => `<div class="qtd" data-qtd><button type="button" data-qtd-menos aria-label="Menos">${ic('menos')}</button><input type="number" inputmode="numeric" min="1" value="1" aria-label="Quantidade de ${esc(p.nome)}"><button type="button" data-qtd-mais aria-label="Mais">${ic('mais')}</button></div>`;
const addBtn = (p, txt = 'Adicionar à lista', cls = 'btn') => `<button class="${cls}" type="button" data-add="${p.id}">${ic('mais')} <span>${txt}</span></button>`;

const formContato = () => `<form class="form" data-form>
  <div class="campos">
    <label>Nome<input name="Nome" autocomplete="name" required></label>
    <label>E-mail<input name="E-mail" type="email" autocomplete="email" required></label>
    <label>Telefone<input name="Telefone" type="tel" autocomplete="tel"></label>
    <label>Comércio<input name="Comércio" autocomplete="organization" placeholder="Nome do mercado, padaria, restaurante..."></label>
    <label class="largo">Mensagem<textarea name="Mensagem" rows="5" required></textarea></label>
  </div>
  <button class="btn" type="submit">Enviar mensagem ${ic('seta')}</button>
  <p class="form-ok" role="status" hidden>Mensagem pronta. Nesta prévia o envio está desligado; no site no ar ela chega direto no e-mail da Fort Alimentos. Enquanto isso, ligue <a href="tel:${E.foneHref}">${E.fone}</a>.</p>
</form>`;

// Dados da lista de pedido (o site.js lê na página do pedido e no botão de adicionar).
const dadosJSON = () => `<script type="application/json" id="fort-produtos">${JSON.stringify(Object.fromEntries(produtos.map(p => [p.id, { n: p.nome, m: marcaDe(p.marca).nome, s: p.slug }])))}</script>`;

const pedidoForm = v => `<form class="pedido-form" data-pedido-form>
  <div class="campos">
    <label>Nome do comércio<input name="comercio" autocomplete="organization" required></label>
    <label>Seu nome<input name="nome" autocomplete="name" required></label>
    <label>Telefone<input name="telefone" type="tel" autocomplete="tel" required></label>
    <label>Tipo de comércio<select name="tipo">${clientes.map(c => `<option>${c.nome.replace(/s$/, '').replace('Açougue', 'Açougue').replace('Comércios de bairro', 'Comércio de bairro')}</option>`).join('')}<option>Outro</option></select></label>
    <label>Bairro e cidade<input name="bairro" placeholder="Ex.: Vila Rica, Sorocaba"></label>
    <label>CNPJ (opcional)<input name="cnpj" inputmode="numeric"></label>
    <label class="largo">Observações<textarea name="obs" rows="3" placeholder="Melhor dia para entrega, forma de pagamento, outros produtos que procura..."></textarea></label>
  </div>
  <div class="pedido-acoes">
    <button class="btn btn-whats" type="submit">${ic('whats')} Enviar pedido pelo WhatsApp</button>
    <a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')} Ou ligue ${E.fone}</a>
  </div>
  <p class="nota">O pedido vai para o WhatsApp comercial ${E.cel} com a lista pronta. A equipe confirma preço, disponibilidade e dia da entrega.</p>
</form>`;

const listaPedido = v => `<div class="lista" data-lista>
  <div class="lista-vazia" data-lista-vazia><p><b>Sua lista está vazia.</b> Abra o catálogo e toque em “Adicionar à lista” nos produtos que quer pedir.</p><a class="btn" href="/${v}/produtos/">Ver os produtos ${ic('seta')}</a></div>
  <ul class="lista-itens" data-lista-itens></ul>
  <p class="lista-acoes" data-lista-acoes hidden><button class="link-btn" type="button" data-lista-limpar>${ic('x')} Limpar lista</button></p>
</div>`;

// Cartão de produto do catálogo (data-* usados pelo filtro do site.js).
const itemProduto = (v, p, cls = 'prod') => `<li class="${cls}" data-item data-cat="${p.cat}" data-marca="${p.marca}" data-busca="${esc((p.nome + ' ' + marcaDe(p.marca).nome + ' ' + catDe(p.cat).nome).toLowerCase())}">
  <a class="prod-img" href="/${v}/produtos/${p.slug}/" tabindex="-1">${emb(p)}</a>
  <div class="prod-txt"><span class="prod-marca">${marcaDe(p.marca).nome}</span><h3><a href="/${v}/produtos/${p.slug}/">${nb(p.nome)}</a></h3>${Object.keys(p.ficha).length ? `<p class="prod-ficha">${Object.entries(p.ficha).slice(0, 2).map(([k, x]) => `${k}: ${x}`).join(' · ')}</p>` : ''}</div>
  <div class="prod-acao">${v === 'b' ? qtd(p) : ''}${addBtn(p, v === 'b' ? 'Adicionar' : 'Adicionar à lista')}</div>
</li>`;

const filtros = (v) => `<div class="filtros" data-filtros>
  ${busca(v, 'busca-cat')}
  <div class="filtro-grupo" role="group" aria-label="Categorias"><button type="button" class="chip" data-f-cat="" aria-pressed="true">Todas</button>${categorias.map(c => `<button type="button" class="chip" data-f-cat="${c.slug}" aria-pressed="false">${c.curto}</button>`).join('')}</div>
  <label class="filtro-marca">Marca<select data-f-marca><option value="">Todas as marcas</option>${marcas.map(m => `<option value="${m.slug}">${m.nome}</option>`).join('')}</select></label>
</div>`;

const receitasDoProduto = p => {
  const chave = { calabresa: 'calabresa', mussarela: 'mussarela', parmesao: 'parmesão', 'queijo-prato': 'queijo', provolone: 'queijo', mortadelas: 'presunto' }[p.cat];
  if (!chave) return [];
  return receitas.filter(r => (r.titulo + ' ' + r.ingredientes.join(' ')).toLowerCase().includes(chave)).slice(0, 3);
};

function paginaProduto(v, p) {
  const m = marcaDe(p.marca), c = catDe(p.cat);
  const irmaos = produtos.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  const rec = receitasDoProduto(p);
  const msg = `Olá, Fort Alimentos! Quero cotar: ${p.nome}.`;
  const corpo = `<nav class="trilha in" aria-label="Você está em"><a href="/${v}/">Início</a> / <a href="/${v}/produtos/">Nossos Produtos</a> / <a href="/${v}/produtos/?cat=${c.slug}">${c.nome}</a></nav>
<section class="pp in">
  <div class="pp-foto">${emb(p, ' loading="eager"')}</div>
  <div class="pp-info">
    <a class="pp-marca" href="/${v}/marcas/#${m.slug}">${logoMarca(m)}</a>
    <p class="sobre">${c.nome}</p>
    <h1>${esc(p.nome)}</h1>
    ${ficha(p)}
    ${Object.keys(p.ficha).length ? '' : '<p class="nota">Peso e embalagem: confirme com o vendedor na hora do pedido.</p>'}
    <div class="pp-pedir">${qtd(p)}${addBtn(p)}</div>
    <p class="pp-ou"><a class="btn btn-whats" href="${wa(msg)}" target="_blank" rel="noopener">${ic('whats')} Cotar pelo WhatsApp</a> <a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></p>
  </div>
</section>
${irmaos.length ? `<section class="sec in"><h2 class="tit-sec">Mais ${c.nome.toLowerCase()}</h2><ul class="grade-prod">${irmaos.map(x => itemProduto(v, x)).join('')}</ul></section>` : ''}
${rec.length ? `<section class="sec in"><h2 class="tit-sec">Receitas com ${c.curto.toLowerCase()}</h2><ul class="rec-lista">${rec.map(r => itemReceita(v, r)).join('')}</ul></section>` : ''}`;
  return pagina(v, 'produtos', `produtos/${p.slug}/`, `${p.nome} | Fort Alimentos Sorocaba`, `${p.nome} no atacado da Fort Alimentos, distribuidora de frios e laticínios em Sorocaba e região.`, corpo, dadosJSON());
}

const itemReceita = (v, r) => `<li class="rec-item"><a href="/${v}/receitas/${r.slug}/"><span class="rec-img"><img src="/assets/rec/${r.img}.webp" alt="" width="540" height="470" loading="lazy" decoding="async"></span><span class="rec-tipo">${r.meta['Tipo de receita'] || 'Receita'}${r.meta['Pronto em'] ? ` · ${r.meta['Pronto em']}` : ''}</span><h3>${esc(r.titulo)}</h3></a></li>`;

function paginaReceita(v, r) {
  const meta = Object.entries(r.meta).filter(([k]) => k !== 'Tipo de receita');
  const lista = arr => {
    let html = '', aberto = false, n = 0;
    for (const x of arr) {
      if (x.startsWith('# ')) { if (aberto) html += '</ol>'; html += `<h3>${x.slice(2)}</h3><ol>`; aberto = true; continue; }
      if (!aberto) { html += '<ol>'; aberto = true; }
      html += `<li>${esc(x)}</li>`; n++;
    }
    return html + (aberto ? '</ol>' : '');
  };
  const ing = r.ingredientes.map(x => x.startsWith('# ') ? `</ul><h3>${x.slice(2)}</h3><ul>` : `<li>${esc(x)}</li>`).join('');
  const corpo = `<nav class="trilha in" aria-label="Você está em"><a href="/${v}/">Início</a> / <a href="/${v}/receitas/">Receitas</a></nav>
<article class="receita in">
  <header class="rc-topo"><div><p class="sobre">${r.meta['Tipo de receita'] || 'Receita'}</p><h1>${esc(r.titulo)}</h1>${r.intro ? `<p class="lead">${esc(r.intro)}</p>` : ''}
  ${meta.length ? `<dl class="rc-meta">${meta.map(([k, x]) => `<div><dt>${k.replace('Tempo de Preparação', 'Preparo').replace('Tempo de cozimento', 'Cozimento').replace('Número de doses', 'Rende')}</dt><dd>${x}</dd></div>`).join('')}</dl>` : ''}</div>
  <img src="/assets/rec/${r.img}.webp" alt="${esc(r.titulo)}" width="540" height="470" loading="eager"></header>
  <div class="rc-corpo"><section class="rc-ing"><h2>Ingredientes</h2><ul>${ing}</ul></section><section class="rc-modo"><h2>Modo de preparo</h2>${lista(r.passos)}</section></div>
</article>
<section class="sec in rc-cta"><p>Os frios e queijos desta receita a Fort Alimentos entrega no seu comércio, em ${T.regiao}.</p><a class="btn" href="/${v}/produtos/">Ver os produtos ${ic('seta')}</a></section>`;
  return pagina(v, 'receitas', `receitas/${r.slug}/`, `${r.titulo} | Receitas Fort Alimentos`, `Receita de ${r.titulo.toLowerCase()} com ingredientes e modo de preparo.`, corpo);
}

// ---------- páginas comuns às duas versões (com variações de layout por classe) ----------
function paginaProdutos(v) {
  const corpo = `<header class="cab in"><p class="sobre">Catálogo</p><h1>Nossos Produtos</h1><p class="lead">${produtos.length} produtos de ${marcas.length} marcas em ${categorias.length} categorias. Monte a lista e envie o pedido pelo WhatsApp.</p></header>
<section class="catalogo in" data-catalogo>
  ${filtros(v)}
  <p class="cat-conta" data-conta role="status">${produtos.length} produtos</p>
  <ul class="${v === 'a' ? 'grade-prod' : 'linhas-prod'}" data-itens>${categorias.map(c => produtos.filter(p => p.cat === c.slug).map(p => itemProduto(v, p)).join('')).join('')}</ul>
  <p class="cat-nada" data-nada hidden>Nenhum produto com esse filtro. A Fort Alimentos trabalha com muitos outros itens: <a href="${wa('Olá, Fort Alimentos! Procuro um produto que não achei no site: ')}" target="_blank" rel="noopener">pergunte pelo WhatsApp</a>.</p>
</section>`;
  return pagina(v, 'produtos', 'produtos/', 'Nossos Produtos | Fort Alimentos Sorocaba', 'Catálogo de frios e laticínios da Fort Alimentos: mortadelas, calabresas, mussarela, prato, provolone, parmesão, gorgonzola e requeijões.', corpo, dadosJSON());
}

function paginaMarcas(v) {
  const corpo = `<header class="cab in"><p class="sobre">Marcas</p><h1>Marcas que a Fort distribui</h1><p class="lead">As marcas de frios e laticínios que os seus clientes já procuram na gôndola.</p></header>
<section class="marcas-lista in">${marcas.map(m => {
    const ps = produtos.filter(p => p.marca === m.slug);
    return `<article class="marca-linha" id="${m.slug}"><div class="ml-logo">${logoMarca(m)}</div><div class="ml-txt"><h2>${m.nome}</h2><p>${[...new Set(ps.map(p => catDe(p.cat).nome))].join(' · ')}</p></div><ul class="ml-prod">${ps.map(p => `<li><a href="/${v}/produtos/${p.slug}/" title="${esc(p.nome)}">${emb(p)}<span>${esc(p.nome.replace(m.nome, '').replace(/\s+/g, ' ').trim())}</span></a></li>`).join('')}</ul></article>`;
  }).join('')}</section>`;
  return pagina(v, 'marcas', 'marcas/', 'Marcas | Fort Alimentos Sorocaba', 'Sadia, Seara, Aurora, Rezende, Marba, Ceratti, Quatá, Três Marias, Crioulo, Dona Beja, D Vovó, Santo Creme e Da Fazenda.', corpo);
}

function paginaReceitas(v) {
  const corpo = `<header class="cab in"><p class="sobre">Receitas</p><h1>Receitas</h1><p class="lead">${T.receitas}: pratos com calabresa, mussarela, parmesão e presunto para inspirar o seu cardápio.</p></header>
<section class="sec in"><ul class="rec-lista rec-lista-g">${receitas.map(r => itemReceita(v, r)).join('')}</ul></section>`;
  return pagina(v, 'receitas', 'receitas/', 'Receitas | Fort Alimentos Sorocaba', 'Receitas com frios e queijos: lasanha, risoto de calabresa, nhoque, pastel assado e mais.', corpo);
}

function paginaPedido(v) {
  const corpo = `<header class="cab in"><p class="sobre">Pedido Online</p><h1>Sua lista de pedido</h1><p class="lead">Confira as quantidades, preencha os dados do seu comércio e envie. A Fort Alimentos responde com preço e dia de entrega.</p></header>
<section class="pedido in"><div class="pedido-lista"><h2>Produtos</h2>${listaPedido(v)}</div><div class="pedido-dados"><h2>Dados para entrega</h2>${pedidoForm(v)}</div></section>`;
  return pagina(v, 'pedido', 'pedido/', 'Pedido Online | Fort Alimentos Sorocaba', 'Monte sua lista de frios e laticínios e envie o pedido para a Fort Alimentos pelo WhatsApp.', corpo, dadosJSON());
}

function paginaContato(v) {
  const corpo = `<header class="cab in"><p class="sobre">Fale Conosco</p><h1>Fale com a Fort Alimentos</h1><p class="lead">${T.disk} para ${T.regiao}. Ligue, chame no WhatsApp ou mande uma mensagem.</p></header>
<section class="contato in">
  <div class="ct-canais">
    <a class="ct-canal" href="tel:${E.foneHref}">${ic('tel')}<span><small>Telefone</small>${E.fone}</span></a>
    <a class="ct-canal" href="${wa('Olá, Fort Alimentos! Vim pelo site.')}" target="_blank" rel="noopener">${ic('whats')}<span><small>WhatsApp</small>${E.cel}</span></a>
    <a class="ct-canal" href="${E.mapaLink}" target="_blank" rel="noopener">${ic('pin')}<span><small>Endereço</small>${E.endereco}, ${E.cidade}</span></a>
    <a class="ct-canal" href="${E.facebook}" target="_blank" rel="noopener">${ic('facebook')}<span><small>Facebook</small>Fort Alimentos Sorocaba</span></a>
  </div>
  <div class="ct-form"><h2>Mande uma mensagem</h2>${formContato()}</div>
</section>
<section class="mapa in" id="localizacao"><h2 class="tit-sec">Localização</h2><iframe src="${E.mapa}" title="Mapa: ${E.endereco}, ${E.cidade}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;
  return pagina(v, 'contato', 'contato/', 'Fale Conosco | Fort Alimentos Sorocaba', `Telefone ${E.fone}, WhatsApp ${E.cel}, ${E.endereco}, ${E.cidade}.`, corpo);
}

function paginaEmpresa(v) {
  const valores = `<ul class="valores">${T.valores.map(x => `<li>${ic('check')} ${x[0].toUpperCase() + x.slice(1)}</li>`).join('')}</ul>`;
  const corpo = v === 'a' ? `<header class="cab cab-foto"><div class="in"><p class="sobre">A Empresa</p><h1>${T.titulo}</h1><p class="lead">Saiba aqui tudo sobre a Fort Alimentos.</p></div></header>
<section class="emp in"><div class="emp-txt"><p class="lead">${T.intro}</p>${T.historia.map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="emp-foto">${foto('queijos-balcao', 'Balcão refrigerado de queijos num supermercado', 1800, 1013)}<figcaption>Supermercados, açougues, restaurantes, padarias e comércios de bairro: os clientes da Fort.</figcaption></figure></section>
<section class="mvv"><div class="in">
  <article><h2>Missão</h2><p>${T.missao}</p></article>
  <article><h2>Visão</h2><p>${T.visao.replace('EMPRESA MODELO', 'empresa modelo')}</p></article>
  <article><h2>Valores</h2>${valores}</article>
</div></section>
${clientesFaixa(v)}`
    : `<header class="cab in"><p class="sobre">A Empresa</p><h1>${T.titulo}</h1><p class="lead">${T.intro}</p></header>
<section class="emp in"><figure class="emp-foto">${foto('camara-fria', 'Armazém de distribuição de alimentos', 1800, 1200)}</figure>
  <div class="emp-txt">${T.historia.map(p => `<p>${p}</p>`).join('')}<p class="emp-sede">${ic('pin')} Sede de atendimento e distribuição: ${E.endereco}, ${E.cidade}</p></div></section>
<section class="mvv in">
  <article class="mvv-m"><span class="mvv-n">01</span><h2>Missão</h2><p>${T.missao}</p></article>
  <article class="mvv-v"><span class="mvv-n">02</span><h2>Visão</h2><p>${T.visao.replace('EMPRESA MODELO', 'empresa modelo')}</p></article>
  <article class="mvv-va"><span class="mvv-n">03</span><h2>Valores</h2>${valores}</article>
</section>
${clientesFaixa(v)}`;
  return pagina(v, 'empresa', 'empresa/', 'A Empresa | Fort Alimentos Sorocaba', T.intro, corpo);
}

const clientesFaixa = v => `<section class="clientes"><div class="in"><h2>Quem a Fort atende</h2><ul>${clientes.map(c => `<li>${ic(icCliente[c.id])}<span>${c.nome}</span></li>`).join('')}</ul></div></section>`;

// ---------- início A: "Balcão" ----------
function inicioA() {
  const dest = destaquesHome.map(porId);
  const vitrine = [662, 646, 655, 640].map(porId);
  return pagina('a', 'index', '', 'Fort Alimentos | Atacado de Frios e Laticínios em Sorocaba', T.intro, `
<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="sobre">${E.descricao} · ${E.cidade}</p>
    <h1>${T.titulo}</h1>
    <p class="lead">Frios, laticínios, conservas e condimentos para supermercados, açougues, restaurantes, padarias e comércios de bairro de ${T.regiao}.</p>
    ${busca('a', 'busca-hero')}
    <p class="hero-cta"><a class="btn btn-amarelo" href="/a/produtos/">Ver os produtos ${ic('seta')}</a><a class="btn btn-claro" href="${wa('Olá, Fort Alimentos! Quero fazer um pedido.')}" target="_blank" rel="noopener">${ic('whats')} Pedir pelo WhatsApp</a></p>
  </div>
  <ul class="hero-vitrine" aria-label="Alguns produtos">${vitrine.map((p, i) => `<li class="hv hv-${i + 1}"><a href="/a/produtos/${p.slug}/">${emb(p, ' loading="eager"')}<span>${esc(p.nome)}</span></a></li>`).join('')}</ul>
</div></section>

<section class="cats in"><div class="tit-linha"><h2 class="tit-sec">Nossos Produtos</h2><a href="/a/produtos/">Catálogo completo ${ic('seta')}</a></div>
<ul class="cats-grade">${categorias.map((c, i) => `<li class="cat cat-${i + 1}"><a href="/a/produtos/?cat=${c.slug}"><img src="/assets/cat/${c.slug}.webp" alt="" width="253" height="220" loading="lazy"><span class="cat-nome">${c.nome}</span><span class="cat-n">${produtos.filter(p => p.cat === c.slug).length} itens</span></a></li>`).join('')}</ul></section>

<section class="destaques"><div class="in"><div class="tit-linha"><h2 class="tit-sec">Em destaque</h2><span class="prat-setas"><button type="button" class="prat-seta" data-prat-ir="-1" aria-label="Anteriores">${ic('esq')}</button><button type="button" class="prat-seta" data-prat-ir="1" aria-label="Próximos">${ic('dir')}</button></span></div>
<ul class="prat" data-prat tabindex="0" aria-label="Produtos em destaque">${dest.map(p => itemProduto('a', p, 'prod prat-item')).join('')}</ul></div></section>

<section class="disk"><div class="in">
  <div class="disk-txt"><p class="sobre">${ic('caminhao')} Entrega do produto certo, no prazo combinado</p><h2>${T.disk}<span>${T.regiao}</span></h2>
  <p class="disk-fones"><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a href="${wa('Olá, Fort Alimentos! Quero fazer um pedido.')}" target="_blank" rel="noopener">${ic('whats')} ${E.cel}</a></p>
  <a class="btn btn-amarelo" href="/a/pedido/">Fazer pedido online ${ic('seta')}</a></div>
  <figure class="disk-foto">${foto('mortadela-mercado', 'Mortadelas Aurora na gôndola de um supermercado', 1800, 1350)}</figure>
</div></section>

${clientesFaixa('a')}

<section class="marcas-home in"><h2 class="tit-sec">Marcas que você encontra na Fort</h2><ul>${marcas.map(m => `<li><a href="/a/marcas/#${m.slug}">${logoMarca(m)}</a></li>`).join('')}</ul></section>

<section class="sec in"><div class="tit-linha"><h2 class="tit-sec">Receitas</h2><a href="/a/receitas/">Todas as receitas ${ic('seta')}</a></div><ul class="rec-lista">${receitas.slice(2, 5).map(r => itemReceita('a', r)).join('')}</ul></section>`, dadosJSON());
}

// ---------- início B: "Pedido" ----------
function inicioB() {
  const etapas = [
    { t: 'Monte a lista', x: 'Busque no catálogo por produto, categoria ou marca e escolha a quantidade de cada item.', ic: 'lista' },
    { t: 'Envie o pedido', x: `Mande a lista pronta pelo WhatsApp ${E.cel} ou ligue ${E.fone}.`, ic: 'whats' },
    { t: 'Receba no comércio', x: 'A Fort confirma preço e disponibilidade e entrega o produto certo, no prazo combinado.', ic: 'caminhao' },
  ];
  return pagina('b', 'index', '', 'Fort Alimentos | Atacado de Frios e Laticínios em Sorocaba', T.intro, `
<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="sobre">${T.disk} · ${T.regiao}</p>
    <h1>${T.titulo}</h1>
    <p class="lead">${T.intro.split('. ')[0]}.</p>
    <p class="hero-cta"><a class="btn" href="/b/produtos/">Montar meu pedido ${ic('seta')}</a><a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></p>
    <ul class="hero-num"><li><b>${produtos.length}</b> produtos no catálogo</li><li><b>${marcas.length}</b> marcas</li><li><b>${categorias.length}</b> categorias</li></ul>
  </div>
  <figure class="hero-foto">${foto('camara-fria', 'Armazém de distribuição de alimentos', 1800, 1200, ' loading="eager"')}<figcaption><img src="/assets/prod/662.webp" alt="" width="600" height="600"><span><b>Mortadela Aurora 5 kg</b>Uma das 13 marcas do catálogo</span></figcaption></figure>
</div></section>

<nav class="atalhos" aria-label="Categorias"><div class="in">${categorias.map(c => `<a href="/b/produtos/?cat=${c.slug}"><img src="/assets/cat/${c.slug}.webp" alt="" width="253" height="220" loading="lazy"><span>${c.curto}</span></a>`).join('')}</div></nav>

<section class="etapas in" data-etapas><h2 class="tit-sec">Como fazer o pedido</h2><span class="ap-trilho" aria-hidden="true"></span>
<ol>${etapas.map((e, i) => `<li class="etapa ap-etapa"><span class="etapa-n">${i + 1}</span>${ic(e.ic, 'ic etapa-ic')}<h3>${e.t}</h3><p>${e.x}</p></li>`).join('')}</ol></section>

<section class="vitrine-b in"><div class="tit-linha"><h2 class="tit-sec">Mais pedidos</h2><a href="/b/produtos/">Catálogo completo ${ic('seta')}</a></div>
<ul class="linhas-prod">${destaquesHome.slice(0, 6).map(porId).map(p => itemProduto('b', p)).join('')}</ul></section>

<section class="segmentos"><div class="in">
  <figure>${foto('mortadela-sanduiche', 'Sanduíche de mortadela no Mercado Municipal de São Paulo', 1350, 1800)}</figure>
  <div class="seg-txt"><h2>Para quem a Fort vende</h2><p>${T.intro.split('. ')[1]}</p>
  <ul>${clientes.map(c => `<li>${ic(icCliente[c.id])}<b>${c.nome}</b></li>`).join('')}</ul>
  <a class="btn" href="/b/empresa/">Conheça a Fort ${ic('seta')}</a></div>
</div></section>

<section class="marcas-b"><div class="in"><h2 class="tit-sec">Marcas</h2><div class="marquee" data-marquee><ul>${marcas.map(m => `<li><a href="/b/marcas/#${m.slug}">${logoMarca(m)}</a></li>`).join('')}</ul></div></div></section>

<section class="sec in"><div class="tit-linha"><h2 class="tit-sec">Receitas</h2><a href="/b/receitas/">Todas ${ic('seta')}</a></div><ul class="rec-lista">${receitas.slice(4, 7).map(r => itemReceita('b', r)).join('')}</ul></section>`, dadosJSON());
}

export function gerarVersao(v) {
  const pg = {
    index: v === 'a' ? inicioA() : inicioB(),
    empresa: paginaEmpresa(v),
    produtos: paginaProdutos(v),
    marcas: paginaMarcas(v),
    receitas: paginaReceitas(v),
    pedido: paginaPedido(v),
    contato: paginaContato(v),
  };
  for (const p of produtos) pg[`produtos/${p.slug}`] = paginaProduto(v, p);
  for (const r of receitas) pg[`receitas/${r.slug}`] = paginaReceita(v, r);
  return pg;
}
