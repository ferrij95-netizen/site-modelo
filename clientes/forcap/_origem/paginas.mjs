// Monta as páginas das versões A ("Concessionária": fiel ao site atual, faixa azul-marinho, cabeçalho com telefone e horário,
// barra de menu azul e a vitrine "Nossos veículos") e B ("Lotação": escolha pelo número de lugares, régua de capacidade
// das linhas, fichas comparadas em tabela). Estilos em public/assets/{base,a,b}.css.
import fs from 'node:fs';
import path from 'node:path';
import { empresa as E, textos as T, grupo, marcasPecas, montadoras, linhas, poltronas, rotulosFicha } from './conteudo.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const tamanhos = JSON.parse(fs.readFileSync(path.join(aqui, 'tamanhos.json'), 'utf8'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (src, alt, extra = '') => {
  const [w, h] = tamanhos[src] || [900, 600];
  return `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
};
const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const nomesVersao = { a: 'Concessionária', b: 'Lotação' };

const todos = linhas.flatMap(l => l.modelos.map(mo => ({ ...mo, linha: l, id: `${l.slug}-${slug(mo.nome)}` })));
const totalModelos = todos.length;
const faixa = l => {
  const n = l.modelos.map(x => x.lugares).filter(Boolean);
  return n.length ? [Math.min(...n), Math.max(...n)] : null;
};
const faixaTxt = l => { const f = faixa(l); return !f ? 'Sob consulta' : f[0] === f[1] ? `até ${f[1]} lugares` : `${f[0]} a ${f[1]} lugares`; };

const nav = [
  { slug: 'index', nome: 'Home', caminho: '' },
  { slug: 'veiculos', nome: 'Veículos novos', caminho: 'veiculos/', sub: true },
  { slug: 'seminovos', nome: 'Seminovos', externo: E.seminovos },
  { slug: 'financiamento', nome: 'Financiamento', caminho: 'financiamento/' },
  { slug: 'pecas-e-servicos', nome: 'Peças e serviços', caminho: 'pecas-e-servicos/' },
  { slug: 'empresa', nome: 'Empresa', caminho: 'empresa/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fb: '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8a0 0 0 010 0z"/>',
  pdf: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
  fora: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
  banco: '<path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"/>',
  chave: '<path d="M14 7a4 4 0 11-3.5 6L4 19.5V22h3v-2h2v-2h2l1.5-1.5A4 4 0 0114 7z"/><circle cx="15.5" cy="8.5" r="1"/>',
  onibus: '<rect x="4" y="3" width="16" height="15" rx="2"/><path d="M4 11h16M8 21v-3M16 21v-3"/><circle cx="8" cy="14.5" r="1"/><circle cx="16" cy="14.5" r="1"/>',
  caixa: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  caminhao: '<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  fone: '<path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="2" y="14" width="5" height="6" rx="1.5"/><rect x="17" y="14" width="5" height="6" rx="1.5"/>',
  lugar: '<path d="M7 4v9a2 2 0 002 2h8"/><path d="M7 15l-1 6M17 15v6M9 9h6"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const waLink = (txt = 'Olá! Vim pelo site da Força P Volare e gostaria de mais informações.', num = E.wa) => `https://wa.me/${num}?text=${encodeURIComponent(txt)}`;
const waModelo = mo => waLink(`Olá! Vim pelo site da Força P Volare e gostaria de uma proposta do Volare ${mo.linha.nome} ${mo.nome}.`);
// A asa do logo (o "V" com o triângulo laranja), recortada do próprio logo vetorizado (assets/asa.svg), usada como grafismo.
const asa = (cls = 'asa', branca = false) => `<img class="${cls}" src="/assets/asa${branca ? '-branco' : ''}.svg" alt="" width="172" height="86" aria-hidden="true">`;

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
<meta name="theme-color" content="#061143">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,600;0,700;0,800;1,700;1,800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script src="/assets/site.js" defer></script>
</head>`;
}

function menu(v, atual) {
  return nav.map(n => {
    if (n.externo) return `<a href="${n.externo}" target="_blank" rel="noopener">${n.nome} ${ic('fora', 'ic ic-fora')}</a>`;
    const a = `<a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''}>${n.nome}</a>`;
    if (!n.sub) return a;
    return `<div class="sub"><a href="/${v}/${n.caminho}"${n.slug === atual ? ' aria-current="page"' : ''} class="sub-a">${n.nome}</a>
      <div class="sub-lista">${linhas.map(l => `<a href="/${v}/veiculos/${l.slug}/">${img(`menu/${l.slug}`, '')}<span>${l.nome}</span></a>`).join('')}</div></div>`;
  }).join('');
}

function topo(v, atual) {
  const btnMenu = `<button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
  if (v === 'a') return `<div class="faixa"><div class="in">
  <div class="faixa-redes"><a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('fb')}</a><a href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">${ic('wa')}</a></div>
  <p>Concessionária Volare em Uberlândia e região</p>
</div></div>
<header class="topo"><div class="in topo-in">
  <a class="marca" href="/a/" aria-label="Força P Volare, página inicial"><img src="/assets/logo.svg" alt="Força P Volare" width="147" height="130"></a>
  <div class="topo-info"><span class="topo-ic">${ic('tel')}</span><div><b>Telefone</b><a href="tel:${E.foneHref}">${E.fone}</a><a href="${waLink()}" target="_blank" rel="noopener">${E.whats} <small>WhatsApp</small></a></div></div>
  <div class="topo-info"><span class="topo-ic">${ic('relogio')}</span><div><b>Funcionamento</b><span>Seg-Sex: 08:00-18:00</span><span>Sábado: 08:00-12:00</span></div></div>
  <a class="btn btn-laranja topo-cta" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} Falar com vendas</a>
  ${btnMenu}
</div>
<nav id="menu" class="barra" aria-label="Principal"><div class="in">${menu(v, atual)}</div></nav></header>`;
  return `<header class="topo"><div class="in topo-in">
  <a class="marca" href="/b/" aria-label="Força P Volare, página inicial"><img src="/assets/logo-branco.svg" alt="Força P Volare" width="147" height="130"></a>
  <nav id="menu" class="menu" aria-label="Principal">${menu(v, atual)}</nav>
  <a class="topo-tel" href="tel:${E.foneHref}">${ic('tel')}<span>${E.fone}</span></a>
  ${btnMenu}
</div></header>`;
}

