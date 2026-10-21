// Páginas das versões A ("Rota": fiel ao site atual, faixa azul do menu, banner, vitrine com abas e marcas) e
// B ("Pedido": o site como ferramenta de compra, busca grande, departamentos, filtros e lista de orçamento ao lado).
// Estilos em public/assets/{base,a,b}.css; comportamento em public/assets/ux.js (igual nas duas).
import fs from 'node:fs';
import path from 'node:path';
import { empresa as E, textos as T, catalogo as C, cidades, creditos } from './conteudo.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const contornoSP = JSON.parse(fs.readFileSync(path.join(aqui, 'mapa-sp.json'), 'utf8'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nomeMarca = Object.fromEntries([...C.marcas.map(m => [m.slug, m.nome]), ['outras', 'Outras marcas']]);
const nomeCat = Object.fromEntries(C.cats);
const porSlug = new Map(C.produtos.map(p => [p.slug, p]));
const total = C.produtos.length;
const nCat = c => C.produtos.filter(p => p.cat === c).length;

export const nomesVersao = { a: 'Rota', b: 'Pedido' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'marcas', nome: 'Marcas', caminho: 'marcas/' },
  { slug: 'cidades-atendidas', nome: 'Cidades atendidas', caminho: 'cidades-atendidas/' },
  { slug: 'cesta-basica', nome: 'Cesta básica', caminho: 'cesta-basica/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

// ---------- ícones ----------
const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  whats: '<path d="M4 20l1.3-3.8A8 8 0 1112 20a8 8 0 01-3.9-1z"/><path d="M9 9.5c.3 2 1.8 3.8 4 4.8l1.2-1.2 1.8.8-.4 1.6c-3.6.2-7-3.2-7-6.8l1.6-.4.8 1.8z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  esq: '<path d="M15 5l-7 7 7 7"/>',
  dir: '<path d="M9 5l7 7-7 7"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  lupa: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01" stroke-width="3"/>',
  caminhao: '<path d="M2 6h11v10H2zM13 9h4.5l3.5 3.5V16h-8z"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  floco: '<path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7"/><path d="M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5"/>',
  equipe: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2c3 .2 5.5 2.4 5.5 5.8"/>',
  satelite: '<path d="M4 10l4-4 4 4-4 4zM12 18l4-4 4 4-4 4zM10 12l4 4"/><path d="M15 3a6 6 0 016 6M15 6a3 3 0 013 3"/>',
  caixa: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  ok: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  face: '<path d="M14 21v-8h3l.5-3.5H14V7.8c0-1 .3-1.8 1.8-1.8h1.8V3a24 24 0 00-2.7-.1C12.3 2.9 10.5 4.5 10.5 7.4v2.1H7.5V13h3v8"/>',
  insta: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7h.01" stroke-width="2.6"/>',
  presente: '<path d="M3 10h18v4H3zM5 14h14v7H5zM12 10v11"/><path d="M12 10C9 10 7 8.5 7 6.8S9.5 4 12 10zM12 10c3 0 5-1.5 5-3.2S14.5 4 12 10z"/>',
  // segmentos de clientes
  carrinho: '<path d="M3 4h2.5l2.2 10.5h10.6L20.5 7H6.4"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  loja: '<path d="M4 10v10h16V10M3 10l2-6h14l2 6zM9 20v-5h6v5"/>',
  conv: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M5 9h14M9 6h.01M9 13h6M9 16h6"/>',
  pao: '<path d="M4 15c0-5 3.6-9 8-9s8 4 8 9v3H4z"/><path d="M9 9.5l1 3.5M12 9v4M15 9.5l-1 3.5"/>',
  copo: '<path d="M6 4h12l-1.5 16h-9z"/><path d="M6.6 10h10.8"/>',
  lanche: '<path d="M4 11a8 5 0 0116 0z"/><path d="M3.5 14h17M4.5 17h15a1 1 0 01-1 2h-13a1 1 0 01-1-2z"/>',
  prato: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3.5"/><path d="M2 5v5M2 7.5h.01M22 4v16"/>',
  panela: '<path d="M4 10h16v6a4 4 0 01-4 4H8a4 4 0 01-4-4zM2 10h20M9 6c0-1 .5-2 1.5-2M14 6c0-1 .5-2 1.5-2"/>',
  festa: '<path d="M4 20L9 7l8 8z"/><path d="M14 4l1 2M19 5l-2 2M20 10l-2-.5M11 3c1 2 .5 3-1 4"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const iconeCliente = ['carrinho', 'loja', 'conv', 'pao', 'copo', 'lanche', 'prato', 'panela', 'festa'];

// A "pá" do logo (uma das quatro lâminas do cata-vento), recortada do símbolo vetorizado (assets/pa.svg).
const pa = (cor, extra = '') => `<span class="pa" aria-hidden="true" style="color:${cor}"${extra}></span>`;
const simbolo = (cls = 'simbolo') => `<img class="${cls}" src="/assets/simbolo.svg" alt="" width="341" height="341" aria-hidden="true">`;

// ---------- produtos ----------
const spr = p => `<span class="spr" style="--bg:url(/assets/sprites/p${String(p.s).padStart(2, '0')}.webp);--x:${p.i % 5};--y:${Math.floor(p.i / 5)}" role="img" aria-label="${esc(p.nome)}, embalagem"></span>`;
function embalagem(nome) {
  const m = nome.match(/(\d+)\s?x\s?(\d+(?:[.,]\d+)?)\s?(g|ml|kg)\b/i);
  if (m) return `${m[1]} unidades de ${m[2]} ${m[3].toLowerCase()}`;
  const u = nome.match(/c\/\s?(\d+)\s?(unidades)?/i);
  if (u) return `Com ${u[1]} unidades`;
  const t = nome.match(/(\d+(?:[.,]\d+)?)\s?(g|ml|kg|litros?)\b/i);
  return t ? `${t[1]} ${t[2].toLowerCase()}` : '';
}
const qtd = `<div class="qtd"><button type="button" data-menos aria-label="Diminuir">${ic('mais').replace(I.mais, '<path d="M5 12h14"/>')}</button><input type="text" inputmode="numeric" value="1" aria-label="Quantidade"><button type="button" data-mais aria-label="Aumentar">${ic('mais')}</button></div>`;
const card = p => `<article class="pc" data-slug="${p.slug}">
<button type="button" class="pc-ver" data-ver aria-label="Ver ${esc(p.nome)}">${spr(p)}</button>
<p class="pc-marca">${esc(nomeMarca[p.marca])}</p><h3 class="pc-nome">${esc(p.nome)}</h3><p class="pc-emb">${esc(embalagem(p.nome))}</p>
<div class="pc-acao">${qtd}<button type="button" class="pc-add" data-add>${ic('mais')}<span>Adicionar</span></button></div></article>`;
const escolher = (marca, cat, n, pular = 0) => C.produtos.filter(p => (!marca || p.marca === marca) && (!cat || p.cat === cat)).slice(pular, pular + n);
const amostra = (c, n = 3) => { const l = C.produtos.filter(p => p.cat === c); return Array.from({ length: n }, (_, i) => l[Math.floor(i * l.length / n)]); };

// Vitrine da home: as mesmas abas nas duas versões, montadas a partir do catálogo real.
const vitrine = [
  { id: 'trento', nome: 'Trento', itens: escolher('peccin', 'chocolates', 14) },
  { id: 'balas', nome: 'Balas e gomas', itens: [...escolher('docile', 'balas', 7, 15), ...escolher('peccin', 'balas', 7)] },
  { id: 'bebidas', nome: 'Bebidas', itens: [...escolher('baly', '', 5), ...escolher('tial', '', 5, 12), ...escolher('jussara', '', 4)] },
  { id: 'mercearia', nome: 'Mercearia', itens: [...escolher('pramesa', '', 6, 2), ...escolher('robinson-crusoe', '', 4, 5), ...escolher('rigomel', '', 4, 1)] },
  { id: 'salgadinhos', nome: 'Salgadinhos', itens: escolher('chef-chips', '', 14) },
  { id: 'cereais', nome: 'Granolas', itens: escolher('kobber', '', 14, 3) },
];

// ---------- mapa das cidades ----------
const [, LAT0, LON0] = cidades.find(c => c[0] === 'Ribeirão Preto');
const KX = 111.32 * Math.cos(LAT0 * Math.PI / 180), KY = 110.57;
const px = (lat, lon) => [((lon - LON0) * KX).toFixed(1), ((LAT0 - lat) * KY).toFixed(1)];
const rotulos = ['Ribeirão Preto', 'Franca', 'Araraquara', 'São Carlos', 'Barretos', 'Bebedouro', 'Batatais', 'Pirassununga', 'São José do Rio Pardo', 'Ituverava', 'Matão', 'Orlândia', 'Ibitinga'];
function mapa(cls = 'mapa') {
  const sp = 'M' + contornoSP.map(([lon, lat]) => px(lat, lon).join(',')).join('L') + 'Z';
  const pts = cidades.map(([n, lat, lon]) => {
    const [x, y] = px(lat, lon);
    const sede = n === 'Ribeirão Preto';
    const rot = rotulos.includes(n);
    const lado = ['Franca', 'São José do Rio Pardo', 'Pirassununga', 'Batatais', 'Ituverava'].includes(n) ? 'start' : 'end';
    return `<g class="cid${sede ? ' sede' : ''}" data-cid="${esc(n)}"><title>${esc(n)}</title>${sede ? `<circle r="9" cx="${x}" cy="${y}" class="sede-anel"/>` : ''}<circle r="${sede ? 5 : 3.2}" cx="${x}" cy="${y}"/>${rot ? `<text x="${+x + (lado === 'start' ? 7 : -7)}" y="${+y - 6}" text-anchor="${lado}">${esc(n)}</text>` : ''}</g>`;
  }).join('');
  return `<svg class="${cls}" viewBox="-250 -215 500 430" role="img" aria-label="Mapa com as ${cidades.length} cidades atendidas pela Ultramix ao redor de Ribeirão Preto">
<defs><radialGradient id="raio-${cls}"><stop offset="0" stop-color="var(--mapa-raio)" stop-opacity=".34"/><stop offset="1" stop-color="var(--mapa-raio)" stop-opacity=".04"/></radialGradient></defs>
<rect x="-250" y="-215" width="500" height="430" class="fora"/>
<path d="${sp}" class="estado"/>
<circle r="200" class="raio" fill="url(#raio-${cls})"/>
<circle r="100" class="raio-meio"/>
<text x="0" y="-186" class="raio-txt" text-anchor="middle">raio de 200 km</text>
<text x="168" y="-150" class="uf">MG</text><text x="-200" y="160" class="uf">SP</text>
${pts}</svg>`;
}
const letras = () => {
  const g = {};
  for (const [n] of cidades) (g[n[0]] ||= []).push(n);
  return Object.entries(g);
};

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
<meta property="og:site_name" content="${E.nomeLongo}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#023F87' : '#FFFFFF'}">
<link rel="icon" href="/assets/simbolo.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Saira:wdth,wght@100..125,500..800&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/ux.js" defer></script>
</head>`;
}
const atualDe = s => s.startsWith('marca-') ? 'marcas' : s;
const link = (v, n, atual, cls = '') => `<a href="/${v}/${n.caminho}"${cls ? ` class="${cls}"` : ''}${n.slug === atualDe(atual) ? ' aria-current="page"' : ''}>${n.nome}</a>`;
const logo = (w = 230, branco = false) => `<img src="/assets/logo${branco ? '-branco' : ''}.svg" alt="Distribuidora Ultramix" width="${w}" height="${Math.round(w * 96.6 / 263.9)}">`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const whatsLink = (txt = 'Olá, Ultramix! Vim pelo site.') => `https://api.whatsapp.com/send?phone=${E.whatsNum}&text=${encodeURIComponent(txt)}`;
const btnOrc = v => `<a class="btn-orc" href="/${v}/orcamento/">${ic('lista')}<span>Orçamento</span><b data-orc-n hidden>0</b></a>`;
const buscaTopo = (v, ph) => `<form class="busca" action="/${v}/produtos/" method="get" role="search" data-busca><input type="search" name="q" placeholder="${ph}" aria-label="Buscar produtos" autocomplete="off"><button type="submit" aria-label="Buscar">${ic('lupa')}</button></form>`;

function topo(v, atual) {
  if (v === 'a') return `<header class="topo">
<div class="topo-1"><div class="in">
  <a class="marca" href="/a/" aria-label="Distribuidora Ultramix, início">${logo(190)}</a>
  ${buscaTopo(v, 'Buscar entre os ' + total + ' produtos')}
  <div class="topo-contato">
    <div class="topo-redes"><a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a></div>
    <a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
    <a href="${whatsLink()}" target="_blank" rel="noopener">${ic('whats')} ${E.whats}</a>
  </div>
  ${btnOrc(v)}${menuBtn}
</div></div>
<nav id="menu" class="menu" aria-label="Principal"><div class="in">${nav.map(n => link(v, n, atual)).join('')}<a href="/a/orcamento/" class="menu-orc${atual === 'orcamento' ? '" aria-current="page' : ''}">Orçamentos</a></div></nav>
</header>`;
  return `<div class="faixa-b"><div class="in"><span>${ic('caminhao')} Entregamos em ${cidades.length} cidades num raio de ${E.raio} km de Ribeirão Preto</span><a href="/b/cidades-atendidas/">Confira a sua cidade ${ic('seta')}</a></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Distribuidora Ultramix, início"><img class="marca-s" src="/assets/simbolo.svg" alt="" width="44" height="44"><img class="marca-t" src="/assets/logo-texto.svg" alt="Distribuidora Ultramix" width="230" height="12"></a>
  ${buscaTopo(v, 'O que você precisa repor? Ex.: Trento, energético, azeitona')}
  <a class="topo-whats" href="${whatsLink()}" target="_blank" rel="noopener">${ic('whats')}<span><small>WhatsApp</small>${E.whats}</span></a>
  ${btnOrc(v)}${menuBtn}
</div>
<nav id="menu" class="menu" aria-label="Principal"><div class="in">${nav.map(n => link(v, n, atual)).join('')}</div></nav>
</header>`;
}

function rodape(v) {
  const contatos = `<p>${ic('pin')}<span>${E.rua}<br>${E.bairro}<br>${E.cidade} · CEP ${E.cep}</span></p>
<p>${ic('tel')}<a href="tel:${E.foneHref}">${E.fone}</a></p>
<p>${ic('whats')}<a href="${whatsLink()}" target="_blank" rel="noopener">${E.whats}</a></p>
<p>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p>`;
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(210, v === 'a')}<p>${T.lema}.</p><div class="rod-redes"><a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a></div></div>
  <div class="rod-cont"><h2>Contato</h2>${contatos}</div>
  <nav aria-label="Rodapé"><h2>Site</h2>${nav.map(n => link(v, n, '')).join('')}<a href="/${v}/orcamento/">Orçamento</a></nav>
  <div class="rod-cats"><h2>Departamentos</h2>${C.cats.map(([c, n]) => `<a href="/${v}/produtos/?cat=${c}">${n}</a>`).join('')}</div>
</div><p class="rod-fim">Distribuidora Ultramix © ${new Date().getFullYear()} · Todos os direitos reservados</p><p class="rod-cred">${creditos}</p></footer>
<a class="flut-whats" href="${whatsLink()}" target="_blank" rel="noopener" aria-label="Fale com a Ultramix no WhatsApp">${ic('whats')}<span>Fale com a Ultramix</span></a>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo) => `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${sl}" data-v="${v}">
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
const abasVitrine = (v, pre) => `<div class="abas" data-abas data-trilho>
<div class="abas-topo"><div class="abas-bts" role="tablist">${vitrine.map((t, i) => `<button type="button" role="tab" id="${pre}-t-${t.id}" aria-controls="${pre}-${t.id}" aria-selected="${i === 0}">${t.nome}</button>`).join('')}</div>
<div class="setas"><button type="button" data-rolar="esq" aria-label="Voltar">${ic('esq')}</button><button type="button" data-rolar="dir" aria-label="Avançar">${ic('dir')}</button></div></div>
${vitrine.map((t, i) => `<div class="trilho" role="tabpanel" id="${pre}-${t.id}" aria-labelledby="${pre}-t-${t.id}"${i ? ' hidden' : ''}>${t.itens.map(card).join('')}</div>`).join('')}
</div>`;

const marcasGrade = (v, cls = 'marcas-grade') => `<ul class="${cls}">${C.marcas.map(m => `<li><a href="/${v}/marcas/${m.slug}/"><img src="/assets/marcas/${m.slug}.webp" alt="${esc(m.nome)}" loading="lazy" decoding="async"><span>${m.n} produtos</span></a></li>`).join('')}</ul>`;

const formCidade = (cls = 'cid-form', rot = 'Digite a sua cidade') => `<form class="${cls}" data-cidade><label><span>${rot}</span><input type="text" placeholder="Ex.: Franca" autocomplete="off"></label><button type="submit" class="btn btn-cor">Consultar</button><output aria-live="polite"></output></form>`;

const formContato = `<form class="form-contato" data-previa>
<label><span>Nome*</span><input name="nome" required autocomplete="name"></label>
<label><span>E-mail*</span><input name="email" type="email" required autocomplete="email"></label>
<label><span>Telefone*</span><input name="fone" type="tel" required autocomplete="tel"></label>
<label><span>Cidade*</span><input name="cidade" required></label>
<label class="lg"><span>Comentários*</span><textarea name="mensagem" rows="4" required></textarea></label>
<button type="submit" class="btn btn-cor">Enviar</button>
<p class="form-ok" tabindex="-1" hidden>Prévia: no site publicado esta mensagem vai direto para ${E.email}. Por enquanto, fale pelo WhatsApp ${E.whats}.</p>
</form>`;

const passos = cls => `<ol class="${cls}">${T.passos.map((p, i) => `<li><span class="passo-n">${pa(i % 2 ? '#023F87' : '#F48120')}<b>${i + 1}</b></span><h3>${p.t}</h3><p>${p.x}</p></li>`).join('')}</ol>`;

const tituloPagina = (v, h1, sub = '', migalha = '') => v === 'a'
  ? `<div class="titulo-a"><div class="in">${migalha ? `<p class="migalha">${migalha}</p>` : ''}<h1>${h1}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${pa('#F48120', ' data-p="1"')}${pa('#ffffff', ' data-p="2"')}</div>`
  : `<div class="titulo-b"><div class="in">${migalha ? `<p class="migalha">${migalha}</p>` : ''}<h1>${h1}</h1>${sub ? `<p>${sub}</p>` : ''}</div></div>`;

// Catálogo: os mesmos campos nas duas versões; a A mostra filtros em fichas no topo e a B numa coluna lateral.
function catalogo(v, { marca = '' } = {}) {
  const cats = marca ? C.cats.filter(([c]) => C.produtos.some(p => p.marca === marca && p.cat === c)) : C.cats;
  const radios = (nome, itens, rotTodos) => `<fieldset class="f-${nome}"><legend>${nome === 'cat' ? 'Departamento' : 'Marca'}</legend>
