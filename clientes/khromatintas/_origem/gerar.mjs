// Gera clientes/khromatintas/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/khromatintas/_origem/gerar.mjs
// A "Faixa": topo preto como o site atual, o arco amarelo dos banners e uma faixa de asfalto com a linha amarela tracejada
// que corre no pé de cada capa e vira a linha do tempo da aplicação. B "Zebrada": topo amarelo, faixa de pedestre como divisor,
// catálogo em abas com ficha técnica em tabela e a aplicação desenhada como um trecho de rua sendo pintado.
import fs from 'node:fs';
import path from 'node:path';
import { empresa as E, textos as T, viaria, imob, galeria, maisBuscados } from './conteudo.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const DIM = JSON.parse(fs.readFileSync(path.join(aqui, 'dim.json'), 'utf8'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (src, alt, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${DIM[src][0]}" height="${DIM[src][1]}" loading="lazy" decoding="async"${extra}>`;
const ja = ' fetchpriority="high" loading="eager"';
export const nomesVersao = { a: 'Faixa', b: 'Zebrada' };

const linhas = { viaria: 'linha-viaria', imob: 'linha-imobiliaria' };
const todos = [...viaria.map(p => ({ ...p, linha: 'viaria' })), ...imob.map(p => ({ ...p, linha: 'imob' }))];
const porSlug = Object.fromEntries(todos.map(p => [p.slug, p]));
const urlP = (v, p) => `/${v}/${linhas[p.linha]}/#${p.slug}`;
const whats = (msg = 'Olá! Vim pelo site e gostaria de saber mais sobre os produtos Khroma.') => `https://wa.me/${E.whats}?text=${encodeURIComponent(msg)}`;

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'a-khroma', nome: 'A Khroma', caminho: 'a-khroma/' },
  { slug: 'linha-viaria', nome: 'Demarcação Viária', caminho: 'linha-viaria/' },
  { slug: 'linha-imobiliaria', nome: 'Linha Imobiliária', caminho: 'linha-imobiliaria/' },
  { slug: 'representante', nome: 'Representantes', caminho: 'representante/' },
  { slug: 'canal-de-vendas', nome: 'Canal de vendas', caminho: 'canal-de-vendas/' },
];

const I = {
  whats: '<path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4.1-1.1z"/><path d="M9 8.5c0 3.3 2.9 6.5 6.4 6.6l1-1.6-2.1-1-1 .9a5 5 0 01-2.4-2.4l.9-1-1-2.1z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  insta: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/>',
  face: '<path d="M14 21v-7.5h2.6l.4-3H14V8.7c0-.9.3-1.5 1.6-1.5H17V4.5a19 19 0 00-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.2H8.3v3h2.6V21"/>',
  doc: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

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
<meta name="theme-color" content="${v === 'a' ? '#0E0E0E' : '#FFE600'}">
<link rel="icon" href="/assets/favicon.webp" type="image/webp">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,600;0,700;1,800;1,900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const link = (v, n, atual) => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`;
const logo = (w = 170, cor = '') => `<img src="/assets/logo${cor}.webp" alt="Khroma Tintas" width="${w}" height="${Math.round(w * 431 / 1735)}">`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const menu = (v, atual) => `<nav id="menu" class="menu" aria-label="Principal">${nav.slice(0, -1).map(n => link(v, n, atual)).join('')}<a class="btn btn-am btn-peq" href="/${v}/canal-de-vendas/"${atual === 'canal-de-vendas' ? ' aria-current="page"' : ''}>Canal de vendas</a></nav>`;

function topo(v, atual) {
  if (v === 'a') return `<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="Khroma Tintas, início">${logo(168)}</a>
  ${menu(v, atual)}
  ${menuBtn}
</div></header>`;
  return `<div class="pre"><div class="in"><span>${ic('pin')} ${E.cidade} · ${E.uf}</span><span class="pre-selo">Certificada INMETRO e ABNT</span><a href="${whats()}" target="_blank" rel="noopener">${ic('whats')} ${E.whatsTxt}</a></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Khroma Tintas, início">${logo(160)}</a>
  ${menu(v, atual)}
  ${menuBtn}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(190, '-branco')}<p>${T.slogan}</p><p class="selos">${foto('inmetro', 'INMETRO')}${foto('abnt', 'ABNT')}</p></div>
  <div><h3>Fábrica</h3><p>${E.endereco}<br>${E.cidade} · ${E.uf}<br>CEP ${E.cep}</p><p><a class="link" href="${E.mapa}" target="_blank" rel="noopener">Ver no mapa ${ic('seta')}</a></p></div>
  <div><h3>Contato</h3><p><a href="${whats()}" target="_blank" rel="noopener">${ic('whats')} ${E.whatsTxt}</a><br><a href="${E.instagram}" target="_blank" rel="noopener">${ic('insta')} @khromatintas</a><br><a href="${E.facebook}" target="_blank" rel="noopener">${ic('face')} /khromatintas</a></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${nav.map(n => link(v, n, '')).join('')}</nav>
