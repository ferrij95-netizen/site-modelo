// Piter Car, serviços automotivos premium (Av. Santos Dumont, 637, Joinville/SC). Gera public/{a,b}/ e a página de escolha.
// node clientes/pitercar/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs pitercar http://www.pitercar.com.br/)
// Textos tirados do site atual (pitercar.com.br: index, empresa, servicos, pecas, tunning, contato). Fotos: servicos/amplia/<n>.jpg do site atual, cortadas para tirar a data impressa.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Piter Car', curto: 'Piter Car', url: 'https://pitercar.overtus.com.br/', antigo: 'http://www.pitercar.com.br/',
  fone: '(47) 3026-6362', whats: '(47) 99665-6362', waNum: '5547996656362', email: 'pitercar@pitercar.com.br',
  rua: 'Av. Santos Dumont, 637', cidade: 'Joinville/SC', face: 'https://www.facebook.com/piter.car.5/',
};
const tel = telHref(E.fone);
const wa = waHref(E.waNum, 'Olá, Piter Car! Vim pelo site.');
const ext = 'target="_blank" rel="noopener"';
const mapsQ = encodeURIComponent('Av. Santos Dumont, 637, Joinville SC');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Piter Car na Av. Santos Dumont, 637, Joinville" loading="lazy" src="https://maps.google.com/maps?q=-26.267995,-48.852353&z=16&output=embed"></iframe>`;

// Serviços: textos do site atual. Os três grupos são nossos; "Divisão Tunning/DUB" é o nome usado pela Piter Car.
const grupos = [
  { id: 'reparos', t: 'Diagnóstico e reparos', d: 'Contamos com scanners e diversos softwares, com especialização em Audi, BMW e Mercedes. Atendemos todas as marcas.', itens: [
    ['Diagnóstico eletrônico', 'Contamos com scanners e diversos softwares, especializada Audi, BMW e Mercedes. Atendemos todas as marcas.'],
    ['Air bag', 'Diagnóstico e manutenção.'],
    ['Anti-ruído', 'Temos experiência na eliminação de todos os tipos de ruídos, internos e externos.'],
    ['Infiltrações', 'Localizamos e eliminamos quaisquer infiltrações, água, pó ou vento no interior do veículo.'],
    ['Conversíveis', 'Reparos e manutenção preventiva para capotas elétricas e manuais.'],
    ['Teto solar', 'Prevenção e manutenção de todos os tipos de teto solar, inclusive Sky Window Fiat.'],
    ['Painéis', 'Consertos, manutenção e restauração de molduras, teclas e comandos do painel.'],
  ] },
  { id: 'tunning', t: 'Divisão Tunning/DUB', d: 'Deixar seu automóvel diferenciado, mais seguro em curvas, com visual especial e com um pouco mais de performance global.', itens: [
    ['Escape esportivo', 'Design e fabricação própria, testado e aprovado em carros BMW, Audi, Lamborghini e outras. O melhor custo/benefício do Brasil.'],
    ['Chip de potência', 'Ganhos de até 40% no aumento do torque e potência, disponível para mais de 30 marcas e 1000 modelos de carros.'],
    ['Suspensões', 'Manutenção e desenvolvimento de suspensões de rosca, trabalhada e molas esportivas. Manutenção preventiva para modelos originais.'],
    ['Envelopamento', 'Total ou parcial, opções em fosco e brilho, detalhes em carbono e muitas outras alternativas.'],
    ['Rodas: pintura e reforma', 'Diversos acabamentos, serviços de 1ª qualidade.'],
    ['Pintura de cubo e pinça', 'Pintura em cores, logotipos, diversas opções para personalizar seu carro.'],
    ['Personalização', 'Consultoria e desenvolvimento de peças especiais, aplicação de diversos componentes para modificar seu carro, instalação de acessórios, entre outros.'],
  ] },
  { id: 'acabamento', t: 'Interior, estética e clássicos', d: 'Do couro dos bancos à restauração completa de um clássico.', itens: [
    ['Tapeçaria', 'Forrações de teto e de portas, consertos em bancos, volante em diversos materiais.'],
    ['Estética automotiva', 'Hidratação e higienização de bancos em couro, revitalização de pinturas.'],
    ['Restauração', 'Restauramos e conservamos veículos clássicos e antigos de todas as marcas.'],
  ] },
];
const empresa = [
  'Há mais de 20 anos no ramo de assistência e reparos automotivos, a Piter Car conquistou a lealdade e o respeito do mercado, através de serviços focados na excelência da execução e na melhor relação de benefícios aos seus clientes.',
  'Experiência e conhecimento juntos para o melhor tratamento do seu carro. Atendemos todas as marcas de automóveis, inclusive as dedicadas à construção de superesportivos e alto luxo.',
  'A consciência em oferecer o melhor custo/benefício, aliada à qualidade máxima em serviços de oficina automotiva, faz da Piter Car a melhor opção para toda a gama de marcas e tamanhos de automóveis.',
];
const premium = 'Especializada em autos importados e com atendimento diferenciado para todas as marcas nacionais.';
const pecas = 'Acordos e acessos às principais distribuidoras e atacados de peças automotivas no Brasil e no exterior fazem da Piter Car a sua melhor opção para a manutenção de automóveis com alto valor agregado. Se a sua necessidade é cuidar de seu auto 1.0 ou de um superesportivo, a Piter Car tem o conhecimento dos melhores caminhos, preços e da qualidade embarcada em peças.';
const tunning = 'Deixar seu automóvel diferenciado, mais seguro em curvas, com visual especial e com um pouco mais de performance global é o que a Divisão Tunning/DUB da Piter Car pode proporcionar para o seu sonho personalizado.';
const enzo = ['O carro é uma conquista de liberdade para o homem, e nenhum homem renega a própria liberdade.', 'Enzo Ferrari'];
const marcas = ['Fiat', 'Ford', 'Chevrolet', 'Volkswagen', 'Honda', 'Renault', 'Toyota', 'Peugeot', 'Audi', 'Mercedes-Benz', 'Porsche', 'BMW', 'Land Rover'];

