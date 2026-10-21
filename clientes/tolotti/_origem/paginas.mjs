// Monta as páginas das versões A ("Fachada": fiel ao site atual e à fachada pintada, branca com faixas azuis,
// a caixa de serviços com as setas azuis) e B ("Percurso": azul da marca, do guincho à entrega, serviços numerados).
// Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, servicos, percurso, fotos, tamanhos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt = fotos[n] || '', extra = '') => {
  const [w, h] = tamanhos[n];
  return `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}"${/loading=/.test(extra) ? '' : ' loading="lazy"'} decoding="async"${extra}>`;
};
const fig = (n, cls = '', legenda = fotos[n]) => `<figure${cls ? ` class="${cls}"` : ''}>${img(n)}<figcaption>${esc(legenda)}</figcaption></figure>`;

export const nomesVersao = { a: 'Fachada', b: 'Percurso' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'oficina', nome: 'A oficina', caminho: 'oficina/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  guincho: '<path d="M2 16V9h9v7M11 12h4l3 4M2 16h17"/><circle cx="6" cy="17" r="2"/><circle cx="16" cy="17" r="2"/><path d="M14 4l6 6"/>',
  estrela: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
// seta azul do site atual (bluearro.gif), redesenhada
const setaAzul = '<svg class="seta-azul" viewBox="0 0 30 20" aria-hidden="true"><path d="M1 5h15V1l13 9-13 9v-4H1z"/></svg>';
const waLink = (txt = 'Olá! Vim pelo site da Mecânica Irmãos Tolotti e gostaria de um orçamento.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;

// Logo redesenhado a partir da fachada (quadrado vermelho com a chave azul, MECÂNICA / IRMÃOS / Tolotti).
const marca = (branco = false) => `<span class="marca-lock${branco ? ' branco' : ''}"><img src="/assets/marca.svg" alt="" width="46" height="46"><span class="marca-txt"><span class="m1">Mecânica</span><span class="m2">Irmãos</span><span class="m3">Tolotti</span></span></span>`;

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
<meta name="theme-color" content="#1F3D99">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');

function topo(v, atual) {
  const guincho = `<a class="btn-guincho" href="tel:${E.celulares[0].h}">${ic('guincho')}<span>Guincho 24h</span></a>`;
  if (v === 'a') return `<div class="faixa"><div class="in">
  <span>${ic('pin')} ${E.endereco[0]}, Chapecó</span>
  <span><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></span>
  <span class="so-pc"><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></span>
</div></div>
<header class="topo"><div class="in">
  <a class="logo" href="/a/" aria-label="${E.nome}, página inicial">${marca()}</a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  ${guincho}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="logo" href="/b/" aria-label="${E.nome}, página inicial">${marca(true)}</a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></nav>
  ${guincho}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${marca(true)}<p>Mecânica, chapeação e pintura com estufa, injeção eletrônica e guincho 24 horas em Chapecó.</p></div>
  <div><h3>Endereço</h3><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Como chegar</a></div>
  <div><h3>Telefones</h3><p>${E.fones.map(f => `<a href="tel:${f.h}">${f.n}</a>`).join('<br>')}</p><p>${E.celulares.map(f => `<a href="tel:${f.h}">${f.n}</a>`).join('<br>')}</p></div>
  <div><h3>Fale com a gente</h3><p><a href="mailto:${E.email}">${E.email}</a></p><p><a href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} WhatsApp</a></p>
  <nav aria-label="Rodapé" class="rod-nav">${menu(v, '')}</nav></div>
</div><p class="rod-fim">© ${E.razao} · Chapecó, SC</p></footer>
<a class="wa-flut" href="${waLink()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('wa')}</a>`;
}

const pagina = (v, slug, titulo, descricao, corpo) => `${head(v, nav.find(n => n.slug === slug).caminho, titulo, descricao)}
<body class="v-${v} p-${slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

const nota = `<a class="nota" href="${E.mapa}" target="_blank" rel="noopener"><span class="estrelas">${ic('estrela')}${ic('estrela')}${ic('estrela')}${ic('estrela')}${ic('estrela', 'ic meia')}</span><b>${E.nota}</b> no Google · ${E.avaliacoes} avaliações</a>`;

// ---------- blocos comuns ----------
const opcoesServico = servicos.map(s => `<option value="${esc(s.nome)}">${esc(s.nome)}</option>`).join('');
const form = () => `<form class="form" id="orcamento" data-mailto="${E.email}" data-assunto="Pedido de orçamento pelo site" data-wa="${E.wa}">
  <div class="campos">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>Telefone ou WhatsApp<input name="Telefone" type="tel" required autocomplete="tel"></label>
    <label>Carro (modelo e ano)<input name="Carro" placeholder="Ex.: Corolla 2019"></label>
    <label>Serviço<select name="Serviço" data-servico><option value="">Escolha</option>${opcoesServico}<option value="Outro">Outro</option></select></label>
    <label class="largo">O que está acontecendo?<textarea name="Mensagem" rows="4" placeholder="Conte o problema ou o que precisa fazer"></textarea></label>
    <label class="check largo"><input type="checkbox" name="Seguro" value="Sim, o conserto é pelo seguro"> O conserto é pelo seguro</label>
  </div>
  <div class="form-acoes"><button class="btn btn-wa" type="button" data-envia-wa>${ic('wa')} Enviar pelo WhatsApp</button><button class="btn btn-linha" type="submit">${ic('mail')} Enviar por e-mail</button></div>
</form>`;

const contatoInfo = () => `<ul class="contato-lista">
  <li>${ic('pin')}<span><b>Endereço</b>${E.endereco.join(', ')}<br><a href="${E.mapa}" target="_blank" rel="noopener">Abrir no mapa</a></span></li>
  <li>${ic('tel')}<span><b>Telefones</b>${E.fones.map(f => `<a href="tel:${f.h}">${f.n}</a>`).join(' · ')}</span></li>
  <li>${ic('guincho')}<span><b>Celulares e guincho 24h</b>${E.celulares.map(f => `<a href="tel:${f.h}">${f.n}</a>`).join(' · ')}</span></li>
  <li>${ic('mail')}<span><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></span></li>
</ul>`;
const mapa = `<div class="mapa"><iframe title="Mapa: ${esc(E.nome)}" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

// ================= VERSÃO A · Fachada =================
const A = {
  home: () => pagina('a', 'index', `${E.nome} · Chapecó`, 'Mecânica em geral, chapeação e pintura com estufa, injeção eletrônica, limpeza de bicos, mesa alinhadora, convênio com todas as seguradoras e guincho 24 horas em Chapecó (SC).', `
<section class="hero">
  <figure class="hero-foto">${img('fachada', fotos.fachada, ' fetchpriority="high" loading="eager"')}</figure>
  <div class="in"><div class="hero-txt">
    <p class="eyebrow">${E.cidade}</p>
    <h1>Mecânica Irmãos Tolotti</h1>
    <p>Mecânica, chapeação e pintura com estufa, injeção eletrônica e guincho 24 horas. Tudo no mesmo endereço, com convênio com todas as seguradoras.</p>
    <div class="botoes"><a class="btn" href="/a/contato/#orcamento">Pedir orçamento ${ic('seta')}</a><a class="btn btn-claro" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div>
    ${nota}
  </div></div>
</section>
<div class="letreiro" aria-hidden="true"><div class="in"><span>Mecânica</span><span>Chapeação</span><span>Pintura com estufa</span><span>Injeção eletrônica</span><span>Guincho 24h</span></div></div>

<section class="servicos-home"><div class="in">
  <div class="caixa">
    <p class="eyebrow">O que fazemos</p>
    <h2>Seu carro inteiro, num lugar só.</h2>
    <ul class="lista-setas">${servicos.map(s => `<li><a href="/a/servicos/#${s.slug}">${setaAzul}<span><b>${s.nome}</b><small>${s.texto}</small></span></a></li>`).join('')}</ul>
  </div>
  <div class="trio">${fig('fachada-rua', 't1')}${fig('mecanica', 't2')}${fig('estufa', 't3')}</div>
</div></section>

<section class="seguro"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Convênio com todas as seguradoras</p><h2>Bateu o carro? A gente cuida do caminho todo.</h2><p>Do guincho até a entrega, o carro não sai da oficina e você não precisa correr atrás de orçamento.</p></div>
  <ol class="etapas">${percurso.map((p, i) => `<li><figure>${img(p.foto)}</figure><span class="n">${i + 1}</span><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ol>
</div></section>

<section class="dentro"><div class="in">
  <div class="sec-tit lado"><div><p class="eyebrow">A oficina por dentro</p><h2>Estrutura de oficina grande, atendimento de família.</h2></div><a class="link" href="/a/oficina/">Ver todas as fotos ${ic('seta')}</a></div>
  <div class="mosaico">${fig('estufa', 'g1')}${fig('mecanica', 'g2')}${fig('tintas', 'g3')}${fig('mesa', 'g4')}${fig('diagnostico', 'g5')}${fig('recepcao', 'g6')}</div>
</div></section>

<section class="equipe"><div class="in">
  <figure>${img('equipe')}</figure>
  <div class="equipe-txt"><p class="eyebrow">Equipe</p><h2>Irmãos no nome, equipe inteira no serviço.</h2><p>Mecânicos, funileiros, pintores e atendimento trabalhando no mesmo endereço. Quem recebe o seu carro acompanha o serviço até a entrega.</p><a class="btn" href="/a/contato/#orcamento">Falar com a oficina ${ic('seta')}</a></div>
</div></section>

<section class="onde"><div class="in">
  <div><p class="eyebrow">Onde estamos</p><h2>${E.endereco[0]}</h2><p>Centro de Chapecó. Precisa de guincho? Ligue a qualquer hora.</p>${contatoInfo()}</div>
  ${mapa}
</div></section>`),

  servicos: () => pagina('a', 'servicos', `Serviços · ${E.nome}`, 'Os sete serviços da Mecânica Irmãos Tolotti em Chapecó: mecânica, chapeação e pintura com estufa, injeção eletrônica, bicos, seguradoras, guincho 24 horas e mesa alinhadora.', `
<section class="capa"><div class="in"><p class="eyebrow">Serviços</p><h1>Tudo o que o seu carro precisa, da revisão ao conserto depois da batida.</h1></div></section>
<nav class="indice" aria-label="Serviços"><div class="in">${servicos.map(s => `<a href="#${s.slug}">${s.curto}</a>`).join('')}</div></nav>
<section class="serv-lista"><div class="in">${servicos.map((s, i) => `
  <article class="serv" id="${s.slug}">
    <figure>${img(s.foto, s.alt)}</figure>
    <div class="serv-txt"><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${s.nome}</h2><p>${s.texto}</p>
    <a class="link" href="/a/contato/?servico=${encodeURIComponent(s.nome)}#orcamento">Pedir orçamento ${ic('seta')}</a></div>
  </article>`).join('')}
</div></section>
<section class="faixa-guincho"><div class="in"><div><h2>Guincho 24 horas</h2><p>Carro parado na estrada ou na garagem? Ligue para o celular de plantão.</p></div><div class="botoes">${E.celulares.map(c => `<a class="btn btn-branco" href="tel:${c.h}">${ic('tel')} ${c.n}</a>`).join('')}</div></div></section>`),

  oficina: () => pagina('a', 'oficina', `A oficina · ${E.nome}`, 'Fotos da Mecânica Irmãos Tolotti em Chapecó: fachada, área de mecânica, estufa de pintura, laboratório de tintas, mesa alinhadora, diagnóstico eletrônico e equipe.', `
<section class="capa"><div class="in"><p class="eyebrow">A oficina</p><h1>Mecânica, funilaria e pintura no mesmo pátio.</h1><p>Fotos da nossa estrutura em Chapecó.</p></div></section>
${[
  ['Fachada e pátio', ['fachada', 'fachada-lado', 'patio', 'patio-fundos']],
  ['Mecânica e diagnóstico', ['mecanica', 'diagnostico', 'bicos']],
  ['Chapeação e pintura', ['estufa', 'tintas', 'mesa', 'mesa-frente', 'chapeacao', 'box']],
  ['Atendimento, equipe e guincho', ['recepcao', 'equipe', 'guincho']],
].map(([t, fs], i) => `<section class="galeria${i % 2 ? ' alt' : ''}"><div class="in"><h2>${t}</h2><div class="grade n${fs.length}">${fs.map(f => fig(f)).join('')}</div></div></section>`).join('')}
<section class="faixa-guincho"><div class="in"><div><h2>Quer conhecer pessoalmente?</h2><p>${E.endereco.join(', ')}.</p></div><div class="botoes"><a class="btn btn-branco" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Como chegar</a></div></div></section>`),

  contato: () => pagina('a', 'contato', `Contato · ${E.nome}`, `Peça um orçamento para a Mecânica Irmãos Tolotti: ${E.fone}, ${E.email}, ${E.endereco.join(', ')}.`, `
<section class="capa"><div class="in"><p class="eyebrow">Contato</p><h1>Peça seu orçamento.</h1><p>Conte o que o carro tem e a oficina responde pelo WhatsApp ou por e-mail.</p></div></section>
<section class="contato"><div class="in">
  <div>${form()}</div>
  <aside>${contatoInfo()}</aside>
</div></section>
<section class="onde so-mapa"><div class="in">${mapa}</div></section>`),
};

// ================= VERSÃO B · Percurso =================
const B = {
  home: () => pagina('b', 'index', `${E.nome} · Do guincho à entrega`, 'Oficina completa em Chapecó (SC): mecânica, chapeação e pintura com estufa, injeção eletrônica, mesa alinhadora, convênio com todas as seguradoras e guincho 24 horas.', `
<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">Mecânica Irmãos Tolotti · ${E.cidade}</p>
    <h1>Do guincho à entrega, na mesma oficina.</h1>
    <p>Mecânica, chapeação e pintura com estufa, injeção eletrônica e mesa alinhadora. Convênio com todas as seguradoras e guincho 24 horas.</p>
    <div class="botoes"><a class="btn" href="/b/contato/#orcamento">Pedir orçamento ${ic('seta')}</a><a class="btn btn-claro" href="tel:${E.celulares[0].h}">${ic('guincho')} Chamar o guincho</a></div>
    ${nota}
  </div>
  <div class="hero-fotos">
    <figure class="f1">${img('estufa', fotos.estufa, ' fetchpriority="high" loading="eager"')}</figure>
    <figure class="f2">${img('fachada-lado', fotos['fachada-lado'], ' loading="eager"')}</figure>
    <span class="selo"><img src="/assets/marca.svg" alt="" width="64" height="64"></span>
  </div>
</div></section>

<section class="indice-serv"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Serviços</p><h2>Sete serviços, um endereço.</h2></div>
  <ol class="linhas">${servicos.map((s, i) => `<li><a href="/b/servicos/#${s.slug}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${s.nome}</span><span class="d">${s.texto}</span><span class="mini">${img(s.foto, '')}</span>${ic('seta')}</a></li>`).join('')}</ol>
</div></section>

<section class="percurso"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Convênio com todas as seguradoras</p><h2>O caminho do seu carro depois da batida.</h2><p>Você liga uma vez. O resto acontece dentro da oficina.</p></div>
  <ol class="trilha">${percurso.map((p, i) => `<li><figure>${img(p.foto)}</figure><div><span class="n">Etapa ${i + 1}</span><h3>${p.t}</h3><p>${p.d}</p></div></li>`).join('')}</ol>
</div></section>

<section class="faixa-24h"><div class="in">
  <div><p class="eyebrow">Guincho 24 horas</p><h2>Parou? Ligue.</h2></div>
  <div class="tels">${E.celulares.map(c => `<a href="tel:${c.h}">${c.n}</a>`).join('')}</div>
</div></section>

<section class="rolo"><div class="in">
  <div class="sec-tit lado"><div><p class="eyebrow">A oficina</p><h2>Por dentro da Tolotti.</h2></div><a class="link" href="/b/oficina/">Ver a oficina ${ic('seta')}</a></div>
</div>
<div class="rolo-trilho">${['mecanica', 'tintas', 'mesa-frente', 'recepcao', 'diagnostico', 'equipe', 'guincho'].map(f => fig(f)).join('')}</div>
</section>

<section class="onde"><div class="in">
  <div><p class="eyebrow">Onde estamos</p><h2>${E.endereco[0]}, Chapecó.</h2>${contatoInfo()}</div>
  ${mapa}
</div></section>`),

  servicos: () => pagina('b', 'servicos', `Serviços · ${E.nome}`, 'Mecânica em geral, chapeação e pintura com estufa, injeção eletrônica e elétrica, limpeza de bicos, seguradoras, guincho 24 horas e mesa alinhadora em Chapecó.', `
<section class="capa"><div class="in"><p class="eyebrow">Serviços</p><h1>Sete serviços, um endereço.</h1><p>Da troca de óleo ao conserto depois da batida, o carro fica com a mesma equipe.</p></div></section>
<section class="serv-b"><div class="in">
  <nav class="serv-indice" aria-label="Serviços">${servicos.map((s, i) => `<a href="#${s.slug}"><span>${String(i + 1).padStart(2, '0')}</span>${s.curto}</a>`).join('')}</nav>
  <div class="serv-blocos">${servicos.map((s, i) => `
    <article id="${s.slug}"><figure>${img(s.foto, s.alt)}</figure><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${s.nome}</h2><p>${s.texto}</p>
    <a class="btn btn-linha" href="/b/contato/?servico=${encodeURIComponent(s.nome)}#orcamento">Orçar este serviço ${ic('seta')}</a></article>`).join('')}
  </div>
</div></section>`),

  oficina: () => pagina('b', 'oficina', `A oficina · ${E.nome}`, 'A estrutura da Mecânica Irmãos Tolotti em Chapecó: estufa de pintura, laboratório de tintas, mesa alinhadora, diagnóstico eletrônico, guincho próprio e equipe.', `
<section class="capa"><div class="in"><p class="eyebrow">A oficina</p><h1>Por dentro da Tolotti.</h1><p>Cada etapa do conserto tem o seu espaço e o seu equipamento.</p></div></section>
<section class="estrutura"><div class="in">${[
  ['estufa', 'Estufa de pintura', 'A pintura é feita em cabine fechada, com luz e temperatura controladas, sem poeira no acabamento.'],
  ['tintas', 'Laboratório de tintas', 'A cor é preparada na própria oficina para bater com a pintura original do carro.'],
  ['mesa-frente', 'Mesa alinhadora', 'Carro batido volta às medidas de fábrica antes da funilaria.'],
  ['mecanica', 'Mecânica com elevadores', 'Boxes com elevador para motor, suspensão, freios e revisões.'],
  ['diagnostico', 'Diagnóstico eletrônico', 'Aparelhos computadorizados para injeção eletrônica e parte elétrica.'],
  ['recepcao', 'Recepção', 'Atendimento, orçamento e contato com as seguradoras.'],
  ['guincho', 'Guincho próprio', 'Plantão 24 horas para buscar o carro onde ele parou.'],
].map(([f, t, d], i) => `<article class="${i % 2 ? 'inv' : ''}"><figure>${img(f)}</figure><div><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${t}</h2><p>${d}</p></div></article>`).join('')}
</div></section>
<section class="equipe-b"><div class="in"><figure>${img('equipe')}</figure><div><p class="eyebrow">Equipe</p><h2>A equipe Tolotti.</h2><p>Mecânicos, funileiros, pintores e atendimento no mesmo endereço, em Chapecó.</p></div></div></section>
<section class="faixa-24h"><div class="in"><div><p class="eyebrow">Fachada</p><h2>${E.endereco[0]}</h2></div><div class="tels"><a href="${E.mapa}" target="_blank" rel="noopener">Como chegar</a></div></div></section>`),

  contato: () => pagina('b', 'contato', `Contato · ${E.nome}`, `Orçamento e guincho 24 horas da Mecânica Irmãos Tolotti: ${E.fone}, ${E.email}.`, `
<section class="capa"><div class="in"><p class="eyebrow">Contato</p><h1>Conte o que o carro tem.</h1><p>Resposta pelo WhatsApp ou por e-mail. Guincho: ligue direto.</p></div></section>
<section class="contato"><div class="in">
  <div>${form()}</div>
  <aside>${contatoInfo()}${mapa}</aside>
</div></section>`),
};

export function gerarVersao(v) {
  const X = v === 'a' ? A : B;
  return { index: X.home(), servicos: X.servicos(), oficina: X.oficina(), contato: X.contato() };
}
