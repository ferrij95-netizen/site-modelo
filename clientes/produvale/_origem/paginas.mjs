// Monta as páginas das versões A ("Clara": branco hospitalar, azul e vermelho do logo como destaque)
// e B ("Marinho": o azul-marinho e a faixa vermelha do site atual, cruz do logo como moldura de foto).
// O conteúdo é o mesmo nas duas; muda o desenho. Estilos em public/assets/{base,a,b}.css.
import { empresa as E, sobre, linhas, marcas, clientes, etapas } from './conteudo.mjs';

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const tel = f => 'tel:+55' + f.replace(/\D/g, '');
const anos = new Date().getFullYear() - E.fundacao;
const marca = id => marcas.find(m => m.id === id);

export const nomesVersao = { a: 'Clara', b: 'Marinho' };

const I = {
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// Os três quadrados do "P" do logo (azul, vermelho, salmão), usados como marcador da marca.
const cruz = (cls = '') => `<span class="cruz ${cls}" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>`;

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'A Empresa', caminho: 'empresa/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'parceiros', nome: 'Parceiros', caminho: 'parceiros/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

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
<meta property="og:site_name" content="Produvale Produtos Hospitalares">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,500..900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/apresenta.css">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/apresenta.js" defer></script>
<script src="/assets/site.js" defer></script>
</head>`;
}

function topo(v, ativo) {
  const links = nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === ativo ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
  const logo = v === 'b' ? 'logo-branco' : 'logo';
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<div class="barra"><div class="in">
  <span>${ic('pin')} ${E.cidade}</span>
  <a href="${tel(E.telefone)}">${ic('tel')} ${E.telefone}</a>
  <a href="mailto:${E.email}" class="barra-mail">${ic('mail')} ${E.email}</a>
  <span class="barra-afe">${ic('escudo')} AFE ANVISA ${E.afe}</span>
</div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/${v}/" aria-label="Produvale Produtos Hospitalares, início"><img src="/assets/${logo}.svg" alt="Produvale Produtos Hospitalares" width="636" height="150"></a>
  <nav class="menu" aria-label="Principal">${links}<a class="menu-cta" href="/${v}/contato/">Solicitar cotação</a></nav>
  <button class="burger" aria-label="Abrir menu" aria-expanded="false">${ic('menu', 'ic ic-abre')}${ic('x', 'ic ic-fecha')}</button>
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">
    <img src="/assets/logo-branco.svg" alt="Produvale Produtos Hospitalares" width="636" height="150" loading="lazy">
    <p>Distribuição de produtos para saúde desde ${E.fundacao}, a partir de Blumenau.</p>
  </div>
  <div class="rod-col">
    <h3>Páginas</h3>
    ${nav.map(n => `<a href="/${v}/${n.caminho}">${n.nome}</a>`).join('')}
  </div>
  <div class="rod-col">
    <h3>Produtos</h3>
    ${linhas.map(l => `<a href="/${v}/produtos/#${l.id}">${l.curto}</a>`).join('')}
  </div>
  <div class="rod-col">
    <h3>Contato</h3>
    <p>${E.razao}<br>${E.endereco}, ${E.bairro}<br>${E.cidadeUf} · CEP ${E.cep}</p>
    <a href="${tel(E.telefone)}">${E.telefone}</a>
    <a href="mailto:${E.email}">${E.email}</a>
  </div>
</div>
<div class="in rod-fim"><span>© ${new Date().getFullYear()} ${E.razao}</span><span>Autorização de Funcionamento ANVISA (AFE) ${E.afe}, D.O.U. de ${E.afeData}</span></div>
</footer>`;
}

const pagina = (v, slug, caminho, titulo, desc, corpo) => `${head(v, caminho, titulo, desc)}
<body class="v-${v} p-${slug}" data-ap-auto=".secao h2, .secao .lead">
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

const btn = (href, txt, cls = '') => `<a class="btn ${cls}" href="${href}">${txt} ${ic('seta')}</a>`;

// ---------- blocos comuns ----------
const numeros = () => `<div class="numeros" data-rev-filhos="" data-rev-passo="90">
  <div><strong data-conta>${anos}</strong><span>anos no mercado, desde ${E.fundacao}</span></div>
  <div><strong data-conta>${linhas.length}</strong><span>linhas de produto</span></div>
  <div><strong data-conta>${marcas.length}</strong><span>marcas parceiras</span></div>
  <div><strong>AFE</strong><span>autorização da ANVISA</span></div>
