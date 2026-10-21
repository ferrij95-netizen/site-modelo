// Monta as páginas das versões A ("Vitrine": fiel ao site atual, faixa grafite, aba vermelha no menu, slider com
// as legendas em tarja vermelha e grafite, abas em seta, barra "Solicite um orçamento", rodapé vermelho) e
// B ("Temperado": clara e técnica, o vidro explicado em corte, antes e depois, "da chapa à obra").
// Estilos em public/assets/{base,a,b}.css, script em site.js.
import fs from 'node:fs';
import { empresa as E, sobre, valores, blindexFrase, blindexTexto, produtos, servicos, servicosIntro, fotosServico, obras, tiposObra, dicas, comoFeito } from './conteudo.mjs';

const tam = JSON.parse(fs.readFileSync(new URL('./tamanhos.json', import.meta.url)));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, { cls = '', lazy = true, sizes = '' } = {}) => {
  const [w, h] = tam[n] || [1000, 700];
  return `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async"${sizes}>`;
};

export const nomesVersao = { a: 'Vitrine', b: 'Temperado' };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'empresa', nome: 'A empresa', caminho: 'empresa/' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'servicos', nome: 'Serviços', caminho: 'servicos/' },
  { slug: 'portfolio', nome: 'Portfólio', caminho: 'portfolio/' },
  { slug: 'orcamento', nome: 'Orçamento', caminho: 'orcamento/' },
  { slug: 'dicas', nome: 'Dicas', caminho: 'dicas/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15" rx="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4M7.5 13h2M11 13h2M14.5 13h2M7.5 16.5h2M11 16.5h2"/>',
  relogio: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  cami: '<path d="M2 16V7h12v9M14 10h4l3 3v3h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  ant: '<path d="M15 6l-6 6 6 6"/>',
  prox: '<path d="M9 6l6 6-6 6"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da Vidrex Vidros e gostaria de um orçamento.') => `https://wa.me/${E.wa}?text=${encodeURIComponent(txt)}`;
const ext = 'target="_blank" rel="noopener"';
const L = (v, slug) => `/${v}/${nav.find(n => n.slug === slug).caminho}`;

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
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Vidrex Vidros">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${v === 'a' ? '#373735' : '#FFFFFF'}">
<link rel="icon" href="/assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

const navLinks = (v, atual) => nav.map(n => `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`).join('');

function topo(v, atual) {
  if (v === 'a') return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<div class="a-faixa"><div class="w"><span>${ic('pin')} ${E.rua} · ${E.bairro} · ${E.cidade} - ${E.uf}</span><span class="a-faixa-d"><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a href="${waLink()}" ${ext}>${ic('wa')} ${E.cel}</a></span></div></div>
<header class="a-cab"><div class="w">
  <a class="logo" href="/${v}/" aria-label="Vidrex Vidros, página inicial"><img src="/assets/logo.svg" alt="Vidrex Vidros" width="184" height="79"></a>
  <nav class="a-menu" id="menu" aria-label="Principal">${navLinks(v, atual)}</nav>
  <button class="menu-bt" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
  return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="b-cab"><div class="w">
  <a class="logo" href="/${v}/" aria-label="Vidrex Vidros, página inicial"><img src="/assets/logo.svg" alt="Vidrex Vidros" width="184" height="79"></a>
  <nav class="b-menu" id="menu" aria-label="Principal">${navLinks(v, atual).replace(`>Orçamento</a>`, ' class="b-so-cel">Orçamento</a>')}<a class="b-menu-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a></nav>
  <div class="b-cab-d"><a class="b-tel" href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a class="bt bt-v" href="${L(v, 'orcamento')}">Pedir orçamento</a></div>
  <button class="menu-bt" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>`;
}

function rodape(v) {
  const prod = produtos.map(p => `<li><a href="${L(v, 'produtos')}#${p.slug}">${p.nome}</a></li>`).join('');
  const pag = nav.map(n => `<li><a href="/${v}/${n.caminho}">${n.nome}</a></li>`).join('');
  return `<footer class="rod rod-${v}"><div class="w rod-g">
  <div class="rod-marca"><img src="/assets/${v === 'a' ? 'logo-branco' : 'logo-neg'}.svg" alt="Vidrex Vidros" width="184" height="79" loading="lazy"><p>${E.blindex} em Cuiabá desde ${E.fundacao}. Vidros, espelhos, box, sacadas e fachadas.</p></div>
  <div><h3>Produtos</h3><ul class="rod-2col">${prod}</ul></div>
  <div><h3>O site</h3><ul class="rod-2col">${pag}</ul></div>
  <div><h3>Atendimento</h3><ul class="rod-cont"><li>${ic('pin')}<span>${E.rua}, ${E.esquina}<br>${E.bairro} · ${E.cidade} - ${E.uf}</span></li><li>${ic('tel')}<a href="tel:${E.foneHref}">${E.fone}</a></li><li>${ic('wa')}<a href="${waLink()}" ${ext}>${E.cel}</a></li></ul></div>
</div>
<div class="rod-base"><div class="w"><span>Copyright © ${new Date().getFullYear()} · Vidrex Vidros</span><span>Proposta de site · <a href="${E.antigo}" ${ext}>ver o site atual</a></span></div></div></footer>
<a class="wa-flut" href="${waLink()}" ${ext} aria-label="Falar no WhatsApp">${ic('wa')}</a>
<div class="lb" hidden><button class="lb-x" type="button" aria-label="Fechar">${ic('x')}</button><button class="lb-ant" type="button" aria-label="Anterior">${ic('ant')}</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-prox" type="button" aria-label="Próxima">${ic('prox')}</button></div>`;
}