<label class="f-op"><input type="radio" name="${nome}" value="" checked><span>${rotTodos}</span><i data-n-${nome}="">${marca && nome === 'cat' ? C.produtos.filter(p => p.marca === marca).length : total}</i></label>
${itens.map(([val, rot]) => `<label class="f-op"><input type="radio" name="${nome}" value="${val}"><span>${esc(rot)}</span><i data-n-${nome}="${val}"></i></label>`).join('')}</fieldset>`;
  const filtros = `${radios('cat', cats, 'Todos')}${marca ? '' : radios('marca', C.marcas.map(m => [m.slug, m.nome]), 'Todas as marcas')}`;
  const busca = `<label class="f-busca">${ic('lupa')}<input type="search" name="q" placeholder="${marca ? `Buscar em ${esc(nomeMarca[marca])}` : 'Buscar por nome, marca ou sabor'}" aria-label="Buscar no catálogo" autocomplete="off"></label>`;
  const ordem = `<label class="f-ordem"><span>Ordenar</span><select name="ordem"><option value="">Por marca</option><option value="az">Nome (A a Z)</option></select></label>`;
  const grade = `<div class="grade" data-grade aria-live="polite"></div>
<div class="cat-vazio" data-vazio hidden><p>Nenhum produto com esses filtros.</p><button type="button" class="btn" data-limpar>Limpar filtros</button> <a class="btn btn-whats" href="${whatsLink('Olá, Ultramix! Não achei um produto no site, vocês trabalham com ')}" target="_blank" rel="noopener">${ic('whats')} Perguntar no WhatsApp</a></div>
<button type="button" class="cat-mais" data-mais-itens hidden>Mostrar mais produtos</button>`;
  if (v === 'a') return `<section class="catalogo" data-catalogo${marca ? ` data-marca="${marca}"` : ''}><form class="filtros" data-filtros>
