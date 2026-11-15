// Apoema Turismo de Aventura (Canela/RS): passeios de quadriciclo nos morros da Serra Gaúcha desde 2007.
// node clientes/apoema/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs apoema https://www.apoema.tur.br/)
// Pedido do Joao: manter a estética de aventura e nostálgica do site atual (Wix): logo com mancha verde, títulos Chelsea Market,
// chamadas em Anton inclinado, moldura de borda rasgada nas fotos, textura de papel envelhecido, botões vermelhos em pílula,
// selos do TripAdvisor, bandeiras "We Speak", botas ilustradas e mancha de tinta. Tudo veio do site atual (static.wixstatic.com).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));

const WA = '5554981374994';
const E = {
  nome: 'Apoema Turismo de Aventura', legal: 'Apoema Ecoturismo Ltda.', url: 'https://apoema.overtus.com.br/', antigo: 'https://www.apoema.tur.br/',
  fone: '(54) 98137-4994', foneHref: 'tel:+5554981374994',
  email: 'aventura@apoema.tur.br',
  end: 'Rua Godofredo Raymundo, 1740', bairro: 'Bairro Cedro', ref: 'em frente ao Parque das Sequoias', cidade: 'Canela, Serra Gaúcha, RS', cep: '95680-000',
  insta: 'https://www.instagram.com/apoemaquadriciclos/', instaTxt: '@apoemaquadriciclos',
  face: 'https://www.facebook.com/Apoemaecoturismo', trip: 'https://www.tripadvisor.com.br/Attraction_Review-g775227-d4153640-Reviews-Apoema_Eco_Tours-Canela_State_of_Rio_Grande_do_Sul.html',
};
const ext = 'target="_blank" rel="noopener"';
const wa = (msg = 'Olá! Vim pelo site e quero agendar um passeio de quadriciclo.') => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async"${extra}>`;
const moldura = (n, alt, cls = '') => `<figure class="moldura ${cls}">${img(n, alt)}</figure>`;
const etiqueta = t => `<p class="etiqueta"><span>${t}</span></p>`;

// ícones próprios de aventura (traço igual ao kit)
const J = {
  capacete: '<path d="M3 15a9 9 0 0118 0v2H3z"/><path d="M12 6v5h9M3 17h18v2H3z"/>',
  oculos: '<path d="M2 10h20v4a3 3 0 01-3 3h-3l-2-3h-4l-2 3H5a3 3 0 01-3-3z"/>',
  luva: '<path d="M7 21v-6L4 11l1.5-1.5L8 12V4.5a1.5 1.5 0 013 0V10V3.5a1.5 1.5 0 013 0V10V4.5a1.5 1.5 0 013 0V11V7a1.5 1.5 0 013 0v8a6 6 0 01-6 6z"/>',
  chuva: '<path d="M3 12a9 9 0 0118 0z"/><path d="M12 12v7a2 2 0 01-4 0M12 3v1"/>',
  monitor: '<circle cx="12" cy="6" r="3"/><path d="M5 21v-3a7 7 0 0114 0v3"/><path d="M9 14l3 3 3-3"/>',
  montanha: '<path d="M2 20l7-12 4 6 3-4 6 10z"/><path d="M7.5 10.5l1.5 1 1.5-1"/>',
  trilha: '<path d="M4 20c4-2 2-6 6-8s6-2 6-6"/><circle cx="16" cy="5" r="2"/><circle cx="4" cy="20" r="1.4"/>',
  quad: '<circle cx="6" cy="16" r="3.2"/><circle cx="18" cy="16" r="3.2"/><path d="M6 12.8l2.5-4.3h6l3.5 4.3M10 8.5l-1-3h3M14.5 8.5L16 6"/>',
  termo: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h4"/>',
  cone: '<path d="M10 3h4l5 16H5z"/><path d="M8 10h8M6.8 15h10.4M3 21h18"/>',
  ambulancia: '<path d="M2 7h12v10H2zM14 10h4l4 4v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 9.5v5M5.5 12h5"/>',
  wifi: '<path d="M2 9a15 15 0 0120 0M5 12.5a10 10 0 0114 0M8.5 16a5 5 0 017 0"/><circle cx="12" cy="19.5" r="1" fill="currentColor"/>',
  carro: '<path d="M3 16v-4l2.2-5.2A2 2 0 017 5.6h10a2 2 0 011.8 1.2L21 12v4"/><path d="M3 12h18"/><rect x="2" y="16" width="20" height="3" rx="1"/>',
  dinheiro: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 9v.01M18 15v.01"/>',
  bussola: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
};
const jc = (n, cls = 'ic') => J[n] ? `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${J[n]}</svg>` : ic(n, cls);

