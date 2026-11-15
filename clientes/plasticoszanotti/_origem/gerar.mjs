// Plásticos Zanotti (Massaranduba/SC): injeção de termoplásticos sob encomenda, ferramentaria própria e linha própria de cones, carretéis e caixas. Gera public/{a,b}/ e a página de escolha.
// node clientes/plasticoszanotti/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs plasticoszanotti https://www.plasticoszanotti.com/)
// Textos do site atual e do catálogo de produtos 2022 (PDF do site). Fotos: site atual, catálogo e quadros do vídeo institucional. Logo vetorial tirado da capa do catálogo.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const ext = 'target="_blank" rel="noopener"';
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));

const E = {
  nome: 'Plásticos Zanotti', legal: 'Plásticos Zanotti · Grupo Zanotti', url: 'https://plasticoszanotti.overtus.com.br/', antigo: 'https://www.plasticoszanotti.com/',
  fone: '(47) 3379-4017', foneHref: 'tel:+554733794017', fone2: '(47) 3379-4004', fone2Href: 'tel:+554733794004', email: 'valmiro@plasticoszanotti.com',
  end: 'Rua Vicente Zanotti, 177, Distrito Industrial Zeferino Kuklinski', cidade: 'Massaranduba/SC · CEP 89381-270',
  linkedin: 'https://www.linkedin.com/company/grupo-zanotti',
  iso: 'https://www.plasticoszanotti.com/arquivos/certificados/1-certificate-br044489-item-1-9o6esyp.pdf',
  manual: 'https://www.plasticoszanotti.com/arquivos/certificados/2-manual-de-fornecedores-rev-04.pdf',
  relatorio: 'https://www.plasticoszanotti.com/arquivos/certificados/4-zanotti-relatorioigualdadesalariallote_2026_2_03532453000157.pdf',
  catalogo: 'https://www.plasticoszanotti.com/arquivos/conteudos/147-catalogo_plasticoszanotti_2022.pdf',
};

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const foto = (n, alt) => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}">${img(n, alt)}</a>`;

const pecas = [['ventiladores', 'Ventiladores'], ['venezianas', 'Venezianas'], ['ssw', 'Carcaças SSW'], ['poste', 'Poste'], ['bicos', 'Bicos'], ['assentos', 'Assentos e encostos'], ['moldura', 'Moldura'], ['caixa-painel', 'Caixa painel, linha branca']];
const clientes = ['WEG', 'Schulz', 'Fischer', 'Ergo Mobili', 'Zanotti Fitas Elásticas'];