</div>`;

const etapasHtml = () => `<ol class="etapas" data-etapas><span class="ap-trilho"></span>
  ${etapas.map((e, i) => `<li class="ap-etapa"><span class="et-n">${String(i + 1).padStart(2, '0')}</span><h3>${e.t}</h3><p>${e.d}</p></li>`).join('')}
</ol>`;

const anvisa = () => `<div class="anvisa">
  <img src="/assets/img/anvisa.png" alt="Agência Nacional de Vigilância Sanitária" width="283" height="108" loading="lazy">
  <p><strong>Autorização de Funcionamento (AFE)</strong> na ANVISA, publicada no D.O.U. de ${E.afeData}, nº ${E.afe}.</p>
</div>`;

const contatoDados = () => `<ul class="dados">
  <li>${ic('pin')}<span>${E.endereco}, ${E.bairro}<br>${E.cidadeUf} · CEP ${E.cep}<br><a href="${E.mapa}" target="_blank" rel="noopener">Ver no mapa</a></span></li>
  <li>${ic('tel')}<a href="${tel(E.telefone)}">${E.telefone}</a></li>
  <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
</ul>`;

const formulario = () => `<form class="form" data-mailto="${E.email}">
  <div class="campos">
    <label>Nome<input name="nome" required autocomplete="name"></label>
    <label>Instituição ou empresa<input name="instituicao" autocomplete="organization"></label>
    <label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label>
    <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
    <label class="largo">Assunto<select name="assunto">
      <option>Solicitar cotação</option>
      <option>Licitação ou pregão</option>
      <option>Dúvida sobre produto</option>
      <option>Outro assunto</option>
    </select></label>
    <label class="largo">Mensagem<textarea name="mensagem" rows="5" required placeholder="Itens, quantidades, número do edital..."></textarea></label>
  </div>
  <button class="btn" type="submit">Enviar mensagem ${ic('seta')}</button>
  <p class="form-nota">O envio abre o seu programa de e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;

// ---------- versão A ----------
function inicioA() {
  const v = 'a';
  return `<section class="a-hero">
  <div class="in a-hero-txt">
    <p class="eyebrow">${cruz()} Distribuidora médico-hospitalar · Blumenau, SC · desde ${E.fundacao}</p>
    <h1 data-palavras>Produtos para saúde com as marcas que a sua equipe já conhece.</h1>
    <div class="a-hero-pe">
      <p class="lead">Material de consumo, instrumental, equipamentos, laboratório, descartáveis e saneantes para hospitais, prefeituras, clínicas e consultórios.</p>
      <div class="acoes">${btn(`/${v}/contato/`, 'Solicitar cotação')}${btn(`/${v}/produtos/`, 'Ver as linhas', 'btn-linha')}</div>
    </div>
  </div>
  <figure class="a-hero-foto" data-rev="cortina">${img('blumenau-ponte', 'Ponte sobre o rio Itajaí-Açu, no centro de Blumenau', ' fetchpriority="high" loading="eager"')}
    <figcaption>Blumenau, SC: sede da Produvale desde ${E.fundacao}</figcaption></figure>
</section>

<section class="secao in">${numeros()}</section>

<section class="secao secao-cola in a-sobre">
  <div class="a-sobre-tit"><p class="eyebrow">A Produvale</p><h2>${anos} anos no segmento médico-hospitalar.</h2></div>
  <div class="a-sobre-txt">${sobre.map(p => `<p>${p}</p>`).join('')}${btn(`/${v}/empresa/`, 'Conheça a empresa', 'btn-texto')}</div>
</section>

<section class="secao a-linhas" id="linhas"><div class="in">
  <div class="cab"><p class="eyebrow">Produtos</p><h2>Sete linhas, um só fornecedor.</h2></div>
  <div class="a-indice" data-indice>
    <ol>${linhas.map((l, i) => `<li><a href="/${v}/produtos/#${l.id}" data-foto="${l.img}"${i === 0 ? ' class="ativo"' : ''}>
      <span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${l.nome}</span><span class="d">${l.texto}</span>${ic('seta')}
      <span class="mini">${img(l.img, l.nome)}</span></a></li>`).join('')}</ol>
    <figure class="a-indice-foto" aria-hidden="true">${linhas.map((l, i) => img(l.img, '', ` data-foto="${l.img}"${i === 0 ? ' class="ativo"' : ''}`)).join('')}</figure>
  </div>
</div></section>

<section class="secao a-publico"><div class="in">
  <div class="cab"><p class="eyebrow">Mercado público</p><h2>Do edital à entrega, com quem conhece o processo.</h2>
  <p class="lead">A Produvale tem forte atuação no mercado público. Atende prefeituras, secretarias de saúde e hospitais com marcas registradas e atendimento direto.</p></div>
  ${etapasHtml()}
</div></section>

<section class="secao in a-marcas">
  <div class="cab cab-lado"><div><p class="eyebrow">Parceiros</p><h2>Marcas que distribuímos.</h2></div>${btn(`/${v}/parceiros/`, 'Ver todos os parceiros', 'btn-texto')}</div>
  <ul class="grade-marcas">${marcas.map(m => `<li><a href="${m.url}" target="_blank" rel="noopener"><strong>${m.nome}</strong>${m.area ? `<span>${m.area}</span>` : ''}</a></li>`).join('')}</ul>
</section>

<section class="secao a-contato"><div class="in a-contato-in">
  <div><p class="eyebrow">${cruz()} Fale com a Produvale</p><h2>Precisa de uma cotação?</h2><p class="lead">Envie a lista de itens ou o número do edital. Respondemos pelo telefone ou por e-mail.</p>
  <div class="acoes">${btn(`/${v}/contato/`, 'Solicitar cotação', 'btn-claro')}<a class="btn btn-linha-claro" href="${tel(E.telefone)}">${ic('tel')} ${E.telefone}</a></div></div>
  ${anvisa()}
</div></section>`;
}

