// TAF Indústria de Plásticos (Joinville/SC): caixas de medição de energia, saneamento, pluvial, centros de distribuição. Gera public/{a,b}/ e a página de escolha.
// node clientes/taf/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs taf https://www.taf.ind.br/)
// Produtos (187), fotos, textos e contatos do site atual (taf.ind.br, WooCommerce Store API). Logo vetorizado (vetorizar-logo.py).
// Línguas: o site atual tem PT/EN/ES. Cada página leva as três (L(pt,en,es)); nomes e medidas dos produtos ficam em português.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const ext = 'target="_blank" rel="noopener"';
const L = (pt, en, es) => `<span class="l-pt">${pt}</span><span class="l-en">${en ?? pt}</span><span class="l-es">${es ?? pt}</span>`;
const produtos = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8')).filter(p => p.w);

const E = {
  nome: 'TAF Indústria de Plásticos', legal: 'TAF Indústria de Plásticos Ltda. · CNPJ 02.064.150/0001-94', url: 'https://taf.overtus.com.br/', antigo: 'https://www.taf.ind.br/',
  fone: '(47) 3441-9100', foneHref: 'tel:+554734419100', wa: '(47) 99782-0233', waNum: '5547997820233', email: 'contato@taf.ind.br', sac: 'sac@taf.ind.br',
  insta: 'https://www.instagram.com/tafindustria/', face: 'https://www.facebook.com/tafindustria', yt: 'https://www.youtube.com/channel/UCEl8fTTXnxIj2CHRRENIwJA',
  unidades: [
    ['Matriz · Joinville/SC', 'Rua Clodoaldo Gomes, 300, Zona Industrial Norte', 'CEP 89219-550'],
    ['Unidade 02 · Araquari/SC', 'Estrada Corveta, 2045, Quadra 77, Corveta', 'CEP 89245-000'],
    ['Unidade 03 · Simão Dias/SE', 'Rodovia Lourival Batista, s/n, Quadra 01, Lote 01, Núcleo Industrial', 'CEP 49480-000'],
    ['Unidade 04 · Araquari/SC', 'Rodovia BR-280, 11.965, Areias Pequenas', 'CEP 89245-000'],
  ],
};
const waLink = `https://wa.me/${E.waNum}`;

const linhas = [
  { id: 'medicao', cat: ['Caixa de Medição', 'Quadro de Medição'], n: ['Caixas e quadros de medição', 'Meter boxes and panels', 'Cajas y tableros de medición'], img: 'g-caixas', t: ['Caixas de medição monofásica, bifásica e trifásica, proteção geral e quadros agrupados, homologados nas concessionárias de todo o Brasil.', 'Single, two and three-phase meter boxes, main protection and grouped panels, approved by utilities all over Brazil.', 'Cajas de medición monofásica, bifásica y trifásica, protección general y tableros agrupados, homologados por las distribuidoras de todo Brasil.'] },
  { id: 'saneamento', cat: ['Saneamento'], n: ['Saneamento', 'Water utilities', 'Saneamiento'], img: 'g-saneamento', t: ['Caixas de proteção para hidrômetro, conexões e acessórios para as companhias de saneamento.', 'Water meter boxes, fittings and accessories for water utilities.', 'Cajas de protección para medidores de agua, conexiones y accesorios para las empresas de saneamiento.'] },
  { id: 'distribuicao', cat: ['Centros de Distribuição', 'Kit Barramentos'], n: ['Centros de distribuição', 'Distribution boards', 'Centros de distribución'], img: 'g-energia', t: ['Centros de distribuição de embutir e sobrepor, DIN, e kits de barramento para obras e construtoras.', 'Flush and surface distribution boards, DIN, and busbar kits for builders.', 'Centros de distribución de embutir y sobreponer, DIN, y kits de barras para constructoras.'] },
  { id: 'pluvial', cat: ['Pluvial'], n: ['Linha pluvial', 'Drainage line', 'Línea pluvial'], img: 'g-pluvial', t: ['Caixa de gordura, caixa coletora, inspeção de esgoto e prolongadores.', 'Grease traps, rainwater collectors, sewer inspection boxes and extensions.', 'Cajas de grasa, colectoras, de inspección de cloacas y prolongadores.'] },
  { id: 'acessorios', cat: ['Acessórios', 'Hastes de Aterramento'], n: ['Acessórios e aterramento', 'Accessories and grounding', 'Accesorios y puesta a tierra'], img: 'g-hastes', t: ['Caixas de passagem, curvas, flanges, armações e hastes de aterramento de baixa camada.', 'Junction boxes, bends, flanges, brackets and grounding rods.', 'Cajas de paso, curvas, bridas, armaduras y jabalinas de puesta a tierra.'] },
];
const linhaDe = p => linhas.find(l => l.cat.includes(p.cat))?.id || 'acessorios';
const deLinha = id => produtos.filter(p => linhaDe(p) === id);
const cias = [...new Set(produtos.flatMap(p => p.cia))].sort((a, b) => a.localeCompare(b, 'pt'));
const logosCias = [['copel', 'Copel'], ['edp', 'EDP'], ['light', 'Light'], ['equatorial', 'Equatorial'], ['ceee', 'CEEE'], ['neoenergia', 'Neoenergia'], ['cea-amapa', 'CEA Amapá'], ['energuate', 'Energuate (Guatemala)'], ['sabesp', 'Sabesp'], ['sanepar', 'Sanepar'], ['corsan', 'Corsan'], ['embasa', 'Embasa'], ['compesa', 'Compesa'], ['caesb', 'Caesb'], ['aguas-de-joinville', 'Águas de Joinville'], ['caern', 'Caern'], ['cajepa', 'Cagepa'], ['casal', 'Casal'], ['saae', 'SAAE'], ['mrv', 'MRV'], ['tenda', 'Tenda'], ['roga', 'Rôgga']];

