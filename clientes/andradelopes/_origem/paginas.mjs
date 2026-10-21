// Monta as páginas das versões A ("Engrenagem": fiel ao site atual, faixa grafite com o logo, engrenagem dourada marcando
// o menu e os títulos, banner com as fotos do Flash e "Profissionais associados" ao lado do texto) e B ("Laudo": papel claro,
// abertura em forma de ficha técnica de laudo, etapas do trabalho em linha, serviços como sumário e portfólio em tabela).
// Estilos em public/assets/{base,a,b}.css.
import { empresa as E, textos as T, valores, segmentos, servicos, etapas, metodos, portfolio, clientes, entidades, indicadores } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fora = ' target="_blank" rel="noopener"';
export const nomesVersao = { a: 'Engrenagem', b: 'Laudo' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'portfolio', nome: 'Portfólio', caminho: 'portfolio/' },
  { slug: 'indicadores', nome: 'Indicadores', caminho: 'indicadores/' },
  { slug: 'clientes', nome: 'Clientes', caminho: 'clientes/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  voltar: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  fora: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  cadeado: '<rect x="5" y="11" width="14" height="10" rx="1.5"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// Engrenagem do site atual (ícone dourado dos títulos e do menu), desenhada em vetor.
function engrenagemPath(dentes = 10, rExt = 50, rInt = 41, rFuro = 17) {
  const pts = [], passo = (Math.PI * 2) / dentes;
  for (let i = 0; i < dentes; i++) {
    const a = i * passo;
    const p = [[a - passo * .25, rInt], [a - passo * .16, rExt], [a + passo * .16, rExt], [a + passo * .25, rInt]];
    for (const [ang, r] of p) pts.push(`${(60 + r * Math.cos(ang)).toFixed(2)},${(60 + r * Math.sin(ang)).toFixed(2)}`);
  }
  return `M${pts.join('L')}Z M${60 + rFuro},60 a${rFuro},${rFuro} 0 1,0 ${-2 * rFuro},0 a${rFuro},${rFuro} 0 1,0 ${2 * rFuro},0Z`;
}
const G = engrenagemPath();
const gear = (cls = 'gear') => `<svg class="${cls}" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><path fill="url(#g-ouro)" fill-rule="evenodd" d="${G}"/></svg>`;
const defsOuro = '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs><linearGradient id="g-ouro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E9C866"/><stop offset=".55" stop-color="#C8A031"/><stop offset="1" stop-color="#9A7414"/></linearGradient></defs></svg>';
const gearLinha = (cls = 'gear-linha') => `<svg class="${cls}" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width=".6" d="${engrenagemPath(14, 56, 48, 30)}"/><circle cx="60" cy="60" r="38" fill="none" stroke="currentColor" stroke-width=".4"/></svg>`;

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
<meta name="theme-color" content="#2B2725">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${v === 'a' ? gear('gear-menu') : ''}${n.nome}</a>`).join('');
const LOGO_W = 2713, LOGO_H = 298; // logo-h-*.svg

function topo(v, atual) {
  if (v === 'a') return `<header class="topo"><div class="topo-eng">${gearLinha()}${gearLinha('gear-linha g2')}</div><div class="in">
  <a class="marca" href="/a/" aria-label="Andrade Lopes, página inicial"><img src="/assets/logo-h-claro.svg" alt="Andrade Lopes Engenharia &amp; Consultoria" width="${LOGO_W}" height="${LOGO_H}"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}<a class="menu-login" href="${E.webmail}"${fora}>${ic('cadeado')}Login</a></nav>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
  return `<div class="faixa-b"><div class="in"><span>${E.endereco[0]} · ${E.endereco[1]}</span><span><a href="tel:${E.fones[0].h}">${E.fones[0].t}</a> · <a href="mailto:${E.email}">${E.email}</a></span></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Andrade Lopes, página inicial"><img src="/assets/logo-h-escuro.svg" alt="Andrade Lopes Engenharia &amp; Consultoria" width="${LOGO_W}" height="${LOGO_H}"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="topo-cta" href="/b/contato/">Solicitar proposta</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-claro.svg" alt="Andrade Lopes Engenharia &amp; Consultoria" width="2012" height="1193"><p>Engenharia consultiva em âmbito nacional: avaliações patrimoniais, perícias, orçamentação e fiscalização de obras.</p></div>
  <div><h3>Endereço</h3><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}"${fora}>${ic('pin')} Ver no mapa</a></div>
  <div><h3>Atendimento</h3><p>${E.fones.map(f => `<a href="tel:${f.h}">${f.t}</a>`).join('<br>')}<br><a href="mailto:${E.email}">${E.email}</a></p><p class="rod-hora">${E.horario}</p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${nav.map(n => `<a href="/${v}/${n.caminho}">${n.nome}</a>`).join('')}<a href="${E.webmail}"${fora}>Webmail</a></nav>
</div><p class="rod-fim">© ${E.razao} · Porto Alegre, RS</p></footer>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo) => `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${sl}">
${defsOuro}
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, sl)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

