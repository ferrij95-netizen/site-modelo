// Gera clientes/venturi/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/venturi/_origem/gerar.mjs
// A "Endereço": branca, logo azul, capa com a foto da sala do site atual e a busca por cima, como hoje; destaques em grade,
// a faixa azul-ardósia dos três atalhos e os "mais buscados" em mosaico de fotos.
// B "Grande time": topo azul-escuro do emblema com logo branco, capa dividida (busca à esquerda, cobertura em destaque à direita),
// números, a foto da equipe em faixa inteira, imóveis em abas Comprar/Alugar e os bairros como índice.
import fs from 'node:fs';
import path from 'node:path';
import { empresa as E, servicos, bancos, tipos, bairrosPopulares, condominios, imoveis } from './conteudo.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const DIM = JSON.parse(fs.readFileSync(path.join(aqui, 'dim.json'), 'utf8'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (src, alt, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${DIM[src][0]}" height="${DIM[src][1]}" loading="lazy" decoding="async"${extra}>`;
const ja = ' fetchpriority="high" loading="eager"';
export const nomesVersao = { a: 'Endereço', b: 'Grande time' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'comprar', nome: 'Comprar', caminho: 'comprar/' },
  { slug: 'alugar', nome: 'Alugar', caminho: 'alugar/' },
  { slug: 'encomende', nome: 'Encomende seu imóvel', curto: 'Encomende', caminho: 'encomende/' },
  { slug: 'anuncie', nome: 'Cadastre seu imóvel', curto: 'Anuncie', caminho: 'anuncie/' },
  { slug: 'financiamento', nome: 'Financiamento', caminho: 'financiamento/' },
  { slug: 'contato', nome: 'Fale conosco', curto: 'Contato', caminho: 'contato/' },
];
const u = (v, slug, resto = '') => `/${v}/${nav.find(n => n.slug === slug).caminho}${resto}`;
const ficha = (v, i) => `/${v}/imovel/${i.slug}/`;
const wa = (num, msg) => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
const whats = (msg = 'Olá! Vim pelo site da Venturi.') => wa(E.whatsVendas, msg);
const venda = imoveis.filter(i => i.negocio === 'venda');
const aluguel = imoveis.filter(i => i.negocio === 'aluguel');

const I = {
  whats: '<path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4.1-1.1z"/><path d="M9 8.5c0 3.3 2.9 6.5 6.4 6.6l1-1.6-2.1-1-1 .9a5 5 0 01-2.4-2.4l.9-1-1-2.1z"/>',
  tel: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  voltar: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  lupa: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  busca: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><circle cx="11.5" cy="13" r="3"/><path d="M13.7 15.2L16 17.5"/>',
  cifrao: '<path d="M12 3v18M16.5 7.5c-.8-1.3-2.4-2-4.5-2-2.6 0-4.3 1.3-4.3 3.2 0 4.5 9 2.3 9 6.8 0 2-1.9 3.3-4.7 3.3-2.2 0-3.9-.8-4.7-2.3"/>',
  placa: '<path d="M5 21V3M5 5h14v8H5"/><path d="M9 13v3M15 13v3"/>',
  area: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  cama: '<path d="M3 18v-7a2 2 0 012-2h14a2 2 0 012 2v7M3 14h18M3 18v2M21 18v2M6 9V6h5v3"/>',
  banho: '<path d="M4 12h16v3a4 4 0 01-4 4H8a4 4 0 01-4-4zM6 12V5a2 2 0 014 0M7 19l-1 2M17 19l1 2"/>',
  carro: '<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3z"/><circle cx="7.5" cy="13" r=".8"/><circle cx="16.5" cy="13" r=".8"/>',
  suite: '<path d="M4 20V8l8-4 8 4v12M9 20v-6h6v6"/>',
  pata: '<circle cx="7" cy="9" r="1.6"/><circle cx="12" cy="6.5" r="1.6"/><circle cx="17" cy="9" r="1.6"/><path d="M8.5 16c0-2.4 1.6-4 3.5-4s3.5 1.6 3.5 4-1.6 3-3.5 3-3.5-.6-3.5-3z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  chave: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M14 9l2 2"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/>',
  facebook: '<path d="M14 21v-7.5h2.6l.4-3H14V8.7c0-.9.3-1.5 1.6-1.5H17V4.5a19 19 0 00-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.2H8.3v3h2.6V21"/>',
  linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-3.2c0-1.4.9-2.3 2.1-2.3s1.9.9 1.9 2.3V16M11.5 10.5V16"/>',
  youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.3l5 2.7-5 2.7z"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500;700;900&family=Inter:wght@400;500;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Open+Sans:wght@400;500;600&display=swap',
};