function rodape(v) {
  return `<footer class="rodape"><div class="in">
  <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Força P Volare" width="147" height="130" loading="lazy"><p>Concessionária Volare do Grupo Pelegrini, em Uberlândia desde ${E.fundacao}. Veículos novos, seminovos, financiamento, peças e serviços.</p></div>
  <div><h3>Contato</h3><p>${E.endereco.join('<br>')}</p><p><a href="tel:${E.foneHref}">${E.fone}</a><br><a href="${waLink()}" target="_blank" rel="noopener">${E.whats} (WhatsApp)</a><br><a href="mailto:${E.email}">${E.email}</a></p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Ver no mapa</a></div>
  <div><h3>Veículos</h3>${linhas.map(l => `<a href="/${v}/veiculos/${l.slug}/">${l.nome}</a>`).join('')}</div>
  <div><h3>Funcionamento</h3>${E.horario.map(([d, h]) => `<p class="rod-hora"><span>${d}</span><b>${h}</b></p>`).join('')}<h3 class="rod-h-pecas">Peças</h3><p><a href="tel:${E.fonePecasHref}">${E.fonePecas}</a><br><a href="${waLink('Olá! Vim pelo site da Força P e preciso de uma peça.', E.waPecas)}" target="_blank" rel="noopener">${E.whatsPecas} (WhatsApp)</a></p></div>
</div><div class="in rod-fim"><span>© ${E.razao}</span><span>${T.aviso.replace('*', '')}</span></div></footer>
<a class="wa-flut" href="${waLink()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic('wa')}</a>`;
}

const pagina = (v, caminho, atual, titulo, descricao, corpo) => `${head(v, caminho, titulo, descricao)}
<body class="v-${v} p-${atual}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${topo(v, atual)}
<main id="conteudo">
${corpo}
</main>
${rodape(v)}
</body>
</html>
`;

// Título de seção. A: título centralizado em azul como no site atual, com a asa do logo. B: rótulo + título alinhado à esquerda.
const tit = (v, titulo, { eyebrow, sub, tag = 'h2', centro = v === 'a' } = {}) => `<div class="tit${centro ? ' tit-centro' : ''}">${v === 'a' ? asa('asa tit-asa') : ''}${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}<${tag}>${titulo}</${tag}>${sub ? `<p class="tit-sub">${sub}</p>` : ''}</div>`;