const pagina = (v, slug, titulo, descricao, corpo) => `${head(v, slug === 'index' ? '' : `${slug}/`, titulo, descricao)}
<body class="v-${v} p-${slug}">
${topo(v, slug)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// ---------- peças comuns ----------
const opcoesProduto = () => produtos.map(p => `<option>${p.nome}</option>`).join('') + '<option>Serviço (corte, lapidação, jateamento...)</option><option>Outro</option>';
function formulario(v, { orcamento = true, id = 'form' } = {}) {
  return `<form class="form" id="${id}" data-form="${orcamento ? 'orcamento' : 'contato'}" novalidate>
  <div class="form-g">
    <label><span>Nome</span><input name="nome" autocomplete="name" required></label>
    <label><span>Telefone / WhatsApp</span><input name="telefone" type="tel" autocomplete="tel" inputmode="tel" required></label>
    ${orcamento ? `<label><span>Produto</span><select name="produto">${opcoesProduto()}</select></label>
    <label><span>Medidas aproximadas</span><input name="medidas" placeholder="Ex.: 1,20 x 1,90 m, 2 peças"></label>
    <label><span>Bairro / cidade da obra</span><input name="local" placeholder="Ex.: Goiabeiras, Cuiabá"></label>
    <label><span>Como prefere a entrega?</span><select name="entrega"><option>Instalado na obra</option><option>Retiro na loja</option><option>Ainda não sei</option></select></label>` : `<label class="form-l2"><span>E-mail (opcional)</span><input name="email" type="email" autocomplete="email"></label>`}
    <label class="form-l2"><span>Mensagem</span><textarea name="mensagem" rows="4" placeholder="${orcamento ? 'Cor do vidro, espessura, tipo de ferragem, prazo...' : 'Como podemos ajudar?'}"></textarea></label>
  </div>
  <p class="form-erro" role="alert" hidden>Preencha nome e telefone para enviarmos o retorno.</p>
  <div class="form-bts"><button class="bt bt-v" type="submit">${ic('wa')} Enviar pelo WhatsApp</button><a class="bt bt-l" href="tel:${E.foneHref}">${ic('tel')} Ligar ${E.fone}</a></div>
  <p class="form-nota">O pedido abre no WhatsApp da Vidrex já escrito. É só tocar em enviar.</p>
</form>`;
}
const mapa = (cls = '') => `<div class="mapa ${cls}"><iframe src="${E.mapa}" title="Mapa: Vidrex Vidros, ${E.rua}, ${E.cidade}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
const fotoLb = (n, alt, grupo, legenda = alt) => `<a class="lb-a" href="/assets/img/${n}.webp" data-grupo="${grupo}" data-legenda="${esc(legenda)}">${img(n, alt)}</a>`;

// O vidro em corte (B): comum, temperado, laminado. Lâminas desenhadas e o jeito que cada um quebra.
function vidroCorte(tipo) {
  const lamina = (y, h = 26) => `<rect x="20" y="${y}" width="360" height="${h}" rx="2" class="vc-vidro"/><path d="M28 ${y + 5}h120" class="vc-brilho"/>`;
  const ar = Array.from({ length: 7 }, (_, i) => { const x = 50 + i * 50; return `<path d="M${x} 18v20M${x - 5} 32l5 6 5-6" class="vc-ar"/><path d="M${x} 136v-20M${x - 5} 122l5-6 5 6" class="vc-ar"/>`; }).join('');
  const corte = {
    comum: `${lamina(64)}<text x="200" y="118" class="vc-leg">Uma lâmina plana, transparência perfeita</text>`,
    temperado: `${ar}${lamina(64)}<text x="200" y="104" class="vc-leg vc-leg-in">Aquecido e resfriado com jatos de ar</text>`,
    laminado: `${lamina(46, 22)}<rect x="20" y="70" width="360" height="8" class="vc-pvb"/>${lamina(80, 22)}<text x="390" y="78" class="vc-leg vc-leg-d">PVB</text><text x="200" y="128" class="vc-leg">Duas lâminas + película de PVB</text>`,
  }[tipo];
  // quebra: comum em lascas longas, temperado em cubinhos, laminado trincado mas inteiro
  let q = '';
  if (tipo === 'comum') q = '<path d="M150 20L95 140M150 20L210 140M150 20L40 85M150 20L260 70M150 20L280 120M95 140L60 160M210 140L250 160M40 85L20 130M260 70L285 40" class="vc-trinca"/><path d="M58 158l40-18 12 22zM230 150l26 6-8 4z" class="vc-caco"/>';
  if (tipo === 'temperado') { for (let y = 20; y < 160; y += 14) for (let x = 20; x < 290; x += 14) { const j = ((x * 7 + y * 13) % 5) - 2; q += `<path d="M${x} ${y + j}l14 ${-j}l${j} 14l-14 ${j}z" class="vc-cubo"/>`; } }
  if (tipo === 'laminado') { q = '<rect x="20" y="20" width="270" height="140" class="vc-pvb-f"/>'; for (let a = 0; a < 360; a += 30) { const r = a * Math.PI / 180; q += `<path d="M155 90L${(155 + Math.cos(r) * 150).toFixed(0)} ${(90 + Math.sin(r) * 150).toFixed(0)}" class="vc-trinca"/>`; } q += [30, 60, 95].map(r => `<circle cx="155" cy="90" r="${r}" class="vc-trinca"/>`).join(''); q = `<clipPath id="cl-${tipo}"><rect x="20" y="20" width="270" height="140"/></clipPath><g clip-path="url(#cl-${tipo})">${q}</g>`; }
  return { corte: `<svg class="vc-svg" viewBox="0 0 420 150" role="img" aria-label="Corte do vidro ${tipo}">${corte}</svg>`, quebra: `<svg class="vc-svg vc-q" viewBox="0 0 310 180" role="img" aria-label="Como o vidro ${tipo} quebra"><rect x="20" y="20" width="270" height="140" class="vc-fundo"/>${q}</svg>` };
}
const quebraTexto = { comum: 'Quebra em lascas grandes e pontiagudas.', temperado: 'Quebra em pedaços pequenos e sem pontas.', laminado: 'Trinca, mas os estilhaços ficam presos à película.' };
function seletorVidro() {
  const tipos = [['comum', 'Comum', produtos[0]], ['temperado', 'Temperado', produtos[1]], ['laminado', 'Laminado', produtos[2]]];
  return `<div class="vc" data-abas>
  <div class="vc-abas" role="tablist">${tipos.map(([k, n], i) => `<button type="button" role="tab" id="vc-t-${k}" aria-controls="vc-${k}" aria-selected="${i === 1}">${n}</button>`).join('')}</div>
  ${tipos.map(([k, n, p], i) => { const d = vidroCorte(k); return `<div class="vc-painel" role="tabpanel" id="vc-${k}" aria-labelledby="vc-t-${k}"${i === 1 ? '' : ' hidden'}>
    <div class="vc-txt"><h3>Vidro ${n.toLowerCase()}</h3><p>${p.texto}</p><a class="lk" href="#${p.slug}">Ver ${n.toLowerCase()} ${ic('seta')}</a></div>
    <figure class="vc-fig"><figcaption>Em corte</figcaption>${d.corte}</figure>
    <figure class="vc-fig"><figcaption>Se quebrar</figcaption>${d.quebra}<p>${quebraTexto[k]}</p></figure>
  </div>`; }).join('')}
</div>`;
}

