// Gera as duas versões do site da Bertolini do Brasil em public/a/ e public/b/.
// Textos e produtos copiados de bertolinipumps.com.br (lidos em 2026-10-15). Rodar: node clientes/bertolini/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';

const raiz = new URL('../public/', import.meta.url).pathname;
const dados = JSON.parse(fs.readFileSync(new URL('./produtos.json', import.meta.url), 'utf8'));
const ORIG = 'https://bertolinipumps.com.br/produtos/';

const C = {
  tel1: '(19) 2534-2255', tel1h: '+551925342255',
  tel2: '(11) 98746-3494', tel2h: '+5511987463494',
  whats: '5519982904243',
  email: 'bertolini@bertolinipumps.com.br',
  end1: 'R. Benjamin Constant, 2831 · Paulista', end2: 'Piracicaba · SP · 13401-210',
  mapa: 'https://www.google.com/maps/search/?api=1&query=R.+Benjamin+Constant,+2831+-+Paulista,+Piracicaba+-+SP',
  face: 'https://www.facebook.com/BertoliniBrasil', linkedin: 'https://www.linkedin.com/company/bertolini-do-brasil',
  global: 'https://bertolinipumps.com/',
  catAgr: 'https://bertolinipumps.com.br/catalogo_agricoltura_bertolinipumps.pdf',
  catInd: 'https://bertolinipumps.com.br/catalogo_sezione-industria_bertolinipumps.pdf',
};

// Famílias de produto como aparecem no menu do site atual (só as que têm página com produtos).
const FAM = {
  agricola_a1: { nome: 'Bombas de membrana', slug: 'bombas-de-membrana' },
  agricola_b2: { nome: 'Bombas de pistão · Série CX', slug: 'bombas-de-pistao' },
  agricola_c1: { nome: 'Acoplamento com motor elétrico 12 V', slug: 'motor-12v' },
  agricola_d1: { nome: 'Reguladores de pressão', slug: 'reguladores' },
  agricola_e1: { nome: 'Grupos de comando · alta pressão', slug: 'comando-alta' },
  agricola_e2: { nome: 'Grupos de comando · baixa pressão', slug: 'comando-baixa' },
  agricola_f2: { nome: 'Controlador de vazão', slug: 'controlador-de-vazao' },
  industria_a1: { nome: 'Bombas de limpeza', slug: 'bombas-de-limpeza' },
  industria_a2: { nome: 'Bombas de limpeza · Série INOX', slug: 'serie-inox' },
  industria_a3: { nome: 'Bombas de limpeza pesada', slug: 'limpeza-pesada' },
};
const linhas = {
  agricola: { nome: 'Agrícola', titulo: 'Linha agrícola', resumo: 'Bombas de membrana e de pistão, acoplamentos, reguladores de pressão, grupos de comando e controladores de vazão para pulverização.', cat: C.catAgr },
  industria: { nome: 'Indústria', titulo: 'Linha indústria', resumo: 'Bombas de alta pressão para limpeza, série inox e limpeza pesada, de 90 a 1000 bar, para lavagem, processos industriais e jato d’água.', cat: C.catInd },
};
for (const l of Object.keys(linhas)) {
  linhas[l].fams = dados.filter(f => f.id.startsWith(l) && FAM[f.id] && f.grupos.some(g => g.modelos.length)).map(f => ({ ...f, ...FAM[f.id] }));
  linhas[l].total = linhas[l].fams.reduce((n, f) => n + f.grupos.reduce((m, g) => m + g.modelos.length, 0), 0);
}
const img = m => `/assets/img/p/${m.img.replace(/\//g, '_').replace(/\.\w+$/, '')}.webp`;
const limpa = s => s.replace(/\s+/g, ' ').trim();

const APLIC = ['Serviços de limpeza geral', 'Agricultura', 'Manutenção de equipamentos pesados', 'Auto serviço de lavagem', 'Limpeza de superfícies', 'Processos industriais', 'Limpeza de fossas', 'Lavagem automática', 'Indústria alimentícia', 'Preparação de superfícies para pintura', 'Limpeza de tanques', 'Túnel de lavagem', 'Sistemas de combate a incêndio', 'Sistemas de irrigação', 'Tecnologia de jato d’água', 'Aviões e navios', 'Limpeza residencial externa', 'Manutenção automotiva'];

