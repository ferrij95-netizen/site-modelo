// Página de escolha "antes de entrar no site": apresenta as versões A e B em molduras de notebook e celular, tela por tela.
// Uso: import { paginaEscolha } from '<raiz>/componentes/apresentacao/escolha.mjs'; fs.writeFileSync('public/index.html', paginaEscolha({...})).
// Prints: public/assets/apresentacao/<v>-pc.webp (página inteira, 1000px de largura) e <v>-cel.webp (página inteira do celular, 600px).
// Precisa de /assets/apresenta.css e /assets/apresenta.js (copiar desta pasta).

const T = {
  en: { prep: 'Website proposal', tit: n => `Your new website, <em>${n}.</em>`, sub: 'Two versions, same content, photos and colors. Scroll through them and pick the one that feels right.', versao: 'Version', abrir: 'Open version', atual: 'Your current website', atualTxt: 'For comparison: this is what visitors see today.', atualBtn: 'Open current site', fimT: 'Which one feels like <em>you?</em>', fimS: 'Both are complete multi-page sites. Tell us your pick and we fine-tune the details with you.', rolar: 'Scroll', paginas: 'pages', telas: { intro: 'Intro', atual: 'Today', fim: 'Your pick' } },
  pt: { prep: 'Proposta de site', tit: (n, a = 'da') => `O novo site ${a} <em>${n}.</em>`, sub: 'Duas versões com o mesmo conteúdo, fotos e cores. Role para ver cada uma e escolha a que mais combina.', versao: 'Versão', abrir: 'Abrir versão', atual: 'Seu site atual', atualTxt: 'Para comparar: é o que os visitantes veem hoje.', atualBtn: 'Abrir site atual', fimT: 'Qual tem mais a <em>sua cara?</em>', fimS: 'As duas são sites completos com várias páginas. Diga qual prefere e ajustamos os detalhes com você.', rolar: 'Rolar', paginas: 'páginas', telas: { intro: 'Início', atual: 'Hoje', fim: 'Escolha' } },
};
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const seta = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const notebook = (src, alt, extra = '') => `<div class="mk mk-notebook" data-rev${extra}><div class="mk-tela"><div class="mk-vis mk-rola" style="--mk-t:26s"><img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async"></div></div><div class="mk-base"></div></div>`;
const celular = (src, alt, extra = '') => `<div class="mk mk-celular" data-rev${extra}><div class="mk-vis mk-rola" style="--mk-t:48s"><img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async"></div></div>`;

/**
 * @param {object} o
 * o.nome, o.url (com / no fim), o.lang ('en'|'pt'), o.cor (destaque), o.fundo (escuro da marca), o.claro (fundo claro),
 * o.fonteTitulo, o.fonteTexto, o.googleFonts (URL do CSS), o.favicon, o.ogImagem,
 * o.versoes: [{ letra:'a', nome, texto, pontos:[...], paginas }], o.antigo: { url, img } (opcional)
 */
