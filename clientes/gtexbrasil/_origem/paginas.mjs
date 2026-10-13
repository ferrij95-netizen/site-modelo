// Páginas das duas versões. A "Lar" (a) segue o site atual: branco, rosa do logo e azul, arcos do G.
// A "Vitrine" (b) põe as embalagens na frente: azul com degradês e uma prateleira por marca, na cor de cada uma.
import { site, marcas, categorias, produtos, tipos, destaques, numeros, rankings, historia, valores, faq, fds, downloads, marca, categoria, tipoNome } from './conteudo.mjs';
import { esc, img, ico, arcoG, linkDe, ext, doc, cartao, pdf } from './comum.mjs';

const doMarca = id => produtos.filter(p => p.marca === id);
const daCat = id => produtos.filter(p => p.cat === id);

// Cabeçalho das páginas internas.
function capa(v, { selo, titulo, texto = '', foto = '', trilha = [], extra = '' }) {
  const L = linkDe(v);
  const migalha = trilha.length ? `<nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Home</a>${trilha.map(([s, t]) => s ? ` / <a href="${L(s)}">${t}</a>` : ` / <span>${t}</span>`).join('')}</nav>` : '';
  if (v === 'a') return `<section class="capa${foto ? ' com-foto' : ''}">
  ${foto ? `<div class="capa-foto">${img(foto, '')}</div>` : ''}
  ${arcoG('capa-g1')}${arcoG('capa-g2')}
  <div class="wrap capa-in">${migalha}<span class="selo">${selo}</span><h1>${titulo}</h1>${texto ? `<p class="lead">${texto}</p>` : ''}${extra}</div>
</section>`;
  return `<section class="capa">
  <div class="wrap capa-in">
    <div>${migalha}<span class="selo">${selo}</span><h1>${titulo}</h1>${texto ? `<p class="lead">${texto}</p>` : ''}${extra}</div>
    ${foto ? `<div class="capa-foto">${img(foto, '')}</div>` : ''}
  </div>
</section>`;
}

const ondeComprar = (v, cls = '') => {
  const L = linkDe(v);
  return `<section class="onde ${cls}"><div class="wrap onde-in">
  <div><span class="selo">Onde comprar</span><h2>Os produtos das suas marcas favoritas a um clique de distância</h2>
  <p>Saiba onde encontrar os produtos das nossas marcas, acesse o catálogo e compre diretamente conosco!</p></div>
  <div class="onde-bts">
    <a class="onde-bt" href="${site.loja}" ${ext}>${ico('carrinho')}<span><b>Sou consumidor</b><small>Compre na loja on-line Casa de GE</small></span>${ico('seta')}</a>
    <a class="onde-bt" href="${L('onde-comprar/empresa')}">${ico('predio')}<span><b>Sou empresa / indústria</b><small>Atendimento personalizado para revenda</small></span>${ico('seta')}</a>
  </div>
</div></section>`;
};