const POSTS = [
  { slug: 'agrishow-2026', t: 'Agrishow 2026', d: '27/05/2026', img: 'post_3a6ea49aa2962a5e51eb7135e326ee8f', cat: 'Eventos', r: 'Bertolini na Agrishow, levando décadas de experiência, confiança e tecnologia.', txt: ['A Bertolini esteve presente por mais uma vez na Agrishow, levando décadas de experiência, confiança e tecnologia para quem faz o campo acontecer.', 'Soluções que atravessam gerações. Presença que reforça nossa história no agro.'] },
  { slug: 'show-rural-coopavel-2026', t: 'Show Rural Coopavel 2026', d: '05/02/2026', img: 'post_c210c78909be0fddb7fb58e27cfa73a6', cat: 'Eventos', r: 'A Bertolini do Brasil marca presença na 39ª edição do evento.', txt: ['Entre os dias 01 a 05 de fevereiro de 2026, com foco em inovação tecnológica e sustentabilidade.', 'O Show Rural Coopavel é o primeiro grande evento do ano. Confira algumas imagens da nossa participação.'] },
  { slug: 'agrishow-2025', t: 'Agrishow 2025', d: '28/04/2025', img: 'post_2730c69abea3601aae3cfa62f3282716', cat: 'Eventos', r: 'De 28 de abril a 2 de maio de 2025, estaremos na 30ª edição da Agrishow.', txt: ['Agrishow 2025 foi um show de resultados! Encerramos a feira com parcerias estratégicas firmadas, recorde de vendas e muitas novas oportunidades para levar mais tecnologia ao campo.', 'Obrigado a cada cliente, produtor e parceiro que passou pelo nosso estande e acreditou na força da Bertolini. Juntos vamos impulsionar ainda mais o agronegócio brasileiro.'] },
  { slug: 'expodireto-cotrijal-2025', t: 'Expodireto Cotrijal 2025', d: '10/03/2025', img: 'post_4364ed602567e6aabd0f3d5a9dd45cbe', cat: 'Eventos', r: 'De 10 a 14 de março de 2025.', txt: ['A Expodireto Cotrijal 2025 está sendo um evento incrível, e a Bertolini agradece a todos que visitaram nosso estande e fizeram parte dessa experiência única!'] },
  { slug: 'show-rural-coopavel-2025', t: 'Show Rural Coopavel 2025', d: '13/02/2025', img: 'post_6e51551a6c5ff51d6745fd51c7a029a1', cat: 'Eventos', r: 'De 10 a 14 de fevereiro de 2025, estaremos no Show Rural Coopavel, em Cascavel/PR.', txt: ['A Bertolini te convida para o Show Rural Coopavel 2025! De 10 a 14 de fevereiro de 2025, estaremos no Show Rural Coopavel, em Cascavel/PR, apresentando as melhores soluções para a agricultura e a indústria!', 'Visite nosso stand e conheça de perto a tecnologia e inovação que fazem a diferença na produção. Nossa equipe estará pronta para tirar dúvidas e apresentar os produtos que vão transformar seu negócio!', 'Stand Bertolini: Rua G, Stand 58.'] },
  { slug: 'eima-bolonha-italia', t: 'EIMA · Bolonha, Itália', d: '06/11/2024', img: 'post_7fa5f11d55196a16e486ed40727bb447', cat: 'Eventos', r: 'Exposição Internacional de Máquinas Agrícolas e de Jardinagem.', txt: ['Bertolini presente na Feira EIMA em Bolonha, Itália. Exposição Internacional de Máquinas Agrícolas e de Jardinagem, um evento bienal promovido desde 1969.', 'O evento reúne empresas de manufatura de todos os continentes com tecnologias de ponta em nível global.'] },
];

const EMPRESA = [
  'A Bertolini do Brasil é filial Comercial da Indústria Idromeccanica Bertolini SPA, empresa italiana, com sua matriz localizada em Reggio Emilia. Presente no mercado desde 1919 e atualmente em mais de 80 países, somos referência no mercado internacional, oferecendo soluções tecnológicas em bombas e equipamentos com qualidade superior para os setores da indústria e agricultura, além de acessórios e peças para reposição e manutenção de todos nossos produtos.',
  'Visando expandir seus negócios no Brasil, instituiu a empresa Bertolini do Brasil Ltda, com sede na cidade de Piracicaba – SP.',
  'Nosso objetivo é proporcionar ao mercado brasileiro, acesso a toda inovação tecnológica utilizada mundialmente, proporcionando maior eficiência produtiva, qualidade e satisfação de nossos clientes.',
];

