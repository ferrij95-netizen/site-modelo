// Monta as páginas das versões A ("Catálogo", clara, cinza do catálogo 2024 com teal e verde do logo)
// e B ("Ambientes", foto em tela cheia, blocos teal e verde como os quadros do logo).
// As páginas internas usam o mesmo conteúdo; muda o desenho de cada versão. Estilos em public/assets/{base,a,b}.css.
import { empresa as E, sobre, categorias, produtos, representantes, ufs } from './conteudo.mjs';

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const tel = f => 'tel:+55' + f.replace(/\D/g, '');
const curto = p => p.curto || p.nome.replace(/^Conjunto /, '');
const refs = p => p.pecas.map(([, r]) => r).join(' · ');
const cat = id => categorias.find(c => c.id === id);
const doTipo = t => produtos.filter(p => p.tipo === t);
const totalUfs = [...new Set(representantes.flatMap(r => r.uf))];

export const nomesVersao = { a: 'Catálogo', b: 'Ambientes' };

const I = {
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  pdf: '<path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6"/><path d="M8 15h8M8 18h5"/>',
  baixar: '<path d="M12 4v11M7 10l5 5 5-5"/><path d="M4 19h16"/>',
  chave: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'A Empresa', caminho: 'empresa/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'representantes', nome: 'Representantes', caminho: 'representantes/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

// ---------- moldura ----------
function head(v, caminho, titulo, descricao, ogImg) {
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
<meta property="og:site_name" content="ACG Móveis">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImg || `${E.url}assets/og-${v}.jpg`}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/apresenta.css">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/apresenta.js" defer></script>
<script src="/assets/site.js" defer></script>
</head>`;
}

function topo(v, ativo, sobreFoto) {
  const links = nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === ativo ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
  const barra = `<div class="barra"><div class="in">
    <span>${ic('pin')} Lagoa Vermelha · RS</span>
    <span class="barra-tel">${ic('tel')} <a href="${tel(E.telefones[0])}">${E.telefones[0]}</a></span>
    <a class="barra-rep" href="${E.pedidos}" target="_blank" rel="noopener">${ic('chave')} Área do representante</a>
  </div></div>`;
  const logo = v === 'b' && sobreFoto ? 'logo-claro' : 'logo';
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${v === 'a' ? barra : ''}
<header class="topo${sobreFoto ? ' topo-sobre' : ''}"><div class="in">
  <a class="marca" href="/${v}/" aria-label="ACG Móveis, início"><img src="/assets/img/${logo}.png" alt="ACG Móveis" width="600" height="403" data-logo-claro="${v === 'b' && sobreFoto ? '1' : ''}"></a>
  <nav class="menu" id="menu" aria-label="Principal">${links}
    <a class="menu-rep" href="${E.pedidos}" target="_blank" rel="noopener">Área do representante</a>
  </nav>
  <a class="btn btn-cat" href="${E.catalogo}" target="_blank" rel="noopener">${ic('pdf')} Catálogo 2024</a>
  <button class="burger" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/img/${v === 'a' ? 'logo' : 'logo-claro'}.png" alt="ACG Móveis" width="600" height="403" loading="lazy">
    <p>${esc(sobre.curto)}</p></div>
  <div><h3>Produtos</h3><ul>${categorias.map(c => `<li><a href="/${v}/produtos/#${c.id}">${c.nome}</a></li>`).join('')}</ul></div>
  <div><h3>Empresa</h3><ul>
    <li><a href="/${v}/empresa/">A Empresa</a></li>
    <li><a href="/${v}/representantes/">Representantes</a></li>
    <li><a href="${E.catalogo}" target="_blank" rel="noopener">Catálogo 2024 (PDF)</a></li>
    <li><a href="${E.pedidos}" target="_blank" rel="noopener">Área do representante</a></li>
  </ul></div>
  <div><h3>Contato</h3><address>
    ${E.endereco}<br>${E.bairro} · CEP ${E.cep}<br>${E.cidade}<br>
    ${E.telefones.map(f => `<a href="${tel(f)}">${f}</a>`).join('<br>')}<br>
    <a href="mailto:${E.email}">${E.email}</a></address></div>
</div><div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ACG Móveis. Lagoa Vermelha, RS.</span><span>Indústria de móveis para sala de jantar e estar</span></div></div></footer>`;
}