// ---------- Home ----------
function homeA(v) {
  const L = linkDe(v);
  const mais = ['urca-desinfetante', 'baby-soft-amaciante-concentrado', 'urca-tira-manchas', 'ufe-sabao-barra', 'urca-saponaceo-cristal', 'urca-lava-roupas-liquido', 'classic-desinfetante', 'ruth-sabao-coco-barra'].map(s => produtos.find(p => p.slug === s));
  return `<section class="hero">
  ${arcoG('hero-g1')}${arcoG('hero-g2')}
  <div class="wrap hero-in">
    <div class="hero-txt">
      <span class="selo">Cuidado que transforma</span>
      <h1>Os produtos mais amados dos lares <em>brasileiros</em></h1>
      <p class="lead">Você conhece e ama nossas marcas, e trabalhamos sempre para entregar o melhor para cuidar da sua família! Conte com GTEX.</p>
      <div class="bts"><a class="btn" href="${L('produtos')}">Ver todos os produtos ${ico('seta')}</a><a class="btn lin" href="#marcas">Nossas marcas</a></div>
    </div>
    <div class="hero-foto">${img('linha-completa', 'Embalagens das marcas Urca, Baby Soft, UFE e Ruth Care', 'width="1400" height="603" fetchpriority="high" loading="eager"')}</div>
  </div>
  <div class="wrap marcas-faixa" id="marcas">${marcas.map(m => `<a href="${L(m.id)}" title="${m.nome}">${img(m.logo, m.nome)}</a>`).join('')}</div>
</section>

<section class="sec promos">
  <div class="wrap">
    <div class="sec-tit"><span class="selo">Novidades</span><h2>O que chegou nas prateleiras</h2></div>
    <div class="promo-grid">${destaques.map((d, i) => `<a class="promo${i === 0 ? ' grande' : ''}" href="${L(d.link)}">
      <span class="promo-foto">${img(d.foto, d.titulo)}</span>
      <span class="promo-txt"><small>${d.selo}</small><b>${d.titulo}</b>${d.texto ? `<span>${d.texto}</span>` : ''}<em>${d.botao} ${ico('seta')}</em></span>
    </a>`).join('')}</div>
  </div>
</section>

<section class="sec cats">
  <div class="wrap">
    <div class="sec-tit"><span class="selo">Diversidade de mercado</span><h2>Categorias dos nossos produtos</h2><p>A GTEX oferece uma diversidade de produtos para atender a todas as suas necessidades, com soluções para cada ambiente.</p></div>
    <div class="cat-grid">${categorias.map(c => `<a class="cat" href="${L(c.id)}">${img(c.foto, c.nome)}<span class="cat-txt"><b>${c.nome}</b><span>${c.curto}</span><em>${daCat(c.id).length} produtos ${ico('seta')}</em></span></a>`).join('')}</div>
  </div>
</section>

<section class="sec amados">
  <div class="wrap">
    <div class="sec-tit lado"><div><span class="selo">Produtos amados</span><h2>Os preferidos das famílias</h2></div><a class="btn lin" href="${L('produtos')}">Catálogo completo ${ico('seta')}</a></div>
    <div class="trilho" data-trilho>${mais.map(p => cartao(p, v)).join('')}</div>
  </div>
</section>

<section class="sec presenca">
  ${arcoG('pres-g')}
  <div class="wrap pres-in">
    <div class="pres-txt"><span class="selo">Presença nacional</span><h2>Levamos a qualidade GTEX para cada canto do país</h2>
      <p>Estamos presentes em todos os modelos de canais de vendas, para que você encontre nossos produtos onde estiver.</p>
      <ul class="rank">${rankings.map(([n, t]) => `<li><b>${n}</b><span>${t}</span></li>`).join('')}</ul>
      <small class="fonte">Liderança por categoria segundo Kantar e ScanMarket 2025, citados no site atual.</small></div>
    <div class="nums">${numeros.map(([n, t, s]) => `<div class="num"><b>${n}</b><span>${t}</span>${s ? `<small>${s}</small>` : ''}</div>`).join('')}</div>
  </div>
</section>

<section class="sec sust">
  <div class="wrap sust-in">
    <div class="sust-foto">${img('amazon-banner', 'Bastão Tira Manchas e Stop Mofo Amazon H2O')}</div>
    <div><span class="selo verde">Sustentabilidade</span><h2>Limpamos e cuidamos com responsabilidade</h2>
      <p>Com o selo eureciclo, garantimos a reciclagem equivalente ao que produzimos: compensação ambiental de resíduos equivalente a 15 piscinas olímpicas cheias. Além disso, temos a Amazon H2O, nossa marca de produtos focada em sustentabilidade.</p>
      <div class="sust-selos">${img('eureciclo', 'Selo eureciclo')}<a class="btn lin" href="${L('amazon-h2o')}">Conheça a Amazon H2O ${ico('seta')}</a></div></div>
  </div>
</section>

<section class="sec quem">
  <div class="wrap quem-in">
    <div class="quem-foto">${img('equipe', 'Equipe GTEX reunida no centro de distribuição')}</div>
    <div><span class="selo">Quem somos</span><h2>Presença marcante em lares de todo o Brasil</h2>
      <p><b>Cuidar do lar é o que nos move!</b> A GTEX é o seu grupo de confiança em cuidados com o lar. Com os produtos mais amados do país, nosso objetivo é estar presente em todos os lares brasileiros.</p>
      <a class="btn" href="${L('quem-somos')}">Conheça a GTEX ${ico('seta')}</a></div>
  </div>
</section>

${ondeComprar(v)}

<section class="sec time">
  <div class="wrap time-in">
    <div><span class="selo">Trabalhe conosco</span><h2>Junte-se ao nosso time e transforme lares</h2>
      <p>Confira as vagas em aberto, as condições e etapas do processo seletivo e envie o seu currículo. Você poderá acompanhar o processo e receberá notícias diretamente no e-mail!</p>
      <a class="btn" href="${L('trabalhe-conosco')}">Trabalhe conosco ${ico('seta')}</a></div>
    <div class="time-foto">${img('colaborador', 'Colaborador GTEX no centro de distribuição')}</div>
  </div>
</section>

${faleConosco(v)}`;
}