// Passeios: textos, valores e fotos do site atual (/passeiosdequadriciclo)
const P = [
  { id: 'morro-pelado', nome: 'Morro Pelado', titulo: 'Passeio ao Morro Pelado', km: 7, dif: 1, difTxt: 'Fácil', dur: 'aprox. 45 min', foto: 'morro-pelado', ind: 220, dup: 275,
    morros: 'o mirante do Morro Pelado', obj: 'O mirante do Morro Pelado, com uma vista diferente para os vales próximos de Canela e Gramado.', pilotos: 'Acima de 18 anos. De 16 a 18 anos, com pai ou mãe responsável na garupa.' },
  { id: 'pelado-e-dedao', nome: 'Morros Pelado e Dedão', titulo: 'Passeio aos Morros Pelado e Dedão', km: 10, dif: 2, difTxt: 'Médio', dur: 'aprox. 1 hora', foto: 'pelado-dedao', ind: 315, dup: 370,
    obj: 'Os mirantes dos morros Pelado e Dedão. Cada morro oferece uma vista diferente para os vales próximos de Canela e Gramado, sempre com o acompanhamento de monitores da Apoema.', pilotos: 'Acima de 18 anos. De 16 a 18 anos, com pai ou mãe responsável na garupa.' },
  { id: 'tres-morros-off-road', nome: '3 Morros com Off Road', titulo: 'Passeio aos 3 Morros com Off Road', km: 15, dif: 3, difTxt: 'Alto', dur: 'aprox. 1h30', foto: 'trilha-lama', ind: 415, dup: 470,
    obj: 'Os mirantes dos morros Pelado, Queimado e Dedão, com trechos de off road. Cada morro oferece uma vista diferente para os vales próximos de Canela e Gramado, sempre com o acompanhamento de monitores da Apoema.', pilotos: 'Acima de 18 anos. De 16 a 18 anos, com pai ou mãe responsável na garupa.' },
  { id: 'por-do-sol', nome: 'Pôr do Sol nos Morros', titulo: 'Passeio do Pôr do Sol nos Morros', km: 13, dif: 2, difTxt: 'Médio', dur: 'aprox. 2 horas', foto: 'por-do-sol', ind: 460, dup: 515,
    obj: 'Mirantes dos morros e estradas do interior no fim da tarde, para ver o sol se pôr sobre os vales próximos de Canela e Gramado e voltar com a noite chegando.', pilotos: 'Acima de 18 anos. De 16 a 18 anos, com pai ou mãe responsável na garupa.' },
  { id: '25-km-off-road', nome: '25 km com Off Road', titulo: 'Trajeto de 25 km com Off Road', km: 25, dif: 4, difTxt: 'Alto / técnico', dur: 'aprox. 2 horas', foto: 'trilha-25km', ind: 690, dup: 745, novo: true,
    obj: 'Diversos trechos fora de estrada e os mirantes dos morros Pelado, Queimado e Dedão. Cada morro oferece uma vista diferente para os vales próximos de Canela e Gramado, sempre com o acompanhamento de monitores da Apoema.', pilotos: 'Somente acima de 18 anos. Recomendado para quem já sabe andar de quadriciclo e não recomendado para quem nunca pilotou: se após a largada o piloto mostrar não ter habilidade, o passeio é cancelado.' },
];
const real = v => `R$ ${v},00`;
const dificuldade = p => `<span class="dif" aria-label="Dificuldade ${p.difTxt}">${[1, 2, 3, 4].map(i => `<i${i <= p.dif ? ' class="on"' : ''}></i>`).join('')}<b>${p.difTxt}</b></span>`;
const INCLUSO = [['capacete', 'Capacete'], ['oculos', 'Óculos de proteção'], ['luva', 'Luvas'], ['chuva', 'Capa de chuva, se precisar'], ['monitor', 'Monitores especializados'], ['quad', 'Quadriciclos 4x4']];

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'passeios', n: 'Os passeios' },
  { slug: 'galeria', n: 'Galeria' },
  { slug: 'onde-estamos', n: 'Nosso endereço' },
  { slug: 'quem-somos', n: 'Quem somos' },
  { slug: 'contato', n: 'Fale conosco' },
];
export const nomesVersao = { a: 'Caderno de trilha', b: 'Expedição' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Chelsea+Market&family=Anton&family=Archivo:wght@400;500;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Apoema | Passeios de quadriciclo em Canela, Serra Gaúcha' : `${titulo} | Apoema Turismo de Aventura`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: v === 'b' ? '#24291f' : '#2a1d16' });
const marca = `<img class="logo" src="/assets/img/logo.webp" alt="Apoema Eco Tours" width="${F.logo[0]}" height="${F.logo[1]}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Apoema, página inicial">${marca}<span class="marca-nome">Apoema Turismo<br>de Aventura</span></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <a class="agende" href="${wa()}" ${ext}><span>Agende seu passeio pelo</span><b>${icWa()}Whats 54 98137-4994</b></a>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">
`;
}
const selos = (cls = '') => `<a class="selos ${cls}" href="${E.trip}" ${ext} aria-label="Prêmios Travellers' Choice do TripAdvisor (2021 a 2024)">${['ta-2024', 'ta-2023', 'ta-2022', 'ta-2021'].map(n => img(n, `Selo ${n.slice(3)} do TripAdvisor`)).join('')}</a>`;
const falamos = () => `<div class="falamos"><b>We speak</b><span>${img('bandeira-de', 'Alemão')}${img('bandeira-ch', 'Suíço-alemão')}${img('bandeira-gb', 'Inglês')}</span></div>`;

