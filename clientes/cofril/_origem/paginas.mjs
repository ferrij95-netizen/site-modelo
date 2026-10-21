// Monta as páginas das versões A ("Vitrine": o vermelho do site atual, banners das campanhas, ícones das linhas, calculadora de churrasco
// no amarelo e o mapa de representantes) e B ("Desde 1987": a fábrica vista do alto, os números, da granja à mesa, quadro de prêmios e
// catálogo em ficha técnica). Estilos em public/assets/{base,a,b}.css, comportamento em public/assets/site.js.
import {
  empresa as E, numeros, historia, missao, visao, valores, qualidade, sustentabilidade, etapas, premios, churrasco,
  categorias, produtos, receitas, noticias, representantes, catNome, destaques, mapaES,
} from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (src, alt, w, h, extra = '') => `<img src="${src}" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const fotoProd = (p, extra = '') => p.img ? img(`/assets/prod/${p.img}.webp`, `${p.nome} Cofril`, 560, 560, extra) : '';
const dataBR = d => { const [a, m, dd] = d.split('-'); return `${dd}/${m}/${a}`; };
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const dataLonga = d => { const [a, m, dd] = d.split('-'); return `${Number(dd)} de ${MESES[m - 1]} de ${a}`; };
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const semTabela = p => !p.nut.length || p.nut.every(n => n[1] === '--' || !n[1]);

export const nomesVersao = { a: 'Vitrine', b: 'Desde 1987' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'A Empresa', caminho: 'empresa/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'receitas', nome: 'Receitas', caminho: 'receitas/' },
  { slug: 'noticias', nome: 'Notícias', caminho: 'noticias/' },
  { slug: 'representantes', nome: 'Representantes', caminho: 'representantes/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  esq: '<path d="M15 5l-7 7 7 7"/>',
  dir: '<path d="M9 5l7 7-7 7"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  baixar: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  lupa: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  frio: '<path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5L4.9 17.5M9 4l3 2 3-2M9 20l3-2 3 2"/>',
  play: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
  trofeu: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0z"/><path d="M17 5h3a3 3 0 01-3 4M7 5H4a3 3 0 003 4"/>',
  folha: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19l8-8"/>',
  gente: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0112 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15 14a5 5 0 016 6"/>',
  reciclar: '<path d="M7 19H4l3-5M17 19h3l-3-5M9 5l3-2 3 2M8 14l-2-4M18 10l-2 4M10 19h4"/>',
  celular: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  doc: '<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h8M9 17h6"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  menos: '<path d="M5 12h14"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const onda = '<svg class="onda" viewBox="0 0 96 10" aria-hidden="true" preserveAspectRatio="none"><path d="M0 5c6 0 6-4 12-4s6 4 12 4 6-4 12-4 6 4 12 4 6-4 12-4 6 4 12 4 6-4 12-4 6 4 12 4" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>';
const iconeCat = (c, cls = 'cat-ic') => `<img class="${cls}" src="/assets/icones/${c}.png" alt="" width="70" height="70" loading="lazy">`;

// ---------- moldura ----------
function head(v, caminho, titulo, descricao, og = `${E.url}assets/og-${v}.jpg`) {
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
<meta property="og:site_name" content="Cofril">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#D71920' : '#FFFFFF'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const atualDe = (n, atual) => n.slug === atual || (atual === 'produto' && n.slug === 'produtos') || (atual === 'receita' && n.slug === 'receitas') || (atual === 'noticia' && n.slug === 'noticias');
const link = (v, n, atual) => `<a href="/${v}/${n.caminho}"${atualDe(n, atual) ? ' aria-current="page"' : ''}>${n.nome}</a>`;
const logo = (w = 120) => `<img src="/assets/logo.webp" alt="Cofril" width="${w}" height="${Math.round(w * 699 / 800)}">`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const redes = () => E.redes.map(([n, u]) => `<a href="${u}" rel="noopener" target="_blank">${n}</a>`).join('');

function topo(v, atual) {
  if (v === 'a') return `<div class="faixa"><div class="in"><span><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></span><span class="faixa-redes">${redes()}</span></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="Cofril, início">${logo(112)}</a>
  <nav id="menu" class="menu" aria-label="Principal">${nav.map(n => link(v, n, atual)).join('')}<a class="menu-pill" href="${E.downloads}" rel="noopener" target="_blank">${ic('baixar')} Downloads</a></nav>
  ${menuBtn}
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Cofril, início">${logo(78)}<span class="marca-txt">Frigorífico Cofril<small>Cachoeiro de Itapemirim · ES</small></span></a>
  <nav id="menu" class="menu" aria-label="Principal">${nav.slice(1).map(n => link(v, n, atual)).join('')}<a class="menu-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></nav>
  ${menuBtn}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(v === 'a' ? 132 : 104)}<p class="rod-slogan">${E.slogan}</p><p class="rod-redes">${redes()}</p></div>
  <div><h3>Ligue-nos</h3><p><a class="rod-tel" href="tel:${E.foneHref}">${E.fone}</a><br><a href="tel:${E.celularHref}">${E.celular}</a></p><p><a href="mailto:${E.email}">${E.email}</a></p></div>
  <div><h3>Onde estamos</h3><p>${E.rua}<br>${E.cep}<br>${E.cidade}</p></div>
  <div><h3>Para clientes</h3><p class="rod-links"><a href="${E.app}" rel="noopener" target="_blank">${ic('celular')} Baixe nosso app</a><a href="${E.nfe}" rel="noopener" target="_blank">${ic('doc')} XML da sua NF-e</a><a href="${E.downloads}" rel="noopener" target="_blank">${ic('baixar')} Download de imagens</a></p></div>
