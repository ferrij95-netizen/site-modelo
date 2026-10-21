// Monta as páginas das versões A ("Balcão": fiel ao site de 2009, faixa cinza com a placa do logo, menu azul,
// os três painéis da home com as silhuetas azuis) e B ("Pedido": catálogo com busca por código, lista de pedido,
// rota do frigorífico em Harmonia até Porto Alegre). Estilos em public/assets/{base,a,b}.css.
import fs from 'node:fs';
import path from 'node:path';
import { empresa as E, ouro as O, clientes, textos as T, linhas, creditos } from './conteudo.mjs';

const dir = path.dirname(new URL(import.meta.url).pathname);
const mapa = JSON.parse(fs.readFileSync(path.join(dir, 'mapa.json'), 'utf8'));
const svgDe = n => fs.readFileSync(path.join(dir, `${n}.svg`), 'utf8');
// silhuetas tiradas do site atual (vetorizadas), usadas em linha para herdar a cor
const silh = (n, cls = 'silh') => svgDe(`silh-${n}`).replace('<svg ', `<svg class="${cls}" aria-hidden="true" focusable="false" `).replace(/fill="#006599"/, 'fill="currentColor"');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (src, alt, w, h, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const FOTOS = {
  'bife-legumes': [1500, 786, 'Bife grelhado com legumes'], 'assado-brasa': [1500, 788, 'Carne assando na brasa'],
  'carne-crua': [1500, 996, 'Cortes bovinos frescos'], 'fatiado-brasa': [1500, 996, 'Carne assada fatiada'],
  'gado-campo': [1500, 986, 'Gado no campo ao entardecer'], 'frigorifico-aereo': [1600, 1110, 'Vista aérea do parque industrial Ouro do Sul em Harmonia'],
  'producao-embutidos': [1600, 1067, 'Produção de embutidos Ouro do Sul'], 'gado-angus': [1440, 900, 'Gado de corte no pasto'],
};
const F = (n, extra = '') => foto(n, FOTOS[n][2], FOTOS[n][0], FOTOS[n][1], extra);
const prod = (n, alt) => `<img src="/assets/prod/${n}.webp" alt="${esc(alt)} Ouro do Sul" width="800" height="600" loading="lazy" decoding="async">`;

export const nomesVersao = { a: 'Balcão', b: 'Pedido' };
const total = linhas.reduce((s, l) => s + l.itens.length, 0);

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'transporte', nome: 'Transportes Refrigerados', caminho: 'transporte/' },
  { slug: 'frigorifico', nome: 'Sobre o Frigorífico', caminho: 'frigorifico/' },
  { slug: 'atendimento', nome: 'Áreas de Atendimento', caminho: 'atendimento/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  lupa: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  floco: '<path d="M12 2v20M4.9 6.5l14.2 11M4.9 17.5l14.2-11M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5"/>',
  gota: '<path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z"/>',
  caminhao: '<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  copiar: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 00-1-1H5a1 1 0 00-1 1v10a1 1 0 001 1h3"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

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
<meta property="og:site_name" content="Coprocarne">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#265599">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const ativo = (n, atual) => n.slug === atual || (atual.startsWith('produtos') && n.slug === 'produtos');
const link = (v, n, atual) => `<a href="/${v}/${n.caminho}"${ativo(n, atual) ? ' aria-current="page"' : ''}>${n.nome}</a>`;
const placa = (w = 300) => `<img class="placa" src="/assets/logo-placa.svg" alt="Coprocarne, desde 1979" width="${w}" height="${Math.round(w * 608 / 2120)}">`;
const logoBranco = (w = 240) => `<img src="/assets/logo-branco.svg" alt="Coprocarne, desde 1979" width="${w}" height="${Math.round(w * 544 / 2024)}">`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, atual) {
  if (v === 'a') return `<header class="topo">
  <div class="topo-faixa"><div class="in">
    <span class="topo-desde">Atacado de carnes · Porto Alegre</span>
    <a class="marca" href="/a/" aria-label="Coprocarne, início">${placa(300)}</a>
    <a class="topo-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
    ${menuBtn}
  </div></div>
  <nav id="menu" class="menu" aria-label="Principal"><div class="in">${nav.map(n => link(v, n, atual)).join('')}</div></nav>
</header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Coprocarne, início">${placa(210)}</a>
  <nav id="menu" class="menu" aria-label="Principal">${nav.slice(1).map(n => link(v, n, atual)).join('')}</nav>
  <a class="topo-tel" href="tel:${E.foneHref}">${ic('tel')}<span>${E.fone}</span></a>
  ${menuBtn}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape">
  ${v === 'a' ? `<div class="rod-silh" aria-hidden="true">${silh('boi')}${silh('embutido')}${silh('porco')}</div>` : ''}
  <div class="in rod-grade">
    <div class="rod-marca">${logoBranco(230)}<p>${T.chamada}</p></div>
    <div><h3>Coprocarne Ltda.</h3><p>${E.endereco}<br>Bairro ${E.bairro}<br>${E.cidade}</p></div>
    <div><h3>Fones</h3><p><a href="tel:${E.foneHref}">${E.fone}</a><br>Fax ${E.fax}<br><a href="tel:${E.celHref}">${E.cel}</a> · ${E.celNome}<br><a href="mailto:${E.email}">${E.email}</a></p></div>
    <nav aria-label="Rodapé"><h3>Site</h3>${nav.map(n => link(v, n, '')).join('')}</nav>
  </div>
  <div class="in rod-fim"><p>© Coprocarne · Representante Frigorífico Ouro do Sul · desde 1979</p><p class="rod-cred">${creditos}</p></div>
</footer>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo) => `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${sl.replace('/', '-')}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, sl)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// ---------- blocos comuns ----------
const form = (v, tipo = 'contato') => `<form class="form" data-form>
  <div class="campos">
    <label>Nome<input name="Nome" autocomplete="name" required></label>
    <label>Empresa<input name="Empresa" autocomplete="organization"></label>
    <label>E-mail<input name="E-mail" type="email" autocomplete="email" required></label>
    <label>DDD e telefone<input name="Telefone" type="tel" autocomplete="tel" required></label>
    <label>Cidade<input name="Cidade" autocomplete="address-level2"></label>
    <label>Estado<select name="Estado"><option>RS</option><option>SC</option><option>PR</option><option>Outro</option></select></label>
    ${tipo === 'contato' ? `<label class="largo">Assunto<select name="Assunto"><option>Orçamento de produtos</option><option>Transporte refrigerado</option><option>Receber a lista de produtos</option><option>Dúvida ou feedback</option></select></label>
    <label class="largo">Mensagem<textarea name="Mensagem" rows="5"></textarea></label>` : `<input type="hidden" name="Assunto" value="Receber a lista de produtos">`}
  </div>
  <button class="btn" type="submit">${tipo === 'contato' ? 'Enviar mensagem' : 'Quero receber a lista'} ${ic('seta')}</button>
  <p class="form-ok" role="status" hidden>Dados prontos. Nesta prévia o envio está desligado; no site no ar a mensagem chega direto na Coprocarne. Enquanto isso, ligue <a href="tel:${E.foneHref}">${E.fone}</a>.</p>
</form>`;

