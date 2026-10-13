// Páginas das duas versões do site da Coopasol.
// A = "Institucional": a mesma ordem do site atual (capa, quem somos com missão, visão e valores, "Seja um cooperado"),
//     cabeçalho claro, faixas retas e leitura calma.
// B = "Safra": capa em tela cheia com a foto dos silos, números, o caminho do grão em etapas e serviços em mosaico.
import * as C from './conteudo.mjs';

const { site } = C;
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra ? ' ' + extra : ''}>`;

// Ícones de traço (24x24).
const I = {
  silo: '<path d="M4 21V9l4-4 4 4v12M12 21V11l4-3.5 4 3.5v10M2 21h20M6 12h4M6 15.5h4M6 19h4M14 14h4M14 17.5h4"/>',
  grafico: '<path d="M3 20h18M6 16l4-5 3 3 5-7"/><path d="M15 7h3v3"/>',
  saco: '<path d="M8 3h8l-1.5 3c3 1.5 4.5 5 4.5 8.5 0 3.5-2.5 6.5-7 6.5s-7-3-7-6.5C5 11 6.5 7.5 9.5 6z"/><path d="M9.5 6h5M10 13h4M10 16h4"/>',
  semente: '<path d="M12 21v-8M12 13c0-4.5 3.2-7.5 8-7.5 0 5-3.2 7.5-8 7.5zM12 15.5c0-3.5-2.6-6-7-6 0 4.2 2.6 6 7 6z"/>',
  agronomo: '<circle cx="12" cy="6.5" r="3"/><path d="M5 21a7 7 0 0 1 14 0M8.5 4.5h7M12 13v4M9.5 17h5"/>',
  caminhao: '<path d="M2 6h11v10H2zM13 9.5h4.5l3.5 3.5v3h-8"/><circle cx="6" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
  balanca: '<path d="M3 17h18v3H3zM6 17V8h7v9M13 11h5l2 3v3"/><circle cx="9.5" cy="5" r="1.5"/>',
  lupa: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 6 6M8 10.5h5M10.5 8v5"/>',
  moega: '<path d="M3 5h18l-6 8v6h-6v-6z"/><path d="M8 9h8"/>',
  secador: '<path d="M7 21V3h10v18M5 21h14M10 7h4M10 11h4M10 15h4"/><path d="M19 6c1 1 1 2 0 3s-1 2 0 3"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  pessoas: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M7.5 14h3M13.5 14h3M7.5 17.5h3"/>',
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 7 8.5-7"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  escudo: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  aperto: '<path d="m11 17 2 2a1.4 1.4 0 0 0 2-2M14 16l2.5 2.5a1.4 1.4 0 0 0 2-2l-3.5-3.5M3 11l4-4 3 1 2.5-2 4.5 1 4 4-3 3M3 11l7 7a1.4 1.4 0 0 0 2-2"/>',
  balanco: '<path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
};
const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const cred = n => (C.creditos[n] ? `<small class="credito">Foto ilustrativa · ${esc(C.creditos[n])}</small>` : '');
const figura = (n, alt, legenda = '') => `<figure class="foto-moldura">${foto(n, alt)}${C.creditos[n] ? `<figcaption>${cred(n)}</figcaption>` : legenda ? `<figcaption>${legenda}</figcaption>` : ''}</figure>`;
const icoValor = { Confiabilidade: 'escudo', Honestidade: 'balanco', Equidade: 'aperto' };

// Títulos e descrições (SEO).
const PAG = {
  index: ['Coopasol · Recebimento e armazenagem de grãos em Dourados (MS)', 'Coopasol Cooperativa Agropecuária Sulmatogrossense: recebimento, armazenagem e comercialização de grãos, insumos, sementes e assistência técnica na MS-162, Dourados.'],
  'a-cooperativa': ['A Cooperativa · Coopasol', 'Missão, visão, valores e diretoria da Coopasol, cooperativa agropecuária de Dourados (MS) desde 1997.'],
  servicos: ['Serviços · Coopasol', 'Recebimento e armazenagem, comercialização de grãos, insumos, sementes certificadas, assistência técnica e transporte.'],
  'seja-cooperado': ['Seja um cooperado · Coopasol', 'Faça parte da Coopasol: preencha seus dados e a cooperativa entra em contato.'],
  contato: ['Contato · Coopasol', 'Telefones, e-mail e endereço da Coopasol na Rodovia MS-162, km 12, Dourados (MS).'],
};
for (const s of C.servicos) PAG['servicos/' + s.slug] = [`${s.nome} · Coopasol`, s.curto];

export function gerarVersao(v) {
  const A = v === 'a';
  const L = s => `/${v}/${s === 'index' ? '' : s + '/'}`;
  const logo = (cor = 'escuro') => `<span class="logo logo-${cor}"><img src="/assets/marca.svg" alt="" width="40" height="40"><span><b>COOPASOL</b><small>Cooperativa Agropecuária Sulmatogrossense</small></span></span>`;

  const menuItens = [['index', 'Início'], ['a-cooperativa', 'A Cooperativa'], ['servicos', 'Serviços'], ['seja-cooperado', 'Seja um cooperado'], ['contato', 'Contato']];
  const nav = slug => menuItens.map(([s, t]) => {
    const atual = slug === s || (s !== 'index' && slug.startsWith(s + '/'));
    if (s === 'servicos') return `<div class="sub"><a href="${L(s)}"${atual ? ' aria-current="page"' : ''}>${t}</a><button type="button" class="sub-btn" aria-expanded="false" aria-label="Abrir lista de serviços"></button><div class="sub-lista">${C.servicos.map(x => `<a href="${L('servicos/' + x.slug)}"${slug === 'servicos/' + x.slug ? ' aria-current="page"' : ''}>${ico(x.ico)}${x.nome}</a>`).join('')}</div></div>`;
    return `<a href="${L(s)}"${atual ? ' aria-current="page"' : ''}>${t}</a>`;
  }).join('');

  const topo = slug => `<header class="topo${!A && slug === 'index' ? ' sobre-foto' : ''}"><div class="in">
  <a class="marca" href="${L('index')}" aria-label="Coopasol, início">${logo(!A && slug === 'index' ? 'claro' : 'escuro')}</a>
  <nav id="nav" class="nav" aria-label="Menu principal">${nav(slug)}</nav>
  <a class="btn btn-sol so-pc" href="tel:${site.foneHref}">${ico('fone')}${site.fone}</a>
  <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
