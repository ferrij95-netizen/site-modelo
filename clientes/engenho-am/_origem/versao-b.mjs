// Versão B, "Indústria": verde-escuro do cedro com a faixa vermelha do logo. Foto em tela cheia na abertura,
// produtos em lista numerada, beneficiamento como linha de produção e páginas de produto com menu lateral.
import { site, anos, nav, produtos, produto, etapas, fatos, historia, clientes } from './conteudo.mjs';
import { documento, logo, img, seta, iconeTel, iconeMapa } from './comum.mjs';

const V = 'b';
const L = s => `/${V}/${s === 'index' ? '' : s + '/'}`;
const n2 = i => String(i + 1).padStart(2, '0');

const header = slug => `<header class="topo"><div class="in topo-in">
  <a class="topo-marca" href="${L('index')}" aria-label="${site.razao}, início">${logo()}</a>
  <nav class="topo-nav" id="menu" aria-label="Principal">
    ${nav.map(([s, n]) => `<a href="${L(s)}"${slug.split('/')[0] === s ? ' aria-current="page"' : ''}>${n}</a>`).join('\n    ')}
  </nav>
  <a class="topo-tel" href="tel:${site.telHref}">${iconeTel}<span>${site.tel}</span></a>
  <button class="topo-menu" type="button" aria-expanded="false" aria-controls="menu" data-menu><span></span>Menu</button>
</div><div class="faixa-vermelha" aria-hidden="true"></div></header>`;

const footer = () => `<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca"><div class="placa">${logo()}</div><p>${site.assinatura}. Eldorado do Sul/RS, desde ${site.fundacao}.</p></div>
  <nav class="rodape-nav" aria-label="Rodapé">${nav.map(([s, n]) => `<a href="${L(s)}">${n}</a>`).join('')}</nav>
  <div class="rodape-contato"><a href="tel:${site.telHref}">${site.tel}</a><p>${site.endereco.join(' · ')}</p></div>
</div>
<div class="in rodape-base"><span>© 2026 ${site.razao} · CNPJ ${site.cnpj}</span><a href="/">Ver as duas versões</a></div></footer>`;

const trilha = itens => `<nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${itens.map(([h, n]) => h ? `<a href="${L(h)}">${n}</a>` : `<span>${n}</span>`).join('')}</nav>`;
const cabeca = (titulo, lead, itens, foto) => `<section class="cabeca"${foto ? '' : ' data-sem-foto'}>${foto ? `<div class="cabeca-fundo">${img(foto, '', 'loading="eager"')}</div>` : ''}<div class="in cabeca-in">
  ${trilha(itens)}<h1>${titulo}</h1><p class="lead">${lead}</p>
</div></section>`;

const cta = (titulo = 'Cotação de arroz para revenda, cozinha ou indústria.') => `<section class="cta"><div class="in cta-in">
  <h2>${titulo}</h2>
  <div class="cta-acoes"><a class="btn btn-prim" href="tel:${site.telHref}">${iconeTel} Ligar ${site.tel}</a><a class="btn btn-claro" href="${L('contato')}">Contato e mapa ${seta}</a></div>
</div></section>`;

const listaProdutos = () => `<ol class="lista-prod">${produtos.map((p, i) => `<li><a href="${L('produtos/' + p.id)}">
  <b>${n2(i)}</b><div class="lp-img">${img(p.foto, p.nome)}</div><div class="lp-txt"><h3>${p.nome}</h3><span>${p.sub}</span></div><p>${p.resumo}</p>${seta}
</a></li>`).join('')}</ol>`;

const linhaProducao = () => `<ol class="producao">${etapas.map(([t, d], i) => `<li><b>${n2(i)}</b><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>`;

const paginaProduto = id => {
  const p = produto(id);
  return `${cabeca(p.nome, p.texto, [['produtos', 'Produtos'], [null, p.nome]], p.foto)}
