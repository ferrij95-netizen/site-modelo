// Versão B, "Indústria": mesma marca, cores e fonte da A, com cara de fábrica. Faixas azul-marinho,
// números grandes, catálogo em tabela técnica (código, material, medidas) e o processo em linha do tempo.
import { site, nav, linhas, clientes, numeros, etapasFab, passosCompra, qualidade } from './conteudo.mjs';
import { ilustra } from './ilustra.mjs';
import { documento, marca, selo, todos, formCotacao, zap, num, botaoCotacao, esc } from './comum.mjs';

const V = 'b';
const L = s => `/${V}/${s === 'index' ? '' : s + '/'}`;

const header = slug => `<header class="barra"><div class="barra-in">
  <a class="barra-marca" href="${L('index')}" aria-label="DHT Indústria Médica, início">${marca('marca-clara')}</a>
  <nav class="barra-nav" id="menu" aria-label="Principal">
    ${nav.map(([s, n]) => `<a href="${L(s)}"${slug.split('/')[0] === s ? ' aria-current="page"' : ''}>${n}</a>`).join('\n    ')}
  </nav>
  <a class="barra-tel" href="${zap()}">${site.telefone}</a>
  <a class="barra-cot" href="${L('contato')}">Cotação <b data-contador>0</b></a>
  <button class="topo-menu" type="button" aria-expanded="false" aria-controls="menu" data-menu><span></span>Menu</button>
</div></header>`;

const footer = () => `<footer class="rodape"><div class="in rodape-in">
  <div>${marca('marca-clara')}<p class="rodape-tag">${site.tagline}.</p></div>
  <div class="rodape-col"><h2>Linhas</h2>${linhas.map(l => `<a href="${L('produtos/' + l.id)}">${l.nome}</a>`).join('')}</div>
  <div class="rodape-col"><h2>DHT</h2><a href="${L('fabricacao')}">Fabricação</a><a href="${L('distribuicao')}">Distribuição</a><a href="${L('qualidade')}">Qualidade</a><a href="${L('empresa')}">Empresa</a></div>
  <div class="rodape-col"><h2>Fábrica</h2><p>${site.endereco}<br>${site.cidade}</p><a href="${zap()}">${site.telefone}</a><a href="mailto:${site.email}">${site.email}</a></div>
</div><div class="in rodape-base"><span>${site.razao} · CNPJ ${site.cnpj}</span><a href="/">Ver as duas versões</a></div></footer>`;

const faixa = (eyebrow, titulo, lead, trilha = []) => `<section class="faixa"><div class="in">
  <nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${trilha.map(([h, n]) => h ? `<a href="${L(h)}">${n}</a>` : `<span>${n}</span>`).join('')}</nav>
  <span class="eyebrow">${eyebrow}</span><h1>${titulo}</h1><p class="lead">${lead}</p>
</div></section>`;

const tabela = itens => `<div class="tabela-rolagem"><table class="tabela-prod">
  <thead><tr><th class="col-img"><span class="sr">Imagem</span></th><th>Código</th><th>Produto</th><th>Material</th><th>Medidas / embalagem</th><th><span class="sr">Cotação</span></th></tr></thead>
  <tbody>${itens.map(p => `<tr data-busca="${esc((p.cod + ' ' + p.nome + ' ' + p.mat).toLowerCase())}"><td class="col-img">${ilustra(p.ico, p.nome)}</td><td class="cod">${p.cod}</td><td class="nome">${p.nome}</td><td>${p.mat}</td><td>${p.med}</td><td>${botaoCotacao(p)}</td></tr>`).join('')}</tbody>
</table></div>`;

