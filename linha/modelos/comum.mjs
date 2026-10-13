// Modelos de site da linha. A IA só escreve os textos (JSON); aqui eles viram páginas HTML.
// Duas versões com o mesmo conteúdo: A "Fiel" (estrutura e peso de cor do site atual, refinados) e B "Moderna"
// (fotos grandes, contraste forte). Cada tipo de seção tem mais de um formato e o formato varia pela página,
// para não repetir o mesmo card no site inteiro.

export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const par = t => String(t || '').split(/\n{2,}|\n(?=[-•])/).map(p => p.trim()).filter(Boolean).map(p => `<p>${esc(p)}</p>`).join('');

// ---------- Cores ----------
const hex = h => { const m = String(h || '').replace('#', '').match(/^([0-9a-f]{3}|[0-9a-f]{6})$/i); if (!m) return null; let s = m[1]; if (s.length === 3) s = [...s].map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(s.slice(i, i + 2), 16)); };
const lum = rgb => { const [r, g, b] = rgb.map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const sobre = h => { const c = hex(h); return c && lum(c) > 0.42 ? '#15181d' : '#ffffff'; };
const escurecer = (h, f) => { const c = hex(h); if (!c) return '#1b2433'; return '#' + c.map(v => Math.round(v * f).toString(16).padStart(2, '0')).join(''); };
export function paleta(marca) {
  const cor = hex(marca.cor_principal) ? marca.cor_principal : '#1f4e8c';
  let escura = hex(marca.cor_escura) ? marca.cor_escura : escurecer(cor, 0.45);
  if (lum(hex(escura)) > 0.12) escura = escurecer(escura, 0.5); // fundo escuro precisa ser escuro de verdade
  // Marca já escura (azul-marinho, por ex.): o fundo escuro desce mais um tom para não se confundir com a cor da marca.
  const dist = (x, y) => Math.hypot(...hex(x).map((v, i) => v - hex(y)[i]));
  if (dist(cor, escura) < 45) escura = escurecer(cor, 0.55);
  const destaque = hex(marca.cor_destaque) ? marca.cor_destaque : cor;
  return { cor, escura, destaque, sobreCor: sobre(cor), sobreDestaque: sobre(destaque) };
}

// ---------- Ícones (traço simples, 24x24) ----------
const I = {
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  email: '<path d="M3 6h18v12H3z"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  escudo: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  engrenagem: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  caixa: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  raio: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  grafico: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  pessoas: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0M16 4.5a3.5 3.5 0 0 1 0 7M18 13.5a7 7 0 0 1 4 6.5"/>',
  folha: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15zM5 19l8-8"/>',
  ferramenta: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
  whats: '<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2z"/>',
  mundo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
};
export const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n] || I.check}</svg>`;
const ICONES_CARD = ['escudo', 'engrenagem', 'caixa', 'raio', 'pessoas', 'folha', 'ferramenta', 'grafico'];

// ---------- Textos fixos por idioma ----------
export const UI = {
  pt: { menu: 'Menu', contato: 'Contato', fale: 'Fale conosco', enviar: 'Enviar pelo WhatsApp', enviarEmail: 'Enviar por e-mail', nome: 'Nome', empresa: 'Empresa', fone: 'Telefone', msg: 'Mensagem', endereco: 'Endereço', horario: 'Horário', direitos: 'Todos os direitos reservados.', verMais: 'Saiba mais', inicio: 'Início', preview: 'Proposta de novo site, em avaliação', zap: 'Olá, vim pelo site.' },
  en: { menu: 'Menu', contato: 'Contact', fale: 'Contact us', enviar: 'Send via WhatsApp', enviarEmail: 'Send by e-mail', nome: 'Name', empresa: 'Company', fone: 'Phone', msg: 'Message', endereco: 'Address', horario: 'Hours', direitos: 'All rights reserved.', verMais: 'Learn more', inicio: 'Home', preview: 'New website proposal, under review', zap: 'Hello, I found you on your website.' },
  es: { menu: 'Menú', contato: 'Contacto', fale: 'Contáctenos', enviar: 'Enviar por WhatsApp', enviarEmail: 'Enviar por e-mail', nome: 'Nombre', empresa: 'Empresa', fone: 'Teléfono', msg: 'Mensaje', endereco: 'Dirección', horario: 'Horario', direitos: 'Todos los derechos reservados.', verMais: 'Más información', inicio: 'Inicio', preview: 'Propuesta de nuevo sitio, en evaluación', zap: 'Hola, vengo del sitio web.' },
};
const LOCALE = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' };
const BANDEIRA = { pt: 'PT', en: 'EN', es: 'ES' };

// ---------- Seções ----------
// ctx: { v: 'a'|'b', img: id -> url|null, uso: contador de formatos já usados na página, lingua, dados }
function cabecalhoSecao(s, centro) {
  if (!s.titulo && !s.subtitulo) return '';
  return `<header class="sec-cab${centro ? ' centro' : ''}">${s.subtitulo ? `<span class="sobretitulo">${esc(s.subtitulo)}</span>` : ''}${s.titulo ? `<h2>${esc(s.titulo)}</h2>` : ''}</header>`;
}
const figura = (url, alt, cls = '') => url ? `<figure class="${cls}"><img src="${esc(url)}" alt="${esc(alt)}" loading="lazy" decoding="async"></figure>` : '';

const SECOES = {
  texto(s, ctx, i) {
    const url = ctx.img(s.imagem);
    const lado = i % 2 ? 'inv' : '';
    if (!url) return `<div class="in texto-largo">${cabecalhoSecao(s)}<div class="lead">${par(s.texto)}</div>${itensLista(s.itens)}</div>`;
    return `<div class="in duas ${lado}"><div>${cabecalhoSecao(s)}${par(s.texto)}${itensLista(s.itens)}</div>${figura(url, s.titulo, 'foto-sec')}</div>`;
  },
  cards(s, ctx) {
    const comFoto = s.itens.filter(it => ctx.img(it.imagem)).length >= Math.ceil(s.itens.length / 2);
    // Formatos que se alternam: foto em cima, linha horizontal, número grande, ícone com borda.
    const formatos = comFoto ? ['foto', 'linha'] : ['numero', 'icone'];
    const f = formatos[(ctx.uso[comFoto ? 'foto' : 'sem'] = (ctx.uso[comFoto ? 'foto' : 'sem'] ?? -1) + 1) % 2];
    const cards = s.itens.map((it, k) => {
      const url = ctx.img(it.imagem);
      if (f === 'foto') return `<article class="card c-foto">${url ? figura(url, it.titulo) : '<div class="sem-foto"></div>'}<div><h3>${esc(it.titulo)}</h3>${par(it.texto)}</div></article>`;
      if (f === 'linha') return `<article class="card c-linha">${url ? figura(url, it.titulo) : ''}<div><h3>${esc(it.titulo)}</h3>${par(it.texto)}</div></article>`;
      if (f === 'numero') return `<article class="card c-num"><b>${String(k + 1).padStart(2, '0')}</b><h3>${esc(it.titulo)}</h3>${par(it.texto)}</article>`;
      return `<article class="card c-ico">${ico(ICONES_CARD[k % ICONES_CARD.length])}<h3>${esc(it.titulo)}</h3>${par(it.texto)}</article>`;
    }).join('');
    return `<div class="in">${cabecalhoSecao(s, true)}${s.texto ? `<div class="intro">${par(s.texto)}</div>` : ''}<div class="cards f-${f}" style="--cols:${colunas(s.itens.length)}">${cards}</div></div>`;
  },
  lista(s, ctx) {
    const url = ctx.img(s.imagem);
    return `<div class="in ${url ? 'duas' : ''}"><div>${cabecalhoSecao(s)}${par(s.texto)}<ul class="checks">${s.itens.map(it => `<li>${ico('check')}<div><b>${esc(it.titulo)}</b>${it.texto ? `<span>${esc(it.texto)}</span>` : ''}</div></li>`).join('')}</ul></div>${figura(url, s.titulo, 'foto-sec')}</div>`;
  },
  processo(s) {
    return `<div class="in">${cabecalhoSecao(s, true)}${s.texto ? `<div class="intro">${par(s.texto)}</div>` : ''}<ol class="etapas n${Math.min(s.itens.length, 6)}">${s.itens.map((it, k) => `<li><span class="passo">${String(k + 1).padStart(2, '0')}</span><h3>${esc(it.titulo)}</h3>${it.texto ? `<p>${esc(it.texto)}</p>` : ''}</li>`).join('')}</ol></div>`;
  },
  numeros(s) {
    return `<div class="in">${cabecalhoSecao(s, true)}<div class="numeros">${s.itens.map(it => `<div><b>${esc(it.titulo)}</b><span>${esc(it.texto)}</span></div>`).join('')}</div></div>`;
  },
  galeria(s, ctx) {
    const fotos = s.itens.map(it => ({ url: ctx.img(it.imagem), t: it.titulo })).filter(f => f.url);
    if (!fotos.length) return SECOES.cards(s, ctx);
    return `<div class="in">${cabecalhoSecao(s, true)}<div class="galeria">${fotos.map(f => `<figure><img src="${esc(f.url)}" alt="${esc(f.t)}" loading="lazy">${f.t ? `<figcaption>${esc(f.t)}</figcaption>` : ''}</figure>`).join('')}</div></div>`;
  },
  marcas(s, ctx) {
    return `<div class="in">${cabecalhoSecao(s, true)}<div class="marcas">${s.itens.map(it => { const url = ctx.img(it.imagem); return url ? `<span class="logo-cli"><img src="${esc(url)}" alt="${esc(it.titulo)}" loading="lazy"></span>` : `<span class="nome-cli">${esc(it.titulo)}</span>`; }).join('')}</div></div>`;
  },
  depoimentos(s) {
    return `<div class="in">${cabecalhoSecao(s, true)}<div class="depo">${s.itens.map(it => `<blockquote><p>${esc(it.texto)}</p><cite>${esc(it.titulo)}</cite></blockquote>`).join('')}</div></div>`;
  },
  faq(s) {
    return `<div class="in estreito">${cabecalhoSecao(s, true)}<div class="faq">${s.itens.map(it => `<details><summary>${esc(it.titulo)}</summary>${par(it.texto)}</details>`).join('')}</div></div>`;
  },
  cta(s, ctx) {
    return `<div class="in cta-in"><div>${s.titulo ? `<h2>${esc(s.titulo)}</h2>` : ''}${par(s.texto || s.subtitulo)}</div><div class="cta-botoes">${botoes(ctx)}</div></div>`;
  },
  contato(s, ctx) {
    const d = ctx.dados, u = UI[ctx.lingua];
    const linhas = [
      ...d.contato.telefones.map(t => `<a href="tel:${foneHref(t)}">${ico('fone')}<span>${esc(t)}</span></a>`),
      d.contato.whatsapp ? `<a href="${zapHref(d.contato.whatsapp, u.zap)}" target="_blank" rel="noopener">${ico('whats')}<span>WhatsApp ${esc(fmtZap(d.contato.whatsapp))}</span></a>` : '',
      ...d.contato.emails.map(e => `<a href="mailto:${esc(e)}">${ico('email')}<span>${esc(e)}</span></a>`),
      d.contato.endereco ? `<div>${ico('pin')}<span>${esc(d.contato.endereco)}</span></div>` : '',
      d.contato.horario ? `<div>${ico('relogio')}<span>${esc(d.contato.horario)}</span></div>` : '',
    ].join('');
    const destino = d.contato.whatsapp ? `data-zap="${esc(soDigitos(d.contato.whatsapp))}"` : `data-email="${esc(d.contato.emails[0] || '')}"`;
    const mapa = d.contato.endereco ? `<iframe class="mapa" title="Mapa" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(d.contato.endereco)}&output=embed"></iframe>` : '';
    return `<div class="in contato">
  <div class="contato-info">${cabecalhoSecao(s)}${par(s.texto)}<div class="canais">${linhas}</div></div>
  <form class="form" ${destino}>
    <label>${u.nome}<input name="nome" required></label>
    <label>${u.empresa}<input name="empresa"></label>
    <label>${u.fone}<input name="fone" type="tel"></label>
    <label class="cheio">${u.msg}<textarea name="msg" rows="4" required></textarea></label>
    <button class="botao">${d.contato.whatsapp ? u.enviar : u.enviarEmail}</button>
  </form>
</div>${mapa ? `<div class="in">${mapa}</div>` : ''}`;
  },
};