const fotos = {
  z4: 'Dois BMW Z4 conversíveis em frente à Piter Car', boxster: 'Porsche Boxster branco em frente à oficina', mini: 'Mini Cooper vermelho em frente à oficina',
  duplo: 'Porsche Boxster e outros carros na frente da oficina', sedan: 'Sedã preto com rodas pretas de friso vermelho, em frente à oficina', stilo: 'Fiat Stilo preto em frente à oficina',
  'ford-antes': 'Restauração de um Ford antigo: a carroceria antes da pintura', 'ford-depois': 'O mesmo Ford, pintado em laranja metálico e rebaixado',
  chevette: 'Chevette vermelho de teto branco', e36: 'BMW Série 3 coupé azul, com rodas esportivas', vw: 'Volkswagen vermelho rebaixado, em frente à oficina',
  capota: 'Conversível com a estrutura da capota aberta, dentro da oficina', 'z4-prata': 'BMW Z4 prata sem o para-choque traseiro, durante um reparo', interior: 'Interior todo desmontado durante um serviço',
  painel: 'Painel de um BMW desmontado', airbag: 'Módulo de air bag em reparo na bancada', 'porsche-couro': 'Interior em couro bege de um Porsche',
  'classico-couro': 'Interior de um clássico, com bancos em couro preto', fusca: 'Porta-malas dianteiro de um Fusca, forrado', 'porsche-preto': 'Porsche preto dentro da oficina',
  'rodas-friso': 'Rodas pintadas de preto com friso vermelho', 'rodas-fosco': 'Rodas pintadas em preto fosco', 'mercedes-sl': 'Mercedes-Benz SL branco na oficina',
};
const ordemGaleria = ['z4', 'ford-antes', 'ford-depois', 'boxster', 'e36', 'mini', 'chevette', 'capota', 'z4-prata', 'porsche-couro', 'classico-couro', 'interior', 'painel', 'airbag', 'fusca', 'rodas-friso', 'rodas-fosco', 'vw', 'sedan', 'stilo', 'mercedes-sl', 'porsche-preto', 'duplo'];
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="600" height="400" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;

