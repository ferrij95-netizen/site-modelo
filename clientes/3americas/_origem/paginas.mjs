// Monta as páginas das versões A ("Rodovia", fiel ao site atual: topo prateado, menu azul-marinho, foto da carreta,
// títulos com a faixa hachurada e o mapa-múndi de fundo) e B ("Malha", mais nova: foto cheia, frota em números,
// etapas sobre a estrada e o mapa do Brasil com as filiais). Estilos em public/assets/{base,a,b}.css.
import fs from 'node:fs';
import path from 'node:path';
import {
  empresa as E, presidente, quemSomos, segmentos, missao, visao, qualidade, compromissos, estrutura, frota, numeros, servicos, etapas,
  seguranca, filiais, ondeAtuamos, clientes, depoimentos, noticias, galerias, videos, vagas,
} from './conteudo.mjs';

const mapaDados = JSON.parse(fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), 'mapa.json'), 'utf8'));

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, cls = '', extra = '') => `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, alt, cls = '') => `<figure class="foto ${cls}">${img(n, alt)}</figure>`;
const telHref = t => `+55${t.split('·')[0].replace(/\D/g, '').replace(/^0/, '')}`;
const mapa = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const nomesVersao = { a: 'Rodovia', b: 'Malha' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'institucional', nome: 'Institucional', caminho: 'institucional/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'seguranca', nome: 'Segurança', caminho: 'seguranca/' },
  { slug: 'onde-atuamos', nome: 'Onde atuamos', caminho: 'onde-atuamos/' },
  { slug: 'comunicacao', nome: 'Comunicação', caminho: 'comunicacao/' },
  { slug: 'clientes', nome: 'Clientes', caminho: 'clientes/' },
  { slug: 'trabalhe-conosco', nome: 'Trabalhe conosco', caminho: 'trabalhe-conosco/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];
const link = (v, slug) => {
  const n = nav.find(x => x.slug === slug);
  return n ? `/${v}/${n.caminho}` : `/${v}/${slug}/`;
};

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  cadeado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  play: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
  sat: '<path d="M4 20a16 16 0 0116-16"/><path d="M8 20a12 12 0 0112-12"/><path d="M12 20a8 8 0 018-8"/><circle cx="18" cy="18" r="2"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  trava: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3M12 14v3"/>',
  check: '<path d="M5 12l4 4 10-10"/>',
  caminhao: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  galpao: '<path d="M3 21V9l9-5 9 5v12"/><path d="M7 21v-8h10v8M7 17h10"/>',
  gota: '<path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const icServ = { 'transporte-de-combustiveis': 'gota', 'transporte-de-cargas-secas-e-frigorificadas': 'caminhao', 'armazenagem-e-distribuicao': 'galpao' };
const icSeg = ['sat', 'relogio', 'trava'];

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
<meta property="og:site_name" content="Três Américas Logística e Transporte">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#003063">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Saira:ital,wdth,wght@0,100..125,500..900;1,100..125,600..900&family=Open+Sans:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
`;
}

const acesso = () => `<details class="acesso">
  <summary>${ic('cadeado')}<span>Acesso restrito</span></summary>
  <form class="acesso-form" data-acesso>
    <label>Usuário<input name="usuario" autocomplete="username"></label>
    <label>Senha<input name="senha" type="password" autocomplete="current-password"></label>
    <button class="btn btn-prim" type="submit">Entrar</button>
    <p class="acesso-aviso" hidden>O acesso restrito será ligado ao sistema da Três Américas na publicação do site.</p>
  </form>
</details>`;

function menu(v, slug) {
  return nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('');
}

function topo(v, slug) {
  const marca = `<a class="marca" href="/${v}/" aria-label="Três Américas, página inicial"><img src="/assets/${v === 'b' && slug === 'index' ? 'logo-branco' : 'logo'}.svg" alt="Três Américas Logística e Transporte" width="2355" height="755"></a>`;
  const btn = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
  if (v === 'a') return `<header class="topo">
  <div class="in topo-sup">
    ${marca}
    <div class="topo-dir">
      <a class="topo-tel" href="tel:${telHref(E.telefone)}">${ic('tel')}<span><small>Matriz Campo Grande</small>${E.telefone}</span></a>
      ${acesso()}
    </div>
    ${btn}
  </div>
  <nav id="menu" class="nav-faixa" aria-label="Principal"><ul class="in">${menu(v, slug)}</ul></nav>
</header>
<main id="conteudo">
`;
  return `<header class="topo${slug === 'index' ? ' topo-sobre' : ''}">
  <div class="in topo-linha">
    ${marca}
    <nav id="menu" aria-label="Principal"><ul>${menu(v, slug)}</ul></nav>
    ${acesso()}
    ${btn}
  </div>
</header>
<main id="conteudo">
`;
}

