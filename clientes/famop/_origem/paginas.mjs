// Monta as páginas das versões A ("Tradição": fiel ao site atual, moldura vinho, faixa cinza com o slogan, barra grafite de menu
// e a abertura em Flash refeita sem plugin) e B ("Ficha técnica": clara, técnica, máquina com cota de medida, escolha pelo serviço
// da retífica e fichas comparáveis). Português na raiz de cada versão e inglês em /en/. Estilos em public/assets/{base,a,b}.css.
import { empresa as E, maquinas, grupos, retifica, etapas, T } from './conteudo.mjs';
import fotos from './fotos.json' with { type: 'json' };

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fam = s => esc(s).replace(/FAMOP/g, '<b class="fam">FAMOP</b>');
export const nomesVersao = { a: 'Tradição', b: 'Ficha técnica' };
const LANGS = ['pt', 'en'];

// números: a ficha está escrita em português; o inglês troca separadores e conectivos
const num = (l, v) => l === 'pt' ? v : String(v).replace(/(\d)\.(\d{3})/g, '$1#$2').replace(/(\d),(\d)/g, '$1.$2').replace(/#/g, ',').replace(/ a /g, ' to ').replace(/ ou /g, ' or ');

function img(nome, alt = '', extra = '', tam = '') {
  const f = fotos[nome];
  if (!f) throw new Error(`foto ausente: ${nome}`);
  return `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}" width="${f.w}" height="${f.h}" loading="lazy" decoding="async"${tam ? ` sizes="${tam}"` : ''}${extra}>`;
}

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  fax: '<path d="M7 8V3h10v5"/><rect x="3" y="8" width="18" height="9" rx="2"/><path d="M7 14h10v7H7z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  volta: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  ok: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  rota: '<path d="M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4z"/><path d="M6 15V9a3 3 0 013-3h3M18 9v6a3 3 0 01-3 3h-3"/>',
  globo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

const caminho = (l, slug) => {
  const t = T[l];
  if (t.slugs[slug] !== undefined) return t.slugs[slug];
  return `${t.maqBase}${slug}/`;
};
const href = (v, l, slug, extra = '') => `/${v}/${caminho(l, slug)}${extra}`;
const maqDe = slug => maquinas.find(m => m.slug === slug);
const mapaRota = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(E.enderecoLinha)}`;
const mapaVer = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(E.enderecoLinha)}`;
const mapaEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(E.enderecoLinha)}&z=15&output=embed`;
const nomeMaq = (m, l) => `${m[l].nome} ${m.codigo}`;

// ---------- moldura ----------
function head(v, l, slug, titulo, descricao) {
  const t = T[l], url = `${E.url}${v}/${caminho(l, slug)}`;
  const alt = LANGS.map(x => `<link rel="alternate" hreflang="${T[x].lang}" href="${E.url}${v}/${caminho(x, slug)}">`).join('');
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">${alt}
<meta property="og:type" content="website">
<meta property="og:site_name" content="FAMOP">
<meta property="og:locale" content="${t.og}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#660000">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/apresenta.css">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/apresenta.js" defer></script>
<script src="/assets/site.js" defer></script>
</head>`;
}

const PRINCIPAIS = ['index', 'empresa', 'equipamentos', 'contato'];
const ehMaq = slug => !!maqDe(slug);

function menu(v, l, atual) {
  const t = T[l];
  return PRINCIPAIS.map(s => {
    const cur = s === atual || (s === 'equipamentos' && ehMaq(atual)) ? ' aria-current="page"' : '';
    return `<a href="${href(v, l, s)}"${cur}>${t.nav[s]}</a>`;
  }).join('');
}
const trocaIdioma = (v, l, slug, cls = 'idioma') => {
  const o = l === 'pt' ? 'en' : 'pt';
  return `<a class="${cls}" href="${href(v, o, slug)}" hreflang="${T[o].lang}" lang="${T[o].lang}">${ic('globo')}${T[l].outro}</a>`;
};
const btnMenu = l => `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="${T[l].abrirMenu}">${ic('menu')}</button>`;

function topo(v, l, slug) {
  const t = T[l];
  if (v === 'a') return `<header class="topo">
  <div class="topo-marca">
    <a class="marca" href="${href(v, l, 'index')}" aria-label="FAMOP, ${t.nav.index}"><img src="/assets/logo.svg" alt="FAMOP" width="284" height="68"></a>
    <div class="topo-foto" aria-hidden="true">${img('topo-maquina', '')}</div>
    ${btnMenu(l)}
  </div>
  <p class="slogan"><span>${t.selo}</span> ${t.tagline}</p>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, l, slug)}${trocaIdioma(v, l, slug)}</nav>
</header>`;
  return `<header class="topo"><div class="topo-in in">
  <a class="marca" href="${href(v, l, 'index')}" aria-label="FAMOP, ${t.nav.index}"><img src="/assets/logo.svg" alt="FAMOP" width="200" height="48"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, l, slug)}${trocaIdioma(v, l, slug, 'idioma idioma-menu')}</nav>
  ${trocaIdioma(v, l, slug, 'idioma idioma-topo')}
  <a class="btn btn-cheio btn-topo" href="${href(v, l, 'contato')}">${l === 'pt' ? 'Pedir orçamento' : 'Request a quote'}</a>
  ${btnMenu(l)}
</div></header>`;
}