function homeB(v) {
  const L = linkDe(v);
  return `<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-txt">
      <span class="selo">Holding de produtos de limpeza · 6 marcas</span>
      <h1>Cuidado que transforma, em cada embalagem</h1>
      <p class="lead">Urca, Baby Soft, UFE Coco, Ruth Care, Classic e Amazon H2O. ${produtos.length} linhas de produtos para lavanderia, cozinha e toda a casa, presentes em mais de 50% dos lares brasileiros.</p>
      <form class="hero-busca" action="${L('produtos')}" role="search"><label class="sr" for="hb">Buscar produto</label>${ico('busca')}<input id="hb" name="q" placeholder="Buscar: amaciante, desinfetante, sabão de coco..." autocomplete="off"><button class="btn">Buscar</button></form>
      <div class="hero-atalhos">${tipos.slice(0, 6).map(([id, n]) => `<a href="${L('produtos')}#tipo=${id}">${n}</a>`).join('')}</div>
    </div>
    <div class="hero-foto">${img('linha-completa', 'Embalagens das marcas GTEX', 'width="1400" height="603" fetchpriority="high" loading="eager"')}</div>
  </div>
  <div class="hero-nums wrap">${numeros.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('')}</div>
</section>

<section class="sec promos">
  <div class="wrap">
    <div class="carrossel" data-carrossel>
      <div class="car-trilho">${destaques.map(d => `<a class="slide" href="${L(d.link)}">${img(d.foto, d.titulo)}<span class="slide-txt"><small>${d.selo}</small><b>${d.titulo}</b>${d.texto ? `<span>${d.texto}</span>` : ''}<em>${d.botao} ${ico('seta')}</em></span></a>`).join('')}</div>
      <div class="car-pontos">${destaques.map((d, i) => `<button type="button" aria-label="Destaque ${i + 1}"${i ? '' : ' aria-current="true"'}></button>`).join('')}</div>
    </div>
  </div>
</section>

${marcas.map(m => `<section class="prateleira" style="--mc:${m.cor};--mc2:${m.cor2}">
  <div class="wrap">
    <div class="prat-cab">
      <a class="prat-logo" href="${L(m.id)}">${img(m.logo, m.nome)}</a>
      <div><h2>${m.titulo}</h2><p>${m.texto[0]}</p></div>
      <a class="btn lin" href="${L(m.id)}">${doMarca(m.id).length} produtos ${ico('seta')}</a>
    </div>
    <div class="trilho" data-trilho>${doMarca(m.id).map(p => cartao(p, v)).join('')}</div>
  </div>
</section>`).join('\n')}

<section class="sec cats">
  <div class="wrap">
    <div class="sec-tit"><span class="selo">Por ambiente</span><h2>Soluções para cada canto da casa</h2></div>
    <div class="cat-grid">${categorias.map((c, i) => `<a class="cat c${i}" href="${L(c.id)}">${img(c.foto, c.nome)}<span class="cat-txt"><b>${c.nome}</b><span>${c.curto}</span><em>${daCat(c.id).length} produtos ${ico('seta')}</em></span></a>`).join('')}</div>
  </div>
</section>

<section class="sec lideranca">
  <div class="wrap lid-in">
    <div><span class="selo">Liderança</span><h2>Marcas que lideram as gôndolas</h2><p>Segundo dados Kantar e ScanMarket 2025 citados pela GTEX, o grupo está em mais de 50% dos lares brasileiros, cerca de 30 milhões de casas.</p></div>
    <ol class="podio">${rankings.map(([n, t]) => `<li><b>${n}</b><span>${t}</span></li>`).join('')}</ol>
  </div>
</section>

<section class="sec sust">
  <div class="wrap sust-in">
    <div><span class="selo">Sustentabilidade</span><h2>Limpamos e cuidamos com responsabilidade</h2>
      <p>Com o selo eureciclo, garantimos a reciclagem equivalente ao que produzimos: compensação equivalente a 15 piscinas olímpicas cheias de resíduos. E a Amazon H2O é a nossa marca focada em sustentabilidade.</p>
      <a class="btn" href="${L('amazon-h2o')}">Conheça a Amazon H2O ${ico('seta')}</a></div>
    <div class="sust-foto">${img('eureciclo', 'Selo eureciclo', 'class="selo-er"')}${img('amazon-banner', 'Produtos Amazon H2O')}</div>
  </div>
</section>

<section class="sec quem">
  <div class="wrap quem-in">
    <div class="quem-foto">${img('equipe', 'Equipe GTEX reunida no centro de distribuição')}</div>
    <div><span class="selo">Quem somos</span><h2>Mais de 50 anos levando cuidado aos lares brasileiros</h2>
      <p>Cuidar do lar é o que nos move! São mais de 1.500 colaboradores, 4 unidades de produção e 5 centros de distribuição.</p>
      <div class="bts"><a class="btn" href="${L('quem-somos')}">Nossa história ${ico('seta')}</a><a class="btn lin" href="${L('trabalhe-conosco')}">Trabalhe conosco</a></div></div>
  </div>
</section>

${ondeComprar(v)}
${faleConosco(v)}`;
}

function faleConosco(v) {
  return `<section class="sec fale">
  <div class="wrap fale-in">
    <div><span class="selo">Fale com a gente</span><h2>Como podemos te ajudar?</h2>
      <ul class="canais"><li><a href="tel:${site.foneHref}">${ico('fone')}<span><small>SAC</small>${site.fone}</span></a></li><li><a href="mailto:${site.email}">${ico('mail')}<span><small>E-mail</small>${site.email}</span></a></li></ul></div>
    <form class="form" action="mailto:${site.email}" method="post" enctype="text/plain">
      <div class="duas"><label>Nome<input name="nome" required></label><label>E-mail<input type="email" name="email" required></label></div>
      <label>Telefone<input name="telefone" inputmode="tel"></label>
      <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
      <button class="btn">Enviar ${ico('seta')}</button>
    </form>
  </div>
</section>`;
}

// ---------- Catálogo ----------
function catalogo(v) {
  const chips = (nome, itens) => `<div class="filtro" data-filtro="${nome}"><button type="button" class="chip" aria-pressed="true" data-v="">Todos</button>${itens.map(([id, t]) => `<button type="button" class="chip" aria-pressed="false" data-v="${id}">${t}</button>`).join('')}</div>`;
  return capa(v, { selo: 'Produtos', titulo: 'A melhor escolha para você e cuidado para a sua família', texto: `${produtos.length} linhas de produtos das 6 marcas GTEX. Filtre por marca, categoria ou tipo e veja todas as embalagens de cada produto.`, foto: v === 'a' ? '' : 'linha-completa', trilha: [[null, 'Produtos']] })
  + `<section class="sec catalogo" data-catalogo>
  <div class="wrap cat-lay">
    <aside class="filtros">
      <label class="busca">${ico('busca')}<span class="sr">Buscar</span><input type="search" data-busca placeholder="Buscar produto ou tamanho" autocomplete="off"></label>
      <h2>Marca</h2>${chips('marca', marcas.map(m => [m.id, m.nome]))}
      <h2>Categoria</h2>${chips('cat', categorias.map(c => [c.id, c.nome]))}
      <h2>Tipo</h2>${chips('tipo', tipos)}
    </aside>
    <div>
      <p class="contagem" aria-live="polite"><b data-n>${produtos.length}</b> produtos <button type="button" class="limpar" data-limpar hidden>Limpar filtros</button></p>
      <div class="grade">${produtos.map(p => cartao(p, v, { h: 'h2' })).join('')}</div>
      <p class="vazio" data-vazio hidden>Nenhum produto com esses filtros. <button type="button" data-limpar>Limpar filtros</button></p>
    </div>
  </div>
</section>` + ondeComprar(v);
}

