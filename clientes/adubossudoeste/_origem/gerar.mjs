// Adubos Sudoeste (Jataí/GO), fertilizantes NPK, micronutrientes e matérias-primas desde 1999. Gera public/{a,b}/ e a página de escolha.
// node clientes/adubossudoeste/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs adubossudoeste https://adubossudoeste.com.br/)
// Textos, fórmulas, micronutrientes, matérias-primas, unidades e fotos: do site atual (WordPress Avada, 2022).
// O site atual não divulga e-mail nem WhatsApp (o formulário envia pelo servidor): contato por telefone de cada unidade.
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');

const E = {
  nome: 'Adubos Sudoeste', url: 'https://adubossudoeste.overtus.com.br/', antigo: 'https://adubossudoeste.com.br/',
  fone: '(64) 2102-2000', webmail: 'https://mail.adubossudoeste.com.br/',
};
const UNIDADES = [
  { uf: 'GO', cidade: 'Jataí', tipo: 'Matriz', end: 'Avenida Primária s/n, Quadra 01, módulos 01 a 26', bairro: 'Bairro Distrito Agroindustrial', cep: '75.801-870', fone: '(64) 2102-2000' },
  { uf: 'PR', cidade: 'Paranaguá', tipo: 'Unidade', end: 'Av. Coronel Santa Rita, 1.419', bairro: 'Serraria do Rocha', cep: '83.203-630', fone: '(41) 2152-4000' },
  { uf: 'MT', cidade: 'Rondonópolis', tipo: 'Unidade', end: 'Rua Alberto Saddi, 1.344', bairro: 'Distrito Industrial', cep: '78.745-710', fone: '(66) 3301-7450' },
  { uf: 'SE', cidade: 'Rosário do Catete', tipo: 'Unidade', end: 'Rodovia BR-101, km 66,5', bairro: 'Zona rural', cep: '49.760-000', fone: '(79) 3274-1328' },
];
const FONTES = 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..100,600..900&family=Inter:wght@400;500;600&display=swap';
const IMG = '/assets/img/';

const C = {
  sobre: [
    'A Adubos Sudoeste foi fundada em 1999 por competentes empresários goianos que já tinham experiência no setor de fertilizantes.',
    'A matriz está localizada no sudoeste do estado de Goiás, no município de Jataí, região de grande destaque no agronegócio.',
    'Na Adubos Sudoeste, oferecemos soluções com o mais rigoroso controle de qualidade e certificação.',
    'Oferecemos um insumo de excelente eficiência em todo e qualquer tipo de solo e cultivo, com as maiores garantias do mercado brasileiro.',
  ],
  grupo: 'O Grupo contribui para o fortalecimento do agronegócio brasileiro ao ofertar insumos agropecuários de alta tecnologia e promover pesquisas e estudos de campo para auxiliar os produtores, para que uma produtividade de qualidade seja alcançada.',
  formulas: ['00-18-18', '00-20-10', '00-20-15', '00-20-18', '00-20-20', '00-20-30', '00-25-15', '00-25-25', '00-28-20', '00-30-10', '00-30-15', '00-30-20', '02-16-08'],
  micros: [
    { n: 'Zinco', s: 'Zn', t: '15% Zn' }, { n: 'Manganês', s: 'Mn', t: '30% Mn' }, { n: 'Cobre', s: 'Cu', t: '20% Cu' }, { n: 'Boro', s: 'B', t: '9% B' },
    { n: 'FTE NEW CO', s: 'FTE', t: '12% Zn · 8% Mn · 1,6% B · 1,6% Cu' }, { n: 'FTE BR 12', s: 'FTE', t: '9% Zn · 1,8% B · 0,8% Cu · 2% Mn · 3,5% Fe · 0,1% Mo' },
  ],
  materias: [
    { n: 'Ureia', g: [['N', 45]] },
    { n: 'Sulfato de amônia', g: [['N', 20], ['S', 22]] },
    { n: 'SSP · superfosfato simples', g: [['P', 18], ['Ca', 16], ['S', 8]] },
    { n: 'TSP · superfosfato triplo', g: [['P', 46], ['Ca', 10]] },
    { n: 'MAP · fosfato monoamônio', g: [['N', 11], ['P', 52]] },
    { n: 'KCl · cloreto de potássio', g: [['K', 60]] },
    { n: 'NP 14-34', g: [['N', 14], ['P', 34], ['S', 8]] },
    { n: 'NP 32-03', g: [['N', 32], ['P', 3]] },
  ],
  links: [
    { t: 'Banco Central do Brasil', u: 'https://www.bcb.gov.br/', d: 'Cotação do dólar e indicadores que mexem no preço dos fertilizantes.' },
    { t: 'Sintegra', u: 'http://www.sintegra.gov.br/', d: 'Consulta de inscrição estadual de produtores e empresas.' },
    { t: 'Climatempo', u: 'https://www.climatempo.com.br/', d: 'Previsão do tempo para planejar plantio e adubação.' },
    { t: 'Rural Business', u: 'https://ruralbusiness.com.br/', d: 'Notícias e cotações do agronegócio.' },
    { t: 'Agrolink', u: 'https://www.agrolink.com.br/', d: 'Cotações, clima e informação técnica para o campo.' },
  ],
};
const NOME_EL = { N: 'nitrogênio', P: 'fósforo', K: 'potássio', S: 'enxofre', Ca: 'cálcio' };

