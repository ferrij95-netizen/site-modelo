// Gera clientes/engefrio/public/index.html a partir dos dados reais da loja (engefrio.com.br, lidos em 2026-10-09).
// Mesmo formato da home atual (página longa, com rolagem): banner, benefícios, banners de categoria, prateleiras, rodapé completo.
// Fotos e logo vêm direto do CDN da loja atual (Nuvemshop). Rodar: node clientes/engefrio/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const LOJA = 'https://engefrio.com.br';
const CDN = 'https://acdn-us.mitiendanube.com/stores/002/716/239/products/';
const LOGO = 'https://acdn-us.mitiendanube.com/stores/002/716/239/themes/common/logo-740995517-1674132118-058576f5d0df4b8a10def79dd271a91b1674132119.png?0';
const ZAP = 'https://wa.me/5581981502434';

// [nome, preço à vista, parcelas, slug do produto, arquivo da foto no CDN]
const P = {
  conservador: ['Conservador de Proteínas Marchesoni com 4 Cubas GN MarPro 220V', '3.723,90', '12x de R$ 349,43', 'conservador-proteinas-4cubas-marchesoni', 'conservador-de-proteinas-marchesoni-06d4cde8873009a28917533630308278'],
  fritadeira: ['Fritadeira Industrial Água e Óleo Marchesoni 25L Gabinete 220V', '2.260,00', '12x de R$ 212,06', 'fritadeira-agua-oleo-25l-marchesoni', 'fritadeira-eletrica-agua-oleo-25l-profissional-ft2252g-marchesoni-a39f8f6ebdf9d24aae17621995742274'],
  cafeteira: ['Cafeteira Profissional Marchesoni Master 2L 220V', '1.332,90', '12x de R$ 125,07', 'cafeteira-2l-eletrica-marchesoni', 'cafeteira-master-2-litros-marchesoni-a31dc2d6955962e86f17524322137564'],
  misturador: ['Misturador de Doces 7L Elétrico PRMOG-07 Progás', '2.905,00', '12x de R$ 272,59', 'misturador-doces-7l-progas', 'misturador-7-l-1-9cdf89290da128e70a17676363114705'],
  mesa: ['Mesa Térmica Fria Vidro Temperado LC1708 Le Cook', '947,90', '12x de R$ 88,94', 'mesa-termica-fria-le-cook', 'mesa-termica-fria-le-cook-85171a17f60e4b2d1517667710922335'],
  climatizador: ['Climatizador de Ar 45L PRO Ventisol 210W CLI45PR', null, null, 'climatizador-de-ar-45l-pro-ventisol-210w', 'climatizador-de-ar-45l-pro-ventisol-210w-a8c43786d615a5b93517787643406358'],
  pratoPao: ['Prato Pão e Pintura Germer Coup Porcelana Branca Comercial', '8,10', null, 'prato-pao-coup-porcelana', 'prato-raso-coup-germer-1-30b055c355d2051b0717425983412574'],
  sobremesaBar: ['Prato Sobremesa Germer Bar Hotel 18,5 cm Porcelana Branca Comercial', '8,90', null, 'prato-sobremesa-bar-hotel-germer', 'prato-pao-sobremesa-bar-hotel-germer-photoroom-558c7c67c0cb5d8e0d17425963607121'],
  sobremesaIguacu: ['Prato Sobremesa Germer Iguaçu 19 cm Porcelana Branca Comercial', '9,00', null, 'prato-sobremesa-iguacu-germer', 'prato-sobremesa-iguacu-germer-ba0bd60606b1ba02e217425895161885'],
  rasoBar: ['Prato Raso Bar Hotel Germer 24 cm Porcelana Branca Comercial', '14,00', null, 'prato-raso-bar-hotel-germer', 'prato-raso-24cm-comercial-bar-hotel-germer-49fc824e8d5daa1dc717446394521773'],
  rasoIguacu: ['Prato Raso Germer Iguaçu 25,5 cm Porcelana Branca Comercial', '14,00', null, 'prato-raso-255cm-comercial-iguacu-germer', 'prato-raso-255cm-comercial-iguacu-germer-366f1049166d9b43aa17446396450821'],
  microtextura: ['Prato Raso Germer Microtextura 29 cm Porcelana Branca Comercial', '14,90', null, 'prato-raso-microtextura-germer', 'prato-raso-microtextura-germer-c060db796f9f14781a17386108932915'],
  colherStar: ['Colher Mesa Star Aço Inox Avulsa', '1,90', null, 'colher-mesa-star-inox', 'colher-de-mesa-star-inox-talher-economico-e9933d67c7694a7a3217746330755872'],
  garfoOriente: ['Garfo Mesa Original Oriente Inox Avulso', '2,50', null, 'garfo-mesa-oriente', 'garfo-mesa-oriente-inox-original-line-9416285875209bf72717658895870704'],
  garfoEuro: ['Garfo de Sobremesa Euro Inox SL0406', '5,50', null, 'garfo-sobremesa-euro-inox', 'garfo-sobremesa-euro-inox-original-line-d5f48da7143aa08e1e17463086651769'],
  colherCafe: ['Colher Café Salvador Oxford Aço Inox Avulso', '9,90', null, 'colher-cafe-salvador-inox', 'colher-cafe-salvador-oxford-f406027df4a9bc49ab17691070173300'],
  garfoMadeira: ['Garfo Mesa Cabo Madeira Tradição Di Solle Avulso', '10,90', null, 'garfo-mesa-cabo-madeira-disole', 'garfo-mesa-cabo-madeira-disole-91b7801d73c9cdab8417664236296786'],
  colherFortaleza: ['Colher Mesa Fortaleza Oxford Aço Inox Avulso', '10,90', null, 'colher-mesa-fortaleza-oxford', 'colher-mesa-salvador-oxford-8a8b11a605ea8f6ed317691143847996'],
  pote: ['Pote Petisco Germer 200 ml Porcelana Branca Comercial', '9,90', null, 'pote-de-petisco-200ml-comercial-germer', 'pote-de-petisco-200-ml-germer-4954c39dfa343b3af817619327818967'],
  miniCopo: ['Mini Copo Germer Finger Food 80 ml Porcelana Branca Comercial', '9,90', null, 'mini-copo-80ml-finger-food-comercial-porcelana-germer', 'photoroom_20250728_184943-7b1ed9276494df5f1017537393963503'],
  portaSaches: ['Porta Sachês Cerejeira', '9,90', null, 'porta-saches-cerejeira-7416', 'porta-saches-cerejeira-7416-9df4cecc0cd3d19f3d17522547080640'],
  ramequim: ['Tigela Ramequim 190 ml Refratária Porcelana Classic 6753', '9,90', null, 'ramequim-190ml-refrataria', 'tigela-ramequim-porcelana-classic-todos-os-tamanhos-lyor-1551f745677984e23f17531199907038'],
  sacaRolha: ['Abridor Saca-Rolha e Garrafas Inox Borgonha SL0254', '9,90', null, 'saca-rolha-garrafas-inox', 'photoroom_002_20250405_203358-a11b3508b53bef67ba17438961516862'],
  fingerFood: ['Tigela Finger Food Ramequim 60 ml Melamina GX5623', '9,90', null, 'tigela-finger-food-ramequim-60ml-melamina-gx5623', 'photoroom_20250330_112930-4aef52fcaaede0d44b17433449819880'],
  cumbuca: ['Tigela Cumbuca 500 ml Imbuia', null, 'Aguardando reposição', 'tigela-cumbuca-500ml-imbuia', 'tigela-cumbuca-imbuia-500ml-evo-40b1e58347df19ec7517565839793087'],
};

