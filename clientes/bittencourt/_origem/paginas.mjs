// Monta as páginas das versões A ("Brasão": fiel ao site atual, topo grafite com o brasão, faixa vermelha do menu, slider com
// as frases do site, premiação na lateral e títulos em duas cores) e B ("Porto": clara, títulos em Oswald, áreas como sumário,
// assuntos marítimos numa rota e a formação do fundador como viagem). Estilos em public/assets/{base,a,b}.css.
import { empresa as E, faixas, quemSomos, escritorio, artesanal, pilares, areas, etapasArbitragem, temasMaritimos, equipe, rota, premios, correspondente, contatoIntro, creditos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const nomesVersao = { a: 'Brasão', b: 'Porto' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'escritorio', nome: 'O Escritório', caminho: 'escritorio/' },
  { slug: 'equipe', nome: 'Equipe', caminho: 'equipe/' },
  { slug: 'areas', nome: 'Áreas de Atuação', caminho: 'areas/' },
  { slug: 'correspondente', nome: 'Correspondente Jurídico', caminho: 'correspondente/' },
  { slug: 'premiacao', nome: 'Premiação', caminho: 'premiacao/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  esq: '<path d="M15 5l-7 7 7 7"/>',
  dir: '<path d="M9 5l7 7-7 7"/>',
  fora: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
  predio: '<path d="M4 21V5l8-2v18M12 8l8 2v11M3 21h18M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2"/>',
  pessoas: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.6"/><path d="M16 14.2c2.9.3 5 2.6 5 5.8"/>',
  contrato: '<path d="M6 2.5h9l4 4v15H6z"/><path d="M15 2.5v4h4M9 11h7M9 14h7M9 17.5c1.5-1.5 2.5 1 4-.5"/>',
  ancora: '<circle cx="12" cy="5" r="2"/><path d="M12 7v14M8 11h8M4 14c0 4 3.6 7 8 7s8-3 8-7M4 14l-1.5 1.5M4 14l1.5 1.5M20 14l-1.5 1.5M20 14l1.5 1.5"/>',
  balanca: '<path d="M12 3v18M7 21h10M5 7h14M12 5l0 2"/><path d="M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const fora = ' target="_blank" rel="noopener"';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const tituloDuo = (a, b, tag = 'h2', cls = 'duo') => `<${tag} class="${cls}">${a} <span>${b}</span></${tag}>`;

// ---------- moldura ----------
function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
  const fontes = v === 'a'
    ? 'family=PT+Sans+Narrow:wght@400;700&family=Inter:wght@400;500;600'
    : 'family=Oswald:wght@400;500;600&family=Inter:wght@400;500;600';
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
<meta name="theme-color" content="${v === 'a' ? '#1d1d1f' : '#ffffff'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fontes}&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

function menu(v, atual) {
  return nav.map(n => `<li><a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a></li>`).join('');
}

function topoA(atual) {
  return `<header class="topo">
  <div class="topo-faixa">
    <div class="in topo-in">
      <a class="marca" href="/a/" aria-label="${E.completo}, início">
        <img class="brasao" src="/assets/brasao.webp" alt="Brasão da Bittencourt Sociedade de Advogados" width="116" height="131">
        <span class="marca-txt"><b>Bittencourt</b><small>Sociedade de Advogados</small></span>
      </a>
      <a class="topo-tel" href="tel:${E.telHref}">${ic('tel')}<span><small>+55 27</small> 3314.3756</span></a>
      <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
    </div>
  </div>
  <nav class="fita" aria-label="Principal"><div class="in"><ul id="menu">${menu('a', atual)}</ul></div></nav>
</header>`;
}

function topoB(atual) {
  return `<header class="topo">
  <div class="in topo-in">
    <a class="marca" href="/b/" aria-label="${E.completo}, início">
      <img class="brasao" src="/assets/brasao.webp" alt="Brasão da Bittencourt Sociedade de Advogados" width="58" height="66">
      <span class="marca-txt"><b>Bittencourt</b><small>Sociedade de Advogados</small></span>
    </a>
    <nav aria-label="Principal"><ul id="menu">${menu('b', atual)}</ul></nav>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
</header>`;
}

function rodape(v) {
  const cred = creditos.map(c => `<a href="${c.url}"${fora}>${c.autor}</a> (${c.lic})`).join(', ');
  const areasLinks = areas.map(a => `<li><a href="/${v}/areas/${a.slug}/">${a.nome}</a></li>`).join('');
  const tel = v === 'a'
    ? `<div class="rod-tab"><a href="tel:${E.telHref}"><small>+55 27</small> 3314.3756</a><span>${E.endereco} · ${E.bairro} · CEP ${E.cep}</span></div>`
    : '';
  return `<footer class="rodape">
  ${tel}
  <div class="in rod-grade">
    <div class="rod-marca">
      <img src="/assets/brasao.webp" alt="" width="72" height="81" loading="lazy">
      <p><b>${E.completo}</b><br>Registro OAB/ES nº ${E.registro}<br>Associada à Câmara de Comércio França Brasil (CCFB)</p>
    </div>
    <div><h3>Áreas de atuação</h3><ul>${areasLinks}</ul></div>
    <div><h3>Contato</h3><ul class="rod-contato">
      <li>${ic('tel')}<a href="tel:${E.telHref}">${E.tel}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<a href="${E.rota}"${fora}>${E.endereco}<br>${E.bairro}, CEP ${E.cep}</a></li>
    </ul></div>
  </div>
  <div class="in rod-fim"><span>© ${new Date().getFullYear()} ${E.completo}</span><span class="rod-cred">Fotos de Vitória: Wikimedia Commons, ${cred}.</span></div>
</footer>`;
}

function pagina(v, slug, caminho, titulo, descricao, corpo) {
  return `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${slug.split('/')[0]}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${v === 'a' ? topoA(slug.split('/')[0]) : topoB(slug.split('/')[0])}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;
}

// ---------- blocos comuns ----------
function formContato(v) {
  return `<form class="form" data-contato data-email="${E.email}">
  <div class="form-lin"><label>Nome <span aria-hidden="true">*</span><input name="nome" required autocomplete="name"></label>
  <label>E-mail <span aria-hidden="true">*</span><input name="email" type="email" required autocomplete="email"></label></div>
  <div class="form-lin"><label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label>
  <label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <label>Mensagem <span aria-hidden="true">*</span><textarea name="mensagem" rows="5" required></textarea></label>
  <button class="btn" type="submit">Enviar mensagem ${ic('seta')}</button>
  <p class="form-nota">O envio abre o seu programa de e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;
}

function blocoContato(v) {
  return `<div class="contato-grade">
  <div class="contato-dados">
    <p>${contatoIntro}</p>
    <dl>
      <dt>Endereço</dt><dd>${E.endereco}<br>${E.bairro}<br>CEP ${E.cep}</dd>
      <dt>Telefone</dt><dd><a href="tel:${E.telHref}">${E.tel}</a></dd>
      <dt>E-mail</dt><dd><a href="mailto:${E.email}">${E.email}</a></dd>
    </dl>
    <a class="link" href="${E.rota}"${fora}>Como chegar ${ic('fora')}</a>
  </div>
  ${formContato(v)}
</div>
<div class="mapa"><iframe src="${E.mapa}" title="Mapa: ${E.endereco}, ${E.bairro}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
}

const listaCheck = itens => `<ul class="checks">${itens.map(i => `<li>${ic('ok')}<span>${i}</span></li>`).join('')}</ul>`;

// ================= VERSÃO A · BRASÃO =================
const A = {};

A.cabecalho = (a, b, sub = '') => `<section class="cab"><div class="in">${tituloDuo(a, b, 'h1')}${sub ? `<p>${sub}</p>` : ''}</div></section>`;

A.lateralPremios = () => `<aside class="lateral" aria-label="Premiação e destaques">
  <div class="lat-cab">${tituloDuo('Premiação e', 'destaques', 'h2', 'duo pequeno')}<span class="lat-setas"><button data-pr-ant aria-label="Anterior">${ic('esq')}</button><button data-pr-prox aria-label="Próximo">${ic('dir')}</button></span></div>
  <div class="lat-premios" data-premios>${premios.map((p, i) => `<figure${i ? ' hidden' : ''}>${img(p.img, p.nome)}<figcaption><b>${p.nome}</b></figcaption></figure>`).join('')}</div>
  <a class="link" href="/a/premiacao/">Ver todos ${ic('seta')}</a>
</aside>`;

A.index = () => {
  const slides = faixas.filter(f => !f.pequena).map((f, i) => `<figure class="slide${i ? '' : ' ativo'}">${img(f.img, f.alt, i ? '' : ' fetchpriority="high" loading="eager"')}<figcaption class="selo-frase">${f.frase}</figcaption></figure>`).join('');
  const nSlides = faixas.filter(f => !f.pequena).length;
  return `<section class="hero" data-slider>
  <div class="slides">${slides}</div>
  <div class="in hero-txt">
    <p class="hero-pre">Vitória · Espírito Santo</p>
    <h1>Advocacia empresarial, trabalhista e portuária com mais de 40 anos de experiência</h1>
    <p class="hero-sub">Consultoria preventiva e contenciosa, mediação e arbitragem para empresas, terminais portuários e sindicatos.</p>
    <div class="botoes"><a class="btn" href="/a/areas/">Áreas de atuação ${ic('seta')}</a><a class="btn btn-claro" href="/a/contato/">Fale com o escritório</a></div>
  </div>
  <div class="pontos" role="tablist" aria-label="Fotos">${Array.from({ length: nSlides }, (_, i) => `<button role="tab" aria-label="Foto ${i + 1}"${i ? '' : ' aria-selected="true"'}></button>`).join('')}</div>
</section>

<section class="quem">
  <div class="in quem-grade">
    ${A.lateralPremios()}
    <div class="quem-txt">
      ${tituloDuo('Quem', 'somos')}
      ${quemSomos.map(p => `<p>${p}</p>`).join('')}
      <a class="link" href="/a/escritorio/">Leia mais sobre o escritório ${ic('seta')}</a>
    </div>
  </div>
</section>

<section class="areas-sec">
  <div class="in">
    ${tituloDuo('Áreas de', 'atuação', 'h2', 'duo claro')}
    <div class="abas" data-abas>
      <div class="abas-lista" role="tablist" aria-orientation="vertical">${areas.map((a, i) => `<button role="tab" id="t-${a.slug}" aria-controls="p-${a.slug}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}>${ic(a.icone)}<span>${a.nome}</span></button>`).join('')}</div>
      ${areas.map((a, i) => `<div class="abas-painel" role="tabpanel" id="p-${a.slug}" aria-labelledby="t-${a.slug}"${i ? ' hidden' : ''}>
        <div class="painel-foto">${img(a.foto, a.nome)}</div>
        <div class="painel-txt"><h3>${a.nome}</h3><p>${a.resumo}</p>${listaCheck(a.itens.slice(0, 4))}<a class="link claro" href="/a/areas/${a.slug}/">Ver a área completa ${ic('seta')}</a></div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="etapas-sec">
  <div class="in">
    <div class="etapas-cab">${tituloDuo('Mediação e', 'arbitragem')}<p>Mecanismos alternativos de resolução de disputas, para evitar os longos e custosos processos administrativos e judiciais. É assim que o escritório conduz um caso:</p></div>
    <ol class="etapas" data-etapas>${etapasArbitragem.map((e, i) => `<li><span class="etapa-n">${i + 1}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="equipe-sec">
  <div class="in">
    <div class="sec-cab">${tituloDuo('Nossa', 'equipe')}<a class="link" href="/a/equipe/">Currículos completos ${ic('seta')}</a></div>
    <ul class="retratos">${equipe.map(p => `<li><a href="/a/equipe/#${p.slug}"><span class="moldura">${img(p.slug, p.nome)}</span><b>${p.nome}</b><small>${p.cargo}</small></a></li>`).join('')}</ul>
  </div>
</section>

<section class="sede">
  <div class="in sede-grade">
    <div class="sede-foto">${img('master-tower', 'Edifício Master Tower, sede do escritório')}<span class="selo-frase">Infraestrutura</span></div>
    <div class="sede-txt">${tituloDuo('Onde', 'estamos')}<p>${E.endereco}<br>${E.bairro} · CEP ${E.cep}</p><p class="artesanal">“${artesanal}”</p><div class="botoes"><a class="btn" href="/a/contato/">Entrar em contato ${ic('seta')}</a><a class="btn btn-linha" href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a></div></div>
  </div>
</section>`;
};

A.escritorio = () => `${A.cabecalho('Nosso', 'escritório', 'Sociedade Civil registrada na OAB/ES sob o nº 0691890-0499.')}
<section class="pag">
  <div class="in quem-grade">
    ${A.lateralPremios()}
    <div class="quem-txt">${escritorio.map(p => `<p>${p}</p>`).join('')}<blockquote class="artesanal">${artesanal}</blockquote></div>
  </div>
</section>
<section class="pilares-sec">
  <div class="in pilares">${pilares.map(p => `<div class="pilar"><img src="/assets/brasao.webp" alt="" class="pilar-marca"><h2>${p.titulo}</h2><p>${p.texto}</p></div>`).join('')}</div>
</section>
<section class="faixa-foto">${img('terceira-ponte', 'Terceira Ponte, Vitória')}<div class="in"><p>Mais de 40 anos atendendo empresas, terminais portuários e sindicatos a partir de Vitória.</p><a class="btn" href="/a/areas/">Conheça as áreas de atuação ${ic('seta')}</a></div></section>`;

A.equipe = () => `${A.cabecalho('Nossa', 'equipe', 'Advogados com formação no Brasil, no Japão, na Holanda, na França e nos Estados Unidos.')}
<section class="pag">
  <div class="in perfis">${equipe.map(p => `<article class="perfil" id="${p.slug}">
    <span class="moldura">${img(p.slug, p.nome)}</span>
    <div><h2>${p.nome}</h2><p class="cargo">${p.cargo} · ${p.oab}</p>${listaCheck(p.curriculo)}<p class="atuacao"><b>Área de atuação:</b> ${p.atuacao}</p></div>
  </article>`).join('')}</div>
</section>`;

A.areas = () => `${A.cabecalho('Áreas de', 'atuação', 'Consultoria, advocacia preventiva e contenciosa em cinco frentes.')}
<section class="pag">
  <div class="in areas-lista">${areas.map((a, i) => `<a class="area-lin${i % 2 ? ' inv' : ''}" href="/a/areas/${a.slug}/">
    <span class="area-foto">${img(a.foto, a.nome)}</span>
    <span class="area-txt">${ic(a.icone, 'ic grande')}<h2>${a.nome}</h2><p>${a.resumo}</p><span class="link">Ver detalhes ${ic('seta')}</span></span>
  </a>`).join('')}</div>
</section>`;

A.area = a => `<section class="cab cab-foto">${img(a.foto, a.nome, ' loading="eager"')}<div class="in"><p class="miga"><a href="/a/areas/">Áreas de atuação</a> /</p><h1>${a.nome}</h1><p>${a.resumo}</p></div></section>
<section class="pag">
  <div class="in area-grade">
    <div>${a.intro ? `<p class="lead">${a.intro}</p>` : ''}${tituloDuo('O que', 'fazemos', 'h2')}${listaCheck(a.itens)}
      ${a.slug === 'mediacao-arbitragem' ? `<ol class="etapas compactas" data-etapas>${etapasArbitragem.map((e, i) => `<li><span class="etapa-n">${i + 1}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}</ol>` : ''}
    </div>
    <aside class="area-lado">
      <div class="lado-box"><h3>Outras áreas</h3><ul>${areas.filter(x => x !== a).map(x => `<li><a href="/a/areas/${x.slug}/">${ic(x.icone)}${x.nome}</a></li>`).join('')}</ul></div>
      <div class="lado-box escuro"><h3>Fale com o escritório</h3><p>Atendimento individualizado, com extremo zelo, dedicação e responsabilidade.</p><a class="btn" href="/a/contato/">Enviar mensagem</a><a class="lado-tel" href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a></div>
    </aside>
  </div>
</section>`;

A.correspondente = () => `${A.cabecalho('Correspondente', 'jurídico', 'Apoio logístico para escritórios de fora da Grande Vitória e de outros Estados.')}
<section class="pag">
  <div class="in corr-grade">
    <div class="quem-txt">${correspondente.map(p => `<p>${p}</p>`).join('')}
      <div class="botoes"><a class="btn" href="/a/contato/">Falar sobre o canal ${ic('seta')}</a><a class="btn btn-linha" href="${E.diligencias}"${fora}>Tabela de diligências da OAB/ES ${ic('fora')}</a></div>
    </div>
    <figure class="corr-foto">${img('vitoria-entardecer', 'Vitória ao entardecer')}<figcaption class="selo-frase">Atendimento e Dinamismo</figcaption></figure>
  </div>
</section>`;

A.premiacao = () => `${A.cabecalho('Premiação e', 'destaques', 'Reconhecimentos recebidos pelo escritório e pelo seu fundador.')}
<section class="pag">
  <div class="in premios-grade">${premios.map(p => `<figure class="premio">${img(p.img, p.nome)}<figcaption><b>${p.nome}</b><span>${p.por}${p.ano ? ` · ${p.ano}` : ''}</span></figcaption></figure>`).join('')}</div>
</section>`;

A.contato = () => `${A.cabecalho('Entre em', 'contato')}
<section class="pag"><div class="in">${blocoContato('a')}</div></section>`;

// ================= VERSÃO B · PORTO =================
const B = {};

B.cabecalho = (eyebrow, titulo, sub = '', foto = '') => `<section class="cab${foto ? ' cab-foto' : ''}">${foto ? img(foto, '', ' loading="eager"') : ''}<div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p class="cab-sub">${sub}</p>` : ''}</div></section>`;

B.index = () => `<section class="hero">
  <div class="in hero-grade">
    <div class="hero-txt">
      <p class="eyebrow">Vitória · ES · OAB/ES nº ${E.registro}</p>
      <h1>Direito empresarial, do trabalho e portuário</h1>
      <p class="hero-sub">Há mais de 40 anos a Bittencourt Sociedade de Advogados assessora empresas, terminais marítimos privativos e sindicatos, com atuação preventiva, contenciosa e em mediação e arbitragem.</p>
      <div class="botoes"><a class="btn" href="/b/areas/">Áreas de atuação ${ic('seta')}</a><a class="btn btn-linha" href="tel:${E.telHref}">${ic('tel')} ${E.tel}</a></div>
    </div>
    <figure class="hero-foto">${img('porto-penedo', 'Porto de Vitória com o Penedo ao fundo', ' fetchpriority="high" loading="eager"')}<img class="hero-selo" src="/assets/brasao.webp" alt="" width="132" height="149"></figure>
  </div>
  <div class="in"><dl class="numeros">
    <div><dt>40+</dt><dd>anos de experiência</dd></div>
    <div><dt>5</dt><dd>áreas de atuação</dd></div>
    <div><dt>4</dt><dd>advogados, formação em 5 países</dd></div>
    <div><dt>CCFB</dt><dd>associada à Câmara de Comércio França Brasil</dd></div>
  </dl></div>
</section>

<section class="sumario-sec">
  <div class="in sumario-grade">
    <div class="sumario-cab"><p class="eyebrow">Sumário</p><h2>Áreas de atuação</h2><p>Consultoria, advocacia administrativa e judiciária, preventiva e contenciosa.</p></div>
    <ol class="sumario">${areas.map((a, i) => `<li><a href="/b/areas/${a.slug}/"><span class="sum-n">${String(i + 1).padStart(2, '0')}</span><span class="sum-t"><b>${a.nome}</b><small>${a.resumo}</small></span>${ic('seta', 'ic sum-seta')}</a></li>`).join('')}</ol>
  </div>
</section>

<section class="rota-mar">
  ${img('navio-porto', 'Navio atracado no Porto de Vitória', ' class="rota-fundo"')}
  <div class="in">
    <p class="eyebrow">Direito Marítimo e Portuário</p>
    <h2>Do terminal ao Tribunal Marítimo</h2>
    <p class="rota-sub">Representação em processos judiciais e arbitrais, opiniões legais sobre legislação marítima e portuária e contratos da área offshore.</p>
    <ul class="paradas">${temasMaritimos.map(t => `<li><span></span>${t}</li>`).join('')}</ul>
    <a class="btn btn-claro" href="/b/areas/maritimo-portuario/">Ver a área completa ${ic('seta')}</a>
  </div>
</section>

<section class="viagem-sec">
  <div class="in viagem-grade">
    <div class="viagem-pessoa">
      <span class="foto-p">${img('milton', 'José Milton Soares Bittencourt')}</span>
      <p class="eyebrow">O fundador</p>
      <h2>José Milton Soares Bittencourt</h2>
      <p>Fundador, sócio e administrador. Autor de trabalhos publicados em revistas e livros jurídicos e Prêmio Melhores da Advocacia do Brasil 2006.</p>
      <a class="link" href="/b/equipe/#milton">Currículo completo ${ic('seta')}</a>
    </div>
    <ol class="viagem">${rota.map((r, i) => `<li><span class="v-ponto">${String(i + 1).padStart(2, '0')}</span><div><b>${r.lugar}</b><small>${r.pais}</small><p>${r.o}</p></div></li>`).join('')}</ol>
  </div>
</section>

<section class="pilares-sec">
  <div class="in pilares">${pilares.map((p, i) => `<div class="pilar"><span class="pilar-n">${['I', 'II', 'III'][i]}</span><h2>${p.titulo}</h2><p>${p.texto}</p></div>`).join('')}</div>
</section>

<section class="equipe-sec">
  <div class="in">
    <div class="sec-cab"><div><p class="eyebrow">Equipe</p><h2>Quem atende você</h2></div><a class="link" href="/b/equipe/">Todos os currículos ${ic('seta')}</a></div>
    <ul class="equipe-lin">${equipe.map(p => `<li><a href="/b/equipe/#${p.slug}">${img(p.slug, p.nome)}<b>${p.nome}</b><small>${p.cargo}</small></a></li>`).join('')}</ul>
  </div>
</section>

<section class="selos-sec">
  <div class="in">
    <div class="sec-cab"><div><p class="eyebrow">Reconhecimento</p><h2>Premiação e destaques</h2></div><a class="link" href="/b/premiacao/">Ver todos ${ic('seta')}</a></div>
    <ul class="selos">${premios.map(p => `<li>${img(p.img, p.nome)}</li>`).join('')}</ul>
  </div>
</section>

<section class="cta">
  <div class="in cta-grade">
    <h2>Cada cliente é único.</h2>
    <p>${artesanal}</p>
    <div class="botoes"><a class="btn btn-claro" href="/b/contato/">Enviar mensagem ${ic('seta')}</a><a class="btn btn-linha claro" href="mailto:${E.email}">${ic('mail')} ${E.email}</a></div>
  </div>
</section>`;

B.escritorio = () => `${B.cabecalho('O escritório', 'Mais de 40 anos de advocacia em Vitória', 'Sociedade Civil registrada na OAB/ES sob o nº 0691890-0499 e associada à Câmara de Comércio França Brasil.', 'baia-vitoria')}
<section class="pag">
  <div class="in texto-grade">
    <div class="texto-lado"><img src="/assets/brasao.webp" alt="Brasão da Bittencourt" width="160" height="181"><figure class="mini-foto">${img('master-tower', 'Edifício Master Tower')}<figcaption>Edifício Master Tower, Enseada do Suá</figcaption></figure></div>
    <div class="texto">${escritorio.map(p => `<p>${p}</p>`).join('')}<blockquote>${artesanal}</blockquote></div>
  </div>
</section>
<section class="pilares-sec">
  <div class="in pilares">${pilares.map((p, i) => `<div class="pilar"><span class="pilar-n">${['I', 'II', 'III'][i]}</span><h2>${p.titulo}</h2><p>${p.texto}</p></div>`).join('')}</div>
</section>`;

B.equipe = () => `${B.cabecalho('Equipe', 'Nossos advogados', 'Formação no Brasil, no Japão, na Holanda, na França e nos Estados Unidos.')}
<section class="pag">
  <div class="in">
    <nav class="indice" aria-label="Advogados">${equipe.map(p => `<a href="#${p.slug}">${p.nome}</a>`).join('')}</nav>
    ${equipe.map((p, i) => `<article class="perfil" id="${p.slug}">
      <div class="perfil-lado">${img(p.slug, p.nome)}<span class="perfil-n">${String(i + 1).padStart(2, '0')}</span></div>
      <div><h2>${p.nome}</h2><p class="cargo">${p.cargo} · ${p.oab}</p><ol class="clausulas">${p.curriculo.map(c => `<li>${c}</li>`).join('')}</ol><p class="atuacao"><b>Área de atuação</b>${p.atuacao}</p></div>
    </article>`).join('')}
  </div>
</section>`;

B.areas = () => `${B.cabecalho('Áreas de atuação', 'Cinco frentes, um mesmo cuidado', 'Consultoria, advocacia administrativa e judiciária, preventiva e contenciosa.')}
<section class="pag">
  <div class="in"><ol class="sumario grande">${areas.map((a, i) => `<li><a href="/b/areas/${a.slug}/"><span class="sum-n">${String(i + 1).padStart(2, '0')}</span><span class="sum-t"><b>${a.nome}</b><small>${a.resumo}</small><em>${a.itens.length} frentes de trabalho</em></span><span class="sum-foto">${img(a.foto, '')}</span></a></li>`).join('')}</ol></div>
</section>`;

B.area = (a, i) => `${B.cabecalho(`Área ${String(i + 1).padStart(2, '0')} de 05`, a.nome, a.resumo, a.foto)}
<section class="pag">
  <div class="in area-grade">
    <aside class="area-indice"><p class="eyebrow">Sumário</p><ol>${areas.map((x, k) => `<li><a href="/b/areas/${x.slug}/"${x === a ? ' aria-current="page"' : ''}><span>${String(k + 1).padStart(2, '0')}</span>${x.nome}</a></li>`).join('')}</ol></aside>
    <div class="texto">
      ${a.intro ? `<p class="lead">${a.intro}</p>` : ''}
      <h2>O que fazemos</h2>
      <ol class="clausulas grandes">${a.itens.map(c => `<li>${c}</li>`).join('')}</ol>
      ${a.slug === 'maritimo-portuario' ? `<ul class="paradas escuro">${temasMaritimos.map(t => `<li><span></span>${t}</li>`).join('')}</ul>` : ''}
      ${a.slug === 'mediacao-arbitragem' ? `<ol class="linha-etapas" data-etapas>${etapasArbitragem.map((e, k) => `<li><span>${k + 1}</span><b>${e.t}</b><small>${e.d}</small></li>`).join('')}</ol>` : ''}
      <div class="area-cta"><p>Quer conversar sobre um caso de ${a.nome}?</p><a class="btn" href="/b/contato/">Fale com o escritório ${ic('seta')}</a></div>
    </div>
  </div>
</section>`;

B.correspondente = () => `${B.cabecalho('Correspondente jurídico', 'Seu escritório em Vitória', 'Apoio logístico junto às repartições judiciárias e órgãos do Poder Público da Grande Vitória.', 'vitoria-vista')}
<section class="pag">
  <div class="in texto-grade">
    <div class="texto-lado"><dl class="numeros vertical"><div><dt>ES</dt><dd>Grande Vitória e repartições do Estado</dd></div><div><dt>BR</dt><dd>Parceiros de outros Estados</dd></div></dl></div>
    <div class="texto">${correspondente.map(p => `<p>${p}</p>`).join('')}<div class="botoes"><a class="btn" href="/b/contato/">Falar sobre o canal ${ic('seta')}</a><a class="btn btn-linha" href="${E.diligencias}"${fora}>Tabela de diligências da OAB/ES ${ic('fora')}</a></div></div>
  </div>
</section>`;

B.premiacao = () => `${B.cabecalho('Reconhecimento', 'Premiação e destaques', 'Prêmios recebidos pelo escritório e pelo seu fundador.')}
<section class="pag">
  <div class="in premios-lista">${premios.map((p, i) => `<figure class="premio${i % 2 ? ' inv' : ''}"><span class="premio-img">${img(p.img, p.nome)}</span><figcaption>${p.ano ? `<span class="premio-ano">${p.ano}</span>` : ''}<b>${p.nome}</b><span>${p.por}</span></figcaption></figure>`).join('')}</div>
</section>`;

B.contato = () => `${B.cabecalho('Contato', 'Fale com o escritório', '')}
<section class="pag"><div class="in">${blocoContato('b')}</div></section>`;

// ---------- montagem ----------
export function gerarVersao(v) {
  const T = v === 'a' ? A : B;
  const nomeV = `${E.completo}`;
  const out = {};
  out.index = pagina(v, 'index', '', `${nomeV} · Vitória ES`, 'Advocacia empresarial, trabalhista, civil, marítima e portuária, mediação e arbitragem em Vitória (ES), com mais de 40 anos de experiência.', T.index());
  out.escritorio = pagina(v, 'escritorio', 'escritorio/', `O Escritório · ${nomeV}`, 'Sociedade Civil registrada na OAB/ES, com mais de 40 anos de experiência. Missão, valores e objetivos.', T.escritorio());
  out.equipe = pagina(v, 'equipe', 'equipe/', `Equipe · ${nomeV}`, 'Advogados da Bittencourt Sociedade de Advogados: José Milton Soares Bittencourt, Beatrice Bittencourt, Claudia Alves Barbosa Cogo e Rones Vargas.', T.equipe());
  out.areas = pagina(v, 'areas', 'areas/', `Áreas de Atuação · ${nomeV}`, 'Direito Empresarial, do Trabalho, Civil, Marítimo e Portuário, Mediação e Arbitragem.', T.areas());
  areas.forEach((a, i) => { out[`areas/${a.slug}`] = pagina(v, `areas/${a.slug}`, `areas/${a.slug}/`, `${a.nome} · ${nomeV}`, a.resumo, T.area(a, i)); });
  out.correspondente = pagina(v, 'correspondente', 'correspondente/', `Correspondente Jurídico · ${nomeV}`, correspondente[0], T.correspondente());
  out.premiacao = pagina(v, 'premiacao', 'premiacao/', `Premiação e Destaques · ${nomeV}`, 'Latin American Quality Awards 2014, Melhores Advocacia Brasil 2006, Prêmio Braslider e outros reconhecimentos.', T.premiacao());
  out.contato = pagina(v, 'contato', 'contato/', `Contato · ${nomeV}`, `${E.endereco}, ${E.bairro}. Telefone ${E.tel}.`, T.contato());
  return out;
}
