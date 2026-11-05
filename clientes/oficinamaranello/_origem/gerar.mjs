// Maranello Motors (Ribeirânia, Ribeirão Preto/SP). Gera public/{a,b}/ e a página de escolha.
// node clientes/oficinamaranello/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs oficinamaranello http://oficinamaranello.com.br/)
// Textos tirados do site atual (oficinamaranello.com.br, Mobirise, © 2022). Fotos: só as reais da oficina (assets/images/estrutura-*, quem-somos, manutencao, alinhamento, banner-mb).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Maranello Motors', curto: 'Maranello Motors', url: 'https://oficinamaranello.overtus.com.br/', antigo: 'http://oficinamaranello.com.br/',
  fones: ['(16) 3877-5700', '(16) 3877-5900'], cel: '(16) 99298-5852', wa: '5516992985852',
  email: 'contato@oficinamaranello.com.br',
  rua: 'Av. Costábile Romano, 2465', bairro: 'Ribeirânia', cidade: 'Ribeirão Preto/SP',
  insta: 'https://www.instagram.com/maranellomotorsrp/', face: 'https://www.facebook.com/OficinaMaranelloMotors/',
};
const marcas = ['BMW', 'Mercedes', 'Audi', 'Land Rover', 'Volvo', 'Linha francesa', 'Linha japonesa', 'Nacionais'];
const servicos = [
  { id: 'manutencao', t: 'Manutenção preventiva e corretiva', f: 'manutencao',
    d: 'Revisões periódicas em toda a linha de veículos importados e nacionais, seguindo todos os critérios da montadora.',
    sub: 'Oferecemos serviços como', itens: ['Ajustes e programação de painel', 'Substituição de óleos e filtros', 'Substituição de freios e discos', 'Substituição de componentes de suspensão', 'Troca de filtro e higienização de ar-condicionado', 'Checagem da eletrônica do veículo', 'Peças padrão original de fábrica, com garantia'] },
  { id: 'alinhamento', t: 'Alinhamento e balanceamento 3D', f: 'alinhamento',
    d: 'Alinhamento com a precisão da geometria automotiva 3D e balanceamento digital das rodas.',
    sub: 'Por que alinhar e balancear', itens: ['Aumenta a durabilidade das peças da suspensão', 'Diminui o desgaste irregular dos pneus', 'Ajuda a baixar o consumo de combustível', 'Deixa a direção mais confortável', 'Melhora a estabilidade, principalmente nas curvas'] },
  { id: 'assessoria', t: 'Assessoria para compra de veículos', f: 'recepcao',
    d: 'Avaliamos o carro novo ou usado que você pretende comprar, para garantir segurança e procedência na compra.',
    sub: 'Conferimos itens como', itens: ['Mecânica', 'Integridade estrutural', 'Estética', 'Eletrônica', 'Avaliação do valor de mercado', 'Medição de pintura, para saber se o carro já foi retocado'] },
  { id: 'reprogramacao', t: 'Reprogramação de potência', f: 'boxes',
    d: 'Tecnologia para reprogramar a potência do seu veículo: ganho de potência e torque, mais desempenho e melhor dirigibilidade.',
    sub: 'Benefícios', itens: ['Performance e agilidade', 'Eficiência energética', 'Tendência de menor consumo de combustível, conforme o uso'] },
  { id: 'escapes', t: 'Escapes personalizados', f: 'elevador',
    d: 'Escapamentos feitos de acordo com o carro e o gosto de cada cliente, com o compromisso da melhor qualidade.',
    sub: 'Para todas as marcas', itens: ['Importados e nacionais', 'BMW, Mercedes-Benz, Audi, Porsche e outras'] },
  { id: 'diagnostico', t: 'Scanner de diagnóstico e injeção eletrônica', f: 'salao',
    d: 'Diagnóstico e manutenção da injeção eletrônica, para manter a central de informações, os sensores e os atuadores funcionando corretamente.',
    sub: 'Revisamos itens como', itens: ['Central de informações e controle', 'Sensores', 'Atuadores'] },
];
const sistemas = ['Motor e câmbio', 'Injeção eletrônica', 'Freios e suspensão', 'Troca de óleo e filtros', 'Sistema de arrefecimento'];
const quandoAlinhar = [
  'Quando o carro não segue reto e puxa ligeiramente para um dos lados.',
  'Se você roda sempre em ruas irregulares, com buracos, subidas e descidas, a necessidade de alinhar e balancear aumenta.',
  'Conferir a pressão dos pneus com frequência adia a necessidade de alinhar ou balancear.',
  'Volante tremendo demais indica algo errado nas rodas. Fique de olho.',
];
const fotos = {
  salao: 'O salão da oficina, com a recepção envidraçada e o letreiro Maranello',
  boxes: 'Boxes com elevadores vermelhos e piso claro',
  elevador: 'BMW no elevador durante o serviço',
  fachada: 'A fachada na Av. Costábile Romano, com o totem vermelho',
  fachada2: 'A sede da Maranello Motors vista da avenida',
  recepcao: 'Mercedes-AMG GT na recepção envidraçada',
  manutencao: 'Mecânico trabalhando no motor de uma BMW',
  alinhamento: 'Alinhamento 3D com os sensores nas rodas',
  estrada: 'Mercedes-Benz com a placa Maranello na estrada',
};
const tam = { salao: [861, 574], boxes: [861, 574], elevador: [861, 574], fachada: [1280, 853], fachada2: [861, 574], recepcao: [1600, 1067], manutencao: [1600, 1067], alinhamento: [1600, 1067], estrada: [1600, 900] };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'sobre', nome: 'A Maranello' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'estrutura', nome: 'Estrutura' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Piso de oficina', b: 'Totem vermelho' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Geologica:wght@300;400;500;600&family=Funnel+Display:wght@500;700;800&family=Funnel+Sans:wght@400;500;600&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#e3131b', b: '#2b2c2e' };
const tel = telHref(E.fones[0]);
const wa = waHref(E.wa, 'Olá! Vim pelo site e quero agendar um serviço.');
const mapsQ = encodeURIComponent('Av. Costábile Romano, 2465, Ribeirânia, Ribeirão Preto SP');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Oficina para importados e nacionais em Ribeirão Preto` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnWa = (txt = 'Agendar pelo WhatsApp', cls = 'btn') => `<a class="${cls}" href="${wa}" ${ext}>${icWa()}${txt}</a>`;
const btnTel = (cls = 'btn btn-linha') => `<a class="${cls}" href="${tel}">${ic('tel')}${E.fones[0]}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;
const lstFones = () => `<a href="${tel}">${E.fones[0]}</a><a href="${telHref(E.fones[1])}">${E.fones[1]}</a>`;

