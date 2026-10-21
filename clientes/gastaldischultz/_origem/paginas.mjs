// Monta as páginas das versões A ("Escritório": fiel ao site atual, faixa grafite com o logo na caixa preta, contatos à direita,
// menu claro com divisórias, banners do escritório e a coluna de Áreas de Atuação com o ícone da balança) e B ("Sumário": fundo claro,
// áreas como sumário de código numerado por artigo, legado da família em linha, semana de atendimento e mapa das comarcas).
// Estilos em public/assets/{base,a,b}.css.
import { empresa as E, escritorio, servicos, comarcas, atendimento, tribunais, portais, areas, grupos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Nomes em caixa alta no texto do site atual viram versalete (mesmo texto, leitura melhor).
const caixa = s => esc(s).replace(/\b([A-ZÀ-Ú&][A-ZÀ-Ú&]+(?:\s+(?:&amp;|[A-ZÀ-Ú]{2,}))+|[A-ZÀ-Ú]{4,})\b/g, m => `<span class="vs">${m.toLowerCase()}</span>`).replace(/\(in memoriam\)/, '(<i>in memoriam</i>)');

export const nomesVersao = { a: 'Escritório', b: 'Sumário' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'o-escritorio', nome: 'O Escritório', caminho: 'o-escritorio/' },
  { slug: 'areas-de-atuacao', nome: 'Áreas de Atuação', caminho: 'areas-de-atuacao/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'consultas', nome: 'Consultas', caminho: 'consultas/' },
  { slug: 'fale-conosco', nome: 'Fale Conosco', caminho: 'fale-conosco/' },
  { slug: 'onde-estamos', nome: 'Onde Estamos', caminho: 'onde-estamos/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  voltar: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  fora: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  casa: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  // balança do ícone das áreas no site atual
  balanca: '<path d="M12 3v17M7 20h10M4 6h16"/><path d="M6 6l-3 7a3 3 0 006 0z"/><path d="M18 6l-3 7a3 3 0 006 0z"/><circle cx="12" cy="4" r="1"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da Gastaldi & Schultz e gostaria de falar com um advogado.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;
const fora = ' target="_blank" rel="noopener"';
const art = i => `Art. ${i + 1}${i < 9 ? 'º' : ''}`;

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
<meta name="theme-color" content="${v === 'a' ? '#232425' : '#ffffff'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Carlito:wght@400;700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual, casa = false) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${casa && n.slug === 'index' ? `${ic('casa')}<span class="so-cel">Home</span>` : n.nome}</a>`).join('');
const marcaAtual = sl => sl.startsWith('areas-de-atuacao') ? 'areas-de-atuacao' : sl;

function topo(v, sl) {
  const atual = marcaAtual(sl);
  if (v === 'a') return `<header class="topo">
<div class="topo-faixa"><div class="in">
  <a class="marca" href="/a/" aria-label="${E.completo}, página inicial"><img src="/assets/logo.svg" alt="${E.completo}" width="350" height="127"></a>
  <div class="topo-contatos">
    <p><a href="tel:${E.fone.h}">Tel: ${E.fone.t}</a><span aria-hidden="true">|</span><a href="${waLink()}"${fora}>Cel: ${E.celular.t}</a></p>
    <p><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></p>
    <p class="topo-nota">${E.semAgendamento}</p>
  </div>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}<span>Menu</span></button>
</div></div>
<nav id="menu" class="menu" aria-label="Principal"><div class="in">${menu(v, atual, true)}<a class="menu-wa" href="${waLink()}"${fora}>${ic('wa')} WhatsApp</a></div></nav>
</header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="${E.completo}, página inicial"><img src="/assets/marca-escura.svg" alt="${E.completo}" width="318" height="104"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="topo-wa" href="${waLink()}"${fora}>${ic('wa')}<span>${E.celular.t}</span></a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/${v === 'a' ? 'logo' : 'marca-branca'}.svg" alt="${E.completo}" width="${v === 'a' ? 350 : 318}" height="${v === 'a' ? 127 : 104}" loading="lazy"><p>${E.oab} · Joinville, Santa Catarina</p></div>
  <div><h3>Endereço</h3><p>${E.completo}<br>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}"${fora}>${ic('pin')} Ver no mapa</a></div>
  <div><h3>Contato</h3><p><a href="tel:${E.fone.h}">Tel: ${E.fone.t}</a><br><a href="${waLink()}"${fora}>Cel e WhatsApp: ${E.celular.t}</a><br><a href="mailto:${E.email}">${E.email}</a></p><p class="rod-hora">Seg. a sex., 8h30 às 18h30<br>Sáb., dom. e feriados: emergencial pelo celular</p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${menu(v, '')}</nav>
</div><p class="rod-fim">Todos os direitos reservados à ${E.completo}</p></footer>
<a class="wa-flut" href="${waLink()}"${fora} aria-label="Falar no WhatsApp">${ic('wa')}</a>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo) => `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${sl.split('/')[0]}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, sl)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// Título de seção: na A, como no site atual (título com régua cinza embaixo); na B, rótulo com o "§" e régua dourada fina.
const tit = (v, titulo, { rot, tag = 'h2', cls = '' } = {}) => v === 'a'
  ? `<div class="tit ${cls}"><${tag}>${titulo}</${tag}></div>`
  : `<div class="tit ${cls}">${rot ? `<p class="rot">${rot}</p>` : ''}<${tag}>${titulo}</${tag}></div>`;

const capa = (v, titulo, sub, { img = 'biblioteca', rot = '' } = {}) => v === 'a'
  ? `<section class="capa"><img src="/assets/img/${img}.webp" alt="" width="1600" height="364"><div class="in"><p class="trilha"><a href="/a/">Home</a> / ${titulo}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`
  : `<section class="capa"><div class="in"><p class="rot">${rot || E.completo}</p><h1>${titulo}</h1>${sub ? `<p class="capa-sub">${sub}</p>` : ''}</div></section>`;

// ---------- blocos ----------
const lista = arr => `<ul class="lista">${arr.map(x => `<li>${x}</li>`).join('')}</ul>`;
const telLink = k => `<a href="${k === 'celular' ? waLink() : `tel:${E.fone.h}`}"${k === 'celular' ? fora : ''}>${E[k].t}</a>`;

const blocoAtendimento = v => v === 'a'
  ? `<section class="atend"><div class="in">
  <div class="atend-tit">${ic('relogio', 'ic atend-ic')}<h2>Atendimento</h2><p>${E.semAgendamento}</p></div>
  <div class="atend-col"><h3>${atendimento.normal.rot}</h3><p>${atendimento.normal.quando}, pelo ${telLink('fone')} ou ${telLink('celular')}.</p></div>
  <div class="atend-col emerg"><h3>${atendimento.emergencial.rot}</h3><p>${atendimento.emergencial.quando} pelo ${telLink('celular')}.</p></div>
</div></section>`
  : semana();

// Semana de atendimento (B): segunda a sexta com a faixa das 8h30 às 18h30; fim de semana e feriados em tracejado (emergencial).
function semana() {
  const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const top = (8.5 / 24 * 100).toFixed(2), alt = (10 / 24 * 100).toFixed(2);
  return `<section class="semana"><div class="in">
  ${tit('b', 'Atendimento sem hora marcada', { rot: '§ Atendimento' })}
  <div class="semana-grid">
    <div class="semana-txt">
      <p class="semana-lead">${E.semAgendamento}</p>
      <dl>
        <div><dt><i class="sw normal"></i>${atendimento.normal.rot}</dt><dd>${atendimento.normal.quando}, pelo ${telLink('fone')} ou ${telLink('celular')}.</dd></div>
        <div><dt><i class="sw emerg"></i>${atendimento.emergencial.rot}</dt><dd>${atendimento.emergencial.quando} pelo ${telLink('celular')}.</dd></div>
      </dl>
    </div>
    <div class="relogio-semana" role="img" aria-label="Segunda a sexta das 8h30 às 18h30; sábados, domingos e feriados atendimento emergencial pelo celular">
      <div class="rs-horas" aria-hidden="true"><span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>24h</span></div>
      ${dias.map((d, i) => `<div class="rs-dia${i > 4 ? ' fds' : ''}"><span class="rs-nome">${d}</span><div class="rs-col">${i < 5 ? `<i style="top:${top}%;height:${alt}%"><b>8h30</b><b>18h30</b></i>` : '<i class="em"><b>emergencial</b></i>'}</div></div>`).join('')}
    </div>
  </div>
</div></section>`;
}

// Mapa esquemático das comarcas (B): pontos pela latitude e longitude da sede, linhas saindo de Joinville.
function mapaComarcas() {
  const lon = comarcas.map(c => c.lon), lat = comarcas.map(c => c.lat);
  const ky = 360, kx = ky * Math.cos(26.8 * Math.PI / 180); // px por grau, com a correção da latitude
  const x0 = Math.min(...lon), y0 = Math.max(...lat);
  const W = (Math.max(...lon) - x0) * kx, H = (y0 - Math.min(...lat)) * ky;
  const P = c => [+((c.lon - x0) * kx).toFixed(1), +((y0 - c.lat) * ky).toFixed(1)];
  const sede = P(comarcas[0]);
  // rótulo à esquerda para o interior, à direita para o litoral; alguns ajustados para não encostar no vizinho
  const lado = { 'São Bento do Sul': 'esq', 'Jaraguá do Sul': 'esq', 'Guaramirim': 'esq', 'Blumenau': 'esq', 'Gaspar': 'esq', 'Brusque': 'esq', 'Garuva': 'esq', 'Joinville': 'esq', 'São José': 'esq' };
  const dy = { 'Joinville': -24, 'Jaraguá do Sul': -12, 'Guaramirim': 22, 'Blumenau': -10, 'Gaspar': 22, 'Itajaí': -8, 'Balneário Camboriú': 10, 'Biguaçu': -6, 'Florianópolis': 4, 'São José': 12, 'Araquari': 8 };
  return `<svg class="mapa-svg" viewBox="-250 -40 ${(W + 520).toFixed(0)} ${(H + 80).toFixed(0)}" role="img" aria-label="Mapa esquemático das ${comarcas.length} comarcas atendidas, de Garuva a Florianópolis">
  ${comarcas.slice(1).map(c => { const [x, y] = P(c); return `<line x1="${sede[0]}" y1="${sede[1]}" x2="${x}" y2="${y}"/>`; }).join('')}
  ${comarcas.map(c => { const [x, y] = P(c); const esq = lado[c.n] === 'esq'; return `<g${c.sede ? ' class="sede"' : ''}><circle cx="${x}" cy="${y}" r="${c.sede ? 11 : 7}"/><text x="${esq ? x - 16 : x + 16}" y="${y + 9 + (dy[c.n] || 0)}" text-anchor="${esq ? 'end' : 'start'}">${c.n}</text></g>`; }).join('')}
</svg>`;
}

const blocoComarcas = v => v === 'a'
  ? `<section class="corresp"><div class="in">
  <div class="corresp-txt">${tit('a', 'Advocacia correspondente')}<p>${caixa(servicos.correspondente)}</p><a class="btn" href="/a/servicos/#correspondente">Ver os serviços ${ic('seta')}</a></div>
  <div class="corresp-lista"><p class="corresp-rot">Comarcas atendidas</p><ul class="comarcas">${comarcas.map(c => `<li${c.sede ? ' class="sede"' : ''}>${c.n}</li>`).join('')}</ul></div>
</div></section>`
  : `<section class="comarcas-b" id="correspondente"><div class="in">
  <div class="cb-txt">${tit('b', `${comarcas.length} comarcas, de Garuva a Florianópolis`, { rot: '§ Advocacia correspondente' })}
    <p>${caixa(servicos.correspondente)}</p>
    <ol class="cb-lista">${comarcas.map(c => `<li${c.sede ? ' class="sede"' : ''}>${c.n}</li>`).join('')}</ol>
  </div>
  <figure class="cb-mapa">${mapaComarcas()}<figcaption>Posição aproximada das sedes das comarcas. Atendimento a outros escritórios 24 horas por dia.</figcaption></figure>
</div></section>`;

const quemAtende = a => escritorio.equipe.filter(p => p.foco.includes(a.nome));

const formContato = (areaSel = '') => `<form class="form-contato" data-contato>
  <div class="campos">
    <label><span>Nome</span><input name="nome" autocomplete="name" required maxlength="250"></label>
    <label><span>E-mail</span><input name="email" type="email" autocomplete="email" required maxlength="250"></label>
    <label><span>Telefone com DDD</span><input name="telefone" type="tel" autocomplete="tel" required></label>
    <label><span>Assunto</span><select name="area"><option value="">Escolha a área</option>${areas.map(a => `<option${a.nome === areaSel ? ' selected' : ''}>${esc(a.nome)}</option>`).join('')}<option>Advocacia correspondente</option><option>Outro assunto</option></select></label>
    <label class="largo"><span>Mensagem</span><textarea name="mensagem" rows="5" required maxlength="450"></textarea></label>
  </div>
  <div class="form-botoes"><button type="submit" name="via" value="whats">${ic('wa')} Enviar pelo WhatsApp</button><button type="submit" name="via" value="email" class="sec">${ic('mail')} Enviar por e-mail</button></div>
  <p class="form-nota">O envio abre o WhatsApp ou o seu e-mail com a mensagem pronta para ${E.completo}.</p>
</form>`;

const contatoLinhas = () => `<ul class="contato-linhas">
  <li>${ic('tel')}<div><b>Telefone</b><a href="tel:${E.fone.h}">${E.fone.t}</a></div></li>
  <li>${ic('wa')}<div><b>Celular e WhatsApp</b><a href="${waLink()}"${fora}>${E.celular.t}</a></div></li>
  <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><b>Endereço</b>${E.endereco.join('<br>')}<a href="${E.mapa}"${fora}>Ver no mapa</a></div></li>
</ul>`;

// ---------- páginas ----------
function home(v) {
  if (v === 'a') {
    const slides = [['balanca', 'Advocacia com ética, competência, presteza e eficiência'], ['biblioteca', 'Inspirado no legado do Dr. João Carlos Gastaldi'], ['assinatura', 'Assessoria e consultoria a pessoas físicas e jurídicas']];
    return `<section class="hero" data-slides>
  ${slides.map(([img], i) => `<img class="hero-foto${i ? '' : ' on'}" src="/assets/img/${img}.webp" alt="" width="1600" height="364"${i ? ' loading="lazy"' : ' fetchpriority="high"'}>`).join('')}
  <div class="in hero-in">
    <p class="hero-rot">${E.oab} · Joinville, SC</p>
    <h1>${slides.map(([, t], i) => `<span class="hero-t${i ? '' : ' on'}">${t}</span>`).join('')}</h1>
    <div class="hero-acoes"><a class="btn" href="${waLink()}"${fora}>${ic('wa')} Fale com um advogado</a><a class="btn sec" href="/a/areas-de-atuacao/">Áreas de atuação</a></div>
  </div>
  <div class="hero-pontos" role="tablist" aria-label="Fotos">${slides.map((_, i) => `<button type="button" role="tab" aria-selected="${i ? 'false' : 'true'}" aria-label="Foto ${i + 1}"></button>`).join('')}</div>
</section>
<section class="home-corpo"><div class="in">
  <div class="home-esq">
    <article class="home-bloco">${tit('a', 'O Escritório')}<div class="home-bloco-c"><img src="/assets/img/escritorio-mini.webp" alt="" width="220" height="162" loading="lazy"><div><p>${caixa(escritorio.resumo)}</p><a class="mais" href="/a/o-escritorio/">Saiba mais ${ic('seta')}</a></div></div></article>
    <article class="home-bloco">${tit('a', 'Serviços')}<div class="home-bloco-c"><img src="/assets/img/servicos-mini.webp" alt="" width="200" height="133" loading="lazy"><div><p>${servicos.resumo}</p><a class="mais" href="/a/servicos/">Saiba mais ${ic('seta')}</a></div></div></article>
    <ul class="pilares">${escritorio.pilaresLista.map(p => `<li>${p}</li>`).join('')}</ul>
  </div>
  <aside class="home-dir">${tit('a', 'Áreas de Atuação')}
    <ul class="areas-lista">${areas.map(a => `<li><a href="/a/areas-de-atuacao/${a.slug}/"><span class="ic-caixa">${ic('balanca')}</span>${a.nome}</a></li>`).join('')}</ul>
  </aside>
</div></section>
${blocoAtendimento('a')}
<section class="legado-a"><img src="/assets/img/biblioteca.webp" alt="" width="1600" height="364" loading="lazy"><div class="in"><blockquote><p>${caixa(escritorio.legado)}</p></blockquote><a class="btn sec" href="/a/o-escritorio/">Conheça o escritório ${ic('seta')}</a></div></section>
${blocoComarcas('a')}
<section class="faixa-contato"><div class="in"><div><h2>Fale com o escritório</h2><p>${E.endereco[0]}, ${E.endereco[1]}</p></div><div class="faixa-acoes"><a class="btn" href="${waLink()}"${fora}>${ic('wa')} ${E.celular.t}</a><a class="btn sec" href="tel:${E.fone.h}">${ic('tel')} ${E.fone.t}</a></div></div></section>`;
  }
  // B
  return `<section class="abre"><div class="in">
  <div class="abre-txt">
    <p class="rot">${E.oab} · Joinville, Santa Catarina</p>
    <h1>Gastaldi &amp; Schultz <span>Advogados Associados</span></h1>
    <p class="abre-lead">${escritorio.pilares}</p>
    <div class="abre-acoes"><a class="btn" href="${waLink()}"${fora}>${ic('wa')} Falar com um advogado</a><a class="btn sec" href="/b/o-escritorio/">O escritório</a></div>
    <p class="abre-nota">${ic('relogio')} ${E.semAgendamento}</p>
  </div>
  <nav class="sumario" aria-label="Áreas de atuação">
    <p class="sumario-tit">Sumário <span>Áreas de atuação</span></p>
    <ol>${areas.map((a, i) => `<li><a href="/b/areas-de-atuacao/${a.slug}/"><span class="s-art">${art(i)}</span><span class="s-nome">${a.nome}</span><span class="s-pont" aria-hidden="true"></span>${ic('seta')}</a></li>`).join('')}</ol>
  </nav>
</div></section>
<figure class="tarja"><img src="/assets/img/balanca.webp" alt="Balança da justiça, livro e martelo" width="1598" height="364"><figcaption class="in">${escritorio.pilaresLista.map(p => `<span>${p}</span>`).join('')}</figcaption></figure>
<section class="legado"><div class="in">
  ${tit('b', 'Um escritório alicerçado em um legado', { rot: '§ O Escritório' })}
  <ol class="linha">
    <li><p class="l-oab">OAB/SC 1567</p><h3>Dr. João Carlos Gastaldi</h3><p>Exerceu nobremente a advocacia por décadas, reconhecido nacionalmente pela competência, seriedade e eficiência profissional. <i>In memoriam.</i></p></li>
    <li><p class="l-oab">Fundador</p><h3>Dr. Paulo Fernando Gastaldi</h3><p>Filho do Dr. João Carlos, funda o escritório. Pós-graduado em Direito do Trabalho e Processual do Trabalho, mais de 16 anos de profissão.</p></li>
    <li><p class="l-oab">${E.oab}</p><h3>Gastaldi &amp; Schultz</h3><p>Com a Dra. Cynthia Schultz de S. Thiago, pós-graduada em Direito Médico, Previdenciário e de Saúde, o escritório atua em todas as áreas do Direito.</p></li>
  </ol>
  <a class="link-seta" href="/b/o-escritorio/">Conheça a equipe ${ic('seta')}</a>
</div></section>
<section class="frentes"><div class="in">
  ${tit('b', 'Mais de 15 anos de experiência', { rot: '§ Serviços' })}
  <div class="frentes-grid">
    ${Object.entries(grupos).map(([g, nome]) => `<div class="frente"><h3>${nome}</h3><ul>${areas.filter(a => a.grupo === g).map(a => `<li><a href="/b/areas-de-atuacao/${a.slug}/">${a.nome}</a></li>`).join('')}</ul></div>`).join('')}
  </div>
  <p class="frentes-nota">${servicos.p4.replace('ADVOCACIA CORRESPONDENTE', '<b>advocacia correspondente</b>')}</p>
</div></section>
${semana()}
${blocoComarcas('b')}
<section class="fecho"><div class="in"><h2>Rua Sete de Setembro, 144.<br>Centro de Joinville.</h2><div class="fecho-acoes"><a class="btn" href="${waLink()}"${fora}>${ic('wa')} ${E.celular.t}</a><a class="btn sec" href="tel:${E.fone.h}">${ic('tel')} ${E.fone.t}</a><a class="btn sec" href="/b/onde-estamos/">${ic('pin')} Como chegar</a></div></div></section>`;
}

function oEscritorio(v) {
  const equipe = escritorio.equipe.map((p, i) => v === 'a'
    ? `<article class="adv"><div class="placa"><span>${p.trat === 'Doutor' ? 'Dr.' : 'Dra.'}</span><b>${p.nome}</b><small>${p.cargo}</small></div><div><p>${p.texto}</p><p class="adv-foco"><b>Atuação:</b> ${p.foco.join(' · ')}</p></div></article>`
    : `<article class="adv"><p class="adv-n">${String(i + 1).padStart(2, '0')}</p><div><h3>${p.trat === 'Doutor' ? 'Dr.' : 'Dra.'} ${p.nome}</h3><p class="adv-cargo">${p.cargo}</p>${lista(p.formacao)}${p.extra ? `<p class="adv-extra">${p.extra}</p>` : ''}<p class="adv-foco">${p.foco.map(f => { const a = areas.find(x => x.nome === f); return `<a href="/b/areas-de-atuacao/${a.slug}/">${f}</a>`; }).join('')}</p></div></article>`).join('');
  return capa(v, 'O Escritório', v === 'a' ? `${E.completo} · ${E.oab}` : 'Fundado por Paulo Fernando Gastaldi, alicerçado no legado do Dr. João Carlos Gastaldi.', { rot: '§ O Escritório' }) + `
<section class="texto"><div class="in estreito">
  <p class="lead">${caixa(escritorio.fundacao)}</p>
  <p>${caixa(escritorio.legado)}</p>
  <p>${escritorio.pilares}</p>
</div></section>
<section class="pilares-faixa"><div class="in"><ul>${escritorio.pilaresLista.map((p, i) => `<li>${v === 'b' ? `<small>${['I', 'II', 'III', 'IV'][i]}</small>` : ''}${p}</li>`).join('')}</ul></div></section>
<section class="equipe"><div class="in">
  ${tit(v, 'Nossa equipe é formada por dois advogados', { rot: '§ Equipe' })}
  <div class="equipe-lista">${equipe}</div>
</div></section>`;
}

function areasPagina(v) {
  if (v === 'a') return capa(v, 'Áreas de Atuação', 'Atuamos em todas as áreas do Direito.', { img: 'balanca' }) + `
<section class="areas-pag"><div class="in">
  <ul class="areas-grade">${areas.map(a => `<li><a href="/a/areas-de-atuacao/${a.slug}/"><span class="ic-caixa">${ic('balanca')}</span><h2>${a.nome}</h2><p>${a.texto}</p><span class="mais">Saiba mais ${ic('seta')}</span></a></li>`).join('')}</ul>
</div></section>
${blocoAtendimento('a')}`;
  return capa(v, 'Áreas de Atuação', 'Atuamos em todas as áreas do Direito. Escolha o assunto para ver o que o escritório faz em cada uma.', { rot: '§ Sumário' }) + `
<section class="codigo"><div class="in">
  ${Object.entries(grupos).map(([g, nome]) => `<div class="cod-grupo"><h2 class="cod-tit">${nome}</h2><ol>${areas.map((a, i) => [a, i]).filter(([a]) => a.grupo === g).map(([a, i]) => `<li><a href="/b/areas-de-atuacao/${a.slug}/"><span class="s-art">${art(i)}</span><div><h3>${a.nome}</h3><p>${a.texto}</p></div>${ic('seta')}</a></li>`).join('')}</ol></div>`).join('')}
</div></section>`;
}

function areaPagina(v, a, i) {
  const quem = quemAtende(a);
  const ant = areas[(i - 1 + areas.length) % areas.length], prox = areas[(i + 1) % areas.length];
  const msg = waLink(`Olá! Vim pelo site da Gastaldi & Schultz e preciso de orientação sobre ${a.nome}.`);
  const quemHtml = quem.length ? `<div class="quem"><p class="quem-rot">Quem atende</p>${quem.map(p => `<p><b>${p.trat === 'Doutor' ? 'Dr.' : 'Dra.'} ${p.nome}</b><br>${p.formacao.slice(1).join('; ') || p.cargo}</p>`).join('')}</div>` : `<div class="quem"><p class="quem-rot">Quem atende</p><p>Dr. Paulo Fernando Gastaldi e Dra. Cynthia Schultz de S. Thiago</p></div>`;
  if (v === 'a') return capa(v, a.nome, '', { img: ['balanca', 'biblioteca', 'assinatura'][i % 3] }).replace('<a href="/a/">Home</a> / ', '<a href="/a/">Home</a> / <a href="/a/areas-de-atuacao/">Áreas de Atuação</a> / ') + `
<section class="area-det"><div class="in">
  <article class="area-txt">
    <p class="lead">${a.texto}</p>
    ${quemHtml}
    <div class="area-cta"><p>Converse com o escritório sobre ${a.nome.toLowerCase()}. ${E.semAgendamento}</p><a class="btn" href="${msg}"${fora}>${ic('wa')} Falar pelo WhatsApp</a><a class="btn sec" href="tel:${E.fone.h}">${ic('tel')} ${E.fone.t}</a></div>
  </article>
  <aside class="home-dir">${tit('a', 'Áreas de Atuação', { tag: 'p', cls: 'tit-p' })}<ul class="areas-lista">${areas.map(x => `<li><a href="/a/areas-de-atuacao/${x.slug}/"${x === a ? ' aria-current="page"' : ''}><span class="ic-caixa">${ic('balanca')}</span>${x.nome}</a></li>`).join('')}</ul></aside>
</div></section>`;
  return `<section class="capa capa-art"><div class="in"><p class="rot"><a href="/b/areas-de-atuacao/">§ Áreas de atuação</a></p><p class="art-n">${art(i)}</p><h1>${a.nome}</h1><p class="capa-sub">${grupos[a.grupo]}</p></div></section>
<section class="area-det"><div class="in">
  <article class="area-txt"><p class="lead">${a.texto}</p>${quemHtml}</article>
  <aside class="area-cta"><p class="rot">Fale com o escritório</p><p>${E.semAgendamento} Atendimento de segunda a sexta, das 8h30 às 18h30.</p><a class="btn" href="${msg}"${fora}>${ic('wa')} WhatsApp</a><a class="btn sec" href="tel:${E.fone.h}">${ic('tel')} ${E.fone.t}</a></aside>
</div></section>
<nav class="art-nav" aria-label="Outras áreas"><div class="in">
  <a href="/b/areas-de-atuacao/${ant.slug}/">${ic('voltar')}<span><small>${art(areas.indexOf(ant))}</small>${ant.nome}</span></a>
  <a href="/b/areas-de-atuacao/${prox.slug}/" class="prox"><span><small>${art(areas.indexOf(prox))}</small>${prox.nome}</span>${ic('seta')}</a>
</div></nav>`;
}

function servicosPagina(v) {
  return capa(v, 'Serviços', 'Assessoria e consultoria jurídicas a pessoas físicas e jurídicas.', { img: 'assinatura', rot: '§ Serviços' }) + `
<section class="texto"><div class="in estreito">
  <p class="lead">${caixa(servicos.p1)}</p>
  <p>${servicos.p2.replace('áreas de direito', '<b>áreas de direito').replace('de família.', 'de família</b>.')}</p>
  <p>${servicos.p3}</p>
  <p>${caixa(servicos.p4)}</p>
</div></section>
<section class="auxiliares" id="correspondente"><div class="in">
  ${tit(v, 'Advocacia correspondente, 24 horas por dia', { rot: '§ Para outros escritórios' })}
  <p class="aux-lead">Serviços auxiliares a outros escritórios de advocacia:</p>
  <ol class="aux-lista">${servicos.auxiliares.map(s => `<li>${s}</li>`).join('')}</ol>
  <a class="btn" href="${waLink('Olá! Sou de outro escritório e preciso de um correspondente em Joinville e região.')}"${fora}>${ic('wa')} Pedir um correspondente</a>
</div></section>
${v === 'a' ? blocoComarcas('a') : blocoComarcas('b')}`;
}

function consultas(v) {
  return capa(v, 'Consultas', 'Horários de atendimento e acesso aos portais dos tribunais.', { img: 'biblioteca', rot: '§ Consultas' }) + `
${blocoAtendimento(v)}
<section class="tribunais"><div class="in">
  ${tit(v, 'Consulta processual', { rot: '§ Tribunais' })}
  <p>Acompanhe o andamento do seu processo no portal do tribunal da área.</p>
  <table class="trib-tab"><thead><tr><th scope="col">Área</th><th scope="col">Portal</th></tr></thead><tbody>
  ${tribunais.map(t => `<tr><th scope="row">${t.area}</th><td>${t.links.map(k => `<a href="${portais[k].url}"${fora}>${portais[k].nome} ${ic('fora')}</a>`).join('')}</td></tr>`).join('')}
  </tbody></table>
  <p class="blog">Acesse também o nosso blog jurídico: <a href="${E.blog}"${fora}>gastaldiadv.blogspot.com ${ic('fora')}</a></p>
</div></section>`;
}

function faleConosco(v) {
  return capa(v, 'Fale Conosco', E.semAgendamento, { img: 'assinatura', rot: '§ Contato' }) + `
<section class="contato"><div class="in">
  <div class="contato-info">${contatoLinhas()}
    <div class="contato-horas"><p><b>${atendimento.normal.rot}</b><br>${atendimento.normal.quando}.</p><p><b>${atendimento.emergencial.rot}</b><br>${atendimento.emergencial.quando}, pelo ${E.celular.t}.</p></div>
  </div>
  <div class="contato-form">${tit(v, 'Envie sua mensagem', { tag: 'h2' })}${formContato()}</div>
</div></section>`;
}

function ondeEstamos(v) {
  return capa(v, 'Onde Estamos', `${E.endereco[0]}, ${E.endereco[1]}`, { img: 'biblioteca', rot: '§ Endereço' }) + `
<section class="onde"><div class="in">
  <div class="onde-mapa"><iframe src="${E.mapaEmbed}" title="Mapa: ${E.endereco[0]}, Joinville" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
  <div class="onde-info">
    <h2>${E.completo}</h2>
    <p class="onde-end">${E.endereco.join('<br>')}</p>
    <a class="btn" href="${E.mapa}"${fora}>${ic('pin')} Abrir no Google Maps</a>
    ${contatoLinhas()}
  </div>
</div></section>`;
}

export function gerarVersao(v) {
  const N = E.completo;
  const p = {};
  p.index = pagina(v, 'index', '', `${N} · Advogados em Joinville`, `Escritório de advocacia em Joinville (${E.oab}): trabalhista, previdenciário INSS, direito médico e de saúde, família, cível, consumidor, imobiliário e criminal.`, home(v));
  p['o-escritorio'] = pagina(v, 'o-escritorio', 'o-escritorio/', `O Escritório · ${N}`, 'Fundado por Paulo Fernando Gastaldi e alicerçado no legado do Dr. João Carlos Gastaldi (OAB/SC 1567).', oEscritorio(v));
  p['areas-de-atuacao'] = pagina(v, 'areas-de-atuacao', 'areas-de-atuacao/', `Áreas de Atuação · ${N}`, 'Treze áreas de atuação, do trabalhista ao criminal.', areasPagina(v));
  areas.forEach((a, i) => { p[`areas-de-atuacao/${a.slug}`] = pagina(v, `areas-de-atuacao/${a.slug}`, `areas-de-atuacao/${a.slug}/`, `${a.nome} · ${N}`, a.texto, areaPagina(v, a, i)); });
  p.servicos = pagina(v, 'servicos', 'servicos/', `Serviços · ${N}`, 'Assessoria e consultoria jurídicas e advocacia correspondente em 17 comarcas de Santa Catarina.', servicosPagina(v));
  p.consultas = pagina(v, 'consultas', 'consultas/', `Consultas · ${N}`, 'Horários de atendimento e portais dos tribunais para consulta processual.', consultas(v));
  p['fale-conosco'] = pagina(v, 'fale-conosco', 'fale-conosco/', `Fale Conosco · ${N}`, `Telefone ${E.fone.t}, celular ${E.celular.t}, ${E.email}.`, faleConosco(v));
  p['onde-estamos'] = pagina(v, 'onde-estamos', 'onde-estamos/', `Onde Estamos · ${N}`, `${E.endereco.join(', ')}.`, ondeEstamos(v));
  return p;
}