const pagina = (v, ativo, caminho, titulo, desc, corpo, opc = {}) => `${head(v, caminho, titulo, desc, opc.og)}
<body class="v-${v} pg-${ativo}">
${topo(v, ativo, opc.sobreFoto)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>`;

// ---------- peças reaproveitadas ----------
// Desenho técnico como o do catálogo: tampos em escala (comprimento x largura) e a cadeira com altura, largura e profundidade.
function tampos(p) {
  const n = s => parseFloat(s.replace(',', '.'));
  return `<div class="tampos">${p.tamanhos.map(t => {
    const nums = (t.match(/\d,\d\d/g) || []).map(n);
    const larg = nums.at(-1), comp = Math.max(...nums.slice(0, -1));
    const redondo = /redond/i.test(p.nome + (p.obs || '')) && comp === larg;
    return `<figure class="tampo"><div class="tampo-forma${redondo ? ' redondo' : ''}" style="--c:${comp};--l:${larg}"></div><figcaption>${esc(t)} m</figcaption></figure>`;
  }).join('')}</div>`;
}
function cadeira(p) {
  if (!p.cadeira) return '';
  const [a, l, pr] = p.cadeira.map(x => x.toFixed(2).replace('.', ','));
  return `<figure class="cadeira-tec">
  <svg viewBox="0 0 260 150" role="img" aria-label="Cadeira: altura ${a} m, largura ${l} m, profundidade ${pr} m">
    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <path d="M40 20h52v52H40zM40 72v58M92 72v58M40 72h52"/>
      <path d="M150 20v110M150 72h50v58M150 72h50"/>
    </g>
    <g class="cota" stroke-width="1" fill="currentColor" font-size="11" font-family="Inter,sans-serif">
      <path d="M18 20v110M14 20h8M14 130h8" stroke="currentColor"/><text x="6" y="80" transform="rotate(-90 10 78)" text-anchor="middle">${a}</text>
      <path d="M40 142h52M40 138v8M92 138v8" stroke="currentColor"/><text x="66" y="140" text-anchor="middle" dy="-4">${l}</text>
      <path d="M150 142h50M150 138v8M200 138v8" stroke="currentColor"/><text x="175" y="140" text-anchor="middle" dy="-4">${pr}</text>
    </g>
  </svg>
  <figcaption>Cadeira: altura ${a} · largura ${l} · profundidade ${pr} m</figcaption></figure>`;
}

function fichaTecnica(p) {
  const linhas = [
    ...p.pecas.map(([nome, ref]) => [nome, `Ref. ${ref}`]),
    ...(p.alturaMesa ? [['Altura da mesa', `${p.alturaMesa.toFixed(2).replace('.', ',')} m`]] : []),
    ...(p.medidas || []),
    ...(p.obs ? [['Acabamento', p.obs]] : []),
  ];
  if (!linhas.length) return '';
  return `<dl class="ficha">${linhas.map(([k, val]) => `<div><dt>${esc(k)}</dt><dd>${esc(val)}</dd></div>`).join('')}</dl>`;
}

const itemProduto = (v, p, cls = '') => `<a class="prod${p.recorte ? ' prod-recorte' : ''}${cls}" href="/${v}/produtos/${p.slug}/" data-cat="${p.tipo}">
  <span class="prod-foto">${img(p.foto, p.nome)}${p.novo ? '<span class="selo">Lançamento</span>' : ''}</span>
  <span class="prod-txt"><strong>${esc(curto(p))}</strong>${p.pecas.length ? `<small>Ref. ${esc(refs(p))}</small>` : ''}</span>
</a>`;