<section class="secao"><div class="in com-lado">
  <aside class="lado"><span class="eyebrow">Produtos</span>${produtos.map(o => `<a href="${L('produtos/' + o.id)}"${o.id === id ? ' aria-current="page"' : ''}>${o.nome}</a>`).join('')}</aside>
  <div class="ficha">
    <div class="ficha-img">${img(p.foto, p.nome)}</div>
    <table class="tabela"><tbody>${p.itens.map(([t, d]) => `<tr><th scope="row">${t}</th><td>${d}</td></tr>`).join('')}</tbody></table>
    <ul class="lista-check">${p.pontos.map(x => `<li>${x}</li>`).join('')}</ul>
  </div>
</div></section>
${cta()}`;
};

const pag = {
  index: () => `
<section class="hero">
  <div class="hero-fundo">${img('silos-fila', 'Silos de armazenagem de arroz', 'fetchpriority="high" loading="eager"')}</div>
  <div class="in hero-in">
    <span class="eyebrow">Engenho de arroz · Eldorado do Sul/RS · desde ${site.fundacao}</span>
    <h1>${anos} anos transformando o arroz do Sul em produto de prateleira.</h1>
    <p class="lead">Recebimento, secagem, beneficiamento e empacotamento em uma só unidade, ao lado de Porto Alegre.</p>
    <div class="hero-acoes"><a class="btn btn-prim" href="${L('produtos')}">Ver os produtos ${seta}</a><a class="btn btn-claro" href="tel:${site.telHref}">${iconeTel} ${site.tel}</a></div>
  </div>
  <dl class="in hero-num">${fatos.map(([v, r]) => `<div><dt>${v}</dt><dd>${r}</dd></div>`).join('')}</dl>
</section>

<section class="secao"><div class="in">
  <div class="secao-topo"><span class="eyebrow">Produtos</span><h2>Três linhas saindo do mesmo engenho.</h2></div>
  ${listaProdutos()}
</div></section>

<section class="secao secao-escura"><div class="in">
  <div class="secao-topo"><span class="eyebrow">Linha de beneficiamento</span><h2>Seis etapas do arroz em casca ao fardo fechado.</h2><a class="link link-claro" href="${L('beneficiamento')}">Ver o beneficiamento ${seta}</a></div>
  ${linhaProducao()}
</div></section>

<section class="secao"><div class="in duas">
  <div class="duas-img">${img('lavoura', 'Lavoura de arroz pronta para a colheita')}</div>
  <div><span class="eyebrow">Para revenda</span><h2>Quem compra do Engenho A. M.</h2>
  <ul class="clientes-lista">${clientes.map(([n, d]) => `<li><h3>${n}</h3><p>${d}</p></li>`).join('')}</ul>
  <a class="btn btn-prim" href="${L('atacado')}">Condições para revenda ${seta}</a></div>
</div></section>

<section class="secao secao-faixa"><div class="in tempo-b">
  <div><span class="eyebrow">Desde ${site.fundacao}</span><h2>Empresa familiar, mesmo endereço, cinco décadas de arroz.</h2><a class="link" href="${L('empresa')}">A empresa ${seta}</a></div>
  <ol>${historia.map(([a, t]) => `<li><b>${a}</b><p>${t}</p></li>`).join('')}</ol>
</div></section>
${cta()}`,

  empresa: () => `${cabeca('A empresa', `Comércio e beneficiamento de arroz em Eldorado do Sul/RS desde março de ${site.fundacao}.`, [[null, 'A empresa']], 'grao-mao')}
<section class="secao"><div class="in duas">
  <div><span class="eyebrow">Quem somos</span><h2>Um engenho familiar na região arrozeira da Grande Porto Alegre.</h2></div>
  <div class="prosa">
    <p>O Engenho A. M. foi fundado em ${site.fundacao} em Eldorado do Sul, entre as várzeas de arroz irrigado do Delta do Jacuí e a capital gaúcha. Desde então recebe o arroz em casca das lavouras, beneficia, empacota e vende para o comércio.</p>
    <p>Ao longo das décadas a empresa teve unidades em Porto Alegre, Guaíba, São Paulo e Maringá. Hoje concentra beneficiamento, empacotamento e venda na unidade de Eldorado do Sul, com a mesma direção familiar há quase trinta anos.</p>
  </div>