const linhaDoTempo = () => `<ol class="tempo">${etapasFab.map(([t, d], i) => `<li><span class="tempo-n">${num(i)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>`;

const cta = () => `<section class="cta"><div class="in cta-in">
  <h2>Mande sua lista de compras.<br>Orçamento em até 24 horas úteis.</h2>
  <div class="cta-acoes"><a class="btn btn-prim" href="${zap()}">Falar no WhatsApp</a><a class="btn btn-contorno-claro" href="${L('contato')}">Montar cotação</a></div>
</div></section>`;

const pag = {
  index: () => `
<section class="abertura"><div class="in abertura-in">
  <div class="abertura-txt">
    <span class="eyebrow">DHT Indústria Médica · Porto Alegre</span>
    <h1>Fabricamos o instrumental. Distribuímos o resto do pedido.</h1>
    <p class="lead">Instrumentais cirúrgicos e inox hospitalar de fabricação própria, mais os descartáveis de maior giro. Um fornecedor, uma nota, uma entrega.</p>
    <div class="acoes"><a class="btn btn-prim" href="${L('produtos')}">Ver catálogo</a><a class="btn btn-contorno-claro" href="${zap()}">WhatsApp</a></div>
  </div>
  <div class="ficha-linhas" aria-label="Linhas de produto">
    <div class="ficha-topo"><span>Linhas de produto</span><span>Códigos</span></div>
    ${linhas.map((l, i) => `<a href="${L('produtos/' + l.id)}"><span class="fl-ico">${ilustra(l.ico)}</span><span class="fl-nome">${l.nome}<small>${l.origem === 'fab' ? 'Fabricação própria' : 'Distribuição'}</small></span><span class="fl-cod">DHT-${i + 1}00</span></a>`).join('')}
  </div>
</div></section>
<section class="numeros"><div class="in">${numeros.map(([v, r]) => `<div><b>${v}</b><span>${r}</span></div>`).join('')}</div></section>
<section class="bloco"><div class="in">
  <div class="bloco-cab"><span class="eyebrow">Catálogo</span><h2>Ficha rápida dos produtos</h2>
    <div class="abas" role="tablist">${linhas.map((l, i) => `<button type="button" role="tab" class="aba${i ? '' : ' ativa'}" data-aba="${l.id}" aria-selected="${!i}">${l.nome}</button>`).join('')}</div></div>
  ${linhas.map((l, i) => `<div class="aba-painel" data-painel="${l.id}"${i ? ' hidden' : ''}>${tabela(todos().filter(p => p.linha === l))}</div>`).join('')}
  <a class="link" href="${L('produtos')}">Abrir catálogo completo →</a>
</div></section>
<section class="bloco bloco-escuro"><div class="in">
  <div class="bloco-cab"><span class="eyebrow">Fabricação própria</span><h2>Da barra de aço à peça gravada com lote</h2><a class="link" href="${L('fabricacao')}">Conhecer a fábrica →</a></div>
  ${linhaDoTempo()}
</div></section>
<section class="bloco"><div class="in duas">
  <div><span class="eyebrow">Quem atendemos</span><h2>Hospitais, clínicas, laboratórios e revendas</h2><p class="lead">Atendimento direto, sem pedido mínimo para começar, e documentação pronta para compras públicas.</p></div>
  <ul class="lista">${clientes.map(([t, d]) => `<li><h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>
</div></section>
<section class="bloco bloco-tinta"><div class="in">
  <div class="bloco-cab"><span class="eyebrow">Como comprar</span><h2>Três passos</h2></div>
  <ol class="passos">${passosCompra.map(([t, d], i) => `<li><span class="passo-n">${num(i)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
${cta()}`,

  produtos: () => `
${faixa('Catálogo', 'Produtos', 'Busque pelo nome ou código, adicione à cotação e envie a lista. Preço e prazo em até 24 horas úteis.', [[null, 'Produtos']])}
<section class="bloco"><div class="in">
  <div class="filtro-barra"><label class="sr" for="q">Buscar produto</label><input id="q" type="search" placeholder="Buscar por nome, código ou material" data-busca-tabela><span class="resultado" data-resultado></span></div>
  ${linhas.map(l => `<div class="grupo" data-grupo><div class="grupo-cab"><h2><a href="${L('produtos/' + l.id)}">${l.nome}</a></h2>${selo(l)}</div>${tabela(todos().filter(p => p.linha === l))}</div>`).join('')}
</div></section>
${cta()}`,

  fabricacao: () => `
${faixa('Fabricação própria', 'Feito em Porto Alegre, conferido peça por peça', 'Instrumentais cirúrgicos, inox hospitalar e utensílios odontológicos e de laboratório.', [[null, 'Fabricação']])}
<section class="bloco"><div class="in"><div class="bloco-cab"><span class="eyebrow">Processo</span><h2>Seis etapas</h2></div>${linhaDoTempo()}</div></section>
<section class="bloco bloco-tinta"><div class="in duas">
  <div><span class="eyebrow">Matéria-prima</span><h2>Dois aços, duas funções</h2><p class="lead">Dureza para cortar e prender; resistência à corrosão para lavar e autoclavar.</p></div>
  <table class="tabela-spec"><tbody>
    <tr><th>AISI 420</th><td>Pinças, tesouras, porta-agulhas. Aceita têmpera: pontas e lâminas mais duras.</td></tr>
    <tr><th>AISI 304</th><td>Cubas, bandejas, caixas e utensílios. Maior resistência à corrosão.</td></tr>
  </tbody></table>
</div></section>
<section class="bloco"><div class="in duas">
  <div><span class="eyebrow">Sob encomenda</span><h2>Para a sua marca ou o seu centro cirúrgico</h2></div>
  <ul class="lista">${[['Medidas especiais', 'Instrumentais e caixas fora do padrão de catálogo.'], ['Marca própria', 'Gravação da marca do distribuidor ou do hospital.'], ['Kits montados', 'Caixas cirúrgicas montadas conforme a sua lista.']].map(([t, d]) => `<li><h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>
</div></section>
${cta()}`,

  distribuicao: () => `
${faixa('Distribuição', 'O pedido inteiro de um fornecedor só', 'Além do que fabricamos, distribuímos os descartáveis de maior giro, de fabricantes com registro na ANVISA.', [[null, 'Distribuição']])}
<section class="bloco"><div class="in duas">
  <div><span class="eyebrow">Segmentos</span><h2>Quem compra da DHT</h2></div>
  <ul class="lista">${clientes.map(([t, d]) => `<li><h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>
</div></section>
<section class="bloco bloco-tinta"><div class="in duas">
  <div><span class="eyebrow">Logística</span><h2>Condições comerciais</h2></div>
  <table class="tabela-spec"><tbody>${[['Faturamento', 'Nota fiscal para CNPJ e órgãos públicos'], ['Pagamento', 'Boleto, PIX ou transferência; prazo para clientes recorrentes'], ['Envio', 'Transportadora parceira ou a escolhida por você, para todo o Brasil'], ['Retirada', `${site.endereco}, Porto Alegre`], ['Licitações', 'Documentação técnica e certidões sob consulta']].map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}</tbody></table>
</div></section>
<section class="bloco"><div class="in"><div class="bloco-cab"><span class="eyebrow">Linha de distribuição</span><h2>Descartáveis</h2></div>${tabela(todos().filter(p => p.linha.origem === 'dist'))}</div></section>
${cta()}`,

  qualidade: () => `
${faixa('Qualidade', 'Rastreável do aço à embalagem', 'Cada instrumental sai gravado com lote. Cada lote tem ficha.', [[null, 'Qualidade']])}
<section class="bloco"><div class="in"><ol class="passos passos-3">${qualidade.map(([t, d], i) => `<li><span class="passo-n">${num(i)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol></div></section>
<section class="bloco bloco-tinta"><div class="in duas">
  <div><span class="eyebrow">Conservação</span><h2>Como fazer o instrumental durar</h2></div>
  <table class="tabela-spec"><tbody>${[['1. Lavar', 'Logo após o uso, sem deixar sangue ou soro secar.'], ['2. Detergente', 'Enzimático; nunca produtos com cloro.'], ['3. Secar', 'Umidade nas articulações causa ferrugem.'], ['4. Lubrificar', 'Lubrificante hospitalar antes da autoclave.']].map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}</tbody></table>
</div></section>
${cta()}`,

  empresa: () => `
${faixa('Empresa', 'Indústria de Porto Alegre desde 2021', 'Fabricamos instrumentais e utensílios em aço inox e distribuímos os descartáveis que nossos clientes compram junto.', [[null, 'Empresa']])}
<section class="numeros numeros-claro"><div class="in">${numeros.map(([v, r]) => `<div><b>${v}</b><span>${r}</span></div>`).join('')}</div></section>
<section class="bloco"><div class="in duas">
  <div><span class="eyebrow">Quem somos</span><h2>Fábrica pequena, atendimento de perto</h2></div>
  <div class="texto"><p class="lead">A DHT Indústria Médica nasceu no bairro Passo da Areia para fabricar instrumentais e utensílios em aço inox com prazo curto e qualidade conferida peça por peça.</p><p>Com o tempo, passamos a distribuir também os descartáveis que nossos clientes compravam junto, para que o pedido saia completo de um lugar só. Quem atende conhece o produto e o uso dele no hospital.</p></div>
</div></section>
<section class="bloco bloco-tinta"><div class="in duas">
  <div><span class="eyebrow">Dados</span><h2>Onde estamos</h2><table class="tabela-spec"><tbody><tr><th>Razão social</th><td>${site.razao}</td></tr><tr><th>CNPJ</th><td>${site.cnpj}</td></tr><tr><th>Endereço</th><td>${site.endereco}<br>${site.cidade}</td></tr><tr><th>Horário</th><td>${site.horario}</td></tr></tbody></table></div>
  <iframe class="mapa" title="Mapa da DHT Indústria Médica" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent('Rua Barão de Tramandaí, 196, Porto Alegre, RS')}&output=embed"></iframe>
</div></section>
${cta()}`,

  contato: () => `
${faixa('Contato', 'Cotação', 'Revise a lista, preencha seus dados e envie. Resposta em até 24 horas úteis.', [[null, 'Contato']])}
<section class="bloco"><div class="in contato">
  ${formCotacao(L('produtos'))}
  <aside class="contato-lado"><table class="tabela-spec"><tbody>
    <tr><th>WhatsApp</th><td><a href="${zap()}">${site.telefone}</a></td></tr>
    <tr><th>E-mail</th><td><a href="mailto:${site.email}">${site.email}</a></td></tr>
    <tr><th>Horário</th><td>${site.horario}</td></tr>
    <tr><th>Fábrica</th><td>${site.endereco}<br>${site.cidade}</td></tr>
  </tbody></table></aside>
</div></section>`,
};

for (const l of linhas) pag[`produtos/${l.id}`] = () => `
${faixa(l.origem === 'fab' ? 'Fabricação própria' : 'Distribuição', l.nome, l.resumo, [['produtos', 'Produtos'], [null, l.nome]])}
<section class="bloco"><div class="in">${tabela(todos().filter(p => p.linha === l))}
  <div class="outras"><span class="eyebrow">Outras linhas</span>${linhas.filter(o => o !== l).map(o => `<a class="link" href="${L('produtos/' + o.id)}">${o.nome} →</a>`).join('')}</div>
</div></section>
${cta()}`;

export function versaoB() {
  return Object.fromEntries(Object.entries(pag).map(([slug, f]) => [slug, documento({
    versao: V, slug, css: 'b.css', tema: '#0e2a47',
    corpo: `${header(slug)}\n<main id="conteudo">${f()}\n</main>\n${footer()}`,
  })]));
}
