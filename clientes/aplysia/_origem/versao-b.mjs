// Versão B, "Campo e Ciência": azul-marinho do logo como cor dominante, fotos de campo e laboratório em destaque,
// segmentos em painéis que se abrem e etapas em ciclo. Mesma ordem de conteúdo do site atual.
import { segmentos, areas, etapas, noticias, clientes } from './conteudo.mjs';
import { T, U, img, icone, num, linkDe, segLink, areaLink, mapaSvg, topo, rodape, documento } from './comum.mjs';
import { internas, numeros } from './paginas.mjs';

const TEMA = '#13284f';

function inicio(lang) {
  const L = linkDe('b', lang);
  return `${topo({ versao: 'b', slug: 'index', lang, logo: 'logo-branco' })}
<main>
<section class="hero-b">
  <div class="in hb-grade">
    <div class="hb-txt"><p class="sobre">APLYSIA · ${T(['Soluções ambientais desde 1997', 'Environmental solutions since 1997'], lang)}</p>
      <h1>${T(['Soluções para a indústria. <em>Respeito com o planeta.</em>', 'Solutions for the industry. <em>Respecting the planet.</em>'], lang)}</h1>
      <p>${T(['Avaliação, monitoramento e licenciamento ambiental com laboratório próprio de ecotoxicologia, acreditado pela ABNT NBR ISO/IEC 17025, para mineração, siderurgia, portos, celulose, óleo e gás.', 'Environmental assessment, monitoring and licensing with an in-house ecotoxicology laboratory, accredited to ABNT NBR ISO/IEC 17025, for mining, steel, ports, pulp, oil and gas.'], lang)}</p>
      <div class="hb-acoes"><a class="btn btn-prim" href="${L('servicos')}">${T(U.conhecaServ, lang)}${icone('seta')}</a><a class="btn btn-linha" href="${L('contato')}">${T(U.fale, lang)}</a></div></div>
    <div class="hb-fotos">
      <figure class="f1">${img('rio-equipe', T(['Equipe da APLYSIA em campo, no leito do rio', 'APLYSIA team in the field, in the riverbed'], lang), 'loading="eager" fetchpriority="high"')}</figure>
      <figure class="f2">${img('lab-2', T(['Coleta de ouriço-do-mar para ensaio', 'Sea urchin collection for testing'], lang), 'loading="eager"')}</figure>
      <figure class="f3">${img('rio-subaquatico', T(['Vista subaquática de rio restaurado', 'Underwater view of a restored river'], lang), 'loading="eager"')}</figure>
    </div>
  </div>
  <div class="in">${numeros(lang)}</div>
</section>

<section class="sec segs-b"><div class="in">
  <div class="tit-sec lado"><div><p class="sobre">${T(U.porSeg, lang)}</p><h2>${T(['Escolha o segmento da sua empresa', 'Choose your company’s segment'], lang)}</h2></div>
    <p class="tit-apoio">${T(['A APLYSIA é especializada em oferecer soluções ambientais para diversas áreas da indústria.', 'APLYSIA is specialized in providing environmental solutions for a number of industrial areas.'], lang)}</p></div>
  <div class="paineis">${segmentos.map((s, i) => `<a class="painel${i === 0 ? ' aberto' : ''}" href="${L(segLink(s))}" style="--seg:${s.cor}">${img(s.foto, T(s.nome, lang))}
    <span class="p-n">${num(i)}</span><div class="p-txt"><h3>${T(s.nome, lang)}</h3><p>${T(s.frase, lang)}</p><span class="p-link">${s.servicos.length} ${T(['serviços', 'services'], lang)}${icone('seta')}</span></div></a>`).join('')}</div>
</div></section>

<section class="areas-b"><div class="in">
  <div class="tit-sec"><p class="sobre">${T(U.porArea, lang)}</p><h2>${T(['Do campo ao laboratório, seis áreas de atuação', 'From the field to the laboratory, six areas of expertise'], lang)}</h2></div>
  <div class="mosaico-areas">${areas.map((a, i) => `<a class="ma ma-${i + 1}" href="${L(areaLink(a))}">${img(a.slug === 'restauro-fluvial' ? 'rio-curso' : a.foto, T(a.nome, lang))}<div><span>${icone(a.icone)}</span><h3>${T(a.nome, lang)}</h3><p>${T(a.resumo, lang)}</p></div></a>`).join('')}</div>
</div></section>

<section class="sec in ciclo-b">
  <div class="ciclo-txt"><p class="sobre">${T(['Como atuamos', 'How we work'], lang)}</p><h2>${T(['Um ciclo completo, do planejamento ao licenciamento', 'A complete cycle, from planning to licensing'], lang)}</h2>
    <p>${T(['Profissionais de engenharia, biologia, oceanografia, geologia e ecologia, com uma rede internacional de consultores, acompanham cada etapa e entregam relatórios gerenciais claros para gestores e órgãos de controle.', 'Engineering, biology, oceanography, geology and ecology professionals, with an international network of consultants, follow every stage and deliver clear management reports for managers and regulatory agencies.'], lang)}</p></div>
  <div class="ciclo">
    <svg class="ciclo-anel" viewBox="0 0 400 400" aria-hidden="true"><defs><linearGradient id="gc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#03acb6"/><stop offset="1" stop-color="#1b2c5b"/></linearGradient></defs><circle cx="200" cy="200" r="150" fill="none" stroke="url(#gc)" stroke-width="2" stroke-dasharray="4 8"/><path d="M200 50a150 150 0 0 1 150 150" fill="none" stroke="#03acb6" stroke-width="3" stroke-linecap="round"/></svg>
    ${img('emblema', '', 'class="ciclo-centro"')}
    ${etapas.map(([t, d], i) => `<div class="no no-${i + 1}"><span>${num(i)}</span><h3>${T(t, lang)}</h3><p>${T(d, lang)}</p></div>`).join('')}
  </div>
</section>

<section class="fronteiras-b"><div class="in">
  <div class="frb-txt"><p class="sobre">${T(['Soluções que atravessam fronteiras', 'Solutions that cross borders'], lang)}</p>
    <h2>${T(['Por que a sua empresa pode confiar na APLYSIA?', 'Why should your company rely on APLYSIA?'], lang)}</h2>
    <p>${T(['A APLYSIA possui um quadro de profissionais altamente qualificados, além de uma rede internacional de consultores e parceiros especializados, para planejar, monitorar, avaliar e licenciar atividades industriais, de dragagem, de gestão ambiental hídrica e de solos, entre outros.', 'APLYSIA has a highly qualified team, as well as an international network of specialized consultants and partners, to plan, monitor, assess and license industrial and dredging activities, water and soil environmental management, among others.'], lang)}</p>
    <p class="frb-forte">${T(['Relação de confiança com empresas de 15 estados brasileiros e de diversos países.', 'A relation of confidence with companies in 15 states in Brazil and in a number of countries.'], lang)}</p></div>
  ${mapaSvg(lang, 'mapa mapa-b')}
</div></section>

<section class="duplas-b"><div class="in">
  <a class="dupla" href="${L('servicos/ecotoxicologia')}">${img('lab-3', T(['Análise ao microscópio no laboratório', 'Microscope analysis in the laboratory'], lang))}<div><p class="sobre">${T(['Laboratório de Ecotoxicologia', 'Ecotoxicology Laboratory'], lang)}</p><h2>${T(['O maior número de ensaios acreditados no Brasil', 'The largest number of accredited tests in Brazil'], lang)}</h2><p>${T(['Testes de toxicidade de efluentes, produtos químicos, água e sedimento, acreditados pela ABNT NBR ISO/IEC 17025.', 'Toxicity tests of effluents, chemicals, water and sediment, accredited to ABNT NBR ISO/IEC 17025.'], lang)}</p><span class="p-link">${T(U.saibaMais, lang)}${icone('seta')}</span></div></a>
  <a class="dupla" href="${L('servicos/restauro-fluvial')}">${img('rio-floresta', T(['Rio com mata ciliar recuperada', 'River with restored riparian forest'], lang))}<div><p class="sobre">${T(['Restauro fluvial', 'River restoration'], lang)}</p><h2>ReNaturalize</h2><p>${T(['Renaturalização de córregos e rios premiada no BRICS Solutions for SDGs Awards, no Prêmio Hugo Werneck e no Prêmio Ecologia.', 'Stream and river renaturalization awarded at the BRICS Solutions for SDGs Awards, the Hugo Werneck Award and the Ecology Award.'], lang)}</p><span class="p-link">${T(U.saibaMais, lang)}${icone('seta')}</span></div></a>
</div></section>

<section class="sec clientes-b"><div class="in">
  <div class="tit-sec lado"><div><p class="sobre">${T(U.clientes, lang)}</p><h2>${T(['Quem confia na APLYSIA', 'Who trusts APLYSIA'], lang)}</h2></div><a class="link-seta" href="${L('clientes')}">${T(['Ver todos os clientes', 'See all customers'], lang)}${icone('seta')}</a></div>
  <ul class="logos logos-b">${clientes.slice(0, 12).map(([f, n]) => `<li>${img('clientes/' + f, n, 'width="360" height="200"')}</li>`).join('')}</ul>
</div></section>

<section class="sec-alt noticias-b"><div class="in">
  <div class="tit-sec lado"><div><p class="sobre">${T(U.noticias, lang)}</p><h2>${T(U.ultimas, lang)}</h2></div><a class="link-seta" href="${L('noticias')}">${T(U.todasNoticias, lang)}${icone('seta')}</a></div>
  <div class="nb-grade">
    ${(n => `<article class="nb-dest"><a href="${n[4]}" target="_blank" rel="noopener">${img(n[3], '')}<div><time datetime="${n[0]}">${new Date(n[0] + 'T12:00').toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</time><h3>${T(n[1], lang)}</h3><p>${T(n[2], lang)}</p></div></a></article>`)(noticias[0])}
    <ul class="nb-lista">${noticias.slice(1, 5).map(n => `<li><a href="${n[4]}" target="_blank" rel="noopener">${n[0] ? `<time datetime="${n[0]}">${new Date(n[0] + 'T12:00').toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</time>` : ''}<span>${T(n[1], lang)}</span></a></li>`).join('')}</ul>
  </div>
</div></section>

<section class="faixa-cta"><div class="in">
  <div><h2>${T(['Vamos conversar sobre o desafio ambiental da sua empresa?', 'Shall we talk about your company’s environmental challenge?'], lang)}</h2><p>${T(['Soluções em Ecotoxicologia: (27) 3337-4877 · Laboratório: (27) 3068-5109', 'Ecotoxicology Solutions: +55 27 3337-4877 · Laboratory: +55 27 3068-5109'], lang)}</p></div>
  <div class="cta-acoes"><a class="btn btn-prim" href="${L('contato')}">${T(U.fale, lang)}</a><a class="btn btn-claro" href="https://wa.me/5527998394839" target="_blank" rel="noopener">${icone('zap')}(27) 99839-4839</a></div>
</div></section>
</main>
${rodape({ versao: 'b', slug: 'index', lang })}`;
}

export function versaoB() {
  const out = {};
  for (const lang of ['pt', 'en']) {
    const pref = lang === 'en' ? 'en/' : '';
    out[pref + 'index'] = documento({ versao: 'b', slug: 'index', lang, tema: TEMA,
      titulo: T(['APLYSIA · Soluções ambientais para a indústria', 'APLYSIA · Environmental solutions for industry'], lang),
      desc: T(['Avaliação, monitoramento, licenciamento ambiental e laboratório de ecotoxicologia acreditado ISO/IEC 17025 para mineração, siderurgia, portos, celulose, óleo e gás. Desde 1997.', 'Environmental assessment, monitoring, licensing and an ISO/IEC 17025 accredited ecotoxicology laboratory for mining, steel, ports, pulp, oil and gas. Since 1997.'], lang),
      corpo: inicio(lang) });
    for (const [slug, pg] of Object.entries(internas('b', lang))) {
      out[pref + slug] = documento({ versao: 'b', slug, lang, tema: TEMA, titulo: pg.titulo, desc: pg.desc,
        corpo: `${topo({ versao: 'b', slug, lang, logo: 'logo-branco' })}\n<main>\n${pg.corpo}\n</main>\n${rodape({ versao: 'b', slug, lang })}` });
    }
  }
  return out;
}
