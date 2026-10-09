// Versão A, "Catálogo": branca e azul, cara de distribuidora organizada. Busca e linhas de produto logo na
// abertura, cartões de produto com "adicionar à cotação", faixas claras para fábrica e atendimento.
import { site, nav, linhas, clientes, numeros, etapasFab, passosCompra, qualidade } from './conteudo.mjs';
import { ilustra } from './ilustra.mjs';
import { documento, marca, selo, cartao, todos, formCotacao, zap, num } from './comum.mjs';

const V = 'a';
const L = s => `/${V}/${s === 'index' ? '' : s + '/'}`;

const header = slug => `<div class="util"><div class="util-in">
  <span><a href="tel:+55${site.telefone.replace(/\D/g, '')}">${site.telefone}</a></span><span class="util-sep"><a href="mailto:${site.email}">${site.email}</a></span><span class="util-sep util-hora">${site.horario}</span>
  <a class="util-cot" href="${L('contato')}">Lista de cotação <b data-contador>0</b></a>
</div></div>
<header class="topo">
  <a class="topo-marca" href="${L('index')}" aria-label="DHT Indústria Médica, início">${marca()}</a>
  <nav class="topo-nav" id="menu" aria-label="Principal">
    ${nav.map(([s, n]) => `<a href="${L(s)}"${slug.split('/')[0] === s ? ' aria-current="page"' : ''}>${n}</a>`).join('\n    ')}
  </nav>
  <a class="btn btn-prim topo-cta" href="${L('contato')}">Solicitar cotação</a>
  <button class="topo-menu" type="button" aria-expanded="false" aria-controls="menu" data-menu><span></span>Menu</button>
</header>`;

const footer = () => `<footer class="rodape"><div class="rodape-in">
  <div class="rodape-marca">${marca('marca-clara')}<p>${site.tagline}. Fábrica e atendimento em Porto Alegre, entrega em todo o Brasil.</p></div>
  <div class="rodape-col"><h2>Produtos</h2>${linhas.map(l => `<a href="${L('produtos/' + l.id)}">${l.nome}</a>`).join('')}</div>
  <div class="rodape-col"><h2>Empresa</h2><a href="${L('fabricacao')}">Fabricação</a><a href="${L('distribuicao')}">Distribuição</a><a href="${L('qualidade')}">Qualidade</a><a href="${L('empresa')}">Sobre a DHT</a></div>
  <div class="rodape-col"><h2>Atendimento</h2><a href="${zap()}">WhatsApp ${site.telefone}</a><a href="mailto:${site.email}">${site.email}</a><p>${site.endereco}<br>${site.cidade}</p></div>
</div>
<div class="rodape-base"><span>${site.razao} · CNPJ ${site.cnpj}</span><a href="/">Ver as duas versões</a></div></footer>`;

const trilha = (...itens) => `<nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${itens.map(([h, n]) => h ? `<a href="${L(h)}">${n}</a>` : `<span>${n}</span>`).join('')}</nav>`;
const cabeca = (titulo, lead, trilhaItens, extra = '') => `<section class="cabeca"><div class="in">${trilha(...trilhaItens)}<h1>${titulo}</h1><p class="lead">${lead}</p>${extra}</div></section>`;

const cta = () => `<section class="cta"><div class="in">
  <div><h2>Mande sua lista. A gente devolve o orçamento em até 24 horas úteis.</h2><p>Pode ser uma planilha, uma foto do pedido ou só o nome dos produtos.</p></div>
  <div class="cta-acoes"><a class="btn btn-claro" href="${zap()}">Falar no WhatsApp</a><a class="btn btn-contorno-claro" href="${L('contato')}">Montar cotação</a></div>
</div></section>`;

const cartaoLinha = l => `<a class="linha-card" href="${L('produtos/' + l.id)}">
  <div class="linha-img">${ilustra(l.ico, l.nome)}</div>
  <div class="linha-txt">${selo(l)}<h3>${l.nome}</h3><p>${l.resumo}</p><span class="mais">Ver ${l.itens.length} produtos →</span></div>
</a>`;

const busca = (valor = '') => `<form class="busca" action="${L('produtos')}" role="search"><label class="sr" for="q">Buscar produto</label><input id="q" name="q" type="search" placeholder="Buscar por nome ou código, ex.: pinça Kelly" value="${valor}"><button class="btn btn-prim" type="submit">Buscar</button></form>`;

