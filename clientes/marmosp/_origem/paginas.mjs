// Páginas das versões A ("Fachada": a placa vermelha, o muro de granitos e a ordem do site atual) e
// B ("Ateliê": a identidade preta e dourada MSP do Instagram, fotos grandes e a biblioteca de pedras).
// Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, quemSomos, historia, ambientes, pedras, etapas, obras, marmomac } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, { w = 1080, h = 1080, cls = '', lazy = true } = {}) => `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async">`;
const tam = { 'ilha-onix': [864, 1080], 'banheiro-madeira': [1080, 1440], 'banheiro-branco': [1080, 1350], fachada: [1600, 1015], 'muro-pedras': [860, 570] };
const foto = (n, alt, o = {}) => { const [w, h] = tam[n] || [1080, 1080]; return img(n, alt, { w, h, ...o }); };

export const nomesVersao = { a: 'Fachada', b: 'Ateliê' };

const nav = [
  { slug: 'index', a: 'Início', b: 'Início', caminho: '' },
  { slug: 'empresa', a: 'Sobre', b: 'A marmoraria', caminho: 'empresa/' },
  { slug: 'ambientes', a: 'Ambientes', b: 'Ambientes', caminho: 'ambientes/' },
  { slug: 'pedras', a: 'Pedras', b: 'Pedras', caminho: 'pedras/' },
  { slug: 'obras', a: 'Obras', b: 'Projetos', caminho: 'obras/' },
  { slug: 'contato', a: 'Entre em contato', b: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  ig: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.3 6.7h.01"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da Marmoraria São Paulo e gostaria de um orçamento.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;
const ext = 'target="_blank" rel="noopener"';

// ---------- moldura ----------
const fontes = {
  a: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500;600&display=swap',
};

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
<meta name="theme-color" content="${v === 'a' ? '#C8201A' : '#141210'}">
<link rel="icon" href="/assets/favicon-${v}.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontes[v]}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'HomeAndConstructionBusiness', name: E.nome, foundingDate: String(E.desde), telephone: E.foneHref, email: E.email, url: E.url, address: { '@type': 'PostalAddress', streetAddress: E.rua, addressLocality: 'São Paulo', addressRegion: 'SP', postalCode: E.cep, addressCountry: 'BR' }, sameAs: [E.instagram] })}</script>
</head>`;
}

const logoA = (cls = 'logo') => `<img class="${cls}" src="/assets/logo-placa.svg" alt="Marmoraria São Paulo, desde 1952" width="290" height="62">`;
const logoB = (claro = true) => `<span class="msp${claro ? ' msp-claro' : ''}"><img class="msp-selo" src="/assets/img/selo-msp.webp" alt="" width="120" height="120"><span class="msp-barra"></span><span class="msp-txt"><b>MSP</b><small>Marmoraria São Paulo</small></span></span>`;

function topo(v, ativo) {
  const links = nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === ativo ? ' aria-current="page"' : ''}>${n[v]}</a>`).join('');
  if (v === 'a') return `<a class="pular" href="#conteudo">Ir para o conteúdo</a>
<header class="topo">
  <div class="topo-in">
    <a class="marca" href="/a/" aria-label="Marmoraria São Paulo, página inicial">${logoA()}</a>
    <nav class="menu" id="menu" aria-label="Menu principal">${links}</nav>
    <div class="topo-acoes">
      <a class="topo-fone" href="tel:${E.foneHref}">${ic('tel')}<span>${E.fone}</span></a>
      <a class="btn btn-wa" href="${waLink()}" ${ext}>${ic('wa')}<span>Orçamento</span></a>
      <button class="menu-btn" aria-controls="menu" aria-expanded="false" aria-label="Abrir menu">${ic('menu')}</button>
    </div>
  </div>
</header>`;
  return `<a class="pular" href="#conteudo">Ir para o conteúdo</a>
<header class="topo${ativo === 'index' ? ' topo-sobre' : ''}">
  <div class="topo-in">
    <a class="marca" href="/b/" aria-label="Marmoraria São Paulo, página inicial">${logoB(ativo === 'index')}</a>
    <nav class="menu" id="menu" aria-label="Menu principal">${links}</nav>
    <div class="topo-acoes">
      <a class="btn btn-ouro" href="/b/contato/">Pedir orçamento</a>
      <button class="menu-btn" aria-controls="menu" aria-expanded="false" aria-label="Abrir menu">${ic('menu')}</button>
    </div>
  </div>
</header>`;
}