const img = (n, alt, w, h, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt, w, h) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" fetchpriority="high" decoding="async">`;
const G = { 'g-caixas': [764, 663], 'g-saneamento': [777, 608], 'g-energia': [702, 626], 'g-pluvial': [812, 654], 'g-hastes': [770, 587], 'g-construtoras': [765, 687] };
const imgG = (n, alt, topo) => (topo ? imgTopo : img)(n, alt, ...G[n]);

const nav = [
  { slug: 'index', n: ['Início', 'Home', 'Inicio'] },
  { slug: 'empresa', n: ['Empresa', 'Company', 'Empresa'] },
  { slug: 'produtos', n: ['Produtos', 'Products', 'Productos'] },
  { slug: 'qualidade', n: ['Qualidade', 'Quality', 'Calidad'] },
  { slug: 'contato', n: ['Contato', 'Contact', 'Contacto'] },
];
export const nomesVersao = { a: 'Siga esta energia', b: 'Nacional com qualidade global' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,500;0,600;0,700;1,600&family=Barlow:wght@400;500;600&display=swap';
const linguaHead = `<script>(function(){try{var q=new URLSearchParams(location.search).get('lang');var l=q||localStorage.getItem('taf-lang')||'pt';if(!/^(pt|en|es)$/.test(l))l='pt';document.documentElement.setAttribute('data-l',l);if(q)localStorage.setItem('taf-lang',l)}catch(e){}})()</script>`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'TAF | Caixas de medição de energia e saneamento' : `${titulo} | TAF Indústria de Plásticos`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: v === 'a' ? '#e30613' : '#0a2554' })
  .replace('</head>', `${linguaHead}\n</head>`);

const btnOrc = (v, cls = 'btn') => `<a class="${cls}" href="${link(v, 'contato')}">${L('Pedir orçamento', 'Request a quote', 'Pedir presupuesto')}</a>`;
const linguas = `<div class="linguas" role="group" aria-label="Idioma / Language"><button data-lang="pt" aria-label="Português">PT</button><button data-lang="en" aria-label="English">EN</button><button data-lang="es" aria-label="Español">ES</button></div>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const marca = (v, w = 52) => `<img class="selo" src="/assets/selo.svg" alt="TAF" width="${w}" height="${Math.round(w * 798 / 752)}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">${L('Nacional com qualidade global', 'Brazilian-made, global quality', 'Nacional con calidad global')}</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="${waLink}" ${ext}>${icWa()}${E.wa}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a>${linguas}</span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="TAF, página inicial">${marca(v, 46)}<span class="marca-txt"><b>TAF</b><i>${L('Siga esta energia', 'Follow this energy', 'Siga esta energía')}</i></span></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${L(...n.n)}</a></li>`).join('')}</ul>${linguas}</nav>
    ${btnOrc(v, 'btn btn-topo')}
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
    <div class="rod-marca"><img src="/assets/selo.svg" alt="TAF" width="80" height="85" loading="lazy"><img class="rod-slogan" src="/assets/slogan-branco.svg" alt="Siga esta energia" width="200" height="30" loading="lazy">
      <p>${L('A maior fabricante de caixas em material polimérico da América Latina. Joinville/SC, desde 1997.', 'Latin America’s largest maker of polymer meter boxes. Joinville, Brazil, since 1997.', 'El mayor fabricante de cajas en material polimérico de América Latina. Joinville, Brasil, desde 1997.')}</p>
      <p class="rod-social"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" ${ext} aria-label="YouTube">${ic('yt')}</a></p></div>
    <div><h3>${L('Produtos', 'Products', 'Productos')}</h3><ul>${linhas.map(l => `<li><a href="${link(v, 'produtos')}?linha=${l.id}">${L(...l.n)}</a></li>`).join('')}</ul></div>
    <div><h3>${L('Atendimento', 'Contact', 'Atención')}</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${icWa()}<a href="${waLink}" ${ext}>${E.wa}</a></li>
      <li>${ic('mail')}<span><a href="mailto:${E.email}">${E.email}</a><br><a href="mailto:${E.sac}">${E.sac}</a></span></li>
      <li>${ic('pin')}<span>${E.unidades[0][1]}<br>Joinville/SC · ${E.unidades[0][2]}</span></li>
    </ul></div>
    <div><h3>${L('Clientes', 'Customers', 'Clientes')}</h3><ul>
      <li><a href="${link(v, 'contato')}#representante">${L('Seja um representante', 'Become a sales rep', 'Sea representante')}</a></li>
      <li><a href="https://taf.ind.br/boletos/" ${ext}>${L('2ª via de boletos', 'Invoice copies', '2ª vía de boletos')}</a></li>
      <li><a href="https://taf.ind.br/downloads/" ${ext}>Downloads</a></li>
      <li><a href="https://taf.ind.br/loja/" ${ext}>${L('Loja on-line', 'Online store', 'Tienda online')}</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>${L('Siga esta energia', 'Follow this energy', 'Siga esta energía')}</span></div>
</footer>
<a class="wa-flutua" href="${waLink}" ${ext} aria-label="WhatsApp TAF">${icWa()}</a>
<script src="/assets/taf.js" defer></script>
</body>
</html>`;
}

// ---------- blocos ----------
const numeros = () => `<ul class="numeros">
  <li><b>1997</b><span>${L('fundada em Joinville/SC', 'founded in Joinville, Brazil', 'fundada en Joinville, Brasil')}</span></li>
  <li><b>600+</b><span>${L('funcionários em 4 unidades', 'employees in 4 plants', 'empleados en 4 plantas')}</span></li>
  <li><b>9 mil</b><span>${L('clientes ativos', 'active customers', 'clientes activos')}</span></li>
  <li><b>27</b><span>${L('estados com produtos homologados', 'Brazilian states with approved products', 'estados con productos homologados')}</span></li>
  <li><b>13</b><span>${L('países que recebem TAF', 'export countries', 'países de exportación')}</span></li>
</ul>`;

