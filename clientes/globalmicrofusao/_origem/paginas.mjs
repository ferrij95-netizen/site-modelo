// Páginas das duas versões do site da Global Microfusão.
// A = "Institucional": a ordem do site atual (capa "Qualidade e compromisso" em slides, vantagens, serviços, segmentos,
//     história, processo, fale conosco), fundo claro com o vermelho do logo e rodapé grafite.
// B = "Metal líquido": capa escura em tela cheia com a foto do vazamento, números, serviços em painéis, o processo
//     como o caminho do metal (da cera à expedição) e segmentos sobre o vermelho do logo.
import * as C from './conteudo.mjs';

const { site } = C;
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(C.fotos[n] || '')}" loading="lazy" decoding="async"${extra ? ' ' + extra : ''}>`;

const I = {
  brilho: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="m12 8 1.2 2.8L16 12l-2.8 1.2L12 16l-1.2-2.8L8 12l2.8-1.2z"/>',
  regua: '<path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 2 2M10 10l1.5 1.5M13 7l2 2"/>',
  liga: '<path d="M9 3h6M10 3v6L4.5 19A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>',
  termometro: '<path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z"/><path d="M12 9v7M17 6h3M17 10h3"/>',
  desenho: '<path d="M3 21h18"/><path d="M5 17 15.5 6.5l2 2L7 19H5z"/><path d="m14 8 2 2"/><path d="M4 4h6M4 4v6"/>',
  usinagem: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  montagem: '<path d="M12 3 3 7.5l9 4.5 9-4.5z"/><path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5"/>',
  molde: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M12 5v14"/><path d="M8 9h1.5v6H8M16 9h-1.5v6H16"/>',
  cacho: '<path d="M12 3v18"/><path d="M12 7H7.5M12 7h4.5M12 12H6.5M12 12h5.5M12 17H7.5M12 17h4.5"/><circle cx="6" cy="7" r="1.5"/><circle cx="18" cy="7" r="1.5"/><circle cx="5" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="6" cy="17" r="1.5"/><circle cx="18" cy="17" r="1.5"/>',
  injecao: '<path d="M4 8h10v8H4z"/><path d="M14 10h4l2-2M14 14h4l2 2M7 11h4"/>',
  camadas: '<path d="M6 20c-1.5-4 0-8 6-8s7.5 4 6 8"/><path d="M8 20c-.8-2.7.5-5 4-5s4.8 2.3 4 5"/><path d="M12 12V4M9 4h6"/>',
  gota: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  chama: '<path d="M12 21c-4 0-7-2.8-7-6.5C5 10 9 8 9.5 4c2.5 1.5 4 4 3.5 7 1-.8 2-2.2 2.2-3.6C17.6 9.3 19 12 19 14.5 19 18.2 16 21 12 21z"/><path d="M12 21c-1.7 0-3-1.2-3-2.8 0-2 2-3 3-5 1 2 3 3 3 5 0 1.6-1.3 2.8-3 2.8z"/>',
  panela: '<path d="M5 8h11l-1.5 9a2 2 0 0 1-2 1.7H8.5a2 2 0 0 1-2-1.7z"/><path d="M16 10h5M5 8 3.5 6"/><path d="M9 12c0 1.5 2 1.5 2 3"/>',
  floco: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/><path d="m9.5 4.5 2.5 2 2.5-2M9.5 19.5l2.5-2 2.5 2"/>',
  martelo: '<path d="M14 6 9 11l-6 6 3 3 6-6 5-5"/><path d="m13 4 7 7-2 2-7-7z"/>',
  corte: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.6 7.6 20 18M8.6 16.4 20 6"/>',
  lixa: '<rect x="3" y="9" width="18" height="7" rx="1.5"/><path d="M6 12.5h.01M9 12.5h.01M12 12.5h.01M15 12.5h.01M18 12.5h.01M7 9V6h10v3"/>',
  jato: '<path d="M3 9h7l3 3-3 3H3z"/><path d="M15 9.5h.01M17 12h.01M15 14.5h.01M19 9h.01M20 12h.01M19 15h.01M17 7.5h.01M17 16.5h.01"/>',
  lupa: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 6 6M8 10.5h5M10.5 8v5"/>',
  caixa: '<path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z"/><path d="m3 7.5 9 4.5 9-4.5M12 12v9M7.5 5.2l9 4.6"/>',
  maquina: '<rect x="3" y="9" width="18" height="10" rx="1.5"/><circle cx="8" cy="14" r="2.5"/><path d="M13 12.5h5M13 15.5h5M7 9V5h6v4"/>',
  garrafa: '<path d="M10 3h4v4l1.5 2.5V20a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V9.5L10 7z"/><path d="M8.5 13h7"/>',
  capsula: '<rect x="3.5" y="8.5" width="17" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="m9.3 8.1 5.4 7.8"/>',
  hospital: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8M8 12h8"/>',
  medico: '<path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 13v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="11" r="2"/>',
  esteira: '<rect x="3" y="14" width="18" height="5" rx="2.5"/><path d="M6 14V9h5v5M13 14V6h5v8"/>',
  trator: '<circle cx="7" cy="16" r="4"/><circle cx="18" cy="17.5" r="2.5"/><path d="M5 12V6h6l2 6h6v3"/><path d="M15 6v6"/>',
  caminhao: '<path d="M2 6h12v10H2zM14 10h4l3 3v3h-7"/><circle cx="6" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
  carro: '<path d="M4 16v-4l2-5h12l2 5v4"/><path d="M3 16h18v2H3z"/><circle cx="7.5" cy="13" r="1"/><circle cx="16.5" cy="13" r="1"/>',
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 7 8.5-7"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  fabrica: '<path d="M3 21V10l5 3V10l5 3V10l5 3V4h3v17z"/><path d="M7 17h2M12 17h2M17 17h1"/>',
  escudo: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
  enviar: '<path d="M21 3 3 10.5l7 3 3 7.5z"/><path d="m10 13.5 4.5-4.5"/>',
};
const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

