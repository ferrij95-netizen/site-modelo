// Fundição Bitencourt (Criciúma/SC): fundição de não ferrosos, peças acabadas em ligas de cobre e alumínio. Gera public/{a,b}/ e a página de escolha.
// node clientes/fundicaobitencourt/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs fundicaobitencourt https://www.fundicaobitencourt.com.br/)
// Textos, fotos, produtos e contatos do site atual (dados.mjs). Logo vetorizado do logo dele (vetorizar-logo.py).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';
import { E, plantas, T, pilares, normas, historia, processos, laboratorio, maquinas, socio, politica, carteira, segmentos, necessidade, proposta, solucao, galeria, linhas, produtos, destaques } from './dados.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const ext = 'target="_blank" rel="noopener"';
const mapsQ = encodeURIComponent(plantas[0].q);
const mapsLink = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const mapa = (q, t) => `<iframe class="mapa" title="${esc(t)}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed"></iframe>`;

// Ícones próprios (traço)
const I2 = {
  cadinho: '<path d="M5 8h14l-2 11a2 2 0 01-2 1.7H9A2 2 0 017 19z"/><path d="M4 8h16M9 4c0 1.5 1 2 1 3M13 3c0 1.5 1 2.5 1 4"/>',
  selo: '<circle cx="12" cy="9" r="6"/><path d="M9 14.5L7.5 21l4.5-2.5 4.5 2.5L15 14.5"/><path d="M9.5 9l1.8 1.8L14.7 7.5"/>',
  folha: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l8-8"/>',
  aperto: '<path d="M2 12l4-4 4 2 3-2 4 1 5 3"/><path d="M6 8l-4 4 6 6 2-1 2 2 2-1 2 1 3-3"/><path d="M11 13l2 2M13 11l3 3"/>',
  raio: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  engrenagem: '<path d="M12 8.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z"/><path d="M12 2l1.6 2.6 3-.6.7 3 2.7 1.4-1.2 2.8 1.2 2.8-2.7 1.4-.7 3-3-.6L12 22l-1.6-2.6-3 .6-.7-3L4 15.6l1.2-2.8L4 10l2.7-1.4.7-3 3 .6z"/>',
  gota: '<path d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z"/>',
  estrela: '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
  lab: '<path d="M9 3h6M10 3v6l-5 10a1.5 1.5 0 001.3 2h11.4A1.5 1.5 0 0019 19l-5-10V3M7.5 14h9"/>',
  forno: '<rect x="4" y="6" width="16" height="14" rx="1"/><path d="M8 6V3M16 6V3M8 13c1-2 2-2 4-1s3 1 4-1M8 17h8"/>',
  cnc: '<path d="M3 20h18M5 20V9h14v11M9 9V4h6v5M12 12v4M10 16h4"/>',
  caminhao: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  pessoas: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 016 5"/>',
  reciclar: '<path d="M7 19H4l3-5M17 19h3l-3-5M9 5l3-2 3 5M7 14l-2-3 3-5M17 14l2-3-3-5M9 19h6"/>',
  livro: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5M8 7h7"/>',
};
const ic2 = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I2[n]}</svg>`;
const icPilar = ['cadinho', 'selo', 'folha', 'aperto'];
const icSocio = ['raio', 'gota', 'reciclar', 'pessoas', 'livro'];

const tam = Object.fromEntries([...galeria.map(([n, , w, h]) => [n, [w, h]]),
  ...produtos.flatMap(p => [[p.img[0], [p.img[1], p.img[2]]], ...p.fotos.map(f => [f[0], [f[1], f[2]]])]),
  ['metal-liquido', [1194, 425]], ['cadinho', [1024, 1024]], ['usinagem-cavacos', [399, 255]], ['textura-cobre', [600, 450]]]);
const altG = Object.fromEntries(galeria.map(([n, a]) => [n, a]));
const img = (n, alt = altG[n] || '', extra = '') => { const [w, h] = tam[n] || [800, 600]; return `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`; };
const imgTopo = (n, alt) => img(n, alt, ' fetchpriority="high"').replace(' loading="lazy"', '');
const foto = (n, alt = altG[n], cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}"${cls ? ` class="${cls}"` : ''}>${img(n, alt)}</a>`;

