// Monta as páginas das versões A ("Campânula": fiel ao site atual, a foto aérea da fábrica, o azul-marinho do logo e o menu em
// abas itálicas) e B ("Curva": clara e técnica, abre na carga incandescente e mostra a curva de cada tratamento), em português
// e inglês. Estilos em public/assets/{base,a,b}.css, script em site.js.
import { empresa as E, numeros, tratamentos, segmentos, valores, galeria, T } from './conteudo.mjs';

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const LANGS = ['pt', 'en'];
const PAGS = ['index', 'servicos', 'empresa', 'qualidade', 'fotos', 'contato'];
export const nomesVersao = { a: 'Campânula', b: 'Curva' };

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  ok: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  doc: '<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5"/><path d="M9 13l2 2 4-4"/>',
  fogo: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 01-10 0c0-2.5 1.5-3.5 2-5 1 1.5 1.5 2.3 2.5 2.5C11 8 11.5 5.5 12 3z"/>',
  solda: '<path d="M4 20l7-7M9 11l4 4M14 4l6 6-5 1-2-2z"/><path d="M5 15l-1 1M8 18l-1 1"/>',
  fora: '<path d="M14 5h5v5M19 5l-8 8"/><path d="M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

const url = (v, L, pag) => `/${v}/${T[L].slugs[pag]}`;
const num = (n, L) => ({ v: L === 'en' && n.en_v ? n.en_v : n.v, u: L === 'en' && n.en_u ? n.en_u : n.u || '' });
const foto = (i, L, grupo, extra = '') => `<img src="/assets/img/g${String(i).padStart(2, '0')}.webp" alt="${esc(T[L].fotoAlt[grupo])}" width="800" height="600" loading="lazy" decoding="async"${extra}>`;
const faixa = (t, L) => L === 'en' && t.faixaEn ? t.faixaEn : (L === 'en' ? t.faixa.replace(/(\d)\.(\d{3})/g, '$1,$2') : t.faixa);

// ---------- moldura ----------
function head(v, L, caminho, tit, desc, alternos) {
  const t = T[L], u = `${E.url}${v}/${caminho}`;
  const hl = LANGS.map(l => `<link rel="alternate" hreflang="${T[l].lang}" href="${E.url.replace(/\/$/, '')}${alternos[l]}">`).join('\n');
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tit)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${u}">
${hl}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Thermotech Tratamento Térmico">
<meta property="og:locale" content="${t.og}">
<meta property="og:title" content="${esc(tit)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${u}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1A328C">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,600;0,700;1,600;1,700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const bandeiras = {
  pt: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="2" fill="#229e45"/><path d="M14 3l10 7-10 7-10-7z" fill="#f8e509"/><circle cx="14" cy="10" r="4.2" fill="#2b49a3"/><path d="M10 9.3c2.6-.6 5.4-.2 7.9 1.2" stroke="#fff" stroke-width=".8" fill="none"/></svg>',
  en: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="2" fill="#012169"/><path d="M0 0l28 20M28 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l28 20M28 0L0 20" stroke="#c8102e" stroke-width="1.6"/><path d="M14 0v20M0 10h28" stroke="#fff" stroke-width="6"/><path d="M14 0v20M0 10h28" stroke="#c8102e" stroke-width="3.4"/></svg>',
};
const idiomas = (L, alternos) => `<div class="idiomas">${LANGS.map(l => `<a href="${alternos[l]}" hreflang="${T[l].lang}" lang="${T[l].lang}" title="${T[l].bandeira}"${l === L ? ' aria-current="true"' : ''}>${bandeiras[l]}<span>${l.toUpperCase()}</span></a>`).join('')}</div>`;
const menu = (v, L, atual) => PAGS.map(p => `<a href="${url(v, L, p)}"${p === atual ? ' aria-current="page"' : ''}>${T[L].nav[p]}</a>`).join('');
const menuBtn = L => `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="${T[L].abrirMenu}">${ic('menu')}</button>`;
const logo = (v, L, branco = false) => `<a class="logo" href="${url(v, L, 'index')}" aria-label="Thermotech, ${T[L].nav.index}"><img src="/assets/${branco ? 'logo-branco' : 'logo'}.svg" alt="Thermotech Tratamento Térmico e Soldagem" width="236" height="62"></a>`;

function topo(v, L, atual, alternos) {
  const t = T[L];
  if (v === 'a') return `<header class="topo">
<div class="in topo-linha">
  ${logo(v, L)}
  <div class="topo-info">
    <p class="so-pc">${ic('pin')} ${E.endereco.join(' · ')}</p>
    <a class="topo-fone" href="tel:${E.foneHref}">${ic('tel')}<span><small>(19)</small> 3704-6554</span></a>
  </div>
  ${idiomas(L, alternos)}
  ${menuBtn(L)}
</div>
<nav id="menu" class="abas" aria-label="Principal"><div class="in">${menu(v, L, atual)}</div></nav>
</header>`;
  return `<div class="util"><div class="in">
  <span class="so-pc">${t.desde}</span>
  <a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a>
  <a class="so-pc" href="mailto:${E.email}">${ic('mail')} ${E.email}</a>
  ${idiomas(L, alternos)}
</div></div>
<header class="topo"><div class="in">
  ${logo(v, L)}
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, L, atual)}</nav>
  <a class="btn btn-quente so-pc" href="${url(v, L, 'contato')}#orcamento">${t.orcamento}</a>
  ${menuBtn(L)}
</div></header>`;
}

