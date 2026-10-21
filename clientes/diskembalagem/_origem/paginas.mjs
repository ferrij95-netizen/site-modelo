// Monta as páginas das versões A ("Balcão": fiel ao site atual, cabeçalho branco com os telefones em laranja, barra de menu
// petróleo, os três banners e a faixa laranja do rodapé) e B ("Pedido rápido": o catálogo como ferramenta de compra, busca
// com sugestões, compra por ambiente e lista de orçamento sempre à mão). Estilos em public/assets/{base,a,b}.css.
import { empresa as E, institucional, rodapeInstitucional, variedade, rapidez, orcamento, banners, categorias, produtos, destaques, atalhos, ambientes, passos, totalProdutos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const nomesVersao = { a: 'Balcão', b: 'Pedido rápido' };
const catDe = slug => categorias.find(c => c.slug === slug);
const subDe = p => catDe(p.cat).subs.find(s => s.slug === p.sub);
const mapaVer = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(E.enderecoLinha)}`;
const mapaEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(E.enderecoLinha)}&z=16&output=embed`;

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  busca: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  menos: '<path d="M5 12h14"/>',
  ok: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  baixo: '<path d="M6 9l6 6 6-6"/>',
  esq: '<path d="M15 6l-6 6 6 6"/>',
  dir: '<path d="M9 6l6 6-6 6"/>',
  caminhao: '<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  escudo: '<path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  caixa: '<path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7M12 11v10"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

const R = v => ({
  home: `/${v}/`, produtos: `/${v}/produtos/`, cat: c => `/${v}/produtos/${c}/`, inst: `/${v}/institucional/`,
  dest: `/${v}/destaques/`, contato: `/${v}/contato/`, lista: `/${v}/orcamento/`,
});

// foto do produto: célula da folha de fotos da categoria
const foto = (p, cls = 'sp') => p.sp
  ? `<span class="${cls}" role="img" aria-label="${esc(p.nome)}" style="--f:url(/assets/cat/${p.sp[0]}.webp);--x:${p.sp[1]};--y:${p.sp[2]}"></span>`
  : `<span class="${cls} sp-vazio" role="img" aria-label="Foto em breve"><img src="/assets/logo.svg" alt=""></span>`;

function tile(p, v, extra = '') {
  return `<article class="pd" data-id="${p.id}" data-cat="${p.cat}" data-sub="${p.sub}"${extra}>
<button class="pd-foto" type="button" data-abre aria-label="Ver ${esc(p.nome)}">${foto(p)}</button>
<div class="pd-corpo"><p class="pd-sub">${esc(subDe(p).nome)}</p><h3 class="pd-nome"><button type="button" data-abre>${esc(p.nome)}</button></h3></div>
<div class="pd-acao">${v === 'b' ? `<div class="qtd" data-qtd><button type="button" data-menos aria-label="Menos">${ic('menos')}</button><input type="number" min="1" value="1" inputmode="numeric" aria-label="Quantidade"><button type="button" data-mais aria-label="Mais">${ic('mais')}</button></div>` : ''}<button class="pd-add" type="button" data-add>${ic('mais')}<span>Adicionar à lista</span></button></div>
</article>`;
}

