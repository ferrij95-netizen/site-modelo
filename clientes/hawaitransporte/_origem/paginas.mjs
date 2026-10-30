// Monta as páginas das versões A ("Faixa Roxa", fiel ao site atual: topo branco com o logo no círculo, foto da cegonha
// com o formulário roxo por cima, faixa roxa com a frase, galeria no azul-marinho e rodapé roxo) e B ("Estrada", mais
// nova: foto cheia, cotação rápida, diferenciais sobre a estrada do logo, mapa com as duas bases e galeria em mosaico).
// Estilos em public/assets/{base,a,b}.css.
import fs from 'node:fs';
import path from 'node:path';
import { empresa as E, unidades, historia, pilares, segmentos, etapas, galeria, ufs } from './conteudo.mjs';

const mapaDados = JSON.parse(fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), 'mapa.json'), 'utf8'));

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const telHref = t => `+55${t.replace(/\D/g, '')}`;
const wa = (msg = '') => `https://wa.me/${E.whatsapp}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;
const [FOR, GRU] = unidades;

export const nomesVersao = { a: 'Faixa Roxa', b: 'Estrada' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'A empresa', caminho: 'empresa/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'frota', nome: 'Frota', caminho: 'frota/' },
  { slug: 'contato', nome: 'Onde estamos', caminho: 'contato/' },
];
const link = (v, slug) => `/${v}/${slug === 'index' ? '' : `${slug}/`}`;

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fechar: '<path d="M6 6l12 12M18 6L6 18"/>',
  sat: '<path d="M4 20a16 16 0 0116-16"/><path d="M8 20a12 12 0 0112-12"/><path d="M12 20a8 8 0 018-8"/><circle cx="18" cy="18" r="2"/>',
  caminhao: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  galpao: '<path d="M3 21V9l9-5 9 5v12"/><path d="M7 21v-8h10v8M7 17h10"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const icWa = (cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 11.9 11.9 0 004.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>`;

// ---------- moldura ----------
function head(v, slug, titulo, descricao) {
  const url = `${E.url}${link(v, slug).slice(1)}`;
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
<meta property="og:site_name" content="${esc(E.razao)}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#3a3582' : '#0b2a55'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=Lato:ital,wght@0,400;0,700;1,700&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>
<body class="v-${v} pg-${slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
`;
}

const menu = (v, slug) => nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('');
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnCotar = (v, cls = '') => `<a class="btn btn-cotar ${cls}" href="${link(v, 'cotacao')}">Fazer cotação</a>`;

function topo(v, slug) {
  if (v === 'a') return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="/a/" aria-label="Hawai Transportes, página inicial"><span class="marca-circ"><img src="/assets/logo.svg" alt="Hawai Transportes de Veículos LTDA" width="1266" height="1171"></span></a>
    <nav id="menu" aria-label="Principal"><ul>${menu(v, slug)}<li class="so-cel">${btnCotar(v)}</li></ul></nav>
    <div class="topo-tels">
      <a href="tel:${telHref(FOR.fixos[0])}"><span>Fortaleza - CE:</span> ${FOR.fixos[0]}</a>
      <a href="tel:${telHref(GRU.fixos[0])}"><span>São Paulo - SP:</span> ${GRU.fixos[0]}</a>
    </div>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="/b/" aria-label="Hawai Transportes, página inicial"><img src="/assets/logo.svg" alt="Hawai Transportes de Veículos LTDA" width="1266" height="1171"></a>
    <nav id="menu" aria-label="Principal"><ul>${menu(v, slug)}</ul></nav>
    <a class="topo-wa" href="${wa()}" target="_blank" rel="noopener">${icWa()}<span>(85) 9 9903 0753</span></a>
    ${btnCotar(v, 'topo-cotar')}
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}

function unidadeTexto(u) {
  const tels = [...u.fixos, ...u.celulares].map(t => `<a href="tel:${telHref(t)}">${t}</a>`).join('');
  return `<address>
    <strong>${u.titulo}</strong>
    <span>${u.endereco}</span>
    <span>CEP ${u.cep}${u.complemento ? ` · ${u.complemento}` : ''}</span>
  </address>
  <p class="tels">${tels}</p>`;
}

function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca">
      <img src="/assets/logo-branco.svg" alt="Hawai Transportes de Veículos LTDA" width="1266" height="1171" loading="lazy">
      <p>${E.frase}.</p>
      <p class="rod-redes"><a href="${E.instagram}" target="_blank" rel="noopener">${ic('insta')}${E.instagramNome}</a><a href="${wa()}" target="_blank" rel="noopener">${icWa()}WhatsApp</a></p>
    </div>
    ${unidades.map(u => `<div class="rod-un">${unidadeTexto(u)}</div>`).join('')}
    <nav class="rod-nav" aria-label="Rodapé"><ul>${menu(v, '')}<li><a href="${link(v, 'cotacao')}">Cotação online</a></li></ul></nav>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ${E.razao}. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa('Olá! Gostaria de uma cotação de transporte de veículo.')}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icWa()}</a>
<div class="caixa-foto" hidden><button class="caixa-fechar" aria-label="Fechar">${ic('fechar')}</button><figure><img alt=""><figcaption></figcaption></figure></div>
</body>
</html>
`;
}

