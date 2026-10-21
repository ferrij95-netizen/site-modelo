// Monta as páginas das versões A ("Tradição": topo branco com a barra vermelha do site atual, foto aérea da fábrica)
// e B ("Descanso": produto em primeiro plano, buscador de colchão e corte do colchão por camadas).
// As páginas internas usam o mesmo conteúdo; muda o topo, a home e o estilo. Estilos em public/assets/{base,a,b}.css.
import { empresa as E, historia, industrial, laboratorio, estados, produtos, destaques, niveis, camadasImperial } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const foto = p => img(`produtos/${p.img}`, `${p.nome}, ${p.subtitulo}`, ' width="1000" height="667"');
const wa = msg => `https://wa.me/${E.whatsapp}?text=${encodeURIComponent(msg)}`;

export const nomesVersao = { a: 'Tradição', b: 'Descanso' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'Quem somos', caminho: 'empresa/' },
  { slug: 'colchoes', nome: 'Linha colchões', caminho: 'colchoes/' },
  { slug: 'industrial', nome: 'Linha industrial', caminho: 'industrial/' },
  { slug: 'qualidade', nome: 'Laboratório', caminho: 'qualidade/' },
  { slug: 'representantes', nome: 'Representantes', caminho: 'representantes/' },
  { slug: 'assistencia', nome: 'Assistência técnica', caminho: 'assistencia/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  wa: '<path d="M20.5 3.5A11 11 0 003.4 17.2L2 22l4.9-1.3A11 11 0 0020.5 3.5zM12 20.1a9 9 0 01-4.6-1.3l-.3-.2-2.9.8.8-2.8-.2-.3A9.1 9.1 0 1112 20.1zm5-6.8c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.9 1-.3.2-.6.1a7.4 7.4 0 01-3.7-3.2c-.3-.5.3-.5.8-1.6a.5.5 0 000-.5l-.9-2c-.2-.6-.5-.5-.6-.5h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 11.9 11.9 0 004.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 001.8-1.3 2.3 2.3 0 00.2-1.3c-.1-.1-.3-.2-.5-.3z" fill="currentColor" stroke="none"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
  peso: '<path d="M6 8h12l2 12H4z"/><circle cx="12" cy="5" r="2"/>',
  camadas: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  regua: '<path d="M4 20L20 4"/><path d="M8 16l-2-2M11 13l-2-2M14 10l-2-2M17 7l-2-2"/>',
  ferramenta: '<path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
  mapa: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  maleta: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/>',
  play: '<path d="M8 5l11 7-11 7z"/>',
  filtro: '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
};
const icone = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// ---------- moldura ----------
function head(v, p, titulo, descricao) {
  const url = `${E.url}${v}/${p}`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#991c1f">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Probon Colchões">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,500..900&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
`;
}

const logo = (v, branco = false) => `<a class="marca" href="/${v}/" aria-label="Probon Colchões & Polímeros, página inicial"><img src="/assets/img/${branco ? 'logo-branco' : 'logo'}.png" alt="Probon Colchões & Polímeros" width="800" height="266"></a>`;

function cabecalho(v, ativa) {
  const links = nav.map(p => `<a href="/${v}/${p.caminho}"${p.slug === ativa ? ' aria-current="page"' : ''}>${p.nome}</a>`).join('');
  const botao = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span><b class="sr">Menu</b></button>`;
  if (v === 'a') return `<header class="topo">
<div class="topo-marca"><div class="in">
  ${logo(v)}
  <div class="contatos">
    <a href="${wa('Olá! Vim pelo site da Probon.')}" target="_blank" rel="noopener">${icone('wa', 'ic-s')}<span><small>WhatsApp</small>${E.whatsappTxt}</span></a>
    <a href="tel:${E.telefoneHref}">${icone('tel', 'ic-s')}<span><small>Telefone</small>${E.telefone}</span></a>
    <a href="mailto:${E.email}">${icone('mail', 'ic-s')}<span><small>E-mail</small>${E.email}</span></a>
  </div>
  <div class="desde"><b>${E.fundacao}</b><span>desde</span></div>
  ${botao}
</div></div>
<nav id="menu" class="menu" aria-label="Principal"><div class="in">${links}<a class="menu-extra" href="${E.trabalhe}" target="_blank" rel="noopener">Trabalhe conosco</a></div></nav>
</header>
<main id="conteudo">
`;
  return `<header class="topo"><div class="in">
  ${logo(v)}
  <nav id="menu" class="menu" aria-label="Principal">${links}<a class="btn btn-cta menu-cta" href="/b/representantes/">Onde comprar</a></nav>
  ${botao}
</div></header>
<main id="conteudo">
`;
}

