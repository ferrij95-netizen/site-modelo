// Versão A "Industrial": grafite escuro e laranja, foto da sede em tela cheia.
import { inicio, servicos, anos } from './conteudo.mjs';
import { documento, topo, rodape, num, img, eyebrow, marcaV, zap } from './comum.mjs';
import { blocos } from './paginas.mjs';

const V = 'a';
const LOGO = 'logo-vordex-branco';

export function versaoA() {
  const { paginas, cta, icones, L } = blocos(V);
  const loc = servicos.find(s => s.slug === 'locacao-de-equipamentos');
  const ter = servicos.find(s => s.slug === 'terraplanagem');

  paginas.index = `<section class="hero">
  ${img('sede', 'Sede da Vordex em Conselheiro Lafaiete', 'class="hero-fundo" loading="eager" fetchpriority="high"')}
  <div class="in">
    <div class="hero-txt">
      ${eyebrow('Vordex Soluções Industriais')}
      <h1>${inicio.titulo}</h1>
      <p class="lead">${inicio.lead}</p>
      <div class="acoes"><a class="btn btn-prim" href="${zap()}" target="_blank" rel="noopener">Solicitar orçamento</a><a class="btn btn-claro" href="${L('servicos')}">Conhecer os serviços</a></div>
    </div>
  </div>
</section>
<section class="destaques">
  <div class="in">${inicio.destaques.map(([ic, t, d], i) => `<div class="dq"><span class="n">${i === 0 ? '+' + anos : num(i)}</span><h2>${i === 0 ? 'Anos de atuação' : t}</h2><p>${d}</p></div>`).join('')}</div>
</section>
<section class="secao">
  <div class="in">
    <div class="secao-cab centro">${eyebrow('Nossos serviços')}<h2>Quatro frentes, uma só equipe</h2></div>
    <div class="serv-cards">${servicos.map((s, i) => `<a class="sc" href="${L('servicos/' + s.slug)}">
      ${img(s.slug === 'fabricacao-industrial' ? 'planta-escadas' : s.slug === 'manutencao-e-montagem-industrial' ? 'montagem-1' : s.circulo, s.nome)}
      <div><span class="n">${num(i)}</span><h3>${s.nome}</h3><p>${s.resumo}</p><i class="seta" aria-hidden="true">→</i></div></a>`).join('')}</div>
  </div>
</section>
<section class="faixa-missao">
  ${marcaV('fm-v')}
  <div class="in duas">
    <figure>${img('soldador', 'Soldador da Vordex em fabricação')}</figure>
    <div>${eyebrow('Nossa missão')}<blockquote>${inicio.missao}</blockquote><a class="link" href="${L('quem-somos')}">Quem somos</a></div>
  </div>
</section>
<section class="secao secao-alt">
  <div class="in">
    <div class="secao-cab">${eyebrow('Estrutura e operações')}<h2>Estrutura própria para grandes operações</h2><p>Quatro bases próprias, equipe uniformizada e identificada e atendimento 24 horas por dia.</p></div>
    ${icones()}
  </div>
</section>
<section class="secao secao-frota">
  <div class="in">
    <div class="secao-cab">${eyebrow('Frota')}<h2>Equipamentos próprios, prontos para a sua obra</h2><p>${loc.frotaTexto}</p></div>
    <div class="laminas duas-l">${img(ter.laminas[0][0], ter.laminas[0][1])}${img(loc.laminas[1][0], loc.laminas[1][1])}</div>
    <div class="acoes"><a class="link" href="${L('servicos/locacao-de-equipamentos')}">Frota para locação</a><a class="link" href="${L('servicos/terraplanagem')}">Frota de terraplanagem</a></div>
  </div>
</section>
${cta()}`;

  const saida = {};
  for (const [slug, corpo] of Object.entries(paginas)) {
    saida[slug] = documento({ versao: V, slug, tema: '#1c1c1c', corpo: `${topo({ versao: V, slug, logo: LOGO })}\n<main>\n${corpo}\n</main>\n${rodape({ versao: V, logo: LOGO })}` });
  }
  return saida;
}
