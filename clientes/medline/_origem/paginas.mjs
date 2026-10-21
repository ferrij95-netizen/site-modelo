// Monta as páginas das versões A ("Esfera": fiel ao site atual, branco com a faixa de menu verde-petróleo, a esfera de palavras
// e os três segmentos em painéis altos) e B ("Clínica": foto grande, segmentos em faixas largas, etapas e marcas passando).
// Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, intro, mvv, compromissos, fotosEmpresa, segmentos, marcas, yns, palavrasEsfera, creditos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (f, alt = '', extra = '') => `<img src="/assets/img/${f.src}" alt="${esc(alt ?? f.alt ?? '')}" width="${f.w}" height="${f.h}" loading="lazy" decoding="async"${extra}>`;
const foto = (f, extra = '') => img(f, f.alt, extra);

export const nomesVersao = { a: 'Esfera', b: 'Clínica' };

export const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'segmentos', nome: 'Segmentos', caminho: 'segmentos/' },
  ...segmentos.map(s => ({ slug: s.slug, nome: s.nome, caminho: `segmentos/${s.slug}/`, sub: true })),
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
  { slug: 'localizacao', nome: 'Localização', caminho: 'localizacao/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  chev: '<path d="M6 9l6 6 6-6"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>',
  yt: '<rect x="2.5" y="5.5" width="19" height="13" rx="3.5"/><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v2H8v4h2v7h4v-7h3l1-4h-4V8z"/>',
  rota: '<path d="M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4z"/><path d="M6 15V9a3 3 0 013-3h3M18 9v6a3 3 0 01-3 3h-3"/>',
  ok: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  escudo: '<path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const href = (v, slug, hash = '') => `/${v}/${nav.find(n => n.slug === slug).caminho}${hash}`;
const mapaRota = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(E.enderecoLinha)}`;
const mapaVer = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(E.enderecoLinha)}`;
const mapaEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(E.enderecoLinha)}&z=16&output=embed`;
const segDe = slug => segmentos.find(s => s.slug === slug);

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
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#00616e">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800;900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/apresenta.css">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/apresenta.js" defer></script>
<script src="/assets/site.js" defer></script>
</head>`;
}

function menu(v, atual) {
  const segAtual = atual === 'segmentos' || segmentos.some(s => s.slug === atual);
  return nav.filter(n => !n.sub).map(n => {
    const cur = n.slug === atual || (n.slug === 'segmentos' && segAtual) ? ' aria-current="page"' : '';
    if (n.slug !== 'segmentos') return `<a href="/${v}/${n.caminho}"${cur}>${n.nome}</a>`;
    return `<div class="sub"><a href="/${v}/${n.caminho}"${cur}>${n.nome}${ic('chev', 'ic chev')}</a><div class="sub-l">${segmentos.map(s => `<a href="${href(v, s.slug)}"${s.slug === atual ? ' aria-current="page"' : ''}>${s.nome}</a>`).join('')}</div></div>`;
  }).join('');
}

const redes = () => `<a href="${E.instagram}" target="_blank" rel="noopener" aria-label="Instagram @medlinedermato">${ic('insta')}</a><a href="${E.youtube}" target="_blank" rel="noopener" aria-label="YouTube da Medline">${ic('yt')}</a><a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook da Medline">${ic('fb')}</a>`;