function head(v, caminho, titulo, descricao, img = '') {
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
<meta property="og:site_name" content="${E.nomeLongo}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img || `${E.url}assets/og-${v}.jpg`}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#FFFFFF' : '#252A3F'}">
<link rel="icon" href="/assets/img/favicon.webp" type="image/webp">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTES[v]}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const link = (v, n, atual, curto = false) => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${curto && n.curto ? n.curto : n.nome}</a>`;
const logo = (w, branco = false) => `<img src="/assets/img/logo${branco ? '-branco' : ''}.webp" alt="${E.nomeLongo}" width="${w}" height="${Math.round(w * 88 / 400)}">`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const menu = (v, atual) => `<nav id="menu" class="menu" aria-label="Principal">${nav.slice(1, -1).map(n => link(v, n, atual, true)).join('')}<a class="btn btn-ouro btn-peq" href="${u(v, 'contato')}"${atual === 'contato' ? ' aria-current="page"' : ''}>Fale conosco</a></nav>`;
const areaCliente = `<span class="area-cli">${ic('chave')} Área do cliente: <a href="${E.areaLocatario}" target="_blank" rel="noopener">locatário</a> · <a href="${E.areaProprietario}" target="_blank" rel="noopener">proprietário</a></span>`;
const fones = (cls = '') => `<span class="fones ${cls}"><a href="${whats()}" target="_blank" rel="noopener">${ic('whats')}<span><small>Vendas</small>${E.vendas}</span></a><a href="${wa(E.whatsLocacao, 'Olá! Vim pelo site da Venturi e quero falar sobre locação.')}" target="_blank" rel="noopener">${ic('whats')}<span><small>Locação</small>${E.locacao}</span></a></span>`;

function topo(v, atual) {
  if (v === 'a') return `<div class="pre"><div class="in">${areaCliente}<span class="pre-fones"><a href="tel:${E.fixoHref}">${ic('tel')} ${E.fixo}</a><span>CRECI ${E.creci}</span></span></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="${E.nomeLongo}, início">${logo(188)}</a>
  ${menu(v, atual)}
  ${fones('fones-topo')}
  ${menuBtn}
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="${E.nomeLongo}, início">${logo(176, true)}</a>
  ${menu(v, atual)}
  ${menuBtn}
</div></header>`;
}

const redes = () => `<p class="redes">${Object.entries(E.redes).map(([k, h]) => `<a href="${h}" target="_blank" rel="noopener" aria-label="${k}">${ic(k)}</a>`).join('')}</p>`;

function rodape(v) {
  const tiposCom = tipos.filter(t => imoveis.some(i => i.tipo === t));
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(210, true)}<p>${E.especialidade}</p>${redes()}</div>
  <div><h3>Matriz</h3><p>${E.endereco}<br>${E.bairro} · ${E.cidade}/${E.uf}<br>CEP ${E.cep}</p><p><a class="link" href="${E.mapa}" target="_blank" rel="noopener">Ver no mapa ${ic('seta')}</a></p><p class="creci">CRECI ${E.creci}</p></div>
  <div><h3>Atendimento</h3><p><a href="${whats()}" target="_blank" rel="noopener">${ic('whats')} Vendas ${E.vendas}</a><br><a href="${wa(E.whatsLocacao, 'Olá! Vim pelo site da Venturi.')}" target="_blank" rel="noopener">${ic('whats')} Locação ${E.locacao}</a><br><a href="tel:${E.fixoHref}">${ic('tel')} ${E.fixo}</a><br><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></p>
    <p class="rod-area">Área do cliente:<br><a href="${E.areaLocatario}" target="_blank" rel="noopener">Locatário</a> · <a href="${E.areaProprietario}" target="_blank" rel="noopener">Proprietário</a></p></div>
  <div><h3>Imóveis</h3><p class="rod-lista">${tiposCom.map(t => `<a href="${u(v, 'comprar', `?tipo=${encodeURIComponent(t)}`)}">${t === 'Sala' ? 'Salas' : t + 's'} à venda</a>`).join('')}<a href="${u(v, 'alugar')}">Imóveis para alugar</a></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${nav.map(n => link(v, n, '')).join('')}</nav>
</div>
<div class="rod-bairros in"><h3>Bairros mais populares</h3><p>${bairrosPopulares.map(b => `<span>${b}</span>`).join('')}</p><p class="rod-cidades">Blumenau, Gaspar e Indaial</p></div>
<p class="rod-fim"><span>© ${new Date().getFullYear()} ${E.nomeLongo} · CRECI ${E.creci}</span></p></footer>
<a class="whats-flut" href="${whats()}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${ic('whats')}</a>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo, img) => `${head(v, caminho, titulo, descricao, img)}
<body class="v-${v} p-${sl}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, sl)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// ---------- peças comuns ----------
const tit = (sobre, h, p = '', cls = '') => `<div class="tit ${cls}">${sobre ? `<p class="eyebrow">${sobre}</p>` : ''}<h2>${h}</h2>${p ? `<p>${p}</p>` : ''}</div>`;
const nomeImovel = i => `${i.tipo} ${i.negocio === 'venda' ? 'à venda' : 'para alugar'}`;
const precoTxt = i => `${i.preco}${i.negocio === 'aluguel' ? '<small>/mês</small>' : ''}`;
const specs = (i, cls = 'specs') => {
  const s = [];
  if (i.area) s.push(`${ic('area')}${i.area}`);
  if (i.quartos) s.push(`${ic('cama')}${i.quartos} ${i.quartos === '1' ? 'quarto' : 'quartos'}`);
  if (i.suites) s.push(`${ic('suite')}${i.suites} ${i.suites === '1' ? 'suíte' : 'suítes'}`);
  if (i.banheiros && !i.suites) s.push(`${ic('banho')}${i.banheiros} ${i.banheiros === '1' ? 'banheiro' : 'banheiros'}`);
  if (i.vagas) s.push(`${ic('carro')}${i.vagas} ${i.vagas === '1' ? 'vaga' : 'vagas'}`);
  return `<ul class="${cls}">${s.map(x => `<li>${x}</li>`).join('')}</ul>`;
};
const dataAttrs = i => `data-tipo="${esc(i.tipo)}" data-bairro="${esc(i.bairro)}" data-cod="${i.cod}" data-preco="${i.preco.replace(/\D/g, '')}" data-busca="${esc(`${i.tipo} ${i.bairro} ${i.cidade} ${i.rua} ${i.cod}`.toLowerCase())}"`;