const foto = (nome, alt = '', cls = '', extra = '') => `<img class="${cls}" src="/assets/img/fotos/${nome}.webp" alt="${esc(alt)}" width="752" height="375" loading="lazy" decoding="async"${extra}>`;
const tit = (v, titulo, { eyebrow, tag = 'h2', n } = {}) => v === 'a'
  ? `<div class="tit">${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<${tag}>${gear()}<span>${titulo}</span></${tag}></div>`
  : `<div class="tit">${eyebrow ? `<p class="eyebrow">${n ? `<b>${n}</b>` : ''}${eyebrow}</p>` : ''}<${tag}>${titulo}</${tag}></div>`;

const capa = (v, eyebrow, titulo, sub, fotoNome) => v === 'a'
  ? `<section class="capa">${fotoNome ? foto(fotoNome, '', 'capa-foto', ' fetchpriority="high" loading="eager"') : ''}<div class="topo-eng">${gearLinha()}</div><div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`
  : `<section class="capa"><div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

const metodosDo = c => {
  const t = (c.texto.join(' ') + (c.fim || '')).toLowerCase();
  const m = [];
  if (/comparativo/.test(t)) m.push('Comparativo direto de dados de mercado');
  if (/quantifica/.test(t)) m.push('Quantificação do custo');
  if (/evolutivo/.test(t)) m.push('Evolutivo');
  if (/involutivo/.test(t)) m.push('Involutivo');
  if (/infer/.test(t)) m.push('Inferência estatística');
  if (/tratamento de dados/.test(t)) m.push('Tratamento de dados direto de mercado');
  if (/nbr 6118/.test(t)) m.push('NBR 6118, ensaios não destrutivos');
  return m;
};

const linkCaso = (v, c) => `/${v}/portfolio/${c.slug}/`;
const logoCli = (id, cls = '') => id ? `<img class="${cls}" src="/assets/img/clientes/${id}.png" alt="" loading="lazy" decoding="async">` : '';

const contatoLinhas = () => `<ul class="contato-linhas">
  <li>${ic('pin')}<div><b>Endereço</b>${E.endereco.join(', ')}<a href="${E.mapa}"${fora}>Ver no mapa</a></div></li>
  <li>${ic('tel')}<div><b>Fone e fax</b>${E.fones.map(f => `<a href="tel:${f.h}">${f.t}</a>`).join(' · ')}</div></li>
  <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('relogio')}<div><b>Horário de atendimento</b>${E.horario}</div></li>
</ul>`;

// Mesmos campos do formulário atual (nome, empresa, e-mail, fone, comentários), mais o tipo de serviço. Abre o e-mail pronto.
const formContato = () => `<form class="form-contato" data-contato data-para="${E.email}">
  <div class="campos">
    <label><span>Nome</span><input name="nome" autocomplete="name" required></label>
    <label><span>Empresa ou órgão</span><input name="empresa" autocomplete="organization"></label>
    <label><span>E-mail</span><input name="email" type="email" autocomplete="email" required></label>
    <label><span>Fone</span><input name="fone" type="tel" autocomplete="tel"></label>
    <label class="largo"><span>Assunto</span><select name="assunto">
      ${servicos.map(s => `<option>${s.curto}</option>`).join('')}<option>Outro assunto</option>
    </select></label>
    <label class="largo"><span>Comentários</span><textarea name="mensagem" rows="5" placeholder="Conte o que precisa avaliar ou periciar: tipo de bem, local e finalidade."></textarea></label>
  </div>
  <button type="submit">${ic('mail')} Enviar mensagem</button>
  <p class="form-nota">O envio abre o seu e-mail já preenchido para ${E.email}.</p>
</form>`;

const mapa = () => `<div class="mapa"><iframe title="Mapa: ${E.endereco[0]}, Porto Alegre" src="https://www.google.com/maps?q=Rua+Jer%C3%B4nimo+Coelho+85+Porto+Alegre+RS&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

const fotosBanner = ['porto-alegre', 'engenheiro', 'lacador', 'obra-vistoria', 'edificio-vidro'];
const legendas = { 'porto-alegre': 'Porto Alegre, RS', engenheiro: 'Vistoria técnica', lacador: 'Porto Alegre, RS', 'obra-vistoria': 'Acompanhamento de obras', 'edificio-vidro': 'Avaliações patrimoniais' };
const destaques = [['882', 'laudos de estabilidade estrutural em Gaspar, SC'], ['142', 'laudos para o IPERGS em 40 dias corridos'], ['36,36 ha', 'avaliados para a ampliação do Aeroporto Salgado Filho'], ['735.588 m²', 'avaliados para a FASE, com prédios do período imperial']];