</div><nav class="rod-nav in" aria-label="Rodapé">${nav.map(n => link(v, n, '')).join('')}</nav><p class="rod-fim">© Cofril · ${E.cidade} · Fotos e textos do site atual da Cofril.</p></footer>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo, og) => `${head(v, caminho, titulo, descricao, og)}
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

// Faixa de título das páginas internas. Na A é a faixa vermelha com a ondinha do site atual; na B, título alinhado à esquerda.
const faixaTitulo = (v, titulo, trilha = [], sub = '', soTrilha = false) => soTrilha ? `<section class="pg-topo pg-trilha"><div class="in"><nav class="trilha" aria-label="Você está aqui"><a href="/${v}/">Início</a>${trilha.map(([n, u]) => u ? `<span>›</span><a href="/${v}/${u}">${esc(n)}</a>` : `<span>›</span><span aria-current="page">${esc(n)}</span>`).join('')}</nav></div></section>` : `<section class="pg-topo"><div class="in">
  <nav class="trilha" aria-label="Você está aqui"><a href="/${v}/">Início</a>${trilha.map(([n, u]) => u ? `<span>›</span><a href="/${v}/${u}">${esc(n)}</a>` : `<span>›</span><span aria-current="page">${esc(n)}</span>`).join('')}</nav>
  <h1>${esc(titulo)}</h1>${v === 'a' ? onda : ''}${sub ? `<p>${sub}</p>` : ''}
</div></section>`;

// ---------- blocos comuns ----------
function tabelaNut(p) {
  if (semTabela(p)) return `<p class="nut-vazia">Tabela nutricional não informada no site atual para este item.</p>`;
  return `<table class="nut"><caption>Informação nutricional<span>Porção de ${esc(p.porcao)}</span></caption><thead><tr><th scope="col">Quantidade por porção</th><th scope="col"></th><th scope="col">%VD*</th></tr></thead><tbody>${p.nut.map(([n, q, vd]) => `<tr><th scope="row">${n}</th><td>${esc(q)}</td><td>${vd === '**' ? '**' : esc(vd)}</td></tr>`).join('')}</tbody><tfoot><tr><td colspan="3">(*) Valores diários com base em uma dieta de 2.000 kcal ou 8.400 kJ. Seus valores podem ser maiores ou menores dependendo de suas necessidades energéticas. (**) Valores não estabelecidos para gorduras trans.</td></tr></tfoot></table>`;
}

const formContato = () => `<form class="form" data-form>
  <div class="campos">
    <label>Assunto*<select name="Assunto" required><option value="">Selecione</option><option>Elogio</option><option>Sugestão</option><option>Informações</option><option>Dúvidas</option><option>Reclamação</option></select></label>
    <label>Nome completo*<input name="Nome" autocomplete="name" required></label>
    <label>E-mail*<input name="E-mail" type="email" autocomplete="email" required></label>
    <label>Telefone (com DDD)*<input name="Telefone" type="tel" autocomplete="tel" required></label>
    <label>Celular (com DDD)<input name="Celular" type="tel"></label>
    <label>CPF*<input name="CPF" inputmode="numeric" required></label>
    <label class="largo">Mensagem*<textarea name="Mensagem" rows="5" required></textarea></label>
  </div>
  <button class="btn" type="submit">Enviar mensagem ${ic('seta')}</button>
  <p class="form-ok" role="status" hidden>Mensagem pronta. Nesta prévia o envio está desligado; no site no ar ela chega direto no e-mail da Cofril. Enquanto isso, ligue <a href="tel:${E.foneHref}">${E.fone}</a>.</p>
</form>`;

function calculadora(v) {
  const campo = (id, nome) => `<label class="calc-campo"><span>${nome}</span><span class="calc-num"><button type="button" data-calc-menos aria-label="Menos ${nome.toLowerCase()}">${ic('menos')}</button><input id="calc-${id}" name="${id}" type="number" min="0" max="999" value="0" inputmode="numeric"><button type="button" data-calc-mais aria-label="Mais ${nome.toLowerCase()}">${ic('mais')}</button></span></label>`;
  return `<form class="calc" data-calc='${JSON.stringify(churrasco)}'>
  <div class="calc-campos">${campo('homem', 'Homens')}<span class="calc-op" aria-hidden="true">+</span>${campo('mulher', 'Mulheres')}<span class="calc-op" aria-hidden="true">+</span>${campo('crianca', 'Crianças')}</div>
  <div class="calc-res" aria-live="polite"><p class="calc-total"><strong data-calc-total>0</strong> kg de carne no total</p><ul>${churrasco.divisao.map(([n, f]) => `<li><span>${n}</span><i style="--p:${f * 100}%"></i><b data-calc-item="${n}">0 kg</b></li>`).join('')}</ul>
  <p class="calc-nota">Conta da calculadora do site atual: ${churrasco.homem * 1000} g por homem, ${churrasco.mulher * 1000} g por mulher e ${churrasco.crianca * 1000} g por criança.</p></div>
