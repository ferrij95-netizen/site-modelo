// Maebraz Industrial (Piracicaba/SP): usinagem pesada sob encomenda para energia, petróleo, mineração, açúcar e álcool, plásticos. Gera public/{a,b}/ e a página de escolha.
// node clientes/maebraz/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs maebraz https://maebrazusinagem.com.br/)
// Textos, capacidades das máquinas, fotos da fábrica e dos trabalhos (blog) e certificado do site atual. Logo vetorizado (vetorizar-logo.py).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const ext = 'target="_blank" rel="noopener"';

const E = {
  nome: 'Maebraz Industrial', legal: 'Maebraz Industrial Ltda. · CNPJ 00.329.959/0001-75', url: 'https://maebraz.overtus.com.br/', antigo: 'https://maebrazusinagem.com.br/',
  fone: '(19) 2105-8700', foneHref: 'tel:+551921058700', fone2: '(19) 2105-8708', email: 'maebraz@maebraz.com.br', waNum: '551921058700',
  end: 'Rodovia Fausto Santomauro (Piracicaba/Rio Claro), SP-127, km 24, Guamium', cidade: 'Piracicaba/SP · CEP 13405-971',
  horario: 'Seg a qui 7h às 17h · Sex 7h às 16h',
  deptos: [['Comercial', ['gilson.narcizo@maebraz.com.br', 'henrique.marques@maebraz.com.br']], ['Compras', ['rodrigo.pereira@maebraz.com.br']], ['Financeiro', ['juliana.marques@maebraz.com.br']], ['Fiscal', ['faturamento@maebraz.com.br']]],
};

const img = (n, alt, w, h, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt, w, h) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" fetchpriority="high" decoding="async">`;

// parque de máquinas (página Estrutura do site atual)
const maquinas = [
  { id: 'torno-vertical', n: 'Torno vertical', qt: '6 convencionais + 2 CNC', grande: 'Ø 5.250 mm', sub: 'x 3.200 mm de altura · até 50 t', foto: ['e-torno-vertical-cnc', 650, 488], itens: ['CNC: usinagem até Ø 5.250 x 3.200 mm de altura, peso máximo de 50 t', 'Convencionais: até Ø 4.540 x 2.100 mm de altura, peso máximo de 30 t', 'Novo torno vertical SCHIESS Ø 5.800 x 2.500 mm instalado'] },
  { id: 'furadeira-cnc', n: 'Furadeira CNC', qt: 'curso 5.500 x 5.500', grande: '5.500 mm', sub: 'de curso em X e Y', foto: ['e-furadeira-cnc-1', 1000, 751], itens: ['Curso de 5.500 x 5.500 mm', 'Furação completa de espelhos de trocadores de calor e evaporadores', '3 furadeiras radiais com bandeira de até 3.000 mm, peso máximo de 25 t'] },
  { id: 'mandrilhadora', n: 'Mandrilhadora', qt: '4 convencionais + 3 CNC', grande: 'X 6.000', sub: 'Y 3.000 · Z 2.000 mm · fuso 130', foto: ['e-mandrilhadora-cnc', 650, 488], itens: ['CNC: eixos X 6.000, Y 3.000, Z 2.000, W 800, V 700 mm', 'Convencionais: X 2.520, Y 2.000, Z 2.000 mm', 'Fuso 130, peso máximo admissível de 25 t'] },
  { id: 'furacao-profunda', n: 'Furação profunda', qt: 'furos simples e duplos', grande: 'Ø 250 mm', sub: 'x 4.750 mm de comprimento', foto: ['e-furacao-profunda-1', 480, 360], itens: ['Diâmetro mínimo Ø 20 x 4.000 mm de comprimento', 'Diâmetro máximo Ø 250 x 4.750 mm (acima disso, sob consulta)', 'Furação e brunimento de furos duplos (sob consulta)'] },
  { id: 'brunimento', n: 'Brunimento', qt: 'três faixas de capacidade', grande: 'Ø 1.300 mm', sub: 'x 3.000 mm de altura', foto: ['e-furacao-profunda-2', 480, 360], itens: ['Até Ø 1.300 x 3.000 mm de altura', 'Até Ø 800 x 6.000 mm', 'Até Ø 350 x 3.000 mm'] },
  { id: 'retifica', n: 'Retífica cilíndrica', qt: 'eixos e camisas', grande: 'Ø 500 mm', sub: 'x 2.600 mm · até 1.200 kg', foto: ['e-retifica', 650, 302], itens: ['Retífica até Ø 500 x 2.600 mm de comprimento', 'Peso máximo admissível de 1.200 kg'] },
];