const faixaCias = () => `<section class="cias"><div class="in"><p class="cias-tit">${L('Homologada e fornecedora de concessionárias e construtoras', 'Approved by and supplying utilities and builders', 'Homologada y proveedora de distribuidoras y constructoras')}</p>
  <ul>${logosCias.map(([f, n]) => `<li>${img(`l-${f}`, n, 120, 60)}</li>`).join('')}</ul></div></section>`;

const cartaoLinha = (v, l) => `<a class="ln-card sobe" href="${link(v, 'produtos')}?linha=${l.id}"><span class="ln-img">${imgG(l.img, l.n[0])}</span><span class="ln-txt"><b>${L(...l.n)}</b><span>${deLinha(l.id).length} ${L('produtos', 'products', 'productos')}</span></span>${ic('seta')}</a>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>${L('Monte sua lista de cotação', 'Build your quote list', 'Arme su lista de cotización')}</h2>
  <p>${L('Diga a concessionária, o produto e a quantidade. O time comercial da TAF responde e o pedido chega direto na sua loja ou obra.', 'Tell us the utility, the product and the quantity. TAF’s sales team replies and the order ships straight to your store or site.', 'Indique la distribuidora, el producto y la cantidad. El equipo comercial de TAF responde y el pedido llega directo a su tienda u obra.')}</p></div>
  <div class="ch-acoes">${btnOrc(v)}<a class="btn btn-linha" href="${waLink}" ${ext}>${icWa()}WhatsApp</a></div>
</div></section>`;

const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Contato pelo site da TAF">
  <div class="form-duas"><label>${L('Você é', 'You are', 'Usted es')}<select name="perfil"><option>Revendedor / loja</option><option>Construtora</option><option>Eletricista / instalador</option><option>Concessionária</option><option>Importador (export)</option><option>Outros</option></select></label><label>${L('Nome', 'Name', 'Nombre')} *<input name="nome" required autocomplete="name"></label></div>
  <div class="form-duas"><label>${L('Empresa', 'Company', 'Empresa')}<input name="empresa" autocomplete="organization"></label><label>${L('Cidade / UF / país', 'City / country', 'Ciudad / país')} *<input name="cidade" required autocomplete="address-level2"></label></div>
  <div class="form-duas"><label>E-mail *<input name="email" type="email" required autocomplete="email"></label><label>${L('Telefone / WhatsApp', 'Phone / WhatsApp', 'Teléfono / WhatsApp')} *<input name="fone" type="tel" required autocomplete="tel"></label></div>
  <label>${L('Produtos, concessionária e quantidades', 'Products, utility and quantities', 'Productos, distribuidora y cantidades')} *<textarea name="mensagem" rows="5" required></textarea></label>
  <button class="btn" type="submit">${L('Enviar', 'Send', 'Enviar')} ${ic('seta')}</button>
  <p class="form-nota">${L('Abre o seu e-mail com a mensagem pronta para', 'Opens your e-mail with the message ready for', 'Abre su correo con el mensaje listo para')} ${E.email}.</p>
