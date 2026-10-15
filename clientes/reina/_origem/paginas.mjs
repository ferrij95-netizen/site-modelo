// Páginas das duas versões do site da Reina Sementes.
// A = "Institucional": a mesma ordem do site atual (capa com o lema, institucional, beneficiamento com galeria,
//     tratamento, armazenagem, "onde destacamos" sobre a foto do acesso, contato), cabeçalho claro e faixas alternadas.
// B = "Reinando Qualidade": capa escura em tela cheia com o segundo lema do site atual, números da empresa,
//     serviços em painéis com foto, linha do beneficiamento em trilho e armazenagem lado a lado.
import * as C from './conteudo.mjs';

const { site } = C;
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const alt = n => (C.fotos.find(f => f[0] === n) || [n, ''])[1];
const foto = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt(n))}" loading="lazy" decoding="async"${extra ? ' ' + extra : ''}>`;

const I = {
  familia: '<circle cx="8" cy="7" r="3"/><circle cx="16.5" cy="8.5" r="2.5"/><path d="M2.5 20a5.5 5.5 0 0 1 11 0M13 20a4 4 0 0 1 8 0"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  coroa: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 10H5z"/><path d="M5 21h14"/>',
  lupa: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 6 6"/>',
  balanca: '<path d="M3 17h18v3H3zM6 17V8h7v9M13 11h5l2 3v3"/><circle cx="9.5" cy="5" r="1.5"/>',
  moega: '<path d="M3 5h18l-6 8v6h-6v-6z"/><path d="M8 9h8"/>',
  peneira: '<ellipse cx="12" cy="8" rx="9" ry="3"/><path d="M3 8v3c0 1.7 4 3 9 3s9-1.3 9-3V8M8 18h.01M12 20h.01M16 18h.01M10 16.5h.01M14 16.5h.01"/>',
  secador: '<path d="M7 21V3h10v18M5 21h14M10 7h4M10 11h4M10 15h4"/><path d="M19.5 6c1 1 1 2 0 3s-1 2 0 3"/>',
  semente: '<path d="M12 21v-8M12 13c0-4.5 3.2-7.5 8-7.5 0 5-3.2 7.5-8 7.5zM12 15.5c0-3.5-2.6-6-7-6 0 4.2 2.6 6 7 6z"/>',
  gota: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  po: '<path d="M6 10h12l-1.5 10h-9z"/><path d="M9 10V6h6v4M9 4h6M8 14h8"/>',
  engrenagem: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  fluxo: '<path d="M3 7h13l-3-3M21 17H8l3 3"/>',
  silo: '<path d="M4 21V9l4-4 4 4v12M12 21V11l4-3.5 4 3.5v10M2 21h20M6 12h4M6 15.5h4M14 14h4M14 17.5h4"/>',
  termometro: '<path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z"/><path d="M12 9v7M17 6h3M17 10h3"/>',
  escudo: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  pessoas: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
  cadeado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
};
const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

const PAG = {
  index: ['Reina Sementes · Produção, beneficiamento e armazenagem de sementes em Patos de Minas (MG)', 'Empresa familiar desde 2014 às margens da BR 365: produção de sementes, beneficiamento, tratamento industrial e armazenagem convencional e climatizada.'],
  empresa: ['A Empresa · Reina Sementes', 'Empresa familiar criada em 2014 no Alto Paranaíba, a 7 km de Patos de Minas (MG), aliando tradição e tecnologia no agronegócio.'],
  beneficiamento: ['Beneficiamento de sementes · Reina Sementes', 'Planta industrial nova e automatizada: amostragem, recebimento, descarga, pré-limpeza, secagem e beneficiamento.'],
  tratamento: ['Tratamento de sementes · Reina Sementes', 'Tratamento industrial de sementes com aplicação individual dos produtos, pó secante e fluxo contínuo.'],
  armazenagem: ['Armazenagem · Reina Sementes', 'Armazenagem convencional em silos metálicos e de madeira ventilados e armazenagem climatizada com controle de temperatura e umidade.'],
  estrutura: ['Estrutura · Reina Sementes', 'Fotos da unidade da Reina Sementes na BR 365, km 414,7, em Patos de Minas (MG).'],
  contato: ['Contato · Reina Sementes', 'Telefone e endereço da Reina Sementes: Rodovia BR 365, km 414,7, Patos de Minas (MG).'],
};
const MENU = [['index', 'Início'], ['empresa', 'A Empresa'], ['beneficiamento', 'Beneficiamento'], ['tratamento', 'Tratamento'], ['armazenagem', 'Armazenagem'], ['estrutura', 'Estrutura'], ['contato', 'Contato']];