// Capa das páginas internas.
const capa = (v, eyebrow, titulo, sub, foto, fotoAlt = '') => v === 'a'
  ? `<section class="capa"><div class="in capa-in"><div class="capa-txt"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div>${foto ? `<figure class="capa-foto">${img(foto, fotoAlt, ' fetchpriority="high" loading="eager"')}</figure>` : ''}</div></section>`
  : `<section class="capa">${foto ? `<div class="capa-fundo">${img(foto, fotoAlt, ' fetchpriority="high" loading="eager"')}</div>` : ''}<div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

// ---------- blocos compartilhados ----------
const fichaDl = (f, cls = 'ficha') => {
  const k = Object.keys(f);
  return k.length ? `<dl class="${cls}">${k.map(x => `<div><dt>${rotulosFicha[x]}</dt><dd>${f[x]}</dd></div>`).join('')}</dl>` : '';
};
const fotoModelo = mo => mo.img.startsWith('linha/') ? `<div class="mod-foto mod-foto-cena">${img(mo.img, `Volare ${mo.nome}`)}</div>` : `<div class="mod-foto">${img(mo.img, `Volare ${mo.linha.nome} ${mo.nome}`)}</div>`;
const acoesModelo = mo => `<div class="mod-acoes"><a class="btn btn-azul" href="${waModelo(mo)}" target="_blank" rel="noopener">${ic('wa')} Pedir proposta</a>${mo.pdf ? `<a class="btn-texto" href="${E.pdf(mo.pdf)}" target="_blank" rel="noopener">${ic('pdf')} Ficha técnica</a>` : ''}</div>`;

const formulario = (tipo, campos, botao, destino) => `<form class="form" data-form="${tipo}" data-wa="${destino.wa}" data-email="${destino.email}" data-assunto="${esc(destino.assunto)}">
  ${campos.map(c => {
    const id = `${tipo}-${c.n}`;
    const req = c.req ? ' required' : '';
    if (c.tipo === 'select') return `<label class="${c.larga ? 'larga' : ''}" for="${id}"><span>${c.r}</span><select id="${id}" name="${c.r}"${req}>${c.opcoes.map(o => typeof o === 'string' ? `<option>${esc(o)}</option>` : `<optgroup label="${esc(o.g)}">${o.itens.map(i => `<option>${esc(i)}</option>`).join('')}</optgroup>`).join('')}</select></label>`;
    if (c.tipo === 'radio') return `<fieldset class="${c.larga ? 'larga' : ''}"><legend>${c.r}</legend>${c.opcoes.map((o, i) => `<label class="radio"><input type="radio" name="${c.r}" value="${esc(o)}"${i === 0 ? ' checked' : ''}> ${o}</label>`).join('')}</fieldset>`;
    if (c.tipo === 'area') return `<label class="larga" for="${id}"><span>${c.r}</span><textarea id="${id}" name="${c.r}" rows="4"${req}></textarea></label>`;
    return `<label class="${c.larga ? 'larga' : ''}" for="${id}"><span>${c.r}</span><input id="${id}" name="${c.r}" type="${c.tipo || 'text'}"${c.ac ? ` autocomplete="${c.ac}"` : ''}${req}></label>`;
  }).join('\n  ')}
  <div class="form-acoes larga"><button class="btn btn-laranja" type="submit" name="via" value="wa">${ic('wa')} ${botao} pelo WhatsApp</button><button class="btn btn-linha" type="submit" name="via" value="email">${ic('mail')} Enviar por e-mail</button></div>
  <p class="form-nota larga">O formulário abre o WhatsApp ou o seu e-mail com a mensagem pronta. Nada fica guardado no site.</p>
</form>`;
const opcoesVeiculos = [{ g: 'Ainda não sei', itens: ['Quero ajuda para escolher'] }, ...linhas.map(l => ({ g: l.nome, itens: l.modelos.map(mo => `${l.nome} · ${mo.nome}`) }))];
const contatoPessoa = [
  { n: 'nome', r: 'Nome', req: true, ac: 'name' },
  { n: 'tel', r: 'Telefone / WhatsApp', tipo: 'tel', req: true, ac: 'tel' },
  { n: 'email', r: 'E-mail', tipo: 'email', ac: 'email' },
  { n: 'cidade', r: 'Cidade', ac: 'address-level2' },
];

const mapa = () => `<div class="mapa"><iframe src="${E.mapaEmbed}" title="Mapa: ${E.endereco.join(', ')}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