const PAG = {
  index: ['Global Microfusão · Microfundidos em aço carbono, inox e aços de alta liga · Veranópolis (RS)', 'Fundição por cera perdida (investment casting) de aço carbono, aço inoxidável e aços de alta liga, com usinagem, montagem de conjuntos e confecção de moldes. Veranópolis, serra gaúcha.'],
  empresa: ['A Empresa · Global Microfusão', 'Fábrica própria de 2.000 m² em Veranópolis, na serra gaúcha, com todo o processo controlado da matéria-prima à expedição.'],
  microfusao: ['O processo de microfusão · Global Microfusão', 'As 13 etapas da fundição por cera perdida na Global Microfusão: da injeção da cera à inspeção, embalagem e expedição.'],
  servicos: ['Serviços · Global Microfusão', 'Microfundidos, desenvolvimento de peças, peças usinadas, montagens de conjuntos e confecção de moldes.'],
  segmentos: ['Segmentos de mercado · Global Microfusão', 'Microfundidos para máquinas e equipamentos, bebidas, embalagem, farmacêutica, hospitalar, médica, transporte, agrícola, implementos rodoviários e automotiva.'],
  contato: ['Contato · Global Microfusão', 'Telefone, e-mail e endereço da Global Microfusão em Veranópolis (RS). Envie o desenho da sua peça para orçamento.'],
};
const MENU = [['index', 'Início'], ['empresa', 'A Empresa'], ['servicos', 'Serviços'], ['microfusao', 'Processo'], ['segmentos', 'Segmentos'], ['contato', 'Contato']];