const mercados = [
  ['energia', 'Geração de energia', 'Eólica, térmica e hidrelétrica: flanges, anéis de rolamento, espelhos e peças de grande porte.'],
  ['petroleo', 'Petróleo', 'Peças para extração de petróleo e equipamentos de processo.'],
  ['acucar', 'Açúcar e álcool', 'Peças de moendas, caldeiras e evaporadores para as usinas da região de Piracicaba.'],
  ['mineracao', 'Mineração', 'Componentes pesados para britagem, transporte e beneficiamento.'],
  ['plasticos', 'Plásticos', 'Cilindros e roscas para máquinas de processamento de plástico.'],
  ['hidraulico', 'Hidráulico', 'Cilindros, camisas e peças com furação profunda e brunimento.'],
  ['automotivo', 'Automotivo', 'Peças e dispositivos para a cadeia automotiva.'],
];

const cases = [
  { n: 'Espelho de evaporador com 1.740 furos', setor: 'Açúcar e álcool', t: 'Furação completa e torneamento do espelho de um evaporador, feito na furadeira CNC de 5.500 x 5.500 mm.', fotos: [['c-espelho', 1000, 664], ['e-furadeira-cnc-3', 1000, 751]] },
  { n: 'Recipiente P50 e bucha H13', setor: 'Perfis de alumínio', t: 'Usinagem de reforma e de peças novas em recipientes (contenedores) de prensas de extrusão de perfis de alumínio.', fotos: [['c-recipiente-1', 1000, 664], ['c-recipiente-2', 1000, 664]] },
  { n: 'Flanges e anéis de rolamento', setor: 'Energia eólica', t: 'Usinagem de flanges e de anéis de rolamento pré-usinados para o setor eólico.', fotos: [['c-aneis', 1000, 750], ['c-flanges-2', 1000, 664]] },
];

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'Empresa' },
  { slug: 'estrutura', n: 'Estrutura' },
  { slug: 'servicos', n: 'Serviços e mercados' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Usinagem de grande porte', b: 'Capacidade em números' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Public+Sans:wght@400;500;600&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Maebraz | Usinagem de grande porte em Piracicaba/SP' : `${titulo} | Maebraz Industrial`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#1e6bb3' });

const btnOrc = (v, cls = 'btn') => `<a class="${cls}" href="${link(v, 'contato')}">Enviar desenho para orçamento</a>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const logo = (branco, w = 180) => `<img class="logo" src="/assets/${branco ? 'logo-branco' : 'logo'}.svg" alt="Maebraz Industrial" width="${w}" height="${Math.round(w * 55 / 226)}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Usinagem pesada sob encomenda · ISO 9001</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Maebraz, página inicial">${logo(v === 'b', 180)}</a>
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
    <div class="rod-marca">${logo(true, 200)}
      <p>Usinagem de peças de grande porte para energia, petróleo, mineração, açúcar e álcool, plásticos e indústria em geral. Piracicaba/SP.</p></div>
    <div><h3>Capacidades</h3><ul>${maquinas.map(m => `<li><a href="${link(v, 'estrutura')}#${m.id}">${m.n}</a></li>`).join('')}</ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados">
      <li>${ic('tel')}<span><a href="${E.foneHref}">${E.fone}</a> · ${E.fone2}</span></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('relogio')}<span>${E.horario}</span></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>Empresa</h3><ul>
      <li><a href="${link(v, 'empresa')}">Quem somos</a></li>
      <li><a href="${link(v, 'empresa')}#qualidade">Política da qualidade</a></li>
      <li><a href="${link(v, 'servicos')}#trabalhos">Trabalhos realizados</a></li>
      <li><a href="${link(v, 'contato')}">Fale com a Maebraz</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Piracicaba/SP</span></div>
</footer>
<script src="/assets/maebraz.js" defer></script>
</body>
</html>`;
}

// ---------- blocos ----------
const numeros = () => `<ul class="numeros">
  <li><b>Ø 5.800</b><span>mm no maior torno vertical (SCHIESS)</span></li>
  <li><b>50 t</b><span>de peso por peça no torno vertical CNC</span></li>
  <li><b>5.500</b><span>mm de curso na furadeira CNC</span></li>
  <li><b>4.750</b><span>mm de furação profunda</span></li>
  <li><b>25+</b><span>anos de usinagem sob encomenda</span></li>
