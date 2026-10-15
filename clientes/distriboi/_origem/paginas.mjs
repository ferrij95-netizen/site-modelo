// Páginas das duas versões do site da DistriBoi.
// A = "Tradição": cabeçalho claro com o logo vermelho, capa dividida com a foto do Nelore, faixas retas e leitura calma.
// B = "Campo Vermelho": capa em tela cheia com o fundo vermelho do boi (o mesmo do aviso "Vem aí um novo site"),
//     logo branco, números grandes, mosaico de fotos e unidades em painéis escuros.
import * as C from './conteudo.mjs';

const { site } = C;
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra ? ' ' + extra : ''}>`;

// Ícones de traço (24x24).
const I = {
  faca: '<path d="M3 21 14 10M14 10l3-3c1.5-1.5 4-1.5 4 1l-1 2-6 6z"/><path d="m9 15 2 2"/>',
  corte: '<path d="M4 15c0-6 5-10 11-10 3 0 5 2 5 5 0 6-6 10-11 10-3 0-5-2-5-5z"/><path d="M9 14c1.5-3 4-5 7-5"/><circle cx="15.5" cy="13.5" r="1.2"/>',
  ciclo: '<path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>',
  caminhao: '<path d="M2 6h12v10H2zM14 9.5h4l3 3.5v3h-7"/><circle cx="6" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
  campo: '<path d="M3 20c2-3 4-3 6 0M9 20c2-3 4-3 6 0M15 20c2-3 4-3 6 0"/><path d="M7 10h9l2-3h2v3l-1 1v4M7 10l-2 1v4M10 15v-3M15 15v-3"/>',
  escudo: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  floco: '<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7"/><path d="m9 4 3 2 3-2M9 20l3-2 3 2M4 10.5l3.5-.5L6 6.8M20 13.5l-3.5.5 1.5 3.2M4 13.5l3.5.5L6 17.2M20 10.5l-3.5-.5 1.5-3.2"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 7 8.5-7"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  globo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z"/>',
  pessoas: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  fabrica: '<path d="M3 21V10l5 3V10l5 3V6h3l1-3h2l1 3v15z"/><path d="M7 17h2M12 17h2M17 17h1"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
  jornal: '<path d="M4 5h13v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM17 9h3v10a2 2 0 0 1-2 2"/><path d="M7 9h7M7 13h7M7 17h4"/>',
};
const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const cred = n => (C.creditos[n] ? `<small class="credito">Foto ilustrativa · ${esc(C.creditos[n])}</small>` : '');
const figura = (n, alt, legenda = '', cls = '') => `<figure class="foto-moldura${cls ? ' ' + cls : ''}">${foto(n, alt)}${C.creditos[n] ? `<figcaption>${cred(n)}</figcaption>` : legenda ? `<figcaption>${legenda}</figcaption>` : ''}</figure>`;

const fotoServico = { 'abate-e-desossa': 'banco-camara', 'produtos-de-carne': 'banco-desossa', subprodutos: 'banco-linha', transporte: 'fachada' };
const altServico = { 'abate-e-desossa': 'Carcaças bovinas em câmara fria', 'produtos-de-carne': 'Linha de desossa', subprodutos: 'Linha de processamento de carne', transporte: 'Carreta frigorífica na doca da planta da DistriBoi em Ji-Paraná' };

// Títulos e descrições (SEO).
const PAG = {
  index: ['DistriBoi · Frigorífico de carne bovina em Rondônia', 'DistriBoi: abate, desossa e processamento de bovinos com Inspeção Federal em Ji-Paraná e Rolim de Moura (RO). Carne bovina direto do produtor desde 1987.'],
  'a-distriboi': ['A DistriBoi · história desde 1987', 'A história da DistriBoi, de Seringueiras (1987) às plantas com SIF de Ji-Paraná e Rolim de Moura.'],
  'o-que-fazemos': ['O que fazemos · DistriBoi', 'Abate e desossa, industrialização da carne, subprodutos do abate e transporte de cargas.'],
  qualidade: ['Qualidade e Inspeção Federal · DistriBoi', 'Plantas registradas no SIF 4695 e SIF 4334, com inspeção federal em todas as etapas.'],
  unidades: ['Unidades · DistriBoi', 'Plantas frigoríficas da DistriBoi em Ji-Paraná (SIF 4695) e Rolim de Moura (SIF 4334), Rondônia.'],
  mercados: ['Mercados · DistriBoi', 'Carne bovina de Rondônia para o Brasil e para o exterior: China, Israel, Chile, Canadá, Hong Kong e Egito.'],
  noticias: ['Notícias · DistriBoi', 'Notícias da DistriBoi.'],
  'trabalhe-conosco': ['Trabalhe conosco · DistriBoi', 'Faça parte da equipe da DistriBoi em Ji-Paraná e Rolim de Moura.'],
  contato: ['Contato · DistriBoi', 'Telefone, e-mail e endereço das unidades da DistriBoi em Rondônia.'],
};
for (const s of C.servicos) PAG['o-que-fazemos/' + s.slug] = [`${s.nome} · DistriBoi`, s.curto];
for (const u of C.unidades) PAG['unidades/' + u.slug] = [`Unidade ${u.nome} (SIF ${u.sif}) · DistriBoi`, u.texto];
PAG['noticias/' + C.noticia.slug] = [C.noticia.titulo, C.noticia.resumo];

export function gerarVersao(v) {
  const A = v === 'a';
  const L = s => `/${v}/${s === 'index' ? '' : s + '/'}`;
  const logo = (cor = 'vermelha') => `<span class="logo"><img class="logo-boi" src="/assets/boi-${cor}.svg" alt="" width="58" height="39"><img class="logo-nome" src="/assets/nome-${cor}.svg" alt="DistriBoi" width="120" height="37"></span>`;

  const menuItens = [['index', 'Início'], ['a-distriboi', 'A DistriBoi'], ['o-que-fazemos', 'O que fazemos'], ['qualidade', 'Qualidade'], ['unidades', 'Unidades'], ['mercados', 'Mercados'], ['contato', 'Contato']];
  const subs = {
    'o-que-fazemos': C.servicos.map(x => ['o-que-fazemos/' + x.slug, x.nome, x.ico]),
    unidades: C.unidades.map(u => ['unidades/' + u.slug, `${u.nome} · SIF ${u.sif}`, 'fabrica']),
  };
  const nav = slug => menuItens.map(([s, t]) => {
    const atual = slug === s || (s !== 'index' && slug.startsWith(s + '/'));
    const a = `<a href="${L(s)}"${atual ? ' aria-current="page"' : ''}>${t}</a>`;
    if (!subs[s]) return a;
    return `<div class="sub">${a}<button type="button" class="sub-btn" aria-expanded="false" aria-label="Abrir ${t}"></button><div class="sub-lista">${subs[s].map(([h, n, i]) => `<a href="${L(h)}"${slug === h ? ' aria-current="page"' : ''}>${ico(i)}${n}</a>`).join('')}</div></div>`;
  }).join('') + `<a class="nav-trab" href="${L('trabalhe-conosco')}"${slug === 'trabalhe-conosco' ? ' aria-current="page"' : ''}>Trabalhe conosco</a>`;

  const claro = !A; // B usa logo branco em todas as páginas (cabeçalho escuro); A usa o vermelho.
  const topo = slug => `${A ? `<div class="faixa-topo"><div class="in"><span>${ico('fabrica')}Frigorífico com Inspeção Federal · SIF 4695 e SIF 4334</span><span class="faixa-c"><a href="tel:${site.foneHref}">${ico('fone')}${site.fone}</a><a href="mailto:${site.email}">${ico('email')}${site.email}</a></span></div></div>` : ''}<header class="topo${!A && slug === 'index' ? ' sobre-capa' : ''}"><div class="in">
  <a class="marca" href="${L('index')}" aria-label="DistriBoi, início">${logo(claro ? 'branca' : 'vermelha')}</a>
  <nav id="nav" class="nav" aria-label="Menu principal">${nav(slug)}</nav>
  <a class="btn btn-principal so-pc" href="tel:${site.foneHref}">${ico('fone')}${site.fone}</a>
  <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
