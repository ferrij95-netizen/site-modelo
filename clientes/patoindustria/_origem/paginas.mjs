// Páginas das duas versões. A = "Clássica" (a estrutura do site atual, clara, com slider de fotos);
// B = "Engenharia" (petróleo escuro com gradientes do logo, números grandes e o fluxo da pós-colheita).
import { site, home, historia, mvv, otimize, produtos, fluxo, obras, obrasTexto } from './conteudo.mjs';
import { esc, num, img, linkDe, produto, nomeCurto, whatsLink, ico, documento, topo, rodape, formOrcamento, listaContato } from './comum.mjs';

const TEMA = { a: '#0A556B', b: '#072630' };
const iconeMvv = { Missão: 'alvo', Visão: 'olho', Valores: 'estrela' };
const iconeOtimize = ['ar', 'escudo', 'muro', 'escada'];
const totalSilos = o => o.itens.find(i => /Silos? \d|Silos \d/.test(i)) || '';

// Cabeçalho das páginas internas: foto de silos do site atual (page-title) com trilha.
function cabecalho(versao, trilha, titulo, sub) {
  const L = linkDe(versao);
  return `<section class="pg-cab">
  ${img('titulo', '', 'class="pg-cab-foto" loading="eager" fetchpriority="high"')}
  <div class="in">
    <nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Home</a>${trilha.map(([s, t]) => s ? `<span>/</span><a href="${L(s)}">${t}</a>` : `<span>/</span><b>${t}</b>`).join('')}</nav>
    <h1>${titulo}</h1>
    ${sub ? `<p>${sub}</p>` : ''}
  </div>
</section>`;
}

const chamada = (versao, titulo = 'Solicite um orçamento com nossa equipe', produtoNome) => {
  const L = linkDe(versao);
  const msg = produtoNome ? `Olá! Vim pelo site da Pato Indústria e gostaria de um orçamento de ${produtoNome}.` : undefined;
  return `<section class="chamada">
  <div class="in">
    <div><span class="sobre">Fale com a Pato Indústria</span><h2>${titulo}</h2><p>Projetos sob medida, da base civil à unidade funcionando. Atendemos em todo o Brasil a partir de Pato Branco/PR e Luís Eduardo Magalhães/BA.</p></div>
    <div class="chamada-acoes">
      <a class="btn btn-prim" href="${whatsLink(msg)}" target="_blank" rel="noopener">${ico('whats')}WhatsApp ${site.whatsTexto}</a>
      <a class="btn btn-linha" href="tel:${site.fones[0][1]}">${ico('fone')}${site.fones[0][0]}</a>
      <a class="lnk" href="${L('contato')}">Ver todos os contatos ${ico('seta')}</a>
    </div>
  </div>
</section>`;
};

const cartaoProduto = (versao, p, i, cls = '') => `<a class="c-prod ${cls}" href="${linkDe(versao)('produtos/' + p.slug)}">
  <figure>${img(p.fotos[0], p.nome)}</figure>
  <div><span class="c-num">${num(i)}</span><h3>${p.nome}</h3><p>${p.resumo}</p><span class="c-ver">Ver especificações ${ico('seta')}</span></div>
</a>`;

const cartaoObra = (versao, o, i) => `<a class="c-obra" href="${linkDe(versao)('obras/obra-' + o.n)}">
  ${img(o.capa, `Unidade entregue em ${o.cidade}`)}
  <div><span class="c-num">${num(i)}</span><h3>${o.cidade}</h3><p>${esc(totalSilos(o))}</p><span class="c-ver">Ver obra ${ico('seta')}</span></div>
</a>`;