</ul>`;

const cartaoMaq = (v, m) => `<a class="mq-card sobe" href="${link(v, 'estrutura')}#${m.id}"><span class="mq-img">${img(...[m.foto[0], `${m.n} da Maebraz`, m.foto[1], m.foto[2]])}</span><span class="mq-txt"><i>${m.n}</i><b>${m.grande}</b><span>${m.sub}</span></span></a>`;

const gradeMercados = v => `<ul class="mercados">${mercados.map(([id, n, t]) => `<li class="sobe">${img(`m-${id}`, n, 1000, 667)}<div><h3>${n}</h3><p>${t}</p></div></li>`).join('')}</ul>`;

const cartaoCase = c => `<article class="case sobe"><div class="case-fotos">${c.fotos.map(([f, w, h]) => `<a href="/assets/img/${f}.webp" data-foto="${esc(c.n)}">${img(f, c.n, w, h)}</a>`).join('')}</div><div class="case-txt"><p class="case-setor">${c.setor}</p><h3>${c.n}</h3><p>${c.t}</p></div></article>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Tem uma peça grande para usinar?</h2>
  <p>Mande o desenho, o material e a quantidade. O comercial responde com prazo e preço, inclusive para reforma de peças.</p></div>
  <div class="ch-acoes"><a class="btn" href="${link(v, 'contato')}">Pedir orçamento</a><a class="btn btn-linha" href="${E.foneHref}">${ic('tel')}${E.fone}</a></div>
</div></section>`;

const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Pedido de orçamento pelo site da Maebraz">
  <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>Empresa *<input name="empresa" required autocomplete="organization"></label></div>
  <div class="form-duas"><label>E-mail *<input name="email" type="email" required autocomplete="email"></label><label>Telefone *<input name="fone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Departamento<select name="departamento"><option>Comercial</option><option>Compras</option><option>Financeiro</option><option>Fiscal</option></select></label><label>Tipo de serviço<select name="servico"><option>Peça nova</option><option>Reforma de peça</option><option>Torneamento vertical</option><option>Furação / furação profunda</option><option>Mandrilhamento</option><option>Brunimento / retífica</option><option>Outro</option></select></label></div>
  <label>Peça, material, medidas e quantidade *<textarea name="mensagem" rows="5" required placeholder="Ex.: flange Ø 3.200 mm em aço SAE 1045, 4 peças. Desenho em anexo no e-mail."></textarea></label>
  <button class="btn" type="submit">Enviar ${ic('seta')}</button>
  <p class="form-nota">Abre o seu e-mail com a mensagem pronta para ${E.email}. Anexe o desenho (PDF, DWG ou STEP) antes de enviar.</p>
</form>`;

const cabPag = (titulo, sub, foto) => `<section class="cab-pag${foto ? ' com-foto' : ''}">${foto ? `<div class="cp-foto">${foto}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