</div></header>`;

  const rodape = () => `<footer class="rodape"><div class="grama" aria-hidden="true"></div><div class="in r-topo">
  <div class="r-marca"><img src="/assets/logo-branca.svg" alt="DistriBoi" width="150" height="126"><p>${esc(site.slogan)}. Abate, desossa e processamento de bovinos com Inspeção Federal em Rondônia, desde 1987.</p><a class="r-social" href="${site.linkedin}" target="_blank" rel="noopener">${ico('linkedin')}DistriBoi no LinkedIn</a></div>
  <div><h3>A empresa</h3><ul>${[['a-distriboi', 'A DistriBoi'], ['qualidade', 'Qualidade'], ['mercados', 'Mercados'], ['noticias', 'Notícias'], ['trabalhe-conosco', 'Trabalhe conosco'], ['contato', 'Contato']].map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}</ul></div>
  <div><h3>O que fazemos</h3><ul>${C.servicos.map(x => `<li><a href="${L('o-que-fazemos/' + x.slug)}">${x.nome}</a></li>`).join('')}</ul></div>
  <div><h3>Unidades</h3><ul>${C.unidades.map(u => `<li><a href="${L('unidades/' + u.slug)}"><b>${u.nome} · SIF ${u.sif}</b><span>${u.fone}</span></a></li>`).join('')}
    <li><a href="mailto:${site.email}">${ico('email')}${site.email}</a></li></ul></div>
