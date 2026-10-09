// Versão A "Institucional": clara, papel e grafite, as três cores do logo só como assinatura.
import { inicio, pilares, diferenciais } from './conteudo.mjs';
import { documento, topo, rodape, num, img, faixa } from './comum.mjs';
import { blocos } from './paginas.mjs';

const V = 'a';
const LOGO = 'logo-escuro';

export function versaoA() {
  const { paginas, cta, cartoesSolucoes, listaDiferenciais, blocoDepoimento, L } = blocos(V);

  paginas.index = `<section class="hero">
  <div class="in">
    <div class="hero-txt">
      ${faixa()}<span class="eyebrow">${inicio.eyebrow}</span>
      <h1>${inicio.titulo}</h1>
      <p class="lead">${inicio.lead}</p>
      <div class="acoes"><a class="btn btn-prim" href="${L('contato')}">Solicitar diagnóstico</a><a class="btn btn-sec" href="${L('solucoes')}">Conhecer as soluções</a></div>
    </div>
    <figure class="hero-foto">${img('retrato', 'Christian Metz, fundador da REM Consultoria Metz', 'loading="eager" fetchpriority="high"')}<figcaption><b>Christian Metz</b>Fundador da REM Consultoria Metz</figcaption></figure>
  </div>
</section>
<section class="pilares">
  <div class="in">${pilares.map(([t, d], i) => `<div><span class="n">${num(i)}</span><h2>${t}</h2><p>${d}</p></div>`).join('')}</div>
</section>
<section class="secao">
  <div class="in duas empresa">
    <div><span class="eyebrow">A empresa</span><h2>${inicio.empresaTitulo}</h2></div>
    <div class="texto">${inicio.empresaTexto.map(p => `<p>${p}</p>`).join('')}<a class="link" href="${L('sobre')}">Conheça a REM</a></div>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in">
    <div class="secao-cab"><span class="eyebrow">Soluções</span><h2>Soluções sob medida para o seu negócio</h2><p>${inicio.servicosIntro}</p></div>
    ${cartoesSolucoes()}
  </div>
</section>
<section class="secao">
  <div class="in duas">
    <div class="secao-cab"><span class="eyebrow">Metodologia</span><h2>Por que escolher a REM Consultoria Metz</h2><p>${diferenciais.intro}</p><a class="link" href="${L('metodologia')}">Ver a metodologia</a></div>
    ${listaDiferenciais()}
  </div>
</section>
${blocoDepoimento()}
${cta()}`;

  const saida = {};
  for (const [slug, corpo] of Object.entries(paginas)) {
    saida[slug] = documento({ versao: V, slug, tema: '#ffffff', corpo: `${topo({ versao: V, slug, logo: LOGO })}\n<main>\n${corpo}\n</main>\n${rodape({ versao: V, logo: LOGO })}` });
  }
  return saida;
}