function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca">${marca}${selos()}</div>
    <div class="rod-dados">
      <h2>Apoema Turismo de Aventura</h2>
      <p>${E.end}<br>${E.bairro} (${E.ref})<br>${E.cidade}, Brasil</p>
      <p><a href="${wa()}" ${ext}>${icWa()}Tel/Whats ${E.fone}</a><br><a href="mailto:${E.email}">${ic('mail')}${E.email}</a><br><a href="${E.insta}" ${ext}>${ic('insta')}${E.instaTxt}</a></p>
    </div>
    <div class="rod-nav"><h3>Navegue</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.n}</a></li>`).join('')}</ul>
      <p class="rod-redes"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a><a href="${E.trip}" ${ext} aria-label="TripAdvisor" class="rr-trip">${img('ta-2021', 'TripAdvisor')}</a></p></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal} · Cadastur 07.318.065/0001-29</span><span>Canela, Serra Gaúcha</span></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Agendar pelo WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

// ---------- blocos ----------
const passeioBilhete = (v, p, i) => `<a class="bilhete sobe" href="${link(v, 'passeios')}#${p.id}">
  <span class="bil-foto">${img(p.foto, `${p.titulo}: quadriciclos na trilha em Canela`)}</span>
  <span class="bil-corpo">
    ${p.novo ? '<span class="pilula">Novidade exclusiva da Apoema</span>' : `<span class="bil-n">Passeio ${String(i + 1).padStart(2, '0')}</span>`}
    <strong>${p.nome}</strong>
    <span class="bil-km"><b>${p.km}</b> km<small>ida e volta</small></span>
    <span class="bil-info">${dificuldade(p)}<span>${ic('relogio')}${p.dur}</span></span>
    <span class="bil-preco">a partir de <b>${real(p.ind)}</b></span>
    <span class="bil-mais">Mais informações ${ic('seta')}</span>
  </span>
</a>`;

const etapas = () => `<ol class="etapas">
  <li class="sobe"><span class="et-n">1</span>${jc('capacete', 'ic et-ic')}<b>Equipamento</b><span>Capacete, óculos de proteção, luvas e capa de chuva se precisar. Tudo incluso.</span></li>
  <li class="sobe"><span class="et-n">2</span>${jc('cone', 'ic et-ic')}<b>Instruções e pista de teste</b><span>Todos os pilotos recebem as instruções do quadriciclo e passam pela pista de teste antes de sair.</span></li>
  <li class="sobe"><span class="et-n">3</span>${jc('termo', 'ic et-ic')}<b>Termo de responsabilidade</b><span>Cada piloto assina o termo. Acima de 18 anos; de 16 a 18 com pai ou mãe na garupa.</span></li>
  <li class="sobe"><span class="et-n">4</span>${jc('montanha', 'ic et-ic')}<b>Rumo aos morros</b><span>Estradas de terra do interior de Canela até os mirantes, sempre com monitores da Apoema.</span></li>
</ol>`;

const blocoSeguranca = (v) => `<section class="sec seguranca"><div class="in seg-grade">
  <div class="seg-txt sobe">
    ${etiqueta('Fique tranquilo')}
    <h2>Único passeio de quadriciclo da Serra Gaúcha com área protegida por equipe médica</h2>
    <p>A Apoema tem cobertura da Transul Emergências Médicas durante os passeios. Somos cadastrados no Cadastur, do Ministério do Turismo, e seguimos uma política de segurança própria para turismo de aventura.</p>
    <ul class="seg-lista">
      <li>${jc('ambulancia')}Área protegida pela Transul</li>
      <li>${jc('monitor')}Monitores em todo o trajeto</li>
      <li>${jc('quad')}Quadriciclos com tração 4x4</li>
      <li>${ic('escudo')}Agência cadastrada no Cadastur</li>
    </ul>
    <p><a class="link-seta" href="${link(v, 'quem-somos')}#seguranca">Nossa política de segurança ${ic('seta')}</a></p>
  </div>
  <div class="seg-docs sobe">
    <figure class="doc doc-transul">${img('transul', 'Fique tranquilo, você está protegido: Transul Emergências Médicas')}</figure>
    <figure class="doc doc-cadastur">${img('cadastur', 'Certificado Cadastur da Apoema Ecoturismo Ltda.')}</figure>
  </div>
