// Páginas das duas versões. A "Clássica" segue o site atual (topo escuro, carrossel, faixa azul nos títulos);
// B "Telemetria" usa os mesmos textos com gradientes azul-marinho, fluxo de como funciona e prateleira de produtos.
import { site, empresa, slides, categorias, produtos, servicos, tecnologias, cases, clientes, destaqueClientes, igualdade } from './conteudo.mjs';
import { esc, img, ico, num, linkDe, produto, topo, rodape, formContato, documento } from './comum.mjs';

const TEMA = { a: '#121a21', b: '#01385a' };
const nomeCat = Object.fromEntries(categorias);
const icoCat = { saneamento: 'gota', 'oleo-gas': 'chama', web: 'monitor', iot: 'rede' };
const logoCliente = ([arq, nome]) => `<li>${img('clientes/' + arq, nome, 'width="100" height="100"')}</li>`;

// Cabeçalho das páginas internas, com trilha de navegação.
function cabeca(v, { titulo, sub, trilha, foto }) {
  const L = linkDe(v);
  const migalhas = `<nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Home</a>${trilha.map(([s, t]) => s ? `<span>/</span><a href="${L(s)}">${t}</a>` : `<span>/</span><b>${t}</b>`).join('')}</nav>`;
  if (v === 'a') return `<section class="cabeca"><div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section><div class="trilha-faixa"><div class="in">${migalhas}</div></div>`;
  return `<section class="cabeca">${foto ? img(foto, '', 'class="cabeca-foto" loading="eager"') : ''}<div class="in">${migalhas}<h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;
}

const cartaoProduto = (v, p) => {
  const L = linkDe(v);
  const tags = p.cats.map(c => `<span>${ico(icoCat[c])}${nomeCat[c]}</span>`).join('');
  const corpo = `<div class="pc-img">${img(p.img, `${p.cod} ${p.nome}`, 'width="500" height="332"')}</div>
    <div class="pc-txt"><b class="pc-cod">${p.cod}</b><h3>${p.nome}</h3><p>${p.resumo}</p><div class="pc-tags">${tags}</div></div>`;
  return p.slug
    ? `<a class="pc" href="${L('produtos/' + p.slug)}" data-cats="${p.cats.join(' ')}">${corpo}</a>`
    : `<a class="pc" href="${L('contato')}?produto=${encodeURIComponent(p.cod + ' ' + p.nome)}" data-cats="${p.cats.join(' ')}">${corpo}</a>`;
};

const ctaContato = (v, titulo = 'Precisa de um projeto sob medida?', texto = 'Criamos projetos customizados, transformando ideias em realidade. Fale com a equipe da Vectora.') => {
  const L = linkDe(v);
  return `<section class="cta"><div class="in">
  <div><h2>${titulo}</h2><p>${texto}</p></div>
  <div class="cta-acoes"><a class="btn btn-prim" href="${L('contato')}">Fale com a Vectora ${ico('seta')}</a><a class="btn btn-linha" href="tel:${site.foneHref}">${ico('fone')} ${site.fone}</a></div>
</div></section>`;
};

// ---------- Home A: igual ao site atual, com o acabamento refeito ----------
function homeA() {
  const L = linkDe('a');
  const carrossel = `<section class="carrossel" data-carrossel aria-label="Destaques">
  ${slides.map((s, i) => `<div class="slide${i === 0 ? ' ativo' : ''}" data-slide>
    ${img(s.foto, '', `class="slide-fundo"${i === 0 ? ' loading="eager" fetchpriority="high"' : ''}`)}
    <div class="in slide-itens n${s.itens.length}">${s.itens.map(it => `<div class="slide-item">
      <div class="slide-txt"><span class="pre">${it.pre}</span><strong>${it.titulo}</strong><span class="sub">${it.sub}</span>
      <a class="btn btn-prim" href="${L(it.link)}">Detalhes ${ico('seta')}</a></div>
      ${img(it.corte, '', i === 0 ? 'class="slide-corte" loading="eager"' : 'class="slide-corte"')}</div>`).join('')}</div>
  </div>`).join('')}
  <div class="car-ctrl"><button data-ant aria-label="Anterior">${ico('voltar')}</button>${slides.map((_, i) => `<button data-ir aria-label="Destaque ${i + 1}"${i === 0 ? ' aria-current="true"' : ''}></button>`).join('')}<button data-prox aria-label="Próximo">${ico('seta')}</button></div>
</section>`;

  const sobre = `<section class="sobre"><div class="in linha-ponto">
  <h2>Empresa <span>Vectora</span></h2>
  <p>${empresa.intro} ${empresa.intro2}</p>
  <a class="link" href="${L('empresa')}">Conheça a Vectora ${ico('seta')}</a>
</div></section>`;

  const pilares = `<section class="pilares"><div class="in">${empresa.pilares.map(([i, t, s, txt]) => `<article>
  <div class="pil-cab"><span class="quadro">${ico(i)}</span><div><h3>${t}</h3><small>${s}</small></div></div><p>${txt}</p></article>`).join('')}
</div></section>`;

  const vitrine = `<section class="vitrine"><div class="in">
  <div class="titulo-centro linha-ponto"><h2><span>P</span>rodutos</h2><p>Saneamento / Óleo e Gás</p></div>
  <div class="grade-pc">${produtos.filter(p => p.slug).slice(0, 8).map(p => cartaoProduto('a', p)).join('')}</div>
  <div class="centro"><a class="btn btn-sec" href="${L('produtos')}">Ver todos os produtos e serviços ${ico('seta')}</a></div>
</div></section>`;

  const solucoes = `<section class="sol-home"><div class="in">
  <div class="titulo-centro"><h2><span>S</span>oluções</h2><p>Cases de sucesso em saneamento e óleo e gás</p></div>
  <div class="sol-tiles">${cases.map(c => `<a class="tile" href="${L('solucoes/' + c.slug)}">${img(c.img, c.titulo, 'width="500" height="332"')}
    <div><small>${ico(c.slug === 'saneamento' ? 'gota' : 'chama')}${c.setor}</small><h3>${c.titulo}</h3><p>${c.resumo}</p><b>Ver case ${ico('seta')}</b></div></a>`).join('')}</div>
</div></section>`;

  const cli = `<section class="cli-home"><div class="in">
  <div class="titulo-centro"><h2><span>C</span>lientes</h2><p>Empresas que confiam na Vectora</p></div>
  <ul class="logos">${destaqueClientes.map(k => logoCliente(clientes.find(c => c[0] === k))).join('')}</ul>
  <div class="centro"><a class="link" href="${L('clientes')}">Ver todos os ${clientes.length} clientes ${ico('seta')}</a></div>
</div></section>`;

  return `${topo({ versao: 'a', slug: 'index', escuro: true })}
<main id="conteudo">
${carrossel}
${sobre}
${pilares}
${vitrine}
${solucoes}
${cli}
${ctaContato('a')}
</main>
${rodape({ versao: 'a' })}`;
}

// ---------- Home B: Telemetria ----------
function homeB() {
  const L = linkDe('b');
  const heroi = `<section class="heroi">
  ${img('hero-vrp', '', 'class="heroi-foto" loading="eager" fetchpriority="high"')}
  <div class="in">
    <div class="heroi-txt">
      <span class="olho">Telemetria · Saneamento · Óleo e Gás</span>
      <h1>Soluções em telemetria e gestão de perdas</h1>
      <p>${empresa.intro} Criamos projetos customizados, transformando ideias em realidade.</p>
      <div class="acoes"><a class="btn btn-prim" href="${L('produtos')}">Conheça os produtos ${ico('seta')}</a><a class="btn btn-linha" href="${L('contato')}">Fale com a Vectora</a></div>
    </div>
    <a class="heroi-prod" href="${L('produtos/vt471-autobox')}">
      ${img('corte-autobox', 'VT471 Autobox', 'loading="eager" width="310" height="318"')}
      <span><small>VT471 · Autobox</small><b>Automatização de VRP</b><em>Válvula Redutora de Pressão ${ico('seta')}</em></span>
    </a>
  </div>
  <div class="in atalhos">${categorias.map(([k, n]) => `<a href="${L('produtos')}#${k}">${ico(icoCat[k])}<span>${n}</span><b>${(n => n + (n === 1 ? ' equipamento' : ' equipamentos'))(produtos.filter(p => p.cats.includes(k)).length)}</b></a>`).join('')}</div>
</section>`;

  const etapas = [
    ['sensor', 'Medição em campo', 'Sensores de pressão, vazão e corrente, entradas 4 a 20 mA e contatos de estado, em gabinetes IP-68 para caixas subterrâneas.', ['VT471', 'VR520']],
    ['caixa', 'Registro e controle', 'Dataloggers e controladores guardam o histórico e atuam na rede: VRP, válvulas ON/OFF e bombas booster.', ['VT490', 'VT701', 'VT600']],
    ['antena', 'Comunicação', 'Os dados seguem por GPRS, 3G, 4G, IoT ou Ethernet (Modbus/TCP), em intervalos regulares, com configuração a distância.', ['VT601', 'VT490E']],
    ['grafico', 'Gestão na web', 'No VectoraSys a equipe vê gráficos, alarmes e histórico, exporta dados e atualiza os equipamentos em campo.', ['VZ670']],
  ];
  const fluxo = `<section class="fluxo"><div class="in">
  <div class="sec-cab claro"><span class="olho">Como funciona</span><h2>Do sensor em campo ao gráfico na tela</h2><p>Equipamentos e sistema web da própria Vectora, totalmente integrados.</p></div>
  <ol class="etapas">${etapas.map(([i, t, txt, cods], k) => `<li><span class="et-num">${num(k)}</span><span class="et-ico">${ico(i)}</span><h3>${t}</h3><p>${txt}</p><div class="et-cods">${cods.map(c => `<span>${c}</span>`).join('')}</div></li>`).join('')}</ol>
</div></section>`;

  const setores = `<section class="setores"><div class="in">
  <div class="sec-cab"><span class="olho">Soluções</span><h2>Dois setores, um mesmo cuidado</h2></div>
  <div class="set-grade">${cases.map(c => {
    const lista = produtos.filter(p => p.slug && p.cats.includes(c.slug === 'saneamento' ? 'saneamento' : 'oleo-gas'));
    return `<article class="setor">
    ${img(c.foto, '', 'class="set-foto"')}
    <div class="set-txt"><small>${ico(c.slug === 'saneamento' ? 'gota' : 'chama')}${c.setor}</small><h3>${c.titulo}</h3><p>${c.intro}</p>
      <ul>${lista.slice(0, 4).map(p => `<li><a href="${L('produtos/' + p.slug)}"><b>${p.cod}</b> ${p.nome}</a></li>`).join('')}</ul>
      <a class="btn btn-prim" href="${L('solucoes/' + c.slug)}">Ver o case ${ico('seta')}</a></div></article>`;
  }).join('')}</div>
</div></section>`;

  const prateleira = `<section class="prateleira"><div class="in">
  <div class="sec-cab lado"><div><span class="olho">Produtos</span><h2>Equipamentos desenvolvidos pela Vectora</h2></div>
    <div class="prat-ctrl"><button data-rolar="-1" aria-label="Voltar">${ico('voltar')}</button><button data-rolar="1" aria-label="Avançar">${ico('seta')}</button><a class="link" href="${L('produtos')}">Ver catálogo ${ico('seta')}</a></div></div>
  <div class="trilho" data-trilho>${produtos.filter(p => p.slug).map(p => cartaoProduto('b', p)).join('')}</div>
</div></section>`;

  const sobre = `<section class="sobre-b"><div class="in">
  <figure>${img('sede', 'Sede da Vectora em Santa Bárbara d\'Oeste', 'width="1082" height="600"')}<figcaption>${ico('pin')} Sede em Santa Bárbara d'Oeste (SP)</figcaption></figure>
  <div><span class="olho">Empresa Vectora</span><h2>Soluções completas para as necessidades únicas de cada cliente</h2><p>${empresa.intro2}</p>
    <ol class="valores">${empresa.pilares.map(([i, t, s, txt]) => `<li><span>${ico(i)}</span><div><h3>${t} <small>${s}</small></h3><p>${txt}</p></div></li>`).join('')}</ol>
    <a class="link" href="${L('empresa')}">Quem somos ${ico('seta')}</a></div>
</div></section>`;

  const tec = `<section class="tec"><div class="in">
  <div class="sec-cab"><span class="olho">Tecnologias utilizadas</span><h2>O que existe de mais moderno em comunicação</h2></div>
  <ul class="tec-grade">${tecnologias.map(([n, t, txt]) => `<li><b>${n}</b><small>${t}</small><p>${txt}</p></li>`).join('')}</ul>
</div></section>`;

  const cli = `<section class="cli-b"><div class="in"><div class="sec-cab"><span class="olho">Clientes</span><h2>${clientes.length} empresas que confiam na Vectora</h2></div></div>
  <div class="letreiro" aria-label="Logos de clientes"><ul>${clientes.map(logoCliente).join('')}</ul><ul aria-hidden="true">${clientes.map(logoCliente).join('')}</ul></div>
  <div class="in centro"><a class="link" href="${L('clientes')}">Ver todos os clientes ${ico('seta')}</a></div></section>`;

  return `${topo({ versao: 'b', slug: 'index' })}
<main id="conteudo">
${heroi}
${fluxo}
${setores}
${prateleira}
${sobre}
${tec}
${cli}
${ctaContato('b')}
</main>
${rodape({ versao: 'b' })}`;
}

// ---------- Páginas internas (mesma estrutura, visual de cada versão) ----------
function pEmpresa(v) {
  const L = linkDe(v);
  return `${cabeca(v, { titulo: 'Quem Somos', sub: 'Soluções em telemetria e gestão de perdas', trilha: [[null, 'Empresa']], foto: 'sede' })}
<section class="emp"><div class="in">
  <div class="emp-txt"><h2>Empresa <span>Vectora</span></h2><p class="lead">${empresa.intro}</p><p>${empresa.intro2}</p>
    <p>Desenvolvemos equipamentos de telemetria, controladores e o sistema web VectoraSys, e prestamos serviços de montagem de painéis elétricos, instalações, treinamentos, telemetria e manutenção de equipamentos.</p></div>
  <figure>${img('sede', "Sede da Vectora em Santa Bárbara d'Oeste", 'width="1082" height="600"')}<figcaption>${site.endereco}, ${site.cidade}</figcaption></figure>
</div></section>
<section class="pilares"><div class="in">${empresa.pilares.map(([i, t, s, txt]) => `<article>
  <div class="pil-cab"><span class="quadro">${ico(i)}</span><div><h3>${t}</h3><small>${s}</small></div></div><p>${txt}</p></article>`).join('')}
</div></section>
<section class="emp-links"><div class="in">
  <a href="${L('produtos')}">${ico('caixa')}<b>Produtos e Serviços</b><span>Equipamentos e serviços Vectora</span></a>
  <a href="${L('solucoes')}">${ico('rede')}<b>Soluções</b><span>Cases e tecnologias</span></a>
  <a href="${L('igualdade-salarial')}">${ico('doc')}<b>Igualdade Salarial</b><span>Relatório de transparência</span></a>
</div></section>
${ctaContato(v)}`;
}

function pProdutos(v) {
  return `${cabeca(v, { titulo: 'Produtos e Serviços', sub: 'Saneamento / Óleo e Gás', trilha: [[null, 'Produtos e Serviços']], foto: 'hero-vrp' })}
<section class="catalogo"><div class="in">
  <div class="titulo-centro"><h2><span>P</span>rodutos</h2><p>Saneamento / Óleo e Gás</p></div>
  <div class="filtros" role="toolbar" aria-label="Filtrar produtos"><button data-filtro="" aria-pressed="true">Visualizar todos</button>${categorias.map(([k, n]) => `<button data-filtro="${k}" aria-pressed="false">${ico(icoCat[k])}${n}</button>`).join('')}</div>
  <div class="grade-pc" data-catalogo>${produtos.map(p => cartaoProduto(v, p)).join('')}</div>
</div></section>
<section class="servicos" id="servicos"><div class="in">
  <div class="titulo-centro"><h2><span>S</span>erviços</h2><p>Elétricos / Hidráulicos / Treinamentos</p></div>
  <ul class="serv-grade">${servicos.map(([i, n], k) => `<li><span class="serv-ico">${ico(i)}</span><b>${n}</b><small>${num(k)}</small></li>`).join('')}</ul>
</div></section>
${ctaContato(v, 'Quer um orçamento?', 'Conte qual equipamento ou serviço você procura e a equipe comercial da Vectora retorna.')}`;
}

function pProduto(v, p) {
  const L = linkDe(v);
  const parecidos = produtos.filter(o => o !== p && o.slug && o.cats.some(c => p.cats.includes(c))).slice(0, 3);
  return `${cabeca(v, { titulo: `${p.cod} · ${p.nome}`, sub: p.titulo, trilha: [['produtos', 'Produtos e Serviços'], [null, p.cod]], foto: p.cats.includes('oleo-gas') ? 'hero-dutos' : p.cats.includes('web') ? 'hero-sistema' : 'hero-vrp' })}
<section class="prod"><div class="in">
  <div class="prod-img">${img(p.foto || p.img, `${p.cod} ${p.nome}`, 'width="500" height="332" loading="eager"')}
    <div class="pc-tags">${p.cats.map(c => `<a href="${L('produtos')}#${c}">${ico(icoCat[c])}${nomeCat[c]}</a>`).join('')}</div></div>
  <div class="prod-txt"><span class="olho">${p.titulo}</span><h2>${p.cod} <span>${p.nome}</span></h2>${p.texto.map(t => `<p>${t}</p>`).join('')}
    <div class="acoes"><a class="btn btn-prim" href="${L('contato')}?produto=${encodeURIComponent(p.cod + ' ' + p.nome)}">Solicitar orçamento ${ico('seta')}</a><a class="btn btn-sec" href="${L('produtos')}">${ico('voltar')} Todos os produtos</a></div></div>
</div></section>
<section class="specs"><div class="in">
  <h2>Características</h2>
  <ul>${p.specs.map(s => `<li>${ico('check')}<span>${s}</span></li>`).join('')}</ul>
</div></section>
${parecidos.length ? `<section class="parecidos"><div class="in"><h2>Veja também</h2><div class="grade-pc">${parecidos.map(o => cartaoProduto(v, o)).join('')}</div></div></section>` : ''}`;
}

function pClientes(v) {
  return `${cabeca(v, { titulo: 'Clientes', sub: 'Nossos clientes', trilha: [[null, 'Clientes']], foto: 'hero-sistema' })}
<section class="clientes"><div class="in">
  <div class="titulo-centro"><h2><span>N</span>ossos Clientes</h2><p>Ao longo dos anos, a Vectora atendeu e conquistou a confiança de grandes empresas, entregou e gerenciou projetos de sucesso e formou um portfólio de cases.</p></div>
  <ul class="logos todos">${clientes.map(logoCliente).join('')}</ul>
</div></section>
${ctaContato(v, 'Sua empresa pode ser a próxima', 'Saneamento, indústria ou óleo e gás: a Vectora desenvolve a solução para a sua rede.')}`;
}

function pSolucoes(v) {
  const L = linkDe(v);
  return `${cabeca(v, { titulo: 'Soluções', sub: 'Cases de sucesso', trilha: [[null, 'Soluções']], foto: 'hero-dutos' })}
<section class="cases"><div class="in">
  <div class="titulo-centro"><h2><span>C</span>ases</h2><p>Saneamento / Óleo e Gás</p></div>
  <div class="sol-tiles">${cases.map(c => `<a class="tile" href="${L('solucoes/' + c.slug)}">${img(c.img, c.titulo, 'width="500" height="332"')}
    <div><small>${ico(c.slug === 'saneamento' ? 'gota' : 'chama')}${c.setor}</small><h3>${c.titulo}</h3><p>${c.resumo}</p><b>Ver case ${ico('seta')}</b></div></a>`).join('')}</div>
</div></section>
<section class="tec"><div class="in">
  <div class="titulo-centro"><h2><span>T</span>ecnologias Utilizadas</h2><p>A Vectora Indústria emprega em seus equipamentos e projetos o que existe de mais moderno em tecnologia no mercado.</p></div>
  <ul class="tec-grade">${tecnologias.map(([n, t, txt]) => `<li><b>${n}</b><small>${t}</small><p>${txt}</p></li>`).join('')}</ul>
</div></section>
${ctaContato(v)}`;
}

function pCase(v, c) {
  const L = linkDe(v);
  return `${cabeca(v, { titulo: c.titulo, sub: c.setor, trilha: [['solucoes', 'Soluções'], [null, c.setor]], foto: c.foto })}
<section class="case"><div class="in">
  <figure>${img(c.img, c.titulo, 'width="500" height="332" loading="eager"')}</figure>
  <div><span class="olho">${ico(c.slug === 'saneamento' ? 'gota' : 'chama')}${c.setor}</span><h2>${c.titulo}</h2><p class="lead">${c.intro}</p></div>
</div></section>
<section class="case-pontos"><div class="in">
  <ol>${c.pontos.map(([t, txt], k) => `<li><span>${num(k)}</span><h3>${t}</h3><p>${txt}</p></li>`).join('')}</ol>
  <p class="resultado">${c.resultado}</p>
</div></section>
<section class="parecidos"><div class="in"><h2>Equipamentos do case</h2><div class="grade-pc">${c.equipamentos.map(s => cartaoProduto(v, produto(s))).join('')}</div>
  <div class="centro"><a class="btn btn-sec" href="${L('solucoes')}">${ico('voltar')} Todas as soluções</a></div></div></section>
${ctaContato(v)}`;
}

function pIgualdade(v) {
  return `${cabeca(v, { titulo: igualdade.titulo, sub: igualdade.periodo, trilha: [['empresa', 'Empresa'], [null, 'Igualdade Salarial']] })}
<section class="igual"><div class="in">
  <div class="igual-txt"><h2>Transparência Salarial Vectora</h2><p class="lead">Relatório de Transparência Salarial e de Critérios Remuneratórios, ${igualdade.periodo}.</p>
    <h3>Base legal</h3><ul class="base">${igualdade.base.map(b => `<li>${ico('doc')}${b}</li>`).join('')}</ul>
    <h3>Notas explicativas</h3><ol class="notas">${igualdade.notas.map(n => `<li>${n}</li>`).join('')}</ol>
    <p class="compromisso">${igualdade.compromisso}</p></div>
  <aside class="igual-box">${ico('doc', 'ico grande')}<b>Relatório em PDF</b><p>Transparência Salarial Vectora · ${igualdade.periodo}</p><a class="btn btn-prim" href="mailto:${site.email}?subject=${encodeURIComponent('Relatório de Transparência Salarial')}">Solicitar o relatório</a></aside>
</div></section>`;
}

function pContato(v) {
  return `${cabeca(v, { titulo: 'Contato', sub: 'Fale com a Vectora', trilha: [[null, 'Contato']], foto: 'sede' })}
<section class="contato"><div class="in">
  <div class="cont-info"><h2>${site.razao}</h2><p class="olho">Matriz</p>
    <ul>
      <li><a href="tel:${site.foneHref}">${ico('fone')}<span><small>Telefone</small>${site.fone}</span></a></li>
      <li><a href="mailto:${site.email}">${ico('email')}<span><small>E-mail</small>${site.email}</span></a></li>
      <li><a href="${site.mapaLink}" target="_blank" rel="noopener">${ico('pin')}<span><small>Endereço</small>${site.endereco}<br>${site.cidade} · ${site.cep}</span></a></li>
    </ul></div>
  <div class="cont-form"><h2>Formulário para contato</h2>${formContato()}</div>
</div></section>
<section class="mapa"><h2 class="sr">Localização</h2><iframe title="Mapa da Vectora em Santa Bárbara d'Oeste" src="${site.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;
}

export function gerarVersao(v) {
  const pag = (slug, miolo) => documento({ versao: v, slug, tema: TEMA[v], corpo: slug === 'index' ? miolo : `${topo({ versao: v, slug, escuro: v === 'a' })}\n<main id="conteudo">\n${miolo}\n</main>\n${rodape({ versao: v })}` });
  const out = {
    index: pag('index', v === 'a' ? homeA() : homeB()),
    empresa: pag('empresa', pEmpresa(v)),
    produtos: pag('produtos', pProdutos(v)),
    clientes: pag('clientes', pClientes(v)),
    solucoes: pag('solucoes', pSolucoes(v)),
    'igualdade-salarial': pag('igualdade-salarial', pIgualdade(v)),
    contato: pag('contato', pContato(v)),
  };
  for (const p of produtos) if (p.slug) out['produtos/' + p.slug] = pag('produtos/' + p.slug, pProduto(v, p));
  for (const c of cases) out['solucoes/' + c.slug] = pag('solucoes/' + c.slug, pCase(v, c));
  return out;
}
