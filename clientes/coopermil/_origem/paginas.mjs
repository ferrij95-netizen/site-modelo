// Páginas das duas versões do site da Coopermil. A = "Tradicional" (faixa azul com o logo branco, como o site atual),
// B = "Campo" (cabeçalho claro, fotos grandes e degradês). Os textos e a ordem das seções vêm de conteudo.mjs.
import * as C from './conteudo.mjs';

const { site } = C;
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra ? ' ' + extra : ''}>`;
const ext = u => /^(https?:|tel:|mailto:)/.test(u);
const alvo = u => (/^https?:/.test(u) ? ' target="_blank" rel="noopener"' : '');
const whats = msg => `https://api.whatsapp.com/send?phone=${site.whats}&text=${encodeURIComponent(msg)}`;

// Ícones de traço (24x24).
const I = {
  fone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  busca: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/>',
  radio: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="m7 8 9-5"/><circle cx="15.5" cy="14" r="3"/><path d="M6.5 12.5h4M6.5 15.5h4"/>',
  play: '<path d="M8 5v14l11-7z"/>',
  loja: '<path d="M4 9h16l-1-5H5zM5 9v11h14V9M9 20v-6h6v6"/>',
  silo: '<path d="M5 21V8l4-4 4 4v13M13 21V11l3-3 3 3v10M3 21h18M7 12h4M7 16h4"/>',
  leite: '<path d="M9 3h6v3l2 3v12H7V9l2-3zM7 13h10"/>',
  trator: '<circle cx="7" cy="16" r="4"/><circle cx="18" cy="17" r="3"/><path d="M11 16h4M5 12V6h6l2 6h6v2"/>',
  bomba: '<path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h14M7 8h6M15 9l3 2v7a1.5 1.5 0 0 0 3 0V8l-3-3"/>',
  racao: '<path d="M6 4h12l1 4-1 12H6L5 8z"/><path d="M5 8h14M9 13h6"/>',
  semente: '<path d="M12 21v-8M12 13c0-4 3-7 8-7 0 5-3 7-8 7zM12 15c0-3-2.5-5.5-7-5.5 0 4 2.5 5.5 7 5.5z"/>',
  carrinho: '<path d="M3 4h2l2.5 11h11L21 7H6.2"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  pessoas: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  grafico: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  outros: '<path d="M4 20V8l8-5 8 5v12zM9 20v-6h6v6"/>',
  whats: '<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2z"/>',
  revista: '<path d="M4 4h7a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-5a2 2 0 0 0-2 2"/><path d="M20 4v14h-7"/>',
  escudo: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  maleta: '<path d="M3 7h18v13H3zM8 7V4h8v3M3 12h18"/>',
};
const ico = (n, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const SOC = {
  instagram: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>',
  facebook: '<svg class="ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8V6.5c0-.8.2-1.3 1.4-1.3H17V2.2C16.6 2.1 15.6 2 14.5 2 12 2 10.5 3.5 10.5 6.2V8H8v3.2h2.5V22H14V11.2h2.7l.4-3.2z"/></svg>',
  linkedin: '<svg class="ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 8.5h3.2V20H5zM6.6 3.5a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zM10.4 8.5h3v1.6c.5-.9 1.7-1.9 3.5-1.9 3.4 0 4 2.2 4 5.1V20h-3.2v-5.9c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1v6h-3.1z"/></svg>',
};
const sociais = () => ['instagram', 'facebook', 'linkedin'].map(s => `<a href="${site[s]}" target="_blank" rel="noopener" aria-label="Coopermil no ${s[0].toUpperCase() + s.slice(1)}">${SOC[s]}</a>`).join('');
const icoNeg = { agropecuaria: 'loja', graos: 'silo', leite: 'leite', maquinas: 'trator', 'postos-de-combustiveis': 'bomba', racoes: 'racao', sementes: 'semente', supermercados: 'carrinho' };
const TIPOS = { a: ['Agropecuária', 'loja'], s: ['Super São Luiz', 'carrinho'], g: ['Grãos', 'silo'], p: ['Postos', 'bomba'], o: ['Outras unidades', 'outros'] };

// Títulos e descrições (SEO) de cada página.
const PAG = {
  index: ['Coopermil · Acreditando e investindo nesta terra', 'Cooperativa Mista São Luiz, de Santa Rosa (RS): agropecuária, grãos, leite, máquinas, postos, rações, sementes e supermercados Super São Luiz.'],
  negocios: ['Negócios · Coopermil', 'Os oito negócios da Coopermil no Noroeste gaúcho.'],
  'a-cooperativa/historico': ['Histórico · Coopermil', 'Desde 1955 acreditando e investindo nesta terra: a história da Cooperativa Mista São Luiz.'],
  'a-cooperativa/principios-institucionais': ['Princípios institucionais · Coopermil', 'Missão, visão e valores da Coopermil.'],
  'a-cooperativa/diretoria': ['Diretoria · Coopermil', 'Diretoria executiva, Conselho de Administração, Conselho Fiscal e supervisores da Coopermil.'],
  'a-cooperativa/colaboradores': ['Colaboradores · Coopermil', 'Mais de 1.000 colaboradores, capacitação e benefícios.'],
  'a-cooperativa/associados': ['Associados · Coopermil', 'Mais de 5 mil associados, assistência técnica e transferência de tecnologia.'],
  'a-cooperativa/validacao-de-pesquisas': ['Validação de Pesquisas · Coopermil', 'Área Experimental Coopermil: pesquisa aplicada ao clima e ao solo do Noroeste gaúcho desde 1992.'],
  'a-cooperativa/educacao-social': ['Educação Social · Coopermil', 'Programa de Educação Social da Coopermil, desde 2004.'],
  'a-cooperativa/area-de-atuacao': ['Área de atuação · Coopermil', 'Todas as unidades da Coopermil: agropecuárias, Super São Luiz, recebimento de grãos e postos.'],
  noticias: ['Notícias · Coopermil', 'Notícias da Coopermil.'],
  radio: ['Rádio · Coopermil', 'Mensageiro Rural, o programa de rádio da Coopermil.'],
  revista: ['Revista · Coopermil', 'Revista Coopermil e relatórios de gestão.'],
  promocoes: ['Promoções · Coopermil', 'Promoções do Super São Luiz e das Lojas Agropecuárias Coopermil.'],
  maquinas: ['Máquinas · Coopermil', 'Catálogos das marcas de máquinas e implementos da Coopermil.'],
  cotacoes: ['Cotações · Coopermil', 'Cotação de soja, milho e trigo na Coopermil.'],
  lgpd: ['LGPD · Coopermil', 'Privacidade, uso de imagem, guia prático e Código de Conduta e Ética da Coopermil.'],
  'trabalhe-conosco': ['Trabalhe conosco · Coopermil', 'Vagas abertas na Coopermil.'],
  contato: ['Contato · Coopermil', 'Telefone, WhatsApp, endereço da sede e ouvidoria da Coopermil.'],
};
for (const n of C.negocios) PAG['negocios/' + n.slug] = [`${n.nome} · Coopermil`, n.curto];
for (const n of C.noticias) PAG['noticias/' + n.slug] = [`${n.titulo} · Coopermil`, n.resumo];

export function gerarVersao(v) {
  const L = s => (ext(s) ? s : `/${v}/${s === 'index' ? '' : s + '/'}`);
  const A = v === 'a';
  const total = C.unidades.reduce((s, [, u]) => s + u.length, 0);

  // ---------- Topo e rodapé ----------
  const menu = slug => {
    const at = s => (slug === s || slug.startsWith(s + '/') ? ' aria-current="page"' : '');
    const sub = (titulo, base, itens, aberto) => `<div class="sub"><button type="button" class="sub-btn"${slug.startsWith(base) ? ' aria-current="page"' : ''} aria-expanded="false">${titulo}</button><div class="sub-lista">${itens.map(([s, t]) => `<a href="${L(s)}"${at(s)}${alvo(s)}>${t}</a>`).join('')}${aberto || ''}</div></div>`;
    return `<a href="${L('index')}"${slug === 'index' ? ' aria-current="page"' : ''}>Início</a>
      ${sub('A Cooperativa', 'a-cooperativa', C.cooperativa)}
      ${sub('Negócios', 'negocios', C.negocios.map(n => ['negocios/' + n.slug, n.nome]), `<a class="todos" href="${L('negocios')}">Todos os negócios</a>`)}
      <a href="${L('noticias')}"${at('noticias')}>Notícias</a><a href="${L('radio')}"${at('radio')}>Rádio</a><a href="${L('revista')}"${at('revista')}>Revista</a><a href="${L('promocoes')}"${at('promocoes')}>Promoções</a><a href="${L('maquinas')}"${at('maquinas')}>Máquinas</a><a href="${L('lgpd')}"${at('lgpd')}>LGPD</a><a href="${L('trabalhe-conosco')}"${at('trabalhe-conosco')}>Trabalhe conosco</a><a href="${site.ouvidoria}" target="_blank" rel="noopener">Ouvidoria</a>`;
  };
  const busca = `<form class="busca" action="https://www.google.com/search" target="_blank" role="search"><label><span class="sr">Buscar no site</span><input name="q" placeholder="Buscar" data-busca></label><button aria-label="Buscar">${ico('busca')}</button></form>`;
  const topo = slug => A
    ? `<div class="util"><div class="in"><span class="so-pc">${site.razao} · ${site.cidade}</span><a href="tel:${site.foneHref}">${ico('fone')}${site.fone}</a><a href="${site.ouvidoria}" target="_blank" rel="noopener">Ouvidoria</a><span class="soc">${sociais()}</span></div></div>
<header class="topo"><div class="in">
  <a class="marca" href="${L('index')}" aria-label="Coopermil, início"><img src="/assets/logo-branco.svg" alt="Coopermil" width="190" height="45"></a>
  ${busca}
  <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
</div><nav id="nav" class="nav"><div class="in">${menu(slug)}</div></nav></header>`
    : `<header class="topo"><div class="in">
  <a class="marca" href="${L('index')}" aria-label="Coopermil, início"><img src="/assets/logo-cor.svg" alt="Coopermil" width="170" height="40"><small>${site.slogan}</small></a>
  <nav id="nav" class="nav">${menu(slug)}</nav>
  <div class="acoes"><span class="soc">${sociais()}</span><a class="btn btn-prim" href="${L('contato')}">Fale conosco</a></div>
  <button class="menu-btn" data-menu aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>Menu</em></button>
</div></header>`;

  const rodape = () => `<footer class="rodape">
  <div class="in r-topo">
    <div class="r-marca"><img src="/assets/logo-branco.svg" alt="Coopermil" width="190" height="45" loading="lazy"><p>${site.slogan}.</p><p class="soc">${sociais()}</p></div>
    <div><h3>A Cooperativa</h3><ul>${C.cooperativa.map(([s, t]) => `<li><a href="${L(s)}">${t}</a></li>`).join('')}</ul></div>
    <div><h3>Negócios</h3><ul>${C.negocios.map(n => `<li><a href="${L('negocios/' + n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Atendimento</h3><ul>
      <li><a href="tel:${site.foneHref}">${ico('fone')}${site.fone}</a></li>
      <li><a href="${whats('Olá, Coopermil!')}" target="_blank" rel="noopener">${ico('whats')}WhatsApp Coopermil</a></li>
      <li><a href="${site.whatsSuper}" target="_blank" rel="noopener">${ico('whats')}Promoções Super São Luiz</a></li>
      <li><a href="${site.whatsLojas}" target="_blank" rel="noopener">${ico('whats')}Lojas Agropecuárias</a></li>
      <li><a href="${site.mapa}" target="_blank" rel="noopener">${ico('pin')}${site.endereco}, ${site.cidade}</a></li>
      <li><a href="${site.ouvidoria}" target="_blank" rel="noopener">Ouvidoria</a> · <a href="${L('trabalhe-conosco')}">Trabalhe conosco</a> · <a href="${L('lgpd')}">LGPD</a></li></ul></div>
  </div>
  <div class="in r-acessos"><span>Acessos internos</span>${C.acessos.map(a => `<a href="${site.atual}" target="_blank" rel="noopener">${a}</a>`).join('')}<span class="selos">${img('somos-coop', 'Somos Coop', 'width="150" height="38"')}${img('bndes', 'BNDES', 'width="150" height="38"')}</span></div>
  <div class="in r-base"><span>© Coopermil · ${site.razao} · ${site.cidade}</span><a href="${L('lgpd')}">Política de Privacidade</a></div>
</footer>
<a class="whats-flutua" href="${whats('Olá, Coopermil!')}" target="_blank" rel="noopener" aria-label="Falar com a Coopermil no WhatsApp">${ico('whats')}</a>`;

  // Cabeçalho das páginas internas: A usa faixa azul com trilha (e o banner do site atual nos negócios); B usa foto grande.
  const trilha = itens => `<nav class="trilha" aria-label="Você está em"><a href="${L('index')}">Início</a>${itens.map(([t, s]) => (s ? `<a href="${L(s)}">${t}</a>` : `<span>${t}</span>`)).join('')}</nav>`;
  const cab = ({ titulo, sobre, trilhaItens, foto, banner, lead }) => A
    ? `<section class="cab"><div class="in">${trilha(trilhaItens)}${sobre ? `<span class="sobre">${sobre}</span>` : ''}<h1>${titulo}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div></section>${banner ? `<div class="in banner-neg">${img(banner, titulo, 'width="960" height="240" loading="eager"')}</div>` : ''}`
    : `<section class="cab${foto ? ' com-foto' : ''}">${foto ? `<div class="cab-foto">${img(foto, '', 'loading="eager"')}</div>` : ''}<div class="in">${trilha(trilhaItens)}${sobre ? `<span class="sobre">${sobre}</span>` : ''}<h1>${titulo}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div></section>`;

  const galeria = (fotos, alt) => `<div class="galeria g-${fotos.length}" data-galeria>${fotos.map((f, i) => `<a href="/assets/img/${f}.webp" data-foto>${img(f, `${alt}, foto ${i + 1}`)}</a>`).join('')}</div>`;
  const tit = (sobre, titulo, extra = '') => `<div class="tit${extra}">${sobre ? `<span class="sobre">${sobre}</span>` : ''}<h2>${titulo}</h2></div>`;
  const btn = (href, txt, cls = 'btn-prim') => `<a class="btn ${cls}" href="${href.startsWith('/') || ext(href) ? href : L(href)}"${alvo(href)}>${txt} ${ico(ext(href) && /^https?:/.test(href) ? 'externo' : 'seta')}</a>`;

  // ---------- Peças da home ----------
  const banners = [
    ['banner-71anos', 'Coopermil 71 anos'], ['banner-2', 'Coopermil é resultado: faturamento de R$ 1,424 bilhão em 2025'], ['banner-3', 'Safra 2026: qualidade e segurança com assistência técnica'],
    ['banner-4', 'Revista Relatório Gestão 2025', 'https://heyzine.com/flip-book/f18b756a2e.html'], ['banner-5', 'Produz Mais: novos produtos de nutrição vegetal'],
  ];
  const carrossel = () => `<section class="carrossel" data-carrossel aria-roledescription="carrossel" aria-label="Destaques">
  <div class="slides">${banners.map(([b, alt, link], i) => `<div class="slide${i ? '' : ' ativo'}" data-slide style="--fundo:url(/assets/img/${b}.webp)">${link ? `<a href="${link}" target="_blank" rel="noopener">` : ''}${img(b, alt, `width="960" height="400"${i ? '' : ' loading="eager" fetchpriority="high"'}`)}${link ? '</a>' : ''}</div>`).join('')}</div>
  <button class="car-seta ant" data-ant aria-label="Anterior">‹</button><button class="car-seta prox" data-prox aria-label="Próximo">›</button>
  <div class="pontos">${banners.map(([, alt], i) => `<button data-ir aria-label="${esc(alt)}"${i ? '' : ' aria-current="true"'}></button>`).join('')}</div>
</section>`;
  const cardNoticia = (n, cls = '') => `<a class="noticia${cls}" href="${L('noticias/' + n.slug)}"><span class="foto">${img(n.foto, n.titulo)}</span><span class="txt"><time>${n.data}</time><b>${n.titulo}</b><small>${n.resumo}</small></span></a>`;
  const programa = ([data, mp3], i) => `<div class="programa"><span class="prog-ico">${ico('radio')}</span><div><b>Mensageiro Rural</b><small>${data}</small><audio controls preload="none" src="${mp3}"></audio></div><a class="baixar" href="${mp3}" download target="_blank" rel="noopener" aria-label="Baixar o programa de ${data}">Download</a></div>`;
  const tabelaCotacoes = (completa) => `<div class="cotacoes"><table><caption>Cotação em ${C.cotacoes.data}</caption><thead><tr><th>Produto</th><th>${C.cotacoes.horarios[0]}</th>${completa ? `<th>${C.cotacoes.horarios[1]}</th>` : `<th>Tarde</th>`}</tr></thead><tbody>${C.cotacoes.linhas.map(([p, m, t]) => `<tr><th scope="row">${p} <small>saca 60 kg</small></th><td>${m}</td><td>${t}</td></tr>`).join('')}</tbody></table><p class="nota">Horário de faturamento: manhã das 9h15 às 12h, tarde das 13h40 às 15h.</p></div>`;
  const tempo = () => `<div class="tempo" data-tempo><span class="sobre">Tempo em Santa Rosa</span><div class="tempo-agora"><span data-t-temp>--</span><small data-t-desc>Carregando a previsão...</small></div><ul data-t-dias></ul></div>`;
  const video = () => `<button class="video" data-video="${site.video}" aria-label="Assistir ao vídeo institucional da Coopermil"><img src="https://i.ytimg.com/vi/${site.video}/hqdefault.jpg" alt="" loading="lazy"><span class="play">${ico('play')}</span></button>`;
  const promoTiles = () => `<div class="promos">
    <a class="promo super" href="${L('promocoes')}#super-sao-luiz">${img('super-4', 'Super São Luiz')}<span><small>Promoções</small><b>Super São Luiz</b></span></a>
    <a class="promo agro" href="${L('promocoes')}#agropecuaria">${img('agro-5', 'Agropecuária Coopermil')}<span><small>Promoções</small><b>Agropecuária Coopermil</b></span></a>
  </div>`;
  const negociosGrade = () => `<div class="neg-grade">${C.negocios.map(n => `<a class="neg" href="${L('negocios/' + n.slug)}"><span class="foto">${img(n.capa, n.nome)}</span><span class="txt">${ico(icoNeg[n.slug])}<b>${n.nome}</b><small>${n.curto}</small></span></a>`).join('')}</div>`;
  const numerosFaixa = () => `<div class="numeros">${C.numeros.map(([n, t, s]) => `<div><b>${n}</b><span>${t}</span><small>${s}</small></div>`).join('')}</div>`;

  const homeA = () => `${carrossel()}
<section class="sec home-tres"><div class="in">
  <div class="col col-noticias">${tit('', 'Notícias')}${C.noticias.map(n => cardNoticia(n)).join('')}<a class="mais" href="${L('noticias')}">Todas as notícias ${ico('seta')}</a></div>
  <div class="col col-radio">${tit('', 'Rádio')}${C.radio.slice(0, 2).map(programa).join('')}<a class="mais" href="${L('radio')}">Todos os programas ${ico('seta')}</a></div>
  <div class="col col-promo">${tit('', 'Promoções')}${promoTiles()}</div>
</div></section>
<section class="sec home-cot"><div class="in">
  <div>${tit('', 'Cotações')}${tabelaCotacoes(true)}<a class="mais" href="${L('cotacoes')}">Consultar histórico ${ico('seta')}</a></div>
  <div>${tit('', 'Tempo em Santa Rosa')}${tempo()}</div>
</div></section>
<section class="sec sec-cinza"><div class="in">${tit('Negócios', 'Soluções para o produtor e para a comunidade')}${negociosGrade()}</div></section>
<section class="sec home-video"><div class="in">
  <div class="hv-txt"><img src="/assets/logo-branco.svg" alt="Coopermil" width="260" height="62" loading="lazy"><p class="slogan">${site.slogan}</p><p>Fundada em 1955 por 47 agricultores, a Cooperativa Mista São Luiz reúne hoje mais de 5 mil associados e mais de 1.000 colaboradores no Noroeste gaúcho.</p>${btn('a-cooperativa/historico', 'Conheça a nossa história', 'btn-claro')}</div>
  ${video()}
</div>${numerosFaixa()}</section>`;

  const homeB = () => `<section class="hero">
  <div class="hero-foto">${img('graos-1', 'Unidade de recebimento de grãos da Coopermil vista do alto', 'loading="eager" fetchpriority="high"')}</div>
  <div class="in">
    <div class="hero-txt"><span class="sobre">Cooperativa Mista São Luiz · desde 1955</span><h1>Acreditando e investindo <em>nesta terra</em></h1><p>Mais de 5 mil associados no Noroeste gaúcho, com agropecuária, grãos, leite, máquinas, postos, rações, sementes e os supermercados Super São Luiz.</p>
      <div class="botoes">${btn('negocios', 'Conheça os negócios')}${btn('a-cooperativa/area-de-atuacao', 'Encontre uma unidade', 'btn-claro')}</div></div>
    <aside class="hero-cot"><span class="sobre">Cotações · ${C.cotacoes.data}</span>${C.cotacoes.linhas.map(([p, m]) => `<div><b>${p}</b><span>${m}</span></div>`).join('')}<a href="${L('cotacoes')}">Ver horários ${ico('seta')}</a></aside>
  </div>
</section>
<section class="faixa-num">${numerosFaixa()}</section>
<section class="sec"><div class="in">${tit('Negócios', 'Tudo o que a propriedade e a família precisam')}<div class="bento">${C.negocios.map((n, i) => `<a class="bt bt-${i}" href="${L('negocios/' + n.slug)}">${img(n.capa, n.nome)}<span>${ico(icoNeg[n.slug])}<b>${n.nome}</b><small>${n.curto}</small></span></a>`).join('')}</div></div></section>
<section class="sec resultado"><div class="in">
  <div class="res-txt"><span class="sobre">Coopermil é resultado</span><h2>No campo e na vida da comunidade</h2><p>Em 2025, ano dos 70 anos, a Coopermil alcançou resultados positivos em todas as áreas. Os números completos estão na Revista Relatório Gestão 2025.</p>${btn('https://heyzine.com/flip-book/f18b756a2e.html', 'Ler o relatório', 'btn-claro')}</div>
  <div class="res-num">${C.resultado2025.map(([t, n, u]) => `<div><small>${t}</small><b>${n}</b><span>${u}</span></div>`).join('')}</div>
</div></section>
<section class="sec safra"><div class="in">
  <div class="safra-foto">${img('graos-2', 'Recebimento de grãos Coopermil')}<span class="selo">Safra<br><b>2026</b></span></div>
  <div class="safra-txt"><span class="sobre">Grãos Coopermil</span><h2>Qualidade e segurança com assistência técnica</h2><p>28 unidades de recebimento de soja, milho e trigo e 4 milhões de sacas de capacidade de armazenagem, em armazéns certificados por empresas independentes.</p><ul class="checks">${C.safra.map(s => `<li>${ico('check')}${s}</li>`).join('')}</ul>${btn('negocios/graos', 'Grãos na Coopermil')}</div>
</div></section>
<section class="sec sec-cinza painel"><div class="in">
  <div class="p-noticias">${tit('Notícias', 'O que acontece na cooperativa')}${C.noticias.map((n, i) => cardNoticia(n, i ? '' : ' grande')).join('')}<a class="mais" href="${L('noticias')}">Todas as notícias ${ico('seta')}</a></div>
  <div class="p-lado"><div class="p-radio">${tit('Rádio', 'Mensageiro Rural')}${C.radio.slice(0, 2).map(programa).join('')}<a class="mais" href="${L('radio')}">Todos os programas ${ico('seta')}</a></div>${tempo()}</div>
</div></section>
<section class="sec historia"><div class="in">${tit('Desde 1955', 'Uma história construída com os associados')}<ol class="tl-faixa">${C.linhaTempo.filter((_, i) => [0, 1, 3, 5, 7, 8, 10].includes(i)).map(([a, t]) => `<li><b>${a}</b><span>${t}</span></li>`).join('')}</ol>${btn('a-cooperativa/historico', 'Ler o histórico completo', 'btn-sec')}</div></section>
<section class="sec sec-azul video-sec"><div class="in">${video()}<div><span class="sobre">Institucional</span><h2>Coopermil, ${site.slogan.toLowerCase()}</h2><p>Conheça a cooperativa, os associados e as pessoas que fazem a Coopermil no Noroeste do Rio Grande do Sul.</p><div class="botoes">${btn('promocoes', 'Promoções', 'btn-claro')}${btn('revista', 'Revista Coopermil', 'btn-contorno')}</div></div></div></section>
<section class="sec mapa-sec"><div class="in"><div>${tit('Área de atuação', `${C.unidades.length} municípios, ${total} endereços`)}<p>Agropecuárias, Super São Luiz, unidades de recebimento de grãos e Postos Coopermil perto de cada associado.</p><ul class="cidades">${C.unidades.map(([c]) => `<li>${c}</li>`).join('')}</ul>${btn('a-cooperativa/area-de-atuacao', 'Ver todas as unidades')}</div>${img('mapa', 'Mapa da área de atuação da Coopermil no Rio Grande do Sul')}</div></section>`;

  // ---------- Páginas internas ----------
  const pg = {};
  pg.index = () => (A ? homeA() : homeB());

  pg.negocios = () => `${cab({ titulo: 'Negócios', sobre: 'Coopermil', trilhaItens: [['Negócios']], foto: 'agro-3', lead: 'Oito áreas de negócio para o produtor rural e para a comunidade do Noroeste gaúcho.' })}
<section class="sec"><div class="in">${negociosGrade()}</div></section>`;

  for (const n of C.negocios) {
    const outros = C.negocios.filter(o => o !== n);
    const extra = {
      agropecuaria: `<p class="acao">${btn(site.whatsLojas, 'Grupo de WhatsApp das Lojas Agropecuárias')}</p>`,
      supermercados: `<p class="acao">${btn(site.whatsSuper, 'Promoções no WhatsApp')} ${btn('https://www.facebook.com/supersaoluiz', 'Super São Luiz no Facebook', 'btn-sec')}</p>`,
      maquinas: `<p class="acao">${btn('maquinas', 'Ver os catálogos das marcas')}</p>`,
      graos: `<p class="acao">${btn('cotacoes', 'Cotação do dia')}</p>`,
      'postos-de-combustiveis': `<p class="acao">${btn('a-cooperativa/area-de-atuacao', 'Endereços dos postos')}</p>`,
    }[n.slug] || '';
    pg['negocios/' + n.slug] = () => `${cab({ titulo: n.titulo, sobre: n.nome, trilhaItens: [['Negócios', 'negocios'], [n.nome]], foto: n.capa, banner: n.banner })}
<section class="sec"><div class="in neg-corpo">
  <div class="texto">${n.texto.map(p => `<p>${p}</p>`).join('')}${extra}</div>
  <aside class="destaques">${ico(icoNeg[n.slug], 'ico grande')}<h2>${n.nome}</h2><ul>${n.destaques.map(d => `<li>${ico('check')}${d}</li>`).join('')}</ul><a href="tel:${site.foneHref}">${ico('fone')}${site.fone}</a></aside>
</div></section>
${n.galeria.length > 1 ? `<section class="sec sec-cinza"><div class="in">${tit('Galeria', n.nome)}${galeria(n.galeria, n.nome)}</div></section>` : `<section class="sec sec-cinza"><div class="in racoes-foto">${img(n.galeria[0], 'Rações Produz Mais Nutrição Animal')}</div></section>`}
<section class="sec"><div class="in">${tit('Conheça também', 'Outros negócios')}<div class="outros">${outros.map(o => `<a href="${L('negocios/' + o.slug)}">${ico(icoNeg[o.slug])}${o.nome}</a>`).join('')}</div></div></section>`;
  }

  pg['a-cooperativa/historico'] = () => `${cab({ titulo: 'Histórico', sobre: 'A Cooperativa', trilhaItens: [['A Cooperativa'], ['Histórico']], foto: 'hist-3', lead: site.slogan })}
<section class="sec"><div class="in hist-intro">
  <div class="texto"><p class="destaque">A Cooperativa Mista São Luiz Ltda. foi fundada em 27 de agosto de 1955, em Cinquentenário, então distrito de Santa Rosa e hoje município de Tuparendi (RS), por 47 associados ligados à agricultura.</p>
  <p>Os produtores rurais se organizaram diante das dificuldades de comercialização, principalmente na suinocultura, e encontraram no cooperativismo a melhor forma de gestão para as pequenas propriedades.</p>
  <p>Desde então, a Coopermil escolheu um crescimento lento, mas sólido, efetivo e planejado, acompanhando a economia e o mercado, sempre com o benefício e a concordância dos associados no centro das decisões.</p>
  <p>O objetivo é o desenvolvimento geral da cooperativa: contribuir com associados e colaboradores, garantir a satisfação dos clientes e manter a qualidade de forma permanente.</p></div>
  <div class="hist-fotos">${img('hist-1', 'Primeira sede da cooperativa, em Cinquentenário')}${img('hist-2', 'Estrutura da Coopermil em foto antiga')}</div>
</div></section>
<section class="sec sec-cinza"><div class="in">${tit('Linha do tempo', 'De 47 agricultores a mais de 5 mil associados')}<ol class="linha">${C.linhaTempo.map(([a, t, d]) => `<li><span class="ano">${a}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol></div></section>`;

  pg['a-cooperativa/principios-institucionais'] = () => `${cab({ titulo: 'Princípios institucionais', sobre: 'A Cooperativa', trilhaItens: [['A Cooperativa'], ['Princípios institucionais']], foto: 'assoc-5' })}
<section class="sec"><div class="in mv">
  <div class="mv-card missao"><span class="sobre">Missão</span><p>${C.principios.missao}</p></div>
  <div class="mv-card visao"><span class="sobre">Visão</span><p>${C.principios.visao}</p></div>
</div></section>
<section class="sec sec-cinza"><div class="in">${tit('Valores', 'O que guia a Coopermil')}<ol class="valores">${C.principios.valores.map(([t, d], i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><b>${t}</b><small>${d}</small></li>`).join('')}</ol></div></section>`;

  const iniciais = n => n.split(' ').filter(p => p.length > 2).slice(0, 2).map(p => p[0]).join('') || n[0];
  const lista = (titulo, nomes) => `<div class="lista-nomes"><h3>${titulo}</h3><ul>${nomes.map(n => `<li>${n}</li>`).join('')}</ul></div>`;
  pg['a-cooperativa/diretoria'] = () => `${cab({ titulo: 'Diretoria', sobre: 'A Cooperativa', trilhaItens: [['A Cooperativa'], ['Diretoria']], foto: 'noticia-2' })}
<section class="sec"><div class="in">${tit('Diretoria executiva', 'Quem conduz a cooperativa')}<div class="executiva">${C.diretoria.executiva.map(([c, n]) => `<div class="pessoa"><span class="ini">${iniciais(n)}</span><b>${n}</b><small>${c}</small></div>`).join('')}</div></div></section>
<section class="sec sec-cinza"><div class="in conselhos">
  <div class="conselho">${tit(C.diretoria.conselhoAdm.periodo, 'Conselho de Administração')}${lista('Efetivos', C.diretoria.conselhoAdm.efetivos)}${lista('Suplentes', C.diretoria.conselhoAdm.suplentes)}</div>
  <div class="conselho">${tit(C.diretoria.conselhoFiscal.periodo, 'Conselho Fiscal')}${lista('Efetivos', C.diretoria.conselhoFiscal.efetivos)}${lista('Suplentes', C.diretoria.conselhoFiscal.suplentes)}
    <div class="assessoria">${tit('', 'Assessoria e auditoria')}<dl>${C.diretoria.assessoria.map(([c, n]) => `<dt>${c}</dt><dd>${n}</dd>`).join('')}</dl></div></div>
</div></section>
<section class="sec"><div class="in">${tit('Supervisores', 'Áreas de gestão')}<div class="supervisores">${C.diretoria.supervisores.map(([a, n]) => `<div><small>${a}</small><b>${n}</b></div>`).join('')}</div><p class="nota">A cooperativa conta ainda com 25 gerentes de unidade em toda a área de atuação.</p></div></section>`;

  pg['a-cooperativa/colaboradores'] = () => `${cab({ titulo: 'Colaboradores', sobre: 'A Cooperativa', trilhaItens: [['A Cooperativa'], ['Colaboradores']], foto: 'super-1', lead: 'O sucesso das organizações está nas pessoas.' })}
<section class="sec"><div class="in colab">
  <div class="texto"><p class="destaque">Para a Coopermil, as pessoas são muito importantes: cada colaborador contribui com a sua experiência para o desenvolvimento da cooperativa e para o próprio crescimento profissional.</p>
  <p>A cooperativa cresceu e quer continuar crescendo. Com isso, os desafios também aumentaram. Hoje são mais de 1.000 colaboradores atendendo às demandas das diversas áreas de negócio.</p>
  <p>A Coopermil oferece treinamentos e capacitações para que os colaboradores desenvolvam ou ampliem as suas habilidades e cresçam dentro da cooperativa. Além dos benefícios, garante todos os direitos legais, como o Vale Transporte.</p>
  <div class="assoc-colab"><div><b>SINDICOOP</b><small>Sindicato que representa os trabalhadores em cooperativas.</small></div><div><b>AFUMIL</b><small>Associação dos funcionários da Coopermil, com sedes para recreação, confraternizações e lazer.</small></div></div>
  ${btn('trabalhe-conosco', 'Ver vagas abertas')}</div>
  <aside class="beneficios"><span class="num-grande">1.000+</span><small>colaboradores</small><h2>Benefícios</h2><ul>${C.beneficios.map(b => `<li>${ico('check')}${b}</li>`).join('')}</ul></aside>
</div></section>`;

  pg['a-cooperativa/associados'] = () => `${cab({ titulo: 'Associados', sobre: 'A Cooperativa', trilhaItens: [['A Cooperativa'], ['Associados']], foto: 'assoc-2', lead: 'Mais de 5 mil associados fazem parte da Coopermil.' })}
<section class="sec"><div class="in duas">
  <div class="texto"><p class="destaque">Uma cooperativa é formada por pessoas que compartilham objetivos comuns. Desde a fundação, a Coopermil se voltou aos interesses dos associados e das comunidades onde eles vivem.</p>
  <p>Cumprindo o seu papel social, a cooperativa mantém programas nas comunidades e oferece serviços exclusivos aos associados. Ser associado é fazer parte de uma cooperativa comprometida, sólida, inovadora e justa, que divide a credibilidade de quem investe na região.</p></div>
  <div class="cartao-azul"><span class="sobre">Transferência de tecnologia</span><p>Nos negócios da cooperativa, o associado compra produtos de qualidade adequados à sua propriedade e recebe assistência técnica profissional e qualificada.</p><p>A equipe técnica orienta os produtores para garantir a produtividade das lavouras, e na Área de Validação de Pesquisas o associado acompanha os experimentos feitos para a região.</p>${btn('a-cooperativa/validacao-de-pesquisas', 'Validação de Pesquisas', 'btn-claro')}</div>
</div></section>
<section class="sec sec-cinza"><div class="in">${tit('Galeria', 'Encontros com os associados')}${galeria(['assoc-1', 'assoc-2', 'assoc-3', 'assoc-4', 'assoc-5'], 'Associados Coopermil')}</div></section>`;

  pg['a-cooperativa/validacao-de-pesquisas'] = () => `${cab({ titulo: 'Validação de Pesquisas', sobre: 'A Cooperativa', trilhaItens: [['A Cooperativa'], ['Validação de Pesquisas']], foto: 'pesq-3', lead: 'Pesquisa feita no clima e no solo do Noroeste gaúcho.' })}
<section class="sec"><div class="in duas">
  <div class="texto"><p class="destaque">A Coopermil começou a validar pesquisas agrícolas em 1992 e, dois anos depois, criou a Área Experimental Coopermil, para validar processos produtivos nas condições de clima e solo da região e aumentar a produtividade e a renda dos associados.</p>
  <p>A área começou com 9 hectares e hoje ocupa 10,5 hectares na BR 472, Km 2, em Santa Rosa, com trabalhos feitos junto a instituições de pesquisa e fabricantes de insumos, máquinas e equipamentos.</p>
  <p>A cooperativa destina cerca de R$ 5,00 por hectare atendido ao ano para as pesquisas e para a divulgação aos produtores, nos Dias de Campo e nas Palestras Técnicas de cada cultura.</p></div>
  <div class="mini-num"><div><b>1992</b><small>início da validação</small></div><div><b>10,5 ha</b><small>de área experimental</small></div><div><b>R$ 5/ha</b><small>investidos ao ano</small></div><div><b>40+</b><small>empresas parceiras</small></div></div>
</div></section>
<section class="sec sec-cinza"><div class="in">${tit('Resultados', 'Inovações levadas às lavouras')}<div class="inovacoes">${C.pesquisa.inovacoes.map(([c, t]) => `<div class="inov"><span class="cultura">${c}</span><p>${t}</p></div>`).join('')}</div></div></section>
<section class="sec"><div class="in">${tit('Parcerias', 'Pesquisa feita em conjunto')}<p class="texto">As primeiras parcerias foram com a Embrapa Trigo (Passo Fundo). Depois vieram a soja, com o lançamento da cultivar BRS 211, específica para a região, e os parceiros atuais: RTC-CCGL, Embrapa, G12 Agro, os pesquisadores Dr. Lucas Navarini e Dr. Igor Quirrembach e empresas de genética como Biotrigo, Bayer e OR Sementes.</p><ul class="chips">${C.pesquisa.parceiros.map(p => `<li>${p}</li>`).join('')}</ul>${galeria(['pesq-1', 'pesq-2', 'pesq-3'], 'Área Experimental Coopermil')}</div></section>`;

  pg['a-cooperativa/educacao-social'] = () => `${cab({ titulo: 'Educação Social', sobre: 'A Cooperativa', trilhaItens: [['A Cooperativa'], ['Educação Social']], foto: 'edu-2', lead: 'Desenvolvimento econômico, social e cultural.' })}
<section class="sec"><div class="in duas">
  <div class="texto"><p class="destaque">O Programa de Educação Social da Coopermil acontece todos os anos desde 2004, com ações educativas sobre temas da atualidade, envolvendo toda a família do associado.</p>
  <p>As atividades são voltadas principalmente às mulheres, mas incluem também os homens, que são a maioria dos associados, e os filhos. O objetivo é ampliar a participação da família no ambiente cooperativo e preparar as mulheres para participarem efetivamente da cogestão da propriedade.</p>
  <p>O programa chega a toda a região de atuação por meio de grupos organizados de mulheres associadas e clientes. Os temas mudam a cada ano, com atividades práticas e teóricas.</p></div>
  <div class="mini-num"><div><b>2004</b><small>início do programa</small></div><div><b>30</b><small>grupos</small></div><div><b>700</b><small>participantes</small></div><div><b>8</b><small>temáticas</small></div></div>
</div></section>
<section class="sec sec-cinza"><div class="in">${tit('Temáticas', 'O que se aprende nos grupos')}<ol class="temas">${C.temasEducacao.map((t, i) => `<li><span>${i + 1}</span>${t}</li>`).join('')}</ol></div></section>
<section class="sec"><div class="in">${galeria(['edu-1', 'edu-2', 'edu-3', 'edu-4', 'edu-5'], 'Educação Social Coopermil')}</div></section>`;

  pg['a-cooperativa/area-de-atuacao'] = () => `${cab({ titulo: 'Área de atuação', sobre: 'A Cooperativa', trilhaItens: [['A Cooperativa'], ['Área de atuação']], foto: 'agro-3', lead: `${C.unidades.length} municípios e ${total} endereços no Noroeste do Rio Grande do Sul.` })}
<section class="sec"><div class="in area-topo">${img('mapa', 'Mapa da área de atuação da Coopermil: municípios com unidades em azul e municípios atendidos em vermelho')}
  <div><h2>Encontre a unidade mais perto</h2><p>Filtre pelo tipo de unidade ou escolha a cidade.</p>
  <div class="filtros" data-filtros role="toolbar" aria-label="Filtrar unidades"><button data-f="" aria-pressed="true">Todas</button>${Object.entries(TIPOS).map(([k, [t, i]]) => `<button data-f="${k}" aria-pressed="false">${ico(i)}${t}</button>`).join('')}</div>
  <label class="sel-cidade"><span>Cidade</span><select data-cidade><option value="">Todas as cidades</option>${C.unidades.map(([c]) => `<option>${c}</option>`).join('')}</select></label></div>
</div></section>
<section class="sec sec-cinza"><div class="in unidades" data-unidades>${C.unidades.map(([cid, us]) => `<div class="cidade" data-c="${cid}"><h3>${ico('pin')}${cid} <small>${us.length} ${us.length > 1 ? 'endereços' : 'endereço'}</small></h3><div class="u-lista">${us.map(([n, e, f, t]) => `<div class="unid" data-t="${t}"><span class="tipos">${[...t].map(k => `<i title="${TIPOS[k][0]}">${ico(TIPOS[k][1])}</i>`).join('')}</span><b>${n}</b><small>${e}</small><a href="tel:+55${f.split('·')[0].replace(/\D/g, '')}">${f}</a></div>`).join('')}</div></div>`).join('')}<p class="vazio" hidden data-vazio>Nenhuma unidade com esse filtro nessa cidade.</p></div></section>`;

  pg.noticias = () => `${cab({ titulo: 'Notícias', sobre: 'Coopermil', trilhaItens: [['Notícias']], foto: 'noticia-1' })}
<section class="sec"><div class="in lista-noticias">${C.noticias.map(n => cardNoticia(n, ' grande')).join('')}<p class="nota">As notícias anteriores continuam no arquivo do site, com o mesmo endereço.</p></div></section>`;
  for (const n of C.noticias) pg['noticias/' + n.slug] = () => `${cab({ titulo: n.titulo, sobre: n.data, trilhaItens: [['Notícias', 'noticias'], ['Notícia']], foto: n.foto })}
<section class="sec"><div class="in artigo"><article>${img(n.foto, n.titulo, 'class="art-capa"')}${n.texto.map(p => `<p>${p}</p>`).join('')}${galeria(n.fotos.slice(1), n.titulo)}</article>
<aside><h2>Outras notícias</h2>${C.noticias.filter(o => o !== n).map(o => cardNoticia(o)).join('')}<a class="mais" href="${L('noticias')}">Todas as notícias ${ico('seta')}</a></aside></div></section>`;

  pg.radio = () => `${cab({ titulo: 'Mensageiro Rural', sobre: 'Rádio', trilhaItens: [['Rádio']], foto: 'agro-3', lead: 'O programa de rádio exclusivo da Coopermil, feito para aproximar a cooperativa da comunidade e, principalmente, dos associados.' })}
<section class="sec"><div class="in radio-lista">${C.radio.map(programa).join('')}</div></section>`;

  pg.revista = () => `${cab({ titulo: 'Revista Coopermil', sobre: 'Revista', trilhaItens: [['Revista']], foto: 'assoc-3', lead: 'As ações do cooperativismo e as atividades da Coopermil em todos os setores, para ler e consultar.' })}
<section class="sec"><div class="in revistas">${C.revistas.map(([t, d, u, c], i) => `<a class="rev${i ? '' : ' nova'}" href="${u}" target="_blank" rel="noopener">${img(c, `Capa da revista ${t}`)}<span><small>${d}</small><b>${t}</b><em>Ver edição completa ${ico('externo')}</em></span></a>`).join('')}</div></section>`;

  pg.promocoes = () => `${cab({ titulo: 'Aproveite nossas promoções', sobre: 'Promoções', trilhaItens: [['Promoções']], foto: 'super-2' })}
<section class="sec"><div class="in promo-pag">
  <div class="promo-bloco" id="super-sao-luiz">${img('super-4', 'Super São Luiz')}<div><span class="sobre">Super São Luiz</span><h2>É muito bom comprar aqui</h2><p>As ofertas da semana das 18 lojas Super São Luiz chegam primeiro no grupo de WhatsApp.</p>${btn(site.whatsSuper, 'Entrar no grupo de promoções')}</div></div>
  <div class="promo-bloco" id="agropecuaria">${img('agro-5', 'Agropecuária Coopermil')}<div><span class="sobre">Agropecuária Coopermil</span><h2>Ofertas para a propriedade</h2><p>Insumos, ferragens, máquinas e implementos com condições especiais nas Lojas Agropecuárias.</p>${btn(site.whatsLojas, 'Grupo das Lojas Agropecuárias')}</div></div>
</div></section>`;

  pg.maquinas = () => `${cab({ titulo: 'Máquinas', sobre: 'Catálogos', trilhaItens: [['Máquinas']], foto: 'maq-1', lead: 'Máquinas, implementos, peças e assistência técnica das marcas que a Coopermil representa.' })}
<section class="sec"><div class="in catalogos">${C.catalogos.map(([t, c, u]) => `<a class="cat" href="${u}" target="_blank" rel="noopener">${img(c, `Catálogo ${t}`)}<b>${t === 'Máquinas usadas' ? t : 'Catálogo ' + t}</b><small>Ver mais ${ico('externo')}</small></a>`).join('')}</div></section>`;

  pg.cotacoes = () => `${cab({ titulo: 'Cotações', sobre: 'Grãos', trilhaItens: [['Cotações']], foto: 'graos-2' })}
<section class="sec"><div class="in duas">${tabelaCotacoes(true)}<div class="texto"><h2>Horário de faturamento</h2><ul class="checks">${C.cotacoes.horarios.map(h => `<li>${ico('check')}${h}</li>`).join('')}</ul><p>O histórico mês a mês, desde 2016, está na consulta de cotações da cooperativa.</p>${btn('https://www.coopermil.com/cotacao', 'Consultar histórico')}</div></div></section>`;

  pg.lgpd = () => `${cab({ titulo: 'LGPD', sobre: 'Privacidade', trilhaItens: [['LGPD']], lead: 'Como a Coopermil cuida dos dados pessoais de associados, clientes e colaboradores.' })}
<section class="sec"><div class="in docs">${C.lgpd.map(([t, u]) => `<a class="doc" href="${u}" target="_blank" rel="noopener">${ico('doc')}<b>${t}</b><small>Abrir ${ico('externo')}</small></a>`).join('')}</div></section>`;

  pg['trabalhe-conosco'] = () => `${cab({ titulo: 'Trabalhe conosco', sobre: 'Carreira', trilhaItens: [['Trabalhe conosco']], foto: 'super-3', lead: 'Mais de 1.000 colaboradores em agropecuárias, supermercados, postos, grãos e na sede.' })}
<section class="sec"><div class="in vagas-pag">
  <div class="vagas">${tit('Vagas abertas', 'Candidate-se')}${C.vagas.map(([c, l, r, p]) => `<div class="vaga"><div><b>${c}</b><small>${ico('pin')}${l}</small><p>${r}</p></div><span class="prazo">${/\d/.test(p) ? 'Até ' + p : p}</span><a class="btn btn-sec" href="${site.cadastroCurriculo}" target="_blank" rel="noopener">Candidatar-se</a></div>`).join('')}</div>
  <aside class="cartao-azul"><span class="sobre">Banco de talentos</span><p>Entregue o currículo na unidade, envie pelo cadastro on-line ou deixe no RH da sede, em Santa Rosa.</p>${btn(site.cadastroCurriculo, 'Cadastrar currículo', 'btn-claro')}<p class="peq">Muitas vagas também são para pessoas com deficiência (PCD).</p>${btn('a-cooperativa/colaboradores', 'Benefícios', 'btn-contorno')}</aside>
</div></section>`;

  pg.contato = () => `${cab({ titulo: 'Fale com a Coopermil', sobre: 'Contato', trilhaItens: [['Contato']], foto: 'agro-8' })}
<section class="sec"><div class="in contato">
  <div class="c-info"><a class="c-item" href="tel:${site.foneHref}">${ico('fone')}<span><small>Telefone</small><b>${site.fone}</b></span></a>
    <a class="c-item" href="${whats('Olá, Coopermil!')}" target="_blank" rel="noopener">${ico('whats')}<span><small>WhatsApp</small><b>${site.fone}</b></span></a>
    <a class="c-item" href="${site.mapa}" target="_blank" rel="noopener">${ico('pin')}<span><small>Sede administrativa</small><b>${site.endereco}</b><small>${site.cidade}</small></span></a>
    <a class="c-item" href="${site.ouvidoria}" target="_blank" rel="noopener">${ico('escudo')}<span><small>Ouvidoria</small><b>ouvidoria.coopermil.com</b></span></a>
    <p class="soc">${sociais()}</p></div>
  <form class="form" data-form><h2>Mande uma mensagem</h2><p>A mensagem abre no WhatsApp da Coopermil, já preenchida.</p>
    <label><span>Assunto</span><select name="assunto"><option>Ser associado</option><option>Agropecuária</option><option>Grãos</option><option>Leite</option><option>Máquinas</option><option>Postos</option><option>Rações</option><option>Sementes</option><option>Super São Luiz</option><option>Outro assunto</option></select></label>
    <label><span>Nome</span><input name="nome" required autocomplete="name"></label>
    <label><span>Cidade</span><input name="cidade" required autocomplete="address-level2"></label>
    <label><span>Mensagem</span><textarea name="mensagem" rows="4" required></textarea></label>
    <button class="btn btn-prim" type="submit">${ico('whats')} Enviar pelo WhatsApp</button></form>
</div></section>`;

  const out = {};
  for (const [slug, fn] of Object.entries(pg)) out[slug] = documento({ v, slug, corpo: `${topo(slug)}\n<main id="conteudo">\n${fn()}\n</main>\n${rodape()}` });
  return out;
}

const FONTES = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;500;600&display=swap';
function documento({ v, slug, corpo }) {
  const [titulo, desc] = PAG[slug];
  const url = `${site.dominio}/${v}/${slug === 'index' ? '' : slug + '/'}`;
  const og = `${site.dominio}/assets/og-${v}.jpg`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Coopermil">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${og}">
<meta name="theme-color" content="#0066A6">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTES}">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
</head>
<body class="v-${v} pg-${slug.replace(/\//g, '-')}" data-whats="${site.whats}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
${corpo}
<script src="/assets/coopermil.js" defer></script>
</body>
</html>
`;
}
