// Arte Car | Martelinho de Ouro (Fátima, Fortaleza/CE). Gera public/{a,b}/ e a página de escolha.
// node clientes/artecar/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs artecar http://www.martelinhodeourofortaleza.com.br/)
// Textos, fotos, vídeos e contatos tirados do site atual (martelinhodeourofortaleza.com.br). Logo redesenhado em vetor a partir do PNG do topo.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Arte Car | Martelinho de Ouro', curto: 'Arte Car', url: 'https://artecar.overtus.com.br/', antigo: 'http://www.martelinhodeourofortaleza.com.br/',
  fone: '(85) 3257-7757', waNum: '558532577757', email: 'martelinhodeourofortaleza@gmail.com',
  rua: 'Av. Treze de Maio, 47', bairro: 'Fátima', cidade: 'Fortaleza/CE',
  insta: 'https://www.instagram.com/artecarmartelinhodeouro/', face: 'https://www.facebook.com/artcarmartelinhodeouroo/', yt: 'https://www.youtube.com/channel/UC4CkboVszfIPs-UeDfGaVDg',
  sobre: 'Oficina especializada em funilaria e pintura, com mais de uma década de serviços prestados com excelência, rapidez e comprometimento. A empresa trabalha com todas as marcas de veículos nacionais e importados e garante resultados de alto padrão estético, com respeito absoluto às características originais do carro de cada cliente.',
  foco: 'Somos uma empresa focada em funilaria, repintura automotiva e pintura em carros nacionais e internacionais.',
  dif: 'Somos uma oficina de martelinho de ouro, oferecendo toda a agilidade de um serviço de curto período de tempo, porém com um diferencial: a qualidade. Temos os melhores profissionais da área e trabalhamos com materiais e ferramentas de qualidade, para melhor satisfação dos nossos clientes.',
  cred: 'Todos os serviços são direcionados para que os nossos clientes tenham maior segurança e confiança no atendimento.',
};
const servicos = [
  { id: 'martelinho', t: 'Martelinho de ouro', f: 'paralama', curto: 'Desamassa a lataria à mão, preservando a pintura original.',
    txt: ['O processo é feito artesanalmente, com ferramentas especialmente confeccionadas para funilaria, capazes de suavizar a pressão no momento do conserto, quando a parte interna da lataria volta ao estado natural.', 'Está precisando de um martelinho de ouro? Traga o carro e descubra se essa técnica é a melhor opção para o reparo do seu veículo.'],
    itens: ['Paralama', 'Capô', 'Porta'] },
  { id: 'funilaria', t: 'Funilaria em geral', f: 'mustang-luz', curto: 'Reforma, restauração e preservação da lataria.',
    txt: ['Serviços de reforma, restauração e preservação tanto das características estéticas quanto da estrutura do seu automóvel, com profissionais equipados e experientes.', 'Para carros de diversas marcas e modelos, com agilidade na entrega e preço justo.'] },
  { id: 'pintura', t: 'Pintura em geral', f: 'mustang-tras', curto: 'Repintura completa ou de peças, com acabamento cuidadoso.',
    txt: ['Pintura automotiva completa e agilizada. A pintura de automóveis precisa ser feita em ambiente livre de poeira para um bom acabamento.', 'Referência como oficina de funilaria e pintura, a Arte Car é o lugar para você confiar as chaves do seu veículo.'] },
  { id: 'parachoques', t: 'Recuperação de parachoques', f: 'camry-mesa', curto: 'O parachoque volta sem amassados nem marcas de batida.',
    txt: ['A funilaria para parachoque devolve à peça uma aparência agradável e livre de amassados ou danos causados por batidas.', 'Para um trabalho completo, é fundamental contar com profissionais especializados no ramo.'] },
  { id: 'farois', t: 'Espelhamento de faróis', f: null, curto: 'Faróis com brilho e transparência de volta.', txt: ['Recuperação do brilho e da transparência dos faróis.'] },
  { id: 'polimentos', t: 'Polimentos especiais', f: null, curto: 'Polimento automotivo para devolver o brilho da pintura.', txt: ['Polimento automotivo para devolver o brilho e a uniformidade da pintura.'] },
];
const fotos = {
  tecnico: 'Martelinho de ouro na tampa traseira de um Camry', lexus: 'Reparo com luz de inspeção em um SUV prata', 'mustang-luz': 'Desamassando a lateral de um Mustang',
  'mustang-tras': 'Mustang pronto, sem marcas na lateral', paralama: 'Ferramentas de martelinho no paralama', ventosa: 'Reparo por tração com cola, sob a luz de inspeção',
  'camry-mesa': 'Reparo na traseira de um Camry', fachada: 'A fachada da Arte Car na Av. Treze de Maio',
};
const pares = [
  { a: 'porta-antes', d: 'porta-depois', t: 'Porta traseira', s: 'Amassado com vinco perto da maçaneta' },
  { a: 'porta2-antes', d: 'porta2-depois', t: 'Porta dianteira', s: 'Amassado na linha da porta' },
  { a: 'porta3-antes', d: 'porta3-depois', t: 'Porta', s: 'Amassado grande no meio da porta' },
  { a: 'paralama-antes', d: 'paralama-depois', t: 'Paralama', s: 'Amassado acima da roda' },
];
const videos = [
  { id: 'A4IAaOtcY3Q', t: 'Martelinho de Ouro' },
  { id: 'G4nDOqIGw1c', t: 'Funilaria e pintura de veículos' },
  { id: 'wrsF7Ds7T8c', t: 'Martelinho de Ouro Fortaleza' },
];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'sobre', nome: 'Sobre nós' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'antes-e-depois', nome: 'Antes e depois' }, { slug: 'videos', nome: 'Vídeos' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Luz de inspeção', b: 'Ouro sobre preto' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Economica:wght@400;700&family=Karla:wght@400;500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Figtree:wght@400;500;600&display=swap';
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#17171a', b: '#0c0c0b' };
const tel = telHref(E.fone);
const wa = waHref(E.waNum, 'Olá! Vim pelo site da Arte Car e gostaria de solicitar um orçamento.');
const mapsQ = encodeURIComponent('Av. Treze de Maio, 47, Fátima, Fortaleza CE');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n] || '')}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const par = (p, cls = 'par') => `<figure class="${cls} sobe"><div class="par-fotos"><a href="/assets/img/${p.a}.webp" data-foto="${esc(p.t)}: antes"><img src="/assets/img/${p.a}.webp" alt="${esc(p.t)} antes do reparo: ${esc(p.s.toLowerCase())}" loading="lazy"><span class="selo">Antes</span></a><a href="/assets/img/${p.d}.webp" data-foto="${esc(p.t)}: depois"><img src="/assets/img/${p.d}.webp" alt="${esc(p.t)} depois do martelinho de ouro" loading="lazy"><span class="selo selo-d">Depois</span></a></div><figcaption><b>${p.t}</b> ${p.s}</figcaption></figure>`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Arte Car | Martelinho de Ouro, funilaria e pintura em Fortaleza' : `${titulo} | ${E.curto}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const redes = () => `<p class="redes"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" ${ext} aria-label="YouTube">${ic('yt')}</a></p>`;