// ---------- Produto ----------
function produto(v, p) {
  const L = linkDe(v);
  const m = marca(p.marca), c = categoria(p.cat);
  const parecidos = produtos.filter(x => x !== p && x.tipo === p.tipo).slice(0, 4);
  const daMesma = produtos.filter(x => x !== p && x.marca === p.marca && !parecidos.includes(x)).slice(0, 4);
  const rel = [...parecidos, ...daMesma].slice(0, 8);
  return `<section class="produto" style="--mc:${m.cor};--mc2:${m.cor2}">
  <div class="wrap">
    <nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Home</a> / <a href="${L('produtos')}">Produtos</a> / <a href="${L(m.id)}">${m.nome}</a> / <span>${esc(p.nome)}</span></nav>
    <div class="pd" data-produto>
      <div class="pd-galeria">
        <div class="pd-foto">${p.emb.map((e, i) => img(e.img, p.nome + ' ' + e.r, `width="640" height="559" data-emb="${i}"${i ? ' hidden' : ' loading="eager"'}`)).join('')}${p.novo ? '<span class="pc-novo">Novo</span>' : ''}</div>
        ${p.emb.length > 1 ? `<div class="pd-mini">${p.emb.map((e, i) => `<button type="button" data-emb="${i}" aria-pressed="${!i}" aria-label="${esc(e.r)}">${img(e.img, '')}</button>`).join('')}</div>` : ''}
      </div>
      <div class="pd-info">
        <a class="pd-marca" href="${L(m.id)}">${img(m.logo, m.nome)}</a>
        <h1>${esc(p.nome)}</h1>
        <p class="pd-cat"><a href="${L(c.id)}">${c.nome}</a> · <a href="${L('produtos')}#tipo=${p.tipo}">${tipoNome(p.tipo)}</a></p>
        ${p.texto ? `<p class="pd-txt">${esc(p.texto)}</p>` : ''}
        <h2>Embalagens e versões</h2>
        <div class="pd-emb" role="group" aria-label="Embalagens">${p.emb.map((e, i) => `<button type="button" class="chip" data-emb="${i}" aria-pressed="${!i}">${esc(e.r)}</button>`).join('')}</div>
        <div class="pd-bts">
          <a class="btn" href="${site.loja}" ${ext}>${ico('carrinho')} Comprar</a>
          <a class="btn lin" href="${L('onde-comprar/empresa')}?produto=${encodeURIComponent(p.nome)}">${ico('predio')} Sou empresa: pedir atendimento</a>
        </div>
        <ul class="pd-docs">
          ${p.fds ? `<li><a href="${p.fds}" ${ext}>${ico('doc')}<span>Ficha de segurança (FDS)<small>PDF</small></span></a></li>` : `<li><a href="${L('fds')}">${ico('doc')}<span>Fichas de segurança<small>ver lista por marca</small></span></a></li>`}
          <li><a href="${pdf(m.catalogo)}" ${ext}>${ico('baixar')}<span>Catálogo ${m.nome}<small>PDF</small></span></a></li>
          <li><a href="${L('contato')}#faq">${ico('escudo')}<span>Dúvidas frequentes<small>uso, dosagem, troca</small></span></a></li>
        </ul>
      </div>
    </div>
  </div>
</section>
${rel.length ? `<section class="sec rel"><div class="wrap"><div class="sec-tit lado"><h2>Você também pode gostar</h2><a class="btn lin" href="${L(m.id)}">Tudo de ${m.nome} ${ico('seta')}</a></div><div class="trilho" data-trilho>${rel.map(x => cartao(x, v)).join('')}</div></div></section>` : ''}
${ondeComprar(v)}`;
}

