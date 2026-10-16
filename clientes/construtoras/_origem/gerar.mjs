// Gera as páginas da Overtus por segmento, cada uma em duas versões (A "Editorial" e B "Marinho"):
//   clientes/construtoras/public/  -> construtoras.overtus.com.br (construtoras e incorporadoras)
//   clientes/industrias/public/    -> industrias.overtus.com.br (indústrias)
// O visual é o do site da agência (clientes/agencia): base.css, a.css, b.css, fontes e imagens são copiados de lá a cada geração,
// e seg.css / seg.js (nesta pasta) acrescentam as peças próprias dos segmentos.
// Indústrias tem também a versão em inglês (conteudo-industrias-en.mjs), em /en/, /en/a/ e /en/b/, com troca de idioma no topo.
// Textos fixos (botões, rodapé, escolha de versão) por idioma em ui.mjs.
// Rodar depois de mudar qualquer texto: node clientes/construtoras/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import construtoras from './conteudo-construtoras.mjs';
import industrias from './conteudo-industrias.mjs';
import industriasEn from './conteudo-industrias-en.mjs';
import UI from './ui.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const clientes = path.join(aqui, '../..');
const agencia = path.join(clientes, 'agencia/public/assets');
const SEGMENTOS = [construtoras, industrias];
// Idiomas de cada segmento: o conteúdo em português e, quando houver, a tradução (mesmas páginas, mesmos endereços com /en na frente).
construtoras.idiomas = { pt: construtoras };
industrias.idiomas = industriasEn.idiomas = { pt: industrias, en: industriasEn };
industrias.lang = 'pt';
industriasEn.lang = 'en';
const prefixo = lang => (lang === 'pt' ? '' : '/' + lang);
const AGENCIA = 'https://agencia.overtus.com.br';
const AGENDA = 'https://cal.com/overtus';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const num = i => String(i + 1).padStart(2, '0');

const ICONES = {
  sites: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 8h18M8 21h8M12 17v4"/>',
  lancamentos: '<path d="M4 20V10l8-6 8 6v10"/><path d="M9 20v-6h6v6M12 4V1"/>',
  vendas: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h3v3H8zM13 7h3v3h-3zM8 12h3v3H8zM13 12h3v3h-3z"/>',
  comercial: '<path d="M3 4h18l-7 8v6l-4 2v-8z"/>',
  catalogo: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4z"/><path d="M16.5 14v6M13.5 17h6"/>',
  setores: '<path d="M3 21V10l5 3V10l5 3V6l8 4v11z"/><path d="M7 17h2M12 17h2M17 17h1"/>',
  representantes: '<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20c.6-3.4 2.8-5.5 5.5-5.5s4.9 2.1 5.5 5.5M14 15.2c.9-.5 1.9-.7 3-.7 2.3 0 4 1.6 4.5 4.5"/>',
};
const icone = slug => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[slug] || ICONES.sites}</svg>`;
const seta = '<svg class="seta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>';
const alerta = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 8v5M12 16.5v.5"/><circle cx="12" cy="12" r="9"/></svg>';
const marcaHTML = seg => `<span class="logo-o" aria-hidden="true">O<i></i></span><span class="logo-t">Overtus</span><span class="seg-tag">${seg.curto}</span>`;
const agendar = (txt, cls = 'btn btn-prim') => `<a class="${cls}" href="${AGENDA}" data-agendar>${txt}</a>`;
const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;
const tela = (nome, alt, endereco = '', attrs = '') => `<figure class="tela"><div class="tela-barra"><i></i><i></i><i></i>${endereco ? `<span>${endereco}</span>` : ''}</div>${img(nome, alt, attrs)}</figure>`;

// Tabela de disponibilidade fictícia (demonstração): 12 andares, 4 finais. Status estável entre gerações.
const ANDARES = 12, FINAIS = 4;
const TIPOS = { 1: ['3 dormitórios, 1 suíte', '92 m²'], 2: ['2 dormitórios', '68 m²'], 3: ['2 dormitórios', '68 m²'], 4: ['3 dormitórios, 1 suíte', '92 m²'] };
function statusUnidade(andar, final) {
  const h = (andar * 37 + final * 61 + andar * final * 11) % 20;
  if (andar <= 3) return h < 15 ? 'vendido' : h < 17 ? 'reservado' : 'disponivel';
  if (andar >= 10) return h < 6 ? 'vendido' : h < 8 ? 'reservado' : 'disponivel';
  return h < 9 ? 'vendido' : h < 12 ? 'reservado' : 'disponivel';
}
const NOME_STATUS = { disponivel: 'Disponível', reservado: 'Reservado', vendido: 'Vendido' };
const unidades = [];
for (let a = ANDARES; a >= 1; a--) for (let f = 1; f <= FINAIS; f++) unidades.push({ a, f, n: `${a}0${f}`, s: statusUnidade(a, f), t: TIPOS[f] });
const contagem = s => unidades.filter(u => u.s === s).length;

// Fachada pequena (abertura da versão A de construtoras): o mesmo espelho, só em cores.
const fachada = () => `<div class="hero-mock" aria-hidden="true">
  <figure class="tela mock-tela"><div class="tela-barra"><i></i><i></i><i></i><span>Tabela de disponibilidade · Torre A</span></div>
    <div class="fachada">
      <div class="fachada-topo"></div>
      <div class="fachada-grade">${unidades.map(u => `<i class="u-${u.s}"></i>`).join('')}</div>
      <div class="fachada-base"></div>
    </div>
    <div class="mock-leg"><span class="lg-disponivel">Disponível</span><span class="lg-reservado">Reservado</span><span class="lg-vendido">Vendido</span></div>
  </figure>
  <div class="flutua flutua-1"><b>Novo contato</b><span>Página do empreendimento · WhatsApp</span></div>
  <div class="flutua flutua-2"><b>Reserva aprovada</b><span>Unidade 704 · Torre A</span></div>
