// Versão B, "Operação": escura, grafite com o verde do logo aceso. Cara de sala de controle: foto de campo em
// tela cheia, frota em lista técnica com números, ficha técnica em linhas, trajetória em régua horizontal.
import { site, nav, missao, visao, valores, numeros, setores, robos, servicos, historia, lideranca, politicas, equipe, clientes, parceiros, comerciais, associacoes, imprensa, setor, robo } from './conteudo.mjs';
import { documento, logo, img, zap, formContato, num } from './comum.mjs';

const V = 'b';
const L = s => `/${V}/${s === 'index' ? '' : s + '/'}`;
const seta = '<svg class="seta" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
// Número de destaque de cada robô na lista da frota.
const chave = r => r.specs.find(([k]) => /Autonomia|Aplicação|Eficácia|Carga|Certificação/.test(k)) || r.specs[0];

const header = slug => `<header class="topo${slug === 'index' ? ' topo-sobre' : ''}"><div class="in topo-in">
  <a class="topo-marca" href="${L('index')}" aria-label="Instor, início">${logo()}</a>
  <nav class="topo-nav" id="menu" aria-label="Principal">
    ${nav.map(([s, n]) => `<a href="${L(s)}"${slug.split('/')[0] === s ? ' aria-current="page"' : ''}>${n}</a>`).join('\n    ')}
  </nav>
  <a class="btn btn-prim topo-cta" href="${L('contato')}">Fale conosco</a>
  <button class="topo-menu" type="button" aria-expanded="false" aria-controls="menu" data-menu><span></span>Menu</button>
</div></header>`;

const footer = () => `<footer class="rodape"><div class="in">
  <div class="rodape-topo"><p class="rodape-frase">${site.slogan}.</p></div>
  <div class="rodape-in">
    <div class="rodape-marca">${logo()}<p>${site.razao}. Engenharia e fabricação de robôs móveis desde 2008.</p></div>
    <div class="rodape-col"><h2>Frota</h2>${robos.map(r => `<a href="${L('robos/' + r.id)}">${r.nome}</a>`).join('')}</div>
    <div class="rodape-col"><h2>Setores</h2>${setores.map(s => `<a href="${L('solucoes')}#${s.id}">${s.nome}</a>`).join('')}</div>
    <div class="rodape-col"><h2>Contato</h2><a href="mailto:${site.email}">${site.email}</a><a href="${zap()}">Vendas ${site.vendas.tel}</a><a href="${site.linkedin}">LinkedIn</a><a href="${site.youtube}">YouTube</a></div>
    <div class="rodape-col"><h2>Endereços</h2><p>${site.matriz[0]}: ${site.matriz.slice(1, 3).join(', ')}</p><p>${site.filial[0]}: ${site.filial.slice(2, 3).join('')}</p></div>
  </div>
  <div class="rodape-base"><span>© 2026 ${site.razao}</span><a href="/">Ver as duas versões</a></div>
</div></footer>`;

const trilha = (...itens) => `<nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${itens.map(([h, n]) => h ? `<a href="${L(h)}">${n}</a>` : `<span>${n}</span>`).join('')}</nav>`;
const cabeca = (titulo, lead, trilhaItens, foto) => `<section class="cabeca${foto ? ' cabeca-foto' : ''}">${foto ? img(foto, '', 'loading="eager"') : ''}<div class="in">${trilha(...trilhaItens)}<h1>${titulo}</h1><p class="lead">${lead}</p></div></section>`;

const cta = () => `<section class="cta"><div class="in cta-in">
  <h2>Tem uma área onde ninguém deveria entrar? <span>Fale com a Instor.</span></h2>
  <div class="cta-acoes"><a class="btn btn-prim" href="${L('contato')}">Falar com a engenharia ${seta}</a><a class="btn btn-contorno" href="${zap()}">WhatsApp de vendas</a></div>
</div></section>`;

const frota = lista => `<ol class="frota">${lista.map((r, i) => { const [k, v] = chave(r); return `<li data-setor="${r.setor}"><a href="${L('robos/' + r.id)}">
  <span class="frota-n">${num(i)}</span>
  <span class="frota-img">${img(r.foto, r.nome)}</span>
  <span class="frota-nome"><b>${r.nome}</b><i>${r.tipo}</i></span>
  <span class="frota-setor">${setor(r.setor).nome}</span>
  <span class="frota-spec"><small>${k}</small>${v}</span>
  ${seta}