</form>`;
}

// Mapa do ES (desenhado no site atual) com o seletor de cidade e os representantes.
function blocoRepresentantes(v, compacto = false) {
  const porNome = Object.fromEntries(representantes.map(r => [norm(r.cidade), r]));
  const svg = mapaES.replace(/<path([^>]*?)data-cidade="([^"]+)"/g, (m, a, c) => {
    const r = porNome[norm(c)];
    return `<path${a}data-cidade="${c}"${r ? ` data-rep="${r.slug}" tabindex="0" role="button" aria-label="${esc(c)}"` : ''}`;
  }).replace('<svg ', '<svg class="mapa-es" aria-label="Mapa do Espírito Santo com as cidades atendidas" ');
  const dadosRep = representantes.map(r => `<div class="rep-cidade" data-rep-cidade="${r.slug}" hidden><h3>${esc(r.cidade)}</h3><ul>${r.contatos.map(c => `<li><span>${esc(c.nome)}</span><a href="tel:+55${c.fone.replace(/\D/g, '')}">${ic('tel')} (${c.fone.replace(/\D/g, '').slice(0, 2)}) ${c.fone.replace(/\D/g, '').slice(2, -4)}-${c.fone.replace(/\D/g, '').slice(-4)}</a></li>`).join('')}</ul></div>`).join('');
  return `<div class="reps${compacto ? ' reps-compacto' : ''}" data-reps>
  <div class="reps-busca">
    <label for="rep-sel-${v}">Selecione a localidade</label>
    <select id="rep-sel-${v}" data-rep-sel><option value="">Cidade</option>${representantes.map(r => `<option value="${r.slug}">${esc(r.cidade)}</option>`).join('')}</select>
    <div class="reps-res">${dadosRep}<p class="rep-vazio" data-rep-vazio>Escolha a cidade no mapa ou na lista para ver os representantes da Cofril na região.</p></div>
  </div>
  <div class="reps-mapa">${svg}</div>
</div>`;
}

function receitaCorpo(r) {
  let html = '', lista = false;
  const fecha = () => { if (lista) { html += '</ul>'; lista = false; } };
  for (const l of r.linhas) {
    const m = l.match(/^((?:Modo de preparo|Ingredientes|Para |Preparo|Recheio|Molho|Massa|Montagem)[^:]{0,60}):\s*(.*)$/i);
    if (m) {
      fecha();
      html += `<h2>${esc(m[1])}</h2>`;
      if (m[2]) html += `<p>${esc(m[2])}</p>`;
      else if (!/preparo|montagem/i.test(m[1])) { html += '<ul class="ingr">'; lista = true; }
    } else if (lista && l.length < 90) html += `<li>${esc(l)}</li>`;
    else { fecha(); html += `<p>${esc(l)}</p>`; }
  }
  fecha();
  return html;
}
const video = (id, titulo) => `<div class="video" data-video="${id}"><button type="button" aria-label="Assistir ao vídeo: ${esc(titulo)}"><img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy" width="480" height="360"><span>${ic('play')}</span></button></div>`;

const cardReceita = (v, r, cls = 'rec-card') => `<a class="${cls}" href="/${v}/receitas/${r.slug}/"><span class="rec-foto">${img(`/assets/rec/${r.img}-p.webp`, r.titulo, 640, 427)}</span><span class="rec-nome">${esc(r.titulo)}</span>${v === 'a' ? `<span class="btn btn-p">Ver receita</span>` : ''}</a>`;
const porSlug = Object.fromEntries(produtos.map(p => [p.slug, p]));
const listaDestaques = destaques.map(s => porSlug[s]).filter(Boolean);

// ---------- páginas que mudam pouco entre as versões ----------
function paginaProduto(v, p) {
  const irmaos = produtos.filter(o => o.cat === p.cat && o.slug !== p.slug).slice(0, 8);
  const corpo = `${faixaTitulo(v, p.nome, [['Produtos', 'produtos/'], [catNome[p.cat], `produtos/?linha=${p.cat}`], [p.nome]], '', true)}
<section class="prod-det"><div class="in">
  <div class="prod-foto">${fotoProd(p, ' loading="eager"')}</div>
  <div class="prod-info">
    <p class="prod-linha">${iconeCat(p.cat, 'cat-ic-p')} ${esc(catNome[p.cat])}</p>
    <h1>${esc(p.nome)}</h1>
    ${p.conserva ? `<p class="prod-conserva">${ic('frio')} ${esc(p.conserva)}</p>` : ''}
    ${p.ingredientes ? `<h3>Ingredientes</h3><p class="prod-ingr">${esc(p.ingredientes)}</p>` : ''}
    ${p.avisos.length ? `<ul class="prod-avisos">${p.avisos.map(a => `<li>${esc(a)}</li>`).join('')}</ul>` : ''}
    ${tabelaNut(p)}
    <p class="prod-acoes"><a class="btn" href="/${v}/representantes/">Onde comprar ${ic('seta')}</a><a class="btn btn-l" href="${E.downloads}" rel="noopener" target="_blank">${ic('baixar')} Imagem do produto</a></p>
  </div>
</div></section>
${irmaos.length ? `<section class="sec sec-irmaos"><div class="in"><h2 class="sec-tit">Mais em ${esc(catNome[p.cat])}</h2>${v === 'a' ? onda : ''}${prateleira(v, irmaos)}</div></section>` : ''}`;
  return pagina(v, 'produto', `produtos/${p.slug}/`, `${p.nome} · Cofril`, `${p.nome}, da linha ${catNome[p.cat]} da Cofril.${p.ingredientes ? ' Ingredientes e informação nutricional.' : ''}`, corpo, p.img ? undefined : undefined);
}