const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa}" ${ext}>${E.cel}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefones</strong>${lstFones()}</div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Maranello Motors na Av. Costábile Romano, 2465" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site da Maranello Motors." novalidate>
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Telefone*<input name="fone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Carro (marca e modelo)<input name="carro" placeholder="Ex.: BMW 320i 2019"></label><label>Serviço<select name="servico"><option>Escolha um serviço</option>${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Outro</option></select></label></div>
  <label>Mensagem<textarea name="msg" rows="4"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp da oficina, ${E.cel}.</p>
</form>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Maranello Motors, página inicial"><img src="/assets/${logo}.webp" alt="Maranello Motors" width="880" height="124"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa}" ${ext}>${icWa()}<span>Agendar</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Maranello Motors" width="880" height="124" loading="lazy"><p>Oficina mecânica especializada em veículos importados e nacionais, na Ribeirânia, em Ribeirão Preto.</p>
      <p class="rod-redes"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a><span>#MaranelloMotors</span></p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa}" ${ext}>${E.cel}</a></li>
      <li>${ic('tel')}<span>${E.fones.join(' · ')}</span></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Maranello Motors. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa}" ${ext} aria-label="Falar com a Maranello Motors no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const servDetalhe = (s, i) => `<section class="sd sobe" id="${s.id}"><figure class="sd-foto">${foto(s.f)}</figure><div class="sd-txt"><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${s.t}</h2><p>${s.d}</p><h3>${s.sub}</h3><ul class="lista-check">${s.itens.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>${s.id === 'alinhamento' ? `<h3>Quando fazer</h3><p class="sd-nota">Não existe uma quilometragem certa para alinhar e balancear. Algumas dicas ajudam a ter uma ideia:</p><ul class="lista-quando">${quandoAlinhar.map(q => `<li>${q}</li>`).join('')}</ul>` : ''}<p class="bts">${btnWa('Agendar este serviço')}</p></div></section>`;

