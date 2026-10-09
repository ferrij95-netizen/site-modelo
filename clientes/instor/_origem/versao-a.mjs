// Versão A, "Engenharia": clara, papel branco e cinza do logo com o verde como acento. Cara de catálogo técnico
// organizado: abertura dividida com foto real, setores em cartões, ficha técnica em tabela limpa.
import { site, nav, missao, visao, valores, numeros, setores, robos, servicos, historia, lideranca, politicas, equipe, clientes, parceiros, comerciais, associacoes, imprensa, setor, robo } from './conteudo.mjs';
import { documento, idiomas, logo, img, zap, formContato, esc } from './comum.mjs';

const V = 'a';
const L = s => `/${V}/${s === 'index' ? '' : s + '/'}`;
const seta = '<svg class="seta" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';

const header = slug => `<div class="util"><div class="in util-in">
  <span>${site.slogan}</span>
  <span class="util-dir"><a href="mailto:${site.vendas.email}">${site.vendas.email}</a><a href="${zap()}">${site.vendas.tel}</a><a href="${site.linkedin}">LinkedIn</a><a href="${site.youtube}">YouTube</a></span>
</div></div>
<header class="topo"><div class="in topo-in">
  <a class="topo-marca" href="${L('index')}" aria-label="Instor, início">${logo()}</a>
  <nav class="topo-nav" id="menu" aria-label="Principal">
    ${nav.map(([s, n]) => `<a href="${L(s)}"${slug.split('/')[0] === s ? ' aria-current="page"' : ''}>${n}</a>`).join('\n    ')}
  </nav>
  ${idiomas}
  <a class="btn btn-prim topo-cta" href="${L('contato')}">Fale com a engenharia</a>
  <button class="topo-menu" type="button" aria-expanded="false" aria-controls="menu" data-menu><span></span>Menu</button>
</div></header>`;

const footer = () => `<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca">${logo('logo-claro')}<p>${missao}</p></div>
  <div class="rodape-col"><h2>Robôs</h2>${robos.map(r => `<a href="${L('robos/' + r.id)}">${r.nome}</a>`).join('')}</div>
  <div class="rodape-col"><h2>Instor</h2><a href="${L('empresa')}">Empresa</a><a href="${L('solucoes')}">Soluções</a><a href="${L('servicos')}">Serviços</a><a href="${L('clientes')}">Clientes</a><a href="${L('imprensa')}">Imprensa</a><a href="${L('contato')}">Trabalhe conosco</a></div>
  <div class="rodape-col"><h2>Contato</h2><a href="mailto:${site.email}">${site.email}</a><a href="${zap()}">Vendas ${site.vendas.tel}</a><p>${site.matriz.slice(1, 3).join('<br>')}</p><p>${site.filial.slice(1, 3).join('<br>')}</p></div>
</div>
<div class="in rodape-base"><span>© 2026 ${site.razao}</span><a href="/">Ver as duas versões</a></div></footer>`;

const trilha = (...itens) => `<nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${itens.map(([h, n]) => h ? `<a href="${L(h)}">${n}</a>` : `<span>${n}</span>`).join('')}</nav>`;
const cabeca = (titulo, lead, trilhaItens) => `<section class="cabeca"><div class="in">${trilha(...trilhaItens)}<h1>${titulo}</h1><p class="lead">${lead}</p></div></section>`;

const cta = () => `<section class="cta"><div class="in cta-in">
  <div><span class="eyebrow">Projeto, robô ou serviço</span><h2>Conte o ambiente e o risco. A engenharia da Instor indica o robô, ou projeta um.</h2></div>
  <div class="cta-acoes"><a class="btn btn-prim" href="${L('contato')}">Falar com a engenharia</a><a class="btn btn-contorno-claro" href="${zap()}">WhatsApp de vendas</a></div>
</div></section>`;

const cartaoRobo = r => `<a class="robo-card" href="${L('robos/' + r.id)}" data-setor="${r.setor}">
  <div class="robo-img">${img(r.foto, r.nome)}</div>
  <div class="robo-txt"><span class="tag">${setor(r.setor).nome}</span><h3>${r.nome}</h3><span class="robo-tipo">${r.tipo}</span><p>${r.resumo}</p></div>
</a>`;

