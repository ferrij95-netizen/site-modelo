// Corpo de cada página. As duas versões usam os mesmos textos; a home e algumas seções mudam de formato por versão.
import * as C from './conteudo.mjs';
import { catalogo, cons, validade } from './produtos.mjs';
import { esc, tr, img, num, href, ico, doc } from './comum.mjs';

const { T, site, ui } = C;

// Topo das páginas internas: foto real do site atual, título e trilha.
function capa({ v, lang, titulo, sub, foto, trilha = [], kicker }) {
  const L = s => href(v, lang, s);
  const migalhas = [[ 'index', tr(ui.inicio, lang) ], ...trilha].map(([s, t], i, a) =>
    i === a.length - 1 && a.length > 1 ? `<span aria-current="page">${t}</span>` : `<a href="${L(s)}">${t}</a>`).join('<i>/</i>');
  return `<section class="capa">
  <div class="capa-foto">${img(foto, '', 'fetchpriority="high" loading="eager"')}</div>
  <div class="in capa-txt">
    <nav class="trilha" aria-label="${lang === 'en' ? 'Breadcrumb' : 'Trilha'}">${migalhas}</nav>
    ${kicker ? `<span class="kicker">${kicker}</span>` : ''}
    <h1>${titulo}</h1>
    ${sub ? `<p class="capa-sub">${sub}</p>` : ''}
  </div>
</section>`;
}

const botao = (url, txt, cls = 'bt') => `<a class="${cls}" href="${url}">${txt}${ico('seta')}</a>`;
const p = (arr, lang) => arr.map(x => `<p>${tr(x, lang)}</p>`).join('');
const dataFmt = (d, lang) => new Date(d + 'T12:00:00Z').toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

function video(lang, poster = 'quem-somos') {
  return `<div class="video" data-video="${site.video}">
  ${img(poster, lang === 'en' ? 'Frigoestrela institutional video' : 'Vídeo institucional do Frigoestrela')}
  <button class="play" aria-label="${tr(ui.verVideo, lang)}">${ico('play')}<span>${tr(ui.verVideo, lang)}</span></button>
</div>`;
}

// ---------- Home ----------
function homeA(v, lang) {
  const L = s => href(v, lang, s);
  const H = C.home;
  return `<section class="slider" data-slider aria-roledescription="carrossel" aria-label="${lang === 'en' ? 'Highlights' : 'Destaques'}">
  <div class="slides">${H.slides.map((s, i) => `<a class="slide${i ? '' : ' ativo'}" href="${L(s.s)}" aria-label="${esc(tr(s.k, lang) + ' ' + tr(s.t, lang))}">
    <img src="/assets/img/${s.img}.webp" alt="${esc(tr(s.t, lang) + ', ' + tr(s.k, lang))}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async"></a>`).join('')}</div>
  <div class="slider-ctl in">
    <button class="sl-ant" aria-label="${lang === 'en' ? 'Previous' : 'Anterior'}">${ico('esq')}</button>
    <ol class="sl-pontos">${H.slides.map((s, i) => `<li><button aria-label="${esc(tr(s.t, lang))}"${i ? '' : ' aria-current="true"'}><span>${tr(s.k, lang)}</span><b>${tr(s.t, lang)}</b></button></li>`).join('')}</ol>
    <button class="sl-prox" aria-label="${lang === 'en' ? 'Next' : 'Próximo'}">${ico('dir')}</button>
  </div>
</section>

<section class="bloco qualidade-home">
  <div class="in duas">
    <div class="txt">
      <span class="kicker">${lang === 'en' ? 'Since 1979' : 'Desde 1979'}</span>
      <h1>${tr(H.titulo, lang)}</h1>
      ${p(H.intro, lang)}
      ${botao(L('sobre-nos'), tr(ui.conheca, lang))}
    </div>
    ${video(lang)}
  </div>
</section>

<section class="numeros"><div class="in">${H.numeros.map(([n, t]) => `<div><b>${n}</b><span>${tr(t, lang)}</span></div>`).join('')}</div></section>

<section class="bloco marcas-home">
  <div class="in">
    <div class="cab"><span class="kicker">Grupo Estrela</span><h2>${tr(H.marcasTitulo, lang)}</h2></div>
    <div class="painel-marcas">${C.marcas.map(m => `<a class="pm" href="${L(m.s)}">
      ${img(m.foto, '')}
      <span class="pm-logo"><img src="/assets/img/${m.logo}.webp" alt="${m.nome}" loading="lazy"></span>
      <span class="pm-txt"><em>${tr(m.lema, lang)}</em><b>${tr(ui.saibaMais, lang)} ${ico('seta')}</b></span></a>`).join('')}</div>
  </div>
</section>

<section class="boutique-home">
  ${img('boutique', lang === 'en' ? 'Estrela Meat Boutique store' : 'Loja da Boutique de Carne Estrela')}
  <div class="in"><div class="cartao">
    <span class="kicker">${tr(H.boutiqueSub, lang)}</span>
    <h2>${tr(H.boutiqueTitulo, lang)}</h2>
    <p>${tr(H.boutiqueTxt, lang)}</p>
    ${botao(L('boutique-de-carne'), tr(ui.saibaMais, lang))}
  </div></div>
</section>

${noticiasHome(v, lang)}`;
}