function prateleira(v, lista) {
  return `<div class="prat" data-prat>
  <button class="prat-seta prat-esq" type="button" aria-label="Anteriores" data-prat-ir="-1">${ic('esq')}</button>
  <ul class="prat-lista" tabindex="0">${lista.map(p => `<li><a class="prat-item" href="/${v}/produtos/${p.slug}/"><span class="prat-img">${fotoProd(p)}</span><span class="prat-nome">${esc(p.nome)}</span></a></li>`).join('')}</ul>
  <button class="prat-seta prat-dir" type="button" aria-label="Próximos" data-prat-ir="1">${ic('dir')}</button>
</div>`;
}

function paginaProdutos(v) {
  const filtros = `<div class="filtros" role="group" aria-label="Linhas de produto"><button type="button" data-filtro="" aria-pressed="true">${v === 'a' ? `<span class="cat-circ cat-todos">${ic('menu')}</span>` : ''}<span>Todos</span><small>${produtos.length}</small></button>${categorias.map(c => `<button type="button" data-filtro="${c.slug}" aria-pressed="false">${v === 'a' ? `<span class="cat-circ">${iconeCat(c.slug)}</span>` : ''}<span>${c.nome}</span><small>${produtos.filter(p => p.cat === c.slug).length}</small></button>`).join('')}</div>`;
  const busca = `<label class="busca">${ic('lupa')}<input type="search" placeholder="Buscar produto (ex.: calabresa, bacon, pernil)" data-busca aria-label="Buscar produto"></label>`;
  const itens = v === 'a'
    ? `<ul class="catalogo">${produtos.map(p => `<li data-linha="${p.cat}" data-nome="${esc(norm(p.nome))}"><a href="/a/produtos/${p.slug}/"><span class="cat-foto">${fotoProd(p)}</span><span class="cat-nome">${esc(p.nome)}</span><span class="cat-mais">+ informações</span></a></li>`).join('')}</ul>`
    : `<div class="catalogo-b">${categorias.map(c => `<section data-linha="${c.slug}" class="cb-linha"><h2>${c.nome}<small>${produtos.filter(p => p.cat === c.slug).length} itens</small></h2><ul>${produtos.filter(p => p.cat === c.slug).map(p => `<li data-nome="${esc(norm(p.nome))}"><a href="/b/produtos/${p.slug}/"><span class="cb-foto">${fotoProd(p)}</span><span class="cb-nome">${esc(p.nome)}</span><span class="cb-porcao">${semTabela(p) ? 'In natura' : `Porção ${esc(p.porcao)}`}</span><span class="cb-cons">${p.conserva ? esc(p.conserva.replace(/^Mantenha\s*/i, '').replace(/\.$/, '')) : ''}</span>${ic('dir')}</a></li>`).join('')}</ul></section>`).join('')}</div>`;
  const corpo = `${faixaTitulo(v, 'Produtos', [['Produtos']], v === 'b' ? `${produtos.length} itens em ${categorias.length} linhas, com ingredientes e tabela nutricional de cada um.` : '')}
<section class="sec sec-catalogo"><div class="in">${v === 'a' ? filtros + busca : `<div class="cb-grade"><aside class="cb-lado">${busca}${filtros}</aside><div>`}${itens}<p class="cat-vazio" data-cat-vazio hidden>Nenhum produto encontrado com esse nome.</p>${v === 'b' ? '</div></div>' : ''}</div></section>`;
  return pagina(v, 'produtos', 'produtos/', 'Produtos · Cofril', `Linha completa Cofril: ${categorias.map(c => c.nome.toLowerCase()).join(', ')}.`, corpo);
}

function paginaReceitas(v) {
  const corpo = `${faixaTitulo(v, 'Receitas', [['Receitas']], v === 'b' ? 'Receitas com produtos Cofril, com ingredientes, modo de preparo e vídeo.' : '')}
<section class="sec"><div class="in"><div class="rec-grade">${receitas.map(r => cardReceita(v, r)).join('')}</div></div></section>`;
  return pagina(v, 'receitas', 'receitas/', 'Receitas · Cofril', 'Receitas com linguiça, bacon, pernil, copa lombo, mortadela e presunto Cofril, com vídeo.', corpo);
}