</form>`;

const cabPag = (titulo, sub, foto) => `<section class="cab-pag${foto ? ' com-foto' : ''}">${foto ? `<div class="cp-foto">${foto}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

const ensaios = [
  ['Impacto', 'Impact', 'Impacto', 'Corpo de prova de 1 kg lançado a 2 m sobre corpo e tampa: impacto direto de 40 kg contra vandalismo.'],
  ['Penetração de água (IPX3)', 'Water ingress (IPX3)', 'Penetración de agua (IPX3)', 'Jato d’água a 50 mm por 10 minutos e a tampa é aberta para procurar qualquer vestígio de água.'],
  ['Fio incandescente', 'Glow wire', 'Hilo incandescente', 'Contato com fio incandescente por 30 s: a chama tem que se extinguir em até 30 s, sem propagar.'],
  ['Aditivo de proteção U.V.', 'UV additive', 'Aditivo U.V.', 'Confirma o aditivo ultravioleta no policarbonato, que retarda o envelhecimento da tampa ao sol.'],
  ['Torque', 'Torque', 'Torque', 'Insertos metálicos submetidos a força excessiva, sem trincas, rupturas ou deformações.'],
  ['Dimensional', 'Dimensional', 'Dimensional', 'Instrumentos de medição garantem cotas e tolerâncias de cada concessionária.'],
  ['Tração e deflexão', 'Pull and deflection', 'Tracción y deflexión', 'Simula tentativa de fraude por arrancamento da tampa.'],
  ['Carga a 50 °C', 'Load at 50 °C', 'Carga a 50 °C', 'Caixa de hidrômetro na estufa com 50 kg ou 130 kg em cada face por 5 minutos.'],
  ['Dispersão de pigmentos', 'Pigment dispersion', 'Dispersión de pigmentos', 'Análise da homogeneidade da matéria-prima dos corpos e tampas.'],
  ['Pressão na luva de latão', 'Brass sleeve pressure', 'Presión en la cupla de latón', '10 bar durante 24 horas na luva sobreinjetada das caixas de hidrômetro.'],
  ['Funcional do sistema AMD', 'AMD system test', 'Funcional del sistema AMD', 'Simula o desarme do disjuntor em curto-circuito para validar o sistema AMD.'],
];

// ---------- catálogo ----------
const specs = p => p.specs.filter(([k]) => /Dimens|Espess|Embal|Bitola|Material|Norma/.test(k)).map(([k, val]) => `<li><span>${esc(k.replace('Dimenssões', 'Dimensões'))}</span><b>${esc(val)}</b></li>`).join('');
const tabela = p => p.tab.length > 1 ? `<details class="pr-tab"><summary>${L(`${p.tab.length - 1} códigos`, `${p.tab.length - 1} codes`, `${p.tab.length - 1} códigos`)}</summary><table><thead><tr>${p.tab[0].map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${p.tab.slice(1).map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></details>` : '';
const cardProd = p => `<li class="pr" data-linha="${linhaDe(p)}" data-cia="${esc(p.cia.join('|'))}" data-busca="${esc((p.n + ' ' + p.cia.join(' ') + ' ' + p.tab.map(r => r[0]).join(' ')).toLowerCase())}">
  <a class="pr-foto" href="/assets/img/p-${p.s}.webp" data-foto="${esc(p.n)}">${img(`p-${p.s}`, p.n, p.w, p.h)}</a>
  <div class="pr-txt"><p class="pr-cat">${esc(p.cat)}</p><h3>${esc(p.n)}</h3>
  ${p.cia.length > 6 ? `<p class="pr-cias"><span>${L(`${p.cia.length} concessionárias`, `${p.cia.length} utilities`, `${p.cia.length} distribuidoras`)}</span></p>` : p.cia.length ? `<p class="pr-cias">${p.cia.map(c => `<span>${esc(c)}</span>`).join('')}</p>` : ''}
  <ul class="pr-specs">${specs(p)}</ul>${tabela(p)}</div></li>`;

// ---------- páginas internas ----------
function empresa(v) {
  return head(v, 'empresa', 'Empresa', 'TAF Indústria de Plásticos: desde 1997 em Joinville/SC, 600 funcionários, 4 unidades, produtos homologados em todo o Brasil e exportação para 13 países.') + topo(v, 'empresa') +
  cabPag(L('Conheça a TAF', 'About TAF', 'Conozca TAF'), L('Joinville, polo industrial catarinense, a mais moderna tecnologia em caixas de medição, proteção e distribuição de energia elétrica e hidráulica.', 'Joinville, Santa Catarina’s industrial hub: state-of-the-art meter, protection and distribution boxes for power and water.', 'Joinville, polo industrial de Santa Catarina: la más moderna tecnología en cajas de medición, protección y distribución de energía y agua.'), imgTopo('h-aerea', 'Vista aérea da matriz da TAF em Joinville/SC', 845, 445)) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre(L('Quem somos', 'Who we are', 'Quiénes somos'))}
    <h2>${L('A maior fabricante de caixas poliméricas da América Latina', 'Latin America’s largest maker of polymer boxes', 'El mayor fabricante de cajas poliméricas de América Latina')}</h2>
    <p>${L('Fundada com a missão de oferecer ao mercado produtos inovadores, a TAF conta com mais de 600 funcionários e cerca de nove mil clientes ativos. Os produtos são homologados em todos os estados brasileiros.', 'Founded to bring innovative products to market, TAF has more than 600 employees and around nine thousand active customers. Its products are approved in every Brazilian state.', 'Fundada para ofrecer productos innovadores, TAF cuenta con más de 600 empleados y cerca de nueve mil clientes activos. Sus productos están homologados en todos los estados de Brasil.')}</p>
    <p>${L('Atende varejo, atacado, construtoras e concessionárias, e exporta para México, Guatemala, El Salvador, Nicarágua, Costa Rica, Panamá, Equador, Colômbia, Peru, Chile, Argentina, Uruguai e Paraguai.', 'It serves retail, wholesale, builders and utilities, and exports to Mexico, Guatemala, El Salvador, Nicaragua, Costa Rica, Panama, Ecuador, Colombia, Peru, Chile, Argentina, Uruguay and Paraguay.', 'Atiende minoristas, mayoristas, constructoras y distribuidoras, y exporta a México, Guatemala, El Salvador, Nicaragua, Costa Rica, Panamá, Ecuador, Colombia, Perú, Chile, Argentina, Uruguay y Paraguay.')}</p>
  </div>
  <figure class="sobe">${img('h-fabrica', 'Unidade da TAF com a marca Siga esta Energia', 793, 445)}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in mvv">
  <div class="sobe"><h3>${L('Missão', 'Mission', 'Misión')}</h3><p>${L('Oferecer soluções inovadoras e eficientes com durabilidade e segurança para os ambientes onde vivemos.', 'To offer innovative, efficient solutions with durability and safety for the places we live in.', 'Ofrecer soluciones innovadoras y eficientes con durabilidad y seguridad para los ambientes donde vivimos.')}</p></div>
  <div class="sobe"><h3>${L('Visão', 'Vision', 'Visión')}</h3><p>${L('Estar presente nas Américas até 2030.', 'To be present across the Americas by 2030.', 'Estar presentes en las Américas hasta 2030.')}</p></div>
  <div class="sobe"><h3>${L('Valores', 'Values', 'Valores')}</h3><ul class="lista-check"><li>${L('Inovação: espírito empreendedor para as melhores soluções', 'Innovation: entrepreneurial spirit for the best solutions', 'Innovación: espíritu emprendedor para las mejores soluciones')}</li><li>${L('Agilidade: surpreender o cliente', 'Agility: surprise the customer', 'Agilidad: sorprender al cliente')}</li><li>${L('Ambiente cooperativo nas relações humanas e socioambientais', 'Cooperation in human and social-environmental relations', 'Ambiente cooperativo en las relaciones humanas y socioambientales')}</li></ul></div>
</div></section>
<section class="sec sec-escura"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Nossa história', 'Our history', 'Nuestra historia'))}<h2>${L('Nascida com a privatização das concessionárias', 'Born with the privatisation of Brazil’s utilities', 'Nacida con la privatización de las distribuidoras')}</h2></div>
  <ol class="linha-tempo">
    <li class="sobe"><b>1997</b><p>${L('Em 1º de julho, a TAF inicia as atividades na sede própria em Joinville, para oferecer soluções em medição e distribuição de energia.', 'On 1 July TAF starts operating at its own plant in Joinville, offering metering and distribution solutions.', 'El 1 de julio TAF inicia actividades en su sede propia en Joinville, con soluciones de medición y distribución de energía.')}</p></li>
    <li class="sobe"><b>2001</b><p>${L('Metalúrgica TAF passa a se chamar TAF Indústria de Plásticos: os produtos metálicos ficam com a KOCH, empresa do mesmo grupo.', 'Metalúrgica TAF becomes TAF Indústria de Plásticos; metal products move to sister company KOCH.', 'Metalúrgica TAF pasa a llamarse TAF Indústria de Plásticos; los productos metálicos quedan con KOCH, del mismo grupo.')}</p></li>
    <li class="sobe"><b>2008</b><p>${L('Implantação do laboratório de ensaios, hoje com mais de 18 ensaios para as linhas elétrica e hidráulica.', 'The test laboratory opens; today it runs more than 18 tests for the electrical and water lines.', 'Se implanta el laboratorio de ensayos, hoy con más de 18 ensayos para las líneas eléctrica e hidráulica.')}</p></li>
    <li class="sobe"><b>2022</b><p>${L('Mais de R$ 6 milhões investidos em 8 novas injetoras de última geração.', 'More than R$6 million invested in 8 new injection moulding machines.', 'Más de R$ 6 millones invertidos en 8 nuevas inyectoras de última generación.')}</p></li>
    <li class="sobe"><b>2026</b><p>${L('29 anos, 4 unidades em Santa Catarina e Sergipe e ISO 9001 renovada até 2028.', '29 years, 4 plants in Santa Catarina and Sergipe, ISO 9001 renewed to 2028.', '29 años, 4 plantas en Santa Catarina y Sergipe, ISO 9001 renovada hasta 2028.')}</p></li>
  </ol>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('4 unidades', '4 plants', '4 plantas'))}<h2>${L('Do Sul ao Nordeste', 'From the South to the Northeast', 'Del Sur al Nordeste')}</h2></div>
  <ul class="unidades">${E.unidades.map(([n, e, c]) => `<li class="sobe">${ic('fabrica')}<h3>${n}</h3><p>${e}<br>${c}</p></li>`).join('')}</ul>
</div></section>` + faixaCias() + chamada(v) + rodape(v);
}

function produtosPag(v) {
  return head(v, 'produtos', 'Produtos', `Catálogo TAF: ${produtos.length} produtos. Caixas de medição por concessionária (Enel, EDP, Copel, Celesc, Cemig, Light...), caixas para hidrômetro, centros de distribuição, linha pluvial e acessórios.`) + topo(v, 'produtos') +
  cabPag(L('Produtos', 'Products', 'Productos'), L(`${produtos.length} produtos com medidas, embalagem e códigos. Filtre pela concessionária da sua obra.`, `${produtos.length} products with sizes, packing and codes. Filter by the utility of your project.`, `${produtos.length} productos con medidas, embalaje y códigos. Filtre por la distribuidora de su obra.`)) + `
<section class="sec cat-sec"><div class="in">
  <div class="filtros" data-filtros>
    <div class="f-linhas" role="group" aria-label="Linhas"><button type="button" data-linha="" aria-pressed="true">${L('Todos', 'All', 'Todos')} <span>${produtos.length}</span></button>${linhas.map(l => `<button type="button" data-linha="${l.id}" aria-pressed="false">${L(...l.n)} <span>${deLinha(l.id).length}</span></button>`).join('')}</div>
    <div class="f-campos"><label>${L('Concessionária', 'Utility', 'Distribuidora')}<select data-cia><option value="">Todas · All</option>${cias.map(c => `<option>${esc(c)}</option>`).join('')}</select></label>
    <label>${L('Buscar', 'Search', 'Buscar')}<input type="search" data-busca placeholder="CMD3, hidrômetro, 7586..."></label></div>
    <p class="f-total" aria-live="polite"><b data-total>${produtos.length}</b> ${L('produtos', 'products', 'productos')}</p>
  </div>
  <ul class="catalogo">${produtos.map(cardProd).join('')}</ul>
  <p class="cat-vazio" hidden>${L('Nenhum produto com esse filtro. Fale com a TAF: fazemos caixas sob a norma da sua concessionária.', 'No product matches. Talk to TAF: we build boxes to your utility’s standard.', 'Ningún producto con ese filtro. Hable con TAF: fabricamos cajas según la norma de su distribuidora.')}</p>
</div></section>` + chamada(v) + rodape(v);
}

function qualidade(v) {
  return head(v, 'qualidade', 'Qualidade', 'Laboratório de ensaios da TAF desde 2008: impacto, IPX3, fio incandescente, U.V., torque, tração. ISO 9001:2015, UL 467 e certificação Intertek RETIE.') + topo(v, 'qualidade') +
  cabPag(L('Qualidade e laboratório', 'Quality and laboratory', 'Calidad y laboratorio'), L('Desde 2008 a TAF testa dentro de casa o que as concessionárias exigem: mais de 18 ensaios conforme as normas dos clientes e da ABNT.', 'Since 2008 TAF has tested in-house what utilities demand: more than 18 tests to customer and ABNT standards.', 'Desde 2008 TAF ensaya en casa lo que exigen las distribuidoras: más de 18 ensayos según normas de clientes y ABNT.'), imgTopo('h-laboratorio', 'Colaborador da TAF na linha de produção', 1353, 765)) + `
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Ensaios internos', 'In-house tests', 'Ensayos internos'))}<h2>${L('Cada caixa passa por aqui antes da concessionária', 'Every box is tested here before the utility sees it', 'Cada caja pasa por aquí antes de la distribuidora')}</h2></div>
  <ul class="ensaios">${ensaios.map((e, i) => `<li class="sobe">${img(`ens-${String(i + 1).padStart(2, '0')}`, `Ensaio de ${e[0]} no laboratório da TAF`, 300, 300)}<div><h3>${L(e[0], e[1], e[2])}</h3><p class="l-pt">${e[3]}</p></div></li>`).join('')}</ul>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Certificados', 'Certificates', 'Certificados'))}<h2>${L('Qualidade reconhecida no Brasil e fora dele', 'Quality recognised in Brazil and abroad', 'Calidad reconocida en Brasil y en el exterior')}</h2></div>
  <ul class="certs">
    <li class="sobe"><a href="/assets/img/cert-iso.webp" data-foto="ISO 9001:2015 · Fundação Vanzolini">${img('cert-iso', 'Certificado ISO 9001:2015 da TAF', 900, 1284)}</a><h3>ISO 9001:2015</h3><p>${L('Fundação Vanzolini e IQNet, nas três unidades. Válido até 2028.', 'Fundação Vanzolini and IQNet, all plants. Valid to 2028.', 'Fundação Vanzolini e IQNet, en las plantas. Válido hasta 2028.')}</p></li>
    <li class="sobe"><a href="/assets/img/cert-ul.webp" data-foto="UL 467 · Grounding and bonding">${img('cert-ul', 'Certificado UL 467 da TAF para aterramento', 900, 1272)}</a><h3>UL 467</h3><p>${L('Hastes e equipamentos de aterramento certificados pela UL.', 'UL-certified grounding and bonding equipment.', 'Jabalinas y equipos de puesta a tierra certificados por UL.')}</p></li>
    <li class="sobe"><a href="/assets/img/cert-intertek.webp" data-foto="Intertek · RETIE Colômbia">${img('cert-intertek', 'Certificado de produto Intertek RETIE da TAF', 900, 1272)}</a><h3>Intertek · RETIE</h3><p>${L('Certificado de produto para o regulamento elétrico da Colômbia.', 'Product certificate for Colombia’s electrical regulation.', 'Certificado de producto para el reglamento eléctrico de Colombia.')}</p></li>
  </ul>
</div></section>
<section class="sec"><div class="in duas">
  <figure class="sobe">${img('h-injetoras', 'Novas injetoras da TAF', 1200, 558)}</figure>
  <div class="sobe">${sobre(L('Parque fabril', 'Plant', 'Planta'))}<h2>${L('8 novas injetoras de última geração', '8 new state-of-the-art moulding machines', '8 nuevas inyectoras de última generación')}</h2>
  <p>${L('Mais de R$ 6 milhões investidos para ganhar produtividade e padronização nos produtos.', 'More than R$6 million invested for productivity and consistency.', 'Más de R$ 6 millones invertidos para ganar productividad y estandarización.')}</p>
  <h3>${L('Política da qualidade', 'Quality policy', 'Política de calidad')}</h3>
  <ul class="lista-check"><li>${L('Reconhecer, entender e aplicar os requisitos dos clientes em todo o processo', 'Understand and apply customer requirements throughout the process', 'Reconocer y aplicar los requisitos de los clientes en todo el proceso')}</li><li>${L('Processos que reduzem desperdícios e previnem problemas', 'Processes that cut waste and prevent problems', 'Procesos que reducen desperdicios y previenen problemas')}</li><li>${L('Capacitação profissional de funcionários e fornecedores', 'Training for employees and suppliers', 'Capacitación de empleados y proveedores')}</li></ul></div>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('TAF Indústria de Plásticos, Rua Clodoaldo Gomes, 300, Joinville - SC');
  return head(v, 'contato', 'Contato', 'Fale com a TAF: (47) 3441-9100, WhatsApp (47) 99782-0233, contato@taf.ind.br. Rua Clodoaldo Gomes, 300, Joinville/SC. Seja um representante.') + topo(v, 'contato') +
  cabPag(L('Contato', 'Contact', 'Contacto'), L('Orçamentos, representantes, SAC e exportação.', 'Quotes, sales reps, customer service and export.', 'Presupuestos, representantes, atención y exportación.')) + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe caixa-form">${formulario()}</div>
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
    <li>${icWa()}<a href="${waLink}" ${ext}>WhatsApp ${E.wa}</a></li>
    <li>${ic('mail')}<span><a href="mailto:${E.email}">${E.email}</a> · <a href="mailto:${E.sac}">${E.sac}</a></span></li></ul>
    <div class="aviso">${ic('escudo')}<div><h3>${L('Cuidado com boletos falsos', 'Beware of fake invoices', 'Cuidado con boletos falsos')}</h3><p>${L('Confira sempre o CNPJ 02.064.150/0001-94 e emita a 2ª via só pelo site oficial da TAF.', 'Always check TAF’s tax ID 02.064.150/0001-94 and get invoice copies only from TAF’s official site.', 'Verifique siempre el CNPJ 02.064.150/0001-94 y emita la 2ª vía solo en el sitio oficial de TAF.')} <a href="https://taf.ind.br/boletos/" ${ext}>${L('2ª via de boletos', 'Invoice copies', '2ª vía')}</a></p></div></div>
    <iframe class="mapa" title="Mapa da TAF em Joinville/SC" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=14&output=embed"></iframe></div>
</div></section>
<section class="sec sec-cinza" id="representante"><div class="in duas">
  <div class="sobe">${sobre(L('Representantes', 'Sales reps', 'Representantes'))}<h2>${L('Seja um representante TAF', 'Become a TAF sales rep', 'Sea representante TAF')}</h2>
  <p>${L('Se você é representante comercial e gostaria de representar a TAF, mande seu cadastro e venha fazer parte do nosso time de vendas.', 'If you are a sales representative and would like to represent TAF, send us your details and join our sales team.', 'Si es representante comercial y quiere representar a TAF, envíe sus datos y forme parte de nuestro equipo de ventas.')}</p>
  <a class="btn" href="mailto:${E.email}?subject=${encodeURIComponent('Quero ser representante TAF')}">${L('Enviar meu cadastro', 'Send my details', 'Enviar mis datos')}</a></div>
  <ul class="unidades unidades-mini">${E.unidades.map(([n, e, c]) => `<li><h3>${n}</h3><p>${e} · ${c}</p></li>`).join('')}</ul>
</div></section>` + rodape(v);
}

// ---------- inícios ----------
function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'TAF Indústria de Plásticos, Joinville/SC: caixas de medição de energia homologadas em todas as concessionárias, caixas para hidrômetro, centros de distribuição e linha pluvial. Desde 1997.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      <p class="sobrelinha">${L('Joinville/SC · desde 1997', 'Joinville, Brazil · since 1997', 'Joinville, Brasil · desde 1997')}</p>
      <h1>${L('Caixas de medição homologadas <em>do Oiapoque ao Chuí.</em>', 'Meter boxes approved <em>by every Brazilian utility.</em>', 'Cajas de medición homologadas <em>en todo Brasil.</em>')}</h1>
      <p class="ha-sub">${L('A maior fabricante de caixas poliméricas da América Latina: energia, saneamento, pluvial e distribuição, com laboratório próprio e ISO 9001.', 'Latin America’s largest maker of polymer boxes: power, water, drainage and distribution, with in-house lab and ISO 9001.', 'El mayor fabricante de cajas poliméricas de América Latina: energía, saneamiento, pluvial y distribución, con laboratorio propio e ISO 9001.')}</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'produtos')}">${L('Ver os produtos', 'See products', 'Ver productos')}</a>${btnOrc(v, 'btn btn-linha')}</p>
    </div>
    <figure class="ha-foto">${imgG('g-caixas', 'Caixas de medição e quadros agrupados TAF', true)}</figure>
  </div>
  <div class="in">${numeros()}</div>