// O fluxo de uma unidade de pós-colheita com os equipamentos da Pato.
const secaoFluxo = (versao, titulo = 'Da moega à expedição, uma unidade completa') => `<section class="fluxo">
  <div class="in">
    <header class="sec-cab"><span class="sobre">Soluções completas</span><h2>${titulo}</h2>
      <p>A Pato Indústria fabrica, monta e entrega funcionando cada etapa da pós-colheita, além de executar a parte civil das bases, moegas e estruturas.</p></header>
    <ol class="fluxo-linha">
      ${fluxo.map(([etapa, sub, slugs], i) => `<li>
        <span class="f-no">${num(i)}</span>
        <h3>${etapa}</h3><p>${sub}</p>
        <ul>${slugs.map(s => `<li><a href="${linkDe(versao)('produtos/' + s)}">${nomeCurto(produto(s))}</a></li>`).join('')}</ul>
      </li>`).join('')}
    </ol>
  </div>
</section>`;

const secaoMvv = () => `<section class="mvv"><div class="in">${mvv.map(([t, x]) => `<div>${ico(iconeMvv[t])}<h3>${t}</h3><p>${x}</p></div>`).join('')}</div></section>`;

// ---------- HOME ----------
function homeA() {
  const L = linkDe('a');
  return `<section class="hero-a" data-slider>
  ${['hero-1', 'hero-2', 'hero-3'].map((h, i) => img(h, i ? '' : 'Silos da Pato Indústria', `class="slide${i ? '' : ' on'}" ${i ? '' : 'loading="eager" fetchpriority="high"'}`)).join('\n  ')}
  <div class="in hero-txt">
    <span class="sobre">${home.sobretitulo}</span>
    <h1>${home.titulo}</h1>
    <p>${home.texto}</p>
    <div class="acoes"><a class="btn btn-prim" href="${L('produtos')}">Linha de produtos ${ico('seta')}</a><a class="btn btn-claro" href="${L('contato')}">Solicitar orçamento</a></div>
  </div>
  <div class="hero-pontos" role="tablist" aria-label="Fotos">${[0, 1, 2].map(i => `<button aria-label="Foto ${i + 1}"${i ? '' : ' aria-current="true"'} data-ir="${i}"></button>`).join('')}</div>
</section>
<section class="difs"><div class="in">${home.diferenciais.map((d, i) => `<div><span>${num(i)}.</span><b>${d}</b></div>`).join('')}</div></section>

<section class="historia-a">
  <div class="in">
    <div class="fotos-par">${img('obras-01-1', 'Unidade completa montada pela Pato Indústria em Correntina/BA', 'class="f1"')}${img('produtos-01-2', 'Silo plano galvanizado', 'class="f2"')}<span class="selo"><b>1999</b>Pato Branco/PR</span></div>
    <div class="txt">
      <span class="sobre">Sobre nós</span><h2>Nossa História</h2>
      <p>${historia[0]}</p>
      <blockquote>As unidades só são consideradas entregues após o funcionamento completo de toda a linha, e ainda hoje as obras são gerenciadas e acompanhadas pelos fundadores da empresa.</blockquote>
      <a class="btn btn-prim" href="${L('empresa')}">Conheça a Pato Indústria ${ico('seta')}</a>
    </div>
  </div>
</section>
${secaoMvv()}

<section class="linha-a">
  <div class="in">
    <header class="sec-cab"><span class="sobre">Linha de produtos</span><h2>Equipamentos para toda a pós-colheita</h2></header>
    <div class="grade-dest">${produtos.slice(0, 2).map((p, i) => cartaoProduto('a', p, i, 'grande')).join('')}</div>
    <div class="grade-prod">${produtos.slice(2).map((p, i) => cartaoProduto('a', p, i + 2)).join('')}</div>
  </div>
</section>

<section class="otimize-a">
  <div class="in">
    <div class="ot-foto">${img('hero-3', 'Silos galvanizados com paredes corrugadas')}</div>
    <div>
      <header class="sec-cab"><span class="sobre">Armazenagem</span><h2>${otimize.titulo}</h2><p>${otimize.texto}</p></header>
      <ol class="ot-lista">${otimize.itens.map(([t, x], i) => `<li><span>${ico(iconeOtimize[i])}</span><div><h3>${t}</h3><p>${x}</p></div></li>`).join('')}</ol>
    </div>
  </div>
</section>

<section class="obras-a">
  <div class="in">
    <header class="sec-cab"><span class="sobre">Obras realizadas</span><h2>Unidades Entregues</h2><p>${obrasTexto.sub}</p></header>
    <div class="grade-obras">${obras.map((o, i) => cartaoObra('a', o, i)).join('')}</div>
  </div>
</section>
${chamada('a')}`;
}