// Colunas sem sobrar card sozinho na última linha: 5 -> 3+2, 6 -> 3+3, 7 e 8 -> 4.
const colunas = n => (n <= 4 ? n : n === 5 || n === 6 || n === 9 ? 3 : 4);

function itensLista(itens) {
  if (!itens?.length) return '';
  return `<ul class="checks">${itens.map(it => `<li>${ico('check')}<div><b>${esc(it.titulo)}</b>${it.texto ? `<span>${esc(it.texto)}</span>` : ''}</div></li>`).join('')}</ul>`;
}

const soDigitos = t => String(t || '').replace(/\D/g, '');
const foneHref = t => { const d = soDigitos(t); return d.length >= 12 ? '+' + d : d.length >= 10 ? '+55' + d : d; };
const zapNum = t => { const d = soDigitos(t.replace(/.*phone=/, '').replace(/.*wa\.me\//, '')); return d.length <= 11 ? '55' + d : d; };
const zapHref = (t, msg) => `https://wa.me/${zapNum(t)}?text=${encodeURIComponent(msg)}`;
const fmtZap = t => { const d = zapNum(t).slice(2); return d.length === 11 ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}` : d.length === 10 ? `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}` : t; };

function botoes(ctx) {
  const d = ctx.dados, u = UI[ctx.lingua];
  const principal = d.contato.whatsapp ? `<a class="botao" href="${zapHref(d.contato.whatsapp, u.zap)}" target="_blank" rel="noopener">${esc(ctx.site.botao)}</a>` : `<a class="botao" href="${ctx.link('contato')}">${esc(ctx.site.botao)}</a>`;
  const fone = d.contato.telefones[0] ? `<a class="botao vazado" href="tel:${foneHref(d.contato.telefones[0])}">${ico('fone')}${esc(d.contato.telefones[0])}</a>` : '';
  return principal + fone;
}

// Fundo de cada seção: números, processo e chamadas finais em cor forte; o resto alterna claro/tinta.
// Nunca duas seções vizinhas com o mesmo fundo, e a última não pode ter o fundo escuro do rodapé.
function fundos(secoes, v, pesado) {
  const tinta = pesado ? 'f-marca-suave' : 'f-tinta';
  const PREF = {
    numeros: ['f-marca', 'f-escuro'],
    cta: v === 'b' ? ['f-escuro', 'f-marca', tinta] : ['f-marca', 'f-escuro', tinta],
    processo: v === 'b' ? ['f-escuro', tinta, 'f-claro'] : [tinta, 'f-claro'],
  };
  const out = []; let alterna = 0;
  secoes.forEach((s, i) => {
    const ultima = i === secoes.length - 1;
    const ops = PREF[s.tipo] || (alterna++ % 2 ? [tinta, 'f-claro'] : ['f-claro', tinta]);
    const f = ops.find(o => o !== out[i - 1] && !(ultima && o === 'f-escuro')) || 'f-claro';
    out.push(f);
  });
  return out;
}

export function renderSecoes(secoes, ctx) {
  const f = fundos(secoes, ctx.v, ctx.pesado);
  return secoes.map((s, i) => {
    s.itens = s.itens || [];
    const r = SECOES[s.tipo] || SECOES.texto;
    return `<section class="sec t-${s.tipo} ${f[i]}">${r(s, ctx, i)}</section>`;
  }).join('\n');
}

// ---------- Página inteira ----------
export function documento({ ctx, pagina, corpo, css }) {
  const { dados, site, lingua, v } = ctx;
  const u = UI[lingua];
  const pal = ctx.paleta;
  const fonte = dados.marca.fonte_titulo || 'Montserrat';
  const fam = f => f.replace(/ /g, '+') + ':wght@500;600;700;800';
  const titulo = pagina.titulo_seo || `${pagina.menu} · ${dados.empresa.nome}`;
  const url = ctx.urlAbs(pagina.slug, lingua);
  const og = ctx.ogImagem;
  const alternos = ctx.linguas.length > 1 ? ctx.linguas.map(l => `<link rel="alternate" hreflang="${l === 'pt' ? 'pt-BR' : l}" href="${ctx.urlAbs(pagina.slug, l)}">`).join('\n') : '';
  return `<!doctype html>
<html lang="${lingua === 'pt' ? 'pt-BR' : lingua}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(pagina.descricao_seo || site.slogan)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
${alternos}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(dados.empresa.nome)}">
<meta property="og:locale" content="${LOCALE[lingua]}">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(pagina.descricao_seo || site.slogan)}">
<meta property="og:url" content="${url}">
${og ? `<meta property="og:image" content="${og}">\n<meta name="twitter:card" content="summary_large_image">` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${fam(fonte)}&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<style>:root{--cor:${pal.cor};--escura:${pal.escura};--destaque:${pal.destaque};--sobre-cor:${pal.sobreCor};--sobre-destaque:${pal.sobreDestaque};--fh:'${fonte}',system-ui,sans-serif}</style>
</head>
<body class="v-${v}${ctx.pesado ? ' pesado' : ''}">
${ctx.topo(pagina)}
<main>
${corpo}
</main>
${ctx.rodape()}
${dados.contato.whatsapp ? `<a class="zap-flutuante" href="${zapHref(dados.contato.whatsapp, u.zap)}" target="_blank" rel="noopener" aria-label="WhatsApp">${ico('whats')}</a>` : ''}
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

export function seletorLingua(ctx, slug) {
  if (ctx.linguas.length < 2) return '';
  return `<div class="linguas">${ctx.linguas.map(l => `<a href="${ctx.linkLingua(slug, l)}" hreflang="${l}"${l === ctx.lingua ? ' aria-current="true"' : ''}>${BANDEIRA[l]}</a>`).join('')}</div>`;
}

export function logoTag(ctx, cls = 'logo') {
  return ctx.logo ? `<img class="${cls}" src="${esc(ctx.logo)}" alt="${esc(ctx.dados.empresa.nome)}">` : `<span class="${cls} logo-texto">${esc(ctx.dados.empresa.nome_curto || ctx.dados.empresa.nome)}</span>`;
}

export function rodapePadrao(ctx) {
  const { dados, lingua } = ctx, u = UI[lingua];
  const ano = new Date().getFullYear();
  return `<footer class="rodape">
  <div class="in">
    <div class="r-marca"><span class="logo-caixa">${logoTag(ctx)}</span><p>${esc(ctx.site.rodape || dados.empresa.descricao_curta)}</p></div>
    <nav class="r-menu">${ctx.site.paginas.map(p => `<a href="${ctx.link(p.slug)}">${esc(p.menu)}</a>`).join('')}</nav>
    <div class="r-contato">
      ${dados.contato.telefones.map(t => `<a href="tel:${foneHref(t)}">${ico('fone')}${esc(t)}</a>`).join('')}
      ${dados.contato.whatsapp ? `<a href="${zapHref(dados.contato.whatsapp, u.zap)}" target="_blank" rel="noopener">${ico('whats')}WhatsApp</a>` : ''}
      ${dados.contato.emails.map(e => `<a href="mailto:${esc(e)}">${ico('email')}${esc(e)}</a>`).join('')}
      ${dados.contato.endereco ? `<span>${ico('pin')}${esc(dados.contato.endereco)}</span>` : ''}
    </div>
  </div>
  <div class="in r-base"><span>© ${ano} ${esc(dados.empresa.nome)}. ${u.direitos}</span><span>${u.preview}</span></div>
</footer>`;
}

export { botoes, zapHref, foneHref };