function rodape(v) {
  const m = filiais[0];
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca">
      <img src="/assets/logo-branco.svg" alt="Três Américas Logística e Transporte" width="2355" height="755">
      <p>Transporte rodoviário de cargas secas, frigorificadas e combustíveis, armazenagem e distribuição. Matriz em Campo Grande, MS.</p>
      <div class="rod-redes">${E.redes.map(r => `<a href="${r.url}" target="_blank" rel="noopener">${r.nome}</a>`).join('')}</div>
    </div>
    <div>
      <h3>Localização matriz</h3>
      <p><a href="${mapa(`${m.endereco}, ${m.cidade} ${m.uf}`)}" target="_blank" rel="noopener">${m.endereco}<br>${m.cidade}, ${m.uf} · CEP ${m.cep}</a><br><span class="rod-ref">${m.ref}</span></p>
    </div>
    <div>
      <h3>Contatos</h3>
      <p><a href="tel:${telHref(E.telefone)}">${E.telefone}</a><br><a href="mailto:${E.email}">${E.email}</a></p>
      <p class="rod-filiais">${filiais.slice(1).map(f => `<a href="${link(v, 'onde-atuamos')}#${slugCidade(f.cidade)}">${f.cidade} ${f.uf}</a>`).join('')}</p>
    </div>
    <div>
      <h3>Navegue</h3>
      <ul class="rod-lista">${nav.slice(1).map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul>
    </div>
  </div>
  <div class="in rod-base"><span>© ${new Date().getFullYear()} Três Américas Logística e Transporte</span><span>Campo Grande · Mato Grosso do Sul</span></div>
</footer>
<script src="/assets/site.js" defer></script>
</body>
</html>`;
}

const slugCidade = c => c.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

const pagina = (v, caminho, slug, titulo, desc, corpo) => head(v, caminho, titulo, desc) + topo(v, slug) + corpo + rodape(v);

// Título com a faixa hachurada do site atual (versão A) / título com número (versão B).
const titulo = (t, tag = 'h2', extra = '') => `<div class="tit-faixa"><${tag}${extra}>${t}</${tag}><span class="hachura" aria-hidden="true"></span></div>`;

const capa = (v, eyebrow, t, sub, f, migalha) => `<section class="capa">
  ${img(f, '', 'capa-foto', ' fetchpriority="high" loading="eager"').replace(' loading="lazy"', '')}
  <div class="in capa-txt">
    <nav class="migalha" aria-label="Você está em"><a href="/${v}/">Início</a>${migalha.map(([n, u]) => u ? ` / <a href="${u}">${n}</a>` : ` / <span>${n}</span>`).join('')}</nav>
    <p class="eyebrow">${eyebrow}</p>
    <h1>${t}</h1>
    ${sub ? `<p class="lead">${sub}</p>` : ''}
  </div>
</section>`;

// ---------- blocos ----------
const blocoNumeros = () => `<div class="numeros">${numeros.map(n => `<div class="num"><strong>${n.n}</strong><span>${n.t}</span></div>`).join('')}</div>`;

const blocoServicosCol = v => `<div class="serv-col">${servicos.map(s => `<article class="serv">
  <a class="serv-foto" href="${link(v, 'servicos')}${s.slug}/" tabindex="-1" aria-hidden="true">${img(s.foto, '')}</a>
  <h3><a href="${link(v, 'servicos')}${s.slug}/">${s.nome}</a></h3>
  <p>${s.curto}</p>
  <a class="link-seta" href="${link(v, 'servicos')}${s.slug}/">Saiba mais ${ic('seta')}</a>
</article>`).join('')}</div>`;

const blocoServicosLinhas = v => `<div class="serv-linhas">${servicos.map((s, i) => `<article class="serv-linha${i % 2 ? ' inv' : ''}">
  ${foto(s.foto, s.nome, 'serv-linha-foto')}
  <div class="serv-linha-txt">
    <span class="serv-n">0${i + 1}</span>
    <h3>${s.nome}</h3>
    <p>${s.texto[0]}</p>
    <dl class="ficha">${s.ficha.map(f => `<div><dt>${f.n}</dt><dd><b>${f.t}</b>${f.d}</dd></div>`).join('')}</dl>
    <a class="link-seta" href="${link(v, 'servicos')}${s.slug}/">Ver o serviço ${ic('seta')}</a>
  </div>
</article>`).join('')}</div>`;

const blocoEtapas = () => `<ol class="estrada" data-etapas>${etapas.map((e, i) => `<li><span class="km">${String(i + 1).padStart(2, '0')}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>`;

const blocoLogos = (limite = clientes.length) => `<ul class="logos">${clientes.slice(0, limite).map(([s, n]) => `<li>${img('clientes/' + s, n, '', ' width="300" height="160"')}</li>`).join('')}</ul>`;

const blocoFaixaLogos = () => {
  const lista = clientes.map(([s, n]) => `<li>${img('clientes/' + s, n)}</li>`).join('');
  return `<div class="faixa-logos" aria-label="Clientes"><ul>${lista}</ul><ul aria-hidden="true">${lista}</ul></div>`;
};

const blocoDepoimentos = (n = depoimentos.length) => `<div class="deps">${depoimentos.slice(0, n).map(d => `<figure class="dep">
  <button class="video" data-yt="${d.video}" aria-label="Ver o depoimento de ${esc(d.nome)} em vídeo">${img(d.foto, `${d.nome}, ${d.empresa}`)}<span class="play">${ic('play')}</span></button>
  <blockquote>“${d.texto}”</blockquote>
  <figcaption><b>${d.nome}</b> · ${d.empresa}</figcaption>
</figure>`).join('')}</div>`;

const blocoDepoimentoGiro = () => `<div class="giro" data-giro>
  <div class="giro-itens">${depoimentos.map((d, i) => `<figure class="giro-item"${i ? ' hidden' : ''}><button class="video" data-yt="${d.video}" aria-label="Ver o depoimento de ${esc(d.nome)} em vídeo">${img(d.foto, `${d.nome}, ${d.empresa}`)}<span class="play">${ic('play')}</span></button><blockquote>“${d.texto}”</blockquote><figcaption><b>${d.nome}</b> · ${d.empresa}</figcaption></figure>`).join('')}</div>
  <div class="giro-ctrl"><button data-giro-ant aria-label="Depoimento anterior">‹</button><span data-giro-n>1 / ${depoimentos.length}</span><button data-giro-prox aria-label="Próximo depoimento">›</button></div>
</div>`;

// Mapa do Brasil com os estados onde a Três Américas atua e as cidades das filiais.
function blocoMapa(cls = '') {
  const [LON0, LAT0, LATR, ESC] = mapaDados.proj;
  const k = Math.cos(LATR * Math.PI / 180);
  const P = (lat, lon) => [((lon - LON0) * k * ESC).toFixed(1), ((LAT0 - lat) * ESC).toFixed(1)];
  const estados = Object.entries(mapaDados.estados).map(([uf, d]) => `<path class="uf${ondeAtuamos.estados.includes(uf) ? ' atua' : ''}" d="${d}"><title>${uf}</title></path>`).join('');
  const rotulo = { 'Campo Grande': [10, 4, 'start'], Cuiabá: [-10, 4, 'end'], Rondonópolis: [0, 26, 'middle'], 'Aparecida de Goiânia': [10, 4, 'start'], 'Porto Velho': [-10, 4, 'end'], 'Regente Feijó': [-10, 16, 'end'], 'Rio de Janeiro': [10, 4, 'start'] };
  const pts = ondeAtuamos.regioes.flatMap(r => r.cidades).map(([c, uf, lat, lon, tipo]) => {
    const [x, y] = P(lat, lon); const r = rotulo[c];
    return `<g class="cid${tipo ? ' matriz' : ''}"><circle cx="${x}" cy="${y}" r="${tipo ? 9 : 6}"/>${r ? `<text x="${(+x + r[0]).toFixed(1)}" y="${(+y + r[1]).toFixed(1)}" text-anchor="${r[2]}">${c}${tipo ? ' · matriz' : ''}</text>` : ''}</g>`;
  }).join('');
  const [sx, sy] = P(-23.1, -46.9);
  const sp = `<text class="cid-grupo" x="${(+sx - 40).toFixed(1)}" y="${(+sy + 36).toFixed(1)}">Embu, Louveira,<tspan x="${(+sx - 40).toFixed(1)}" dy="20">Cordeirópolis, Extrema</tspan></text>`;
  return `<figure class="mapa-br ${cls}"><svg viewBox="0 0 ${mapaDados.largura} ${mapaDados.altura}" role="img" aria-label="Mapa do Brasil com os estados onde a Três Américas atua e as cidades das filiais">${estados}${pts}${sp}</svg></figure>`;
}

const blocoRegioes = () => `<div class="regioes">${ondeAtuamos.regioes.map(r => `<div class="regiao"><h3>${r.nome}</h3><ul>${r.cidades.map(([c, uf, , , t]) => `<li>${c} <span>${uf}${t ? ' · matriz' : ''}</span></li>`).join('')}</ul></div>`).join('')}</div>`;

const blocoFiliais = () => `<div class="filiais">${filiais.map(f => `<article class="filial${f.tipo === 'Matriz' ? ' filial-matriz' : ''}" id="${slugCidade(f.cidade)}">
  <p class="filial-tipo">${f.tipo}</p>
  <h3>${f.cidade} <span>${f.uf}</span></h3>
  <ul>
    ${f.endereco ? `<li>${ic('pin')}<a href="${mapa(`${f.endereco}, ${f.cidade} ${f.uf}`)}" target="_blank" rel="noopener">${f.endereco}<br>CEP ${f.cep}${f.ref ? `<br>${f.ref}` : ''}</a></li>` : `<li>${ic('pin')}<span>CEP ${f.cep}, ${f.cidade}, ${f.uf}</span></li>`}
    <li>${ic('tel')}<a href="tel:${telHref(f.tel)}">${f.tel}</a></li>
    <li>${ic('mail')}<a href="mailto:${f.email}">${f.email}</a></li>
  </ul>
  ${f.resp ? `<p class="filial-resp">Responsável operacional: <b>${f.resp}</b>${f.respEmail ? `<br><a href="mailto:${f.respEmail}">${f.respEmail}</a>` : ''}</p>` : ''}
</article>`).join('')}</div>`;

const blocoSeguranca = (v, curto) => `<div class="seg">
  <div class="seg-txt">
    <img class="onix" src="/assets/img/onixsat.png" alt="OnixSat" width="169" height="110" loading="lazy">
    <h2>${curto ? 'Carga rastreada e monitorada 24 horas por dia' : seguranca.titulo}</h2>
    ${(curto ? seguranca.texto.slice(0, 1) : seguranca.texto).map(p => `<p>${p}</p>`).join('')}
    ${curto ? `<a class="link-seta" href="${link(v, 'seguranca')}">Como protegemos a carga ${ic('seta')}</a>` : ''}
  </div>
  <ul class="seg-rec">${seguranca.recursos.map((r, i) => `<li>${ic(icSeg[i], 'ic-grande')}<div><h3>${r.t}</h3><p>${r.d}</p></div></li>`).join('')}</ul>
</div>`;

const blocoContatoFaixa = v => `<section class="faixa-contato"><div class="in fc-grade">
  <div>
    <h2>Precisa transportar ou armazenar sua carga?</h2>
    <p>Fale com a matriz em Campo Grande ou com a filial mais perto da sua operação.</p>
  </div>
  <div class="botoes"><a class="btn btn-claro" href="tel:${telHref(E.telefone)}">${ic('tel')}${E.telefone}</a><a class="btn btn-contorno" href="${link(v, 'contato')}">Solicitar contato ${ic('seta')}</a></div>
</div></section>`;

// ---------- HOME A: Rodovia (mesma ordem do site atual) ----------
function homeA() {
  const v = 'a';
  return pagina(v, '', 'index', 'Três Américas · Logística e Transporte', 'Transporte de combustíveis, cargas secas e frigorificadas, armazenagem e distribuição. Matriz em Campo Grande (MS) e filiais no Centro-Oeste, Sudeste e Norte.', `
<section class="hero">
  ${img('estrada', 'Carretas da Três Américas na rodovia', 'hero-foto', ' fetchpriority="high" loading="eager" width="1920" height="587"').replace(' loading="lazy"', '')}
  <div class="in hero-txt">
    <p class="eyebrow">Logística e transporte · Campo Grande, MS</p>
    <h1>Por onde quer que passemos, a carga chega com segurança.</h1>
    <p class="lead">Transporte de combustíveis, cargas secas e frigorificadas, armazenagem e distribuição no Centro-Oeste, Sudeste e Norte do Brasil.</p>
    <div class="botoes"><a class="btn btn-prim" href="${link(v, 'contato')}">Solicitar contato ${ic('seta')}</a><a class="btn btn-claro" href="${link(v, 'servicos')}">Nossos serviços</a></div>
  </div>
</section>
<div class="fundo-mapa">
<section class="sec"><div class="in">
  ${titulo('Serviços')}
  ${blocoServicosCol(v)}
</div></section>
<section class="sec-numeros"><div class="in">${blocoNumeros()}</div></section>
<section class="sec"><div class="in dupla-8-4">
  <div>
    ${titulo('Clientes')}
    <div class="caixa-logos">${blocoLogos(16)}<a class="link-seta" href="${link(v, 'clientes')}">Ver os ${clientes.length} clientes ${ic('seta')}</a></div>
  </div>
  <div>
    ${titulo('Depoimentos')}
    <div class="caixa-dep">${blocoDepoimentoGiro()}<a class="link-seta" href="${link(v, 'clientes')}#depoimentos">Veja todos os depoimentos ${ic('seta')}</a></div>
  </div>
</div></section>
<section class="sec sec-seg"><div class="in">${blocoSeguranca(v, true)}</div></section>
<section class="sec"><div class="in dupla-onde">
  <div>
    ${titulo('Onde atuamos')}
    <p class="lead">${ondeAtuamos.intro}</p>
    <p>${ondeAtuamos.diferencial}</p>
    ${blocoRegioes()}
    <a class="link-seta" href="${link(v, 'onde-atuamos')}">Endereços das filiais ${ic('seta')}</a>
  </div>
  ${blocoMapa()}
</div></section>
</div>
${blocoContatoFaixa(v)}
`);
}

// ---------- HOME B: Malha ----------
function homeB() {
  const v = 'b';
  return pagina(v, '', 'index', 'Três Américas · Logística e Transporte', 'Transporte de combustíveis, cargas secas e frigorificadas, armazenagem e distribuição. Matriz em Campo Grande (MS) e filiais no Centro-Oeste, Sudeste e Norte.', `
<section class="hero">
  ${img('frota', 'Carretas da Três Américas na rodovia', 'hero-foto', ' fetchpriority="high" loading="eager"').replace(' loading="lazy"', '')}
  <div class="in hero-txt">
    <p class="eyebrow">Três Américas · Logística e Transporte</p>
    <h1>Na Três Américas, tudo é levado a sério.</h1>
    <p class="lead">Combustíveis, cargas secas e frigorificadas, armazenagem e distribuição. Da matriz em Campo Grande para o Centro-Oeste, Sudeste e Norte do Brasil.</p>
    <div class="botoes"><a class="btn btn-prim" href="${link(v, 'contato')}">Solicitar contato ${ic('seta')}</a><a class="btn btn-contorno" href="${link(v, 'onde-atuamos')}">Onde atuamos</a></div>
  </div>
  <div class="hero-segmentos"><div class="in"><span>Atendemos</span>${segmentos.map(s => `<b>${s}</b>`).join('')}</div></div>
</section>
<section class="sec"><div class="in intro-b">
  <div>
    <p class="eyebrow">Quem somos</p>
    <h2>Uma das maiores frotas do Centro-Oeste, com armazéns próprios e rastreamento 24 horas.</h2>
  </div>
  <div>
    <p class="lead">${quemSomos[1]}</p>
    <a class="link-seta" href="${link(v, 'institucional')}">Conheça a Três Américas ${ic('seta')}</a>
  </div>
</div>
<div class="in">${blocoNumeros()}</div></section>
<section class="sec sec-cinza"><div class="in">
  <p class="eyebrow">Serviços</p>
  <h2 class="tit-sec">Três frentes, uma operação.</h2>
  ${blocoServicosLinhas(v)}
</div></section>
<section class="sec sec-estrada"><div class="in">
  <p class="eyebrow">Como trabalhamos</p>
  <h2 class="tit-sec">Do pátio ao destino, cada etapa acompanhada.</h2>
  ${blocoEtapas()}
</div></section>
<section class="sec sec-mapa"><div class="in dupla-onde">
  <div>
    <p class="eyebrow">Onde atuamos</p>
    <h2>${ondeAtuamos.intro}</h2>
    <p>${ondeAtuamos.diferencial}</p>
    ${blocoRegioes()}
    <a class="btn btn-claro" href="${link(v, 'onde-atuamos')}">Endereços das filiais ${ic('seta')}</a>
  </div>
  ${blocoMapa('mapa-escuro')}
</div></section>
<section class="sec"><div class="in">
  <p class="eyebrow">Clientes</p>
  <h2 class="tit-sec">Grandes empresas confiam a carga à Três Américas.</h2>
</div>
${blocoFaixaLogos()}
<div class="in">${blocoDepoimentos(3)}<a class="link-seta" href="${link(v, 'clientes')}">Todos os clientes e depoimentos ${ic('seta')}</a></div></section>
<section class="sec sec-cinza"><div class="in">${blocoSeguranca(v, true)}</div></section>
${blocoContatoFaixa(v)}
`);
}

// ---------- páginas internas ----------
function institucionalPag(v) {
  return pagina(v, 'institucional/', 'institucional', 'Institucional · Três Américas', 'Palavra do presidente, quem somos, missão, visão, gestão de qualidade, compromissos e estrutura da Três Américas Logística e Transporte.', `
${capa(v, 'Institucional', 'Transportar com eficiência, garantindo a segurança dos funcionários e produtos.', 'Palavra do presidente, quem somos, missão, visão e a estrutura que sustenta cada entrega.', 'filial-cuiaba', [['Institucional']])}
<nav class="sub-nav" aria-label="Nesta página"><div class="in"><a href="#presidente">Palavra do presidente</a><a href="#quem-somos">Quem somos</a><a href="#missao">Missão e visão</a><a href="#qualidade">Gestão de qualidade</a><a href="#compromissos">Compromissos</a><a href="#estrutura">Estrutura</a></div></nav>
<section class="sec" id="presidente"><div class="in presidente">
  ${titulo('Palavra do presidente')}
  <blockquote class="pres-citacao">${presidente.texto.map(p => `<p>${p}</p>`).join('')}<footer><b>${presidente.nome}</b><span>${presidente.cargo}</span></footer></blockquote>
</div></section>
<section class="sec sec-cinza" id="quem-somos"><div class="in dupla">
  <div>
    ${titulo('Quem somos')}
    ${quemSomos.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}
  </div>
  <div class="qs-lado">
    ${foto('armazem', 'Armazém da Três Américas com cargas paletizadas')}
    <p class="eyebrow">Segmentos atendidos</p>
    <ul class="chips">${segmentos.map(s => `<li>${s}</li>`).join('')}</ul>
  </div>
</div></section>
<section class="sec" id="missao"><div class="in mv">
  <div class="mv-item"><p class="eyebrow">Nossa missão</p><p class="mv-txt">${missao}</p></div>
  <div class="mv-item"><p class="eyebrow">Nossa visão</p><p class="mv-txt">${visao}</p></div>
</div></section>
<section class="sec sec-cinza" id="qualidade"><div class="in dupla">
  <div>
    ${titulo('Gestão de qualidade')}
    <p class="lead">${qualidade.intro}</p>
  </div>
  <ul class="lista-check">${qualidade.itens.map(q => `<li>${ic('check')}${q}</li>`).join('')}</ul>
</div></section>
<section class="sec" id="compromissos"><div class="in">
  ${titulo('Nossos compromissos')}
  <p class="lead">${compromissos.intro}</p>
  <ol class="compromissos">${compromissos.itens.map((c, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><h3>${c.titulo}</h3><p>${c.texto}</p></li>`).join('')}</ol>
</div></section>
<section class="sec sec-cinza" id="estrutura"><div class="in dupla">
  <div>
    ${titulo('Nossa estrutura')}
    <ul class="lista-check">${estrutura.map(q => `<li>${ic('check')}${q}</li>`).join('')}</ul>
  </div>
  <div>
    <p class="eyebrow">Frota</p>
    <ol class="frota-escada">${frota.map(f => `<li>${f}</li>`).join('')}</ol>
    ${foto('filial-varzea', 'Filial da Três Américas em Várzea Grande, MT')}
  </div>
</div></section>
${blocoContatoFaixa(v)}
`);
}

function servicosPag(v) {
  return pagina(v, 'servicos/', 'servicos', 'Serviços · Três Américas', 'Transporte de combustíveis, transporte de cargas secas e frigorificadas, armazenagem e distribuição.', `
${capa(v, 'Serviços', 'Transporte e armazenagem para os mais variados produtos.', 'Pneus, alimentos, higiene e limpeza, eletrônicos, medicamentos e combustíveis.', 'carreta', [['Serviços']])}
<section class="sec"><div class="in">${blocoServicosLinhas(v)}</div></section>
<section class="sec sec-cinza sec-estrada"><div class="in">
  <p class="eyebrow">Como trabalhamos</p>
  <h2 class="tit-sec">Do pátio ao destino, cada etapa acompanhada.</h2>
  ${blocoEtapas()}
</div></section>
${blocoContatoFaixa(v)}
`);
}

function servicoPag(v, s) {
  const outros = servicos.filter(x => x !== s);
  return pagina(v, `servicos/${s.slug}/`, 'servicos', `${s.nome} · Três Américas`, s.curto, `
${capa(v, 'Serviços', s.nome, s.curto, s.foto, [['Serviços', link(v, 'servicos')], [s.nome]])}
<section class="sec"><div class="in dupla serv-det">
  <div>
    ${s.texto.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}
    <a class="btn btn-prim" href="${link(v, 'contato')}">Solicitar contato ${ic('seta')}</a>
  </div>
  <dl class="ficha ficha-grande">${s.ficha.map(f => `<div><dt>${f.n}</dt><dd><b>${f.t}</b>${f.d}</dd></div>`).join('')}</dl>
</div></section>
<section class="sec sec-cinza"><div class="in">
  ${titulo('Outros serviços')}
  <div class="outros">${outros.map(o => `<a class="outro" href="${link(v, 'servicos')}${o.slug}/">${img(o.foto, '')}<span>${ic(icServ[o.slug])}${o.nome}</span></a>`).join('')}</div>
</div></section>
${blocoContatoFaixa(v)}
`);
}

function segurancaPag(v) {
  return pagina(v, 'seguranca/', 'seguranca', 'Segurança · Três Américas', 'Rastreadores OnixSat, monitoramento 24 horas, travas especiais e comunicação do motorista com a central.', `
${capa(v, 'Segurança', 'Carga rastreada do primeiro ao último quilômetro.', 'Rastreamento via satélite OnixSat e monitoramento 24 horas por dia, em tempo real.', 'estrada', [['Segurança']])}
<section class="sec"><div class="in">${blocoSeguranca(v, false)}</div></section>
<section class="sec sec-cinza"><div class="in dupla">
  <div>
    ${titulo('Motoristas e gerenciamento de risco')}
    <p>${compromissos.itens[1].texto} ${compromissos.itens[5].texto}</p>
    <p>Os motoristas são cadastrados no sistema de gerenciamento de risco e, no transporte de combustíveis, passam por cursos específicos para a operação com produtos perigosos.</p>
  </div>
  ${foto('tanque', 'Caminhão-tanque da Três Américas')}
</div></section>
${blocoContatoFaixa(v)}
`);
}

function ondePag(v) {
  return pagina(v, 'onde-atuamos/', 'onde-atuamos', 'Onde atuamos e filiais · Três Américas', 'Matriz em Campo Grande (MS) e filiais em Mato Grosso, Goiás, São Paulo e Rondônia. Endereços, telefones e responsáveis.', `
${capa(v, 'Onde atuamos', 'Presença forte no Centro-Oeste, Sudeste e Norte.', `Atuamos em ${ondeAtuamos.estadosTexto}.`, 'filial-cuiaba', [['Onde atuamos']])}
<section class="sec"><div class="in dupla-onde">
  <div>
    ${titulo('Nossa malha')}
    <p class="lead">${ondeAtuamos.diferencial}</p>
    ${blocoRegioes()}
  </div>
  ${blocoMapa()}
</div></section>
<section class="sec sec-cinza" id="filiais"><div class="in">
  ${titulo('Matriz e filiais')}
  ${blocoFiliais()}
</div></section>
`);
}

function comunicacaoPag(v) {
  return pagina(v, 'comunicacao/', 'comunicacao', 'Comunicação · Três Américas', 'Notícias, fotos e vídeos da Três Américas Logística e Transporte.', `
${capa(v, 'Comunicação', 'Notícias, fotos e vídeos.', 'Convenções, visitas técnicas, a frota e a Três Américas na imprensa.', 'convencao', [['Comunicação']])}
<nav class="sub-nav" aria-label="Nesta página"><div class="in"><a href="#noticias">Notícias</a><a href="#fotos">Fotos</a><a href="#videos">Vídeos</a></div></nav>
<section class="sec" id="noticias"><div class="in">
  ${titulo('Notícias')}
  <div class="noticias">${noticias.map((n, i) => `<article class="noticia${i === 0 ? ' noticia-dest' : ''}${n.foto ? '' : ' sem-foto'}">
    ${n.foto ? `<a class="noticia-foto" href="${n.url}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">${img(n.foto, '')}</a>` : ''}
    <div><time>${n.data}</time><h3><a href="${n.url}" target="_blank" rel="noopener">${n.titulo}</a></h3><p>${n.resumo}</p></div>
  </article>`).join('')}</div>
</div></section>
<section class="sec sec-cinza" id="fotos"><div class="in">
  ${titulo('Fotos')}
  <div class="galeria">${galerias.map((g, i) => `<a class="gal${i < 2 ? ' gal-grande' : ''}" href="/assets/img/${g.foto}.webp" target="_blank" rel="noopener">${img(g.foto, g.titulo)}<span><b>${g.titulo}</b>${g.data}</span></a>`).join('')}</div>
</div></section>
<section class="sec" id="videos"><div class="in">
  ${titulo('Vídeos')}
  <div class="videos">${videos.map(x => `<figure class="vid"><button class="video" data-yt="${x.id}" aria-label="Assistir: ${esc(x.titulo)}">${img(x.foto, '')}<span class="play">${ic('play')}</span></button><figcaption><time>${x.data}</time>${x.titulo}</figcaption></figure>`).join('')}</div>
  <p class="nota">Os depoimentos em vídeo de clientes estão na página <a href="${link(v, 'clientes')}#depoimentos">Clientes</a>.</p>
</div></section>
`);
}

function clientesPag(v) {
  return pagina(v, 'clientes/', 'clientes', 'Clientes e depoimentos · Três Américas', 'Nestlé, Petrobras, Raízen, Cargill, Bunge, JBS, Procter & Gamble, Unilever e outras grandes empresas atendidas pela Três Américas.', `
${capa(v, 'Clientes', 'Grandes empresas em nosso portfólio de clientes.', 'Indústrias de alimentos, combustíveis, bioenergia, pneus, higiene e limpeza.', 'carreta', [['Clientes']])}
<section class="sec"><div class="in">
  ${titulo('Quem confia na Três Américas')}
  ${blocoLogos()}
</div></section>
<section class="sec sec-cinza" id="depoimentos"><div class="in">
  ${titulo('Depoimentos')}
  ${blocoDepoimentos()}
</div></section>
${blocoContatoFaixa(v)}
`);
}

function trabalhePag(v) {
  const opc = a => a.map(x => `<option>${x}</option>`).join('');
  const ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SP', 'SC', 'SE', 'TO'];
  return pagina(v, 'trabalhe-conosco/', 'trabalhe-conosco', 'Trabalhe conosco · Três Américas', 'Venha fazer parte do time da Três Américas: motoristas, logística, expedição, administrativo e estágio.', `
${capa(v, 'Trabalhe conosco', 'Venha fazer parte do nosso time!', 'Motoristas, movimentação e conferência de mercadoria, logística, administrativo, estágio e trainee.', 'convencao', [['Trabalhe conosco']])}
<section class="sec"><div class="in contato-grade">
  <form class="form" id="form-vaga">
    <h2>Cadastre seu currículo</h2>
    <label>Nome<input name="nome" required autocomplete="name"></label>
    <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
    <label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label>
    <label>Data de nascimento<input name="nascimento" type="date"></label>
    <label>Cidade<input name="cidade" autocomplete="address-level2"></label>
    <label>Estado<select name="uf">${opc(ufs)}</select></label>
    <label>Categoria<select name="categoria">${opc(vagas.categorias)}</select></label>
    <label>Área de atuação<select name="area">${opc(vagas.areas)}</select></label>
    <label>Filial de interesse<select name="filial">${filiais.map(f => `<option value="${f.email}">${f.cidade} ${f.uf}</option>`).join('')}</select></label>
    <label class="larga">Apresentação<textarea name="apresentacao" rows="5"></textarea></label>
    <button class="btn btn-prim" type="submit">Enviar ${ic('seta')}</button>
    <p class="nota pequena">A mensagem abre no seu programa de e-mail, endereçada à filial escolhida. Anexe o currículo antes de enviar.</p>
  </form>
  <div class="contato-lado">
    ${foto('ufms', 'Equipe da Três Américas na sede em Campo Grande')}
    <h3>Áreas de atuação</h3>
    <ul class="chips">${vagas.areas.slice(0, -1).map(a => `<li>${a}</li>`).join('')}</ul>
  </div>
</div></section>
`);
}

function contatoPag(v) {
  const m = filiais[0];
  return pagina(v, 'contato/', 'contato', 'Contato · Três Américas', 'Telefone (67) 3398-1000, contato@3americas.com.br. Matriz na R. Joaquim Murtinho, 5750, Campo Grande (MS).', `
${capa(v, 'Contato', 'Entre em contato conosco.', 'Pelo formulário ou pelo telefone da matriz e das filiais.', 'filial-varzea', [['Contato']])}
<section class="sec"><div class="in contato-grade">
  <form class="form" id="form-contato">
    <h2>Envie sua mensagem</h2>
    <label>Nome<input name="nome" required autocomplete="name"></label>
    <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
    <label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label>
    <label>Filial<select name="filial">${filiais.map(f => `<option value="${f.email}">${f.tipo} ${f.cidade} ${f.uf}</option>`).join('')}</select></label>
    <label>Departamento<select name="departamento"><option>Geral / Comercial</option></select></label>
    <label>Assunto<input name="assunto" required></label>
    <label class="larga">Mensagem<textarea name="mensagem" rows="5" required></textarea></label>
    <button class="btn btn-prim" type="submit">Enviar ${ic('seta')}</button>
    <p class="nota pequena">A mensagem abre no seu programa de e-mail, já endereçada à filial escolhida.</p>
  </form>
  <div class="contato-lado">
    <p class="eyebrow">Matriz</p>
    <h2>Campo Grande, MS</h2>
    <p class="end-grande">${m.endereco}<br>CEP ${m.cep} · ${m.ref}</p>
    <p><a class="btn btn-prim" href="tel:${telHref(E.telefone)}">${ic('tel')}${E.telefone}</a></p>
    <p><a href="mailto:${E.email}">${E.email}</a></p>
    <div class="mapa-g"><iframe title="Mapa da matriz da Três Américas em Campo Grande" src="https://www.google.com/maps?q=${encodeURIComponent(`${m.endereco}, Campo Grande MS`)}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</div></section>
<section class="sec sec-cinza"><div class="in">
  ${titulo('Filiais')}
  ${blocoFiliais()}
</div></section>
`);
}

export function gerarVersao(v) {
  const p = {
    index: v === 'a' ? homeA() : homeB(),
    institucional: institucionalPag(v),
    servicos: servicosPag(v),
    seguranca: segurancaPag(v),
    'onde-atuamos': ondePag(v),
    comunicacao: comunicacaoPag(v),
    clientes: clientesPag(v),
    'trabalhe-conosco': trabalhePag(v),
    contato: contatoPag(v),
  };
  for (const s of servicos) p[`servicos/${s.slug}`] = servicoPag(v, s);
  return p;
}