const nav = [{ slug: 'index', nome: 'Principal' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'produtos', nome: 'Produtos' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Peça acabada', b: 'Centrifugação' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Saira:wdth,wght@112,600;125,700;125,800&family=Asap:ital,wght@0,400;0,500;0,600;1,400&display=swap';
const pslug = p => `produtos/${p.slug}`;
const descPadrao = 'Fundição de não ferrosos em Criciúma/SC: peças acabadas em ligas de cobre e alumínio por areia verde, shell molding, coquilhamento e centrifugação. ISO 9000.';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Fundição Bitencourt | Fundição de não ferrosos em Criciúma/SC' : `${titulo} | Fundição Bitencourt`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: v === 'a' ? '#3b2416' : '#1c2023' });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnOrc = (v, txt = 'Solicitar orçamento', cls = 'btn') => `<a class="${cls}" href="${link(v, 'contato')}">${txt}</a>`;
const sobre = (t, cls = '') => `<p class="sobrelinha${cls ? ` ${cls}` : ''}">${t}</p>`;
const listaCheck = l => `<ul class="lista-check">${l.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;

function topo(v, slug) {
  const ativo = slug.startsWith('produtos') ? 'produtos' : slug;
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span>${E.slogan}</span><span class="tb-dir"><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Fundição Bitencourt, página inicial"><img src="/assets/${v === 'a' ? 'logo' : 'logo-branco'}.svg" alt="Fundição Bitencourt" width="200" height="43"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, ativo)}</ul></nav>
    ${btnOrc(v, 'Solicitar orçamento', 'btn btn-topo')}
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
    <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Fundição Bitencourt" width="200" height="43" loading="lazy"><p>Fundição de não ferrosos. Peças acabadas em ligas de cobre e ligas de alumínio desde 1986.</p><p class="iso">${ic2('selo')}Certificação ISO 9000</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('relogio')}<span>${E.horario}</span></li>
    </ul></div>
    ${plantas.map(p => `<div><h3>${p.nome}</h3><address>${p.end}<br>${p.bairro}<br>${p.cidade} · ${p.cep}</address></div>`).join('')}
  </div>
  <div class="in rod-base"><span>© 2026 Fundição Bitencourt. Todos os direitos reservados.</span></div>
</footer>
<script src="/assets/fb.js" defer></script>
</body>
</html>`;
}

// ---------- blocos comuns ----------
const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Contato pelo site da Fundição Bitencourt">
  <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>E-mail *<input name="email" type="email" required autocomplete="email"></label><label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label></div>
  <label>Produto<select name="produto"><option>Peça sob desenho</option>${produtos.map(p => `<option>${esc(p.curto)}</option>`).join('')}</select></label>
  <label>Como podemos ajudá-lo? *<textarea name="mensagem" rows="5" required placeholder="Liga, dimensões, quantidade e aplicação da peça"></textarea></label>
  <button class="btn" type="submit">Enviar mensagem ${ic('seta')}</button>
  <p class="form-nota">Abre o seu e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><span>Contato telefônico</span><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('relogio')}<div><span>Horário de funcionamento</span><strong>${E.horario}</strong></div></li>
  <li>${ic('mail')}<div><span>Contato eletrônico</span><a href="mailto:${E.email}">${E.email}</a></div></li>
</ul>`;
const ligasDe = p => p.mat.flatMap(m => m.fb);
const fichaMat = p => p.mat.length ? p.mat.map(m => `<div class="mat"><span class="mat-rot">${m.rotulo}</span><span class="mat-fb">${m.fb.map(f => `<b>${f}</b>`).join('')}</span><span class="mat-ref">${m.ref}</span></div>`).join('') : `<p class="mat-texto">${p.matTexto || 'Liga definida conforme a peça e o acabamento desejado.'}</p>`;
const prodImg = (p, extra = '') => img(p.img[0], p.curto, extra);

// Tabela de ligas: cada código FB com os produtos que o usam (cruzado das fichas)
const tabelaLigas = v => {
  const m = new Map();
  for (const p of produtos) for (const x of p.mat) for (const fb of x.fb) { if (!m.has(fb)) m.set(fb, new Set()); m.get(fb).add(p); }
  const ord = [...m.keys()].sort((a, b) => (a.startsWith('FB') ? 0 : 1) - (b.startsWith('FB') ? 0 : 1) || a.localeCompare(b, 'pt', { numeric: true }));
  return `<div class="ligas">${ord.map(fb => `<div class="liga"><span class="liga-cod">${fb}</span><span class="liga-tipo">${fb.startsWith('FB') ? (fb === 'FB-01' ? 'Cobre' : 'Liga de cobre') : 'Alumínio'}</span><ul>${[...m.get(fb)].map(p => `<li><a href="${link(v, pslug(p))}">${esc(p.curto)}</a></li>`).join('')}</ul></div>`).join('')}</div>`;
};

// Como produzimos: necessidade → proposta → solução (do diagrama do site atual)
const comoProduzimos = (v, cls) => `<div class="como ${cls}">
  <div class="como-col"><span class="como-n">1</span><h3>Sua necessidade</h3><ul>${necessidade.map(x => `<li>${x}</li>`).join('')}</ul></div>
  <div class="como-col"><span class="como-n">2</span><h3>Nossa proposta de solução</h3><ul>${proposta.map(x => `<li>${x}</li>`).join('')}</ul></div>
  <div class="como-col como-sol"><span class="como-n">3</span><h3>E a solução</h3>
    <ol class="sol">${solucao.map(([t, f, a], i) => `<li><figure>${img(f, a)}</figure><span class="sol-n">${String(i + 1).padStart(2, '0')}</span><strong>${t}</strong></li>`).join('')}</ol>
    <p class="como-fim">Trabalhamos no tempo da sua necessidade.</p></div>
</div>`;

// ---------- página de produto (as duas versões usam a mesma estrutura, com o CSS de cada uma) ----------
function paginaProduto(v, p, i) {
  const ant = produtos[(i + produtos.length - 1) % produtos.length], prox = produtos[(i + 1) % produtos.length];
  const linha = linhas.find(l => l[0] === p.linha);
  const irmaos = produtos.filter(x => x.linha === p.linha && x !== p);
  return head(v, pslug(p), p.curto, p.d.slice(0, 155).replace(/\s\S*$/, '') + '…') + topo(v, pslug(p)) + `
