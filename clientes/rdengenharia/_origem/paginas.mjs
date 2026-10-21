// Monta as páginas das versões A ("Moldura": fiel ao site atual, faixas e menu vermelhos, destaques à esquerda e o
// slideshow de 20 quadros à direita) e B ("Unifilar": folha de desenho técnico, serviços como circuitos de um quadro de
// distribuição, carimbo de prancha e a história numa linha unifilar). Estilos em public/assets/{base,a,b}.css.
import fs from 'node:fs';
import path from 'node:path';
import { empresa as E, slides, destaques, historia, clientes, clientesTexto, projetos, servicos, treinamento, servicosIntro } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const dir = path.dirname(new URL(import.meta.url).pathname);
const svgDe = (f, cls) => fs.readFileSync(path.join(dir, '../public/assets', f), 'utf8').replace('<svg ', `<svg aria-hidden="true" focusable="false" class="${cls}" `);

export const nomesVersao = { a: 'Moldura', b: 'Unifilar' };

const comPagina = servicos.filter(s => !s.semPagina);
const caminhoServ = s => s.grupo === 'projetos' ? 'projetos/3d/' : `${s.grupo}/${s.slug}/`;
const deGrupo = g => comPagina.filter(s => s.grupo === g);
const nomeCurto = s => s.curto || s.t;

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'projetos', nome: 'Projetos', caminho: 'projetos/', sub: [{ nome: 'Todos os projetos', caminho: 'projetos/' }, { nome: 'Projetos em 3D', caminho: 'projetos/3d/' }] },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/', sub: deGrupo('servicos').map(s => ({ nome: nomeCurto(s), caminho: caminhoServ(s) })) },
  { slug: 'energia', nome: 'Energia', caminho: 'energia/', sub: deGrupo('energia').map(s => ({ nome: nomeCurto(s), caminho: caminhoServ(s) })) },
  { slug: 'treinamentos', nome: 'Treinamentos', caminho: 'treinamentos/' },
  { slug: 'clientes', nome: 'Clientes', caminho: 'clientes/' },
  { slug: 'historia', nome: 'História', caminho: 'historia/' },
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
  fb: '<path d="M14 21v-7h3l.5-3.5H14V8.6c0-1 .3-1.7 1.8-1.7h1.8V3.8A24 24 0 0015 3.6c-2.6 0-4.4 1.6-4.4 4.5v2.4H7.6V14h3v7"/>',
  ig: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.3 6.7h.01" stroke-width="2.4"/>',
  raio: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const img = (n, alt = '', extra = '') => `<img src="/assets/img/${n}${/\.\w+$/.test(n) ? '' : '.webp'}" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const fora = ' target="_blank" rel="noopener"';

// corpo: '## ' subtítulo, '- ' item, '> ' destaque, resto parágrafo
function corpo(linhas) {
  let h = '', lista = false;
  for (const l of linhas) {
    if (l.startsWith('- ')) { if (!lista) { h += '<ul class="lista">'; lista = true; } h += `<li>${esc(l.slice(2).replace(/;$|\.$/, ''))}</li>`; continue; }
    if (lista) { h += '</ul>'; lista = false; }
    if (l.startsWith('## ')) h += `<h2>${esc(l.slice(3))}</h2>`;
    else if (l.startsWith('> ')) h += `<p class="nota">${esc(l.slice(2))}</p>`;
    else h += `<p>${esc(l)}</p>`;
  }
  if (lista) h += '</ul>';
  return h;
}

// ---------- moldura comum ----------
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
<meta name="theme-color" content="#ED1C24">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,500;0,600;0,700;0,800;1,600;1,700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

function menu(v, atual) {
  return nav.map(n => {
    const ativo = n.slug === atual ? ' aria-current="page"' : '';
    if (!n.sub) return `<li><a href="/${v}/${n.caminho}"${ativo}>${n.nome}</a></li>`;
    return `<li class="tem-sub"><a href="/${v}/${n.caminho}"${ativo}>${n.nome}</a><ul class="sub">${n.sub.map(s => `<li><a href="/${v}/${s.caminho}">${esc(s.nome)}</a></li>`).join('')}</ul></li>`;
  }).join('');
}

function topoA(atual) {
  return `<body class="va">
<a class="pular" href="#conteudo">Ir para o conteúdo</a>
<div class="faixa"></div>
<header class="topo">
  <div class="in topo-in">
    <a class="marca" href="/a/" aria-label="${E.nome}, início">${svgDe('logo.svg', 'logo')}${svgDe('desde.svg', 'desde')}</a>
    <div class="topo-contato">
      <a href="tel:${E.telHref}">${ic('tel')}${E.tel}</a>
      <a href="mailto:${E.email}">${ic('mail')}${E.email}</a>
      <a class="btn" href="/a/contato/">Solicite um orçamento</a>
    </div>
    <button class="abre-menu" aria-label="Abrir menu" aria-expanded="false">${ic('menu')}</button>
  </div>
  <nav class="menu" aria-label="Principal"><ul class="in">${menu('a', atual)}</ul></nav>
