// Monta as páginas das versões A ("Balcão": segue o site atual, cabeçalho com as duas lojas, menu cinza, faixa preta e laranja
// sobre os banners, quem somos no painel cinza e as três linhas com "Veja aqui") e B ("Bitola": ferramenta de venda,
// busca no topo, régua de bitolas, escolha por pressão e por aplicação). Estilos em public/assets/{base,a,b}.css.
import { empresa as E, textos as T, linhas, familias, servicos, bitolas, pressoes, pontas } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const img = (src, alt, w, h, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const [POA, GBA] = E.unidades;

export const nomesVersao = { a: 'Balcão', b: 'Bitola' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'quem-somos', nome: 'Quem somos', caminho: 'quem-somos/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'onde-estamos', nome: 'Onde estamos', caminho: 'onde-estamos/' },
];
const extras = [
  ...linhas.map(l => ({ slug: l.id, nome: `Linha ${l.nome.toLowerCase()}`, caminho: `${l.id}/` })),
  { slug: 'orcamento', nome: 'Orçamento', caminho: 'orcamento/' },
];
const todas = [...nav, ...extras];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  busca: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  comodato: '<path d="M4 9h13l-3-3M20 15H7l3 3"/>',
  entrega: '<path d="M2 6h11v10H2zM13 10h4l3 3v3h-7z"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/>',
  equipe: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14c2.8 0 5 2 5 5"/>',
  estoque: '<path d="M3 8l9-4 9 4-9 4z"/><path d="M3 8v8l9 4 9-4V8M12 12v8"/>',
  treinamentos: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20l4-4 4 4M7 9h6M7 12h9"/>',
  vistoria: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 12l2 2 4-4M9 17h6"/>',
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
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#FBA832">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual || (n.slug === 'produtos' && linhas.some(l => l.id === atual)) ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const logo = (v, branco = false, h = 64) => `<a class="marca" href="/${v}/" aria-label="${E.nome}, página inicial"><img src="/assets/logo${branco ? '-branco' : ''}.svg" alt="${E.nome}" width="${Math.round(h * 1.11)}" height="${h}"></a>`;
const btnOrc = v => `<a class="btn-orc" href="/${v}/orcamento/">${ic('lista')}<span>Orçamento</span><b data-orc-n>0</b></a>`;

function topoA(atual) {
  return `<header class="topo topo-a">
<div class="in topo-linha">
  ${logo('a')}
  <p class="selo-anos"><b>Mais de 10 anos</b> fazendo melhor</p>
  <div class="topo-fones">
    ${E.unidades.map(u => `<a href="tel:${u.telHref}"><small>${u.cidade}</small><span><i>51</i> ${u.tel.slice(5)}</span></a>`).join('')}
  </div>
  <button class="menu-btn" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu">${ic('menu')}</button>
</div>
<nav class="nav-a" aria-label="Principal"><div class="in"><div class="menu" id="menu">${menu('a', atual)}</div>${btnOrc('a')}</div></nav>
</header>`;
}

function topoB(atual) {
  return `<header class="topo topo-b"><div class="in">
${logo('b', false, 52)}
<nav class="menu" id="menu" aria-label="Principal">${menu('b', atual)}</nav>
<a class="busca-ic" href="/b/produtos/#busca" aria-label="Buscar produto">${ic('busca')}</a>
${btnOrc('b')}
<button class="menu-btn" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu">${ic('menu')}</button>
</div></header>`;
}

const unidadeBloco = (u, comMapa = false) => `<div class="unidade">
  <p class="un-tag">${u.nome}</p>
  <h3>${u.cidade}</h3>
  <p class="rod-l">${ic('pin')}<span>${u.endereco}<br>${u.bairro} · ${u.cidade} - RS<br>CEP ${u.cep}</span></p>
  <p class="rod-l">${ic('tel')}<a href="tel:${u.telHref}">${u.tel}</a></p>
  <p class="rod-l">${ic('mail')}<a href="mailto:${u.email}">${u.email}</a></p>
  ${comMapa ? `<div class="mapa"><iframe title="Mapa: ${E.nome} ${u.cidade}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${u.mapa}&output=embed"></iframe></div>` : ''}
</div>`;

function rodape(v) {
  const links = todas.filter(n => n.slug !== 'index').map(n => `<li><a href="/${v}/${n.caminho}">${n.nome}</a></li>`).join('');
  return `<footer class="rodape">
<div class="in rod-grade">
  <div class="rod-marca">${logo(v, true, 70)}<p>${E.razao}.</p><p class="rod-selo">${E.selo}</p></div>
  ${E.unidades.map(u => unidadeBloco(u)).join('')}
  <div><h3>Páginas</h3><ul class="rod-links">${links}</ul></div>
</div>
<div class="in rod-base"><span>© ${new Date().getFullYear()} ${E.razao}</span><span>Porto Alegre e Guaíba · RS</span></div>
</footer>`;
}

function pagina(v, slugAtual, titulo, descricao, corpo) {
  const n = todas.find(x => x.slug === slugAtual);
  const t = slugAtual === 'index' ? `${E.nome} | Mangueiras, conexões hidráulicas e pneumáticas em Porto Alegre e Guaíba` : `${titulo} | ${E.nome}`;
  return `${head(v, n.caminho, t, descricao)}
<body class="v-${v} p-${slugAtual}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${v === 'a' ? topoA(slugAtual) : topoB(slugAtual)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
<div class="aviso-orc" role="status" aria-live="polite" hidden></div>
</body>
</html>
`;
}

// ---------- catálogo ----------
const idItem = (f, nome) => `${f.id}--${slug(nome)}`;
const btnAdd = (f, [nome]) => `<button class="add" type="button" data-add="${idItem(f, nome)}" data-nome="${esc(nome)}" data-linha="${esc(linhas.find(l => l.id === f.linha).nome)}">${ic('mais')}<span>Orçamento</span></button>`;

function familia(f, v) {
  const ln = linhas.find(l => l.id === f.linha);
  const grade = f.itens.length > 8;
  return `<section class="familia" id="${f.id}" data-linha="${f.linha}">
  <div class="fam-cab">
    <figure class="fam-foto">${img(f.foto, f.nome, 640, 420)}</figure>
    <div class="fam-txt"><p class="fam-linha">Linha ${ln.nome.toLowerCase()}</p><h3>${f.nome}</h3><p>${f.texto}</p><p class="fam-n">${f.itens.length} ${f.itens.length > 1 ? 'itens' : 'item'}</p></div>
  </div>
  <ul class="itens${grade ? ' itens-grade' : ''}">
  ${f.itens.map(it => `<li class="item" data-busca="${esc((it[0] + ' ' + it[2] + ' ' + f.nome + ' ' + ln.nome).toLowerCase())}"><div class="it-txt"><b>${it[0]}</b>${it[1] ? `<span>${it[1]}</span>` : ''}</div>${btnAdd(f, it)}</li>`).join('\n  ')}
  </ul>
</section>`;
}

function catalogo(v, filtroLinha) {
  const fams = filtroLinha ? familias.filter(f => f.linha === filtroLinha) : familias;
  const total = fams.reduce((s, f) => s + f.itens.length, 0);
  return `<div class="catalogo" data-catalogo>
  <div class="cat-barra">
    <label class="cat-busca">${ic('busca')}<span class="sr">Buscar no catálogo</span><input id="busca" type="search" placeholder="Busque por produto ou aplicação: vapor, GLP, jateamento, camlock…" autocomplete="off" data-busca></label>
    ${filtroLinha ? '' : `<div class="cat-filtros" role="group" aria-label="Filtrar por linha"><button type="button" aria-pressed="true" data-filtro="">Todas</button>${linhas.map(l => `<button type="button" aria-pressed="false" data-filtro="${l.id}">${l.nome}</button>`).join('')}</div>`}
    <p class="cat-conta"><b data-conta>${total}</b> itens</p>
  </div>
  ${fams.map(f => familia(f, v)).join('\n')}
  <p class="cat-vazio" hidden>Nada encontrado com esse termo. <a href="/${v}/orcamento/">Descreva o que você precisa</a> que a equipe procura para você.</p>
</div>`;
}

// ---------- pedido de orçamento ----------
const opcoes = l => l.map(o => `<option>${o}</option>`).join('');
const montador = `<form class="montador" data-montador>
  <fieldset class="m-passo"><legend><i>1</i> Linha</legend>
    <div class="m-chips">${linhas.map((l, k) => `<label><input type="radio" name="linha" value="${l.nome}"${k ? '' : ' checked'}><span>${l.nome}</span></label>`).join('')}</div>
  </fieldset>
  <fieldset class="m-passo"><legend><i>2</i> Bitola e pressão</legend>
    <div class="m-duas"><div class="campo"><label for="m-bit">Bitola</label><select id="m-bit" name="bitola">${opcoes(['Não sei', ...bitolas])}</select></div>
    <div class="campo"><label for="m-pre">Pressão de trabalho</label><select id="m-pre" name="pressao">${opcoes(pressoes)}</select></div></div>
  </fieldset>
  <fieldset class="m-passo"><legend><i>3</i> Pontas</legend>
    <div class="m-duas"><div class="campo"><label for="m-p1">Ponta 1</label><select id="m-p1" name="ponta1">${opcoes(pontas)}</select></div>
    <div class="campo"><label for="m-p2">Ponta 2</label><select id="m-p2" name="ponta2">${opcoes(pontas)}</select></div></div>
  </fieldset>
  <fieldset class="m-passo"><legend><i>4</i> Medida e quantidade</legend>
    <div class="m-duas"><div class="campo"><label for="m-comp">Comprimento (cm)</label><input id="m-comp" name="comprimento" type="number" min="1" inputmode="numeric" placeholder="ex.: 120"></div>
    <div class="campo"><label for="m-qtd">Quantidade</label><input id="m-qtd" name="qtd" type="number" min="1" value="1" inputmode="numeric"></div></div>
    <div class="campo"><label for="m-apl">Aplicação ou máquina (opcional)</label><input id="m-apl" name="aplicacao" placeholder="ex.: retroescavadeira, linha de vapor da caldeira"></div>
  </fieldset>
  <button class="btn" type="submit">${ic('mais')} Adicionar ao orçamento</button>
</form>`;

const pedido = v => `<div class="pedido" data-pedido>
  <div class="ped-lista">
    <h2>Sua lista</h2>
    <ol class="lista-orc" data-lista></ol>
    <p class="lista-vazia" data-vazia>A lista está vazia. Adicione itens pelo <a href="/${v}/produtos/">catálogo</a> ou monte a mangueira ao lado.</p>
  </div>
  <form class="form" data-enviar>
    <h2>Enviar pedido</h2>
    <div class="campo"><label for="f-nome">Nome</label><input id="f-nome" name="nome" required autocomplete="name"></div>
    <div class="campo"><label for="f-empresa">Empresa</label><input id="f-empresa" name="empresa" autocomplete="organization"></div>
    <div class="campo"><label for="f-tel">Telefone</label><input id="f-tel" name="telefone" type="tel" required autocomplete="tel"></div>
    <div class="campo"><label for="f-email">E-mail</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
    <fieldset class="campo campo-l f-unid"><legend>Atendimento pela loja de</legend>
      ${E.unidades.map((u, k) => `<label><input type="radio" name="loja" value="${u.id}" data-email="${u.email}"${k ? '' : ' checked'}><span><b>${u.cidade}</b> ${u.tel}</span></label>`).join('')}
    </fieldset>
    <div class="campo campo-l"><label for="f-msg">Observações</label><textarea id="f-msg" name="mensagem" rows="3" placeholder="Prazo, retirada na loja ou entrega, CNPJ para faturamento…"></textarea></div>
    <button class="btn" type="submit">${ic('mail')} Enviar pedido por e-mail</button>
    <p class="form-nota">Abre o seu e-mail com a lista pronta para a loja escolhida. Prefere falar? ${E.unidades.map(u => `<a href="tel:${u.telHref}">${u.cidade} ${u.tel}</a>`).join(' · ')}</p>
  </form>
</div>`;

// ---------- blocos de conteúdo ----------
const faixaTitulo = (tag = 'h1') => `<${tag} class="faixa-tit"><span>${T.faixa[0]}</span> <em>${T.faixa[1]}</em></${tag}>`;
const mvv = `<div class="mvv">
  <div><h3>Missão</h3><p>${T.missao}</p></div>
  <div><h3>Visão</h3><p>${T.visao}</p></div>
  <div><h3>Valores</h3><ul>${T.valores.map(x => `<li>${x.replace(/;$/, '')}</li>`).join('')}</ul></div>
</div>`;

const servicosLista = cls => `<ul class="${cls}">${servicos.map(([k, n, t]) => `<li><span class="sv-ic">${ic(k)}</span><h3>${n}</h3><p>${t}</p></li>`).join('')}</ul>`;

// Régua com o diâmetro real (proporcional) de cada bitola.
function regua() {
  const val = b => b.replace('"', '').split('.').reduce((s, p) => s + (p.includes('/') ? p.split('/')[0] / p.split('/')[1] : +p), 0);
  const esc_ = 34; // px por polegada
  let x = 6; const g = [];
  for (const b of bitolas) {
    const d = Math.max(6, val(b) * esc_), r = d / 2;
    const slot = Math.max(d, 44), cx = x + slot / 2;
    g.push(`<g class="rg" style="--i:${g.length}"><circle cx="${cx.toFixed(1)}" cy="${(110 - r).toFixed(1)}" r="${r.toFixed(1)}"/><circle class="rg-in" cx="${cx.toFixed(1)}" cy="${(110 - r).toFixed(1)}" r="${(r * .62).toFixed(1)}"/><text x="${cx.toFixed(1)}" y="136">${b}</text></g>`);
    x += slot + 10;
  }
  return `<svg class="regua" viewBox="0 0 ${Math.ceil(x)} 146" role="img" aria-label="Bitolas de 3/16 até 3 polegadas, em escala">${g.join('')}<line x1="0" x2="${Math.ceil(x)}" y1="112" y2="112"/></svg>`;
}

// Manômetro com as cinco faixas de pressão do site atual.
function manometro() {
  const fx = ['Baixa', 'Média', 'Alta', 'Super', 'Extrema'];
  const cx = 160, cy = 160, r = 128;
  const pt = (a, rr = r) => [cx + rr * Math.cos(a), cy + rr * Math.sin(a)].map(n => n.toFixed(1));
  const arcs = fx.map((f, k) => {
    const a0 = Math.PI + k * Math.PI / 5 + .02, a1 = Math.PI + (k + 1) * Math.PI / 5 - .02, am = (a0 + a1) / 2;
    const [x0, y0] = pt(a0), [x1, y1] = pt(a1), [tx, ty] = pt(am, r - 40);
    return `<path class="mn-fx mn-${k}" d="M${x0},${y0} A${r},${r} 0 0 1 ${x1},${y1}"/><text x="${tx}" y="${ty}">${f}</text>`;
  }).join('');
  return `<svg class="manometro" viewBox="-10 0 340 200" role="img" aria-label="Faixas de pressão: baixa, média, alta, super e extrema alta, de 100 a 10.000 psi">${arcs}
<g class="mn-ponteiro"><path d="M${cx},${cy - 6} L${cx + 112},${cy} L${cx},${cy + 6}z"/><circle cx="${cx}" cy="${cy}" r="12"/></g>
<text class="mn-lim" x="22" y="188">100 psi</text><text class="mn-lim" x="298" y="188" text-anchor="end">10.000 psi</text></svg>`;
}

// ---------- páginas ----------
function paginasA() {
  const v = 'a', P = {};
  const banners = `<div class="banners" data-banners aria-roledescription="carrossel" aria-label="Produtos Hidraucon">
    ${[1, 2, 3, 4, 5, 6].map(i => `<figure${i === 1 ? ' class="ativo"' : ''}>${img('banner-' + i, ['Mangueiras industriais coloridas', 'Mangueiras hidráulicas com terminais', 'Tubos pneumáticos espirais', 'Mangueiras de jardim e conectores', 'Terminais e conexões instantâneas', 'Tubos de cobre'][i - 1], 1400, 556, i === 1 ? ' loading="eager" fetchpriority="high"' : '')}</figure>`).join('')}
    <div class="ban-pontos">${[1, 2, 3, 4, 5, 6].map(i => `<button type="button" aria-label="Banner ${i}"${i === 1 ? ' aria-current="true"' : ''}></button>`).join('')}</div>
  </div>`;
  const tresLinhas = `<div class="tres-linhas">${linhas.map(l => `<article class="linha-col">
    <h3>${l.nome}</h3>
    <a class="linha-foto" href="/a/${l.id}/">${img(l.foto, 'Linha ' + l.nome.toLowerCase(), 506, 708)}</a>
    <p>${l.curto}</p>
    <a class="veja" href="/a/${l.id}/">Veja aqui ${ic('seta')}</a>
  </article>`).join('')}</div>`;

  P.index = pagina(v, 'index', '', 'Hidraucon: mangueiras e conexões hidráulicas, industriais e pneumáticas em Porto Alegre (Navegantes) e Guaíba. Monte seu pedido de orçamento pelo site.', `
<section class="abre"><div class="in">${faixaTitulo()}${banners}</div></section>
<section class="sec-a"><div class="in">
  <div class="painel">
    <h2 class="tit-sombra">Quem somos</h2>
    <div class="quem-grade"><div class="quem-txt">${T.quem.map(p => `<p>${p}</p>`).join('')}</div>${mvv}</div>
  </div>
</div></section>
<section class="sec-a sec-linhas"><div class="in">${tresLinhas}</div></section>
<section class="faixa-pedido"><div class="in fp-in">
  <div><h2>Precisa de uma mangueira montada?</h2><p>Diga a bitola, a pressão, as pontas e o comprimento. A equipe confere a especificação e responde com o orçamento.</p></div>
  <a class="btn btn-escuro" href="/a/orcamento/">Montar meu pedido ${ic('seta')}</a>
</div></section>
<section class="sec-a"><div class="in">
  <div class="painel painel-serv">
    <h2 class="tit-sombra">Serviços</h2>
    ${servicosLista('serv-a')}
  </div>
</div></section>
<section class="sec-a sec-lojas"><div class="in">
  <h2 class="tit-sombra">Onde estamos</h2>
  <div class="lojas-a">${E.unidades.map(u => unidadeBloco(u, true)).join('')}</div>
</div></section>`);

  P['quem-somos'] = pagina(v, 'quem-somos', 'Quem somos', 'Quem é a Hidraucon: missão, visão e valores da distribuidora de mangueiras e conexões de Porto Alegre e Guaíba.', `
<section class="cab-a"><div class="in">${faixaTitulo('p')}<h1 class="tit-sombra">Quem somos</h1></div></section>
<section class="sec-a"><div class="in">
  <div class="painel"><div class="quem-grade"><div class="quem-txt lead">${T.quem.map(p => `<p>${p}</p>`).join('')}</div>${mvv}</div></div>
</div></section>
<section class="sec-a sec-linhas"><div class="in"><h2 class="tit-sombra">Nossas linhas</h2>${tresLinhas}</div></section>`);

  P.produtos = pagina(v, 'produtos', 'Produtos', 'Catálogo Hidraucon: mangueiras hidráulicas, industriais e pneumáticas, terminais, adaptadores, engates rápidos, tubos e válvulas.', `
<section class="cab-a"><div class="in">${faixaTitulo('p')}<h1 class="tit-sombra">Produtos</h1>
  <div class="linhas-mini">${linhas.map(l => `<a href="/a/${l.id}/"><b>Linha ${l.nome.toLowerCase()}</b><span>${l.intro}</span></a>`).join('')}</div>
</div></section>
<section class="sec-a"><div class="in">${catalogo(v)}</div></section>`);

  for (const l of linhas) {
    P[l.id] = pagina(v, l.id, `Linha ${l.nome.toLowerCase()}`, `${l.intro} Hidraucon, Porto Alegre e Guaíba.`, `
<section class="cab-a"><div class="in">${faixaTitulo('p')}<h1 class="tit-sombra">${l.nome}</h1></div></section>
<section class="sec-a"><div class="in">
  <div class="painel linha-intro">
    <figure>${img(l.foto, 'Linha ' + l.nome.toLowerCase(), 506, 708)}</figure>
    <div><p class="lead">${l.intro}</p><p>${l.curto}</p>
      <dl class="dados">${l.dados.map(([n, r]) => `<div><dt>${r}</dt><dd>${n}</dd></div>`).join('')}</dl>
      <div class="acoes"><a class="btn" href="/a/orcamento/">Montar meu pedido ${ic('seta')}</a><a class="btn btn-linha" href="tel:${POA.telHref}">${ic('tel')} ${POA.tel}</a></div>
    </div>
  </div>
  ${catalogo(v, l.id)}
</div></section>`);
  }

  P.servicos = pagina(v, 'servicos', 'Serviços', 'Serviços Hidraucon: comodato, entrega, equipe técnica, estoque, treinamentos e vistoria de mangueiras.', `
<section class="cab-a"><div class="in">${faixaTitulo('p')}<h1 class="tit-sombra">Serviços</h1></div></section>
<section class="sec-a"><div class="in"><div class="painel painel-serv">${servicosLista('serv-a serv-a-grande')}</div></div></section>
<section class="sec-a sec-linhas"><div class="in"><h2 class="tit-sombra">Nossas linhas</h2>${tresLinhas}</div></section>`);

  P.orcamento = pagina(v, 'orcamento', 'Orçamento', 'Monte seu pedido de orçamento de mangueiras e conexões na Hidraucon: escolha a bitola, a pressão, as pontas e o comprimento.', `
<section class="cab-a"><div class="in">${faixaTitulo('p')}<h1 class="tit-sombra">Orçamento</h1><p class="lead cab-lead">Monte a mangueira ou adicione itens do catálogo. No fim, a lista vai por e-mail para a loja que você escolher.</p></div></section>
<section class="sec-a"><div class="in">
  <div class="painel"><h2>Monte a mangueira</h2>${montador}</div>
  ${pedido(v)}
</div></section>`);

  P['onde-estamos'] = pagina(v, 'onde-estamos', 'Onde estamos', 'Hidraucon em Porto Alegre (Av. Sertório, 389, Navegantes) e Guaíba (Av. Castelo Branco, 3565). Telefones (51) 3026-0000 e (51) 3055-1111.', `
<section class="cab-a"><div class="in">${faixaTitulo('p')}<h1 class="tit-sombra">Onde estamos</h1></div></section>
<section class="sec-a sec-lojas"><div class="in"><div class="lojas-a">${E.unidades.map(u => unidadeBloco(u, true)).join('')}</div></div></section>
<section class="sec-a"><div class="in"><div class="painel"><h2 class="tit-sombra">Fale conosco</h2>${pedido(v)}</div></div></section>`);
  return P;
}

function paginasB() {
  const v = 'b', P = {};
  const aplicacoes = familias.find(f => f.id === 'mangueiras-industriais').itens;
  const buscaHero = `<form class="hero-busca" action="/b/produtos/" role="search">
    <label for="hb">O que você precisa?</label>
    <div class="hb-campo">${ic('busca')}<input id="hb" name="busca" type="search" placeholder="Ex.: mangueira de vapor, engate camlock, tubo PU…"><button class="btn" type="submit">Buscar</button></div>
    <p class="hb-sug">Mais procurados: ${['Alta pressão', 'Vapor', 'Camlock', 'Tubo PU', 'Jateamento', 'GLP'].map(s => `<a href="/b/produtos/?busca=${encodeURIComponent(s.toLowerCase())}">${s}</a>`).join('')}</p>
  </form>`;
  const cabB = (tit, sub, extra = '') => `<section class="cab-b"><div class="in"><p class="eyebrow">${E.nome} · ${sub}</p><h1>${tit}</h1>${extra}</div></section>`;

  P.index = pagina(v, 'index', '', 'Hidraucon: busque mangueiras e conexões hidráulicas, industriais e pneumáticas e monte seu pedido de orçamento. Lojas em Porto Alegre e Guaíba.', `
<section class="hero-b"><div class="in hero-grade">
  <div class="hero-txt">
    <p class="eyebrow">${E.selo}</p>
    <h1>Mangueiras e conexões <em>hidráulicas e pneumáticas</em></h1>
    <p class="lead">Do terminal à mangueira de vapor, com estoque nas lojas de Porto Alegre e Guaíba. Busque o item ou monte o pedido e receba o orçamento.</p>
    ${buscaHero}
  </div>
  <figure class="hero-foto">${img('banner-1', 'Mangueiras industriais de várias bitolas e cores', 1400, 556, ' loading="eager" fetchpriority="high"')}</figure>
</div></section>
<section class="sec-b sec-regua"><div class="in">
  <div class="regua-cab"><div><p class="eyebrow">Linha hidráulica</p><h2>De 3/16" até 3"</h2></div><p>As treze bitolas, desenhadas em escala. Não sabe a sua? Traga a mangueira velha ou o terminal à loja que a equipe mede.</p></div>
  <div class="regua-rola">${regua()}</div>
</div></section>
<section class="sec-b"><div class="in">
  <div class="titulo-sec"><p class="eyebrow">Três linhas</p><h2>Escolha por onde começar</h2></div>
  <div class="linhas-b">${linhas.map((l, k) => `<a class="lb lb-${k}" href="/b/${l.id}/">
    <figure>${img(l.foto, 'Linha ' + l.nome.toLowerCase(), 506, 708)}</figure>
    <div><h3>${l.nome}</h3><p>${l.intro}</p><span class="lb-dado">${l.dados[0][0]} <small>${l.dados[0][1].toLowerCase()}</small></span><span class="link-seta">Ver a linha ${ic('seta')}</span></div>
  </a>`).join('')}</div>
</div></section>
<section class="sec-b sec-pressao"><div class="in duas duas-centro">
  <div>${manometro()}</div>
  <div><p class="eyebrow">Pela pressão</p><h2>Baixa, média, alta, super e extrema alta pressão</h2><p class="lead">Mangueiras hidráulicas de 100 a 10.000 psi. Diga a pressão de trabalho do equipamento e a equipe indica a construção certa.</p>
  <div class="acoes"><a class="btn" href="/b/hidraulica/">Ver mangueiras hidráulicas ${ic('seta')}</a></div></div>
</div></section>
<section class="sec-b sec-aplic"><div class="in">
  <div class="titulo-sec"><p class="eyebrow">Pela aplicação</p><h2>${aplicacoes.length} aplicações da linha industrial</h2></div>
  <ul class="aplic">${aplicacoes.map(a => `<li><a href="/b/produtos/?busca=${encodeURIComponent(a[0].toLowerCase().split(/[ ,/(]/)[0])}">${a[0]}</a></li>`).join('')}</ul>
</div></section>
<section class="sec-b sec-monte"><div class="in duas duas-centro">
  <div><p class="eyebrow">Pedido em 4 passos</p><h2>Monte a mangueira e mande para a loja</h2>
    <ol class="passos-b"><li><b>Linha</b> hidráulica, industrial ou pneumática</li><li><b>Bitola e pressão</b> de trabalho</li><li><b>As duas pontas</b> terminal, engate ou flange</li><li><b>Comprimento</b> e quantidade</li></ol>
    <div class="acoes"><a class="btn" href="/b/orcamento/">Montar meu pedido ${ic('seta')}</a></div></div>
  <div class="mangueira-desenho" aria-hidden="true">${desenhoMangueira()}</div>
</div></section>
<section class="sec-b sec-serv-b"><div class="in">
  <div class="titulo-sec"><p class="eyebrow">Além do balcão</p><h2>Serviços</h2></div>
  ${servicosLista('serv-b')}
</div></section>
<section class="sec-b"><div class="in">
  <div class="titulo-sec"><p class="eyebrow">Duas lojas</p><h2>Porto Alegre e Guaíba</h2></div>
  <div class="lojas-b">${E.unidades.map(u => unidadeBloco(u, true)).join('')}</div>
</div></section>`);

  P['quem-somos'] = pagina(v, 'quem-somos', 'Quem somos', 'Quem é a Hidraucon: missão, visão e valores da distribuidora de mangueiras e conexões de Porto Alegre e Guaíba.', `
${cabB('Quem somos', 'Empresa')}
<section class="sec-b"><div class="in duas">
  <div class="lead">${T.quem.map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="foto-b">${img('banner-2', 'Mangueiras hidráulicas com terminais', 1400, 556)}</figure>
</div></section>
<section class="sec-b sec-claro"><div class="in">${mvv}</div></section>`);

  P.produtos = pagina(v, 'produtos', 'Produtos', 'Catálogo Hidraucon com busca: mangueiras hidráulicas, industriais e pneumáticas, terminais, adaptadores, engates rápidos, tubos e válvulas.', `
${cabB('Catálogo', 'Produtos', `<p class="lead">Busque pelo nome ou pela aplicação, filtre pela linha e adicione ao orçamento.</p>`)}
<section class="sec-b sec-cat"><div class="in">${catalogo(v)}</div></section>`);

  for (const l of linhas) {
    P[l.id] = pagina(v, l.id, `Linha ${l.nome.toLowerCase()}`, `${l.intro} Hidraucon, Porto Alegre e Guaíba.`, `
${cabB(`Linha ${l.nome.toLowerCase()}`, 'Produtos', `<p class="lead">${l.intro}</p><dl class="dados dados-b">${l.dados.map(([n, r]) => `<div><dt>${r}</dt><dd>${n}</dd></div>`).join('')}</dl>`)}
${l.id === 'hidraulica' ? `<section class="sec-b sec-regua"><div class="in"><div class="regua-rola">${regua()}</div></div></section>` : ''}
<section class="sec-b sec-cat"><div class="in">${catalogo(v, l.id)}
  <div class="nao-achou"><div><h2>Não achou o item?</h2><p>${l.curto}</p></div><a class="btn" href="/b/orcamento/">Descrever o que preciso ${ic('seta')}</a></div>
</div></section>`);
  }

  P.servicos = pagina(v, 'servicos', 'Serviços', 'Serviços Hidraucon: comodato, entrega, equipe técnica, estoque, treinamentos e vistoria de mangueiras.', `
${cabB('Serviços', 'Além do balcão')}
<section class="sec-b"><div class="in">${servicosLista('serv-b serv-b-grande')}</div></section>
<section class="sec-b sec-monte"><div class="in duas duas-centro">
  <div><h2>Peça pelo site, retire na loja ou receba</h2><p class="lead">Monte o pedido com a especificação e escolha a loja de Porto Alegre ou de Guaíba.</p><div class="acoes"><a class="btn" href="/b/orcamento/">Montar meu pedido ${ic('seta')}</a></div></div>
  <div class="mangueira-desenho" aria-hidden="true">${desenhoMangueira()}</div>
</div></section>`);

  P.orcamento = pagina(v, 'orcamento', 'Orçamento', 'Monte seu pedido de orçamento de mangueiras e conexões na Hidraucon: escolha a bitola, a pressão, as pontas e o comprimento.', `
${cabB('Monte seu pedido', 'Orçamento', `<p class="lead">Monte a mangueira em quatro passos ou adicione itens do catálogo. A lista vai por e-mail para a loja que você escolher.</p>`)}
<section class="sec-b"><div class="in orc-b">
  <div class="orc-montar"><h2>Mangueira montada</h2>${montador}</div>
  ${pedido(v)}
</div></section>`);

  P['onde-estamos'] = pagina(v, 'onde-estamos', 'Onde estamos', 'Hidraucon em Porto Alegre (Av. Sertório, 389, Navegantes) e Guaíba (Av. Castelo Branco, 3565). Telefones (51) 3026-0000 e (51) 3055-1111.', `
${cabB('Onde estamos', 'Duas lojas')}
<section class="sec-b"><div class="in"><div class="lojas-b">${E.unidades.map(u => unidadeBloco(u, true)).join('')}</div></div></section>
<section class="sec-b sec-claro"><div class="in"><h2>Fale conosco</h2>${pedido(v)}</div></section>`);
  return P;
}

// Mangueira com terminal em cada ponta e as cotas do pedido (bitola, pressão, comprimento).
function desenhoMangueira() {
  return `<svg viewBox="0 0 520 260" class="desenho">
  <path class="dm-mang" d="M70 190 C 160 190, 170 70, 260 70 S 360 190, 450 190"/>
  <path class="dm-malha" d="M70 190 C 160 190, 170 70, 260 70 S 360 190, 450 190"/>
  <g class="dm-term"><rect x="18" y="172" width="34" height="36" rx="3"/><rect x="50" y="177" width="24" height="26" rx="2"/><path d="M8 180h10v20H8z"/></g>
  <g class="dm-term"><rect x="468" y="172" width="34" height="36" rx="3"/><rect x="446" y="177" width="24" height="26" rx="2"/><path d="M502 180h10v20h-10z"/></g>
  <g class="dm-cota"><path d="M30 238h460M30 230v16M490 230v16"/><text x="260" y="232">comprimento</text></g>
  <g class="dm-cota"><circle cx="260" cy="70" r="26"/><text x="260" y="30">bitola · pressão</text></g>
  <text class="dm-p" x="34" y="160">ponta 1</text><text class="dm-p" x="486" y="160">ponta 2</text>
</svg>`;
}

export const gerarVersao = v => (v === 'a' ? paginasA() : paginasB());