// ---------- Marca ----------
const BANNERS = { 'baby-soft': ['bsft-ame', 'bsft-po'], ufe: ['ufe-banner'], 'ruth-care': ['ruth-banner'], classic: ['classic-banner'], 'amazon-h2o': ['amazon-banner'], urca: ['banner-desinfetantes', 'banner-tira-manchas'] };
function paginaMarca(v, m) {
  const L = linkDe(v);
  const ps = doMarca(m.id);
  const grupos = tipos.filter(([t]) => ps.some(p => p.tipo === t));
  const lista = downloads.find(d => d.marca === m.id);
  return `<section class="marca-capa" style="--mc:${m.cor};--mc2:${m.cor2}">
  <div class="wrap mc-in">
    <div>
      <nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Home</a> / <a href="${L('produtos')}">Produtos</a> / <span>${m.nome}</span></nav>
      <span class="mc-logo">${img(m.logo, m.nome)}</span>
      <h1>${m.titulo}</h1>
      ${m.texto.map(t => `<p>${t}</p>`).join('')}
      <p class="mc-frase">${m.frase}</p>
      <div class="bts"><a class="btn" href="#linha">Ver ${ps.length} produtos ${ico('seta')}</a><a class="btn lin" href="${pdf(m.catalogo)}" ${ext}>${ico('baixar')} Catálogo em PDF</a></div>
    </div>
    <div class="mc-foto">${img(m.banner || (BANNERS[m.id] || [])[0], 'Produtos ' + m.nome)}</div>
  </div>
</section>
${(BANNERS[m.id] || []).filter(b => b !== m.banner).length && m.id === 'baby-soft' ? `<section class="faixa-banner wrap">${['bsft-vermelho', 'bsft-cobre'].map(b => img(b, 'Baby Soft: perfuma, rejuvenesce os tecidos e protege as cores')).join('')}</section>` : ''}
<section class="sec linha" id="linha" style="--mc:${m.cor};--mc2:${m.cor2}">
  <div class="wrap">
    ${grupos.map(([t, n]) => `<div class="grupo"><h2>${n}</h2><div class="grade">${ps.filter(p => p.tipo === t).map(p => cartao(p, v)).join('')}</div></div>`).join('')}
  </div>
</section>
<section class="sec marca-docs"><div class="wrap md-in">
  <div><h2>Materiais ${m.nome}</h2><p>Catálogo, fichas de segurança e embalagens oficiais para lojistas e parceiros.</p></div>
  <ul class="pd-docs">
    <li><a href="${pdf(m.catalogo)}" ${ext}>${ico('baixar')}<span>Catálogo ${m.nome}<small>PDF</small></span></a></li>
    <li><a href="${L('fds')}#${m.id}">${ico('doc')}<span>Fichas de segurança<small>FDS ${m.nome}</small></span></a></li>
    ${lista ? `<li><a href="${L('download')}#${m.id}">${ico('baixar')}<span>Logos e embalagens<small>${lista.itens.length} arquivos .zip</small></span></a></li>` : ''}
  </ul>
</div></section>
<section class="sec outras"><div class="wrap"><h2 class="mini">Outras marcas GTEX</h2><div class="marcas-faixa">${marcas.filter(x => x !== m).map(x => `<a href="${L(x.id)}" title="${x.nome}">${img(x.logo, x.nome)}</a>`).join('')}</div></div></section>
${ondeComprar(v)}`;
}

// ---------- Categoria ----------
function paginaCategoria(v, c) {
  const ps = daCat(c.id);
  const grupos = c.id === 'linha-coco'
    ? marcas.filter(m => ps.some(p => p.marca === m.id)).map(m => [m.nome, ps.filter(p => p.marca === m.id)])
    : tipos.filter(([t]) => ps.some(p => p.tipo === t)).map(([t, n]) => [n, ps.filter(p => p.tipo === t)]);
  return capa(v, { selo: c.h3, titulo: c.nome, texto: `<b>${c.h2}</b> ${c.texto}`, foto: c.foto, trilha: [['produtos', 'Produtos'], [null, c.nome]] })
  + `<section class="sec linha"><div class="wrap">
    <nav class="ancoras">${grupos.map(([n, l], i) => `<a href="#g${i}">${n} <small>${l.length}</small></a>`).join('')}</nav>
    ${grupos.map(([n, l], i) => `<div class="grupo" id="g${i}"><h2>${n}</h2><div class="grade">${l.map(p => cartao(p, v)).join('')}</div></div>`).join('')}
  </div></section>
  <section class="sec outras"><div class="wrap"><h2 class="mini">Outras categorias</h2><div class="cat-grid mini">${categorias.filter(x => x !== c).map(x => `<a class="cat" href="${linkDe(v)(x.id)}">${img(x.foto, x.nome)}<span class="cat-txt"><b>${x.nome}</b><em>${daCat(x.id).length} produtos ${ico('seta')}</em></span></a>`).join('')}</div></div></section>`
  + ondeComprar(v);
}