const mapaRegiao = (cls = '') => {
  const [cx, cy] = mapa.coprocarne, [hx, hy] = mapa.harmonia;
  return `<figure class="mapa ${cls}">
  ${foto('mapa-regiao', 'Mapa de Porto Alegre, região metropolitana e Vale do Caí', mapa.w, mapa.h)}
  <svg class="mapa-cam" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <ellipse cx="${cx}" cy="${cy}" rx="${mapa.raio35}" ry="${(mapa.raio35 * mapa.w / mapa.h).toFixed(2)}" class="mapa-raio"/>
    <path d="M${hx} ${hy} Q ${(hx + cx) / 2 - 8} ${(hy + cy) / 2 + 2} ${cx} ${cy}" class="mapa-rota"/>
  </svg>
  <span class="mapa-pin pin-cop" style="left:${cx}%;top:${cy}%"><b>Coprocarne</b> Jardim Itu, Porto Alegre</span>
  <span class="mapa-pin pin-har" style="left:${hx}%;top:${hy}%"><b>Ouro do Sul</b> Harmonia, Vale do Caí</span>
  <figcaption>Porto Alegre e região metropolitana; transporte refrigerado para outras regiões sob consulta. Mapa © colaboradores do OpenStreetMap.</figcaption>
</figure>`;
};

const termometro = (cls = '') => `<div class="termo ${cls}">
  <div class="termo-item"><span class="termo-ic">${ic('gota')}</span><p class="termo-n">3 °C <span>a</span> 6 °C</p><p class="termo-t">Resfriados</p></div>
  <div class="termo-item cong"><span class="termo-ic">${ic('floco')}</span><p class="termo-n">até −18 °C</p><p class="termo-t">Congelados</p></div>
</div>`;

// tabela de produtos (código, produto, unidade) com filtro
const tabela = (l, cls = '') => `<div class="tab-prod ${cls}" data-tabela>
  <label class="busca">${ic('lupa')}<span class="sr">Procurar em ${l.titulo.toLowerCase()}</span><input type="search" placeholder="Procurar por nome ou código" data-busca></label>
  <table><caption class="sr">${l.titulo}: código, produto e unidade</caption>
  <thead><tr><th scope="col">Cód.</th><th scope="col">Produto</th><th scope="col">Un.</th></tr></thead>
  <tbody>${l.itens.map(([c, n, u]) => `<tr><td class="cod">${c || '—'}</td><td>${esc(n)}</td><td class="un">${u}</td></tr>`).join('')}</tbody></table>
  <p class="tab-vazio" hidden>Nenhum produto com esse nome ou código. Fale com a Coprocarne: <a href="tel:${E.foneHref}">${E.fone}</a>.</p>
</div>`;

