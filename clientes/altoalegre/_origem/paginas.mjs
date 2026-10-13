// Todas as páginas. v = 'a' (Família, clara) ou 'b' (Usina, azul). A home de cada versão tem composição própria;
// as páginas internas usam a mesma estrutura e mudam de cara pelo CSS da versão.
import { site, produtos, categorias, receitas, numeros, capacidade, unidades, historia, certificacoes, processo, publicacoes, projetosSociais, projetosAmbientais, especEtanol } from './conteudo.mjs';
import { esc, num, img, ico, onda, linkDe, prod, chamada, cartaoProduto, cartaoReceita, documento } from './comum.mjs';

const acucares = produtos.filter(p => p.cat === 'acucar');

// Cabeçalho das páginas internas, no formato da Agrogen: moldura arredondada com foto e degradê.
function capa(v, { eyebrow, titulo, texto = '', foto, trilha = [] }) {
  const L = linkDe(v);
  return `<section class="capa"><div class="wrap"><div class="capa-in">
  ${foto ? img(foto, '', 'width="1920" height="500" fetchpriority="high" loading="eager"') : ''}
  <div class="capa-txt">
    <nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${trilha.map(([s, t]) => s ? `<span>/</span><a href="${L(s)}">${t}</a>` : `<span>/</span><span aria-current="page">${t}</span>`).join('')}</nav>
    <span class="eyebrow claro">${eyebrow}</span>
    <h1>${titulo}</h1>
    ${texto ? `<p>${texto}</p>` : ''}
  </div>
</div></div></section>`;
}

// Etapas do campo ao produto, em cartões de seta (como os da Agrogen).
const etapas = () => `<ol class="setas">${processo.map(([t, d, i], k) => `<li class="seta-card"><span class="sc-num">${num(k)}</span>${ico(i, 'sc-ico')}<h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>`;

const nums = (lista = numeros) => `<div class="nums">${lista.map(([n, t]) => `<div class="n"><b>${n}</b><span>${t}</span></div>`).join('')}</div>`;

/* ---------------- Home ---------------- */

function homeA(v) {
  const L = linkDe(v);
  return `
<section class="hero-a"><div class="wrap"><div class="ha-in">
  <div class="ha-txt">
    <span class="eyebrow claro">Usina Alto Alegre · desde 1978</span>
    <h1>A alegria<br>tem sabor.</h1>
    <p>Açúcar cristal, refinado e demerara feitos da nossa cana, no Paraná e em São Paulo. Da mesa das famílias à indústria, com a qualidade de quem cuida de cada etapa.</p>
    <div class="ctas"><a class="btn btn-cta" href="${L('produtos')}">Conheça os produtos</a><a class="btn btn-linha-b" href="${L('receitas')}">Ver receitas</a></div>
  </div>
  <div class="ha-pacotes" aria-hidden="true">
    ${img('p-refinado', '', 'class="pk pk1" width="286" height="400" loading="eager"')}
    ${img('p-demerara', '', 'class="pk pk2" width="234" height="400" loading="eager"')}
    ${img('p-cristal', '', 'class="pk pk3" width="295" height="400" loading="eager"')}
  </div>
  ${onda('ha-onda')}
</div></div></section>

<section class="sec familia"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Conheça toda</span><h2>a nossa família de açúcares</h2></div>
  <p>Quatro açúcares para cada uso, em embalagens de 5 g a 50 kg. Toque em um produto para ver composição, tabela nutricional e embalagens.</p></div>
  <div class="prateleira">${acucares.map(p => cartaoProduto(p, v, 'prateleira')).join('')}</div>
  <div class="linha-extra">
    ${produtos.filter(p => p.cat !== 'acucar').map(p => cartaoProduto(p, v, 'linha')).join('')}
  </div>
</div></section>

<section class="sec bloco-azul"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow claro">Do campo ao produto</span><h2>Tudo começa na nossa cana</h2></div>
  <p>Plantamos, colhemos e processamos a cana nas nossas quatro unidades. Dela saem o açúcar, o etanol e, do bagaço, a energia que move a usina.</p></div>
  ${etapas()}
</div></section>

<section class="sec tight"><div class="wrap">${nums()}</div></section>

<section class="sec areia"><div class="wrap split">
  <div>
    <span class="eyebrow">Sobre nós</span>
    <h2 class="h2">Uma história de família que atravessa gerações</h2>
    <p class="lead">As famílias Junqueira e Figueiredo chegaram de Portugal no século XVIII. Em 1978 nasceu a primeira unidade da Alto Alegre, em Colorado, no Paraná.</p>
    <p class="muted">Hoje são quatro unidades produtivas e o Escritório Central em Presidente Prudente, com certificação ISO 9001, FSSC 22000 na Unidade Junqueira e um compromisso permanente com as pessoas.</p>
    <div class="selos">${certificacoes.slice(0, 3).map(([t]) => `<span>${ico('escudo')}${t}</span>`).join('')}</div>
    <div class="ctas"><a class="btn" href="${L('sobre')}">Nossa história</a></div>
  </div>
  <div class="colagem">
    ${img('f-usina', 'Unidade da Usina Alto Alegre', 'width="1920" height="381"')}
    ${img('f-plantio', 'Plantio de mudas com colaboradores', 'width="1920" height="495"')}
    ${img('f-usina-campo', 'Canavial e usina ao fundo', 'width="1920" height="300"')}
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Receitas</span><h2>Para adoçar o seu dia</h2></div><a class="btn btn-linha" href="${L('receitas')}">Ver todas as receitas</a></div>
  <div class="receitas-mosaico">${receitas.slice(0, 5).map(r => cartaoReceita(r, v)).join('')}</div>
</div></section>

<section class="sec oficina-home"><div class="wrap"><div class="of-in">
  ${img('logo-oficina', 'Oficina de Doces Alto Alegre', 'class="of-logo" width="700" height="466"')}
  <div><span class="eyebrow">Projeto social</span><h2 class="h2">Oficina de Doces</h2>
  <p>Oficina de culinária gratuita para crianças de 7 a 10 anos, com receitas feitas com Açúcar Alto Alegre. Em 2018 foram cerca de 600 crianças.</p>
  <div class="ctas"><a class="btn" href="${L('sustentabilidade/oficina-de-doces')}">Conheça o projeto</a><a class="btn btn-linha" href="${site.oficinaInscricao}" target="_blank" rel="noopener">Inscrever meu filho</a></div></div>
