// Imeco (Novo Hamburgo/RS, 45 anos): grampeadores, grampos, pregos eletrosoldados em rolo, pinos, pinadores e peças de reposição.
// node clientes/imeco/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs imeco https://www.imeco.com.br/)
// Textos do site atual + fichas técnicas do catálogo PDF (2025, 16 páginas). Fotos: site atual e catálogo. Fonte dos títulos: Imeco Sans (a do próprio site).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));

const E = {
  nome: 'Imeco', url: 'https://imeco.overtus.com.br/', antigo: 'https://www.imeco.com.br/',
  fone: '(51) 3587-1900', foneHref: 'tel:+555135871900', wa: '(51) 99210-1541', waNum: '5551992101541',
  end: 'Rua dos Carvalhos, 223 · Bairro Ideal', cidade: 'Novo Hamburgo - RS',
  insta: 'https://www.instagram.com/imeco_oficial/', catalogo: 'https://www.imeco.com.br/catalogo-imeco.pdf', video: 'e7k8dWeTtJw',
  slogan: 'Confiança na fixação, rendimento nos resultados',
};
const ext = 'target="_blank" rel="noopener"';
const waLink = (msg = 'Olá! Vim pelo site da IMECO e gostaria de um orçamento.') => `https://wa.me/${E.waNum}?text=${encodeURIComponent(msg)}`;

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async"${extra}>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;

