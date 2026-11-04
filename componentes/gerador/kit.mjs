// Peças comuns dos geradores de site (clientes/<c>/_origem/gerar.mjs).
// Só encanamento: escrever páginas, ícones, página de escolha, prints e o site.js genérico.
// O visual (HTML de cada seção e CSS) continua sendo de cada cliente.
import fs from 'node:fs';
import path from 'node:path';

export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const soNum = t => String(t).replace(/\D/g, '');
export const telHref = t => `tel:+55${soNum(t)}`;
export const waHref = (num, msg = '') => `https://wa.me/${num}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fechar: '<path d="M6 6l12 12M18 6L6 18"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  painel: '<path d="M3 18l3-12h12l3 12z"/><path d="M4.5 12h15M9 6l-1.5 12M15 6l1.5 12"/>',
  gota: '<path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z"/>',
  chama: '<path d="M12 3c1 3 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z"/>',
  casa: '<path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1z"/>',
  fabrica: '<path d="M3 21V10l6 4V10l6 4V5h4l2 16z"/>',
  piscina: '<path d="M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M2 21c2 0 2-1.5 4-1.5S8 21 10 21s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M8 15V5a2 2 0 014 0M14 15V5a2 2 0 014 0M8 9h6M8 12h6"/>',
  chuveiro: '<path d="M4 20V8a5 5 0 0110 0"/><path d="M10 8h8l-1 3h-6z"/><path d="M12 14v1M15 14v2M18 14v1M13.5 17v1M16.5 17v1"/>',
  chave: '<path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.4 2.4-2.6-.6-.6-2.6z"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
  face: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8a0 0 0 010 0z"/>',
  yt: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z" fill="currentColor"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 10v7"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
  livro: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5M8 7h7"/>',
  capelo: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6"/>',
  caminhao: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  engrenagem: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  dente: '<path d="M7 3c-2 0-4 2-4 5 0 4 2 6 3 10 .5 2 2 3 2.5 0l1-4c.3-1 2.7-1 3 0l1 4c.5 3 2 2 2.5 0 1-4 3-6 3-10 0-3-2-5-4-5-2 0-3 1-5 1S9 3 7 3z"/>',
  estrela: '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
  usuarios: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 016 5"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  trator: '<circle cx="7" cy="16" r="4"/><circle cx="18" cy="17" r="3"/><path d="M7 12V6h6l2 5h4v4M11 6v6"/>',
  pacote: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  empilhadeira: '<path d="M4 18V8h6l3 6v4"/><circle cx="6.5" cy="18.5" r="1.5"/><circle cx="12" cy="18.5" r="1.5"/><path d="M16 4v14h5M16 14h5"/>',
  coracao: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 018-3 4.5 4.5 0 018 3c0 6-8 11-8 11z"/>',
};
export const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n] || ''}</svg>`;
export const icWa = (cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 11.9 11.9 0 004.6 4c1.7.7 2.3.8 3.2.7a2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>`;

// <head> padrão. o = { E (empresa: nome, url), v, slug, titulo, descricao, fontes (url google), css: [..], cor, lang }
export function cabeca(o) {
  const url = `${o.E.url}${o.v}/${o.slug === 'index' ? '' : `${o.slug}/`}`;
  return `<!doctype html>
<html lang="${o.lang || 'pt-BR'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.titulo)}</title>
<meta name="description" content="${esc(o.descricao)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(o.E.nome)}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(o.titulo)}">
<meta property="og:description" content="${esc(o.descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${o.E.url}assets/og-${o.v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${o.cor}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${o.fontes}">
${(o.css || []).map(c => `<link rel="stylesheet" href="/assets/${c}">`).join('\n')}
<script src="/assets/site.js" defer></script>
</head>
<body class="v-${o.v} pg-${o.slug}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
`;
}

export const link = (v, slug) => `/${v}/${slug === 'index' ? '' : `${slug}/`}`;
export const menuItens = (v, nav, ativo) => nav.map(n => `<li><a href="${link(v, n.slug)}"${ativo === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('');

// Grava public/<v>/<slug>/index.html
export function escreverVersao(pub, v, paginas) {
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`versão ${v.toUpperCase()}: ${Object.keys(paginas).length} páginas`);
}

const raiz = path.join(path.dirname(new URL(import.meta.url).pathname), '../..');

// site.js genérico: menu do celular, caixa de fotos, formulários que abrem o WhatsApp, carrossel simples e entrada suave.
export function copiarSiteJs(pub, whatsapp) {
  const js = fs.readFileSync(path.join(raiz, 'componentes/gerador/site.js'), 'utf8').replace('__WA__', whatsapp || '');
  fs.writeFileSync(path.join(pub, 'assets/site.js'), js);
  fs.copyFileSync(path.join(raiz, 'componentes/gerador/base.css'), path.join(pub, 'assets/base.css'));
}

// Página de escolha (componentes/apresentacao). Só grava se os prints existirem.
export async function escolha(pub, opcoes) {
  const kit = path.join(raiz, 'componentes/apresentacao');
  for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
  if (!fs.existsSync(path.join(pub, 'assets/apresentacao/a-pc.webp'))) { console.log('sem prints ainda: rode prints.mjs e gere de novo'); return; }
  const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
  fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha(opcoes));
  console.log('escolha em public/index.html');
}
