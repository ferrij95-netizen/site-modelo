// KREBS Sistemas de Irrigação (Krebsfer, Valinhos/SP): pivôs centrais, carretéis enroladores, tubos e conexões galvanizados, automação Kube e peças K+ Parts. Gera public/{a,b}/ e a página de escolha.
// node clientes/krebs/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs krebs https://www.krebs.com.br/)
// Textos do site atual e do Catálogo Irrigação 2022 (PDF no WordPress). Fotos do site e do catálogo. Logo vetorizado da contracapa do catálogo (_origem/vetorizar-logo.py).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));

const E = {
  nome: 'KREBS', legal: 'KREBS Sistemas de Irrigação · Krebsfer', url: 'https://krebs.overtus.com.br/', antigo: 'https://www.krebs.com.br/',
  fone: '(19) 3119-4000', foneHref: 'tel:+551931194000', suporte: '(19) 3119-4040', suporteHref: 'tel:+551931194040', email: 'krebs@krebs.com.br',
  end: 'Rua Krebsfer, 566', cidade: 'Valinhos/SP', insta: 'https://www.instagram.com/krebsind/', face: 'https://www.facebook.com/krebsirrigacao',
};

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const foto = (n, alt) => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}">${img(n, alt)}</a>`;
const checks = l => `<ul class="checks">${l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`;