// ---------- peças ----------
const ico = {
  tel: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3zm2 2v.5l7 4.5 7-4.5V7zm14 3-7 4.5L5 10v7h14z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.2 1.1 2.2 1.4 2.5 1.6.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.4z"/></svg>',
  pdf: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h8l6 6v14H6zm7 1.5V9h5.5zM8 13v6h1.5v-2h1a2 2 0 0 0 0-4zm1.5 1.3h1a.7.7 0 0 1 0 1.4h-1z"/></svg>',
  seta: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6z"/></svg>',
  in: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM2 9h4v12H2zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.2 1.5-2.2 3V21H9z"/></svg>',
  fb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8V6c0-.9.6-1 1-1h3V1h-4c-4 0-5 3-5 5v2H6v4h3v11h5V12h3.5l.5-4z"/></svg>',
};

const MENU = [
  ['', 'Home'], ['empresa/', 'Empresa'], ['produtos/', 'Produtos', [['produtos/agricola/', 'Agrícola'], ['produtos/industria/', 'Indústria']]],
  ['aplicacoes/', 'Aplicações'], ['informativo/', 'Informativo'], ['catalogos/', 'Catálogos'], ['contato/', 'Contato'],
];

function cabeca(v, rota, titulo, desc) {
  const url = `https://bertolini.overtus.com.br/${v}/${rota}`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titulo}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Bertolini do Brasil">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${titulo}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://bertolini.overtus.com.br/assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${titulo}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="https://bertolini.overtus.com.br/assets/og-${v}.jpg">
<link rel="icon" href="/assets/img/logo.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>`;
}

function topo(v, rota) {
  const ativo = h => (h === '' ? rota === '' : rota.startsWith(h));
  const itens = MENU.map(([h, n, sub]) => sub
    ? `<li class="tem-sub"><a href="/${v}/${h}"${ativo(h) ? ' aria-current="page"' : ''}>${n}</a><ul>${sub.map(([sh, sn]) => `<li><a href="/${v}/${sh}">${sn}</a></li>`).join('')}</ul></li>`
    : `<li><a href="/${v}/${h}"${ativo(h) ? ' aria-current="page"' : ''}>${n}</a></li>`).join('');
  const logo = v === 'b' ? 'logo-escuro.png' : 'logo.png';
  return `<body class="v-${v}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<div class="barra-top"><div class="in"><span>${ico.tel} <a href="tel:${C.tel1h}">${C.tel1}</a></span><span>${ico.mail} <a href="mailto:${C.email}">${C.email}</a></span><span class="pg">Pagamento facilitado: em até 10x no cartão de crédito</span></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/${v}/"><img src="/assets/img/${logo}" alt="Bertolini Brasil" width="153" height="191"></a>
  <button class="abre-menu" aria-label="Abrir menu" aria-expanded="false"><span></span><span></span><span></span></button>
  <nav aria-label="Principal"><ul>${itens}</ul></nav>
  <a class="btn btn-wa topo-wa" href="https://wa.me/${C.whats}" target="_blank" rel="noopener">${ico.wa} WhatsApp</a>
</div></header>
<main id="conteudo">`;
}