<div class="filtros-linha">${busca}${ordem}<p class="cat-total"><b data-total>${total}</b> produtos <button type="button" class="limpar" data-limpar hidden>Limpar</button></p></div>
<div class="filtros-fichas">${filtros}</div></form>${grade}</section>`;
  return `<section class="catalogo" data-catalogo${marca ? ` data-marca="${marca}"` : ''}><form class="filtros" data-filtros id="filtros">
${filtros}</form>
<div class="cat-meio"><div class="cat-barra">${busca.replace('class="f-busca"', 'class="f-busca" form="filtros"').replace('<input ', '<input form="filtros" ')}<p class="cat-total"><span data-titulo-filtro>Todos os produtos</span> · <b data-total>${total}</b> itens <button type="button" class="limpar" data-limpar hidden>Limpar filtros</button></p>${ordem.replace('<select ', '<select form="filtros" ')}</div>${grade}</div>
<aside class="painel" data-painel><h2>${ic('lista')} Seu orçamento</h2><p class="painel-n"><b data-n-itens>0</b> produtos na lista</p><ul></ul><p class="painel-vazio">Escolha a quantidade e toque em <b>Adicionar</b> nos produtos. A lista fica salva neste aparelho.</p><a class="btn btn-cor" href="/b/orcamento/">Revisar e enviar ${ic('seta')}</a></aside></section>`;
}

// ---------- versão A: Rota ----------
function inicioA() {
  const pilha = ['trento-avela-16x29g', 'energetico-tradicional-lata-473-ml', 'kobber-granola-tradicional-com-mel-500g', 'pramesa-azeitonas-verdes-inteiras-vidro-190g', 'chef-chips-batata-lisa-144g', 'gelatines-beijo-12x70g']
    .map(s => porSlug.get(s)).filter(Boolean);
  return `<section class="hero-a" data-slider aria-roledescription="carrossel" aria-label="Destaques">
