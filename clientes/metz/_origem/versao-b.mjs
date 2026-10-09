// Versão B "Executiva": grafite como o site atual, mais sóbria, foto de Christian Metz em destaque.
import { inicio, pilares, diferenciais, solucoes } from './conteudo.mjs';
import { documento, topo, rodape, num, img, faixa, alvo } from './comum.mjs';
import { blocos } from './paginas.mjs';

const V = 'b';
const LOGO = 'logo-claro';

export function versaoB() {
  const { paginas, cta, listaDiferenciais, gradeFerramentas, blocoDepoimento, L } = blocos(V);

  paginas.index = `<section class="hero">
  <figure class="hero-foto">${img('christian', 'Christian Metz, fundador da REM Consultoria Metz', 'loading="eager" fetchpriority="high"')}</figure>
  <div class="in">
    <div class="hero-txt">
      <span class="eyebrow">${inicio.eyebrow}</span>
      <h1>${inicio.titulo}</h1>
      <p class="lead">${inicio.lead}</p>
      <div class="acoes"><a class="btn btn-prim" href="${L('contato')}">Solicitar diagnóstico</a><a class="btn btn-sec" href="${L('solucoes')}">Conhecer as soluções</a></div>
    </div>
  </div>
</section>
<section class="pilares">
  <div class="in">${pilares.map(([t, d], i) => `<div><span class="n">${num(i)}</span><h2>${t}</h2><p>${d}</p></div>`).join('')}</div>
</section>
<section class="secao secao-clara">
  <div class="in empresa">
    <span class="eyebrow">A empresa</span>
    <h2>${inicio.empresaTitulo}</h2>
    <div class="colunas">${inicio.empresaTexto.map(p => `<p>${p}</p>`).join('')}</div>
    <a class="link" href="${L('sobre')}">Conheça a REM</a>
  </div>
</section>
<section class="secao">
  <div class="in">
    <div class="secao-cab"><span class="eyebrow">Soluções</span><h2>Soluções sob medida para o seu negócio</h2><p>${inicio.servicosIntro}</p></div>
    <div class="zig">${solucoes.map((s, i) => `<article>
      <figure class="foto-${s.img}">${img(s.img, s.nome)}</figure>
      <div><span class="n">${num(i)}</span><h3>${s.nome}</h3><p>${s.resumo}</p>
        <div class="acoes"><a class="btn btn-sec" href="${L('solucoes/' + s.slug)}">Saiba mais</a>${s.cta[1] !== 'contato' ? `<a class="link" href="${s.cta[1]}"${alvo(s.cta[1])}>${s.cta[0]}</a>` : ''}</div></div>
    </article>`).join('')}</div>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in">
    <div class="secao-cab"><span class="eyebrow">Metodologia</span><h2>Por que escolher a REM Consultoria Metz</h2><p>${diferenciais.intro}</p></div>
    ${listaDiferenciais()}
    <h3 class="sub-ferr">Ferramentas do Sistema Toyota tratadas pela REM</h3>
    ${gradeFerramentas()}
  </div>
</section>
${blocoDepoimento()}
${cta()}`;

  const saida = {};
  for (const [slug, corpo] of Object.entries(paginas)) {
    saida[slug] = documento({ versao: V, slug, tema: '#14181b', corpo: `${topo({ versao: V, slug, logo: LOGO })}\n<main>\n${corpo}\n</main>\n${rodape({ versao: V, logo: LOGO })}` });
  }
  return saida;
}
