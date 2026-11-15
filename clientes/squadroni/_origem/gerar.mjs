// Rodízios Squadroni (Mauá/SP, desde 1953): rodízios para móveis e cadeiras, ponteiras e componentes. Gera public/{a,b}/ e a página de escolha.
// node clientes/squadroni/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs squadroni https://www.squadroni.com.br/)
// Produtos (158), fotos, textos, certificados e norma do site atual (squadroni.com.br, wp-json) e do catálogo PDF 2022. Logo vetorizado do catálogo (vetorizar-logo.py).
// Línguas: o site atual tem PT/EN/ES. Cada página leva as três (L(pt,en,es)); nomes e medidas dos produtos ficam em português.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const ext = 'target="_blank" rel="noopener"';
const L = (pt, en, es) => `<span class="l-pt">${pt}</span><span class="l-en">${en ?? pt}</span><span class="l-es">${es ?? pt}</span>`;
const produtos = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));

const E = {
  nome: 'Rodízios Squadroni', legal: 'Squadroni Produtos Industriais Ltda.', url: 'https://squadroni.overtus.com.br/', antigo: 'https://www.squadroni.com.br/',
  fone: '(11) 4546-8555', foneHref: 'tel:+551145468555', wa: '(11) 99927-8173', waNum: '5511999278173', email: 'squadroni@squadroni.com.br',
  insta: 'https://www.instagram.com/rodizios_squadroni/', face: 'https://www.facebook.com/rodiziossquadroni', lin: 'https://www.linkedin.com/company/rod%C3%ADzios-squadroni/',
  end: 'Rua Dr. Ulisses Guimarães, 694, Loteamento Industrial Coral (Condomínio ACIBAM)', cidade: 'Sertãozinho · Mauá/SP · CEP 09372-050',
  catalogo: { pt: 'https://www.squadroni.com.br/wp-content/uploads/2022/09/portugues-2022.pdf', en: 'https://www.squadroni.com.br/wp-content/uploads/2022/09/english-2022.pdf', es: 'https://www.squadroni.com.br/wp-content/uploads/2022/09/espanol-2022.pdf' },
};
const waLink = `https://wa.me/${E.waNum}`;

const cats = [
  { id: 'rodizios', cat: 'Rodízios', n: ['Rodízios', 'Casters', 'Ruedas'], t: ['Para cadeiras giratórias, móveis de escritório, residenciais e equipamentos: de 15 a 100 mm, com e sem trava.', 'For swivel chairs, office and home furniture and equipment: 15 to 100 mm, with or without brake.', 'Para sillas giratorias, muebles de oficina, residenciales y equipos: de 15 a 100 mm, con y sin freno.'] },
  { id: 'ponteiras', cat: 'Ponteiras', n: ['Ponteiras e sapatas', 'Glides', 'Regatones'], t: ['Ponteiras fixas e niveladoras para cadeiras fixas, bancos e móveis.', 'Fixed and levelling glides for fixed chairs, stools and furniture.', 'Regatones fijos y niveladores para sillas fijas, banquetas y muebles.'] },
  { id: 'acessorios', cat: 'Acessórios', n: ['Componentes para cadeiras', 'Chair components', 'Componentes para sillas'], t: ['Fixações, pistões a gás, bases, encostos, conchas e capas para montar a cadeira.', 'Stems, gas lifts, bases, backrests, shells and covers to build the chair.', 'Fijaciones, pistones a gas, bases, respaldos, conchas y tapas para armar la silla.'] },
];
const catDe = p => cats.find(c => c.cat === p.cat)?.id || 'acessorios';
const deCat = id => produtos.filter(p => catDe(p) === id);