const passos = v => `<ol class="passos" data-etapas><span class="ap-trilho" aria-hidden="true"></span>
  <li class="ap-etapa"><span class="passo-n">1</span><h3>Escolha no catálogo</h3><p>Navegue pelos conjuntos, cristaleiras e bistrôs, com medidas e referências de cada peça.</p><a href="/${v}/produtos/">Ver produtos ${ic('seta')}</a></li>
  <li class="ap-etapa"><span class="passo-n">2</span><h3>Fale com o representante</h3><p>Nossos representantes atendem lojistas em ${totalUfs.length} estados. Encontre o da sua região.</p><a href="/${v}/representantes/">Encontrar ${ic('seta')}</a></li>
  <li class="ap-etapa"><span class="passo-n">3</span><h3>Pedido direto com a fábrica</h3><p>O representante lança o pedido no sistema da ACG Móveis, em Lagoa Vermelha (RS).</p><a href="${E.pedidos}" target="_blank" rel="noopener">Área do representante ${ic('seta')}</a></li>
</ol>`;

const formContato = (assunto = '') => `<form class="form" data-mailto="${E.email}">
  <div class="campos">
    <label>Nome<input name="nome" required autocomplete="name"></label>
    <label>Telefone<input name="telefone" required type="tel" autocomplete="tel"></label>
    <label>E-mail<input name="email" required type="email" autocomplete="email"></label>
    <label>Cidade / UF<input name="cidade" autocomplete="address-level2"></label>
    <label class="largo">Assunto<input name="assunto" value="${esc(assunto)}"></label>
    <label class="largo">Mensagem<textarea name="mensagem" rows="5" required></textarea></label>
  </div>
  <button class="btn btn-cheio" type="submit">Enviar mensagem ${ic('seta')}</button>
  <p class="form-nota">Ao enviar, abrimos o seu e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;

const repItem = r => `<li class="rep" data-uf="${r.uf.join(' ')}">
  <p class="rep-uf">${r.uf.join(' · ')}</p>
  <h3>${esc(r.empresa)}</h3>
  <p class="rep-contato">${esc(r.contato)}</p>
  <p class="rep-regiao">${esc(r.regiao)}</p>
  <p class="rep-fones">${r.fones.map(f => `<a href="${tel(f)}">${ic('tel')} ${f}</a>`).join('')}</p>
</li>`;
const filtroUf = () => `<div class="chips" role="toolbar" aria-label="Filtrar por estado" data-filtro-uf>
  <button class="chip" data-uf="" aria-pressed="true">Todos</button>${totalUfs.map(u => `<button class="chip" data-uf="${u}" aria-pressed="false" title="${ufs[u]}">${u}</button>`).join('')}
</div>`;

// =====================================================================================
// HOME
// =====================================================================================
function homeA() {
  const lanc = produtos.filter(p => p.novo);
  const destaque = produtos.find(p => p.slug === 'helena');
  return `
<section class="a-hero">
  <div class="a-hero-txt" data-rev>
    <p class="eyebrow">Lançamentos 2024</p>
    <h1>Móveis para a sala de jantar e estar, com requinte e bom gosto.</h1>
    <p class="lead">${esc(sobre.curto)}</p>
    <div class="acoes"><a class="btn btn-cheio" href="/a/produtos/">Ver os produtos ${ic('seta')}</a><a class="btn btn-linha" href="${E.catalogo}" target="_blank" rel="noopener">${ic('baixar')} Baixar catálogo</a></div>
  </div>
  <figure class="a-hero-foto">${img('rubi', 'Conjunto Rubi, lançamento 2024', ' fetchpriority="high" loading="eager"')}<figcaption>Conjunto Rubi · Ref. M2256 · M2257</figcaption></figure>
</section>

<div class="palavras" aria-label="${sobre.palavras.join(', ')}"><div class="palavras-trilho">${[...sobre.palavras, ...sobre.palavras].map(p => `<span>${p}</span>`).join('')}</div></div>

<section class="sec a-cats"><div class="in">
  <header class="sec-tit"><p class="eyebrow">Nossos produtos</p><h2>Cinco linhas para a casa toda</h2></header>
  <div class="a-cats-grade" data-rev-filhos="" data-rev-passo="90">
    ${categorias.map((c, i) => `<a class="a-cat a-cat-${i % 2 ? 'verde' : 'teal'}${c.contem ? ' a-cat-contem' : ''}" href="/a/produtos/#${c.id}">
      <span class="a-cat-foto">${img(c.img, c.nome)}</span>
      <span class="a-cat-txt"><strong>${c.nome}</strong><small>${doTipo(c.id).length} ${doTipo(c.id).length > 1 ? 'modelos' : 'modelo'}</small><span class="mais">Ver mais ${ic('seta')}</span></span>
    </a>`).join('')}
  </div>