const produtos = [
  { id: 'cones', n: 'Cones e cilindro', sub: 'Para fiação e tinturaria.', fotos: [['p-cones', 'Cones 112, 175 e 230'], ['p-cilindro', 'Cilindro para tinturaria']],
    cab: ['Item', 'Descrição', 'Cor', 'Embalagem'], linhas: [['0200.0078', 'Cone 112', 'Preta', '1.280 peças'], ['0173.0077', 'Cone 175', 'Preta', '595 peças'], ['0173.0084', 'Cone 230', 'Preta', '336 peças'], ['0173.0089', 'Cilindro tinturaria', 'Preta', '60 peças']] },
  { id: 'carreteis-vazados', n: 'Carretéis vazados', sub: 'Diâmetro do furo: 16 mm.', fotos: [['p-carretel-vazado', 'Carretel vazado'], ['p-carretel-vazado-b', 'Carretel vazado modelo B']],
    cab: ['Item', 'Descrição', 'Altura x diâmetro (mm)', 'Embalagem'], linhas: [['0173.0028', 'Carretel vazado 8', '94 x 80', '320 peças'], ['0173.0092', 'Carretel vazado 8B', '145 x 80', '176 peças'], ['0173.0083', 'Carretel vazado 9', '97,8 x 90', '250 peças'], ['0173.0088', 'Carretel vazado 9B', '145 x 90', '150 peças'], ['0173.0086', 'Carretel vazado 10', '143 x 100', '120 peças'], ['0173.0091', 'Carretel vazado 10B', '97,5 x 100', '216 peças'], ['0173.0087', 'Carretel vazado 11B', '144,5 x 110', '100 peças'], ['0173.0031', 'Carretel vazado 15', '145 x 120', '80 peças']] },
  { id: 'carreteis-fechados', n: 'Carretéis fechados', sub: 'Diâmetro do furo: 16 mm.', fotos: [['p-carretel-fechado', 'Carretel fechado'], ['p-carretel-fechado-g', 'Carretel fechado 25']],
    cab: ['Item', 'Descrição', 'Altura x diâmetro (mm)', 'Embalagem'], linhas: [['0173.0023', 'Carretel fechado 5', '91 x 53', '500 peças'], ['0173.0035', 'Carretel fechado 7', '92 x 70', '350 peças'], ['0200.0033', 'Carretel fechado 8', '94 x 79', '300 peças'], ['0200.0013', 'Carretel fechado 9', '98 x 91', '230 peças'], ['0200.0035', 'Carretel fechado 12', '96 x 119', '130 peças'], ['0200.0008', 'Carretel fechado 15', '145 x 120', '80 peças'], ['0200.0060', 'Carretel fechado 25', '223 x 250', '12 peças']] },
  { id: 'caixas', n: 'Caixas e gaveteiros', sub: 'Organização de estoque e armazenagem.', fotos: [['p-gaveteiro', 'Gaveteiro'], ['p-caixa', 'Caixa de armazenamento 60 litros']],
    cab: ['Item', 'Descrição', 'Medidas (A x L x C)', 'Embalagem'], linhas: [['0200.0005', 'Gaveteiro 05, preto', '12 x 15 x 23 cm', '24 peças'], ['0200.0006', 'Gaveteiro 08, preto', '19 x 31 x 41 cm', '4 peças'], ['0200.0081', 'Caixa de armazenamento, preta, 60 litros', '30 x 39 x 61 cm', '1 peça']] },
  { id: 'diversos', n: 'Diversos', sub: 'Carrinho de mão, bandeja e sapatas.', fotos: [['p-aro', 'Aro para carrinho de mão']],
    cab: ['Item', 'Descrição', 'Medidas', 'Embalagem'], linhas: [['0327.0009', 'Aro para carrinho de mão, preto', '230 mm diâmetro, eixo 20 mm', '12 peças'], ['0200.0068', 'Caçamba para carrinho de mão, preta, 60 litros', '21,4 x 68 x 86 cm', 'Unidade'], ['17792.0001', 'Bandeja para frios, branca, 26 litros', '11 x 42 x 62 cm', '5 peças'], ['0200.0034', 'Sapata retangular baixa nº 1', '7 x 25 x 45 mm', '1.000 peças'], ['0200.0001', 'Sapata redonda menor nº 2', '17 x 21 mm', '1.000 peças'], ['0200.0002', 'Sapata redonda maior nº 3', '17 x 30 mm', '1.000 peças'], ['0200.0003', 'Sapata retangular alta nº 4', '14,5 x 23 x 42 mm', '1.000 peças'], ['0200.0004', 'Sapata triangular nº 5', '28,5 x 38 x 70 mm', '1.000 peças']] },
];
const NPROD = produtos.reduce((s, p) => s + p.linhas.length, 0);

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'Empresa' },
  { slug: 'servicos', n: 'Injeção e ferramentaria' },
  { slug: 'produtos', n: 'Produtos' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Parque fabril', b: 'Gente que injeta' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&family=Source+Sans+3:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Plásticos Zanotti | Injeção de termoplásticos e ferramentaria em Massaranduba/SC' : `${titulo} | Plásticos Zanotti`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#1c6535' });
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const logo = (branco, h = 64) => `<img class="logo" src="/assets/${branco ? 'logo-branco' : 'logo'}.svg" alt="Plásticos Zanotti" width="${Math.round(h * 252 / 298)}" height="${h}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Injeção de termoplásticos desde 1989</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Plásticos Zanotti, página inicial">${logo(v === 'b')}</a>
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
    <div class="rod-marca">${logo(true, 110)}
      <p>Injeção de termoplásticos sob encomenda, ferramentaria própria e linha própria de cones, carretéis e caixas. Uma empresa do Grupo Zanotti.</p>
      <p class="rod-redes"><a href="${E.linkedin}" ${ext} aria-label="LinkedIn">${ic('linkedin')}</a></p></div>
    <div><h3>Produtos</h3><ul>${produtos.map(p => `<li><a href="${link(v, 'produtos')}#${p.id}">${p.n}</a></li>`).join('')}</ul></div>
    <div><h3>Comercial</h3><ul class="rod-dados">
      <li>${ic('tel')}<span><a href="${E.foneHref}">${E.fone}</a><br><a href="${E.fone2Href}">${E.fone2}</a></span></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>Empresa</h3><ul>
      <li><a href="${link(v, 'empresa')}">Sobre a Zanotti</a></li>
      <li><a href="${link(v, 'servicos')}">Injeção e ferramentaria</a></li>
      <li><a href="${link(v, 'empresa')}#qualidade">Qualidade e certificados</a></li>
      <li><a href="${link(v, 'contato')}">Contato</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>As fotos, o logotipo e a marca são do Grupo Zanotti.</span></div>
</footer>
</body>
</html>`;
}