</div></section>`;

const blocoVideo = (titulo = 'Vídeo de passeio') => `<section class="sec sec-video"><div class="in video-grade">
  <div class="video-txt sobe">${etiqueta(titulo)}<h2>Confira nossas aventuras</h2>
    <p>Dispomos de roteiros fixos e podemos montar outras opções de passeio conforme seu interesse e experiência.</p>
    <p><a class="btn btn-vermelho" href="${wa('Olá! Vi o vídeo no site e quero montar um passeio.')}" ${ext}>${icWa()}Montar meu passeio</a></p></div>
  <div class="tela-video sobe"><video controls preload="none" playsinline poster="/assets/img/video-capa.webp"><source src="/assets/video/passeio.mp4" type="video/mp4"></video></div>
</div></section>`;

const GAL = Object.keys(F).filter(k => k.startsWith('galeria-')).sort();
const altGal = 'Passeio de quadriciclo da Apoema em Canela';
const tiraFotos = () => `<div class="tira">${['galeria-05', 'galeria-13', 'por-do-sol-mirante', 'galeria-09', 'farois-floresta', 'grupo-arvore'].map((n, i) => `<a href="/assets/img/${n}.webp" data-foto="${altGal}" class="polaroide p${i}">${img(n, altGal)}</a>`).join('')}</div>`;

const chamada = (v) => `<section class="chamada"><div class="in chamada-in">
  ${img('botas', '', ' class="cha-botas" aria-hidden="true"')}
  <div><h2>Bora pra trilha?</h2><p>Saídas de terça a domingo. <b>Desconto de 5% no pagamento em espécie.</b></p></div>
  <a class="btn btn-vermelho" href="${wa()}" ${ext}>${icWa()}Agende seu passeio pelo Whats</a>
</div></section>`;

// ---------- páginas ----------
function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'Apoema Turismo de Aventura: pioneira em passeios de quadriciclo no RS. Trilhas aos morros Pelado, Dedão e Queimado em Canela, desde 2007, mais de 60 mil clientes.') + topo(v, 'index') + `
<section class="heroa">
  <div class="ha-fundo">${imgTopo('panorama', 'Mar de nuvens visto do alto do Morro Pelado, em Canela, Serra Gaúcha')}</div>
  <div class="in ha-grade">
    <div class="ha-txt">
      <p class="carimbo">Pioneira em quadriciclo no RS · desde 2007</p>
      <h1>Acima das nuvens da Serra Gaúcha, de quadriciclo.</h1>
      <p class="ha-sub">Trilhas de terra e off road até os mirantes dos morros Pelado, Dedão e Queimado, em Canela. Mais de 60 mil aventureiros já subiram com a gente.</p>
      <p class="acoes"><a class="btn btn-vermelho" href="${wa()}" ${ext}>${icWa()}Agende pelo Whats</a><a class="btn btn-claro" href="${link(v, 'passeios')}">Ver os 5 passeios</a></p>
    </div>
    <figure class="moldura ha-acao">${imgTopo('trilha-lama', 'Quadriciclo atravessando poça de lama na mata de Canela')}${img('mancha', '', ' class="ha-mancha" aria-hidden="true"')}</figure>
  </div>
</section>
<section class="faixa-premios"><div class="in fp-grade">
  <p class="fp-frase">Empresa pioneira em passeios de quadriciclo do Rio Grande do Sul. <b>Mais de 60 mil clientes atendidos.</b></p>
  ${selos()}
  ${falamos()}
</div></section>

<section class="sec papel"><div class="in">
  <div class="sec-cab sobe">${etiqueta('Nossos passeios')}<h2>Escolha o seu morro</h2><p>Do primeiro passeio de 7 km ao trajeto técnico de 25 km com off road. Saídas de terça a domingo.</p></div>
  <div class="bilhetes">${P.map((p, i) => passeioBilhete(v, p, i)).join('')}</div>
  <p class="nota-desconto">${jc('dinheiro')}Desconto de 5% no pagamento em espécie</p>
</div></section>

<section class="sec sec-trilha"><div class="in">
  <div class="sec-cab sobe">${etiqueta('Como funciona')}<h2>Da base da Apoema ao topo do morro</h2></div>
  ${etapas()}
</div></section>

${blocoSeguranca(v)}

<section class="sec papel galeria-chamada"><div class="in">
  <div class="sec-cab sobe">${etiqueta('Galeria')}<h2>Lama, mata de pinheiros e pôr do sol</h2></div>
  ${tiraFotos()}
  <p class="centro"><a class="link-seta" href="${link(v, 'galeria')}">Ver a galeria completa ${ic('seta')}</a></p>
</div></section>

${blocoVideo()}

