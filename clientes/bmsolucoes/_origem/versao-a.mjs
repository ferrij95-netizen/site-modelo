// Versão A "Distribuidora": azul-marinho da marca em peso, carrossel com os banners do site atual em tela cheia.
import { site, anos, inicio, produtos, obras, laser } from './conteudo.mjs';
import { documento, topo, rodape, num, img, eyebrow, titulo2, botaoZap, seta, ic } from './comum.mjs';
import { blocos } from './paginas.mjs';

const V = 'a';
const LOGO = 'logo-bm-branco';

export function versaoA() {
  const { paginas, cta, diferenciaisHtml, areasHtml, L, P } = blocos(V);

  paginas.index = `<section class="hero" data-carrossel>
  ${inicio.slides.map(([f, olho, t, d, s], i) => `<div class="slide${i === 0 ? ' ativo' : ''}" aria-hidden="${i !== 0}">
    ${img(f, t, `class="slide-fundo"${i === 0 ? ' loading="eager" fetchpriority="high"' : ''}`)}
    <div class="in"><div class="slide-txt">
      ${eyebrow(olho)}
      ${i === 0 ? `<h1>${t}</h1>` : `<h2 class="h1">${t}</h2>`}
      <p class="lead">${d}</p>
      <div class="acoes">${botaoZap('Solicitar orçamento')}<a class="btn btn-claro" href="${L(s)}">Saiba mais</a></div>
    </div></div>
  </div>`).join('\n  ')}
  <div class="car-ctrl in"><button class="car-ant" data-ant aria-label="Banner anterior">‹</button><div class="car-pontos">${inicio.slides.map(([, olho], i) => `<button data-ir="${i}"${i === 0 ? ' class="ativo"' : ''} aria-label="${olho}"><span>${num(i)}</span>${olho}</button>`).join('')}</div><button class="car-prox" data-prox aria-label="Próximo banner">›</button></div>
</section>
<section class="secao especialidades">
  <div class="in">
    <div class="secao-cab centro">${titulo2('Conheça nossas', 'Especialidades')}</div>
    <ul class="esp">${inicio.especialidades.map(([f, t, s]) => `<li><a href="${P(s.replace('produtos/', ''))}"><span class="circ">${img(f, t)}</span><b>${t}</b><i class="mais">Saiba mais ${seta}</i></a></li>`).join('')}</ul>
  </div>
</section>
<section class="quem">
  ${img('sede-aerea', 'Sede da BM Soluções em Aços em Canoas', 'class="quem-fundo"')}
  <div class="in">
    <div class="quem-txt">
      ${titulo2('Desde ' + site.fundacao, 'A BM Soluções em Aços')}
      ${inicio.sobre.map(t => `<p>${t}</p>`).join('')}
      <a class="btn btn-claro" href="${L('sobre')}">Saiba mais sobre nossa história</a>
    </div>
    <ul class="quem-num"><li><b>+${anos - (anos % 5)}</b><span>anos de mercado</span></li><li><b>${produtos.length}</b><span>linhas de produtos</span></li><li><b>1500 x 3000</b><span>mm de mesa de corte a laser</span></li></ul>
  </div>
</section>
<section class="secao secao-dif">
  <div class="in">${diferenciaisHtml('dif-linha')}</div>
</section>
<section class="secao">
  <div class="in">
    <div class="secao-cab">${titulo2('Conheça nossos', 'Produtos')}<p>Distribuidora de aços, chapas e tubos. Fabricante e comerciante de telas para finalidades variadas.</p></div>
    <div class="mosaico-prod">${produtos.map((p, i) => `<a class="mp mp${i + 1}" href="${P(p.slug)}">${img(p.foto, p.nome)}<span class="mp-txt"><small>${num(i)}</small><b>${p.nome}</b><em>${p.resumo}</em></span></a>`).join('')}</div>
  </div>
</section>
<section class="secao secao-areas escura">
  <div class="in">
    <div class="secao-cab centro">${titulo2('Áreas de', 'Atuação')}<p>Aço, corte a laser, telas e conexões para obras e indústrias de diversos setores.</p></div>
    ${areasHtml()}
  </div>
</section>
<section class="secao">
  <div class="in">
    <div class="secao-cab linha">${titulo2('Veja algumas das nossas', 'Obras realizadas')}<a class="link" href="${L('obras')}">Ver todas as obras ${seta}</a></div>
    <div class="obras-faixa">${obras.destaques.map(([f, t]) => `<figure>${img(f, t)}<figcaption>${t}</figcaption></figure>`).join('')}</div>
  </div>
</section>
${cta()}`;

  const saida = {};
  for (const [slug, corpo] of Object.entries(paginas)) {
    saida[slug] = documento({ versao: V, slug, tema: '#114787', corpo: `${topo({ versao: V, slug, logo: LOGO })}\n<main>\n${corpo}\n</main>\n${rodape({ versao: V, logo: LOGO })}` });
  }
  return saida;
}
