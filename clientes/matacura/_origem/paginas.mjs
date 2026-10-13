// Páginas das duas versões. A home e o catálogo têm composição própria em cada versão; as demais mudam pelo estilo (a.css / b.css).
import { site, linhas, necessidades, produtos, historia, linhaDoTempo, politicas, numeros, lojas, representantes, destinatarios } from './conteudo.mjs';
import { esc, img, ico, linkDe, linha, daLinha, doc, cartao, chamada, cabecalho, paraQuem } from './comum.mjs';

const prod = slug => produtos.find(p => p.slug === slug);
const nomeLinha = l => (l.marca === 'Matacura' ? `Matacura ${l.nome}` : l.nome);

// Vídeo do YouTube que só carrega ao clicar (página leve).
const video = (id, titulo, capa = '') => `<button class="yt" data-yt="${id}" aria-label="Assistir: ${esc(titulo)}" style="${capa ? `--capa:url(/assets/img/${capa}.webp)` : `--capa:url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`}"><span class="yt-play">${ico('play')}</span><span class="yt-txt">${esc(titulo)}</span></button>`;

// Fileira de embalagens em pé (usada nos topos).
const fileira = (slugs, L) => `<div class="fileira">${slugs.map((s, i) => { const p = prod(s); return `<a href="${L('produtos/' + p.slug)}" class="fi" style="--c:${p.cor};--i:${i}">${img(p.foto, p.nome, 'width="180" height="420"')}</a>`; }).join('')}</div>`;

// ---------- HOME A: "Clássicos" (amarelo e preto, faixa do logo) ----------
function homeA(v) {
  const L = linkDe(v);
  const capa = ['talco-banho-seco-caes-e-gatos', 'shampoo-condicionador-hidratante', 'shampoo-sarnicida-antipulgas', 'aerossol-sarnicida', 'shampoo-neutro', 'spray-banho-seco-hipoalergenico'];
  const s = prod('shampoo-sarnicida-antipulgas');
  return `
<section class="hero-a">
  <div class="wrap hero-a-in">
    <div class="hero-a-txt">
      <span class="desde">Desde 1945</span>
      <h1>Os momentos com seu pet têm <span class="tarja">nossa marca</span></h1>
      <p>80 anos de qualidade e eficácia comprovada. Soluções de higiene, beleza e tratamento veterinário para cães, gatos e cavalos, fabricadas em Santa Catarina.</p>
      <div class="acoes"><a class="btn btn-escuro" href="${L('produtos')}">Ver os ${produtos.length} produtos ${ico('seta')}</a><a class="btn btn-linha" href="${L('onde-comprar')}">${ico('loja')} Onde comprar</a></div>
    </div>
    <div class="hero-a-vit">${fileira(capa, L)}<div class="prateleira" aria-hidden="true"></div></div>
  </div>
</section>

<section class="sec linhas-a">
  <div class="wrap">
    <div class="sec-head"><span class="eyebrow">Nossos produtos</span><h2>Quatro linhas presentes em milhares de lares brasileiros</h2></div>
    <div class="linhas-grade">
      ${linhas.map(l => { const ps = daLinha(l.id); return `<a class="linha-a" href="${L('produtos/linha/' + l.id)}" style="--c:${l.cor}">
        <div class="la-topo">${img('l-' + l.id, nomeLinha(l), 'width="180" height="60"')}<span class="la-n">${ps.length} ${ps.length > 1 ? 'produtos' : 'produto'}</span></div>
        <div class="la-fotos">${ps.slice(0, 4).map(p => img(p.foto, '', `width="90" height="200" style="--c:${p.cor}"`)).join('')}</div>
        <p>${esc(l.texto)}</p>
        <span class="la-ver">Ver a linha ${ico('seta')}</span>
      </a>`; }).join('')}
    </div>
  </div>
</section>

<section class="sec necessidade-a">
  <div class="wrap">
    <div class="sec-head lado"><div><span class="eyebrow">Escolha pela necessidade</span><h2>O que o seu pet precisa hoje?</h2></div><p>Cada produto Matacura tem uma indicação clara. Comece pelo cuidado e veja os produtos certos.</p></div>
    <div class="nec-grade">${necessidades.map((n, i) => `<a class="nec" href="${L('produtos')}?para=${n.id}"><span class="nec-n">${String(i + 1).padStart(2, '0')}</span>${ico(n.ico)}<b>${n.nome}</b><small>${n.texto}</small></a>`).join('')}</div>
  </div>
</section>

<section class="sec classico">
  <div class="wrap classico-in">
    <div class="cl-palco" style="--c:${s.cor}">
      <span class="cl-ano" aria-hidden="true">1945</span>
      ${img(s.foto, s.nome, 'width="300" height="700"')}
      ${img('p-sabonete-sarnicida', 'Sabonete Matacura Sarnicida e Antipulgas', 'class="cl-sab" width="300" height="200"')}
    </div>
    <div class="cl-txt">
      <span class="eyebrow">O clássico da família</span>
      <h2>Sarnicida e antipulgas desde o primeiro registro</h2>
      <p>O Sabonete Sarnicida Matacura foi registrado em 26 de outubro de 1945, no primeiro livro de registros de produtos veterinários do Ministério da Agricultura. A mesma confiança hoje vem em shampoo, condicionador, aerossol e sabonete, com embalagem nova.</p>
      <ul class="fatos">
        <li><b>Permetrina 0,3%</b><span>princípio ativo do shampoo</span></li>
        <li><b>3 minutos</b><span>de ação antes do enxágue</span></li>
        <li><b>Licença nº 6.449</b><span>Ministério da Agricultura</span></li>
      </ul>
      <div class="acoes"><a class="btn btn-escuro" href="${L('produtos/' + s.slug)}">Ver o shampoo ${ico('seta')}</a><a class="btn btn-linha" href="${L('produtos/linha/classicos')}">Linha Clássicos</a></div>
    </div>
  </div>
</section>

<section class="sec pm-a">
  <div class="wrap">
    <div class="sec-head lado"><div>${img('l-pet-moments', 'Matacura Pet Moments', 'width="180" height="60" class="sec-logo"')}<h2>Banho a seco, hidratação e pele sensível</h2></div><p>A linha Pet Moments cuida da rotina: talcos e sprays que limpam sem água e shampoos suaves para banhos frequentes.</p></div>
    <div class="trilho" data-trilho>${daLinha('pet-moments').map(p => cartao(p, v, 'prateleira')).join('')}</div>
    <div class="trilho-nav"><button data-trilho-ant aria-label="Anterior">${ico('seta')}</button><button data-trilho-prox aria-label="Próximo">${ico('seta')}</button><a href="${L('produtos/linha/pet-moments')}">Ver a linha Pet Moments ${ico('seta')}</a></div>
  </div>
</section>

<section class="sec historia-a">
  <div class="wrap hist-in">
    <div class="hist-txt">
      <span class="eyebrow claro">Nossa história</span>
      <h2>De Porto Alegre a São Miguel do Oeste, 80 anos cuidando dos animais</h2>
      <p>A história da Matacura acompanha a evolução da indústria veterinária brasileira. Desde 1969 em São Miguel do Oeste (SC), a Agro Industrial Catarinense mantém a tradição, a inovação e o cuidado com os animais como valores centrais.</p>
      <a class="btn btn-am" href="${L('empresa/historia')}">Ver a linha do tempo ${ico('seta')}</a>
    </div>
    <div class="nums">${numeros.map(([n, t, s]) => `<div class="n"><b>${n}</b><span>${t}</span><small>${s}</small></div>`).join('')}</div>
    <figure class="hist-foto">${img('f-fabrica', 'Vista aérea da fábrica da Matacura em São Miguel do Oeste', 'width="690" height="302"')}<figcaption>Fábrica em São Miguel do Oeste (SC)</figcaption></figure>
  </div>
</section>

<section class="sec video-a"><div class="wrap video-in">
  <div><span class="eyebrow">Vídeo institucional</span><h2>Conheça a Matacura por dentro</h2><p>Veja como nascem os produtos Matacura, da fábrica em Santa Catarina até a casa de milhares de famílias.</p></div>
  ${video(site.video, 'Vídeo institucional Matacura')}
</div></section>
${chamada(v)}`;
}

