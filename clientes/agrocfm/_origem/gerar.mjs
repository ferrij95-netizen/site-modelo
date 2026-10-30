// Gera clientes/agrocfm/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/agrocfm/_origem/gerar.mjs
// A "Tradição": branco com o filete vermelho do logo sob os títulos, faixa vermelha da agenda de leilões como no site atual,
// as três atividades em painéis de foto altos e a seleção contada como uma trilha "da safra ao touro CEIP".
// B "Pasto": topo verde do "CFM Agro-Pecuária" com a contagem do próximo leilão numa faixa vermelha, capa de foto inteira
// com o ingresso do leilão, atividades em abas, Índice CFM desenhado como barra e os touros em centrais numa esteira.
import fs from 'node:fs';
import path from 'node:path';
import { empresa as E, textos as T, atividades, numeros, historia, etapas, indice, leilao as L, sumarios, centrais, nomesCentrais, noticias, parceiros, depoimentos } from './conteudo.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const DIM = JSON.parse(fs.readFileSync(path.join(aqui, 'dim.json'), 'utf8'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (src, alt, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${DIM[src][0]}" height="${DIM[src][1]}" loading="lazy" decoding="async"${extra}>`;
const ja = ' fetchpriority="high" loading="eager"';
export const nomesVersao = { a: 'Tradição', b: 'Pasto' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'leiloes', nome: 'Leilões', caminho: 'leiloes/' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'touros-cfm', nome: 'Touros CFM', caminho: 'touros-cfm/' },
  { slug: 'sumarios', nome: 'Sumários CFM', caminho: 'sumarios/' },
  { slug: 'news', nome: 'News', caminho: 'news/' },
  { slug: 'clientes', nome: 'Clientes e parceiros', caminho: 'clientes/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];
const u = (v, slug, ancora = '') => `/${v}/${nav.find(n => n.slug === slug).caminho}${ancora}`;
const whats = (msg = 'Olá! Vim pelo site e gostaria de falar com a CFM.') => `https://wa.me/${E.whats}?text=${encodeURIComponent(msg)}`;
const whatsLeilao = whats('Olá! Gostaria de informações sobre o Leilão Virtual CFM de 5 de novembro.');

const I = {
  whats: '<path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4.1-1.1z"/><path d="M9 8.5c0 3.3 2.9 6.5 6.4 6.6l1-1.6-2.1-1-1 .9a5 5 0 01-2.4-2.4l.9-1-1-2.1z"/>',
  tel: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  doc: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
  down: '<path d="M12 4v12M6 11l6 6 6-6M5 20h14"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  tv: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
  truck: '<path d="M2 6h12v10H2zM14 10h4l4 3v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6 15h4"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/>',
  facebook: '<path d="M14 21v-7.5h2.6l.4-3H14V8.7c0-.9.3-1.5 1.6-1.5H17V4.5a19 19 0 00-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.2H8.3v3h2.6V21"/>',
  linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-3.2c0-1.4.9-2.3 2.1-2.3s1.9.9 1.9 2.3V16M11.5 10.5V16"/>',
  youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.3l5 2.7-5 2.7z"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const fontes = 'https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@500;600;700&family=Inter:wght@400;500;600&display=swap';

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
<meta name="theme-color" content="${v === 'a' ? '#FFFFFF' : '#00472A'}">
<link rel="icon" href="/assets/favicon.webp" type="image/webp">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontes}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const link = (v, n, atual) => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`;
const logo = (w = 196, cor = '') => `<img src="/assets/logo${cor}.webp" alt="${E.nome}, Touros Nelore" width="${w}" height="${Math.round(w * 90 / 210)}">`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const menu = (v, atual) => `<nav id="menu" class="menu" aria-label="Principal">${nav.slice(1, -1).map(n => link(v, n, atual)).join('')}<a class="btn btn-verm btn-peq" href="${u(v, 'contato')}"${atual === 'contato' ? ' aria-current="page"' : ''}>Contato</a></nav>`;

function topo(v, atual) {
  if (v === 'a') return `<div class="pre"><div class="in"><span class="pre-slogan">${E.slogan}</span><span class="pre-cont"><a href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a><a href="${whats()}" target="_blank" rel="noopener">${ic('whats')} ${E.cel}</a><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></span></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="${E.nome}, início">${logo(178)}</a>
  ${menu(v, atual)}
  ${menuBtn}
</div></header>`;
  return `<a class="pre-leilao" href="${u(v, 'leiloes')}"><span class="in"><b>${L.nome}</b><span>${L.data.replace(' de 2026', '')} · ${L.hora} · ${L.touros} touros Nelore CEIP</span><span class="contagem" data-ate="${L.iso}"></span>${ic('seta')}</span></a>
<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="${E.nome}, início">${logo(170, '-branco')}</a>
  ${menu(v, atual)}
  ${menuBtn}
</div></header>`;
}

const redes = () => `<p class="redes">${Object.entries(E.redes).map(([k, h]) => `<a href="${h}" target="_blank" rel="noopener" aria-label="${k}">${ic(k)}</a>`).join('')}</p>`;

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(200, '-branco')}<p>${T.objetivo}</p>${redes()}</div>
  <div><h3>Sede CFM</h3><p>${E.endereco}<br>${E.cidade} · ${E.uf}<br>CEP ${E.cep}</p><p><a class="link" href="${E.mapa}" target="_blank" rel="noopener">Ver no mapa ${ic('seta')}</a></p></div>
  <div><h3>Fale com a CFM</h3><p><a href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a><br><a href="${whats()}" target="_blank" rel="noopener">${ic('whats')} ${E.cel} (${E.celObs})</a><br><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${nav.map(n => link(v, n, '')).join('')}</nav>
</div>
<p class="rod-fim"><span>© ${new Date().getFullYear()} ${E.nome}. ${E.slogan}.</span></p></footer>
<a class="whats-flut" href="${whats()}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${ic('whats')}</a>`;
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
const tit = (sobre, h, p = '', cls = '') => `<div class="tit ${cls}"><p class="eyebrow">${sobre}</p><h2>${h}</h2>${p ? `<p>${p}</p>` : ''}</div>`;

const form = () => `<form class="form" data-form>
  <div class="campos">
    <label>Nome<input name="Nome" autocomplete="name" required></label>
    <label>Fazenda ou empresa<input name="Fazenda" autocomplete="organization"></label>
    <label>Telefone / WhatsApp<input name="Telefone" type="tel" autocomplete="tel" required></label>
    <label>E-mail<input name="E-mail" type="email" autocomplete="email" required></label>
    <label>Cidade / UF<input name="Cidade" autocomplete="address-level2"></label>
    <label>Assunto<select name="Assunto"><option>Comprar touros Nelore CFM</option><option>Leilão Virtual CFM 2026</option><option>Sêmen em centrais</option><option>Sumário de Touros</option><option>Quero ser avisado sobre os eventos CFM</option><option>Outro assunto</option></select></label>
    <label class="largo">Mensagem<textarea name="Mensagem" rows="4" placeholder="Quantos touros, região da fazenda, época da estação de monta..."></textarea></label>
  </div>
  <button class="btn btn-verm" type="submit">Enviar mensagem ${ic('seta')}</button>
  <p class="form-ok" role="status" hidden>Mensagem pronta. Nesta prévia o envio está desligado; no site no ar ela chega direto para a CFM. Enquanto isso, chame no <a href="${whats()}" target="_blank" rel="noopener">WhatsApp ${E.cel}</a>.</p>
</form>`;

const mapa = () => `<div class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa: sede da CFM em São José do Rio Preto" loading="lazy"></iframe></div>`;
const btnWhats = (cls = 'btn btn-whats', txt = 'Falar no WhatsApp', msg) => `<a class="${cls}" href="${msg || whats()}" target="_blank" rel="noopener">${ic('whats')} ${txt}</a>`;
const sede = () => `<ul class="sede">
  <li>${ic('pin')}<span><b>Sede CFM</b>${E.endereco}<br>${E.cidade} · ${E.uf} · CEP ${E.cep}</span></li>
  <li>${ic('tel')}<span><b>Telefone</b><a href="tel:${E.telHref}">${E.tel}</a></span></li>
  <li>${ic('whats')}<span><b>WhatsApp</b><a href="${whats()}" target="_blank" rel="noopener">${E.cel} (${E.celObs})</a></span></li>
  <li>${ic('mail')}<span><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></span></li>
</ul>`;

const listaCheck = itens => `<ul class="lista-check">${itens.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;

const numerosBloco = (cls = '') => `<section class="numeros ${cls}"><div class="in">
  <p class="eyebrow">Alguns números importantes da CFM</p>
  <dl>${numeros.map(([n, t]) => `<div><dt>${n}</dt><dd>${t}</dd></div>`).join('')}</dl>
</div></section>`;

const etapasBloco = (v, cls = '') => `<section class="etapas ${cls}"><div class="in">
  ${tit('Programa de Seleção Nelore CFM', 'Da safra ao touro CEIP', 'Todo touro CFM passa pelo mesmo caminho. Só chegam ao fim os 30% melhores de cada safra.')}
  <ol class="trilha">${etapas.map(([h, p], i) => `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>
</div></section>`;

const indiceBloco = (cls = '') => `<div class="indice ${cls}">
  <p class="formula">ICFM = 20% PD + 40% GP + 20% PE + 20% Musc</p>
  <div class="barra" role="img" aria-label="Composição do Índice CFM: 20% peso à desmama, 40% ganho de peso, 20% perímetro escrotal, 20% musculosidade">${indice.map(([s, n, p], i) => `<span class="b${i}" style="flex:${p}"><b>${p}%</b><i>${s}</i></span>`).join('')}</div>
  <ul class="legenda">${indice.map(([s, n], i) => `<li><span class="cor b${i}"></span><b>${s}</b> ${n}</li>`).join('')}</ul>
</div>`;

const leilaoCartao = v => `<article class="ingresso">
  <div class="ing-data"><span class="dia">${L.dia}</span><span class="mes">${L.mes}</span><span class="hora">${L.hora}</span></div>
  <div class="ing-txt"><p class="eyebrow">Agenda de leilões</p><h3>${L.nome}</h3><p>${L.touros} touros Nelore com CEIP, DEPs assistidas por genômica e exame andrológico positivo.</p>
  <p class="contagem" data-ate="${L.iso}"></p>
  <a class="btn btn-verm btn-peq" href="${u(v, 'leiloes')}">Saiba mais ${ic('seta')}</a></div>
</article>`;

const noticiaCard = (n, grande = false) => `<article class="nt${grande ? ' nt-grande' : ''}"><a href="${n.url}" target="_blank" rel="noopener">
  <figure>${foto(n.foto, n.titulo)}</figure>
  <div><p class="nt-cat">CFM Informa · ${n.cat}</p><h3>${n.titulo}</h3>${grande ? `<p>${n.resumo}</p>` : ''}<span class="link">Ler notícia ${ic('seta')}</span></div>
</a></article>`;

const parceirosBloco = () => `<section class="parceiros"><div class="in">
  ${tit('Nós preferimos', 'Parceiros')}
  <ul class="parc-lista">${parceiros.map(p => `<li>${foto(p.foto, p.nome)}</li>`).join('')}</ul>
</div></section>`;

const depo = ([nome, faz, txt]) => `<blockquote class="depo"><p>“${txt}”</p><footer><b>${nome}</b>${faz ? `<span>${faz}</span>` : ''}</footer></blockquote>`;

const sumariosBloco = v => `<div class="sumarios">${sumarios.map((s, i) => `<article class="sum${i === 0 ? ' sum-novo' : ''}">
  <figure>${foto(s.capa, `Capa do Sumário de Touros Nelore CFM ${s.ano}`)}</figure>
  <div><p class="eyebrow">${i === 0 ? 'Edição atual' : 'Edição anterior'}</p><h3>Sumário ${s.ano}</h3>
  <a class="btn ${i === 0 ? 'btn-verm' : 'btn-contorno'} btn-peq" href="${s.pdf}" target="_blank" rel="noopener">${ic('down')} Baixar PDF</a></div>
</article>`).join('')}</div>`;

const centraisGrade = (cls = '') => `<ul class="centrais ${cls}">${centrais.map(n => `<li><figure>${foto(`touro-${n.toLowerCase()}`, `Touro Nelore CFM ${n}`)}</figure><b>CFM ${n === 'Heroi' ? 'Herói' : n}</b></li>`).join('')}</ul>`;

const leilaoDetalhe = v => `<section class="leilao-det"><div class="in">
  <figure class="ld-poster">${foto('leilao-2026', 'Arte oficial do Leilão Virtual CFM 2026, 5 de novembro, 250 touros', ja)}</figure>
  <div class="ld-txt">
    <p class="eyebrow">Salve essa data</p>
    <h2>${L.data}</h2>
    <p class="lead">${L.texto}</p>
    <ul class="ld-info"><li>${ic('cal')}<span><b>${L.dia} de novembro, ${L.hora}</b>horário de Brasília</span></li><li>${ic('tv')}<span><b>Ao vivo</b>${L.transmissao}</span></li></ul>
    <div class="acoes"><a class="btn btn-verm" href="${L.catalogoPdf}" target="_blank" rel="noopener">${ic('doc')} Catálogo PDF</a>${btnWhats('btn btn-whats', 'Falar com o Pedro', whatsLeilao)}</div>
    <p class="nota">Catálogo em planilha e link da transmissão ao vivo: <a href="${L.paginaAtual}" target="_blank" rel="noopener">página do leilão</a>.</p>
  </div>
</div></section>
<section class="leilao-cond"><div class="in">
  <div class="lc-col"><h3>${ic('truck', 'ic ic-grande')} Frete facilitado</h3>${listaCheck(L.frete)}</div>
  <div class="lc-col"><h3>${ic('card', 'ic ic-grande')} Condições comerciais</h3>${listaCheck(L.condicoes)}</div>
</div></section>`;

const historiaBloco = (cls = '') => `<section class="historia ${cls}"><div class="in">
  ${tit('Confiança desde 1908', 'Mais de um século no campo')}
  <ol class="tempo">${historia.map(([a, t]) => `<li><b>${a}</b><span>${t}</span></li>`).join('')}</ol>
</div></section>`;

const contatoSec = (v, cls = '') => `<section class="contato ${cls}" id="contato"><div class="in">
  <div class="ct-txt"><p class="eyebrow">Fique por dentro</p><h2>Sugestões, dúvidas, ideias?</h2><p>${T.contato}</p>${sede()}${redes()}</div>
  <div class="ct-form"><h3>Quer ser avisado sobre os eventos CFM?</h3>${form()}</div>
</div></section>`;

const comprarCta = (v, cls = '') => `<section class="comprar ${cls}"><div class="in">
  <div class="cp-a"><p class="eyebrow">Interessado em comprar genética CFM?</p><h2>Saiba mais sobre o próximo Leilão CFM</h2><p>${T.comprar}</p>
    <div class="acoes"><a class="btn btn-verm" href="${u(v, 'leiloes')}">Próximo leilão ${ic('seta')}</a><a class="btn btn-contorno-claro" href="${u(v, 'contato')}">Agende uma visita</a></div></div>
  <a class="cp-b" href="${u(v, 'touros-cfm', '#centrais')}"><figure>${foto('touro-centrais', 'Touro Nelore CFM')}</figure><span><b>Touros CFM em centrais</b>${T.centrais}<span class="link">Clique aqui ${ic('seta')}</span></span></a>
</div></section>`;

// ================= versão A: Tradição =================
const capaA = (sobre, titulo, sub, img) => `<section class="capa"><figure class="capa-img">${foto(img, '', ja)}</figure><div class="in"><p class="eyebrow">${sobre}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

const homeA = v => `<section class="hero">
  <figure class="hero-img">${foto('touros-diogo', 'Touros Nelore CFM no pasto', ja)}</figure>
  <div class="in"><div class="hero-txt">
    <p class="eyebrow">Somos a CFM</p>
    <h1>${T.heroTitulo}</h1>
    <p>${T.heroTexto}</p>
    <div class="acoes"><a class="btn btn-verm" href="${u(v, 'leiloes')}">Próximo leilão ${ic('seta')}</a><a class="btn btn-contorno-claro" href="${u(v, 'touros-cfm')}">Conheça os Touros CFM</a></div>
  </div></div>
</section>
<section class="agenda"><div class="in">
  <div class="ag-data"><span class="dia">${L.dia}</span><span class="mes">novembro<br>${L.hora}</span></div>
  <div class="ag-txt"><p class="eyebrow">Agenda de leilões</p><h2>${L.nome}</h2><p>${L.touros} touros Nelore CEIP · frete grátis em MS, MT, GO, TO, MG e SP · 20 parcelas</p></div>
  <p class="contagem" data-ate="${L.iso}"></p>
  <a class="btn btn-branco" href="${u(v, 'leiloes')}">Saiba mais ${ic('seta')}</a>
</div></section>
<section class="sobre"><div class="in">
  ${tit('Sobre nós', 'Empresa', T.empresaCurto, 'tit-centro')}
  <div class="triptico">${atividades.map(a => `<a class="tri" href="${u(v, 'empresa', `#${a.slug}`)}">
    ${foto(a.foto, a.titulo || a.nome)}
    <span class="tri-txt"><b class="tri-num">${a.numero}<small>${a.unidade}</small></b><h3>${a.nome}</h3><span class="tri-p">${a.curto}</span></span>
  </a>`).join('')}</div>
  <p class="centro"><a class="link" href="${u(v, 'empresa')}">Saiba mais sobre a CFM ${ic('seta')}</a></p>
</div></section>
<section class="touros-home"><div class="in">
  <figure class="th-img">${foto('touros-pasto', 'Touros Nelore CFM')}<figcaption>Touros Nelore CFM, criados a pasto</figcaption></figure>
  <div class="th-txt">
    <p class="eyebrow">Líder de vendas</p><h2>Touros CFM</h2><p>${T.touros}</p>
    <ul class="pilares">${T.pilares.map(p => `<li>${p}</li>`).join('')}</ul>
    <h3>Programa de Seleção Nelore CFM</h3><p>${T.programa}</p>
    <a class="btn btn-verm" href="${u(v, 'touros-cfm')}">Saiba mais ${ic('seta')}</a>
  </div>
</div></section>
${etapasBloco(v)}
${comprarCta(v)}
${numerosBloco()}
<section class="news-home"><div class="in">
  ${tit('Últimas notícias', 'News')}
  <div class="nt-grade">${noticiaCard(noticias[0], true)}<div class="nt-lista">${noticias.slice(1, 4).map(n => noticiaCard(n)).join('')}</div></div>
  <p class="centro"><a class="btn btn-contorno" href="${u(v, 'news')}">Veja mais</a></p>
</div></section>
${parceirosBloco()}
<section class="palavra"><div class="in">
  ${tit('Reconhecimento', 'Palavra do cliente', '', 'tit-centro')}
  <div class="pal-destaque">${depo(depoimentos[3])}</div>
  <div class="pal-cols">${[0, 2, 7].map(i => depo(depoimentos[i])).join('')}</div>
  <p class="centro"><a class="link" href="${u(v, 'clientes')}">Mais depoimentos ${ic('seta')}</a></p>
</div></section>
${contatoSec(v)}`;

const empresaA = v => `${capaA('Sobre nós', 'Empresa', 'Pecuária, cana-de-açúcar e eucalipto em fazendas de São Paulo e Mato Grosso do Sul.', 'paisagem')}
<section class="intro"><div class="in">
  <div class="intro-txt"><p class="eyebrow">Confiança desde 1908</p><h2>Produzir com eficiência e responsabilidade</h2>${T.empresa.map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="intro-img">${foto('equipe', 'Equipe da CFM na fazenda')}<figcaption>Equipe CFM</figcaption></figure>
</div></section>
${historiaBloco()}
<section class="ativ"><div class="in">${atividades.map((a, i) => `<article class="at" id="${a.slug}">
  <figure>${foto(a.faixa, a.titulo || a.nome)}</figure>
  <div class="at-txt"><p class="eyebrow">${String(i + 1).padStart(2, '0')} · Atividade</p><h2>${a.titulo || a.nome}</h2><p class="at-num"><b>${a.numero}</b> ${a.unidade}</p><p>${a.longo}</p>${a.slug === 'pecuaria' ? `<a class="link" href="${u(v, 'touros-cfm')}">Saiba mais sobre os Touros CFM ${ic('seta')}</a>` : ''}</div>
</article>`).join('')}</div></section>
<section class="local"><div class="in">
  <div>${tit('Onde estamos', 'Localização das fazendas', 'Fazendas nos estados de São Paulo e Mato Grosso do Sul, com venda de touros também na fazenda da CFM em Aquidauana/MS. A sede administrativa fica em São José do Rio Preto/SP.')}${sede()}</div>
  ${mapa()}
</div></section>`;

const tourosA = v => `${capaA('Líder de vendas', 'Touros CFM', 'Cerca de 1.300 reprodutores Nelore CEIP vendidos por ano, todos avaliados por DEPs e genômica.', 'rebanho-serra')}
<section class="intro"><div class="in">
  <div class="intro-txt"><p class="eyebrow">Programa de Seleção Nelore CFM</p><h2>Genética que se comprova no campo</h2>${T.tourosLongo.map(p => `<p>${p}</p>`).join('')}</div>
  <aside class="pilares-box"><p class="eyebrow">Todo o programa é fundamentado em</p><ul class="pilares">${T.pilares.map(p => `<li>${p}</li>`).join('')}</ul></aside>
</div></section>
${numerosBloco('num-claro')}
<section class="aval"><div class="in">
  <figure>${foto('avaliacao', 'Avaliação de touros Nelore CFM')}</figure>
  <div><p class="eyebrow">Desde 1980</p><h2>Avaliação genética</h2>${T.avaliacao.map(p => `<p>${p}</p>`).join('')}</div>
</div></section>
<section class="indice-sec" id="indice"><div class="in">
  <div>${tit('A fórmula da seleção', 'Entenda o Índice CFM', T.indice)}</div>
  ${indiceBloco()}
</div></section>
${etapasBloco(v, 'etapas-claro')}
<section class="glossario"><div class="in">
  <article id="ceip"><p class="eyebrow">Afinal, o que é</p><h2>CEIP</h2><p>${T.ceip}</p></article>
  <article id="dep"><p class="eyebrow">Afinal, o que é</p><h2>DEP</h2><p>${T.dep}</p></article>
</div></section>
<section class="centrais-sec" id="centrais"><div class="in">
  ${tit('Sêmen disponível', 'Touros CFM em centrais', `${T.centrais} Entre elas: ${nomesCentrais}.`)}
  ${centraisGrade()}
</div></section>
<section class="sum-home"><div class="in">
  <div>${tit('Sumário de Touros Nelore CFM', 'Todas as DEPs em um só lugar', T.sumario)}</div>
  ${sumariosBloco(v)}
</div></section>
${comprarCta(v)}`;

const leiloesA = v => `${capaA('Agenda de leilões', L.nome, `${L.data} · ${L.hora} · ${L.touros} touros Nelore CEIP`, 'leilao-pista')}
${leilaoDetalhe(v)}
<section class="como"><div class="in">
  <figure>${foto('leilao-curral', 'Touros CFM no Megaleilão')}</figure>
  <div><p class="eyebrow">Como comprar</p><h2>Megaleilão, leilões virtuais e venda na fazenda</h2><p>${T.comprar}</p><p>Dúvidas sobre o leilão: <b>${L.contato}</b>.</p>${btnWhats('btn btn-whats', 'Tirar dúvidas no WhatsApp', whatsLeilao)}</div>
</div></section>
<section class="galeria"><div class="in">
  ${tit('Leilões CFM', 'Na pista e nos currais')}
  <div class="gal">${[['leilao-pista-2', 'Touros CFM na pista do Megaleilão'], ['leilao-recinto', 'Recinto do Megaleilão CFM'], ['leilao-ceip', 'Pista do Megaleilão com o painel CEIP'], ['leilao-curral-2', 'Touros CFM no curral']].map(([f, a], i) => `<figure class="g${i}">${foto(f, a)}</figure>`).join('')}</div>
</div></section>`;

const sumariosA = v => `${capaA('Sumários CFM', 'Sumário de Touros Nelore CFM', 'Mais de 30 edições com as DEPs de cada touro avaliado no programa.', 'touros-close')}
<section class="sum-pag"><div class="in">
  <div><p class="lead">${T.sumario}</p><p>Para entender os números do Sumário, veja <a href="${u(v, 'touros-cfm', '#indice')}">o Índice CFM</a>, <a href="${u(v, 'touros-cfm', '#dep')}">o que é DEP</a> e <a href="${u(v, 'touros-cfm', '#ceip')}">o que é CEIP</a>.</p></div>
  ${sumariosBloco(v)}
</div></section>
${numerosBloco()}`;

const newsA = v => `${capaA('CFM Informa', 'News', 'Mercado, genética, clima e os eventos da CFM.', 'rebanho-sombra')}
<section class="news-pag"><div class="in">
  <div class="nt-grade">${noticiaCard(noticias[0], true)}<div class="nt-lista">${noticias.slice(1).map(n => noticiaCard(n)).join('')}</div></div>
  <p class="centro"><a class="btn btn-contorno" href="https://www.agrocfm.com.br/news/" target="_blank" rel="noopener">Todas as notícias</a></p>
</div></section>`;

const clientesA = v => `${capaA('Reconhecimento', 'Clientes e parceiros', 'Mais de 900 clientes em 602 municípios, de 19 estados e do Paraguai.', 'novilhas-arvore')}
<section class="palavra"><div class="in">
  ${tit('Palavra do cliente', 'Quem usa, confia', '', 'tit-centro')}
  <div class="pal-destaque">${depo(depoimentos[9])}</div>
  <div class="pal-mural">${depoimentos.filter((_, i) => i !== 9).map(depo).join('')}</div>
</div></section>
${numerosBloco()}
${parceirosBloco()}`;

const contatoA = v => `${capaA('Contato', 'Fale com a CFM', T.contato, 'aerea-pasto')}
${contatoSec(v, 'ct-pag')}
<section class="mapa-sec"><div class="in">${mapa()}</div></section>`;

// ================= versão B: Pasto =================
const capaB = (sobre, titulo, sub, img) => `<section class="capa"><div class="in"><div class="capa-txt"><p class="eyebrow">${sobre}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></div><figure class="capa-img">${foto(img, '', ja)}</figure></section>`;

const abasAtiv = v => `<div class="abas" data-abas>
  <div class="abas-bts" role="tablist" aria-label="Atividades da CFM">${atividades.map((a, i) => `<button type="button" role="tab" id="t-${a.slug}" aria-controls="p-${a.slug}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${a.nome}<small>${a.numero} ${a.unidade}</small></button>`).join('')}</div>
  ${atividades.map((a, i) => `<div class="aba" role="tabpanel" id="p-${a.slug}" aria-labelledby="t-${a.slug}"${i ? ' hidden' : ''}>
    <figure>${foto(a.faixa, a.titulo || a.nome)}</figure>
    <div class="aba-txt"><h3>${a.titulo || a.nome}</h3><p>${a.longo}</p>${a.slug === 'pecuaria' ? `<a class="link" href="${u(v, 'touros-cfm')}">Touros CFM ${ic('seta')}</a>` : `<a class="link" href="${u(v, 'empresa', `#${a.slug}`)}">Saiba mais ${ic('seta')}</a>`}</div>
  </div>`).join('')}
</div>`;

const homeB = v => `<section class="hero">
  <figure class="hero-img">${foto('pasto-ceu', 'Touros Nelore CFM no pasto', ja)}</figure>
  <div class="in">
    <div class="hero-txt"><p class="eyebrow">Somos a CFM · ${E.slogan}</p><h1>${T.heroTitulo}</h1>
      <div class="acoes"><a class="btn btn-verm" href="${u(v, 'touros-cfm')}">Conheça os Touros CFM ${ic('seta')}</a>${btnWhats('btn btn-contorno-claro', E.cel)}</div></div>
    ${leilaoCartao(v)}
  </div>
</section>
<section class="faixa-num"><div class="in"><dl>${numeros.map(([n, t]) => `<div><dt>${n}</dt><dd>${t}</dd></div>`).join('')}</dl></div></section>
<section class="sobre"><div class="in">
  <div class="sobre-cab">${tit('Sobre nós', 'No Brasil desde 1908', T.empresaCurto)}<a class="btn btn-contorno" href="${u(v, 'empresa')}">Conheça a empresa ${ic('seta')}</a></div>
  ${abasAtiv(v)}
</div></section>
<section class="touros-home"><div class="in">
  <div class="th-txt"><p class="eyebrow">Líder de vendas</p><h2>Touros CFM</h2><p>${T.touros}</p><p>${T.programa}</p><a class="btn btn-verm" href="${u(v, 'touros-cfm')}">Programa de Seleção ${ic('seta')}</a></div>
  <div class="th-indice"><h3>Índice CFM</h3><p>As quatro características de maior impacto econômico, com o peso de cada uma na seleção:</p>${indiceBloco()}</div>
</div></section>
<section class="centrais-sec"><div class="in">
  <div class="cen-cab">${tit('Sêmen disponível', 'Touros CFM em centrais', T.centrais)}<a class="link" href="${u(v, 'touros-cfm', '#centrais')}">Ver todos ${ic('seta')}</a></div>
</div>${centraisGrade('esteira')}</section>
${etapasBloco(v)}
<section class="palavra"><div class="in">
  ${tit('Reconhecimento', 'Palavra do cliente')}
  <div class="pal-esteira">${depoimentos.slice(0, 6).map(depo).join('')}</div>
</div></section>
<section class="news-home"><div class="in">
  <div class="cen-cab">${tit('Últimas notícias', 'News')}<a class="link" href="${u(v, 'news')}">Veja mais ${ic('seta')}</a></div>
  <div class="nt-linha">${noticias.slice(0, 4).map(n => noticiaCard(n)).join('')}</div>
</div></section>
${parceirosBloco()}
${contatoSec(v)}`;

const empresaB = v => `${capaB('Sobre nós', 'Empresa', 'No Brasil desde 1908, com fazendas em São Paulo e Mato Grosso do Sul.', 'rebanho-lago')}
<section class="intro"><div class="in">
  <div class="intro-txt"><h2>Produzir com eficiência e responsabilidade</h2>${T.empresa.map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="intro-img">${foto('serra-mata', 'Fazenda da CFM com mata preservada')}</figure>
</div></section>
<section class="ativ"><div class="in">${atividades.map((a, i) => `<article class="at" id="${a.slug}">
  <figure>${foto(a.faixa, a.titulo || a.nome)}</figure>
  <div class="at-txt"><span class="at-num"><b>${a.numero}</b>${a.unidade}</span><h2>${a.titulo || a.nome}</h2><p>${a.longo}</p></div>
</article>`).join('')}</div></section>
${historiaBloco('hist-verde')}
<section class="local"><div class="in">
  <div>${tit('Onde estamos', 'Localização', 'Fazendas em São Paulo e Mato Grosso do Sul, com venda de touros também na fazenda da CFM em Aquidauana/MS. Sede em São José do Rio Preto/SP.')}${sede()}</div>
  ${mapa()}
</div></section>`;

const tourosB = v => `${capaB('Líder de vendas', 'Touros CFM', 'O maior programa individual de melhoramento genético Nelore do Brasil.', 'touros-pasto')}
<section class="faixa-num"><div class="in"><dl>${numeros.map(([n, t]) => `<div><dt>${n}</dt><dd>${t}</dd></div>`).join('')}</dl></div></section>
<section class="intro"><div class="in">
  <div class="intro-txt"><h2>Programa de Seleção Nelore CFM</h2>${T.tourosLongo.map(p => `<p>${p}</p>`).join('')}</div>
  <aside class="pilares-box"><p class="eyebrow">Fundamentado em</p><ul class="pilares">${T.pilares.map(p => `<li>${p}</li>`).join('')}</ul></aside>
</div></section>
<section class="touros-home" id="indice"><div class="in">
  <div class="th-txt"><p class="eyebrow">A fórmula da seleção</p><h2>Entenda o Índice CFM</h2><p>${T.indice}</p></div>
  <div class="th-indice">${indiceBloco()}</div>
</div></section>
${etapasBloco(v)}
<section class="aval"><div class="in">
  <div><p class="eyebrow">Desde 1980</p><h2>Avaliação genética</h2>${T.avaliacao.map(p => `<p>${p}</p>`).join('')}</div>
  <figure>${foto('rebanho-midia', 'Rebanho Nelore CFM')}</figure>
</div></section>
<section class="glossario"><div class="in">
  <article id="ceip"><h2>CEIP</h2><p>${T.ceip}</p></article>
  <article id="dep"><h2>DEP</h2><p>${T.dep}</p></article>
</div></section>
<section class="centrais-sec" id="centrais"><div class="in">${tit('Sêmen disponível', 'Touros CFM em centrais', `${T.centrais} Entre elas: ${nomesCentrais}.`)}</div>${centraisGrade('esteira')}</section>
<section class="sum-home"><div class="in"><div>${tit('Sumário de Touros Nelore CFM', 'Baixe o Sumário', T.sumario)}</div>${sumariosBloco(v)}</div></section>
${comprarCta(v)}`;

const leiloesB = v => `${capaB('Agenda de leilões', L.nome, `${L.data} · ${L.hora} · ${L.touros} touros Nelore CEIP`, 'leilao-recinto')}
${leilaoDetalhe(v)}
<section class="como"><div class="in">
  <div><p class="eyebrow">Como comprar</p><h2>Megaleilão, leilões virtuais e venda na fazenda</h2><p>${T.comprar}</p><p>Dúvidas sobre o leilão: <b>${L.contato}</b>.</p>${btnWhats('btn btn-whats', 'Tirar dúvidas no WhatsApp', whatsLeilao)}</div>
  <div class="gal">${[['leilao-pista', 'Pista do Megaleilão CFM'], ['leilao-curral', 'Touros CFM no curral'], ['leilao-ceip', 'Megaleilão CFM']].map(([f, a], i) => `<figure class="g${i}">${foto(f, a)}</figure>`).join('')}</div>
</div></section>`;

const sumariosB = v => `${capaB('Sumários CFM', 'Sumário de Touros Nelore CFM', 'As DEPs de cada touro avaliado no programa.', 'touros-close')}
<section class="sum-pag"><div class="in">
  <div><p class="lead">${T.sumario}</p><p>Para entender os números: <a href="${u(v, 'touros-cfm', '#indice')}">Índice CFM</a>, <a href="${u(v, 'touros-cfm', '#dep')}">DEP</a> e <a href="${u(v, 'touros-cfm', '#ceip')}">CEIP</a>.</p></div>
  ${sumariosBloco(v)}
</div></section>`;

const newsB = v => `${capaB('CFM Informa', 'News', 'Mercado, genética, clima e os eventos da CFM.', 'novilhas')}
<section class="news-pag"><div class="in">
  <div class="nt-linha">${noticias.map(n => noticiaCard(n)).join('')}</div>
  <p class="centro"><a class="btn btn-contorno" href="https://www.agrocfm.com.br/news/" target="_blank" rel="noopener">Todas as notícias</a></p>
</div></section>`;

const clientesB = v => `${capaB('Reconhecimento', 'Clientes e parceiros', 'Mais de 900 clientes em 602 municípios, de 19 estados e do Paraguai.', 'rebanho-arvore')}
<section class="faixa-num"><div class="in"><dl>${numeros.map(([n, t]) => `<div><dt>${n}</dt><dd>${t}</dd></div>`).join('')}</dl></div></section>
<section class="palavra pal-pag"><div class="in">
  ${tit('Palavra do cliente', 'Quem usa, confia')}
  <div class="pal-mural">${depoimentos.map(depo).join('')}</div>
</div></section>
${parceirosBloco()}`;

const contatoB = v => `${capaB('Contato', 'Fale com a CFM', T.contato, 'aerea-pasto')}
${contatoSec(v, 'ct-pag')}
<section class="mapa-sec"><div class="in">${mapa()}</div></section>`;

const P = {
  a: { index: homeA, leiloes: leiloesA, empresa: empresaA, 'touros-cfm': tourosA, sumarios: sumariosA, news: newsA, clientes: clientesA, contato: contatoA },
  b: { index: homeB, leiloes: leiloesB, empresa: empresaB, 'touros-cfm': tourosB, sumarios: sumariosB, news: newsB, clientes: clientesB, contato: contatoB },
};
const meta = {
  index: ['Agro-Pecuária CFM · Touros Nelore CEIP · Confiança desde 1908', 'O maior programa individual de melhoramento genético da pecuária brasileira. Touros Nelore CEIP, leilões, sumário de touros, cana-de-açúcar e eucalipto.'],
  leiloes: [`${L.nome} · ${L.data} · Agro-Pecuária CFM`, `${L.touros} touros Nelore CEIP, frete facilitado e 20 parcelas. Catálogo, condições e contato.`],
  empresa: ['Empresa · Agro-Pecuária CFM', 'No Brasil desde 1908: pecuária, cana-de-açúcar e eucalipto em fazendas de São Paulo e Mato Grosso do Sul.'],
  'touros-cfm': ['Touros CFM · Programa de Seleção Nelore CFM', 'Mais de 50 mil touros produzidos, 100% CEIP. Avaliação genética com a USP, Índice CFM, DEPs e touros em centrais.'],
  sumarios: ['Sumário de Touros Nelore CFM · Agro-Pecuária CFM', 'Baixe o Sumário de Touros Nelore CFM 2026/2027 e 2025/2026 em PDF.'],
  news: ['News · CFM Informa · Agro-Pecuária CFM', 'Notícias de mercado, genética, clima e eventos da CFM.'],
  clientes: ['Clientes e parceiros · Agro-Pecuária CFM', 'Palavra do cliente: pecuaristas que usam touros Nelore CFM. Parceiros Trouw Nutrition, Neogen e Central Bela Vista.'],
  contato: ['Contato · Agro-Pecuária CFM', `Sede em ${E.cidade}/${E.uf}. ${E.tel} · ${E.cel} · ${E.email}.`],
};

for (const v of ['a', 'b']) {
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const n of nav) {
    const dir = path.join(pub, v, n.caminho);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), pagina(v, n.slug, n.caminho, ...meta[n.slug], P[v][n.slug](v)));
  }
  console.log(`agrocfm: versão ${v.toUpperCase()}, ${nav.length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#B51919', fundo: '#00331E', claro: '#F6F4EF',
  fonteTitulo: '"Crimson Pro",Georgia,serif', fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: fontes,
  favicon: '/assets/favicon.webp', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: nav.length, texto: 'Clara e clássica, como o logo: títulos numa letra parecida com a do "CFM" do logo, o filete vermelho sob cada título e a faixa vermelha da agenda de leilões que já existe no site de hoje. Pecuária, cana e floresta viram três painéis de foto.', pontos: ['Contagem para o Leilão Virtual de 5 de novembro, com catálogo e condições', 'A seleção contada em 6 etapas, da safra ao touro CEIP', 'Índice CFM, CEIP, DEP, Sumários e touros em centrais numa página só'] },
    { letra: 'b', nome: nomesVersao.b, paginas: nav.length, texto: 'Mais comercial: topo no verde do "CFM Agro-Pecuária", faixa vermelha com a contagem para o próximo leilão em todas as páginas e a capa com o ingresso do leilão sobre a foto do pasto. O Índice CFM vira uma barra desenhada.', pontos: ['Atividades em abas: pecuária, cana e floresta', 'Touros em centrais numa esteira de fotos', 'Números da CFM logo abaixo da capa'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('agrocfm: escolha em public/index.html');