function paginaReceita(v, r) {
  const outras = receitas.filter(o => o.slug !== r.slug).slice(0, 3);
  const corpo = `${faixaTitulo(v, r.titulo, [['Receitas', 'receitas/'], [r.titulo]])}
<article class="sec rec-det"><div class="in">
  <div class="rec-det-foto">${img(`/assets/rec/${r.img}.webp`, r.titulo, 1400, 933, ' loading="eager"')}</div>
  <div class="rec-det-txt">${receitaCorpo(r)}</div>
  ${r.video ? `<div class="rec-det-video"><h2>Assista ao preparo</h2>${video(r.video, r.titulo)}</div>` : ''}
</div></article>
<section class="sec sec-cinza"><div class="in"><h2 class="sec-tit">Outras receitas</h2>${v === 'a' ? onda : ''}<div class="rec-grade rec-grade-3">${outras.map(o => cardReceita(v, o)).join('')}</div></div></section>`;
  return pagina(v, 'receita', `receitas/${r.slug}/`, `${r.titulo} · Receitas Cofril`, `Receita: ${r.titulo}. Ingredientes e modo de preparo.`, corpo);
}

function paginaNoticias(v) {
  const [n0, ...resto] = noticias;
  const corpo = `${faixaTitulo(v, 'Notícias', [['Notícias']], v === 'b' ? 'Prêmios, feiras e a vida da Cofril em Cachoeiro de Itapemirim.' : '')}
<section class="sec"><div class="in">
  <a class="not-destaque" href="/${v}/noticias/${n0.slug}/"><span class="not-foto">${img(`/assets/news/${n0.img}.webp`, n0.titulo, 1400, 933)}</span><span class="not-txt"><time datetime="${n0.data}">${dataLonga(n0.data)}</time><strong>${esc(n0.titulo)}</strong><span>${esc(n0.texto[0].slice(0, 220))}${n0.texto[0].length > 220 ? '…' : ''}</span></span></a>
  <ul class="not-lista">${resto.map(n => `<li><a href="/${v}/noticias/${n.slug}/"><span class="not-foto">${img(`/assets/news/${n.img}-p.webp`, n.titulo, 640, 427)}</span><time datetime="${n.data}">${dataBR(n.data)}</time><strong>${esc(n.titulo)}</strong></a></li>`).join('')}</ul>
</div></section>`;
  return pagina(v, 'noticias', 'noticias/', 'Notícias · Cofril', 'Prêmios, feiras e novidades da Cofril.', corpo);
}

function paginaNoticia(v, n) {
  const corpo = `${faixaTitulo(v, n.titulo, [['Notícias', 'noticias/'], [n.titulo]])}
<article class="sec not-det"><div class="in">
  <p class="not-data"><time datetime="${n.data}">${dataLonga(n.data)}</time></p>
  <div class="not-det-foto">${img(`/assets/news/${n.img}.webp`, n.titulo, 1400, 933, ' loading="eager"')}</div>
  <div class="not-det-txt">${n.texto.map((t, i) => `<p${i === 0 ? ' class="lead"' : ''}>${esc(t)}</p>`).join('')}</div>
  <p><a class="btn btn-l" href="/${v}/noticias/">${ic('esq')} Todas as notícias</a></p>
</div></article>`;
  return pagina(v, 'noticia', `noticias/${n.slug}/`, `${n.titulo} · Cofril`, n.texto[0].slice(0, 155), corpo);
}

function paginaContato(v) {
  const corpo = `${faixaTitulo(v, 'Contato', [['Contato']], v === 'b' ? 'Dúvidas, sugestões e críticas: sua opinião é de extrema importância.' : '')}
<section class="sec contato"><div class="in">
  <div class="contato-form"><p>Para que possamos atendê-los da melhor forma, deixe aqui todas as suas dúvidas, sugestões e críticas. Sua opinião é de extrema importância. Os dados assinalados com * são de preenchimento obrigatório.</p>${formContato()}</div>
  <aside class="contato-info">
    <p>${ic('pin')}<span>${E.rua}<br>${E.cep}<br>${E.cidade}</span></p>
    <p>${ic('tel')}<span><a href="tel:${E.foneHref}">${E.fone}</a> · ${E.ramalSac}<br><a href="tel:${E.celularHref}">${E.celular}</a></span></p>
    <p>${ic('mail')}<span><a href="mailto:${E.email}">${E.email}</a></span></p>
    <div class="contato-rh"><h2>Trabalhe na Cofril</h2><p>Envie seu currículo para <a href="mailto:${E.emailRh}">${E.emailRh}</a> ou entregue na portaria da Cofril Aeroporto ou da Cofril Atílio Vivácqua.</p></div>
    <iframe class="contato-mapa" title="Mapa: Cofril em Cachoeiro de Itapemirim" src="${E.mapa}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </aside>
</div></section>`;
  return pagina(v, 'contato', 'contato/', 'Contato · Cofril', `Fale com a Cofril: ${E.fone}, ${E.email}, ${E.rua}, ${E.cidade}.`, corpo);
}