const pag = {
  index: () => `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <span class="eyebrow">Robótica móvel · desde 2008</span>
    <h1>Robôs que vão onde não é seguro mandar pessoas.</h1>
    <p class="lead">${missao} Robôs autônomos e teleoperados projetados e fabricados pela Instor, no Rio Grande do Sul.</p>
    <div class="hero-acoes"><a class="btn btn-prim" href="${L('robos')}">Conhecer os robôs ${seta}</a><a class="btn btn-sec" href="${L('contato')}">Falar com vendas</a></div>
    <dl class="hero-num">${numeros.map(([v, r]) => `<div><dt>${v}</dt><dd>${r}</dd></div>`).join('')}</dl>
  </div>
  <figure class="hero-foto">${img('tupa-ex', 'Robô Tupã Ex em operação noturna', 'fetchpriority="high" loading="eager"')}<figcaption><b>Tupã Ex</b> Primeiro robô autônomo à prova de explosão da América Latina, desenvolvido com a Petrobras.</figcaption></figure>
</div></section>

<section class="secao"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Soluções por setor</span><h2>Seis setores, um mesmo objetivo: tirar a pessoa da área de risco.</h2></div><a class="link" href="${L('solucoes')}">Ver todas as soluções ${seta}</a></div>
  <div class="setores">${setores.map(s => `<a class="setor-card" href="${L('solucoes')}#${s.id}"><div class="setor-img">${img(s.foto, s.nome)}</div><div><h3>${s.nome}</h3><p>${s.resumo}</p></div></a>`).join('')}</div>
</div></section>

<section class="secao secao-cinza"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Linha de robôs</span><h2>Engenharia própria, do chassi ao software.</h2></div><a class="link" href="${L('robos')}">Ver os ${robos.length} robôs ${seta}</a></div>
  <div class="robos">${['tupa-ex', 'guaraci', 'jaci', 'jaguar', 'tupa', 'macuxi'].map(id => cartaoRobo(robo(id))).join('')}</div>
</div></section>

<section class="secao"><div class="in faixa-parceria">
  <div class="faixa-foto">${img('linha-robos', 'Linha de robôs da Instor')}</div>
  <div><span class="eyebrow">Desenvolvido com quem opera</span><h2>Fornecedora cadastrada da Petrobras desde 2012.</h2>
  <p>O Tupã Ex e o Guaraci nasceram com a Petrobras. O Tupã, com a Vale. O Jaguar e a Jaci, com apoio da Finep. Cada robô sai de um problema real de campo, testado com quem vai usar.</p>
  <ul class="chips">${clientes.slice(0, 8).map(c => `<li>${c}</li>`).join('')}</ul>
  <a class="link" href="${L('clientes')}">Clientes e parceiros ${seta}</a></div>
</div></section>

<section class="secao secao-cinza"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Serviços</span><h2>Também operamos os robôs para você.</h2></div><a class="link" href="${L('servicos')}">Ver serviços ${seta}</a></div>
  <div class="servicos-lista">${servicos.map(s => `<a class="servico-card" href="${L('servicos')}#${s.id}">${img(s.foto, s.nome)}<h3>${s.nome}</h3><p>${s.texto}</p></a>`).join('')}</div>
</div></section>

<section class="secao"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Imprensa</span><h2>A Instor nas notícias.</h2></div><a class="link" href="${L('imprensa')}">Todas as notícias ${seta}</a></div>
  <div class="noticias">${imprensa.slice(0, 3).map(([t, v, a, u]) => `<a class="noticia" href="${u}" target="_blank" rel="noopener"><span class="noticia-v">${v}${a ? ' · ' + a : ''}</span><h3>${t}</h3><span class="link">Ler matéria ${seta}</span></a>`).join('')}</div>
</div></section>
${cta()}`,

  empresa: () => `${cabeca('Da universidade à robótica Ex.', 'A Instor nasceu em 2008 de um grupo de estudantes do laboratório de metalurgia da UFRGS. Hoje projeta e fabrica robôs para Petrobras, Vale e grandes indústrias.', [[null, 'Empresa']])}
<section class="secao"><div class="in mvv">
  <div class="mvv-item"><span class="eyebrow">Missão</span><p>${missao}</p></div>
  <div class="mvv-item"><span class="eyebrow">Visão</span><p>${visao}</p></div>
  <div class="mvv-item"><span class="eyebrow">Valores</span><ul>${valores.map(([t, d]) => `<li><b>${t}.</b> ${d}</li>`).join('')}</ul></div>
</div></section>
<section class="secao secao-cinza"><div class="in hist">
  <div class="hist-lado"><span class="eyebrow">Trajetória</span><h2>Mais de vinte anos de robótica.</h2><figure>${img('fundadores', 'Equipe da Instor com um robô na oficina')}<figcaption>A equipe da Instor com um dos primeiros robôs.</figcaption></figure></div>
  <ol class="linha-tempo">${historia.map(([a, t]) => `<li><b>${a}</b><p>${t}</p></li>`).join('')}</ol>
</div></section>
<section class="secao"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Liderança</span><h2>Quem conduz a Instor.</h2></div></div>
  <div class="lideres">${lideranca.map(([n, c, f]) => `<div class="lider">${img(f, n)}<h3>${n}</h3><p>${c}</p></div>`).join('')}</div>
  <p class="equipe">${equipe}</p>
</div></section>
<section class="secao secao-cinza"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Políticas</span><h2>Qualidade, meio ambiente e segurança.</h2></div></div>
  <div class="politicas">${politicas.map(([t, d]) => `<div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  <ul class="chips chips-grande">${associacoes.map(a => `<li>${a}</li>`).join('')}</ul>
</div></section>
${cta()}`,

  solucoes: () => `${cabeca('Soluções por setor.', 'Projetos sob medida para demandas específicas de cada setor, com robôs autônomos ou teleoperados.', [[null, 'Soluções']])}
<nav class="ancoras"><div class="in">${setores.map(s => `<a href="#${s.id}">${s.nome}</a>`).join('')}</div></nav>
${setores.map((s, i) => `<section class="secao${i % 2 ? ' secao-cinza' : ''}" id="${s.id}"><div class="in setor-linha${i % 2 ? ' inverte' : ''}">
  <div class="setor-foto">${img(s.foto, s.nome)}</div>
  <div><span class="eyebrow">${String(i + 1).padStart(2, '0')} · ${s.nome}</span><h2>${s.resumo}</h2><p>${s.texto}</p>
  <ul class="mini-robos">${s.robos.map(id => { const r = robo(id); return `<li><a href="${L('robos/' + r.id)}">${img(r.foto, r.nome)}<span><b>${r.nome}</b>${r.tipo}</span>${seta}</a></li>`; }).join('')}</ul></div>
</div></section>`).join('')}
${cta()}`,

  robos: () => `${cabeca('Robôs Instor.', 'Autônomos e teleoperados, para inspeção, transporte, pintura, amostragem e desinfecção. Todos projetados e fabricados pela Instor.', [[null, 'Robôs']])}
<section class="secao secao-curta"><div class="in">
  <div class="filtros" role="group" aria-label="Filtrar por setor"><button type="button" class="ativo" data-filtro="">Todos</button>${setores.filter(s => robos.some(r => r.setor === s.id)).map(s => `<button type="button" data-filtro="${s.id}">${s.nome}</button>`).join('')}</div>
  <div class="robos" data-lista-robos>${robos.map(cartaoRobo).join('')}</div>
</div></section>
${cta()}`,

  servicos: () => `${cabeca('Serviços com robôs.', 'A Instor leva o robô e a equipe até a sua planta: inspeção, pintura e projetos especiais, com relatório digital ao final.', [[null, 'Serviços']])}
${servicos.map((s, i) => `<section class="secao${i % 2 ? ' secao-cinza' : ''}" id="${s.id}"><div class="in setor-linha${i % 2 ? ' inverte' : ''}">
  <div class="setor-foto">${img(s.foto, s.nome)}</div>
  <div><span class="eyebrow">Serviço ${String(i + 1).padStart(2, '0')}</span><h2>${s.nome}</h2><p>${s.texto}</p><ul class="lista-check">${s.itens.map(t => `<li>${t}</li>`).join('')}</ul><a class="btn btn-prim" href="${L('contato')}">Pedir proposta</a></div>
</div></section>`).join('')}
${cta()}`,

  clientes: () => `${cabeca('Clientes e parceiros.', 'Empresas, universidades e instituições de fomento que trabalham com a Instor.', [[null, 'Clientes']])}
<section class="secao"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Clientes</span><h2>Quem já usa robôs Instor.</h2></div></div>
  <ul class="nomes">${clientes.map(c => `<li>${c}</li>`).join('')}</ul>
</div></section>
<section class="secao secao-cinza"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Parceiros</span><h2>Pesquisa, fomento e testes.</h2></div></div>
  <ul class="nomes">${parceiros.map(c => `<li>${c}</li>`).join('')}</ul>
</div></section>
<section class="secao"><div class="in duas">
  <div><span class="eyebrow">Parceiros comerciais internacionais</span><ul class="nomes nomes-2">${comerciais.internacionais.map(c => `<li>${c}</li>`).join('')}</ul></div>
  <div><span class="eyebrow">Parceiros comerciais nacionais</span><ul class="nomes nomes-2">${comerciais.nacionais.map(c => `<li>${c}</li>`).join('')}</ul></div>
</div></section>
${cta()}`,

  imprensa: () => `${cabeca('A Instor na imprensa.', 'Reportagens, artigos e publicações sobre os robôs e projetos da Instor.', [[null, 'Imprensa']])}
<section class="secao"><div class="in imprensa-grade">
  <figure class="imprensa-foto">${img('painel-embrapa', 'Painel sobre robótica na agricultura no evento Semear Digital')}<figcaption>Painel de robótica na agricultura, Embrapa Semear Digital, 2026.</figcaption></figure>
  <ul class="imprensa-lista">${imprensa.map(([t, v, a, u]) => `<li><a href="${u}" target="_blank" rel="noopener"><span class="noticia-v">${v}${a ? ' · ' + a : ''}</span><b>${t}</b>${seta}</a></li>`).join('')}</ul>
</div></section>
${cta()}`,

  contato: () => `${cabeca('Fale com a Instor.', 'Conte o que precisa e para onde. A equipe de vendas responde com a solução indicada.', [[null, 'Contato']])}
<section class="secao"><div class="in contato">
  ${formContato()}
  <aside class="contato-lado">
    ${[['Vendas', site.vendas], ['Compras', site.compras], ['Financeiro', site.financeiro]].map(([n, d]) => `<div class="depto"><h3>${n}</h3><a href="mailto:${d.email}">${d.email}</a><a href="${zap(d.zap)}">${d.tel} · WhatsApp</a></div>`).join('')}
    <div class="depto"><h3>Geral</h3><a href="mailto:${site.email}">${site.email}</a><a href="mailto:${site.gerencia}">${site.gerencia}</a></div>
    ${[site.matriz, site.filial].map(([t, ...l]) => `<div class="depto"><h3>${t}</h3><p>${l.join('<br>')}</p></div>`).join('')}
  </aside>
</div></section>`,
};

const paginaRobo = r => {
  const s = setor(r.setor);
  const outros = robos.filter(o => o.id !== r.id && (o.setor === r.setor)).concat(robos.filter(o => o.id !== r.id && o.setor !== r.setor)).slice(0, 3);
  return `<section class="robo-topo"><div class="in">${trilha(['robos', 'Robôs'], [null, r.nome])}
  <div class="robo-topo-in">
    <figure class="robo-foto">${img(r.foto, r.nome, 'loading="eager"')}</figure>
    <div class="robo-intro"><span class="tag">${s.nome}</span><h1>${r.nome}</h1><span class="robo-tipo">${r.tipo}</span>${r.selo ? `<span class="selo">${r.selo}</span>` : ''}<p class="lead">${r.resumo}</p>
      <div class="hero-acoes"><a class="btn btn-prim" href="${L('contato')}">Solicitar proposta</a><a class="btn btn-sec" href="${zap(site.vendas.zap, `Olá! Gostaria de saber mais sobre o ${r.nome}.`)}">WhatsApp</a></div>
    </div>
  </div>
</div></section>
<section class="secao"><div class="in robo-corpo">
  <div><span class="eyebrow">O que faz</span><p class="robo-texto">${r.texto}</p><ul class="lista-check">${r.destaques.map(d => `<li>${d}</li>`).join('')}</ul></div>
  <div class="ficha"><h2>Ficha técnica</h2><table><tbody>${r.specs.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('')}</tbody></table><p class="ficha-nota">Folha de dados completa sob consulta.</p></div>
</div></section>
${r.fotos.length ? `<section class="secao secao-cinza secao-curta"><div class="in galeria">${r.fotos.map(f => `<figure>${img(f, r.nome)}</figure>`).join('')}</div></section>` : ''}
<section class="secao"><div class="in">
  <div class="secao-topo"><div><span class="eyebrow">Veja também</span><h2>Outros robôs Instor.</h2></div><a class="link" href="${L('robos')}">Todos os robôs ${seta}</a></div>
  <div class="robos">${outros.map(cartaoRobo).join('')}</div>
</div></section>
${cta()}`;
};

export function versaoA() {
  const out = {};
  const tema = '#ffffff';
  for (const [slug, fn] of Object.entries(pag)) out[slug] = documento({ versao: V, slug, tema, corpo: `${header(slug)}\n<main>${fn()}</main>\n${footer()}` });
  for (const r of robos) out['robos/' + r.id] = documento({ versao: V, slug: 'robos/' + r.id, tema, corpo: `${header('robos')}\n<main>${paginaRobo(r)}</main>\n${footer()}` });
  return out;
}