// ---------- moldura ----------
function head(v, titulo, descricao, caminho) {
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
<meta property="og:site_name" content="Disk Embalagens">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#007991">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dosis:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/apresenta.css">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/apresenta.js" defer></script>
<script src="/assets/site.js" defer></script>
</head>`;
}

const fonesTxt = () => E.fones.map(f => `<a href="tel:${f.href}">${f.txt}</a>`).join('<i>•</i>');

function cabecalhoA(atual) {
  const r = R('a');
  const mega = categorias.map(c => `<div class="mega-col"><a class="mega-cat" href="${r.cat(c.slug)}">${foto(c.foto, 'sp sp-mini')}<span>${esc(c.nome)}</span></a><ul>${c.subs.map(s => `<li><a href="${r.cat(c.slug)}#${s.slug}">${esc(s.nome)}</a></li>`).join('')}</ul></div>`).join('');
  const item = (k, href, txt) => `<li><a href="${href}"${atual === k ? ' aria-current="page"' : ''}>${txt}</a></li>`;
  return `<header class="a-cab">
<div class="a-topo"><div class="ct a-topo-in">
<a class="a-logo" href="${r.home}" aria-label="Disk Embalagens, início"><img src="/assets/logo.svg" alt="Disk Embalagens" width="242" height="147"></a>
<form class="busca" action="${r.produtos}" role="search"><input type="search" name="q" placeholder="Busca por nome ou referência" aria-label="Buscar produto" autocomplete="off" data-sugere><button type="submit">${ic('busca')}<span>Buscar</span></button><div class="sugestoes" hidden></div></form>
<div class="a-fones">${ic('tel', 'ic a-fones-ic')}<div><p class="a-fones-n"><small>54</small> ${E.fones.map(f => `<a href="tel:${f.href}">${f.txt.replace('54 ', '')}</a>`).join(' <i>•</i> ')}</p><p class="a-fones-t">${orcamento}</p></div></div>
<button class="a-menu-bt" type="button" data-menu aria-expanded="false" aria-label="Menu">${ic('menu')}</button>
</div></div>
<nav class="a-nav" aria-label="Principal"><div class="ct a-nav-in">
<ul class="a-nav-l">
<li class="tem-mega"><a href="${r.produtos}"${atual === 'produtos' ? ' aria-current="page"' : ''}>Produtos ${ic('baixo', 'ic ic-p')}</a><div class="mega"><div class="ct mega-in">${mega}</div></div></li>
${item('inst', r.inst, 'Institucional')}${item('dest', r.dest, 'Destaques')}${item('contato', r.contato, 'Contato')}
</ul>
<a class="lista-bt" href="${r.lista}">${ic('lista')}<span>Minha lista</span><b data-lista-n>0</b></a>
</div></nav>
</header>`;
}

function cabecalhoB(atual) {
  const r = R('b');
  return `<header class="b-cab">
<div class="b-faixa"><div class="ct b-faixa-in"><p>${ic('caminhao')} Ligue e receba em sua empresa: ${fonesTxt()}</p><p class="b-faixa-dir">Caxias do Sul - RS · desde ${E.anoDesde}</p></div></div>
<div class="b-topo"><div class="ct b-topo-in">
<a class="b-logo" href="${r.home}" aria-label="Disk Embalagens, início"><img src="/assets/logo.svg" alt="Disk Embalagens" width="242" height="147"></a>
<form class="busca" action="${r.produtos}" role="search"><span class="busca-ic">${ic('busca')}</span><input type="search" name="q" placeholder="O que sua empresa precisa? Ex.: papel toalha, copo 200ml, lixeira" aria-label="Buscar produto" autocomplete="off" data-sugere><button type="submit">Buscar</button><div class="sugestoes" hidden></div></form>
<a class="lista-bt" href="${r.lista}" data-gaveta>${ic('lista')}<span>Minha lista</span><b data-lista-n>0</b></a>
<button class="b-menu-bt" type="button" data-menu aria-expanded="false" aria-label="Menu">${ic('menu')}</button>
</div></div>
<nav class="b-nav" aria-label="Principal"><div class="ct b-nav-in">
<ul class="b-cats">${categorias.map(c => `<li><a href="${r.cat(c.slug)}"${atual === c.slug ? ' aria-current="page"' : ''}>${esc(c.nome)}</a></li>`).join('')}</ul>
<ul class="b-inst"><li><a href="${r.inst}"${atual === 'inst' ? ' aria-current="page"' : ''}>Institucional</a></li><li><a href="${r.dest}"${atual === 'dest' ? ' aria-current="page"' : ''}>Destaques</a></li><li><a href="${r.contato}"${atual === 'contato' ? ' aria-current="page"' : ''}>Contato</a></li></ul>
</div></nav>
</header>`;
}

function rodape(v) {
  const r = R(v);
  const faixa = v === 'a' ? `<section class="a-laranja"><div class="ct a-laranja-in">
<div><h2>Institucional</h2><p>${rodapeInstitucional}</p><a class="bt bt-branco" href="${r.inst}">Conheça a Disk ${ic('seta')}</a></div>
<div><h2>Grande variedade em</h2><ul class="a-varie">${variedade.map(t => `<li>${t}</li>`).join('')}</ul></div>
</div></section>` : '';
  return `${faixa}<footer class="rod rod-${v}"><div class="ct rod-in">
<div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Disk Embalagens" width="160" height="97"><p>${E.razao}<br>Distribuidora em Caxias do Sul desde ${E.desde}.</p></div>
<div><h3>Produtos</h3><ul>${categorias.map(c => `<li><a href="${r.cat(c.slug)}">${esc(c.nome)}</a></li>`).join('')}</ul></div>
<div><h3>Disk</h3><ul><li><a href="${r.inst}">Institucional</a></li><li><a href="${r.dest}">Destaques</a></li><li><a href="${r.contato}">Contato</a></li><li><a href="${r.lista}">Minha lista de orçamento</a></li></ul></div>
<div><h3>Atendimento</h3><p class="rod-fones">${E.fones.map(f => `<a href="tel:${f.href}">${ic('tel')}${f.txt}</a>`).join('')}</p><p><a href="${mapaVer}" target="_blank" rel="noopener">${ic('pin')}${E.rua}<br>${E.bairro}, ${E.cidade}<br>${E.cep}</a></p></div>
</div><div class="ct rod-fim"><p>© ${new Date().getFullYear()} Disk Embalagens</p><p>Versão ${v.toUpperCase()} · prévia Overtus</p></div></footer>
<div class="modal" id="modal" hidden><div class="modal-fundo" data-fecha></div><div class="modal-caixa" role="dialog" aria-modal="true" aria-labelledby="modal-t"><button class="modal-x" type="button" data-fecha aria-label="Fechar">×</button><div class="modal-corpo"></div></div></div>
<div class="aviso" role="status" aria-live="polite" hidden></div>
${v === 'b' ? `<a class="b-barra" href="${r.lista}" data-gaveta hidden>${ic('lista')}<span><b data-lista-n>0</b> itens na lista</span><em>Ver lista ${ic('seta')}</em></a>
<aside class="gaveta" id="gaveta" hidden><div class="gaveta-fundo" data-fecha-gaveta></div><div class="gaveta-caixa" role="dialog" aria-modal="true" aria-label="Minha lista"><div class="gaveta-cab"><h2>Minha lista</h2><button type="button" class="modal-x" data-fecha-gaveta aria-label="Fechar">×</button></div><div class="gaveta-itens" data-lista-mini></div><div class="gaveta-pe"><a class="bt bt-laranja" href="${r.lista}">Enviar pedido de orçamento ${ic('seta')}</a></div></div></aside>` : ''}`;
}

function pagina(v, atual, caminho, titulo, descricao, corpo) {
  const cab = v === 'a' ? cabecalhoA(atual) : cabecalhoB(atual);
  return `${head(v, titulo, descricao, caminho)}
<body class="v-${v}" data-v="${v}" data-email="${esc(E.email)}" data-whats="${esc(E.whatsapp)}" data-fones="${esc(E.fones.map(f => f.txt).join(' / '))}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${cab}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>`;
}

