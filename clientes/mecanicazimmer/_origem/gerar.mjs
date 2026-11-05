// Mecânica Zimmer (Rincão, Novo Hamburgo/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/mecanicazimmer/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs mecanicazimmer http://www.mecanicazimmer.com.br/)
// Textos tirados do site atual (mecanicazimmer.com.br: index, empresa-mecanica, servicos-mecanica, contato). Fotos: as 11 fotos reais da oficina (arquivos/1..11.jpg).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Mecânica Zimmer', curto: 'Mecânica Zimmer', url: 'https://mecanicazimmer.overtus.com.br/', antigo: 'http://www.mecanicazimmer.com.br/',
  fone: '(51) 3524-7480',
  rua: 'Rua Portugal, 182', bairro: 'Rincão', cidade: 'Novo Hamburgo/RS',
};
const horario = [['Segunda a quinta', '7h30 às 11h30', '13h às 18h'], ['Sexta-feira', '7h30 às 11h30', '13h às 17h']];
const lema = 'Confiança se conquista com serviço de qualidade e honestidade!';
const empresa = [
  'A Mecânica Zimmer atua no mercado automotivo desde 1987, com serviços especializados na manutenção preventiva e corretiva do seu veículo.',
  'Buscamos constantemente qualidade em serviços, atendimento e inovações tecnológicas, e para que isso ocorra, contamos com técnicos especializados.',
  'Estamos sempre em constante renovação: em 2007 ampliamos nossa sede, que agora conta com 490 m², para seu conforto e melhor atendimento.',
  'Estamos à disposição para atender o seu carro com um serviço de confiança que uma empresa de mais de 30 anos pode oferecer.',
];
const principais = [
  { t: 'Diagnóstico computadorizado', d: 'Injeção eletrônica.' },
  { t: 'Revisão geral', d: 'Periódicas, preventiva, compra e venda, entre outras.' },
];
const motor = ['Reforma de motores', 'Cabeçotes', 'Descarbonização de motores', 'Vazamentos', 'Troca de correias e tensionadores', 'Cabos e velas de ignição', 'Retentores e juntas do motor', 'Troca de interruptores de óleo e temperatura', 'Troca de mangueiras', 'Troca de óleo do motor', 'Troca de filtros de óleo, ar e combustível', 'Limpeza de bicos injetores'];
const reparos = [
  { t: 'Freios', d: 'Pastilhas, discos, freio de mão, fluido de freio, pinças, lonas, tambores, flexíveis do freio, entre outros.' },
  { t: 'Suspensão', d: 'Amortecedores, coifas, coxins, batentes, rolamentos, bieletas, pivôs, buchas, molas, juntas homocinéticas, entre outros.' },
  { t: 'Embreagem', d: '' },
  { t: 'Bomba de combustível', d: '' },
  { t: 'Arrefecimento', d: 'Troca de radiadores e aditivos de arrefecimento.' },
  { t: 'Ar-condicionado', d: 'Troca do filtro de cabine e higienização.' },
  { t: 'Elétrica e itens de uso', d: 'Baterias, lâmpadas de faróis e sinalização em geral, palhetas do limpador de para-brisa.' },
];
const fotos = {
  panorama: 'O galpão da oficina, com os boxes de atendimento', galpao2: 'Carros em atendimento nos boxes', trabalho: 'Mecânicos trabalhando no motor de um carro',
  elevador: 'Carro no elevador, com outros nos boxes ao fundo', boxes: 'Carros nos boxes do galpão', motor: 'Capô aberto durante o atendimento',
  fusca: 'O Fusca amarelo da Mecânica Zimmer no galpão', galpao: 'O galpão, com a sinalização da oficina', entrada: 'Entrada e escritório da oficina',
  recepcao: 'Recepção com sala de espera', espera: 'Sala de espera',
};
const tam = { panorama: [600, 450], galpao2: [600, 450], trabalho: [600, 450], elevador: [600, 450], boxes: [600, 450], motor: [400, 533], fusca: [666, 499], galpao: [666, 499], entrada: [666, 499], recepcao: [666, 499], espera: [400, 533] };
const grandes = ['panorama', 'galpao2', 'trabalho'];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'a-empresa', nome: 'A empresa' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'a-oficina', nome: 'A oficina' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Ladrilho', b: 'Bandeirada' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,600;0,700;1,700;1,900&family=Atkinson+Hyperlegible:wght@400;700&family=Chivo:ital,wght@0,400;0,600;1,800;1,900&family=Hind:wght@400;500;600&display=swap';
const src = n => `/assets/img/${n}.webp`;
const img = (n, extra = '') => `<img src="${src(n)}" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="${src(grandes.includes(n) ? n + '-g' : n)}" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#b34a12', b: '#26292c' };
const tel = telHref(E.fone);
const mapsQ = encodeURIComponent('Rua Portugal, 182, Rincão, Novo Hamburgo RS');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Mecânica multimarcas em Novo Hamburgo desde 1987` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnTel = (txt = E.fone, cls = 'btn') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;
const tabHorario = () => `<table class="horario"><caption>Horário de funcionamento</caption><tbody>${horario.map(h => `<tr><th scope="row">${h[0]}</th><td>${h[1]}</td><td>${h[2]}</td></tr>`).join('')}</tbody></table>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Mecânica Zimmer na Rua Portugal, 182" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Mecânica Zimmer, página inicial"><img src="/assets/${logo}.webp" alt="Mecânica Zimmer" width="1688" height="226"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${tel}">${ic('tel')}<span>${E.fone}</span></a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="xadrez" aria-hidden="true"></div>
  <div class="in rod-grade">
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Mecânica Zimmer" width="1688" height="226" loading="lazy"><p>Mecânica multimarcas e diagnóstico computadorizado em Novo Hamburgo, desde 1987. Linha leve: álcool, gasolina e flex.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}</span></li>
      <li>${ic('relogio')}<span>Seg. a qui., 7h30–11h30 e 13h–18h<br>Sex., 7h30–11h30 e 13h–17h</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Mecânica Zimmer. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua tel-flutua" href="${tel}" aria-label="Ligar para a Mecânica Zimmer">${ic('tel')}</a>
</body>
</html>
`;
}