<div class="slide slide-1 on"><div class="in">
  <div class="hero-txt"><p class="sobre">Distribuidora de alimentos e bebidas · desde ${E.desde}</p>
  <h1>Distribuindo qualidade em toda a região de Ribeirão Preto</h1>
  <p>${total} produtos de ${C.marcas.length} marcas para supermercados, padarias, bares e restaurantes, num raio de ${E.raio} km a partir da nossa sede.</p>
  <div class="hero-bts"><a class="btn btn-cor" href="/a/produtos/">Ver produtos ${ic('seta')}</a><a class="btn btn-linha" href="/a/orcamento/">Fazer orçamento</a></div></div>
  <div class="hero-pilha">${simbolo('hero-simbolo')}${pilha.map((p, i) => `<span class="hp hp-${i}">${spr(p)}</span>`).join('')}</div>
</div></div>
<a class="slide slide-2" href="/a/marcas/peccin/"><img src="/assets/fotos/trento-banner.webp" alt="Linha completa Trento: T-Pro, Bites, Speciale, Massimo, Mini e Momentos" width="1920" height="800"><span class="slide-cta">Linha completa Trento ${ic('seta')}</span></a>
<div class="slide-pts" role="tablist"><button type="button" aria-label="Destaque 1" aria-selected="true"></button><button type="button" aria-label="Destaque 2" aria-selected="false"></button></div>
</section>

<section class="numeros-a"><div class="in">
  <p><b>${E.desde}</b><span>atuando na região</span></p>
  <p><b>${E.raio} km</b><span>de raio a partir da sede</span></p>
  <p><b>${cidades.length}</b><span>cidades atendidas</span></p>
  <p><b>${total}</b><span>produtos no catálogo</span></p>
  <p><b>${C.marcas.length}</b><span>marcas parceiras</span></p>