const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site da Arte Car.">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label></div>
  <label>Carro (modelo e cor)<input name="carro" required placeholder="Ex.: Onix prata"></label>
  <label>Serviço<select name="servico">${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Outro</option></select></label>
  <label>Onde está o amassado ou o dano?<textarea name="mensagem" rows="4" placeholder="Porta traseira direita, paralama, capô..."></textarea></label>
  <button class="btn" type="submit">${icWa()}Pedir orçamento pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp da Arte Car com a mensagem pronta. Se puder, mande uma foto do amassado na conversa.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>Telefone e WhatsApp</strong><a href="${wa}" ${ext}>${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Arte Car na Av. Treze de Maio, 47" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const scriptVideo = `<script>document.querySelectorAll('[data-yt]').forEach(b=>b.addEventListener('click',()=>{const f=document.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+b.dataset.yt+'?autoplay=1';f.title=b.dataset.t;f.allow='autoplay; encrypted-media; picture-in-picture';f.allowFullscreen=true;b.replaceWith(f)}))</script>`;
const blocoVideos = (n = 3) => `<div class="videos${n === 1 ? ' videos-1' : ''}">${videos.slice(0, n).map(x => `<figure class="video sobe"><button class="video-play" data-yt="${x.id}" data-t="${esc(x.t)}" aria-label="Assistir: ${esc(x.t)}"><img src="/assets/img/yt-${x.id}.webp" alt="" loading="lazy"><span class="play"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5.5v13l11-6.5z"/></svg></span></button><figcaption>${x.t}</figcaption></figure>`).join('')}</div>`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Arte Car, página inicial"><img src="/assets/${v === 'a' ? 'logo' : 'logo-claro'}.webp" alt="Arte Car" width="800" height="315"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa}" ${ext}>${icWa()}<span>Orçamento</span></a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v, extra = '') {
  return `</main>
<footer class="rodape">${v === 'a' ? '<div class="listras" aria-hidden="true"></div>' : ''}
  <div class="in rod-grade">
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Arte Car" width="800" height="315" loading="lazy"><p>Martelinho de ouro, funilaria e pintura no bairro de Fátima, em Fortaleza. Carros nacionais e importados.</p>${redes()}</div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa}" ${ext}>${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Arte Car | Martelinho de Ouro. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa}" ${ext} aria-label="Conversar no WhatsApp">${icWa()}</a>
${extra}</body>
</html>
`;
}