function paginaRepresentantes(v) {
  const corpo = `${faixaTitulo(v, 'Representantes', [['Representantes']], v === 'b' ? `Representantes Cofril em ${representantes.length} localidades do Espírito Santo.` : '')}
<section class="sec"><div class="in">${blocoRepresentantes(v)}${v === 'b' ? `<div class="reps-az"><h2>Todas as localidades</h2><ul>${representantes.map(r => `<li><button type="button" data-rep-ir="${r.slug}">${esc(r.cidade)}</button></li>`).join('')}</ul></div>` : ''}</div></section>`;
  return pagina(v, 'representantes', 'representantes/', 'Representantes · Cofril', `Encontre o representante Cofril da sua cidade: ${representantes.length} localidades no Espírito Santo.`, corpo);
}

// ---------- versão A: Vitrine ----------
const bannersA = [
  ['banner-linguica', 'Linguiça para churrasco Cofril'],
  ['banner-bacon', 'Bacon em cubos Cofril'],
  ['banner-temperados', 'Cortes suínos temperados Cofril'],
  ['banner-mortadela', 'Mortadela defumada Cofril'],
  ['banner-churrasco', 'Churrasco é com Cofril'],
];

function homeA() {
  const v = 'a';
  return pagina(v, 'index', '', 'Cofril · Paixão pelo seu sabor', 'Cofril, de Cachoeiro de Itapemirim (ES): linguiças, presuntaria, mortadelas, bacon e cortes suínos desde 1987.', `
<section class="hero-a" data-slider aria-roledescription="carrossel" aria-label="Campanhas Cofril">
  <h1 class="sr">Cofril, paixão pelo seu sabor</h1>
  <div class="slides">${bannersA.map(([f, alt], i) => `<figure class="slide${i === 0 ? ' on' : ''}" aria-hidden="${i ? 'true' : 'false'}"><img src="/assets/img/${f}.webp" alt="${esc(alt)}" width="2400" height="913"${i ? ' loading="lazy"' : ' fetchpriority="high"'}></figure>`).join('')}</div>
  <button class="sl-seta sl-esq" type="button" data-sl="-1" aria-label="Campanha anterior">${ic('esq')}</button><button class="sl-seta sl-dir" type="button" data-sl="1" aria-label="Próxima campanha">${ic('dir')}</button>
  <div class="sl-pontos">${bannersA.map((b, i) => `<button type="button" data-sl-ir="${i}" aria-label="Campanha ${i + 1}"${i === 0 ? ' aria-current="true"' : ''}></button>`).join('')}</div>
</section>

<section class="sec-prod-a"><div class="in">
  <figure class="pol pol-esq">${img('/assets/img/foto-costela.webp', 'Costela suína temperada Cofril', 1600, 1107)}</figure>
  <figure class="pol pol-dir">${img('/assets/img/foto-churrasco.webp', 'Linguiça para churrasco Cofril na tábua', 1800, 856)}</figure>
  <h2 class="sec-tit">Produtos</h2>${onda}
  <p class="sec-sub">Mais de 120 itens derivados de carne suína, em ${categorias.length} linhas.</p>
  <ul class="cats">${categorias.map(c => `<li><a href="/a/produtos/?linha=${c.slug}"><span class="cat-circ">${iconeCat(c.slug)}</span><span>${c.nome}</span></a></li>`).join('')}</ul>
  <div class="destaques">${prateleira(v, listaDestaques)}</div>
  <p class="centro"><a class="btn btn-b" href="/a/produtos/">Ver todos os produtos ${ic('seta')}</a></p>
</div></section>

<section class="sec-calc-a"><div class="in">
  <div class="calc-tit"><h2>Quantos convidados?</h2><p>Indique a quantidade de pessoas que irão ao seu churrasco e veja quanto comprar.</p></div>
  ${calculadora(v)}
</div></section>

<section class="sec sec-reps-a"><div class="in">
  <h2 class="sec-tit">Encontre um representante</h2>${onda}
  ${blocoRepresentantes(v, true)}
</div></section>

<section class="sec sec-premios-a"><div class="in">
  <div class="pa-txt"><p class="eyebrow">${ic('trofeu')} Reconhecimento</p><h2>A marca de embutidos mais lembrada pelos capixabas.</h2><p>Primeiro lugar no Recall de Marcas, no Marcas Ícones, no Marcas de Valor e no Prêmio Gazeta Empresarial.</p><a class="btn btn-b" href="/a/noticias/">Ver notícias ${ic('seta')}</a></div>
  <ol class="pa-lista">${premios.slice(0, 6).map(p => `<li><b>${p.ano}</b><span>${esc(p.nome)}</span><em>${esc(p.o)}</em></li>`).join('')}</ol>
</div></section>

<section class="sec sec-cinza"><div class="in">
  <h2 class="sec-tit">Receitas</h2>${onda}
  <div class="rec-grade rec-grade-3">${receitas.slice(0, 3).map(r => cardReceita(v, r)).join('')}</div>
  <p class="centro"><a class="btn btn-l" href="/a/receitas/">Todas as receitas ${ic('seta')}</a></p>
</div></section>`);
}

