// Elipal Silos e Secadores (Palmares do Sul/RS, desde 1979): silos secadores, secadores de coluna, máquinas de limpeza de grãos, projetos especiais e assistência técnica.
// node clientes/elipal/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs elipal https://elipal.com.br/)
// Textos e fotos do site atual em tamanho original (wp-json/media): parques de silos, fábrica, assistência e as máquinas.
// Logo: SVG original do selo 40 anos; a versão branca só troca o grafite por branco.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));

const E = {
  nome: 'Elipal', legal: 'Elipal Silos e Secadores', url: 'https://elipal.overtus.com.br/', antigo: 'https://elipal.com.br/',
  fone: '(51) 3668-1333', foneHref: 'tel:+555136681333', cel: '(51) 99975-2780',
  wa: 'https://api.whatsapp.com/send?phone=5551999752780',
  end: 'Rua Álvaro Alves Camargo, 996, Centro', cidade: 'Palmares do Sul/RS', cep: '95540-000',
};
const ext = 'target="_blank" rel="noopener"';

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const foto = (n, alt, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}"${cls ? ` class="${cls}"` : ''}>${img(n, alt)}</a>`;
const checks = l => `<ul class="checks">${l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'silos-secadores', n: 'Silos secadores' },
  { slug: 'secadores-de-coluna', n: 'Secadores de coluna' },
  { slug: 'maquinas-de-limpeza', n: 'Máquinas de limpeza' },
  { slug: 'projetos-especiais', n: 'Projetos' },
  { slug: 'servicos', n: 'Assistência' },
  { slug: 'empresa', n: 'A Elipal' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Armazenagem', b: 'Você plantou' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Open+Sans:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Elipal | Silos e secadores de grãos desde 1979' : `${titulo} | Elipal Silos e Secadores`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#c22b1e' });
const marca = (branco) => `<img class="logo" src="/assets/logo${branco ? '-branco' : ''}.svg" alt="Elipal Silos e Secadores, 40 anos" width="160" height="68">`;

function topo(v, slug) {
  return `<header class="topo${v === 'b' ? ' topo-b' : ''}">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Você plantou, você escolhe quando vender.</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="${E.wa}" ${ext}>${icWa()}${E.cel}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Elipal, página inicial">${marca(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca"><span class="marca">${marca(true)}</span>
      <p>Uma empresa gaúcha oferecendo soluções em sistemas de armazenagem de grãos desde 1979. Unidade fabril em Palmares do Sul/RS.</p></div>
    <div><h3>Equipamentos</h3><ul>
      <li><a href="${link(v, 'silos-secadores')}">Silos secadores</a></li>
      <li><a href="${link(v, 'secadores-de-coluna')}">Secadores de coluna</a></li>
      <li><a href="${link(v, 'maquinas-de-limpeza')}">Máquinas de limpeza</a></li>
      <li><a href="${link(v, 'projetos-especiais')}">Projetos especiais</a></li></ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${icWa()}<a href="${E.wa}" ${ext}>${E.cel} (assistência)</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}, ${E.cep}</span></li>
    </ul></div>
    <div><h3>Atendimento</h3><ul>
      <li>Seg. a sex.: 7h às 12h e 13h30 às 17h30</li>
      <li><a href="${link(v, 'servicos')}">Assistência e peças</a></li>
      <li><a href="${link(v, 'empresa')}">A Elipal</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Palmares do Sul/RS</span></div>
</footer>
<a class="wa-flutua" href="${E.wa}" ${ext} aria-label="WhatsApp da Elipal">${icWa()}</a>
</body>
</html>`;
}

const numeros = () => `<ul class="numeros4">
  <li class="sobe"><b>40+</b><span>anos de tradição e confiança</span></li>
  <li class="sobe"><b>18 mi+</b><span>sacas em capacidade de armazenagem</span></li>
  <li class="sobe"><b>1.300+</b><span>silos implantados</span></li>
  <li class="sobe"><b>1 mi+</b><span>toneladas em armazenagem</span></li>