function rodape(v, L) {
  const t = T[L];
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Thermotech Tratamento Térmico e Soldagem" width="220" height="58" loading="lazy"><p>${t.rodape}</p></div>
  <div><h3>${t.ligue}</h3><p><a class="rod-fone" href="tel:${E.foneHref}">${E.fone}</a></p><p><a href="mailto:${E.email}">${E.email}</a></p></div>
  <div><h3>${t.localizacao}</h3><address>${E.endereco.join('<br>')}</address><p><a href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} ${t.verMapa}</a></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${menu(v, L, '')}</nav>
</div><p class="rod-fim"><span>© ${E.razao}</span><span>${t.desde}</span></p></footer>`;
}

const pagina = ({ v, L, pag, caminho, alternos, tit, desc, corpo }) => `${head(v, L, caminho, tit, desc, alternos)}
<body class="v-${v} p-${pag}">
<a class="pular" href="#conteudo">${T[L].pular}</a>
${topo(v, L, pag, alternos)}
<main id="conteudo">
${corpo}
</main>
${rodape(v, L)}
<div class="caixa" hidden role="dialog" aria-modal="true" aria-label="${T[L].fotosTit}"><button class="cx-fechar" type="button" aria-label="${T[L].fechar}">✕</button><button class="cx-ant" type="button" aria-label="${T[L].anterior}">‹</button><img alt=""><button class="cx-prox" type="button" aria-label="${T[L].proxima}">›</button></div>
</body>
</html>
`;

// ---------- pedaços comuns ----------

// Curva de tratamento térmico desenhada em SVG (temperatura x tempo). y = 270 - T*0.2 (0 a 1.200 °C).
const Y = t => +(270 - t * 0.2).toFixed(1);
function caminhoCurva(tr) {
  const y = Y(tr.temp), base = Y(25);
  let d = `M40 ${base} L170 ${y} L330 ${y}`;
  if (tr.resf === 'forno') d += ` C400 ${y} 470 ${Y(tr.temp * 0.55)} 580 ${Y(tr.temp * 0.32)}`;
  if (tr.resf === 'ar') d += ` C370 ${y} 395 ${Y(tr.temp * 0.25)} 500 ${Y(60)}`;
  if (tr.resf === 'agua') {
    if (tr.duplo) d += ` L352 ${base} L400 ${base} L450 ${Y(tr.duplo)} L530 ${Y(tr.duplo)} C552 ${Y(tr.duplo)} 562 ${Y(tr.duplo * 0.4)} 590 ${Y(80)}`;
    else d += ` L352 ${base} L560 ${base}`;
  }
  return d;
}
function curva(L, lista = tratamentos, { ativo = lista[0].id, rotulos = true } = {}) {
  const t = T[L];
  const marcas = [0, 300, 600, 900, 1200].map(v => `<g class="cv-marca"><line x1="40" x2="590" y1="${Y(v)}" y2="${Y(v)}"/><text x="32" y="${Y(v) + 4}" text-anchor="end">${L === 'en' ? v.toLocaleString('en') : v.toLocaleString('pt-BR')}</text></g>`).join('');
  const caminhos = lista.map(tr => `<g class="cv-trat${tr.id === ativo ? ' on' : ''}" data-curva="${tr.id}"><path class="cv-brilho" d="${caminhoCurva(tr)}"/><path class="cv-linha" d="${caminhoCurva(tr)}"/><text class="cv-temp" x="250" y="${Y(tr.temp) - 12}" text-anchor="middle">${L === 'en' ? tr.temp.toLocaleString('en') : tr.temp.toLocaleString('pt-BR')} °C</text></g>`).join('');
  const fases = rotulos ? `<g class="cv-fases"><text x="105" y="290" text-anchor="middle">${t.aquec}</text><text x="250" y="290" text-anchor="middle">${t.patamar}</text><text x="455" y="290" text-anchor="middle">${t.resfr}</text></g>` : '';
  return `<svg class="curva" viewBox="0 0 600 300" role="img" aria-label="${esc(t.eixoT)} × ${esc(t.eixoTempo)}"><text class="cv-eixo" x="40" y="16">°C</text>${marcas}${caminhos}${fases}</svg>`;
}

const listaTratamentos = (L, cls = 'trats') => `<ol class="${cls}">${tratamentos.map((tr, i) => `<li><span class="tr-n">${String(i + 1).padStart(2, '0')}</span><div><h3>${tr[L]}</h3><p>${L === 'en' ? tr.den : tr.dpt}</p></div></li>`).join('')}</ol>`;

const tabelaTratamentos = L => {
  const t = T[L];
  return `<div class="tab-wrap"><table class="tab"><thead><tr><th>${L === 'en' ? 'Treatment' : 'Tratamento'}</th><th>${t.paraQue}</th><th>${t.faixaTipica}</th><th>${t.resfriamento}</th></tr></thead><tbody>${tratamentos.map(tr => `<tr><th scope="row">${tr[L]}</th><td>${L === 'en' ? tr.den : tr.dpt}</td><td class="nowrap">${faixa(tr, L)}</td><td class="nowrap">${t.resfNome[tr.resf]}</td></tr>`).join('')}</tbody></table></div><p class="nota">${t.notaFaixa}</p>`;
};

const numerosBloco = (L, cls) => `<dl class="${cls}">${numeros.map(n => { const x = num(n, L); return `<div><dt>${x.v}${x.u ? `<small>${x.u}</small>` : ''}</dt><dd>${n[L]}</dd></div>`; }).join('')}</dl>`;

const passos = (L, cls = 'passos') => `<ol class="${cls}">${T[L].passos.map(([h, p], i) => `<li><span class="ps-n">${i + 1}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>`;

const segs = (L, cls = 'segs') => `<ul class="${cls}">${segmentos[L].map(s => `<li>${s}</li>`).join('')}</ul>`;

function galeriaBloco(L) {
  const t = T[L];
  const todas = Object.entries(galeria).flatMap(([g, ids]) => ids.map(i => ({ g, i })));
  const chips = ['todas', ...Object.keys(galeria)].map((g, k) => `<button class="chip" type="button" data-grupo="${g}" aria-pressed="${k === 0}">${t.grupos[g]} <small>${g === 'todas' ? todas.length : galeria[g].length}</small></button>`).join('');
  return `<div class="chips" role="group" aria-label="${t.fotosTit}">${chips}</div>
<ul class="galeria">${todas.map(({ g, i }) => `<li data-g="${g}"><a href="/assets/img/g${String(i).padStart(2, '0')}.webp" data-caixa>${foto(i, L, g)}</a></li>`).join('')}</ul>`;
}

function formulario(L) {
  const f = T[L].form;
  const opts = tratamentos.map(tr => `<option>${tr[L]}</option>`).join('') + `<option>${T[L].soldagem}</option><option>${f.naoSei}</option>`;
  return `<form class="form" id="orcamento" data-email="${E.email}" data-assunto="${esc(f.assunto)}">
  <label><span>${f.nome} *</span><input name="${f.nome}" required autocomplete="name"></label>
  <label><span>${f.empresa}</span><input name="${f.empresa}" autocomplete="organization"></label>
  <label><span>${f.email} *</span><input name="${f.email}" type="email" required autocomplete="email"></label>
  <label><span>${f.fone}</span><input name="${f.fone}" type="tel" autocomplete="tel"></label>
  <label><span>${f.material}</span><input name="${f.material}" placeholder="${esc(f.materialPh)}"></label>
  <label><span>${f.tratamento}</span><select name="${f.tratamento}">${opts}</select></label>
  <label><span>${f.peso}</span><input name="${f.peso}" placeholder="${esc(f.pesoPh)}"></label>
  <label class="larga"><span>${f.msg} *</span><textarea name="${f.msg}" rows="5" required placeholder="${esc(f.msgPh)}"></textarea></label>
  <div class="larga form-fim"><button class="btn btn-quente" type="submit">${ic('mail')} ${f.enviar}</button><small>${f.obs} ${E.email}.</small></div>
</form>`;
}

const mapa = L => `<div class="mapa"><iframe src="${E.mapaEmbed}" title="${T[L].localizacao}: ${E.endereco.join(', ')}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

const certificado = L => {
  const en = L === 'en';
  const tr = tratamentos.find(x => x.id === 'normalizacao');
  return `<figure class="cert"><div class="cert-topo"><img src="/assets/marca.svg" alt="Thermotech" width="120" height="26" loading="lazy"><b>${en ? 'Quality certificate' : 'Certificado de qualidade'}</b></div>
<dl class="cert-dados"><div><dt>${en ? 'Treatment' : 'Tratamento'}</dt><dd>${tr[L]}</dd></div><div><dt>${en ? 'Furnace' : 'Forno'}</dt><dd>${en ? 'Bell type' : 'Campânula'} 02</dd></div><div><dt>${en ? 'Hardness' : 'Dureza'}</dt><dd>HB ✓</dd></div></dl>
${curva(L, [tr], { rotulos: false })}
<figcaption>${en ? 'Illustrative example: each load ships with its own logged curve.' : 'Exemplo ilustrativo: cada carga sai com a curva registrada do seu ciclo.'}</figcaption></figure>`;
};

const lab = (L, cls = 'lab') => `<ul class="${cls}">${T[L].lab.map(([h, p], i) => `<li><img src="/assets/img/${['durometro-1', 'durometro-2', 'microscopio'][i]}.webp" alt="${esc(h)}" loading="lazy"><h3>${h}</h3><p>${p}</p></li>`).join('')}</ul><p class="lab-extra">${T[L].labExtra}</p>`;

const politica = L => { const t = T[L]; return `<p>${t.politica}</p><ul class="pol">${t.politicaItens.map(x => `<li>${ic('ok')}<span>${x}</span></li>`).join('')}</ul><p class="pol-rev">${t.politicaRev}</p>`; };

// ======================= VERSÃO A: Campânula =======================
const A = {
  index(L) {
    const t = T[L];
    return `<section class="a-hero">
  <img class="a-hero-foto" src="/assets/img/aerea.webp" alt="${L === 'en' ? 'Aerial view of the Thermotech plant in Limeira' : 'Vista aérea da fábrica da Thermotech em Limeira'}" width="1366" height="600" fetchpriority="high">
  <div class="in a-hero-txt">
    <img class="a-hero-marca" src="/assets/logo-branco.svg" alt="Thermotech Tratamento Térmico e Soldagem" width="520" height="137">
    <p class="a-hero-frase">${t.negocio}</p>
    <div class="a-hero-acoes"><a class="btn btn-claro" href="${url('a', L, 'servicos')}">${t.nav.servicos} ${ic('seta')}</a><a class="btn btn-linha" href="${url('a', L, 'contato')}#orcamento">${t.orcamento}</a></div>
  </div>
</section>
<section class="a-numeros"><div class="in">${numerosBloco(L, 'nums')}</div></section>
<section class="a-sec"><div class="in a-duas">
  <div>
    <p class="sobre">${t.nav.servicos}</p>
    <h2>${L === 'en' ? 'Heat treatment' : 'Tratamento térmico'}</h2>
    <p class="lead">${t.defTT}</p>
    ${listaTratamentos(L, 'trats trats-2')}
    <a class="link" href="${url('a', L, 'servicos')}">${L === 'en' ? 'See every treatment' : 'Ver cada tratamento'} ${ic('seta')}</a>
  </div>
  <figure class="a-foto-alta">${foto(57, L, 'forno')}<figcaption>${L === 'en' ? 'Load at temperature in one of the 4 bell furnaces' : 'Carga em temperatura num dos 4 fornos campânula'}</figcaption></figure>
</div></section>
<section class="a-processo"><div class="in">
  <p class="sobre">${L === 'en' ? 'How a load moves through the plant' : 'Como uma carga passa pela Thermotech'}</p>
  <h2>${L === 'en' ? 'From review to certificate' : 'Da análise ao certificado'}</h2>
  <div class="a-proc-topo"><div class="a-proc-curva">${curva(L, [tratamentos[0]], { rotulos: false })}</div><figure>${foto(16, L, 'forno')}</figure></div>
  ${passos(L, 'passos a-passos')}
</div></section>
<section class="a-sec a-segs"><div class="in">
  <p class="sobre">${L === 'en' ? 'Sectors we serve' : 'Segmentos atendidos'}</p>
  ${segs(L, 'segs a-segs-lista')}
</div></section>
<section class="a-sec a-qual"><div class="in a-duas a-duas-inv">
  ${certificado(L)}
  <div>
    <p class="sobre">${t.nav.qualidade}</p>
    <h2>${L === 'en' ? 'Every load with its curve' : 'Toda carga com a sua curva'}</h2>
    <p>${t.qual2}</p><p>${t.qual1}</p>
    <a class="link" href="${url('a', L, 'qualidade')}">${L === 'en' ? 'Our laboratory' : 'Nosso laboratório'} ${ic('seta')}</a>
  </div>
</div></section>
<section class="a-mosaico"><div class="in">
  <div class="a-mos-cab"><h2>${t.fotosTit}</h2><a class="link" href="${url('a', L, 'fotos')}">${L === 'en' ? 'All 64 photos' : 'Ver as 64 fotos'} ${ic('seta')}</a></div>
  <div class="mosaico">${[[41, 'forno'], [33, 'pecas'], [9, 'cargas'], [27, 'pecas'], [28, 'forno'], [35, 'expedicao']].map(([i, g]) => `<a href="${url('a', L, 'fotos')}">${foto(i, L, g)}</a>`).join('')}</div>
</div></section>
${A.cta(L)}`;
  },
  cta(L) {
    const t = T[L];
    return `<section class="a-cta"><div class="in"><div><h2>${t.fale}</h2><p>${t.contatoTxt}</p></div><div class="a-cta-acoes"><a class="a-cta-fone" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a class="btn btn-claro" href="${url('a', L, 'contato')}#orcamento">${t.orcamento}</a></div></div></section>`;
  },
  faixa(L, tit, sobre, img = 'aerea-fachada') {
    return `<section class="a-faixa"><img src="/assets/img/${img}.webp" alt="" width="1066" height="600"><div class="in"><p class="sobre">${sobre}</p><h1>${tit}</h1></div></section>`;
  },
  servicos(L) {
    const t = T[L];
    return `${A.faixa(L, L === 'en' ? 'Heat treatment' : 'Tratamento térmico', t.nav.servicos)}
<section class="a-sec"><div class="in a-duas">
  <div><p class="lead">${t.defTT}</p><p>${t.empresa2}</p></div>
  <figure class="a-foto-alta">${foto(28, L, 'forno')}</figure>
</div></section>
<section class="a-sec a-claro"><div class="in">
  <h2>${L === 'en' ? 'Treatments performed' : 'Tratamentos realizados'}</h2>
  <div class="a-curva-sel" data-curvas>
    <div class="a-cv-botoes" role="tablist">${tratamentos.map((tr, i) => `<button type="button" role="tab" data-alvo="${tr.id}" aria-selected="${i === 0}">${tr[L]}</button>`).join('')}</div>
    <div class="a-cv-painel">${curva(L)}${tratamentos.map((tr, i) => `<div class="a-cv-info" data-info="${tr.id}"${i ? ' hidden' : ''}><h3>${tr[L]}</h3><p>${L === 'en' ? tr.den : tr.dpt}</p><p class="a-cv-dados"><span>${t.faixaTipica}: <b>${faixa(tr, L)}</b></span><span>${t.resfriamento}: <b>${t.resfNome[tr.resf]}</b></span></p></div>`).join('')}<p class="nota">${t.notaFaixa}</p></div>
  </div>
</div></section>
<section class="a-sec"><div class="in a-duas a-duas-inv">
  <figure class="a-foto-alta">${foto(27, L, 'pecas')}</figure>
  <div><p class="sobre">${ic('solda')} ${L === 'en' ? 'Scope' : 'Escopo'}</p><h2>${t.soldagem}</h2><p>${t.soldagemTxt}</p><blockquote>“${t.escopo}”</blockquote></div>
</div></section>
<section class="a-processo"><div class="in"><h2>${L === 'en' ? 'How we work' : 'Como trabalhamos'}</h2>${passos(L, 'passos a-passos')}</div></section>
${A.cta(L)}`;
  },
  empresa(L) {
    const t = T[L];
    return `${A.faixa(L, L === 'en' ? 'Company' : 'Institucional', t.nav.empresa)}
<section class="a-sec"><div class="in a-duas">
  <div><p class="lead">${t.empresa1}</p><p>${t.empresa2}</p><p>${t.empresa3}</p></div>
  <figure class="a-foto-alta"><img src="/assets/img/aerea.webp" alt="${L === 'en' ? 'Thermotech plant, Via Luiz Varga, Limeira' : 'Fábrica da Thermotech, Via Luiz Varga, Limeira'}" width="1366" height="600" loading="lazy"></figure>
</div></section>
<section class="a-numeros"><div class="in">${numerosBloco(L, 'nums')}</div></section>
<section class="a-sec"><div class="in">
  <div class="a-mvv">
    <div><h3>${L === 'en' ? 'Business' : 'Negócio'}</h3><p>“${t.negocio}”</p></div>
    <div><h3>${L === 'en' ? 'Scope' : 'Escopo'}</h3><p>“${t.escopo}”</p></div>
    <div><h3>${L === 'en' ? 'Mission' : 'Missão'}</h3><p>“${t.missao}”</p></div>
    <div><h3>${L === 'en' ? 'Vision' : 'Visão'}</h3><p>“${t.visao}”</p></div>
  </div>
</div></section>
<section class="a-sec a-claro"><div class="in">
  <h2>${L === 'en' ? 'Values' : 'Valores'}</h2>
  <ol class="a-valores">${valores.map(x => `<li><h3>${x[L]}</h3><p>${L === 'en' ? x.den : x.dpt}</p></li>`).join('')}</ol>
</div></section>
<section class="a-sec"><div class="in a-duas">
  <div><h2>${t.politicaTit}</h2>${politica(L)}</div>
  <figure class="a-pol-doc"><img src="/assets/img/politica.webp" alt="${t.politicaTit}" width="636" height="426" loading="lazy"><figcaption>${L === 'en' ? 'Controlled copy of the policy (Portuguese)' : 'Cópia controlada da política'}</figcaption></figure>
</div></section>
<section class="a-sec a-segs"><div class="in"><p class="sobre">${L === 'en' ? 'Sectors we serve' : 'Segmentos atendidos'}</p>${segs(L, 'segs a-segs-lista')}</div></section>
${A.cta(L)}`;
  },
  qualidade(L) {
    const t = T[L];
    return `${A.faixa(L, t.nav.qualidade, L === 'en' ? 'Quality laboratory' : 'Laboratório de qualidade', 'aerea-fachada')}
<section class="a-sec"><div class="in a-duas">
  <div><p class="lead">${t.qual2}</p><p>${t.qual1}</p><p>${t.qual3}</p></div>
  ${certificado(L)}
</div></section>
<section class="a-sec a-claro"><div class="in"><h2>${L === 'en' ? 'Laboratory equipment' : 'Equipamentos do laboratório'}</h2>${lab(L, 'lab a-lab')}</div></section>
<section class="a-sec"><div class="in a-duas">
  <div><h2>${t.politicaTit}</h2>${politica(L)}</div>
  <figure class="a-pol-doc"><img src="/assets/img/politica.webp" alt="${t.politicaTit}" width="636" height="426" loading="lazy"></figure>
</div></section>
${A.cta(L)}`;
  },
  fotos(L) {
    const t = T[L];
    return `${A.faixa(L, t.fotosTit, L === 'en' ? 'Gallery' : 'Galeria', 'aerea-fachada')}
<section class="a-sec"><div class="in">${galeriaBloco(L)}</div></section>
${A.cta(L)}`;
  },
  contato(L) {
    const t = T[L];
    return `${A.faixa(L, t.contatoTit, t.fale)}
<section class="a-sec"><div class="in a-contato">
  <div><h2>${t.orcamento}</h2><p>${t.contatoTxt}</p>${formulario(L)}</div>
  <aside class="a-ct-info">
    <a class="a-ct-fone" href="tel:${E.foneHref}">${ic('tel')}<span><small>(19)</small> 3704-6554</span></a>
    <p><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></p>
    <h3>${t.localizacao}</h3><address>${E.endereco.join('<br>')}</address>
    <p><a href="${E.mapa}" target="_blank" rel="noopener">${ic('fora')} ${t.verMapa}</a></p>
  </aside>
</div></section>
<section class="a-mapa">${mapa(L)}</section>`;
  },
};

// ======================= VERSÃO B: Curva =======================
const B = {
  index(L) {
    const t = T[L];
    const en = L === 'en';
    return `<section class="b-hero"><div class="in b-hero-grade">
  <div class="b-hero-txt">
    <p class="b-rotulo">${t.sub} · Limeira, SP</p>
    <h1>${en ? 'Heat treatment for steel and cast iron, in loads from 700 kg to 10 t.' : 'Tratamento térmico de aço e ferro fundido, em cargas de 700 kg a 10 t.'}</h1>
    <p class="lead">${en ? 'Four LPG-fired bell furnaces up to 1,200 °C, every cycle logged and a quality certificate with the curve in each delivery.' : 'Quatro fornos campânula a gás LP até 1.200 °C, cada ciclo monitorado e certificado de qualidade com a curva gráfica em toda entrega.'}</p>
    <div class="b-acoes"><a class="btn btn-quente" href="${url('b', L, 'contato')}#orcamento">${t.orcamento} ${ic('seta')}</a><a class="btn btn-linha" href="${url('b', L, 'servicos')}">${en ? 'The 10 treatments' : 'Os 10 tratamentos'}</a></div>
  </div>
  <figure class="b-hero-foto">${foto(57, L, 'forno', ' fetchpriority="high"').replace('loading="lazy"', 'loading="eager"')}<span class="b-leitura"><small>${en ? 'up to' : 'até'}</small>${en ? '1,200' : '1.200'}<small>°C</small></span></figure>
</div></section>
<section class="b-ficha"><div class="in">${numerosBloco(L, 'nums b-nums')}</div></section>
<section class="b-sec"><div class="in">
  <div class="b-cab"><p class="b-rotulo">${t.nav.servicos}</p><h2>${en ? 'Pick a treatment and see its cycle' : 'Escolha o tratamento e veja o ciclo'}</h2><p>${t.defTT}</p></div>
  <div class="b-curvas" data-curvas>
    <ul class="b-cv-lista" role="tablist">${tratamentos.map((tr, i) => `<li><button type="button" role="tab" data-alvo="${tr.id}" aria-selected="${i === 0}"><span>${String(i + 1).padStart(2, '0')}</span>${tr[L]}</button></li>`).join('')}</ul>
    <div class="b-cv-painel">${curva(L)}${tratamentos.map((tr, i) => `<div class="b-cv-info" data-info="${tr.id}"${i ? ' hidden' : ''}><p>${en ? tr.den : tr.dpt}</p><dl><div><dt>${t.faixaTipica}</dt><dd>${faixa(tr, L)}</dd></div><div><dt>${t.resfriamento}</dt><dd>${t.resfNome[tr.resf]}</dd></div></dl></div>`).join('')}<p class="nota">${t.notaFaixa}</p></div>
  </div>
</div></section>
<section class="b-sec b-processo"><div class="in">
  <div class="b-cab"><p class="b-rotulo">${en ? 'Process' : 'Processo'}</p><h2>${en ? 'Six steps, one plant' : 'Seis etapas, uma só fábrica'}</h2></div>
  <div class="b-proc">
    <figure>${foto(16, L, 'forno')}</figure>
    ${passos(L, 'passos b-passos')}
  </div>
</div></section>
<section class="b-sec b-segs"><div class="in b-segs-grade">
  <h2>${en ? 'Who sends us parts' : 'Quem manda peças para a Thermotech'}</h2>
  ${segs(L, 'segs b-segs-lista')}
</div></section>
<section class="b-sec"><div class="in b-qual">
  <div><p class="b-rotulo">${t.nav.qualidade}</p><h2>${en ? 'Certificate and curve in every delivery' : 'Certificado e curva em toda entrega'}</h2><p>${t.qual2}</p><ul class="b-checks"><li>${ic('ok')} ${en ? 'RBC-traceable calibration' : 'Calibração rastreada RBC'}</li><li>${ic('ok')} ${en ? '3 hardness testers, 1 metallographic microscope' : '3 durômetros e 1 microscópio metalográfico'}</li><li>${ic('ok')} ${en ? 'Chemical and metallurgical engineers' : 'Engenheiro químico e metalúrgico'}</li></ul><a class="link" href="${url('b', L, 'qualidade')}">${en ? 'Quality and laboratory' : 'Qualidade e laboratório'} ${ic('seta')}</a></div>
  ${certificado(L)}
</div></section>
<section class="b-fotos"><div class="b-fotos-fila">${[[41, 'forno'], [9, 'cargas'], [33, 'pecas'], [18, 'forno'], [60, 'pecas'], [23, 'expedicao']].map(([i, g]) => `<a href="${url('b', L, 'fotos')}">${foto(i, L, g)}</a>`).join('')}</div><div class="in"><a class="link" href="${url('b', L, 'fotos')}">${en ? 'Photo gallery' : 'Galeria de fotos'} ${ic('seta')}</a></div></section>
${B.cta(L)}`;
  },
  cta(L) {
    const t = T[L];
    return `<section class="b-cta"><div class="in"><div><h2>${t.fale}</h2><p>${t.contatoTxt}</p></div><div class="b-cta-acoes"><a class="btn btn-quente" href="${url('b', L, 'contato')}#orcamento">${t.orcamento}</a><a class="b-cta-fone" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div></div></section>`;
  },
  cab(L, rot, tit, txt, img) {
    return `<section class="b-topo-pag"><div class="in b-topo-grade"><div><p class="b-rotulo">${rot}</p><h1>${tit}</h1>${txt ? `<p class="lead">${txt}</p>` : ''}</div>${img ? `<figure>${img}</figure>` : ''}</div></section>`;
  },
  servicos(L) {
    const t = T[L], en = L === 'en';
    return `${B.cab(L, t.nav.servicos, en ? 'Heat treatment and welding' : 'Tratamento térmico e soldagem', t.defTT, foto(28, L, 'forno'))}
<section class="b-sec"><div class="in">
  <div class="b-curvas" data-curvas>
    <ul class="b-cv-lista" role="tablist">${tratamentos.map((tr, i) => `<li><button type="button" role="tab" data-alvo="${tr.id}" aria-selected="${i === 0}"><span>${String(i + 1).padStart(2, '0')}</span>${tr[L]}</button></li>`).join('')}</ul>
    <div class="b-cv-painel">${curva(L)}${tratamentos.map((tr, i) => `<div class="b-cv-info" data-info="${tr.id}"${i ? ' hidden' : ''}><p>${en ? tr.den : tr.dpt}</p><dl><div><dt>${t.faixaTipica}</dt><dd>${faixa(tr, L)}</dd></div><div><dt>${t.resfriamento}</dt><dd>${t.resfNome[tr.resf]}</dd></div></dl></div>`).join('')}</div>
  </div>
</div></section>
<section class="b-sec b-cinza"><div class="in"><h2>${en ? 'All treatments at a glance' : 'Todos os tratamentos'}</h2>${tabelaTratamentos(L)}</div></section>
<section class="b-sec"><div class="in b-solda">
  <figure>${foto(27, L, 'pecas')}</figure>
  <div><p class="b-rotulo">${en ? 'Scope' : 'Escopo'}</p><h2>${t.soldagem}</h2><p>${t.soldagemTxt}</p><p class="b-citacao">“${t.escopo}”</p></div>
</div></section>
<section class="b-sec b-ficha-pag"><div class="in"><h2>${en ? 'Plant capacity' : 'Capacidade da planta'}</h2>${numerosBloco(L, 'nums b-nums b-nums-claro')}</div></section>
${B.cta(L)}`;
  },
  empresa(L) {
    const t = T[L], en = L === 'en';
    return `${B.cab(L, t.nav.empresa, en ? 'Metallurgy specialists since 2009' : 'Especialistas em metalurgia desde 2009', t.empresa1, `<img src="/assets/img/aerea-fachada.webp" alt="${en ? 'Aerial view of the plant' : 'Vista aérea da fábrica'}" width="1066" height="600">`)}
<section class="b-sec"><div class="in b-texto-duplo">
  <p>${t.empresa2}</p><p>${t.empresa3}</p>
</div></section>
<section class="b-ficha"><div class="in">${numerosBloco(L, 'nums b-nums')}</div></section>
<section class="b-sec"><div class="in b-mvv">
  <dl>
    <div><dt>${en ? 'Business' : 'Negócio'}</dt><dd>${t.negocio}</dd></div>
    <div><dt>${en ? 'Scope' : 'Escopo'}</dt><dd>${t.escopo}</dd></div>
    <div><dt>${en ? 'Mission' : 'Missão'}</dt><dd>${t.missao}</dd></div>
    <div><dt>${en ? 'Vision' : 'Visão'}</dt><dd>${t.visao}</dd></div>
  </dl>
</div></section>
<section class="b-sec b-cinza"><div class="in"><div class="b-cab"><p class="b-rotulo">${en ? 'Values' : 'Valores'}</p><h2>${en ? 'What guides the team' : 'O que guia a equipe'}</h2></div>
  <ol class="b-valores">${valores.map((x, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><h3>${x[L]}</h3><p>${en ? x.den : x.dpt}</p></li>`).join('')}</ol>
</div></section>
<section class="b-sec"><div class="in b-pol"><div><h2>${t.politicaTit}</h2>${politica(L)}</div><div><h3>${en ? 'Sectors we serve' : 'Segmentos atendidos'}</h3>${segs(L, 'segs b-segs-lista b-segs-claro')}</div></div></section>
${B.cta(L)}`;
  },
  qualidade(L) {
    const t = T[L], en = L === 'en';
    return `${B.cab(L, t.nav.qualidade, en ? 'Measured, logged, certified' : 'Medido, registrado e certificado', t.qual2, '')}
<section class="b-sec"><div class="in b-qual">
  <div><h2>${en ? 'Calibration and monitoring' : 'Calibração e monitoramento'}</h2><p>${t.qual1}</p><p>${t.qual3}</p></div>
  ${certificado(L)}
</div></section>
<section class="b-sec b-cinza"><div class="in"><h2>${en ? 'Laboratory' : 'Laboratório'}</h2>${lab(L, 'lab b-lab')}</div></section>
<section class="b-sec"><div class="in b-pol"><div><h2>${t.politicaTit}</h2>${politica(L)}</div><figure class="b-pol-doc"><img src="/assets/img/politica.webp" alt="${t.politicaTit}" width="636" height="426" loading="lazy"></figure></div></section>
${B.cta(L)}`;
  },
  fotos(L) {
    const t = T[L], en = L === 'en';
    return `${B.cab(L, t.fotosTit, en ? 'Inside the plant' : 'Por dentro da fábrica', en ? 'Loads in the furnace, parts after treatment and shipping, photographed at the plant in Limeira.' : 'Cargas no forno, peças depois do tratamento e a expedição, fotografadas na fábrica em Limeira.', '')}
<section class="b-sec"><div class="in">${galeriaBloco(L)}</div></section>
${B.cta(L)}`;
  },
  contato(L) {
    const t = T[L];
    return `${B.cab(L, t.contatoTit, t.orcamento, t.contatoTxt, '')}
<section class="b-sec"><div class="in b-contato">
  ${formulario(L)}
  <aside class="b-ct-info">
    <h3>${t.ligue}</h3><p><a class="b-ct-fone" href="tel:${E.foneHref}">${E.fone}</a></p>
    <h3>E-mail</h3><p><a href="mailto:${E.email}">${E.email}</a></p>
    <h3>${t.localizacao}</h3><address>${E.endereco.join('<br>')}</address>
    <p><a href="${E.mapa}" target="_blank" rel="noopener">${ic('fora')} ${t.verMapa}</a></p>
  </aside>
</div></section>
<section class="b-mapa">${mapa(L)}</section>`;
  },
};

const titulos = {
  pt: { index: 'Thermotech · Tratamento Térmico e Soldagem em Limeira (SP)', servicos: 'Tratamento térmico · Thermotech', empresa: 'Empresa · Thermotech', qualidade: 'Qualidade · Thermotech', fotos: 'Fotos · Thermotech', contato: 'Contato e orçamento · Thermotech' },
  en: { index: 'Thermotech · Heat Treatment and Welding in Limeira, Brazil', servicos: 'Heat treatment · Thermotech', empresa: 'Company · Thermotech', qualidade: 'Quality · Thermotech', fotos: 'Photos · Thermotech', contato: 'Contact and quote · Thermotech' },
};

export function gerarVersao(v) {
  const R = v === 'a' ? A : B, out = {};
  for (const L of LANGS) for (const pag of PAGS) {
    const caminho = T[L].slugs[pag];
    const alternos = Object.fromEntries(LANGS.map(l => [l, url(v, l, pag)]));
    out[caminho] = pagina({ v, L, pag, caminho, alternos, tit: titulos[L][pag], desc: T[L].empresa2, corpo: R[pag](L) });
  }
  return out;
}