function empresaA() {
  const v = 'a';
  return pagina(v, 'empresa', 'empresa/', 'A Empresa · Cofril', 'Cofril: desde 1987 em Cachoeiro de Itapemirim (ES). 1.400 colaboradores, 2.400 toneladas por mês e mais de 120 itens.', `${faixaTitulo(v, 'A Empresa', [['A Empresa']])}
<section class="sec emp-a"><div class="in">
  <div class="emp-txt"><h2>Cofril: 38 anos de uma história bem contada</h2>${historia.map(p => `<p>${p}</p>`).join('')}</div>
  <div class="emp-fotos"><figure class="pol">${img('/assets/img/polaroides.webp', 'Fábrica, caminhão, produção e produtos Cofril', 600, 842)}</figure>${video(E.video, 'Vídeo institucional Cofril')}</div>
</div></section>
<section class="faixa-num"><div class="in">${numeros.map(n => `<p><b>${n.mais ? '+' : ''}${n.n}${n.u ? `<small> ${n.u}</small>` : ''}</b><span>${n.t}</span></p>`).join('')}</div></section>
<section class="sec mvv"><div class="in">
  <div class="mvv-i"><h2>Missão</h2><p>${missao}</p></div>
  <div class="mvv-i"><h2>Visão</h2><p>${visao}</p></div>
  <div class="mvv-i mvv-val"><h2>Valores</h2><ul>${valores.map(x => `<li>${x}</li>`).join('')}</ul></div>
</div></section>
<section class="sec sec-cinza qual-a"><div class="in">
  <div><img src="/assets/img/qualidade.webp" alt="" width="210" height="277" loading="lazy"><h2 class="sec-tit">Qualidade</h2>${onda}${qualidade.map(p => `<p>${p}</p>`).join('')}</div>
  <div><span class="qual-ic">${ic('folha')}</span><h2 class="sec-tit">Responsabilidade</h2>${onda}<p>${sustentabilidade.intro}</p><ul class="sust">${sustentabilidade.itens.map((s, i) => `<li>${ic(['reciclar', 'folha', 'gente'][i])}<span><b>${s.t}</b>${s.d}</span></li>`).join('')}</ul></div>
</div></section>`);
}