// ---------- versão A ----------
const slides = ['bife-legumes', 'carne-crua', 'assado-brasa', 'fatiado-brasa', 'gado-campo'];
const homeA = () => `<section class="hero" data-slides>
  ${slides.map((s, i) => `<figure class="slide${i === 0 ? ' on' : ''}">${F(s, i === 0 ? ' fetchpriority="high" loading="eager"' : '')}</figure>`).join('')}
  <div class="in hero-in">
    <div class="hero-txt">
      <p class="sobre">Desde 1979 · Representante Ouro do Sul</p>
      <h1>Carnes bovinas, suínas e embutidos para pronta entrega</h1>
      <p>Para refeitórios industriais, supermercados, restaurantes e churrascarias de Porto Alegre e região metropolitana, com transporte refrigerado próprio.</p>
      <div class="acoes"><a class="btn" href="/a/produtos/">Ver produtos ${ic('seta')}</a><a class="btn btn-linha" href="/a/contato/">Fazer um orçamento</a></div>
    </div>
  </div>
  <div class="slide-pontos" role="group" aria-label="Fotos">${slides.map((s, i) => `<button type="button" aria-label="Foto ${i + 1}"${i === 0 ? ' aria-current="true"' : ''} data-ir="${i}"></button>`).join('')}</div>
</section>

<section class="paineis" aria-label="Destaques">
  <div class="in paineis-in">
    <a class="painel" href="/a/frigorifico/">
      <h2>Parceria<br>Ouro do Sul</h2>
      <span class="painel-vis"><img src="/assets/img/ourodosul.webp" alt="Ouro do Sul, Cooperativa dos Suinocultores do Caí Superior, desde 1935" width="600" height="404" loading="lazy"></span>
      <p>Coprocarne e Ouro do Sul: parceria desde a inauguração, em 1979</p>
    </a>
    <a class="painel" href="/a/produtos/">
      <h2>Produtos<br>Bovinos, Embutidos e Suínos</h2>
      <span class="painel-vis silhs">${silh('boi')}${silh('embutido')}${silh('porco')}</span>
      <p>${total} itens com código, porcionados ou inteiros</p>
    </a>
    <a class="painel" href="/a/atendimento/">
      <h2>Áreas de<br>Atendimento</h2>
      <span class="painel-vis painel-mapa">${foto('mapa-regiao', 'Mapa da região atendida', mapa.w, mapa.h)}<i style="left:${mapa.coprocarne[0]}%;top:${mapa.coprocarne[1]}%"></i></span>
      <p>Conheça a região de atendimento Coprocarne</p>
    </a>
  </div>
</section>

<section class="historia">
  <div class="in historia-in">
    <div class="historia-foto">${F('bife-legumes')}<span class="selo-ano">1979</span></div>
    <div class="historia-txt">
      <p class="sobre">A Empresa</p>
      <h2>Começou num pequeno açougue na Avenida Benjamin Constant</h2>
      <p>${T.historia[0]}</p>
      <p>${T.hoje}</p>
      <a class="link" href="/a/empresa/">Conheça a Coprocarne ${ic('seta')}</a>
    </div>
  </div>
  <dl class="in numeros">
    <div><dt>Desde</dt><dd>1979</dd></div>
    <div><dt>Clientes atendidos</dt><dd>+ de 60</dd></div>
    <div><dt>Itens na lista</dt><dd>${total}</dd></div>
    <div><dt>Do frigorífico até Porto Alegre</dt><dd>70 km</dd></div>
  </dl>
</section>

<section class="atende">
  <div class="in">
    <h2>Quem a Coprocarne atende</h2>
    <ul class="atende-lista">${clientes.map(c => `<li>${c}</li>`).join('')}</ul>
  </div>
</section>

<section class="frio">
  <div class="in frio-in">
    <div>
      <p class="sobre">Transportes Refrigerados</p>
      <h2>Da câmara do frigorífico até a sua cozinha, sem quebrar o frio</h2>
      <p>${T.veiculos}</p>
      <a class="btn btn-branco" href="/a/transporte/">Orçar um transporte ${ic('seta')}</a>
    </div>
    ${termometro()}
  </div>
</section>

<section class="parceiro">
  <div class="parceiro-foto">${F('frigorifico-aereo')}</div>
  <div class="in parceiro-in">
    <div class="parceiro-txt">
      <img src="/assets/img/ourodosul.webp" alt="Ouro do Sul" width="600" height="404" loading="lazy" class="parceiro-logo">
      <h2>O frigorífico por trás de cada entrega</h2>
      <p>${T.frigorifico[0]}</p>
      <p>Abate de suínos e bovinos, desossa, porcionamento e embutidos com a marca Ouro do Sul, sob o Serviço de Inspeção Federal.</p>
      <a class="link" href="/a/frigorifico/">Sobre o frigorífico ${ic('seta')}</a>
    </div>
  </div>
</section>

${faixaContatoA()}`;

function faixaContatoA() {
  return `<section class="contato-faixa">
  <div class="in cf-in">
    <div><h2>Peça a lista de produtos ou um orçamento</h2><p>${E.endereco}, ${E.bairro} · ${E.cidade}</p></div>
    <div class="cf-tels"><a class="cf-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a href="tel:${E.celHref}">${E.cel} · ${E.celNome}</a></div>
    <a class="btn" href="/a/contato/">Fale conosco ${ic('seta')}</a>
  </div>
</section>`;
}

// título de página interna no estilo das faixas do site atual (foto acinzentada com a onda clara embaixo)
const tituloA = (t, fotoN, sub = '') => `<section class="tit">
  <div class="tit-foto">${F(fotoN, ' loading="eager"')}</div>
  <div class="in tit-in"><h1>${t}</h1>${sub ? `<p>${sub}</p>` : ''}</div>
  <svg class="tit-onda" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 60 C 360 0 720 100 1080 40 S 1440 50 1440 50 V90 H0z"/></svg>
</section>`;