</div></section>
<section class="secao secao-escura"><div class="in"><dl class="numeros">${fatos.map(([v, r]) => `<div><dt>${v}</dt><dd>${r}</dd></div>`).join('')}<div><dt>3</dt><dd>linhas de produto</dd></div></dl></div></section>
<section class="secao"><div class="in tempo-b tempo-b-claro">
  <div><span class="eyebrow">Linha do tempo</span><h2>Cinco décadas de arroz.</h2></div>
  <ol>${historia.map(([a, t]) => `<li><b>${a}</b><p>${t}</p></li>`).join('')}</ol>
</div></section>
${cta()}`,

  produtos: () => `${cabeca('Produtos', 'Arroz branco e parboilizado tipo 1, e os subprodutos do beneficiamento.', [[null, 'Produtos']], 'arroz-branco')}
<section class="secao"><div class="in">${listaProdutos()}</div></section>
${cta()}`,

  'produtos/arroz-branco': () => paginaProduto('arroz-branco'),
  'produtos/arroz-parboilizado': () => paginaProduto('arroz-parboilizado'),
  'produtos/subprodutos': () => paginaProduto('subprodutos'),

  beneficiamento: () => `${cabeca('Beneficiamento', 'Do arroz em casca ao pacote fechado, em seis etapas na unidade de Eldorado do Sul.', [[null, 'Beneficiamento']], 'casca')}
<section class="secao secao-escura"><div class="in">${linhaProducao()}</div></section>
<section class="secao"><div class="in duas">
  <div class="duas-img">${img('silos', 'Silos de armazenagem')}</div>
  <div><span class="eyebrow">Padrão o ano todo</span><h2>Silos para beneficiar fora da safra.</h2>
  <p>Secar e armazenar o arroz em casca permite beneficiar o ano inteiro e entregar o mesmo grão lote após lote.</p>
  <span class="eyebrow eyebrow-esp">Nada se perde</span><h2>Farelo, quirera e casca também são vendidos.</h2>
  <p>O polimento gera o farelo, a classificação separa a quirera e o descasque gera a casca, usados em ração, indústria e caldeiras.</p>
  <a class="link" href="${L('produtos/subprodutos')}">Ver subprodutos ${seta}</a></div>
</div></section>
${cta()}`,

  atacado: () => `${cabeca('Para revenda', 'Arroz para quem compra em volume: atacado, distribuição, varejo, cozinhas industriais e indústria.', [[null, 'Para revenda']], 'silos')}
<section class="secao"><div class="in"><ol class="lista-clientes">${clientes.map(([n, d], i) => `<li><b>${n2(i)}</b><h2>${n}</h2><p>${d}</p></li>`).join('')}</ol></div></section>
<section class="secao secao-escura"><div class="in">
  <div class="secao-topo"><span class="eyebrow">Para cotar</span><h2>Quatro informações e a gente monta a proposta.</h2></div>
  <ol class="producao producao-4">${[['Produto', 'Branco, parboilizado ou subproduto.'], ['Embalagem', 'Pacote de 1 kg, 5 kg ou a granel.'], ['Volume', 'Fardos, paletes ou toneladas.'], ['Entrega', 'Cidade de entrega ou retirada.']].map(([t, d], i) => `<li><b>${n2(i)}</b><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
${cta('Ligue e peça a sua cotação.')}`,

  contato: () => `${cabeca('Contato', 'Cotação, revenda e retirada de subprodutos.', [[null, 'Contato']])}
<section class="secao"><div class="in contato">
  <div class="contato-dados">
    <a class="contato-bloco" href="tel:${site.telHref}">${iconeTel}<div><h2>Telefone</h2><p>${site.tel}</p></div></a>
    <a class="contato-bloco" href="${site.mapaLink}">${iconeMapa}<div><h2>Unidade</h2><p>${site.endereco.join('<br>')}</p></div></a>
  </div>
  <div class="mapa"><iframe title="Mapa da unidade do Engenho A. M. em Eldorado do Sul" src="${site.mapa}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div></section>`,
};

export function versaoB() {
  const out = {};
  for (const [slug, corpo] of Object.entries(pag)) {
    out[slug] = documento({ versao: V, slug, tema: '#0b3d14', corpo: `${header(slug)}\n<main>${corpo()}</main>\n${footer()}` });
  }
  return out;
}
