// Monta as versões A ("Rótulo": menu lateral escuro como o site atual, bordô e dourado dos rótulos, selos das três linhas)
// e B ("Do campo à mesa": menu no topo, o caminho do boi em etapas com foto que troca, cortes em ficha com filtro).
// Estilos em public/assets/{base,a,b}.css; comportamento em public/assets/site.js.
import { empresa as E, canais, telHref, textos as T, etapas, qualidade, linhas, ordemLinhas, totalCortes, posts } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (src, alt, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const rot = (src, alt, extra = '') => `<img src="/assets/rot/${src}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;

export const nomesVersao = { a: 'Rótulo', b: 'Do campo à mesa' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'quem-somos', nome: 'Quem Somos', caminho: 'quem-somos/' },
  { slug: 'responsabilidade-socioambiental', nome: 'Responsabilidade Socioambiental', curto: 'Socioambiental', caminho: 'responsabilidade-socioambiental/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/', filhos: ordemLinhas.map(l => ({ slug: `produtos/${l}`, nome: linhas[l].nome, caminho: `produtos/${l}/` })) },
  { slug: 'controle-de-qualidade', nome: 'Controle de Qualidade', curto: 'Qualidade', caminho: 'controle-de-qualidade/' },
  { slug: 'universo-da-carne', nome: 'Universo da Carne', caminho: 'universo-da-carne/' },
  { slug: 'espaco-gourmet', nome: 'Espaço Gourmet', caminho: 'espaco-gourmet/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  zap: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1.1z"/><path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1-1.2 1.8.8c-.2 1-1 1.7-2 1.6-3.4-.3-6.2-3.1-6.5-6.5 0-1 .6-1.8 1.6-2l.8 1.8z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3.5 6l8.5 7 8.5-7"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  gota: '<path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z"/>',
  folha: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19l8-8"/>',
  reciclar: '<path d="M7 19H4l3-5M17 19h3l-3-5M9 5l3-2 3 2M8 14l-2-4M18 10l-2 4M10 19h4"/>',
  caminhao: '<path d="M2 6h12v10H2zM14 9h4l3 3v4h-7z"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

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
<meta name="theme-color" content="${v === 'a' ? '#1C1D1F' : '#86123A'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,600;0,700;1,600&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const ativo = (n, atual) => atual === n.slug || (n.filhos && atual.startsWith('produtos')) || (n.slug !== 'index' && atual.startsWith(n.slug + '/'));
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const zapLink = (txt = 'WhatsApp de vendas', cls = 'btn-zap') => `<a class="${cls}" href="https://wa.me/${E.whats}" target="_blank" rel="noopener">${ic('zap')} ${txt}</a>`;

function menuLista(v, atual, curto = false) {
  return nav.map(n => {
    const a = ativo(n, atual) ? ' aria-current="page"' : '';
    const sub = n.filhos ? `<ul class="sub">${n.filhos.map(f => `<li><a href="/${v}/${f.caminho}"${atual === f.slug ? ' aria-current="page"' : ''}>${f.nome}</a></li>`).join('')}</ul>` : '';
    return `<li${n.filhos ? ' class="tem-sub"' : ''}><a href="/${v}/${n.caminho}"${a}>${curto && n.curto ? n.curto : n.nome}</a>${sub}</li>`;
  }).join('');
}

function topo(v, atual) {
  if (v === 'a') return `<aside class="lado">
  <a class="lado-logo" href="/a/" aria-label="Sartori Alimentos, início"><img src="/assets/logo-branco.webp" alt="Sartori Alimentos, desde 1995" width="335" height="270"></a>
  ${menuBtn}
  <nav id="menu" class="lado-nav" aria-label="Menu principal"><ul>${menuLista(v, atual)}</ul>
    <div class="lado-pe">${zapLink('Fale com vendas')}<p>${E.cidade}</p></div>
  </nav>
</aside>`;
  return `<div class="faixa"><div class="in"><span>${ic('relogio')} Seg. a sex. 8h às 17h30 · Sáb. 7h30 às 11h30</span><span class="faixa-dir"><a href="mailto:${E.emailVendas}">${ic('mail')} ${E.emailVendas}</a><a href="tel:${E.foneVendasHref}">${ic('tel')} ${E.foneVendas}</a></span></div></div>
<header class="topo"><div class="in">
  <a class="topo-logo" href="/b/" aria-label="Sartori Alimentos, início"><img src="/assets/logo-escuro.webp" alt="Sartori Alimentos, desde 1995" width="335" height="270"></a>
  ${menuBtn}
  <nav id="menu" class="topo-nav" aria-label="Menu principal"><ul>${menuLista(v, atual, true)}</ul></nav>
</div></header>`;
}

function rodape(v) {
  const canaisCurtos = canais.slice(0, 3);
  return `<footer class="rod"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.webp" alt="Sartori Alimentos" width="335" height="270" loading="lazy"><p>Produtos 100% inspecionados, com controle rigoroso de qualidade e procedência. ${E.local}.</p></div>
  <div><h2>Atendimento</h2><ul class="rod-lista">${E.horario.map(([d, h]) => `<li><b>${d}</b> ${h}</li>`).join('')}</ul></div>
  <div><h2>Fale com a Sartori</h2><ul class="rod-lista">${canaisCurtos.map(c => `<li><b>${c.setor}</b> ${c.fones.map(f => `<a href="tel:${telHref(f)}">${f}</a>`).join(' · ')}</li>`).join('')}<li><a href="mailto:${E.emailVendas}">${E.emailVendas}</a></li></ul></div>
  <div><h2>Navegue</h2><ul class="rod-nav">${nav.map(n => `<li><a href="/${v}/${n.caminho}">${n.nome}</a></li>`).join('')}</ul></div>
</div><div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Sartori Alimentos · desde ${E.desde}</span><span>Inspeção SISBI-POA</span></div></div></footer>
<a class="zap-flut" href="https://wa.me/${E.whats}" target="_blank" rel="noopener" aria-label="WhatsApp de vendas">${ic('zap')}</a>`;
}

function pagina(v, slug, caminho, titulo, descricao, corpo) {
  return `${head(v, caminho, titulo, descricao)}
<body class="v-${v} pg-${slug.replace(/\//g, '-')}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, slug)}
<div class="principal">
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</div>
</body>
</html>
`;
}

// ---------- blocos comuns ----------
const video = `<div class="video" data-video="${E.video}"><img src="/assets/img/video.webp" alt="Vídeo institucional da Sartori Alimentos" loading="lazy"><button type="button" aria-label="Assistir ao vídeo institucional">${ic('play')}</button></div>`;

function corteFig(v, c, linha) {
  const nome = `${c.nome} ${linha === 'boitata' ? 'Boitatá' : 'Sartori'}`;
  if (c.foto) return `<figure class="corte com-foto"><div class="corte-foto">${img(c.foto, c.nome)}${rot(c.rot, `Rótulo ${nome}`, ' class="corte-rot"')}</div><figcaption>${c.nome}</figcaption></figure>`;
  return `<figure class="corte so-rot"><div class="corte-fundo">${rot(c.rot, `Rótulo ${nome}`, ' class="corte-rot"')}</div><figcaption>${c.nome}</figcaption></figure>`;
}

const cabecalho = (v, tit, sub, foto, extra = '') => v === 'a'
  ? `<header class="cab"${foto ? '' : ' data-sem-foto'}>${foto ? img(foto, '', ' class="cab-foto"') : ''}<div class="cab-in"><p class="sobre">Sartori Alimentos</p><h1>${tit}</h1>${sub ? `<p class="cab-sub">${sub}</p>` : ''}${extra}</div></header>`
  : `<header class="cab"><div class="in cab-in"><div><p class="sobre">Sartori Alimentos</p><h1>${tit}</h1>${sub ? `<p class="cab-sub">${sub}</p>` : ''}${extra}</div>${foto ? `<div class="cab-foto">${img(foto, '')}</div>` : ''}</div></header>`;

function postsLista(v, cat, limite) {
  const lista = posts.filter(p => p.cat === cat).slice(0, limite);
  const base = cat === 'universo' ? 'universo-da-carne' : 'espaco-gourmet';
  if (cat === 'gourmet') return `<div class="receitas">${lista.map((p, i) => `<a class="receita${i === 0 ? ' grande' : ''}" href="/${v}/${base}/${p.slug}/">${img(p.img, '')}<span>${p.titulo}</span></a>`).join('')}</div>`;
  return `<ol class="dicas">${lista.map((p, i) => `<li><a href="/${v}/${base}/${p.slug}/"><span class="dica-n">${String(i + 1).padStart(2, '0')}</span><span class="dica-foto">${img(p.img, '')}</span><span class="dica-t"><b>${p.titulo}</b><span>${p.resumo}</span></span>${ic('seta')}</a></li>`).join('')}</ol>`;
}

function canaisBloco() {
  return `<div class="canais">${canais.map(c => `<div class="canal"><h3>${c.setor}</h3>${c.email ? `<a href="mailto:${c.email}@sartorialimentos.com.br">${ic('mail')} ${c.email}@sartorialimentos.com.br</a>` : ''}${c.fones.map(f => `<a href="tel:${telHref(f)}">${ic('tel')} ${f}</a>`).join('')}</div>`).join('')}</div>`;
}

const formulario = `<form class="form" data-form>
  <div class="campos"><label>Nome<input name="nome" required autocomplete="name"></label><label>E-mail<input name="email" type="email" required autocomplete="email"></label>
  <label>Telefone<input name="fone" type="tel" autocomplete="tel"></label><label>Assunto<select name="assunto"><option>Comprar produtos (vendas)</option><option>Vender bovinos</option><option>Qualidade</option><option>Financeiro e faturamento</option><option>Trabalhe conosco</option></select></label></div>
  <label>Mensagem<textarea name="msg" rows="5" required></textarea></label>
  <button type="submit" class="btn">Enviar mensagem ${ic('seta')}</button>
  <p class="form-ok" hidden>Prévia: o formulário ainda não envia. No site publicado, a mensagem vai para o setor escolhido.</p>
</form>`;

// ---------- páginas ----------
function inicio(v) {
  const selos = ordemLinhas.map(l => linhas[l]);
  if (v === 'a') return `
<section class="hero">${img('fachada', 'Sede da Sartori Alimentos em Augusto Pestana com a frota refrigerada', ' class="hero-foto" fetchpriority="high" loading="eager"')}
  <div class="hero-in"><p class="sobre">Desde ${E.desde} · ${E.cidade}</p><h1>Produtos <span>100% inspecionados</span></h1><p class="hero-sub">${T.heroSub}</p>
  <div class="botoes"><a class="btn" href="/a/produtos/">Ver produtos ${ic('seta')}</a><a class="btn btn-linha" href="/a/quem-somos/">Nossa história</a></div></div>
</section>
<section class="paixao"><div class="paixao-txt"><h2>${T.paixaoTit}</h2>${T.paixao.map(p => `<p>${p}</p>`).join('')}<p class="destaque">${T.paixaoFecho}</p><a class="link" href="/a/quem-somos/">Nossa história ${ic('seta')}</a></div>
  <div class="paixao-foto">${img('familia', 'Família reunida no churrasco')}</div></section>
<section class="linhas-a"><div class="linhas-cab"><img src="/assets/rot/qualidade-mesa.webp" alt="Qualidade na sua mesa" class="script" loading="lazy"><p>${T.experiencia}</p></div>
  <div class="selos">${selos.map(l => `<a class="selo" href="/a/produtos/${l.slug}/">${rot(l.slug === 'boitata' ? l.rotulo : l.selo, l.nome)}<b>${l.nome}</b><span>${totalCortes(l.slug)} ${l.slug === 'miudos' ? 'itens' : 'cortes'}</span><em>Ver produtos ${ic('seta')}</em></a>`).join('')}</div></section>
<section class="video-a"><div class="video-txt"><p class="sobre">Assista</p><h2>Nosso vídeo de apresentação</h2><p>A estrutura, a equipe e a frota da Sartori Alimentos em Augusto Pestana.</p></div>${video}</section>
<section class="boitata-a"><div class="boitata-in"><img src="/assets/rot/logo-boitata2.webp" alt="Boitatá Novilho Precoce" class="boitata-logo" loading="lazy"><h2>Boitatá, a lenda</h2><p>${T.lendaFecho}</p><a class="btn btn-ouro" href="/a/produtos/boitata/">Conheça a linha Boitatá ${ic('seta')}</a></div>${img('boitata-pecas', 'Cortes Boitatá embalados: costela em tiras, picanha, vazio e T-bone', ' class="boitata-pecas"')}</section>
<section class="bloco"><div class="bloco-cab"><div><p class="sobre">Universo da Carne</p><h2>${T.universoSub}</h2></div><a class="link" href="/a/universo-da-carne/">Todas as dicas ${ic('seta')}</a></div>${postsLista('a', 'universo', 5)}</section>
<section class="bloco bloco-cinza"><div class="bloco-cab"><div><p class="sobre">Espaço Gourmet</p><h2>${T.gourmetSub}</h2></div><a class="link" href="/a/espaco-gourmet/">Todas as receitas ${ic('seta')}</a></div>${postsLista('a', 'gourmet', 5)}</section>
<section class="contato-a"><div><p class="sobre">Canais de informação</p><h2>Fale com o setor certo</h2><p>Vendas, compra de bovinos, qualidade, faturamento e demais setores, cada um com telefone e e-mail próprios.</p><div class="botoes">${zapLink()}<a class="btn btn-linha-esc" href="/a/contato/">Todos os contatos</a></div></div>
  <ul class="horario">${E.horario.map(([d, h]) => `<li><span>${d}</span><b>${h}</b></li>`).join('')}</ul></section>`;

  // B
  return `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt"><p class="sobre">Frigorífico em ${E.cidade} · desde ${E.desde}</p><h1>${T.heroTit}</h1><p class="hero-sub">${T.heroSub}, do campo até a mesa do consumidor.</p>
  <div class="botoes"><a class="btn btn-claro" href="/b/produtos/">Conheça os produtos ${ic('seta')}</a>${zapLink('Comprar para o meu mercado', 'btn btn-linha')}</div></div>
  <div class="hero-prod"><img src="/assets/rot/rotulos-boitata.webp" alt="Cortes Boitatá Novilho Precoce embalados a vácuo" width="1000" height="712" fetchpriority="high"></div>
</div></section>
<section class="numeros"><div class="in"><div><b>${E.desde}</b><span>início da Sartori em Augusto Pestana</span></div><div><b>SISBI</b><span>inspeção que permite vender em todo o Brasil</span></div><div><b>3 linhas</b><span>Boitatá, Tradicional e Miúdos</span></div><div><b>Frota própria</b><span>do transporte dos animais à entrega refrigerada</span></div></div></section>
<section class="intro-b"><div class="in intro-grid"><div class="intro-foto">${img('equipe-frota', 'Equipe da Sartori Alimentos em frente à sede e à frota')}</div><div><p class="sobre">Quem somos</p><h2>${T.paixaoTit}</h2>${T.paixao.map(p => `<p>${p}</p>`).join('')}<a class="link" href="/b/quem-somos/">Nossa história ${ic('seta')}</a></div></div></section>
<section class="caminho" data-troca><div class="in">
  <div class="caminho-cab"><p class="sobre">Do campo à mesa</p><h2>Cada etapa com controle rigoroso de qualidade e procedência</h2></div>
  <div class="caminho-grid"><div class="caminho-fotos">${[...etapas.map(e => e.foto), 'camara', 'churrasco'].map((f, i) => `<figure${i === 0 ? ' class="on"' : ''}>${img(f, '')}</figure>`).join('')}</div>
  <ol class="caminho-passos">${[...etapas, { tit: 'Câmara fria', txt: 'Carcaças resfriadas e cortes embalados com a marca Sartori ou Boitatá, todos com inspeção SISBI-POA.' }, { tit: 'Na mesa', txt: T.experiencia + '.' }].map((e, i) => `<li data-passo="${i}"><span class="passo-n">${String(i + 1).padStart(2, '0')}</span><h3>${e.tit}</h3><p>${e.txt}</p></li>`).join('')}</ol></div>
  <a class="link" href="/b/responsabilidade-socioambiental/">Bem-estar animal e meio ambiente ${ic('seta')}</a>
</div></section>
<section class="linhas-b"><div class="in"><div class="bloco-cab"><div><p class="sobre">Produtos</p><h2>Três linhas, ${ordemLinhas.reduce((s, l) => s + totalCortes(l), 0)} produtos</h2></div><a class="link" href="/b/produtos/">Ver todos ${ic('seta')}</a></div>
  <div class="linhas-lista">${selos.map(l => `<a class="linha-b linha-${l.slug}" href="/b/produtos/${l.slug}/"><span class="linha-selo">${rot(l.slug === 'boitata' ? 'logo-boitata2' : l.selo, l.nome)}</span><span class="linha-t"><b>${l.nome}</b><span>${l.resumo}</span><em>${totalCortes(l.slug)} ${l.slug === 'miudos' ? 'itens' : 'cortes'} ${ic('seta')}</em></span></a>`).join('')}</div></div></section>
<section class="boitata-b"><div class="in boitata-grid"><div>${img('espeto', 'Picanha no espeto sobre a brasa')}</div><div><img src="/assets/rot/logo-boitata2.webp" alt="Boitatá Novilho Precoce" class="boitata-logo" loading="lazy"><h2>Da tradição lendária do povo gaúcho</h2><p>${T.lendaFecho}</p><a class="btn btn-ouro" href="/b/produtos/boitata/">Linha Boitatá ${ic('seta')}</a></div></div></section>
<section class="bloco"><div class="in"><div class="bloco-cab"><div><p class="sobre">Espaço Gourmet</p><h2>Receitas de deixar água na boca</h2></div><a class="link" href="/b/espaco-gourmet/">Todas as receitas ${ic('seta')}</a></div>${postsLista('b', 'gourmet', 5)}</div></section>
<section class="video-b"><div class="in video-grid">${video}<div><p class="sobre">Vídeo institucional</p><h2>Conheça a Sartori por dentro</h2><p>A estrutura, a equipe e a frota em Augusto Pestana, no noroeste gaúcho.</p><a class="link" href="/b/universo-da-carne/">Dicas do Universo da Carne ${ic('seta')}</a></div></div></section>
<section class="contato-b"><div class="in"><div><h2>Quer revender os produtos Sartori?</h2><p>Fale com o setor de vendas: ${canais[0].fones.join(' · ')}.</p></div><div class="botoes">${zapLink('Chamar no WhatsApp', 'btn btn-claro')}<a class="btn btn-linha" href="/b/contato/">Todos os contatos</a></div></div></section>`;
}

function quemSomos(v) {
  const corpo = `<section class="txt-foto"><div class="txt">${T.quem.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${p}</p>`).join('')}</div><figure>${img('fachada-banner', 'Sede da Sartori Alimentos com caminhões refrigerados')}</figure></section>
<section class="sisbi"><div class="sisbi-selo"><img src="/assets/img/sisbi.webp" alt="SISBI, Sistema Brasileiro de Inspeção de Produtos de Origem Animal" loading="lazy"></div><div><h2>${T.sisbiTit}</h2><p>${T.sisbi}</p></div></section>
<section class="galeria-qs">${[['equipe', 'Equipe da Sartori Alimentos'], ['camara', 'Câmara fria com carcaças resfriadas'], ['boitata-pecas', 'Cortes Boitatá embalados'], ['rebanho', 'Rebanho no campo']].map(([f, a]) => `<figure>${img(f, a)}<figcaption>${a}</figcaption></figure>`).join('')}</section>
<section class="paixao-faixa"><p>${T.paixaoFecho}</p></section>`;
  return pagina(v, 'quem-somos', 'quem-somos/', 'Quem Somos · Sartori Alimentos', T.quem[0], cabecalho(v, 'Quem somos', `Desde ${E.desde}, do campo até a mesa dos consumidores.`, 'equipe-frota') + `<div class="${v === 'b' ? 'in ' : ''}pagina">${corpo}</div>`);
}

function socio(v) {
  const amb = ['reciclar', 'gota', 'folha'];
  const corpo = `<section class="intro-socio"><p class="lead">${T.socio}</p></section>
<section class="ambiente"><div class="amb-foto">${img('sustent', 'Lavoura e sustentabilidade')}</div><div><h2>Meio ambiente</h2>${T.ambiente.map((p, i) => `<div class="amb-item">${ic(amb[i])}<p>${p}</p></div>`).join('')}</div></section>
<section class="bem-estar"><h2>Bem-estar animal</h2><p>${T.bemEstarIntro}</p>
  <ol class="etapas">${etapas.map((e, i) => `<li><figure>${img(e.foto, '')}</figure><span class="passo-n">${String(i + 1).padStart(2, '0')}</span><h3>${e.tit}</h3><p>${e.txt}</p></li>`).join('')}</ol></section>
<section class="liberdades"><div><h2>As cinco liberdades</h2><p>${T.liberdadesIntro}</p></div><ol>${T.liberdades.map(l => `<li>${l}</li>`).join('')}</ol></section>`;
  return pagina(v, 'responsabilidade-socioambiental', 'responsabilidade-socioambiental/', 'Responsabilidade Socioambiental · Sartori Alimentos', T.socio.slice(0, 155), cabecalho(v, 'Responsabilidade socioambiental', 'Ética, bem-estar animal, relações de trabalho e respeito ao meio ambiente.', 'angus') + `<div class="${v === 'b' ? 'in ' : ''}pagina">${corpo}</div>`);
}

function produtos(v) {
  const corpo = `<section class="produtos-intro"><p class="lead">${T.experiencia}. Todos os produtos são 100% inspecionados, com controle rigoroso de qualidade e procedência.</p></section>
<section class="prod-linhas">${ordemLinhas.map((s, i) => { const l = linhas[s]; const amostra = l.grupos.flatMap(g => g.itens).filter(c => c.foto).slice(0, 3); return `<article class="prod-linha prod-${s}">
  <a class="prod-selo" href="/${v}/produtos/${s}/">${rot(s === 'boitata' ? l.rotulo : l.selo, l.nome)}</a>
  <div class="prod-txt"><p class="sobre">Linha ${String(i + 1).padStart(2, '0')}</p><h2>${l.nome}</h2><p>${l.resumo}</p><p class="prod-lista">${l.grupos.flatMap(g => g.itens).map(c => c.nome).join(' · ')}</p><a class="btn" href="/${v}/produtos/${s}/">Ver ${totalCortes(s)} ${s === 'miudos' ? 'itens' : 'cortes'} ${ic('seta')}</a></div>
  ${amostra.length ? `<div class="prod-amostra">${amostra.map(c => img(c.foto, c.nome)).join('')}</div>` : `<div class="prod-amostra so-rot">${l.grupos[0].itens.slice(0, 3).map(c => rot(c.rot, c.nome)).join('')}</div>`}
</article>`; }).join('')}</section>`;
  return pagina(v, 'produtos', 'produtos/', 'Produtos · Sartori Alimentos', 'Linhas Boitatá Novilho Precoce, Tradicional e Miúdos da Sartori Alimentos: produtos 100% inspecionados.', cabecalho(v, 'Produtos', T.heroTit + '. ' + T.heroSub + '.', 'pecas-cru') + `<div class="${v === 'b' ? 'in ' : ''}pagina">${corpo}</div>`);
}

function linha(v, s) {
  const l = linhas[s];
  const filtro = l.grupos.length > 1 ? `<div class="filtro" role="group" aria-label="Filtrar por linha"><button type="button" data-filtro="" aria-pressed="true">Todos</button>${l.grupos.map((g, i) => `<button type="button" data-filtro="g${i}" aria-pressed="false">${g.nome}</button>`).join('')}</div>` : '';
  const grupos = l.grupos.map((g, i) => `<section class="grupo" data-grupo="g${i}">${l.grupos.length > 1 ? `<div class="grupo-cab"><h2>${g.nome}</h2><p>${g.sub}</p></div>` : ''}<div class="cortes">${g.itens.map(c => corteFig(v, c, s)).join('')}</div></section>`).join('');
  const lenda = s === 'boitata' ? `<section class="lenda"><div class="lenda-txt"><p class="sobre">Boitatá, a lenda</p>${T.lenda.map(p => `<p>${p}</p>`).join('')}<p class="destaque">${T.lendaFecho}</p></div><figure>${img('chamada-boitata', 'Boitatá Novilho Precoce no campo')}</figure></section>` : '';
  const outras = ordemLinhas.filter(o => o !== s).map(o => `<a href="/${v}/produtos/${o}/">${rot(o === 'boitata' ? linhas[o].rotulo : linhas[o].selo, linhas[o].nome)}<span>${linhas[o].nome} ${ic('seta')}</span></a>`).join('');
  const sub = s === 'boitata' ? T.boitataIntro : `${T.heroTit}. ${T.heroSub}.`;
  const selo = `<div class="cab-selo">${rot(s === 'boitata' ? 'logo-boitata2' : l.selo, l.nome)}</div>`;
  const corpo = `${filtro}${grupos}${lenda}<section class="pedido"><div><h2>Quer os produtos ${s === 'boitata' ? 'Boitatá' : 'Sartori'} no seu mercado?</h2><p>Fale com o setor de vendas: ${canais[0].fones.join(' · ')} · ${E.emailVendas}</p></div>${zapLink('Pedir pelo WhatsApp', 'btn')}</section>
<section class="outras"><h2>Outras linhas</h2><div>${outras}</div></section>`;
  return pagina(v, `produtos/${s}`, `produtos/${s}/`, `${l.nome} · Sartori Alimentos`, `${l.nome}: ${l.resumo}`, cabecalho(v, l.nome, sub, s === 'boitata' ? 'banner-boitata3' : s === 'tradicional' ? 'tabua' : 'camara', v === 'a' ? selo : '') + `<div class="${v === 'b' ? 'in ' : ''}pagina linha-pg linha-${s}">${v === 'b' ? `<div class="linha-topo">${selo}<p>${l.resumo}</p></div>` : ''}${corpo}</div>`);
}

function controle(v) {
  const corpo = `<section class="intro-q"><p class="lead">${T.qualidadeIntro}</p><div class="selos-q"><div>${ic('escudo')}<b>SISBI-POA</b><span>Produtos 100% inspecionados</span></div><div>${ic('caminhao')}<b>Frota própria</b><span>Transporte refrigerado</span></div></div></section>
<section class="q-lista">${qualidade.map((q, i) => `<article class="q-item"><span class="passo-n">${String(i + 1).padStart(2, '0')}</span><div><h2>${q.tit}</h2>${q.sub ? `<p class="q-sub">${q.sub}</p>` : ''}<p>${q.txt}</p></div></article>`).join('')}</section>
<section class="q-fotos"><figure>${img('equipe', 'Colaboradores da Sartori com equipamentos de proteção')}</figure><figure>${img('camara', 'Câmara fria')}</figure></section>`;
  return pagina(v, 'controle-de-qualidade', 'controle-de-qualidade/', 'Controle de Qualidade · Sartori Alimentos', T.qualidadeIntro + ' CIPA, SIPAT, segurança do trabalho e capacitação.', cabecalho(v, 'Controle de qualidade', 'CIPA, SIPAT, segurança do trabalho e capacitação dos colaboradores.', 'qualidade') + `<div class="${v === 'b' ? 'in ' : ''}pagina">${corpo}</div>`);
}

function blog(v, cat) {
  const slug = cat === 'universo' ? 'universo-da-carne' : 'espaco-gourmet';
  const tit = cat === 'universo' ? 'Universo da Carne' : 'Espaço Gourmet';
  const sub = cat === 'universo' ? 'Dicas e utilidades de modo de preparo das carnes.' : 'Receitas práticas de deixar água na boca.';
  return pagina(v, slug, `${slug}/`, `${tit} · Sartori Alimentos`, sub, cabecalho(v, tit, sub, cat === 'universo' ? 'fogo' : 'ribeye') + `<div class="${v === 'b' ? 'in ' : ''}pagina">${postsLista(v, cat)}</div>`);
}

function post(v, p) {
  const base = p.cat === 'universo' ? 'universo-da-carne' : 'espaco-gourmet';
  const secao = p.cat === 'universo' ? 'Universo da Carne' : 'Espaço Gourmet';
  const outros = posts.filter(o => o.cat === p.cat && o.slug !== p.slug).slice(0, 3);
  const corpo = `<article class="artigo"><p class="voltar"><a href="/${v}/${base}/">← ${secao}</a></p><h1>${p.titulo}</h1><figure class="artigo-foto">${img(p.img, p.titulo, ' loading="eager"')}</figure><div class="artigo-txt">${p.html}</div></article>
<aside class="mais"><h2>Mais em ${secao}</h2><ul>${outros.map(o => `<li><a href="/${v}/${base}/${o.slug}/">${img(o.img, '')}<span>${o.titulo}</span></a></li>`).join('')}</ul></aside>`;
  return pagina(v, `${base}/${p.slug}`, `${base}/${p.slug}/`, `${p.titulo} · ${secao} · Sartori Alimentos`, p.resumo, `<div class="${v === 'b' ? 'in ' : ''}pagina pagina-artigo">${corpo}</div>`);
}

function contato(v) {
  const corpo = `<section class="contato-grid"><div><h2>Canais de informação</h2>${canaisBloco()}</div>
  <div class="contato-lado"><h2>Envie sua mensagem</h2>${formulario}<div class="horario-box"><h3>${ic('relogio')} Horários de atendimento</h3><ul class="horario">${E.horario.map(([d, h]) => `<li><span>${d}</span><b>${h}</b></li>`).join('')}</ul></div></div></section>
<section class="onde"><div><h2>Onde estamos</h2><p>${ic('pin')} ${E.local}.</p><a class="btn" href="${E.mapa}" target="_blank" rel="noopener">Abrir no Google Maps ${ic('seta')}</a></div>
  <iframe title="Mapa: Sartori Alimentos" loading="lazy" src="https://www.google.com/maps?q=-28.4763453,-53.964482&z=14&output=embed"></iframe></section>`;
  return pagina(v, 'contato', 'contato/', 'Contato · Sartori Alimentos', 'Telefones e e-mails de vendas, compra de bovinos, qualidade, faturamento, financeiro e RH da Sartori Alimentos.', cabecalho(v, 'Contato', 'Fale direto com o setor certo.', 'fachada') + `<div class="${v === 'b' ? 'in ' : ''}pagina">${corpo}</div>`);
}

export function gerarVersao(v) {
  const p = {
    index: pagina(v, 'index', '', `Sartori Alimentos · Produtos 100% inspecionados`, `Frigorífico em Augusto Pestana/RS desde ${E.desde}. Linhas Boitatá Novilho Precoce, Tradicional e Miúdos, com controle rigoroso de qualidade e procedência.`, inicio(v)),
    'quem-somos': quemSomos(v),
    'responsabilidade-socioambiental': socio(v),
    produtos: produtos(v),
    'controle-de-qualidade': controle(v),
    'universo-da-carne': blog(v, 'universo'),
    'espaco-gourmet': blog(v, 'gourmet'),
    contato: contato(v),
  };
  for (const s of ordemLinhas) p[`produtos/${s}`] = linha(v, s);
  for (const x of posts) p[`${x.cat === 'universo' ? 'universo-da-carne' : 'espaco-gourmet'}/${x.slug}`] = post(v, x);
  return p;
}