const antesDepois = () => `<div class="ad" data-ad style="--p:50%">
  ${img('depois', 'Depois: fachada do Colégio Fato Júnior em pele de vidro', { cls: 'ad-dep' })}
  <div class="ad-antes">${img('antes', 'Antes: fachada do colégio sem vidro')}</div>
  <span class="ad-r ad-r1">Antes</span><span class="ad-r ad-r2">Depois</span>
  <input type="range" min="0" max="100" value="50" aria-label="Arraste para comparar antes e depois">
  <span class="ad-linha" aria-hidden="true"><i>${ic('ant')}${ic('prox')}</i></span>
</div>`;

// Linha de temperatura do "Como é feito o vidro?" (B e A usam).
function comoFeitoBloco(v) {
  const temps = [30, 1500, 1350, 1200, 900, 600];
  const W = 600, H = 150, x = i => 50 + i * 100, y = t => 130 - (t / 1500) * 110;
  const linha = temps.map((t, i) => `${i ? 'L' : 'M'}${x(i)} ${y(t).toFixed(1)}`).join('');
  return `<div class="cf cf-${v}" data-etapas>
  <svg class="cf-graf" viewBox="0 0 ${W} ${H}" role="img" aria-label="Temperatura em cada etapa: até 1.500 °C no forno, 1.200 °C no primeiro molde e 600 °C no recozimento">
    <defs><linearGradient id="cf-g-${v}" x1="0" x2="1"><stop offset="0" stop-color="#F2A33A"/><stop offset=".25" stop-color="#E8261F"/><stop offset="1" stop-color="#8E8E8A"/></linearGradient></defs>
    <path d="${linha}" fill="none" stroke="url(#cf-g-${v})" stroke-width="4" stroke-linejoin="round" class="cf-linha"/>
    ${comoFeito.map((c, i) => `<circle cx="${x(i)}" cy="${y(temps[i]).toFixed(1)}" r="${c.temp ? 7 : 4.5}" class="cf-pt${c.temp ? ' cf-pt-t' : ''}"/>${c.temp ? `<text x="${x(i)}" y="${(y(temps[i]) - 14).toFixed(1)}" class="cf-temp">${c.temp.toLocaleString('pt-BR')} °C</text>` : ''}`).join('')}
  </svg>
  <ol class="cf-passos">${comoFeito.map((c, i) => `<li class="ap-etapa"><b>${String(i + 1).padStart(2, '0')}</b><h3>${c.t}</h3><p>${c.d}</p></li>`).join('')}</ol>
</div>`;
}

// ================= VERSÃO A · Vitrine =================
const aba = (t, tag = 'h2') => `<${tag} class="aba"><span>${t}</span></${tag}>`;
const tarja = (l1, l2) => `<span class="tarja"><b>${l1}</b>${l2 ? `<i>${l2}</i>` : ''}</span>`;
const barraOrc = v => `<div class="a-barra"><a class="a-barra-orc" href="${L(v, 'orcamento')}">${ic('cal')} Solicite um orçamento</a><a class="a-barra-fale" href="${L(v, 'contato')}">${ic('seta')} Fale conosco</a></div>`;
const tituloPagA = (t, sub, foto) => `<section class="a-tit"><div class="w"><div class="a-tit-in">${img(foto, '', { lazy: false })}<div>${tarja(t, sub)}</div></div></div></section>`;

const slidesA = [
  { f: '2282fb', l1: 'Vidrex Vidros do básico ao moderno', l2: 'Fechamento de sacada · Cuiabá' },
  { f: '0f1545', l1: 'Sala de Banho', l2: 'Arquiteta Susana Vilela' },
  { f: 'd738eb', l1: 'Fachada em vidro laminado', l2: 'Clínica Salutte' },
  { f: 'sala-blindex', l1: 'Distribuidora autorizada Blindex', l2: 'Nós temos a solução ideal para você' },
];

