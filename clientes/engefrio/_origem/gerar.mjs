// Gera clientes/engefrio/public/index.html a partir dos dados reais da loja (engefrio.com.br, lidos em 2026-10-09).
// Fotos e logo vêm direto do CDN da loja atual (Nuvemshop). Rodar: node clientes/engefrio/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const LOJA = 'https://engefrio.com.br';
const CDN = 'https://acdn-us.mitiendanube.com/stores/002/716/239/products/';
const LOGO = 'https://acdn-us.mitiendanube.com/stores/002/716/239/themes/common/logo-740995517-1674132118-058576f5d0df4b8a10def79dd271a91b1674132119.png?0';

// Prateleiras da home atual, na mesma ordem e com os mesmos títulos.
const prateleiras = [
  { id: 'equipamentos', titulo: 'Equipamentos', link: '/equipamentos/', itens: [
    ['Conservador de Proteínas Marchesoni com 4 Cubas GN MarPro 220V', '3.723,90', '12x de R$ 349,43', 'conservador-proteinas-4cubas-marchesoni', 'conservador-de-proteinas-marchesoni-06d4cde8873009a28917533630308278'],
    ['Fritadeira Industrial Água e Óleo Marchesoni 25L Gabinete 220V', '2.260,00', '12x de R$ 212,06', 'fritadeira-agua-oleo-25l-marchesoni', 'fritadeira-eletrica-agua-oleo-25l-profissional-ft2252g-marchesoni-a39f8f6ebdf9d24aae17621995742274'],
    ['Cafeteira Profissional Marchesoni Master 2L 220V', '1.332,90', '12x de R$ 125,07', 'cafeteira-2l-eletrica-marchesoni', 'cafeteira-master-2-litros-marchesoni-a31dc2d6955962e86f17524322137564'],
    ['Misturador de Doces 7L Elétrico PRMOG-07 Progás', '2.905,00', '12x de R$ 272,59', 'misturador-doces-7l-progas', 'misturador-7-l-1-9cdf89290da128e70a17676363114705'],
    ['Mesa Térmica Fria Vidro Temperado LC1708 Le Cook', '947,90', '12x de R$ 88,94', 'mesa-termica-fria-le-cook', 'mesa-termica-fria-le-cook-85171a17f60e4b2d1517667710922335'],
    ['Climatizador de Ar 45L PRO Ventisol 210W CLI45PR', null, 'Fale com a gente no WhatsApp', 'climatizador-de-ar-45l-pro-ventisol-210w', 'climatizador-de-ar-45l-pro-ventisol-210w-a8c43786d615a5b93517787643406358'],
  ]},
  { id: 'porcelana', titulo: 'Porcelana a partir de R$ 8,10', link: '/porcelana-branca/', itens: [
    ['Prato Pão e Pintura Germer Coup Porcelana Branca Comercial', '8,10', null, 'prato-pao-coup-porcelana', 'prato-raso-coup-germer-1-30b055c355d2051b0717425983412574'],
    ['Prato Raso Bar Hotel Germer 24 cm Porcelana Branca Comercial', '14,00', null, 'prato-raso-bar-hotel-germer', 'prato-raso-24cm-comercial-bar-hotel-germer-49fc824e8d5daa1dc717446394521773'],
    ['Prato Raso Germer Iguaçu 25,5 cm Porcelana Branca Comercial', '14,00', null, 'prato-raso-255cm-comercial-iguacu-germer', 'prato-raso-255cm-comercial-iguacu-germer-366f1049166d9b43aa17446396450821'],
    ['Prato Raso Germer Microtextura 29 cm Porcelana Branca Comercial', '14,90', null, 'prato-raso-microtextura-germer', 'prato-raso-microtextura-germer-c060db796f9f14781a17386108932915'],
  ]},
  { id: 'talheres', titulo: 'Talheres a partir de R$ 1,90', link: '/utensilios-servir/', itens: [
    ['Garfo Mesa Cabo Madeira Tradição Di Solle Avulso', '10,90', null, 'garfo-mesa-cabo-madeira-disole', 'garfo-mesa-cabo-madeira-disole-91b7801d73c9cdab8417664236296786'],
    ['Colher Mesa Fortaleza Oxford Aço Inox Avulso', '10,90', null, 'colher-mesa-fortaleza-oxford', 'colher-mesa-salvador-oxford-8a8b11a605ea8f6ed317691143847996'],
    ['Colher Café Salvador Oxford Aço Inox Avulso', '9,90', null, 'colher-cafe-salvador-inox', 'colher-cafe-salvador-oxford-f406027df4a9bc49ab17691070173300'],
  ]},
  { id: 'r990', titulo: 'Qualquer peça R$ 9,90', link: '/produtos/', itens: [
    ['Pote Petisco Germer 200 ml Porcelana Branca Comercial', '9,90', null, 'pote-de-petisco-200ml-comercial-germer', 'pote-de-petisco-200-ml-germer-4954c39dfa343b3af817619327818967'],
    ['Mini Copo Germer Finger Food 80 ml Porcelana Branca Comercial', '9,90', null, 'mini-copo-80ml-finger-food-comercial-porcelana-germer', 'photoroom_20250728_184943-7b1ed9276494df5f1017537393963503'],
    ['Tigela Ramequim 190 ml Refratária Porcelana Classic', '9,90', null, 'ramequim-190ml-refrataria', 'tigela-ramequim-porcelana-classic-todos-os-tamanhos-lyor-1551f745677984e23f17531199907038'],
    ['Abridor Saca-Rolha e Garrafas Inox Borgonha', '9,90', null, 'saca-rolha-garrafas-inox', 'photoroom_002_20250405_203358-a11b3508b53bef67ba17438961516862'],
  ]},
];

