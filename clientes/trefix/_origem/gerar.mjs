// Trefix (Campo Alegre/SC): arames e barras trefiladas, decapagem química e fosfatização. Gera public/{a,b}/ e a página de escolha.
// node clientes/trefix/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs trefix https://www.trefix.com.br/)
// Textos, fotos, contatos e menu tirados do site atual (www.trefix.com.br). Logo vetorizado do logo.png dele (vetorizar-logo.py).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Trefix', url: 'https://trefix.overtus.com.br/', antigo: 'https://www.trefix.com.br/',
  fone: '(47) 3632-1019', email: 'trefix@trefix.com.br',
  end1: 'Rodovia estadual SC-110 (acesso a Bateias de Baixo), nº 2.700, Galpão 1',
  end2: 'Bairro Lageado, Campo Alegre/SC', cep: 'CEP 89294-000',
  tx: 'http://www.txpregos.com.br',
};
const ext = 'target="_blank" rel="noopener"';
const mapsQ = encodeURIComponent('Trefix, Rodovia SC-110, 2700, Lageado, Campo Alegre - SC, 89294-000');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Trefix em Campo Alegre/SC" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=14&output=embed"></iframe>`;

// Textos do site atual (página Empresa / Produtos)
const txt = {
  maquinas: 'A TREFIX dispõe de máquinas para trefilação de arames entre 1,80 mm e 32,00 mm, podendo estes serem fornecidos em rolos de 200 kg a 1.000 kg ou também em barras com até 12 metros de comprimento.',
  processos: 'Oferece também processos de decapagem química e de fosfatização em rolos, barras e peças.',
  estoque: 'Possui grande estoque de matéria-prima nos aços SAE 1004, SAE 1006, SAE 1008, SAE 1010, SAE 1012, SAE 1020 e SAE 1045.',
  atua: 'Atua nos segmentos de aramados em geral, indústria de fixadores, fabricantes de lã e palha de aço, indústria automobilística e construção civil.',
};
const acos = ['1004', '1006', '1008', '1010', '1012', '1020', '1045'];

// Ícones próprios (traço, mesmo estilo do kit)
const I2 = {
  aramado: '<path d="M4 4h16v16H4zM4 9.3h16M4 14.6h16M9.3 4v16M14.6 4v16"/>',
  fixador: '<path d="M8 3h8l-1 3H9zM10 6v13l2 2 2-2V6M10 9l4 1.5M10 12l4 1.5M10 15l4 1.5"/>',
  la: '<path d="M12 12c0-1.5 2-1.5 2 0s-2 3-4 1.5-.5-5 2.5-5 5 2.5 4 5.5-5 5-8 3.5-4.5-6-2.5-9 7-4 10-2"/>',
  carro: '<path d="M3 15v-3l2-5h14l2 5v3zM3 15v3h3v-3M18 15v3h3v-3M7 12h.01M17 12h.01M5 12h14"/>',
  obra: '<path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/>',
  rolo: '<ellipse cx="12" cy="12" rx="8" ry="8"/><ellipse cx="12" cy="12" rx="5" ry="5"/><ellipse cx="12" cy="12" rx="2" ry="2"/>',
  barra: '<path d="M3 8h18M3 12h18M3 16h18"/><circle cx="3" cy="8" r=".6"/><circle cx="3" cy="12" r=".6"/><circle cx="3" cy="16" r=".6"/>',
  acido: '<path d="M9 3h6M10 3v6l-5 10a1.5 1.5 0 001.3 2h11.4A1.5 1.5 0 0019 19l-5-10V3M7.5 14h9"/>',
  camada: '<path d="M12 3l9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>',
};
const ic2 = n => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I2[n]}</svg>`;

const segmentos = [
  ['aramado', 'Aramados em geral', 'Telas, grades, cestos e peças de arame.'],
  ['fixador', 'Indústria de fixadores', 'Pregos, parafusos, rebites e grampos.'],
  ['la', 'Lã e palha de aço', 'Arame para fabricantes de lã e palha de aço.'],
  ['carro', 'Indústria automobilística', 'Arames e barras para peças e componentes.'],
  ['obra', 'Construção civil', 'Arames e barras para a obra.'],
];

const produtos = [
  { id: 'arames', t: 'Arames trefilados', ic: 'rolo', f: 'rolo-arame', f2: 'carretel-arame', d: 'Trefilação de arames entre 1,80 mm e 32,00 mm, fornecidos em rolos de 200 kg a 1.000 kg.',
    l: ['Bitolas de 1,80 mm a 32,00 mm', 'Rolos de 200 kg a 1.000 kg', 'Aços SAE 1004 a 1045 em estoque'] },
  { id: 'barras', t: 'Barras trefiladas', ic: 'barra', f: 'barras-trefiladas', d: 'Arame trefilado também fornecido em barras com até 12 metros de comprimento.',
    l: ['Barras com até 12 metros', 'Mesma faixa de bitolas dos arames', 'Amarradas em feixes'] },
  { id: 'decapagem', t: 'Decapagem química', ic: 'acido', d: 'Processo de decapagem química em rolos, barras e peças, que remove a carepa (camada de óxido) da superfície do aço.',
    l: ['Em rolos, barras e peças', 'Superfície limpa para trefilar, conformar ou tratar'] },
  { id: 'fosfatizacao', t: 'Fosfatização', ic: 'camada', d: 'Fosfatização em rolos, barras e peças: uma camada de fosfato que ajuda a lubrificar a trefilação e protege a superfície do aço.',
    l: ['Em rolos, barras e peças', 'Ajuda na trefilação e na conformação a frio'] },
];