</div><div class="in r-base"><span>© DistriBoi · ${site.razao} · CNPJ ${site.cnpj}</span><span>${site.cidade}</span></div></footer>`;

  const pagina = (slug, corpo) => {
    const [titulo, desc] = PAG[slug];
    const url = `https://distriboi.overtus.com.br${L(slug)}`;
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
<meta property="og:site_name" content="DistriBoi">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://distriboi.overtus.com.br/assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="https://distriboi.overtus.com.br/assets/og-${v}.jpg">
<meta name="theme-color" content="#B3121A">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v} p-${slug.replace(/\//g, '-')}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(slug)}
<main id="conteudo">
${corpo}
</main>
${rodape()}
<script src="/assets/distriboi.js" defer></script>
</body>
</html>
`;
  };

  // ---------- Peças ----------
  const btn = (href, txt, cls = 'btn-principal') => `<a class="btn ${cls}" href="${href}">${txt}${ico('seta')}</a>`;
  const cab = (eyebrow, titulo, texto, migalha = '') => `<section class="cab-pag"><div class="in"><nav class="migalha" aria-label="Você está em"><a href="${L('index')}">Início</a>${migalha}</nav><span class="eyebrow">${eyebrow}</span><h1>${titulo}</h1>${texto ? `<p class="lead">${texto}</p>` : ''}</div></section>`;
  const mig = (s, t) => `<span>/</span><a href="${L(s)}">${t}</a>`;

  const numeros = () => `<section class="numeros"><div class="in">${C.numeros.map(([n, t]) => `<div class="num"><b>${n}</b><span>${t}</span></div>`).join('')}</div></section>`;

  const etapas = () => `<ol class="etapas">${C.etapas.map(([t, d, i], k) => `<li><span class="et-n">${String(k + 1).padStart(2, '0')}</span>${ico(i, 'ico et-ico')}<h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>`;

  const processo = () => `<section class="processo"><div class="in">
    <div class="sec-cab"><span class="eyebrow">Do campo à expedição</span><h2>Como a carne sai da fazenda e chega ao mercado</h2><p>Seis etapas, todas acompanhadas pelo Serviço de Inspeção Federal.</p></div>
    ${etapas()}
  </div></section>`;

  const unidadesBloco = () => `<div class="unid-grade">${C.unidades.map(u => `<article class="unid">
      <div class="unid-sif"><small>SIF</small><b>${u.sif}</b></div>
      <div class="unid-txt"><span class="eyebrow">Planta frigorífica · desde ${u.desde}</span><h3>${u.nome}</h3><p>${ico('pin')}${u.endereco}</p><p>${ico('fone')}<a href="tel:${u.foneHref}">${u.fone}</a></p>
      ${btn(L('unidades/' + u.slug), 'Ver a unidade', 'btn-linha')}</div></article>`).join('')}</div>`;

  const mercadosBloco = () => `<ul class="paises">${C.mercados.externo.map(([n, c]) => `<li><span class="iso">${c}</span>${n}</li>`).join('')}</ul>`;

  const noticiaBloco = () => `<article class="noticia-dest">
      <div class="nd-marca"><img src="/assets/boi-branca.svg" alt="" width="120" height="81"><span>DistriBoi <i>+</i> FriGol</span></div>
      <div class="nd-txt"><span class="eyebrow">${ico('jornal')}Notícia · ${C.noticia.data}</span><h3>${C.noticia.titulo}</h3><p>${C.noticia.resumo}</p>${btn(L('noticias/' + C.noticia.slug), 'Ler a notícia', 'btn-linha')}</div>
    </article>`;

  const cta = () => `<section class="cta"><div class="cta-fundo" aria-hidden="true"></div><div class="in">
    <div><span class="eyebrow">Fale com a DistriBoi</span><h2>Compra de carne, parcerias ou serviços de industrialização</h2><p>Atendimento pelo telefone da unidade de Ji-Paraná ou por e-mail.</p></div>
    <div class="cta-acoes"><a class="btn btn-branco" href="tel:${site.foneHref}">${ico('fone')}${site.fone}</a><a class="btn btn-contorno" href="${L('contato')}">Enviar mensagem${ico('seta')}</a></div>
  </div></section>`;

  // ---------- Início ----------
  const inicioA = () => `
<section class="capa-a"><div class="in">
  <div class="capa-txt"><span class="eyebrow">Frigorífico em Rondônia desde 1987</span>
    <h1>Carne bovina<br><em>direto do produtor</em></h1>
    <p class="lead">Abate, desossa e processamento de bovinos com Inspeção Federal nas plantas de Ji-Paraná e Rolim de Moura, para o Brasil e para o exterior.</p>
    <div class="acoes">${btn(L('o-que-fazemos'), 'O que fazemos')}${btn(L('contato'), 'Fale conosco', 'btn-linha')}</div>
    <ul class="selos"><li>${ico('escudo')}SIF 4695</li><li>${ico('escudo')}SIF 4334</li><li>${ico('globo')}Exportação</li></ul>
  </div>
  <div class="capa-fotos">
    <figure class="cf-grande">${foto('banco-nelore', 'Gado Nelore no pasto', 'fetchpriority="high" loading="eager"')}<figcaption>${cred('banco-nelore')}</figcaption></figure>
    <figure class="cf-placa">${foto('fachada-placa', 'Placa da DistriBoi na fachada da planta de Ji-Paraná: Carne Bovina Direto do Produtor')}<figcaption>Fachada da planta de Ji-Paraná</figcaption></figure>
  </div>
</div></section>
${numeros()}
<section class="sobre-a"><div class="in">
  ${figura('fachada', 'Carreta frigorífica na doca da planta da DistriBoi em Ji-Paraná', 'Doca de expedição da planta de Ji-Paraná')}
  <div><span class="eyebrow">A DistriBoi</span><h2>${C.sobre.titulo}</h2>${C.sobre.texto.map(p => `<p>${p}</p>`).join('')}${btn(L('a-distriboi'), 'Nossa história', 'btn-linha')}</div>
</div></section>
<section class="servicos-a"><div class="in">
  <div class="sa-foto">${figura('banco-desossa', 'Linha de desossa de carne bovina')}</div>
  <div><div class="sec-cab"><span class="eyebrow">O que fazemos</span><h2>Da carcaça ao corte embalado, com transporte próprio</h2></div>
  <ul class="lista-serv">${C.servicos.map(s => `<li><a href="${L('o-que-fazemos/' + s.slug)}">${ico(s.ico, 'ico ls-ico')}<span><b>${s.nome}</b>${s.curto}</span>${ico('seta', 'ico ls-seta')}</a></li>`).join('')}</ul></div>
</div></section>
${processo()}
<section class="unidades-sec"><div class="in">
  <div class="sec-cab"><span class="eyebrow">Unidades</span><h2>Duas plantas frigoríficas com Inspeção Federal</h2><p>Em Ji-Paraná e Rolim de Moura, no centro da pecuária de Rondônia.</p></div>
  ${unidadesBloco()}
</div></section>
<section class="mercados-sec"><div class="in">
  <div><span class="eyebrow">Mercados</span><h2>Do interior de Rondônia para o mundo</h2><p>${C.mercados.interno}</p><p>${C.mercados.eua}</p>${btn(L('mercados'), 'Ver mercados', 'btn-linha')}</div>
  ${mercadosBloco()}
</div></section>
<section class="noticia-sec"><div class="in">${noticiaBloco()}</div></section>
${cta()}`;

  const inicioB = () => `
<section class="capa-b"><div class="capa-fundo" aria-hidden="true"></div><div class="in">
  <div class="capa-txt">
    <img class="capa-logo" src="/assets/logo-branca.svg" alt="DistriBoi" width="260" height="219">
    <h1>Carne bovina direto do produtor</h1>
    <p class="lead">Frigorífico de Rondônia desde 1987. Abate, desossa e processamento de bovinos com Inspeção Federal em Ji-Paraná e Rolim de Moura.</p>
    <div class="acoes">${btn(L('unidades'), 'Conheça as plantas', 'btn-branco')}${btn(L('contato'), 'Fale conosco', 'btn-contorno')}</div>
  </div>
  <figure class="capa-foto">${foto('banco-nelore', 'Gado Nelore no pasto', 'fetchpriority="high" loading="eager"')}<figcaption>${cred('banco-nelore')}</figcaption></figure>
</div>
<div class="faixa-rolante" aria-hidden="true"><div>${Array(2).fill(['Abate', 'Desossa', 'Processamento', 'Câmaras frias', 'Transporte', 'Exportação', 'SIF 4695', 'SIF 4334'].map(t => `<span>${t}</span>`).join('')).join('')}</div></div>
</section>
${numeros()}
<section class="mosaico"><div class="in">
  <div class="mo-txt"><span class="eyebrow">A DistriBoi</span><h2>${C.sobre.titulo}</h2>${C.sobre.texto.map(p => `<p>${p}</p>`).join('')}${btn(L('a-distriboi'), 'Nossa história')}</div>
  <div class="mo-fotos">
    ${figura('fachada', 'Carreta frigorífica na doca da planta da DistriBoi em Ji-Paraná', 'Planta de Ji-Paraná', 'mo-1')}
    ${figura('banco-camara', 'Carcaças bovinas em câmara fria', '', 'mo-2')}
    ${figura('banco-inspecao', 'Avaliação de carcaça bovina', '', 'mo-3')}
  </div>
</div></section>
<section class="servicos-b"><div class="in">
  <div class="sec-cab"><span class="eyebrow">O que fazemos</span><h2>Quatro frentes, uma cadeia do frio</h2></div>
  <div class="painel-serv">${C.servicos.map((s, k) => `<a class="ps" href="${L('o-que-fazemos/' + s.slug)}">${foto(fotoServico[s.slug], altServico[s.slug])}<span class="ps-n">0${k + 1}</span><span class="ps-txt">${ico(s.ico)}<b>${s.nome}</b><small>${s.curto}</small></span></a>`).join('')}</div>
</div></section>
${processo()}
<section class="unidades-sec"><div class="in">
  <div class="sec-cab"><span class="eyebrow">Unidades</span><h2>Duas plantas com Inspeção Federal</h2></div>
  ${unidadesBloco()}
</div></section>
<section class="mercados-sec"><div class="in">
  <div><span class="eyebrow">Mercados</span><h2>Carne de Rondônia no Brasil e no mundo</h2><p>${C.mercados.interno}</p><p>${C.mercados.eua}</p>${btn(L('mercados'), 'Ver mercados')}</div>
  ${mercadosBloco()}
</div></section>
<section class="noticia-sec"><div class="in">${noticiaBloco()}</div></section>
${cta()}`;

  // ---------- Páginas internas ----------
  const paginas = {};
  paginas.index = pagina('index', A ? inicioA() : inicioB());

  paginas['a-distriboi'] = pagina('a-distriboi', `
${cab('A DistriBoi', 'De Seringueiras para o mercado internacional', 'Uma empresa de Rondônia que cresceu com a pecuária do estado, sempre com o mesmo princípio: carne bovina direto do produtor.', mig('a-distriboi', 'A DistriBoi'))}
<section class="sobre-a"><div class="in">
  ${figura('fachada', 'Planta da DistriBoi em Ji-Paraná', 'Planta de Ji-Paraná')}
  <div><span class="eyebrow">Quem somos</span><h2>${C.sobre.titulo}</h2>${C.sobre.texto.map(p => `<p>${p}</p>`).join('')}</div>
</div></section>
${numeros()}
<section class="historia"><div class="in">
  <div class="sec-cab"><span class="eyebrow">Linha do tempo</span><h2>Nossa história</h2></div>
  <ol class="tempo">${C.historia.map(([a, t, d]) => `<li><b class="t-ano">${a}</b><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
</div></section>
<section class="missao"><div class="in"><span class="eyebrow">Nosso compromisso</span><blockquote>${C.sobre.missao}</blockquote></div></section>
${cta()}`);

  paginas['o-que-fazemos'] = pagina('o-que-fazemos', `
${cab('O que fazemos', 'Abate, industrialização, subprodutos e transporte', 'As atividades da DistriBoi cobrem toda a cadeia, da chegada do gado à carreta frigorífica.', mig('o-que-fazemos', 'O que fazemos'))}
<section class="serv-lista"><div class="in">${C.servicos.map((s, k) => `<article class="serv-bloco${k % 2 ? ' inv' : ''}">
  ${figura(fotoServico[s.slug], altServico[s.slug], s.slug === 'transporte' ? 'Doca de expedição da planta de Ji-Paraná' : '')}
  <div><span class="eyebrow">${ico(s.ico)}0${k + 1}</span><h2>${s.nome}</h2><p>${s.texto[0]}</p><ul class="checks">${s.itens.map(i => `<li>${ico('check')}${i}</li>`).join('')}</ul>${btn(L('o-que-fazemos/' + s.slug), 'Saiba mais', 'btn-linha')}</div>
</article>`).join('')}</div></section>
${processo()}
${cta()}`);

  for (const s of C.servicos) {
    const outros = C.servicos.filter(x => x !== s);
    paginas['o-que-fazemos/' + s.slug] = pagina('o-que-fazemos/' + s.slug, `
${cab('O que fazemos', s.nome, s.curto, mig('o-que-fazemos', 'O que fazemos') + mig('o-que-fazemos/' + s.slug, s.nome))}
<section class="serv-det"><div class="in">
  <div class="sd-txt">${s.texto.map(p => `<p>${p}</p>`).join('')}<h2>Nesta etapa</h2><ul class="checks">${s.itens.map(i => `<li>${ico('check')}${i}</li>`).join('')}</ul>
    <div class="acoes">${btn(L('contato'), 'Fale com a DistriBoi')}</div></div>
  <aside class="sd-lado">${figura(fotoServico[s.slug], altServico[s.slug], s.slug === 'transporte' ? 'Doca de expedição da planta de Ji-Paraná' : '')}
    <div class="sd-outros"><h3>Outras atividades</h3>${outros.map(o => `<a href="${L('o-que-fazemos/' + o.slug)}">${ico(o.ico)}${o.nome}${ico('seta', 'ico seta')}</a>`).join('')}</div></aside>
</div></section>
${cta()}`);
  }

  paginas.qualidade = pagina('qualidade', `
${cab('Qualidade', 'Inspeção Federal em todas as etapas', 'As duas plantas da DistriBoi são registradas no Serviço de Inspeção Federal (SIF), do Ministério da Agricultura e Pecuária.', mig('qualidade', 'Qualidade'))}
<section class="sobre-a"><div class="in">
  ${figura('banco-inspecao', 'Avaliação de carcaça bovina')}
  <div><span class="eyebrow">O que é o SIF</span><h2>O selo que permite vender para todo o Brasil e exportar</h2>
  <p>O Serviço de Inspeção Federal acompanha o abate e a industrialização de produtos de origem animal. Com o SIF, os fiscais do Ministério examinam os animais antes e depois do abate e verificam as condições de higiene de toda a planta.</p>
  <p>É o registro no SIF que autoriza a venda da carne em todos os estados e é a base para as habilitações de exportação.</p>
  <ul class="selos selos-grandes">${C.unidades.map(u => `<li>${ico('escudo')}<span><b>SIF ${u.sif}</b>${u.nome} (RO)</span></li>`).join('')}</ul></div>
</div></section>
${processo()}
<section class="mercados-sec"><div class="in">
  <div><span class="eyebrow">Habilitações</span><h2>Plantas habilitadas para exportação</h2><p>Segundo o comunicado da FriGol de março de 2026, as unidades da DistriBoi possuem habilitações para exportação para mercados como China, Israel, Chile e Canadá.</p></div>
  ${mercadosBloco()}
</div></section>
${cta()}`);

  paginas.unidades = pagina('unidades', `
${cab('Unidades', 'Duas plantas frigoríficas em Rondônia', 'Ji-Paraná e Rolim de Moura, com abate, desossa e processamento sob Inspeção Federal.', mig('unidades', 'Unidades'))}
<section class="unidades-sec"><div class="in">${unidadesBloco()}</div></section>
<section class="sobre-a"><div class="in">
  ${figura('fachada', 'Planta da DistriBoi em Ji-Paraná', 'Planta de Ji-Paraná')}
  <div><span class="eyebrow">Matriz</span><h2>Onde tudo começou: Seringueiras</h2><p>A matriz da DistriBoi fica em Seringueiras (RO), na BR-429, onde a empresa começou em 1987 com o transporte rodoviário de cargas.</p><p>Das cidades de Ji-Paraná e Rolim de Moura, as plantas atendem as fazendas do centro e da Zona da Mata de Rondônia.</p></div>
</div></section>
${cta()}`);

  for (const u of C.unidades) {
    const outra = C.unidades.find(x => x !== u);
    paginas['unidades/' + u.slug] = pagina('unidades/' + u.slug, `
${cab('Unidade', `${u.nome} <span class="sif-tag">SIF ${u.sif}</span>`, u.texto, mig('unidades', 'Unidades') + mig('unidades/' + u.slug, u.nome))}
<section class="unid-det"><div class="in">
  <div class="ud-dados">
    <div class="unid-sif grande"><small>SIF</small><b>${u.sif}</b></div>
    <dl><div><dt>Atividade</dt><dd>Abate, desossa e processamento de bovinos</dd></div><div><dt>Desde</dt><dd>${u.desde}</dd></div><div><dt>Endereço</dt><dd>${u.endereco}</dd></div><div><dt>Telefone</dt><dd><a href="tel:${u.foneHref}">${u.fone}</a></dd></div></dl>
    <div class="acoes">${btn(u.mapa, 'Abrir no mapa')}${btn(L('unidades/' + outra.slug), `Unidade ${outra.nome}`, 'btn-linha')}</div>
  </div>
  ${u.slug === 'ji-parana' ? figura('fachada', 'Planta da DistriBoi em Ji-Paraná', 'Fachada e doca da planta de Ji-Paraná') : figura('banco-camara', 'Carcaças bovinas em câmara fria')}
</div></section>
${processo()}
${cta()}`);
  }

  paginas.mercados = pagina('mercados', `
${cab('Mercados', 'Carne bovina de Rondônia para o Brasil e o mundo', C.mercados.interno, mig('mercados', 'Mercados'))}
<section class="mercados-sec"><div class="in">
  <div><span class="eyebrow">Exportação</span><h2>Mercados no exterior</h2><p>Em 2017 a DistriBoi já exportava para Hong Kong, Egito e Chile. Em 2026, segundo a FriGol, as plantas têm habilitações para mercados como China, Israel, Chile e Canadá.</p><p>${C.mercados.eua}</p></div>
  ${mercadosBloco()}
</div></section>
<section class="sobre-a"><div class="in">
  ${figura('banco-camara', 'Carcaças bovinas em câmara fria')}
  <div><span class="eyebrow">Mercado interno</span><h2>Para todo o Brasil, com SIF</h2><p>O registro no Serviço de Inspeção Federal permite vender a carne em todos os estados. As carretas frigoríficas saem das docas das plantas direto das câmaras frias.</p>${btn(L('o-que-fazemos/transporte'), 'Transporte de cargas', 'btn-linha')}</div>
</div></section>
<section class="noticia-sec"><div class="in">${noticiaBloco()}</div></section>
${cta()}`);

  paginas.noticias = pagina('noticias', `
${cab('Notícias', 'Notícias da DistriBoi', '', mig('noticias', 'Notícias'))}
<section class="noticia-sec"><div class="in">${noticiaBloco()}</div></section>
${cta()}`);

  const n = C.noticia;
  paginas['noticias/' + n.slug] = pagina('noticias/' + n.slug, `
${cab(`Notícia · ${n.data}`, n.titulo, n.resumo, mig('noticias', 'Notícias'))}
<section class="artigo"><div class="in">
  <div class="art-txt">${n.texto.map(p => `<p>${p}</p>`).join('')}<p class="fonte">Fonte: <a href="${n.fonte[1]}" target="_blank" rel="noopener">${n.fonte[0]}${ico('externo')}</a></p></div>
  <aside><div class="nd-marca"><img src="/assets/boi-branca.svg" alt="" width="120" height="81"><span>DistriBoi <i>+</i> FriGol</span></div>
  <ul class="checks"><li>${ico('check')}FriGol compra os animais e vende os produtos</li><li>${ico('check')}DistriBoi faz abate, desossa e processamento</li><li>${ico('check')}Plantas de Ji-Paraná e Rolim de Moura</li></ul></aside>
</div></section>
${cta()}`);

  const campo = (nome, rot, tipo = 'text', req = true, extra = '') => `<label class="campo"><span>${rot}${req ? ' *' : ''}</span><input name="${nome}" type="${tipo}"${req ? ' required' : ''}${extra}></label>`;

  paginas['trabalhe-conosco'] = pagina('trabalhe-conosco', `
${cab('Trabalhe conosco', 'Faça parte da equipe DistriBoi', 'A DistriBoi gera cerca de 1,2 mil empregos diretos em Rondônia. Envie seus dados e a área em que quer trabalhar.', mig('trabalhe-conosco', 'Trabalhe conosco'))}
<section class="form-sec"><div class="in">
  <div class="fs-lado"><h2>Áreas</h2><ul class="checks">${C.areasTrabalho.map(a => `<li>${ico('check')}${a}</li>`).join('')}</ul>${figura('banco-linha', 'Equipe na linha de processamento')}</div>
  <form class="form" data-form="trabalhe" novalidate>
    ${campo('nome', 'Nome completo')}${campo('telefone', 'Telefone ou WhatsApp', 'tel')}${campo('email', 'E-mail', 'email', false)}${campo('cidade', 'Cidade', 'text', false)}
    <label class="campo"><span>Unidade *</span><select name="unidade" required><option value="">Escolha</option>${C.unidades.map(u => `<option>${u.nome}</option>`).join('')}<option>Tanto faz</option></select></label>
    <label class="campo"><span>Área de interesse *</span><select name="area" required><option value="">Escolha</option>${C.areasTrabalho.map(a => `<option>${a}</option>`).join('')}</select></label>
    <label class="campo largo"><span>Conte sua experiência</span><textarea name="mensagem" rows="4"></textarea></label>
    <p class="aviso" data-aviso role="status"></p>
    <button class="btn btn-principal" type="submit">Enviar${ico('seta')}</button>
  </form>
</div></section>`);

  paginas.contato = pagina('contato', `
${cab('Contato', 'Fale com a DistriBoi', 'Compra de carne, parcerias, serviços de industrialização ou transporte.', mig('contato', 'Contato'))}
<section class="form-sec"><div class="in">
  <div class="fs-lado"><h2>Atendimento</h2>
    <ul class="contatos"><li>${ico('fone')}<span><b>Ji-Paraná</b><a href="tel:${site.foneHref}">${site.fone}</a></span></li><li>${ico('fone')}<span><b>Rolim de Moura</b><a href="tel:${C.unidades[1].foneHref}">${C.unidades[1].fone}</a></span></li><li>${ico('email')}<span><b>E-mail</b><a href="mailto:${site.email}">${site.email}</a></span></li><li>${ico('pin')}<span><b>Endereço</b><a href="${site.mapa}" target="_blank" rel="noopener">${site.endereco}, ${site.cidade}, CEP ${site.cep}</a></span></li></ul></div>
  <form class="form" data-form="contato" novalidate>
    ${campo('nome', 'Nome')}${campo('empresa', 'Empresa', 'text', false)}${campo('telefone', 'Telefone', 'tel')}${campo('email', 'E-mail', 'email')}
    <label class="campo"><span>Assunto *</span><select name="assunto" required><option value="">Escolha</option><option>Compra de carne</option><option>Venda de gado</option><option>Industrialização / parceria</option><option>Transporte</option><option>Outro assunto</option></select></label>
    <label class="campo"><span>Unidade</span><select name="unidade"><option>Ji-Paraná</option><option>Rolim de Moura</option></select></label>
    <label class="campo largo"><span>Mensagem *</span><textarea name="mensagem" rows="5" required></textarea></label>
    <p class="aviso" data-aviso role="status"></p>
    <button class="btn btn-principal" type="submit">Enviar mensagem${ico('seta')}</button>
  </form>
</div></section>
<section class="unidades-sec"><div class="in">${unidadesBloco()}</div></section>`);

  return paginas;
}
