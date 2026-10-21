// Monta as páginas das versões A ("Selo 1963": azul-marinho do site atual, foto preto e branco do banner, títulos condensados
// em caixa alta como no banner, selo "desde 1963") e B ("Pátio": claro, verde-petróleo do círculo do logo, títulos em Montserrat
// como o "J.Chiquitto" do logo, empilhadeira Hyster amarela recortada). Estilos em public/assets/{base,a,b}.css.
import { empresa as E, sobre, frentes, negocios, capacidades, produtos, servicos, marcas, estrutura } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (src, alt, w = 900, h = 600, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const pimg = (f, alt, extra = '') => img(`prod/${f}`, alt, 452, 452, extra);
const pad = n => String(n).padStart(2, '0');

export const nomesVersao = { a: 'Selo 1963', b: 'Pátio' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'empilhadeiras', nome: 'Empilhadeiras', caminho: 'empilhadeiras/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/>',
  face: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z"/>',
  lupa: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M11 8v6M8 11h6"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da J. Chiquitto e gostaria de uma cotação.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;

// ---------- moldura ----------
const fontes = {
  a: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@600;700;800&family=Inter:wght@400;500;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Inter:wght@400;500;600&display=swap',
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
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#07286B' : '#003E52'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontes[v]}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const btnMenu = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, atual) {
  if (v === 'a') return `<div class="faixa"><div class="in">
  <a href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} ${E.fone}</a>
  <span class="so-pc">${ic('relogio')} ${E.horario}</span>
  <a class="so-pc" href="mailto:${E.email}">${ic('mail')} ${E.email}</a>
</div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="J. Chiquitto, página inicial"><img src="/assets/logo-branco.webp" alt="J. Chiquitto, equipamentos para movimentação de carga" width="680" height="176"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="btn btn-cotar" href="/a/contato/">Cotação</a>
  ${btnMenu}
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="J. Chiquitto, página inicial"><img src="/assets/logo.webp" alt="J. Chiquitto, equipamentos para movimentação de carga" width="680" height="176"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="topo-tel" href="tel:${E.foneHref}">${ic('tel')}<span>${E.fone}</span></a>
  ${btnMenu}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.webp" alt="J. Chiquitto" width="680" height="176" loading="lazy">
    <p>Compra, venda, locação e reforma de empilhadeiras em Piracicaba desde ${E.fundacao}.</p>
    <p class="rod-redes"><a href="${E.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p></div>
  <div><h3>Endereço</h3><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Ver no mapa</a></div>
  <div><h3>Contato</h3><p><a href="tel:${E.foneHref}">${E.fone}</a> (ligação e WhatsApp)<br><a href="mailto:${E.email}">${E.email}</a><br>${E.horario}</p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${menu(v, '')}</nav>
</div><p class="rod-fim">© ${E.razao} · Piracicaba/SP · desde ${E.fundacao}</p></footer>
<a class="wa-flut" href="${waLink()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('wa')}</a>
<dialog class="zoom-dlg" data-zoom-dlg><form method="dialog"><button aria-label="Fechar">✕</button></form><img alt=""></dialog>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo) => `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${sl}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, sl === 'produto' ? 'produtos' : sl)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// Título de seção. A: caixa alta condensada com a tarja azul do banner numa parte. B: rótulo pequeno + título.
const tit = (v, titulo, { tarja, eyebrow, tag = 'h2', cls = '' } = {}) => v === 'a'
  ? `<div class="tit ${cls}">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<${tag}>${titulo}${tarja ? ` <span class="tarja">${tarja}</span>` : ''}</${tag}></div>`
  : `<div class="tit ${cls}">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<${tag}>${titulo}${tarja ? ` ${tarja}` : ''}</${tag}></div>`;

// Capa das páginas internas.
const capa = (v, eyebrow, titulo, sub, foto = 'fotos/capa-pb') => v === 'a'
  ? `<section class="capa"><div class="capa-fundo">${img(foto, '', 1600, 680, ' fetchpriority="high" loading="eager"')}</div><div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`
  : `<section class="capa"><div class="in"><div class="capa-txt"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div><div class="capa-foto">${img(foto, '', 1200, 800, ' fetchpriority="high" loading="eager"')}</div></div></section>`;

const cta = v => `<section class="cta"><div class="in">
  <div><h2>${v === 'a' ? 'Faça uma cotação <span class="tarja">sem compromisso</span>' : 'Faça uma cotação sem compromisso'}</h2><p>Atendemos por telefone e WhatsApp no ${E.fone}, ${E.horario.toLowerCase()}.</p></div>
  <div class="cta-btns"><a class="btn btn-wa" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} Chamar no WhatsApp</a><a class="btn btn-linha" href="/${v}/contato/">Enviar pedido</a></div>
</div></section>`;

// ---------- blocos ----------
const faixaMarcas = v => `<section class="marcas"><div class="in">
  ${tit(v, 'Principais marcas', { eyebrow: 'Trabalhamos com', cls: 'tit-centro' })}
  <ul class="marcas-lista">${marcas.map(([f, n]) => `<li>${img(`marcas/${f}`, n, 194, 154)}</li>`).join('')}</ul>
</div></section>`;

const capacidade = v => `<section class="capac"><div class="in">
  ${tit(v, 'Até onde a gente levanta', { eyebrow: 'Capacidades', cls: 'tit-claro' })}
  <ol class="capac-lista" data-capac>${capacidades.map(c => `<li style="--v:${c.v / 20}"><a href="/${v}/${c.link}"><span class="capac-nome">${c.t}</span><span class="capac-barra"><i></i></span><b>${c.txt}</b></a></li>`).join('')}</ol>
  <p class="capac-nota">Empilhadeiras novas e seminovas para locação e venda, e acessórios para todas as marcas.</p>
</div></section>`;

const galeriaEstrutura = v => `<div class="estr">${estrutura.map((f, i) => `<figure>${img(f, `Estrutura da J. Chiquitto em Piracicaba, foto ${i + 1}`, 608, 1080)}</figure>`).join('')}</div>`;

// Ficha de produto (usada na lista de produtos das duas versões).
const fichaProduto = (v, p, i) => `<a class="pf" href="/${v}/produtos/${p.slug}/"><span class="pf-n">${pad(i + 1)}</span><span class="pf-foto">${pimg(p.fotos[0], p.nome)}</span><span class="pf-txt"><b>${p.nome}</b><small>${p.resumo}</small></span><span class="pf-seta">${ic('seta')}</span></a>`;

// ---------- páginas ----------
function home(v) {
  const hero = v === 'a'
    ? `<section class="hero"><div class="hero-fundo">${img('fotos/capa-pb', '', 1600, 680, ' fetchpriority="high" loading="eager"')}</div><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">Especialistas em empilhadeiras</p>
    <h1>Compra, venda e locação <span class="tarja">de empilhadeiras</span></h1>
    <p class="hero-sub">Reforma e venda de peças · Mão de obra especializada</p>
    <div class="hero-btns"><a class="btn btn-wa" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} ${E.fone}</a><a class="btn btn-linha" href="/a/produtos/">Ver produtos</a></div>
  </div>
  <figure class="hero-empi">${img('fotos/empilhadeira-recorte', 'Empilhadeira carregando palete', 900, 760, ' loading="eager"')}</figure>
  <img class="hero-selo" src="/assets/img/fotos/selo-1963.webp" alt="Selo J. Chiquitto, desde 1963" width="230" height="250">
</div></section>`
    : `<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">Piracicaba/SP · desde ${E.fundacao}</p>
    <h1>Somos especialistas em empilhadeiras</h1>
    <p class="hero-sub">Compra, venda e locação de empilhadeiras até 20 toneladas, reforma e venda de peças, com estoque para agilizar o seu pedido.</p>
    <div class="hero-btns"><a class="btn btn-wa" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} Cotar no WhatsApp</a><a class="btn btn-linha" href="/b/empilhadeiras/">Alugar ou comprar</a></div>
    <ul class="hero-dados"><li><b>20 t</b><span>capacidade máxima</span></li><li><b>12</b><span>linhas de produtos</span></li><li><b>${2026 - E.fundacao}</b><span>anos de mercado</span></li></ul>
  </div>
  <div class="hero-palco"><span class="hero-circ" aria-hidden="true"></span>${img('fotos/hyster-recorte', 'Empilhadeira Hyster amarela', 1000, 650, ' loading="eager"')}</div>
</div></section>`;

  const frentesA = `<section class="frentes"><div class="in">
  ${tit('a', 'Somos especialistas', { tarja: 'em empilhadeiras', cls: 'tit-centro' })}
  <div class="frentes-lista">${frentes.map((f, i) => `<a class="frente" href="/a/${f.link}"><figure>${img(f.foto, '', 676, 470)}</figure><div class="frente-placa"><span>${pad(i + 1)}</span><h3>${f.t}</h3>${ic('seta')}</div></a>`).join('')}</div>
</div></section>`;

  const negociosB = `<section class="negocios" data-abas><div class="in">
  ${tit('b', 'Quatro jeitos de fazer negócio com a gente', { eyebrow: 'Empilhadeiras' })}
  <div class="abas" role="tablist">${negocios.map((n, i) => `<button role="tab" type="button" id="aba-${n.id}" aria-controls="painel-${n.id}" aria-selected="${i === 0}"><span>${pad(i + 1)}</span>${n.t}</button>`).join('')}</div>
  ${negocios.map((n, i) => `<div class="painel" role="tabpanel" id="painel-${n.id}" aria-labelledby="aba-${n.id}"${i ? ' hidden' : ''}>
    <figure>${img(n.foto, '', 900, 600)}</figure>
    <div><h3>${n.t}</h3><p>${n.d}</p><ul class="checks">${n.itens.map(t => `<li>${ic('ok')}${t}</li>`).join('')}</ul><a class="link-seta" href="/b/empilhadeiras/#${n.id}">Saiba mais ${ic('seta')}</a></div>
  </div>`).join('')}
</div></section>`;

  const produtosA = `<section class="prod-sec"><div class="in">
  ${tit('a', 'Linha de', { tarja: 'produtos' })}
  <p class="sec-sub">Acessórios, peças e componentes para empilhadeiras de todas as marcas. Clique para ver as fotos de cada linha.</p>
  <div class="prod-grade">${produtos.map((p, i) => fichaProduto('a', p, i)).join('')}</div>
</div></section>`;

  const produtosB = `<section class="prod-sec"><div class="in prod-indice">
  <div class="prod-indice-cab">${tit('b', 'Doze linhas de produtos', { eyebrow: 'Produtos' })}<p>Do garfo à torre de elevação, para todas as marcas. Passe o mouse para ver a peça.</p>
  <figure class="prod-indice-foto" data-indice-foto>${pimg(produtos[0].fotos[0], produtos[0].nome, ' loading="eager"')}</figure></div>
  <ol class="prod-lista">${produtos.map((p, i) => `<li><a href="/b/produtos/${p.slug}/" data-foto="/assets/img/prod/${p.fotos[0]}.webp"><span class="pl-n">${pad(i + 1)}</span><b>${p.nome}</b><small>${p.resumo}</small>${ic('seta')}</a></li>`).join('')}</ol>
</div></section>`;

  const servicosA = `<section class="serv-sec"><div class="in">
  <figure class="serv-foto">${img('fotos/mecanico', 'Mecânico da J. Chiquitto ao lado de uma empilhadeira', 1460, 973)}</figure>
  <div class="serv-txt">${tit('a', 'Serviços e', { tarja: 'reformas' })}
    <ol class="serv-lista">${servicos.map(s => `<li><b>${s.t}</b>${s.d ? `<span>${s.d}</span>` : ''}</li>`).join('')}</ol>
    <a class="btn btn-azul" href="/a/servicos/">Ver serviços ${ic('seta')}</a></div>
</div></section>`;

  const servicosB = `<section class="serv-sec"><div class="in">
  ${tit('b', 'Reformamos o que segura a carga', { eyebrow: 'Serviços e reformas' })}
  <div class="serv-mosaico">${servicos.slice(0, 6).map(s => `<a href="/b/produtos/${s.produto}/" class="sm"><span class="sm-foto">${img(s.foto, '', 452, 452)}</span><span class="sm-txt"><b>${s.t}</b>${s.d ? `<small>${s.d}</small>` : ''}</span></a>`).join('')}</div>
  <a class="link-seta" href="/b/servicos/">Todos os serviços ${ic('seta')}</a>
</div></section>`;

  const estrA = `<section class="estr-sec"><div class="in">
  <div class="estr-txt">${tit('a', 'Desde 1963', { tarja: 'em Piracicaba', eyebrow: 'Empresa' })}<p>${sobre.abertura}</p>
  <ul class="quatro">${sobre.quatro.map(q => `<li>${q}</li>`).join('')}</ul><a class="link-seta" href="/a/empresa/">Conheça a empresa ${ic('seta')}</a></div>
  ${galeriaEstrutura('a')}
</div></section>`;

  const estrB = `<section class="estr-sec"><div class="in">
  <figure class="estr-fachada">${img('fotos/fachada', 'Fachada da J. Chiquitto em Piracicaba', 502, 360)}</figure>
  <div class="estr-txt">${tit('b', 'Uma oficina de verdade, com estoque e equipe própria', { eyebrow: `Desde ${E.fundacao}` })}<p>${sobre.fecho}</p><a class="link-seta" href="/b/empresa/">Conheça a empresa ${ic('seta')}</a></div>
  ${galeriaEstrutura('b')}
</div></section>`;

  const corpo = v === 'a'
    ? [hero, frentesA, produtosA, capacidade('a'), servicosA, faixaMarcas('a'), estrA, cta('a')].join('\n')
    : [hero, faixaMarcas('b'), negociosB, produtosB, capacidade('b'), servicosB, estrB, cta('b')].join('\n');
  return pagina(v, 'index', '', 'J. Chiquitto · Especialista em empilhadeiras desde 1963', 'Compra, venda e locação de empilhadeiras até 20 toneladas, reforma e venda de peças em Piracicaba/SP desde 1963.', corpo);
}

function empresaPg(v) {
  const corpo = `${capa(v, 'Sobre a empresa', v === 'a' ? 'J. Chiquitto <span class="tarja">desde 1963</span>' : 'J. Chiquitto, desde 1963', 'Equipamentos para movimentação de carga em Piracicaba/SP.', v === 'a' ? 'fotos/galpao' : 'fotos/fachada')}
<section class="sobre"><div class="in">
  <div class="sobre-txt">
    <p class="sobre-abre">${sobre.abertura}</p>
    <p>${sobre.solucao}</p>
    <ul class="quatro">${sobre.quatro.map(q => `<li>${q}</li>`).join('')}</ul>
    <p>${sobre.fecho}</p>
  </div>
  <aside class="sobre-selo">${v === 'a' ? `<img src="/assets/img/fotos/selo-1963.webp" alt="Selo J. Chiquitto, desde 1963" width="230" height="250" loading="lazy">` : `<img src="/assets/img/fotos/jc-circulo.webp" alt="Marca J. Chiquitto" width="300" height="300" loading="lazy">`}<p><b>${2026 - E.fundacao} anos</b> atendendo clientes em todo o país.</p></aside>
</div></section>
<section class="pilares"><div class="in">
  ${tit(v, v === 'a' ? 'O que' : 'O que fazemos', { tarja: v === 'a' ? 'fazemos' : '' })}
  <div class="pilares-lista">${sobre.pilares.map((p, i) => `<article class="pilar"><figure>${img(p.foto, '', 900, 600)}</figure><div><span class="pilar-n">${pad(i + 1)}</span><h3>${p.t}</h3><p>${p.d}</p></div></article>`).join('')}</div>
</div></section>
<section class="estr-sec estr-pg"><div class="in">
  ${tit(v, v === 'a' ? 'Nossa' : 'Nossa estrutura', { tarja: v === 'a' ? 'estrutura' : '', eyebrow: 'Rua Antônio Alcântara Machado, 822' })}
  ${galeriaEstrutura(v)}
</div></section>
${faixaMarcas(v)}
${cta(v)}`;
  return pagina(v, 'empresa', 'empresa/', 'Empresa · J. Chiquitto', 'Desde 1963 a J. Chiquitto trabalha com pronto atendimento em reforma e venda de peças para empilhadeiras.', corpo);
}

function empilhadeirasPg(v) {
  const corpo = `${capa(v, 'Empilhadeiras', v === 'a' ? 'Aluguel, venda <span class="tarja">e compra</span>' : 'Aluguel, venda e compra de empilhadeiras', 'Equipamentos novos e seminovos com capacidade de até 20 toneladas.', v === 'a' ? 'fotos/frota' : 'fotos/estrutura2')}
<nav class="ancoras" aria-label="Nesta página"><div class="in">${negocios.map((n, i) => `<a href="#${n.id}"><span>${pad(i + 1)}</span>${n.t}</a>`).join('')}</div></nav>
${negocios.map((n, i) => `<section class="negocio${i % 2 ? ' inv' : ''}" id="${n.id}"><div class="in">
  <figure>${img(n.foto, '', 1200, 800)}</figure>
  <div class="negocio-txt"><span class="negocio-n">${pad(i + 1)}</span><h2>${n.t}</h2><p>${n.d}</p><ul class="checks">${n.itens.map(t => `<li>${ic('ok')}${t}</li>`).join('')}</ul>
  <a class="btn btn-wa" href="${waLink(`Olá! Vim pelo site da J. Chiquitto e tenho interesse em ${n.id === 'compra' ? 'vender a minha empilhadeira' : n.id === 'pecas' ? 'peças para empilhadeira' : `${n.t.toLowerCase()} de empilhadeira`}.`)}" target="_blank" rel="noopener">${ic('wa')} ${n.id === 'compra' ? 'Avaliar minha empilhadeira' : `Falar sobre ${n.t.toLowerCase()}`}</a></div>
</div></section>`).join('\n')}
${capacidade(v)}
${cta(v)}`;
  return pagina(v, 'empilhadeiras', 'empilhadeiras/', 'Empilhadeiras: aluguel, venda e compra · J. Chiquitto', 'Aluguel diário, mensal e anual, venda de empilhadeiras novas e seminovas até 20 toneladas, peças e compra do seu equipamento.', corpo);
}

function produtosPg(v) {
  const corpo = `${capa(v, 'Produtos', v === 'a' ? 'Linha de <span class="tarja">produtos</span>' : 'Linha de produtos', 'Acessórios, peças e componentes para empilhadeiras de todas as marcas.', v === 'a' ? 'fotos/fileira' : 'fotos/hyster-branco')}
<section class="prod-sec prod-pg"><div class="in">
  <div class="prod-grade">${produtos.map((p, i) => fichaProduto(v, p, i)).join('')}</div>
</div></section>
${faixaMarcas(v)}
${cta(v)}`;
  return pagina(v, 'produtos', 'produtos/', 'Produtos para empilhadeiras · J. Chiquitto', 'Carcaças, garfos, torres de elevação, componentes hidráulicos, eixos, deslocadores, giratórios, posicionadores e peças.', corpo);
}

function produtoPg(v, p, i) {
  const outros = produtos.filter(o => o !== p);
  const viz = [outros[(i) % outros.length], outros[(i + 1) % outros.length], outros[(i + 2) % outros.length]];
  const corpo = `<nav class="trilha" aria-label="Você está em"><div class="in"><a href="/${v}/">Início</a> / <a href="/${v}/produtos/">Produtos</a> / <span>${p.nome}</span></div></nav>
<section class="produto"><div class="in">
  <div class="galeria" data-galeria>
    <button class="gal-principal" type="button" data-zoom="/assets/img/prod/${p.fotos[0]}.webp" aria-label="Ampliar foto">${pimg(p.fotos[0], p.nome, ' loading="eager" fetchpriority="high"')}<span class="gal-lupa">${ic('lupa')}</span></button>
    ${p.fotos.length > 1 ? `<div class="gal-miniaturas">${p.fotos.map((f, k) => `<button type="button" data-foto="/assets/img/prod/${f}.webp"${k === 0 ? ' aria-current="true"' : ''} aria-label="Foto ${k + 1} de ${p.fotos.length}">${pimg(f, '')}</button>`).join('')}</div>` : ''}
  </div>
  <div class="produto-txt">
    <p class="eyebrow">Produtos · ${pad(i + 1)} de ${produtos.length}</p>
    <h1>${p.nome}</h1>
    ${p.textos.map(t => `<p>${t}</p>`).join('')}
    ${p.spec ? `<dl class="spec">${p.spec.map(([k, val]) => `<div><dt>${k}</dt><dd>${val}</dd></div>`).join('')}</dl>` : ''}
    <div class="produto-cot"><p><b>Consulte nossos preços.</b> Faça uma cotação sem compromisso:</p>
    <div class="hero-btns"><a class="btn btn-wa" href="${waLink(`Olá! Vim pelo site da J. Chiquitto e gostaria de uma cotação de ${p.nome.toLowerCase()}.`)}" target="_blank" rel="noopener">${ic('wa')} Cotar no WhatsApp</a><a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div></div>
  </div>
</div></section>
<section class="relac"><div class="in">
  ${tit(v, v === 'a' ? 'Veja também' : 'Veja também', {})}
  <div class="prod-grade prod-grade-3">${viz.map(o => fichaProduto(v, o, produtos.indexOf(o))).join('')}</div>
</div></section>
${cta(v)}`;
  return pagina(v, 'produto', `produtos/${p.slug}/`, `${p.nome} para empilhadeiras · J. Chiquitto`, `${p.textos.join(' ')} Cotação sem compromisso pelo ${E.fone}.`, corpo);
}

function servicosPg(v) {
  const corpo = `${capa(v, 'Serviços', v === 'a' ? 'Serviços e <span class="tarja">reformas</span>' : 'Serviços e reformas', 'Equipe de profissionais capacitados para revisões, consertos e reparos em geral.', 'fotos/mecanico')}
<section class="servicos"><div class="in">
  <ol class="serv-grade">${servicos.map((s, i) => `<li class="sv"><figure>${img(s.foto, '', 452, 452)}</figure><div><span class="sv-n">${pad(i + 1)}</span><h2>${s.t}</h2>${s.d ? `<p>${s.d}</p>` : ''}<a class="link-seta" href="/${v}/produtos/${s.produto}/">Ver a linha ${ic('seta')}</a></div></li>`).join('')}</ol>
</div></section>
<section class="torre-sec"><div class="in">
  <div>${tit(v, v === 'a' ? 'Duplex' : 'De duplex para triplex', { tarja: v === 'a' ? 'para triplex' : '', eyebrow: 'Torres de elevação' })}<p>Aumentamos, diminuímos e transformamos torres de elevação. Trabalhamos com modelos duplex, triplex e quadriplex de várias marcas.</p><a class="link-seta" href="/${v}/produtos/torres-de-elevacao/">Ver torres ${ic('seta')}</a></div>
  <div class="torre-vis" aria-hidden="true">${['Duplex', 'Triplex', 'Quadriplex'].map((t, k) => `<div class="torre t${k + 2}"><div class="torre-est">${'<i></i>'.repeat(k + 2)}</div><span>${t}</span></div>`).join('')}</div>
</div></section>
${faixaMarcas(v)}
${cta(v)}`;
  return pagina(v, 'servicos', 'servicos/', 'Serviços e reformas · J. Chiquitto', 'Reforma de torres, componentes hidráulicos, eixos, garfos e carros de elevação, e transformação de torres duplex para triplex.', corpo);
}

function contatoPg(v) {
  const corpo = `${capa(v, 'Contato', v === 'a' ? 'Fale com a <span class="tarja">J. Chiquitto</span>' : 'Fale com a J. Chiquitto', `${E.horario}.`, v === 'a' ? 'fotos/capa-pb' : 'fotos/estrutura1')}
<section class="contato"><div class="in">
  <div class="contato-dados">
    <a class="cd" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')}<span><small>Ligação e WhatsApp</small><b>${E.fone}</b></span></a>
    <a class="cd" href="mailto:${E.email}">${ic('mail')}<span><small>E-mail</small><b>${E.email}</b></span></a>
    <a class="cd" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')}<span><small>Endereço</small><b>${E.endereco[0]}</b>${E.endereco[1]} · ${E.endereco[2]}</span></a>
    <p class="cd">${ic('relogio')}<span><small>Horário</small><b>${E.horario}</b></span></p>
  </div>
  <form class="form" data-form id="cotacao">
    <h2>Pedido de cotação</h2>
    <div class="form-2"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
    <div class="form-2"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>Cidade<input name="cidade" autocomplete="address-level2"></label></div>
    <label>Assunto<select name="assunto">${['Locação de empilhadeira', 'Compra de empilhadeira', 'Vender minha empilhadeira', 'Peças', 'Reforma / serviço', ...produtos.map(p => p.nome)].map(o => `<option>${o}</option>`).join('')}</select></label>
    <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Modelo, marca, capacidade, prazo..."></textarea></label>
    <div class="form-btns"><button class="btn btn-wa" type="submit" data-via="wa">${ic('wa')} Enviar pelo WhatsApp</button><button class="btn btn-linha" type="submit" data-via="email">${ic('mail')} Enviar por e-mail</button></div>
  </form>
</div></section>
<section class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa: J. Chiquitto em Piracicaba" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;
  return pagina(v, 'contato', 'contato/', 'Contato · J. Chiquitto', `Fale com a J. Chiquitto: ${E.fone} (ligação e WhatsApp), ${E.email}. ${E.endereco.join(', ')}.`, corpo);
}

export function gerarVersao(v) {
  const out = { index: home(v), empresa: empresaPg(v), empilhadeiras: empilhadeirasPg(v), produtos: produtosPg(v), servicos: servicosPg(v), contato: contatoPg(v) };
  produtos.forEach((p, i) => { out[`produtos/${p.slug}`] = produtoPg(v, p, i); });
  return out;
}

export const contexto = { E, waLink };