// ---------- seções compartilhadas ----------
function passosHTML(v) {
  const icones = ['busca', 'lista', 'tel', 'caminhao'];
  return `<section class="passos passos-${v}"><div class="ct">
<p class="sobre">Como pedir</p><h2 class="tt">Seu pedido em quatro passos</h2>
<ol class="passos-l" data-etapas><span class="ap-trilho" aria-hidden="true"></span>${passos.map((p, i) => `<li class="ap-etapa">${i === 2 ? '<span class="passo-ic passo-mascote"><img src="/assets/mascote.svg" alt=""></span>' : `<span class="passo-ic">${ic(icones[i])}</span>`}<b>${String(i + 1).padStart(2, '0')}</b><h3>${p.t}</h3><p>${p.p}</p></li>`).join('')}</ol>
</div></section>`;
}

function catalogo(v, cat) {
  const r = R(v);
  const c = cat ? catDe(cat) : null;
  const lista = c ? produtos.filter(p => p.cat === c.slug) : produtos;
  const lado = `<aside class="cat-lado">
<div class="cat-lado-bloco"><h2>Categorias</h2><ul class="cat-arvore">${categorias.map(k => `<li${k === c ? ' class="aberta"' : ''}><a href="${r.cat(k.slug)}"${k === c ? ' aria-current="page"' : ''}>${esc(k.nome)} <small>${k.n}</small></a>${k === c ? `<ul>${k.subs.map(s => `<li><a href="#${s.slug}" data-sub-link="${s.slug}">${esc(s.nome)} <small>${s.n}</small></a></li>`).join('')}</ul>` : ''}</li>`).join('')}</ul></div>
<div class="cat-lado-rapidez"><p>${rapidez.replace(' para', '<br>para')}</p>${E.fones.map(f => `<a href="tel:${f.href}"><small>54</small> ${f.txt.replace('54 ', '')}</a>`).join('')}</div>
</aside>`;
  const chips = c ? `<div class="chips" role="tablist" aria-label="Subcategorias"><button type="button" class="chip" data-sub="" aria-pressed="true">Todos <small>${c.n}</small></button>${c.subs.map(s => `<button type="button" class="chip" data-sub="${s.slug}" aria-pressed="false">${esc(s.nome)} <small>${s.n}</small></button>`).join('')}</div>`
    : `<div class="chips" aria-label="Categorias">${categorias.map(k => `<a class="chip" href="${r.cat(k.slug)}">${esc(k.nome)} <small>${k.n}</small></a>`).join('')}</div>`;
  const titulo = c ? c.nome : 'Todos os produtos';
  return `<section class="cat-topo cat-topo-${v}"><div class="ct">
<nav class="migalha" aria-label="Você está em"><a href="${r.home}">Início</a> / <a href="${r.produtos}">Produtos</a>${c ? ` / <span>${esc(c.nome)}</span>` : ''}</nav>
<h1 class="tt" data-titulo-cat>${esc(titulo)}</h1>
<p class="cat-n"><span data-cat-n>${lista.length}</span> produtos com foto. Adicione à lista e peça o orçamento de uma vez.</p>
</div></section>
<section class="cat cat-${v}"><div class="ct cat-in">
${lado}
<div class="cat-principal">
<div class="cat-ferr"><label class="cat-filtro">${ic('busca')}<input type="search" placeholder="Filtrar ${c ? `em ${esc(c.nome)}` : 'por nome'}" data-filtro aria-label="Filtrar produtos"></label>
<select data-ordem aria-label="Ordenar"><option value="cat">Ordem do catálogo</option><option value="az">Nome de A a Z</option><option value="za">Nome de Z a A</option></select></div>
${chips}
<p class="cat-vazio" hidden>Nenhum produto com esse nome. Tente outra palavra ou <a href="${r.contato}">fale com a Disk</a>: se não estiver no site, a gente procura.</p>
<div class="grade" data-grade>
${lista.map(p => tile(p, v)).join('\n')}
</div>
</div>
</div></section>`;
}