</div></section>

<section class="sec a-lanc"><div class="in">
  <header class="sec-tit sec-tit-linha"><div><p class="eyebrow">Catálogo 2024</p><h2>Lançamentos</h2></div><a class="link" href="/a/produtos/#conjuntos">Todos os conjuntos ${ic('seta')}</a></header>
  <div class="a-lanc-faixa" tabindex="0" aria-label="Lançamentos 2024">${lanc.map(p => itemProduto('a', p)).join('')}</div>
</div></section>

<section class="sec a-medidas"><div class="in a-medidas-grade">
  <figure class="a-medidas-foto" data-rev="esq">${img(destaque.foto, destaque.nome)}</figure>
  <div data-rev="dir">
    <p class="eyebrow">Feito na medida da sua sala</p>
    <h2>${destaque.nome}: seis tamanhos de tampo</h2>
    <p>Quase todos os conjuntos saem em mais de um tamanho, com tampo em madeira ou em madeira com vidro. As medidas de cada peça estão na página do produto e no catálogo.</p>
    ${tampos(destaque)}
    <a class="btn btn-linha" href="/a/produtos/${destaque.slug}/">Ver medidas do ${curto(destaque)} ${ic('seta')}</a>
  </div>
</div></section>

<section class="sec a-empresa"><div class="in a-empresa-grade">
  <div data-rev>
    <p class="eyebrow">Nossa empresa</p>
    <h2>Qualidade e elegância para transformar seus espaços</h2>
    <p>${esc(sobre.catalogo[1])}</p>
    <a class="link" href="/a/empresa/">Conheça a ACG Móveis ${ic('seta')}</a>
  </div>
  <ul class="a-numeros" data-rev-filhos="" data-rev-passo="120">
    <li><strong data-conta>${produtos.length}</strong><span>produtos no catálogo</span></li>
    <li><strong data-conta>${representantes.length}</strong><span>representantes</span></li>
    <li><strong data-conta>${totalUfs.length}</strong><span>estados atendidos</span></li>
  </ul>
</div></section>

<section class="sec a-como"><div class="in">
  <header class="sec-tit"><p class="eyebrow">Para lojistas</p><h2>Como comprar da ACG Móveis</h2></header>
  ${passos('a')}
</div></section>

<section class="a-cta"><div class="in">
  <div><h2>Receba o catálogo completo</h2><p>Lançamentos 2024 com fotos, referências e medidas de todas as peças, em PDF.</p></div>
  <div class="acoes"><a class="btn btn-claro" href="${E.catalogo}" target="_blank" rel="noopener">${ic('baixar')} Baixar catálogo</a><a class="btn btn-linha-claro" href="/a/contato/">Falar com a fábrica</a></div>
</div></section>`;
}

function homeB() {
  const troca = ['celine', 'antonella', 'helena', 'bistro-adhara'].map(s => produtos.find(p => p.slug === s));
  return `
<section class="b-hero">
  <div class="b-hero-foto ap-kenburns">${img('celine', 'Conjunto Celine em sala de jantar', ' fetchpriority="high" loading="eager"')}</div>
  <div class="b-hero-in">
    <div class="b-hero-txt">
      <p class="eyebrow">Indústria de móveis · Lagoa Vermelha, RS</p>
      <h1 data-palavras>Requinte, bom gosto e sofisticação para a sua sala de jantar.</h1>
      <p class="lead" data-rev>Conjuntos de mesa e cadeiras, cristaleiras e bistrôs com estilo e personalidade.</p>
      <div class="acoes" data-rev><a class="btn btn-verde" href="/b/produtos/">Conhecer os produtos ${ic('seta')}</a><a class="btn btn-linha-claro" href="/b/representantes/">Encontrar representante</a></div>
    </div>
    <a class="b-hero-pdf" href="${E.catalogo}" target="_blank" rel="noopener" data-rev="dir">${ic('pdf', 'ic ic-g')}<span><small>Catálogo de produtos</small>Lançamentos 2024 · PDF</span></a>
  </div>