</div></section>

<section class="intro-a"><div class="in">
  <figure class="intro-foto" data-rev><img src="/assets/fotos/entregador.webp" alt="Entregador da Ultramix ao lado do veículo de entrega" width="705" height="468" loading="lazy"></figure>
  <div class="intro-txt" data-rev><h2>${T.titulo}</h2>${T.intro.map(p => `<p>${p}</p>`).join('')}<a class="lnk" href="/a/empresa/">Conheça a Ultramix ${ic('seta')}</a></div>
</div></section>

<section class="vitrine-a"><div class="in">
  <div class="sec-topo"><h2>Na ULTRAMIX você encontra os melhores produtos</h2><a class="lnk" href="/a/produtos/">Ver todos os ${total} ${ic('seta')}</a></div>
  ${abasVitrine('a', 'va')}
</div></section>

<section class="marcas-a"><div class="in">
  <div class="sec-topo"><h2>Na ULTRAMIX você encontra as melhores marcas</h2><a class="lnk" href="/a/marcas/">Todas as marcas ${ic('seta')}</a></div>
  ${marcasGrade('a')}
</div></section>

<section class="clientes-a"><div class="in">
  <h2>A Ultramix distribui para</h2>
  <ul>${T.clientes.map((c, i) => `<li>${ic(iconeCliente[i])}<span>${c}</span></li>`).join('')}</ul>
</div></section>

<section class="passos-a"><div class="in">
  <div class="sec-topo"><h2>Como fazer seu orçamento</h2></div>
  ${passos('passos')}
  <p class="passos-cta"><a class="btn btn-cor" href="/a/produtos/">Começar pela lista de produtos ${ic('seta')}</a></p>
</div></section>

<section class="cesta-a"><div class="in">
  <figure data-rev><img src="/assets/fotos/cesta.webp" alt="Entregador da Ultramix com uma caixa de cesta básica" width="879" height="500" loading="lazy"></figure>
  <div data-rev><p class="sobre">${T.cesta.sub}</p><h2>${T.cesta.titulo}</h2><p>${T.cesta.texto}</p>
  <ul class="cesta-tipos">${T.cesta.tipos.map(t => `<li>${ic('presente')}${t}</li>`).join('')}</ul>
  <a class="btn btn-cor" href="/a/cesta-basica/">Saiba mais ${ic('seta')}</a></div>
</div></section>

<section class="cid-a"><div class="in">
  <div><h2>Atendemos ${cidades.length} cidades</h2><p>Toda a Macro Região de Ribeirão Preto, num raio de ${E.raio} km a partir da sede.</p><a class="lnk" href="/a/cidades-atendidas/">Ver a lista completa ${ic('seta')}</a></div>
  ${formCidade('cid-form', 'A Ultramix entrega na sua cidade?')}
</div></section>

<section class="contato-a" id="contato"><div class="in">
  <div><h2>Entre em contato</h2>${formContato}</div>
  <div class="contato-dados"><p class="cd-end">${ic('pin')}<span>${E.rua}<br>${E.bairro}<br>${E.cidade}<br>CEP ${E.cep}</span></p>
  <p>${ic('tel')}<a href="tel:${E.foneHref}">${E.fone}</a></p><p>${ic('whats')}<a href="${whatsLink()}" target="_blank" rel="noopener">${E.whats}</a></p><p>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p></div>
</div></section>`;
}

const empresaA = () => `${tituloPagina('a', 'Empresa', T.lema)}
<section class="intro-a"><div class="in">
  <figure class="intro-foto"><img src="/assets/fotos/entregador.webp" alt="Entregador da Ultramix ao lado do veículo de entrega" width="705" height="468"></figure>
  <div class="intro-txt"><h2>${T.titulo}</h2>${T.intro.map(p => `<p>${p}</p>`).join('')}</div>
</div></section>
<section class="mv-a"><div class="in">
  <div class="mv"><h2>Missão</h2><p>${T.missao}</p></div>
  <div class="mv"><h2>Visão</h2><p>${T.visao}</p></div>
</div></section>
<section class="estrutura-a"><div class="in">
  <div class="sec-topo"><h2>Estrutura Moderna</h2><p>${T.estruturaIntro}</p></div>
  <div class="est-linha">${T.estrutura.map((e, i) => `<div class="est" data-rev style="--ap-d:${i * 120}ms"><span class="est-ic">${ic(e.ic)}</span><h3>${e.t}</h3><p>${e.x}</p></div>`).join('')}</div>
  <figure class="est-foto"><img src="/assets/fotos/armazem.webp" alt="Armazém com porta-paletes (foto ilustrativa)" width="1600" height="1246" loading="lazy"><figcaption>Foto ilustrativa</figcaption></figure>
</div></section>
<section class="lema-a"><div class="in">${simbolo('lema-simbolo')}<p><b>Ultramix</b> · ${T.lema}</p><a class="btn btn-cor" href="/a/contato/">Fale com a gente ${ic('seta')}</a></div></section>`;

const produtosA = () => `${tituloPagina('a', 'Produtos', `${total} produtos de ${C.marcas.length} marcas. Escolha a quantidade, adicione ao orçamento e envie a lista pelo WhatsApp.`)}
<div class="in">${catalogo('a')}</div>`;

const marcasA = () => `${tituloPagina('a', 'Marcas', 'As marcas parceiras que a Ultramix distribui na região de Ribeirão Preto.')}
<section class="marcas-a marcas-pg"><div class="in">${marcasGrade('a')}</div></section>`;

const marcaA = m => `${tituloPagina('a', esc(m.nome), `${m.n} produtos ${esc(m.nome)} no catálogo da Ultramix.`, `<a href="/a/marcas/">Marcas</a> / ${esc(m.nome)}`)}
<div class="in"><div class="marca-cab"><img src="/assets/marcas/${m.slug}.webp" alt="${esc(m.nome)}"><p>Toque num produto para ver os detalhes ou adicione direto ao orçamento.</p></div>${catalogo('a', { marca: m.slug })}</div>`;

const cidadesA = () => `${tituloPagina('a', 'Cidades atendidas', `${cidades.length} cidades em toda a Macro Região de Ribeirão Preto, num raio de ${E.raio} km a partir da sede.`)}
<section class="cidades-a"><div class="in">
  <div class="cid-mapa">${mapa('mapa')}</div>
  <div class="cid-lado">${formCidade('cid-form', 'A Ultramix entrega na sua cidade?')}
  <div class="cid-letras">${letras().map(([l, ns]) => `<div><h2>${l}</h2><ul>${ns.map(n => `<li>${esc(n)}</li>`).join('')}</ul></div>`).join('')}</div></div>