function rodape(v, l, slug) {
  const t = T[l];
  const faixa = v === 'a' ? `<div class="faixa-fotos" aria-hidden="true">${[1, 2, 3, 4, 5].map(n => img(`faixa-${n}`, '')).join('')}</div>` : '';
  return `<footer class="rodape">${faixa}<div class="in rod-grade">
  <div class="rod-marca"><img src="/assets/logo-neg.svg" alt="FAMOP" width="220" height="53"><p>${t.rodape}</p></div>
  <div><h2>${t.endereco}</h2><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${mapaVer}" target="_blank" rel="noopener">${ic('pin')}${t.verMapa}</a></div>
  <div><h2>${t.navCurto.contato}</h2><p><a href="tel:${E.foneHref}">${t.fone} ${l === 'pt' ? E.fone : E.foneIntl}</a><br>${t.fax} ${l === 'pt' ? E.fax : E.faxIntl}<br><a href="mailto:${E.email}">${E.email}</a></p></div>
  <nav aria-label="${l === 'pt' ? 'Rodapé' : 'Footer'}"><h2>${t.nav.equipamentos}</h2>${maquinas.map(m => `<a href="${href(v, l, m.slug)}">${m.lista}</a>`).join('')}</nav>
</div><div class="in rod-fim"><span>© ${esc(E.razao)} · Piracicaba, SP</span><span>${t.fotoNota}</span>${trocaIdioma(v, l, slug, 'rod-idioma')}<a href="/">${t.versoes}</a></div></footer>`;
}

const pagina = (v, l, slug, titulo, desc, corpo) => `${head(v, l, slug, titulo, desc)}
<body class="v-${v} p-${ehMaq(slug) ? 'maquina' : slug}">
<a class="pular" href="#conteudo">${T[l].pular}</a>
${v === 'a' ? '<div class="moldura">' : ''}
${topo(v, l, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v, l, slug)}
${v === 'a' ? '</div>' : ''}
</body>
</html>
`;

const titulo = (l, s) => `${s} · FAMOP${l === 'pt' ? ', máquinas para retífica de motores' : ', engine rebuilding machines'}`;

// ---------- peças comuns ----------
function fichaTabela(m, l) {
  const t = T[l];
  const cols = m.colunas;
  const cab = `<thead><tr><th scope="col">${t.item}</th><th scope="col" class="un">${t.unidade}</th>${cols ? cols.map(c => `<th scope="col" class="val">${c}</th>`).join('') : `<th scope="col" class="val">${m.codigo}</th>`}</tr></thead>`;
  const linhas = m.ficha.map(r => `<tr><th scope="row">${esc(l === 'pt' ? r[0] : r[1])}</th><td class="un">${esc(r[2])}</td>${r.slice(3).map(x => `<td class="val">${esc(num(l, x))}</td>`).join('')}</tr>`).join('');
  return `<div class="tab-wrap"><table class="ficha">${cab}<tbody>${linhas}</tbody></table></div>`;
}

const lista = (itens, cls = 'acess') => `<ul class="${cls}">${itens.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;

function estojo(m, l, cls = '') {
  const e = m.estojo, t = T[l];
  return `<div class="estojo ${cls}" data-rev>
  <figure class="estojo-foto">${img(e.foto, l === 'pt' ? `Estojo de peças e acessórios da ${m.codigo}` : `${m.codigo} parts and accessories case`)}</figure>
  <div><h3>${t.pecasTit}</h3><ol class="estojo-l">${e[l].map((x, i) => `<li><span class="n">${e.num[i]}</span>${esc(x)}</li>`).join('')}</ol></div>
</div>`;
}

function blocoRetifica(l, cls = '') {
  const t = T[l], r = retifica;
  return `<div class="retif ${cls}">
  <div class="retif-acess" data-rev>
    <figure>${img(r.foto, l === 'pt' ? 'Acessórios normais das retificadoras: rebolo, luneta, suportes e relógio' : 'Standard grinder accessories: wheel, steady rest, dressers and dial')}</figure>
    <div><h3>${t.acessTit}</h3>${lista(r.normais[l], 'acess acess-2')}</div>
  </div>
  <div class="retif-extra" data-rev>
    <figure>${img(r.maf.foto, 'MAF-40')}</figure>
    <div><h3>${esc(r.maf[l][0])}</h3>${r.maf[l].slice(1).map(p => `<p>${esc(p)}</p>`).join('')}</div>
  </div>
  <div class="retif-extra" data-rev>
    <figure>${img(r.lf.foto, 'LF 050')}</figure>
    <div><h3>${esc(r.lf[l][0])}</h3><p>${esc(r.lf[l][1])}</p>${lista(r.lf[l].slice(2))}</div>
  </div>
