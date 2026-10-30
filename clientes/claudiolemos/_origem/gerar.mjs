// Gera clientes/claudiolemos/public/{index.html,a/,b/}, em pt (raiz), en/ e es/. Rodar depois de mudar qualquer texto:
// node clientes/claudiolemos/_origem/gerar.mjs
// A "Atelier": clara, no creme e no rosa do site atual. Abre com o vídeo da clínica (o mesmo da home de hoje, que lá aparece
// preto até carregar), mantém a ordem da home atual e o mapa de pontos sobre as fotos; passo a passo numa fita rosa com o 07 dourado.
// B "Consultório": o painel creme e grafite da seção "O profissional" de hoje virou o tom do site inteiro; capa com o retrato
// do Dr. Cláudio e o vídeo numa janela, selos dourados sobre grafite, passo a passo em linha do tempo vertical.
import fs from 'node:fs';
import path from 'node:path';
import * as K from './conteudo.mjs';

// Os textos vêm como [pt, en, es]; aqui viram { pt, en, es } para escrever T.x[l].
const tri = x => Array.isArray(x) ? (x.length === 3 && x.every(s => typeof s === 'string') ? { pt: x[0], en: x[1], es: x[2] } : x.map(tri))
  : x && typeof x === 'object' ? Object.fromEntries(Object.entries(x).map(([k, y]) => [k, k === 'itens' ? y : tri(y)])) : x;