function rodape(v) {
  const links = nav.map(n => `<li><a href="/${v}/${n.caminho}">${n[v]}</a></li>`).join('');
  const marca = v === 'a' ? `<img class="rod-logo" src="/assets/logo-branco.svg" alt="Marmoraria São Paulo, desde 1952" width="260" height="56">` : logoB(true);
  return `<footer class="rodape">
  <div class="rod-in">
    <div class="rod-marca">${marca}<p>Mármores, granitos e pedras naturais com instalação, desde ${E.desde}. Atendemos pessoa física e jurídica.</p></div>
    <div><h2>Páginas</h2><ul>${links}</ul></div>
    <div><h2>Fale com a gente</h2><ul class="rod-contato">
      <li><a href="tel:${E.foneHref}">${ic('tel')}${E.fone}</a></li>
      <li><a href="${waLink()}" ${ext}>${ic('wa')}${E.waTexto}</a></li>
      <li><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></li>
      <li><a href="${E.instagram}" ${ext}>${ic('ig')}${E.arroba}</a></li>
    </ul></div>
    <div><h2>Endereço</h2><p>${E.rua}<br>${E.bairro}, ${E.cidade}<br>CEP ${E.cep}</p><a class="rod-rota" href="${E.rotas}" ${ext}>${ic('pin')}Como chegar</a></div>
  </div>
  <div class="rod-base"><span>© ${E.nome} · desde ${E.desde}</span><span>Proposta de site · Overtus</span></div>
</footer>
<a class="wa-flutua" href="${waLink()}" ${ext} aria-label="Chamar no WhatsApp">${ic('wa')}</a>
<script src="/assets/site.js" defer></script>
</body>
</html>`;
}

const pagina = (v, slug, titulo, desc, corpo) => `${head(v, slug === 'index' ? '' : `${slug}/`, titulo, desc)}
<body class="v-${v} p-${slug}">
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}`;

// Formulário de orçamento: monta a mensagem e abre o WhatsApp (ou o e-mail).
const formulario = (v) => `<form class="form" data-orcamento novalidate>
  <div class="form-lin"><label>Nome<input name="nome" autocomplete="name" required></label><label>Telefone<input name="fone" type="tel" autocomplete="tel" required></label></div>
  <label>E-mail<input name="email" type="email" autocomplete="email"></label>
  <div class="form-lin"><label>Ambiente<select name="ambiente"><option>Cozinha / ilha</option><option>Banheiro / lavabo</option><option>Área externa / piscina</option><option>Escada, soleira ou peitoril</option><option>Peça especial</option><option>Outro</option></select></label>
  <label>Você é<select name="tipo"><option>Pessoa física</option><option>Arquiteto(a) / designer</option><option>Construtora / empresa</option></select></label></div>
  <label>Conte o que precisa<textarea name="msg" rows="4" placeholder="Medidas aproximadas, pedra que gostou, bairro da obra..."></textarea></label>
  <div class="form-acoes"><button class="btn ${v === 'a' ? 'btn-verm' : 'btn-ouro'}" type="submit" data-via="wa">${ic('wa')}Enviar pelo WhatsApp</button><button class="btn btn-linha" type="submit" data-via="email">${ic('mail')}Enviar por e-mail</button></div>
  <p class="form-aviso" role="status" aria-live="polite"></p>
</form>`;
const mapa = `<iframe class="mapa" title="Mapa: ${E.rua}, ${E.bairro}" src="${E.mapa}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

// =====================================================================================
// VERSÃO A · Fachada
// =====================================================================================
function aInicio() {
  return `<section class="a-hero">
  <div class="a-hero-foto">${foto('fachada', 'Fachada da Marmoraria São Paulo: muro de granitos coloridos, portão vermelho e a placa "Marmoraria São Paulo, desde 1952"', { lazy: false })}</div>
  <div class="a-hero-txt">
    <p class="a-selo">Desde ${E.desde} · Zona Norte de São Paulo</p>
    <h1>Mármores e granitos cortados na medida e instalados por quem faz isso há ${E.anos} anos.</h1>
    <p>Cozinhas, banheiros, escadas e áreas externas. Atendemos pessoa física e jurídica.</p>
    <div class="a-hero-btns"><a class="btn btn-verm" href="${waLink()}" ${ext}>${ic('wa')}Agendar orçamento</a><a class="btn btn-linha" href="/a/obras/">Ver obras ${ic('seta')}</a></div>
  </div>
