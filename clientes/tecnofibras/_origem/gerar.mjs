// Tecnofibras (Joinville/SC): peças em compósito nos processos SMC e RTM/AT para caminhões, ônibus, máquinas agrícolas e de construção. Gera public/{a,b}/ e a página de escolha.
// node clientes/tecnofibras/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs tecnofibras https://www.tecnofibras.com.br/)
// Textos e fotos do site atual (WordPress, /wp-json/wp/v2/media). Logo vetorizado do PNG de 255 px do rodapé (_origem/vetorizar-logo.py).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));

const E = {
  nome: 'Tecnofibras', legal: 'Tecnofibras · Grupo Jointech', url: 'https://tecnofibras.overtus.com.br/', antigo: 'https://www.tecnofibras.com.br/',
  fone: '+55 (47) 3441-1480', foneHref: 'tel:+554734411480', email: 'contato@tecnofibras.com.br',
  end: 'Rua Rui Barbosa, 1230, Bloco B, Distrito Industrial', cidade: 'Joinville/SC · CEP 89219-521',
};

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const foto = (n, alt) => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}">${img(n, alt)}</a>`;
const checks = l => `<ul class="checks">${l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`;

const clientes = ['Mercedes-Benz', 'Volkswagen', 'Volvo', 'Scania', 'DAF', 'Ford', 'John Deere', 'AGCO', 'Caterpillar', 'Hitachi', 'Kion Group', 'Bombardier', 'CAF', 'GSI'];
const segmentos = [
  { id: 'automotivo', n: 'Caminhões e ônibus', t: 'Capôs, para-choques, para-lamas, tetos, defletores, grades e painéis.', f: [['p-caminhao-vw', 'Peças em compósito para caminhão Volkswagen'], ['p-caminhao', 'Peças em SMC para caminhão'], ['p-cabine', 'Teto e componentes de cabine']] },
  { id: 'agricola', n: 'Máquinas agrícolas', t: 'Capôs, para-lamas e carenagens para tratores e colheitadeiras.', f: [['p-trator', 'Peças em compósito para trator'], ['p-trator-2', 'Carenagens de trator']] },
  { id: 'implementos', n: 'Construção e implementos', t: 'Capôs, tetos e carenagens para pás carregadeiras, retroescavadeiras e implementos rodoviários.', f: [['p-carregadeira', 'Peças para pá carregadeira'], ['p-retro', 'Peças para retroescavadeira']] },
];
const historia = [
  ['1978', 'Fundação da Tecnofibras Nielson S.A.'], ['1984', 'Spray up para caminhões Mercedes-Benz e Scania'], ['1985', 'Implantação do processo RTM'], ['1990', 'Peças RTM para a Ford'],
  ['1995', 'Certificação ISO 9001'], ['1999', 'Início do fornecimento para tratores John Deere'], ['2001', 'Processo SMC e modernização do parque fabril'], ['2002', 'ISO TS16949, ISO 14001, Q1 Ford e Preferred Supplier CAT'],
  ['2004', 'Exportação para a Caterpillar Bélgica'], ['2005', 'SMC para Volkswagen e Volvo; unidade de Resende/RJ'], ['2007', 'RTM/AT com estações de moldagem'], ['2008', 'Máquina SMC e unidade fabril II'],
  ['2011', 'Certificação VDA'], ['2016', 'Aquisição pelo Grupo Jointech Industrial'], ['2017', 'Ano recorde em novos desenvolvimentos'], ['2018', '40 anos de Tecnofibras'],
];

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'Empresa' },
  { slug: 'tecnologia', n: 'Tecnologia' },
  { slug: 'produtos', n: 'Produtos' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Compósito de série', b: 'Chão de fábrica' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Saira:wght@500;600;700&family=Source+Sans+3:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Tecnofibras | Peças em compósito SMC e RTM/AT em Joinville/SC' : `${titulo} | Tecnofibras`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#0d3e6b' });
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const logo = (branco, h = 56) => `<img class="logo" src="/assets/${branco ? 'logo-branco' : 'logo'}.svg" alt="Tecnofibras" width="${Math.round(h * 246.9 / 102.9)}" height="${h}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Compósitos SMC e RTM/AT desde 1978</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Tecnofibras, página inicial">${logo(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}">Fale com a engenharia</a>
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
    <div class="rod-marca">${logo(true, 70)}
      <p>Líder e pioneira em peças de material compósito no Brasil. Do co-design à peça pintada e montada.</p></div>
    <div><h3>Produtos</h3><ul>${segmentos.map(s => `<li><a href="${link(v, 'produtos')}#${s.id}">${s.n}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>Empresa</h3><ul>
      <li><a href="${link(v, 'empresa')}">Sobre a Tecnofibras</a></li>
      <li><a href="${link(v, 'tecnologia')}">SMC e RTM/AT</a></li>
      <li><a href="${link(v, 'empresa')}#clientes">Clientes</a></li>
      <li><a href="${link(v, 'contato')}">Contato</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>ISO 9001 · ISO 14001 · ISO TS16949 · VDA</span></div>
</footer>
</body>
</html>`;
}

const numeros = () => `<ul class="economia">
  <li><b>1978</b><span>fundação em Joinville</span></li>
  <li><b>1.351+</b><span>itens desenvolvidos e produzidos</span></li>
  <li><b>2</b><span>unidades fabris</span></li>
  <li><b>19 mil m²</b><span>de área construída</span></li>
  <li><b>1,5 t/h</b><span>de composto SMC</span></li>
</ul>`;

const listaClientes = () => `<ul class="clientes">${clientes.map(c => `<li>${c}</li>`).join('')}</ul>`;

const processos = () => `<ul class="setores" style="grid-template-columns:repeat(2,minmax(0,1fr))">
  <li class="sobe"><a href="#smc"><span class="st-img">${img('linha-smc', 'Linha de fabricação de composto SMC')}</span><span class="st-txt"><small>Médio e alto volume</small><b>SMC · Sheet Molding Compound</b><span>Peças estruturais e de acabamento para automóveis, máquinas agrícolas, caminhões, trens e equipamentos industriais.</span></span></a></li>
  <li class="sobe"><a href="#rtm"><span class="st-img">${img('pecas', 'Peças RTM/AT em produção')}</span><span class="st-txt"><small>Pequenas a grandes dimensões</small><b>RTM/AT · Resin Transfer Molding</b><span>Para-choques, estribos, tetos, capôs, painéis e grades para tratores, trens, ônibus e implementos.</span></span></a></li>
</ul>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Tem uma peça em desenvolvimento?</h2>
  <p>A engenharia da Tecnofibras entra no projeto desde a concepção, com sugestões de design, desempenho e custo.</p></div>
  <div class="ch-acoes"><a class="btn" href="${link(v, 'contato')}">Falar com a engenharia</a><a class="btn btn-linha" href="${E.foneHref}">${E.fone}</a></div>
</div></section>`;

const cabPag = (titulo, sub, f) => `<section class="cab-pag${f ? ' com-foto' : ''}">${f ? `<div class="cp-foto">${imgTopo(f[0], f[1])}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

function empresa(v) {
  return head(v, 'empresa', 'Empresa', 'Tecnofibras: fundada em 1978 em Joinville/SC, líder e pioneira em peças de material compósito no Brasil, fornecedora das maiores montadoras.') + topo(v, 'empresa') +
  cabPag('Sobre a Tecnofibras', 'Versátil, inovadora e atenta a cada detalhe.', ['sede', 'Sede da Tecnofibras em Joinville/SC']) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Desde 1978')}<h2>Pioneira em compósitos no Brasil</h2>
  <p>Fundada em 8 de fevereiro de 1978, a Tecnofibras é líder e pioneira na fabricação de peças em material compósito no Brasil. Une as melhores tecnologias a décadas de experiência para entregar projetos completos, da concepção ao uso, incluindo o descarte.</p>
  <p>Começou com Hand Lay-up, Spray-up e RTM-Light. Depois lançou com exclusividade no Brasil o RTM/AT e se tornou referência nacional em SMC, sempre em aliança com os melhores fornecedores nacionais e internacionais.</p></div>
  <figure class="sobe">${img('galpao', 'Fábrica da Tecnofibras')}</figure>
</div></section>
<section class="sec sec-escura"><div class="in">${sobre('Em números')}<h2 class="sobe">Estrutura de fornecedor automotivo</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Nossa história')}<h2>De 1978 ao Grupo Jointech</h2></div>
  <ol class="tempo">${historia.map(h => `<li class="sobe"><b>${h[0]}</b><span>${h[1]}</span></li>`).join('')}</ol>
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <div class="sobe">${sobre('Missão e visão')}<h2>Partner of Choice em compósitos</h2>
  <p><b>Missão:</b> mais que um fornecedor, ser um parceiro eficiente e confiável em soluções de compósitos focadas na competitividade dos clientes.</p>
  <p><b>Visão:</b> ser o “Partner of Choice” em soluções de compósitos para as empresas líderes dos segmentos em que atua.</p>
  ${checks(['Empresa ética e transparente', 'Melhoria contínua', 'Motivados em surpreender os clientes', 'A equipe é o maior ativo', 'Foco em metas e performance'])}</div>
  <figure class="sobe">${img('moldes', 'Moldes e peças na fábrica')}</figure>
</div></section>
<section class="sec" id="clientes"><div class="in">
  <div class="sec-cab sobe">${sobre('Clientes')}<h2>Qualidade atestada pelas maiores montadoras do mundo</h2></div>
  ${listaClientes()}
</div></section>` + chamada(v) + rodape(v);
}

function tecnologia(v) {
  return head(v, 'tecnologia', 'Tecnologia', 'Tecnologia Tecnofibras: co-design, ferramentais, fabricação do composto SMC, laboratório, moldagem SMC e RTM/AT, corte robotizado, montagem e pintura.') + topo(v, 'tecnologia') +
  cabPag('Tecnologia', 'Da formulação do composto à peça pintada e montada.', ['prensa-2', 'Prensa de moldagem SMC']) + `
<section class="sec"><div class="in">
  <nav class="indice" aria-label="Etapas"><a href="#codesign">Co-design</a><a href="#composto">Composto SMC</a><a href="#smc">Moldagem SMC</a><a href="#rtm">RTM/AT</a><a href="#acabamento">Corte, montagem e pintura</a></nav>
  <article class="maq" id="codesign"><div class="maq-foto sobe">${foto('estoque', 'Peças desenvolvidas pela Tecnofibras')}</div><div class="sobe"><p class="maq-marca">Desenvolvimento</p><h2>Co-design e ferramentais</h2>
    <p>A Tecnofibras participa dos projetos das maiores montadoras do mundo desde a concepção, sugerindo melhorias de design, desempenho e custo. Grande experiência em capôs, para-choques, para-lamas, tetos e grades dianteiras.</p>
    <p>Com modelação própria e ferramentarias parceiras, busca o meio produtivo certo para cada volume.</p></div></article>
  <article class="maq" id="composto"><div class="maq-foto sobe">${foto('smc-composto', 'Fabricação do composto SMC')}</div><div class="sobe"><p class="maq-marca">Matéria-prima</p><h2>Composto SMC próprio</h2>
    <p>Fábrica de composto SMC com sala climatizada e laboratório com prensa e dispositivo exclusivo que simula a moldagem e mede o fluxo de reatividade.</p>
    <ul class="checks lista2">${['Classe A (Low Profile)', 'Baixa densidade', 'Estrutural (Low Shrink)', 'Baixa pressão', 'Flexível', 'Pigmentada', 'Nanotecnologia', 'Flamabilidade'].map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul></div></article>
  <article class="maq" id="smc"><div class="maq-foto sobe">${foto('prensa', 'Prensa SMC')}</div><div class="sobe"><p class="maq-marca">Médio e alto volume</p><h2>SMC · Sheet Molding Compound</h2>
    <p>Totalmente desenvolvido dentro de casa, da formulação e produção do composto à moldagem e entrega.</p>
    ${checks(['Fibra de vidro impregnada com resina poliéster, aditivos e cargas minerais', 'Baixo custo de mão de obra e de molde (frente a injeção e aço estampado)', 'Repetibilidade, durabilidade e estabilidade dimensional', 'Moldes em aço para até 500.000 peças', 'Peças com nervuras e castelos, resistentes a impacto', 'Acabamento classe A automotivo'])}</div></article>
  <article class="maq" id="rtm"><div class="maq-foto sobe">${foto('pecas', 'Peças RTM/AT')}</div><div class="sobe"><p class="maq-marca">Exclusivo no Brasil</p><h2>RTM/AT · Resin Transfer Molding</h2>
    <p>Para peças pequenas a grandes em volume médio: para-choques, estribos, tetos, capôs, painéis e grades.</p>
    ${checks(['Molde fechado macho-fêmea em epóxi, alumínio ou aço', 'Menos mão de obra que Spray up e Hand lay-up', 'Acabamento liso dos dois lados, classe A', 'Moldes aquecidos: mais repetibilidade e produtividade', 'Reforços de PU, madeira ou metal incorporados', 'Gel coat na cor final do produto'])}</div></article>
  <article class="maq" id="acabamento"><div class="maq-foto sobe">${foto('robo', 'Estação robotizada de corte')}<div class="maq-mini">${foto('pintura', 'Área de pintura')}${foto('galpao-2', 'Montagem')}</div></div><div class="sobe"><p class="maq-marca">Peça pronta</p><h2>Corte, montagem e pintura</h2>
    ${checks(['<b>Corte</b>: estações de robô de duplo estágio para periferias, cortes e furações', '<b>Montagem</b>: atua como sistemista, com componentes de PP, metal, ABS, alumínio e PE', 'Fixação mecânica (parafusos, porca rebite) e química (adesivos estruturais)', '<b>Pintura</b>: cabines para primer e esmalte PU, 3 linhas automáticas e 4 cabines estáticas', 'Laboratório de tintas para cores em baixo volume'])}</div></article>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Fábricas')}<h2>Duas unidades em Joinville</h2></div>
  <ul class="unid">
    <li class="sobe"><h3>Unidade I</h3><p>Modelagem, laboratório e fabricação do composto SMC. Spray up, Hand lay-up e infusão.</p><dl><div><dt>30.098 m²</dt><dd>de terreno</dd></div><div><dt>6.060 m²</dt><dd>construídos</dd></div></dl></li>
    <li class="sobe"><h3>Unidade II</h3><p>SMC e RTM: desenvolvimento, moldagem, recorte, montagem, pintura, estoque e expedição. 4 prensas SMC.</p><dl><div><dt>25.128 m²</dt><dd>de terreno</dd></div><div><dt>13.574 m²</dt><dd>construídos</dd></div></dl></li>
  </ul>
</div></section>` + chamada(v) + rodape(v);
}

function produtosPag(v) {
  return head(v, 'produtos', 'Produtos', 'Produtos Tecnofibras: peças em compósito para caminhões e ônibus, máquinas agrícolas, construção e implementos rodoviários.') + topo(v, 'produtos') +
  cabPag('Produtos', 'Mais de 1.351 itens já desenvolvidos e produzidos.') + `
<section class="sec"><div class="in">
  ${segmentos.map(s => `<div id="${s.id}" style="margin-bottom:56px"><div class="sec-cab sobe">${sobre(s.n)}<h2>${s.t}</h2></div><ul class="prods">${s.f.map(f => `<li class="sobe">${foto(f[0], f[1])}<div><h3>${f[1]}</h3><p>${s.n}</p></div></li>`).join('')}</ul></div>`).join('')}
  <div class="duas" style="margin-top:20px"><figure class="sobe">${img('p-delivery', 'Peças para o VW Delivery')}</figure><div class="sobe">${sobre('Desenvolvimento')}<h2>Do desenho à linha da montadora</h2><p>Peças com os rígidos critérios de qualidade da indústria automobilística, entregues pintadas e montadas quando o cliente precisa.</p><a class="link-seta" href="${link(v, 'tecnologia')}">Ver a tecnologia ${ic('seta')}</a></div></div>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Rua Rui Barbosa, 1230, Distrito Industrial, Joinville - SC');
  return head(v, 'contato', 'Contato', 'Tecnofibras: +55 (47) 3441-1480. Rua Rui Barbosa, 1230, Bloco B, Distrito Industrial, Joinville/SC.') + topo(v, 'contato') +
  cabPag('Contato', 'Informações, dúvidas e sugestões.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <iframe class="mapa" title="Mapa da Tecnofibras em Joinville/SC" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe></div>
  <div class="sobe caixa-form"><form class="form" data-email="${E.email}" data-assunto="Contato pelo site">
    <div class="form-duas"><label>Nome completo *<input name="nome" required autocomplete="name"></label><label>Cidade<input name="cidade" autocomplete="address-level2"></label></div>
    <div class="form-duas"><label>Telefone *<input name="fone" type="tel" required autocomplete="tel"></label><label>E-mail *<input name="email" type="email" required autocomplete="email"></label></div>
    <label>Enviar para<select name="setor"><option>Contato comercial</option><option>Recursos Humanos</option><option>Financeiro</option></select></label>
    <label>Mensagem *<textarea name="mensagem" rows="5" required></textarea></label>
    <button class="btn" type="submit">${ic('mail')} Enviar mensagem</button>
    <p class="form-nota">Abre o seu e-mail com a mensagem pronta.</p>
  </form></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'Tecnofibras: peças em compósito SMC e RTM/AT para caminhões, ônibus, máquinas agrícolas e de construção. Joinville/SC, desde 1978.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Compósitos · Joinville/SC')}
      <h1>Peças em compósito <em>com acabamento classe A.</em></h1>
      <p class="ha-sub">Referência na América Latina em criar, desenvolver, fabricar, montar e entregar peças em SMC e RTM/AT para as maiores montadoras do mundo.</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'contato')}">Falar com a engenharia</a><a class="btn btn-linha" href="${link(v, 'tecnologia')}">Ver a tecnologia</a></p>
    </div>
    <div class="ha-prod">${imgTopo('p-caminhao-vw', 'Peças em compósito para caminhão')}<span class="ha-tag"><b>1.351+ itens</b>já desenvolvidos e produzidos</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Desde 1978</span><span>${ic('check')}Composto SMC próprio</span><span>${ic('check')}RTM/AT exclusivo no Brasil</span><span>${ic('check')}ISO TS16949 e VDA</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Processos')}<h2>Dois processos, uma engenharia</h2></div>
  ${processos()}
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Produtos')}<h2>Para quem roda, planta e constrói</h2></div>
  <ul class="prods">${segmentos.map(s => `<li class="sobe"><a href="${link(v, 'produtos')}#${s.id}">${img(s.f[0][0], s.f[0][1])}</a><div><h3>${s.n}</h3><p>${s.t}</p></div></li>`).join('')}</ul>
</div></section>
<section class="sec sec-escura"><div class="in">${sobre('Tecnofibras em números')}<h2 class="sobe">Fornecedor de montadora desde os anos 80</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Clientes')}<h2>Qualidade atestada pelas maiores montadoras</h2></div>
  ${listaClientes()}
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Tecnofibras: líder e pioneira em peças de material compósito no Brasil. SMC e RTM/AT, do co-design à peça pintada e montada.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('prensa', 'Prensa SMC na fábrica da Tecnofibras')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('Tecnofibras · desde 1978')}
    <h1>Do composto <em>à peça montada.</em></h1>
    <p class="hb-sub">Formulamos o SMC, moldamos, cortamos com robô, pintamos e montamos. Tudo em Joinville.</p>
    <p class="ha-acoes"><a class="btn" href="${link(v, 'contato')}">Falar com a engenharia</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Produtos</a></p>
    <div class="hb-selo"><div><b>1978</b><span>fundação</span></div><div><b>500 mil</b><span>peças por molde de aço</span></div><div><b>2</b><span>fábricas</span></div></div>
  </div></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Processos')}<h2>SMC e RTM/AT</h2></div>
  ${processos()}
</div></section>
<section class="lado">
  <figure>${img('robo', 'Estação robotizada de corte')}</figure>
  <div class="sobe">${sobre('Sistemista')}<h2>Peça cortada, pintada e montada</h2>
  <p>Robôs de duplo estágio no corte, 3 linhas automáticas de pintura e montagem de componentes de vários materiais. A montadora recebe a peça pronta.</p>
  <p><a class="link-seta" href="${link(v, 'tecnologia')}#acabamento">Ver acabamento ${ic('seta')}</a></p></div>
</section>
<section class="sec sec-escura"><div class="in">${sobre('Em números')}<h2 class="sobe">Escala de fornecedor automotivo</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Na fábrica')}<h2>Joinville, SC</h2></div>
  <div class="galeria">${[['galpao-2', 'Fábrica'], ['pintura', 'Pintura'], ['moldes', 'Moldes'], ['estacionamento', 'Sede']].map(f => foto(f[0], f[1])).join('')}</div>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), tecnologia: tecnologia(v), produtos: produtosPag(v), contato: contato(v) });

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Tecnofibras', artigo: 'da', url: E.url, lang: 'pt', cor: '#0d3e6b', fundo: '#0b2a47', claro: '#f2f4f7',
  fonteTitulo: "'Saira',system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, abre com as peças de caminhão e explica SMC e RTM/AT lado a lado.', pontos: ['Processos e produtos na home', 'Linha do tempo de 1978 a 2018', 'Clientes montadoras'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Azul escuro, abre com a prensa SMC e mostra o caminho do composto à peça montada.', pontos: ['Prensa em tela cheia', 'Corte, pintura e montagem em destaque', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