const empresaA = () => `${tituloA('Empresa', 'carne-crua', 'Desde 1979 em Porto Alegre')}
<section class="texto">
  <div class="in texto-in">
    <div class="texto-corpo">
      ${T.historia.map(p => `<p>${p}</p>`).join('')}
      <p>${T.hoje}</p>
      <p>${T.mercadorias}</p>
      <p>${T.veiculos}</p>
    </div>
    <aside class="texto-lado">
      <div class="trinta"><p class="trinta-t">Coprocarne e Ouro do Sul</p><p class="trinta-n">Parceria de sucesso desde 1979</p>
      <img src="/assets/img/ourodosul.webp" alt="Ouro do Sul" width="600" height="404" loading="lazy"><span class="trinta-mais" aria-hidden="true">+</span>${placa(240)}</div>
    </aside>
  </div>
</section>
<section class="linha-tempo">
  <div class="in">
    <h2>Como a Coprocarne chegou até aqui</h2>
    <ol class="lt">
      <li><b>1979</b><p>Remo Antônio Royer e Alódia Persch Royer abrem um pequeno açougue na Avenida Benjamin Constant, já com a parceria do Frigorífico Ouro do Sul.</p></li>
      <li><b>Refeitórios</b><p>A procura de empresas e refeitórios industriais cresce e a parceria com a Ouro do Sul se reforça: o frigorífico passa a fornecer a mercadoria para pronta entrega.</p></li>
      <li><b>Frota fria</b><p>Veículos com alvará da Prefeitura de Porto Alegre e refrigeração Thermo King para resfriados e congelados.</p></li>
      <li><b>Hoje</b><p>Representante da Ouro do Sul, com mais de 60 clientes em Porto Alegre e região metropolitana.</p></li>
    </ol>
  </div>
</section>
${faixaContatoA()}`;

const produtosA = () => `${tituloA('Produtos', 'fatiado-brasa', 'Bovinos, embutidos e suínos Ouro do Sul')}
<section class="linhas-a">
  <div class="in">
    <p class="intro">${T.mercadorias} Escolha a linha para ver a lista com o código de cada produto.</p>
    <div class="linhas-a-grade">${linhas.map(l => `<a class="linha-a" href="/a/produtos/${l.slug}/">
      <span class="linha-a-silh">${silh(l.silh)}</span>
      <h2>Lista de Produtos ${l.nome}</h2>
      <p>${l.resumo}</p>
      <span class="linha-a-n">${l.itens.length} itens ${ic('seta')}</span>
    </a>`).join('')}</div>
  </div>
</section>
<section class="vitrine">
  <div class="in">
    <h2>Alguns produtos Ouro do Sul</h2>
    <ul class="vitrine-lista">${linhas.flatMap(l => l.fotos.slice(0, 2).map(([n, t]) => `<li><a href="/a/produtos/${l.slug}/">${prod(n, t)}<span>${t}</span></a></li>`)).join('')}</ul>
  </div>
</section>
<section class="pedir">
  <div class="in pedir-in">
    <div><h2>Receba a lista de produtos para futuros pedidos</h2><p>${T.lista}</p></div>
    ${form('a', 'lista')}
  </div>
</section>`;

const linhaA = l => `${tituloA(`Lista de Produtos ${l.nome}`, l.foto)}
<section class="linha-pag">
  <div class="in linha-pag-in">
    <aside class="linha-lado">
      <span class="linha-lado-silh">${silh(l.silh)}</span>
      <p>${l.resumo}</p>
      <nav class="linha-troca" aria-label="Outras linhas">${linhas.map(o => `<a href="/a/produtos/${o.slug}/"${o.slug === l.slug ? ' aria-current="page"' : ''}>${silh(o.silh, 'silh-mini')}${o.nome}</a>`).join('')}</nav>
      <ul class="linha-fotos">${l.fotos.map(([n, t]) => `<li>${prod(n, t)}<span>${t}</span></li>`).join('')}</ul>
    </aside>
    <div>
      ${tabela(l)}
      <div class="pedir pedir-mini">
        <h2>Receba esta lista para futuros pedidos</h2><p>${T.lista}</p>
        ${form('a', 'lista')}
      </div>
    </div>
  </div>
</section>`;

const transporteA = () => `${tituloA('Transportes Refrigerados', 'gado-campo', 'Resfriados e congelados com cuidado, agilidade e qualidade')}
<section class="transp">
  <div class="in transp-in">
    <div class="texto-corpo">
      <p class="destaque">${T.transporte}</p>
      <p>${T.transporte2}</p>
      <p>${T.veiculos}</p>
      <a class="btn" href="/a/contato/">Contate-nos e faça um orçamento ${ic('seta')}</a>
    </div>
    ${termometro('termo-vert')}
  </div>
</section>
<section class="garantias">
  <div class="in garantias-in">
    <div>${ic('caminhao', 'ic-g')}<h3>Qualquer mercadoria</h3><p>Transporte de qualquer tipo de mercadoria que precise de resfriamento ou congelamento, não só carnes.</p></div>
    <div>${ic('floco', 'ic-g')}<h3>Thermo King</h3><p>Veículos refrigerados pela Thermo King, para resfriamento e congelamento.</p></div>
    <div>${ic('doc', 'ic-g')}<h3>Alvará da Prefeitura</h3><p>Todos os veículos que transportam alimentos têm alvará da Prefeitura de Porto Alegre.</p></div>
    <div>${ic('pin', 'ic-g')}<h3>Para outras regiões</h3><p>Entrega no destino desejado, o mais breve possível, conforme a necessidade de cada cliente.</p></div>
  </div>
</section>
${faixaContatoA()}`;