</section>
${faixaCias()}
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Linhas de produtos', 'Product lines', 'Líneas de productos'))}<h2>${L('Tudo o que fica entre a rede e o medidor', 'Everything between the grid and the meter', 'Todo lo que está entre la red y el medidor')}</h2></div>
  <div class="linhas-grade">${linhas.map(l => cartaoLinha(v, l)).join('')}</div>
</div></section>

<section class="sec sec-azul"><div class="in duas">
  <div class="sobe">${sobre(L('Filtre pela concessionária', 'Filter by utility', 'Filtre por distribuidora'))}<h2>${L('Enel, Copel, Celesc, Cemig, Light, EDP…', 'Enel, Copel, Celesc, Cemig, Light, EDP…', 'Enel, Copel, Celesc, Cemig, Light, EDP…')}</h2>
  <p>${L(`Cada concessionária tem a sua norma. No catálogo você escolhe a sua entre ${cias.length} e vê só as caixas aprovadas para ela.`, `Each utility has its own standard. Pick yours among ${cias.length} and see only the boxes approved for it.`, `Cada distribuidora tiene su norma. Elija la suya entre ${cias.length} y vea solo las cajas aprobadas.`)}</p>
  <div class="chips">${cias.slice(0, 14).map(c => `<a href="${link(v, 'produtos')}?cia=${encodeURIComponent(c)}">${esc(c)}</a>`).join('')}</div></div>
  <figure class="sobe">${imgG('g-construtoras', 'Quadros de medição agrupada e centros de distribuição TAF')}</figure>