</div></div></section>

<section class="sec verde-claro"><div class="wrap split">
  <div class="pic alta">${img('f-plantio', 'Colaboradores plantando mudas nativas', 'width="1920" height="495"')}</div>
  <div><span class="eyebrow">Sustentabilidade</span><h2 class="h2">Do bagaço à energia, da muda à floresta</h2>
  <p class="muted">Desde 2011 publicamos o relatório anual de sustentabilidade no padrão GRI. O bagaço vira energia, a torta de filtro aduba o solo, a água é reaproveitada e o viveiro próprio já produziu mais de 600 mil mudas nativas.</p>
  <ul class="checks">${['Créditos de carbono certificados pela ONU', 'Viveiro com mais de 80 espécies nativas', 'Programas sociais para colaboradores e famílias'].map(t => `<li>${ico('check')}${t}</li>`).join('')}</ul>
  <div class="ctas"><a class="btn" href="${L('sustentabilidade')}">Ver projetos e relatórios</a></div></div>
</div></section>
${chamada(v)}`;
}

function homeB(v) {
  const L = linkDe(v);
  return `
<section class="hero-b">
  <div class="wrap hb-in">
    <div class="hb-txt">
      <span class="eyebrow claro">Usina Alto Alegre · Paraná e São Paulo</span>
      <h1>Açúcar, etanol e energia da cana, com a qualidade de quem cuida de cada etapa</h1>
      <p>Quatro unidades produtivas, 10,8 milhões de toneladas de cana por safra e uma linha completa para varejo, food service, indústria e distribuidoras.</p>
      <div class="ctas"><a class="btn btn-cta" href="${L('produtos')}">Ver catálogo</a><a class="btn btn-linha-b" href="${L('orcamento')}">Pedir orçamento</a></div>
    </div>
    <div class="hb-vitrine">
      ${acucares.map(p => `<a href="${L('produtos/' + p.slug)}" style="--c:${p.cor};--c2:${p.cor2}">${img(p.foto, p.nome, 'width="300" height="400" loading="eager"')}<span>${p.nome.replace('Açúcar ', '')}</span></a>`).join('')}
    </div>
  </div>
  <div class="hb-pano">${img('f-usina-campo', 'Canavial com a usina ao fundo', 'width="1920" height="300" loading="eager"')}
    <div class="wrap hb-nums">${numeros.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('')}</div>
  </div>
</section>

<section class="sec catalogo-home"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Catálogo</span><h2>Três linhas de produto</h2></div>
  <a class="btn btn-linha" href="${L('produtos')}">Catálogo completo</a></div>
  <div class="linhas">${categorias.map((c, k) => {
    const itens = produtos.filter(p => p.cat === c.id);
    return `<article class="linha-cat lc-${c.id}">
      <header><span class="lc-num">${num(k)}</span><h3>${c.nome}</h3><p>${c.resumo}</p></header>
      <ul>${itens.map(p => `<li><a href="${L('produtos/' + p.slug)}" style="--c:${p.cor}">${p.foto.startsWith('p-') ? img(p.foto, '', 'width="44" height="60"') : `<span class="lc-ico">${ico(c.id === 'etanol' ? 'gota' : 'raio')}</span>`}<span><b>${p.nome}</b><small>${p.embalagens.map(e => e[0]).join(' · ') || p.sub}</small></span>${ico('seta')}</a></li>`).join('')}</ul>
    </article>`;
  }).join('')}</div>
</div></section>

<section class="sec bloco-azul"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow claro">Processo</span><h2>Do canavial à entrega</h2></div>
  <p>A cana é plantada, colhida e processada nas nossas unidades. Nada se perde: o bagaço vira energia e a torta de filtro volta ao solo como adubo.</p></div>
  ${etapas()}
</div></section>

<section class="sec"><div class="wrap split">
  <div>
    <span class="eyebrow">Capacidade por safra</span>
    <h2 class="h2">Escala para abastecer o mercado o ano todo</h2>
    <p class="muted">Volumes de produção informados pela Usina Alto Alegre para as quatro unidades.</p>
    <a class="btn" href="${L('sobre')}">Conheça a empresa</a>
  </div>
  <dl class="tabela-cap">${capacidade.map(([n, t]) => `<div><dt>${n}</dt><dd>${t}</dd></div>`).join('')}</dl>
</div></section>

<section class="sec areia"><div class="wrap split">
  <div class="mapa-box">${img('mapa', 'Mapa com as unidades da Alto Alegre no Paraná e em São Paulo', 'width="887" height="627"')}</div>
  <div><span class="eyebrow">Onde estamos</span><h2 class="h2">Quatro unidades e um escritório central</h2>
  <ul class="unid-lista">${unidades.map(u => `<li><b>${u.nome}</b><span>${u.local}</span><small>${u.faz}</small></li>`).join('')}</ul></div>
</div></section>

