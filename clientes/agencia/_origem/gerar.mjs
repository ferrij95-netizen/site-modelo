// Gera clientes/agencia/public/{a,b}/ (site da própria Overtus, duas versões).
// Rodar depois de mudar qualquer texto: node clientes/agencia/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { site, menu, grupos, diferencial, etapas, principios, projetos, legendaProjetos, segmentos, chamada, paginas } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const num = i => String(i + 1).padStart(2, '0');
const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;
const imgProjeto = p => p[4] || `p-${p[0]}`;

// Ícones de traço simples, um por grupo de serviço.
const ICONES = {
  sites: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 8h18M8 21h8M12 17v4"/>',
  marketing: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 12l7-7M16 5h3v3"/>',
  sistemas: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/>',
  comercial: '<path d="M3 4h18l-7 8v6l-4 2v-8z"/>',
};
const icone = slug => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[slug]}</svg>`;
const seta = '<svg class="seta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>';

// Moldura de navegador com o print de um projeto.
const tela = (nome, alt, endereco = '', attrs = '') => `<figure class="tela"><div class="tela-barra"><i></i><i></i><i></i>${endereco ? `<span>${endereco}</span>` : ''}</div>${img(nome, alt, attrs)}</figure>`;

const marca = `<span class="logo-o" aria-hidden="true">O<i></i></span><span class="logo-t">Overtus</span>`;
const agendar = (txt = 'Agendar conversa', cls = 'btn btn-prim') => `<a class="${cls}" href="${site.agenda}" data-agendar>${txt}</a>`;

function documento({ v, slug, corpo }) {
  const [titulo, desc] = paginas[slug];
  const url = `${site.dominio}/${v}/${slug === 'index' ? '' : slug + '/'}`;
  const og = `${site.dominio}/assets/og-${v}.jpg`;
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
</head>
<body class="v-${v} p-${slug.split('/')[0]}" data-cal="${site.calLink}">
${corpo}
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

function gerarVersao(v) {
  const L = s => `/${v}/${s === 'index' ? '' : s + '/'}`;

  const topo = slug => `<header class="topo">
  <div class="in">
    <a class="marca" href="${L('index')}" aria-label="Overtus, início">${marca}</a>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
    <nav id="nav">${menu.map(([s, t]) => `<a href="${L(s)}"${slug === s || slug.startsWith(s + '/') ? ' aria-current="page"' : ''}>${t}</a>`).join('')}
      ${agendar('Agendar conversa', 'btn btn-prim nav-cta')}</nav>
  </div>