</div></section>

<section class="sec"><div class="in duas">
  <figure class="sobe foto-q">${img('h-qualidade', 'Laboratório de ensaios da TAF', 798, 500)}</figure>
  <div class="sobe">${sobre(L('Laboratório desde 2008', 'In-house lab since 2008', 'Laboratorio desde 2008'))}<h2>${L('Testada antes de ir para a parede', 'Tested before it goes on the wall', 'Probada antes de ir a la pared')}</h2>
  <p>${L('Impacto de 40 kg, chuva por 10 minutos, fio incandescente, proteção U.V., tração contra fraude: mais de 18 ensaios feitos dentro da TAF.', '40 kg impact, 10 minutes of rain, glow wire, UV protection, anti-tamper pull: more than 18 tests run in-house.', 'Impacto de 40 kg, lluvia por 10 minutos, hilo incandescente, protección U.V., tracción antifraude: más de 18 ensayos en TAF.')}</p>
  <a class="link-seta" href="${link(v, 'qualidade')}">${L('Ver ensaios e certificados', 'See tests and certificates', 'Ver ensayos y certificados')} ${ic('seta')}</a></div>
</div></section>

<section class="faixa-foto"><div class="ff-img">${img('h-aerea', 'Matriz da TAF em Joinville vista do alto', 845, 445)}</div><div class="in ff-txt sobe">
  ${sobre(L('4 unidades', '4 plants', '4 plantas'))}<h2>${L('Joinville, Araquari e Simão Dias', 'Joinville, Araquari and Simão Dias', 'Joinville, Araquari y Simão Dias')}</h2>
  <p>${L('Mais de 600 pessoas fabricando em Santa Catarina e em Sergipe, perto das concessionárias do Sul e do Nordeste.', 'More than 600 people manufacturing in Santa Catarina and Sergipe, close to utilities in the South and Northeast.', 'Más de 600 personas fabricando en Santa Catarina y Sergipe, cerca de las distribuidoras del Sur y del Nordeste.')}</p>
  <a class="link-seta" href="${link(v, 'empresa')}">${L('Conheça a TAF', 'About TAF', 'Conozca TAF')} ${ic('seta')}</a></div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'TAF: caixas de medição de energia, caixas para hidrômetro, centros de distribuição e linha pluvial. Homologada em todo o Brasil, exporta para 13 países. Joinville/SC.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('h-aerea', 'Matriz da TAF em Joinville/SC', 845, 445)}</div>
  <div class="in hb-grade">
    <div class="hb-txt">
      <p class="sobrelinha">${L('Nacional com qualidade global', 'Brazilian-made, global quality', 'Nacional con calidad global')}</p>
      <h1>${L('Siga esta <em>energia.</em>', 'Follow this <em>energy.</em>', 'Siga esta <em>energía.</em>')}</h1>
      <p class="hb-sub">${L('Caixas de medição, proteção e distribuição de energia e água, homologadas em todos os estados e exportadas para 13 países.', 'Meter, protection and distribution boxes for power and water, approved in every state and exported to 13 countries.', 'Cajas de medición, protección y distribución de energía y agua, homologadas en todo Brasil y exportadas a 13 países.')}</p>
      <p class="ha-acoes">${btnOrc(v)}<a class="btn btn-linha" href="${link(v, 'produtos')}">${L('Catálogo', 'Catalogue', 'Catálogo')}</a></p>
    </div>
    <figure class="hb-prod">${imgG('g-energia', 'Centros de distribuição e caixas de medição TAF', true)}</figure>
  </div>