</section>

<section class="b-quadros"><div class="b-quadros-grade">
  ${categorias.map((c, i) => `<a class="b-quadro b-q${i % 3}" href="/b/produtos/#${c.id}" data-rev style="--ap-d:${i * 90}ms">
    <span class="b-quadro-foto">${img(c.faixa, '')}</span>
    <span class="b-quadro-txt"><strong>${c.curto}</strong><small>${c.texto}</small><span class="mais">Ver mais ${ic('seta')}</span></span>
  </a>`).join('')}
</div></section>

<section class="sec b-empresa"><div class="in b-empresa-grade">
  <div class="b-empresa-txt" data-rev>
    <p class="eyebrow">Nossa empresa</p>
    <h2>${esc(sobre.catalogo[0])}</h2>
    <p>${esc(sobre.curto)}</p>
    <a class="btn btn-teal" href="/b/empresa/">Conheça a ACG Móveis ${ic('seta')}</a>
  </div>
  <figure class="b-empresa-foto" data-rev="cortina"><div>${img('dominique', 'Conjunto Dominique')}</div></figure>
</div></section>

<section class="sec b-troca"><div class="in">
  <header class="sec-tit"><p class="eyebrow">Ambientes</p><h2>Um conjunto para cada estilo de casa</h2></header>
  <div class="b-troca-grade" data-troca>
    <div class="ap-troca-midia">${troca.map((p, i) => `<figure${i ? '' : ' class="ap-on"'}>${img(p.foto, p.nome)}</figure>`).join('')}</div>
    <div class="b-troca-passos">${troca.map(p => `<article class="ap-troca-passo">
      <p class="eyebrow">${p.pecas.length ? 'Ref. ' + refs(p) : ''}</p>
      <h3>${esc(p.nome)}</h3>
      <p>${esc(p.frase)}${p.obs ? ' ' + esc(p.obs.replace(/\.$/, '')) + '.' : ''}</p>
      ${p.tamanhos ? `<p class="b-troca-tam">${p.tamanhos.length} tamanhos · de ${esc(p.tamanhos[0])} a ${esc(p.tamanhos.at(-1))} m</p>` : ''}
      <a class="link" href="/b/produtos/${p.slug}/">Ver medidas ${ic('seta')}</a>
    </article>`).join('')}</div>
  </div>
</div></section>

<section class="sec b-crist"><div class="in">
  <header class="sec-tit sec-tit-linha"><div><p class="eyebrow">Cristaleiras</p><h2>Madeira, vidro e luz</h2></div><a class="link" href="/b/produtos/#cristaleiras">Ver as ${doTipo('cristaleiras').length} cristaleiras ${ic('seta')}</a></header>
  <div class="b-crist-fila" data-rev-filhos="" data-rev-passo="80">${doTipo('cristaleiras').map(p => `<a href="/b/produtos/${p.slug}/">${img(p.foto, p.nome)}<span>${curto(p).replace('Cristaleira ', '')}</span></a>`).join('')}</div>
</div></section>

<section class="sec b-como"><div class="in">
  <header class="sec-tit"><p class="eyebrow">Para lojistas</p><h2>Do catálogo à sua loja</h2></header>
  ${passos('b')}
</div></section>

<section class="sec b-reps"><div class="in b-reps-grade">
  <div data-rev>
    <p class="eyebrow">Nossos representantes</p>
    <h2>Espalhados por todas as regiões do Brasil</h2>
    <p>Nossos representantes são grandes parceiros e podem auxiliar você. Localize o correspondente à sua região e bons negócios.</p>
    <a class="btn btn-teal" href="/b/representantes/">Ver todos os representantes ${ic('seta')}</a>
  </div>
  <ul class="b-ufs" data-rev-filhos="" data-rev-passo="50">${totalUfs.map(u => `<li><a href="/b/representantes/#${u}"><strong>${u}</strong><small>${ufs[u]}</small><em>${representantes.filter(r => r.uf.includes(u)).length}</em></a></li>`).join('')}</ul>
