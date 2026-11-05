// Monta as páginas das versões A ("Telhado": fiel ao site atual, com a faixa verde do telefone, o título verde em
// itálico do banner, o bloco "Economize até 95%", os serviços, as obras, o formulário de simulação e o "como funciona")
// e B ("Créditos": mais técnica, com o simulador da conta na abertura, o caminho do sol até o quadro de luz em diagrama e
// os kWp das obras em destaque). Estilos em public/assets/{base,a,b}.css, comportamento em public/assets/site.js.
import { empresa as E, waLink, sobre, segmentos, servicos, tipos, etapas, comoFunciona, obras, fotos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fora = ' target="_blank" rel="noopener"';

export const nomesVersao = { a: 'Telhado', b: 'Créditos' };

const img = (k, { cls = '', lazy = true, alt } = {}) => {
  const [n, w, h, a] = fotos[k];
  return `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${n}" alt="${esc(alt ?? a)}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async">`;
};

const I = {
  wa: '<path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z"/><path d="M8.8 8.3c.2-.4.5-.4.8-.4h.5c.2 0 .4 0 .5.4l.8 1.8c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.6 1 1.4 1.8 2.4 2.4.2.1.4.1.5 0l.6-.7c.2-.2.4-.2.6-.1l1.8.8c.3.1.4.3.4.5 0 .5-.1 1.2-.6 1.6-.6.5-1.5.7-2.6.4-2.2-.7-4.3-2.7-5.1-4.8-.4-1.1-.3-2.2.4-2.9z" fill="currentColor" stroke="none"/>',
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  casa: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  predio: '<path d="M5 21V4h10v17"/><path d="M15 9h4v12"/><path d="M8 8h1M11 8h1M8 12h1M11 12h1M8 16h1M11 16h1M3 21h18"/>',
  loja: '<path d="M4 9l1.5-5h13L20 9"/><path d="M4 9a2.7 2.7 0 005.3 0 2.7 2.7 0 005.4 0A2.7 2.7 0 0020 9"/><path d="M5 11v9h14v-9"/>',
  fabrica: '<path d="M3 20V10l6 4v-4l6 4V5h4v15z"/><path d="M3 20h18"/>',
  trator: '<circle cx="7" cy="16" r="4"/><circle cx="18" cy="17" r="3"/><path d="M7 12V6h6l2 6"/><path d="M11 12h8v5"/>',
  painel: '<path d="M4 15l3-10h10l3 10z"/><path d="M5.5 10h13M12 5v10M9 15l-1 5h8l-1-5"/>',
  inversor: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12l1.5-1.5L12 12l1.5-1.5L15 12"/><circle cx="12" cy="17" r="1"/>',
  quadro: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 7v4M12 7v4M16 7v4M8 15h8"/>',
  medidor: '<circle cx="12" cy="12" r="8.5"/><path d="M8 13h8M14 10l2 3-2 3M10 10l-2 3"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  projeto: '<path d="M4 20h16"/><path d="M6 16l9-9 3 3-9 9H6z"/><path d="M13 9l3 3"/>',
  homologacao: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M10 14l2 2 4-4"/>',
  instalacao: '<path d="M4 15l3-10h10l3 10z"/><path d="M5.5 10h13M12 5v10"/><path d="M15 21l-3-3-3 3"/>',
  manutencao: '<path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
  grafico: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// ---------- navegação (mesmos itens do site atual) ----------
const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'quem-somos', nome: 'Quem somos', caminho: 'quem-somos/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'como-funciona', nome: 'Como funciona', caminho: 'como-funciona/' },
  { slug: 'obras', nome: 'Obras realizadas', caminho: 'obras/' },
  { slug: 'orcamento', nome: 'Solicite um orçamento', caminho: 'orcamento/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];
const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}${n.slug === 'orcamento' && v === 'b' ? ' class="so-cel"' : ''}>${n.nome}</a>`).join('');

function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
  const fontes = v === 'a'
    ? 'family=Archivo:ital,wdth,wght@0,100..125,500..800;1,100..125,600..900&family=Poppins:wght@400;500;600'
    : 'family=Archivo:wdth,wght@100..125,500..800&family=Inter:wght@400;500;600';
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
<meta name="theme-color" content="#66B837">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontes}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const logo = (branco = false) => `<img class="marca-img" src="/assets/img/${branco ? 'logo-branco' : 'logo'}.png" alt="Energy Solar" width="796" height="312">`;
const btnWa = (texto = 'Chamar no WhatsApp', msg, cls = 'btn btn-wa') => `<a class="${cls}" href="${waLink(msg)}"${fora}>${ic('wa')}<span>${texto}</span></a>`;

function topo(v, atual) {
  if (v === 'a') return `<div class="faixa"><div class="in"><span class="so-pc">${ic('pin')} Atendemos toda a ${E.area}</span><a class="faixa-tel" href="${waLink()}"${fora}>${E.tel} ${ic('wa')}</a></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="Energy Solar, página inicial">${logo()}</a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="topo-insta so-pc" href="${E.insta}"${fora} aria-label="Instagram da Energy Solar">${ic('insta')}</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Energy Solar, página inicial">${logo()}</a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="topo-tel so-pc" href="tel:${E.telHref}">${ic('tel')}<span><small>Ligue ou chame</small>${E.tel}</span></a>
  <a class="btn btn-sol topo-cta so-pc" href="/b/orcamento/">Simular economia</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(true)}<p>${sobre.frase}</p><p class="rod-redes"><a href="${E.insta}"${fora} aria-label="Instagram">${ic('insta')}</a><a href="${waLink()}"${fora} aria-label="WhatsApp">${ic('wa')}</a></p></div>
  <div><h2>Horário de funcionamento</h2><p>${E.horario.map(([d, h]) => `${d}: ${h}`).join('<br>')}</p></div>
  <div><h2>Endereço</h2><p>${E.rua}<br>${E.cidade}</p><a class="rod-link" href="${E.mapa}"${fora}>${ic('pin')} Como chegar</a></div>
  <div><h2>Entre em contato</h2><p><a href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a><br><a href="${waLink()}"${fora}>${ic('wa')} WhatsApp</a><br><a href="${E.insta}"${fora}>${ic('insta')} ${E.instaNome}</a></p></div>
</div><p class="rod-fim">© ${E.nome} · Energia solar em Salvador, na Bahia e em Sergipe</p></footer>
<a class="wa-flutua" href="${waLink()}"${fora} aria-label="Conversar no WhatsApp">${ic('wa')}</a>`;
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

const migalhas = (v, nome) => `<nav class="migalhas" aria-label="Você está em"><a href="/${v}/">Início</a> / <span>${nome}</span></nav>`;

function capa(v, { nome, titulo, sub, foto }) {
  if (v === 'a') return `<section class="capa"><div class="capa-grade" aria-hidden="true"></div><div class="in">${migalhas(v, nome)}<h1>${titulo}</h1>${sub ? `<p class="capa-sub">${sub}</p>` : ''}</div></section>`;
  return `<section class="capa${foto ? ' com-foto' : ''}"><div class="in"><div class="capa-txt">${migalhas(v, nome)}<h1>${titulo}</h1>${sub ? `<p class="capa-sub">${sub}</p>` : ''}</div>${foto ? `<figure class="capa-foto">${img(foto, { lazy: false })}</figure>` : ''}</div></section>`;
}

// ---------- blocos comuns ----------
const simulador = (id = 'sim', titulo = 'Quanto você pode economizar?') => `<form class="simulador" data-simulador aria-labelledby="${id}-t" onsubmit="return false">
  <p class="sim-olho">${ic('grafico')} Simulação rápida</p>
  <h2 id="${id}-t" class="sim-t">${titulo}</h2>
  <label class="sim-campo" for="${id}-v">Valor médio da sua conta de luz<span class="sim-valor"><b data-sim-conta>R$ 500</b> por mês</span></label>
  <input id="${id}-v" type="range" min="150" max="8000" step="50" value="500" data-sim-in>
  <div class="sim-res">
    <div><span>Economia por mês</span><b data-sim-mes>até R$ 475</b></div>
    <div><span>Em um ano</span><b data-sim-ano>até R$ 5.700</b></div>
  </div>
  <p class="sim-nota">Estimativa com a economia de até 95% que a Energy Solar informa. O valor real depende do seu consumo e do projeto.</p>
  <a class="btn btn-wa sim-wa" data-sim-wa href="${waLink('Olá, vim do site. Minha conta de luz é de cerca de R$ 500 por mês e gostaria de um orçamento de energia solar.')}"${fora}>${ic('wa')}<span>Pedir orçamento</span></a>
</form>`;

// Formulário de simulação do site atual (nome, e-mail, telefone, cidade, valor da conta), enviado pelo WhatsApp.
const formSimulacao = (v, id = 'fs') => `<form class="form" data-form-wa="${E.wa}" data-assunto="Gostaria de uma simulação de energia solar.">
  <div class="campo"><label for="${id}-nome">Nome</label><input id="${id}-nome" name="Nome" required autocomplete="name"></div>
  <div class="campo"><label for="${id}-mail">E-mail</label><input id="${id}-mail" name="E-mail" type="email" autocomplete="email"></div>
  <div class="campo"><label for="${id}-tel">Telefone</label><input id="${id}-tel" name="Telefone" type="tel" autocomplete="tel" required></div>
  <div class="campo"><label for="${id}-cid">Cidade</label><input id="${id}-cid" name="Cidade" autocomplete="address-level2" placeholder="Salvador"></div>
  <div class="campo campo-largo"><label for="${id}-conta">Valor da conta de luz</label><div class="campo-rs"><span>R$</span><input id="${id}-conta" name="Valor da conta de luz" inputmode="decimal" placeholder="500"></div></div>
  <button class="btn ${v === 'a' ? 'btn-laranja' : 'btn-verde'}" type="submit">Solicitar orçamento ${ic('seta')}</button>
  <p class="form-nota">A mensagem abre no WhatsApp da Energy Solar, já preenchida.</p>
</form>`;

const formContato = (v, id = 'fc') => `<form class="form" data-form-wa="${E.wa}" data-assunto="Gostaria de falar com a Energy Solar.">
  <div class="campo"><label for="${id}-nome">Nome</label><input id="${id}-nome" name="Nome" required autocomplete="name"></div>
  <div class="campo"><label for="${id}-wa">WhatsApp</label><input id="${id}-wa" name="WhatsApp" type="tel" autocomplete="tel"></div>
  <div class="campo campo-largo"><label for="${id}-mail">E-mail</label><input id="${id}-mail" name="E-mail" type="email" autocomplete="email"></div>
  <div class="campo campo-largo"><label for="${id}-msg">Mensagem</label><textarea id="${id}-msg" name="Mensagem" rows="4"></textarea></div>
  <button class="btn ${v === 'a' ? 'btn-laranja' : 'btn-verde'}" type="submit">Enviar mensagem ${ic('seta')}</button>
  <p class="form-nota">A mensagem abre no WhatsApp da Energy Solar, já preenchida.</p>
</form>`;

const contatoInfo = () => `<ul class="info">
  <li>${ic('tel')}<div><b>Telefone</b><a href="tel:${E.telHref}">${E.tel}</a> · Ligar agora</div></li>
  <li>${ic('wa')}<div><b>WhatsApp</b><a href="${waLink()}"${fora}>${E.tel}</a> · Chamar agora</div></li>
  <li>${ic('pin')}<div><b>Endereço</b>${E.rua}<br>${E.cidade}<br><a href="${E.mapa}"${fora}>Como chegar</a></div></li>
  <li>${ic('relogio')}<div><b>Horário de funcionamento</b>${E.horario.map(([d, h]) => `${d}: ${h}`).join('<br>')}</div></li>
  <li>${ic('insta')}<div><b>Instagram</b><a href="${E.insta}"${fora}>${E.instaNome}</a></div></li>
</ul>`;

const mapa = () => `<div class="mapa"><iframe src="https://www.google.com/maps?q=${encodeURIComponent('R. Nilson Costa, 356, Vila Laura, Salvador - BA')}&output=embed" title="Mapa: Energy Solar, R. Nilson Costa, 356, Salvador" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

// Diagrama do caminho da energia: sol, painel, inversor, quadro e medidor bidirecional com a rede.
const diagrama = () => `<figure class="diagrama" aria-label="Caminho da energia solar: painel, inversor, quadro de luz e medidor bidirecional ligado à rede">
<svg viewBox="0 0 960 300" role="img" aria-hidden="true">
  <defs><linearGradient id="dg-sol" x1="0" x2="1"><stop offset="0" stop-color="#FFD400"/><stop offset=".55" stop-color="#F7931E"/><stop offset="1" stop-color="#E5391B"/></linearGradient></defs>
  <circle cx="70" cy="70" r="34" fill="url(#dg-sol)"/>
  <g stroke="#F7931E" stroke-width="4" stroke-linecap="round"><path d="M70 14v-8M70 134v-8M14 70H6M134 70h-8M30 30l-6-6M110 110l6 6M30 110l-6 6M110 30l6-6"/></g>
  <path class="dg-luz" d="M110 100 L200 150" stroke="#F7931E" stroke-width="3" stroke-dasharray="6 8" fill="none"/>
  <g transform="translate(190 140) skewX(-14)"><rect width="120" height="80" rx="6" fill="#1C6E52"/><g fill="#66B837"><rect x="8" y="8" width="30" height="18" rx="2"/><rect x="45" y="8" width="30" height="18" rx="2"/><rect x="82" y="8" width="30" height="18" rx="2"/><rect x="8" y="31" width="30" height="18" rx="2"/><rect x="45" y="31" width="30" height="18" rx="2"/><rect x="82" y="31" width="30" height="18" rx="2"/><rect x="8" y="54" width="30" height="18" rx="2"/><rect x="45" y="54" width="30" height="18" rx="2"/><rect x="82" y="54" width="30" height="18" rx="2"/></g></g>
  <path class="dg-fio" d="M310 180 H400" stroke="#66B837" stroke-width="5" fill="none"/>
  <rect x="400" y="135" width="80" height="100" rx="10" fill="#fff" stroke="#1C6E52" stroke-width="4"/><path d="M420 170h40M420 190l8-8 8 8 8-8 8 8" stroke="#1C6E52" stroke-width="4" fill="none"/><circle cx="440" cy="215" r="5" fill="#66B837"/>
  <path class="dg-fio" d="M480 185 H580" stroke="#66B837" stroke-width="5" fill="none"/>
  <rect x="580" y="130" width="90" height="110" rx="6" fill="#fff" stroke="#1C6E52" stroke-width="4"/><path d="M600 150v30M625 150v30M650 150v30M600 210h50" stroke="#1C6E52" stroke-width="4"/>
  <path class="dg-fio" d="M670 185 H760" stroke="#66B837" stroke-width="5" fill="none"/>
  <circle cx="805" cy="185" r="45" fill="#fff" stroke="#1C6E52" stroke-width="4"/><path d="M780 190h50M818 178l12 12-12 12M792 178l-12 12 12 12" stroke="#F7931E" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path class="dg-fio dg-volta" d="M850 185 H940" stroke="#F7931E" stroke-width="5" fill="none"/>
  <g font-family="inherit" font-size="17" font-weight="600" fill="#1d2a24" text-anchor="middle"><text x="250" y="270">Painel solar</text><text x="440" y="270">Inversor</text><text x="625" y="270">Quadro de luz</text><text x="805" y="270">Medidor</text><text x="905" y="165">Rede</text></g>
</svg>
<figcaption>O sol gera energia no painel, o inversor transforma em corrente alternada, o quadro distribui pela casa e o que sobra vai para a rede como crédito.</figcaption>
</figure>`;

// ================= VERSÃO A: Telhado =================
const tituloA = (olho, h, tag = 'h2') => `<div class="tit-bloco"><p class="olho">${olho}</p><${tag} class="tit">${h}</${tag}></div>`;

const servicosA = (lista = servicos) => `<div class="serv-a">${lista.map((s, i) => `<article><span class="serv-ic">${ic(s.id)}</span><span class="serv-n">0${i + 1}</span><h3>${s.nome}</h3><p>${s.txt}</p></article>`).join('')}</div>`;

const obrasA = () => `<div class="obras-a">${obras.map(o => `<a class="obra" href="/a/obras/#obra-${o.foto}">${img(o.foto)}<span class="obra-tag">${o.tipo}</span><span class="obra-txt"><b>Projeto fotovoltaico de ${o.kwp} kWp</b><span>Em ${o.cidade}</span><span class="obra-ver">Confira ${ic('seta')}</span></span></a>`).join('')}</div>`;

const economiaA = () => `<section class="economia"><div class="in"><div><h2>Economize até 95% na sua conta de energia!</h2><p>Solicite um orçamento agora, sem compromisso!</p></div><div class="economia-acoes"><a class="btn btn-laranja" href="/a/orcamento/">Orçamento ${ic('seta')}</a>${btnWa('WhatsApp', undefined, 'btn btn-linha-branca')}</div></div></section>`;

const sloganA = () => `<section class="slogan">${img('painel-ceu', { cls: 'slogan-foto' })}<div class="in"><p>${sobre.slogan[0]}<br><b>${sobre.slogan[1]}</b></p></div></section>`;

const passosA = () => `<ol class="passos-a">${etapas.map((e, i) => `<li><span class="passo-ic">${ic(e.id)}</span><span class="passo-n">0${i + 1}</span><h3>${e.nome}</h3></li>`).join('')}</ol>`;

function homeA() {
  return `<section class="hero"><div class="hero-grade" aria-hidden="true"></div><div class="in">
  <div class="hero-txt">
    <p class="olho">Energia solar em Salvador, na Bahia e em Sergipe</p>
    <h1><span>Instale</span> energia solar</h1>
    <p class="hero-marcas">${sobre.marcas.replace(': ', ':<br>')}</p>
    <div class="hero-acoes"><a class="btn btn-laranja" href="/a/orcamento/">Solicitar orçamento ${ic('seta')}</a>${btnWa('(71) 98266-2650', undefined, 'btn btn-linha')}</div>
  </div>
  <figure class="hero-foto">${img('instalador', { lazy: false })}<figcaption>${ic('sol')} Até 95% de economia na conta de luz</figcaption></figure>
</div></section>

<section class="sobre-a"><div class="in">
  <figure class="sobre-foto">${img('obra-4140')}</figure>
  <div class="sobre-txt">${tituloA('Quem somos', 'Energy Solar')}<p class="destaque">${sobre.frase}</p><p>${sobre.area}</p>
    <ul class="segs-a">${segmentos.map(s => `<li>${ic(s.id)} ${s.nome}</li>`).join('')}</ul>
    <a class="link" href="/a/quem-somos/">Saiba mais ${ic('seta')}</a></div>
</div></section>

${economiaA()}

<section class="secao"><div class="in">
  <div class="cab-secao">${tituloA('Nossos serviços', 'Confira nossos serviços')}<a class="link" href="/a/servicos/">Ver todos ${ic('seta')}</a></div>
  ${servicosA()}
</div></section>

<section class="secao secao-cinza"><div class="in">
  <div class="cab-secao">${tituloA('Nossas obras', 'Confira algumas obras')}<a class="link" href="/a/obras/">Ver obras ${ic('seta')}</a></div>
  ${obrasA()}
</div></section>

<section class="simula-a"><div class="simula-fundo">${img('por-do-sol', { alt: '' })}</div><div class="in">
  <div class="simula-txt"><p class="olho">Retorno rápido!</p><h2 class="tit">Soluções em energia solar!</h2><p>Preencha o formulário de simulação com o valor da sua conta de luz. A Energy Solar responde pelo WhatsApp com a proposta do seu sistema.</p>
    <ul class="checks">${['Projeto sob medida para o seu consumo', 'Homologação com a distribuidora por nossa conta', 'Inversores string ou microinversores'].map(t => `<li>${ic('ok')} ${t}</li>`).join('')}</ul></div>
  <div class="simula-form"><h3>Formulário de simulação</h3>${formSimulacao('a')}</div>
</div></section>

<section class="secao"><div class="in como-a">
  <div>${tituloA('Energia limpa', 'Como funciona a energia solar?')}<p>${comoFunciona.intro}</p><a class="btn btn-verde" href="/a/como-funciona/">Confira mais ${ic('seta')}</a></div>
  ${passosA()}
</div></section>

${sloganA()}`;
}

function quemSomosA() {
  return `${capa('a', { nome: 'Quem somos', titulo: 'Quem somos', sub: sobre.frase })}
<section class="secao"><div class="in sobre-pag">
  <div class="sobre-txt">${tituloA('Energy Solar', 'Energia solar do projeto à manutenção')}<p class="destaque">${sobre.area}</p><p>Cuidamos do projeto, da homologação junto à distribuidora, da instalação e da manutenção, sempre com ${sobre.marcas.charAt(0).toLowerCase() + sobre.marcas.slice(1).replace(':', ',')}</p>
  <a class="btn btn-laranja" href="/a/orcamento/">Solicitar orçamento ${ic('seta')}</a></div>
  <figure class="sobre-foto">${img('instalador')}</figure>
</div></section>
<section class="secao secao-cinza"><div class="in">
  <div class="cab-secao">${tituloA('Onde instalamos', 'Residências, condomínios, indústrias, comércio e rural')}</div>
  <ul class="segs-grade">${segmentos.map(s => `<li><span class="serv-ic">${ic(s.id)}</span><h3>${s.nome}</h3><p>${s.txt}</p></li>`).join('')}</ul>
</div></section>
<section class="secao"><div class="in tipos-a">
  <div>${tituloA('Sistemas', 'On Grid e Off Grid')}<p>Instalamos e fazemos a manutenção dos dois tipos de sistema fotovoltaico.</p></div>
  ${tipos.map((t, i) => `<div class="tipo"><span class="tipo-n">${i ? 'OFF' : 'ON'}</span><h3>${t.nome}</h3><p>${t.txt}</p></div>`).join('')}
</div></section>
${economiaA()}
${sloganA()}`;
}

function servicosPagA() {
  const fotoDe = { projeto: 'tecnico', homologacao: 'obra-1081', instalacao: 'instalador', manutencao: 'manutencao' };
  return `${capa('a', { nome: 'Serviços', titulo: 'Nossos serviços', sub: 'Do projeto à manutenção, a Energy Solar cuida de todo o sistema fotovoltaico.' })}
<section class="secao"><div class="in serv-linhas">
  ${servicos.map((s, i) => `<article class="serv-linha${i % 2 ? ' inv' : ''}"><figure>${img(fotoDe[s.id])}</figure><div><span class="serv-n">0${i + 1}</span><h2 class="tit">${s.nome}</h2><p class="destaque">${s.txt}</p><p>${s.mais}</p></div></article>`).join('')}
</div></section>
${economiaA()}`;
}

function comoA() {
  return `${capa('a', { nome: 'Como funciona', titulo: 'Como funciona a energia solar?', sub: comoFunciona.intro })}
<section class="secao"><div class="in">
  <p class="lead">${comoFunciona.intro2} Entenda como funciona o painel solar e a geração de energia.</p>
  ${diagrama()}
</div></section>
<section class="secao secao-cinza"><div class="in">
  <ol class="etapas-a">${etapas.map((e, i) => `<li><span class="etapa-n">0${i + 1}</span><span class="serv-ic">${ic(e.id)}</span><h2>${e.nome}</h2><p>${e.txt}</p></li>`).join('')}</ol>
</div></section>
<section class="secao"><div class="in tipos-a">
  <div>${tituloA('Sistemas', 'On Grid e Off Grid')}<p>A Energy Solar instala e mantém os dois tipos.</p></div>
  ${tipos.map((t, i) => `<div class="tipo"><span class="tipo-n">${i ? 'OFF' : 'ON'}</span><h3>${t.nome}</h3><p>${t.txt}</p></div>`).join('')}
</div></section>
${economiaA()}`;
}

function obrasPagA() {
  return `${capa('a', { nome: 'Obras realizadas', titulo: 'Obras realizadas', sub: 'Algumas das instalações feitas pela Energy Solar na Bahia.' })}
<section class="secao"><div class="in obras-lista">
  ${obras.map((o, i) => `<article class="obra-det${i % 2 ? ' inv' : ''}" id="obra-${o.foto}"><figure>${img(o.foto, { lazy: i > 0 })}</figure><div><span class="obra-tag">${o.tipo}</span><h2 class="tit">Projeto fotovoltaico de ${o.kwp} kWp</h2><p class="obra-local">${ic('pin')} Em ${o.cidade}</p><p>Mais uma instalação realizada com sucesso.</p><dl><div><dt>Potência</dt><dd>${o.kwp} kWp</dd></div><div><dt>Tipo</dt><dd>${o.tipo}</dd></div></dl>${btnWa('Quero um projeto assim', `Olá, vi no site o projeto de ${o.kwp} kWp em ${o.cidade} e gostaria de um orçamento.`, 'btn btn-linha')}</div></article>`).join('')}
  <p class="mais-obras">Mais obras no Instagram: <a href="${E.insta}"${fora}>${E.instaNome}</a></p>
</div></section>
${economiaA()}`;
}

function orcamentoA() {
  return `${capa('a', { nome: 'Solicite um orçamento', titulo: 'Solicite um orçamento', sub: 'Economize até 95% na sua conta de energia. Orçamento sem compromisso.' })}
<section class="secao"><div class="in orc-a">
  <div class="simula-form simula-form-pag"><h2>Formulário de simulação</h2>${formSimulacao('a')}</div>
  <div>${simulador('sim-a', 'Faça uma conta rápida')}</div>
</div></section>
<section class="secao secao-cinza"><div class="in">
  <div class="cab-secao">${tituloA('Depois do pedido', 'Como seguimos com você')}</div>
  ${servicosA(servicos.slice(0, 3))}
</div></section>`;
}

function contatoA() {
  return `${capa('a', { nome: 'Contato', titulo: 'Entre em contato', sub: 'Utilize o formulário abaixo ou fale direto com a nossa equipe.' })}
<section class="secao"><div class="in contato-a">
  <div class="simula-form simula-form-pag"><h2>Envie uma mensagem</h2>${formContato('a')}</div>
  <div><h2 class="tit">Nossa equipe está à disposição</h2>${contatoInfo()}</div>
</div></section>
<section class="secao-mapa">${mapa()}</section>`;
}

// ================= VERSÃO B: Créditos =================
const tituloB = (n, h, tag = 'h2') => `<div class="tit-bloco"><p class="olho"><span>${n}</span></p><${tag} class="tit">${h}</${tag}></div>`;

const fatos = () => `<section class="fatos"><div class="in">
  <div><b>até 95%</b><span>de economia na conta de energia</span></div>
  <div><b>60 meses</b><span>de validade para os créditos de energia</span></div>
  <div><b>On Grid e Off Grid</b><span>instalação e manutenção</span></div>
  <div><b>BA e SE</b><span>atendimento em toda a Bahia e Sergipe</span></div>
</div></section>`;

const fluxoB = (comTexto = false) => `<ol class="fluxo">${etapas.map((e, i) => `<li><span class="fluxo-ic">${ic(e.id)}</span><span class="fluxo-n">${i + 1}</span><h3>${e.nome}</h3>${comTexto ? `<p>${e.txt}</p>` : ''}</li>`).join('')}</ol>`;

const servicosB = () => `<ol class="serv-b">${servicos.map((s, i) => `<li><span class="serv-n">0${i + 1}</span><h3>${ic(s.id)} ${s.nome}</h3><p>${s.txt}</p></li>`).join('')}</ol>`;

const obrasB = () => {
  const [d, ...r] = obras;
  const um = (o, cls) => `<a class="obra-b ${cls}" href="/b/obras/#obra-${o.foto}">${img(o.foto)}<span class="obra-kwp"><b>${o.kwp}</b> kWp</span><span class="obra-local">${o.tipo} · ${o.cidade}</span></a>`;
  return `<div class="obras-b">${um(d, 'grande')}${r.map(o => um(o, '')).join('')}</div>`;
};

const ctaB = (titulo = 'Invista em energia limpa.', texto = sobre.slogan[1]) => `<section class="cta"><div class="in"><div><h2>${titulo}</h2><p>${texto}</p></div><div class="cta-acoes"><a class="btn btn-escuro" href="/b/orcamento/">Solicitar orçamento ${ic('seta')}</a>${btnWa('WhatsApp', undefined, 'btn btn-linha-escura')}</div></div></section>`;

function homeB() {
  return `<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="olho"><span>Energia solar · Salvador, Bahia e Sergipe</span></p>
    <h1>Economize até 95% na sua conta de energia.</h1>
    <p class="hero-sub">${sobre.frase} ${sobre.marcas}</p>
    ${simulador('sim-h')}
  </div>
  <figure class="hero-foto">${img('obra-4140', { lazy: false })}<figcaption><b>41,40 kWp</b> Residência em Salvador-BA, obra da Energy Solar</figcaption></figure>
</div></section>
${fatos()}
<section class="secao"><div class="in">
  <div class="cab-secao">${tituloB('Como funciona', 'Do sol ao seu quadro de luz')}<p>${comoFunciona.intro}</p></div>
  ${fluxoB()}
  <a class="link" href="/b/como-funciona/">Entenda cada etapa ${ic('seta')}</a>
</div></section>
<section class="secao secao-clara"><div class="in segs-b-wrap">
  <div class="cab-secao">${tituloB('Onde instalamos', 'Residências, condomínios, indústrias, comércio e rural')}</div>
  <ul class="segs-b">${segmentos.map(s => `<li>${ic(s.id)}<h3>${s.nome}</h3><p>${s.txt}</p></li>`).join('')}</ul>
</div></section>
<section class="secao"><div class="in serv-b-wrap">
  <div class="serv-b-aside">${tituloB('Serviços', 'Tudo por conta da Energy Solar')}<figure>${img('instalador')}</figure></div>
  ${servicosB()}
</div></section>
<section class="secao secao-clara"><div class="in">
  <div class="cab-secao">${tituloB('Obras realizadas', 'Sistemas instalados na Bahia')}<a class="link" href="/b/obras/">Ver obras ${ic('seta')}</a></div>
  ${obrasB()}
</div></section>
${ctaB()}`;
}

function quemSomosB() {
  return `${capa('b', { nome: 'Quem somos', titulo: 'Energy Solar', sub: sobre.frase, foto: 'instalador' })}
${fatos()}
<section class="secao"><div class="in duas">
  <div>${tituloB('Quem somos', 'Energia solar em toda a Bahia e Sergipe')}</div>
  <div><p class="lead">${sobre.area}</p><p>Fazemos o projeto, a homologação com a distribuidora, a instalação e a manutenção. ${sobre.marcas}</p></div>
</div></section>
<section class="secao secao-clara"><div class="in">
  <div class="cab-secao">${tituloB('Onde instalamos', 'Para cada tipo de imóvel')}</div>
  <ul class="segs-b">${segmentos.map(s => `<li>${ic(s.id)}<h3>${s.nome}</h3><p>${s.txt}</p></li>`).join('')}</ul>
</div></section>
<section class="secao"><div class="in">
  <div class="cab-secao">${tituloB('Sistemas', 'On Grid e Off Grid')}</div>
  <div class="tipos-b">${tipos.map(t => `<div><h3>${t.nome}</h3><p>${t.txt}</p></div>`).join('')}</div>
</div></section>
${ctaB()}`;
}

function servicosPagB() {
  return `${capa('b', { nome: 'Serviços', titulo: 'Nossos serviços', sub: 'Projeto, homologação, instalação e manutenção de sistemas fotovoltaicos On Grid e Off Grid.', foto: 'tecnico' })}
<section class="secao"><div class="in">
  <ol class="serv-b serv-b-pag">${servicos.map((s, i) => `<li><span class="serv-n">0${i + 1}</span><h2>${ic(s.id)} ${s.nome}</h2><div><p class="destaque">${s.txt}</p><p>${s.mais}</p></div></li>`).join('')}</ol>
</div></section>
<section class="secao secao-clara"><div class="in duas">
  <figure class="foto-b">${img('manutencao')}</figure>
  <div>${tituloB('Equipamentos', 'As melhores marcas do mercado')}<p class="lead">Trabalhamos com inversores string e microinversores, escolhidos no projeto de acordo com o telhado e o consumo de cada cliente.</p><a class="btn btn-verde" href="/b/orcamento/">Simular economia ${ic('seta')}</a></div>
</div></section>
${ctaB()}`;
}

function comoB() {
  return `${capa('b', { nome: 'Como funciona', titulo: 'Como funciona a energia solar?', sub: comoFunciona.intro })}
<section class="secao"><div class="in">
  <p class="lead">${comoFunciona.intro2}</p>
  ${diagrama()}
</div></section>
<section class="secao secao-clara"><div class="in">${fluxoB(true)}</div></section>
<section class="secao"><div class="in">
  <div class="cab-secao">${tituloB('Sistemas', 'On Grid e Off Grid')}</div>
  <div class="tipos-b">${tipos.map(t => `<div><h3>${t.nome}</h3><p>${t.txt}</p></div>`).join('')}</div>
</div></section>
${ctaB()}`;
}

function obrasPagB() {
  return `${capa('b', { nome: 'Obras realizadas', titulo: 'Obras realizadas', sub: 'Projetos fotovoltaicos instalados pela Energy Solar em Salvador e Camaçari.' })}
<section class="secao"><div class="in obras-b-pag">
  ${obras.map((o, i) => `<article id="obra-${o.foto}"><figure>${img(o.foto, { lazy: i > 0 })}</figure><div class="obra-ficha"><p class="obra-kwp"><b>${o.kwp}</b> kWp</p><h2>Projeto fotovoltaico de ${o.kwp} kWp</h2><dl><div><dt>Local</dt><dd>${o.cidade}</dd></div><div><dt>Tipo</dt><dd>${o.tipo}</dd></div><div><dt>Situação</dt><dd>Instalado com sucesso</dd></div></dl></div></article>`).join('')}
  <p class="mais-obras">Mais obras no Instagram: <a href="${E.insta}"${fora}>${E.instaNome}</a></p>
</div></section>
${ctaB('Quer um projeto assim?', 'Solicite um orçamento sem compromisso.')}`;
}

function orcamentoB() {
  return `${capa('b', { nome: 'Solicite um orçamento', titulo: 'Solicite um orçamento', sub: 'Faça a conta rápida e mande os seus dados. A Energy Solar responde pelo WhatsApp.' })}
<section class="secao"><div class="in orc-b">
  ${simulador('sim-o')}
  <div class="form-b"><h2>Formulário de simulação</h2>${formSimulacao('b')}</div>
</div></section>
<section class="secao secao-clara"><div class="in">
  <div class="cab-secao">${tituloB('Depois do pedido', 'Do orçamento ao sistema funcionando')}</div>
  ${servicosB()}
</div></section>`;
}

function contatoB() {
  return `${capa('b', { nome: 'Contato', titulo: 'Entre em contato', sub: 'Nossa equipe está à disposição pelo telefone, pelo WhatsApp ou no escritório da Vila Laura.' })}
<section class="secao"><div class="in contato-b">
  <div>${contatoInfo()}</div>
  <div class="form-b"><h2>Envie uma mensagem</h2>${formContato('b')}</div>
</div></section>
<section class="secao-mapa">${mapa()}</section>`;
}

// ---------- montagem ----------
const titulos = {
  index: ['Energy Solar · Energia solar em Salvador, Bahia e Sergipe', 'Instalação e manutenção de sistemas fotovoltaicos On Grid e Off Grid em Salvador, na Bahia e em Sergipe. Economize até 95% na conta de luz.'],
  'quem-somos': ['Quem somos · Energy Solar', 'Empresa especializada em sistemas fotovoltaicos para residências, condomínios, indústrias, comércio e rural na Bahia e em Sergipe.'],
  servicos: ['Serviços · Energy Solar', 'Projeto, homologação, instalação e manutenção de energia solar em Salvador e região.'],
  'como-funciona': ['Como funciona a energia solar · Energy Solar', 'Painel solar, inversor, quadro de luz e créditos de energia: entenda como funciona a energia fotovoltaica.'],
  obras: ['Obras realizadas · Energy Solar', 'Projetos fotovoltaicos de 41,40 kWp em Salvador e de 10,81 e 9,45 kWp em Camaçari.'],
  orcamento: ['Solicite um orçamento · Energy Solar', 'Simule a economia na sua conta de luz e peça um orçamento de energia solar sem compromisso.'],
  contato: ['Contato · Energy Solar', 'Telefone e WhatsApp (71) 98266-2650. R. Nilson Costa, 356, Vila Laura, Salvador - BA.'],
};
const corpos = {
  a: { index: homeA, 'quem-somos': quemSomosA, servicos: servicosPagA, 'como-funciona': comoA, obras: obrasPagA, orcamento: orcamentoA, contato: contatoA },
  b: { index: homeB, 'quem-somos': quemSomosB, servicos: servicosPagB, 'como-funciona': comoB, obras: obrasPagB, orcamento: orcamentoB, contato: contatoB },
};

export function gerarVersao(v) {
  const out = {};
  for (const n of nav) out[n.slug] = pagina(v, n.slug, n.caminho, ...titulos[n.slug], corpos[v][n.slug]());
  return out;
}
