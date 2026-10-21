// Monta as páginas das versões A ("Campo": abre no pasto gaúcho, faixa vermelha em diagonal como o risco do logo AB,
// etapas do processo sobre a diagonal) e B ("Câmara": técnica, ficha do frigorífico, foto fixa que troca nas etapas,
// produtos em abas). Estilos em public/assets/{base,a,b}.css.
import { empresa as E, textos as T, creditos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const DIM = {
  'campo-hereford': [1800, 1285], 'campo-araucarias': [1800, 1200], 'campo-serra': [1800, 1200], 'costela-fogo': [1800, 1350],
  'carne-crua': [1800, 1200], picanha: [1800, 1200], 'touro-braford': [1800, 1101], tropeada: [1800, 1012], 'montenegro-parque': [1800, 1012],
  'camara-inspetor': [1024, 555], 'camara-trilho': [1024, 562], 'camara-meias': [1024, 611], 'camara-cortes': [1023, 548],
  'inspetor-carcaca': [1024, 682], 'inspetor-ribeye': [1023, 570], 'equipe-camara': [1024, 576], curral: [1024, 683],
  'gado-cocho': [1024, 683], 'gado-brinco': [1024, 683], 'pecuarista-campo': [1024, 683],
};
const foto = (src, alt, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${DIM[src][0]}" height="${DIM[src][1]}" loading="lazy" decoding="async"${extra}>`;
const ja = ' fetchpriority="high" loading="eager"';

export const nomesVersao = { a: 'Campo', b: 'Câmara' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'empresa', nome: 'A Empresa', caminho: 'empresa/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'qualidade', nome: 'Qualidade', caminho: 'qualidade/' },
  { slug: 'pecuarista', nome: 'Pecuarista', caminho: 'pecuarista/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c.3 2 2.2 4 4.5 4.6l1-1.2 1.6.8-.4 1.5c-3.4.3-6.8-3-6.7-6.4l1.5-.4.8 1.6z"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>',
  face: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  caminhao: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  floco: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5L12 7l2.5-2.5M9.5 19.5L12 17l2.5 2.5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
// O risco do logo: a faixa vermelha que corta o "AB" na diagonal.
const risco = (cls = 'risco') => `<svg class="${cls}" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path class="risco-b" d="M0 120L1440 22V120z"/><path class="risco-v" d="M0 120V94L1440 0v22z"/></svg>`;

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
<meta property="og:site_name" content="${E.nome}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#FFFFFF' : '#2E2E2E'}">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const link = (v, n, atual) => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`;
const logo = (w = 220, cor = '') => `<img src="/assets/logo${cor}.svg" alt="AgroBrasil Frigorífico" width="${w}" height="${Math.round(w * 63 / 225)}">`;
const menuBtn = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, atual) {
  if (v === 'a') return `<div class="faixa-info"><div class="in"><span>${ic('pin')} ${E.endereco} · ${E.bairro}</span><span>${ic('relogio')} ${E.horario}</span><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="/a/" aria-label="AgroBrasil Frigorífico, início">${logo(190)}</a>
  <nav id="menu" class="menu" aria-label="Principal">${nav.map(n => link(v, n, atual)).join('')}
    <a class="btn btn-peq" href="${E.wa}" target="_blank" rel="noopener">${ic('wa')} WhatsApp</a></nav>
  ${menuBtn}
</div></header>`;
  return `<header class="topo"><div class="in">
  <a class="marca" href="/b/" aria-label="AgroBrasil Frigorífico, início">${logo(176, '-branco')}</a>
  <nav id="menu" class="menu" aria-label="Principal">${nav.map(n => link(v, n, atual)).join('')}</nav>
  <a class="topo-fone" href="tel:${E.foneHref}"><small>Comercial</small>${E.fone}</a>
  ${menuBtn}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca">${logo(220, '-branco')}<p>${T.bio}</p>
    <p class="rod-redes"><a href="${E.instagram}" target="_blank" rel="noopener" aria-label="Instagram @frigorificoagrobrasil">${ic('insta')}</a><a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p></div>
  <div><h3>Contato</h3><p><a class="rod-tel" href="tel:${E.foneHref}">${E.fone}</a><br><a href="mailto:${E.email}">${E.email}</a><br>${E.horario}</p></div>
  <div><h3>Onde estamos</h3><p>${E.endereco}<br>${E.bairro}<br>CEP ${E.cep}</p><p><a class="link" href="${E.mapa}" target="_blank" rel="noopener">Ver no mapa ${ic('seta')}</a></p></div>
  <nav aria-label="Rodapé"><h3>Site</h3>${nav.map(n => link(v, n, '')).join('')}</nav>
</div>
<p class="rod-fim">© ${E.razao} · CNPJ ${E.cnpj} · SIE nº ${E.sie}</p>
<p class="rod-cred">${creditos}</p></footer>`;
}

const pagina = (v, sl, caminho, titulo, descricao, corpo) => `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${sl}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, sl)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
<a class="wa-flutua" href="${E.wa}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('wa')}</a>
</body>
</html>
`;

// ---------- blocos comuns ----------
const formContato = () => `<form class="form" data-form>
  <div class="campos">
    <label>Nome<input name="Nome" autocomplete="name" required></label>
    <label>Empresa<input name="Empresa" autocomplete="organization"></label>
    <label>Telefone ou WhatsApp<input name="Telefone" type="tel" autocomplete="tel" required></label>
    <label>E-mail<input name="E-mail" type="email" autocomplete="email"></label>
    <label class="largo">Assunto<select name="Assunto"><option>Pedido ou cotação de carne</option><option>Sou pecuarista: venda de animais</option><option>Financeiro</option><option>Trabalhe conosco</option><option>Outros assuntos</option></select></label>
    <label class="largo">Mensagem<textarea name="Mensagem" rows="5" required></textarea></label>
  </div>
  <button class="btn" type="submit">Enviar mensagem ${ic('seta')}</button>
  <p class="form-ok" role="status" hidden>Mensagem pronta. Nesta prévia o envio está desligado; no site no ar ela chega direto para a AgroBrasil. Enquanto isso, chame no WhatsApp <a href="${E.wa}">${E.fone}</a>.</p>
</form>`;

const mapa = () => `<div class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa: AgroBrasil Frigorífico na BR-386, km 415,5" loading="lazy"></iframe></div>`;

const contatoInfo = () => `<ul class="info-lista">
  <li>${ic('wa')}<span><small>Telefone e WhatsApp</small><a href="${E.wa}" target="_blank" rel="noopener">${E.fone}</a></span></li>
  <li>${ic('mail')}<span><small>Financeiro</small><a href="mailto:${E.email}">${E.email}</a></span></li>
  <li>${ic('relogio')}<span><small>Horário</small>${E.horario}</span></li>
  <li>${ic('pin')}<span><small>Endereço</small>${E.endereco}, ${E.bairro}, CEP ${E.cep}</span></li>
  <li>${ic('insta')}<span><small>Instagram</small><a href="${E.instagram}" target="_blank" rel="noopener">@frigorificoagrobrasil</a></span></li>
</ul>`;

// ================= versão A: Campo =================
const capaA = (sobre, titulo, sub, img, alt) => `<section class="capa"><div class="capa-foto">${foto(img, alt, ja)}</div><div class="in"><p class="eyebrow">${sobre}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${risco()}</section>`;

const numerosA = () => `<section class="numeros"><div class="in"><dl>
  <div><dt>Desde</dt><dd>${E.abertura}</dd><p>início das operações na BR-386</p></div>
  <div><dt>Registro</dt><dd>SIE ${E.sie}</dd><p>inspeção estadual permanente</p></div>
  <div><dt>Mercado</dt><dd>SISBI</dd><p>equivalência para vender em todo o Brasil</p></div>
  <div><dt>Endereço</dt><dd>km 415,5</dd><p>BR-386, ${E.bairro.replace(' – RS', '')}</p></div>
</dl></div></section>`;

const processoA = () => `<section class="processo"><div class="in">
  <div class="tit"><p class="eyebrow">Como trabalhamos</p><h2>Do recebimento à expedição</h2></div>
  <div class="diag-caixa"><svg class="diag-linha" viewBox="0 0 100 180" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="152.75" x2="100" y2="2.75"/></svg><ol class="diag">${T.etapas.map(e => `<li><span class="diag-n">${e.n}</span><h3>${e.titulo}</h3><p>${e.texto}</p></li>`).join('')}</ol></div>
</div></section>`;

const quartosA = () => `<section class="quartos"><div class="quartos-foto">${foto('costela-fogo', 'Costela bovina assando no fogo de chão')}</div><div class="in">
  <div class="tit tit-claro"><p class="eyebrow">Carne bovina</p><h2>Dianteiro, traseiro e ponta de agulha</h2><p>A carcaça bovina é dividida em três partes. Cada uma vai para um uso diferente no açougue, no restaurante e na churrasqueira.</p></div>
  <ul class="quartos-lista">${T.quartos.map(q => `<li><h3>${q.nome}</h3><p>${q.texto}</p></li>`).join('')}</ul>
</div></section>`;

const ctaA = () => `<section class="cta"><div class="in">
  <div><p class="eyebrow">Fale com a AgroBrasil</p><h2>${T.contato}</h2></div>
  <div class="cta-acoes"><a class="btn btn-branco" href="${E.wa}" target="_blank" rel="noopener">${ic('wa')} ${E.fone}</a><a class="link link-claro" href="/a/contato/">Outros contatos ${ic('seta')}</a></div>
</div>${risco('risco risco-cta')}</section>`;

const homeA = () => `<section class="hero">
  <div class="hero-foto">${foto('campo-hereford', 'Gado de corte da raça Hereford no pasto', ja)}</div>
  <div class="in hero-in">
    <p class="eyebrow">Frigorífico em Montenegro · RS</p>
    <h1>Carnes bovinas<br>de alto padrão</h1>
    <p>${T.chamada}</p>
    <div class="acoes"><a class="btn" href="/a/produtos/">Conheça os produtos ${ic('seta')}</a><a class="btn btn-vidro" href="${E.wa}" target="_blank" rel="noopener">${ic('wa')} Fazer um pedido</a></div>
  </div>
  ${risco()}
</section>
${numerosA()}
<section class="sobre"><div class="in">
  <div class="sobre-txt"><p class="eyebrow">A empresa</p><h2>Um frigorífico novo, na estrada de quem cria gado</h2>${T.sobre.map(p => `<p>${p}</p>`).join('')}<a class="link" href="/a/empresa/">Conheça a AgroBrasil ${ic('seta')}</a></div>
  <div class="sobre-fotos"><figure class="f1">${foto('touro-braford', 'Touro Braford no curral')}</figure><figure class="f2">${foto('camara-inspetor', 'Meias-carcaças bovinas na câmara fria')}</figure></div>
</div></section>
${processoA()}
<section class="linhas"><div class="in">
  <div class="tit"><p class="eyebrow">Produtos</p><h2>O que sai da AgroBrasil</h2></div>
  ${T.linhas.map((l, i) => `<article class="linha${i % 2 ? ' inv' : ''}"><figure>${foto(l.foto, l.alt)}</figure><div><span class="linha-n">0${i + 1}</span><h3>${l.titulo}</h3><p>${l.texto}</p><ul>${l.itens.map(x => `<li>${x}</li>`).join('')}</ul></div></article>`).slice(0, 2).join('')}
  <p class="centro"><a class="btn btn-contorno" href="/a/produtos/">Ver todas as linhas ${ic('seta')}</a></p>
</div></section>
${quartosA()}
<section class="selos"><div class="in">
  <div class="tit"><p class="eyebrow">Qualidade</p><h2>Inspeção do começo ao fim</h2></div>
  <ul class="selos-lista">${T.qualidade.map(q => `<li><b>${q.sigla}</b><h3>${q.titulo}</h3><p>${q.texto}</p></li>`).join('')}</ul>
</div></section>
<section class="pecu"><div class="pecu-foto">${foto('tropeada', 'Peão conduzindo gado de corte no corredor')}</div><div class="in"><div class="pecu-txt">
  <p class="eyebrow">Para o produtor</p><h2>${T.pecuarista.titulo}</h2><p>${T.pecuarista.texto}</p><a class="btn btn-branco" href="/a/pecuarista/">Saiba mais ${ic('seta')}</a></div></div></section>
<section class="onde"><div class="in">
  <div class="onde-txt"><p class="eyebrow">Onde estamos</p><h2>BR-386, km 415,5</h2><p>${E.bairro}, CEP ${E.cep}. Na rodovia que liga a Região Metropolitana ao Vale do Taquari e ao norte do estado.</p><a class="link" href="${E.mapa}" target="_blank" rel="noopener">Abrir no Google Maps ${ic('seta')}</a></div>
  ${mapa()}
</div></section>
${ctaA()}`;

const empresaA = () => `${capaA('A Empresa', 'AgroBrasil Frigorífico', T.bio, 'campo-araucarias', 'Campo com araucárias no Rio Grande do Sul')}
<section class="sobre sobre-pg"><div class="in">
  <div class="sobre-txt"><h2>Desde 2022 na BR-386</h2>${T.sobre.map(p => `<p>${p}</p>`).join('')}</div>
  <div class="sobre-fotos"><figure class="f1">${foto('gado-brinco', 'Bovinos com brinco de identificação')}</figure><figure class="f2">${foto('inspetor-carcaca', 'Inspeção de carcaça bovina')}</figure></div>
</div></section>
${numerosA()}
<section class="ficha-a"><div class="in">
  <div class="tit"><p class="eyebrow">Dados da empresa</p><h2>Registro e atividades</h2></div>
  <dl class="ficha-tab">
    <div><dt>Razão social</dt><dd>${E.razao}</dd></div>
    <div><dt>CNPJ</dt><dd>${E.cnpj}</dd></div>
    <div><dt>Início</dt><dd>Janeiro de 2022</dd></div>
    <div><dt>Atividade principal</dt><dd>Frigorífico: abate de bovinos</dd></div>
    <div><dt>Outras atividades</dt><dd>Abate de suínos e de bubalinos, fabricação de produtos de carne e preparação de subprodutos do abate</dd></div>
    <div><dt>Inspeção</dt><dd>SIE nº ${E.sie} (RS), inspeção permanente, SISBI-POA</dd></div>
    <div><dt>Endereço</dt><dd>${E.endereco} · ${E.bairro} · CEP ${E.cep}</dd></div>
  </dl>
</div></section>
${processoA()}
${ctaA()}`;

const produtosA = () => `${capaA('Produtos', 'Carne bovina, suínos, búfalos e subprodutos', 'As quatro linhas que o registro da AgroBrasil permite. Para saber o que está disponível nesta semana, fale com o comercial.', 'carne-crua', 'Bife de contrafilé cru')}
<section class="linhas"><div class="in">
  ${T.linhas.map((l, i) => `<article class="linha${i % 2 ? ' inv' : ''}" id="${l.slug}"><figure>${foto(l.foto, l.alt)}</figure><div><span class="linha-n">0${i + 1}</span><h2>${l.titulo}</h2><p>${l.texto}</p><ul>${l.itens.map(x => `<li>${x}</li>`).join('')}</ul><a class="link" href="${E.wa}" target="_blank" rel="noopener">Pedir cotação ${ic('seta')}</a></div></article>`).join('')}
</div></section>
${quartosA()}
${ctaA()}`;

const qualidadeA = () => `${capaA('Qualidade', 'Inspeção do começo ao fim', 'Cada animal e cada carcaça passam pela inspeção estadual, com veterinário presente durante o abate.', 'inspetor-ribeye', 'Inspetor avaliando um corte bovino')}
<section class="selos selos-pg"><div class="in">
  <ul class="selos-lista">${T.qualidade.map(q => `<li><b>${q.sigla}</b><h2>${q.titulo}</h2><p>${q.texto}</p></li>`).join('')}</ul>
</div></section>
<section class="frio"><div class="in">
  <figure>${foto('camara-meias', 'Avaliação de carcaça na câmara de resfriamento')}</figure>
  <div><p class="eyebrow">Cadeia do frio</p><h2>Da câmara à entrega, sempre refrigerado</h2><p>As carcaças descem a temperatura nas câmaras antes da desossa e saem em carga refrigerada. A rastreabilidade acompanha o lote do curral à nota fiscal.</p>
  <ul class="checks"><li>${ic('escudo')} Avaliação veterinária antes e depois do abate</li><li>${ic('floco')} Resfriamento das carcaças em câmara fria</li><li>${ic('caminhao')} Expedição em transporte refrigerado</li></ul></div>
</div></section>
${processoA()}
${ctaA()}`;

const pecuaristaA = () => `${capaA('Pecuarista', T.pecuarista.titulo, 'Um frigorífico perto de você, na BR-386.', 'tropeada', 'Peão conduzindo gado de corte')}
<section class="sobre sobre-pg"><div class="in">
  <div class="sobre-txt"><h2>Venda seus animais para quem está perto</h2><p>${T.pecuarista.texto}</p><p>Conte quantos animais, a raça, a categoria (boi, vaca, novilha) e a sua cidade. O comercial retorna com as condições e a data de embarque.</p>
  <div class="acoes"><a class="btn" href="${E.wa}" target="_blank" rel="noopener">${ic('wa')} Falar com o comercial</a></div></div>
  <div class="sobre-fotos"><figure class="f1">${foto('curral', 'Lote de bovinos no curral')}</figure><figure class="f2">${foto('pecuarista-campo', 'Produtor no pasto com o rebanho')}</figure></div>
</div></section>
<section class="processo"><div class="in">
  <div class="tit"><p class="eyebrow">Passo a passo</p><h2>Como funciona a venda</h2></div>
  <div class="diag-caixa diag-caixa-3"><svg class="diag-linha" viewBox="0 0 100 180" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="101.6" x2="100" y2="-3.4"/></svg><ol class="diag diag-3">
    <li><span class="diag-n">01</span><h3>Contato</h3><p>Você informa o lote: número de animais, raça, categoria e local.</p></li>
    <li><span class="diag-n">02</span><h3>Negociação</h3><p>O comercial combina as condições e a data de embarque com você.</p></li>
    <li><span class="diag-n">03</span><h3>Embarque e abate</h3><p>Os animais chegam ao frigorífico e são abatidos com a inspeção estadual presente.</p></li>
  </ol></div>
</div></section>
<section class="onde"><div class="in">
  <div class="onde-txt"><p class="eyebrow">Chegada dos animais</p><h2>BR-386, km 415,5</h2><p>${E.bairro}, CEP ${E.cep}.</p><a class="link" href="${E.mapa}" target="_blank" rel="noopener">Rota no Google Maps ${ic('seta')}</a></div>
  ${mapa()}
</div></section>`;

const contatoA = () => `${capaA('Contato', 'Fale com a AgroBrasil', T.contato, 'campo-serra', 'Campos de cima da serra no Rio Grande do Sul')}
<section class="contato"><div class="in">
  <div class="contato-lado">${contatoInfo()}</div>
  <div class="contato-form"><h2>Envie uma mensagem</h2>${formContato()}</div>
</div></section>
<section class="onde"><div class="in">${mapa()}</div></section>`;

// ================= versão B: Câmara =================
const fichaB = () => `<dl class="ficha">
  <div><dt>Registro</dt><dd>SIE nº ${E.sie} · RS</dd></div>
  <div><dt>Sistema</dt><dd>SISBI-POA</dd></div>
  <div><dt>Abate</dt><dd>Bovinos, suínos e bubalinos</dd></div>
  <div><dt>Desde</dt><dd>${E.abertura}</dd></div>
  <div><dt>Local</dt><dd>BR-386, km 415,5</dd></div>
</dl>`;

const capaB = (sobre, titulo, sub, img, alt) => `<section class="capa"><div class="in"><div class="capa-txt"><p class="eyebrow">${sobre}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></div>${img ? `<figure class="capa-foto">${foto(img, alt, ja)}</figure>` : ''}</section>`;

const etapaFoto = ['curral', 'inspetor-carcaca', 'camara-inspetor', 'camara-cortes', 'equipe-camara'];
const etapaAlt = ['Lote de bovinos no curral', 'Inspetor avaliando carcaça', 'Meias-carcaças na câmara fria', 'Avaliação de peça bovina', 'Equipe na câmara de resfriamento'];
const caminhoB = () => `<section class="caminho" data-caminho><div class="in">
  <div class="caminho-fotos" aria-hidden="true">${etapaFoto.map((f, i) => `<figure class="${i ? '' : 'on'}">${foto(f, '')}<span>${T.etapas[i].n}</span></figure>`).join('')}</div>
  <div class="caminho-txt">
    <p class="eyebrow">Processo</p>
    <h2>Cinco etapas, uma só inspeção</h2>
    ${T.etapas.map((e, i) => `<article class="passo" data-passo="${i}"><figure class="passo-foto">${foto(etapaFoto[i], etapaAlt[i])}</figure><span class="passo-n">${e.n}</span><h3>${e.titulo}</h3><p>${e.texto}</p></article>`).join('')}
  </div>
</div></section>`;

const abasB = (h = 'h3') => `<div class="abas" data-abas>
  <div class="abas-bts" role="tablist" aria-label="Linhas de produto">${T.linhas.map((l, i) => `<button type="button" role="tab" id="aba-${l.slug}" aria-controls="pn-${l.slug}" aria-selected="${!i}"${i ? ' tabindex="-1"' : ''}><span>0${i + 1}</span>${l.curto}</button>`).join('')}</div>
  ${T.linhas.map((l, i) => `<div class="aba" role="tabpanel" id="pn-${l.slug}" aria-labelledby="aba-${l.slug}"${i ? ' hidden' : ''}>
    <figure>${foto(l.foto, l.alt)}</figure>
    <div><${h}>${l.titulo}</${h}><p>${l.texto}</p><ul>${l.itens.map(x => `<li>${x}</li>`).join('')}</ul><a class="btn" href="${E.wa}" target="_blank" rel="noopener">${ic('wa')} Pedir cotação</a></div>
  </div>`).join('')}
</div>`;

const quartosB = () => `<section class="quartos-b"><div class="in">
  <div class="tit"><p class="eyebrow">Carcaça bovina</p><h2>Três partes, cada uma com seu uso</h2></div>
  <ol class="quartos-cols">${T.quartos.map((q, i) => `<li><span class="q-n">${['D', 'T', 'PA'][i]}</span><h3>${q.nome}</h3><p>${q.texto}</p></li>`).join('')}</ol>
  <p class="nota">Disponibilidade de quartos e cortes sob consulta com o comercial.</p>
</div></section>`;

const ctaB = () => `<section class="cta"><div class="in">
  <h2>${T.contato}</h2>
  <div class="cta-acoes"><a class="cta-fone" href="${E.wa}" target="_blank" rel="noopener">${ic('wa')} ${E.fone}</a><span>${E.horario}</span><a class="btn" href="/b/contato/">Formulário de contato ${ic('seta')}</a></div>
</div></section>`;

const homeB = () => `<section class="hero">
  <div class="in hero-in">
    <div class="hero-txt">
      <p class="eyebrow">AgroBrasil Frigorífico · Montenegro, RS</p>
      <h1>Frigorífico especializado em carnes bovinas de alto padrão.</h1>
      <p>${T.chamada}</p>
      <div class="acoes"><a class="btn" href="${E.wa}" target="_blank" rel="noopener">${ic('wa')} Fazer um pedido</a><a class="btn btn-contorno" href="/b/produtos/">Ver produtos</a></div>
    </div>
    ${fichaB()}
  </div>
  <figure class="hero-foto">${foto('camara-trilho', 'Avaliação de meia-carcaça bovina na câmara fria', ja)}</figure>
  <div class="hero-risco" aria-hidden="true"></div>
</section>
${caminhoB()}
<section class="prod-b"><div class="in">
  <div class="tit"><p class="eyebrow">Produtos</p><h2>Quatro linhas no mesmo registro</h2></div>
  ${abasB()}
</div></section>
${quartosB()}
<section class="qual-b"><div class="in">
  <div class="tit tit-claro"><p class="eyebrow">Qualidade</p><h2>Inspeção que vale para todo o Brasil</h2></div>
  <ol class="qual-lista">${T.qualidade.map(q => `<li><code>${q.sigla}</code><div><h3>${q.titulo}</h3><p>${q.texto}</p></div></li>`).join('')}</ol>
  <a class="link link-claro" href="/b/qualidade/">Como funciona a inspeção ${ic('seta')}</a>
</div></section>
<section class="duplo"><div class="in">
  <article><figure>${foto('gado-cocho', 'Bovinos no cocho')}</figure><p class="eyebrow">Pecuarista</p><h2>Venda seus animais na BR-386</h2><p>${T.pecuarista.texto}</p><a class="link" href="/b/pecuarista/">Como funciona ${ic('seta')}</a></article>
  <article><figure>${mapa()}</figure><p class="eyebrow">Endereço</p><h2>${E.endereco}</h2><p>${E.bairro}, CEP ${E.cep}. ${E.horario}.</p><a class="link" href="${E.mapa}" target="_blank" rel="noopener">Abrir no Google Maps ${ic('seta')}</a></article>
</div></section>
${ctaB()}`;

const empresaB = () => `${capaB('A Empresa', 'AgroBrasil Frigorífico', T.bio, 'inspetor-carcaca', 'Inspeção de carcaça bovina')}
<section class="texto-b"><div class="in">
  <div class="texto-col">${T.sobre.map(p => `<p>${p}</p>`).join('')}</div>
  <aside>${fichaB()}</aside>
</div></section>
<section class="cadastro"><div class="in">
  <div class="tit"><p class="eyebrow">Cadastro</p><h2>Dados da empresa</h2></div>
  <table class="tab"><tbody>
    <tr><th scope="row">Razão social</th><td>${E.razao}</td></tr>
    <tr><th scope="row">CNPJ</th><td>${E.cnpj}</td></tr>
    <tr><th scope="row">Início das atividades</th><td>14 de janeiro de 2022</td></tr>
    <tr><th scope="row">Atividade principal</th><td>Frigorífico: abate de bovinos</td></tr>
    <tr><th scope="row">Atividades secundárias</th><td>Abate de bubalinos · abate de suínos · fabricação de produtos de carne · preparação de subprodutos do abate</td></tr>
    <tr><th scope="row">Inspeção</th><td>SIE nº ${E.sie} (SEAPI/RS), inspeção permanente, adesão ao SISBI-POA</td></tr>
    <tr><th scope="row">Endereço</th><td>${E.endereco} · ${E.bairro} · CEP ${E.cep}</td></tr>
  </tbody></table>
</div></section>
${caminhoB()}
${ctaB()}`;

const produtosB = () => `${capaB('Produtos', 'Quatro linhas no mesmo registro', 'Carne bovina, suínos e bubalinos, produtos de carne e subprodutos do abate. A disponibilidade muda conforme os lotes: confirme com o comercial.', null)}
<section class="prod-b prod-b-pg"><div class="in">${abasB('h2')}</div></section>
${quartosB()}
<section class="cadastro"><div class="in">
  <div class="tit"><p class="eyebrow">Resumo</p><h2>Linhas e itens</h2></div>
  <div class="tabela-rola"><table class="tab tab-cols"><thead><tr><th scope="col">Linha</th><th scope="col">Itens</th></tr></thead><tbody>${T.linhas.map(l => `<tr><th scope="row">${l.titulo}</th><td>${l.itens.join(' · ')}</td></tr>`).join('')}</tbody></table></div>
</div></section>
${ctaB()}`;

const qualidadeB = () => `${capaB('Qualidade', 'Inspeção que vale para todo o Brasil', 'Registro estadual com inspeção permanente, equivalência ao SISBI-POA e habilitação no Agregar RS Carnes.', 'inspetor-ribeye', 'Inspetor avaliando corte bovino')}
<section class="qual-b qual-pg"><div class="in">
  <ol class="qual-lista">${T.qualidade.map(q => `<li><code>${q.sigla}</code><div><h2>${q.titulo}</h2><p>${q.texto}</p></div></li>`).join('')}</ol>
</div></section>
${caminhoB()}
${ctaB()}`;

const pecuaristaB = () => `${capaB('Pecuarista', T.pecuarista.titulo, T.pecuarista.texto, 'gado-brinco', 'Bovinos com brinco de identificação')}
<section class="passos-b"><div class="in">
  <div class="tit"><p class="eyebrow">Como funciona</p><h2>Três passos até o embarque</h2></div>
  <ol class="quartos-cols">
    <li><span class="q-n">01</span><h3>Contato</h3><p>Informe o número de animais, a raça, a categoria (boi, vaca, novilha) e a sua cidade.</p></li>
    <li><span class="q-n">02</span><h3>Negociação</h3><p>O comercial retorna com as condições e combina a data de embarque.</p></li>
    <li><span class="q-n">03</span><h3>Embarque e abate</h3><p>Os animais chegam à BR-386, km 415,5, e são abatidos com a inspeção estadual presente.</p></li>
  </ol></div>
  <p class="centro"><a class="btn" href="${E.wa}" target="_blank" rel="noopener">${ic('wa')} Falar com o comercial</a></p>
</div></section>
<section class="duplo"><div class="in">
  <article><figure>${foto('pecuarista-campo', 'Produtor no pasto com o rebanho')}</figure><p class="eyebrow">Na estrada</p><h2>Perto de quem cria</h2><p>A BR-386 liga a Região Metropolitana ao Vale do Taquari e ao norte do estado.</p></article>
  <article><figure>${mapa()}</figure><p class="eyebrow">Chegada</p><h2>${E.endereco}</h2><p>${E.bairro}, CEP ${E.cep}.</p><a class="link" href="${E.mapa}" target="_blank" rel="noopener">Rota no Google Maps ${ic('seta')}</a></article>
</div></section>`;

const contatoB = () => `${capaB('Contato', 'Fale com a AgroBrasil', T.contato, null)}
<section class="contato"><div class="in">
  <div class="contato-form">${formContato()}</div>
  <aside class="contato-lado">${contatoInfo()}</aside>
</div></section>
<section class="onde-b"><div class="in">${mapa()}</div></section>`;

// ---------- montagem ----------
const descr = `${T.bio} ${T.chamada}`;
export function gerarVersao(v) {
  const A = v === 'a';
  return {
    index: pagina(v, 'index', '', 'AgroBrasil Frigorífico · Carnes bovinas de alto padrão', descr, A ? homeA() : homeB()),
    empresa: pagina(v, 'empresa', 'empresa/', 'A Empresa · AgroBrasil Frigorífico', T.sobre[0], A ? empresaA() : empresaB()),
    produtos: pagina(v, 'produtos', 'produtos/', 'Produtos · AgroBrasil Frigorífico', 'Carne bovina, suínos e bubalinos, produtos de carne e subprodutos do abate.', A ? produtosA() : produtosB()),
    qualidade: pagina(v, 'qualidade', 'qualidade/', 'Qualidade · AgroBrasil Frigorífico', 'SIE nº 419 com inspeção permanente, SISBI-POA e Agregar RS Carnes.', A ? qualidadeA() : qualidadeB()),
    pecuarista: pagina(v, 'pecuarista', 'pecuarista/', 'Pecuarista · AgroBrasil Frigorífico', T.pecuarista.texto, A ? pecuaristaA() : pecuaristaB()),
    contato: pagina(v, 'contato', 'contato/', 'Contato · AgroBrasil Frigorífico', `WhatsApp ${E.fone}. ${E.endereco}, ${E.bairro}.`, A ? contatoA() : contatoB()),
  };
}