function homeA() {
  const v = 'a';
  const tiles = produtos.filter(p => p.foto).map((p, i) => `<a class="a-prod${i < 2 ? ' a-prod-g' : ''}" href="${L(v, 'produtos')}#${p.slug}">${img(p.foto, p.fotoAlt)}${tarja(p.nome, i < 2 ? 'Ver produto' : '')}</a>`).join('');
  const mosaico = ['133dac', '2646a2', '40c1cc', 'f96b6a', '6ce0c2', '66fd9a'];
  return `<section class="a-hero"><div class="w">
  <div class="a-slider" data-slider aria-roledescription="carrossel" aria-label="Destaques">
    ${slidesA.map((s, i) => `<figure class="a-slide${i ? '' : ' on'}" aria-hidden="${i ? 'true' : 'false'}">${img(s.f, s.l1, { lazy: i > 0 })}<figcaption>${tarja(s.l1, s.l2)}</figcaption></figure>`).join('')}
    <div class="a-pontos">${slidesA.map((s, i) => `<button type="button" aria-label="Destaque ${i + 1}"${i ? '' : ' aria-current="true"'}></button>`).join('')}</div>
  </div>
</div></section>
<section class="a-blindex"><div class="w">
  <div><p class="a-blx-t">${blindexFrase.t.replace('®', '<sup>®</sup>')}</p><p class="a-blx-s">${blindexFrase.s.replace(/Blindex®/, '<b>Blindex<sup>®</sup></b>')}</p></div>
  <div class="a-blx-d"><img src="/assets/blindex.png" alt="Blindex" width="150" height="150" loading="lazy"><span>${E.blindex}</span></div>
</div></section>
<section class="a-tres"><div class="w">
  <div class="a-col">${aba('Sobre nós')}<p>${sobre}</p><a class="lk" href="${L(v, 'empresa')}">Conheça a Vidrex ${ic('seta')}</a></div>
  <div class="a-col">${aba('Nossa loja')}${mapa('a-mapa-p')}<p class="a-loja"><b>${E.rua}</b><br>${E.esquina}<br>${E.bairro} · ${E.cidade} - ${E.uf}</p><a class="lk" href="${E.rota}" ${ext}>Como chegar ${ic('seta')}</a></div>
  <div class="a-col">${aba('Dicas')}<ul class="a-dicas">${[['como-e-feito', 'Como é feito o vidro?'], ['limpeza', 'Limpeza dos vidros'], ['instalacao', 'Instalação de box'], ['box', 'Cuidados com o box Blindex']].map(([s, t]) => `<li><a href="${L(v, 'dicas')}#${s}">${t}${ic('seta')}</a></li>`).join('')}</ul></div>
</div></section>
<section class="a-sec a-sec-cinza"><div class="w">
  <div class="a-sec-cab">${aba('Produtos')}<a class="lk" href="${L(v, 'produtos')}">Todos os produtos ${ic('seta')}</a></div>
  <div class="a-prods">${tiles}<a class="a-prod a-prod-acess" href="${L(v, 'produtos')}#acessorios"><b>Acessórios</b><span>Ferragens Santa Marina e Blindex, de alumínio e de polímero, em todas as cores.</span>${ic('seta')}</a></div>
</div></section>
<section class="a-serv"><div class="w">
  <div class="a-serv-txt">${aba('Serviços')}<p>${servicosIntro}</p>
    <ol class="a-serv-l">${servicos.map(s => `<li>${s.nome}</li>`).join('')}</ol>
    <a class="bt bt-v" href="${L(v, 'servicos')}">Ver serviços ${ic('seta')}</a></div>
  <div class="a-serv-fotos">${fotosServico.map(([f, a]) => img(f, a)).join('')}</div>
</div></section>
<section class="a-sec"><div class="w">
  <div class="a-sec-cab">${aba('Portfólio')}<a class="lk" href="${L(v, 'portfolio')}">Confira nossas obras ${ic('seta')}</a></div>
  <div class="a-mos">${mosaico.map((f, i) => { const o = obras.find(o => o.fotos.includes(f)); return `<a class="a-mos-i a-mos-${i}" href="${L(v, 'portfolio')}">${img(f, o.obra)}<span>${tarja(o.obra, o.autor)}</span></a>`; }).join('')}</div>
</div></section>
<section class="a-fim"><div class="w">${barraOrc(v)}
  <div class="a-fim-g">
    <div><h3>Atendimento</h3><a class="a-fone" href="tel:${E.foneHref}">${ic('tel')}<span><small>Ligue</small>${E.fone}</span></a><a class="a-fone" href="${waLink()}" ${ext}>${ic('wa')}<span><small>WhatsApp</small>${E.cel}</span></a></div>
    <div><h3>Parceiros</h3><div class="a-parc"><img src="/assets/blindex.png" alt="Blindex" width="110" height="110" loading="lazy"><p>${blindexTexto}</p></div></div>
    <div><h3>Horário e entrega</h3><p class="a-hor">${ic('relogio')} Atendimento na loja do Porto, em Cuiabá.</p><p class="a-hor">${ic('cami')} Transporte do vidro pronto até a sua obra.</p></div>
  </div>
</div></section>`;
}