function listaPagina(v) {
  const r = R(v);
  return `<section class="cat-topo cat-topo-${v}"><div class="ct">
<nav class="migalha" aria-label="Você está em"><a href="${r.home}">Início</a> / <span>Minha lista</span></nav>
<h1 class="tt">Minha lista de orçamento</h1>
<p class="cat-n">Confira as quantidades, preencha seus dados e envie. A Disk responde com preços e prazo de entrega.</p>
</div></section>
<section class="orc orc-${v}"><div class="ct orc-in">
<div class="orc-itens"><div data-lista-tabela></div>
<p class="orc-vazia" hidden>Sua lista está vazia. <a href="${r.produtos}">Ver os ${totalProdutos} produtos ${ic('seta')}</a></p>
<a class="orc-mais" href="${r.produtos}">${ic('mais')} Adicionar mais produtos</a></div>
<form class="orc-form" data-envio="orcamento">
<h2>Seus dados</h2>
<label>Nome*<input name="nome" required autocomplete="name"></label>
<label>Empresa<input name="empresa" autocomplete="organization"></label>
<div class="duas"><label>Cidade*<input name="cidade" required autocomplete="address-level2"></label><label>Telefone*<input name="telefone" required type="tel" autocomplete="tel"></label></div>
<label>Observações<textarea name="obs" rows="3" placeholder="Prazo, forma de entrega, marca preferida..."></textarea></label>
<button class="bt bt-laranja" type="submit">Enviar pedido de orçamento ${ic('seta')}</button>
<div class="envio-ok" hidden></div>
<p class="orc-ou">Prefere falar? Ligue com a lista na mão: ${fonesTxt()}</p>
<button class="orc-imprimir" type="button" data-imprimir>Imprimir ou salvar em PDF</button>
</form>
</div></section>`;
}