</header>`;

  const rodape = () => `<footer class="rodape">
  <div class="in">
    <div class="r-marca"><a class="marca" href="${L('index')}">${marca}</a><p>${site.slogan}</p><p class="r-2">${site.linha2}</p></div>
    <div><h3>Serviços</h3><ul>${grupos.map(g => `<li><a href="${L('servicos/' + g.slug)}">${g.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Overtus</h3><ul>${menu.filter(([s]) => s !== 'servicos').map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}</ul></div>
    <div><h3>Conversar</h3><ul><li><a href="${site.agenda}" data-agendar>Agendar conversa</a></li><li><a href="${site.agenda}" target="_blank" rel="noopener">cal.com/overtus</a></li></ul></div>
  </div>
  <div class="in r-base"><span>© ${new Date().getFullYear()} Overtus</span><span>Sites, sistemas e estrutura comercial</span></div>
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
    <div class="cta-txt"><span class="rotulo">Overtus</span><h2>${chamada.titulo}</h2><p>${chamada.texto}</p>
    <div class="acoes">${agendar()}<a class="btn btn-sec" href="${L('projetos')}">Ver projetos</a></div><p class="nota">${chamada.nota}</p></div>
  </div>
</section>`;

  // Versões A e B lado a lado: o diferencial em imagem.
  const duasVersoes = (projeto = 'dht') => `<div class="ab">
  <div class="ab-v">${tela(`v-${projeto}-a`, 'Versão A de um projeto, em estilo claro', 'versão A')}<span class="ab-l"><b>A</b>Clara</span></div>
  <div class="ab-v">${tela(`v-${projeto}-b`, 'Versão B do mesmo projeto, em estilo escuro', 'versão B')}<span class="ab-l"><b>B</b>Escura</span></div>
</div>`;

  // Etapas: linha do tempo com marcadores (horizontal no computador, vertical no celular).
  const linhaEtapas = (detalhe = false) => `<ol class="etapas${detalhe ? ' etapas-det' : ''}">${etapas.map(([t, d, e], i) => `<li><span class="n">${num(i)}</span><div><h3>${t}</h3><p>${d}</p>${detalhe ? `<p class="entrega"><b>O que você recebe</b>${e}</p>` : ''}</div></li>`).join('')}</ol>`;

  const gradeProjetos = (lista = projetos) => `<div class="projs">${lista.map(p => `<article class="proj">
    ${tela(imgProjeto(p), `Página inicial do projeto para ${p[1].toLowerCase()}`)}
    <div class="proj-c"><span class="rotulo">${p[1]}</span><p>${p[2]}</p><ul class="tags">${p[3].map(t => `<li>${t}</li>`).join('')}</ul></div>
  </article>`).join('')}</div>`;

  const listaPrincipios = () => `<div class="princ">${principios.map(([t, d], i) => `<div class="pr"><span class="n">${num(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>`;

  const P = {};

  // ---------- Serviços (visão geral) ----------
  P.servicos = `${cabeca('Serviços', 'Do site à venda, com a mesma equipe.', 'Quatro frentes que funcionam juntas: o site apresenta a empresa, o marketing traz as visitas, os sistemas automatizam o atendimento e a estrutura comercial transforma contato em negócio.', [[null, 'Serviços']])}
<section class="secao">
  <div class="in">
    <div class="grupos">${grupos.map((g, i) => `<a class="grupo" href="${L('servicos/' + g.slug)}">
      <div class="grupo-cab">${icone(g.slug)}<span class="n">${num(i)}</span></div>
      <h2>${g.nome}</h2><p>${g.resumo}</p>
      <ul>${g.itens.map(([t]) => `<li>${check}${t}</li>`).join('')}</ul>
      <b class="mais">Conhecer ${g.nome.toLowerCase()} ${seta}</b>
    </a>`).join('')}</div>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in duas">
    <div><span class="rotulo">${diferencial.rotulo}</span><h2>${diferencial.titulo}</h2><p class="lead">${diferencial.texto}</p><a class="link" href="${L('como-trabalhamos')}">Como trabalhamos ${seta}</a></div>
    ${duasVersoes('instor')}
  </div>
</section>
${cta()}`;

  // ---------- Uma página por grupo ----------
  grupos.forEach((g, gi) => {
    const outros = grupos.filter(o => o.slug !== g.slug);
    P['servicos/' + g.slug] = `${cabeca(g.nome, g.titulo, g.lead, [['servicos', 'Serviços'], [null, g.nome]])}
<section class="secao">
  <div class="in">
    <div class="itens">${g.itens.map(([t, d, inc], i) => `<article class="item">
      <div class="item-t"><span class="n">${num(i)}</span><h2>${t}</h2></div>
      <p>${d}</p>
      <ul>${inc.map(x => `<li>${check}${x}</li>`).join('')}</ul>
    </article>`).join('')}</div>
  </div>
</section>
${g.slug === 'sites' ? `<section class="secao secao-alt">
  <div class="in duas">
    <div><span class="rotulo">${diferencial.rotulo}</span><h2>${diferencial.titulo}</h2><p class="lead">${diferencial.texto}</p></div>
    ${duasVersoes('engenho-am')}
  </div>
</section>` : `<section class="secao secao-alt">
  <div class="in duas">
    <div><span class="rotulo">Junto com o site</span><h2>${g.slug === 'comercial' ? 'Cada contato do site entra direto na rotina comercial.' : g.slug === 'sistemas' ? 'Sistemas no mesmo padrão visual do seu site.' : 'Visitas que chegam a um site preparado para converter.'}</h2></div>
    <div class="texto"><p>${g.slug === 'comercial' ? 'Formulários, pedidos de orçamento, WhatsApp e agenda do site alimentam o CRM. A equipe vê de onde veio cada contato e o que fazer em seguida.' : g.slug === 'sistemas' ? 'Catálogo, notícias, agenda e atendimento automático são integrados ao site, com a mesma identidade e o mesmo cuidado com o celular.' : 'Os anúncios e a busca levam a páginas feitas para cada produto ou serviço, com um caminho claro para o visitante pedir orçamento ou falar com a equipe.'}</p><a class="link" href="${L('como-trabalhamos')}">Como trabalhamos ${seta}</a></div>
  </div>
</section>`}
<section class="secao">
  <div class="in">
    <span class="rotulo">Outros serviços</span>
    <div class="outros">${outros.map(o => `<a href="${L('servicos/' + o.slug)}">${icone(o.slug)}<span><b>${o.nome}</b>${o.resumo}</span>${seta}</a>`).join('')}</div>
  </div>
</section>
${cta()}`;
  });

  // ---------- Projetos ----------
  P.projetos = `${cabeca('Portfólio', 'Projetos desenvolvidos', 'Estudos de redesenho criados pela Overtus para empresas de diferentes segmentos. Cada projeto tem identidade visual própria, várias páginas e versão em mais de um idioma quando a empresa atua fora do país.', [[null, 'Projetos']])}
<section class="secao">
  <div class="in">
    ${gradeProjetos()}
    <p class="legenda">${legendaProjetos}</p>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in duas">
    <div><span class="rotulo">Sempre duas versões</span><h2>O mesmo projeto, dois caminhos.</h2><p class="lead">Em cada estudo entregamos duas versões coerentes com a marca, uma clara e outra escura, ou uma mais institucional e outra mais técnica. A empresa escolhe com o site navegável na mão.</p></div>
    ${duasVersoes('dht')}
  </div>
</section>
${cta()}`;

  // ---------- Como trabalhamos ----------
  P['como-trabalhamos'] = `${cabeca('Como trabalhamos', 'Primeiro o site pronto. Depois a conversa sobre o projeto.', diferencial.texto, [[null, 'Como trabalhamos']])}
<section class="secao">
  <div class="in">
    ${linhaEtapas(true)}
  </div>
</section>
<section class="secao secao-alt">
  <div class="in duas">
    <div><span class="rotulo">Duas versões</span><h2>Você escolhe com o site navegável na mão.</h2>
      <ul class="pontos">${diferencial.pontos.map(([t, d]) => `<li><b>${t}</b>${d}</li>`).join('')}</ul></div>
    ${duasVersoes('instor')}
  </div>
</section>
<section class="secao">
  <div class="in">
    <span class="rotulo">Princípios</span><h2 class="h-secao">O que não muda em nenhum projeto</h2>
    ${listaPrincipios()}
  </div>
</section>
${cta()}`;

  // ---------- Sobre ----------
  P.sobre = `${cabeca('Sobre', 'Uma agência especializada em empresas que vendem de verdade.', 'A Overtus cria sites, sistemas e estrutura comercial para empresas que vendem de forma consultiva, em que o cliente pesquisa, compara e pede orçamento antes de comprar.', [[null, 'Sobre']])}
<section class="secao">
  <div class="in duas">
    <div><span class="rotulo">O que fazemos</span><h2>${site.slogan}</h2></div>
    <div class="texto">
      <p>Para muitas empresas, o site é o primeiro contato do cliente com a marca. Quando ele está desatualizado, lento ou não mostra o tamanho real da operação, o cliente segue para o concorrente sem avisar.</p>
      <p>Nosso trabalho começa pelo site, desenhado do zero com a identidade real da empresa, e segue pelo que vem depois dele: as visitas, o atendimento, a organização dos contatos e a rotina comercial que transforma interesse em negócio.</p>
      <p>Por isso mostramos o site pronto antes de falar de preço. Preferimos que a empresa decida vendo o resultado, não um orçamento.</p>
    </div>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in">
    <span class="rotulo">Como pensamos</span><h2 class="h-secao">Princípios</h2>
    ${listaPrincipios()}
  </div>
</section>
<section class="secao">
  <div class="in duas">
    <div><span class="rotulo">Para quem</span><h2>Segmentos que atendemos</h2><p class="lead">Indústrias e empresas de serviços em que cada venda passa por uma conversa.</p></div>
    <ul class="segs">${segmentos.map(s => `<li>${s}</li>`).join('')}</ul>
  </div>
</section>
${cta()}`;

  // ---------- Contato ----------
  P.contato = `${cabeca('Contato', 'Agende uma conversa.', chamada.texto, [[null, 'Contato']])}
<section class="secao">
  <div class="in contato">
    <div class="agenda" id="agenda" data-agenda-inline><p>Carregando a agenda… Se ela não abrir, <a href="${site.agenda}" target="_blank" rel="noopener">agende pelo cal.com/overtus</a>.</p></div>
    <aside class="contato-lado">
      <h2>Na conversa</h2>
      <ol class="conversa">
        <li><b>Entendemos a empresa</b>O que vende, para quem, e como o cliente chega até vocês hoje.</li>
        <li><b>Olhamos o site atual</b>O que funciona, o que afasta o visitante e o que falta para ele entrar em contato.</li>
        <li><b>Combinamos a prévia</b>Se fizer sentido, montamos as duas versões do novo site para você ver no ar.</li>
      </ol>
      <p class="nota">${chamada.nota}</p>
      <a class="btn btn-sec" href="${site.agenda}" target="_blank" rel="noopener">Abrir a agenda em outra aba</a>
    </aside>
  </div>
</section>`;

  return { P, topo, rodape, cabeca, cta, duasVersoes, linhaEtapas, gradeProjetos, listaPrincipios, L };
}

// ---------- Página inicial, versão A "Editorial" (areia e marinho) ----------
function inicioA(k) {
  const { cta, duasVersoes, linhaEtapas, gradeProjetos, listaPrincipios, L } = k;
  return `<section class="hero">
  <div class="in">
    <div class="hero-txt">
      <span class="rotulo">Agência de sites e estrutura comercial</span>
      <h1>Estrutura comercial para quem vende <em>de verdade.</em></h1>
      <p class="lead">${site.linha2}</p>
      <div class="acoes">${agendar()}<a class="btn btn-sec" href="${L('projetos')}">Ver projetos</a></div>
    </div>
    <div class="hero-pilha" aria-hidden="true">
      ${tela('p-texian', '', '', 'loading="eager"')}
      ${tela('p-instor', '', '', 'loading="eager"')}
      ${tela('p-engenho-am', '', '', 'loading="eager" fetchpriority="high"')}
    </div>
  </div>
  <div class="in faixa"><span>Sites sob medida</span><span>SEO e anúncios</span><span>Geração de leads</span><span>Agente de IA</span><span>Catálogo e cotação</span><span>CRM e prospecção</span></div>
</section>
<section class="dif">
  <div class="in">
    <div class="dif-txt"><span class="rotulo">${diferencial.rotulo}</span><h2>${diferencial.titulo}</h2><p class="lead">${diferencial.texto}</p>
    <ul class="pontos">${diferencial.pontos.map(([t, d]) => `<li><b>${t}</b>${d}</li>`).join('')}</ul></div>
    ${duasVersoes('dht')}
  </div>
</section>
<section class="secao">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Serviços</span><h2 class="h-secao">Do site à venda, com a mesma equipe.</h2></div><a class="link" href="${L('servicos')}">Todos os serviços ${seta}</a></div>
    <div class="linhas">${grupos.map((g, i) => `<a class="linha" href="${L('servicos/' + g.slug)}">
      <span class="n">${num(i)}</span><h3>${g.nome}</h3><p>${g.resumo}</p>${seta}
    </a>`).join('')}</div>
  </div>
</section>
<section class="processo">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Como trabalhamos</span><h2 class="h-secao">Cinco etapas, do estudo ao comercial funcionando.</h2></div><a class="link" href="${L('como-trabalhamos')}">Ver em detalhe ${seta}</a></div>
    ${linhaEtapas()}
  </div>
</section>
<section class="secao">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Portfólio</span><h2 class="h-secao">Projetos desenvolvidos</h2></div><a class="link" href="${L('projetos')}">Todos os projetos ${seta}</a></div>
    ${gradeProjetos(projetos.slice(0, 6))}
    <p class="legenda">${legendaProjetos}</p>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in">
    <span class="rotulo">Por que a Overtus</span><h2 class="h-secao">O que não muda em nenhum projeto</h2>
    ${listaPrincipios()}
  </div>
</section>
${cta()}`;
}

// ---------- Página inicial, versão B "Marinho" (como o Overtus Hub) ----------
function inicioB(k) {
  const { cta, duasVersoes, linhaEtapas, gradeProjetos, listaPrincipios, L } = k;
  return `<section class="hero">
  <div class="brilho" aria-hidden="true"></div>
  <img class="hero-forma" src="/assets/img/forma.webp" alt="" width="800" height="800" fetchpriority="high">
  <div class="in">
    <div class="hero-txt">
      <span class="rotulo">Agência de sites e estrutura comercial</span>
      <h1>Estrutura comercial para quem vende de verdade.</h1>
      <p class="lead">${site.linha2}</p>
      <div class="acoes">${agendar()}<a class="btn btn-sec" href="${L('servicos')}">Conhecer os serviços</a></div>
    </div>
    <a class="hero-vidro" href="${L('como-trabalhamos')}">
      <span class="rotulo">${diferencial.rotulo}</span>
      <p>Você vê o site pronto, em duas versões, antes de falar de preço.</p>
      <b>Como funciona ${seta}</b>
    </a>
  </div>
</section>
<section class="dif">
  <div class="in">
    <div class="dif-txt"><span class="rotulo">${diferencial.rotulo}</span><h2>${diferencial.titulo}</h2><p class="lead">${diferencial.texto}</p>
    <ul class="pontos">${diferencial.pontos.map(([t, d]) => `<li><b>${t}</b>${d}</li>`).join('')}</ul></div>
    ${duasVersoes('dht')}
  </div>
</section>
<section class="bento-sec">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Serviços</span><h2 class="h-secao">Do site à venda, com a mesma equipe.</h2></div><a class="link" href="${L('servicos')}">Todos os serviços ${seta}</a></div>
    <div class="bento">${grupos.map((g, i) => `<a class="bt bt-${i + 1}" href="${L('servicos/' + g.slug)}">
      <div class="bt-cab">${icone(g.slug)}<span class="n">${num(i)}</span></div><h3>${g.nome}</h3><p>${g.resumo}</p>
      <ul>${g.itens.map(([t]) => `<li>${t}</li>`).join('')}</ul><b class="mais">Conhecer ${seta}</b>
    </a>`).join('')}</div>
  </div>
</section>
<section class="processo">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Como trabalhamos</span><h2 class="h-secao">Cinco etapas, do estudo ao comercial funcionando.</h2></div><a class="link" href="${L('como-trabalhamos')}">Ver em detalhe ${seta}</a></div>
    ${linhaEtapas()}
  </div>
</section>
<section class="secao vitrine">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Portfólio</span><h2 class="h-secao">Projetos desenvolvidos</h2></div><a class="link" href="${L('projetos')}">Todos os projetos ${seta}</a></div>
    ${gradeProjetos(projetos.slice(0, 6))}
    <p class="legenda">${legendaProjetos}</p>
  </div>
</section>
<section class="secao">
  <div class="in">
    <span class="rotulo">Por que a Overtus</span><h2 class="h-secao">O que não muda em nenhum projeto</h2>
    ${listaPrincipios()}
  </div>
</section>
${cta()}`;
}

for (const [v, inicio] of [['a', inicioA], ['b', inicioB]]) {
  const k = gerarVersao(v);
  k.P.index = inicio(k);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, corpo] of Object.entries(k.P)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = documento({ v, slug, corpo: `${k.topo(slug)}\n<main>\n${corpo}\n</main>\n${k.rodape()}` });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`agencia: versão ${v.toUpperCase()}, ${Object.keys(k.P).length} páginas`);
}