</div>`;
}

function formContato(v, l) {
  const t = T[l], f = t.form;
  return `<form class="form" data-mailto="${E.email}" data-assunto="${esc(f.titulo)}">
  <div class="campos">
    <label>${f.nome} *<input name="${f.nome}" required autocomplete="name"></label>
    <label>${f.empresa}<input name="${f.empresa}" autocomplete="organization"></label>
    <label>${f.email} *<input name="${f.email}" type="email" required autocomplete="email"></label>
    <label>${f.fone} *<input name="${f.fone}" type="tel" required autocomplete="tel"></label>
    <label>${f.cidade}<input name="${f.cidade}" autocomplete="address-level2"></label>
    <label>${f.assunto}<select name="${f.assunto}">${f.assuntos.map(a => `<option>${a}</option>`).join('')}</select></label>
    <label class="larga">${f.maquina}<select name="${f.maquina}" data-maquina><option value="">${f.nenhum}</option>${maquinas.map(m => `<option value="${m.slug}">${esc(nomeMaq(m, l))}</option>`).join('')}</select></label>
    <label class="larga">${f.msg} *<textarea name="${f.msg}" rows="5" required></textarea></label>
  </div>
  <button class="btn btn-cheio" type="submit">${ic('mail')}${f.enviar}</button>
  <p class="form-nota">${f.nota} ${E.email}.</p>
</form>`;
}

const contatoLinhas = l => {
  const t = T[l];
  return `<ul class="cont-l">
  <li>${ic('pin')}<span><b>${t.endereco}</b>${E.endereco.join('<br>')}</span></li>
  <li>${ic('tel')}<span><b>${t.fone}</b><a href="tel:${E.foneHref}">${l === 'pt' ? E.fone : E.foneIntl}</a></span></li>
  <li>${ic('fax')}<span><b>${t.fax}</b>${l === 'pt' ? E.fax : E.faxIntl}</span></li>
  <li>${ic('mail')}<span><b>${t.email}</b><a href="mailto:${E.email}">${E.email}</a></span></li>
</ul>`;
};
const mapa = () => `<div class="mapa"><iframe title="Mapa: ${esc(E.enderecoLinha)}" src="${mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

const cta = (v, l) => {
  const t = T[l];
  return `<section class="cta"><div class="in cta-in" data-rev>
  <div><h2>${t.ctaTit}</h2><p>${t.ctaTxt}</p></div>
  <div class="acoes"><a class="btn btn-claro" href="${href(v, l, 'contato')}">${ic('mail')}${t.escrever}</a><a class="btn btn-vazado" href="tel:${E.foneHref}">${ic('tel')}${l === 'pt' ? E.fone : E.foneIntl}</a></div>
</div></section>`;
};

const altMaq = (m, l) => l === 'pt' ? `${m.pt.nome} ${m.codigo} FAMOP` : `FAMOP ${m.en.nome} ${m.codigo}`;

// =====================================================================
// Versão A · Tradição
// =====================================================================
const vitrine = (v, l, cls = '') => `<ul class="vitrine ${cls}" data-rev-filhos data-rev-passo="90">${maquinas.map(m => `<li><a href="${href(v, l, m.slug)}">${img(m.foto, altMaq(m, l))}<span>${m.lista}</span></a></li>`).join('')}</ul>`;

function homeA(l) {
  const t = T[l], v = 'a';
  return `<section class="abertura" aria-label="${t.selo}">
  <div class="ab-fundo" aria-hidden="true">${img('swf-img3', '', ' class="ab-f ab-f1" loading="eager" fetchpriority="high"')}${img('swf-img10', '', ' class="ab-f ab-f2"')}${img('swf-img8', '', ' class="ab-f ab-f3"')}</div>
  <div class="ab-in">
    <img class="ab-simbolo" src="/assets/simbolo-branco.svg" alt="" width="240" height="241" aria-hidden="true">
    <div class="ab-txt">
      <p class="ab-selo">${t.selo}</p>
      <h1 data-palavras>${t.tagline}</h1>
      <div class="acoes"><a class="btn btn-claro" href="${href(v, l, 'equipamentos')}">${t.nav.equipamentos}${ic('seta')}</a><a class="btn btn-vazado" href="${href(v, l, 'contato')}">${t.navCurto.contato}</a></div>
    </div>
  </div>
</section>
<section class="sec linha" aria-labelledby="t-linha">
  <div class="in">
    <h2 id="t-linha" class="sr">${t.nav.equipamentos}</h2>
    ${vitrine(v, l)}
    <p class="clique">${t.clique}</p>
  </div>
</section>
<section class="sec empresa-h">
  <div class="in emp-grade">
    <div class="emp-txt" data-rev>
      <p class="sobre">${t.nav.empresa}</p>
      <h2>${l === 'pt' ? 'Especializada em máquinas para retífica de motores desde 1964' : 'Specialized in engine rebuilding machines since 1964'}</h2>
      <p>${fam(t.empresa[0])}</p>
      <a class="link" href="${href(v, l, 'empresa')}">${t.conhecer}${ic('seta')}</a>
    </div>
    <div class="emp-fotos" data-rev="dir">
      <figure class="ef-1">${img('empresa-aerea', l === 'pt' ? 'Vista aérea da fábrica da FAMOP em Piracicaba' : 'Aerial view of the FAMOP factory in Piracicaba')}</figure>
      <figure class="ef-2">${img('empresa-fabrica', l === 'pt' ? 'Linha de usinagem dentro da fábrica' : 'Machining floor inside the factory')}</figure>
    </div>
  </div>
</section>
<section class="numeros"><div class="in num-grade" data-rev-filhos data-rev-passo="120">
  <div><b data-conta>${new Date().getFullYear() - E.desde}</b><span>${t.anos}</span></div>
  <div><b data-conta>${maquinas.length}</b><span>${t.linhas}</span></div>
  <div><b>${l === 'pt' ? 'Exporta' : 'Export'}</b><span>${t.paises}</span></div>
  <div><b>SP</b><span>${t.piracicaba}</span></div>
</div></section>
${etapasA(v, l)}
${cta(v, l)}`;
}