// ---------- HOME B: "Momentos" (fotos de tutores, creme e amarelo, cartões arredondados) ----------
function homeB(v) {
  const L = linkDe(v);
  return `
<section class="hero-b">
  <div class="wrap hero-b-in">
    <div class="hero-b-txt">
      <span class="selo-m">${img('icone-m', '', 'width="48" height="48"')}<span>Matacura desde 1945</span></span>
      <h1>Os momentos com seu pet têm nossa marca!</h1>
      <p>Há 80 anos a Matacura cuida da higiene, da beleza e da saúde de cães e gatos, com qualidade e eficácia comprovada.</p>
      <div class="acoes"><a class="btn btn-escuro" href="${L('produtos')}">Conhecer os produtos ${ico('seta')}</a><a class="btn btn-linha" href="${site.catalogo}" target="_blank" rel="noopener">${ico('baixar')} Catálogo em PDF</a></div>
    </div>
    <figure class="hero-b-fotos">${img('f-momentos', 'Famílias com seus cães e gatos no Instagram @matacuraoficial', 'width="702" height="344" fetchpriority="high" loading="eager"')}
      <div class="flutua f1">${img('p-hidratante', '', 'width="90" height="210"')}</div><div class="flutua f2">${img('p-talco-gatos', '', 'width="90" height="210"')}</div>
    </figure>
  </div>
</section>

<section class="atalhos-b"><div class="wrap atalhos-in">
  ${[['icone-m', 'Conheça a Matacura', '80 anos de qualidade e eficácia comprovada.', 'empresa'], ['', 'Catálogo de produtos', 'Todos os produtos, com indicação e modo de usar.', 'produtos'], ['', 'Onde encontrar', 'Presentes em todos os estados brasileiros.', 'onde-comprar'], ['', 'Representantes', 'Encontre o representante mais próximo.', 'representantes']]
    .map(([im, t, d, s], i) => `<a class="atalho" href="${L(s)}"><span class="at-ico">${im ? img(im, '', 'width="40" height="40"') : ico(['', 'doc', 'pin', 'pessoas'][i])}</span><span><b>${t}</b><small>${d}</small></span>${ico('seta', 'at-seta')}</a>`).join('')}
</div></section>

<section class="sec linhas-b">
  <div class="wrap">
    <div class="sec-head centro"><span class="eyebrow">Nossas linhas</span><h2>Um cuidado para cada momento</h2><p>As linhas de produtos Matacura estão presentes em milhares de lares brasileiros.</p></div>
    <div class="abas" role="tablist">${linhas.map((l, i) => `<button role="tab" aria-selected="${i === 0}" data-aba="${l.id}">${img('l-' + l.id, nomeLinha(l), 'width="150" height="50"')}</button>`).join('')}</div>
    ${linhas.map((l, i) => `<div class="aba-painel" data-painel="${l.id}"${i ? ' hidden' : ''} style="--c:${l.cor}">
      <div class="ap-txt"><h3>${esc(nomeLinha(l))}</h3><p class="ap-ass">${esc(l.assinatura)}</p><p>${esc(l.texto)}</p><a class="btn btn-escuro" href="${L('produtos/linha/' + l.id)}">Ver ${daLinha(l.id).length > 1 ? `os ${daLinha(l.id).length} produtos` : 'o produto'} ${ico('seta')}</a></div>
      <div class="ap-grade">${daLinha(l.id).slice(0, 6).map(p => cartao(p, v, 'mini')).join('')}</div>
    </div>`).join('')}
  </div>
</section>

<section class="sec banho-b">
  <div class="wrap banho-in">
    <div class="banho-txt">
      <span class="eyebrow">Novidade Pet Moments</span>
      <h2>Banho a seco: limpo e cheiroso, sem o estresse da água</h2>
      <p>Para dias frios, viagens, recuperação pós-cirúrgica (com orientação do médico-veterinário) ou o intervalo entre banhos. Talcos e sprays para cães e gatos, inclusive para pele sensível.</p>
      <ol class="passos-b">
        <li><b>Aplique</b><span>o talco ou borrife o spray a 15 cm da pelagem</span></li>
        <li><b>Espalhe</b><span>com a mão, um pano ou escova, sem molhar</span></li>
        <li><b>Escove</b><span>para tirar o excesso. Não precisa enxaguar</span></li>
      </ol>
    </div>
    <div class="banho-vit">${daLinha('pet-moments').filter(p => p.tags.includes('banho-seco')).map(p => `<a href="${L('produtos/' + p.slug)}" style="--c:${p.cor};--c2:${p.cor2}">${img(p.foto, p.nome, 'width="120" height="280"')}<small>${esc(p.curto.replace('Talco ', '').replace('Spray ', 'Spray '))}</small></a>`).join('')}</div>
  </div>
</section>

<section class="sec nec-b">
  <div class="wrap">
    <div class="sec-head centro"><span class="eyebrow">Escolha pela necessidade</span><h2>Do que o seu pet precisa?</h2></div>
    <div class="nec-b-grade">${necessidades.map(n => { const ps = produtos.filter(p => p.tags.includes(n.id)); return `<a class="nb" href="${L('produtos')}?para=${n.id}"><span class="nb-ico">${ico(n.ico)}</span><b>${n.nome}</b><small>${ps.length} ${ps.length > 1 ? 'produtos' : 'produto'}</small><span class="nb-fotos">${ps.slice(0, 3).map(p => img(p.foto, '', 'width="40" height="90"')).join('')}</span></a>`; }).join('')}</div>
  </div>
</section>

<section class="sec sobre-b">
  <div class="wrap sobre-in">
    <figure class="sobre-foto">${img('f-fabrica', 'Vista aérea da fábrica da Matacura', 'width="690" height="302"')}<figcaption><b>+5.000 m²</b> de estrutura industrial em São Miguel do Oeste (SC)</figcaption></figure>
    <div class="sobre-txt">
      <span class="eyebrow">Sobre a Matacura</span>
      <h2>Uma indústria catarinense com 80 anos de tradição</h2>
      <p>A Matacura fornece soluções diversificadas destinadas à higiene, beleza e tratamento veterinário, proporcionando saúde e bem-estar a toda a família. No ano em que o Sabonete Matacura completou 80 anos de registro, a marca ganhou novo posicionamento, com as linhas Clássicos desde 1945 e Pet Moments.</p>
      <div class="marcos">${[['1945', 'Registro do Sabonete Sarnicida Matacura'], ['1969', 'Fábrica em São Miguel do Oeste (SC)'], ['1999', 'Lançamento da linha Cão Fiel'], ['2025', 'Nova marca e linha Pet Moments']].map(([a, t]) => `<div><b>${a}</b><span>${t}</span></div>`).join('')}</div>
      <a class="btn btn-escuro" href="${L('empresa')}">Conhecer a empresa ${ico('seta')}</a>
    </div>
  </div>
</section>

<section class="sec video-b"><div class="wrap">${video(site.video, 'Assista ao vídeo institucional da Matacura')}</div></section>

<section class="sec insta-b"><div class="wrap insta-in">
  <div><span class="eyebrow">@matacuraoficial</span><h2>Compartilhe os momentos com o seu pet</h2><p>Siga a Matacura no Instagram e marque a gente nas fotos do banho.</p></div>
  <a class="btn btn-escuro" href="${site.redes[0][1]}" target="_blank" rel="noopener">${ico('instagram')} Seguir no Instagram</a>
</div></section>
${chamada(v)}`;
}