<section class="sec papel"><div class="in duas onde">
  <figure class="moldura sobe">${img('mapa-acesso', 'Mapa do caminho do centro de Canela até a Apoema')}</figure>
  <div class="sobe">${etiqueta('Nosso endereço')}<h2>3 minutos do centro de Canela</h2>
    <p>${E.end}, ${E.bairro}, ${E.ref}. Estacionamento fácil e Wi-Fi gratuito.</p>
    <p><a class="link-seta" href="${link(v, 'onde-estamos')}">Como chegar ${ic('seta')}</a></p></div>
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Apoema Turismo de Aventura: passeios de quadriciclo em Canela desde 2007. Trilhas, off road e pôr do sol nos morros da Serra Gaúcha.') + topo(v, 'index') + `
<section class="herob">
  <video class="hb-video" autoplay muted loop playsinline poster="/assets/img/video-capa.webp" aria-hidden="true"><source src="/assets/video/abertura.mp4" type="video/mp4"></video>
  <div class="in hb-in">
    <p class="carimbo">Canela · Serra Gaúcha · desde 2007</p>
    <h1>Apoema Turismo de Aventura</h1>
    <p class="hb-sub">Quadriciclos 4x4 pela mata de pinheiros, pelo barro e até os mirantes dos morros. A primeira empresa de passeios de quadriciclo do Rio Grande do Sul.</p>
    <p class="acoes"><a class="btn btn-vermelho" href="${wa()}" ${ext}>${icWa()}Agende seu passeio pelo Whats</a><a class="btn btn-claro" href="${link(v, 'passeios')}">Os passeios</a></p>
    <ul class="hb-numeros"><li><b>60 mil+</b><span>clientes atendidos</span></li><li><b>5</b><span>trajetos de 7 a 25 km</span></li><li><b>4x</b><span>Travellers' Choice</span></li></ul>
  </div>
</section>

<section class="sec papel"><div class="in mapa-passeios">
  <div class="mp-mapa sobe">
    <figure class="moldura">${img('mapa-trilha', 'Mapa de satélite com o trajeto dos passeios até os morros')}</figure>
    ${img('mancha', '', ' class="mp-mancha" aria-hidden="true"')}
  </div>
  <div class="mp-lista">
    <div class="sec-cab sobe">${etiqueta('Nossos trajetos')}<h2>Cinco caminhos até o topo</h2></div>
    <ol class="ficha-lista">${P.map((p, i) => `<li class="sobe"><a href="${link(v, 'passeios')}#${p.id}">
      <span class="fl-n">${i + 1}</span>
      <span class="fl-nome">${p.nome}${p.novo ? ' <em class="pilula">Novidade</em>' : ''}<small>${dificuldade(p)} · ${p.dur}</small></span>
      <span class="fl-km"><b>${p.km}</b>km</span>
      <span class="fl-preco">${real(p.ind)}</span></a></li>`).join('')}</ol>
    <p class="nota-desconto sobe">${jc('dinheiro')}Desconto de 5% no pagamento em espécie</p>
  </div>
</div></section>

<section class="sec sec-mosaico"><div class="in mosaico">
  <figure class="mo-a moldura sobe">${img('farois-floresta', 'Quadriciclos com faróis acesos na mata de pinheiros')}</figure>
  <div class="mo-txt sobe">${etiqueta('A experiência')}<h2>Barro, mata e vista para os vales de Canela e Gramado</h2>
    <p>Saindo da nossa base, em frente ao Parque das Sequoias, você pilota pelas estradas de terra do interior do município até os mirantes. No fim da tarde, o passeio do pôr do sol volta com a noite chegando.</p>
    ${selos('selos-claro')}</div>
  <figure class="mo-b moldura sobe">${img('por-do-sol', 'Pilotos de capacete verde vendo o pôr do sol no morro')}</figure>
  <figure class="mo-c moldura sobe">${img('galeria-05', 'Balanço no alto do morro com vista para o vale')}</figure>
</div></section>

<section class="sec sec-trilha"><div class="in">
  <div class="sec-cab sobe">${etiqueta('Antes da largada')}<h2>Seu passeio, passo a passo</h2></div>
  ${etapas()}
</div></section>

${blocoSeguranca(v)}
${blocoVideo('Assista')}

<section class="sec papel"><div class="in duas onde">
  <div class="sobe">${etiqueta('Idiomas')}<h2>Atendemos em português, alemão e inglês</h2><p>Recebemos visitantes de todo o mundo na Serra Gaúcha. ${E.end}, ${E.ref}, a 3 minutos do centro de Canela.</p>${falamos()}
  <p><a class="link-seta" href="${link(v, 'onde-estamos')}">Como chegar ${ic('seta')}</a></p></div>
  <figure class="moldura sobe">${img('grupo-arvore', 'Grupo de quadriciclos sob a árvore no mirante')}</figure>
</div></section>
` + chamada(v) + rodape(v);
}

const cabPagina = (v, titulo, sub, foto, alt) => `<section class="pg-cab">
  <div class="pc-foto">${imgTopo(foto, alt)}</div>
  <div class="in pc-in">${etiqueta(titulo)}<h1>${sub}</h1></div>