const frigorificoA = () => `${tituloA('Sobre o Frigorífico', 'producao-embutidos', 'Cooperativa Ouro do Sul · Harmonia, Vale do Rio Caí')}
<section class="frig">
  <div class="in frig-in">
    <div class="texto-corpo">
      ${T.frigorifico.map(p => `<p>${p}</p>`).join('')}
      <blockquote class="lema">“${O.lema}”<span>Com este trinômio a cooperativa desenvolve seu trabalho, oferecendo mais de duzentos produtos aos seus clientes.</span></blockquote>
    </div>
    <aside class="frig-lado">
      <figure>${F('frigorifico-aereo')}<figcaption>Parque Industrial Ouro do Sul no Vale do Caí/RS.</figcaption></figure>
      <div class="frig-contato">
        <img src="/assets/img/ourodosul.webp" alt="Ouro do Sul" width="600" height="404" loading="lazy">
        <p><b>Contato Ouro do Sul</b><br>Fone <a href="tel:${O.foneHref}">${O.fone}</a><br><a href="mailto:${O.email}">${O.email}</a><br><a href="${O.site}" rel="noopener" target="_blank">ourodosul.com.br</a></p>
      </div>
    </aside>
  </div>
</section>
<section class="etapas-a">
  <div class="in">
    <h2>Do abate ao embutido, tudo no mesmo parque industrial</h2>
    <ol class="etapas-a-lista">
      <li><span>01</span><h3>Abate</h3><p>Suínos e bovinos abatidos no parque industrial de Harmonia.</p></li>
      <li><span>02</span><h3>Desossa</h3><p>Sala de desossa para processar e porcionar os cortes.</p></li>
      <li><span>03</span><h3>Embutidos</h3><p>Linguiças, mortadelas, morcelas e salsichas de fabricação própria.</p></li>
      <li><span>04</span><h3>Inspeção</h3><p>Boas práticas e controle de qualidade com o Serviço de Inspeção Federal.</p></li>
    </ol>
  </div>
</section>
<p class="in frig-slogan">“Ouro do Sul”: ${O.slogan}</p>`;

const atendimentoA = () => `${tituloA('Áreas de Atendimento', 'gado-angus', 'Porto Alegre, Grande Porto Alegre e arredores')}
<section class="atend">
  <div class="in atend-in">
    ${mapaRegiao()}
    <div class="texto-corpo">
      <p class="destaque">${T.atendimento}</p>
      <p>Entre em contato e faça um orçamento.</p>
      <ul class="regioes"><li>Porto Alegre</li><li>Grande Porto Alegre</li><li>Regiões próximas</li><li>Outras regiões com transporte refrigerado</li></ul>
      <a class="btn" href="/a/contato/">Fazer um orçamento ${ic('seta')}</a>
    </div>
  </div>
</section>`;

const contatoA = () => `${tituloA('Contato', 'assado-brasa')}
<section class="contato">
  <div class="in contato-in">
    <div>
      <p class="intro">${T.contato}</p>
      ${form('a')}
    </div>
    <aside class="contato-lado">
      ${placa(260)}
      <p><b>Coprocarne Ltda.</b><br>${E.endereco}<br>Bairro ${E.bairro}<br>${E.cidade}</p>
      <h3>Fones para contato</h3>
      <p><a class="ct-grande" href="tel:${E.foneHref}">${E.fone}</a><br>${E.fax} (fax)<br><a href="tel:${E.celHref}">${E.cel}</a> · ${E.celNome}<br><a href="mailto:${E.email}">${E.email}</a></p>
      <a class="link" href="${E.mapaLink}" rel="noopener" target="_blank">Ver no mapa ${ic('seta')}</a>
    </aside>
  </div>
</section>`;

// ---------- versão B ----------
const buscaB = (ph = 'Picanha, linguiça, 112…') => `<form class="busca-b" action="/b/produtos/" role="search">
  <label for="q">${ic('lupa')}<span class="sr">Procurar produto ou código</span></label>
  <input id="q" name="q" type="search" placeholder="${ph}" autocomplete="off">
  <button class="btn" type="submit">Procurar</button>
</form>`;

