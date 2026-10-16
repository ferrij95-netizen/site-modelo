// Páginas das duas versões do site da Extrusão Brasil (remodeladas depois do retorno do João em 16/10).
// A = "Engenharia": clara e técnica, inspirada em Sandvik e Bausano. Título grande, máquina em "estúdio" com cotas
//     técnicas, escolha da linha pelo produto final, séries com tabela de modelos, cantos retos e linhas finas.
// B = "Linha em operação": escura, inspirada em battenfeld-cincinnati, Formlabs e AMUT. Vídeo em tela cheia,
//     mosaico de aplicações, vitrine de máquinas, linha de extrusão interativa e números grandes.
// Os mesmos textos, fotos, vídeos e páginas nas duas.
import fs from 'node:fs';
import path from 'node:path';
import * as C from './conteudo.mjs';

const { site } = C;
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra ? ' ' + extra : ''}>`;
const dois = n => String(n).padStart(2, '0');

const dirFeiras = path.join(path.dirname(new URL(import.meta.url).pathname), '../public/assets/img/feiras');
const FEIRAS = new Set(fs.existsSync(dirFeiras) ? fs.readdirSync(dirFeiras).map(f => f.replace(/\.webp$/, '')) : []);

const I = {
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  whats: '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c.3 2 2.5 4.3 4.6 4.6l1.2-1.2 1.7.9c-.3 1-1.2 1.7-2.2 1.6-3.3-.4-6-3.1-6.4-6.4-.1-1 .6-1.9 1.6-2.2l.9 1.7z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  play: '<path d="M8 5v14l11-7z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  alerta: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
  banco: '<path d="M3 10h18L12 4zM5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
};
const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

const EQ = Object.fromEntries(C.equipamentos.map(e => [e.slug, e]));
const VD = Object.fromEntries(C.videos.map(v => [v[0], v]));
const EXTRUSORAS = ['extrusoras-mono-rosca', 'extrusoras-dupla-roscas-contra-rotantes', 'extrusoras-dupla-roscas-co-rotantes'];
const SERIE_COD = { 'extrusoras-mono-rosca': 'MR', 'extrusoras-dupla-roscas-contra-rotantes': 'DR · DRcn', 'extrusoras-dupla-roscas-co-rotantes': 'DRC' };

// "Ø 25 mm · mod. EB-MR 25:30" -> { mod: 'EB-MR 25:30', d: '25', ld: '1:30' }
const modelo = s => {
  const m = s.match(/Ø\s*(\d+)\s*mm · mod\. (.+)$/);
  if (!m) return { mod: s, d: '', ld: '' };
  const ld = (m[2].match(/:(\d+)$/) || [])[1];
  return { mod: m[2], d: m[1], ld: ld ? `1:${ld}` : '' };
};

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

const MENU = [['equipamentos', 'Equipamentos'], ['empresa', 'Empresa'], ['videos', 'Vídeos'], ['pecas-de-reposicao', 'Peças de reposição'], ['feiras-e-eventos', 'Feiras'], ['financiamentos', 'Financiamentos'], ['contato', 'Contato']];

export function gerarVersao(v) {
  const A = v === 'a';
  const L = s => `/${v}/${s === 'index' ? '' : s + '/'}`;
  const LE = s => L(`equipamentos/${s}`);
  const atual = slug => (EQ[slug] ? 'equipamentos' : slug);
  const nav = slug => MENU.map(([s, t]) => `<a href="${L(s)}"${atual(slug) === s ? ' aria-current="page"' : ''}>${t}</a>`).join('');
  const zapHref = site.whatsHref;
  const zap = (txt = 'WhatsApp', cls = 'btn btn-zap') => `<a class="${cls}" href="${zapHref}" target="_blank" rel="noopener">${ico('whats')}${txt}</a>`;
  const rot = t => `<span class="rot">${t}</span>`; // rótulo em fonte mono

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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700;800&family=Fira+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v} p-${EQ[slug] ? 'equipamento' : slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>`;
  };

  const header = slug => `
<header class="cab${slug === 'index' ? ' cab-home' : ''}"><div class="in">
  <a class="logo" href="${L('index')}"><img src="/assets/img/logo.webp" alt="Extrusão Brasil" width="206" height="154"></a>
  <nav class="menu" aria-label="Principal">${nav(slug)}</nav>
  <a class="cab-fone" href="${site.foneHref}">${ico('fone')}<span>${site.fone}</span></a>
  <a class="btn cab-bt" href="${zapHref}" target="_blank" rel="noopener">Solicitar orçamento</a>
  <button class="abre-menu" aria-label="Abrir menu" aria-expanded="false">${ico('menu')}</button>
</div></header>`;

  const footer = `
<footer class="rod">
  <div class="in rod-topo">
    <div class="rod-cta"><h2>Vamos projetar a sua linha?</h2><p>Diga o produto que você quer extrudar e a produção desejada. A engenharia indica a extrusora e a linha de frente.</p></div>
    <div class="rod-bts">${zap('Falar no WhatsApp')}<a class="btn btn-claro" href="mailto:${site.email}">${ico('mail')}${site.email}</a></div>
  </div>
  <div class="in rod-g">
    <div class="rod-marca">
      <img src="/assets/img/logo.webp" alt="Extrusão Brasil" width="140" height="105" loading="lazy">
      <p>${site.resumo}</p>
    </div>
    <div><h3>Equipamentos</h3><ul>${C.equipamentos.map(e => `<li><a href="${LE(e.slug)}">${e.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Empresa</h3><ul>${[['empresa', 'Quem somos'], ['pecas-de-reposicao', 'Peças de reposição'], ['videos', 'Vídeos'], ['feiras-e-eventos', 'Feiras e eventos'], ['financiamentos', 'Financiamentos'], ['contato', 'Contato']].map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}</ul></div>
    <div class="rod-ct"><h3>Contato</h3>
      <p>${ico('pin')}<span>${site.endereco}</span></p>
      <p>${ico('fone')}<span><a href="${site.foneHref}">${site.fone}</a><br>${site.fonesExtra.join(' · ')}</span></p>
      <p>${ico('whats')}<a href="${zapHref}" target="_blank" rel="noopener">${site.whats} (WhatsApp)</a></p>
      <p>${ico('mail')}<a href="mailto:${site.email}">${site.email}</a></p>
    </div>
  </div>
  <div class="rod-base"><div class="in"><span>© 2026 Extrusão Brasil · Todos os direitos reservados</span><span>Proposta de novo site · Overtus</span></div></div>
</footer>
<a class="zap-flut" href="${zapHref}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ico('whats')}</a>
<script src="/assets/site.js" defer></script>
</body>
</html>
`;

  const migalha = itens => `<nav class="migalha" aria-label="Você está em"><a href="${L('index')}">Início</a>${itens.map(([t, h]) => `<i>/</i>${h ? `<a href="${h}">${t}</a>` : `<span>${t}</span>`}`).join('')}</nav>`;
  const titulo = (h1, itens, sub = '', foto = '') => `
<section class="pg-tit${foto ? ' com-foto' : ''}"><div class="in">
  <div class="pg-tit-txt">${migalha(itens)}<h1>${h1}</h1>${sub ? `<p>${sub}</p>` : ''}</div>
  ${foto ? `<div class="pg-tit-foto">${img(foto, h1, 'loading="eager"')}</div>` : ''}
</div></section>`;

  const h2 = (t, sub = '', r = '') => `<header class="sec-tit">${r ? rot(r) : ''}<h2>${t}</h2>${sub ? `<p>${sub}</p>` : ''}</header>`;

  const form = () => `
<form class="form-zap" data-zap="${zapHref.split('?')[0]}">
  <label><span>Nome</span><input name="nome" required autocomplete="name"></label>
  <label><span>Empresa</span><input name="empresa" autocomplete="organization"></label>
  <label><span>DDD/Telefone</span><input name="fone" required autocomplete="tel"></label>
  <label><span>Cidade/UF</span><input name="cidade"></label>
  <label class="f-msg"><span>O que você quer produzir?</span><textarea name="msg" rows="3" placeholder="Ex.: tubos de PVC de 20 a 100 mm, 300 kg/h"></textarea></label>
  <button class="btn" type="submit">${ico('whats')}Enviar pelo WhatsApp</button>
</form>`;

  const contatoSec = () => `
<section class="sec fale"><div class="in fale-g">
  <div>${h2('Fale com a engenharia', C.contato, 'Orçamento')}
    <ul class="fale-ct">
      <li>${ico('fone')}<a href="${site.foneHref}">${site.fone}</a></li>
      <li>${ico('whats')}<a href="${zapHref}" target="_blank" rel="noopener">${site.whats}</a></li>
      <li>${ico('mail')}<a href="mailto:${site.email}">${site.email}</a></li>
    </ul></div>
  ${form()}
</div></section>`;

  const fichas = (e, cls = 'fichas') => `<dl class="${cls}">${e.fichas.map(([k, val]) => `<div><dt>${k}</dt><dd>${val}</dd></div>`).join('')}</dl>`;

  // Escolha pelo produto final (abas)
  const aplicacoesSec = (claro = true) => `
<section class="sec apl" id="aplicacoes"><div class="in">
  ${h2('Escolha pelo produto que você vai fabricar', 'Cada produto pede uma extrusora e uma linha de frente. Veja como a Extrusão Brasil monta a linha completa.', 'Aplicações')}
  <div class="apl-g" data-abas data-ids="${C.aplicacoes.map(a => a.id).join(',')}">
    <div class="apl-lista" role="tablist">${C.aplicacoes.map((a, i) => `
      <button role="tab" aria-selected="${i === 0}" data-i="${i}"><span>${dois(i + 1)}</span>${a.nome}${ico('seta')}</button>`).join('')}
    </div>
    <div class="apl-paineis">${C.aplicacoes.map((a, i) => {
      const vd = a.video && VD[a.video];
      return `
      <article class="apl-p${i === 0 ? ' on' : ''}" role="tabpanel" data-i="${i}">
        <div class="apl-midia">${vd
          ? `<button class="vd" data-video="${vd[2]}" data-titulo="${esc(vd[1])}"><span class="vd-poster"><img src="/assets/video/${vd[0]}.webp" alt="${esc(vd[1])}" loading="lazy"><i>${ico('play')}</i></span></button>`
          : `<div class="apl-foto">${img(a.foto, a.nome)}</div>`}</div>
        <div class="apl-txt">
          <h3>${a.nome}</h3><p>${a.texto}</p>
          ${rot('Configuração da linha')}
          <ol class="apl-linha">${a.linha.map(x => `<li>${x}</li>`).join('')}</ol>
          <div class="apl-bts"><a class="btn" href="${LE(a.extrusora)}">${EQ[a.extrusora].curto} ${ico('seta')}</a>${zap('Orçar esta linha', 'btn btn-vazado')}</div>
        </div>
      </article>`;
    }).join('')}
    </div>
  </div>
</div></section>`;

  // Séries de extrusoras com tabela de modelos
  const seriesSec = () => `
<section class="sec series"><div class="in">
  ${h2('Três famílias de extrusoras, 23 modelos', 'De 22 a 150 mm de diâmetro de rosca. Toque na série para ver aplicação, características e fotos.', 'Extrusoras')}
  <div class="series-g">${EXTRUSORAS.map(s => {
    const e = EQ[s];
    const mods = e.grupos.flatMap(([, l]) => l).map(modelo);
    return `
    <article class="serie">
      <a class="serie-foto" href="${LE(s)}">${img(e.img, e.nome)}<span class="serie-cod">${SERIE_COD[s]}</span></a>
      <div class="serie-txt">
        <h3><a href="${LE(s)}">${e.nome}</a></h3>
        <p>${e.resumo}</p>
        ${fichas(e)}
        <a class="lnk" href="${LE(s)}">Ver a série completa ${ico('seta')}</a>
      </div>
      <div class="serie-tab"><table><thead><tr><th>Modelo</th><th>Ø rosca</th>${mods.some(m => m.ld) ? '<th>L/D</th>' : ''}</tr></thead><tbody>${mods.map(m => `<tr><td>${m.mod}</td><td>${m.d} mm</td>${mods.some(x => x.ld) ? `<td>${m.ld || '—'}</td>` : ''}</tr>`).join('')}</tbody></table></div>
    </article>`;
  }).join('')}
  </div>
</div></section>`;

  const alemSec = () => {
    const [m, lf, t] = ['misturadores-resfriadores', 'equipamentos-para-linhas-de-frente', 'conjunto-completo-para-fabricacao-de-telhas-em-pvc'].map(s => EQ[s]);
    return `
<section class="sec alem"><div class="in">
  ${h2('Além da extrusora', 'Periféricos e linhas de frente do mesmo fabricante, para a linha funcionar como um conjunto.', 'Linha completa')}
  <div class="bento">
    <a class="bt bt-g" href="${LE(t.slug)}"><span class="bt-foto">${img('telhas-1', t.nome)}</span><span class="bt-txt">${rot(t.serie)}<b>${t.nome}</b><span>${t.resumo}</span></span></a>
    <a class="bt" href="${LE(lf.slug)}"><span class="bt-foto">${img('lf-puxador-duplo', lf.nome)}</span><span class="bt-txt">${rot('11 equipamentos')}<b>${lf.nome}</b></span></a>
    <a class="bt" href="${LE(m.slug)}"><span class="bt-foto">${img('misturador-duplo', m.nome)}</span><span class="bt-txt">${rot('10 a 1.500 kg/h')}<b>${m.nome}</b></span></a>
  </div>
</div></section>`;
  };

  const pilaresSec = () => `
<section class="sec pilares"><div class="in">
  ${h2('Por que Extrusão Brasil', C.empresa.quemSomos[2], 'A empresa')}
  <ol class="pil">${C.pilares.map(([t, d], i) => `<li><span>${dois(i + 1)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>`;

  const pecasSec = () => `
<section class="pecas-faixa"><div class="in pf-g">
  <div class="pf-foto">${img('pecas-slide', 'Roscas e canhões de reposição Extrusão Brasil')}</div>
  <div class="pf-txt">
    ${rot('Peças de reposição')}
    <h2>Peças originais, com as especificações do projeto</h2>
    <p>${C.pecas.intro[1]}</p>
    <ul class="pf-lista">${C.pecas.consulte.map(x => `<li>${x}</li>`).join('')}</ul>
    <p class="pf-obs">${C.pecas.outros}</p>
    <div class="apl-bts"><a class="btn btn-am" href="${L('pecas-de-reposicao')}">Ver peças ${ico('seta')}</a>${zap('Consultar uma peça', 'btn btn-vazado')}</div>
  </div>
</div></section>`;

  const feiraFoto = (f, n) => `/assets/img/feiras/${f[0]}-${f[1]}-${dois(n)}.webp`;
  const FCAPA = { 'feiplastic-2015': 3, 'interplast-2014': 7, 'feiplastic-2013': 18, 'interplast-2012': 25, 'brasilplast-2011': 13, 'interplast-2010': 4 };
  const feirasSec = () => `
<section class="sec feiras-home"><div class="in fh-g">
  <div>${h2('Parceira da Feiplastic e da Interplast desde a primeira edição', '', 'Feiras e eventos')}<a class="lnk" href="${L('feiras-e-eventos')}">Ver as fotos dos estandes ${ico('seta')}</a></div>
  <ol class="tempo">${C.feiras.lista.slice().reverse().map(f => `
    <li><a href="${L('feiras-e-eventos')}#${f[0]}-${f[1]}"><img src="${feiraFoto(f, FCAPA[f[0] + '-' + f[1]])}" alt="Estande da Extrusão Brasil na ${f[2]}" loading="lazy"><b>${f[1]}</b><span>${f[2].replace(/ \d+$/, '')}</span></a></li>`).join('')}
  </ol>
</div></section>`;

  const finSec = () => `
<section class="sec fin-home"><div class="in fin-h">
  <div>${rot('Financiamentos')}<h2>Sua linha pelo FINAME, Leasing, BNDES ou Proger</h2><p>${C.financiamentos.intro}</p><a class="lnk" href="${L('financiamentos')}">Ver as modalidades ${ico('seta')}</a></div>
  <ul>${C.financiamentos.itens.map(([f, t]) => `<li><img src="/assets/img/${f}.webp" alt="${esc(t)}"></li>`).join('')}</ul>
</div></section>`;

  const numerosSec = () => `<section class="numeros"><div class="in">${C.numeros.map(([n, t, d]) => `<div><b>${n}</b><span>${t}</span><small>${d}</small></div>`).join('')}</div></section>`;

  const linhaB = () => `
<section class="sec linha" id="linha"><div class="in">
  ${h2('A linha de extrusão, estação por estação', 'Toque em cada estação para ver o equipamento.', 'Como funciona')}
  <div class="ln" data-linha>
    <div class="ln-palco">${C.etapas.map(([f, t, eq, d], i) => `
      <figure class="ln-slide${i === 1 ? ' on' : ''}" data-i="${i}">${img(f, eq)}<figcaption><span>${dois(i + 1)} · ${t}</span><b>${eq}</b><p>${d}</p></figcaption></figure>`).join('')}
    </div>
    <ol class="ln-est" role="tablist">${C.etapas.map(([, t], i) => `
      <li><button role="tab" data-i="${i}" aria-selected="${i === 1}"><i></i><span>${dois(i + 1)}</span>${t}</button></li>`).join('')}
    </ol>
  </div>
</div></section>`;

  const videoCard = (x, legenda = true) => `
<button class="vd" data-video="${x[2]}" data-titulo="${esc(x[1])}">
  <span class="vd-poster"><img src="/assets/video/${x[0]}.webp" alt="" loading="lazy" decoding="async"><i>${ico('play')}</i></span>
  ${legenda ? `<b>${x[1]}</b>` : ''}
</button>`;

  // ---------- páginas ----------
  const P = {};

  P.index = () => A ? `
<main id="conteudo">
<section class="hero"><div class="in hero-g">
  <div class="hero-txt">
    ${rot('Fabricante de extrusoras · Diadema, SP')}
    <h1>Extrusoras e linhas completas para termoplásticos</h1>
    <p>Mono rosca, dupla roscas contra-rotantes e co-rotantes, linhas de frente e misturadores: a Extrusão Brasil projeta, fabrica, instala e dá assistência à sua linha.</p>
    <div class="apl-bts"><a class="btn" href="#aplicacoes">Escolher pelo produto ${ico('seta')}</a><a class="btn btn-vazado" href="${L('equipamentos')}">Ver equipamentos</a></div>
  </div>
  <figure class="estudio">
    ${img('co-rotante-slide', 'Extrusora dupla roscas co-rotante Extrusão Brasil', 'loading="eager" fetchpriority="high"')}
    <span class="cota c1"><i></i>Ø 22 – 65 mm</span>
    <span class="cota c2"><i></i>0 – 600 RPM</span>
    <span class="cota c3"><i></i>L/D 1:36 – 1:48</span>
    <figcaption>${rot('Série DRC')} Dupla Roscas Co-Rotantes</figcaption>
  </figure>
</div>
${numerosSec()}
</section>
${aplicacoesSec()}
${seriesSec()}
${alemSec()}
${pilaresSec()}
${pecasSec()}
${feirasSec()}
${finSec()}
${contatoSec()}
</main>` : `
<main id="conteudo">
<section class="hero">
  <video class="hero-vd" autoplay muted loop playsinline preload="metadata" poster="/assets/video/linha-em-operacao.webp"><source src="/assets/video/linha-em-operacao.mp4" type="video/mp4"></video>
  <div class="in hero-g">
    ${rot('Extrusão Brasil · Diadema, SP')}
    <h1>Linhas de extrusão<br>que não param.</h1>
    <div class="hero-pe">
      <p>Extrusoras mono rosca, dupla roscas contra-rotantes e co-rotantes e linhas completas para tubos, perfis, forros, chapas, telhas e granulação.</p>
      <div class="apl-bts"><a class="btn btn-am" href="${L('equipamentos')}">Conhecer as máquinas ${ico('seta')}</a><a class="btn btn-vazado" href="${L('videos')}">${ico('play')}Ver as linhas funcionando</a></div>
    </div>
  </div>
  <div class="hero-fita" aria-hidden="true"><div>${[...C.aplicacoes, ...C.aplicacoes].map(a => `<span>${a.nome}</span>`).join('')}</div></div>
</section>

<section class="sec mosaico"><div class="in">
  ${h2('O que sai das nossas linhas', 'Tubos, forros, perfis, chapas, telhas e grânulos: veja a linha certa para cada produto.', 'Aplicações')}
  <div class="mz">${C.aplicacoes.map((a, i) => {
    const vd = a.video && VD[a.video];
    const fundo = vd ? `<img src="/assets/video/${vd[0]}.webp" alt="" loading="lazy">` : img(a.id === 'telhas' ? 'telhas-1' : a.foto, '');
    return `<a class="mz-it mz-${i}" href="${L('equipamentos')}#${a.id}">${fundo}<span>${rot(dois(i + 1))}<b>${a.nome}</b><small>${a.texto}</small></span></a>`;
  }).join('')}</div>
</div></section>

<section class="sec vitrine"><div class="in">
  ${h2('As máquinas', 'Seis linhas de produto, projetadas e fabricadas pela Extrusão Brasil.', 'Equipamentos')}
  <div class="vt">${C.equipamentos.map((e, i) => `
    <a class="vt-it vt-${i}" href="${LE(e.slug)}">
      <span class="vt-foto">${img(e.img, e.nome)}</span>
      <span class="vt-txt">${rot(e.serie)}<b>${e.nome}</b>${fichas(e)}</span>
      <span class="vt-mais">${ico('mais')}</span>
    </a>`).join('')}
  </div>
</div></section>

${linhaB()}

<section class="numeros"><div class="in">${C.numeros.map(([n, t, d]) => `<div><b>${n}</b><span>${t}</span><small>${d}</small></div>`).join('')}</div></section>

<section class="sec emp-home"><div class="in eh-g">
  <div class="eh-foto">${img('telhas-2', 'Telhas de PVC saindo de uma linha Extrusão Brasil')}</div>
  <div class="eh-txt">
    ${rot('A empresa')}
    <h2>Entre os principais fabricantes de equipamentos para extrusão do Brasil</h2>
    <p>${C.empresa.quemSomos[1]}</p>
    <ol class="pil">${C.pilares.map(([t, d], i) => `<li><span>${dois(i + 1)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
    <a class="lnk" href="${L('empresa')}">Conheça a empresa ${ico('seta')}</a>
  </div>
</div></section>

${pecasSec()}

<section class="sec videos-home"><div class="in">
  ${h2('Linhas em operação', 'Assista aos conjuntos da Extrusão Brasil funcionando.', 'Vídeos')}
  <div class="vd-trilho">${C.videos.map(x => videoCard(x)).join('')}</div>
</div></section>

${feirasSec()}
${finSec()}
${contatoSec()}
</main>`;

  P.empresa = () => `
<main id="conteudo">
${titulo('Projetamos, fabricamos e acompanhamos a sua linha', [['Empresa']], C.empresa.quemSomos[0], A ? 'mr-90' : 'contra-rotante-slide')}
<section class="sec"><div class="in emp-g">
  <div class="emp-txt">
    ${h2('Quem somos', '', 'Empresa')}
    ${C.empresa.quemSomos.slice(1).map(p => `<p>${p}</p>`).join('')}
    <p>${C.empresa.fabricamos} ${C.empresa.linhaFrente} ${C.empresa.perifericos}</p>
  </div>
  <aside class="emp-fab">
    ${rot('O que fabricamos')}
    <ul>${C.equipamentos.map(e => `<li><a href="${LE(e.slug)}"><span>${e.nome}</span>${ico('seta')}</a></li>`).join('')}</ul>
  </aside>
</div></section>
<section class="sec emp-apl"><div class="in">
  ${h2('Para extrusão de', '', 'Aplicações')}
  <ul class="chips">${C.empresa.aplicacoes.map(a => `<li>${a}</li>`).join('')}</ul>
</div></section>
${pilaresSec()}
<section class="sec queremos"><div class="in">
  ${h2('O que queremos', `${C.empresa.queremos} ${C.empresa.queremos2}`, 'Propósito')}
  <div class="mvv">${C.empresa.mvv.map(([t, d], i) => `<article class="mvv-${i}">${rot(dois(i + 1))}<h3>${t}</h3><p>${d}</p></article>`).join('')}</div>
</div></section>
${contatoSec()}
</main>`;

  P.equipamentos = () => `
<main id="conteudo">
${titulo('Equipamentos para extrusão de termoplásticos', [['Equipamentos']], 'Extrusoras, linhas de frente e periféricos, do mesmo fabricante.', A ? '' : 'drc-30')}
${seriesSec()}
${alemSec()}
${aplicacoesSec()}
${contatoSec()}
</main>`;

  const pagEq = e => () => {
    const lf = e.slug === 'equipamentos-para-linhas-de-frente';
    const outros = C.equipamentos.filter(x => x.slug !== e.slug);
    const mods = e.grupos.map(([t, l]) => [t, l.map(modelo)]);
    const temLd = mods.some(([, l]) => l.some(m => m.ld));
    const usado = C.aplicacoes.filter(a => a.extrusora === e.slug);
    return `
<main id="conteudo">
<section class="eq-hero"><div class="in eqh-g">
  <div class="eqh-txt">
    ${migalha([['Equipamentos', L('equipamentos')], [e.curto]])}
    ${rot(e.serie)}
    <h1>${e.nome}</h1>
    <p>${e.resumo}</p>
    ${fichas(e, 'fichas fichas-g')}
    <div class="apl-bts"><a class="btn" href="${zapHref}" target="_blank" rel="noopener">Solicitar orçamento ${ico('seta')}</a><a class="btn btn-vazado" href="${L('contato')}">Falar com vendas</a></div>
  </div>
  <div class="eqh-foto">${img(e.img, e.nome, 'loading="eager"')}</div>
</div></section>
<section class="sec"><div class="in det-g${lf ? ' det-lf' : ''}">
  <div class="det-txt">
    ${rot(e.textoTitulo)}
    ${e.texto.map(p => `<p>${p}</p>`).join('')}
    ${e.lista.length ? `<h3>${e.listaTitulo}</h3><ul class="${e.chips ? 'chips' : 'checks'}">${e.lista.map(x => `<li>${e.chips ? '' : ico('check')}${x}</li>`).join('')}</ul>` : ''}
    ${usado.length ? `<h3>Usada nas linhas de</h3><ul class="chips">${usado.map(a => `<li><a href="${L('equipamentos')}#aplicacoes">${a.nome}</a></li>`).join('')}</ul>` : ''}
  </div>
  ${mods.length ? `<div class="det-mod">${mods.map(([t, l]) => `<div class="serie-tab"><h3>${t}</h3><table><thead><tr><th>Modelo</th><th>${l[0].d ? 'Ø rosca' : ''}</th>${temLd ? '<th>L/D</th>' : ''}</tr></thead><tbody>${l.map(m => `<tr><td>${m.mod}</td><td>${m.d ? m.d + ' mm' : ''}</td>${temLd ? `<td>${m.ld || '—'}</td>` : ''}</tr>`).join('')}</tbody></table></div>`).join('')}</div>` : ''}
</div></section>
${e.galeria.length ? `<section class="sec gal-sec"><div class="in">${h2('Fotos', '', e.serie)}<div class="det-gal n${e.galeria.length}">${e.galeria.map(([f, t]) => `<button class="gal-it" data-zoom="/assets/img/${f}.webp" data-legenda="${esc(t)}">${img(f, t)}<span>${t}</span></button>`).join('')}</div></div></section>` : ''}
${lf ? `<section class="sec lf-sec"><div class="in">
  ${h2('Os equipamentos da linha de frente', 'Cada linha é montada conforme o produto a ser extrudado.', '11 equipamentos')}
  <div class="lf-g">${C.linhaFrente.map(([f, t, d], i) => `<button class="lf-it" data-zoom="/assets/img/${f}.webp" data-legenda="${esc(t)}"><span class="lf-foto">${img(f, t)}</span>${rot(dois(i + 1))}<b>${t}</b><small>${d}</small></button>`).join('')}
    <a class="lf-cta" href="${zapHref}" target="_blank" rel="noopener"><b>Monte a sua linha</b><small>Diga o produto que você quer extrudar e indicamos a extrusora e a linha de frente.</small><em>${ico('whats')}Falar com vendas</em></a></div>
</div></section>` : ''}
${e.anuncios ? `<section class="sec anuncios"><div class="in an-g">${e.anuncios.map(([f, t]) => `<button class="gal-it" data-zoom="/assets/img/${f}.webp" data-legenda="${esc(t)}">${img(f, t)}</button>`).join('')}</div></section>` : ''}
<section class="sec outros"><div class="in">
  ${h2('Outros equipamentos', '', 'Catálogo')}
  <div class="outros-g">${outros.map(x => `<a href="${LE(x.slug)}"><span>${img(x.img, x.nome)}</span><b>${x.nome}</b></a>`).join('')}</div>
</div></section>
${contatoSec()}
</main>`;
  };
  for (const e of C.equipamentos) P[e.slug] = pagEq(e);

  P['pecas-de-reposicao'] = () => `
<main id="conteudo">
${titulo('Peças de reposição originais', [['Peças de reposição']], 'As especificações do projeto original, que só o fabricante pode oferecer, com o menor custo praticado.', 'pecas-slide')}
<section class="sec"><div class="in pc-g">
  <div class="pc-txt">
    ${h2('Comunicado aos clientes', '', 'Prezados clientes')}
    ${C.pecas.intro.map(p => `<p>${p}</p>`).join('')}
    <div class="apl-bts">${zap('Consultar peça no WhatsApp')}<a class="btn btn-vazado" href="mailto:${site.email}?subject=Pe%C3%A7as%20de%20reposi%C3%A7%C3%A3o">${ico('mail')}Enviar por e-mail</a></div>
  </div>
  <aside class="pc-consulte">
    ${rot('Consulte-nos para o fornecimento de')}
    <ul class="checks">${C.pecas.consulte.map(x => `<li>${ico('check')}${x}</li>`).join('')}</ul>
    <p>${C.pecas.outros}</p>
  </aside>
</div></section>
<section class="sec pc-fotos"><div class="in">
  ${h2('Algumas peças que fornecemos', '', 'Galeria')}
  <div class="pc-gal">${C.pecas.fotos.map(([f, t]) => `<button class="gal-it" data-zoom="/assets/img/${f}.webp" data-legenda="${esc(t)}">${img(f, t)}<span>${t}</span></button>`).join('')}</div>
</div></section>
<section class="sec aviso"><div class="in"><div class="aviso-box">${ico('alerta')}<div><h2>Aviso importante</h2><p>${C.pecas.aviso}</p></div></div></div></section>
${contatoSec()}
</main>`;

  P.videos = () => `
<main id="conteudo">
${titulo('Linhas em operação', [['Vídeos']], 'Assista às extrusoras e linhas completas da Extrusão Brasil funcionando, da extrusão ao corte.')}
<section class="sec"><div class="in">
  <div class="vd-lista">${C.videos.map((x, i) => `
    <article class="vd-item" id="${x[0]}">
      ${videoCard(x, false)}
      <div>${rot(dois(i + 1))}<h2>${x[1]}</h2>${x[3].length ? `<h3>Conjunto composto de</h3><ol>${x[3].map(it => `<li>${it}</li>`).join('')}</ol>` : '<p>Conjunto de extrusão para perfis de coletor solar em operação.</p>'}</div>
    </article>`).join('')}
  </div>
</div></section>
${contatoSec()}
</main>`;

  P['feiras-e-eventos'] = () => `
<main id="conteudo">
${titulo('Feiras e eventos', [['Feiras e Eventos']], C.feiras.texto)}
<section class="sec"><div class="in">
  <nav class="fe-anos">${C.feiras.lista.map(f => `<a href="#${f[0]}-${f[1]}">${f[2]}</a>`).join('')}</nav>
  ${C.feiras.lista.map(f => `
  <section class="feira" id="${f[0]}-${f[1]}">
    <header>${rot(f[3])}<h2>${f[2]}</h2></header>
    <div class="fe-gal">${Array.from({ length: 26 }, (_, n) => n + 1).filter(n => FEIRAS.has(`${f[0]}-${f[1]}-${dois(n)}`)).map(n => `<button class="gal-it" data-zoom="${feiraFoto(f, n)}" data-legenda="${esc(f[2])}"><img src="${feiraFoto(f, n)}" alt="Extrusão Brasil na ${f[2]}" loading="lazy" decoding="async"></button>`).join('')}</div>
  </section>`).join('')}
</div></section>
${contatoSec()}
</main>`;

  P.financiamentos = () => `
<main id="conteudo">
${titulo('Como financiar a sua linha', [['Financiamentos']], C.financiamentos.intro)}
<section class="sec"><div class="in">
  <div class="fin-g">${C.financiamentos.itens.map(([f, t, d], i) => `
    <article class="fin-it fin-${i}"><span class="fin-logo"><img src="/assets/img/${f}.webp" alt="${esc(t)}"></span><h2>${t}</h2><p>${d}</p>${i === 3 ? `<h3>Pode ser solicitado nos agentes financeiros:</h3><ul class="checks">${C.financiamentos.proger.map(b => `<li>${ico('banco')}${b}</li>`).join('')}</ul>` : ''}</article>`).join('')}
  </div>
</div></section>
${contatoSec()}
</main>`;

  P.contato = () => `
<main id="conteudo">
${titulo('Fale com a Extrusão Brasil', [['Contato']], 'Orçamentos de extrusoras, linhas completas e peças de reposição.')}
<section class="sec"><div class="in ct-g">
  <div class="ct-info">
    ${h2('Encontre-nos', '', 'Diadema, SP')}
    <ul class="ct-lista">
      <li>${ico('pin')}<span><b>Endereço</b>${site.endereco}<a href="${site.mapaLink}" target="_blank" rel="noopener">Abrir no mapa ${ico('externo')}</a></span></li>
      <li>${ico('fone')}<span><b>Telefones</b><a href="${site.foneHref}">${site.fone}</a> · ${site.fonesExtra.join(' · ')}</span></li>
      <li>${ico('whats')}<span><b>WhatsApp</b><a href="${zapHref}" target="_blank" rel="noopener">${site.whats}</a></span></li>
      <li>${ico('mail')}<span><b>E-mail</b><a href="mailto:${site.email}">${site.email}</a></span></li>
    </ul>
  </div>
  <div class="ct-form">${h2('Envie a sua necessidade', C.contato, 'Orçamento')}${form()}</div>
</div></section>
<section class="mapa"><iframe title="Mapa: ${esc(site.endereco)}" src="${site.mapa}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>
</main>`;

  const paginas = {};
  for (const slug of Object.keys(P)) {
    const chave = EQ[slug] ? `equipamentos/${slug}` : slug;
    paginas[chave] = head(slug) + header(slug) + P[slug]() + footer;
  }
  return paginas;
}
