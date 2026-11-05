// Velochip Eletrônica Automotiva (Vila Tortelli, Sorocaba/SP). Gera public/{a,b}/ e a página de escolha.
// node clientes/velochip/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs velochip http://www.velochip.com.br/)
// Textos do site atual (velochip.com.br). Fotos: as 3 fotos de serviço do site e recortes do tour 360° da própria Velochip (momento360).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Velochip Eletrônica Automotiva', curto: 'Velochip', url: 'https://velochip.overtus.com.br/', antigo: 'http://www.velochip.com.br/',
  fone: '(15) 3318-9818', cel: '(15) 98116-3051', wa: '5515981163051', email: 'velochip@hotmail.com',
  rua: 'R. Melvin Jones, 45', bairro: 'Vila Tortelli', cidade: 'Sorocaba/SP', cep: '18070-030',
  loja: 'https://velochip.lojaintegrada.com.br', tour: 'https://momento360.com/e/uc/f39d599dccbe488990177b9119bd77e4',
  face: 'https://www.facebook.com/velochip', insta: 'https://www.instagram.com/velochip', yt: 'https://www.youtube.com/velochip',
  os: 'http://www.shoficina.com.br/os/show_os.php',
};
const sobre = 'Nossa empresa é sediada na cidade de Sorocaba e estamos desde 2003 no mercado oferecendo um trabalho de qualidade, com rapidez e segurança para nossos clientes.';
const especialidade = 'Nossa especialidade é o reparo e venda de módulos eletrônicos e sistemas de airbag, freios e conforto automotivo; reprogramando, atualizando e reinstalando.';
const sistemas = [
  { cod: 'ABS', id: 'abs', t: 'Freios ABS', sub: 'Anti-lock Braking System', d: 'Tem a função de evitar o travamento das rodas do veículo durante as frenagens de emergência.' },
  { cod: 'SRS', id: 'airbag', t: 'Airbag', sub: 'SRS', d: 'É o sistema de segurança e proteção dos ocupantes do veículo, algo indispensável para a proteção em casos de acidentes ou colisões.' },
  { cod: 'ECM', id: 'injecao', t: 'Injeção eletrônica', sub: 'Módulo de Controle do Motor', d: 'Gerencia de forma eletrônica a alimentação de combustível nos motores de combustão interna, enquanto monitora sensores e atuadores para garantir o perfeito funcionamento do motor, controlando emissões de poluentes e consumo de combustível.' },
  { cod: 'MÓD.', id: 'modulos', t: 'Módulos eletrônicos', sub: 'Injeção, ABS, indicadores, airbag, conforto e carroceria', d: 'São sistemas eletrônicos integrados, utilizados em todos os veículos modernos, presentes para gerenciar eletronicamente o funcionamento e as funções dos diversos dispositivos destes veículos.' },
  { cod: 'PAINEL', id: 'painel', t: 'Instrumentos', sub: 'Painéis de instrumentos', d: 'Conjunto de indicadores que mostra informações importantes para o condutor, como velocidade, temperatura do motor, rpm do motor e indicadores de mau funcionamento.' },
];
const fazemos = [
  ['Reparo', 'de módulos eletrônicos e sistemas de airbag, freios e conforto automotivo'],
  ['Reprogramação e atualização', 'dos módulos, com programações online em aparelhos originais de montadora'],
  ['Reinstalação', 'do módulo no veículo'],
  ['Venda de módulos', 'com todas as peças testadas e revisadas'],
];
const pilares = [
  { t: 'Diagnósticos', d: 'Equipamentos de ponta.' },
  { t: 'Equipe qualificada', d: 'Técnicos qualificados e habilitados.' },
  { t: 'Qualidade e dedicação', d: 'Peças testadas e revisadas antes de voltar para o carro.' },
];
const diag = 'Especializados em diagnósticos e identificações de falhas em circuitos elétricos e eletrônicos automotivos, com time técnico capacitado e especializado para toda gama de montadoras: nacionais e importadas.';
const fotos = {
  fachada: 'A fachada da Velochip, na R. Melvin Jones, em Sorocaba',
  lab: 'O laboratório de eletrônica, com as bancadas de reparo de módulos',
  oficina1: 'A oficina da Velochip vista da entrada',
  oficina2: 'Carros em atendimento na oficina',
  oficina3: 'Carros com o capô aberto para diagnóstico',
  oficina4: 'Diagnóstico de um carro ligado ao equipamento',
  oficina5: 'O salão da oficina, com o portão para a rua',
  termica: 'Câmera térmica usada no diagnóstico, no cofre do motor',
  scanner: 'Programação de um módulo pelo computador, com o carro ligado',
  bancada: 'Medição com câmera térmica na oficina',
  circuito: 'Arte de circuito da Velochip',
};
const tam = { fachada: [705, 390], lab: [705, 360], oficina1: [1200, 420], oficina2: [1200, 420], oficina3: [1200, 420], oficina4: [1200, 420], oficina5: [900, 420], termica: [1100, 1100], scanner: [1001, 1100], bancada: [1100, 1100], circuito: [1200, 470] };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'a-velochip', nome: 'A Velochip' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'instalacoes', nome: 'Instalações' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Bancada', b: 'Circuito' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Reddit+Sans:wght@400;500;600;700;800&family=Reddit+Mono:wght@500;600&family=Tektur:wght@500;600;700&family=Nunito:wght@400;600;700;800&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#d7141f', b: '#0f2a4a' };
const tel = telHref(E.fone);
const wa = waHref(E.wa, 'Olá! Vim pelo site da Velochip.');
const mapsQ = encodeURIComponent('R. Melvin Jones, 45, Vila Tortelli, Sorocaba SP, 18070-030');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Módulos, airbag, ABS e injeção em Sorocaba` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnWa = (txt = 'Chamar no WhatsApp', cls = 'btn') => `<a class="${cls}" href="${wa}" ${ext}>${icWa()}${txt}</a>`;
const btnTel = (txt = E.fone, cls = 'btn btn-linha') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnLoja = (cls = 'btn btn-linha') => `<a class="${cls}" href="${E.loja}" ${ext}>${ic('pacote')}Loja virtual</a>`;

const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa}" ${ext}>${E.cel}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const redes = () => `<ul class="redes"><li><a href="${E.face}" ${ext} aria-label="Facebook da Velochip">${ic('face')}</a></li><li><a href="${E.insta}" ${ext} aria-label="Instagram da Velochip">${ic('insta')}</a></li><li><a href="${E.yt}" ${ext} aria-label="YouTube da Velochip">${ic('yt')}</a></li></ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Velochip na R. Melvin Jones, 45" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const formOrcamento = () => `<form class="form" data-wa="Olá! Vim pelo site da Velochip.">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Telefone<input name="fone" type="tel" autocomplete="tel"></label></div>
  <div class="form-duas"><label>Veículo (marca, modelo e ano)*<input name="veiculo" required></label><label>Sistema<select name="sistema"><option>Não sei</option>${sistemas.map(s => `<option>${s.t}</option>`).join('')}</select></label></div>
  <label>O que está acontecendo?<textarea name="msg" rows="4" placeholder="Luz acesa no painel, módulo para reparo ou programação, peça que procura..."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp da Velochip, ${E.cel}.</p>