// ---------- HOME ----------
function homeA() {
  return `<section class="heroa">
  <div class="heroa-fundo">${asa('asa heroa-asa', true)}</div>
  <div class="in heroa-in">
    <div class="heroa-txt">
      <p class="eyebrow">Grupo Pelegrini · Uberlândia/MG</p>
      <h1>Concessionária Volare em Uberlândia</h1>
      <p>Micro-ônibus novos para turismo, escola, fretamento, linhas urbanas e zona rural. Seminovos, financiamento e peças genuínas no mesmo endereço.</p>
      <div class="heroa-btns"><a class="btn btn-laranja" href="/a/veiculos/">Ver os veículos ${ic('seta')}</a><a class="btn btn-claro" href="${waLink()}" target="_blank" rel="noopener">${ic('wa')} ${E.whats}</a></div>
    </div>
    <figure class="heroa-carro">${img('foto/v8l-4x4-estudio', 'Volare V8L 4x4 laranja', ' fetchpriority="high" loading="eager"')}</figure>
  </div>
</section>

<section class="sec vitrine" id="veiculos">
  <div class="in">
    ${tit('a', 'Nossos Veículos', { sub: `Oito linhas e ${totalModelos} versões Volare. Escolha a linha para ver modelos, lugares e ficha técnica.` })}
    <div class="vitrine-grade">
      ${linhas.map(l => `<a class="vit" href="/a/veiculos/${l.slug}/">
        <span class="vit-foto">${img(`menu/${l.slug}`, `Volare ${l.nome}`)}</span>
        <span class="vit-nome">${l.nome}</span>
        <span class="vit-info">${l.modelos.length} ${l.modelos.length > 1 ? 'modelos' : 'modelo'} · ${faixaTxt(l)}</span>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="ajuda">
  <div class="in">
    <h2>Como podemos ajudá-lo(a)?</h2>
    <div class="ajuda-grade">
      <a href="/a/veiculos/">${ic('onibus')}<b>Comprar um Volare novo</b><span>Oito linhas, da van executiva ao micro de 51 lugares.</span></a>
      <a href="${E.seminovos}" target="_blank" rel="noopener">${ic('chave')}<b>Ver seminovos</b><span>Estoque Volare Seminovos de Uberlândia.</span></a>
      <a href="/a/financiamento/">${ic('banco')}<b>Financiar</b><span>Envie o veículo de interesse e receba as condições.</span></a>
      <a href="/a/pecas-e-servicos/">${ic('caixa')}<b>Peças e serviços</b><span>Peças genuínas e oficina autorizada linha diesel.</span></a>
    </div>
  </div>
</section>

<section class="sec empresa-home">
  <div class="in empresa-grade">
    <figure class="empresa-foto">${img('foto/loja', 'Equipe da Força P Volare no showroom em Uberlândia')}<figcaption>Showroom da Força P Volare, Uberlândia</figcaption></figure>
    <div class="empresa-txt">
      ${tit('a', 'A Empresa', { centro: false })}
      <p>${T.empresa[0]}</p>
      <p>${T.empresa[1]}</p>
      <ul class="grupo-lista">${grupo.map(g => `<li><b>${g.nome}</b><span>${g.txt}</span></li>`).join('')}</ul>
      <a class="btn btn-azul" href="/a/empresa/">Conheça a empresa ${ic('seta')}</a>
    </div>
  </div>
</section>

<section class="sec pecas-home">
  <div class="in pecas-grade">
    <div>
      ${tit('a', 'Peças e Serviços', { centro: false })}
      <p>${T.pecas[0].replace('MWM, CUMMINS, EATON, MERITOR e PERKINS', 'MWM, Cummins, Eaton, Meritor e Perkins').replace('VOLARE, AGRALE e INTERNATIONAL', 'Volare, Agrale e International')}</p>
      <div class="pecas-fones"><a href="tel:${E.fonePecasHref}">${ic('tel')} ${E.fonePecas}</a><a href="${waLink('Olá! Vim pelo site da Força P e preciso de uma peça.', E.waPecas)}" target="_blank" rel="noopener">${ic('wa')} ${E.whatsPecas}</a></div>
    </div>
    <ul class="marcas-lista" aria-label="Marcas atendidas">${marcasPecas.map(mk => `<li>${mk}</li>`).join('')}</ul>
  </div>
</section>

<section class="sec contato-home">
  <div class="in contato-home-grade">
    <div>
      ${tit('a', 'Venha nos conhecer', { centro: false })}
      <p>${T.convite}</p>
      <p class="end">${ic('pin')} ${E.endereco.join(' · ')}</p>
      <p class="end">${ic('relogio')} Seg-Sex 08:00-18:00 · Sábado 08:00-12:00</p>
      <div class="heroa-btns"><a class="btn btn-azul" href="/a/contato/">Fale conosco ${ic('seta')}</a><a class="btn btn-linha" href="${E.mapa}" target="_blank" rel="noopener">${ic('pin')} Como chegar</a></div>
    </div>
    ${mapa()}
  </div>
</section>`;
}

function homeB() {
  const marcas = [13, 21, 25, 31, 37, 46, 51];
  return `<section class="herob">
  <div class="herob-fundo">${asa('asa herob-asa', true)}</div>
  <div class="in herob-in"><div>
    <p class="eyebrow">Força P Volare · Uberlândia/MG</p>
    <h1>Quantos lugares a sua operação precisa?</h1>
    <p class="herob-sub">De 13 a 51 lugares: arraste e veja os Volare que atendem. Turismo, escolar, fretamento, urbano, rural e unidades especiais.</p>
    <div class="lugares" data-lugares>
      <div class="lugares-topo"><label for="lug">Passageiros</label><output for="lug" data-lug-out>25</output></div>
      <input id="lug" type="range" min="13" max="51" step="1" value="25" data-lug>
      <div class="lugares-marcas" aria-hidden="true">${marcas.map(n => `<span style="--p:${((n - 13) / 38 * 100).toFixed(1)}%">${n}</span>`).join('')}</div>
      <p class="lugares-res"><b data-lug-n>0</b> versões com <span data-lug-txt>25</span> lugares ou mais</p>
      <ul class="lugares-lista" data-lug-lista>${linhas.filter(l => faixa(l)).map(l => `<li data-lug-grupo><b>${l.nome}</b><span>${l.modelos.filter(mo => mo.lugares).map(mo => { const x = todos.find(t => t.linha === l && t.nome === mo.nome); return `<a href="/b/veiculos/${l.slug}/#${x.id}" data-lugares-max="${mo.lugares}" title="${esc(mo.cap)}">${mo.nome}</a>`; }).join('')}</span></li>`).join('')}</ul>
    </div></div>
    <div class="frota" aria-hidden="true">${['turismo-w-l', 'escolar-escolarbus-w9c', 'cinco-executivo'].map((f, i) => `<span class="frota-${i}">${img(`modelo/${f}`, '', ' loading="eager"')}</span>`).join('')}</div>
  </div>
</section>

<section class="sec regua-sec">
  <div class="in">
    ${tit('b', 'Oito linhas, da van executiva ao micro de 51 lugares', { eyebrow: 'Capacidade por linha' })}
    <div class="regua" role="list">
      <div class="regua-eixo" aria-hidden="true">${[0, 10, 20, 30, 40, 50].map(n => `<span style="--p:${(n / 52 * 100).toFixed(1)}%">${n}</span>`).join('')}</div>
      ${linhas.map(l => {
        const f = faixa(l);
        return `<a class="regua-linha" role="listitem" href="/b/veiculos/${l.slug}/">
        <span class="regua-nome">${img(`menu/${l.slug}`, '')}<b>${l.nome}</b></span>
        <span class="regua-trilho">${f ? `<span class="regua-barra" style="--de:${(f[0] / 52 * 100).toFixed(1)}%;--ate:${(f[1] / 52 * 100).toFixed(1)}%"><i>${f[0] === f[1] ? f[1] : `${f[0]}–${f[1]}`}</i></span>` : '<span class="regua-sob">sob consulta</span>'}</span>
        <span class="regua-n">${l.modelos.length}</span>
      </a>`;
      }).join('')}
    </div>
    <p class="regua-nota">Lugares máximos de cada versão, como informado nas fichas Volare. A última coluna é o número de versões.</p>
  </div>
</section>

<section class="usos">
  ${['turismo', 'escolar', 'fretamento', 'rural', 'urbano'].map(s => { const l = linhas.find(x => x.slug === s); return `<a class="uso" href="/b/veiculos/${s}/">${img(s === 'urbano' ? 'linha/urbano-retrato' : l.foto, l.fotoAlt)}<span><b>${l.nome}</b>${l.lema}</span></a>`; }).join('')}
</section>

<section class="sec posvenda">
  <div class="in">
    ${tit('b', 'Depois da compra, a Força P continua do seu lado', { eyebrow: 'Peças e serviços', sub: 'Posto de serviço autorizado e distribuidor MWM, Cummins, Eaton, Meritor e Perkins, junto com a Casa da Transmissão.' })}
    <ol class="passos" data-etapas>
      <li><span class="passo-n">01</span>${ic('fone')}<b>Televendas</b><p>Ligue ou chame no WhatsApp de peças com o modelo e o chassi.</p></li>
      <li><span class="passo-n">02</span>${ic('caixa')}<b>Amplo estoque</b><p>Peças genuínas e originais das principais fábricas do mercado.</p></li>
      <li><span class="passo-n">03</span>${ic('chave')}<b>Equipe técnica</b><p>Equipe de vendas e técnica treinada e especializada na linha diesel.</p></li>
      <li><span class="passo-n">04</span>${ic('caminhao')}<b>Entrega no Brasil</b><p>Serviço de entrega em todo o território nacional.</p></li>
    </ol>
    <div class="posvenda-pe"><figure>${img('foto/casa-transmissao', 'Fachada da Casa da Transmissão com um Volare da Polícia Militar de Minas Gerais')}</figure>
      <div><p class="posvenda-marcas">${marcasPecas.map(mk => `<span>${mk}</span>`).join('')}</p><p>Concessionária das montadoras ${montadoras.join(', ').replace(/, ([^,]*)$/, ' e $1')}.</p>
      <div class="heroa-btns"><a class="btn btn-laranja" href="${waLink('Olá! Vim pelo site da Força P e preciso de uma peça.', E.waPecas)}" target="_blank" rel="noopener">${ic('wa')} Pedir peça</a><a class="btn btn-linha" href="/b/pecas-e-servicos/">Peças e serviços ${ic('seta')}</a></div></div></div>
  </div>
</section>

<section class="sec numeros-sec">
  <div class="in numeros-grade">
    <div class="numeros-txt">${tit('b', 'Grupo Pelegrini, desde 1992 em Uberlândia', { eyebrow: 'A empresa' })}<p>${T.empresa[1]}</p><a class="btn btn-azul" href="/b/empresa/">Conheça a empresa ${ic('seta')}</a></div>
    <ul class="numeros">
      <li><b data-conta>1992</b><span>fundação do Grupo Pelegrini</span></li>
      <li><b data-conta>4</b><span>empresas no grupo</span></li>
      <li><b data-conta>8</b><span>linhas Volare</span></li>
      <li><b data-conta>${totalModelos}</b><span>versões no catálogo</span></li>
    </ul>
  </div>
</section>

<section class="fin-faixa">
  <div class="in fin-in">
    <div><h2>Financie o seu Volare</h2><p>Novo ou seminovo: diga o modelo e a cidade, a equipe retorna com as condições.</p></div>
    <div class="heroa-btns"><a class="btn btn-laranja" href="/b/financiamento/">Simular financiamento ${ic('seta')}</a><a class="btn btn-claro" href="${E.seminovos}" target="_blank" rel="noopener">Ver seminovos ${ic('fora')}</a></div>
  </div>
</section>`;
}

// ---------- VEÍCULOS (todas as linhas) ----------
function veiculos(v) {
  const filtro = `<div class="filtro" role="group" aria-label="Filtrar por linha"><button type="button" data-filtro="" aria-pressed="true">Todas</button>${linhas.map(l => `<button type="button" data-filtro="${l.slug}" aria-pressed="false">${l.nome}</button>`).join('')}</div>`;
  const lugaresFiltro = v === 'b' ? `<div class="lugares lugares-claro" data-lugares data-lugares-grade><div class="lugares-topo"><label for="lug2">Mínimo de passageiros</label><output for="lug2" data-lug-out>13</output></div><input id="lug2" type="range" min="13" max="51" value="13" data-lug></div>` : '';
  return `${capa(v, 'Veículos novos', 'Toda a linha Volare', `${totalModelos} versões em oito linhas. Filtre pela aplicação${v === 'b' ? ' ou pelo número de lugares' : ''} e peça a proposta do modelo direto no WhatsApp.`, v === 'a' ? 'foto/w7-estudio' : 'linha/cinco-executivo', 'Volare W7')}
<section class="sec"><div class="in">
  <div class="filtros">${filtro}${lugaresFiltro}</div>
  <div class="modelos-grade" data-grade>
    ${todos.map(mo => `<a class="mod-mini" href="/${v}/veiculos/${mo.linha.slug}/#${mo.id}" data-linha="${mo.linha.slug}" data-lugares-max="${mo.lugares || 99}">
      ${fotoModelo(mo)}<span class="mod-mini-linha">${mo.linha.nome}</span><b>${mo.nome}</b><span class="mod-mini-cap">${ic('lugar')} ${mo.cap}</span></a>`).join('')}
  </div>
  <p class="sem-res" data-sem-res hidden>Nenhuma versão com esse filtro. Fale com a equipe: a Volare monta configurações sob consulta.</p>
  <p class="aviso">${T.aviso}</p>
</div></section>`;
}

// ---------- LINHA ----------
function linha(v, l) {
  const outras = linhas.filter(x => x !== l);
  const temPoltronas = ['turismo', 'fretamento', 'escolar'].includes(l.slug);
  const lista = v === 'a'
    ? `<div class="modelos">${l.modelos.map(mo => { const x = todos.find(t => t.linha === l && t.nome === mo.nome); return `<article class="mod" id="${x.id}">
      ${fotoModelo(x)}
      <div class="mod-corpo"><p class="mod-linha">${l.nome}</p><h3>${mo.nome}</h3><p class="mod-cap">${ic('lugar')} <span>Capacidade máxima</span> <b>${mo.cap}</b></p>${mo.txt ? `<p class="mod-txt">${mo.txt}</p>` : ''}${fichaDl(mo.ficha)}${acoesModelo(x)}</div>
    </article>`; }).join('')}</div>`
    : `<div class="comp">${l.modelos.map(mo => { const x = todos.find(t => t.linha === l && t.nome === mo.nome); return `<article class="comp-lin" id="${x.id}">
      ${fotoModelo(x)}
      <div class="comp-cab"><h3>${mo.nome}</h3>${mo.lugares ? `<p class="comp-lug"><b>${mo.lugares}</b><span>lugares${mo.cap.includes('+') ? ` (${mo.cap})` : ''}</span></p>` : '<p class="comp-lug"><b>—</b><span>sob consulta</span></p>'}</div>
      ${mo.txt ? `<p class="mod-txt">${mo.txt}</p>` : ''}${fichaDl(mo.ficha, 'ficha ficha-b')}${acoesModelo(x)}
    </article>`; }).join('')}</div>`;
  return `${capa(v, `Linha ${l.nome}`, `Volare ${l.nome}`, `${l.lema} ${l.txt}`, l.foto, l.fotoAlt)}
<section class="sec"><div class="in">
  ${tit(v, v === 'a' ? `${l.nome}: ${l.modelos.length} ${l.modelos.length > 1 ? 'modelos' : 'modelo'}` : `${l.modelos.length} ${l.modelos.length > 1 ? 'versões' : 'versão'}, ${faixaTxt(l)}`, { eyebrow: v === 'b' ? 'Compare' : '' })}
  ${lista}
  <p class="aviso">${T.aviso}</p>
</div></section>
${temPoltronas ? `<section class="sec poltronas-sec"><div class="in">
  ${tit(v, 'Poltronas e revestimentos', { eyebrow: v === 'b' ? 'Personalize' : '', sub: 'Materiais e tipos de poltrona disponíveis para a personalização do seu Volare.' })}
  <div class="poltronas">${poltronas.map(p => `<figure>${img(p.img, `Poltrona ${p.nome}`)}<figcaption><b>${p.nome}</b>${p.sub ? ` ${p.sub}` : ''}</figcaption></figure>`).join('')}</div>
</div></section>` : ''}
<section class="sec outras-sec"><div class="in">
  ${tit(v, 'Outras linhas', { eyebrow: v === 'b' ? 'Continue vendo' : '' })}
  <div class="outras">${outras.map(o => `<a href="/${v}/veiculos/${o.slug}/">${img(`menu/${o.slug}`, '')}<b>${o.nome}</b><span>${faixaTxt(o)}</span></a>`).join('')}</div>
</div></section>`;
}

// ---------- FINANCIAMENTO ----------
function financiamento(v) {
  return `${capa(v, 'Financiamento', 'Financie o seu Volare', 'Novo ou seminovo, para empresa ou autônomo. Conte o veículo de interesse e a equipe da Força P retorna com as condições de financiamento.', v === 'a' ? 'linha/cinco-executivo' : 'linha/fretamento', 'Volare Cinco Executivo')}
<section class="sec"><div class="in form-grade">
  <div class="form-lado">
    ${tit(v, 'Peça uma simulação', { centro: false, eyebrow: v === 'b' ? 'Em 3 passos' : '' })}
    <ol class="mini-passos"><li><b>Escolha o veículo</b> novo ou seminovo, ou peça ajuda para escolher.</li><li><b>Envie os dados</b> pelo WhatsApp ou e-mail, com a mensagem pronta.</li><li><b>Receba as condições</b> da equipe de vendas da Força P.</li></ol>
    <p class="form-contato">${ic('tel')} <a href="tel:${E.foneHref}">${E.fone}</a><br>${ic('wa')} <a href="${waLink()}" target="_blank" rel="noopener">${E.whats}</a></p>
  </div>
  ${formulario('fin', [...contatoPessoa, { n: 'veiculo', r: 'Veículo de interesse', tipo: 'select', opcoes: opcoesVeiculos, larga: true }, { n: 'estado', r: 'Estado', tipo: 'radio', opcoes: ['Novo', 'Seminovo'] }, { n: 'entrada', r: 'Valor de entrada (opcional)' }, { n: 'msg', r: 'Mensagem', tipo: 'area' }], 'Enviar', { wa: E.wa, email: E.email, assunto: 'Financiamento pelo site' })}
</div></section>`;
}

// ---------- PEÇAS E SERVIÇOS ----------
function pecas(v) {
  return `${capa(v, 'Peças e serviços', 'Peças genuínas e oficina para a linha diesel', 'Posto de serviço autorizado e distribuidor MWM, Cummins, Eaton, Meritor e Perkins. Concessionária Volare, Agrale e International.', 'foto/casa-transmissao', 'Fachada da Casa da Transmissão')}
<section class="sec"><div class="in pecas-pag">
  <div>
    ${tit(v, 'Força P e Casa da Transmissão', { centro: false, eyebrow: v === 'b' ? 'Grupo Pelegrini' : '' })}
    ${T.pecas.map(p => `<p>${p.replace('MWM, CUMMINS, EATON, MERITOR e PERKINS', 'MWM, Cummins, Eaton, Meritor e Perkins').replace('VOLARE, AGRALE e INTERNATIONAL', 'Volare, Agrale e International')}</p>`).join('')}
    <ul class="marcas-lista marcas-lista-pag" aria-label="Marcas">${marcasPecas.map(mk => `<li>${mk}</li>`).join('')}</ul>
    <div class="pecas-fones"><a href="tel:${E.fonePecasHref}">${ic('tel')} ${E.fonePecas}</a><a href="${waLink('Olá! Vim pelo site da Força P e preciso de uma peça.', E.waPecas)}" target="_blank" rel="noopener">${ic('wa')} ${E.whatsPecas}</a></div>
  </div>
  <div class="form-box">
    <h2 class="form-tit">Cotar uma peça</h2>
    ${formulario('peca', [{ n: 'peca', r: 'Peça ou código', req: true, larga: true }, { n: 'modelo', r: 'Veículo e modelo' }, { n: 'ano', r: 'Ano' }, { n: 'chassi', r: 'Chassi (se tiver)', larga: true }, ...contatoPessoa.slice(0, 2)], 'Cotar', { wa: E.waPecas, email: E.email, assunto: 'Cotação de peça pelo site' })}
  </div>
</div></section>
<section class="sec servicos-sec"><div class="in">
  ${tit(v, 'O que a Força P faz pela sua frota', { eyebrow: v === 'b' ? 'Serviços' : '' })}
  <ol class="passos" data-etapas>
    <li><span class="passo-n">01</span>${ic('caixa')}<b>Varejo e atacado</b><p>Peças genuínas e originais das principais fábricas do mercado brasileiro.</p></li>
    <li><span class="passo-n">02</span>${ic('chave')}<b>Posto autorizado</b><p>Serviço autorizado das marcas MWM, Cummins, Eaton, Meritor e Perkins.</p></li>
    <li><span class="passo-n">03</span>${ic('fone')}<b>Televendas</b><p>Equipe de vendas e técnica treinada para achar a peça certa.</p></li>
    <li><span class="passo-n">04</span>${ic('caminhao')}<b>Entrega nacional</b><p>Envio para todo o território nacional.</p></li>
  </ol>
</div></section>`;
}

// ---------- EMPRESA ----------
function empresaPag(v) {
  return `${capa(v, 'Empresa', 'Força P Volare, Grupo Pelegrini', `Autopeças, assistência técnica e concessionária de caminhões e ônibus em Uberlândia/MG desde ${E.fundacao}.`, 'foto/loja', 'Equipe da Força P Volare no showroom')}
<section class="sec"><div class="in empresa-pag">
  <div class="empresa-pag-txt">
    ${tit(v, 'Quem somos', { centro: false, eyebrow: v === 'b' ? 'Desde 1992' : '' })}
    ${T.empresa.map(p => `<p>${p}</p>`).join('')}
    <p>As empresas que compõem o Grupo são: Casa do Chevrolet, Casa da Transmissão, Força P Centro Automotivo e a concessionária de caminhões e ônibus das marcas Volare e Agrale, Força P Caminhões e Ônibus.</p>
    <p class="destaque">${T.convite}</p>
  </div>
  <figure class="empresa-pag-foto">${img('foto/casa-transmissao', 'Casa da Transmissão, empresa do Grupo Pelegrini')}<figcaption>Casa da Transmissão, também do Grupo Pelegrini</figcaption></figure>
</div></section>
<section class="sec mvo-sec"><div class="in">
  <div class="mvo">
    <div><h3>Missão</h3><p>${T.missao}</p></div>
    <div><h3>Valores</h3><ul>${T.valores.map(x => `<li>${ic('ok')} ${x}</li>`).join('')}</ul></div>
    <div><h3>Objetivo</h3><p>${T.objetivo}</p></div>
  </div>
</div></section>
<section class="sec grupo-sec"><div class="in">
  ${tit(v, 'Empresas do Grupo Pelegrini', { eyebrow: v === 'b' ? 'O grupo' : '' })}
  <ol class="grupo-linha">${grupo.map((g, i) => `<li><span class="grupo-n">${String(i + 1).padStart(2, '0')}</span><b>${g.nome}</b><span>${g.txt}</span></li>`).join('')}</ol>
</div></section>`;
}

// ---------- CONTATO ----------
function contato(v) {
  return `${capa(v, 'Contato', 'Fale com a Força P Volare', 'Dúvidas, sugestões ou elogios: mande uma mensagem ou venha até a loja.', null)}
<section class="sec"><div class="in contato-pag">
  <div class="contato-dados">
    <div><h3>${ic('pin')} Endereço</h3><p>${E.endereco.join('<br>')}</p><a class="rod-link" href="${E.mapa}" target="_blank" rel="noopener">Como chegar ${ic('seta')}</a></div>
    <div><h3>${ic('tel')} Vendas</h3><p><a href="tel:${E.foneHref}">${E.fone}</a><br><a href="${waLink()}" target="_blank" rel="noopener">${E.whats} (WhatsApp)</a></p></div>
    <div><h3>${ic('caixa')} Peças e serviços</h3><p><a href="tel:${E.fonePecasHref}">${E.fonePecas}</a><br><a href="${waLink('Olá! Vim pelo site da Força P e preciso de uma peça.', E.waPecas)}" target="_blank" rel="noopener">${E.whatsPecas} (WhatsApp)</a></p></div>
    <div><h3>${ic('mail')} E-mail</h3><p><a href="mailto:${E.email}">${E.email}</a></p></div>
    <div><h3>${ic('relogio')} Funcionamento</h3>${E.horario.map(([d, h]) => `<p class="rod-hora"><span>${d}</span><b>${h}</b></p>`).join('')}</div>
  </div>
  <div class="form-box">
    <h2 class="form-tit">Envie uma mensagem</h2>
    ${formulario('cont', [...contatoPessoa, { n: 'assunto', r: 'Assunto', tipo: 'select', opcoes: ['Veículos novos', 'Seminovos', 'Financiamento', 'Peças e serviços', 'Dúvidas, sugestões ou elogios'], larga: true }, { n: 'msg', r: 'Mensagem', tipo: 'area', req: true }], 'Enviar', { wa: E.wa, email: E.email, assunto: 'Contato pelo site' })}
  </div>
</div></section>
<section class="mapa-larga">${mapa()}</section>`;
}

export function gerarVersao(v) {
  const p = {};
  const desc = 'Concessionária Volare do Grupo Pelegrini em Uberlândia/MG: micro-ônibus novos, seminovos, financiamento, peças e serviços linha diesel.';
  p['index'] = pagina(v, '', 'index', 'Força P Volare · Concessionária Volare em Uberlândia', desc, v === 'a' ? homeA() : homeB());
  p['veiculos'] = pagina(v, 'veiculos/', 'veiculos', 'Veículos novos Volare · Força P Volare', `Toda a linha Volare: ${linhas.map(l => l.nome).join(', ')}.`, veiculos(v));
  for (const l of linhas) p[`veiculos/${l.slug}`] = pagina(v, `veiculos/${l.slug}/`, 'veiculos', `Volare ${l.nome} · Força P Volare`, `${l.lema} ${l.txt}`.slice(0, 158), linha(v, l));
  p['financiamento'] = pagina(v, 'financiamento/', 'financiamento', 'Financiamento · Força P Volare', 'Financie seu Volare novo ou seminovo com a Força P em Uberlândia.', financiamento(v));
  p['pecas-e-servicos'] = pagina(v, 'pecas-e-servicos/', 'pecas-e-servicos', 'Peças e serviços · Força P Volare', 'Peças genuínas e posto autorizado MWM, Cummins, Eaton, Meritor e Perkins em Uberlândia.', pecas(v));
  p['empresa'] = pagina(v, 'empresa/', 'empresa', 'Empresa · Força P Volare', 'Força P Volare, empresa do Grupo Pelegrini, fundado em 1992 em Uberlândia/MG.', empresaPag(v));
  p['contato'] = pagina(v, 'contato/', 'contato', 'Contato · Força P Volare', `${E.endereco.join(', ')}. ${E.fone}.`, contato(v));
  return p;
}