// ---------- versão B ----------
function inicioB() {
  const v = 'b';
  return `<section class="b-hero"><div class="in b-hero-in">
  <div class="b-hero-txt">
    <p class="eyebrow">Distribuidora médico-hospitalar · desde ${E.fundacao}</p>
    <h1 data-palavras>Tudo o que a saúde usa, entregue por quem atende há ${anos} anos.</h1>
    <p class="lead">De Blumenau para hospitais, prefeituras, clínicas e consultórios: sete linhas de produto e marcas renomadas, com atenção no atendimento.</p>
    <div class="acoes">${btn(`/${v}/contato/`, 'Solicitar cotação', 'btn-vermelho')}${btn(`/${v}/produtos/`, 'Ver produtos', 'btn-linha-claro')}</div>
  </div>
  <figure class="b-cruz" data-rev="zoom">${img('blumenau-centro', 'Rua XV de Novembro, centro de Blumenau', ' fetchpriority="high" loading="eager"')}</figure>
</div></section>

<div class="b-faixa" aria-label="Linhas de produto"><div class="b-faixa-trilho">${[0, 1].map(k => `<span${k ? ' aria-hidden="true"' : ''}>${linhas.map(l => `${l.nome}<i></i>`).join('')}</span>`).join('')}</div></div>

<section class="secao b-linhas"><div class="in">
  <div class="cab cab-lado"><div><p class="eyebrow">Produtos</p><h2>Sete linhas para o dia a dia da saúde.</h2></div>${btn(`/${v}/produtos/`, 'Todas as linhas', 'btn-texto')}</div>
  <div class="b-mosaico" data-rev-filhos="" data-rev-passo="80">${linhas.map((l, i) => `<a class="b-tile t${i + 1}" href="/${v}/produtos/#${l.id}">${img(l.img, l.nome)}<span class="b-tile-txt"><span class="n">${String(i + 1).padStart(2, '0')}</span><strong>${l.nome}</strong><span class="d">${l.exemplos.slice(0, 3).join(' · ')}</span></span></a>`).join('')}</div>
</div></section>

<section class="secao b-sobre"><div class="in b-sobre-in">
  <div class="b-ano" aria-hidden="true"><span>${E.fundacao}</span>${cruz('cruz-g')}</div>
  <div><p class="eyebrow">A Produvale</p><h2>Fundada em Blumenau, reconhecida por clientes e fornecedores.</h2>${sobre.map(p => `<p>${p}</p>`).join('')}${btn(`/${v}/empresa/`, 'Conheça a empresa', 'btn-texto')}</div>
</div>
<div class="in">${numeros()}</div></section>

<section class="secao b-quem"><div class="in">
  <div class="cab"><p class="eyebrow">Quem atendemos</p><h2>Do posto de saúde ao centro cirúrgico.</h2></div>
  <div class="b-quem-g">${clientes.map((c, i) => `<div><span class="et-n">${String(i + 1).padStart(2, '0')}</span><h3>${c.nome}</h3><p>${c.texto}</p></div>`).join('')}</div>
</div></section>

<section class="secao b-publico"><div class="in">
  <div class="cab"><p class="eyebrow">Mercado público</p><h2>Como funciona um fornecimento.</h2></div>
  ${etapasHtml()}
</div></section>

<section class="secao b-marcas"><div class="in"><div class="cab cab-lado"><div><p class="eyebrow">Parceiros</p><h2>Marcas renomadas.</h2></div>${btn(`/${v}/parceiros/`, 'Ver parceiros', 'btn-texto')}</div></div>
  <div class="b-marquee"><div>${[0, 1].map(k => `<span${k ? ' aria-hidden="true"' : ''}>${marcas.map(m => `<b>${m.nome}</b>`).join('')}</span>`).join('')}</div></div>
</section>

<section class="secao b-contato"><div class="in b-contato-in">
  <div><p class="eyebrow">Contato</p><h2>Envie sua lista de itens.</h2><p class="lead">Cotações, pregões e reposições: fale direto com a equipe da Produvale.</p>${contatoDados()}${btn(`/${v}/contato/`, 'Solicitar cotação', 'btn-vermelho')}</div>
  ${anvisa()}
</div></section>`;
}

