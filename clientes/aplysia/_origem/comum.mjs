// Peças comuns às duas versões: textos de interface, documento com SEO, topo, rodapé, mapa, ícones e formulário.
import fs from 'node:fs';
import path from 'node:path';
import { site, segmentos, areas, noticias, paises } from './conteudo.mjs';

export const AQUI = path.dirname(new URL(import.meta.url).pathname);
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const num = i => String(i + 1).padStart(2, '0');

// Texto bilíngue: [pt, en] -> o idioma pedido.
export const T = (v, lang) => (Array.isArray(v) ? v[lang === 'en' ? 1 : 0] : v);

// Textos de interface.
export const U = {
  empresa: ['Empresa', 'The Company'], quem: ['Quem somos', 'About us'], premios: ['Prêmios e reconhecimentos', 'Awards and acknowledgments'],
  casos: ['Casos de sucesso', 'Success cases'], servicos: ['Serviços', 'Services'], porSeg: ['Por segmento', 'Per segment'], porArea: ['Por área', 'Per area'],
  clientes: ['Clientes', 'Customers'], contato: ['Contato', 'Contact'], noticias: ['Notícias', 'News'], fale: ['Fale conosco', 'Contact us'],
  trabalhe: ['Trabalhe conosco', 'Job opportunities'], fornecedor: ['Seja um fornecedor', 'Become a vendor'], inicio: ['Início', 'Home'],
  conhecaServ: ['Conheça nossos serviços', 'See our services'], verTodos: ['Ver todos os serviços', 'See all services'], saibaMais: ['Saiba mais', 'Learn more'],
  nossosServ: ['Nossos serviços', 'Our services'], conhecaPor: ['Conheça nossos serviços por', 'See our services by'], segmento: ['Segmento', 'Segment'], area: ['Área', 'Area'],
  querSaber: ['Quer saber mais detalhes sobre os nossos serviços? Estamos sempre à disposição para atendê-lo.', 'Want more details about our services? We are always available to help.'],
  cliqueContato: ['Clique e entre em contato', 'Click to get in touch'], certificacao: ['Certificação', 'Certification'],
  ultimas: ['Últimas notícias', 'Latest news'], lerNoticia: ['Ler a notícia', 'Read the article'], todasNoticias: ['Todas as notícias', 'All news'],
  privacidade: ['Política de privacidade', 'Privacy policy'], direitos: ['Todos os direitos reservados', 'All rights reserved'],
  idioma: ['Idioma', 'Language'], menu: ['Menu', 'Menu'], abrirMapa: ['Ver no mapa', 'View on map'], whatsapp: ['Falar pelo WhatsApp', 'Chat on WhatsApp'],
  desde: ['desde', 'since'], estados: ['estados brasileiros', 'Brazilian states'], premiosN: ['prêmios e reconhecimentos', 'awards and acknowledgments'],
  lab17025: ['laboratório acreditado ISO/IEC 17025', 'ISO/IEC 17025 accredited laboratory'], anosLab: ['anos de laboratório', 'years of laboratory'],
  galeria: ['Galeria', 'Gallery'], videos: ['Vídeos', 'Videos'], outrosServ: ['Outros serviços', 'Other services'], verCaso: ['Ver o caso', 'View case'],
  zapMsg: ['Olá! Vim pelo site da APLYSIA e gostaria de falar sobre um projeto ambiental.', 'Hello! I found the APLYSIA website and would like to discuss an environmental project.'],
};

// Endereços: /a/ (pt) e /a/en/ (en); slugs iguais nos dois idiomas.
export const linkDe = (versao, lang) => slug => `/${versao}/${lang === 'en' ? 'en/' : ''}${slug === 'index' ? '' : slug + '/'}`;
export const zap = lang => `https://wa.me/${site.zap}?text=${encodeURIComponent(T(U.zapMsg, lang))}`;
export const img = (nome, alt, attrs = '') => `<img src="/assets/img/${nome}.webp" alt="${esc(alt)}"${attrs.includes('loading=') ? '' : ' loading="lazy"'} decoding="async"${attrs ? ' ' + attrs : ''}>`;

export const segLink = s => `servicos/${s.slug}`;
export const areaLink = a => `servicos/${a.slug}`;