</a></li>`; }).join('')}</ol>`;

const pag = {
  index: () => `
<section class="hero">
  ${img('macuxi', 'Robô Macuxi em operação de pintura', 'class="hero-bg" fetchpriority="high" loading="eager"')}
  <div class="in hero-in">
    <div class="hero-txt">
      <span class="rotulo">Instor · Projetos &amp; Robótica · Viamão, RS</span>
      <h1>Robótica a serviço da humanidade.</h1>
      <p class="lead">${missao}</p>
      <div class="hero-acoes"><a class="btn btn-prim" href="${L('robos')}">Ver a frota ${seta}</a><a class="btn btn-contorno" href="${L('servicos')}">Serviços com robôs</a></div>
    </div>
    <nav class="hero-setores" aria-label="Setores">${setores.map((s, i) => `<a href="${L('solucoes')}#${s.id}"><span>${num(i)}</span>${s.nome}</a>`).join('')}</nav>
  </div>
</section>

<section class="secao"><div class="in">
  <div class="secao-topo"><span class="rotulo">Frota Instor</span><h2>Nove robôs projetados e fabricados em casa.</h2><a class="link" href="${L('robos')}">Ficha de cada robô ${seta}</a></div>
  ${frota(robos)}
</div></section>

<section class="destaque"><div class="destaque-foto">${img('tupa-ex', 'Robô Tupã Ex')}</div><div class="destaque-txt">
  <span class="rotulo">Em destaque · Óleo e gás</span>
  <h2>Tupã Ex. A ronda de inspeção, sem ninguém na Zona 1.</h2>
  <p>${robo('tupa-ex').texto}</p>
  <dl class="numeros">${[['6 h', 'de autonomia'], ['5', 'gases detectados'], ['Zona 1', 'certificação Ex'], ['5G', 'Wi-Fi e 4G LTE']].map(([v, r]) => `<div><dt>${v}</dt><dd>${r}</dd></div>`).join('')}</dl>
  <a class="link" href="${L('robos/tupa-ex')}">Ficha técnica do Tupã Ex ${seta}</a>
</div></section>

<section class="secao"><div class="in">
  <div class="secao-topo"><span class="rotulo">Setores</span><h2>Onde os robôs Instor trabalham.</h2><a class="link" href="${L('solucoes')}">Soluções por setor ${seta}</a></div>
  <div class="mosaico">${setores.map((s, i) => `<a class="tile" href="${L('solucoes')}#${s.id}">${img(s.foto, s.nome)}<span class="tile-txt"><small>${num(i)}</small><b>${s.nome}</b><i>${s.resumo}</i></span></a>`).join('')}</div>
</div></section>

<section class="secao secao-linha"><div class="in">
  <div class="secao-topo"><span class="rotulo">Trajetória</span><h2>De um laboratório da UFRGS à robótica certificada Ex.</h2><a class="link" href="${L('empresa')}">Sobre a Instor ${seta}</a></div>
</div>
  <ol class="regua">${historia.map(([a, t]) => `<li><b>${a}</b><p>${t}</p></li>`).join('')}</ol>
</section>

<section class="secao"><div class="in">
  <div class="secao-topo"><span class="rotulo">Serviços</span><h2>A equipe Instor opera o robô na sua planta.</h2><a class="link" href="${L('servicos')}">Ver serviços ${seta}</a></div>
  <div class="servicos-col">${servicos.map((s, i) => `<a href="${L('servicos')}#${s.id}"><small>${num(i)}</small><h3>${s.nome}</h3><p>${s.texto}</p></a>`).join('')}</div>
</div></section>

<section class="secao secao-clientes"><div class="in">
  <span class="rotulo">Quem trabalha com a Instor</span>
  <ul class="letreiro">${clientes.map(c => `<li>${c}</li>`).join('')}</ul>
</div></section>
${cta()}`,

  empresa: () => `${cabeca('Engenharia própria desde 2008.', 'A Instor nasceu de estudantes do Laboratório de Metalurgia Física da UFRGS e hoje desenvolve robôs com Petrobras, Vale e Finep.', [[null, 'Empresa']], 'linha-robos')}
<section class="secao"><div class="in mvv">
  <div><span class="rotulo">Missão</span><p>${missao}</p></div>
  <div><span class="rotulo">Visão</span><p>${visao}</p></div>
  <div><span class="rotulo">Valores</span><ul>${valores.map(([t, d]) => `<li><b>${t}</b>${d}</li>`).join('')}</ul></div>
</div></section>
<section class="secao secao-linha"><div class="in"><div class="secao-topo"><span class="rotulo">Trajetória</span><h2>Vinte e dois anos, um robô de cada vez.</h2></div></div>
  <ol class="regua">${historia.map(([a, t]) => `<li><b>${a}</b><p>${t}</p></li>`).join('')}</ol>
</section>
<section class="secao"><div class="in">
  <div class="secao-topo"><span class="rotulo">Liderança</span><h2>Diretoria.</h2></div>
  <div class="lideres">${lideranca.map(([n, c, f]) => `<div class="lider">${img(f, n)}<div><h3>${n}</h3><p>${c}</p></div></div>`).join('')}</div>
  <p class="equipe">${equipe}</p>
</div></section>
<section class="secao secao-linha"><div class="in">
  <div class="secao-topo"><span class="rotulo">Sistema de gestão</span><h2>Políticas.</h2></div>
  <div class="politicas">${politicas.map(([t, d], i) => `<div><small>${num(i)}</small><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  <ul class="selos">${associacoes.map(a => `<li>${a}</li>`).join('')}</ul>
</div></section>
${cta()}`,

  solucoes: () => `${cabeca('Seis setores. Um mesmo objetivo.', 'Tirar a pessoa da área de risco e deixar o processo mais eficiente, com robôs autônomos ou teleoperados.', [[null, 'Soluções']], 'petrobras-tanques')}
${setores.map((s, i) => `<section class="setor" id="${s.id}">
  <div class="setor-foto">${img(s.foto, s.nome)}</div>
  <div class="setor-txt"><span class="rotulo">${num(i)} · ${s.nome}</span><h2>${s.resumo}</h2><p>${s.texto}</p>
  ${frota(s.robos.map(robo))}</div>
</section>`).join('')}
${cta()}`,

  robos: () => `${cabeca('A frota Instor.', 'Inspeção, transporte, pintura, amostragem e desinfecção. Escolha o setor ou abra a ficha técnica de cada robô.', [[null, 'Robôs']], 'chassi')}
<section class="secao"><div class="in">
  <div class="filtros" role="group" aria-label="Filtrar por setor"><button type="button" class="ativo" data-filtro="">Todos</button>${setores.filter(s => robos.some(r => r.setor === s.id)).map(s => `<button type="button" data-filtro="${s.id}">${s.nome}</button>`).join('')}</div>
  <div data-lista-robos>${frota(robos)}</div>
</div></section>
${cta()}`,

  servicos: () => `${cabeca('Serviços com robôs.', 'A Instor leva o robô e a equipe até a planta. Inspeção, pintura e projetos especiais, com relatório digital ao final.', [[null, 'Serviços']], 'angoera')}
${servicos.map((s, i) => `<section class="setor" id="${s.id}">
  <div class="setor-foto">${img(s.foto, s.nome)}</div>
  <div class="setor-txt"><span class="rotulo">Serviço ${num(i)}</span><h2>${s.nome}</h2><p>${s.texto}</p>
  <ul class="itens">${s.itens.map(t => `<li>${t}</li>`).join('')}</ul><a class="btn btn-prim" href="${L('contato')}">Pedir proposta ${seta}</a></div>
</section>`).join('')}
${cta()}`,

  clientes: () => `${cabeca('Clientes e parceiros.', 'Empresas, universidades, hospitais e instituições de fomento que trabalham com a Instor.', [[null, 'Clientes']])}
<section class="secao"><div class="in grupos">
  <div><span class="rotulo">Clientes</span><ul class="nomes">${clientes.map(c => `<li>${c}</li>`).join('')}</ul></div>
  <div><span class="rotulo">Parceiros de pesquisa e fomento</span><ul class="nomes">${parceiros.map(c => `<li>${c}</li>`).join('')}</ul></div>
  <div><span class="rotulo">Parceiros comerciais internacionais</span><ul class="nomes">${comerciais.internacionais.map(c => `<li>${c}</li>`).join('')}</ul></div>
  <div><span class="rotulo">Parceiros comerciais nacionais</span><ul class="nomes">${comerciais.nacionais.map(c => `<li>${c}</li>`).join('')}</ul></div>
</div></section>
${cta()}`,

  imprensa: () => `${cabeca('Na imprensa.', 'Reportagens e publicações sobre os robôs e projetos da Instor.', [[null, 'Imprensa']], 'painel-embrapa')}
<section class="secao"><div class="in">
  <ol class="clipping">${imprensa.map(([t, v, a, u]) => `<li><a href="${u}" target="_blank" rel="noopener"><span class="clip-a">${a || '·'}</span><span class="clip-t"><small>${v}</small><b>${t}</b></span>${seta}</a></li>`).join('')}</ol>
</div></section>
${cta()}`,

  contato: () => `${cabeca('Fale com a Instor.', 'Conte o ambiente, o risco e o que precisa ser feito. A equipe responde com a solução indicada.', [[null, 'Contato']])}
<section class="secao"><div class="in contato">
  ${formContato()}
  <aside class="contato-lado">
    ${[['Vendas', site.vendas], ['Compras', site.compras], ['Financeiro', site.financeiro]].map(([n, d]) => `<div class="depto"><small>${n}</small><a href="mailto:${d.email}">${d.email}</a><a href="${zap(d.zap)}">${d.tel} · WhatsApp</a></div>`).join('')}
    <div class="depto"><small>Geral</small><a href="mailto:${site.email}">${site.email}</a><a href="mailto:${site.gerencia}">${site.gerencia}</a></div>
    ${[site.matriz, site.filial].map(([t, ...l]) => `<div class="depto"><small>${t}</small><p>${l.join('<br>')}</p></div>`).join('')}
  </aside>
</div></section>`,
};

const paginaRobo = r => {
  const s = setor(r.setor);
  const i = robos.indexOf(r);
  const prox = robos[(i + 1) % robos.length];
  return `<section class="robo-hero">${img(r.foto, r.nome, 'class="hero-bg" loading="eager"')}<div class="in robo-hero-in">
  ${trilha(['robos', 'Frota'], [null, r.nome])}
  <div><span class="rotulo">${num(i)} · ${s.nome} · ${r.tipo}</span><h1>${r.nome}</h1><p class="lead">${r.resumo}</p>${r.selo ? `<span class="selo">${r.selo}</span>` : ''}</div>
</div></section>
<section class="secao"><div class="in robo-corpo">
  <div class="robo-desc"><p class="robo-texto">${r.texto}</p>
    <ol class="destaques">${r.destaques.map((d, k) => `<li><small>${num(k)}</small>${d}</li>`).join('')}</ol>
    <div class="hero-acoes"><a class="btn btn-prim" href="${L('contato')}">Solicitar proposta ${seta}</a><a class="btn btn-contorno" href="${zap(site.vendas.zap, `Olá! Gostaria de saber mais sobre o ${r.nome}.`)}">WhatsApp</a></div>
  </div>
  <aside class="ficha"><h2>Ficha técnica</h2><dl>${r.specs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl><p>Folha de dados completa sob consulta.</p></aside>
</div></section>
${r.fotos.length ? `<section class="galeria">${r.fotos.map(f => img(f, r.nome)).join('')}</section>` : ''}
<a class="proximo" href="${L('robos/' + prox.id)}"><div class="in"><small>Próximo robô</small><b>${prox.nome}</b><span>${prox.tipo}</span>${seta}</div></a>
${cta()}`;
};

export function versaoB() {
  const out = {};
  const tema = '#151816';
  for (const [slug, fn] of Object.entries(pag)) out[slug] = documento({ versao: V, slug, tema, corpo: `${header(slug)}\n<main>${fn()}</main>\n${footer()}` });
  for (const r of robos) out['robos/' + r.id] = documento({ versao: V, slug: 'robos/' + r.id, tema, corpo: `${header('robos')}\n<main>${paginaRobo(r)}</main>\n${footer()}` });
  return out;
}
