// Gera clientes/engetools/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/engetools/_origem/gerar.mjs
// A "Arco": clara, o arco laranja do logo atravessa as seções e liga as etapas. B "Bancada": topo laranja em gradiente,
// ficha técnica, catálogo em abas e etapas numeradas sobre uma linha de percurso de ferramenta.
import fs from 'node:fs';
import path from 'node:path';
import { empresa as E, textos as T, categorias as CAT, produtos as PROD } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const DIM = {
  'fresa-topo': [500, 470], 'fresas-azuis': [700, 700], 'fresas-cobre': [700, 649], 'fresas-grupo': [625, 400],
  'anel-abrasivo': [326, 440], 'rebolos-diamantados': [546, 406], 'rebolo-interno': [518, 380], 'rolo-diamantado': [424, 316],
  'grafite-cadinho': [740, 560], 'grafite-tarugos': [740, 561], 'grafite-placas': [740, 558],
  'fresa-4cortes-azul': [900, 345], 'fresa-2cortes-azul': [900, 345], 'fresa-esferica-azul': [900, 345], 'fresa-micro-esferica-azul': [900, 345],
  'fresa-conica-azul': [900, 346], 'fresa-desbaste-cobre': [900, 345],
};
const foto = (src, alt, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${DIM[src][0]}" height="${DIM[src][1]}" loading="lazy" decoding="async"${extra}>`;
const ja = ' fetchpriority="high" loading="eager"';
export const nomesVersao = { a: 'Arco', b: 'Bancada' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'A Empresa', caminho: 'empresa/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  doc: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
// O arco do logo: a faixa laranja que passa por cima do nome, mais grossa no meio e fina nas pontas.
const arco = (cls = 'arco') => `<svg class="${cls}" viewBox="0 0 1000 260" preserveAspectRatio="none" aria-hidden="true"><path d="M0 250C140 70 420 8 640 10c170 2 300 50 360 120-90-50-210-78-360-80C430 48 190 110 0 250z"/></svg>`;

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
<meta name="theme-color" content="${v === 'a' ? '#FFFFFF' : '#E5600F'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500;700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const link = (v, n, atual) => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`;
const logo = (w = 200, cor = '') => `<img src="/assets/logo${cor}.webp" alt="Engetools" width="${w}" height="${Math.round(w * (cor ? 329 : 339) / 1000)}">`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, atual) {
  if (v === 'a') return `<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="Engetools, início">${logo(170)}</a>
  <nav id="menu" class="menu" aria-label="Principal">${nav.map(n => link(v, n, atual)).join('')}
    <a class="btn btn-peq" href="/a/contato/">Faça sua consulta</a></nav>
  ${menuBtn}
</div></header>`;
  return `<div class="faixa"><div class="in"><span>${ic('pin')} ${E.cidade} · ${E.uf} · desde ${E.fundacao}</span><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Engetools, início">${logo(160)}</a>
  <nav id="menu" class="menu" aria-label="Principal">${nav.map(n => link(v, n, atual)).join('')}</nav>
  <a class="topo-fone" href="tel:${E.foneHref}"><small>Vendas</small>${E.fone}</a>
  ${menuBtn}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(190, '-branco')}<p>Comércio, importação, representação e assistência técnica em ferramentas de usinagem desde ${E.fundacao}.</p></div>
  <div><h3>Contato</h3><p><a href="tel:${E.foneHref}">${E.fone}</a><br><a href="tel:${E.fone2Href}">${E.fone2}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
  <div><h3>Endereço</h3><p>${E.endereco}<br>${E.bairro}, ${E.cidade}/${E.uf}<br>CEP ${E.cep}</p><p><a class="link" href="${E.mapa}" target="_blank" rel="noopener">Ver no mapa ${ic('seta')}</a></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${nav.map(n => link(v, n, '')).join('')}</nav>
</div>
<p class="rod-fim">© ${E.razao} · ${E.cidade}/${E.uf}</p></footer>`;
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
const formContato = () => `<form class="form" id="form" data-form>
  <div class="campos">
    <label>Nome<input name="Nome" autocomplete="name" required></label>
    <label>Empresa<input name="Empresa" autocomplete="organization"></label>
    <label>Telefone<input name="Telefone" type="tel" autocomplete="tel" required></label>
    <label>E-mail<input name="E-mail" type="email" autocomplete="email" required></label>
    <label class="largo">Assunto<select name="Assunto"><option>Ferramentas de corte (metal duro / HSS)</option><option>Abrasivos e ferramentas diamantadas</option><option>Grafite e carvão</option><option>Ferramenta especial ou recuperação</option><option>Usinagem, automação ou melhoria de processo</option><option>Outros assuntos</option></select></label>
    <label class="largo">Mensagem<textarea name="Mensagem" rows="5" placeholder="Material da peça, operação, máquina, quantidade..." required></textarea></label>
  </div>
  <button class="btn" type="submit">Enviar consulta ${ic('seta')}</button>
  <p class="form-ok" role="status" hidden>Consulta pronta. Nesta prévia o envio está desligado; no site no ar ela chega direto no e-mail de vendas. Enquanto isso, ligue <a href="tel:${E.foneHref}">${E.fone}</a>.</p>
</form>`;

const mapa = () => `<div class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa: Engetools na Rua Independência, 129, São Leopoldo" loading="lazy"></iframe></div>`;

const contatoInfo = () => `<ul class="info-lista">
  <li>${ic('tel')}<span><small>Telefones</small><a href="tel:${E.foneHref}">${E.fone}</a> · <a href="tel:${E.fone2Href}">${E.fone2}</a></span></li>
  <li>${ic('mail')}<span><small>Vendas</small><a href="mailto:${E.email}">${E.email}</a></span></li>
  <li>${ic('mail')}<span><small>Geral</small><a href="mailto:${E.email2}">${E.email2}</a></span></li>
  <li>${ic('pin')}<span><small>Endereço</small>${E.endereco}, ${E.bairro}, ${E.cidade}/${E.uf}, CEP ${E.cep}</span></li>
</ul>`;

const etapasArco = () => `<ol class="etapas-arco">${T.etapas.map((e, i) => `<li style="--i:${i}"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>`;

// ---------- vitrine de produtos ----------
const catNome = slug => CAT.find(c => c.slug === slug).nome;
const orc = (v, p) => `/${v}/contato/?produto=${encodeURIComponent(p.nome)}&amp;cat=${p.cat}#form`;
const tags = p => `<ul class="tags">${p.tags.map(t => `<li>${t}</li>`).join('')}</ul>`;
const itemA = (v, p) => `<article class="item" data-cat="${p.cat}"><figure>${foto(p.foto, p.nome)}</figure>
  <div class="item-txt"><span class="item-cat">${catNome(p.cat)}</span><h3>${p.nome}</h3><p>${p.uso}</p>${tags(p)}</div>
  <a class="item-btn" href="${orc(v, p)}">${ic('doc')} Pedir orçamento</a></article>`;
const linhaB = (v, p) => `<li class="linha-prod"><figure>${foto(p.foto, p.nome)}</figure>
  <div><h3>${p.nome}</h3><p>${p.uso}</p>${tags(p)}</div>
  <div class="linha-acoes"><a class="btn btn-peq" href="${orc(v, p)}">Pedir orçamento</a><a class="link" href="tel:${E.foneHref}">${ic('tel')} Ligar</a></div></li>`;
const sobDesenho = v => `<section class="sob"><div class="in">
  <figure>${foto('fresas-grupo', 'Conjunto de fresas de metal duro')}</figure>
  <div><p class="eyebrow">Não achou a sua ferramenta?</p><h2>Fazemos sob desenho</h2><p>Ferramentas especiais em metal duro ou HSS, diamantadas e recuperação das que você já tem. Mande o desenho da peça ou da ferramenta.</p>
  <a class="btn" href="/${v}/contato/?cat=especiais#form">Enviar desenho ${ic('seta')}</a></div>
</div></section>`;

// ================= versão A: Arco =================
const capaA = (sobre, titulo, sub) => `<section class="capa"><div class="in"><p class="eyebrow">${sobre}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${arco()}</section>`;

const ctaA = () => `<section class="cta"><div class="in">
  <div><h2>Faça sua consulta</h2><p>Mande a peça, o desenho ou o problema do processo. Respondemos com a ferramenta indicada e o prazo.</p></div>
  <div class="cta-acoes"><a class="btn btn-branco" href="/a/contato/">Enviar consulta ${ic('seta')}</a><a class="cta-fone" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div>
</div></section>`;

const homeA = () => `<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">Fresas e ferramentas de usinagem · desde ${E.fundacao}</p>
    <h1>Fresas de metal duro e abrasivos para a sua produção</h1>
    <p>Fresas de topo, esféricas, cônicas e de desbaste, rebolos diamantados e grafite, para máquinas CNC e convencionais. Peça o orçamento e receba a indicação técnica junto.</p>
    <div class="acoes"><a class="btn" href="/a/produtos/">Ver produtos ${ic('seta')}</a><a class="link" href="/a/contato/#form">Pedir orçamento ${ic('seta')}</a></div>
  </div>
  <div class="hero-foto">${arco('arco arco-hero')}${foto('fresas-azuis', 'Fresas de topo em metal duro com revestimento azul', ja)}</div>
</div></section>
<section class="faixa-atuacao"><div class="in"><span class="ano"><b>${E.fundacao}</b>fundação</span><ul>${T.atuacao.map(a => `<li>${a}</li>`).join('')}</ul></div></section>
<section class="cats"><div class="in">
  <div class="tit"><p class="eyebrow">Produtos</p><h2>Escolha pela linha</h2></div>
  <div class="cats-grade">${CAT.map(c => `<a class="cat" href="/a/produtos/?cat=${c.slug}#vitrine"><figure>${foto(c.foto, c.nome)}</figure><div><h3>${c.nome}</h3><p>${c.texto}</p><span class="cat-n">${PROD.filter(p => p.cat === c.slug).length} itens ${ic('seta')}</span></div></a>`).join('')}</div>
</div></section>
<section class="destaques"><div class="in">
  <div class="tit-linha"><div><p class="eyebrow">Mais procuradas</p><h2>Fresas de metal duro</h2></div><a class="link" href="/a/produtos/?cat=fresas#vitrine">Ver todas as fresas ${ic('seta')}</a></div>
  <div class="vitrine">${PROD.filter(p => p.destaque).map(p => itemA('a', p)).join('')}</div>
</div></section>
${sobDesenho('a')}
<section class="servicos-a"><div class="in">
  <div class="tit tit-claro"><p class="eyebrow">Serviços</p><h2>Além de vender, a gente desenvolve</h2></div>
  <div class="serv-tres">${T.servicos.slice(0, 3).map(s => `<a class="serv" href="/a/servicos/#${s.slug}"><figure>${foto(s.foto, s.titulo)}</figure><h3>${s.titulo}</h3><p>${s.texto}</p></a>`).join('')}</div>
  <p class="centro"><a class="link link-claro" href="/a/servicos/">Todos os serviços ${ic('seta')}</a></p>
</div></section>
<section class="processo-a"><div class="in">
  <div class="tit"><p class="eyebrow">Como funciona</p><h2>Do orçamento à ferramenta na máquina</h2></div>
  ${arco('arco arco-linha')}${etapasArco()}
</div></section>
${ctaA()}`;

const empresaA = () => `${capaA('A Empresa', `Ferramentas de usinagem desde ${E.fundacao}`, `${E.razao}, em ${E.cidade}, ${E.regiao}.`)}
<section class="sobre"><div class="in">
  <div class="sobre-txt">${T.sobre.map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="sobre-foto">${foto('fresas-grupo', 'Conjunto de fresas de metal duro')}</figure>
</div></section>
<section class="faixa-atuacao"><div class="in"><span class="ano"><b>${E.fundacao}</b>fundação</span><ul>${T.atuacao.map(a => `<li>${a}</li>`).join('')}</ul></div></section>
<section class="missao-a"><div class="in"><p class="eyebrow">Missão</p><blockquote>${T.missao}</blockquote></div></section>
<section class="difs"><div class="in">
  <div class="tit"><p class="eyebrow">Por que a Engetools</p><h2>Eficiência, agilidade e controle de qualidade</h2><p>${T.destaque}</p></div>
  <ol class="difs-lista">${T.diferenciais.map((d, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><h3>${d.t}</h3><p>${d.d}</p></li>`).join('')}</ol>