// Ícones de traço simples, desenhados para o site (mesma espessura em todos).
const ICONES = {
  doc: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
  onda: '<path d="M2 9c3 0 3-3 6-3s3 3 6 3 3-3 6-3 2 1 2 1"/><path d="M2 15c3 0 3-3 6-3s3 3 6 3 3-3 6-3 2 1 2 1"/><path d="M2 21c3 0 3-3 6-3s3 3 6 3 3-3 6-3 2 1 2 1"/>',
  gota: '<path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/><path d="M9 15a3 3 0 0 0 3 3"/>',
  lab: '<path d="M9 3h6M10 3v6L4.5 19A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.5-2L14 9V3"/><path d="M7 15h10"/>',
  rio: '<path d="M4 4c4 3 0 6 4 9s0 7 4 8"/><path d="M12 4c4 3 0 6 4 9s0 7 4 8"/>',
  mapa: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  local: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12 4.5 4.5L19 7"/>',
  play: '<path d="M8 5v14l11-7z"/>',
  premio: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
  zap: '<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2z"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
};
export const icone = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[n]}</svg>`;

const REDES_SVG = {
  Facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z" fill="currentColor"/>',
  Instagram: '<rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="16.8" cy="7.2" r="1.1" fill="currentColor"/>',
  LinkedIn: '<path d="M5 9h3v10H5zM6.5 4.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM10 9h3v1.5c.6-1 1.8-1.8 3.3-1.8 3 0 3.7 2 3.7 4.6V19h-3v-5c0-1.3-.3-2.4-1.7-2.4S13 12.7 13 14v5h-3z" fill="currentColor"/>',
  YouTube: '<path d="M21 8.2a2.6 2.6 0 0 0-1.8-1.9C17.6 6 12 6 12 6s-5.6 0-7.2.3A2.6 2.6 0 0 0 3 8.2 27 27 0 0 0 2.7 12c0 1.3.1 2.6.3 3.8a2.6 2.6 0 0 0 1.8 1.9C6.4 18 12 18 12 18s5.6 0 7.2-.3a2.6 2.6 0 0 0 1.8-1.9c.2-1.2.3-2.5.3-3.8s-.1-2.6-.3-3.8zM10.2 14.6V9.4l4.6 2.6z" fill="currentColor"/>',
};
export const redes = (cls = 'redes') => `<ul class="${cls}">${site.redes.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener" aria-label="${n}"><svg viewBox="0 0 24 24" aria-hidden="true">${REDES_SVG[n]}</svg></a></li>`).join('')}</ul>`;

// Bandeiras (o site atual troca de idioma com bandeiras do Brasil e do Reino Unido).
const BANDEIRA = {
  pt: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" fill="#009b3a"/><path d="M14 2.5 25.5 10 14 17.5 2.5 10z" fill="#fedf00"/><circle cx="14" cy="10" r="4.4" fill="#002776"/><path d="M9.8 9.2c2.8-.5 5.8 0 8.3 1.4" stroke="#fff" stroke-width=".9" fill="none"/></svg>',
  en: '<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" fill="#012169"/><path d="M0 0l28 20M28 0 0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l28 20M28 0 0 20" stroke="#c8102e" stroke-width="1.6"/><path d="M14 0v20M0 10h28" stroke="#fff" stroke-width="6"/><path d="M14 0v20M0 10h28" stroke="#c8102e" stroke-width="3.4"/></svg>',
};
export const idiomas = (versao, slug, lang) => `<div class="idiomas" role="group" aria-label="${T(U.idioma, lang)}">
  <a href="${linkDe(versao, 'pt')(slug)}" hreflang="pt-BR" lang="pt-BR"${lang === 'pt' ? ' aria-current="true"' : ''}>${BANDEIRA.pt}<span>Português</span></a>
  <a href="${linkDe(versao, 'en')(slug)}" hreflang="en" lang="en"${lang === 'en' ? ' aria-current="true"' : ''}>${BANDEIRA.en}<span>English</span></a>
</div>`;

// Menu principal, igual ao do site atual: Empresa, Serviços, Clientes, Contato, Notícias.
export function menu(versao, slug, lang) {
  const L = linkDe(versao, lang);
  const ativo = s => (slug === s || slug.startsWith(s + '/') ? ' aria-current="page"' : '');
  const empresaAtiva = ['empresa', 'premios', 'casos-de-sucesso'].includes(slug) ? ' aria-current="page"' : '';
  return `<ul class="menu">
  <li class="tem-sub"><a href="${L('empresa')}"${empresaAtiva}>${T(U.empresa, lang)}</a>
    <div class="sub"><a href="${L('empresa')}">${T(U.quem, lang)}</a><a href="${L('premios')}">${T(U.premios, lang)}</a><a href="${L('casos-de-sucesso')}">${T(U.casos, lang)}</a></div></li>
  <li class="tem-sub mega"><a href="${L('servicos')}"${ativo('servicos')}>${T(U.servicos, lang)}</a>
    <div class="sub"><div><b>${T(U.porSeg, lang)}</b>${segmentos.map(s => `<a href="${L(segLink(s))}"><i style="background:${s.cor}"></i>${T(s.nome, lang)}</a>`).join('')}</div>
      <div><b>${T(U.porArea, lang)}</b>${areas.map(a => `<a href="${L(areaLink(a))}">${T(a.nome, lang)}</a>`).join('')}</div></div></li>
  <li><a href="${L('clientes')}"${ativo('clientes')}>${T(U.clientes, lang)}</a></li>
  <li class="tem-sub"><a href="${L('contato')}"${ativo('contato')}>${T(U.contato, lang)}</a>
    <div class="sub"><a href="${L('contato')}#fale">${T(U.fale, lang)}</a><a href="${L('contato')}#trabalhe">${T(U.trabalhe, lang)}</a><a href="${L('contato')}#fornecedor">${T(U.fornecedor, lang)}</a></div></li>
  <li><a href="${L('noticias')}"${ativo('noticias')}>${T(U.noticias, lang)}</a></li>
</ul>`;
}

export function topo({ versao, slug, lang, logo = 'logo-cor' }) {
  const L = linkDe(versao, lang);
  return `<header class="topo">
  <div class="faixa-topo"><div class="in">${idiomas(versao, slug, lang)}<div class="topo-fones">${site.fones.map(([f, h]) => `<a href="tel:+${h}">${icone('fone')}${f}</a>`).join('')}</div>${redes()}</div></div>
  <div class="in barra">
    <a class="marca" href="${L('index')}" aria-label="APLYSIA, ${T(U.inicio, lang).toLowerCase()}">${img(logo, 'APLYSIA Soluções Ambientais', (logo === 'logo-branco' ? 'width="140" height="110"' : 'width="169" height="134"') + ' loading="eager"')}</a>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav-${versao}"><span></span><span></span><span></span><em>${T(U.menu, lang)}</em></button>
    <nav id="nav-${versao}" class="nav">${menu(versao, slug, lang)}<a class="btn btn-cta" href="${L('contato')}">${T(U.fale, lang)}</a></nav>
  </div>
</header>`;
}

export function rodape({ versao, slug, lang }) {
  const L = linkDe(versao, lang);
  return `<footer class="rodape">
  <div class="in r-grade">
    <div class="r-marca">${img('logo-branco', 'APLYSIA Soluções Ambientais', 'width="140" height="110"')}
      <p>${T(['Soluções ambientais para a indústria desde 1997. Vitória e Serra, Espírito Santo.', 'Environmental solutions for industry since 1997. Vitória and Serra, Espírito Santo, Brazil.'], lang)}</p>
      ${redes()}</div>
    <div class="r-cert"><h3>${T(U.certificacao, lang)}</h3><div class="selo">${img('certificado', 'ABNT NBR ISO/IEC 17025, CRL 0420', 'width="73" height="120"')}</div><p>${T(['Ensaios acreditados ABNT NBR ISO/IEC 17025 · CRL 0420', 'Tests accredited to ABNT NBR ISO/IEC 17025 · CRL 0420'], lang)}</p></div>
    <div><h3>${T(U.empresa, lang)}</h3><ul>
      <li><a href="${L('empresa')}">${T(U.quem, lang)}</a></li><li><a href="${L('premios')}">${T(U.premios, lang)}</a></li><li><a href="${L('casos-de-sucesso')}">${T(U.casos, lang)}</a></li>
      <li><a href="${L('servicos')}">${T(U.servicos, lang)}</a></li><li><a href="${L('clientes')}">${T(U.clientes, lang)}</a></li><li><a href="${L('noticias')}">${T(U.noticias, lang)}</a></li></ul></div>
    <div><h3>${T(U.contato, lang)}</h3><ul class="r-cont">${site.unidades.map(u => `<li><b>${T(u.nome, lang)}</b><a href="tel:+${u.fone[1]}">${u.fone[0]}</a><a href="mailto:${u.email}">${u.email}</a></li>`).join('')}
      <li><a class="r-zap" href="${zap(lang)}" target="_blank" rel="noopener">${icone('zap')}WhatsApp (27) 99839-4839</a></li></ul></div>
    <div class="r-news"><h3>${T(U.ultimas, lang)}</h3><ul>${noticias.slice(0, 3).map(n => `<li><a href="${n[4]}" target="_blank" rel="noopener">${T(n[1], lang)}</a></li>`).join('')}</ul></div>
  </div>
  <div class="in r-base"><span>© ${new Date().getFullYear()} ${site.razao} · ${T(U.direitos, lang)}</span><a href="https://www.aplysia.com.br/pt/politica-privacidade/" target="_blank" rel="noopener">${T(U.privacidade, lang)}</a></div>
</footer>
<a class="zap-flutuante" href="${zap(lang)}" target="_blank" rel="noopener" aria-label="${T(U.whatsapp, lang)}">${icone('zap')}</a>`;
}

// Mapa de pontos do site atual, redesenhado em vetor (pontos, pinos e nomes dos países como texto, para traduzir).
const mapa = JSON.parse(fs.readFileSync(path.join(AQUI, 'mapa.json'), 'utf8'));
const ROTULO = { 'Finlândia': [0, -16, 'middle'], 'Canadá': [-14, -10, 'end'], 'Inglaterra': [-12, -12, 'end'], 'Espanha': [-14, -6, 'end'], 'EUA': [-16, 14, 'end'], 'Itália': [14, 18, 'start'], 'Brasil': [14, 6, 'start'], 'Argentina': [-14, 4, 'end'], 'Austrália': [-16, 20, 'end'], 'Chile': [-14, 6, 'end'] };
export function mapaSvg(lang, cls = 'mapa') {
  const pts = mapa.dots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6"/>`).join('');
  const pinos = Object.entries(mapa.pins).map(([nome, [x, y]], i) => {
    const [dx, dy, ancora] = ROTULO[nome];
    return `<g class="pino" style="--i:${i}"><circle class="halo" cx="${x}" cy="${y}" r="11"/><circle class="ponto" cx="${x}" cy="${y}" r="6"/><text x="${x + dx}" y="${y + dy}" text-anchor="${ancora}">${lang === 'en' ? paises[nome] : nome}</text></g>`;
  }).join('');
  return `<svg class="${cls}" viewBox="-40 -24 740 336" role="img" aria-label="${T(['Mapa com os países onde a APLYSIA atua', 'Map of the countries where APLYSIA works'], lang)}"><g class="pontos">${pts}</g>${pinos}</svg>`;
}

export const formContato = lang => `<form class="form" data-form>
  <label><span>${T(['Nome', 'Name'], lang)} *</span><input name="nome" required autocomplete="name"></label>
  <label><span>${T(['Empresa', 'Company'], lang)}</span><input name="empresa" autocomplete="organization"></label>
  <label><span>E-mail *</span><input name="email" type="email" required autocomplete="email"></label>
  <label><span>${T(['Telefone', 'Phone'], lang)}</span><input name="telefone" type="tel" autocomplete="tel"></label>
  <label class="cheia"><span>${T(['Assunto', 'Subject'], lang)} *</span><select name="assunto" required>
    ${[['Soluções ambientais', 'Environmental solutions'], ['Ensaios no laboratório de ecotoxicologia', 'Ecotoxicology laboratory tests'], ['Licenciamento ambiental', 'Environmental licensing'], ['Restauro fluvial (ReNaturalize)', 'River restoration (ReNaturalize)'], ['Outro assunto', 'Other subject']].map(o => `<option>${T(o, lang)}</option>`).join('')}
  </select></label>
  <label class="cheia"><span>${T(['Mensagem', 'Message'], lang)} *</span><textarea name="mensagem" rows="5" required></textarea></label>
  <label class="cheia aceite"><input type="checkbox" required><span>${T(['Aceito o envio dos meus dados pessoais em conformidade com a Lei nº 13.709 (Lei Geral de Proteção de Dados Pessoais, LGPD).', 'I agree to the processing of my personal data in accordance with Brazilian Law 13.709 (General Data Protection Law, LGPD).'], lang)}</span></label>
  <div class="form-acoes cheia"><button class="btn btn-prim" type="submit" data-via="email">${T(['Enviar por e-mail', 'Send by email'], lang)}</button><button class="btn btn-sec" type="submit" data-via="zap">${T(['Enviar pelo WhatsApp', 'Send via WhatsApp'], lang)}</button></div>
</form>`;

export const FONTES = 'https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap';

export function documento({ versao, slug, lang, titulo, desc, corpo, tema }) {
  const L = linkDe(versao, lang);
  const url = site.dominio + L(slug);
  const og = `${site.dominio}/assets/og-${versao}.jpg`;
  const t = esc(slug === 'index' ? titulo : `${titulo} · APLYSIA`);
  return `<!doctype html>
<html lang="${lang === 'en' ? 'en' : 'pt-BR'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="pt-BR" href="${site.dominio + linkDe(versao, 'pt')(slug)}">
<link rel="alternate" hreflang="en" href="${site.dominio + linkDe(versao, 'en')(slug)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="APLYSIA Soluções Ambientais">
<meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'pt_BR'}">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${og}">
<meta name="theme-color" content="${tema}">
<link rel="icon" href="/assets/img/emblema.webp" type="image/webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTES}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${versao}.css">
</head>
<body class="v-${versao} p-${slug.split('/').pop()}" data-email="${site.unidades[0].email}" data-zap="${site.zap}" data-lang="${lang}">
${corpo}
<script src="/assets/aplysia.js" defer></script>
</body>
</html>
`;
}