</div></header>`;

  const rodape = () => `<footer class="rodape"><div class="in r-topo">
  <div class="r-marca">${logo('claro')}<p>${esc(C.visao)}</p><a class="r-ig" href="${site.instagram}" target="_blank" rel="noopener">${ico('instagram')}@coopasolcooperativa</a></div>
  <div><h3>A Coopasol</h3><ul>${menuItens.filter(([s]) => s !== 'index').map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}</ul></div>
  <div><h3>Serviços</h3><ul>${C.servicos.map(x => `<li><a href="${L('servicos/' + x.slug)}">${x.nome}</a></li>`).join('')}</ul></div>
  <div><h3>Atendimento</h3><ul>
    <li><a href="tel:${site.foneHref}">${ico('fone')}${site.fone}</a></li>
    <li><a href="tel:${site.fone2Href}">${ico('fone')}${site.fone2}</a></li>
    <li><a href="mailto:${site.email}">${ico('email')}${site.email}</a></li>
    <li><a href="${site.mapa}" target="_blank" rel="noopener">${ico('pin')}${site.endereco}, ${site.cidade}, CEP ${site.cep}</a></li>
  </ul></div>
</div><div class="in r-base"><span>© Coopasol · ${site.razao} · CNPJ ${site.cnpj}</span><span>${site.cidade}</span></div></footer>`;

  const pagina = (slug, corpo) => {
    const [titulo, desc] = PAG[slug];
    const url = `https://coopasol.overtus.com.br${L(slug)}`;
    return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Coopasol">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://coopasol.overtus.com.br/assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="https://coopasol.overtus.com.br/assets/og-${v}.jpg">