</header>
<main id="conteudo">`;
}

function topoB(atual) {
  return `<body class="vb">
<a class="pular" href="#conteudo">Ir para o conteúdo</a>
<header class="topo">
  <div class="in topo-in">
    <a class="marca" href="/b/" aria-label="${E.nome}, início">${svgDe('logo.svg', 'logo')}</a>
    <nav class="menu" aria-label="Principal"><ul>${menu('b', atual)}</ul></nav>
    <a class="btn btn-linha" href="/b/contato/">Orçamento</a>
    <button class="abre-menu" aria-label="Abrir menu" aria-expanded="false">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">`;
}

const ano = new Date().getFullYear();
function rodape(v) {
  const col = (t, itens) => `<div><h3>${t}</h3><ul>${itens.map(s => `<li><a href="/${v}/${caminhoServ(s)}">${esc(nomeCurto(s))}</a></li>`).join('')}</ul></div>`;
  return `</main>
<footer class="rodape">
  <div class="in rodape-in">
    <div class="rodape-marca">
      <a href="/${v}/" aria-label="${E.nome}">${svgDe(v === 'a' ? 'logo.svg' : 'logo-branco.svg', 'logo')}</a>
      <p>Projetos, laudos, estudos e treinamentos em engenharia elétrica. Caxias do Sul, desde ${E.fundacao}.</p>
      <p class="redes"><a href="${E.facebook}"${fora} aria-label="Facebook">${ic('fb')}</a><a href="${E.instagram}"${fora} aria-label="Instagram">${ic('ig')}</a></p>
    </div>
    ${col('Serviços', deGrupo('servicos').slice(0, 7))}
    ${col('Energia e projetos', [...deGrupo('energia'), ...deGrupo('projetos')])}
    <div><h3>Contato</h3><ul class="rodape-contato">
      <li>${ic('pin')}<span>${E.endereco}<br>${E.cidade}, CEP ${E.cep}</span></li>
      <li>${ic('tel')}<a href="tel:${E.telHref}">${E.tel}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    </ul></div>
  </div>
  <div class="in rodape-fim"><span>© ${ano} ${E.completo}</span><a href="/">Ver as duas versões</a></div>
</footer>
${v === 'a' ? '<div class="faixa"></div>' : ''}
</body>
</html>`;
}

const pagina = (v, atual, caminho, titulo, desc, miolo) =>
  head(v, caminho, titulo, desc) + (v === 'a' ? topoA(atual) : topoB(atual)) + miolo + rodape(v);

// ---------- blocos usados nas duas ----------
function formContato(v) {
  return `<form class="form" data-mailto="${E.email}">
  <div class="campos">
    <label>Nome<input name="nome" required autocomplete="name"></label>
    <label>Empresa<input name="empresa" autocomplete="organization"></label>
    <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
    <label>Telefone<input name="telefone" autocomplete="tel"></label>
    <label class="largo">Assunto<select name="assunto"><option>Projeto elétrico</option>${comPagina.map(s => `<option>${esc(nomeCurto(s))}</option>`).join('')}<option>Treinamento NR-10</option><option>Outro assunto</option></select></label>
    <label class="largo">Mensagem<textarea name="mensagem" rows="5" required></textarea></label>
  </div>
  <button class="btn" type="submit">Enviar mensagem ${ic('seta')}</button>
  <p class="form-obs">A mensagem abre no seu programa de e-mail, endereçada a ${E.email}.</p>
</form>`;
}

function contatoLista() {
  return `<ul class="contato-lista">
  <li>${ic('pin')}<div><b>Onde nos encontrar</b><span>${E.endereco}<br>${E.cidade}, CEP ${E.cep}</span><a href="${E.mapa}"${fora}>Abrir no mapa</a></div></li>
  <li>${ic('tel')}<div><b>Telefone</b><a href="tel:${E.telHref}">${E.tel}</a></div></li>
  <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
</ul>`;
}

function galeria(nomes, titulo, cls = 'galeria') {
  if (!nomes || !nomes.length) return '';
  return `<div class="${cls}">${nomes.map(n => `<figure>${img(n, titulo)}</figure>`).join('')}</div>`;
}