const homeB = () => `<section class="hero">
  <div class="in hero-in">
    <div class="hero-txt">
      <p class="sobre">Atacado de carnes em Porto Alegre · desde 1979</p>
      <h1>Pronta entrega de carnes e embutidos Ouro do Sul</h1>
      <p>${total} produtos bovinos, suínos e embutidos, com código, para refeitórios, supermercados, restaurantes e churrascarias da Grande Porto Alegre.</p>
      ${buscaB()}
      <p class="hero-sug">Mais pedidos: ${['Picanha', 'Costela bovina', 'Linguiça calabresa', 'Pernil suíno', 'Carne moída'].map(s => `<a href="/b/produtos/?q=${encodeURIComponent(s)}">${s}</a>`).join('')}</p>
    </div>
    <div class="hero-foto">
      ${F('fatiado-brasa', ' fetchpriority="high" loading="eager"')}
      <div class="etiqueta">${ic('floco')}<span><b>−18 °C</b> congelados</span><span><b>3 a 6 °C</b> resfriados</span></div>
    </div>
  </div>
</section>

<section class="linhas-b">
  <div class="in linhas-b-in">${linhas.map(l => `<a class="linha-b" href="/b/produtos/${l.slug}/">
    ${silh(l.silh)}
    <span class="linha-b-n" data-conta>${l.itens.length}</span>
    <span class="linha-b-t">${l.nome}</span>
    <span class="linha-b-r">${l.resumo.split(',').slice(0, 3).join(',')}…</span>
  </a>`).join('')}</div>
</section>

<section class="rota">
  <div class="in rota-in">
    <div class="rota-txt">
      <p class="sobre">Do frigorífico à sua cozinha</p>
      <h2>70 km de Harmonia até Porto Alegre, na temperatura certa</h2>
      <ol class="rota-passos">
        <li><span class="rp-n">1</span><div><h3>Abate e desossa</h3><p>Suínos e bovinos abatidos, desossados e porcionados no parque industrial da Ouro do Sul, com Serviço de Inspeção Federal.</p></div></li>
        <li><span class="rp-n">2</span><div><h3>Embutidos de fabricação própria</h3><p>Linguiças, mortadelas, morcelas e salsichas com a marca Ouro do Sul.</p></div></li>
        <li><span class="rp-n">3</span><div><h3>Transporte refrigerado</h3><p>Veículos Thermo King com alvará da Prefeitura de Porto Alegre: 3 a 6 °C ou até −18 °C.</p></div></li>
        <li><span class="rp-n">4</span><div><h3>Pronta entrega</h3><p>A Coprocarne entrega em Porto Alegre e região metropolitana, porcionado ou inteiro, do jeito que o cliente pede.</p></div></li>
      </ol>
    </div>
    ${mapaRegiao('mapa-b')}
  </div>
</section>

<section class="segmentos">
  <div class="in">
    <h2>Mais de 60 clientes do ramo de alimentação</h2>
    <div class="seg-grade">
      <figure class="seg-foto">${F('bife-legumes')}</figure>
      <ul>${clientes.map(c => `<li>${c}</li>`).join('')}</ul>
      <figure class="seg-foto seg-foto-2">${prod('linguica-mista', 'Linguiça mista defumada')}</figure>
    </div>
  </div>
</section>

<section class="lista-cta">
  <div class="in lista-cta-in">
    <div class="lista-cta-demo" aria-hidden="true">
      ${linhas[0].itens.filter(i => ['112', '102', '115'].includes(i[0])).concat(linhas[1].itens.filter(i => ['401'].includes(i[0])), linhas[2].itens.filter(i => ['52'].includes(i[0]))).map(([c, n, u]) => `<div class="lcd-l"><span class="lcd-c">${c}</span><span>${n}</span><span class="lcd-q">${ic('check')}</span></div>`).join('')}
    </div>
    <div>
      <h2>Monte a lista do seu pedido pelo código</h2>
      <p>Marque os produtos no catálogo e envie a lista para a Coprocarne por e-mail, ou copie e mande como preferir. A equipe retorna com disponibilidade e condições.</p>
      <a class="btn" href="/b/produtos/">Abrir o catálogo ${ic('seta')}</a>
    </div>
  </div>
</section>

<section class="desde">
  <div class="in desde-in">
    <p class="desde-ano">1979</p>
    <div><h2>Um açougue na Benjamin Constant que virou atacado</h2><p>${T.historia[0]} <a class="link" href="/b/empresa/">A história ${ic('seta')}</a></p></div>
    <img src="/assets/img/ourodosul.webp" alt="Ouro do Sul, parceira desde 1979" width="600" height="404" loading="lazy">
  </div>
</section>
${contatoFaixaB()}`;

function contatoFaixaB() {
  return `<section class="cf-b">
  <div class="in cf-b-in">
    <h2>Fale com a Coprocarne</h2>
    <a class="cfb-item" href="tel:${E.foneHref}">${ic('tel')}<span><small>Telefone</small>${E.fone}</span></a>
    <a class="cfb-item" href="tel:${E.celHref}">${ic('tel')}<span><small>${E.celNome}</small>${E.cel}</span></a>
    <a class="cfb-item" href="mailto:${E.email}">${ic('mail')}<span><small>E-mail</small>${E.email}</span></a>
  </div>
</section>`;
}

const tituloB = (sobre, t, txt = '') => `<section class="tit-b"><div class="in"><p class="sobre">${sobre}</p><h1>${t}</h1>${txt ? `<p>${txt}</p>` : ''}</div></section>`;