// ---------- peças ----------
const opcoesUf = rot => `<option value="">${rot}</option>${ufs.map(([s, n]) => `<option value="${s}">${n}</option>`).join('')}`;

function formCotacao(cls = '', titulo = 'Faça uma cotação online com a gente') {
  return `<form class="cotacao ${cls}" data-cotacao novalidate>
  ${titulo ? `<p class="cot-tit">${titulo}</p>` : ''}
  <div class="cot-grade">
    <label class="c2"><span>Nome</span><input name="nome" autocomplete="name" placeholder="Nome" required></label>
    <label class="c2"><span>E-mail</span><input name="email" type="email" autocomplete="email" placeholder="E-mail"></label>
    <label class="c4"><span>Telefone</span><input name="telefone" type="tel" autocomplete="tel" placeholder="Telefone" required></label>
    <label class="c2"><span>UF de origem</span><select name="uf_origem" required>${opcoesUf('UF de origem')}</select></label>
    <label class="c2"><span>UF de destino</span><select name="uf_destino" required>${opcoesUf('UF de destino')}</select></label>
    <label class="c2"><span>Cidade de origem</span><input name="cidade_origem" placeholder="Cidade de origem"></label>
    <label class="c2"><span>Cidade de destino</span><input name="cidade_destino" placeholder="Cidade de destino"></label>
    <label class="c2"><span>Veículo</span><input name="veiculo" placeholder="Veículo (modelo e ano)"></label>
    <label class="c2"><span>Valor do veículo (R$)</span><input name="valor" inputmode="numeric" placeholder="Valor R$"></label>
    <label class="c4"><span>Mensagem</span><textarea name="mensagem" rows="3" placeholder="Mensagem"></textarea></label>
  </div>
  <button class="btn btn-cotar" type="submit">Enviar cotação ${icWa()}</button>
  <p class="cot-aviso">A cotação abre no WhatsApp da Hawai já preenchida.</p>
</form>`;
}

function formRapido() {
  return `<form class="cot-rapida" data-cotacao novalidate>
  <label><span>Origem</span><select name="uf_origem" required>${opcoesUf('UF de origem')}</select></label>
  <span class="cr-seta" aria-hidden="true">${ic('seta')}</span>
  <label><span>Destino</span><select name="uf_destino" required>${opcoesUf('UF de destino')}</select></label>
  <label class="cr-veic"><span>Veículo</span><input name="veiculo" placeholder="Ex.: Onix 2022"></label>
  <button class="btn btn-cotar" type="submit">Cotar no WhatsApp ${icWa()}</button>
</form>`;
}