function etapasA(v, l) {
  const t = T[l];
  return `<section class="sec etapas" aria-labelledby="t-etapas"><div class="in">
  <div class="cab-sec" data-rev><h2 id="t-etapas">${t.etapasTit}</h2><p>${t.etapasSub}</p></div>
  <ol class="et-trilha" data-etapas><span class="ap-trilho" aria-hidden="true"></span>${etapas.map((e, i) => {
    const m = maqDe(e.slug[0]);
    const foto = i === 4 ? 'lf050' : m.foto;
    return `<li class="ap-etapa"><span class="et-n">${i + 1}</span><figure>${img(foto, '')}</figure><h3>${esc(e[l][0])}</h3><p>${esc(e[l][1])}</p><span class="et-maq">${e.slug.map(s => `<a href="${href(v, l, s)}">${maqDe(s).lista}</a>`).join(' · ')}</span></li>`;
  }).join('')}</ol>
</div></section>`;
}

function empresaA(l) {
  const t = T[l], v = 'a';
  return `<section class="tit-pag"><div class="in"><h1>${t.nav.empresa}</h1></div></section>
<section class="sec"><div class="in emp-pag">
  <div class="emp-txt" data-rev>${t.empresa.map(p => `<p>${fam(p)}</p>`).join('')}</div>
  <figure class="emp-aerea" data-rev="dir">${img('empresa-aerea', l === 'pt' ? 'Vista aérea da fábrica' : 'Aerial view of the factory')}<figcaption>${t.fabricaTit}</figcaption></figure>
</div></section>
<section class="numeros"><div class="in num-grade" data-rev-filhos data-rev-passo="120">
  <div><b>${E.desde}</b><span>${l === 'pt' ? 'ano de fundação' : 'year founded'}</span></div>
  <div><b data-conta>${maquinas.length}</b><span>${t.linhas}</span></div>
  <div><b>${l === 'pt' ? 'Exporta' : 'Export'}</b><span>${t.paises}</span></div>
  <div><b>CNC</b><span>${l === 'pt' ? 'Comando numérico na usinagem dos componentes' : 'Numeric control machining of components'}</span></div>
</div></section>
<section class="sec qualidade-a"><div class="in ql-grade">
  <figure data-rev="esq">${img('empresa-fabrica', l === 'pt' ? 'Interior da fábrica com pontes rolantes e máquinas' : 'Factory floor with cranes and machines')}</figure>
  <div data-rev><h2>${t.qualidadeTit}</h2><ol class="ql-l">${t.qualidade.map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join('')}</ol></div>
</div></section>
${cta(v, l)}`;
}

function equipamentosA(l) {
  const t = T[l], v = 'a';
  return `<section class="tit-pag"><div class="in"><h1>${t.nav.equipamentos}</h1></div></section>
<section class="sec linha"><div class="in">${vitrine(v, l)}<p class="clique">${t.clique}</p></div></section>
<section class="sec lista-maq"><div class="in">${maquinas.map((m, i) => `<article class="lm" data-rev>
  <a class="lm-foto" href="${href(v, l, m.slug)}">${img(m.foto, altMaq(m, l))}</a>
  <div class="lm-txt"><p class="lm-grupo">${grupos.find(g => g.id === m.grupo)[l]}</p><h2>${esc(m[l].nome)} <span>${m.codigo}</span></h2><p>${esc(m[l].curto)}</p><a class="link" href="${href(v, l, m.slug)}">${t.fichaAcess}${ic('seta')}</a></div>
</article>`).join('')}</div></section>
${cta(v, l)}`;
}

function maquinaA(m, l) {
  const t = T[l], v = 'a';
  const galeria = m.galeria || (m.cabecote ? [{ foto: m.cabecote.foto }] : m.extraFoto ? [{ foto: m.extraFoto }] : []);
  const g0 = galeria[0];
  return `<section class="tit-maq"><div class="in"><h1>${esc(m[l].nome)} <span>${m.codigo}</span></h1></div></section>
<section class="maq-ab"><div class="in maq-ab-grade">
  <figure class="maq-foto" data-rev="zoom">${img(m.foto, altMaq(m, l), ' loading="eager"')}</figure>
  <div class="maq-txt" data-rev>${m.texto[l].map(p => `<p>${fam(p)}</p>`).join('')}</div>
  ${g0 ? `<figure class="maq-lado" data-rev="dir">${img(g0.foto, g0[l] || '')}${g0[l] ? `<figcaption>${esc(g0[l])}</figcaption>` : ''}</figure>` : ''}
</div></section>
<h2 class="barra-ficha" id="ficha">${t.fichaAcess}</h2>
<section class="sec maq-ficha"><div class="in">
  ${m.cabecote ? `<div class="cabecote" data-rev><h3>${t.cabecoteTit}</h3>${lista(m.cabecote[l])}</div>` : ''}
  ${m.extras ? `<div class="extras">${m.extras.map(x => `<div data-rev><h3>${esc(x[l][0])}</h3><p>${esc(x[l][1])}</p></div>`).join('')}</div>` : ''}
  <div class="ficha-grade${m.acessorios && typeof m.acessorios === 'object' ? '' : ' so-ficha'}">
    <div><h3>${t.fichaTit}</h3>${fichaTabela(m, l)}</div>
    ${m.acessorios && typeof m.acessorios === 'object' ? `<div class="acess-box"><h3>${t.acessTit}</h3>${lista(m.acessorios[l])}</div>` : ''}
  </div>
  ${m.acessorios === 'retifica' ? blocoRetifica(l) : ''}
  ${m.estojo ? estojo(m, l) : ''}
  ${galeria.length > 1 ? `<div class="galeria">${galeria.slice(1).map(g => `<figure data-rev>${img(g.foto, g[l] || '')}${g[l] ? `<figcaption>${esc(g[l])}</figcaption>` : ''}</figure>`).join('')}</div>` : ''}
  <div class="maq-acoes"><a class="btn btn-cheio" href="${href(v, l, 'contato', `?maquina=${m.slug}`)}">${ic('mail')}${t.pedir}</a><a class="link" href="${href(v, l, 'equipamentos')}">${ic('volta')}${t.voltar}</a></div>
</div></section>
<nav class="outras" aria-label="${t.outros}"><div class="in">${maquinas.filter(o => o !== m).map(o => `<a href="${href(v, l, o.slug)}">${o.lista}</a>`).join('<span aria-hidden="true">|</span>')}</div></nav>`;
}

