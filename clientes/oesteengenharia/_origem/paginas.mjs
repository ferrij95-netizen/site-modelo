// Monta as páginas das versões A ("Marco": fiel ao site atual, faixa azul com o logo da esfera, fotos das áreas em destaque,
// títulos em Cabin, parente da Gill Sans do logo) e B ("Levantamento": papel quadriculado de topografia, títulos em Carrois Gothic,
// a fonte do site atual, ficha técnica, poligonal das etapas e caderneta de campo das realizações). Estilos em public/assets/{base,a,b}.css.
import { empresa as E, sobre, pilares, areas, realizacoes, destaques, etapas, clientes, totalRealizacoes, totalClientes, anos } from './conteudo.mjs';

export const nomesVersao = { a: 'Marco', b: 'Levantamento' };

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fora = ' target="_blank" rel="noopener"';
const sobreAtual = sobre.map(p => p.replace('Há mais de 35 anos', `Há mais de ${Math.floor(anos / 5) * 5} anos`));
const OESTE = s => s.replace(/OESTE ENGENHARIA/g, '<b class="caixa">Oeste Engenharia</b>');

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'areas', nome: 'Áreas de atuação', caminho: 'areas/' },
  { slug: 'realizacoes', nome: 'Realizações', caminho: 'realizacoes/' },
  { slug: 'clientes', nome: 'Clientes', caminho: 'clientes/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  cel: '<rect x="6.5" y="2.5" width="11" height="19" rx="2"/><path d="M10.5 18.5h3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fechar: '<path d="M6 6l12 12M18 6L6 18"/>',
  mira: '<circle cx="12" cy="12" r="8"/><path d="M12 1.5v6M12 16.5v6M1.5 12h6M16.5 12h6"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const areaPor = slug => areas.find(a => a.slug === slug);
const n2 = i => String(i + 1).padStart(2, '0');

// ---------- moldura ----------
function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
  const fontes = v === 'a' ? 'family=Cabin:wght@500;600;700&family=Inter:wght@400;500;600' : 'family=Carrois+Gothic&family=Inter:wght@400;500;600';
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
<meta name="theme-color" content="#314975">
<link rel="icon" href="/assets/esfera.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontes}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');

function topo(v, atual) {
  const logo = v === 'a'
    ? `<img src="/assets/logo-branco.svg" alt="Oeste Engenharia" width="207" height="216">`
    : `<img class="esf" src="/assets/esfera.svg" alt="" width="152" height="152"><span class="marca-txt"><b>Oeste</b> Engenharia<small>Desde ${E.fundacao}</small></span>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/${v}/" aria-label="Oeste Engenharia, página inicial">${logo}</a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-tel" href="tel:${E.fone.h}">${ic('tel')} ${E.fone.t}</a></nav>
  ${v === 'b' ? `<a class="topo-cta" href="/b/contato/">${ic('mira')} Solicitar proposta</a>` : ''}
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Oeste Engenharia" width="207" height="216" loading="lazy"><p>${E.razao}. Consultoria em topografia, engenharia e arquitetura em Salvador desde ${E.fundacao}.</p></div>
  <div><h3>Alguns dos nossos serviços</h3><ul>${areas.map(a => `<li><a href="/${v}/areas/${a.slug}/">${a.nome}</a></li>`).join('')}</ul></div>
  <div><h3>Contate-nos</h3><p>${E.endereco.join('<br>')}</p><p><a href="tel:${E.fone.h}">Telefone ${E.fone.t}</a><br><a href="tel:${E.celular.h}">Celular ${E.celular.t}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
</div><p class="rod-fim"><span>© ${E.nome} · Salvador, Bahia</span><span>Proibida a reprodução parcial ou total do conteúdo deste site sem autorização prévia da Oeste Engenharia.</span></p></footer>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo) => `${head(v, caminho, titulo, descricao)}
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

// Título de seção. A: rótulo com a mira do logo. B: código de levantamento ("L-02") e linha de cota.
const tit = (v, titulo, { eyebrow, cod, tag = 'h2', cls = '' } = {}) => v === 'a'
  ? `<div class="tit ${cls}">${eyebrow ? `<p class="eyebrow">${ic('mira')}${eyebrow}</p>` : ''}<${tag}>${titulo}</${tag}></div>`
  : `<div class="tit ${cls}">${eyebrow ? `<p class="eyebrow">${cod ? `<b>${cod}</b>` : ''}<span>${eyebrow}</span></p>` : ''}<${tag}>${titulo}</${tag}></div>`;

const capa = (v, eyebrow, titulo, sub, img) => v === 'a'
  ? `<section class="capa${img ? ' com-foto' : ''}">${img ? `<img class="capa-foto" src="${img}" alt="" fetchpriority="high">` : ''}<div class="in"><p class="eyebrow">${ic('mira')}${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`
  : `<section class="capa"><div class="in"><p class="eyebrow"><b>${E.coord}</b><span>${eyebrow}</span></p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${img ? `<figure class="capa-visor"><img src="${img}" alt="" fetchpriority="high"><i class="retic" aria-hidden="true"></i></figure>` : ''}</section>`;

const botoes = (v, sec = 'Conheça as áreas', secHref = `/${v}/areas/`) => `<div class="botoes"><a class="btn" href="/${v}/contato/">Solicitar proposta ${ic('seta')}</a><a class="btn btn-sec" href="${secHref}">${sec}</a></div>`;

const listaServicos = a => `<ul class="servicos">${a.servicos.map(s => `<li>${ic('ok')}${s}</li>`).join('')}</ul>${a.projetos ? `<p class="sub-rot">Projetos</p><ul class="projetos">${a.projetos.map(s => `<li>${s}</li>`).join('')}</ul>` : ''}`;

const contatoLinhas = () => `<ul class="contato-linhas">
  <li>${ic('tel')}<div><b>Telefone</b><a href="tel:${E.fone.h}">${E.fone.t}</a></div></li>
  <li>${ic('cel')}<div><b>Celular</b><a href="tel:${E.celular.h}">${E.celular.t}</a></div></li>
  <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><b>Sede</b>${E.endereco.join(', ')}<a href="${E.mapa}"${fora}>Ver no mapa</a></div></li>
</ul>`;

// Mesmos campos do formulário "Fale Conosco" do site atual; monta o e-mail para oeste@oeste-eng.com.br.
const formContato = () => `<form class="form-contato" data-contato data-email="${E.email}">
  <div class="campos">
    <label><span>Nome</span><input name="nome" autocomplete="name" required></label>
    <label><span>E-mail</span><input name="email" type="email" autocomplete="email" required></label>
    <label><span>Telefone</span><input name="telefone" type="tel" autocomplete="tel"></label>
    <label><span>Cidade</span><input name="cidade" autocomplete="address-level2"></label>
    <label class="largo"><span>Endereço</span><input name="endereco" autocomplete="street-address"></label>
    <label class="largo"><span>Área de interesse</span><select name="area"><option value="">Selecione</option>${areas.map(a => `<option>${a.nome}</option>`).join('')}<option>Outro assunto</option></select></label>
    <label class="largo"><span>Mensagem</span><textarea name="mensagem" rows="5" required></textarea></label>
  </div>
  <button type="submit" class="btn">${ic('mail')} Enviar mensagem</button>
  <p class="form-nota">O envio abre o seu programa de e-mail com a mensagem pronta para a equipe da Oeste.</p>
</form>`;

const mapa = () => `<div class="mapa"><iframe title="Mapa da sede da Oeste Engenharia" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Rua+Rubem+Berta,+447,+Pituba,+Salvador,+BA&output=embed"></iframe></div>`;

// ================= versão A: Marco =================
const A = {};

A.index = () => pagina('a', 'index', '', `${E.nome} · Topografia, Engenharia e Arquitetura em Salvador desde ${E.fundacao}`,
  'Consultoria em agrimensura, engenharia civil, arquitetura e urbanismo, meio ambiente, gerenciamento de obras e avaliação e perícia. Salvador, Bahia, desde 1979.', `
<section class="hero">
  <div class="in hero-grade">
    <div class="hero-txt">
      <p class="eyebrow">${ic('mira')}Desde ${E.fundacao} · Salvador, Bahia</p>
      <h1>${E.slogan}</h1>
      <p class="lead">Topografia, engenharia e arquitetura para empreendimentos públicos e privados, com atuação nacional e internacional.</p>
      ${botoes('a')}
    </div>
    <div class="hero-slider" data-slider>
      ${areas.map((a, i) => `<figure${i ? ' hidden' : ''}><img src="${a.imgs[0]}" alt="${a.nome}"${i ? ' loading="lazy"' : ' fetchpriority="high"'}><figcaption>${a.nome}.</figcaption></figure>`).join('')}
      <div class="hero-pontos" role="tablist" aria-label="Áreas de atuação">${areas.map((a, i) => `<button type="button" role="tab" aria-selected="${!i}" aria-label="${a.nome}"></button>`).join('')}</div>
    </div>
  </div>
</section>

<section class="numeros"><div class="in">
  <p><b>${E.fundacao}</b><span>ano de fundação, em Salvador</span></p>
  <p><b>${anos}</b><span>anos em empreendimentos públicos e privados</span></p>
  <p><b>6</b><span>áreas de atuação, do campo ao projeto</span></p>
  <p><b>${totalClientes}</b><span>clientes e parceiros principais</span></p>
  <p><b>2</b><span>países com obras: Brasil e Angola</span></p>
</div></section>

<section class="empresa-home"><div class="in">
  <figure class="foto-campo"><img src="/assets/img/topografo.jpg" alt="Topógrafo da Oeste Engenharia em campo, com estação total" loading="lazy"><figcaption>Equipe da Oeste em campo</figcaption></figure>
  <div>
    ${tit('a', 'Consultoria em topografia, engenharia e arquitetura', { eyebrow: 'A empresa' })}
    <p class="lead">${OESTE(sobreAtual[0])}</p>
    <p>${OESTE(sobreAtual[1])}</p>
    <ul class="pilares">${pilares.map(p => `<li>${ic('mira')}<div><b>${p.t}</b><span>${p.d}</span></div></li>`).join('')}</ul>
    <a class="link-seta" href="/a/empresa/">Conheça a empresa ${ic('seta')}</a>
  </div>
</div></section>

<section class="areas-home" data-troca><div class="in">
  ${tit('a', 'Áreas de atuação', { eyebrow: 'O que fazemos' })}
  <div class="troca">
    <ol class="troca-lista">${areas.map((a, i) => `<li><a href="/a/areas/${a.slug}/" data-i="${i}"${i ? '' : ' class="ativo"'}><span class="num">${n2(i)}</span><span class="nome">${a.nome}</span>${ic('seta')}</a></li>`).join('')}</ol>
    <div class="troca-midia">${areas.map((a, i) => `<figure${i ? ' hidden' : ''} data-i="${i}"><img src="${a.imgs[0]}" alt="" loading="lazy"><figcaption><p>${a.resumo}</p><ul>${[...a.servicos, ...(a.projetos || []).map(p => `Projeto ${p.toLowerCase()}`)].slice(0, 5).map(s => `<li>${s}</li>`).join('')}</ul></figcaption></figure>`).join('')}</div>
  </div>
</div></section>

<section class="etapas"><div class="in">
  ${tit('a', 'Do primeiro marco à entrega da obra', { eyebrow: 'Em cada etapa do empreendimento' })}
  <p class="etapas-intro">As seis áreas da Oeste cobrem o empreendimento inteiro, do levantamento do terreno à avaliação final.</p>
  <ol class="etapas-trilho">${etapas.map((e, i) => `<li><a href="/a/areas/${e.area}/"><i class="no" aria-hidden="true">${ic('mira')}</i><span class="num">${n2(i)}</span><b>${e.t}</b><span>${e.d}</span></a></li>`).join('')}</ol>
</div></section>

<section class="destaques"><div class="in">
  <div class="destaques-topo">${tit('a', 'Algumas realizações', { eyebrow: 'Bahia, Pernambuco e Angola' })}<a class="link-seta" href="/a/realizacoes/">Ver todas as ${totalRealizacoes} realizações ${ic('seta')}</a></div>
  <div class="mosaico">${destaques.map((d, i) => `<a class="mos-${i}" href="/a/areas/${d.area}/"><img src="${d.img}" alt="" loading="lazy"><span><small>${areaPor(d.area).curto}</small><b>${d.titulo}</b>${d.local}</span></a>`).join('')}</div>
</div></section>

<section class="clientes-home"><div class="in">
  ${tit('a', 'Quem confia na Oeste', { eyebrow: 'Clientes e principais parceiros' })}
</div>
  <div class="faixa-nomes" aria-label="Alguns clientes">
    <div class="corre">${[...clientes.publico, ...clientes.privado].filter((_, i) => i % 2 === 0).map(c => `<span>${c[0]}</span>`).join('')}</div>
    <div class="corre volta">${[...clientes.privado, ...clientes.publico].filter((_, i) => i % 2 === 0).map(c => `<span>${c[0]}</span>`).join('')}</div>
  </div>
  <div class="in"><a class="link-seta" href="/a/clientes/">Ver a lista completa ${ic('seta')}</a></div>
</section>

${A.chamada()}`);

A.chamada = () => `<section class="chamada"><div class="in">
  <img src="/assets/esfera.svg" alt="" width="152" height="152" loading="lazy">
  <div><h2>Pronta para participar do seu empreendimento.</h2><p>Conte o que você precisa: a equipe responde com escopo, prazo e proposta.</p></div>
  <div class="botoes"><a class="btn btn-verm" href="/a/contato/">Fale conosco ${ic('seta')}</a><a class="btn btn-claro" href="tel:${E.fone.h}">${ic('tel')} ${E.fone.t}</a></div>
</div></section>`;

A.empresa = () => pagina('a', 'empresa', 'empresa/', `A Empresa · ${E.nome}`, sobre[0], `
${capa('a', 'A empresa', `Oeste Engenharia, desde ${E.fundacao}`, E.assinatura, '/assets/img/agrimensura-3.jpg')}
<section class="texto-empresa"><div class="in">
  <div class="te-txt">${sobreAtual.map((p, i) => `<p${i ? '' : ' class="lead"'}>${OESTE(p)}</p>`).join('')}</div>
  <aside class="te-ficha">
    <img src="/assets/logo.svg" alt="Oeste Engenharia" width="207" height="216" loading="lazy">
    <dl><dt>Razão social</dt><dd>${E.razao}</dd><dt>Fundação</dt><dd>${E.fundacao}, Salvador – BA</dd><dt>Sede</dt><dd>${E.endereco.slice(0, 2).join(', ')}</dd><dt>Atuação</dt><dd>Nacional e internacional</dd></dl>
  </aside>
</div></section>
<section class="pilares-faixa"><div class="in">${pilares.map((p, i) => `<div><span class="num">${n2(i)}</span><h3>${p.t}</h3><p>${p.d}</p></div>`).join('')}</div></section>
<section class="galeria-empresa"><div class="in">
  ${tit('a', 'Em campo e em projeto', { eyebrow: 'Trabalhos da Oeste' })}
  <div class="tiras">${['/assets/img/topografo.jpg', '/assets/img/obras-3.jpg', '/assets/img/arquitetura-2.jpg', '/assets/img/civil-1.jpg', '/assets/img/agrimensura-5.jpg'].map(s => `<img src="${s}" alt="" loading="lazy">`).join('')}</div>
</div></section>
${A.chamada()}`);

A.areas = () => pagina('a', 'areas', 'areas/', `Áreas de Atuação · ${E.nome}`, 'Engenharia de agrimensura, engenharia civil, arquitetura, urbanismo e paisagismo, meio ambiente, gerenciamento de obras e avaliação e perícia.', `
${capa('a', 'Áreas de atuação', 'Seis áreas, uma coordenação', 'Da topografia à avaliação e perícia, com a mesma equipe responsável pelo empreendimento.', '/assets/img/civil-4.jpg')}
<section class="areas-lista"><div class="in">${areas.map((a, i) => `<article class="area-linha${i % 2 ? ' inv' : ''}">
  <a class="al-foto" href="/a/areas/${a.slug}/"><img src="${a.imgs[0]}" alt="" loading="lazy"></a>
  <div class="al-txt"><span class="num">${n2(i)}</span><h2><a href="/a/areas/${a.slug}/">${a.nome}</a></h2><p>${a.resumo}</p>${listaServicos(a)}<a class="link-seta" href="/a/areas/${a.slug}/">Ver área e realizações ${ic('seta')}</a></div>
</article>`).join('')}</div></section>
${A.chamada()}`);

A.area = a => {
  const i = areas.indexOf(a), reals = realizacoes[a.slug] || [];
  return pagina('a', 'areas', `areas/${a.slug}/`, `${a.nome} · ${E.nome}`, a.resumo, `
${capa('a', `Área ${n2(i)} de 06`, a.nome, a.resumo, a.imgs[0])}
<section class="area-det"><div class="in">
  <div>${tit('a', 'Serviços', { eyebrow: a.curto })}${listaServicos(a)}<div class="botoes">${`<a class="btn" href="/a/contato/">Solicitar proposta ${ic('seta')}</a>`}</div></div>
  <div class="galeria${a.imgs.length < 3 ? ' duas' : ''}" data-galeria>${a.imgs.slice(0, a.imgs.length > 6 ? 6 : a.imgs.length).map((s, k) => `<a href="${s}" class="g-${k}"><img src="${s}" alt="${a.nome}, foto ${k + 1}" loading="lazy"></a>`).join('')}</div>
</div></section>
<section class="area-reais"><div class="in">
  ${tit('a', 'Realizações nesta área', { eyebrow: `${reals.length} projetos` })}
  <ol class="reais">${reals.map(([t, l]) => `<li><span>${t}</span><small>${ic('pin')}${l}</small></li>`).join('')}</ol>
</div></section>
<nav class="outras-areas" aria-label="Outras áreas"><div class="in">${areas.filter(x => x !== a).map(x => `<a href="/a/areas/${x.slug}/"><img src="${x.imgs[0]}" alt="" loading="lazy"><span>${x.curto}</span></a>`).join('')}</div></nav>
${A.chamada()}`);
};

A.realizacoes = () => pagina('a', 'realizacoes', 'realizacoes/', `Realizações · ${E.nome}`, 'Algumas realizações da Oeste Engenharia: topografia e batimetria, projetos viários, planos diretores, requalificação ambiental, fiscalização de obras e avaliações.', `
${capa('a', 'Realizações', 'Algumas realizações', `${totalRealizacoes} trabalhos em Salvador, no interior da Bahia, em Pernambuco e em Luanda, Angola.`, '/assets/img/arquitetura-5.jpg')}
${areas.map((a, i) => `<section class="real-bloco${i % 2 ? ' alt' : ''}" id="${a.slug}"><div class="in">
  <div class="rb-topo"><span class="num">${n2(i)}</span><h2>${a.nome}</h2><a class="link-seta" href="/a/areas/${a.slug}/">Sobre a área ${ic('seta')}</a></div>
  <div class="rb-fotos">${a.imgs.slice(0, 4).map(s => `<img src="${s}" alt="" loading="lazy">`).join('')}</div>
  <ol class="reais">${realizacoes[a.slug].map(([t, l]) => `<li><span>${t}</span><small>${ic('pin')}${l}</small></li>`).join('')}</ol>
</div></section>`).join('')}
${A.chamada()}`);

A.clientes = () => pagina('a', 'clientes', 'clientes/', `Clientes · ${E.nome}`, 'Clientes e principais parceiros da Oeste Engenharia: órgãos públicos, empresas de engenharia, construtoras e indústrias.', `
${capa('a', 'Clientes', 'Principais parceiros', `${totalClientes} clientes entre órgãos públicos, construtoras, indústrias e instituições.`)}
<section class="clientes-grupos"><div class="in">
  ${[['Setor público', clientes.publico], ['Empresas e instituições', clientes.privado]].map(([t, l]) => `<div class="cg">
    <h2>${t} <small>${l.length}</small></h2>
    <ul>${l.map(c => `<li><b>${c[0]}</b>${c[1] ? `<span>${c[1]}</span>` : ''}</li>`).join('')}</ul>
  </div>`).join('')}
</div></section>
${A.chamada()}`);

A.contato = () => pagina('a', 'contato', 'contato/', `Contato · ${E.nome}`, `Fale com a Oeste Engenharia: ${E.endereco.join(', ')}. Telefone ${E.fone.t}.`, `
${capa('a', 'Contato', 'Fale conosco', 'Será um enorme prazer saber a sua opinião, receber sua crítica ou conversar sobre o seu empreendimento.')}
<section class="contato"><div class="in">
  <div class="contato-info"><h2>Sede</h2><p class="razao">${E.razao}</p>${contatoLinhas()}</div>
  <div>${formContato()}</div>
</div></section>
${mapa()}`);

// ================= versão B: Levantamento =================
const B = {};

B.index = () => pagina('b', 'index', '', `${E.nome} · Organização, Estradas, Topografia e Engenharia desde ${E.fundacao}`,
  'Consultoria em topografia, engenharia e arquitetura em Salvador, Bahia, desde 1979. Agrimensura, engenharia civil, urbanismo, meio ambiente, obras e avaliação.', `
<section class="hero"><div class="in hero-grade">
  <div class="hero-txt">
    <p class="eyebrow"><b>${E.coord}</b><span>Pituba, Salvador · desde ${E.fundacao}</span></p>
    <h1>Organização, Estradas, Topografia e Engenharia.</h1>
    <p class="lead">${E.slogan} Consultoria em topografia, engenharia e arquitetura para empreendimentos públicos e privados, no Brasil e no exterior.</p>
    ${botoes('b', 'Ver realizações', '/b/realizacoes/')}
  </div>
  <figure class="visor"><img src="/assets/img/topografo.jpg" alt="Topógrafo da Oeste Engenharia operando estação total" fetchpriority="high"><i class="retic" aria-hidden="true"></i><figcaption><span>EST. 01</span>Equipe Oeste em campo</figcaption></figure>
</div>
<div class="regua" aria-hidden="true"><div class="in">${Array.from({ length: 6 }, (_, i) => `<span>${E.fundacao + Math.round(i * anos / 5)}</span>`).join('')}</div></div>
</section>

<section class="ficha"><div class="in">
  ${tit('b', 'Ficha técnica da empresa', { eyebrow: 'A empresa', cod: 'L-01' })}
  <div class="ficha-grade">
    <dl class="ficha-dados">
      <div><dt>Razão social</dt><dd>${E.razao}</dd></div>
      <div><dt>Fundação</dt><dd>${E.fundacao} · ${anos} anos</dd></div>
      <div><dt>Sede</dt><dd>${E.endereco.slice(0, 2).join(', ')}</dd></div>
      <div><dt>Atuação</dt><dd>Nacional e internacional</dd></div>
      <div><dt>Áreas</dt><dd>6</dd></div>
      <div><dt>Clientes</dt><dd>${totalClientes}</dd></div>
      <div><dt>Realizações listadas</dt><dd>${totalRealizacoes}</dd></div>
    </dl>
    <div class="ficha-txt"><p class="lead">${OESTE(sobreAtual[0])}</p><p>${OESTE(sobreAtual[1])}</p><a class="link-seta" href="/b/empresa/">Sobre a empresa ${ic('seta')}</a></div>
  </div>
</div></section>

<section class="areas-grade"><div class="in">
  ${tit('b', 'Áreas de atuação', { eyebrow: 'Do campo ao projeto', cod: 'L-02' })}
  <div class="ag">${areas.map((a, i) => `<a href="/b/areas/${a.slug}/" class="ag-${i}"><figure><img src="${a.imgs[i === 0 ? 3 : 0]}" alt="" loading="lazy"><i class="retic" aria-hidden="true"></i></figure><span class="cod">A-${n2(i)}</span><h3>${a.nome}</h3><p>${a.resumo}</p><span class="mais">${a.servicos.length + (a.projetos?.length || 0)} serviços ${ic('seta')}</span></a>`).join('')}</div>
</div></section>

${B.poligonal()}

<section class="caderneta-home"><div class="in">
  <div class="ch-topo">${tit('b', 'Caderneta de campo', { eyebrow: 'Algumas realizações', cod: 'L-04' })}<a class="link-seta" href="/b/realizacoes/">Todas as ${totalRealizacoes} realizações ${ic('seta')}</a></div>
  ${B.tabela(destaques.map(d => [d.area, realizacoes[d.area][d.i]]).concat([['avaliacao', realizacoes.avaliacao[0]], ['arquitetura', realizacoes.arquitetura[3]], ['agrimensura', realizacoes.agrimensura[0]], ['obras', realizacoes.obras[1]]]))}
</div></section>

<section class="clientes-b"><div class="in">
  ${tit('b', 'Clientes e principais parceiros', { eyebrow: `${totalClientes} clientes`, cod: 'L-05' })}
  <div class="cb-cols">${[['Setor público', clientes.publico], ['Empresas e instituições', clientes.privado]].map(([t, l]) => `<div><h3>${t} <span>${l.length}</span></h3><ul>${l.slice(0, 12).map(c => `<li>${c[0]}</li>`).join('')}</ul></div>`).join('')}</div>
  <a class="link-seta" href="/b/clientes/">Lista completa ${ic('seta')}</a>
</div></section>

${B.chamada()}`);

// Etapas desenhadas como uma poligonal (sequência de estações ligadas), a forma de levantamento da topografia.
B.poligonal = () => {
  const pts = etapas.map((_, i) => [+(i * 1000 / etapas.length).toFixed(1), i % 2 ? 60 : 20]);
  return `<section class="poligonal"><div class="in">
  ${tit('b', 'Poligonal do empreendimento', { eyebrow: 'Etapas atendidas pela Oeste', cod: 'L-03' })}
  <div class="pol">
    <svg class="pol-linha" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true"><polyline points="${pts.map(p => p.join(',')).join(' ')}"/></svg>
    <ol>${etapas.map((e, i) => `<li class="${i % 2 ? 'baixo' : 'cima'}"><a href="/b/areas/${e.area}/"><span class="cod">E-${n2(i)}</span><b>${e.t}</b><span>${e.d}</span></a></li>`).join('')}</ol>
  </div>
</div></section>`;
};

B.tabela = (linhas, filtro = false, comArea = true) => `${filtro ? `<div class="filtros" role="group" aria-label="Filtrar por área"><button type="button" aria-pressed="true" data-f="">Todas <span>${linhas.length}</span></button>${areas.map(a => `<button type="button" aria-pressed="false" data-f="${a.slug}">${a.curto} <span>${realizacoes[a.slug].length}</span></button>`).join('')}</div>` : ''}
<div class="tabela-wrap"><table class="caderneta"${filtro ? ' data-filtrar' : ''}>
  <thead><tr><th scope="col">Nº</th>${comArea ? '<th scope="col">Área</th>' : ''}<th scope="col">Serviço</th><th scope="col">Local</th></tr></thead>
  <tbody>${linhas.map(([slug, [t, l]], i) => `<tr data-a="${slug}"><td class="n">${String(i + 1).padStart(3, '0')}</td>${comArea ? `<td class="ar"><a href="/b/areas/${slug}/">${areaPor(slug).curto}</a></td>` : ''}<td>${t}</td><td class="lc">${l}</td></tr>`).join('')}</tbody>
</table></div>`;

B.chamada = () => `<section class="chamada"><div class="in">
  <p class="eyebrow"><b>${E.coord}</b><span>${E.endereco.slice(0, 2).join(' · ')}</span></p>
  <h2>Com atuação nacional e internacional, a Oeste está pronta para participar do seu empreendimento.</h2>
  <div class="botoes"><a class="btn btn-verm" href="/b/contato/">Solicitar proposta ${ic('seta')}</a><a class="btn btn-claro" href="tel:${E.fone.h}">${ic('tel')} ${E.fone.t}</a><a class="btn btn-claro" href="mailto:${E.email}">${ic('mail')} ${E.email}</a></div>
</div></section>`;

B.empresa = () => pagina('b', 'empresa', 'empresa/', `A Empresa · ${E.nome}`, sobre[0], `
${capa('b', 'A empresa', `Desde ${E.fundacao} em Salvador`, E.razao, '/assets/img/agrimensura-1.jpg')}
<section class="empresa-b"><div class="in">
  <div class="eb-txt">${sobreAtual.map((p, i) => `<p${i ? '' : ' class="lead"'}>${OESTE(p)}</p>`).join('')}</div>
  <dl class="ficha-dados">
    <div><dt>Fundação</dt><dd>${E.fundacao}</dd></div><div><dt>Anos</dt><dd>${anos}</dd></div>
    <div><dt>Áreas</dt><dd>6</dd></div><div><dt>Realizações listadas</dt><dd>${totalRealizacoes}</dd></div>
    <div><dt>Clientes</dt><dd>${totalClientes}</dd></div><div><dt>Países</dt><dd>Brasil · Angola</dd></div>
  </dl>
</div></section>
<section class="pilares-b"><div class="in">${tit('b', 'Como a Oeste trabalha', { eyebrow: 'Princípios', cod: 'L-02' })}<ol>${pilares.map((p, i) => `<li><span class="cod">P-${n2(i)}</span><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ol></div></section>
${B.poligonal()}
${B.chamada()}`);

B.areas = () => pagina('b', 'areas', 'areas/', `Áreas de Atuação · ${E.nome}`, 'As seis áreas de atuação da Oeste Engenharia, com todos os serviços e projetos.', `
${capa('b', 'Áreas de atuação', 'Seis áreas de atuação', 'Todos os serviços e projetos da Oeste Engenharia, área por área.', '/assets/img/civil-6.jpg')}
<section class="areas-tab"><div class="in">${areas.map((a, i) => `<article id="${a.slug}">
  <header><span class="cod">A-${n2(i)}</span><h2><a href="/b/areas/${a.slug}/">${a.nome}</a></h2></header>
  <p>${a.resumo}</p>
  <div class="at-serv">${listaServicos(a)}</div>
  <a class="at-foto" href="/b/areas/${a.slug}/"><img src="${a.imgs[a.imgs.length > 1 ? 1 : 0]}" alt="" loading="lazy"><span>${realizacoes[a.slug].length} realizações ${ic('seta')}</span></a>
</article>`).join('')}</div></section>
${B.chamada()}`);

B.area = a => {
  const i = areas.indexOf(a), reals = realizacoes[a.slug] || [];
  return pagina('b', 'areas', `areas/${a.slug}/`, `${a.nome} · ${E.nome}`, a.resumo, `
${capa('b', `A-${n2(i)} · Área de atuação`, a.nome, a.resumo, a.imgs[0])}
<section class="area-b"><div class="in">
  <div class="ab-serv">${tit('b', 'Serviços', { eyebrow: a.curto, cod: `A-${n2(i)}` })}${listaServicos(a)}<a class="btn" href="/b/contato/">Solicitar proposta ${ic('seta')}</a></div>
  <div class="ab-reais">${tit('b', 'Realizações', { eyebrow: `${reals.length} registros`, cod: 'R' })}${B.tabela(reals.map(r => [a.slug, r]), false, false)}</div>
</div></section>
<section class="galeria-b"><div class="in"><div class="galeria" data-galeria style="--cols:${[4, 4, 2, 3, 4, 3, 3, 4][a.imgs.length] || 4}">${a.imgs.map((s, k) => `<a href="${s}"><img src="${s}" alt="${a.nome}, foto ${k + 1}" loading="lazy"><span>F-${n2(k)}</span></a>`).join('')}</div></div></section>
<nav class="outras-b" aria-label="Outras áreas"><div class="in">${areas.map((x, k) => x === a ? '' : `<a href="/b/areas/${x.slug}/"><span class="cod">A-${n2(k)}</span>${x.nome}</a>`).join('')}</div></nav>
${B.chamada()}`);
};

B.realizacoes = () => pagina('b', 'realizacoes', 'realizacoes/', `Realizações · ${E.nome}`, 'Caderneta com as realizações da Oeste Engenharia por área e local.', `
${capa('b', 'Realizações', 'Caderneta de campo', `${totalRealizacoes} realizações registradas no site da Oeste, por área e local. Use os filtros para ver cada área.`, '/assets/img/agrimensura-6.jpg')}
<section class="real-b"><div class="in">${B.tabela(areas.flatMap(a => realizacoes[a.slug].map(r => [a.slug, r])), true)}</div></section>
${B.chamada()}`);

B.clientes = () => pagina('b', 'clientes', 'clientes/', `Clientes · ${E.nome}`, 'Clientes e principais parceiros da Oeste Engenharia.', `
${capa('b', 'Clientes', 'Clientes e principais parceiros', `${totalClientes} clientes em ${anos} anos: órgãos públicos, construtoras, indústrias e instituições.`)}
<section class="clientes-tab"><div class="in">${[['Setor público', clientes.publico, 'C-P'], ['Empresas e instituições', clientes.privado, 'C-E']].map(([t, l, c]) => `<div>
  <h2><span class="cod">${c}</span>${t} <small>${l.length}</small></h2>
  <table class="caderneta"><tbody>${l.map((x, k) => `<tr><td class="n">${String(k + 1).padStart(2, '0')}</td><td><b>${x[0]}</b>${x[1] ? `<span>${x[1]}</span>` : ''}</td></tr>`).join('')}</tbody></table>
</div>`).join('')}</div></section>
${B.chamada()}`);

B.contato = () => pagina('b', 'contato', 'contato/', `Contato · ${E.nome}`, `Fale com a Oeste Engenharia: ${E.endereco.join(', ')}. Telefone ${E.fone.t}.`, `
${capa('b', 'Contato', 'Fale conosco', 'Será um enorme prazer saber a sua opinião e/ou crítica sobre nós, ou conversar sobre o seu empreendimento.')}
<section class="contato"><div class="in">
  <div>${formContato()}</div>
  <div class="contato-info"><h2>${E.razao}</h2>${contatoLinhas()}${mapa()}</div>
</div></section>`);

export function gerarVersao(v) {
  const X = v === 'a' ? A : B;
  const p = { index: X.index(), empresa: X.empresa(), areas: X.areas(), realizacoes: X.realizacoes(), clientes: X.clientes(), contato: X.contato() };
  for (const a of areas) p[`areas/${a.slug}`] = X.area(a);
  return p;
}