</div></section>
${ctaA()}`;

const produtosA = () => `${capaA('Produtos', 'Fresas, abrasivos e grafite', 'Escolha o item e peça o orçamento. A equipe técnica confirma a medida e a ferramenta certa para a sua operação.')}
<section class="catalogo-a" id="vitrine"><div class="in">
  <div class="chips" role="group" aria-label="Filtrar por linha" data-filtro><button type="button" aria-pressed="true" data-cat="">Todos <small>${PROD.length}</small></button>${CAT.map(c => `<button type="button" aria-pressed="false" data-cat="${c.slug}">${c.curto} <small>${PROD.filter(p => p.cat === c.slug).length}</small></button>`).join('')}</div>
  <div class="vitrine" data-vitrine>${PROD.map(p => itemA('a', p)).join('')}</div>
</div></section>
${sobDesenho('a')}
${ctaA()}`;

const servicosA = () => `${capaA('Serviços', 'Engenharia de ferramentas e de processo', 'Desenvolvimento, fabricação, recuperação e melhoria do seu processo de usinagem.')}
<section class="serv-lista"><div class="in">${T.servicos.map((s, i) => `<article id="${s.slug}" class="serv-item${i % 2 ? ' inv' : ''}"><figure>${foto(s.foto, s.titulo)}</figure><div><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${s.titulo}</h2><p>${s.texto}</p></div></article>`).join('')}</div></section>
<section class="processo-a"><div class="in">
  <div class="tit"><p class="eyebrow">Como funciona</p><h2>Da consulta à ferramenta na máquina</h2></div>
  ${arco('arco arco-linha')}${etapasArco()}