function contatoA(l) {
  const t = T[l], v = 'a';
  return `<section class="tit-pag"><div class="in"><h1>${t.contatoTit}</h1></div></section>
<section class="cont-ab"><div class="in cont-ab-grade">
  <figure class="cont-desenho" data-rev="esq">${img('contato-desenho', '')}</figure>
  <div class="cont-end" data-rev>${E.endereco.map(x => `<p>${x}</p>`).join('')}<p class="cont-fones"><a href="tel:${E.foneHref}">${t.fone.toLowerCase()}: ${l === 'pt' ? '19 3424 1333' : '+55 19 3424 1333'}</a> | ${t.fax.toLowerCase()}: ${l === 'pt' ? '19 3424 4202' : '+55 19 3424 4202'}</p><p><a class="link" href="mailto:${E.email}">${ic('mail')}${E.email}</a></p></div>
</div><div class="cont-faixa" aria-hidden="true"></div></section>
<section class="sec"><div class="in cont-grade">
  <div data-rev><h2>${l === 'pt' ? 'Escreva para a FAMOP' : 'Write to FAMOP'}</h2><p class="sub">${t.contatoSub}</p>${formContato(v, l)}</div>
  <div class="cont-lado" data-rev="dir">${contatoLinhas(l)}<div class="acoes"><a class="btn btn-cheio" href="${mapaRota}" target="_blank" rel="noopener">${ic('rota')}${t.rota}</a></div></div>
</div></section>
${mapa()}`;
}

// =====================================================================
// Versão B · Ficha técnica
// =====================================================================
const cotaMaq = (m, l, cota) => `<figure class="cota" data-rev="zoom">${img(m.foto, altMaq(m, l), ' loading="eager"')}${cota ? `<figcaption class="cota-l"><span>${esc(cota)}</span></figcaption>` : ''}</figure>`;

const chave = m => {
  // três números que resumem cada máquina na versão B
  const pega = (rotPt) => { const r = m.ficha.find(x => x[0] === rotPt); return r ? [r[2], r[3]] : null; };
  const out = [];
  const add = (rotPt, pt, en) => { const r = pega(rotPt); if (r) out.push({ pt, en, un: r[0], v: r[1] }); };
  add('Capacidade de usinagem (eixo standard)', 'Usinagem', 'Boring');
  add('Diâmetro de usinagem', 'Usinagem', 'Boring');
  add('Capacidade de broquear', 'Broqueia', 'Bores');
  add('Capacidade de retificar', 'Retifica', 'Grinds');
  add('Distância máxima entre placas', 'Entre placas', 'Between chucks');
  add('Curso vertical', 'Curso vertical', 'Vertical travel');
  add('Comprimento máximo de usinagem', 'Comprimento', 'Length');
  add('Largura do barramento', 'Barramento', 'Bed width');
  add('Pressão do ar comprimido', 'Ar comprimido', 'Air pressure');
  add('Diâmetro do rebolo', 'Rebolo', 'Wheel');
  add('Peso líquido', 'Peso', 'Weight');
  add('Peso', 'Peso', 'Weight');
  return out.slice(0, 3);
};
const chaves = (m, l) => `<dl class="chaves">${chave(m).map(c => `<div><dt>${l === 'pt' ? c.pt : c.en}</dt><dd>${esc(num(l, c.v))}<small>${esc(c.un.split(' ')[0] === 'HP' ? '' : c.un)}</small></dd></div>`).join('')}</dl>`;

