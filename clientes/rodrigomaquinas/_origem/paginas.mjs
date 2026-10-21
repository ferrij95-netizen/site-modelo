// Monta as páginas das versões A ("Pátio": fiel ao site atual, faixa azul-clara do menu, logo oval, menu de categorias à esquerda,
// vitrine com a barra azul-marinho "Máquinas" e preço em vermelho) e B ("Estoque": lista de estoque com filtros, linha do tempo
// dos anos, comparativo por tipo). Estilos em public/assets/{base,a,b}.css.
import { empresa as E, sobre, marcasTexto, segmentos, tipos, categoriasSite, maquinas, preco, precoCurto } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const tipo = s => tipos.find(t => t.slug === s);
const doTipo = s => maquinas.filter(m => m.tipo === s);
const porPreco = [...maquinas].sort((a, b) => b.valor - a.valor);

export const nomesVersao = { a: 'Pátio', b: 'Estoque' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'Sobre a empresa', caminho: 'empresa/' },
  { slug: 'maquinas', nome: 'Máquinas', caminho: 'maquinas/' },
  { slug: 'contato', nome: 'Fale conosco', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  volta: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  zoom: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M11 8v6M8 11h6"/>',
  troca: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
  compra: '<path d="M3 4h2l2.5 11h11L21 7H7"/><circle cx="9" cy="19" r="1.5"/><circle cx="18" cy="19" r="1.5"/>',
  venda: '<path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  brasil: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
  cam: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const soDig = s => s.replace(/\D/g, '');
const telLink = (s, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="tel:+55${soDig(s)}">${s}</a>`;
const logo = (cls = 'logo') => `<img class="${cls}" src="/assets/logo.png" alt="Rodrigo Máquinas, comércio de máquinas pesadas" width="283" height="165">`;
const foto = (m, i = 1, cls = '', p = true, lazy = true) => `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/maq/${m.id}-${i}${p ? '-p' : ''}.webp" alt="${esc(`${m.nome} ${m.ano}${i > 1 ? `, foto ${i}` : ''}`)}" width="${p ? 480 : 800}" height="${p ? 360 : 600}"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
const link = (v, m) => `/${v}/maquinas/${m.slug}/`;
const querLink = (v, m) => `/${v}/contato/?maquina=${m.id}#formulario`;

function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
  const fonte = v === 'a' ? 'Alegreya:wght@700;800' : 'Alegreya+Sans:wght@500;700;800';
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
<meta name="theme-color" content="${v === 'a' ? '#00a5f3' : '#34475f'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${fonte}&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const menu = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');
const zoomDlg = '<dialog class="zoom" data-zoom-dlg><img src="" alt=""><button type="button" class="zoom-x" aria-label="Fechar" onclick="this.closest(\'dialog\').close()">×</button></dialog>';

// ================= VERSÃO A · PÁTIO =================
function topoA(atual) {
  return `<body class="va">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="a-topo">
  <div class="a-faixa"><div class="cx a-faixa-in">
    <nav id="menu" class="a-menu" aria-label="Principal">${menu('a', atual)}</nav>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu">${ic('menu')}<span>Menu</span></button>
    <span class="a-faixa-tel">${ic('tel')} ${telLink(E.tels[0])}</span>
  </div></div>
  <div class="cx a-cab">
    <a href="/a/" class="a-logo">${logo()}</a>
    <div class="a-cab-dir">
      <form class="a-busca" action="/a/maquinas/" role="search">
        <label for="busca-a">Digite aqui o que você deseja encontrar:</label>
        <div><input id="busca-a" name="q" type="search" placeholder="Ex.: retroescavadeira"><button type="submit">${ic('busca')}<span>Buscar</span></button></div>
      </form>
      <address class="a-endereco">
        <strong>${E.rua}</strong><span>${E.bairro} · ${E.cidade} · CEP ${E.cep}</span>
        <span>${ic('tel')} ${E.tels.map(t => telLink(t)).join(' · ')}</span>
        <span>${ic('mail')} <a href="mailto:${E.email}">${E.email}</a></span>
      </address>
    </div>
  </div>
</header>
<main id="conteudo">`;
}

function rodapeA() {
  return `</main>
<footer class="a-rodape">
  <div class="cx a-rodape-in">
    <div>${logo('logo-rod')}</div>
    <div><h2>${E.nome} · ${E.sub}</h2><p>${E.rua}<br>${E.bairro} · ${E.cidade}<br>CEP ${E.cep}</p></div>
    <div><p>${ic('tel')} ${telLink(E.tels[0])}<br>${ic('tel')} ${telLink(E.tels[1])}<br>${ic('mail')} <a href="mailto:${E.email}">${E.email}</a></p></div>
    <nav aria-label="Rodapé">${menu('a', '')}</nav>
  </div>
  <p class="cx a-copy">© ${new Date().getFullYear()} ${E.nome}. Compra, venda e troca de máquinas pesadas em todo o território nacional.</p>
</footer>
${zoomDlg}
</body>
</html>`;
}

function lateralA(atualTipo = '') {
  const comEstoque = new Map([['Caminhões', 'caminhoes'], ['Escavadeira', 'escavadeiras'], ['Motoniveladora', 'motoniveladoras'], ['Pá carregadeira', 'pas-carregadeiras'], ['Retroescavadeiras', 'retroescavadeiras'], ['Rolocompactador', 'rolos-compactadores']]);
  const itens = categoriasSite.map(c => {
    const s = comEstoque.get(c);
    if (!s) return `<li class="vazia"><span>${c}</span><small>sob consulta</small></li>`;
    return `<li><a href="/a/maquinas/?tipo=${s}"${s === atualTipo ? ' aria-current="true"' : ''} data-filtro-tipo="${s}"><span>${c}</span><b>${doTipo(s).length}</b></a></li>`;
  }).join('');
  const marcas = [...new Set(maquinas.map(m => m.marca))].sort();
  return `<aside class="a-lateral">
  <section class="a-cat"><h2>Categorias</h2><ul>${itens}</ul></section>
  <section class="a-cat a-marcas"><h2>Marcas no pátio</h2><ul>${marcas.map(mc => `<li><a href="/a/maquinas/?q=${encodeURIComponent(mc)}"><span>${mc}</span><b>${maquinas.filter(m => m.marca === mc).length}</b></a></li>`).join('')}</ul></section>
</aside>`;
}

const pecaA = (m, lazy = true) => `<li class="a-peca" data-tipo="${m.tipo}" data-txt="${esc(`${m.nome} ${m.ano} ${m.marca}`.toLowerCase())}">
  <a href="${link('a', m)}">
    <span class="a-peca-foto">${foto(m, 1, '', true, lazy)}</span>
    <span class="a-peca-tipo">${m.tipoNome}</span>
    <strong>${m.curto}</strong>
    <span class="a-peca-ano">${m.ano}</span>
    <span class="a-preco">${preco(m.valor)}</span>
  </a>
</li>`;

function inicioA() {
  const slides = [1, 3, 4, 5, 2];
  return head('a', '', `${E.nome} · Comércio de máquinas pesadas em Porto Alegre`, 'Compra, venda e troca de retroescavadeiras, escavadeiras, motoniveladoras, pás carregadeiras, rolos e caminhões. Pátio na Av. Sertório, 5600, Porto Alegre.') + topoA('index') + `
<section class="cx a-palco">
  <div class="a-slider" data-slider>
    ${slides.map((n, k) => `<img src="/assets/img/empresa/patio-${n}.webp" alt="Vista aérea do pátio da Rodrigo Máquinas na Avenida Sertório" width="748" height="421"${k ? ' loading="lazy"' : ' fetchpriority="high"'} class="${k ? '' : 'on'}" data-slide>`).join('')}
    <div class="a-palco-txt">
      <p class="a-selo">${E.sub}</p>
      <h1>Compra, venda e troca de máquinas pesadas</h1>
      <p>Retroescavadeiras, escavadeiras, motoniveladoras, pás carregadeiras, rolos e caminhões no pátio da Avenida Sertório, em Porto Alegre.</p>
      <div class="a-palco-bt"><a class="bt bt-a" href="/a/maquinas/">Ver as ${maquinas.length} máquinas ${ic('seta')}</a><a class="bt bt-claro" href="/a/contato/?assunto=vender#formulario">Quero vender ou trocar</a></div>
    </div>
    <div class="a-pontos" role="tablist" aria-label="Fotos do pátio">${slides.map((_, k) => `<button role="tab" aria-label="Foto ${k + 1}" aria-selected="${k === 0}" data-ir="${k}"></button>`).join('')}</div>
  </div>
</section>

<div class="cx a-grade">
  ${lateralA()}
  <div class="a-principal">
    <section class="a-vitrine">
      <h2 class="a-barra">Máquinas</h2>
      <ul class="a-pecas">${maquinas.slice(0, 12).map(m => pecaA(m)).join('')}</ul>
      <p class="a-mais"><a class="bt bt-a" href="/a/maquinas/">Lista completa de máquinas (${maquinas.length}) ${ic('seta')}</a></p>
    </section>

    <section class="a-servicos">
      <h2 class="a-barra">Como trabalhamos</h2>
      <div class="a-tres">
        <div>${ic('venda', 'ic ic-g')}<h3>Vendemos</h3><p>Máquinas de diversas marcas e modelos, prontas para ver no pátio, com fotos e preço no site.</p></div>
        <div>${ic('compra', 'ic ic-g')}<h3>Compramos</h3><p>Avaliamos a sua máquina, caminhão ou empilhadeira e fazemos a proposta de compra.</p></div>
        <div>${ic('troca', 'ic ic-g')}<h3>Trocamos</h3><p>Sua máquina entra como parte do pagamento de outra do nosso estoque.</p></div>
      </div>
      <p class="a-nacional">${ic('brasil')} Vendemos, compramos e trocamos em todo o território nacional.</p>
    </section>
  </div>
</div>

<section class="a-marcas-faixa">
  <div class="cx">
    <h2>Trabalhamos com várias marcas conceituadas</h2>
    <ul>${marcasTexto.map(m => `<li>${m}</li>`).join('')}<li class="e-outras">e outras</li></ul>
  </div>
</section>

<section class="cx a-visita">
  <figure><img src="/assets/img/empresa/patio-4.webp" alt="Pátio da Rodrigo Máquinas visto do alto, com as máquinas enfileiradas" width="748" height="421" loading="lazy"></figure>
  <div>
    <h2>Faça-nos uma visita</h2>
    <p>Conheça as nossas máquinas pelo site ou venha ao pátio. Estamos na Avenida Sertório, no Jardim Lindóia, com as máquinas à vista da avenida.</p>
    <address><strong>${E.rua}</strong><br>${E.bairro} · ${E.cidade} · CEP ${E.cep}</address>
    <p class="a-visita-bt"><a class="bt bt-a" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Como chegar</a> ${telLink(E.tels[0], 'bt bt-linha')}</p>
  </div>
</section>` + rodapeA();
}

function maquinasA() {
  return head('a', 'maquinas/', `Máquinas à venda · ${E.nome}`, `Lista completa: ${maquinas.length} máquinas pesadas à venda em Porto Alegre, com ano, marca, modelo e preço.`) + topoA('maquinas') + `
<div class="cx a-grade a-grade-int">
  ${lateralA()}
  <div class="a-principal">
    <nav class="trilha" aria-label="Você está em"><a href="/a/">Início</a> › <span>Máquinas</span></nav>
    <section class="a-vitrine">
      <h1 class="a-barra">Lista completa de máquinas</h1>
      <div class="a-filtro"><p data-contagem>${maquinas.length} máquinas</p>
        <label>Ordenar <select data-ordem><option value="">Mais recentes no site</option><option value="preco-">Menor preço</option><option value="preco+">Maior preço</option><option value="ano+">Ano mais novo</option><option value="ano-">Ano mais antigo</option></select></label>
        <button type="button" class="a-limpa" data-limpa hidden>Ver todas</button>
      </div>
      <ul class="a-pecas" data-lista>${maquinas.map(m => pecaA(m).replace('<li class="a-peca"', `<li class="a-peca" data-preco="${m.valor}" data-ano="${m.ano}"`)).join('')}</ul>
      <p class="sem-res" data-sem-res hidden>Nenhuma máquina com esse filtro no pátio agora. <a href="/a/contato/#formulario">Pergunte pela máquina que você procura</a>: compramos e trocamos todos os dias.</p>
    </section>
  </div>
</div>` + rodapeA();
}

function galeria(v, m) {
  return `<div class="gal" data-galeria>
  <button type="button" class="gal-princ" data-zoom="/assets/img/maq/${m.id}-1.webp" aria-label="Ampliar foto">${foto(m, 1, '', false, false)}<span class="gal-lupa">${ic('zoom')}</span></button>
  <div class="gal-mini">${[1, 2, 3, 4].map(i => `<button type="button" data-foto="/assets/img/maq/${m.id}-${i}.webp" aria-current="${i === 1}">${foto(m, i)}</button>`).join('')}</div>
</div>`;
}

function maquinaA(m) {
  const outras = maquinas.filter(o => o !== m).sort((a, b) => (b.tipo === m.tipo) - (a.tipo === m.tipo)).slice(0, 4);
  return head('a', `maquinas/${m.slug}/`, `${m.nome} ${m.ano} · ${E.nome}`, `${m.nome}, ano ${m.ano}, ${preco(m.valor)}. Pátio na Av. Sertório, 5600, Porto Alegre.`) + topoA('maquinas') + `
<div class="cx a-grade a-grade-int">
  ${lateralA(m.tipo)}
  <div class="a-principal">
    <nav class="trilha" aria-label="Você está em"><a href="/a/">Início</a> › <a href="/a/maquinas/?tipo=${m.tipo}">${tipo(m.tipo).nome}</a> › <span>${m.curto}</span></nav>
    <article class="a-ficha">
      <h1 class="a-barra">${m.nome}</h1>
      <div class="a-ficha-grade">
        ${galeria('a', m)}
        <div class="a-destaque">
          <dl><dt>Ano</dt><dd>${m.ano}</dd><dt>Modelo</dt><dd>${m.modelo}${m.tracao ? ` ${m.tracao}` : ''}</dd><dt>Marca</dt><dd>${m.marca}</dd><dt>Tipo</dt><dd>${m.tipoNome}${m.implemento ? ` (${m.implemento.toLowerCase()})` : ''}</dd></dl>
          <p class="a-valor">${preco(m.valor)}</p>
          <a class="bt bt-quero" href="${querLink('a', m)}">Quero esta máquina ${ic('seta')}</a>
          <div class="a-destaque-end">
            <strong>${E.nome} · ${E.sub}</strong>
            <span>${E.rua} · ${E.bairro} · ${E.cidade}</span>
            <span>${ic('tel')} ${telLink(E.tels[0])} · ${telLink(E.tels[1])}</span>
            <span>${ic('mail')} <a href="mailto:${E.email}?subject=${encodeURIComponent(`${m.nome} ${m.ano}`)}">${E.email}</a></span>
          </div>
          <p class="a-troca">${ic('troca')} Aceitamos sua máquina na troca.</p>
        </div>
      </div>
    </article>
    <section class="a-vitrine a-outras">
      <h2 class="a-barra">Outras máquinas</h2>
      <ul class="a-pecas a-pecas-4">${outras.map(o => pecaA(o)).join('')}</ul>
    </section>
  </div>
</div>` + rodapeA();
}

function empresaA() {
  return head('a', 'empresa/', `Sobre a empresa · ${E.nome}`, 'Compra, venda e troca de máquinas para terraplenagem, pavimentação, escavações, perfurações e ar comprimido, caminhões e empilhadeiras.') + topoA('empresa') + `
<div class="cx a-grade a-grade-int">
  ${lateralA()}
  <div class="a-principal">
    <nav class="trilha" aria-label="Você está em"><a href="/a/">Início</a> › <span>Sobre a empresa</span></nav>
    <article class="a-sobre">
      <h1 class="a-barra">Sobre a empresa</h1>
      <figure class="a-sobre-capa"><img src="/assets/img/empresa/patio-1.webp" alt="Vista aérea do pátio da Rodrigo Máquinas na Avenida Sertório" width="748" height="421"></figure>
      <div class="a-sobre-txt">${sobre.map(p => `<p>${p}</p>`).join('')}</div>
      <h2 class="a-sub">Segmentos que atendemos</h2>
      <ul class="a-segs">${segmentos.map(s => `<li>${ic('ok')} ${s}</li>`).join('')}</ul>
      <h2 class="a-sub">O pátio</h2>
      <div class="a-fotos">${[2, 3, 4, 5].map(n => `<button type="button" data-zoom="/assets/img/empresa/patio-${n}.webp" aria-label="Ampliar foto do pátio"><img src="/assets/img/empresa/patio-${n}.webp" alt="Pátio da Rodrigo Máquinas visto do alto" width="748" height="421" loading="lazy"></button>`).join('')}</div>
      <p class="a-mais"><a class="bt bt-a" href="/a/maquinas/">Ver as máquinas ${ic('seta')}</a> <a class="bt bt-linha" href="/a/contato/">Fale conosco</a></p>
    </article>
  </div>
</div>` + rodapeA();
}

function formulario(v) {
  return `<form class="form" data-form>
  <fieldset class="form-assunto"><legend>Assunto</legend>
    <label><input type="radio" name="assunto" value="comprar" checked> Quero comprar</label>
    <label><input type="radio" name="assunto" value="vender"> Quero vender</label>
    <label><input type="radio" name="assunto" value="trocar"> Quero trocar</label>
  </fieldset>
  <label class="form-maq">Máquina de interesse
    <select name="maquina"><option value="">Escolha (opcional)</option>${maquinas.map(m => `<option value="${m.id}">${esc(`${m.nome} · ${m.ano} · ${preco(m.valor)}`)}</option>`).join('')}</select>
  </label>
  <div class="form-2"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>E-mail<input name="email" type="email" autocomplete="email"></label>
  <div class="form-2"><label>Cidade<input name="cidade" autocomplete="address-level2"></label><label>Estado<input name="estado" maxlength="2" placeholder="RS" autocomplete="address-level1"></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Conte o que procura, ou a marca, o modelo e o ano da máquina que quer vender ou trocar."></textarea></label>
  <button class="bt ${v === 'a' ? 'bt-a' : 'bt-b'}" type="submit">Enviar pelo e-mail ${ic('seta')}</button>
  <p class="form-nota">O botão abre o seu e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;
}

function contatoA() {
  return head('a', 'contato/', `Fale conosco · ${E.nome}`, `Telefones ${E.tels.join(' e ')}, ${E.email}. ${E.rua}, ${E.bairro}, ${E.cidade}.`) + topoA('contato') + `
<div class="cx a-grade a-grade-int">
  ${lateralA()}
  <div class="a-principal">
    <nav class="trilha" aria-label="Você está em"><a href="/a/">Início</a> › <span>Fale conosco</span></nav>
    <h1 class="a-barra">Fale conosco</h1>
    <div class="a-contato">
      <section id="formulario"><h2 class="a-sub">Formulário de contato</h2>${formulario('a')}</section>
      <section class="a-contato-info">
        <h2 class="a-sub">${E.nome}</h2>
        <p>${E.sub}</p>
        <address>${E.rua}<br>${E.bairro} · ${E.cidade}<br>CEP ${E.cep}</address>
        <p class="a-contato-tels">${E.tels.map(t => `${ic('tel')} ${telLink(t)}`).join('<br>')}<br>${ic('mail')} <a href="mailto:${E.email}">${E.email}</a></p>
        <iframe class="mapa" src="${E.mapaEmbed}" title="Mapa: ${E.rua}, ${E.cidade}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </section>
    </div>
  </div>
</div>` + rodapeA();
}

// ================= VERSÃO B · ESTOQUE =================
function topoB(atual) {
  return `<body class="vb">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="b-topo">
  <div class="cx b-topo-in">
    <a href="/b/" class="b-logo">${logo()}<span><strong>${E.nome}</strong><small>${E.sub}</small></span></a>
    <nav id="menu" class="b-menu" aria-label="Principal">${menu('b', atual)}<a class="b-menu-cta" href="/b/contato/?assunto=trocar#formulario">${ic('troca')} Avaliar minha máquina</a></nav>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu">${ic('menu')}<span>Menu</span></button>
  </div>
  <div class="b-linha"><div class="cx"><span>${ic('pin')} ${E.rua} · ${E.bairro} · ${E.cidade}</span><span>${ic('tel')} ${telLink(E.tels[0])} · ${telLink(E.tels[1])}</span></div></div>
</header>
<main id="conteudo">`;
}

function rodapeB() {
  return `</main>
<footer class="b-rodape">
  <div class="cx b-rodape-in">
    <div class="b-rodape-marca">${logo('logo-rod')}<p>Compra, venda e troca de máquinas pesadas em todo o território nacional.</p></div>
    <div><h2>Pátio</h2><p>${E.rua}<br>${E.bairro} · ${E.cidade}<br>CEP ${E.cep}</p><p><a href="${E.mapa}" target="_blank" rel="noopener">Abrir no mapa ${ic('seta')}</a></p></div>
    <div><h2>Contato</h2><p>${telLink(E.tels[0])}<br>${telLink(E.tels[1])}<br><a href="mailto:${E.email}">${E.email}</a></p></div>
    <div><h2>Estoque</h2><ul>${tipos.map(t => `<li><a href="/b/maquinas/?tipo=${t.slug}">${t.nome} <small>${doTipo(t.slug).length}</small></a></li>`).join('')}</ul></div>
  </div>
  <p class="cx b-copy">© ${new Date().getFullYear()} ${E.nome} · ${E.sub}</p>
</footer>
${zoomDlg}
</body>
</html>`;
}

const anos = maquinas.map(m => m.ano), anoMin = Math.min(...anos), anoMax = Math.max(...anos);

function linhaTempo() {
  const de = 1978, ate = 2016, pos = a => ((a - de) / (ate - de) * 100).toFixed(2);
  const porAno = {};
  const pontos = [...maquinas].sort((a, b) => a.ano - b.ano).map(m => {
    const n = porAno[m.ano] = (porAno[m.ano] || 0) + 1;
    return `<a class="lt-ponto t-${m.tipo}" href="${link('b', m)}" style="left:${pos(m.ano)}%;--n:${n - 1}" aria-label="${esc(`${m.nome}, ${m.ano}, ${preco(m.valor)}`)}"><span class="lt-dica">${foto(m, 1)}<b>${esc(m.curto)}</b><small>${m.ano} · ${precoCurto(m.valor)}</small></span></a>`;
  }).join('');
  const marcas = [1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015].map(a => `<span style="left:${pos(a)}%">${a}</span>`).join('');
  return `<div class="lt" data-rev>
  <div class="lt-trilho">${pontos}</div>
  <div class="lt-eixo">${marcas}</div>
  <ul class="lt-leg">${tipos.map(t => `<li class="t-${t.slug}">${t.nome}</li>`).join('')}</ul>
</div>`;
}

const linhaB = (m, extra = '') => `<li class="b-item" data-tipo="${m.tipo}" data-preco="${m.valor}" data-ano="${m.ano}" data-txt="${esc(`${m.nome} ${m.ano} ${m.marca}`.toLowerCase())}"${extra}>
  <a href="${link('b', m)}">
    <span class="b-item-foto">${foto(m, 1)}</span>
    <span class="b-item-nome"><small>${m.tipoNome}</small><strong>${m.curto}</strong></span>
    <span class="b-item-ano"><small>Ano</small>${m.ano}</span>
    <span class="b-item-preco"><small>Preço</small>${preco(m.valor)}</span>
    <span class="b-item-ir">${ic('seta')}</span>
  </a>
</li>`;

function inicioB() {
  const destaque = [maquinas.find(m => m.id === 1660), maquinas.find(m => m.id === 1720), maquinas.find(m => m.id === 1689)];
  const precos = maquinas.map(m => m.valor);
  return head('b', '', `${E.nome} · Estoque de máquinas pesadas em Porto Alegre`, `${maquinas.length} máquinas pesadas no pátio da Av. Sertório: retroescavadeiras, escavadeiras, motoniveladoras, pás carregadeiras, rolos e caminhão. Compra, venda e troca.`) + topoB('index') + `
<section class="b-abre">
  <div class="cx b-abre-in">
    <div class="b-abre-txt">
      <p class="b-rot">Comércio de máquinas pesadas · Porto Alegre</p>
      <h1>${maquinas.length} máquinas no pátio da Avenida Sertório, com preço na tela.</h1>
      <p>Compra, venda e troca de máquinas para terraplenagem, pavimentação e escavação, e de caminhões, para todo o Brasil.</p>
      <div class="b-abre-bt"><a class="bt bt-b" href="/b/maquinas/">Ver o estoque ${ic('seta')}</a><a class="bt bt-linha" href="/b/contato/?assunto=trocar#formulario">${ic('troca')} Tenho uma máquina para trocar</a></div>
      <dl class="b-nums">
        <div><dt>Máquinas no pátio</dt><dd data-conta>${maquinas.length}</dd></div>
        <div><dt>Tipos</dt><dd data-conta>${tipos.length}</dd></div>
        <div><dt>Anos</dt><dd>${anoMin}–${anoMax}</dd></div>
        <div><dt>Preços</dt><dd>${precoCurto(Math.min(...precos)).replace(' mil', '')} a ${precoCurto(Math.max(...precos)).replace('R$ ', '')}</dd></div>
      </dl>
    </div>
    <div class="b-mosaico">
      ${destaque.map((m, k) => `<a href="${link('b', m)}" class="b-mos-${k}">${foto(m, k === 0 ? 3 : 1, '', k !== 0, false)}<span><small>${m.tipoNome}</small>${m.curto} · ${m.ano}</span></a>`).join('')}
    </div>
  </div>
</section>

<section class="cx b-sec">
  <div class="b-sec-cab"><h2>Escolha pelo tipo</h2><a href="/b/maquinas/">Estoque completo ${ic('seta')}</a></div>
  <ul class="b-tipos">${tipos.map(t => {
    const ms = doTipo(t.slug), capa = ms.find(m => [1720, 1660, 1689, 1657, 1707, 1723].includes(m.id)) || ms[0];
    const vs = ms.map(m => m.valor);
    return `<li><a href="/b/maquinas/?tipo=${t.slug}">${foto(capa, 1)}<span class="b-tipo-n">${ms.length}</span><strong>${t.nome}</strong><small>${vs.length > 1 ? `${precoCurto(Math.min(...vs))} a ${precoCurto(Math.max(...vs)).replace('R$ ', '')}` : precoCurto(vs[0])}</small></a></li>`;
  }).join('')}</ul>
</section>

<section class="b-faixa-tempo">
  <div class="cx">
    <div class="b-sec-cab"><h2>Do Michigan 1980 à New Holland 2014</h2><p>Cada ponto é uma máquina do pátio, no ano de fabricação. Passe o mouse para ver.</p></div>
    ${linhaTempo()}
  </div>
</section>

<section class="cx b-sec">
  <div class="b-sec-cab"><h2>Mais procuradas</h2><a href="/b/maquinas/">Ver as ${maquinas.length} ${ic('seta')}</a></div>
  <ul class="b-lista">${maquinas.filter(m => m.tipo === 'retroescavadeiras' || m.tipo === 'escavadeiras').slice(0, 6).map(m => linhaB(m)).join('')}</ul>
</section>

<section class="b-troca">
  <div class="cx b-troca-in">
    <div><h2>Sua máquina entra no negócio</h2><p>Compramos e trocamos máquinas de diversas marcas e modelos, além de caminhões e empilhadeiras, em todo o território nacional.</p></div>
    <ol class="b-passos">
      <li>${ic('cam')}<strong>Mande marca, modelo, ano e fotos</strong><span>Pelo formulário, por e-mail ou por telefone.</span></li>
      <li>${ic('compra')}<strong>Avaliamos e fazemos a proposta</strong><span>Para comprar a sua máquina ou para trocar por outra do pátio.</span></li>
      <li>${ic('troca')}<strong>Fechamos o negócio</strong><span>Venda direta ou troca com diferença, aqui na Av. Sertório.</span></li>
    </ol>
    <a class="bt bt-b" href="/b/contato/?assunto=vender#formulario">Avaliar minha máquina ${ic('seta')}</a>
  </div>
</section>

<section class="b-patio"><div class="cx b-patio-in">
  <img src="/assets/img/empresa/patio-5.webp" alt="Pátio da Rodrigo Máquinas na Avenida Sertório, visto do alto" width="748" height="421" loading="lazy">
  <div class="b-patio-box">
    <h2>Venha ver de perto</h2>
    <address>${E.rua}<br>${E.bairro} · ${E.cidade} · CEP ${E.cep}</address>
    <p>${telLink(E.tels[0])} · ${telLink(E.tels[1])}</p>
    <a class="bt bt-b" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Como chegar</a>
  </div></div>
</section>` + rodapeB();
}

function maquinasB() {
  return head('b', 'maquinas/', `Estoque de máquinas · ${E.nome}`, `${maquinas.length} máquinas pesadas à venda em Porto Alegre, com ano e preço. Filtre por tipo e ordene por preço ou ano.`) + topoB('maquinas') + `
<section class="cx b-sec b-estoque">
  <nav class="trilha" aria-label="Você está em"><a href="/b/">Início</a> › <span>Estoque</span></nav>
  <div class="b-sec-cab"><h1>Estoque de máquinas</h1><p data-contagem>${maquinas.length} máquinas</p></div>
  <div class="b-filtros">
    <div class="b-chips" role="group" aria-label="Tipo"><button type="button" data-chip="" aria-pressed="true">Todas <small>${maquinas.length}</small></button>${tipos.map(t => `<button type="button" data-chip="${t.slug}" aria-pressed="false">${t.nome} <small>${doTipo(t.slug).length}</small></button>`).join('')}</div>
    <div class="b-filtros-2">
      <label class="b-busca">${ic('busca')}<input type="search" data-busca placeholder="Marca, modelo ou ano" aria-label="Buscar"></label>
      <label>Ordenar <select data-ordem><option value="">Destaques</option><option value="preco-">Menor preço</option><option value="preco+">Maior preço</option><option value="ano+">Mais novo</option><option value="ano-">Mais antigo</option></select></label>
    </div>
  </div>
  <ul class="b-lista" data-lista>${maquinas.map(m => linhaB(m)).join('')}</ul>
  <p class="sem-res" data-sem-res hidden>Nenhuma máquina com esse filtro agora. <a href="/b/contato/#formulario">Diga o que você procura</a> e avisamos quando entrar.</p>
</section>` + rodapeB();
}

function maquinaB(m) {
  const mesmas = [...doTipo(m.tipo)].sort((a, b) => a.valor - b.valor);
  const max = Math.max(...mesmas.map(o => o.valor));
  return head('b', `maquinas/${m.slug}/`, `${m.nome} ${m.ano} · ${E.nome}`, `${m.nome}, ano ${m.ano}, ${preco(m.valor)}. Pátio na Av. Sertório, 5600, Porto Alegre.`) + topoB('maquinas') + `
<article class="cx b-sec b-maq">
  <nav class="trilha" aria-label="Você está em"><a href="/b/">Início</a> › <a href="/b/maquinas/?tipo=${m.tipo}">${tipo(m.tipo).nome}</a> › <span>${m.curto}</span></nav>
  <div class="b-maq-grade">
    <div class="b-mosaico-maq">${[1, 2, 3, 4].map(i => `<button type="button" data-zoom="/assets/img/maq/${m.id}-${i}.webp" aria-label="Ampliar foto ${i}">${foto(m, i, '', i !== 1, i > 2)}</button>`).join('')}</div>
    <div class="b-maq-lado">
      <p class="b-rot">${m.tipoNome} · ${m.marca}</p>
      <h1>${m.curto} <span>${m.ano}</span></h1>
      <p class="b-valor">${preco(m.valor)}</p>
      <table class="b-tabela"><tbody>
        <tr><th>Tipo</th><td>${m.tipoNome}${m.hidraulica ? ' hidráulica' : ''}${m.implemento ? ` (${m.implemento.toLowerCase()})` : ''}</td></tr>
        <tr><th>Marca</th><td>${m.marca}</td></tr>
        <tr><th>Modelo</th><td>${m.modelo}</td></tr>
        ${m.tracao ? `<tr><th>Tração</th><td>${m.tracao}</td></tr>` : ''}
        <tr><th>Ano</th><td>${m.ano}</td></tr>
        <tr><th>Onde está</th><td>Pátio da Av. Sertório, Porto Alegre</td></tr>
      </tbody></table>
      <div class="b-maq-bt"><a class="bt bt-b" href="${querLink('b', m)}">Quero esta máquina ${ic('seta')}</a>${telLink(E.tels[0], 'bt bt-linha')}</div>
      <p class="b-maq-troca">${ic('troca')} Tem uma máquina para dar na troca? <a href="/b/contato/?assunto=trocar&maquina=${m.id}#formulario">Peça a avaliação</a>.</p>
    </div>
  </div>
  ${mesmas.length > 1 ? `<section class="b-comp">
    <h2>${tipo(m.tipo).nome} no pátio</h2>
    <ul>${mesmas.map(o => `<li${o === m ? ' class="atual"' : ''}><a href="${link('b', o)}"><span class="b-comp-nome">${o.curto} <small>${o.ano}</small></span><span class="b-comp-barra"><i style="width:${(o.valor / max * 100).toFixed(1)}%"></i></span><span class="b-comp-preco">${preco(o.valor)}</span></a></li>`).join('')}</ul>
  </section>` : ''}
</article>` + rodapeB();
}

function empresaB() {
  return head('b', 'empresa/', `A empresa · ${E.nome}`, 'Compra, venda e troca de máquinas para terraplenagem, pavimentação, escavações, perfurações e ar comprimido, caminhões e empilhadeiras.') + topoB('empresa') + `
<section class="b-emp-abre"><div class="cx"><div><nav class="trilha" aria-label="Você está em"><a href="/b/">Início</a> › <span>A empresa</span></nav><p class="b-rot">${E.sub} · Porto Alegre</p><h1>Sobre a empresa</h1></div><img src="/assets/img/empresa/patio-3.webp" alt="Pátio da Rodrigo Máquinas visto do alto, ao lado da Avenida Sertório" width="748" height="421"></div></section>
<section class="cx b-sec b-emp">
  <div class="b-emp-txt">
    <p class="b-emp-lead">${sobre[0]}</p>
    ${sobre.slice(1).map(p => `<p>${p}</p>`).join('')}
  </div>
  <aside class="b-emp-lado">
    <h2>Segmentos</h2>
    <ul class="b-tags">${segmentos.map(s => `<li>${s}</li>`).join('')}</ul>
    <h2>Marcas com que trabalhamos</h2>
    <ul class="b-tags b-tags-m">${marcasTexto.map(s => `<li>${s}</li>`).join('')}<li>e outras</li></ul>
  </aside>
</section>
<section class="b-faixa-tempo"><div class="cx">
  <div class="b-sec-cab"><h2>O que tem no pátio hoje</h2><a href="/b/maquinas/">Ver o estoque ${ic('seta')}</a></div>
  ${linhaTempo()}
</div></section>
<section class="cx b-sec">
  <div class="b-galeria">${[1, 2, 4, 5].map(n => `<button type="button" data-zoom="/assets/img/empresa/patio-${n}.webp" aria-label="Ampliar foto do pátio"><img src="/assets/img/empresa/patio-${n}.webp" alt="Pátio da Rodrigo Máquinas visto do alto" width="748" height="421" loading="lazy"></button>`).join('')}</div>
</section>` + rodapeB();
}

function contatoB() {
  return head('b', 'contato/', `Contato · ${E.nome}`, `Telefones ${E.tels.join(' e ')}, ${E.email}. ${E.rua}, ${E.bairro}, ${E.cidade}.`) + topoB('contato') + `
<section class="cx b-sec b-contato">
  <div>
    <nav class="trilha" aria-label="Você está em"><a href="/b/">Início</a> › <span>Contato</span></nav>
    <h1>Fale conosco</h1>
    <p>Para comprar, vender ou trocar. Se a máquina que você procura não está no site, pergunte: o estoque muda toda semana.</p>
    <dl class="b-cont-lista">
      <div><dt>${ic('tel')} Telefones</dt><dd>${telLink(E.tels[0])}<br>${telLink(E.tels[1])}</dd></div>
      <div><dt>${ic('mail')} E-mail</dt><dd><a href="mailto:${E.email}">${E.email}</a></dd></div>
      <div><dt>${ic('pin')} Pátio</dt><dd>${E.rua}<br>${E.bairro} · ${E.cidade}<br>CEP ${E.cep}</dd></div>
    </dl>
    <iframe class="mapa" src="${E.mapaEmbed}" title="Mapa: ${E.rua}, ${E.cidade}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
  <section id="formulario" class="b-form-caixa"><h2>Mande sua mensagem</h2>${formulario('b')}</section>
</section>` + rodapeB();
}

export function gerarVersao(v) {
  const p = {};
  if (v === 'a') {
    p.index = inicioA(); p.maquinas = maquinasA(); p.empresa = empresaA(); p.contato = contatoA();
    for (const m of maquinas) p[`maquinas/${m.slug}`] = maquinaA(m);
  } else {
    p.index = inicioB(); p.maquinas = maquinasB(); p.empresa = empresaB(); p.contato = contatoB();
    for (const m of maquinas) p[`maquinas/${m.slug}`] = maquinaB(m);
  }
  return p;
}