</div></section>`;

const cestaA = () => `${tituloPagina('a', T.cesta.titulo, T.cesta.sub)}
<section class="cesta-a cesta-pg"><div class="in">
  <figure><img src="/assets/fotos/cesta.webp" alt="Entregador da Ultramix com uma caixa de cesta básica" width="879" height="500"></figure>
  <div><p>${T.cesta.texto}</p><h2>As cestas podem ser</h2>
  <ul class="cesta-tipos">${T.cesta.tipos.map(t => `<li>${ic('presente')}${t}</li>`).join('')}</ul>
  <div class="cesta-pontos">${T.cesta.pontos.map((p, i) => `<div>${ic(i ? 'satelite' : 'caixa')}<h3>${p.t}</h3><p>${p.x}</p></div>`).join('')}</div>
  <a class="btn btn-cor" href="${whatsLink('Olá, Ultramix! Quero um orçamento de cestas básicas para a minha empresa.')}" target="_blank" rel="noopener">${ic('whats')} Pedir orçamento de cestas</a></div>
</div></section>`;

const orcamentoPg = v => `${tituloPagina(v, 'Orçamento', 'Revise as quantidades, preencha seus dados e envie a lista para a Ultramix pelo WhatsApp ou por e-mail.')}
<section class="orcamento" data-orcamento><div class="in">
  <div class="orc-lista"><div class="orc-topo"><h2><b data-n-itens>0</b> produtos na lista</h2><button type="button" class="limpar" data-esvaziar>Esvaziar lista</button></div>
  <ul data-itens></ul>
  <div class="orc-vazio" data-orc-vazio><p>Sua lista está vazia.</p><p>Abra o catálogo, escolha a quantidade e toque em <b>Adicionar</b>. A lista fica salva neste aparelho até você enviar.</p><a class="btn btn-cor" href="/${v}/produtos/">Ver produtos ${ic('seta')}</a></div>
  <p class="orc-mais"><a class="lnk" href="/${v}/produtos/">${ic('mais')} Adicionar mais produtos</a></p></div>
  <form class="orc-form"><h2>Seus dados</h2>
  <label><span>Nome*</span><input name="nome" required autocomplete="name"></label>
  <label><span>Estabelecimento*</span><input name="empresa" required autocomplete="organization" placeholder="Ex.: Mercado São José"></label>
  <label><span>Cidade*</span><input name="cidade" required placeholder="Ex.: Sertãozinho"></label>
  <label><span>Telefone*</span><input name="fone" type="tel" required autocomplete="tel"></label>
  <label><span>Observações</span><textarea name="obs" rows="3" placeholder="Prazo, forma de pagamento, CNPJ…"></textarea></label>
  <button type="submit" class="btn btn-whats" value="whats">${ic('whats')} Enviar pelo WhatsApp</button>
  <button type="submit" class="btn btn-linha" value="email">${ic('mail')} Enviar por e-mail</button>
  <p class="orc-nota">Os preços e a disponibilidade são confirmados pela equipe comercial da Ultramix.</p></form>
</div></section>`;

const contatoPg = v => `${tituloPagina(v, 'Contato', 'Fale com a equipe comercial da Ultramix.')}
<section class="contato-pg"><div class="in">
  <div><h2>Entre em contato</h2>${formContato}</div>
  <div class="contato-dados"><p class="cd-end">${ic('pin')}<span>${E.rua}<br>${E.bairro}<br>${E.cidade}<br>CEP ${E.cep}</span></p>
  <p>${ic('tel')}<a href="tel:${E.foneHref}">${E.fone}</a></p><p>${ic('whats')}<a href="${whatsLink()}" target="_blank" rel="noopener">${E.whats}</a></p><p>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p>
  <iframe class="contato-mapa" title="Mapa: ${E.rua}, ${E.cidade}" src="https://www.google.com/maps?q=${encodeURIComponent(`${E.rua}, ${E.bairro}, Ribeirão Preto - SP, ${E.cep}`)}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div></section>`;