function mapaBrasil(cls = '') {
  const [LON0, LAT0, LATR, ESC] = mapaDados.proj;
  const k = Math.cos(LATR * Math.PI / 180);
  const P = ([lon, lat]) => [(lon - LON0) * k * ESC, (LAT0 - lat) * ESC];
  const estados = Object.entries(mapaDados.estados).map(([uf, d]) => `<path class="uf${uf === 'CE' || uf === 'SP' ? ' base' : ''}" d="${d}"><title>${uf}</title></path>`).join('');
  const [x1, y1] = P(FOR.lonlat), [x2, y2] = P(GRU.lonlat);
  const cx = (x1 + x2) / 2 - 150, cy = (y1 + y2) / 2 - 40;
  const rota = `<path class="rota" d="M${x1.toFixed(1)},${y1.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}"/>`;
  const pino = (u, [x, y], lado) => `<g class="pino" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="22" class="pino-halo"/><circle r="10"/><text x="${lado * 24}" y="7" text-anchor="${lado > 0 ? 'start' : 'end'}">${u.cidade} · ${u.uf}</text></g>`;
  return `<figure class="mapa-br ${cls}"><svg viewBox="0 0 ${mapaDados.largura} ${mapaDados.altura}" role="img" aria-label="Mapa do Brasil com as bases da Hawai em Fortaleza (CE) e Guarulhos (SP)">${estados}${rota}${pino(FOR, P(FOR.lonlat), -1)}${pino(GRU, P(GRU.lonlat), 1)}</svg></figure>`;
}

const galeriaHtml = (cls, itens = galeria) => `<ul class="galeria ${cls}">${itens.map(g => `<li><a href="/assets/img/${g.img}.webp" data-foto="${esc(g.legenda)}">${img(g.img, g.legenda)}<span>${g.legenda}</span></a></li>`).join('')}</ul>`;

const pilaresHtml = cls => `<ul class="pilares ${cls}">${pilares.map(p => `<li>${ic(p.icone)}<h3>${p.titulo}</h3><p>${p.texto}</p></li>`).join('')}</ul>`;

const etapasHtml = cls => `<ol class="etapas ${cls}">${etapas.map((e, i) => `<li><span class="et-n">${String(i + 1).padStart(2, '0')}</span><h3>${e.titulo}</h3><p>${e.texto}</p></li>`).join('')}</ol>`;

const unidadesMapa = cls => `<div class="unidades ${cls}">${unidades.map(u => `<article class="unidade">
  <div class="un-texto">${unidadeTexto(u)}<a class="un-rota" href="${u.rota}" target="_blank" rel="noopener">Abrir no Google Maps ${ic('ext')}</a></div>
  <iframe class="un-mapa" src="${u.mapa}" title="Mapa: Hawai em ${u.cidade}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</article>`).join('')}</div>`;

const celularesHtml = `<p class="wa-nums">${icWa()}<span>WhatsApp Fortaleza</span>${FOR.celulares.map(c => `<a href="https://wa.me/55${c.replace(/\D/g, '')}" target="_blank" rel="noopener">${c.replace('(85) ', '')}</a>`).join('')}</p>`;