// ---------- dados (catálogo Imeco 2025) ----------
const AR = (consumo, dim) => ({ consumo, dim });
const GRAMPEADORES = [
  { slug: 'compacto-14-50', nome: '14/50 Compacto', tag: 'Industrial', para: 'Para grampos 14 de 16 até 50 mm', img: 'g-14-50',
    chamada: 'Projetado para minimizar o esforço físico do operador, vindo ao encontro das necessidades atuais das indústrias e operadores.',
    aplic: 'Montagem das estruturas dos estofados, camas box, móveis, embalagens de madeira, urnas funerárias, carretéis de madeira e construção civil.',
    itens: ['Menor peso, altura e comprimento da categoria', 'Silencioso', 'Acionamento sensível', 'Bico articulado', 'Empunhadura anatômica emborrachada'],
    nota: 'Possibilita maior rendimento do operador na montagem da estrutura de estofados e box para colchão.',
    cols: ['14/50'], linhas: [['Peso', '2,500 kg'], ['Carga no trilho', '160 grampos'], ['Grampo', '14'], ['Largura da coroa', '10,8 mm']], ar: AR('0,070 m³/min', '330 × 260 mm') },
  { slug: 'fixalev-2002', nome: 'Fixalev 2002', tag: 'Industrial', para: 'Para grampos 92 ou 90 de 15 a 32 mm', img: 'g-fixalev-2002',
    chamada: 'Projetado para dar mais velocidade de grampeação, vindo ao encontro das necessidades atuais de produtividade.',
    aplic: 'Fixações médias, como móveis, estofados (percintas de borracha e elásticas), lastros de camas, urnas funerárias, embalagens de madeira e caixas de frutas.',
    itens: ['Força', 'Velocidade', 'Durável e leve', 'Fácil manuseio', 'Empunhadura anatômica emborrachada'],
    cols: ['Fixalev 2002'], linhas: [['Peso', '1,500 kg'], ['Carga no trilho', '100 grampos'], ['Grampo', '92'], ['Largura da coroa', '9,0 mm']], ar: AR('0,028 m³/min', '250 × 170 mm') },
  { slug: 'compacto-pro-80-16', nome: '80/16 Compacto Pro', tag: 'Pro / Industrial', para: 'Para grampos 80 de 4 a 16 mm', img: 'g-80-16',
    chamada: 'Indicado para tapeçaria. Baixo custo, ótimo desempenho e tamanho compacto.',
    aplic: 'Tapeçarias, móveis, estofados, esquadrias, percintas elásticas, espumas, urnas funerárias, decorações, montagem de quadros e portas.',
    itens: ['Força de penetração até 16 mm', 'Velocidade', 'Leve e durável', 'Empunhadura anatômica'],
    extra: { img: 'g-dobrador-d8000', nome: 'Dobrador 80/16 Compacto · D-8000', txt: 'Opção com dobrador, com dispositivo para dobrar as pontas dos grampos e fixar produtos em camadas.' },
    cols: ['80/16'], linhas: [['Peso', '0,865 kg'], ['Carga no trilho', '130 grampos'], ['Grampo', '80'], ['Largura da coroa', '12,9 mm']], ar: AR('0,022 m³/min', '200 × 160 mm') },
  { slug: 'multigramp-2000', nome: 'Multigramp 2000 M1 · M2', tag: 'Industrial', para: 'Para grampos PCN e PCS', img: 'g-multigramp',
    chamada: 'Resistente e durável, com força e velocidade para peças pequenas e delicadas.',
    aplic: 'Calçados, vassouras, artesanatos, quadros, brinquedos, pincéis, móveis de vime, juncos e caixas de frutas.',
    itens: ['Resistente e durável', 'Força e velocidade', 'Duas versões: M1 (PCN) e M2 (PCS)'],
    cols: ['M1', 'M2'], linhas: [['Peso', '0,900 kg', '0,980 kg'], ['Carga no trilho', '130 grampos', '130 grampos'], ['Grampo', 'PCN', 'PCS'], ['Largura da coroa', '5,2 mm', '8,4 mm']], ar: AR('0,022 m³/min', '220 × 150 mm') },
  { slug: 'novo-robusto-2000', nome: 'NR · Novo Robusto 2000', tag: 'Industrial', para: 'Para grampos 14 ou GS até 50 mm', img: 'g-nr-2000',
    chamada: 'O grampeador com mais força na sua categoria. Indicado para madeiras bem duras.',
    aplic: 'Desenvolvido para a fabricação de estruturas de estofados e camas box.',
    itens: ['Mais força na categoria', 'Resistente e durável', 'Velocidade', 'Empunhadura anatômica emborrachada'],
    cols: ['NR 14', 'NR GS'], linhas: [['Peso', '2,980 kg', '3,050 kg'], ['Carga no trilho', '160 grampos', '160 grampos'], ['Grampo', '14', 'GS'], ['Largura da coroa', '10,8 mm', '12,5 mm']], ar: AR('0,081 m³/min', '350 × 270 mm') },
  { slug: 'fixafort-f7', nome: 'Fixafort F7', tag: 'Industrial', para: 'Para grampos GSW de 13 a 25 mm', img: 'g-fixafort-f7',
    chamada: 'Indicado para juntar madeiras e para a montagem de embalagens.',
    aplic: 'Juntar madeiras, quadros de portas, montagem de caixas e embalagens.',
    itens: ['Coroa larga de 23,5 mm', 'Empunhadura de borracha', 'Uso industrial contínuo'],
    cols: ['F7'], linhas: [['Peso', '2,280 kg'], ['Carga no trilho', '150 grampos'], ['Grampo', 'GSW'], ['Largura da coroa', '23,5 mm']], ar: AR('0,028 m³/min', '335 × 190 mm') },
];
const PINADORES = [
  { slug: 'pinador-f-50', nome: 'Pinador F-50', tag: 'Pro / Industrial', para: 'Para pinos F de 10 a 50 mm (fino)', img: 'p-f50',
    chamada: 'Indicado para auxiliar na montagem de móveis sob medida, com excelente acabamento dos pinos com cabeça.',
    aplic: 'Madeiras médias e macias: montagem de gavetas, cadeiras, esquadrias, vimes, embalagens, móveis decorativos e molduras.',
    itens: ['Pinos com cabeça ref. F (fino)', 'Excelente acabamento', 'Empunhadura anatômica emborrachada'],
    cols: ['F-50'], linhas: [['Peso', '1,530 kg'], ['Carga no trilho', '100 pinos'], ['Pino', 'F'], ['Largura da cabeça', '2,0 mm'], ['Laminação do pino', '1,00 × 1,30 mm']], ar: AR('0,034 m³/min', '245 × 235 mm') },
  { slug: 'pinador-t-50', nome: 'Pinador T-50', tag: 'Pro / Industrial', para: 'Para pinos T de 15 a 50 mm (grosso)', img: 'p-t50',
    chamada: 'Indicado para a fabricação de móveis de madeiras duras, com maior força de penetração.',
    aplic: 'Madeiras médias e duras: gavetas, cadeiras, esquadrias, vimes, embalagens, móveis decorativos, casas infantis e balcões frigoríficos.',
    itens: ['Pinos com cabeça ref. T (grosso)', 'Para fixações mais pesadas', 'Maior força de penetração'],
    cols: ['T-50'], linhas: [['Peso', '2,000 kg'], ['Carga no trilho', '100 pinos'], ['Pino', 'T'], ['Largura da cabeça', '2,8 mm'], ['Laminação do pino', '1,40 × 1,60 mm']], ar: AR('0,034 m³/min', '285 × 240 mm') },
];
// grampo × máquina (tabela "Completa linha de grampos industriais" do catálogo)
const GRAMPOS = [
  { ref: 'PCN', coroa: 5.2, min: 10, max: 19, maq: 'Multigramp M1 2000' },
  { ref: 'PCS', coroa: 8.4, min: 10, max: 19, maq: 'Multigramp M2 2000' },
  { ref: '80', coroa: 12.9, min: 4, max: 16, maq: '80/16 Compacto Pro' },
  { ref: '92 · 90', coroa: 9.0, min: 15, max: 32, maq: 'Fixalev 2002' },
  { ref: '14', coroa: 10.8, min: 16, max: 50, maq: '14/50 Compacto · NR 14 2000' },
  { ref: 'GS', coroa: 12.5, min: 27, max: 50, maq: 'NR GS 2000' },
  { ref: 'GSW', coroa: 23.5, min: 13, max: 25, maq: 'Fixafort F7' },
];
const PINOS = [
  { ref: 'F', nome: 'Pino F (fino)', cab: '2,0 mm', lam: '1,00 × 1,30 mm', med: '10 a 50 mm', maq: 'Pinador F-50', uso: 'Madeiras médias e macias, acabamento discreto.' },
  { ref: 'T', nome: 'Pino T (grosso)', cab: '2,8 mm', lam: '1,40 × 1,60 mm', med: '15 a 50 mm', maq: 'Pinador T-50', uso: 'Madeiras médias e duras, fixações mais pesadas.' },
];
const PREGOS = [['2,1', '5,0', '25 a 50 mm', '350'], ['2,3', '5,3', '35 a 55 mm', '350'], ['2,5', '6,0', '40 a 70 mm', '300'], ['2,7', '6,4', '50 a 80 mm', '250'], ['3,0', '7,0', '50 a 90 mm', '200']];
const PREGADORES = {
  industrial: [['C23/57', '2,6 kg', '2,1 a 2,3 mm', '25 a 57 mm', '350'], ['C29/65', '2,6 kg', '2,5 a 2,9 mm', '35 a 65 mm', '300'], ['C29/70', '3,6 kg', '2,3 a 2,9 mm', '45 a 70 mm', '300'], ['C33/83', '3,9 kg', '2,5 a 3,3 mm', '50 a 83 mm', '300'], ['C33/90', '3,9 kg', '2,5 a 3,8 mm', '45 a 90 mm', '300'], ['C38/100', '5,5 kg', '2,5 a 3,8 mm', '55 a 100 mm', '300'], ['C38/130', '5,79 kg', '3,0 a 3,8 mm', '80 a 130 mm', '300'], ['C31/45', '2,3 kg', '3,0 mm', '19 a 45 mm', '120']],
  profissional: [['PDK 55', '2,6 kg', '2,1 a 2,3 mm', '25 a 57 mm', '350'], ['PDK 70', '3,6 kg', '2,3 a 2,9 mm', '45 a 70 mm', '300'], ['PDK 80', '3,6 kg', '2,5 a 3,1 mm', '50 a 83 mm', '300']],
};
const LINHAS = [
  { slug: 'grampeadores', n: 'Grampeadores', img: 'grampeadores', t: 'Projetados para proporcionar fixação ágil e precisa, nossos grampeadores pneumáticos garantem alto desempenho e redução de falhas na linha de produção. Ideais para móveis, estofados, pallets e embalagens de madeira.', q: '6 modelos' },
  { slug: 'grampos', n: 'Grampos', img: 'grampos', t: 'Fabricados com extrema precisão e com materiais de alta resistência, nossos grampos proporcionam encaixes seguros e duradouros, reduzindo retrabalho e otimizando a produtividade.', q: '7 referências' },
  { slug: 'pregos-em-rolo', n: 'Pregos eletrosoldados em rolo', img: 'pregos-em-rolo', t: 'Pregos eletrosoldados de precisão para pallets, caixas de madeira e estruturas industriais. Compatíveis com equipamentos automáticos, com maior rendimento e menos desperdício.', q: '+ pregadores' },
  { slug: 'pinos', n: 'Pinos e pinadores', img: 'pinos', t: 'Perfeitos para montagens precisas e resistentes, os pinos IMECO garantem fixação eficiente em móveis, molduras e componentes de madeira.', q: 'F e T' },
  { slug: 'pecas-de-reposicao', n: 'Peças de reposição', img: 'pecas-reposicao', t: 'Peças originais IMECO para grampeadores industriais pneumáticos: aumentam a vida útil dos equipamentos e reduzem os custos com manutenção.', q: 'originais' },
];
const SEGMENTOS = [
  { n: 'Estofados e camas box', t: 'Estruturas de estofados, lastros de cama, percintas de borracha e elásticas.', m: [['14/50 Compacto', 'grampeadores', 'compacto-14-50'], ['NR Novo Robusto 2000', 'grampeadores', 'novo-robusto-2000'], ['Fixalev 2002', 'grampeadores', 'fixalev-2002']] },
  { n: 'Pallets e embalagens de madeira', t: 'Pallets, engradados, caixas e embalagens de madeira em alta escala.', m: [['Pregadores pneumáticos', 'pregos-em-rolo', 'pregadores'], ['Pregos em rolo', 'pregos-em-rolo', 'pregos'], ['Fixafort F7', 'grampeadores', 'fixafort-f7']] },
  { n: 'Caixas de frutas', t: 'Fixação rápida de ripas finas, com velocidade de grampeação.', m: [['Fixalev 2002', 'grampeadores', 'fixalev-2002'], ['Multigramp 2000', 'grampeadores', 'multigramp-2000']] },
  { n: 'Móveis sob medida e cadeiras', t: 'Gavetas, cadeiras, molduras e móveis decorativos com acabamento limpo.', m: [['Pinador F-50', 'pinos', 'pinador-f-50'], ['Pinador T-50', 'pinos', 'pinador-t-50']] },
  { n: 'Tapeçaria, quadros e portas', t: 'Tapeçarias, espumas, esquadrias, decorações e montagem de quadros.', m: [['80/16 Compacto Pro', 'grampeadores', 'compacto-pro-80-16'], ['Multigramp 2000', 'grampeadores', 'multigramp-2000']] },
  { n: 'Construção civil', t: 'Formas para concreto e casas pré-fabricadas.', m: [['Pregadores pneumáticos', 'pregos-em-rolo', 'pregadores'], ['14/50 Compacto', 'grampeadores', 'compacto-14-50']] },
];
const PORQUE = [
  ['produtividade', 'Produtividade sem interrupções', 'Fixação firme, segura e precisa, reduzindo falhas e maximizando a eficiência da produção. Menos retrabalho, mais resultados.'],
  ['durabilidade', 'Durabilidade superior', 'Materiais de alta resistência, projetados para suportar uso intenso e prolongar a vida útil dos equipamentos e das fixações.'],
  ['versatilidade', 'Versatilidade para diferentes setores', 'Soluções sob medida para móveis, estofados, pallets e embalagens de madeira, com encaixes seguros e acabamento profissional.'],
  ['economia', 'Economia real, mais lucro', 'Maior rendimento, menos desperdício, menos manutenção e mais produtividade. Produtos de alto desempenho que reduzem custos operacionais.'],
];

