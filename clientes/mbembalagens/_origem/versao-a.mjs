// Versão A, "Catálogo": clara, papel branco e cinza-azulado, azul-marinho do logo no texto e laranja só na ação.
// Cara de catálogo de fábrica bem organizado: abertura dividida com foto, linhas em cartões, medidas em tabela limpa.
import { site, anos, nav, linhas, linha, totalProdutos, segmentos, fatos, etapas } from './conteudo.mjs';
import { documento, logo, img, zap, tabela, formOrcamento, seta, iconeZap } from './comum.mjs';

const V = 'a';
const L = s => `/${V}/${s === 'index' ? '' : s + '/'}`;

const header = slug => `<div class="util"><div class="in util-in">
  <span>Fábrica em Esteio/RS · atendimento em todo o Sul</span>
  <span class="util-dir"><a href="tel:${site.telHref}">${site.tel}</a><a href="mailto:${site.email}">${site.email}</a></span>
</div></div>
<header class="topo"><div class="in topo-in">
  <a class="topo-marca" href="${L('index')}" aria-label="MB Embalagens, início">${logo()}</a>
  <nav class="topo-nav" id="menu" aria-label="Principal">
    ${nav.map(([s, n]) => `<a href="${L(s)}"${slug.split('/')[0] === s ? ' aria-current="page"' : ''}>${n}</a>`).join('\n    ')}
  </nav>
  <a class="btn btn-prim topo-cta" href="${L('contato')}">Pedir orçamento</a>
  <button class="topo-menu" type="button" aria-expanded="false" aria-controls="menu" data-menu><span></span>Menu</button>
</div></header>`;

const footer = () => `<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca">${logo(true)}<p>${site.slogan} Embalagens plásticas e flexíveis fabricadas em Esteio/RS desde ${site.fundacao}.</p></div>
  <div class="rodape-col"><h2>Produtos</h2>${linhas.map(l => `<a href="${L('produtos/' + l.id)}">${l.nome}</a>`).join('')}<a href="${L('industria')}">Bobinas industriais</a></div>
  <div class="rodape-col"><h2>MB</h2><a href="${L('empresa')}">Empresa</a><a href="${L('segmentos')}">Segmentos</a><a href="${L('contato')}">Orçamento</a></div>
  <div class="rodape-col"><h2>Contato</h2><a href="tel:${site.telHref}">${site.tel}</a><a href="${zap()}">WhatsApp ${site.zapTel}</a><a href="mailto:${site.email}">${site.email}</a><p>${site.endereco.join('<br>')}</p></div>
</div>
<div class="in rodape-base"><span>© 2026 ${site.razao}</span><a href="/">Ver as duas versões</a></div></footer>`;

const trilha = itens => `<nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${itens.map(([h, n]) => h ? `<a href="${L(h)}">${n}</a>` : `<span>${n}</span>`).join('')}</nav>`;
const cabeca = (titulo, lead, itens, foto) => `<section class="cabeca${foto ? ' cabeca-foto' : ''}"><div class="in cabeca-in">
  <div>${trilha(itens)}<h1>${titulo}</h1><p class="lead">${lead}</p></div>
  ${foto ? `<div class="cabeca-img">${img(foto, '')}</div>` : ''}
</div></section>`;

const cta = (titulo = 'Diga o produto, a medida e a quantidade. A gente responde com preço e prazo.') => `<section class="cta"><div class="in cta-in">
  <div><span class="eyebrow">Orçamento</span><h2>${titulo}</h2></div>
  <div class="cta-acoes"><a class="btn btn-prim" href="${zap()}">${iconeZap} Orçamento pelo WhatsApp</a><a class="btn btn-contorno" href="${L('contato')}">Formulário de orçamento</a></div>
</div></section>`;

const cartaoLinha = l => `<a class="linha-card" href="${L('produtos/' + l.id)}">
  <div class="linha-img">${img(l.foto, l.nome)}</div>
  <div class="linha-txt"><span class="tag">${l.sub} · ${l.produtos.length} ${l.produtos.length > 1 ? 'produtos' : 'produto'}</span><h3>${l.nome}</h3><p>${l.resumo}</p><span class="link">Ver medidas ${seta}</span></div>
</a>`;