function contatoPagina(v) {
  return `<section class="cat-topo cat-topo-${v}"><div class="ct">
<nav class="migalha" aria-label="Você está em"><a href="${R(v).home}">Início</a> / <span>Contato</span></nav>
<h1 class="tt">Contato</h1><p class="cat-n">${orcamento}</p>
</div></section>
<section class="cto cto-${v}"><div class="ct cto-in">
<div class="cto-info">
<h2>Nosso endereço</h2>
<p class="cto-end">${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}<br>${E.cep}</span></p>
<div class="cto-fones">${E.fones.map(f => `<a href="tel:${f.href}">${ic('tel')}<span><small>54</small> ${f.txt.replace('54 ', '')}</span></a>`).join('')}</div>
<div class="cto-mapa"><iframe src="${mapaEmbed}" title="Mapa: Disk Embalagens" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
<a class="cto-rota" href="${mapaVer}" target="_blank" rel="noopener">Abrir no Google Maps ${ic('seta')}</a>
</div>
<form class="cto-form" data-envio="contato">
<h2>Fale Conosco</h2>
<label>Nome*<input name="nome" required autocomplete="name"></label>
<label>Email*<input name="email" type="email" required autocomplete="email"></label>
<div class="duas"><label>Cidade*<input name="cidade" required autocomplete="address-level2"></label><label>Estado*<input name="estado" required maxlength="2" value="RS" autocomplete="address-level1"></label></div>
<label>Mensagem*<textarea name="mensagem" rows="5" required></textarea></label>
<button class="bt bt-laranja" type="submit">Enviar mensagem ${ic('seta')}</button>
<div class="envio-ok" hidden></div>
</form>
</div></section>`;
}

