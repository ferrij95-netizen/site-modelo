// Versão B, "Fábrica": azul-marinho do logo como fundo, faixa laranja das caixas da MB como marca gráfica.
// Foto em tela cheia na abertura, linhas em lista numerada, catálogo com menu lateral fixo e segmentos em mosaico.
import { site, anos, nav, linhas, linha, totalProdutos, segmentos, etapas } from './conteudo.mjs';
import { documento, logo, img, zap, tabela, formOrcamento, seta, iconeZap, num } from './comum.mjs';

const V = 'b';
const L = s => `/${V}/${s === 'index' ? '' : s + '/'}`;

const header = (slug, sobre) => `<header class="topo${sobre ? ' topo-sobre' : ''}"><div class="in topo-in">
  <a class="topo-marca" href="${L('index')}" aria-label="MB Embalagens, início">${logo(true)}</a>
  <nav class="topo-nav" id="menu" aria-label="Principal">
    ${nav.map(([s, n]) => `<a href="${L(s)}"${slug.split('/')[0] === s ? ' aria-current="page"' : ''}>${n}</a>`).join('\n    ')}
  </nav>
  <a class="topo-tel" href="tel:${site.telHref}">${site.tel}</a>
  <a class="btn btn-prim topo-cta" href="${zap()}">${iconeZap} Orçamento</a>
  <button class="topo-menu" type="button" aria-expanded="false" aria-controls="menu" data-menu><span></span>Menu</button>
</div></header>`;

const footer = () => `<footer class="rodape"><div class="faixa-mb" aria-hidden="true"></div><div class="in rodape-in">
  <div class="rodape-marca">${logo(true)}<p class="rodape-slogan">${site.slogan}</p></div>
  <div class="rodape-col"><h2>Catálogo</h2>${linhas.map(l => `<a href="${L('produtos/' + l.id)}">${l.nome}</a>`).join('')}<a href="${L('industria')}">Bobinas industriais</a></div>
  <div class="rodape-col"><h2>Empresa</h2><a href="${L('empresa')}">A MB</a><a href="${L('segmentos')}">Segmentos</a><a href="${L('contato')}">Contato</a></div>
  <div class="rodape-col"><h2>Fábrica</h2><p>${site.endereco.join('<br>')}</p><a href="tel:${site.telHref}">${site.tel}</a><a href="mailto:${site.email}">${site.email}</a></div>
</div>
<div class="in rodape-base"><span>© 2026 ${site.razao} · Esteio/RS</span><a href="/">Ver as duas versões</a></div></footer>`;

const cabeca = (eyebrow, titulo, lead, foto) => `<section class="cabeca"${foto ? ` style="--foto:url(/assets/img/${foto}.webp)"` : ''}><div class="in">
  <span class="eyebrow">${eyebrow}</span><h1>${titulo}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}
</div></section>`;

const cta = (titulo = 'Produto, medida e quantidade. É só isso que a gente precisa para orçar.') => `<section class="cta"><div class="in cta-in">
  <h2>${titulo}</h2>
  <div class="cta-acoes"><a class="btn btn-prim" href="${zap()}">${iconeZap} WhatsApp ${site.zapTel}</a><a class="btn btn-claro" href="${L('contato')}">Formulário ${seta}</a></div>
</div></section>`;

const paginaLinha = id => {
  const l = linha(id);
  return `${cabeca(`Catálogo · ${l.sub}`, l.nome, l.texto, l.faixa)}
<section class="catalogo"><div class="in catalogo-in">
  <aside class="catalogo-menu" aria-label="Catálogo">
    ${linhas.map(o => `<div class="cm-grupo${o.id === id ? ' ativo' : ''}"><a class="cm-linha" href="${L('produtos/' + o.id)}">${o.nome}</a>${o.id === id ? `<div class="cm-itens">${o.produtos.map(p => `<a href="#${p.id}">${p.nome}</a>`).join('')}</div>` : ''}</div>`).join('')}
    <a class="cm-linha" href="${L('industria')}">Bobinas industriais</a>
  </aside>
  <div class="catalogo-lista">${l.produtos.map((p, i) => `<article class="produto" id="${p.id}">
    <div class="produto-topo"><span class="produto-num">${num(i)}</span><div><h2>${p.nome}</h2><p>${p.nota}</p></div>${img(p.foto, p.nome)}</div>
    ${tabela(p)}
    <a class="btn btn-linha" href="${zap(`Olá! Gostaria de um orçamento de ${p.nome}.`)}">${iconeZap} Orçar ${p.nome}</a>
  </article>`).join('')}</div>
</div></section>
${cta()}`;
};