</div>`;

// Demonstração interativa do espelho de vendas.
const espelho = seg => `<div class="espelho" data-espelho>
  <div class="esp-torre">
    <div class="esp-cab"><b>Torre A</b><span>${ANDARES} andares · ${FINAIS} unidades por andar</span></div>
    <div class="esp-leg">
      <span class="lg-disponivel">Disponível <b data-conta="disponivel">${contagem('disponivel')}</b></span>
      <span class="lg-reservado">Reservado <b data-conta="reservado">${contagem('reservado')}</b></span>
      <span class="lg-vendido">Vendido <b data-conta="vendido">${contagem('vendido')}</b></span>
    </div>
    <div class="esp-grade" role="grid" aria-label="Unidades da Torre A">${Array.from({ length: ANDARES }, (_, i) => ANDARES - i).map(a => `<div class="esp-andar" role="row"><span class="esp-n">${a}º</span>${unidades.filter(u => u.a === a).map(u => `<button type="button" role="gridcell" class="esp-u u-${u.s}" data-n="${u.n}" data-s="${u.s}" data-t="${esc(u.t[0])}" data-m="${u.t[1]}" aria-label="Unidade ${u.n}, ${NOME_STATUS[u.s]}">${u.n}</button>`).join('')}</div>`).join('')}</div>
  </div>
  <aside class="esp-painel" aria-live="polite">
    <span class="rotulo">Unidade</span>
    <p class="esp-num" data-campo="n">704</p>
    <span class="esp-status" data-campo="s">Disponível</span>
    <dl>
      <div><dt>Tipologia</dt><dd data-campo="t">2 dormitórios</dd></div>
      <div><dt>Área privativa</dt><dd data-campo="m">68 m²</dd></div>
      <div><dt>Posição</dt><dd data-campo="p">Final 04, 7º andar</dd></div>
    </dl>
    <button type="button" class="btn btn-prim" data-reservar>Reservar unidade</button>
    <p class="esp-msg" data-msg></p>
    <p class="esp-aviso">${seg.demo.aviso}</p>
  </aside>