</section>`;

function passeios(v) {
  return head(v, 'passeios', 'Os passeios de quadriciclo', 'Os 5 passeios de quadriciclo da Apoema em Canela: Morro Pelado, Pelado e Dedão, 3 Morros com off road, Pôr do Sol e 25 km. Valores, duração e o que está incluso.') + topo(v, 'passeios') +
    cabPagina(v, 'Nossos trajetos', 'Os passeios de quadriciclo', 'mar-de-nuvens', 'Quadriciclos na mata de Canela') + `
<section class="sec papel"><div class="in">
  <div class="aviso-topo sobe"><a class="btn btn-vermelho" href="${wa()}" ${ext}>${icWa()}Agende seu passeio pelo Whats</a><p class="pilula pilula-g">5% de desconto em espécie</p></div>
  <div class="incluso sobe"><h2>Incluso em todos os passeios</h2><ul>${INCLUSO.map(([i, t]) => `<li>${jc(i)}<span>${t}</span></li>`).join('')}</ul></div>
  ${P.map((p, i) => `<article class="passeio sobe" id="${p.id}">
    ${moldura(p.foto, `${p.titulo}`, 'ps-foto')}
    <div class="ps-txt">
      <p class="ps-n">${p.novo ? '<span class="pilula">Novidade exclusiva da Apoema</span>' : `Passeio ${String(i + 1).padStart(2, '0')}`}</p>
      <h2>${p.titulo}</h2>
      <p>Saindo da nossa base de atendimento, você sente a emoção de pilotar um quadriciclo pelas estradas de terra do interior do município${p.id === 'por-do-sol' ? ' ao entardecer' : ''}.</p>
      <p><b>Objetivo do passeio:</b> ${p.obj}</p>
      <dl class="ficha">
        <div><dt>Dificuldade</dt><dd>${dificuldade(p)}</dd></div>
        <div><dt>Duração</dt><dd>${p.dur}</dd></div>
        <div><dt>Trajeto</dt><dd>${p.km} km ida e volta</dd></div>
        <div><dt>Saídas</dt><dd>De terça a domingo</dd></div>
      </dl>
      <p class="ps-pilotos">${jc('monitor')}<span><b>Pilotos:</b> ${p.pilotos}</span></p>
    </div>
    <div class="ps-valores">
      <h3>Valores</h3>
      <p><span>Quadriciclo individual<small>1 pessoa por quadri</small></span><b>${real(p.ind)}</b></p>
      <p><span>Quadriciclo duplo<small>2 pessoas por quadri</small></span><b>${real(p.dup)}</b></p>
      <a class="btn btn-vermelho" href="${wa(`Olá! Quero agendar o ${p.titulo} (${p.km} km).`)}" ${ext}>${icWa()}Agendar este passeio</a>
    </div>
  </article>`).join('')}
  <p class="nota-final sobe">Todos os pilotos recebem as instruções do equipamento, passam por uma pista de teste antes de sair e assinam o termo de responsabilidade. Quer um roteiro diferente? <a href="${wa('Olá! Quero montar um passeio sob medida.')}" ${ext}>Fale com a gente</a> e montamos conforme seu interesse e experiência.</p>
</div></section>
` + chamada(v) + rodape(v);
}

function galeria(v) {
  const fotos = [...GAL, 'dois-quadris', 'quadri-mirante', 'pinheiral', 'casal-pb', 'mata-pb', 'grupo-mirante', 'off-road-mata', 'logo-quadri'];
  return head(v, 'galeria', 'Galeria', 'Fotos e vídeo dos passeios de quadriciclo da Apoema em Canela: trilhas na mata, lama, balanço no morro e pôr do sol.') + topo(v, 'galeria') +
    cabPagina(v, 'Galeria', 'Confira nossas aventuras', 'farois-floresta', 'Quadriciclos com faróis acesos na mata') + `
<section class="sec papel"><div class="in">
  <div class="mural">${fotos.map(n => `<a href="/assets/img/${n}.webp" data-foto="${altGal}" class="sobe">${img(n, altGal)}</a>`).join('')}</div>
</div></section>
${blocoVideo()}
` + chamada(v) + rodape(v);
}

function ondeEstamos(v) {
  const q = encodeURIComponent('Apoema Quadriciclos, Rua Godofredo Raymundo 1740, Canela RS');
  return head(v, 'onde-estamos', 'Nosso endereço', 'Apoema em Canela: Rua Godofredo Raymundo, 1740, em frente ao Parque das Sequoias, a 3 minutos do centro. Estacionamento fácil e Wi-Fi gratuito.') + topo(v, 'onde-estamos') +
    cabPagina(v, 'Onde estamos', '3 minutos do centro de Canela', 'panorama-2', 'Vista dos vales da Serra Gaúcha') + `