<section class="prod-top"><div class="in">
  <nav class="trilha" aria-label="Você está em"><a href="${link(v, 'index')}">Principal</a><span>/</span><a href="${link(v, 'produtos')}">Produtos</a><span>/</span><span>${esc(p.curto)}</span></nav>
  <div class="prod-grade">
    <figure class="prod-foto">${prodImg(p, ' fetchpriority="high"').replace(' loading="lazy"', '')}</figure>
    <div class="prod-info">
      ${sobre(linha[1])}
      <h1>${esc(p.nome)}</h1>
      ${p.proc.length ? `<p class="prod-proc">${p.proc.map(x => `<span>${x}</span>`).join('')}</p>` : ''}
      <p>${p.d}</p>
      <dl class="ficha">
        <div><dt>Dimensões</dt><dd>${p.dim}</dd></div>
        <div class="ficha-mat"><dt>Material</dt><dd>${fichaMat(p)}</dd></div>
      </dl>
      <div class="prod-acoes">${btnOrc(v, 'Solicitar orçamento desta peça')}<a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></div>
      <p class="iso-linha">${ic2('selo')}Composição química garantida e certificada · ISO 9000</p>
    </div>
  </div>
</div></section>
<section class="sec apl"><div class="in">
  <div class="titulo-sec">${sobre('Exemplos de aplicação')}<h2>Onde esta peça trabalha</h2></div>
  <div class="apl-grade apl-${p.fotos.length}">${p.fotos.map(f => `<figure>${foto(f[0], f[3])}<figcaption>${f[3]}</figcaption></figure>`).join('')}</div>
  ${p.apl.length > p.fotos.length ? `<ul class="apl-lista">${p.apl.map(a => `<li>${a}</li>`).join('')}</ul>` : ''}
</div></section>
${irmaos.length ? `<section class="sec irmaos"><div class="in"><div class="titulo-sec lado"><div>${sobre('Mesma linha')}<h2>${linha[1]}</h2></div><a class="link-seta" href="${link(v, 'produtos')}">Todos os produtos ${ic('seta')}</a></div>
  <ul class="mini-prods">${irmaos.map(x => `<li><a href="${link(v, pslug(x))}"><span class="mp-foto">${prodImg(x)}</span><span>${esc(x.curto)}</span></a></li>`).join('')}</ul></div></section>` : ''}
<nav class="prod-nav" aria-label="Outros produtos"><div class="in">
  <a href="${link(v, pslug(ant))}"><small>Anterior</small>${esc(ant.curto)}</a>
  <a href="${link(v, pslug(prox))}"><small>Próximo</small>${esc(prox.curto)}</a>
</div></nav>
` + rodape(v);
}

// ======================= VERSÃO A: Peça acabada =======================
function paginasA() {
  const v = 'a', P = {};
  const prodCard = p => `<li class="pc" data-linha="${p.linha}"><a href="${link(v, pslug(p))}"><span class="pc-foto">${prodImg(p)}</span><span class="pc-txt"><strong>${esc(p.curto)}</strong><small>${p.proc.join(' · ') || 'Peça artística'}</small></span><span class="pc-seta">${ic('seta')}</span></a></li>`;

  P.index = head(v, 'index', '', descPadrao) + topo(v, 'index') + `
<section class="hero-a">
  <div class="hero-a-txt"><div class="hero-a-in">
    ${sobre('Fundição de não ferrosos · Criciúma/SC', 'claro')}
    <h1>Peças acabadas em ligas de cobre e alumínio</h1>
    <p class="lead">${T.hero}</p>
    <div class="hero-acoes">${btnOrc(v)}<a class="btn btn-linha claro" href="${link(v, 'produtos')}">Ver os produtos</a></div>
  </div></div>
  <figure class="hero-a-foto">${imgTopo('g-10', 'Anel de cobre sendo usinado no torno da Fundição Bitencourt')}<figcaption>Anel de cobre centrifugado em usinagem</figcaption></figure>
</section>
<section class="faixa-contato"><div class="in">${contatoLista()}</div></section>

<section class="sec tres-a"><div class="in tres-a-in">
  ${T.heroItens.map((t, i) => `<div><span class="num">${['Fundição', 'Usinagem', 'Matéria-prima'][i]}</span><p>${t}</p></div>`).join('')}
</div></section>