function empresaA() {
  const v = 'a';
  return `${tituloPagA('A empresa', 'Vidrex Vidros · desde 2009', '2282fb')}
<section class="a-sec"><div class="w a-emp">
  <div>${aba('A Vidrex')}<p class="a-lead">${sobre}</p>
    <ul class="a-valores">${valores.map(x => `<li>${x}</li>`).join('')}</ul></div>
  <figure class="a-emp-f">${img('serv-b', 'Lapidação de vidro na Vidrex')}${img('serv-c', 'Máquina de furação')}</figure>
</div></section>
<section class="a-sec a-sec-cinza"><div class="w a-emp2">
  <div class="a-blx-g"><img src="/assets/blindex.png" alt="Blindex" width="150" height="150" loading="lazy"><div>${aba('Distribuidora Blindex', 'h2')}<p><b>${blindexFrase.t}</b> ${blindexFrase.s}</p><p>${blindexTexto}</p></div></div>
  <div class="a-num"><p><b>${E.fundacao}</b><span>ano de fundação</span></p><p><b>${produtos.length}</b><span>linhas de produto</span></p><p><b>${servicos.length}</b><span>serviços na própria loja</span></p></div>
</div></section>
<section class="a-sec"><div class="w a-loja-g">
  <div>${aba('Nossa loja')}<p class="a-lead">${E.rua}, ${E.esquina}, bairro ${E.bairro}, ${E.cidade} - ${E.uf}.</p><p><a class="a-fone" href="tel:${E.foneHref}">${ic('tel')}<span><small>Telefone</small>${E.fone}</span></a><a class="a-fone" href="${waLink()}" ${ext}>${ic('wa')}<span><small>WhatsApp</small>${E.cel}</span></a></p><a class="bt bt-v" href="${E.rota}" ${ext}>Como chegar ${ic('seta')}</a></div>
  ${mapa()}
</div></section>
<section class="a-fim"><div class="w">${barraOrc(v)}</div></section>`;
}

function produtosA() {
  const v = 'a';
  return `${tituloPagA('Produtos', E.blindex, 'prota0')}
<nav class="a-cats" aria-label="Categorias"><div class="w">${produtos.map(p => `<a href="#${p.slug}">${p.nome}</a>`).join('')}</div></nav>
<section class="a-sec"><div class="w">
  <div class="a-blx-faixa"><img src="/assets/blindex.png" alt="Blindex" width="72" height="72" loading="lazy"><p><b>Distribuidor autorizado.</b> ${blindexTexto}</p></div>
  ${produtos.map((p, i) => `<article class="a-cat${i % 2 ? ' a-cat-inv' : ''}" id="${p.slug}">
    ${p.foto ? `<div class="a-cat-f">${fotoLb(p.foto, p.fotoAlt, p.slug)}${tarja(p.nome)}</div>` : `<div class="a-cat-f a-cat-sem"><b>Ferragens</b><span>Santa Marina · Blindex · alumínio · polímero</span></div>`}
    <div class="a-cat-t">${aba(p.nome)}<p>${p.texto}</p>
      ${p.galeria ? `<div class="a-cat-gal">${p.galeria.map(([f, a]) => fotoLb(f, a, p.slug)).join('')}</div>` : ''}
      <a class="lk" href="${L(v, 'orcamento')}?produto=${encodeURIComponent(p.nome)}">Pedir orçamento de ${p.nome.toLowerCase()} ${ic('seta')}</a></div>
  </article>`).join('')}
</div></section>
<section class="a-fim"><div class="w">${barraOrc(v)}</div></section>`;
}

function servicosA() {
  const v = 'a';
  return `${tituloPagA('Serviços', 'Do corte ao transporte', 'serv-b')}
<section class="a-sec"><div class="w">
  <p class="a-lead a-lead-c">${servicosIntro}</p>
  <div class="a-serv-fotos3">${fotosServico.map(([f, a]) => `<figure>${fotoLb(f, a, 'servicos')}</figure>`).join('')}</div>
  <ol class="a-serv-g">${servicos.map((s, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><h3>${s.nome}</h3><p>${s.d}</p></li>`).join('')}</ol>
</div></section>
<section class="a-fim"><div class="w">${barraOrc(v)}</div></section>`;
}

function portfolioA() {
  const v = 'a';
  return `${tituloPagA('Portfólio', 'Confira algumas de nossas obras realizadas', '6ce0c2')}
<section class="a-sec"><div class="w">
  ${obras.map(o => `<article class="a-obra"><div class="a-obra-cab">${aba(o.obra, 'h2')}<span>${o.autor}</span></div>
    <div class="a-obra-g a-obra-n${Math.min(o.fotos.length, 4)}">${o.fotos.map((f, i) => fotoLb(f, `${o.obra}, foto ${i + 1}`, 'port', `${o.obra} · ${o.autor}`)).join('')}</div></article>`).join('')}
  <article class="a-obra"><div class="a-obra-cab">${aba('Antes e depois', 'h2')}<span>Pele de vidro no Colégio Fato Júnior</span></div>${antesDepois()}</article>
</div></section>
<section class="a-fim"><div class="w">${barraOrc(v)}</div></section>`;
}

function orcamentoA() {
  return `${tituloPagA('Orçamento', 'Pedido de orçamento online', '4555e8')}
<section class="a-sec"><div class="w a-form-g">
  <div>${aba('Preencha o formulário')}${formulario('a')}</div>
  <aside class="a-form-lado"><h3>Prefere falar agora?</h3><a class="a-fone" href="tel:${E.foneHref}">${ic('tel')}<span><small>Telefone</small>${E.fone}</span></a><a class="a-fone" href="${waLink()}" ${ext}>${ic('wa')}<span><small>WhatsApp</small>${E.cel}</span></a><p>Leve as medidas do vão (largura e altura) e, se tiver, uma foto do local. Isso agiliza o orçamento.</p></aside>