const fichaProduto = p => `<article class="ficha" id="${p.id}">
  <div class="ficha-img">${img(p.foto, p.nome)}</div>
  <div class="ficha-txt"><h2>${p.nome}</h2><p>${p.nota}</p>${tabela(p)}
  <a class="link" href="${zap(`Olá! Gostaria de um orçamento de ${p.nome}.`)}">Pedir orçamento deste produto ${seta}</a></div>
</article>`;

const paginaLinha = id => {
  const l = linha(id);
  const outras = linhas.filter(o => o.id !== id);
  return `${cabeca(l.nome, l.texto, [['produtos', 'Produtos'], [null, l.nome]], l.foto)}
<nav class="ancoras" aria-label="Produtos desta linha"><div class="in">${l.produtos.map(p => `<a href="#${p.id}">${p.nome}</a>`).join('')}</div></nav>
<section class="secao"><div class="in fichas">${l.produtos.map(fichaProduto).join('')}</div></section>
<section class="secao secao-cinza"><div class="in"><div class="secao-topo"><div><span class="eyebrow">Outras linhas</span><h2>Complete o pedido</h2></div></div>
<div class="linhas linhas-3">${outras.map(cartaoLinha).join('')}</div></div></section>
${cta()}`;
};

const pag = {
  index: () => `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <span class="eyebrow">Fábrica em Esteio/RS · desde ${site.fundacao}</span>
    <h1>Embalagens plásticas e flexíveis para quem vende todo dia.</h1>
    <p class="lead">Bobinas, sacarias e sacolas fabricadas pela MB há ${anos} anos para distribuidores, atacadistas, comércio e indústria de todo o Sul.</p>
    <div class="hero-acoes"><a class="btn btn-prim" href="${L('produtos')}">Ver o catálogo ${seta}</a><a class="btn btn-sec" href="${zap()}">${iconeZap} Pedir orçamento</a></div>
    <dl class="hero-num">${fatos.map(([v, r]) => `<div><dt>${v}</dt><dd>${r}</dd></div>`).join('')}</dl>
  </div>
  <figure class="hero-foto">${img('banca-bobinas-q', 'Bobinas de sacos plásticos na banca de hortifrúti', 'fetchpriority="high" loading="eager"')}
    <figcaption><b>Bobinas de milheiro</b> 1 a 15 litros, 500 a 1.000 sacos por bobina.</figcaption></figure>
</div></section>

<section class="secao"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Linhas de produto</span><h2>${totalProdutos} produtos em quatro linhas, todos com medida e embalagem na tabela.</h2></div><a class="link" href="${L('produtos')}">Catálogo completo ${seta}</a></div>
  <div class="linhas">${linhas.map(cartaoLinha).join('')}</div>
</div></section>

<section class="secao secao-cinza"><div class="in faixa-dupla">
  <div class="faixa-foto">${img('lanchonete', 'Pão e frios embalados em saco plástico')}</div>
  <div><span class="eyebrow">Para cada balcão</span><h2>Do saquinho de rapadura ao saco de 90 x 200 cm para frigorífico.</h2>
  <p>Cachorro-quente, xis, bauru, frios, sacolé, farmácia, jornal, sanduíche, rapadura e gelo: a MB tem a medida pronta para cada uso, em bobina ou saco solto.</p>
  <ul class="chips">${segmentos.map(s => `<li>${s.nome}</li>`).join('')}</ul>
  <a class="link" href="${L('segmentos')}">Ver segmentos atendidos ${seta}</a></div>
</div></section>

<section class="secao"><div class="in faixa-dupla faixa-inv">
  <div><span class="eyebrow">Para indústrias</span><h2>Filme extrusado em bobina para quem não tem extrusão própria.</h2>
  <p>Bobinas industriais de polietileno de baixa (BX) ou média (MD) densidade, nas larguras de 17 a 40 cm ou na medida que a sua linha pede.</p>
  <a class="btn btn-sec" href="${L('industria')}">Bobinas industriais ${seta}</a></div>
  <div class="faixa-foto">${img('linha-bobinas', 'Bobinas industriais de filme plástico')}</div>
</div></section>

<section class="secao secao-marinho"><div class="in empresa-faixa">
  <div><span class="eyebrow">Desde ${site.fundacao}</span><h2>${site.slogan}</h2>
  <p>Área industrial moderna em Esteio, região metropolitana de Porto Alegre, com máquinas de transformação e beneficiamento de filmes. Linha virgem e linha com material reciclado selecionado.</p>
  <a class="link link-claro" href="${L('empresa')}">Conheça a MB ${seta}</a></div>
  <ol class="etapas">${etapas.map(([t, d], i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
${cta()}`,

  produtos: () => `${cabeca('Catálogo de produtos', `${totalProdutos} produtos em quatro linhas. Cada um com medidas, quantidade por bobina ou pacote e fardo.`, [[null, 'Produtos']])}
<section class="secao"><div class="in"><div class="linhas">${linhas.map(cartaoLinha).join('')}</div></div></section>
<section class="secao secao-cinza"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Resumo</span><h2>Tudo o que a MB fabrica, numa tabela.</h2></div></div>
  <div class="tabela-rolo"><table class="tabela tabela-resumo"><thead><tr><th scope="col">Linha</th><th scope="col">Produto</th><th scope="col">Medidas</th><th scope="col"></th></tr></thead><tbody>
  ${linhas.flatMap(l => l.produtos.map(p => `<tr><td>${l.nome}</td><th scope="row">${p.nome}</th><td>${p.rows.length} ${p.cols[0] === 'Largura' ? 'larguras' : 'medidas'}</td><td><a class="link" href="${L('produtos/' + l.id)}#${p.id}">Ver tabela ${seta}</a></td></tr>`)).join('')}
  </tbody></table></div>
</div></section>
${cta()}`,

  'produtos/bobinas': () => paginaLinha('bobinas'),
  'produtos/multidobras': () => paginaLinha('multidobras'),
  'produtos/sacarias': () => paginaLinha('sacarias'),
  'produtos/sacolas': () => paginaLinha('sacolas'),

  industria: () => {
    const p = linha('bobinas').produtos.find(x => x.id === 'industriais');
    return `${cabeca('Bobinas industriais', 'Bobinas extrusadas industriais também são um produto MB: filme de polietileno para empresas que não têm extrusão própria.', [[null, 'Para indústrias']], 'faixa-bobinas')}
<section class="secao"><div class="in faixa-dupla">
  <div class="faixa-foto">${img('p-industriais', 'Bobinas industriais')}</div>
  <div><span class="eyebrow">Como funciona</span><h2>Você informa largura, densidade e uso. A MB extruda e bobina.</h2>
  <p>Baixa densidade (BX) para filme macio e transparente; média densidade (MD) para filme mais firme e de maior rendimento. Larguras padrão de 17 a 40 cm, outras medidas sob consulta.</p>
  ${tabela(p)}</div>
</div></section>
<section class="secao secao-cinza"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Para orçar</span><h2>O que mandar no pedido</h2></div></div>
  <ol class="passos">${[['Largura', 'Em centímetros, ou a referência da sua máquina.'], ['Densidade', 'BX ou MD. Se não souber, conte o que vai embalar.'], ['Uso', 'Corte e solda própria, empacotadora automática ou manual.'], ['Volume', 'Quilos por mês ou por pedido, e a cidade de entrega.']].map(([t, d], i) => `<li><b>${i + 1}</b><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
${cta('Mande largura, densidade e volume. A MB responde com peso, preço e prazo.')}`;
  },

  segmentos: () => `${cabeca('Segmentos atendidos', 'Distribuidores, atacadistas, comércio e indústria de toda a região Sul. Veja os produtos mais pedidos por cada um.', [[null, 'Segmentos']])}
<section class="secao"><div class="in segmentos">${segmentos.map(s => `<article class="segmento" id="${s.id}">
  <div class="segmento-img">${img(s.foto, s.nome)}</div>
  <div class="segmento-txt"><h2>${s.nome}</h2><p>${s.texto}</p><ul>${s.itens.map(i => `<li>${i}</li>`).join('')}</ul></div>
</article>`).join('')}</div></section>
${cta()}`,

  empresa: () => `${cabeca('Uma empresa comprometida com a qualidade', `Desde ${site.fundacao}, a MB Embalagens transforma polímeros em soluções e facilidades para o dia a dia.`, [[null, 'Empresa']], 'sacolas-rua')}
<section class="secao"><div class="in empresa-txt">
  <div><span class="eyebrow">Quem somos</span><h2>Fábrica de embalagens plásticas flexíveis em Esteio, na Grande Porto Alegre.</h2></div>
  <div class="prosa">
    <p>A MB Embalagens produz embalagens plásticas de todos os tamanhos, também com material reciclado selecionado, com soluções para as mais diversas aplicações. Atende distribuidores e atacadistas de toda a região Sul do Brasil.</p>
    <p>A fábrica fica em uma área industrial moderna, com máquinas de transformação e beneficiamento de filmes de última geração. A empresa busca a liderança no segmento e contribui para o desenvolvimento econômico e social das regiões em que atua, com produtos fabricados com qualidade e garantia de satisfação.</p>
  </div>
</div></section>
<section class="secao secao-cinza"><div class="in">
  <dl class="numeros">${fatos.map(([v, r]) => `<div><dt>${v}</dt><dd>${r}</dd></div>`).join('')}<div><dt>2</dt><dd>linhas de matéria-prima: virgem e reciclada</dd></div></dl>
</div></section>
<section class="secao"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Fabricação</span><h2>Do grão de polietileno ao fardo fechado.</h2></div></div>
  <ol class="passos">${etapas.map(([t, d], i) => `<li><b>${i + 1}</b><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
<section class="secao secao-cinza"><div class="in faixa-dupla">
  <div class="faixa-foto">${img('hortifruti', 'Verduras embaladas em sacos plásticos')}</div>
  <div><span class="eyebrow">Material reciclado selecionado</span><h2>Além da linha virgem, embalagens com material reciclado.</h2>
  <p>Para as aplicações em que o reciclado é indicado, a MB fabrica com material reciclado selecionado, nas mesmas medidas da linha virgem.</p></div>
</div></section>
${cta()}`,

  contato: () => `${cabeca('Contato e orçamento', 'Mande o produto, a medida e a quantidade. Respondemos com preço e prazo de entrega.', [[null, 'Contato']])}
<section class="secao"><div class="in contato">
  <div class="contato-form"><h2>Pedido de orçamento</h2><p>O formulário monta a mensagem e abre o seu WhatsApp ou e-mail.</p>${formOrcamento()}</div>
  <aside class="contato-dados">
    <div><h3>Telefone</h3><a href="tel:${site.telHref}">${site.tel}</a></div>
    <div><h3>WhatsApp</h3><a href="${zap()}">${site.zapTel}</a></div>
    <div><h3>E-mail</h3><a href="mailto:${site.email}">${site.email}</a></div>
    <div><h3>Fábrica</h3><p>${site.endereco.join('<br>')}</p><a class="link" href="${site.mapaLink}">Abrir no mapa ${seta}</a></div>
    <div><h3>Horário</h3><p>${site.horario}</p></div>
  </aside>
</div></section>
<section class="mapa"><iframe title="Mapa da fábrica da MB Embalagens em Esteio" src="${site.mapa}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`,
};

export function versaoA() {
  const out = {};
  for (const [slug, corpo] of Object.entries(pag)) {
    out[slug] = documento({ versao: V, slug, tema: '#181e58', corpo: `${header(slug)}\n<main>${corpo()}</main>\n${footer()}` });
  }
  return out;
}