<section class="sec qualidade"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow claro">Qualidade</span><h2>Certificações e programas</h2></div></div>
  <div class="cert-grid">${certificacoes.map(([t, d]) => `<div class="cert">${ico('escudo')}<h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Receitas</span><h2>Feitas com Açúcar Alto Alegre</h2></div><a class="btn btn-linha" href="${L('receitas')}">Ver receitas</a></div>
  <div class="receitas-linha">${receitas.slice(0, 4).map(r => cartaoReceita(r, v)).join('')}</div>
</div></section>

<section class="sec areia"><div class="wrap duo">
  <a class="duo-card" href="${L('sustentabilidade')}">${img('f-plantio', '', 'width="1920" height="495"')}<div><span class="eyebrow claro">Sustentabilidade</span><h3>Relatórios GRI desde 2011, viveiro com 600 mil mudas e crédito de carbono certificado pela ONU</h3><span class="cp-ver">Ver projetos ${ico('seta')}</span></div></a>
  <a class="duo-card duo-oficina" href="${L('sustentabilidade/oficina-de-doces')}">${img('logo-oficina', 'Oficina de Doces', 'class="duo-logo" width="700" height="466"')}<div><span class="eyebrow claro">Projeto social</span><h3>Oficina de Doces: culinária gratuita para crianças de 7 a 10 anos</h3><span class="cp-ver">Conhecer o projeto ${ico('seta')}</span></div></a>
</div></section>
${chamada(v)}`;
}

/* ---------------- Sobre ---------------- */

function sobre(v) {
  return `${capa(v, { eyebrow: 'Sobre nós', titulo: 'Uma usina feita por pessoas, desde 1978', texto: 'Plantio, extração, produção e beneficiamento da cana-de-açúcar, com geração de energia a partir do bagaço.', foto: 'f-usina', trilha: [[null, 'Sobre nós']] })}

<section class="sec"><div class="wrap split topo-al">
  <div><span class="eyebrow">Quem somos</span><h2 class="h2">Qualidade, tecnologia e gente</h2></div>
  <div class="prose">
    <p class="lead">A Usina Alto Alegre trabalha com o plantio, a extração, a produção e o beneficiamento da cana-de-açúcar e gera energia elétrica a partir do bagaço.</p>
    <p>Mantemos há décadas o compromisso com a qualidade, o investimento em tecnologia e a educação dos colaboradores. Somos cerca de 49.842 pessoas, entre empregos diretos e indiretos, em quatro unidades no Paraná e em São Paulo.</p>
  </div>
</div></section>

<section class="sec bloco-azul"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow claro">Capacidade por safra</span><h2>Números da Alto Alegre</h2></div></div>
  <dl class="cap-grid">${capacidade.map(([n, t]) => `<div><dt>${n}</dt><dd>${t}</dd></div>`).join('')}</dl>
</div></section>

<section class="sec areia"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Como surgimos</span><h2>Nossa história</h2></div></div>
  <ol class="linha-tempo">${historia.map(([a, t]) => `<li><b>${a}</b><p>${t}</p></li>`).join('')}</ol>
</div></section>

<section class="sec"><div class="wrap split">
  <div class="mapa-box">${img('mapa', 'Mapa com as unidades da Alto Alegre no Paraná e em São Paulo', 'width="887" height="627"')}</div>
  <div><span class="eyebrow">Unidades</span><h2 class="h2">Onde produzimos</h2>
  <div class="unid-cards">${unidades.map(u => `<div class="uc">${u.ano ? `<span class="uc-ano">${u.ano}</span>` : ''}<h3>${u.nome}</h3><small>${ico('pin')}${u.local}</small><p>${u.texto}</p></div>`).join('')}</div></div>
</div></section>

<section class="sec missao"><div class="wrap split">
  <blockquote><small>Nossa missão</small>Valorizar as pessoas, com treinamento, autoconhecimento e crescimento pessoal e profissional, buscando a melhoria contínua, a satisfação dos clientes e a excelência dos produtos, com respeito ao meio ambiente.</blockquote>
  <div><span class="eyebrow">Sistema de gestão</span><h2 class="h2">Certificações e programas</h2>
  <p class="muted">Nossa política de gestão busca o desenvolvimento sustentável, a satisfação dos clientes e a qualificação dos colaboradores.</p>
  <div class="cert-lista">${certificacoes.map(([t, d], k) => `<div><i>${num(k)}</i><span><b>${t}</b><p>${d}</p></span></div>`).join('')}</div></div>
</div></section>

${publicacoesSec(v)}
${chamada(v)}`;
}

const publicacoesSec = v => `<section class="sec areia" id="publicacoes"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Transparência</span><h2>Publicações</h2></div><p>Relatórios de igualdade salarial, Código de Conduta Ética e relatórios de sustentabilidade, em PDF.</p></div>
  <div class="pubs">${publicacoes.map(([t, d, u]) => `<a class="pub" href="${u}" target="_blank" rel="noopener">${ico(t.startsWith('Código') ? 'escudo' : t.includes('Sustent') ? 'planeta' : 'doc')}<span><b>${t}</b><small>${d}</small></span>${ico('baixar', 'pub-b')}</a>`).join('')}</div>
</div></section>`;

/* ---------------- Produtos ---------------- */

function catalogo(v) {
  return `${capa(v, { eyebrow: 'Catálogo', titulo: 'Nossos produtos', texto: 'Açúcar para a mesa, o food service e a indústria, etanol combustível a granel e energia elétrica renovável.', foto: 'f-usina-campo', trilha: [[null, 'Produtos']] })}

<section class="sec catalogo"><div class="wrap">
  <div class="filtros" role="tablist" aria-label="Filtrar por linha">
    <button class="on" data-filtro="todos">Todos <span>${produtos.length}</span></button>
    ${categorias.map(c => `<button data-filtro="${c.id}">${c.nome} <span>${produtos.filter(p => p.cat === c.id).length}</span></button>`).join('')}
  </div>
  ${categorias.map(c => `<div class="cat-bloco" id="${c.id}" data-bloco="${c.id}">
    <div class="cat-head"><h2>${c.nome}</h2><p>${c.resumo}</p></div>
    <div class="grade-${c.id}">${produtos.filter(p => p.cat === c.id).map(p => cartaoProduto(p, v, { acucar: 'prateleira', etanol: 'ficha', energia: 'linha' }[c.id])).join('')}</div>
  </div>`).join('')}
</div></section>

<section class="sec areia"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Compare</span><h2>Qual açúcar usar?</h2></div><p>Os quatro açúcares lado a lado, com a composição informada nas fichas técnicas.</p></div>
  <div class="tabela-rolagem"><table class="comparar">
    <thead><tr><th></th>${acucares.map(p => `<th style="--c:${p.cor}">${img(p.foto, '', 'width="60" height="80"')}<span>${p.nome}</span></th>`).join('')}</tr></thead>
    <tbody>
      <tr><th>Tipo</th>${acucares.map(p => `<td>${p.sub}</td>`).join('')}</tr>
      <tr><th>Sacarose</th>${acucares.map(p => `<td>${p.composicao[0][1]}</td>`).join('')}</tr>
      <tr><th>Umidade</th>${acucares.map(p => `<td>${p.composicao.find(c => c[0] === 'Umidade')[1]}</td>`).join('')}</tr>
      <tr><th>Embalagens</th>${acucares.map(p => `<td>${p.embalagens.map(e => e[0]).join(', ')}</td>`).join('')}</tr>
      <tr><th>Indicado para</th>${acucares.map(p => `<td>${p.usos.slice(0, 2).join(', ')}</td>`).join('')}</tr>
    </tbody></table></div>
</div></section>
${chamada(v)}`;
}

function tabelaNutri(p) {
  return `<table class="nutri">
  <caption>Informação nutricional<small>Porção de 5 g (1 colher de chá)</small></caption>
  <thead><tr><th></th><th>100 g</th><th>5 g</th><th>%VD*</th></tr></thead>
  <tbody>${p.nutri.map(([n, a, b, c]) => `<tr><th>${n}</th><td>${a}</td><td>${b}</td><td>${c}</td></tr>`).join('')}</tbody>
  <tfoot><tr><td colspan="4">*Percentual de valores diários fornecidos pela porção.</td></tr></tfoot>
</table>`;
}

function produto(v, p) {
  const L = linkDe(v);
  const c = categorias.find(c => c.id === p.cat);
  const rs = receitas.filter(r => r.acucar.includes(p.slug)).slice(0, 3);
  const outros = produtos.filter(o => o.cat === p.cat && o.slug !== p.slug).concat(produtos.filter(o => o.cat !== p.cat && o.cat === 'acucar')).slice(0, 3);
  const ehAcucar = p.cat === 'acucar';
  const fotos = ehAcucar ? [[p.foto, p.nome], [p.foto2, p.nome + ', outra vista'], ...(rs[0] ? [[rs[0].foto, rs[0].nome]] : [])] : [[p.foto, p.nome]];
  const secoes = ehAcucar ? [['descricao', 'Descrição'], ['composicao', 'Composição'], ['nutricional', 'Tabela nutricional'], ['embalagens', 'Embalagens'], ...(rs.length ? [['receitas', 'Receitas']] : [])]
    : p.cat === 'etanol' ? [['descricao', 'Descrição'], ['especificacao', 'Especificação'], ['armazenagem', 'Armazenagem']] : [['descricao', 'Descrição'], ['geracao', 'Como geramos']];

  const palco = ehAcucar
    ? `<div class="pd-palco" style="--c:${p.cor};--c2:${p.cor2}">
        <div class="pd-foto" data-galeria>${fotos.map(([f, a], k) => img(f, a, `width="${f.startsWith('p-') ? 300 : 1000}" height="${f.startsWith('p-') ? 400 : 668}" class="${f.startsWith('p-') ? 'pk' : 'ft'}${k ? '' : ' on'}" data-foto="${k}"${k ? '' : ' loading="eager"'}`)).join('')}</div>
        <div class="pd-miniaturas">${fotos.map(([f, a], k) => `<button class="${k ? '' : 'on'}" data-mini="${k}" aria-label="Ver foto ${k + 1}">${img(f, '', 'width="80" height="80"')}</button>`).join('')}</div>
      </div>`
    : `<div class="pd-palco foto" style="--c:${p.cor};--c2:${p.cor2}">${img(p.foto, p.nome, 'width="1920" height="300" loading="eager"')}<span class="pd-ico">${ico(p.cat === 'etanol' ? 'gota' : 'raio')}</span></div>`;

  const info = `<div class="pd-info">
    <span class="eyebrow">${c.nome}</span>
    <h1>${p.nome}</h1>
    <p class="pd-sub">${p.sub}</p>
    <p class="pd-resumo">${p.resumo}</p>
    ${p.embalagens.length ? `<div class="pd-emb"><span>Embalagens</span><div role="radiogroup" aria-label="Escolha a embalagem">${p.embalagens.map(([t, d], k) => `<button role="radio" aria-checked="${k ? 'false' : 'true'}" data-emb="${esc(t)}"><b>${t}</b><small>${d}</small></button>`).join('')}</div></div>` : ''}
    <div class="pd-acoes"><a class="btn btn-cta" data-orcar href="${L('orcamento')}?produto=${p.slug}">Pedir orçamento ${ico('seta')}</a><a class="btn btn-linha" href="tel:${site.vendas0800Href}">${ico('fone')}${site.vendas0800}</a></div>
    <ul class="pd-garantias">
      <li>${ico('usina')}Produzido pela Usina Alto Alegre</li>
      <li>${ico('escudo')}${p.cat === 'energia' ? 'Fonte limpa e renovável' : 'Unidades com ISO 9001'}</li>
      <li>${ico('caminhao')}${p.cat === 'etanol' ? 'Certificado de Qualidade por carregamento' : p.cat === 'energia' ? 'Venda a concessionárias' : 'Varejo, atacado, food service e indústria'}</li>
    </ul>
  </div>`;

  let corpo = `<section class="sec pd-desc" id="descricao"><div class="wrap split topo-al">
    <div><span class="eyebrow">Descrição</span><h2 class="h2">Sobre o produto</h2></div>
    <div class="prose">${p.texto.map((t, k) => `<p${k ? '' : ' class="lead"'}>${t}</p>`).join('')}
    <div class="usos">${p.usos.map(u => `<span>${ico('check')}${u}</span>`).join('')}</div></div>
  </div></section>`;

  if (ehAcucar) {
    corpo += `<section class="sec areia" id="composicao"><div class="wrap split topo-al">
      <div><span class="eyebrow">Ficha técnica</span><h2 class="h2">Composição do produto embalado</h2><p class="muted">Valores da especificação técnica do ${p.nome} Alto Alegre.</p></div>
      <div class="barras">${p.composicao.map(([n, t, val], k) => `<div class="barra"><div class="b-top"><span>${n}</span><b>${t}</b></div><div class="b-trilho"><i style="width:${k ? Math.max(2, val * 6) : val}%"></i></div></div>`).join('')}
      <p class="nota">As barras dos componentes menores estão ampliadas para ficarem visíveis.</p></div>
    </div></section>
    <section class="sec" id="nutricional"><div class="wrap split topo-al">
      <div><span class="eyebrow">Rótulo</span><h2 class="h2">Tabela nutricional</h2><p class="muted">Informação nutricional por 100 g e por porção de 5 g, equivalente a uma colher de chá.</p>
      <div class="destaques"><div><b>20 kcal</b><span>por porção de 5 g</span></div><div><b>0 g</b><span>de gorduras e proteínas</span></div></div></div>
      ${tabelaNutri(p)}
    </div></section>
    <section class="sec bloco-azul" id="embalagens"><div class="wrap">
      <div class="sec-head"><div><span class="eyebrow claro">Embalagens</span><h2>Formatos disponíveis</h2></div><p>Escolha o formato e peça o orçamento com o volume que você precisa.</p></div>
      <div class="emb-grid">${p.embalagens.map(([t, d]) => `<a class="emb" href="${L('orcamento')}?produto=${p.slug}&amp;emb=${encodeURIComponent(t)}"><span class="emb-pk">${img(p.foto, '', 'width="120" height="160"')}</span><b>${t}</b><small>${d}</small><span class="cp-ver">Orçar este formato ${ico('seta')}</span></a>`).join('')}</div>
    </div></section>`;
    if (rs.length) corpo += `<section class="sec" id="receitas"><div class="wrap">
      <div class="sec-head"><div><span class="eyebrow">Na cozinha</span><h2>Receitas com ${p.nome}</h2></div><a class="btn btn-linha" href="${L('receitas')}">Todas as receitas</a></div>
      <div class="receitas-linha">${rs.map(r => cartaoReceita(r, v)).join('')}</div>
    </div></section>`;
  } else if (p.cat === 'etanol') {
    const col = p.spec === 'anidro' ? 1 : 2;
    corpo += `<section class="sec areia" id="especificacao"><div class="wrap">
      <div class="sec-head"><div><span class="eyebrow">Especificação técnica</span><h2>Etanol anidro e hidratado</h2></div><p>Valores conforme a Portaria da ANP de 8 de agosto de 2002. Os íons são analisados em laboratório externo, a pedido do cliente.</p></div>
      <div class="tabela-rolagem"><table class="spec">
        <thead><tr><th>Característica</th><th class="${col === 1 ? 'on' : ''}">Anidro</th><th class="${col === 2 ? 'on' : ''}">Hidratado</th></tr></thead>
        <tbody>${especEtanol.map(([n, a, h]) => `<tr><th>${n}</th><td class="${col === 1 ? 'on' : ''}">${a}</td><td class="${col === 2 ? 'on' : ''}">${h}</td></tr>`).join('')}</tbody>
      </table></div>
    </div></section>
    <section class="sec" id="armazenagem"><div class="wrap">
      <div class="info-cards">
        <div>${ico('gota')}<h3>Produto a granel</h3><p>Líquido límpido e incolor, de validade indeterminada.</p></div>
        <div>${ico('escudo')}<h3>Armazenagem</h3><p>Em tanques ou recipientes fechados, longe de chamas e de fontes de calor.</p></div>
        <div>${ico('doc')}<h3>Amostra-testemunha</h3><p>Guardada por 2 meses, a 18 ºC ou menos, com Certificado de Qualidade de cada tanque.</p></div>
      </div>
    </div></section>`;
  } else {
    corpo += `<section class="sec bloco-azul" id="geracao"><div class="wrap">
      <div class="sec-head"><div><span class="eyebrow claro">Cogeração</span><h2>Do bagaço à tomada</h2></div><p>O mesmo bagaço que sobra da moagem da cana alimenta as caldeiras e gera a energia.</p></div>
      <ol class="fluxo">
        <li>${ico('cana')}<b>Moagem</b><span>A cana é moída para fazer açúcar e etanol.</span></li>
        <li>${ico('folha')}<b>Bagaço</b><span>O bagaço vira combustível limpo e renovável.</span></li>
        <li>${ico('raio')}<b>Geração</b><span>A queima nas caldeiras gera energia elétrica.</span></li>
        <li class="fluxo-div"><div>${ico('usina')}<b>Cerca de 50%</b><span>move motores e ilumina a própria usina</span></div><div>${ico('planeta')}<b>O restante</b><span>vai para concessionárias do Sul e Sudeste</span></div></li>
      </ol>
      <div class="nums claro">${[['418 mil MWh', 'capacidade de cogeração por safra'], ['241.103 MWh', 'gerados em 2007'], ['1 cidade', 'do porte de Presidente Prudente abastecida em 2007']].map(([n, t]) => `<div class="n"><b>${n}</b><span>${t}</span></div>`).join('')}</div>
    </div></section>`;
  }

  corpo += `<section class="sec areia"><div class="wrap">
    <div class="sec-head"><div><span class="eyebrow">Veja também</span><h2>Outros produtos</h2></div><a class="btn btn-linha" href="${L('produtos')}">Catálogo completo</a></div>
    <div class="grade-ficha">${outros.map(o => cartaoProduto(o, v, 'ficha')).join('')}</div>
  </div></section>
  ${chamada(v, `Orçamento de ${p.nome}`, p.cat === 'etanol' ? 'Informe o volume e a frequência de retirada e nossa equipe comercial retorna com a proposta.' : p.cat === 'energia' ? 'Fale com a equipe comercial sobre contratos de energia.' : 'Informe a embalagem, o volume e a cidade de entrega e nossa equipe de vendas retorna com a proposta.')}`;

  return `<section class="pd-topo"><div class="wrap">
  <nav class="trilha escura" aria-label="Você está em"><a href="${L('index')}">Início</a><span>/</span><a href="${L('produtos')}">Produtos</a><span>/</span><a href="${L('produtos')}#${c.id}">${c.nome}</a><span>/</span><span aria-current="page">${p.nome}</span></nav>
  <div class="pd-grid">${palco}${info}</div>
</div></section>
<nav class="pd-abas" aria-label="Seções do produto"><div class="wrap">${secoes.map(([id, t]) => `<a href="#${id}">${t}</a>`).join('')}<a class="pd-abas-cta" href="${L('orcamento')}?produto=${p.slug}">Pedir orçamento</a></div></nav>
${corpo}`;
}

/* ---------------- Receitas ---------------- */

function receitasPag(v) {
  return `${capa(v, { eyebrow: 'Receitas', titulo: 'Receitas para adoçar o seu dia', texto: 'Bolos, doces, pães e sobremesas testados com Açúcar Alto Alegre.', foto: 'f-cafe', trilha: [[null, 'Receitas']] })}
<section class="sec"><div class="wrap">
  <div class="filtros" aria-label="Filtrar por açúcar">
    <button class="on" data-filtro-r="todos">Todas <span>${receitas.length}</span></button>
    ${['acucar-cristal', 'acucar-refinado', 'acucar-demerara'].map(s => `<button data-filtro-r="${s}">${prod(s).nome} <span>${receitas.filter(r => r.acucar.includes(s)).length}</span></button>`).join('')}
  </div>
  <div class="receitas-grade">${receitas.map(r => cartaoReceita(r, v)).join('')}</div>
</div></section>
<section class="sec bloco-azul delicias"><div class="wrap split">
  <div><span class="eyebrow claro">YouTube</span><h2 class="h2">Delícias Alto Alegre</h2><p>Acesse o canal no YouTube e conheça mais receitas com as chefs Camila Galindo e Dani Dinalo.</p>
  <div class="ctas"><a class="btn btn-cta" href="${site.redes[2][1]}" target="_blank" rel="noopener">${ico('youtube')}Assistir no YouTube</a></div></div>
  <div class="pic">${img('f-delicias', 'Chefs Camila Galindo e Dani Dinalo no Delícias Alto Alegre', 'width="1920" height="575"')}</div>
</div></section>`;
}

function receita(v, r) {
  const L = linkDe(v);
  const usados = r.acucar.map(prod);
  const outras = receitas.filter(o => o.slug !== r.slug && o.acucar.some(a => r.acucar.includes(a))).slice(0, 3);
  return `<section class="rc-topo"><div class="wrap">
  <nav class="trilha escura" aria-label="Você está em"><a href="${L('index')}">Início</a><span>/</span><a href="${L('receitas')}">Receitas</a><span>/</span><span aria-current="page">${r.nome}</span></nav>
  <div class="rc-grid">
    <div class="rc-img">${img(r.foto, r.nome, 'width="1000" height="668" loading="eager"')}</div>
    <div>
      <span class="eyebrow">Receita</span><h1>${r.nome}</h1>
      <div class="rc-fatos"><div>${ico('relogio')}<span><small>Tempo</small>${r.tempo}</span></div><div>${ico('porcao')}<span><small>Rendimento</small>${r.rende}</span></div></div>
      <div class="rc-usa"><small>Feita com</small>${usados.map(p => `<a href="${L('produtos/' + p.slug)}" style="--c:${p.cor}">${img(p.foto, '', 'width="36" height="48"')}<span>${p.nome}</span></a>`).join('')}</div>
    </div>
  </div>
</div></section>
<section class="sec"><div class="wrap rc-corpo">
  <div class="ingr"><h2>Ingredientes</h2>${r.ingr.map(([g, l]) => `${g ? `<h3>${g}</h3>` : ''}<ul>${l.map(i => `<li>${i.includes('Alto Alegre') ? `<b>${i}</b>` : i}</li>`).join('')}</ul>`).join('')}</div>
  <div class="modo"><h2>Modo de preparo</h2><ol>${r.preparo.map(t => `<li>${t}</li>`).join('')}</ol></div>
</div></section>
${outras.length ? `<section class="sec areia"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">Mais receitas</span><h2>Você também pode gostar</h2></div><a class="btn btn-linha" href="${L('receitas')}">Ver todas</a></div><div class="receitas-linha">${outras.map(o => cartaoReceita(o, v)).join('')}</div></div></section>` : ''}`;
}

/* ---------------- Sustentabilidade ---------------- */

function sustentabilidade(v) {
  const L = linkDe(v);
  return `${capa(v, { eyebrow: 'Sustentabilidade', titulo: 'Crescer cuidando das pessoas e do ambiente', texto: 'Desde 2011 a Alto Alegre publica o relatório anual de sustentabilidade, no padrão da Global Reporting Initiative (GRI).', foto: 'f-plantio', trilha: [[null, 'Sustentabilidade']] })}
<section class="sec"><div class="wrap split topo-al">
  <div><span class="eyebrow">Desempenho social</span><h2 class="h2">Programas para quem faz a Alto Alegre</h2>
  <p class="muted">Nossa Política Social reúne programas internos para os colaboradores e apoio a causas da comunidade em saúde, educação, cultura e crescimento espiritual. Todo mês doamos pacotes de Açúcar Alto Alegre a entidades da região.</p>
  <div class="pic media">${img('f-esporte', 'Equipe de basquete em cadeira de rodas apoiada pela Alto Alegre', 'width="1920" height="380"')}</div></div>
  <div class="proj-grid">${projetosSociais.map(([t, d], k) => `<div class="proj"><i>${num(k)}</i><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>
<section class="sec oficina-home"><div class="wrap"><div class="of-in">
  ${img('logo-oficina', 'Oficina de Doces Alto Alegre', 'class="of-logo" width="700" height="466"')}
  <div><span class="eyebrow">Projeto social</span><h2 class="h2">Oficina de Doces</h2><p>Oficina de culinária gratuita para crianças de 7 a 10 anos. Em 2018 participaram cerca de 600 crianças; em 2019 houve edições em Colorado (PR) e Presidente Prudente (SP).</p>
  <div class="ctas"><a class="btn" href="${L('sustentabilidade/oficina-de-doces')}">Conheça o projeto</a></div></div>
</div></div></section>
<section class="sec bloco-verde"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow claro">Desempenho ambiental</span><h2>Nada se perde, tudo se aproveita</h2></div><p>A Política Ambiental cobre a produção do plantio ao produto final, com reaproveitamento dos resíduos.</p></div>
  <div class="ciclo">${[['cana', 'Bagaço', 'vira combustível para gerar energia elétrica'], ['folha', 'Torta de filtro', 'volta ao solo como adubo'], ['gota', 'Água', 'é reaproveitada no processo']].map(([i, t, d]) => `<div>${ico(i)}<b>${t}</b><span>${d}</span></div>`).join('')}</div>
  <div class="proj-grid cinco">${projetosAmbientais.map(([t, d], k) => `<div class="proj"><i>${num(k)}</i><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>
${publicacoesSec(v)}
${chamada(v)}`;
}

function oficina(v) {
  return `${capa(v, { eyebrow: 'Projeto social', titulo: 'Oficina de Doces Alto Alegre', texto: 'Culinária gratuita para crianças de 7 a 10 anos, com muito açúcar e alegria.', foto: 'f-oficina', trilha: [['sustentabilidade', 'Sustentabilidade'], [null, 'Oficina de Doces']] })}
<section class="sec"><div class="wrap split">
  <div>${img('logo-oficina', 'Oficina de Doces 2026', 'width="700" height="466"')}</div>
  <div><span class="eyebrow">Inscrições abertas</span><h2 class="h2">Faça a inscrição do seu filho</h2>
  <p class="lead">A Oficina de Doces ensina crianças de 7 a 10 anos a preparar receitas simples, com segurança e acompanhamento.</p>
  <p class="muted">A primeira edição, em 2018, reuniu cerca de 600 crianças. Em 2019 a oficina aconteceu em Colorado (PR) e em Presidente Prudente (SP). A edição de 2026 está com inscrições abertas no portal da Alto Alegre.</p>
  <div class="ctas"><a class="btn btn-cta" href="${site.oficinaInscricao}" target="_blank" rel="noopener">Inscrever meu filho ${ico('seta')}</a></div></div>
</div></section>
<section class="sec bloco-azul"><div class="wrap">
  <div class="nums claro">${[['7 a 10', 'anos de idade'], ['600', 'crianças na edição de 2018'], ['Gratuita', 'para as famílias']].map(([n, t]) => `<div class="n"><b>${n}</b><span>${t}</span></div>`).join('')}</div>
</div></section>`;
}

/* ---------------- Trabalhe conosco, contato, orçamento ---------------- */

const campo = (rot, nome, extra = '', cls = '') => `<label class="${cls}"><span>${rot}</span><input name="${nome}" ${extra}></label>`;
const ufs = 'AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO'.split(' ');

function trabalhe(v) {
  return `${capa(v, { eyebrow: 'Carreiras', titulo: 'Trabalhe conosco', texto: 'Venha crescer com a Alto Alegre. Investimos em treinamento, saúde e desenvolvimento de carreira.', foto: 'f-escritorio', trilha: [[null, 'Trabalhe conosco']] })}
<section class="sec"><div class="wrap split topo-al">
  <div><span class="eyebrow">Por que a Alto Alegre</span><h2 class="h2">Gente é o centro da nossa missão</h2>
  <div class="cert-lista">${[['Estágio', 'Projeto Pensando no Futuro, para universitários.'], ['Programa Trainee', 'Formação de novos líderes.'], ['Capacitação', 'Treinamento, aperfeiçoamento e desenvolvimento de carreira.'], ['Saúde e bem-estar', 'Restaurante com Cardápio Light, Café com Saúde e acompanhamento das famílias.']].map(([t, d], k) => `<div><i>${num(k)}</i><span><b>${t}</b><p>${d}</p></span></div>`).join('')}</div></div>
  <form class="form cartao-form" data-form="curriculo">
    <h2>Envie seu currículo</h2><p class="muted">Preencha os dados e anexe o currículo no e-mail que vai se abrir.</p>
    ${campo('Nome completo', 'nome', 'required autocomplete="name"', 'cheia')}
    ${campo('E-mail', 'email', 'type="email" required autocomplete="email"')}
    ${campo('Telefone', 'telefone', 'type="tel" autocomplete="tel"')}
    ${campo('Cidade', 'cidade', 'autocomplete="address-level2"')}
    <label><span>Estado</span><select name="uf">${ufs.map(u => `<option${u === 'SP' ? ' selected' : ''}>${u}</option>`).join('')}</select></label>
    <label class="cheia"><span>Área de interesse</span><select name="area"><option>Agrícola</option><option>Industrial</option><option>Administrativa</option><option>Estágio</option><option>Programa Trainee</option><option>Outra</option></select></label>
    <label class="cheia"><span>Conte um pouco sobre você</span><textarea name="mensagem" rows="4"></textarea></label>
    <div class="cheia"><button class="btn btn-cta" type="submit">Enviar currículo ${ico('seta')}</button></div>
  </form>
</div></section>`;
}

function contato(v) {
  const L = linkDe(v);
  return `${capa(v, { eyebrow: 'Contato', titulo: 'Fale com a Alto Alegre', texto: 'Vendas, SAC, ouvidoria e Escritório Central em Presidente Prudente.', foto: 'f-escritorio', trilha: [[null, 'Contato']] })}
<section class="sec"><div class="wrap">
  <div class="canais">
    <div class="canal destaque">${ico('caixa')}<h3>Equipe de vendas</h3><p>Orçamentos de açúcar, etanol e energia.</p><a href="tel:${site.vendas0800Href}">${site.vendas0800}</a><a href="mailto:${site.emailVendas}">${site.emailVendas}</a><a class="btn btn-cta" href="${L('orcamento')}">Pedir orçamento</a></div>
    <div class="canal">${ico('pessoas')}<h3>SAC</h3><p>Sugestões, dúvidas e críticas sobre os nossos produtos, por telefone ou pela internet.</p><a href="tel:${site.sac0800Href}">${site.sac0800}</a><a href="mailto:${site.email}">${site.email}</a></div>
    <div class="canal">${ico('escudo')}<h3>Ouvidoria</h3><p>Canal confidencial e gratuito para denúncias, reclamações, sugestões ou elogios. Quem se identifica recebe um número de controle; o prazo de análise é de até 90 dias.</p><a href="mailto:${site.email}?subject=Ouvidoria">Enviar manifestação</a></div>
    <div class="canal">${ico('pin')}<h3>Escritório Central</h3><p>${site.endereco}<br>${site.cidade}<br>CEP ${site.cep}</p><a href="tel:${site.foneHref}">${site.fone}</a><a href="${site.mapa}" target="_blank" rel="noopener">Abrir no mapa</a></div>
  </div>
</div></section>
<section class="sec areia"><div class="wrap split topo-al">
  <div><span class="eyebrow">Mensagem</span><h2 class="h2">Escreva para nós</h2><p class="muted">Sua mensagem chega ao e-mail ${site.email}. Para orçamentos, use o <a class="link" href="${L('orcamento')}">formulário de orçamento</a>, que vai direto para a equipe de vendas.</p>
  <div class="mapa-frame"><iframe title="Mapa do Escritório Central" loading="lazy" src="https://www.google.com/maps?q=Rua+Jos%C3%A9+Leite+40+Presidente+Prudente+SP&amp;output=embed"></iframe></div></div>
  <form class="form cartao-form" data-form="contato">
    <label class="cheia"><span>Assunto</span><select name="assunto"><option>SAC</option><option>Ouvidoria</option><option>Vendas</option><option>Imprensa</option><option>Outro assunto</option></select></label>
    ${campo('Nome', 'nome', 'required autocomplete="name"', 'cheia')}
    ${campo('E-mail', 'email', 'type="email" required autocomplete="email"')}
    ${campo('Telefone', 'telefone', 'type="tel" autocomplete="tel"')}
    ${campo('Cidade', 'cidade', 'autocomplete="address-level2"')}
    <label><span>Estado</span><select name="uf">${ufs.map(u => `<option${u === 'SP' ? ' selected' : ''}>${u}</option>`).join('')}</select></label>
    <label class="cheia"><span>Mensagem</span><textarea name="mensagem" rows="5" required></textarea></label>
    <div class="cheia"><button class="btn btn-cta" type="submit">Enviar mensagem ${ico('seta')}</button></div>
  </form>
</div></section>`;
}

function orcamento(v) {
  return `<section class="orc"><div class="wrap">
  <nav class="trilha escura" aria-label="Você está em"><a href="${linkDe(v)('index')}">Início</a><span>/</span><span aria-current="page">Pedir orçamento</span></nav>
  <div class="orc-grid">
    <div class="orc-lado">
      <span class="eyebrow">Equipe de vendas</span><h1>Pedir orçamento</h1>
      <p class="muted">Conte o que você precisa e a equipe comercial da Alto Alegre retorna com preço, prazo e condições.</p>
      <div class="orc-prod" data-orc-prod>${img('p-cristal', '', 'width="150" height="200" data-orc-foto')}<div><small>Produto escolhido</small><b data-orc-nome>Açúcar Cristal</b><span data-orc-emb>2 kg</span></div></div>
      <ul class="orc-passos">${['Escolha o produto e a embalagem', 'Informe o volume e a cidade de entrega', 'Receba a proposta da equipe de vendas'].map((t, k) => `<li><i>${k + 1}</i>${t}</li>`).join('')}</ul>
      <div class="orc-contato"><a href="tel:${site.vendas0800Href}">${ico('fone')}<span><small>Ligação gratuita</small>${site.vendas0800}</span></a><a href="mailto:${site.emailVendas}">${ico('mail')}<span><small>E-mail</small>${site.emailVendas}</span></a></div>
    </div>
    <form class="form cartao-form" data-form="orcamento">
      <fieldset class="cheia"><legend>Produto</legend>
        <div class="orc-escolha">${produtos.map(p => `<label class="oe" style="--c:${p.cor}"><input type="radio" name="produto" value="${p.slug}" data-nome="${esc(p.nome)}" data-foto="${p.foto}" data-embs="${esc(p.embalagens.map(e => e[0]).join('|'))}"${p.slug === 'acucar-cristal' ? ' checked' : ''}><span>${p.foto.startsWith('p-') ? img(p.foto, '', 'width="34" height="46"') : ico(p.cat === 'etanol' ? 'gota' : 'raio')}${p.nome}</span></label>`).join('')}</div>
      </fieldset>
      <label><span>Embalagem</span><select name="embalagem" data-orc-sel></select></label>
      <label><span>Quantidade</span><input name="quantidade" placeholder="Ex.: 200 fardos, 30 toneladas, 45 m³" required></label>
      <label><span>Frequência</span><select name="frequencia"><option>Compra única</option><option>Mensal</option><option>Quinzenal</option><option>Contrato por safra</option></select></label>
      <label><span>Segmento</span><select name="segmento"><option>Varejo e supermercado</option><option>Atacado e distribuição</option><option>Food service</option><option>Indústria de alimentos</option><option>Distribuidora de combustível</option><option>Outro</option></select></label>
      ${campo('Nome', 'nome', 'required autocomplete="name"')}
      ${campo('Empresa', 'empresa', 'required autocomplete="organization"')}
      ${campo('CNPJ', 'cnpj', 'inputmode="numeric"')}
      ${campo('E-mail', 'email', 'type="email" required autocomplete="email"')}
      ${campo('Telefone ou WhatsApp', 'telefone', 'type="tel" required autocomplete="tel"')}
      ${campo('Cidade de entrega', 'cidade', 'required autocomplete="address-level2"')}
      <label class="cheia"><span>Observações</span><textarea name="mensagem" rows="4" placeholder="Prazo, local de entrega, especificações..."></textarea></label>
      <div class="cheia form-fim"><button class="btn btn-cta" type="submit">Enviar pedido de orçamento ${ico('seta')}</button><small>O pedido abre no seu e-mail, endereçado a ${site.emailVendas}.</small></div>
    </form>
  </div>
</div></section>`;
}

/* ---------------- Montagem ---------------- */

export function paginas(v) {
  const p = {};
  const add = (slug, titulo, desc, corpo) => (p[slug] = documento({ v, slug, titulo, desc, corpo }));
  add('index', 'Alto Alegre | Açúcar, etanol e energia', 'Usina Alto Alegre: açúcar cristal, refinado, demerara e sachê, etanol combustível e energia elétrica, com unidades no Paraná e em São Paulo.', v === 'a' ? homeA(v) : homeB(v));
  add('sobre', 'Sobre nós', 'A história da Usina Alto Alegre desde 1978, unidades, capacidade de produção, missão e certificações.', sobre(v));
  add('produtos', 'Produtos', 'Catálogo Alto Alegre: açúcar cristal, refinado, demerara e sachê, etanol anidro e hidratado e energia elétrica.', catalogo(v));
  for (const pr of produtos) add('produtos/' + pr.slug, pr.nome, `${pr.nome} Alto Alegre. ${pr.resumo}`, produto(v, pr));
  add('receitas', 'Receitas', 'Receitas de bolos, doces, pães e sobremesas feitas com Açúcar Alto Alegre.', receitasPag(v));
  for (const r of receitas) add('receitas/' + r.slug, r.nome, `Receita de ${r.nome} com Açúcar Alto Alegre. Rende ${r.rende}, em ${r.tempo}.`, receita(v, r));
  add('sustentabilidade', 'Sustentabilidade', 'Programas sociais e ambientais da Usina Alto Alegre e relatórios de sustentabilidade no padrão GRI.', sustentabilidade(v));
  add('sustentabilidade/oficina-de-doces', 'Oficina de Doces', 'Oficina de culinária gratuita da Alto Alegre para crianças de 7 a 10 anos.', oficina(v));
  add('trabalhe-conosco', 'Trabalhe conosco', 'Envie seu currículo para a Usina Alto Alegre.', trabalhe(v));
  add('contato', 'Contato', 'Vendas, SAC, ouvidoria e Escritório Central da Usina Alto Alegre em Presidente Prudente, SP.', contato(v));
  add('orcamento', 'Pedir orçamento', 'Peça orçamento de açúcar, etanol ou energia à equipe de vendas da Alto Alegre.', orcamento(v));
  return p;
}