function homeB(l) {
  const t = T[l], v = 'b', rhf = maqDe('rhf-1500');
  return `<section class="hero"><div class="in hero-grade">
  <div class="hero-txt">
    <p class="eyebrow">${t.selo} · Piracicaba, SP</p>
    <h1 data-palavras>${t.heroB}</h1>
    <p class="hero-sub" data-rev>${t.heroBSub}</p>
    <div class="acoes" data-rev><a class="btn btn-cheio" href="${href(v, l, 'equipamentos')}">${t.nav.equipamentos}${ic('seta')}</a><a class="btn btn-linha" href="${href(v, l, 'contato')}">${l === 'pt' ? 'Pedir orçamento' : 'Request a quote'}</a></div>
  </div>
  <div class="hero-maq">${cotaMaq(rhf, l, l === 'pt' ? '1.500 mm entre placas' : '1,500 mm between chucks')}<p class="hero-leg"><b>RHF 1500</b> ${l === 'pt' ? 'Retificadora de virabrequins hidráulica' : 'Hydraulic crankshaft grinder'}</p></div>
</div>
<div class="in hero-num" data-rev-filhos data-rev-passo="100">
  <div><b>${E.desde}</b><span>${l === 'pt' ? 'fundação' : 'founded'}</span></div>
  <div><b>ø16–ø160</b><span>${l === 'pt' ? 'mm, de bielas a cilindros' : 'mm, from rods to cylinders'}</span></div>
  <div><b>${l === 'pt' ? '1.500' : '1,500'}</b><span>${l === 'pt' ? 'mm entre placas no virabrequim' : 'mm between chucks on crankshafts'}</span></div>
  <div><b data-conta>${maquinas.length}</b><span>${t.linhas}</span></div>
</div></section>
<section class="sec servico" aria-labelledby="t-serv"><div class="in">
  <div class="cab-sec" data-rev><h2 id="t-serv">${t.servico}</h2></div>
  <div class="abas" role="tablist">${grupos.map((g, i) => `<button type="button" role="tab" id="aba-${g.id}" aria-controls="painel-${g.id}" aria-selected="${i === 0}">${g[l]}<small>${maquinas.filter(m => m.grupo === g.id).length}</small></button>`).join('')}</div>
  ${grupos.map((g, i) => `<div class="painel" role="tabpanel" id="painel-${g.id}" aria-labelledby="aba-${g.id}"${i ? ' hidden' : ''}>${maquinas.filter(m => m.grupo === g.id).map(m => `<a class="lin-maq" href="${href(v, l, m.slug)}">
    <span class="lin-foto">${img(m.foto, altMaq(m, l))}</span>
    <span class="lin-txt"><b>${m.codigo}</b><span class="lin-nome">${esc(m[l].nome)}</span><span class="lin-curto">${esc(m[l].curto)}</span></span>
    ${chaves(m, l)}
    <span class="lin-seta">${ic('seta')}</span>
  </a>`).join('')}</div>`).join('')}
</div></section>
<section class="sec processo" aria-labelledby="t-proc"><div class="in proc-grade">
  <div class="cab-sec proc-cab" data-rev><h2 id="t-proc">${t.etapasTit}</h2><p>${t.etapasSub}</p></div>
  <ol class="proc" data-rev-filhos data-rev-passo="110">${etapas.map((e, i) => `<li><span class="proc-n">0${i + 1}</span><div><h3>${esc(e[l][0])}</h3><p>${esc(e[l][1])}</p><span class="proc-maq">${e.slug.map(s => `<a href="${href(v, l, s)}">${maqDe(s).lista}</a>`).join('')}</span></div></li>`).join('')}</ol>
</div></section>
${comparaB(v, l)}
<section class="sec fabrica"><div class="in fab-grade">
  <figure class="fab-foto" data-rev="esq">${img('empresa-aerea', l === 'pt' ? 'Vista aérea da fábrica da FAMOP em Piracicaba' : 'Aerial view of the FAMOP factory in Piracicaba')}</figure>
  <div data-rev><p class="eyebrow">${t.fabricaTit}</p><h2>${t.qualidadeTit}</h2><p>${fam(t.empresa[1])}</p><ul class="checks">${t.qualidade.map(([a, b]) => `<li>${ic('ok')}<span><b>${a}.</b> ${b}</span></li>`).join('')}</ul><a class="link" href="${href(v, l, 'empresa')}">${t.conhecer}${ic('seta')}</a></div>
</div></section>
${cta(v, l)}`;
}

function comparaB(v, l) {
  const t = T[l], rf = maqDe('rf-1000'), rh = maqDe('rhf-1500');
  const rots = ['Distância máxima entre placas', 'Altura da mesa ao centro do cabeçote', 'Deslocamento máximo das placas', 'Largura admissível do rebolo', 'Velocidade do acionamento rápido da mesa', 'Comprimento e largura máximos', 'Peso líquido'];
  const val = (m, rot, c = 0) => { const r = m.ficha.find(x => x[0] === rot); return r ? num(l, r[3 + c]) : '–'; };
  const lab = rot => { const r = rh.ficha.find(x => x[0] === rot) || rf.ficha.find(x => x[0] === rot); return [l === 'pt' ? r[0] : r[1], r[2]]; };
  return `<section class="sec compara" aria-labelledby="t-comp"><div class="in">
  <div class="cab-sec" data-rev><h2 id="t-comp">${t.compara}</h2><p>${esc(t.grupoTxt.split('. ').slice(0, 2).join('. '))}.</p></div>
  <div class="tab-wrap" data-rev><table class="ficha comp">
    <thead><tr><th scope="col">${t.item}</th><th scope="col" class="un">${t.unidade}</th><th scope="col" class="val"><a href="${href(v, l, 'rf-1000')}">RF 1000</a></th><th scope="col" class="val"><a href="${href(v, l, 'rhf-1500')}">RF 1500</a><small>${t.mecanica}</small></th><th scope="col" class="val"><a href="${href(v, l, 'rhf-1500')}">RHF 1500</a><small>${t.hidraulica}</small></th></tr></thead>
    <tbody>${rots.map(r => { const [n, u] = lab(r); return `<tr><th scope="row">${esc(n)}</th><td class="un">${esc(u)}</td><td class="val">${esc(val(rf, r))}</td><td class="val">${esc(val(rh, r, 1))}</td><td class="val">${esc(val(rh, r, 0))}</td></tr>`; }).join('')}</tbody>
  </table></div>
</div></section>`;
}