// ---------- versão B: Pedido ----------
function inicioB() {
  const vitr = ['trento-milk-16x29g', 'energetico-tradicional-lata-473-ml', 'gelatines-beijo-12x70g', '100%-uva-1-litro', 'kobber-granola-tradicional-com-mel-500g', 'chef-chips-batata-lisa-144g', 'pramesa-azeitonas-verdes-inteiras-vidro-190g', 'bolo-renata-tradicional-chocolate-250g', 'baralho-139-cartucho']
    .map(s => porSlug.get(s)).filter(Boolean);
  const dest = ['chocolates', 'balas'];
  return `<section class="hero-b"><div class="in">
  <div class="hero-txt"><p class="sobre">Distribuidora de alimentos e bebidas · Ribeirão Preto - SP</p>
  <h1>${T.lema}</h1>
  <p>${total} produtos de ${C.marcas.length} marcas para o seu estabelecimento, entregues em ${cidades.length} cidades com veículo próprio, climatizado e rastreado.</p>
  <form class="hero-busca" action="/b/produtos/" method="get" role="search" data-busca><input type="search" name="q" placeholder="Busque por produto, marca ou sabor" aria-label="Buscar produtos" autocomplete="off"><button type="submit" class="btn btn-cor">${ic('lupa')}<span>Buscar</span></button></form>
  <p class="hero-sug"><span>Mais procurados:</span>${['Trento', 'Energético', 'Granola', 'Macarrão', 'Azeitona', 'Pilha'].map(t => `<a href="/b/produtos/?q=${encodeURIComponent(t)}">${t}</a>`).join('')}</p></div>
  <div class="hero-grade" aria-hidden="true">${simbolo('hero-simbolo')}${vitr.map((p, i) => `<span class="hg hg-${i}">${spr(p)}</span>`).join('')}</div>
</div></section>

<section class="deps-b"><div class="in">
  <div class="sec-topo"><h2>Departamentos</h2><a class="lnk" href="/b/produtos/">Catálogo completo ${ic('seta')}</a></div>
  <ul class="deps">${C.cats.map(([c, n]) => `<li class="dep${dest.includes(c) ? ' dep-g' : ''}"><a href="/b/produtos/?cat=${c}"><span class="dep-img">${amostra(c, dest.includes(c) ? 4 : 3).map(spr).join('')}</span><span class="dep-txt"><b>${n}</b><small>${nCat(c)} produtos</small></span></a></li>`).join('')}</ul>
</div></section>

<section class="passos-b"><div class="in">
  <div class="sec-topo"><h2>Como comprar pelo site</h2><p>Sem cadastro e sem senha: a lista fica salva no seu aparelho até você enviar.</p></div>
  ${passos('passos')}
</div></section>

<section class="vitrine-b"><div class="in">
  <div class="sec-topo"><h2>Em destaque</h2><a class="lnk" href="/b/produtos/">Ver todos ${ic('seta')}</a></div>
  ${abasVitrine('b', 'vb')}
</div></section>

<section class="marcas-b"><div class="in"><div class="sec-topo"><h2>${C.marcas.length} marcas parceiras</h2><a class="lnk" href="/b/marcas/">Ver por marca ${ic('seta')}</a></div></div>
<div class="faixa-marcas"><ul>${[...C.marcas, ...C.marcas].map((m, i) => `<li${i >= C.marcas.length ? ' aria-hidden="true"' : ''}><a href="/b/marcas/${m.slug}/"${i >= C.marcas.length ? ' tabindex="-1"' : ''}><img src="/assets/marcas/${m.slug}.webp" alt="${esc(m.nome)}" loading="lazy"></a></li>`).join('')}</ul></div></section>

<section class="mapa-b"><div class="in">
  <div class="mapa-caixa">${mapa('mapa')}</div>
  <div class="mapa-txt"><h2>${cidades.length} cidades num raio de ${E.raio} km</h2><p>Desde ${E.desde} a Ultramix atende toda a Macro Região de Ribeirão Preto, de Franca a São Carlos e de Barretos a São José do Rio Pardo.</p>
  ${formCidade('cid-form', 'A Ultramix entrega na sua cidade?')}
  <a class="lnk" href="/b/cidades-atendidas/">Ver todas as cidades ${ic('seta')}</a></div>
</div></section>

<section class="estrutura-b"><div class="est-foto"><img src="/assets/fotos/armazem.webp" alt="Armazém com porta-paletes (foto ilustrativa)" width="1600" height="1246" loading="lazy"></div><div class="in">
  <div class="est-caixa"><h2>Estrutura Moderna</h2><p>${T.estruturaIntro}</p>
  ${T.estrutura.map(e => `<div class="est"><span class="est-ic">${ic(e.ic)}</span><div><h3>${e.t}</h3><p>${e.x.split('. ')[0]}.</p></div></div>`).join('')}
  <a class="lnk" href="/b/empresa/">Sobre a Ultramix ${ic('seta')}</a></div>
</div></section>

<section class="cesta-b"><div class="in">
  <div><p class="sobre">Para empresas</p><h2>${T.cesta.titulo}</h2><p>${T.cesta.texto}</p><ul class="cesta-tipos">${T.cesta.tipos.map(t => `<li>${ic('ok')}${t}</li>`).join('')}</ul><a class="btn btn-cor" href="/b/cesta-basica/">Saiba mais ${ic('seta')}</a></div>
  <figure><img src="/assets/fotos/cesta.webp" alt="Entregador da Ultramix com uma caixa de cesta básica" width="879" height="500" loading="lazy"></figure>
</div></section>

<section class="cta-b"><div class="in"><h2>Prefere falar com uma pessoa?</h2><p>A equipe comercial atende pelo telefone e pelo WhatsApp.</p>
<div class="cta-bts"><a class="btn btn-whats" href="${whatsLink()}" target="_blank" rel="noopener">${ic('whats')} ${E.whats}</a><a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div></div></section>`;
}

const empresaB = () => `${tituloPagina('b', 'A Ultramix', T.lema, '<a href="/b/">Início</a> / Empresa')}
<section class="emp-b"><div class="in">
  <div class="emp-txt"><h2>${T.titulo}</h2>${T.intro.map(p => `<p>${p}</p>`).join('')}</div>
  <figure><img src="/assets/fotos/entregador.webp" alt="Entregador da Ultramix ao lado do veículo de entrega" width="705" height="468"></figure>
</div></section>
<section class="numeros-b"><div class="in">
  <p><b>${E.desde}</b><span>início das operações</span></p><p><b>${E.raio} km</b><span>de raio de atendimento</span></p><p><b>${cidades.length}</b><span>cidades</span></p><p><b>${C.marcas.length}</b><span>marcas parceiras</span></p>
</div></section>
<section class="mv-b"><div class="in">
  <div><span class="mv-pa">${pa('#023F87')}</span><h2>Missão</h2><p>${T.missao}</p></div>
  <div><span class="mv-pa">${pa('#F48120')}</span><h2>Visão</h2><p>${T.visao}</p></div>
</div></section>
<section class="estrutura-b"><div class="est-foto"><img src="/assets/fotos/armazem.webp" alt="Armazém com porta-paletes (foto ilustrativa)" width="1600" height="1246" loading="lazy"></div><div class="in">
  <div class="est-caixa"><h2>Estrutura Moderna</h2><p>${T.estruturaIntro}</p>
  ${T.estrutura.map(e => `<div class="est"><span class="est-ic">${ic(e.ic)}</span><div><h3>${e.t}</h3><p>${e.x}</p></div></div>`).join('')}</div>
</div></section>
<section class="cta-b"><div class="in"><h2>Ultramix · ${T.lema}</h2><div class="cta-bts"><a class="btn btn-cor" href="/b/produtos/">Ver o catálogo ${ic('seta')}</a><a class="btn btn-linha" href="/b/contato/">Contato</a></div></div></section>`;

const produtosB = () => `${tituloPagina('b', 'Catálogo de produtos', `${total} produtos de ${C.marcas.length} marcas. Filtre, escolha a quantidade e monte o seu orçamento.`, '<a href="/b/">Início</a> / Produtos')}
<div class="in">${catalogo('b')}</div>`;