// ================= VERSÃO A =================
function inicioA() {
  return `<section class="hero"><div class="topo-eng">${gearLinha()}${gearLinha('gear-linha g2')}</div><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">Engenharia &amp; consultoria · Porto Alegre, RS</p>
    <h1>Engenharia consultiva em âmbito nacional</h1>
    <p class="hero-sub">Avaliações de ativos patrimoniais, perícias e laudos técnicos, orçamentação e fiscalização de obras para as esferas públicas e privadas.</p>
    <div class="botoes"><a class="btn" href="/a/servicos/">Conheça os serviços ${ic('seta')}</a><a class="btn btn-sec" href="/a/contato/">Fale com a equipe</a></div>
  </div>
  <div class="banner" data-banner>
    ${fotosBanner.map((f, i) => `<figure${i ? '' : ' class="on"'}>${foto(f, legendas[f], '', i ? '' : ' fetchpriority="high" loading="eager"')}<figcaption>${legendas[f]}</figcaption></figure>`).join('')}
    ${gear('gear-banner')}
    <div class="banner-pontos">${fotosBanner.map((f, i) => `<button type="button" aria-label="Foto ${i + 1}"${i ? '' : ' aria-current="true"'}></button>`).join('')}</div>
  </div>
</div></section>

<section class="sec sobre-home"><div class="in">
  <div class="sobre-txt">
    ${tit('a', 'Andrade Lopes')}
    <p class="lead">${T.sobre}</p>
    <ul class="valores">${valores.map(x => `<li>${gear('gear-mini')}${x}</li>`).join('')}</ul>
    <a class="link-seta" href="/a/empresa/">Saiba mais sobre a empresa ${ic('seta')}</a>
  </div>
  <aside class="associados" aria-labelledby="assoc-t">
    <h2 id="assoc-t">${gear()}<span>Profissionais associados</span></h2>
    <ul>${entidades.map(e => `<li><a href="${e.url}"${fora}><img src="/assets/img/entidades/${e.id}.png" alt="" width="75" height="75" loading="lazy"><span><b>${e.nome}</b>${e.desc}</span></a></li>`).join('')}</ul>
  </aside>
</div></section>

<section class="sec servicos-home"><div class="in">
  ${tit('a', 'Serviços', { eyebrow: 'Três frentes de trabalho' })}
  <div class="serv-faixas">${servicos.map((s, i) => `<a class="serv-faixa" href="/a/servicos/#${s.slug}">
    <div class="sf-foto">${foto(s.foto)}</div>
    <div class="sf-txt"><span class="sf-n">0${i + 1}</span><h3>${s.curto}</h3><p>${s.resumo}</p>
    <ul>${s.grupos.flatMap(g => g.itens).slice(0, 3).map(x => `<li>${x.split(':')[0]}</li>`).join('')}</ul>
    <span class="link-seta">Ver todos os serviços ${ic('seta')}</span></div>
  </a>`).join('')}</div>
</div></section>

<section class="sec numeros"><div class="topo-eng">${gearLinha()}</div><div class="in">
  ${tit('a', 'Portfólio', { eyebrow: 'Alguns trabalhos em números' })}
  <ul class="num-lista">${destaques.map(([n, t]) => `<li><b>${n}</b><span>${t}</span></li>`).join('')}</ul>
  <div class="port-mini">${portfolio.slice(0, 4).map(c => `<a href="${linkCaso('a', c)}">${foto(c.foto)}<span><small>${c.sigla}</small>${c.titulo}</span></a>`).join('')}</div>
  <a class="btn" href="/a/portfolio/">Ver os 12 trabalhos ${ic('seta')}</a>
</div></section>

<section class="sec clientes-home"><div class="in">
  ${tit('a', 'Clientes', { eyebrow: 'Esferas públicas e privadas' })}
  <ul class="logos">${clientes.map(c => `<li title="${c.nome}">${logoCli(c.id)}<span class="vh">${c.nome}</span></li>`).join('')}</ul>
</div></section>
${chamadaA()}`;
}

const chamadaA = () => `<section class="chamada"><div class="in">
  <div><h2>Precisa de um laudo, uma avaliação ou uma perícia?</h2><p>Atendimento de segunda a sexta, das 9h às 12h e das 13h30 às 19h, na Rua Jerônimo Coelho, 85, Centro de Porto Alegre.</p></div>
  <div class="chamada-acoes"><a class="btn" href="/a/contato/">Fale com a equipe ${ic('seta')}</a><a class="chamada-tel" href="tel:${E.fones[0].h}">${ic('tel')} ${E.fones[0].t}</a></div>
</div></section>`;