const linhas = [
  { slug: 'pivos', n: 'Pivôs de irrigação', t: 'Pivô central, rebocável e linear, com a maior estabilidade estrutural do mercado.', f: 'pivo-ceu' },
  { slug: 'carreteis', n: 'Carretéis enroladores', t: 'Autopropelidos de 75 a 140 mm, para áreas de 20 a 100 ha, água, dejetos ou vinhaça.', f: 'carretel' },
  { slug: 'tubos', n: 'Tubos, conexões e peças', t: 'Aço galvanizado de 3 a 20 polegadas e peças de reposição K+ Parts para várias marcas.', f: 'tubos' },
  { slug: 'automacao', n: 'Automação e painéis', t: 'Painéis 5001 e 5005+, Kube by B-Hyve e rádio Agrowave para acionar a até 15 km.', f: 'painel-novo' },
];
const historia = [
  ['1966', 'Fundação da Krebsfer em São Bernardo do Campo/SP, com ferramentas especiais para a indústria automobilística: guinchos e prensas hidráulicas.'],
  ['1978', 'Entrada no mercado de irrigação com a linha de tubos e conexões para aspersão convencional. Em pouco tempo, líder do setor.'],
  ['1984', 'Mudança para Valinhos/SP e início da fase de lançamentos, com destaque para pivôs e carretéis.'],
  ['Hoje', 'Maior portfólio de irrigação do mercado brasileiro, automação Kube by B-Hyve em parceria com a Orbit (grupo Husqvarna).'],
  ['2026', '60 anos de KREBS.'],
];

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'Empresa' },
  { slug: 'pivos', n: 'Pivôs' },
  { slug: 'carreteis', n: 'Carretéis' },
  { slug: 'tubos', n: 'Tubos e peças' },
  { slug: 'automacao', n: 'Automação' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'O pivô do Brasil', b: 'Aço galvanizado' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Source+Sans+3:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'KREBS | Pivôs de irrigação, carretéis, tubos e conexões' : `${titulo} | KREBS Sistemas de Irrigação`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#d3161e' });
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const logo = (branco, h = 46) => `<img class="logo" src="/assets/${branco ? 'logo-branco' : 'logo'}.svg" alt="KREBS" width="${Math.round(h * 320.9 / 88.15)}" height="${h}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">O pivô do Brasil · desde 1966</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="KREBS, página inicial">${logo(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}">Pedir orçamento</a>
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
    <div class="rod-marca">${logo(true, 52)}
      <p>Pivôs, carretéis, tubos e conexões fabricados em Valinhos/SP, com galvanização a fogo própria.</p>
      <p class="rod-redes"><a href="${E.insta}" aria-label="Instagram da KREBS">${ic('insta')}</a><a href="${E.face}" aria-label="Facebook da KREBS">${ic('face')}</a></p></div>
    <div><h3>Produtos</h3><ul>${linhas.map(s => `<li><a href="${link(v, s.slug)}">${s.n}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${ic('chave')}<span>Suporte <a href="${E.suporteHref}">${E.suporte}</a></span></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>Empresa</h3><ul>
      <li><a href="${link(v, 'empresa')}">Sobre a KREBS</a></li>
      <li><a href="${link(v, 'empresa')}#fabrica">A fábrica</a></li>
      <li><a href="${link(v, 'contato')}">Suporte técnico</a></li>
      <li><a href="${link(v, 'contato')}">Contato</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Rua Krebsfer, 566 · Valinhos/SP</span></div>
</footer>
</body>
</html>`;
}

const numeros = () => `<ul class="economia">
  <li><b>1966</b><span>fundação da Krebsfer</span></li>
  <li><b>1978</b><span>na irrigação</span></li>
  <li><b>56 mil m²</b><span>de planta em Valinhos</span></li>
  <li><b>12 mil m²</b><span>construídos para produção</span></li>
  <li><b>70 µm</b><span>de zinco, no mínimo</span></li>
</ul>`;

const cardsLinhas = v => `<ul class="setores">${linhas.map(s => `<li class="sobe"><a href="${link(v, s.slug)}"><span class="st-img">${img(s.f, s.n)}</span><span class="st-txt"><b>${s.n}</b><span>${s.t}</span></span></a></li>`).join('')}</ul>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Vamos dimensionar a sua irrigação?</h2>
  <p>A engenharia de aplicação da KREBS calcula o projeto e o orçamento para a sua área, cultura e fonte de água.</p></div>
  <div class="ch-acoes"><a class="btn" href="${link(v, 'contato')}">Pedir orçamento</a><a class="btn btn-linha" href="${E.foneHref}">${E.fone}</a></div>
</div></section>`;

const cabPag = (titulo, sub, f) => `<section class="cab-pag${f ? ' com-foto' : ''}">${f ? `<div class="cp-foto">${imgTopo(f[0], f[1])}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

function empresa(v) {
  return head(v, 'empresa', 'Empresa', 'KREBS: fundada em 1966, na irrigação desde 1978, fábrica de 56.000 m² em Valinhos/SP com galvanização a fogo em forno elétrico vertical.') + topo(v, 'empresa') +
  cabPag('KREBS, desde 1966', 'Gente e tecnologia a serviço do campo.', ['fabrica-aerea', 'Vista aérea da fábrica da KREBS em Valinhos/SP']) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Nossa história')}<h2>Das ferramentas especiais ao pivô do Brasil</h2>
  <p>Fundada em 1966 em São Bernardo do Campo, a Krebsfer começou fabricando ferramentas especiais para a indústria automobilística, como guinchos e prensas hidráulicas que ainda hoje se encontram em oficinas.</p>
  <p>Em 1978 entrou na irrigação com tubos e conexões para aspersão convencional e logo se tornou líder e referência do setor. Em 1984 mudou-se para Valinhos, onde lançou os pivôs e carretéis KREBS.</p></div>
  <figure class="sobe">${img('fabrica-galpao', 'Galpões da KREBS em Valinhos')}</figure>
</div></section>
<section class="sec sec-escura"><div class="in">${sobre('Em números')}<h2 class="sobe">Fábrica entre Campinas e Viracopos</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Linha do tempo')}<h2>60 anos de KREBS</h2></div>
  <ol class="tempo">${historia.map(h => `<li class="sobe"><b>${h[0]}</b><span>${h[1]}</span></li>`).join('')}</ol>
</div></section>
<section class="sec sec-cinza" id="fabrica"><div class="in">
  <div class="sec-cab sobe">${sobre('A fábrica')}<h2>Do corte à galvanização, tudo em casa</h2>
  <p>A 10 minutos do centro de Campinas e a 20 do aeroporto de Viracopos, com acesso às rodovias Anhanguera, Bandeirantes e D. Pedro I. Processos informatizados garantem a rastreabilidade de cada produto.</p></div>
  <div class="galeria">${[['laser', 'Corte a laser'], ['solda', 'Solda'], ['inducao', 'Forjamento por indução'], ['pintura', 'Pintura']].map(f => foto(f[0], f[1])).join('')}</div>
</div></section>
<section class="sec"><div class="in duas">
  <figure class="sobe">${img('galvanizacao', 'Forno de galvanização a fogo')}</figure>
  <div class="sobe">${sobre('Galvanização a fogo')}<h2>Única no Hemisfério Sul em forno elétrico vertical</h2>
  <p>O sistema garante aplicação homogênea e controlada do zinco metálico. Todo o processo segue normas ABNT.</p>
  ${checks(['Zinco 100% puro', 'Camada mínima de 70 micra', 'Aços certificados ASTM', 'Engenharia de produto com cálculo estrutural', 'Salas de treinamento na fábrica para revendas e técnicos'])}</div>
</div></section>` + chamada(v) + rodape(v);
}

function pivos(v) {
  return head(v, 'pivos', 'Pivôs de irrigação', 'Pivôs KREBS: torre central reforçada, lances de 41 a 62 m, tubos de 5 a 12 polegadas, motorredutores SEW, painéis 5001 e 5005+. Central, rebocável e linear.') + topo(v, 'pivos') +
  cabPag('Pivôs de irrigação', 'Robustez, maior desempenho, maior durabilidade e menor manutenção.', ['pivo-campo', 'Pivô central KREBS em lavoura']) + `
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Modelos')}<h2>Um pivô para cada área</h2></div>
  <ul class="cards3">
    <li class="sobe"><h3>Pivô central</h3><p>Para áreas de cultivo contínuo, aproveitando ao máximo a produtividade do campo irrigado.</p></li>
    <li class="sobe"><h3>Pivô rebocável</h3><p>Fácil de operar e rebocar, gira a torre em diferentes áreas e muda de campo de cultivo.</p></li>
    <li class="sobe"><h3>Pivô linear</h3><p>Ideal para áreas retangulares, com aproveitamento total. Abastecido por captador lateral na primeira torre.</p></li>
  </ul>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <nav class="indice" aria-label="Componentes"><a href="#torre">Torre central</a><a href="#lances">Lances</a><a href="#torres">Torres móveis</a><a href="#painel">Painéis</a><a href="#opcionais">Opcionais</a></nav>
  <article class="maq" id="torre"><div class="maq-foto sobe">${foto('torre-central', 'Torre central do pivô KREBS')}</div><div class="sobe"><p class="maq-marca">Estrutura</p><h2>Torre central</h2>
    <p>Projetada para mais estabilidade e suavidade de movimento: maior distância entre as sapatas, mais travessas horizontais e válvula ventosa de 3” como padrão. Pronta para acoplar bombas de fertirrigação.</p>
    ${checks(['Três tipos: 2,75 m, acima de 2,75 m e rebocável', 'Para pivôs de 5”, 6 5/8”, 8 5/8”, 10” e 12”', 'Aço ASTM de qualidade superior', 'Tirantes com cabeças forjadas por indução', 'Cordoalhas de arame de alta densidade'])}</div></article>
  <article class="maq" id="lances"><div class="maq-foto sobe">${foto('pivo-torre', 'Lances do pivô KREBS')}</div><div class="sobe"><p class="maq-marca">Comprimento ideal</p><h2>Lances e balanço</h2>
    <p>Lances de comprimentos variáveis combinados para aproveitar ao máximo a área irrigada.</p>
    <div class="tabela-wrap"><table class="tab"><thead><tr><th>Lance</th><th>Comprimento</th><th>Tubos</th><th>Balanço</th></tr></thead><tbody>
      <tr><th>Curto</th><td>41,11 m</td><td>6</td><td>18 m</td></tr><tr><th>Médio</th><td>47,96 m</td><td>7</td><td>21,13 m</td></tr>
      <tr><th>Longo</th><td>54,83 m</td><td>8</td><td>24 m</td></tr><tr><th>Extra longo</th><td>61,67 m</td><td>9</td><td>27,13 m</td></tr></tbody></table></div></div></article>
  <article class="maq" id="torres"><div class="maq-foto sobe">${foto('pneu', 'Torre móvel e pneu do pivô')}<div class="maq-mini">${foto('p-mecanica', 'Motorredutor')}${foto('aspersor', 'Aspersor')}</div></div><div class="sobe"><p class="maq-marca">No campo</p><h2>Torres móveis, redutores e pneus</h2>
    ${checks(['Eixos reforçados e pernas com mais degraus', 'Acoplamentos do cardã estampados em aço, borrachas com proteção UV', '<b>Motorredutores</b> desenvolvidos com a SEW-EURODRIVE: 1:25 e 1:30, motores de 1 e 1,5 hp', '<b>Redutores de roda</b> padrão “trabalho superpesado”, fundidos em metal de alta pureza', '<b>Pneus</b> 9,5x24, 12,4x24 e 14,9x24 para menos compactação do solo', 'Alinhamento com bornes de mola, sem forquilhas: exclusivo KREBS'])}</div></article>
  <article class="maq" id="painel"><div class="maq-foto sobe">${foto('painel-novo', 'Painel de controle KREBS')}</div><div class="sobe"><p class="maq-marca">Controle</p><h2>Painéis 5001 e 5005+</h2>
    <p><b>5001:</b> controle total do pivô, sentido de movimento, bombas booster e injetora, motobomba, percentímetro, programador horário, luz LED e chave de alinhamento.</p>
    <p><b>5005+:</b> híbrido com tela touch, programação completa e setorização de lâmina e canhão.</p>
    <p><a class="link-seta" href="${link(v, 'automacao')}">Ver automação ${ic('seta')}</a></p></div></article>
</div></section>
<section class="sec" id="opcionais"><div class="in">
  <div class="sec-cab sobe">${sobre('Opcionais')}<h2>Para solo pesado, água de reuso e áreas setoriais</h2></div>
  <ul class="cards3">
    <li class="sobe"><h3>Trilha seca</h3><p>Evita aspergir água sobre as rodas: o pivô anda em solo seco, sem atolar nem abrir sulcos.</p></li>
    <li class="sobe"><h3>K-POLY</h3><p>Tubo revestido em polietileno com vedação exclusiva para chorume, vinhaça e águas corrosivas.</p></li>
    <li class="sobe"><h3>Torre 3 rodas</h3><p>Torre móvel apropriada para solos pesados.</p></li>
    <li class="sobe"><h3>Aro setorial</h3><p>Irrigação em ângulos menores que 360°, com setorização no painel 5005+.</p></li>
    <li class="sobe"><h3>Barreira</h3><p>Sistema mecânico para parar e inverter o sentido do pivô setorial.</p></li>
    <li class="sobe"><h3>Protetor de cabos</h3><p>Protege os cabos aéreos e dificulta furtos.</p></li>
  </ul>
</div></section>` + chamada(v) + rodape(v);
}

function carreteis(v) {
  const m = [['Modelo', '75', '90', '110', '125', '140', '140X'], ['Mangueira (mm)', '75', '90', '110', '125', '140', '140'], ['Comprimento (m)', 'até 300', 'até 370', 'até 380', 'até 450', 'até 350', 'até 470'], ['Pressão de entrada (mca)', '56-120', '60-120', '86-128', '80-120', '86-110', '86-110'], ['Vazão do aspersor (m³/h)', '27-45', '42-72', '88-107', '107-130', '119-160', '80-160'], ['Entre faixas (m)', '42-48', '54-66', '72-84', '78-90', '84-102', '84-102'], ['Área irrigada (ha)', 'até 20', 'até 40', 'até 55', 'até 65', 'até 80', 'até 100']];
  return head(v, 'carreteis', 'Carretéis enroladores', 'Carretéis enroladores autopropelidos KREBS de 75 a 140 mm, para 20 a 100 ha. Zincados, turbina de 2 rotores, câmbio de 2 ou 4 velocidades, uso com vinhaça.') + topo(v, 'carreteis') +
  cabPag('Carretéis enroladores', 'Poderosos, versáteis e fáceis de rebocar de uma área a outra.', ['carretel-campo', 'Carretel enrolador KREBS no campo']) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Autopropelidos')}<h2>Milho, cana, grama, cenoura, batata</h2>
  <p>Carretel (chassis e rolo), mangueira de polietileno de média densidade e carro porta-aspersor. Peças zincadas para mais segurança e durabilidade.</p>
  <p>Aplicam fertilizantes naturais, com ou sem biodigestor, e vinhaça em usinas e destilarias de álcool.</p></div>
  <figure class="sobe">${img('carretel-2', 'Carretel enrolador KREBS')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Vantagens')}<h2>Engenharia que dura no campo</h2></div>
  <ul class="ped">${[['cremalheira', 'Cremalheira fixa soldada'], ['turbina', 'Turbina de 2 rotores em alumínio'], ['t-soldado', 'T de entrada soldado'], ['freio', 'Freio por pino'], ['cambio', 'Câmbio de 2 ou 4 velocidades'], ['carretel-estrutura', 'Pintura epóxi a pó, curada em estufa']].map(p => `<li class="sobe">${img(p[0], p[1])}<b>${p[1]}</b></li>`).join('')}</ul>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Modelos')}<h2>De 20 a 100 hectares</h2><p>Acima de 110 mm, entrada dupla e pneus individuais de baixa compactação.</p></div>
  <div class="tabela-wrap sobe"><table class="tab"><thead><tr>${m[0].map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${m.slice(1).map(r => `<tr><th>${r[0]}</th>${r.slice(1).map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
</div></section>` + chamada(v) + rodape(v);
}

function tubos(v) {
  const pecas = [['p-estrutura', 'Estrutura'], ['p-pendurais', 'Pendurais'], ['p-mecanica', 'Mecânica'], ['p-aspersores', 'Aspersores'], ['p-acessorios', 'Acessórios'], ['p-tubos', 'Tubos e conexões']];
  return head(v, 'tubos', 'Tubos, conexões e peças', 'Tubos e conexões KREBS em aço galvanizado de 3 a 20 polegadas, engate rápido, KR e flange. Peças de reposição K+ Parts para pivôs e carretéis de várias marcas.') + topo(v, 'tubos') +
  cabPag('Tubos, conexões e peças', 'Líder em irrigação convencional desde 1978.', ['tubos-estoque', 'Estoque de tubos galvanizados KREBS']) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Aço galvanizado')}<h2>De 3 a 20 polegadas, com amplo estoque</h2>
  <p>Para irrigação convencional, sistemas de bombeamento e adutoras de projetos de microaspersão, gotejamento, carretéis e pivôs. Qualquer peça pode ser fabricada sob demanda a partir do seu projeto.</p></div>
  <figure class="sobe">${img('tubos', 'Tubos e conexões galvanizados')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Engates')}<h2>Três sistemas de engate</h2></div>
  <ul class="prods">${[['engate-rapido', 'Engate rápido', 'Engate sela de ótima mobilidade: irrigação convencional, cinturões verdes, tomate e adutoras de carretéis.'], ['engate-kr', 'Engate KR', 'Tipo abraçadeira, fixo e fácil de montar e desmontar. Citrus, café e mineração.'], ['flange', 'Engate flange', 'Montagem fixa para projetos que trabalham com alta pressão.']].map(p => `<li class="sobe">${foto(p[0], p[1])}<div><h3>${p[1]}</h3><p>${p[2]}</p></div></li>`).join('')}</ul>
</div></section>
<section class="sec" id="pecas"><div class="in">
  <div class="sec-cab sobe">${sobre('K+ Parts')}<h2>Peças de reposição para pivôs e carretéis</h2>
  <p>Percentímetros, motorredutores, redutores de roda, aspersores e componentes elétricos para pivôs de diversas marcas, com estoque amplo e rede de distribuidores em todo o Brasil.</p></div>
  <ul class="ped">${pecas.map(p => `<li class="sobe">${img(p[0], p[1])}<b>${p[1]}</b></li>`).join('')}</ul>
</div></section>` + chamada(v) + rodape(v);
}

function automacao(v) {
  return head(v, 'automacao', 'Automação', 'Automação KREBS: Kube by B-Hyve com a Orbit (grupo Husqvarna), comunicação M2M, Wi-Fi Mesh e Starlink. Rádio Agrowave até 15 km. Painéis e chaves de partida.') + topo(v, 'automacao') +
  cabPag('Automação', 'Automação que fala a língua do campo.', ['pivo-ceu', 'Pivô KREBS automatizado']) + `
<section class="sec"><div class="in app">
  <div class="sobe">${sobre('Kube by B-Hyve')}<h2>O pivô no seu celular</h2>
  <p>A KREBS uniu forças com a Orbit Irrigation, do grupo sueco Husqvarna, com mais de 2 milhões de dispositivos conectados, para levar telemetria aos pivôs e periféricos agrícolas.</p>
  ${checks(['Comunicação por M2M, Wi-Fi Mesh e Starlink, com latência de milissegundos', 'Monitoramento individual de cada torre', 'Alertas de falha, início e fim de ciclo no celular', 'Programa de irrigação, setores, lâminas e horário de pico', 'Controle de usuários e histórico de quem fez o quê, quando e onde', 'Vários pivôs, mesmo em propriedades diferentes'])}</div>
  <figure class="sobe">${img('kube-app', 'Aplicativo Kube by B-Hyve')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Painéis')}<h2>Do controle simples à irrigação setorial</h2>
  <p>Componentes de fornecedores mundiais e divisão própria de desenvolvimento. Compatíveis com diversas marcas e modelos de pivô.</p></div>
  <ul class="cards3">${[['Avanço e reversão', 'Sistema digital para o sentido de funcionamento do pivô.'], ['Bombas', 'Acionamento das bombas booster e injetora por setor.'], ['Pressostato', 'Configuração e customização da partida.'], ['Setor irrigável', 'Lâmina e canhão por setor do pivô.'], ['Programador horário', 'Início e fim de irrigação por dia da semana e horários de pico.'], ['Painel solar', 'Alimentação solar para periféricos no campo.']].map(c => `<li class="sobe"><h3>${c[0]}</h3><p>${c[1]}</p></li>`).join('')}</ul>
</div></section>
<section class="sec"><div class="in">
  <article class="maq"><div class="maq-foto sobe">${foto('painel-solar', 'Rádio Agrowave com painel solar')}</div><div class="sobe"><p class="maq-marca">Agrowave™</p><h2>Rádio controle a até 15 km</h2>
    <p>Aciona de uma sirene ou bomba d’água a um pivô ou motobomba. Modelos de 2 a 36 saídas digitais para monitorar o nível de um reservatório, ligar o bombeamento à distância ou abrir um registro.</p></div></article>
  <article class="maq"><div class="maq-foto sobe">${foto('painel', 'Painel e chave de partida KREBS')}</div><div class="sobe"><p class="maq-marca">Fabricação própria</p><h2>Chaves de partida</h2>
    <p>Gabinetes espaçosos com ventilação correta, amperímetros, voltímetros e relés de falta de fase.</p>
    ${checks(['Estrela-triângulo', 'Série paralela', 'Compensadoras', 'Softstart e inversores'])}</div></article>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Rua Krebsfer, 566, Valinhos - SP');
  return head(v, 'contato', 'Contato', 'KREBS: (19) 3119-4000, suporte (19) 3119-4040, krebs@krebs.com.br. Rua Krebsfer, 566, Valinhos/SP.') + topo(v, 'contato') +
  cabPag('Contato', 'Orçamentos, revendas e suporte técnico para pivôs e carretéis.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<span>Comercial <a href="${E.foneHref}">${E.fone}</a></span></li>
    <li>${ic('chave')}<span>Suporte <a href="${E.suporteHref}">${E.suporte}</a></span></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <iframe class="mapa" title="Mapa da KREBS em Valinhos/SP" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe></div>
  <div class="sobe caixa-form"><form class="form" data-email="${E.email}" data-assunto="Contato pelo site">
    <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>Telefone *<input name="fone" type="tel" required autocomplete="tel"></label></div>
    <div class="form-duas"><label>Cidade *<input name="cidade" required autocomplete="address-level2"></label><label>UF *<input name="uf" required maxlength="2" autocomplete="address-level1"></label></div>
    <label>E-mail *<input name="email" type="email" required autocomplete="email"></label>
    <label>Assunto<select name="assunto"><option>Orçamento de pivô</option><option>Orçamento de carretel</option><option>Tubos e conexões</option><option>Peças K+ Parts</option><option>Suporte pivôs</option><option>Suporte carretéis</option></select></label>
    <label>Mensagem *<textarea name="mensagem" rows="5" required></textarea></label>
    <button class="btn" type="submit">${ic('mail')} Enviar mensagem</button>
    <p class="form-nota">Abre o seu e-mail com a mensagem pronta.</p>
  </form></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'KREBS: pivôs de irrigação, carretéis enroladores, tubos e conexões galvanizados e automação. Valinhos/SP, desde 1966.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Sistemas de irrigação · Valinhos/SP')}
      <h1>O pivô <em>do Brasil.</em></h1>
      <p class="ha-sub">Pivôs, carretéis, tubos e conexões com aço ASTM e galvanização a fogo própria. O maior portfólio de irrigação do mercado brasileiro.</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'contato')}">Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'pivos')}">Conhecer os pivôs</a></p>
    </div>
    <div class="ha-prod">${imgTopo('drone-pivo', 'Pivô KREBS visto de drone')}<span class="ha-tag"><b>60 anos</b>de KREBS em 2026</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Desde 1966</span><span>${ic('check')}Galvanização a fogo própria</span><span>${ic('check')}Kube by B-Hyve</span><span>${ic('check')}Peças para várias marcas</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Produtos')}<h2>Da adutora ao celular do produtor</h2></div>
  ${cardsLinhas(v)}
</div></section>
<section class="lado">
  <figure>${img('produtor', 'Produtor em lavoura irrigada')}</figure>
  <div class="sobe">${sobre('Kube by B-Hyve')}<h2>Automação que fala a língua do campo</h2>
  <p>Com a Orbit, do grupo Husqvarna: comunicação M2M, Wi-Fi Mesh ou Starlink, alertas no celular e monitoramento de cada torre.</p>
  <p><a class="link-seta" href="${link(v, 'automacao')}">Ver automação ${ic('seta')}</a></p></div>
</section>
<section class="sec sec-escura"><div class="in">${sobre('KREBS em números')}<h2 class="sobe">Fábrica própria em Valinhos</h2>${numeros()}</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'KREBS: fabricante de pivôs e carretéis de irrigação com galvanização a fogo em forno elétrico vertical, única no Hemisfério Sul.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('lavoura', 'Pivô KREBS em lavoura')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('KREBS · desde 1966')}
    <h1>Irrigação feita <em>para durar.</em></h1>
    <p class="hb-sub">Aço ASTM, zinco 100% puro e a única galvanização em forno elétrico vertical do Hemisfério Sul.</p>
    <p class="ha-acoes"><a class="btn" href="${link(v, 'contato')}">Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'pivos')}">Pivôs</a></p>
    <div class="hb-selo"><div><b>60 anos</b><span>de KREBS</span></div><div><b>100 ha</b><span>com um carretel 140X</span></div><div><b>15 km</b><span>de alcance Agrowave</span></div></div>
  </div></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Linhas')}<h2>Pivôs, carretéis, tubos e automação</h2></div>
  ${cardsLinhas(v)}
</div></section>
<section class="lado">
  <figure>${img('galvanizacao', 'Galvanização a fogo da KREBS')}</figure>
  <div class="sobe">${sobre('Fábrica')}<h2>Do corte à galvanização</h2>
  <p>Corte a laser, solda, forjamento por indução, pintura epóxi e galvanização a fogo com camada mínima de 70 micra, tudo em 56.000 m² em Valinhos.</p>
  <p><a class="link-seta" href="${link(v, 'empresa')}#fabrica">Ver a fábrica ${ic('seta')}</a></p></div>
</section>
<section class="sec sec-escura"><div class="in">${sobre('Em números')}<h2 class="sobe">60 anos de indústria</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('No campo')}<h2>Pivôs e carretéis KREBS</h2></div>
  <div class="galeria">${[['pivo-lavoura', 'Pivô em lavoura'], ['carretel-campo', 'Carretel enrolador'], ['pivo-torre', 'Torre do pivô'], ['aspersor', 'Aspersor']].map(f => foto(f[0], f[1])).join('')}</div>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), pivos: pivos(v), carreteis: carreteis(v), tubos: tubos(v), automacao: automacao(v), contato: contato(v) });

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'KREBS', artigo: 'da', url: E.url, lang: 'pt', cor: '#d3161e', fundo: '#1d1d1b', claro: '#f3f3f1',
  fonteTitulo: "'Montserrat',system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: 'Clara, abre com o pivô visto de drone e leva às quatro linhas de produto.', pontos: ['Pivôs, carretéis, tubos e automação na home', 'Tabelas técnicas do catálogo', 'Kube by B-Hyve em destaque'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Grafite, abre com a lavoura irrigada e mostra a fábrica e a galvanização a fogo.', pontos: ['Lavoura em tela cheia', 'Fábrica e galvanização em destaque', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