// Etapas do processo (escrito por nós, a partir dos serviços que a Trefix descreve)
const etapas = [
  ['Matéria-prima', 'Fio-máquina nos aços SAE 1004 a 1045, do estoque próprio.', 'estoque-rolos'],
  ['Decapagem química', 'Remove a carepa e deixa o aço limpo.', null],
  ['Fosfatização', 'Camada de fosfato que ajuda o arame a passar pela fieira.', null],
  ['Trefilação', 'O arame passa pelas fieiras e chega à bitola pedida, de 1,80 a 32,00 mm.', 'cabrestantes'],
  ['Rolo ou barra', 'Bobinado em rolos de 200 a 1.000 kg ou cortado em barras de até 12 m.', 'bobinadeira'],
];

const fotos = [
  ['linha-bobinadeira', 'Arame trefilado sendo bobinado na linha da Trefix', 1280, 450],
  ['trefiladora-bobina', 'Trefiladora com rolo de arame na Trefix', 600, 473],
  ['rolos-arame', 'Rolo de arame trefilado', 600, 427],
  ['estoque-rolos', 'Estoque de rolos de fio-máquina e arame', 600, 426],
  ['cabrestantes', 'Cabrestantes da máquina de trefilação', 600, 359],
  ['bobinadeira', 'Arame sendo enrolado na bobinadeira', 600, 444],
  ['tambor-trefila', 'Tambor da trefila com arame', 600, 414],
  ['rolo-arame', 'Rolo de arame trefilado', 500, 500],
  ['carretel-arame', 'Rolo de arame no carretel', 200, 300],
  ['barras-trefiladas', 'Feixe de barras trefiladas', 514, 394],
  ['painel-trefila', 'Painel de comando da linha de trefilação', 336, 178],
  ['fabrica', 'Fábrica da Trefix em Campo Alegre/SC', 700, 275],
];
const tam = Object.fromEntries(fotos.map(([n, , w, h]) => [n, [w, h]]));
const altDe = Object.fromEntries(fotos.map(([n, a]) => [n, a]));
const img = (n, alt = altDe[n], extra = '') => { const [w, h] = tam[n] || [600, 400]; return `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`; };
const imgTopo = (n, alt) => img(n, alt, ' fetchpriority="high"').replace(' loading="lazy"', '');
const foto = (n, alt = altDe[n], cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}"${cls ? ` class="${cls}"` : ''}>${img(n, alt)}</a>`;