// ---------- versão A ----------
function homeA() {
  const r = R('a');
  const slides = banners.map((b, i) => `<div class="slide${i === 0 ? ' ativo' : ''}" style="--c1:${b.cor[0]};--c2:${b.cor[1]}" data-slide-i="${i}"${i ? ' aria-hidden="true"' : ''}>
<div class="ct slide-in"><div class="slide-txt"><h${i === 0 ? '1' : '2'} class="slide-t">${b.titulo}</h${i === 0 ? '1' : '2'}><p>${b.texto}</p><a class="bt bt-laranja" href="${r.cat(b.cat)}"${i ? ' tabindex="-1"' : ''}>${b.botao}</a></div>
<div class="slide-img"><img src="/assets/img/${b.img}.webp" alt="" width="800" height="563"${i ? ' loading="lazy"' : ' fetchpriority="high"'}></div></div></div>`).join('');
  return `<section class="a-hero" data-carrossel aria-roledescription="carrossel" aria-label="Destaques da Disk">
${slides}
<div class="a-hero-ctl"><button type="button" data-ant aria-label="Anterior">${ic('esq')}</button>${banners.map((b, i) => `<button type="button" class="ponto" data-ir="${i}" aria-label="${b.titulo}"${i === 0 ? ' aria-current="true"' : ''}></button>`).join('')}<button type="button" data-prox aria-label="Próximo">${ic('dir')}</button></div>
</section>
<section class="a-dest"><div class="ct">
<h2 class="a-riscado"><span>Produtos em Destaque</span></h2>
<div class="grade grade-4" data-rev-filhos data-rev-passo="70">${destaques.map(p => tile(p, 'a')).join('\n')}</div>
<p class="centro"><a class="bt bt-contorno" href="${r.dest}">Ver todos os destaques ${ic('seta')}</a></p>
</div></section>
<section class="a-linhas"><div class="ct">
<p class="sobre">Grande variedade em</p><h2 class="tt">${totalProdutos} produtos em 8 linhas</h2>
<div class="a-prat">${categorias.map(c => `<a class="a-prat-i" href="${r.cat(c.slug)}" data-rev>
<span class="a-prat-foto">${foto(c.foto)}</span>
<span class="a-prat-txt"><b>${esc(c.nome)}</b><small>${c.n} produtos</small><em>${c.subs.slice(0, 4).map(s => esc(s.nome)).join(' · ')}</em></span>
</a>`).join('')}</div>
</div></section>
${passosHTML('a')}
<section class="a-rapidez"><div class="ct a-rapidez-in">
<img class="a-rapidez-mascote" src="/assets/mascote.svg" alt="" width="200" height="200" data-rev="zoom">
<div><h2>${rapidez}</h2><p>Ligue e receba em sua empresa. Se preferir, monte a lista no site e envie de uma vez.</p></div>
<div class="a-rapidez-fones">${E.fones.map(f => `<a href="tel:${f.href}"><small>54</small>${f.txt.replace('54 ', '')}</a>`).join('')}<a class="bt bt-laranja" href="${r.lista}">Minha lista de orçamento ${ic('seta')}</a></div>
</div></section>`;
}

function institucionalA() {
  const r = R('a');
  return `<section class="a-inst-topo"><div class="ct a-inst-topo-in">
<div><nav class="migalha" aria-label="Você está em"><a href="${r.home}">Início</a> / <span>Institucional</span></nav>
<h1 class="tt">Disk Embalagens</h1>
<p class="a-inst-lead">${institucional[0].p}</p></div>
<div class="a-inst-ano" data-rev="zoom"><small>desde</small><b data-conta data-conta-de="2026">${E.anoDesde}</b><span>Caxias do Sul - RS</span></div>
</div></section>
<section class="a-inst"><div class="ct">
<div class="a-inst-l">${institucional.map((b, i) => `<div class="a-inst-b" data-rev><span class="a-inst-n">${String(i + 1).padStart(2, '0')}</span><h2>${b.t}</h2><p>${b.p}</p></div>`).join('')}</div>
</div></section>
<section class="a-anvisa"><div class="ct a-anvisa-in">${ic('escudo', 'ic a-anvisa-ic')}<p>${rodapeInstitucional}</p></div></section>
<section class="a-linhas a-linhas-inst"><div class="ct">
<p class="sobre">Grande variedade em</p><h2 class="tt">O que a Disk distribui</h2>
<div class="a-prat">${categorias.map(c => `<a class="a-prat-i" href="${r.cat(c.slug)}" data-rev><span class="a-prat-foto">${foto(c.foto)}</span><span class="a-prat-txt"><b>${esc(c.nome)}</b><small>${c.n} produtos</small></span></a>`).join('')}</div>
</div></section>
${passosHTML('a')}`;
}

function destaquesPagina(v) {
  const r = R(v);
  return `<section class="cat-topo cat-topo-${v}"><div class="ct">
<nav class="migalha" aria-label="Você está em"><a href="${r.home}">Início</a> / <span>Destaques</span></nav>
<h1 class="tt">Destaques</h1><p class="cat-n">Os produtos em destaque da Disk e as três linhas da vitrine.</p>
</div></section>
<section class="dst dst-${v}"><div class="ct">
<div class="grade grade-4">${destaques.map(p => tile(p, v)).join('\n')}</div>
<div class="dst-banners">${banners.map(b => `<a class="dst-b" href="${r.cat(b.cat)}" style="--c1:${b.cor[0]};--c2:${b.cor[1]}" data-rev><span class="dst-b-txt"><b>${b.titulo}</b><span>${b.texto}</span><em>${b.botao} ${ic('seta')}</em></span><img src="/assets/img/${b.img}.webp" alt="" loading="lazy" width="800" height="563"></a>`).join('')}</div>
</div></section>`;
}