const NAV = [
  { slug: 'index', nome: 'Início' }, { slug: 'quem-somos', nome: 'Quem somos' }, { slug: 'produtos', nome: 'Produtos' },
  { slug: 'links-importantes', nome: 'Links importantes' }, { slug: 'contato', nome: 'Contato' },
];
const desc = {
  index: 'Adubos Sudoeste: fertilizantes NPK, micronutrientes e matérias-primas desde 1999. Matriz em Jataí/GO e unidades em Paranaguá, Rondonópolis e Rosário do Catete.',
  'quem-somos': 'Fundada em 1999 por empresários goianos com experiência em fertilizantes. Matriz em Jataí, no sudoeste de Goiás.',
  produtos: 'Fórmulas NPK, micronutrientes (Zn, Mn, Cu, B, FTE) e matérias-primas: ureia, sulfato de amônia, SSP, TSP, MAP, KCl.',
  'links-importantes': 'Links úteis para o produtor: Banco Central, Sintegra, Climatempo, Rural Business e Agrolink.',
  contato: 'Central de atendimento (64) 2102-2000. Unidades em Jataí/GO, Paranaguá/PR, Rondonópolis/MT e Rosário do Catete/SE.',
};
const titulos = { index: 'Adubos Sudoeste · A solução certa para a sua lavoura', 'quem-somos': 'Quem somos · Adubos Sudoeste', produtos: 'Produtos · Adubos Sudoeste', 'links-importantes': 'Links importantes · Adubos Sudoeste', contato: 'Contato · Adubos Sudoeste' };

const fig = (src, alt, cls = '') => `<img${cls ? ` class="${cls}"` : ''} src="${IMG}${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
const logo = `<img class="logo" src="${IMG}logo.webp" alt="Adubos Sudoeste" width="300" height="281">`;

function topo(v, ativo) {
  return `<header class="topo">
  <div class="faixa"><div class="in faixa-in">
    <span>Matriz em Jataí/GO · unidades em PR, MT e SE</span>
    <span class="faixa-dir">Central de atendimento <a href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></span>
  </div></div>
  <div class="in topo-in">
    <a class="marca" href="${link(v, 'index')}">${logo}<span class="marca-txt">Adubos<br>Sudoeste</span></a>
    <nav aria-label="Principal"><ul class="menu">${menuItens(v, NAV, ativo)}<li><a class="menu-webmail" href="${E.webmail}" target="_blank" rel="noopener">Webmail</a></li></ul></nav>
    <a class="btn topo-cta" href="${telHref(E.fone)}">${ic('tel')} Ligar</a>
    <button class="menu-btn" aria-label="Abrir menu" aria-expanded="false">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">`;
}