// ---------- versão B: Desde 1987 ----------
function homeB() {
  const v = 'b';
  const linhasB = categorias.map(c => ({ ...c, itens: produtos.filter(p => p.cat === c.slug) }));
  return pagina(v, 'index', '', 'Cofril · Desde 1987, paixão pelo seu sabor', 'Frigorífico Cofril, Cachoeiro de Itapemirim (ES): três unidades, 2.400 toneladas por mês e mais de 120 derivados de carne suína.', `
<section class="hero-b"><div class="in">
  <div class="hb-txt">
    <p class="eyebrow">Cachoeiro de Itapemirim · Espírito Santo</p>
    <h1>Paixão pelo seu sabor, desde 1987.</h1>
    <p class="hb-sub">Começou com 300 kg de linguiça por semana. Hoje são três unidades produtivas, mais de 1.400 colaboradores e mais de 120 derivados de carne suína na mesa dos capixabas.</p>
    <p class="hb-acoes"><a class="btn" href="/b/produtos/">Conheça os produtos ${ic('seta')}</a><a class="btn btn-l" href="/b/representantes/">Encontre um representante</a></p>
  </div>
  <figure class="hb-foto">${img('/assets/img/fabrica-aerea.webp', 'Vista aérea da unidade da Cofril em Atílio Vivácqua', 2200, 1571, ' loading="eager" fetchpriority="high"')}<figcaption>Unidade Atílio Vivácqua (ABAV)</figcaption></figure>
</div>
<div class="in"><ul class="hb-num">${numeros.map(n => `<li><b>${n.mais ? '+' : ''}${n.n}${n.u ? `<small>${n.u}</small>` : ''}</b><span>${n.t}</span></li>`).join('')}</ul></div></section>

<section class="sec sec-etapas"><div class="in">
  <div class="et-cab"><p class="eyebrow">Da granja à mesa</p><h2>O processo inteiro passa pela Cofril.</h2></div>
  <ol class="etapas">${etapas.map((e, i) => `<li><span class="et-n">0${i + 1}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>
</div></section>

<section class="sec sec-linhas"><div class="in">
  <div class="sec-cab"><div><p class="eyebrow">Linhas de produto</p><h2>${produtos.length} itens, com ficha de cada um.</h2></div><a class="btn btn-l" href="/b/produtos/">Catálogo completo ${ic('seta')}</a></div>
  <ul class="linhas-b">${linhasB.map(c => `<li><a href="/b/produtos/?linha=${c.slug}"><span class="lb-nome">${c.nome}</span><span class="lb-qtd">${c.itens.length} itens</span><span class="lb-fotos">${c.itens.filter(p => p.img).slice(0, 3).map(p => fotoProd(p)).join('')}</span>${ic('seta')}</a></li>`).join('')}</ul>
</div></section>

<section class="sec-churras-b"><div class="in">
  <div class="cb-txt"><p class="eyebrow">Linguiça para churrasco</p><h2>Líder na preferência dos consumidores.</h2><p>Quantos convidados? Indique a quantidade de pessoas e veja quanto comprar.</p></div>
  ${calculadora(v)}
</div></section>

<section class="sec sec-premios-b"><div class="in">
  <div class="sec-cab"><div><p class="eyebrow">Quadro de reconhecimentos</p><h2>Primeiro lugar, ano após ano.</h2></div><a class="btn btn-l" href="/b/noticias/">Todas as notícias ${ic('seta')}</a></div>
  <table class="premios"><thead><tr><th scope="col">Ano</th><th scope="col">Prêmio</th><th scope="col">Resultado</th></tr></thead><tbody>${premios.map(p => `<tr><td>${p.ano}</td><th scope="row">${esc(p.nome)}</th><td>${esc(p.o)}</td></tr>`).join('')}</tbody></table>
</div></section>

<section class="sec sec-rec-b"><div class="in">
  <div class="sec-cab"><div><p class="eyebrow">Receitas</p><h2>Para fazer em casa.</h2></div><a class="btn btn-l" href="/b/receitas/">Todas as receitas ${ic('seta')}</a></div>
  <div class="rec-b">${cardReceita(v, receitas[0], 'rec-card rec-grande')}<div class="rec-b-lista">${receitas.slice(1, 5).map(r => cardReceita(v, r, 'rec-card rec-linha')).join('')}</div></div>
</div></section>

<section class="sec-rep-b"><div class="in">
  <div><p class="eyebrow">Representantes</p><h2>Cofril em ${representantes.length} localidades do Espírito Santo.</h2></div>
  <form class="rep-rapido" action="/b/representantes/"><label for="rep-rap">Sua cidade</label><select id="rep-rap" name="cidade">${representantes.map(r => `<option value="${r.slug}">${esc(r.cidade)}</option>`).join('')}</select><button class="btn" type="submit">Ver representante ${ic('seta')}</button></form>
</div></section>`);
}

function empresaB() {
  const v = 'b';
  return pagina(v, 'empresa', 'empresa/', 'A Empresa · Cofril', 'Cofril: desde 1987 em Cachoeiro de Itapemirim (ES). Granjas próprias, abate, três unidades produtivas e mais de 120 itens.', `${faixaTitulo(v, 'A Empresa', [['A Empresa']], 'Cofril: 38 anos de uma história bem contada.')}
<section class="sec emp-b"><div class="in">
  <ol class="linha-tempo">
    <li><b>1987</b><p>Os irmãos José Carlos, Antonio Cezar e Elson Correa começam a atuar no ramo de suínos, inspirados no negócio iniciado pelo pai: 300 kg de linguiça artesanal por semana.</p></li>
    <li><b>Crescimento</b><p>Com o aumento das vendas, vêm a nova fábrica, novos equipamentos e novos colaboradores.</p></li>
    <li><b>Hoje</b><p>Três unidades produtivas em Cachoeiro de Itapemirim e Atílio Vivácqua, 2.400 toneladas por mês, 18 mil animais abatidos por mês e granjas próprias em Muqui e Vargem Alta.</p></li>
  </ol>
  <div class="emp-txt">${historia.map(p => `<p>${p}</p>`).join('')}</div>
</div></section>
<section class="emp-escala"><div class="in">
  <h2>De 300 kg por semana a 2.400 toneladas por mês.</h2>
  <div class="escala"><div class="esc-l"><span>1987</span><i style="--w:.4%"></i><b>1,3 t/mês</b></div><div class="esc-l"><span>Hoje</span><i style="--w:100%"></i><b>2.400 t/mês</b></div></div>
  <p class="nota">300 kg por semana dá cerca de 1,3 tonelada por mês: a produção de hoje é mais de 1.800 vezes maior.</p>
</div></section>
<section class="sec emp-video"><div class="in"><div><p class="eyebrow">Vídeo institucional</p><h2>Conheça a Cofril por dentro.</h2></div>${video(E.video, 'Vídeo institucional Cofril')}</div></section>
<section class="sec mvv mvv-b"><div class="in">
  <div class="mvv-i"><h2>Missão</h2><p>${missao}</p></div>
  <div class="mvv-i"><h2>Visão</h2><p>${visao}</p></div>
  <div class="mvv-i mvv-val"><h2>Valores</h2><ul>${valores.map(x => `<li>${x}</li>`).join('')}</ul></div>
</div></section>
<section class="sec qual-b"><div class="in">
  <div><p class="eyebrow">Qualidade</p><h2>Cuidando também do que você não vê.</h2>${qualidade.map(p => `<p>${p}</p>`).join('')}</div>
  <div><p class="eyebrow">Responsabilidade</p><h2>Ecologicamente correta, socialmente justa.</h2><p>${sustentabilidade.intro}</p><ol class="sust-b">${sustentabilidade.itens.map(s => `<li><b>${s.t}</b><span>${s.d}</span></li>`).join('')}</ol></div>
</div></section>`);
}

export function gerarVersao(v) {
  const out = {};
  out.index = v === 'a' ? homeA() : homeB();
  out.empresa = v === 'a' ? empresaA() : empresaB();
  out.produtos = paginaProdutos(v);
  out.receitas = paginaReceitas(v);
  out.noticias = paginaNoticias(v);
  out.representantes = paginaRepresentantes(v);
  out.contato = paginaContato(v);
  for (const p of produtos) out[`produtos/${p.slug}`] = paginaProduto(v, p);
  for (const r of receitas) out[`receitas/${r.slug}`] = paginaReceita(v, r);
  for (const n of noticias) out[`noticias/${n.slug}`] = paginaNoticia(v, n);
  return out;
}