function rodape(v) {
  return `</main>
<footer class="rodape"><div class="in rodape-grid">
  <div class="rodape-marca">${logo(v, true)}<p>${historia.intro}</p><a class="rede" href="${E.instagram}" target="_blank" rel="noopener">${icone('insta', 'ic-s')}@proboncolchoes</a></div>
  <div><h3>Fale com a Probon</h3><ul class="lista-contato">
    <li><a href="tel:${E.telefoneHref}">${icone('tel', 'ic-s')}${E.telefone}</a></li>
    <li><a href="${wa('Olá! Vim pelo site da Probon.')}" target="_blank" rel="noopener">${icone('wa', 'ic-s')}${E.whatsappTxt}</a></li>
    <li><a href="mailto:${E.email}">${icone('mail', 'ic-s')}${E.email}</a></li>
    <li>${icone('pin', 'ic-s')}<span>${E.rua}<br>${E.bairro}<br>CEP ${E.cep}, ${E.cidade}</span></li>
  </ul></div>
  <div><h3>Navegue</h3><ul>${nav.slice(1).map(p => `<li><a href="/${v}/${p.caminho}">${p.nome}</a></li>`).join('')}<li><a href="${E.trabalhe}" target="_blank" rel="noopener">Trabalhe conosco</a></li></ul></div>
</div>
<div class="rodape-base"><div class="in"><span>© ${new Date().getFullYear()} ${E.razao} · CNPJ ${E.cnpj}</span><span>Site por Overtus</span></div></div>
</footer>
<a class="wa-flut" href="${wa('Olá! Vim pelo site da Probon.')}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icone('wa')}</a>
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

const pagina = (v, slug, caminho, titulo, desc, corpo) => head(v, caminho, titulo, desc) + cabecalho(v, slug) + corpo + rodape(v);

function topoPagina(v, { eyebrow, titulo, texto, fotoN, migalha }) {
  const trilha = `<nav class="migalha" aria-label="Você está em"><a href="/${v}/">Home</a><span>/</span>${migalha ? `${migalha}<span>/</span>` : ''}<span aria-current="page">${esc(eyebrow)}</span></nav>`;
  if (v === 'a') return `<section class="ph" style="--foto:url('/assets/img/${fotoN}.webp')"><div class="in">${trilha}<p class="eyebrow">${esc(eyebrow)}</p><h1>${titulo}</h1>${texto ? `<p class="lead">${texto}</p>` : ''}</div></section>`;
  return `<section class="ph"><div class="in ph-grid"><div>${trilha}<p class="eyebrow">${esc(eyebrow)}</p><h1>${titulo}</h1>${texto ? `<p class="lead">${texto}</p>` : ''}</div><figure class="ph-foto">${img(fotoN, '')}</figure></div><svg class="onda" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 C 360 0, 1080 70, 1440 18" fill="none" stroke="currentColor" stroke-width="3"/></svg></section>`;
}

// Escala de conforto: 5 níveis, marca o do produto.
const escala = p => p.nivel < 0 ? '' : `<div class="escala" aria-label="Conforto ${p.conforto}"><span class="escala-rot">Conforto</span><ol>${niveis.map((n, i) => `<li${i === p.nivel ? ' class="on"' : ''}><i></i><small>${n}</small></li>`).join('')}</ol></div>`;

const itemProduto = (v, p) => `<a class="prod" href="/${v}/colchoes/${p.slug}/" data-tipo="${esc(p.tipo)}" data-linha="${p.linha}" data-conforto="${p.nivel}" data-kg="${p.kg}" data-tags="${esc(p.tags.join('|'))}">
  <figure>${foto(p)}${p.linha === 'Sonho' ? '<span class="selo-linha">Linha Sonho</span>' : ''}</figure>
  <div class="prod-txt"><p class="prod-tipo">${esc(p.subtitulo)}</p><h3>${esc(p.nome)}</h3>
  <ul class="prod-fatos">${p.conforto ? `<li>${p.conforto}</li>` : ''}${p.kg ? `<li>até ${p.kg} kg</li>` : ''}${p.medida ? `<li>${esc(p.medida)}</li>` : ''}</ul></div>
</a>`;

const ctaLojista = v => `<section class="cta-loja"><div class="in cta-grid">
  <div><p class="eyebrow">Para lojistas e revendas</p><h2>Leve os colchões Probon para a sua loja</h2><p>Atendemos lojistas pelo comercial e pela rede de representantes. Fale com a gente e receba o catálogo e as condições.</p></div>
  <div class="botoes"><a class="btn btn-cta" href="${wa('Olá! Sou lojista e quero revender colchões Probon.')}" target="_blank" rel="noopener">${icone('wa', 'ic-s')}Quero revender</a><a class="btn btn-linha" href="/${v}/representantes/">Encontrar representante</a></div>
</div></section>`;