</section>
<section class="faixa-num"><div class="in">${numeros()}</div></section>

<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Para quem a TAF fabrica', 'Who TAF builds for', 'Para quién fabrica TAF'))}<h2>${L('Um catálogo, quatro clientes', 'One catalogue, four customers', 'Un catálogo, cuatro clientes')}</h2></div>
  <ul class="perfis">
    <li class="sobe">${ic('casa')}<h3>${L('Concessionárias', 'Utilities', 'Distribuidoras')}</h3><p>${L('Caixas sob a norma de cada empresa de energia e saneamento.', 'Boxes built to each power and water utility’s standard.', 'Cajas según la norma de cada empresa de energía y agua.')}</p></li>
    <li class="sobe">${ic('fabrica')}<h3>${L('Construtoras', 'Builders', 'Constructoras')}</h3><p>${L('Quadros de medição agrupada e centros de distribuição para prédios e condomínios.', 'Grouped meter panels and distribution boards for buildings.', 'Tableros de medición agrupada y centros de distribución para edificios.')}</p></li>
    <li class="sobe">${ic('pacote')}<h3>${L('Revendas', 'Retailers', 'Revendedores')}</h3><p>${L('Linha completa para o balcão de material elétrico e hidráulico.', 'A full line for electrical and plumbing stores.', 'Línea completa para tiendas de material eléctrico y sanitario.')}</p></li>
    <li class="sobe">${ic('chave')}<h3>${L('Eletricistas', 'Electricians', 'Electricistas')}</h3><p>${L('A caixa certa para o padrão de entrada aprovar de primeira.', 'The right box so the service entrance passes first time.', 'La caja correcta para aprobar la acometida a la primera.')}</p></li>
  </ul>
