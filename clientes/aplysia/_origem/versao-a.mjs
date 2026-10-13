// Versão A, "Institucional": fiel ao site atual (logo no cartão branco, cartões coloridos por segmento,
// faixa azul com o mapa), em visual mais limpo. Página inicial longa com rolagem, na mesma ordem do site atual.
import { segmentos, areas, etapas, premios, noticias, clientes } from './conteudo.mjs';
import { T, U, img, icone, num, linkDe, segLink, areaLink, mapaSvg, topo, rodape, documento } from './comum.mjs';
import { internas } from './paginas.mjs';

const TEMA = '#194e70';

function inicio(lang) {
  const L = linkDe('a', lang);
  const slides = [
    ['rio-equipe', 'center 45%', ['APLYSIA Soluções Ambientais', 'APLYSIA Environmental Solutions'], ['Soluções para a indústria. <span>Respeito com o planeta.</span>', 'Solutions for the industry. <span>Respecting the planet.</span>'], ['Avaliação, monitoramento, licenciamento e laboratório próprio de ecotoxicologia, desde 1997.', 'Assessment, monitoring, licensing and an in-house ecotoxicology laboratory, since 1997.'], ['servicos', U.conhecaServ]],
    ['lab-1', 'center 35%', ['Laboratório de Ecotoxicologia APLYSIA', 'APLYSIA Ecotoxicology Laboratory'], ['O maior número de ensaios <span>acreditados no Brasil.</span>', 'The largest number of <span>accredited tests in Brazil.</span>'], ['Acreditado pela ABNT NBR ISO/IEC 17025. Entre em contato conosco.', 'Accredited to ABNT NBR ISO/IEC 17025. Get in touch with us.'], ['servicos/ecotoxicologia', U.saibaMais]],
    ['rio-curso', 'center 55%', ['ReNaturalize', 'ReNaturalize'], ['Criando as condições para a natureza <span>seguir o seu roteiro.</span>', 'Creating the conditions for nature <span>to follow its script.</span>'], ['Método de renaturalização de rios premiado no BRICS Solutions for SDGs Awards.', 'River renaturalization method awarded at the BRICS Solutions for SDGs Awards.'], ['servicos/restauro-fluvial', U.saibaMais]],
  ];
  return `${topo({ versao: 'a', slug: 'index', lang })}
<main>
<section class="hero" data-slider>
  ${slides.map(([f, pos, sobre, tit, txt, [s, b]], i) => `<div class="slide${i === 0 ? ' ativo' : ''}">${img(f, '', `style="object-position:${pos}"${i === 0 ? ' loading="eager" fetchpriority="high"' : ''}`)}
    <div class="in slide-txt"><p class="sobre">${T(sobre, lang)}</p>${i === 0 ? '<h1>' : '<h2>'}${T(tit, lang)}${i === 0 ? '</h1>' : '</h2>'}<p>${T(txt, lang)}</p><a class="btn btn-prim" href="${L(s)}">${T(b, lang)}${icone('seta')}</a></div></div>`).join('')}
  <div class="pontos-slider in">${slides.map((_, i) => `<button aria-label="${i + 1}"${i === 0 ? ' aria-current="true"' : ''}></button>`).join('')}</div>
</section>

<section class="sec segmentos-home">
  <div class="in">
    <div class="tit-centro"><h2>${T(['Soluções para a indústria. <span>Respeito com o planeta.</span>', 'Solutions for the industry. <span>Respecting the planet.</span>'], lang)}</h2>
      <p>${T(['A APLYSIA é <b>especializada em oferecer soluções ambientais</b> para diversas áreas da indústria. Clique nas opções abaixo e conheça um pouco mais sobre nossos serviços.', 'APLYSIA is <b>specialized in providing environmental solutions</b> for a number of industrial areas. Click on the options below and find out a little more about our services.'], lang)}</p></div>
    <div class="seg-cards">${segmentos.map(s => `<a class="seg-card" href="${L(segLink(s))}" style="--seg:${s.cor}">${img(s.foto, T(s.nome, lang))}<div class="seg-rot"><h3>${T(s.nome, lang)}</h3><p>${T(s.frase, lang)}</p><span>${T(U.conhecaServ, lang)}${icone('seta')}</span></div></a>`).join('')}</div>
  </div>
</section>

<section class="sec-alt areas-home"><div class="in">
  <div class="tit-sec lado"><div><p class="sobre">${T(U.porArea, lang)}</p><h2>${T(['Seis áreas de atuação, uma mesma equipe técnica', 'Six areas of expertise, one technical team'], lang)}</h2></div>
    <a class="link-seta" href="${L('servicos')}">${T(U.verTodos, lang)}${icone('seta')}</a></div>
  <ul class="areas-lista">${areas.map((a, i) => `<li><a href="${L(areaLink(a))}"><span class="ic-caixa">${icone(a.icone)}</span><span class="n">${num(i)}</span><h3>${T(a.nome, lang)}</h3><p>${T(a.resumo, lang)}</p>${icone('seta', 'ic seta')}</a></li>`).join('')}</ul>
</div></section>

<section class="sec in etapas-home">
  <div class="tit-centro"><p class="sobre">${T(['Como atuamos', 'How we work'], lang)}</p><h2>${T(['Planejar, monitorar, avaliar e licenciar', 'Plan, monitor, assess and license'], lang)}</h2>
    <p>${T(['Engenharia, biologia, oceanografia, geologia e ecologia no mesmo projeto, com uma rede internacional de consultores e parceiros.', 'Engineering, biology, oceanography, geology and ecology in the same project, with an international network of consultants and partners.'], lang)}</p></div>
  <ol class="trilha">${etapas.map(([t, d], i) => `<li><span class="marco">${num(i)}</span><h3>${T(t, lang)}</h3><p>${T(d, lang)}</p></li>`).join('')}</ol>
</section>

<section class="fronteiras"><div class="in">
  <h2>${T(['Soluções que <b>atravessam fronteiras</b>', 'Solutions that <b>cross borders</b>'], lang)}</h2>
  <div class="fr-grade">
    ${mapaSvg(lang)}
    <div class="fr-txt"><h3>${T(['Por que a sua empresa pode confiar na APLYSIA?', 'Why should your company rely on APLYSIA?'], lang)}</h3>
      <p>${T(['A APLYSIA possui um quadro de profissionais altamente qualificados, além de uma rede internacional de consultores e parceiros especializados, para planejar, monitorar, avaliar e licenciar atividades industriais, de dragagem, de gestão ambiental hídrica e de solos, entre outros.', 'APLYSIA has a highly qualified team, as well as an international network of specialized consultants and partners, to plan, monitor, assess and license industrial and dredging activities, water and soil environmental management, among others.'], lang)}</p>
      <p><b>${T(['A APLYSIA tem relação de confiança com empresas de 15 estados brasileiros e de diversos países.', 'APLYSIA enjoys a relation of confidence with companies in 15 states in Brazil and in a number of countries.'], lang)}</b> ${T(['Oferecemos diferentes soluções, mas com algo em comum: a excelência.', 'We provide different solutions, but with one thing in common: excellence.'], lang)}</p>
      <ul class="fr-num"><li><b>15</b>${T(U.estados, lang)}</li><li><b>10</b>${T(['países no mapa de atuação', 'countries on our map'], lang)}</li><li><b>1997</b>${T(['início das atividades', 'year founded'], lang)}</li></ul>
    </div>
  </div>
</div></section>

<section class="sec in lab-home">
  <div class="lab-fotos">${img('lab-1', T(['Equipe no Laboratório de Ecotoxicologia', 'Team at the Ecotoxicology Laboratory'], lang), 'class="lf-1"')}${img('lab-3', T(['Análise ao microscópio', 'Microscope analysis'], lang), 'class="lf-2"')}</div>
  <div class="lab-txt"><p class="sobre">${T(['Laboratório de Ecotoxicologia', 'Ecotoxicology Laboratory'], lang)}</p>
    <h2>${T(['Ensaios acreditados para saber, com segurança, se há toxicidade.', 'Accredited tests to know, with confidence, whether there is toxicity.'], lang)}</h2>
    <p>${T(['Deseja saber se o efluente produzido por uma empresa é tóxico, conhecer o grau de toxicidade de um produto químico ou ainda descobrir se água ou sedimento estão contaminados? Tudo isso é possível por meio de testes de toxicidade específicos realizados pela APLYSIA.', 'Do you want to know whether an effluent is toxic, how toxic a chemical product is, or whether water or sediment is contaminated? All of this is possible through specific toxicity tests performed by APLYSIA.'], lang)}</p>
    <div class="selo-lab">${img('certificado', 'ABNT NBR ISO/IEC 17025, CRL 0420', 'width="73" height="120"')}<div><b>ABNT NBR ISO/IEC 17025</b><p>${T(['Reavaliação concluída em 2025: o laboratório mantém o maior número de ensaios acreditados no Brasil.', 'Reassessment completed in 2025: the laboratory keeps the largest number of accredited tests in Brazil.'], lang)}</p></div></div>
    <a class="btn btn-prim" href="${L('servicos/ecotoxicologia')}">${T(['Conhecer o laboratório', 'Visit the laboratory'], lang)}${icone('seta')}</a></div>
</section>

<section class="renaturalize"><div class="in">
  <div class="rn-txt"><p class="sobre">${T(['Restauro fluvial', 'River restoration'], lang)}</p>
    <h2>ReNaturalize</h2>
    <p>${T(['A APLYSIA desenvolve e aplica técnicas de renaturalização de córregos e rios, com ganhos relevantes na redução dos sedimentos, no controle de enchentes e na restauração da biota local.', 'APLYSIA develops and applies stream and river renaturalization techniques, with significant gains in sediment reduction, flood control and restoration of the local biota.'], lang)}</p>
    <ul class="rn-premios">${premios.filter(x => /ReNaturalize|river restoration/i.test(x[3][1])).slice(0, 4).map(([ano, nome]) => `<li><span>${ano}</span>${T(nome, lang)}</li>`).join('')}</ul>
    <a class="btn btn-claro" href="${L('servicos/restauro-fluvial')}">${T(['Ver o projeto', 'See the project'], lang)}${icone('seta')}</a></div>
  <div class="rn-mosaico">${img('rio-trabalho', T(['Equipe instalando estruturas no rio', 'Team installing structures in the river'], lang))}${img('rio-peixe', T(['Peixe em trecho renaturalizado', 'Fish in a renaturalized stretch'], lang))}${img('rio-floresta', T(['Rio com mata ciliar recuperada', 'River with restored riparian forest'], lang))}</div>
</div></section>

<section class="sec clientes-home"><div class="in">
  <div class="tit-sec lado"><div><p class="sobre">${T(U.clientes, lang)}</p><h2>${T(['Empresas que confiam na APLYSIA', 'Companies that trust APLYSIA'], lang)}</h2></div><a class="link-seta" href="${L('clientes')}">${T(['Ver todos os clientes', 'See all customers'], lang)}${icone('seta')}</a></div>
  <div class="esteira"><ul>${[...clientes.slice(0, 18), ...clientes.slice(0, 18)].map(([f, n], i) => `<li${i >= 18 ? ' aria-hidden="true"' : ''}>${img('clientes/' + f, n, 'width="360" height="200"').replace('loading="lazy"', 'loading="eager"')}</li>`).join('')}</ul></div>
</div></section>

<section class="sec-alt noticias-home"><div class="in">
  <div class="tit-sec lado"><div><p class="sobre">${T(U.noticias, lang)}</p><h2>${T(U.ultimas, lang)}</h2></div><a class="link-seta" href="${L('noticias')}">${T(U.todasNoticias, lang)}${icone('seta')}</a></div>
  <div class="not-grade">${noticias.slice(0, 3).map(n => `<article class="noticia"><a href="${n[4]}" target="_blank" rel="noopener">${img(n[3], '')}<div><time datetime="${n[0]}">${new Date(n[0] + 'T12:00').toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}</time><h3>${T(n[1], lang)}</h3></div></a></article>`).join('')}</div>
</div></section>

<section class="faixa-cta"><div class="in">
  <div><h2>${T(['Entre em contato conosco', 'Contact us'], lang)}</h2><p>${T(['Soluções em Ecotoxicologia: (27) 3337-4877 · Laboratório: (27) 3068-5109', 'Ecotoxicology Solutions: +55 27 3337-4877 · Laboratory: +55 27 3068-5109'], lang)}</p></div>
  <div class="cta-acoes"><a class="btn btn-prim" href="${L('contato')}">${T(U.fale, lang)}</a><a class="btn btn-claro" href="https://wa.me/5527998394839" target="_blank" rel="noopener">${icone('zap')}(27) 99839-4839</a></div>
</div></section>
</main>
${rodape({ versao: 'a', slug: 'index', lang })}`;
}

export function versaoA() {
  const out = {};
  for (const lang of ['pt', 'en']) {
    const pref = lang === 'en' ? 'en/' : '';
    out[pref + 'index'] = documento({ versao: 'a', slug: 'index', lang, tema: TEMA,
      titulo: T(['APLYSIA · Soluções ambientais para a indústria', 'APLYSIA · Environmental solutions for industry'], lang),
      desc: T(['Avaliação, monitoramento, licenciamento ambiental e laboratório de ecotoxicologia acreditado ISO/IEC 17025 para mineração, siderurgia, portos, celulose, óleo e gás. Desde 1997.', 'Environmental assessment, monitoring, licensing and an ISO/IEC 17025 accredited ecotoxicology laboratory for mining, steel, ports, pulp, oil and gas. Since 1997.'], lang),
      corpo: inicio(lang) });
    for (const [slug, pg] of Object.entries(internas('a', lang))) {
      out[pref + slug] = documento({ versao: 'a', slug, lang, tema: TEMA, titulo: pg.titulo, desc: pg.desc,
        corpo: `${topo({ versao: 'a', slug, lang })}\n<main>\n${pg.corpo}\n</main>\n${rodape({ versao: 'a', slug, lang })}` });
    }
  }
  return out;
}