// Item de imóvel (A: foto em cima; B: foto ao lado). O item inteiro é um link.
const itemA = (v, i, lazy = true) => `<li class="im" ${dataAttrs(i)}><a href="${ficha(v, i)}">
  <figure>${foto(`imoveis/${i.fotos[0]}`, `${nomeImovel(i)} no bairro ${i.bairro}`, lazy ? '' : ja)}<span class="im-cod">${i.cod}</span></figure>
  <div class="im-txt"><p class="im-tipo">${nomeImovel(i)}</p><h3>${i.bairro} <span>· ${i.cidade}</span></h3>${specs(i)}<p class="im-preco">${precoTxt(i)}</p></div>
</a></li>`;
const itemB = (v, i) => `<li class="im" ${dataAttrs(i)}><a href="${ficha(v, i)}">
  <figure>${foto(`imoveis/${i.fotos[0]}`, `${nomeImovel(i)} no bairro ${i.bairro}`)}</figure>
  <div class="im-txt"><p class="im-tipo">${i.tipo} <span>${i.cod}</span></p><h3>${i.bairro}</h3><p class="im-cid">${i.rua ? `${i.rua} · ` : ''}${i.cidade}/SC</p>${specs(i)}<p class="im-preco"><span>${i.negocio === 'venda' ? 'Venda' : 'Aluguel'}</span><b>${precoTxt(i)}</b></p></div>
</a></li>`;
const item = (v, i, lazy) => v === 'a' ? itemA(v, i, lazy) : itemB(v, i);

// Busca (home e listas): leva para Comprar ou Alugar com os filtros na URL.
const opcoesTipo = (sel = '') => `<option value="">Todos os tipos</option>${tipos.map(t => `<option${t === sel ? ' selected' : ''}>${t}</option>`).join('')}`;
const busca = (v, cls = '') => `<form class="busca ${cls}" action="${u(v, 'comprar')}" data-busca>
  <div class="busca-abas" role="radiogroup" aria-label="Pretensão"><label><input type="radio" name="pretensao" value="comprar" checked><span>Comprar</span></label><label><input type="radio" name="pretensao" value="alugar"><span>Alugar</span></label></div>
  <div class="busca-campos">
    <label class="b-tipo"><span>Tipo de imóvel</span><select name="tipo">${opcoesTipo()}</select></label>
    <label class="b-onde"><span>Onde</span><input name="q" placeholder="Condomínio, bairro ou cidade" list="lista-bairros"></label>
    <button class="btn btn-azul" type="submit">${ic('lupa')} Encontrar imóvel</button>
  </div>
  <datalist id="lista-bairros">${[...bairrosPopulares, ...E.cidades, ...condominios].map(b => `<option value="${esc(b)}">`).join('')}</datalist>
  <p class="busca-cod"><label>Busca por código <input name="cod" placeholder="Ex.: AP2778" size="10"></label></p>
</form>`;

const servicoLinks = (v, cls = '') => servicos.map(s => `<a class="sv ${cls}" href="${u(v, s.slug)}"><span class="sv-ic">${ic(s.icone)}</span><h3>${s.titulo}</h3><p>${s.texto}</p><span class="sv-acao">${s.acao} ${ic('seta')}</span></a>`).join('');

// Mais buscados: combinações reais do site atual que têm imóvel nesta prévia.
const buscados = (() => {
  const vistos = new Set(); const out = [];
  for (const i of imoveis) {
    const k = `${i.negocio}|${i.tipo}|${i.bairro}`;
    if (vistos.has(k)) continue; vistos.add(k);
    out.push({ i, rotulo: `${i.tipo === 'Sala' ? 'Salas' : i.tipo + 's'} ${i.negocio === 'venda' ? 'à venda' : 'para alugar'}`, bairro: i.bairro, n: imoveis.filter(x => `${x.negocio}|${x.tipo}|${x.bairro}` === k).length });
  }
  return out;
})();
const linkBuscado = (v, b) => u(v, b.i.negocio === 'venda' ? 'comprar' : 'alugar', `?tipo=${encodeURIComponent(b.i.tipo)}&bairro=${encodeURIComponent(b.bairro)}`);

const contatoBloco = (v) => `<div class="cont-lista">
  <a href="${whats()}" target="_blank" rel="noopener">${ic('whats')}<span><small>Vendas</small>${E.vendas}</span></a>
  <a href="${wa(E.whatsLocacao, 'Olá! Vim pelo site da Venturi e quero falar sobre locação.')}" target="_blank" rel="noopener">${ic('whats')}<span><small>Locação</small>${E.locacao}</span></a>
  <a href="tel:${E.fixoHref}">${ic('tel')}<span><small>Fixo</small>${E.fixo}</span></a>
  <a href="mailto:${E.email}">${ic('mail')}<span><small>E-mail</small>${E.email}</span></a>
</div>`;