const numeros = () => `<ul class="economia">
  <li><b>1989</b><span>fundada em Jaraguá do Sul</span></li>
  <li><b>160 mil m²</b><span>de parque fabril em Massaranduba</span></li>
  <li><b>40+</b><span>injetoras</span></li>
  <li><b>35 a 900 t</b><span>de força de fechamento</span></li>
  <li><b>ISO</b><span>sistema de qualidade certificado</span></li>
</ul>`;

const gradePecas = () => `<ul class="pecas">${pecas.map(p => `<li class="sobe">${foto('pc-' + p[0], p[1])}<b>${p[1]}</b></li>`).join('')}</ul>`;
const listaClientes = () => `<ul class="clientes">${clientes.map(c => `<li>${c}</li>`).join('')}</ul>`;
const resinas = 'PC, PBT, ABS, PA, PP, PE, PS, PSAI, elastômeros e baquelite';

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Tem uma peça para injetar?</h2>
  <p>Mande o desenho, a resina e o volume. O comercial da Zanotti responde com prazo e orçamento.</p></div>
  <div class="ch-acoes"><a class="btn" href="${link(v, 'contato')}">Pedir orçamento</a><a class="btn btn-linha" href="${E.foneHref}">${E.fone}</a></div>
</div></section>`;

const cabPag = (titulo, sub, f) => `<section class="cab-pag${f ? ' com-foto' : ''}">${f ? `<div class="cp-foto">${imgTopo(f[0], f[1])}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

function empresa(v) {
  return head(v, 'empresa', 'Empresa', 'Plásticos Zanotti: fundada em 1989, parque fabril de 160 mil m² em Massaranduba/SC, mais de 40 injetoras de 35 a 900 toneladas e ferramentaria própria.') + topo(v, 'empresa') +
  cabPag('Sobre a Zanotti', 'Solução completa em injeção de plásticos, de Massaranduba para todo o Brasil.', ['fabrica', 'Vista aérea do parque fabril da Zanotti em Massaranduba/SC']) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Desde 1989')}<h2>De Jaraguá do Sul a um parque fabril de 160 mil m²</h2>
  <p>A empresa foi fundada em 1989 em Jaraguá do Sul (SC). Com os anos, ampliou a capacidade, somou conhecimento e novas operações. Hoje está em Massaranduba (SC), num parque fabril com mais de 160.000 m², atendendo os mais diversos segmentos.</p>
  <p>São mais de 40 injetoras de 35 a 900 toneladas, ferramentaria própria, linhas de montagem e processos de acabamento, com know-how em ${resinas}.</p></div>
  <figure class="sobe">${img('equipe', 'Colaboradora da Zanotti na produção')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <ul class="pilares">
    <li class="sobe">${ic('estrela')}<h3>Missão</h3><p>Ser a solução em prestação de serviços de manufatura em transformação de plásticos.</p></li>
    <li class="sobe">${ic('seta')}<h3>Visão</h3><p>Permanecer como uma das maiores referências da região em transformação de plásticos, reconhecida pela qualidade e pelo atendimento.</p></li>
    <li class="sobe">${ic('usuarios')}<h3>Valores</h3><p>Trabalho em equipe, confiança no que fazemos, valorização do ser humano, foco no cliente, respeito e cuidado com o consumidor.</p></li>
    <li class="sobe">${ic('fabrica')}<h3>Grupo Zanotti</h3><p>Parte do Grupo Zanotti, que transforma a versatilidade do plástico em soluções.</p></li>
  </ul>
</div></section>
<section class="sec sec-escura"><div class="in">${sobre('Em números')}<h2 class="sobe">Capacidade para peça pequena e peça grande</h2>${numeros()}</div></section>
<section class="sec" id="qualidade"><div class="in duas">
  <div class="sobe">${sobre('Qualidade')}<h2>Política da qualidade</h2>
  <p>Atender as necessidades dos clientes e da organização com produtos e serviços em transformação de termoplásticos, termofixos, estamparia de ferrosos e não ferrosos, ferramentaria e puericultura (produtos infantis), de acordo com os requisitos estabelecidos e com melhoria contínua.</p>
  <p>Produtos de qualidade feitos dentro de uma cadeia de produção responsável e sustentável.</p></div>
  <div class="sobe"><div class="docs" style="grid-template-columns:1fr">
    <a href="${E.iso}" ${ext}>${ic('escudo')}Certificado ISO</a>
    <a href="${E.manual}" ${ext}>${ic('livro')}Manual do fornecedor</a>
    <a href="${E.relatorio}" ${ext}>${ic('livro')}Relatório Lei 14.611/2023</a></div></div>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Clientes')}<h2>Quem confia na Zanotti</h2></div>
  ${listaClientes()}
</div></section>` + chamada(v) + rodape(v);
}