// ---------- CATÁLOGO ----------
function catalogo(v) {
  const L = linkDe(v);
  const filtros = `<div class="filtros" role="toolbar" aria-label="Filtrar produtos">
    <div class="f-grupo"><span>Linha</span><button class="on" data-f-linha="todas">Todas <small>${produtos.length}</small></button>${linhas.map(l => `<button data-f-linha="${l.id}">${esc(l.nome)} <small>${daLinha(l.id).length}</small></button>`).join('')}</div>
    <div class="f-grupo"><span>Necessidade</span><button class="on" data-f-tag="todas">Todas</button>${necessidades.map(n => `<button data-f-tag="${n.id}">${ico(n.ico)}${n.nome}</button>`).join('')}<button data-f-tag="caes">${ico('pata')}Cães</button><button data-f-tag="cavalos">${ico('pata')}Cavalos</button></div>
  </div>`;
  const blocos = linhas.map(l => `<section class="cat-bloco" data-bloco="${l.id}" id="${l.id}" style="--lc:${l.cor}">
    <header class="cb-cab">${img('l-' + l.id, nomeLinha(l), 'width="180" height="60"')}<div><h2>${esc(nomeLinha(l))}</h2><p>${esc(l.assinatura)}</p></div><a href="${L('produtos/linha/' + l.id)}">Sobre a linha ${ico('seta')}</a></header>
    <div class="cat-grade">${daLinha(l.id).map(p => cartao(p, v, v === 'a' ? 'prateleira' : 'lista')).join('')}</div>
  </section>`).join('');
  return doc({ v, slug: 'produtos', titulo: 'Produtos', descricao: `Catálogo Matacura: ${produtos.length} produtos de higiene, beleza e tratamento para cães, gatos e cavalos, nas linhas Clássicos, Pet Moments, Cão Fiel e Saralogo.`,
    corpo: `${cabecalho(v, { titulo: 'Nossos produtos', sub: `${produtos.length} produtos em quatro linhas, para cães, gatos e cavalos. Filtre pela linha ou pelo cuidado que o seu pet precisa.`, trilha: [[null, 'Produtos']],
      extra: `<a class="cab-pdf" href="${site.catalogo}" target="_blank" rel="noopener">${ico('baixar')} Baixar o catálogo em PDF</a>` })}
<section class="sec catalogo"><div class="wrap">${filtros}<p class="f-vazio" data-vazio hidden>Nenhum produto com esses filtros. <button data-limpar>Limpar filtros</button></p>${blocos}</div></section>
${chamada(v)}` });
}

