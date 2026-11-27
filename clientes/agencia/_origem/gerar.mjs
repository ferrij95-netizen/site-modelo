// Gera clientes/agencia/public/ (site da própria Overtus, uma versão só, servida na raiz de agencia.overtus.com.br).
// Rodar depois de mudar qualquer texto: node clientes/agencia/_origem/gerar.mjs
//
// Fotos de banco (public/assets/img/hero-*, sobre-*, proc-*, set-*): Unsplash, Unsplash License (uso livre, sem atribuição obrigatória).
//   hero-obra-montagem https://unsplash.com/photos/1504307651254-35680f356dfd
//   hero-engenheira    https://unsplash.com/photos/1581091226825-a6a2a5aee158
//   hero-campo         https://unsplash.com/photos/1500382017468-9049fed747ef
//   hero-reuniao-mesa  https://unsplash.com/photos/1517048676732-d65bc937f952
//   sobre-equipe https://unsplash.com/photos/1521737711867-e3b97375f902
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
import { cases, grupos as gruposCases, legendaCases } from './cases.mjs';
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

const iWhats = `<svg viewBox="0 0 32 32" width="18" height="18" aria-hidden="true" fill="currentColor"><path d="M16.04 3C8.86 3 3.02 8.83 3.02 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A13 13 0 0 0 16.04 29C23.2 29 29.04 23.17 29.04 16S23.2 3 16.04 3zm0 23.8c-1.95 0-3.86-.52-5.53-1.51l-.4-.24-3.96 1.04 1.06-3.86-.26-.4A10.77 10.77 0 0 1 5.26 16c0-5.95 4.84-10.8 10.78-10.8S26.8 10.05 26.8 16s-4.83 10.8-10.76 10.8zm5.91-8.08c-.32-.16-1.92-.95-2.22-1.06-.3-.11-.51-.16-.73.16-.21.32-.84 1.06-1.02 1.27-.19.21-.38.24-.7.08-.32-.16-1.37-.5-2.6-1.6-.96-.86-1.61-1.92-1.8-2.24-.19-.32-.02-.5.14-.66.15-.14.32-.38.48-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.69 0 1.58 1.16 3.12 1.32 3.33.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.25 1.48.21 2.03.13.62-.09 1.92-.78 2.19-1.54.27-.76.27-1.41.19-1.54-.08-.14-.29-.22-.61-.38z"/></svg>`;

// Moldura de navegador com o print de um projeto.
const tela = (nome, alt, endereco = '', attrs = '') => `<figure class="tela"><div class="tela-barra"><i></i><i></i><i></i>${endereco ? `<span>${esc(endereco)}</span>` : ''}</div>${img(nome, alt, attrs)}</figure>`;

const marcaSimbolo = `<img src="/assets/img/logo-simbolo.webp" alt="" width="387" height="386">`;
const marca = `<img src="/assets/img/logo-overtus.webp" alt="Overtus" width="800" height="198">`;
const agendar = (txt = 'Agendar conversa', cls = 'btn btn-prim') => `<a class="${cls}" href="${site.agenda}" data-agendar>${txt}</a>`;
const chipOk = txt => `<span class="chip chip-ok">${SVG('<path d="M5 12l5 5 9-10"/>', ' stroke-width="2.4"')}${txt}</span>`;

const jsonLd = (slug, titulo, desc, url) => ({ '@context': 'https://schema.org', '@graph': [
  { '@type': 'Organization', '@id': `${site.dominio}/#organizacao`, name: site.nome, url: `${site.dominio}/`, logo: `${site.dominio}/assets/img/logo-overtus.webp`, email: site.email, telephone: site.whatsapp.replace(/[^+\d]/g, ''), slogan: site.slogan, areaServed: 'BR', contactPoint: { '@type': 'ContactPoint', contactType: 'sales', telephone: site.whatsapp.replace(/[^+\d]/g, ''), email: site.email, availableLanguage: 'Portuguese' } },
  { '@type': 'WebSite', '@id': `${site.dominio}/#site`, url: `${site.dominio}/`, name: site.nome, inLanguage: 'pt-BR', publisher: { '@id': `${site.dominio}/#organizacao` } },
  { '@type': 'WebPage', '@id': url + '#pagina', url, name: titulo, description: desc, inLanguage: 'pt-BR', isPartOf: { '@id': `${site.dominio}/#site` }, about: { '@id': SCHEMA[slug] ? url + '#servico' : `${site.dominio}/#organizacao` } },
  ...(SCHEMA[slug] || []),
] });

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
<meta name="robots" content="index, follow, max-image-preview:large">
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
<link rel="icon" href="/assets/img/favicon-48.png" sizes="48x48">
<link rel="icon" href="/assets/img/favicon-192.png" sizes="192x192">
<link rel="apple-touch-icon" href="/assets/img/icone-apple-180.png">
<link rel="preload" href="/assets/fontes/plus-jakarta-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/base.css">
<script type="application/ld+json">${JSON.stringify(jsonLd(slug, titulo, desc, url))}</script>
</head>
<body class="p-${slug.split('/')[0]}" data-cal="${site.calLink}">
<div class="folha">
${corpo}
</div>
<a class="whats-flut" href="${site.whatsappLink}" target="_blank" rel="noopener" aria-label="Falar com a Overtus pelo WhatsApp">${iWhats.replace(/width="18" height="18"/, 'width="30" height="30"')}</a>
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
      ${agendar('<span class="so-pc">Agendar conversa</span><span class="so-cel">Agendar</span>', 'btn btn-prim btn-sm')}
      <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
    </div>
  </div>