// ---------- versão B ----------
function homeB() {
  const r = R('b');
  const parede = [...destaques.slice(0, 4), ...categorias.map(c => c.foto)].filter(p => p && p.sp).slice(0, 9);
  return `<section class="b-hero"><div class="ct b-hero-in">
<div class="b-hero-txt">
<p class="sobre">Distribuidora em Caxias do Sul desde ${E.anoDesde}</p>
<h1 class="tt">Embalagens, descartáveis, higiene, limpeza e escritório num pedido só.</h1>
<p class="b-hero-p">Oferecemos soluções em embalagens, descartáveis, produtos químicos, equipamentos e sistemas de higiene e limpeza, atendendo os mais diversos segmentos.</p>
<div class="b-atalhos"><span>Mais procurados:</span>${atalhos.map(t => `<a href="${r.produtos}?q=${encodeURIComponent(t)}">${t}</a>`).join('')}</div>
<div class="b-hero-bts"><a class="bt bt-laranja" href="${r.produtos}">Ver os ${totalProdutos} produtos ${ic('seta')}</a><a class="bt bt-contorno" href="tel:${E.fones[0].href}">${ic('tel')} ${E.fones[0].txt}</a></div>
</div>
<div class="b-parede" data-rev-filhos data-rev-passo="60" aria-hidden="true">${parede.map(p => `<a href="${r.cat(p.cat)}" tabindex="-1">${foto(p)}</a>`).join('')}</div>
</div></section>
<section class="b-numeros"><div class="ct b-numeros-in">
<div><b data-conta data-conta-de="2026">${E.anoDesde}</b><span>atendendo Caxias e região</span></div>
<div><b data-conta>${totalProdutos}</b><span>produtos com foto no site</span></div>
<div><b data-conta>8</b><span>linhas, de copa a escritório</span></div>
<div><b>${ic('escudo')}</b><span>produtos com registro na ANVISA</span></div>
</div></section>
<section class="b-amb"><div class="ct">
<p class="sobre">Compre por ambiente</p><h2 class="tt">O que a sua empresa precisa repor?</h2>
<div class="b-amb-g">${ambientes.map(a => `<a class="b-amb-i" href="${r.cat(a.link)}" data-rev>
<span class="b-amb-fotos">${a.fotos.map(p => foto(p)).join('')}</span>
<b>${a.nome}</b><span>${a.texto}</span><em>Ver produtos ${ic('seta')}</em></a>`).join('')}</div>
</div></section>
<section class="b-dest"><div class="ct">
<div class="b-sec-cab"><div><p class="sobre">Destaques</p><h2 class="tt">Produtos em destaque</h2></div><a class="b-link" href="${r.dest}">Ver todos ${ic('seta')}</a></div>
<div class="b-trilho" data-trilho>${destaques.map(p => tile(p, 'b')).join('\n')}</div>
</div></section>
<section class="b-indice"><div class="ct">
<p class="sobre">Catálogo</p><h2 class="tt">Todas as linhas</h2>
<div class="b-indice-g">${categorias.map(c => `<div class="b-indice-i" data-rev>
<a class="b-indice-cab" href="${r.cat(c.slug)}">${foto(c.foto, 'sp sp-mini')}<b>${esc(c.nome)}</b><small>${c.n}</small></a>
<p>${c.subs.map(s => `<a href="${r.cat(c.slug)}#${s.slug}">${esc(s.nome)}</a>`).join('')}</p></div>`).join('')}</div>
</div></section>
${passosHTML('b')}
<section class="b-inst"><div class="ct b-inst-in">
<img src="/assets/mascote.svg" alt="" width="140" height="140" data-rev="zoom">
<blockquote><p>${institucional[3].p}</p><footer>${institucional[2].p}</footer></blockquote>
<a class="bt bt-contorno-claro" href="${r.inst}">Conheça a Disk ${ic('seta')}</a>
</div></section>`;
}

