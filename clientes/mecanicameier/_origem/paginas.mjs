// Monta as páginas das versões A ("Oficina": escura como o site atual, placa vermelha do logo, banner com as listas de serviço
// dos dois lados da foto, faixa de marcas, Missão e Visão) e B ("Precisão": clara, foto grande da oficina, história dos mícrons,
// especialidades em abas, etapas do atendimento). Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, missao, visao, historia, especialidades, servicos, administramos, bannerEsq, bannerDir, marcas, fotos, gruposFotos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const legenda = Object.fromEntries(fotos.map(([f, l]) => [f, l]));
const img = (f, alt = legenda[f] || '', { p = false, cls = '', lazy = true, w = 1600, h = 1200 } = {}) =>
  `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${p ? 'p-' : ''}${f}.webp" alt="${esc(alt)}" width="${p ? 640 : w}" height="${p ? 480 : h}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async">`;
const anos = new Date().getFullYear() - 1990;

export const nomesVersao = { a: 'Oficina', b: 'Precisão' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'fotos', nome: 'Fotos', caminho: 'fotos/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  estrela: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor" stroke="none"/>',
  cambio: '<rect x="9" y="2.5" width="6" height="6" rx="3"/><path d="M12 8.5V21M7 13h10M7 13v4M17 13v4M12 13"/>',
  scanner: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M7 21h10M12 17v4M6.5 13l2.5-3 2.5 2 3-4 3 5"/>',
  chave: '<path d="M14.5 6.5a4 4 0 00-5.3 5.3L3.5 17.5l3 3 5.7-5.7a4 4 0 005.3-5.3l-2.5 2.5-2.5-.5-.5-2.5z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  relogio: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  ant: '<path d="M15 18l-6-6 6-6"/>', prox: '<path d="M9 18l6-6-6-6"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da Mecânica Meier e gostaria de agendar um serviço.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;
const tel = (cls = '') => `<a class="${cls}" href="tel:${E.foneHref}">${ic('tel')}<span>${E.fone}</span></a>`;

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
<meta name="theme-color" content="${v === 'a' ? '#141414' : '#ffffff'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Urbanist:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');

function topo(v, atual) {
  const btnMenu = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
  if (v === 'a') return `<div class="faixa"><div class="in">
  <span>${ic('pin')} ${E.rua} · ${E.bairro} · Joinville</span>
  <span class="faixa-tel"><a href="tel:${E.foneHref}">${E.fone}</a> / <a href="tel:${E.fone2Href}">${E.fone2}</a></span>
</div></div>
<header class="topo"><div class="in">
  <a class="placa" href="/a/" aria-label="Mecânica Meier, página inicial"><img src="/assets/logo.svg" alt="Adelino Meier Mecânica Automotiva" width="212" height="61"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="btn btn-red so-pc" href="/a/contato/#agendar">Agendar serviço</a>
  ${btnMenu}
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Mecânica Meier, página inicial"><img src="/assets/logo-claro.svg" alt="Meier Mecânica Automotiva" width="186" height="52"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  ${tel('btn btn-dark topo-tel')}
  ${btnMenu}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-escuro.svg" alt="Meier Mecânica Automotiva" width="186" height="52"><p>${E.slogan}.</p><p class="lema">“${E.lema}”</p></div>
  <div><h3>Endereço</h3><p>${E.rua}<br>${E.bairro} · ${E.cidade}<br>CEP ${E.cep}<br><small>${E.referencia}</small></p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Como chegar</a></div>
  <div><h3>Telefones</h3><p><a href="tel:${E.foneHref}">${E.fone}</a><br><a href="tel:${E.fone2Href}">${E.fone2}</a></p><a class="rod-link" href="/${v}/contato/#agendar">${ic('seta')} Agendar serviço</a></div>
  <div><h3>Site</h3><nav class="rod-nav" aria-label="Rodapé">${menu(v, '')}</nav></div>
</div><div class="in rod-fim"><span>© ${new Date().getFullYear()} ${E.razao}</span><span>Câmbio automático · Importados · Nacionais · Antigos</span></div></footer>
<a class="fone-flutua" href="tel:${E.foneHref}" aria-label="Ligar para a Mecânica Meier">${ic('tel')}</a>`;
}

const pagina = (v, slug, titulo, descricao, corpo) => `${head(v, slug === 'index' ? '' : `${slug}/`, titulo, descricao)}
<body class="v-${v} p-${slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>`;

// ---------- blocos usados nas duas versões ----------
const faixaMarcas = (titulo) => `<section class="marcas" aria-label="Marcas atendidas">
  <div class="in"><p class="rotulo">${titulo}</p></div>
  <div class="marcas-trilho"><ul class="marcas-lista">${[...marcas, ...marcas].map(([f, n], k) => `<li${k >= marcas.length ? ' aria-hidden="true"' : ''}><img src="/assets/img/marcas/${f}.png" alt="${k >= marcas.length ? '' : n}" title="${n}" width="60" height="60" loading="lazy"></li>`).join('')}</ul></div>
</section>`;

const listaServicos = (v) => `<div class="serv-grupos">${servicos.map((g, k) => `<section class="serv-grupo" id="g${k + 1}">
  <h2><span class="n">${String(k + 1).padStart(2, '0')}</span>${g.grupo}</h2>
  <ul>${g.itens.map(i => `<li>${ic('check')}<span>${esc(i)}</span></li>`).join('')}</ul>
</section>`).join('')}</div>
<section class="admin">
  <div><p class="rotulo">Administramos</p><h2>Também cuidamos do resto, com parceiros de confiança</h2><p>Você deixa o carro na Meier e a gente coordena os serviços feitos fora, do guincho à película.</p></div>
  <ul class="chips">${administramos.map(a => `<li>${esc(a)}</li>`).join('')}</ul>
</section>`;

const galeria = (v) => `<div class="filtros" role="group" aria-label="Filtrar fotos">
  <button type="button" aria-pressed="true" data-filtro="">Todas <small>${fotos.length}</small></button>
  ${Object.entries(gruposFotos).map(([k, n]) => `<button type="button" aria-pressed="false" data-filtro="${k}">${n} <small>${fotos.filter(f => f[2] === k).length}</small></button>`).join('')}
</div>
<ul class="galeria" data-galeria>${fotos.map(([f, l, g]) => `<li data-grupo="${g}"><a href="/assets/img/${f}.webp" data-legenda="${esc(l)}">${img(f, l, { p: true })}<span>${esc(l)}</span></a></li>`).join('')}</ul>
<dialog class="luz" aria-label="Foto ampliada"><figure><img alt=""><figcaption></figcaption></figure>
  <button type="button" class="luz-x" aria-label="Fechar">${ic('x')}</button><button type="button" class="luz-ant" aria-label="Foto anterior">${ic('ant')}</button><button type="button" class="luz-prox" aria-label="Próxima foto">${ic('prox')}</button></dialog>`;

const formulario = (v) => `<form class="form" id="agendar" data-wa="${E.wa}" data-assunto="Agendamento pelo site da Mecânica Meier">
  <h2>Agende ou peça um orçamento</h2>
  <p class="form-nota">Preencha e envie pelo WhatsApp. Se preferir, ligue: <a href="tel:${E.foneHref}">${E.fone}</a>.</p>
  <div class="campos">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>Telefone<input name="Telefone" required type="tel" autocomplete="tel" inputmode="tel"></label>
    <label>Carro, modelo e ano<input name="Carro" placeholder="Ex.: BMW 320i 2012" required></label>
    <label>Serviço<select name="Serviço">${['Câmbio automático', 'Revisão e troca de óleo', 'Diagnóstico com scanner', 'Freios, suspensão ou direção', 'Motor ou injeção', 'Veículo antigo', 'Outro'].map(s => `<option>${s}</option>`).join('')}</select></label>
    <label class="larga">O que está acontecendo com o carro?<textarea name="Mensagem" rows="4" placeholder="Ex.: o câmbio está dando tranco na troca da 2ª para a 3ª"></textarea></label>
  </div>
  <div class="form-acoes"><button class="btn btn-red" type="submit">${ic('wa')} Enviar pelo WhatsApp</button><a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')} Ligar agora</a></div>
</form>`;

const blocoEndereco = () => `<div class="endereco">
  <h2>Onde estamos</h2>
  <p class="end-rua">${E.rua}<br>${E.bairro} · ${E.cidade}</p>
  <p class="end-ref">${E.referencia} · CEP ${E.cep}</p>
  <p class="end-tel"><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a href="tel:${E.fone2Href}">${ic('tel')} ${E.fone2}</a></p>
  <a class="btn btn-linha" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Abrir no Google Maps</a>
</div>
<div class="mapa"><iframe title="Mapa: ${E.rua}, ${E.bairro}, Joinville" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

const nota = () => `<div class="nota-google"><span class="estrelas" aria-hidden="true">${ic('estrela')}${ic('estrela')}${ic('estrela')}${ic('estrela')}${ic('estrela')}</span><b>${E.google.nota}</b><span>no Google · ${E.google.avaliacoes} avaliações</span></div>`;

// ================= VERSÃO A: OFICINA =================
const A = {
  index: () => pagina('a', 'index', 'Mecânica Meier · Câmbio automático e mecânica multimarcas em Joinville', `Oficina familiar no Bom Retiro, Joinville, desde 1990. Especialista em câmbio automático, importados, nacionais e antigos. ${E.fone}.`, `
<section class="banner">
  <div class="in banner-grade">
    <ul class="banner-lista esq" aria-label="Serviços">${bannerEsq.map(s => `<li>${s}</li>`).join('')}</ul>
    <div class="banner-foto">
      <div class="slides" data-slides>
        <figure class="on">${img('oficina-bmw', 'BMW no elevador da oficina', { lazy: false })}</figure>
        <figure>${img('meier-17', 'O galpão da Mecânica Meier')}</figure>
        <figure>${img('camaro-raiter', 'Chevrolet Camaro na oficina')}</figure>
        <figure>${img('porsche-cayenne-3.6-v6', 'Porsche Cayenne na oficina')}</figure>
      </div>
      <div class="banner-txt">
        <p class="selo-cambio">Câmbio automático</p>
        <h1>Mecânica geral e multimarcas em Joinville</h1>
        <p>Oficina da família Meier desde 1990. Importados, nacionais e antigos.</p>
        <div class="acoes"><a class="btn btn-red" href="/a/contato/#agendar">Agendar serviço ${ic('seta')}</a>${tel('btn btn-claro')}</div>
      </div>
      <div class="slides-pontos" data-slides-pontos></div>
    </div>
    <ul class="banner-lista dir" aria-label="Mais serviços">${bannerDir.map(s => `<li>${s}</li>`).join('')}</ul>
  </div>
</section>

${faixaMarcas('Atendemos nacionais e importados de todas estas marcas')}

<section class="mv xadrez">
  <div class="in mv-grade">
    <div class="mv-item"><h2>Missão</h2><p>${missao}</p></div>
    <div class="mv-item"><h2>Visão</h2><p>${visao[0]}</p><p>${visao[1].replace('atendimento personalizado ao cliente', '<strong>atendimento personalizado ao cliente</strong>')}</p></div>
    <blockquote class="mv-lema"><p>${E.lema}</p><cite>O lema da casa</cite></blockquote>
  </div>
</section>

<section class="espec">
  <div class="in"><p class="rotulo">Especialidades</p><h2 class="tit">Quatro frentes, a mesma oficina</h2></div>
  <div class="espec-faixas">${especialidades.map((e, k) => `<a class="espec-faixa" href="/a/servicos/#g${[1, 5, 6, 3][k]}">
    ${img(e.foto, e.nome)}<span class="espec-n">0${k + 1}</span><span class="espec-txt"><b>${e.nome}</b><span>${e.texto}</span></span></a>`).join('')}</div>
</section>

<section class="cambio-dest">
  <div class="in cambio-grade">
    <div class="cambio-foto">${img('bmw-x5-8-c', 'BMW X5 no elevador da Mecânica Meier')}<p class="cambio-placa">Mecânica geral / multimarcas<b>Câmbio Automático</b></p></div>
    <div>
      <p class="rotulo">A especialidade da casa</p>
      <h2 class="tit">Câmbio automático e Tiptronic, com quem estudou na fonte</h2>
      <p>Desde a chegada dos importados, nos anos 90, a equipe se especializou em câmbio automático com cursos e estágios na Europa. Hoje fazemos o diagnóstico com scanner, o reparo e a troca de óleo do câmbio na mesma casa.</p>
      <ul class="lista-ic">
        <li>${ic('scanner')}<span><b>Diagnóstico com scanner</b> para nacionais e importados que rodam no Brasil</span></li>
        <li>${ic('cambio')}<span><b>Câmbio automático, Tiptronic e mecânico</b>, embreagem, transmissão e diferencial</span></li>
        <li>${ic('chave')}<span><b>Troca de óleo do câmbio</b> automático e mecânico, junto com a revisão</span></li>
      </ul>
      <a class="btn btn-red" href="/a/contato/#agendar">Agendar avaliação do câmbio ${ic('seta')}</a>
    </div>
  </div>
</section>

<section class="numeros xadrez">
  <div class="in num-grade">
    <p><b>1990</b><span>ano de fundação, ${anos} anos de oficina</span></p>
    <p><b>11</b><span>pessoas na equipe, com engenheiro mecânico</span></p>
    <p><b>23</b><span>marcas atendidas, nacionais e importadas</span></p>
    ${nota()}
  </div>
  <div class="in"><blockquote class="depo">“${E.google.frase}”<cite>Avaliação no Google</cite></blockquote></div>
</section>

<section class="fotos-tira">
  <div class="in tira-topo"><div><p class="rotulo">Fotos</p><h2 class="tit">Passaram pela oficina</h2></div><a class="btn btn-linha" href="/a/fotos/">Ver todas as fotos ${ic('seta')}</a></div>
  <div class="tira">${['mustang-shelby', 'mercedes-c180-kompressor', 'maverick-raiter', 'bmw-330i', 'impala', 'audi-a3', 'galaxie-2013-lateral'].map(f => `<figure>${img(f, legenda[f], { p: true })}<figcaption>${legenda[f]}</figcaption></figure>`).join('')}</div>
</section>

<section class="contato-faixa">
  <div class="in contato-grade">${blocoEndereco()}</div>
</section>`),

  empresa: () => pagina('a', 'empresa', 'Empresa · Mecânica Meier', 'A Auto Mecânica Adelino Meier nasceu em 1990, idealizada por Adelino Meier e seus filhos. Empresa familiar com sede própria em Joinville.', `
<section class="cab-pag xadrez"><div class="in">
  <p class="rotulo">Empresa</p><h1>Uma oficina nascida na ferramentaria</h1>
  <p class="cab-sub">A Auto Mecânica Adelino Meier nasceu em 1990, idealizada por Adelino Meier e seus filhos. É uma empresa familiar, com sede própria no Bom Retiro.</p>
</div></section>

<section class="emp-intro"><div class="in emp-grade">
  <figure class="emp-fachada">${img('meier-14', 'Recepção e elevadores da Mecânica Meier')}<figcaption>A oficina na Rua Frederico Schlemm, 58</figcaption></figure>
  <div>
    <p class="destaque">Somos especialistas em câmbio automático, manutenção de importados, conserto de veículos antigos e reparo de nacionais.</p>
    <p>Fazemos super troca de óleo e temos scanner automotivo para os veículos nacionais e importados que rodam no Brasil. A equipe tem 11 pessoas, com mestre engenheiro mecânico, técnicos e escritório.</p>
    <img class="emp-fachada-antiga" src="/assets/img/fachada.webp" alt="Fachada da Mecânica Meier" width="400" height="300" loading="lazy">
  </div>
</div></section>

<section class="linha-tempo xadrez" aria-label="Nossa história"><div class="in">
  <p class="rotulo">Nossa história</p><h2 class="tit">De 1968 até hoje</h2>
  <ol class="lt">${historia.map(h => `<li><span class="lt-ano">${h.ano}</span><div><h3>${h.titulo}</h3><p>${h.texto}</p></div></li>`).join('')}</ol>
</div></section>

<section class="mv"><div class="in mv-grade">
  <div class="mv-item"><h2>Missão</h2><p>${missao}</p></div>
  <div class="mv-item"><h2>Visão</h2><p>${visao.join(' ')}</p></div>
  <blockquote class="mv-lema"><p>${E.lema}</p><cite>O lema da casa</cite></blockquote>
</div></section>

${faixaMarcas('Formação e prática em todas estas marcas')}`),

  servicos: () => pagina('a', 'servicos', 'Serviços · Mecânica Meier', 'Câmbio automático, motor, injeção eletrônica, freios ABS, suspensão, direção, scanner, restauração de antigos e mais. Mecânica Meier, Joinville.', `
<section class="cab-pag xadrez"><div class="in">
  <p class="rotulo">Serviços</p><h1>Do óleo ao câmbio automático</h1>
  <p class="cab-sub">Tudo o que a Meier faz na própria oficina, e o que administramos com parceiros.</p>
  <nav class="ancoras" aria-label="Grupos de serviço">${servicos.map((g, k) => `<a href="#g${k + 1}">${g.grupo}</a>`).join('')}</nav>
</div></section>
<section class="serv"><div class="in">${listaServicos('a')}</div></section>
<section class="cta-faixa"><div class="in"><h2>Não achou o serviço na lista?</h2><p>Ligue e conte o que o carro está fazendo.</p><div class="acoes">${tel('btn btn-claro')}<a class="btn btn-red" href="/a/contato/#agendar">Agendar ${ic('seta')}</a></div></div></section>`),

  fotos: () => pagina('a', 'fotos', 'Fotos · Mecânica Meier', 'Importados, antigos e nacionais que passaram pela Mecânica Meier, em Joinville.', `
<section class="cab-pag xadrez"><div class="in">
  <p class="rotulo">Fotos</p><h1>Carros que passaram pela oficina</h1>
  <p class="cab-sub">De BMW e Porsche a Maverick e Galaxie. Toque numa foto para ampliar.</p>
</div></section>
<section class="fotos-pag"><div class="in">${galeria('a')}</div></section>`),

  contato: () => pagina('a', 'contato', 'Contato · Mecânica Meier', `Agende pelo WhatsApp ou ligue ${E.fone}. ${E.rua}, ${E.bairro}, Joinville.`, `
<section class="cab-pag xadrez"><div class="in">
  <p class="rotulo">Contato</p><h1>Fale com a Meier</h1>
  <p class="cab-sub">${E.fone} · ${E.fone2} · ${E.rua}, ${E.bairro}</p>
</div></section>
<section class="contato-pag"><div class="in contato-pag-grade">${formulario('a')}<div class="contato-lado">${blocoEndereco()}</div></div></section>`),
};

// ================= VERSÃO B: PRECISÃO =================
const B = {
  index: () => pagina('b', 'index', 'Mecânica Meier · Câmbio automático, importados e antigos em Joinville', `Oficina familiar no Bom Retiro, Joinville, desde 1990. Câmbio automático, importados, nacionais e antigos. ${E.fone}.`, `
<section class="hero">
  ${img('meier-17', 'O galpão da Mecânica Meier com carros nos elevadores', { lazy: false, cls: 'hero-foto' })}
  <div class="in hero-txt">
    <p class="rotulo claro">Joinville · desde 1990</p>
    <h1>Câmbio automático, importados e antigos.</h1>
    <p class="hero-sub">Oficina da família Meier no Bom Retiro: 11 pessoas, formação na Europa e scanner para nacionais e importados.</p>
    <div class="acoes"><a class="btn btn-red" href="/b/contato/#agendar">Agendar serviço ${ic('seta')}</a>${tel('btn btn-vidro')}</div>
  </div>
  <div class="hero-nota">${nota()}</div>
</section>

<section class="micron"><div class="in micron-grade">
  <div>
    <p class="rotulo">Desde a ferramentaria</p>
    <h2 class="tit">Precisão na casa dos mícrons</h2>
    <p class="destaque">Antes da oficina, Adelino Meier passou 22 anos fazendo ferramentas para motores e compressores, onde o erro aceito se mede em mícrons.</p>
    <p>Em 1990 ele fundou a Meier com os filhos. Quando os importados chegaram, a equipe foi estudar na Audi, Porsche, VW, Mercedes e BMW. É esse cuidado que vai para o seu carro.</p>
    <a class="link-seta" href="/b/empresa/">Conheça a história ${ic('seta')}</a>
  </div>
  <dl class="micron-num">
    <div><dt>Fundação</dt><dd>1990</dd></div>
    <div><dt>Na equipe</dt><dd>11</dd></div>
    <div><dt>Marcas atendidas</dt><dd>23</dd></div>
    <div><dt>Estágios na Europa</dt><dd>5</dd></div>
  </dl>
</div></section>

<section class="espec-b">
  <div class="in"><p class="rotulo">Especialidades</p><h2 class="tit">Cada carro com quem entende dele</h2></div>
  <div class="in abas">
    <div class="abas-lista" role="tablist" aria-label="Especialidades">${especialidades.map((e, k) => `<button role="tab" id="t-${e.slug}" aria-controls="p-${e.slug}" aria-selected="${k === 0}"><span>0${k + 1}</span>${e.nome}</button>`).join('')}</div>
    ${especialidades.map((e, k) => `<div class="aba" role="tabpanel" id="p-${e.slug}" aria-labelledby="t-${e.slug}"${k ? ' hidden' : ''}>
      ${img(e.foto, e.nome)}
      <div class="aba-txt"><h3>${e.nome}</h3><p>${e.texto}</p><a class="link-seta" href="/b/servicos/#g${[1, 5, 6, 3][k]}">Ver serviços ${ic('seta')}</a></div>
    </div>`).join('')}
  </div>
</section>

<section class="etapas-sec"><div class="in">
  <p class="rotulo">Como funciona</p><h2 class="tit">Do telefonema à entrega</h2>
  <ol class="etapas">
    <li><span class="et-ic">${ic('tel')}</span><b>Agende</b><p>Ligue ou mande o pedido pelo site, com o carro e o que ele está fazendo.</p></li>
    <li><span class="et-ic">${ic('scanner')}</span><b>Avaliação técnica</b><p>Diagnóstico com scanner e avaliação mecânica do veículo.</p></li>
    <li><span class="et-ic">${ic('chave')}</span><b>Reparo</b><p>A equipe de técnicos e engenheiro mecânico faz o serviço na oficina própria.</p></li>
    <li><span class="et-ic">${ic('check')}</span><b>Entrega</b><p>${E.lema}: o carro volta pronto para rodar.</p></li>
  </ol>
</div></section>

<section class="serv-resumo"><div class="in sr-grade">
  <div><p class="rotulo">Serviços</p><h2 class="tit">Mecânica completa, em um só lugar</h2><p>Da super troca de óleo à retífica de motor, e os serviços que administramos com parceiros.</p><a class="btn btn-dark" href="/b/servicos/">Todos os serviços ${ic('seta')}</a></div>
  <ul class="sr-lista">${servicos.map((g, k) => `<li><a href="/b/servicos/#g${k + 1}"><span class="n">${String(k + 1).padStart(2, '0')}</span><b>${g.grupo}</b><small>${g.itens.slice(0, 3).join(' · ')}</small>${ic('seta')}</a></li>`).join('')}</ul>
</div></section>

${faixaMarcas('Nacionais e importados de 23 marcas')}

<section class="mosaico-sec"><div class="in">
  <div class="tira-topo"><div><p class="rotulo">Fotos</p><h2 class="tit">Da oficina</h2></div><a class="link-seta" href="/b/fotos/">Ver as ${fotos.length} fotos ${ic('seta')}</a></div>
  <div class="mosaico">${['mustang-shelby', 'oficina-jetta-bmw', 'mercedes-c180-kompressor', 'maverick-lino', 'bmw-x3', 'impala'].map(f => `<figure>${img(f, legenda[f], { p: true })}<figcaption>${legenda[f]}</figcaption></figure>`).join('')}</div>
</div></section>

<section class="cta-b"><div class="in cta-b-grade">
  <div><h2>${E.lema}.</h2><p>${E.rua} · ${E.bairro} · Joinville · ${E.referencia}</p></div>
  <div class="acoes">${tel('btn btn-branco')}<a class="btn btn-vidro" href="/b/contato/#agendar">Agendar pelo site ${ic('seta')}</a></div>
</div></section>`),

  empresa: () => pagina('b', 'empresa', 'Empresa · Mecânica Meier', 'A Auto Mecânica Adelino Meier nasceu em 1990, idealizada por Adelino Meier e seus filhos. Empresa familiar com sede própria em Joinville.', `
<section class="cab-b"><div class="in cab-b-grade">
  <div><p class="rotulo">Empresa</p><h1>Uma empresa familiar, com sede própria, desde 1990</h1>
  <p class="cab-sub">A Auto Mecânica Adelino Meier foi idealizada por Adelino Meier e seus filhos, depois de 22 anos de ferramentaria e um curso de Mecânica Automotiva no SENAI.</p></div>
  <figure>${img('alemaes', 'Pátio da Mecânica Meier', { lazy: false })}</figure>
</div></section>

<section class="lt-b"><div class="in">
  <h2 class="tit">Nossa história</h2>
  <ol class="lt-h">${historia.map((h, k) => `<li><span class="lt-ano">${h.ano}</span><h3>${h.titulo}</h3><p>${h.texto}</p></li>`).join('')}</ol>
</div></section>

<section class="emp-b"><div class="in emp-b-grade">
  ${img('meier-14', 'Recepção e elevadores da Mecânica Meier')}
  <div>
    <p class="destaque">Somos especialistas em câmbio automático, manutenção de importados, conserto de veículos antigos e reparo de nacionais.</p>
    <p>Fazemos super troca de óleo e temos scanner automotivo para os veículos nacionais e importados que rodam no Brasil. A equipe tem 11 pessoas, com mestre engenheiro mecânico, técnicos e escritório.</p>
    <dl class="mv-b">
      <div><dt>Missão</dt><dd>${missao}</dd></div>
      <div><dt>Visão</dt><dd>${visao.join(' ')}</dd></div>
      <div><dt>Lema</dt><dd>“${E.lema}”</dd></div>
    </dl>
  </div>
</div></section>`),

  servicos: () => pagina('b', 'servicos', 'Serviços · Mecânica Meier', 'Câmbio automático, motor, injeção eletrônica, freios ABS, suspensão, direção, scanner, restauração de antigos e mais. Mecânica Meier, Joinville.', `
<section class="cab-b cab-b-simples"><div class="in">
  <p class="rotulo">Serviços</p><h1>Mecânica completa para nacionais, importados e antigos</h1>
  <nav class="ancoras" aria-label="Grupos de serviço">${servicos.map((g, k) => `<a href="#g${k + 1}">${g.grupo}</a>`).join('')}</nav>
</div></section>
<section class="serv"><div class="in">${listaServicos('b')}</div></section>
<section class="cta-b"><div class="in cta-b-grade"><div><h2>Não achou o serviço na lista?</h2><p>Ligue e conte o que o carro está fazendo.</p></div><div class="acoes">${tel('btn btn-branco')}<a class="btn btn-vidro" href="/b/contato/#agendar">Agendar ${ic('seta')}</a></div></div></section>`),

  fotos: () => pagina('b', 'fotos', 'Fotos · Mecânica Meier', 'Importados, antigos e nacionais que passaram pela Mecânica Meier, em Joinville.', `
<section class="cab-b cab-b-simples"><div class="in">
  <p class="rotulo">Fotos</p><h1>Carros que passaram pela oficina</h1>
  <p class="cab-sub">De BMW e Porsche a Maverick e Galaxie. Toque numa foto para ampliar.</p>
</div></section>
<section class="fotos-pag"><div class="in">${galeria('b')}</div></section>`),

  contato: () => pagina('b', 'contato', 'Contato · Mecânica Meier', `Agende pelo WhatsApp ou ligue ${E.fone}. ${E.rua}, ${E.bairro}, Joinville.`, `
<section class="cab-b cab-b-simples"><div class="in">
  <p class="rotulo">Contato</p><h1>Fale com a Meier</h1>
  <p class="cab-sub">${E.fone} · ${E.fone2} · ${E.rua}, ${E.bairro}</p>
</div></section>
<section class="contato-pag"><div class="in contato-pag-grade">${formulario('b')}<div class="contato-lado">${blocoEndereco()}</div></div></section>`),
};

export function gerarVersao(v) {
  const V = v === 'a' ? A : B;
  return Object.fromEntries(nav.map(n => [n.slug, V[n.slug]()]));
}