const fixacoes = [
  { id: 'HGA', n: ['Haste com anel', 'Grip ring stem', 'Vástago con anillo'], t: ['Para bases de cadeira giratória. Anel Ø 11,4 mm (base de nylon) ou 11,6 mm (base metálica).', 'For swivel chair bases. Ring Ø 11.4 mm (nylon base) or 11.6 mm (metal base).', 'Para bases de silla giratoria. Anillo Ø 11,4 mm (base de nylon) o 11,6 mm (base metálica).'] },
  { id: 'HG', n: ['Haste lisa', 'Plain stem', 'Vástago liso'], t: ['Encaixa em bucha de engate ou de redução, no tubo do móvel.', 'Fits a socket or reducing bush inside the furniture tube.', 'Encaja en buje de enganche o de reducción, en el tubo del mueble.'] },
  { id: 'HC', n: ['Chapa', 'Top plate', 'Placa'], t: ['Chapa parafusada sob o móvel, de 30 × 45 a 50 × 50 mm.', 'Plate screwed under the furniture, 30 × 45 to 50 × 50 mm.', 'Placa atornillada bajo el mueble, de 30 × 45 a 50 × 50 mm.'] },
  { id: 'HR', n: ['Rosca', 'Threaded stem', 'Rosca'], t: ['Haste roscada 5/16" ou 3/8", para porca ou inserto metálico.', '5/16" or 3/8" threaded stem for a nut or metal insert.', 'Vástago roscado 5/16" o 3/8", para tuerca o inserto metálico.'] },
  { id: 'HU', n: ['Suporte em U', 'U bracket', 'Soporte en U'], t: ['Abraça o tubo ou a peça: alta estabilidade lateral.', 'Wraps the tube or part: high side stability.', 'Abraza el tubo o la pieza: alta estabilidad lateral.'] },
  { id: 'HL', n: ['Suporte em L', 'L bracket', 'Soporte en L'], t: ['Fixação lateral para painéis e gaveteiros.', 'Side mounting for panels and pedestals.', 'Fijación lateral para paneles y cajoneras.'] },
];
const fotoFx = id => (produtos.find(p => p.fx === id && p.cat === 'Acessórios') || produtos.find(p => p.fx === id)).s;
const familias = ['SQ90', 'SQ91', '9000', 'SQ82', 'SQ100', '9800', 'SQ65', '1135'].map(m => {
  const ps = produtos.filter(p => p.mod === m);
  return { m, ps, foto: ps[0].s };
});
const modelos = [...new Set(produtos.map(p => p.mod).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt', { numeric: true }));

const img = (n, alt, w, h, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt, w, h) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" fetchpriority="high" decoding="async">`;
const P = s => produtos.find(p => p.s === s);
const imgP = (s, alt, topo) => (topo ? imgTopo : img)(`p-${s}`, alt || P(s).n, P(s).w, P(s).h);

const nav = [
  { slug: 'index', n: ['Início', 'Home', 'Inicio'] },
  { slug: 'empresa', n: ['Empresa', 'Company', 'Empresa'] },
  { slug: 'produtos', n: ['Produtos', 'Products', 'Productos'] },
  { slug: 'qualidade', n: ['Norma e qualidade', 'Standards & quality', 'Norma y calidad'] },
  { slug: 'contato', n: ['Contato', 'Contact', 'Contacto'] },
];
export const nomesVersao = { a: 'Since 1953', b: 'Linha técnica' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Saira+Semi+Condensed:wght@500;600;700&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&family=Libre+Caslon+Text:ital@1&display=swap';
const linguaHead = `<script>(function(){try{var q=new URLSearchParams(location.search).get('lang');var l=q||localStorage.getItem('squadroni-lang')||'pt';if(!/^(pt|en|es)$/.test(l))l='pt';document.documentElement.setAttribute('data-l',l);if(q)localStorage.setItem('squadroni-lang',l)}catch(e){}})()</script>`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Rodízios Squadroni | Rodízios para móveis e cadeiras desde 1953' : `${titulo} | Rodízios Squadroni`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: v === 'a' ? '#e31e24' : '#1d1e22' })
  .replace('</head>', `${linguaHead}\n</head>`);

const btnOrc = (v, cls = 'btn') => `<a class="${cls}" href="${link(v, 'contato')}">${L('Pedir orçamento', 'Request a quote', 'Pedir presupuesto')}</a>`;
const linguas = `<div class="linguas" role="group" aria-label="Idioma / Language"><button data-lang="pt" aria-label="Português">PT</button><button data-lang="en" aria-label="English">EN</button><button data-lang="es" aria-label="Español">ES</button></div>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const logo = (branco, w = 190) => `<img class="logo" src="/assets/${branco ? 'logo-branco' : 'logo'}.svg" alt="Rodízios Squadroni" width="${w}" height="${Math.round(w * 200 / 836)}">`;
const pdfCat = cls => `<a class="${cls}" href="${E.catalogo.pt}" ${ext}><span class="l-pt">Catálogo PDF</span></a><a class="${cls} l-en" href="${E.catalogo.en}" ${ext}>PDF catalogue</a><a class="${cls} l-es" href="${E.catalogo.es}" ${ext}>Catálogo PDF</a>`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Since 1953 · ${L('Mauá/SP', 'Mauá, Brazil', 'Mauá, Brasil')}</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="${waLink}" ${ext}>${icWa()}${E.wa}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a>${linguas}</span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Rodízios Squadroni, página inicial">${logo(v === 'b', 200)}</a>
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
    <div class="rod-marca">${logo(true, 210)}
      <p>${L('O maior fabricante de rodízios para móveis e cadeiras da América do Sul. Mauá/SP, desde 1953.', 'South America’s largest maker of furniture and chair casters. Mauá, Brazil, since 1953.', 'El mayor fabricante de ruedas para muebles y sillas de América del Sur. Mauá, Brasil, desde 1953.')}</p>
      <p class="rod-social"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a><a href="${E.lin}" ${ext} aria-label="LinkedIn">${ic('linkedin')}</a></p></div>
    <div><h3>${L('Produtos', 'Products', 'Productos')}</h3><ul>${cats.map(c => `<li><a href="${link(v, 'produtos')}?cat=${c.id}">${L(...c.n)}</a></li>`).join('')}<li>${pdfCat('')}</li></ul></div>
    <div><h3>${L('Atendimento', 'Contact', 'Atención')}</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${icWa()}<a href="${waLink}" ${ext}>${E.wa}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>Rua Dr. Ulisses Guimarães, 694<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>${L('Empresa', 'Company', 'Empresa')}</h3><ul>
      <li><a href="${link(v, 'empresa')}">${L('Nossa história', 'Our history', 'Nuestra historia')}</a></li>
      <li><a href="${link(v, 'qualidade')}">NBR 13962</a></li>
      <li><a href="${link(v, 'qualidade')}#certificados">${L('Certificados', 'Certificates', 'Certificados')}</a></li>
      <li><a href="${link(v, 'contato')}#distribuidor">${L('Seja distribuidor', 'Become a distributor', 'Sea distribuidor')}</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Since 1953</span></div>
</footer>
<a class="wa-flutua" href="${waLink}" ${ext} aria-label="WhatsApp Squadroni">${icWa()}</a>
<script src="/assets/squadroni.js" defer></script>
</body>
</html>`;
}

// ---------- blocos ----------
const numeros = () => `<ul class="numeros">
  <li><b>1953</b><span>${L('desde a chegada dos irmãos Squadroni', 'since the Squadroni brothers arrived', 'desde la llegada de los hermanos Squadroni')}</span></li>
  <li><b>${produtos.length}</b><span>${L('rodízios, ponteiras e componentes', 'casters, glides and components', 'ruedas, regatones y componentes')}</span></li>
  <li><b>15–100</b><span>${L('mm de diâmetro de roda', 'mm wheel diameter', 'mm de diámetro de rueda')}</span></li>
  <li><b>ISO 9001</b><span>${L('certificação SGS', 'SGS certification', 'certificación SGS')}</span></li>
  <li><b>NBR 13962</b><span>${L('certificada pela ABNT', 'certified by ABNT', 'certificada por ABNT')}</span></li>
</ul>`;

const fotoCat = { rodizios: 'rodizio-9000-hu', ponteiras: null, acessorios: 'base-alpha-secretaria-cromada-600mm' };
const cardCat = (v, c) => { const ex = fotoCat[c.id] ? P(fotoCat[c.id]) : deCat(c.id)[1]; return `<a class="ct-card sobe" href="${link(v, 'produtos')}?cat=${c.id}"><span class="ct-img">${imgP(ex.s, c.n[0])}</span><span class="ct-txt"><b>${L(...c.n)}</b><span>${L(...c.t)}</span><i>${deCat(c.id).length} ${L('itens', 'items', 'ítems')} ${ic('seta')}</i></span></a>`; };

const guiaFix = v => `<ul class="fixacoes">${fixacoes.map(f => `<li class="sobe"><a href="${link(v, 'produtos')}?fx=${f.id}"><span class="fx-img">${imgP(fotoFx(f.id), `Fixação ${f.id}`)}</span><span class="fx-cod">${f.id}</span><b>${L(...f.n)}</b><span class="fx-t">${L(...f.t)}</span></a></li>`).join('')}</ul>`;

const pistas = () => `<div class="pistas">
  <div class="pista sobe"><span class="pista-tipo">H</span><h3>${L('Tipo H · roda rígida', 'Type H · hard wheel', 'Tipo H · rueda rígida')}</h3><p>${L('Banda de rodagem dura, de uma só cor em toda a roda. Para pisos com tapete ou carpete.', 'Hard tread in a single colour across the wheel. For rugs and carpet.', 'Banda de rodadura dura, de un solo color. Para pisos con alfombra o moqueta.')}</p></div>
  <div class="pista pista-w sobe"><span class="pista-tipo">W</span><h3>${L('Tipo W · roda macia', 'Type W · soft wheel', 'Tipo W · rueda blanda')}</h3><p>${L('Roda revestida de material resiliente, com centro e banda de rodagem em cores diferentes. Para pedra, madeira, cerâmica, laminado e qualquer piso sem carpete. Não risca.', 'Wheel coated with resilient material, hub and tread in different colours. For stone, wood, tile, laminate and any uncarpeted floor. Won’t scratch.', 'Rueda revestida de material resiliente, centro y banda de colores distintos. Para piedra, madera, cerámica, laminado y cualquier piso sin alfombra. No raya.')}</p></div>
</div>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>${L('Fale com a engenharia de vendas', 'Talk to our sales engineers', 'Hable con ingeniería de ventas')}</h2>
  <p>${L('Diga o modelo, a fixação, a cor e a quantidade. Para fabricantes de cadeiras e móveis, desenvolvemos a peça junto com o seu projeto.', 'Tell us the model, stem, colour and quantity. For chair and furniture makers we develop the part with your project.', 'Indique modelo, fijación, color y cantidad. Para fabricantes de sillas y muebles desarrollamos la pieza junto con su proyecto.')}</p></div>
  <div class="ch-acoes">${btnOrc(v)}<a class="btn btn-linha" href="${waLink}" ${ext}>${icWa()}WhatsApp</a></div>
</div></section>`;

const formulario = () => `<form class="form" data-wa="${E.waNum}" data-assunto="Contato pelo site da Squadroni">
  <div class="form-duas"><label>${L('Você é', 'You are', 'Usted es')}<select name="perfil"><option>Fabricante de cadeiras / móveis</option><option>Distribuidor / revenda</option><option>Marceneiro / montador</option><option>Importador (export)</option><option>Outros</option></select></label><label>${L('Nome', 'Name', 'Nombre')} *<input name="nome" required autocomplete="name"></label></div>
  <div class="form-duas"><label>${L('Empresa', 'Company', 'Empresa')}<input name="empresa" autocomplete="organization"></label><label>${L('Cidade / UF / país', 'City / country', 'Ciudad / país')} *<input name="cidade" required autocomplete="address-level2"></label></div>
  <div class="form-duas"><label>E-mail *<input name="email" type="email" required autocomplete="email"></label><label>${L('Telefone / WhatsApp', 'Phone / WhatsApp', 'Teléfono / WhatsApp')} *<input name="fone" type="tel" required autocomplete="tel"></label></div>
  <label>${L('Modelos, fixação, cor e quantidades', 'Models, stem, colour and quantities', 'Modelos, fijación, color y cantidades')} *<textarea name="mensagem" rows="5" required placeholder="Ex.: SQ90 HGA preto pista PU, 5.000 un."></textarea></label>
  <button class="btn" type="submit">${L('Enviar pelo WhatsApp', 'Send via WhatsApp', 'Enviar por WhatsApp')} ${ic('seta')}</button>
  <p class="form-nota">${L('Abre o WhatsApp da Squadroni com a mensagem pronta.', 'Opens Squadroni’s WhatsApp with the message ready.', 'Abre el WhatsApp de Squadroni con el mensaje listo.')}</p>
</form>`;

const cabPag = (titulo, sub, foto) => `<section class="cab-pag${foto ? ' com-foto' : ''}">${foto ? `<div class="cp-foto">${foto}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

// ---------- catálogo ----------
const specs = p => p.specs.slice(0, 5).map(([k, val]) => `<li><span>${esc(k)}</span><b>${esc(val)}</b></li>`).join('');
const cardProd = p => `<li class="pr" data-cat="${catDe(p)}" data-fx="${p.fx}" data-mod="${p.mod}" data-busca="${esc((p.n + ' ' + p.fx + ' ' + p.mod).toLowerCase())}">
  <a class="pr-foto" href="/assets/img/p-${p.s}.webp" data-foto="${esc(p.n)}">${img(`p-${p.s}`, p.n, p.w, p.h)}</a>
  <div class="pr-txt"><p class="pr-cat">${esc(p.cat)}${p.fx ? ` · <b>${p.fx}</b>` : ''}</p><h3>${esc(p.n)}</h3>
  ${p.specs.length ? `<ul class="pr-specs">${specs(p)}</ul>` : p.intro ? `<p class="pr-intro">${esc(p.intro)}</p>` : ''}
  ${p.pdf ? `<a class="pr-pdf" href="${esc(p.pdf)}" ${ext}>${ic('livro')} ${L('Ficha técnica', 'Data sheet', 'Ficha técnica')}</a>` : ''}</div></li>`;

// ---------- páginas internas ----------
function empresa(v) {
  return head(v, 'empresa', 'Empresa', 'Rodízios Squadroni: desde a década de 50 em São Paulo, hoje o maior fabricante de rodízios para móveis e cadeiras da América do Sul. Engenharia, laboratório e fábrica em Mauá/SP.') + topo(v, 'empresa') +
  cabPag(L('Uma linha reta em direção ao topo', 'A straight line to the top', 'Una línea recta hacia la cima'), L('A história da Squadroni começa na década de 50, quando dois irmãos desembarcaram em terras brasileiras.', 'Squadroni’s story begins in the 1950s, when two brothers landed in Brazil.', 'La historia de Squadroni empieza en los años 50, cuando dos hermanos desembarcaron en Brasil.'), imgTopo('h-aerea', 'Vista aérea da fábrica da Squadroni em Mauá/SP', 640, 338)) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre(L('Quem somos', 'Who we are', 'Quiénes somos'))}
    <h2>${L('De peças para a indústria mecânica ao maior fabricante de rodízios da América do Sul', 'From mechanical parts to South America’s largest caster maker', 'De piezas para la industria mecánica al mayor fabricante de ruedas de América del Sur')}</h2>
    <p>${L('Com trabalho árduo e muita competência, os irmãos Squadroni mudaram o rumo de uma empresa que fabricava peças para a indústria mecânica e a transformaram no maior fabricante de rodízios para móveis e cadeiras da América do Sul.', 'With hard work and skill, the Squadroni brothers turned a company making parts for the mechanical industry into South America’s largest maker of furniture and chair casters.', 'Con trabajo duro y mucha competencia, los hermanos Squadroni transformaron una empresa de piezas para la industria mecánica en el mayor fabricante de ruedas para muebles y sillas de América del Sur.')}</p>
    <p>${L('Hoje, os rodízios Squadroni são sinônimo de resistência e durabilidade para o exigente mercado de móveis, com influência do design italiano e alemão.', 'Today Squadroni casters stand for strength and durability in the demanding furniture market, with Italian and German design influence.', 'Hoy las ruedas Squadroni son sinónimo de resistencia y durabilidad para el exigente mercado del mueble, con influencia del diseño italiano y alemán.')}</p>
  </div>
  <figure class="sobe">${img('h-producao', 'Linha de produção da Squadroni', 640, 426)}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Como trabalhamos', 'How we work', 'Cómo trabajamos'))}<h2>${L('Engenharia, fábrica e planejamento debaixo do mesmo teto', 'Engineering, plant and planning under one roof', 'Ingeniería, fábrica y planificación bajo el mismo techo')}</h2></div>
  <ul class="areas">
    <li class="sobe">${img('h-desenho', 'Desenho técnico de rodízio Squadroni', 640, 426)}<h3>${L('Engenharia', 'Engineering', 'Ingeniería')}</h3><p>${L('Profissionais de larga experiência desenvolvem novos produtos, pesquisam materiais e estudam a viabilidade técnica e produtiva.', 'Experienced engineers develop new products, research materials and study technical and production feasibility.', 'Profesionales de larga experiencia desarrollan nuevos productos, investigan materiales y estudian la viabilidad técnica y productiva.')}</p></li>
    <li class="sobe">${img('h-producao', 'Fábrica da Squadroni', 640, 426)}<h3>${L('Fábrica', 'Plant', 'Fábrica')}</h3><p>${L('Equipamentos automatizados, muitos desenvolvidos só para a Squadroni, mantêm a linha em fluxo intenso e testam cada peça individualmente.', 'Automated equipment, much of it built for Squadroni, keeps the line moving and tests every single part.', 'Equipos automatizados, muchos desarrollados solo para Squadroni, mantienen la línea en flujo intenso y prueban cada pieza.')}</p></li>
    <li class="sobe">${img('h-laboratorio', 'Laboratório de ensaios da Squadroni', 640, 379)}<h3>${L('Laboratório', 'Laboratory', 'Laboratorio')}</h3><p>${L('Ensaios de tração, durabilidade e resistência em toda a linha, antes de o rodízio chegar à cadeira.', 'Pull, durability and strength tests across the range before a caster reaches a chair.', 'Ensayos de tracción, durabilidad y resistencia en toda la línea antes de que la rueda llegue a la silla.')}</p></li>
    <li class="sobe">${img('h-frota', 'Frota de entrega da Squadroni', 640, 426)}<h3>${L('Entrega própria', 'Own delivery', 'Entrega propia')}</h3><p>${L('Frota com a marca Squadroni para atender fabricantes e distribuidores.', 'A Squadroni-branded fleet serving manufacturers and distributors.', 'Flota con la marca Squadroni para atender fabricantes y distribuidores.')}</p></li>
  </ul>
</div></section>
<section class="sec sec-escura"><div class="in duas">
  <div class="sobe">${sobre(L('Filosofia', 'Philosophy', 'Filosofía'))}<h2>${L('Oferecer sempre o melhor para o mercado de móveis', 'Always the best for the furniture market', 'Ofrecer siempre lo mejor al mercado del mueble')}</h2>
  <p>${L('Todos os rodízios para cadeiras giratórias que a Squadroni produz estão em conformidade com as normas internacionais de segurança, e os produtos são laudados inclusive pelo Instituto Catas, na Itália, um dos mais conceituados do mundo.', 'Every swivel-chair caster Squadroni makes complies with international safety standards, and products are also tested by Italy’s Catas Institute, one of the most respected in the world.', 'Todas las ruedas para sillas giratorias que produce Squadroni cumplen las normas internacionales de seguridad, y los productos están certificados incluso por el Instituto Catas, en Italia.')}</p>
  <a class="link-seta" href="${link(v, 'qualidade')}">${L('Norma e certificados', 'Standards and certificates', 'Norma y certificados')} ${ic('seta')}</a></div>
  <figure class="sobe">${img('h-rodizios', 'Rodízios Squadroni sobre desenho técnico', 880, 700)}</figure>
</div></section>` + chamada(v) + rodape(v);
}

function produtosPag(v) {
  return head(v, 'produtos', 'Produtos', `Catálogo Squadroni: ${produtos.length} rodízios para móveis e cadeiras (SQ90, SQ91 Gel, 9000, SQ100...), ponteiras e fixações HGA, HG, HC, HR, HU e HL.`) + topo(v, 'produtos') +
  cabPag(L('Produtos', 'Products', 'Productos'), L(`${produtos.length} itens. Filtre pelo tipo de fixação ou pelo modelo.`, `${produtos.length} items. Filter by stem type or model.`, `${produtos.length} ítems. Filtre por fijación o modelo.`)) + `
<section class="sec cat-sec"><div class="in">
  <div class="filtros" data-filtros>
    <div class="f-linhas" role="group" aria-label="Categorias"><button type="button" data-cat="" aria-pressed="true">${L('Todos', 'All', 'Todos')} <span>${produtos.length}</span></button>${cats.map(c => `<button type="button" data-cat="${c.id}" aria-pressed="false">${L(...c.n)} <span>${deCat(c.id).length}</span></button>`).join('')}</div>
    <div class="f-campos"><label>${L('Fixação', 'Stem', 'Fijación')}<select data-fx><option value="">Todas · All</option>${fixacoes.map(f => `<option value="${f.id}">${f.id} · ${f.n[0]}</option>`).join('')}<option value="HGB">HGB</option></select></label>
    <label>${L('Modelo', 'Model', 'Modelo')}<select data-mod><option value="">Todos · All</option>${modelos.map(m => `<option>${m}</option>`).join('')}</select></label>
    <label>${L('Buscar', 'Search', 'Buscar')}<input type="search" data-busca placeholder="SQ90, trava, gel, cromado..."></label></div>
    <p class="f-total" aria-live="polite"><b data-total>${produtos.length}</b> ${L('itens', 'items', 'ítems')} · ${pdfCat('link-pdf')}</p>
  </div>
  <ul class="catalogo">${produtos.map(cardProd).join('')}</ul>
  <p class="cat-vazio" hidden>${L('Nenhum item com esse filtro. Fale com a Squadroni: outras fixações, cores e acabamentos sob consulta.', 'No item matches. Talk to Squadroni: other stems, colours and finishes on request.', 'Ningún ítem con ese filtro. Hable con Squadroni: otras fijaciones, colores y acabados a pedido.')}</p>
</div></section>` + chamada(v) + rodape(v);
}

function qualidade(v) {
  return head(v, 'qualidade', 'Norma e qualidade', 'Rodízios Squadroni conforme NBR 13962: tipo H (carpete) e tipo W (pisos duros). Laboratório próprio, ISO 9001:2015 SGS, certificado ABNT e laudos CATAS, CETEMO e Mauá.') + topo(v, 'qualidade') +
  cabPag(L('Norma e qualidade', 'Standards and quality', 'Norma y calidad'), L('Laboratório próprio, certificação ABNT da linha SQ90 e laudos de institutos no Brasil e na Itália.', 'In-house lab, ABNT certification for the SQ90 line and test reports from institutes in Brazil and Italy.', 'Laboratorio propio, certificación ABNT de la línea SQ90 e informes de institutos en Brasil e Italia.'), imgTopo('h-laboratorio', 'Laboratório de ensaios da Squadroni', 640, 379)) + `
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('ABNT NBR 13962')}<h2>${L('Qual roda vai no seu piso', 'Which wheel for your floor', 'Qué rueda para su piso')}</h2>
  <p>${L('A norma de cadeiras de escritório separa os rodízios em dois tipos. Escolher o certo evita riscar o piso ou travar no carpete.', 'The office chair standard splits casters into two types. The right one won’t scratch the floor or stick on carpet.', 'La norma de sillas de oficina separa las ruedas en dos tipos. La correcta no raya el piso ni se traba en la alfombra.')}</p></div>
  ${pistas()}
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <div class="sobe">${sobre(L('Ensaio de durabilidade', 'Durability test', 'Ensayo de durabilidad'))}<h2>${L('100 mil ciclos antes de aprovar', '100,000 cycles before approval', '100 mil ciclos antes de aprobar')}</h2>
  <ul class="ensaio-passos">
    <li><b>2.000</b><span>${L('ciclos sobre três obstáculos de metal de 51 × 3,2 mm', 'cycles over three 51 × 3.2 mm metal strips', 'ciclos sobre tres obstáculos de metal de 51 × 3,2 mm')}</span></li>
    <li><b>98.000</b><span>${L('ciclos em superfície lisa e rígida, a 10 ciclos por minuto', 'cycles on a smooth hard surface at 10 cycles per minute', 'ciclos en superficie lisa y rígida, a 10 ciclos por minuto')}</span></li>
    <li><b>762 mm</b><span>${L('de curso mínimo em cada ida e volta, com a cadeira carregada', 'minimum stroke each way, with the chair loaded', 'de recorrido mínimo en cada ida y vuelta, con la silla cargada')}</span></li>
    <li><b>22 N</b><span>${L('aplicados em cada rodízio no fim, na linha da haste', 'applied to each caster at the end, on the stem line', 'aplicados a cada rueda al final, en la línea del vástago')}</span></li>
  </ul></div>
  <figure class="sobe">${img('h-desenho', 'Desenho técnico de rodízio Squadroni', 640, 426)}</figure>
</div></section>
<section class="sec" id="certificados"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Certificados e laudos', 'Certificates and reports', 'Certificados e informes'))}<h2>${L('Reconhecida no Brasil e na Itália', 'Recognised in Brazil and Italy', 'Reconocida en Brasil e Italia')}</h2></div>
  <ul class="certs">
    <li class="sobe"><a href="/assets/img/cert-iso.webp" data-foto="ISO 9001:2015 · SGS">${img('cert-iso', 'Certificado ISO 9001:2015 SGS da Squadroni', 671, 950)}</a><h3>ISO 9001:2015</h3><p>${L('Sistema de gestão certificado pela SGS para projeto e fabricação de rodízios e acessórios para a indústria moveleira.', 'Management system certified by SGS for designing and making casters and accessories for the furniture industry.', 'Sistema de gestión certificado por SGS para diseño y fabricación de ruedas y accesorios para la industria del mueble.')}</p></li>
    <li class="sobe"><a href="/assets/img/cert-abnt.webp" data-foto="ABNT · Rodízios para cadeiras linha SQ90">${img('cert-abnt', 'Certificado de conformidade ABNT da linha SQ90', 800, 1100)}</a><h3>ABNT · ${L('linha SQ90', 'SQ90 line', 'línea SQ90')}</h3><p>${L('Certificado de conformidade com a NBR 13962 para os rodízios de cadeira SQ90.', 'Conformity certificate to NBR 13962 for SQ90 chair casters.', 'Certificado de conformidad con NBR 13962 para las ruedas SQ90.')}</p></li>
    <li class="sobe"><a href="/assets/img/cert-ensaio.webp" data-foto="Relatório de ensaio · Mauá">${img('cert-ensaio', 'Relatório de ensaio de rodízio Squadroni', 800, 1153)}</a><h3>${L('Laudos CATAS, CETEMO e Mauá', 'CATAS, CETEMO and Mauá reports', 'Informes CATAS, CETEMO y Mauá')}</h3><p>${L('SQ90 HGA e SQ65 HGA ensaiados nos tipos H e W, inclusive pelo Instituto Catas, na Itália.', 'SQ90 HGA and SQ65 HGA tested as type H and W, including by Italy’s Catas Institute.', 'SQ90 HGA y SQ65 HGA ensayados en tipos H y W, incluso por el Instituto Catas, en Italia.')}</p></li>
  </ul>
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <figure class="sobe"><a href="/assets/img/cert-politica.webp" data-foto="Política da Qualidade Squadroni">${img('cert-politica', 'Política da Qualidade da Squadroni', 900, 625)}</a></figure>
  <div class="sobe">${sobre(L('Política da qualidade', 'Quality policy', 'Política de calidad'))}<h2>${L('Assinada por Sandro e Sérgio Squadroni', 'Signed by Sandro and Sérgio Squadroni', 'Firmada por Sandro y Sérgio Squadroni')}</h2>
  <ul class="lista-check"><li>${L('Produzir com alta qualidade, dentro do melhor prazo', 'High quality, on the best lead time', 'Alta calidad, en el mejor plazo')}</li><li>${L('Atender e superar as expectativas dos clientes', 'Meet and exceed customer expectations', 'Atender y superar las expectativas de los clientes')}</li><li>${L('Melhorar continuamente produtos, serviços e o sistema de gestão', 'Continuously improve products, services and management', 'Mejorar continuamente productos, servicios y gestión')}</li><li>${L('Capacitar todos os colaboradores', 'Train every employee', 'Capacitar a todos los colaboradores')}</li></ul></div>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Rodízios Squadroni, Rua Dr. Ulisses Guimarães, 694, Mauá - SP');
  return head(v, 'contato', 'Contato', 'Fale com a Squadroni: (11) 4546-8555, WhatsApp (11) 99927-8173, squadroni@squadroni.com.br. Rua Dr. Ulisses Guimarães, 694, Mauá/SP.') + topo(v, 'contato') +
  cabPag(L('Contato', 'Contact', 'Contacto'), L('Orçamentos, desenvolvimento de produto, distribuidores e exportação.', 'Quotes, product development, distributors and export.', 'Presupuestos, desarrollo de producto, distribuidores y exportación.')) + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe caixa-form">${formulario()}</div>
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
    <li>${icWa()}<a href="${waLink}" ${ext}>WhatsApp ${E.wa}</a></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <iframe class="mapa" title="Mapa da Squadroni em Mauá/SP" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=14&output=embed"></iframe></div>
</div></section>
<section class="sec sec-cinza" id="distribuidor"><div class="in duas">
  <div class="sobe">${sobre(L('Distribuidores', 'Distributors', 'Distribuidores'))}<h2>${L('Revenda rodízios Squadroni', 'Sell Squadroni casters', 'Revenda ruedas Squadroni')}</h2>
  <p>${L('A Squadroni atende fabricantes e distribuidores em todo o Brasil e no exterior. Mande o seu cadastro com a região e o tipo de cliente que você atende.', 'Squadroni serves manufacturers and distributors across Brazil and abroad. Send us your details, region and customer type.', 'Squadroni atiende fabricantes y distribuidores en todo Brasil y el exterior. Envíe sus datos, región y tipo de cliente.')}</p>
  <a class="btn" href="mailto:${E.email}?subject=${encodeURIComponent('Quero ser distribuidor Squadroni')}">${L('Enviar meu cadastro', 'Send my details', 'Enviar mis datos')}</a></div>
  <figure class="sobe">${img('h-frota', 'Frota de entrega da Squadroni', 640, 426)}</figure>
</div></section>` + rodape(v);
}

// ---------- inícios ----------
function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'Rodízios Squadroni, Mauá/SP: rodízios para cadeiras e móveis desde 1953. SQ90, SQ91 Gel, 9000 cromado, SQ100 e mais 150 itens, fixações HGA, HG, HC, HR, HU e HL. ISO 9001 e NBR 13962.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      <p class="sobrelinha">Since 1953 · ${L('Mauá/SP', 'Mauá, Brazil', 'Mauá, Brasil')}</p>
      <h1>${L('O rodízio da sua cadeira <em>provavelmente é nosso.</em>', 'Your chair’s caster <em>is probably ours.</em>', 'La rueda de su silla <em>probablemente es nuestra.</em>')}</h1>
      <p class="ha-sub">${L('Maior fabricante de rodízios para móveis e cadeiras da América do Sul: engenharia própria, laboratório de ensaios e certificação NBR 13962.', 'South America’s largest maker of furniture and chair casters: in-house engineering, test lab and NBR 13962 certification.', 'El mayor fabricante de ruedas para muebles y sillas de América del Sur: ingeniería propia, laboratorio de ensayos y certificación NBR 13962.')}</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'produtos')}">${L('Ver os produtos', 'See products', 'Ver productos')}</a>${btnOrc(v, 'btn btn-linha')}</p>
    </div>
    <figure class="ha-foto">${imgTopo('h-rodizios', 'Rodízios Squadroni sobre desenho técnico', 880, 700)}</figure>
  </div>
  <div class="in">${numeros()}</div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Linhas', 'Lines', 'Líneas'))}<h2>${L('Tudo o que fica entre a cadeira e o chão', 'Everything between the chair and the floor', 'Todo lo que está entre la silla y el piso')}</h2></div>
  <div class="cats-grade">${cats.map(c => cardCat(v, c)).join('')}</div>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Guia de fixação', 'Stem guide', 'Guía de fijación'))}<h2>${L('Seis jeitos de prender o rodízio', 'Six ways to mount a caster', 'Seis formas de fijar la rueda')}</h2><p>${L('O código no fim do nome diz a fixação. Clique para ver todos os modelos com ela.', 'The code at the end of the name is the stem. Click to see every model with it.', 'El código al final del nombre es la fijación. Haga clic para ver todos los modelos.')}</p></div>
  ${guiaFix(v)}
</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('NBR 13962')}<h2>${L('Carpete ou piso duro?', 'Carpet or hard floor?', '¿Alfombra o piso duro?')}</h2>
  <p>${L('A roda rígida (tipo H) corre no carpete; a macia (tipo W) protege madeira, porcelanato e laminado. A Squadroni faz as duas e testa as duas.', 'The hard wheel (type H) rolls on carpet; the soft one (type W) protects wood, tile and laminate. Squadroni makes and tests both.', 'La rueda rígida (tipo H) rueda en alfombra; la blanda (tipo W) protege madera, porcelanato y laminado. Squadroni fabrica y prueba ambas.')}</p>
  <a class="link-seta" href="${link(v, 'qualidade')}">${L('Norma e certificados', 'Standards and certificates', 'Norma y certificados')} ${ic('seta')}</a></div>
  ${pistas()}
</div></section>
<section class="faixa-foto"><div class="ff-img">${img('h-aerea', 'Fábrica da Squadroni em Mauá vista do alto', 640, 338)}</div><div class="in ff-txt sobe">
  ${sobre(L('Desde a década de 50', 'Since the 1950s', 'Desde los años 50'))}<h2>${L('Dois irmãos, uma fábrica em Mauá', 'Two brothers, one plant in Mauá', 'Dos hermanos, una fábrica en Mauá')}</h2>
  <p>${L('Os irmãos Squadroni chegaram ao Brasil fazendo peças para a indústria mecânica. Hoje a fábrica de Mauá abastece fabricantes de cadeiras e móveis e distribuidores de todo o país.', 'The Squadroni brothers arrived in Brazil making mechanical parts. Today the Mauá plant supplies chair and furniture makers and distributors nationwide.', 'Los hermanos Squadroni llegaron a Brasil haciendo piezas mecánicas. Hoy la fábrica de Mauá abastece a fabricantes de sillas y muebles y distribuidores de todo el país.')}</p>
  <a class="link-seta" href="${link(v, 'empresa')}">${L('Nossa história', 'Our history', 'Nuestra historia')} ${ic('seta')}</a></div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Rodízios Squadroni: rodízios para cadeiras giratórias e móveis, ponteiras e fixações. Catálogo técnico com 158 itens, NBR 13962, ISO 9001. Mauá/SP desde 1953.') + topo(v, 'index') + `
<section class="herob">
  <div class="in hb-grade">
    <div class="hb-txt">
      <p class="sobrelinha">${L('Tecnologia e resistência para a indústria moveleira', 'Technology and strength for the furniture industry', 'Tecnología y resistencia para la industria del mueble')}</p>
      <h1>${L('Feito para <em>rodar.</em>', 'Built to <em>roll.</em>', 'Hecho para <em>rodar.</em>')}</h1>
      <p class="hb-sub">${L(`${produtos.length} rodízios, ponteiras e fixações com ficha técnica, do SQ15 de 15 mm ao SQ100 de 100 kg por roda.`, `${produtos.length} casters, glides and stems with data sheets, from the 15 mm SQ15 to the SQ100 rated 100 kg per wheel.`, `${produtos.length} ruedas, regatones y fijaciones con ficha técnica, del SQ15 de 15 mm al SQ100 de 100 kg por rueda.`)}</p>
      <p class="ha-acoes">${btnOrc(v)}<a class="btn btn-linha" href="${link(v, 'produtos')}">${L('Catálogo', 'Catalogue', 'Catálogo')}</a></p>
    </div>
    <figure class="hb-prod">${imgTopo('h-rodizios', 'Rodízios Squadroni', 880, 700)}</figure>
  </div>
</section>
<section class="faixa-num"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Modelos', 'Models', 'Modelos'))}<h2>${L('As famílias mais pedidas', 'Best-selling families', 'Las familias más pedidas')}</h2></div>
  <ul class="familias">${familias.map(f => `<li class="sobe"><a href="${link(v, 'produtos')}?mod=${f.m}"><span class="fm-img">${imgP(f.foto, `Rodízio ${f.m}`)}</span><b>${f.m}</b><span>${f.ps.length} ${L('versões', 'versions', 'versiones')} · ${[...new Set(f.ps.map(p => p.fx).filter(Boolean))].join(' ')}</span></a></li>`).join('')}</ul>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Fixações', 'Stems', 'Fijaciones'))}<h2>${L('Escolha pelo encaixe', 'Choose by mounting', 'Elija por el encaje')}</h2></div>
  ${guiaFix(v)}
</div></section>
<section class="sec sec-escura"><div class="in duas">
  <div class="sobe">${sobre('ISO 9001 · ABNT · CATAS')}<h2>${L('Laboratório próprio e 100 mil ciclos de ensaio', 'In-house lab and 100,000 test cycles', 'Laboratorio propio y 100 mil ciclos de ensayo')}</h2>
  <p>${L('Tração, durabilidade e resistência em toda a linha. Laudos tipo H e W pelo CATAS (Itália), CETEMO e laboratório de Mauá.', 'Pull, durability and strength across the range. Type H and W reports by CATAS (Italy), CETEMO and the Mauá lab.', 'Tracción, durabilidad y resistencia en toda la línea. Informes tipo H y W por CATAS (Italia), CETEMO y laboratorio de Mauá.')}</p>
  ${pistas()}
  <a class="link-seta" href="${link(v, 'qualidade')}">${L('Norma e qualidade', 'Standards and quality', 'Norma y calidad')} ${ic('seta')}</a></div>
  <figure class="sobe">${img('h-laboratorio', 'Laboratório de ensaios da Squadroni', 640, 379)}</figure>
</div></section>
<section class="sec"><div class="in duas">
  <figure class="sobe">${img('h-producao', 'Linha de produção da Squadroni em Mauá/SP', 640, 426)}</figure>
  <div class="sobe">${sobre('Since 1953')}<h2>${L('Do desenho à entrega, na mesma casa', 'From drawing to delivery, in-house', 'Del dibujo a la entrega, en casa')}</h2>
  <p>${L('Engenharia que desenvolve a peça com o fabricante de cadeiras, máquinas feitas sob medida para a Squadroni e frota própria de entrega.', 'Engineers who develop the part with the chair maker, machines built for Squadroni and an own delivery fleet.', 'Ingeniería que desarrolla la pieza con el fabricante de sillas, máquinas hechas a medida y flota propia.')}</p>
  <a class="link-seta" href="${link(v, 'empresa')}">${L('Conheça a Squadroni', 'About Squadroni', 'Conozca Squadroni')} ${ic('seta')}</a></div>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), produtos: produtosPag(v), qualidade: qualidade(v), contato: contato(v) });

copiarSiteJs(pub, E.waNum);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
fs.copyFileSync(path.join(aqui, 'squadroni.js'), path.join(pub, 'assets/squadroni.js'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Squadroni', artigo: 'da', url: E.url, lang: 'pt', cor: '#e31e24', fundo: '#1d1e22', claro: '#f4f4f2',
  fonteTitulo: "'Saira Semi Condensed',system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com o vermelho da marca, os rodízios em destaque e um guia das seis fixações.', pontos: [`Catálogo com os ${produtos.length} itens, filtro por fixação e modelo`, 'Tipo H e tipo W da NBR 13962 explicados', 'Português, inglês e espanhol'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Grafite e vermelho, abre como catálogo técnico e mostra as famílias mais pedidas.', pontos: ['Famílias SQ90, SQ91 Gel, 9000, SQ100...', 'Laboratório e ensaio de 100 mil ciclos', 'Certificados ISO, ABNT e CATAS'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
