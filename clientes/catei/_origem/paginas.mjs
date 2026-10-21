// Monta as páginas das versões A ("Fachada": o branco e o azul do galpão, os serviços como portas de doca numeradas)
// e B ("Cadeia do frio": preto e dourado do selo de 56 anos, a carga descendo a régua de temperatura, antes e hoje).
// Estilos em public/assets/{base,a,b}.css.
import { empresa as E, textos as T, numeros, vantagens, servicos, fases, clientes } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const TAM = {
  'galpao-frente': [2000, 1362], 'galpao-lateral': [1030, 612], 'doca-frimesa': [709, 532], 'camara-paletes': [709, 532],
  antecamara: [955, 657], 'historia-frigorifico': [1257, 912], 'historia-perdigao': [1239, 869], 'sede-perdigao': [852, 549], 'selo-56-anos': [1400, 415],
};
const foto = (src, alt, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${TAM[src][0]}" height="${TAM[src][1]}" loading="lazy" decoding="async"${extra}>`;
const eager = ' fetchpriority="high" loading="eager"';

export const nomesVersao = { a: 'Fachada', b: 'Cadeia do frio' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'historia', nome: 'História', caminho: 'historia/' },
  { slug: 'quem-somos', nome: 'Quem Somos', caminho: 'quem-somos/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  floco: '<path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11M9 4l3 3 3-3M9 20l3-3 3 3"/>',
  termo: '<path d="M14 14.8V5a2 2 0 10-4 0v9.8a4 4 0 104 0z"/><path d="M12 9v8"/>',
  camin: '<path d="M2 7h11v9H2zM13 10h4l3 3v3h-7z"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  palete: '<rect x="4" y="4" width="16" height="10" rx="1"/><path d="M3 17h18M5 17v3M12 17v3M19 17v3"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  setas: '<path d="M4 8h13M13 4l4 4-4 4M20 16H7M11 12l-4 4 4 4"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const icVant = { localizacao: 'pin', espaco: 'camin', pacotes: 'setas', temperatura: 'termo', tomadas: 'floco', mao: 'palete', estoque: 'check' };

// ---------- moldura ----------
function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${E.nomeLongo}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#1F6690' : '#141414'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Russo+One&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const link = (v, n, atual) => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`;
const logo = (w = 240) => `<img src="/assets/logo.webp" alt="Catei" width="${w}" height="${Math.round(w * 132 / 481)}">`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, atual) {
  if (v === 'a') return `<div class="faixa-info"><div class="in"><span>${E.linha}</span><span class="fi-dir"><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></span></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="Catei, início">${logo(210)}</a>
  <nav id="menu" class="menu" aria-label="Principal">${nav.map(n => link(v, n, atual)).join('')}<a class="menu-cta" href="/a/contato/">Pedir orçamento</a></nav>
  ${menuBtn}
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="Catei, início">${logo(180)}</a>
  <nav id="menu" class="menu" aria-label="Principal">${nav.map(n => link(v, n, atual)).join('')}</nav>
  <a class="topo-tel" href="tel:${E.foneHref}">${ic('tel')} <span>${E.fone}</span></a>
  ${menuBtn}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(220)}<p>${E.linha}</p></div>
  <div><h3>${E.unidade}</h3><p>${E.razao}<br>${E.endereco}<br>${E.cidade}</p></div>
  <div><h3>Fale com a Catei</h3><p><a href="tel:${E.foneHref}">${E.fone}</a><br><a href="mailto:${E.email}">${E.email}</a><br>${E.horario}</p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${nav.map(n => link(v, n, '')).join('')}</nav>
</div><p class="rod-fim">© ${new Date().getFullYear()} ${E.razao} · Armazém & Frigorífico · ${E.cidade}</p></footer>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo) => `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${sl}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, sl)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// ---------- blocos comuns ----------
const tec = `<img class="tec-logo" src="/assets/img/tecnologistica.png" alt="Revista Tecnologística" width="225" height="51" loading="lazy">`;
const logosClientes = cls => `<ul class="${cls}">${clientes.map(c => `<li><img src="/assets/clientes/${c.arq}.png" alt="${esc(c.nome)}" width="${c.w}" height="${c.h}" loading="lazy"></li>`).join('')}</ul>`;
const mapa = `<iframe class="mapa" title="Mapa: ${E.endereco}, ${E.cidade}" src="${E.mapa}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
const contatoLinhas = `<ul class="contato-linhas">
  <li>${ic('pin')}<span><b>${E.unidade}</b>${E.endereco} · ${E.cidade}<a class="link" href="${E.rota}" target="_blank" rel="noopener">Como chegar ${ic('seta')}</a></span></li>
  <li>${ic('tel')}<span><b>Telefone</b><a href="tel:${E.foneHref}">${E.fone}</a></span></li>
  <li>${ic('mail')}<span><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></span></li>
  <li>${ic('relogio')}<span><b>Horário de funcionamento</b>${E.horario}</span></li>
</ul>`;
const form = `<form class="form" data-form>
  <div class="campos">
    <label>Seu nome (obrigatório)<input name="Nome" autocomplete="name" required></label>
    <label>Seu e-mail (obrigatório)<input name="E-mail" type="email" autocomplete="email" required></label>
    <label>Telefone<input name="Telefone" type="tel" autocomplete="tel"></label>
    <label>Assunto<select name="Assunto"><option>Orçamento de armazenagem</option><option>Congelamento</option><option>Picking, embalagem ou paletização</option><option>Cross docking e transferência</option><option>Outros assuntos</option></select></label>
    <label class="largo">Sua mensagem<textarea name="Mensagem" rows="5" required placeholder="Tipo de produto, volume aproximado e por quanto tempo"></textarea></label>
  </div>
  <button class="btn" type="submit">Enviar mensagem ${ic('seta')}</button>
  <p class="form-ok" role="status" hidden>Mensagem pronta. Nesta prévia o envio está desligado; no site no ar ela chega direto em ${E.email}. Enquanto isso, ligue <a href="tel:${E.foneHref}">${E.fone}</a>.</p>
</form>`;

// ---------- versão A: Fachada ----------
const porta = (s, i, v, comTexto = false) => `<a class="doca" href="/${v}/servicos/#${s.id}">
  <span class="doca-num">${String(i + 1).padStart(2, '0')}</span>
  <span class="doca-porta" aria-hidden="true"></span>
  <span class="doca-txt"><b>${s.titulo}</b><small>${s.curto}</small>${comTexto ? `<span class="doca-mais">${s.texto}</span>` : ''}</span>
</a>`;

const ctaA = () => `<section class="cta"><div class="in">
  <div><p class="eyebrow">Faça-nos uma visita</p><h2>Conheça toda a nossa infraestrutura.</h2><p>${T.visita[1]} ${T.visita[2]}</p></div>
  <div class="cta-acoes"><a class="cta-fone" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a class="btn btn-branco" href="/a/contato/">Pedir orçamento ${ic('seta')}</a></div>
</div></section>`;

const capaA = (sobre, titulo, sub, img, alt) => `<section class="capa"><div class="capa-foto">${foto(img, alt, eager)}</div><div class="in"><p class="eyebrow">${sobre}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div><div class="faixa-azul" aria-hidden="true"></div></section>`;

const homeA = () => `<section class="hero">
  <div class="hero-foto">${foto('galpao-frente', 'Galpão azul e branco da Catei com o nome pintado na fachada', eager)}</div>
  <div class="in hero-in">
    <div class="hero-txt">
      <p class="eyebrow">Armazém & Frigorífico · Curitiba</p>
      <h1>Seu produto frio, guardado como saiu da origem.</h1>
      <p>A Catei S.A. oferece a melhor opção para armazenagem de suas mercadorias, garantindo as características originais do produto.</p>
      <div class="acoes"><a class="btn" href="/a/servicos/">Ver os serviços ${ic('seta')}</a><a class="btn btn-contorno" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div>
    </div>
  </div>
  <div class="faixa-azul" aria-hidden="true"></div>
</section>

<section class="numeros"><div class="in">${numeros.map(x => `<p><b>${x.n}<small>${x.u}</small></b><span>${x.t}</span></p>`).join('')}</div></section>

<section class="reconhece"><div class="in">
  <div class="rec-logo">${tec}<span>Reconhecimento a nível nacional</span></div>
  <blockquote><p>${T.reconhecimento.replace('Tecnologística', '<em>Tecnologística</em>')}</p></blockquote>
  <a class="link" href="/a/quem-somos/">Veja mais ${ic('seta')}</a>
</div></section>

<section class="sec-docas"><div class="in">
  <div class="tit-linha"><div><p class="eyebrow">Serviços</p><h2>Oito docas, uma para cada necessidade da sua carga.</h2></div><a class="link" href="/a/servicos/">Clique aqui e conheça mais ${ic('seta')}</a></div>
  <div class="docas">${servicos.map((s, i) => porta(s, i, 'a')).join('')}</div>
</div></section>

<section class="vant"><div class="in vant-grade">
  <figure class="vant-foto">${foto('galpao-lateral', 'Lateral do galpão da Catei, com a faixa azul na base')}<figcaption>${T.adequa}</figcaption></figure>
  <div><p class="eyebrow">Armazene com a Catei</p><h2>Vantagens</h2>
    <ul class="vant-lista">${vantagens.map(x => `<li>${ic(icVant[x.id])}<div><h3>${x.titulo}</h3><p>${x.texto}</p></div></li>`).join('')}</ul></div>
</div></section>

<section class="clientes-a"><div class="in"><h2>Conheça alguns de nossos clientes</h2>${logosClientes('logos')}</div></section>

<section class="local"><div class="in local-grade">
  <div><p class="eyebrow">Localização</p><h2>${T.localTitulo}</h2><p>${T.matriz}</p><p>${T.atende}</p>${contatoLinhas}</div>
  ${mapa}
</div></section>
${ctaA()}`;

const historiaA = () => `${capaA('História', T.historiaTit, '', 'historia-frigorifico', 'Foto antiga em preto e branco do prédio da Catei S.A. Frigorífico')}
<section class="hist-a"><div class="in">
  <figure class="selo-56">${foto('selo-56-anos', 'Selo Catei 56 anos')}</figure>
  <p class="hist-lead">${T.historia}</p>
  <ol class="hist-linha">
    <li><figure>${foto('historia-frigorifico', 'Prédio antigo com a inscrição Catei S.A. Frigorífico e Inspeção Federal')}</figure><div><span class="hist-n">Os primeiros anos</span><h2>Catei S.A. Frigorífico</h2><p>O prédio original, com o nome pintado na fachada e o selo de Inspeção Federal na porta.</p></div></li>
    <li><figure>${foto('historia-perdigao', 'Carreta frigorífica Perdigão em frente ao escritório da Catei, foto antiga')}</figure><div><span class="hist-n">Pioneira</span><h2>Logística do frio</h2><p>Reconhecida pela revista Tecnologística como pioneira no mercado brasileiro de operadores logísticos frigorificados.</p></div></li>
    <li><figure>${foto('galpao-frente', 'O galpão azul e branco da Catei hoje')}</figure><div><span class="hist-n">Hoje</span><h2>7.600 m³ refrigerados</h2><p>O galpão azul e branco no Bacacheri, com câmaras a até -25 °C, dois túneis de congelamento e 22.500 m² de pátio.</p></div></li>
  </ol>
</div></section>
${ctaA()}`;

const quemA = () => `${capaA('Quem somos', 'Mais de 60 anos guardando o frio de Curitiba', '', 'galpao-lateral', 'Galpão da Catei visto de lado')}
<section class="quem-a"><div class="in quem-grade">
  <div class="quem-txt"><p class="quem-lead">${T.quemSomos}</p><h2>Matriz – Bacacheri</h2><p>${T.matriz}</p><p>${T.atende}</p></div>
  <ul class="pilares">${T.pilares.map((p, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${p}</li>`).join('')}</ul>
</div></section>
<section class="numeros"><div class="in">${numeros.map(x => `<p><b>${x.n}<small>${x.u}</small></b><span>${x.t}</span></p>`).join('')}</div></section>
<section class="vant vant-q"><div class="in"><p class="eyebrow">Por que a Catei</p><h2>Vantagens</h2>
  <ul class="vant-colunas">${vantagens.map(x => `<li>${ic(icVant[x.id])}<h3>${x.titulo}</h3><p>${x.texto}</p></li>`).join('')}</ul></div></section>
<section class="reconhece"><div class="in"><div class="rec-logo">${tec}<span>Reconhecimento a nível nacional</span></div><blockquote><p>${T.reconhecimento.replace('Tecnologística', '<em>Tecnologística</em>')}</p></blockquote></div></section>
${ctaA()}`;

const servicosA = () => `${capaA('Serviços', 'Tudo o que sua carga fria precisa, num só endereço', T.adequa, 'camara-paletes', 'Câmara fria com caixas sobre paletes')}
<section class="serv-a"><div class="in">
  ${servicos.map((s, i) => `<article class="serv" id="${s.id}">
    <span class="serv-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
    <div><h2>${s.titulo}</h2><p class="serv-curto">${s.curto}${s.temp ? ` · <b>${s.temp}</b>` : ''}</p><p>${s.texto}</p></div>
  </article>`).join('')}
</div></section>
<section class="fotos-serv"><div class="in">
  <figure>${foto('doca-frimesa', 'Carreta frigorífica encostada na doca da Catei')}<figcaption>Docas para carretas frigoríficas</figcaption></figure>
  <figure>${foto('antecamara', 'Antecâmara refrigerada')}<figcaption>Antecâmara refrigerada</figcaption></figure>
  <figure>${foto('camara-paletes', 'Câmara fria com paletes')}<figcaption>Câmaras individuais e coletivas</figcaption></figure>
</div></section>
${ctaA()}`;

const contatoA = () => `${capaA('Contato', 'Fale com a Catei', 'Conte o tipo de produto e o volume: adequaremos seu orçamento aos nossos serviços.', 'doca-frimesa', 'Carreta na doca da Catei')}
<section class="contato"><div class="in contato-grade">
  <div>${contatoLinhas}${mapa}</div>
  <div class="contato-form"><h2>Envie sua mensagem</h2>${form}</div>
</div></section>`;

// ---------- versão B: Cadeia do frio ----------
const regua = (compacta = false) => `<div class="regua${compacta ? ' regua-compacta' : ''}" data-regua>
  <div class="regua-fotos" aria-hidden="true">${fases.map((f, i) => `<figure${i === 0 ? ' class="on"' : ''}>${foto(f.foto, f.alt)}</figure>`).join('')}</div>
  <ol class="regua-lista">${fases.map((f, i) => {
    const lista = servicos.filter(s => s.fase === f.id);
    return `<li data-passo="${i}">
      <span class="regua-temp">${f.temp}</span>
      <span class="regua-n">${f.n}</span>
      <h3>${f.titulo}</h3>
      <figure class="regua-foto-cel">${foto(f.foto, f.alt)}</figure>
      <ul>${lista.map(s => `<li><a href="/b/servicos/#${s.id}"><b>${s.titulo}</b>${compacta ? `<span>${s.curto}</span>` : `<span>${s.texto}</span>`}</a></li>`).join('')}</ul>
    </li>`;
  }).join('')}</ol>
</div>`;

const antesHoje = () => `<div class="antes-hoje" data-compara style="--pos:50%">
  ${foto('historia-frigorifico', 'Prédio antigo da Catei S.A. Frigorífico, em preto e branco')}
  <div class="ah-hoje">${foto('galpao-frente', 'Galpão da Catei hoje')}</div>
  <span class="ah-rot ah-rot-e">Antes</span><span class="ah-rot ah-rot-d">Hoje</span>
  <span class="ah-linha" aria-hidden="true"></span>
  <input type="range" min="0" max="100" value="50" aria-label="Comparar a foto antiga com a de hoje">
</div>`;

const ctaB = () => `<section class="cta-b"><div class="in">
  <div class="cta-b-moldura">
    <p class="eyebrow">${T.visita[0]}</p>
    <h2>${T.visita[1]}</h2>
    <p>${T.visita[2]}</p>
    <div class="acoes"><a class="btn" href="/b/contato/">Pedir orçamento ${ic('seta')}</a><a class="btn btn-contorno" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div>
  </div>
</div></section>`;

const capaB = (sobre, titulo, sub) => `<section class="capa-b"><div class="in"><p class="eyebrow">${sobre}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

const homeB = () => `<section class="hero-b"><div class="in hero-b-grade">
  <div class="hero-b-txt">
    <p class="eyebrow">Catei S/A · Armazém & Frigorífico</p>
    <h1>Do caminhão à câmara a <span class="gelo">-25 °C</span>, sem perder o frio no caminho.</h1>
    <p>Armazenagem em câmaras a até -25 °C, congelamento, picking e cross docking no Bacacheri, região central de Curitiba. ${T.atende}</p>
    <div class="acoes"><a class="btn" href="/b/servicos/">Como a carga passa pela Catei ${ic('seta')}</a><a class="btn btn-contorno" href="/b/contato/">Pedir orçamento</a></div>
  </div>
  <figure class="hero-b-foto">${foto('galpao-frente', 'Galpão da Catei com o nome na fachada', eager)}<figcaption>${E.unidade}</figcaption></figure>
</div>
<div class="hero-b-num"><ul class="in"><li>${numeros.map(x => `<b>${x.n} ${x.u}</b> ${x.t}`).join('</li><li>')}</li></ul></div>
</section>

<section class="sec-regua"><div class="in">
  <div class="tit-b"><p class="eyebrow">Serviços</p><h2>O caminho da sua carga, grau a grau.</h2><p>${T.adequa}</p></div>
  ${regua(true)}
</div></section>

<section class="rec-b"><div class="in rec-b-grade">
  <div class="rec-b-logo">${tec}</div>
  <blockquote><p>“${T.reconhecimento}”</p><cite>Reconhecimento a nível nacional</cite></blockquote>
</div></section>

<section class="hist-b"><div class="in hist-b-grade">
  <div><p class="eyebrow">História</p><h2>${T.historiaTit}</h2><p>${T.historia}</p><a class="link" href="/b/historia/">Conheça nossa história ${ic('seta')}</a></div>
  ${antesHoje()}
</div></section>

<section class="vant-b"><div class="in">
  <div class="tit-b"><p class="eyebrow">Armazene com a Catei</p><h2>Vantagens</h2></div>
  <dl class="vant-tabela">${vantagens.map(x => `<div><dt>${ic(icVant[x.id])}${x.titulo}</dt><dd>${x.texto}</dd></div>`).join('')}</dl>
</div></section>

<section class="clientes-b"><div class="in"><p class="eyebrow">Conheça alguns de nossos clientes</p>${logosClientes('logos logos-b')}</div></section>

<section class="local-b"><div class="in local-grade">
  ${mapa}
  <div><p class="eyebrow">Localização</p><h2>${T.localTitulo}</h2><p>${T.matriz}</p>${contatoLinhas}</div>
</div></section>
${ctaB()}`;

const historiaB = () => `${capaB('História', T.historiaTit, T.historia)}
<section class="hist-b hist-b-pag"><div class="in">
  ${antesHoje()}
  <p class="ah-dica">Arraste a linha para comparar o prédio antigo com o galpão de hoje.</p>
</div></section>
<section class="selo-b"><div class="in selo-b-grade">
  <figure>${foto('selo-56-anos', 'Selo comemorativo Catei 56 anos')}</figure>
  <div><h2>Um selo para quem fez a história</h2><p>O selo dos 56 anos foi uma homenagem aos funcionários, clientes, parceiros e fornecedores: sem eles, a Catei não teria chegado até aqui.</p></div>
</div></section>
<section class="album"><div class="in">
  <figure class="album-g">${foto('historia-perdigao', 'Carreta frigorífica Perdigão em frente ao escritório da Catei, foto antiga')}<figcaption>Carretas frigoríficas na porta do escritório antigo.</figcaption></figure>
  <figure>${foto('sede-perdigao', 'Sede da Catei com carreta frigorífica ao fundo')}<figcaption>A sede, com as faixas vermelhas da marca.</figcaption></figure>
  <figure>${foto('galpao-lateral', 'Galpão azul e branco da Catei')}<figcaption>O galpão de hoje, no Bacacheri.</figcaption></figure>
</div></section>
${ctaB()}`;

const quemB = () => `${capaB('Quem somos', 'A melhor opção para armazenar suas mercadorias', '')}
<section class="quem-b"><div class="in quem-b-grade">
  <p class="quem-b-lead">${T.quemSomos}</p>
  <div><h2>Matriz – Bacacheri</h2><p>${T.matriz}</p><p>${T.atende}</p></div>
</div></section>
<section class="pilares-b"><div class="in"><ol>${T.pilares.map(p => `<li>${p}</li>`).join('')}</ol></div></section>
<section class="vant-b"><div class="in">
  <div class="tit-b"><p class="eyebrow">Vantagens</p><h2>O que a Catei coloca à disposição da sua carga</h2></div>
  <dl class="vant-tabela">${vantagens.map(x => `<div><dt>${ic(icVant[x.id])}${x.titulo}</dt><dd>${x.texto}</dd></div>`).join('')}</dl>
</div></section>
<section class="rec-b"><div class="in rec-b-grade"><div class="rec-b-logo">${tec}</div><blockquote><p>“${T.reconhecimento}”</p><cite>Reconhecimento a nível nacional</cite></blockquote></div></section>
${ctaB()}`;

const servicosB = () => `${capaB('Serviços', 'Oito serviços, na ordem em que a sua carga passa por eles', T.adequa)}
<section class="sec-regua"><div class="in">${regua(false)}</div></section>
<section class="serv-b"><div class="in">
  <h2>Todos os serviços</h2>
  <div class="serv-b-lista">${servicos.map(s => `<article id="${s.id}"><h3>${s.titulo}</h3>${s.temp ? `<p class="serv-b-temp">${ic('termo')} ${s.temp}</p>` : ''}<p>${s.texto}</p></article>`).join('')}</div>
</div></section>
${ctaB()}`;

const contatoB = () => `${capaB('Contato', 'Fale com a Catei', 'Conte o tipo de produto e o volume: adequaremos seu orçamento aos nossos serviços.')}
<section class="contato contato-b"><div class="in contato-grade">
  <div class="contato-form"><h2>Envie sua mensagem</h2>${form}</div>
  <div>${contatoLinhas}${mapa}</div>
</div></section>`;

export function gerarVersao(v) {
  const t = (x) => `${x} · ${E.nomeLongo}`;
  const P = v === 'a'
    ? { index: homeA, historia: historiaA, 'quem-somos': quemA, servicos: servicosA, contato: contatoA }
    : { index: homeB, historia: historiaB, 'quem-somos': quemB, servicos: servicosB, contato: contatoB };
  const meta = {
    index: [`${E.nomeLongo} · Curitiba`, 'Armazenagem frigorificada, congelamento, picking, paletização e cross docking no Bacacheri, Curitiba. Câmaras a até -25 °C.'],
    historia: [t('História'), T.historia],
    'quem-somos': [t('Quem Somos'), T.quemSomos],
    servicos: [t('Serviços'), 'Armazenagem, recuperação de frio, congelamento, picking, embalagem, paletização, cross docking e transferência.'],
    contato: [t('Contato'), `${E.fone} · ${E.email} · ${E.endereco}, ${E.cidade}`],
  };
  const out = {};
  for (const n of nav) out[n.slug] = pagina(v, n.slug, n.caminho, meta[n.slug][0], meta[n.slug][1], P[n.slug]());
  return out;
}