</div></section>`;
}

function dicasA() {
  return `${tituloPagA('Dicas', 'Cuidados com o seu vidro', '90fe9a')}
<section class="a-sec"><div class="w a-dicas-g">
  ${dicas.map(d => `<details class="a-acc" id="${d.slug}"${d.slug === 'box' ? ' open' : ''}><summary>${aba(d.titulo, 'h2')}${ic('mais')}</summary><ul>${d.itens.map(t => `<li>${t}</li>`).join('')}</ul></details>`).join('')}
</div></section>
<section class="a-sec a-sec-cinza" id="como-e-feito"><div class="w">${aba('Como é feito o vidro?')}${comoFeitoBloco('a')}</div></section>`;
}

function contatoA() {
  return `${tituloPagA('Contato', 'Fale com a Vidrex', '2e399d')}
<section class="a-sec"><div class="w a-form-g">
  <div>${aba('Preencha o formulário')}${formulario('a', { orcamento: false })}</div>
  <aside class="a-form-lado"><h3>Atendimento</h3><a class="a-fone" href="tel:${E.foneHref}">${ic('tel')}<span><small>Telefone</small>${E.fone}</span></a><a class="a-fone" href="${waLink()}" ${ext}>${ic('wa')}<span><small>WhatsApp</small>${E.cel}</span></a><p>${ic('pin')} ${E.rua}, ${E.esquina}, ${E.bairro}, ${E.cidade} - ${E.uf}</p></aside>
</div></section>
<section class="a-sec a-sec-cinza"><div class="w">${aba('Onde estamos')}${mapa('mapa-l')}</div></section>`;
}

// ================= VERSÃO B · Temperado =================
const rotulo = t => `<p class="rot">${t}</p>`;
const tituloPagB = (rot, t, sub, foto) => `<section class="b-tit"><div class="w b-tit-g"><div>${rotulo(rot)}<h1>${t}</h1><p>${sub}</p></div>${foto ? `<div class="b-tit-f">${img(foto, '', { lazy: false })}</div>` : ''}</div></section>`;
const ctaB = v => `<section class="b-cta"><div class="w"><div><h2>Tem as medidas do vão?</h2><p>Mande pelo WhatsApp com uma foto do local. A Vidrex responde com o orçamento do vidro, das ferragens e da instalação.</p></div><div class="b-cta-bts"><a class="bt bt-b" href="${L(v, 'orcamento')}">Pedir orçamento ${ic('seta')}</a><a class="bt bt-lb" href="${waLink()}" ${ext}>${ic('wa')} ${E.cel}</a></div></div></section>`;

function homeB() {
  const v = 'b';
  const amb = [
    { t: 'Banheiro', f: '0f1545', alt: 'Sala de Banho, arquiteta Susana Vilela', p: ['box', 'espelhos'] },
    { t: 'Sacada', f: '2646a2', alt: 'Fechamento de sacada em Cuiabá', p: ['sacadas', 'vidro-temperado'] },
    { t: 'Fachada', f: 'd738eb', alt: 'Fachada em vidro laminado da Clínica Salutte', p: ['fachadas', 'vidro-laminado'] },
    { t: 'Portas e interiores', f: 'ec0f55', alt: 'Porta de vidro com kit Versatik', p: ['portas-e-janelas', 'acessorios', 'vidro-comum'] },
  ];
  const nomeP = s => produtos.find(p => p.slug === s).nome;
  return `<section class="b-hero"><div class="w b-hero-g">
  <div class="b-hero-txt">${rotulo(`${E.blindex} · Cuiabá`)}<h1>Vidro do básico ao moderno.</h1>
    <p>Vidros comuns, temperados e laminados, espelhos, box, sacadas e fachadas. Cortados, lapidados e entregues pela Vidrex desde ${E.fundacao}.</p>
    <div class="b-hero-bts"><a class="bt bt-v" href="${L(v, 'orcamento')}">Pedir orçamento ${ic('seta')}</a><a class="bt bt-l" href="${L(v, 'portfolio')}">Ver obras</a></div></div>
  <div class="b-hero-f">${img('2282fb', 'Fechamento de sacada com vista para Cuiabá', { lazy: false })}<span class="b-hero-vao" aria-hidden="true"><i></i><i></i><i></i></span><p class="b-hero-leg">Fechamento de sacada · Cuiabá</p></div>