function homeB() {
  const L = linkDe('b');
  const numeros = [['1999', 'ano de fundação, em Pato Branco/PR'], ['278.540', 'sacas no maior silo plano'], ['400 t/h', 'nas fitas e correntes redler'], ['10', 'linhas de equipamentos próprias']];
  return `<section class="hero-b">
  ${img('hero-3', 'Silos galvanizados da Pato Indústria', 'class="hero-foto" loading="eager" fetchpriority="high"')}
  <div class="in">
    <div class="hero-txt">
      <span class="sobre">${home.sobretitulo}</span>
      <h1>Fabricação, montagem e manutenção de <em>silos e secadores.</em></h1>
      <p>${home.texto}</p>
      <div class="acoes"><a class="btn btn-prim" href="${L('contato')}">Solicitar orçamento ${ico('seta')}</a><a class="btn btn-linha" href="${L('obras')}">Ver obras entregues</a></div>
    </div>
    <ul class="hero-difs">${home.diferenciais.map((d, i) => `<li><span>${num(i)}</span>${d}</li>`).join('')}</ul>
  </div>
</section>
<section class="numeros"><div class="in">${numeros.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('')}</div></section>

${secaoFluxo('b')}

<section class="linha-b">
  <div class="in">
    <header class="sec-cab lado"><div><span class="sobre">Linha de produtos</span><h2>Engenharia robusta, do silo à rosca</h2></div><a class="lnk" href="${L('produtos')}">Todos os produtos ${ico('seta')}</a></header>
    <div class="bento">${produtos.map((p, i) => `<a class="b-item b${i + 1}" href="${L('produtos/' + p.slug)}">
      ${img(p.fotos[0], p.nome)}
      <div><span class="b-dest"><b>${p.destaque[0]}</b> ${p.destaque[1]}</span><h3>${p.nome}</h3><p>${p.resumo}</p></div>
    </a>`).join('')}</div>
  </div>
</section>

<section class="otimize-b">
  <div class="in">
    <header class="sec-cab"><span class="sobre">Armazenagem</span><h2>${otimize.titulo}</h2><p>${otimize.texto}</p></header>
    <div class="ot-grade">
      ${otimize.itens.map(([t, x], i) => `<article><span class="ot-ico">${ico(iconeOtimize[i])}</span><h3>${t}</h3><p>${x}</p></article>`).join('')}
      <figure class="ot-foto">${img('hero-2', 'Silos galvanizados com passarela e transportadores')}</figure>
    </div>
  </div>
</section>

<section class="historia-b">
  <div class="in">
    <div class="h-txt"><span class="sobre">Nossa história</span><h2>De pequenas reformas a unidades completas entregues funcionando</h2>
      <p>${historia[4]}</p><a class="btn btn-linha" href="${L('empresa')}">Sobre nós ${ico('seta')}</a></div>
    <ol class="linha-tempo">
      <li><b>1999</b><p>Constituição em 25 de agosto, em Pato Branco/PR: reformas em elevadores, máquinas de pré-limpeza e secadores.</p></li>
      <li><b>Instalações próprias</b><p>Novos produtos: silos, secadores, estruturas metálicas, pré-limpeza, elevadores e transportes helicoidais.</p></li>
      <li><b>Parte civil</b><p>Bases de silos, secadores, moegas e estruturas para unidades completas de beneficiamento, secagem e armazenagem.</p></li>
      <li><b>Usina de concreto móvel</b><p>Com caminhão betoneira e pá-carregadeira, para localidades de difícil acesso, e transporte próprio nas entregas.</p></li>
    </ol>
  </div>
</section>

<section class="obras-b">
  <div class="in">
    <header class="sec-cab lado"><div><span class="sobre">Obras realizadas</span><h2>Grandes obras para grandes colheitas</h2></div><a class="lnk" href="${L('obras')}">Todas as obras ${ico('seta')}</a></header>
    <div class="obras-trilho">${obras.map((o, i) => `<a class="o-card" href="${L('obras/obra-' + o.n)}">
      ${img(o.capa, `Unidade entregue em ${o.cidade}`)}
      <div><span class="c-num">Unidade ${num(i)}</span><h3>${o.cidade}</h3><ul>${o.itens.filter(x => /Silo|Secador/.test(x)).slice(0, 3).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
    </a>`).join('')}</div>
  </div>
</section>
${secaoMvv()}
${chamada('b')}`;
}

// ---------- INTERNAS ----------
function empresa(v) {
  const L = linkDe(v);
  const estrutura = [
    ['fabrica', 'Fabricação própria', 'Indústria metalúrgica em Pato Branco/PR, fabricante de equipamentos robustos para a pós-colheita.'],
    ['muro', 'Parte civil', 'Bases de silos, secadores, moegas e estruturas metálicas para a unidade completa.'],
    ['camadas', 'Usina de concreto móvel', 'Com caminhão betoneira e pá-carregadeira, para concreto de qualidade em locais de difícil acesso.'],
    ['caminhao', 'Transporte próprio', 'Entregas feitas com a frota da própria Pato Indústria.'],
    ['chave', 'Montagem e instalação', 'A unidade só é entregue com toda a linha funcionando, acompanhada pelos fundadores.'],
  ];
  return `${cabecalho(v, [[null, 'Sobre Nós']], 'Nossa História', 'Desde 1999 na pós-colheita de grãos, de Pato Branco/PR para todo o Brasil.')}
<section class="emp-hist">
  <div class="in">
    <div class="emp-txt">${historia.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div>
    <aside class="emp-lado">
      ${img('obras-03-2', 'Telhados de silos em montagem vistos de cima')}
      <div class="emp-marca"><img src="/assets/img/marca-cor.png" alt="Pato Indústria · Silos e Secadores" width="200" height="113" loading="lazy"><p>Constituída em 25 de agosto de 1999, em Pato Branco/PR. Unidade também em Luís Eduardo Magalhães/BA.</p></div>
    </aside>
  </div>
</section>
${secaoMvv()}
<section class="estrutura">
  <div class="in">
    <header class="sec-cab"><span class="sobre">Estrutura</span><h2>Da fábrica à unidade funcionando</h2></header>
    <div class="est-grade">${estrutura.map(([ic, t, x]) => `<article>${ico(ic)}<h3>${t}</h3><p>${x}</p></article>`).join('')}</div>
  </div>
</section>
<section class="otimize-int">
  <div class="in">
    <header class="sec-cab"><span class="sobre">Armazenagem</span><h2>${otimize.titulo}</h2><p>${otimize.texto}</p></header>
    <div class="ot-grade">${otimize.itens.map(([t, x], i) => `<article><span class="ot-ico">${ico(iconeOtimize[i])}</span><h3>${t}</h3><p>${x}</p></article>`).join('')}</div>
    <p class="mais"><a class="btn btn-prim" href="${L('produtos')}">Ver a linha de produtos ${ico('seta')}</a></p>
  </div>
</section>
${chamada(v)}`;
}

function listaProdutos(v) {
  return `${cabecalho(v, [[null, 'Linha de Produtos']], 'Linha de Produtos', 'Silos, secadores, máquinas de pré-limpeza, transportadores e estruturas metálicas, fabricados e montados pela Pato Indústria.')}
<section class="prod-lista">
  <div class="in"><div class="grade-prod todos">${produtos.map((p, i) => cartaoProduto(v, p, i)).join('')}</div></div>
</section>
${secaoFluxo(v, 'Cada equipamento no seu lugar da unidade')}
${chamada(v)}`;
}

function paginaProduto(v, p) {
  const L = linkDe(v);
  const i = produtos.indexOf(p);
  const prox = produtos[(i + 1) % produtos.length];
  const ant = produtos[(i - 1 + produtos.length) % produtos.length];
  const galeria = `<div class="galeria" data-galeria>
    <figure class="g-principal">${img(p.fotos[0], p.nome, 'loading="eager"')}</figure>
    ${p.fotos.length > 1 ? `<div class="g-mini">${p.fotos.map((f, k) => `<button type="button" data-foto="/assets/img/${f}.webp"${k ? '' : ' aria-current="true"'} aria-label="Foto ${k + 1} de ${p.nome}">${img(f, '')}</button>`).join('')}</div>` : ''}
  </div>`;
  const specs = p.specs ? `<div class="specs"><h2>Especificações Técnicas</h2><table><tbody>${p.specs.map(([k, x]) => `<tr><th scope="row">${k}</th><td>${x}</td></tr>`).join('')}</tbody></table></div>` : '';
  const extra = p.extra ? `<div class="extra"><h2>${p.extraTitulo}</h2><ul class="checks">${p.extra.map(x => `<li>${ico('check')}<span>${x}</span></li>`).join('')}</ul></div>` : '';
  const lateral = `<aside class="prod-lado">
    <nav aria-label="Linha de produtos"><h2>Linha de Produtos</h2><ul>${produtos.map(q => `<li><a href="${L('produtos/' + q.slug)}"${q === p ? ' aria-current="page"' : ''}>${q.nome}</a></li>`).join('')}</ul></nav>
    <div class="lado-orc"><h3>Solicite um orçamento</h3><p>Fale direto com a equipe da Pato Indústria.</p>
      <a class="btn btn-prim" href="${whatsLink(`Olá! Vim pelo site da Pato Indústria e gostaria de um orçamento de ${p.nome}.`)}" target="_blank" rel="noopener">${ico('whats')}WhatsApp</a>
      <a class="lado-fone" href="tel:${site.fones[0][1]}">${ico('fone')}${site.fones[0][0]}</a></div>
  </aside>`;
  return `${cabecalho(v, [['produtos', 'Linha de Produtos'], [null, p.nome]], p.nome, p.resumo)}
<section class="prod">
  <div class="in prod-grade">
    ${v === 'a' ? lateral : ''}
    <div class="prod-corpo">
      <div class="prod-topo${p.texto.join('').length > 700 ? ' longo' : ''}">
        ${galeria}
        <div class="prod-intro">
          ${v === 'b' ? `<span class="b-dest"><b>${p.destaque[0]}</b> ${p.destaque[1]}</span>` : ''}
          ${p.texto.map(t => `<p>${t}</p>`).join('')}
        </div>
      </div>
      <div class="prod-dados">${specs}${extra}</div>
      <nav class="prod-nav" aria-label="Outros produtos"><a href="${L('produtos/' + ant.slug)}">${ico('voltar')}<span><small>Anterior</small>${ant.nome}</span></a><a href="${L('produtos/' + prox.slug)}"><span><small>Próximo</small>${prox.nome}</span>${ico('seta')}</a></nav>
    </div>
    ${v === 'b' ? lateral : ''}
  </div>
</section>
${chamada(v, `Orçamento de ${p.nome}`, p.nome)}`;
}

function listaObras(v) {
  return `${cabecalho(v, [[null, 'Obras Realizadas']], 'Unidades Entregues', obrasTexto.sub)}
<section class="obras-lista">
  <div class="in"><div class="grade-obras">${obras.map((o, i) => cartaoObra(v, o, i)).join('')}</div></div>
</section>
${chamada(v)}`;
}

function paginaObra(v, o) {
  const L = linkDe(v);
  const i = obras.indexOf(o);
  return `${cabecalho(v, [['obras', 'Obras Realizadas'], [null, `Unidade ${num(i)}`]], o.cidade, `Unidade ${num(i)} entregue pela Pato Indústria, com toda a linha funcionando.`)}
<section class="obra">
  <div class="in obra-grade">
    <div class="obra-fotos">
      ${img(o.fotos[0], `Unidade entregue em ${o.cidade}`, 'class="o-princ" loading="eager"')}
      <div class="o-mais">${img(o.capa, `Unidade entregue em ${o.cidade}, vista vertical`)}${o.fotos.slice(1).map(f => img(f, `Detalhe da obra em ${o.cidade}`)).join('')}</div>
    </div>
    <div class="obra-ficha">
      <span class="sobre">Detalhes da Obra</span>
      <h2>${o.cidade}</h2>
      <ol>${o.itens.map((x, k) => `<li><span>${num(k)}</span>${esc(x)}</li>`).join('')}</ol>
      <p>${obrasTexto.detalhe}</p>
      <a class="btn btn-prim" href="${whatsLink('Olá! Vi as obras no site da Pato Indústria e gostaria de um orçamento para a minha unidade.')}" target="_blank" rel="noopener">${ico('whats')}Quero uma unidade assim</a>
    </div>
  </div>
</section>
<section class="obras-outras">
  <div class="in"><header class="sec-cab"><h2>Outras unidades entregues</h2></header>
  <div class="grade-obras tres">${obras.filter(x => x !== o).map(x => cartaoObra(v, x, obras.indexOf(x))).join('')}</div>
  <p class="mais"><a class="lnk" href="${L('obras')}">Todas as obras ${ico('seta')}</a></p></div>
</section>`;
}

function contato(v) {
  return `${cabecalho(v, [[null, 'Contato']], 'Fale Conosco', 'Entre em contato através dos nossos canais.')}
<section class="contato">
  <div class="in contato-grade">
    <div class="ct-form"><h2>Solicite um orçamento</h2><p>Conte o que você precisa. Respondemos pelo WhatsApp ou por telefone.</p>${formOrcamento()}</div>
    <div class="ct-info">${listaContato()}
      <a class="btn btn-linha" href="${site.instagram}" target="_blank" rel="noopener">${ico('insta')}@patoindustria</a></div>
  </div>
</section>
<section class="mapa"><h2 class="sr">Onde estamos</h2><iframe src="${site.mapaEmbed}" title="Mapa da Pato Indústria em Pato Branco/PR" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;
}

// ---------- MONTAGEM ----------
const T = ' · Pato Indústria';
export function gerarVersao(v) {
  const pag = {};
  const add = (slug, titulo, desc, corpo, sobreFoto = true) => {
    pag[slug] = documento({ versao: v, slug, titulo, desc, tema: TEMA[v], corpo: `${topo({ versao: v, slug, sobreFoto })}\n<main id="conteudo">\n${corpo}\n</main>\n${rodape({ versao: v })}` });
  };
  add('index', 'Pato Indústria · Silos e Secadores', 'Fabricação, montagem e manutenção de silos e secadores. Pato Branco/PR, atuando em todo o Brasil.', v === 'a' ? homeA() : homeB());
  add('empresa', 'Sobre Nós' + T, 'A história da Pato Indústria, desde 1999 em Pato Branco/PR: fabricação, parte civil, montagem e instalação de unidades de armazenagem.', empresa(v));
  add('produtos', 'Linha de Produtos' + T, 'Silos planos e elevados, secadores, máquinas de pré-limpeza, elevadores, fitas, redler, tulhas, roscas e estruturas metálicas.', listaProdutos(v));
  for (const p of produtos) add('produtos/' + p.slug, p.nome + T, `${p.nome} Pato Indústria: ${p.resumo}`, paginaProduto(v, p));
  add('obras', 'Obras Realizadas' + T, obrasTexto.sub, listaObras(v));
  for (const o of obras) add('obras/obra-' + o.n, `Obra em ${o.cidade} (unidade ${num(obras.indexOf(o))})` + T, `Detalhes da unidade entregue pela Pato Indústria em ${o.cidade}: ${o.itens.slice(0, 3).join(', ')}.`, paginaObra(v, o));
  add('contato', 'Contato' + T, 'Telefones, e-mail, WhatsApp e endereços da Pato Indústria em Pato Branco/PR e Luís Eduardo Magalhães/BA.', contato(v));
  return pag;
}
