// Versão B "Alumínio": clara e prateada como os banners do site atual (cinza escovado, letra fina e letra forte,
// palavra gigante ao fundo), com seletor de linhas no topo em vez de slider.
import { produtos, banners, sobre, vantagens, metais } from './conteudo.mjs';
import { documento, topo, rodape, img, icone, num, zap } from './comum.mjs';
import { blocos } from './paginas.mjs';

const V = 'b';

export function versaoB() {
  const { paginas, titulo, cta, galeria, L } = blocos(V);

  paginas.index = `<section class="hero-b" data-abas>
  <div class="in">
    ${banners.map((b, i) => `<div class="aba-painel${i === 0 ? ' ativo' : ''}" data-painel="${i}" id="painel-${i}" role="tabpanel">
      <div class="hb-txt">
        <span class="fantasma" aria-hidden="true">${b.fundo}</span>
        ${b.selo ? `<span class="selo">${b.selo}</span>` : ''}
        <${i === 0 ? 'h1' : 'h2'} class="slide-tit">${b.fino ? `<span class="fino">${b.fino}</span> ` : ''}<b>${b.forte}</b>${b.fino2 ? ` <span class="fino">${b.fino2}</span> <b>${b.forte2}</b>` : ''}</${i === 0 ? 'h1' : 'h2'}>
        <p>${b.apoio}</p>
        <div class="acoes"><a class="btn btn-prim" href="${L('contato')}">Solicitar orçamento</a><a class="btn btn-sec" href="${L(b.link)}">Ver produtos</a></div>
      </div>
      <figure class="hb-foto">${img(b.foto, b.alt, i === 0 ? 'loading="eager" fetchpriority="high"' : '')}</figure>
    </div>`).join('')}
    <div class="abas" role="tablist">${['Alumínio', 'Tarugos e vergalhões', 'Moldes', 'Sinterizados'].map((t, i) => `<button role="tab" data-aba="${i}" aria-controls="painel-${i}" aria-selected="${i === 0}"><span>${num(i)}</span>${t}</button>`).join('')}</div>
  </div>
</section>
<section class="secao produtos-b">
  <div class="in">
    ${titulo('Conheça', 'Nossos produtos', 'Quatro linhas para a indústria, do metal cortado sob medida ao molde pronto para produzir.')}
    <div class="bento">${produtos.map((p, i) => `<a class="bt bt-${i + 1}" href="${L(p.slug)}"><div class="bt-txt"><span class="bt-n">${num(i)}</span>${p.novidade ? '<span class="selo">Novidade</span>' : ''}<h3>${p.nome}</h3><p>${p.curto}</p><span class="link">Saiba mais</span></div>${img(i === 2 ? 'molde-circular-recorte' : i === 0 ? 'chapas' : p.foto, p.fotoAlt)}</a>`).join('')}</div>
  </div>
</section>
<section class="vant-b">
  <div class="in">${vantagens.map(([ic, t, d], i) => `<div class="vb"><div class="vb-cab">${icone(ic, 'ic-g')}<span>${num(i)}</span></div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</section>
<section class="secao formatos-b">
  <div class="in">
    ${titulo('Metais sob medida', 'Formatos que cortamos')}
    <ul class="formatos">${metais.formatos.map(([t, ic]) => `<li>${icone(ic, 'ic-f')}<span>${t}</span></li>`).join('')}</ul>
  </div>
</section>
<section class="secao sobre-b">
  <div class="in duas">
    <div>${titulo('Sobre nós', sobre.titulo)}${sobre.textos.map(p => `<p>${p}</p>`).join('')}<a class="btn btn-prim" href="${L('empresa')}">Conheça a empresa</a></div>
    <div class="sobre-mosaico">${img('sede', 'Sede da Alumigroup em Novo Hamburgo')}${img('sede-antiga', 'Prédio da Alumigroup visto da rua')}<div class="selo-anos"><b>+40</b><span>anos com a marca Schmidt</span></div></div>
  </div>
</section>
${cta()}
<section class="secao trabalho">
  <div class="in">
    ${titulo('Nosso trabalho', 'Metais e moldes Alumigroup')}
    ${galeria([['molde-plano-1', 'Molde plano em alumínio'], ['chapa-xadrez', 'Chapa de alumínio xadrez'], ['molde-circular-1', 'Molde circular usinado'], ['disco', 'Disco cortado de tarugo'], ['molde-plano-3', 'Molde plano usinado']], 'g-faixa')}
  </div>
</section>`;

  const saida = {};
  for (const [slug, corpo] of Object.entries(paginas)) {
    saida[slug] = documento({ versao: V, slug, tema: '#e9ebee', corpo: `${topo({ versao: V, slug, claro: true })}\n<main>\n${corpo}\n</main>\n${rodape({ versao: V })}` });
  }
  return saida;
}