</div></section>`;
}

// =====================================================================================
// EMPRESA
// =====================================================================================
function empresa(v) {
  const capa = v === 'a'
    ? `<section class="cabeca"><div class="in"><p class="eyebrow">A Empresa</p><h1>Qualidade e elegância que se encontram</h1><p class="lead">${esc(sobre.curto)}</p></div></section>`
    : `<section class="cabeca-foto">${img('antonella', 'Conjunto Antonella')}<div class="in"><p class="eyebrow">A Empresa</p><h1>Qualidade e elegância que se encontram</h1></div></section>`;
  return `${capa}
<section class="sec emp-texto"><div class="in emp-grade">
  <div class="emp-col" data-rev>
    ${sobre.catalogo.map((t, i) => `<p${i === 0 ? ' class="emp-abre"' : ''}>${esc(t)}</p>`).join('')}
  </div>
  <figure class="emp-foto" data-rev="dir">${img('bethania', 'Conjunto Bethânia')}<figcaption>Conjunto Bethânia · Catálogo 2024</figcaption></figure>
</div></section>

<section class="sec emp-valores"><div class="in">
  <header class="sec-tit"><p class="eyebrow">O que nos move</p><h2>${sobre.palavras.join(' · ')}</h2></header>
  <div class="emp-pilares">
    <div data-rev><h3>Materiais de primeira qualidade</h3><p>Madeira, vidro, ratan indiano e estofados escolhidos para durar, com técnicas de fabricação avançadas.</p></div>
    <div data-rev style="--ap-d:120ms"><h3>Tendência do mercado brasileiro</h3><p>Coleções renovadas a cada catálogo, como os ${produtos.filter(p => p.novo).length} lançamentos de 2024.</p></div>
    <div data-rev style="--ap-d:240ms"><h3>Funcionalidade e estilo</h3><p>Mesas em vários tamanhos e tampos em madeira ou madeira com vidro, para cada sala de jantar e estar.</p></div>
  </div>
</div></section>

<section class="sec emp-fab"><div class="in emp-fab-grade">
  <div data-rev>
    <p class="eyebrow">Fábrica</p>
    <h2>Lagoa Vermelha, Rio Grande do Sul</h2>
    <p>${E.endereco}, ${E.bairro}<br>CEP ${E.cep} · ${E.cidade}</p>
    <p>${E.telefones.map(f => `<a href="${tel(f)}">${f}</a>`).join(' · ')}</p>
    <div class="acoes"><a class="btn btn-cheio" href="/${v}/contato/">Fale conosco ${ic('seta')}</a><a class="btn btn-linha" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Ver no mapa</a></div>
  </div>
  <ul class="emp-num" data-rev-filhos="" data-rev-passo="120">
    <li><strong data-conta>${produtos.length}</strong> produtos no catálogo</li>
    <li><strong data-conta>${representantes.length}</strong> representantes</li>
    <li><strong data-conta>${totalUfs.length}</strong> estados atendidos</li>
  </ul>
</div></section>
${v === 'a' ? '' : `<section class="sec b-como"><div class="in"><header class="sec-tit"><p class="eyebrow">Para lojistas</p><h2>Do catálogo à sua loja</h2></header>${passos(v)}</div></section>`}`;
}

// =====================================================================================
// PRODUTOS
// =====================================================================================
function listaProdutos(v) {
  const capa = v === 'a'
    ? `<section class="cabeca"><div class="in"><p class="eyebrow">Produtos</p><h1>Catálogo ACG Móveis</h1><p class="lead">Conjuntos de jantar, bistrôs, cristaleiras, mesas e cadeiras avulsas e peças para a sala de estar. Clique em cada peça para ver referências e medidas.</p><a class="btn btn-linha" href="${E.catalogo}" target="_blank" rel="noopener">${ic('baixar')} Catálogo 2024 em PDF</a></div></section>`
    : `<section class="cabeca-foto">${img('higia-adhara', 'Conjunto Mesa Higia com Cadeira Adhara')}<div class="in"><p class="eyebrow">Produtos</p><h1>Nossos produtos</h1></div></section>`;
  return `${capa}