const pag = {
  index: () => `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <span class="eyebrow">Indústria e distribuição · Porto Alegre, RS</span>
    <h1>Instrumentais e insumos hospitalares, direto da fábrica para o seu estoque.</h1>
    <p class="lead">A DHT fabrica instrumentais cirúrgicos e utensílios em aço inox e distribui os descartáveis do dia a dia. Uma cotação só para hospitais, clínicas, laboratórios e revendas.</p>
    ${busca()}
    <div class="hero-atalhos">${linhas.map(l => `<a href="${L('produtos/' + l.id)}">${l.nome}</a>`).join('')}</div>
  </div>
  <div class="hero-mosaico" aria-hidden="true">
    ${['tesoura', 'cuba', 'pinca', 'caixa', 'seringa', 'portaagulha'].map((i, k) => `<div class="mos mos-${k}">${ilustra(i)}</div>`).join('')}
  </div>
</div></section>
<section class="numeros"><div class="in">${numeros.map(([v, r]) => `<div><b>${v}</b><span>${r}</span></div>`).join('')}</div></section>
<section class="secao"><div class="in">
  <div class="secao-cab"><span class="eyebrow">Linhas de produto</span><h2>Do centro cirúrgico ao almoxarifado</h2><a class="link" href="${L('produtos')}">Ver catálogo completo →</a></div>
  <div class="linhas-grade">${linhas.map(cartaoLinha).join('')}</div>
</div></section>
<section class="secao secao-tinta"><div class="in">
  <div class="secao-cab"><span class="eyebrow">Mais pedidos</span><h2>Produtos para começar sua cotação</h2></div>
  <div class="produtos-grade">${todos().filter((_, i) => [1, 2, 4, 6, 9, 14, 19, 20].includes(i)).map(cartao).join('')}</div>
</div></section>
<section class="secao"><div class="in dupla">
  <div><span class="eyebrow">Fabricação própria</span><h2>Instrumental feito aqui, com lote gravado em cada peça.</h2><p class="lead">Do corte da barra de aço à inspeção final, os instrumentais e o inox hospitalar da DHT são produzidos em Porto Alegre. Isso quer dizer prazo curto, reposição rápida e a possibilidade de fabricar sob medida.</p><a class="btn btn-sec" href="${L('fabricacao')}">Como fabricamos</a></div>
  <ol class="etapas">${etapasFab.map(([t, d], i) => `<li><span>${num(i)}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
</div></section>
<section class="secao secao-tinta"><div class="in">
  <div class="secao-cab"><span class="eyebrow">Quem atendemos</span><h2>Compras de quem cuida de gente</h2></div>
  <div class="clientes-grade">${clientes.map(([t, d]) => `<div class="cliente"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>
<section class="secao"><div class="in">
  <div class="secao-cab"><span class="eyebrow">Como comprar</span><h2>Três passos, sem cadastro</h2></div>
  <ol class="passos">${passosCompra.map(([t, d], i) => `<li><span class="passo-n">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
${cta()}`,

  produtos: () => `
${cabeca('Catálogo de produtos', 'Escolha os itens, adicione à cotação e envie a lista pelo WhatsApp ou por e-mail. Preço e prazo em até 24 horas úteis.', [[null, 'Produtos']], busca())}
<section class="secao"><div class="in catalogo">
  <aside class="filtros" aria-label="Filtrar por linha"><h2>Linhas</h2>
    <button type="button" class="filtro ativo" data-filtro="">Todas <span>${todos().length}</span></button>
    ${linhas.map(l => `<button type="button" class="filtro" data-filtro="${l.id}">${l.nome} <span>${l.itens.length}</span></button>`).join('')}
    <a class="link" href="${L('contato')}">Não achou? Peça sob encomenda →</a>
  </aside>
  <div><p class="resultado" data-resultado></p><div class="produtos-grade produtos-grade-3" data-catalogo>${todos().map(cartao).join('')}</div></div>
</div></section>
${cta()}`,

  fabricacao: () => `
${cabeca('Fabricação própria', 'Instrumentais cirúrgicos, inox hospitalar e utensílios odontológicos e de laboratório feitos em Porto Alegre, com inspeção peça por peça.', [[null, 'Fabricação']])}
<section class="secao"><div class="in">
  <div class="secao-cab"><span class="eyebrow">Processo</span><h2>Seis etapas até a embalagem</h2></div>
  <ol class="etapas etapas-grade">${etapasFab.map(([t, d], i) => `<li><span>${num(i)}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
</div></section>
<section class="secao secao-tinta"><div class="in dupla">
  <div><span class="eyebrow">Matéria-prima</span><h2>O aço certo para cada função</h2><p class="lead">Peças de corte e apreensão pedem dureza; utensílios pedem resistência à corrosão. Por isso usamos dois aços diferentes.</p></div>
  <table class="tabela"><thead><tr><th>Aço</th><th>Onde usamos</th><th>Por quê</th></tr></thead><tbody>
    <tr><td>AISI 420</td><td>Pinças, tesouras, porta-agulhas</td><td>Aceita têmpera: pontas e lâminas mais duras e duráveis</td></tr>
    <tr><td>AISI 304</td><td>Cubas, bandejas, caixas, utensílios</td><td>Maior resistência à corrosão em lavagem e autoclave</td></tr>
  </tbody></table>
</div></section>
<section class="secao"><div class="in">
  <div class="secao-cab"><span class="eyebrow">Sob encomenda</span><h2>Também fabricamos para a sua marca</h2></div>
  <div class="clientes-grade">${[['Medidas especiais', 'Instrumentais e caixas em tamanhos fora do padrão de catálogo.'], ['Marca própria', 'Gravação da marca do distribuidor ou do hospital nas peças.'], ['Kits montados', 'Caixas cirúrgicas montadas conforme a lista do seu centro cirúrgico.']].map(([t, d]) => `<div class="cliente"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>
<section class="secao secao-tinta"><div class="in"><div class="secao-cab"><span class="eyebrow">Linhas fabricadas</span><h2>O que sai da nossa fábrica</h2></div><div class="linhas-grade">${linhas.filter(l => l.origem === 'fab').map(cartaoLinha).join('')}</div></div></section>
${cta()}`,

  distribuicao: () => `
${cabeca('Distribuição', 'Além do que fabricamos, distribuímos os descartáveis de maior giro. Assim seu pedido sai inteiro de um fornecedor só.', [[null, 'Distribuição']])}
<section class="secao"><div class="in">
  <div class="secao-cab"><span class="eyebrow">Para quem</span><h2>Segmentos atendidos</h2></div>
  <div class="clientes-grade">${clientes.map(([t, d]) => `<div class="cliente"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>
<section class="secao secao-tinta"><div class="in dupla">
  <div><span class="eyebrow">Logística</span><h2>Do pedido à entrega</h2><p class="lead">Retirada na fábrica em Porto Alegre ou envio por transportadora para qualquer estado.</p></div>
  <dl class="ficha">${[['Faturamento', 'Nota fiscal para CNPJ e órgãos públicos'], ['Pagamento', 'Boleto, PIX ou transferência; prazo para clientes recorrentes'], ['Envio', 'Transportadora parceira ou a escolhida por você'], ['Retirada', `${site.endereco}, ${site.cidade}`], ['Licitações', 'Documentação técnica e certidões sob consulta']].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
</div></section>
<section class="secao"><div class="in">
  <div class="secao-cab"><span class="eyebrow">Linha de distribuição</span><h2>Descartáveis</h2><a class="link" href="${L('produtos/descartaveis')}">Ver todos →</a></div>
  <div class="produtos-grade">${todos().filter(p => p.linha.origem === 'dist').slice(0, 4).map(cartao).join('')}</div>
</div></section>
<section class="secao secao-tinta"><div class="in">
  <div class="secao-cab"><span class="eyebrow">Como comprar</span><h2>Três passos, sem cadastro</h2></div>
  <ol class="passos">${passosCompra.map(([t, d], i) => `<li><span class="passo-n">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
${cta()}`,

  qualidade: () => `
${cabeca('Qualidade', 'O que garante que a peça que chega ao seu centro cirúrgico é igual à que saiu da nossa bancada.', [[null, 'Qualidade']])}
<section class="secao"><div class="in"><div class="qualidade-grade">${qualidade.map(([t, d], i) => `<div class="cliente"><span class="q-n">${num(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></div></section>
<section class="secao secao-tinta"><div class="in dupla">
  <div><span class="eyebrow">Cuidados</span><h2>Como conservar o instrumental</h2><p class="lead">Instrumental bem cuidado dura anos. Enviamos estas orientações junto com cada pedido.</p></div>
  <ol class="etapas">${[['Lavar logo após o uso', 'Não deixar sangue ou soro secar nas articulações.'], ['Usar detergente enzimático', 'Evitar produtos com cloro, que mancham e corroem o inox.'], ['Secar bem', 'Umidade nas articulações é a principal causa de ferrugem.'], ['Lubrificar e esterilizar', 'Lubrificante hospitalar nas articulações antes da autoclave.']].map(([t, d], i) => `<li><span>${num(i)}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
</div></section>
${cta()}`,

  empresa: () => `
${cabeca('Sobre a DHT', 'Uma indústria de Porto Alegre que fabrica e distribui insumos médico-hospitalares desde 2021.', [[null, 'Empresa']])}
<section class="secao"><div class="in dupla">
  <div><span class="eyebrow">Quem somos</span><h2>Fábrica pequena, atendimento de perto</h2>
  <p class="lead">A DHT Indústria Médica nasceu no bairro Passo da Areia para fabricar instrumentais e utensílios em aço inox com prazo curto e qualidade conferida peça por peça. Com o tempo, passamos a distribuir também os descartáveis que nossos clientes compravam junto, para que o pedido saia completo de um lugar só.</p></div>
  <div class="numeros-col">${numeros.map(([v, r]) => `<div><b>${v}</b><span>${r}</span></div>`).join('')}</div>
</div></section>
<section class="secao secao-tinta"><div class="in">
  <div class="secao-cab"><span class="eyebrow">Como trabalhamos</span><h2>O que você pode esperar</h2></div>
  <div class="clientes-grade">${[['Resposta rápida', 'Cotação em até 24 horas úteis, com preço, prazo e frete.'], ['Gente que entende', 'Quem atende conhece o produto e o uso no hospital.'], ['Pós-venda', 'Troca de peça com defeito de fabricação sem burocracia.']].map(([t, d]) => `<div class="cliente"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>
<section class="secao"><div class="in dupla">
  <div><span class="eyebrow">Onde estamos</span><h2>Fábrica e atendimento</h2><p class="lead">${site.endereco}<br>${site.cidade}<br>${site.horario}</p><dl class="ficha ficha-curta"><div><dt>Razão social</dt><dd>${site.razao}</dd></div><div><dt>CNPJ</dt><dd>${site.cnpj}</dd></div></dl></div>
  <iframe class="mapa" title="Mapa da DHT Indústria Médica" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent('Rua Barão de Tramandaí, 196, Porto Alegre, RS')}&output=embed"></iframe>
</div></section>
${cta()}`,

  contato: () => `
${cabeca('Cotação e contato', 'Revise sua lista, preencha seus dados e envie pelo canal que preferir. Respondemos em até 24 horas úteis.', [[null, 'Contato']])}
<section class="secao"><div class="in contato">
  ${formCotacao(L('produtos'))}
  <aside class="contato-lado">
    <div class="contato-card"><h2>Atendimento direto</h2><a class="btn btn-prim" href="${zap()}">WhatsApp ${site.telefone}</a><p><a href="mailto:${site.email}">${site.email}</a></p><p>${site.horario}</p></div>
    <div class="contato-card"><h2>Fábrica</h2><p>${site.endereco}<br>${site.cidade}</p><p class="mini">${site.razao}<br>CNPJ ${site.cnpj}</p></div>
  </aside>
</div></section>`,
};

for (const l of linhas) pag[`produtos/${l.id}`] = () => `
${cabeca(l.nome, l.resumo, [['produtos', 'Produtos'], [null, l.nome]], selo(l))}
<section class="secao"><div class="in">
  <div class="produtos-grade produtos-grade-3">${todos().filter(p => p.linha === l).map(cartao).join('')}</div>
  <div class="outras"><h2>Outras linhas</h2><div class="hero-atalhos">${linhas.filter(o => o !== l).map(o => `<a href="${L('produtos/' + o.id)}">${o.nome}</a>`).join('')}</div></div>
</div></section>
${cta()}`;

export function versaoA() {
  return Object.fromEntries(Object.entries(pag).map(([slug, f]) => [slug, documento({
    versao: V, slug, css: 'a.css', tema: '#ffffff',
    corpo: `${header(slug)}\n<main id="conteudo">${f()}\n</main>\n${footer()}`,
  })]));
}