// ---------- LINHA ----------
function paginaLinha(v, l) {
  const L = linkDe(v);
  const ps = daLinha(l.id);
  const outras = linhas.filter(x => x.id !== l.id);
  return doc({ v, slug: 'produtos/linha/' + l.id, titulo: nomeLinha(l), descricao: l.texto, classe: 'pg-linha',
    corpo: `<section class="linha-hero" style="--c:${l.cor}"><div class="wrap lh-in">
  <div class="lh-txt"><nav class="trilha"><a href="${L('index')}">Início</a><a href="${L('produtos')}">Produtos</a><span>${esc(l.nome)}</span></nav>
    <div class="lh-logo">${img('l-' + l.id, nomeLinha(l), 'width="220" height="74"')}</div>
    <h1>${esc(nomeLinha(l))}</h1><p class="lh-ass">${esc(l.assinatura)}</p><p>${esc(l.texto)}</p></div>
  <div class="lh-vit">${ps.slice(0, 5).map((p, i) => `<a href="${L('produtos/' + p.slug)}" style="--i:${i}">${img(p.foto, p.nome, 'width="160" height="380"')}</a>`).join('')}</div>
</div></section>
<section class="sec"><div class="wrap">
  <div class="sec-head lado"><h2>${ps.length} ${ps.length > 1 ? 'produtos' : 'produto'} na linha</h2><a class="link-seta" href="${L('produtos')}">Ver o catálogo completo ${ico('seta')}</a></div>
  <div class="cat-grade">${ps.map(p => cartao(p, v, v === 'a' ? 'prateleira' : 'lista')).join('')}</div>
</div></section>
<section class="sec outras"><div class="wrap"><h2 class="h-peq">Outras linhas</h2><div class="outras-grade">${outras.map(o => `<a href="${L('produtos/linha/' + o.id)}" style="--c:${o.cor}">${img('l-' + o.id, nomeLinha(o), 'width="150" height="50"')}<span>${daLinha(o.id).length} ${daLinha(o.id).length > 1 ? 'produtos' : 'produto'} ${ico('seta')}</span></a>`).join('')}</div></div></section>
${chamada(v)}` });
}