<section class="sec prods"><div class="in">
  <div class="chips chips-cat" role="toolbar" aria-label="Filtrar por linha" data-filtro-cat>
    <button class="chip" data-cat="" aria-pressed="true">Todos <small>${produtos.length}</small></button>
    ${categorias.map(c => `<button class="chip" data-cat="${c.id}" aria-pressed="false">${c.curto} <small>${doTipo(c.id).length}</small></button>`).join('')}
  </div>
  ${categorias.map(c => `<section class="prods-grupo" id="${c.id}" data-grupo="${c.id}">
    <header class="prods-cab"><h2>${c.nome}</h2><p>${c.texto}</p></header>
    <div class="prods-grade prods-${c.id}">${doTipo(c.id).map(p => itemProduto(v, p)).join('')}</div>
  </section>`).join('')}
</div></section>`;
}

function produto(v, p) {
  const c = cat(p.tipo);
  const outros = doTipo(p.tipo).filter(o => o !== p).slice(0, 4);
  return `<nav class="trilha in" aria-label="Você está em"><a href="/${v}/produtos/">Produtos</a> / <a href="/${v}/produtos/#${c.id}">${c.nome}</a> / <span>${esc(curto(p))}</span></nav>
<section class="pd"><div class="in pd-grade">
  <figure class="pd-foto${p.recorte ? ' pd-recorte' : ''}">${img(p.foto, p.nome, ' loading="eager"')}${p.novo ? '<span class="selo">Lançamento 2024</span>' : ''}</figure>
  <div class="pd-info">
    <p class="eyebrow">${c.nome}</p>
    <h1>${esc(p.nome)}</h1>
    <p class="lead">${esc(p.frase)}</p>
    ${fichaTecnica(p)}
    <div class="acoes"><a class="btn btn-cheio" href="/${v}/representantes/">Comprar com um representante ${ic('seta')}</a><a class="btn btn-linha" href="mailto:${E.email}?subject=${encodeURIComponent(`${p.nome}${p.pecas.length ? ' (Ref. ' + refs(p) + ')' : ''}`)}">${ic('mail')} Pedir informações</a></div>
  </div>
</div></section>
${p.tamanhos || p.cadeira || p.extra ? `<section class="sec pd-medidas"><div class="in">
  <header class="sec-tit"><p class="eyebrow">Medidas em metros</p><h2>${p.tamanhos ? 'Tamanhos de tampo' : 'Detalhes'}</h2></header>
  <div class="pd-medidas-grade">
    ${p.tamanhos ? tampos(p) : ''}
    ${cadeira(p)}
    ${p.extra ? `<figure class="pd-extra">${img(p.extra, '')}<figcaption>${p.extra === 'cadeira-celine-ratan' ? 'Opção: cadeira Celine com ratan sextavado indiano' : p.extra === 'base-betina' ? 'Opção: base Betina (Ref. M1916)' : 'Banqueta Orion (Ref. M1410)'}</figcaption></figure>` : ''}
  </div>
</div></section>` : ''}
${outros.length ? `<section class="sec pd-outros"><div class="in">
  <header class="sec-tit sec-tit-linha"><div><p class="eyebrow">${c.nome}</p><h2>Veja também</h2></div><a class="link" href="/${v}/produtos/#${c.id}">Ver todos ${ic('seta')}</a></header>
  <div class="prods-grade">${outros.map(o => itemProduto(v, o)).join('')}</div>
</div></section>` : ''}`;
}

// =====================================================================================
// REPRESENTANTES E CONTATO
// =====================================================================================
function reps(v) {
  const capa = v === 'a'
    ? `<section class="cabeca"><div class="in"><p class="eyebrow">Representantes</p><h1>Nossos representantes</h1><p class="lead">Espalhados por todas as regiões do Brasil, nossos representantes são grandes parceiros e podem auxiliar você. Localize o correspondente à sua região e bons negócios.</p></div></section>`
    : `<section class="cabeca-foto">${img('berlim', 'Conjunto Berlim')}<div class="in"><p class="eyebrow">Representantes</p><h1>Encontre o representante da sua região</h1></div></section>`;
  return `${capa}