</div>`;

// Peças do catálogo (demonstração de cotação), desenhadas em traço.
const PECAS = {
  flange: '<circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="7"/><circle cx="24" cy="11" r="1.8"/><circle cx="24" cy="37" r="1.8"/><circle cx="11" cy="24" r="1.8"/><circle cx="37" cy="24" r="1.8"/>',
  bucha: '<ellipse cx="24" cy="12" rx="12" ry="4.5"/><ellipse cx="24" cy="12" rx="6" ry="2.2"/><path d="M12 12v22c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5V12"/>',
  polia: '<circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="12.5"/><circle cx="24" cy="24" r="4"/><path d="M24 11.5v8.5M24 28v8.5M11.5 24H20M28 24h8.5"/>',
  eixo: '<rect x="6" y="19" width="36" height="10" rx="2"/><path d="M14 19v10M34 19v10M21 24h6"/>',
  suporte: '<path d="M10 38V12h8v18h20v8z"/><circle cx="14" cy="17" r="1.8"/><circle cx="32" cy="34" r="1.8"/>',
  anel: '<circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="11"/><path d="M24 8v5M24 35v5"/>',
};
const peca = forma => `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PECAS[forma] || PECAS.flange}</svg>`;

// Demonstração do catálogo com lista de cotação (indústrias): busca, filtro por linha, lista com quantidades e anexo de desenho.
const cotacao = seg => {
  const d = seg.demo;
  return `<div class="cotacao" data-cotacao data-tx-add="${esc(d.tx.adicionar)}" data-tx-na-lista="${esc(d.tx.naLista)}" data-tx-remover="${esc(d.tx.remover)}" data-tx-qtd="${esc(d.tx.qtd)}" data-tx-enviado="${esc(d.tx.enviado)}" data-tx-arquivos="${esc(d.tx.arquivos)}">
  <div class="cot-cat">
    <div class="cot-cab"><b>${d.catalogo}</b><span>${d.produtos.length} ${d.tx.produtos} · ${d.linhas.length} ${d.tx.linhas}</span></div>
    <label class="cot-busca"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg><input type="search" data-busca placeholder="${esc(d.tx.busca)}" aria-label="${esc(d.tx.busca)}"></label>
    <div class="cot-filtros" role="group" aria-label="${esc(d.tx.filtro)}"><button type="button" data-linha="" aria-pressed="true">${d.tx.todas}</button>${d.linhas.map(([id, nome]) => `<button type="button" data-linha="${id}" aria-pressed="false">${nome}</button>`).join('')}</div>
    <ul class="cot-lista">${d.produtos.map(([cod, nome, linha, spec, forma]) => `<li data-l="${linha}" data-cod="${cod}" data-nome="${esc(nome)}" data-txt="${esc((cod + ' ' + nome + ' ' + spec).toLowerCase())}">
      <span class="cot-peca">${peca(forma)}</span>
      <div class="cot-info"><code>${cod}</code><b>${nome}</b><span>${spec}</span></div>
      <button type="button" class="cot-add" data-add aria-label="${esc(d.tx.adicionar)}: ${esc(nome)}">${d.tx.adicionar}</button>
    </li>`).join('')}</ul>
    <p class="cot-nada" data-nada hidden>${d.tx.nada}</p>
  </div>
  <aside class="cot-painel" aria-live="polite">
    <span class="rotulo">${d.tx.lista}</span>
    <p class="cot-total"><b data-total>0</b> ${d.tx.itens}</p>
    <ul class="cot-itens" data-itens></ul>
    <p class="cot-vazio" data-vazio>${d.tx.vazia}</p>
    <label class="cot-anexo"><input type="file" data-anexo multiple accept="${d.tx.formatos}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.5l-7.8 7.8a5 5 0 0 1-7-7l8.4-8.4a3.4 3.4 0 0 1 4.8 4.8l-8.4 8.4a1.7 1.7 0 0 1-2.4-2.4l7.7-7.7"/></svg><span><b>${d.tx.anexar}</b><small data-arquivos>${d.tx.formatosTx}</small></span></label>
    <button type="button" class="btn btn-prim" data-enviar disabled>${d.tx.enviar}</button>
    <p class="cot-msg" data-msg></p>
    <p class="esp-aviso">${d.aviso}</p>
  </aside>
</div>`;
};

// O site por dentro: abas com as páginas de um site industrial e o que entra em cada uma.
const anatomia = seg => {
  const a = seg.anatomia;
  const id = `ana-${seg.lang || 'pt'}`;
  return `<div class="anatomia" data-anatomia>
  <div class="ana-abas" role="tablist" aria-label="${esc(a.rotulo)}">${a.paginas.map(([nome], i) => `<button type="button" role="tab" id="${id}-t${i}" aria-controls="${id}-p${i}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}><span class="n">${num(i)}</span>${nome}</button>`).join('')}</div>
  <div class="ana-telas">${a.paginas.map(([nome, caminho, texto, blocos, porque], i) => `<figure class="tela ana-tela" role="tabpanel" id="${id}-p${i}" aria-labelledby="${id}-t${i}"${i ? ' hidden' : ''}>
    <div class="tela-barra"><i></i><i></i><i></i><span>${a.dominio}${caminho}</span></div>
    <div class="ana-corpo">
      <ol class="ana-wire">${blocos.map((b, j) => `<li class="w-${j === 0 ? 'topo' : (j % 3) + 1}"><span>${b}</span></li>`).join('')}</ol>
      <div class="ana-txt"><h3>${nome}</h3><p>${texto}</p><p class="ana-porque"><b>${a.porqueRotulo}</b>${porque}</p></div>
    </div>
  </figure>`).join('')}</div>
</div>`;
};

function documento(seg, { v, slug, corpo, t }) {
  const [titulo, desc] = seg.paginas[slug];
  const caminho = lang => `${prefixo(lang)}/${v}/${slug === 'index' ? '' : slug + '/'}`;
  const url = `${seg.dominio}${caminho(seg.lang || 'pt')}`;
  const og = `${seg.dominio}/assets/og-${seg.lang === 'en' ? 'en-' : ''}${v}.jpg`;
  const alternativos = Object.keys(seg.idiomas).length > 1
    ? '\n' + Object.keys(seg.idiomas).map(l => `<link rel="alternate" hreflang="${UI[l].html}" href="${seg.dominio}${caminho(l)}">`).join('\n')
    : '';
  return `<!doctype html>
