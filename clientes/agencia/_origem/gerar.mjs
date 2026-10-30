// Gera clientes/agencia/public/ (site da própria Overtus, uma versão só, servida na raiz de agencia.overtus.com.br).
// Rodar depois de mudar qualquer texto: node clientes/agencia/_origem/gerar.mjs
//
// Fotos de banco (public/assets/img/hero-pessoa, sobre-*, proc-*, set-*): Unsplash, Unsplash License (uso livre, sem atribuição obrigatória).
//   hero-pessoa  https://unsplash.com/photos/1507003211169-0a1dd7228f2d
//   sobre-equipe https://unsplash.com/photos/1521737711867-e3b97375f902
//   sobre-reuniao https://unsplash.com/photos/1551836022-d5d88e9218df
//   sobre-mesa   https://unsplash.com/photos/1556761175-b413da4baf72
//   proc-reuniao https://unsplash.com/photos/1600880292203-757bb62b4baf
//   proc-sala    https://unsplash.com/photos/1542744173-8e7e53415bb0
//   proc-fabrica https://unsplash.com/photos/1581091226825-a6a2a5aee158
//   proc-solda   https://unsplash.com/photos/1504328345606-18bbc8c9d7d1
//   proc-escritorio https://unsplash.com/photos/1560264280-88b68371db39
//   proc-projeto https://unsplash.com/photos/1581092160562-40aa08e78837
//   set-industria https://unsplash.com/photos/1504917595217-d4dc5ebe6122
//   set-distribuicao https://unsplash.com/photos/1587293852726-70cdb56c2866
//   set-escritorio https://unsplash.com/photos/1497366216548-37526070297c
// As pessoas nas fotos são de banco de imagens: não são a equipe da Overtus nem clientes, e o site nunca as apresenta assim.
// Prints (img/p-*.webp, v-*.webp): estudos de redesenho desenvolvidos pela Overtus (legendaProjetos em conteudo.mjs).
import fs from 'node:fs';
import path from 'node:path';
import { site, menu, grupos, diferencial, etapas, etapasCartao, principios, projetos, legendaProjetos, setores, chamada, paginas } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const clientes = path.join(pub, '../..');

// Título e descrição de cada setor vêm do próprio setor.
for (const s of setores) paginas['setores/' + s.slug] = [`${s.nome} · Overtus`, `${s.titulo} ${s.lead}`.slice(0, 300)];
const setorDe = Object.fromEntries(setores.map(s => [s.slug, s]));

// Fatos de cada projeto lidos da pasta do cliente: páginas da versão A, idiomas, versões e o endereço da prévia.
function fatos(p) {
  const [c, , , fixas] = p;
  const base = path.join(clientes, c, 'public');
  const url = `https://${c}.overtus.com.br/`;
  if (fixas || !fs.existsSync(path.join(base, 'a'))) return { tags: fixas || [], url };
  const contar = d => fs.readdirSync(d, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? (['en', 'es'].includes(e.name) ? 0 : contar(path.join(d, e.name))) : e.name === 'index.html' ? 1 : 0), 0);
  const paginasA = contar(path.join(base, 'a'));
  const idiomas = ['en', 'es'].filter(l => fs.existsSync(path.join(base, l)) || fs.existsSync(path.join(base, 'a', l)));
  const versoes = fs.readdirSync(base).filter(d => /^[a-d]$/.test(d)).length;
  const tags = [`${paginasA} páginas`];
  if (idiomas.length) tags.push(idiomas.length === 2 ? '3 idiomas' : '2 idiomas');
  if (versoes > 1) tags.push(`${versoes === 2 ? 'Duas' : versoes} versões`);
  return { tags, url: url + 'a/' };
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const num = i => String(i + 1).padStart(2, '0');
const L = s => `/${s === 'index' ? '' : s + '/'}`;
const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}"${attrs.includes('loading=') ? '' : ' loading="lazy"'} decoding="async"${attrs ? ' ' + attrs : ''}>`;
const foto = (nome, alt, attrs = '') => img(nome, alt, `class="foto"${attrs ? ' ' + attrs : ''}`);
const imgProjeto = p => p[4] || `p-${p[0]}`;
const quantos = slug => projetos.filter(p => p[1] === slug).length;
// Na inicial: o primeiro projeto de cada setor, até seis.
const destaques = setores.slice(0, 6).map(s => projetos.find(p => p[1] === s.slug));
// Foto de banco por setor (sem foto própria: o print do primeiro projeto).
const FOTO_SETOR = { industria: 'set-industria', agro: 'set-galpao', distribuicao: 'set-distribuicao', b2b: 'set-escritorio', construcao: 'proc-projeto', saude: 'proc-escritorio', automotivo: 'proc-solda' };