function empresaA() {
  return `${capa('a', 'Empresa', 'Engenharia consultiva para as esferas públicas e privadas', 'Avaliações, controle patrimonial, viabilidade, orçamentação, fiscalização de obras e assessoria técnica em processos judiciais.', 'engenheiros')}
<section class="sec"><div class="in duas">
  <div>${tit('a', 'Quem somos')}<p class="lead">${T.sobre}</p><p>${T.solucoes}</p></div>
  <figure class="foto-moldura">${foto('engenheiros-obra', 'Engenheiros em vistoria de obra')}${gear('gear-banner')}</figure>
</div></section>
<section class="sec cinza"><div class="in">
  ${tit('a', 'Valores', { eyebrow: 'O que guia cada trabalho' })}
  <p class="lead estreito">${T.valores}</p>
  <ol class="valores-grandes">${valores.map((x, i) => `<li><span>${gear()}<i>${i + 1}</i></span><b>${x}</b></li>`).join('')}</ol>
  <p class="valores-soma">${ic('ok')} Competência e satisfação para os clientes</p>
</div></section>
<section class="sec"><div class="in duas inv">
  <figure class="foto-moldura">${foto('capacete-plantas', 'Capacete e plantas de projeto')}</figure>
  <div>${tit('a', 'Corpo técnico')}<p class="lead">${T.equipe}</p>
  <h3 class="sub">Profissionais associados</h3>
  <ul class="ent-linha">${entidades.map(e => `<li><a href="${e.url}"${fora}><img src="/assets/img/entidades/${e.id}.png" alt="${e.nome}" width="75" height="75" loading="lazy"></a></li>`).join('')}</ul></div>
</div></section>
${chamadaA()}`;
}

function servicosA() {
  return `${capa('a', 'Serviços', 'Avaliações, laudos e engenharia de obras', 'Três frentes de trabalho, com soluções individuais e específicas para cada cliente, em prazos de execução e custos reduzidos.', 'plantas')}
<nav class="ancoras" aria-label="Áreas de serviço"><div class="in">${servicos.map((s, i) => `<a href="#${s.slug}"><span>0${i + 1}</span>${s.curto}</a>`).join('')}</div></nav>
${servicos.map((s, i) => `<section class="sec serv-bloco${i % 2 ? ' cinza' : ''}" id="${s.slug}"><div class="in">
  <div class="sb-cab"><figure class="foto-moldura">${foto(s.foto)}${gear('gear-banner')}</figure>
  <div>${tit('a', s.titulo, { eyebrow: `Área 0${i + 1}` })}<p class="lead">${s.resumo}</p></div></div>
  <div class="sb-grupos">${s.grupos.map(g => `<div class="sb-grupo"><h3>${g.nome}</h3><ul>${g.itens.map(x => `<li>${gear('gear-mini')}<span>${x}</span></li>`).join('')}</ul></div>`).join('')}</div>
</div></section>`).join('')}
<section class="sec metodos"><div class="in">
  ${tit('a', 'Métodos de avaliação', { eyebrow: 'Citados nos laudos do portfólio' })}
  <ul class="metodos-lista">${metodos.map(m => `<li>${m}</li>`).join('')}</ul>
</div></section>
${chamadaA()}`;
}

const finalidades = [...new Set(portfolio.map(c => c.finalidade))];
function portfolioA() {
  return `${capa('a', 'Portfólio', 'Trabalhos realizados', 'Laudos de avaliação, perícias e serviços técnicos para órgãos públicos, indústrias e empresas no Rio Grande do Sul e em Santa Catarina.', 'gruas')}
<section class="sec"><div class="in">
  <div class="filtros" data-filtros role="group" aria-label="Filtrar por finalidade"><button type="button" aria-pressed="true" data-f="">Todos (${portfolio.length})</button>${finalidades.map(f => `<button type="button" aria-pressed="false" data-f="${esc(f)}">${f}</button>`).join('')}</div>
  <div class="port-grade" data-lista>${portfolio.map(c => `<a class="port-item" href="${linkCaso('a', c)}" data-fin="${esc(c.finalidade)}">
    <div class="pi-foto">${foto(c.foto)}<span class="pi-num"><b>${c.numeros[0][0]}</b>${c.numeros[0][1]}</span></div>
    <div class="pi-txt"><small>${c.sigla} · ${c.finalidade}</small><h3>${c.titulo}</h3><p>${ic('pin')}${c.local}</p></div>
  </a>`).join('')}</div>
</div></section>
${chamadaA()}`;
}

