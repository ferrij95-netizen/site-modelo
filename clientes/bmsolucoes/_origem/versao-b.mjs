// Versão B "Técnica": clara como o site atual, com a tela de alambrado ao fundo, o logo grafite metálico e o azul nos destaques.
import { site, anos, inicio, produtos, obras, laser } from './conteudo.mjs';
import { documento, topo, rodape, num, img, eyebrow, titulo2, botaoZap, seta, ic } from './comum.mjs';
import { blocos } from './paginas.mjs';

const V = 'b';
const LOGO = 'logo-bm-grafite';

export function versaoB() {
  const { paginas, cta, diferenciaisHtml, areasHtml, L, P } = blocos(V);

  paginas.index = `<section class="hero">
  <div class="in hero-grade">
    <div class="hero-txt">
      ${eyebrow(`Canoas/RS · desde ${site.fundacao}`)}
      <h1>Aço, corte a laser e telas <span>em um só fornecedor</span></h1>
      <p class="lead">Distribuição de aço carbono e inox, corte a laser, chapas expandidas, conexões e fabricação e instalação de telas.</p>
      <div class="acoes">${botaoZap('Solicitar orçamento')}<a class="btn btn-sec" href="${L('produtos')}">Ver os produtos</a></div>
    </div>
    <div class="hero-fotos" data-carrossel>
      ${inicio.slides.map(([f, olho, t], i) => `<figure class="slide${i === 0 ? ' ativo' : ''}">${img(f, t, i === 0 ? 'loading="eager" fetchpriority="high"' : '')}<figcaption>${olho}</figcaption></figure>`).join('')}
      <div class="car-pontos">${inicio.slides.map(([, olho], i) => `<button data-ir="${i}"${i === 0 ? ' class="ativo"' : ''} aria-label="${olho}"></button>`).join('')}</div>
      <div class="selo"><b>+${anos - (anos % 5)}</b><span>anos de mercado</span></div>
    </div>
  </div>
</section>
<section class="especialidades">
  <div class="in">
    <div class="secao-cab centro">${titulo2('Conheça nossas', 'Especialidades')}</div>
    <ul class="esp">${inicio.especialidades.map(([f, t, s], i) => `<li><a href="${P(s.replace('produtos/', ''))}"><span class="circ">${img(f, t)}</span><small>${num(i)}</small><b>${t}</b></a></li>`).join('')}</ul>
  </div>
</section>
<section class="secao quem">
  <div class="in duas">
    <figure class="quem-foto">${img('sede-outdoor', 'Sede da BM Soluções em Aços, com o outdoor da empresa')}<figcaption>${site.endereco} · ${site.bairro}</figcaption></figure>
    <div class="quem-txt">
      ${titulo2('Somos a', 'BM Soluções em Aços')}
      ${inicio.sobre.map(t => `<p>${t}</p>`).join('')}
      <a class="btn btn-sec" href="${L('sobre')}">Saiba mais sobre nossa história</a>
    </div>
  </div>
</section>
<section class="secao secao-dif">
  <div class="in">${diferenciaisHtml('dif-cartoes')}</div>
</section>
<section class="secao">
  <div class="in prod-lista-home">
    <div class="pl-cab">${titulo2('Conheça nossos', 'Produtos')}<p>A BM Soluções em Aços é uma empresa distribuidora de aços, chapas e tubos. Fabricante e comerciante de telas para finalidades variadas.</p>
      <figure class="pl-foto" data-pl-foto>${produtos.map((p, i) => img(p.foto, p.nome, `data-pl="${i}"${i === 0 ? ' class="ativo"' : ''}`)).join('')}</figure></div>
    <ol class="pl">${produtos.map((p, i) => `<li><a href="${P(p.slug)}" data-pl-ir="${i}"><span class="n">${num(i)}</span><span class="pl-t"><b>${p.nome}</b><em>${p.resumo}</em></span>${seta}</a></li>`).join('')}</ol>
  </div>
</section>
<section class="laser-faixa">
  ${img('laser-feixe', 'Corte a laser', 'class="lf-fundo"')}
  <div class="in duas">
    <div>${titulo2('Precisão e qualidade', 'Corte a laser')}<p>${laser.servicos} Envie o seu arquivo .DXF e receba o orçamento com base no tempo de máquina e no custo do material.</p>
      <div class="acoes">${botaoZap('Enviar meu arquivo', 'btn-prim', 'Olá! Quero enviar um arquivo .DXF para orçamento de corte a laser.')}<a class="btn btn-claro" href="${P('corte-a-laser')}">Saiba mais</a></div></div>
    <ul class="lf-num"><li><b>1500 x 3000</b><span>mm de mesa de corte</span></li><li><b>16 mm</b><span>em aço carbono</span></li><li><b>10 mm</b><span>em aço inox</span></li><li><b>4 mm</b><span>em alumínio</span></li></ul>
  </div>
</section>
<section class="secao">
  <div class="in">
    <div class="secao-cab linha">${titulo2('Veja algumas das nossas', 'Obras realizadas')}<a class="link" href="${L('obras')}">Ver todas as obras ${seta}</a></div>
    <div class="obras-rolo">${[...obras.destaques.map(([f, t]) => [f, t]), ...obras.outras.slice(0, 5).map(f => [f, ''])].map(([f, t]) => `<figure>${img(f, t || 'Obra realizada pela BM')}</figure>`).join('')}</div>
  </div>
</section>
<section class="secao secao-areas">
  <div class="in">
    <div class="secao-cab centro">${titulo2('Áreas de', 'Atuação')}</div>
    ${areasHtml()}
  </div>
</section>
${cta()}`;

  const saida = {};
  for (const [slug, corpo] of Object.entries(paginas)) {
    saida[slug] = documento({ versao: V, slug, tema: '#ffffff', corpo: `${topo({ versao: V, slug, logo: LOGO })}\n<main>\n${corpo}\n</main>\n${rodape({ versao: V, logo: 'logo-bm-branco' })}` });
  }
  return saida;
}