// ---------- moldura ----------
const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'grampeadores', n: 'Grampeadores' },
  { slug: 'grampos', n: 'Grampos' },
  { slug: 'pregos-em-rolo', n: 'Pregos em rolo' },
  { slug: 'pinos', n: 'Pinos' },
  { slug: 'pecas-de-reposicao', n: 'Peças' },
  { slug: 'a-imeco', n: 'A Imeco' },
];
export const nomesVersao = { a: 'Linha de produção', b: 'Catálogo' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'IMECO | Grampos, pregos e grampeadores industriais' : `${titulo} | IMECO`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: v === 'a' ? '#00427A' : '#C21E23' });
const marca = branco => `<img class="logo" src="/assets/img/logo${branco ? '-branco' : ''}.webp" alt="IMECO, ${E.slogan.toLowerCase()}" width="600" height="172">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span>${E.slogan}</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="${waLink()}" ${ext}>${icWa()}${E.wa}</a><a href="${E.insta}" ${ext} aria-label="Instagram da Imeco">${ic('insta')}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="IMECO, página inicial">${marca(false)}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}<li class="menu-orc"><a class="btn btn-orc" href="${link(v, 'orcamento')}">Orçamento</a></li></ul></nav>
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
    <div class="rod-marca">${marca(true)}
      <p>Fabricante 100% nacional de ferramentas pneumáticas e elementos de fixação. Há 45 anos em Novo Hamburgo/RS, com distribuição e suporte técnico em todo o Brasil.</p></div>
    <div><h3>Produtos</h3><ul>${LINHAS.map(l => `<li><a href="${link(v, l.slug)}">${l.n}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${icWa()}<a href="${waLink()}" ${ext}>${E.wa}</a></li>
      <li>${ic('insta')}<a href="${E.insta}" ${ext}>@imeco_oficial</a></li>
    </ul></div>
    <div><h3>Imeco</h3><ul>
      <li><a href="${link(v, 'a-imeco')}">Quem somos</a></li>
      <li><a href="${link(v, 'orcamento')}">Solicitar orçamento</a></li>
      <li><a href="${E.catalogo}" ${ext}>Catálogo completo (PDF)</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© 2026 IMECO · Todos os direitos reservados</span><span>Novo Hamburgo · RS</span></div></div>
</footer>
<a class="wa-flutua" href="${waLink()}" ${ext} aria-label="Falar com a Imeco no WhatsApp">${icWa()}</a>
</body>
</html>`;
}
const cabPag = (v, titulo, sub, foto, kicker) => `<section class="cab-pag${foto ? ' cab-foto' : ''}">${foto ? `<div class="cp-foto">${imgTopo(foto, '')}</div>` : ''}<div class="in">
  <nav class="trilha" aria-label="Você está em"><a href="${link(v, 'index')}">Início</a><span>/</span>${titulo}</nav>
  ${kicker ? `<p class="cp-tag">${kicker}</p>` : ''}<h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;
const chamada = (v, t = 'Fale com quem fabrica.', s = 'Nossa equipe indica o grampeador, o grampo ou o prego certo para a sua linha de produção. Rápido, simples e sem compromisso.') => `<section class="chamada"><div class="in ch-grade">
  <div><h2>${t}</h2><p>${s}</p></div>
  <div class="ch-acoes"><a class="btn btn-wa" href="${waLink()}" ${ext}>${icWa()} WhatsApp</a><a class="btn btn-orc" href="${link(v, 'orcamento')}">Solicitar orçamento</a></div>
</div></section>`;