function casoA(c, i) {
  const ant = portfolio[(i - 1 + portfolio.length) % portfolio.length], prox = portfolio[(i + 1) % portfolio.length];
  const m = metodosDo(c);
  return `${capa('a', `Portfólio · ${c.sigla}`, c.titulo, c.local, c.foto)}
<section class="caso-nums"><div class="in">${c.numeros.map(([n, t]) => `<p><b>${n}</b>${t}</p>`).join('')}<p><b class="pq">${c.finalidade}</b>finalidade</p></div></section>
<section class="sec"><div class="in caso">
  <article class="caso-txt">
    <p class="caso-cli">${c.logo ? logoCli(c.logo, 'caso-logo') : ''}<span>${c.cliente}</span></p>
    ${c.texto.map(p => `<p>${p}</p>`).join('')}
    ${c.lista ? `<ul class="caso-lista">${c.lista.map(x => `<li>${gear('gear-mini')}<span>${x}</span></li>`).join('')}</ul>` : ''}
    ${c.fim ? `<p>${c.fim}</p>` : ''}
  </article>
  <aside class="caso-ficha">
    <h2>${gear()}<span>Ficha do trabalho</span></h2>
    <dl><dt>Contratante</dt><dd>${c.sigla}</dd><dt>Local</dt><dd>${c.local}</dd><dt>Área</dt><dd>${c.area}</dd><dt>Finalidade</dt><dd>${c.finalidade}</dd>${m.length ? `<dt>Métodos</dt><dd>${m.join('<br>')}</dd>` : ''}</dl>
    <a class="btn" href="/a/contato/">Solicitar um trabalho como este</a>
  </aside>
</div></section>
<nav class="caso-nav" aria-label="Outros trabalhos"><div class="in">
  <a href="${linkCaso('a', ant)}">${ic('voltar')}<span><small>Anterior</small>${ant.titulo}</span></a>
  <a href="/a/portfolio/" class="todos">Todos os trabalhos</a>
  <a href="${linkCaso('a', prox)}" class="prox"><span><small>Próximo</small>${prox.titulo}</span>${ic('seta')}</a>
</div></nav>`;
}

function indicadoresA() {
  return `${capa('a', 'Indicadores', 'Índices de custos e preços da construção', 'As mesmas fontes que a equipe consulta em orçamentos, avaliações e reajustes de contratos.', 'vigas-aco')}
<section class="sec"><div class="in">
  <ul class="ind-lista">${indicadores.map(x => `<li><a href="${x.url}"${fora}><img src="/assets/img/entidades/${x.id}.png" alt="" loading="lazy"><div><h2>${x.nome}</h2><p>${x.desc}</p><span class="link-seta">Abrir ${ic('fora')}</span></div></a></li>`).join('')}</ul>
</div></section>
${chamadaA()}`;
}

function clientesA() {
  const grupo = (tipo, nome) => `<div class="cli-grupo"><h2>${gear()}<span>${nome}</span></h2><ul class="logos">${clientes.filter(c => c.tipo === tipo).map(c => `<li>${logoCli(c.id)}<span>${c.nome}</span></li>`).join('')}</ul></div>`;
  return `${capa('a', 'Clientes', 'Quem já confiou na Andrade Lopes', 'Órgãos públicos, bancos, indústrias e empresas atendidos em avaliações, laudos e serviços técnicos.', 'centro-administrativo')}
<section class="sec"><div class="in">${grupo('pub', 'Setor público e bancos')}${grupo('priv', 'Empresas e indústrias')}</div></section>
${chamadaA()}`;
}

function contatoA() {
  return `${capa('a', 'Contato', 'Fale com a Andrade Lopes', 'Conte o que precisa avaliar, periciar ou orçar. A equipe responde por e-mail ou telefone.', 'porto-alegre')}
<section class="sec"><div class="in contato">
  <div>${tit('a', 'Atendimento')}${contatoLinhas()}${mapa()}</div>
  <div class="form-caixa"><h2>Envie sua mensagem</h2>${formContato()}</div>
</div></section>`;
}

// ================= VERSÃO B =================
const ficha = () => `<div class="ficha" aria-label="Resumo da empresa em forma de ficha de laudo">
  <div class="ficha-cab"><span>Laudo técnico de avaliação</span><span>Porto Alegre, RS</span></div>
  <dl>
    <div><dt>Objeto</dt><dd>Imóveis urbanos e rurais, complexos industriais, máquinas, veículos e equipamentos, empresas, marcas e patentes</dd></div>
    <div><dt>Finalidade</dt><dd>Compra e venda, desapropriação, garantia de operações financeiras, capital social, partilha e inventário</dd></div>
    <div><dt>Métodos</dt><dd>Comparativo direto de dados de mercado, evolutivo, involutivo, quantificação do custo e inferência estatística</dd></div>
    <div><dt>Abrangência</dt><dd>Âmbito nacional, para as esferas públicas e privadas</dd></div>
  </dl>
  <div class="ficha-pe"><img src="/assets/marca-escuro.svg" alt="" width="696" height="280"><span>Profissionais associados ao CREA-RS, IBAPE, IGEL e SERGS</span></div>
</div>`;