function servicos(v) {
  return head(v, 'servicos', 'Injeção e ferramentaria', `Injeção de termoplásticos sob encomenda com mais de 40 injetoras de 35 a 900 toneladas, ferramentaria própria, montagem e acabamento. Resinas ${resinas}.`) + topo(v, 'servicos') +
  cabPag('Injeção e ferramentaria', 'Do molde à peça montada, dentro de casa.') + `
<section class="sec"><div class="in">
  <article class="maq" id="injecao">
    <div class="maq-foto sobe">${foto('injetora', 'Injetora na fábrica da Zanotti')}</div>
    <div class="sobe"><p class="maq-marca">Serviço</p><h2>Injeção de termoplásticos</h2><p class="maq-sub">Empresa especializada em injeção, com periféricos completos.</p>
    <p>Além das injetoras, a fábrica conta com unidades de secagem, desumidificação, torres de resfriamento, robôs e equipamentos periféricos.</p>
    <dl><div><dt>40+</dt><dd>injetoras</dd></div><div><dt>35 a 900 t</dt><dd>força de fechamento</dd></div><div><dt>Robôs</dt><dd>e periféricos</dd></div><div><dt>Montagem</dt><dd>e acabamento</dd></div></dl>
    <p class="nota">Resinas: ${resinas}, entre outras.</p></div>
  </article>
  <article class="maq" id="ferramentaria">
    <div class="maq-foto sobe">${foto('projeto', 'Projeto de molde na ferramentaria da Zanotti')}</div>
    <div class="sobe"><p class="maq-marca">Serviço</p><h2>Ferramentaria</h2><p class="maq-sub">Construção e manutenção de moldes.</p>
    <p>A ferramentaria própria dá suporte na construção e na manutenção dos moldes dos clientes, com projeto em 3D antes de usinar.</p>
    <ul class="checks"><li>${ic('check')}Projeto do molde e da peça</li><li>${ic('check')}Construção de moldes novos</li><li>${ic('check')}Manutenção dos moldes do cliente</li></ul></div>
  </article>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Peças injetadas')}<h2>O que já sai das nossas injetoras</h2></div>
  ${gradePecas()}
</div></section>` + chamada(v) + rodape(v);
}

const blocoProd = p => `<article class="prod" id="${p.id}">
  <div class="prod-foto sobe">${p.fotos.map(f => foto(f[0], f[1])).join('')}</div>
  <div class="sobe"><h2>${p.n}</h2><p class="maq-sub">${p.sub}</p>
  <div class="tabela-wrap"><table class="tabela"><thead><tr>${p.cab.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${p.linhas.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  <p class="acoes"><a class="btn" href="mailto:${E.email}?subject=${encodeURIComponent('Cotação ' + p.n)}">${ic('mail')} Pedir cotação</a></p></div>
</article>`;