</div>
<p class="rod-fim">Todos os direitos reservados para Khroma Tintas.</p></footer>
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
const opcoesProduto = () => `<optgroup label="Demarcação viária">${viaria.map(p => `<option>${p.nome}${p.sub && p.slug.includes('tinta') ? ` (${p.sub.toLowerCase()})` : ''}</option>`).join('')}</optgroup><optgroup label="Linha imobiliária">${imob.flatMap(p => p.variantes ? p.variantes.map(x => x.nome) : [p.nome]).map(n => `<option>${n}</option>`).join('')}</optgroup><option>Boletim técnico ou FISPQ</option>`;

const form = (tipo = 'venda') => `<form class="form" data-form>
  <div class="campos">
    <label>Nome<input name="Nome" autocomplete="name" required></label>
    <label>${tipo === 'rep' ? 'Empresa ou região' : 'Empresa'}<input name="Empresa" autocomplete="organization"></label>
    <label>Telefone / WhatsApp<input name="Telefone" type="tel" autocomplete="tel" required></label>
    <label>E-mail<input name="E-mail" type="email" autocomplete="email" required></label>
    ${tipo === 'rep'
      ? '<label class="largo">Cidade / UF<input name="Cidade" autocomplete="address-level2" required></label>'
      : `<label class="largo">Produto de interesse<select name="Produto">${opcoesProduto()}</select></label>`}
    <label class="largo">Mensagem<textarea name="Mensagem" rows="4" placeholder="${tipo === 'rep' ? 'Conte sobre sua atuação: região, clientes, outras marcas que representa...' : 'Quantidade, cor, local da obra...'}"></textarea></label>
  </div>
  <button class="btn btn-preto" type="submit">${tipo === 'rep' ? 'Quero ser representante' : 'Solicitar contato'} ${ic('seta')}</button>
  <p class="form-ok" role="status" hidden>Mensagem pronta. Nesta prévia o envio está desligado; no site no ar ela chega direto para a Khroma. Enquanto isso, chame no <a href="${whats()}" target="_blank" rel="noopener">WhatsApp ${E.whatsTxt}</a>.</p>
</form>`;

const mapa = () => `<div class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa: Khroma Tintas em Bom Jesus dos Perdões" loading="lazy"></iframe></div>`;
const btnWhats = (cls = 'btn btn-whats', txt = 'Contato via WhatsApp') => `<a class="${cls}" href="${whats()}" target="_blank" rel="noopener">${ic('whats')} ${txt}</a>`;
const fichaDl = f => `<dl class="ficha">${f.map(([k, x]) => `<div><dt>${k}</dt><dd>${x}</dd></div>`).join('')}</dl>`;
const fichaTab = f => `<table class="ficha-tab"><tbody>${f.map(([k, x]) => `<tr><th scope="row">${k}</th><td>${x}</td></tr>`).join('')}</tbody></table>`;
const infoTec = v => `<p class="info-tec">${ic('doc')}<span>Boletim técnico e FISPQ: <a href="/${v}/canal-de-vendas/">solicite pelo formulário</a> ou pelo <a href="${whats('Olá! Gostaria do boletim técnico / FISPQ de um produto Khroma.')}" target="_blank" rel="noopener">WhatsApp</a>.</span></p>`;
const estrada = (cls = '') => `<div class="estrada ${cls}" aria-hidden="true"><span class="estrada-linha"></span></div>`;

// ================= versão A: Faixa =================
const capaA = (sobre, titulo, sub, img = '') => `<section class="capa"><div class="in"><div><p class="eyebrow">${sobre}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${img ? `<div class="capa-img">${img}</div>` : ''}</div>${estrada()}</section>`;

const ctaA = v => `<section class="cta"><div class="in">
  <div><h2>Compre direto da fábrica</h2><p>${T.canal}</p></div>
  <div class="cta-acoes"><a class="btn btn-preto" href="/${v}/canal-de-vendas/">Canal de vendas ${ic('seta')}</a>${btnWhats('btn btn-contorno', E.whatsTxt)}</div>
</div></section>`;