function rodape(v) {
  return `</main>
<footer class="rodape"><div class="in">
  <div class="r-marca"><img src="/assets/img/logo.png" alt="Bertolini Brasil" width="153" height="191" loading="lazy"><p>Filial comercial da Idromeccanica Bertolini SPA, Reggio Emilia, Itália. No mercado desde 1919, presente em mais de 80 países.</p>
    <p class="redes"><a href="${C.face}" target="_blank" rel="noopener" aria-label="Facebook">${ico.fb}</a><a href="${C.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ico.in}</a><a href="https://wa.me/${C.whats}" target="_blank" rel="noopener" aria-label="WhatsApp">${ico.wa}</a></p></div>
  <div><h3>Produtos</h3><ul><li><a href="/${v}/produtos/agricola/">Linha agrícola</a></li><li><a href="/${v}/produtos/industria/">Linha indústria</a></li><li><a href="/${v}/catalogos/">Catálogos em PDF</a></li><li><a href="/${v}/aplicacoes/">Aplicações</a></li></ul></div>
  <div><h3>Empresa</h3><ul><li><a href="/${v}/empresa/">Nossa empresa</a></li><li><a href="/${v}/informativo/">Informativo</a></li><li><a href="/${v}/contato/">Contato</a></li><li><a href="${C.global}" target="_blank" rel="noopener">Bertolini Pumps Itália</a></li></ul></div>
  <div><h3>Contato</h3><ul class="ct"><li>${ico.pin}<span>${C.end1}<br>${C.end2}</span></li><li>${ico.tel}<span><a href="tel:${C.tel1h}">${C.tel1}</a><br><a href="tel:${C.tel2h}">${C.tel2}</a></span></li><li>${ico.mail}<a href="mailto:${C.email}">${C.email}</a></li></ul></div>
</div><div class="in copy"><span>© ${new Date().getFullYear()} Bertolini do Brasil Ltda. Todos os direitos reservados.</span><span>Pagamento facilitado: compre em até 10x no cartão de crédito.</span></div></footer>
<a class="wa-flut" href="https://wa.me/${C.whats}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${ico.wa}</a>
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

const capa = (v, cls, kicker, titulo, texto, trilha) => `<section class="capa ${cls}"><div class="in">
  <nav class="trilha" aria-label="Você está em"><a href="/${v}/">Home</a>${trilha.map(([h, n]) => h ? ` / <a href="/${v}/${h}">${n}</a>` : ` / <span>${n}</span>`).join('')}</nav>
  <p class="kicker">${kicker}</p><h1>${titulo}</h1>${texto ? `<p class="lead">${texto}</p>` : ''}
</div></section>`;

function card(m, f) {
  return `<article class="prod" data-busca="${(m.nome + ' ' + f).toLowerCase()}">
  <div class="prod-img">${fs.existsSync(raiz + img(m).slice(1)) ? `<img src="${img(m)}" alt="${m.nome}" loading="lazy" width="520" height="520">` : `<div class="sem-foto">Foto no catálogo PDF</div>`}</div>
  <div class="prod-txt"><h4>${m.nome}</h4>${m.pdf ? `<a href="${ORIG}${m.pdf}" target="_blank" rel="noopener">${ico.pdf} Ficha técnica</a>` : ''}</div>
</article>`;
}

// ---------- páginas ----------
const pag = {};

pag[''] = v => {
  const vitrine = [...linhas.agricola.fams, ...linhas.industria.fams].map(f => {
    const m = f.grupos.find(g => g.modelos.length).modelos[0];
    const linha = f.id.startsWith('agricola') ? 'agricola' : 'industria';
    return { f, m, linha };
  });
  const noticias = POSTS.slice(0, 3).map(p => `<a class="noticia" href="/${v}/informativo/${p.slug}/"><img src="/assets/img/${p.img}.webp" alt="${p.t}" loading="lazy" width="900" height="540"><div><time>${p.d}</time><h3>${p.t}</h3><p>${p.r}</p><span class="mais">Saiba mais ${ico.seta}</span></div></a>`).join('');
  if (v === 'a') return `
<section class="hero"><img class="hero-bg" src="/assets/img/hero.webp" alt="" width="1730" height="869"><div class="in">
  <p class="kicker">Bombas e comandos para agricultura e indústria · desde 1919</p>
  <h1>As soluções, a tecnologia<br>e os serviços mais perto de você!</h1>
  <p class="lead">Bombas de até 1000 bar, mais de 340 modelos e mais de 1000 acessórios da italiana Bertolini, com atendimento, peças e reposição a partir de Piracicaba, SP.</p>
  <div class="acoes"><a class="btn btn-pri" href="/a/produtos/">Conheça os produtos</a><a class="btn btn-sec" href="/a/contato/">Fale com a Bertolini</a></div>
</div></section>

<section class="empresa-home"><div class="in">
  <div class="fotos"><img src="/assets/img/fabrica-italia.webp" alt="Fábrica Bertolini em Reggio Emilia, Itália" loading="lazy" width="555" height="350"><img src="/assets/img/sede-italia.webp" alt="Sede da Idromeccanica Bertolini, Itália" loading="lazy" width="555" height="350"><span class="selo"><b>1919</b>fundada na Itália</span></div>
  <div class="txt"><p class="kicker">Nossa empresa</p><h2>Tecnologia italiana em bombas, perto do mercado brasileiro</h2><p>${EMPRESA[0]}</p><p>${EMPRESA[1]}</p><a class="link" href="/a/empresa/">Conheça a Bertolini ${ico.seta}</a></div>
</div></section>

<section class="vitrine"><div class="in">
  <div class="sec-tit"><p class="kicker">Produtos</p><h2>Fabricação de bombas e comando para agricultura e indústria</h2></div>
  <div class="trilho" tabindex="0" aria-label="Famílias de produtos">${vitrine.map(({ f, m, linha }) => `<a class="fam" href="/a/produtos/${linha}/#${f.slug}"><img src="${img(m)}" alt="${f.nome}" loading="lazy" width="520" height="520"><span class="lin">${linhas[linha].nome}</span><b>${f.nome}</b><span class="mais">Saiba mais</span></a>`).join('')}</div>
  <div class="trilho-nav"><button class="tn-ant" aria-label="Anterior">‹</button><button class="tn-prox" aria-label="Próximo">›</button></div>
</div></section>

<section class="faixa-vermelha"><div class="in">
  <div class="numeros"><div><b>1000 bar</b><span>Bombas para todo tipo de utilização com jatos de água de alta pressão</span></div><div><b>+340</b><span>modelos de bombas</span></div><div><b>+1000</b><span>acessórios, peças e reposição</span></div><div><b>+80</b><span>países atendidos pela Bertolini</span></div></div>
  <div class="aplic-faixa"><h2>Principais aplicações</h2><ul>${APLIC.map(a => `<li>${a}</li>`).join('')}</ul><a class="btn btn-ama" href="/a/produtos/">Confira nossa linha completa</a></div>
</div></section>

<section class="informativo"><div class="in">
  <div class="sec-tit"><p class="kicker">Informativo</p><h2>Fique por dentro das nossas notícias e novidades</h2></div>
  <div class="noticias">${noticias}</div>
  <p class="centro"><a class="btn btn-pri" href="/a/informativo/">Ver todas as nossas postagens</a></p>
</div></section>
${blocoContato(v)}`;
  // versão B
  return `
<section class="hero-b"><div class="in">
  <div class="hb-txt">
    <p class="kicker">Bertolini do Brasil · Piracicaba, SP</p>
    <h1>As soluções, a tecnologia e os serviços mais perto de você.</h1>
    <p class="lead">Bombas de até 1000 bar para agricultura e indústria, fabricadas pela Idromeccanica Bertolini, da Itália, com estoque, peças e atendimento no Brasil.</p>
    <div class="acoes"><a class="btn btn-pri" href="/b/produtos/agricola/">Linha agrícola</a><a class="btn btn-esc" href="/b/produtos/industria/">Linha indústria</a></div>
  </div>
  <div class="hb-foto"><img src="/assets/img/hero.webp" alt="Pulverizador agrícola trabalhando ao pôr do sol" width="1730" height="869"><div class="hb-prod"><img src="${img(linhas.agricola.fams[0].grupos[1].modelos[0])}" alt="Bomba de membrana Série Poly" width="520" height="520"><span>Série Poly · bomba de membrana</span></div></div>
</div>
<div class="in"><ul class="faixa-num"><li><b>1919</b>fundação na Itália</li><li><b>+80</b>países</li><li><b>+340</b>modelos de bombas</li><li><b>+1000</b>acessórios</li><li><b>1000 bar</b>de pressão</li></ul></div></section>

<section class="linhas-b"><div class="in">
  <div class="sec-tit"><p class="kicker">Produtos</p><h2>Duas linhas, um mesmo padrão italiano</h2></div>
  <div class="duas">${['agricola', 'industria'].map(l => { const L = linhas[l]; return `<a class="linha-card ${l}" href="/b/produtos/${l}/">
    <div class="lc-txt"><span class="lin">${L.total} modelos no site</span><h3>${L.titulo}</h3><p>${L.resumo}</p><ul>${L.fams.map(f => `<li>${f.nome}</li>`).join('')}</ul><span class="mais">Ver a linha ${ico.seta}</span></div>
    <div class="lc-img">${L.fams.slice(0, 3).map(f => `<img src="${img(f.grupos.find(g => g.modelos.length).modelos[0])}" alt="${f.nome}" loading="lazy" width="520" height="520">`).join('')}</div></a>`; }).join('')}</div>
</div></section>

<section class="empresa-b"><div class="in">
  <div class="eb-txt"><p class="kicker">Nossa empresa</p><h2>De Reggio Emilia para Piracicaba</h2><p>${EMPRESA[0]}</p><a class="link" href="/b/empresa/">Conheça a Bertolini ${ico.seta}</a></div>
  <ol class="linha-tempo"><li><b>1919</b><span>Início da Idromeccanica Bertolini em Reggio Emilia, Itália.</span></li><li><b>+80 países</b><span>Referência internacional em bombas e equipamentos para indústria e agricultura.</span></li><li><b>Brasil</b><span>Bertolini do Brasil Ltda, filial comercial com sede em Piracicaba, SP.</span></li><li><b>Hoje</b><span>Inovação tecnológica mundial, peças e reposição para o mercado brasileiro.</span></li></ol>
</div></section>

<section class="aplic-b"><div class="in">
  <div class="sec-tit"><p class="kicker">Aplicações</p><h2>Onde as bombas Bertolini trabalham</h2></div>
  <ul class="chips">${APLIC.map((a, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${a}</li>`).join('')}</ul>
  <p class="centro"><a class="btn btn-esc" href="/b/aplicacoes/">Ver todas as aplicações</a></p>
</div></section>

<section class="informativo"><div class="in">
  <div class="sec-tit lado"><div><p class="kicker">Informativo</p><h2>Notícias e eventos</h2></div><a class="link" href="/b/informativo/">Ver todas as postagens ${ico.seta}</a></div>
  <div class="noticias">${noticias}</div>
</div></section>
${blocoContato(v)}`;
};

function blocoContato(v) {
  return `<section class="contato-home"><div class="in">
  <div class="ch-txt"><p class="kicker">Contato</p><h2>Fale com a Bertolini do Brasil</h2><p>Use o formulário para entrar em contato. Nós vamos responder o mais breve possível.</p>
    <ul class="ct"><li>${ico.tel}<span><a href="tel:${C.tel1h}">${C.tel1}</a> · <a href="tel:${C.tel2h}">${C.tel2}</a></span></li><li>${ico.mail}<a href="mailto:${C.email}">${C.email}</a></li><li>${ico.pin}<span>${C.end1} · ${C.end2}</span></li></ul></div>
  ${form()}
</div></section>`;
}
const form = () => `<form class="form" data-whats="${C.whats}">
  <label>Nome<input name="nome" required autocomplete="name"></label>
  <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
  <label>Telefone<input name="telefone" autocomplete="tel"></label>
  <label>Interesse<select name="interesse"><option>Linha agrícola</option><option>Linha indústria</option><option>Peças e reposição</option><option>Outro assunto</option></select></label>
  <label class="cheio">Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn btn-pri" type="submit">Enviar mensagem</button>
  <p class="aviso" hidden>Abrimos o WhatsApp da Bertolini com a sua mensagem. Se preferir, escreva para ${C.email}.</p>
</form>`;

pag['empresa/'] = v => `${capa(v, 'c-empresa', 'Nossa empresa', 'Bertolini do Brasil', 'Filial comercial da Idromeccanica Bertolini SPA, presente no mercado desde 1919 e em mais de 80 países.', [[null, 'Empresa']])}
<section class="sobre"><div class="in">
  <div class="sobre-txt">${EMPRESA.map(p => `<p>${p}</p>`).join('')}<a class="btn btn-pri" href="${C.global}" target="_blank" rel="noopener">Site da Bertolini Pumps na Itália</a></div>
  <div class="sobre-fotos"><img src="/assets/img/fabrica-italia.webp" alt="Fábrica Bertolini em Reggio Emilia" loading="lazy" width="555" height="350"><img src="/assets/img/sede-italia.webp" alt="Sede da Bertolini na Itália" loading="lazy" width="555" height="350"></div>
</div></section>
<section class="pilares"><div class="in">
  <div class="pilar"><b>1919</b><h3>Tradição italiana</h3><p>Matriz em Reggio Emilia, Itália, fabricando bombas há mais de um século.</p></div>
  <div class="pilar"><b>+80</b><h3>Presença mundial</h3><p>Referência no mercado internacional, com produtos em mais de 80 países.</p></div>
  <div class="pilar"><b>+1000</b><h3>Peças e reposição</h3><p>Acessórios e peças para reposição e manutenção de todos os nossos produtos.</p></div>
  <div class="pilar"><b>SP</b><h3>Sede no Brasil</h3><p>Bertolini do Brasil Ltda, em Piracicaba, para atender o mercado brasileiro de perto.</p></div>
</div></section>
<section class="cta"><div class="in"><h2>Precisa de uma bomba para agricultura ou indústria?</h2><a class="btn btn-ama" href="/${v}/contato/">Fale com a equipe</a></div></section>`;

pag['produtos/'] = v => `${capa(v, 'c-prod', 'Produtos', 'Bombas e comandos Bertolini', 'Bombas de até 1000 bar (14.500 P.S.I.) de pressão, mais de 340 modelos e mais de 1000 acessórios para agricultura e indústria.', [[null, 'Produtos']])}
<section class="linhas-idx"><div class="in">${['agricola', 'industria'].map(l => { const L = linhas[l]; return `<div class="li-bloco ${l}">
  <div class="li-cab"><div><p class="kicker">${L.nome}</p><h2>${L.titulo}</h2><p>${L.resumo}</p></div><div class="acoes"><a class="btn btn-pri" href="/${v}/produtos/${l}/">Ver os ${L.total} modelos</a><a class="btn btn-sec2" href="${L.cat}" target="_blank" rel="noopener">${ico.pdf} Catálogo ${L.nome.toLowerCase()}</a></div></div>
  <div class="li-fams">${L.fams.map(f => { const m = f.grupos.find(g => g.modelos.length).modelos[0]; const n = f.grupos.reduce((a, g) => a + g.modelos.length, 0); return `<a href="/${v}/produtos/${l}/#${f.slug}"><img src="${img(m)}" alt="${f.nome}" loading="lazy" width="520" height="520"><b>${f.nome}</b><span>${n} ${n === 1 ? 'modelo' : 'modelos'}</span></a>`; }).join('')}</div>
</div>`; }).join('')}</div></section>`;

for (const l of ['agricola', 'industria']) {
  pag[`produtos/${l}/`] = v => { const L = linhas[l]; return `${capa(v, 'c-prod', 'Produtos · ' + L.nome, L.titulo, 'A Bertolini fabrica bombas até 1000 bar (14.500 P.S.I.) de pressão. ' + L.resumo, [['produtos/', 'Produtos'], [null, L.nome]])}
<section class="catalogo"><div class="in">
  <aside class="cat-lado"><label class="busca"><span>Buscar modelo</span><input type="search" placeholder="Ex.: Poly 2150, WBL, regulador" data-busca></label>
    <nav aria-label="Famílias"><ul>${L.fams.map(f => `<li><a href="#${f.slug}">${f.nome}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-pri" href="${L.cat}" target="_blank" rel="noopener">${ico.pdf} Catálogo completo (PDF)</a>
    <a class="outra" href="/${v}/produtos/${l === 'agricola' ? 'industria' : 'agricola'}/">Ver a linha ${l === 'agricola' ? 'indústria' : 'agrícola'} ${ico.seta}</a></aside>
  <div class="cat-corpo">${L.fams.map(f => `<section class="familia" id="${f.slug}"><h2>${f.nome}</h2>${f.grupos.filter(g => g.modelos.length).map(g => `<div class="grupo">
    ${f.grupos.length > 1 ? `<h3>${limpa(g.nome)}</h3>` : ''}${g.info.length || g.catalogos.length ? `<div class="g-info">${g.info.length ? `<ul>${g.info.map(i => `<li>${limpa(i)}</li>`).join('')}</ul>` : ''}${g.catalogos.map((c, i) => `<a href="${ORIG}${c}" target="_blank" rel="noopener">${ico.pdf} Catálogo ${i + 1}</a>`).join('')}</div>` : ''}
    <div class="prods">${g.modelos.map(m => card(m, f.nome + ' ' + g.nome)).join('')}</div></div>`).join('')}</section>`).join('')}
    <p class="nada" hidden>Nenhum modelo com esse nome. Fale com a equipe pelo WhatsApp que indicamos o equivalente.</p></div>
</div></section>`; };
}

pag['aplicacoes/'] = v => `${capa(v, 'c-aplic', 'Aplicações', 'Principais aplicações', 'Bombas de até 1000 bar para todo tipo de utilização com jatos de água de alta pressão, na agricultura e na indústria.', [[null, 'Aplicações']])}
<section class="aplic-pag"><div class="in">
  <img class="aplic-img" src="/assets/img/aplicacoes.webp" alt="Ícones das principais aplicações das bombas Bertolini" width="1351" height="475" loading="lazy">
  <ul class="aplic-lista">${APLIC.map((a, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${a}</li>`).join('')}</ul>
  <div class="aplic-linhas"><a href="/${v}/produtos/agricola/"><b>Linha agrícola</b><span>Pulverização, irrigação e comandos</span>${ico.seta}</a><a href="/${v}/produtos/industria/"><b>Linha indústria</b><span>Limpeza, lavagem, processos e jato d’água</span>${ico.seta}</a></div>
</div></section>`;

pag['informativo/'] = v => `${capa(v, 'c-info', 'Informativo', 'Notícias e novidades', 'Feiras, eventos e lançamentos da Bertolini do Brasil.', [[null, 'Informativo']])}
<section class="informativo"><div class="in"><div class="noticias todas">${POSTS.map(p => `<a class="noticia" href="/${v}/informativo/${p.slug}/"><img src="/assets/img/${p.img}.webp" alt="${p.t}" loading="lazy" width="900" height="540"><div><time>${p.d} · ${p.cat}</time><h3>${p.t}</h3><p>${p.r}</p><span class="mais">Saiba mais ${ico.seta}</span></div></a>`).join('')}</div></div></section>`;

for (const p of POSTS) {
  pag[`informativo/${p.slug}/`] = v => `${capa(v, 'c-info', 'Informativo · ' + p.d, p.t, p.r, [['informativo/', 'Informativo'], [null, p.t]])}
<section class="post"><div class="in">
  <article><img src="/assets/img/${p.img}.webp" alt="${p.t}" width="900" height="540">${p.txt.map(t => `<p>${t}</p>`).join('')}<p class="assina">Postado por Bertolini do Brasil · ${p.cat}</p></article>
  <aside><h3>Últimas postagens</h3><ul>${POSTS.filter(o => o !== p).map(o => `<li><a href="/${v}/informativo/${o.slug}/"><b>${o.t}</b><span>${o.d}</span></a></li>`).join('')}</ul></aside>
</div></section>`;
}

pag['catalogos/'] = v => `${capa(v, 'c-cat', 'Catálogos', 'Catálogos para download', 'Os catálogos completos das linhas agrícola e indústria, em PDF.', [[null, 'Catálogos']])}
<section class="catalogos"><div class="in">${['agricola', 'industria'].map(l => { const L = linhas[l]; const m = L.fams[0].grupos.find(g => g.modelos.length).modelos[0]; return `<a class="cat-card ${l}" href="${L.cat}" target="_blank" rel="noopener"><img src="${img(m)}" alt="" loading="lazy" width="520" height="520"><div><span class="lin">PDF</span><h2>Catálogo ${L.nome.toLowerCase()}</h2><p>${L.resumo}</p><span class="mais">${ico.pdf} Baixar catálogo</span></div></a>`; }).join('')}</div></section>`;

pag['contato/'] = v => `${capa(v, 'c-contato', 'Contato', 'Fale com a Bertolini do Brasil', 'Por favor, use o formulário abaixo para entrar em contato conosco. Nós vamos responder o mais breve possível.', [[null, 'Contato']])}
<section class="contato-pag"><div class="in">
  <div class="cp-info">
    <div class="cp-item">${ico.tel}<div><h3>Telefones</h3><a href="tel:${C.tel1h}">${C.tel1}</a><br><a href="tel:${C.tel2h}">${C.tel2}</a></div></div>
    <div class="cp-item">${ico.wa}<div><h3>WhatsApp</h3><a href="https://wa.me/${C.whats}" target="_blank" rel="noopener">(19) 98290-4243</a></div></div>
    <div class="cp-item">${ico.mail}<div><h3>E-mail</h3><a href="mailto:${C.email}">${C.email}</a></div></div>
    <div class="cp-item">${ico.pin}<div><h3>Endereço</h3>${C.end1}<br>${C.end2}<br><a href="${C.mapa}" target="_blank" rel="noopener">Abrir no mapa</a></div></div>
    <p class="pgto">Pagamento facilitado: compre em até 10x no cartão de crédito.</p>
  </div>
  ${form()}
</div></section>
<section class="mapa"><iframe title="Mapa: Bertolini do Brasil em Piracicaba" loading="lazy" src="https://www.google.com/maps?q=R.+Benjamin+Constant,+2831+-+Paulista,+Piracicaba+-+SP&output=embed"></iframe></section>`;

const TIT = r => r === '' ? 'Bertolini do Brasil · Bombas para agricultura e indústria'
  : r.startsWith('produtos/agricola') ? 'Linha agrícola · Bertolini do Brasil'
  : r.startsWith('produtos/industria') ? 'Linha indústria · Bertolini do Brasil'
  : r.startsWith('informativo/') && r !== 'informativo/' ? POSTS.find(p => r.includes(p.slug)).t + ' · Bertolini do Brasil'
  : ({ 'empresa/': 'Empresa', 'produtos/': 'Produtos', 'aplicacoes/': 'Aplicações', 'informativo/': 'Informativo', 'catalogos/': 'Catálogos', 'contato/': 'Contato' })[r] + ' · Bertolini do Brasil';
const DESC = 'Bertolini do Brasil, filial da italiana Idromeccanica Bertolini: bombas de até 1000 bar, comandos e acessórios para agricultura e indústria, em Piracicaba, SP.';

let n = 0;
for (const v of ['a', 'b']) {
  for (const [r, f] of Object.entries(pag)) {
    const dir = path.join(raiz, v, r);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), cabeca(v, r, TIT(r), DESC) + '\n' + topo(v, r) + f(v) + rodape(v));
    n++;
  }
}
console.log(`gerar: ${n} páginas, agrícola ${linhas.agricola.total} e indústria ${linhas.industria.total} modelos`);