const marcasB = () => `${tituloPagina('b', 'Marcas', 'Escolha uma marca para ver todos os produtos dela.', '<a href="/b/">Início</a> / Marcas')}
<section class="marcas-pg-b"><div class="in"><ul class="marcas-lista">${C.marcas.map(m => {
  const cs = [...new Set(C.produtos.filter(p => p.marca === m.slug).map(p => nomeCat[p.cat]))];
  const ex = escolher(m.slug, '', 3);
  return `<li><a href="/b/marcas/${m.slug}/"><img class="ml-logo" src="/assets/marcas/${m.slug}.webp" alt="${esc(m.nome)}" loading="lazy"><span class="ml-txt"><b>${esc(m.nome)}</b><small>${m.n} produtos · ${cs.join(', ')}</small></span><span class="ml-prods">${ex.map(spr).join('')}</span>${ic('dir')}</a></li>`;
}).join('')}</ul></div></section>`;

const marcaB = m => `${tituloPagina('b', esc(m.nome), `${m.n} produtos ${esc(m.nome)} distribuídos pela Ultramix.`, `<a href="/b/">Início</a> / <a href="/b/marcas/">Marcas</a> / ${esc(m.nome)}`)}
<div class="in"><div class="marca-cab"><img src="/assets/marcas/${m.slug}.webp" alt="${esc(m.nome)}"></div>${catalogo('b', { marca: m.slug })}</div>`;

const cidadesB = () => `${tituloPagina('b', 'Cidades atendidas', `${cidades.length} cidades num raio de ${E.raio} km de Ribeirão Preto.`, '<a href="/b/">Início</a> / Cidades atendidas')}
<section class="cidades-b"><div class="in">
  <div class="mapa-caixa">${mapa('mapa')}</div>
  <div class="cid-lado">${formCidade('cid-form', 'A Ultramix entrega na sua cidade?')}<p class="cid-dica">Passe o mouse ou toque nos pontos do mapa para ver o nome de cada cidade.</p>
  <ul class="cid-lista">${cidades.map(([n]) => `<li>${esc(n)}</li>`).join('')}</ul></div>
</div></section>`;

const cestaB = () => `${tituloPagina('b', T.cesta.titulo, T.cesta.sub, '<a href="/b/">Início</a> / Cesta básica')}
<section class="cesta-b cesta-pg"><div class="in">
  <div><p>${T.cesta.texto}</p><h2>As cestas podem ser</h2><ul class="cesta-tipos">${T.cesta.tipos.map(t => `<li>${ic('ok')}${t}</li>`).join('')}</ul>
  <div class="cesta-pontos">${T.cesta.pontos.map((p, i) => `<div>${ic(i ? 'satelite' : 'caixa')}<div><h3>${p.t}</h3><p>${p.x}</p></div></div>`).join('')}</div>
  <a class="btn btn-whats" href="${whatsLink('Olá, Ultramix! Quero um orçamento de cestas básicas para a minha empresa.')}" target="_blank" rel="noopener">${ic('whats')} Pedir orçamento de cestas</a></div>
  <figure><img src="/assets/fotos/cesta.webp" alt="Entregador da Ultramix com uma caixa de cesta básica" width="879" height="500"></figure>
</div></section>`;

// ---------- montagem ----------
const desc = {
  index: `Distribuidora Ultramix, Ribeirão Preto - SP: ${total} produtos de ${C.marcas.length} marcas de alimentos e bebidas para ${cidades.length} cidades num raio de ${E.raio} km. Monte seu orçamento pelo site.`,
  empresa: 'Desde 2017 a Ultramix distribui alimentos e bebidas na Macro Região de Ribeirão Preto, com veículos próprios rastreados e câmara fria.',
  produtos: `Catálogo da Ultramix: ${total} produtos de ${C.marcas.length} marcas, com busca, filtros e lista de orçamento.`,
  marcas: `As ${C.marcas.length} marcas distribuídas pela Ultramix: ${C.marcas.map(m => m.nome).join(', ')}.`,
  'cidades-atendidas': `As ${cidades.length} cidades atendidas pela Ultramix num raio de ${E.raio} km de Ribeirão Preto.`,
  'cesta-basica': 'Cestas básicas para empresas: para colaboradores, de Natal e personalizadas, entregues na empresa.',
  orcamento: 'Revise sua lista de produtos e envie o orçamento para a Ultramix pelo WhatsApp ou por e-mail.',
  contato: `Fale com a Ultramix: ${E.fone}, WhatsApp ${E.whats}, ${E.email}. ${E.rua}, ${E.cidade}.`,
};
const titulo = (sl, nome) => sl === 'index' ? 'Ultramix · Distribuidora de alimentos e bebidas em Ribeirão Preto' : `${nome} · Distribuidora Ultramix`;

export function gerarVersao(v) {
  const corpo = v === 'a'
    ? { index: inicioA, empresa: empresaA, produtos: produtosA, marcas: marcasA, 'cidades-atendidas': cidadesA, 'cesta-basica': cestaA, orcamento: () => orcamentoPg('a'), contato: () => contatoPg('a') }
    : { index: inicioB, empresa: empresaB, produtos: produtosB, marcas: marcasB, 'cidades-atendidas': cidadesB, 'cesta-basica': cestaB, orcamento: () => orcamentoPg('b'), contato: () => contatoPg('b') };
  const nomes = { ...Object.fromEntries(nav.map(n => [n.slug, n.nome])), orcamento: 'Orçamento' };
  const out = {};
  for (const [sl, fn] of Object.entries(corpo)) {
    const caminho = sl === 'index' ? '' : `${sl}/`;
    out[sl] = pagina(v, sl, caminho, titulo(sl, nomes[sl]), desc[sl], fn());
  }
  for (const m of C.marcas) {
    out[`marcas/${m.slug}`] = pagina(v, `marca-${m.slug}`, `marcas/${m.slug}/`, `${m.nome} · Distribuidora Ultramix`,
      `${m.n} produtos ${m.nome} distribuídos pela Ultramix na região de Ribeirão Preto.`, (v === 'a' ? marcaA : marcaB)(m));
  }
  return out;
}