const chamadaB = () => `<section class="chamada"><div class="in">
  <h2>Solicite uma proposta de avaliação, laudo ou perícia</h2>
  <div class="chamada-acoes"><a class="btn" href="/b/contato/">Enviar mensagem ${ic('seta')}</a><a class="chamada-tel" href="tel:${E.fones[0].h}">${ic('tel')} ${E.fones[0].t}</a><a class="chamada-tel" href="tel:${E.fones[1].h}">${E.fones[1].t}</a></div>
</div></section>`;

const etapasB = (titulo = 'Como um laudo é feito') => `<section class="sec etapas"><div class="in">
  ${tit('b', titulo, { eyebrow: 'Método de trabalho', n: '§' })}
  <ol class="etapas-linha" data-regua>${etapas.map((e, i) => `<li><span class="et-n">${String(i + 1).padStart(2, '0')}</span><h3>${e.n}</h3><p>${e.t}</p></li>`).join('')}</ol>
  <p class="etapas-nota">Etapas descritas nos próprios laudos do portfólio, como os 142 laudos do IPERGS: vistoria, análise, pesquisa cartorial e tratamento de dados direto de mercado.</p>
</div></section>`;

const sumario = (base = '/b/servicos/') => `<ol class="sumario">${servicos.map((s, i) => `<li><a href="${base}#${s.slug}"><span class="su-n">${i + 1}</span><span class="su-t">${s.curto}</span><span class="su-p" aria-hidden="true"></span><span class="su-q">${s.grupos.reduce((a, g) => a + g.itens.length, 0)} itens</span></a>
  <ol>${s.grupos.map((g, j) => `<li><span class="su-n">${i + 1}.${j + 1}</span>${g.nome}</li>`).join('')}</ol></li>`).join('')}</ol>`;

const tabelaPort = (lista, v = 'b') => `<div class="tabela-port" data-lista><div class="tp-cab" aria-hidden="true"><span>Contratante</span><span>Trabalho</span><span>Local</span><span>Medida</span></div>
${lista.map(c => `<a class="tp-linha" href="${linkCaso(v, c)}" data-fin="${esc(c.finalidade)}"><span class="tp-cli">${c.sigla}</span><span class="tp-tit">${c.titulo}<small>${c.finalidade}</small></span><span class="tp-loc">${c.local}</span><span class="tp-num"><b>${c.numeros[0][0]}</b> ${c.numeros[0][1]}</span>${ic('seta')}</a>`).join('')}</div>`;

function inicioB() {
  return `<section class="hero"><div class="in">
  <div class="hero-txt">
    <p class="eyebrow">Engenharia &amp; consultoria · Porto Alegre, RS</p>
    <h1>Avaliações, perícias e laudos de engenharia</h1>
    <p class="hero-sub">${T.sobre}</p>
    <div class="botoes"><a class="btn" href="/b/contato/">Solicitar proposta ${ic('seta')}</a><a class="btn btn-sec" href="/b/portfolio/">Ver portfólio</a></div>
  </div>
  ${ficha()}
</div>
<div class="tira">${['porto-alegre', 'obra-vistoria', 'plantas'].map((f, i) => `<figure>${foto(f, legendas[f] || '', '', i ? '' : ' fetchpriority="high" loading="eager"')}<figcaption>Fig. ${i + 1} · ${['Porto Alegre, RS, sede da empresa', 'Vistoria e acompanhamento de obras', 'Orçamentação e projetos'][i]}</figcaption></figure>`).join('')}</div>
</section>

<section class="sec numeros-b"><div class="in">
  <ul>${destaques.map(([n, t]) => `<li><b>${n}</b><span>${t}</span></li>`).join('')}</ul>
</div></section>

${etapasB()}

<section class="sec"><div class="in serv-home">
  <div>${tit('b', 'Serviços', { eyebrow: 'Sumário', n: '1' })}<p class="lead">${T.solucoes}</p><a class="link-seta" href="/b/servicos/">Ver a lista completa ${ic('seta')}</a></div>
  ${sumario()}
</div></section>

<section class="sec cinza"><div class="in">
  ${tit('b', 'Portfólio', { eyebrow: 'Trabalhos realizados', n: '2' })}
  ${tabelaPort(portfolio.slice(0, 6))}
  <a class="link-seta" href="/b/portfolio/">Ver os ${portfolio.length} trabalhos ${ic('seta')}</a>
</div></section>

<section class="sec"><div class="in assoc-b">
  <div>${tit('b', 'Clientes e entidades', { eyebrow: 'Referências', n: '3' })}<p>${T.equipe}</p>
  <ul class="ent-b">${entidades.map(e => `<li><a href="${e.url}"${fora}><img src="/assets/img/entidades/${e.id}.png" alt="" width="75" height="75" loading="lazy"><span><b>${e.nome}</b>${e.desc}</span></a></li>`).join('')}</ul></div>
  <ul class="logos-b">${clientes.map(c => `<li title="${c.nome}">${logoCli(c.id)}<span class="vh">${c.nome}</span></li>`).join('')}</ul>
</div></section>
${chamadaB()}`;
}

