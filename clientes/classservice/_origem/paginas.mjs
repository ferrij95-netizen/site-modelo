// Monta as páginas das versões A ("Clássica": fiel ao site atual, moldura de metal escovado, logo no centro, botões numerados
// no destaque, placas Class-Service e Class-WebCar, três quadros com foto) e B ("Diagnóstico": clara, etapas da visita,
// serviços com foto que troca, linha do tempo dos cursos de fábrica). Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, historia, filosofia, agradecimento, parceirosFrase, servicos, pacotes, tecnico, cursos, folhasCert, etapas, modelos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const DIM = {
  'amg-gt': [1800, 1200], c63: [1800, 1200], 'classe-s': [1800, 750], 'detalhe-motor': [1800, 1200], 'interior-e': [1800, 1200], 'interior-s': [1800, 1200],
  'motor-c': [1800, 1350], 'motor-classico': [1800, 1251], 'sl-r107': [1800, 857], w123: [1800, 830], alinhamento: [1400, 1050], 'alinhamento-2': [1400, 1050],
  elevador: [1024, 681], 'mecanico-1': [1024, 681], 'mecanico-2': [1024, 681],
  'orig-estrela': [640, 204], 'orig-grade': [640, 204], 'orig-classe-e': [640, 204], 'orig-volante': [640, 204], 'orig-amg': [640, 204],
  'cert-011': [1100, 780], 'cert-015': [1100, 1515], 'cert-016': [1100, 1693], 'cert-018': [1100, 1488],
  'orig-oficina': [250, 180], 'orig-amg-gt': [250, 180], 'orig-beissbarth': [250, 180],
};
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${DIM[n][0]}" height="${DIM[n][1]}"${/loading=/.test(extra) ? '' : ' loading="lazy"'} decoding="async"${extra}>`;