<section class="sec papel"><div class="in duas onde-grade">
  <div class="sobe">
    <p>Situados em local estratégico para o operacional dos passeios de quadriciclo, a Apoema tem acesso fácil para quem vem do centro de Canela.</p>
    <address class="endereco">${ic('pin')}<span><b>${E.end}</b><br>${E.bairro}, ${E.ref}<br>${E.cidade}, ${E.cep}</span></address>
    <ul class="vantagens"><li>${jc('carro')}Estacionamento fácil</li><li>${jc('wifi')}Wi-Fi gratuito</li><li>${ic('relogio')}3 min do centro</li></ul>
    <p><a class="btn btn-vermelho" href="https://www.google.com/maps/dir/?api=1&destination=${q}" ${ext}>${ic('pin')}Abrir rota no Google Maps</a></p>
  </div>
  <iframe class="mapa moldura-mapa sobe" title="Mapa da Apoema em Canela" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe>
</div></section>
<section class="sec sec-trilha"><div class="in duas">
  <figure class="moldura sobe">${img('mapa-acesso', 'Caminho do centro de Canela até a Apoema, passando pelo Parque do Lago')}</figure>
  <div class="sobe">${etiqueta('Como chegar')}<h2>Da Igreja de Pedra até a Apoema</h2>
    <ol class="rota"><li>No centro de Canela, em frente à Igreja de Pedra, siga reto por trás da igreja.</li><li>Antes do Parque do Lago, vire à direita.</li><li>Siga reto até o final da rua. Ficamos à direita, em frente ao Parque das Sequoias.</li></ol></div>
</div></section>
` + chamada(v) + rodape(v);
}

const POL = [
  'Priorizar a segurança das pessoas envolvidas nas atividades de turismo de aventura, buscando prevenir acidentes, incidentes e situações que possam causar danos às pessoas, ao patrimônio e ao meio ambiente.',
  'Identificar perigos, avaliar e tratar os riscos relacionados às atividades, considerando as características dos percursos, equipamentos, condições ambientais, comportamento dos participantes e demais fatores que possam interferir na segurança.',
  'Cumprir os requisitos legais, regulamentares e outros requisitos aplicáveis às suas atividades, bem como os requisitos estabelecidos para o Sistema de Gestão da Segurança.',
  'Manter e aprimorar continuamente o Sistema de Gestão da Segurança, buscando a melhoria de seus processos, procedimentos e controles operacionais.',
  'Disponibilizar e manter os recursos necessários para a realização segura das atividades, incluindo equipamentos adequados, manutenção, infraestrutura, informações, capacitação e orientação das pessoas envolvidas.',
  'Assegurar que os participantes recebam informações e orientações adequadas sobre as características da atividade, seus riscos, regras de segurança e condutas esperadas durante os passeios.',
  'Garantir que as atividades sejam conduzidas por pessoas competentes e devidamente orientadas para o desempenho de suas funções relacionadas à segurança.',
  'Estabelecer e manter procedimentos para preparação e resposta a situações de emergência, buscando minimizar suas consequências.',
  'Incentivar a comunicação de perigos, incidentes, não conformidades e oportunidades de melhoria, utilizando essas informações para o aperfeiçoamento do Sistema de Gestão da Segurança.',
  'Considerar as condições dos locais onde as atividades são realizadas e as condições de propriedades de terceiros que possam interferir na segurança, adotando medidas compatíveis com a capacidade de influência e controle da Apoema.',
  'Promover uma cultura de segurança baseada na responsabilidade, prevenção, comunicação e participação das pessoas envolvidas nas atividades.',
];
function quemSomos(v) {
  return head(v, 'quem-somos', 'Quem somos', 'Apoema Turismo de Aventura, em Canela/RS: turismo de aventura desde 2004 e passeios de quadriciclo diurnos e de pôr do sol. Política de segurança e Cadastur.') + topo(v, 'quem-somos') +
    cabPagina(v, 'Sobre nós', 'Apoema Turismo de Aventura', 'grupo-campo', 'Grupo de pilotos com quadriciclos no campo') + `
<section class="sec papel"><div class="in duas sobre">
  <div class="sobe">
    <p class="lead">Localizada em Canela, no Rio Grande do Sul, a Apoema tem como objetivo mostrar a identidade de um lugar único: a Serra Gaúcha e seu entorno.</p>
    <p>Atuando desde 2004, a Apoema Turismo de Aventura oferece a seus clientes a oportunidade de descobrir lugares de exuberantes belezas naturais, que permitem a integração do homem com a natureza.</p>
    <h2>Operamos com</h2>
    <ul class="produtos"><li>${jc('quad')}<a href="${link(v, 'passeios')}">Passeios de quadriciclo diurnos</a></li><li>${ic('sol')}<a href="${link(v, 'passeios')}#por-do-sol">Passeios de quadriciclo para o pôr do sol</a></li></ul>
    <address class="endereco">${ic('pin')}<span><b>Endereço da empresa e base operacional</b><br>${E.end}, Bairro Vila do Cedro, Canela/RS, ${E.cep}<br>Ponto de referência: em frente ao Parque das Sequoias<br>Tel/Whats ${E.fone}</span></address>
  </div>
  <div class="sobre-fotos sobe">${moldura('piloto-mirante', 'Piloto no quadriciclo com vista para o vale', 'sf-a')}${moldura('casal-pb', 'Casal no quadriciclo na mata, em preto e branco', 'sf-b')}</div>