// ---------- páginas internas ----------
function empresa(v) {
  return head(v, 'empresa', 'Empresa', 'Maebraz Industrial: há mais de 25 anos em Piracicaba/SP, especializada em serviços de usinagem de grande porte. ISO 9001 pela TÜV Rheinland.') + topo(v, 'empresa') +
  cabPag('A Maebraz', 'Empresa nacional especializada em serviços de usinagem, com fábrica às margens da SP-127 entre Piracicaba e Rio Claro.', imgTopo('e-schiess-1', 'Instalação do torno vertical SCHIESS na Maebraz', 1000, 750)) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Quem somos')}
    <h2>Usinagem que atende as especificações mais exigentes</h2>
    <p>A Maebraz Industrial atua há mais de 25 anos na prestação de serviços de usinagem para energia eólica, térmica e hidráulica, extração de petróleo, máquinas para processamento de plástico, mineração e máquinas e equipamentos industriais em geral.</p>
    <p>Com uma forte aliança com fornecedores e parceiros e com a capacitação dos colaboradores, a Maebraz atende as especificações técnicas mais exigentes e segue buscando qualidade total e novas tecnologias.</p>
  </div>
  <figure class="sobe">${img('h-aereo', 'Vista aérea da Maebraz em Piracicaba/SP', 400, 197)}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in mvv">
  <div class="sobe"><h3>Missão</h3><p>Fornecer serviços de usinagem especiais.</p></div>
  <div class="sobe"><h3>Visão</h3><p>Tornar-se uma empresa referência no mercado no ramo em que atua.</p></div>
  <div class="sobe"><h3>Valores</h3><p>Compromisso, ética e empreender continuamente.</p></div>
</div></section>
<section class="sec" id="qualidade"><div class="in duas">
  <div class="sobe">${sobre('Qualidade')}<h2>Certificada ISO 9001 pela TÜV Rheinland desde 2009</h2>
  <p>Escopo: serviços de usinagem, fabricação de peças e equipamentos.</p>
  <ol class="politica">
    <li>Oferecer serviços que atendam as expectativas dos clientes, com gestão eficiente e melhoria contínua.</li>
    <li>Capacitar e desenvolver os colaboradores para sustentar a melhoria contínua.</li>
    <li>Buscar fornecedores confiáveis que compartilhem a mesma filosofia de gestão.</li>
    <li>Garantir aos colaboradores condições favoráveis de segurança, saúde e meio ambiente.</li>
  </ol>
  <h3>Objetivos da qualidade</h3>
  <ul class="lista-check"><li>Pontualidade na entrega</li><li>Serviços dentro dos requisitos contratados</li><li>Capacitação contínua dos colaboradores</li><li>Fornecedores monitorados e parceiros em tecnologia</li></ul></div>
  <figure class="sobe cert"><a href="/assets/img/cert-iso.webp" data-foto="Certificado NBR ISO 9001:2015 · TÜV Rheinland">${img('cert-iso', 'Certificado NBR ISO 9001:2015 da Maebraz emitido pela TÜV Rheinland', 636, 900)}</a></figure>
</div></section>` + chamada(v) + rodape(v);
}

function estrutura(v) {
  return head(v, 'estrutura', 'Estrutura', 'Parque de máquinas da Maebraz: tornos verticais até Ø 5.800 mm e 50 t, furadeira CNC 5.500 x 5.500, mandrilhadoras CNC, furação profunda até 4.750 mm, brunimento e retífica.') + topo(v, 'estrutura') +
  cabPag('Estrutura', 'Tornos verticais, mandrilhadoras, furadeiras CNC, furação profunda, brunimento e retífica para peças de até 50 toneladas.', imgTopo('h-furadeira', 'Furadeira CNC da Maebraz trabalhando em espelho', 1600, 500)) + `
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Parque de máquinas')}<h2>Capacidade para o que não cabe em outra oficina</h2></div>
  <div class="maq-lista">${maquinas.map(m => `<article class="maq sobe" id="${m.id}">
    <a class="maq-foto" href="/assets/img/${m.foto[0]}.webp" data-foto="${m.n}">${img(m.foto[0], `${m.n} da Maebraz`, m.foto[1], m.foto[2])}</a>
    <div class="maq-txt"><p class="maq-qt">${m.qt}</p><h3>${m.n}</h3><p class="maq-grande"><b>${m.grande}</b> ${m.sub}</p><ul class="lista-check">${m.itens.map(i => `<li>${i}</li>`).join('')}</ul></div></article>`).join('')}</div>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Na fábrica')}<h2>Furadeira CNC 5.500 x 5.500 e torno SCHIESS</h2></div>
  <ul class="galeria">${[['e-furadeira-cnc-1', 1000, 751], ['e-furadeira-cnc-2', 1000, 751], ['e-furadeira-cnc-4', 1000, 751], ['e-schiess-2', 1000, 750], ['e-torno-vertical', 650, 488], ['e-mandrilhadora', 640, 480]].map(([f, w, h]) => `<li class="sobe"><a href="/assets/img/${f}.webp" data-foto="Maebraz">${img(f, 'Máquina da Maebraz', w, h)}</a></li>`).join('')}</ul>
</div></section>` + chamada(v) + rodape(v);
}

function servicos(v) {
  return head(v, 'servicos', 'Serviços e mercados', 'Usinagem Maebraz para geração de energia, petróleo, açúcar e álcool, mineração, plásticos, hidráulico e automotivo. Trabalhos: espelho de evaporador, recipiente P50, flanges eólicos.') + topo(v, 'servicos') +
  cabPag('Serviços e mercados', 'Peças novas e reforma, do torneamento à furação profunda, para quem não pode parar a planta.') + `
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Serviços')}<h2>O que a Maebraz usina</h2></div>
  <ul class="servicos">
    <li class="sobe">${ic('disco')}<h3>Torneamento vertical</h3><p>Flanges, anéis, carcaças e rodas até Ø 5.800 mm.</p></li>
    <li class="sobe">${ic('engrenagem')}<h3>Mandrilhamento</h3><p>Carcaças e blocos com fuso 130, X 6.000 mm.</p></li>
    <li class="sobe">${ic('medidor')}<h3>Furação CNC</h3><p>Espelhos de trocadores e evaporadores com milhares de furos.</p></li>
    <li class="sobe">${ic('chave')}<h3>Furação profunda e brunimento</h3><p>Cilindros, camisas e eixos furados até 4.750 mm.</p></li>
    <li class="sobe">${ic('escudo')}<h3>Retífica</h3><p>Eixos e camisas até Ø 500 x 2.600 mm.</p></li>
    <li class="sobe">${ic('fabrica')}<h3>Reforma de peças</h3><p>Recuperação de peças desgastadas, como recipientes de extrusão.</p></li>
  </ul>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Mercados atendidos')}<h2>Sete setores, a mesma precisão</h2></div>
  ${gradeMercados(v)}
</div></section>
<section class="sec" id="trabalhos"><div class="in">
  <div class="sec-cab sobe">${sobre('Trabalhos realizados')}<h2>Algumas peças que passaram pela Maebraz</h2></div>
  <div class="cases">${cases.map(cartaoCase).join('')}</div>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Maebraz Industrial, Rodovia Fausto Santomauro, km 24, Piracicaba - SP');
  return head(v, 'contato', 'Contato', 'Fale com a Maebraz: (19) 2105-8700, maebraz@maebraz.com.br. Rodovia Fausto Santomauro (SP-127), km 24, Piracicaba/SP.') + topo(v, 'contato') +
  cabPag('Contato', 'Mande o desenho da peça. O comercial responde com prazo e preço.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe caixa-form">${formulario()}</div>
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<span><a href="${E.foneHref}">${E.fone}</a> · <a href="tel:+551921058708">${E.fone2}</a></span></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('relogio')}<span>${E.horario}</span></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <ul class="deptos">${E.deptos.map(([d, es]) => `<li><b>${d}</b>${es.map(e => `<a href="mailto:${e}">${e}</a>`).join('')}</li>`).join('')}</ul>
    <iframe class="mapa" title="Mapa da Maebraz em Piracicaba/SP" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=13&output=embed"></iframe></div>
</div></section>` + rodape(v);
}

// ---------- inícios ----------
function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'Maebraz Industrial, Piracicaba/SP: usinagem de peças de grande porte. Torno vertical até Ø 5.800 mm e 50 t, furadeira CNC 5.500 x 5.500, mandrilhadoras CNC, furação profunda. ISO 9001.') + topo(v, 'index') + `
<section class="heroa">
  <div class="ha-foto">${imgTopo('e-schiess-1', 'Torno vertical SCHIESS Ø 5.800 mm na Maebraz', 1000, 750)}</div>
  <div class="in ha-grade">
    <div class="ha-txt">
      <p class="sobrelinha">Piracicaba/SP · ISO 9001</p>
      <h1>Usinagem de peças que <em>pesam toneladas.</em></h1>
      <p class="ha-sub">Torno vertical até Ø 5.800 mm, mandrilhadoras CNC, furadeira de 5.500 x 5.500 mm e furação profunda para energia, petróleo, mineração e usinas.</p>
      <p class="ha-acoes">${btnOrc(v)}<a class="btn btn-linha" href="${link(v, 'estrutura')}">Ver a estrutura</a></p>
    </div>
  </div>
</section>
<section class="faixa-num"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Capacidades')}<h2>O tamanho máximo de cada máquina</h2></div>
  <div class="mq-grade">${maquinas.map(m => cartaoMaq(v, m)).join('')}</div>
</div></section>
<section class="sec sec-cinza" id="trabalhos"><div class="in">
  <div class="sec-cab sobe">${sobre('Trabalhos realizados')}<h2>Do espelho de 1.740 furos ao flange eólico</h2></div>
  <div class="cases">${cases.map(cartaoCase).join('')}</div>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Mercados atendidos')}<h2>Para quem não pode parar a planta</h2></div>
  ${gradeMercados(v)}
</div></section>
<section class="sec sec-escura"><div class="in duas">
  <div class="sobe">${sobre('Qualidade')}<h2>ISO 9001 pela TÜV Rheinland desde 2009</h2>
  <p>Pontualidade na entrega e serviço dentro dos requisitos contratados são os dois primeiros objetivos da qualidade da Maebraz.</p>
  <a class="link-seta" href="${link(v, 'empresa')}#qualidade">Política da qualidade ${ic('seta')}</a></div>
  <figure class="sobe">${img('e-furadeira-cnc-2', 'Furadeira CNC da Maebraz', 1000, 751)}</figure>
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Maebraz: usinagem pesada sob encomenda em Piracicaba/SP. Ø 5.800 mm, 50 t, 5.500 mm de curso CNC, furação profunda de 4.750 mm. Energia, petróleo, açúcar e álcool, mineração.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('h-furadeira', 'Furadeira CNC da Maebraz', 1600, 500)}</div>
  <div class="in hb-grade">
    <div class="hb-txt">
      <p class="sobrelinha">Maebraz Industrial · Piracicaba/SP</p>
      <h1>Ø 5.800 mm.<br><em>50 toneladas.</em></h1>
      <p class="hb-sub">Usinagem sob encomenda de flanges, anéis, espelhos, cilindros e carcaças que pedem máquina grande e gente experiente.</p>
      <p class="ha-acoes">${btnOrc(v)}<a class="btn btn-linha" href="${link(v, 'estrutura')}">Capacidades</a></p>
    </div>
  </div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Capacidade em números')}<h2>Escolha pela máquina</h2></div>
  <div class="tabela-cap sobe"><table><thead><tr><th>Processo</th><th>Máquinas</th><th>Capacidade máxima</th></tr></thead><tbody>${maquinas.map(m => `<tr><td><a href="${link(v, 'estrutura')}#${m.id}">${m.n}</a></td><td>${m.qt}</td><td><b>${m.grande}</b> ${m.sub}</td></tr>`).join('')}</tbody></table></div>
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <figure class="sobe">${img('e-schiess-2', 'Torno vertical SCHIESS na Maebraz', 1000, 750)}</figure>
  <div class="sobe">${sobre('Torno vertical SCHIESS')}<h2>O maior diâmetro da casa: Ø 5.800 x 2.500 mm</h2>
  <p>Somado a 2 tornos verticais CNC (até Ø 5.250 mm e 50 t) e 6 convencionais, é o que permite à Maebraz tornear flanges eólicos, rodas e carcaças de grande porte.</p>
  <a class="link-seta" href="${link(v, 'estrutura')}#torno-vertical">Ver tornos verticais ${ic('seta')}</a></div>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Trabalhos realizados')}<h2>Peças que já passaram por aqui</h2></div>
  <div class="cases">${cases.map(cartaoCase).join('')}</div>