</ul>`;
const linha = v => `<ul class="linhas4">
  <li class="sobe"><a href="${link(v, 'silos-secadores')}"><span class="l-img" style="grid-template-columns:1fr">${img('silo-campo', 'Silo secador Elipal', ' style="aspect-ratio:16/10;object-fit:cover"')}</span><span class="l-txt"><b>Silos secadores</b><span>Armazenagem segura, durável e de baixo custo de instalação e operação.</span><i>Ver silos ${ic('seta')}</i></span></a></li>
  <li class="sobe"><a href="${link(v, 'secadores-de-coluna')}"><span class="l-img" style="grid-template-columns:1fr">${img('secador-campo', 'Secador de coluna Elipal', ' style="aspect-ratio:16/10;object-fit:cover"')}</span><span class="l-txt"><b>Secadores de coluna</b><span>Secagem contínua de soja, arroz, milho e trigo, com economia de energia.</span><i>Ver secadores ${ic('seta')}</i></span></a></li>
  <li class="sobe"><a href="${link(v, 'maquinas-de-limpeza')}"><span class="l-img" style="grid-template-columns:1fr">${img('epl-45', 'Máquina de limpeza EPL 45', ' style="aspect-ratio:16/10;object-fit:contain"')}</span><span class="l-txt"><b>Máquinas de limpeza</b><span>Peneiras EPL 30 e EPL 45 com quatro tipos de separação.</span><i>Ver máquinas ${ic('seta')}</i></span></a></li>
  <li class="sobe"><a href="${link(v, 'projetos-especiais')}"><span class="l-img" style="grid-template-columns:1fr">${img('solucao', 'Projeto em 3D de unidade armazenadora Elipal', ' style="aspect-ratio:16/10;object-fit:cover"')}</span><span class="l-txt"><b>Projetos especiais</b><span>Unidades armazenadoras sob medida, projetadas em 3D e montadas por equipe própria.</span><i>Ver projetos ${ic('seta')}</i></span></a></li>
</ul>`;
const diferenciais = () => checks([
  'Projetos personalizados para cada produtor, adaptando espaços existentes ou idealizando a obra inteira',
  'Equipe própria em todas as etapas do processo',
  'Assistência técnica regionalizada, perto do cliente',
  'Automação de controles, operação, temperatura e sensores de nível',
  'Treinamento de operadores em parceria com o Senar e entidades do setor',
]);

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Invista na armazenagem Elipal.</h2>
  <p>Fale com a equipe técnica e aumente a rentabilidade da sua lavoura: venda no melhor momento.</p></div>
  <div class="ch-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} Falar com a equipe</a><a class="btn btn-linha" href="${E.foneHref}">${E.fone}</a></div>
</div></section>`;
const cabPag = (titulo, sub) => `<section class="cab-pag"><div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

function silos(v) {
  return head(v, 'silos-secadores', 'Silos secadores', 'Silos secadores Elipal: estrutura robusta, durabilidade e baixo custo de instalação e operação para armazenar grãos com qualidade.') + topo(v, 'silos-secadores') +
  cabPag('Silos secadores', 'Máxima eficiência na secagem de grãos.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Armazenagem')}<h2>Seus maiores aliados para valorizar a colheita</h2>
  <p>A estrutura robusta dos silos Elipal dá a segurança necessária para proteger os grãos e manter a máxima qualidade do produto estocado.</p>
  <p>A durabilidade e o baixo custo de instalação e operação fazem dos silos Elipal um investimento seguro e rentável.</p>
  <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>Falar com a equipe técnica</a></p></div>
  <figure class="sobe">${img('caracteristicas-silo', 'Componentes do silo secador Elipal')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Acessórios')}<h2>Monte o silo do seu jeito</h2></div>
  <ul class="acess sobe">
    <li>Sistemas de descarga por roscas tubulares, roscas tipo calha e correias transportadoras</li>
    <li>Fundos econômicos com apoio das chapas perfuradas em concreto, alvenaria ou madeira</li>
    <li>Trocador de calor a lenha, de acordo com a vazão dos ventiladores, para secagem estática</li>
    <li>Ventiladores dimensionados para cada tipo de secagem e armazenagem</li>
    <li>Espalhador giratório com acionamento por cabos (a partir de ø 8,55 m)</li>
    <li>Inversores de fluxo do ar para eliminar pó com atividade interna no silo</li>
    <li>Termometria com leitura em monitor portátil ou por computador</li>
    <li>Descarga lateral por gravidade para caminhões, com escada de acesso</li>
    <li>Escada externa helicoidal para o operador</li>
    <li>Porta lateral de 2 anéis (1,50 m), para silos de até 12 anéis</li>
    <li>Descarga lateral por gravidade junto à base</li>
  </ul>
</div></section>
${img('silos-planos', 'Silos Elipal instalados', ' class="banda"')}` + chamada(v) + rodape(v);
}