const pag = {
  index: () => `
<section class="hero">
  <div class="hero-foto">${img('hortifruti-q', 'Verduras e legumes embalados em sacos plásticos', 'fetchpriority="high" loading="eager"')}</div>
  <div class="in hero-in">
    <span class="eyebrow">Esteio/RS · desde ${site.fundacao}</span>
    <h1>Embalagens plásticas e flexíveis.</h1>
    <p class="lead">Há ${anos} anos transformando polímeros em soluções e facilidades para o dia a dia de mercados, lanchonetes, açougues, distribuidores e indústrias de todo o Sul.</p>
    <div class="hero-acoes"><a class="btn btn-prim" href="${L('produtos')}">Ver o catálogo ${seta}</a><a class="btn btn-claro" href="${zap()}">${iconeZap} Pedir orçamento</a></div>
  </div>
  <div class="hero-base"><div class="in hero-base-in">${linhas.map(l => `<a href="${L('produtos/' + l.id)}"><b>${l.nome}</b><span>${l.produtos.length} ${l.produtos.length > 1 ? 'produtos' : 'produto'}</span></a>`).join('')}<a href="${L('industria')}"><b>Industriais</b><span>sob medida</span></a></div></div>
</section>
<div class="faixa-mb" aria-hidden="true"></div>

<section class="secao"><div class="in">
  <div class="secao-topo"><span class="eyebrow">O que a MB fabrica</span><h2>Quatro linhas, ${totalProdutos} produtos, todas as medidas na tabela.</h2></div>
  <ol class="indice">${linhas.map((l, i) => `<li><a href="${L('produtos/' + l.id)}">
    <span class="indice-num">${num(i)}</span>
    <span class="indice-txt"><b>${l.nome}</b><span>${l.resumo}</span></span>
    <span class="indice-img">${img(l.foto, l.nome)}</span>
    <span class="indice-seta">${seta}</span>
  </a></li>`).join('')}</ol>
</div></section>

<section class="secao secao-marinho"><div class="in">
  <div class="secao-topo"><span class="eyebrow">Quem compra da MB</span><h2>Uma medida pronta para cada balcão.</h2></div>
  <div class="mosaico">${segmentos.map(s => `<a class="tile" href="${L('segmentos')}#${s.id}">${img(s.foto, s.nome)}<span class="tile-txt"><b>${s.nome}</b><i>${s.texto}</i></span></a>`).join('')}</div>
</div></section>

<section class="secao"><div class="in duas">
  <div class="duas-img">${img('lanchonete', 'Pão e frios embalados')}${img('sacola-frutas', 'Sacola plástica com frutas')}</div>
  <div><span class="eyebrow">Desde ${site.fundacao}</span><h2>${site.slogan}</h2>
  <p>Fábrica em área industrial moderna em Esteio, com máquinas de transformação e beneficiamento de filmes. Linha virgem e linha com material reciclado selecionado, para distribuidores e atacadistas de toda a região Sul.</p>
  <ol class="regua">${etapas.map(([t, d], i) => `<li><b>${num(i)}</b><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  <a class="btn btn-linha" href="${L('empresa')}">Conheça a fábrica ${seta}</a></div>
</div></section>
${cta()}`,

  produtos: () => `${cabeca('Catálogo', 'Todos os produtos', `${totalProdutos} produtos em quatro linhas. Escolha a linha para ver medidas, quantidades e fardos.`, 'faixa-sacolas')}
<section class="secao"><div class="in">
  <div class="grade-linhas">${linhas.map((l, i) => `<section class="bloco-linha">
    <a class="bloco-cab" href="${L('produtos/' + l.id)}"><span class="indice-num">${num(i)}</span><h2>${l.nome}</h2>${img(l.foto, l.nome)}</a>
    <ul>${l.produtos.map(p => `<li><a href="${L('produtos/' + l.id)}#${p.id}"><span>${p.nome}</span><small>${p.rows.length} medidas</small>${seta}</a></li>`).join('')}</ul>
  </section>`).join('')}</div>
</div></section>
${cta()}`,

  'produtos/bobinas': () => paginaLinha('bobinas'),
  'produtos/multidobras': () => paginaLinha('multidobras'),
  'produtos/sacarias': () => paginaLinha('sacarias'),
  'produtos/sacolas': () => paginaLinha('sacolas'),

  industria: () => {
    const p = linha('bobinas').produtos.find(x => x.id === 'industriais');
    return `${cabeca('Para indústrias', 'Filme extrusado em bobina, na sua largura.', 'Bobinas extrusadas industriais também são um produto MB, para empresas que não têm extrusão de filme de polietileno.', 'faixa-bobinas')}
<section class="secao"><div class="in duas">
  <div><span class="eyebrow">Especificação</span><h2>BX ou MD, de 17 a 40 cm.</h2>
  <p>Baixa densidade para filme macio e transparente. Média densidade para filme mais firme, com mais metros por quilo. Outras larguras sob consulta.</p>${tabela(p)}</div>
  <div class="duas-img duas-img-1">${img('p-industriais', 'Bobinas industriais de filme')}</div>
</div></section>
<section class="secao secao-marinho"><div class="in">
  <div class="secao-topo"><span class="eyebrow">Pedido</span><h2>Quatro informações para orçar.</h2></div>
  <ol class="regua regua-larga">${[['Largura', 'Em centímetros ou a referência da máquina.'], ['Densidade', 'BX ou MD, ou conte o que vai embalar.'], ['Uso', 'Corte e solda, empacotadora automática ou manual.'], ['Volume', 'Quilos por mês e cidade de entrega.']].map(([t, d], i) => `<li><b>${num(i)}</b><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
${cta('Mande largura, densidade e volume. A MB responde com peso, preço e prazo.')}`;
  },

  segmentos: () => `${cabeca('Segmentos', 'Quem embala com a MB', 'Comércio, distribuição e indústria de toda a região Sul.', 'banca-bobinas')}
<section class="secao"><div class="in lista-seg">${segmentos.map((s, i) => `<article class="seg" id="${s.id}">
  <span class="indice-num">${num(i)}</span>
  <div class="seg-img">${img(s.foto, s.nome)}</div>
  <div><h2>${s.nome}</h2><p>${s.texto}</p></div>
  <ul>${s.itens.map(x => `<li>${x}</li>`).join('')}</ul>
</article>`).join('')}</div></section>
${cta()}`,

  empresa: () => `${cabeca('A MB', `${site.slogan}`, `Desde ${site.fundacao} em Esteio, na região metropolitana de Porto Alegre.`, 'sacolas-rua')}
<section class="secao"><div class="in duas">
  <div><span class="eyebrow">Quem somos</span><h2>Embalagens plásticas de todos os tamanhos.</h2>
  <p>A MB Embalagens produz embalagens plásticas flexíveis, também com material reciclado selecionado, com soluções para as mais diversas aplicações. Atende distribuidores e atacadistas de toda a região Sul do Brasil.</p>
  <p>A fábrica fica em uma área industrial moderna, com máquinas de transformação e beneficiamento de filmes de última geração. A MB busca a liderança no segmento e contribui para o desenvolvimento econômico e social das regiões em que atua.</p></div>
  <dl class="placar"><div><dt>${site.fundacao}</dt><dd>ano de fundação</dd></div><div><dt>${anos}</dt><dd>anos de fábrica</dd></div><div><dt>${totalProdutos}</dt><dd>produtos no catálogo</dd></div><div><dt>Sul</dt><dd>área de atendimento</dd></div></dl>
</div></section>
<section class="secao secao-marinho"><div class="in">
  <div class="secao-topo"><span class="eyebrow">Fabricação</span><h2>Do polietileno ao fardo fechado.</h2></div>
  <ol class="regua regua-larga">${etapas.map(([t, d], i) => `<li><b>${num(i)}</b><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
<section class="secao"><div class="in duas">
  <div class="duas-img duas-img-1">${img('hortifruti', 'Verduras embaladas')}</div>
  <div><span class="eyebrow">Matéria-prima</span><h2>Linha virgem e linha com reciclado selecionado.</h2>
  <p>Todo o catálogo é fabricado na linha virgem. Para as aplicações em que o reciclado é indicado, a MB fabrica também com material reciclado selecionado, nas mesmas medidas.</p>
  <a class="btn btn-linha" href="${L('produtos')}">Ver o catálogo ${seta}</a></div>
</div></section>
${cta()}`,

  contato: () => `<section class="contato"><div class="contato-dados"><div>
  <span class="eyebrow">Contato</span><h1>Peça seu orçamento.</h1>
  <p class="lead">Produto, medida e quantidade. Respondemos com preço e prazo.</p>
  <dl>
    <div><dt>WhatsApp</dt><dd><a href="${zap()}">${site.zapTel}</a></dd></div>
    <div><dt>Telefone</dt><dd><a href="tel:${site.telHref}">${site.tel}</a></dd></div>
    <div><dt>E-mail</dt><dd><a href="mailto:${site.email}">${site.email}</a></dd></div>
    <div><dt>Fábrica</dt><dd>${site.endereco.join('<br>')}<br><a class="sub" href="${site.mapaLink}">Abrir no mapa ${seta}</a></dd></div>
    <div><dt>Horário</dt><dd>${site.horario}</dd></div>
  </dl>
</div></div>
<div class="contato-form"><div><h2>Formulário de orçamento</h2><p>Monta a mensagem e abre o seu WhatsApp ou e-mail.</p>${formOrcamento()}</div></div></section>
<section class="mapa"><iframe title="Mapa da fábrica da MB Embalagens em Esteio" src="${site.mapa}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`,
};

export function versaoB() {
  const out = {};
  for (const [slug, corpo] of Object.entries(pag)) {
    out[slug] = documento({ versao: V, slug, tema: '#10143d', corpo: `${header(slug, slug === 'index')}\n<main>${corpo()}</main>\n${footer()}` });
  }
  return out;
}