function empresaB(l) {
  const t = T[l], v = 'b';
  return `<section class="cab-pag"><div class="in"><p class="eyebrow">${t.selo}</p><h1 data-palavras>${l === 'pt' ? 'Uma fábrica dedicada à retífica de motores' : 'A factory dedicated to engine rebuilding'}</h1></div></section>
<section class="sec"><div class="in emp-b">
  <div class="emp-b-txt" data-rev>${t.empresa.map(p => `<p>${fam(p)}</p>`).join('')}</div>
  <div class="emp-b-fotos" data-rev="dir"><figure>${img('empresa-aerea', l === 'pt' ? 'Vista aérea da fábrica' : 'Aerial view of the factory')}</figure><figure>${img('empresa-fabrica', l === 'pt' ? 'Interior da fábrica' : 'Factory floor')}</figure></div>
</div></section>
<section class="sec pilares"><div class="in pil-grade" data-rev-filhos data-rev-passo="110">
  <div><b>${E.desde}</b><h3>${l === 'pt' ? 'Fundação' : 'Founded'}</h3><p>${l === 'pt' ? 'Desde então especializada em máquinas para retífica de motores.' : 'Specialized in engine rebuilding machines ever since.'}</p></div>
  <div><b>CNC</b><h3>${l === 'pt' ? 'Precisão' : 'Precision'}</h3><p>${l === 'pt' ? 'Projetistas especializados e comando numérico na usinagem dos componentes.' : 'Specialized designers and numeric control machining of components.'}</p></div>
  <div><b>${l === 'pt' ? 'Baixo' : 'Low'}</b><h3>${l === 'pt' ? 'Custo de manutenção' : 'Maintenance cost'}</h3><p>${l === 'pt' ? 'Máquinas modernas, versáteis e de alta produtividade.' : 'Modern, versatile, high-productivity machines.'}</p></div>
  <div><b>${l === 'pt' ? 'Mundo' : 'World'}</b><h3>${l === 'pt' ? 'Exportação' : 'Export'}</h3><p>${t.paises}.</p></div>
</div></section>
<section class="sec processo"><div class="in">
  <div class="cab-sec" data-rev><h2>${t.qualidadeTit}</h2></div>
  <ol class="proc proc-4" data-rev-filhos data-rev-passo="110">${t.qualidade.map(([a, b], i) => `<li><span class="proc-n">0${i + 1}</span><div><h3>${a}</h3><p>${b}</p></div></li>`).join('')}</ol>
</div></section>
${cta(v, l)}`;
}

function equipamentosB(l) {
  const t = T[l], v = 'b';
  return `<section class="cab-pag"><div class="in"><p class="eyebrow">${t.nav.equipamentos}</p><h1 data-palavras>${l === 'pt' ? 'Linha FAMOP para retífica de motores' : 'FAMOP engine rebuilding line'}</h1></div></section>
${grupos.map(g => `<section class="sec grupo-b" id="${g.id}"><div class="in">
  <h2 class="grupo-tit">${g[l]}</h2>
  ${g.id === 'virabrequins' ? `<p class="grupo-txt">${esc(t.grupoTxt)}</p>` : ''}
  <div class="gr-grade">${maquinas.filter(m => m.grupo === g.id).map(m => `<a class="gb" href="${href(v, l, m.slug)}" data-rev>
    <span class="gb-foto">${img(m.foto, altMaq(m, l))}</span>
    <b>${m.codigo}</b><span class="gb-nome">${esc(m[l].nome)}</span>
    ${chaves(m, l)}
    <span class="link">${t.fichaDe}${ic('seta')}</span>
  </a>`).join('')}</div>
</div></section>`).join('')}
${comparaB(v, l)}
${cta(v, l)}`;
}