const { LANGS, C, nomeProc, imprensa } = K;
const [T, titulos, selos, destaques, grupos, passos, depoimentos, hospitais, vantagens] = [K.T, K.titulos, K.selos, K.destaques, K.grupos, K.passos, K.depoimentos, K.hospitais, K.vantagens].map(tri);

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const DIM = JSON.parse(fs.readFileSync(path.join(aqui, 'dim.json'), 'utf8'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (src, alt, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${DIM[src][0]}" height="${DIM[src][1]}" loading="lazy" decoding="async"${extra}>`;
const ja = ' fetchpriority="high" loading="eager"';
const fora = ' target="_blank" rel="noopener"';
export const nomesVersao = { a: 'Atelier', b: 'Consultório' };
const htmlLang = { pt: 'pt-BR', en: 'en', es: 'es' };
const ogLocale = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' };

const nav = [
  { slug: 'index', t: T.inicio },
  { slug: 'dr-claudio-lemos', t: T.dr },
  { slug: 'procedimentos', t: T.procCurto },
  { slug: 'hospitais', t: T.hosp },
  { slug: 'contato', t: T.contato },
];
const caminho = (l, slug) => `${l === 'pt' ? '' : l + '/'}${slug === 'index' ? '' : slug + '/'}`;
const u = (v, l, slug, ancora = '') => `/${v}/${caminho(l, slug)}${ancora}`;

const I = {
  whats: '<path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4.1-1.1z"/><path d="M9 8.5c0 3.3 2.9 6.5 6.4 6.6l1-1.6-2.1-1-1 .9a5 5 0 01-2.4-2.4l.9-1-1-2.1z"/>',
  tel: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  play: '<path d="M8 5.5v13l11-6.5z"/>',
  pausa: '<path d="M8 5v14M16 5v14"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/>',
  facebook: '<path d="M14 21v-7.5h2.6l.4-3H14V8.7c0-.9.3-1.5 1.6-1.5H17V4.5a19 19 0 00-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.2H8.3v3h2.6V21"/>',
  youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9v6l5-3z"/>',
  linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6v3"/>',
  hospital: '<path d="M4 21V5a1 1 0 011-1h14a1 1 0 011 1v16M2.5 21h19M12 7.5v5M9.5 10h5M9.5 21v-4h5v4"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const fontes = {
  a: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Inter:wght@400;500;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Open+Sans:wght@400;600;700&display=swap',
};
const whats = l => `https://wa.me/${C.whats}?text=${encodeURIComponent(T.whatsMsg[l])}`;

function head(v, l, slug, titulo, descricao) {
  const url = `${C.url}${v}/${caminho(l, slug)}`;
  const alt = LANGS.map(x => `<link rel="alternate" hreflang="${htmlLang[x]}" href="${C.url}${v}/${caminho(x, slug)}">`).join('\n');
  return `<!doctype html>
<html lang="${htmlLang[l]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
${alt}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${C.nome}">
<meta property="og:locale" content="${ogLocale[l]}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${C.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#F0EBD8' : '#2B2B2B'}">
<link rel="icon" href="/assets/favicon.webp" type="image/webp">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontes[v]}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const logo = (cor = '', w = 230) => `<img src="/assets/img/logo${cor}.webp" alt="${C.nome}, ${T.especialidade.pt.toLowerCase()}" width="${w}" height="${Math.round(w * DIM.logo[1] / DIM.logo[0])}">`;
const idiomas = (v, l, slug) => `<nav class="idiomas" aria-label="${T.idioma[l]}">${LANGS.map(x => `<a href="${u(v, x, slug)}" hreflang="${htmlLang[x]}" lang="${htmlLang[x]}"${x === l ? ' aria-current="true"' : ''}>${x.toUpperCase()}</a>`).join('')}</nav>`;

function topo(v, l, slug) {
  const links = nav.slice(1).map(n => `<a href="${u(v, l, n.slug)}"${n.slug === slug ? ' aria-current="page"' : ''}>${n.t[l]}</a>`).join('');
  return `<div class="pre"><div class="in"><span>${ic('pin')} ${C.predio} · ${T.local[l]}</span><span class="pre-cont"><a href="tel:${C.telHref}">${ic('tel')} ${C.tel}</a><a href="${whats(l)}"${fora}>${ic('whats')} ${C.cel}</a>${idiomas(v, l, slug)}</span></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="${u(v, l, 'index')}" aria-label="${C.nome}, ${T.inicio[l]}">${logo(v === 'b' ? '-branco' : '', 230)}</a>
  <nav id="menu" class="menu" aria-label="Menu">${links}<a class="btn btn-peq" href="${whats(l)}"${fora}>${T.agendar[l]}</a></nav>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="${T.abrirMenu[l]}">${ic('menu')}</button>
</div></header>`;
}

const redes = () => `<p class="redes"><a href="${C.instagram}"${fora} aria-label="Instagram">${ic('instagram')}</a><a href="${C.facebook}"${fora} aria-label="Facebook">${ic('facebook')}</a><a href="${C.youtube}"${fora} aria-label="YouTube">${ic('youtube')}</a><a href="${C.linkedin}"${fora} aria-label="LinkedIn">${ic('linkedin')}</a></p>`;

function rodape(v, l) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo('-branco', 240)}<p>${T.contatoBio[l].split('. ')[0]}.</p>${redes()}</div>
  <div><h3>${T.endereco[l]}</h3><p>${C.rua}<br>${C.predio}<br>${C.bairro}, ${C.cidade} · ${C.uf}<br>CEP ${C.cep}</p><p><a class="link" href="${C.mapa}"${fora}>${T.verMapa[l]} ${ic('seta')}</a></p></div>
  <div><h3>${T.contato[l]}</h3><p><a href="tel:${C.telHref}">${ic('tel')} ${C.tel}</a><br><a href="${whats(l)}"${fora}>${ic('whats')} ${C.cel}</a><br><a href="mailto:${C.email}">${ic('mail')} ${C.email}</a></p><p class="hora">${ic('relogio')} ${T.horario[l]}</p></div>
  <nav aria-label="Menu"><h3>Menu</h3>${nav.map(n => `<a href="${u(v, l, n.slug)}">${n.t[l]}</a>`).join('')}</nav>
</div>
<div class="in rod-fim"><p>${T.aviso[l]}</p><p>© ${new Date().getFullYear()} ${C.nome}. ${T.direitos[l]}</p></div></footer>
<a class="whats-flut" href="${whats(l)}"${fora} aria-label="WhatsApp">${ic('whats')}</a>`;
}

const pagina = (v, l, slug, titulo, descricao, corpo) => `${head(v, l, slug, titulo, descricao)}
<body class="v-${v} p-${slug}">
<a class="pular" href="#conteudo">${T.pular[l]}</a>
${topo(v, l, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v, l)}
</body>
</html>
`;

// ---------- blocos ----------
const tit = (sobre, h, p = '', cls = '') => `<div class="tit ${cls}"><p class="eyebrow">${sobre}</p><h2>${h}</h2>${p ? `<p>${p}</p>` : ''}</div>`;
const btnAgendar = (l, cls = '') => `<a class="btn ${cls}" href="${whats(l)}"${fora}>${ic('whats')} ${T.agendar[l]}</a>`;

const video = (l, cls = '') => `<div class="video ${cls}"><video autoplay muted loop playsinline preload="metadata" poster="/assets/img/clinica-poster.webp" aria-label="${esc(T.clinicaP[l])}"><source src="/assets/clinica.mp4" type="video/mp4"></video><button class="video-btn" type="button" aria-label="${T.videoPausa[l]}" data-video>${ic('pausa')}</button></div>`;

const selosBloco = l => `<ul class="selos">${selos.map((s, i) => `<li><span class="selo" style="--i:${i}" role="img" aria-label="${esc(s[l])}"></span></li>`).join('')}</ul>`;
const listaTitulos = l => `<ul class="titulos">${titulos.map(t => `<li>${ic('check')}<span>${t[l]}</span></li>`).join('')}</ul>`;

const profissional = (v, l) => `<section class="sec prof" id="profissional"><div class="in prof-grid">
  <div class="prof-esq">
    <p class="eyebrow">${T.profEyebrow[l]}</p>
    <h2>Dr. Cláudio Lemos</h2>
    <blockquote class="bio"><p>${T.bio[l]}</p></blockquote>
    <figure class="prof-foto">${foto('dr', 'Dr. Cláudio Lemos')}<figcaption>Dr. Cláudio Lemos · ${T.especialidade[l]}</figcaption></figure>
    <img class="assinatura" src="/assets/img/assinatura.webp" alt="" width="${DIM.assinatura[0]}" height="${DIM.assinatura[1]}" loading="lazy">
  </div>
  <div class="prof-dir">
    <h3>${T.titulosT[l]}</h3>
    ${listaTitulos(l)}
    <p class="aval">${T.avaliacoes[l]}</p>
    ${redes()}
    <a class="btn btn-claro" href="${u(v, l, 'dr-claudio-lemos')}">${T.conheca[l]} ${ic('seta')}</a>
  </div>
</div></section>`;

const faixaContato = l => `<section class="faixa"><div class="in faixa-grid">
  <p>${ic('tel')}<span><a href="tel:${C.telHref}">${C.tel}</a><a href="${whats(l)}"${fora}>${C.cel} (WhatsApp)</a></span></p>
  <p>${ic('mail')}<span><a href="mailto:${C.email}">${C.email}</a></span></p>
  <p>${ic('pin')}<span>${C.rua}<br>${C.predio} · ${C.bairro}, ${C.uf}</span></p>
</div></section>`;

const icone = (i, nome) => `<span class="icone" style="--i:${i}" role="img" aria-label="${esc(nome)}"></span>`;
const cirurgias = (v, l) => `<section class="sec cp"><div class="in">
  ${tit(T.cpEyebrow[l], T.cpH[l], T.cpP[l], 'centro')}
  <ul class="cp-grid">${destaques.map((d, i) => `<li><a href="${u(v, l, 'procedimentos', i === 2 ? '#infantil' : '#feminina')}">${icone(i, '')}<span>${d[l]}</span></a></li>`).join('')}</ul>
  <p class="centro"><a class="btn" href="${u(v, l, 'procedimentos')}">${T.verTodos[l]} ${ic('seta')}</a></p>
</div></section>`;

// Foto com os pontos marcados (como o "mulher mapeada" da home atual). Cada ponto mostra o nome ao passar o mouse ou tocar.
const mapaFig = (g, l, idx) => `<figure class="mapa-fig mapa-${g.id}">${foto(g.img, g.titulo[l])}${g.pontos.map((p, i) => `<button type="button" class="ponto" style="--x:${p[0]}%;--y:${p[1]}%;--d:${i * 0.35}s" data-ponto="${idx}-${i}"><span>${nomeProc(p[2], LANGS.indexOf(l))}</span></button>`).join('')}</figure>`;
const mapaLista = (g, l, idx) => `<ul class="mapa-lista">${g.pontos.map((p, i) => `<li data-ponto="${idx}-${i}">${nomeProc(p[2], LANGS.indexOf(l))}</li>`).join('')}</ul>`;

const mapa = (v, l) => `<section class="sec mapa"><div class="in">
  ${tit(T.mapaEyebrow[l], T.mapaH[l], '', 'centro')}
  <div class="abas" data-abas>
    <div class="abas-lista" role="tablist">${grupos.map((g, i) => `<button role="tab" id="t-${g.id}" aria-controls="ab-${g.id}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}">${g.nome[l]}</button>`).join('')}</div>
    ${grupos.map((g, i) => `<div class="aba" role="tabpanel" id="ab-${g.id}" aria-labelledby="t-${g.id}"${i ? ' hidden' : ''}>
      ${mapaFig(g, l, i)}
      <div class="aba-txt"><h3>${g.titulo[l]}</h3>${mapaLista(g, l, i)}<p class="aba-mais">${g.itens.length} ${T.procCurto[l].toLowerCase()} · <a class="link" href="${u(v, l, 'procedimentos', '#' + g.id)}">${T.mapaVer[l]} ${ic('seta')}</a></p></div>
    </div>`).join('')}
  </div>
</div></section>`;

const videos = l => `<section class="sec videos"><div class="in videos-grid">
  <div>${tit('YouTube', T.videosH[l], T.videosP[l])}<a class="btn" href="${C.youtube}"${fora}>${ic('youtube')} ${T.videosBtn[l]}</a></div>
  <a class="video-capa" href="${C.video}"${fora} aria-label="${T.videosH[l]}">${foto('video-jn', T.videosH[l])}<span class="play">${ic('play')}</span></a>
</div></section>`;

const depo = (v, l) => `<section class="sec depo"><div class="in">
  ${tit('“', T.depH[l], '', 'centro')}
  <div class="depo-lista" data-carrossel>${depoimentos.map((d, i) => `<blockquote class="depo-item"${i ? ' hidden' : ''}><p>${d[l]}</p></blockquote>`).join('')}
    <div class="depo-pontos">${depoimentos.map((d, i) => `<button type="button" aria-label="${i + 1}" aria-pressed="${i === 0}"></button>`).join('')}</div>
  </div>
  <p class="aval centro">${'★'.repeat(5)} ${T.avaliacoes[l]}</p>
</div></section>`;

const passoAPasso = l => `<section class="sec passos"><div class="in">
  ${tit(T.passoEyebrow[l], T.passoH[l], '', 'centro')}
  <ol class="fita">${passos.map((p, i) => `<li class="${i === 6 ? 'ouro' : ''}"><b>${String(i + 1).padStart(2, '0')}</b><span>${p[l]}</span></li>`).join('')}</ol>
</div></section>`;

const hospBloco = (v, l, mais = true) => `<section class="sec hosp"><div class="in">
  ${tit(T.hospEyebrow[l], T.hospH[l], T.hospP[l], 'centro')}
  <ul class="hosp-grid">${hospitais.map(h => `<li>${foto(h.img, h.nome)}<div><h3>${h.nome}</h3><p>${h.txt[l]}</p></div></li>`).join('')}</ul>
  ${mais ? `<p class="centro"><a class="link" href="${u(v, l, 'hospitais')}">${T.verHosp[l]} ${ic('seta')}</a></p>` : ''}
</div></section>`;

const opcoesProc = l => [...new Set(destaques.map(d => d[l]))].map(n => `<option>${n}</option>`).join('');
const form = l => `<form class="form" data-form>
  <label><span>${T.fNome[l]}</span><input name="nome" autocomplete="name" required></label>
  <label><span>${T.fEmail[l]}</span><input name="email" type="email" autocomplete="email" required></label>
  <label><span>${T.fTel[l]}</span><input name="tel" type="tel" autocomplete="tel" required></label>
  <label><span>${T.fInteresse[l]}</span><select name="interesse"><option value="">—</option>${opcoesProc(l)}</select></label>
  <label class="larga"><span>${T.fMsg[l]}</span><textarea name="msg" rows="4"></textarea></label>
  <label class="larga caixa"><input type="checkbox" name="whats" checked> <span>${T.fWhats[l]}</span></label>
  <button class="btn larga" type="submit">${T.fEnviar[l]} ${ic('seta')}</button>
  <p class="form-ok larga" hidden role="status">${T.fOk[l]}</p>
</form>`;

const contatos = l => `<ul class="contatos">
  <li>${ic('tel')}<div><h3>${T.telefones[l]}</h3><a href="tel:${C.telHref}">${C.tel}</a><a href="${whats(l)}"${fora}>${C.cel} · WhatsApp</a></div></li>
  <li>${ic('mail')}<div><h3>${T.emails[l]}</h3><a href="mailto:${C.email}">${C.email}</a><a href="mailto:${C.email2}">${C.email2}</a></div></li>
  <li>${ic('pin')}<div><h3>${T.endereco[l]}</h3><span>${C.rua} · ${C.predio}<br>${C.bairro}, ${C.cidade} · CEP ${C.cep}</span><a class="link" href="${C.mapa}"${fora}>${T.verMapa[l]} ${ic('seta')}</a></div></li>
  <li>${ic('relogio')}<div><h3>${T.horarioT[l]}</h3><span>${T.horario[l]}</span></div></li>
</ul>`;

const fale = l => `<section class="sec fale" id="fale"><div class="in fale-grid">
  <figure class="fale-img">${foto('agende', '')}</figure>
  <div>${tit(T.contatoH[l], T.faleH[l], T.faleP[l])}${form(l)}</div>
</div></section>`;

const local = l => `<section class="sec local"><div class="in">
  ${tit(T.localH[l], C.predio, T.localP[l], 'centro')}
  <div class="local-box">${foto('real-medical-center', C.predio)}${contatos(l)}</div>
</div></section>`;

const galeria = (l, cls = '') => `<div class="galeria ${cls}">${['recepcao', 'consulta-tela', 'consulta-desenho', 'fotografia', 'recebe', 'parede-logo'].map(f => `<figure>${foto(f, T.clinicaH[l])}</figure>`).join('')}</div>`;
const citacao = (txt, l) => `<blockquote class="citacao"><p>${txt}</p><footer>Dr. Cláudio Lemos</footer></blockquote>`;

// ---------- páginas ----------
const homeA = (v, l) => `<section class="hero-a">
  ${video(l, 'hero-video')}
  <div class="in hero-txt">
    <p class="eyebrow">${T.heroEyebrow[l]}</p>
    <h1>${T.heroH1[l]}</h1>
    <p class="lead">${T.heroSub[l]}</p>
    <p class="hero-assin">${T.heroAssin[l]}</p>
    <p class="botoes">${btnAgendar(l)}<a class="btn btn-vazado" href="${u(v, l, 'dr-claudio-lemos')}">${T.conheca[l]}</a></p>
  </div>
</section>
<section class="selos-sec"><div class="in">${selosBloco(l)}</div></section>
${profissional(v, l)}
${faixaContato(l)}
${cirurgias(v, l)}
${mapa(v, l)}
${videos(l)}
${depo(v, l)}
${passoAPasso(l)}
${hospBloco(v, l)}
${fale(l)}
${local(l)}`;

const homeB = (v, l) => `<section class="hero-b"><div class="in hero-b-grid">
  <div class="hero-txt">
    <p class="eyebrow">${T.heroEyebrow[l]}</p>
    <h1>${T.heroH1[l]}</h1>
    <p class="lead">${T.heroSub[l]}</p>
    <p class="botoes">${btnAgendar(l)}<a class="btn btn-vazado" href="${u(v, l, 'procedimentos')}">${T.proc[l]}</a></p>
  </div>
  <div class="hero-b-fotos">
    <figure class="hero-retrato">${foto('dr', 'Dr. Cláudio Lemos', ja)}</figure>
    ${video(l, 'hero-janela')}
  </div>
</div></section>
<section class="selos-sec"><div class="in">${selosBloco(l)}</div></section>
${faixaContato(l)}
${profissional(v, l)}
${cirurgias(v, l)}
${mapa(v, l)}
<section class="sec clinica-b"><div class="in">
  ${tit(C.predio, T.clinicaH[l], T.clinicaP[l])}
  ${galeria(l, 'galeria-b')}
  ${citacao(T.planejamento[l], l)}
</div></section>
${passoAPasso(l)}
${depo(v, l)}
${videos(l)}
${hospBloco(v, l)}
${fale(l)}
${local(l)}`;

const capa = (l, eyebrow, h, p, img, extra = '') => `<section class="capa"><div class="in capa-grid"><div>
  <p class="eyebrow">${eyebrow}</p><h1>${h}</h1>${p ? `<p class="lead">${p}</p>` : ''}${extra}
</div>${img ? `<figure>${foto(img, '', ja)}</figure>` : ''}</div></section>`;

const pDr = (v, l) => `${capa(l, T.dr[l], T.drH[l], T.bio[l], 'consulta-tela')}
<section class="sec selos-sec"><div class="in">${selosBloco(l)}</div></section>
<section class="sec dr-forma"><div class="in dr-forma-grid">
  <figure class="prof-foto">${foto('dr', 'Dr. Cláudio Lemos')}<figcaption>Dr. Cláudio Lemos · ${T.especialidade[l]}</figcaption></figure>
  <div>
    ${citacao(T.pitanguy[l], l)}
    <p>${T.tecnologia[l]}</p><p>${T.planejamento[l]}</p><p>${T.acompanha[l]}</p>
    <img class="assinatura" src="/assets/img/assinatura.webp" alt="" width="${DIM.assinatura[0]}" height="${DIM.assinatura[1]}" loading="lazy">
  </div>
</div></section>
<section class="sec dr-titulos"><div class="in duas">
  <div>${tit(T.profEyebrow[l], T.titulosT[l])}${listaTitulos(l)}</div>
  <figure class="dr-diplomas">${foto('diplomas', T.titulosT[l])}</figure>
</div></section>
<section class="sec clinica-b"><div class="in">${tit(C.predio, T.clinicaH[l], T.clinicaP[l])}${galeria(l)}</div></section>
<section class="sec imprensa"><div class="in">${tit('', T.imprensaH[l])}<ul class="imp-lista">${imprensa.map(i => `<li><a href="${i.url}"${fora}><small>${i.veiculo}</small><span>${i.titulo}</span>${ic('seta')}</a></li>`).join('')}</ul></div></section>
${videos(l)}
${faixaContato(l)}`;

const pProc = (v, l) => `${capa(l, T.proc[l], T.procH[l], T.procP[l], '', `<nav class="ancoras" aria-label="${T.proc[l]}">${grupos.map(g => `<a href="#${g.id}">${g.nome[l]}</a>`).join('')}</nav>`)}
<section class="sec cp cp-pag"><div class="in">${tit(T.cpEyebrow[l], T.cpH[l], T.cpP[l], 'centro')}<ul class="cp-grid">${destaques.map((d, i) => `<li><span class="cp-item">${icone(i, '')}<span>${d[l]}</span></span></li>`).join('')}</ul></div></section>
${grupos.map((g, i) => `<section class="sec grupo" id="${g.id}"><div class="in grupo-grid">
  ${mapaFig(g, l, i)}
  <div>
    <p class="eyebrow">${g.nome[l]}</p><h2>${g.titulo[l]}</h2>
    <ul class="proc-lista">${[...g.itens].sort((a, b) => nomeProc(a, LANGS.indexOf(l)).localeCompare(nomeProc(b, LANGS.indexOf(l)), l)).map(n => `<li>${nomeProc(n, LANGS.indexOf(l))}</li>`).join('')}</ul>
    ${btnAgendar(l, 'btn-peq')}
  </div>
</div></section>`).join('\n')}
${passoAPasso(l)}`;

const pHosp = (v, l) => `${capa(l, T.hosp[l], T.hospH[l], T.hospP[l], 'h-copa-star')}
${hospBloco(v, l, false).replace(/<div class="tit[^]*?<\/div>/, '')}
<section class="sec hosp-por"><div class="in duas">
  <div>${tit(T.hosp[l], T.hospPor[l], T.hospPorP[l])}</div>
  <div><h3>${T.vantagensH[l]}</h3><ul class="titulos">${vantagens.map(t => `<li>${ic('check')}<span>${t[l]}</span></li>`).join('')}</ul></div>
</div></section>
${faixaContato(l)}`;

const pContato = (v, l) => `${capa(l, T.contato[l], T.contatoH[l], T.faleP[l], '')}
<section class="sec contato-pag"><div class="in fale-grid">
  <div>${contatos(l)}<p class="contato-bio">${T.contatoBio[l]}</p></div>
  <div class="form-box">${form(l)}</div>
</div></section>
${passoAPasso(l)}
${local(l)}`;

const P = { index: { a: homeA, b: homeB }, 'dr-claudio-lemos': pDr, procedimentos: pProc, hospitais: pHosp, contato: pContato };
const meta = {
  index: [l => `${C.nome} · ${T.especialidade[l]} · ${T.local[l]}`, l => `${T.heroH1[l]} ${T.bio[l].split('. ')[0]}. ${C.tel}.`],
  'dr-claudio-lemos': [l => `${T.dr[l]} · ${T.drH[l]}`, l => T.bio[l]],
  procedimentos: [l => `${T.proc[l]} · ${C.nome}`, l => T.procP[l]],
  hospitais: [l => `${T.hosp[l]} · ${C.nome}`, l => T.hospP[l]],
  contato: [l => `${T.contato[l]} · ${C.nome}`, l => `${C.rua}, ${C.predio}, ${C.bairro}, ${C.cidade}. ${C.tel} · WhatsApp ${C.cel}. ${T.horario[l]}.`],
};

let n = 0;
for (const v of ['a', 'b']) {
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const l of LANGS) for (const p of nav) {
    const dir = path.join(pub, v, caminho(l, p.slug));
    fs.mkdirSync(dir, { recursive: true });
    const corpo = typeof P[p.slug] === 'function' ? P[p.slug](v, l) : P[p.slug][v](v, l);
    fs.writeFileSync(path.join(dir, 'index.html'), pagina(v, l, p.slug, meta[p.slug][0](l), meta[p.slug][1](l), corpo));
    n++;
  }
}
console.log(`claudiolemos: ${n} páginas (A e B, ${LANGS.join('/')})`);

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: C.nome, artigo: 'do', url: C.url, lang: 'pt', cor: '#EF94BA', corTextoBotao: '#1A171B', fundo: '#2B2B2B', claro: '#F0EBD8',
  fonteTitulo: 'Cinzel,Georgia,serif', fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: fontes.a,
  favicon: '/assets/favicon.webp', ogImagem: `${C.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: nav.length, texto: 'Clara, no creme e no rosa do site de hoje. Abre com o vídeo da clínica rodando de verdade (hoje ele aparece como uma tela preta) e segue a ordem da home atual, com os selos dourados, o painel do Dr. Cláudio e o mapa de pontos sobre as fotos.', pontos: ['Mapa de procedimentos com pontos, por perfil: mulheres, homens, crianças, idosos', 'Passo a passo na fita rosa, com o dia da cirurgia em dourado', 'Português, inglês e espanhol, como o seletor de idiomas de hoje'] },
    { letra: 'b', nome: nomesVersao.b, paginas: nav.length, texto: 'O painel creme e grafite da seção "O profissional" do site atual virou o tom do site inteiro. Na capa, o retrato do Dr. Cláudio ao lado do vídeo da clínica numa janela, e os selos dourados sobre o grafite.', pontos: ['Fotos reais da clínica tiradas do vídeo de apresentação', 'Passo a passo em linha do tempo vertical', 'Os mesmos 5 grupos de procedimentos, em abas'] },
  ],
  antigo: { url: C.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('claudiolemos: escolha em public/index.html');