export function gerarVersao(v) {
  const A = v === 'a';
  const L = s => `/${v}/${s === 'index' ? '' : s + '/'}`;
  const nav = slug => MENU.map(([s, t]) => `<a href="${L(s)}"${slug === s ? ' aria-current="page"' : ''}>${t}</a>`).join('');

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
<meta property="og:site_name" content="Global Microfusão">
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
<link rel="icon" href="/assets/icone.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>`;
  };

  const header = slug => `<header class="topo"><div class="in">
  <a class="logo" href="${L('index')}" aria-label="Global Microfusão, início"><img class="l-cor" src="/assets/logo-cor.svg" alt="Global Microfusão" width="141" height="156"><img class="l-claro" src="/assets/logo-claro.svg" alt="" width="141" height="156"></a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span><b class="sr">Menu</b></button>
  <nav id="menu" aria-label="Principal">${nav(slug)}<a class="btn btn-orc" href="${L('contato')}#orcamento">Solicitar orçamento</a></nav>
</div></header>`;

  const footer = () => `<footer class="rodape"><div class="in">
  <div class="r-marca"><img src="/assets/logo-claro.svg" alt="Global Microfusão" width="72" height="80"><p>Fundição por cera perdida de aço carbono, aço inoxidável e aços de alta liga.</p></div>
  <div><h3>Explore</h3>${MENU.slice(1).map(([s, t]) => `<a href="${L(s)}">${t}</a>`).join('')}</div>
  <div><h3>Onde estamos</h3><p>${site.razao}<br>${site.endereco}<br>${site.cidade}<br>CEP ${site.cep}</p></div>
  <div><h3>Fale conosco</h3><p><a href="${site.foneHref}">${ico('fone')}${site.fone}</a><br><a href="mailto:${site.email}">${ico('email')}${site.email}</a></p></div>
</div><div class="in r-base"><span>© ${new Date().getFullYear()} ${site.razao} · CNPJ ${site.cnpj}</span><span>Prévia do novo site</span></div></footer>
<script src="/assets/gm.js" defer></script>
</body>
</html>`;

  const pagina = (slug, corpo) => `${head(slug)}
<body class="v-${v} p-${slug}">
${header(slug)}
<main>
${corpo}
</main>
${footer()}`;

  const titulo = (kicker, t, centro = false) => `<div class="tit${centro ? ' centro' : ''}"><span class="kicker">${kicker}</span><h2>${t}</h2></div>`;

  const capaInt = (slug, kicker, t, texto, img) => `<section class="capa-int">
  <div class="capa-int-foto">${foto(img, 'fetchpriority="high"')}</div>
  <div class="in"><nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a><span>/</span>${esc(MENU.find(m => m[0] === slug)[1])}</nav>
  <span class="kicker">${kicker}</span><h1>${t}</h1><p>${texto}</p></div>
</section>`;

  const ctaFinal = () => `<section class="cta-final"><div class="in">
  <div><span class="kicker">Orçamento</span><h2>Envie o desenho ou a amostra da sua peça.</h2><p>A equipe técnica avalia a peça para a microfusão e retorna com a proposta.</p></div>
  <div class="cta-acoes"><a class="btn btn-claro" href="${L('contato')}#orcamento">Solicitar orçamento ${ico('seta')}</a><a class="btn btn-linha-claro" href="${site.foneHref}">${ico('fone')}${site.fone}</a></div>
</div></section>`;

  const vantagensLista = (n = 4) => `<ul class="vant">${C.vantagens.slice(0, n).map(x => `<li><span class="v-ico">${ico(x.ico)}</span><h3>${x.t}</h3><p>${x.p}</p></li>`).join('')}</ul>`;

  const segGrade = () => `<ul class="seg">${C.segmentos.itens.map(s => `<li>${ico(s.ico)}<span>${s.t}</span></li>`).join('')}</ul>`;

  const numerosFaixa = () => `<div class="nums">${C.numeros.map(n => `<div class="num"><b>${n.n}</b><span>${n.t}</span></div>`).join('')}</div>`;

  const materiaisLista = () => `<div class="mats">${C.materiais.map((m, i) => `<div class="mat mat-${i + 1}"><span class="mat-n">0${i + 1}</span><h3>${m.t}</h3><p>${m.p}</p></div>`).join('')}</div>`;

  // O caminho do metal: cinco fases, a cor de cada uma acompanha a temperatura (cera, cerâmica, metal líquido, aço, marca).
  let n = 0;
  const caminho = () => { n = 0; return `<ol class="caminho">${C.fases.map(f => `<li class="fase fase-${f.id}">
    <div class="fase-cab"><span class="fase-n">Fase ${C.fases.indexOf(f) + 1}</span><h3>${f.t}</h3></div>
    <ol class="passos">${f.etapas.map(e => `<li class="passo"><span class="p-n">${String(++n).padStart(2, '0')}</span><span class="p-ico">${ico(e.ico)}</span><div><h4>${e.t}</h4><p>${e.p}</p></div></li>`).join('')}</ol>
  </li>`).join('')}</ol>`; };

  const fasesResumo = () => `<ol class="fases-mini">${C.fases.map((f, i) => `<li class="fase-${f.id}"><span>${i + 1}</span><b>${f.t}</b><small>${f.etapas.map(e => e.t).join(' · ')}</small></li>`).join('')}</ol>`;

  const servPrincipal = () => `<article class="sv-princ"><div class="sv-foto">${foto('cacho')}</div><div class="sv-txt"><span class="sv-ico">${ico(C.servicos.principal.ico)}</span><h3>${C.servicos.principal.t}</h3><p>${C.servicos.principal.p}</p><ul class="sv-mats">${C.materiais.map(m => `<li>${ico('check')}${m.t}</li>`).join('')}</ul></div></article>`;

  const servItens = () => `<div class="sv-itens">${C.servicos.itens.map((s, i) => `<article class="sv sv-${i + 1}" id="${s.id}"><span class="sv-n">0${i + 2}</span><span class="sv-ico">${ico(s.ico)}</span><h3>${s.t}</h3><p>${s.p}</p></article>`).join('')}</div>`;

  const formulario = () => `<form class="form" id="orcamento" data-email="${site.email}">
  <h2>Nos envie um e-mail</h2>
  <div class="f-grade">
    <label>Nome<input name="nome" required autocomplete="name"></label>
    <label>Empresa<input name="empresa" autocomplete="organization"></label>
    <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
    <label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label>
    <label class="f-largo">Assunto<select name="assunto"><option>Orçamento de peça microfundida</option><option>Desenvolvimento de peça</option><option>Peças usinadas ou montagem de conjuntos</option><option>Confecção de moldes</option><option>Outro assunto</option></select></label>
    <label class="f-largo">Mensagem<textarea name="mensagem" rows="5" required placeholder="Material, quantidade, peso aproximado da peça. Anexe o desenho no e-mail que vai abrir."></textarea></label>
  </div>
  <button class="btn" type="submit">${ico('enviar')}Enviar</button>
  <p class="f-nota">O envio abre o seu programa de e-mail com a mensagem pronta para ${site.email}.</p>
</form>`;

  const contatoInfo = () => `<div class="ct-info">
  <p class="ct-intro">Este é o seu meio de comunicação direta conosco: use para enviar dúvidas, pedidos de orçamento ou sugestões.</p>
  <ul class="ct-lista">
    <li><span>${ico('fone')}</span><div><small>Telefone</small><a href="${site.foneHref}">${site.fone}</a></div></li>
    <li><span>${ico('email')}</span><div><small>E-mail</small><a href="mailto:${site.email}">${site.email}</a></div></li>
    <li><span>${ico('pin')}</span><div><small>Endereço</small><b>${site.razao}</b><br>${site.endereco}<br>${site.cidade} · CEP ${site.cep}</div></li>
  </ul>
</div>`;

  const mapa = () => `<div class="mapa"><iframe src="${site.mapa}" title="Mapa: Global Microfusão em Veranópolis (RS)" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe><a class="btn btn-mapa" href="${site.mapaLink}" target="_blank" rel="noopener">Abrir no Google Maps ${ico('externo')}</a></div>`;

  // ---------- Início ----------
  const inicioA = () => `<section class="capa-a" aria-label="Destaques">
  <div class="slides">
    <div class="slide ativo">${foto('faiscas', 'fetchpriority="high" loading="eager"')}</div>
    <div class="slide">${foto('vazamento')}</div>
  </div>
  <div class="in"><div class="capa-txt">
    <h1>${C.lema}</h1>
    <p>${C.sublema} Fundição por cera perdida de aço carbono, aço inoxidável e aços de alta liga.</p>
    <div class="capa-acoes"><a class="btn btn-linha-claro" href="${L('servicos')}">Produtos e serviços</a><a class="btn" href="${L('empresa')}">Nossa história</a></div>
  </div>
  <div class="pontos" role="tablist"><button aria-label="Foto 1" class="ativo"></button><button aria-label="Foto 2"></button></div></div>
</section>
<section class="faixa-vant"><div class="in">${vantagensLista(3)}</div></section>
<section class="sec sec-serv"><div class="in">
  ${titulo('O que fazemos', 'Serviços', true)}
  <p class="lead centro">${C.servicos.intro}</p>
  ${servPrincipal()}
  <p class="sv-alem">${C.servicos.alem}</p>
  ${servItens()}
</div></section>
<section class="sec sec-seg"><div class="in seg-a">
  <div class="seg-foto">${foto('panela')}<span class="selo">${ico('fabrica')}Veranópolis · RS</span></div>
  <div>${titulo('Para quem fazemos', 'Segmentos de mercado')}<p class="lead">${C.segmentos.intro}</p>${segGrade()}<a class="link" href="${L('segmentos')}">Ver todos os segmentos ${ico('seta')}</a></div>
</div></section>
<section class="sec sec-hist"><div class="in hist-a">
  <div>${titulo('Desde 2010', 'Nossa história')}<p>${C.historia[0]}</p><p>${C.historia[1]}</p><a class="link" href="${L('empresa')}">Conheça a empresa ${ico('seta')}</a></div>
  ${numerosFaixa()}
</div></section>
<section class="sec sec-proc"><div class="in proc-a">
  <div class="proc-fig">${foto('diagrama')}</div>
  <div>${titulo('Como fazemos', 'Processo de microfusão')}<p class="lead">Treze etapas controladas, da injeção da peça em cera até a embalagem, identificação e expedição.</p>${fasesResumo()}<a class="btn" href="${L('microfusao')}">Ver as 13 etapas ${ico('seta')}</a></div>
</div></section>
<section class="sec sec-ct" id="fale"><div class="in">
  ${titulo('Contato', 'Fale conosco', true)}
  <div class="ct-grade">${contatoInfo()}${formulario()}</div>
</div></section>`;

  const inicioB = () => `<section class="capa-b">
  <div class="capa-foto">${foto('vazamento', 'fetchpriority="high" loading="eager"')}</div>
  <div class="in"><div class="capa-txt">
    <span class="kicker">${C.lema} · Veranópolis, RS</span>
    <h1>Microfundidos em aço carbono, aço inoxidável e aços de alta liga.</h1>
    <p>${C.sublema} Do molde à peça usinada e montada, com todo o processo controlado.</p>
    <div class="capa-acoes"><a class="btn" href="${L('contato')}#orcamento">Solicitar orçamento ${ico('seta')}</a><a class="btn btn-linha-claro" href="${L('microfusao')}">Conheça o processo</a></div>
  </div></div>
  <div class="in capa-nums">${numerosFaixa()}</div>
</section>
<section class="sec sec-vant-b"><div class="in vant-b">
  <div>${titulo('Por que microfusão', 'Peças complexas, prontas para trabalhar.')}<p class="lead">${C.servicos.intro}</p></div>
  ${vantagensLista(4)}
</div></section>
<section class="sec sec-serv-b"><div class="in">
  ${titulo('Do desenho à peça pronta', 'Serviços')}
  <div class="bento">
    <article class="bt bt-princ"><div class="bt-foto">${foto('cacho')}</div><div class="bt-txt"><span class="sv-ico">${ico('cacho')}</span><h3>${C.servicos.principal.t}</h3><p>${C.servicos.principal.p}</p><a class="link" href="${L('servicos')}">Ver serviços ${ico('seta')}</a></div></article>
    ${C.servicos.itens.map((s, i) => `<article class="bt bt-${i + 1}"><span class="sv-ico">${ico(s.ico)}</span><h3>${s.t}</h3><p>${s.p}</p></article>`).join('')}
  </div>
</div></section>
<section class="sec sec-proc-b"><div class="in">
  <div class="proc-b-cab">${titulo('O caminho do metal', 'Da cera à expedição em 13 etapas')}<a class="btn btn-linha-claro" href="${L('microfusao')}">Ver o processo completo ${ico('seta')}</a></div>
  <div class="fio">${C.fases.map((f, i) => `<div class="fio-fase fase-${f.id}"><span class="fio-ponto"></span><span class="fio-n">Fase ${i + 1}</span><h3>${f.t}</h3><ul>${f.etapas.map(e => `<li>${ico(e.ico)}${e.t}</li>`).join('')}</ul></div>`).join('')}</div>
</div></section>
<section class="sec sec-seg-b"><div class="in">
  <div class="seg-b-cab">${titulo('Segmentos de mercado', 'Peças para quem produz máquinas e equipamentos.')}<p class="lead">${C.segmentos.intro}</p></div>
  ${segGrade()}
</div></section>
<section class="sec sec-hist-b"><div class="in hist-b">
  <div class="hist-foto">${foto('faiscas-perto')}</div>
  <div>${titulo('Nossa história', 'Fábrica própria na serra gaúcha.')}<p>${C.historia[0]}</p><p>${C.historia[2]}</p><a class="link" href="${L('empresa')}">Conheça a empresa ${ico('seta')}</a></div>
</div></section>
${ctaFinal()}`;

  // ---------- A Empresa ----------
  const empresa = () => `${capaInt('empresa', 'A Empresa', 'Qualidade e compromisso desde a serra gaúcha.', C.historia[0], 'faiscas-perto')}
<section class="sec"><div class="in emp-grade">
  <div class="emp-txt">${titulo('Nossa história', 'Uma fábrica pensada pelo fluxo do processo.')}${C.historia.slice(1).map(p => `<p>${p}</p>`).join('')}</div>
  <aside class="emp-lado">${numerosFaixa()}</aside>
</div></section>
<section class="sec sec-marcos"><div class="in">
  ${titulo('Trajetória', 'Marcos da Global Microfusão', !A)}
  <ol class="marcos">${C.marcos.map(m => `<li><b>${m.ano}</b><h3>${m.t}</h3><p>${m.p}</p></li>`).join('')}</ol>
</div></section>
<section class="sec sec-qual"><div class="in qual">
  <figure class="qual-foto">${foto('banco-inox')}<figcaption>Foto ilustrativa: Oak Ridge National Laboratory, CC BY 2.0.</figcaption></figure>
  <div>${titulo('Qualidade', 'Todo o processo controlado.')}<p class="lead">${C.historia[3]}</p>
  <ul class="qual-lista">
    <li>${ico('check')}Seleção e controle da matéria-prima</li>
    <li>${ico('check')}Inspeção dimensional e visual das peças</li>
    <li>${ico('check')}Embalagem, identificação e expedição</li>
    <li>${ico('check')}Administração, vendas e produção integradas</li>
  </ul></div>
</div></section>
${ctaFinal()}`;

  // ---------- Processo ----------
  const microfusao = () => `${capaInt('microfusao', 'Processo de microfusão', 'Da cera à peça pronta, em 13 etapas.', 'A microfusão, ou fundição por cera perdida (investment casting), reproduz no metal cada detalhe de um modelo em cera. O resultado é uma peça com excelente acabamento e mínima variação dimensional.', 'vazamento')}
<section class="sec sec-esq"><div class="in esq">
  <div class="esq-fig">${foto('diagrama')}</div>
  <div>${titulo('Como funciona', 'Um molde para cada peça, uma casca para cada cacho.')}<p class="lead">As peças são injetadas em cera e montadas em cachos. O cacho recebe o revestimento cerâmico; a cera é retirada e a casca é calcinada. O metal líquido ocupa o lugar da cera e, depois de solidificado, a casca é quebrada e as peças seguem para o acabamento e a inspeção.</p></div>
</div></section>
<section class="sec sec-caminho"><div class="in">
  ${titulo('As 13 etapas', 'O caminho do metal', true)}
  ${caminho()}
</div></section>
<section class="sec sec-vant"><div class="in">
  ${titulo('Resultado', 'O que a microfusão entrega', true)}
  ${vantagensLista(4)}
</div></section>
${ctaFinal()}`;

  // ---------- Serviços ----------
  const servicos = () => `${capaInt('servicos', 'Serviços', 'Microfundidos e tudo o que vem com eles.', C.servicos.intro, 'cacho')}
<section class="sec"><div class="in">
  ${servPrincipal()}
  <p class="sv-alem">${C.servicos.alem}</p>
  ${servItens()}
</div></section>
<section class="sec sec-mats"><div class="in">
  ${titulo('Materiais', 'Aço carbono, aço inoxidável e aços de alta liga.', !A)}
  ${materiaisLista()}
  <p class="nota">${C.vantagens[3].p}</p>
</div></section>
${ctaFinal()}`;

  // ---------- Segmentos ----------
  const segmentos = () => `${capaInt('segmentos', 'Segmentos de mercado', 'Peças para diversas áreas da indústria.', C.segmentos.intro, 'panela')}
<section class="sec"><div class="in">
  <ul class="seg seg-grande">${C.segmentos.itens.map((s, i) => `<li><span class="sg-n">${String(i + 1).padStart(2, '0')}</span>${ico(s.ico)}<span>${s.t}</span></li>`).join('')}</ul>
</div></section>
<section class="sec sec-vant"><div class="in">
  ${titulo('Por que a microfusão', 'Ideal para projetos complexos', true)}
  ${vantagensLista(4)}
</div></section>
${ctaFinal()}`;

  // ---------- Contato ----------
  const contato = () => `<section class="capa-ct"><div class="in">
  <nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a><span>/</span>Contato</nav>
  <span class="kicker">Contato</span><h1>Fale conosco</h1><p>Envie dúvidas, sugestões ou o desenho da sua peça para orçamento.</p>
</div></section>
<section class="sec sec-ct"><div class="in ct-grade">${contatoInfo()}${formulario()}</div></section>
<section class="sec sec-mapa"><div class="in">${mapa()}</div></section>`;

  return {
    index: pagina('index', A ? inicioA() : inicioB()),
    empresa: pagina('empresa', empresa()),
    servicos: pagina('servicos', servicos()),
    microfusao: pagina('microfusao', microfusao()),
    segmentos: pagina('segmentos', segmentos()),
    contato: pagina('contato', contato()),
  };
}
