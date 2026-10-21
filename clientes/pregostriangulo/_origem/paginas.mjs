// Monta as páginas das versões A ("Tradição": fiel ao site atual, faixa vermelha, selo do logo, abas de produto com os ícones originais)
// e B ("Bitola": clara e direta, pregos desenhados em escala, busca por uso). Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, textos as T, estados, linhas, usos, totalMedidas, medida, bwgMm } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (n, alt, extra = '') => `<img src="/assets/img/foto-${n}.webp" alt="${esc(alt)}" width="950" height="340" loading="lazy" decoding="async"${extra}>`;
const icLinha = (slug, alt = '') => `<img class="ic-linha" src="/assets/img/ic-${slug}.png" alt="${esc(alt)}" width="190" height="94" loading="lazy">`;

export const nomesVersao = { a: 'Tradição', b: 'Bitola' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'Institucional', caminho: 'empresa/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'representantes', nome: 'Representantes', caminho: 'representantes/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  lista: '<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (v, txt = 'Olá! Vim pelo site da Pregos Triângulo e gostaria de um orçamento.') => `https://wa.me/${v.wa}?text=${encodeURIComponent(txt)}`;

// Prego desenhado em escala (comprimento em polegadas e bitola BWG), na horizontal, cabeça à esquerda.
export function prego(tipo, m, px = 46) {
  const { pol, bwg } = medida(m);
  if (!pol || !bwgMm[bwg]) return '';
  const d = Math.max(2.2, bwgMm[bwg] * px / 25.4), L = pol * px, cab = tipo === 'sem' ? d * 1.25 : tipo === 'telhado' ? d * 3.4 : d * 2.5;
  const ponta = Math.min(d * 2.4, L * .18), h = Math.max(cab, d) + 4, cy = h / 2, x0 = tipo === 'sem' ? 0 : 3;
  const corpo = `<path d="M${x0} ${cy - d / 2}H${L - ponta}L${L} ${cy}L${L - ponta} ${cy + d / 2}H${x0}Z" fill="url(#aco)"/>`;
  const cabeca = tipo === 'sem' ? '' : `<rect x="0" y="${cy - cab / 2}" width="${Math.max(2.4, d * .7)}" height="${cab}" rx="1" fill="url(#aco)"/>`;
  const dupla = tipo === 'dupla' ? `<rect x="${d * 2.2}" y="${cy - cab / 2}" width="${Math.max(2.4, d * .7)}" height="${cab}" rx="1" fill="url(#aco)"/>` : '';
  return `<svg class="prego" width="${(L + 2).toFixed(1)}" height="${h.toFixed(1)}" viewBox="0 0 ${(L + 2).toFixed(1)} ${h.toFixed(1)}" aria-hidden="true">${corpo}${cabeca}${dupla}</svg>`;
}
const defsAco = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="aco" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d848b"/><stop offset=".35" stop-color="#e9ecef"/><stop offset=".6" stop-color="#a9afb5"/><stop offset="1" stop-color="#5f666d"/></linearGradient></defs></svg>';

const mm = m => { const { pol, bwg } = medida(m); return pol && bwgMm[bwg] ? `${Math.round(pol * 25.4)} mm · Ø ${String(bwgMm[bwg]).replace('.', ',')} mm` : ''; };

// ---------- tabela de uma linha ----------
function tabela(l, v, { escala = false } = {}) {
  if (l.indisponivel) return `<p class="indisp">Indisponível no momento. Fale com o comercial para saber a previsão.</p>`;
  const add = (item) => `<button class="add" type="button" data-item="${esc(item)}" aria-label="Adicionar ${esc(item)} ao orçamento">${ic('mais')}<span>Orçar</span></button>`;
  if (l.tipo === 'arame') return `<table class="tab"><thead><tr><th>Rolos comerciais de 1 kg</th><th>Rolos industriais de 35 kg</th></tr></thead><tbody>${l.itens.map(r => `<tr><td>Arame recozido ${esc(r.c.replace('BWG N. ', 'BWG N.'))} ${add(`Arame recozido ${r.c.replace('BWG N. ', 'BWG N.')} · rolo 1 kg`)}</td><td>Arame recozido ${esc(r.i)} ${add(`Arame recozido ${r.i} · rolo 35 kg`)}</td></tr>`).join('')}</tbody></table>`;
  const temDesc = l.itens[0].d !== undefined;
  return `<table class="tab"><thead><tr>${temDesc ? '<th>Descrição</th>' : ''}<th>POL / BWG</th>${escala ? '<th class="col-escala">Em escala</th>' : ''}<th>Aplicação</th><th class="col-add"><span class="sr">Orçamento</span></th></tr></thead><tbody>${l.itens.map(r => {
    const nome = `${l.tipo === 'grampo' ? 'Grampo' : l.tipo === 'arame' ? 'Arame' : 'Prego'} ${l.nome.toLowerCase()} ${r.d || r.m}`.replace('Prego com cabeça 17', 'Prego com cabeça 17');
    return `<tr data-busca="${esc(`${l.nome} ${r.d || ''} ${r.m} ${r.a}`.toLowerCase())}">${temDesc ? `<td class="desc">${esc(r.d)}</td>` : ''}<td class="med"><b>${esc(r.m)}</b>${mm(r.m) && l.tipo !== 'taco' ? `<small>${mm(r.m)}</small>` : ''}</td>${escala ? `<td class="col-escala">${l.tipo === 'taco' || l.tipo === 'grampo' ? '' : prego(l.tipo, r.m, 26)}</td>` : ''}<td class="apl">${esc(r.a || '—')}</td><td class="col-add">${add(nome.replace(/ x /g, ' x '))}</td></tr>`;
  }).join('')}</tbody></table>`;
}

// ---------- moldura ----------
function head(v, p, titulo, descricao) {
  const url = `${E.url}${v}/${p}`;
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
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

function menu(v, atual) {
  return nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
}

function topo(v, atual) {
  const orc = `<a class="btn-orc" href="/${v}/contato/#orcamento">${ic('lista')}<span>Orçamento</span><b class="orc-n" hidden>0</b></a>`;
  if (v === 'a') return `<div class="faixa"><div class="in">
  <span>Fale com a gente <a href="tel:${E.foneHref}">${E.fone}</a></span>
  <span class="so-pc">E-mail <a href="mailto:${E.email}">${E.email}</a></span>
  <span>WhatsApp ${E.vendas.map(s => `<a href="${waLink(s)}" target="_blank" rel="noopener">${s.nome}</a>`).join(' · ')}</span>
</div></div>
<header class="topo"><div class="in">
  <a class="selo" href="/a/" aria-label="Pregos Triângulo, página inicial"><img src="/assets/logo.svg" alt="Pregos Triângulo" width="192" height="49"><small>desde 1958</small></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  ${orc}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Pregos Triângulo, página inicial"><img src="/assets/logo.svg" alt="Pregos Triângulo" width="192" height="49"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></nav>
  ${orc}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Pregos Triângulo" width="192" height="49"><p>Indústria 100% brasileira de pregos e arames, desde 1958.</p></div>
  <div><h3>Fábrica</h3><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Ver no mapa</a></div>
  <div><h3>Comercial</h3><p><a href="tel:${E.foneHref}">${E.fone}</a> · Fax ${E.fax}<br><a href="mailto:${E.email}">${E.email}</a></p>
  <p>${E.vendas.map(s => `<a href="${waLink(s)}" target="_blank" rel="noopener">${ic('wa')} ${s.fone} (Vendas ${s.nome})</a>`).join('<br>')}</p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${menu(v, '')}</nav>
</div><p class="rod-fim">© ${E.razao} · Uberlândia, MG</p></footer>
<a class="wa-flut" href="${waLink(E.vendas[0])}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('wa')}</a>`;
}

const pagina = (v, slug, titulo, descricao, corpo) => `${head(v, nav.find(n => n.slug === slug).caminho, titulo, descricao)}
<body class="v-${v} p-${slug}">
${defsAco}
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

const capa = (v, eyebrow, titulo, sub, n = 2) => v === 'a'
  ? `<section class="capa"><div class="in"><figure class="capa-foto">${foto(n, '', ' fetchpriority="high"')}</figure><div class="capa-txt"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></div></section>`
  : `<section class="capa"><div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

// ---------- blocos ----------
const abasProduto = (v, idPrefixo = 'h') => `<div class="abas" data-abas>
  <div class="abas-lista" role="tablist" aria-label="Tipo de produto">${linhas.map((l, i) => `<button role="tab" id="${idPrefixo}-t-${l.slug}" aria-controls="${idPrefixo}-p-${l.slug}" aria-selected="${i === 0}">${icLinha(l.slug)}<span>${l.nome}</span></button>`).join('')}</div>
  ${linhas.map((l, i) => `<div class="aba-painel" role="tabpanel" id="${idPrefixo}-p-${l.slug}" aria-labelledby="${idPrefixo}-t-${l.slug}"${i ? ' hidden' : ''}><p class="aba-curta">${esc(l.curta)}</p><div class="tab-rola">${tabela(l, v)}</div></div>`).join('')}
</div>`;

const mapaBloco = `<figure class="mapa"><img src="/assets/img/mapa.png" alt="Mapa do Brasil com a área de atuação da Pregos Triângulo: ${estados.join(', ')}" width="301" height="275" loading="lazy"></figure>`;
const chipsEstados = `<ul class="estados">${estados.map(e => `<li>${e}</li>`).join('')}</ul>`;

const formOrcamento = (v) => `<form class="form" id="orcamento" data-mailto="${E.email}" data-assunto="Pedido de orçamento pelo site">
  <div class="orc-lista" data-orc-lista><p class="orc-vazio">Nenhum item ainda. Use os botões <b>Orçar</b> no <a href="/${v}/produtos/">catálogo</a> ou escreva abaixo as medidas e quantidades.</p></div>
  <input type="hidden" name="Itens" data-orc-campo>
  <div class="campos">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>Empresa<input name="Empresa" autocomplete="organization"></label>
    <label>Cidade / UF<input name="Cidade" required></label>
    <label>Telefone ou WhatsApp<input name="Telefone" type="tel" required autocomplete="tel"></label>
    <label class="largo">E-mail<input name="E-mail" type="email" autocomplete="email"></label>
    <label class="largo">Medidas, quantidades e observações<textarea name="Mensagem" rows="4" placeholder="Ex.: 18 x 27, 10 caixas"></textarea></label>
  </div>
  <div class="form-acoes"><button class="btn" type="submit">${ic('mail')} Enviar por e-mail</button><button class="btn btn-wa" type="button" data-wa="${E.vendas[0].wa}">${ic('wa')} Enviar pelo WhatsApp</button></div>
</form>`;

// ---------- páginas ----------
function home(v) {
  if (v === 'a') return pagina(v, 'index', 'Pregos Triângulo · Pregos e arames desde 1958', T.bemVindo, `
<section class="hero"><div class="in">
  <div class="slides" data-slides>${[2, 1, 3, 4, 5].map((n, i) => `<figure${i ? '' : ' class="on"'}>${foto(n, ['Martelo e pregos sobre a madeira', 'Pregos de aço', 'Martelo e pregos na marcenaria', 'Carpinteiro pregando o telhado', 'Mão segurando o prego na madeira'][i], i ? '' : ' fetchpriority="high" loading="eager"')}</figure>`).join('')}</div>
  <div class="hero-txt"><p class="eyebrow">Uberlândia · MG · desde 1958</p><h1>Pregos e arames de alta qualidade</h1><p>Para as mais diversas finalidades e aplicações, industriais ou profissionais.</p>
  <div class="botoes"><a class="btn" href="/a/produtos/">Ver produtos ${ic('seta')}</a><a class="btn btn-claro" href="/a/contato/#orcamento">Pedir orçamento</a></div></div>
  <div class="slides-pontos" data-slides-pontos></div>
</div></section>

<section class="boas"><div class="in">
  <div><h2>Bem-vindo à Pregos Triângulo.</h2><p>${T.bemVindo}</p><a class="link" href="/a/empresa/">Conheça a empresa ${ic('seta')}</a></div>
  <div><h2>Como comprar.</h2><p>Escolha o tipo e a medida no catálogo e fale com o nosso comercial pelo formulário online, telefone ou WhatsApp.</p>
  <ul class="canais">
    <li><a href="/a/contato/#orcamento">${ic('lista')}<span><b>Formulário online</b>monte a lista e envie</span></a></li>
    ${E.vendas.map(s => `<li><a href="${waLink(s)}" target="_blank" rel="noopener">${ic('wa')}<span><b>Vendas ${s.nome}</b>${s.fone}</span></a></li>`).join('')}
    <li><a href="tel:${E.foneHref}">${ic('tel')}<span><b>Telefone</b>${E.fone}</span></a></li>
  </ul></div>
</div></section>

<section class="produtos-home"><div class="in">
  <div class="sec-tit"><h2>Escolha o <b>tipo</b> de <b>produto</b></h2><p>${totalMedidas} medidas de pregos em 7 linhas, mais arame recozido em rolos. Toque em <b>Orçar</b> para montar sua lista.</p></div>
  ${abasProduto(v)}
  <p class="centro"><a class="btn" href="/a/produtos/">Abrir o catálogo com busca ${ic('seta')}</a></p>
</div></section>

<section class="ideal"><div class="in">
  <figure>${foto(4, 'Carpinteiro pregando a estrutura de um telhado')}</figure>
  <blockquote><p>“Trabalhar com dedicação para obter um resultado final com <b>qualidade</b>, <b>tecnologia</b> e <b>satisfação</b>.”</p><cite>Nosso ideal, desde 1958</cite></blockquote>
</div></section>

<section class="repr"><div class="in">
  <div><p class="eyebrow">Seja nosso representante</p><h2>${T.contratando}</h2><p>${T.representante}</p>${chipsEstados}<a class="btn btn-claro" href="/a/representantes/">Quero representar ${ic('seta')}</a></div>
  ${mapaBloco}
</div></section>`);

  // B
  const usoItens = u => linhas.filter(l => !['grampo', 'arame', 'taco'].includes(l.tipo) || u.id === 'cercas').flatMap(l => l.itens.filter(r => r.a && u.palavras.some(p => r.a.toLowerCase().includes(p))).map(r => ({ l, r })));
  return pagina(v, 'index', 'Pregos Triângulo · Pregos e arames desde 1958', T.bemVindo, `
<section class="hero"><figure class="hero-foto">${foto(1, 'Pregos de aço da Pregos Triângulo', ' fetchpriority="high" loading="eager"')}</figure>
<div class="in"><p class="eyebrow">Indústria 100% brasileira · Uberlândia, MG</p><h1>Pregos e arames<br>desde <span>1958</span>.</h1><p>${T.bemVindo}</p>
<div class="botoes"><a class="btn" href="#qual-prego">Qual prego eu preciso? ${ic('seta')}</a><a class="btn btn-linha" href="/b/produtos/">Catálogo completo</a></div></div>
<dl class="numeros"><div><dt>Fundação</dt><dd>1958</dd></div><div><dt>Linhas de produto</dt><dd>8</dd></div><div><dt>Medidas de pregos</dt><dd>${totalMedidas}</dd></div><div><dt>Estados atendidos</dt><dd>${estados.length}</dd></div></dl>
</section>

<section class="qual" id="qual-prego"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Escolha pelo uso</p><h2>Qual prego para o seu trabalho?</h2><p>As aplicações vêm da nossa tabela. Os pregos aparecem desenhados em escala, com o comprimento e a bitola de cada medida.</p></div>
  <div class="usos" role="tablist" aria-label="Aplicação">${usos.map((u, i) => `<button role="tab" aria-selected="${i === 0}" aria-controls="uso-${u.id}" id="uso-t-${u.id}">${u.nome}</button>`).join('')}</div>
  ${usos.map((u, i) => {
    const itens = usoItens(u);
    return `<div class="uso-painel" role="tabpanel" id="uso-${u.id}" aria-labelledby="uso-t-${u.id}"${i ? ' hidden' : ''}><ul class="regua">${itens.map(({ l, r }) => `<li><span class="r-med"><b>${esc(r.d || r.m)}</b><small>${esc(l.nome)} · ${esc(r.m)}</small></span><span class="r-prego">${l.tipo === 'grampo' ? icLinha('grampos') : prego(l.tipo, r.m, 64)}</span><span class="r-apl">${esc(r.a)}</span><button class="add" type="button" data-item="${esc(`${l.tipo === 'grampo' ? 'Grampo' : 'Prego'} ${l.nome.toLowerCase()} ${r.d || r.m}`)}">${ic('mais')}<span>Orçar</span></button></li>`).join('')}</ul></div>`;
  }).join('')}
  <p class="nota">Escala aproximada: 1 polegada = 64 px na tela do computador. Medida em mm convertida da polegada; diâmetro pela tabela BWG.</p>
</div></section>

<section class="linhas"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Catálogo</p><h2>As 8 linhas da fábrica</h2></div>
  <ol class="linhas-lista">${linhas.map((l, i) => `<li${l.indisponivel ? ' class="off"' : ''}><a href="/b/produtos/#${l.slug}"><span class="n">${String(i + 1).padStart(2, '0')}</span>${icLinha(l.slug)}<span class="l-txt"><b>${l.nome}</b>${esc(l.curta)}</span><span class="l-qt">${l.indisponivel ? 'em breve' : `${l.itens.length} ${l.tipo === 'arame' ? 'bitolas' : l.itens.length === 1 ? 'medida' : 'medidas'}`}</span>${ic('seta')}</a></li>`).join('')}</ol>
</div></section>

<section class="fabrica"><div class="in">
  <figure class="fab-fotos"><div>${foto(5, 'Prego sendo pregado na madeira')}</div><div>${foto(3, 'Martelo e pregos sobre tábuas')}</div></figure>
  <div class="fab-txt"><p class="eyebrow">Institucional</p><h2>Líder de vendas em várias regiões, há mais de 65 anos.</h2><p>${T.historia[0]}</p><p>${T.historia[1]}</p>
  <ul class="valores"><li><b>Qualidade</b>matéria-prima do melhor que há no mercado</li><li><b>Tecnologia</b>máquinas de última geração</li><li><b>Satisfação</b>equipe formada e valorizada desde o início</li></ul>
  <a class="btn btn-linha" href="/b/empresa/">Nossa história ${ic('seta')}</a></div>
</div></section>

<section class="comprar"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Como comprar</p><h2>Do catálogo ao pedido em três passos</h2></div>
  <ol class="passos">
    <li><b>Escolha</b><p>Encontre o tipo e a medida no catálogo e toque em <em>Orçar</em> para montar sua lista.</p></li>
    <li><b>Envie</b><p>Mande a lista pelo formulário online, por e-mail ou direto no WhatsApp do comercial.</p></li>
    <li><b>Feche</b><p>Nossa equipe de vendas retorna com preço, prazo e condições.</p></li>
  </ol>
  <div class="vendedores">${E.vendas.map(s => `<a href="${waLink(s)}" target="_blank" rel="noopener">${ic('wa')}<span><small>Vendas</small><b>${s.nome}</b>${s.fone}</span></a>`).join('')}<a href="tel:${E.foneHref}">${ic('tel')}<span><small>Fábrica</small><b>Telefone</b>${E.fone}</span></a></div>
</div></section>

<section class="repr"><div class="in">
  ${mapaBloco}
  <div><p class="eyebrow">Representantes</p><h2>${T.contratando}</h2><p>${T.representante}</p>${chipsEstados}<a class="btn" href="/b/representantes/">Quero representar ${ic('seta')}</a></div>
</div></section>`);
}

function empresa(v) {
  return pagina(v, 'empresa', 'Institucional · Pregos Triângulo', T.historia[0], `
${capa(v, 'Institucional', 'Conheça nossa empresa', 'Uma indústria 100% brasileira de pregos e arames, em Uberlândia desde 1958.', 3)}
<section class="historia"><div class="in">
  <div class="hist-ano" aria-hidden="true">1958</div>
  <div class="hist-txt">${T.historia.map(p => `<p>${p}</p>`).join('')}<p class="destaque">${T.ideal}</p></div>
</div></section>
<section class="valores-sec"><div class="in">
  <div class="v-item"><span>01</span><h3>Qualidade</h3><p>Trabalhamos com o que há de melhor no mercado de matéria-prima.</p></div>
  <div class="v-item"><span>02</span><h3>Tecnologia</h3><p>Amplo parque industrial, com máquinas de última geração e tecnologia de ponta.</p></div>
  <div class="v-item"><span>03</span><h3>Satisfação</h3><p>Formação de mão de obra e qualidade de vida para os nossos funcionários.</p></div>
</div></section>
<section class="galeria"><div class="in">${(v === "b" ? [4, 2, 5, 3] : [4, 2, 5, 6]).map(n => `<figure>${foto(n, '')}</figure>`).join('')}</div></section>
<section class="herois"><div class="in"><p>${T.herois}</p><a class="btn" href="/${v}/produtos/">Ver produtos ${ic('seta')}</a></div></section>
<section class="repr"><div class="in">${mapaBloco}<div><p class="eyebrow">Área de atuação</p><h2>Presentes em ${estados.length} estados</h2>${chipsEstados}<a class="btn${v === 'a' ? ' btn-claro' : ''}" href="/${v}/representantes/">Seja representante ${ic('seta')}</a></div></div></section>`);
}

function produtos(v) {
  return pagina(v, 'produtos', 'Produtos · Pregos Triângulo', `Catálogo de pregos e arames da Pregos Triângulo: ${linhas.map(l => l.nome.toLowerCase()).join(', ')}.`, `
${capa(v, 'Produtos', 'Catálogo de pregos e arames', `${totalMedidas} medidas de pregos em 7 linhas, mais arame recozido. Pesquise pela medida ou pela aplicação.`, 1)}
<section class="catalogo"><div class="in">
  <div class="filtros">
    <label class="busca">${ic('busca')}<input type="search" placeholder="Pesquise: 18 x 27, telhado, caixaria…" data-busca aria-label="Pesquisar produto"></label>
    <nav class="chips" aria-label="Linhas">${linhas.map(l => `<a href="#${l.slug}">${l.nome}</a>`).join('')}</nav>
  </div>
  <p class="sem-res" data-sem-res hidden>Nenhuma medida encontrada. Tente outra palavra ou <a href="/${v}/contato/#orcamento">peça pelo formulário</a>.</p>
  ${linhas.map(l => `<section class="linha" id="${l.slug}" data-linha><header>${icLinha(l.slug)}<div><h2>${l.nome}</h2><p>${esc(l.curta)}</p></div></header><div class="tab-rola">${tabela(l, v, { escala: v === 'b' })}</div></section>`).join('')}
  <p class="nota">Medida em mm convertida da polegada; diâmetro pela tabela BWG. A tabela é a mesma do site atual; confirme disponibilidade com o comercial.</p>
</div></section>`);
}

function representantes(v) {
  return pagina(v, 'representantes', 'Representantes · Pregos Triângulo', T.representante, `
${capa(v, 'Representantes', 'Seja nosso representante', T.contratando, 4)}
<section class="repr repr-pag"><div class="in">
  <div><h2>Abra novos mercados com a gente</h2><p>${T.representante}</p><h3>Onde atuamos hoje</h3>${chipsEstados}</div>
  ${mapaBloco}
</div></section>
<section class="form-sec"><div class="in">
  <div class="sec-tit"><h2>Cadastre-se</h2><p>Mande seus dados e a região onde você atua. O comercial entra em contato.</p></div>
  <form class="form" data-mailto="${E.email}" data-assunto="Quero ser representante">
    <div class="campos">
      <label>Nome<input name="Nome" required autocomplete="name"></label>
      <label>Cidade / UF<input name="Cidade" required></label>
      <label>Telefone ou WhatsApp<input name="Telefone" type="tel" required autocomplete="tel"></label>
      <label>E-mail<input name="E-mail" type="email" autocomplete="email"></label>
      <label class="largo">Região de atuação<input name="Região" placeholder="Estados ou cidades que você atende"></label>
      <label class="largo">Experiência e linhas que já representa<textarea name="Experiência" rows="4"></textarea></label>
    </div>
    <div class="form-acoes"><button class="btn" type="submit">${ic('mail')} Enviar cadastro</button></div>
  </form>
</div></section>`);
}

function contato(v) {
  return pagina(v, 'contato', 'Contato · Pregos Triângulo', T.comoComprar, `
${capa(v, 'Contato', 'Fale com a gente', T.comoComprar, 6)}
<section class="contato"><div class="in">
  <div class="cont-canais">
    ${E.vendas.map(s => `<a class="canal" href="${waLink(s)}" target="_blank" rel="noopener">${ic('wa')}<span><small>WhatsApp · Vendas</small><b>${s.nome}</b>${s.fone}</span></a>`).join('')}
    <a class="canal" href="tel:${E.foneHref}">${ic('tel')}<span><small>Telefone</small><b>${E.fone}</b>Fax ${E.fax}</span></a>
    <a class="canal" href="mailto:${E.email}">${ic('mail')}<span><small>E-mail</small><b>${E.email}</b></span></a>
    <a class="canal" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')}<span><small>Fábrica</small><b>${E.endereco[0]}</b>${E.endereco.slice(1).join(' · ')}</span></a>
  </div>
  <div class="cont-form"><h2>Pedido de orçamento</h2>${formOrcamento(v)}</div>
</div></section>
<section class="mapa-emb"><iframe title="Mapa da fábrica da Pregos Triângulo" src="https://maps.google.com/maps?q=${encodeURIComponent(`${E.endereco[0]}, Uberlândia MG`)}&z=15&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`);
}

export function gerarVersao(v) {
  return { index: home(v), empresa: empresa(v), produtos: produtos(v), representantes: representantes(v), contato: contato(v) };
}
