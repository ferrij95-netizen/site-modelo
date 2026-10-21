// Monta as páginas das versões A ("Parceria": faixa azul com a linha amarela do site atual, vitrine de máquinas como os banners dele)
// e B ("Produção": catálogo técnico, o caminho do painel pelas máquinas, fichas com cotas e comparativo). Estilos em public/assets/{base,a,b}.css.
import { empresa as E, historia, marcos, missao, visao, valores, linhas, fluxo, maquinas, representantes, ufs } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const linha = s => linhas.find(l => l.slug === s);
const daLinha = s => maquinas.filter(m => m.linha === s);
const mm = n => typeof n === 'number' ? n.toLocaleString('pt-BR') : n;
const rec = (m, cls = '', w = 640, h = 420, lazy = true) => `<img class="${cls}" src="/assets/img/rec/${m.slug}.webp" alt="${esc(`${linha(m.linha).sub.replace(/s de .*|s$/, '')} ${m.nome}`.trim())}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
const foto = (m, i, cls = '') => `<img class="${cls}" src="/assets/img/maq/${m.slug}-${i + 1}.webp" alt="${esc(`${m.nome}: ${m.legendas[i]}`)}" width="640" height="480" loading="lazy" decoding="async">`;
const nomeLinhaSing = { coladeiras: 'Coladeira de bordas', seccionadoras: 'Seccionadora', lixadeiras: 'Lixadeira', extrusoras: 'Extrusora', perfuradoras: 'Perfuradora de montantes', tupia: 'Tupia moldureira', furadeiras: 'Furadeira múltipla' };

export const nomesVersao = { a: 'Parceria', b: 'Produção' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'maquinas', nome: 'Máquinas', caminho: 'maquinas/' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'representantes', nome: 'Representantes', caminho: 'representantes/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  volta: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  cartao: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
  banco: '<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
  pessoas: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0112 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.2A5 5 0 0121 19"/>',
  fabrica: '<path d="M3 20V10l5 3V10l5 3V6h4l1 14z"/><path d="M3 20h18"/>',
  zoom: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M11 8v6M8 11h6"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const soDig = s => s.replace(/\D/g, '');
const telLink = s => `<a href="tel:+55${soDig(s)}">${s}</a>`;
const waLink = (s, txt = 'Olá! Vim pelo site da CVL Máquinas.') => `https://wa.me/55${soDig(s)}?text=${encodeURIComponent(txt)}`;
const logo = (cls = 'logo') => `<img class="${cls}" src="/assets/logo.svg" alt="CVL Máquinas" width="336" height="212">`;
const orcLink = (v, m) => `/${v}/contato/${m ? `?maquina=${m.slug}` : ''}#orcamento`;

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
<meta name="theme-color" content="#0a4f8c">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Saira:wdth,wght@100..125,500..800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');