// Prateleiras na ordem e com os títulos da home atual.
const prateleiras = [
  { titulo: 'A partir de R$ 8,10', sub: 'Porcelana branca comercial Germer', link: '/porcelana-branca/', itens: ['pratoPao', 'sobremesaBar', 'sobremesaIguacu', 'rasoBar', 'rasoIguacu', 'microtextura'] },
  { titulo: 'A partir de R$ 1,90', sub: 'Talheres avulsos em aço inox', link: '/utensilios-servir/', itens: ['colherStar', 'garfoOriente', 'garfoEuro', 'colherCafe', 'garfoMadeira', 'colherFortaleza'] },
  { titulo: 'Qualquer peça R$ 9,90', sub: 'Petisqueiras, ramequins e acessórios de mesa', link: '/produtos/', itens: ['pote', 'miniCopo', 'portaSaches', 'ramequim', 'sacaRolha', 'fingerFood'] },
  { titulo: 'Equipamentos', sub: 'Em até 12x no cartão', link: '/equipamentos/', itens: ['mesa', 'misturador', 'cafeteira', 'conservador', 'fritadeira', 'climatizador'] },
];

// Menu da loja atual, com as subcategorias reais.
const linhas = [
  ['Refrigeração Comercial', '/refrigeracao/', ['Ar Condicionados', 'Bebedouros', 'Climatizadores', 'Vitrines Expositoras', 'Freezers Comerciais', 'Expositores Refrigerados']],
  ['Equipamentos Para Gastronomia', '/equipamentos/', ['Balanças Eletrônicas', 'Batedeiras e Misturadores Industriais', 'Buffets Térmico', 'Cafeteiras', 'Chapas Para Lanches', 'Cilindros e Masseiras Profissionais', 'Conservadores de Calor', 'Cortadores de Frios e Legumes', 'Embaladoras e Seladoras', 'Extratores de Sucos', 'Estufas de Salgados', 'Fornos Industriais', 'Fogões Industriais', 'Fritadeiras Profissionais', 'Liquidificadores Industriais', 'Máquinas para Lanches e Eventos', 'Mesas de Inox', 'Processadores de Alimentos', 'Refresqueiras, Chocolateiras e Torres de Chopp', 'Serras Fita e Moedores Profissionais', 'Ventiladores e Exaustores']],
  ['Porcelana, Cerâmica e Melamina', '/porcelana-branca/', ['Pratos', 'Xícaras e Canecas', 'Acessórios de Mesa', 'Bowls e Tigelas', 'Travessas e Caçarolas']],
  ['Utensílios Profissionais de Servir', '/utensilios-servir/', ['Talheres Avulsos', 'Taças e Copos', 'Acessórios Para Servir', 'Utensílios de Bar', 'Térmicos']],
  ['Utensílios de Cozinha Profissional', '/cozinha-profissional/', ['Caixas e Cubas GN', 'Facas', 'Formas e Assadeiras', 'Panelas', 'Potes e Recipientes', 'Utensílios Profissionais', 'Promoções']],
  ['Organização e Higiene', '/limpeza/', ['Acessórios de Banheiro e Higiene', 'Organização e Descarte']],
];

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const foto = f => `${CDN}${f}-640-0.webp`;
const busca = termo => `${LOJA}/search/?q=${encodeURIComponent(termo)}`;
const img = (arquivo, alt, extra = '') => `<img src="${foto(arquivo)}" alt="${esc(alt)}" loading="lazy" onerror="this.classList.add('sem')"${extra}>`;
// 5% de desconto no PIX, como a loja anuncia.
const pix = preco => {
  const v = Number(preco.replace(/\./g, '').replace(',', '.')) * 0.95;
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const card = chave => {
  const [nome, preco, parcela, slug, arquivo] = P[chave];
  const url = `${LOJA}/produtos/${slug}/`;
  return `
      <article class="prod">
        <a class="foto" href="${url}">${img(arquivo, nome)}</a>
        <a class="nome" href="${url}">${esc(nome)}</a>
        ${preco ? `<p class="preco">R$ ${preco}</p>
        <p class="pix"><b>R$ ${pix(preco)}</b> no PIX</p>
        <p class="parc">${parcela ? esc(parcela) : '&nbsp;'}</p>` : `<p class="preco consulta">${parcela ? esc(parcela) : 'Sob consulta'}</p>
        <p class="pix">&nbsp;</p><p class="parc">&nbsp;</p>`}
        ${preco ? `<a class="comprar" href="${url}">Comprar</a>` : `<a class="comprar zap" href="${ZAP}">Consultar no WhatsApp</a>`}
      </article>`;
};

const prateleira = p => `
  <section class="prateleira">
    <div class="in">
      <header class="cab"><div><h2>${esc(p.titulo)}</h2><p>${esc(p.sub)}</p></div><a href="${LOJA}${p.link}">Ver todos</a></header>
      <div class="grade">${p.itens.map(card).join('')}
      </div>
    </div>
  </section>`;

const icone = {
  entrega: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  pix: '<path d="M12 3l9 9-9 9-9-9z"/><path d="M8.5 12h7"/>',
  cartao: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h4"/>',
  zap: '<path d="M4 20l1.2-3.6A8 8 0 1 1 8 19.1z"/><path d="M9 9.5c.3 2.2 2.3 4.3 4.6 4.8l1-1.1 1.9.8-.4 1.6c-3.6.4-7.6-3.4-7.3-7l1.6-.5.9 1.8z"/>',
};
const svg = d => `<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Engefrio · Equipamentos e Utensílios Para Gastronomia</title>
<meta name="description" content="Há 50 anos liderando em equipamentos de gastronomia, refrigeração e utensílios para cozinha industrial.">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#e60000">
<meta property="og:type" content="website">
<meta property="og:title" content="Engefrio · Equipamentos e Utensílios Para Gastronomia">
<meta property="og:description" content="Há 50 anos liderando em equipamentos de gastronomia, refrigeração e utensílios para cozinha industrial.">
<meta property="og:url" content="https://engefrio.overtus.com.br/">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/engefrio.css">
</head>
<body>

<div class="aviso"><div class="in">
  <span>Entregamos em todo o Brasil · Retirada grátis na loja em Recife</span>
  <span><a href="${ZAP}">WhatsApp (81) 98150-2434</a> · <a href="tel:+558134454545">(81) 3445-4545</a> · Seg a sex 8h às 18h, sáb 8h às 14h</span>
</div></div>

<header class="topo">
  <div class="in">
    <button class="menu-btn" type="button" aria-label="Abrir menu" aria-expanded="false"><span></span><span></span><span></span></button>
    <a class="marca" href="/"><img src="${LOGO}" alt="Engefrio" onerror="this.replaceWith(Object.assign(document.createElement('b'),{textContent:'ENGEFRIO'}))"></a>
    <form class="busca" action="${LOJA}/search/" method="get" role="search">
      <input type="search" name="q" placeholder="O que você está buscando?" aria-label="Buscar produtos">
      <button type="submit" aria-label="Buscar"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg></button>
    </form>
    <nav class="conta">
      <a href="${ZAP}" class="atend">${svg(icone.zap)}<span>Atendimento<b>WhatsApp</b></span></a>
      <a href="${LOJA}/account/login/" class="entrar"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.2-3.8 4-5.5 7.5-5.5s6.3 1.7 7.5 5.5"/></svg><span>Minha conta<b>Entrar</b></span></a>
      <a href="${LOJA}/comprar/" class="carrinho" aria-label="Carrinho"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 4h2.5l2.2 11h10.6L20.5 7H7"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg><i>0</i></a>
    </nav>
  </div>
  <nav class="linhas" aria-label="Categorias">
    <ul class="in">${linhas.map(([n, h, subs]) => `
      <li><a href="${LOJA}${h}">${n}</a>
        <div class="sub"><ul>${subs.map(s => `<li><a href="${busca(s)}">${s}</a></li>`).join('')}</ul><a class="todos" href="${LOJA}${h}">Ver tudo em ${n}</a></div></li>`).join('')}
    </ul>
  </nav>
</header>

<main>
  <section class="banner">
    <div class="in">
      <div class="texto">
        <span class="selo">Desde 1975</span>
        <h1>Há 50 anos liderando em equipamentos de gastronomia</h1>
        <p>Refrigeração, equipamentos e utensílios para bares, hotéis, restaurantes, padarias e cozinhas industriais. Fabricantes líderes, entrega em todo o Brasil.</p>
        <div class="botoes"><a class="btn" href="${LOJA}/equipamentos/">Ver equipamentos</a><a class="btn claro" href="${ZAP}">Fazer orçamento</a></div>
      </div>
      <div class="vitrine">
        <a href="${LOJA}/produtos/${P.conservador[3]}/" class="v1">${img(P.conservador[4], P.conservador[0])}</a>
        <a href="${LOJA}/produtos/${P.fritadeira[3]}/" class="v2">${img(P.fritadeira[4], P.fritadeira[0])}</a>
        <a href="${LOJA}/produtos/${P.cafeteira[3]}/" class="v3">${img(P.cafeteira[4], P.cafeteira[0])}</a>
      </div>
    </div>
  </section>

  <section class="beneficios"><ul class="in">
    <li>${svg(icone.entrega)}<div><b>Entrega rápida</b>Entregamos em todo o Brasil</div></li>
    <li>${svg(icone.pix)}<div><b>5% de desconto</b>Pagamentos no PIX</div></li>
    <li>${svg(icone.cartao)}<div><b>Parcele suas compras</b>Em até 12 vezes</div></li>
    <li>${svg(icone.zap)}<div><b>Atendimento VIP</b>Chame no WhatsApp</div></li>
  </ul></section>

  <section class="categorias"><div class="in">
    <a href="${LOJA}/utensilios-servir/">${img(P.garfoMadeira[4], 'Utensílios de servir')}<span><small>Utensílios</small>Profissionais de Servir<i>Ver produtos</i></span></a>
    <a href="${LOJA}/refrigeracao/">${img(P.climatizador[4], 'Refrigeração comercial')}<span><small>Refrigeração</small>Comercial<i>Ver produtos</i></span></a>
    <a href="${LOJA}/porcelana-branca/">${img(P.microtextura[4], 'Porcelana branca')}<span><small>Porcelana</small>Cerâmica e Melamina<i>Ver produtos</i></span></a>
  </div></section>
${prateleira(prateleiras[0])}
${prateleira(prateleiras[1])}

  <section class="sobre"><div class="in">
    <div class="ano"><b>1975</b><span>Fundada em Recife por Elpídio Martins</span></div>
    <div class="txt">
      <h2>Tradição e autoridade no mercado gastronômico</h2>
      <p>A história da Engefrio se confunde com a evolução da gastronomia profissional no Brasil. Com mais de cinco décadas de experiência ininterrupta, oferecemos o que há de mais moderno em equipamentos para bares, hotéis, restaurantes, padarias e cozinhas industriais.</p>
      <blockquote>“Você não precisa ser o maior no que faz, mas precisa sempre ser o melhor.”<cite>Elpídio Martins, fundador</cite></blockquote>
      <a class="link" href="${LOJA}/quem-somos-engefrio/">Conheça a Engefrio</a>
    </div>
  </div></section>
${prateleira(prateleiras[2])}
${prateleira(prateleiras[3])}

  <section class="mapa"><div class="in">
    <h2>Compre por categoria</h2>
    <div class="cols">${linhas.map(([n, h, subs]) => `
      <div><a class="t" href="${LOJA}${h}">${n}</a><ul>${subs.slice(0, 8).map(s => `<li><a href="${busca(s)}">${s}</a></li>`).join('')}${subs.length > 8 ? `<li><a class="mais" href="${LOJA}${h}">+ ${subs.length - 8} categorias</a></li>` : ''}</ul></div>`).join('')}
    </div>
  </div></section>

  <section class="loja-fisica"><div class="in">
    <div>
      <h2>Visite a nossa loja em Recife</h2>
      <p>Av. Abdias de Carvalho, 1111 · Recife/PE · CEP 50751-000</p>
      <p>Segunda a sexta, 8h às 18h · Sábado, 8h às 14h</p>
      <p>Compre pelo site e retire grátis na loja.</p>
    </div>
    <div class="acoes">
      <a class="btn" href="${ZAP}">Falar no WhatsApp</a>
      <a class="btn claro" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Engefrio, Av. Abdias de Carvalho, 1111, Recife')}">Como chegar</a>
    </div>
  </div></section>
</main>

<footer class="rodape">
  <div class="in cols">
    <div class="marca-rod">
      <img src="${LOGO}" alt="Engefrio" onerror="this.remove()">
      <p>Há 50 anos liderando em equipamentos de gastronomia, refrigeração e utensílios para cozinha industrial.</p>
      <ul class="redes">
        <li><a href="https://www.instagram.com/engefrio/">Instagram</a></li>
        <li><a href="https://www.facebook.com/engefriocom">Facebook</a></li>
        <li><a href="https://www.youtube.com/results?search_query=engefrio">YouTube</a></li>
        <li><a href="https://www.linkedin.com/search/results/companies/?keywords=engefrio">LinkedIn</a></li>
      </ul>
    </div>
    <div><h3>Institucional</h3><ul>
      <li><a href="${LOJA}/quem-somos-engefrio/">Quem Somos</a></li>
      <li><a href="${LOJA}/como-pagar-na-engefrio/">Forma de Pagamento</a></li>
      <li><a href="${LOJA}/politica-de-entrega/">Entrega</a></li>
      <li><a href="${LOJA}/trocas-e-devolucoes/">Trocas e Devoluções</a></li>
      <li><a href="${LOJA}/privacidade/">Privacidade</a></li>
      <li><a href="${LOJA}/faca-parte-da-nossa-equipe/">Trabalhe Conosco</a></li>
      <li><a href="${LOJA}/contato/">Fale Conosco</a></li>
    </ul></div>
    <div><h3>Categorias</h3><ul>${linhas.map(([n, h]) => `<li><a href="${LOJA}${h}">${n}</a></li>`).join('')}</ul></div>
    <div><h3>Atendimento</h3><ul class="contato">
      <li><a href="${ZAP}">WhatsApp (81) 98150-2434</a></li>
      <li><a href="tel:+558134454545">Telefone (81) 3445-4545</a></li>
      <li>Seg a sex, 8h às 18h<br>Sábado, 8h às 14h</li>
      <li>Av. Abdias de Carvalho, 1111<br>Recife/PE · CEP 50751-000</li>
    </ul></div>
  </div>
  <div class="in pagamentos">
    <span>Formas de pagamento</span>
    <ul>${['PIX', 'Visa', 'Mastercard', 'Amex', 'Elo', 'Hipercard', 'Boleto'].map(f => `<li>${f}</li>`).join('')}</ul>
  </div>
  <div class="base"><div class="in">
    <span>Engefrio Industrial Ltda · CNPJ 10.064.798/0001-99 · Copyright © 2026 · Todos os direitos reservados</span>
  </div></div>
</footer>

<script>
  const btn = document.querySelector('.menu-btn');
  btn.addEventListener('click', () => {
    const aberto = document.body.classList.toggle('menu-aberto');
    btn.setAttribute('aria-expanded', aberto);
  });
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(aqui, '../public/index.html'), html);
console.log('engefrio: public/index.html gerado');