// Ícones de traço simples.
const SVG = (d, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${d}</svg>`;
const ICONES = {
  sites: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 8h18M8 21h8M12 17v4"/>',
  marketing: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 12l7-7M16 5h3v3"/>',
  sistemas: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/>',
  comercial: '<path d="M3 4h18l-7 8v6l-4 2v-8z"/>',
};
const icone = slug => SVG(ICONES[slug], ' class="ico"');
const seta = SVG('<path d="M5 12h14M13 6l6 6-6 6"/>', ' class="seta"');
const check = `<span class="ok">${SVG('<path d="M5 12l5 5 9-10"/>', ' stroke-width="2.4"')}</span>`;
const checkClaro = `<span class="ok ok-claro">${SVG('<path d="M5 12l5 5 9-10"/>', ' stroke-width="2.4"')}</span>`;
const iMail = SVG('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 8l9 6 9-6"/>');
const iPin = SVG('<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>');
const iDoc = SVG('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h5M10 17h5"/>');
const iImagem = SVG('<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16l-5-5-8 8"/>');
const iNuvem = SVG('<path d="M7 18a4 4 0 0 1-.6-7.95A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7z"/><path d="M12 13v6M9.5 15.5 12 13l2.5 2.5"/>');
const iCal = SVG('<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>');
const iLink = SVG('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5"/>');
const iGlobo = SVG('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>');
const iChat = SVG('<path d="M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9l-5 4z"/><path d="M8 9h8M8 13h5"/>');

// Moldura de navegador com o print de um projeto.
const tela = (nome, alt, endereco = '', attrs = '') => `<figure class="tela"><div class="tela-barra"><i></i><i></i><i></i>${endereco ? `<span>${esc(endereco)}</span>` : ''}</div>${img(nome, alt, attrs)}</figure>`;

const marca = `<i aria-hidden="true">O</i>Overtus`;
const agendar = (txt = 'Agendar conversa', cls = 'btn btn-prim') => `<a class="${cls}" href="${site.agenda}" data-agendar>${txt}</a>`;
const chipOk = txt => `<span class="chip chip-ok">${SVG('<path d="M5 12l5 5 9-10"/>', ' stroke-width="2.4"')}${txt}</span>`;

function documento({ slug, corpo }) {
  const [titulo, desc] = paginas[slug];
  const url = `${site.dominio}${L(slug)}`;
  const og = `${site.dominio}/assets/og-inicio.jpg`;
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
<meta name="theme-color" content="#f3f5f9">
<link rel="icon" href="/assets/img/favicon-48.png">
<link rel="apple-touch-icon" href="/assets/img/icone-apple-180.png">
<link rel="preload" href="/assets/fontes/plus-jakarta-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/base.css">
</head>
<body class="p-${slug.split('/')[0]}" data-cal="${site.calLink}">
<div class="folha">
${corpo}
</div>
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

const topo = slug => `<header class="topo">
  <div class="in">
    <a class="marca" href="${L('index')}" aria-label="Overtus, início">${marca}</a>
    <nav id="nav">${menu.map(([s, t]) => `<a href="${L(s)}"${slug === s || slug.startsWith(s + '/') ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav>
    <div class="topo-acoes">
      <a class="topo-mail" href="mailto:${site.email}">${iMail}<span>${site.email}</span></a>
      ${agendar('Agendar conversa', 'btn btn-prim btn-sm')}
      <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
    </div>
  </div>
</header>`;

const rodape = () => `<footer class="rodape">
  <div class="in">
    <div class="r-marca"><a class="marca" href="${L('index')}">${marca}</a><p>${site.slogan}</p><p>${site.linha2}</p></div>
    <div><h3>Serviços</h3><ul>${grupos.map(g => `<li><a href="${L('servicos/' + g.slug)}">${g.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Setores</h3><ul>${setores.map(s => `<li><a href="${L('setores/' + s.slug)}">${s.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Overtus</h3><ul>${menu.filter(([s]) => !['servicos', 'setores'].includes(s)).map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}</ul></div>
    <div><h3>Conversar</h3><ul><li><a href="${site.agenda}" data-agendar>Agendar conversa</a></li><li><a href="mailto:${site.email}">${site.email}</a></li><li><a href="${site.agenda}" target="_blank" rel="noopener">cal.com/overtus</a></li></ul></div>
  </div>
  <div class="in r-base"><span>© ${new Date().getFullYear()} Overtus</span><span>Sites, sistemas e estrutura comercial</span></div>
</footer>`;

const trilha = itens => `<nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${itens.map(([s, t]) => `<i>/</i>${s ? `<a href="${L(s)}">${t}</a>` : `<span>${t}</span>`}`).join('')}</nav>`;
const cabeca = (titulo, lead, itens = [], local = '') => `<section class="cabeca">
  <div class="in">
    ${trilha(itens)}
    ${local}
    <h1>${titulo}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>
</section>`;

const cta = () => `<section class="cta">
  <div class="in">
    <div class="painel painel-azul">
      <div><h2>${chamada.titulo}</h2><p>${chamada.texto}</p>
      <div class="acoes">${agendar()}<a class="btn btn-sec" href="${L('projetos')}">Ver projetos</a></div><p class="nota">${chamada.nota}</p></div>
      <div class="cta-lado cartao aba-cartao">
        <h4>Agendar conversa</h4>
        <div class="campo"><span>Agenda</span><div>${iCal}cal.com/overtus · 30 minutos, por vídeo</div></div>
        <div class="campo"><span>E-mail</span><div>${iMail}<a href="mailto:${site.email}">${site.email}</a></div></div>
      </div>
    </div>
  </div>
</section>`;

// Duas versões lado a lado: o diferencial em imagem.
const duasVersoes = (projeto = 'dht') => `<div class="ab">
  <div>${tela(`v-${projeto}-a`, 'Versão A de um projeto, em estilo claro', 'versão A')}<span class="ab-l"><b>A</b>Clara</span></div>
  <div>${tela(`v-${projeto}-b`, 'Versão B do mesmo projeto, em estilo escuro', 'versão B')}<span class="ab-l"><b>B</b>Escura</span></div>
</div>`;

// Linhas do cartão de cada etapa (inicial).
const linhaCartao = l => {
  if (l[0] === 'anexo') return `<div class="anexo"><span class="doc">${/foto/i.test(l[1]) ? iImagem : iDoc}</span><div><b>${l[1]}</b><small>${l[2]}</small></div>${chipOk('Recebido')}</div>`;
  if (l[0] === 'campo') return `<div class="campo"><span>${l[1]}</span><div>${l[2]}</div></div>`;
  if (l[0] === 'lista') return `<div class="anexo">${l[2] === 'Em andamento' ? checkClaro : check}<div><b>${l[1]}</b></div><span class="chip">${l[2]}</span></div>`;
  if (l[0] === 'versoes') return duasVersoes('instor');
  return '';
};
const abasEtapas = () => `<div class="painel">
  <div class="abas" role="tablist" aria-label="Etapas do trabalho" data-abas>${etapas.map(([t], i) => `<button type="button" role="tab" id="aba-${i + 1}" aria-controls="etapa-${i + 1}" aria-selected="${i === 0}"><b>${num(i)}</b> · ${t}</button>`).join('')}</div>
  ${etapas.map(([t, d, e], i) => {
    const [ct, cd, linhas] = etapasCartao[i];
    return `<div class="aba-corpo" id="etapa-${i + 1}" role="tabpanel" aria-labelledby="aba-${i + 1}"${i ? ' hidden' : ''}>
    <div class="aba-txt"><span class="rotulo">Etapa ${i + 1} de ${etapas.length}</span><h3>${t}</h3><p>${d}</p>
      <ul class="check">${(i === 0 ? ['Reunião de 30 minutos, por vídeo', 'Estudo do site atual e dos concorrentes', 'Logo, cores, fotos e textos reais'] : i === 1 ? ['Duas versões coerentes com a sua marca', 'Várias páginas navegáveis', 'No ar, no computador e no celular'] : i === 2 ? ['Você compara e escolhe', 'Ajustes acompanhados até a aprovação', 'Só então falamos de projeto e preço'] : i === 3 ? ['Domínio, hospedagem e certificado', 'SEO e imagem de compartilhamento', 'Medição de contatos configurada'] : ['Atualizações por mensagem', 'Anúncios e busca acompanhados', 'Rotina comercial organizada']).map(x => `<li>${check}${x}</li>`).join('')}</ul>
      <p class="entrega"><b>O que você recebe</b>${e}</p></div>
    <div class="cartao aba-cartao"><h4>${ct}</h4><p>${cd}</p>${linhas.map(linhaCartao).join('')}</div>
  </div>`;
  }).join('')}
</div>`;

const gradeProjetos = (lista = projetos) => `<div class="projs">${lista.map(p => {
  const f = fatos(p);
  return `<article class="proj" data-setor="${p[1]}">
    <a class="proj-tela" href="${f.url}" target="_blank" rel="noopener" aria-label="Abrir o projeto de ${esc(p[2].toLowerCase())} em nova aba">${tela(imgProjeto(p), `Página inicial do projeto de ${p[2].toLowerCase()}`, p[0] + '.overtus.com.br')}</a>
    <div><span class="rotulo">Estudo de redesenho · ${setorDe[p[1]].nome}</span><h3>${p[2]}</h3><div class="chips">${f.tags.map(t => `<span class="chip">${t}</span>`).join('')}</div></div>
  </article>`;
}).join('')}</div>`;

const faixaSetores = () => `<div class="setores-faixa">${setores.map(s => `<a class="setor-c" href="${L('setores/' + s.slug)}">${img(FOTO_SETOR[s.slug], '')}<span><b>${s.nome}</b><small>${quantos(s.slug)} estudos</small></span>${seta}</a>`).join('')}<a class="setor-c setor-cta" href="${L('setores')}"><span class="ico-caixa">${iGlobo}</span><span><b>Todos os setores</b><small>${projetos.length} estudos</small></span>${seta}</a></div>`;

const listaPrincipios = () => `<div class="princ">${principios.map(([t, d], i) => `<div class="pr"><span class="ico-caixa">${[iGlobo, iChat, iLink, iCal][i]}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div>`;

const outrosServicos = (lista, cls = '') => `<div class="outros${cls}">${lista.map(o => `<a class="outro" href="${L('servicos/' + o.slug)}"><span class="ico-caixa">${icone(o.slug)}</span><span><b>${o.nome}</b>${o.resumo}</span>${seta}</a>`).join('')}</div>`;

const P = {};

// ---------- Início ----------
P.index = `<section class="hero">
  <div class="in">
    <div>
      <h1>Estrutura <em>comercial</em> para quem vende de verdade.</h1>
      <p class="lead">${site.linha2}</p>
      <div class="acoes">${agendar()}<a class="btn btn-sec" href="${L('projetos')}">Ver projetos</a></div>
    </div>
    <div class="mosaico" aria-label="Fotos de empresas em operação e prints de sites desenvolvidos pela Overtus">
      <div class="m-a">${img('hero-pessoa', 'Profissional de terno em escritório', 'loading="eager"')}</div>
      <div class="m-b">${img('proc-fabrica', 'Linha de produção de uma fábrica', 'loading="eager" fetchpriority="high"')}</div>
      <div class="m-c">${img('sobre-reuniao', 'Reunião de trabalho', 'loading="eager"')}</div>
      <div class="m-d forma forma-q4"></div>
      <div class="m-e">${tela('p-texian', 'Site de engenharia e montagem industrial', '', 'loading="eager"')}</div>
      <div class="m-f">${img('set-escritorio', 'Escritório', 'loading="eager"')}</div>
      <div class="m-g forma forma-mist forma-c"></div>
      <div class="m-h forma forma-q1"></div>
      <div class="m-i">${img('proc-solda', 'Soldador em uma indústria', 'loading="eager"')}</div>
      <div class="m-j">${tela('p-engenho-am', 'Site de beneficiamento de arroz', '', 'loading="eager"')}</div>
      <div class="m-k">${img('set-distribuicao', 'Galpão de distribuição', 'loading="eager"')}</div>
    </div>
  </div>
</section>
<section class="secao secao-topo" id="etapas">
  <div class="in">
    <div class="sec-centro"><h2>Seu site em ${etapas.length} etapas</h2><p class="lead">${diferencial.titulo} Estudamos a empresa, publicamos duas versões completas em um link de prévia e você escolhe navegando.</p></div>
    ${abasEtapas()}
  </div>
</section>
<section class="secao">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Serviços</span><h2>Do site à venda, com a mesma equipe.</h2></div><a class="link" href="${L('servicos')}">Todos os serviços ${seta}</a></div>
    <div class="grupos">${grupos.map(g => `<a class="grupo" href="${L('servicos/' + g.slug)}">
      <span class="ico-caixa">${icone(g.slug)}</span>
      <h3>${g.nome}</h3><p>${g.resumo}</p>
      <ul>${g.itens.slice(0, 4).map(([t]) => `<li>${check}${t}</li>`).join('')}</ul>
      <span class="link">Conhecer ${seta}</span>
    </a>`).join('')}</div>
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="painel">
      <div class="sec-cab" style="margin-bottom:24px"><div><span class="rotulo">Setores</span><h2>Especialistas na forma como o seu setor vende.</h2></div></div>
      ${faixaSetores()}
    </div>
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Portfólio</span><h2>Projetos desenvolvidos</h2><p class="lead">${projetos.length} estudos de redesenho em ${setores.length} setores. Clique para navegar no site.</p></div><a class="link" href="${L('projetos')}">Todos os projetos ${seta}</a></div>
    ${gradeProjetos(destaques)}
    <p class="legenda">${legendaProjetos}</p>
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in duas">
    <div class="sobre-fotos">
      <div class="alta">${img('sobre-equipe', 'Pessoas trabalhando juntas em um escritório')}</div>
      <div>${img('proc-reuniao', 'Reunião de trabalho')}</div>
      <div class="forma forma-q2"></div>
    </div>
    <div><span class="rotulo">Quem somos</span><h2>Uma agência especializada em empresas que vendem de verdade.</h2>
      <p class="lead" style="margin-top:14px">A Overtus cria sites, sistemas e estrutura comercial para empresas que vendem de forma consultiva: o cliente pesquisa, compara e pede orçamento antes de comprar.</p>
      <ul class="check" style="margin-top:22px">${principios.map(([t]) => `<li>${check}${t}</li>`).join('')}</ul>
      <div class="acoes"><a class="btn btn-sec" href="${L('quem-somos')}">Conhecer a Overtus</a></div>
    </div>
  </div>
</section>
${cta()}`;

// ---------- Serviços (visão geral) ----------
P.servicos = `${cabeca('Do site à venda, com a mesma equipe.', 'Quatro frentes que funcionam juntas: o site apresenta a empresa, o marketing traz as visitas, os sistemas automatizam o atendimento e a estrutura comercial transforma contato em negócio.', [[null, 'Serviços']])}
<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="grupos">${grupos.map(g => `<a class="grupo" href="${L('servicos/' + g.slug)}">
      <span class="ico-caixa">${icone(g.slug)}</span>
      <h3>${g.nome}</h3><p>${g.resumo}</p>
      <ul>${g.itens.map(([t]) => `<li>${check}${t}</li>`).join('')}</ul>
      <span class="link">Conhecer ${seta}</span>
    </a>`).join('')}</div>
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="painel">
      <div class="duas" style="padding:20px">
        <div><span class="rotulo">${diferencial.rotulo}</span><h2>${diferencial.titulo}</h2><p class="lead" style="margin-top:14px">${diferencial.texto}</p><div class="acoes"><a class="btn btn-sec" href="${L('como-trabalhamos')}">Como trabalhamos</a></div></div>
        ${duasVersoes('instor')}
      </div>
    </div>
  </div>
</section>
${cta()}`;

// ---------- Uma página por grupo: cartão de destaque à esquerda, itens em linhas à direita ----------
const FOTO_GRUPO = { sites: 'p-globalmicrofusao', marketing: 'p-agrogen', sistemas: 'p-sulpol', comercial: 'p-metz' };
grupos.forEach(g => {
  const outros = grupos.filter(o => o.slug !== g.slug);
  P['servicos/' + g.slug] = `${cabeca(g.titulo, g.lead, [['servicos', 'Serviços'], [null, g.nome]])}
<section class="secao" style="padding-top:0">
  <div class="in promo-grade">
    <aside class="promo"><span class="promo-t">${g.nome}</span><p>${g.resumo}</p>${tela(FOTO_GRUPO[g.slug], 'Print de um estudo de redesenho')}</aside>
    <div class="coluna">
      <div class="itens">${g.itens.map(([t, d, inc], i) => `<article class="item">
        <span class="n">${num(i)}</span>
        <div><h2>${t}</h2><p>${d}</p><div class="chips">${inc.map(chipOk).join('')}</div></div>
      </article>`).join('')}</div>
      <div class="cartao aba-cartao">
        <h4>${g.slug === 'comercial' ? 'Cada contato do site entra direto na rotina comercial.' : g.slug === 'sistemas' ? 'Sistemas no mesmo padrão visual do seu site.' : g.slug === 'sites' ? diferencial.titulo : 'Visitas que chegam a um site preparado para converter.'}</h4>
        <p>${g.slug === 'comercial' ? 'Formulários, pedidos de orçamento, WhatsApp e agenda do site alimentam o CRM. A equipe vê de onde veio cada contato e o que fazer em seguida.' : g.slug === 'sistemas' ? 'Catálogo, notícias, agenda e atendimento automático são integrados ao site, com a mesma identidade e o mesmo cuidado com o celular.' : g.slug === 'sites' ? diferencial.texto : 'Os anúncios e a busca levam a páginas feitas para cada produto ou serviço, com um caminho claro para o visitante pedir orçamento ou falar com a equipe.'}</p>
        ${g.slug === 'sites' ? duasVersoes('engenho-am') : ''}
        <div class="barra-acoes"><a class="btn btn-sec" href="${L('como-trabalhamos')}">Como trabalhamos</a>${agendar()}</div>
      </div>
    </div>
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="sec-cab" style="margin-bottom:20px"><div><span class="rotulo">Outros serviços</span></div></div>
    ${outrosServicos(outros)}
  </div>
</section>
${cta()}`;
});

// ---------- Projetos ----------
P.projetos = `${cabeca('Projetos desenvolvidos', `${projetos.length} estudos de redesenho criados pela Overtus para empresas de ${setores.length} setores. Cada projeto tem identidade visual própria, várias páginas e versão em mais de um idioma quando a empresa atua fora do país. Clique em um projeto para navegar no site.`, [[null, 'Projetos']])}
<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="filtro" role="group" aria-label="Filtrar projetos por setor" data-filtro hidden><button type="button" aria-pressed="true" data-setor="">Todos <i>${projetos.length}</i></button>${setores.map(s => `<button type="button" aria-pressed="false" data-setor="${s.slug}">${s.nome} <i>${quantos(s.slug)}</i></button>`).join('')}</div>
    ${gradeProjetos()}
    <p class="legenda">${legendaProjetos}</p>
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="painel"><div class="duas" style="padding:20px">
      <div><span class="rotulo">Sempre duas versões</span><h2>O mesmo projeto, dois caminhos.</h2><p class="lead" style="margin-top:14px">Em cada estudo entregamos duas versões coerentes com a marca, uma clara e outra escura, ou uma mais institucional e outra mais técnica. A empresa escolhe com o site navegável na mão.</p></div>
      ${duasVersoes('dht')}
    </div></div>
  </div>
</section>
${cta()}`;

// ---------- Setores (visão geral) ----------
P.setores = `${cabeca('Especialistas na forma como o seu setor vende.', 'Cada setor tem um comprador diferente, um caminho diferente até o pedido e um jeito próprio de mostrar a empresa. Por isso o site, os sistemas e a rotina comercial partem do setor, não de um modelo.', [[null, 'Setores']])}
<section class="secao" style="padding-top:0">
  <div class="in setlista">${setores.map(s => {
    const proj = projetos.filter(p => p[1] === s.slug);
    return `<a class="setlinha" href="${L('setores/' + s.slug)}">
      ${tela(imgProjeto(proj[0]), '', proj[0][2].toLowerCase())}
      <div><span class="rotulo">${proj.length} estudos de redesenho</span><h2>${s.nome}</h2><p>${s.resumo}</p>
      <div class="chips">${s.precisa.slice(0, 3).map(x => `<span class="chip">${x}</span>`).join('')}</div></div>
      <span class="link">Ver o setor ${seta}</span>
    </a>`;
  }).join('')}</div>
</section>
${cta()}`;

setores.forEach(s => {
  const proj = projetos.filter(p => p[1] === s.slug);
  const outros = setores.filter(o => o.slug !== s.slug);
  const local = `<div class="local">${iPin}<span>${s.nome}</span><b>·</b><b>${s.resumo}</b><b>·</b><b>${proj.length} estudos de redesenho</b></div>`;
  P['setores/' + s.slug] = `<section class="cabeca">
  <div class="in">
    ${trilha([['setores', 'Setores'], [null, s.nome]])}
    ${local}
    <div class="galeria">
      <div>${foto(FOTO_SETOR[s.slug], `Ambiente de trabalho típico do setor ${s.nome.toLowerCase()} (foto de banco de imagens)`)}</div>
      ${proj.slice(0, 2).map(p => tela(imgProjeto(p), `Site de ${p[2].toLowerCase()}`, p[0] + '.overtus.com.br')).join('')}
    </div>
    <h1>${s.titulo}</h1>
    <p class="lead">${s.lead}</p>
  </div>
</section>
<section class="secao" style="padding-top:16px">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">O que trava a venda</span><h2>Onde o comprador desiste antes de falar com você.</h2></div></div>
    <ol class="dores">${s.dores.map(([t, d], i) => `<li class="dor"><span class="n">${num(i)}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="painel"><div class="duas duas-topo" style="padding:20px">
      <div><span class="rotulo">O que o site precisa ter</span><h2>Cinco pontos que fazem diferença no seu setor.</h2><p class="lead" style="margin-top:14px">Cada item abaixo entra no projeto quando faz sentido para a empresa. Você vê tudo funcionando na prévia antes de decidir.</p></div>
      <ul class="precisa">${s.precisa.map(x => `<li>${check}<span>${x}</span></li>`).join('')}</ul>
    </div></div>
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Projetos do setor</span><h2>${proj.length} estudos de redesenho em ${s.nome.toLowerCase()}.</h2></div><a class="link" href="${L('projetos')}">Todos os projetos ${seta}</a></div>
    ${gradeProjetos(proj)}
    <p class="legenda">${legendaProjetos}</p>
  </div>
</section>
${s.site ? `<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="site-setor"><div><span class="rotulo">Site completo do setor</span><h3>${s.site[0]}</h3><p>${s.site[1]}</p></div><a class="btn btn-prim" href="${s.site[2]}/">Conhecer as soluções do setor ${seta}</a></div>
  </div>
</section>` : ''}
<section class="secao" style="padding-top:0">
  <div class="in duas duas-topo">
    <div><span class="rotulo">Como resolvemos</span><h2>O que entra no projeto para ${s.nome.split(' e ')[0].toLowerCase()}.</h2></div>
    ${outrosServicos(s.servicos.map(g => grupos.find(x => x.slug === g)), ' outros-1')}
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in duas duas-topo">
    <div><span class="rotulo">Perguntas</span><h2>O que as empresas do setor perguntam.</h2></div>
    <div class="faq">${s.perguntas.map(([q, r]) => `<details><summary>${q}</summary><p>${r}</p></details>`).join('')}</div>
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="sec-cab" style="margin-bottom:16px"><div><span class="rotulo">Outros setores</span></div></div>
    <div class="chips">${outros.map(o => `<a class="chip" href="${L('setores/' + o.slug)}">${o.nome}</a>`).join('')}</div>
  </div>
</section>
${cta()}`;
});

// ---------- Como trabalhamos: indicador de etapas, cartão de destaque e blocos por etapa ----------
P['como-trabalhamos'] = `<section class="cabeca" style="padding-bottom:0">
  <div class="in">
    ${trilha([[null, 'Como trabalhamos']])}
    <div class="passos"><ol>${etapas.map(([t], i) => `<li><a href="#passo-${i + 1}"${i === 0 ? ' class="ativo"' : ''}><i></i>${t}</a></li>`).join('')}</ol></div>
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in promo-grade">
    <aside class="promo"><span class="promo-t">Site pronto antes do preço</span><p>${diferencial.pontos.map(([t, d]) => `${t}: ${d.toLowerCase()}`).join(' ')}</p>${tela('v-instor-a', 'Versão A de um estudo de redesenho', 'versão A')}</aside>
    <div class="coluna">
      <div><h1 style="font-size:clamp(30px,1.6vw+16px,40px)">Primeiro o site pronto. Depois a conversa sobre o projeto.</h1><p class="lead" style="margin-top:12px">${diferencial.texto}</p></div>
      ${etapas.map(([t, d, e], i) => `<article class="etapa-bloco" id="passo-${i + 1}">
        <header><span class="n">${num(i)}</span><h2>${t}</h2></header>
        <p>${d}</p>
        <div class="campo"><span>O que você recebe</span><div>${check}${e}</div></div>
      </article>`).join('')}
      <div class="cartao aba-cartao">
        <h4>Você escolhe com o site navegável na mão.</h4>
        ${duasVersoes('instor')}
        <div class="barra-acoes"><a class="btn btn-sec" href="${L('projetos')}">Ver projetos</a>${agendar()}</div>
      </div>
    </div>
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Princípios</span><h2>O que não muda em nenhum projeto</h2></div></div>
    ${listaPrincipios()}
  </div>
</section>
${cta()}`;

// ---------- Quem somos ----------
P['quem-somos'] = `${cabeca('Uma agência especializada em empresas que vendem de verdade.', 'A Overtus cria sites, sistemas e estrutura comercial para empresas que vendem de forma consultiva, em que o cliente pesquisa, compara e pede orçamento antes de comprar.', [[null, 'Quem somos']])}
<section class="secao" style="padding-top:0">
  <div class="in duas">
    <div class="sobre-fotos">
      <div class="alta">${img('sobre-equipe', 'Pessoas trabalhando juntas em um escritório (foto de banco de imagens)')}</div>
      <div>${img('sobre-mesa', 'Mesa de trabalho com computador (foto de banco de imagens)')}</div>
      <div class="forma forma-q2"></div>
    </div>
    <div class="texto">
      <span class="rotulo">O que fazemos</span><h2 style="margin:8px 0 18px">${site.slogan}</h2>
      <p>Para muitas empresas, o site é o primeiro contato do cliente com a marca. Quando ele está desatualizado, lento ou não mostra o tamanho real da operação, o cliente segue para o concorrente sem avisar.</p>
      <p>Nosso trabalho começa pelo site, desenhado do zero com a identidade real da empresa, e segue pelo que vem depois dele: as visitas, o atendimento, a organização dos contatos e a rotina comercial que transforma interesse em negócio.</p>
      <p>Por isso mostramos o site pronto antes de falar de preço. Preferimos que a empresa decida vendo o resultado, não um orçamento.</p>
    </div>
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Como pensamos</span><h2>Princípios</h2></div></div>
    ${listaPrincipios()}
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="painel">
      <div class="sec-cab" style="margin-bottom:24px"><div><span class="rotulo">Para quem</span><h2>Setores que atendemos</h2><p class="lead">Indústrias e empresas de serviços em que cada venda passa por uma conversa.</p></div><a class="link" href="${L('projetos')}">Ver os ${projetos.length} projetos ${seta}</a></div>
      ${faixaSetores()}
    </div>
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in duas duas-topo">
    <div><span class="rotulo">Fale com a gente</span><h2>Atendimento direto, sem intermediário.</h2><p class="lead" style="margin-top:14px">Quem conversa com você é quem acompanha o projeto do estudo à publicação.</p></div>
    <ul class="canais">
      <li><span>Agenda</span><a href="${site.agenda}" data-agendar>Agendar uma conversa por vídeo</a></li>
      <li><span>E-mail</span><a href="mailto:${site.email}">${site.email}</a></li>
    </ul>
  </div>
</section>
${cta()}`;

// ---------- Contato: cartão de destaque + "formulário" em duas colunas com a agenda embutida ----------
P.contato = `${cabeca('Agende uma conversa.', chamada.texto, [[null, 'Contato']])}
<section class="secao" style="padding-top:0">
  <div class="in contato">
    <aside class="promo"><span class="promo-t">Conversa sem compromisso</span><p>30 minutos por vídeo. Avaliamos o seu site e a sua presença comercial e apresentamos um plano objetivo.</p>${foto('proc-reuniao', 'Reunião de trabalho (foto de banco de imagens)')}</aside>
    <div class="cartao aba-cartao">
      <h4>Agendar conversa</h4>
      <p>Escolha um horário na agenda. A confirmação chega por e-mail com o link da reunião.</p>
      <div class="campos-2">
        <div class="campo"><span>Agenda</span><div>${iCal}<a href="${site.agenda}" target="_blank" rel="noopener">cal.com/overtus</a></div></div>
        <div class="campo"><span>E-mail</span><div>${iMail}<a href="mailto:${site.email}">${site.email}</a></div></div>
      </div>
      <div class="campo"><span>Horários disponíveis</span><div class="agenda" id="agenda" data-agenda-inline style="padding:0"><p>Carregando a agenda… Se ela não abrir, <a href="${site.agenda}" target="_blank" rel="noopener">agende pelo cal.com/overtus</a>.</p></div></div>
      <div class="campo"><span>Na conversa</span>
        <ol class="conversa">
          <li><div><b>Entendemos a empresa</b>O que vende, para quem, e como o cliente chega até vocês hoje.</div></li>
          <li><div><b>Olhamos o site atual</b>O que funciona, o que afasta o visitante e o que falta para ele entrar em contato.</div></li>
          <li><div><b>Combinamos a prévia</b>Se fizer sentido, montamos as duas versões do novo site para você ver no ar.</div></li>
        </ol>
      </div>
      <div class="barra-acoes"><a class="btn btn-sec" href="mailto:${site.email}">Prefiro escrever</a><a class="btn btn-prim" href="${site.agenda}" target="_blank" rel="noopener">Abrir a agenda em outra aba</a></div>
    </div>
  </div>
</section>`;

// ---------- Escreve as páginas na raiz de public/ ----------
for (const d of fs.readdirSync(pub, { withFileTypes: true })) {
  if (d.isDirectory() && d.name !== 'assets') fs.rmSync(path.join(pub, d.name), { recursive: true, force: true });
}
for (const [slug, corpo] of Object.entries(P)) {
  const dir = path.join(pub, slug === 'index' ? '' : slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), documento({ slug, corpo: `${topo(slug)}\n<main>\n${corpo}\n</main>\n${rodape()}` }));
}
console.log(`agencia: ${Object.keys(P).length} páginas`);