<meta name="theme-color" content="#14402A">
<link rel="icon" href="/assets/marca.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v} p-${slug.replace(/\//g, '-')}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(slug)}
<main id="conteudo">
${corpo}
</main>
${rodape()}
<script src="/assets/coopasol.js" defer></script>
</body>
</html>
`;
  };

  // ---------- Peças ----------
  const btn = (href, txt, cls = 'btn-sol') => `<a class="btn ${cls}" href="${href}">${txt}${ico('seta')}</a>`;
  const cab = (eyebrow, titulo, texto, fotoNome, migalha) => `<section class="cab-pag${fotoNome ? ' com-foto' : ''}">${fotoNome ? `<div class="cab-foto">${foto(fotoNome, '', 'fetchpriority="high" loading="eager"')}</div>` : ''}
  ${fotoNome ? cred(fotoNome) : ''}<div class="in"><nav class="migalha" aria-label="Você está em"><a href="${L('index')}">Início</a>${migalha || ''}</nav><span class="eyebrow">${eyebrow}</span><h1>${titulo}</h1>${texto ? `<p class="lead">${texto}</p>` : ''}</div></section>`;

  const mvv = () => A
    ? `<div class="mvv-a">
      <article><span class="mvv-n">Missão</span><p>${esc(C.missao)}</p></article>
      <article><span class="mvv-n">Visão</span><p>${esc(C.visao)}</p></article>
      <article><span class="mvv-n">Valores</span><ul>${C.valores.map(x => `<li>${ico(icoValor[x])}<span><b>${x}</b>${esc(C.valoresTexto[x])}</span></li>`).join('')}</ul></article>
    </div>`
    : `<div class="mvv-b">
      <article class="mvv-missao"><span class="eyebrow">Missão</span><p>${esc(C.missao)}</p></article>
      <article class="mvv-visao">${foto('silos-detalhe', 'Silos metálicos da Coopasol')}<div><span class="eyebrow">Visão</span><p>${esc(C.visao)}</p></div></article>
      ${C.valores.map((x, i) => `<article class="mvv-valor v${i + 1}">${ico(icoValor[x], 'ico ico-g')}<h3>${x}</h3><p>${esc(C.valoresTexto[x])}</p></article>`).join('')}
    </div>`;

  // O caminho do grão: A em linha numerada horizontal, B em trilho com o grão "descendo" pelas etapas.
  const caminho = () => A
    ? `<ol class="etapas-a">${C.etapas.map(([t, d, i], n) => `<li><span class="e-num">${String(n + 1).padStart(2, '0')}</span>${ico(i)}<h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>`
    : `<ol class="etapas-b">${C.etapas.map(([t, d, i], n) => `<li style="--n:${n}"><div class="e-ico">${ico(i)}</div><div class="e-txt"><span>Etapa ${n + 1}</span><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>`;

  const formCooperado = () => `<form class="form-coop" data-form novalidate>
    <div class="campos">
      <label><span>Nome completo</span><input name="nome" autocomplete="name" required></label>
      <label><span>E-mail</span><input name="email" type="email" autocomplete="email" required></label>
      <label><span>Telefone / WhatsApp</span><input name="telefone" type="tel" autocomplete="tel" required></label>
      <label><span>Cidade</span><input name="cidade" autocomplete="address-level2"></label>
      <label class="larga"><span>Área plantada e culturas (opcional)</span><input name="area" placeholder="Ex.: 300 ha de soja e milho safrinha"></label>
      <label class="larga"><span>Mensagem</span><textarea name="mensagem" rows="3"></textarea></label>
    </div>
    <button class="btn btn-sol" type="submit">Quero ser cooperado${ico('seta')}</button>
    <p class="form-aviso" data-aviso role="status">Ao enviar, abrimos o seu e-mail com a mensagem pronta para a Coopasol.</p>
  </form>`;

  const blocoCooperado = () => `<section class="faixa cooperado"><div class="in coop-grid">
    <div class="coop-txt"><span class="eyebrow">Seja um cooperado</span><h2>Sua safra guardada pela cooperativa que é sua</h2>
      <p>Como cooperado, você entrega e armazena seus grãos na unidade da MS-162, tem apoio técnico na lavoura e participa das decisões e dos resultados da Coopasol.</p>
      <ul class="lista-check">${['Recebimento e armazenagem da safra', 'Comercialização em volume', 'Insumos, sementes e assistência técnica', 'Voz nas assembleias'].map(x => `<li>${ico('check')}${x}</li>`).join('')}</ul></div>
    ${formCooperado()}
  </div></section>`;

  const contatoCards = () => `<div class="contato-cards">
    <a href="tel:${site.foneHref}">${ico('fone')}<span><small>Telefone</small><b>${site.fone}</b></span></a>
    <a href="tel:${site.fone2Href}">${ico('fone')}<span><small>Telefone 2</small><b>${site.fone2}</b></span></a>
    <a href="mailto:${site.email}">${ico('email')}<span><small>E-mail</small><b>${site.email}</b></span></a>
    <a href="${site.mapa}" target="_blank" rel="noopener">${ico('pin')}<span><small>Unidade e sede</small><b>${site.endereco}</b>${site.cidade} · CEP ${site.cep} · ${site.caixa}</span></a>
  </div>`;

  const P = {};

  // ---------- Início ----------
  P.index = A
    ? `<section class="capa-a"><div class="in capa-grid">
    <div class="capa-txt"><span class="eyebrow">Cooperativa Agropecuária Sulmatogrossense · desde ${site.fundacao}</span>
      <h1>Recebimento e armazenamento de grãos em Dourados</h1>
      <p class="lead">${esc(C.missao)}</p>
      <div class="acoes">${btn(L('seja-cooperado'), 'Seja um cooperado')}${btn(L('servicos/recebimento-e-armazenagem'), 'Como recebemos sua safra', 'btn-linha')}</div></div>
    <figure class="capa-foto">${foto('capa', 'Silos metálicos e armazém da Coopasol na Rodovia MS-162, em Dourados', 'fetchpriority="high" loading="eager"')}<figcaption>${ico('pin')}Unidade Coopasol · ${site.endereco}, ${site.cidade}</figcaption></figure>
  </div></section>
  <section class="faixa sobre"><div class="in"><div class="titulo-sec"><span class="eyebrow">Quem somos</span><h2>A Coopasol</h2><p>Cooperativa de produtores rurais fundada em ${site.fundacao} na região de Dourados, Mato Grosso do Sul. Recebe, guarda e comercializa a produção dos cooperados e leva para a lavoura insumos, sementes e assistência técnica.</p></div>
    ${mvv()}</div></section>
  <section class="faixa servicos-a"><div class="in"><div class="titulo-sec"><span class="eyebrow">O que fazemos</span><h2>Serviços ao cooperado</h2></div>
    <div class="serv-lista">${C.servicos.map(s => `<a class="serv" href="${L('servicos/' + s.slug)}">${ico(s.ico)}<h3>${s.nome}</h3><p>${s.curto}</p><span class="mais">Saiba mais${ico('seta')}</span></a>`).join('')}</div></div></section>
  <section class="faixa caminho"><div class="in"><div class="titulo-sec"><span class="eyebrow">Recebimento da safra</span><h2>O caminho do grão na Coopasol</h2></div>${caminho()}</div></section>
  ${blocoCooperado()}`
    : `<section class="capa-b">${foto('capa', 'Silos metálicos e armazém da Coopasol na Rodovia MS-162, em Dourados', 'fetchpriority="high" loading="eager"')}
    <div class="in capa-b-txt"><span class="eyebrow">Dourados · Mato Grosso do Sul · desde ${site.fundacao}</span>
      <h1>A principal opção do cooperado no recebimento e armazenamento de grãos</h1>
      <p class="lead">Recebimento, secagem, armazenagem e comercialização da safra, com insumos, sementes e assistência técnica, na Rodovia MS-162, km 12.</p>
      <div class="acoes">${btn(L('seja-cooperado'), 'Seja um cooperado')}${btn(L('contato'), 'Falar com a Coopasol', 'btn-vidro')}</div></div>
    <div class="numeros"><div class="in">
      <div><b>${site.fundacao}</b><span>ano de fundação</span></div>
      <div><b>MS-162</b><span>km 12, Dourados</span></div>
      <div><b>6</b><span>serviços ao cooperado</span></div>
      <div><b>Dourados</b><span>Mato Grosso do Sul</span></div>
    </div></div></section>
  <section class="faixa intro-b"><div class="in intro-grid">
    <div><span class="eyebrow">Quem somos</span><h2>Uma cooperativa feita por quem planta</h2></div>
    <div><p>A Coopasol, Cooperativa Agropecuária Sulmatogrossense, nasceu em ${site.fundacao} na região de Dourados. Seus donos são os próprios produtores, que juntos têm estrutura de recebimento e armazenagem e poder de negociação que nenhum deles teria sozinho.</p>${btn(L('a-cooperativa'), 'Conheça a cooperativa', 'btn-linha')}</div>
  </div></section>
  <section class="faixa mvv-sec"><div class="in">${mvv()}</div></section>
  <section class="faixa caminho caminho-b"><div class="in caminho-grid"><div class="titulo-sec"><span class="eyebrow">Recebimento da safra</span><h2>Da balança ao silo, cada etapa com cuidado</h2><p>O grão do cooperado passa por seis etapas desde que o caminhão chega à unidade até a venda.</p>${btn(L('servicos/recebimento-e-armazenagem'), 'Ver recebimento e armazenagem', 'btn-claro')}</div>${caminho()}</div></section>
  <section class="faixa servicos-b"><div class="in"><div class="titulo-sec"><span class="eyebrow">O que fazemos</span><h2>Serviços ao cooperado</h2></div>
    <div class="bento">${C.servicos.map((s, i) => `<a class="bento-item b${i + 1}" href="${L('servicos/' + s.slug)}">${i === 0 ? foto('silos-detalhe', '') : i === 4 ? foto(s.foto, '') : ''}<div>${ico(s.ico)}<h3>${s.nome}</h3><p>${s.curto}</p><span class="mais">Saiba mais${ico('seta')}</span>${i === 4 ? cred(s.foto) : ''}</div></a>`).join('')}</div></div></section>
  ${blocoCooperado()}`;

  // ---------- A Cooperativa ----------
  P['a-cooperativa'] = `${cab('A Cooperativa', 'Coopasol, Cooperativa Agropecuária Sulmatogrossense', `Cooperativa de produtores rurais de Dourados (MS), fundada em ${site.fundacao}, com unidade de recebimento e armazenagem de grãos na Rodovia MS-162, km 12.`, A ? '' : 'barracao', `<span>A Cooperativa</span>`)}
  <section class="faixa"><div class="in hist-grid">
    <div><h2>Desde ${site.fundacao} ao lado do produtor</h2><p>A Coopasol foi fundada em janeiro de ${site.fundacao} por produtores da região de Dourados que queriam ter, juntos, onde receber, secar e guardar a própria safra, e vender em volume.</p><p>Hoje a cooperativa recebe, armazena e comercializa os grãos dos cooperados e oferece insumos agropecuários, sementes certificadas, assistência técnica, capacitação e transporte.</p></div>
    <figure class="foto-moldura">${foto('capa', 'Unidade da Coopasol na Rodovia MS-162')}<figcaption>Unidade de recebimento e armazenagem, MS-162, km 12</figcaption></figure>
  </div></section>
  <section class="faixa sobre"><div class="in"><div class="titulo-sec"><span class="eyebrow">Princípios</span><h2>Missão, visão e valores</h2></div>${mvv()}</div></section>
  <section class="faixa diretoria"><div class="in"><div class="titulo-sec"><span class="eyebrow">Gestão</span><h2>Diretoria</h2><p>Cooperativa é dirigida pelos próprios cooperados, eleitos em assembleia.</p></div>
    <ul class="dir-lista">${C.diretoria.map(([n, c]) => `<li><span class="dir-ini">${n.split(' ').filter((_, i, a) => i === 0 || i === a.length - 1).map(p => p[0]).join('')}</span><span><b>${n}</b><small>${c}</small></span></li>`).join('')}</ul></div></section>
  ${blocoCooperado()}`;

  // ---------- Serviços ----------
  P.servicos = `${cab('Serviços', 'Tudo o que o cooperado precisa, da semente à venda', 'Seis frentes de trabalho da Coopasol, todas pensadas para o produtor da região de Dourados.', A ? '' : 'silos-detalhe', `<span>Serviços</span>`)}
  <section class="faixa"><div class="in">${A
    ? `<div class="serv-lista">${C.servicos.map(s => `<a class="serv" href="${L('servicos/' + s.slug)}">${ico(s.ico)}<h3>${s.nome}</h3><p>${s.curto}</p><span class="mais">Saiba mais${ico('seta')}</span></a>`).join('')}</div>`
    : `<div class="bento">${C.servicos.map((s, i) => `<a class="bento-item b${i + 1}" href="${L('servicos/' + s.slug)}">${i === 0 ? foto('silos-detalhe', '') : i === 4 ? foto(s.foto, '') : ''}<div>${ico(s.ico)}<h3>${s.nome}</h3><p>${s.curto}</p><span class="mais">Saiba mais${ico('seta')}</span>${i === 4 ? cred(s.foto) : ''}</div></a>`).join('')}</div>`}</div></section>
  <section class="faixa caminho${A ? '' : ' caminho-b'}"><div class="in${A ? '' : ' caminho-grid'}"><div class="titulo-sec"><span class="eyebrow">Recebimento da safra</span><h2>O caminho do grão na Coopasol</h2></div>${caminho()}</div></section>`;

  for (const s of C.servicos) {
    const outros = C.servicos.filter(x => x !== s);
    P['servicos/' + s.slug] = `${cab('Serviços', s.nome, s.curto, A ? '' : s.slug === 'recebimento-e-armazenagem' ? 'silos-detalhe' : s.foto, `<a href="${L('servicos')}">Serviços</a><span>${s.nome}</span>`)}
  <section class="faixa"><div class="in serv-det">
    <div class="serv-texto">${s.texto.map(p => `<p>${p}</p>`).join('')}<ul class="lista-check">${s.pontos.map(x => `<li>${ico('check')}${x}</li>`).join('')}</ul>
      <div class="acoes">${btn(`tel:${site.foneHref}`, `Ligar ${site.fone}`)}${btn(L('seja-cooperado'), 'Seja um cooperado', 'btn-linha')}</div></div>
    <aside class="serv-lado">${A ? figura(s.slug === 'recebimento-e-armazenagem' ? 'silos-detalhe' : s.foto, s.nome, 'Silos metálicos da Coopasol, MS-162') : s.slug === 'recebimento-e-armazenagem' ? figura(s.foto, s.nome) : `<div class="serv-selo">${ico(s.ico, 'ico ico-g')}<b>${s.nome}</b><span>Coopasol · ${site.cidade}</span></div>`}
      <nav class="serv-outros" aria-label="Outros serviços"><h3>Outros serviços</h3>${outros.map(x => `<a href="${L('servicos/' + x.slug)}">${ico(x.ico)}${x.nome}</a>`).join('')}</nav></aside>
  </div></section>
  ${s.slug === 'recebimento-e-armazenagem' ? `<section class="faixa caminho${A ? '' : ' caminho-b'}"><div class="in${A ? '' : ' caminho-grid'}"><div class="titulo-sec"><span class="eyebrow">Passo a passo</span><h2>Como a sua safra é recebida</h2></div>${caminho()}</div></section>` : ''}
  ${blocoCooperado()}`;
  }

  // ---------- Seja um cooperado ----------
  P['seja-cooperado'] = `${cab('Seja um cooperado', 'Faça parte da Coopasol', 'Preencha seus dados e a equipe da cooperativa entra em contato para explicar como se associar.', A ? '' : 'banco-milho-dourados', `<span>Seja um cooperado</span>`)}
  <section class="faixa cooperado"><div class="in coop-grid">
    <div class="coop-txt"><h2>Por que ser cooperado</h2>
      <div class="porque">${C.porque.map(([t, d, i]) => `<div>${ico(i)}<span><b>${t}</b>${d}</span></div>`).join('')}</div>
      <p class="nota">Prefere falar por telefone? Ligue <a href="tel:${site.foneHref}">${site.fone}</a>.</p></div>
    ${formCooperado()}
  </div></section>`;

  // ---------- Contato ----------
  P.contato = `${cab('Contato', 'Fale com a Coopasol', 'Atendimento por telefone e e-mail. A unidade fica na Rodovia MS-162, km 12, zona rural de Dourados.', '', `<span>Contato</span>`)}
  <section class="faixa"><div class="in contato-grid">${contatoCards()}
    <div class="mapa"><iframe title="Mapa da Coopasol" src="${site.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div></section>`;

  const out = {};
  for (const [slug, corpo] of Object.entries(P)) out[slug] = pagina(slug, corpo);
  return out;
}