</div>
<div class="w"><ul class="b-fatos"><li><b>${E.fundacao}</b>no mercado desde</li><li><b>Blindex<sup>®</sup></b>distribuidora autorizada</li><li><b>${produtos.length}</b>linhas de produto</li><li><b>${servicos.length}</b>serviços na própria loja</li></ul></div></section>
<section class="b-sec" id="vidros"><div class="w">
  <div class="b-sec-cab">${rotulo('Vidros')}<h2>Qual vidro para cada caso?</h2><p>${blindexFrase.t} ${blindexFrase.s}</p></div>
  ${seletorVidro().replace(/href="#/g, `href="${L(v, 'produtos')}#`)}
</div></section>
<section class="b-sec b-sec-c"><div class="w">
  <div class="b-sec-cab b-sec-cab-l"><div>${rotulo('Onde usar')}<h2>Para cada canto da obra</h2></div><a class="lk" href="${L(v, 'produtos')}">Todos os produtos ${ic('seta')}</a></div>
  <div class="b-amb">${amb.map((a, i) => `<article class="b-amb-i b-amb-${i}"><a href="${L(v, 'produtos')}#${a.p[0]}">${img(a.f, a.alt)}</a><div><h3>${a.t}</h3><ul>${a.p.map(s => `<li><a href="${L(v, 'produtos')}#${s}">${nomeP(s)}</a></li>`).join('')}</ul></div></article>`).join('')}</div>
</div></section>
<section class="b-sec"><div class="w b-ad-g">
  <div>${rotulo('Antes e depois')}<h2>Uma fachada nova sem demolir a antiga</h2><p>No Colégio Fato Júnior, a pele de vidro cobriu a fachada inteira e mudou a cara da rua. Arraste para comparar.</p><a class="lk" href="${L(v, 'portfolio')}">Mais obras ${ic('seta')}</a></div>
  ${antesDepois()}
</div></section>
<section class="b-sec b-sec-g"><div class="w">
  <div class="b-sec-cab">${rotulo('Serviços')}<h2>Da chapa à obra, na mesma loja</h2><p>${servicosIntro}</p></div>
  <ol class="b-linha">${servicos.map((s, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><h3>${s.nome}</h3><p>${s.d}</p></li>`).join('')}</ol>
  <div class="b-serv-f">${fotosServico.map(([f, a]) => img(f, a)).join('')}</div>
</div></section>
<section class="b-sec"><div class="w">
  <div class="b-sec-cab b-sec-cab-l"><div>${rotulo('Portfólio')}<h2>Obras em Cuiabá</h2></div><a class="lk" href="${L(v, 'portfolio')}">Ver o portfólio ${ic('seta')}</a></div>
  <div class="b-port">${[['133dac', 1], ['66fd9a', 4], ['40c1cc', 7], ['6b9cac', 2]].map(([f, k]) => { const o = obras[k]; return `<a href="${L(v, 'portfolio')}">${img(f, o.obra)}<span><b>${o.obra}</b>${o.autor}</span></a>`; }).join('')}</div>
</div></section>
${ctaB(v)}`;
}

function empresaB() {
  const v = 'b';
  return `${tituloPagB('A empresa', 'Vidro com especificação certa', `Fundada em ${E.fundacao} em Cuiabá. ${E.blindex}.`, '2646a2')}
<section class="b-sec"><div class="w b-emp">
  <p class="b-lead">${sobre}</p>
  <ul class="b-val">${valores.map((x, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b>${x}</li>`).join('')}</ul>
</div></section>
<section class="b-sec b-sec-c"><div class="w b-blx">
  <img src="/assets/blindex.png" alt="Blindex" width="150" height="150" loading="lazy">
  <div>${rotulo('Blindex')}<h2>${blindexFrase.t}</h2><p>${blindexFrase.s} Como distribuidora autorizada, a Vidrex entrega o temperado Blindex original, com etiqueta e recomendações de uso.</p><p>${blindexTexto}</p></div>
</div></section>
<section class="b-sec"><div class="w b-loja">
  <div>${rotulo('A loja')}<h2>No Porto, em Cuiabá</h2><p>${E.rua}, ${E.esquina}, ${E.bairro}, ${E.cidade} - ${E.uf}.</p><p class="b-cont"><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a href="${waLink()}" ${ext}>${ic('wa')} ${E.cel}</a></p><a class="bt bt-v" href="${E.rota}" ${ext}>Como chegar ${ic('seta')}</a></div>
  ${mapa()}
</div></section>
<section class="b-sec b-sec-g"><div class="w"><div class="b-serv-f">${fotosServico.map(([f, a]) => img(f, a)).join('')}</div></div></section>
${ctaB(v)}`;
}

function produtosB() {
  const v = 'b';
  return `${tituloPagB('Produtos', 'Vidros, espelhos, box, sacadas e fachadas', blindexTexto, '')}
<section class="b-sec b-sec-pt"><div class="w">${seletorVidro()}</div></section>
<section class="b-sec b-sec-c"><div class="w b-prod-g">
  <nav class="b-prod-nav" aria-label="Categorias"><p>Categorias</p>${produtos.map(p => `<a href="#${p.slug}">${p.nome}</a>`).join('')}</nav>
  <div class="b-prods">${produtos.map(p => `<article class="b-prod" id="${p.slug}">
    <div class="b-prod-t"><h2>${p.nome}</h2><p>${p.texto}</p><a class="lk" href="${L(v, 'orcamento')}?produto=${encodeURIComponent(p.nome)}">Pedir orçamento ${ic('seta')}</a></div>
    ${p.foto ? `<div class="b-prod-f">${fotoLb(p.foto, p.fotoAlt, p.slug)}${(p.galeria || []).slice(0, 3).map(([f, a]) => fotoLb(f, a, p.slug)).join('')}</div>` : `<div class="b-prod-f b-prod-sem"><span>Santa Marina</span><span>Blindex</span><span>Alumínio</span><span>Polímero</span></div>`}
  </article>`).join('')}</div>
</div></section>
${ctaB(v)}`;
}

function servicosB() {
  const v = 'b';
  return `${tituloPagB('Serviços', 'Da chapa à obra, na mesma loja', servicosIntro, 'serv-b')}
<section class="b-sec"><div class="w">
  <ol class="b-linha b-linha-c">${servicos.map((s, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b><h3>${s.nome}</h3><p>${s.d}</p></li>`).join('')}</ol>
</div></section>
<section class="b-sec b-sec-c"><div class="w b-serv3">${fotosServico.map(([f, a]) => `<figure>${fotoLb(f, a, 'serv')}<figcaption>${a}</figcaption></figure>`).join('')}</div></section>
${ctaB(v)}`;
}

function portfolioB() {
  const v = 'b';
  const itens = obras.flatMap(o => o.fotos.map((f, i) => ({ f, o, i })));
  return `${tituloPagB('Portfólio', 'Obras realizadas', 'Banheiros de mostra Casa Cor, sacadas, fachadas, escadas e portas em Cuiabá.', '')}
<section class="b-sec b-sec-pt"><div class="w" data-filtro>
  <div class="b-filtros" role="group" aria-label="Filtrar obras"><button type="button" aria-pressed="true" data-f="*">Todas</button>${tiposObra.map(t => `<button type="button" aria-pressed="false" data-f="${t}">${t}</button>`).join('')}</div>
  <div class="b-grade">${itens.map(({ f, o, i }) => `<figure data-tipo="${o.tipo}">${fotoLb(f, `${o.obra}, foto ${i + 1}`, 'port', `${o.obra} · ${o.autor}`)}<figcaption><b>${o.obra}</b>${o.autor}</figcaption></figure>`).join('')}</div>
</div></section>
<section class="b-sec b-sec-c"><div class="w b-ad-g">
  <div>${rotulo('Antes e depois')}<h2>Pele de vidro no Colégio Fato Júnior</h2><p>Arraste para comparar a fachada antes e depois do vidro.</p></div>
  ${antesDepois()}
</div></section>
${ctaB(v)}`;
}

function orcamentoB() {
  return `${tituloPagB('Orçamento', 'Peça seu orçamento', 'Diga o produto e as medidas aproximadas. O pedido sai pronto no WhatsApp da Vidrex.', '')}
<section class="b-sec b-sec-pt"><div class="w b-form-g">
  ${formulario('b')}
  <aside class="b-form-lado"><h3>Como medir</h3><ol><li>Meça a largura do vão em três alturas e use a menor.</li><li>Meça a altura em três pontos e use a menor.</li><li>Tire uma foto do local, de frente.</li></ol><p class="b-cont"><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a href="${waLink()}" ${ext}>${ic('wa')} ${E.cel}</a></p></aside>
</div></section>`;
}

function dicasB() {
  return `${tituloPagB('Dicas', 'Cuidados com o seu vidro', 'Limpeza, instalação e uso do box Blindex, e como o vidro é feito.', '90fe9a')}
<section class="b-sec"><div class="w b-dicas">${dicas.map(d => `<section class="b-dica" id="${d.slug}"><h2>${d.titulo}</h2><ul>${d.itens.map(t => `<li>${t}</li>`).join('')}</ul></section>`).join('')}</div></section>
<section class="b-sec b-sec-g" id="como-e-feito"><div class="w"><div class="b-sec-cab">${rotulo('Curiosidade')}<h2>Como é feito o vidro?</h2><p>Da areia ao recozimento, em seis etapas.</p></div>${comoFeitoBloco('b')}</div></section>`;
}

function contatoB() {
  return `${tituloPagB('Contato', 'Fale com a Vidrex', `${E.rua}, ${E.esquina}, ${E.bairro}, ${E.cidade} - ${E.uf}.`, '')}
<section class="b-sec b-sec-pt"><div class="w b-form-g">
  ${formulario('b', { orcamento: false })}
  <aside class="b-form-lado"><h3>Atendimento</h3><p class="b-cont"><a href="tel:${E.foneHref}">${ic('tel')} ${E.fone}</a><a href="${waLink()}" ${ext}>${ic('wa')} ${E.cel}</a></p><a class="bt bt-l" href="${E.rota}" ${ext}>${ic('pin')} Como chegar</a></aside>
</div></section>
<section class="b-sec b-sec-c"><div class="w">${mapa('mapa-l')}</div></section>`;
}

const desc = {
  index: `${E.blindex} em Cuiabá desde ${E.fundacao}: vidros comuns, temperados e laminados, espelhos, box, sacadas e fachadas.`,
  empresa: 'A Vidrex Vidros, fundada em 2009 em Cuiabá, distribuidora autorizada Blindex.',
  produtos: 'Vidro comum, temperado e laminado, espelhos, box, portas e janelas, acessórios, fachadas e sacadas.',
  servicos: 'Corte, lapidação, bisotê, furação, jateamento, pintura, montagens especiais e transporte.',
  portfolio: 'Obras da Vidrex Vidros: Casa Cor MT, sacadas, fachadas, escadas e portas.',
  orcamento: 'Peça um orçamento de vidros, espelhos, box, sacadas e fachadas pelo WhatsApp.',
  dicas: 'Cuidados com o box Blindex, limpeza dos vidros, instalação e como é feito o vidro.',
  contato: `Telefone ${E.fone}, WhatsApp ${E.cel}. ${E.endereco}.`,
};
const titulos = { index: 'Vidrex Vidros · Distribuidora autorizada Blindex em Cuiabá', empresa: 'A empresa', produtos: 'Produtos', servicos: 'Serviços', portfolio: 'Portfólio', orcamento: 'Orçamento', dicas: 'Dicas', contato: 'Contato' };
const corpos = {
  a: { index: homeA, empresa: empresaA, produtos: produtosA, servicos: servicosA, portfolio: portfolioA, orcamento: orcamentoA, dicas: dicasA, contato: contatoA },
  b: { index: homeB, empresa: empresaB, produtos: produtosB, servicos: servicosB, portfolio: portfolioB, orcamento: orcamentoB, dicas: dicasB, contato: contatoB },
};

export function gerarVersao(v) {
  const out = {};
  for (const n of nav) out[n.slug] = pagina(v, n.slug, n.slug === 'index' ? titulos.index : `${titulos[n.slug]} · Vidrex Vidros`, desc[n.slug], corpos[v][n.slug]());
  return out;
}
