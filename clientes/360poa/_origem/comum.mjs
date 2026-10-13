// Peças comuns às duas versões: documento com SEO completo, topo, rodapé, formulários e os blocos "vivos"
// (pôr do sol de hoje, aberto agora, arco do dia) que o /assets/360.js preenche no navegador.
import { site, menu, paginas, momentos } from './conteudo.mjs';

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const num = i => String(i + 1).padStart(2, '0');
export const zap = (txt = 'Olá! Vim pelo site do 360 POA e gostaria de fazer uma reserva.') => `https://wa.me/${site.zap}?text=${encodeURIComponent(txt)}`;
export const zapEventos = zap('Olá! Vim pelo site do 360 POA e gostaria de informações sobre eventos.');
export const linkDe = versao => slug => `/${versao}/${slug === 'index' ? '' : slug + '/'}`;
export const foto = (nome, alt, attrs = '', p = false) => `<img src="/assets/img/${nome}${p ? '-p' : ''}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${attrs ? ' ' + attrs : ''}>`;

// Ícones de traço fino, desenhados aqui (sem biblioteca externa).
const I = {
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  zap: '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c.3 2 2.3 4.2 4.5 4.6l1-1 2 .9-.4 1.6c-3.6.4-7.4-3.3-7-7l1.6-.4.9 2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  por: '<path d="M3 18h18M6 18a6 6 0 0 1 12 0"/><path d="M12 8V4M5.6 11.6 4.2 10.2M18.4 11.6l1.4-1.4M8 21h8"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
  face: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  pdf: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 14h8M8 17h5"/>',
  pessoas: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2a5 5 0 0 1 6 4.8"/>',
  copa: '<path d="M7 3h10l-1 7a4 4 0 0 1-8 0zM12 14v6M8 21h8"/>',
  folha: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19 14 10"/>',
};
export const icone = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// Logo vetorizado a partir do logo do site atual.
export const logo = (cor = 'branco', w = 132) => `<img class="logo" src="/assets/logo-${cor}.svg" alt="360 POA Gastrobar" width="${w}" height="${Math.round(w * 0.733)}">`;

// "Hoje o sol se põe às 18:30": calculado no navegador para a posição do restaurante.
export const porDoSolHoje = (cls = '') => `<p class="sol-hoje ${cls}" data-por-do-sol>${icone('por')}<span>Hoje o sol se põe às <b data-hora-sol>--:--</b> no Guaíba</span></p>`;
export const abertoAgora = (cls = '') => `<p class="aberto ${cls}" data-aberto><i></i><span data-aberto-txt>${site.horario}</span></p>`;

// Arco do dia: do almoço (11:00) ao fechamento (22:30), com o sol na hora de agora e o pôr do sol marcado.
export function arcoDoDia(cls = '') {
  return `<div class="arco ${cls}" data-arco data-rev>
  <svg class="arco-svg" viewBox="0 0 1000 320" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    <defs>
      <linearGradient id="arcoG" x1="0" x2="1"><stop offset="0" stop-color="var(--arco-1)"/><stop offset=".62" stop-color="var(--arco-2)"/><stop offset=".8" stop-color="var(--arco-3)"/><stop offset="1" stop-color="var(--arco-4)"/></linearGradient>
    </defs>
    <path class="arco-base" d="M40 300 A460 270 0 0 1 960 300" />
    <path class="arco-cor" d="M40 300 A460 270 0 0 1 960 300" stroke="url(#arcoG)" />
    <line class="arco-chao" x1="0" y1="300" x2="1000" y2="300"/>
    <g class="arco-marca-sol" data-marca-sol><circle r="7"/><text y="-20" text-anchor="middle">pôr do sol</text></g>
    <g class="arco-sol" data-sol-agora><circle class="halo" r="34"/><circle r="15"/></g>
  </svg>
  <ol class="arco-momentos">
    ${momentos.map(([h, t, d], i) => `<li style="--i:${i}"><span class="h"${h === 'sol' ? ' data-hora-sol-curta' : ''}>${h === 'sol' ? '--:--' : h}</span><b>${t}</b><p>${d}</p></li>`).join('')}
  </ol>
</div>`;
}

export function topo({ versao, slug, logoCor = 'branco' }) {
  const L = linkDe(versao);
  const ativo = s => (slug === s ? ' aria-current="page"' : '');
  return `<header class="topo" data-topo>
  <div class="barra-info"><div class="in">
    ${abertoAgora('mini')}
    <span class="bi-dir">${icone('pin')} ${site.endereco}, ${site.bairro}</span>
    <span class="bi-redes">${site.redes.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n}">${icone(n === 'Instagram' ? 'insta' : 'face')}</a>`).join('')}</span>
  </div></div>
  <div class="in topo-in">
    <a class="marca" href="${L('index')}" aria-label="360 POA Gastrobar, página inicial">${logo(logoCor, 96)}</a>
    <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav">${icone('menu')}<span>Menu</span></button>
    <nav id="nav" class="nav">
      ${menu.map(([s, t]) => `<a href="${L(s)}"${ativo(s)}>${t}</a>`).join('')}
      <a class="btn btn-sol nav-cta" href="${L('contato')}#reserva">Reservar mesa</a>
    </nav>
  </div>