</section>

<section class="a-quem">
  <div class="sec-in a-quem-in">
    <div class="a-quem-txt">
      <h2 class="a-tit">Quem somos nós</h2>
      <p class="a-quem-lead">${esc(quemSomos)}</p>
      <a class="a-link" href="/a/empresa/">Nossa história ${ic('seta')}</a>
    </div>
    <dl class="a-numeros">
      <div><dt>${E.desde}</dt><dd>ano em que começamos</dd></div>
      <div><dt>${E.anos}</dt><dd>anos trabalhando com pedra</dd></div>
      <div><dt>PF e PJ</dt><dd>de reformas a obras de construtoras</dd></div>
    </dl>
  </div>
</section>

<section class="a-muro" aria-label="Pedras que trabalhamos">
  <div class="sec-in">
    <h2 class="a-tit a-tit-claro">Cada pedra do nosso muro é uma pedra que trabalhamos</h2>
    <p>O muro da loja foi montado com retalhos de granitos e mármores. Venha escolher a sua pessoalmente.</p>
    <a class="btn btn-branco" href="/a/pedras/">Conhecer as pedras ${ic('seta')}</a>
  </div>
</section>

<section class="sec a-amb">
  <div class="sec-in">
    <div class="a-cab"><h2 class="a-tit">Para cada ambiente</h2><a class="a-link" href="/a/ambientes/">Todos os ambientes ${ic('seta')}</a></div>
    <div class="a-amb-grade">
      ${ambientes.map((a, i) => `<a class="a-amb-item a-amb-${i}" href="/a/ambientes/#${a.id}">${foto(a.foto, a.alt)}<span class="a-amb-nome">${a.nome}</span></a>`).join('\n      ')}
    </div>
  </div>
</section>

${aEtapas()}

<section class="sec a-obras-home">
  <div class="sec-in">
    <div class="a-cab"><h2 class="a-tit">Obras recentes</h2><a class="a-link" href="${E.instagram}" ${ext}>${ic('ig')}${E.arroba}</a></div>
    <div class="a-tira">${obras.slice(0, 5).map(o => `<figure>${foto(o.foto, o.alt)}<figcaption>${o.t}</figcaption></figure>`).join('')}</div>
  </div>
</section>