const linhaPainelA = (v, l) => {
  const dados = l === 'viaria'
    ? { cls: 'pn-viaria', tit: 'Demarcação Viária', txt: 'Tintas base solvente e base água, diluente, termoplástico, microesferas de vidro, tachas e tachões.', imgs: [['diluente', 'Diluente de demarcação Khroma'], ['demarcacao-solvente', 'Tinta de demarcação Khroma 18 litros'], ['tachao-amarelo', 'Tachão amarelo Khroma']], lista: viaria }
    : { cls: 'pn-imob', tit: 'Linha Imobiliária', txt: 'Látex Econômico, Standard e Premium, textura acrílica, grafiato, seladora e massa niveladora.', imgs: [['trio-premium', 'Baldes da linha imobiliária Khroma']], lista: imob };
  return `<article class="painel ${dados.cls}">
  <div class="pn-txt"><p class="eyebrow">Linha</p><h3>${dados.tit}</h3><p>${dados.txt}</p>
  <ul>${dados.lista.map(p => `<li><a href="${urlP(v, p)}">${p.nome}${p.slug === 'tinta-de-demarcacao-base-agua' ? ' base água' : ''}</a></li>`).join('')}</ul>
  <a class="btn ${l === 'viaria' ? 'btn-am' : 'btn-preto'}" href="/${v}/${linhas[l]}/">Ver a linha ${ic('seta')}</a></div>
  <div class="pn-img"><span class="arco" aria-hidden="true"></span>${dados.imgs.map(([f, a], i) => `<figure class="pn-f${i}">${foto(f, a)}</figure>`).join('')}</div>
</article>`;
};

const buscadosA = v => `<section class="buscados"><div class="in">
  <div class="tit"><p class="eyebrow">Destaques</p><h2>Os mais buscados da Khroma</h2></div>
  <ul class="bus-lista">${maisBuscados.map(s => porSlug[s]).map(p => `<li><a href="${urlP(v, p)}"><figure>${foto(p.foto, `${p.nome} Khroma`)}</figure><h3>${p.nome}</h3><p>${p.sub}</p><span class="link">Saiba mais ${ic('seta')}</span></a></li>`).join('')}</ul>
</div></section>`;

const galeriaA = (titulo = 'Galeria de fotos', sub = 'Sinalização pintada com produtos Khroma e a fábrica em Bom Jesus dos Perdões.') => `<section class="galeria-a"><div class="in">
  <div class="tit"><p class="eyebrow">Na rua e na fábrica</p><h2>${titulo}</h2><p>${sub}</p></div>
  <div class="gal-mosaico">${galeria.map(([f, a], i) => `<figure class="g${i}">${foto(f, a)}<figcaption>${a}</figcaption></figure>`).join('')}</div>
</div></section>`;

const seloA = () => `<section class="selo"><div class="in">
  <div class="selo-logos">${foto('inmetro', 'INMETRO')}${foto('abnt', 'ABNT')}</div>
  <ol class="tempo">
    <li><b>${E.fundacao}</b><span>Nasce a Khroma, fabricando tintas para demarcação viária</span></li>
    <li><b>Nova linha</b><span>Lançamento da linha de tintas imobiliárias</span></li>
    <li><b>${E.certificacao}</b><span>Certificação no INMETRO e na ABNT</span></li>
  </ol>
</div></section>`;

const ondeA = () => `<section class="onde"><div class="in">
  <div class="onde-txt"><p class="eyebrow">Fábrica</p><h2>Onde encontrar Khroma?</h2>
    <p class="onde-end">${ic('pin')}<span>${E.endereco}<br>${E.cidade} · ${E.uf} · CEP ${E.cep}</span></p>
    ${btnWhats()}</div>
  ${mapa()}
</div></section>`;

