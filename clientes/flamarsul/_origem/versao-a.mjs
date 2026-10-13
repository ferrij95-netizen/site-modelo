// Versão A "Rotas": azul do slide atual da home (van, mapa de pontos), mais pesada no azul.
import { diferenciais, institucional, regioes, cidades } from './conteudo.mjs';
import { documento, topo, rodape, img, icone, relogio48, eyebrow, zap, listaNumeros, gradeMarcas, svgZap } from './comum.mjs';
import { blocos } from './paginas.mjs';

const V = 'a';

export function versaoA() {
  const { paginas, cta, L } = blocos(V);

  paginas.index = `<section class="hero">
  <div class="hero-fundo" aria-hidden="true"></div>
  <div class="in">
    <div class="hero-txt">
      ${eyebrow('Distribuidora · Cachoeirinha/RS')}
      <h1>Entrega em até <em>48h</em> no seu negócio</h1>
      <p class="lead">Há mais de 25 anos a Flamarsul leva as marcas que vendem a mais de 8 mil estabelecimentos do Rio Grande do Sul, com mais de 30 rotas de venda e entrega.</p>
      <div class="acoes"><a class="btn btn-prim" href="${L('seja-nosso-cliente')}">Quero ser cliente</a><a class="btn btn-claro" href="${L('produtos')}">Ver as marcas</a></div>
    </div>
    <figure class="hero-van">${img('van', 'Van de entregas com a marca Flamarsul', 'loading="eager" fetchpriority="high"')}</figure>
  </div>
</section>
<section class="difs">
  <div class="in">
    <ul class="difs-lista">${diferenciais.map(([ic, t, d]) => `<li>${ic === 'relogio' ? relogio48() : icone(ic)}<div><h2>${t}</h2><p>${d}</p></div></li>`).join('')}</ul>
  </div>
</section>
<section class="secao inst">
  <div class="in duas">
    <figure class="inst-foto">${img('equipe-2025', 'Equipe Flamarsul reunida em 2025')}<figcaption>Equipe Flamarsul, 2025</figcaption></figure>
    <div class="inst-txt">
      ${eyebrow('A Flamarsul')}
      <h2>Referência entre as distribuidoras do Rio Grande do Sul</h2>
      ${institucional.slice(0, 2).map(p => `<p>${p}</p>`).join('')}
      <p class="inst-frase">${institucional[2]}</p>
      <a class="link" href="${L('empresa')}">Conheça a empresa</a>
    </div>
  </div>
</section>
<section class="secao mapa-home">
  <div class="in duas">
    <div>
      ${eyebrow('Onde estamos')}
      <h2>Do Litoral Norte aos Vales, ${cidades.length} cidades na rota</h2>
      <p>Rotas de venda e entrega que passam por Porto Alegre, Grande Porto Alegre, Vale dos Sinos, Vale do Paranhana e Litoral Norte do RS.</p>
      <ol class="regioes-num">${regioes.map(r => `<li>${r}</li>`).join('')}</ol>
      <a class="btn btn-claro" href="${L('onde-estamos')}">Ver todas as cidades</a>
    </div>
    <figure class="mapa-fig">${img('mapa-rs', 'Mapa do Rio Grande do Sul com a área atendida pela Flamarsul')}</figure>
  </div>
</section>
<section class="faixa-num">
  <div class="in">
    <img class="fn-logo" src="/assets/logo-branco.svg" alt="Flamarsul Distribuidora" width="220" height="55" loading="lazy">
    ${listaNumeros()}
  </div>
</section>
<section class="secao marcas-home">
  <div class="in">
    <div class="secao-cab centro">${eyebrow('Produtos')}<h2>Marcas que a Flamarsul distribui</h2><p>Tabacaria, doces e guloseimas, baralhos e jogos: toda a linha com entrega em até 48h.</p></div>
    ${gradeMarcas(L)}
    <p class="centro"><a class="link" href="${L('produtos')}">Conheça cada marca</a></p>
  </div>
</section>
${cta()}`;

  const saida = {};
  for (const [slug, corpo] of Object.entries(paginas)) {
    saida[slug] = documento({ versao: V, slug, tema: '#003c7b', corpo: `${topo({ versao: V, slug })}\n<main>\n${corpo}\n</main>\n${rodape({ versao: V })}` });
  }
  return saida;
}