const nav = [{ slug: 'index', nome: 'Home' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'produtos', nome: 'Produtos' }, { slug: 'localizacao', nome: 'Localização' }, { slug: 'fale-conosco', nome: 'Fale conosco' }];
export const nomesVersao = { a: 'Bitola certa', b: 'Linha de trefilação' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@112,700;112,800;125,800&family=Source+Sans+3:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Trefix | Arames e barras trefiladas em Campo Alegre/SC' : `${titulo} | Trefix`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: v === 'a' ? '#f86300' : '#2b2e31' });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnCot = (v, txt = 'Solicitar cotação', cls = 'btn') => `<a class="${cls}" href="${link(v, 'fale-conosco')}">${txt}</a>`;
const orbita = '<svg class="orbita" viewBox="0 0 120 40" aria-hidden="true"><path d="M4 30C20 10 92 2 116 8 96 4 34 12 14 30c-4 4 2 6 14 4C14 37 0 37 4 30z" fill="currentColor"/></svg>';
const sobre = (t, cls = '') => `<p class="sobrelinha${cls ? ` ${cls}` : ''}">${orbita}${t}</p>`;

function topo(v, slug) {
  const barra = `<div class="topo-barra"><div class="in"><span>${ic('pin')}Campo Alegre/SC · SC-110, nº 2.700</span><span class="tb-dir"><a href="mailto:${E.email}">${ic('mail')}${E.email}</a><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></span></div></div>`;
  return `<header class="topo">${barra}
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Trefix, página inicial"><img src="/assets/logo.svg" alt="Trefix" width="182" height="82"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    ${btnCot(v, 'Solicitar cotação', 'btn btn-topo')}
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Trefix" width="182" height="82" loading="lazy"><p>Arames e barras trefiladas, decapagem química e fosfatização.</p>
      <p class="bndes"><img src="/assets/img/bndes.webp" alt="Aceitamos Cartão BNDES" width="102" height="40" loading="lazy"></p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Produtos</h3><ul>${produtos.map(p => `<li><a href="${link(v, 'produtos')}#${p.id}">${p.t}</a></li>`).join('')}<li><a href="${E.tx}" ${ext}>Pregos e parafusos (TX Pregos)</a></li></ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end1}<br>${E.end2} · ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 Trefix. Todos os direitos reservados.</span></div>
</footer>
<script src="/assets/trefix.js" defer></script>
</body>
</html>`;
}

// ---------- blocos comuns ----------
const listaCheck = l => `<ul class="lista-check">${l.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Contato pelo site da Trefix">
  <div class="form-duas"><label>Assunto<select name="assunto"><option>Vendas</option><option>Sugestão</option><option>Dúvida</option><option>Outros</option></select></label><label>Nome *<input name="nome" required autocomplete="name"></label></div>
  <div class="form-duas"><label>Empresa *<input name="empresa" required autocomplete="organization"></label><label>CNPJ<input name="cnpj" inputmode="numeric"></label></div>
  <div class="form-duas"><label>E-mail *<input name="email" type="email" required autocomplete="email"></label><label>Telefone *<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Mensagem *<textarea name="mensagem" rows="5" required placeholder="Produto, aço SAE, bitola (mm), quantidade e forma de entrega (rolo ou barra)"></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar mensagem</button>
  <p class="form-nota">* campos obrigatórios. O botão abre o seu e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.end1}</span><span>${E.end2}</span><span>${E.cep}</span><a href="${mapsLink}" ${ext}>Ver no mapa</a></div></li>
</ul>`;
const fichaNumeros = cls => `<ul class="ficha ${cls || ''}">
  <li><strong>1,80<small> a </small>32,00<small> mm</small></strong><span>bitolas de trefilação</span></li>
  <li><strong>200<small> a </small>1.000<small> kg</small></strong><span>por rolo</span></li>
  <li><strong>12<small> m</small></strong><span>barras com até</span></li>
  <li><strong>7</strong><span>aços SAE em estoque</span></li>
</ul>`;
// Régua de bitolas: o círculo mostra a seção do arame em proporção (trefix.js)
const regua = () => `<div class="regua" data-regua>
  <div class="regua-vis" aria-hidden="true"><svg viewBox="0 0 200 200"><circle class="rg-ref" cx="100" cy="100" r="96"/><circle class="rg-fio" cx="100" cy="100" r="30"/></svg><span class="rg-escala">círculo maior = 32,00 mm</span></div>
  <div class="regua-ctl">
    <label for="bitola">Escolha a bitola</label>
    <output class="rg-val" for="bitola"><span>12,00</span> mm</output>
    <input id="bitola" type="range" min="1.8" max="32" step="0.1" value="12">
    <div class="rg-limites"><span>1,80 mm</span><span>32,00 mm</span></div>
    <p class="rg-txt">Fornecido em rolos de 200 kg a 1.000 kg ou em barras com até 12 metros de comprimento.</p>
  </div>
</div>`;
// Aços em estoque: os dois últimos dígitos do SAE 10XX indicam o carbono nominal em centésimos de %
const tabelaAcos = () => `<div class="acos">
  ${acos.map(a => { const c = Number(a.slice(2)); return `<div class="aco"><span class="aco-n">SAE ${a}</span><span class="aco-barra"><i style="width:${Math.max(4, c / 45 * 100).toFixed(1)}%"></i></span><span class="aco-c">~0,${String(c).padStart(2, '0')}% C</span></div>`; }).join('')}
  <p class="acos-nota">Nos aços SAE 10XX, os dois últimos dígitos indicam o teor nominal de carbono, em centésimos de %.</p>
</div>`;
const segLista = cls => `<ul class="segs ${cls || ''}">${segmentos.map(([i, t, d]) => `<li class="sobe">${ic2(i)}<h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>`;
const galeria = () => `<div class="galeria">${fotos.filter(f => f[0] !== 'fabrica').map(([n, a]) => foto(n, a)).join('')}</div>`;
const caixasHome = v => `<div class="caixas">
  <a class="cx cx-prod" href="${link(v, 'produtos')}"><span class="cx-foto">${img('rolos-arame')}</span><span class="cx-faixa">Produtos ${ic('seta')}</span></a>
  <a class="cx cx-tx" href="${E.tx}" ${ext}><span class="cx-foto"><img src="/assets/img/tx-pregos.webp" alt="TX Pregos" width="285" height="120" loading="lazy"></span><span class="cx-faixa">Pregos e parafusos ${ic('ext')}</span></a>
  <a class="cx cx-fale" href="${link(v, 'fale-conosco')}"><span class="cx-foto cx-contato">${ic('tel')}<span><strong>${E.fone}</strong>${E.email}</span></span><span class="cx-faixa">Fale conosco ${ic('seta')}</span></a>
</div>`;
const txBanda = cls => `<section class="sec tx ${cls || ''}"><div class="in tx-in">
  <img src="/assets/img/tx-pregos.webp" alt="TX Pregos" width="285" height="120" loading="lazy">
  <div><h2>Conheça também nossa linha de pregos, parafusos e grampos</h2><p>Produzidos pela TX Pregos, empresa irmã da Trefix em Campo Alegre.</p></div>
  <a class="btn btn-linha" href="${E.tx}" ${ext}>Ir para TX Pregos ${ic('ext')}</a>
</div></section>`;
const produtoDet = (p, i) => `<section class="pd${i % 2 ? ' inv' : ''}" id="${p.id}">
  <div class="in pd-in">
    <div class="pd-vis">${p.f ? `${foto(p.f, altDe[p.f], 'f1')}${p.f2 ? foto(p.f2, altDe[p.f2], 'f2') : ''}` : camadas(p.id)}</div>
    <div class="pd-txt sobe">
      <p class="pd-n">${ic2(p.ic)}<span>${String(i + 1).padStart(2, '0')}</span></p>
      <h2>${p.t}</h2>
      <p class="lead">${p.d}</p>
      ${listaCheck(p.l)}
      <a class="btn" href="/__V__/fale-conosco/">Cotar ${p.t.toLowerCase()}</a>
    </div>
  </div>
</section>`;
// Corte esquemático do arame (desenho simples, não é foto)
const camadas = id => `<figure class="corte corte-${id}" aria-label="Esquema do arame ${id === 'decapagem' ? 'antes e depois da decapagem' : 'com a camada de fosfato'}">
  <div class="corte-par">
    <div class="fio ${id === 'decapagem' ? 'com-carepa' : 'limpo'}"><i></i></div>
    <span class="seta-c">${ic('seta')}</span>
    <div class="fio ${id === 'decapagem' ? 'limpo' : 'fosfato'}"><i></i></div>
  </div>
  <figcaption>${id === 'decapagem' ? '<span><b class="k carepa"></b>carepa (óxido)</span><span><b class="k aco"></b>aço limpo</span>' : '<span><b class="k aco"></b>aço decapado</span><span><b class="k fosfato"></b>camada de fosfato</span>'}</figcaption>
</figure>`;
const descPadrao = 'Trefix, Campo Alegre/SC: arames trefilados de 1,80 a 32,00 mm em rolos de 200 a 1.000 kg, barras de até 12 m, decapagem química e fosfatização.';

// ================= VERSÃO A: Bitola certa (clara, como o site atual) =================
function paginasA() {
  const v = 'a';
  const P = {};
  P.index = head(v, 'index', '', descPadrao) + topo(v, 'index') + `
<section class="hero-a">
  <div class="in hero-a-in">
    <div class="hero-a-txt">
      <p class="hero-pre"><span class="ponto"></span>Especializada em</p>
      <h1>Arames e barras <em>trefiladas</em></h1>
      <p class="lead">Trefilação de 1,80 a 32,00 mm, decapagem química e fosfatização, com grande estoque de aço SAE em Campo Alegre/SC.</p>
      <div class="hero-acoes"><a class="btn" href="${link(v, 'produtos')}">Conheça os produtos ${ic('seta')}</a>${btnCot(v, 'Solicitar cotação', 'btn btn-linha')}</div>
    </div>
    <div class="palco" aria-hidden="true">
      <span class="palco-luz"></span>
      <svg class="orb orb-tras" viewBox="0 0 600 300"><defs><linearGradient id="og" x1="0" x2="1"><stop offset="0" stop-color="#ff8a2a"/><stop offset="1" stop-color="#e05400"/></linearGradient></defs><ellipse cx="300" cy="150" rx="286" ry="96" transform="rotate(-9 300 150)" fill="none" stroke="url(#og)" stroke-width="7" pathLength="100"/></svg>
      <img class="palco-rolo" src="/assets/img/rolo-recorte.webp" alt="" width="870" height="522" fetchpriority="high">
      <img class="palco-carretel" src="/assets/img/carretel-recorte.webp" alt="" width="260" height="449">
      <svg class="orb orb-frente" viewBox="0 0 600 300"><defs><linearGradient id="og2" x1="0" x2="1"><stop offset="0" stop-color="#ff8a2a"/><stop offset="1" stop-color="#e05400"/></linearGradient></defs><ellipse cx="300" cy="150" rx="286" ry="96" transform="rotate(-9 300 150)" fill="none" stroke="url(#og2)" stroke-width="7" pathLength="100"/></svg>
      <span class="cota c1"><b>1,80 a 32,00 mm</b>bitolas</span>
      <span class="cota c2"><b>200 a 1.000 kg</b>por rolo</span>
      <span class="cota c3"><b>SAE 1004 a 1045</b>em estoque</span>
    </div>
  </div>
  <div class="hero-a-base"><div class="in"><span>Arames trefilados</span><span>Barras até 12 m</span><span>Decapagem química</span><span>Fosfatização</span></div></div>
</section>
<section class="caixas-sec"><div class="in">${caixasHome(v)}</div></section>

<section class="sec ficha-sec"><div class="in">
  <div class="titulo-sec">${sobre('Capacidade')}<h2>Do fio de 1,80 mm à barra de 32 mm</h2><p>${txt.maquinas}</p></div>
  ${fichaNumeros()}
</div></section>

<section class="sec produtos-a"><div class="in">
  <div class="titulo-sec lado"><div>${sobre('Produtos e serviços')}<h2>O que sai da Trefix</h2></div><a class="link-seta" href="${link(v, 'produtos')}">Ver detalhes ${ic('seta')}</a></div>
  <div class="pa-grade">
    <a class="pa pa-arame" href="${link(v, 'produtos')}#arames">${img('rolo-arame')}<span class="pa-txt"><span class="pa-tag">Rolos de 200 a 1.000 kg</span><strong>Arames trefilados</strong><span>Bitolas de 1,80 a 32,00 mm</span></span></a>
    <a class="pa pa-barra" href="${link(v, 'produtos')}#barras">${img('barras-trefiladas')}<span class="pa-txt"><span class="pa-tag">Até 12 metros</span><strong>Barras trefiladas</strong></span></a>
    <div class="pa pa-trat">
      <p class="pa-tag">Em rolos, barras e peças</p>
      <a href="${link(v, 'produtos')}#decapagem">${ic2('acido')}<strong>Decapagem química</strong>${ic('seta')}</a>
      <a href="${link(v, 'produtos')}#fosfatizacao">${ic2('camada')}<strong>Fosfatização</strong>${ic('seta')}</a>
    </div>
  </div>
</div></section>

<section class="sec regua-sec"><div class="in regua-in">
  <div>${sobre('Faixa de bitolas')}<h2>Arraste e veja a bitola que a Trefix trefila</h2><p>Qualquer medida entre 1,80 mm e 32,00 mm. O círculo mostra a seção do arame em proporção à maior bitola.</p></div>
  ${regua()}
</div></section>

<section class="sec processo-a"><div class="in">
  <div class="titulo-sec">${sobre('Como fazemos')}<h2>Do fio-máquina ao arame na bitola certa</h2></div>
  <ol class="trilho-fio">
    ${etapas.map(([t, d, f], i) => `<li class="sobe" style="--i:${i}"><span class="bola">${i + 1}</span>${f ? `<span class="et-foto">${img(f)}</span>` : `<span class="et-foto et-ic">${ic2(i === 1 ? 'acido' : 'camada')}</span>`}<h3>${t}</h3><p>${d}</p></li>`).join('')}
  </ol>
</div></section>

<section class="sec acos-sec"><div class="in acos-in">
  <div>${sobre('Matéria-prima')}<h2>Grande estoque de aço SAE</h2><p>${txt.estoque}</p></div>
  ${tabelaAcos()}
</div></section>

<section class="sec seg-sec"><div class="in">
  <div class="titulo-sec">${sobre('Segmentos')}<h2>Para quem a Trefix fornece</h2></div>
  ${segLista()}
</div></section>

<section class="sec empresa-a"><div class="in empresa-a-in">
  <figure>${foto('fabrica')}</figure>
  <div>${sobre('A empresa')}<h2>Fábrica em Campo Alegre, Santa Catarina</h2><p>${txt.maquinas}</p><p>${txt.processos}</p>
  <p class="bndes-linha"><img src="/assets/img/bndes.webp" alt="Aceitamos Cartão BNDES" width="102" height="40" loading="lazy"><span>Aceitamos Cartão BNDES</span></p>
  <a class="link-seta" href="${link(v, 'empresa')}">Conheça a Trefix ${ic('seta')}</a></div>
</div></section>
${txBanda()}
<section class="sec faixa-cta"><div class="in"><h2>Precisa de arame ou barra trefilada?</h2><p>Mande aço, bitola e quantidade. Respondemos com a cotação.</p><div class="hero-acoes">${btnCot(v, 'Solicitar cotação', 'btn btn-claro')}<a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></div></div></section>
` + rodape(v);

  P.empresa = head(v, 'empresa', 'Empresa', `A Trefix trefila arames de 1,80 a 32,00 mm em Campo Alegre/SC, com decapagem química, fosfatização e estoque de aços SAE.`) + topo(v, 'empresa') + `
<section class="cab-pg"><div class="in">${sobre('Empresa')}<h1>Trefilação, decapagem e fosfatização em Campo Alegre/SC</h1></div></section>
<section class="sec emp-pg"><div class="in emp-in">
  <div class="emp-txt"><p class="lead">${txt.maquinas}</p><p>${txt.processos}</p><p>${txt.estoque}</p><p>${txt.atua}</p>
  <p class="bndes-linha"><img src="/assets/img/bndes.webp" alt="Aceitamos Cartão BNDES" width="102" height="40" loading="lazy"><span>Aceitamos Cartão BNDES</span></p></div>
  <div class="emp-fotos">${foto('fabrica', altDe.fabrica, 'ef1')}${foto('painel-trefila', altDe['painel-trefila'], 'ef2')}${foto('estoque-rolos', altDe['estoque-rolos'], 'ef3')}</div>
</div></section>
<section class="sec ficha-sec"><div class="in">${fichaNumeros()}</div></section>
<section class="sec acos-sec"><div class="in acos-in"><div>${sobre('Matéria-prima')}<h2>Aços em estoque</h2><p>${txt.estoque}</p></div>${tabelaAcos()}</div></section>
<section class="sec seg-sec"><div class="in"><div class="titulo-sec">${sobre('Segmentos')}<h2>Onde o arame da Trefix é usado</h2></div>${segLista()}</div></section>
<section class="sec seguranca"><div class="in seg-in">
  <div>${sobre('Segurança no trabalho')}<h2>SIPAT Trefix e TX Pregos</h2><p>A Trefix e a TX Pregos realizam a Semana Interna de Prevenção de Acidentes de Trabalho. Na edição de 2016, o Corpo de Bombeiros de Campo Alegre deu palestras de primeiros socorros, e os funcionários participaram de concurso de frases, questionários e sorteios.</p></div>
  <blockquote>“Viver com segurança: direito de todos, dever de cada um.”<cite>Frase de funcionário escolhida na SIPAT 2016</cite></blockquote>
</div></section>
${txBanda()}
` + rodape(v);

  P.produtos = head(v, 'produtos', 'Produtos', descPadrao) + topo(v, 'produtos') + `
<section class="cab-pg"><div class="in">${sobre('Produtos')}<h1>Arames e barras trefiladas, decapagem e fosfatização</h1><p class="lead">${txt.maquinas}</p>
<nav class="ancora" aria-label="Produtos">${produtos.map(p => `<a href="#${p.id}">${p.t}</a>`).join('')}<a href="${E.tx}" ${ext}>Pregos e parafusos ${ic('ext')}</a></nav></div></section>
${produtos.map((p, i) => produtoDet(p, i)).join('\n').replaceAll('/__V__/', `/${v}/`)}
<section class="sec regua-sec"><div class="in regua-in"><div>${sobre('Faixa de bitolas')}<h2>Qual bitola você precisa?</h2><p>Qualquer medida entre 1,80 mm e 32,00 mm.</p></div>${regua()}</div></section>
<section class="sec acos-sec"><div class="in acos-in"><div>${sobre('Matéria-prima')}<h2>Aços SAE em estoque</h2><p>${txt.estoque}</p></div>${tabelaAcos()}</div></section>
<section class="sec galeria-sec"><div class="in"><div class="titulo-sec">${sobre('Fotos')}<h2>Na fábrica</h2><p>Toque em uma foto para ampliar.</p></div>${galeria()}</div></section>
${txBanda()}
` + rodape(v);

  P.localizacao = head(v, 'localizacao', 'Localização', `Trefix: ${E.end1}, ${E.end2}, ${E.cep}.`) + topo(v, 'localizacao') + `
<section class="cab-pg"><div class="in">${sobre('Localização')}<h1>Na SC-110, em Campo Alegre/SC</h1></div></section>
<section class="sec local-pg"><div class="in local-in">
  <div class="local-txt">
    <address><strong>Trefix</strong><br>${E.end1}<br>${E.end2}<br>${E.cep}</address>
    <p><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p>
    <a class="btn" href="${mapsLink}" ${ext}>${ic('pin')}Abrir no Google Maps</a>
    <figure class="local-foto">${foto('fabrica')}</figure>
  </div>
  ${mapaFrame}
</div></section>
` + rodape(v);

  P['fale-conosco'] = head(v, 'fale-conosco', 'Fale conosco', `Fale com a Trefix: ${E.fone}, ${E.email}.`) + topo(v, 'fale-conosco') + `
<section class="cab-pg"><div class="in">${sobre('Fale conosco')}<h1>Cotações, dúvidas e sugestões</h1><p class="lead">Fale conosco também pelo formulário. Para cotação, informe o aço, a bitola e a quantidade.</p></div></section>
<section class="sec contato-pg"><div class="in contato-in">
  <div class="contato-form">${formulario()}</div>
  <aside class="contato-lado">${contatoLista()}</aside>
</div></section>
` + rodape(v);
  return P;
}

// ================= VERSÃO B: Linha de trefilação (grafite e laranja, foto em destaque) =================
function paginasB() {
  const v = 'b';
  const P = {};
  P.index = head(v, 'index', '', descPadrao) + topo(v, 'index') + `
<section class="hero-b">
  <span class="hero-b-palavra" aria-hidden="true">TREFILADOS</span>
  <svg class="hero-b-fio" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true"><path d="M-20 330 C 300 330 420 120 760 150 S 1200 300 1460 90" pathLength="100"/></svg>
  <div class="in hero-b-in">
    <div class="hero-b-txt">
      <p class="hero-pre">Especializada em</p>
      <h1>Arames e barras <span>trefiladas</span></h1>
      <p class="lead">Trefilação de 1,80 a 32,00 mm, rolos de 200 a 1.000 kg e barras de até 12 m. Decapagem química e fosfatização em rolos, barras e peças.</p>
      <div class="hero-acoes"><a class="btn" href="${link(v, 'produtos')}">Conheça os produtos ${ic('seta')}</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></div>
    </div>
    <figure class="hero-b-prod">
      <img class="hb-barras" src="/assets/img/barras-recorte.webp" alt="Feixe de barras trefiladas da Trefix" width="958" height="686" fetchpriority="high">
      <img class="hb-rolo" src="/assets/img/rolo-recorte.webp" alt="" width="870" height="522" aria-hidden="true">
      <figcaption><span><b>12 m</b>barras</span><span><b>32,00 mm</b>bitola máx.</span></figcaption>
    </figure>
  </div>
  <div class="hero-b-regua" aria-hidden="true"><div class="in"><span>1,80</span><i></i><span>5</span><i></i><span>10</span><i></i><span>15</span><i></i><span>20</span><i></i><span>25</span><i></i><span>32,00 mm</span></div></div>
</section>
<section class="caixas-sec"><div class="in">${caixasHome(v)}</div></section>

<section class="sec linhas-b"><div class="in">
  <div class="titulo-sec lado"><div>${sobre('Produtos e serviços')}<h2>Quatro linhas, uma fábrica</h2></div><a class="link-seta" href="${link(v, 'produtos')}">Detalhes de cada uma ${ic('seta')}</a></div>
  <ol class="lb">${produtos.map((p, i) => `<li class="sobe"><a href="${link(v, 'produtos')}#${p.id}"><span class="lb-n">${String(i + 1).padStart(2, '0')}</span><span class="lb-t"><strong>${p.t}</strong><span>${p.l[0]}${p.l[1] ? ` · ${p.l[1]}` : ''}</span></span>${p.f ? `<span class="lb-f">${img(p.f)}</span>` : `<span class="lb-f lb-ic">${ic2(p.ic)}</span>`}${ic('seta')}</a></li>`).join('')}</ol>
</div></section>

<section class="processo-b">
  <div class="in">
    <div class="titulo-sec claro">${sobre('Como fazemos', 'claro')}<h2>O caminho do arame dentro da Trefix</h2><p>O fio entra grosso e sai na bitola pedida. A linha abaixo afina como o arame.</p></div>
    <ol class="pb">${etapas.map(([t, d, f], i) => `<li class="sobe" style="--i:${i}"><div class="pb-fio" style="--g:${(14 - i * 2.6).toFixed(1)}px"></div><span class="pb-n">${String(i + 1).padStart(2, '0')}</span>${f ? `<figure>${img(f)}</figure>` : `<figure class="pb-ic">${ic2(i === 1 ? 'acido' : 'camada')}</figure>`}<h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="sec regua-b"><div class="in regua-in">
  ${regua()}
  <div>${sobre('Faixa de bitolas')}<h2>De 1,80 a 32,00 mm</h2><p>${txt.maquinas}</p>${btnCot(v, 'Cotar uma bitola')}</div>
</div></section>

<section class="sec acos-b"><div class="in acos-in">
  <div>${sobre('Matéria-prima', 'claro')}<h2>Sete aços SAE em estoque</h2><p>${txt.estoque}</p></div>
  ${tabelaAcos()}
</div></section>

<section class="sec seg-b"><div class="in">
  <div class="titulo-sec centro">${sobre('Segmentos')}<h2>Arame para quem transforma aço</h2></div>
  ${segLista('segs-b')}
</div></section>

<section class="fotos-b" aria-label="Fotos da fábrica">
  ${['trefiladora-bobina', 'tambor-trefila', 'estoque-rolos', 'bobinadeira', 'cabrestantes'].map(n => foto(n)).join('')}
</section>

<section class="sec empresa-b"><div class="in empresa-b-in">
  <div>${sobre('A empresa')}<h2>Trefix, Campo Alegre/SC</h2><p>${txt.processos} ${txt.atua}</p>
  <p class="bndes-linha"><img src="/assets/img/bndes.webp" alt="Aceitamos Cartão BNDES" width="102" height="40" loading="lazy"><span>Aceitamos Cartão BNDES</span></p>
  <a class="btn" href="${link(v, 'empresa')}">Conheça a empresa ${ic('seta')}</a></div>
  <figure>${foto('fabrica')}</figure>
</div></section>
${txBanda('tx-b')}
` + rodape(v);

  const cab = (tag, h1, lead = '', f = 'tambor-trefila') => `<section class="cab-b"><div class="cab-b-fundo">${img(f, '')}</div><div class="in">${sobre(tag, 'claro')}<h1>${h1}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div></section>`;

  P.empresa = head(v, 'empresa', 'Empresa', `A Trefix trefila arames de 1,80 a 32,00 mm em Campo Alegre/SC, com decapagem química, fosfatização e estoque de aços SAE.`) + topo(v, 'empresa') +
    cab('Empresa', 'Trefilação de arames em Campo Alegre/SC', '', 'estoque-rolos') + `
<section class="sec emp-b"><div class="in emp-b-in">
  <figure class="emp-b-foto">${foto('fabrica')}</figure>
  <div class="emp-b-txt"><p class="lead">${txt.maquinas}</p><p>${txt.processos}</p><p>${txt.estoque}</p><p>${txt.atua}</p></div>
</div></section>
<section class="sec ficha-b"><div class="in">${fichaNumeros('ficha-escura')}</div></section>
<section class="sec seg-b"><div class="in"><div class="titulo-sec centro">${sobre('Segmentos')}<h2>Segmentos atendidos</h2></div>${segLista('segs-b')}</div></section>
<section class="sec seguranca-b"><div class="in seg-in">
  <figure>${foto('painel-trefila')}</figure>
  <div>${sobre('Segurança no trabalho')}<h2>SIPAT Trefix e TX Pregos</h2><p>A Trefix e a TX Pregos realizam a Semana Interna de Prevenção de Acidentes de Trabalho. Na edição de 2016, o Corpo de Bombeiros de Campo Alegre deu palestras de primeiros socorros, com concurso de frases, questionários e sorteios entre os funcionários.</p>
  <blockquote>“Trabalhar seguro é garantir o futuro!”<cite>Frase de funcionário escolhida na SIPAT 2016</cite></blockquote></div>
</div></section>
${txBanda('tx-b')}
` + rodape(v);

  P.produtos = head(v, 'produtos', 'Produtos', descPadrao) + topo(v, 'produtos') +
    cab('Produtos', 'Arames, barras e tratamento de superfície', 'Trefilação de 1,80 a 32,00 mm, decapagem química e fosfatização em rolos, barras e peças.', 'bobinadeira') + `
<nav class="ancora-b" aria-label="Produtos"><div class="in">${produtos.map(p => `<a href="#${p.id}">${p.t}</a>`).join('')}<a href="${E.tx}" ${ext}>Pregos e parafusos ${ic('ext')}</a></div></nav>
${produtos.map((p, i) => produtoDet(p, i)).join('\n').replaceAll('/__V__/', `/${v}/`)}
<section class="sec regua-b"><div class="in regua-in">${regua()}<div>${sobre('Faixa de bitolas')}<h2>Escolha a bitola</h2><p>Qualquer medida entre 1,80 mm e 32,00 mm.</p>${btnCot(v, 'Cotar uma bitola')}</div></div></section>
<section class="sec acos-b"><div class="in acos-in"><div>${sobre('Matéria-prima', 'claro')}<h2>Aços SAE em estoque</h2><p>${txt.estoque}</p></div>${tabelaAcos()}</div></section>
<section class="sec galeria-sec"><div class="in"><div class="titulo-sec">${sobre('Fotos')}<h2>Na fábrica</h2></div>${galeria()}</div></section>
` + rodape(v);

  P.localizacao = head(v, 'localizacao', 'Localização', `Trefix: ${E.end1}, ${E.end2}, ${E.cep}.`) + topo(v, 'localizacao') + `
<section class="local-b">
  ${mapaFrame}
  <div class="local-b-card">
    ${sobre('Localização')}
    <h1>Campo Alegre/SC</h1>
    <address>${E.end1}<br>${E.end2}<br>${E.cep}</address>
    <p><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p>
    <a class="btn" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>
  </div>
</section>
` + rodape(v);

  P['fale-conosco'] = head(v, 'fale-conosco', 'Fale conosco', `Fale com a Trefix: ${E.fone}, ${E.email}.`) + topo(v, 'fale-conosco') + `
<section class="sec contato-b"><div class="in contato-b-in">
  <div class="contato-b-lado">${sobre('Fale conosco', 'claro')}<h1>Vamos cotar o seu arame</h1><p>Informe o aço, a bitola, a quantidade e se prefere rolo ou barra.</p>${contatoLista()}</div>
  <div class="contato-b-form"><h2>Fale conosco pelo formulário</h2>${formulario()}</div>
</div></section>
` + rodape(v);
  return P;
}

// ---------- gravação ----------
fs.mkdirSync(path.join(pub, 'assets'), { recursive: true });
copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
fs.copyFileSync(path.join(aqui, 'trefix.js'), path.join(pub, 'assets/trefix.js'));
escreverVersao(pub, 'a', paginasA());
escreverVersao(pub, 'b', paginasB());
await escolha(pub, {
  nome: 'Trefix', artigo: 'da', url: E.url, lang: 'pt', cor: '#f86300', fundo: '#26282b', claro: '#f4f4f2',
  fonteTitulo: "'Archivo',system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara como o site atual, com o laranja do logo nos destaques. Abre com a foto da bobinadeira e as três caixas da home de hoje (Produtos, Pregos e Parafusos, Fale Conosco).', pontos: ['Régua de bitolas: arraste de 1,80 a 32,00 mm', 'Processo do fio-máquina ao arame com fotos reais', 'Aços SAE em estoque e segmentos atendidos'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais industrial: grafite e laranja, foto da linha em tela cheia e as quatro linhas de produto em lista grande.', pontos: ['Processo com uma linha que afina como o arame', 'Faixa de fotos da fábrica', 'Localização com mapa em tela cheia'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
