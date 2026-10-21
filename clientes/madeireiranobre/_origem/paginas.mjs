// Monta as páginas das versões A ("Tradição": fiel ao site atual, faixa de contatos, banners das telhas, tábuas e vigas,
// "Madeiras de qualidade direto da serraria" e a grade de produtos com a faixa vinho) e B ("Serraria": clara e técnica,
// bitolas desenhadas em escala, produtos por etapa da obra, calculadora). Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, sobre, categorias, etapas, depoimentos, slides, todosItens } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const sem = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const img = (n, alt, { w = 800, h = 800, cls = '', lazy = true } = {}) => `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async">`;
const ext = 'target="_blank" rel="noopener"';

export const nomesVersao = { a: 'Tradição', b: 'Serraria' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'calcule', nome: 'Calcule', caminho: 'calcule/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  ok: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
  lupa: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  calc: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><rect x="8" y="5.5" width="8" height="4" rx=".5"/><path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01"/>',
  ig: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.3 6.7h.01"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  tt: '<path d="M14 3v11.5a3.5 3.5 0 11-3.5-3.5"/><path d="M14 3c.4 2.6 2 4.2 5 4.5"/>',
  aspas: '<path d="M10 7H6a2 2 0 00-2 2v4h5v5H4M20 7h-4a2 2 0 00-2 2v4h5v5h-5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Estou visitando o site da Madeireira Nobre e gostaria de um orçamento.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;
const waProduto = nome => waLink(`Olá! Estou visitando o site e gostaria de um orçamento do produto: *${nome}*`);
const redes = () => `<a href="${E.redes.instagram}" ${ext} aria-label="Instagram">${ic('ig')}</a><a href="${E.redes.facebook}" ${ext} aria-label="Facebook">${ic('fb')}</a><a href="${E.redes.tiktok}" ${ext} aria-label="TikTok">${ic('tt')}</a>`;
const catUrl = (v, c) => `/${v}/produtos/${c.slug}/`;
// as três linhas vermelhas que saem do oval do logo
const linhas = (cls = 'tris') => `<span class="${cls}" aria-hidden="true"><i></i><i></i><i></i></span>`;

// Seção da peça desenhada em escala (topo da madeira com os anéis de crescimento). secao = [espessura, largura] em cm.
export function bitolaSvg([esp, larg], madeira = 'Pinus', px = 15) {
  const w = larg * px, h = esp * px, id = `g${larg}x${esp}`.replace('.', '_') + madeira[0];
  const cor = madeira === 'Eucalipto' ? ['#C98A62', '#A9643F'] : ['#E9CC97', '#C9A15F'];
  const cx = w * 0.32, cy = h + w * 0.55;
  let aneis = '';
  for (let r = 6; r < w * 1.6; r += 5.5 + (r % 3)) aneis += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}"/>`;
  return `<svg class="bitola" viewBox="-1 -1 ${w + 2} ${h + 2}" width="${w + 2}" height="${h + 2}" aria-hidden="true"><defs><clipPath id="${id}"><rect width="${w}" height="${h}" rx="1.5"/></clipPath></defs><rect width="${w}" height="${h}" rx="1.5" fill="${cor[0]}"/><g clip-path="url(#${id})" fill="none" stroke="${cor[1]}" stroke-width="1" opacity=".75">${aneis}</g><rect width="${w}" height="${h}" rx="1.5" fill="none" stroke="#3b2a20" stroke-opacity=".35"/></svg>`;
}