function rodape(v) {
  return `</main>
<section class="cta"><div class="in cta-in">
  <div><p class="sobre">Fale com a Adubos Sudoeste</p><h2>Qual a melhor solução para a sua lavoura?</h2><p>A central de atendimento indica a fórmula e a unidade mais perto de você.</p></div>
  <div class="cta-bts"><a class="btn" href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Ver unidades ${ic('seta')}</a></div>
</div></section>
<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca">${logo}<p>Fertilizantes NPK, micronutrientes e matérias-primas desde 1999. A solução certa para a sua lavoura.</p></div>
  <div><h3>Páginas</h3><ul>${NAV.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}<li><a href="${E.webmail}" target="_blank" rel="noopener">Webmail</a></li></ul></div>
  <div><h3>Matriz</h3><p>${UNIDADES[0].end}<br>${UNIDADES[0].bairro}<br>CEP ${UNIDADES[0].cep} · Jataí – GO<br><a href="${telHref(E.fone)}">${E.fone}</a></p></div>
  <div><h3>Unidades</h3><ul>${UNIDADES.slice(1).map(u => `<li>${u.cidade} – ${u.uf} · <a href="${telHref(u.fone)}">${u.fone}</a></li>`).join('')}</ul></div>
</div><div class="in rodape-fim"><span>© ${new Date().getFullYear()} Adubos Sudoeste. Todos os direitos reservados.</span><span>Prévia de site por Overtus</span></div></footer>
</body></html>`;
}