function produtosPag(v) {
  return head(v, 'produtos', 'Produtos', `Linha própria Plásticos Zanotti: ${NPROD} itens entre cones, cilindro de tinturaria, carretéis vazados e fechados, gaveteiros, caixas, aros e sapatas.`) + topo(v, 'produtos') +
  cabPag('Produtos', `Linha própria com ${NPROD} itens, com código, medidas e embalagem.`) + `
<section class="sec"><div class="in">
  <nav class="indice" aria-label="Linhas">${produtos.map(p => `<a href="#${p.id}">${p.n}</a>`).join('')}<a href="${E.catalogo}" ${ext}>Catálogo em PDF</a></nav>
  ${produtos.map(blocoProd).join('')}
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Rua Vicente Zanotti, 177, Massaranduba - SC');
  return head(v, 'contato', 'Contato', 'Plásticos Zanotti: (47) 3379-4017 e (47) 3379-4004. Rua Vicente Zanotti, 177, Distrito Industrial, Massaranduba/SC.') + topo(v, 'contato') +
  cabPag('Contato', 'Orçamento de injeção, produtos, SAC ou RH.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<span>Comercial <a href="${E.foneHref}">${E.fone}</a> · <a href="${E.fone2Href}">${E.fone2}</a></span></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <iframe class="mapa" title="Mapa da Plásticos Zanotti em Massaranduba/SC" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=14&output=embed"></iframe></div>
  <div class="sobe caixa-form"><form class="form" data-email="${E.email}" data-assunto="Contato pelo site">
    <div class="form-duas"><label>Empresa *<input name="empresa" required autocomplete="organization"></label><label>Nome *<input name="nome" required autocomplete="name"></label></div>
    <div class="form-duas"><label>Telefone *<input name="fone" type="tel" required autocomplete="tel"></label><label>E-mail *<input name="email" type="email" required autocomplete="email"></label></div>
    <div class="form-duas"><label>Cidade/UF *<input name="cidade" required autocomplete="address-level2"></label><label>Setor<select name="setor"><option>Comercial</option><option>SAC</option><option>RH</option></select></label></div>
    <label>Mensagem *<textarea name="mensagem" rows="5" required></textarea></label>
    <button class="btn" type="submit">${ic('mail')} Enviar mensagem</button>
    <p class="form-nota">Abre o seu e-mail com a mensagem pronta para ${E.email}.</p>
  </form></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'Plásticos Zanotti: injeção de termoplásticos sob encomenda, ferramentaria própria e linha de cones, carretéis e caixas. Mais de 40 injetoras em Massaranduba/SC.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Injeção de plásticos · Massaranduba/SC')}
      <h1>A solução completa em <em>injeção de plásticos.</em></h1>
      <p class="ha-sub">Mais de 40 injetoras de 35 a 900 toneladas, ferramentaria própria, montagem e acabamento num parque fabril de 160 mil m².</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'contato')}">Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Injeção e ferramentaria</a></p>
    </div>
    <div class="ha-prod">${imgTopo('fabrica', 'Vista aérea do parque fabril da Zanotti')}<span class="ha-tag"><b>160 mil m²</b>de parque fabril em Massaranduba/SC</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Desde 1989</span><span>${ic('check')}40+ injetoras de 35 a 900 t</span><span>${ic('check')}Ferramentaria própria</span><span>${ic('check')}Qualidade certificada ISO</span></div></section>
<section class="sec"><div class="in duas">
  <figure class="sobe">${img('injetora', 'Injetora na fábrica da Zanotti')}</figure>
  <div class="sobe">${sobre('Serviços')}<h2>Do molde à peça montada</h2>
  <p>Injeção de termoplásticos com secagem, desumidificação, robôs e periféricos, e ferramentaria própria para construir e manter os moldes dos clientes. Know-how em ${resinas}.</p>
  <a class="link-seta" href="${link(v, 'servicos')}">Ver injeção e ferramentaria ${ic('seta')}</a></div>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Peças injetadas')}<h2>Peças para eletrônica, linha branca, móveis e construção</h2></div>
  ${gradePecas()}
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Linha própria')}<h2>Cones, carretéis, caixas e mais</h2></div>
  <ul class="pecas">${[['p-cones', 'Cones', 'cones'], ['p-carretel-vazado', 'Carretéis vazados', 'carreteis-vazados'], ['p-carretel-fechado', 'Carretéis fechados', 'carreteis-fechados'], ['p-caixa', 'Caixas e gaveteiros', 'caixas']].map(p => `<li class="sobe"><a href="${link(v, 'produtos')}#${p[2]}">${img(p[0], p[1])}</a><b>${p[1]}</b></li>`).join('')}</ul>
  <p class="acoes"><a class="link-seta" href="${link(v, 'produtos')}">Ver os ${NPROD} itens com medidas ${ic('seta')}</a></p>
</div></section>
<section class="sec sec-escura"><div class="in">${sobre('Zanotti em números')}<h2 class="sobe">Estrutura para atender os mais diversos segmentos</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Clientes')}<h2>Quem confia na Zanotti</h2></div>
  ${listaClientes()}
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Plásticos Zanotti: injeção de termoplásticos e ferramentaria própria em Massaranduba/SC desde 1989. Peças sob encomenda e linha própria de cones, carretéis e caixas.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('operador', 'Operador na fábrica da Zanotti')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('Plásticos Zanotti')}
    <h1>Transformando plástico <em>em solução.</em></h1>
    <p class="hb-sub">Injeção de termoplásticos sob encomenda e ferramentaria própria, com gente experiente em cada etapa.</p>
    <p class="ha-acoes"><a class="btn" href="${link(v, 'contato')}">Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Linha própria</a></p>
    <div class="hb-selo"><div><b>1989</b><span>fundação</span></div><div><b>40+</b><span>injetoras</span></div><div><b>900 t</b><span>maior injetora</span></div></div>
  </div></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('O que fazemos')}<h2>Três frentes, uma fábrica</h2></div>
  <ul class="pilares">
    <li class="sobe">${ic('fabrica')}<h3>Injeção</h3><p>Peças sob encomenda em ${resinas}.</p></li>
    <li class="sobe">${ic('engrenagem')}<h3>Ferramentaria</h3><p>Construção e manutenção de moldes dos clientes.</p></li>
    <li class="sobe">${ic('check')}<h3>Montagem e acabamento</h3><p>Linhas de montagem e processos de acabamento na mesma planta.</p></li>
    <li class="sobe">${ic('caminhao')}<h3>Linha própria</h3><p>${NPROD} itens: cones, carretéis, caixas, aros e sapatas.</p></li>
  </ul>
</div></section>
<section class="lado">
  <figure>${img('projeto', 'Projeto de molde na ferramentaria')}</figure>
  <div class="sobe">${sobre('Ferramentaria')}<h2>O molde nasce no projeto</h2>
  <p>A ferramentaria própria projeta, constrói e mantém moldes. Menos idas e vindas entre fornecedores e mais controle sobre prazo e qualidade da peça.</p>
  <p><a class="link-seta" href="${link(v, 'servicos')}#ferramentaria">Ver ferramentaria ${ic('seta')}</a></p></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Peças injetadas')}<h2>Feitas aqui</h2></div>
  ${gradePecas()}
</div></section>
<section class="sec sec-escura"><div class="in">${sobre('Estrutura')}<h2 class="sobe">160 mil m² em Massaranduba/SC</h2>${numeros()}</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), servicos: servicos(v), produtos: produtosPag(v), contato: contato(v) });

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Plásticos Zanotti', artigo: 'da', url: E.url, lang: 'pt', cor: '#1c6535', fundo: '#123f22', claro: '#f2f5f2',
  fonteTitulo: "'Titillium Web',system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, abre com a vista aérea da fábrica e mostra peças injetadas e linha própria.', pontos: ['Serviços, peças injetadas e linha própria na home', `Catálogo com ${NPROD} itens, códigos e medidas`, 'Qualidade e certificados'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Verde escuro, abre com quem trabalha na fábrica e destaca a ferramentaria.', pontos: ['Foto de gente na abertura', 'Ferramentaria em destaque', 'Mesmo catálogo completo'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
