// Gera as páginas da Overtus por segmento, cada uma em duas versões (A "Editorial" e B "Marinho"):
//   clientes/construtoras/public/  -> construtoras.overtus.com.br (construtoras e incorporadoras)
//   clientes/industrias/public/    -> industrias.overtus.com.br (indústrias)
// O visual é o do site da agência (clientes/agencia): base.css, a.css, b.css, fontes e imagens são copiados de lá a cada geração,
// e seg.css / seg.js (nesta pasta) acrescentam as peças próprias dos segmentos.
// Rodar depois de mudar qualquer texto: node clientes/construtoras/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import construtoras from './conteudo-construtoras.mjs';
import industrias from './conteudo-industrias.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const clientes = path.join(aqui, '../..');
const agencia = path.join(clientes, 'agencia/public/assets');
const SEGMENTOS = [construtoras, industrias];
const AGENCIA = 'https://agencia.overtus.com.br';
const AGENDA = 'https://cal.com/overtus';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const num = i => String(i + 1).padStart(2, '0');

const ICONES = {
  sites: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 8h18M8 21h8M12 17v4"/>',
  lancamentos: '<path d="M4 20V10l8-6 8 6v10"/><path d="M9 20v-6h6v6M12 4V1"/>',
  vendas: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h3v3H8zM13 7h3v3h-3zM8 12h3v3H8zM13 12h3v3h-3z"/>',
  comercial: '<path d="M3 4h18l-7 8v6l-4 2v-8z"/>',
  catalogo: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4z"/><path d="M16.5 14v6M13.5 17h6"/>',
  representantes: '<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20c.6-3.4 2.8-5.5 5.5-5.5s4.9 2.1 5.5 5.5M14 15.2c.9-.5 1.9-.7 3-.7 2.3 0 4 1.6 4.5 4.5"/>',
};
const icone = slug => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[slug] || ICONES.sites}</svg>`;
const seta = '<svg class="seta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>';
const alerta = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 8v5M12 16.5v.5"/><circle cx="12" cy="12" r="9"/></svg>';
const marcaHTML = seg => `<span class="logo-o" aria-hidden="true">O<i></i></span><span class="logo-t">Overtus</span><span class="seg-tag">${seg.curto}</span>`;
const agendar = (txt = 'Agendar conversa', cls = 'btn btn-prim') => `<a class="${cls}" href="${AGENDA}" data-agendar>${txt}</a>`;
const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;
const tela = (nome, alt, endereco = '', attrs = '') => `<figure class="tela"><div class="tela-barra"><i></i><i></i><i></i>${endereco ? `<span>${endereco}</span>` : ''}</div>${img(nome, alt, attrs)}</figure>`;

// Tabela de disponibilidade fictícia (demonstração): 12 andares, 4 finais. Status estável entre gerações.
const ANDARES = 12, FINAIS = 4;
const TIPOS = { 1: ['3 dormitórios, 1 suíte', '92 m²'], 2: ['2 dormitórios', '68 m²'], 3: ['2 dormitórios', '68 m²'], 4: ['3 dormitórios, 1 suíte', '92 m²'] };
function statusUnidade(andar, final) {
  const h = (andar * 37 + final * 61 + andar * final * 11) % 20;
  if (andar <= 3) return h < 15 ? 'vendido' : h < 17 ? 'reservado' : 'disponivel';
  if (andar >= 10) return h < 6 ? 'vendido' : h < 8 ? 'reservado' : 'disponivel';
  return h < 9 ? 'vendido' : h < 12 ? 'reservado' : 'disponivel';
}
const NOME_STATUS = { disponivel: 'Disponível', reservado: 'Reservado', vendido: 'Vendido' };
const unidades = [];
for (let a = ANDARES; a >= 1; a--) for (let f = 1; f <= FINAIS; f++) unidades.push({ a, f, n: `${a}0${f}`, s: statusUnidade(a, f), t: TIPOS[f] });
const contagem = s => unidades.filter(u => u.s === s).length;

// Fachada pequena (abertura da versão A de construtoras): o mesmo espelho, só em cores.
const fachada = () => `<div class="hero-mock" aria-hidden="true">
  <figure class="tela mock-tela"><div class="tela-barra"><i></i><i></i><i></i><span>Tabela de disponibilidade · Torre A</span></div>
    <div class="fachada">
      <div class="fachada-topo"></div>
      <div class="fachada-grade">${unidades.map(u => `<i class="u-${u.s}"></i>`).join('')}</div>
      <div class="fachada-base"></div>
    </div>
    <div class="mock-leg"><span class="lg-disponivel">Disponível</span><span class="lg-reservado">Reservado</span><span class="lg-vendido">Vendido</span></div>
  </figure>
  <div class="flutua flutua-1"><b>Novo contato</b><span>Página do empreendimento · WhatsApp</span></div>
  <div class="flutua flutua-2"><b>Reserva aprovada</b><span>Unidade 704 · Torre A</span></div>