</div></section>
<section class="sec sec-trilha" id="seguranca"><div class="in">
  <div class="sec-cab sobe">${etiqueta('Política de segurança')}<h2>A segurança é responsabilidade de todos</h2>
  <p>A Apoema Ecoturismo Ltda., atuando na prestação de serviços de turismo de aventura com passeios guiados de quadriciclo, reconhece a segurança de seus clientes, colaboradores, prestadores de serviços e demais pessoas envolvidas em suas atividades como um princípio fundamental de sua atuação. Para isso, estabelece como compromissos:</p></div>
  <ol class="politica">${POL.map(t => `<li class="sobe">${t}</li>`).join('')}</ol>
  <p class="pol-fim sobe">A direção da Apoema Ecoturismo Ltda. compromete-se a comunicar esta Política de Segurança às pessoas que trabalham ou atuam em seu nome, disponibilizá-la às partes interessadas pertinentes e revisá-la periodicamente. A segurança é responsabilidade de todos e constitui parte essencial da qualidade dos serviços prestados pela Apoema.</p>
</div></section>
<section class="sec papel"><div class="in certs">
  <figure class="doc sobe">${img('cadastur', 'Certificado Cadastur: Agência de Turismo, Apoema Ecoturismo Ltda., CNPJ 07.318.065/0001-29')}</figure>
  <figure class="doc sobe">${img('transul', 'Transul Emergências Médicas: fique tranquilo, você está protegido')}</figure>
  <div class="sobe">${falamos()}${selos()}</div>
</div></section>
` + chamada(v) + rodape(v);
}

function contato(v) {
  return head(v, 'contato', 'Fale conosco', 'Fale com a Apoema: Tel/Whats (54) 98137-4994, aventura@apoema.tur.br. Rua Godofredo Raymundo, 1740, Canela/RS.') + topo(v, 'contato') +
    cabPagina(v, 'Contato', 'Fale conosco', 'silhueta-por-do-sol', 'Silhueta de pilotos no pôr do sol') + `
<section class="sec papel"><div class="in contato-grade">
  <div class="ct-dados sobe">
    <h2>Apoema Turismo de Aventura</h2>
    <ul>
      <li>${icWa()}<span><b>Tel / Whats</b><a href="${wa()}" ${ext}>${E.fone}</a></span></li>
      <li>${ic('mail')}<span><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></span></li>
      <li>${ic('insta')}<span><b>Instagram</b><a href="${E.insta}" ${ext}>${E.instaTxt}</a></span></li>
      <li>${ic('face')}<span><b>Facebook</b><a href="${E.face}" ${ext}>Apoemaecoturismo</a></span></li>
      <li>${ic('pin')}<span><b>Endereço</b>${E.end}, ${E.bairro}<br>${E.cidade}, ${E.cep}</span></li>
    </ul>
    ${img('botas', '', ' class="ct-botas" aria-hidden="true"')}
  </div>
  <form class="form ct-form sobe" data-wa="Olá! Vim pelo site da Apoema.">
    <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
    <div class="form-duas"><label>Passeio<select name="passeio"><option>Ainda não sei</option>${P.map(p => `<option>${p.titulo}</option>`).join('')}</select></label><label>Data desejada<input name="data" type="date"></label></div>
    <label>Mensagem *<textarea name="mensagem" rows="5" required placeholder="Quantas pessoas, quantos quadriciclos, dúvidas..."></textarea></label>
    <button class="btn btn-vermelho" type="submit">${icWa()}Enviar pelo WhatsApp</button>
    <p class="form-nota">A mensagem abre no WhatsApp da Apoema, já preenchida.</p>
  </form>
</div></section>
` + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), passeios: passeios(v), galeria: galeria(v), 'onde-estamos': ondeEstamos(v), 'quem-somos': quemSomos(v), contato: contato(v) });

copiarSiteJs(pub, WA);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Apoema', artigo: 'da', url: E.url, lang: 'pt', cor: '#d92b2b', fundo: '#2a1d16', claro: '#f4ecd6',
  fonteTitulo: "'Chelsea Market',system-ui,sans-serif", fonteTexto: "'Archivo',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Papel envelhecido, mar de nuvens na abertura e os 5 passeios como bilhetes de trilha, com moldura rasgada nas fotos.', pontos: ['Estética do site atual', 'Valores de cada passeio', 'Agendamento pelo Whats'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Abre com o vídeo do passeio na mata de pinheiros e mostra os trajetos sobre o mapa da trilha.', pontos: ['Vídeo na abertura', 'Mapa dos trajetos', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