function secadores(v) {
  return head(v, 'secadores-de-coluna', 'Secadores de coluna', 'Secadores de coluna Elipal: secagem contínua de soja, arroz, milho e trigo, com alta capacidade estática e vazão de ar reduzida.') + topo(v, 'secadores-de-coluna') +
  cabPag('Secadores de coluna', 'Secagem contínua de grãos, recomendada para soja, arroz, milho e trigo.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Eficácia e segurança')}<h2>Integridade e qualidade do grão</h2>
  <p>Os secadores de coluna Elipal têm alta capacidade estática e vazão de ar reduzida: economizam energia e reduzem a emissão de resíduos no ambiente. Há dois tamanhos, com capacidade estática de 0,60 t/m³ a 0,75 t/m³.</p>
  ${checks(['Eficiência energética', 'Ideal para secagem contínua', 'Impede a queda de grãos na torre de secagem', 'Evita acúmulo de impurezas'])}
  <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>Falar com a equipe técnica</a></p></div>
  <figure class="sobe" style="text-align:center">${img('secador-scc60', 'Secador de coluna Elipal SCC 60', ' style="max-height:620px;width:auto;margin:auto"')}</figure>
</div></section>
${img('secador-campo', 'Secador de coluna Elipal na lavoura', ' class="banda"')}` + chamada(v) + rodape(v);
}

function limpeza(v) {
  return head(v, 'maquinas-de-limpeza', 'Máquinas de limpeza', 'Máquinas de limpeza e pré-limpeza de grãos Elipal EPL 30 e EPL 45: quatro tipos de separação, estrutura toda em aço.') + topo(v, 'maquinas-de-limpeza') +
  cabPag('Máquinas de limpeza e pré-limpeza', 'Peneiras projetadas para operar com os diversos tipos de grãos.') + `
<section class="sec"><div class="in duas" style="align-items:start">
  <div class="sobe">${sobre('Quatro separações')}<h2>Só o grão bom passa</h2>
  <ul class="passos" style="grid-template-columns:1fr 1fr">
    <li><b>Impurezas leves</b><span>Separadas por uma coluna de ar eficiente.</span></li>
    <li><b>Palhas</b><span>Retidas na tela de pré-limpeza, que melhora o desempenho das demais (a EPL-08 não tem essa tela).</span></li>
    <li><b>Impurezas grandes</b><span>Retidas nas telas superiores, que deixam passar os grãos bons.</span></li>
    <li><b>Impurezas pequenas</b><span>Caem pela tela inferior, mantida limpa por esferas de borracha vibrantes.</span></li>
  </ul></div>
  <div class="sobe"><div class="modelos"><figure>${img('epl-30', 'Máquina de limpeza Elipal EPL 30')}<figcaption>EPL 30</figcaption></figure><figure>${img('epl-45', 'Máquina de limpeza Elipal EPL 45')}<figcaption>EPL 45</figcaption></figure></div>
  <p>Estrutura totalmente em aço, inclusive as bielas de acionamento: máquinas robustas e de longa vida. A rosca esquerda-direita espalha os grãos por igual, otimizando a coluna de ar e as telas.</p>
  <p>Escada e plataforma seguras dão acesso às regulagens sem contato com as partes móveis.</p></div>
</div></section>
${img('maquina-limpeza', 'Máquina de limpeza de grãos Elipal', ' class="banda"')}` + chamada(v) + rodape(v);
}

function projetos(v) {
  return head(v, 'projetos-especiais', 'Projetos especiais', 'Na Elipal não existem projetos padrão: unidades armazenadoras personalizadas, projetadas em 3D e montadas por equipe própria.') + topo(v, 'projetos-especiais') +
  cabPag('Projetos especiais', 'Na Elipal não existem projetos padrão.') + `
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Como trabalhamos')}<h2>Do diagnóstico à montagem</h2>
  <p>O projeto é a parte mais importante da instalação de um sistema de armazenagem. Por isso a Elipal trabalha de forma totalmente personalizada, de acordo com a realidade de cada produtor.</p></div>
  <ul class="passos">
    <li class="sobe"><b>Entrevista</b><span>Conversa com o produtor para entender a operação.</span></li>
    <li class="sobe"><b>Diagnóstico</b><span>Necessidades e características específicas da instalação.</span></li>
    <li class="sobe"><b>Projeto em 3D</b><span>Cada peça pode ser observada em detalhe antes da obra.</span></li>
    <li class="sobe"><b>Montagem</b><span>Equipe própria realiza toda a montagem e instalação.</span></li>
  </ul>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Obras')}<h2>Unidades armazenadoras Elipal</h2></div>
  <div class="amb">${[['projetos-especiais', 'Unidade armazenadora Elipal vista do alto'], ['armazenagem', 'Complexo de armazenagem Elipal'], ['parque', 'Parque de silos Elipal'], ['projeto', 'Silos e secador Elipal'], ['silos-projetos', 'Silos Elipal com elevador'], ['solucao', 'Projeto 3D de unidade Elipal']].map(a => foto(a[0], a[1])).join('')}</div>