</header>`;

const rodape = () => `<footer class="rodape">
  <div class="in">
    <div class="r-marca"><a class="marca" href="${L('index')}">${marca}</a><p>${site.slogan}</p><p>${site.linha2}</p></div>
    <div><h3>Serviços</h3><ul>${grupos.map(g => `<li><a href="${L('servicos/' + g.slug)}">${g.nome}</a></li>`).join('')}<li><a href="${L('consultoria-ia')}">Consultoria em IA</a></li><li><a href="${L('orcamentos')}">Orçamentos automatizados</a></li></ul></div>
    <div><h3>Setores</h3><ul>${setores.map(s => `<li><a href="${L('setores/' + s.slug)}">${s.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Overtus</h3><ul>${menu.filter(([s]) => !['servicos', 'setores', 'consultoria-ia'].includes(s)).map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}</ul></div>
    <div><h3>Conversar</h3><ul><li><a href="${site.agenda}" data-agendar>Agendar conversa</a></li><li><a href="${site.whatsappLink}" target="_blank" rel="noopener">WhatsApp ${site.whatsapp}</a></li><li><a href="mailto:${site.email}">${site.email}</a></li><li><a href="${site.agenda}" target="_blank" rel="noopener">cal.com/overtus</a></li></ul></div>
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
        <div class="campo"><span>WhatsApp</span><div>${iWhats}<a href="${site.whatsappLink}" target="_blank" rel="noopener">${site.whatsapp}</a></div></div>
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
  // Link direto para a versão escolhida na vitrine (nunca a página de escolha A/B), quando o site está lá.
  const escolhido = cases.find(x => x[0] === p[0]);
  if (escolhido) f.url = `https://${escolhido[0]}.overtus.com.br/${escolhido[1] ? escolhido[1] + '/' : ''}`;
  return `<article class="proj" data-setor="${p[1]}">
    <a class="proj-tela" href="${f.url}" target="_blank" rel="noopener" aria-label="Abrir o projeto de ${esc(p[2].toLowerCase())} em nova aba">${tela(imgProjeto(p), `Página inicial do projeto de ${p[2].toLowerCase()}`, p[0] + '.overtus.com.br')}</a>
    <div><span class="rotulo">Estudo de redesenho · ${setorDe[p[1]].nome}</span><h3>${p[2]}</h3><div class="chips">${f.tags.map(t => `<span class="chip">${t}</span>`).join('')}</div></div>
  </article>`;
}).join('')}</div>`;

const faixaSetores = () => `<div class="setores-faixa">${setores.map(s => `<a class="setor-c" href="${L('setores/' + s.slug)}">${img(FOTO_SETOR[s.slug], '')}<span><b>${s.nome}</b><small>${quantos(s.slug)} estudos</small></span>${seta}</a>`).join('')}<a class="setor-c setor-cta" href="${L('setores')}"><span class="ico-caixa">${iGlobo}</span><span><b>Todos os setores</b><small>${projetos.length} estudos</small></span>${seta}</a></div>`;

const listaPrincipios = () => `<div class="princ">${principios.map(([t, d], i) => `<div class="pr"><span class="ico-caixa">${[iGlobo, iChat, iLink, iCal][i]}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div>`;

const outrosServicos = (lista, cls = '') => `<div class="outros${cls}">${lista.map(o => `<a class="outro" href="${L('servicos/' + o.slug)}"><span class="ico-caixa">${icone(o.slug)}</span><span><b>${o.nome}</b>${o.resumo}</span>${seta}</a>`).join('')}</div>`;

const P = {};
// Dados estruturados (JSON-LD) extras por página; Organization e WebSite vão em todas.
const SCHEMA = {};

// ---------- Início ----------
P.index = `<section class="hero">
  <div class="in">
    <div>
      <h1>Estrutura <em>comercial</em> para quem vende de verdade.</h1>
      <p class="lead">${site.linha2}</p>
      <div class="acoes">${agendar()}<a class="btn btn-sec" href="${L('projetos')}">Ver projetos</a></div>
    </div>
    <div class="folhas" aria-label="Fotos de obra, engenharia, reunião e campo">
      <div class="fo-1">${img('hero-obra-montagem', 'Montadores em uma obra industrial vista de cima', 'loading="eager" fetchpriority="high"')}</div>
      <div class="fo-2">${img('hero-engenheira', 'Engenheira trabalhando em um equipamento', 'loading="eager"')}</div>
      <div class="fo-3">${img('hero-campo', 'Campo de trigo ao pôr do sol', 'loading="eager"')}</div>
      <div class="fo-4">${img('hero-reuniao-mesa', 'Mesa de reunião com anotações', 'loading="eager"')}</div>
      <div class="fo-semente"></div>
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
<section class="ia-chamada">
  <div class="in">
    <a class="ia-faixa" href="${L('consultoria-ia')}">
      <span class="ia-faixa-selo">Consultoria em IA</span>
      <span class="ia-faixa-txt"><b>Inteligência artificial com resultado na sua empresa.</b>Diagnóstico, plano, piloto e implantação no atendimento, nas vendas e nos processos internos.</span>
      <span class="link">Conhecer a consultoria ${seta}</span>
    </a>
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
    <div class="sec-cab"><div><span class="rotulo">Portfólio</span><h2>Projetos desenvolvidos</h2><p class="lead">${cases.length} sites refeitos pela Overtus, de indústrias a oficinas. Clique para navegar no site.</p></div><a class="link" href="${L('projetos')}">Todos os projetos ${seta}</a></div>
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
        <div class="campo"><span>WhatsApp</span><div>${iWhats}<a href="${site.whatsappLink}" target="_blank" rel="noopener">${site.whatsapp}</a></div></div>
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

// ---------- Projetos (vitrine de cases: uma versão por site, link direto para ela) ----------
// Prints em faixas de 10 (cases-prints.mjs): cada cartão mostra um pedaço da faixa, deslocado por --k.
const POR_FAIXA = 10;
const urlCase = ([c, v]) => `https://${c}.overtus.com.br/${v ? v + '/' : ''}`;
const quantosCases = g => cases.filter(x => x[2] === g).length;
const ingles = cases.filter(x => /EUA/.test(x[4])).length;
P.projetos = `<section class="cabeca cases-cab">
  <div class="in">
    ${trilha([[null, 'Projetos']])}
    <span class="rotulo">Portfólio Overtus</span>
    <h1>Sites que a Overtus <em>refez</em>.</h1>
    <p class="lead">${cases.length} sites completos, cada um com a identidade da própria empresa: logo, cores, fotos e produtos reais, várias páginas e versão para celular. Clique em qualquer um para navegar no site no ar.</p>
    <dl class="cases-num"><div><dt>${cases.length}</dt><dd>sites no ar</dd></div><div><dt>${gruposCases.length}</dt><dd>segmentos</dd></div><div><dt>${ingles}</dt><dd>empresas nos EUA</dd></div><div><dt>100%</dt><dd>multipágina</dd></div></dl>
  </div>
</section>
<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="filtro" role="group" aria-label="Filtrar por segmento" data-filtro hidden><button type="button" aria-pressed="true" data-setor="">Todos <i>${cases.length}</i></button>${gruposCases.map(([g, nome]) => `<button type="button" aria-pressed="false" data-setor="${g}">${nome} <i>${quantosCases(g)}</i></button>`).join('')}</div>
    <div class="projs cases">${cases.map((x, n) => {
      const [c, , g, ramo, cidade] = x;
      const url = urlCase(x);
      const faixa = Math.floor(n / POR_FAIXA) + 1, k = n % POR_FAIXA;
      return `<article class="proj" data-setor="${g}">
      <a class="proj-tela" href="${url}" target="_blank" rel="noopener" aria-label="Abrir o site de ${esc(ramo.toLowerCase())} em nova aba"><figure class="tela"><div class="tela-barra"><i></i><i></i><i></i><span>${c}.overtus.com.br</span></div><div class="case-img"><img src="/assets/img/cases-${faixa}.webp" alt="Página inicial do site de ${esc(ramo.toLowerCase())}" width="640" height="4000" loading="lazy" decoding="async" style="--k:${k}"></div></figure></a>
      <div class="case-txt"><div><h3>${esc(ramo)}</h3>${cidade ? `<small>${esc(cidade)}</small>` : ''}</div><a class="link" href="${url}" target="_blank" rel="noopener">Abrir ${seta}</a></div>
    </article>`;
    }).join('\n    ')}</div>
    <p class="legenda">${legendaCases}</p>
  </div>
</section>
${cta()}`;

// ---------- Orçamentos automatizados (página de oferta para empresas B2B) ----------
// Estrutura de landing de oferta: abertura, público, demonstração em abas, funções, implantação,
// como funciona, o que muda, segmentos, perguntas e chamada final. Sem depoimentos nem logos de clientes
// (não temos casos desta oferta ainda); as conversas e propostas da demonstração são exemplos ilustrativos.
const iRaio = SVG('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>');
const iRelogio = SVG('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>');
const iSino = SVG('<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>');
const iClip = SVG('<path d="M20 11.5 12 19.5a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7L9.7 17.2a1.7 1.7 0 0 1-2.4-2.4L15 7"/>');
const ORC = {
  ramos: ['Usinagem e caldeiraria', 'Plásticos e embalagens', 'Máquinas e equipamentos', 'Distribuição e atacado', 'Materiais de construção', 'Fundição e forjados', 'Serviços técnicos', 'Engenharia e montagem'],
  funcoes: [
    ['Atendimento e triagem', 'Responde todo pedido na hora e entrega a demanda organizada.', ['Atende pelo WhatsApp oficial, pelo formulário do site e por e-mail, sem número pessoal de vendedor', 'Pergunta o que falta: quantidade, material, desenho, prazo e local de entrega', 'Separa o pedido simples do pedido que precisa do engenheiro ou do vendedor']],
    ['Montagem da proposta', 'Calcula com a sua tabela e as suas regras, no modelo da sua empresa.', ['Usa a tabela de preços, os descontos por volume e as condições que a diretoria definiu', 'Gera a proposta em PDF com o logo, a validade e as condições de pagamento', 'Pedidos fora da regra vão para aprovação antes de sair']],
    ['Acompanhamento até o fechamento', 'Nenhuma proposta fica esquecida na caixa de entrada do comprador.', ['Cobra o retorno nos dias combinados, com mensagem educada e no tom da empresa', 'Avisa o vendedor quando o comprador pede negociação ou visita', 'Relatório semanal: propostas enviadas, respondidas, ganhas e perdidas']],
  ],
  conecta: ['WhatsApp Business oficial', 'Formulário do site', 'E-mail comercial', 'Planilha de preços', 'ERP da empresa', 'CRM', 'Google Drive', 'Proposta em PDF'],
  passos: [
    ['Entendemos o seu orçamento', 'Mapeamos por onde chegam os pedidos, quem orça hoje, quanto tempo leva e onde a proposta trava. Recebemos a tabela de preços, as regras de desconto e o modelo de proposta atual.'],
    ['Treinamos o agente', 'Conectamos os canais, cadastramos produtos, preços e regras e definimos os limites: o que ele resolve sozinho e o que passa para a sua equipe aprovar.'],
    ['Ele entra na rotina comercial', 'O agente começa a atender e orçar junto com o seu time. As correções da equipe viram regra, sem reprogramação e sem projeto de meses.'],
  ],
  antes: [
    ['Tempo de resposta', 'Horas ou dias, conforme a fila do orçamentista', 'Minutos, a qualquer hora do dia'],
    ['Pedidos fora do horário', 'Esperam o próximo dia útil', 'Atendidos e encaminhados na hora'],
    ['Padrão da proposta', 'Cada vendedor monta de um jeito', 'Um modelo único, com a marca da empresa'],
    ['Propostas sem retorno', 'Ficam esquecidas', 'Cobradas automaticamente até a resposta'],
    ['Tempo do vendedor', 'Digitando orçamento', 'Negociando e fechando'],
  ],
  segmentos: [
    ['set-industria', 'Indústria sob encomenda', 'Peças por desenho, lotes e prazos de produção. O agente recebe o desenho, confirma material e quantidade e devolve a proposta ou passa para a engenharia.', ['Desenho técnico em anexo', 'Preço por lote', 'Prazo de produção']],
    ['set-distribuicao', 'Distribuição e atacado', 'Catálogo extenso, tabela por cliente e frete por região. O agente monta o pedido item a item e aplica a condição de cada comprador.', ['Catálogo com milhares de itens', 'Tabela por cliente', 'Frete e prazo de entrega']],
    ['proc-projeto', 'Serviços técnicos e engenharia', 'Escopo variável, visita técnica e proposta detalhada. O agente qualifica a demanda, agenda a visita e prepara a proposta-base para o responsável.', ['Qualificação do escopo', 'Agenda de visita técnica', 'Proposta-base para revisão']],
  ],
  perguntas: [
    ['O agente pode passar um preço errado?', 'Ele só calcula com a tabela e as regras que a sua empresa aprovou. Pedido fora da regra, desconto acima do limite ou item sem preço cadastrado vai para aprovação de uma pessoa antes de ser enviado.'],
    ['Preciso trocar o sistema que já uso?', 'Não. O agente trabalha com o que a empresa já tem: planilha, ERP, CRM ou e-mail. Na primeira conversa avaliamos as integrações possíveis com o seu sistema.'],
    ['O cliente percebe que está falando com uma IA?', 'O agente se apresenta em nome da empresa, com linguagem formal e as informações corretas. Quando o comprador pede para falar com uma pessoa, a conversa passa para o vendedor na hora.'],
    ['Quanto tempo leva para começar?', 'A implantação é medida em dias, não em meses. O prazo exato depende do tamanho do catálogo e das integrações, e é definido na primeira conversa.'],
  ],
};
const bolha = (quem, txt, hora) => `<div class="orc-msg orc-${quem}"><p>${txt}</p><small>${hora}</small></div>`;
const demoChat = () => `<div class="orc-tel" aria-label="Exemplo ilustrativo de conversa de orçamento pelo WhatsApp">
  <div class="orc-tel-topo"><span class="orc-av">${marcaSimbolo}</span><div><b>Comercial · Sua empresa</b><small>online agora</small></div></div>
  <div class="orc-tel-corpo">
    ${bolha('cli', 'Bom dia. Preciso de orçamento para 2.000 buchas em aço 1045, conforme o desenho.', '08:12')}
    <div class="orc-msg orc-cli orc-arq"><span class="doc">${iDoc}</span><p><b>bucha-rev03.pdf</b><small>Desenho técnico · 214 KB</small></p></div>
    ${bolha('ag', 'Bom dia, Carlos. Recebi o desenho, obrigado. Para fechar o valor: qual o prazo desejado e o local de entrega?', '08:12')}
    ${bolha('cli', 'Entrega em Caxias do Sul, em até 20 dias.', '08:14')}
    ${bolha('ag', 'Perfeito. Sua proposta segue em instantes, com valor, prazo e condições de pagamento.', '08:14')}
  </div>
  <div class="orc-tags">${chipOk('Desenho recebido')}${chipOk('2.000 peças')}${chipOk('Entrega em 20 dias')}<span class="chip">Comercial avisado</span></div>
</div>`;
const demoProposta = () => `<div class="orc-prop" aria-label="Exemplo ilustrativo de proposta comercial gerada automaticamente">
  <div class="orc-prop-cab"><div><span class="rotulo">Proposta comercial</span><b>Nº 1027 · Metalúrgica Exemplo</b></div><span class="chip chip-ok">${SVG('<path d="M5 12l5 5 9-10"/>', ' stroke-width="2.4"')}Enviada 08:16</span></div>
  <table>
    <thead><tr><th>Item</th><th>Qtd.</th><th>Unitário</th><th>Total</th></tr></thead>
    <tbody>
      <tr><td>Bucha usinada, aço 1045, conforme desenho rev. 03</td><td>2.000</td><td>R$ 8,40</td><td>R$ 16.800,00</td></tr>
      <tr><td>Tratamento superficial, oxidação negra</td><td>2.000</td><td>R$ 0,95</td><td>R$ 1.900,00</td></tr>
      <tr><td>Frete até Caxias do Sul (RS)</td><td>1</td><td>R$ 420,00</td><td>R$ 420,00</td></tr>
    </tbody>
  </table>
  <div class="orc-prop-pe"><div><small>Prazo</small><b>18 dias úteis</b></div><div><small>Pagamento</small><b>28/56 dias</b></div><div><small>Validade</small><b>10 dias</b></div><div class="orc-total"><small>Total</small><b>R$ 19.120,00</b></div></div>
  <div class="orc-segue"><span class="ico-caixa">${iSino}</span><p><b>Acompanhamento programado</b>Sem resposta em 2 dias úteis, o agente retoma o contato com o comprador.</p></div>
</div>`;

P.orcamentos = `<section class="orc-hero">
  <div class="in">
    <div class="orc-hero-painel">
      <div class="orc-hero-txt">
        <a class="orc-selo" href="#na-pratica"><b>Novo</b>Orçamentos automatizados para empresas B2B${seta}</a>
        <h1>Seu cliente pede orçamento. <span>A proposta sai em minutos.</span></h1>
        <p class="lead">Um agente de inteligência artificial treinado com os seus produtos, preços e regras atende o pedido pelo WhatsApp, pelo site ou por e-mail, monta a proposta no padrão da sua empresa e acompanha o comprador até a resposta.</p>
        <div class="acoes">${agendar('Agendar conversa', 'btn btn-claro')}<a class="btn btn-contorno" href="#na-pratica">Ver na prática</a></div>
        <ul class="orc-hero-fatos"><li>${iRelogio}Atendimento 24 horas</li><li>${iDoc}Proposta no seu modelo</li><li>${iSino}Cobrança de retorno automática</li></ul>
      </div>
      <div class="orc-hero-vis">
        <div class="orc-hero-foto">${img('proc-fabrica', 'Linha de produção de uma indústria', 'loading="eager" fetchpriority="high"')}</div>
        <div class="orc-flut orc-flut-a"><span class="ico-caixa">${iChat}</span><p><b>Novo pedido · 08:12</b>2.000 buchas em aço 1045, com desenho</p></div>
        <div class="orc-flut orc-flut-b"><span class="ico-caixa">${iDoc}</span><p><b>Proposta nº 1027 enviada</b>R$ 19.120,00 · 4 minutos depois</p></div>
      </div>
    </div>
  </div>
</section>

<section class="orc-ramos">
  <div class="in">
    <p>Feito para empresas que vendem sob encomenda e vivem de orçamento. Faz parte da nossa <a href="${L('consultoria-ia')}">consultoria em IA</a>, da mesma equipe que já entregou <a href="${L('projetos')}">${cases.length} sites de empresas B2B</a>.</p>
    <div class="orc-faixa" aria-hidden="true"><div>${[...ORC.ramos, ...ORC.ramos].map(r => `<span>${r}</span>`).join('')}</div></div>
  </div>
</section>

<section class="secao" id="na-pratica">
  <div class="in">
    <div class="sec-centro"><span class="rotulo">Na prática</span><h2>Não é mais um sistema para alimentar. É o orçamento com um responsável.</h2></div>
    <div class="painel orc-demo">
      <div class="abas" role="tablist" aria-label="Demonstração" data-abas>
        <button type="button" role="tab" id="aba-atender" aria-controls="demo-atender" aria-selected="true"><b>01</b> · Atender</button>
        <button type="button" role="tab" id="aba-orcar" aria-controls="demo-orcar" aria-selected="false"><b>02</b> · Orçar</button>
      </div>
      <div class="orc-demo-corpo" id="demo-atender" role="tabpanel" aria-labelledby="aba-atender">
        <div class="orc-demo-txt"><span class="rotulo">Atendimento</span><h3>Responde em segundos, a qualquer hora.</h3><p>O pedido chega às oito da manhã ou às onze da noite e recebe a mesma atenção. O agente confirma o que o comprador precisa e pergunta só o que falta para calcular.</p>
          <ul class="check">${['Recebe desenho, foto, lista de itens ou áudio', 'Confirma quantidade, material, prazo e entrega', 'Avisa o vendedor certo, pelo rodízio da equipe'].map(x => `<li>${check}${x}</li>`).join('')}</ul></div>
        ${demoChat()}
      </div>
      <div class="orc-demo-corpo" id="demo-orcar" role="tabpanel" aria-labelledby="aba-orcar" hidden>
        <div class="orc-demo-txt"><span class="rotulo">Orçamento</span><h3>Monta a proposta e envia, no padrão da empresa.</h3><p>O cálculo segue a tabela e as regras que a diretoria aprovou. A proposta sai em PDF com a sua marca, e o agente cobra o retorno sozinho até a resposta do comprador.</p>
          <ul class="check">${['Preço, desconto por volume e frete calculados', 'Validade e condições de pagamento da empresa', 'Fora da regra, vai para aprovação antes de sair'].map(x => `<li>${check}${x}</li>`).join('')}</ul></div>
        ${demoProposta()}
      </div>
      <p class="nota orc-ilustra">Conversa e proposta ilustrativas. No projeto, o agente usa os produtos, os preços e o modelo de proposta da sua empresa.</p>
    </div>
  </div>
</section>

<section class="secao orc-funcoes">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">O agente</span><h2>Um agente, três frentes do orçamento.</h2></div><p class="lead">Ele assume o trabalho repetitivo do orçamento. A sua equipe fica com a negociação, a engenharia e o relacionamento.</p></div>
    <ol class="orc-func">${ORC.funcoes.map(([t, d, itens], i) => `<li><span class="orc-num">${num(i)}</span><div><h3>${t}</h3><p>${d}</p></div><ul class="check">${itens.map(x => `<li>${check}${x}</li>`).join('')}</ul></li>`).join('')}</ol>
    <div class="orc-conecta"><span class="rotulo">Conecta com o que a empresa já usa</span><div class="chips">${ORC.conecta.map(c => `<span class="chip">${c}</span>`).join('')}</div></div>
  </div>
</section>

<section class="orc-prazo">
  <div class="in">
    <div class="orc-prazo-painel">
      <span class="rotulo">Implantação</span>
      <p class="orc-prazo-grande">Do primeiro contato ao primeiro orçamento automático: <span>dias, não meses.</span></p>
      <div class="orc-prazo-linha">${['Conversa de 30 minutos', 'Tabela, regras e modelo de proposta', 'Agente treinado e testado pela sua equipe', 'Atendendo os seus compradores'].map((t, i) => `<div><b>${num(i)}</b><span>${t}</span></div>`).join('')}</div>
    </div>
  </div>
</section>

<section class="secao">
  <div class="in">
    <div class="sec-centro"><span class="rotulo">Como funciona</span><h2>Três etapas, acompanhadas pela Overtus.</h2></div>
    <ol class="orc-passos">${ORC.passos.map(([t, d], i) => `<li><span class="orc-num">${num(i)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="secao orc-muda">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Resultado</span><h2>O que muda depois do primeiro mês.</h2></div><p class="lead">O mesmo time comercial, com o orçamento saindo no tempo em que o comprador ainda está decidindo.</p></div>
    <div class="orc-tabela" role="table" aria-label="Antes e depois do orçamento automatizado">
      <div class="orc-tl orc-tl-cab" role="row"><span role="columnheader"></span><span role="columnheader">Hoje</span><span role="columnheader">Com o agente</span></div>
      ${ORC.antes.map(([a, b, c]) => `<div class="orc-tl" role="row"><b role="rowheader">${a}</b><span role="cell">${b}</span><span role="cell">${check}${c}</span></div>`).join('')}
    </div>
  </div>
</section>

<section class="secao secao-topo">
  <div class="in">
    <div class="sec-centro"><span class="rotulo">Segmentos</span><h2>Cada empresa trava o orçamento em um ponto diferente.</h2></div>
    <div class="orc-segs">${ORC.segmentos.map(([f, t, d, tags]) => `<article class="orc-seg">${img(f, '')}<div><h3>${t}</h3><p>${d}</p><div class="chips">${tags.map(x => `<span class="chip">${x}</span>`).join('')}</div></div></article>`).join('')}</div>
  </div>
</section>

<section class="secao secao-topo">
  <div class="in orc-faq-in">
    <div><span class="rotulo">Perguntas</span><h2>O que as empresas perguntam antes de começar.</h2><p class="lead">Outra dúvida? Escreva para <a href="mailto:${site.email}">${site.email}</a>.</p></div>
    <div class="faq">${ORC.perguntas.map(([q, r]) => `<details><summary>${q}</summary><p>${r}</p></details>`).join('')}</div>
  </div>
</section>

<section class="cta">
  <div class="in">
    <div class="painel painel-azul">
      <div><span class="rotulo">Vamos conversar</span><h2>Qual etapa do seu orçamento está travando as vendas?</h2><p>Em 30 minutos entendemos como a sua empresa orça hoje e mostramos como o agente funcionaria com os seus produtos.</p>
      <div class="acoes">${agendar()}<a class="btn btn-sec" href="mailto:${site.email}">Enviar e-mail</a></div></div>
      <div class="cta-lado cartao aba-cartao">
        <h4>Agendar conversa</h4>
        <div class="campo"><span>Agenda</span><div>${iCal}cal.com/overtus · 30 minutos, por vídeo</div></div>
        <div class="campo"><span>E-mail</span><div>${iMail}<a href="mailto:${site.email}">${site.email}</a></div></div>
        <div class="campo"><span>WhatsApp</span><div>${iWhats}<a href="${site.whatsappLink}" target="_blank" rel="noopener">${site.whatsapp}</a></div></div>
      </div>
    </div>
  </div>
</section>`;

// ---------- Consultoria em IA (página de serviço pensada para busca: "consultoria em IA", "consultoria em inteligência artificial") ----------
// Fotos (Unsplash License, uso livre): consultoria-ia-workshop-diagnostico https://unsplash.com/photos/1552664730-d307ca884978
//   consultoria-ia-assistente-inteligencia-artificial https://unsplash.com/photos/1531746790731-6c087fecd65a
//   consultoria-ia-infraestrutura-de-dados https://unsplash.com/photos/1573164713988-8665fc963095
//   consultoria-ia-chip-inteligencia-artificial https://unsplash.com/photos/1697577418970-95d99b5a55cf
// Sem números de resultado, clientes ou preços: só o que a Overtus faz e como faz.
const iEscudo = SVG('<path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>');
const iGrafico = SVG('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>');
const iEngrenagem = SVG('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>');
const iAlvo = SVG('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>');
const FOTO_IA = (nome, alt, attrs = '') => img(nome, alt, `width="800" height="534"${attrs ? ' ' + attrs : ''}`);
const IA = {
  casos: [
    [iChat, 'Atendimento e pré-venda', 'Agente de IA no WhatsApp e no site que responde dúvidas técnicas, qualifica o contato e passa para o vendedor certo, a qualquer hora.'],
    [iGrafico, 'Relatórios e análise de dados', 'Vendas, estoque e produção lidos em linguagem simples: a diretoria pergunta e a IA responde com base nos dados da empresa.'],
    [iDoc, 'Documentos e contratos', 'Leitura de editais, pedidos, notas e contratos, com extração dos dados importantes e alerta do que precisa de atenção.'],
    [iEngrenagem, 'Processos internos', 'Tarefas repetitivas do administrativo e do financeiro automatizadas: cadastro, conferência, cobrança e respostas padrão.'],
    [SVG('<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/>'), 'Base de conhecimento interna', 'Manuais, normas, fichas técnicas e procedimentos respondidos pela IA para a equipe, sem procurar em pastas e e-mails antigos.'],
    [iAlvo, 'Marketing e prospecção', 'Pesquisa de empresas-alvo, mensagens de abordagem personalizadas e conteúdo técnico para o site e as redes, revisados pela equipe.'],
  ],
  metodo: [
    ['Diagnóstico', 'Entrevistas com diretoria e equipes, mapa dos processos e dos dados que a empresa já tem.'],
    ['Mapa de oportunidades', 'Lista priorizada de usos da IA, com o ganho esperado, o esforço e o risco de cada um.'],
    ['Piloto', 'O primeiro caso de uso funcionando com dados reais, testado pela sua equipe antes de crescer.'],
    ['Implantação', 'Integração com WhatsApp, ERP, CRM, planilhas e e-mail, com regras e limites definidos.'],
    ['Treinamento e acompanhamento', 'Equipe treinada para usar a IA no dia a dia e revisões periódicas dos resultados.'],
  ],
  entregas: [
    ['Plano de IA da empresa', 'Um documento objetivo para a diretoria decidir onde investir primeiro.', ['Processos e dados mapeados', 'Oportunidades com ganho, esforço e risco', 'Ordem de implantação recomendada']],
    ['Solução funcionando', 'Não termina em apresentação: o primeiro uso da IA entra na rotina.', ['Agente ou automação no ar', 'Conectado aos sistemas que a empresa já usa', 'Regras de aprovação humana onde importa']],
    ['Equipe preparada', 'A IA só dá resultado quando as pessoas sabem usar e confiam nela.', ['Treinamento prático por área', 'Política de uso de IA para a empresa', 'Acompanhamento e ajustes após a implantação']],
  ],
  compara: [
    ['Ponto de partida', 'A ferramenta da moda', 'O processo que mais custa para a empresa'],
    ['Dados da empresa', 'Copiados em ferramentas soltas', 'Conectados com controle de acesso'],
    ['Resultado', 'Testes que não viram rotina', 'Uso medido e incorporado ao trabalho'],
    ['Equipe', 'Cada um usa de um jeito', 'Treinada, com política de uso definida'],
    ['Riscos', 'Informação sensível exposta', 'LGPD e confidencialidade previstas desde o início'],
  ],
  seguranca: ['Dados tratados de acordo com a LGPD, com acesso só de quem precisa', 'Informações confidenciais fora do treinamento de modelos públicos', 'Aprovação de uma pessoa antes de qualquer decisão sensível', 'Registro do que a IA respondeu e fez, para auditoria'],
  perguntas: [
    ['O que é uma consultoria em inteligência artificial?', 'É o trabalho de identificar onde a inteligência artificial traz ganho real para a empresa, planejar o uso com segurança e implantar as soluções nos processos, junto com a equipe. A consultoria em IA da Overtus vai do diagnóstico ao agente ou à automação funcionando.'],
    ['Para que tipo de empresa é a consultoria em IA?', 'Para empresas B2B, como indústrias, distribuidoras, empresas de engenharia, agronegócio e serviços técnicos, que têm processos comerciais e administrativos repetitivos e querem usar a IA com resultado, não como experimento.'],
    ['Quanto custa uma consultoria em IA?', 'O investimento depende do número de áreas envolvidas, das integrações e do tamanho da implantação. Depois da primeira conversa, apresentamos uma proposta com escopo, prazo e valor fechados.'],
    ['Quanto tempo leva para ver resultado?', 'O primeiro piloto costuma ficar pronto em semanas, não em meses, porque começamos pelo caso de uso com maior ganho e menor esforço. O prazo exato é definido no diagnóstico.'],
    ['Preciso ter equipe de TI ou trocar meus sistemas?', 'Não. A Overtus conduz a parte técnica e trabalha com o que a empresa já usa: WhatsApp, e-mail, planilhas, ERP e CRM. A sua equipe participa definindo regras e validando os resultados.'],
    ['Os dados da minha empresa ficam seguros?', 'Sim. A segurança faz parte do projeto: controle de acesso, tratamento conforme a LGPD, informações confidenciais fora do treinamento de modelos públicos e aprovação humana nas decisões sensíveis.'],
    ['A consultoria atende empresas de todo o Brasil?', 'Sim. As conversas, os treinamentos e o acompanhamento são feitos por vídeo, o que permite atender empresas em qualquer estado.'],
  ],
};
const urlIA = `${site.dominio}/consultoria-ia/`;
SCHEMA['consultoria-ia'] = [
  { '@type': 'Service', '@id': urlIA + '#servico', name: 'Consultoria em inteligência artificial para empresas', alternateName: ['Consultoria em IA', 'Consultoria de IA para empresas'], serviceType: 'Consultoria em inteligência artificial', description: 'Diagnóstico, plano de IA, piloto, implantação e treinamento para empresas B2B usarem inteligência artificial em atendimento, vendas, documentos, dados e processos internos, com segurança e LGPD.', provider: { '@id': `${site.dominio}/#organizacao` }, areaServed: { '@type': 'Country', name: 'Brasil' }, availableLanguage: 'pt-BR', url: urlIA, image: `${site.dominio}/assets/img/consultoria-ia-assistente-inteligencia-artificial.webp`,
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Etapas da consultoria em IA', itemListElement: IA.metodo.map(([t, d]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: t, description: d } })) } },
  { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Início', item: `${site.dominio}/` }, { '@type': 'ListItem', position: 2, name: 'Consultoria em IA', item: urlIA }] },
  { '@type': 'FAQPage', mainEntity: IA.perguntas.map(([q, r]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: r } })) },
];

P['consultoria-ia'] = `<section class="hero ia-hero">
  <div class="in">
    <div>
      ${trilha([['', 'Consultoria em IA']])}
      <span class="rotulo">Consultoria em IA para empresas B2B</span>
      <h1>Consultoria em <em>inteligência artificial</em> para empresas que querem resultado.</h1>
      <p class="lead">A Overtus identifica onde a IA traz ganho real para a sua empresa, monta o plano e implanta as soluções no atendimento, nas vendas e nos processos internos, com segurança e junto com a sua equipe.</p>
      <div class="acoes">${agendar('Agendar diagnóstico')}<a class="btn btn-sec" href="#como-funciona">Como funciona</a></div>
      <ul class="ia-fatos"><li>${iAlvo}Do diagnóstico à implantação</li><li>${iEscudo}LGPD e dados protegidos</li><li>${iGlobo}Atendimento em todo o Brasil</li></ul>
    </div>
    <div class="circulos" aria-label="Fotos de inteligência artificial e de um workshop de consultoria">
      <div class="ci-anel"></div><div class="ci-disco"></div>
      <div class="ci-1">${img('consultoria-ia-assistente-inteligencia-artificial', 'Mão de robô estendida, representando um assistente de inteligência artificial para empresas', 'width="900" height="900" loading="eager" fetchpriority="high"')}</div>
      <div class="ci-2">${FOTO_IA('consultoria-ia-workshop-diagnostico', 'Workshop de diagnóstico de consultoria em IA com equipe e post-its no quadro', 'loading="eager"')}</div>
      <div class="ci-3">${img('consultoria-ia-chip-inteligencia-artificial', 'Chip com a sigla AI em uma placa de circuito, símbolo da inteligência artificial', 'width="360" height="360" loading="eager"')}</div>
      <div class="ci-selo"><span class="ico-caixa">${iAlvo}</span><span><b>Do diagnóstico</b>à IA na rotina da empresa</span></div>
    </div>
  </div>
</section>

<section class="secao secao-topo">
  <div class="in ia-oque">
    <div>
      <span class="rotulo">O que é</span>
      <h2>O que faz uma consultoria em IA?</h2>
      <p>Uma consultoria em inteligência artificial ajuda a empresa a sair da curiosidade e chegar ao uso com resultado. Em vez de começar pela ferramenta, começamos pelo processo: onde a equipe perde tempo, onde o cliente espera resposta e onde a informação já existe, mas ninguém consegue usar.</p>
      <p>A partir disso, a Overtus desenha o plano de IA da empresa, escolhe as tecnologias certas para cada caso e implanta as soluções conectadas aos sistemas que você já usa. A equipe é treinada e acompanhada até a IA fazer parte da rotina.</p>
    </div>
    <aside class="painel ia-resumo">
      <h3>Na consultoria em IA da Overtus</h3>
      <ul class="check">${['Diagnóstico dos processos e dos dados da empresa', 'Plano de IA com prioridades, ganhos e riscos', 'Piloto funcionando com dados reais', 'Implantação integrada a WhatsApp, ERP e CRM', 'Treinamento da equipe e política de uso de IA'].map(x => `<li>${check}${x}</li>`).join('')}</ul>
    </aside>
  </div>
</section>

<section class="secao">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Aplicações</span><h2>Onde a inteligência artificial traz retorno para empresas B2B.</h2></div><p class="lead">Os usos que mais aparecem nos diagnósticos de indústrias, distribuidoras e empresas de serviços técnicos.</p></div>
    <div class="ia-casos">
      <a class="ia-caso ia-caso-destaque" href="${L('orcamentos')}">
        <span class="ico-caixa">${iDoc}</span>
        <h3>Orçamentos e propostas</h3>
        <p>Um agente de IA recebe o pedido, calcula com a sua tabela e as suas regras, envia a proposta no padrão da empresa e cobra o retorno do comprador.</p>
        <span class="link">Ver orçamentos automatizados ${seta}</span>
      </a>
      ${IA.casos.map(([ic, t, d]) => `<article class="ia-caso"><span class="ico-caixa">${ic}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="orc-prazo" id="como-funciona">
  <div class="in">
    <div class="orc-prazo-painel">
      <span class="rotulo">Como funciona</span>
      <h2 class="orc-prazo-grande">Consultoria em IA em cinco etapas: <span>do diagnóstico à IA na rotina.</span></h2>
      <ol class="orc-prazo-linha ia-linha">${IA.metodo.map(([t, d], i) => `<li><b>${num(i)}</b><h3>${t}</h3><span>${d}</span></li>`).join('')}</ol>
    </div>
  </div>
</section>

<section class="secao orc-funcoes">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">Entregas</span><h2>O que a sua empresa recebe.</h2></div><p class="lead">Plano, solução funcionando e equipe preparada: a consultoria termina com a IA em uso, não com um relatório na gaveta.</p></div>
    <ol class="orc-func">${IA.entregas.map(([t, d, itens], i) => `<li><span class="orc-num">${num(i)}</span><div><h3>${t}</h3><p>${d}</p></div><ul class="check">${itens.map(x => `<li>${check}${x}</li>`).join('')}</ul></li>`).join('')}</ol>
  </div>
</section>

<section class="secao">
  <div class="in">
    <div class="sec-centro"><span class="rotulo">Por que uma consultoria</span><h2>Usar IA por conta própria ou com uma consultoria em IA?</h2><p class="lead">Muitas iniciativas de IA nas empresas param no teste. A diferença está em começar pelo problema certo e cuidar dos dados.</p></div>
    <div class="orc-tabela" role="table" aria-label="Comparação entre usar IA por conta própria e com consultoria">
      <div class="orc-tl orc-tl-cab" role="row"><span role="columnheader"></span><span role="columnheader">Por conta própria</span><span role="columnheader">Com a consultoria em IA</span></div>
      ${IA.compara.map(([a, b, c]) => `<div class="orc-tl" role="row"><b role="rowheader">${a}</b><span role="cell">${b}</span><span role="cell">${check}${c}</span></div>`).join('')}
    </div>
  </div>
</section>

<section class="secao secao-topo">
  <div class="in ia-seguranca">
    <div class="ia-seguranca-foto">${FOTO_IA('consultoria-ia-infraestrutura-de-dados', 'Profissionais em sala de servidores avaliando a segurança dos dados da empresa')}</div>
    <div>
      <span class="rotulo">Segurança e LGPD</span>
      <h2>Inteligência artificial com os dados da empresa protegidos.</h2>
      <p class="lead">Cada projeto define quem acessa o quê, quais informações podem ser usadas e onde a decisão continua sendo de uma pessoa.</p>
      <ul class="check">${IA.seguranca.map(x => `<li>${check}${x}</li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="secao" style="padding-top:0">
  <div class="in">
    <div class="painel ia-setores">
      <div><span class="rotulo">Setores</span><h2>Consultoria em IA para o seu setor.</h2><p>Conhecemos a forma como cada setor vende e atende. Veja como trabalhamos em cada um:</p></div>
      <div class="chips">${setores.map(s => `<a class="chip" href="${L('setores/' + s.slug)}">${s.nome}</a>`).join('')}</div>
    </div>
  </div>
</section>

<section class="secao secao-topo">
  <div class="in orc-faq-in">
    <div><span class="rotulo">Perguntas frequentes</span><h2>Dúvidas sobre consultoria em IA.</h2><p class="lead">Outra dúvida? Fale pelo <a href="${site.whatsappLink}" target="_blank" rel="noopener">WhatsApp</a> ou escreva para <a href="mailto:${site.email}">${site.email}</a>.</p></div>
    <div class="faq">${IA.perguntas.map(([q, r]) => `<details><summary>${q}</summary><p>${r}</p></details>`).join('')}</div>
  </div>
</section>

<section class="cta">
  <div class="in">
    <div class="painel painel-azul">
      <div><span class="rotulo">Diagnóstico</span><h2>Onde a inteligência artificial pode ajudar a sua empresa?</h2><p>Em 30 minutos entendemos como a sua empresa trabalha hoje e apontamos os primeiros usos da IA com mais retorno.</p>
      <div class="acoes">${agendar('Agendar diagnóstico')}<a class="btn btn-sec" href="${L('servicos/sistemas')}">Ver sistemas e automação</a></div><p class="nota">Conversa sem compromisso, por vídeo.</p></div>
      <div class="cta-lado cartao aba-cartao">
        <h4>Agendar conversa</h4>
        <div class="campo"><span>Agenda</span><div>${iCal}cal.com/overtus · 30 minutos, por vídeo</div></div>
        <div class="campo"><span>E-mail</span><div>${iMail}<a href="mailto:${site.email}">${site.email}</a></div></div>
        <div class="campo"><span>WhatsApp</span><div>${iWhats}<a href="${site.whatsappLink}" target="_blank" rel="noopener">${site.whatsapp}</a></div></div>
      </div>
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
// Endereço antigo da vitrine (/cases/, 2026-11-05) leva para /projetos/.
fs.mkdirSync(path.join(pub, 'cases'), { recursive: true });
fs.writeFileSync(path.join(pub, 'cases', 'index.html'), '<!doctype html><meta charset="utf-8"><title>Projetos · Overtus</title><meta name="robots" content="noindex"><link rel="canonical" href="/projetos/"><meta http-equiv="refresh" content="0; url=/projetos/"><a href="/projetos/">Projetos</a>\n');
// Sitemap e robots.txt de www.overtus.com.br (o worker serve esta pasta na raiz do domínio).
const hoje = new Date().toISOString().slice(0, 10);
const prioridade = slug => slug === 'index' ? '1.0' : ['consultoria-ia', 'orcamentos', 'servicos'].includes(slug) ? '0.9' : '0.7';
const imagensSitemap = { 'consultoria-ia': [['consultoria-ia-assistente-inteligencia-artificial', 'Assistente de inteligência artificial para empresas'], ['consultoria-ia-workshop-diagnostico', 'Workshop de diagnóstico de consultoria em IA'], ['consultoria-ia-chip-inteligencia-artificial', 'Chip de inteligência artificial'], ['consultoria-ia-infraestrutura-de-dados', 'Infraestrutura de dados para IA']] };
fs.writeFileSync(path.join(pub, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${Object.keys(P).map(slug => `  <url><loc>${site.dominio}${L(slug)}</loc><lastmod>${hoje}</lastmod><priority>${prioridade(slug)}</priority>${(imagensSitemap[slug] || []).map(([n, t]) => `<image:image><image:loc>${site.dominio}/assets/img/${n}.webp</image:loc><image:title>${esc(t)}</image:title></image:image>`).join('')}</url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(pub, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.dominio}/sitemap.xml\n`);
console.log(`agencia: ${Object.keys(P).length} páginas`);
