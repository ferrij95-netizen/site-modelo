// Versão A "Industrial": preto e grafite como o site atual, faixas vermelhas, slider com os quatro banners refeitos.
import { produtos, banners, sobre } from './conteudo.mjs';
import { documento, topo, rodape, img, icone, num } from './comum.mjs';
import { blocos } from './paginas.mjs';

const V = 'a';

export function versaoA() {
  const { paginas, titulo, cta, faixaVantagens, galeria, L } = blocos(V);

  paginas.index = `<section class="hero" data-slider>
  ${banners.map((b, i) => `<div class="slide${i === 0 ? ' ativo' : ''}" data-slide>
    <div class="in">
      <div class="slide-txt">
        <span class="fantasma" aria-hidden="true">${b.fundo}</span>
        ${b.selo ? `<span class="selo">${b.selo}</span>` : ''}
        <${i === 0 ? 'h1' : 'h2'} class="slide-tit">${b.fino ? `<span class="fino">${b.fino}</span> ` : ''}<b>${b.forte}</b>${b.fino2 ? ` <span class="fino">${b.fino2}</span> <b>${b.forte2}</b>` : ''}</${i === 0 ? 'h1' : 'h2'}>
        <p>${b.apoio}</p>
        <div class="acoes"><a class="btn btn-prim" href="${L('contato')}">Solicitar orçamento</a><a class="btn btn-sec" href="${L(b.link)}">Ver produtos</a></div>
      </div>
      <figure class="slide-foto">${img(b.foto, b.alt, i === 0 ? 'loading="eager" fetchpriority="high"' : '')}</figure>
    </div>
  </div>`).join('')}
  <div class="in slider-ctl"><button class="sl-ant" data-ant aria-label="Banner anterior">${icone('seta')}</button><div class="sl-pontos">${banners.map((b, i) => `<button data-ir="${i}" aria-label="Banner ${i + 1}"${i === 0 ? ' aria-current="true"' : ''}><span>${num(i)}</span></button>`).join('')}</div><button class="sl-prox" data-prox aria-label="Próximo banner">${icone('seta')}</button></div>
</section>
<section class="secao produtos-a">
  <div class="in">
    ${titulo('Conheça', 'Nossos produtos')}
    <div class="prod-grade">${produtos.map((p, i) => `<a class="prod" href="${L(p.slug)}">${img(p.foto, p.fotoAlt)}<span class="prod-n">${num(i)}</span>${p.novidade ? '<span class="selo">Novidade</span>' : ''}<div><h3>${p.nome}</h3><p>${p.curto}</p><span class="link">Saiba mais</span></div></a>`).join('')}</div>
  </div>
</section>
${faixaVantagens()}
<section class="secao sobre-a">
  <div class="in duas">
    <figure class="sobre-foto">${img('sede', 'Sede da Alumigroup em Novo Hamburgo')}<figcaption><b>+40</b><span>anos de indústria</span></figcaption></figure>
    <div>${titulo('Sobre nós', sobre.titulo)}${sobre.textos.map(p => `<p>${p}</p>`).join('')}<a class="btn btn-sec" href="${L('empresa')}">Conheça a empresa</a></div>
  </div>
</section>
${cta()}
<section class="secao trabalho">
  <div class="in">
    ${titulo('Nosso trabalho', 'Metais e moldes Alumigroup')}
    ${galeria([['molde-plano-3', 'Molde plano usinado'], ['chapas', 'Chapas de alumínio'], ['molde-circular-2', 'Molde circular na bancada'], ['tarugo', 'Tarugo de alumínio'], ['molde-circular-4', 'Detalhe da gravação do molde']], 'g-faixa')}
  </div>
</section>`;

  const saida = {};
  for (const [slug, corpo] of Object.entries(paginas)) {
    saida[slug] = documento({ versao: V, slug, tema: '#000000', corpo: `${topo({ versao: V, slug })}\n<main>\n${corpo}\n</main>\n${rodape({ versao: V })}` });
  }
  return saida;
}