// ---------- Quem somos ----------
function quemSomos(v) {
  const L = linkDe(v);
  return capa(v, { selo: 'Quem somos', titulo: 'Feitos de história', texto: 'Uma trajetória de mais de 50 anos que começou com o sonho de levar cuidado e bem-estar para os lares brasileiros. A GTEX é a sua holding de produtos de limpeza.', foto: v === 'a' ? 'fundo-sala' : 'equipe', trilha: [[null, 'Quem somos']] })
  + `<section class="sec proposito">
  ${arcoG('prop-g1')}${arcoG('prop-g2')}
  <div class="wrap prop-in">
    <div class="prop"><span class="selo">Nosso propósito</span><blockquote>“Construir uma casa <b>segura</b> e <b>forte</b> com <b>amor</b>.”</blockquote></div>
    <div class="prop"><span class="selo">Nosso posicionamento</span><blockquote>“<b>GTEX</b>, uma marca de cuidados com a <b>casa</b>, com as <b>pessoas</b> e com o <b>mundo</b>.”</blockquote></div>
  </div>
</section>
<section class="sec numeros"><div class="wrap">
  <div class="nums">${numeros.map(([n, t, s]) => `<div class="num"><b>${n}</b><span>${t}</span>${s ? `<small>${s}</small>` : ''}</div>`).join('')}</div>
  <ul class="rank">${rankings.map(([n, t]) => `<li><b>${n}</b><span>${t}</span></li>`).join('')}</ul>
  <p class="fonte">Fontes citadas pela GTEX: Kantar e ScanMarket 2025. Reconhecida como autoridade no uso do coco natural.</p>
</div></section>
<section class="sec historia"><div class="wrap">
  <div class="sec-tit"><span class="selo">Nossa história</span><h2>De um sabão a seis marcas amadas</h2></div>
  <ol class="linha-tempo">${historia.map(([a, t]) => `<li><b>${a}</b><p>${t}</p></li>`).join('')}</ol>
</div></section>
<section class="sec valores"><div class="wrap val-in">
  <div class="val-foto">${img('evento', 'Encontro com a equipe GTEX')}</div>
  <div><span class="selo">Nossos valores</span><h2>O jeito GTEX de trabalhar</h2>
  <ol class="val-lista">${valores.map(t => `<li>${t}</li>`).join('')}</ol></div>
</div></section>
<section class="sec sust"><div class="wrap sust-in">
  <div><span class="selo verde">Sustentabilidade</span><h2>Parceria eureciclo</h2><p>Compensação ambiental de resíduos equivalente a 15 piscinas olímpicas cheias (fonte: eureciclo, base 2021). As embalagens são de plástico 100% reciclável.</p></div>
  <div class="sust-selos">${img('eureciclo', 'Selo eureciclo')}</div>
</div></section>
<section class="sec outras"><div class="wrap"><h2 class="mini">Nossas marcas</h2><div class="marcas-faixa">${marcas.map(x => `<a href="${L(x.id)}" title="${x.nome}">${img(x.logo, x.nome)}</a>`).join('')}</div></div></section>`;
}

// ---------- Trade ----------
function paginaFds(v) {
  const idDe = n => marcas.find(m => m.nome === n || m.nome.startsWith(n))?.id || '';
  return capa(v, { selo: 'Trade · FDS', titulo: 'Encontre informações de segurança de produtos', texto: 'Fichas com Dados de Segurança (FDS) dos produtos GTEX, separadas por marca.', trilha: [[null, 'FDS']] })
  + `<section class="sec docs" data-docs><div class="wrap">
  <label class="busca">${ico('busca')}<span class="sr">Buscar</span><input type="search" data-busca-doc placeholder="Buscar ficha: desinfetante, amaciante..."></label>
  ${fds.map(([n, l]) => `<details class="doc-grupo" id="${idDe(n)}" open><summary>${img(marca(idDe(n))?.logo || 'marca-urca', n)}<span>${n}</span><small>${l.length} fichas</small>${ico('baixo')}</summary>
    <ul>${l.map(([t, u]) => `<li><a href="${u}" ${ext}>${ico('doc')}<span>${t}</span><em>PDF ${ico('baixar')}</em></a></li>`).join('')}</ul></details>`).join('')}
</div></section>`;
}

function paginaDownload(v) {
  return capa(v, { selo: 'Trade · Download', titulo: 'Embalagens e logos oficiais', texto: 'Arquivos das marcas GTEX para usar em materiais e comunicações de lojistas e parceiros.', trilha: [[null, 'Download']] })
  + `<section class="sec docs"><div class="wrap dl-grid">
  ${downloads.map(d => { const m = marca(d.marca); return `<div class="dl" id="${m.id}" style="--mc:${m.cor};--mc2:${m.cor2}"><div class="dl-cab">${img(m.logo, m.nome)}<b>${m.nome}</b></div><ul>${d.itens.map(([t, u]) => `<li><a href="${u}">${ico('baixar')}<span>${t}</span><small>.zip</small></a></li>`).join('')}</ul></div>`; }).join('')}
</div></section>`;
}

function paginaCatalogos(v) {
  return capa(v, { selo: 'Trade · Catálogos', titulo: 'Catálogos das marcas GTEX', texto: 'Confira e baixe os catálogos completos das marcas GTEX para conhecer nossos produtos.', trilha: [[null, 'Catálogos']] })
  + `<section class="sec docs"><div class="wrap catal-grid">
  ${marcas.map(m => `<a class="catal" href="${pdf(m.catalogo)}" ${ext} style="--mc:${m.cor};--mc2:${m.cor2}"><span class="catal-logo">${img(m.logo, m.nome)}</span><span class="catal-txt"><b>Catálogo ${m.nome}</b><small>${doMarca(m.id).length} linhas de produto · PDF</small></span><em>${ico('baixar')} Baixar</em></a>`).join('')}
</div></section>` + ondeComprar(v);
}

// ---------- Onde comprar ----------
function paginaOnde(v) {
  const L = linkDe(v);
  return capa(v, { selo: 'Onde comprar', titulo: 'Os produtos da sua marca de cuidados com o lar a um clique de distância', texto: 'Entre em contato e compre os produtos das suas marcas favoritas direto com a gente! Acesse o nosso catálogo, escolha o que levar e faça o seu pedido.', foto: 'linha-completa', trilha: [[null, 'Onde comprar']] })
  + `<section class="sec escolha"><div class="wrap esc-grid">
  <a class="esc" href="${site.loja}" ${ext}>${ico('carrinho')}<b>Sou consumidor</b><p>Compre direto na loja on-line Casa de GE, com os produtos de todas as marcas GTEX.</p><em>Ir para a loja ${ico('seta')}</em></a>
  <a class="esc" href="${L('onde-comprar/empresa')}">${ico('predio')}<b>Sou empresa / indústria</b><p>Atacadista, varejista ou indústria: envie seus dados e o que deseja, que logo entraremos em contato.</p><em>Pedir atendimento ${ico('seta')}</em></a>
  <a class="esc" href="${L('catalogos')}">${ico('doc')}<b>Catálogos</b><p>Baixe os catálogos completos das 6 marcas e escolha o que levar.</p><em>Ver catálogos ${ico('seta')}</em></a>
</div></section>`;
}