// =====================================================================
// VERSÃO A · Moldura
// =====================================================================
function inicioA() {
  const dest = destaques.map(d => `<li><a href="/a/${d.grupo}/${d.slug}/">${img(d.img, d.t)}<span><b>${esc(d.t)}</b><small>${esc(d.s)}</small><em>detalhes ${ic('seta')}</em></span></a></li>`).join('');
  const sl = slides.map((s, i) => `<figure class="slide${i === 0 ? ' ativo' : ''}" data-i="${i}">${img(s.img, s.t, i === 0 ? ' loading="eager" fetchpriority="high"' : '')}<figcaption>${esc(s.t)}</figcaption></figure>`).join('');
  const lista = servicos.filter(s => s.grupo === 'servicos');
  return pagina('a', 'index', '', `${E.nome} · Caxias do Sul desde ${E.fundacao}`, 'Projetos elétricos, laudos, SPDA, NR-10, termografia, qualidade de energia e treinamentos. Engenharia elétrica em Caxias do Sul desde 1980.', `
<section class="hero">
  <div class="in">
    <h1 class="hero-titulo">Engenharia elétrica em Caxias do Sul <span>desde ${E.fundacao}</span></h1>
    <div class="hero-grade">
      <div class="quadro destaques"><ul>${dest}</ul></div>
      <div class="quadro show" data-show>
        <div class="show-palco">${sl}</div>
        <div class="show-barra">
          <button class="show-ant" aria-label="Quadro anterior">${ic('esq')}</button>
          <span class="show-cont"><b>01</b>/${String(slides.length).padStart(2, '0')}</span>
          <button class="show-prox" aria-label="Próximo quadro">${ic('dir')}</button>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="atalhos">
  <div class="in atalhos-grade">
    <p class="rotulo">Destaques</p>
    <a class="atalho" href="/a/projetos/3d/">${img('3d-predio', 'Projeto elétrico em 3D')}<span><b>Projetos 3D</b>Visite a obra antes de executá-la, com relação de materiais e memorial.</span></a>
    <a class="atalho" href="/a/servicos/inspecao-spda/">${img('inspecao-silo', 'Inspeção de SPDA com drone')}<span><b>Inspeção com drone</b>Os pontos mais remotos da instalação, com mínima intervenção e máxima segurança.</span></a>
  </div>
</section>

<section class="numeros">
  <div class="in numeros-in">
    <div><b>${E.fundacao}</b><span>fundada por dois engenheiros eletricistas</span></div>
    <div><b>1.200+</b><span>obras de redes e subestações até 1995</span></div>
    <div><b>25 kV</b><span>subestações e redes projetadas e executadas</span></div>
    <div><b>NR-10</b><span>prontuário, laudos e treinamentos</span></div>
  </div>
</section>

<section class="sec">
  <div class="in">
    <div class="sec-topo"><h2>Serviços</h2><p>${esc(servicosIntro[1])}</p></div>
    <ol class="tabela-serv">${lista.map((s, i) => `<li>${s.semPagina ? '<div class="ts-linha">' : `<a class="ts-linha" href="/a/${caminhoServ(s)}">`}<span class="ts-n">${String(i + 1).padStart(2, '0')}</span><b>${esc(nomeCurto(s))}</b><span class="ts-d">${esc(s.resumo)}</span>${s.semPagina ? '</div>' : `${ic('seta')}</a>`}</li>`).join('')}</ol>
  </div>
</section>

<section class="sec energia-a">
  <div class="in energia-grade">
    <figure>${img('usina-solar-drone', 'Usina fotovoltaica vista do drone')}</figure>
    <div>
      <p class="rotulo">Energia</p>
      <h2>Qualidade, gestão e geração de energia</h2>
      <p>Monitoramos o comportamento da energia dentro da unidade consumidora, orientamos sobre tarifário, demanda contratada e mercado livre, e projetamos sistemas fotovoltaicos do estudo ao monitoramento.</p>
      <ul class="links-seta">${deGrupo('energia').map(s => `<li><a href="/a/${caminhoServ(s)}">${esc(nomeCurto(s))}${ic('seta')}</a></li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="sec historia-a">
  <div class="in historia-grade">
    <div>
      <p class="rotulo">História</p>
      <h2>Mais de 40 anos de engenharia elétrica</h2>
      <p>${esc(historia.abre.split('. ').slice(0, 3).join('. '))}.</p>
      <a class="btn btn-linha" href="/a/historia/">Conheça a história ${ic('seta')}</a>
    </div>
    <figure>${img('linhas-transmissao', 'Linhas de transmissão ao entardecer')}</figure>
  </div>
</section>

<section class="sec clientes-a">
  <div class="in">
    <div class="sec-topo"><h2>Clientes</h2><p>${esc(clientesTexto[2])}</p></div>
    <ul class="logos">${clientes.map(c => `<li>${img(c.img, c.nome)}</li>`).join('')}</ul>
  </div>
</section>

<section class="chamada">
  <div class="in chamada-in">
    <h2>Seu projeto, nosso desafio.</h2>
    <p>Fale com a equipe da RD sobre projetos, laudos, estudos ou treinamentos.</p>
    <div class="chamada-acoes"><a class="btn btn-branco" href="/a/contato/">Solicite um orçamento</a><a class="chamada-tel" href="tel:${E.telHref}">${ic('tel')}${E.tel}</a></div>
  </div>
</section>`);
}

function cabecalhoA(trilha, titulo, sub) {
  return `<section class="cab">
  <div class="in">
    <p class="trilha"><a href="/a/">Início</a>${trilha.map(([n, c]) => ` / ${c ? `<a href="/a/${c}">${esc(n)}</a>` : esc(n)}`).join('')}</p>
    <h1>${esc(titulo)}</h1>
    ${sub ? `<p class="cab-sub">${esc(sub)}</p>` : ''}
  </div>
</section>`;
}

function lateralA(s) {
  const irmaos = comPagina.filter(x => x.grupo === s.grupo && x.slug !== s.slug);
  return `<aside class="lateral">
  <div class="quadro"><h3>Veja também</h3><ul class="links-seta">${irmaos.map(x => `<li><a href="/a/${caminhoServ(x)}">${esc(nomeCurto(x))}${ic('seta')}</a></li>`).join('')}</ul></div>
  <div class="quadro quadro-vermelho"><h3>Para maiores informações</h3><p>Fale com a RD sobre ${esc(nomeCurto(s).toLowerCase())}.</p><a class="btn btn-branco" href="/a/contato/">Contate-nos</a><a class="lat-tel" href="tel:${E.telHref}">${E.tel}</a></div>
</aside>`;
}

function servicoA(s) {
  const grupoNome = { servicos: ['Serviços', 'servicos/'], energia: ['Energia', 'energia/'], projetos: ['Projetos', 'projetos/'] }[s.grupo];
  return pagina('a', s.grupo, caminhoServ(s), `${s.t} · ${E.nome}`, s.resumo, `
${cabecalhoA([grupoNome, [nomeCurto(s)]], s.t, s.resumo)}
<section class="sec">
  <div class="in miolo">
    <article class="texto">
      <figure class="foto-abre">${img(s.img, s.t)}</figure>
      ${corpo(s.corpo)}
      ${galeria(s.fotos, s.t)}
    </article>
    ${lateralA(s)}
  </div>
</section>`);
}

function grupoA(g, titulo, intro) {
  const itens = deGrupo(g);
  return pagina('a', g, `${g}/`, `${titulo} · ${E.nome}`, intro, `
${cabecalhoA([[titulo]], titulo, intro)}
<section class="sec">
  <div class="in">
    <ul class="grade-serv">${itens.map(s => `<li><a href="/a/${caminhoServ(s)}"><figure>${img(s.img, s.t)}</figure><b>${esc(nomeCurto(s))}</b><span>${esc(s.resumo)}</span><em>detalhes ${ic('seta')}</em></a></li>`).join('')}</ul>
    ${g === 'servicos' ? `<div class="aviso"><b>Gerenciamento de obras.</b> ${esc(servicos.find(x => x.slug === 'gerenciamento').texto)}</div><p class="aviso-fim">Se o serviço que você procura não está listado acima, <a href="/a/contato/">consulte-nos</a>.</p>` : ''}
  </div>
</section>`);
}

function projetosA() {
  return pagina('a', 'projetos', 'projetos/', `Projetos · ${E.nome}`, projetos.abre, `
${cabecalhoA([['Projetos']], 'Projetos', projetos.abre)}
<section class="sec">
  <div class="in">
    <p class="lead">${esc(projetos.texto)}</p>
    <a class="faixa-3d" href="/a/projetos/3d/">${img('3d-planta-1', 'Projeto elétrico em 3D')}<span><b>Projetos elétricos em 3D</b>Método próprio: o cliente visita a obra antes de executá-la. ${ic('seta')}</span></a>
    <div class="tipos">${projetos.tipos.map(t => `<article class="tipo">
      <figure>${img(t.img, t.t)}</figure>
      <div>
        <h2>${esc(t.t)}</h2>${t.sub ? `<p class="tipo-sub">${esc(t.sub)}</p>` : ''}
        <ul class="lista">${t.itens.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
        <p>${esc(t.norma)}</p>
        <p class="exemplos"><b>Exemplos:</b> ${t.ex.map(esc).join(' · ')}</p>
      </div>
    </article>`).join('')}</div>
  </div>
</section>`);
}

function treinamentosA() {
  const T = treinamento;
  return pagina('a', 'treinamentos', 'treinamentos/', `Treinamentos NR-10 · ${E.nome}`, T.abre[0], `
${cabecalhoA([['Treinamentos']], 'Treinamentos em NR-10', 'Segurança em instalações e serviços em eletricidade, na RD ou in company.')}
<section class="sec">
  <div class="in miolo">
    <article class="texto">
      ${T.abre.map(p => `<p>${esc(p)}</p>`).join('')}
      <h2>Cursos oferecidos</h2>
      <div class="cursos">${T.cursos.map(c => `<div class="curso"><span class="curso-n">${c.n}</span><div><h3>${esc(c.t)}</h3><p class="curso-h">${esc(c.h)}</p><p>${esc(c.d)}</p><p class="curso-p"><b>Público:</b> ${esc(c.p)}</p></div></div>`).join('')}</div>
      <h2>Corpo técnico</h2>
      <ul class="lista">${T.corpo.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
      <p class="nota">Regulamentação: ${esc(T.regulamentacao)}</p>
    </article>
    <aside class="lateral">
      <figure class="quadro foto-lat">${img('nr10-campo', 'Trabalho em instalação elétrica com NR-10')}</figure>
      <div class="quadro quadro-vermelho"><h3>Turmas e in company</h3><p>Consulte datas das turmas ou leve o curso para a sua empresa.</p><a class="btn btn-branco" href="/a/contato/">Consulte-nos</a><a class="lat-tel" href="tel:${E.telHref}">${E.tel}</a></div>
    </aside>
  </div>
</section>`);
}

function historiaA() {
  return pagina('a', 'historia', 'historia/', `História · ${E.nome}`, historia.abre.slice(0, 155), `
${cabecalhoA([['História']], 'História', `Fundada em ${E.fundacao}, em Caxias do Sul, por dois engenheiros eletricistas.`)}
<section class="sec">
  <div class="in historia-pag">
    <figure class="foto-abre">${img('linhas-transmissao', 'Linhas de transmissão')}</figure>
    <p class="lead">${esc(historia.abre)}</p>
    <ol class="linha-tempo">${historia.marcos.map(m => `<li><span class="lt-ano">${m.ano}</span><div><h3>${esc(m.t)}</h3><p>${esc(m.d)}</p></div></li>`).join('')}</ol>
  </div>
</section>`);
}

function clientesA() {
  return pagina('a', 'clientes', 'clientes/', `Clientes · ${E.nome}`, clientesTexto[0], `
${cabecalhoA([['Clientes']], 'Clientes', 'O maior patrimônio cultivado pela nossa empresa.')}
<section class="sec">
  <div class="in estreito">
    ${clientesTexto.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${esc(p)}</p>`).join('')}
    <ul class="logos logos-grandes">${clientes.map(c => `<li>${img(c.img, c.nome)}</li>`).join('')}</ul>
  </div>
</section>`);
}

function contatoA() {
  return pagina('a', 'contato', 'contato/', `Contato · ${E.nome}`, `${E.endereco}, ${E.cidade}. Telefone ${E.tel}.`, `
${cabecalhoA([['Contato']], 'Contato', 'Fale conosco: respondemos sobre projetos, laudos, estudos e treinamentos.')}
<section class="sec">
  <div class="in contato-grade">
    <div class="quadro">${contatoLista()}</div>
    <div class="quadro"><h2>Fale conosco</h2>${formContato('a')}</div>
  </div>
</section>`);
}

// =====================================================================
// VERSÃO B · Unifilar
// =====================================================================
const disjuntor = '<svg class="dj" viewBox="0 0 40 24" aria-hidden="true"><path d="M0 12h12M28 12h12" /><path d="M12 12l14-8" /><circle cx="12" cy="12" r="2" /><circle cx="28" cy="12" r="2" /></svg>';

function carimbo(linhas) {
  return `<dl class="carimbo">${linhas.map(([k, val]) => `<div><dt>${k}</dt><dd>${val}</dd></div>`).join('')}</dl>`;
}

function inicioB() {
  const circuitos = servicos.filter(s => s.grupo !== 'projetos');
  return pagina('b', 'index', '', `${E.nome} · Caxias do Sul desde ${E.fundacao}`, 'Projetos elétricos, laudos, SPDA, NR-10, termografia, qualidade de energia e treinamentos. Engenharia elétrica em Caxias do Sul desde 1980.', `
<section class="hero-b">
  <div class="in hero-b-grade">
    <div class="hero-b-txt">
      <p class="cota">Caxias do Sul · RS · desde ${E.fundacao}</p>
      <h1>Engenharia pura e aplicada.</h1>
      <p class="hero-b-sub">Projetos de média e baixa tensão, SPDA, laudos NR-10, termografia, qualidade de energia e treinamentos, com memorial descritivo, relação de materiais e ART.</p>
      <div class="acoes"><a class="btn" href="/b/contato/">Solicite um orçamento ${ic('seta')}</a><a class="btn btn-linha" href="/b/servicos/">Ver os serviços</a></div>
    </div>
    <figure class="prancha">
      <span class="canto c1"></span><span class="canto c2"></span><span class="canto c3"></span><span class="canto c4"></span>
      ${img('captor-franklin-silo', 'Captor Franklin no topo de um silo, fotografado por drone', ' loading="eager" fetchpriority="high"')}
      <figcaption><span>Fig. 01</span> Captor Franklin: inspeção detalhada com drone</figcaption>
    </figure>
  </div>
  <div class="in">${carimbo([['Empresa', E.completo], ['Fundação', `${E.fundacao}, por dois engenheiros eletricistas`], ['Obras até 1995', 'mais de 1.200'], ['Tensão', 'redes e subestações até 25 kV'], ['Normas', 'NBR 5410 · 14039 · 5419 · NR-10']])}</div>
</section>

<section class="sec">
  <div class="in">
    <div class="sec-topo"><p class="cota">Quadro de serviços</p><h2>Um circuito para cada necessidade da sua instalação</h2></div>
    <div class="quadro-dist">
      <div class="barramento"><span class="qg">QGBT</span><span class="qg-sub">RD Engenharia</span></div>
      <ol class="circuitos">${circuitos.map((s, i) => {
        const tag = s.semPagina ? 'div' : 'a';
        const href = s.semPagina ? '' : ` href="/b/${caminhoServ(s)}"`;
        return `<li><${tag} class="circ"${href}><span class="circ-n">C${String(i + 1).padStart(2, '0')}</span>${disjuntor}<span class="circ-t"><b>${esc(nomeCurto(s))}</b><small>${esc(s.resumo)}</small></span>${s.semPagina ? '' : ic('seta')}</${tag}></li>`;
      }).join('')}</ol>
    </div>
  </div>
</section>

<section class="sec sec-3d">
  <div class="in">
    <div class="sec-topo sec-topo-lado"><div><p class="cota">Projetos em 3D</p><h2>Visite a obra antes de executá-la</h2></div><a class="btn btn-linha" href="/b/projetos/3d/">Como funciona ${ic('seta')}</a></div>
  </div>
  <div class="trilho" tabindex="0" aria-label="Imagens de projetos em 3D">${slides.filter(s => s.img.startsWith('3d-')).map((s, i) => `<figure>${img(s.img, s.t)}<figcaption><span>Fig. ${String(i + 2).padStart(2, '0')}</span> ${esc(s.t)}</figcaption></figure>`).join('')}</div>
</section>

<section class="sec escuro">
  <div class="in energia-b">
    <div>
      <p class="cota">Energia</p>
      <h2>Medir, entender e reduzir o custo da energia</h2>
      <p>Analisadores de qualidade de energia, estudos de harmônicas, gestão de demanda e mercado livre, eficiência energética e sistemas fotovoltaicos.</p>
      <ul class="links-seta">${deGrupo('energia').map(s => `<li><a href="/b/${caminhoServ(s)}">${esc(nomeCurto(s))}${ic('seta')}</a></li>`).join('')}</ul>
    </div>
    <figure class="energia-fotos">${img('onda-harmonica', 'Tela de analisador com as três fases')}${img('usina-solar-drone', 'Usina fotovoltaica vista do drone')}</figure>
  </div>
</section>

<section class="sec">
  <div class="in">
    <div class="sec-topo"><p class="cota">Linha do tempo</p><h2>De redes de 25 kV à inspeção com drone</h2></div>
    <ol class="unifilar">${historia.marcos.map(m => `<li><span class="u-no"></span><b>${m.ano}</b><h3>${esc(m.t)}</h3><p>${esc(m.r)}</p></li>`).join('')}</ol>
    <p class="centro"><a class="btn btn-linha" href="/b/historia/">História completa ${ic('seta')}</a></p>
  </div>
</section>

<section class="sec clientes-b">
  <div class="in clientes-b-grade">
    <div><p class="cota">Clientes</p><h2>Relações baseadas em transparência e eficiência</h2><p>${esc(clientesTexto[2])}</p></div>
    <ul class="logos">${clientes.map(c => `<li>${img(c.img, c.nome)}</li>`).join('')}</ul>
  </div>
</section>

<section class="sec">
  <div class="in contato-b">
    <div><p class="cota">Contato</p><h2>Seu projeto, nosso desafio.</h2>${contatoLista()}</div>
    <div class="folha">${formContato('b')}</div>
  </div>
</section>`);
}

function cabecalhoB(trilha, titulo, sub, folha) {
  return `<section class="cab-b">
  <div class="in">
    <p class="trilha"><a href="/b/">Início</a>${trilha.map(([n, c]) => ` <span>›</span> ${c ? `<a href="/b/${c}">${esc(n)}</a>` : esc(n)}`).join('')}</p>
    <h1>${esc(titulo)}</h1>
    ${sub ? `<p class="cab-sub">${esc(sub)}</p>` : ''}
    ${folha ? `<p class="folha-n">${folha}</p>` : ''}
  </div>
</section>`;
}

function lateralB(s) {
  const irmaos = comPagina.filter(x => x.grupo === s.grupo && x.slug !== s.slug);
  return `<aside class="lateral">
  <div class="lat-bloco"><h3>Circuitos relacionados</h3><ul class="lat-circ">${irmaos.map(x => `<li><a href="/b/${caminhoServ(x)}">${disjuntor}<span>${esc(nomeCurto(x))}</span></a></li>`).join('')}</ul></div>
  <div class="lat-bloco lat-contato"><h3>Para maiores informações</h3><a class="btn" href="/b/contato/">Contate-nos ${ic('seta')}</a><a href="tel:${E.telHref}">${ic('tel')}${E.tel}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></div>
</aside>`;
}

function figurasB(nomes, titulo, ini = 2) {
  if (!nomes || !nomes.length) return '';
  return `<div class="figuras">${nomes.map((n, i) => `<figure>${img(n, titulo)}<figcaption><span>Fig. ${String(i + ini).padStart(2, '0')}</span> ${esc(titulo)}</figcaption></figure>`).join('')}</div>`;
}

function servicoB(s) {
  const grupoNome = { servicos: ['Serviços', 'servicos/'], energia: ['Energia', 'energia/'], projetos: ['Projetos', 'projetos/'] }[s.grupo];
  const n = servicos.filter(x => x.grupo !== 'projetos').indexOf(s);
  return pagina('b', s.grupo, caminhoServ(s), `${s.t} · ${E.nome}`, s.resumo, `
${cabecalhoB([grupoNome, [nomeCurto(s)]], s.t, s.resumo, n >= 0 ? `Circuito C${String(n + 1).padStart(2, '0')}` : 'Projetos')}
<section class="sec sec-miolo">
  <div class="in miolo">
    <article class="texto">
      <figure class="prancha prancha-p"><span class="canto c1"></span><span class="canto c2"></span><span class="canto c3"></span><span class="canto c4"></span>${img(s.img, s.t)}<figcaption><span>Fig. 01</span> ${esc(nomeCurto(s))}</figcaption></figure>
      ${corpo(s.corpo)}
      ${figurasB(s.fotos, nomeCurto(s))}
    </article>
    ${lateralB(s)}
  </div>
</section>`);
}

function grupoB(g, titulo, intro) {
  const itens = deGrupo(g);
  const todos = servicos.filter(x => x.grupo !== 'projetos');
  return pagina('b', g, `${g}/`, `${titulo} · ${E.nome}`, intro, `
${cabecalhoB([[titulo]], titulo, intro)}
<section class="sec sec-miolo">
  <div class="in">
    <div class="quadro-dist">
      <div class="barramento"><span class="qg">${g === 'energia' ? 'QE' : 'QGBT'}</span><span class="qg-sub">${titulo}</span></div>
      <ol class="circuitos circuitos-foto">${(g === 'servicos' ? servicos.filter(x => x.grupo === 'servicos') : itens).map(s => {
        const tag = s.semPagina ? 'div' : 'a';
        const href = s.semPagina ? '' : ` href="/b/${caminhoServ(s)}"`;
        return `<li><${tag} class="circ"${href}><span class="circ-n">C${String(todos.indexOf(s) + 1).padStart(2, '0')}</span>${disjuntor}${img(s.img, s.t)}<span class="circ-t"><b>${esc(nomeCurto(s))}</b><small>${esc(s.resumo)}</small></span>${s.semPagina ? '' : ic('seta')}</${tag}></li>`;
      }).join('')}</ol>
    </div>
    ${g === 'servicos' ? `<p class="centro nota-fim">Se o serviço que você procura não está listado acima, <a href="/b/contato/">consulte-nos</a>.</p>` : ''}
  </div>
</section>`);
}

function projetosB() {
  return pagina('b', 'projetos', 'projetos/', `Projetos · ${E.nome}`, projetos.abre, `
${cabecalhoB([['Projetos']], 'Projetos', projetos.abre)}
<section class="sec sec-miolo">
  <div class="in">
    <div class="duas"><p class="lead">${esc(projetos.texto)}</p>${carimbo([['Entrega', 'memorial técnico descritivo'], ['Materiais', 'relação completa'], ['Responsabilidade', 'ART'], ['Visualização', 'plantas 2D e 3D']])}</div>
    <div class="tipos-b">${projetos.tipos.map((t, i) => `<article class="tipo-b">
      <figure class="prancha prancha-p"><span class="canto c1"></span><span class="canto c2"></span><span class="canto c3"></span><span class="canto c4"></span>${img(t.img, t.t)}<figcaption><span>Fig. ${String(i + 1).padStart(2, '0')}</span> ${esc(t.ex[0])}</figcaption></figure>
      <div>
        <p class="cota">Tipo ${String(i + 1).padStart(2, '0')}</p>
        <h2>${esc(t.t)}</h2>${t.sub ? `<p class="tipo-sub">${esc(t.sub)}</p>` : ''}
        <ul class="lista">${t.itens.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <p>${esc(t.norma)}</p>
        <p class="exemplos"><b>Exemplos</b>${t.ex.map(x => `<span>${esc(x)}</span>`).join('')}</p>
      </div>
    </article>`).join('')}</div>
    <a class="faixa-3d" href="/b/projetos/3d/">${img('3d-planta-1', 'Projeto elétrico em 3D')}<span><b>Projetos elétricos em 3D</b>Método próprio da RD. ${ic('seta')}</span></a>
  </div>
</section>`);
}

function treinamentosB() {
  const T = treinamento;
  return pagina('b', 'treinamentos', 'treinamentos/', `Treinamentos NR-10 · ${E.nome}`, T.abre[0], `
${cabecalhoB([['Treinamentos']], 'Treinamentos em NR-10', 'Segurança em instalações e serviços em eletricidade, na RD ou in company.')}
<section class="sec sec-miolo">
  <div class="in miolo">
    <article class="texto">
      ${T.abre.map(p => `<p>${esc(p)}</p>`).join('')}
      <h2>Cursos oferecidos</h2>
      <table class="tabela-cursos"><thead><tr><th>Nº</th><th>Curso</th><th>Carga</th></tr></thead><tbody>${T.cursos.map(c => `<tr><td>${c.n}</td><td><b>${esc(c.t)}</b><p>${esc(c.d)}</p><p class="curso-p">Público: ${esc(c.p)}</p></td><td>${esc(c.h)}</td></tr>`).join('')}</tbody></table>
      <h2>Corpo técnico</h2>
      <ul class="lista">${T.corpo.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
      <p class="nota">Regulamentação: ${esc(T.regulamentacao)}</p>
    </article>
    <aside class="lateral">
      <div class="lat-bloco lat-contato"><h3>Turmas e in company</h3><p>Consulte datas das turmas ou leve o curso para a sua empresa.</p><a class="btn" href="/b/contato/">Consulte-nos ${ic('seta')}</a><a href="tel:${E.telHref}">${ic('tel')}${E.tel}</a></div>
    </aside>
  </div>
</section>`);
}

function historiaB() {
  return pagina('b', 'historia', 'historia/', `História · ${E.nome}`, historia.abre.slice(0, 155), `
${cabecalhoB([['História']], 'História', `Fundada em ${E.fundacao}, em Caxias do Sul, por dois engenheiros eletricistas.`)}
<section class="sec sec-miolo">
  <div class="in">
    <div class="duas"><p class="lead">${esc(historia.abre)}</p><figure class="prancha prancha-p"><span class="canto c1"></span><span class="canto c2"></span><span class="canto c3"></span><span class="canto c4"></span>${img('linhas-transmissao', 'Linhas de transmissão')}<figcaption><span>Fig. 01</span> Redes de distribuição e subestações até 25 kV</figcaption></figure></div>
    <ol class="unifilar unifilar-vert">${historia.marcos.map(m => `<li><span class="u-no"></span><b>${m.ano}</b><h3>${esc(m.t)}</h3><p>${esc(m.d)}</p></li>`).join('')}</ol>
  </div>
</section>`);
}

function clientesB() {
  return pagina('b', 'clientes', 'clientes/', `Clientes · ${E.nome}`, clientesTexto[0], `
${cabecalhoB([['Clientes']], 'Clientes', 'O maior patrimônio cultivado pela nossa empresa.')}
<section class="sec sec-miolo">
  <div class="in duas">
    <div>${clientesTexto.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${esc(p)}</p>`).join('')}</div>
    <ul class="logos logos-folha">${clientes.map(c => `<li>${img(c.img, c.nome)}</li>`).join('')}</ul>
  </div>
</section>`);
}

function contatoB() {
  return pagina('b', 'contato', 'contato/', `Contato · ${E.nome}`, `${E.endereco}, ${E.cidade}. Telefone ${E.tel}.`, `
${cabecalhoB([['Contato']], 'Contato', 'Fale conosco: respondemos sobre projetos, laudos, estudos e treinamentos.')}
<section class="sec sec-miolo">
  <div class="in contato-b">
    <div>${contatoLista()}${carimbo([['Empresa', E.completo], ['Cidade', E.cidade], ['CEP', E.cep]])}</div>
    <div class="folha">${formContato('b')}</div>
  </div>
</section>`);
}

// ---------- montagem ----------
const intros = {
  servicos: servicosIntro[0] + ' ' + servicosIntro[1],
  energia: 'Qualidade de energia, gestão do consumo e da demanda e geração fotovoltaica.',
};

export function gerarVersao(v) {
  const A = v === 'a';
  const p = {
    index: A ? inicioA() : inicioB(),
    projetos: A ? projetosA() : projetosB(),
    servicos: A ? grupoA('servicos', 'Serviços', intros.servicos) : grupoB('servicos', 'Serviços', intros.servicos),
    energia: A ? grupoA('energia', 'Energia', intros.energia) : grupoB('energia', 'Energia', intros.energia),
    treinamentos: A ? treinamentosA() : treinamentosB(),
    clientes: A ? clientesA() : clientesB(),
    historia: A ? historiaA() : historiaB(),
    contato: A ? contatoA() : contatoB(),
  };
  for (const s of comPagina) p[caminhoServ(s).replace(/\/$/, '')] = A ? servicoA(s) : servicoB(s);
  return p;
}