const catalogo = (filtro = '') => `<div class="cat" data-catalogo${filtro ? ` data-filtro-ini="${filtro}"` : ''}>
  <div class="cat-barra">
    <label class="cat-busca">${ic('lupa')}<span class="sr">Procurar produto ou código</span><input type="search" placeholder="Procurar por nome ou código" data-cat-busca></label>
    <div class="cat-chips" role="group" aria-label="Linha">
      <button type="button" data-cat-linha="" aria-pressed="${filtro ? 'false' : 'true'}">Todos <small>${total}</small></button>
      ${linhas.map(l => `<button type="button" data-cat-linha="${l.slug}" aria-pressed="${filtro === l.slug}">${silh(l.silh, 'silh-mini')}${l.nome} <small>${l.itens.length}</small></button>`).join('')}
    </div>
  </div>
  <div class="cat-corpo">
    <ul class="cat-lista">${linhas.flatMap(l => l.itens.map(([c, n, u]) => `<li data-linha="${l.slug}"${filtro && filtro !== l.slug ? ' hidden' : ''}><label><input type="checkbox" data-item="${esc(`${c ? c + ' · ' : ''}${n} (${u})`)}"><span class="cl-c">${c || '—'}</span><span class="cl-n">${esc(n)}</span><span class="cl-u">${u}</span><span class="cl-l">${l.nome}</span></label></li>`)).join('')}</ul>
    <p class="cat-vazio" hidden>Nenhum produto encontrado. Ligue <a href="tel:${E.foneHref}">${E.fone}</a> e pergunte: a lista muda com a época.</p>
    <aside class="pedido" data-pedido aria-live="polite">
      <h2>Lista do pedido <span data-pedido-n>0</span></h2>
      <p class="pedido-vazio">Marque os produtos na lista para montar o pedido.</p>
      <ol data-pedido-lista></ol>
      <div class="pedido-acoes">
        <a class="btn" data-pedido-mail href="mailto:${E.email}">${ic('mail')} Enviar por e-mail</a>
        <button class="btn btn-linha" type="button" data-pedido-copiar>${ic('copiar')} Copiar lista</button>
        <button class="pedido-limpar" type="button" data-pedido-limpar>${ic('x', 'ic ic-s')} Limpar</button>
      </div>
      <p class="pedido-obs">Quantidades e condições são combinadas com a Coprocarne no retorno.</p>
    </aside>
  </div>
</div>`;

const produtosB = () => `${tituloB('Produtos Ouro do Sul', 'Catálogo com código', `${T.mercadorias} Procure pelo nome ou pelo código e monte a lista do pedido.`)}
<section class="cat-sec"><div class="in">${catalogo()}</div></section>
<section class="linhas-mini"><div class="in linhas-mini-in">${linhas.map(l => `<a href="/b/produtos/${l.slug}/">${prod(l.fotos[0][0], l.fotos[0][1])}<span>${silh(l.silh, 'silh-mini')} ${l.titulo}</span></a>`).join('')}</div></section>`;

const linhaB = l => `<section class="linha-b-tit">
  <div class="in lbt-in">
    <div><p class="sobre"><a href="/b/produtos/">Produtos</a> / ${l.nome}</p><h1>${l.titulo}</h1><p>${l.resumo}</p></div>
    <span class="lbt-silh">${silh(l.silh)}</span>
  </div>
  <div class="in"><ul class="lbt-fotos">${l.fotos.map(([n, t]) => `<li>${prod(n, t)}<span>${t}</span></li>`).join('')}</ul></div>
</section>
<section class="cat-sec"><div class="in">${catalogo(l.slug)}</div></section>`;

const empresaB = () => `${tituloB('Empresa', 'Desde 1979, carne de confiança para quem cozinha em grande quantidade')}
<section class="emp-b">
  <div class="in emp-b-in">
    <figure>${F('carne-crua')}</figure>
    <div class="texto-corpo">${T.historia.map(p => `<p>${p}</p>`).join('')}<p>${T.hoje}</p></div>
  </div>
</section>
<section class="fatos">
  <div class="in fatos-in">
    <div><b>1979</b><p>Fundação por Remo Antônio Royer e Alódia Persch Royer</p></div>
    <div><b>60+</b><p>Clientes em Porto Alegre e região metropolitana</p></div>
    <div><b>${total}</b><p>Produtos com código na lista</p></div>
    <div><b>−18 °C</b><p>Frota com refrigeração Thermo King</p></div>
  </div>
</section>
<section class="emp-b2">
  <div class="in emp-b-in inv">
    <div class="texto-corpo"><h2>Porcionado, inteiro ou embutido</h2><p>${T.mercadorias}</p><p>${T.veiculos}</p><a class="btn" href="/b/produtos/">Ver o catálogo ${ic('seta')}</a></div>
    <figure>${F('producao-embutidos')}</figure>
  </div>
</section>
${contatoFaixaB()}`;

const transporteB = () => `${tituloB('Transportes Refrigerados', 'Transporte refrigerado para qualquer mercadoria', T.transporte)}
<section class="faixas-temp">
  <div class="in ft-in">
    <div class="ft ft-resf"><p class="ft-n">3 °C – 6 °C</p><h2>Resfriamento</h2><p>Carnes frescas e qualquer mercadoria que precise ficar resfriada no caminho.</p><div class="ft-escala" aria-hidden="true"><span class="fe-a">−20 °C</span><span class="fe-b">0 °C</span><span class="fe-c">+10 °C</span><i style="left:calc((3 + 20) / 30 * 100%)"></i><i style="left:calc((6 + 20) / 30 * 100%)"></i></div></div>
    <div class="ft ft-cong"><p class="ft-n">até −18 °C</p><h2>Congelamento</h2><p>Congelados conduzidos a até −18 °C, do carregamento até a entrega.</p><div class="ft-escala" aria-hidden="true"><span class="fe-a">−20 °C</span><span class="fe-b">0 °C</span><span class="fe-c">+10 °C</span><i style="left:calc((-18 + 20) / 30 * 100%)"></i></div></div>
  </div>
</section>
<section class="transp-b">
  <div class="in transp-b-in">
    <ul class="checks">
      <li>${ic('check')} Refrigeração Thermo King para resfriamento e congelamento</li>
      <li>${ic('check')} Alvará da Prefeitura de Porto Alegre em todos os veículos de alimentos</li>
      <li>${ic('check')} Entrega o mais breve possível, no destino desejado</li>
      <li>${ic('check')} Também para outras regiões, conforme a necessidade</li>
    </ul>
    <div class="transp-b-cta"><h2>Contate-nos e faça um orçamento</h2><p>${T.transporte2}</p><a class="btn" href="/b/contato/">Pedir orçamento ${ic('seta')}</a></div>
  </div>
</section>`;