const UFS = 'AC AL AP AM BA CE DF ES GO MA MS MT MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO'.split(' ');
function paginaEmpresa(v) {
  return capa(v, { selo: 'Atendimento personalizado', titulo: 'Fale com a GTEX', texto: 'Entre em contato e compre os produtos das suas marcas favoritas direto com a gente! Envie os seus dados e o que deseja, que logo entraremos em contato.', trilha: [['onde-comprar', 'Onde comprar'], [null, 'Empresa / indústria']] })
  + `<section class="sec"><div class="wrap fale-in">
  <div><h2>Preencha os seus dados</h2><p>Nesta página coletamos dados pessoais necessários para nossa relação, conforme a <a href="https://www.gtexbrasil.com.br/politica-de-privacidade/" ${ext}>Política de Privacidade</a>.</p>
    <div class="sust-selos">${img('eureciclo', 'Selo eureciclo')}<p class="r-mini">Parceria eureciclo: compensação ambiental de resíduos equivalente a 15 piscinas olímpicas cheias.</p></div></div>
  <form class="form" action="mailto:${site.email}" method="post" enctype="text/plain" data-form-produto>
    <label>Assunto<input name="assunto" value="Quero comprar produtos GTEX"></label>
    <div class="duas"><label>Nome<input name="nome" required></label><label>E-mail<input type="email" name="email" required></label></div>
    <div class="duas"><label>Nome da empresa / indústria<input name="empresa" required></label><label>Telefone / celular<input name="telefone" inputmode="tel" required></label></div>
    <div class="tres"><label>CEP<input name="cep" inputmode="numeric"></label><label class="dupla">Endereço<input name="endereco"></label></div>
    <div class="tres"><label>Número<input name="numero"></label><label>Complemento<input name="complemento"></label><label>Bairro<input name="bairro"></label></div>
    <div class="duas"><label>Cidade<input name="cidade"></label><label>Estado<select name="estado"><option value="">Selecione</option>${UFS.map(u => `<option>${u}</option>`).join('')}</select></label></div>
    <label>Produtos de interesse<textarea name="produtos" rows="3" data-produto-campo></textarea></label>
    <button class="btn">Enviar ${ico('seta')}</button>
  </form>
</div></section>`;
}

// ---------- Trabalhe conosco ----------
function paginaTrabalhe(v) {
  return capa(v, { selo: 'Trabalhe conosco', titulo: 'Uma família distribuída por todo Brasil', texto: 'Nosso time está espalhado pelas regiões do país, e cada nova vaga é motivo de comemoração.', foto: v === 'a' ? 'equipe' : 'colaborador', trilha: [[null, 'Trabalhe conosco']], extra: '<div class="bts"><a class="btn" href="#form-trabalhe-conosco">Cadastre seu currículo</a></div>' })
  + `<section class="sec quem"><div class="wrap quem-in">
  <div class="quem-foto">${img(v === 'a' ? 'colaborador' : 'equipe', 'Colaboradores GTEX')}</div>
  <div><span class="selo">A GTEX é como um lar</span><h2>Juntos, levamos cuidado a milhões de lares</h2>
  <p>Valorizamos quem faz parte do time, com valores compartilhados e uma cultura que coloca as pessoas em primeiro lugar.</p>
  <ol class="val-lista">${valores.map(t => `<li>${t}</li>`).join('')}</ol></div>
</div></section>
<section class="sec" id="form-trabalhe-conosco"><div class="wrap fale-in">
  <div><span class="selo">Banco de talentos</span><h2>Envie o seu currículo</h2><p>Você poderá acompanhar o processo e receberá notícias diretamente no e-mail. Se preferir, mande por e-mail com o assunto "Currículo + nome da vaga de interesse".</p></div>
  <form class="form" action="mailto:${site.email}?subject=Curr%C3%ADculo" method="post" enctype="multipart/form-data">
    <fieldset><legend>Dados pessoais</legend>
      <div class="duas"><label>Nome<input name="nome" required></label><label>Sobrenome<input name="sobrenome" required></label></div>
      <div class="duas"><label>E-mail<input type="email" name="email" required></label><label>Telefone<input name="telefone" inputmode="tel" required></label></div>
      <div class="duas"><label>CPF (opcional)<input name="cpf" inputmode="numeric"></label><label>Data de nascimento<input type="date" name="nascimento"></label></div></fieldset>
    <fieldset><legend>Endereço</legend>
      <label>Endereço completo<input name="endereco"></label>
      <div class="tres"><label>Cidade<input name="cidade"></label><label>UF<select name="uf"><option value=""></option>${UFS.map(u => `<option>${u}</option>`).join('')}</select></label><label>CEP<input name="cep" inputmode="numeric"></label></div></fieldset>
    <fieldset><legend>Perfil profissional</legend>
      <div class="duas"><label>Cargo desejado<input name="cargo" required></label><label>Empresa atual<input name="empresa"></label></div>
      <div class="duas"><label>Anos de experiência<input name="experiencia" inputmode="numeric"></label><label>Escolaridade<select name="escolaridade"><option>Ensino fundamental</option><option>Ensino médio</option><option>Técnico</option><option>Superior incompleto</option><option>Superior completo</option><option>Pós-graduação</option><option>Mestrado</option><option>Doutorado</option></select></label></div>
      <label>Habilidades (separadas por vírgula)<input name="habilidades" required></label>
      <label>Objetivo profissional<textarea name="objetivo" rows="3" required></textarea></label>
      <label>LinkedIn ou portfólio<input name="linkedin" placeholder="seu-perfil"></label></fieldset>
    <label>Currículo (PDF, DOC ou DOCX, até 5 MB)<input type="file" name="curriculo" accept=".pdf,.doc,.docx" required></label>
    <label class="check"><input type="checkbox" required> Declaro que as informações são verdadeiras e aceito a Política de Privacidade.</label>
    <button class="btn">Enviar candidatura ${ico('seta')}</button>
  </form>
</div></section>`;
}