<section class="sec reps"><div class="in">
  ${v === 'b' ? '<p class="lead reps-intro">Espalhados por todas as regiões do Brasil, nossos representantes são grandes parceiros e podem auxiliar você. Localize o correspondente à sua região e bons negócios.</p>' : ''}
  ${filtroUf()}
  <ul class="reps-lista">${representantes.map(repItem).join('')}</ul>
  <aside class="reps-area">
    <div><h2>Acesso exclusivo para representantes</h2><p>Faça seu pedido no sistema da ACG Móveis.</p></div>
    <a class="btn btn-claro" href="${E.pedidos}" target="_blank" rel="noopener">${ic('chave')} Faça seu pedido</a>
  </aside>
  <p class="reps-nota">Não achou sua região? <a href="/${v}/contato/">Fale com a fábrica</a> pelo ${E.telefones[0]}.</p>
</div></section>`;
}

function contato(v) {
  return `<section class="${v === 'a' ? 'cabeca' : 'cabeca cabeca-b'}"><div class="in"><p class="eyebrow">Contato</p><h1>Entre em contato</h1><p class="lead">Fale com a fábrica em Lagoa Vermelha (RS) ou com o representante da sua região.</p></div></section>
<section class="sec ct"><div class="in ct-grade">
  ${formContato()}
  <aside class="ct-dados">
    <div><h2>${ic('pin')} Endereço</h2><p>${E.endereco}<br>${E.bairro}<br>CEP ${E.cep} · ${E.cidade}</p><a class="link" href="${E.mapa}" target="_blank" rel="noopener">Abrir no mapa ${ic('seta')}</a></div>
    <div><h2>${ic('tel')} Telefones</h2><p>${E.telefones.map(f => `<a href="${tel(f)}">${f}</a>`).join('<br>')}</p></div>
    <div><h2>${ic('mail')} E-mail</h2><p><a href="mailto:${E.email}">${E.email}</a></p></div>
    <div><h2>${ic('chave')} Representantes</h2><p><a href="${E.pedidos}" target="_blank" rel="noopener">Área do representante</a> · <a href="/${v}/representantes/">Lista por estado</a></p></div>
  </aside>
</div></section>
<section class="ct-mapa"><iframe title="Mapa: ACG Móveis em Lagoa Vermelha, RS" src="https://maps.google.com/maps?q=${encodeURIComponent(`${E.endereco}, Lagoa Vermelha, RS`)}&z=15&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;
}

// =====================================================================================
export function gerarVersao(v) {
  const sufixo = ' | ACG Móveis';
  const out = {
    index: pagina(v, 'index', '', 'ACG Móveis | Conjuntos de jantar, cristaleiras e bistrôs', 'Indústria de móveis em Lagoa Vermelha (RS): conjuntos de mesa e cadeiras, cristaleiras, bistrôs e mesas de centro com requinte e bom gosto. Catálogo 2024.', v === 'a' ? homeA() : homeB(), { sobreFoto: v === 'b' }),
    empresa: pagina(v, 'empresa', 'empresa/', 'A Empresa' + sufixo, sobre.curto, empresa(v), { sobreFoto: v === 'b' }),
    produtos: pagina(v, 'produtos', 'produtos/', 'Produtos' + sufixo, 'Conjuntos de jantar, bistrôs, cristaleiras, mesas e cadeiras avulsas, mesas de centro e aparadores da ACG Móveis, com referências e medidas.', listaProdutos(v), { sobreFoto: v === 'b' }),
    representantes: pagina(v, 'representantes', 'representantes/', 'Representantes' + sufixo, `Representantes da ACG Móveis em ${totalUfs.length} estados. Encontre o da sua região.`, reps(v), { sobreFoto: v === 'b' }),
    contato: pagina(v, 'contato', 'contato/', 'Contato' + sufixo, `Fale com a ACG Móveis: ${E.telefones[0]}, ${E.email}. ${E.endereco}, ${E.cidade}.`, contato(v)),
  };
  for (const p of produtos) {
    out[`produtos/${p.slug}`] = pagina(v, 'produtos', `produtos/${p.slug}/`, p.nome + sufixo, `${p.nome}${p.pecas.length ? ` (Ref. ${refs(p)})` : ''}: ${p.frase} Medidas e referências no catálogo da ACG Móveis.`, produto(v, p));
  }
  return out;
}