export const nomesVersao = { a: 'Clássica', b: 'Diagnóstico' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'A Class-Service', caminho: 'empresa/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'webcar', nome: 'Class-WebCar', caminho: 'webcar/' },
  { slug: 'contato', nome: 'Onde estamos', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  estrela: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  chave: '<path d="M14.5 6.5a4 4 0 105 5l-1.8-1.8-2.2.5.5-2.2z"/><path d="M15.2 11.2L5 21.5 2.5 19 12.8 8.8"/>',
  camin: '<path d="M2 16V7h11v9M13 10h5l4 4v2h-9"/><circle cx="6.5" cy="17.5" r="2"/><circle cx="17.5" cy="17.5" r="2"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const wa = (txt = 'Olá! Vim pelo site da Class-Service e gostaria de agendar um horário.') => `https://wa.me/${E.whats.wa}?text=${encodeURIComponent(txt)}`;
const anos = new Date().getFullYear() - E.fundacao;

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
<meta name="theme-color" content="${v === 'a' ? '#202124' : '#ffffff'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tinos:wght@400;700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');

function topo(v, atual) {
  const btnMenu = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
  if (v === 'a') return `<div class="faixa"><div class="in">
  <span>${ic('pin')} Planalto Paulista, São Paulo</span>
  <span class="so-pc">${E.fones.map(f => `<a href="tel:${f.h}">${f.n}</a>`).join(' · ')}</span>
  <a href="${wa()}" target="_blank" rel="noopener">${ic('wa')} WhatsApp ${E.whats.n}</a>
</div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="Class-Service, página inicial"><img src="/assets/logo-branco.svg" alt="Class-Service, Especializada Mercedes-Benz" width="308" height="70"></a>
  ${btnMenu}
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Class-Service, página inicial"><img src="/assets/logo.svg" alt="Class-Service, Especializada Mercedes-Benz" width="308" height="70"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-tel" href="tel:${E.fones[0].h}">${ic('tel')} ${E.fones[0].n}</a></nav>
  <a class="btn btn-ag" href="/b/contato/#agendar">${ic('cal')}<span>Agendar</span></a>
  ${btnMenu}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Class-Service, Especializada Mercedes-Benz" width="308" height="70" loading="lazy"><p>Oficina especializada Mercedes-Benz desde ${E.fundacao}, no Planalto Paulista.</p></div>
  <div><h3>Endereço</h3><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Ver no mapa</a></div>
  <div><h3>Fale com a gente</h3><p>${E.fones.map(f => `<a href="tel:${f.h}">${f.n}</a>`).join('<br>')}<br><a href="${wa()}" target="_blank" rel="noopener">WhatsApp ${E.whats.n}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${menu(v, '')}</nav>
</div><p class="rod-fim">© ${E.nome} · Especializada Mercedes-Benz · São Paulo, SP<span>Marcas citadas pertencem aos seus donos. A Class-Service é independente e não é concessionária. Algumas fotos são de banco livre (<a href="/creditos/">créditos</a>).</span></p></footer>
<a class="wa-flut" href="${wa()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('wa')}</a>`;
}

const semQuebra = html => html.replace(/<(h[123])([^>]*)>([\s\S]*?)<\/\1>/g, (m, t, a, c) => `<${t}${a}>${c.replace(/Mercedes-Benz/g, '<span class="nw">Mercedes-Benz</span>')}</${t}>`);
const pagina = (v, slug, titulo, descricao, corpo) => `${head(v, nav.find(n => n.slug === slug).caminho, titulo, descricao)}
<body class="v-${v} p-${slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, slug)}
<main id="conteudo">
${semQuebra(corpo)}
</main>
${rodape(v)}
</body>
</html>
`;

// ---------- blocos comuns ----------
const formAgendar = (v) => `<form class="form" id="agendar" data-mailto="${E.email}" data-assunto="Agendamento pelo site">
  <div class="campos">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>Telefone ou WhatsApp<input name="Telefone" type="tel" required autocomplete="tel"></label>
    <label>Modelo e ano do carro<input name="Carro" placeholder="Ex.: C 200 2015" required></label>
    <label>Serviço<select name="Serviço"><option>Revisão</option><option>Diagnóstico de falha</option><option>Alinhamento e balanceamento</option><option>Suspensão, freios ou câmbio</option><option>Laudo para compra ou venda</option><option>Plataforma (buscar o carro)</option><option>Outro</option></select></label>
    <label class="largo">O que o carro está apresentando?<textarea name="Mensagem" rows="4" placeholder="Barulho, luz no painel, revisão dos 60 mil km..."></textarea></label>
  </div>
  <div class="form-acoes"><button class="btn btn-wa" type="button" data-wa="${E.whats.wa}">${ic('wa')} Enviar pelo WhatsApp</button><button class="btn btn-sec" type="submit">${ic('mail')} Enviar por e-mail</button></div>
</form>`;

const canais = `<ul class="canais">
  <li><a href="${wa()}" target="_blank" rel="noopener">${ic('wa')}<span><b>WhatsApp</b>${E.whats.n}</span></a></li>
  ${E.fones.map(f => `<li><a href="tel:${f.h}">${ic('tel')}<span><b>Telefone</b>${f.n}</span></a></li>`).join('')}
  <li><a href="mailto:${E.email}">${ic('mail')}<span><b>E-mail</b>${E.email}</span></a></li>
</ul>`;

const mapa = `<div class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa: Class-Service na Av. José Maria Whitaker, 1220" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

const nota = `<a class="nota" href="${E.mapa}" target="_blank" rel="noopener"><span class="estrelas">${ic('estrela').repeat(5)}</span><b>${E.nota}</b><span>${E.avaliacoes} avaliações no Google</span></a>`;

const porAno = () => [...new Set(cursos.map(c => c.ano))].map(a => ({ ano: a, itens: cursos.filter(c => c.ano === a) }));

// ================= VERSÃO A · Clássica =================
const A = {};
const capaA = (titulo, sub, foto, alt) => `<section class="capa"><div class="in"><div class="capa-moldura"><figure>${img(foto, alt, ' loading="eager" fetchpriority="high"')}</figure><div class="capa-txt"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></div></div></section>`;

A.index = () => pagina('a', 'index', 'Class-Service · Especializada Mercedes-Benz em São Paulo', `Oficina especializada Mercedes-Benz no Planalto Paulista, desde ${E.fundacao}. Revisão, diagnóstico eletrônico, alinhamento Beissbarth e laudo técnico.`, `
<section class="destaque"><div class="in">
  <div class="slides" data-slides>
    ${[['classe-s', 'Mercedes-Benz Classe S preto'], ['amg-gt', 'Mercedes-AMG GT cinza'], ['interior-s', 'Painel de um Mercedes-Benz Classe S'], ['motor-c', 'Motor de um Mercedes-Benz Classe C'], ['sl-r107', 'Mercedes-Benz SL clássico vermelho']].map(([f, alt], i) => `<figure${i ? '' : ' class="on"'}>${img(f, alt, i ? '' : ' loading="eager" fetchpriority="high"')}</figure>`).join('')}
    <div class="dest-txt"><p class="eyebrow">Especializada Mercedes-Benz · desde ${E.fundacao}</p><h1>Qualidade e honestidade no cuidado do seu Mercedes-Benz.</h1><p>Técnicos vindos de concessionária, com cursos da fábrica, e equipamentos especiais para a tecnologia dos automóveis Mercedes-Benz.</p>
    <div class="botoes"><a class="btn" href="/a/contato/#agendar">${ic('cal')} Agendar horário</a><a class="btn btn-claro" href="/a/servicos/">Ver serviços</a></div></div>
    <div class="slides-num" data-slides-pontos></div>
  </div>
  <div class="placas">
    <a class="placa" href="/a/empresa/"><b>Class-Service</b><span>A oficina, a equipe e os certificados ${ic('seta')}</span></a>
    <a class="placa" href="/a/webcar/"><b>Class-WebCar</b><span>Compra e venda com laudo técnico ${ic('seta')}</span></a>
  </div>
</div></section>

<section class="quadros"><div class="in">
  <a class="quadro" href="/a/servicos/#alinhamento"><figure>${img('orig-beissbarth', 'Equipamento de alinhamento Beissbarth da Class-Service')}</figure><h2>Alinhamento técnico e balanceamento</h2><p>Alinhamento computadorizado com inclinômetro, homologado Mercedes-Benz.</p></a>
  <a class="quadro" href="/a/contato/"><figure>${img('orig-oficina', 'Oficina da Class-Service com carros Mercedes-Benz em serviço')}</figure><h2>Endereço</h2><p>${E.endereco.join('<br>')}</p></a>
  <a class="quadro" href="/a/empresa/"><figure>${img('orig-amg-gt', 'Mercedes-AMG GT prata')}</figure><h2>Class-Service</h2><p>Especializada Mercedes-Benz, desde ${E.fundacao} trabalhando com qualidade e honestidade.</p></a>
</div></section>

<section class="servicos-a"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Assistência técnica</p><h2>Os nossos serviços</h2></div>
  <ol class="lista-serv">${servicos.map((s, i) => `<li><a href="/a/servicos/#${s.slug}"><span class="num">${String(i + 1).padStart(2, '0')}</span><b>${s.nome}</b><span class="seta">${ic('seta')}</span></a></li>`).join('')}</ol>
</div></section>

<section class="formacao"><div class="in">
  <figure class="formacao-foto">${img('cert-015', folhasCert[1].alt)}</figure>
  <div><p class="eyebrow">Formação de fábrica</p><h2>${cursos.length} cursos Mercedes-Benz, de 1999 a 2005.</h2><p>${historia[0]}</p><p>Injeção, imobilizador, módulos eletrônicos, suspensão Airmatic e ABC, caixa automática 722.9, ar-condicionado, geometria de direção: tudo com certificado da fábrica.</p><a class="link" href="/a/empresa/#certificados">Ver os certificados ${ic('seta')}</a></div>
</div></section>

<section class="pacotes"><div class="in">
  <div><p class="eyebrow">Pacotes promocionais</p><h2>Pacotes para o seu Mercedes-Benz</h2><p>${pacotes.texto}</p></div>
  <div class="pac-dir"><ul class="chips">${pacotes.modelos.map(m => `<li>${m}</li>`).join('')}<li>Multimarcas</li></ul>
  <a class="btn" href="${wa('Olá! Gostaria de saber dos pacotes promocionais da Class-Service para o meu carro.')}" target="_blank" rel="noopener">${ic('wa')} Consultar pacote</a></div>
</div></section>

<section class="chamada"><div class="in">
  <blockquote><p>“${filosofia.replace('Nossa filosofia: p', 'P')}”</p><cite>Nossa filosofia</cite></blockquote>
  ${nota}
</div></section>`);

A.empresa = () => pagina('a', 'empresa', 'A Class-Service · Especializada Mercedes-Benz', historia[0], `
${capaA('Class-Service', `Especializada Mercedes-Benz desde ${E.fundacao}.`, 'w123', 'Mercedes-Benz W123 com o capô aberto na oficina')}
<section class="texto-a"><div class="in">
  <div class="colunas">
    <div>${historia.map(p => `<p>${p}</p>`).join('')}</div>
    <aside class="aside-metal"><p class="grande">“${filosofia.replace('Nossa filosofia: p', 'P')}”</p><p>${agradecimento}</p><p class="assin">Conquistamos a competência de darmos o melhor de nós.</p></aside>
  </div>
</div></section>
<section class="numeros"><div class="in">
  <div><b>${E.desde}</b><span>técnicos em concessionária Mercedes-Benz</span></div>
  <div><b>${E.fundacao}</b><span>fundação da Class-Service</span></div>
  <div><b>${cursos.length}</b><span>cursos de fábrica certificados</span></div>
  <div><b>${E.nota}</b><span>nota no Google, ${E.avaliacoes} avaliações</span></div>
</div></section>
<section class="certificados" id="certificados"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Certificados</p><h2>Qualificações profissionais</h2><p>Treinamentos pós-venda Mercedes-Benz e DaimlerChrysler do Brasil de ${tecnico}.</p></div>
  <div class="cert-grade">
    <ol class="cursos">${porAno().map(g => `<li><b>${g.ano}</b><ul>${g.itens.map(c => `<li>${c.nome}<small>${c.data}</small></li>`).join('')}</ul></li>`).join('')}</ol>
    <div class="folhas">${folhasCert.map(f => `<a href="/assets/img/${f.img}.webp" target="_blank" rel="noopener"><img src="/assets/img/${f.img}.webp" alt="${esc(f.alt)}" width="${f.w}" height="${f.h}" loading="lazy"></a>`).join('')}</div>
  </div>
</div></section>
<section class="parceiros-a"><div class="in"><p>“${parceirosFrase}”</p></div></section>`);

A.servicos = () => pagina('a', 'servicos', 'Serviços · Class-Service', 'Consultoria técnica, diagnóstico eletrônico avançado, revisão, alinhamento Beissbarth, plataforma com seguro e laudo técnico para Mercedes-Benz.', `
${capaA('Serviços', 'Assistência técnica especializada Mercedes-Benz, com peças genuínas e de primeira linha.', 'motor-classico', 'Motor de um Mercedes-Benz clássico')}
<section class="serv-det"><div class="in">
  ${servicos.map((s, i) => `<article class="serv" id="${s.slug}"><figure>${img(s.foto, s.nome)}</figure><div><span class="num">${String(i + 1).padStart(2, '0')}</span><h2>${s.nome}</h2><p>${s.curta}</p></div></article>`).join('')}
</div></section>
<section class="pacotes"><div class="in">
  <div><p class="eyebrow">Pacotes promocionais</p><h2>Pacotes para Mercedes-Benz e preços para multimarcas</h2><p>${pacotes.texto}</p></div>
  <div class="pac-dir"><ul class="chips">${pacotes.modelos.map(m => `<li>${m}</li>`).join('')}<li>Multimarcas</li></ul>
  <a class="btn" href="${wa('Olá! Gostaria de saber dos pacotes promocionais da Class-Service para o meu carro.')}" target="_blank" rel="noopener">${ic('wa')} Consultar pacote</a></div>
</div></section>`);

A.webcar = () => pagina('a', 'webcar', 'Class-WebCar · Compra e venda com laudo técnico', 'Class-WebCar: comercialização de veículos com laudo técnico de acordo com as condições gerais do carro.', `
${capaA('Class-WebCar', 'Comercialização de veículos com laudo técnico.', 'amg-gt', 'Mercedes-AMG GT cinza')}
<section class="texto-a"><div class="in">
  <div class="colunas">
    <div><h2>Comprar ou vender um Mercedes-Benz sabendo o que está no carro.</h2><p>Na Class-WebCar os veículos são comercializados com <b>laudo técnico de acordo com as condições gerais do veículo</b>, feito pela mesma equipe que cuida dos carros na oficina.</p><p>Vai comprar um Mercedes-Benz de outra pessoa? Traga o carro para uma avaliação antes de fechar negócio.</p>
    <ul class="checks">${['Avaliação mecânica e eletrônica completa', 'Leitura dos módulos com diagnóstico avançado', 'Relatório do estado geral do veículo', 'Orientação sobre o que precisa ser feito'].map(t => `<li>${ic('check')} ${t}</li>`).join('')}</ul></div>
    <aside class="aside-metal"><p class="grande">Veículos à venda</p><p>Os carros disponíveis mudam toda semana. Fale com a gente para saber o que temos agora ou para colocar o seu carro à venda.</p><a class="btn" href="${wa('Olá! Quero saber dos veículos à venda na Class-WebCar.')}" target="_blank" rel="noopener">${ic('wa')} Ver carros disponíveis</a></aside>
  </div>
</div></section>`);

A.contato = () => pagina('a', 'contato', 'Onde estamos · Class-Service', `${E.endereco.join(', ')}. ${E.referencia}.`, `
${capaA('Onde estamos', E.referencia + '.', 'interior-e', 'Painel de um Mercedes-Benz Classe E')}
<section class="contato-a"><div class="in">
  <div><h2>Endereço</h2><p class="end">${E.endereco.join('<br>')}</p><p class="ref">${E.referencia}.</p>${canais}</div>
  ${mapa}
</div></section>
<section class="agendar-a"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Contato</p><h2>Agende o seu horário</h2><p>Preencha e envie pelo WhatsApp ou por e-mail. Os campos com * são obrigatórios.</p></div>
  ${formAgendar('a')}
</div></section>`);

// ================= VERSÃO B · Diagnóstico =================
const B = {};
const capaB = (eyebrow, titulo, sub, foto, alt) => `<section class="capa"><div class="in"><div class="capa-txt"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div><figure>${img(foto, alt, ' loading="eager" fetchpriority="high"')}</figure></div></section>`;

const etapasBloco = `<section class="etapas"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Como funciona</p><h2>Do agendamento à entrega, você acompanha cada passo.</h2></div>
  <ol class="trilha">${etapas.map((e, i) => `<li><span class="n">${i + 1}</span><h3>${e.n}</h3><p>${e.t}</p></li>`).join('')}</ol>
</div></section>`;

const linhaTempo = `<section class="tempo" id="certificados"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Formação de fábrica</p><h2>${cursos.length} cursos Mercedes-Benz no currículo da equipe.</h2><p>Treinamentos pós-venda da Mercedes-Benz e da DaimlerChrysler do Brasil feitos por ${tecnico}, de 1999 a 2005. Os certificados estão no site desde a fundação.</p></div>
  <div class="tempo-rola"><ol>${porAno().map(g => `<li><b>${g.ano}</b><ul>${g.itens.map(c => `<li>${c.nome}<small>${c.data}</small></li>`).join('')}</ul></li>`).join('')}</ol></div>
</div></section>`;

B.index = () => pagina('b', 'index', 'Class-Service · Especializada Mercedes-Benz em São Paulo', `Oficina especializada Mercedes-Benz no Planalto Paulista, desde ${E.fundacao}. Diagnóstico eletrônico avançado, revisão, alinhamento Beissbarth e laudo técnico.`, `
<section class="hero"><figure>${img('interior-s', 'Painel e volante de um Mercedes-Benz Classe S', ' loading="eager" fetchpriority="high"')}</figure><div class="in">
  <p class="eyebrow">Especializada Mercedes-Benz · São Paulo</p>
  <h1>O diagnóstico certo para o seu Mercedes-Benz.</h1>
  <p>Técnicos com formação de fábrica desde ${E.desde}, equipamento dedicado e a metodologia de trabalho da Mercedes-Benz, numa oficina independente.</p>
  <div class="botoes"><a class="btn" href="/b/contato/#agendar">${ic('cal')} Agendar horário</a><a class="btn btn-vidro" href="${wa()}" target="_blank" rel="noopener">${ic('wa')} ${E.whats.n}</a></div>
</div></section>

<section class="fatos"><div class="in">
  <div><b>${E.fundacao}</b><span>fundada por técnicos de concessionária</span></div>
  <div><b>${cursos.length}</b><span>cursos Mercedes-Benz certificados</span></div>
  <div><b>Beissbarth</b><span>alinhamento homologado pela fábrica</span></div>
  ${nota}
</div></section>

<section class="troca"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Serviços</p><h2>Assistência técnica completa, de um lugar só.</h2></div>
  <div class="troca-grade" data-troca-serv>
    <div class="troca-fotos">${servicos.map((s, i) => `<figure${i ? '' : ' class="on"'} data-foto="${s.slug}">${img(s.foto, s.nome)}</figure>`).join('')}</div>
    <ol class="troca-lista">${servicos.map((s, i) => `<li${i ? '' : ' class="on"'} data-serv="${s.slug}"><button type="button"><span class="num">${String(i + 1).padStart(2, '0')}</span>${s.nome}</button><p>${s.curta}</p></li>`).join('')}</ol>
  </div>
</div></section>

${etapasBloco}

<section class="alinh"><div class="in">
  <figure>${img('alinhamento', 'Alinhamento computadorizado com garras e alvos nas rodas')}</figure>
  <div><p class="eyebrow">Alinhamento técnico</p><h2>Beissbarth com inclinômetro, homologado Mercedes-Benz.</h2><p>O alinhamento dos Mercedes-Benz tem medidas próprias de fábrica, inclusive nos carros com suspensão Airmatic. Na Class-Service ele é feito em equipamento computadorizado Beissbarth com inclinômetro, junto com o balanceamento das rodas.</p><a class="link" href="/b/servicos/#alinhamento">Ver detalhes ${ic('seta')}</a></div>
</div></section>

<section class="modelos"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Modelos</p><h2>Do Classe A ao Classe S, dos clássicos aos AMG.</h2><p>${pacotes.texto}</p></div>
  <ul class="mod-grade">${modelos.map(m => `<li><figure>${img(m.img, m.nome)}</figure><span>${m.nome}</span></li>`).join('')}<li class="mod-multi"><span>Multimarcas</span><small>Também atendemos outras marcas, com ótimos preços.</small></li></ul>
</div></section>

<section class="fim-b"><div class="in">
  <div><h2>Agende uma consultoria técnica.</h2><p>${E.endereco[0]}, ${E.endereco[1]}. ${E.referencia}.</p></div>
  <div class="botoes"><a class="btn" href="/b/contato/#agendar">${ic('cal')} Agendar</a><a class="btn btn-vidro" href="tel:${E.fones[0].h}">${ic('tel')} ${E.fones[0].n}</a></div>
</div></section>`);

B.empresa = () => pagina('b', 'empresa', 'A Class-Service · Especializada Mercedes-Benz', historia[0], `
${capaB(`Desde ${E.fundacao}`, 'Uma oficina feita por quem veio da concessionária.', historia[0], 'w123', 'Mercedes-Benz W123 com o capô aberto na oficina')}
<section class="hist"><div class="in">
  <div class="hist-txt">${historia.slice(1).map(p => `<p>${p}</p>`).join('')}<p>${agradecimento}</p></div>
  <blockquote><p>${filosofia}</p></blockquote>
</div></section>
<section class="ano-linha"><div class="in">
  <ol>
    <li><b>${E.desde}</b><span>Os fundadores começam na concessionária Mercedes-Benz, com cursos técnicos da fábrica.</span></li>
    <li><b>1999 a 2005</b><span>${cursos.length} treinamentos pós-venda Mercedes-Benz e DaimlerChrysler, do Classe A ao Classe S.</span></li>
    <li><b>${E.fundacao}</b><span>Nasce a Class-Service, no Planalto Paulista, equipada para a tecnologia Mercedes-Benz.</span></li>
    <li><b>Hoje</b><span>${anos} anos depois, nota ${E.nota} no Google com ${E.avaliacoes} avaliações.</span></li>
  </ol>
</div></section>
${linhaTempo}
<section class="folhas-b"><div class="in">
  <div class="sec-tit"><h2>Os certificados</h2><p>Toque para ver em tamanho grande.</p></div>
  <div class="folhas">${folhasCert.map(f => `<a href="/assets/img/${f.img}.webp" target="_blank" rel="noopener"><img src="/assets/img/${f.img}.webp" alt="${esc(f.alt)}" width="${f.w}" height="${f.h}" loading="lazy"></a>`).join('')}</div>
</div></section>`);

B.servicos = () => pagina('b', 'servicos', 'Serviços · Class-Service', 'Consultoria técnica, diagnóstico eletrônico avançado, revisão, alinhamento Beissbarth, plataforma com seguro e laudo técnico para Mercedes-Benz.', `
${capaB('Serviços', 'Assistência técnica Mercedes-Benz.', 'Seguimos os critérios e a metodologia de trabalho conforme as especificações da fábrica, com peças genuínas e de primeira linha.', 'detalhe-motor', 'Detalhe do motor de um carro')}
<section class="serv-b"><div class="in">
  ${servicos.map((s, i) => `<article id="${s.slug}"><span class="num">${String(i + 1).padStart(2, '0')}</span><div><h2>${s.nome}</h2><p>${s.curta}</p></div><figure>${img(s.foto, s.nome)}</figure></article>`).join('')}
</div></section>
${etapasBloco}
<section class="pacotes-b"><div class="in">
  <div><p class="eyebrow">Pacotes promocionais</p><h2>Pacotes para o seu modelo.</h2><p>${pacotes.texto}</p></div>
  <div class="pac-dir"><ul class="chips">${pacotes.modelos.map(m => `<li>${m}</li>`).join('')}<li>Multimarcas</li></ul>
  <a class="btn" href="${wa('Olá! Gostaria de saber dos pacotes promocionais da Class-Service para o meu carro.')}" target="_blank" rel="noopener">${ic('wa')} Consultar pacote</a></div>
</div></section>`);

B.webcar = () => pagina('b', 'webcar', 'Class-WebCar · Compra e venda com laudo técnico', 'Class-WebCar: comercialização de veículos com laudo técnico de acordo com as condições gerais do carro.', `
${capaB('Class-WebCar', 'Compre e venda com laudo técnico.', 'Veículos comercializados com laudo técnico de acordo com as condições gerais do carro, feito pela equipe da oficina.', 'amg-gt', 'Mercedes-AMG GT cinza')}
<section class="laudo"><div class="in">
  <div class="sec-tit"><p class="eyebrow">O laudo</p><h2>O que olhamos antes de você fechar negócio.</h2></div>
  <ol class="laudo-grade">
    ${[['Motor e câmbio', 'Vazamentos, ruídos, trocas de marcha e histórico de revisões.'], ['Eletrônica', 'Leitura de todos os módulos com diagnóstico avançado, falhas gravadas e apagadas.'], ['Suspensão e freios', 'Airmatic, amortecedores, buchas, discos e pastilhas.'], ['Geometria e pneus', 'Alinhamento no Beissbarth e desgaste dos pneus.'], ['Carroceria e interior', 'Sinais de reparo, funcionamento de comandos e acabamento.'], ['Relatório', 'O estado geral do veículo por escrito, com o que precisa ser feito.']].map(([t, d], i) => `<li><span class="n">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
  </ol>
</div></section>
<section class="fim-b"><div class="in">
  <div><h2>Veículos à venda</h2><p>Os carros disponíveis mudam toda semana. Pergunte o que temos agora ou traga o seu carro para vender.</p></div>
  <div class="botoes"><a class="btn" href="${wa('Olá! Quero saber dos veículos à venda na Class-WebCar.')}" target="_blank" rel="noopener">${ic('wa')} Ver carros disponíveis</a></div>
</div></section>`);

B.contato = () => pagina('b', 'contato', 'Onde estamos · Class-Service', `${E.endereco.join(', ')}. ${E.referencia}.`, `
<section class="contato-b"><div class="in">
  <div class="cont-info"><p class="eyebrow">Onde estamos</p><h1>Planalto Paulista, perto de Congonhas.</h1><p class="end">${E.endereco.join('<br>')}</p><p class="ref">${E.referencia}.</p>${canais}</div>
  ${mapa}
</div></section>
<section class="agendar-b"><div class="in">
  <div class="sec-tit"><p class="eyebrow">Agendamento</p><h2>Conte o que o carro está apresentando.</h2><p>A mensagem chega pronta no nosso WhatsApp ou e-mail. Respondemos com o melhor horário.</p></div>
  ${formAgendar('b')}
</div></section>`);

export function gerarVersao(v) {
  const P = v === 'a' ? A : B;
  return Object.fromEntries(nav.map(n => [n.slug, P[n.slug]()]));
}