// ---------- PRODUTO ----------
function paginaProduto(v, p) {
  const L = linkDe(v);
  const l = linha(p.linha);
  const fotos = [[p.foto, p.nova ? 'Nova embalagem' : 'Embalagem'], ...(p.foto2 ? [[p.foto2, 'Embalagem anterior']] : [])];
  const irmaos = daLinha(p.linha).filter(x => x.slug !== p.slug);
  const parecidos = produtos.filter(x => x.linha !== p.linha && x.tags.some(t => p.tags.includes(t))).slice(0, 4);
  const rel = [...irmaos, ...parecidos].slice(0, 4);
  const ficha = [['Código', p.codigo], ['Apresentação', p.apresentacao], ['Linha', nomeLinha(l)], ['Indicado para', p.para.map(x => ({ caes: 'Cães', gatos: 'Gatos', cavalos: 'Cavalos' }[x])).join(', ')], ['Registro', p.licenca], ['Responsável técnico', p.rt]].filter(x => x[1]);
  const corpo = `
<section class="prod-topo" style="--c:${p.cor};--c2:${p.cor2}">
  <div class="wrap">
    <nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a><a href="${L('produtos')}">Produtos</a><a href="${L('produtos/linha/' + l.id)}">${esc(l.nome)}</a><span>${esc(p.curto)}</span></nav>
    <div class="pt-in">
      <div class="galeria" data-galeria>
        <div class="gal-palco${p.caixa ? ' caixa' : ''}">${fotos.map(([f, t], i) => `<figure data-foto="${f}" class="${i ? '' : 'on'}">${img(f, `${p.nome}, ${t.toLowerCase()}`, `width="400" height="900"${i ? '' : ' loading="eager" fetchpriority="high"'}`)}</figure>`).join('')}
          ${p.nova ? '<span class="selo-nova">Nova embalagem</span>' : ''}</div>
        ${fotos.length > 1 ? `<div class="gal-minis">${fotos.map(([f, t], i) => `<button data-mini="${f}" class="${i ? '' : 'on'}" aria-label="${t}">${img(f, '', 'width="60" height="120"')}<small>${t}</small></button>`).join('')}</div>` : ''}
      </div>
      <div class="pt-txt">
        <a class="pt-linha" href="${L('produtos/linha/' + l.id)}">${img('l-' + l.id, nomeLinha(l), 'width="132" height="44"')}</a>
        <h1>${esc(p.nome)}</h1>
        ${p.destaque ? `<p class="pt-dest">${esc(p.destaque)}</p>` : ''}
        <p class="pt-ind">${esc(p.indicacao)}</p>
        <div class="pt-chips"><span class="chip-c">${esc(p.tipo)}</span><span class="chip-c">${esc(p.conteudo)}</span>${paraQuem(p)}${p.codigo ? `<span class="chip-c">Cód. ${esc(p.codigo)}</span>` : ''}</div>
        ${p.ativo ? `<div class="pt-ativo">${ico('gota')}<div><small>${/[;:]|,.*,/.test(p.ativo) ? 'Composição' : 'Princípio ativo'}</small><span>${esc(p.ativo)}</span></div></div>` : ''}
        <div class="acoes"><a class="btn btn-escuro" href="${L('onde-comprar')}">${ico('loja')} Onde comprar</a><a class="btn btn-linha" href="${L('representantes')}">${ico('pessoas')} Revender</a></div>
        <p class="pt-uso">${ico('alerta')} Uso veterinário. Leia as instruções da embalagem antes de usar.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec prod-info"><div class="wrap pi-in">
  <nav class="pi-nav" aria-label="Nesta página">${[p.beneficios.length && ['beneficios', 'Benefícios'], p.modo.length && ['modo', 'Modo de usar'], p.precaucoes.length && ['precaucoes', 'Precauções'], ['ficha', 'Ficha técnica'], p.video && ['video', 'Vídeo']].filter(Boolean).map(([id, t]) => `<a href="#${id}">${t}</a>`).join('')}</nav>
  <div class="pi-cont">
    ${p.beneficios.length ? `<section id="beneficios" class="pi-bloco"><h2>Benefícios</h2><ul class="benef">${p.beneficios.map(b => { const [t, ...r] = b.split(/:\s/); return `<li>${ico('check')}<span>${r.length ? `<b>${esc(t)}</b> ${esc(r.join(': '))}` : esc(b)}</span></li>`; }).join('')}</ul></section>` : ''}
    ${p.modo.length ? `<section id="modo" class="pi-bloco"><h2>Modo de usar</h2><ol class="modo">${p.modo.map((m, i) => `<li style="--i:${i}"><span class="mn">${i + 1}</span><p>${esc(m)}</p></li>`).join('')}</ol></section>` : ''}
    ${p.precaucoes.length ? `<section id="precaucoes" class="pi-bloco"><details class="prec"><summary><h2>Precauções</h2><span>${p.precaucoes.length} itens ${ico('seta')}</span></summary><ul>${p.precaucoes.map(x => `<li>${esc(x)}</li>`).join('')}</ul></details></section>` : ''}
    <section id="ficha" class="pi-bloco"><h2>Ficha técnica</h2><dl class="ficha">${ficha.map(([k, val]) => `<div><dt>${k}</dt><dd>${esc(val)}</dd></div>`).join('')}${p.ativo ? `<div class="larga"><dt>${/[;:]|,.*,/.test(p.ativo) ? 'Composição' : 'Princípio ativo'}</dt><dd>${esc(p.ativo)}</dd></div>` : ''}</dl></section>
    ${p.video ? `<section id="video" class="pi-bloco"><h2>Vídeo</h2>${video(p.video, p.nome)}</section>` : ''}
  </div>
</div></section>

<section class="sec relacionados"><div class="wrap">
  <div class="sec-head lado"><h2>${irmaos.length ? 'Combine com' : 'Veja também'}</h2><a class="link-seta" href="${L('produtos/linha/' + l.id)}">Toda a linha ${esc(l.nome)} ${ico('seta')}</a></div>
  <div class="cat-grade quatro">${rel.map(x => cartao(x, v, 'mini')).join('')}</div>
</div></section>
${chamada(v)}`;
  return doc({ v, slug: 'produtos/' + p.slug, titulo: p.nome, descricao: `${p.nome}: ${p.resumo}`, corpo, classe: 'pg-produto' });
}

