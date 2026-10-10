// Versão B "Institucional": branco com o vermelho dos cabeçalhos atuais e as três barras do símbolo como grafismo.
import { diferenciais, institucional, regioes, cidades, etapas, empresa, marcas } from './conteudo.mjs';
import { documento, topo, rodape, img, icone, relogio48, eyebrow, barras, zap, listaNumeros, svgZap, num } from './comum.mjs';
import { blocos } from './paginas.mjs';

const V = 'b';

export function versaoB() {
  const { paginas, cta, L } = blocos(V);

  paginas.index = `<section class="hero">
  <div class="in">
    <div class="hero-txt">
      ${barras('hero-barras')}
      ${eyebrow('Distribuidora em Cachoeirinha/RS')}
      <h1>${empresa.lema}</h1>
      <p class="lead">Empresa familiar com mais de 25 anos, mais de 8 mil clientes, mais de 140 colaboradores e entrega em até 48h na Grande Porto Alegre, nos Vales e no Litoral Norte.</p>
      <div class="acoes"><a class="btn btn-prim" href="${L('seja-nosso-cliente')}">Quero ser cliente</a><a class="btn btn-sec" href="${zap()}" target="_blank" rel="noopener">${svgZap}WhatsApp</a></div>
    </div>
    <figure class="hero-foto">${img('equipe-2025', 'Equipe Flamarsul reunida em 2025', 'loading="eager" fetchpriority="high"')}</figure>
  </div>
</section>
<section class="difs">
  <div class="in">
    <ul class="difs-barras">${diferenciais.map(([ic, t, d], i) => `<li class="db db-${i + 1}">${ic === 'relogio' ? relogio48() : icone(ic)}<div><h2>${t}</h2><p>${d}</p></div></li>`).join('')}</ul>
  </div>
</section>
<section class="secao inst">
  <div class="in duas">
    <div class="inst-txt">
      ${eyebrow('A Flamarsul')}
      <h2>Referência entre as distribuidoras do Rio Grande do Sul</h2>
      ${institucional.slice(0, 2).map(p => `<p>${p}</p>`).join('')}
      <a class="link" href="${L('empresa')}">Conheça a empresa</a>
    </div>
    <div class="inst-fotos">
      <figure class="if1">${img('televendas', 'Equipe de televendas da Flamarsul')}</figure>
      <figure class="if2">${img('frota', 'Frota de veículos da Flamarsul')}</figure>
      <blockquote class="if-frase">${institucional[2]}</blockquote>
    </div>
  </div>
</section>
<section class="secao processo">
  <div class="in">
    <div class="secao-cab">${eyebrow('100% da operação')}<h2>Da venda à entrega, tudo passa pela Flamarsul</h2></div>
    <ol class="trilha">${etapas.map(([t, d], i) => `<li><span class="tr-n">${num(i)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
    <div class="estrada" aria-hidden="true"><span class="estrada-van">${img('van', '')}</span></div>
  </div>
</section>
<section class="secao mapa-home">
  <div class="in duas">
    <figure class="mapa-fig">${img('mapa-rs', 'Mapa do Rio Grande do Sul com a área atendida pela Flamarsul')}</figure>
    <div>
      ${eyebrow('Onde estamos')}
      <h2>${cidades.length} cidades em cinco regiões do RS</h2>
      <ul class="regioes">${regioes.map(r => `<li>${r}</li>`).join('')}</ul>
      <label class="busca"><span class="sr">Buscar cidade</span><input type="search" placeholder="Sua cidade está na rota? Digite aqui" data-busca-cidade autocomplete="off"></label>
      <p class="busca-res" data-busca-res aria-live="polite"></p>
      <ul class="cidades cidades-ocultas" data-cidades>${cidades.map(c => `<li>${c}</li>`).join('')}</ul>
      <a class="link" href="${L('onde-estamos')}">Ver todas as cidades</a>
    </div>
  </div>
</section>
<section class="faixa-num">
  ${barras('fn-barras')}
  <div class="in">${listaNumeros()}</div>
</section>
<section class="secao marcas-home">
  <div class="in">
    <div class="secao-cab">${eyebrow('Produtos')}<h2>As marcas na nossa rota</h2></div>
    <ul class="marcas-linhas">${marcas.map(m => `<li><a href="${L('produtos')}#${m.slug}"><span class="ml-logo">${img('marca-' + m.slug, m.nome)}</span><span class="ml-txt"><b>${m.nome}</b><small>${m.cat}</small></span><i aria-hidden="true">→</i></a></li>`).join('')}</ul>
  </div>
</section>
${cta()}`;

  const saida = {};
  for (const [slug, corpo] of Object.entries(paginas)) {
    saida[slug] = documento({ versao: V, slug, tema: '#c91b27', corpo: `${topo({ versao: V, slug })}\n<main>\n${corpo}\n</main>\n${rodape({ versao: V })}` });
  }
  return saida;
}
