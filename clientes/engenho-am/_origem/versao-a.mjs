// Versão A, "Tradição": clara, papel creme, verde do cedro nos títulos e as faixas vermelhas do logo como marca gráfica.
// Abertura dividida com foto, produtos em cartões, beneficiamento em linha numerada.
import { site, anos, nav, produtos, produto, etapas, fatos, historia, clientes } from './conteudo.mjs';
import { documento, logo, img, seta, iconeTel, iconeMapa } from './comum.mjs';

const V = 'a';
const L = s => `/${V}/${s === 'index' ? '' : s + '/'}`;

const header = slug => `<div class="util"><div class="in util-in">
  <span>${site.assinatura} · Eldorado do Sul/RS · desde ${site.fundacao}</span>
  <a href="tel:${site.telHref}">${site.tel}</a>
</div></div>
<header class="topo"><div class="in topo-in">
  <a class="topo-marca" href="${L('index')}" aria-label="${site.razao}, início">${logo()}</a>
  <nav class="topo-nav" id="menu" aria-label="Principal">
    ${nav.map(([s, n]) => `<a href="${L(s)}"${slug.split('/')[0] === s ? ' aria-current="page"' : ''}>${n}</a>`).join('\n    ')}
  </nav>
  <a class="btn btn-prim topo-cta" href="tel:${site.telHref}">${iconeTel} Ligar</a>
  <button class="topo-menu" type="button" aria-expanded="false" aria-controls="menu" data-menu><span></span>Menu</button>
</div></header>`;

const footer = () => `<footer class="rodape"><div class="faixas" aria-hidden="true"></div><div class="in rodape-in">
  <div class="rodape-marca"><div class="placa">${logo()}</div><p>Beneficiamento e empacotamento de arroz em Eldorado do Sul/RS desde ${site.fundacao}.</p></div>
  <div class="rodape-col"><h2>Produtos</h2>${produtos.map(p => `<a href="${L('produtos/' + p.id)}">${p.nome}</a>`).join('')}</div>
  <div class="rodape-col"><h2>Engenho</h2><a href="${L('empresa')}">A empresa</a><a href="${L('beneficiamento')}">Beneficiamento</a><a href="${L('atacado')}">Para revenda</a></div>
  <div class="rodape-col"><h2>Contato</h2><a href="tel:${site.telHref}">${site.tel}</a><p>${site.endereco.join('<br>')}</p></div>
</div>
<div class="in rodape-base"><span>© 2026 ${site.razao} · CNPJ ${site.cnpj}</span><a href="/">Ver as duas versões</a></div></footer>`;

const trilha = itens => `<nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${itens.map(([h, n]) => h ? `<a href="${L(h)}">${n}</a>` : `<span>${n}</span>`).join('')}</nav>`;
const cabeca = (titulo, lead, itens, foto) => `<section class="cabeca${foto ? ' cabeca-foto' : ''}"><div class="in cabeca-in">
  <div>${trilha(itens)}<h1>${titulo}</h1><p class="lead">${lead}</p></div>
  ${foto ? `<div class="cabeca-img">${img(foto, '')}</div>` : ''}
</div></section>`;

const cta = (titulo = 'Quer o arroz do Engenho A. M. na sua prateleira ou na sua cozinha?') => `<section class="cta"><div class="in cta-in">
  <div><span class="eyebrow">Cotação</span><h2>${titulo}</h2><p>Diga o produto, a embalagem, o volume e a cidade de entrega.</p></div>
  <div class="cta-acoes"><a class="btn btn-prim" href="tel:${site.telHref}">${iconeTel} ${site.tel}</a><a class="btn btn-contorno" href="${L('contato')}">Ver contato e mapa</a></div>
</div></section>`;

const cartao = p => `<a class="prod-card" href="${L('produtos/' + p.id)}">
  <div class="prod-img">${img(p.foto, p.nome)}</div>
  <div class="prod-txt"><span class="tag">${p.sub}</span><h3>${p.nome}</h3><p>${p.resumo}</p><span class="link">Conhecer ${seta}</span></div>
</a>`;