function topo(v, atual) {
  const btn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
  if (v === 'a') return `<header class="topo">
  <div class="topo-in in">
    <a class="marca" href="/a/" aria-label="Medline, página inicial"><img src="/assets/logo.svg" alt="Medline" width="146" height="66"></a>
    <div class="topo-cont"><a href="tel:${E.foneHref}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a><span class="redes">${redes()}</span></div>
    ${btn}
  </div>
  <nav id="menu" class="menu" aria-label="Principal"><div class="in">${menu(v, atual)}</div></nav>
</header>`;
  return `<header class="topo"><div class="topo-in in">
  <a class="marca" href="/b/" aria-label="Medline, página inicial"><img src="/assets/logo.svg" alt="Medline" width="124" height="56"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="btn btn-topo" href="${href(v, 'contato')}">Fale conosco</a>
  ${btn}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in rod-grade">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Medline" width="146" height="66"><p>Produtos médicos, hospitalares, dermatológicos e de cosmiatria. Marcas referência, registradas na ANVISA, com suporte técnico próprio.</p><div class="redes">${redes()}</div></div>
  <div><h2>Matriz</h2><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${mapaVer}" target="_blank" rel="noopener">${ic('pin')}Ver no mapa</a></div>
  <div><h2>Fale com a gente</h2><p><a href="tel:${E.foneHref}">Fone/fax ${E.fone}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
  <nav aria-label="Rodapé"><h2>Site</h2>${nav.map(n => `<a href="/${v}/${n.caminho}"${n.sub ? ' class="rod-sub"' : ''}>${n.nome}</a>`).join('')}</nav>
</div><div class="in rod-fim"><span>© ${E.razao} · São Paulo, SP</span><span class="rod-cred">${esc(creditos)}</span><a href="/">Ver as duas versões</a></div></footer>`;
}

const pagina = (v, slug, titulo, desc, corpo) => `${head(v, slug === 'index' ? '' : nav.find(n => n.slug === slug).caminho, titulo, desc)}
<body class="v-${v} p-${slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// ---------- peças comuns ----------
const tituloPag = (s) => `${s} · Medline Produtos Médicos e Hospitalares`;

function blocoMarca(k, v) {
  const m = marcas[k];
  return `<article class="marca-bl" id="${k}" data-rev>
  <div class="mb-logo">${img(m.logo, m.nome)}</div>
  <div class="mb-txt">
    <p class="mb-fato">${esc(m.fato)}</p>
    <h3>${esc(m.nome)}</h3>
    ${m.texto.map(t => `<p>${esc(t)}</p>`).join('')}
    ${m.itens ? `<ul class="mb-itens">${m.itens.map(i => `<li>${ic('ok')}${esc(i)}</li>`).join('')}</ul>` : ''}
    ${m.video ? `<a class="link" href="${m.video}" target="_blank" rel="noopener">${ic('yt')}Assistir ao vídeo da WillowWood</a>` : ''}
    <a class="link" href="${href(v, 'contato', `?segmento=${encodeURIComponent(segDe(m.seg).nome)}&marca=${encodeURIComponent(m.nome)}`)}">Pedir informações sobre ${esc(m.nome)}${ic('seta')}</a>
  </div>
</article>`;
}

const produtosYns = () => `<div class="yns">${yns.map((p, i) => `<article class="yns-p" data-rev>
  <figure class="yns-foto">${img(p.foto, `${p.nome}, YNS Cosmeceutical Skincare`)}</figure>
  <div class="yns-txt">
    <p class="mb-fato">${esc(p.tipo)}</p>
    <h3>${esc(p.nome)}</h3>
    <ul class="yns-ben">${p.beneficios.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
    <dl class="yns-uso">${p.uso.map(([q, t]) => `<div><dt>${esc(q)}</dt><dd>${esc(t)}</dd></div>`).join('')}</dl>
    <details class="yns-ing"><summary>Ingredientes</summary><p>${esc(p.ingredientes)}</p></details>
  </div>
</article>`).join('')}</div>`;

const etimologia = s => `<div class="etimo" data-rev-filhos data-rev-passo="140">${s.etimologia.map((e, i) => `${i ? '<span class="et-mais" aria-hidden="true">+</span>' : ''}<div class="et-raiz"><b>${e.raiz}</b><span>${e.sig}</span></div>`).join('')}<span class="et-mais" aria-hidden="true">=</span><div class="et-raiz et-res"><b>Cosmiatria</b><span>a arte ou ciência médica que estuda e trata a beleza humana em todos os seus aspectos</span></div></div>`;

function formContato() {
  const opt = a => a.map(x => `<option>${x}</option>`).join('');
  return `<form class="form" id="form" data-mailto="${E.email}" data-assunto="Contato pelo site da Medline">
  <div class="campos">
    <label>Nome *<input name="Nome" required autocomplete="name"></label>
    <label>E-mail *<input name="E-mail" type="email" required autocomplete="email"></label>
    <label>Telefone *<input name="Telefone" type="tel" required autocomplete="tel" placeholder="(DDD) telefone"></label>
    <label>Celular<input name="Celular" type="tel" placeholder="(DDD) celular"></label>
    <label>Cidade *<input name="Cidade" required autocomplete="address-level2"></label>
    <label>Estado *<input name="Estado" required autocomplete="address-level1" maxlength="20"></label>
    <label>Segmento *<select name="Segmento" required>${opt(segmentos.map(s => s.nome))}</select></label>
    <label>Marca ou produto<input name="Marca" placeholder="Ex.: Rotem, Taimin, YNS"></label>
    <fieldset class="larga quem"><legend>Você é *</legend>${['Médico', 'Hospital ou clínica', 'Paciente', 'Outros'].map((q, i) => `<label><input type="radio" name="Você é" value="${q}"${i ? '' : ' checked'}>${q}</label>`).join('')}</fieldset>
    <label>Especialidade<input name="Especialidade"></label>
    <label>Deseja orçamento?<select name="Orçamento"><option>Sim</option><option>Não</option></select></label>
    <label class="larga">Mensagem *<textarea name="Mensagem" rows="5" required></textarea></label>
  </div>
  <button class="btn" type="submit">${ic('mail')}Enviar mensagem</button>
  <p class="form-nota">A mensagem abre no seu e-mail já preenchida, endereçada a ${E.email}.</p>