</div></section>

<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Linhas', 'Lines', 'Líneas'))}<h2>${L('Escolha a linha', 'Choose a line', 'Elija la línea')}</h2></div>
  <div class="abas" data-abas>
    <div class="abas-lista" role="tablist">${linhas.map((l, i) => `<button role="tab" aria-selected="${i === 0}" data-aba="${l.id}">${L(...l.n)}</button>`).join('')}</div>
    ${linhas.map((l, i) => `<div class="aba-painel" role="tabpanel" data-painel="${l.id}"${i ? ' hidden' : ''}>
      <figure>${imgG(l.img, l.n[0])}</figure>
      <div class="ap-txt"><h3>${L(...l.n)}</h3><p>${L(...l.t)}</p>
      <ul class="lista-check">${deLinha(l.id).slice(0, 5).map(p => `<li>${esc(p.n)}</li>`).join('')}</ul>
      <a class="link-seta" href="${link(v, 'produtos')}?linha=${l.id}">${L(`Ver os ${deLinha(l.id).length} produtos`, `See all ${deLinha(l.id).length} products`, `Ver los ${deLinha(l.id).length} productos`)} ${ic('seta')}</a></div></div>`).join('')}
  </div>
</div></section>

<section class="sec sec-escura"><div class="in duas">
  <div class="sobe">${sobre('ISO 9001 · UL · Intertek')}<h2>${L('Laboratório próprio com mais de 18 ensaios', 'In-house lab with 18+ tests', 'Laboratorio propio con más de 18 ensayos')}</h2>
  <ul class="ens-mini">${ensaios.slice(0, 6).map(e => `<li>${L(e[0], e[1], e[2])}</li>`).join('')}</ul>
  <a class="link-seta" href="${link(v, 'qualidade')}">${L('Qualidade e certificados', 'Quality and certificates', 'Calidad y certificados')} ${ic('seta')}</a></div>
  <figure class="sobe">${img('h-laboratorio', 'Colaborador da TAF na produção', 1353, 765)}</figure>
</div></section>
` + faixaCias() + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), produtos: produtosPag(v), qualidade: qualidade(v), contato: contato(v) });

copiarSiteJs(pub, E.waNum);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
fs.copyFileSync(path.join(aqui, 'taf.js'), path.join(pub, 'assets/taf.js'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'TAF', artigo: 'da', url: E.url, lang: 'pt', cor: '#e30613', fundo: '#0a2554', claro: '#f2f5fa',
  fonteTitulo: "'Barlow Semi Condensed',system-ui,sans-serif", fonteTexto: "'Barlow',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com o vermelho e o azul do selo TAF e as caixas recortadas logo na abertura.', pontos: [`Catálogo com os ${produtos.length} produtos, filtro por concessionária e busca por código`, 'Faixa de concessionárias e construtoras atendidas', 'Português, inglês e espanhol'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Azul-marinho e vermelho, abre com a matriz de Joinville vista do alto e fala com cada tipo de cliente.', pontos: ['Concessionárias, construtoras, revendas e eletricistas', 'Linhas em abas', 'Laboratório e certificados em destaque'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