// ---------- blocos ----------
function ficha(m, i) {
  const multi = m.cols.length > 1;
  return `<article class="ficha${i % 2 ? ' ficha-inv' : ''} sobe" id="${m.slug}">
  <div class="fi-palco">
    <span class="fi-tag">${m.tag}</span>
    <a href="/assets/img/${m.img}.webp" data-foto="${esc(m.nome)}">${img(m.img, `Grampeador ${m.nome}`)}</a>
    ${m.extra ? `<div class="fi-extra">${img(m.extra.img, m.extra.nome)}<p><b>${m.extra.nome}</b>${m.extra.txt}</p></div>` : ''}
  </div>
  <div class="fi-txt">
    <h3><span>${m.nome}</span></h3>
    <p class="fi-para">${m.para}</p>
    <p class="fi-chamada">${m.chamada}</p>
    <p><b>Aplicações:</b> ${m.aplic}</p>
    <ul class="fi-itens">${m.itens.map(x => `<li>${x}</li>`).join('')}</ul>
    ${m.nota ? `<p class="fi-nota">${m.nota}</p>` : ''}
    <table class="tab tab-ficha${multi ? ' tab-2' : ''}"><thead><tr><th scope="col">Modelo</th>${m.cols.map(c => `<th scope="col">${c}</th>`).join('')}</tr></thead>
    <tbody>${m.linhas.map(l => `<tr><th scope="row">${l[0]}</th>${l.slice(1).map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table>
    <dl class="fi-ar"><div><dt>Consumo de ar</dt><dd>${m.ar.consumo}</dd></div><div><dt>Pressão de trabalho</dt><dd>90 a 110 lbs/pol²</dd></div><div><dt>Dimensões (C × A)</dt><dd>${m.ar.dim}</dd></div></dl>
    <a class="link-seta" href="${waLink(`Olá! Vim pelo site da IMECO e gostaria de um orçamento do ${m.nome}.`)}" ${ext}>Pedir orçamento do ${m.nome} ${ic('seta')}</a>
  </div>
</article>`;
}
const indice = lista => `<nav class="indice" aria-label="Modelos"><ul>${lista.map(m => `<li><a href="#${m.slug}">${img(m.img, '')}<span>${m.nome}</span></a></li>`).join('')}</ul></nav>`;

// grampos desenhados em escala (coroa × comprimento máximo)
function desenhoGrampos() {
  const k = 3.2;
  return `<ul class="desenho-grampos">${GRAMPOS.map(g => {
    const w = g.coroa * k, h = g.max * k, hmin = g.min * k;
    return `<li class="sobe"><svg viewBox="0 0 ${w + 30} ${h + 24}" width="${w + 30}" height="${h + 24}" aria-hidden="true">
      <path d="M8 ${h + 6}V8h${w}v${h - 2}" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="M${w + 14} 8v${hmin}" stroke="var(--destaque)" stroke-width="3"/><path d="M${w + 14} ${8 + hmin}v${h - hmin}" stroke="var(--destaque)" stroke-width="3" stroke-dasharray="3 3"/>
      <path d="M8 ${h + 16}h${w}" stroke="currentColor" stroke-width="1"/></svg>
      <b>${g.ref}</b><span>coroa ${String(g.coroa).replace('.', ',')} mm</span><span>${g.min} a ${g.max} mm</span><i>${g.maq}</i></li>`;
  }).join('')}</ul>`;
}
const tabela = (cab, linhas, cls = '') => `<div class="tab-rola"><table class="tab ${cls}"><thead><tr>${cab.map(c => `<th scope="col">${c}</th>`).join('')}</tr></thead><tbody>${linhas.map(l => `<tr>${l.map((x, i) => i ? `<td>${x}</td>` : `<th scope="row">${x}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;

const linhasProdutos = v => `<ul class="linhas">${LINHAS.map((l, i) => `<li class="sobe l-${i}"><a href="${link(v, l.slug)}"><span class="l-img">${img(l.img, l.n)}</span><span class="l-txt"><i>${l.q}</i><b>${l.n}</b><span>${l.t}</span><em>Ver ${l.n.toLowerCase()} ${ic('seta')}</em></span></a></li>`).join('')}</ul>`;
const segmentos = v => `<ol class="segmentos">${SEGMENTOS.map((s, i) => `<li class="sobe"><span class="sg-n">${String(i + 1).padStart(2, '0')}</span><div class="sg-txt"><h3>${s.n}</h3><p>${s.t}</p></div><ul class="sg-maq">${s.m.map(m => `<li><a href="${link(v, m[1])}#${m[2]}">${m[0]}</a></li>`).join('')}</ul></li>`).join('')}</ol>`;
const porque = v => `<ul class="porque">${PORQUE.map(p => `<li class="sobe"><img src="/assets/img/ic-${v}-${p[0]}.svg" alt="" width="72" height="72" loading="lazy"><h3>${p[1]}</h3><p>${p[2]}</p></li>`).join('')}</ul>`;
const video = () => `<div class="video"><button class="video-facade" data-video-id="${E.video}" aria-label="Assistir ao vídeo institucional da IMECO">${img('video-capa', '')}<span class="video-play">${'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>'}</span></button></div>
<script>document.querySelectorAll('.video-facade').forEach(b=>b.addEventListener('click',()=>{const f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+b.dataset.videoId+'?autoplay=1';f.allow='autoplay; encrypted-media; picture-in-picture';f.allowFullscreen=true;f.title='Vídeo institucional IMECO';b.replaceWith(f)}))</script>`;
const premio = () => `<div class="premio sobe">${img('trofeu', 'Selo Top Móbile 1º lugar')}<div><p class="pr-txt"><b>Top Móbile, por 18 anos a marca mais lembrada.</b> 18ª edição, 2023. Dividimos esse reconhecimento com os clientes e demais partes envolvidas.</p></div></div>`;
const catalogoFaixa = () => `<section class="faixa-catalogo"><div class="in fc-grade">
  <div class="fc-capa">${img('capa-catalogo', 'Capa do catálogo IMECO')}</div>
  <div><h2>Catálogo completo IMECO</h2><p>Fichas técnicas de todos os grampeadores, pinadores, pregadores, tabelas de grampos e pregos e a sugestão de rede de ar. PDF · 16 páginas.</p>
  <a class="btn btn-escuro" href="${E.catalogo}" ${ext}>Baixar catálogo completo ${ic('seta')}</a></div>
</div></section>`;
const mapa = () => `<iframe class="mapa" title="Mapa: IMECO em Novo Hamburgo" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent('Rua dos Carvalhos, 223, Ideal, Novo Hamburgo - RS')}&output=embed"></iframe>`;

const opcoes = (l) => l.map(x => `<option>${x}</option>`).join('');
const formulario = () => `<form class="form form-orc" data-wa="Olá! Vim pelo site da IMECO e gostaria de um orçamento." data-numero="${E.waNum}">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Nome da empresa*<input name="empresa" required autocomplete="organization"></label></div>
  <div class="form-duas"><label>WhatsApp*<input name="whatsapp" required type="tel" autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <div class="form-duas"><label>CNPJ<input name="cnpj" inputmode="numeric"></label><label>Produto de interesse<select name="produto">${opcoes(['Grampos', 'Pregos', 'Máquinas', 'Pinos', 'Peças de reposição'])}</select></label></div>
  <div class="form-duas"><label>Qual o seu segmento<select name="segmento">${opcoes(['Fabricantes de estofados', 'Fabricantes de camas box para colchões', 'Pallet/Paletes', 'Embalagens de madeira', 'Caixas de frutas', 'Fabricantes de cadeiras', 'Marcenaria/móveis sob medida', 'Distribuidor', 'Outros'])}</select></label><label>Melhor forma de contato<select name="contato">${opcoes(['WhatsApp', 'Telefone', 'E-mail'])}</select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="3" placeholder="Modelo, quantidade, medida do grampo ou do prego..."></textarea></label>
  <button class="btn btn-orc" type="submit">${icWa()} Enviar pelo WhatsApp</button>
  <p class="form-nota">Os dados enviados são usados apenas para responder a este contato. Não são compartilhados com terceiros.</p>
</form>`;

// ---------- páginas internas ----------
function pagGrampeadores(v) {
  return head(v, 'grampeadores', 'Grampeadores pneumáticos', 'Grampeadores pneumáticos IMECO: 14/50 Compacto, Fixalev 2002, 80/16 Compacto Pro, Multigramp 2000, NR Novo Robusto 2000 e Fixafort F7, com ficha técnica.') + topo(v, 'grampeadores') +
  cabPag(v, 'Grampeadores pneumáticos', 'Fixação ágil e precisa para móveis, estofados, pallets e embalagens de madeira. Seis modelos fabricados em Novo Hamburgo, com peças de reposição originais.', 'fabrica-montagem', 'Fabricação nacional') + `
<section class="sec"><div class="in">${indice(GRAMPEADORES)}
  <div class="fichas">${GRAMPEADORES.map(ficha).join('')}</div>
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <div class="sobe">${sobre('Linhas Imeco')}<h2>Imeco Pro e Imeco Industrial</h2>
  <p><b>Imeco Pro:</b> ferramentas com desempenho profissional para uso diário.</p>
  <p><b>Imeco Industrial:</b> ferramentas com desempenho industrial para uso diário e intensivo e alta escala de produção.</p>
  <p><a class="link-seta" href="${link(v, 'grampos')}">Qual grampo usar em cada máquina ${ic('seta')}</a></p></div>
  <figure class="sobe foto-moldura">${img('foto-uso-cores', 'Grampeadores IMECO em uso na montagem de móveis')}</figure>
</div></section>` + chamada(v) + rodape(v);
}
function pagGrampos(v) {
  return head(v, 'grampos', 'Grampos industriais', 'Linha completa de grampos industriais IMECO: PCN, PCS, 80, 92, 90, 14, GS e GSW, com a máquina indicada para cada referência.') + topo(v, 'grampos') +
  cabPag(v, 'Grampos industriais', 'Fabricados com extrema precisão e materiais de alta resistência: encaixes seguros e duradouros, menos retrabalho e maior vida útil das ferramentas.', null, 'Completa linha de grampos') + `
<section class="sec"><div class="in duas duas-largo">
  <div class="sobe">${sobre('Referências')}<h2>Cada grampo, na escala real da sua coroa</h2>
  <p>A largura da coroa e o comprimento definem a firmeza da fixação. Abaixo, as referências IMECO desenhadas em proporção, com o comprimento mínimo (traço cheio) e o máximo (tracejado) de cada uma.</p></div>
  <figure class="sobe">${img('grampos-linha', 'Pentes de grampos IMECO de várias referências')}</figure>
</div>
<div class="in">${desenhoGrampos()}</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Tabela de compatibilidade')}<h2>Qual grampo vai em cada máquina</h2></div>
  ${tabela(['Grampo', 'Largura da coroa', 'Comprimentos', 'Máquina IMECO'], GRAMPOS.map(g => [g.ref, `${String(g.coroa).replace('.', ',')} mm`, `${g.min} a ${g.max} mm`, g.maq]))}
  <p class="tab-nota">Para qualquer referência de grampo que não estiver no catálogo, consulte a nossa equipe.</p>
</div></section>
<section class="sec"><div class="in duas">
  <figure class="sobe foto-moldura">${img('foto-clientes-2', 'Operador grampeando estrutura de madeira')}</figure>
  <div class="sobe">${sobre('Na sua linha')}<h2>Acabamento impecável, ferramenta que dura mais</h2>
  <p>Ideais para a fixação de estofados, móveis e embalagens de madeira. Grampo de qualidade evita travamentos no trilho e desgaste precoce do grampeador.</p>
  <p><a class="link-seta" href="${link(v, 'grampeadores')}">Ver grampeadores ${ic('seta')}</a></p></div>
</div></section>` + chamada(v) + rodape(v);
}
function pagPregos(v) {
  const tabP = (l, n) => tabela(['Modelo', 'Peso', 'Diâmetro dos pregos', 'Comprimento dos pregos', 'Pregos por rolo (máx.)'], l, n);
  return head(v, 'pregos-em-rolo', 'Pregos eletrosoldados em rolo e pregadores', 'Pregos eletrosoldados em rolo IMECO (liso, anelado e espiral) e pregadores pneumáticos para pallets, engradados, embalagens e construção civil.') + topo(v, 'pregos-em-rolo') +
  cabPag(v, 'Pregos eletrosoldados em rolo', 'Firmeza e estabilidade para pallets, caixas de madeira e estruturas industriais. Compatíveis com equipamentos automáticos.', 'fundo-grampos', 'Pregos e pregadores') + `
<section class="sec" id="pregos"><div class="in duas">
  <div class="sobe">${sobre('Pregos em rolo')}<h2>Liso, anelado e espiral (Ardox)</h2>
  <p>Desenvolvidos para aplicações exigentes, nossos pregos eletrosoldados de precisão oferecem firmeza e estabilidade e proporcionam maior rendimento com menos desperdício.</p>
  <dl class="dados-rapidos"><div><dt>Diâmetros</dt><dd>2,1 a 3,0 mm</dd></div><div><dt>Comprimentos</dt><dd>25 a 90 mm</dd></div><div><dt>Pontas</dt><dd>com e sem ponta</dd></div></dl>
  <p class="tab-nota">Comprimentos e diâmetros especiais sob consulta.</p></div>
  <figure class="sobe">${img('pregos-em-rolo', 'Rolos de pregos eletrosoldados IMECO')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Tabela de pregos')}<h2>Medidas disponíveis</h2></div>
  <figure class="pregos-tipos sobe">${img('pregos-tipos', 'Pregos liso, anelado e espiral')}<figcaption><span>Liso</span><span>Anelado</span><span>Espiral (Ardox)</span></figcaption></figure>
  ${tabela(['Diâmetro do arame', 'Diâmetro da cabeça (±0,1 mm)', 'Comprimento', 'Pregos por rolo'], PREGOS.map(p => [`${p[0]} mm`, `${p[1]} mm`, p[2], p[3]]))}
</div></section>
<section class="sec" id="pregadores"><div class="in">
  <div class="duas sobe">
    <div>${sobre('Pregadores pneumáticos')}<h2>Para grandes demandas</h2>
    <p>As ferramentas pneumáticas da Detack suportam a pressão de grandes demandas. Os pregadores têm desempenho comprovado no cotidiano da fabricação de pallets, engradados, embalagens de madeira, móveis diversos e armação de estofados, camas e colchões.</p>
    <p><b>Na construção civil:</b> formas para concreto e casas pré-fabricadas.</p></div>
    <div class="pregadores-fotos">${img('pregador-detack', 'Pregador pneumático da linha industrial')}${img('pregador-pdk', 'Pregador pneumático da linha profissional PDK')}</div>
  </div>
  <h3 class="tab-tit"><span>Linha industrial</span></h3>${tabP(PREGADORES.industrial)}
  <h3 class="tab-tit tab-tit-2"><span>Linha profissional</span></h3>${tabP(PREGADORES.profissional)}
  <p class="tab-nota">Para qualquer referência de prego que não estiver no catálogo, consulte a nossa equipe.</p>
</div></section>
<section class="sec sec-foto"><div class="sf-foto">${img('foto-pregador-uso', 'Operador usando pregador pneumático na montagem de pallets')}</div><div class="in"><div class="sf-txt sobe"><h2>Pallets e embalagens em alta escala</h2><p>Prego certo, pregador certo e suporte técnico em todo o Brasil para a sua produção não parar.</p><a class="btn btn-orc" href="${link(v, 'orcamento')}">Solicitar orçamento</a></div></div></section>
` + rodape(v);
}
function pagPinos(v) {
  return head(v, 'pinos', 'Pinos e pinadores', 'Pinos IMECO com cabeça F (fino) e T (grosso) e pinadores F-50 e T-50 para móveis sob medida, cadeiras, gavetas e molduras.') + topo(v, 'pinos') +
  cabPag(v, 'Pinos e pinadores', 'Montagens precisas e resistentes em móveis, molduras e componentes de madeira, com materiais de alta qualidade que minimizam quebras e falhas.', null, 'Pinos com cabeça') + `
<section class="sec"><div class="in">
  <ul class="pinos-dois">${PINOS.map(p => `<li class="sobe"><span class="pn-ref">${p.ref}</span><div><h2>${p.nome}</h2><p>${p.uso}</p>
    <dl class="dados-rapidos"><div><dt>Comprimentos</dt><dd>${p.med}</dd></div><div><dt>Cabeça</dt><dd>${p.cab}</dd></div><div><dt>Laminação</dt><dd>${p.lam}</dd></div></dl><p class="pn-maq">Máquina: <b>${p.maq}</b></p></div></li>`).join('')}</ul>
  <figure class="pinos-foto sobe">${img('pinos', 'Pentes de pinos IMECO')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Pinadores')}<h2>F-50 e T-50</h2></div>
  <div class="fichas">${PINADORES.map(ficha).join('')}</div>
</div></section>` + chamada(v) + rodape(v);
}
function pagPecas(v) {
  const rede = [
    ['Tubo galvanizado de 50 mm', 'Linha principal com 3% de caimento, para a água escoar para longe das ferramentas.'],
    ['Descidas de 25 mm', 'Saídas pela parte de cima da linha principal, com purgador na ponta para drenar a umidade.'],
    ['Filtro regulador lubrificador', 'O FRL o mais próximo possível do grampeador, com a mangueira mais curta possível (7 m).'],
    ['Mangueira de 6 a 12 mm', 'Diâmetro interno mínimo de 6 mm (¼") para grampeadores pequenos e médios e até 12 mm (½") para os grandes.'],
    ['Pressão de 90 a 110 lbs/pol²', 'Regule conforme o tamanho do grampo e a dureza do material. Use óleo lubrificante não agressivo à borracha.'],
  ];
  return head(v, 'pecas-de-reposicao', 'Peças de reposição originais', 'Peças originais IMECO para grampeadores industriais pneumáticos e sugestão de rede de ar para aumentar a vida útil das ferramentas.') + topo(v, 'pecas-de-reposicao') +
  cabPag(v, 'Peças de reposição originais', 'Manutenção preventiva é produtividade garantida. Peças originais aumentam a vida útil dos equipamentos e reduzem os custos com manutenção.', null, 'Assistência técnica') + `
<section class="sec"><div class="in duas">
  <figure class="sobe pecas-foto">${img('pecas-originais', 'Grampeador IMECO desmontado com todas as peças originais')}</figure>
  <div class="sobe">${sobre('Completa linha de peças originais')}<h2>Sua linha de produção sempre ativa</h2>
  <p>As peças originais IMECO para grampeadores industriais pneumáticos aumentam a vida útil dos equipamentos e reduzem custos com manutenção. Trabalhe com máxima eficiência.</p>
  <ul class="fi-itens"><li><b>Imeco Pro:</b> ferramentas com desempenho profissional para uso diário</li><li><b>Imeco Industrial:</b> uso diário e intensivo e alta escala de produção</li><li>Suporte técnico comprometido em todo o território nacional</li></ul>
  <a class="btn btn-orc" href="${waLink('Olá! Vim pelo site da IMECO e preciso de peças de reposição.')}" ${ext}>${icWa()} Pedir peças pelo WhatsApp</a></div>
</div></section>
<section class="sec sec-rede"><div class="in">
  <div class="sec-cab sobe">${sobre('Sugestão para uma rede de ar')}<h2>A vida útil do grampeador começa no compressor</h2>
  <p>A vida útil dos grampeadores pneumáticos e de outras ferramentas com anéis de borracha está diretamente ligada à boa instalação do sistema de ar e ao cuidado no uso.</p></div>
  <div class="rede">
    <figure class="sobe">${img('rede-de-ar', 'Esquema de rede de ar sugerida pela Imeco')}</figure>
    <ol class="rede-passos">${rede.map((r, i) => `<li class="sobe"><span>${i + 1}</span><div><h3>${r[0]}</h3><p>${r[1]}</p></div></li>`).join('')}</ol>
  </div>
</div></section>` + chamada(v, 'Precisa de uma peça?', 'Informe o modelo do grampeador e a peça. Nossa equipe confirma a disponibilidade e o prazo.') + rodape(v);
}
function pagImeco(v) {
  return head(v, 'a-imeco', 'A Imeco', 'IMECO: há 45 anos fabricando grampeadores, grampos, pinos e pregos eletrosoldados em rolo em Novo Hamburgo/RS. 1º lugar Top Móbile por 18 anos.') + topo(v, 'a-imeco') +
  cabPag(v, 'A Imeco', 'Empresa 100% nacional, fabricante de ferramentas pneumáticas e elementos de fixação com tecnologia moderna, que se destaca pela alta qualidade e escala de produção.', 'foto-estofado', '45 anos') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Quem somos')}<h2>Há 45 anos especializada em fixação</h2>
  <p>Há 45 anos a IMECO é especializada na fabricação de grampeadores e grampos industriais, pinos e pinadores e pregos eletrosoldados em rolo. Tem uma rede ampla de distribuição em todo o país, além de um suporte técnico comprometido nas soluções, manutenções e peças de reposição em todo o território nacional.</p>
  <p>A IMECO desenvolve produtos projetados para superar as expectativas do cliente e a segurança de todos, desde o processo interno ao consumidor final.</p></div>
  ${video()}
</div></section>
<section class="sec sec-cinza"><div class="in mosaico-sec">
  <div class="sobe">${sobre('Equipe Imeco')}<h2>A real diferença de uma empresa está nas pessoas</h2>
  <p>É por isto que há 45 anos a IMECO investe na qualificação de seus profissionais e conta com uma equipe comprometida em fazer produtos de excelência, que atendam às demandas e necessidades de nossos clientes.</p></div>
  <div class="mosaico">${img('foto-equipe-1', 'Profissional da Imeco conferindo pente de grampos')}${img('foto-arame', 'Bobinas de arame na fábrica')}${img('foto-engenharia', 'Engenharia de produto da Imeco')}${img('foto-equipe-2', 'Colaboradoras na linha de produção')}</div>
</div></section>
<section class="sec"><div class="in duas">
  <figure class="sobe foto-moldura">${img('fabrica-montagem', 'Clientes montando estruturas de madeira com grampeadores pneumáticos')}</figure>
  <div class="sobe">${sobre('Clientes Imeco')}<h2>Valor através de soluções e inovações</h2>
  <p>Agregamos valor através de soluções e inovações, a fim de otimizar a produtividade, garantindo melhor eficiência na redução de desperdício e retrabalho.</p>
  <p>Nossa empresa está preparada para atender às exigências impostas pelo mercado e está em constante aperfeiçoamento do seu portfólio de produtos.</p></div>
</div></section>
<section class="sec sec-premio"><div class="in">${premio()}</div></section>` + chamada(v) + rodape(v);
}
function pagOrcamento(v) {
  return head(v, 'orcamento', 'Solicite um orçamento', 'Solicite um orçamento de grampos, pregos, grampeadores, pinos e peças IMECO. Resposta rápida pelo WhatsApp.') + topo(v, 'orcamento') +
  cabPag(v, 'Solicite um orçamento', 'Transforme o rendimento e a confiança das suas necessidades de fixação industrial com grampos e pregos IMECO.', null, 'Rápido, simples e sem compromisso') + `
<section class="sec"><div class="in orc-grade">
  <div class="orc-form sobe"><h2>Preencha o formulário</h2><p>Nossa equipe entrará em contato para oferecer a melhor solução em fixação para o seu negócio.</p>${formulario()}</div>
  <aside class="orc-lado sobe">
    <ul class="contatos">
      <li>${icWa()}<div><b>WhatsApp</b><a href="${waLink()}" ${ext}>${E.wa}</a></div></li>
      <li>${ic('tel')}<div><b>Telefone</b><a href="${E.foneHref}">${E.fone}</a></div></li>
      <li>${ic('pin')}<div><b>Endereço</b><span>${E.end}<br>${E.cidade}</span></div></li>
      <li>${ic('insta')}<div><b>Instagram</b><a href="${E.insta}" ${ext}>@imeco_oficial</a></div></li>
    </ul>
    ${mapa()}
  </aside>
</div></section>` + rodape(v);
}

// ---------- inícios ----------
function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'IMECO: grampos, pregos eletrosoldados em rolo, pinos e grampeadores industriais. 45 anos de fabricação nacional em Novo Hamburgo/RS.') + topo(v, 'index') + `
<section class="hero-a">
  <div class="ha-fundo" aria-hidden="true">${imgTopo('fundo-grampos', '')}</div>
  <div class="in ha-grade">
    <div class="ha-txt">
      <p class="ha-kicker"><span>45 anos</span> Fabricação nacional · Novo Hamburgo/RS</p>
      <h1>Confiança na fixação. <span>Rendimento nos resultados.</span></h1>
      <p class="ha-sub">Grampos, pregos em rolo e grampeadores de alta precisão para estofados, móveis e embalagens. Com a qualidade e o atendimento IMECO, você ganha confiança, economia e produtividade.</p>
      <p class="ha-acoes"><a class="btn btn-orc" href="${link(v, 'orcamento')}">Solicitar orçamento</a><a class="btn btn-linha" href="${E.catalogo}" ${ext}>Baixar catálogo (PDF)</a></p>
    </div>
    <div class="ha-prod" aria-hidden="true">
      <span class="ha-sol"></span>
      ${imgTopo('grampeadores', 'Grampeadores pneumáticos IMECO', ' class="ha-g"')}
      ${img('pregos-em-rolo', '', ' class="ha-p"')}
      ${img('grampos', '', ' class="ha-gr"')}
    </div>
  </div>
  <div class="in"><ul class="ha-numeros">
    <li><b>45</b><span>anos fabricando fixação industrial</span></li>
    <li><b>1º</b><span>lugar Top Móbile, por 18 anos a marca mais lembrada</span></li>
    <li><b>8</b><span>grampeadores e pinadores com ficha técnica</span></li>
    <li><b>BR</b><span>distribuição e suporte técnico em todo o país</span></li>
  </ul></div>
</section>
<section class="sec sec-vermelha"><div class="in">
  <div class="sec-cab sobe"><h2>Conheça nossos produtos</h2><p>Grampeadores, grampos, pregos eletrosoldados, pinos e peças originais, tudo de um só fabricante.</p></div>
  ${linhasProdutos(v)}
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sec-cab-lado sobe"><div>${sobre('Para cada segmento')}<h2>O equipamento certo para o que você fabrica</h2></div><p>Indicações tiradas das fichas técnicas do catálogo IMECO. Clique no modelo para ver a ficha completa.</p></div>
  ${segmentos(v)}
</div></section>
<section class="sec sec-azul"><div class="in">
  <div class="sec-cab sobe"><h2>Por que escolher a Imeco?</h2></div>
  ${porque(v)}
</div></section>
<section class="sec"><div class="in duas">
  ${video()}
  <div class="sobe">${sobre('Soluções de fixação industrial')}<h2>Produtividade, economia e confiabilidade</h2>
  <p>A IMECO entrega soluções de fixação industrial que aliam produtividade, economia e confiabilidade. Com produtos de alta qualidade e suporte técnico ágil, garantimos eficiência e resultados superiores para os nossos clientes.</p>
  ${premio()}</div>
</div></section>
${catalogoFaixa()}
<section class="sec sec-orc"><div class="so-foto">${img('fabrica-montagem', 'Operadores montando estrutura de madeira com grampeadores pneumáticos')}</div><div class="in orc-grade">
  <div class="so-txt sobe">${sobre('Solicite um orçamento')}<h2>Fixação industrial com grampos e pregos IMECO</h2><p>Preencha o formulário e nossa equipe entrará em contato para oferecer a melhor solução para o seu negócio. Rápido, simples e sem compromisso.</p>
  <ul class="so-contatos"><li>${icWa()}<a href="${waLink()}" ${ext}>${E.wa}</a></li><li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li><li>${ic('pin')}<span>${E.end}, ${E.cidade}</span></li></ul></div>
  <div class="orc-form sobe">${formulario()}</div>
</div></section>
` + rodape(v);
}
function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'IMECO: grampos, pregos eletrosoldados em rolo e pinos. Grampeadores, pregadores e pinadores industriais fabricados em Novo Hamburgo/RS.') + topo(v, 'index') + `
<section class="hero-b">
  <div class="in hb-grade">
    <div class="hb-txt">
      <p class="hb-tags"><span class="t-ver">Industrial</span><span class="t-ama">Fabricação nacional</span></p>
      <h1>Grampos, pregos eletrosoldados em rolo e pinos.</h1>
      <p class="hb-sub">Grampeadores, pregadores e pinadores industriais IMECO: fixação de alto rendimento para estofados, móveis, pallets e embalagens de madeira.</p>
      <p class="ha-acoes"><a class="btn btn-orc" href="${link(v, 'orcamento')}">Solicitar orçamento</a><a class="link-seta" href="${link(v, 'grampeadores')}">Ver grampeadores ${ic('seta')}</a></p>
    </div>
    <div class="hb-palco">
      <span class="hb-losango" aria-hidden="true"></span><span class="hb-losango hb-l2" aria-hidden="true"></span>
      ${imgTopo('g-14-50', 'Grampeador pneumático IMECO 14/50 Compacto', ' class="hb-maq"')}
      <a class="hb-ficha" href="${link(v, 'grampeadores')}#compacto-14-50"><b>14/50 Compacto</b><span>o mais leve da categoria · grampos 14 de 16 a 50 mm</span></a>
    </div>
  </div>
  <div class="hb-faixa"><div class="in"><span>${E.slogan}</span><span>1º lugar Top Móbile · por 18 anos a marca mais lembrada</span></div></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe"><h2 class="tit-barra"><span>Conheça nossos produtos</span></h2></div>
  <div class="vitrine">${LINHAS.map((l, i) => `<a class="vt sobe vt-${i}" href="${link(v, l.slug)}"><span class="vt-img">${img(l.img, l.n)}</span><span class="vt-txt"><b>${l.n}</b><span>${l.t}</span><em>${ic('seta')}</em></span></a>`).join('')}</div>
</div></section>
<section class="sec sec-sepia"><div class="in duas">
  <div class="mosaico">${img('foto-clientes-1', 'Clientes usando grampeadores Imeco na montagem')}${img('foto-equipe-1', 'Profissional da Imeco conferindo pente de grampos')}${img('foto-arame', 'Bobinas de arame na fábrica')}${img('foto-clientes-2', 'Operador grampeando estrutura de madeira')}</div>
  <div class="sobe">${sobre('45 anos · Novo Hamburgo/RS')}<h2>A real diferença de uma empresa está nas pessoas</h2>
  <p>Empresa 100% nacional, fabricante de ferramentas pneumáticas e elementos de fixação com tecnologia moderna. Há 45 anos a IMECO investe na qualificação de seus profissionais e conta com uma equipe comprometida em fazer produtos de excelência.</p>
  <p><a class="link-seta" href="${link(v, 'a-imeco')}">Conheça a Imeco ${ic('seta')}</a></p></div>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe"><h2 class="tit-barra"><span>Indicado para</span></h2><p>O modelo certo para o que você fabrica, segundo as fichas técnicas do catálogo.</p></div>
  ${segmentos(v)}
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe"><h2>Por que escolher a Imeco?</h2></div>
  ${porque(v)}
</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${premio()}</div>
  ${video()}
</div></section>
${catalogoFaixa()}
${chamada(v, 'Solicite um orçamento', 'Transforme o rendimento e a confiança da sua fixação industrial com grampos e pregos IMECO. Rápido, simples e sem compromisso.')}
` + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), grampeadores: pagGrampeadores(v), grampos: pagGrampos(v), 'pregos-em-rolo': pagPregos(v), pinos: pagPinos(v), 'pecas-de-reposicao': pagPecas(v), 'a-imeco': pagImeco(v), orcamento: pagOrcamento(v) });

copiarSiteJs(pub, E.waNum);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Imeco', artigo: 'da', url: E.url, lang: 'pt', cor: '#FBB22F', corTextoBotao: '#1b1b1b', fundo: '#002a4f', claro: '#f2f2f2',
  fonteTitulo: "'Imeco Sans',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 8, texto: 'Azul IMECO, abre com os grampeadores, os pregos e os grampos sobre o sol da marca e indica o equipamento certo para cada segmento.', pontos: ['Fichas técnicas do catálogo', 'Grampo certo para cada máquina', 'Orçamento pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 8, texto: 'Inspirada no catálogo impresso: cinza claro, faixas amarelas e títulos em itálico, com o 14/50 Compacto em destaque.', pontos: ['Visual do catálogo', 'Fotos da fábrica', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});

// fonte dos títulos (Imeco Sans, do site atual) também na página de escolha
const ip = path.join(pub, 'index.html');
if (fs.existsSync(ip)) {
  const ff = "@font-face{font-family:'Imeco Sans';src:url(/assets/fontes/ImecoSans-Bold.woff2) format('woff2');font-weight:700;font-display:swap}@font-face{font-family:'Imeco Sans';src:url(/assets/fontes/ImecoSans-Regular.woff2) format('woff2');font-weight:400;font-display:swap}";
  const h = fs.readFileSync(ip, 'utf8');
  if (!h.includes("font-family:'Imeco Sans'")) fs.writeFileSync(ip, h.replace('<style>', `<style>${ff}`));
}