</div></section>
${ctaA()}`;

const contatoA = () => `${capaA('Contato', 'Faça sua consulta', 'Conte o que você usina e qual o problema. Respondemos com a solução e o custo-benefício.')}
<section class="contato"><div class="in">
  <div>${contatoInfo()}${mapa()}</div>
  ${formContato()}
</div></section>`;

// ================= versão B: Bancada =================
const capaB = (sobre, titulo, sub) => `<section class="capa"><div class="in"><p class="eyebrow">${sobre}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

const ficha = () => `<dl class="ficha">
  <div><dt>Fundação</dt><dd>${E.fundacao}</dd></div>
  <div><dt>Sede</dt><dd>${E.cidade}/${E.uf}</dd></div>
  <div><dt>Materiais</dt><dd>Metal duro · HSS</dd></div>
  <div><dt>Abrasivos</dt><dd>Convencionais e diamantados</dd></div>
  <div><dt>Atuação</dt><dd>${T.atuacao.join(' · ')}</dd></div>
</dl>`;

const abasB = () => `<div class="abas" data-abas>
  <div class="abas-lista" role="tablist" aria-label="Linhas de produto">${CAT.map((c, i) => `<button role="tab" id="t-${c.slug}" aria-controls="p-${c.slug}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><b>${PROD.filter(p => p.cat === c.slug).length}</b>${c.nome}</button>`).join('')}</div>
  ${CAT.map((c, i) => `<div class="aba" role="tabpanel" id="p-${c.slug}" aria-labelledby="t-${c.slug}"${i ? ' hidden' : ''}>
    <ul class="lista-prod">${PROD.filter(p => p.cat === c.slug).slice(0, 4).map(p => linhaB('b', p)).join('')}</ul>
    <p class="ver-todos"><a class="link" href="/b/produtos/#${c.slug}">Ver toda a linha ${c.curto.toLowerCase()} ${ic('seta')}</a></p>
  </div>`).join('')}