function empresaB() {
  return `${capa('b', 'Empresa', 'Engenharia consultiva em âmbito nacional', T.sobre)}
<section class="sec"><div class="in duas">
  <div>${tit('b', 'Soluções individuais e específicas', { eyebrow: 'Atuação', n: '1' })}<p class="lead">${T.solucoes}</p><p>${T.equipe}</p></div>
  <figure class="fig">${foto('engenheiros', 'Engenheiros em vistoria')}<figcaption>Fig. 1 · Corpo técnico em vistoria</figcaption></figure>
</div></section>
<section class="sec escuro"><div class="in">
  ${tit('b', 'Valores', { eyebrow: 'Princípios', n: '2' })}
  <div class="equacao">${valores.map((x, i) => `<span class="eq-v">${x}</span>${i < valores.length - 1 ? '<span class="eq-op">+</span>' : ''}`).join('')}<span class="eq-op">=</span><span class="eq-r">Competência e satisfação para os clientes</span></div>
  <p class="lead estreito">${T.valores}</p>
</div></section>
<section class="sec"><div class="in">
  ${tit('b', 'Segmentos de atuação', { eyebrow: 'Escopo', n: '3' })}
  <ol class="segmentos">${segmentos.map((s, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${s}</li>`).join('')}</ol>
</div></section>
<section class="sec cinza"><div class="in">
  ${tit('b', 'Profissionais associados', { eyebrow: 'Entidades', n: '4' })}
  <ul class="ent-b largo">${entidades.map(e => `<li><a href="${e.url}"${fora}><img src="/assets/img/entidades/${e.id}.png" alt="" width="75" height="75" loading="lazy"><span><b>${e.nome}</b>${e.desc}</span></a></li>`).join('')}</ul>
</div></section>
${chamadaB()}`;
}

function servicosB() {
  return `${capa('b', 'Serviços', 'Sumário de serviços', 'Engenharia econômica e de avaliações, serviços técnicos de engenharia e assessoria técnica em processos administrativos e judiciais.')}
<section class="sec"><div class="in serv-home">${sumario('')}<figure class="fig">${foto('plantas', 'Plantas de projeto')}<figcaption>Fig. 1 · Orçamentação e projetos</figcaption></figure></div></section>
${servicos.map((s, i) => `<section class="sec serv-b${i % 2 ? '' : ' cinza'}" id="${s.slug}"><div class="in">
  ${tit('b', s.titulo, { eyebrow: s.resumo, n: String(i + 1) })}
  <div class="sb-col">${s.grupos.map((g, j) => `<div><h3><span>${i + 1}.${j + 1}</span>${g.nome}</h3><ol>${g.itens.map((x, k) => `<li><span>${i + 1}.${j + 1}.${k + 1}</span>${x}</li>`).join('')}</ol></div>`).join('')}</div>
</div></section>`).join('')}
${etapasB('Do pedido ao laudo')}
${chamadaB()}`;
}

function portfolioB() {
  return `${capa('b', 'Portfólio', 'Trabalhos realizados', `${portfolio.length} trabalhos descritos com contratante, local, medidas e métodos empregados.`)}
<section class="sec"><div class="in">
  <div class="filtros" data-filtros role="group" aria-label="Filtrar por finalidade"><button type="button" aria-pressed="true" data-f="">Todos</button>${finalidades.map(f => `<button type="button" aria-pressed="false" data-f="${esc(f)}">${f}</button>`).join('')}</div>
  ${tabelaPort(portfolio)}
</div></section>
${chamadaB()}`;
}

function casoB(c, i) {
  const ant = portfolio[(i - 1 + portfolio.length) % portfolio.length], prox = portfolio[(i + 1) % portfolio.length];
  const m = metodosDo(c);
  return `<section class="capa caso-capa"><div class="in">
  <a class="voltar" href="/b/portfolio/">${ic('voltar')} Portfólio</a>
  <p class="eyebrow">Trabalho ${String(i + 1).padStart(2, '0')} de ${portfolio.length} · ${c.finalidade}</p>
  <h1>${c.titulo}</h1>
