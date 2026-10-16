// Páginas das duas versões do site da Fundição Bitencourt.
// A = "Tradição": a mesma ordem da home atual (frase do lema no topo, capa sobre a textura de cobre com o carrossel,
//     faixa de contato, quatro pilares, comprometimento, seis produtos, máxima efetividade, Brasil, diferenciais,
//     plantas e formulário no rodapé), cores do site atual: grafite, textura cobre e botões ouro.
// B = "Ligas e processos": capa escura com o cadinho, números da empresa, trilho dos cinco processos, vitrine de
//     produtos com filtro cobre/alumínio, o caminho "Como produzimos" em três etapas e a tabela das 16 ligas.
// As páginas internas (Empresa, Como produzimos, Produtos + 15 fichas, Ligas + 16 fichas, Contato) usam o mesmo
// conteúdo nas duas versões e mudam no visual (a.css / b.css).
import * as C from './conteudo.mjs';

const { site, produtos, ligas } = C;
export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const lazy = extra => /loading=|fetchpriority/.test(extra) ? '' : ' loading="lazy"';
const img = (n, alt = C.fotos[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}"${lazy(extra)} decoding="async"${extra ? ' ' + extra : ''}>`;
const pimg = (f, alt, extra = '') => `<img src="/assets/img/${f.replace(/\.png$/, '.webp')}" alt="${esc(alt)}"${lazy(extra)} decoding="async"${extra ? ' ' + extra : ''}>`;

const I = {
  capacete: '<path d="M3 17h18M5 17a7 7 0 0 1 14 0M12 6v4M9 7.5V11M15 7.5V11"/><path d="M3 17v2h18v-2"/>',
  certificado: '<rect x="4" y="3" width="13" height="17" rx="1.5"/><path d="M7.5 8h6M7.5 11.5h6"/><circle cx="17" cy="16" r="3"/><path d="m15.5 18.5-.8 3 2.3-1 2.3 1-.8-3"/>',
  reciclo: '<path d="M7 19H4.5a1.5 1.5 0 0 1-1.3-2.2L5.5 13M10 6.5l1-1.8a1.5 1.5 0 0 1 2.6 0l2.6 4.5M14 19h5.5a1.5 1.5 0 0 0 1.3-2.2L19 13.5"/><path d="m3 10 2.5 3 3-1.5M17.7 6.5l-1.5 2.7-3.2-.7M11 16l3 3-3 3"/>',
  aperto: '<path d="m11 17 2 2a1.4 1.4 0 0 0 2-2M14 14l2.5 2.5a1.4 1.4 0 0 0 2-2L15 11l-2.5-2.5a2 2 0 0 0-2.8 0L8.5 9.7a1.5 1.5 0 0 1-2-2.2L9.7 4.4a3 3 0 0 1 3.6-.4L16 5.6 21 5v8.5l-2 1"/><path d="M3 5l5 .6M3 13.5l5 5a1.4 1.4 0 0 0 2-2"/>',
  raio: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  gota: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  pessoas: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  livro: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/><path d="M8 7h8M8 10.5h6"/>',
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 7 8.5-7"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
  molde: '<path d="M3 9h18v10H3zM3 14h18"/><path d="M8 11.5h3v5H8zM14 6V3M10 6V3"/>',
  casca: '<path d="M5 18c0-6 3-12 7-12s7 6 7 12"/><path d="M8 18c0-4 1.8-8 4-8s4 4 4 8M3 18h18"/>',
  coquilha: '<path d="M4 6h7v13H4zM13 6h7v13h-7z"/><path d="M11 10h2M11 15h2M7.5 3v3M16.5 3v3"/>',
  centrifuga: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/><path d="M12 2.5A9.5 9.5 0 0 1 21.5 12"/><path d="m19.5 9.5 2 2.5 2-2.3"/>',
  semi: '<ellipse cx="12" cy="7" rx="8" ry="3"/><path d="M4 7v6c0 1.7 3.6 3 8 3s8-1.3 8-3V7M12 16v5M9 21h6"/>',
  lab: '<path d="M9 3h6M10 3v6l-5.5 9.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7.5 15h9"/>',
  forno: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 15c0-2 2-2.5 2-4.5 1.5 1 2 2.3 2 3.5.7-.5 1-1.2 1-2 1.3 1 1.5 2 1.5 3a4 4 0 0 1-6.5 0z"/><path d="M4 7h16"/>',
  cnc: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M7 20h10M12 16v4M7 8h4v4H7zM14 8h3M14 11h3"/>',
  caminhao: '<path d="M2 6h12v10H2zM14 9h4l3 3.5V16h-7"/><circle cx="6" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
  regua: '<path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
  liga: '<path d="M4 18h16l-2-8H6z"/><path d="M8 10V6h8v4M10 6V4h4v2"/>',
  alvo: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
};
const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

const MENU = [['index', 'Início'], ['empresa', 'Empresa'], ['como-produzimos', 'Como produzimos'], ['produtos', 'Produtos'], ['ligas', 'Ligas'], ['contato', 'Contato']];
const famNome = { cobre: 'Ligas de cobre', aluminio: 'Ligas de alumínio', ambos: 'Cobre ou alumínio' };
const ligaSlug = c => c.toLowerCase().replace('.', '-');
const ligaPor = Object.fromEntries(ligas.map(l => [l.slug, l]));
const prop = (l, nome) => (l.propriedades.flatMap(g => g.linhas).find(r => r[0] === nome) || [])[2] || '-';
const usaLiga = slug => produtos.filter(p => p.materiais.some(m => m.codigos.some(c => ligaSlug(c) === slug)));
const destaques = ['aneis-de-curto-circuito', 'coroas-de-bronze', 'conectores-e-terminais', 'rotores-para-bombas', 'polias-tipo-v', 'elementos-de-refrigeracao'];
const procDesc = {
  'Areia verde': 'Molde de areia compactada sobre o modelo: atende peças de geometria variada, de pequenas a grandes dimensões.',
  'Shell molding': 'Molde em casca de areia com resina: melhor acabamento superficial e precisão dimensional.',
  'Coquilhamento': 'Molde permanente metálico (coquilha): microestrutura compacta e repetibilidade em séries.',
  'Centrifugação': 'O metal é vazado em molde girando em alta rotação: peças cilíndricas densas, sem porosidade.',
  'Semicentrifugação': 'Centrifugação aplicada a peças de revolução com cubo ou detalhes internos.',
};

export function gerarVersao(v) {
  const A = v === 'a';
  const L = s => `/${v}/${s === 'index' ? '' : s + '/'}`;
  const menuDe = slug => slug.split('/')[0];

  const head = (slug, titulo, desc) => {
    const url = site.dominio + L(slug);
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
<meta property="og:site_name" content="Fundição Bitencourt">
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
<link rel="icon" href="/assets/marca.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Saira:ital,wdth,wght@0,100..125,500..800;1,100..125,600..800&family=${A ? 'Asap:wght@400;500;600;700' : 'Inter:wght@400;500;600;700'}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>`;
  };

  const nav = slug => MENU.map(([s, t]) => `<a href="${L(s)}"${menuDe(slug) === s ? ' aria-current="page"' : ''}>${t}</a>`).join('');
  const header = slug => `${A ? `<div class="faixa-lema"><div class="in"><span>${esc(C.lema)}</span><span class="fl-dir"><a href="${site.foneHref}">${ico('fone')}${site.fone}</a><a href="mailto:${site.email}">${ico('email')}${site.email}</a></span></div></div>` : ''}
<header class="topo"><div class="in">
  <a class="logo" href="${L('index')}" aria-label="Fundição Bitencourt, início"><img src="/assets/logo-claro.svg" alt="Fundição Bitencourt" width="200" height="42"></a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span><b class="sr">Menu</b></button>
  <nav id="menu" aria-label="Principal">${nav(slug)}<a class="btn btn-topo" href="${L('contato')}">Solicitar orçamento</a></nav>
</div></header>`;

  const footer = () => `<footer class="rodape">
<div class="in r-grade">
  <div class="r-marca"><img src="/assets/logo-claro.svg" alt="Fundição Bitencourt" width="210" height="44"><p>${esc(C.lema)}.</p>
    <p class="r-iso">${img('iso9000', 'Empresa certificada ISO 9000', 'width="56" height="54" loading="eager"')}<span>Empresa certificada ISO 9000</span></p></div>
  ${site.plantas.map(p => `<div><h3>${p.nome}</h3><p>${p.rua}<br>Bairro ${p.bairro}<br>${p.cidade}<br>CEP ${p.cep}</p></div>`).join('')}
  <div><h3>Contato</h3><p><a href="${site.foneHref}">${site.fone}</a><br><a href="mailto:${site.email}">${site.email}</a><br>${site.horario}</p>
    <p class="r-links">${MENU.slice(1).map(([s, t]) => `<a href="${L(s)}">${t}</a>`).join('')}</p></div>
</div>
<div class="in r-base"><span>© ${new Date().getFullYear()} Fundição Bitencourt · Criciúma / SC</span><span>Prévia do novo site</span></div>
</footer>
<script src="/assets/bitencourt.js" defer></script>
</body>
</html>`;

  const pagina = (slug, titulo, desc, corpo, cls = '') => `${head(slug, titulo, desc)}
<body class="v-${v} p-${slug.split('/')[0]}${cls ? ' ' + cls : ''}">
${header(slug)}
<main>
${corpo}
</main>
${footer()}`;

  const trilha = itens => `<nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${itens.map(([t, s]) => `<span>/</span>${s ? `<a href="${L(s)}">${esc(t)}</a>` : `<b>${esc(t)}</b>`}`).join('')}</nav>`;
  const capaInt = (itens, kicker, titulo, texto, foto) => `<section class="capa-int">
  ${foto ? `<div class="ci-foto">${img(foto, C.fotos[foto], 'fetchpriority="high"')}</div>` : ''}
  <div class="in">${trilha(itens)}<span class="kicker">${kicker}</span><h1>${titulo}</h1>${texto ? `<p>${texto}</p>` : ''}</div>
</section>`;

  const cta = (titulo = C.efetividade.titulo, texto = C.efetividade.texto) => `<section class="cta"><div class="in">
  <div><span class="kicker">Tire suas dúvidas</span><h2>${esc(titulo)}</h2><p>${esc(texto)}</p></div>
  <div class="cta-acoes"><a class="btn" href="${L('contato')}">Solicitar orçamento ${ico('seta')}</a><a class="btn btn-linha" href="${site.foneHref}">${ico('fone')}${site.fone}</a></div>
</div></section>`;

  const cardProduto = (p, i = 0) => `<a class="pc" href="${L('produtos/' + p.slug)}" data-familia="${p.familia}">
  <span class="pc-foto">${pimg(p.foto, p.nome)}</span>
  <span class="pc-txt"><span class="pc-fam">${famNome[p.familia]}</span><b>${esc(p.nome)}</b><span class="pc-mais">Saiba mais ${ico('seta')}</span></span>
</a>`;

  const filtro = () => `<div class="filtro" role="group" aria-label="Filtrar por família de liga">
  <button type="button" data-f="todos" aria-pressed="true">Todos</button><button type="button" data-f="cobre" aria-pressed="false">Ligas de cobre</button><button type="button" data-f="aluminio" aria-pressed="false">Ligas de alumínio</button>
</div>`;

  const caminho = () => `<div class="caminho">
  ${C.comoProduzimos.map(([t, itens], n) => `<div class="cm-etapa">
    <span class="cm-num">0${n + 1}</span><h3>${t}</h3>
    <ol>${itens.map(i => `<li><span></span>${i}</li>`).join('')}</ol>
  </div>`).join('')}
</div>
<p class="cm-frase">${C.comoFrase}</p>`;

  const trilhoProcessos = () => `<ol class="trilho">
  ${C.processos.map(([t, i], n) => `<li><span class="tr-ico">${ico(i)}</span><b>${t}</b><p>${procDesc[t]}</p></li>`).join('')}
</ol>`;

  const plantas = () => `<div class="plantas">${site.plantas.map(p => `<div class="planta">${ico('pin')}<div><h3>${p.nome}</h3><p>${p.rua}<br>Bairro ${p.bairro} · ${p.cidade}<br>CEP ${p.cep}</p></div></div>`).join('')}</div>`;

  const mapa = p => `<figure class="mapa"><iframe title="Mapa da ${p.nome}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${encodeURIComponent(p.mapa)}&z=15&output=embed"></iframe><figcaption><b>${p.nome}</b> · ${p.rua}, ${p.cidade}</figcaption></figure>`;

  const formulario = (assunto = '') => `<form class="form" data-email="${site.email}">
  <label><span>Seu nome</span><input name="nome" required autocomplete="name"></label>
  <label><span>Empresa</span><input name="empresa" autocomplete="organization"></label>
  <label><span>Seu e-mail</span><input name="email" type="email" required autocomplete="email"></label>
  <label><span>Telefone</span><input name="fone" type="tel" autocomplete="tel"></label>
  <label class="f-cheio"><span>Peça ou liga de interesse</span><input name="peca" value="${esc(assunto)}"></label>
  <label class="f-cheio"><span>Como podemos ajudar?</span><textarea name="msg" rows="4" placeholder="Aplicação, dimensões, quantidade, prazo..."></textarea></label>
  <button class="btn" type="submit">Enviar mensagem ${ico('seta')}</button>
  <p class="f-nota">O envio abre o seu programa de e-mail com a mensagem pronta para ${site.email}.</p>
</form>`;

  const tabelaLigas = (lista = ligas) => `<div class="tab-rolagem"><table class="tab-ligas">
  <thead><tr><th>Liga</th><th>UNS</th><th>SAE</th><th>EN</th><th class="num">Dureza (HB)</th><th class="num">Tração (MPa)</th><th>Aplicações principais</th></tr></thead>
  <tbody>${lista.map(l => `<tr data-familia="${l.familia}"><td><a href="${L('ligas/' + l.slug)}"><b>${l.codigo}</b><small>${famNome[l.familia]}</small></a></td><td>${esc(l.correlacao.UNS)}</td><td>${esc(l.correlacao.SAE)}</td><td>${esc(l.correlacao.EN)}</td><td class="num">${prop(l, 'Dureza')}</td><td class="num">${prop(l, 'Limite de Resistência à Tração')}</td><td>${esc(l.aplicacoes.slice(0, 2).join('; '))}</td></tr>`).join('')}</tbody>
</table></div><p class="nota">* nomenclatura antiga. Valores médios publicados pela Fundição Bitencourt.</p>`;

  // ---------- Início ----------
  const inicioA = () => `<section class="capa">
  <div class="capa-fundo"></div>
  <div class="in capa-grade">
    <div class="capa-txt">
      <span class="kicker">Fundição de não ferrosos · Criciúma / SC</span>
      <h1>Empenho com a qualidade e com o resultado</h1>
      <p class="capa-lead">${esc(C.chamada)}</p>
      <ul class="giro" aria-live="polite">${C.slides.map((s, n) => `<li${n ? '' : ' class="ativo"'}>${esc(s)}</li>`).join('')}</ul>
      <div class="capa-acoes"><a class="btn" href="${L('produtos')}">Ver todos os produtos ${ico('seta')}</a><a class="btn btn-linha" href="${L('empresa')}">Conheça a empresa</a></div>
    </div>
    <figure class="capa-foto">${img('galeria/vazamento', C.fotos['galeria/vazamento'], 'fetchpriority="high" loading="eager"')}<figcaption>${img('iso9000', 'ISO 9000', 'width="58" height="56"')}<span>Desde 1986<br><b>Certificação ISO 9000</b></span></figcaption></figure>
  </div>
  <div class="in contatos">
    <a href="${site.foneHref}">${ico('fone')}<span><small>Contato telefônico</small><b>${site.fone}</b></span></a>
    <div>${ico('relogio')}<span><small>Horário de funcionamento</small><b>${site.horario}</b></span></div>
    <a href="mailto:${site.email}">${ico('email')}<span><small>Contato eletrônico</small><b>${site.email}</b></span></a>
  </div>
</section>

<section class="pilares"><div class="in">
  ${C.pilares.map(([t, x, i], n) => `<article class="pilar"><span class="pl-ico">${ico(i)}</span><h2>${t}</h2><p>${x}</p></article>`).join('')}
</div></section>

<section class="excelencia"><div class="in ex-grade">
  <div class="ex-fotos">${img('galeria/usinagem-cobre')}${img('galeria/centrifuga')}</div>
  <div class="ex-txt"><span class="kicker">Fundição Bitencourt</span><h2>${C.excelencia.titulo}</h2><p>${C.excelencia.texto}</p>
    <ul class="lista-check">${C.processos.map(([t]) => `<li>${ico('check')}Fundição por ${t.toLowerCase()}</li>`).join('')}</ul>
    <a class="btn btn-escuro" href="${L('como-produzimos')}">Como produzimos ${ico('seta')}</a></div>
</div></section>

<section class="vitrine"><div class="in">
  <div class="sec-topo"><div><span class="kicker">Produtos</span><h2>Peças acabadas em cobre, bronze e alumínio</h2></div><a class="btn" href="${L('produtos')}">Ver todos os produtos ${ico('seta')}</a></div>
  <div class="grade-produtos">${destaques.map(s => cardProduto(produtos.find(p => p.slug === s))).join('')}</div>
</div></section>

${cta()}

<section class="brasil"><div class="in br-grade">
  <div><span class="kicker">Chegamos até você</span><h2>${C.chegamos.titulo}</h2><p>${C.chegamos.texto}</p>
    <ul class="chips">${C.chegamos.segmentos.map(s => `<li>${s}</li>`).join('')}</ul></div>
  <div class="br-img">${img('brasil', 'Mapa do Brasil com transporte aéreo, rodoviário e marítimo')}</div>
</div></section>

<section class="diferenciais"><div class="in df-grade">
  <div class="df-col"><h2>Diferenciais técnicos</h2>
    <div class="df-bloco">${ico('molde')}<div><h3>Dominamos vários processos de fundição</h3><p>Areia verde, shell molding, molde permanente (coquilhamento), centrifugação e semicentrifugação.</p></div></div>
    <div class="df-bloco">${ico('lab')}<div><h3>Serviços laboratoriais que atestam a qualidade</h3><p>${C.laboratorio.join('; ')}.</p></div></div>
    <div class="df-bloco">${ico('forno')}<div><h3>Máquinas e equipamentos modernos</h3><p>${C.equipamentos.join('; ')}.</p></div></div>
  </div>
  <div class="df-col"><h2>Diferenciais socioambientais</h2>
    <ul class="df-lista">${C.socioambientais.map(([t, x, i]) => `<li>${ico(i)}<span><b>${t}.</b> ${x}</span></li>`).join('')}</ul>
  </div>
</div></section>

<section class="onde"><div class="in">
  <div class="sec-topo"><div><span class="kicker">Onde estamos</span><h2>Criciúma, no sul de Santa Catarina</h2></div><a class="btn btn-escuro" href="${L('contato')}">Fale conosco ${ico('seta')}</a></div>
  <div class="onde-grade">${plantas()}${mapa(site.plantas[0])}</div>
</div></section>

<section class="form-sec"><div class="in fs-grade">
  <div><span class="kicker">Contato</span><h2>Como podemos ajudá-lo?</h2><p>Envie o desenho, a aplicação ou a liga da peça. Respondemos com o material indicado, o processo de fundição e o prazo.</p>
    <p class="fs-dados"><a href="${site.foneHref}">${ico('fone')}${site.fone}</a><a href="mailto:${site.email}">${ico('email')}${site.email}</a></p></div>
  ${formulario()}
</div></section>`;

  const inicioB = () => `<section class="capa">
  <div class="capa-foto">${img('cadinho', C.fotos.cadinho, 'fetchpriority="high" loading="eager"')}</div>
  <div class="in capa-txt">
    <span class="kicker">${esc(C.lema)}</span>
    <h1>Peças acabadas em ligas de <em>cobre</em> e <em>alumínio</em>.</h1>
    <p class="capa-lead">${esc(C.chamada)}</p>
    <div class="capa-acoes"><a class="btn" href="${L('produtos')}">Ver produtos ${ico('seta')}</a><a class="btn btn-linha" href="${L('ligas')}">Consultar as 16 ligas</a></div>
  </div>
  <div class="in numeros">
    <div><b>1986</b><span>fundada em Criciúma por Salvato Bitencourt Filho</span></div>
    <div><b>5</b><span>processos de fundição dominados</span></div>
    <div><b>16</b><span>ligas com ficha técnica completa</span></div>
    <div><b>1.200 mm</b><span>ou 600 kg nas peças de cobre</span></div>
    <div><b>ISO 9000</b><span>gestão da qualidade certificada</span></div>
  </div>
</section>

<section class="processos-sec"><div class="in">
  <div class="sec-topo"><div><span class="kicker">Processos</span><h2>Dominamos vários processos de fundição</h2></div><p>${esc(C.slides[0])}</p></div>
  ${trilhoProcessos()}
</div></section>

<section class="vitrine"><div class="in">
  <div class="sec-topo"><div><span class="kicker">Produtos</span><h2>O que produzimos</h2></div>${filtro()}</div>
  <div class="bento">${produtos.slice(0, 8).map(cardProduto).join('')}</div>
  <p class="centro"><a class="btn btn-escuro" href="${L('produtos')}">Ver as 15 linhas de produtos ${ico('seta')}</a></p>
</div></section>

<section class="como"><div class="in">
  <div class="sec-topo"><div><span class="kicker">Como produzimos</span><h2>Da sua necessidade à peça entregue</h2></div><p>${esc(C.efetividade.texto)}</p></div>
  ${caminho()}
</div></section>

<section class="ligas-sec"><div class="in">
  <div class="sec-topo"><div><span class="kicker">Ligas</span><h2>Composição química garantida e certificada</h2></div><p>Cada liga segue os padrões de referência AA, SAE, UNS, ASTM, EN e JIS. Abra a ficha para ver propriedades, composição e equivalências.</p></div>
  ${tabelaLigas(ligas.filter(l => ['fb-01', 'fb-20', 'fb-31', 'fb-53', 'fb-62', '356-0'].includes(l.slug)))}
  <p class="centro"><a class="btn" href="${L('ligas')}">Ver as 16 ligas ${ico('seta')}</a></p>
</div></section>

<section class="lab"><div class="in lab-grade">
  <div class="lab-fotos">${img('galeria/espectrometro')}${img('galeria/microscopio')}${img('galeria/condutivimetro')}</div>
  <div><span class="kicker">Laboratório</span><h2>Ensaios que atestam a nossa garantia</h2>
    <ul class="lista-check">${C.laboratorio.map(t => `<li>${ico('check')}${t}</li>`).join('')}</ul>
    <h3>Máquinas e equipamentos</h3><ul class="lista-check">${C.equipamentos.map(t => `<li>${ico('check')}${t}</li>`).join('')}</ul></div>
</div></section>

<section class="clientes-sec"><div class="in">
  <div class="sec-topo"><div><span class="kicker">Carteira de clientes</span><h2>Três décadas atendendo empresas de médio e grande porte</h2></div><p>${esc(C.chegamos.texto)}</p></div>
  <div class="cl-num">${C.clientes.numeros.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('')}</div>
</div></section>

<section class="socio"><div class="in">
  <div class="sec-topo"><div><span class="kicker">Responsabilidade</span><h2>Diferenciais socioambientais</h2></div></div>
  <div class="so-grade">${C.socioambientais.map(([t, x, i]) => `<div class="so">${ico(i)}<h3>${t}</h3><p>${x}</p></div>`).join('')}</div>
</div></section>

${cta()}`;

  // ---------- Empresa ----------
  const empresa = () => `${capaInt([['Empresa']], 'Quem somos nós', 'Fundição de não ferrosos desde 1986', esc(C.instalacoes), 'galeria/planta-fachada')}

<section class="sobre"><div class="in so-txt">
  <div>${C.quemSomos.map(p => `<p>${p}</p>`).join('')}</div>
  <aside class="normas"><h2>Normas de referência</h2><dl>${C.normas.map(([s, n]) => `<div><dt>${s}</dt><dd>${n}</dd></div>`).join('')}</dl></aside>
</div></section>

<section class="historia"><div class="in">
  <div class="sec-topo"><div><span class="kicker">Nossa história</span><h2>Mais de três décadas de fundição</h2></div></div>
  <ol class="linha-tempo">${C.historia.map(([a, t, x]) => `<li><span class="lt-ano">${a}</span><div><h3>${t}</h3><p>${x}</p></div></li>`).join('')}</ol>
</div></section>

<section class="politica"><div class="in po-grade">
  <div class="po-selo">${img('iso9000', 'Empresa certificada ISO 9000', 'width="130" height="124"')}</div>
  <div><span class="kicker">Política de qualidade</span><h2>Satisfação do cliente com qualidade diferenciada</h2><p>${C.politica.texto}</p>
    <ul class="lista-check">${C.politica.itens.map(t => `<li>${ico('check')}${t}</li>`).join('')}</ul></div>
</div></section>

<section class="instalacoes"><div class="in">
  <div class="sec-topo"><div><span class="kicker">Nossas instalações</span><h2>Planta moderna e flexível</h2></div><p>${C.instalacoes}</p></div>
  <div class="galeria">${C.galeriaOrdem.map(n => `<a class="g-item" href="/assets/img/galeria/${n}.webp" data-legenda="${esc(C.fotos['galeria/' + n])}">${img('galeria/' + n)}</a>`).join('')}</div>
</div></section>

<section class="clientes-sec"><div class="in">
  <div class="sec-topo"><div><span class="kicker">Carteira dos principais clientes</span><h2>Empresas de médio e grande porte</h2></div><p>${C.clientes.texto}</p></div>
  <div class="cl-num">${C.clientes.numeros.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('')}</div>
</div></section>

<section class="brasil"><div class="in br-grade">
  <div><span class="kicker">Chegamos até você</span><h2>${C.chegamos.titulo}</h2><p>${C.chegamos.texto}</p><ul class="chips">${C.chegamos.segmentos.map(s => `<li>${s}</li>`).join('')}</ul></div>
  <div class="br-img">${img('brasil', 'Mapa do Brasil com transporte aéreo, rodoviário e marítimo')}</div>
</div></section>
${cta()}`;

  // ---------- Como produzimos ----------
  const como = () => `${capaInt([['Como produzimos']], 'Como produzimos', 'Da sua necessidade à peça entregue', esc(C.efetividade.texto), 'galeria/fundicao-galpao')}

<section class="como"><div class="in">
  <div class="sec-topo"><div><span class="kicker">Nosso método</span><h2>Três etapas, um parceiro só</h2></div><p>Do material indicado ao ensaio final, cada peça segue o mesmo caminho dentro da Fundição Bitencourt.</p></div>
  ${caminho()}
</div></section>

<section class="processos-sec"><div class="in">
  <div class="sec-topo"><div><span class="kicker">Processos de fundição</span><h2>Dominamos vários processos</h2></div><p>${esc(C.slides[0])}</p></div>
  ${trilhoProcessos()}
  <div class="proc-fotos">${['molde-areia', 'coquilha', 'centrifuga', 'vazamento'].map(n => `<figure>${img('galeria/' + n)}<figcaption>${C.fotos['galeria/' + n]}</figcaption></figure>`).join('')}</div>
</div></section>

<section class="lab"><div class="in lab-grade">
  <div class="lab-fotos">${img('galeria/espectrometro')}${img('galeria/microscopio')}${img('galeria/condutivimetro')}</div>
  <div><span class="kicker">Laboratório</span><h2>Serviços laboratoriais que atestam a nossa garantia de qualidade</h2>
    <ul class="lista-check">${C.laboratorio.map(t => `<li>${ico('check')}${t}</li>`).join('')}</ul></div>
</div></section>

<section class="equip"><div class="in eq-grade">
  <div><span class="kicker">Usinagem e equipamentos</span><h2>${esc(C.slides[1])}</h2>
    <ul class="lista-check">${C.equipamentos.map(t => `<li>${ico('check')}${t}</li>`).join('')}<li>${ico('check')}Certificação ISO 9000, que atesta o nosso modelo de gestão da qualidade</li></ul></div>
  <div class="eq-fotos">${img('galeria/torno-cnc')}${img('galeria/usinagem-bronze')}</div>
</div></section>

<section class="socio"><div class="in">
  <div class="sec-topo"><div><span class="kicker">Responsabilidade</span><h2>Diferenciais socioambientais</h2></div><p>${C.pilares[2][1]}</p></div>
  <div class="so-grade">${C.socioambientais.map(([t, x, i]) => `<div class="so">${ico(i)}<h3>${t}</h3><p>${x}</p></div>`).join('')}</div>
</div></section>
${cta()}`;

  // ---------- Produtos ----------
  const listaProdutos = () => `${capaInt([['Produtos']], 'Produzimos', 'Peças acabadas em ligas de cobre e alumínio', 'Quinze linhas de peças, do anel de curto-circuito centrifugado à estátua de bronze, com material indicado e exemplos de aplicação.', null)}
<section class="vitrine catalogo"><div class="in">
  <div class="sec-topo"><div><h2>${produtos.length} linhas de produtos</h2></div>${filtro()}</div>
  <div class="grade-produtos">${produtos.map(cardProduto).join('')}</div>
</div></section>
${cta('Peça fora da lista?', 'Produzimos peças industriais especiais em qualquer liga de bronze ou de alumínio, a partir do seu desenho ou da sua amostra.')}`;

  const fichaProduto = p => {
    const n = produtos.indexOf(p);
    const fotos = [p.foto, ...p.exemplos];
    const relacionados = produtos.filter(q => q !== p && (q.familia === p.familia || p.familia === 'ambos')).slice(0, 3);
    return `<section class="ficha"><div class="in">
  ${trilha([['Produtos', 'produtos'], [p.curto]])}
  <div class="fi-grade">
    <div class="fi-galeria">
      <div class="fi-principal">${pimg(fotos[0], p.nome, 'fetchpriority="high" loading="eager"')}</div>
      ${fotos.length > 1 ? `<div class="fi-miniaturas">${fotos.map((f, k) => `<button type="button"${k ? '' : ' aria-current="true"'} data-src="/assets/img/${f.replace(/\.png$/, '.webp')}">${pimg(f, '')}</button>`).join('')}</div>` : ''}
    </div>
    <div class="fi-txt">
      <span class="kicker">${famNome[p.familia]}</span>
      <h1>${esc(p.nome)}</h1>
      <p>${esc(p.descricao)}</p>
      <dl class="specs">
        ${p.dimensoes ? `<div><dt>${ico('regua')}Dimensões</dt><dd>${esc(p.dimensoes)}</dd></div>` : ''}
        ${p.materiais.map(m => `<div><dt>${ico('liga')}${esc(m.rotulo)}</dt><dd>${m.codigos.map(c => ligaPor[ligaSlug(c)] ? `<a class="tag-liga" href="${L('ligas/' + ligaSlug(c))}">${c}</a>` : c).join(' ')}${m.equiv ? `<small>${esc(m.equiv)}</small>` : ''}</dd></div>`).join('')}
      </dl>
      <div class="fi-acoes"><a class="btn" href="${L('contato')}?peca=${encodeURIComponent(p.curto)}">Solicitar orçamento ${ico('seta')}</a><span class="fi-iso">${img('iso9000', 'ISO 9000', 'width="44" height="42"')}Composição química garantida e certificada</span></div>
    </div>
  </div>
  ${p.aplicacoes.length ? `<div class="aplicacoes"><h2>Exemplos de aplicação</h2><ul>${p.aplicacoes.map((a, k) => `<li>${p.exemplos[k] && p.slug !== 'bustos-e-estatuas' ? pimg(p.exemplos[k], a) : `<span class="ap-ico">${ico('alvo')}</span>`}<span>${esc(a)}</span></li>`).join('')}</ul></div>` : ''}
</div></section>
${relacionados.length ? `<section class="vitrine rel"><div class="in"><div class="sec-topo"><div><span class="kicker">Veja também</span><h2>Outros produtos</h2></div><a class="btn btn-escuro" href="${L('produtos')}">Todos os produtos ${ico('seta')}</a></div>
  <div class="grade-produtos g3">${relacionados.map(cardProduto).join('')}</div></div></section>` : ''}`;
  };

  // ---------- Ligas ----------
  const listaLigas = () => `${capaInt([['Ligas']], 'Materiais', 'Ligas de cobre e de alumínio', 'Ficha técnica das 16 ligas que a Fundição Bitencourt produz: propriedades físicas, mecânicas, elétricas e térmicas, composição química e correlação com as normas internacionais.', null)}
<section class="ligas-sec"><div class="in">
  <div class="sec-topo"><div><h2>Escolha a liga</h2></div>${filtro().replace('Todos', 'Todas')}</div>
  <div class="ligas-cards">${ligas.map(l => `<a class="lc" href="${L('ligas/' + l.slug)}" data-familia="${l.familia}"><span class="lc-cod">${l.codigo}</span><span class="lc-fam">${famNome[l.familia]} · UNS ${esc(l.correlacao.UNS)}</span><span class="lc-car">${esc(l.caracteristicas.slice(0, 2).join(' · '))}</span>
    <span class="lc-barras"><span><i style="--p:${Math.min(100, (parseFloat(prop(l, 'Dureza')) || 0) / 2.3)}%"></i>Dureza ${prop(l, 'Dureza')} HB</span><span><i style="--p:${Math.min(100, (parseFloat(prop(l, 'Limite de Resistência à Tração')) || 0) / 8.2)}%"></i>Tração ${prop(l, 'Limite de Resistência à Tração')} MPa</span></span></a>`).join('')}</div>
  <h2 class="sub">Comparativo</h2>
  ${tabelaLigas()}
</div></section>
<section class="sobre normas-sec"><div class="in"><aside class="normas"><h2>Normas de referência</h2><dl>${C.normas.map(([s, n]) => `<div><dt>${s}</dt><dd>${n}</dd></div>`).join('')}</dl></aside></div></section>
${cta('Não sabe qual liga indicar?', 'Nossa equipe define o material a partir da aplicação, das propriedades físicas, mecânicas e elétricas e das propriedades químicas que a peça precisa.')}`;

  const fichaLiga = l => {
    const prods = usaLiga(l.slug);
    const maxComp = Math.max(...l.composicao.map(r => parseFloat((r[3] !== '-' ? r[3] : r[2]).replace(',', '.')) || 0));
    return `<section class="ficha ficha-liga"><div class="in">
  ${trilha([['Ligas', 'ligas'], [l.codigo]])}
  <div class="fl-topo">
    <div><span class="kicker">${famNome[l.familia]}</span><h1>${l.codigo}</h1>
      <p class="fl-eq">${['UNS', 'SAE', 'ASTM', 'EN', 'JIS', 'AA'].filter(k => l.correlacao[k] && l.correlacao[k] !== '-').map(k => `<span><b>${k}</b>${esc(l.correlacao[k])}</span>`).join('')}</p></div>
    <a class="btn" href="${L('contato')}?peca=${encodeURIComponent('Liga ' + l.codigo)}">Consultar esta liga ${ico('seta')}</a>
  </div>
  <div class="fl-quatro">
    <div><h2>Características gerais</h2><ul class="lista-check">${l.caracteristicas.map(t => `<li>${ico('check')}${esc(t)}</li>`).join('')}</ul></div>
    <div><h2>Principais aplicações</h2><ul class="lista-check">${l.aplicacoes.map(t => `<li>${ico('check')}${esc(t)}</li>`).join('')}</ul></div>
    <div><h2>Processos de fundição indicados</h2><ul class="chips">${l.processos.map(t => `<li>${esc(t)}</li>`).join('')}</ul><h2>Tratamento térmico</h2><p>${esc(l.tratamento.join(' '))}</p></div>
  </div>
  <div class="fl-props">${l.propriedades.map(g => `<div><h2>Propriedades ${g.grupo.toLowerCase()}</h2><table><tbody>${g.linhas.map(r => `<tr><th>${esc(r[0])}<small>${esc(r[1])}</small></th><td>${esc(r[2])}</td></tr>`).join('')}</tbody></table></div>`).join('')}</div>
  <div class="fl-comp"><h2>Composição química</h2><p class="nota">Elementos com limite definido. Os demais não são especificados para esta liga.</p>
    <ul>${l.composicao.map(([nome, sim, mi, ma]) => { const a = parseFloat(mi.replace(',', '.')) || 0, b = parseFloat((ma !== '-' ? ma : mi).replace(',', '.')) || a; const base = sim === 'Cu' || sim === 'Al' ? 100 : maxComp > 20 ? 50 : Math.max(maxComp, 1); return `<li><span class="cp-el"><b>${sim}</b>${nome}</span><span class="cp-barra"><i style="--a:${(a / base * 100).toFixed(1)}%;--b:${Math.max(1.5, (b / base * 100)).toFixed(1)}%"></i></span><span class="cp-val">${mi === '-' ? 'até ' + ma : ma === '-' ? 'mín. ' + mi : mi + ' a ' + ma} %</span></li>`; }).join('')}</ul></div>
  ${prods.length ? `<div class="fl-prods"><h2>Produtos feitos com ${l.codigo}</h2><div class="grade-produtos g3">${prods.map(cardProduto).join('')}</div></div>` : ''}
  <p class="nota">* nomenclatura antiga. Valores médios publicados pela Fundição Bitencourt.</p>
</div></section>`;
  };

  // ---------- Contato ----------
  const contato = () => `${capaInt([['Contato']], 'Contato', 'Fale com a Fundição Bitencourt', 'Envie o desenho, a aplicação ou a liga da peça. Respondemos com o material indicado, o processo e o prazo.', null)}
<section class="contato-sec"><div class="in ct-grade">
  <div class="ct-dados">
    <a class="ct-item" href="${site.foneHref}">${ico('fone')}<span><small>Telefone</small><b>${site.fone}</b></span></a>
    <a class="ct-item" href="mailto:${site.email}">${ico('email')}<span><small>E-mail</small><b>${site.email}</b></span></a>
    <div class="ct-item">${ico('relogio')}<span><small>Horário</small><b>${site.horario}</b></span></div>
    ${plantas()}
  </div>
  <div class="ct-form"><h2>Envie sua mensagem</h2>${formulario()}</div>
</div></section>
<section class="mapas"><div class="in">${site.plantas.map(mapa).join('')}</div></section>`;

  const out = {
    index: pagina('index', 'Fundição Bitencourt · Fundição de não ferrosos em Criciúma (SC)', 'Peças acabadas em ligas de cobre e de alumínio por areia verde, shell molding, coquilhamento, centrifugação e semicentrifugação. Desde 1986, certificação ISO 9000.', A ? inicioA() : inicioB(), 'home'),
    empresa: pagina('empresa', 'Empresa · Fundição Bitencourt', 'Fundição de não ferrosos em Criciúma (SC) desde 1986: história, política de qualidade, instalações e carteira de clientes.', empresa()),
    'como-produzimos': pagina('como-produzimos', 'Como produzimos · Fundição Bitencourt', 'Processos de fundição em areia verde, shell molding, coquilhamento, centrifugação e semicentrifugação, laboratório, usinagem CNC e diferenciais socioambientais.', como()),
    produtos: pagina('produtos', 'Produtos · Fundição Bitencourt', 'Anéis de curto-circuito, coroas, buchas, rotores, hélices, polias e peças especiais em ligas de cobre e de alumínio.', listaProdutos()),
    ligas: pagina('ligas', 'Ligas de cobre e alumínio · Fundição Bitencourt', 'Fichas técnicas das 16 ligas: propriedades, composição química e correlação com AA, SAE, UNS, ASTM, EN e JIS.', listaLigas()),
    contato: pagina('contato', 'Contato · Fundição Bitencourt', `Telefone ${site.fone}, e-mail ${site.email}. Rua Otávio Fontana, 300, São Simão, Criciúma (SC).`, contato()),
  };
  for (const p of produtos) out['produtos/' + p.slug] = pagina('produtos/' + p.slug, `${p.nome} · Fundição Bitencourt`, p.descricao.slice(0, 155), fichaProduto(p));
  for (const l of ligas) out['ligas/' + l.slug] = pagina('ligas/' + l.slug, `Liga ${l.codigo} (${l.correlacao.UNS}) · Fundição Bitencourt`, `${famNome[l.familia]}: ${l.caracteristicas.slice(0, 3).join(', ')}. Propriedades, composição química e equivalências.`, fichaLiga(l));
  return out;
}