// ---------- páginas internas ----------
function cabecalho(v, eyebrow, titulo, lead, foto) {
  return `<section class="pg-cab${foto ? ' pg-cab-foto' : ''}">${foto ? `<figure>${img(foto, '', ' loading="eager"')}</figure>` : ''}<div class="in">
  <p class="eyebrow">${v === 'a' ? cruz() + ' ' : ''}${eyebrow}</p><h1 data-palavras>${titulo}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}
</div></section>`;
}

function empresaPg(v) {
  return `${cabecalho(v, 'A Empresa', `${anos} anos distribuindo produtos para saúde.`, `Fundada em ${E.fundacao} em Blumenau, Santa Catarina.`, v === 'b' ? 'blumenau-ponte' : '')}
<section class="secao in emp-hist">
  <figure class="emp-foto">${img('blumenau-rio-original', 'Rio Itajaí-Açu e o centro de Blumenau')}<figcaption>Blumenau, a cidade-sede da Produvale (foto do site da empresa).</figcaption></figure>
  <div class="emp-txt"><h2>Nossa história</h2>${sobre.map(p => `<p>${p}</p>`).join('')}</div>
</section>
<section class="secao secao-cola in">${numeros()}</section>
<section class="secao emp-quem"><div class="in">
  <div class="cab"><p class="eyebrow">Quem atendemos</p><h2>Clientes públicos e privados.</h2></div>
  <div class="b-quem-g">${clientes.map((c, i) => `<div><span class="et-n">${String(i + 1).padStart(2, '0')}</span><h3>${c.nome}</h3><p>${c.texto}</p></div>`).join('')}</div>
</div></section>
<section class="secao emp-pub"><div class="in">
  <div class="cab"><p class="eyebrow">Mercado público</p><h2>Como funciona um fornecimento.</h2></div>
  ${etapasHtml()}
</div></section>
<section class="secao in emp-reg">
  <div><h2>Regularizada na ANVISA</h2><p>A distribuição de produtos para saúde exige Autorização de Funcionamento da ANVISA. A Produvale tem a sua desde 2007.</p></div>
  ${anvisa()}
</section>
${faixaCta(v)}`;
}