const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'a-piter-car', nome: 'A Piter Car' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'galeria', nome: 'Galeria' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Do 1.0 ao superesportivo', b: 'Perfection to drive' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=Golos+Text:wght@400;500;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&family=Sora:wght@300;400;600&display=swap',
};
const cor = { a: '#d71920', b: '#121214' };
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Serviços automotivos premium em Joinville` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cor[v] });
const chev = '<span class="chev" aria-hidden="true"><i></i><i></i><i></i></span>';
const btnWa = (txt = 'Chamar no WhatsApp', cls = 'btn') => `<a class="${cls}" href="${wa}" ${ext}>${icWa()}${txt}</a>`;
const btnTel = (txt = E.fone, cls = 'btn btn-linha') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Piter Car, página inicial"><img src="/assets/${logo}.webp" alt="Piter Car, serviços automotivos premium" width="716" height="137"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa}" ${ext}>${icWa()}<span>WhatsApp</span></a>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Piter Car" width="716" height="137" loading="lazy"><p>${premium}</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${icWa()}<a href="${wa}" ${ext}>${E.whats}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.cidade}</span></li>
      <li>${ic('face')}<a href="${E.face}" ${ext}>Facebook</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Piter Car · Serviços automotivos premium</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa}" ${ext} aria-label="Falar com a Piter Car no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa}" ${ext}>${E.whats}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.cidade}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const form = () => `<form class="form" data-wa="Olá, Piter Car! Vim pelo site." data-numero="${E.waNum}">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Telefone<input name="fone" type="tel" autocomplete="tel"></label></div>
  <div class="form-duas"><label>Carro (marca e modelo)*<input name="carro" required></label><label>Assunto<select name="assunto"><option>Serviço ou reparo</option><option>Orçamento de peças</option><option>Projeto Tunning/DUB</option><option>Restauração</option><option>Outro</option></select></label></div>
  <label>Mensagem<textarea name="msg" rows="4"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp da Piter Car, pronta para enviar.</p>
