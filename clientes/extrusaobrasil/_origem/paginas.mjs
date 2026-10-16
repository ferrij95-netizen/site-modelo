// Páginas das duas versões do site da Extrusão Brasil.
// A = "Fiel": a mesma estrutura do site atual (faixa de contato, cabeçalho com logo e botão de peças, menu cinza,
//     carrossel com as três máquinas da capa, "Fale conosco" em faixa escura, equipamentos, vídeos, números,
//     feiras, financiamentos e rodapé em três colunas), com o verde e o amarelo do logo.
// B = "Linha em operação": capa escura com o vídeo das linhas funcionando, números, equipamentos em linhas
//     alternadas com a ficha de cada série, a linha de extrusão interativa, vídeos e linha do tempo das feiras.
import * as C from './conteudo.mjs';

const { site } = C;
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra ? ' ' + extra : ''}>`;

const I = {
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  whats: '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c.3 2 2.5 4.3 4.6 4.6l1.2-1.2 1.7.9c-.3 1-1.2 1.7-2.2 1.6-3.3-.4-6-3.1-6.4-6.4-.1-1 .6-1.9 1.6-2.2l.9 1.7z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  play: '<path d="M8 5v14l11-7z"/>',
  chave: '<path d="M14.5 6.5a4 4 0 1 0 3 6.7L21 16.7V20h-3v-2h-2v-2l-2.2-2.2"/><circle cx="10.5" cy="10.5" r="1"/>',
  engrenagem: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  ferramenta: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  alerta: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
  banco: '<path d="M3 10h18L12 4zM5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
};
const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

const EQ = Object.fromEntries(C.equipamentos.map(e => [e.slug, e]));
const PAG = {
  index: ['Extrusão Brasil · Extrusoras e linhas completas para extrusão de termoplásticos', 'Fabricante de extrusoras mono rosca, dupla roscas contra-rotantes e co-rotantes, linhas de frente, misturadores e conjuntos para telhas de PVC. Diadema (SP).'],
  empresa: ['Empresa · Extrusão Brasil', 'Desenvolvimento, fabricação e comercialização de extrusoras e linhas completas para extrusão, com instalação, assistência técnica e reposição de peças.'],
  equipamentos: ['Equipamentos · Extrusão Brasil', 'Extrusoras mono rosca, dupla roscas contra-rotantes e co-rotantes, misturadores / resfriadores, linhas de frente e conjunto completo para telhas de PVC.'],
  'pecas-de-reposicao': ['Peças de reposição · Extrusão Brasil', 'Peças originais Extrusão Brasil: cilindros e roscas, segmentos co-rotantes, cabeçotes, engrenagens, eixos, resistências e capas térmicas.'],
  videos: ['Vídeos · Extrusão Brasil', 'Assista às linhas da Extrusão Brasil em operação: tubos, forros e chapas de PVC, perfis e granulação.'],
  'feiras-e-eventos': ['Feiras e Eventos · Extrusão Brasil', 'A Extrusão Brasil é parceira das feiras Feiplastic e Interplast desde a primeira edição. Fotos dos estandes de 2010 a 2015.'],
  financiamentos: ['Financiamentos · Extrusão Brasil', 'Como adquirir equipamentos Extrusão Brasil: FINAME, FINAME Leasing, BNDES e Proger.'],
  contato: ['Contato · Extrusão Brasil', 'Telefone, WhatsApp, e-mail e endereço da Extrusão Brasil: R. Tupinambás, 407, Vila Conceição, Diadema (SP).'],
};
for (const e of C.equipamentos) PAG[e.slug] = [`${e.nome} · Extrusão Brasil`, e.resumo];

const MENU = [['index', 'Home'], ['empresa', 'Empresa'], ['equipamentos', 'Equipamentos'], ['videos', 'Vídeos'], ['feiras-e-eventos', 'Feiras e Eventos'], ['financiamentos', 'Financiamentos'], ['contato', 'Contato']];

export function gerarVersao(v) {
  const A = v === 'a';
  const L = s => `/${v}/${s === 'index' ? '' : s + '/'}`;
  const LE = s => L(`equipamentos/${s}`);
  const atual = slug => (EQ[slug] ? 'equipamentos' : slug);
  const nav = slug => MENU.map(([s, t]) => `<a href="${L(s)}"${atual(slug) === s ? ' aria-current="page"' : ''}>${t}</a>`).join('');
  const zap = (txt = 'WhatsApp', cls = 'btn btn-zap') => `<a class="${cls}" href="${site.whatsHref}" target="_blank" rel="noopener">${ico('whats')}${txt}</a>`;

  const head = slug => {
    const [titulo, desc] = PAG[slug];
    const url = site.dominio + (EQ[slug] ? LE(slug) : L(slug));
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
<meta property="og:site_name" content="Extrusão Brasil">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.dominio}/assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${site.dominio}/assets/og-${v}.jpg">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v} p-${EQ[slug] ? 'equipamento' : slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>`;
  };

  const logo = `<a class="logo" href="${L('index')}"><img src="/assets/img/logo.webp" alt="Extrusão Brasil" width="206" height="154"></a>`;
  const header = slug => A ? `
<div class="topo"><div class="in">
  <span>${ico('pin')}${site.endereco}</span>
  <span><a href="${site.foneHref}">${ico('fone')}${site.fone}</a><a href="${site.whatsHref}" target="_blank" rel="noopener">${ico('whats')}${site.whats} (WhatsApp)</a></span>
</div></div>
<header class="cab"><div class="in">
  ${logo}
  <div class="cab-ct">
    <a href="mailto:${site.email}">${ico('mail')}<span><small>E-mail</small>${site.email}</span></a>
    <a href="${site.foneHref}">${ico('fone')}<span><small>Vendas</small>${site.fone}</span></a>
  </div>
  <a class="btn btn-pecas" href="${L('pecas-de-reposicao')}">${ico('chave')}Possuímos peças de reposição. Clique aqui!</a>
  <button class="abre-menu" aria-label="Abrir menu" aria-expanded="false">${ico('menu')}</button>
</div></header>
<nav class="menu" aria-label="Principal"><div class="in">${nav(slug)}</div></nav>` : `
<header class="cab"><div class="in">
  ${logo}
  <nav class="menu" aria-label="Principal">${nav(slug)}<a class="m-pecas" href="${L('pecas-de-reposicao')}"${slug === 'pecas-de-reposicao' ? ' aria-current="page"' : ''}>Peças de reposição</a></nav>
  <a class="btn btn-zap cab-zap" href="${site.whatsHref}" target="_blank" rel="noopener">${ico('whats')}<span>Orçamento</span></a>
  <button class="abre-menu" aria-label="Abrir menu" aria-expanded="false">${ico('menu')}</button>
</div><i class="faixa-br" aria-hidden="true"></i></header>`;

  const footer = `
<footer class="rod">
  <div class="in rod-g">
    <div class="rod-marca">
      <img src="/assets/img/logo.webp" alt="Extrusão Brasil" width="140" height="105" loading="lazy">
      <p>${site.resumo}</p>
    </div>
    <div><h3>Equipamentos</h3><ul>${C.equipamentos.map(e => `<li><a href="${LE(e.slug)}">${e.nome}</a></li>`).join('')}<li><a href="${L('pecas-de-reposicao')}">Peças de reposição</a></li></ul></div>
    <div><h3>Vídeos</h3><ul>${C.videos.map(x => `<li><a href="${L('videos')}#${x[0]}">${x[1]}</a></li>`).join('')}</ul></div>
    <div class="rod-ct"><h3>Contato</h3>
      <p>${ico('pin')}<span>${site.endereco}</span></p>
      <p>${ico('fone')}<span><a href="${site.foneHref}">${site.fone}</a><br>${site.fonesExtra.join(' · ')}</span></p>
      <p>${ico('whats')}<a href="${site.whatsHref}" target="_blank" rel="noopener">${site.whats} (WhatsApp)</a></p>
      <p>${ico('mail')}<a href="mailto:${site.email}">${site.email}</a></p>
    </div>
  </div>
  <div class="rod-base"><div class="in"><span>© 2026 Extrusão Brasil · Todos os direitos reservados</span><span>Proposta de novo site · Overtus</span></div></div>
</footer>
<a class="zap-flut" href="${site.whatsHref}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ico('whats')}</a>
<script src="/assets/site.js" defer></script>
</body>
</html>
`;

  // Faixa de título das páginas internas.
  const titulo = (h1, migalhas, sub = '', foto = '') => A ? `
<section class="pg-tit"><div class="in">
  <div><h1>${h1}</h1>${sub ? `<p>${sub}</p>` : ''}
  <nav class="migalha" aria-label="Você está em"><a href="${L('index')}">Início</a>${migalhas.map(([t, h]) => h ? ` » <a href="${h}">${t}</a>` : ` » <span>${t}</span>`).join('')}</nav></div>
  ${foto ? `<div class="pg-tit-foto">${img(foto, h1, 'loading="eager"')}</div>` : ''}
</div></section>` : `
<section class="pg-tit"><div class="in">
  <div class="pg-tit-txt"><nav class="migalha" aria-label="Você está em"><a href="${L('index')}">Início</a>${migalhas.map(([t, h]) => h ? ` / <a href="${h}">${t}</a>` : ` / <span>${t}</span>`).join('')}</nav>
  <h1>${h1}</h1>${sub ? `<p>${sub}</p>` : ''}</div>
  ${foto ? `<div class="pg-tit-foto">${img(foto, h1, 'loading="eager"')}</div>` : ''}
</div></section>`;

  const h2 = (t, sub = '', cls = '') => `<header class="sec-tit ${cls}"><h2>${t}</h2>${sub ? `<p>${sub}</p>` : ''}</header>`;

  const form = (cls = '') => `
<form class="form-zap ${cls}" data-zap="${site.whatsHref.split('?')[0]}">
  <label><span>Nome</span><input name="nome" required autocomplete="name"></label>
  <label><span>E-mail</span><input name="email" type="email" autocomplete="email"></label>
  <label><span>DDD/Telefone</span><input name="fone" required autocomplete="tel"></label>
  <label class="f-cid"><span>Cidade/UF</span><input name="cidade"></label>
  <label class="f-msg"><span>Mensagem</span><textarea name="msg" rows="3" placeholder="Qual equipamento ou peça você procura?"></textarea></label>
  <button class="btn" type="submit">${ico('whats')}Enviar pelo WhatsApp</button>
</form>`;

  const faleConosco = () => `
<section class="sec fale"><div class="in fale-g">
  <div>${h2('Fale conosco', C.contato)}
    <ul class="fale-ct">
      <li>${ico('fone')}<a href="${site.foneHref}">${site.fone}</a></li>
      <li>${ico('whats')}<a href="${site.whatsHref}" target="_blank" rel="noopener">${site.whats}</a></li>
      <li>${ico('mail')}<a href="mailto:${site.email}">${site.email}</a></li>
    </ul></div>
  ${form()}
</div></section>`;

  // --- blocos reaproveitados ---
  const cardEq = (e, i) => `
<a class="eq-card" href="${LE(e.slug)}">
  <span class="eq-foto">${img(e.img, e.nome)}</span>
  <span class="eq-txt"><small>${e.serie}</small><b>${e.nome}</b><span>${e.resumo}</span><em>Saiba + ${ico('seta')}</em></span>
</a>`;

  const etapasLinha = () => A ? `
<section class="sec linha"><div class="in">
  ${h2('Como funciona uma linha de extrusão', 'Do composto à peça pronta: cada etapa com um equipamento fabricado pela Extrusão Brasil.')}
  <ol class="trilho">${C.etapas.map(([f, t, eq, d], i) => `
    <li><span class="tr-foto">${img(f, eq)}</span><span class="tr-n">${String(i + 1).padStart(2, '0')}</span><b>${t}</b><small>${eq}</small><p>${d}</p></li>`).join('')}
  </ol>
</div></section>` : `
<section class="sec linha" id="linha"><div class="in">
  ${h2('A linha de extrusão, etapa por etapa', 'Toque em cada estação para ver o equipamento.', 'claro')}
  <div class="ln" data-linha>
    <div class="ln-palco">${C.etapas.map(([f, t, eq, d], i) => `
      <figure class="ln-slide${i === 1 ? ' on' : ''}" data-i="${i}">${img(f, eq)}<figcaption><span>${String(i + 1).padStart(2, '0')} · ${t}</span><b>${eq}</b><p>${d}</p></figcaption></figure>`).join('')}
    </div>
    <ol class="ln-est" role="tablist">${C.etapas.map(([, t], i) => `
      <li><button role="tab" data-i="${i}" aria-selected="${i === 1}"><i></i><span>${String(i + 1).padStart(2, '0')}</span>${t}</button></li>`).join('')}
    </ol>
  </div>
</div></section>`;

  const videoCard = (x, grande = false) => `
<button class="vd" data-video="${x[2]}" data-titulo="${esc(x[1])}">
  <span class="vd-poster"><img src="/assets/video/${x[0]}.webp" alt="" loading="lazy" decoding="async"><i>${ico('play')}</i></span>
  <b>${x[1]}</b>${grande && x[3].length ? `<small>${x[3].join(' · ')}</small>` : ''}
</button>`;

  const feiraFoto = (f, n) => `/assets/img/feiras/${f[0]}-${f[1]}-${String(n).padStart(2, '0')}.webp`;
  const FCAPA = { 'feiplastic-2015': 3, 'interplast-2014': 7, 'feiplastic-2013': 18, 'interplast-2012': 25, 'brasilplast-2011': 13, 'interplast-2010': 4 };

  // --- páginas ---
  const P = {};

  P.index = () => A ? `
<main id="conteudo">
<section class="hero" data-carrossel>
  <div class="hero-slides">
    ${[['co-rotante-slide', 'Extrusoras Dupla Roscas Co-Rotantes', EQ['extrusoras-dupla-roscas-co-rotantes'].resumo, LE('extrusoras-dupla-roscas-co-rotantes'), 'h1'],
      ['contra-rotante-slide', 'Extrusoras Dupla Roscas Contra-Rotantes', 'As extrusoras dupla roscas contra-rotantes são equipamentos utilizados basicamente para trabalhar com PVC rígido ou flexível.', LE('extrusoras-dupla-roscas-contra-rotantes'), 'h2'],
      ['pecas-slide', 'Precisa de peças de reposição? Fique tranquilo!', 'A Extrusão Brasil possui peças de reposição para diversos equipamentos.', L('pecas-de-reposicao'), 'h2']]
      .map(([f, t, d, h, tag], i) => `
    <div class="hero-s${i === 0 ? ' on' : ''}">
      <div class="in">
        <div class="hero-foto">${img(f, t, i === 0 ? 'loading="eager" fetchpriority="high"' : '')}</div>
        <div class="hero-txt"><${tag}>${t}</${tag}><p>${d}</p><a class="btn" href="${h}">Saiba + ${ico('seta')}</a></div>
      </div>
    </div>`).join('')}
  </div>
  <div class="hero-pts" role="tablist" aria-label="Destaques"><button aria-label="Destaque 1" class="on"></button><button aria-label="Destaque 2"></button><button aria-label="Destaque 3"></button></div>
</section>

<section class="fale-faixa"><div class="in">
  <h2>Fale conosco</h2>
  <form class="form-zap form-linha" data-zap="${site.whatsHref.split('?')[0]}">
    <label><span class="sr">Nome</span><input name="nome" placeholder="Nome" required></label>
    <label><span class="sr">E-mail</span><input name="email" type="email" placeholder="E-mail"></label>
    <label><span class="sr">DDD/Telefone</span><input name="fone" placeholder="DDD/Telefone" required></label>
    <button class="btn" type="submit">Enviar</button>
  </form>
</div></section>

<section class="sec"><div class="in">
  ${h2('Nossos equipamentos', 'Extrusoras, linhas de frente e periféricos para extrusão de termoplásticos.')}
  <div class="eq-grade">${C.equipamentos.map(cardEq).join('')}</div>
</div></section>

${etapasLinha()}

<section class="sec videos-home"><div class="in vh-g">
  <div class="vh-maq">${img('contra-rotante-slide', 'Extrusora dupla roscas Extrusão Brasil')}</div>
  <div class="vh-txt">
    ${h2('Vídeos', 'Assista aos vídeos e veja como nossos equipamentos para extrusão oferecem alto desempenho, qualidade e inovação em cada processo.')}
    <div class="vh-lista">${C.videos.slice(1, 4).map(x => videoCard(x)).join('')}</div>
    <a class="btn btn-sec" href="${L('videos')}">Ver todos os vídeos ${ico('seta')}</a>
  </div>
</div></section>

<section class="numeros"><div class="in">${C.numeros.map(([n, t, d]) => `<div><b>${n}</b><span>${t}</span><small>${d}</small></div>`).join('')}</div></section>

<section class="sec"><div class="in">
  ${h2('Feiras e eventos', C.feiras.texto)}
  <div class="fe-g">
    ${C.feiras.lista.slice(0, 5).map((f, i) => `
    <a class="fe-card${i === 0 ? ' fe-dest' : ''}" href="${L('feiras-e-eventos')}#${f[0]}-${f[1]}">
      <img src="${feiraFoto(f, FCAPA[f[0] + '-' + f[1]])}" alt="Estande da Extrusão Brasil na ${f[2]}" loading="lazy">
      <span><b>${f[2]}</b><small>${f[3]}</small></span>
    </a>`).join('')}
  </div>
</div></section>

<section class="fin-faixa"><div class="in">
  <div>${h2('Financiamentos', 'Veja como adquirir os nossos produtos.')}<a class="btn btn-am" href="${L('financiamentos')}">Saiba mais ${ico('seta')}</a></div>
  <ul>${C.financiamentos.itens.map(([f, t]) => `<li>${img(f, t)}</li>`).join('')}</ul>
</div></section>
</main>` : `
<main id="conteudo">
<section class="hero">
  <video class="hero-vd" autoplay muted loop playsinline preload="metadata" poster="/assets/video/linha-em-operacao.webp"><source src="/assets/video/linha-em-operacao.mp4" type="video/mp4"></video>
  <div class="in hero-g">
    <div class="hero-txt">
      <span class="sobre">Fabricante nacional · Diadema (SP)</span>
      <h1>Extrusoras e linhas completas para extrusão de termoplásticos</h1>
      <p>Mono rosca, dupla roscas contra-rotantes e co-rotantes, linhas de frente e misturadores, com instalação, assistência técnica e reposição de peças.</p>
      <div class="hero-bt"><a class="btn btn-am" href="${L('equipamentos')}">Conheça os equipamentos ${ico('seta')}</a>${zap('Pedir orçamento', 'btn btn-vazado')}</div>
    </div>
    <a class="hero-pecas" href="${L('pecas-de-reposicao')}">
      ${img('pecas-slide', 'Roscas e canhões de reposição', 'loading="eager"')}
      <span><small>Peças de reposição</small><b>Precisa de peças? Fique tranquilo!</b><em>Ver peças ${ico('seta')}</em></span>
    </a>
  </div>
</section>

<section class="numeros"><div class="in">${C.numeros.map(([n, t, d]) => `<div><b>${n}</b><span>${t}</span><small>${d}</small></div>`).join('')}</div></section>

<section class="sec eq-sec"><div class="in">
  ${h2('Nossos equipamentos', 'Da extrusora ao corte: a Extrusão Brasil projeta e fabrica a linha inteira.')}
  <div class="eq-mosaico">
    ${C.equipamentos.map((e, i) => `
    <a class="eqm eqm-${i}" href="${LE(e.slug)}">
      <span class="eqm-foto">${img(e.img, e.nome)}</span>
      <span class="eqm-txt"><small>${e.serie}</small><b>${e.nome}</b>${i < 2 ? `<span>${e.resumo}</span>` : ''}<span class="fichas">${e.fichas.map(([k, v]) => `<i><em>${k}</em>${v}</i>`).join('')}</span></span>
    </a>`).join('')}
  </div>
</div></section>

${etapasLinha()}

<section class="sec emp-home"><div class="in eh-g">
  <div class="eh-txt">
    <span class="sobre">A empresa</span>
    <h2>Entre os principais fabricantes de equipamentos para extrusão do Brasil</h2>
    <p>${C.empresa.quemSomos[1]}</p>
    <ul class="pv">${C.empresa.posVenda.map(([t, d], i) => `<li>${ico(['engrenagem', 'ferramenta', 'chave'][i])}<b>${t}</b><span>${d}</span></li>`).join('')}</ul>
    <a class="btn" href="${L('empresa')}">Conheça a empresa ${ico('seta')}</a>
  </div>
  <div class="eh-foto">${img('telhas-1', 'Linha de telhas de PVC Extrusão Brasil em operação')}</div>
</div></section>

<section class="sec videos-home"><div class="in">
  ${h2('Linhas em operação', 'Assista aos conjuntos da Extrusão Brasil funcionando.', 'claro')}
  <div class="vd-trilho">${C.videos.map(x => videoCard(x, true)).join('')}</div>
</div></section>

<section class="sec"><div class="in">
  ${h2('Feiras e eventos', C.feiras.texto)}
  <ol class="tempo">${C.feiras.lista.slice().reverse().map(f => `
    <li><a href="${L('feiras-e-eventos')}#${f[0]}-${f[1]}"><img src="${feiraFoto(f, FCAPA[f[0] + '-' + f[1]])}" alt="Estande da Extrusão Brasil na ${f[2]}" loading="lazy"><b>${f[1]}</b><span>${f[2].replace(/ \d+$/, '')}</span></a></li>`).join('')}
  </ol>
</div></section>

<section class="sec fin-home"><div class="in fh-g">
  <div><span class="sobre">Financiamentos</span><h2>Compre sua linha com FINAME, Leasing, BNDES ou Proger</h2><p>${C.financiamentos.intro}</p><a class="btn btn-am" href="${L('financiamentos')}">Ver as modalidades ${ico('seta')}</a></div>
  <ul>${C.financiamentos.itens.map(([f, t]) => `<li>${img(f, t)}</li>`).join('')}</ul>
</div></section>

${faleConosco()}
</main>`;

  P.empresa = () => `
<main id="conteudo">
${titulo('Empresa', [['Empresa']], A ? '' : 'Desenvolvimento, fabricação e comercialização de extrusoras e linhas completas para extrusão.', A ? '' : 'contra-rotante-slide')}
<section class="sec"><div class="in emp-g">
  <div class="emp-txt">
    ${h2('Quem somos')}
    ${C.empresa.quemSomos.map(p => `<p>${p}</p>`).join('')}
  </div>
  <aside class="emp-fab">
    <h3>O que fabricamos</h3>
    <p>${C.empresa.fabricamos}</p>
    <ul>${C.equipamentos.map(e => `<li><a href="${LE(e.slug)}">${ico('check')}${e.nome}</a></li>`).join('')}</ul>
  </aside>
</div></section>
<section class="sec emp-lf"><div class="in emp-lf-g">
  <div class="emp-lf-foto">${img('mr-90', 'Extrusora mono rosca Extrusão Brasil')}</div>
  <div>
    ${h2('Linhas completas')}
    <p>${C.empresa.linhaFrente}</p>
    <p>${C.empresa.perifericos}</p>
    <ul class="chips">${C.empresa.aplicacoes.map(a => `<li>${a}</li>`).join('')}</ul>
  </div>
</div></section>
<section class="sec queremos"><div class="in">
  ${h2('O que queremos', C.empresa.queremos)}
  <p class="q-sub">${C.empresa.queremos2}</p>
  <div class="mvv">${C.empresa.mvv.map(([t, d], i) => `<article class="mvv-${i}"><span>${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div>
</div></section>
<section class="sec pv-sec"><div class="in">
  ${h2('Pós-venda', 'Agilidade no atendimento depois da entrega da linha.')}
  <ul class="pv">${C.empresa.posVenda.map(([t, d], i) => `<li>${ico(['engrenagem', 'ferramenta', 'chave'][i])}<b>${t}</b><span>${d}</span></li>`).join('')}</ul>
</div></section>
${faleConosco()}
</main>`;

  P.equipamentos = () => `
<main id="conteudo">
${titulo('Equipamentos', [['Equipamentos']], 'Extrusoras, linhas de frente e periféricos para extrusão de termoplásticos.', A ? '' : 'drc-30')}
<section class="sec"><div class="in">
  ${A ? `${h2('Nossos equipamentos')}<div class="eq-grade">${C.equipamentos.map(cardEq).join('')}</div>` : `
  <div class="eq-linhas">${C.equipamentos.map((e, i) => `
    <article class="eql">
      <a class="eql-foto" href="${LE(e.slug)}">${img(e.img, e.nome)}</a>
      <div class="eql-txt"><small>${String(i + 1).padStart(2, '0')} · ${e.serie}</small><h2><a href="${LE(e.slug)}">${e.nome}</a></h2><p>${e.resumo}</p>
        <span class="fichas">${e.fichas.map(([k, v]) => `<i><em>${k}</em>${v}</i>`).join('')}</span>
        <a class="btn btn-sec" href="${LE(e.slug)}">Ver modelos e detalhes ${ico('seta')}</a></div>
    </article>`).join('')}
  </div>`}
</div></section>
${etapasLinha()}
${faleConosco()}
</main>`;

  const pagEq = e => () => {
    const lf = e.slug === 'equipamentos-para-linhas-de-frente';
    const outros = C.equipamentos.filter(x => x.slug !== e.slug);
    return `
<main id="conteudo">
${titulo(e.nome, [['Equipamentos', L('equipamentos')], [e.curto]], e.serie, A ? '' : e.img)}
<section class="sec"><div class="in det-g${lf ? ' det-lf' : ''}">
  <div class="det-txt">
    <span class="fichas fichas-g">${e.fichas.map(([k, v]) => `<i><em>${k}</em>${v}</i>`).join('')}</span>
    ${e.grupos.map(([t, l]) => `<div class="modelos"><h2>${t}</h2><ul>${l.map(m => `<li>${m}</li>`).join('')}</ul></div>`).join('')}
    <h2>${e.textoTitulo}</h2>
    ${e.texto.map(p => `<p>${p}</p>`).join('')}
    ${e.lista.length ? `<h3>${e.listaTitulo}</h3><ul class="${e.chips ? 'chips' : 'checks'}">${e.lista.map(x => `<li>${e.chips ? '' : ico('check')}${x}</li>`).join('')}</ul>` : ''}
    <div class="det-bt"><a class="btn" href="${L('contato')}">Solicitar orçamento ${ico('seta')}</a>${zap('Falar no WhatsApp', 'btn btn-vazado')}</div>
  </div>
  ${lf ? '' : `<div class="det-gal">${(e.galeria.length ? e.galeria : [[e.img, e.nome]]).map(([f, t], i) => `<button class="gal-it${i === 0 ? ' gal-1' : ''}" data-zoom="/assets/img/${f}.webp" data-legenda="${esc(t)}">${img(f, t)}<span>${t}</span></button>`).join('')}</div>`}
</div></section>
${lf ? `<section class="sec lf-sec"><div class="in">
  ${h2('Equipamentos da linha de frente', 'Cada linha é montada conforme o produto a ser extrudado.')}
  <div class="lf-g">${C.linhaFrente.map(([f, t, d]) => `<button class="lf-it" data-zoom="/assets/img/${f}.webp" data-legenda="${esc(t)}"><span>${img(f, t)}</span><b>${t}</b><small>${d}</small></button>`).join('')}
    <a class="lf-cta" href="${site.whatsHref}" target="_blank" rel="noopener"><b>Monte a sua linha</b><small>Diga o produto que você quer extrudar e indicamos a extrusora e a linha de frente.</small><em>${ico('whats')}Falar com vendas</em></a></div>
</div></section>` : ''}
${e.anuncios ? `<section class="sec anuncios"><div class="in an-g">${e.anuncios.map(([f, t]) => `<button class="gal-it" data-zoom="/assets/img/${f}.webp" data-legenda="${esc(t)}">${img(f, t)}</button>`).join('')}</div></section>` : ''}
<section class="sec outros"><div class="in">
  ${h2('Outros equipamentos')}
  <div class="outros-g">${outros.map(x => `<a href="${LE(x.slug)}">${img(x.img, x.nome)}<b>${x.nome}</b></a>`).join('')}</div>
</div></section>
${faleConosco()}
</main>`;
  };
  for (const e of C.equipamentos) P[e.slug] = pagEq(e);

  P['pecas-de-reposicao'] = () => `
<main id="conteudo">
${titulo('Peças de reposição', [['Peças de reposição']], 'Peças originais com as especificações do projeto, que só o fabricante pode oferecer.', A ? '' : 'pecas-slide')}
<section class="sec"><div class="in pc-g">
  <div class="pc-txt">
    ${h2('Comunicado', 'Prezados clientes,')}
    ${C.pecas.intro.map(p => `<p>${p}</p>`).join('')}
    <div class="det-bt">${zap('Consultar peça no WhatsApp', 'btn btn-zap')}<a class="btn btn-vazado" href="mailto:${site.email}?subject=Pe%C3%A7as%20de%20reposi%C3%A7%C3%A3o">${ico('mail')}${site.email}</a></div>
  </div>
  <aside class="pc-consulte">
    <h3>Consulte-nos para o fornecimento de</h3>
    <ul class="checks">${C.pecas.consulte.map(x => `<li>${ico('check')}${x}</li>`).join('')}</ul>
    <p>${C.pecas.outros}</p>
  </aside>
</div></section>
<section class="sec pc-fotos"><div class="in">
  ${h2('Confira algumas peças de reposição')}
  <div class="pc-gal">${C.pecas.fotos.map(([f, t]) => `<button class="gal-it" data-zoom="/assets/img/${f}.webp" data-legenda="${esc(t)}">${img(f, t)}<span>${t}</span></button>`).join('')}</div>
</div></section>
<section class="sec aviso"><div class="in"><div class="aviso-box">${ico('alerta')}<div><h2>Aviso importante</h2><p>${C.pecas.aviso}</p></div></div></div></section>
${faleConosco()}
</main>`;

  P.videos = () => `
<main id="conteudo">
${titulo('Vídeos', [['Vídeos']], 'Navegue em nossos vídeos.', A ? '' : '')}
<section class="sec"><div class="in">
  <p class="intro">Assista aos nossos vídeos e descubra como nossas extrusoras e linhas completas para extrusão de termoplásticos operam com alta performance. Mostramos cada etapa do processo, desde a fabricação até a instalação e manutenção, além de apresentar os benefícios e resultados de nossos equipamentos para diversas aplicações industriais.</p>
  <div class="vd-lista">${C.videos.map(x => `
    <article class="vd-item" id="${x[0]}">
      ${videoCard(x)}
      <div><h2>${x[1]}</h2>${x[3].length ? `<h3>Conjunto composto de:</h3><ol>${x[3].map(i => `<li>${i}</li>`).join('')}</ol>` : '<p>Conjunto de extrusão para perfis de coletor solar em operação.</p>'}</div>
    </article>`).join('')}
  </div>
</div></section>
${faleConosco()}
</main>`;

  P['feiras-e-eventos'] = () => `
<main id="conteudo">
${titulo('Feiras e Eventos', [['Feiras e Eventos']], 'Acompanhe a Extrusão Brasil nas principais feiras do setor plástico.', A ? '' : '')}
<section class="sec"><div class="in">
  <p class="intro">${C.feiras.texto}</p>
  <nav class="fe-anos">${C.feiras.lista.map(f => `<a href="#${f[0]}-${f[1]}">${f[2]}</a>`).join('')}</nav>
  ${C.feiras.lista.map(f => `
  <section class="feira" id="${f[0]}-${f[1]}">
    <header><h2>${f[2]}</h2><span>${f[3]}</span></header>
    <div class="fe-gal">${Array.from({ length: 26 }, (_, n) => n + 1).filter(n => FEIRAS.has(`${f[0]}-${f[1]}-${String(n).padStart(2, '0')}`)).map(n => `<button class="gal-it" data-zoom="${feiraFoto(f, n)}" data-legenda="${esc(f[2])}"><img src="${feiraFoto(f, n)}" alt="Extrusão Brasil na ${f[2]}" loading="lazy" decoding="async"></button>`).join('')}</div>
  </section>`).join('')}
</div></section>
${faleConosco()}
</main>`;

  P.financiamentos = () => `
<main id="conteudo">
${titulo('Financiamentos', [['Financiamentos']], 'Veja como adquirir os nossos produtos.', A ? '' : '')}
<section class="sec"><div class="in">
  <p class="intro">${C.financiamentos.intro}</p>
  <div class="fin-g">${C.financiamentos.itens.map(([f, t, d], i) => `
    <article class="fin-it fin-${i}"><span class="fin-logo">${img(f, t)}</span><h2>${t}</h2><p>${d}</p>${i === 3 ? `<h3>O Proger pode ser solicitado nos agentes financeiros:</h3><ul class="checks">${C.financiamentos.proger.map(b => `<li>${ico('banco')}${b}</li>`).join('')}</ul>` : ''}</article>`).join('')}
  </div>
</div></section>
${faleConosco()}
</main>`;

  P.contato = () => `
<main id="conteudo">
${titulo('Contato', [['Contato']], 'Solicite um orçamento ou fale com o nosso time de vendas.', A ? '' : '')}
<section class="sec"><div class="in ct-g">
  <div class="ct-info">
    ${h2('Encontre-nos')}
    <ul class="ct-lista">
      <li>${ico('pin')}<span><b>Endereço</b>${site.endereco}<a href="${site.mapaLink}" target="_blank" rel="noopener">Abrir no mapa ${ico('externo')}</a></span></li>
      <li>${ico('fone')}<span><b>Telefones</b><a href="${site.foneHref}">${site.fone}</a> · ${site.fonesExtra.join(' · ')}</span></li>
      <li>${ico('whats')}<span><b>WhatsApp</b><a href="${site.whatsHref}" target="_blank" rel="noopener">${site.whats}</a></span></li>
      <li>${ico('mail')}<span><b>E-mail</b><a href="mailto:${site.email}">${site.email}</a></span></li>
    </ul>
  </div>
  <div class="ct-form">${h2('Fale conosco', C.contato)}${form()}</div>
</div></section>
<section class="mapa"><iframe title="Mapa: ${esc(site.endereco)}" src="${site.mapa}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>
</main>`;

  const paginas = {};
  for (const slug of Object.keys(P)) {
    const corpo = P[slug]();
    const chave = EQ[slug] ? `equipamentos/${slug}` : slug;
    paginas[chave] = head(slug) + header(slug) + corpo + footer;
  }
  return paginas;
}

// Fotos de feira que existem (algumas edições têm buracos na numeração).
import fs from 'node:fs';
import path from 'node:path';
const dirFeiras = path.join(path.dirname(new URL(import.meta.url).pathname), '../public/assets/img/feiras');
const FEIRAS = new Set(fs.existsSync(dirFeiras) ? fs.readdirSync(dirFeiras).map(f => f.replace(/\.webp$/, '')) : []);