const linhas = [
  ['Refrigeração Comercial', '/refrigeracao/'],
  ['Equipamentos Para Gastronomia', '/equipamentos/'],
  ['Porcelana, Cerâmica e Melamina', '/porcelana-branca/'],
  ['Utensílios Profissionais de Servir', '/utensilios-servir/'],
  ['Utensílios de Cozinha Profissional', '/cozinha-profissional/'],
  ['Organização e Higiene', '/limpeza/'],
];

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const foto = f => `${CDN}${f}-640-0.webp`;

const card = ([nome, preco, parcela, slug, img]) => `
        <a class="prod" href="${LOJA}/produtos/${slug}/">
          <span class="foto"><img src="${foto(img)}" alt="${esc(nome)}" loading="lazy" onerror="this.parentNode.classList.add('sem')"></span>
          <span class="nome">${esc(nome)}</span>
          <span class="preco">${preco ? `R$ ${preco}` : 'Sob consulta'}</span>
          <span class="parc">${parcela ? esc(parcela) : 'à vista'}</span>
        </a>`;

const abas = prateleiras.map((p, i) => `<button type="button" role="tab" aria-selected="${i === 0}" aria-controls="p-${p.id}" id="t-${p.id}">${esc(p.titulo)}</button>`).join('');
const paineis = prateleiras.map((p, i) => `
      <div class="painel" role="tabpanel" id="p-${p.id}" aria-labelledby="t-${p.id}"${i ? ' hidden' : ''}>${p.itens.map(card).join('')}
        <a class="prod mais" href="${LOJA}${p.link}"><span>Ver todos</span><small>${esc(p.titulo.replace(/ a partir.*| R\$.*/, ''))}</small></a>
      </div>`).join('');


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

<header class="topo">
  <div class="in">
    <a class="marca" href="/"><img src="${LOGO}" alt="Engefrio" onerror="this.replaceWith(Object.assign(document.createElement('b'),{textContent:'ENGEFRIO'}))"></a>
    <form class="busca" action="${LOJA}/search/" method="get" role="search">
      <input type="search" name="q" placeholder="O que você procura?" aria-label="Buscar produtos">
      <button type="submit" aria-label="Buscar"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg></button>
    </form>
    <nav class="conta">
      <a href="https://wa.me/5581981502434" class="zap"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z"/></svg><span>(81) 98150-2434<small>Atendimento VIP</small></span></a>
      <a href="${LOJA}/account/login/">Entrar</a>
      <a href="${LOJA}/comprar/" class="carrinho" aria-label="Carrinho"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 4h2.5l2.2 11h10.6L20.5 7H7"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg></a>
    </nav>
  </div>
  <nav class="linhas"><ul>${linhas.map(([n, h]) => `<li><a href="${LOJA}${h}">${n}</a></li>`).join('')}</ul></nav>
</header>

<main class="miolo">
  <section class="chamada">
    <small>Desde 1975 · Recife</small>
    <h1>Há 50 anos liderando em equipamentos de gastronomia</h1>
    <p>Refrigeração, equipamentos e utensílios para bares, hotéis, restaurantes, padarias e cozinhas industriais.</p>
    <a class="btn" href="${LOJA}/equipamentos/">Ver equipamentos</a>
    <ul class="beneficios">
      <li><b>Entrega rápida</b>Entregamos em todo o Brasil</li>
      <li><b>5% de desconto</b>Pagamentos no PIX</li>
      <li><b>Parcele suas compras</b>Em até 12 vezes</li>
      <li><b>Atendimento VIP</b>Chame no WhatsApp</li>
    </ul>
  </section>

  <section class="prateleira">
    <div class="abas" role="tablist">${abas}</div>${paineis}
  </section>
</main>

<footer class="rodape">
  <span>Av. Abdias de Carvalho, 1111 · Recife/PE · (81) 3445-4545 · seg a sex 8h às 18h, sáb 8h às 14h</span>
  <span>Engefrio Industrial Ltda · CNPJ 10.064.798/0001-99</span>
</footer>

<script>
  document.querySelectorAll('.abas button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.abas button').forEach(x => x.setAttribute('aria-selected', x === b));
    document.querySelectorAll('.painel').forEach(p => p.hidden = p.id !== b.getAttribute('aria-controls'));
  }));
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(aqui, '../public/index.html'), html);
console.log('engefrio: public/index.html gerado');