// ---------- páginas ----------
function home(v) {
    if (v === 'a') return `
<section class="capa">
  ${foto('capa-sala', 'Sala de estar com sofá verde e mesa de madeira', ja)}
  <div class="capa-in in">
    <h1>${E.slogan}</h1>
    <p class="capa-sub">${E.sub}</p>
    ${busca(v)}
  </div>
</section>

<section class="time">
  <div class="in time-in">
    <div class="time-txt"><p class="eyebrow">Venturi Consultoria Imobiliária</p><h2>Grandes negócios começam com um grande time.</h2><p>${E.especialidade} Vendas e locação em Blumenau, Gaspar e Indaial, com atendimento na matriz do bairro Velha.</p>
      <p class="time-acoes"><a class="btn btn-ouro" href="${whats()}" target="_blank" rel="noopener">${ic('whats')} Fale com a Venturi</a><a class="link" href="${u(v, 'anuncie')}">Pensando em vender ou alugar? ${ic('seta')}</a></p></div>
    <figure class="time-foto">${foto('equipe', 'Equipe da Venturi Imobiliária')}</figure>
  </div>
</section>

<section class="sec sec-cinza">
  <div class="in">
    <div class="sec-cab">${tit('Locação', 'Aluguel: casas e apartamentos em Blumenau', 'Aluguel simplificado: a porta para o seu novo endereço está aqui.')}<a class="link" href="${u(v, 'alugar')}">Ver imóveis para alugar ${ic('seta')}</a></div>
    <ul class="lista-im lista-trilho">${aluguel.map(i => item(v, i)).join('')}</ul>
  </div>
</section>

<section class="sec">
  <div class="in">
    <div class="sec-cab">${tit('À venda', 'Oportunidades na Venturi', `Uma seleção dos mais de ${E.aVenda} imóveis à venda.`)}<a class="link" href="${u(v, 'comprar')}">Ver imóveis à venda ${ic('seta')}</a></div>
    <div class="oport">
      ${(() => { const g = imoveis.find(i => i.cod === 'AP2780-VEN2'); return `<a class="op-grande" href="${ficha(v, g)}">${foto(`imoveis/${g.fotos[0]}`, 'Cobertura com piscina no bairro Velha')}<span><small>${g.cod} · ${g.area} · ${g.suites} suítes · ${g.vagas} vagas</small><b>Cobertura com piscina no bairro ${g.bairro}</b><em>${g.preco}</em></span></a>`; })()}
      <ul class="lista-im op-lista">${venda.filter(i => i.cod !== 'AP2780-VEN2').slice(0, 4).map(i => item(v, i)).join('')}</ul>
    </div>
  </div>
</section>

<section class="atalhos"><div class="in atalhos-in">${servicoLinks(v)}</div></section>

<section class="sec">
  <div class="in">
    ${tit('', 'Imóveis mais buscados', '', 'tit-centro')}
    <ul class="mosaico">${buscados.slice(0, 6).map((b, k) => `<li class="mo-${k}"><a href="${linkBuscado(v, b)}">${foto(`imoveis/${b.i.fotos[k % 2 ? 1 : 0]}`, '')}<span>${b.rotulo}<b>${b.bairro}</b></span></a></li>`).join('')}</ul>
  </div>
</section>

<section class="matriz">
  <div class="in matriz-in">
    <div class="matriz-txt">${foto('emblema', '', ' class="matriz-emb"')}<p class="eyebrow">Matriz · CRECI ${E.creci}</p><h2>${E.endereco}<br><span>${E.bairro}, ${E.cidade}/${E.uf}</span></h2>${contatoBloco(v)}<p><a class="btn btn-azul" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Como chegar</a></p></div>
    <div class="matriz-mapa"><iframe src="${E.mapaEmbed}" title="Mapa da matriz da Venturi" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
</section>`;

  // B
  const cob = imoveis.find(i => i.cod === 'AP2780-VEN2');
  const bairrosCom = bairrosPopulares.map(b => ({ b, n: imoveis.filter(i => i.bairro === b).length }));
  return `
<section class="capa">
  <div class="capa-txt">
    <p class="eyebrow">Imóveis em Blumenau, Gaspar e Indaial</p>
    <h1>Blumenau começa pelo seu <em>endereço.</em></h1>
    <p class="capa-sub">${E.sub}</p>
    ${busca(v, 'busca-b')}
  </div>
  <a class="capa-foto" href="${ficha(v, cob)}">
    ${foto(`imoveis/${cob.fotos[0]}`, 'Cobertura com piscina no bairro Velha', ja)}
    <span class="capa-tag"><small>Destaque · ${cob.cod}</small><b>Cobertura com piscina</b>${cob.bairro} · ${cob.area} · ${cob.suites} suítes<em>${cob.preco}</em></span>
  </a>
</section>

<section class="numeros"><div class="in">
  <p><b>${E.aVenda}+</b>imóveis à venda</p>
  <p><b>3</b>cidades: Blumenau, Gaspar e Indaial</p>
  <p><b>2</b>frentes: vendas e locação</p>
  <p><b>${E.creci}</b>CRECI da Venturi</p>
</div></section>

<section class="time">
  ${foto('equipe', 'Equipe da Venturi Imobiliária')}
  <div class="time-txt in"><h2>Grandes negócios começam com um grande time.</h2><p>${E.especialidade}</p><a class="btn btn-ouro" href="${whats()}" target="_blank" rel="noopener">${ic('whats')} Fale com a Venturi</a></div>
</section>

<section class="sec">
  <div class="in">
    <div class="sec-cab">${tit('Escolhidos para você', 'Imóveis Venturi')}</div>
    <div class="abas" data-abas>
      <div class="abas-bts" role="tablist" aria-label="Pretensão"><button role="tab" id="t-alug" aria-controls="p-alug" aria-selected="true">Alugar</button><button role="tab" id="t-venda" aria-controls="p-venda" aria-selected="false" tabindex="-1">Comprar</button></div>
      <div id="p-venda" role="tabpanel" aria-labelledby="t-venda" hidden><ul class="lista-im">${venda.slice(0, 6).map(i => item(v, i)).join('')}</ul><p class="mais"><a class="btn btn-azul" href="${u(v, 'comprar')}">Ver todos à venda ${ic('seta')}</a></p></div>
      <div id="p-alug" role="tabpanel" aria-labelledby="t-alug"><ul class="lista-im">${aluguel.map(i => item(v, i)).join('')}</ul><p class="mais"><a class="btn btn-azul" href="${u(v, 'alugar')}">Ver todos para alugar ${ic('seta')}</a></p></div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="in">
    ${tit('Como a Venturi ajuda', 'Do primeiro contato às chaves na mão', '', 'tit-centro')}
    <ol class="trilha">${servicos.map((s, k) => `<li><a href="${u(v, s.slug)}"><span class="tr-n">0${k + 1}</span><span class="tr-ic">${ic(s.icone)}</span><h3>${s.titulo}</h3><p>${s.texto}</p><span class="sv-acao">${s.acao} ${ic('seta')}</span></a></li>`).join('')}</ol>
  </div>
</section>

<section class="sec sec-gelo">
  <div class="in bairros-in">
    ${tit('Bairros mais populares', 'Onde a Venturi está', 'Os bairros mais procurados no site da Venturi. Os destacados têm imóvel nesta seleção.')}
    <ul class="indice">${bairrosCom.map(({ b, n }) => n ? `<li><a href="${u(v, 'comprar', `?bairro=${encodeURIComponent(b)}`)}">${b}<span>${n} ${n > 1 ? 'imóveis' : 'imóvel'}</span></a></li>` : `<li><span class="ind-off">${b}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="anuncie">
  <div class="in anuncie-in">
    <div><p class="eyebrow">Proprietário</p><h2>Seu imóvel. Nossa experiência.</h2><p>Pensando em vender ou alugar? Anuncie com a Venturi e nós encontraremos o melhor negócio para você.</p></div>
    <p class="anuncie-acoes"><a class="btn btn-ouro" href="${u(v, 'anuncie')}">Anuncie com a Venturi ${ic('seta')}</a><a class="btn btn-linha" href="${whats('Olá! Quero anunciar meu imóvel com a Venturi.')}" target="_blank" rel="noopener">${ic('whats')} ${E.vendas}</a></p>
  </div>
</section>`;
}

const cabPagina = (v, eyebrow, h1, p = '') => `<section class="cab-pag"><div class="in"><p class="trilho"><a href="/${v}/">Início</a> / ${esc(h1)}</p><p class="eyebrow">${eyebrow}</p><h1>${h1}</h1>${p ? `<p class="cab-sub">${p}</p>` : ''}</div></section>`;

function lista(v, neg) {
  const L = neg === 'venda' ? venda : aluguel;
  const tiposL = [...new Set(L.map(i => i.tipo))];
  const bairrosL = [...new Set(L.map(i => i.bairro))].sort((a, b) => a.localeCompare(b, 'pt'));
  const total = neg === 'venda' ? `São ${E.aVenda} imóveis à venda na Venturi. Nesta prévia, uma seleção de ${L.length} deles.` : `Apartamentos, casas e salas para alugar em Blumenau, com o pacote de locação já somado.`;
  return `${cabPagina(v, neg === 'venda' ? 'Comprar' : 'Alugar', neg === 'venda' ? 'Imóveis à venda' : 'Imóveis para alugar', total)}
<section class="sec sec-lista"><div class="in">
  <form class="filtros" data-filtros>
    <div class="chips" role="group" aria-label="Tipo"><button type="button" class="chip" data-tipo="" aria-pressed="true">Todos</button>${tiposL.map(t => `<button type="button" class="chip" data-tipo="${esc(t)}" aria-pressed="false">${t === 'Sala' ? 'Salas' : t + 's'}</button>`).join('')}</div>
    <label><span>Bairro</span><select name="bairro"><option value="">Todos os bairros</option>${bairrosL.map(b => `<option>${b}</option>`).join('')}</select></label>
    <label><span>Buscar</span><input name="q" placeholder="Bairro, rua ou código"></label>
    <label><span>Ordenar</span><select name="ordem"><option value="">Recentes</option><option value="menor">Menor preço</option><option value="maior">Maior preço</option></select></label>
  </form>
  <p class="contagem" aria-live="polite"><b data-n>${L.length}</b> imóveis</p>
  <ul class="lista-im" data-lista>${L.map((i, k) => item(v, i, k > 2)).join('')}</ul>
  <div class="vazio" data-vazio hidden><p>Nenhum imóvel desta seleção com esses filtros.</p><p><a class="btn btn-azul" href="${u(v, 'encomende')}">Encomende seu imóvel ${ic('seta')}</a></p></div>
</div></section>
<section class="faixa-enc"><div class="in"><p><b>Não achou o que procura?</b> Descreva o imóvel e nós avisaremos quando encontrá-lo.</p><a class="btn btn-ouro" href="${u(v, 'encomende')}">Encomende seu imóvel ${ic('seta')}</a></div></section>`;
}

function fichaPag(v, i) {
  const lista2 = imoveis.filter(x => x.negocio === i.negocio && x.cod !== i.cod).slice(0, 3);
  const msg = `Olá! Tenho interesse no imóvel código ${i.cod}. Poderia me passar mais informações?`;
  const num = i.negocio === 'venda' ? E.whatsVendas : E.whatsLocacao;
  const valores = [
    i.cond && ['Condomínio', i.cond], i.iptu && ['IPTU', i.iptu], i.pacote && ['Pacote de locação', `${i.pacote}/mês`], i.m2 && ['Valor do m²', i.m2],
  ].filter(Boolean);
  const dados = [
    ['Área', i.area], i.terreno && ['Terreno', i.terreno], i.quartos && ['Quartos', i.quartos], i.suites && ['Suítes', i.suites], i.banheiros && ['Banheiros', i.banheiros], i.vagas && ['Vagas', i.vagas], i.pet && ['Aceita pet', 'Sim'],
  ].filter(Boolean);
  const desc = [];
  let ul = null;
  for (const l of i.desc) {
    if (/^[-•]/.test(l)) { (ul ||= []).push(l.replace(/^[-•]\s*/, '').replace(/;$/, '')); continue; }
    if (ul) { desc.push(`<ul>${ul.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`); ul = null; }
    const caixa = l.length > 8 && l === l.toUpperCase();
    desc.push(caixa ? `<p class="desc-lead">${esc(l.charAt(0) + l.slice(1).toLowerCase().replace(/\b(velha|blumenau)\b/g, w => w[0].toUpperCase() + w.slice(1)))}</p>` : `<p>${esc(l)}</p>`);
  }
  if (ul) desc.push(`<ul>${ul.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`);
  return `<section class="ficha"><div class="in">
  <p class="trilho"><a href="/${v}/">Início</a> / <a href="${u(v, i.negocio === 'venda' ? 'comprar' : 'alugar')}">${i.negocio === 'venda' ? 'Comprar' : 'Alugar'}</a> / ${i.cod}</p>
  <div class="galeria" data-galeria>
    <figure class="gal-1">${foto(`imoveis/${i.fotos[0]}`, `${nomeImovel(i)} no bairro ${i.bairro}, foto 1`, ja)}</figure>
    ${i.fotos.slice(1, 5).map((f, k) => `<figure>${foto(`imoveis/${f}`, `${nomeImovel(i)}, foto ${k + 2}`)}</figure>`).join('')}
  </div>
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="eyebrow">${nomeImovel(i)} · ${i.cod}</p>
      <h1>${nomeImovel(i)} no bairro ${i.bairro}</h1>
      <p class="ficha-end">${ic('pin')} ${i.rua ? `${esc(i.rua)} · ` : ''}${i.bairro} · ${i.cidade}/SC</p>
      ${specs(i, 'specs specs-g')}
      <h2>Descrição</h2>
      <div class="desc">${desc.join('')}</div>
      ${i.carac.length ? `<h2>Características</h2><ul class="carac">${i.carac.map(c => `<li>${ic('check')}${esc(c)}</li>`).join('')}</ul>` : ''}
      <h2>Ficha</h2>
      <dl class="dados">${dados.map(([k, x]) => `<div><dt>${k}</dt><dd>${x}</dd></div>`).join('')}</dl>
    </div>
    <aside class="ficha-box">
      <p class="fb-neg">${i.negocio === 'venda' ? 'Venda' : 'Aluguel'}</p>
      <p class="fb-preco">${precoTxt(i)}</p>
      ${valores.length ? `<dl class="fb-val">${valores.map(([k, x]) => `<div><dt>${k}</dt><dd>${x}</dd></div>`).join('')}</dl>` : ''}
      <a class="btn btn-ouro btn-larg" href="${wa(num, msg)}" target="_blank" rel="noopener">${ic('whats')} Quero saber mais</a>
      <a class="btn btn-linha btn-larg" href="tel:${E.fixoHref}">${ic('tel')} ${E.fixo}</a>
      <p class="fb-obs">Fale com a Venturi pelo WhatsApp de ${i.negocio === 'venda' ? 'vendas' : 'locação'} citando o código <b>${i.cod}</b>.</p>
    </aside>
  </div>
</div></section>
<section class="sec sec-cinza"><div class="in">${tit('', 'Já viu estes imóveis?')}<ul class="lista-im">${lista2.map(x => item(v, x)).join('')}</ul></div></section>`;
}

const campo = (rot, nome, tipo = 'text', extra = '') => `<label>${rot}<input name="${nome}" type="${tipo}"${extra}></label>`;
const sel = (rot, nome, ops) => `<label>${rot}<select name="${nome}">${ops.map(o => `<option>${o}</option>`).join('')}</select></label>`;
const formZap = (titulo, campos, num, botao = 'Enviar pelo WhatsApp') => `<form class="form" data-zap="${num}" data-titulo="${esc(titulo)}">
  <div class="campos">${campos}</div>
  <button class="btn btn-ouro" type="submit">${ic('whats')} ${botao}</button>
  <p class="form-obs">A mensagem abre no WhatsApp da Venturi já preenchida. Ao enviar você concorda com os termos de uso e a política de privacidade.</p>
</form>`;

function encomende(v) {
  return `${cabPagina(v, 'Imóvel sob encomenda', 'Encomende seu imóvel', 'Descreva o imóvel que você procura e nós avisaremos quando encontrá-lo.')}
<section class="sec"><div class="in duas">
  <div class="lado">
    <h2>Como funciona</h2>
    <ol class="passos-mini"><li><b>Você descreve</b> o tipo, os bairros e quanto quer investir.</li><li><b>A Venturi procura</b> na carteira e entre os imóveis de terceiros em Blumenau.</li><li><b>Avisamos você</b> pelo WhatsApp quando encontrar.</li></ol>
    ${contatoBloco(v)}
  </div>
  ${formZap('Encomenda de imóvel', [
    campo('Nome', 'Nome', 'text', ' autocomplete="name" required'), campo('Telefone / WhatsApp', 'Telefone', 'tel', ' autocomplete="tel" required'), campo('E-mail', 'E-mail', 'email', ' autocomplete="email"'),
    sel('Pretensão', 'Pretensão', ['Comprar', 'Alugar']), sel('Tipo de imóvel', 'Tipo', tipos), campo('Bairros de interesse', 'Bairros'),
    sel('Quartos', 'Quartos', ['Tanto faz', '1', '2', '3', '4 ou mais']), campo('Valor até (R$)', 'Valor máximo', 'text', ' inputmode="numeric"'),
    `<label class="larg">Descreva o imóvel<textarea name="Descrição" rows="4"></textarea></label>`,
  ].join(''), E.whatsVendas)}
</div></section>`;
}

function anuncie(v) {
  return `${cabPagina(v, 'Cadastre seu imóvel', 'Seu imóvel. Nossa experiência.', 'Anuncie conosco! Nós encontraremos o melhor negócio para você, para venda ou locação.')}
<section class="sec"><div class="in duas">
  <div class="lado">
    <figure class="lado-foto">${foto('equipe', 'Equipe da Venturi')}</figure>
    <h2>Por que anunciar com a Venturi</h2>
    <ul class="lista-check"><li>${ic('check')}Mais de ${E.aVenda} imóveis à venda: quem procura em Blumenau passa pela Venturi.</li><li>${ic('check')}Equipe de vendas e de locação, cada uma com seu atendimento.</li><li>${ic('check')}Área do proprietário on-line para quem aluga com a Venturi.</li></ul>
  </div>
  ${formZap('Cadastro de imóvel', [
    '<p class="form-grupo">Proprietário</p>',
    campo('Nome', 'Nome', 'text', ' autocomplete="name" required'), campo('Telefone / WhatsApp', 'Telefone', 'tel', ' autocomplete="tel" required'), campo('E-mail', 'E-mail', 'email', ' autocomplete="email"'),
    '<p class="form-grupo">Características</p>',
    sel('Finalidade', 'Finalidade', ['Residencial', 'Comercial', 'Industrial', 'Rural', 'Temporada', 'Corporativa']), sel('Tipo', 'Tipo', tipos), sel('Para', 'Para', ['Venda', 'Locação', 'Venda e locação']),
    campo('Endereço', 'Endereço', 'text', ' autocomplete="street-address"'), campo('Bairro', 'Bairro'), campo('Área (m²)', 'Área', 'text', ' inputmode="numeric"'),
    sel('Quartos', 'Quartos', ['-', '1', '2', '3', '4 ou mais']), campo('Valor pretendido (R$)', 'Valor', 'text', ' inputmode="numeric"'),
    `<label class="larg">Observações<textarea name="Observações" rows="3"></textarea></label>`,
  ].join(''), E.whatsVendas, 'Cadastrar pelo WhatsApp')}
</div></section>`;
}

function financiamento(v) {
  return `${cabPagina(v, 'Serviços', 'Financiamento e bancos', 'As melhores ofertas de crédito para você financiar seu imóvel. Escolha um banco e faça a sua simulação.')}
<section class="sec"><div class="in">
  <ul class="bancos">${bancos.map(b => `<li><a href="${b.url}" target="_blank" rel="noopener" style="--bc:${b.cor}"><span class="bc-cor"></span><b>${b.nome}</b><span>Simular no site do banco ${ic('seta')}</span></a></li>`).join('')}</ul>
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <div class="lado">${tit('Conta rápida', 'Quanto fica a primeira parcela?', 'Uma estimativa pela tabela SAC, sem seguros e taxas. O valor real sai na simulação do banco; a Venturi ajuda você a comparar.')}${contatoBloco(v)}</div>
  <form class="form simul" data-simul>
    <div class="campos">
      <label>Valor do imóvel (R$)<input name="valor" inputmode="numeric" value="600.000"></label>
      <label>Entrada (R$)<input name="entrada" inputmode="numeric" value="120.000"></label>
      <label>Prazo<select name="prazo"><option value="420">35 anos</option><option value="360" selected>30 anos</option><option value="240">20 anos</option><option value="120">10 anos</option></select></label>
      <label>Juros ao ano (%)<input name="juros" inputmode="decimal" value="11,5"></label>
    </div>
    <div class="simul-res" aria-live="polite"><p><small>Valor financiado</small><b data-fin>-</b></p><p><small>1ª parcela (SAC)</small><b data-par>-</b></p><p><small>Última parcela</small><b data-ult>-</b></p></div>
  </form>
</div></section>`;
}

function contato(v) {
  return `${cabPagina(v, 'Contato', 'Fale conosco', 'Atendimento de vendas e de locação, na matriz do bairro Velha ou pelo WhatsApp.')}
<section class="sec"><div class="in duas">
  <div class="lado">
    <h2>Matriz</h2>
    <p class="cont-end">${E.endereco}<br>${E.bairro} · ${E.cidade}/${E.uf} · CEP ${E.cep}<br><span class="creci">CRECI ${E.creci}</span></p>
    ${contatoBloco(v)}
    <h2>Área do cliente</h2>
    <p class="cli-bts"><a class="btn btn-linha" href="${E.areaLocatario}" target="_blank" rel="noopener">${ic('user')} Área do locatário</a><a class="btn btn-linha" href="${E.areaProprietario}" target="_blank" rel="noopener">${ic('chave')} Área do proprietário</a></p>
    ${redes()}
  </div>
  ${formZap('Contato pelo site', [
    campo('Nome', 'Nome', 'text', ' autocomplete="name" required'), campo('Telefone / WhatsApp', 'Telefone', 'tel', ' autocomplete="tel" required'), campo('E-mail', 'E-mail', 'email', ' autocomplete="email"'),
    sel('Assunto', 'Assunto', ['Comprar um imóvel', 'Alugar um imóvel', 'Anunciar meu imóvel', 'Sou locatário', 'Sou proprietário', 'Outro']),
    `<label class="larg">Mensagem<textarea name="Mensagem" rows="4"></textarea></label>`,
  ].join(''), E.whatsVendas)}
</div></section>
<section class="mapa-larg"><iframe src="${E.mapaEmbed}" title="Mapa da matriz da Venturi" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;
}

// ---------- gravar ----------
const grava = (rel, html) => { const f = path.join(pub, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); };
for (const v of ['a', 'b']) {
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  const desc = `${E.nomeLongo}: imóveis para venda e locação em Blumenau. ${E.sub}`;
  grava(`${v}/index.html`, pagina(v, 'index', '', `Venturi Imóveis · ${E.slogan}`, desc, home(v)));
  grava(`${v}/comprar/index.html`, pagina(v, 'comprar', 'comprar/', 'Imóveis à venda em Blumenau · Venturi', `Apartamentos, casas, coberturas e terrenos à venda em Blumenau. ${E.aVenda} imóveis na Venturi.`, lista(v, 'venda')));
  grava(`${v}/alugar/index.html`, pagina(v, 'alugar', 'alugar/', 'Imóveis para alugar em Blumenau · Venturi', 'Apartamentos, casas e salas para alugar em Blumenau com a Venturi.', lista(v, 'aluguel')));
  grava(`${v}/encomende/index.html`, pagina(v, 'encomende', 'encomende/', 'Encomende seu imóvel · Venturi', 'Descreva o imóvel que você procura e nós avisaremos quando encontrá-lo.', encomende(v)));
  grava(`${v}/anuncie/index.html`, pagina(v, 'anuncie', 'anuncie/', 'Cadastre seu imóvel · Venturi', 'Anuncie conosco! Nós encontraremos o melhor negócio para você.', anuncie(v)));
  grava(`${v}/financiamento/index.html`, pagina(v, 'financiamento', 'financiamento/', 'Financiamento e bancos · Venturi', 'As melhores ofertas de crédito para você financiar seu imóvel.', financiamento(v)));
  grava(`${v}/contato/index.html`, pagina(v, 'contato', 'contato/', 'Fale conosco · Venturi', `Venturi Consultoria Imobiliária, ${E.endereco}, ${E.bairro}, ${E.cidade}/${E.uf}. Vendas ${E.vendas}, locação ${E.locacao}.`, contato(v)));
  for (const i of imoveis) {
    const t = `${nomeImovel(i)} no ${i.bairro}, ${i.area} · ${i.preco}${i.negocio === 'aluguel' ? '/mês' : ''} · Venturi`;
    grava(`${v}/imovel/${i.slug}/index.html`, pagina(v, 'ficha', `imovel/${i.slug}/`, t, `${nomeImovel(i)} em ${i.bairro}, ${i.cidade}/SC. Código ${i.cod}.`, fichaPag(v, i)));
  }
}
console.log(`venturi: ${(7 + imoveis.length) * 2} páginas em a/ e b/`);

const kit = path.join(aqui, '../../../componentes/apresentacao');
if (fs.existsSync(path.join(pub, 'assets/apresentacao/a-pc.webp'))) {
  const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
  fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
    nome: 'Venturi', artigo: 'da', url: E.url, lang: 'pt', cor: '#B08402', fundo: '#252A3F', claro: '#F3F4F7',
    fonteTitulo: '"Red Hat Display",system-ui,sans-serif', fonteTexto: 'Inter,system-ui,sans-serif',
    googleFonts: FONTES.a,
    favicon: '/assets/img/favicon.webp', ogImagem: `${E.url}assets/og-a.jpg`,
    versoes: [
      { letra: 'a', nome: nomesVersao.a, paginas: 7 + imoveis.length, texto: 'Clara, com o logo azul e a mesma ordem da home de hoje: a foto da sala com a busca por cima, o grande time, os destaques, a faixa azul de encomenda, financiamento e cadastro e os mais buscados em mosaico de fotos.', pontos: ['Busca por tipo, bairro e código que já filtra as listas', 'Ficha de cada imóvel com galeria, valores e WhatsApp com o código', 'Mapa da matriz e área do cliente sempre à mão'] },
      { letra: 'b', nome: nomesVersao.b, paginas: 7 + imoveis.length, texto: 'Mais comercial: topo no azul-escuro do emblema com o logo branco, capa dividida com a busca e uma cobertura em destaque, a foto da equipe em faixa inteira e o dourado do logo nos botões.', pontos: ['Comprar e Alugar em abas na home', 'Encomenda, financiamento e cadastro como uma trilha de 3 passos', 'Índice dos bairros mais procurados'] },
    ],
    antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
  }));
  console.log('venturi: escolha em public/index.html');
}