</div></section>
<section class="sec caso-b"><div class="in">
  <div class="ficha ficha-caso"><div class="ficha-cab"><span>Ficha do trabalho</span><span>${c.sigla}</span></div>
  <dl><div><dt>Contratante</dt><dd>${c.cliente}</dd></div><div><dt>Local</dt><dd>${c.local}</dd></div><div><dt>Finalidade</dt><dd>${c.finalidade}</dd></div>${m.length ? `<div><dt>Métodos</dt><dd>${m.join('; ')}</dd></div>` : ''}<div><dt>Medidas</dt><dd>${c.numeros.map(([n, t]) => `<span class="ficha-med"><b class="ficha-n">${n}</b> ${t}</span>`).join('')}</dd></div></dl>
  ${c.logo ? `<div class="ficha-pe">${logoCli(c.logo)}</div>` : ''}</div>
  <article class="caso-txt">
    <figure class="fig">${foto(c.foto, '')}<figcaption>Fig. · Imagem ilustrativa do acervo do site</figcaption></figure>
    ${c.texto.map(p => `<p>${p}</p>`).join('')}
    ${c.lista ? `<ol class="caso-lista">${c.lista.map(x => `<li>${x}</li>`).join('')}</ol>` : ''}
    ${c.fim ? `<p>${c.fim}</p>` : ''}
  </article>
</div></section>
<nav class="caso-nav" aria-label="Outros trabalhos"><div class="in">
  <a href="${linkCaso('b', ant)}">${ic('voltar')}<span><small>Anterior</small>${ant.titulo}</span></a>
  <a href="${linkCaso('b', prox)}" class="prox"><span><small>Próximo</small>${prox.titulo}</span>${ic('seta')}</a>
</div></nav>
${chamadaB()}`;
}

function indicadoresB() {
  return `${capa('b', 'Indicadores', 'Fontes de custos e índices', 'Referências públicas usadas em orçamentos, avaliações e reajustes de contratos.')}
<section class="sec"><div class="in">
  <ol class="ind-b">${indicadores.map((x, i) => `<li><a href="${x.url}"${fora}><span class="ib-n">${i + 1}</span><img src="/assets/img/entidades/${x.id}.png" alt="" loading="lazy"><span class="ib-t"><b>${x.nome}</b>${x.desc}</span>${ic('fora')}</a></li>`).join('')}</ol>
</div></section>
${chamadaB()}`;
}

function clientesB() {
  const grupo = (tipo, nome, n) => `<div class="cli-b">${tit('b', nome, { eyebrow: `${clientes.filter(c => c.tipo === tipo).length} clientes`, n })}<ul class="logos-b">${clientes.filter(c => c.tipo === tipo).map(c => `<li>${logoCli(c.id)}<span>${c.nome}</span></li>`).join('')}</ul></div>`;
  return `${capa('b', 'Clientes', 'Referências', 'Órgãos públicos, bancos, indústrias e empresas atendidos pela Andrade Lopes.')}
<section class="sec"><div class="in">${grupo('pub', 'Setor público e bancos', '1')}${grupo('priv', 'Empresas e indústrias', '2')}</div></section>
${chamadaB()}`;
}

function contatoB() {
  return `${capa('b', 'Contato', 'Solicitar proposta', 'Descreva o bem, o local e a finalidade do trabalho. A equipe retorna com prazo e proposta.')}
<section class="sec"><div class="in contato">
  <div class="form-caixa">${formContato()}</div>
  <div>${contatoLinhas()}${mapa()}</div>
</div></section>`;
}

// ---------- montagem ----------
const descr = 'Andrade Lopes Engenharia e Consultoria, Porto Alegre: avaliações patrimoniais, perícias e laudos técnicos, orçamentação e fiscalização de obras.';
export function gerarVersao(v) {
  const A = v === 'a';
  const p = {};
  const add = (slug, caminho, titulo, corpo, sl = slug) => { p[slug] = pagina(v, sl, caminho, titulo, descr, corpo); };
  add('index', '', `${E.completo} · Porto Alegre`, A ? inicioA() : inicioB());
  add('empresa', 'empresa/', `Empresa · ${E.completo}`, A ? empresaA() : empresaB());
  add('servicos', 'servicos/', `Serviços · ${E.completo}`, A ? servicosA() : servicosB());
  add('portfolio', 'portfolio/', `Portfólio · ${E.completo}`, A ? portfolioA() : portfolioB());
  portfolio.forEach((c, i) => add(`portfolio/${c.slug}`, `portfolio/${c.slug}/`, `${c.titulo} · ${E.nome}`, A ? casoA(c, i) : casoB(c, i), 'portfolio'));
  add('indicadores', 'indicadores/', `Indicadores · ${E.completo}`, A ? indicadoresA() : indicadoresB());
  add('clientes', 'clientes/', `Clientes · ${E.completo}`, A ? clientesA() : clientesB());
  add('contato', 'contato/', `Contato · ${E.completo}`, A ? contatoA() : contatoB());
  return p;
}