</form>`;
const listaGrupo = (g, numerar = false) => `<ol class="lista-serv">${g.itens.map((s, i) => `<li${numerar ? ` data-n="${String(i + 1).padStart(2, '0')}"` : ''}><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join('')}</ol>`;
const marcasLinha = () => `<ul class="marcas">${marcas.map(m => `<li>${m}</li>`).join('')}<li>e outras</li></ul>`;
const antesDepois = (cls = '') => `<div class="ad ${cls}"><figure>${foto('ford-antes')}<figcaption><b>Antes</b> A carroceria em chapa, sem pintura</figcaption></figure><figure>${foto('ford-depois')}<figcaption><b>Depois</b> Laranja metálico, teto branco e rebaixado</figcaption></figure></div>`;

function comum(v, pag, cab) {
  pag['a-piter-car'] = head(v, 'a-piter-car', 'A Piter Car', 'Há mais de 20 anos em assistência e reparos automotivos em Joinville. Especializada em importados, com atendimento para todas as marcas nacionais.') + topo(v, 'a-piter-car') + cab('A Piter Car', 'Experiência e conhecimento juntos para o melhor tratamento do seu carro', 'z4') + `
<div class="in">
<section class="emp-pag"><div class="emp-txt">${empresa.map(p => `<p>${p}</p>`).join('')}</div><aside class="emp-lado"><p class="k">${chev}Premium</p><p class="emp-dest">${premium}</p>${marcasLinha()}</aside></section>
<section class="galeria g-emp">${['boxster', 'mini', 'sedan', 'stilo'].map(f => `<figure class="sobe">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<section class="pecas-pag"><div><p class="k">${chev}Peças</p><h2>Do auto 1.0 ao superesportivo</h2></div><div><p>${pecas}</p><p class="bts">${btnWa('Pedir orçamento de peças')}</p></div></section>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Diagnóstico eletrônico, air bag, anti-ruído, infiltrações, conversíveis, teto solar, escape esportivo, chip de potência, suspensões, envelopamento, rodas, tapeçaria e restauração. Joinville/SC.') + topo(v, 'servicos') + cab('Serviços', 'Especialização no melhor tratamento para cada área do seu carro', 'painel') + `
<div class="in">
<blockquote class="enzo"><p>“${enzo[0]}”</p><cite>${enzo[1]}</cite></blockquote>
<nav class="ancoras" aria-label="Grupos de serviços">${grupos.map(g => `<a href="#${g.id}">${g.t}</a>`).join('')}<a href="#pecas">Peças</a></nav>
${grupos.map(g => `<section class="grupo" id="${g.id}"><header><p class="k">${chev}${g.itens.length} serviços</p><h2>${g.t}</h2><p>${g.d}</p></header>${listaGrupo(g, v === 'b')}</section>`).join('')}
<section class="pecas-pag" id="pecas"><div><p class="k">${chev}Peças</p><h2>Peças para importados e nacionais</h2></div><div><p>${pecas}</p><p class="bts">${btnWa('Pedir orçamento de peças')}</p></div></section>
<p class="cta-linha">${btnWa('Consultar um serviço')}${btnTel()}</p>
</div>
` + rodape(v);
  pag.galeria = head(v, 'galeria', 'Galeria', 'Fotos de serviços feitos pela Piter Car: restauração, conversíveis, interiores, rodas e carros nacionais e importados.') + topo(v, 'galeria') + cab('Galeria', 'Alguns dos carros que passaram pela oficina', 'e36') + `
<div class="in">
<section class="ad-pag"><header><p class="k">${chev}Restauração</p><h2>Um Ford antigo, antes e depois</h2></header>${antesDepois()}</section>
<section class="galeria g-toda">${ordemGaleria.filter(f => !f.startsWith('ford')).map(f => `<figure class="sobe">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<p class="nota-galeria">Fotos do arquivo da Piter Car.</p>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Piter Car: ${E.rua}, ${E.cidade}. Telefone ${E.fone}, WhatsApp ${E.whats}, ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Conte o que o seu carro precisa', 'duplo') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}<p class="bts">${btnTel('Ligar agora')}${btnMapa()}</p></div><div>${form()}</div></section>
${mapaFrame}</div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${chev}${k}</p><h1>${t}</h1></div><figure>${img(f, ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Oficina automotiva premium em Joinville: diagnóstico eletrônico, conversíveis, teto solar, escape esportivo, chip de potência, tapeçaria e restauração. Importados e nacionais.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">${chev}Joinville · Av. Santos Dumont</p><h1>Do 1.0 ao <em>superesportivo</em></h1><p>Há mais de 20 anos em assistência e reparos automotivos. Especializada em importados, com atendimento diferenciado para todas as marcas nacionais.</p>
  <p class="bts">${btnWa()}${btnTel()}</p></div>
  <div class="hero-a-fotos">${foto('boxster', 'h1')}${foto('ford-depois', 'h2')}${foto('z4', 'h3')}</div>
</div></section>
<section class="faixa-a"><div class="in">${marcasLinha()}</div></section>
<section class="in esp-a"><header class="tit"><p class="k">${chev}Serviços</p><h2>Três frentes, uma oficina</h2></header>
<div class="esp-a-grade">${grupos.map(g => `<article class="sobe"><h3><a href="${link(v, 'servicos')}#${g.id}">${g.t}</a></h3><p>${g.d}</p><ul>${g.itens.map(s => `<li>${s[0]}</li>`).join('')}</ul></article>`).join('')}</div>
<a class="link-seta" href="${link(v, 'servicos')}">Ver todos os serviços ${ic('seta')}</a></section>
<section class="ad-a"><div class="in"><header class="tit"><p class="k">${chev}Restauração</p><h2>Restauramos e conservamos clássicos de todas as marcas</h2></header>${antesDepois()}</div></section>
<section class="in tun-a"><figure>${foto('rodas-friso')}</figure><div><p class="k">${chev}Divisão Tunning/DUB</p><h2>Para o seu sonho personalizado</h2><p>${tunning}</p><ul class="tun-lista"><li><b>Até 40%</b> mais torque e potência com chip</li><li><b>Fabricação própria</b> de escapes esportivos</li><li><b>Fosco, brilho e carbono</b> no envelopamento</li></ul><a class="link-seta" href="${link(v, 'servicos')}#tunning">Serviços de tunning ${ic('seta')}</a></div></section>
<section class="enzo-a"><div class="in"><blockquote class="enzo"><p>“${enzo[0]}”</p><cite>${enzo[1]}</cite></blockquote></div></section>
<section class="in gal-a"><header class="tit"><p class="k">${chev}Galeria</p><h2>Na frente da oficina</h2></header><div class="gal-a-grade">${['mini', 'e36', 'capota', 'porsche-couro', 'chevette', 'rodas-fosco'].map(f => foto(f)).join('')}</div><a class="link-seta" href="${link(v, 'galeria')}">Ver a galeria ${ic('seta')}</a></section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Seu carro merece quem conhece</h2><p>${E.rua}, ${E.cidade}. Telefone ${E.fone}.</p></div><p class="bts">${btnWa()}${btnMapa()}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b">${img(f, ' loading="eager"')}<div class="in cab-b-in"><p class="k">${chev}${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', 'Piter Car, perfection to drive. Oficina premium em Joinville para importados e nacionais: diagnóstico, conversíveis, tunning, tapeçaria e restauração.') + topo(v, 'index') + `
<section class="hero-b">${img('e36', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in">
  <p class="k">${chev}Serviços automotivos premium · Joinville</p><h1>Perfection<br><em>to drive</em></h1><p>Especializada em importados, com atendimento diferenciado para todas as marcas nacionais. Há mais de 20 anos em assistência e reparos automotivos.</p>
  <p class="bts">${btnWa()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div></section>
<section class="nums-b"><div class="in"><ul>
  <li><b>20+</b><span>anos no ramo de reparos automotivos</span></li>
  <li><b>17</b><span>serviços, do air bag à restauração</span></li>
  <li><b>40%</b><span>de ganho de torque e potência com chip</span></li>
  <li><b>1000</b><span>modelos de carros atendidos pelo chip</span></li>
</ul></div></section>
<section class="in servs-b">${grupos.map(g => `<div class="grupo-b sobe"><header><p class="k">${chev}${g.itens.length} serviços</p><h2>${g.t}</h2></header><ul>${g.itens.map(s => `<li><a href="${link(v, 'servicos')}#${g.id}">${s[0]}</a></li>`).join('')}</ul></div>`).join('')}</section>
<section class="tira-b" aria-label="Fotos da oficina"><div class="tira-b-in">${['z4', 'mini', 'porsche-preto', 'chevette', 'capota', 'rodas-friso', 'boxster', 'vw'].map(f => foto(f)).join('')}</div></section>
<section class="in comp-b"><div><p class="k">${chev}Restauração</p><h2>Arraste para ver o antes e depois</h2><p>Restauramos e conservamos veículos clássicos e antigos de todas as marcas. Este Ford saiu da chapa para o laranja metálico.</p><a class="link-seta" href="${link(v, 'galeria')}">Ver a galeria ${ic('seta')}</a></div>
<div class="comp" style="--p:50%"><img src="/assets/img/ford-depois.webp" alt="${esc(fotos['ford-depois'])}" width="600" height="400" loading="lazy"><div class="comp-antes"><img src="/assets/img/ford-antes.webp" alt="${esc(fotos['ford-antes'])}" width="600" height="400" loading="lazy"></div><span class="comp-linha" aria-hidden="true"></span><input type="range" min="0" max="100" value="50" aria-label="Comparar antes e depois" oninput="this.parentNode.style.setProperty('--p',this.value+'%')"><span class="comp-r comp-r1">Antes</span><span class="comp-r comp-r2">Depois</span></div></section>
<section class="enzo-b"><div class="in"><blockquote class="enzo"><p>“${enzo[0]}”</p><cite>${enzo[1]}</cite></blockquote></div></section>
<section class="in duas-b"><article class="sobe"><p class="k">${chev}Peças</p><h2>Do auto 1.0 ao superesportivo</h2><p>${pecas}</p>${btnWa('Pedir orçamento de peças', 'link-seta')}</article><article class="sobe"><p class="k">${chev}Tunning/DUB</p><h2>Para o seu sonho personalizado</h2><p>${tunning}</p>${btnWa('Contar meu projeto', 'link-seta')}</article></section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>${E.rua}</h2><p>${E.cidade} · ${E.fone} · WhatsApp ${E.whats}</p></div><p class="bts">${btnWa()}${btnMapa()}</p></div></section>
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
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#d71920', fundo: '#121214', claro: '#f1f1ef',
  fonteTitulo: "'Orbitron',system-ui,sans-serif", fonteTexto: "'Sora',system-ui,sans-serif", googleFonts: FONTES.b,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, em grafite e no vermelho do logo, com as setas do logo marcando cada seção e títulos largos como as letras da marca. Abre com fotos reais de carros na frente da oficina.', pontos: ['Serviços em três frentes', 'Restauração do Ford antes e depois', 'WhatsApp em todas as páginas'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura, em fibra de carbono, prata e vermelho, como o site atual, mas moderna. Abre com o slogan "Perfection to drive" e traz um comparador de antes e depois para arrastar.', pontos: ['"Perfection to drive" na abertura', 'Números da oficina em destaque', 'Faixa de fotos reais dos trabalhos'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