export function paginaEscolha(o) {
  const t = T[o.lang] || T.en;
  const [v1, v2] = o.versoes;
  const titulo = `${o.nome} · ${t.prep}`;
  const desc = t.sub;
  const telaVersao = (v, i) => `<section class="es-tela es-versao${i % 2 ? ' es-inv' : ''}" data-slide="${t.versao} ${v.letra.toUpperCase()}"><div class="es-in es-split">
  <div class="es-txt">
    <p class="es-letra" data-rev="zoom">${v.letra.toUpperCase()}</p>
    <p class="es-eyebrow" data-rev>${t.versao} ${v.letra.toUpperCase()}${v.paginas ? ` · ${v.paginas} ${t.paginas}` : ''}</p>
    <h2 data-palavras>${esc(v.nome)}</h2>
    <p class="es-desc" data-rev>${esc(v.texto)}</p>
    ${v.pontos?.length ? `<ul class="es-pontos" data-rev-filhos="" data-rev-passo="110">${v.pontos.map(p => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
    <a class="es-btn" data-rev href="/${v.letra}/">${t.abrir} ${v.letra.toUpperCase()} ${seta}</a>
  </div>
  <div class="es-palco">${notebook(`/assets/apresentacao/${v.letra}-pc.webp`, `${t.versao} ${v.letra.toUpperCase()} on a laptop`)}${celular(`/assets/apresentacao/${v.letra}-cel.webp`, `${t.versao} ${v.letra.toUpperCase()} on a phone`, ' style="--ap-d:450ms"')}</div>
</div></section>`;

  return `<!doctype html>
<html lang="${o.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${o.url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(o.nome)}">
<meta property="og:locale" content="${o.lang === 'pt' ? 'pt_BR' : 'en_US'}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${o.url}">
<meta property="og:image" content="${o.ogImagem}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
${o.favicon ? `<link rel="icon" href="${o.favicon}" type="image/png">\n` : ''}<link rel="stylesheet" href="${o.googleFonts}">
<link rel="stylesheet" href="/assets/apresenta.css">
<style>
:root{--es-cor:${o.cor};--es-fundo:${o.fundo};--es-claro:${o.claro};--ap-cor:${o.cor};--h:${o.fonteTitulo};--b:${o.fonteTexto};--es-btn-txt:${o.corTextoBotao || '#fff'};--es-cel:170px}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:var(--b);color:#fff;background:var(--es-fundo);overflow-x:hidden;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}a{color:inherit}h1,h2{font-family:var(--h);letter-spacing:-.035em;line-height:1.02;margin:0 0 .4em;text-wrap:balance}h1 em,h2 em{font-style:normal;color:var(--es-cor)}
.es-in{max-width:1240px;margin:0 auto;padding:0 32px;width:100%}
.es-tela{padding:104px 0;position:relative;overflow:hidden}
.es-eyebrow{font-family:var(--h);font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--es-cor);margin:0 0 14px}
.es-marca{position:absolute;top:28px;left:0;right:0;z-index:5}.es-marca .es-in{display:flex;justify-content:space-between;align-items:center;font-family:var(--h);font-size:15px}.es-marca b{font-weight:700}.es-marca span{opacity:.6;font-size:13px}
.es-split{display:grid;grid-template-columns:4.4fr 7.6fr;gap:56px;align-items:center}.es-inv .es-split{grid-template-columns:7.6fr 4.4fr}.es-inv .es-txt{order:2}
/* palco: notebook e celular lado a lado, alinhados pela base; o celular só cobre a borda vazia do notebook (--es-sobrepoe) */
.es-palco{--es-sobrepoe:calc((100% - var(--es-cel)) * .087);position:relative;width:100%;display:flex;align-items:flex-end;justify-content:flex-end}
.es-palco .mk-notebook{flex:0 0 calc(100% - var(--es-cel) + var(--es-sobrepoe));min-width:0;--mk-larg:none;max-width:none;order:2}
.es-palco .mk-celular{--mk-larg:var(--es-cel);flex:0 0 var(--es-cel);min-width:0;order:1;margin-right:calc(-1 * var(--es-sobrepoe));z-index:2}
.es-inv .es-palco{justify-content:flex-start}.es-inv .es-palco .mk-notebook{order:1}.es-inv .es-palco .mk-celular{order:2;margin:0 0 0 calc(-1 * var(--es-sobrepoe))}
/* abertura */
.es-intro{background:radial-gradient(900px 600px at 80% 20%,color-mix(in srgb,var(--es-cor) 45%,transparent),transparent 65%),radial-gradient(700px 500px at 0 100%,color-mix(in srgb,var(--es-cor) 20%,transparent),transparent 70%),var(--es-fundo)}
.es-intro h1{font-size:clamp(36px,4.2vw,60px)}.es-intro .es-sub{font-size:clamp(16px,1.35vw,19px);color:rgba(255,255,255,.75);max-width:460px;margin:0 0 28px}
.es-chips{display:flex;gap:10px;flex-wrap:wrap;margin:0}.es-chips a{font-family:var(--h);font-weight:700;font-size:14px;text-decoration:none;border:1.5px solid rgba(255,255,255,.25);border-radius:999px;padding:10px 18px;transition:.2s}.es-chips a:hover{background:#fff;color:var(--es-fundo)}
/* versões */
.es-versao{background:var(--es-claro);color:#2b3235}.es-versao h2{color:#121212;font-size:clamp(34px,4.6vw,64px)}
.es-versao.es-inv{background:linear-gradient(160deg,color-mix(in srgb,var(--es-fundo) 85%,var(--es-cor)),var(--es-fundo));color:rgba(255,255,255,.78)}.es-inv h2{color:#fff}
.es-letra{font-family:var(--h);font-weight:800;font-size:clamp(110px,15vw,200px);line-height:.8;letter-spacing:-.06em;margin:0 0 6px;color:color-mix(in srgb,var(--es-cor) 16%,transparent)}
.es-inv .es-letra{color:color-mix(in srgb,var(--es-cor) 28%,transparent)}
.es-desc{font-size:clamp(16px,1.3vw,19px);max-width:480px}
.es-pontos{list-style:none;padding:0;margin:22px 0 30px;display:grid;gap:10px}.es-pontos li{padding-left:28px;position:relative}.es-pontos li::before{content:'';position:absolute;left:0;top:.45em;width:14px;height:14px;border-radius:4px;background:var(--es-cor)}
.es-btn{display:inline-flex;align-items:center;gap:10px;font-family:var(--h);font-weight:700;font-size:16px;text-decoration:none;background:var(--es-cor);color:var(--es-btn-txt);padding:15px 28px;border-radius:999px;transition:transform .2s,box-shadow .2s;box-shadow:0 14px 30px -12px var(--es-cor)}.es-btn:hover{transform:translateY(-2px)}
/* site atual */
.es-atual{background:#eef1f2;color:#2b3235;text-align:center}.es-atual h2{color:#121212;font-size:clamp(30px,3.6vw,48px)}.es-atual .mk-janela{max-width:820px;margin:36px auto 28px}.es-atual .mk-vis img{object-position:top}
.es-link{font-family:var(--h);font-weight:700;color:#121212;display:inline-flex;gap:8px;align-items:center}
/* fim */
.es-fim{text-align:center;background:radial-gradient(800px 500px at 50% 0,color-mix(in srgb,var(--es-cor) 40%,transparent),transparent 70%),var(--es-fundo)}
.es-fim h2{font-size:clamp(40px,6.4vw,88px)}.es-fim p{color:rgba(255,255,255,.75);max-width:600px;margin:0 auto 40px;font-size:18px}
.es-escolha{display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:880px;margin:0 auto}
.es-escolha a{display:block;text-decoration:none;border-radius:24px;overflow:hidden;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);transition:transform .3s,border-color .3s}.es-escolha a:hover{transform:translateY(-4px);border-color:var(--es-cor)}
.es-escolha img{aspect-ratio:16/10;object-fit:cover;object-position:top;width:100%}.es-escolha span{display:flex;justify-content:space-between;align-items:center;padding:18px 22px;font-family:var(--h);font-weight:700;font-size:18px}
.es-rodape{text-align:center;padding:26px 16px;font-size:13px;color:rgba(255,255,255,.45);background:var(--es-fundo)}
@media(max-width:1000px){
  :root{--es-cel:140px}
  .es-split,.es-inv .es-split{grid-template-columns:1fr;gap:44px}.es-inv .es-txt{order:0}.es-palco{max-width:620px;margin:0 auto}
  .es-split-intro .es-txt{text-align:center}.es-intro .es-sub{margin:0 auto 28px}.es-chips{justify-content:center}.es-letra{font-size:110px}
}
@media(max-width:640px){
  :root{--es-cel:112px}
  .es-in{padding:0 16px}.es-tela{padding:84px 0}.es-intro{padding-top:92px}.es-escolha{grid-template-columns:1fr}.es-marca span{display:none}.es-letra{font-size:92px}
}
</style>
</head>
<body>
<header class="es-marca"><div class="es-in"><b>${esc(o.nome)}</b><span>${t.prep}</span></div></header>
<main>
<section class="es-tela es-intro" data-slide="${t.telas.intro}"><div class="es-in es-split es-split-intro">
  <div class="es-txt">
    <p class="es-eyebrow" data-rev>${t.prep}</p>
    <h1 data-palavras>${t.tit(esc(o.nome), o.artigo)}</h1>
    <p class="es-sub" data-rev style="--ap-d:600ms">${t.sub}</p>
    <nav class="es-chips" data-rev style="--ap-d:750ms">${o.versoes.map(v => `<a href="#${t.versao.toLowerCase()}-${v.letra}">${t.versao} ${v.letra.toUpperCase()} · ${esc(v.nome)}</a>`).join('')}</nav>
  </div>
  <div class="es-palco">${notebook(`/assets/apresentacao/${v1.letra}-pc.webp`, `${t.versao} ${v1.letra.toUpperCase()}`, ' style="--ap-d:300ms"')}${celular(`/assets/apresentacao/${v2.letra}-cel.webp`, `${t.versao} ${v2.letra.toUpperCase()}`, ' style="--ap-d:900ms"')}</div>
</div></section>
${o.versoes.map((v, i) => telaVersao(v, i).replace('<section ', `<section id="${t.versao.toLowerCase()}-${v.letra}" `)).join('\n')}
${o.antigo ? `<section class="es-tela es-atual" data-slide="${t.telas.atual}"><div class="es-in">
  <p class="es-eyebrow" data-rev>${t.atual}</p><h2 data-palavras>${t.atualTxt}</h2>
  <div class="mk mk-janela" data-rev="zoom" data-url="${esc(o.antigo.url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}"><div class="mk-vis${o.antigo.rola ? ' mk-rola' : ''}" style="--mk-t:22s"><img src="${o.antigo.img}" alt="${t.atual}" loading="lazy" decoding="async"></div></div>
  <a class="es-link" href="${o.antigo.url}" target="_blank" rel="noopener">${t.atualBtn} ${seta}</a>
</div></section>` : ''}
<section class="es-tela es-fim" data-slide="${t.telas.fim}"><div class="es-in">
  <h2 data-palavras>${t.fimT}</h2><p data-rev>${t.fimS}</p>
  <div class="es-escolha" data-rev-filhos="" data-rev-passo="150">${o.versoes.map(v => `<a href="/${v.letra}/"><img src="/assets/apresentacao/${v.letra}-pc.webp" alt="" loading="lazy"><span>${t.versao} ${v.letra.toUpperCase()} · ${esc(v.nome)} ${seta}</span></a>`).join('')}</div>
</div></section>
</main>
<footer class="es-rodape">Overtus</footer>
<script src="/assets/apresenta.js" defer></script>
</body>
</html>
`;
}