</div>`;

// Demonstração interativa do espelho de vendas.
const espelho = seg => `<div class="espelho" data-espelho>
  <div class="esp-torre">
    <div class="esp-cab"><b>Torre A</b><span>${ANDARES} andares · ${FINAIS} unidades por andar</span></div>
    <div class="esp-leg">
      <span class="lg-disponivel">Disponível <b data-conta="disponivel">${contagem('disponivel')}</b></span>
      <span class="lg-reservado">Reservado <b data-conta="reservado">${contagem('reservado')}</b></span>
      <span class="lg-vendido">Vendido <b data-conta="vendido">${contagem('vendido')}</b></span>
    </div>
    <div class="esp-grade" role="grid" aria-label="Unidades da Torre A">${Array.from({ length: ANDARES }, (_, i) => ANDARES - i).map(a => `<div class="esp-andar" role="row"><span class="esp-n">${a}º</span>${unidades.filter(u => u.a === a).map(u => `<button type="button" role="gridcell" class="esp-u u-${u.s}" data-n="${u.n}" data-s="${u.s}" data-t="${esc(u.t[0])}" data-m="${u.t[1]}" aria-label="Unidade ${u.n}, ${NOME_STATUS[u.s]}">${u.n}</button>`).join('')}</div>`).join('')}</div>
  </div>
  <aside class="esp-painel" aria-live="polite">
    <span class="rotulo">Unidade</span>
    <p class="esp-num" data-campo="n">704</p>
    <span class="esp-status" data-campo="s">Disponível</span>
    <dl>
      <div><dt>Tipologia</dt><dd data-campo="t">2 dormitórios</dd></div>
      <div><dt>Área privativa</dt><dd data-campo="m">68 m²</dd></div>
      <div><dt>Posição</dt><dd data-campo="p">Final 04, 7º andar</dd></div>
    </dl>
    <button type="button" class="btn btn-prim" data-reservar>Reservar unidade</button>
    <p class="esp-msg" data-msg></p>
    <p class="esp-aviso">${seg.demo.aviso}</p>
  </aside>
</div>`;

function documento(seg, { v, slug, corpo }) {
  const [titulo, desc] = seg.paginas[slug];
  const url = `${seg.dominio}/${v}/${slug === 'index' ? '' : slug + '/'}`;
  const og = `${seg.dominio}/assets/og-${v}.jpg`;
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
<meta property="og:site_name" content="Overtus">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${og}">
<meta name="theme-color" content="#182644">
<link rel="icon" href="/assets/img/favicon-48.png">
<link rel="apple-touch-icon" href="/assets/img/icone-apple-180.png">
<link rel="preload" href="/assets/fontes/general-sans-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fontes/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<link rel="stylesheet" href="/assets/seg.css">
</head>
<body class="v-${v} p-${slug.split('/')[0]} s-${seg.slug}" data-cal="overtus">
${corpo}
<script src="/assets/site.js" defer></script>
<script src="/assets/seg.js" defer></script>
</body>
</html>
`;
}

