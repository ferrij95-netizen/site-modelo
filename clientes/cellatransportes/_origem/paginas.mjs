// Monta as páginas das versões A ("Folder": fiel ao site e ao folder atuais, faixa de telefones no topo, menu com ícones,
// abertura vermelha com a frota, carrossel de cargas, missão/visão/valores e contato com mapa) e B ("Prancha": técnica,
// fundo claro, cotas de medida como grafismo, pedido de cotação logo na abertura, mapa de coleta e etapas da carga).
// Estilos em public/assets/{base,a,b}.css, comportamento em public/assets/site.js.
import fs from 'node:fs';
import path from 'node:path';
import { empresa as E, textos as T, servicos, modalidades, coletas, ufsColeta, nomesUf, cargas } from './conteudo.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const tamanhos = JSON.parse(fs.readFileSync(path.join(aqui, 'tamanhos.json'), 'utf8'));
const mapaBr = JSON.parse(fs.readFileSync(path.join(aqui, 'mapa-br.json'), 'utf8'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (src, alt, extra = '', lazy = true) => {
  const [w, h] = tamanhos[src] || [1200, 800];
  return `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async"${extra}>`;
};

export const nomesVersao = { a: 'Folder', b: 'Prancha' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '', ic: 'casa' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/', ic: 'predio' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/', ic: 'engrenagem' },
  { slug: 'cargas', nome: 'Cargas', caminho: 'cargas/', ic: 'caixa' },
  { slug: 'cobertura', nome: 'Cobertura', caminho: 'cobertura/', ic: 'mapa' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/', ic: 'fone' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  esq: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  casa: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  predio: '<path d="M4 21V5l8-2v18M12 8l8 2v11M3 21h18M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2"/>',
  engrenagem: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  caixa: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  mapa: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  fone: '<path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="2" y="14" width="5" height="6" rx="1.5"/><rect x="17" y="14" width="5" height="6" rx="1.5"/>',
  caminhao: '<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  regua: '<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
  cinta: '<path d="M4 4l16 16M20 4L4 20"/><rect x="8" y="8" width="8" height="8" rx="1"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  estrela: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  troca: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
  chave: '<path d="M14 7a4 4 0 11-3.5 6L4 19.5V22h3v-2h2v-2h2l1.5-1.5A4 4 0 0114 7z"/>',
  carrinho: '<path d="M3 4h2l2.5 11h11L21 7H7"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  pacotes: '<rect x="3" y="11" width="8" height="8"/><rect x="13" y="11" width="8" height="8"/><rect x="8" y="3" width="8" height="8"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const icColeta = ['troca', 'chave', 'carrinho', 'pacotes'];
const waLink = (txt = 'Olá! Vim pelo site da Cella Transportes e gostaria de um orçamento de frete.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;
const logo = (branco = false, cls = 'logo') => `<img class="${cls}" src="/assets/logo${branco ? '-branco' : ''}.svg" alt="Cella Transportes" width="2026" height="1133">`;

// ---------- mapa do Brasil (estados de coleta em destaque, Chapecó marcado) ----------
const CHAPECO = [(-52.62 + 74.1) * (600 / 39.4), (5.3 + 27.1) * (600 / 39.4)];
function mapa({ rotas = false, rotulos = true, cls = 'mapa-br' } = {}) {
  const ufs = Object.entries(mapaBr.uf).map(([uf, d]) => {
    const col = ufsColeta.includes(uf);
    return `<path class="uf${col ? ' col' : ''}" data-uf="${uf}" data-nome="${nomesUf[uf]}" d="${d}"><title>${nomesUf[uf]}: ${col ? 'coleta e entrega' : 'entrega'}</title></path>`;
  }).join('');
  const peq = new Set(['DF', 'SE', 'AL', 'PB', 'RN', 'PE', 'ES', 'RJ']);
  const tags = rotulos ? Object.entries(mapaBr.c).filter(([uf]) => !peq.has(uf) || ufsColeta.includes(uf)).map(([uf, [x, y]]) => {
    const aj = { RJ: [6, 8], ES: [10, 0], SC: [12, 4], PE: [0, 0], RS: [4, 0], GO: [0, 6], MG: [6, 0], PR: [6, 0] }[uf] || [0, 0];
    return `<text class="uf-t${ufsColeta.includes(uf) ? ' col' : ''}" x="${(x + aj[0]).toFixed(1)}" y="${(y + aj[1]).toFixed(1)}">${uf}</text>`;
  }).join('') : '';
  const linhas = rotas ? ufsColeta.filter(u => u !== 'SC').map((uf, i) => {
    const [x, y] = mapaBr.c[uf]; const [cx, cy] = CHAPECO;
    const mx = (x + cx) / 2 + (y - cy) * 0.18, my = (y + cy) / 2 - (x - cx) * 0.18;
    return `<path class="rota" style="--i:${i}" d="M${cx.toFixed(1)} ${cy.toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${x} ${y}"/>`;
  }).join('') : '';
  return `<svg class="${cls}" viewBox="0 0 ${mapaBr.w} ${mapaBr.h}" role="img" aria-label="Mapa do Brasil com os ${ufsColeta.length} estados de coleta em destaque e entrega em todos os estados">${ufs}${linhas}${tags}<g class="base"><circle cx="${CHAPECO[0].toFixed(1)}" cy="${CHAPECO[1].toFixed(1)}" r="11" class="pulso"/><circle cx="${CHAPECO[0].toFixed(1)}" cy="${CHAPECO[1].toFixed(1)}" r="5.5"/><text x="${(CHAPECO[0] - 14).toFixed(1)}" y="${(CHAPECO[1] + 4).toFixed(1)}" text-anchor="end">Chapecó</text></g></svg>`;
}

// ---------- moldura ----------
function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
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
<meta name="theme-color" content="${v === 'a' ? '#8E1A1F' : '#ffffff'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,600;0,700;0,800;1,700;1,800;1,900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>
<body class="v-${v}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>`;
}

const linkNav = (v, atual, cls = '') => nav.map(n => `<li><a class="${cls}" href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${v === 'a' ? ic(n.ic) : ''}<span>${n.nome}</span></a></li>`).join('');

function topoA(atual) {
  return `<header class="topo">
  <div class="faixa"><div class="in">
    <p>${ic('pin')} ${E.cidade} · ${E.uf} · atendemos todo o Brasil</p>
    <ul>${E.fones.map(f => `<li><a href="tel:${f.href}">${ic(f.rotulo === 'WhatsApp' ? 'wa' : 'tel')} ${f.txt}</a></li>`).join('')}<li><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></li></ul>
  </div></div>
  <div class="barra"><div class="in">
    <a class="marca" href="/a/">${logo()}<span>Cella &amp; Cia<br>Transportes</span></a>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu">${ic('menu')}<span>Menu</span></button>
    <nav id="menu" aria-label="Principal"><ul>${linkNav('a', atual)}</ul><a class="btn btn-verm" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} Orçamento</a></nav>
  </div></div>
</header>`;
}

function topoB(atual) {
  return `<header class="topo">
  <div class="in barra">
    <a class="marca" href="/b/">${logo()}</a>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu">${ic('menu')}<span>Menu</span></button>
    <nav id="menu" aria-label="Principal"><ul>${linkNav('b', atual)}</ul>
      <a class="fone-topo" href="tel:${E.fones[0].href}"><small>Comercial</small>${E.fones[0].txt}</a>
      <a class="btn btn-verm" href="/b/contato/#cotacao">Pedir cotação</a></nav>
  </div>
</header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(true)}<p>${T.especialidade}</p></div>
  <div><h2>Páginas</h2><ul>${nav.map(n => `<li><a href="/${v}/${n.caminho}">${n.nome}</a></li>`).join('')}</ul></div>
  <div><h2>Fale com a Cella</h2><ul>${E.fones.map(f => `<li><a href="tel:${f.href}">${f.txt}</a> <small>${f.rotulo}</small></li>`).join('')}<li><a href="mailto:${E.email}">${E.email}</a></li></ul></div>
  <div><h2>Onde estamos</h2><p>${E.cidade} · Santa Catarina<br>Coleta em ${ufsColeta.length} estados, entrega em todo o Brasil</p><p><a href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Ver no mapa</a></p></div>
</div><div class="in rod-fim"><p>© ${new Date().getFullYear()} ${E.razao}</p><p>Proposta de site · Overtus</p></div></footer>
<a class="wa-flutua" href="${waLink()}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${ic('wa')}</a>
</body>
</html>`;
}

const pagina = (v, slug, titulo, desc, corpo) => {
  const n = nav.find(x => x.slug === slug);
  return `${head(v, n.caminho, titulo, desc)}
${v === 'a' ? topoA(slug) : topoB(slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}`;
};

// formulário de orçamento: monta a mensagem e abre WhatsApp ou e-mail
const opcoesUf = (lista, vazio) => `<option value="">${vazio}</option>` + lista.map(u => `<option value="${u}">${u} · ${nomesUf[u]}</option>`).join('');
const todasUf = Object.keys(nomesUf).sort();
function formOrcamento(cls = '') {
  return `<form class="form ${cls}" data-form data-assunto="Orçamento de frete pelo site" data-email="${E.email}" data-wa="${E.wa}">
  <div class="campos">
    <label><span>Nome</span><input name="Nome" required autocomplete="name"></label>
    <label><span>Empresa</span><input name="Empresa" autocomplete="organization"></label>
    <label><span>Telefone</span><input name="Telefone" type="tel" required autocomplete="tel"></label>
    <label><span>E-mail</span><input name="E-mail" type="email" autocomplete="email"></label>
    <label><span>Coleta (estado)</span><select name="Coleta">${opcoesUf(ufsColeta, 'Escolha')}</select></label>
    <label><span>Entrega (estado)</span><select name="Entrega">${opcoesUf(todasUf, 'Escolha')}</select></label>
    <label class="largo"><span>O que vamos levar</span><textarea name="Carga" rows="4" placeholder="Equipamento, peso aproximado e medidas (comprimento × largura × altura)"></textarea></label>
  </div>
  <div class="enviar"><button class="btn btn-verm" name="via" value="wa">${ic('wa')} Enviar pelo WhatsApp</button><button class="btn btn-linha" name="via" value="email">${ic('mail')} Enviar por e-mail</button></div>
</form>`;
}

// ====================================================================================
// VERSÃO A · Folder
// ====================================================================================
const A = {};

const cabecalhoA = (sobre, titulo, texto, foto) => `<section class="cab-pag">
  <div class="cab-foto">${img(foto, '', '', false)}</div>
  <div class="in"><p class="sobre">${sobre}</p><h1>${titulo}</h1>${texto ? `<p>${texto}</p>` : ''}</div>
</section>`;

const coletasA = () => `<section class="coletas"><div class="in">
  <div class="tit-lado"><p class="sobre">Coleta</p><h2>Coletamos equipamentos para</h2></div>
  <ol class="coleta-lista">${coletas.map((c, i) => `<li>${ic(icColeta[i])}<h3>${c.nome}</h3><p>${c.txt}</p></li>`).join('')}</ol>
</div></section>`;

const faixaUfA = () => `<section class="faixa-uf"><div class="in">
  <div><p class="sobre">Estados de coleta</p><ul class="ufs">${ufsColeta.map(u => `<li title="${nomesUf[u]}">${u}</li>`).join('')}</ul></div>
  <div class="entrega"><p class="sobre">Estados de entrega</p><p class="todos">Todos os estados brasileiros</p><a class="link" href="/a/cobertura/">Ver o mapa ${ic('seta')}</a></div>
</div></section>`;

const carrosselA = (titulo = 'Cargas que já levamos') => `<section class="carrossel" data-carrossel><div class="in">
  <div class="tit-linha"><div><p class="sobre">Galeria</p><h2>${titulo}</h2></div><div class="setas"><button data-ant aria-label="Anterior">${ic('esq')}</button><button data-prox aria-label="Próxima">${ic('seta')}</button></div></div>
</div>
<ul class="trilha" data-trilha>${cargas.map(c => `<li><figure>${img(c.foto, c.tit)}<figcaption><b>${c.tit}</b><span>${c.txt}</span></figcaption></figure></li>`).join('')}</ul>
<div class="in"><a class="link" href="/a/cargas/">Ver todas as cargas ${ic('seta')}</a></div>
</section>`;

const mvvA = () => `<section class="mvv"><div class="in">
  <figure class="mvv-foto">${img('frota-volvo', 'Volvo FH da Cella Transportes com bitrem lonado')}</figure>
  <div class="mvv-texto">
    <p class="sobre">Missão, visão e valores</p>
    <dl><div><dt>Missão</dt><dd>${T.missao}</dd></div><div><dt>Visão</dt><dd>${T.visao}</dd></div></dl>
    <h3>Valores</h3><ul class="valores">${T.valores.map(x => `<li>${x}</li>`).join('')}</ul>
  </div>
</div></section>`;

const contatoA = (comMapa = true) => `<section class="contato" id="orcamento"><div class="in">
  <div class="tit-centro"><p class="sobre">Contato</p><h2>Faça seu orçamento conosco</h2></div>
  <ul class="canais">
    <li>${ic('pin')}<b>${E.cidade} · ${E.uf}</b><span>Atendemos todo o Brasil</span></li>
    <li>${ic('tel')}<b>${E.fones.map(f => `<a href="tel:${f.href}">${f.txt}</a>`).join('<br>')}</b><span>Comercial, WhatsApp e celular</span></li>
    <li>${ic('mail')}<b><a href="mailto:${E.email}">${E.email}</a></b><span>Resposta em horário comercial</span></li>
  </ul>
  ${formOrcamento()}
</div>${comMapa ? `<iframe class="mapa-g" src="${E.mapaEmbed}" title="Cella Transportes no mapa" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>` : ''}</section>`;

A.index = () => pagina('a', 'index', 'Cella Transportes · Transporte de equipamentos industriais e frigoríficos · Chapecó SC', T.especialidade, `
<section class="abre">
  <div class="abre-texto"><div class="abre-in">
    <p class="sobre">Chapecó · Santa Catarina</p>
    <h1>Transporte de equipamentos frigoríficos, industriais e pesados</h1>
    <p class="lead">${T.intro}</p>
    <div class="acoes"><a class="btn btn-branco" href="#orcamento">Faça seu orçamento</a><a class="btn btn-contorno" href="/a/servicos/">Nossos serviços</a></div>
    <ul class="abre-num"><li><b>${ufsColeta.length}</b><span>estados de coleta</span></li><li><b>27</b><span>estados de entrega</span></li><li><b>${E.google.nota}</b><span>nota no Google</span></li></ul>
  </div></div>
  <div class="abre-frota"><div class="listras"></div>${logo(false, 'abre-logo')}${img('frota-recorte', 'Três cavalos mecânicos Volkswagen Constellation com a marca Cella', ' class="frota"', false)}<div class="chao"></div></div>
</section>
${coletasA()}
<section class="servicos-a"><div class="in">
  <div class="tit-centro"><p class="sobre">Serviços</p><h2>O que a Cella transporta</h2></div>
  <div class="serv-grade">${servicos.map((s, i) => `<article class="serv serv-${i}">${img(s.id === 'insumos' ? 'engradados' : s.foto, s.nome)}<div><h3>${s.nome}</h3><p>${s.txt}</p><a class="link" href="/a/servicos/#${s.id}">Saiba mais ${ic('seta')}</a></div></article>`).join('')}</div>
</div></section>
<section class="modos"><div class="in">
  ${modalidades.map((m, i) => `<div class="modo modo-${i}"><p class="sobre">Modalidade · ${m.sub}</p><h2>${m.nome}</h2><p>${m.txt}</p></div>`).join('')}
</div></section>
${faixaUfA()}
${carrosselA()}
${mvvA()}
${contatoA()}`);

A.empresa = () => pagina('a', 'empresa', 'Empresa · Cella Transportes', `${T.intro} Missão, visão e valores da Cella.`, `
${cabecalhoA('Empresa', 'Cella &amp; Cia Transportes', T.intro, 'tanque-actros')}
<section class="sobre-emp"><div class="in">
  <div class="texto">
    <h2>Do polo de equipamentos de Chapecó para o Brasil</h2>
    <p>${T.especialidade}</p>
    <p>Chapecó concentra fabricantes de equipamentos para frigoríficos e para a indústria. A Cella está perto deles e se especializou em levar o que sai dessas fábricas: tanques, silos, estruturas e máquinas, muitas vezes com medidas fora do padrão.</p>
    <p>Trabalhamos com carga dedicada e com carga compartilhada, coletamos em ${ufsColeta.length} estados e entregamos em todos os estados brasileiros.</p>
  </div>
  <figure class="frota-fig">${img('frota-constellation', 'Frota Volkswagen Constellation da Cella Transportes')}<figcaption>Frota Cella: cavalos Volkswagen Constellation.</figcaption></figure>
</div></section>
${mvvA()}
<section class="numeros-a"><div class="in">
  <div><b>${ufsColeta.length}</b><span>estados de coleta</span></div>
  <div><b>27</b><span>estados de entrega</span></div>
  <div><b>2</b><span>modalidades: dedicada e compartilhada</span></div>
  <div><b>${E.google.nota}</b><span>nota no Google, ${E.google.avaliacoes} avaliações</span></div>
</div></section>
${carrosselA('A frota em serviço')}`);

A.servicos = () => pagina('a', 'servicos', 'Serviços · Cella Transportes', 'Transporte de equipamentos industriais, de insumos e de equipamentos com medidas especiais, em carga dedicada ou compartilhada.', `
${cabecalhoA('Serviços', 'Transporte de equipamentos, do pequeno ao fora de medida', 'Equipamentos industriais, insumos e cargas com medidas especiais, em carga dedicada ou compartilhada.', 'largura-320')}
<section class="serv-det"><div class="in">
  ${servicos.map((s, i) => `<article id="${s.id}" class="det det-${i % 2}"><figure>${img(s.foto, s.nome)}</figure><div><p class="sobre">0${i + 1}</p><h2>${s.nome}</h2><p>${s.txt}</p></div></article>`).join('')}
</div></section>
<section class="modos"><div class="in">
  ${modalidades.map((m, i) => `<div class="modo modo-${i}"><p class="sobre">Modalidade · ${m.sub}</p><h2>${m.nome}</h2><p>${m.txt}</p><ul>${m.pontos.map(p => `<li>${ic('ok')} ${p}</li>`).join('')}</ul></div>`).join('')}
</div></section>
${coletasA()}
<section class="cuidado"><div class="in">
  <div class="tit-lado"><p class="sobre">Segurança da carga</p><h2>Norma técnica em cada viagem</h2><p>Na carga compartilhada, cada volume segue a norma técnica de espaçamento, amarração e fixação. Nos equipamentos com medidas especiais, a carga sai sinalizada.</p></div>
  <ul class="cuid-lista">
    <li>${ic('regua')}<b>Espaçamento</b><span>Distância entre cargas conforme a norma técnica.</span></li>
    <li>${ic('cinta')}<b>Amarração</b><span>Cintas e catracas em toda a extensão da carga.</span></li>
    <li>${ic('caixa')}<b>Fixação</b><span>Cada volume fixo na carroceria para não se mover.</span></li>
    <li>${ic('caminhao')}<b>Sinalização</b><span>Placas de largura nas cargas com medidas especiais.</span></li>
  </ul>
</div></section>
${contatoA(false)}`);

A.cargas = () => {
  const tipos = [...new Set(cargas.map(c => c.tipo))];
  return pagina('a', 'cargas', 'Cargas transportadas · Cella Transportes', 'Fotos de equipamentos frigoríficos, industriais e cargas com medidas especiais transportados pela Cella.', `
${cabecalhoA('Galeria', 'Cargas que já levamos', 'Fotos reais de equipamentos transportados pela Cella: tanques de inox, vasos, estruturas e máquinas.', 'tanque-actros-vermelho')}
<section class="galeria"><div class="in">
  <div class="filtros" role="group" aria-label="Filtrar por tipo"><button data-filtro="" aria-pressed="true">Todas</button>${tipos.map(t => `<button data-filtro="${t}" aria-pressed="false">${t}</button>`).join('')}</div>
  <ul class="gal-grade" data-grade>${cargas.map((c, i) => `<li data-tipo="${c.tipo}" class="g-${i === 0 ? 0 : 1}"><figure>${img(c.foto, c.tit)}<figcaption><small>${c.tipo}</small><b>${c.tit}</b><span>${c.txt}</span></figcaption></figure></li>`).join('')}</ul>
</div></section>
${contatoA(false)}`);
};

A.cobertura = () => pagina('a', 'cobertura', 'Cobertura · Cella Transportes', `Coleta em ${ufsColeta.length} estados e entrega em todos os estados brasileiros, a partir de Chapecó (SC).`, `
${cabecalhoA('Cobertura', 'De Chapecó para todo o Brasil', `Coletamos em ${ufsColeta.length} estados e entregamos em todos os estados brasileiros.`, 'tanque-cargo')}
<section class="cobertura-a"><div class="in">
  <div class="mapa-box" data-mapa>${mapa()}<p class="mapa-info" data-mapa-info aria-live="polite">Passe o dedo ou o mouse sobre um estado.</p></div>
  <div class="cob-texto">
    <h2>Estados de coleta</h2>
    <ul class="ufs ufs-claro">${ufsColeta.map(u => `<li title="${nomesUf[u]}">${u}</li>`).join('')}</ul>
    <h2>Estados de entrega</h2>
    <p class="todos">Todos os estados brasileiros</p>
    <p class="leg"><i class="l-col"></i> coleta e entrega <i class="l-ent"></i> entrega</p>
    <a class="btn btn-verm" href="${waLink('Olá! Vim pelo site da Cella Transportes. Gostaria de saber se vocês atendem a minha rota.')}" target="_blank" rel="noopener">${ic('wa')} Consultar minha rota</a>
  </div>
</div></section>
${coletasA()}`);

A.contato = () => pagina('a', 'contato', 'Contato · Cella Transportes', `Orçamento de frete: ${E.fones[0].txt}, WhatsApp ${E.fones[1].txt}, ${E.email}.`, `
${cabecalhoA('Contato', 'Faça seu orçamento', 'Conte o que precisa levar, de onde e para onde. Respondemos pelo WhatsApp ou por e-mail.', 'silos-iveco')}
${contatoA()}`);

// ====================================================================================
// VERSÃO B · Prancha
// ====================================================================================
const B = {};
// cota: linha de medida |<——>| usada como grafismo nos títulos
const cota = (txt = '') => `<span class="cota" aria-hidden="true"><i></i>${txt ? `<em>${txt}</em>` : ''}<i></i></span>`;
const tituloB = (sobre, h, nivel = 'h2') => `<div class="tit-b"><p class="sobre">${sobre}</p><${nivel}>${h}</${nivel}>${cota()}</div>`;

const cotacaoRapida = () => `<form class="cot-rapida" data-form data-assunto="Cotação rápida pelo site" data-email="${E.email}" data-wa="${E.wa}">
  <p class="cot-tit">Cotação rápida</p>
  <label><span>Coleta</span><select name="Coleta">${opcoesUf(ufsColeta, 'Estado')}</select></label>
  <label><span>Entrega</span><select name="Entrega">${opcoesUf(todasUf, 'Estado')}</select></label>
  <label class="cot-carga"><span>Carga</span><input name="Carga" placeholder="Ex.: tanque de inox, 9 m × 3,2 m"></label>
  <button class="btn btn-verm" name="via" value="wa">${ic('wa')} Cotar</button>
</form>`;

const etapasB = () => `<section class="etapas-b"><div class="in">
  ${tituloB('Como sua carga viaja', 'Da doca do fornecedor à sua unidade')}
  <ol class="etapas">
    <li><span class="n">01</span>${ic('fone')}<h3>Orçamento</h3><p>Você conta o equipamento, as medidas e a rota. Indicamos carga dedicada ou compartilhada.</p></li>
    <li><span class="n">02</span>${ic('carrinho')}<h3>Coleta</h3><p>Coletamos no fornecedor, em outra unidade do grupo ou na assistência técnica, em ${ufsColeta.length} estados.</p></li>
    <li><span class="n">03</span>${ic('cinta')}<h3>Amarração</h3><p>Espaçamento, amarração e fixação conforme norma técnica. Sinalização nas cargas largas.</p></li>
    <li><span class="n">04</span>${ic('caminhao')}<h3>Viagem</h3><p>Dedicada, sem paradas para outros clientes, ou compartilhada, com custo dividido.</p></li>
    <li><span class="n">05</span>${ic('ok')}<h3>Entrega</h3><p>Entrega em qualquer estado brasileiro.</p></li>
  </ol>
</div></section>`;

const mapaB = (cheio = false) => `<section class="mapa-b${cheio ? ' cheio' : ''}"><div class="in">
  <div class="mapa-txt">
    ${tituloB('Cobertura', `Coleta em ${ufsColeta.length} estados.<br>Entrega em todo o Brasil.`)}
    <p>A base fica em Chapecó (SC). As linhas mostram de onde já coletamos equipamentos; a entrega vai para qualquer estado.</p>
    <ul class="ufs-b">${ufsColeta.map(u => `<li><b>${u}</b> ${nomesUf[u]}</li>`).join('')}</ul>
    <p class="mapa-info" data-mapa-info aria-live="polite">Passe o dedo ou o mouse sobre um estado.</p>
  </div>
  <div class="mapa-box" data-mapa>${mapa({ rotas: true })}</div>
</div></section>`;

const comparaB = () => `<section class="compara"><div class="in">
  ${tituloB('Modalidades', 'Dedicada ou compartilhada?')}
  <div class="tab-wrap"><table>
    <thead><tr><th scope="col"><span class="sr">Item</span></th>${modalidades.map(m => `<th scope="col">${m.nome}<small>${m.sub}</small></th>`).join('')}</tr></thead>
    <tbody>
      <tr><th scope="row">Como funciona</th>${modalidades.map(m => `<td data-m="${m.nome}">${m.txt}</td>`).join('')}</tr>
      <tr><th scope="row">Caminhão</th><td data-m="Carga dedicada">Só a sua carga</td><td data-m="Carga compartilhada">Divide espaço com outras cargas</td></tr>
      <tr><th scope="row">Prazo</th><td data-m="Carga dedicada">Extrema agilidade, sem paradas</td><td data-m="Carga compartilhada">Conforme a rota</td></tr>
      <tr><th scope="row">Norma de amarração</th><td data-m="Carga dedicada">${ic('ok')} Sim</td><td data-m="Carga compartilhada">${ic('ok')} Sim, com espaçamento entre cargas</td></tr>
      <tr><th scope="row">Indicada para</th><td data-m="Carga dedicada">Equipamentos grandes, urgentes ou com medidas especiais</td><td data-m="Carga compartilhada">Volumes menores e insumos</td></tr>
    </tbody>
  </table></div>
</div></section>`;

const galeriaB = (lim = 0) => {
  const lista = lim ? cargas.slice(0, lim) : cargas;
  const tipos = [...new Set(cargas.map(c => c.tipo))];
  return `<section class="gal-b"><div class="in">
  <div class="gal-topo">${tituloB('Cargas transportadas', lim ? 'Já passou pela nossa prancha' : 'Todas as cargas')}${lim ? `<a class="link" href="/b/cargas/">Ver as ${cargas.length} fotos ${ic('seta')}</a>` : `<div class="filtros" role="group" aria-label="Filtrar por tipo"><button data-filtro="" aria-pressed="true">Todas</button>${tipos.map(t => `<button data-filtro="${t}" aria-pressed="false">${t}</button>`).join('')}</div>`}</div>
  <ul class="gal-b-grade" data-grade>${lista.map((c, i) => `<li data-tipo="${c.tipo}" class="b-${i % 6}"><figure>${img(c.foto, c.tit)}<figcaption><b>${c.tit}</b><span>${c.tipo}</span></figcaption></figure></li>`).join('')}</ul>
</div></section>`;
};

const ctaB = () => `<section class="cta-b"><div class="in">
  <div><h2>Tem um equipamento para levar?</h2><p>Mande as medidas e a rota. A Cella responde com a cotação.</p></div>
  <div class="cta-acoes"><a class="btn btn-verm" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} WhatsApp ${E.fones[1].txt}</a><a class="btn btn-linha" href="tel:${E.fones[0].href}">${ic('tel')} ${E.fones[0].txt}</a></div>
</div></section>`;

const cabB = (sobre, titulo, texto, foto, medida) => `<section class="cab-b"><div class="in">
  <div class="cab-txt"><p class="sobre">${sobre}</p><h1>${titulo}</h1>${cota()}<p>${texto}</p></div>
  <figure class="cab-fig">${img(foto, '', '', false)}${medida ? `<figcaption class="med">${cota(medida)}</figcaption>` : ''}</figure>
</div></section>`;

B.index = () => pagina('b', 'index', 'Cella Transportes · Equipamentos industriais, frigoríficos e cargas especiais', T.especialidade, `
<section class="abre-b">
  <div class="abre-foto">${img('tanque-actros', 'Caminhão da Cella com tanque de inox de grande diâmetro em prancha', '', false)}</div>
  <div class="in abre-b-in">
    <div class="abre-b-txt">
      <p class="sobre">Transportadora · Chapecó SC</p>
      <h1>Equipamentos frigoríficos, industriais e pesados, de ponta a ponta</h1>
      <p class="lead">${T.intro}</p>
    </div>
    ${cotacaoRapida()}
  </div>
</section>
<section class="ficha"><div class="in">
  <dl>
    <div><dt>Coleta</dt><dd>${ufsColeta.length} estados</dd></div>
    <div><dt>Entrega</dt><dd>Todo o Brasil</dd></div>
    <div><dt>Modalidades</dt><dd>Dedicada · Compartilhada</dd></div>
    <div><dt>Google</dt><dd>${ic('estrela')} ${E.google.nota} <small>(${E.google.avaliacoes})</small></dd></div>
  </dl>
</div></section>
<section class="serv-b"><div class="in">
  ${tituloB('Serviços', 'Três tipos de carga, um cuidado')}
  <div class="serv-b-lista">${servicos.map((s, i) => `<a class="sb sb-${i}" href="/b/servicos/#${s.id}"><figure>${img(s.foto, s.nome)}</figure><div><span class="n">0${i + 1}</span><h3>${s.nome}</h3><p>${s.txt}</p><span class="link">Detalhes ${ic('seta')}</span></div></a>`).join('')}</div>
</div></section>
${etapasB()}
${mapaB()}
${comparaB()}
${galeriaB(6)}
${ctaB()}`);

B.empresa = () => pagina('b', 'empresa', 'Empresa · Cella Transportes', `${T.intro} Missão, visão e valores.`, `
${cabB('Empresa', 'Cella &amp; Cia Transportes', T.intro, 'frota-volvo', '')}
<section class="emp-b"><div class="in">
  <div class="emp-txt">
    <p class="destaque">${T.especialidade}</p>
    <p>Chapecó concentra fabricantes de equipamentos para frigoríficos e para a indústria. A Cella se especializou em levar o que sai dessas fábricas: tanques de inox, vasos, silos, estruturas e máquinas, muitas vezes com medidas fora do padrão.</p>
    <p>Coletamos equipamentos para transferência entre unidades do grupo, remessa para conserto e compras feitas pela sua unidade, em carga fechada, lotação ou fracionada.</p>
  </div>
  <figure class="emp-frota">${img('frota-recorte', 'Três cavalos Volkswagen Constellation com a marca Cella')}</figure>
</div></section>
<section class="mvv-b"><div class="in">
  <div class="mvv-col"><p class="sobre">Missão</p><p class="frase">${T.missao}</p></div>
  <div class="mvv-col"><p class="sobre">Visão</p><p class="frase">${T.visao}</p></div>
  <div class="mvv-val"><p class="sobre">Valores</p><ol>${T.valores.map((x, i) => `<li><span>0${i + 1}</span>${x}</li>`).join('')}</ol></div>
</div></section>
${galeriaB(6)}
${ctaB()}`);

B.servicos = () => pagina('b', 'servicos', 'Serviços · Cella Transportes', 'Equipamentos industriais, insumos e cargas com medidas especiais, em carga dedicada ou compartilhada.', `
${cabB('Serviços', 'O que a Cella transporta', 'Equipamentos industriais, insumos e equipamentos com medidas especiais.', 'largura-320', '3,20 m')}
<section class="serv-b det-b"><div class="in">
  ${servicos.map((s, i) => `<article id="${s.id}" class="linha-serv"><span class="n">0${i + 1}</span><div><h2>${s.nome}</h2><p>${s.txt}</p></div><figure>${img(s.foto, s.nome)}</figure></article>`).join('')}
</div></section>
<section class="para-b"><div class="in">
  ${tituloB('Coletamos equipamentos para', 'Quatro motivos para chamar a Cella')}
  <ol class="para-lista">${coletas.map((c, i) => `<li>${ic(icColeta[i])}<div><h3>${c.nome}</h3><p>${c.txt}</p></div></li>`).join('')}</ol>
</div></section>
${comparaB()}
${etapasB()}
${ctaB()}`);

B.cargas = () => pagina('b', 'cargas', 'Cargas transportadas · Cella Transportes', 'Fotos de equipamentos transportados pela Cella.', `
${cabB('Galeria', 'Cargas que já levamos', 'Fotos reais de tanques, vasos, estruturas e máquinas transportados pela Cella.', 'tanque-actros-vermelho', '')}
${galeriaB()}
${ctaB()}`);

B.cobertura = () => pagina('b', 'cobertura', 'Cobertura · Cella Transportes', `Coleta em ${ufsColeta.length} estados e entrega em todo o Brasil a partir de Chapecó (SC).`, `
${mapaB(true)}
${etapasB()}
${ctaB()}`);

B.contato = () => pagina('b', 'contato', 'Contato · Cella Transportes', `Cotação de frete: ${E.fones[0].txt}, WhatsApp ${E.fones[1].txt}, ${E.email}.`, `
<section class="contato-b"><div class="in">
  <div class="cont-lado">
    ${tituloB('Contato', 'Peça sua cotação', 'h1')}
    <p>Conte o equipamento, as medidas e a rota. Respondemos pelo WhatsApp ou por e-mail.</p>
    <ul class="canais-b">
      ${E.fones.map(f => `<li><a href="${f.rotulo === 'WhatsApp' ? waLink() : `tel:${f.href}`}"${f.rotulo === 'WhatsApp' ? ' target="_blank" rel="noopener"' : ''}>${ic(f.rotulo === 'WhatsApp' ? 'wa' : 'tel')}<span><small>${f.rotulo}</small>${f.txt}</span></a></li>`).join('')}
      <li><a href="mailto:${E.email}">${ic('mail')}<span><small>E-mail</small>${E.email}</span></a></li>
      <li><a href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')}<span><small>Base</small>${E.cidade} · ${E.uf}</span></a></li>
    </ul>
  </div>
  <div id="cotacao" class="cont-form">${formOrcamento('form-b')}</div>
</div>
<iframe class="mapa-g" src="${E.mapaEmbed}" title="Cella Transportes no mapa" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</section>`);

export function gerarVersao(v) {
  const P = v === 'a' ? A : B;
  return Object.fromEntries(nav.map(n => [n.slug, P[n.slug]()]));
}