// ---------- homes ----------
function homeA() {
  const v = 'a';
  const etapas = [
    ['Espumação contínua', 'Blocos de espuma no sistema MaxFoam, sem variação de densidade.', 'espumacao'],
    ['Corte em 3D', 'Corte automático CNC de blocos, peças e lâminas, sem desperdício.', 'corte-3d'],
    ['Molejo ensacado', 'Molas de aço endurecido ensacadas uma a uma, aqui mesmo.', 'molejo-ensacado'],
    ['Laboratório', 'Densidade, DPC, indentação e compressão das molas em cada lote.', 'lab-7'],
    ['Colchão Probon', 'Montado, etiquetado e certificado pelo Inmetro.', 'produtos/102'],
  ];
  return `<section class="hero" style="--foto:url('/assets/img/fabrica-aerea.webp')"><div class="in">
  <p class="eyebrow">Colchões &amp; polímeros · Frederico Westphalen (RS)</p>
  <h1>Mais conforto para a sua vida.</h1>
  <p class="lead">${historia.intro}</p>
  <div class="botoes"><a class="btn btn-cta" href="/a/colchoes/">Conheça os colchões ${icone('seta', 'ic-s')}</a><a class="btn btn-claro" href="/a/industrial/">Linha industrial</a></div>
</div>
<div class="hero-faixa"><div class="in">
  <div><b>${E.fundacao}</b><span>fundada em Frederico Westphalen</span></div>
  <div><b>${produtos.length}</b><span>modelos na linha de colchões</span></div>
  <div><b>MaxFoam</b><span>espumação contínua própria</span></div>
  <div><b>Inmetro</b><span>colchões de espuma certificados</span></div>
</div></div></section>

<section class="secao"><div class="in">
  <div class="cab"><p class="eyebrow">O que fabricamos</p><h2>Duas linhas, a mesma fábrica</h2></div>
  <div class="duas-linhas">
    <a class="linha-bloco" href="/a/colchoes/">${img('produtos/79', 'Conjunto box Diamond')}<div><span class="num">01</span><h3>Linha colchões</h3><p>Conjuntos box, colchões de molas ensacadas e de espuma, base baú, cama auxiliar e colchão infantil, nas linhas Probon e Sonho.</p><span class="link-seta">Ver os ${produtos.length} modelos ${icone('seta', 'ic-s')}</span></div></a>
    <a class="linha-bloco" href="/a/industrial/">${img('espumas-linha', 'Espumas Probon em várias densidades e cores')}<div><span class="num">02</span><h3>Linha industrial</h3><p>Blocos de espuma contínua, peças e lâminas sob medida, corte em 3D, espuma cilíndrica e molejo ensacado para colchões e estofados.</p><span class="link-seta">Ver a linha industrial ${icone('seta', 'ic-s')}</span></div></a>
  </div>
</div></section>

<section class="secao secao-cinza"><div class="in">
  <div class="cab cab-linha"><div><p class="eyebrow">Destaques</p><h2>Colchões para cada jeito de dormir</h2></div><a class="link-seta" href="/a/colchoes/">Todos os colchões ${icone('seta', 'ic-s')}</a></div>
  <div class="prateleira" data-arrasta>${destaques.map(p => itemProduto(v, p)).join('')}</div>
</div></section>

<section class="etapas-sec"><div class="in">
  <div class="cab claro"><p class="eyebrow">Feito do começo ao fim na Probon</p><h2>Do bloco de espuma ao colchão</h2><p>A Probon fabrica a espuma, corta, ensaca as molas e testa cada lote no próprio laboratório antes de montar o colchão.</p></div>
  <ol class="etapas">${etapas.map(([t, d, f], i) => `<li><figure>${img(f, t)}</figure><span class="etapa-n">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>

<section class="secao"><div class="in historia-a">
  <figure class="historia-foto">${img('fabrica-projeto', 'Projeto da fábrica Probon em Frederico Westphalen')}<figcaption>Projeto da expansão da fábrica em Frederico Westphalen (RS).</figcaption></figure>
  <div><p class="eyebrow">Quem somos</p><h2>Uma empresa de família desde 1989</h2>
  <ol class="linha-tempo">${historia.marcos.map(m => `<li><b>${m.ano}</b><div><h3>${m.titulo}</h3><p>${m.texto.split('. ').slice(0, 2).join('. ').replace(/\.?$/, '.')}</p></div></li>`).join('')}</ol>
  <a class="link-seta" href="/a/empresa/">Nossa história ${icone('seta', 'ic-s')}</a></div>
</div></section>
${ctaLojista(v)}`;
}

function homeB() {
  const v = 'b';
  const heroP = produtos.find(p => p.id === '79');
  const total = camadasImperial.reduce((s, c) => s + c.alt, 0);
  const tipos = [...new Set(produtos.map(p => p.tipo))];
  const porNivel = niveis.map((n, i) => produtos.filter(p => p.nivel === i));
  return `<section class="hero"><div class="in hero-grid">
  <div class="hero-txt">
    <p class="eyebrow">Colchões Probon · desde ${E.fundacao}</p>
    <h1>Mais conforto para a sua vida.</h1>
    <p class="lead">Conjuntos box, colchões de molas ensacadas e de espuma fabricados em Frederico Westphalen (RS), com espuma própria e laboratório de ensaios.</p>
    <form class="buscador" action="/b/colchoes/" method="get">
      <p class="buscador-tit">${icone('filtro', 'ic-s')}Encontre o seu colchão</p>
      <label><span>Tipo</span><select name="tipo"><option value="">Todos</option>${tipos.map(t => `<option>${t}</option>`).join('')}</select></label>
      <label><span>Conforto</span><select name="conforto"><option value="">Qualquer</option>${niveis.map((n, i) => `<option value="${i}">${n}</option>`).join('')}</select></label>
      <label><span>Peso por pessoa</span><select name="kg"><option value="">Qualquer</option><option value="120">até 120 kg</option><option value="130">até 130 kg</option><option value="150">até 150 kg</option><option value="160">até 160 kg</option></select></label>
      <button class="btn btn-cta" type="submit">Ver colchões ${icone('seta', 'ic-s')}</button>
    </form>
  </div>
  <figure class="hero-foto">${foto(heroP)}<figcaption><b>${heroP.nome}</b><span>${heroP.tags[0]} · conforto ${heroP.conforto.toLowerCase()} · até ${heroP.kg} kg</span><a href="/b/colchoes/${heroP.slug}/">Ver ficha ${icone('seta', 'ic-s')}</a></figcaption></figure>
</div></section>

<section class="secao corte"><div class="in corte-grid">
  <div><p class="eyebrow">Por dentro do colchão</p><h2>Imperial, camada por camada</h2><p>Cada colchão Probon tem ficha técnica aberta: densidade das espumas, altura das molas e o peso que ele suporta. O Imperial combina molejo ensacado com lâmina D65 e reforço em EPS, para quem busca firmeza com estrutura reforçada.</p>
    <ul class="fatos-grandes"><li><b>130 kg</b><span>suporte por pessoa</span></li><li><b>25 ou 30 cm</b><span>de altura</span></li><li><b>Firme</b><span>nível de conforto</span></li></ul>
    <a class="btn btn-linha" href="/b/colchoes/imperial/">Ficha completa do Imperial</a></div>
  <div class="camadas" role="img" aria-label="Corte do colchão Imperial em camadas">${camadasImperial.map((c, i) => `<div class="camada c-${c.cor}" style="--alt:${Math.max(c.alt / total * 100, 5).toFixed(1)}%;--i:${i}"><span>${c.nome}</span></div>`).join('')}</div>
</div></section>

<section class="secao secao-cinza"><div class="in">
  <div class="cab centro"><p class="eyebrow">Escolha pelo conforto</p><h2>Do macio ao extra firme</h2><p>Toque no nível de conforto para ver os modelos.</p></div>
  <div class="conforto" data-abas>
    <div class="conforto-trilho" role="tablist">${niveis.map((n, i) => `<button role="tab" id="t-n${i}" aria-controls="n${i}" aria-selected="${i === 3}"><i></i>${n}<small>${porNivel[i].length} modelos</small></button>`).join('')}</div>
    ${porNivel.map((lista, i) => `<div class="aba" role="tabpanel" id="n${i}" aria-labelledby="t-n${i}"${i === 3 ? '' : ' hidden'}><div class="prateleira" data-arrasta>${lista.map(p => itemProduto(v, p)).join('')}</div></div>`).join('')}
  </div>
</div></section>

<section class="secao"><div class="in">
  <div class="cab"><p class="eyebrow">Nossas linhas</p><h2>Probon, Sonho e Base Baú</h2></div>
  <div class="linhas-b">
    <a class="linha-b" href="/b/colchoes/?linha=Probon">${foto(produtos.find(p => p.id === '84'))}<div><h3>Linha Probon</h3><p>${produtos.filter(p => p.linha === 'Probon').length} modelos: conjuntos box com pillow top e molas ensacadas, colchões de espuma do D20 ao AG D65, Cama 3 em 1, cama auxiliar e Baby Sono.</p><span class="link-seta">Ver a linha ${icone('seta', 'ic-s')}</span></div></a>
    <a class="linha-b" href="/b/colchoes/?linha=Sonho">${foto(produtos.find(p => p.id === '58'))}<div><h3>Linha Sonho</h3><p>${produtos.filter(p => p.linha === 'Sonho').length} modelos com tampos de malha de alta gramatura, espuma HR D45 e molas ensacadas 2.0 mm com 180 molas por m².</p><span class="link-seta">Ver a linha ${icone('seta', 'ic-s')}</span></div></a>
    <a class="linha-b" href="/b/colchoes/box-bau/">${foto(produtos.find(p => p.id === '96'))}<div><h3>Base Baú</h3><p>Estrutura em madeira 100% eucalipto, amplo espaço interno e revestimento em linho ou veludo nas cores bege, marrom, cinza e preto.</p><span class="link-seta">Ver o Box Baú ${icone('seta', 'ic-s')}</span></div></a>
  </div>
</div></section>

<section class="fabrica-b"><div class="in fabrica-grid">
  <figure>${img('corte-bloco', 'Bloco de espuma Probon na máquina de corte')}</figure>
  <div><p class="eyebrow">A fábrica</p><h2>A espuma do seu colchão sai daqui</h2><p>${industrial.espumacao.texto} Blocos com acabamento plano, sem variação de densidade e com menos desperdício. A mesma fábrica atende indústrias de estofados e cadeiras com peças, lâminas, corte em 3D e molejo ensacado.</p>
  <ul class="pilulas">${laboratorio.ensaios.map(e => `<li>${e.nome.replace(' (DPC)', '').replace(' (suporte de carga)', '')}</li>`).join('')}</ul>
  <div class="botoes"><a class="btn btn-claro" href="/b/industrial/">Linha industrial</a><a class="btn btn-linha-claro" href="/b/qualidade/">Nosso laboratório</a></div></div>
</div></section>

<section class="secao"><div class="in hist-b">
  <div class="cab"><p class="eyebrow">Quem somos</p><h2>Dos estofados sob medida aos colchões Probon</h2></div>
  <ol class="marcos-b">${historia.marcos.map(m => `<li><b>${m.ano}</b><h3>${m.titulo}</h3><p>${m.texto.split('. ')[0]}.</p></li>`).join('')}</ol>
  <a class="link-seta" href="/b/empresa/">Conheça a história ${icone('seta', 'ic-s')}</a>
</div></section>

<section class="atalhos-b"><div class="in">
  <a href="/b/representantes/">${icone('mapa', 'ic-l')}<span><b>Onde comprar</b>Fale com o representante do seu estado</span>${icone('seta', 'ic-s')}</a>
  <a href="/b/assistencia/">${icone('ferramenta', 'ic-l')}<span><b>Assistência técnica</b>Abra um chamado com a nota fiscal</span>${icone('seta', 'ic-s')}</a>
  <a href="${E.trabalhe}" target="_blank" rel="noopener">${icone('maleta', 'ic-l')}<span><b>Trabalhe conosco</b>Envie seu currículo para a Probon</span>${icone('seta', 'ic-s')}</a>
</div></section>`;
}

// ---------- páginas internas ----------
function empresa(v) {
  return topoPagina(v, { eyebrow: 'Quem somos', titulo: 'Uma empresa de família, desde 1989', texto: historia.intro, fotoN: v === 'a' ? 'fabrica-aerea' : 'fabrica-aerea' }) + `
<section class="secao"><div class="in">
  <ol class="historia-lista">${historia.marcos.map((m, i) => `<li><div class="hl-ano">${m.ano}</div><div><h2>${m.titulo}</h2><p>${m.texto}</p></div>${i === 2 ? `<figure>${img('espumas-linha', 'Espumas Probon')}</figure>` : i === 3 ? `<figure>${img('espumacao', 'Espumação contínua')}</figure>` : ''}</li>`).join('')}</ol>
  <p class="fecho">${historia.fecho}</p>
</div></section>
<section class="secao secao-cinza"><div class="in mv">
  <div><p class="eyebrow">Missão</p><p class="mv-txt">${historia.missao}</p></div>
  <div><p class="eyebrow">Visão</p><p class="mv-txt">${historia.visao}</p></div>
</div></section>
<section class="secao"><div class="in">
  <div class="cab"><p class="eyebrow">A fábrica</p><h2>Projeto da nova planta</h2><p>Imagens do projeto de expansão da fábrica em Frederico Westphalen, com a espumação contínua.</p></div>
  <div class="galeria-3">${[1, 2, 3].map(i => `<figure>${img(`planta-${i}`, 'Projeto da planta Probon')}</figure>`).join('')}</div>
</div></section>
${ctaLojista(v)}`;
}

function catalogo(v) {
  const tipos = [...new Set(produtos.map(p => p.tipo))];
  const conta = (k, val) => produtos.filter(p => p[k] === val).length;
  const chip = (nome, valor, rot, n) => `<label class="chip"><input type="checkbox" name="${nome}" value="${esc(valor)}"><span>${rot}${n != null ? ` <small>${n}</small>` : ''}</span></label>`;
  return topoPagina(v, { eyebrow: 'Linha colchões', titulo: 'Colchões, conjuntos box e base baú', texto: `${produtos.length} modelos nas linhas Probon e Sonho, com ficha técnica completa. Filtre por tipo, conforto e peso.`, fotoN: v === 'a' ? 'banner-sono' : 'produtos/90' }) + `
<section class="secao catalogo-sec"><div class="in catalogo" data-catalogo>
  <button class="btn btn-linha filtros-btn" type="button" aria-expanded="false" aria-controls="filtros">${icone('filtro', 'ic-s')}Filtrar modelos</button>
  <aside class="filtros" id="filtros" aria-label="Filtros">
    <div class="filtro-grupo"><h2>Tipo</h2>${tipos.map(t => chip('tipo', t, t, conta('tipo', t))).join('')}</div>
    <div class="filtro-grupo"><h2>Linha</h2>${['Probon', 'Sonho', 'Base Baú'].map(l => chip('linha', l, l, conta('linha', l))).join('')}</div>
    <div class="filtro-grupo"><h2>Conforto</h2>${niveis.map((n, i) => chip('conforto', i, n, produtos.filter(p => p.nivel === i).length)).join('')}</div>
    <div class="filtro-grupo"><h2>Peso por pessoa</h2><label class="sel"><select name="kg"><option value="">Qualquer</option><option value="120">até 120 kg ou mais</option><option value="130">até 130 kg ou mais</option><option value="150">até 150 kg ou mais</option><option value="160">até 160 kg</option></select></label></div>
    <div class="filtro-grupo"><h2>Detalhes</h2>${['Molas ensacadas', 'Pillow top', 'Dupla face', 'Certificado INMETRO'].map(t => chip('tag', t, t)).join('')}</div>
    <button class="limpar" type="button">Limpar filtros</button>
  </aside>
  <div>
    <div class="catalogo-topo"><p><b data-total>${produtos.length}</b> modelos</p><label>Ordenar <select name="ordem"><option value="">Destaques</option><option value="nome">Nome</option><option value="conforto">Mais firme</option><option value="kg">Maior suporte</option></select></label></div>
    <div class="grade-prod">${produtos.slice().sort((a, b) => +b.id - +a.id).map(p => itemProduto(v, p)).join('')}</div>
    <p class="vazio" hidden>Nenhum modelo com esses filtros. <button type="button" class="limpar">Limpar filtros</button></p>
  </div>
</div></section>
${ctaLojista(v)}`;
}

function produto(v, p) {
  const rel = produtos.filter(o => o !== p && o.tipo === p.tipo).slice(0, 4);
  const linhasTec = p.tec.map(([k, val]) => val ? `<tr><th>${esc(k)}</th><td>${esc(val)}</td></tr>` : `<tr class="tec-sub"><th colspan="2">${esc(k.replace(/:$/, ''))}</th></tr>`).join('');
  const migalha = `<a href="/${v}/colchoes/">Linha colchões</a>`;
  const msg = `Olá! Quero saber onde comprar o ${p.nome} (${p.subtitulo}) da Probon.`;
  return `<section class="pp"><div class="in">
  <nav class="migalha" aria-label="Você está em"><a href="/${v}/">Home</a><span>/</span>${migalha}<span>/</span><span aria-current="page">${esc(p.nome)}</span></nav>
  <div class="pp-grid">
    <figure class="pp-foto">${foto(p)}</figure>
    <div class="pp-txt">
      <p class="eyebrow">Linha ${p.linha === 'Base Baú' ? 'Probon' : p.linha} · ${esc(p.tipo)}</p>
      <h1>${esc(p.nome)}</h1><p class="pp-sub">${esc(p.subtitulo)}</p>
      ${escala(p)}
      <ul class="pp-fatos">${p.kg ? `<li>${icone('peso', 'ic-s')}<span><b>até ${p.kg} kg</b>por pessoa</span></li>` : ''}${p.medida ? `<li>${icone('regua', 'ic-s')}<span><b>${esc(p.medida)}</b>de altura</span></li>` : ''}${p.tags.length ? `<li>${icone('camadas', 'ic-s')}<span><b>${esc(p.tags[0])}</b>${esc(p.tags.slice(1).join(' · ') || p.tipo)}</span></li>` : ''}</ul>
      <p>${esc(p.info)}</p>
      <div class="botoes"><a class="btn btn-cta" href="${wa(msg)}" target="_blank" rel="noopener">${icone('wa', 'ic-s')}Onde comprar</a><a class="btn btn-linha" href="/${v}/representantes/">Sou lojista</a></div>
    </div>
  </div>
</div></section>
<section class="secao secao-cinza"><div class="in pp-tec">
  <div><p class="eyebrow">Informações técnicas</p><h2>Ficha do ${esc(p.nome)}</h2><p>Medidas e materiais informados pela Probon. Confirme a disponibilidade de cada medida com o representante.</p></div>
  <table class="tabela"><tbody>${linhasTec}</tbody></table>
</div></section>
${rel.length ? `<section class="secao"><div class="in"><div class="cab cab-linha"><div><p class="eyebrow">Veja também</p><h2>Outros modelos: ${esc(p.tipo.toLowerCase())}</h2></div><a class="link-seta" href="/${v}/colchoes/">Todos os colchões ${icone('seta', 'ic-s')}</a></div><div class="grade-prod grade-4">${rel.map(o => itemProduto(v, o)).join('')}</div></div></section>` : ''}`;
}

function industrialPag(v) {
  return topoPagina(v, { eyebrow: 'Linha industrial', titulo: 'Espumas e molejos para a indústria', texto: 'Blocos de espuma contínua, peças, lâminas, corte em 3D, espuma cilíndrica e molejo ensacado para fabricantes de colchões, estofados e cadeiras.', fotoN: 'espumacao' }) + `
<section class="secao"><div class="in esp-grid">
  <div><p class="eyebrow">${industrial.espumacao.titulo}</p><h2>Sistema MaxFoam</h2><p>${industrial.espumacao.texto}</p>
  <h3 class="h-peq">Benefícios da espumação contínua</h3>
  <ul class="lista-check">${industrial.espumacao.beneficios.map(b => `<li>${icone('check', 'ic-s')}${b}</li>`).join('')}</ul></div>
  <figure class="video" data-video="${E.video}"><button type="button" aria-label="Assistir ao vídeo da Probon">${img('corte-bloco', 'Corte de bloco de espuma na Probon')}<span class="play">${icone('play')}</span><span class="video-rot">Assista: a Probon por dentro</span></button></figure>
</div></section>
<section class="secao secao-cinza"><div class="in">
  <div class="cab"><p class="eyebrow">Produtos industriais</p><h2>O que entregamos para a sua fábrica</h2></div>
  <div class="ind-lista">${industrial.linhas.map((l, i) => `<article class="ind-item" id="${l.id}"><figure>${img(l.img, l.nome)}</figure><div><span class="num">0${i + 1}</span><h3>${l.nome}</h3><ul>${l.itens.map(t => `<li>${t}</li>`).join('')}</ul></div></article>`).join('')}</div>
</div></section>
<section class="faixa-lab" style="--foto:url('/assets/img/lab-2.webp')"><div class="in"><div><p class="eyebrow">Garantia de qualidade</p><h2>Cada lote passa pelo laboratório da Probon</h2><p>Densidade, deformação, teor de cinzas, indentação e compressão das molas.</p></div><a class="btn btn-claro" href="/${v}/qualidade/">Conheça o laboratório</a></div></section>
<section class="secao"><div class="in cta-ind">
  <div><p class="eyebrow">Orçamento industrial</p><h2>Precisa de espuma, lâmina ou molejo sob medida?</h2><p>Envie densidade, medidas e quantidade. O comercial responde com prazo e preço.</p></div>
  <div class="botoes"><a class="btn btn-cta" href="${wa('Olá! Quero um orçamento da linha industrial da Probon (espuma/lâmina/molejo).')}" target="_blank" rel="noopener">${icone('wa', 'ic-s')}Pedir orçamento</a><a class="btn btn-linha" href="mailto:${E.email}?subject=Or%C3%A7amento%20linha%20industrial">${E.email}</a></div>
</div></section>`;
}

function qualidade(v) {
  return topoPagina(v, { eyebrow: 'Laboratório', titulo: 'Contamos com um laboratório exclusivo Probon', texto: 'Ensaios de espuma e de molas ensacadas em cada lote produzido.', fotoN: 'lab-8' }) + `
<section class="secao"><div class="in lab-intro"><p class="lead-escuro">${laboratorio.intro}</p></div></section>
<section class="secao secao-cinza"><div class="in">
  <div class="cab"><p class="eyebrow">Ensaios realizados</p><h2>Cinco testes antes do colchão sair da fábrica</h2></div>
  <ol class="ensaios" data-troca-simples>${laboratorio.ensaios.map((e, i) => `<li><figure>${img(e.img, e.nome)}</figure><div><span class="num">0${i + 1}</span><h3>${e.nome}</h3><p>${e.texto}</p></div></li>`).join('')}</ol>
</div></section>
<section class="secao"><div class="in inmetro">
  <div class="inmetro-selo"><b>Inmetro</b><span>Portaria nº 79/2011</span></div>
  <div><h2>Colchões de espuma certificados</h2><p>${laboratorio.inmetro} O ensaio de densidade garante que o colchão tem a densidade indicada na etiqueta.</p><a class="link-seta" href="/${v}/colchoes/">Ver os colchões ${icone('seta', 'ic-s')}</a></div>
</div></section>`;
}

function representantes(v) {
  return topoPagina(v, { eyebrow: 'Representantes', titulo: 'Encontre o representante mais próximo de você', texto: 'A Probon atende lojistas de todo o Brasil pela rede de representantes e pelo comercial da fábrica.', fotoN: 'fabrica-aerea' }) + `
<section class="secao"><div class="in rep-grid">
  <form class="rep-form" data-rep>
    <h2>Escolha o seu estado</h2>
    <p>Diga onde você está e o comercial passa o contato do representante da sua região.</p>
    <label><span>Estado</span><select name="estado" required><option value="" selected disabled>Escolha o estado</option>${estados.map(s => `<option>${s}</option>`).join('')}</select></label>
    <label><span>Cidade</span><input name="cidade" autocomplete="address-level2" placeholder="Sua cidade"></label>
    <fieldset><legend>Você é</legend><label class="radio"><input type="radio" name="perfil" value="lojista" checked> Lojista</label><label class="radio"><input type="radio" name="perfil" value="consumidor"> Consumidor</label><label class="radio"><input type="radio" name="perfil" value="quero representar"> Quero representar</label></fieldset>
    <button class="btn btn-cta" type="submit">${icone('wa', 'ic-s')}Falar com o comercial</button>
  </form>
  <div class="rep-lado">
    <div class="rep-bloco"><h3>Comercial da fábrica</h3><ul class="lista-contato"><li><a href="tel:${E.telefoneHref}">${icone('tel', 'ic-s')}${E.telefone}</a></li><li><a href="${wa('Olá! Quero falar com o comercial da Probon.')}" target="_blank" rel="noopener">${icone('wa', 'ic-s')}${E.whatsappTxt}</a></li><li><a href="mailto:${E.email}">${icone('mail', 'ic-s')}${E.email}</a></li></ul></div>
    <div class="rep-bloco rep-escuro"><h3>Já é representante?</h3><p>Lance os pedidos dos seus clientes no sistema de pedidos da Probon.</p><a class="btn btn-claro" href="${E.pedidoWeb}" target="_blank" rel="noopener">Pedido web</a></div>
  </div>
</div></section>`;
}

function assistencia(v) {
  const campo = (nome, rot, tipo = 'text', req = false, extra = '') => `<label><span>${rot}${req ? ' *' : ''}</span><input type="${tipo}" name="${nome}"${req ? ' required' : ''}${extra}></label>`;
  return topoPagina(v, { eyebrow: 'Assistência técnica', titulo: 'Abra um chamado de assistência', texto: 'Para representantes e lojistas. Preencha os dados da compra e do produto; o setor de assistência analisa e responde.', fotoN: 'lab-6' }) + `
<section class="secao"><div class="in assist-grid">
  <form class="form" data-assist>
    <fieldset><legend>Informações do representante</legend><div class="form-2">${campo('rep_nome', 'Nome', 'text', true)}${campo('rep_email', 'E-mail', 'email', true)}</div></fieldset>
    <fieldset><legend>Informações da compra</legend><div class="form-2">${campo('loja', 'Loja', 'text', true)}${campo('cnpj', 'CNPJ do lojista')}${campo('loja_tel', 'Telefone', 'tel')}${campo('loja_email', 'E-mail', 'email')}${campo('nf', 'Número da NF da venda', 'text', true)}${campo('nf_data', 'Data de emissão da NF', 'date', true)}</div></fieldset>
    <fieldset><legend>Informações do produto</legend><div class="form-2">${campo('produto', 'Descrição do produto', 'text', true, ' list="lista-prod"')}${campo('serie', 'Número de série', 'text', true, ' placeholder="Está na etiqueta do produto"')}${campo('lote', 'Lote')}</div>
    <datalist id="lista-prod">${produtos.map(p => `<option value="${esc(`${p.nome} – ${p.subtitulo}`)}">`).join('')}</datalist>
    <label><span>Descrição do problema *</span><textarea name="problema" rows="5" required></textarea></label></fieldset>
    <p class="aviso">${icone('check', 'ic-s')}<span>Ao enviar, o seu e-mail abre com tudo preenchido para <b>${E.email}</b>. Anexe 3 fotos nítidas: a nota fiscal, o problema e a etiqueta do produto.</span></p>
    <div class="botoes"><button class="btn btn-cta" type="submit">Enviar chamado</button><button class="btn btn-linha" type="reset">Limpar</button></div>
  </form>
  <aside class="assist-lado"><h2>Antes de enviar</h2><ol class="passos-mini"><li><b>Nota fiscal</b>Tenha em mãos o número e a data da NF de venda.</li><li><b>Etiqueta</b>O número de série e o lote estão na etiqueta do produto.</li><li><b>Fotos</b>Fotografe o problema com boa luz. Se for preciso, a assistência pede mais fotos.</li></ol><p>Dúvidas? <a href="tel:${E.telefoneHref}">${E.telefone}</a></p></aside>
</div></section>`;
}

function contato(v) {
  const mapa = encodeURIComponent(`${E.rua}, Frederico Westphalen - RS, ${E.cep}`);
  return topoPagina(v, { eyebrow: 'Contato', titulo: 'Fale com a Probon', texto: 'Comercial, lojistas, linha industrial e assistência técnica.', fotoN: 'fabrica-aerea' }) + `
<section class="secao"><div class="in contato-grid">
  <div class="contato-info">
    <a href="${wa('Olá! Vim pelo site da Probon.')}" target="_blank" rel="noopener">${icone('wa', 'ic-l')}<span><small>WhatsApp</small><b>${E.whatsappTxt}</b></span></a>
    <a href="tel:${E.telefoneHref}">${icone('tel', 'ic-l')}<span><small>Telefone</small><b>${E.telefone}</b></span></a>
    <a href="mailto:${E.email}">${icone('mail', 'ic-l')}<span><small>E-mail</small><b>${E.email}</b></span></a>
    <div>${icone('pin', 'ic-l')}<span><small>Endereço</small><b>${E.rua}</b>${E.bairro}, CEP ${E.cep}<br>${E.cidade}</span></div>
    <p class="cnpj">${E.razao} · CNPJ ${E.cnpj}</p>
  </div>
  <form class="form" data-contato>
    <h2>Envie uma mensagem</h2>
    <div class="form-2"><label><span>Nome *</span><input name="nome" required autocomplete="name"></label><label><span>Cidade / estado</span><input name="cidade"></label></div>
    <label><span>Assunto</span><select name="assunto"><option>Quero comprar um colchão</option><option>Sou lojista</option><option>Linha industrial</option><option>Assistência técnica</option><option>Outro assunto</option></select></label>
    <label><span>Mensagem *</span><textarea name="msg" rows="5" required></textarea></label>
    <button class="btn btn-cta" type="submit">${icone('wa', 'ic-s')}Enviar pelo WhatsApp</button>
  </form>
</div></section>
<section class="mapa"><iframe title="Mapa da Probon em Frederico Westphalen" src="https://www.google.com/maps?q=${mapa}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>
<section class="secao secao-cinza"><div class="in trab">
  <div><p class="eyebrow">Trabalhe conosco</p><h2>Faça parte da Probon</h2><p>Envie seu currículo pelo formulário de vagas.</p></div><a class="btn btn-cta" href="${E.trabalhe}" target="_blank" rel="noopener">Enviar currículo</a>
</div></section>`;
}

export function gerarVersao(v) {
  const n = 'Probon Colchões';
  const out = {
    index: pagina(v, 'index', '', `${n} · Mais conforto para a sua vida`, 'Colchões, conjuntos box, base baú e espumas industriais fabricados em Frederico Westphalen (RS) desde 1989.', v === 'a' ? homeA() : homeB()),
    empresa: pagina(v, 'empresa', 'empresa/', `Quem somos · ${n}`, historia.intro, empresa(v)),
    colchoes: pagina(v, 'colchoes', 'colchoes/', `Linha colchões · ${n}`, `${produtos.length} modelos de colchões, conjuntos box e base baú Probon, com ficha técnica.`, catalogo(v)),
    industrial: pagina(v, 'industrial', 'industrial/', `Linha industrial · ${n}`, 'Espumação contínua MaxFoam, peças e lâminas, corte em 3D, espuma cilíndrica e molejo ensacado.', industrialPag(v)),
    qualidade: pagina(v, 'qualidade', 'qualidade/', `Laboratório · ${n}`, 'Laboratório exclusivo Probon: densidade, DPC, teor de cinzas, indentação e compressão em molas.', qualidade(v)),
    representantes: pagina(v, 'representantes', 'representantes/', `Representantes · ${n}`, 'Encontre o representante Probon mais próximo de você.', representantes(v)),
    assistencia: pagina(v, 'assistencia', 'assistencia/', `Assistência técnica · ${n}`, 'Abra um chamado de assistência técnica Probon.', assistencia(v)),
    contato: pagina(v, 'contato', 'contato/', `Contato · ${n}`, `Fale com a Probon: ${E.telefone}, ${E.email}.`, contato(v)),
  };
  for (const p of produtos) out[`colchoes/${p.slug}`] = pagina(v, 'colchoes', `colchoes/${p.slug}/`, `${p.nome} · ${p.subtitulo} · ${n}`, p.info.slice(0, 155), produto(v, p));
  return out;
}