<html lang="${t.html}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">${alternativos}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Overtus">
<meta property="og:locale" content="${t.locale}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${og}">
<meta name="theme-color" content="#182644">
<link rel="icon" href="/assets/img/favicon-48.png">
<link rel="apple-touch-icon" href="/assets/img/icone-apple-180.png">
<link rel="preload" href="/assets/fontes/general-sans-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fontes/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<link rel="stylesheet" href="/assets/seg.css">
</head>
<body class="v-${v} p-${slug.split('/')[0]} s-${seg.slug}" data-cal="overtus">
${corpo}
<script src="/assets/site.js" defer></script>
<script src="/assets/seg.js" defer></script>
</body>
</html>
`;
}

function gerarVersao(seg, v) {
  const lang = seg.lang || 'pt';
  const t = UI[lang];
  const L = s => `${prefixo(lang)}/${v}/${s === 'index' ? '' : s + '/'}`;
  const outro = SEGMENTOS.find(o => o !== seg && o !== seg.idiomas.pt);
  const { grupos } = seg;
  // Troca de idioma (só quando o segmento tem mais de um): leva para a mesma página no outro idioma.
  const idiomas = Object.keys(seg.idiomas);
  const trocaIdioma = slug => (idiomas.length > 1 ? `<div class="idioma" role="group" aria-label="${t.idiomaAria}">${idiomas.map(l => `<a href="${prefixo(l)}/${v}/${slug === 'index' ? '' : slug + '/'}" hreflang="${UI[l].html}" lang="${UI[l].html}"${l === lang ? ' aria-current="true"' : ''} title="${UI[l].nome}">${UI[l].curto}</a>`).join('')}</div>` : '');

  const topo = slug => `<header class="topo">
  <div class="in">
    <a class="marca" href="${L('index')}" aria-label="${t.inicioAria(seg)}">${marcaHTML(seg)}</a>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>${t.menu}</em></button>
    <nav id="nav">${seg.menu.map(([s, nome]) => `<a href="${L(s)}"${slug === s || slug.startsWith(s + '/') ? ' aria-current="page"' : ''}>${nome}</a>`).join('')}
      ${trocaIdioma(slug)}${agendar(t.agendar, 'btn btn-prim nav-cta')}</nav>
  </div>
</header>`;

  const rodape = () => `<footer class="rodape">
  <div class="in">
    <div class="r-marca"><a class="marca" href="${L('index')}">${marcaHTML(seg)}</a><p>${t.slogan}</p><p class="r-2">${seg.hero.lead}</p></div>
    <div><h3>${t.solucoes}</h3><ul>${grupos.map(g => `<li><a href="${L('solucoes/' + g.slug)}">${g.nome}</a></li>`).join('')}</ul></div>
    <div><h3>${seg.segmento}</h3><ul>${seg.menu.filter(([s]) => s !== 'solucoes').map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}</ul></div>
    <div><h3>${t.overtus}</h3><ul><li><a href="${AGENCIA}/${v}/">${t.inicioOvertus}</a></li>${lang === 'pt' ? `<li><a href="${outro.dominio}/${v}/">${t.paraSeg(outro)}</a></li>` : ''}<li><a href="${AGENDA}" data-agendar>${t.agendar}</a></li></ul></div>
  </div>
  <div class="in r-base"><span>© ${new Date().getFullYear()} Overtus</span><span>${t.especialistas(seg)}</span></div>
</footer>`;

  const cabeca = (rotulo, titulo, lead, trilha = []) => `<section class="cabeca">
  <div class="in">
    <nav class="trilha" aria-label="${t.trilhaAria}"><a href="${L('index')}">${t.inicio}</a>${trilha.map(([s, t]) => (s ? `<a href="${L(s)}">${t}</a>` : `<span>${t}</span>`)).join('')}</nav>
    <span class="rotulo">${rotulo}</span>
    <h1>${titulo}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>
</section>`;

  const cta = () => `<section class="cta">
  <div class="in">
    <img class="cta-forma" src="/assets/img/forma.webp" alt="" loading="lazy" width="800" height="800">
    <div class="cta-txt"><span class="rotulo">${t.paraSeg(seg)}</span><h2>${seg.chamada.titulo}</h2><p>${seg.chamada.texto}</p>
    <div class="acoes">${agendar(t.agendar)}<a class="btn btn-sec" href="${L('solucoes')}">${t.verSolucoes}</a></div><p class="nota">${seg.chamada.nota}</p></div>
  </div>