const pagina = (v, slug, corpo) => cabeca({ E, v, slug, titulo: titulos[slug], descricao: desc[slug], fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#04923F' }) + topo(v, slug) + corpo + rodape(v);
const cabecalhoPg = (v, sobre, titulo, texto, foto) => `<section class="pg-topo">${foto ? `<div class="pg-foto" style="background-image:url(${IMG}${foto})"></div>` : ''}<div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Início</a> / ${esc(sobre)}</p>
  <h1>${titulo}</h1>${texto ? `<p class="pg-lead">${texto}</p>` : ''}
</div></section>`;

// ---------- blocos ----------
const formula = f => { const [n, p, k] = f.split('-'); return `<li class="form-npk"><span><b>${n}</b><i>N</i></span><span><b>${p}</b><i>P</i></span><span><b>${k}</b><i>K</i></span></li>`; };
const formulas = `<ul class="formulas">${C.formulas.map(formula).join('')}</ul>`;
const micros = `<ul class="micros">${C.micros.map(m => `<li><span class="micro-s">${m.s}</span><div><b>${m.n}</b><span>${m.t}</span></div></li>`).join('')}</ul>`;
const materias = `<ul class="materias">${C.materias.map(m => `<li class="sobe"><h3>${m.n}</h3><div class="barras">${m.g.map(([el, pc]) => `<div class="barra barra-${el.toLowerCase()}"><span class="barra-el">${el}</span><span class="barra-trilho"><span style="width:${pc}%"></span></span><b>${pc}%</b><span class="barra-nome">${NOME_EL[el]}</span></div>`).join('')}</div></li>`).join('')}</ul>`;
const unidades = `<ol class="unidades">${UNIDADES.map((u, i) => `<li class="sobe" style="--i:${i}"><span class="uf">${u.uf}</span><div><p class="u-tipo">${u.tipo}</p><h3>${u.cidade}</h3><p>${u.end}<br>${u.bairro} · CEP ${u.cep}</p><a href="${telHref(u.fone)}">${ic('tel')} ${u.fone}</a></div></li>`).join('')}</ol>`;
const npkExplica = `<div class="npk-exp">
  <div class="npk-foto sobe">${fig('npk.webp', 'Nitrogênio, fósforo e potássio')}</div>
  <ul class="npk-lista sobe">
    <li><b>N</b><div><h3>Nitrogênio</h3><p>Primeiro número da fórmula.</p></div></li>
    <li><b>P</b><div><h3>Fósforo</h3><p>Segundo número, em P₂O₅.</p></div></li>
    <li><b>K</b><div><h3>Potássio</h3><p>Terceiro número, em K₂O.</p></div></li>
  </ul>
</div>`;

// ---------- páginas internas ----------
function paginaSobre(v) {
  return cabecalhoPg(v, 'Quem somos', 'Solução e eficácia para a sua lavoura', 'Empresa goiana de fertilizantes, fundada em 1999 em Jataí.', 'colheita.webp') + `
<section class="sec sobre-sec"><div class="in sobre-in">
  <div class="sobe sobre-txt">${C.sobre.map(p => `<p>${p}</p>`).join('')}</div>
  <div class="sobre-ano sobe"><b>1999</b><span>fundação em Jataí, sudoeste de Goiás</span>${fig('produtor-lavoura.webp', 'Produtor na lavoura')}</div>
</div></section>
<section class="sec pilares"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Compromisso</p><h2>O que o produtor encontra na Adubos Sudoeste</h2></div>
  <ul class="pilares-lista">
    <li class="sobe">${ic('escudo')}<h3>Controle de qualidade</h3><p>Soluções com o mais rigoroso controle de qualidade e certificação.</p></li>
    <li class="sobe">${ic('trator')}<h3>Todo solo, todo cultivo</h3><p>Insumo de excelente eficiência em todo e qualquer tipo de solo e cultivo.</p></li>
    <li class="sobe">${ic('livro')}<h3>Pesquisa de campo</h3><p>Pesquisas e estudos de campo para auxiliar os produtores a alcançar produtividade de qualidade.</p></li>
  </ul>
</div></section>
<section class="sec uni-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Presença</p><h2>Matriz em Goiás e unidades em três estados</h2></div>
  ${unidades}
</div></section>`;
}

function paginaProdutos(v) {
  return cabecalhoPg(v, 'Produtos', 'Qual a melhor solução para o seu negócio?', C.grupo, 'trator-plantio.webp') + `
<nav class="prod-nav"><div class="in"><a href="#npk">Fórmulas NPK</a><a href="#micronutrientes">Micronutrientes</a><a href="#materias-primas">Matérias-primas</a></div></nav>
<section class="sec npk-sec" id="npk"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Fertilizantes NPK</p><h2>Conheça algumas fórmulas de fertilizantes NPK</h2><p>Cada fórmula traz a porcentagem de nitrogênio, fósforo e potássio, nessa ordem.</p></div>
  ${npkExplica}
  ${formulas}
</div></section>
<section class="sec micro-sec" id="micronutrientes"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Micronutrientes</p><h2>Nossos micronutrientes</h2></div>
  ${micros}
</div></section>
<section class="sec mat-sec" id="materias-primas"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Matéria-prima</p><h2>Matérias-primas utilizadas</h2><p>Garantias de nutrientes de cada matéria-prima.</p></div>
  <div class="mat-in"><figure class="sobe mat-foto">${fig('ureia.webp', 'Ureia granulada')}</figure>${materias}</div>
</div></section>`;
}

function paginaLinks(v) {
  return cabecalhoPg(v, 'Links importantes', 'Links importantes', 'Sites úteis para acompanhar câmbio, clima e mercado.', 'faixa-verde.webp') + `
<section class="sec links-sec"><div class="in">
  <ul class="links">${C.links.map(l => `<li class="sobe"><a href="${l.u}" target="_blank" rel="noopener"><h3>${l.t} ${ic('ext')}</h3><p>${l.d}</p><span>${l.u.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span></a></li>`).join('')}</ul>
</div></section>`;
}

function paginaContato(v) {
  return cabecalhoPg(v, 'Contato', 'Fale conosco', 'Precisa de ajuda? Ligue para a central de atendimento ou para a unidade mais perto de você.', null) + `
<section class="sec cont-sec"><div class="in cont-in">
  <div class="central sobe"><p class="sobre">Central de atendimento</p><a class="central-fone" href="${telHref(E.fone)}">${E.fone}</a><p>Matriz em Jataí – GO. Atendimento a produtores e revendas.</p><a class="btn" href="${telHref(E.fone)}">${ic('tel')} Ligar agora</a></div>
  <div class="mapa sobe"><iframe src="https://maps.google.com/maps?q=${encodeURIComponent('Adubos Sudoeste, Distrito Agroindustrial, Jataí - GO')}&z=14&output=embed" title="Mapa da matriz em Jataí" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div></section>
<section class="sec uni-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Unidades</p><h2>Endereços e telefones</h2></div>
  ${unidades}
</div></section>`;
}

const internas = v => ({ 'quem-somos': pagina(v, 'quem-somos', paginaSobre(v)), produtos: pagina(v, 'produtos', paginaProdutos(v)), 'links-importantes': pagina(v, 'links-importantes', paginaLinks(v)), contato: pagina(v, 'contato', paginaContato(v)) });

// ---------- A "Lavoura": clara, foto do pôr do sol na abertura ----------
function versaoA() {
  const v = 'a';
  const home = `
<section class="hero"><div class="hero-foto" style="background-image:url(${IMG}lavoura-por-do-sol.webp)"></div><div class="in hero-in">
  <p class="sobre">Fertilizantes desde 1999 · Jataí/GO</p>
  <h1>A solução certa para a sua lavoura</h1>
  <p class="lead">Fórmulas NPK, micronutrientes e matérias-primas com rigoroso controle de qualidade, para todo tipo de solo e cultivo.</p>
  <div class="hero-bts"><a class="btn" href="${link(v, 'produtos')}">Ver produtos ${ic('seta')}</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></div>
</div></section>
<section class="numeros-sec"><div class="in"><ul class="numeros">
  <li><b>1999</b><span>fundada em Jataí, Goiás</span></li><li><b>4</b><span>unidades em GO, PR, MT e SE</span></li><li><b>${C.formulas.length}</b><span>fórmulas NPK no catálogo</span></li><li><b>${C.materias.length}</b><span>matérias-primas com garantia</span></li>
</ul></div></section>

<section class="sec intro"><div class="in intro-in">
  <div class="intro-logo sobe">${logo}</div>
  <div class="sobe"><p class="sobre">Nossa empresa</p><h2>Solução e eficácia para a sua lavoura</h2><p>${C.sobre[0]}</p><p>${C.sobre[1]}</p><a class="link-seta" href="${link(v, 'quem-somos')}">Conheça mais sobre nossa empresa ${ic('seta')}</a></div>
</div></section>

<section class="sec prod-home"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Produtos</p><h2>Qual a melhor solução para o seu negócio?</h2><p>${C.grupo}</p></div>
  <div class="prod-tres">
    <a class="prod sobe" href="${link(v, 'produtos')}#npk">${fig('produtor-lavoura.webp', 'Lavoura adubada')}<div><h3>Fórmulas NPK</h3><p>${C.formulas.length} fórmulas, de 00-18-18 a 02-16-08.</p></div></a>
    <a class="prod sobe" href="${link(v, 'produtos')}#micronutrientes">${fig('trator-plantio.webp', 'Plantio')}<div><h3>Micronutrientes</h3><p>Zinco, manganês, cobre, boro e FTE.</p></div></a>
    <a class="prod sobe" href="${link(v, 'produtos')}#materias-primas">${fig('ureia.webp', 'Ureia')}<div><h3>Matérias-primas</h3><p>Ureia, sulfato de amônia, SSP, TSP, MAP e KCl.</p></div></a>
  </div>
</div></section>

<section class="sec form-home"><div class="in form-home-in">
  <div class="sobe"><p class="sobre">Fórmulas NPK</p><h2>Algumas fórmulas do catálogo</h2><p>Nitrogênio, fósforo e potássio, nessa ordem. Peça a sua pela central.</p><a class="link-seta" href="${link(v, 'produtos')}#npk">Todas as fórmulas ${ic('seta')}</a></div>
  ${formulas}
</div></section>

<section class="sec uni-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Unidades</p><h2>Do sudoeste goiano para quatro estados</h2></div>
  ${unidades}
</div></section>

<section class="fotos3">${['produtor-lavoura.webp', 'trator-plantio.webp', 'colheita.webp'].map(f => fig(f, 'Lavoura')).join('')}</section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

// ---------- B "Sudoeste": verde da marca, logo e mapa em destaque ----------
function versaoB() {
  const v = 'b';
  const home = `
<section class="hero"><div class="hero-in">
  <div class="hero-txt"><div class="in-meia">
    <p class="sobre">Adubos Sudoeste · desde 1999</p>
    <h1>Solução e eficácia para a sua lavoura</h1>
    <p class="lead">Fertilizantes NPK, micronutrientes e matérias-primas, com matriz em Jataí e unidades em Paranaguá, Rondonópolis e Rosário do Catete.</p>
    <div class="hero-bts"><a class="btn" href="${link(v, 'produtos')}">Nossos produtos ${ic('seta')}</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></div>
  </div></div>
  <div class="hero-foto">${fig('colheita.webp', 'Colheita em lavoura de grãos')}</div>
</div></section>

<section class="sec npk-home"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Fertilizantes NPK</p><h2>${C.formulas.length} fórmulas para cada fase da lavoura</h2></div>
  ${npkExplica}
  ${formulas}
</div></section>

<section class="sec mat-home"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Matérias-primas</p><h2>Garantia de nutrientes em cada saco</h2></div>
  ${materias}
  <p class="centro"><a class="link-seta" href="${link(v, 'produtos')}#materias-primas">Produtos e micronutrientes ${ic('seta')}</a></p>
</div></section>

<section class="sec sobre-home"><div class="in sobre-home-in">
  <figure class="sobe">${fig('produtor-lavoura.webp', 'Produtor na lavoura')}</figure>
  <div class="sobe"><p class="sobre">Quem somos</p><h2>Empresários goianos com experiência em fertilizantes</h2><p>${C.sobre[0]} ${C.sobre[1]}</p><p>${C.sobre[3]}</p><a class="link-seta" href="${link(v, 'quem-somos')}">Conheça a empresa ${ic('seta')}</a></div>
</div></section>

<section class="sec uni-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Unidades</p><h2>Quatro endereços, uma central</h2></div>
  ${unidades}
</div></section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', versaoA());
escreverVersao(pub, 'b', versaoB());
await escolha(pub, {
  nome: 'Adubos Sudoeste', artigo: 'da', url: E.url, lang: 'pt', cor: '#04923F', fundo: '#0b3d1f', claro: '#f5f6ef',
  fonteTitulo: "'Archivo',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Lavoura', paginas: 5, texto: 'Clara, com o verde e o amarelo do logo: a lavoura ao pôr do sol na abertura, os três grupos de produtos e as quatro unidades.', pontos: ['Fórmulas NPK em texto (antes eram imagem)', 'Unidades com telefone de cada uma', 'Mesmas 5 páginas do site atual'] },
    { letra: 'b', nome: 'Sudoeste', paginas: 5, texto: 'Verde da marca em destaque, com as fórmulas NPK e as garantias de cada matéria-prima em gráficos já na página inicial.', pontos: ['Garantias de N, P, K, S e Ca em barras', 'Logo e cores reais', 'Contato direto com a central'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