</div>`;

const trilhaB = () => `<section class="trilha"><div class="in">
  <div class="tit"><p class="eyebrow">Como funciona</p><h2>Da consulta à ferramenta na máquina</h2></div>
  <div class="trilha-caixa"><svg class="trilha-linha" viewBox="0 0 1000 12" preserveAspectRatio="none" aria-hidden="true"><path d="M0 6H1000"/></svg>
  <ol>${T.etapas.map((e, i) => `<li><span class="n">${i + 1}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol></div>
</div></section>`;

const ctaB = () => `<section class="cta"><div class="in">
  <h2>Tem uma peça difícil de usinar?</h2>
  <p>Mande o desenho ou descreva a operação. A equipe técnica indica a ferramenta e o custo-benefício.</p>
  <div class="cta-acoes"><a class="btn btn-escuro" href="/b/contato/">Faça sua consulta ${ic('seta')}</a><a class="btn btn-contorno-claro" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div>
</div></section>`;

const homeB = () => `<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">Engetools · ${E.cidade}/${E.uf}</p>
    <h1>Fresas e ferramentas de usinagem com orçamento rápido</h1>
    <p>Fresas de metal duro de topo reto, esféricas, cônicas e de desbaste. Rebolos diamantados, grafite e ferramentas especiais. Desde ${E.fundacao}.</p>
    <div class="acoes"><a class="btn btn-escuro" href="/b/produtos/">Ver catálogo ${ic('seta')}</a><a class="btn btn-contorno-claro" href="/b/contato/#form">Pedir orçamento</a></div>
  </div>
  <figure class="hero-foto">${foto('fresas-grupo', 'Conjunto de fresas de metal duro', ja)}</figure>
</div></section>
<section class="ficha-sec"><div class="in">${ficha()}</div></section>
<section class="catalogo"><div class="in">
  <div class="tit"><p class="eyebrow">Catálogo</p><h2>Escolha a linha e peça o orçamento</h2></div>
  ${abasB()}
</div></section>
${sobDesenho('b')}
${trilhaB()}
<section class="serv-grade"><div class="in">
  <div class="tit"><p class="eyebrow">Serviços</p><h2>Desenvolvimento, fabricação e recuperação</h2></div>
  <ul>${T.servicos.map((s, i) => `<li><a href="/b/servicos/#${s.slug}"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${s.titulo}</h3><p>${s.texto}</p>${ic('seta', 'ic seta')}</a></li>`).join('')}</ul>
</div></section>
<section class="sobre-b"><div class="in">
  <figure>${foto('fresas-cobre', 'Fresas de topo em metal duro com revestimento cobre')}</figure>
  <div><p class="eyebrow">A Empresa</p><h2>Assistência técnica de quem entende de usinagem</h2><p>${T.sobre[0]}</p><p>${T.sobre[2]}</p><a class="link" href="/b/empresa/">Sobre a Engetools ${ic('seta')}</a></div>
</div></section>
${ctaB()}`;

const empresaB = () => `${capaB('A Empresa', `${E.razao}`, `Fundada em ${E.fundacao}, em ${E.cidade}, ${E.regiao}.`)}
<section class="ficha-sec"><div class="in">${ficha()}</div></section>
<section class="sobre-b"><div class="in">
  <figure>${foto('fresa-topo', 'Fresa de topo de desbaste')}</figure>
  <div>${T.sobre.map(p => `<p>${p}</p>`).join('')}</div>
</div></section>
<section class="missao-b"><div class="in"><div><p class="eyebrow">Missão</p><p class="grande">${T.missao}</p></div>
  <ul>${T.diferenciais.map(d => `<li><h3>${d.t}</h3><p>${d.d}</p></li>`).join('')}</ul></div></section>
${ctaB()}`;

const produtosB = () => `${capaB('Catálogo', 'Fresas, abrasivos e grafite', 'Escolha o item e peça o orçamento. Confirmamos medida, revestimento e prazo com você.')}
<nav class="ancoras" aria-label="Linhas"><div class="in">${CAT.map(c => `<a href="#${c.slug}">${c.nome} <b>${PROD.filter(p => p.cat === c.slug).length}</b></a>`).join('')}</div></nav>
${CAT.map(c => `<section class="prod-b" id="${c.slug}"><div class="in">
  <header><h2>${c.nome}</h2><p>${c.texto}</p></header>
  <ul class="lista-prod">${PROD.filter(p => p.cat === c.slug).map(p => linhaB('b', p)).join('')}</ul>
</div></section>`).join('')}
${sobDesenho('b')}
${ctaB()}`;

const servicosB = () => `${capaB('Serviços', 'Engenharia de ferramentas e de processo', 'Da ferramenta especial à automação da sua linha.')}
<section class="serv-b"><div class="in">${T.servicos.map((s, i) => `<article id="${s.slug}"><span class="n">${String(i + 1).padStart(2, '0')}</span><figure>${foto(s.foto, s.titulo)}</figure><div><h2>${s.titulo}</h2><p>${s.texto}</p></div></article>`).join('')}</div></section>
${trilhaB()}
${ctaB()}`;

const contatoB = () => `${capaB('Contato', 'Faça sua consulta', 'Telefone, e-mail ou formulário. Atendimento técnico em São Leopoldo e região.')}
<section class="contato"><div class="in">
  ${formContato()}
  <div>${contatoInfo()}${mapa()}</div>
</div></section>`;

const P = {
  a: { index: homeA, empresa: empresaA, produtos: produtosA, servicos: servicosA, contato: contatoA },
  b: { index: homeB, empresa: empresaB, produtos: produtosB, servicos: servicosB, contato: contatoB },
};
const meta = {
  index: ['Engetools Ferramentas · Ferramentas de usinagem em São Leopoldo/RS', 'Ferramentas de corte em metal duro e HSS, abrasivos convencionais e diamantados, ferramentas especiais e recuperação. Desde 1999.'],
  empresa: ['A Empresa · Engetools Ferramentas', 'Engetools Comércio e Representações: comércio, importação, representação e assistência técnica em ferramentas de usinagem desde 1999.'],
  produtos: ['Produtos · Engetools Ferramentas', 'Fresas de metal duro de topo reto, esféricas, cônicas e de desbaste, rebolos diamantados, grafite e ferramentas especiais. Peça o orçamento.'],
  servicos: ['Serviços · Engetools Ferramentas', 'Ferramentas especiais e diamantadas, recuperação de ferramentas, usinagem para terceiros, automação e melhoria de processos.'],
  contato: ['Contato · Engetools Ferramentas', `Rua Independência, 129, sala 202, São Leopoldo/RS. ${E.fone} · ${E.email}`],
};

for (const v of ['a', 'b']) {
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const n of nav) {
    const dir = path.join(pub, v, n.caminho);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), pagina(v, n.slug, n.caminho, ...meta[n.slug], P[v][n.slug]()));
  }
  console.log(`engetools: versão ${v.toUpperCase()}, ${nav.length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#E5600F', fundo: '#24272B', claro: '#F6F4F1',
  fonteTitulo: 'Ubuntu,system-ui,sans-serif', fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@500;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara e comercial: a home abre com as fresas, cada uma com foto e botão "Pedir orçamento". O arco laranja do logo atravessa as páginas. Empresa e serviços em estilo industrial.', pontos: ['Vitrine das fresas de metal duro, uma a uma', 'Catálogo com filtro: fresas, especiais, abrasivos e grafite', 'Pedido de orçamento já vem preenchido com o produto'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Topo laranja e catálogo técnico em lista, para o comprador que já sabe o que quer: nome, uso, características e botões de orçamento e ligação em cada item.', pontos: ['Catálogo em abas por linha logo na home', 'Ficha da empresa: fundação, sede, materiais e atuação', 'Telefone de vendas sempre no topo'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('engetools: escolha em public/index.html');