${aContatoBloco()}`;
}

const aEtapas = () => `<section class="a-etapas">
  <div class="sec-in">
    <h2 class="a-tit a-tit-claro">Do orçamento à pedra instalada</h2>
    <ol class="a-etapas-lista">${etapas.map(e => `<li><span class="a-etapa-n">${e.n}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>
  </div>
</section>`;

const aContatoBloco = () => `<section class="a-contato" id="contato">
  <div class="sec-in a-contato-in">
    <div class="a-contato-txt">
      <h2 class="a-tit">Entre em contato</h2>
      <p>Agende agora mesmo o seu orçamento. Responda pelo WhatsApp, ligue ou mande sua dúvida por aqui mesmo que entraremos em contato.</p>
      <ul class="a-canais">
        <li><a href="${waLink()}" ${ext}>${ic('wa')}<span><small>WhatsApp</small>${E.waTexto}</span></a></li>
        <li><a href="tel:${E.foneHref}">${ic('tel')}<span><small>Telefone</small>${E.fone}</span></a></li>
        <li><a href="mailto:${E.email}">${ic('mail')}<span><small>E-mail</small>${E.email}</span></a></li>
      </ul>
    </div>
    ${formulario('a')}
  </div>
  ${mapa}
</section>`;

const aCapa = (titulo, sub, fotoN, alt) => `<section class="a-capa">
  <div class="a-capa-txt"><p class="a-selo">Marmoraria São Paulo · desde ${E.desde}</p><h1>${titulo}</h1><p>${sub}</p></div>
  <div class="a-capa-foto">${foto(fotoN, alt, { lazy: false })}</div>
</section>`;

function aEmpresa() {
  return `${aCapa('Sobre a Marmoraria São Paulo', `Pedra é o nosso trabalho desde ${E.desde}.`, 'fachada', 'Fachada da Marmoraria São Paulo')}
<section class="sec">
  <div class="sec-in a-hist">
    <div class="a-hist-ano" aria-hidden="true">${E.desde}</div>
    <div class="a-hist-txt">${historia.map(p => `<p>${p}</p>`).join('')}<p class="a-citacao">“${esc(quemSomos)}”</p></div>
  </div>
</section>
<section class="a-portao">
  <div class="sec-in a-portao-in">
    <figure>${foto('muro-pedras', 'Detalhe do muro da loja, montado com retalhos de granitos de várias cores')}<figcaption>O muro da loja: retalhos de granitos e mármores de várias cores.</figcaption></figure>
    <div><h2 class="a-tit">O que fazemos</h2>
      <ul class="a-checks">
        <li>Medição na obra</li><li>Venda de mármores, granitos e pedras naturais</li><li>Corte, recortes e acabamento de bordas</li><li>Polimento</li><li>Instalação com equipe própria</li><li>Atendimento a pessoa física, arquitetos e construtoras</li>
      </ul>
      <a class="btn btn-verm" href="${waLink()}" ${ext}>${ic('wa')}Falar com a marmoraria</a>
    </div>
  </div>
</section>
<section class="sec a-feira">
  <div class="sec-in a-feira-in">
    <div><p class="a-selo">${marmomac.t}</p><h2 class="a-tit">Atualizados com o que há de novo em pedra</h2><p>${marmomac.d}</p></div>
    ${foto(marmomac.foto, marmomac.alt)}
  </div>
</section>
${aEtapas()}`;
}

function aAmbientes() {
  return `${aCapa('Ambientes', 'Da bancada da cozinha à borda da piscina, a pedra certa para cada lugar da casa ou da obra.', 'ilha-onix', 'Ilha de cozinha em Ônix Cristallo')}
<nav class="a-ancoras sec-in" aria-label="Ambientes">${ambientes.map(a => `<a href="#${a.id}">${a.nome}</a>`).join('')}</nav>
${ambientes.map((a, i) => `<section class="sec a-amb-lin${i % 2 ? ' a-inv' : ''}" id="${a.id}">
  <div class="sec-in a-amb-lin-in">
    <figure>${foto(a.foto, a.alt)}<figcaption>${a.legenda}</figcaption></figure>
    <div><span class="a-num">${String(i + 1).padStart(2, '0')}</span><h2 class="a-tit">${a.nome}</h2><p>${a.texto}</p>
      <ul class="a-checks">${a.itens.map(t => `<li>${t}</li>`).join('')}</ul>
      <a class="btn btn-verm" href="${waLink(`Olá! Vim pelo site e quero um orçamento para ${a.nome.toLowerCase()}.`)}" ${ext}>${ic('wa')}Orçar ${a.nome.toLowerCase()}</a>
    </div>
  </div>
</section>`).join('\n')}`;
}

function aPedras() {
  return `<section class="a-capa a-capa-muro">
  <div class="a-capa-txt"><p class="a-selo">Marmoraria São Paulo · desde ${E.desde}</p><h1>Pedras</h1><p>Trabalhamos com os melhores tipos de mármore do mercado e em muitas variações. Estas são algumas das famílias de pedra que mais saem da nossa oficina.</p></div>
</section>
<section class="sec">
  <div class="sec-in">
    <ul class="a-pedras">${pedras.map(p => `<li><div class="a-pedra-amostra">${img(p.foto, `Amostra: ${p.nome}`, { w: 600, h: 600 })}</div><h2>${p.nome}</h2><p>${p.texto}</p></li>`).join('')}</ul>
    <div class="a-aviso"><p><b>Quer ver a chapa de perto?</b> Cor e veio mudam de uma chapa para outra. Venha à loja na ${E.rua}, ${E.bairro}, e escolha a sua.</p><a class="btn btn-verm" href="${E.rotas}" ${ext}>${ic('pin')}Como chegar</a></div>
  </div>
</section>`;
}

function aObras() {
  return `${aCapa('Obras', 'Alguns trabalhos recentes. Mais fotos no nosso Instagram.', 'banheiro-madeira', 'Banheiro com bancada em pedra')}
<section class="sec">
  <div class="sec-in">
    <div class="a-galeria">${obras.map(o => `<figure><button class="zoom" data-zoom="/assets/img/${o.foto}.webp" aria-label="Ampliar: ${esc(o.t)}">${foto(o.foto, o.alt)}</button><figcaption><b>${o.t}</b><span>${o.d}</span></figcaption></figure>`).join('')}</div>
    <div class="a-aviso"><p><b>Siga ${E.arroba}</b> para ver as obras novas assim que ficam prontas.</p><a class="btn btn-verm" href="${E.instagram}" ${ext}>${ic('ig')}Abrir o Instagram</a></div>
  </div>
</section>`;
}

function aContato() {
  return `${aCapa('Entre em contato', 'Agende agora mesmo o seu orçamento.', 'fachada', 'Fachada da Marmoraria São Paulo')}
${aContatoBloco()}
<section class="sec">
  <div class="sec-in a-info">
    <div>${ic('pin')}<h2>Endereço</h2><p>${E.rua}<br>${E.bairro}, ${E.cidade}<br>CEP ${E.cep}</p></div>
    <div>${ic('tel')}<h2>Telefones</h2><p>Fixo ${E.fone}<br>WhatsApp ${E.waTexto}</p></div>
    <div>${ic('mail')}<h2>E-mail</h2><p><a href="mailto:${E.email}">${E.email}</a></p></div>
  </div>
</section>`;
}

// =====================================================================================
// VERSÃO B · Ateliê
// =====================================================================================
function bInicio() {
  return `<section class="b-hero">
  <div class="b-hero-txt">
    <p class="b-sobre">Marmoraria São Paulo · desde ${E.desde}</p>
    <h1>Pedra natural, do corte à instalação.</h1>
    <p>Mármores, granitos e ônix sob medida para cozinhas, banheiros e áreas externas. ${E.anos} anos no Chora Menino, Zona Norte de São Paulo.</p>
    <div class="b-hero-btns"><a class="btn btn-ouro" href="/b/contato/">Pedir orçamento</a><a class="btn btn-linha-clara" href="/b/obras/">Ver projetos ${ic('seta')}</a></div>
  </div>
  <figure class="b-hero-foto">${foto('ilha-onix', 'Ilha de cozinha e pia em Ônix Cristallo', { lazy: false })}<figcaption>Ilha e pia em Ônix Cristallo</figcaption></figure>
</section>

<section class="b-faixa" aria-label="Pedras">
  <div class="b-faixa-in">${pedras.map(p => `<a href="/b/pedras/#${p.id}">${img(p.foto, '', { w: 600, h: 600 })}<span>${p.nome}</span></a>`).join('')}</div>
</section>

<section class="sec b-intro">
  <div class="sec-in b-intro-in">
    <p class="b-ano" aria-hidden="true">${E.desde}</p>
    <div><h2 class="b-tit">Mais de 70 anos trabalhando com pedra</h2><p class="b-lead">${esc(quemSomos)}</p><a class="b-link" href="/b/empresa/">Conheça a marmoraria ${ic('seta')}</a></div>
  </div>
</section>

<section class="sec b-amb">
  <div class="sec-in">
    <div class="b-cab"><p class="b-sobre">Ambientes</p><h2 class="b-tit">Onde a pedra entra na sua obra</h2></div>
    <div class="b-amb-lista">${ambientes.map((a, i) => `<a class="b-amb-it" href="/b/ambientes/#${a.id}"><span class="b-amb-n">${String(i + 1).padStart(2, '0')}</span><span class="b-amb-nome">${a.nome}</span><span class="b-amb-txt">${a.texto}</span><span class="b-amb-foto">${foto(a.foto, '')}</span>${ic('seta')}</a>`).join('')}</div>
  </div>
</section>

<section class="b-destaque">
  <div class="b-destaque-foto">${foto('piscina-cascata', 'Parede de pedra com cascata na piscina')}</div>
  <div class="b-destaque-txt"><p class="b-sobre">Área externa</p><h2 class="b-tit">Paredes de pedra, cascatas e bordas de piscina</h2><p>Filetes e pedras rústicas assentados à mão para a área de lazer.</p><a class="b-link" href="/b/ambientes/#externas">Ver área externa ${ic('seta')}</a></div>
</section>

${bEtapas()}

<section class="sec b-proj-home">
  <div class="sec-in">
    <div class="b-cab b-cab-lado"><div><p class="b-sobre">Projetos</p><h2 class="b-tit">Obras recentes</h2></div><a class="b-link" href="/b/obras/">Todos os projetos ${ic('seta')}</a></div>
    <div class="b-mosaico">${obras.slice(0, 4).map((o, i) => `<figure class="b-m${i}">${foto(o.foto, o.alt)}<figcaption>${o.t}</figcaption></figure>`).join('')}</div>
  </div>
</section>

${bChamada()}`;
}

const bEtapas = () => `<section class="sec b-etapas">
  <div class="sec-in">
    <div class="b-cab"><p class="b-sobre">Como trabalhamos</p><h2 class="b-tit">Quatro etapas, uma equipe</h2></div>
    <ol class="b-linha">${etapas.map(e => `<li><span class="b-linha-n">${e.n}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>
  </div>
</section>`;

const bChamada = () => `<section class="b-chamada">
  <div class="sec-in b-chamada-in">
    <div><h2 class="b-tit">Tem um projeto em mente?</h2><p>Mande as medidas aproximadas e a pedra que você gostou. Respondemos com o orçamento.</p></div>
    <div class="b-chamada-btns"><a class="btn btn-ouro" href="${waLink()}" ${ext}>${ic('wa')}WhatsApp ${E.waTexto}</a><a class="btn btn-linha-clara" href="tel:${E.foneHref}">${ic('tel')}${E.fone}</a></div>
  </div>
</section>`;

const bCapa = (sobre, titulo, sub) => `<section class="b-capa"><div class="sec-in"><p class="b-sobre">${sobre}</p><h1>${titulo}</h1><p>${sub}</p></div></section>`;

function bEmpresa() {
  return `${bCapa('A marmoraria', `Desde ${E.desde} na Zona Norte de São Paulo`, 'Mármores, granitos e pedras naturais com medição, corte, acabamento e instalação.')}
<section class="sec">
  <div class="sec-in b-hist">
    <figure>${foto('fachada', 'Fachada da Marmoraria São Paulo com muro de granitos e portão vermelho')}<figcaption>${E.rua}, ${E.bairro}</figcaption></figure>
    <div>${historia.map(p => `<p>${p}</p>`).join('')}</div>
  </div>
</section>
<section class="sec b-claro">
  <div class="sec-in b-numeros">
    <div><b>${E.desde}</b><span>fundação</span></div><div><b>${E.anos}</b><span>anos de oficina</span></div><div><b>PF e PJ</b><span>moradores, arquitetos e construtoras</span></div>
  </div>
</section>
<section class="b-destaque b-inv">
  <div class="b-destaque-foto">${foto(marmomac.foto, marmomac.alt)}</div>
  <div class="b-destaque-txt"><p class="b-sobre">${marmomac.t}</p><h2 class="b-tit">De olho no que há de novo</h2><p>${marmomac.d}</p></div>
</section>
${bEtapas()}
${bChamada()}`;
}

function bAmbientes() {
  return `${bCapa('Ambientes', 'Pedra sob medida para cada ambiente', 'Escolha o ambiente para ver o que fazemos e pedir um orçamento.')}
${ambientes.map((a, i) => `<section class="sec b-amb-sec${i % 2 ? ' b-claro' : ''}" id="${a.id}">
  <div class="sec-in b-amb-sec-in${i % 2 ? ' b-inv-grid' : ''}">
    <figure>${foto(a.foto, a.alt)}<figcaption>${a.legenda}</figcaption></figure>
    <div><span class="b-amb-n">${String(i + 1).padStart(2, '0')}</span><h2 class="b-tit">${a.nome}</h2><p>${a.texto}</p>
      <ul class="b-itens">${a.itens.map(t => `<li>${t}</li>`).join('')}</ul>
      <a class="b-link" href="${waLink(`Olá! Vim pelo site e quero um orçamento para ${a.nome.toLowerCase()}.`)}" ${ext}>Orçar ${a.nome.toLowerCase()} ${ic('seta')}</a>
    </div>
  </div>
</section>`).join('\n')}
${bChamada()}`;
}

function bPedras() {
  return `${bCapa('Pedras', 'Biblioteca de pedras', 'Trabalhamos com os melhores tipos de mármore do mercado e em muitas variações. Cada chapa é única: venha escolher a sua na loja.')}
<section class="sec">
  <div class="sec-in b-biblio">${pedras.map((p, i) => `<article class="b-chapa" id="${p.id}"><div class="b-chapa-img">${img(p.foto, `Amostra: ${p.nome}`, { w: 600, h: 600 })}</div><div><span class="b-amb-n">${String(i + 1).padStart(2, '0')}</span><h2>${p.nome}</h2><p>${p.texto}</p></div></article>`).join('')}</div>
</section>
<section class="b-destaque">
  <div class="b-destaque-foto">${foto('muro-pedras', 'Muro da loja montado com retalhos de granitos coloridos')}</div>
  <div class="b-destaque-txt"><p class="b-sobre">Na loja</p><h2 class="b-tit">O muro da loja é o nosso mostruário</h2><p>Cada retalho é um granito ou mármore que já passou pela oficina. Visite a ${E.rua}, ${E.bairro}.</p><a class="b-link" href="${E.rotas}" ${ext}>Como chegar ${ic('seta')}</a></div>
</section>
${bChamada()}`;
}

function bObras() {
  return `${bCapa('Projetos', 'Obras recentes', `Alguns trabalhos recentes. Mais no Instagram ${E.arroba}.`)}
<section class="sec">
  <div class="sec-in b-galeria">${obras.map((o, i) => `<figure class="b-g${i}"><button class="zoom" data-zoom="/assets/img/${o.foto}.webp" aria-label="Ampliar: ${esc(o.t)}">${foto(o.foto, o.alt)}</button><figcaption><span>${o.d}</span>${o.t}</figcaption></figure>`).join('')}</div>
</section>
${bChamada()}`;
}

function bContato() {
  return `${bCapa('Contato', 'Peça seu orçamento', 'Mande sua dúvida por aqui ou fale direto com a marmoraria.')}
<section class="sec">
  <div class="sec-in b-contato">
    <div class="b-contato-info">
      <dl>
        <div><dt>WhatsApp</dt><dd><a href="${waLink()}" ${ext}>${E.waTexto}</a></dd></div>
        <div><dt>Telefone</dt><dd><a href="tel:${E.foneHref}">${E.fone}</a></dd></div>
        <div><dt>E-mail</dt><dd><a href="mailto:${E.email}">${E.email}</a></dd></div>
        <div><dt>Endereço</dt><dd>${E.rua}<br>${E.bairro}, ${E.cidade}<br>CEP ${E.cep}</dd></div>
        <div><dt>Instagram</dt><dd><a href="${E.instagram}" ${ext}>${E.arroba}</a></dd></div>
      </dl>
    </div>
    ${formulario('b')}
  </div>
</section>
<section class="b-mapa">${mapa}</section>`;
}

const desc = 'Marmoraria São Paulo: mármores, granitos e pedras naturais com instalação, desde 1952, no Chora Menino, Zona Norte de São Paulo.';
export function gerarVersao(v) {
  const fn = v === 'a'
    ? { index: aInicio, empresa: aEmpresa, ambientes: aAmbientes, pedras: aPedras, obras: aObras, contato: aContato }
    : { index: bInicio, empresa: bEmpresa, ambientes: bAmbientes, pedras: bPedras, obras: bObras, contato: bContato };
  const tit = { index: `${E.nome} · Mármores e granitos desde ${E.desde}`, empresa: `Sobre · ${E.nome}`, ambientes: `Ambientes · ${E.nome}`, pedras: `Pedras · ${E.nome}`, obras: `Obras · ${E.nome}`, contato: `Contato · ${E.nome}` };
  return Object.fromEntries(Object.entries(fn).map(([slug, f]) => [slug, pagina(v, slug, tit[slug], desc, f())]));
}