function homeB(v, lang) {
  const L = s => href(v, lang, s);
  const H = C.home;
  return `<section class="heroi" data-slider aria-roledescription="carrossel" aria-label="${lang === 'en' ? 'Highlights' : 'Destaques'}">
  <div class="slides">${H.slides.map((s, i) => `<div class="slide${i ? '' : ' ativo'}">
    ${img(s.foto, '', i ? '' : 'fetchpriority="high" loading="eager"')}
    <div class="in"><div class="h-txt">
      <span class="kicker">${tr(s.k, lang)}</span>
      <${i ? 'h2' : 'h1'} class="h-tit">${tr(s.t, lang)}</${i ? 'h2' : 'h1'}>
      <p>${tr(s.d, lang)}</p>
      ${botao(L(s.s), tr(ui.saibaMais, lang), 'bt bt-luz')}
    </div></div></div>`).join('')}</div>
  <div class="in heroi-ctl"><ol class="sl-pontos">${H.slides.map((s, i) => `<li><button${i ? '' : ' aria-current="true"'}><i>${num(i)}</i><span>${tr(s.k, lang)}</span><b>${tr(s.t, lang)}</b></button></li>`).join('')}</ol></div>
</section>

<section class="bloco intro-b">
  <div class="in duas">
    <div class="txt">
      <span class="kicker">${lang === 'en' ? 'Since 1979' : 'Desde 1979'}</span>
      <h2>${tr(H.titulo, lang)}</h2>
      ${p(H.intro, lang)}
      ${botao(L('sobre-nos'), tr(ui.conheca, lang))}
    </div>
    <ul class="estrelas-num">${H.numeros.map(([n, t]) => `<li>${ico('estrela', 'ico est')}<b>${n}</b><span>${tr(t, lang)}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="bloco prateleira">
  <div class="in">
    <div class="cab"><span class="kicker">Grupo Estrela</span><h2>${tr(H.marcasTitulo, lang)}</h2></div>
    <div class="abas-marcas" data-abas>
      <div class="am-lista" role="tablist">${C.marcas.map((m, i) => `<button role="tab" id="am-${i}" aria-controls="amp-${i}" aria-selected="${i ? 'false' : 'true'}"><img src="/assets/img/${m.logo}.webp" alt="" loading="lazy"><span>${m.nome}</span></button>`).join('')}</div>
      ${C.marcas.map((m, i) => `<div class="am-painel" role="tabpanel" id="amp-${i}" aria-labelledby="am-${i}"${i ? ' hidden' : ''}>
        ${img(m.foto, m.nome)}
        <div class="am-txt"><img class="am-logo" src="/assets/img/${m.logo}.webp" alt="${m.nome}" loading="lazy"><h3>${tr(m.lema, lang)}</h3><p>${tr(m.resumo, lang)}</p>${botao(L(m.s), tr(ui.saibaMais, lang))}</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="video-b">
  <div class="in duas">
    ${video(lang, 'linha-producao')}
    <div class="txt"><span class="kicker">${lang === 'en' ? 'Our commitment' : 'Nosso compromisso'}</span><h2>${tr(C.sobre.lema, lang)}</h2><p>${tr(C.sobre.txt[1], lang)}</p>${botao(L('controle-de-qualidade'), tr(C.qualidade.titulo, lang), 'bt bt-luz')}</div>
  </div>
</section>

<section class="boutique-b">
  <div class="in">
    <div class="bb-foto">${img('boutique', lang === 'en' ? 'Estrela Meat Boutique store' : 'Loja da Boutique de Carne Estrela')}</div>
    <div class="bb-txt">
      <span class="kicker">${tr(H.boutiqueSub, lang)}</span>
      <h2>${tr(H.boutiqueTitulo, lang)}</h2>
      <p>${tr(H.boutiqueTxt, lang)}</p>
      <ul class="lojas-mini">${C.boutique.lojas.map(l => `<li>${ico('pin')}<span><b>${l.n}</b>${l.end}</span></li>`).join('')}</ul>
      ${botao(L('boutique-de-carne'), tr(ui.saibaMais, lang), 'bt bt-luz')}
    </div>
  </div>
</section>

${noticiasHome(v, lang)}`;
}

function noticiasHome(v, lang) {
  const L = s => href(v, lang, s);
  return `<section class="bloco noticias-home">
  <div class="in">
    <div class="cab cab-linha"><div><span class="kicker">${tr(ui.noticias, lang)}</span><h2>${tr(C.home.noticiasTitulo, lang)}</h2></div>${botao(L('noticias'), lang === 'en' ? 'All news' : 'Todas as notícias', 'bt bt-linha')}</div>
    <div class="nh-grade">
      ${C.noticias.map(n => `<a class="nh" href="${L('noticias/' + n.s)}">${img(n.img, '')}<span class="nh-txt"><time datetime="${n.data}">${dataFmt(n.data, lang)}</time><b>${tr(n.t, lang)}</b><em>${tr(ui.lerMais, lang)} ${ico('seta')}</em></span></a>`).join('')}
      ${C.destaques.map(d => `<div class="nh nh-destaque">${img(d.img, tr(d.t, lang))}<span class="nh-txt"><b>${tr(d.t, lang)}</b></span></div>`).join('')}
    </div>
  </div>
</section>`;
}

// ---------- Sobre ----------
function sobre(v, lang) {
  const L = s => href(v, lang, s);
  const S = C.sobre;
  return `${capa({ v, lang, titulo: tr(S.titulo, lang), sub: tr(S.lema, lang), foto: 'quem-somos', trilha: [['sobre-nos', tr(S.titulo, lang)]] })}
<section class="bloco">
  <div class="in duas sobre-intro">
    <div class="txt"><span class="kicker">${lang === 'en' ? 'Since 1979' : 'Desde 1979'}</span><h2>${tr(S.lema, lang)}</h2>${p(S.txt.slice(0, 3), lang)}</div>
    <div class="mosaico">${img('sobre-caixa', lang === 'en' ? 'Estrela box on the production line' : 'Caixa Estrela na linha de produção')}${img('picanha-angus', lang === 'en' ? 'Angus Series picanha' : 'Picanha Angus Series')}${img('sala-controle', lang === 'en' ? 'Plant control room' : 'Sala de controle da fábrica')}</div>
  </div>
</section>
<section class="mvv"><div class="in">${S.mvv.map((m, i) => `<div class="mvv-i">
  <span class="mvv-n">${num(i)}</span><h3>${tr(m.k, lang)}</h3>
  ${m.t ? `<p>${tr(m.t, lang)}</p>` : `<ul>${m.lista.map(x => `<li>${tr(x, lang)}</li>`).join('')}</ul>`}
</div>`).join('')}</div></section>
<section class="bloco">
  <div class="in duas marcas-txt">
    <div class="txt">${p(S.txt.slice(3), lang)}${botao(L('unidades'), lang === 'en' ? 'See our units' : 'Ver as unidades')}</div>
    <div class="logos-marcas">${C.marcas.map(m => `<a href="${L(m.s)}"><img src="/assets/img/${m.logo}.webp" alt="${m.nome}" loading="lazy"></a>`).join('')}</div>
  </div>
</section>
<section class="gestor">
  <div class="in">
    <div class="g-foto">${img('linha-producao', lang === 'en' ? 'Frigoestrela team on the production line' : 'Equipe Frigoestrela na linha de produção')}</div>
    <blockquote>
      <span class="kicker">${tr(S.gestorTitulo, lang)}</span>
      <p class="g-abre">${tr(S.gestorAbre, lang)}</p>
      ${p(S.gestor, lang)}
      <footer><img src="/assets/img/assinatura.webp" alt="" width="134" height="71" loading="lazy"><b>${S.gestorNome}</b><span>${tr(S.gestorCargo, lang)}</span></footer>
    </blockquote>
  </div>
</section>
${atalhos(v, lang, ['unidades', 'controle-de-qualidade', 'areas-de-atuacao'])}`;
}

function atalhos(v, lang, slugs) {
  const L = s => href(v, lang, s);
  const info = {
    unidades: ['aerea', T('Unidades', 'Units'), C.unidadesTxt],
    'controle-de-qualidade': ['qualidade-topo', C.qualidade.titulo, C.qualidade.txt[0]],
    'areas-de-atuacao': ['graxaria', C.atuacao.titulo, C.atuacao.txt[1]],
    exportacao: ['exporta-alcatra', C.exportacao.titulo, C.exportacao.txt[0]],
    esg: ['pasto', C.esg.titulo, C.esg.sub],
    'boutique-de-carne': ['boutique', C.boutique.titulo, C.boutique.txt],
  };
  return `<section class="bloco atalhos"><div class="in"><div class="at-grade">${slugs.map(s => {
    const [f, t, d] = info[s];
    return `<a class="at" href="${L(s)}">${img(f, '')}<span><b>${tr(t, lang)}</b><em>${tr(d, lang)}</em>${ico('seta')}</span></a>`;
  }).join('')}</div></div></section>`;
}

// ---------- Unidades ----------
function unidades(v, lang) {
  const tipos = C.tiposUnidade;
  const mapa = `https://www.google.com/maps/search/?api=1&query=`;
  return `${capa({ v, lang, titulo: lang === 'en' ? 'Our units' : 'Nossas unidades', sub: tr(C.unidadesTxt, lang), foto: 'aerea', trilha: [['sobre-nos', tr(C.sobre.titulo, lang)], ['unidades', lang === 'en' ? 'Units' : 'Unidades']] })}
<section class="bloco">
  <div class="in un-wrap" data-filtro-unidades>
    <div class="un-mapa">
      <div class="mapa-br">${img('mapa', lang === 'en' ? 'Map of Brazil with Frigoestrela units' : 'Mapa do Brasil com as unidades Frigoestrela')}</div>
      <ul class="un-leg">${Object.entries(tipos).map(([k, t]) => `<li><button data-tipo="${k}" aria-pressed="false"><i style="--c:${t.cor}"></i>${tr(t.t, lang)}</button></li>`).join('')}</ul>
    </div>
    <ol class="un-lista">${C.unidades.map((u, i) => `<li class="un" data-tipos="${u.tipos.join(' ')}">
      <span class="un-n">${num(i)}</span>
      <div><h3>${u.n} <small>${u.uf}</small></h3>
      <p class="un-tags">${u.tipos.map(t => `<span style="--c:${tipos[t].cor}">${tr(tipos[t].t, lang)}</span>`).join('')}</p>
      <p>${u.end}</p>
      <p class="un-acoes"><a href="tel:+55${u.fone.replace(/\D/g, '')}">${ico('fone')}${u.fone}</a><a href="${mapa + encodeURIComponent(u.end)}" target="_blank" rel="noopener">${ico('pin')}${tr(ui.comoChegar, lang)}</a></p></div>
    </li>`).join('')}</ol>
  </div>
  <p class="in nota">${lang === 'en' ? 'Distribution Centers also operate in Bauru, Brasília and Campo Grande.' : 'Também há Centros de Distribuição em Bauru, Brasília e Campo Grande.'}</p>
</section>`;
}

// ---------- Qualidade ----------
function qualidade(v, lang) {
  const Q = C.qualidade;
  return `${capa({ v, lang, titulo: tr(Q.titulo, lang), sub: tr(Q.txt[0], lang), foto: 'qualidade-topo', trilha: [['sobre-nos', tr(C.sobre.titulo, lang)], ['controle-de-qualidade', tr(Q.titulo, lang)]] })}
<section class="bloco">
  <div class="in duas">
    <div class="txt"><span class="kicker">${tr(Q.sub, lang)}</span><h2>${lang === 'en' ? 'Every department, from farm to consumer' : 'Todos os setores, da fazenda ao consumidor'}</h2>${p(Q.txt, lang)}</div>
    <ul class="selos-q">
      <li>${ico('escudo')}<b>SIF</b><span>${lang === 'en' ? 'Federal Inspection Service in every unit' : 'Serviço de Inspeção Federal em todas as unidades'}</span></li>
      <li>${ico('check')}<b>BPF · PSO</b><span>${lang === 'en' ? 'GMP and SSOP in the whole operation' : 'Boas Práticas e Procedimentos Sanitários em toda a operação'}</span></li>
      <li>${ico('vaca')}<b>${lang === 'en' ? 'Animal welfare' : 'Bem-estar animal'}</b><span>${lang === 'en' ? 'From the farm to the plant' : 'Da fazenda à fábrica'}</span></li>
    </ul>
  </div>
</section>
<section class="bloco processo">
  <div class="in">
    <div class="cab"><span class="kicker">${lang === 'en' ? 'Processes' : 'Processos'}</span><h2>${lang === 'en' ? 'How quality is built, step by step' : 'Como a qualidade é construída, etapa por etapa'}</h2></div>
    <ol class="trilho">${Q.etapas.map((e, i) => `<li class="etapa${e.foto ? ' com-foto' : ''}">
      <span class="e-n">${num(i)}</span>
      <div class="e-txt"><h3>${tr(e.t, lang)}</h3><p>${tr(e.d, lang)}</p></div>
      ${e.foto ? `<div class="e-foto">${img(e.foto, '')}</div>` : ''}
    </li>`).join('')}</ol>
  </div>
</section>
${atalhos(v, lang, ['areas-de-atuacao', 'exportacao', 'esg'])}`;
}

// ---------- Áreas de atuação ----------
function atuacao(v, lang) {
  const A = C.atuacao;
  return `${capa({ v, lang, titulo: tr(A.titulo, lang), sub: tr(A.txt[1], lang), foto: 'graxaria', trilha: [['sobre-nos', tr(C.sobre.titulo, lang)], ['areas-de-atuacao', tr(A.titulo, lang)]] })}
<section class="bloco">
  <div class="in duas">
    <div class="txt"><span class="kicker">${lang === 'en' ? 'Full use' : 'Aproveitamento total'}</span><h2>${lang === 'en' ? 'Nothing is wasted' : 'Nada se perde'}</h2>${p(A.txt, lang)}</div>
    ${video(lang, 'graxaria')}
  </div>
</section>
<section class="bloco ciclo-sec">
  <div class="in">
    <div class="cab"><span class="kicker">${lang === 'en' ? 'Markets we serve' : 'Mercados atendidos'}</span><h2>${lang === 'en' ? 'One animal, five markets' : 'Um animal, cinco mercados'}</h2></div>
    <div class="ciclo">
      <div class="ciclo-centro"><img src="/assets/img/logo-frigoestrela${v === 'a' ? '-branco' : ''}.svg" alt="Frigoestrela" loading="lazy"><span>${lang === 'en' ? 'Beef and pork for consumption' : 'Carnes bovinas e suínas para consumo'}</span></div>
      ${A.mercados.map((m, i) => `<article class="mercado m${i}">
        <span class="m-ic">${ico(m.ic)}</span>
        <h3>${tr(m.t, lang)}</h3>
        <p>${tr(m.d, lang)}</p>
        ${m.u ? `<p class="m-u">${ico('fabrica')}${tr(m.u, lang)}</p>` : ''}
      </article>`).join('')}
    </div>
  </div>
</section>`;
}

// ---------- Marcas ----------
function marcasIndex(v, lang) {
  const L = s => href(v, lang, s);
  return `${capa({ v, lang, titulo: lang === 'en' ? 'Our brands' : 'Nossas marcas', sub: lang === 'en' ? 'Four brands for every table, from everyday meals to special moments.' : 'Quatro marcas para todas as mesas, do dia a dia aos momentos especiais.', foto: 'hero-picanha', trilha: [['marcas', lang === 'en' ? 'Brands' : 'Marcas']] })}
<section class="bloco"><div class="in lista-marcas">${C.marcas.map((m, i) => `<a class="lm${i % 2 ? ' inv' : ''}" href="${L(m.s)}">
  <div class="lm-foto">${img(m.foto, m.nome)}</div>
  <div class="lm-txt"><img class="lm-logo" src="/assets/img/${m.logo}.webp" alt="${m.nome}" loading="lazy"><h2>${tr(m.lema, lang)}</h2><p>${tr(m.resumo, lang)}</p>
  <p class="lm-n">${catalogo[m.s].grupos.reduce((a, g) => a + g.linhas.reduce((b, l) => b + l.p.length, 0), 0)} ${tr(ui.produtos, lang)}</p><span class="bt">${tr(ui.saibaMais, lang)}${ico('seta')}</span></div>
</a>`).join('')}</div></section>`;
}

function marca(v, lang, m) {
  const L = s => href(v, lang, s);
  const cat = catalogo[m.s];
  const tot = cat.grupos.reduce((a, g) => a + g.linhas.reduce((b, l) => b + l.p.length, 0), 0);
  const consIco = { resfriado: 'termo', congelado: 'floco', ambiente: 'caixa', '': 'relogio' };
  const etiqueta = ([n, peso, c, d]) => {
    const k = cons[c];
    return `<li class="et" data-tipo="${k.tipo}" data-nome="${esc(n.toLowerCase())}">
      <b>${n}</b>${peso ? `<span class="et-peso">${tr(peso, lang)}</span>` : ''}
      <span class="et-info"><span class="et-c t-${k.tipo || 'nd'}" title="${tr(ui.conservacao, lang)}">${ico(consIco[k.tipo])}${tr(k.t, lang)}</span><span class="et-v" title="${tr(ui.validade, lang)}">${ico('relogio')}${validade(d, lang)}</span></span>
    </li>`;
  };
  const tipos = [...new Set(cat.grupos.flatMap(g => g.linhas.flatMap(l => l.p.map(x => cons[x[2]].tipo))).filter(Boolean))];
  return `${capa({ v, lang, titulo: m.nome, kicker: tr(m.lema, lang), sub: tr(cat.intro, lang), foto: cat.foto, trilha: [['marcas', lang === 'en' ? 'Brands' : 'Marcas'], [m.s, m.nome]] })}
<section class="bloco cat" data-catalogo>
  <div class="in">
    <div class="cat-topo">
      <img class="cat-logo" src="/assets/img/${m.logo}.webp" alt="${m.nome}" loading="lazy">
      <div class="cat-ctl">
        <label class="busca">${ico('busca')}<input type="search" placeholder="${tr(ui.buscar, lang)}" aria-label="${tr(ui.buscar, lang)}" data-busca></label>
        <div class="chips" role="group" aria-label="${tr(ui.conservacao, lang)}"><button aria-pressed="true" data-tipo="">${tr(ui.todos, lang)} <small>${tot}</small></button>${tipos.map(t => `<button aria-pressed="false" data-tipo="${t}">${ico(consIco[t])}${tr(ui[t], lang)}</button>`).join('')}</div>
      </div>
    </div>
    ${cat.grupos.length > 1 ? `<nav class="cat-nav">${cat.grupos.map((g, i) => `<a href="#g${i}">${tr(g.t, lang)}</a>`).join('')}</nav>` : ''}
    ${cat.grupos.map((g, i) => `<article class="grupo" id="g${i}">
      <header class="g-cab">
        <div class="g-foto">${img(g.foto, tr(g.t, lang))}</div>
        <div class="g-txt">${g.selo ? `<span class="selo">${ico('estrela')}${tr(g.selo, lang)}</span>` : ''}<h2>${tr(g.t, lang)}</h2><p>${tr(g.d, lang)}</p>
        <p class="g-n">${g.linhas.reduce((b, l) => b + l.p.length, 0)} ${tr(ui.produtos, lang)}</p></div>
      </header>
      ${g.linhas.map(l => `<div class="linha-p"><h3>${tr(l.t, lang)}${l.d ? ` <small>${tr(l.d, lang)}</small>` : ''}</h3><ul class="etiquetas">${l.p.map(etiqueta).join('')}</ul></div>`).join('')}
    </article>`).join('')}
    <p class="vazio" hidden>${tr(ui.nenhum, lang)}</p>
  </div>
</section>
<section class="faixa-banner">${img(cat.faixa, '')}</section>
<section class="bloco outras"><div class="in"><h2>${tr(ui.outrasMarcas, lang)}</h2><div class="om">${C.marcas.filter(x => x !== m).map(x => `<a href="${L(x.s)}"><img src="/assets/img/${x.logo}.webp" alt="${x.nome}" loading="lazy"><span>${tr(x.lema, lang)}</span></a>`).join('')}</div></div></section>`;
}

// ---------- Exportação ----------
function exportacao(v, lang) {
  const E = C.exportacao;
  return `${capa({ v, lang, titulo: tr(E.titulo, lang), sub: tr(E.sub, lang), kicker: tr(E.destaque, lang), foto: 'exporta-alcatra', trilha: [['exportacao', tr(E.titulo, lang)]] })}
<section class="bloco">
  <div class="in duas">
    <div class="txt"><span class="kicker">${ico('globo')} ${lang === 'en' ? 'World market' : 'Mercado mundial'}</span><h2>${tr(E.sub, lang)}</h2>${p(E.txt, lang)}
      <ul class="selos-ex"><li>${ico('check')}${tr(E.halal, lang)}</li><li>${ico('escudo')}SIF</li><li>${ico('globo')}${lang === 'en' ? '4 continents' : '4 continentes'}</li></ul></div>
    <div class="ex-mapa">${img('exporta-mapa', lang === 'en' ? 'World map with the countries Frigoestrela exports to' : 'Mapa-múndi com os países para onde o Frigoestrela exporta')}</div>
  </div>
</section>
<section class="bloco regioes"><div class="in"><div class="rg-grade">${E.regioes.map(r => `<div class="rg"><h3>${tr(r.r, lang)}</h3><ul>${r.p.map(x => `<li>${tr(x, lang)}</li>`).join('')}</ul></div>`).join('')}</div></div></section>
<section class="faixa-banner">${img('noticia-eua', tr(C.destaques[0].t, lang))}</section>
<section class="bloco cta-ex"><div class="in"><div><h2>${lang === 'en' ? 'Importer or distributor?' : 'É importador ou distribuidor?'}</h2><p>${lang === 'en' ? 'Talk to our export team.' : 'Fale com a nossa equipe de exportação.'}</p></div>${botao(href(v, lang, 'contato') + '?assunto=exportacao', tr(ui.falar, lang))}</div></section>`;
}

// ---------- Boutique ----------
function boutique(v, lang) {
  const B = C.boutique;
  return `${capa({ v, lang, titulo: tr(B.titulo, lang), sub: tr(B.txt, lang), kicker: tr(B.sub, lang), foto: 'boutique', trilha: [['boutique-de-carne', tr(B.titulo, lang)]] })}
<section class="bloco">
  <div class="in">
    <div class="cab"><span class="kicker">${tr(B.sub, lang)}</span><h2>${tr(B.chamada, lang)}</h2><p>${tr(C.home.boutiqueTxt, lang)}</p></div>
    <div class="lojas">${B.lojas.map((l, i) => `<article class="loja">
      <span class="loja-n">${num(i)}</span><h3>${l.n}</h3>
      <p>${ico('pin')}${l.end}</p>
      <p>${ico('fone')}<a href="tel:+55${l.fone.replace(/\D/g, '')}">${l.fone}</a></p>
      <a class="bt bt-linha" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Boutique de Carne Estrela ' + l.end)}" target="_blank" rel="noopener">${tr(ui.comoChegar, lang)}${ico('externo')}</a>
    </article>`).join('')}</div>
  </div>
</section>
<section class="bloco vitrine"><div class="in">
  <div class="cab"><h2>${lang === 'en' ? 'All our brands in one place' : 'Todas as nossas marcas num só lugar'}</h2></div>
  <div class="vt-grade">${['picanha-angus', 'linguica-queijo', 'donna-embutidos', 'tche-salsicha', 'hero-tomahawk', 'suinos'].map(f => `<div class="vt">${img(f, '')}</div>`).join('')}</div>
  <div class="logos-marcas linha">${C.marcas.map(m => `<a href="${href(v, lang, m.s)}"><img src="/assets/img/${m.logo}.webp" alt="${m.nome}" loading="lazy"></a>`).join('')}</div>
</div></section>`;
}

// ---------- ESG ----------
function esgPagina(v, lang) {
  const E = C.esg;
  const pc = s => parseFloat(s.replace(',', '.'));
  return `${capa({ v, lang, titulo: tr(E.titulo, lang), sub: tr(E.sub, lang), kicker: tr(E.atualizado, lang), foto: 'pasto', trilha: [['esg', 'ESG']] })}
<section class="bloco">
  <div class="in duas">
    <div class="txt"><img class="logo-sust" src="/assets/img/logo-sustentabilidade.webp" alt="${lang === 'en' ? 'Frigoestrela Sustainability' : 'Sustentabilidade Frigoestrela'}" loading="lazy">${p(E.sust, lang)}</div>
    <div class="txt caixa-gov"><h2>${tr(E.governancaTitulo, lang)}</h2>${p(E.governanca, lang)}</div>
  </div>
</section>
<section class="bloco linha-tempo">
  <div class="in">
    <div class="cab"><span class="kicker">${lang === 'en' ? 'SARB 026/2023 commitment' : 'Compromisso SARB 026/2023'}</span><h2>${lang === 'en' ? 'Traceability, year by year' : 'Rastreabilidade, ano a ano'}</h2></div>
    <ol class="lt">${E.linha.map(([a, t], i, arr) => `<li class="${i === arr.length - 1 ? 'meta' : ''}"><b>${a}</b><span>${tr(t, lang)}</span></li>`).join('')}</ol>
  </div>
</section>
<section class="bloco indicadores">
  <div class="in">
    <div class="cab"><span class="kicker">${lang === 'en' ? 'Results' : 'Resultados'}</span><h2>${tr(E.indicadoresTitulo, lang)}</h2></div>
    <div class="ind-grade">${E.indicadores.map(([t, a, b]) => `<div class="ind">
      <p>${tr(t, lang)}</p>
      <div class="barra"><span>${tr(E.colunas[0], lang)}</span><i style="--p:${pc(a)}%"></i><b>${a}</b></div>
      <div class="barra b2"><span>${tr(E.colunas[1], lang)}</span><i style="--p:${pc(b)}%"></i><b>${b}</b></div>
    </div>`).join('')}</div>
  </div>
</section>
<section class="bloco ferramentas"><div class="in">
  <div class="cab"><span class="kicker">${lang === 'en' ? 'Monitoring tools' : 'Ferramentas de monitoramento'}</span><h2>${lang === 'en' ? 'Market platforms behind the controls' : 'Plataformas de mercado por trás dos controles'}</h2></div>
  <div class="fr-grade">${E.ferramentas.map(([n, t]) => `<div class="fr"><b>${n}</b><p>${tr(t, lang)}</p></div>`).join('')}</div>
</div></section>
${atalhos(v, lang, ['areas-de-atuacao', 'controle-de-qualidade', 'unidades'])}`;
}

// ---------- Notícias ----------
function noticiasLista(v, lang) {
  const L = s => href(v, lang, s);
  return `${capa({ v, lang, titulo: tr(ui.noticias, lang), sub: tr(C.home.noticiasTitulo, lang), foto: 'noticia-reciclar-capa', trilha: [['noticias', tr(ui.noticias, lang)]] })}
<section class="bloco"><div class="in lista-not">
  ${C.noticias.map((n, i) => `<a class="ln${i ? '' : ' ln-1'}" href="${L('noticias/' + n.s)}">${img(n.img, '')}<span class="ln-txt"><time datetime="${n.data}">${dataFmt(n.data, lang)}</time><b>${tr(n.t, lang)}</b><em>${tr(n.r, lang)}</em><i>${tr(ui.lerMais, lang)} ${ico('seta')}</i></span></a>`).join('')}
</div>
<div class="in destaques-not">${C.destaques.map(d => `<figure>${img(d.img, tr(d.t, lang))}<figcaption>${tr(d.t, lang)}</figcaption></figure>`).join('')}</div></section>`;
}

function noticia(v, lang, n) {
  const L = s => href(v, lang, s);
  const outras = C.noticias.filter(x => x !== n);
  return `<article class="materia">
  <header class="in mt-cab">
    <nav class="trilha"><a href="${L('index')}">${tr(ui.inicio, lang)}</a><i>/</i><a href="${L('noticias')}">${tr(ui.noticias, lang)}</a></nav>
    <time datetime="${n.data}">${dataFmt(n.data, lang)}</time>
    <h1>${tr(n.t, lang)}</h1>
    <p class="mt-lide">${tr(n.r, lang)}</p>
  </header>
  <div class="mt-foto">${img(n.img, tr(n.t, lang), 'fetchpriority="high" loading="eager"')}</div>
  <div class="in mt-corpo">${p(n.p, lang)}<p>${botao(L('noticias'), tr(ui.voltar, lang), 'bt bt-linha')}</p></div>
</article>
<section class="bloco mais"><div class="in"><h2>${lang === 'en' ? 'More news' : 'Mais notícias'}</h2><div class="nh-grade dois">${outras.map(o => `<a class="nh" href="${L('noticias/' + o.s)}">${img(o.img, '')}<span class="nh-txt"><time datetime="${o.data}">${dataFmt(o.data, lang)}</time><b>${tr(o.t, lang)}</b></span></a>`).join('')}</div></div></section>`;
}

// ---------- Contato ----------
function contato(v, lang) {
  const K = C.contato;
  const c = K.campos;
  return `${capa({ v, lang, titulo: tr(K.titulo, lang), sub: tr(K.txt, lang), foto: 'linha-producao', trilha: [['contato', tr(ui.falar, lang)]] })}
<section class="bloco">
  <div class="in contato-grade">
    <div class="canais">
      <a class="canal" href="tel:${site.foneHref}">${ico('fone')}<span><small>${tr(ui.central, lang)} Estrela</small><b>${site.fone}</b></span></a>
      <a class="canal" href="tel:${site.sacHref}">${ico('headset')}<span><small>SAC</small><b>${site.sac}</b></span></a>
      <a class="canal" href="${site.ouvidoria}" target="_blank" rel="noopener">${ico('escudo')}<span><small>${tr(ui.ouvidoria, lang)}</small><b>Contato Seguro</b></span></a>
      <a class="canal" href="${href(v, lang, 'unidades')}">${ico('pin')}<span><small>${lang === 'en' ? 'Phone by region' : 'Telefone por região'}</small><b>${lang === 'en' ? 'Our units' : 'Nossas unidades'}</b></span></a>
      <a class="canal" href="${href(v, lang, 'trabalhe-conosco')}">${ico('pessoa')}<span><small>${lang === 'en' ? 'Résumés' : 'Currículos'}</small><b>${tr(C.vagas.titulo, lang)}</b></span></a>
    </div>
    <form class="form" data-form>
      <h2>${lang === 'en' ? 'Send a message' : 'Envie uma mensagem'}</h2>
      <label class="campo largo"><span>${tr(c.assunto, lang)}</span><select name="assunto" required>${K.assuntos.map(a => `<option value="${esc(a.pt.toLowerCase())}">${tr(a, lang)}</option>`).join('')}</select></label>
      <label class="campo"><span>${tr(c.nome, lang)}</span><input name="nome" required autocomplete="name"></label>
      <label class="campo"><span>${tr(c.email, lang)}</span><input name="email" type="email" required autocomplete="email"></label>
      <label class="campo"><span>${tr(c.fone, lang)}</span><input name="fone" type="tel" autocomplete="tel"></label>
      <label class="campo"><span>${tr(c.cidade, lang)}</span><input name="cidade" autocomplete="address-level2"></label>
      <label class="campo largo"><span>${tr(c.msg, lang)}</span><textarea name="mensagem" rows="5" required></textarea></label>
      <button class="bt" type="submit">${tr(ui.enviar, lang)}${ico('seta')}</button>
      <p class="aviso" role="status" hidden>${tr(K.enviado, lang)}</p>
    </form>
  </div>
</section>`;
}

function vagas(v, lang) {
  const V = C.vagas;
  const sn = (n, t) => `<fieldset class="campo"><legend>${tr(t, lang)}</legend><label><input type="radio" name="${n}" value="nao" checked> ${tr(V.nao, lang)}</label><label><input type="radio" name="${n}" value="sim"> ${tr(V.sim, lang)}</label></fieldset>`;
  return `${capa({ v, lang, titulo: tr(V.titulo, lang), sub: tr(V.txt, lang), foto: 'qualidade-equipe', trilha: [['trabalhe-conosco', tr(V.titulo, lang)]] })}
<section class="bloco">
  <div class="in vagas-grade">
    <aside class="pcd">${img('vagas-pcd', lang === 'en' ? 'Openings for People with Disabilities' : 'Vagas para Pessoas com Deficiência')}<p>${tr(V.pcd, lang)}</p>${img('trainee', lang === 'en' ? 'Frigoestrela Trainee Program' : 'Programa Trainee Frigoestrela')}</aside>
    <form class="form" data-form>
      <h2>${lang === 'en' ? 'Application form' : 'Cadastro'}</h2>
      ${V.campos.map(([n, t, tipo]) => `<label class="campo"><span>${tr(t, lang)}</span><input name="${n}" type="${tipo}"${['nome', 'fone', 'email'].includes(n) ? ' required' : ''}></label>`).join('')}
      ${sn('familia', V.familia)}${sn('ja-trabalhou', V.jaTrabalhou)}
      <label class="campo largo"><span>${tr(V.experiencia, lang)}</span><textarea name="experiencia" rows="4"></textarea></label>
      <label class="campo largo"><span>${tr(V.arquivo, lang)}</span><input type="file" name="curriculo" accept=".pdf,.doc,.docx"></label>
      <button class="bt" type="submit">${tr(ui.enviar, lang)}${ico('seta')}</button>
      <p class="aviso" role="status" hidden>${tr(C.contato.enviado, lang)}</p>
    </form>
  </div>
</section>`;
}

// ---------- Montagem ----------
export function gerarVersao(v) {
  const out = {};
  for (const lang of ['pt', 'en']) {
    const pg = (slug, titulo, desc, corpo, og) => { out[(lang === 'en' ? 'en/' : '') + slug] = doc({ v, lang, slug, titulo, desc, corpo, og }); };
    pg('index', tr(C.home.titulo, lang), tr(C.home.intro[0], lang), v === 'a' ? homeA(v, lang) : homeB(v, lang));
    pg('sobre-nos', tr(C.sobre.titulo, lang), tr(C.sobre.txt[0], lang), sobre(v, lang));
    pg('unidades', lang === 'en' ? 'Units' : 'Unidades', tr(C.unidadesTxt, lang), unidades(v, lang));
    pg('controle-de-qualidade', tr(C.qualidade.titulo, lang), tr(C.qualidade.txt[0], lang), qualidade(v, lang));
    pg('areas-de-atuacao', tr(C.atuacao.titulo, lang), tr(C.atuacao.txt[0], lang), atuacao(v, lang));
    pg('marcas', lang === 'en' ? 'Brands' : 'Marcas', lang === 'en' ? 'Estrela Alimentos, Special Lines, Donna Estrela and Tchê.' : 'Estrela Alimentos, Linhas Especiais, Donna Estrela e Tchê.', marcasIndex(v, lang));
    for (const m of C.marcas) pg(m.s, m.nome, tr(catalogo[m.s].intro, lang), marca(v, lang, m));
    pg('exportacao', tr(C.exportacao.titulo, lang), tr(C.exportacao.txt[0], lang), exportacao(v, lang));
    pg('boutique-de-carne', tr(C.boutique.titulo, lang), tr(C.home.boutiqueTxt, lang), boutique(v, lang));
    pg('esg', 'ESG', tr(C.esg.governanca[0], lang), esgPagina(v, lang));
    pg('noticias', tr(ui.noticias, lang), tr(C.home.noticiasTitulo, lang), noticiasLista(v, lang));
    for (const n of C.noticias) pg('noticias/' + n.s, tr(n.t, lang), tr(n.r, lang), noticia(v, lang, n));
    pg('contato', tr(C.contato.titulo, lang), tr(C.contato.txt, lang), contato(v, lang));
    pg('trabalhe-conosco', tr(C.vagas.titulo, lang), tr(C.vagas.txt, lang), vagas(v, lang));
  }
  return out;
}
