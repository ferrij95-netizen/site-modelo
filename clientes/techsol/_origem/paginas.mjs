// Monta as páginas das versões A ("Sol": fiel ao site atual, com o banner do telhado, a caixa âmbar sobre a caixa azul,
// o painel na grama com folhas, os serviços sobre o campo solar azul, o bloco âmbar curvo do WhatsApp e as dúvidas em
// faixas azuis) e B ("Fatura": mais técnica, com o simulador de economia, os números da Techsol e a foto aérea do
// Frama Atacadista). Estilos em public/assets/{base,a,b}.css, comportamento em public/assets/site.js.
import { empresa as E, waLink, hero, motivos, servicos, etapas, segmentos, financiamento, projetos, faq, sobre, fotos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fora = ' target="_blank" rel="noopener"';

export const nomesVersao = { a: 'Sol', b: 'Fatura' };

const img = (k, { cls = '', lazy = true, alt } = {}) => {
  const [n, w, h, a] = fotos[k];
  return `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${n}" alt="${esc(alt ?? a)}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
};
const credito = k => fotos[k][4] ? `<small class="credito">${fotos[k][4]}</small>` : '';

const I = {
  wa: '<path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z"/><path d="M8.8 8.3c.2-.4.5-.4.8-.4h.5c.2 0 .4 0 .5.4l.8 1.8c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.6 1 1.4 1.8 2.4 2.4.2.1.4.1.5 0l.6-.7c.2-.2.4-.2.6-.1l1.8.8c.3.1.4.3.4.5 0 .5-.1 1.2-.6 1.6-.6.5-1.5.7-2.6.4-2.2-.7-4.3-2.7-5.1-4.8-.4-1.1-.3-2.2.4-2.9z" fill="currentColor" stroke="none"/>',
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  baixo: '<path d="M6 9l6 6 6-6"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  casa: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  loja: '<path d="M4 9l1.5-5h13L20 9"/><path d="M4 9a2.7 2.7 0 005.3 0 2.7 2.7 0 005.4 0A2.7 2.7 0 0020 9"/><path d="M5 11v9h14v-9"/>',
  fabrica: '<path d="M3 20V10l6 4v-4l6 4V5h4v15z"/><path d="M3 20h18"/>',
  trator: '<circle cx="7" cy="16" r="4"/><circle cx="18" cy="17" r="3"/><path d="M7 12V6h6l2 6"/><path d="M11 12h8v5"/>',
  painel: '<path d="M4 15l3-10h10l3 10z"/><path d="M5.5 10h13M12 5v10M9 15l-1 5h8l-1-5"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  grafico: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const icSeg = { residencial: 'casa', comercial: 'loja', industrial: 'fabrica', agronegocio: 'trator' };
const sol = (cls = 'sol') => `<img class="${cls}" src="/assets/img/sol.png" alt="" width="40" height="40" loading="lazy">`;

// ---------- navegação ----------
const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'a-techsol', nome: 'A Techsol', caminho: 'a-techsol/' },
  { slug: 'solucoes', nome: 'Soluções', caminho: 'solucoes/', sub: [{ slug: 'solucoes', nome: 'Todas as soluções', caminho: 'solucoes/' }, ...segmentos.map(s => ({ slug: s.slug, nome: s.nome, caminho: `solucoes/${s.slug}/` }))] },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/', sub: [{ slug: 'servicos', nome: 'Nossos serviços', caminho: 'servicos/' }, { slug: 'como-funciona', nome: 'Como funciona', caminho: 'como-funciona/' }] },
  { slug: 'financiamento', nome: 'Financiamento', caminho: 'financiamento/' },
  { slug: 'projetos', nome: 'Projetos', caminho: 'projetos/' },
  { slug: 'duvidas', nome: 'Dúvidas', caminho: 'duvidas/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];
const grupoDe = sl => nav.find(n => n.slug === sl || n.sub?.some(s => s.slug === sl))?.slug;

function menu(v, atual) {
  const g = grupoDe(atual);
  return nav.map(n => n.sub
    ? `<div class="m-item tem-sub"><a href="/${v}/${n.caminho}"${g === n.slug ? ' aria-current="page"' : ''}>${n.nome}</a><button class="m-abre" type="button" aria-expanded="false" aria-label="Abrir ${n.nome}">${ic('baixo')}</button>
      <div class="m-sub">${n.sub.map(s => `<a href="/${v}/${s.caminho}"${s.slug === atual ? ' aria-current="page"' : ''}>${s.nome}</a>`).join('')}</div></div>`
    : `<div class="m-item"><a href="/${v}/${n.caminho}"${g === n.slug ? ' aria-current="page"' : ''}>${n.nome}</a></div>`).join('');
}

function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
  const fontes = v === 'a'
    ? 'family=Exo+2:ital,wght@0,600;0,700;1,700;1,800;1,900&family=Poppins:wght@400;500;600'
    : 'family=Exo+2:ital,wght@0,500;0,600;0,700;0,800;1,800&family=Inter:wght@400;500;600';
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
<meta property="og:site_name" content="${E.completo}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0079B9">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontes}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const logo = (branco = false) => `<img class="marca-img" src="/assets/img/${branco ? 'logo-branco' : 'logo'}.png" alt="Techsol Energia Solar" width="1217" height="262">`;
const btnWa = (texto = 'Fale conosco', msg, cls = 'btn-wa') => `<a class="${cls}" href="${waLink(msg)}"${fora}><span class="btn-wa-ic">${ic('wa')}</span><span>${texto}</span></a>`;

function topo(v, atual) {
  if (v === 'a') return `<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="Techsol Energia Solar, página inicial">${logo()}</a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  ${btnWa('Fale conosco', undefined, 'btn-wa topo-wa')}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
  return `<div class="faixa"><div class="in"><span>${ic('pin')} ${E.endereco.join(' · ')}</span><span class="so-pc">${ic('relogio')} ${E.horario.join(' · ')}</span><a href="${E.instagram}"${fora}>${ic('insta')} @techsolbrasil</a></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Techsol Energia Solar, página inicial">${logo()}</a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="topo-tel" href="${waLink()}"${fora}>${ic('wa')}<span><small>Orçamento pelo WhatsApp</small>${E.tel.t}</span></a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(true)}<p>Soluções completas de energia solar em todo Mato Grosso do Sul, desde ${E.fundacao}.</p>
    <p class="rod-redes"><a href="${E.instagram}"${fora} aria-label="Instagram">${ic('insta')}</a><a href="${waLink()}"${fora} aria-label="WhatsApp">${ic('wa')}</a></p></div>
  <div><h3>Contato</h3><p><a href="${waLink()}"${fora}>${E.tel.t}</a><br><a href="https://wa.me/${E.tel2.wa}"${fora}>${E.tel2.t}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
  <div><h3>Endereço</h3><p>${E.endereco.join('<br>')}</p><p>${E.horario.join('<br>')}</p><a class="rod-link" href="${E.mapa}"${fora}>${ic('pin')} Como chegar</a></div>
  <nav aria-label="Soluções"><h3>Soluções</h3>${segmentos.map(s => `<a href="/${v}/solucoes/${s.slug}/">${s.nome}</a>`).join('')}<a href="/${v}/financiamento/">Financiamento</a></nav>
</div><p class="rod-fim">© ${E.completo} · Campo Grande, Mato Grosso do Sul</p></footer>
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

const migalhas = (v, trilha) => `<nav class="migalhas" aria-label="Você está em"><a href="/${v}/">Início</a>${trilha.map(([n, c]) => c ? ` / <a href="/${v}/${c}">${n}</a>` : ` / <span>${n}</span>`).join('')}</nav>`;

function capa(v, { eyebrow, titulo, sub, trilha = [], foto }) {
  if (v === 'a') return `<section class="capa"><div class="capa-fundo"></div><div class="in">${migalhas(v, trilha)}${eyebrow ? `<p class="olho">${eyebrow}</p>` : ''}<h1>${titulo}</h1>${sub ? `<p class="capa-sub">${sub}</p>` : ''}</div></section>`;
  return `<section class="capa${foto ? ' com-foto' : ''}"><div class="in"><div class="capa-txt">${migalhas(v, trilha)}${eyebrow ? `<p class="olho">${eyebrow}</p>` : ''}<h1>${titulo}</h1>${sub ? `<p class="capa-sub">${sub}</p>` : ''}</div>${foto ? `<figure class="capa-foto">${img(foto, { lazy: false })}</figure>` : ''}</div></section>`;
}

// ---------- blocos comuns ----------
const faqLista = (itens = faq, aberto = 0) => `<div class="faq">${itens.map((f, i) => `<details${i === aberto ? ' open' : ''}><summary>${f.p}${ic('baixo')}</summary><p>${f.r}</p></details>`).join('')}</div>`;

const simulador = (v, id = 'sim') => `<form class="simulador" data-simulador aria-labelledby="${id}-t" onsubmit="return false">
  <p class="sim-olho">${ic('grafico')} Simulação rápida</p>
  <h2 id="${id}-t" class="sim-t">Quanto você pode economizar?</h2>
  <label class="sim-campo" for="${id}-v">Valor médio da sua conta de luz<span class="sim-valor"><b data-sim-conta>R$ 600</b> por mês</span></label>
  <input id="${id}-v" type="range" min="150" max="10000" step="50" value="600" data-sim-in>
  <div class="sim-res">
    <div><span>Economia por mês</span><b data-sim-mes>até R$ 570</b></div>
    <div><span>Economia em um ano</span><b data-sim-ano>até R$ 6.840</b></div>
  </div>
  <p class="sim-nota">Estimativa com a economia máxima de 95% informada pela Techsol. O valor real depende do seu consumo e do dimensionamento do sistema.</p>
  <a class="btn-wa sim-wa" data-sim-wa href="${waLink('Olá, vim do site. Minha conta de luz é de cerca de R$ 600 por mês e gostaria de um orçamento de energia solar.')}"${fora}><span class="btn-wa-ic">${ic('wa')}</span><span>Pedir orçamento</span></a>
</form>`;

const formContato = v => `<form class="form" data-form-wa="${E.tel.wa}">
  <div class="campo"><label for="f-nome">Nome</label><input id="f-nome" name="Nome" required autocomplete="name"></div>
  <div class="campo"><label for="f-cidade">Cidade</label><input id="f-cidade" name="Cidade" autocomplete="address-level2" placeholder="Campo Grande"></div>
  <div class="campo"><label for="f-tipo">Onde quer instalar</label><select id="f-tipo" name="Imóvel">${segmentos.map(s => `<option>${s.curto}</option>`).join('')}</select></div>
  <div class="campo"><label for="f-conta">Valor médio da conta de luz</label><input id="f-conta" name="Conta de luz" inputmode="numeric" placeholder="R$ 600"></div>
  <div class="campo campo-largo"><label for="f-msg">Mensagem</label><textarea id="f-msg" name="Mensagem" rows="4" placeholder="Conte um pouco sobre o seu projeto"></textarea></div>
  <button class="${v === 'a' ? 'btn-wa' : 'btn'}" type="submit">${v === 'a' ? `<span class="btn-wa-ic">${ic('wa')}</span><span>Enviar pelo WhatsApp</span>` : `Enviar pelo WhatsApp ${ic('seta')}`}</button>
  <p class="form-nota">A mensagem abre no WhatsApp da Techsol, já preenchida. Se preferir, escreva para <a href="mailto:${E.email}">${E.email}</a>.</p>
</form>`;

const contatoInfo = () => `<ul class="info">
  <li>${ic('wa')}<div><b>WhatsApp</b><a href="${waLink()}"${fora}>${E.tel.t}</a> · <a href="https://wa.me/${E.tel2.wa}"${fora}>${E.tel2.t}</a></div></li>
  <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><b>Endereço</b>${E.endereco.join('<br>')}<br><a href="${E.mapa}"${fora}>Como chegar</a></div></li>
  <li>${ic('relogio')}<div><b>Horário</b>${E.horario.join('<br>')}</div></li>
  <li>${ic('insta')}<div><b>Instagram</b><a href="${E.instagram}"${fora}>@techsolbrasil</a></div></li>
</ul>`;

const mapa = () => `<div class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa: Techsol, Av. Ceará, 1039, Campo Grande" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

// Bloco âmbar curvo do WhatsApp (versão A), como o "Vamos conversar sobre o seu projeto?" do site atual.
const conversaA = (titulo = 'Vamos conversar sobre o seu projeto?', texto = 'Se você está pensando em investir em energia solar, nossa equipe está pronta para te orientar com transparência e soluções sob medida.', msg) => `<section class="conversa"><div class="in">
  <img class="folha f1" src="/assets/img/folha-3.webp" alt="" width="343" height="208" loading="lazy">
  <img class="folha f2" src="/assets/img/folha-1.webp" alt="" width="141" height="156" loading="lazy">
  <div class="conversa-arco"><h2>${titulo}</h2><p>${texto}</p>${btnWa('Fale conosco', msg, 'btn-wa btn-wa-claro')}</div>
  <div class="conversa-tel"><a href="${waLink(msg)}"${fora}>${ic('wa')}<span><small>WhatsApp</small>${E.tel.t}</span></a><a href="https://wa.me/${E.tel2.wa}"${fora}>${ic('wa')}<span><small>WhatsApp</small>${E.tel2.t}</span></a></div>
</div></section>`;

const ctaB = (titulo = 'Vamos conversar sobre o seu projeto?', texto = 'Nossa equipe está pronta para te orientar com transparência e soluções sob medida.', msg) => `<section class="cta"><div class="in"><div><h2>${titulo}</h2><p>${texto}</p></div><div class="cta-acoes"><a class="btn btn-escuro" href="${waLink(msg)}"${fora}>${ic('wa')} Chamar no WhatsApp</a><a class="cta-tel" href="tel:${E.tel.h}">${ic('tel')} ${E.tel.t}</a></div></div></section>`;
const cta = (v, ...a) => v === 'a' ? conversaA(...a) : ctaB(...a);

// ---------- versão A ----------
function etapasA() {
  return `<ol class="arco-etapas">${etapas.map((e, i) => `<li style="--i:${i}"><span class="ae-n">${i + 1}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>`;
}

function homeA() {
  return `<section class="hero"><div class="hero-foto">${img('telhado', { lazy: false })}</div><div class="in">
  <div class="hero-caixas">
    <h1 class="hero-ambar">${hero.titulo}</h1>
    <div class="hero-azul"><p>${hero.texto}</p>${btnWa('Fale conosco', undefined, 'btn-wa btn-wa-claro')}</div>
  </div>
</div></section>

<section class="porque"><div class="in">
  <div class="porque-arte">
    <img class="folha f1" src="/assets/img/folha-2.webp" alt="" width="300" height="313" loading="lazy">
    <img class="folha f2" src="/assets/img/folha-1.webp" alt="" width="141" height="156" loading="lazy">
    ${img('painel-grama', { cls: 'porque-img' })}
    <img class="folha f3" src="/assets/img/folha-3.webp" alt="" width="343" height="208" loading="lazy">
  </div>
  <div class="porque-txt">
    <h2>Por que escolher a Techsol Brasil?</h2>
    <ul class="motivos">${motivos.map(m => `<li>${sol()}<p><b>${m.t}:</b> ${m.d.charAt(0).toLowerCase() + m.d.slice(1)}</p></li>`).join('')}</ul>
    <a class="link-seta" href="/a/a-techsol/">Conheça a Techsol ${ic('seta')}</a>
  </div>
</div></section>

<section class="servicos-home"><div class="in">
  <div class="sh-txt"><h2>Nossos serviços</h2><p>${financiamento.texto}</p>${btnWa('Fale conosco', undefined, 'btn-wa btn-wa-claro')}</div>
  <div class="sh-grade">${servicos.map(s => `<a class="sh-item" href="/a/servicos/#${s.slug}">${sol()}<h3>${s.t}</h3><p>${s.d}</p></a>`).join('')}</div>
</div></section>

<section class="atende"><div class="in">
  <div class="sec-topo"><h2>Atendemos todo Mato Grosso do Sul</h2><p>Residências, comércios, indústrias e o agronegócio, cada um com projeto sob medida.</p></div>
  <div class="atende-fila">${segmentos.map(s => `<a class="atende-item" href="/a/solucoes/${s.slug}/">${img(s.foto)}<span class="atende-rot">${ic(icSeg[s.slug])}<b>${s.nome}</b><small>${s.lead}</small></span></a>`).join('')}</div>
</div></section>

<section class="como"><div class="in">
  <div class="sec-topo"><h2>Do projeto ao monitoramento</h2><p>Cuidamos de tudo do início ao fim. Prazo médio de até 60 dias úteis após o fechamento do contrato.</p></div>
  ${etapasA()}
</div></section>

<section class="projetos-home"><div class="in">
  <figure class="ph-grande">${img('frama-aerea')}<figcaption><b>${projetos[0].t}</b>${projetos[0].legenda}</figcaption></figure>
  <div class="ph-lado">
    <h2>Milhares de projetos em todo o Mato Grosso do Sul</h2>
    <blockquote><p>“${sobre.citacao.t}”</p><cite>${sobre.citacao.quem}</cite></blockquote>
    <figure class="ph-peq">${img('garagem-solar')}<figcaption>${projetos[1].legenda}</figcaption></figure>
    <a class="link-seta" href="/a/projetos/">Ver projetos ${ic('seta')}</a>
  </div>
</div></section>

${conversaA()}

<section class="duvidas-home"><div class="in"><h2>Dúvidas frequentes</h2>${faqLista()}</div></section>

<section class="contato-home"><div class="in">
  <div class="ch-info"><h2>Contato</h2>${contatoInfo()}</div>
  <div class="ch-mapa">${mapa()}</div>
</div></section>`;
}

// ---------- versão B ----------
const numeros = [
  { n: '7', u: 'anos', d: 'no mercado de energia solar' },
  { n: '95', u: '%', pre: 'até', d: 'de economia na conta de luz' },
  { n: '60', u: 'dias', pre: 'até', d: 'para instalar após o contrato' },
  { n: '21', u: 'x', pre: 'em até', d: 'no cartão, ou financiamento bancário' },
];
const numerosB = () => `<section class="numeros"><div class="in">${numeros.map(x => `<div class="num"><p class="num-v">${x.pre ? `<small>${x.pre}</small>` : ''}${x.n}<span>${x.u}</span></p><p class="num-d">${x.d}</p></div>`).join('')}</div></section>`;

function etapasB() {
  return `<ol class="linha-etapas">${etapas.map((e, i) => `<li><span class="le-n">${String(i + 1).padStart(2, '0')}</span><div><h3>${e.t}</h3><p>${e.d}</p></div></li>`).join('')}</ol>`;
}

function abasSeg(v) {
  return `<div class="abas" data-abas>
  <div class="abas-bts" role="tablist">${segmentos.map((s, i) => `<button type="button" role="tab" id="aba-${s.slug}" aria-controls="painel-${s.slug}" aria-selected="${i === 0}">${ic(icSeg[s.slug])}${s.nome}</button>`).join('')}</div>
  ${segmentos.map((s, i) => `<div class="aba-painel" role="tabpanel" id="painel-${s.slug}" aria-labelledby="aba-${s.slug}"${i ? ' data-oculto' : ''}>
    <figure>${img(s.foto)}</figure>
    <div><h3>${s.titulo}</h3><p>${s.lead}</p><ul class="lista-ok">${s.pontos.map(p => `<li>${ic('ok')}${p}</li>`).join('')}</ul><a class="link-seta" href="/${v}/solucoes/${s.slug}/">Saiba mais ${ic('seta')}</a></div>
  </div>`).join('')}
</div>`;
}

function homeB() {
  return `<section class="hero"><div class="hero-foto">${img('frama-aerea', { lazy: false })}</div><div class="in">
  <div class="hero-txt">
    <p class="olho">${ic('sol')} Energia solar em todo Mato Grosso do Sul</p>
    <h1>${hero.titulo}</h1>
    <p class="hero-sub">${hero.texto}</p>
    <div class="hero-acoes"><a class="btn btn-ambar" href="${waLink()}"${fora}>${ic('wa')} Pedir orçamento</a><a class="btn btn-linha" href="/b/como-funciona/">Como funciona</a></div>
    <p class="hero-foto-leg">Na foto: Frama Atacadista, Campo Grande, sistema instalado pela Techsol.</p>
  </div>
  ${simulador('b', 'sim-home')}
</div></section>

${numerosB()}

<section class="segs"><div class="in">
  <div class="sec-topo"><p class="olho">Soluções</p><h2>Atendemos residências, comércios, indústrias e o agronegócio</h2></div>
  ${abasSeg('b')}
</div></section>

<section class="processo"><div class="in">
  <div class="processo-txt"><p class="olho">Como funciona</p><h2>Cuidamos de tudo do início ao fim</h2><p>Projeto, aprovação, fornecimento dos equipamentos, instalação e monitoramento. Também oferecemos manutenção e expansão do sistema.</p>
    <figure class="processo-foto">${img('instalacao')}${credito('instalacao')}</figure></div>
  ${etapasB()}
</div></section>

<section class="serv-lista"><div class="in">
  <div class="sec-topo"><p class="olho">Serviços</p><h2>Nossos serviços</h2></div>
  <ul class="linhas">${servicos.map((s, i) => `<li><a href="/b/servicos/#${s.slug}"><span class="ln-n">${String(i + 1).padStart(2, '0')}</span><b>${s.t}</b><span class="ln-d">${s.d}</span>${ic('seta')}</a></li>`).join('')}</ul>
</div></section>

<section class="destaque"><div class="in">
  <figure>${img('garagem-solar')}</figure>
  <div class="destaque-txt"><p class="olho">Na sede</p><h2>Garagem solar na Av. Ceará</h2><p>${projetos[1].legenda} Com monitoramento em tempo real, cada cliente acompanha pelo celular quanto está economizando e quanto deixou de emitir de CO₂.</p>
    <blockquote><p>“${sobre.citacao.t}”</p><cite>${sobre.citacao.quem}</cite></blockquote>
    <a class="link-seta" href="/b/projetos/">Ver projetos ${ic('seta')}</a></div>
</div></section>

<section class="fin-faixa"><div class="in">
  <div><p class="olho">Financiamento</p><h2>Parcele em até 21x no cartão ou financie pelos principais bancos</h2></div>
  <ul class="bancos">${financiamento.bancos.map(b => `<li>${b}</li>`).join('')}</ul>
  <a class="link-seta" href="/b/financiamento/">Ver formas de pagamento ${ic('seta')}</a>
</div></section>

<section class="duvidas-home"><div class="in"><div class="sec-topo"><p class="olho">Dúvidas frequentes</p><h2>Perguntas que todo cliente faz</h2><p>Não achou a sua? Chame a equipe no WhatsApp: ${E.tel.t}.</p></div>${faqLista()}</div></section>

${ctaB()}`;
}

// ---------- páginas internas ----------
function techsolPag(v) {
  return `${capa(v, { eyebrow: `Desde ${E.fundacao} · Campo Grande, MS`, titulo: 'A Techsol', sub: 'Referência em soluções completas de energia solar em todo Mato Grosso do Sul.', trilha: [['A Techsol']], foto: 'fachada' })}
<section class="texto-foto"><div class="in">
  <div class="tf-txt"><h2>Nasceu da conta de luz</h2><p>${sobre.abertura}</p><p>${sobre.proposito}</p></div>
  ${v === 'a' ? `<figure class="tf-foto">${img('fachada')}<figcaption>${fotos.fachada[3]}.</figcaption></figure>` : `<figure class="tf-foto">${img('garagem-solar')}<figcaption>${projetos[1].legenda}</figcaption></figure>`}
</div></section>
<section class="citacao"><div class="in"><blockquote><p>“${sobre.citacao.t}”</p><cite>${sobre.citacao.quem}</cite></blockquote></div></section>
<section class="texto-foto inverso"><div class="in">
  <figure class="tf-foto">${img(v === 'a' ? 'garagem-solar' : 'frama-aerea')}</figure>
  <div class="tf-txt"><h2>Tecnologia que trabalha a favor do cliente</h2><p>${sobre.tecnologia}</p><p>${sobre.futuro}</p></div>
</div></section>
<section class="motivos-sec"><div class="in"><h2>Por que escolher a Techsol Brasil?</h2>
  <ul class="motivos ${v === 'b' ? 'motivos-b' : ''}">${motivos.map((m, i) => `<li>${v === 'a' ? sol() : `<span class="m-n">${String(i + 1).padStart(2, '0')}</span>`}<p><b>${m.t}</b>${m.d}</p></li>`).join('')}</ul>
</div></section>
${cta(v)}`;
}

function solucoesPag(v) {
  return `${capa(v, { eyebrow: 'Soluções', titulo: 'Energia solar para cada tipo de imóvel', sub: hero.texto, trilha: [['Soluções']] })}
<section class="seg-grade"><div class="in">${segmentos.map((s, i) => `<a class="seg-cartao${i % 3 === 0 ? ' largo' : ''}" href="/${v}/solucoes/${s.slug}/">${img(s.foto)}<div><span class="seg-ic">${ic(icSeg[s.slug])}</span><h2>${s.nome}</h2><p>${s.lead}</p><span class="link-seta">Ver solução ${ic('seta')}</span></div></a>`).join('')}</div></section>
${cta(v)}`;
}

function segPag(v, s) {
  const outros = segmentos.filter(x => x !== s);
  const msg = `Olá, vim do site e gostaria de um orçamento de energia solar para ${s.nome.toLowerCase()}.`;
  return `${capa(v, { eyebrow: `Soluções · ${s.nome}`, titulo: s.titulo, sub: s.lead, trilha: [['Soluções', 'solucoes/'], [s.nome]], foto: s.foto })}
<section class="texto-foto"><div class="in">
  <div class="tf-txt">${s.texto.map(t => `<p>${t}</p>`).join('')}<ul class="lista-ok">${s.pontos.map(p => `<li>${ic('ok')}${p}</li>`).join('')}</ul>
  ${v === 'a' ? btnWa('Pedir orçamento', msg) : `<a class="btn" href="${waLink(msg)}"${fora}>${ic('wa')} Pedir orçamento</a>`}</div>
  ${(f => `<figure class="tf-foto">${img(f)}${credito(f)}</figure>`)(v === 'a' ? s.foto : s.foto2)}
</div></section>
<section class="como"><div class="in"><div class="sec-topo"><h2>Como funciona</h2><p>Prazo médio de até 60 dias úteis após o fechamento do contrato.</p></div>${v === 'a' ? etapasA() : etapasB()}</div></section>
<section class="outros"><div class="in"><h2>Outras soluções</h2><div class="outros-fila">${outros.map(o => `<a href="/${v}/solucoes/${o.slug}/">${ic(icSeg[o.slug])}<b>${o.nome}</b>${ic('seta')}</a>`).join('')}</div></div></section>
${cta(v, undefined, undefined, msg)}`;
}

function servicosPag(v) {
  return `${capa(v, { eyebrow: 'Serviços', titulo: 'Nossos serviços', sub: 'Projeto, aprovação, fornecimento dos equipamentos, instalação e monitoramento. Também oferecemos manutenção e expansão do sistema.', trilha: [['Serviços']] })}
<section class="servicos-det"><div class="in">${servicos.map((s, i) => `<article class="sd" id="${s.slug}">
  <figure>${img(s.foto)}${credito(s.foto)}</figure>
  <div>${v === 'a' ? sol() : `<span class="m-n">${String(i + 1).padStart(2, '0')}</span>`}<h2>${s.t}</h2><p class="sd-lead">${s.d}</p><p>${s.longo}</p>
  <a class="link-seta" href="${waLink(`Olá, vim do site e gostaria de saber mais sobre: ${s.t}.`)}"${fora}>Falar sobre este serviço ${ic('seta')}</a></div>
</article>`).join('')}
<article class="sd sd-monit" id="monitoramento"><div>${v === 'a' ? sol() : ''}<h2>Monitoramento em tempo real</h2><p>${sobre.tecnologia}</p></div></article>
</div></section>
${cta(v)}`;
}

function comoPag(v) {
  return `${capa(v, { eyebrow: 'Como funciona', titulo: 'Do projeto ao monitoramento', sub: 'Cuidamos de tudo do início ao fim. O prazo médio é de até 60 dias úteis após o fechamento do contrato, podendo variar conforme o porte do projeto e aprovações técnicas.', trilha: [['Serviços', 'servicos/'], ['Como funciona']] })}
<section class="como como-pag"><div class="in">${v === 'a' ? etapasA() : etapasB()}</div></section>
<section class="texto-foto"><div class="in">
  <div class="tf-txt"><h2>Posso instalar energia solar em qualquer imóvel?</h2><p>${faq[4].r}</p><h2>Qual a economia na conta de energia?</h2><p>${faq[3].r}</p></div>
  <figure class="tf-foto">${img('instalacao')}${credito('instalacao')}</figure>
</div></section>
${cta(v)}`;
}

function financiamentoPag(v) {
  return `${capa(v, { eyebrow: 'Financiamento', titulo: 'Invista em energia solar com total flexibilidade', sub: financiamento.texto, trilha: [['Financiamento']] })}
<section class="fin"><div class="in">
  <div class="fin-txt">
    <div class="fin-21"><p class="fin-n"><small>em até</small>21x</p><p>no cartão de crédito</p></div>
    <h2>Bancos e linhas de crédito</h2><p>${faq[1].r}</p>
    <ul class="bancos">${financiamento.bancos.map(b => `<li>${b}</li>`).join('')}</ul>
    <p>Para propriedades rurais, trabalhamos com financiamento agro e FCO. <a href="/${v}/solucoes/agronegocio/">Energia solar no agronegócio</a>.</p>
  </div>
  ${simulador(v, 'sim-fin')}
</div></section>
${cta(v)}`;
}

function projetosPag(v) {
  return `${capa(v, { eyebrow: 'Projetos', titulo: 'Projetos instalados', sub: sobre.futuro, trilha: [['Projetos']] })}
<section class="proj"><div class="in">${projetos.map((p, i) => `<article class="proj-item${i % 2 ? ' inverso' : ''}"><figure>${img(p.foto)}</figure><div><p class="olho">${p.tipo} · ${p.onde}</p><h2>${p.t}</h2><p>${p.legenda}</p></div></article>`).join('')}
<p class="proj-nota">Quer ver um projeto parecido com o seu? A equipe envia exemplos de instalações pelo WhatsApp e no Instagram <a href="${E.instagram}"${fora}>@techsolbrasil</a>.</p>
</div></section>
${cta(v)}`;
}

function duvidasPag(v) {
  return `${capa(v, { eyebrow: 'Dúvidas', titulo: 'Dúvidas frequentes', sub: `Não encontrou a sua? Fale com a equipe pelo WhatsApp ${E.tel.t}.`, trilha: [['Dúvidas']] })}
<section class="duvidas-pag"><div class="in">${faqLista(faq, -1)}</div></section>
${cta(v)}`;
}

function contatoPag(v) {
  return `${capa(v, { eyebrow: 'Contato', titulo: 'Vamos conversar sobre o seu projeto?', sub: 'Se você está pensando em investir em energia solar, nossa equipe está pronta para te orientar com transparência e soluções sob medida.', trilha: [['Contato']] })}
<section class="contato"><div class="in">
  <div class="contato-form"><h2>Peça seu orçamento</h2>${formContato(v)}</div>
  <div class="contato-info">${contatoInfo()}</div>
</div></section>
<section class="contato-mapa">${mapa()}</section>`;
}

const D = 'Techsol Energia Solar, Campo Grande MS: economize até 95% na conta de luz. Projeto, instalação e monitoramento para residências, comércios, indústrias e agronegócio.';

export function gerarVersao(v) {
  const p = {};
  const t = s => `${s} · Techsol Energia Solar`;
  p.index = pagina(v, 'index', '', 'Techsol Energia Solar · Economize até 95% na conta de luz', D, v === 'a' ? homeA() : homeB());
  p['a-techsol'] = pagina(v, 'a-techsol', 'a-techsol/', t('A Techsol'), sobre.proposito, techsolPag(v));
  p.solucoes = pagina(v, 'solucoes', 'solucoes/', t('Soluções'), hero.texto, solucoesPag(v));
  for (const s of segmentos) p[`solucoes/${s.slug}`] = pagina(v, s.slug, `solucoes/${s.slug}/`, t(s.titulo), s.lead, segPag(v, s));
  p.servicos = pagina(v, 'servicos', 'servicos/', t('Serviços'), 'Venda e instalação de painéis solares, usinas, expansão de sistemas e manutenção preventiva e corretiva.', servicosPag(v));
  p['como-funciona'] = pagina(v, 'como-funciona', 'como-funciona/', t('Como funciona'), faq[2].r, comoPag(v));
  p.financiamento = pagina(v, 'financiamento', 'financiamento/', t('Financiamento'), financiamento.texto, financiamentoPag(v));
  p.projetos = pagina(v, 'projetos', 'projetos/', t('Projetos'), sobre.futuro, projetosPag(v));
  p.duvidas = pagina(v, 'duvidas', 'duvidas/', t('Dúvidas frequentes'), faq[0].r, duvidasPag(v));
  p.contato = pagina(v, 'contato', 'contato/', t('Contato'), `${E.endereco.join(', ')}. WhatsApp ${E.tel.t}.`, contatoPag(v));
  return p;
}
