// Monta as páginas das versões A ("Biblioteca": fiel ao site atual, papel de parede marrom, faixas douradas com degradê
// nos títulos, "Quem somos" e "Andamento processual" lado a lado, rodapé marrom com o nome entre linhas pontilhadas) e
// B ("Andamento": mais clara e organizada em torno do caminho do cliente, títulos condensados como as faixas do site atual,
// as duas áreas numeradas e a linha do tempo do atendimento). Estilos em public/assets/{base,a,b}.css.
import { empresa as E, equipe, textos as T, areas, etapas, creditos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const semTag = s => s.replace(/<[^>]+>/g, '');

export const nomesVersao = { a: 'Biblioteca', b: 'Andamento' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'escritorio', nome: 'O escritório', caminho: 'escritorio/' },
  ...areas.map(a => ({ slug: a.slug, nome: a.nome, caminho: `${a.slug}/` })),
  { slug: 'andamento-processual', nome: 'Andamento processual', caminho: 'andamento-processual/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  cadeado: '<rect x="5" y="11" width="14" height="10" rx="1.5"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  doc: '<path d="M6 2.5h9l4 4v15H6z"/><path d="M15 2.5v4h4M9 11h7M9 14.5h7M9 18h4"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  estrela: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// a balança do ícone (favicon) do site atual, redesenhada em traço
export const balanca = (cls = 'balanca') => `<svg class="${cls}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="24" cy="7" r="2.2" fill="currentColor" stroke="none"/><path d="M24 9.5V40M8 13h32M17 43h14M20 40h8"/><path d="M11 13l-6 14M11 13l6 14M37 13l-6 14M37 13l6 14"/><path d="M4 27a7 4 0 0014 0zM30 27a7 4 0 0014 0z" fill="currentColor" fill-opacity=".18"/></svg>`;

const marca = (cls = '') => `<span class="marca ${cls}">${balanca()}<span class="marca-txt"><b>Vilela Peloso</b><small>Sociedade de Advogados</small></span></span>`;

const fora = ' target="_blank" rel="noopener"';
const ano = new Date().getFullYear();
const anos = 2026 - E.desde;

// ---------- moldura ----------
function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
  const fontes = v === 'a'
    ? 'family=Archivo:wght@500;600;700;800&family=Archivo+Narrow:wght@500;600&family=Source+Sans+3:wght@400;600'
    : 'family=Archivo:wght@600;700&family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600';
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
<meta name="theme-color" content="#32291E">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontes}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');

function topo(v, atual) {
  const linha = `<div class="linha-topo"><div class="in">
  <span>${ic('pin')}${E.endereco} · ${E.bairro} · ${E.cidade}</span>
  <span class="lt-dir"><a href="tel:${E.telHref}">${ic('tel')}${E.tel}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span>
</div></div>`;
  return `<body class="v-${v} p-${atual}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${v === 'a' ? linha : ''}
<header class="topo"><div class="in">
  <a class="topo-marca" href="/${v}/" aria-label="${E.completo}, início">${marca()}</a>
  <button class="menu-btn" aria-expanded="false" aria-controls="menu">${ic('menu')}<span>Menu</span></button>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
</div></header>
<main id="conteudo">`;
}

function rodape(v) {
  const cred = creditos.map(c => `<a href="${c[3]}"${fora}>${c[0]}</a> (${c[1]}, ${c[2]})`).join(' · ');
  return `</main>
<footer class="rodape">
  <div class="in">
    <div class="rod-nome"><span class="pontilhado"></span>${marca('marca-rod')}<span class="pontilhado"></span></div>
    <div class="rod-cols">
      <div><h2>Endereço</h2><p>${E.endereco} · ${E.bairro}<br>CEP ${E.cep} · ${E.cidade}</p><a href="${E.mapa}"${fora}>Ver no mapa ${ic('seta')}</a></div>
      <div><h2>Contato</h2><p><a href="tel:${E.telHref}">${E.tel}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
      <div><h2>Áreas</h2><p>${areas.map(a => `<a href="/${v}/${a.slug}/">${a.nome}</a>`).join('<br>')}</p></div>
      <div><h2>Clientes</h2><p><a href="/${v}/andamento-processual/">Andamento processual</a><br><a href="/${v}/contato/">Deixar uma mensagem</a></p></div>
    </div>
    <p class="rod-fim">© ${ano} ${E.completo} · ${E.marcaAtual} · desde ${E.desde}</p>
    <details class="creditos"><summary>Créditos das fotos</summary><p>${cred}</p></details>
  </div>
</footer>
</body>
</html>`;
}

const pagina = (v, slug, caminho, titulo, desc, corpo) => `${head(v, caminho, titulo, desc)}\n${topo(v, slug)}\n${corpo}\n${rodape(v)}`;

// ---------- blocos comuns ----------
const faixa = (txt, tag = 'h2', cls = '') => `<${tag} class="faixa-ouro ${cls}"><span>${txt}</span></${tag}>`;

const listaEquipe = cls => `<ul class="${cls}">${equipe.map(p => `<li><b>${p.nome}</b><span>${p.papel}</span>${p.nota ? `<small>${p.nota}</small>` : ''}</li>`).join('')}</ul>`;

const valores = cls => `<ul class="${cls}">${T.valores.map(x => `<li>${x}</li>`).join('')}</ul>`;

const etapasHtml = cls => `<ol class="${cls}" data-etapas>${etapas.map((e, i) => `<li><span class="et-n">${String(i + 1).padStart(2, '0')}</span><h3>${e[0]}</h3><p>${e[1]}</p></li>`).join('')}</ol>`;

const formContato = (v, assunto = '') => `<form class="form" data-form data-email="${E.email}">
  <div class="campo"><label for="f-nome">Nome</label><input id="f-nome" name="nome" autocomplete="name" required></div>
  <div class="campo-2">
    <div class="campo"><label for="f-tel">Telefone</label><input id="f-tel" name="telefone" type="tel" autocomplete="tel"></div>
    <div class="campo"><label for="f-mail">E-mail</label><input id="f-mail" name="email" type="email" autocomplete="email"></div>
  </div>
  <div class="campo"><label for="f-assunto">Assunto</label><select id="f-assunto" name="assunto">
    ${['Direito do Trabalho', 'Direito Previdenciário', 'Andamento processual (usuário e senha)', 'Outro assunto'].map(o => `<option${o === assunto ? ' selected' : ''}>${o}</option>`).join('')}
  </select></div>
  <div class="campo"><label for="f-msg">Mensagem</label><textarea id="f-msg" name="mensagem" rows="5" required></textarea></div>
  <button class="btn" type="submit">${ic('mail')}<span>Enviar mensagem</span></button>
  <p class="form-nota">O botão abre o seu programa de e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;

const mapa = () => `<div class="mapa"><iframe title="Mapa: ${E.endereco}, ${E.cidade}" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

const contatoLinhas = () => `<ul class="contato-linhas">
  <li>${ic('pin')}<div><b>${E.endereco}</b><span>${E.bairro} · CEP ${E.cep} · ${E.cidade}</span></div></li>
  <li>${ic('tel')}<div><b><a href="tel:${E.telHref}">${E.tel}</a></b><span>Telefone do escritório</span></div></li>
  <li>${ic('mail')}<div><b><a href="mailto:${E.email}">${E.email}</a></b><span>Também para pedir usuário e senha</span></div></li>
</ul>`;

const andamentoTexto = () => T.andamento.map(p => `<p>${p.replace('daniela@advribeirao.com.br', `<a href="mailto:${E.email}">${E.email}</a>`).replace('nossa página de cadastro', 'do formulário desta página')}</p>`).join('');

// ---------- versão A: Biblioteca ----------
function inicioA() {
  return `<section class="a-hero">
  <img class="a-hero-foto" src="/assets/img/livros-antigos.webp" alt="" fetchpriority="high">
  <div class="in a-hero-in">
    <p class="a-sobre">${E.marcaAtual} · desde ${E.desde}</p>
    <h1>Advocacia trabalhista e previdenciária em Ribeirão Preto.</h1>
    <p class="a-hero-sub">Há ${anos} anos em Ribeirão Preto, com agilidade, seriedade e acima de tudo justiça.</p>
    <div class="botoes"><a class="btn" href="/a/contato/">${ic('mail')}<span>Fale com o escritório</span></a><a class="btn btn-claro" href="/a/andamento-processual/">${ic('cadeado')}<span>Consultar andamento</span></a></div>
  </div>
  <a class="a-offline" href="/a/contato/">${ic('mail')}<span><b>Advocacia off-line</b>clique aqui para deixar uma mensagem</span></a>
</section>

<section class="a-par"><div class="in a-par-grade">
  <article class="a-caixa">
    ${faixa('Quem somos')}
    <div class="a-caixa-corpo">${T.quemSomos.map(p => `<p>${p}</p>`).join('')}
      <a class="link" href="/a/escritorio/">Conheça o escritório ${ic('seta')}</a></div>
  </article>
  <article class="a-caixa a-caixa-and">
    ${faixa('Andamento processual')}
    <div class="a-caixa-corpo">
      <p class="a-dest">Consulta on-line e gratuita aos andamentos dos seus processos.</p>
      <ul class="a-checks">${['Usuário e senha únicos para cada cliente', 'Atualizado a cada movimento relevante', 'Pedido de acesso por e-mail ou pelo site'].map(x => `<li>${ic('ok')}${x}</li>`).join('')}</ul>
      <a class="btn" href="/a/andamento-processual/">${ic('cadeado')}<span>Acessar ou pedir senha</span></a>
    </div>
  </article>
</div></section>

<section class="a-missao">
  <div class="a-missao-papel"></div>
  <div class="in a-missao-in">
    ${faixa('Missão')}
    <blockquote>${T.missao}</blockquote>
    ${valores('a-valores')}
  </div>
</section>

<section class="a-areas"><div class="in">
  <p class="olho">Áreas de atuação</p>
  <h2 class="tit">Duas frentes, a mesma dedicação desde ${E.desde}</h2>
  <div class="a-areas-grade">${areas.map((a, i) => `<a class="a-area${i ? ' a-area-inv' : ''}" href="/a/${a.slug}/">
    <img src="/assets/img/${a.foto}.webp" alt="" loading="lazy">
    <div><h3>${a.nome}</h3><p>${a.resumo}</p><ul>${a.temas.slice(0, 4).map(t => `<li>${t[0]}</li>`).join('')}</ul><span class="link">Ver a área ${ic('seta')}</span></div>
  </a>`).join('')}</div>
</div></section>

<section class="a-estante" aria-hidden="true"></section>

<section class="a-como"><div class="in">
  <p class="olho">Como trabalhamos</p>
  <h2 class="tit">Do primeiro atendimento ao andamento on-line</h2>
  ${etapasHtml('a-etapas')}
</div></section>

<section class="a-local"><div class="in a-local-grade">
  <figure><img src="/assets/img/theatro-pedro-ii.webp" alt="Theatro Pedro II, no Centro de Ribeirão Preto" loading="lazy"><figcaption>Theatro Pedro II, no Centro de Ribeirão Preto</figcaption></figure>
  <div>
    <p class="olho">Onde estamos</p>
    <h2 class="tit">No Centro de Ribeirão Preto</h2>
    ${contatoLinhas()}
    <div class="botoes"><a class="btn" href="/a/contato/">${ic('mail')}<span>Deixar uma mensagem</span></a><a class="btn btn-linha" href="${E.mapa}"${fora}>${ic('pin')}<span>Como chegar</span></a></div>
  </div>
</div></section>`;
}

function cabecaA(titulo, olho, foto = 'livros-antigos') {
  return `<section class="a-cabeca"><img src="/assets/img/${foto}.webp" alt=""><div class="in"><p class="a-sobre">${olho}</p><h1>${titulo}</h1></div></section>`;
}

// ---------- versão B: Andamento ----------
function inicioB() {
  return `<section class="b-hero"><div class="in b-hero-grade">
  <div class="b-hero-txt">
    <p class="olho">${E.completo}</p>
    <h1>Direito do trabalho e previdenciário, acompanhado de perto.</h1>
    <p class="b-hero-sub">Escritório fundado em ${E.desde} pela advogada Daniela Vilela Peloso Vasconcelos em Ribeirão Preto. Cada cliente acompanha o próprio processo on-line.</p>
    <div class="botoes"><a class="btn" href="/b/contato/">${ic('mail')}<span>Agendar uma conversa</span></a><a class="btn btn-linha" href="/b/andamento-processual/">${ic('cadeado')}<span>Andamento processual</span></a></div>
  </div>
  <div class="b-hero-foto">
    <img src="/assets/img/volumes.webp" alt="" fetchpriority="high">
    <div class="b-selo"><span class="b-selo-n">${E.desde}</span><span>Ribeirão Preto · SP</span></div>
  </div>
</div>
<div class="in b-fatos">
  <div><b>${anos} anos</b><span>em Ribeirão Preto</span></div>
  <div><b>2 áreas</b><span>trabalho e previdência</span></div>
  <div><b>3 advogados</b><span>e equipe de colaboradores</span></div>
  <div><b>${ic('estrela')}${E.google.nota}</b><span>no Google, ${E.google.avaliacoes} avaliações</span></div>
</div></section>

<section class="b-areas"><div class="in">
  <div class="b-sec-cab"><p class="olho">Áreas de atuação</p><h2 class="tit">Duas frentes principais</h2></div>
  <div class="b-areas-lista">${areas.map((a, i) => `<a class="b-area" href="/b/${a.slug}/">
    <span class="b-area-n">0${i + 1}</span>
    <div class="b-area-txt"><h3>${a.nome}</h3><p>${a.resumo}</p></div>
    <ul>${a.temas.map(t => `<li>${t[0]}</li>`).join('')}</ul>
    <span class="b-area-ir">${ic('seta')}</span>
  </a>`).join('')}</div>
</div></section>

<section class="b-caminho"><div class="in b-caminho-grade">
  <div class="b-caminho-cab">
    <p class="olho">O caminho do seu caso</p>
    <h2 class="tit">Cinco passos, do primeiro atendimento ao andamento on-line</h2>
    <p>Você sabe em que ponto está o processo sem precisar ligar: o escritório fornece usuário e senha e o andamento é atualizado a cada movimento relevante.</p>
    <a class="btn btn-claro" href="/b/andamento-processual/">${ic('cadeado')}<span>Pedir usuário e senha</span></a>
  </div>
  ${etapasHtml('b-etapas')}
</div></section>

<section class="b-escritorio"><div class="in b-esc-grade">
  <figure class="b-esc-foto"><img src="/assets/img/gabinete.webp" alt="" loading="lazy"></figure>
  <div>
    <p class="olho">O escritório</p>
    <h2 class="tit">Fundado em ${E.desde} por Daniela Vilela Peloso Vasconcelos</h2>
    ${listaEquipe('b-equipe')}
    <blockquote class="b-missao"><span>Missão</span>${T.missao}</blockquote>
    <a class="link" href="/b/escritorio/">Conheça o escritório ${ic('seta')}</a>
  </div>
</div></section>

<section class="b-contato"><div class="in b-contato-grade">
  <div>
    <p class="olho">Contato</p>
    <h2 class="tit">Fale com o escritório</h2>
    ${contatoLinhas()}
  </div>
  ${mapa()}
</div></section>`;
}

function cabecaB(titulo, olho, texto = '') {
  return `<section class="b-cabeca"><div class="in"><p class="olho">${olho}</p><h1>${titulo}</h1>${texto ? `<p class="b-cabeca-txt">${texto}</p>` : ''}</div></section>`;
}

// ---------- páginas internas (mesmo conteúdo, acabamento de cada versão) ----------
function escritorio(v) {
  const cab = v === 'a' ? cabecaA('O escritório', `${E.marcaAtual} · desde ${E.desde}`, 'biblioteca') : cabecaB('O escritório', E.completo, `Fundado em ${E.desde} em Ribeirão Preto, com atuação principal no direito do trabalho e previdenciário.`);
  return `${cab}
<section class="sec"><div class="in esc-grade">
  <div class="esc-texto">
    ${v === 'a' ? faixa('Quem somos') : '<p class="olho">Quem somos</p>'}
    ${T.quemSomos.map(p => `<p>${p}</p>`).join('')}
  </div>
  <aside class="esc-equipe">
    <h2 class="sub">Advogados</h2>
    ${listaEquipe('equipe')}
  </aside>
</div></section>
<section class="sec sec-escura"><div class="in esc-missao">
  ${v === 'a' ? faixa('Missão') : '<p class="olho">Missão</p>'}
  <blockquote>${T.missao}</blockquote>
  <h2 class="sub">O que guia o trabalho</h2>
  ${valores('valores')}
</div></section>
<section class="sec"><div class="in esc-linha">
  <figure><img src="/assets/img/quarteirao-paulista.webp" alt="Quarteirão Paulista, no Centro de Ribeirão Preto" loading="lazy"><figcaption>Centro de Ribeirão Preto</figcaption></figure>
  <div>
    <h2 class="tit">Em Ribeirão Preto desde ${E.desde}</h2>
    <p>O escritório fica na Rua Visconde do Rio Branco, no Centro de Ribeirão Preto, cidade onde a advogada Daniela Vilela Peloso Vasconcelos o estabeleceu em 1998. Quem prefere resolver por telefone ou e-mail também é atendido, e os clientes acompanham seus processos pela consulta on-line.</p>
    <a class="btn" href="/${v}/contato/">${ic('pin')}<span>Endereço e contato</span></a>
  </div>
</div></section>`;
}

function area(v, a) {
  const outra = areas.find(x => x !== a);
  const cab = v === 'a' ? cabecaA(a.nome, 'Área de atuação', a.foto) : cabecaB(a.nome, `Área de atuação 0${areas.indexOf(a) + 1}`, a.intro);
  return `${cab}
<section class="sec"><div class="in area-grade">
  <div>
    ${v === 'a' ? `<p class="area-intro">${a.intro}</p>` : ''}
    <h2 class="tit">O que o escritório acompanha</h2>
    <dl class="temas">${a.temas.map((t, i) => `<div><dt><span>${String(i + 1).padStart(2, '0')}</span>${t[0]}</dt><dd>${t[1]}</dd></div>`).join('')}</dl>
  </div>
  <aside class="docs">
    <h2 class="sub">${ic('doc')}O que levar na primeira conversa</h2>
    <ul>${a.docs.map(d => `<li>${ic('ok')}${d}</li>`).join('')}</ul>
    <p>Não tem tudo? Traga o que tiver: o escritório orienta como conseguir o resto.</p>
    <a class="btn" href="/${v}/contato/?assunto=${encodeURIComponent(a.nome)}">${ic('mail')}<span>Falar sobre ${a.curto === 'Trabalho' ? 'o meu caso trabalhista' : 'o meu benefício'}</span></a>
  </aside>
</div></section>
<section class="sec sec-clara"><div class="in">
  <h2 class="tit">Como o atendimento acontece</h2>
  ${etapasHtml(v === 'a' ? 'a-etapas' : 'b-etapas b-etapas-claras')}
</div></section>
<section class="sec"><div class="in outra-area">
  <p>O escritório também atua em</p>
  <a href="/${v}/${outra.slug}/"><b>${outra.nome}</b><span>${outra.resumo}</span>${ic('seta')}</a>
</div></section>`;
}

function andamento(v) {
  const cab = v === 'a' ? cabecaA('Andamento processual', 'Área do cliente', 'livros-antigos') : cabecaB('Andamento processual', 'Área do cliente', 'Consulta on-line e gratuita aos andamentos dos processos, com usuário e senha fornecidos pelo escritório.');
  return `${cab}
<section class="sec"><div class="in and-grade">
  <div class="and-texto">
    ${v === 'a' ? faixa('Como funciona') : '<h2 class="tit">Como funciona</h2>'}
    ${andamentoTexto()}
  </div>
  <div class="and-painel">
    <h2 class="sub">${ic('cadeado')}Pedir usuário e senha</h2>
    <p>Já é cliente do escritório? Envie seus dados e o número do processo, se tiver. O acesso é enviado pelo escritório.</p>
    ${formContato(v, 'Andamento processual (usuário e senha)')}
  </div>
</div></section>`;
}

function contato(v) {
  const cab = v === 'a' ? cabecaA('Contato', 'Advocacia off-line', 'theatro-pedro-ii') : cabecaB('Contato', 'Fale com o escritório', 'Atendimento no escritório, no Centro de Ribeirão Preto, por telefone ou por mensagem.');
  return `${cab}
<section class="sec"><div class="in cont-grade">
  <div>
    ${v === 'a' ? faixa('Deixe sua mensagem') : '<h2 class="tit">Deixe sua mensagem</h2>'}
    ${formContato(v)}
  </div>
  <div>
    ${v === 'a' ? faixa('Endereço') : '<h2 class="tit">Endereço</h2>'}
    ${contatoLinhas()}
    ${mapa()}
  </div>
</div></section>`;
}

export function gerarVersao(v) {
  const nomeV = `${E.nome}`;
  const p = {};
  p.index = pagina(v, 'index', '', `${nomeV} · Advocacia trabalhista e previdenciária em Ribeirão Preto`,
    `${E.completo}: direito do trabalho e previdenciário em Ribeirão Preto desde ${E.desde}. Consulta on-line ao andamento processual.`,
    v === 'a' ? inicioA() : inicioB());
  p.escritorio = pagina(v, 'escritorio', 'escritorio/', `O escritório · ${nomeV}`, semTag(T.quemSomos[0]).slice(0, 155), escritorio(v));
  for (const a of areas) p[a.slug] = pagina(v, a.slug, `${a.slug}/`, `${a.nome} em Ribeirão Preto · ${nomeV}`, a.resumo, area(v, a));
  p['andamento-processual'] = pagina(v, 'andamento-processual', 'andamento-processual/', `Andamento processual · ${nomeV}`, T.andamento[0], andamento(v));
  p.contato = pagina(v, 'contato', 'contato/', `Contato · ${nomeV}`, `${E.endereco}, ${E.bairro}, ${E.cidade}. Telefone ${E.tel}.`, contato(v));
  return p;
}