</form>`;
const formOS = () => `<form class="form form-os" method="post" target="_blank" action="${E.os}">
  <label>Chave de acesso<input name="WebKey" autocomplete="off"></label>
  <label>Senha<input name="PassKey" type="password" autocomplete="off"></label>
  <button class="btn btn-linha" type="submit">${ic('ext')}Consultar ordem de serviço</button>
</form>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Velochip, página inicial"><img src="/assets/${logo}.webp" alt="Velochip" width="724" height="156"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}<li><a href="${E.loja}" ${ext}>Loja virtual</a></li></ul></nav>
    <a class="btn btn-topo" href="${wa}" ${ext}>${icWa()}<span>${E.cel}</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Velochip" width="724" height="156" loading="lazy"><p>Reparo, venda e programação de módulos eletrônicos, airbag, ABS, injeção e painéis de instrumentos. Em Sorocaba desde 2003.</p>${redes()}</div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}<li><a href="${E.loja}" ${ext}>Loja virtual</a></li></ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa}" ${ext}>${E.cel}</a></li>
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Velochip Eletrônica Automotiva. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa}" ${ext} aria-label="Falar com a Velochip no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const listaSistemas = (cls = '') => `<div class="sist ${cls}">${sistemas.map(s => `<article class="sis sobe" id="${s.id}"><p class="cod">${s.cod}</p><div><h3>${s.t}</h3><p class="sub">${s.sub}</p><p>${s.d}</p></div></article>`).join('')}</div>`;
const listaFazemos = () => `<ol class="fazemos">${fazemos.map((f, i) => `<li class="sobe"><span class="n">0${i + 1}</span><p><b>${f[0]}</b> ${f[1]}</p></li>`).join('')}</ol>`;
const blocoPilares = () => `<div class="pilares">${pilares.map(p => `<div class="sobe"><h3>${p.t}</h3><p>${p.d}</p></div>`).join('')}</div>`;
const galeriaOficina = () => `<section class="galeria">${['oficina1', 'lab', 'oficina2', 'oficina3', 'fachada', 'oficina5', 'oficina4'].map(f => `<figure class="sobe g-${f}">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>`;
const tourBox = () => `<section class="tour"><div><p class="k">Tour 360°</p><h2>Conheça nossas instalações e laboratórios</h2><p>A Velochip tem um tour virtual de 360°: dá para andar pela oficina e pelo laboratório de eletrônica sem sair de casa.</p><a class="btn" href="${E.tour}" ${ext}>${ic('ext')}Abrir o tour 360°</a></div><a class="tour-foto" href="${E.tour}" ${ext} aria-label="Abrir o tour 360° da Velochip">${img('lab')}<span>360°</span></a></section>`;

function comum(v, pag, cab) {
  pag['a-velochip'] = head(v, 'a-velochip', 'A Velochip', 'Desde 2003 em Sorocaba, a Velochip repara, vende e programa módulos eletrônicos, sistemas de airbag, freios e conforto automotivo.') + topo(v, 'a-velochip') + cab('A Velochip', 'Desde 2003 em Sorocaba, cuidando da eletrônica do carro', 'fachada') + `