function gerarVersao(seg, v) {
  const L = s => `/${v}/${s === 'index' ? '' : s + '/'}`;
  const outro = SEGMENTOS.find(o => o !== seg);
  const { grupos } = seg;

  const topo = slug => `<header class="topo">
  <div class="in">
    <a class="marca" href="${L('index')}" aria-label="Overtus para ${seg.segmento.toLowerCase()}, início">${marcaHTML(seg)}</a>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
    <nav id="nav">${seg.menu.map(([s, t]) => `<a href="${L(s)}"${slug === s || slug.startsWith(s + '/') ? ' aria-current="page"' : ''}>${t}</a>`).join('')}
      ${agendar('Agendar conversa', 'btn btn-prim nav-cta')}</nav>
  </div>
</header>`;

  const rodape = () => `<footer class="rodape">
  <div class="in">
    <div class="r-marca"><a class="marca" href="${L('index')}">${marcaHTML(seg)}</a><p>Estrutura comercial para quem vende de verdade.</p><p class="r-2">${seg.hero.lead}</p></div>
    <div><h3>Soluções</h3><ul>${grupos.map(g => `<li><a href="${L('solucoes/' + g.slug)}">${g.nome}</a></li>`).join('')}</ul></div>
    <div><h3>${seg.segmento}</h3><ul>${seg.menu.filter(([s]) => s !== 'solucoes').map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}</ul></div>
    <div><h3>Overtus</h3><ul><li><a href="${AGENCIA}/${v}/">Início da Overtus</a></li><li><a href="${outro.dominio}/${v}/">Overtus para ${outro.segmento.toLowerCase()}</a></li><li><a href="${AGENDA}" data-agendar>Agendar conversa</a></li></ul></div>
  </div>
  <div class="in r-base"><span>© ${new Date().getFullYear()} Overtus</span><span>Especialistas em ${seg.segmento.toLowerCase()}</span></div>
</footer>`;

  const cabeca = (rotulo, titulo, lead, trilha = []) => `<section class="cabeca">
  <div class="in">
    <nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${trilha.map(([s, t]) => (s ? `<a href="${L(s)}">${t}</a>` : `<span>${t}</span>`)).join('')}</nav>
    <span class="rotulo">${rotulo}</span>
    <h1>${titulo}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>
</section>`;

  const cta = () => `<section class="cta">
  <div class="in">
    <img class="cta-forma" src="/assets/img/forma.webp" alt="" loading="lazy" width="800" height="800">
    <div class="cta-txt"><span class="rotulo">Overtus para ${seg.segmento.toLowerCase()}</span><h2>${seg.chamada.titulo}</h2><p>${seg.chamada.texto}</p>
    <div class="acoes">${agendar()}<a class="btn btn-sec" href="${L('solucoes')}">Ver as soluções</a></div><p class="nota">${seg.chamada.nota}</p></div>
  </div>
</section>`;

  const dores = (cls = 'secao') => `<section class="${cls} dores-sec">
  <div class="in dores">
    <div class="dores-cab"><span class="rotulo">${seg.dores.rotulo}</span><h2>${seg.dores.titulo}</h2></div>
    <ul class="dores-lista">${seg.dores.itens.map(([t, d]) => `<li>${alerta}<div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ul>
  </div>
</section>`;

  const dif = () => `<section class="dif">
  <div class="in">
    <div class="dif-txt"><span class="rotulo">${seg.diferencial.rotulo}</span><h2>${seg.diferencial.titulo}</h2><p class="lead">${seg.diferencial.texto}</p>
    <a class="link" href="${L('como-trabalhamos')}">Como trabalhamos ${seta}</a></div>
    <ol class="dif-passos">${seg.diferencial.pontos.map(([t, d], i) => `<li><span class="n">${num(i)}</span><b>${t}</b><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>`;

  // Jornada: um prédio que sobe a cada fase (faixa escura nas duas versões).
  const predio = () => `<ol class="predio">${seg.jornada.fases.map(([t, d, ch], i) => `<li style="--andares:${i + 2}">
    <div class="pr-bloco" aria-hidden="true"><i></i></div>
    <div class="pr-txt"><span class="n">${num(i)}</span><h3>${t}</h3><p>${d}</p><ul>${ch.map(c => `<li>${c}</li>`).join('')}</ul></div>
  </li>`).join('')}</ol>`;
  const jornada = (link = true) => `<section class="jornada-sec">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">${seg.jornada.rotulo}</span><h2 class="h-secao">${seg.jornada.titulo}</h2></div>${link ? `<a class="link" href="${L('jornada')}">Ver cada fase ${seta}</a>` : ''}</div>
    ${predio()}
  </div>
</section>`;

  const demo = cls => (seg.demo ? `<section class="${cls} demo-sec" id="demonstracao">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">${seg.demo.rotulo}</span><h2 class="h-secao">${seg.demo.titulo}</h2></div><p class="lead">${seg.demo.lead}</p></div>
    ${espelho(seg)}
  </div>
</section>` : '');

  const projetos = cls => (seg.projetos ? `<section class="${cls}">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Portfólio</span><h2 class="h-secao">Projetos desenvolvidos</h2></div><a class="link" href="${AGENCIA}/${v}/projetos/">Todos os projetos ${seta}</a></div>
    <div class="projs">${seg.projetos.map(([im, s, d]) => `<article class="proj">${tela(im, `Página inicial do projeto para ${s.toLowerCase()}`)}<div class="proj-c"><span class="rotulo">${s}</span><p>${d}</p></div></article>`).join('')}</div>
    <p class="legenda">${seg.legendaProjetos}</p>
  </div>
</section>` : '');

  const paraQuem = cls => `<section class="${cls}">
  <div class="in">
    <span class="rotulo">${seg.paraQuem.rotulo}</span><h2 class="h-secao">${seg.paraQuem.titulo}</h2>
    <ul class="quem">${seg.paraQuem.itens.map(([t, d]) => `<li><b>${t}</b><p>${d}</p></li>`).join('')}</ul>
  </div>
</section>`;

  const faqLista = (lista = seg.faq) => `<div class="faq">${lista.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}<span aria-hidden="true"></span></summary><p>${a}</p></details>`).join('')}</div>`;
  const faq = (cls, curto = true) => `<section class="${cls}">
  <div class="in duas faq-duas">
    <div><span class="rotulo">Perguntas frequentes</span><h2>O que as ${seg.slug === 'construtoras' ? 'construtoras' : 'indústrias'} costumam perguntar.</h2>${curto ? `<a class="link" href="${L('perguntas')}">Todas as perguntas ${seta}</a>` : ''}</div>
    ${faqLista(curto ? seg.faq.slice(0, 3) : seg.faq)}
  </div>
</section>`;

  // Depois da jornada (escura), as seções alternam clara e alternativa até a chamada final.
  const restantes = () => [seg.demo && demo, seg.projetos && projetos, paraQuem, c => faq(c)]
    .filter(Boolean).map((f, i) => f(i % 2 ? 'secao secao-alt' : 'secao')).join('\n');

  const P = {};

  // ---------- Soluções (visão geral) ----------
  P.solucoes = `${cabeca('Soluções', `Do primeiro contato à ${seg.slug === 'construtoras' ? 'entrega das chaves' : 'recompra'}, com a mesma equipe.`, `Quatro frentes que funcionam juntas, pensadas para a forma como ${seg.slug === 'construtoras' ? 'construtoras e incorporadoras vendem' : 'as indústrias vendem'}.`, [[null, 'Soluções']])}
<section class="secao">
  <div class="in">
    <div class="grupos">${grupos.map((g, i) => `<a class="grupo" href="${L('solucoes/' + g.slug)}">
      <div class="grupo-cab">${icone(g.slug)}<span class="n">${num(i)}</span></div>
      <h2>${g.nome}</h2><p>${g.resumo}</p>
      <ul>${g.itens.map(([t]) => `<li>${check}${t}</li>`).join('')}</ul>
      <b class="mais">Conhecer ${seta}</b>
    </a>`).join('')}</div>
  </div>
</section>
${jornada()}
${faq('secao')}
${cta()}`;

  // ---------- Uma página por grupo ----------
  grupos.forEach(g => {
    const outros = grupos.filter(o => o.slug !== g.slug);
    // Faixa do meio: a demonstração (vendas), os projetos (sites de indústria) ou o "como começamos".
    const meio = g.slug === 'vendas' && seg.demo ? demo('secao secao-alt') : g.slug === 'sites' && seg.projetos ? projetos('secao secao-alt') : '';
    P['solucoes/' + g.slug] = `${cabeca(g.nome, g.titulo, g.lead, [['solucoes', 'Soluções'], [null, g.nome]])}
<section class="secao">
  <div class="in">
    <div class="itens">${g.itens.map(([t, d, inc], i) => `<article class="item">
      <div class="item-t"><span class="n">${num(i)}</span><h2>${t}</h2></div>
      <p>${d}</p>
      <ul>${inc.map(x => `<li>${check}${x}</li>`).join('')}</ul>
    </article>`).join('')}</div>
  </div>
</section>
${meio ? meio : dif()}
<section class="secao${!meio && v === 'b' ? ' secao-alt' : ''}">
  <div class="in">
    <span class="rotulo">Outras soluções</span>
    <div class="outros">${outros.map(o => `<a href="${L('solucoes/' + o.slug)}">${icone(o.slug)}<span><b>${o.nome}</b>${o.resumo}</span>${seta}</a>`).join('')}</div>
  </div>
</section>
${cta()}`;
  });

  // ---------- Jornada ----------
  P.jornada = `${cabeca(seg.jornada.rotulo, seg.jornada.titulo, seg.jornada.lead, [[null, seg.jornada.rotulo]])}
<section class="secao">
  <div class="in">
    <div class="fases">${seg.jornada.fases.map(([t, d, ch], i) => `<article class="fase">
      <span class="fase-n">${num(i)}</span>
      <div><h2>${t}</h2><p>${d}</p></div>
      <ul>${ch.map(c => `<li>${check}${c}</li>`).join('')}</ul>
    </article>`).join('')}</div>
  </div>
</section>
${jornada(false)}
${demo('secao')}
${cta()}`;

  // ---------- Como trabalhamos ----------
  P['como-trabalhamos'] = `${cabeca('Como trabalhamos', 'Primeiro o site pronto. Depois a conversa sobre o projeto.', seg.diferencial.texto, [[null, 'Como trabalhamos']])}
<section class="secao etapas-sec">
  <div class="in">
    <ol class="etapas etapas-det">${seg.etapas.map(([t, d, e], i) => `<li><span class="n">${num(i)}</span><div><h3>${t}</h3><p>${d}</p><p class="entrega"><b>O que você recebe</b>${e}</p></div></li>`).join('')}</ol>
  </div>
</section>
${paraQuem('secao secao-alt')}
${cta()}`;

  // ---------- Perguntas ----------
  P.perguntas = `${cabeca('Perguntas frequentes', `O que as ${seg.slug === 'construtoras' ? 'construtoras e incorporadoras' : 'indústrias'} costumam perguntar.`, '', [[null, 'Perguntas']])}
<section class="secao">
  <div class="in faq-larga">${faqLista()}</div>
</section>
${cta()}`;

  // ---------- Contato ----------
  P.contato = `${cabeca('Contato', 'Agende uma conversa.', seg.chamada.texto, [[null, 'Contato']])}
<section class="secao">
  <div class="in contato">
    <div class="agenda" id="agenda" data-agenda-inline><p>Carregando a agenda… Se ela não abrir, <a href="${AGENDA}" target="_blank" rel="noopener">agende pelo cal.com/overtus</a>.</p></div>
    <aside class="contato-lado">
      <h2>Na conversa</h2>
      <ol class="conversa">
        <li><b>Entendemos a empresa</b>${seg.slug === 'construtoras' ? 'Os empreendimentos em carteira, os canais de venda e como corretores e parceiros trabalham hoje.' : 'O que fabrica, para quem vende e como o comprador chega até vocês hoje.'}</li>
        <li><b>Olhamos o site atual</b>O que funciona, o que afasta o visitante e o que falta para ele entrar em contato.</li>
        <li><b>Combinamos a prévia</b>${seg.slug === 'construtoras' ? 'Se fizer sentido, escolhemos um empreendimento e montamos as duas versões para você ver no ar.' : 'Se fizer sentido, montamos as duas versões do novo site para você ver no ar.'}</li>
      </ol>
      <p class="nota">${seg.chamada.nota}</p>
      <a class="btn btn-sec" href="${AGENDA}" target="_blank" rel="noopener">Abrir a agenda em outra aba</a>
    </aside>
  </div>
</section>`;

  return { P, topo, rodape, cta, dores, dif, jornada, restantes, L };
}

// ---------- Início, versão A "Editorial" ----------
function inicioA(seg, k) {
  const { cta, dores, dif, jornada, restantes, L } = k;
  const visual = seg.slug === 'construtoras' ? fachada() : `<div class="hero-pilha" aria-hidden="true">
      ${seg.projetos.slice(0, 3).map(([im], i) => tela(im, '', '', i === 2 ? 'loading="eager" fetchpriority="high"' : 'loading="eager"')).join('\n      ')}
    </div>`;
  return `<section class="hero">
  <div class="in">
    <div class="hero-txt">
      <span class="rotulo">${seg.hero.rotulo}</span>
      <h1>${seg.hero.titulo}</h1>
      <p class="lead">${seg.hero.lead}</p>
      <div class="acoes">${agendar()}<a class="btn btn-sec" href="${L('solucoes')}">Ver as soluções</a></div>
    </div>
    ${visual}
  </div>
  <div class="in faixa">${seg.faixa.map(f => `<span>${f}</span>`).join('')}</div>
</section>
${dores()}
${dif()}
<section class="secao">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Soluções</span><h2 class="h-secao">Quatro frentes que funcionam juntas.</h2></div><a class="link" href="${L('solucoes')}">Todas as soluções ${seta}</a></div>
    <div class="linhas">${seg.grupos.map((g, i) => `<a class="linha" href="${L('solucoes/' + g.slug)}">
      <span class="n">${num(i)}</span><h3>${g.nome}</h3><p>${g.resumo}</p>${seta}
    </a>`).join('')}</div>
  </div>
</section>
${jornada()}
${restantes()}
${cta()}`;
}

// ---------- Início, versão B "Marinho" ----------
function inicioB(seg, k) {
  const { cta, dores, dif, jornada, restantes, L } = k;
  return `<section class="hero">
  <div class="brilho" aria-hidden="true"></div>
  <img class="hero-forma" src="/assets/img/forma.webp" alt="" width="800" height="800" fetchpriority="high">
  <div class="in">
    <div class="hero-txt">
      <span class="rotulo">${seg.hero.rotulo}</span>
      <h1>${seg.hero.tituloSimples}</h1>
      <p class="lead">${seg.hero.lead}</p>
      <div class="acoes">${agendar()}<a class="btn btn-sec" href="${L('solucoes')}">Ver as soluções</a></div>
    </div>
    <a class="hero-vidro" href="${L('como-trabalhamos')}">
      <span class="rotulo">${seg.diferencial.rotulo}</span>
      <p>${seg.hero.vidro}</p>
      <b>Como funciona ${seta}</b>
    </a>
  </div>
</section>
${dores()}
<section class="bento-sec">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Soluções</span><h2 class="h-secao">Quatro frentes que funcionam juntas.</h2></div><a class="link" href="${L('solucoes')}">Todas as soluções ${seta}</a></div>
    <div class="bento">${seg.grupos.map((g, i) => `<a class="bt bt-${i + 1}" href="${L('solucoes/' + g.slug)}">
      <div class="bt-cab">${icone(g.slug)}<span class="n">${num(i)}</span></div><h3>${g.nome}</h3><p>${g.resumo}</p>
      <ul>${g.itens.map(([t]) => `<li>${t}</li>`).join('')}</ul><b class="mais">Conhecer ${seta}</b>
    </a>`).join('')}</div>
  </div>
</section>
${dif()}
${jornada()}
${restantes()}
${cta()}`;
}

// Página de escolha entre as duas versões (raiz do endereço).
const escolha = seg => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(seg.meta)} · escolha a versão</title>
<meta name="description" content="Duas versões da página da Overtus para ${esc(seg.segmento.toLowerCase())}: Editorial (areia e marinho) e Marinho (no visual do Overtus Hub).">
<meta name="robots" content="noindex">
<link rel="canonical" href="${seg.dominio}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Overtus">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(seg.meta)} · escolha a versão">
<meta property="og:description" content="Duas versões para escolher: Editorial e Marinho.">
<meta property="og:url" content="${seg.dominio}/">
<meta property="og:image" content="${seg.dominio}/assets/og-b.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(seg.meta)} · escolha a versão">
<meta name="twitter:description" content="Duas versões para escolher: Editorial e Marinho.">
<meta name="twitter:image" content="${seg.dominio}/assets/og-b.jpg">
<link rel="icon" href="/assets/img/favicon-48.png">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/seg.css">
</head>
<body class="escolha">
<header><div class="in"><span class="marca">${marcaHTML(seg)}</span><small>${seg.segmento} · duas versões</small></div></header>
<main><div class="in">
  <a class="v" href="/a/"><img src="/assets/versao-a.jpg" alt="Página inicial da versão A">
    <div><span>Versão A</span><h2>Editorial</h2><p>Areia e marinho alternados, títulos grandes e laranja só como acento, como a versão A do site da Overtus.</p><b>Abrir a versão A →</b></div></a>
  <a class="v" href="/b/"><img src="/assets/versao-b.jpg" alt="Página inicial da versão B">
    <div><span>Versão B</span><h2>Marinho</h2><p>No visual do Overtus Hub: marinho com brilhos, a forma 3D na abertura e cartões de vidro, como a versão B do site da Overtus.</p><b>Abrir a versão B →</b></div></a>
</div></main>
</body>
</html>
`;

for (const seg of SEGMENTOS) {
  const pub = path.join(clientes, seg.slug, 'public');
  const assets = path.join(pub, 'assets');
  fs.mkdirSync(path.join(assets, 'img'), { recursive: true });
  // Visual da agência (copiado, nunca editado aqui) + peças dos segmentos.
  for (const f of ['base.css', 'a.css', 'b.css', 'site.js']) fs.copyFileSync(path.join(agencia, f), path.join(assets, f));
  fs.cpSync(path.join(agencia, 'fontes'), path.join(assets, 'fontes'), { recursive: true });
  const imgs = ['favicon-48.png', 'icone-apple-180.png', 'forma.webp', ...(seg.projetos || []).map(([im]) => `${im}.webp`)];
  for (const f of imgs) fs.copyFileSync(path.join(agencia, 'img', f), path.join(assets, 'img', f));
  for (const f of ['seg.css', 'seg.js']) fs.copyFileSync(path.join(aqui, f), path.join(assets, f));

  fs.writeFileSync(path.join(pub, 'index.html'), escolha(seg));
  for (const [v, inicio] of [['a', inicioA], ['b', inicioB]]) {
    const k = gerarVersao(seg, v);
    k.P.index = inicio(seg, k);
    fs.rmSync(path.join(pub, v), { recursive: true, force: true });
    for (const [slug, corpo] of Object.entries(k.P)) {
      const dir = path.join(pub, v, slug === 'index' ? '' : slug);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), documento(seg, { v, slug, corpo: `${k.topo(slug)}\n<main>\n${corpo}\n</main>\n${k.rodape()}` }));
    }
    console.log(`${seg.slug}: versão ${v.toUpperCase()}, ${Object.keys(k.P).length} páginas`);
  }
}