</form>`;
}

const contatoInfo = () => `<div class="cont-info">
  <h2>Matriz</h2>
  <p class="ci-l">${ic('pin')}<span>${E.endereco.join('<br>')}</span></p>
  <p class="ci-l">${ic('tel')}<a href="tel:${E.foneHref}">Fone/fax ${E.fone}</a></p>
  <p class="ci-l">${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p>
  <h3>Outras redes</h3>
  <div class="redes redes-g">${redes()}</div>
</div>`;

const mapa = () => `<div class="mapa"><iframe title="Mapa: ${esc(E.enderecoLinha)}" src="${mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

const ctaFaixa = v => `<section class="cta"><div class="in cta-in" data-rev>
  <div><p class="eyebrow">Fale com a Medline</p><h2>Precisa de um produto, orçamento ou suporte técnico?</h2></div>
  <div class="acoes"><a class="btn btn-claro" href="${href(v, 'contato')}">${ic('mail')}Enviar mensagem</a><a class="btn btn-vazado" href="tel:${E.foneHref}">${ic('tel')}${E.fone}</a></div>
</div></section>`;

// =====================================================================
// Versão A · Esfera
// =====================================================================
const capaA = (trilha, titulo, sub = '') => `<section class="capa"><div class="in capa-in">
  <div><p class="trilha">${trilha}</p><h1 data-palavras>${titulo}</h1>${sub ? `<p class="capa-sub" data-rev>${sub}</p>` : ''}</div>
  <img class="capa-esfera" src="/assets/img/esfera.webp" alt="" width="428" height="428" aria-hidden="true">
</div></section>`;
const trilhaA = (v, ...itens) => [`<a href="/${v}/">Home</a>`, ...itens].join('<span aria-hidden="true">/</span>');

function paineis(v) {
  return `<div class="paineis" data-rev-filhos data-rev-passo="120">${segmentos.map((s, i) => `<a class="painel" href="${href(v, s.slug)}">
  ${foto(s.foto)}
  <span class="pn-txt"><span class="pn-n">0${i + 1}</span><b>${s.nome}</b><span class="pn-res">${esc(s.resumo)}</span><span class="pn-ir">Entrar${ic('seta')}</span></span>
</a>`).join('')}</div>`;
}

const faixaMarcas = v => `<ul class="logos">${Object.entries(marcas).map(([k, m]) => `<li><a href="${href(v, m.seg, '#' + k)}" title="${esc(m.nome)}">${img(m.logo, m.nome)}</a></li>`).join('')}</ul>`;

function paginasA() {
  const v = 'a', p = {};
  p.index = pagina(v, 'index', 'Medline · Produtos médicos, hospitalares e de cosmiatria', 'A Medline representa marcas referência em cirurgia, dermatologia e cosmiatria e outras tecnologias médicas. Produtos registrados na ANVISA e suporte técnico próprio. São Paulo, SP.', `
<section class="hero"><div class="in hero-grade">
  <div class="hero-esfera" data-rev="esq"><img src="/assets/img/esfera.webp" alt="Esfera de palavras da Medline: empresa, segmentos, contato, localização, tecnologia, inovação, confiança" width="428" height="428" fetchpriority="high"><img class="reflexo" src="/assets/img/esfera.webp" alt="" width="428" height="428" aria-hidden="true"></div>
  <div class="hero-txt">
    <p class="eyebrow" data-rev>Produtos médicos, hospitalares e de cosmiatria</p>
    <h1 data-palavras>A melhor tecnologia em produtos e serviços para a saúde.</h1>
    <p class="hero-sub" data-rev style="--ap-d:200ms">${intro[0]} ${intro[1]}</p>
    <div class="acoes" data-rev style="--ap-d:320ms"><a class="btn" href="${href(v, 'segmentos')}">Ver segmentos${ic('seta')}</a><a class="btn btn-linha" href="${href(v, 'contato')}">Fale conosco</a></div>
  </div>
</div></section>

<section class="sec seg-home"><div class="in">
  <div class="saudacao" data-rev><b>Seja bem-vindo!</b> Escolha como deseja navegar pelo site<svg class="sau-seta" viewBox="0 0 60 40" aria-hidden="true"><path d="M4 6c18 0 38 6 46 26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M42 27l8 7 3-10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
  ${paineis(v)}
</div></section>

<section class="sec compromisso"><div class="in">
  <blockquote class="frase" data-rev><p>${intro[3]}</p><span class="barra" aria-hidden="true"></span></blockquote>
  <ol class="comp-l" data-rev-filhos data-rev-passo="100">${compromissos.map(c => `<li><span class="c-n">${c.n}</span><h3>${c.nome}</h3><p>${c.texto}</p></li>`).join('')}</ol>
</div></section>

<section class="sec marcas-sec"><div class="in">
  <div class="sec-cab" data-rev><p class="eyebrow">Marcas que representamos</p><h2>Parceiros referência no Brasil e no exterior.</h2></div>
  ${faixaMarcas(v)}
</div></section>

<section class="sec empresa-home"><div class="in emp-grade">
  <div class="emp-fotos" data-rev-filhos data-rev-passo="90">${fotosEmpresa.map(f => `<figure>${foto(f)}</figure>`).join('')}</div>
  <div data-rev>
    <p class="eyebrow">Empresa</p>
    <h2>Missão, visão e valores.</h2>
    <dl class="mvv">${mvv.map(m => `<div><dt>${m.nome}</dt><dd>${m.texto}</dd></div>`).join('')}</dl>
    <a class="link" href="${href(v, 'empresa')}">Conheça a Medline${ic('seta')}</a>
  </div>
</div></section>
${ctaFaixa(v)}`);

  p.empresa = pagina(v, 'empresa', tituloPag('Empresa'), 'Missão, visão e valores da Medline, distribuidora de produtos médicos, hospitalares e de cosmiatria em São Paulo.', `
${capaA(trilhaA(v, 'Empresa'), 'Empresa', 'Tecnologia em produtos e serviços na área da saúde, com marcas referência e suporte técnico próprio.')}
<section class="sec"><div class="in txt-grade">
  <div class="txt-col" data-rev>${intro.map(t => `<p>${t}</p>`).join('')}</div>
  <dl class="mvv mvv-col" data-rev>${mvv.map(m => `<div><dt>${m.nome}</dt><dd>${m.texto}</dd></div>`).join('')}</dl>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab" data-rev><p class="eyebrow">Galeria de fotos</p><h2>Nossa sede e nossa presença no setor.</h2></div>
  <div class="galeria-emp" data-rev-filhos data-rev-passo="90">${fotosEmpresa.map(f => `<figure><a href="/assets/img/${f.src}" data-amplia data-legenda="${esc(f.alt)}">${foto(f)}</a><figcaption>${esc(f.alt)}</figcaption></figure>`).join('')}</div>
</div></section>
<section class="sec compromisso"><div class="in">
  <ol class="comp-l" data-rev-filhos data-rev-passo="100">${compromissos.map(c => `<li><span class="c-n">${c.n}</span><h3>${c.nome}</h3><p>${c.texto}</p></li>`).join('')}</ol>
</div></section>
${ctaFaixa(v)}${lightbox()}`);

  p.segmentos = pagina(v, 'segmentos', tituloPag('Segmentos'), 'Cirurgia, Dermatologia & Cosmiatria e Outras Tecnologias: os segmentos e as marcas que a Medline representa.', `
${capaA(trilhaA(v, 'Segmentos'), 'Segmentos', `${intro[0]} ${intro[1]}`)}
<section class="sec"><div class="in">${paineis(v)}</div></section>
<section class="sec marcas-sec"><div class="in">
  <div class="sec-cab" data-rev><p class="eyebrow">Marcas</p><h2>Quem está por trás de cada segmento.</h2></div>
  ${faixaMarcas(v)}
</div></section>
${ctaFaixa(v)}`);

  for (const s of segmentos) {
    p[s.slug] = pagina(v, s.slug, tituloPag(s.nome), s.resumo, `
${capaA(trilhaA(v, `<a href="${href(v, 'segmentos')}">Segmentos</a>`, s.nome), s.nome, s.curto)}
<section class="sec"><div class="in seg-intro">
  <figure class="seg-foto" data-rev="esq">${foto(s.slug === 'cirurgia' ? s.largo : s.foto)}</figure>
  <div class="txt-col" data-rev>${s.texto.map(t => `<p>${esc(t)}</p>`).join('')}
    ${s.areas ? `<ul class="areas">${s.areas.map(a => `<li>${a}</li>`).join('')}</ul>` : ''}
  </div>
</div></section>
${s.etimologia ? `<section class="sec sec-cinza"><div class="in"><div class="sec-cab" data-rev><p class="eyebrow">De onde vem a palavra</p><h2>Cosmiatria, em três radicais gregos.</h2></div>${etimologia(s)}</div></section>` : ''}
<section class="sec"><div class="in">
  <div class="sec-cab" data-rev><p class="eyebrow">${s.marcas.length > 1 ? 'Marcas' : 'Marca'} deste segmento</p><h2>${s.marcas.map(k => marcas[k].nome).join(' e ')}</h2></div>
  <div class="marcas-l">${s.marcas.map(k => blocoMarca(k, v)).join('')}</div>
  ${s.slug === 'dermatologia-cosmiatria' ? `<div class="sec-cab sub-cab" data-rev><p class="eyebrow">Linha YNS</p><h2>Cosmecêuticos dermatologicamente testados.</h2></div>${produtosYns()}` : ''}
</div></section>
<section class="sec sec-cinza outros"><div class="in"><p class="eyebrow">Outros segmentos</p><div class="outros-l">${segmentos.filter(o => o !== s).map(o => `<a href="${href(v, o.slug)}"><b>${o.nome}</b><span>${esc(o.resumo)}</span>${ic('seta')}</a>`).join('')}</div></div></section>
${ctaFaixa(v)}`);
  }

  p.contato = pagina(v, 'contato', tituloPag('Contato'), `Fale com a Medline: ${E.fone}, ${E.email}. Orçamentos, informações de produtos e suporte técnico.`, `
${capaA(trilhaA(v, 'Contato'), 'Contato', 'Mantemos um canal direto com nossos clientes para ouvir suas sugestões. Campos com * são obrigatórios.')}
<section class="sec"><div class="in cont-grade"><div data-rev>${formContato()}</div>${contatoInfo()}</div></section>`);

  p.localizacao = pagina(v, 'localizacao', tituloPag('Localização'), `Matriz da Medline: ${E.enderecoLinha}.`, `
${capaA(trilhaA(v, 'Localização'), 'Localização', `${E.endereco.join(' · ')} · Brasil`)}
<section class="sec"><div class="in loc-grade">
  ${mapa()}
  <div class="loc-txt" data-rev><h2>Matriz</h2><p>${E.endereco.join('<br>')}<br>Brasil</p><p><a href="tel:${E.foneHref}">${E.fone}</a></p><div class="acoes"><a class="btn" href="${mapaRota}" target="_blank" rel="noopener">${ic('rota')}Como chegar</a><a class="btn btn-linha" href="${mapaVer}" target="_blank" rel="noopener">Abrir no Google Maps</a></div>
  <figure class="loc-foto">${foto(fotosEmpresa[0])}</figure></div>
</div></section>`);
  return p;
}

const lightbox = () => `<div class="lb" id="lb" hidden role="dialog" aria-modal="true" aria-label="Foto ampliada"><button class="lb-x" type="button" aria-label="Fechar">×</button><button class="lb-ant" type="button" aria-label="Anterior">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-prox" type="button" aria-label="Próxima">›</button></div>`;

// =====================================================================
// Versão B · Clínica
// =====================================================================
const capaB = (f, trilha, titulo, sub = '') => `<section class="capa">${f ? `<div class="capa-foto">${img(f, '', ' loading="eager" fetchpriority="high"')}</div>` : ''}<div class="in capa-in">
  <p class="trilha">${trilha}</p><h1 data-palavras>${titulo}</h1>${sub ? `<p class="capa-sub" data-rev>${sub}</p>` : ''}
</div></section>`;
const trilhaB = (v, ...itens) => [`<a href="/${v}/">Início</a>`, ...itens].join('<span aria-hidden="true">›</span>');

function faixasSeg(v) {
  return `<div class="faixas">${segmentos.map((s, i) => `<article class="faixa${i % 2 ? ' inv' : ''}">
  <figure class="fx-foto" data-rev="${i % 2 ? 'dir' : 'esq'}">${foto(s.largo)}</figure>
  <div class="fx-txt" data-rev>
    <p class="fx-n">0${i + 1} · ${esc(s.curto)}</p>
    <h3>${s.nome}</h3>
    <p>${esc(s.resumo)}</p>
    <div class="fx-logos">${s.marcas.map(k => img(marcas[k].logo, marcas[k].nome)).join('')}</div>
    <a class="btn" href="${href(v, s.slug)}">Conhecer ${s.nome.split(' ')[0] === 'Outras' ? 'outras tecnologias' : s.nome.split(' ')[0].toLowerCase()}${ic('seta')}</a>
  </div>
</article>`).join('')}</div>`;
}

const marquee = () => {
  const l = Object.values(marcas).map(m => `<li>${img(m.logo, m.nome)}</li>`).join('');
  return `<div class="marquee" aria-label="Marcas representadas"><ul>${l}</ul><ul aria-hidden="true">${l}</ul></div>`;
};

const etapasB = () => `<div class="etapas" data-etapas><span class="ap-trilho" aria-hidden="true"></span>${compromissos.map(c => `<div class="ap-etapa etapa"><span class="e-n">${c.n}</span><h3>${c.nome}</h3><p>${c.texto}</p></div>`).join('')}</div>`;

function paginasB() {
  const v = 'b', p = {};
  p.index = pagina(v, 'index', 'Medline · Produtos médicos, hospitalares e de cosmiatria', 'A Medline representa marcas referência em cirurgia, dermatologia e cosmiatria e outras tecnologias médicas. Produtos registrados na ANVISA e suporte técnico próprio. São Paulo, SP.', `
<section class="hero">
  <div class="hero-foto"><img src="/assets/img/centro-cirurgico.webp" alt="Sala cirúrgica preparada para videolaparoscopia" width="1600" height="1066" fetchpriority="high" class="ap-kenburns"></div>
  <div class="in hero-in">
    <p class="eyebrow" data-rev>Distribuidora de produtos médicos e hospitalares · São Paulo</p>
    <h1 data-palavras>Novas tecnologias para quem cuida de vidas.</h1>
    <p class="hero-sub" data-rev style="--ap-d:200ms">${intro[1]}</p>
    <div class="acoes" data-rev style="--ap-d:320ms"><a class="btn btn-claro" href="#segmentos">Ver segmentos${ic('seta')}</a><a class="btn btn-vazado" href="${href(v, 'contato')}">Fale conosco</a></div>
  </div>
  <nav class="hero-seg in" aria-label="Segmentos">${segmentos.map((s, i) => `<a href="${href(v, s.slug)}"><span>0${i + 1}</span><b>${s.nome}</b>${ic('seta')}</a>`).join('')}</nav>
</section>

<section class="sec-marcas">${marquee()}</section>

<section class="sec" id="segmentos"><div class="in">
  <div class="sec-cab" data-rev><p class="eyebrow">Segmentos</p><h2>Três frentes, marcas líderes em cada uma.</h2></div>
  ${faixasSeg(v)}
</div></section>

<section class="sec esfera-sec"><div class="in esf-grade">
  <figure class="esf-fig" data-rev="zoom"><img src="/assets/img/esfera.webp" alt="Esfera de palavras da Medline" width="428" height="428"></figure>
  <div data-rev>
    <p class="eyebrow">Empresa</p>
    <h2>${mvv[0].texto.replace('.', '')}.</h2>
    <ul class="palavras" aria-label="O que nos move">${palavrasEsfera.map(w => `<li>${w}</li>`).join('')}</ul>
    <dl class="mvv mvv-b">${mvv.slice(1).map(m => `<div><dt>${m.nome}</dt><dd>${m.texto}</dd></div>`).join('')}</dl>
    <a class="link" href="${href(v, 'empresa')}">Conheça a Medline${ic('seta')}</a>
  </div>
</div></section>

<section class="sec sec-escura"><div class="in">
  <div class="sec-cab" data-rev><p class="eyebrow">Como trabalhamos</p><h2>Da marca referência ao suporte depois da compra.</h2></div>
  ${etapasB()}
</div></section>
${ctaFaixa(v)}`);

  p.empresa = pagina(v, 'empresa', tituloPag('Empresa'), 'Missão, visão e valores da Medline, distribuidora de produtos médicos, hospitalares e de cosmiatria em São Paulo.', `
${capaB(fotosEmpresa[2], trilhaB(v, 'Empresa'), 'Tecnologia em produtos e serviços na área da saúde.')}
<section class="sec"><div class="in emp-b">
  <div class="txt-col txt-grande" data-rev>${intro.map(t => `<p>${t}</p>`).join('')}</div>
  <figure class="esf-fig" data-rev="zoom"><img src="/assets/img/esfera.webp" alt="Esfera de palavras da Medline" width="428" height="428"></figure>
</div></section>
<section class="sec sec-teal"><div class="in"><dl class="mvv mvv-tres" data-rev-filhos data-rev-passo="120">${mvv.map(m => `<div><dt>${m.nome}</dt><dd>${m.texto}</dd></div>`).join('')}</dl></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab" data-rev><p class="eyebrow">Galeria de fotos</p><h2>Nossa sede e nossa presença no setor.</h2></div>
  <div class="mosaico" data-rev-filhos data-rev-passo="90">${fotosEmpresa.map(f => `<a href="/assets/img/${f.src}" data-amplia data-legenda="${esc(f.alt)}">${foto(f)}</a>`).join('')}</div>
</div></section>
<section class="sec sec-escura"><div class="in"><div class="sec-cab" data-rev><p class="eyebrow">Como trabalhamos</p><h2>Quatro compromissos com quem compra da Medline.</h2></div>${etapasB()}</div></section>
${ctaFaixa(v)}${lightbox()}`);

  p.segmentos = pagina(v, 'segmentos', tituloPag('Segmentos'), 'Cirurgia, Dermatologia & Cosmiatria e Outras Tecnologias: os segmentos e as marcas que a Medline representa.', `
${capaB(segmentos[0].largo, trilhaB(v, 'Segmentos'), 'Segmentos', intro[0])}
<section class="sec"><div class="in">${faixasSeg(v)}</div></section>
<section class="sec-marcas">${marquee()}</section>
${ctaFaixa(v)}`);

  for (const s of segmentos) {
    p[s.slug] = pagina(v, s.slug, tituloPag(s.nome), s.resumo, `
${capaB(s.largo, trilhaB(v, `<a href="${href(v, 'segmentos')}">Segmentos</a>`, s.nome), s.nome, s.resumo)}
<section class="sec"><div class="in seg-b">
  <div class="txt-col txt-grande" data-rev>${s.texto.map(t => `<p>${esc(t)}</p>`).join('')}</div>
  ${s.areas ? `<div class="areas-b" data-rev><p class="eyebrow">Áreas atendidas</p><ol>${s.areas.map((a, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${a}</li>`).join('')}</ol></div>` : `<figure class="seg-foto-b" data-rev="dir">${foto(s.foto)}</figure>`}
</div></section>
${s.etimologia ? `<section class="sec sec-teal"><div class="in"><div class="sec-cab" data-rev><p class="eyebrow">De onde vem a palavra</p><h2>Cosmiatria, em três radicais gregos.</h2></div>${etimologia(s)}</div></section>` : ''}
<section class="sec"><div class="in">
  <div class="sec-cab" data-rev><p class="eyebrow">${s.marcas.length > 1 ? 'Marcas' : 'Marca'}</p><h2>${s.marcas.map(k => marcas[k].nome).join(' e ')}</h2></div>
  <div class="marcas-l">${s.marcas.map(k => blocoMarca(k, v)).join('')}</div>
  ${s.slug === 'dermatologia-cosmiatria' ? `<div class="sec-cab sub-cab" data-rev><p class="eyebrow">Linha YNS</p><h2>Cosmecêuticos dermatologicamente testados.</h2></div>${produtosYns()}` : ''}
</div></section>
<section class="outros-b"><div class="in outros-b-l">${segmentos.filter(o => o !== s).map(o => `<a href="${href(v, o.slug)}">${foto(o.largo)}<span><small>Próximo segmento</small><b>${o.nome}</b></span>${ic('seta')}</a>`).join('')}</div></section>
${ctaFaixa(v)}`);
  }

  p.contato = pagina(v, 'contato', tituloPag('Contato'), `Fale com a Medline: ${E.fone}, ${E.email}. Orçamentos, informações de produtos e suporte técnico.`, `
${capaB(null, trilhaB(v, 'Contato'), 'Fale com a Medline', 'Orçamentos, informações de produtos e suporte técnico. Campos com * são obrigatórios.')}
<section class="sec sec-form"><div class="in cont-grade"><div class="form-caixa" data-rev>${formContato()}</div>${contatoInfo()}</div></section>`);

  p.localizacao = pagina(v, 'localizacao', tituloPag('Localização'), `Matriz da Medline: ${E.enderecoLinha}.`, `
${capaB(null, trilhaB(v, 'Localização'), 'Localização', `${E.endereco.join(' · ')} · Brasil`)}
<section class="loc-b">${mapa()}<div class="in"><div class="loc-cartao" data-rev><h2>Matriz Medline</h2><p>${E.endereco.join('<br>')}<br>Brasil</p><p><a href="tel:${E.foneHref}">${ic('tel')}${E.fone}</a></p><a class="btn" href="${mapaRota}" target="_blank" rel="noopener">${ic('rota')}Como chegar</a></div></div></section>
<section class="sec"><div class="in mosaico mosaico-2">${fotosEmpresa.slice(0, 2).map(f => `<figure>${foto(f)}</figure>`).join('')}</div></section>`);
  return p;
}

export function gerarVersao(v) {
  const p = v === 'a' ? paginasA() : paginasB();
  // chaves -> caminho dentro da versão
  const out = {};
  for (const [slug, html] of Object.entries(p)) out[nav.find(n => n.slug === slug).caminho] = html;
  return out;
}