</div></section>
<section class="sec sec-escura"><div class="in">
  <div class="sec-cab sobe">${sobre('Mercados')}<h2>Energia, petróleo, usinas, mineração, plásticos</h2></div>
  <ul class="chips-m">${mercados.map(([id, n]) => `<li><a href="${link(v, 'servicos')}">${n}</a></li>`).join('')}</ul>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), estrutura: estrutura(v), servicos: servicos(v), contato: contato(v) });

copiarSiteJs(pub, E.waNum);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
fs.writeFileSync(path.join(pub, 'assets/maebraz.js'), '// Maebraz: sem scripts próprios além do site.js do kit.\n');
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Maebraz', artigo: 'da', url: E.url, lang: 'pt', cor: '#1e6bb3', fundo: '#14202e', claro: '#f2f4f6',
  fonteTitulo: "'Archivo',system-ui,sans-serif", fonteTexto: "'Public Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, abre com o torno vertical SCHIESS e mostra o tamanho máximo de cada máquina.', pontos: ['Parque de máquinas com capacidades reais', 'Trabalhos realizados com fotos', 'Formulário para mandar o desenho'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Aço escuro e azul, abre com os números e uma tabela de capacidade por processo.', pontos: ['Tabela de capacidades', 'Mercados atendidos', 'ISO 9001 TÜV Rheinland'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