const frigorificoB = () => `${tituloB('Sobre o Frigorífico', 'Cooperativa Ouro do Sul', `${O.razao} · ${O.cidade}, ${O.distancia}.`)}
<section class="frig-b">
  <div class="frig-b-foto">${F('frigorifico-aereo')}<span>Parque Industrial Ouro do Sul no Vale do Caí/RS</span></div>
  <div class="in frig-b-in">
    <div class="texto-corpo">${T.frigorifico.slice(1).map(p => `<p>${p}</p>`).join('')}</div>
    <aside class="frig-b-lado">
      <img src="/assets/img/ourodosul.webp" alt="Ouro do Sul" width="600" height="404" loading="lazy">
      <p class="lema-b">“${O.lema}”</p>
      <p>Fone <a href="tel:${O.foneHref}">${O.fone}</a><br><a href="mailto:${O.email}">${O.email}</a><br><a href="${O.site}" rel="noopener" target="_blank">ourodosul.com.br</a></p>
    </aside>
  </div>
</section>
<section class="frig-b-num">
  <div class="in fbn-in">
    <div><b>+200</b><p>produtos Ouro do Sul</p></div>
    <div><b>S.I.F.</b><p>Serviço de Inspeção Federal</p></div>
    <div><b>70 km</b><p>de Porto Alegre, no Vale do Rio Caí</p></div>
    <div><b>Água</b><p>tratamento de efluentes com reaproveitamento</p></div>
  </div>
</section>`;

const atendimentoB = () => `${tituloB('Áreas de Atendimento', 'Porto Alegre e região metropolitana', T.atendimento)}
<section class="atend-b">
  <div class="in atend-b-in">
    ${mapaRegiao('mapa-b')}
    <div>
      <ol class="aneis">
        <li><b>Porto Alegre</b><span>Entrega a partir do Jardim Itu</span></li>
        <li><b>Grande Porto Alegre</b><span>Região metropolitana</span></li>
        <li><b>Arredores</b><span>Regiões próximas</span></li>
        <li><b>Outras regiões</b><span>Com transporte refrigerado, sob orçamento</span></li>
      </ol>
      <a class="btn" href="/b/contato/">Consultar minha cidade ${ic('seta')}</a>
    </div>
  </div>
</section>`;

const contatoB = () => `${tituloB('Contato', 'Orçamentos, lista de produtos e transporte', T.contato)}
<section class="contato-b">
  <div class="in contato-b-in">
    <div class="ctb-cartoes">
      <a href="tel:${E.foneHref}">${ic('tel')}<small>Telefone</small><b>${E.fone}</b></a>
      <a href="tel:${E.celHref}">${ic('tel')}<small>${E.celNome}</small><b>${E.cel}</b></a>
      <a href="mailto:${E.email}">${ic('mail')}<small>E-mail</small><b>${E.email}</b></a>
      <a href="${E.mapaLink}" rel="noopener" target="_blank">${ic('pin')}<small>${E.bairro} · ${E.cidade}</small><b>${E.endereco}</b></a>
      <p class="ctb-fax">Fax ${E.fax}</p>
    </div>
    ${form('b')}
  </div>
</section>`;

export function gerarVersao(v) {
  const A = v === 'a';
  const descr = `Coprocarne, atacado de carnes em Porto Alegre desde 1979: ${T.chamada}`;
  const out = {
    index: pagina(v, 'index', '', 'Coprocarne · Carnes Ouro do Sul para pronta entrega em Porto Alegre', descr, A ? homeA() : homeB()),
    empresa: pagina(v, 'empresa', 'empresa/', 'Empresa · Coprocarne', T.historia[0], A ? empresaA() : empresaB()),
    produtos: pagina(v, 'produtos', 'produtos/', 'Produtos · Coprocarne', `${total} produtos bovinos, embutidos e suínos Ouro do Sul com código.`, A ? produtosA() : produtosB()),
    transporte: pagina(v, 'transporte', 'transporte/', 'Transportes Refrigerados · Coprocarne', T.transporte, A ? transporteA() : transporteB()),
    frigorifico: pagina(v, 'frigorifico', 'frigorifico/', 'Sobre o Frigorífico Ouro do Sul · Coprocarne', T.frigorifico[0], A ? frigorificoA() : frigorificoB()),
    atendimento: pagina(v, 'atendimento', 'atendimento/', 'Áreas de Atendimento · Coprocarne', T.atendimento, A ? atendimentoA() : atendimentoB()),
    contato: pagina(v, 'contato', 'contato/', 'Contato · Coprocarne', `${E.endereco}, ${E.bairro}, ${E.cidade}. Fone ${E.fone}.`, A ? contatoA() : contatoB()),
  };
  for (const l of linhas) out[`produtos/${l.slug}`] = pagina(v, `produtos/${l.slug}`, `produtos/${l.slug}/`, `${l.titulo} · Coprocarne`, `${l.titulo} Ouro do Sul: ${l.resumo}`, A ? linhaA(l) : linhaB(l));
  return out;
}