function maquinaB(m, l) {
  const t = T[l], v = 'b';
  const cota = (() => { const c = chave(m)[0]; return c ? `${l === 'pt' ? c.pt : c.en}: ${num(l, c.v)} ${c.un}` : ''; })();
  const fotosExtra = [...(m.galeria || []).map(g => ({ foto: g.foto, leg: g[l] })), ...(m.cabecote ? [{ foto: m.cabecote.foto, leg: t.cabecoteTit }] : []), ...(m.extraFoto ? [{ foto: m.extraFoto, leg: m.extras[0][l][0] }] : [])];
  return `<section class="maq-b"><div class="in">
  <nav class="trilha" aria-label="${l === 'pt' ? 'Você está em' : 'You are here'}"><a href="${href(v, l, 'equipamentos')}">${t.nav.equipamentos}</a><span aria-hidden="true">/</span><a href="${href(v, l, 'equipamentos', `#${m.grupo}`)}">${grupos.find(g => g.id === m.grupo)[l]}</a></nav>
  <div class="mb-grade">
    ${cotaMaq(m, l, cota)}
    <div class="mb-txt">
      <p class="mb-cod">${m.codigo}</p>
      <h1>${esc(m[l].nome)}</h1>
      <p class="mb-curto">${esc(m[l].curto)}</p>
      <ul class="checks">${m.destaques[l].map(d => `<li>${ic('ok')}<span>${esc(d)}</span></li>`).join('')}</ul>
      <div class="acoes"><a class="btn btn-cheio" href="${href(v, l, 'contato', `?maquina=${m.slug}`)}">${ic('mail')}${t.pedir}</a><a class="btn btn-linha" href="#ficha">${t.fichaTit}</a></div>
    </div>
  </div>
</div></section>
<nav class="subnav" aria-label="${m.codigo}"><div class="in"><a href="#descricao">${l === 'pt' ? 'Descrição' : 'Description'}</a><a href="#ficha">${t.fichaTit}</a><a href="#acessorios">${m.estojo ? t.pecasTit : t.acessTit}</a></div></nav>
<section class="sec" id="descricao"><div class="in desc-grade">
  <div class="desc-txt" data-rev>${m.texto[l].map(p => `<p>${fam(p)}</p>`).join('')}
    ${m.cabecote ? `<h3>${t.cabecoteTit}</h3>${lista(m.cabecote[l], 'checks-txt')}` : ''}
    ${m.extras ? m.extras.map(x => `<h3>${esc(x[l][0])}</h3><p>${esc(x[l][1])}</p>`).join('') : ''}
  </div>
  <div class="desc-fotos">${fotosExtra.map(f => `<figure data-rev="dir">${img(f.foto, f.leg || '')}${f.leg ? `<figcaption>${esc(f.leg)}</figcaption>` : ''}</figure>`).join('')}</div>
</div></section>
<section class="sec ficha-b" id="ficha"><div class="in">
  <h2>${t.fichaTit}</h2>
  ${fichaTabela(m, l)}
</div></section>
<section class="sec" id="acessorios"><div class="in">
  ${m.estojo ? estojo(m, l, 'estojo-b') : m.acessorios === 'retifica' ? blocoRetifica(l, 'retif-b') : `<div class="acess-b" data-rev><h2>${t.acessTit}</h2>${lista(m.acessorios[l], 'acess acess-num')}</div>`}
</div></section>
<section class="sec outras-b"><div class="in"><h2>${t.outros}</h2><div class="ob-l">${maquinas.filter(o => o !== m).map(o => `<a href="${href(v, l, o.slug)}"><span>${img(o.foto, altMaq(o, l))}</span><b>${o.codigo}</b><small>${esc(o[l].nome)}</small></a>`).join('')}</div></div></section>
${cta(v, l)}`;
}

function contatoB(l) {
  const t = T[l], v = 'b';
  return `<section class="cab-pag"><div class="in"><p class="eyebrow">${t.navCurto.contato}</p><h1 data-palavras>${t.contatoTit}</h1><p class="cab-sub">${t.contatoSub}</p></div></section>
<section class="sec"><div class="in cont-grade">
  <div data-rev>${formContato(v, l)}</div>
  <aside class="cont-lado" data-rev="dir">${contatoLinhas(l)}<div class="acoes"><a class="btn btn-cheio" href="${mapaRota}" target="_blank" rel="noopener">${ic('rota')}${t.rota}</a><a class="btn btn-linha" href="tel:${E.foneHref}">${ic('tel')}${t.ligar}</a></div></aside>
</div></section>
${mapa()}`;
}

// ---------- montagem ----------
export function gerarVersao(v) {
  const out = {};
  for (const l of LANGS) {
    const t = T[l];
    const add = (slug, tit, desc, corpo) => { out[caminho(l, slug)] = pagina(v, l, slug, tit, desc, corpo); };
    const descHome = l === 'pt' ? 'FAMOP, fábrica de máquinas para retífica de motores em Piracicaba (SP) desde 1964: broqueadoras de cilindros, mesa pneumática, retificadora de bielas e retificadoras de virabrequins.' : 'FAMOP, engine rebuilding machine manufacturer in Piracicaba, Brazil, since 1964: cylinder boring machines, air float fixture, connecting rod and crankshaft grinders.';
    add('index', `FAMOP · ${t.taglineLonga}`, descHome, v === 'a' ? homeA(l) : homeB(l));
    add('empresa', titulo(l, t.nav.empresa), t.empresa[0], v === 'a' ? empresaA(l) : empresaB(l));
    add('equipamentos', titulo(l, t.nav.equipamentos), maquinas.map(m => nomeMaq(m, l)).join(', '), v === 'a' ? equipamentosA(l) : equipamentosB(l));
    for (const m of maquinas) add(m.slug, titulo(l, nomeMaq(m, l)), m[l].curto, v === 'a' ? maquinaA(m, l) : maquinaB(m, l));
    add('contato', titulo(l, t.navCurto.contato), `${E.endereco.join(', ')}. ${t.fone} ${E.fone}.`, v === 'a' ? contatoA(l) : contatoB(l));
  }
  return out;
}