const paginaProduto = id => {
  const p = produto(id);
  return `${cabeca(p.nome, p.texto, [['produtos', 'Produtos'], [null, p.nome]], p.foto)}
<section class="secao"><div class="in ficha">
  <div><span class="eyebrow">Ficha</span><h2>${p.sub}</h2>
  <dl class="ficha-dl">${p.itens.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl></div>
  <div><span class="eyebrow">Por que escolher</span><ul class="lista-check">${p.pontos.map(x => `<li>${x}</li>`).join('')}</ul>
  <a class="link" href="${L('beneficiamento')}">Como o arroz é beneficiado ${seta}</a></div>
</div></section>
<section class="secao secao-creme"><div class="in"><div class="secao-topo"><div><span class="eyebrow">Outros produtos</span><h2>Complete o pedido</h2></div></div>
<div class="prods prods-2">${produtos.filter(o => o.id !== id).map(cartao).join('')}</div></div></section>
${cta()}`;
};

const pag = {
  index: () => `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <span class="eyebrow">Engenho de arroz · Eldorado do Sul/RS</span>
    <h1>Arroz gaúcho beneficiado com o mesmo cuidado desde ${site.fundacao}.</h1>
    <p class="lead">Há ${anos} anos o Engenho A. M. recebe o arroz das lavouras do Sul, beneficia, seleciona e empacota em Eldorado do Sul, ao lado de Porto Alegre.</p>
    <div class="hero-acoes"><a class="btn btn-prim" href="${L('produtos')}">Ver os produtos ${seta}</a><a class="btn btn-sec" href="tel:${site.telHref}">${iconeTel} ${site.tel}</a></div>
    <dl class="hero-num">${fatos.map(([v, r]) => `<div><dt>${v}</dt><dd>${r}</dd></div>`).join('')}</dl>
  </div>
  <figure class="hero-foto">${img('arroz-branco', 'Arroz branco beneficiado', 'fetchpriority="high" loading="eager"')}<span class="faixas" aria-hidden="true"></span></figure>
</div></section>

<section class="secao"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Produtos</span><h2>Do arroz do dia a dia aos subprodutos do engenho.</h2></div><a class="link" href="${L('produtos')}">Todos os produtos ${seta}</a></div>
  <div class="prods">${produtos.map(cartao).join('')}</div>
</div></section>

<section class="secao secao-creme"><div class="in faixa-dupla">
  <div class="faixa-foto">${img('lavoura', 'Lavoura de arroz pronta para a colheita')}</div>
  <div><span class="eyebrow">Beneficiamento</span><h2>Da lavoura ao pacote, tudo na mesma unidade.</h2>
  <p>O arroz em casca chega das lavouras do Rio Grande do Sul, é seco, armazenado em silos e beneficiado em Eldorado do Sul: descasque, polimento, seleção e empacotamento.</p>
  <ol class="mini-etapas">${etapas.map(([t]) => `<li>${t}</li>`).join('')}</ol>
  <a class="link" href="${L('beneficiamento')}">Ver cada etapa ${seta}</a></div>
</div></section>

<section class="secao"><div class="in faixa-dupla faixa-inv">
  <div><span class="eyebrow">Para revenda</span><h2>Arroz para atacadistas, mercados e cozinhas industriais.</h2>
  <p>Pacotes de 1 e 5 kg em fardos para a revenda, volumes maiores para quem cozinha em escala e subprodutos a granel para a indústria.</p>
  <ul class="chips">${clientes.map(([n]) => `<li>${n}</li>`).join('')}</ul>
  <a class="btn btn-sec" href="${L('atacado')}">Condições para revenda ${seta}</a></div>
  <div class="faixa-foto">${img('silos', 'Silos de armazenagem de grãos')}</div>
</div></section>

<section class="secao secao-verde"><div class="in empresa-faixa">
  <div><span class="eyebrow">Desde ${site.fundacao}</span><h2>Uma empresa familiar que vive do arroz há mais de cinco décadas.</h2>
  <p>O Engenho A. M. nasceu em Eldorado do Sul, no coração da região arrozeira da Grande Porto Alegre, e segue no mesmo endereço.</p>
  <a class="link link-claro" href="${L('empresa')}">Conheça a empresa ${seta}</a></div>
  <ol class="tempo">${historia.map(([a, t]) => `<li><b>${a}</b><p>${t}</p></li>`).join('')}</ol>
</div></section>
${cta()}`,

  empresa: () => `${cabeca('Engenho A. M.', `Comércio e beneficiamento de arroz em Eldorado do Sul/RS desde ${site.fundacao}.`, [[null, 'A empresa']], 'grao-mao')}
<section class="secao"><div class="in empresa-txt">
  <div><span class="eyebrow">Quem somos</span><h2>${anos} anos beneficiando arroz ao lado de Porto Alegre.</h2></div>
  <div class="prosa">
    <p>O Engenho A. M. foi fundado em março de ${site.fundacao} em Eldorado do Sul, município da região metropolitana de Porto Alegre cercado pelas várzeas do Delta do Jacuí, uma das áreas tradicionais de arroz irrigado do Rio Grande do Sul.</p>
    <p>Desde então a empresa recebe o arroz em casca, beneficia, empacota e vende para o comércio. Ao longo das décadas teve unidades em Porto Alegre, Guaíba, São Paulo e Maringá, e hoje concentra a operação na unidade de Eldorado do Sul. É uma empresa familiar, com a mesma direção há quase trinta anos.</p>
  </div>
</div></section>
<section class="secao secao-creme"><div class="in">
  <dl class="numeros">${fatos.map(([v, r]) => `<div><dt>${v}</dt><dd>${r}</dd></div>`).join('')}<div><dt>3</dt><dd>linhas de produto: branco, parboilizado e subprodutos</dd></div></dl>
</div></section>
<section class="secao"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Linha do tempo</span><h2>Cinco décadas no mesmo endereço.</h2></div></div>
  <ol class="tempo tempo-claro">${historia.map(([a, t]) => `<li><b>${a}</b><p>${t}</p></li>`).join('')}</ol>
</div></section>
<section class="secao secao-creme"><div class="in faixa-dupla">
  <div class="faixa-foto">${img('casca', 'Arroz em casca recebido das lavouras')}</div>
  <div><span class="eyebrow">Onde estamos</span><h2>No meio da região arrozeira, a 15 minutos de Porto Alegre.</h2>
  <p>Eldorado do Sul fica entre as lavouras de arroz irrigado das várzeas do Jacuí e a capital. O arroz chega das lavouras por perto e sai empacotado direto para os mercados da Grande Porto Alegre.</p></div>
</div></section>
${cta()}`,

  produtos: () => `${cabeca('Produtos', 'Arroz branco e parboilizado tipo 1, e os subprodutos do beneficiamento.', [[null, 'Produtos']])}
<section class="secao"><div class="in"><div class="prods">${produtos.map(cartao).join('')}</div></div></section>
<section class="secao secao-creme"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Resumo</span><h2>Tudo o que sai do engenho, numa tabela.</h2></div></div>
  <div class="tabela-rolo"><table class="tabela"><thead><tr><th scope="col">Produto</th><th scope="col">Tipo</th><th scope="col">Venda</th><th scope="col"></th></tr></thead><tbody>
  ${produtos.map(p => `<tr><th scope="row">${p.nome}</th><td>${p.sub}</td><td>${p.itens[2][1]}</td><td><a class="link" href="${L('produtos/' + p.id)}">Ver ${seta}</a></td></tr>`).join('')}
  </tbody></table></div>
</div></section>
${cta()}`,

  'produtos/arroz-branco': () => paginaProduto('arroz-branco'),
  'produtos/arroz-parboilizado': () => paginaProduto('arroz-parboilizado'),
  'produtos/subprodutos': () => paginaProduto('subprodutos'),

  beneficiamento: () => `${cabeca('Beneficiamento', 'Do arroz em casca ao pacote fechado, em seis etapas na unidade de Eldorado do Sul.', [[null, 'Beneficiamento']], 'casca')}
<section class="secao"><div class="in">
  <ol class="passos">${etapas.map(([t, d], i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
<section class="secao secao-creme"><div class="in faixa-dupla">
  <div class="faixa-foto">${img('silos', 'Silos de armazenagem')}</div>
  <div><span class="eyebrow">Padrão o ano todo</span><h2>Arroz armazenado em silos, beneficiado conforme a demanda.</h2>
  <p>Secar e guardar o arroz em casca permite beneficiar ao longo do ano inteiro, sem depender da safra, e entregar o mesmo grão lote após lote.</p></div>
</div></section>
<section class="secao"><div class="in faixa-dupla faixa-inv">
  <div><span class="eyebrow">Nada se perde</span><h2>Farelo, quirera e casca também viram produto.</h2>
  <p>O polimento gera o farelo, a classificação separa a quirera e o descasque gera a casca. Os três são vendidos para ração, indústria e energia.</p>
  <a class="link" href="${L('produtos/subprodutos')}">Ver subprodutos ${seta}</a></div>
  <div class="faixa-foto">${img('arroz-parboilizado', 'Arroz parboilizado')}</div>
</div></section>
${cta()}`,

  atacado: () => `${cabeca('Para revenda', 'Arroz para quem compra em volume: atacado, distribuição, varejo, cozinhas industriais e indústria.', [[null, 'Para revenda']], 'silos-fila')}
<section class="secao"><div class="in clientes">${clientes.map(([n, d], i) => `<article><b>${String(i + 1).padStart(2, '0')}</b><h2>${n}</h2><p>${d}</p></article>`).join('')}</div></section>
<section class="secao secao-creme"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Para cotar</span><h2>O que informar no pedido</h2></div></div>
  <ol class="passos passos-4">${[['Produto', 'Branco, parboilizado ou subproduto.'], ['Embalagem', 'Pacote de 1 kg, 5 kg ou a granel.'], ['Volume', 'Fardos, paletes ou toneladas por pedido ou por mês.'], ['Entrega', 'Cidade de entrega ou retirada em Eldorado do Sul.']].map(([t, d], i) => `<li><b>${i + 1}</b><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
${cta('Ligue e peça a sua cotação.')}`,

  contato: () => `${cabeca('Contato', 'Fale com o Engenho A. M. para cotação, revenda ou retirada de subprodutos.', [[null, 'Contato']])}
<section class="secao"><div class="in contato">
  <div class="contato-dados">
    <a class="contato-bloco" href="tel:${site.telHref}">${iconeTel}<div><h2>Telefone</h2><p>${site.tel}</p></div></a>
    <a class="contato-bloco" href="${site.mapaLink}">${iconeMapa}<div><h2>Unidade</h2><p>${site.endereco.join('<br>')}</p></div></a>
    <div class="contato-bloco contato-nota"><div><h2>Para cotação</h2><p>Informe o produto, a embalagem, o volume e a cidade de entrega.</p></div></div>
  </div>
  <div class="mapa"><iframe title="Mapa da unidade do Engenho A. M. em Eldorado do Sul" src="${site.mapa}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div></section>`,
};

export function versaoA() {
  const out = {};
  for (const [slug, corpo] of Object.entries(pag)) {
    out[slug] = documento({ versao: V, slug, tema: '#0f6a1a', corpo: `${header(slug)}\n<main>${corpo()}</main>\n${footer()}` });
  }
  return out;
}
