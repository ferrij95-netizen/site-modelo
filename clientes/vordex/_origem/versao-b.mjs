// Versão B "Apresentação": clara como o site e a apresentação atuais, títulos com "//", fotos com moldura laranja.
import { inicio, servicos } from './conteudo.mjs';
import { documento, topo, rodape, img, eyebrow, marcaV, zap } from './comum.mjs';
import { blocos } from './paginas.mjs';

const V = 'b';
const LOGO = 'logo-vordex';

export function versaoB() {
  const { paginas, cta, circulos, icones, L } = blocos(V);
  const ter = servicos.find(s => s.slug === 'terraplanagem');
  const loc = servicos.find(s => s.slug === 'locacao-de-equipamentos');

  paginas.index = `<section class="hero">
  ${marcaV('hero-v')}
  <div class="in">
    <div class="hero-txt">
      ${eyebrow('Vordex Soluções Industriais')}
      <h1>${inicio.titulo}</h1>
      <p class="lead">${inicio.lead}</p>
      <div class="acoes"><a class="btn btn-prim" href="${zap()}" target="_blank" rel="noopener">Solicitar orçamento</a><a class="btn btn-sec" href="${L('servicos')}">Conhecer os serviços</a></div>
    </div>
    <div class="hero-fotos">
      <figure class="f1">${img('planta-escadas', 'Estrutura metálica montada em planta de mineração', 'loading="eager" fetchpriority="high"')}</figure>
      <figure class="f2">${img('fab-cabine', 'Cabine metálica fabricada pela Vordex', 'loading="eager"')}</figure>
      <figure class="f3">${img('montagem-4', 'Equipe Vordex em montagem', 'loading="eager"')}</figure>
    </div>
  </div>
</section>
<section class="destaques">
  <div class="in">${inicio.destaques.map(([ic, t, d]) => `<div class="dq">${img(ic, t, 'width="150" height="150"')}<p>${d}</p></div>`).join('')}</div>
</section>
<section class="secao secao-alt">
  <div class="in">
    <div class="secao-cab centro">${eyebrow('Serviços')}<h2>O que fazemos</h2></div>
    ${circulos()}
  </div>
</section>
<section class="sede-faixa">
  ${img('sede', 'Sede da Vordex no polo industrial de Conselheiro Lafaiete')}
  <div class="in"><div class="sf-caixa">${eyebrow('Nossa missão')}<blockquote>${inicio.missao}</blockquote><a class="link" href="${L('quem-somos')}">Conheça a Vordex</a></div></div>
</section>
<section class="secao">
  <div class="in">
    <div class="secao-cab">${eyebrow('Estrutura e operações')}<h2>Estrutura própria para grandes operações</h2><p>Quatro bases próprias, equipe uniformizada e identificada e atendimento 24 horas por dia.</p></div>
    ${icones()}
  </div>
</section>
<section class="secao secao-frota">
  <div class="in">
    <div class="secao-cab">${eyebrow('Alguns equipamentos que utilizamos em sua obra')}<h2>Frota própria</h2><p>${loc.frotaTexto}</p></div>
    <div class="laminas duas-l">${img(ter.laminas[0][0], ter.laminas[0][1])}${img(loc.laminas[1][0], loc.laminas[1][1])}</div>
  </div>
</section>
${cta()}`;

  const saida = {};
  for (const [slug, corpo] of Object.entries(paginas)) {
    saida[slug] = documento({ versao: V, slug, tema: '#ffffff', corpo: `${topo({ versao: V, slug, logo: LOGO })}\n<main>\n${corpo}\n</main>\n${rodape({ versao: V, logo: 'logo-vordex-branco' })}` });
  }
  return saida;
}
