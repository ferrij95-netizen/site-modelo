// Monta as páginas das versões A ("Prancheta": fiel ao site atual, menu em abas sobre o banner da prancheta com o prédio
// de vidro, os três losangos de Projetos, Consultorias e Instalações) e B ("Planta": mesma marca num desenho técnico,
// carimbo de prancha na abertura, disciplinas como legenda de projeto). Estilos em public/assets/{base,a,b}.css.
import { empresa as E, textos as T, frentes, disciplinas, parceiros, etapas } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const nomesVersao = { a: 'Prancheta', b: 'Planta' };

const nav = [
  { slug: 'index', nome: 'Página Inicial', curto: 'Início', caminho: '' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'quem-somos', nome: 'Quem Somos', caminho: 'quem-somos/' },
  { slug: 'contatos', nome: 'Contatos', caminho: 'contatos/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  // símbolos das disciplinas (traço de desenho técnico)
  eletricas: '<path d="M13 2L5 13h6l-1 9 8-11h-6z"/>',
  'energia-solar': '<rect x="3" y="11" width="18" height="9" transform="skewX(-12) translate(2 0)"/><path d="M8.5 11l-2 9M14.5 11l-2 9M3.8 15.5h16.6"/><circle cx="17" cy="5" r="2.2"/><path d="M17 1.3v.9M20.7 5h-.9M14.2 2.4l.6.6M19.8 2.4l-.6.6"/>',
  hidraulicas: '<path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z"/><path d="M9 14.5a3 3 0 003 3"/>',
  incendio: '<path d="M12 22c4 0 7-2.7 7-6.5 0-4-3-6-4-9.5-1.5 2-2 3.5-2 5-1.5-1-2.5-3-2.5-5C7 8 5 11.5 5 15.5 5 19.3 8 22 12 22z"/><path d="M12 22c-1.7 0-3-1.2-3-2.8 0-1.8 1.5-2.7 2-4.2.8 1 2 1.6 2.5 0 .9 1 1.5 2.4 1.5 3.6 0 2-1.3 3.4-3 3.4z"/>',
  glp: '<path d="M8 6h8a2 2 0 012 2v11a3 3 0 01-3 3H9a3 3 0 01-3-3V8a2 2 0 012-2z"/><path d="M10 6V3h4v3M6 11h12M6 17h12"/>',
  telefonia: '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M10.5 18.5h3M7 6h10"/>',
  logica: '<rect x="9" y="2.5" width="6" height="5"/><rect x="2.5" y="16.5" width="6" height="5"/><rect x="15.5" y="16.5" width="6" height="5"/><path d="M12 7.5v4.5M5.5 16.5V12h13v4.5"/>',
  spda: '<path d="M12 2v6M9 8h6l-1 3h-4zM12 11v11M8 22h8M13.5 13.5l-2.5 3h2l-2 3"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site do Grupo RTS e gostaria de falar sobre um projeto.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;
const fora = ' target="_blank" rel="noopener"';
const img = (n, alt = '', cls = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''} loading="lazy" decoding="async"${extra}>`;

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
<meta property="og:site_name" content="${E.completo}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#2E3355">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Exo+2:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const btnMenu = '<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">' + ic('menu') + '</button>';

function topo(v, atual) {
  if (v === 'a') return `<header class="topo"><div class="in topo-in">
  <a class="marca" href="/a/" aria-label="Grupo RTS, página inicial"><img src="/assets/logo.svg" alt="Grupo RTS Engenharia de Instalações" width="180" height="78"></a>
  <nav class="abas" id="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="topo-tel" href="tel:${E.fones[0].href}">${ic('tel')}<span>${E.fones[0].txt}</span></a>
  ${btnMenu}
</div></header>`;
  return `<header class="topo"><div class="in topo-in">
  <a class="marca" href="/b/" aria-label="Grupo RTS, página inicial"><img class="m-cor" src="/assets/logo.svg" alt="Grupo RTS Engenharia de Instalações" width="150" height="65"><img class="m-br" src="/assets/logo-branco.svg" alt="" width="150" height="65"></a>
  <nav class="menu" id="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-cta" href="${waLink()}"${fora}>${ic('wa')}<span>Orçamento</span></a></nav>
  ${btnMenu}
</div></header>`;
}

function rodape(v) {
  const discs = disciplinas.map(d => `<a href="/${v}/servicos/${d.slug}/">${d.nome}</a>`).join('');
  return `<footer class="rodape"><div class="in rod-grade">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Grupo RTS Engenharia de Instalações" width="190" height="82"><p>Consultorias, Projetos e Instalações em Salvador desde ${E.fundacao}.</p></div>
  <div><h2>Disciplinas</h2><div class="rod-links">${discs}</div></div>
  <div><h2>Contato</h2>
    <p><a href="${E.mapa}"${fora}>${E.endereco}<br>${E.bairro}, ${E.cidade}<br>CEP ${E.cep}</a></p>
    <p>${E.fones.map(f => `<a href="tel:${f.href}">${f.txt}</a>`).join('<br>')}<br><a href="${waLink()}"${fora}>${E.celular.txt} (WhatsApp)</a></p>
  </div>
</div>
<div class="in rod-base"><span>© 1994-2026 RTS Engenharia. Todos os direitos reservados.</span><span>${nav.map(n => `<a href="/${v}/${n.caminho}">${n.curto || n.nome}</a>`).join('')}</span></div>
</footer>
<a class="wa-flut" href="${waLink()}"${fora} aria-label="Conversar no WhatsApp">${ic('wa')}</a>`;
}

const pagina = (v, slug, caminho, titulo, descricao, corpo) =>
  `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${slug}">
<a class="pular" href="#conteudo">Ir para o conteúdo</a>
${topo(v, slug.startsWith('servicos') ? 'servicos' : slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// ---------- blocos compartilhados ----------
const formContato = () => `<form class="form" data-form>
  <label><span>Nome</span><input name="nome" required autocomplete="name"></label>
  <label><span>Empresa ou obra</span><input name="empresa" autocomplete="organization"></label>
  <label><span>Telefone</span><input name="tel" type="tel" autocomplete="tel"></label>
  <label><span>Disciplina</span><select name="disc"><option value="">Escolha</option>${disciplinas.map(d => `<option>${d.nome}</option>`).join('')}<option>Mais de uma</option></select></label>
  <label class="larga"><span>Conte sobre o projeto</span><textarea name="msg" rows="4" required></textarea></label>
  <button class="btn" type="submit">${ic('wa')}<span>Enviar pelo WhatsApp</span></button>
  <p class="form-nota">A mensagem abre no WhatsApp da RTS, ${E.celular.txt}. Nada fica guardado neste site.</p>
</form>`;

const mapa = () => `<iframe class="mapa" title="Mapa: ${E.endereco}, ${E.bairro}, Salvador" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

const listaContatos = () => `<ul class="contatos">
  <li>${ic('pin')}<div><b>Endereço</b><a href="${E.mapa}"${fora}>${E.endereco}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</a></div></li>
  <li>${ic('tel')}<div><b>Telefones</b>${E.fones.map(f => `<a href="tel:${f.href}">${f.txt}</a>`).join(' · ')}</div></li>
  <li>${ic('wa')}<div><b>Celular e WhatsApp</b><a href="${waLink()}"${fora}>${E.celular.txt}</a></div></li>
</ul>`;

// ============ VERSÃO A · PRANCHETA ============
const A = {
  index() {
    return `<section class="hero"><div class="in">
  <div class="hero-quadro">
    ${img('banner-prancheta', 'Prancheta com projeto de instalações e fachada de vidro', 'hero-img', ' loading="eager" fetchpriority="high"')}
    <div class="hero-txt">
      <p class="sobre">Salvador · Bahia · desde 1994</p>
      <h1>Engenharia de instalações do projeto à obra</h1>
      <p class="hero-sub">Consultorias, Projetos e Instalações para as áreas pública e privada.</p>
      <div class="acoes"><a class="btn" href="/a/servicos/">Nossos serviços ${ic('seta')}</a><a class="btn btn-linha" href="${waLink()}"${fora}>${ic('wa')} Fale conosco</a></div>
    </div>
  </div>
</div></section>

<section class="boas"><div class="in boas-grade">
  <div><p class="sobre">Bem-vindo ao Grupo RTS</p><h2>Há mais de 30 anos projetando as instalações de casas, empresas e obras públicas</h2></div>
  <div class="boas-txt"><p>${T.boasVindas}</p><p>${T.objetivo}</p><p>${T.qualidade}</p>
    <p class="boas-tel">Ligue para ${E.fones.map(f => `<a href="tel:${f.href}">${f.txt}</a>`).join(' / ')} / <a href="tel:${E.celular.href}">${E.celular.txt.replace('(71) ', '')}</a></p></div>
</div></section>

<section class="frentes"><div class="in">
  <div class="losangos">${frentes.map(f => `<a class="losango" href="/a/servicos/#${f.slug}">
    <span class="los-img">${img(f.img, f.nome)}</span>
    <h3>${f.nome}</h3><p>${f.texto}</p></a>`).join('')}</div>
</div></section>

<section class="discs"><div class="in">
  <div class="cab"><p class="sobre">Projetos de instalações</p><h2>Oito disciplinas, uma equipe</h2><p>${T.mercado}</p></div>
  <ol class="disc-lista">${disciplinas.map((d, i) => `<li><a href="/a/servicos/${d.slug}/"><span class="d-num">${String(i + 1).padStart(2, '0')}</span>${ic(d.slug, 'ic d-ic')}<span class="d-txt"><b>${d.nome}</b><small>${d.extra || d.resumo.split(',')[0].split(':')[0]}</small></span>${ic('seta', 'ic d-seta')}</a></li>`).join('')}</ol>
</div></section>

<section class="bim"><div class="in bim-grade">
  <figure>${img('prancha-mesa-luz', 'Prancha de projeto sobre mesa de luz')}</figure>
  <div><p class="sobre">Tecnologia BIM</p><h2>Projeto em BIM, compatibilizado antes da obra</h2><p>${T.servicos}</p><p>${T.papel}</p>
  <a class="btn btn-claro" href="/a/quem-somos/">Conheça a RTS ${ic('seta')}</a></div>
</div></section>

<section class="etapas"><div class="in">
  <div class="cab"><p class="sobre">Como trabalhamos</p><h2>Da consultoria à instalação</h2></div>
  <ol class="setas">${etapas.map(e => `<li><span>${e.n}</span><h3>${e.titulo}</h3><p>${e.texto}</p></li>`).join('')}</ol>
</div></section>

<section class="parc"><div class="in parc-grade">
  <div><p class="sobre">Alguns dos nossos parceiros</p><h2>Construtoras e escritórios que trabalham com a RTS</h2><p>${T.sucesso}</p></div>
  <ul class="parc-nomes">${parceiros.map(p => `<li>${p}</li>`).join('')}</ul>
</div></section>

${chamadaA()}`;
  },

  servicos() {
    return `${capaA('Serviços', 'Projetos de instalações para as áreas pública e privada', T.servicos, 'reuniao-projeto')}
<section class="txt-duplo"><div class="in grade-2"><p class="lead">${T.papel}</p><p>${T.sucesso}</p></div></section>
${frentes.map((f, i) => `<section class="frente${i % 2 ? ' inv' : ''}" id="${f.slug}"><div class="in frente-grade">
  <figure class="los-img grande">${img(f.img, f.nome)}</figure>
  <div><p class="sobre">0${i + 1}</p><h2>${f.nome}</h2><p>${f.texto}</p>${i === 0 ? `<p>${T.servicos}</p>` : i === 1 ? `<p>${T.papel}</p>` : `<p>${T.metodos}</p>`}</div>
</div></section>`).join('')}
<section class="discs"><div class="in">
  <div class="cab"><p class="sobre">Disciplinas</p><h2>Escolha a instalação</h2></div>
  <ol class="disc-lista">${disciplinas.map((d, i) => `<li><a href="/a/servicos/${d.slug}/"><span class="d-num">${String(i + 1).padStart(2, '0')}</span>${ic(d.slug, 'ic d-ic')}<span class="d-txt"><b>${d.nome}</b><small>${d.resumo}</small></span>${ic('seta', 'ic d-seta')}</a></li>`).join('')}</ol>
</div></section>
<section class="parc"><div class="in parc-grade">
  <div><p class="sobre">Alguns dos nossos parceiros</p><h2>Empresas que recomendamos</h2><p>${T.parceirosIntro}</p></div>
  <ul class="parc-nomes">${parceiros.map(p => `<li>${p}</li>`).join('')}</ul>
</div></section>
${chamadaA()}`;
  },

  disciplina(d) {
    const i = disciplinas.indexOf(d);
    const ant = disciplinas[(i + disciplinas.length - 1) % disciplinas.length], prox = disciplinas[(i + 1) % disciplinas.length];
    return `<section class="capa capa-disc"><div class="in capa-grade">
  <div><p class="migalha"><a href="/a/servicos/">Serviços</a> / ${d.nome}</p>
  <h1>${ic(d.slug, 'ic capa-ic')}Projetos de instalações ${d.nome === 'GLP' || d.nome === 'SPDA' ? 'de ' + d.nome : d.nome.toLowerCase()}</h1>
  <p class="capa-sub">${d.resumo}</p></div>
  ${d.foto ? `<figure class="capa-foto${d.foto.startsWith('losango') ? ' los' : ''}">${img(d.foto, d.nome)}</figure>` : `<div class="capa-sigla" aria-hidden="true">${d.sigla}</div>`}
</div></section>
<section class="disc-corpo"><div class="in disc-grade">
  <div><h2>O que o projeto inclui</h2><ul class="checks">${d.itens.map(t => `<li>${ic('ok')}${t}</li>`).join('')}</ul></div>
  <aside class="normas"><h2>Normas de referência</h2><ul>${d.normas.map(n => `<li>${n}</li>`).join('')}</ul>
  <p>Projetos elaborados ${d.slug === 'energia-solar' || d.slug === 'telefonia' || d.slug === 'logica' ? '' : 'também '}em BIM quando a obra pede, compatibilizados com as demais disciplinas.</p>
  <a class="btn" href="${waLink(`Olá! Vim pelo site do Grupo RTS e gostaria de um orçamento de projeto de ${d.nome}.`)}"${fora}>${ic('wa')} Pedir orçamento</a></aside>
</div></section>
<nav class="disc-nav in" aria-label="Outras disciplinas"><a href="/a/servicos/${ant.slug}/">← ${ant.nome}</a><a href="/a/servicos/">Todas as disciplinas</a><a href="/a/servicos/${prox.slug}/">${prox.nome} →</a></nav>
${chamadaA()}`;
  },

  'quem-somos'() {
    return `${capaA('Quem Somos', 'No mercado desde 1994', T.empenho, 'engenheiros-obra')}
<section class="historia"><div class="in historia-grade">
  <div class="ano"><span>1994</span><p>Fundação em Salvador, ${E.fundacao}</p></div>
  <div><p class="lead">${T.mercado}</p><p>${T.boasVindas}</p><p>${T.metodos}</p></div>
</div></section>
<section class="mosaico"><div class="in mos-grade">
  ${img('obra-casa', 'Engenheiro com projeto em frente a uma casa em obra', 'm1')}${img('estrutura-steel', 'Estrutura em construção', 'm2')}${img('reuniao-projeto', 'Equipe revisando um projeto', 'm3')}${img('mesa-esquadro', 'Mesa de projeto com esquadro', 'm4')}
</div></section>
<section class="discs"><div class="in">
  <div class="cab"><p class="sobre">Projetos de instalações</p><h2>Atendemos clientes e parceiros em</h2></div>
  <ul class="tags">${disciplinas.map(d => `<li><a href="/a/servicos/${d.slug}/">${ic(d.slug)}${d.nome}</a></li>`).join('')}</ul>
</div></section>
<section class="etapas"><div class="in">
  <div class="cab"><p class="sobre">Nosso objetivo</p><h2>${T.objetivo}</h2></div>
  <ol class="setas">${etapas.map(e => `<li><span>${e.n}</span><h3>${e.titulo}</h3><p>${e.texto}</p></li>`).join('')}</ol>
</div></section>
${chamadaA()}`;
  },

  contatos() {
    return `${capaA('Contatos', 'Contate-nos', 'Fale com a RTS Engenharia pelo telefone, pelo WhatsApp ou pelo formulário abaixo.', 'mesa-esquadro')}
<section class="contato"><div class="in contato-grade">
  <div>${listaContatos()}${mapa()}</div>
  <div class="contato-form"><h2>Peça um orçamento</h2>${formContato()}</div>
</div></section>`;
  },
};

function capaA(rotulo, titulo, sub, foto) {
  return `<section class="capa"><div class="in capa-grade">
  <div><p class="sobre">${rotulo}</p><h1>${titulo}</h1><p class="capa-sub">${sub}</p></div>
  <figure class="capa-foto">${img(foto, '')}</figure>
</div></section>`;
}

function chamadaA() {
  return `<section class="chamada"><div class="in chamada-in">
  <div><h2>Tem uma obra pela frente?</h2><p>Encontre informações sobre nossos serviços ou entre em contato com nosso atendimento.</p></div>
  <div class="acoes"><a class="btn btn-claro" href="${waLink()}"${fora}>${ic('wa')} ${E.celular.txt}</a><a class="btn btn-linha-br" href="tel:${E.fones[0].href}">${ic('tel')} ${E.fones[0].txt}</a></div>
</div></section>`;
}

// ============ VERSÃO B · PLANTA ============
const carimbo = linhas => `<dl class="carimbo">${linhas.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;

const B = {
  index() {
    return `<section class="hero"><div class="hero-fundo">${img('engenheiros-obra', '', '', ' loading="eager" fetchpriority="high"')}</div>
<div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">Engenharia de instalações · Salvador</p>
    <h1>Instalações projetadas para funcionar na obra, não só no papel.</h1>
    <p class="hero-sub">${T.boasVindas}</p>
    <div class="acoes"><a class="btn" href="${waLink()}"${fora}>${ic('wa')} Pedir orçamento</a><a class="btn btn-linha-br" href="/b/servicos/">Ver disciplinas ${ic('seta')}</a></div>
  </div>
  ${carimbo([['Empresa', 'Grupo RTS'], ['Local', 'Salvador · BA'], ['Desde', E.fundacao], ['Disciplinas', '08'], ['Método', 'BIM'], ['Folha', '01/04']])}
</div></section>

<section class="cotas"><div class="in cotas-grade">
  <div><b>1994</b><span>constituída em Salvador</span></div>
  <div><b>08</b><span>disciplinas de instalações</span></div>
  <div><b>BIM</b><span>projetos compatibilizados</span></div>
  <div><b>Salvador</b><span>sede na Vila Laura</span></div>
</div></section>

<section class="legenda"><div class="in">
  <div class="cab"><p class="sobre">Legenda</p><h2>O que projetamos</h2><p>${T.mercado}</p></div>
  <div class="leg-tabela" role="list">${disciplinas.map(d => `<a role="listitem" href="/b/servicos/${d.slug}/"><span class="leg-sim">${ic(d.slug)}</span><span class="leg-sig">${d.sigla}</span><span class="leg-nome">${d.nome}${d.extra ? `<small>${d.extra}</small>` : ''}</span><span class="leg-desc">${d.resumo}</span>${ic('seta', 'ic leg-seta')}</a>`).join('')}</div>
</div></section>

<section class="frentes-b"><div class="in">
  <div class="cab"><p class="sobre">Atuação</p><h2>Consultorias, Projetos e Instalações</h2></div>
  <div class="fb-grade">${frentes.map((f, i) => `<a class="fb fb-${i}" href="/b/servicos/#${f.slug}">${img(f.foto, f.nome)}<span class="fb-txt"><small>0${i + 1}</small><b>${f.nome}</b><span>${f.texto}</span></span></a>`).join('')}</div>
</div></section>

<section class="fluxo"><div class="in fluxo-grade">
  <div class="fluxo-cab"><p class="sobre">Fluxo do projeto</p><h2>Do primeiro traço à instalação</h2><p>${T.papel}</p></div>
  <ol class="trilho">${etapas.map(e => `<li><span class="no">${e.n}</span><div><h3>${e.titulo}</h3><p>${e.texto}</p></div></li>`).join('')}</ol>
</div></section>

<section class="parc-b"><div class="in">
  <div class="cab"><p class="sobre">Parceiros</p><h2>${T.sucesso}</h2></div>
  <ul class="parc-tab">${parceiros.map((p, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${p}</li>`).join('')}</ul>
</div></section>

${chamadaB()}`;
  },

  servicos() {
    return `${capaB('Serviços', 'Projetos de instalações para as áreas pública e privada', T.servicos, [['Folha', '02/04'], ['Assunto', 'Serviços'], ['Disciplinas', '08'], ['Método', 'BIM']])}
<section class="fluxo fluxo-claro"><div class="in grade-2"><p class="lead">${T.papel}</p><p>${T.sucesso}</p></div></section>
<section class="frentes-lin"><div class="in">${frentes.map((f, i) => `<article class="fl" id="${f.slug}"><span class="fl-n">0${i + 1}</span><div class="fl-txt"><h2>${f.nome}</h2><p>${f.texto}</p><p>${[T.servicos, T.papel, T.metodos][i]}</p></div>${img(f.foto, f.nome, 'fl-img')}</article>`).join('')}</div></section>
<section class="legenda"><div class="in">
  <div class="cab"><p class="sobre">Legenda</p><h2>Disciplinas</h2></div>
  <div class="leg-tabela" role="list">${disciplinas.map(d => `<a role="listitem" href="/b/servicos/${d.slug}/"><span class="leg-sim">${ic(d.slug)}</span><span class="leg-sig">${d.sigla}</span><span class="leg-nome">${d.nome}${d.extra ? `<small>${d.extra}</small>` : ''}</span><span class="leg-desc">${d.resumo}</span>${ic('seta', 'ic leg-seta')}</a>`).join('')}</div>
</div></section>
<section class="parc-b"><div class="in">
  <div class="cab"><p class="sobre">Alguns dos nossos parceiros</p><h2>${T.parceirosIntro.replace(':', '.')}</h2></div>
  <ul class="parc-tab">${parceiros.map((p, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${p}</li>`).join('')}</ul>
</div></section>
${chamadaB()}`;
  },

  disciplina(d) {
    const i = disciplinas.indexOf(d);
    const ant = disciplinas[(i + disciplinas.length - 1) % disciplinas.length], prox = disciplinas[(i + 1) % disciplinas.length];
    return `<section class="capa capa-disc"><div class="in capa-in">
  <div><p class="migalha"><a href="/b/servicos/">Serviços</a> / ${d.nome}</p>
  <h1><span class="capa-sig">${d.sigla}</span>${d.nome}</h1>
  <p class="capa-sub">${d.resumo}</p></div>
  ${carimbo([['Disciplina', d.nome], ['Código', d.sigla], ['Folha', `${String(i + 1).padStart(2, '0')}/08`], ['Responsável', 'RTS Engenharia']])}
</div></section>
<section class="disc-b"><div class="in disc-b-grade">
  <div class="disc-b-sim">${ic(d.slug)}${d.foto ? img(d.foto, d.nome, d.foto.startsWith('losango') ? 'los' : '') : ''}</div>
  <div><h2>O que o projeto inclui</h2><ol class="itens-num">${d.itens.map((t, k) => `<li><span>${d.sigla}-${String(k + 1).padStart(2, '0')}</span>${t}</li>`).join('')}</ol>
  <div class="normas-b"><h3>Normas de referência</h3><p>${d.normas.join(' · ')}</p></div>
  <a class="btn" href="${waLink(`Olá! Vim pelo site do Grupo RTS e gostaria de um orçamento de projeto de ${d.nome}.`)}"${fora}>${ic('wa')} Pedir orçamento de ${d.nome}</a></div>
</div></section>
<nav class="disc-nav in" aria-label="Outras disciplinas"><a href="/b/servicos/${ant.slug}/"><small>Anterior</small>${ant.sigla} · ${ant.nome}</a><a href="/b/servicos/${prox.slug}/"><small>Próxima</small>${prox.sigla} · ${prox.nome}</a></nav>
${chamadaB()}`;
  },

  'quem-somos'() {
    return `${capaB('Quem Somos', 'Desde 1994 em Salvador', T.empenho, [['Folha', '03/04'], ['Fundação', E.fundacao], ['Sede', 'Vila Laura'], ['Cidade', 'Salvador · BA']])}
<section class="hist-b"><div class="in hist-b-grade">
  <figure>${img('obra-casa', 'Engenheiro com projeto em frente a uma casa em obra')}</figure>
  <div><p class="lead">${T.mercado}</p><p>${T.metodos}</p><p>${T.objetivo} ${T.qualidade}</p></div>
</div></section>
<section class="cotas"><div class="in cotas-grade">
  <div><b>1994</b><span>constituída em maio</span></div>
  <div><b>30+</b><span>anos de projetos</span></div>
  <div><b>08</b><span>disciplinas</span></div>
  <div><b>09</b><span>parceiros recomendados</span></div>
</div></section>
<section class="legenda"><div class="in">
  <div class="cab"><p class="sobre">Projetos de instalações</p><h2>Atendemos clientes e parceiros em</h2></div>
  <div class="leg-chips">${disciplinas.map(d => `<a href="/b/servicos/${d.slug}/">${ic(d.slug)}<b>${d.sigla}</b>${d.nome}</a>`).join('')}</div>
</div></section>
<section class="fluxo"><div class="in fluxo-grade">
  <div class="fluxo-cab"><p class="sobre">Como trabalhamos</p><h2>Método atualizado, prazo respeitado</h2></div>
  <ol class="trilho">${etapas.map(e => `<li><span class="no">${e.n}</span><div><h3>${e.titulo}</h3><p>${e.texto}</p></div></li>`).join('')}</ol>
</div></section>
${chamadaB()}`;
  },

  contatos() {
    return `${capaB('Contatos', 'Contate-nos', 'Telefone, WhatsApp ou formulário: respondemos em horário comercial.', [['Folha', '04/04'], ['CEP', E.cep], ['Endereço', E.endereco], ['Bairro', `${E.bairro}, Salvador`]])}
<section class="contato"><div class="in contato-grade">
  <div class="contato-form"><h2>Peça um orçamento</h2>${formContato()}</div>
  <div>${listaContatos()}${mapa()}</div>
</div></section>`;
  },
};

function capaB(rotulo, titulo, sub, linhas) {
  return `<section class="capa"><div class="in capa-in">
  <div><p class="sobre">${rotulo}</p><h1>${titulo}</h1><p class="capa-sub">${sub}</p></div>
  ${carimbo(linhas)}
</div></section>`;
}

function chamadaB() {
  return `<section class="chamada"><div class="in chamada-in">
  <h2>Vamos projetar as instalações da sua obra?</h2>
  <div class="acoes"><a class="btn" href="${waLink()}"${fora}>${ic('wa')} WhatsApp ${E.celular.txt}</a><a class="btn btn-linha-br" href="tel:${E.fones[0].href}">${ic('tel')} ${E.fones[0].txt}</a></div>
</div></section>`;
}

// ---------- montagem ----------
const descr = {
  index: 'Grupo RTS Engenharia de Instalações: consultorias, projetos e instalações elétricas, solares, hidráulicas, incêndio, GLP, telefonia, lógica e SPDA em Salvador desde 1994.',
  servicos: 'Projetos de instalações para as áreas pública e privada, também em BIM, e os parceiros da RTS Engenharia.',
  'quem-somos': 'A RTS Engenharia está no mercado desde 1994 em Salvador, voltada a projetos de instalações.',
  contatos: 'Endereço, telefones e WhatsApp da RTS Engenharia em Salvador.',
};

export function gerarVersao(v) {
  const V = v === 'a' ? A : B;
  const out = {};
  for (const n of nav) {
    const titulo = n.slug === 'index' ? `${E.completo} · Salvador` : `${n.nome} · ${E.curto}`;
    out[n.slug] = pagina(v, n.slug, n.caminho, titulo, descr[n.slug], V[n.slug]());
  }
  for (const d of disciplinas) {
    out[`servicos/${d.slug}`] = pagina(v, `servicos-${d.slug}`, `servicos/${d.slug}/`, `Projetos de ${d.nome} · ${E.curto}`, `${d.resumo} RTS Engenharia, Salvador.`, V.disciplina(d));
  }
  return out;
}