</div></section>` + chamada(v) + rodape(v);
}

function servicos(v) {
  return head(v, 'servicos', 'Assistência técnica', 'Assistência técnica e peças originais Elipal: atendimento regionalizado, rápido e seguro para a operação e manutenção dos equipamentos.') + topo(v, 'servicos') +
  cabPag('Serviços e reposição', 'Assistência técnica e peças originais.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Pós-venda')}<h2>Durante e depois da venda</h2>
  <p>Qualidade e agilidade são marcas da assistência técnica e do pós-venda Elipal. A equipe une conhecimento atualizado às necessidades de cada lavoura, com serviços e produtos personalizados.</p>
  <p>O objetivo é oferecer soluções rápidas e seguras para a operação e a manutenção dos equipamentos, para você ter o melhor sistema de controle e armazenagem da produção.</p>
  <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} ${E.cel}</a><a class="btn btn-linha" href="${E.foneHref}">${E.fone}</a></p></div>
  <figure class="sobe">${img('interior-fabrica', 'Fabricação de peças na Elipal')}</figure>
</div></section>
${img('assistencia', 'Técnico da Elipal em manutenção de silo', ' class="banda"')}` + chamada(v) + rodape(v);
}

function empresa(v) {
  return head(v, 'empresa', 'A Elipal', 'Elipal: empresa gaúcha de Palmares do Sul/RS, com soluções em armazenagem de grãos desde 1979. Mais de 1.300 silos implantados.') + topo(v, 'empresa') +
  cabPag('Nossa história', 'Uma empresa gaúcha oferecendo soluções em sistemas de armazenagem de grãos desde 1979.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Desde 1979')}<h2>Palmares do Sul, terra de grãos</h2>
  <p>Instalada desde a fundação em Palmares do Sul, importante região produtora de grãos do Rio Grande do Sul, a Elipal tem experiência em secagem e armazenagem. Mais moderna e competitiva, vem abrindo mercados e adequando os equipamentos para todos os grãos: soja, milho, trigo e arroz.</p>
  <p>Os sistemas de armazenagem unem tecnologia, economia e adaptabilidade para aumentar a rentabilidade da plantação, com controle e conforto para que o grão seja vendido no melhor momento.</p></div>
  <figure class="sobe">${img('fabrica', 'Unidade fabril da Elipal em Palmares do Sul')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Diferenciais')}<h2>Soluções em produtos e serviços</h2>${diferenciais()}</div>
  <figure class="sobe">${img('interior-fabrica', 'Solda na fábrica Elipal')}</figure>
</div></section>
${img('paisagem', 'Silos Elipal ao entardecer', ' class="banda"')}` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Elipal Silos e Secadores, Palmares do Sul - RS');
  return head(v, 'contato', 'Contato', 'Elipal: vendas (51) 3668-1333, assistência (51) 99975-2780. Rua Álvaro Alves Camargo, 996, Palmares do Sul/RS.') + topo(v, 'contato') +
  cabPag('Fale conosco', 'Orçamentos, informações e assistência técnica.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<span>Vendas e atendimento<br><a href="${E.foneHref}">${E.fone}</a></span></li>
    <li>${icWa()}<span>Assistência técnica e peças<br><a href="${E.wa}" ${ext}>${E.cel}</a></span></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}, ${E.cep}</span></li></ul>
    <p class="horario">Segunda a sexta: 7h às 12h e 13h30 às 17h30</p>
    <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} WhatsApp</a><a class="btn btn-linha" href="${E.foneHref}">${ic('tel')} Ligar</a></p></div>
  <div class="sobe"><iframe class="mapa" title="Mapa da Elipal em Palmares do Sul/RS" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=14&output=embed"></iframe></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'Elipal, Palmares do Sul/RS: silos secadores, secadores de coluna e máquinas de limpeza de grãos. Mais de 1.300 silos implantados desde 1979.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Silos e secadores · desde 1979')}
      <h1>Você plantou, <em>você escolhe quando vender.</em></h1>
      <p class="ha-sub">Silos secadores, secadores de coluna e máquinas de limpeza para armazenar o grão na fazenda, com qualidade, e vendê-lo no melhor momento.</p>
      <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>Falar com a equipe</a><a class="btn btn-linha" href="${link(v, 'silos-secadores')}">Conheça os silos</a></p>
    </div>
    <div class="ha-prod">${imgTopo('parque', 'Parque de silos Elipal')}<span class="ha-tag"><b>1.300+ silos</b>implantados pela Elipal</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}40 anos de tradição</span><span>${ic('check')}Projeto personalizado</span><span>${ic('check')}Montagem com equipe própria</span><span>${ic('check')}Assistência regionalizada</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Equipamentos')}<h2>Armazenagem que integra tecnologia, rentabilidade e escalabilidade</h2></div>
  ${linha(v)}
</div></section>
<section class="sec sec-cinza"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Por que Elipal')}<h2>Não fique refém do mercado</h2>
  <p>Matérias-primas de qualidade e projetos de engenharia personalizados garantem segurança, qualidade de armazenagem, proteção ambiental, operação simples e baixo custo inicial e operacional.</p>
  ${diferenciais()}</div>
  <figure class="sobe">${img('armazenagem', 'Complexo de armazenagem Elipal')}</figure>
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Elipal Silos e Secadores: 40 anos de armazenagem de grãos no RS. Mais de 18 milhões de sacas em capacidade instalada.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('silos-secadores', 'Silos e secador Elipal')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('Elipal Silos e Secadores · Palmares do Sul/RS')}
    <h1>Armazene na fazenda. <em>Venda na hora certa.</em></h1>
    <p class="hb-sub">Silos secadores e secadores de coluna para soja, milho, trigo e arroz, com projeto, montagem e assistência da própria Elipal.</p>
    <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>Falar com a equipe</a><a class="btn btn-linha" href="${link(v, 'projetos-especiais')}">Projetos</a></p>
    <div class="hb-selo"><div><b>1979</b><span>fundação</span></div><div><b>18 mi+</b><span>sacas de capacidade</span></div><div><b>1.300+</b><span>silos implantados</span></div></div>
  </div></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Linha Elipal')}<h2>Silos, secadores e limpeza de grãos</h2></div>
  ${linha(v)}
</div></section>
<section class="lado">
  <figure>${img('projetos-especiais', 'Unidade armazenadora Elipal vista do alto')}</figure>
  <div class="sobe">${sobre('Projetos especiais')}<h2>Na Elipal não existem projetos padrão</h2>
  <p>Entrevista, diagnóstico, projeto detalhado em 3D e montagem por equipe própria: uma solução completa, de quem está ao seu lado.</p>
  <p><a class="link-seta" href="${link(v, 'projetos-especiais')}">Como trabalhamos ${ic('seta')}</a></p></div>
</section>
<section class="sec sec-escura"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Assistência técnica')}<h2>Peças originais e atendimento perto de você</h2>
  <p>Assistência regionalizada, atualização tecnológica dos equipamentos e treinamento de operadores em parceria com o Senar.</p>
  <p><a class="link-seta" href="${link(v, 'servicos')}">Serviços e reposição ${ic('seta')}</a></p></div>
  <figure class="sobe">${img('assistencia', 'Técnico Elipal em manutenção')}</figure>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), 'silos-secadores': silos(v), 'secadores-de-coluna': secadores(v), 'maquinas-de-limpeza': limpeza(v), 'projetos-especiais': projetos(v), servicos: servicos(v), empresa: empresa(v), contato: contato(v) });

copiarSiteJs(pub, '5551999752780');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Elipal', artigo: 'da', url: E.url, lang: 'pt', cor: '#c22b1e', fundo: '#20201e', claro: '#f5f3ef',
  fonteTitulo: "'Nunito',system-ui,sans-serif", fonteTexto: "'Open Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 8, texto: 'Clara, abre com o parque de silos e o lema "Você plantou, você escolhe quando vender".', pontos: ['Números da Elipal', 'Uma página por equipamento', 'Diferenciais e assistência'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 8, texto: 'Grafite e vermelho, abre com silos em tela cheia e destaca os projetos especiais.', pontos: ['Foto em tela cheia', 'Projetos sob medida', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