const homeA = v => `<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">Tintas viárias e imobiliárias · desde ${E.fundacao}</p>
    <h1>${T.heroTitulo}</h1>
    <p>${T.heroTexto}</p>
    <div class="acoes"><a class="btn btn-am" href="/a/canal-de-vendas/">Fale conosco ${ic('seta')}</a><a class="btn btn-contorno-claro" href="/a/linha-viaria/">Ver produtos</a></div>
  </div>
  <div class="hero-palco"><span class="arco" aria-hidden="true"></span>
    <figure class="hp-lata">${foto('demarcacao-solvente', 'Tinta para demarcação viária Khroma, 18 litros', ja)}</figure>
    <figure class="hp-trio">${foto('trio-latex', 'Baldes de Látex Premium e Standard e Grafiato Khroma', ja)}</figure>
    <figure class="hp-tachao">${foto('tachao-amarelo', 'Tachão refletivo amarelo Khroma', ja)}</figure>
  </div>
</div>${estrada('estrada-hero')}</section>
<section class="linhas"><div class="in">
  <div class="tit"><p class="eyebrow">${T.slogan}</p><h2>Duas linhas, uma fábrica</h2></div>
  ${linhaPainelA(v, 'viaria')}${linhaPainelA(v, 'imob')}
</div></section>
${buscadosA(v)}
${seloA()}
${galeriaA()}
${ondeA()}
${ctaA(v)}`;

const empresaA = v => `${capaA('A Khroma', `Fabricante de tintas desde ${E.fundacao}`, `Demarcação viária e linha imobiliária, em ${E.cidade}/${E.uf}.`)}
<section class="sobre"><div class="in">
  <div class="sobre-txt">${T.sobre.map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="sobre-foto">${foto('fabrica-fachada', 'Fachada da fábrica da Khroma')}</figure>
</div></section>
${seloA()}
<section class="mvv"><div class="in">
  ${[['Missão', T.missao], ['Visão', T.visao], ['Valores', T.valores]].map(([t, x]) => `<article><h2>${t}</h2><p>${x}</p></article>`).join('')}
</div></section>
<section class="fabrica-a"><div class="in">
  <div class="tit"><p class="eyebrow">Por dentro</p><h2>A fábrica</h2></div>
  <div class="fab-grade">${[['fabrica-galpao', 'Galpão com produtos em estoque'], ['fabrica-laboratorio', 'Laboratório da Khroma'], ['fabrica-latas', 'Latas de tinta prontas para expedição']].map(([f, a]) => `<figure>${foto(f, a)}<figcaption>${a}</figcaption></figure>`).join('')}</div>
</div></section>
${ctaA(v)}`;

const produtoA = (v, p, i) => `<section class="prod${i % 2 ? ' inv' : ''}" id="${p.slug}"><div class="in">
  <div class="prod-img"><span class="arco" aria-hidden="true"></span><figure class="principal">${foto(p.foto, `${p.nome} Khroma`)}</figure>
  ${p.fotos?.length ? `<div class="prod-mini">${p.fotos.map(([f, a]) => `<figure>${foto(f, a)}</figure>`).join('')}</div>` : ''}</div>
  <div class="prod-txt"><p class="eyebrow">${p.sub}</p><h2>${p.nome}</h2><p>${p.texto}</p>
  ${p.variantes ? `<div class="variantes">${p.variantes.map(x => `<article><figure>${foto(x.foto, x.nome)}</figure><h3>${x.nome}</h3><p class="classe">${x.classe}</p>${fichaDl(x.ficha)}</article>`).join('')}</div>` : fichaDl(p.ficha)}
  ${infoTec(v)}
  <a class="btn btn-am" href="${whats(`Olá! Gostaria de um orçamento de ${p.nome}${p.slug.includes('base-agua') ? ' base água' : ''}.`)}" target="_blank" rel="noopener">${ic('whats')} Pedir orçamento</a></div>
</div></section>`;

const indiceA = (v, lista) => `<nav class="indice" aria-label="Produtos da linha"><div class="in">${lista.map(p => `<a href="#${p.slug}">${foto(p.foto, '')}<span>${p.nome}${p.slug.includes('base-agua') ? ' <small>base água</small>' : ''}</span></a>`).join('')}</div></nav>`;

const etapasA = () => `<section class="aplica"><div class="in">
  <div class="tit tit-claro"><p class="eyebrow">Ficha técnica na prática</p><h2>Da lata à faixa liberada</h2><p>Como a tinta de demarcação Khroma vai para o pavimento.</p></div>
  <ol class="aplica-pista">${T.etapasViaria.map((e, i) => `<li style="--i:${i}"><span class="n">${i + 1}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>
</div>${estrada('estrada-aplica')}</section>`;

const paredeA = v => `<section class="parede"><div class="in">
  <div class="tit"><p class="eyebrow">Do reboco ao acabamento</p><h2>Uma linha para a parede inteira</h2></div>
  <ol class="camadas">${T.etapasImob.map((e, i) => `<li class="c${i}"><a href="${urlP(v, porSlug[e.p === 'massa' ? 'massa-niveladora' : e.p === 'seladora' ? 'seladora-acrilica' : 'linha-latex'])}"><span class="n">${i + 1}</span><div><h3>${e.t}</h3><p>${e.d}</p></div>${foto(e.p === 'latex' ? 'trio-latex' : e.p, e.t)}</a></li>`).join('')}</ol>