// ---------- versão A ----------
function cabecalhoA(titulo, sub, foto) {
  return `<section class="cab-pag" style="--foto:url(/assets/img/${foto}.webp)"><div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;
}

const A = {
  index: () => `<section class="heroi">
  <div class="heroi-foto">${img('cegonha-azul-banner', 'Caminhão cegonha azul da Hawai carregado de veículos', ' fetchpriority="high" loading="eager"')}</div>
  <div class="in heroi-in">
    ${formCotacao('cot-heroi')}
  </div>
</section>
<section class="faixa-roxa"><div class="in"><h1>${E.frase}</h1>${celularesHtml}</div></section>
<section class="historia in">
  ${historia.map((h, i) => `<article class="hist hist-${i + 1}">
    <figure>${img(['sede-fortaleza', 'cegonha-iveco-carregada', 'cegonha-na-rodovia'][i], ['Sede da Hawai em Fortaleza', 'Cegonha Iveco carregada no pátio', 'Cegonha da Hawai na rodovia'][i])}</figure>
    <div><h2>${h.titulo}...</h2><p>${h.texto}</p>${i === 0 ? `<a class="mais" href="/a/empresa/">Conheça a empresa ${ic('seta')}</a>` : ''}</div>
  </article>`).join('')}
</section>
<section class="pilares-faixa"><div class="in">${pilaresHtml('pil-a')}</div></section>
<section class="galeria-azul"><div class="in">
  <div class="sec-tit"><h2>Nossa frota</h2><a class="mais claro" href="/a/frota/">Ver todas as fotos ${ic('seta')}</a></div>
  ${galeriaHtml('gal-a')}
</div></section>
<section class="contato-home in">
  <p class="sobre-tit">Onde estamos</p><h2 class="sec-h">Entre em contato</h2>
  ${unidadesMapa('un-a')}
</section>
`,
  empresa: () => `${cabecalhoA('A empresa', 'Transporte de veículos em caminhão cegonha desde o final da década de 90', 'sede-fortaleza')}
<section class="in texto-longo">
  ${historia.map((h, i) => `<article class="bloco${i % 2 ? ' inv' : ''}">
    <figure>${img(['sede-fortaleza', 'cegonha-volvo-azul', 'cegonha-iveco-branca'][i], ['Sede da Hawai em Fortaleza', 'Cegonha Volvo azul', 'Cegonha Iveco branca'][i])}</figure>
    <div><h2>${h.titulo}...</h2><p>${h.texto}</p><p>${h.mais}</p></div>
  </article>`).join('')}
</section>
<section class="pilares-faixa"><div class="in"><h2 class="sec-h">Nossos pilares</h2>${pilaresHtml('pil-a')}</div></section>
<section class="cta-a"><div class="in"><h2>Precisa transportar um veículo?</h2>${btnCotar('a')}</div></section>
`,
  servicos: () => `${cabecalhoA('Serviços', 'Transporte de veículos em caminhão cegonha para as principais cidades do Brasil', 'cegonha-iveco-banner')}
<section class="in serv-intro">
  <div><h2>Transporte de veículos</h2><p>A Hawai atende todos os segmentos envolvidos em veículos, com frota de carretas novas, rastreador 24 horas em cada uma, galpão coberto e seguro RC/TRC para todos os veículos transportados.</p></div>
  <ul class="segmentos seg-a">${segmentos.map(s => `<li><h3>${s.titulo}</h3><p>${s.texto}</p></li>`).join('')}</ul>
</section>
<section class="etapas-faixa"><div class="in"><h2 class="sec-h">Como funciona</h2>${etapasHtml('et-a')}</div></section>
<section class="in rota-a">
  <div><h2>De Fortaleza e Guarulhos para o Brasil</h2><p>Com bases no Ceará e em São Paulo, a Hawai transporta veículos para as principais cidades do país. Informe a origem e o destino na cotação.</p>${btnCotar('a')}</div>
  ${mapaBrasil('mapa-a')}
</section>
`,
  frota: () => `${cabecalhoA('Frota', 'Caminhões cegonha novos, cada um com rastreador 24 horas', 'cegonha-volvo-azul')}
<section class="in frota-pag">${galeriaHtml('gal-a gal-toda')}</section>
<section class="pilares-faixa"><div class="in">${pilaresHtml('pil-a')}</div></section>
`,
  cotacao: () => `${cabecalhoA('Cotação online', 'Preencha os dados e a cotação abre no WhatsApp da Hawai', 'cegonha-mercedes-vermelha')}
<section class="in cot-pag">
  ${formCotacao('cot-cheia', '')}
  <aside class="cot-lado">
    <h2>Prefere ligar?</h2>
    ${unidades.map(u => `<p><strong>${u.titulo}</strong>${u.fixos.map(t => `<a href="tel:${telHref(t)}">${t}</a>`).join('')}</p>`).join('')}
    ${celularesHtml}
  </aside>
</section>
`,
  contato: () => `${cabecalhoA('Onde estamos', 'Fortaleza (CE) e Guarulhos (SP)', 'cegonha-abastecendo')}
<section class="in contato-pag">${unidadesMapa('un-a')}</section>
<section class="faixa-roxa"><div class="in"><h2>Fale com a gente pelo WhatsApp</h2>${celularesHtml}</div></section>
`,
};

// ---------- versão B ----------
function cabecalhoB(rotulo, titulo, sub) {
  return `<section class="cab-b"><div class="in"><p class="rotulo">${rotulo}</p><h1>${titulo}</h1>${sub ? `<p class="cab-sub">${sub}</p>` : ''}</div><span class="faixas" aria-hidden="true"></span></section>`;
}

const B = {
  index: () => `<section class="heroi-b">
  ${img('cegonha-iveco-banner', 'Caminhão cegonha da Hawai carregado de veículos', ' class="hb-foto" fetchpriority="high" loading="eager"')}
  <div class="in hb-in">
    <p class="rotulo">Hawai Transportes de Veículos · Fortaleza e São Paulo</p>
    <h1>Transporte de veículos em caminhão cegonha</h1>
    <p class="hb-sub">${E.frase}.</p>
  </div>
  <div class="in hb-form">${formRapido()}</div>
</section>
<section class="estrada"><div class="in">
  <h2 class="sec-h">O que seu veículo tem na viagem</h2>
  <div class="estrada-pista" aria-hidden="true"></div>
  ${pilaresHtml('pil-b')}
</div></section>
<section class="in desde">
  <div class="desde-txt">
    <p class="rotulo">Nossa história</p>
    <h2>Desde o final da década de 90 transportando veículos</h2>
    <p>${historia[0].texto}</p>
    <p>${historia[2].texto}</p>
    <a class="mais" href="/b/empresa/">Conheça a empresa ${ic('seta')}</a>
  </div>
  <figure class="desde-foto">${img('sede-fortaleza', 'Sede da Hawai em Fortaleza')}<figcaption>Sede em Fortaleza, na BR 116</figcaption></figure>
</section>
<section class="seg-b"><div class="in">
  <h2 class="sec-h">Quem a Hawai atende</h2>
  <ol class="segmentos">${segmentos.map((s, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><h3>${s.titulo}</h3><p>${s.texto}</p></li>`).join('')}</ol>
</div></section>
<section class="mapa-sec"><div class="in mapa-grade">
  <div>
    <p class="rotulo">Duas bases</p>
    <h2>De Fortaleza e Guarulhos para as principais cidades do Brasil</h2>
    ${unidades.map(u => `<div class="mb-un"><h3>${u.titulo}</h3><p>${u.endereco}</p><p>${u.fixos.map(t => `<a href="tel:${telHref(t)}">${t}</a>`).join(' · ')}</p></div>`).join('')}
  </div>
  ${mapaBrasil('mapa-b')}
</div></section>
<section class="in mosaico-sec">
  <div class="sec-tit"><h2 class="sec-h">Frota</h2><a class="mais" href="/b/frota/">Todas as fotos ${ic('seta')}</a></div>
  ${galeriaHtml('gal-b', galeria.slice(0, 5))}
</section>
<section class="cta-b"><div class="in"><h2>Vai transportar um veículo?</h2><p>Mande origem, destino e o modelo. A Hawai responde pelo WhatsApp.</p>${btnCotar('b')}</div></section>
`,
  empresa: () => `${cabecalhoB('A empresa', 'Transportamos sonhos e progresso desde o final da década de 90')}
<section class="in emp-b">
  <figure class="emp-foto">${img('sede-fortaleza', 'Sede da Hawai em Fortaleza')}</figure>
  <div class="emp-txt">${historia.map(h => `<h2>${h.titulo}</h2><p>${h.texto}</p><p>${h.mais}</p>`).join('')}</div>
</section>
<section class="estrada"><div class="in"><h2 class="sec-h">Nossos pilares</h2><div class="estrada-pista" aria-hidden="true"></div>${pilaresHtml('pil-b')}</div></section>
<section class="cta-b"><div class="in"><h2>Será um grande prazer tê-lo como cliente</h2>${btnCotar('b')}</div></section>
`,
  servicos: () => `${cabecalhoB('Serviços', 'Transporte de veículos em caminhão cegonha', 'Para revendedores, locadoras, frotistas e pessoas físicas, para as principais cidades do Brasil.')}
<section class="in etapas-b"><h2 class="sec-h">Do pedido à entrega</h2>${etapasHtml('et-b')}</section>
<section class="seg-b"><div class="in">
  <h2 class="sec-h">Para quem é</h2>
  <ol class="segmentos">${segmentos.map((s, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><h3>${s.titulo}</h3><p>${s.texto}</p></li>`).join('')}</ol>
</div></section>
<section class="estrada"><div class="in"><h2 class="sec-h">Garantias em todo transporte</h2><div class="estrada-pista" aria-hidden="true"></div>${pilaresHtml('pil-b')}</div></section>
<section class="mapa-sec"><div class="in mapa-grade"><div><p class="rotulo">Rotas</p><h2>Duas bases, Brasil inteiro no destino</h2><p class="claro">Informe a cidade de origem e de destino na cotação e a Hawai monta o transporte.</p>${btnCotar('b')}</div>${mapaBrasil('mapa-b')}</div></section>
`,
  frota: () => `${cabecalhoB('Frota', 'Carretas novas, todas com rastreador 24 horas')}
<section class="in frota-b">${galeriaHtml('gal-b gal-toda')}</section>
<section class="cta-b"><div class="in"><h2>Seu veículo na próxima viagem</h2>${btnCotar('b')}</div></section>
`,
  cotacao: () => `${cabecalhoB('Cotação online', 'Peça sua cotação de transporte', 'Preencha os dados abaixo. A mensagem abre no WhatsApp da Hawai já pronta para enviar.')}
<section class="in cot-pag cot-b">
  ${formCotacao('cot-cheia', '')}
  <aside class="cot-lado">
    <h2>Atendimento</h2>
    ${unidades.map(u => `<p><strong>${u.titulo}</strong>${u.fixos.map(t => `<a href="tel:${telHref(t)}">${t}</a>`).join('')}</p>`).join('')}
    ${celularesHtml}
  </aside>
</section>
`,
  contato: () => `${cabecalhoB('Onde estamos', 'Fortaleza (CE) e Guarulhos (SP)')}
<section class="in contato-pag">${unidadesMapa('un-b')}</section>
<section class="cta-b"><div class="in"><h2>Atendimento pelo WhatsApp</h2>${celularesHtml}</div></section>
`,
};

const meta = {
  index: ['Hawai Transportes de Veículos | Transporte de veículos em caminhão cegonha', 'Transporte de veículos em caminhão cegonha a partir de Fortaleza (CE) e Guarulhos (SP) para as principais cidades do Brasil. Rastreador 24 horas e seguro RC/TRC.'],
  empresa: ['A empresa | Hawai Transportes de Veículos', 'Desde o final da década de 90 a Hawai transporta veículos para revendedores, locadoras, frotistas e pessoas físicas.'],
  servicos: ['Serviços | Hawai Transportes de Veículos', 'Transporte de veículos em caminhão cegonha, com galpão coberto, rastreador 24 horas e seguro RC/TRC.'],
  frota: ['Frota | Hawai Transportes de Veículos', 'Fotos dos caminhões cegonha da Hawai Transportes.'],
  cotacao: ['Cotação online | Hawai Transportes de Veículos', 'Peça a cotação do transporte do seu veículo: origem, destino e modelo, direto no WhatsApp da Hawai.'],
  contato: ['Onde estamos | Hawai Transportes de Veículos', 'Hawai em Fortaleza (BR 116, Aerolândia) e Guarulhos (Parque Alvorada). Telefones e WhatsApp.'],
};

export function gerarVersao(v) {
  const P = v === 'a' ? A : B;
  const out = {};
  for (const slug of Object.keys(meta)) out[slug] = head(v, slug, ...meta[slug]) + topo(v, slug) + P[slug]() + rodape(v);
  return out;
}
