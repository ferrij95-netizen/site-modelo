// Monta as páginas das versões A ("Folder": fiel ao material impresso da Bioplast, faixas verdes numeradas, linha com seta, mosaico de fotos)
// e B ("Injeção": azul das fotos de estúdio, granulado do logo, processo e polímeros em destaque). Estilos em public/assets/{base,a,b}.css.
import { empresa as E, textos as T, marcas, equipamentos, polimeros, polimerosNome, lab, labCats, biovin, biovinGrupos, party, partyGaleria } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (src, alt, w = 900, h = 600, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const nomesVersao = { a: 'Folder', b: 'Injeção' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'sobre', nome: 'Sobre', caminho: 'sobre/' },
  { slug: 'marcas', nome: 'Marcas', caminho: 'marcas/' },
  { slug: 'laboratorios', nome: 'Laboratórios', caminho: 'laboratorios/' },
  { slug: 'biovin', nome: 'Biovin', caminho: 'biovin/' },
  { slug: 'partyparts', nome: 'PartyParts', caminho: 'partyparts/' },
  { slug: 'pecas-tecnicas', nome: 'Peças técnicas', caminho: 'pecas-tecnicas/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  lista: '<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  zoom: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M11 8v6M8 11h6"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site do Grupo Bioplast e gostaria de um orçamento.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;
const add = item => `<button class="add" type="button" data-item="${esc(item)}" aria-label="Adicionar ${esc(item)} ao orçamento">${ic('mais')}${ic('ok', 'ic ic-ok')}<span class="t1">Orçar</span><span class="t2">Na lista</span></button>`;

// Granulado do logo (os pontos à esquerda de "BIOPLAST"), desenhado em SVG para usar como textura.
function granulado(cls = 'granulado', n = 70, w = 220, h = 260, semente = 7) {
  let s = semente; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  let pts = '';
  for (let i = 0; i < n; i++) { const x = Math.pow(r(), .55) * w, y = r() * h, rr = 2 + (x / w) * 7 * (0.6 + r() * .6); pts += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}"/>`; }
  return `<svg class="${cls}" viewBox="0 0 ${w} ${h}" aria-hidden="true" focusable="false">${pts}</svg>`;
}

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
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#00A859' : '#006DA0'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Saira+Semi+Condensed:wght@600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const orcBtn = v => `<a class="btn-orc" href="/${v}/contato/#orcamento">${ic('lista')}<span>Orçamento</span><b class="orc-n" hidden>0</b></a>`;

function topo(v, atual) {
  if (v === 'a') return `<div class="faixa"><div class="in">
  <a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
  <a href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} WhatsApp ${E.whats}</a>
  <a class="so-pc" href="mailto:${E.vendas}">${ic('mail')} ${E.vendas}</a>
</div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="Grupo Bioplast, página inicial"><img src="/assets/logo.webp" alt="Grupo Bioplast" width="520" height="127"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  ${orcBtn(v)}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div><div class="seta-linha" aria-hidden="true"></div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Grupo Bioplast, página inicial"><img src="/assets/logo.webp" alt="Grupo Bioplast" width="520" height="127"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></nav>
  ${orcBtn(v)}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape">${v === 'b' ? granulado('rod-gran', 90, 260, 200, 3) : ''}<div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.webp" alt="Grupo Bioplast" width="520" height="127"><p>${E.slogan}. Injeção plástica em Porto Alegre desde ${E.fundacao}.</p>
    <p class="rod-pgqp">${ic('escudo')} Diplomada pelo PGQP desde 2002</p></div>
  <div><h3>Fábrica</h3><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Ver no mapa</a></div>
  <div><h3>Fale com a gente</h3><p><a href="tel:${E.foneHref}">${E.fone}</a> · <a href="tel:${E.fone2Href}">${E.fone2}</a><br><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp ${E.whats}</a><br><a href="mailto:${E.email}">${E.email}</a><br><a href="mailto:${E.vendas}">${E.vendas}</a></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${menu(v, '')}</nav>
</div><p class="rod-fim">© ${E.razao} · Porto Alegre, RS</p></footer>
<a class="wa-flut" href="${waLink()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('wa')}</a>
<dialog class="zoom-dlg" data-zoom-dlg><form method="dialog"><button aria-label="Fechar">✕</button></form><img alt=""></dialog>`;
}

const pagina = (v, sl, titulo, descricao, corpo) => `${head(v, nav.find(n => n.slug === sl).caminho, titulo, descricao)}
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

// Título de seção: na A é a faixa verde do folder (número em círculo + bloco deslocado); na B é um título simples com rótulo.
const tit = (v, titulo, { n, eyebrow, tag = 'h2', id } = {}) => v === 'a'
  ? `<${tag} class="tarja"${id ? ` id="${id}"` : ''}>${n ? `<span class="tarja-n">${n}</span>` : ''}<span>${titulo}</span></${tag}>`
  : `<div class="tit"${id ? ` id="${id}"` : ''}>${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<${tag}>${titulo}</${tag}></div>`;

// Capa das páginas internas.
const capa = (v, eyebrow, titulo, sub, foto) => v === 'a'
  ? `<section class="capa"><div class="in"><div class="capa-txt"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${foto ? `<figure class="capa-foto">${img(foto, '', 1000, 660, ' fetchpriority="high"')}</figure>` : ''}</div><div class="seta-linha seta-inv" aria-hidden="true"></div></section>`
  : `<section class="capa">${foto ? `<div class="capa-fundo">${img(foto, '', 1400, 800, ' fetchpriority="high"')}</div>` : ''}${granulado('capa-gran')}<div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

// ---------- blocos ----------
const numeros = () => `<ul class="numeros">
  <li><b>1992</b><span>fundada em Porto Alegre</span></li>
  <li><b>220 t</b><span>de fechamento nas injetoras</span></li>
  <li><b>21</b><span>polímeros trabalhados</span></li>
  <li><b>PGQP</b><span>diplomada desde 2002</span></li>
</ul>`;

const listaEquip = () => `<dl class="equip">${equipamentos.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>`;

const gradePolimeros = () => `<ul class="polimeros">${polimeros.map((p, i) => `<li${i % 7 === 0 ? ' class="destaque"' : ''}><b>${p}</b><span>${polimerosNome[p]}</span></li>`).join('')}<li class="outros"><b>+</b><span>e outros polímeros de engenharia</span></li></ul>`;

const formOrc = (v, { titulo = 'Pedir orçamento', assunto = 'Contato pelo site' } = {}) => `<form class="form" data-mailto="${E.vendas}" data-assunto="${esc(assunto)}">
  <div class="campos">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>Empresa<input name="Empresa" autocomplete="organization"></label>
    <label>E-mail<input name="E-mail" type="email" required autocomplete="email"></label>
    <label>Telefone<input name="Telefone" type="tel" autocomplete="tel"></label>
    <label class="larga">Assunto<select name="Assunto"><option>Vendas</option><option>Contato / Dúvidas</option><option>Área técnica / Projetos</option><option>Compras</option><option>Financeiro</option></select></label>
    <label class="larga">Mensagem<textarea name="Mensagem" rows="4" placeholder="Conte o que precisa: produto, quantidade, cor, prazo."></textarea></label>
    <input type="hidden" name="Itens do orçamento" data-orc-campo>
  </div>
  <div class="form-acoes"><button class="btn" type="submit">${ic('mail')} Enviar por e-mail</button><button class="btn btn-wa" type="button" data-wa="${E.wa}">${ic('wa')} Enviar pelo WhatsApp</button></div>
</form>`;

const faixaContato = v => `<section class="faixa-contato"><div class="in">
  <div><p class="eyebrow">${T.desenvolvemos}</p><h2>Tem um produto ou uma peça para injetar?</h2><p>Mande o desenho, a amostra ou só a ideia. A equipe técnica responde com o material indicado e o orçamento.</p></div>
  <div class="fc-acoes"><a class="btn" href="/${v}/contato/">${ic('mail')} Falar com a Bioplast</a><a class="btn btn-wa" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} ${E.whats}</a></div>
</div></section>`;

// ---------- catálogo do laboratório ----------
function labGrupo(v, g) {
  const id = `lab-${g.n}`;
  if (v === 'a') return `<article class="lab-g" id="${id}" data-grupo data-cat="${slug(g.cat)}">
  <header><h3 class="tarja tarja-s"><span class="tarja-n">${g.n}</span><span>${g.nome}</span></h3><p class="lab-desc">${g.desc}</p></header>
  ${g.foto ? `<figure class="lab-foto">${img('lab/' + g.foto, g.nome, 900, 600)}</figure>` : ''}
  <table class="cods"><tbody>${g.itens.map(([c, d]) => `<tr data-busca="${esc(`${c} ${g.nome} ${d} ${g.cat}`.toLowerCase())}"><th scope="row">${c}</th><td>${d}</td><td class="col-add">${add(`${c} · ${g.nome} · ${d}`)}</td></tr>`).join('')}</tbody></table>
</article>`;
  return `<details class="lab-g" id="${id}" data-grupo data-cat="${slug(g.cat)}"${g.n <= 2 ? ' open' : ''}>
  <summary>${g.foto ? img('lab/' + g.foto, '', 160, 120) : `<span class="sem-foto">${String(g.n).padStart(2, '0')}</span>`}<span class="lg-nome"><b>${g.nome}</b><small>${g.cat} · ${g.itens.length} ${g.itens.length > 1 ? 'códigos' : 'código'}</small></span><span class="lg-mais" aria-hidden="true"></span></summary>
  <div class="lg-corpo"><p>${g.desc}</p><ul class="chips">${g.itens.map(([c, d]) => `<li data-busca="${esc(`${c} ${g.nome} ${d} ${g.cat}`.toLowerCase())}"><code>${c}</code><span>${d}</span>${add(`${c} · ${g.nome} · ${d}`)}</li>`).join('')}</ul></div>
</details>`;
}

const buscaLab = v => `<div class="busca-bar">
  <label class="busca">${ic('busca')}<span class="sr">Buscar no catálogo</span><input type="search" placeholder="Buscar por código ou produto (ex.: 2055, proveta, petri)" data-busca></label>
  <div class="filtros" role="group" aria-label="Filtrar por tipo"><button type="button" aria-pressed="true" data-filtro="">Todos</button>${labCats.map(c => `<button type="button" aria-pressed="false" data-filtro="${slug(c)}">${c}</button>`).join('')}</div>
</div><p class="sem-res" data-sem-res hidden>Nenhum produto com esse nome ou código. Fale com a gente: a Bioplast também desenvolve peças sob encomenda.</p>`;

// ---------- produtos Biovin / PartyParts ----------
const bvItem = (p, cls = '') => `<article class="prod ${cls}" data-busca="${esc(`${p.nome} ${p.cods.join(' ')}`.toLowerCase())}">
  <figure>${img('biovin/' + p.foto, p.nome, 700, 700)}</figure>
  <div><h3>${p.nome}</h3><p>${p.desc}</p><p class="cods-l">${p.cods.map(c => `<code>${c}</code>`).join('')}</p>${add(`Biovin · ${p.nome} (cód. ${p.cods.join(', ')})`)}</div>
</article>`;

const ppItem = p => `<article class="pp" data-busca="${esc(p.nome.toLowerCase())}">
  <figure>${img('party/' + p.foto, p.nome, 700, 700)}</figure>
  <div><h3>${p.nome}</h3><p>${p.desc}</p>${p.cores ? `<ul class="cores" aria-label="Cores">${p.cores.map(c => `<li style="--c:${corPP[c]}" title="${c}"><span class="sr">${c}</span></li>`).join('')}</ul>` : ''}${p.cods.length ? `<p class="cods-l">${p.cods.map(c => `<code>${c}</code>`).join('')}</p>` : ''}${add(`PartyParts · ${p.nome}${p.cods.length ? ` (cód. ${p.cods.join(', ')})` : ''}`)}</div>
</article>`;
const corPP = { Cristal: 'rgba(220,230,235,.6)', Amarelo: '#e9e21c', Verde: '#5fcf3b', Laranja: '#f7861f', Vermelho: '#e4322b', Azul: '#2b7fd1', Branco: '#fafafa', Preto: '#1d1d1d' };

// ---------- páginas ----------
function home(v) {
  if (v === 'a') {
    const t = (f, alt, cls = '') => `<figure class="mz ${cls}">${img(f, alt, 800, 600)}</figure>`;
    return `<section class="mosaico-capa"><div class="in mosaico">
  ${t('pecas/tampas-cor', 'Tampas injetadas em cores')}${t('pecas/beckers', 'Copos de Becker Bioplast')}
  <div class="mz mz-marca"><img src="/assets/img/logo-injetando.webp" alt="Bioplast, Injetando Conceitos" width="600" height="180"></div>
  ${t('pecas/ventoinha', 'Peças técnicas em plástico preto')}<div class="mz mz-verde"></div>
  ${t('pecas/pretas2', 'Peças técnicas injetadas', 'mz-larga')}
  <div class="mz mz-txt"><p class="eyebrow">Grupo Bioplast · Porto Alegre · desde ${E.fundacao}</p><h1>${T.chamada}</h1><div class="acoes"><a class="btn" href="/a/contato/">${ic('mail')} Pedir orçamento</a><a class="btn btn-linha" href="/a/marcas/">Ver as linhas ${ic('seta')}</a></div></div>
  ${t('pecas/cristal', 'Peças médicas em plástico cristal', 'mz-larga')}<div class="mz mz-lima"></div>
  ${t('pecas/pretas-azul', 'Componentes injetados')}${t('pecas/brancas-madeira', 'Peças brancas injetadas')}
  <div class="mz mz-frase"><p>tradição<br>em injeção<br>de peças</p></div>
  ${t('pecas/brancas', 'Carcaças brancas injetadas')}
</div></section>

<section class="sec esp"><div class="in">
  <p class="esp-rot">— Especialidades e linha de produtos —</p>
  <div class="esp-grade">${marcas.map(m => `<a class="esp-it" href="/a/${m.slug}/" style="--cor:${m.cor}">
    <figure>${img(m.foto, '', 900, 600)}</figure>
    <img class="esp-logo" src="/assets/img/${m.logo}.webp" alt="${m.marca}" width="600" height="180" loading="lazy">
    <h2>${m.nome}</h2><p>${m.curta}</p><span class="mais">Conhecer ${ic('seta')}</span></a>`).join('')}</div>
</div></section>

<section class="sec empresa-a"><div class="in">
  <div class="emp-txt">${tit(v, 'empresa')}<p>${T.quem}</p><p>${T.quem2}</p><a class="btn btn-linha" href="/a/sobre/">Nossa história ${ic('seta')}</a></div>
  <figure class="emp-foto">${img('pecas/azul', 'Peças técnicas injetadas pela Bioplast sobre fundo azul', 1400, 924)}</figure>
  <div class="emp-qual"><h3>sistema de<br><b>qualidade</b></h3><p>${T.pgqp}</p></div>
  <div class="emp-gar"><h3>garantia máxima Bioplast</h3><p>${T.garantia}</p></div>
</div></section>

<section class="sec"><div class="in">${numeros()}</div></section>

<section class="sec equip-a"><div class="in">
  <div>${tit(v, 'equipamentos')}<p>Possuímos equipamentos de última geração, da secagem do material até a embalagem.</p>${listaEquip()}</div>
  <figure>${img('pecas/fabrica-romi', 'Injetora ROMI e peças produzidas na Bioplast', 1400, 847)}<figcaption>Injetora ROMI e peças produzidas na fábrica.</figcaption></figure>
</div></section>

<section class="sec produtos-a"><div class="in">
  <div class="pa-txt">${tit(v, 'produtos')}<p>Trabalhamos com os mais diversos polímeros:</p></div>${gradePolimeros()}
</div></section>
${faixaContato(v)}`;
  }
  // B
  return `<section class="hero"><div class="hero-fundo">${img('pecas/azul', '', 1400, 924, ' fetchpriority="high"')}</div>${granulado('hero-gran', 120, 260, 300, 11)}
<div class="in"><p class="eyebrow">Grupo Bioplast · Porto Alegre · desde ${E.fundacao}</p><h1>${T.chamada}</h1><p class="hero-sub">Uma fábrica gaúcha de injeção plástica com quatro frentes: materiais para laboratório, acessórios para vinho, artigos para festas e peças técnicas sob encomenda.</p>
<div class="acoes"><a class="btn" href="/b/contato/">${ic('mail')} Pedir orçamento</a><a class="btn btn-claro" href="/b/laboratorios/">${ic('busca')} Catálogo de laboratório</a></div></div>
<div class="hero-num in">${numeros()}</div></section>

<section class="sec frentes"><div class="in">
  ${tit(v, 'Quatro linhas, uma fábrica', { eyebrow: 'Especialidades e linha de produtos' })}
  <div class="frentes-box" data-frentes>
    <ol class="frentes-lista">${marcas.map((m, i) => `<li><a href="/b/${m.slug}/" data-frente="${i}"${i === 0 ? ' class="on"' : ''} style="--cor:${m.cor}"><span class="fn">0${i + 1}</span><span class="ft"><b>${m.nome}</b><small>${m.curta}</small></span>${ic('seta')}</a></li>`).join('')}</ol>
    <div class="frentes-fotos">${marcas.map((m, i) => `<figure${i === 0 ? ' class="on"' : ''}>${img(m.foto, m.nome, 1000, 700)}<figcaption><img src="/assets/img/${m.logo}.webp" alt="${m.marca}" width="600" height="180" loading="lazy"></figcaption></figure>`).join('')}</div>
  </div>
</div></section>

<section class="sec processo"><div class="in">
  ${tit(v, 'Da ideia à peça pronta', { eyebrow: T.desenvolvemos })}
  <ol class="etapas">
    <li><span class="et-n">01</span><h3>Projeto</h3><p>Desenvolvimento do produto e do molde com o cliente, do desenho ou da amostra.</p></li>
    <li><span class="et-n">02</span><h3>Secagem</h3><p>Desumidificador, estufas e alimentador automático preparam o polímero.</p></li>
    <li><span class="et-n">03</span><h3>Injeção</h3><p>Injetoras com CLP, até 500 g por injeção e 220 toneladas de fechamento.</p></li>
    <li><span class="et-n">04</span><h3>Personalização</h3><p>Tampografia e gravação em silk screen ou auto relevo.</p></li>
    <li><span class="et-n">05</span><h3>Controle e embalagem</h3><p>Inspeção na própria linha e selagem skin para embalar.</p></li>
  </ol>
  <figure class="proc-foto">${img('pecas/fabrica-romi', 'Injetora ROMI e peças produzidas na Bioplast', 1400, 847)}</figure>
</div></section>

<section class="sec polim"><div class="in">
  <div class="polim-txt">${tit(v, 'Polímeros que injetamos', { eyebrow: 'Produtos' })}<p>Polímeros de engenharia de qualquer natureza são a nossa especialidade. Lotes pequenos ou grandes, de forma contínua ou personalizada.</p><a class="btn btn-linha" href="/b/pecas-tecnicas/">Peças técnicas ${ic('seta')}</a></div>
  ${gradePolimeros()}
</div></section>

<section class="sec lab-chamada"><div class="in">
  <figure>${img('lab/folder-azul-2', 'Pissetas, pipetadores, placas de Petri e jarra graduada Bioplast', 1000, 1141)}</figure>
  <div>${tit(v, `${lab.reduce((n, g) => n + g.itens.length, 0)} códigos para laboratório`, { eyebrow: 'Bioplast · Materiais para laboratórios' })}<p>Copos de Becker, provetas, coletores, pissetas, placas de Petri, pipetadores e mais, em polipropileno autoclavável. Busque pelo código do folder e monte a lista de orçamento.</p>
  <ul class="lc-tags">${lab.slice(0, 10).map(g => `<li><a href="/b/laboratorios/#lab-${g.n}">${g.nome}</a></li>`).join('')}</ul>
  <a class="btn" href="/b/laboratorios/">${ic('busca')} Abrir o catálogo</a></div>
</div></section>

<section class="sec qual-b"><div class="in">
  <div class="qb">${ic('escudo', 'qb-ic')}<h3>Qualidade PGQP</h3><p>${T.pgqp}</p></div>
  <div class="qb">${ic('busca', 'qb-ic')}<h3>Controle na produção</h3><p>${T.qualidade}</p></div>
  <div class="qb">${ic('ok', 'qb-ic')}<h3>Garantia máxima Bioplast</h3><p>${T.garantia}</p></div>
</div></section>
${faixaContato(v)}`;
}

function sobre(v) {
  const linha = [
    ['1992', 'Fundação em Porto Alegre', 'A Bioplast nasce voltada exclusivamente à fabricação e à comercialização de produtos para laboratórios.'],
    ['Anos depois', 'Peças técnicas e produtos para terceiros', 'Com a evolução do plástico no Brasil e no mundo, a empresa passa a injetar peças técnicas e a desenvolver produtos para outras empresas.'],
    ['2002', 'Adesão ao PGQP', 'Assina o termo do Programa Gaúcho da Qualidade e Produtividade e passa a ser diplomada desde então.'],
    ['Depois', 'Biovin e PartyParts', 'Nascem as linhas de acessórios para vinhos e espumantes e de artigos para festas, bares e casas noturnas.'],
  ];
  return `${capa(v, 'Sobre', 'Quem somos', 'Empresa de capital totalmente brasileiro, fundada em 1992 em Porto Alegre (RS).', v === 'a' ? 'pecas/lab-azul' : 'lab/folder-azul-1')}
<section class="sec"><div class="in sobre-intro">
  <div>${tit(v, 'Nossa história', { eyebrow: 'Grupo Bioplast' })}<p>${T.quem}</p><p>${T.quem2}</p></div>
  <blockquote class="lema"><p>“${T.lema}”</p></blockquote>
</div></section>
<section class="sec linha-tempo-s"><div class="in"><ol class="linha-tempo">${linha.map(([a, t, d]) => `<li><b>${a}</b><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol></div></section>
<section class="sec qualidade-s"><div class="in">
  <div class="qs qs-1">${tit(v, 'Sistema de qualidade', { eyebrow: 'PGQP' })}<p>${T.qualidade}</p><p>${T.pgqp}</p></div>
  <div class="qs qs-2"><h3>Garantia máxima Bioplast</h3><p>${T.garantia}</p></div>
  <figure class="qs-foto">${img('pecas/pretas', 'Peças técnicas injetadas em plástico preto', 1000, 664)}</figure>
</div></section>
<section class="sec equip-s"><div class="in">
  <div>${tit(v, 'Equipamentos', { eyebrow: 'A fábrica' })}<p>Possuímos equipamentos de última geração.</p></div>
  ${listaEquip()}
</div></section>
${faixaContato(v)}`;
}

function marcasPag(v) {
  return `${capa(v, 'Marcas e mercados', 'Quatro linhas, uma só fábrica', 'Do laboratório à mesa de festa, tudo injetado em Porto Alegre com o mesmo controle de qualidade.', v === 'a' ? null : 'pecas/azul')}
<section class="sec"><div class="in marcas-lista">${marcas.map((m, i) => `<article class="marca-it${i % 2 ? ' inv' : ''}" style="--cor:${m.cor}">
  <figure>${img(m.foto, m.nome, 1000, 700)}</figure>
  <div><img class="mi-logo" src="/assets/img/${m.logo}.webp" alt="${m.marca}" width="600" height="180" loading="lazy">
  <h2>${m.slug === 'laboratorios' ? 'Produtos para laboratórios' : m.slug === 'biovin' ? 'Acessórios para vinhos e espumantes' : m.slug === 'partyparts' ? 'Produtos para festas' : 'Injeção de peças técnicas'}</h2>
  <p>${m.texto}</p><a class="btn btn-linha" href="/${v}/${m.slug}/">Ver ${m.nome} ${ic('seta')}</a></div>
</article>`).join('')}</div></section>
${faixaContato(v)}`;
}

function laboratorios(v) {
  const total = lab.reduce((n, g) => n + g.itens.length, 0);
  return `${capa(v, 'Bioplast · Materiais para laboratórios', 'Produtos para laboratórios', `O plástico com qualidade de exportação: ${lab.length} linhas e ${total} códigos em polipropileno, poliestireno e PVC especial.`, v === 'a' ? 'lab/folder-azul-1' : 'lab/folder-azul-1')}
<section class="sec lab-sec"><div class="in">
  ${buscaLab(v)}
  <div class="lab-lista">${lab.map(g => labGrupo(v, g)).join('')}</div>
  <aside class="folder-orig"><div><h2>Folder original</h2><p>As páginas do folder impresso, para conferir ou baixar.</p></div>
    <button class="folder-mini" type="button" data-zoom="/assets/img/lab/folder-pag-1.webp">${img('lab/folder-pag-1', 'Folder Bioplast, páginas internas', 2000, 1101)}${ic('zoom')}</button>
    <button class="folder-mini" type="button" data-zoom="/assets/img/lab/folder-pag-2.webp">${img('lab/folder-pag-2', 'Folder Bioplast, provetas e contracapa', 1600, 1336)}${ic('zoom')}</button></aside>
</div></section>
${faixaContato(v)}`;
}

function biovinPag(v) {
  const destaque = ['escuro-aerador', 'escuro-tampa', 'escuro-saca-rolhas', 'escuro-identificador', 'escuro-corta-gotas', 'escuro-abridor2'];
  return `<section class="bv-capa"><div class="in">
  <div class="bv-txt"><img class="bv-logo" src="/assets/img/logo-biovin.webp" alt="Biovin, acessórios para vinhos e espumantes" width="600" height="235"><p class="bv-slogan">Beber com estilo</p><h1>Acessórios para vinhos e espumantes</h1><p>${marcas[1].texto}</p><div class="acoes"><a class="btn btn-vinho" href="#produtos">Ver os produtos ${ic('seta')}</a><a class="btn btn-linha-clara" href="mailto:${E.emailBiovin}">${ic('mail')} ${E.emailBiovin}</a></div></div>
  <div class="bv-fotos">${destaque.map((f, i) => `<figure>${img('biovin/' + f, '', 1000, 1000, i === 0 ? ' fetchpriority="high"' : '')}</figure>`).join('')}</div>
</div></section>
<section class="sec bv-prod" id="produtos"><div class="in">
  <nav class="grupos" aria-label="Grupos de produto">${biovinGrupos.map(g => `<a href="#bv-${slug(g)}">${g}</a>`).join('')}</nav>
  ${biovinGrupos.map(g => `<section class="bv-grupo" id="bv-${slug(g)}">${tit(v, g, { eyebrow: 'Biovin' })}<div class="prods">${biovin.filter(p => p.grupo === g).map(p => bvItem(p)).join('')}</div></section>`).join('')}
</div></section>
<section class="sec bv-person"><div class="in"><figure>${img('biovin/salva-vinhos-foto', 'Salva-vinhos Biovin', 1000, 1072)}</figure><div>${tit(v, 'Com a marca da sua vinícola', { eyebrow: 'Personalização' })}<p>Os acessórios Biovin podem ser personalizados conforme a necessidade de cada cliente, com tampografia feita na própria fábrica. Ideal para vinícolas, lojas e brindes corporativos.</p><a class="btn" href="/${v}/contato/">${ic('mail')} Pedir orçamento</a></div></div></section>
${faixaContato(v)}`;
}

function partyPag(v) {
  return `<section class="pp-capa"><div class="in">
  <div class="pp-txt"><img class="pp-logo" src="/assets/img/logo-partyparts.webp" alt="PartyParts, produtos para festas, bares e casas noturnas" width="600" height="160"><p class="pp-slogan">Personalize os momentos!</p><h1>Produtos para festas, eventos, bares e clubes</h1><p>${marcas[2].texto}</p><div class="acoes"><a class="btn btn-laranja" href="#produtos">Ver os produtos ${ic('seta')}</a></div></div>
  <figure class="pp-hero">${img('party/copos-coloridos', 'Copos long drink coloridos PartyParts', 671, 553, ' fetchpriority="high"')}</figure>
</div></section>
<section class="sec pp-faixa"><div class="in"><div class="pp-galeria">${partyGaleria.map(([f, alt]) => `<button type="button" data-zoom="/assets/img/${f}.webp">${img(f, alt, 1000, 800)}</button>`).join('')}</div></div></section>
<section class="sec pp-prod" id="produtos"><div class="in">${tit(v, 'Copos, baldes e acessórios', { eyebrow: 'PartyParts' })}<div class="pps">${party.map(ppItem).join('')}</div></div></section>
${faixaContato(v)}`;
}

function pecasPag(v) {
  const fotos = [['pecas/cristal', 'Peças médicas em plástico cristal'], ['pecas/pretas', 'Peças técnicas em plástico preto'], ['pecas/brancas', 'Carcaças e peças brancas injetadas'], ['pecas/brancas-madeira', 'Peças brancas pequenas'], ['pecas/tampas-cor', 'Tampas coloridas'], ['pecas/ventoinha', 'Grade e ventoinha em plástico preto'], ['pecas/pretas-azul', 'Componentes pretos'], ['lab/folder-provetas', 'Provetas e bases de proveta']];
  return `${capa(v, 'Injeção de peças para terceiros', 'Peças técnicas', T.pecas2, v === 'a' ? 'pecas/pretas' : 'pecas/cristal')}
<section class="sec pecas-intro"><div class="in">
  <div>${tit(v, 'Desenvolvemos sua ideia', { eyebrow: 'Consulte-nos' })}<p>${T.pecas}</p>
  <ul class="pontos"><li>Lotes pequenos ou grandes</li><li>Produção contínua ou personalizada</li><li>Desenvolvimento de produto para terceiros</li><li>Tampografia para personalizar as peças</li></ul></div>
  <figure>${img('pecas/fabrica-romi', 'Injetora ROMI e peças produzidas na Bioplast', 1400, 847)}</figure>
</div></section>
<section class="sec pecas-galeria"><div class="in">${tit(v, 'Algumas peças que já injetamos', { eyebrow: 'Portfólio' })}<div class="pg">${fotos.map(([f, a], i) => `<button type="button" class="pg-${i}" data-zoom="/assets/img/${f}.webp">${img(f, a, 1000, 700)}<span>${a}</span></button>`).join('')}</div></div></section>
<section class="sec pecas-pol"><div class="in">${tit(v, 'Polímeros', { eyebrow: 'Materiais' })}<p class="pp-int">Trabalhamos com os mais diversos polímeros, entre eles:</p>${gradePolimeros()}</div></section>
<section class="sec pecas-eq"><div class="in"><div>${tit(v, 'Equipamentos', { eyebrow: 'A fábrica' })}<p>Possuímos equipamentos de última geração.</p></div>${listaEquip()}</div></section>
<section class="sec pecas-form" id="projeto"><div class="in"><div>${tit(v, 'Envie seu projeto', { eyebrow: 'Área técnica / Projetos' })}<p>Descreva a peça, o material (se já souber), a quantidade por lote e o prazo. Se tiver desenho ou amostra, avise na mensagem que a equipe técnica entra em contato.</p></div>${formOrc(v, { assunto: 'Peças técnicas: projeto pelo site' })}</div></section>`;
}

function contato(v) {
  return `${capa(v, 'Contato', 'Fale conosco', T.contato, null)}
<section class="sec contato-sec"><div class="in">
  <div class="ct-info">
    <ul class="ct-lista">
      <li>${ic('tel')}<div><b>Telefones</b><span><a href="tel:${E.foneHref}">${E.fone}</a> · <a href="tel:${E.fone2Href}">${E.fone2}</a></span></div></li>
      <li>${ic('wa')}<div><b>WhatsApp</b><a href="${waLink()}" target="_blank" rel="noopener">${E.whats}</a></div></li>
      <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a><a href="mailto:${E.vendas}">${E.vendas}</a></div></li>
      <li>${ic('pin')}<div><b>Fábrica</b><span>${E.endereco.join('<br>')}</span><a href="${E.mapa}" target="_blank" rel="noopener">Ver no mapa</a></div></li>
    </ul>
    <div class="orc-box" id="orcamento"><h2>Lista de orçamento</h2><div data-orc-lista><p class="orc-vazio">Sua lista está vazia. Use o botão <b>Orçar</b> nos catálogos de <a href="/${v}/laboratorios/">Laboratórios</a>, <a href="/${v}/biovin/">Biovin</a> e <a href="/${v}/partyparts/">PartyParts</a>, ou escreva o pedido na mensagem.</p></div></div>
  </div>
  <div class="ct-form">${tit(v, 'Mande sua mensagem')}${formOrc(v)}</div>
</div></section>
<section class="mapa"><iframe title="Mapa da Bioplast" src="https://maps.google.com/maps?q=Rua%20Engenheiro%20Jo%C3%A3o%20Luderitz%2C%20495%2C%20Porto%20Alegre&z=15&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;
}

export function gerarVersao(v) {
  const N = nomesVersao[v];
  return {
    index: pagina(v, 'index', `${E.nome} · Injeção plástica em Porto Alegre`, `${T.chamada}. Materiais para laboratório, acessórios Biovin, PartyParts e peças técnicas injetadas desde 1992.`, home(v)),
    sobre: pagina(v, 'sobre', `Sobre · ${E.nome}`, T.quem, sobre(v)),
    marcas: pagina(v, 'marcas', `Marcas e mercados · ${E.nome}`, 'Laboratórios, Biovin, PartyParts e peças técnicas: as quatro linhas do Grupo Bioplast.', marcasPag(v)),
    laboratorios: pagina(v, 'laboratorios', `Produtos para laboratórios · ${E.nome}`, 'Catálogo Bioplast para laboratórios: copos de Becker, provetas, coletores, pissetas, placas de Petri, pipetadores e mais, com códigos.', laboratorios(v)),
    biovin: pagina(v, 'biovin', `Biovin · Acessórios para vinhos e espumantes`, 'Corta-gotas, saca-rolhas, aeradores, tampas para espumantes, salva-vinhos, baldes e kits Biovin.', biovinPag(v)),
    partyparts: pagina(v, 'partyparts', `PartyParts · Produtos para festas, bares e casas noturnas`, 'Copos shot, long drink, para bebidas e whisky, gelo ecológico, baldes e champanheiras em cores especiais.', partyPag(v)),
    'pecas-tecnicas': pagina(v, 'pecas-tecnicas', `Peças técnicas · ${E.nome}`, T.pecas, pecasPag(v)),
    contato: pagina(v, 'contato', `Contato · ${E.nome}`, T.contato, contato(v)),
  };
}