</div></section>`;

const viariaA = v => `${capaA('Linha', 'Demarcação Viária', 'Tintas, diluente, termoplástico, microesferas, tachas e tachões para sinalização horizontal, conforme as normas ABNT, DER e DNIT.', foto('tachao-lado', 'Tachão amarelo Khroma', ja))}
${indiceA(v, viaria)}
${viaria.map((p, i) => produtoA(v, p, i)).join('')}
${etapasA()}
${ctaA(v)}`;

const imobA = v => `${capaA('Linha', 'Linha Imobiliária', 'Látex, textura, grafiato, seladora e massa niveladora para obras residenciais e comerciais.', foto('trio-premium', 'Baldes da linha imobiliária Khroma', ja))}
${indiceA(v, imob)}
${paredeA(v)}
${imob.map((p, i) => produtoA(v, p, i)).join('')}
${ctaA(v)}`;

const repA = v => `${capaA('Representantes', 'Torne-se um representante da Khroma', 'Leve tintas viárias e imobiliárias certificadas para a sua região.')}
<section class="rep"><div class="in">
  <div class="rep-txt"><p class="grande">${T.sobre[1]}</p><p>${T.representante}</p>
    <ul class="lista-check">${['Duas linhas no mesmo catálogo: demarcação viária e imobiliária', 'Produtos certificados no INMETRO e na ABNT', 'Direto da fábrica em Bom Jesus dos Perdões/SP'].map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>
    <figure>${foto('fabrica-latas', 'Latas de tinta Khroma prontas para expedição')}</figure></div>
  ${form('rep')}
</div></section>`;

const canalA = v => `${capaA('Canal de vendas', 'Canal de vendas Khroma', T.canal)}
<section class="contato"><div class="in">
  <div><div class="whats-bloco"><p>O jeito mais rápido é o WhatsApp da fábrica:</p>${btnWhats('btn btn-whats btn-grande', E.whatsTxt)}</div>
  <p class="onde-end">${ic('pin')}<span>${E.endereco}<br>${E.cidade} · ${E.uf} · CEP ${E.cep}</span></p>${mapa()}</div>
  <div><h2>Solicitar informações</h2><p>${T.infoTecnica}</p>${form()}</div>
</div></section>`;

// ================= versão B: Zebrada =================
const zebra = (cls = '') => `<div class="zebra ${cls}" aria-hidden="true"></div>`;
const capaB = (sobre, titulo, sub, img = '') => `<section class="capa"><div class="in"><div class="capa-txt"><p class="eyebrow">${sobre}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${img ? `<div class="capa-img">${img}</div>` : ''}</div></section>${zebra()}`;

const numeros = () => `<dl class="numeros">
  <div><dt>Desde</dt><dd>${E.fundacao}</dd></div>
  <div><dt>Linhas</dt><dd>2</dd></div>
  <div><dt>Certificação</dt><dd>INMETRO · ABNT</dd></div>
  <div><dt>Venda</dt><dd>Direto da fábrica</dd></div>
</dl>`;

const destaqueFicha = p => (p.ficha || p.variantes[0].ficha).filter(([k]) => /Rendimento|Liberação|Refletância|Indicado|Temperatura|Tipo 1B|Uso/.test(k)).slice(0, 2);
const tileB = (v, p) => `<li><a class="tile" href="${urlP(v, p)}"><figure>${foto(p.foto, `${p.nome} Khroma`)}</figure><div><h3>${p.nome}</h3><p class="sub">${p.sub}</p>${destaqueFicha(p).map(([k, x]) => `<p class="mini"><b>${k}</b> ${x.split(' · ')[0]}</p>`).join('')}</div>${ic('seta', 'ic seta')}</a></li>`;

const catalogoB = v => `<section class="catalogo"><div class="in">
  <div class="tit"><p class="eyebrow">Produtos</p><h2>${T.slogan}</h2></div>
  <div class="abas" data-abas>
    <div class="abas-lista" role="tablist" aria-label="Linhas de produto">
      <button role="tab" id="t-viaria" aria-controls="p-viaria" aria-selected="true">Demarcação viária <small>${viaria.length}</small></button>
      <button role="tab" id="t-imob" aria-controls="p-imob" aria-selected="false" tabindex="-1">Linha imobiliária <small>${imob.length}</small></button>
    </div>
    <div class="aba" role="tabpanel" id="p-viaria" aria-labelledby="t-viaria"><ul class="tiles">${viaria.map(p => tileB(v, p)).join('')}</ul></div>
    <div class="aba" role="tabpanel" id="p-imob" aria-labelledby="t-imob" hidden><ul class="tiles">${imob.map(p => tileB(v, p)).join('')}</ul></div>
  </div>
</div></section>`;

// a rua sendo pintada: cada etapa pinta mais um trecho da faixa
const ruaB = () => `<section class="rua-sec"><div class="in">
  <div class="tit tit-claro"><p class="eyebrow">Aplicação</p><h2>Da lata à faixa liberada</h2><p>Os números da ficha técnica da tinta de demarcação, etapa por etapa.</p></div>
  <div class="rua" aria-hidden="true">${T.etapasViaria.map((e, i) => `<span class="trecho t${i}"></span>`).join('')}</div>
  <ol class="rua-etapas">${T.etapasViaria.map((e, i) => `<li><span class="n">0${i + 1}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>
</div></section>`;

const paredeB = v => `<section class="parede-b"><div class="in">
  <div class="tit"><p class="eyebrow">Linha imobiliária</p><h2>Da parede crua ao acabamento</h2></div>
  <ol>${T.etapasImob.map((e, i) => `<li><figure>${foto(e.p === 'latex' ? 'trio-latex' : e.p, e.t)}</figure><span class="n">${i + 1}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>
  <p class="centro"><a class="link" href="/${v}/linha-imobiliaria/">Ver a linha imobiliária ${ic('seta')}</a></p>
</div></section>`;

const ctaB = v => `<section class="cta"><div class="in">
  <h2>Canal de vendas Khroma</h2>
  <p>${T.canal}</p>
  <div class="cta-acoes"><a class="btn btn-am" href="/${v}/canal-de-vendas/">Solicitar contato ${ic('seta')}</a>${btnWhats('btn btn-whats', E.whatsTxt)}</div>
</div></section>`;

const galeriaB = () => `<section class="galeria-b"><div class="in">
  <div class="tit"><p class="eyebrow">Galeria de fotos</p><h2>Na rua e na fábrica</h2></div></div>
  <ul class="gal-trilho" tabindex="0" aria-label="Galeria de fotos, role para o lado">${galeria.map(([f, a]) => `<li><figure>${foto(f, a)}<figcaption>${a}</figcaption></figure></li>`).join('')}</ul>
</section>`;

const homeB = v => `<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">Khroma Tintas · ${E.cidade}/${E.uf}</p>
    <h1>Demarcação viária e tintas residenciais em um só local</h1>
    <p>${T.heroTexto}</p>
    <div class="acoes"><a class="btn btn-preto" href="/b/canal-de-vendas/">Fale conosco ${ic('seta')}</a>${btnWhats('btn btn-contorno', 'WhatsApp')}</div>
  </div>
  <div class="hero-foto"><figure class="hf-rua">${foto('obra-faixa', 'Faixa de pedestres pintada em vermelho e branco', ja)}</figure>
    <figure class="hf-lata">${foto('demarcacao-agua', 'Tinta para demarcação viária base água Khroma', ja)}</figure>
    <figure class="hf-tachao">${foto('tachao-amarelo', 'Tachão amarelo Khroma', ja)}</figure></div>
</div></section>
${zebra()}
<section class="numeros-sec"><div class="in">${numeros()}</div></section>
${catalogoB(v)}
${ruaB()}
${paredeB(v)}
<section class="sobre-b"><div class="in">
  <figure>${foto('fabrica-galpao', 'Galpão da fábrica da Khroma')}</figure>
  <div><p class="eyebrow">A Khroma</p><h2>Fabricante de tintas desde ${E.fundacao}</h2><p>${T.sobre[0]}</p><a class="link" href="/b/a-khroma/">Conheça a Khroma ${ic('seta')}</a></div>
</div></section>
${galeriaB()}
<section class="onde-b"><div class="in">
  ${mapa()}
  <div><p class="eyebrow">Fábrica</p><h2>Onde encontrar Khroma?</h2><p class="onde-end">${ic('pin')}<span>${E.endereco}<br>${E.cidade} · ${E.uf} · CEP ${E.cep}</span></p>${btnWhats()}</div>
</div></section>
${ctaB(v)}`;

const empresaB = v => `${capaB('A Khroma', 'Qualidade em cada linha', `Fabricante de tintas viárias e imobiliárias em ${E.cidade}/${E.uf}, desde ${E.fundacao}.`, foto('fabrica-porta', 'Entrada da fábrica da Khroma', ja))}
<section class="numeros-sec"><div class="in">${numeros()}</div></section>
<section class="sobre-b"><div class="in">
  <figure>${foto('fabrica-laboratorio', 'Laboratório da Khroma')}</figure>
  <div>${T.sobre.map(p => `<p>${p}</p>`).join('')}<p class="selos-b">${foto('inmetro', 'INMETRO')}${foto('abnt', 'ABNT')}<span>Certificada desde ${E.certificacao}</span></p></div>
</div></section>
<section class="mvv-b"><div class="in">
  <table><tbody>${[['Missão', T.missao], ['Visão', T.visao], ['Valores', T.valores]].map(([t, x]) => `<tr><th scope="row">${t}</th><td>${x}</td></tr>`).join('')}</tbody></table>
</div></section>
${galeriaB()}
${ctaB(v)}`;

const produtoB = (v, p) => `<section class="prod-b" id="${p.slug}"><div class="in">
  <header><div><p class="eyebrow">${p.sub}</p><h2>${p.nome}</h2><p>${p.texto}</p></div>
  <a class="btn btn-preto" href="${whats(`Olá! Gostaria de um orçamento de ${p.nome}${p.slug.includes('base-agua') ? ' base água' : ''}.`)}" target="_blank" rel="noopener">${ic('whats')} Pedir orçamento</a></header>
  ${p.variantes ? `<div class="abas abas-var" data-abas>
    <div class="abas-lista" role="tablist" aria-label="Tipos de látex">${p.variantes.map((x, i) => `<button role="tab" id="t-${p.slug}-${i}" aria-controls="p-${p.slug}-${i}" aria-selected="${!i}"${i ? ' tabindex="-1"' : ''}>${x.nome.replace('Látex ', '')}</button>`).join('')}</div>
    ${p.variantes.map((x, i) => `<div class="aba prod-b-grade" role="tabpanel" id="p-${p.slug}-${i}" aria-labelledby="t-${p.slug}-${i}"${i ? ' hidden' : ''}><figure class="principal">${foto(x.foto, x.nome)}</figure><div><h3>${x.nome} <small>${x.classe}</small></h3>${fichaTab(x.ficha)}</div></div>`).join('')}
  </div>` : `<div class="prod-b-grade"><figure class="principal">${foto(p.foto, `${p.nome} Khroma`)}</figure><div>${fichaTab(p.ficha)}${p.fotos?.length ? `<div class="prod-mini">${p.fotos.map(([f, a]) => `<figure>${foto(f, a)}</figure>`).join('')}</div>` : ''}</div></div>`}
</div></section>`;

const ancorasB = lista => `<nav class="ancoras" aria-label="Produtos"><div class="in">${lista.map(p => `<a href="#${p.slug}">${p.nome}${p.slug.includes('base-agua') ? ' (água)' : ''}</a>`).join('')}</div></nav>`;

const viariaB = v => `${capaB('Linha', 'Demarcação Viária', 'Sinalização horizontal conforme ABNT, DER e DNIT: tintas, diluente, termoplástico, microesferas, tachas e tachões.', foto('obra-ciclofaixa', 'Ciclofaixa pintada em vermelho', ja))}
${ancorasB(viaria)}
${viaria.map(p => produtoB(v, p)).join('')}
${ruaB()}
<section class="info-sec"><div class="in">${infoTec(v)}</div></section>
${ctaB(v)}`;

const imobB = v => `${capaB('Linha', 'Linha Imobiliária', 'Látex, textura, grafiato, seladora e massa niveladora, todos antimofo.', foto('parede-rolo', 'Rolo pintando parede', ja))}
${ancorasB(imob)}
${imob.map(p => produtoB(v, p)).join('')}
${paredeB(v)}
<section class="info-sec"><div class="in">${infoTec(v)}</div></section>
${ctaB(v)}`;

const repB = v => `${capaB('Representantes', 'Torne-se um representante', T.representante, foto('fabrica-latas', 'Latas de tinta Khroma', ja))}
<section class="rep"><div class="in">
  ${form('rep')}
  <div class="rep-txt"><h2>Por que representar a Khroma</h2><p>${T.sobre[1]}</p>
    <ul class="lista-check">${['Duas linhas no mesmo catálogo: demarcação viária e imobiliária', 'Produtos certificados no INMETRO e na ABNT', 'Direto da fábrica em Bom Jesus dos Perdões/SP'].map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul></div>
</div></section>`;

const canalB = v => `${capaB('Canal de vendas', 'Compre direto da fábrica', T.canal)}
<section class="contato"><div class="in">
  <div><h2>Solicitar informações</h2><p>${T.infoTecnica}</p>${form()}</div>
  <div><div class="whats-bloco">${btnWhats('btn btn-whats btn-grande', E.whatsTxt)}</div><p class="onde-end">${ic('pin')}<span>${E.endereco}<br>${E.cidade} · ${E.uf} · CEP ${E.cep}</span></p>${mapa()}</div>
</div></section>`;

const P = {
  a: { index: homeA, 'a-khroma': empresaA, 'linha-viaria': viariaA, 'linha-imobiliaria': imobA, representante: repA, 'canal-de-vendas': canalA },
  b: { index: homeB, 'a-khroma': empresaB, 'linha-viaria': viariaB, 'linha-imobiliaria': imobB, representante: repB, 'canal-de-vendas': canalB },
};
const meta = {
  index: ['Khroma Tintas · Demarcação viária e tintas imobiliárias direto do fabricante', 'Tintas de demarcação viária, termoplástico, tachas, tachões e linha imobiliária (látex, textura, grafiato). Fábrica em Bom Jesus dos Perdões/SP, certificada INMETRO e ABNT.'],
  'a-khroma': ['A Khroma · Khroma Tintas', 'Fabricante de tintas desde 2010, certificada no INMETRO e na ABNT. Missão, visão e valores.'],
  'linha-viaria': ['Linha de Demarcação Viária · Khroma Tintas', 'Tinta de demarcação base solvente e base água, diluente, termoplástico, microesfera de vidro, tacha e tachão, com ficha técnica.'],
  'linha-imobiliaria': ['Linha Imobiliária · Khroma Tintas', 'Látex Econômico, Standard e Premium, textura acrílica, grafiato, seladora acrílica e massa niveladora, com ficha técnica.'],
  representante: ['Torne-se um representante · Khroma Tintas', 'Represente a Khroma Tintas na sua região: tintas viárias e imobiliárias certificadas, direto da fábrica.'],
  'canal-de-vendas': ['Canal de vendas · Khroma Tintas', `Compre produtos Khroma direto da fábrica. WhatsApp ${E.whatsTxt}. ${E.endereco}, ${E.cidade}/${E.uf}.`],
};

for (const v of ['a', 'b']) {
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const n of nav) {
    const dir = path.join(pub, v, n.caminho);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), pagina(v, n.slug, n.caminho, ...meta[n.slug], P[v][n.slug](v)));
  }
  console.log(`khromatintas: versão ${v.toUpperCase()}, ${nav.length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
// O amarelo da marca não lê sobre fundo claro: nas telas claras o rótulo e a letra grande ficam em preto.
const claras = '<style>.es-versao:not(.es-inv) .es-eyebrow,.es-atual .es-eyebrow{color:#0E0E0E}.es-versao:not(.es-inv) .es-letra{color:rgba(14,14,14,.08)}</style>';
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#FFE600', corTextoBotao: '#0E0E0E', fundo: '#0E0E0E', claro: '#F3F3F1',
  fonteTitulo: 'Barlow,system-ui,sans-serif', fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,700;1,800;1,900&family=Inter:wght@400;500&display=swap',
  favicon: "/assets/favicon.webp", ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Fiel ao preto e amarelo do site atual. Uma faixa de asfalto com a linha amarela tracejada corre no pé de cada página e vira a linha do tempo da aplicação. As duas linhas aparecem como nos banners de hoje, com o arco amarelo.', pontos: ['Os mais buscados da home atual, com as fotos reais', 'Cada produto com a ficha técnica completa e botão de orçamento no WhatsApp', 'Linha do tempo 2010 a 2020 e selos INMETRO e ABNT'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Mais clara e comercial: topo amarelo com a foto de uma faixa de pedestre pintada, faixa zebrada como divisor e catálogo em abas. A aplicação da tinta aparece como um trecho de rua sendo pintado.', pontos: ['Catálogo em abas: viária e imobiliária', 'Fichas técnicas em tabela, látex em abas por tipo', 'WhatsApp da fábrica sempre no topo'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}).replace('</head>', `${claras}\n</head>`));
console.log('khromatintas: escolha em public/index.html');