export function gerarVersao(v) {
  const A = v === 'a';
  const L = s => `/${v}/${s === 'index' ? '' : s + '/'}`;
  const nav = slug => MENU.map(([s, t]) => `<a href="${L(s)}"${slug === s ? ' aria-current="page"' : ''}>${t}</a>`).join('');
  const btnFone = (cls = 'btn') => `<a class="${cls}" href="${site.foneHref}">${ico('fone')}${site.fone}</a>`;

  const head = slug => {
    const [titulo, desc] = PAG[slug];
    const url = site.dominio + L(slug);
    return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Reina Sementes">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.dominio}/assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${site.dominio}/assets/og-${v}.jpg">
<link rel="icon" href="/assets/coroa.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>`;
  };

  const header = (slug, sobreFoto) => `<header class="topo${sobreFoto ? ' sobre-foto' : ''}"><div class="in">
  <a class="logo" href="${L('index')}" aria-label="Reina Sementes, início"><img class="l-cor" src="/assets/logo-cor.svg" alt="Reina Sementes" width="152" height="51"><img class="l-claro" src="/assets/logo-claro.svg" alt="" width="152" height="51"></a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span><b class="sr">Menu</b></button>
  <nav id="menu" aria-label="Principal">${nav(slug)}${btnFone('btn btn-fone')}</nav>
</div></header>`;

  const footer = () => `<footer class="rodape"><div class="in">
  <div class="r-marca"><img src="/assets/logo-claro.svg" alt="Reina Sementes" width="190" height="63"><p>${esc(C.lema)}</p></div>
  <div><h3>Explore</h3>${MENU.slice(1).map(([s, t]) => `<a href="${L(s)}">${t}</a>`).join('')}</div>
  <div><h3>Onde estamos</h3><p>${site.endereco}<br>${site.cidade}<br>CEP ${site.cep}</p><p><a href="${site.foneHref}">${site.fone}</a></p></div>
  <div><h3>Interno</h3><a href="${site.sistema}" rel="noopener">${ico('cadeado')}Sistema</a></div>
</div><div class="in r-base"><span>© ${new Date().getFullYear()} ${site.razao} · CNPJ ${site.cnpj}</span><span>Prévia do novo site</span></div></footer>
<script src="/assets/reina.js" defer></script>
</body>
</html>`;

  const pagina = (slug, corpo, sobreFoto = true) => `${head(slug)}
<body class="v-${v} p-${slug}">
${header(slug, sobreFoto)}
<main>
${corpo}
</main>
${footer()}`;

  const capaInterna = (slug, kicker, titulo, texto, img) => `<section class="capa-int">
  <div class="capa-int-foto">${foto(img, 'fetchpriority="high"')}</div>
  <div class="in"><nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a><span>/</span>${esc(MENU.find(m => m[0] === slug)[1])}</nav>
  <span class="kicker">${kicker}</span><h1>${titulo}</h1><p>${texto}</p></div>
</section>`;

  const ctaFinal = () => `<section class="cta-final"><div class="in">
  <div><span class="kicker">Fale com a Reina Sementes</span><h2>Produção, beneficiamento, tratamento e armazenagem de sementes na BR 365.</h2></div>
  <div class="cta-acoes">${btnFone('btn btn-claro')}<a class="btn btn-linha-claro" href="${L('contato')}">Como chegar ${ico('seta')}</a></div>
</div></section>`;

  const etapasTrilho = () => `<ol class="etapas">${C.beneficiamento.etapas.map((e, i) => `<li><span class="e-n">${String(i + 1).padStart(2, '0')}</span><span class="e-ico">${ico(e.ico)}</span><h3>${e.t}</h3><p>${e.p}</p></li>`).join('')}</ol>`;

  const modosArmazem = () => `<div class="modos">${C.armazenagem.modos.map((m, i) => `<article class="modo modo-${i + 1}"><span class="modo-ico">${ico(m.ico)}</span><h3>${m.t}</h3><ul>${m.itens.map(x => `<li>${ico('check')}${x}</li>`).join('')}</ul></article>`).join('')}</div>`;

  const tratItens = () => `<ul class="trat-lista">${C.tratamento.itens.map((t, i) => `<li><span class="t-n">${ico(t.ico)}</span><div><h3>${t.t}</h3><p>${t.p}</p></div></li>`).join('')}</ul>`;

  const principios = () => `<div class="princ">${C.destaques.itens.map(d => `<div class="pr"><span class="pr-ico">${ico(d.ico)}</span><b>100%</b><span>${d.t}</span></div>`).join('')}</div>`;

  const galeria = (lista = C.fotos) => `<div class="galeria">${lista.map(([n, a]) => `<a class="g-item" href="/assets/img/${n}.webp" data-legenda="${esc(a)}">${foto(n)}</a>`).join('')}</div>`;

  const mapa = () => `<div class="mapa"><iframe src="${site.mapa}" title="Mapa: Reina Sementes na BR 365, km 414,7" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>`;

  // ---------- Início ----------
  const inicioA = () => `<section class="capa-a">
  <div class="capa-foto">${foto('fachada', 'fetchpriority="high"')}</div>
  <div class="in"><div class="capa-txt">
    <span class="kicker">Sementes · Patos de Minas (MG)</span>
    <h1>Por trás de uma plantação de sucesso, há uma <em>semente de qualidade</em>.</h1>
    <p>Produção de sementes, beneficiamento, tratamento industrial e armazenagem convencional e climatizada, às margens da BR 365.</p>
    <div class="capa-acoes"><a class="btn" href="${L('empresa')}">Conheça a empresa ${ico('seta')}</a>${btnFone('btn btn-linha-claro')}</div>
  </div></div>
</section>

<section class="sec sobre-a" id="institucional"><div class="in">
  <div class="sec-tit"><span class="kicker">Sobre a Reina Sementes</span><h2>Tradição e tecnologia no agronegócio</h2><p>${C.sobre.intro}</p></div>
  <div class="pilares">${C.sobre.pilares.map((p, i) => `<article class="pilar pilar-${i + 1}"><span class="pilar-ico">${ico(p.ico)}</span><h3>${p.t}</h3><p>${p.p}</p></article>`).join('')}</div>
</div></section>

<section class="sec benef-a" id="beneficiamento"><div class="in">
  <div class="benef-cab"><div><span class="kicker">Beneficiamento</span><h2>Da amostra à semente classificada</h2></div><p>${C.beneficiamento.intro}</p></div>
  ${etapasTrilho()}
  <a class="link-seta" href="${L('beneficiamento')}">Ver o beneficiamento ${ico('seta')}</a>
</div></section>

<section class="faixa-galeria" aria-label="Fotos da unidade">${galeria(C.fotos.slice(1, 9))}</section>

<section class="sec trat-a" id="tratamento"><div class="in trat-grid">
  <figure class="trat-foto">${foto('equipe')}<figcaption>Equipe Reina Sementes na planta</figcaption></figure>
  <div><span class="kicker">Tratamento</span><h2>Tratamento industrial de sementes</h2><p class="lead">${C.tratamento.intro}</p>${tratItens()}</div>
</div></section>

<section class="sec armaz-a" id="armazenagem"><div class="in">
  <div class="sec-tit"><span class="kicker">Armazenagem</span><h2>Armazéns e silos modernos</h2><p>${C.armazenagem.intro}</p></div>
  ${modosArmazem()}
</div></section>

<section class="destaque-a"><div class="destaque-foto">${foto('acesso')}</div><div class="in">
  <div class="sec-tit claro"><span class="kicker">Onde destacamos</span><h2>${C.destaques.intro}</h2></div>
  ${principios()}
</div></section>

<section class="sec contato-a" id="contato"><div class="in contato-grid">
  <div><span class="kicker">Entre em contato</span><h2>Fale agora mesmo com a Reina Sementes</h2>
    <ul class="dados"><li>${ico('pin')}<span><b>Onde estamos</b>${site.endereco}<br>${site.cidade}</span></li><li>${ico('fone')}<span><b>Telefone</b><a href="${site.foneHref}">${site.fone}</a></span></li></ul>
    <div class="capa-acoes">${btnFone()}<a class="btn btn-linha" href="${site.rota}" target="_blank" rel="noopener">Traçar rota ${ico('externo')}</a></div></div>
  ${mapa()}
</div></section>`;

  const inicioB = () => `<section class="capa-b">
  <div class="capa-foto">${foto('acesso', 'fetchpriority="high"')}</div>
  <div class="in">
    <span class="kicker">Reina Sementes · desde 2014</span>
    <h1>Reinando<br><em>qualidade.</em></h1>
    <p>${C.lema}</p>
    <div class="capa-acoes"><a class="btn" href="${L('beneficiamento')}">Como cuidamos da semente ${ico('seta')}</a>${btnFone('btn btn-linha-claro')}</div>
  </div>
  <ul class="capa-fatos">${C.sobre.fatos.map(([n, t]) => `<li><b>${n}</b><span>${t}</span></li>`).join('')}</ul>
</section>

<section class="sec manifesto"><div class="in manifesto-grid">
  <div><span class="kicker">Sobre a Reina Sementes</span><h2>Uma empresa familiar que une tradição e tecnologia.</h2></div>
  <div><p class="lead">${C.sobre.intro}</p><p>${C.sobre.pilares[0].p}</p><a class="link-seta" href="${L('empresa')}">Conheça a empresa ${ico('seta')}</a></div>
</div></section>

<section class="sec servicos-b"><div class="in">
  <div class="sec-tit"><span class="kicker">O que fazemos</span><h2>Beneficiamento, tratamento e armazenagem</h2></div>
  <div class="paineis">
    <a class="painel p1" href="${L('beneficiamento')}">${foto('aerea-unidade')}<div><span>01</span><h3>Beneficiamento</h3><p>${C.beneficiamento.intro}</p><b>Ver etapas ${ico('seta')}</b></div></a>
    <a class="painel p2" href="${L('tratamento')}">${foto('equipe')}<div><span>02</span><h3>Tratamento</h3><p>${C.tratamento.intro}</p><b>Ver tratamento ${ico('seta')}</b></div></a>
    <a class="painel p3" href="${L('armazenagem')}">${foto('fachada-carretas')}<div><span>03</span><h3>Armazenagem</h3><p>Convencional e climatizada, com termometria em todos os silos e gestão de estoque (WMS).</p><b>Ver armazenagem ${ico('seta')}</b></div></a>
  </div>
</div></section>

<section class="sec linha-b"><div class="in">
  <div class="benef-cab"><div><span class="kicker">Linha de beneficiamento</span><h2>Seis etapas até a semente de qualidade</h2></div><p>Planta industrial nova e automatizada, com equipamentos que preservam a qualidade da semente.</p></div>
  ${etapasTrilho()}
</div></section>

<section class="sec local-b"><div class="in local-grid">
  <figure class="local-foto">${foto('aerea-lavouras')}<span class="selo">${ico('pin')}BR 365 · km 414,7</span></figure>
  <div><span class="kicker">Posição geográfica</span><h2>No coração do Alto Paranaíba</h2><p class="lead">${C.sobre.pilares[1].p}</p></div>
</div></section>

<section class="sec armaz-b"><div class="in">
  <div class="sec-tit"><span class="kicker">Armazenagem</span><h2>Convencional ou climatizada</h2><p>${C.armazenagem.intro}</p></div>
  ${modosArmazem()}
</div></section>

<section class="sec destaque-b"><div class="in">
  <div class="sec-tit"><span class="kicker">Onde destacamos</span><h2>${C.destaques.intro}</h2></div>
  ${principios()}
</div></section>
${ctaFinal()}`;

  const pags = {};
  pags.index = pagina('index', A ? inicioA() : inicioB(), true);

  pags.empresa = pagina('empresa', `${capaInterna('empresa', 'A Empresa', 'Empresa familiar, criada em 2014', C.sobre.intro, 'fachada-bandeiras')}
<section class="sec"><div class="in fatos-faixa">${C.sobre.fatos.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('')}</div></section>
<section class="sec sec-alt"><div class="in">
  ${C.sobre.pilares.map((p, i) => `<article class="bloco ${i % 2 ? 'inv' : ''}"><figure>${foto(['equipe', 'aerea-lavouras', 'fachada'][i])}</figure><div><span class="pilar-ico">${ico(p.ico)}</span><h2>${p.t}</h2><p class="lead">${p.p}</p></div></article>`).join('')}
</div></section>
<section class="sec"><div class="in"><div class="sec-tit"><span class="kicker">Onde destacamos</span><h2>${C.destaques.intro}</h2></div>${principios()}</div></section>
${ctaFinal()}`);

  pags.beneficiamento = pagina('beneficiamento', `${capaInterna('beneficiamento', 'Beneficiamento', 'Planta industrial nova e automatizada', C.beneficiamento.intro, 'aerea-unidade')}
<section class="sec"><div class="in"><div class="sec-tit"><span class="kicker">Etapas</span><h2>O caminho da semente dentro da Reina</h2><p>Cada lote passa pelas seis etapas abaixo antes de seguir para o tratamento ou para a armazenagem.</p></div>${etapasTrilho()}</div></section>
<section class="sec sec-alt"><div class="in bloco"><figure>${foto('equipe')}</figure><div><span class="kicker">Equipe</span><h2>Profissionais capacitados em cada etapa</h2><p class="lead">${C.sobre.pilares[2].p}</p><a class="link-seta" href="${L('tratamento')}">Próximo: tratamento ${ico('seta')}</a></div></div></section>
${ctaFinal()}`);

  pags.tratamento = pagina('tratamento', `${capaInterna('tratamento', 'Tratamento', 'Tratamento industrial de sementes', C.tratamento.intro, 'equipe')}
<section class="sec"><div class="in trat-pagina">${C.tratamento.itens.map((t, i) => `<article class="trat-card"><span class="t-num">${String(i + 1).padStart(2, '0')}</span><span class="t-n">${ico(t.ico)}</span><h2>${t.t}</h2><p>${t.p}</p></article>`).join('')}</div></section>
<section class="sec sec-alt"><div class="in bloco inv"><figure>${foto('fachada-carretas')}</figure><div><span class="kicker">Depois do tratamento</span><h2>Semente pronta para armazenar ou expedir</h2><p class="lead">${C.armazenagem.intro}</p><a class="link-seta" href="${L('armazenagem')}">Ver armazenagem ${ico('seta')}</a></div></div></section>
${ctaFinal()}`);

  pags.armazenagem = pagina('armazenagem', `${capaInterna('armazenagem', 'Armazenagem', 'Armazenagem convencional e climatizada', C.armazenagem.intro, 'aerea-lavouras')}
<section class="sec"><div class="in">${modosArmazem()}</div></section>
<section class="sec sec-alt"><div class="in bloco"><figure>${foto('aerea-unidade')}</figure><div><span class="kicker">Controle</span><h2>Termometria e gestão de estoque</h2><p class="lead">Todos os silos contam com termometria, e o estoque, nas duas modalidades, é controlado por sistema de gestão de armazém (WMS).</p></div></div></section>
${ctaFinal()}`);

  pags.estrutura = pagina('estrutura', `${capaInterna('estrutura', 'Estrutura', 'Nossa unidade na BR 365', 'Sede, armazéns e planta de beneficiamento às margens da BR 365, a 7 km de Patos de Minas.', 'portico-ceu')}
<section class="sec"><div class="in">${galeria()}</div></section>
${ctaFinal()}`);

  pags.contato = pagina('contato', `${capaInterna('contato', 'Contato', 'Entre em contato agora mesmo', 'Estamos às margens da BR 365, km 414,7, em Patos de Minas (MG).', 'portaria-chao')}
<section class="sec"><div class="in contato-grid">
  <div><ul class="dados"><li>${ico('pin')}<span><b>Onde estamos</b>${site.endereco}<br>${site.cidade}<br>CEP ${site.cep}</span></li><li>${ico('fone')}<span><b>Telefone</b><a href="${site.foneHref}">${site.fone}</a></span></li><li>${ico('cadeado')}<span><b>Área interna</b><a href="${site.sistema}" rel="noopener">Acesso ao sistema</a></span></li></ul>
  <div class="capa-acoes">${btnFone()}<a class="btn btn-linha" href="${site.rota}" target="_blank" rel="noopener">Traçar rota ${ico('externo')}</a></div></div>
  ${mapa()}
</div></section>`);
  return pags;
}