</section>`;

  const dores = (cls = 'secao') => `<section class="${cls} dores-sec">
  <div class="in dores">
    <div class="dores-cab"><span class="rotulo">${seg.dores.rotulo}</span><h2>${seg.dores.titulo}</h2></div>
    <ul class="dores-lista">${seg.dores.itens.map(([t, d]) => `<li>${alerta}<div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ul>
  </div>
</section>`;

  const dif = () => `<section class="dif">
  <div class="in">
    <div class="dif-txt"><span class="rotulo">${seg.diferencial.rotulo}</span><h2>${seg.diferencial.titulo}</h2><p class="lead">${seg.diferencial.texto}</p>
    <a class="link" href="${L('como-trabalhamos')}">${t.comoTrabalhamos} ${seta}</a></div>
    <ol class="dif-passos">${seg.diferencial.pontos.map(([t, d], i) => `<li><span class="n">${num(i)}</span><b>${t}</b><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>`;

  // Jornada: um prédio que sobe a cada fase (faixa escura nas duas versões).
  const predio = () => `<ol class="predio">${seg.jornada.fases.map(([t, d, ch], i) => `<li style="--andares:${i + 2}">
    <div class="pr-bloco" aria-hidden="true"><i></i></div>
    <div class="pr-txt"><span class="n">${num(i)}</span><h3>${t}</h3><p>${d}</p><ul>${ch.map(c => `<li>${c}</li>`).join('')}</ul></div>
  </li>`).join('')}</ol>`;
  const jornada = (link = true) => `<section class="jornada-sec">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">${seg.jornada.rotulo}</span><h2 class="h-secao">${seg.jornada.titulo}</h2></div>${link ? `<a class="link" href="${L('jornada')}">${t.verFases} ${seta}</a>` : ''}</div>
    ${predio()}
  </div>
</section>`;

  const demo = cls => (seg.demo ? `<section class="${cls} demo-sec" id="demonstracao">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">${seg.demo.rotulo}</span><h2 class="h-secao">${seg.demo.titulo}</h2></div><p class="lead">${seg.demo.lead}</p></div>
    ${seg.demo.tipo === 'cotacao' ? cotacao(seg) : espelho(seg)}
  </div>
</section>` : '');

  const anatomiaSec = cls => (seg.anatomia ? `<section class="${cls} ana-sec">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">${seg.anatomia.rotulo}</span><h2 class="h-secao">${seg.anatomia.titulo}</h2></div><p class="lead">${seg.anatomia.lead}</p></div>
    ${anatomia(seg)}
  </div>
</section>` : '');

  const projetos = cls => (seg.projetos ? `<section class="${cls}">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">${t.portfolio}</span><h2 class="h-secao">${t.projetosTit}</h2></div>${lang === 'pt' ? `<a class="link" href="${AGENCIA}/${v}/projetos/">${t.todosProjetos} ${seta}</a>` : ''}</div>
    <div class="projs">${seg.projetos.map(([im, s, d]) => `<article class="proj">${tela(im, t.projAlt(s))}<div class="proj-c"><span class="rotulo">${s}</span><p>${d}</p></div></article>`).join('')}</div>
    <p class="legenda">${seg.legendaProjetos}</p>
  </div>
</section>` : '');

  const paraQuem = cls => `<section class="${cls}">
  <div class="in">
    ${seg.setores ? `<div class="sec-cab"><div><span class="rotulo">${seg.paraQuem.rotulo}</span><h2 class="h-secao">${seg.paraQuem.titulo}</h2></div><a class="link" href="${L('setores')}">${t.verSetores} ${seta}</a></div>` : `<span class="rotulo">${seg.paraQuem.rotulo}</span><h2 class="h-secao">${seg.paraQuem.titulo}</h2>`}
    <ul class="quem">${seg.paraQuem.itens.map(([t, d]) => `<li><b>${t}</b><p>${d}</p></li>`).join('')}</ul>
  </div>
</section>`;

  const faqLista = (lista = seg.faq) => `<div class="faq">${lista.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}<span aria-hidden="true"></span></summary><p>${a}</p></details>`).join('')}</div>`;
  const faq = (cls, curto = true) => `<section class="${cls}">
  <div class="in duas faq-duas">
    <div><span class="rotulo">${t.faqRotulo}</span><h2>${t.faqTit(seg)}</h2>${curto ? `<a class="link" href="${L('perguntas')}">${t.todasPerguntas} ${seta}</a>` : ''}</div>
    ${faqLista(curto ? seg.faq.slice(0, 3) : seg.faq)}
  </div>
</section>`;

  // Depois da jornada (escura), as seções alternam clara e alternativa até a chamada final.
  const restantes = () => [seg.anatomia && anatomiaSec, seg.demo && demo, seg.projetos && projetos, paraQuem, c => faq(c)]
    .filter(Boolean).map((f, i) => f(i % 2 ? 'secao secao-alt' : 'secao')).join('\n');

  const P = {};

  // ---------- Soluções (visão geral) ----------
  P.solucoes = `${cabeca(t.solucoes, t.solTit(seg), t.solLead(seg), [[null, t.solucoes]])}
<section class="secao">
  <div class="in">
    <div class="grupos">${grupos.map((g, i) => `<a class="grupo" href="${L('solucoes/' + g.slug)}">
      <div class="grupo-cab">${icone(g.slug)}<span class="n">${num(i)}</span></div>
      <h2>${g.nome}</h2><p>${g.resumo}</p>
      <ul>${g.itens.map(([t]) => `<li>${check}${t}</li>`).join('')}</ul>
      <b class="mais">${t.conhecer} ${seta}</b>
    </a>`).join('')}</div>
  </div>
</section>
${jornada()}
${faq('secao')}
${cta()}`;

  // ---------- Uma página por grupo ----------
  grupos.forEach(g => {
    const outros = grupos.filter(o => o.slug !== g.slug);
    // Faixa do meio: a demonstração (vendas ou catálogo), o site por dentro e os projetos (sites de indústria) ou o "como começamos".
    const meio = (g.slug === 'vendas' || g.slug === 'catalogo') && seg.demo ? demo('secao secao-alt')
      : g.slug === 'sites' && seg.anatomia ? `${anatomiaSec('secao secao-alt')}\n${projetos('secao')}`
      : g.slug === 'sites' && seg.projetos ? projetos('secao secao-alt') : '';
    const outrosAlt = g.slug === 'sites' && seg.anatomia ? true : !meio && v === 'b';
    P['solucoes/' + g.slug] = `${cabeca(g.nome, g.titulo, g.lead, [['solucoes', t.solucoes], [null, g.nome]])}
<section class="secao">
  <div class="in">
    <div class="itens">${g.itens.map(([t, d, inc], i) => `<article class="item">
      <div class="item-t"><span class="n">${num(i)}</span><h2>${t}</h2></div>
      <p>${d}</p>
      <ul>${inc.map(x => `<li>${check}${x}</li>`).join('')}</ul>
    </article>`).join('')}</div>
  </div>
</section>
${meio ? meio : dif()}
<section class="secao${outrosAlt ? ' secao-alt' : ''}">
  <div class="in">
    <span class="rotulo">${t.outrasSolucoes}</span>
    <div class="outros">${outros.map(o => `<a href="${L('solucoes/' + o.slug)}">${icone(o.slug)}<span><b>${o.nome}</b>${o.resumo}</span>${seta}</a>`).join('')}</div>
  </div>
</section>
${cta()}`;
  });

  // ---------- Jornada ----------
  P.jornada = `${cabeca(seg.jornada.rotulo, seg.jornada.titulo, seg.jornada.lead, [[null, seg.jornada.rotulo]])}
<section class="secao">
  <div class="in">
    <div class="fases">${seg.jornada.fases.map(([t, d, ch], i) => `<article class="fase">
      <span class="fase-n">${num(i)}</span>
      <div><h2>${t}</h2><p>${d}</p></div>
      <ul>${ch.map(c => `<li>${check}${c}</li>`).join('')}</ul>
    </article>`).join('')}</div>
  </div>
</section>
${jornada(false)}
${demo('secao')}
${cta()}`;

  // ---------- Como trabalhamos ----------
  P['como-trabalhamos'] = `${cabeca(t.comoTrabalhamos, t.comoTit, seg.diferencial.texto, [[null, t.comoTrabalhamos]])}
<section class="secao etapas-sec">
  <div class="in">
    <ol class="etapas etapas-det">${seg.etapas.map(([tit, d, e], i) => `<li><span class="n">${num(i)}</span><div><h3>${tit}</h3><p>${d}</p><p class="entrega"><b>${t.voceRecebe}</b>${e}</p></div></li>`).join('')}</ol>
  </div>
</section>
${paraQuem('secao secao-alt')}
${cta()}`;

  // ---------- Perguntas ----------
  // ---------- Setores (quando o segmento tem) ----------
  if (seg.setores) P.setores = `${cabeca(seg.setores.rotulo, seg.setores.titulo, seg.setores.lead, [[null, seg.setores.rotulo]])}
<section class="secao">
  <div class="in">
    <div class="setores">${seg.setores.itens.map(([nome, procura, mostra], i) => `<article class="setor">
      <div class="setor-cab"><span class="n">${num(i)}</span><h2>${nome}</h2></div>
      <div class="setor-procura"><span class="rotulo">${seg.setores.procuraRotulo}</span><p>${procura}</p></div>
      <div class="setor-mostra"><span class="rotulo">${seg.setores.mostraRotulo}</span><ul>${mostra.map(m => `<li>${check}${m}</li>`).join('')}</ul></div>
    </article>`).join('')}</div>
  </div>
</section>
${anatomiaSec('secao secao-alt')}
${cta()}`;

  P.perguntas = `${cabeca(t.faqRotulo, t.faqPagTit(seg), '', [[null, t.perguntas]])}
<section class="secao">
  <div class="in faq-larga">${faqLista()}</div>
</section>
${cta()}`;

  // ---------- Contato ----------
  P.contato = `${cabeca(t.contato, t.contatoTit, seg.chamada.texto, [[null, t.contato]])}
<section class="secao">
  <div class="in contato">
    <div class="agenda" id="agenda" data-agenda-inline><p>${t.carregando}</p></div>
    <aside class="contato-lado">
      <h2>${t.naConversa}</h2>
      <ol class="conversa">
${t.conversa(seg).map(([b, tx]) => `        <li><b>${b}</b>${tx}</li>`).join('\n')}
      </ol>
      <p class="nota">${seg.chamada.nota}</p>
      <a class="btn btn-sec" href="${AGENDA}" target="_blank" rel="noopener">${t.abrirAgenda}</a>
    </aside>
  </div>
</section>`;

  return { P, topo, rodape, cta, dores, dif, jornada, restantes, L, t };
}

// ---------- Início, versão A "Editorial" ----------
function inicioA(seg, k) {
  const { cta, dores, dif, jornada, restantes, L, t } = k;
  const visual = seg.slug === 'construtoras' ? fachada() : `<div class="hero-pilha" aria-hidden="true">
      ${seg.projetos.slice(0, 3).map(([im], i) => tela(im, '', '', i === 2 ? 'loading="eager" fetchpriority="high"' : 'loading="eager"')).join('\n      ')}
    </div>`;
  return `<section class="hero">
  <div class="in">
    <div class="hero-txt">
      <span class="rotulo">${seg.hero.rotulo}</span>
      <h1>${seg.hero.titulo}</h1>
      <p class="lead">${seg.hero.lead}</p>
      <div class="acoes">${agendar(t.agendar)}<a class="btn btn-sec" href="${L('solucoes')}">${t.verSolucoes}</a></div>
    </div>
    ${visual}
  </div>
  <div class="in faixa">${seg.faixa.map(f => `<span>${f}</span>`).join('')}</div>
</section>
${dores()}
${dif()}
<section class="secao">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">${t.solucoes}</span><h2 class="h-secao">${t.quatroFrentes}</h2></div><a class="link" href="${L('solucoes')}">${t.todasSolucoes} ${seta}</a></div>
    <div class="linhas">${seg.grupos.map((g, i) => `<a class="linha" href="${L('solucoes/' + g.slug)}">
      <span class="n">${num(i)}</span><h3>${g.nome}</h3><p>${g.resumo}</p>${seta}
    </a>`).join('')}</div>
  </div>
</section>
${jornada()}
${restantes()}
${cta()}`;
}

// ---------- Início, versão B "Marinho" ----------
function inicioB(seg, k) {
  const { cta, dores, dif, jornada, restantes, L, t } = k;
  return `<section class="hero">
  <div class="brilho" aria-hidden="true"></div>
  <img class="hero-forma" src="/assets/img/forma.webp" alt="" width="800" height="800" fetchpriority="high">
  <div class="in">
    <div class="hero-txt">
      <span class="rotulo">${seg.hero.rotulo}</span>
      <h1>${seg.hero.tituloSimples}</h1>
      <p class="lead">${seg.hero.lead}</p>
      <div class="acoes">${agendar(t.agendar)}<a class="btn btn-sec" href="${L('solucoes')}">${t.verSolucoes}</a></div>
    </div>
    <a class="hero-vidro" href="${L('como-trabalhamos')}">
      <span class="rotulo">${seg.diferencial.rotulo}</span>
      <p>${seg.hero.vidro}</p>
      <b>${t.comoFunciona} ${seta}</b>
    </a>
  </div>
</section>
${dores()}
<section class="bento-sec">
  <div class="in">
    <div class="sec-cab"><div><span class="rotulo">${t.solucoes}</span><h2 class="h-secao">${t.quatroFrentes}</h2></div><a class="link" href="${L('solucoes')}">${t.todasSolucoes} ${seta}</a></div>
    <div class="bento">${seg.grupos.map((g, i) => `<a class="bt bt-${i + 1}" href="${L('solucoes/' + g.slug)}">
      <div class="bt-cab">${icone(g.slug)}<span class="n">${num(i)}</span></div><h3>${g.nome}</h3><p>${g.resumo}</p>
      <ul>${g.itens.map(([it]) => `<li>${it}</li>`).join('')}</ul><b class="mais">${t.conhecer} ${seta}</b>
    </a>`).join('')}</div>
  </div>
</section>
${dif()}
${jornada()}
${restantes()}
${cta()}`;
}

// Página de escolha entre as duas versões (raiz do endereço; /en/ na versão em inglês).
const escolha = seg => {
  const lang = seg.lang || 'pt';
  const t = UI[lang], e = t.escolha, pre = prefixo(lang);
  const outros = Object.keys(seg.idiomas).filter(l => l !== lang);
  const og = `${seg.dominio}/assets/og-${lang === 'en' ? 'en-' : ''}b.jpg`;
  const img = `/assets/versao-${lang === 'en' ? 'en-' : ''}`;
  return `<!doctype html>
<html lang="${t.html}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(e.titulo(seg))}</title>
<meta name="description" content="${esc(e.desc(seg))}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${seg.dominio}${pre}/">${outros.length ? '\n' + Object.keys(seg.idiomas).map(l => `<link rel="alternate" hreflang="${UI[l].html}" href="${seg.dominio}${prefixo(l)}/">`).join('\n') : ''}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Overtus">
<meta property="og:locale" content="${t.locale}">
<meta property="og:title" content="${esc(e.titulo(seg))}">
<meta property="og:description" content="${e.ogDesc}">
<meta property="og:url" content="${seg.dominio}${pre}/">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(e.titulo(seg))}">
<meta name="twitter:description" content="${e.ogDesc}">
<meta name="twitter:image" content="${og}">
<link rel="icon" href="/assets/img/favicon-48.png">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/seg.css">
</head>
<body class="escolha">
<header><div class="in"><span class="marca">${marcaHTML(seg)}</span><small>${e.faixa(seg)}${outros.map(l => ` · <a href="${prefixo(l)}/" hreflang="${UI[l].html}" lang="${UI[l].html}">${UI[l].nome}</a>`).join('')}</small></div></header>
<main><div class="in">
  <a class="v" href="${pre}/a/"><img src="${img}a.jpg" alt="${e.altA}">
    <div><span>${e.a[0]}</span><h2>${e.a[1]}</h2><p>${e.a[2]}</p><b>${e.a[3]}</b></div></a>
  <a class="v" href="${pre}/b/"><img src="${img}b.jpg" alt="${e.altB}">
    <div><span>${e.b[0]}</span><h2>${e.b[1]}</h2><p>${e.b[2]}</p><b>${e.b[3]}</b></div></a>
</div></main>
</body>
</html>
`;
};

for (const seg of SEGMENTOS) {
  const pub = path.join(clientes, seg.slug, 'public');
  const assets = path.join(pub, 'assets');
  fs.mkdirSync(path.join(assets, 'img'), { recursive: true });
  // Visual da agência (copiado, nunca editado aqui) + peças dos segmentos.
  for (const f of ['base.css', 'a.css', 'b.css', 'site.js']) fs.copyFileSync(path.join(agencia, f), path.join(assets, f));
  fs.cpSync(path.join(agencia, 'fontes'), path.join(assets, 'fontes'), { recursive: true });
  const conteudos = Object.values(seg.idiomas);
  const projetos = new Set(conteudos.flatMap(c => (c.projetos || []).map(([im]) => `${im}.webp`)));
  // Imagens: as da agência e, quando não estão lá, as desta pasta (_origem/img).
  for (const f of ['favicon-48.png', 'icone-apple-180.png', 'forma.webp', ...projetos]) {
    const daAgencia = path.join(agencia, 'img', f);
    fs.copyFileSync(fs.existsSync(daAgencia) ? daAgencia : path.join(aqui, 'img', f), path.join(assets, 'img', f));
  }
  for (const f of ['seg.css', 'seg.js']) fs.copyFileSync(path.join(aqui, f), path.join(assets, f));

  for (const c of conteudos) {
    const lang = c.lang || 'pt';
    const raiz = path.join(pub, prefixo(lang));
    fs.mkdirSync(raiz, { recursive: true });
    fs.writeFileSync(path.join(raiz, 'index.html'), escolha(c));
    for (const [v, inicio] of [['a', inicioA], ['b', inicioB]]) {
      const k = gerarVersao(c, v);
      k.P.index = inicio(c, k);
      fs.rmSync(path.join(raiz, v), { recursive: true, force: true });
      for (const [slug, corpo] of Object.entries(k.P)) {
        const dir = path.join(raiz, v, slug === 'index' ? '' : slug);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), documento(c, { v, slug, t: k.t, corpo: `${k.topo(slug)}\n<main>\n${corpo}\n</main>\n${k.rodape()}` }));
      }
      console.log(`${seg.slug}${lang === 'pt' ? '' : ' (' + lang + ')'}: versão ${v.toUpperCase()}, ${Object.keys(k.P).length} páginas`);
    }
  }
}