// ---------- EMPRESA ----------
function empresa(v) {
  const L = linkDe(v);
  const sub = `<nav class="sub-abas"><a href="${L('empresa')}" aria-current="page">Sobre a Matacura</a><a href="${L('empresa/historia')}">Histórico</a><a href="${L('empresa')}#politicas">Políticas da empresa</a></nav>`;
  return doc({ v, slug: 'empresa', titulo: 'Empresa', descricao: 'Matacura, Agro Industrial Catarinense: 80 anos de higiene, beleza e tratamento veterinário, com fábrica de mais de 5.000 m² em São Miguel do Oeste (SC).',
    corpo: `${cabecalho(v, { titulo: 'Sobre a Matacura', sub: 'Uma indústria catarinense que acompanha a evolução da indústria veterinária brasileira desde 1945.', trilha: [[null, 'Empresa']], extra: sub })}
<section class="sec emp-intro"><div class="wrap emp-in">
  <figure class="emp-foto">${img('f-fabrica', 'Vista aérea da fábrica da Matacura em São Miguel do Oeste', 'width="690" height="302"')}<div class="emp-selo"><img src="/assets/img/logo.png" alt="Matacura desde 1945" width="200" height="87" loading="lazy"></div></figure>
  <div class="emp-txt">${historia.slice(0, 3).map(t => `<p>${esc(t)}</p>`).join('')}</div>
</div></section>
<section class="sec nums-faixa"><div class="wrap nums">${numeros.map(([n, t, s]) => `<div class="n"><b>${n}</b><span>${t}</span><small>${s}</small></div>`).join('')}</div></section>
<section class="sec"><div class="wrap emp-dois">
  <div class="emp-txt">${historia.slice(3, 7).map(t => `<p>${esc(t)}</p>`).join('')}<p class="emp-ass">${esc(historia[7] || site.slogan)}</p></div>
  <div>${video(site.video, 'Vídeo institucional Matacura')}<a class="link-seta" href="${L('empresa/historia')}">Ver a linha do tempo completa ${ico('seta')}</a></div>
</div></section>
<section class="sec politicas" id="politicas"><div class="wrap">
  <div class="sec-head"><span class="eyebrow">Políticas da empresa</span><h2>Missão e valores</h2></div>
  <div class="pol-in">
    <div class="missao"><h3>Missão</h3><p>${politicas.missao}</p></div>
    <div class="valores"><h3>Valores</h3><ul>${politicas.valores.map(x => `<li>${ico('check')}${x}</li>`).join('')}</ul></div>
  </div>
  <div class="pol-grade">${politicas.blocos.map(([t, d], i) => `<article class="pol"><span>${['escudo', 'luva', 'fabrica', 'folha'][i] ? ico(['escudo', 'luva', 'fabrica', 'folha'][i]) : ''}</span><h3>Política de ${t.toLowerCase()}</h3><p>${d}</p></article>`).join('')}</div>
</div></section>
${chamada(v)}` });
}

function historico(v) {
  const L = linkDe(v);
  const sub = `<nav class="sub-abas"><a href="${L('empresa')}">Sobre a Matacura</a><a href="${L('empresa/historia')}" aria-current="page">Histórico</a><a href="${L('empresa')}#politicas">Políticas da empresa</a></nav>`;
  const extra = [{ ano: '2025', texto: 'No ano em que o Sabonete Matacura completa 80 anos de registro, a marca ganha novo posicionamento e passa a ser a identidade principal da empresa, com as linhas Clássicos desde 1945 e Pet Moments.', foto: '' }];
  return doc({ v, slug: 'empresa/historia', titulo: 'Nossa história', descricao: 'Linha do tempo da Matacura, de 1945 aos dias de hoje.',
    corpo: `${cabecalho(v, { titulo: 'Nossa história', sub: 'De 1945 aos dias de hoje: os marcos da Matacura e da Agro Industrial Catarinense.', trilha: [['empresa', 'Empresa'], [null, 'Histórico']], extra: sub })}
<section class="sec"><div class="wrap">
  <ol class="tempo">${[...linhaDoTempo, ...extra].map((t, i) => `<li class="${i % 2 ? 'dir' : 'esq'}"><span class="t-ano">${t.ano}</span><div class="t-card">${t.foto ? img(t.foto, `Matacura em ${t.ano}`, 'width="475" height="235"') : `<div class="t-novo">${img('p-shampoo-sarnicida', '', 'width="80" height="190"')}${img('p-talco-caes-gatos', '', 'width="80" height="190"')}${img('p-hidratante', '', 'width="80" height="190"')}</div>`}<p>${esc(t.texto)}</p></div></li>`).join('')}</ol>
  <p class="nota">Linha do tempo e fotos do site atual. O texto institucional cita a compra das marcas da Indústria Salubres do Brasil pela família Zanette em 1962, e a linha do tempo marca o início em 1945, ano do registro do Sabonete Matacura.</p>
</div></section>
${chamada(v)}` });
}