function comum(v, pag, cab) {
  pag.sobre = head(v, 'sobre', 'A Maranello', 'Especializada em BMW, Mercedes, Audi, Land Rover, Volvo e nas linhas francesa, japonesa e nacional. Uma das oficinas mais equipadas da região de Ribeirão Preto.') + topo(v, 'sobre') + cab('A Maranello Motors', 'Importados e nacionais, com o mesmo cuidado', 'recepcao') + `
<div class="in">
<section class="sobre-pag"><div class="sobre-txt"><p class="lead">Somos especializados em manutenção de veículos importados e nacionais. Temos à disposição uma das mais modernas e equipadas oficinas mecânicas da região de Ribeirão Preto.</p><p>Contamos com profissionais treinados, atualizados e empenhados em sempre fazer o melhor serviço para nossos clientes.</p><p class="bts">${btnWa('Agendar uma visita')}${btnMapa()}</p></div>
<aside class="marcas-box"><h2>Especializada em</h2><ul class="marcas">${marcas.map(m => `<li>${m}</li>`).join('')}</ul></aside></section>
<section class="galeria g-sobre">${['salao', 'fachada2', 'boxes'].map(f => `<figure class="sobe f-${f}">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<section class="faca-visita"><div><p class="k">Faça uma visita</p><h2>${E.rua}, ${E.bairro}</h2><p>${E.cidade}</p></div><p class="bts">${btnMapa('btn')}${btnTel()}</p></section>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Manutenção preventiva e corretiva, alinhamento e balanceamento 3D, assessoria na compra de veículos, reprogramação de potência, escapes personalizados e injeção eletrônica.') + topo(v, 'servicos') + cab('Serviços', 'Serviços especializados para o seu carro', 'estrada') + `
<div class="in">
<nav class="indice" aria-label="Serviços nesta página"><ol>${servicos.map((s, i) => `<li><a href="#${s.id}"><span>${String(i + 1).padStart(2, '0')}</span>${s.t}</a></li>`).join('')}</ol></nav>
<div class="sd-lista">${servicos.map(servDetalhe).join('')}</div>
<section class="sistemas"><h2>Também cuidamos de</h2><ul>${sistemas.map(s => `<li>${s}</li>`).join('')}</ul></section>
</div>
` + rodape(v);
  pag.estrutura = head(v, 'estrutura', 'Estrutura', 'Conheça a estrutura da Maranello Motors: salão com recepção envidraçada, boxes com elevadores e alinhamento 3D, na Av. Costábile Romano, 2465, em Ribeirão Preto.') + topo(v, 'estrutura') + cab('Estrutura', 'Uma oficina totalmente moderna', 'salao') + `
<div class="in">
<p class="intro">A Maranello Motors é uma oficina totalmente moderna e conta com profissionais qualificados para entregar sempre o melhor serviço para você.</p>
<section class="galeria g-estrutura">${['fachada', 'salao', 'boxes', 'elevador', 'alinhamento', 'fachada2', 'recepcao', 'manutencao'].map(f => `<figure class="sobe f-${f}">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<p class="cta-linha">${btnWa('Agendar uma visita')}${btnMapa()}</p>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Maranello Motors: ${E.rua}, ${E.bairro}, ${E.cidade}. WhatsApp ${E.cel}, telefones ${E.fones.join(' e ')}.`) + topo(v, 'contato') + cab('Contato', 'Agende seu serviço', 'fachada') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}${mapaFrame}</div><div class="contato-form"><h2>Envie uma mensagem</h2><p>Conte qual é o carro e o que ele precisa. Respondemos pelo WhatsApp.</p>${formulario()}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div></div><figure class="tit-a-foto f-${f}">${img(f, ' loading="eager"')}</figure></section>`;
  pag.index = head(v, 'index', '', 'Oficina mecânica especializada em veículos importados e nacionais em Ribeirão Preto: manutenção, alinhamento 3D, injeção eletrônica, reprogramação de potência e escapes personalizados.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Ribeirânia · Ribeirão Preto</p><h1>Oficina mecânica para <em>importados</em> e nacionais</h1><p>Uma das oficinas mais modernas e equipadas da região, com profissionais treinados e atualizados para cuidar do seu carro.</p>
  <p class="bts">${btnWa()}${btnTel()}</p></div>
  <figure class="hero-a-foto">${foto('salao')}</figure>
</div>
<div class="faixa-a"><div class="in"><p>Especializada em</p><ul>${marcas.map(m => `<li>${m}</li>`).join('')}</ul></div></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>Do preventivo à performance</h2></header>
<ol class="servs-lista">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><span class="n">${String(i + 1).padStart(2, '0')}</span><strong>${s.t}</strong><span class="d">${s.d}</span>${ic('seta')}</a></li>`).join('')}</ol>
<p class="sist-a"><b>Também:</b> ${sistemas.join(' · ')}</p></section>
<section class="alinh-a"><div class="in alinh-a-in"><figure>${foto('alinhamento')}</figure><div><p class="k">Alinhamento e balanceamento 3D</p><h2>Geometria 3D e balanceamento digital</h2><p>O melhor equipamento para alinhar o seu carro com alta precisão. Por que fazer:</p><ul class="lista-check">${servicos[1].itens.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul><a class="link-seta" href="${link(v, 'servicos')}#alinhamento">Quando alinhar ${ic('seta')}</a></div></div></section>
<section class="in estr-a"><header class="tit"><p class="k">Estrutura</p><h2>Conheça a oficina</h2></header><div class="estr-a-grade">${foto('fachada', 'e1')}${foto('boxes', 'e2')}${foto('elevador', 'e3')}${foto('fachada2', 'e4')}</div><a class="link-seta" href="${link(v, 'estrutura')}">Ver todas as fotos ${ic('seta')}</a></section>
<section class="assess-a"><div class="in assess-a-in"><div><p class="k">Vai comprar um carro?</p><h2>Assessoria para compra de veículos</h2><p>${servicos[2].d}</p><p class="bts">${btnWa('Pedir uma avaliação')}</p></div><ul class="lista-check">${servicos[2].itens.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul></div></section>
<section class="in cta-a"><div><h2>Faça seu agendamento</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}. Telefones ${E.fones.join(' e ')}.</p></div><p class="bts">${btnWa()}${btnMapa()}</p></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b f-${f}">${img(f, ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', 'Maranello Motors, Ribeirão Preto: oficina para BMW, Mercedes, Audi, Land Rover, Volvo e nacionais. Alinhamento 3D, injeção eletrônica, reprogramação de potência e escapes sob medida.') + topo(v, 'index') + `
<section class="hero-b">${img('recepcao', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in">
  <p class="k">Av. Costábile Romano, 2465 · Ribeirão Preto</p><h1>Seu importado<br>em boas mãos.</h1><p>Oficina especializada em veículos importados e nacionais, com uma das estruturas mais completas da região.</p>
  <p class="bts">${btnWa()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div></section>
<section class="marcas-b"><div class="in"><p class="k">Especializada em</p><ul>${marcas.map(m => `<li>${m}</li>`).join('')}</ul></div></section>
<section class="in servs-b"><header class="tit-b"><p class="k">Serviços</p><h2>Seis especialidades</h2></header>
<div class="servs-b-grade">${servicos.map((s, i) => `<a class="sv-b sobe" href="${link(v, 'servicos')}#${s.id}"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${s.t}</h3><p>${s.d}</p></a>`).join('')}</div></section>
<section class="foto-b">${img('estrada')}<div class="in foto-b-in"><p>Escapes personalizados para BMW, Mercedes-Benz, Audi, Porsche e outras marcas. Reprogramação de potência para mais torque e dirigibilidade.</p><a class="link-seta" href="${link(v, 'servicos')}#reprogramacao">Performance ${ic('seta')}</a></div></section>
<section class="in estr-b"><div class="estr-b-txt"><p class="k">Estrutura</p><h2>Piso claro, elevadores vermelhos, equipamento atual</h2><p>A Maranello Motors é uma oficina totalmente moderna e conta com profissionais qualificados para entregar sempre o melhor serviço para você.</p><a class="link-seta" href="${link(v, 'estrutura')}">Conheça a oficina ${ic('seta')}</a></div><div class="estr-b-fotos">${foto('salao', 'b1')}${foto('boxes', 'b2')}${foto('elevador', 'b3')}</div></section>
<section class="sist-b"><div class="in"><h2>Também cuidamos de</h2><ul>${sistemas.map(s => `<li>${s}</li>`).join('')}</ul></div></section>
<section class="in cta-b"><div><h2>Faça seu agendamento</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}.<br>${E.fones.join(' · ')} · WhatsApp ${E.cel}</p></div><p class="bts">${btnWa()}${btnMapa()}</p></section>
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
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#e3131b', fundo: '#2b2c2e', claro: '#f2f2f0',
  fonteTitulo: "'Rajdhani',system-ui,sans-serif", fonteTexto: "'Geologica',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, no branco do piso da oficina e no vermelho do logo e das áreas dos elevadores. Abre com o salão envidraçado e as marcas em que a Maranello é especializada.', pontos: ['Os seis serviços em lista numerada', 'Alinhamento 3D e assessoria de compra em destaque', 'WhatsApp e telefones sempre à vista'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura, no grafite da fachada, com uma faixa vermelha vertical como o totem da entrada. Abre na foto do AMG na recepção com "Seu importado em boas mãos."', pontos: ['Foto grande da recepção na abertura', 'Seis especialidades numeradas', 'Performance: escapes e reprogramação'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