// ---------- Contato ----------
function paginaContato(v) {
  return capa(v, { selo: 'Fale conosco', titulo: 'Como podemos te ajudar?', texto: 'Escolha o canal certo para a sua dúvida. O SAC atende consumidores; fornecedores e clientes pessoa jurídica também falam com a gente por aqui.', trilha: [[null, 'Contato']] })
  + `<section class="sec canais-sec"><div class="wrap canais-grid">
  <a class="canal" href="tel:${site.foneHref}">${ico('fone')}<small>Telefone</small><b>${site.fone}</b></a>
  <a class="canal" href="mailto:${site.email}">${ico('mail')}<small>E-mail</small><b>${site.email}</b></a>
  <div class="canal txt">${ico('pessoas')}<b>SAC</b><p>Para consumidores.</p></div>
  <div class="canal txt">${ico('caminhao')}<b>Fornecedor</b><p>Dúvidas e informações sobre homologação de produtos.</p></div>
  <div class="canal txt">${ico('predio')}<b>Cliente pessoa jurídica</b><p>Atacadistas ou varejistas que abastecem ou querem abastecer suas lojas com as nossas marcas.</p></div>
</div></section>
<section class="sec faq" id="faq"><div class="wrap faq-in">
  <div><span class="selo">Perguntas frequentes</span><h2>Dúvidas sobre os produtos</h2><p>Não achou a resposta? Ligue ${site.fone} ou escreva para ${site.email}.</p></div>
  <div class="faq-lista">${faq.map(([q, r]) => `<details><summary>${q}${ico('mais')}</summary><p>${r}</p></details>`).join('')}</div>
</div></section>
${faleConosco(v)}`;
}

export function gerarVersao(v) {
  const pag = {};
  const add = (slug, titulo, desc, corpo, cls) => { pag[slug] = doc({ v, slug, titulo, desc, corpo, cls }); };
  add('index', 'Home', 'GTEX, holding de produtos de limpeza: Urca, Baby Soft, UFE Coco, Ruth Care, Classic e Amazon H2O, presentes em mais de 50% dos lares brasileiros.', v === 'a' ? homeA(v) : homeB(v), 'home');
  add('quem-somos', 'Quem somos', 'Mais de 50 anos de história levando cuidado aos lares brasileiros: propósito, números, história e valores da GTEX.', quemSomos(v));
  add('produtos', 'Produtos', `Catálogo GTEX com ${produtos.length} linhas de produtos de limpeza, com filtro por marca, categoria e tipo.`, catalogo(v));
  for (const p of produtos) add('produtos/' + p.slug, p.nome, `${p.nome}, da marca ${marca(p.marca).nome}. Embalagens: ${p.emb.map(e => e.r).join(', ')}.`, produto(v, p));
  for (const m of marcas) add(m.id, m.nome, `${m.titulo}. ${m.texto[0]}`, paginaMarca(v, m));
  for (const c of categorias) add(c.id, c.nome, `${c.h2} ${c.texto}`, paginaCategoria(v, c));
  add('fds', 'FDS', 'Fichas com Dados de Segurança dos produtos GTEX, por marca.', paginaFds(v));
  add('download', 'Download', 'Embalagens e logos oficiais das marcas GTEX para lojistas e parceiros.', paginaDownload(v));
  add('catalogos', 'Catálogos', 'Baixe os catálogos completos das marcas GTEX.', paginaCatalogos(v));
  add('onde-comprar', 'Onde comprar', 'Compre os produtos GTEX: loja on-line para consumidores e atendimento para empresas.', paginaOnde(v));
  add('onde-comprar/empresa', 'Onde comprar: empresa e indústria', 'Atendimento personalizado da GTEX para empresas, atacadistas, varejistas e indústrias.', paginaEmpresa(v));
  add('trabalhe-conosco', 'Trabalhe conosco', 'Junte-se ao time GTEX e transforme lares: envie o seu currículo.', paginaTrabalhe(v));
  add('contato', 'Contato', 'SAC GTEX 0800 727 2297, sac@gtexbrasil.com.br e perguntas frequentes.', paginaContato(v));
  return pag;
}