<section class="sec pilares-a"><div class="in">
  <div class="pilares-a-topo"><h2>Comprometimento com a excelência</h2><p>${T.excelencia}</p></div>
  <div class="pilares">${pilares.map(([t, d], i) => `<div class="pilar">${ic2(icPilar[i], 'ic pilar-ic')}<h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>

<section class="sec destaques-a"><div class="in">
  <div class="titulo-sec lado"><div>${sobre('Produtos')}<h2>O que sai da nossa fundição</h2></div><a class="btn" href="${link(v, 'produtos')}">Ver todos os produtos</a></div>
  <div class="dest-grade">${destaques.map((k, i) => { const p = produtos[k]; return `<a class="dest${i === 0 || i === 5 ? ' dest-g' : ''}" href="${link(v, pslug(p))}"><span class="dest-foto">${prodImg(p)}</span><span class="dest-txt"><small>${linhas.find(l => l[0] === p.linha)[1]}</small><strong>${esc(p.nome)}</strong><span class="link-seta">Saiba mais ${ic('seta')}</span></span></a>`; }).join('')}</div>
</div></section>

<section class="como-sec"><div class="in">
  <div class="titulo-sec">${sobre('Máxima efetividade', 'claro')}<h2>Como produzimos</h2><p>${T.efetividade}</p></div>
  ${comoProduzimos(v, 'como-a')}
</div></section>

<section class="sec numeros-a"><div class="in numeros-a-in">
  <div>${sobre('Carteira de clientes')}<h2>Três décadas atendendo indústrias de médio e grande porte</h2><p>${T.carteira}</p>${btnOrc(v, 'Fale com a gente')}</div>
  <ul class="numeros">${carteira.map(([n, t]) => `<li><strong>${n}</strong><span>${t}</span></li>`).join('')}</ul>
</div></section>

<section class="sec dif-a"><div class="in dif-a-in">
  <div class="dif-col">
    ${sobre('Diferenciais técnicos')}<h2>Processo, laboratório e máquinas</h2>
    <h3>Dominamos vários processos de fundição</h3><p class="chips">${processos.map(p => `<span>${p[0]}</span>`).join('')}</p>
    <h3>Serviços laboratoriais que atestam a qualidade</h3>${listaCheck(laboratorio)}
    <h3>Máquinas e equipamentos modernos</h3>${listaCheck(maquinas)}
  </div>
  <div class="dif-col dif-socio">
    ${sobre('Diferenciais socioambientais')}<h2>Fundição limpa e perto da comunidade</h2>
    <ul class="socio">${socio.map((s, i) => `<li>${ic2(icSocio[i])}<span>${s}</span></li>`).join('')}</ul>
  </div>
</div></section>

<section class="logistica-a"><div class="logistica-a-foto">${img('g-18', 'Peça da Fundição Bitencourt carregada para entrega')}</div><div class="logistica-a-txt">
  ${sobre('Nossos produtos até você', 'claro')}<h2>Fornecemos para todo o Brasil</h2><p>${T.logistica}</p>
  <ul class="segs">${segmentos.map(s => `<li>${s}</li>`).join('')}</ul>
</div></section>

<section class="sec plantas-a"><div class="in plantas-in">
  ${plantas.map(p => `<div class="planta"><h3>${p.nome}</h3><address>${p.end}<br>${p.bairro}<br>${p.cidade} · ${p.cep}</address><a class="link-seta" href="${mapsLink(p.q)}" ${ext}>Como chegar ${ic('seta')}</a></div>`).join('')}
  <div class="planta planta-cta"><h3>Tire suas dúvidas</h3><p>Envie o desenho ou a descrição da peça.</p>${btnOrc(v, 'Solicitar orçamento')}</div>
</div></section>
` + rodape(v);

  const cab = (tag, h1, lead, f) => `<section class="cab-a"><div class="in cab-a-in"><div>${sobre(tag, 'claro')}<h1>${h1}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div><figure>${imgTopo(f, '')}</figure></div></section>`;

  P.empresa = head(v, 'empresa', 'Empresa', 'Fundição Bitencourt: fundição de não ferrosos em Criciúma/SC desde 1986. História, processos, laboratório, política de qualidade e instalações.') + topo(v, 'empresa') +
    cab('Empresa', 'Quem somos nós', 'Fundição de não ferrosos no Sul de Santa Catarina, desde 1986.', 'g-11') + `
<section class="sec quem-a"><div class="in quem-a-in">
  <div><p class="lead">${T.quem1}</p><p>${T.quem2}</p><p>${T.quem3}</p></div>
  <dl class="normas">${normas.map(([s, n]) => `<div><dt>${s}</dt><dd>${n}</dd></div>`).join('')}</dl>
</div></section>

<section class="sec historia-a"><div class="in">
  <div class="titulo-sec">${sobre('Nossa história', 'claro')}<h2>Mais de três décadas de fundição</h2></div>
  <div class="linha-tempo" data-linha-tempo>
    <div class="lt-anos" role="tablist">${historia.map(([a], i) => `<button role="tab" aria-selected="${i === 0}" aria-controls="lt-${a}" id="lt-b-${a}">${a}</button>`).join('')}</div>
    ${historia.map(([a, t, d], i) => `<div class="lt-painel" role="tabpanel" id="lt-${a}" aria-labelledby="lt-b-${a}"${i ? ' hidden' : ''}><span class="lt-ano">${a}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}
  </div>
</div></section>

<section class="sec"><div class="in">
  <div class="titulo-sec">${sobre('Como produzimos')}<h2>Da sua necessidade à peça entregue</h2><p>${T.efetividade}</p></div>
  ${comoProduzimos(v, 'como-a como-claro')}
</div></section>

<section class="sec processos-a"><div class="in">
  <div class="titulo-sec">${sobre('Nossos diferenciais')}<h2>Dominamos vários processos de fundição</h2></div>
  <ol class="procs">${processos.map(([t, d], i) => `<li><span class="num">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  <div class="lab-a">
    <div><h3>${ic2('lab')}Serviços laboratoriais</h3>${listaCheck(laboratorio)}</div>
    <div><h3>${ic2('forno')}Máquinas e equipamentos</h3>${listaCheck(maquinas)}</div>
    <div><h3>${ic2('selo')}Gestão da qualidade</h3><p>Possuímos certificação ISO 9000, o que atesta nosso modelo de gestão da qualidade.</p></div>
  </div>
</div></section>

<section class="sec politica-a"><div class="in politica-in">
  <div>${sobre('Política de qualidade', 'claro')}<h2>Satisfação do cliente com qualidade diferenciada</h2><p>A Fundição Bitencourt tem como objetivo a satisfação do cliente com qualidade diferenciada, a busca do crescimento e alcance dos melhores resultados, com foco:</p></div>
  <ol class="politica">${politica.map(x => `<li>${x}</li>`).join('')}</ol>
</div></section>

<section class="sec"><div class="in">
  <div class="titulo-sec">${sobre('Diferenciais socioambientais')}<h2>Responsabilidade com o meio e com as pessoas</h2></div>
  <ul class="socio socio-grade">${socio.map((s, i) => `<li>${ic2(icSocio[i])}<span>${s}</span></li>`).join('')}</ul>
</div></section>

<section class="sec galeria-sec"><div class="in">
  <div class="titulo-sec lado"><div>${sobre('Nossas instalações')}<h2>Planta moderna e flexível</h2></div><p>${T.instalacoes}</p></div>
  <div class="galeria">${galeria.map(([n, a]) => foto(n, a)).join('')}</div>
</div></section>

<section class="sec numeros-a"><div class="in numeros-a-in">
  <div>${sobre('Carteira dos principais clientes')}<h2>Empresas que confiam na Fundição Bitencourt</h2><p>${T.carteira}</p></div>
  <ul class="numeros">${carteira.map(([n, t]) => `<li><strong>${n}</strong><span>${t}</span></li>`).join('')}</ul>
</div></section>

<section class="logistica-a"><div class="logistica-a-foto">${img('g-17', 'Peça embalada sendo içada para embarque')}</div><div class="logistica-a-txt">
  ${sobre('Chegamos até você', 'claro')}<h2>Parcerias logísticas para todo o Brasil</h2><p>${T.logistica}</p>${btnOrc(v)}
</div></section>
` + rodape(v);

  P.produtos = head(v, 'produtos', 'Produtos', 'Produtos da Fundição Bitencourt: anéis de curto-circuito, conectores de cobre, coroas, buchas, engrenagens, hélices, rotores, polias, aros e peças especiais.') + topo(v, 'produtos') +
    cab('Produtos', 'Produzimos', 'Quinze famílias de peças em cobre, bronze e alumínio, fundidas e usinadas na nossa planta.', 'g-12') + `
<section class="sec prods-a"><div class="in">
  <div class="filtro" role="group" aria-label="Filtrar por linha"><button class="ativo" data-filtro="">Todos <small>${produtos.length}</small></button>${linhas.map(([k, t]) => `<button data-filtro="${k}">${t} <small>${produtos.filter(p => p.linha === k).length}</small></button>`).join('')}</div>
  <ul class="prods">${produtos.map(prodCard).join('')}</ul>
</div></section>
<section class="sec ligas-sec"><div class="in">
  <div class="titulo-sec">${sobre('Ligas indicadas')}<h2>Qual liga vai em cada peça</h2><p>Os códigos FB das fichas de produto, com as referências SAE, UNS e ASTM de cada uma. Toque no produto para ver a ficha.</p></div>
  ${tabelaLigas(v)}
</div></section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Sua peça não está na lista?</h2><p>Fundimos peças industriais especiais sob desenho, em qualquer liga de bronze ou de alumínio.</p></div>${btnOrc(v, 'Enviar meu desenho')}</div></section>
` + rodape(v);

  produtos.forEach((p, i) => { P[pslug(p)] = paginaProduto(v, p, i); });

  P.contato = head(v, 'contato', 'Contato', `Fale com a Fundição Bitencourt: ${E.fone}, ${E.email}. Rua Otávio Fontana, 300, Criciúma/SC.`) + topo(v, 'contato') + `
<section class="sec contato-a"><div class="in contato-a-in">
  <div>${sobre('Contato')}<h1>Como podemos ajudá-lo?</h1><p class="lead">Conte a liga, as dimensões, a quantidade e a aplicação da peça. Respondemos com a proposta de solução.</p>${contatoLista()}</div>
  <div class="contato-form"><h2>Envie sua mensagem</h2>${formulario()}</div>
</div></section>
<section class="sec plantas-mapa"><div class="in plantas-mapa-in">
  ${plantas.map(p => `<div><h2>${p.nome}</h2><address>${p.end}, ${p.bairro}, ${p.cidade} · ${p.cep}</address>${mapa(p.q, `Mapa da ${p.nome} da Fundição Bitencourt`)}<a class="link-seta" href="${mapsLink(p.q)}" ${ext}>Abrir no Google Maps ${ic('seta')}</a></div>`).join('')}
</div></section>
` + rodape(v);
  return P;
}

// ======================= VERSÃO B: Centrifugação =======================
function paginasB() {
  const v = 'b', P = {};
  P.index = head(v, 'index', '', descPadrao) + topo(v, 'index') + `
<section class="hero-b">
  <div class="hero-b-fundo">${imgTopo('metal-liquido', 'Peça de cobre recém-centrifugada, ainda incandescente, na Fundição Bitencourt')}</div>
  <div class="in hero-b-in">
    ${sobre('Desde 1986 · Criciúma/SC', 'claro')}
    <h1>Cobre, bronze e alumínio do metal líquido à peça usinada</h1>
    <p class="lead">${T.hero}</p>
    <div class="hero-acoes">${btnOrc(v)}<a class="btn btn-linha claro" href="${link(v, 'produtos')}">Conheça os produtos</a></div>
  </div>
  <div class="in hero-b-base"><ul>${[['1986', 'fundindo não ferrosos'], ['1.200 mm', 'peças centrifugadas até 600 kg'], ['ISO 9000', 'gestão da qualidade certificada'], ['5', 'processos de fundição']].map(([n, t]) => `<li><strong>${n}</strong><span>${t}</span></li>`).join('')}</ul></div>
</section>

<section class="sec intro-b"><div class="in intro-b-in">
  <div>${sobre('Especialidade')}<h2>Fundição de não ferrosos com usinagem própria</h2><p>${pilares[0][1]}</p></div>
  <ul class="tres-b">${T.heroItens.map((t, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><p>${t}</p></li>`).join('')}</ul>
</div></section>

<section class="sec linhas-b"><div class="in">
  <div class="titulo-sec lado"><div>${sobre('Produtos')}<h2>Quatro linhas, quinze famílias de peças</h2></div><a class="link-seta" href="${link(v, 'produtos')}">Ver todos os produtos ${ic('seta')}</a></div>
  <div class="linhas-b-grade">${linhas.map(([k, t, s]) => { const ps = produtos.filter(p => p.linha === k); return `<div class="lb lb-${k}"><div class="lb-cab"><h3>${t}</h3><p>${s}</p></div><span class="lb-foto">${(q => img(q.img[0], q.curto))(produtos[{ cobre: 0, bronze: 6, aluminio: 10, especiais: 13 }[k]])}</span><ul>${ps.map(p => `<li><a href="${link(v, pslug(p))}">${esc(p.curto)}${ic('seta')}</a></li>`).join('')}</ul></div>`; }).join('')}</div>
</div></section>

<section class="proc-b"><div class="in">
  <div class="titulo-sec">${sobre('Processos', 'claro')}<h2>Cinco formas de dar forma ao metal</h2><p>Cada peça vai para o processo que garante as propriedades da liga que o seu projeto precisa.</p></div>
  <ol class="proc-b-lista">${processos.map(([t, d], i) => `<li><span class="pb-n">${String(i + 1).padStart(2, '0')}</span><svg class="pb-svg" viewBox="0 0 80 80" aria-hidden="true">${procDesenho(i)}</svg><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>

<section class="sec como-b-sec"><div class="in">
  <div class="titulo-sec">${sobre('Como produzimos')}<h2>Da sua necessidade à peça entregue</h2><p>${T.efetividade}</p></div>
  ${comoProduzimos(v, 'como-b')}
</div></section>

<section class="sec qual-b"><div class="in qual-b-in">
  <figure>${foto('g-15', 'Microscópio para metalografia')}${foto('g-13', 'Espectrômetro')}</figure>
  <div>${sobre('Qualidade')}<h2>Laboratório próprio e ISO 9000</h2><p>${pilares[1][1]}</p>${listaCheck(laboratorio)}<p class="normas-linha">Normas de referência: ${normas.map(n => `<abbr title="${n[1]}">${n[0]}</abbr>`).join(' · ')}</p></div>
</div></section>

<section class="sec carteira-b"><div class="in">
  <div class="titulo-sec centro">${sobre('Carteira de clientes')}<h2>Quem confia na Fundição Bitencourt</h2><p>${T.carteira}</p></div>
  <ul class="numeros-b">${carteira.map(([n, t]) => `<li><strong>${n}</strong><span>${t}</span></li>`).join('')}</ul>
</div></section>

<section class="socio-b"><div class="socio-b-foto">${img('g-03', 'Sistema de exaustão e tratamento de gases')}</div><div class="socio-b-txt">
  ${sobre('Responsabilidade', 'claro')}<h2>Gestão rigorosa de resíduos sólidos, líquidos e gasosos</h2>
  <ul class="socio">${socio.map((s, i) => `<li>${ic2(icSocio[i])}<span>${s}</span></li>`).join('')}</ul>
</div></section>

<section class="sec chegamos-b"><div class="in chegamos-b-in">
  <div>${sobre('Nossos produtos até você')}<h2>Fornecemos para todo o Brasil</h2><p>${T.logistica}</p></div>
  <div class="plantas-b">${plantas.map(p => `<div><h3>${ic('pin')}${p.nome}</h3><address>${p.end}<br>${p.bairro}<br>${p.cidade} · ${p.cep}</address></div>`).join('')}</div>
</div></section>
${ctaB(v)}
` + rodape(v);

  const cab = (tag, h1, lead, f) => `<section class="cab-b"><div class="cab-b-fundo">${imgTopo(f, '')}</div><div class="in">${sobre(tag, 'claro')}<h1>${h1}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div></section>`;

  P.empresa = head(v, 'empresa', 'Empresa', 'Fundição Bitencourt: fundição de não ferrosos em Criciúma/SC desde 1986. História, processos, laboratório, política de qualidade e instalações.') + topo(v, 'empresa') +
    cab('Empresa', 'Uma fundição familiar de Criciúma desde 1986', 'Fundição de não ferrosos especializada em peças acabadas em ligas de cobre e ligas de alumínio.', 'g-08') + `
<section class="sec quem-b"><div class="in quem-b-in">
  <div>${sobre('Quem somos nós')}<p class="lead">${T.quem1}</p><p>${T.quem2}</p><p>${T.quem3}</p></div>
  <figure>${foto('g-01', 'Fábrica da Fundição Bitencourt')}</figure>
</div></section>
<section class="sec historia-b"><div class="in">
  <div class="titulo-sec">${sobre('Nossa história', 'claro')}<h2>De estátuas de bronze ao cobre de alta condutividade</h2></div>
  <ol class="hist-b">${historia.map(([a, t, d]) => `<li><span class="hb-ano">${a}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
</div></section>
<section class="proc-b"><div class="in">
  <div class="titulo-sec">${sobre('Diferenciais técnicos', 'claro')}<h2>Dominamos vários processos de fundição</h2></div>
  <ol class="proc-b-lista">${processos.map(([t, d], i) => `<li><span class="pb-n">${String(i + 1).padStart(2, '0')}</span><svg class="pb-svg" viewBox="0 0 80 80" aria-hidden="true">${procDesenho(i)}</svg><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
<section class="sec eq-b"><div class="in eq-b-in">
  <div><h3>${ic2('lab')}Serviços laboratoriais</h3>${listaCheck(laboratorio)}</div>
  <div><h3>${ic2('forno')}Máquinas e equipamentos</h3>${listaCheck(maquinas)}</div>
  <div class="pol-b"><h3>${ic2('selo')}Política de qualidade</h3><p>Satisfação do cliente com qualidade diferenciada, a busca do crescimento e alcance dos melhores resultados, com foco:</p>${listaCheck(politica)}</div>
</div></section>
<section class="sec como-b-sec"><div class="in">
  <div class="titulo-sec">${sobre('Como produzimos')}<h2>Sua necessidade, nossa proposta, a solução</h2></div>
  ${comoProduzimos(v, 'como-b')}
</div></section>
<section class="sec galeria-sec"><div class="in">
  <div class="titulo-sec lado"><div>${sobre('Nossas instalações')}<h2>Planta de produção</h2></div><p>${T.instalacoes}</p></div>
  <div class="galeria galeria-b">${galeria.map(([n, a]) => foto(n, a)).join('')}</div>
</div></section>
<section class="sec carteira-b"><div class="in">
  <div class="titulo-sec centro">${sobre('Carteira dos principais clientes')}<h2>Três décadas de clientes fidelizados</h2><p>${T.carteira}</p></div>
  <ul class="numeros-b">${carteira.map(([n, t]) => `<li><strong>${n}</strong><span>${t}</span></li>`).join('')}</ul>
</div></section>
${ctaB(v)}
` + rodape(v);

  P.produtos = head(v, 'produtos', 'Produtos', 'Produtos da Fundição Bitencourt: anéis de curto-circuito, conectores de cobre, coroas, buchas, engrenagens, hélices, rotores, polias, aros e peças especiais.') + topo(v, 'produtos') +
    cab('Produtos', 'Produzimos', 'Peças em cobre, bronze e alumínio, fundidas e usinadas, com composição química garantida e certificada.', 'g-11') + `
<nav class="ancora-b" aria-label="Linhas"><div class="in">${linhas.map(([k, t]) => `<a href="#${k}">${t}</a>`).join('')}<a href="#ligas">Ligas</a></div></nav>
${linhas.map(([k, t, s], li) => `<section class="sec linha-b${li % 2 ? ' alt' : ''}" id="${k}"><div class="in">
  <div class="titulo-sec lado"><div>${sobre(s)}<h2>${t}</h2></div></div>
  <ul class="lista-prod-b">${produtos.filter(p => p.linha === k).map(p => `<li><a href="${link(v, pslug(p))}"><span class="lpb-foto">${prodImg(p)}</span><span class="lpb-txt"><strong>${esc(p.nome)}</strong><small>${p.dim}</small><span class="lpb-ligas">${(ligasDe(p).length ? [...new Set(ligasDe(p))] : ['Sob consulta']).map(x => `<b>${x}</b>`).join('')}</span></span>${ic('seta', 'ic lpb-seta')}</a></li>`).join('')}</ul>
</div></section>`).join('\n')}
<section class="sec ligas-sec" id="ligas"><div class="in">
  <div class="titulo-sec">${sobre('Ligas indicadas', 'claro')}<h2>Qual liga vai em cada peça</h2><p>Os códigos FB das fichas de produto e os produtos que usam cada um.</p></div>
  ${tabelaLigas(v)}
</div></section>
${ctaB(v)}
` + rodape(v);

  produtos.forEach((p, i) => { P[pslug(p)] = paginaProduto(v, p, i); });

  P.contato = head(v, 'contato', 'Contato', `Fale com a Fundição Bitencourt: ${E.fone}, ${E.email}. Rua Otávio Fontana, 300, Criciúma/SC.`) + topo(v, 'contato') + `
<section class="contato-b"><div class="in contato-b-in">
  <div class="contato-b-lado">${sobre('Contato', 'claro')}<h1>Vamos fundir a sua peça</h1><p>Envie o desenho ou descreva a liga, as dimensões, a quantidade e a aplicação.</p>${contatoLista()}</div>
  <div class="contato-b-form"><h2>Envie sua mensagem</h2>${formulario()}</div>
</div></section>
<section class="sec"><div class="in plantas-mapa-in">
  ${plantas.map(p => `<div><h2>${p.nome}</h2><address>${p.end}, ${p.bairro}, ${p.cidade} · ${p.cep}</address>${mapa(p.q, `Mapa da ${p.nome} da Fundição Bitencourt`)}<a class="link-seta" href="${mapsLink(p.q)}" ${ext}>Abrir no Google Maps ${ic('seta')}</a></div>`).join('')}
</div></section>
` + rodape(v);
  return P;
}
const ctaB = v => `<section class="cta-b"><div class="cta-b-fundo">${img('cadinho', '')}</div><div class="in cta-b-in"><div><h2>Tire suas dúvidas</h2><p>${T.efetividade}</p></div><div class="cta-b-acoes">${btnOrc(v)}<a class="btn btn-linha claro" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></div></div></section>`;

// Desenhos simples de cada processo (corte esquemático, não é foto)
function procDesenho(i) {
  const metal = 'fill="var(--metal)"', traco = 'fill="none" stroke="currentColor" stroke-width="2"';
  return [
    `<rect x="8" y="20" width="64" height="48" ${traco}/><path d="M8 44h64" ${traco} stroke-dasharray="3 3"/><path d="M26 36h28v16H26z" ${metal}/><path d="M38 20v16" stroke="var(--metal)" stroke-width="5"/><g fill="currentColor" opacity=".35">${Array.from({ length: 18 }, (_, k) => `<circle cx="${12 + (k * 23) % 58}" cy="${24 + (k * 17) % 40}" r="1.2"/>`).join('')}</g>`,
    `<path d="M10 22h60v44H10z" ${traco}/><path d="M16 28h48v32H16z" ${traco} opacity=".5"/><path d="M28 38h24v12H28z" ${metal}/><path d="M40 22v16" stroke="var(--metal)" stroke-width="4"/>`,
    `<path d="M12 18h24v52H12zM44 18h24v52H44z" fill="currentColor" opacity=".25"/><path d="M12 18h24v52H12zM44 18h24v52H44z" ${traco}/><path d="M30 34h20v20H30z" ${metal}/><path d="M40 10v24" stroke="var(--metal)" stroke-width="5"/>`,
    `<circle cx="40" cy="44" r="26" ${traco}/><circle cx="40" cy="44" r="26" fill="none" stroke="var(--metal)" stroke-width="9" opacity=".95" transform="scale(.82) translate(8.8 9.6)"/><path d="M40 6v16" stroke="var(--metal)" stroke-width="4"/><path d="M66 30a28 28 0 010 28" fill="none" stroke="currentColor" stroke-width="2" marker-end=""/><path d="M64 58l4 2 1-5" ${traco}/>`,
    `<circle cx="40" cy="44" r="26" ${traco}/><circle cx="40" cy="44" r="18" fill="var(--metal)"/><circle cx="40" cy="44" r="6" fill="currentColor" opacity=".5"/><path d="M40 6v16" stroke="var(--metal)" stroke-width="4"/><path d="M64 58l4 2 1-5M66 30a28 28 0 010 28" ${traco}/>`,
  ][i];
}

// ---------- gravação ----------
fs.mkdirSync(path.join(pub, 'assets'), { recursive: true });
copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
fs.copyFileSync(path.join(aqui, 'fb.js'), path.join(pub, 'assets/fb.js'));
escreverVersao(pub, 'a', paginasA());
escreverVersao(pub, 'b', paginasB());
await escolha(pub, {
  nome: 'Fundição Bitencourt', artigo: 'da', url: E.url, lang: 'pt', cor: '#e5a300', fundo: '#2a1a10', claro: '#f6f4f1',
  fonteTitulo: "'Saira',system-ui,sans-serif", fonteTexto: "'Asap',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 19, texto: 'O marrom-cobre do site atual na abertura, corpo claro e o dourado nos botões. Abre com a foto do anel de cobre no torno e mantém a faixa de telefone, horário e e-mail.', pontos: ['Os 15 produtos com ficha, liga FB e aplicações', '“Como produzimos” com fotos reais da fábrica', 'Linha do tempo de 1986 a 2016'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 19, texto: 'Mais industrial: grafite e dourado, a peça incandescente saindo da centrífuga em tela cheia e os cinco processos de fundição desenhados.', pontos: ['Produtos por linha: cobre, bronze, alumínio e especiais', 'Tabela de ligas: que código vai em cada peça', 'Laboratório, ISO 9000 e carteira de clientes'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