<div class="in">
<section class="sobre-pag"><div><p class="lead">${sobre}</p><p>${especialidade}</p><p>Todas as peças são testadas e revisadas. Programações online com aparelhos originais de montadora (consulte as possibilidades de programação na sua compra).</p></div><dl class="fatos"><div><dt>Desde</dt><dd>2003</dd></div><div><dt>Sede</dt><dd>Sorocaba/SP</dd></div><div><dt>Montadoras</dt><dd>Nacionais e importadas</dd></div></dl></section>
<section class="bloco"><header class="tit"><p class="k">Como trabalhamos</p><h2>Do diagnóstico ao módulo de volta no carro</h2></header>${listaFazemos()}</section>
<section class="bloco"><header class="tit"><p class="k">Por que a Velochip</p><h2>Time técnico especializado</h2><p>${diag}</p></header>${blocoPilares()}</section>
${tourBox()}
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'ABS, airbag (SRS), injeção eletrônica (ECM), módulos eletrônicos e painéis de instrumentos: reparo, venda, reprogramação e diagnóstico em Sorocaba.') + topo(v, 'servicos') + cab('Serviços', 'Os sistemas eletrônicos que atendemos', 'scanner') + `
<div class="in">
<p class="intro">${especialidade} ${diag.replace('Especializados', 'Somos especializados')}</p>
${listaSistemas('sist-pag')}
<section class="bloco duas"><div><p class="k">O que fazemos</p><h2>Reparo, venda e programação</h2><p>Todas as peças são testadas e revisadas. Programações online com aparelhos originais de montadora.</p></div>${listaFazemos()}</section>
<section class="loja-faixa"><div><p class="k">Loja virtual</p><h2>Módulos testados e revisados, com entrega</h2><p>Consulte as possibilidades de programação na sua compra.</p></div><p class="bts">${btnLoja('btn')}${btnWa('Perguntar no WhatsApp', 'btn btn-linha')}</p></section>
</div>
` + rodape(v);
  pag.instalacoes = head(v, 'instalacoes', 'Instalações', 'Oficina e laboratório de eletrônica da Velochip em Sorocaba, com tour virtual de 360°.') + topo(v, 'instalacoes') + cab('Instalações', 'Oficina e laboratório no mesmo endereço', 'oficina2') + `
<div class="in">
<p class="intro">O carro entra pelo portão da R. Melvin Jones e é diagnosticado no salão da oficina. Os módulos seguem para as bancadas do laboratório de eletrônica, onde são reparados, testados e programados.</p>
${galeriaOficina()}
${tourBox()}
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Velochip: ${E.rua}, ${E.bairro}, Sorocaba. WhatsApp ${E.cel}, telefone ${E.fone}, ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Conte o que o painel está mostrando', 'termica') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}${redes()}<div class="os"><p class="k">Já é cliente?</p><h2>Acompanhe sua ordem de serviço</h2>${formOS()}</div></div><div><h2 class="form-tit">Peça um orçamento</h2>${formOrcamento()}</div></section>
<section class="mapa-pag">${mapaFrame}</section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></div><div class="trilha" aria-hidden="true"></div></section>`;
  pag.index = head(v, 'index', '', 'Reparo, venda e programação de módulos eletrônicos, airbag, ABS, injeção e painéis em Sorocaba, desde 2003. Programação online com aparelhos originais de montadora.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Eletrônica automotiva · Sorocaba · desde 2003</p><h1>Módulos eletrônicos reparados, testados e reprogramados.</h1><p>Airbag, ABS, injeção, conforto e painéis de instrumentos. Programações online com aparelhos originais de montadora, para nacionais e importados.</p>
  <p class="bts">${btnWa()}${btnTel()}</p></div>
  <figure class="hero-a-foto">${foto('lab')}<figcaption>Laboratório de eletrônica da Velochip</figcaption></figure>
</div>
<div class="in"><ul class="codigos">${sistemas.map(s => `<li><a href="${link(v, 'servicos')}#${s.id}"><b>${s.cod}</b><span>${s.t}</span></a></li>`).join('')}</ul></div></section>
<section class="in duas espec-a"><div><p class="k">Nossa especialidade</p><h2>O módulo sai do carro, passa pela bancada e volta pronto</h2><p>${especialidade}</p><a class="link-seta" href="${link(v, 'a-velochip')}">Conheça a Velochip ${ic('seta')}</a></div>${listaFazemos()}</section>
<section class="faixa-a"><div class="in faixa-a-in">${foto('termica', 'fa1')}${foto('scanner', 'fa2')}${foto('bancada', 'fa3')}</div></section>
<section class="in bloco"><header class="tit"><p class="k">Sistemas</p><h2>O que atendemos</h2><p>${diag}</p></header>${listaSistemas()}<a class="link-seta" href="${link(v, 'servicos')}">Todos os serviços ${ic('seta')}</a></section>
<section class="oficina-a"><figure>${foto('oficina1')}</figure><div class="in"><div class="oficina-a-txt"><p class="k">Instalações</p><h2>Oficina e laboratório no mesmo endereço</h2><p>Visite a Velochip pelo tour virtual de 360° ou venha até a R. Melvin Jones, na Vila Tortelli.</p><p class="bts"><a class="btn btn-linha" href="${link(v, 'instalacoes')}">Ver instalações</a><a class="btn btn-linha" href="${E.tour}" ${ext}>${ic('ext')}Tour 360°</a></p></div></div></section>
<section class="in cta-a"><div><p class="k">Orçamento</p><h2>Conte o que está acontecendo com o carro</h2><p>Luz acesa no painel, módulo para reparo ou programação, peça que você procura. Responda pelo WhatsApp ou ligue.</p><p class="bts">${btnWa()}${btnLoja()}</p></div>${contatoLista()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Velochip, em Sorocaba desde 2003: reparo, venda e programação online de módulos de airbag, ABS, injeção, conforto e painéis, para nacionais e importados.') + topo(v, 'index') + `
<section class="hero-b">${img('circuito', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in">
  <p class="k">Sorocaba · desde 2003</p><h1>A eletrônica do seu carro, de volta ao normal.</h1><p>Reparo e venda de módulos eletrônicos e sistemas de airbag, freios e conforto automotivo: reprogramando, atualizando e reinstalando.</p>
  <p class="bts">${btnWa()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div></section>
<section class="selo-b"><div class="in selo-b-in"><p><b>2003</b><span>em Sorocaba</span></p><p><b>5</b><span>sistemas eletrônicos</span></p><p><b>100%</b><span>das peças testadas e revisadas</span></p><p><b>Online</b><span>programação com aparelhos originais de montadora</span></p></div></section>
<section class="sist-b"><div class="in"><header class="tit"><p class="k">Sistemas</p><h2>Do airbag ao painel de instrumentos</h2></header>${listaSistemas('sist-linhas')}</div></section>
<section class="in duas fotos-b"><div class="fotos-b-g">${foto('scanner', 'fb1')}${foto('termica', 'fb2')}</div><div><p class="k">Diagnóstico</p><h2>Falhas em circuitos elétricos e eletrônicos</h2><p>${diag}</p>${blocoPilares()}</div></section>
<section class="pano-b">${img('oficina3')}<div class="in pano-b-in"><p class="k">Instalações</p><h2>Oficina e laboratório no mesmo endereço</h2><p class="bts"><a class="btn" href="${link(v, 'instalacoes')}">Ver instalações</a><a class="btn btn-linha" href="${E.tour}" ${ext}>${ic('ext')}Tour 360°</a></p></div></section>
<section class="in duas loja-b"><div><p class="k">Loja virtual</p><h2>Módulos testados e revisados</h2><p>Compre pela loja virtual da Velochip e consulte as possibilidades de programação na sua compra.</p><p class="bts">${btnLoja('btn')}</p></div><div><p class="k">Atendimento</p><h2>Fale com a Velochip</h2>${contatoLista()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#d7141f', fundo: '#0f2a4a', claro: '#f3f5f8',
  fonteTitulo: "'Reddit Sans',system-ui,sans-serif", fonteTexto: "'Reddit Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara como o laboratório da Velochip, em branco, azul-marinho e o vermelho do logo. Os sistemas aparecem pelos seus códigos (ABS, SRS, ECM) e a página abre na bancada de eletrônica.', pontos: ['Laboratório e oficina reais em destaque', 'Sistemas pelos códigos técnicos', 'WhatsApp e loja virtual sempre à mão'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Abre na arte de circuito da própria Velochip, em azul-marinho, e alterna faixas claras e escuras. Números grandes, sistemas em linhas e a oficina em panorama.', pontos: ['A arte de circuito da marca na abertura', 'Números: 2003, 5 sistemas, peças testadas', 'Tour 360° e loja virtual'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