// ---------- moldura ----------
function head(v, p, titulo, descricao) {
  const url = `${E.url}${v}/${p}`;
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
<meta property="og:site_name" content="${E.nomeCompleto}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#53292A' : '#FFFFFF'}">
<link rel="icon" href="/assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600;700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const navLinks = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const btnOrc = v => `<a class="btn-orc" href="/${v}/contato/#orcamento">${ic('lista')}<span>Orçamento</span><b class="orc-n" hidden>0</b></a>`;
const logo = v => `<a class="logo" href="/${v}/" aria-label="Madeireira Nobre, página inicial"><img src="/assets/logo.svg" alt="Madeireira Nobre" width="424" height="270"></a>`;

function topo(v, atual) {
  if (v === 'a') return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<div class="a-faixa"><div class="w">
  <a href="mailto:${E.email}">${ic('mail')} ${E.email}</a>
  <span class="a-faixa-d"><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><span class="sep">/</span><a href="tel:${E.celularHref}">${E.celular}</a><span class="a-redes">${redes()}</span><a class="a-wa" href="${waLink()}" ${ext}>${ic('wa')} WhatsApp</a></span>
</div></div>
<header class="a-cab"><div class="w">
  ${logo(v)}
  <div class="a-cab-d">
    <nav class="a-menu" id="menu" aria-label="Principal">${navLinks(v, atual)}</nav>
    <form class="a-busca" action="/${v}/produtos/" role="search"><label class="sr" for="busca-topo">Buscar produto</label><input id="busca-topo" name="q" placeholder="O que deseja procurar?" autocomplete="off"><button type="submit">${ic('lupa')}<span>Procurar</span></button></form>
  </div>
  ${btnOrc(v)}
  <button class="menu-bt" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="b-cab"><div class="w">
  ${logo(v)}
  <nav class="b-menu" id="menu" aria-label="Principal">${navLinks(v, atual)}<a class="b-menu-wa" href="${waLink()}" ${ext}>${ic('wa')} ${E.celular}</a></nav>
  <div class="b-cab-d"><a class="b-tel" href="tel:${E.foneHref}">${ic('tel')}<span>${E.fone}</span></a>${btnOrc(v)}</div>
  <button class="menu-bt" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  const hor = E.horario.map(([d, h]) => `<li><span>${d}</span><b>${h}</b></li>`).join('');
  return `<footer class="rod rod-${v}">
<div class="w rod-g">
  <div class="rod-marca"><img src="/assets/logo.svg" alt="Madeireira Nobre" width="424" height="270" loading="lazy">
    <h3>Horário de atendimento</h3><ul class="rod-hor">${hor}</ul>
    <a class="rod-mapa" href="${E.mapa}" ${ext}>${ic('pin')} Acessar nossa localização</a></div>
  <div><h3>Acesso rápido</h3><ul class="rod-links">${nav.map(n => `<li><a href="/${v}/${n.caminho}">${n.nome}</a></li>`).join('')}</ul></div>
  <div><h3>Produtos</h3><ul class="rod-links rod-cols">${categorias.map(c => `<li><a href="${catUrl(v, c)}">${c.nome}</a></li>`).join('')}</ul></div>
  <div class="rod-cont"><h3>Entre em contato</h3>
    <ul class="rod-ct"><li><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></li><li><a href="${waLink()}" ${ext}>${ic('wa')} ${E.celular}</a></li><li><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></li><li>${ic('pin')}<span>${E.endereco}<br>${E.bairro} · ${E.cidade}</span></li></ul>
    <h3>Redes sociais</h3><p class="rod-redes">${redes()}</p></div>
</div>
<div class="rod-fim"><div class="w"><span>© Todos os direitos reservados à ${E.nomeCompleto}</span><span>Madeiras direto da serraria · desde ${E.fundacao}</span></div></div>
</footer>
<a class="wa-flut" href="${waLink()}" ${ext} aria-label="Falar no WhatsApp">${ic('wa')}</a>`;
}

const pagina = (v, slug, caminho, titulo, desc, corpo) => `${head(v, caminho, titulo, desc)}
<body class="v-${v} p-${slug}">
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>`;

const migalha = (v, trilha) => `<nav class="migalha" aria-label="Você está em"><a href="/${v}/">Home</a>${trilha.map(([n, h]) => h ? ` <span>/</span> <a href="${h}">${n}</a>` : ` <span>/</span> <b>${n}</b>`).join('')}</nav>`;

// ---------- blocos usados nas duas versões ----------
function produtoBloco(v, i, c) {
  const ficha = i.ficha;
  const sel = i.medidas ? `<label class="medida"><span>Medida</span><select><option value="">Escolha a medida</option>${i.medidas.map(m => `<option>${m}</option>`).join('')}</select></label>` : '';
  return `<article class="produto" id="${i.slug}" data-produto data-txt="${esc(sem(`${i.nome} ${c.nome} ${i.texto}`))}">
  <div class="produto-foto">${img(`item-${i.slug}`, i.nome)}</div>
  <div class="produto-txt">
    ${i.marca ? `<p class="produto-marca">${i.marca}${i.garantia ? ` · garantia de ${i.garantia}` : ''}</p>` : ''}
    <h2>${i.nome}</h2>
    <p>${i.texto}</p>
    <dl class="ficha">${ficha.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>
    ${i.medidas ? `<ul class="medidas">${i.medidas.map(m => `<li>${m}</li>`).join('')}</ul>` : ''}
    <div class="produto-acoes">${sel}<button class="btn" type="button" data-add="${esc(i.nome)}">${ic('mais')} Adicionar ao orçamento</button><a class="btn btn-wa" href="${waProduto(i.nome)}" ${ext}>${ic('wa')} Pedir no WhatsApp</a></div>
  </div>
</article>`;
}

function contatoForm(v) {
  return `<form class="orc" id="orcamento" data-orc data-mailto="${E.email}" data-assunto="Pedido de orçamento pelo site">
  <div class="orc-lista" data-orc-lista hidden><div class="orc-lista-t"><h3>Sua lista</h3><button type="button" class="link" data-orc-limpa>Limpar lista</button></div><ul></ul></div>
  <div class="orc-campos">
    <label><span>Nome</span><input name="Nome" required autocomplete="name"></label>
    <label><span>Telefone / WhatsApp</span><input name="Telefone" required inputmode="tel" autocomplete="tel"></label>
    <label><span>Cidade</span><input name="Cidade" autocomplete="address-level2"></label>
    <label><span>E-mail</span><input name="E-mail" type="email" autocomplete="email"></label>
    <label class="cheio"><span>Mensagem</span><textarea name="Mensagem" rows="4" placeholder="Medidas, quantidades, prazo da obra..."></textarea></label>
  </div>
  <div class="orc-env"><button class="btn btn-wa" type="button" data-wa="${E.wa}">${ic('wa')} Enviar pelo WhatsApp</button><button class="btn btn-sec" type="submit">${ic('mail')} Enviar por e-mail</button></div>
  <p class="nota">Sem compromisso. A lista fica salva só neste aparelho até você enviar.</p>
</form>`;
}

function calcForm() {
  return `<form class="calc" data-calc onsubmit="return false">
  <fieldset class="calc-tipo"><legend>O que você quer calcular?</legend>
    <label><input type="radio" name="tipo" value="ondulada" checked><span>Telha ondulada</span></label>
    <label><input type="radio" name="tipo" value="concreto"><span>Telha de concreto</span></label>
    <label><input type="radio" name="tipo" value="compensado"><span>Compensado</span></label>
  </fieldset>
  <div class="calc-campos">
    <label data-so="ondulada"><span>Largura do telhado (m)</span><input name="larg" inputmode="decimal" placeholder="ex.: 8"></label>
    <label data-so="ondulada"><span>Comprimento da água, do beiral à cumeeira (m)</span><input name="agua" inputmode="decimal" placeholder="ex.: 4,5"></label>
    <label data-so="ondulada"><span>Comprimento da telha</span><select name="comp">${['1.22', '1.53', '1.83', '2.13', '2.44', '3.05', '3.66'].map(c => `<option value="${c}"${c === '2.44' ? ' selected' : ''}>${c.replace('.', ',')} m</option>`).join('')}</select></label>
    <label data-so="ondulada"><span>Águas</span><select name="aguas"><option value="1">Uma água</option><option value="2">Duas águas</option></select></label>
    <label data-so="concreto compensado"><span>Área (m²)</span><input name="area" inputmode="decimal" placeholder="ex.: 60"></label>
    <label data-so="compensado"><span>Tipo de chapa</span><select name="chapa"><option>fenólico</option><option>plastificado</option></select></label>
  </div>
  <output class="calc-res" data-res aria-live="polite"></output>
  <button class="btn" type="button" data-calc-env disabled>${ic('mais')} Pôr na lista de orçamento</button>
  <p class="nota">Estimativa com as medidas das fichas: telha ondulada com largura útil de 1,05 m e recobrimento de 14 cm entre fileiras; telha de concreto com 10,5 peças por m²; compensado de 1,10 × 2,20 m (2,42 m²). Confirme as quantidades com a nossa equipe antes de comprar.</p>
</form>`;
}

const mapa = () => `<iframe class="mapa" src="${E.mapaEmbed}" title="Mapa: ${E.endereco}, ${E.cidade}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

// ===================================================== VERSÃO A =====================================================
function aHome() {
  const v = 'a';
  const hero = `<section class="a-hero" data-slides aria-label="Destaques">
  ${slides.map((s, n) => `<div class="slide${n ? '' : ' on'}">
    ${img(s.img, '', { w: 1920, h: 606, cls: 'slide-bg', lazy: n > 0 })}
    <div class="w slide-txt"><h2>${s.titulo}</h2><p class="slide-sub">${s.sub}</p><p class="slide-linha">${s.linha}</p>
    <a class="btn btn-claro" href="/${v}/produtos/${s.cat}/">Ver produtos ${ic('seta')}</a></div>
  </div>`).join('')}
  <div class="pts" aria-label="Escolher destaque">${slides.map((s, n) => `<button type="button"${n ? '' : ' aria-current="true"'} aria-label="${s.titulo}">0${n + 1}</button>`).join('')}</div>
</section>`;
  const sobreB = `<section class="a-sobre"><div class="w">
  <div class="a-sobre-foto">${img('empresa-montagem', 'Fachada da Madeireira Nobre em Maringá e caminhão carregado de madeira, com o selo de 18 anos', { w: 600, h: 630 })}</div>
  <div class="a-sobre-txt">
    <h1>Madeiras de <b>qualidade</b><br>direto da serraria</h1>${linhas()}
    ${sobre.texto.map(t => `<p>${t}</p>`).join('')}
    <ul class="a-check">${categorias.map(c => `<li><a href="${catUrl(v, c)}">${ic('ok')}${c.nome}</a></li>`).join('')}</ul>
  </div>
</div></section>`;
  const grade = `<section class="a-produtos"><div class="w">
  <div class="a-tit"><h2>Produtos em destaque</h2><a class="a-tag" href="/${v}/produtos/">Categorias de produtos</a></div>
  <ul class="a-grade">${categorias.map(c => `<li><a href="${catUrl(v, c)}"><span class="a-grade-foto">${img(`cat-${c.slug}`, c.nome, { w: 400, h: 400 })}</span><span class="a-grade-nome">${c.nome}</span></a></li>`).join('')}</ul>
</div></section>`;
  const obra = `<section class="a-obra"><div class="w">
  <div class="a-tit a-tit-c"><h2>Da fundação ao telhado</h2><p>Tudo o que a obra pede de madeira, telha e fixação, num lugar só.</p></div>
  <ol class="a-etapas">${etapas.map(e => {
    const cs = categorias.filter(c => c.etapa === e.id);
    return `<li><span class="a-etapa-n">${e.n}</span><h3>${e.nome}</h3><p>${e.texto}</p><div class="a-etapa-fotos">${cs.map(c => `<a href="${catUrl(v, c)}" title="${c.nome}">${img(`cat-${c.slug}`, c.nome, { w: 400, h: 400 })}</a>`).join('')}</div></li>`;
  }).join('')}</ol>
</div></section>`;
  const dep = `<section class="a-dep"><div class="w">
  <ul class="a-dep-l">${depoimentos.slice(0, 3).map(d => `<li><span class="estrelas" aria-label="5 estrelas">★★★★★</span><blockquote>${d.texto}</blockquote><p class="a-dep-n"><span aria-hidden="true">${d.nome.split(' ').map(x => x[0]).join('')}</span>${d.nome}</p></li>`).join('')}</ul>
</div></section>`;
  const visita = `<section class="a-visita"><div class="w">
  <div><h2>Venha conhecer o nosso pátio</h2><p>${E.endereco}<br>${E.bairro} · ${E.cidade}</p>
  <ul class="a-hor">${E.horario.map(([d, h]) => `<li>${ic('relogio')}<span>${d}</span><b>${h}</b></li>`).join('')}</ul>
  <p class="a-visita-bt"><a class="btn" href="${waLink()}" ${ext}>${ic('wa')} Pedir orçamento</a><a class="btn btn-sec" href="${E.mapa}" ${ext}>${ic('pin')} Como chegar</a></p></div>
  ${mapa()}
</div></section>`;
  return pagina(v, 'index', '', 'Madeireira Nobre Maringá · Madeiras direto da serraria', 'Vigas, caibros, ripões, tábuas, compensados, escoras, telhas e fixação em Maringá-PR. Madeira direto da serraria desde 2008.', hero + sobreB + grade + obra + dep + visita);
}

function aEmpresa() {
  const v = 'a';
  return pagina(v, 'empresa', 'empresa/', 'Empresa · Madeireira Nobre Maringá', sobre.texto[0], `<section class="a-pag-tit"><div class="w">${migalha(v, [['Empresa']])}<h1>Empresa</h1></div></section>
<section class="a-emp"><div class="w">
  <div class="a-emp-txt">
    <p class="a-emp-lead">A Madeireira Nobre atua no ramo de madeiras há mais de ${E.anos} anos. Fundada em ${E.fundacao}, vem se destacando pela qualidade das nossas madeiras, que vêm diretamente da serraria.</p>
    <p>${sobre.convite}</p>
    <blockquote class="a-lema">Madeiras direto da serraria,<br>qualidade e preço justo<br>aos nossos clientes.</blockquote>
    <h2>Trabalhamos com</h2>
    <ul class="a-check">${categorias.map(c => `<li><a href="${catUrl(v, c)}">${ic('ok')}${c.nome}</a></li>`).join('')}</ul>
    <p><a class="btn" href="${waLink()}" ${ext}>${ic('wa')} Faça um orçamento sem compromisso</a></p>
  </div>
  <div class="a-emp-fotos">
    <figure>${img('loja', 'Fachada da Madeireira Nobre na Av. Dr. Alexandre Rasgulaeff', { w: 356, h: 246 })}<figcaption>Nossa loja e pátio no Jardim Imperial</figcaption></figure>
    <figure>${img('caminhao', 'Caminhão carregado de madeira serrada', { w: 350, h: 218 })}<figcaption>Madeira chegando da serraria</figcaption></figure>
    <div class="a-selo"><b>${E.anos}</b><span>anos de<br>qualidade e<br>segurança</span></div>
  </div>
</div></section>
<section class="a-numeros"><div class="w">
  <div><b>${E.fundacao}</b><span>ano de fundação</span></div>
  <div><b>${categorias.length}</b><span>linhas de produto</span></div>
  <div><b>${todosItens.length}</b><span>itens no catálogo</span></div>
  <div><b>3</b><span>marcas de telha ondulada</span></div>
</div></section>`);
}

function aProdutos() {
  const v = 'a';
  return pagina(v, 'produtos', 'produtos/', 'Produtos · Madeireira Nobre Maringá', 'Catálogo: vigas, caibros, ripões, tábuas, compensados, estacas, escoras, telhas onduladas e de concreto, parafusos, pregos e arame.', `<section class="a-pag-tit"><div class="w">${migalha(v, [['Produtos']])}<h1>Produtos</h1></div></section>
<section class="a-cat"><div class="w">
  <div class="busca" data-busca><label for="busca">${ic('lupa')}<span class="sr">Buscar produto</span></label><input id="busca" placeholder="Buscar: viga, telha, prego..." autocomplete="off"></div>
  <ul class="a-grade">${categorias.map(c => `<li data-txt="${esc(sem(`${c.nome} ${c.curto} ${c.itens.map(i => i.nome).join(' ')}`))}"><a href="${catUrl(v, c)}"><span class="a-grade-foto">${img(`cat-${c.slug}`, c.nome, { w: 400, h: 400 })}</span><span class="a-grade-nome">${c.nome}</span><span class="a-grade-sub">${c.curto}</span></a></li>`).join('')}</ul>
  <p class="vazio" data-vazio hidden>Nenhum produto com esse nome. <a href="${waLink()}" ${ext}>Pergunte no WhatsApp</a>: talvez a gente tenha.</p>
</div></section>`);
}

function aCategoria(c) {
  const v = 'a';
  const outras = categorias.filter(o => o !== c);
  return pagina(v, 'produtos', `produtos/${c.slug}/`, `${c.nome} · Madeireira Nobre Maringá`, c.intro, `<section class="a-pag-tit"><div class="w">${migalha(v, [['Produtos', `/${v}/produtos/`], [c.nome]])}<h1>${c.nome}</h1><p>${c.intro}</p></div></section>
<section class="a-itens"><div class="w">
  ${c.comum ? `<div class="comum"><h2>Medidas das telhas onduladas (6 mm)</h2><dl class="ficha">${c.comum.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl><a class="link" href="/${v}/calcule/#ondulada">${ic('calc')} Calcular quantas telhas</a></div>` : ''}
  ${c.itens.map(i => produtoBloco(v, i, c)).join('')}
</div></section>
<section class="a-outras"><div class="w"><h2>Outras categorias</h2><ul>${outras.map(o => `<li><a href="${catUrl(v, o)}">${img(`cat-${o.slug}`, '', { w: 400, h: 400 })}<span>${o.nome}</span></a></li>`).join('')}</ul></div></section>`);
}

function aCalcule() {
  const v = 'a';
  return pagina(v, 'calcule', 'calcule/', 'Calcule · Madeireira Nobre Maringá', 'Estime quantas telhas onduladas, telhas de concreto ou chapas de compensado a sua obra precisa.', `<section class="a-pag-tit"><div class="w">${migalha(v, [['Calcule']])}<h1>Calcule a sua obra</h1><p>Uma estimativa rápida para chegar com a quantidade certa no orçamento.</p></div></section>
<section class="a-calc"><div class="w">${calcForm()}</div></section>`);
}

function aContato() {
  const v = 'a';
  return pagina(v, 'contato', 'contato/', 'Contato · Madeireira Nobre Maringá', `Fale com a Madeireira Nobre: ${E.fone}, WhatsApp ${E.celular}, ${E.endereco}, ${E.cidade}.`, `<section class="a-pag-tit"><div class="w">${migalha(v, [['Contato']])}<h1>Contato</h1><p>${sobre.convite}</p></div></section>
<section class="a-contato"><div class="w">
  <div class="a-contato-info">
    <h2>Entre em contato</h2>
    <p><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></p>
    <p><a href="${waLink()}" ${ext}>${ic('wa')} ${E.celular} (WhatsApp)</a></p>
    <p><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></p>
    <p>${ic('pin')} ${E.endereco}<br>${E.bairro} · ${E.cidade}</p>
    <h3>Horário de atendimento</h3>
    <ul class="a-hor">${E.horario.map(([d, h]) => `<li>${ic('relogio')}<span>${d}</span><b>${h}</b></li>`).join('')}</ul>
    ${mapa()}
  </div>
  <div><h2>Pedido de orçamento</h2>${contatoForm(v)}</div>
</div></section>`);
}

// ===================================================== VERSÃO B =====================================================
const pecas = [
  { cat: 'vigas', i: 0, rot: 'Viga', med: '5 × 10 cm' },
  { cat: 'caibros', i: 0, rot: 'Caibro', med: '5 × 5 cm' },
  { cat: 'ripoes', i: 0, rot: 'Ripão', med: '5 × 2,3 cm' },
  { cat: 'tabuas', i: 0, rot: 'Tábua', med: '30 × 2 cm', nota: 'também 10, 15, 20 e 25 cm' },
];

function bHome() {
  const v = 'b';
  const hero = `<section class="b-hero"><div class="w">
  <div class="b-hero-txt">
    <p class="eyebrow">Maringá · desde ${E.fundacao}</p>
    <h1>Madeira direto da serraria para a sua obra</h1>
    <p class="b-lead">Vigas, caibros, ripões e tábuas de eucalipto e pinus, compensados, escoras, telhas e fixação. Qualidade, confiança e preço justo há ${E.anos} anos.</p>
    <p class="b-hero-bt"><a class="btn" href="/${v}/produtos/">Ver produtos ${ic('seta')}</a><a class="btn btn-wa" href="${waLink()}" ${ext}>${ic('wa')} Orçamento no WhatsApp</a></p>
  </div>
  <figure class="b-hero-foto">${img('hero-vigas', 'Vigas de madeira serrada empilhadas', { w: 1920, h: 606, lazy: false })}<figcaption>${linhas()}<span>Vigas de eucalipto e pinus · 2 a 6 m</span></figcaption></figure>
</div>
<div class="w b-fatos">
  <div><b>${E.anos} anos</b><span>no ramo de madeiras</span></div>
  <div><b>${categorias.length} linhas</b><span>da fundação à cobertura</span></div>
  <div><b>Seg a qui 7h30–18h</b><span>sexta até 17h</span></div>
  <div><b>Jardim Imperial</b><span>Av. Dr. Alexandre Rasgulaeff, 4458</span></div>
</div></section>`;
  const bitolas = `<section class="b-bitolas"><div class="w">
  <div class="b-tit"><p class="eyebrow">Bitolas em escala</p><h2>Escolha a peça pela seção</h2><p>As medidas das peças serradas que a Nobre mantém no pátio, desenhadas na mesma escala.</p></div>
  <ul class="b-pecas">${pecas.map(p => { const c = categorias.find(x => x.slug === p.cat), it = c.itens[p.i]; return `<li><a href="${catUrl(v, c)}"><span class="b-peca-svg">${bitolaSvg(it.secao, it.madeira, 22)}</span><b>${p.rot}</b><span>${p.med}</span>${p.nota ? `<small>${p.nota}</small>` : ''}</a></li>`; }).join('')}</ul>
  <p class="b-bitolas-nota">${linhas()}Eucalipto em 2 a 6 m · pinus em 3 m</p>
</div></section>`;
  const abas = `<section class="b-etapas" data-abas><div class="w">
  <div class="b-tit"><p class="eyebrow">Por etapa da obra</p><h2>O que você está construindo agora?</h2></div>
  <div class="b-abas" role="tablist">${etapas.map((e, n) => `<button role="tab" id="t-${e.id}" aria-controls="p-${e.id}" aria-selected="${!n}"><span>${e.n}</span>${e.nome}</button>`).join('')}</div>
  ${etapas.map((e, n) => `<div class="b-painel" role="tabpanel" id="p-${e.id}" aria-labelledby="t-${e.id}"${n ? ' hidden' : ''}>
    <p class="b-painel-txt">${e.texto}</p>
    <ul class="b-linhas">${categorias.filter(c => c.etapa === e.id).map(c => `<li><a href="${catUrl(v, c)}">${img(`cat-${c.slug}`, '', { w: 400, h: 400 })}<span><b>${c.nome}</b><small>${c.curto}</small></span>${ic('seta')}</a></li>`).join('')}</ul>
  </div>`).join('')}
</div></section>`;
  const tel = categorias.find(c => c.slug === 'telhas-onduladas');
  const telhas = `<section class="b-telhas"><div class="w">
  <div class="b-telhas-foto">${img('hero-telhas', 'Telha ondulada de fibrocimento', { w: 1920, h: 606 })}</div>
  <div class="b-telhas-txt">
    <p class="eyebrow eyebrow-claro">Cobertura</p><h2>Três marcas de telha ondulada, sete comprimentos</h2>
    <table class="b-marcas"><thead><tr><th>Marca</th><th>Garantia</th><th>Destaque</th></tr></thead><tbody>
      <tr><td>Brasilit</td><td>10 anos</td><td>CRFS, sem amianto</td></tr>
      <tr><td>Eternit</td><td>5 anos</td><td>Rapidez na obra</td></tr>
      <tr><td>Infibra</td><td>5 anos</td><td>Superfibra, fácil montagem</td></tr>
    </tbody></table>
    <ul class="b-comps">${['1,22', '1,53', '1,83', '2,13', '2,44', '3,05', '3,66'].map(c => `<li>${c} m</li>`).join('')}</ul>
    <p class="b-telhas-bt"><a class="btn btn-claro" href="${catUrl(v, tel)}">Fichas das telhas</a><a class="btn btn-borda" href="/${v}/calcule/">${ic('calc')} Calcular quantidade</a></p>
  </div>
</div></section>`;
  const emp = `<section class="b-emp"><div class="w">
  <div class="b-emp-fotos">${img('loja', 'Fachada da Madeireira Nobre', { w: 356, h: 246, cls: 'f1' })}${img('caminhao', 'Caminhão carregado de madeira serrada', { w: 350, h: 218, cls: 'f2' })}</div>
  <div class="b-emp-txt"><p class="eyebrow">A empresa</p><h2>Fundada em ${E.fundacao}, no mesmo endereço do Jardim Imperial</h2>
  <p>${sobre.texto[1]}</p>
  <blockquote>“${depoimentos[0].texto}”<cite>${depoimentos[0].nome}</cite></blockquote>
  <a class="link" href="/${v}/empresa/">Conheça a Nobre ${ic('seta')}</a></div>
</div></section>`;
  const fim = `<section class="b-fim"><div class="w">
  <div><h2>Monte a lista da sua obra e receba o orçamento</h2><p>Adicione os produtos, informe as quantidades e envie pelo WhatsApp. Sem compromisso.</p>
  <p class="b-hero-bt"><a class="btn" href="/${v}/contato/#orcamento">${ic('lista')} Abrir lista de orçamento</a><a class="btn btn-sec" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></p></div>
  ${mapa()}
</div></section>`;
  return pagina(v, 'index', '', 'Madeireira Nobre Maringá · Madeira direto da serraria', 'Vigas, caibros, ripões, tábuas, compensados, escoras, telhas e fixação em Maringá-PR, desde 2008.', hero + bitolas + abas + telhas + emp + fim);
}

function bEmpresa() {
  const v = 'b';
  return pagina(v, 'empresa', 'empresa/', 'Empresa · Madeireira Nobre Maringá', sobre.texto[0], `<section class="b-pag-tit"><div class="w">${migalha(v, [['Empresa']])}<p class="eyebrow">Desde ${E.fundacao}</p><h1>Madeiras direto da serraria, qualidade e preço justo</h1></div></section>
<section class="b-emp b-emp-pag"><div class="w">
  <div class="b-emp-fotos">${img('loja', 'Fachada da Madeireira Nobre', { w: 356, h: 246, cls: 'f1' })}${img('caminhao', 'Caminhão carregado de madeira serrada', { w: 350, h: 218, cls: 'f2' })}</div>
  <div class="b-emp-txt">
    <p class="b-lead">A Madeireira Nobre atua no ramo de madeiras há mais de ${E.anos} anos. Fundada em ${E.fundacao}, vem se destacando pela qualidade das nossas madeiras, que vêm diretamente da serraria.</p>
    <p>${sobre.convite}</p>
  </div>
</div></section>
<section class="b-valores"><div class="w">
  <div><span class="b-v-n">01</span><h3>Qualidade</h3><p>Madeira serrada escolhida na origem, direto da serraria.</p></div>
  <div><span class="b-v-n">02</span><h3>Confiança</h3><p>${E.anos} anos atendendo obras de Maringá e região no mesmo endereço.</p></div>
  <div><span class="b-v-n">03</span><h3>Preço justo</h3><p>Sem intermediário entre a serraria e o seu canteiro.</p></div>
</div></section>
<section class="b-linha-tempo"><div class="w">
  <div class="b-tit"><p class="eyebrow">Trabalhamos com</p><h2>Da fundação ao telhado</h2></div>
  <ol>${etapas.map(e => `<li><span>${e.n}</span><h3>${e.nome}</h3><p>${categorias.filter(c => c.etapa === e.id).map(c => `<a href="${catUrl(v, c)}">${c.nome}</a>`).join(' · ')}</p></li>`).join('')}</ol>
</div></section>
<section class="b-dep"><div class="w"><ul>${depoimentos.slice(1, 4).map(d => `<li><blockquote>“${d.texto}”</blockquote><cite>${d.nome}</cite></li>`).join('')}</ul></div></section>`);
}

function bProdutos() {
  const v = 'b';
  return pagina(v, 'produtos', 'produtos/', 'Produtos · Madeireira Nobre Maringá', 'Catálogo completo de madeiras, telhas e fixação da Madeireira Nobre em Maringá.', `<section class="b-pag-tit"><div class="w">${migalha(v, [['Produtos']])}<p class="eyebrow">${todosItens.length} itens em ${categorias.length} linhas</p><h1>Produtos</h1></div></section>
<section class="b-cat"><div class="w">
  <div class="busca" data-busca><label for="busca">${ic('lupa')}<span class="sr">Buscar produto</span></label><input id="busca" placeholder="Buscar: viga, telha, prego..." autocomplete="off"></div>
  ${etapas.map(e => `<div class="b-cat-grupo"><h2><span>${e.n}</span>${e.nome}</h2><ul class="b-linhas">${categorias.filter(c => c.etapa === e.id).map(c => `<li data-txt="${esc(sem(`${c.nome} ${c.curto} ${c.itens.map(i => i.nome).join(' ')}`))}"><a href="${catUrl(v, c)}">${img(`cat-${c.slug}`, '', { w: 400, h: 400 })}<span><b>${c.nome}</b><small>${c.itens.map(i => i.nome).join(' · ')}</small></span>${ic('seta')}</a></li>`).join('')}</ul></div>`).join('')}
  <p class="vazio" data-vazio hidden>Nenhum produto com esse nome. <a href="${waLink()}" ${ext}>Pergunte no WhatsApp</a>: talvez a gente tenha.</p>
</div></section>`);
}

function bCategoria(c) {
  const v = 'b';
  const e = etapas.find(x => x.id === c.etapa);
  const madeira = c.itens.filter(i => i.secao);
  return pagina(v, 'produtos', `produtos/${c.slug}/`, `${c.nome} · Madeireira Nobre Maringá`, c.intro, `<section class="b-pag-tit"><div class="w">${migalha(v, [['Produtos', `/${v}/produtos/`], [c.nome]])}<p class="eyebrow">${e.n} · ${e.nome}</p><h1>${c.nome}</h1><p class="b-lead">${c.intro}</p>
  ${madeira.length ? `<div class="b-cat-bitolas">${madeira.map(i => `<span>${bitolaSvg(i.secao, i.madeira, 12)}<small>${i.madeira}</small></span>`).join('')}</div>` : ''}</div></section>
<section class="b-itens"><div class="w">
  ${c.comum ? `<div class="comum"><h2>Medidas comuns às três marcas (6 mm)</h2><dl class="ficha">${c.comum.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl><a class="link" href="/${v}/calcule/#ondulada">${ic('calc')} Calcular quantas telhas</a></div>` : ''}
  ${c.itens.map(i => produtoBloco(v, i, c)).join('')}
</div></section>
<section class="b-outras"><div class="w"><h2>Mais da mesma etapa</h2><ul class="b-linhas">${categorias.filter(o => o !== c && o.etapa === c.etapa).concat(categorias.filter(o => o.etapa !== c.etapa).slice(0, 2)).slice(0, 4).map(o => `<li><a href="${catUrl(v, o)}">${img(`cat-${o.slug}`, '', { w: 400, h: 400 })}<span><b>${o.nome}</b><small>${o.curto}</small></span>${ic('seta')}</a></li>`).join('')}</ul></div></section>`);
}

function bCalcule() {
  const v = 'b';
  return pagina(v, 'calcule', 'calcule/', 'Calcule · Madeireira Nobre Maringá', 'Estime quantas telhas onduladas, telhas de concreto ou chapas de compensado a sua obra precisa.', `<section class="b-pag-tit"><div class="w">${migalha(v, [['Calcule']])}<p class="eyebrow">Estimativa rápida</p><h1>Quantas telhas, quantas chapas?</h1></div></section>
<section class="b-calc"><div class="w">${calcForm()}</div></section>`);
}

function bContato() {
  const v = 'b';
  return pagina(v, 'contato', 'contato/', 'Contato · Madeireira Nobre Maringá', `Fale com a Madeireira Nobre: ${E.fone}, WhatsApp ${E.celular}, ${E.endereco}, ${E.cidade}.`, `<section class="b-pag-tit"><div class="w">${migalha(v, [['Contato']])}<p class="eyebrow">Orçamento sem compromisso</p><h1>Contato</h1></div></section>
<section class="b-contato"><div class="w">
  <div>${contatoForm(v)}</div>
  <aside class="b-contato-info">
    <a class="b-ct" href="${waLink()}" ${ext}>${ic('wa')}<span><small>WhatsApp</small>${E.celular}</span></a>
    <a class="b-ct" href="tel:${E.foneHref}">${ic('tel')}<span><small>Telefone</small>${E.fone}</span></a>
    <a class="b-ct" href="mailto:${E.email}">${ic('mail')}<span><small>E-mail</small>${E.email}</span></a>
    <a class="b-ct" href="${E.mapa}" ${ext}>${ic('pin')}<span><small>Endereço</small>${E.endereco}, ${E.bairro}, ${E.cidade}</span></a>
    <div class="b-ct">${ic('relogio')}<span><small>Horário</small>${E.horario.map(([d, h]) => `${d}: ${h}`).join('<br>')}</span></div>
    ${mapa()}
  </aside>
</div></section>`);
}

export function gerarVersao(v) {
  const p = {};
  if (v === 'a') {
    p.index = aHome(); p.empresa = aEmpresa(); p.produtos = aProdutos(); p.calcule = aCalcule(); p.contato = aContato();
    for (const c of categorias) p[`produtos/${c.slug}`] = aCategoria(c);
  } else {
    p.index = bHome(); p.empresa = bEmpresa(); p.produtos = bProdutos(); p.calcule = bCalcule(); p.contato = bContato();
    for (const c of categorias) p[`produtos/${c.slug}`] = bCategoria(c);
  }
  return p;
}