function produtosPg(v) {
  return `${cabecalho(v, 'Produtos', 'Sete linhas para hospitais, clínicas e consultórios.', 'Trabalhamos com marcas renomadas e registradas na ANVISA. Envie sua lista e montamos a cotação.')}
<nav class="chips in" aria-label="Linhas de produto">${linhas.map(l => `<a href="#${l.id}">${l.curto}</a>`).join('')}</nav>
<div class="prod-lista">
${linhas.map((l, i) => `<section class="prod${i % 2 ? ' prod-inv' : ''}" id="${l.id}"><div class="in prod-in">
  <figure class="prod-foto" data-rev="${i % 2 ? 'dir' : 'esq'}">${img(l.img, l.nome)}</figure>
  <div class="prod-txt">
    <span class="prod-n">${String(i + 1).padStart(2, '0')} / ${String(linhas.length).padStart(2, '0')}</span>
    <h2>${l.nome}</h2>
    <p>${l.texto}</p>
    <h3>Exemplos de itens</h3>
    <ul class="exemplos">${l.exemplos.map(x => `<li>${x}</li>`).join('')}</ul>
    ${l.marcas.length ? `<p class="prod-marcas">Marcas parceiras: ${l.marcas.map(id => `<a href="${marca(id).url}" target="_blank" rel="noopener">${marca(id).nome}</a>`).join(', ')}</p>` : ''}
    ${btn(`/${v}/contato/?linha=${encodeURIComponent(l.curto)}`, 'Cotar esta linha', 'btn-texto')}
  </div>
</div></section>`).join('\n')}
</div>
${faixaCta(v)}`;
}

function parceirosPg(v) {
  return `${cabecalho(v, 'Parceiros', 'Marcas renomadas, com registro na ANVISA.', 'A Produvale comercializa produtos de fabricantes reconhecidos no mercado de saúde. Clique no nome para visitar o site de cada um.')}
<section class="secao in">
  <ul class="lista-marcas">${marcas.map((m, i) => {
    const ls = linhas.filter(l => l.marcas.includes(m.id));
    return `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><a href="${m.url}" target="_blank" rel="noopener"><strong>${m.nome}</strong> ${ic('externo')}</a><span class="area">${m.area || '&nbsp;'}</span><span class="ls">${ls.map(l => `<a href="/${v}/produtos/#${l.id}">${l.curto}</a>`).join('')}</span></li>`;
  }).join('')}</ul>
</section>
${faixaCta(v)}`;
}

function contatoPg(v) {
  return `${cabecalho(v, 'Contato', 'Fale com a Produvale.', 'Cotações, licitações e dúvidas sobre produtos. Atendimento direto, por telefone ou e-mail.')}
<section class="secao in ct">
  <div class="ct-dados">${contatoDados()}${anvisa()}</div>
  ${formulario()}
</section>
<section class="ct-mapa"><iframe title="Mapa: ${esc(E.endereco)}, Blumenau" src="${E.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;
}

function faixaCta(v) {
  return `<section class="faixa-cta"><div class="in">
  <h2>Envie sua lista de itens e receba a cotação.</h2>
  <div class="acoes">${btn(`/${v}/contato/`, 'Solicitar cotação', v === 'b' ? 'btn-vermelho' : 'btn-claro')}<a class="btn btn-linha-claro" href="${tel(E.telefone)}">${ic('tel')} ${E.telefone}</a></div>
</div></section>`;
}

export function gerarVersao(v) {
  const t = s => `${s} · Produvale Produtos Hospitalares`;
  return {
    index: pagina(v, 'index', '', 'Produvale Produtos Hospitalares · Blumenau, SC', `Distribuidora de produtos médico-hospitalares em Blumenau desde ${E.fundacao}: material de consumo, instrumental, equipamentos, laboratório, descartáveis e saneantes.`, v === 'a' ? inicioA() : inicioB()),
    empresa: pagina(v, 'empresa', 'empresa/', t('A Empresa'), `A Produvale atua no segmento médico-hospitalar desde ${E.fundacao}, com forte atuação no mercado público.`, empresaPg(v)),
    produtos: pagina(v, 'produtos', 'produtos/', t('Produtos'), 'Sete linhas de produtos para saúde: consumo hospitalar, instrumental cirúrgico, móveis e equipamentos, odontológicos, laboratório, descartáveis e saneantes.', produtosPg(v)),
    parceiros: pagina(v, 'parceiros', 'parceiros/', t('Parceiros'), 'Marcas parceiras da Produvale: Cremer, Injex, Cristófoli, Supermax, Welmy e outras.', parceirosPg(v)),
    contato: pagina(v, 'contato', 'contato/', t('Contato'), `Produvale: ${E.endereco}, ${E.cidadeUf}. Telefone ${E.telefone}.`, contatoPg(v)),
  };
}