function institucionalB() {
  const r = R('b');
  return `<section class="cat-topo cat-topo-b"><div class="ct">
<nav class="migalha" aria-label="Você está em"><a href="${r.home}">Início</a> / <span>Institucional</span></nav>
<h1 class="tt">Disk Embalagens</h1><p class="cat-n">${E.razao}</p>
</div></section>
<section class="b-hist"><div class="ct b-hist-in">
<div class="b-hist-ano" data-rev><b>1998</b><span>dezembro</span></div>
<div><h2>História</h2><p class="b-hist-lead">${institucional[0].p}</p><p>Desde então, a Disk atende empresas de Caxias do Sul e região com ${totalProdutos} produtos em 8 linhas, de embalagens e descartáveis a equipamentos de higiene e material de escritório.</p></div>
</div></section>
<section class="b-mvv"><div class="ct b-mvv-in">${institucional.slice(1).map(b => `<div data-rev><h2>${b.t}</h2><p>${b.p}</p></div>`).join('')}</div></section>
<section class="b-numeros"><div class="ct b-numeros-in">
<div><b data-conta>${totalProdutos}</b><span>produtos no catálogo</span></div>
<div><b data-conta>38</b><span>subcategorias</span></div>
<div><b>${ic('escudo')}</b><span>${rodapeInstitucional}</span></div>
<div><b>${ic('caminhao')}</b><span>Ligue e receba em sua empresa</span></div>
</div></section>
${passosHTML('b')}`;
}

// ---------- dados do catálogo para o navegador ----------
export function catalogoJSON() {
  return JSON.stringify({
    cats: categorias.map(c => ({ s: c.slug, n: c.nome, subs: c.subs.map(s => [s.slug, s.nome]) })),
    p: produtos.map(p => [p.id, p.nome, p.cat, p.sub, p.desc, ...(p.sp || [])]),
  });
}

export function gerarVersao(v) {
  const r = {};
  const nome = 'Disk Embalagens';
  const desc = `Embalagens, descartáveis, higiene, limpeza e material de escritório em Caxias do Sul desde 1998. ${totalProdutos} produtos com foto e lista de orçamento.`;
  r[''] = pagina(v, 'home', '', `${nome} · Embalagens, higiene e limpeza em Caxias do Sul`, desc, v === 'a' ? homeA() : homeB());
  r['produtos'] = pagina(v, 'produtos', 'produtos/', `Produtos · ${nome}`, `Os ${totalProdutos} produtos da Disk Embalagens: busque, filtre e monte sua lista de orçamento.`, catalogo(v, null));
  for (const c of categorias) r[`produtos/${c.slug}`] = pagina(v, v === 'a' ? 'produtos' : c.slug, `produtos/${c.slug}/`, `${c.nome} · ${nome}`, `${c.nome}: ${c.subs.map(s => s.nome).join(', ')}. ${c.n} produtos na Disk Embalagens, Caxias do Sul.`, catalogo(v, c.slug));
  r['institucional'] = pagina(v, 'inst', 'institucional/', `Institucional · ${nome}`, institucional[1].p, v === 'a' ? institucionalA() : institucionalB());
  r['destaques'] = pagina(v, 'dest', 'destaques/', `Destaques · ${nome}`, 'Produtos em destaque da Disk Embalagens.', destaquesPagina(v));
  r['contato'] = pagina(v, 'contato', 'contato/', `Contato · ${nome}`, `${E.enderecoLinha}. Telefones ${E.fones.map(f => f.txt).join(' e ')}.`, contatoPagina(v));
  r['orcamento'] = pagina(v, 'lista', 'orcamento/', `Minha lista de orçamento · ${nome}`, 'Monte sua lista e peça o orçamento para a Disk Embalagens.', listaPagina(v));
  return r;
}