function comum(v, pag, cab) {
  pag.sobre = head(v, 'sobre', 'Sobre nós', E.sobre) + topo(v, 'sobre') + cab('Sobre nós', 'Martelinho de ouro com o cuidado de uma oficina de funilaria', 'tecnico') + `
<div class="in">
<section class="sobre-txt"><p class="lead">${E.sobre}</p><p>${E.dif}</p></section>
<section class="sobre-pontos">
  <div class="sobe"><b>Mais de uma década</b><span>de serviços prestados em Fortaleza</span></div>
  <div class="sobe"><b>Todas as marcas</b><span>nacionais e importadas</span></div>
  <div class="sobe"><b>Original preservado</b><span>respeito às características de fábrica do carro</span></div>
</section>
<section class="sobre-fotos">${['fachada', 'ventosa', 'lexus'].map(f => `<figure class="sobe">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<section class="faixa-cta"><div><h2>Credibilidade</h2><p>${E.cred}</p></div><p class="bts"><a class="btn" href="${wa}" ${ext}>${icWa()}Falar com a Arte Car</a><a class="btn btn-linha" href="${link(v, 'antes-e-depois')}">Ver antes e depois</a></p></section>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Martelinho de ouro, funilaria, pintura, recuperação de parachoques, espelhamento de faróis e polimentos em Fortaleza.') + topo(v, 'servicos') + cab('Serviços', 'Do amassado pequeno à pintura completa', 'mustang-luz') + `
<div class="in">
<nav class="serv-indice" aria-label="Serviços">${servicos.map((s, i) => `<a href="#${s.id}"><span>${String(i + 1).padStart(2, '0')}</span>${s.t}</a>`).join('')}</nav>
<section class="serv-lista">${servicos.map((s, i) => `<article class="serv${s.f ? '' : ' serv-curto'} sobe" id="${s.id}"><div class="serv-txt"><p class="k">${String(i + 1).padStart(2, '0')}</p><h2>${s.t}</h2>${s.txt.map(t => `<p>${t}</p>`).join('')}${s.itens ? `<ul class="chips">${s.itens.map(x => `<li>Desamassar ${x.toLowerCase()}</li>`).join('')}</ul>` : ''}</div>${s.f ? foto(s.f, 'serv-foto') : ''}</article>`).join('')}</section>
<p class="cta-linha"><a class="btn" href="${wa}" ${ext}>${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${tel}">${ic('tel')}${E.fone}</a></p>
</div>
` + rodape(v);
  pag['antes-e-depois'] = head(v, 'antes-e-depois', 'Antes e depois', 'Fotos de antes e depois de reparos com martelinho de ouro feitos pela Arte Car em Fortaleza.') + topo(v, 'antes-e-depois') + cab('Antes e depois', 'O amassado sai, a pintura fica', 'paralama') + `
<div class="in">
<p class="intro">Reparos com martelinho de ouro publicados pela Arte Car. Clique nas fotos para ver maior.</p>
<section class="pares">${pares.map(p => par(p)).join('')}</section>
<section class="faixa-cta"><div><h2>Tem um amassado parecido?</h2><p>Mande uma foto pelo WhatsApp e a Arte Car diz se dá para resolver com martelinho de ouro.</p></div><p class="bts"><a class="btn" href="${wa}" ${ext}>${icWa()}Enviar foto</a></p></section>
</div>
` + rodape(v);
  pag.videos = head(v, 'videos', 'Vídeos', 'Vídeos da Arte Car: martelinho de ouro, funilaria e pintura em Fortaleza.') + topo(v, 'videos') + cab('Vídeos', 'A técnica em movimento', 'ventosa') + `
<div class="in">
<p class="intro">Vídeos do canal da Arte Car no YouTube. O vídeo só carrega quando você clica.</p>
${blocoVideos()}
<p class="cta-linha"><a class="btn btn-linha" href="${E.yt}" ${ext}>${ic('yt')}Ver o canal no YouTube</a><a class="btn btn-linha" href="${E.insta}" ${ext}>${ic('insta')}Instagram</a></p>
</div>
` + rodape(v, scriptVideo);
  pag.contato = head(v, 'contato', 'Contato', `Arte Car: ${E.rua}, ${E.bairro}, Fortaleza. Telefone e WhatsApp ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Orçamento pelo WhatsApp', 'fachada') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Conte o que aconteceu com o carro</h2><p>Diga o modelo e onde está o dano. A resposta vem pelo WhatsApp.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame}${redes()}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(f, ' loading="eager"')}</figure></div><div class="listras" aria-hidden="true"></div></section>`;
  pag.index = head(v, 'index', '', 'Martelinho de ouro, funilaria e pintura no bairro de Fátima, em Fortaleza. Carros nacionais e importados. Telefone e WhatsApp (85) 3257-7757.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Fátima · Fortaleza</p><h1>Martelinho de ouro, funilaria e pintura</h1><p>Amassados desfeitos à mão, com ferramentas feitas para funilaria, preservando as características originais do carro. Para todas as marcas, nacionais e importadas.</p>
  <p class="bts"><a class="btn" href="${wa}" ${ext}>${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'antes-e-depois')}">Ver antes e depois</a></p></div>
  <figure class="hero-a-foto">${foto('tecnico')}<figcaption>${fotos.tecnico}</figcaption></figure>
</div><div class="listras listras-dente" aria-hidden="true"></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>Da lataria ao brilho dos faróis</h2></header>
<ol class="servs-a-lista">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${s.t}</span><span class="d">${s.curto}</span>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="ad-a"><div class="in"><header class="tit"><p class="k">Antes e depois</p><h2>Sob a luz, o amassado aparece. Depois, some.</h2></header><div class="ad-a-grade">${par(pares[0], 'par par-g')}${par(pares[3])}</div><a class="link-seta" href="${link(v, 'antes-e-depois')}">Ver todos os reparos ${ic('seta')}</a></div></section>
<section class="in sobre-a"><div class="sobre-a-foto">${foto('lexus')}</div><div><p class="k">Arte Car</p><h2>Mais de uma década de funilaria e pintura em Fortaleza</h2><p>${E.foco}</p><p>${E.dif}</p><a class="link-seta" href="${link(v, 'sobre')}">Sobre a Arte Car ${ic('seta')}</a></div></section>
<section class="video-a"><div class="in video-a-in"><div><p class="k">Vídeos</p><h2>Veja a técnica sendo feita</h2><p>Os vídeos da oficina mostram o martelinho de ouro do começo ao fim.</p><a class="link-seta" href="${link(v, 'videos')}">Todos os vídeos ${ic('seta')}</a></div>${blocoVideos(1)}</div></section>
<section class="in cta-a"><div><h2>Amassou? Mande uma foto.</h2><p>${E.rua}, bairro de Fátima, Fortaleza. Telefone e WhatsApp ${E.fone}.</p></div><p class="bts"><a class="btn" href="${wa}" ${ext}>${icWa()}WhatsApp</a><a class="btn btn-linha" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a></p></section>
` + rodape(v, scriptVideo);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b">${img(f, ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', 'Martelinho de ouro, funilaria e pintura no bairro de Fátima, em Fortaleza. Carros nacionais e importados. Telefone e WhatsApp (85) 3257-7757.') + topo(v, 'index') + `
<section class="hero-b">${img('tecnico', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in">
  <img class="martelos" src="/assets/martelos.webp" alt="" width="182" height="148">
  <p class="k">Martelinho de ouro · Fortaleza</p><h1>O amassado sai.<br><em>O original fica.</em></h1><p>Funilaria, pintura e martelinho de ouro com respeito às características originais de cada carro. Nacionais e importados.</p>
  <p class="bts"><a class="btn" href="${wa}" ${ext}>${icWa()}${E.fone}</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div></section>
<section class="servs-b"><div class="in"><header class="tit"><p class="k">Serviços</p><h2>O que a Arte Car faz</h2></header><div class="servs-b-grade">${servicos.map((s, i) => `<a class="serv-b sobe${s.f ? ' com-foto' : ''}" href="${link(v, 'servicos')}#${s.id}">${s.f ? img(s.f) : ''}<span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${s.t}</h3><p>${s.curto}</p></a>`).join('')}</div></div></section>
<section class="in ad-b"><div class="ad-b-txt"><p class="k">Antes e depois</p><h2>Amassados que somem</h2><p>Reparos de martelinho de ouro publicados pela oficina, em portas e paralamas.</p><a class="link-seta" href="${link(v, 'antes-e-depois')}">Mais reparos ${ic('seta')}</a></div><div class="ad-b-pares">${par(pares[1])}${par(pares[2])}</div></section>
<section class="citacao-b"><div class="in"><img src="/assets/martelos.webp" alt="" width="182" height="148" loading="lazy"><blockquote>“${E.dif.split(':')[0]}: a qualidade.”</blockquote><p class="assin">Arte Car | Martelinho de Ouro</p></div></section>
<section class="in fotos-b"><div class="fotos-b-grade">${foto('mustang-luz', 'f1')}${foto('ventosa', 'f2')}${foto('lexus', 'f3')}</div><div class="fotos-b-txt"><p class="k">A oficina</p><h2>${E.rua}, Fátima</h2><p>${E.sobre.split('. ')[0]}.</p><ul class="lista-check"><li>${ic('check')}<span>Todas as marcas, nacionais e importadas</span></li><li>${ic('check')}<span>Ferramentas feitas para funilaria</span></li><li>${ic('check')}<span>Orçamento pelo WhatsApp</span></li></ul><a class="link-seta" href="${link(v, 'sobre')}">Sobre a Arte Car ${ic('seta')}</a></div></section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>Mande a foto do amassado</h2><p>Telefone e WhatsApp ${E.fone} · ${E.email}</p></div><p class="bts"><a class="btn" href="${wa}" ${ext}>${icWa()}WhatsApp</a><a class="btn btn-linha" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.waNum);
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#d4b13f', fundo: '#0c0c0b', claro: '#f4f2ec',
  fonteTitulo: "'Bricolage Grotesque',system-ui,sans-serif", fonteTexto: "'Figtree',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, com as listras da luz de inspeção que o martelinho de ouro usa para achar o amassado. Abre com o técnico trabalhando e os seis serviços numerados.', pontos: ['Antes e depois em destaque na página inicial', 'Vídeos da oficina que só carregam ao clicar', 'Orçamento direto no WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Escura, em preto e dourado como o logo, com os martelos cruzados da marca. Abre na foto do técnico e na frase sobre manter o carro original.', pontos: ['"O amassado sai. O original fica."', 'Serviços com foto e antes e depois lado a lado', 'WhatsApp sempre à vista'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