function topo(v, atual) {
  if (v === 'a') return `<header class="topo"><div class="topo-azul"><div class="in">
  <a class="marca" href="/a/" aria-label="CVL Máquinas, página inicial">${logo()}</a>
  <p class="topo-slogan">Desde <b>1979</b> formando com você uma parceria perfeita!</p>
  <span class="selo-br" title="Fabricação 100% brasileira">100% <i aria-hidden="true"></i></span>
</div></div><div class="topo-faixa" aria-hidden="true"></div><div class="topo-nav"><div class="in">
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></nav>
  <a class="btn btn-am" href="${orcLink(v)}">Pedir orçamento</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="CVL Máquinas, página inicial">${logo()}</a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></nav>
  <a class="topo-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
  <a class="btn btn-am" href="${orcLink(v)}">Orçamento</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo()}<p>${E.slogan}</p><p class="rod-br">Máquinas para os setores moveleiro e madeireiro, fabricadas em Anchieta, SC.</p></div>
  <div><h3>Fábrica</h3><p>${E.razao}<br>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Ver no mapa</a></div>
  <div><h3>Fale com a CVL</h3><p>Fone/Fax <a href="tel:${E.foneHref}">${E.fone}</a><br><a href="mailto:${E.email}">${E.email}</a></p><a class="rod-link" href="/${v}/representantes/">${ic('pessoas')} Representante da sua região</a></div>
  <nav aria-label="Linhas"><h3>Máquinas</h3>${linhas.map(l => `<a href="/${v}/maquinas/#${l.slug}">${l.nome}</a>`).join('')}</nav>
</div><div class="rod-fim"><div class="in"><span>© ${E.razao}. Proibida a reprodução total ou parcial do conteúdo deste site.</span><span>Todas as imagens deste site são meramente ilustrativas.</span></div></div></footer>
<dialog class="zoom-dlg" data-zoom-dlg><form method="dialog"><button aria-label="Fechar">✕</button></form><img alt=""><p></p></dialog>`;
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

// ---------- peças comuns ----------
function dimensoes(m) {
  if (m.modelos) return `<div class="tab-rola"><table class="tab-modelos"><caption>Dimensões da máquina (mm)</caption><thead><tr><th scope="col">Modelo</th><th scope="col">Comprimento</th><th scope="col">Largura</th><th scope="col">Altura</th></tr></thead><tbody>${m.modelos.map(r => `<tr><th scope="row">${r[0]}</th><td>${mm(r[1])}</td><td>${mm(r[2])}</td><td>${mm(r[3])}</td></tr>`).join('')}</tbody></table></div>${m.notaModelos ? `<p class="nota">${m.notaModelos}</p>` : ''}`;
  const [c, l, a] = m.dim;
  return `<dl class="dims"><div><dt>Comprimento</dt><dd>${mm(c)} <small>mm</small></dd></div><div><dt>Largura</dt><dd>${mm(l)} <small>mm</small></dd></div><div><dt>Altura</dt><dd>${mm(a)} <small>mm</small></dd></div></dl>`;
}
const medidaCurta = m => {
  if (m.modelos) return `${m.modelos.length} tamanhos`;
  const [c, l, a] = m.dim;
  return typeof c === 'number' ? `${mm(c)} × ${mm(l)} × ${mm(a)} mm` : `${mm(l)} × ${mm(a)} mm (L × A)`;
};

function formOrcamento(v) {
  const opts = linhas.map(l => `<optgroup label="${l.nome}">${daLinha(l.slug).map(m => `<option value="${m.slug}">${esc(m.nome)}</option>`).join('')}</optgroup>`).join('');
  return `<form class="form-orc" data-form-orc data-email="${E.email}">
  <div class="campos">
    <label>Nome<input name="nome" required autocomplete="name"></label>
    <label>Empresa<input name="empresa" autocomplete="organization"></label>
    <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
    <label>Telefone<input name="fone" type="tel" autocomplete="tel" placeholder="(DDD) número"></label>
    <label>Cidade<input name="cidade" autocomplete="address-level2"></label>
    <label>Estado<input name="uf" maxlength="2" autocomplete="address-level1" placeholder="UF"></label>
    <label class="larga">Máquina de interesse<select name="maquina"><option value="">Ainda não sei, quero orientação</option>${opts}</select></label>
    <label class="larga">Mensagem<textarea name="msg" rows="4" placeholder="Conte o que a sua fábrica produz e o que precisa melhorar."></textarea></label>
  </div>
  <button class="btn btn-azul" type="submit">${ic('mail')} Enviar pedido de orçamento</button>
  <p class="form-nota">O pedido abre pronto no seu e-mail, endereçado para ${E.email}. Se preferir, ligue para <a href="tel:${E.foneHref}">${E.fone}</a>.</p>
</form>`;
}

function repLista(v) {
  return ufs.map(([uf, nomeUf]) => {
    const rs = representantes.filter(r => r.uf === uf);
    return `<section class="rep-uf" data-uf="${uf}" id="uf-${uf.toLowerCase()}"><h2><span>${uf}</span> ${nomeUf}</h2><div class="rep-grade">${rs.map(r => `<article class="rep">
  <h3>${esc(r.nome)}</h3>${r.contato ? `<p class="rep-cont">Contato: ${esc(r.contato)}</p>` : ''}
  <p class="rep-reg">${ic('pin')} ${r.regiao.join(' · ')}</p>
  <p class="rep-links">${(r.fones || []).map(f => `<a href="tel:+55${soDig(f)}">${ic('tel')} ${f}</a>`).join('')}${r.whats ? `<a class="rep-wa" href="${waLink(r.whats, 'Olá! Vim pelo site da CVL Máquinas e gostaria de falar sobre as máquinas.')}" target="_blank" rel="noopener">${ic('wa')} ${r.whats}</a>` : ''}${r.email ? `<a href="mailto:${r.email}">${ic('mail')} ${r.email}</a>` : ''}</p>
</article>`).join('')}</div></section>`;
  }).join('');
}
const repFiltro = () => `<div class="filtro-uf" role="group" aria-label="Filtrar por estado"><button type="button" data-uf-f="" aria-pressed="true">Todos</button>${ufs.map(([uf, n]) => `<button type="button" data-uf-f="${uf}" aria-pressed="false" title="${n}">${uf}</button>`).join('')}</div>`;

const financiamento = v => `<div class="fin">
  <a href="${E.bndes}" target="_blank" rel="noopener">${ic('cartao')}<span><b>Cartão BNDES</b>Simule a compra parcelada pelo cartão do BNDES.</span></a>
  <a href="${E.proger}" target="_blank" rel="noopener">${ic('banco')}<span><b>Proger</b>Financiamento do Banco do Brasil para empresas.</span></a>
  <a href="/${v}/representantes/">${ic('pessoas')}<span><b>Representantes</b>Atendimento no RS, SC, PR, ES, MG e Nordeste.</span></a>
  <a href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')}<span><b>Localização</b>Rodovia SC-473, km 23,5, Anchieta (SC).</span></a>
</div>`;

function galeria(m) {
  return `<div class="galeria" data-galeria>
  <button class="gal-princ" type="button" data-zoom="/assets/img/maq/${m.slug}-1.webp" aria-label="Ampliar foto">${foto(m, 0)}<span class="gal-zoom">${ic('zoom')}</span></button>
  ${m.fotos.length > 1 ? `<div class="gal-mini">${m.fotos.map((f, i) => `<button type="button" data-foto="/assets/img/maq/${m.slug}-${i + 1}.webp" data-leg="${esc(m.legendas[i])}"${i === 0 ? ' aria-current="true"' : ''}>${foto(m, i)}<span>${m.legendas[i]}</span></button>`).join('')}</div>` : ''}
</div>`;
}

// ================= VERSÃO A · Parceria =================
const A = {};
const vitrine = ['maxima', 'futura-v', 'lvb-3-grupos', 'pmp-102'].map(s => maquinas.find(m => m.slug === s));

A.index = () => pagina('a', 'index', '', 'CVL Máquinas · Máquinas para a indústria moveleira desde 1979', 'Seccionadoras, coladeiras de bordas, lixadeiras, furadeiras, tupias, perfuradoras e extrusoras fabricadas em Anchieta (SC) desde 1979.', `
<section class="vitrine" data-vitrine aria-roledescription="carrossel" aria-label="Máquinas em destaque">
  ${vitrine.map((m, i) => `<article class="vit-slide${i === 0 ? ' on' : ''}" data-slide aria-label="${i + 1} de ${vitrine.length}"${i ? ' aria-hidden="true"' : ''}>
    <div class="vit-topo"><div class="in"><p class="vit-linha">${nomeLinhaSing[m.linha]}</p><h${i ? 2 : 1} class="vit-nome">${i ? '' : '<span class="sr">CVL Máquinas: </span>'}${esc(m.nome)}</h${i ? 2 : 1}></div></div>
    <div class="in vit-corpo">
      <div class="vit-img">${rec(m, '', 640, 420, i > 0)}</div>
      <div class="vit-txt"><ul>${(m.destaque || []).map(d => `<li>${d}</li>`).join('')}</ul>
      <p class="vit-acoes"><a class="btn btn-azul" href="/a/maquinas/${m.slug}/">Conhecer a ${esc(m.nome)} ${ic('seta')}</a><a class="btn btn-linha" href="${orcLink('a', m)}">Pedir orçamento</a></p></div>
    </div>
  </article>`).join('')}
  <div class="in vit-abas" role="tablist">${vitrine.map((m, i) => `<button type="button" role="tab" data-ir="${i}" aria-selected="${i === 0}"><img src="/assets/img/rec/${m.slug}.webp" alt="" width="120" height="80" loading="lazy"><span>${esc(m.nome)}</span></button>`).join('')}</div>
</section>

<section class="como"><div class="in">${financiamento('a')}</div></section>

<section class="sec linhas-a"><div class="in">
  <header class="tit-sec"><p class="sobre">Produtos</p><h2>Sete linhas de máquinas para móveis e aberturas</h2><p>Da seccionadora que corta a chapa à lixadeira que deixa a peça pronta para a pintura. Mais de trinta modelos desenvolvidos e fabricados pela CVL.</p></header>
  <div class="prateleira">${linhas.map(l => `<a class="prat-item" href="/a/maquinas/#${l.slug}"><span class="prat-img">${rec(maquinas.find(m => m.slug === l.capa), '', 640, 420)}</span><b>${l.nome}</b><small>${l.sub}</small><em>${daLinha(l.slug).length} ${daLinha(l.slug).length > 1 ? 'modelos' : 'modelo'} ${ic('seta')}</em></a>`).join('')}<a class="prat-todas" href="/a/maquinas/"><b>${maquinas.length} máquinas</b><span>Veja fotos, características e dimensões de cada modelo.</span><em>Ver todas as máquinas ${ic('seta')}</em></a></div>
</div></section>

<section class="sec empresa-a"><div class="in empresa-grade">
  <figure class="foto-moldura"><img src="/assets/img/fabrica.webp" alt="Vista aérea da fábrica da CVL Máquinas no Parque Industrial de Anchieta, SC" width="400" height="267" loading="lazy"><figcaption>Fábrica no Parque Industrial de Anchieta (SC)</figcaption></figure>
  <div><p class="sobre">A empresa</p><h2>De um torno e um funcionário a uma fábrica de 21.000 m²</h2>
  <p>${historia[0]}</p><p>${historia[4]}</p>
  <dl class="numeros"><div><dt>Desde</dt><dd>1979</dd></div><div><dt>Área fabril</dt><dd>21.000 m²</dd></div><div><dt>Modelos</dt><dd>+30</dd></div></dl>
  <a class="btn btn-azul" href="/a/empresa/">Conheça a nossa história ${ic('seta')}</a></div>
</div></section>

<section class="linha-tempo"><div class="in"><h2 class="sr">Linha do tempo</h2><ol>${marcos.map(m => `<li><b>${m.ano}</b><span>${m.titulo}</span></li>`).join('')}</ol></div></section>

<section class="cta-a"><div class="in"><div><h2>Formando com você uma parceria perfeita</h2><p>Fale com a fábrica ou com o representante da sua região para escolher o modelo certo para a sua produção.</p></div>
<p class="cta-acoes"><a class="btn btn-azul" href="${orcLink('a')}">${ic('mail')} Pedir orçamento</a><a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></p></div></section>`);

A.maquinas = () => pagina('a', 'maquinas', 'maquinas/', 'Máquinas · CVL Máquinas', 'Coladeiras de bordas, seccionadoras, lixadeiras, extrusoras, perfuradoras de montantes, tupia e furadeiras múltiplas da CVL.', `
<section class="cab-pag"><div class="in"><p class="trilha"><a href="/a/">Início</a> / Máquinas</p><h1>Máquinas</h1><p>Escolha a linha e veja a ficha de cada modelo, com fotos, características e dimensões.</p></div></section>
<nav class="ancoras" aria-label="Linhas"><div class="in">${linhas.map(l => `<a href="#${l.slug}">${l.nome}</a>`).join('')}</div></nav>
${linhas.map((l, i) => `<section class="sec linha-bloco${i % 2 ? ' alt' : ''}" id="${l.slug}"><div class="in">
  <header class="linha-cab"><h2>${l.nome}</h2><p>${l.sub}</p></header>
  <div class="prod-grade">${daLinha(l.slug).map(m => `<a class="prod" href="/a/maquinas/${m.slug}/"><span class="prod-img">${rec(m)}</span><b>${esc(m.nome)}</b><span>${m.resumo}</span><em>Ver a máquina ${ic('seta')}</em></a>`).join('')}</div>
</div></section>`).join('')}`);

A.maquina = m => {
  const l = linha(m.linha), irmas = daLinha(m.linha).filter(x => x !== m);
  return pagina('a', 'maquina', `maquinas/${m.slug}/`, `${nomeLinhaSing[m.linha]} ${m.nome} · CVL Máquinas`, `${nomeLinhaSing[m.linha]} ${m.nome}: ${m.resumo}`, `
<section class="maq-topo"><div class="in">
  <p class="trilha"><a href="/a/">Início</a> / <a href="/a/maquinas/">Máquinas</a> / <a href="/a/maquinas/#${l.slug}">${l.nome}</a> / ${esc(m.nome)}</p>
  <div class="maq-grade">
    ${galeria(m)}
    <div class="maq-info"><p class="sobre">${nomeLinhaSing[m.linha]}</p><h1>${esc(m.nome)}</h1>
      ${m.aplicacao.map(p => `<p>${p}</p>`).join('')}
      <p class="maq-acoes"><a class="btn btn-am" href="${orcLink('a', m)}">Pedir orçamento desta máquina</a><a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></p>
    </div>
  </div>
</div></section>
<section class="sec maq-ficha"><div class="in ficha-grade">
  <div><h2>Principais características</h2><ul class="checks">${m.carac.map(c => `<li>${ic('ok')}${c}</li>`).join('')}</ul>
  ${m.opcionais ? `<h3>Opcionais</h3><ul class="opc">${m.opcionais.map(c => `<li>${ic('mais')}${c}</li>`).join('')}</ul>` : ''}</div>
  <div class="ficha-dim"><h2>Dimensões da máquina</h2>${dimensoes(m)}
  <div class="ficha-fin"><p><b>Compra facilitada:</b> consulte as condições pelo Cartão BNDES ou pelo Proger com a CVL ou com o representante da sua região.</p><a href="/a/representantes/">${ic('pessoas')} Encontrar representante</a></div></div>
</div></section>
${irmas.length ? `<section class="sec irmas"><div class="in"><h2>Outras ${l.nome.toLowerCase()} CVL</h2><div class="prod-grade">${irmas.map(x => `<a class="prod" href="/a/maquinas/${x.slug}/"><span class="prod-img">${rec(x)}</span><b>${esc(x.nome)}</b><span>${x.resumo}</span><em>Ver a máquina ${ic('seta')}</em></a>`).join('')}</div></div></section>` : ''}`);
};

A.empresa = () => pagina('a', 'empresa', 'empresa/', 'Empresa · CVL Máquinas', 'Fundada em 1979 em Anchieta (SC), a CVL Máquinas fabrica mais de trinta modelos de máquinas para os setores moveleiro e madeireiro.', `
<section class="cab-pag"><div class="in"><p class="trilha"><a href="/a/">Início</a> / Empresa</p><h1>Conheça um pouco da nossa história</h1><p>${E.slogan}</p></div></section>
<section class="sec"><div class="in hist-grade">
  <div class="hist-txt">${historia.map(p => `<p>${p}</p>`).join('')}</div>
  <aside class="hist-lado"><figure class="foto-moldura"><img src="/assets/img/fabrica.webp" alt="Vista aérea da fábrica da CVL Máquinas em Anchieta, SC" width="400" height="267" loading="lazy"><figcaption>21.000 m² no Parque Industrial de Anchieta (SC)</figcaption></figure>
  <dl class="numeros"><div><dt>Fundação</dt><dd>1979</dd></div><div><dt>Em Anchieta desde</dt><dd>2001</dd></div><div><dt>Modelos</dt><dd>+30</dd></div></dl></aside>
</div></section>
<section class="sec alt"><div class="in"><header class="tit-sec"><p class="sobre">Trajetória</p><h2>Da oficina de consertos à fábrica de máquinas</h2></header>
<ol class="marcos">${marcos.map(m => `<li><b>${m.ano}</b><h3>${m.titulo}</h3><p>${m.texto}</p></li>`).join('')}</ol></div></section>
<section class="sec mvv"><div class="in mvv-grade">
  <div><h2>Missão</h2><p>${missao}</p></div><div><h2>Visão</h2><p>${visao}</p></div><div><h2>Valores</h2><ul>${valores.map(x => `<li>${x}</li>`).join('')}</ul></div>
</div></section>`);

A.representantes = () => pagina('a', 'representantes', 'representantes/', 'Representantes · CVL Máquinas', 'Representantes CVL Máquinas no Rio Grande do Sul, Santa Catarina, Paraná, Espírito Santo, Minas Gerais e Nordeste.', `
<section class="cab-pag"><div class="in"><p class="trilha"><a href="/a/">Início</a> / Representantes</p><h1>Representantes</h1><p>Encontre quem atende a sua região. Os números com WhatsApp abrem a conversa direto.</p></div></section>
<section class="sec"><div class="in">${repFiltro()}${repLista('a')}
<div class="rep-fab"><p><b>Não encontrou a sua região?</b> A fábrica atende direto.</p><p><a class="btn btn-azul" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a> <a class="btn btn-linha" href="mailto:${E.email}">${ic('mail')} ${E.email}</a></p></div></div></section>`);

A.contato = () => pagina('a', 'contato', 'contato/', 'Contato · CVL Máquinas', 'Fale com a CVL Máquinas: (49) 3653-3900, cvl@cvlmaquinas.com.br, Rodovia SC-473, km 23,5, Anchieta (SC).', `
<section class="cab-pag"><div class="in"><p class="trilha"><a href="/a/">Início</a> / Contato</p><h1>Entre em contato conosco</h1><p>Preencha o formulário abaixo ou faça-nos uma visita!</p></div></section>
<section class="sec" id="orcamento"><div class="in contato-grade">
  <div><h2>Pedido de orçamento</h2>${formOrcamento('a')}</div>
  <aside class="contato-card">${logo('logo')}<h2>${E.razao}</h2><p>${E.endereco.join('<br>')}</p><p><small>Fone/Fax</small><a href="tel:${E.foneHref}">${E.fone}</a></p><p><small>E-mail</small><a href="mailto:${E.email}">${E.email}</a></p></aside>
</div></section>
<section class="sec alt"><div class="in"><header class="tit-sec"><h2>Como comprar</h2></header>${financiamento('a')}</div></section>
<section class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa: CVL Máquinas em Anchieta, SC" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`);

// ================= VERSÃO B · Produção =================
const B = {};
const comp = ['pratica', 'pratica-plus', 'exacta', 'versatil', 'maxima'].map(s => maquinas.find(m => m.slug === s));
const compLinhas = [
  ['Tamanhos de corte (mm)', ['2900', 'Base da Prática', '1500 · 3400 · 3800', '1500 · 3400 · 3800', '1500 · 3400 · 3800']],
  ['Velocidade de avanço', ['10 a 30 m/min', '10 a 30 m/min', '10 a 30 m/min', '10 a 30 m/min', 'até 70 m/min']],
  ['Comando', ['Retorno temporizado', 'CLP e IHM touchscreen', 'Retorno temporizado', 'Retorno temporizado', 'CLP computadorizado']],
  ['Encosto da peça', ['Manual', 'Eletrônico por CLP', 'Manual', 'Eletrônico automático', 'Empurrador com pinças']],
  ['Segurança no prensor', ['Barra', 'Barra', 'Barra e cortina · NR 12', 'Barra e cortina · NR 12', 'Barra e cortina · NR 12']],
  ['Otimizador de corte', ['', '', '', '', 'Com supervisório']],
];

function cotas(m) {
  // Desenho de cotas: caixa em perspectiva simples com comprimento, largura e altura.
  const d = m.modelos ? m.modelos[m.modelos.length - 1].slice(1) : m.dim;
  const t = x => typeof x === 'number' ? mm(x) : String(x).split(' ')[0];
  return `<svg class="cotas" viewBox="-34 0 330 210" role="img" aria-label="Medidas ${m.modelos ? `do maior modelo, ${m.modelos[m.modelos.length - 1][0]}` : ''}: comprimento ${t(d[0])} mm, largura ${t(d[1])} mm, altura ${t(d[2])} mm">
  <path class="cx" d="M60 70 L200 70 L260 40 L120 40 Z M60 70 L60 160 L200 160 L200 70 M200 160 L260 130 L260 40"/>
  <path class="cx tr" d="M60 160 L120 130 L260 130 M120 130 L120 40"/>
  <path class="ct" d="M60 182 L200 182 M60 176v12 M200 176v12 M214 176 L274 146 M210 170l8 12 M270 140l8 12 M36 70 L36 160 M30 70h12 M30 160h12"/>
  <text x="130" y="200" text-anchor="middle">${t(d[0])}</text><text x="262" y="178" text-anchor="middle">${t(d[1])}</text><text x="28" y="118" text-anchor="end">${t(d[2])}</text>
</svg>`;
}

B.index = () => pagina('b', 'index', '', 'CVL Máquinas · Do painel ao móvel, máquinas desde 1979', 'Seccionadoras, coladeiras de bordas, furadeiras, tupias e lixadeiras para a indústria moveleira, fabricadas pela CVL em Anchieta (SC) desde 1979.', `
<section class="heroi-b"><div class="in heroi-grade">
  <div class="heroi-txt"><p class="eti">Fabricante desde 1979 · Anchieta, SC</p><h1>Máquinas para quem fabrica móveis</h1>
  <p>Seccionadoras, coladeiras de bordas, furadeiras, tupias e lixadeiras: mais de trinta modelos desenvolvidos e fabricados pela CVL para os setores moveleiro e madeireiro.</p>
  <p class="acoes"><a class="btn btn-am" href="/b/maquinas/">Ver catálogo técnico ${ic('seta')}</a><a class="btn btn-claro" href="#caminho">Do painel ao móvel</a></p></div>
  <div class="heroi-maq" aria-hidden="true">${rec(maquinas.find(m => m.slug === 'maxima'), 'hm1', 640, 420, false)}${rec(maquinas.find(m => m.slug === 'futura-vi'), 'hm2', 640, 420, false)}${rec(maquinas.find(m => m.slug === 'lvb-3-grupos'), 'hm3', 640, 420, false)}</div>
</div><div class="heroi-chao" aria-hidden="true"></div></section>

<section class="sec caminho" id="caminho"><div class="in">
  <header class="tit-b"><span class="num">01</span><div><h2>Do painel ao móvel</h2><p>O caminho de uma chapa de MDF dentro da fábrica, e a máquina CVL de cada etapa.</p></div></header>
  <div class="etapas" data-etapas-b>
    <ol class="etapas-trilho" role="tablist">${fluxo.map((f, i) => `<li><button type="button" role="tab" data-etapa="${i}" aria-selected="${i === 0}"><span class="e-n">${i + 1}</span><b>${f.passo}</b><small>${linha(f.linha).nome}</small></button></li>`).join('')}</ol>
    ${fluxo.map((f, i) => `<div class="etapa-painel" data-painel="${i}" role="tabpanel"><div class="ep-txt"><p class="eti">Etapa ${i + 1} · ${f.passo}</p><h3>${linha(f.linha).verbo}</h3><p>${f.texto}</p><a class="lnk" href="/b/maquinas/?linha=${f.linha}">Todas as ${linha(f.linha).nome.toLowerCase()} ${ic('seta')}</a></div>
    <div class="ep-maqs">${daLinha(f.linha).map(m => `<a href="/b/maquinas/${m.slug}/">${rec(m)}<b>${esc(m.nome)}</b><small>${m.resumo}</small></a>`).join('')}</div></div>`).join('')}
  </div>
</div></section>

<section class="sec fora"><div class="in">
  <header class="tit-b"><span class="num">02</span><div><h2>Além da linha de móveis</h2><p>Duas linhas para quem faz esquadrias e para quem plastifica cabos e perfis.</p></div></header>
  <div class="fora-grade">${['perfuradoras', 'extrusoras'].map(s => { const l = linha(s), ms = daLinha(s); return `<article class="fora-item"><div class="fora-img">${rec(ms[ms.length - 1])}</div><div><h3>${l.nome}</h3><p class="eti">${l.sub}</p><p>${s === 'perfuradoras' ? 'A máquina que começou a história da CVL em 1980. Fura montantes para portas e janelas em veneziana, japonesa, portuguesa e chinesa.' : 'Revestimento em polietileno, liso ou estriado, em perfis redondos: cabos de vassoura, componentes de berços infantis e outros.'}</p><ul>${ms.map(m => `<li><a href="/b/maquinas/${m.slug}/">${esc(m.nome)}</a> ${m.resumo}</li>`).join('')}</ul></div></article>`; }).join('')}</div>
</div></section>

<section class="sec comp"><div class="in">
  <header class="tit-b"><span class="num">03</span><div><h2>Qual seccionadora?</h2><p>As cinco seccionadoras CVL lado a lado, com os dados das fichas técnicas.</p></div></header>
  <div class="tab-rola"><table class="tab-comp"><thead><tr><th scope="col"><span class="sr">Item</span></th>${comp.map(m => `<th scope="col"><a href="/b/maquinas/${m.slug}/">${rec(m, '', 640, 420)}<span>${esc(m.nome)}</span></a></th>`).join('')}</tr></thead>
  <tbody>${compLinhas.map(([r, vs]) => `<tr><th scope="row">${r}</th>${vs.map(x => `<td>${x || '<span class="tr">·</span>'}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
</div></section>

<section class="faixa-num"><div class="in"><dl><div><dt>Fundada em</dt><dd>1979</dd></div><div><dt>Área fabril em Anchieta</dt><dd>21.000 m²</dd></div><div><dt>Modelos de máquinas</dt><dd>+30</dd></div><div><dt>Representantes</dt><dd>${representantes.length}</dd></div></dl></div></section>

<section class="sec reps-b"><div class="in reps-b-grade">
  <div><header class="tit-b"><span class="num">04</span><div><h2>Atendimento perto da sua fábrica</h2><p>Representantes no Sul, Sudeste e Nordeste, e a fábrica atende direto.</p></div></header>
  <p class="acoes"><a class="btn btn-azul" href="/b/representantes/">Encontrar representante ${ic('seta')}</a><a class="btn btn-linha" href="${orcLink('b')}">Pedir orçamento</a></p></div>
  <ul class="uf-lista">${ufs.map(([uf, n]) => `<li><a href="/b/representantes/#uf-${uf.toLowerCase()}"><b>${uf}</b><span>${n}</span><small>${(n => `${n} ${n > 1 ? 'representantes' : 'representante'}`)(representantes.filter(r => r.uf === uf).length)}</small></a></li>`).join('')}</ul>
</div></section>`);

B.maquinas = () => pagina('b', 'maquinas', 'maquinas/', 'Catálogo técnico · CVL Máquinas', 'Todas as máquinas CVL em uma lista: linha, aplicação e dimensões de cada modelo.', `
<section class="cab-b"><div class="in"><p class="trilha"><a href="/b/">Início</a> / Máquinas</p><h1>Catálogo técnico</h1><p>${maquinas.length} máquinas em ${linhas.length} linhas. Filtre pela etapa da produção ou procure pelo nome do modelo.</p></div></section>
<section class="sec cat-b"><div class="in">
  <div class="cat-ferr"><div class="filtro-linha" role="group" aria-label="Filtrar por linha"><button type="button" data-linha-f="" aria-pressed="true">Todas</button>${linhas.map(l => `<button type="button" data-linha-f="${l.slug}" aria-pressed="false">${l.nome}</button>`).join('')}</div>
  <label class="busca">${ic('busca')}<span class="sr">Procurar máquina</span><input type="search" data-busca-maq placeholder="Procurar: Máxima, LVB, NR 12..."></label></div>
  <ul class="cat-lista">${maquinas.map(m => `<li data-linha="${m.linha}" data-txt="${esc((m.nome + ' ' + linha(m.linha).nome + ' ' + m.resumo + ' ' + m.carac.join(' ')).toLowerCase())}"><a href="/b/maquinas/${m.slug}/">
    <span class="cl-img">${rec(m)}</span><span class="cl-linha">${nomeLinhaSing[m.linha]}</span><b class="cl-nome">${esc(m.nome)}</b><span class="cl-res">${m.resumo}</span><span class="cl-dim">${medidaCurta(m)}</span>${ic('seta', 'ic cl-seta')}</a></li>`).join('')}</ul>
  <p class="sem-res" data-sem-res hidden>Nenhuma máquina encontrada. <a href="${orcLink('b')}">Conte o que você precisa</a> que a CVL indica o modelo.</p>
</div></section>`);

B.maquina = m => {
  const l = linha(m.linha), irmas = daLinha(m.linha).filter(x => x !== m), etapa = fluxo.findIndex(f => f.linha === m.linha);
  return pagina('b', 'maquina', `maquinas/${m.slug}/`, `${m.nome} · ${nomeLinhaSing[m.linha]} · CVL Máquinas`, `${nomeLinhaSing[m.linha]} ${m.nome}: ${m.resumo}`, `
<section class="ficha-cab"><div class="in">
  <p class="trilha"><a href="/b/">Início</a> / <a href="/b/maquinas/">Catálogo</a> / <a href="/b/maquinas/?linha=${l.slug}">${l.nome}</a> / ${esc(m.nome)}</p>
  <div class="fc-grade">
    <div class="fc-img"><span class="fc-cod">CVL · ${esc(m.nome.toUpperCase())}</span>${rec(m, '', 640, 420, false)}${cotas(m)}</div>
    <div class="fc-txt"><p class="eti">${nomeLinhaSing[m.linha]}${etapa >= 0 ? ` · etapa ${etapa + 1}, ${fluxo[etapa].passo.toLowerCase()}` : ''}</p><h1>${esc(m.nome)}</h1><p class="fc-res">${m.resumo}</p>
      ${m.aplicacao.map(p => `<p>${p}</p>`).join('')}
      <p class="acoes"><a class="btn btn-am" href="${orcLink('b', m)}">Pedir orçamento</a><a class="btn btn-claro" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></p></div>
  </div>
</div></section>
<section class="sec ficha-b"><div class="in fb-grade">
  <div><h2 class="fb-tit">Ficha técnica</h2><ol class="fb-lista">${m.carac.map(c => `<li>${c}</li>`).join('')}</ol>
  ${m.opcionais ? `<h3 class="fb-tit2">Opcionais</h3><ul class="fb-opc">${m.opcionais.map(c => `<li>${c}</li>`).join('')}</ul>` : ''}</div>
  <div><h2 class="fb-tit">Dimensões</h2>${dimensoes(m)}
  ${m.fotos.length > 1 ? `<h2 class="fb-tit">Detalhes</h2><div class="fb-fotos">${m.fotos.map((f, i) => `<button type="button" data-zoom="/assets/img/maq/${m.slug}-${i + 1}.webp" data-leg="${esc(m.legendas[i])}">${foto(m, i)}<span>${m.legendas[i]}</span></button>`).join('')}</div>` : `<h2 class="fb-tit">Foto</h2><div class="fb-fotos um"><button type="button" data-zoom="/assets/img/maq/${m.slug}-1.webp" data-leg="${esc(m.legendas[0])}">${foto(m, 0)}<span>${m.legendas[0]}</span></button></div>`}</div>
</div></section>
${irmas.length ? `<section class="sec irmas-b"><div class="in"><h2 class="fb-tit">Mesma linha</h2><ul class="cat-lista curta">${irmas.map(x => `<li><a href="/b/maquinas/${x.slug}/"><span class="cl-img">${rec(x)}</span><span class="cl-linha">${nomeLinhaSing[x.linha]}</span><b class="cl-nome">${esc(x.nome)}</b><span class="cl-res">${x.resumo}</span><span class="cl-dim">${medidaCurta(x)}</span>${ic('seta', 'ic cl-seta')}</a></li>`).join('')}</ul></div></section>` : ''}`);
};

B.empresa = () => pagina('b', 'empresa', 'empresa/', 'Empresa · CVL Máquinas', 'A história da CVL Máquinas: de oficina de consertos em 1979 a fábrica de 21.000 m² em Anchieta (SC).', `
<section class="cab-b"><div class="in"><p class="trilha"><a href="/b/">Início</a> / Empresa</p><h1>Uma história feita de trabalho, dedicação e sucesso</h1><p>Sempre sob a direção dos irmãos Célio e Joel Lago.</p></div></section>
<section class="sec"><div class="in emp-b">
  <ol class="tempo-b">${marcos.map((m, i) => `<li><b>${m.ano}</b><div><h2>${m.titulo}</h2><p>${historia[Math.min(i, historia.length - 1)]}</p></div></li>`).join('')}</ol>
  <aside class="emp-lado"><figure><img src="/assets/img/fabrica.webp" alt="Vista aérea da fábrica da CVL Máquinas em Anchieta, SC" width="400" height="267" loading="lazy"><figcaption>Parque Industrial de Anchieta (SC), 21.000 m²</figcaption></figure><p>${historia[6]}</p></aside>
</div></section>
<section class="faixa-num"><div class="in mvv-b"><div><h2>Missão</h2><p>${missao}</p></div><div><h2>Visão</h2><p>${visao}</p></div><div><h2>Valores</h2><p>${valores.join(', ')}.</p></div></div></section>`);

B.representantes = () => pagina('b', 'representantes', 'representantes/', 'Representantes · CVL Máquinas', 'Encontre o representante CVL Máquinas da sua região: RS, SC, PR, ES, MG e Nordeste.', `
<section class="cab-b"><div class="in"><p class="trilha"><a href="/b/">Início</a> / Representantes</p><h1>Representantes</h1><p>Escolha a região. Quem tem WhatsApp abre a conversa direto.</p></div></section>
<section class="sec"><div class="in">${repFiltro()}${repLista('b')}
<div class="rep-fab"><p><b>Não encontrou a sua região?</b> A fábrica atende direto de Anchieta (SC).</p><p><a class="btn btn-azul" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a> <a class="btn btn-linha" href="mailto:${E.email}">${ic('mail')} ${E.email}</a></p></div></div></section>`);

B.contato = () => pagina('b', 'contato', 'contato/', 'Contato · CVL Máquinas', 'Peça orçamento à CVL Máquinas: (49) 3653-3900, cvl@cvlmaquinas.com.br, Anchieta (SC).', `
<section class="cab-b"><div class="in"><p class="trilha"><a href="/b/">Início</a> / Contato</p><h1>Contato e orçamento</h1><p>Diga o que a sua fábrica produz e a CVL indica a máquina certa.</p></div></section>
<section class="sec" id="orcamento"><div class="in contato-b">
  <div class="cb-form">${formOrcamento('b')}</div>
  <aside class="cb-lado"><h2>${E.razao}</h2><p>${ic('pin')} ${E.endereco.join('<br>')}</p><p>${ic('tel')} <a href="tel:${E.foneHref}">${E.fone}</a></p><p>${ic('mail')} <a href="mailto:${E.email}">${E.email}</a></p>
  <h3>Como comprar</h3><ul><li><a href="${E.bndes}" target="_blank" rel="noopener">Cartão BNDES</a></li><li><a href="${E.proger}" target="_blank" rel="noopener">Proger, Banco do Brasil</a></li><li><a href="/b/representantes/">Representantes</a></li></ul></aside>
</div></section>
<section class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa: CVL Máquinas em Anchieta, SC" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`);

export function gerarVersao(v) {
  const P = v === 'a' ? A : B, out = {};
  for (const n of nav) out[n.caminho.replace(/\/$/, '') || 'index'] = P[n.slug]();
  for (const m of maquinas) out[`maquinas/${m.slug}`] = P.maquina(m);
  return out;
}