</header>`;
}

export function rodape({ versao }) {
  const L = linkDe(versao);
  return `<footer class="rodape">
  <div class="in r-chamada">
    <p class="r-frase">${'Venha apreciar o que temos de melhor!'}</p>
    <div class="r-acoes"><a class="btn btn-sol" href="${zap()}" target="_blank" rel="noopener">${icone('zap')} Reservar pelo WhatsApp</a><a class="btn btn-linha" href="${site.rota}" target="_blank" rel="noopener">${icone('pin')} Como chegar</a></div>
  </div>
  <div class="in r-cols">
    <div class="r-marca">${logo('branco', 150)}<p>Gastronomia contemporânea sulista às margens do Guaíba, no Parque Moacyr Scliar.</p></div>
    <div><h3>Navegue</h3><ul>${menu.map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}</ul></div>
    <div><h3>Visite</h3><ul>
      <li>${site.endereco}<br>${site.bairro}</li>
      <li>${site.horario}</li>
      <li><a href="${site.rota}" target="_blank" rel="noopener">Abrir no mapa</a></li></ul></div>
    <div><h3>Fale com a gente</h3><ul>
      <li><a href="${zap()}" target="_blank" rel="noopener">WhatsApp ${site.fone}</a></li>
      <li><a href="mailto:${site.email}">${site.email}</a></li>
      ${site.redes.map(([n, u, h]) => `<li><a href="${u}" target="_blank" rel="noopener">${n} ${h}</a></li>`).join('')}</ul></div>
  </div>
  <div class="in r-base"><span>© 2026 · 360 POA Gastrobar. Todos os direitos reservados.</span><span>Orla do Guaíba · Porto Alegre</span></div>
</footer>`;
}

// Formulário estático: abre o WhatsApp (ou o e-mail) com a mensagem pronta.
export const formulario = ({ id = '', assunto, campos, rotuloZap = 'Enviar pelo WhatsApp', email = true }) => `<form class="form" ${id ? `id="${id}" ` : ''}data-form data-assunto="${esc(assunto)}">
  ${campos.map(([nome, rotulo, tipo = 'text', obrig = false, cheia = false]) => {
    const cls = cheia || tipo === 'textarea' ? ' class="cheia"' : '';
    const r = obrig ? ' required' : '';
    if (tipo === 'textarea') return `<label${cls}><span>${rotulo}${obrig ? ' *' : ''}</span><textarea name="${nome}" rows="4"${r}></textarea></label>`;
    if (Array.isArray(tipo)) return `<label${cls}><span>${rotulo}</span><select name="${nome}">${tipo.map(o => `<option>${o}</option>`).join('')}</select></label>`;
    return `<label${cls}><span>${rotulo}${obrig ? ' *' : ''}</span><input name="${nome}" type="${tipo}"${r}${tipo === 'number' ? ' min="1" max="250"' : ''}></label>`;
  }).join('\n  ')}
  <div class="form-acoes cheia"><button class="btn btn-sol" type="submit" data-via="zap">${icone('zap')} ${rotuloZap}</button>${email ? `<button class="btn btn-linha" type="submit" data-via="email">${icone('mail')} Enviar por e-mail</button>` : ''}</div>
</form>`;

export const formReserva = () => formulario({
  id: 'form-reserva', assunto: 'Reserva de mesa',
  campos: [['Nome', 'Nome', 'text', true], ['Telefone', 'Telefone', 'tel', true], ['Data', 'Data', 'date', true], ['Horário', 'Horário', ['Almoço', 'Fim de tarde (pôr do sol)', 'Jantar']], ['Pessoas', 'Número de pessoas', 'number', true], ['Ocasião', 'Alguma ocasião especial?', ['Não', 'Aniversário', 'Pedido de casamento', 'Almoço de negócios', 'Outra']], ['Mensagem', 'Observações', 'textarea']],
  rotuloZap: 'Pedir reserva pelo WhatsApp',
});

export const formContato = () => formulario({
  assunto: 'Contato pelo site',
  campos: [['Nome', 'Nome', 'text', true], ['Telefone', 'Telefone', 'tel'], ['Email', 'E-mail', 'email', false, true], ['Mensagem', 'Mensagem', 'textarea', true]],
});

export const formEvento = () => formulario({
  assunto: 'Pedido de orçamento para evento',
  campos: [['Nome', 'Nome', 'text', true], ['Telefone', 'Telefone', 'tel', true], ['Tipo de evento', 'Tipo de evento', ['Aniversário', 'Confraternização', 'Evento corporativo', 'Outro']], ['Data', 'Data desejada', 'date'], ['Convidados', 'Número de convidados', 'number'], ['Mensagem', 'Conte um pouco sobre o evento', 'textarea']],
  rotuloZap: 'Enviar pedido pelo WhatsApp',
});

export const FONTES = 'https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500;600&display=swap';

export function documento({ versao, slug, corpo, tema }) {
  const [titulo, desc] = paginas[slug];
  const url = site.dominio + linkDe(versao)(slug);
  const og = `${site.dominio}/assets/og-${versao}.jpg`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="360 POA Gastrobar">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${og}">
<meta name="theme-color" content="${tema}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTES}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${versao}.css">
</head>
<body class="v-${versao} p-${slug}" data-zap="${site.zap}" data-email="${site.email}" data-lat="${site.lat}" data-lon="${site.lon}">
${corpo}
<a class="zap-flutua" href="${zap()}" target="_blank" rel="noopener" aria-label="Reservar pelo WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.7 8.7 0 0 1-4.3-3.7c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.4 3.4 14.6 14.6 0 0 0 5.6 4.9c2 .9 2.8 1 3.9.8a3.3 3.3 0 0 0 2.1-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.1-.3-.2-.6-.4z"/></svg></a>
<div class="lb" data-lb hidden><button class="lb-x" data-lb-fechar aria-label="Fechar">×</button><button class="lb-ant" data-lb-ant aria-label="Foto anterior">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-prox" data-lb-prox aria-label="Próxima foto">›</button></div>
<script src="/assets/360.js" defer></script>
</body>
</html>
`;
}