// ---------- ONDE COMPRAR ----------
function ondeComprar(v) {
  const L = linkDe(v);
  return doc({ v, slug: 'onde-comprar', titulo: 'Onde comprar', descricao: 'Compre Matacura e Cão Fiel na Petz, na Petlove e em pet shops e agropecuárias de todos os estados.',
    corpo: `${cabecalho(v, { titulo: 'Onde comprar', sub: 'Os produtos Matacura estão em pet shops, agropecuárias, supermercados e lojas online de todo o Brasil.', trilha: [[null, 'Onde comprar']] })}
<section class="sec"><div class="wrap oc-in">
  <div class="oc-lojas">
    <h2>Lojas online</h2>
    ${lojas.map(m => `<div class="oc-marca"><h3>${m.marca === 'Matacura' ? img('l-classicos', 'Matacura', 'width="150" height="60"') : img('l-cao-fiel', 'Cão Fiel', 'width="150" height="50"')}<span>${m.marca}</span></h3><div class="oc-links">${m.links.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener"><b>${n}</b><span>Ver produtos ${m.marca} ${ico('seta')}</span></a>`).join('')}</div></div>`).join('')}
    <p class="nota">A Matacura não garante a disponibilidade dos produtos nos pontos de venda.</p>
  </div>
  <aside class="oc-lado">
    <div class="oc-card am"><h3>Não achou na sua cidade?</h3><p>Fale com o representante da sua região. Ele indica a loja mais próxima ou atende a sua revenda.</p><a class="btn btn-escuro" href="${L('representantes')}">${ico('pessoas')} Ver representantes</a></div>
    <div class="oc-card"><h3>Tem uma loja e quer vender Matacura?</h3><p>Cadastre o seu estabelecimento e entraremos em contato.</p><a class="btn btn-linha" href="${L('representantes')}#revender">Cadastrar minha loja</a></div>
    <div class="oc-card"><h3>Atendimento</h3><p><a href="tel:${site.sac0800Href}">${ico('fone')} ${site.sac0800}</a><br><a href="${site.zap}" target="_blank" rel="noopener">${ico('zap')} WhatsApp ${site.fone}</a></p></div>
  </aside>
</div></section>` });
}

// ---------- REPRESENTANTES ----------
function paginaRepresentantes(v) {
  const L = linkDe(v);
  return doc({ v, slug: 'representantes', titulo: 'Representantes', descricao: 'Representantes Matacura por estado, para atacados pet veterinários, supermercados, grandes redes e atacarejos.',
    corpo: `${cabecalho(v, { titulo: 'Representantes', sub: 'Encontre o representante Matacura mais próximo de você. Atendimento a atacados pet veterinários, supermercados, grandes redes e atacarejos.', trilha: [[null, 'Representantes']] })}
<section class="sec"><div class="wrap">
  <div class="uf-abas" role="tablist">${representantes.map((r, i) => `<button role="tab" aria-selected="${i === 0}" data-uf="${r.uf}"><b>${r.uf}</b><span>${r.estado}</span></button>`).join('')}<button role="tab" aria-selected="false" data-uf="outros"><b>+</b><span>Demais estados</span></button></div>
  ${representantes.map((r, i) => `<div class="uf-painel" data-uf-painel="${r.uf}"${i ? ' hidden' : ''}><div class="rep-grade">${r.lista.map(x => `<article class="rep"><h3>${esc(x.contato)}</h3><p class="rep-emp">${esc(x.empresa)}</p>${x.atuacao ? `<p class="rep-at">${esc(x.atuacao)}</p>` : ''}<p class="rep-c">${x.telefone.split(' / ').map(t => `<a href="tel:+55${t.replace(/\D/g, '')}">${ico('fone')} ${t}</a>`).join('')}${x.email ? `<a href="mailto:${x.email}">${ico('mail')} ${x.email}</a>` : ''}</p></article>`).join('')}</div></div>`).join('')}
  <div class="uf-painel" data-uf-painel="outros" hidden><div class="rep-grade"><article class="rep"><h3>Comercial, demais estados</h3><p class="rep-at">Para os demais estados, fale direto com a equipe comercial da Matacura.</p><p class="rep-c"><a href="tel:${site.foneHref}">${ico('fone')} ${site.fone}</a><a href="${site.zap}" target="_blank" rel="noopener">${ico('zap')} WhatsApp</a><a href="mailto:${site.email}">${ico('mail')} ${site.email}</a></p></article></div></div>
</div></section>
<section class="sec revender" id="revender"><div class="wrap rv-in">
  <div><span class="eyebrow">Seja um revendedor</span><h2>Quer vender Matacura na sua loja?</h2><p>Pet shops, agropecuárias, clínicas, supermercados e atacados. Conte sobre a sua empresa e o representante da sua região entra em contato.</p>
    <ul class="lista-check">${['80 anos de marca conhecida pelos tutores', `${produtos.length} produtos em quatro linhas`, 'Nova embalagem e linha Pet Moments', 'Fábrica própria em Santa Catarina'].map(x => `<li>${ico('check')}${x}</li>`).join('')}</ul></div>
  <form class="form" data-form="revenda" data-para="${site.email}" data-assunto="Quero revender Matacura">
    <label>Empresa<input name="Empresa" required autocomplete="organization"></label>
    <label>CNPJ<input name="CNPJ" inputmode="numeric"></label>
    <label>Seu nome<input name="Nome" required autocomplete="name"></label>
    <label>Telefone ou WhatsApp<input name="Telefone" required type="tel" autocomplete="tel"></label>
    <label>Cidade / UF<input name="Cidade" required></label>
    <label>Tipo de loja<select name="Tipo"><option>Pet shop</option><option>Agropecuária</option><option>Clínica veterinária</option><option>Supermercado ou rede</option><option>Atacado pet veterinário</option><option>Outro</option></select></label>
    <label class="larga">Mensagem<textarea name="Mensagem" rows="3"></textarea></label>
    <button class="btn btn-escuro larga" type="submit">Enviar cadastro ${ico('seta')}</button>
    <p class="form-nota larga">O envio abre o seu e-mail com a mensagem pronta para ${site.email}.</p>
  </form>
</div></section>` });
}

// ---------- CONTATO ----------
function contato(v) {
  return doc({ v, slug: 'contato', titulo: 'Contato', descricao: 'Fale com a Matacura: (49) 3622-0090, 0800 642 2905, WhatsApp e formulário. Rua Oiapoc, 1085, São Miguel do Oeste (SC).',
    corpo: `${cabecalho(v, { titulo: 'Contato', sub: 'Preencha o formulário com a sua solicitação e enviaremos o retorno em breve.', trilha: [[null, 'Contato']] })}
<section class="sec"><div class="wrap ct-in">
  <form class="form" data-form="contato" data-para="${site.email}" data-assunto="Contato pelo site">
    <label>Nome<input name="Nome" required autocomplete="name"></label>
    <label>Telefone<input name="Telefone" type="tel" autocomplete="tel"></label>
    <label>E-mail<input name="E-mail" type="email" required autocomplete="email"></label>
    <label>Cidade / Estado<input name="Cidade"></label>
    <label class="larga">Destinatário<select name="Destinatário">${destinatarios.filter(d => d !== 'Desenvolvedor do Site').map(d => `<option${d === 'Atendimento' ? ' selected' : ''}>${d}</option>`).join('')}</select></label>
    <label class="larga">Mensagem<textarea name="Mensagem" rows="5" required></textarea></label>
    <button class="btn btn-escuro larga" type="submit">Enviar mensagem ${ico('seta')}</button>
    <p class="form-nota larga">O envio abre o seu e-mail com a mensagem pronta para ${site.email}.</p>
  </form>
  <aside class="ct-lado">
    <a class="ct-card" href="tel:${site.sac0800Href}">${ico('fone')}<span><small>Ligação gratuita</small>${site.sac0800}</span></a>
    <a class="ct-card" href="tel:${site.foneHref}">${ico('fone')}<span><small>Telefone</small>${site.fone}</span></a>
    <a class="ct-card zap" href="${site.zap}" target="_blank" rel="noopener">${ico('zap')}<span><small>WhatsApp</small>${site.fone}</span></a>
    <a class="ct-card" href="mailto:${site.email}">${ico('mail')}<span><small>E-mail</small>${site.email}</span></a>
    <a class="ct-card" href="${site.mapa}" target="_blank" rel="noopener">${ico('pin')}<span><small>Fábrica e escritório</small>${site.endereco}, ${site.cidade}, CEP ${site.cep}</span></a>
    <div class="redes-ct">${site.redes.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n}">${ico(n.toLowerCase())}</a>`).join('')}</div>
  </aside>
</div></section>
<section class="mapa"><iframe title="Mapa: Matacura em São Miguel do Oeste" src="${site.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>` });
}

export function paginas(v) {
  const home = v === 'a' ? homeA(v) : homeB(v);
  const out = {
    index: doc({ v, slug: 'index', titulo: 'Higiene e cuidado para cães e gatos desde 1945', descricao: 'Matacura: 80 anos de qualidade e eficácia comprovada em higiene, beleza e tratamento veterinário para cães, gatos e cavalos. Linhas Clássicos, Pet Moments, Cão Fiel e Saralogo.', corpo: home, classe: 'pg-home' }),
    produtos: catalogo(v),
    empresa: empresa(v),
    'empresa/historia': historico(v),
    'onde-comprar': ondeComprar(v),
    representantes: paginaRepresentantes(v),
    contato: contato(v),
  };
  for (const l of linhas) out['produtos/linha/' + l.id] = paginaLinha(v, l);
  for (const p of produtos) out['produtos/' + p.slug] = paginaProduto(v, p);
  return out;
}