const listaMotor = () => `<ul class="lista-motor">${motor.map(m => `<li>${m}</li>`).join('')}</ul>`;
const listaReparos = () => `<dl class="reparos">${reparos.map(r => `<div class="sobe"><dt>${r.t}</dt>${r.d ? `<dd>${r.d}</dd>` : ''}</div>`).join('')}</dl>`;
const consulte = `<p class="consulte">Consulte-nos sobre outros serviços!</p>`;

function comum(v, pag, cab) {
  pag['a-empresa'] = head(v, 'a-empresa', 'A empresa', 'Desde 1987 na manutenção preventiva e corretiva de veículos, com técnicos especializados e sede de 490 m² no bairro Rincão, em Novo Hamburgo.') + topo(v, 'a-empresa') + cab('A empresa', 'Desde 1987 cuidando do carro de Novo Hamburgo', 'fusca') + `
<div class="in">
<section class="empresa-pag"><div class="empresa-txt">${empresa.map(p => `<p>${p}</p>`).join('')}</div>
<aside class="marcos"><dl>
  <div><dt>1987</dt><dd>Início das atividades</dd></div>
  <div><dt>2007</dt><dd>Sede ampliada</dd></div>
  <div><dt>490 m²</dt><dd>de oficina</dd></div>
</dl></aside></section>
<blockquote class="lema-pag"><p class="k">Nosso lema</p><p>“${lema}”</p></blockquote>
<section class="galeria g-emp">${['galpao', 'recepcao', 'espera', 'entrada'].map(f => `<figure class="sobe f-${f}">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<p class="cta-linha">${btnTel('Ligar e agendar')}${btnMapa()}</p>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Diagnóstico computadorizado de injeção eletrônica, revisão geral, motor, freios, suspensão, embreagem, arrefecimento e ar-condicionado. Linha leve: álcool, gasolina e flex.') + topo(v, 'servicos') + cab('Serviços', 'Manutenção preventiva e corretiva da linha leve', 'elevador') + `
<div class="in">
<p class="intro">Trabalhamos com veículos da linha leve: álcool, gasolina e flex. Estes são os principais serviços prestados.</p>
<section class="principais-pag">${principais.map((p, i) => `<article class="sobe"><span class="n">0${i + 1}</span><h2>${p.t}</h2><p>${p.d}</p></article>`).join('')}</section>
<section class="motor-pag"><header><p class="k">Motor</p><h2>Do bico injetor à reforma completa</h2></header>${listaMotor()}</section>
<section class="reparos-pag"><header><p class="k">Reparos e substituição</p><h2>Freios, suspensão e o que mais o carro pedir</h2></header>${listaReparos()}</section>
${consulte}
<p class="cta-linha">${btnTel('Ligar e agendar seu horário')}${btnMapa()}</p>
</div>
` + rodape(v);
  pag['a-oficina'] = head(v, 'a-oficina', 'A oficina', 'Fotos da Mecânica Zimmer: galpão de 490 m², boxes de atendimento, recepção e sala de espera. Rua Portugal, 182, Rincão, Novo Hamburgo.') + topo(v, 'a-oficina') + cab('A oficina', '490 m² para atender o seu carro', 'galpao2') + `
<div class="in">
<p class="intro">Em 2007 ampliamos a sede para o seu conforto e melhor atendimento. Conheça a oficina por dentro.</p>
<section class="galeria g-ofi">${['panorama', 'trabalho', 'motor', 'elevador', 'boxes', 'fusca', 'galpao', 'recepcao', 'espera', 'entrada'].map(f => `<figure class="sobe f-${f}">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<p class="cta-linha">${btnTel('Ligar e agendar')}${btnMapa()}</p>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Mecânica Zimmer: ${E.rua}, bairro ${E.bairro}, Novo Hamburgo/RS. Telefone ${E.fone}. Segunda a quinta, 7h30 às 18h; sexta, 7h30 às 17h.`) + topo(v, 'contato') + cab('Contato', 'Fale conosco e agende seu horário', 'recepcao') + `
<div class="in"><section class="contato-pag"><div>
<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, bairro ${E.bairro}</span><span>${E.cidade}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>
${tabHorario()}
<p class="bts">${btnTel('Ligar agora')}${btnMapa()}</p></div><div>${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Mecânica multimarcas e diagnóstico computadorizado em Novo Hamburgo desde 1987. Motor, freios, suspensão, embreagem e revisão. Rua Portugal, 182, Rincão.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Mecânica multimarcas · Novo Hamburgo</p><h1>Confiança se conquista com <em>serviço de qualidade e honestidade.</em></h1><p>Diagnóstico computadorizado, revisão e manutenção preventiva e corretiva para carros da linha leve: álcool, gasolina e flex. Desde 1987 no bairro Rincão.</p>
  <p class="bts">${btnTel('Ligar e agendar')}${btnMapa()}</p></div>
  <figure class="hero-a-foto">${foto('panorama')}</figure>
</div></section>
<section class="numeros-a"><div class="in"><dl>
  <div><dt>1987</dt><dd>no mercado automotivo</dd></div>
  <div><dt>490 m²</dt><dd>de sede, ampliada em 2007</dd></div>
  <div><dt>Linha leve</dt><dd>álcool, gasolina e flex</dd></div>
</dl></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>O que fazemos pelo seu carro</h2></header>
<div class="servs-a-grade">
  <div><h3>${principais[0].t}</h3><p>${principais[0].d} O melhor tratamento para o seu veículo começa por um diagnóstico certo.</p></div>
  <div><h3>${principais[1].t}</h3><p>${principais[1].d}</p></div>
  <div><h3>Motor</h3><p>Reforma, cabeçotes, descarbonização, correias, velas, juntas, troca de óleo e filtros, limpeza de bicos.</p></div>
  <div><h3>Freios e suspensão</h3><p>Pastilhas, discos, pinças, amortecedores, pivôs, buchas, molas e juntas homocinéticas.</p></div>
</div>
<a class="link-seta" href="${link(v, 'servicos')}">Todos os serviços ${ic('seta')}</a></section>
<section class="oficina-a"><div class="in oficina-a-in"><div class="oficina-a-fotos">${foto('trabalho', 'o1')}${foto('motor', 'o2')}${foto('boxes', 'o3')}</div>
<div class="oficina-a-txt"><p class="k">A empresa</p><h2>Técnicos especializados e uma sede de 490 m²</h2><p>Buscamos constantemente qualidade em serviços, atendimento e inovações tecnológicas. Em 2007 ampliamos a sede para o seu conforto e melhor atendimento.</p><a class="link-seta" href="${link(v, 'a-empresa')}">Conheça a empresa ${ic('seta')}</a></div></div></section>
<section class="in visita-a"><div><p class="k">Venha conferir</p><h2>Fale conosco e agende seu horário</h2><p>${E.rua}, bairro ${E.bairro}, ${E.cidade}.</p><p class="bts">${btnTel()}${btnMapa()}</p></div>${tabHorario()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b f-${f}">${img(f, ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section><div class="xadrez" aria-hidden="true"></div>`;
  pag.index = head(v, 'index', '', 'Mecânica Zimmer, Novo Hamburgo: mecânica multimarcas e diagnóstico computadorizado desde 1987. Linha leve, álcool, gasolina e flex. (51) 3524-7480.') + topo(v, 'index') + `
<section class="hero-b">${img('trabalho', ' loading="eager" fetchpriority="high"').replace(src('trabalho'), src('trabalho-g'))}<div class="in hero-b-in">
  <p class="k">Desde 1987 · Rincão · Novo Hamburgo</p><h1>Mecânica multimarcas e <em>diagnóstico computadorizado.</em></h1><p>Álcool, gasolina e flex. Manutenção preventiva e corretiva com técnicos especializados.</p>
  <p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div></section>
<div class="xadrez" aria-hidden="true"></div>
<section class="in lista-b"><header class="tit-b"><p class="k">Serviços</p><h2>Principais serviços prestados</h2></header>
<ol class="linhas-b">
  <li class="sobe"><span class="n">01</span><h3>Diagnóstico computadorizado</h3><p>Injeção eletrônica.</p></li>
  <li class="sobe"><span class="n">02</span><h3>Revisão geral</h3><p>Periódicas, preventiva, compra e venda, entre outras.</p></li>
  <li class="sobe"><span class="n">03</span><h3>Motor</h3><p>Reforma de motores, cabeçotes, descarbonização, vazamentos, correias e tensionadores.</p></li>
  <li class="sobe"><span class="n">04</span><h3>Freios e suspensão</h3><p>Pastilhas, discos, pinças, amortecedores, coxins, pivôs, buchas e molas.</p></li>
  <li class="sobe"><span class="n">05</span><h3>Embreagem e bomba de combustível</h3><p>Reparo e substituição.</p></li>
  <li class="sobe"><span class="n">06</span><h3>Arrefecimento e ar-condicionado</h3><p>Radiadores, aditivos, filtro de cabine e higienização.</p></li>
</ol>
<a class="link-seta" href="${link(v, 'servicos')}">Lista completa ${ic('seta')}</a></section>
<section class="lema-b"><div class="in"><p class="k">Nosso lema</p><blockquote>“${lema}”</blockquote></div></section>
<section class="in galpao-b"><div class="galpao-b-fotos">${foto('galpao2', 'g1')}${foto('elevador', 'g2')}${foto('fusca', 'g3')}</div>
<div class="galpao-b-txt"><p class="k">A oficina</p><h2>1987, 2007 e hoje</h2><dl class="marcos-b"><div><dt>1987</dt><dd>A Mecânica Zimmer começa a atuar no mercado automotivo.</dd></div><div><dt>2007</dt><dd>A sede é ampliada e passa a ter 490 m².</dd></div><div><dt>Hoje</dt><dd>Mais de 30 anos de serviço de confiança.</dd></div></dl><a class="link-seta" href="${link(v, 'a-oficina')}">Ver a oficina ${ic('seta')}</a></div></section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>Agende seu horário</h2><p>${E.rua}, bairro ${E.bairro}, ${E.cidade}.</p></div>${tabHorario()}<p class="bts">${btnTel()}${btnMapa()}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#b34a12', fundo: '#26292c', claro: '#f4f4f2',
  fonteTitulo: "'Titillium Web',system-ui,sans-serif", fonteTexto: "'Atkinson Hyperlegible',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, como o piso de azulejo branco da oficina, com o tom ferrugem das paredes do galpão e títulos em itálico grosso, como o nome no logo. Abre com o lema da casa.', pontos: ['"Confiança se conquista com serviço de qualidade e honestidade."', '1987, 490 m² e linha leve em destaque', 'Horário e telefone sempre à vista'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Grafite escovado, como o topo do site atual, com a bandeira quadriculada do logo dividindo as seções. Abre na foto dos mecânicos trabalhando e lista os serviços numerados.', pontos: ['Faixa quadriculada da bandeirada', 'Serviços numerados de 01 a 06', 'Linha do tempo 1987, 2007 e hoje'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
