// Car System (Av. Farrapos, São Geraldo, Porto Alegre/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/carsystempoa/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs carsystempoa https://www.carsystempoa.com.br/)
// Textos, serviços, horários, contatos, avaliações e imagens tirados do site atual (carsystempoa.com.br, Builderall).
// Endereço tirado do mapa do Google incorporado no próprio site. Logo redesenhado em vetor a partir do PNG do topo (_origem/logo.svg).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Car System', curto: 'Car System', url: 'https://carsystempoa.overtus.com.br/', antigo: 'https://www.carsystempoa.com.br/',
  fone: '(51) 3398-8925', waNum: '555133988925', email: 'manutencao@carsystempoa.com.br',
  rua: 'Av. Farrapos, 4765', bairro: 'São Geraldo', cidade: 'Porto Alegre/RS', cep: '90220-007',
  chamada: 'Serviços de chapeação, pintura, martelinho de ouro e estética automotiva premium em Porto Alegre',
  horario: 'Segunda a sexta, das 8h às 12h e das 13h15 às 18h',
  horarioCurto: 'Seg. a sex., 8h–12h e 13h15–18h',
  ano: 'Veículos a partir do ano 2015',
  sobre: 'A Carsystem está no ramo desde 1988, sempre com uma equipe de profissionais qualificados e comprometidos em atender as necessidades de nossos clientes.',
  publico: 'Oferecemos todos os serviços automotivos tanto para empresas como para particulares.',
  marcas: 'Trabalhamos com todas as marcas de veículos nacionais e importados.',
};
const servicos = [
  { id: 'estetica', ic: 'estrela', t: 'Estética automotiva', d: 'Realce o brilho e remova riscos leves, manchas e imperfeições, deixando a pintura renovada, protegida e com aspecto de zero km.' },
  { id: 'chapeacao', ic: 'chave', t: 'Chapeação automotiva', d: 'Serviço especializado na recuperação da lataria do veículo após colisões ou amassados, deixando-o pronto para a pintura.' },
  { id: 'pintura', ic: 'gota', t: 'Pintura automotiva', d: 'Laboratório próprio e serviço completo de repintura automotiva, com acabamento de alta qualidade e cores originais.' },
  { id: 'espelhamento', ic: 'escudo', t: 'Espelhamento e vitrificação', d: 'O espelhamento devolve o brilho e a profundidade da cor; a vitrificação forma uma camada protetora contra sol, chuva e sujeira.' },
  { id: 'higienizacao', ic: 'floco', t: 'Higienização de veículos', d: 'Limpeza profunda de bancos, carpetes, painéis e do ar-condicionado, eliminando sujeiras, odores e bactérias do seu carro.' },
  { id: 'martelinho', ic: 'carro', t: 'Martelinho de ouro', d: 'Remove pequenos amassados sem danificar a pintura original, restaurando a aparência do carro com rapidez e precisão.' },
];
// Avaliações publicadas no site atual (como imagens). Mantidas as que não citam outra cidade nem reclamação.
const avaliacoes = [
  { n: 'Ton Bellíssimo', t: 'Preços acessíveis, serviço de qualidade com uma equipe qualificada. Recomendo.' },
  { n: 'Guilherme Borges', t: 'Muito bom atendimento, fizeram o serviço com praticidade e preço justo.' },
  { n: 'Vinicius Souza', t: 'Fiz uma revisão geral na parte mecânica e algumas pinturas. Serviço top! Recomendo.' },
  { n: 'Djonni Vinicios', t: 'Pessoal muito profissional, em todos os setores, desde a lavagem até a montagem, todos fazem seus trabalhos com precisão e boa vontade!' },
];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'sobre', nome: 'Sobre nós' }, { slug: 'avaliacoes', nome: 'Avaliações' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Lataria e cor', b: 'Desde 1988' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,700;0,900;1,800;1,900&family=Mulish:wght@400;600;700&family=League+Spartan:wght@600;700;800&family=Lato:wght@400;700&display=swap';
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#d50101', b: '#d50101' };
const tel = telHref(E.fone);
const wa = waHref(E.waNum, 'Olá! Vim pelo site da Car System e gostaria de um orçamento.');
const mapsQ = encodeURIComponent('Car System oficina mecânica, Av. Farrapos, 4765, São Geraldo, Porto Alegre RS');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const altS = Object.fromEntries(servicos.map(s => [s.id, s.t]));
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(altS[n] || 'Salão da oficina Car System')}" width="900" height="640" loading="lazy" decoding="async"${extra}>`;
const imgOficina = (extra = '') => `<img src="/assets/img/oficina.webp" srcset="/assets/img/oficina-m.webp 900w, /assets/img/oficina.webp 1500w" sizes="100vw" alt="Salão da Car System, com carros em reparo e elevadores" width="1500" height="844" decoding="async"${extra}>`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Chapeação, pintura e estética automotiva em Porto Alegre` : `${titulo} | ${E.curto}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site da Car System.">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label></div>
  <label>Veículo (modelo e ano)<input name="veiculo" required placeholder="Ex.: Onix 2019"></label>
  <label>Serviço<select name="servico">${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Outro</option></select></label>
  <label>Conte o que precisa<textarea name="mensagem" rows="4" placeholder="Amassado na porta, risco no para-choque, polimento..."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">O botão abre o WhatsApp com a mensagem pronta. Se preferir, ligue: <a href="${tel}">${E.fone}</a>.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>Telefone e WhatsApp</strong><a href="${wa}" ${ext}>${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>${E.horario}</span></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Car System na Av. Farrapos, 4765" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Car System, página inicial"><img src="/assets/logo.webp" alt="Car System" width="1000" height="241"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa}" ${ext}>${icWa()}<span>Orçamento</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Car System" width="1000" height="241" loading="lazy"><p>Chapeação, pintura, martelinho de ouro e estética automotiva na Av. Farrapos, em Porto Alegre. No ramo desde 1988.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa}" ${ext}>${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
      <li>${ic('relogio')}<span>${E.horarioCurto}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Car System. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa}" ${ext} aria-label="Conversar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const cartaoAval = a => `<figure class="aval sobe"><div class="estrelas" aria-label="5 estrelas">${ic('estrela').repeat(5)}</div><blockquote>${a.t}</blockquote><figcaption>${a.n}</figcaption></figure>`;

function comum(v, pag, cab) {
  pag.servicos = head(v, 'servicos', 'Serviços', 'Estética automotiva, chapeação, pintura com laboratório próprio, espelhamento e vitrificação, higienização e martelinho de ouro na Av. Farrapos, Porto Alegre.') + topo(v, 'servicos') + cab('Serviços', 'Da lataria ao brilho final', 'pintura') + `
<div class="in">
<p class="intro">${E.marcas} Atendemos empresas e particulares, com foco em ${E.ano.toLowerCase()}.</p>
<section class="servs-pag">${servicos.map((s, i) => `<article class="serv-pag sobe" id="${s.id}"><a href="/assets/img/${s.id}.webp" data-foto="${esc(s.t)}" class="serv-pag-foto">${img(s.id)}</a><div class="serv-pag-txt"><p class="n">${String(i + 1).padStart(2, '0')}</p><h2>${s.t}</h2><p>${s.d}</p><a class="link-seta" href="${wa}" ${ext}>Pedir orçamento ${ic('seta')}</a></div></article>`).join('')}</section>
</div>
<section class="faixa-cta"><div class="in faixa-cta-in"><h2>Mande uma foto do estrago pelo WhatsApp</h2><p class="bts"><a class="btn btn-claro" href="${wa}" ${ext}>${icWa()}${E.fone}</a></p></div></section>
` + rodape(v);
  pag.sobre = head(v, 'sobre', 'Sobre nós', `${E.sobre} ${E.publico}`) + topo(v, 'sobre') + cab('Sobre nós', 'Atuamos desde 1988 na recuperação automotiva', 'martelinho') + `
<div class="in">
<section class="historia"><p class="lead">${E.sobre}</p><p>${E.publico} ${E.marcas}</p>
<dl class="dados">
  <div><dt>1988</dt><dd>Ano em que começamos na recuperação automotiva</dd></div>
  <div><dt>2015+</dt><dd>${E.ano}</dd></div>
  <div><dt>6</dt><dd>Serviços, da chapeação à higienização</dd></div>
</dl></section>
</div>
<figure class="oficina-larga"><a href="/assets/img/oficina.webp" data-foto="Salão da Car System">${imgOficina(' loading="lazy"')}</a><figcaption class="in">O salão da oficina, na Av. Farrapos.</figcaption></figure>
<div class="in">
<section class="onde"><div><p class="k">Onde estamos</p><h2>${E.rua}, ${E.bairro}</h2><p>${E.cidade}, CEP ${E.cep}. ${E.horario}.</p><p class="bts"><a class="btn" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a><a class="btn btn-linha" href="${wa}" ${ext}>${icWa()}Agendar pelo WhatsApp</a></p></div>${mapaFrame}</section>
</div>
` + rodape(v);
  pag.avaliacoes = head(v, 'avaliacoes', 'Avaliações', 'O que dizem alguns dos clientes da Car System, oficina de chapeação, pintura e estética automotiva em Porto Alegre.') + topo(v, 'avaliacoes') + cab('Avaliações de clientes', 'Veja o que dizem alguns de nossos clientes', 'espelhamento') + `
<div class="in">
<section class="avals">${avaliacoes.map(cartaoAval).join('')}</section>
<p class="cta-linha"><a class="btn" href="${wa}" ${ext}>${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Car System: ${E.rua}, ${E.bairro}, Porto Alegre. Telefone e WhatsApp ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Entre em contato e solicite orçamento', 'chapeacao') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Conte o que o carro precisa</h2><p>Mande o modelo, o ano e o serviço. Respondemos o mais breve possível.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="corte">${img(f, ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', `${E.chamada}. ${E.rua}, ${E.bairro}. Desde 1988.`) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Av. Farrapos · Porto Alegre · desde 1988</p><h1>Chapeação, pintura e estética automotiva premium</h1><p>Recuperamos a lataria, repintamos com cores originais feitas no nosso laboratório e devolvemos o brilho de zero km. ${E.ano}.</p>
  <p class="bts"><a class="btn" href="${wa}" ${ext}>${icWa()}Solicitar orçamento</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div>
  <figure class="hero-a-foto corte">${img('pintura', ' loading="eager" fetchpriority="high"')}</figure>
</div>
<div class="info-a"><div class="in"><ul>
  <li>${ic('pin')}<span><b>${E.rua}</b>${E.bairro}, Porto Alegre</span></li>
  <li>${ic('relogio')}<span><b>Seg. a sex.</b>8h–12h e 13h15–18h</span></li>
  <li>${icWa()}<span><b>Telefone e WhatsApp</b><a href="${wa}" ${ext}>${E.fone}</a></span></li>
</ul></div></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços premium</p><h2>Seis serviços, do amassado ao acabamento</h2></header>
<ol class="servs-a-lista">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${s.t}</h3><p>${s.d}</p></a></li>`).join('')}</ol></section>
<section class="lab-a"><div class="in lab-a-in"><figure class="corte">${img('chapeacao')}</figure><div><p class="k">Laboratório próprio</p><h2>Cor original, acerto no tom</h2><p>Serviço completo de repintura automotiva, com acabamento de alta qualidade e cores originais. Da chapeação, a peça segue pronta para a pintura, feita aqui mesmo.</p>
<ul class="amostras" aria-hidden="true"><li></li><li></li><li></li><li></li><li></li><li></li></ul>
<a class="link-seta" href="${link(v, 'servicos')}#pintura">Pintura automotiva ${ic('seta')}</a></div></div></section>
<section class="oficina-a"><figure>${imgOficina(' loading="lazy"')}</figure><div class="in oficina-a-txt"><p class="k">Sobre nós</p><h2>No ramo desde 1988</h2><p>${E.sobre}</p><a class="link-seta" href="${link(v, 'sobre')}">Conheça a Car System ${ic('seta')}</a></div></section>
<section class="in avals-a"><header class="tit"><p class="k">Avaliações</p><h2>O que dizem nossos clientes</h2></header><div class="avals">${avaliacoes.slice(0, 3).map(cartaoAval).join('')}</div><a class="link-seta" href="${link(v, 'avaliacoes')}">Ver todas ${ic('seta')}</a></section>
<section class="in cta-a"><div><h2>Agendamento por WhatsApp</h2><p>Mande uma foto do amassado ou do risco e receba o orçamento.</p></div><p class="bts"><a class="btn" href="${wa}" ${ext}>${icWa()}${E.fone}</a><a class="btn btn-linha" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a></p></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div></div><div class="cab-b-foto">${img(f, ' loading="eager"')}</div></section>`;
  pag.index = head(v, 'index', '', `${E.chamada}. ${E.rua}, ${E.bairro}. Desde 1988.`) + topo(v, 'index') + `
<section class="hero-b"><div class="hero-b-txt"><div class="hero-b-txt-in">
  <p class="k">Porto Alegre · desde 1988</p><h1>Lataria, pintura e brilho com aspecto de zero km</h1><p>Chapeação, pintura, martelinho de ouro e estética automotiva premium. ${E.ano}, nacionais e importados.</p>
  <p class="bts"><a class="btn btn-claro" href="${wa}" ${ext}>${icWa()}Solicitar orçamento</a><a class="btn btn-linha" href="${tel}">${ic('tel')}${E.fone}</a></p></div></div>
  <figure class="hero-b-carro"><img src="/assets/img/carro.webp" alt="Carro vermelho com a placa da Car System" width="546" height="527" fetchpriority="high"></figure>
</section>
<section class="in servs-b"><header class="tit-b"><p class="k">Serviços premium</p><h2>O que fazemos</h2></header>
<div class="servs-b-grade">${servicos.map((s, i) => `<a class="serv-b sobe" href="${link(v, 'servicos')}#${s.id}">${img(s.id)}<span class="serv-b-txt"><b>${String(i + 1).padStart(2, '0')}</b><strong>${s.t}</strong></span></a>`).join('')}</div></section>
<section class="ano-b"><div class="in ano-b-in"><p class="ano-b-num" aria-hidden="true">1988</p><div><p class="k">Sobre nós</p><h2>Atuamos desde 1988 na recuperação automotiva</h2><p>${E.sobre} ${E.publico}</p><a class="link-seta" href="${link(v, 'sobre')}">A Car System ${ic('seta')}</a></div></div></section>
<section class="in avals-b"><header class="tit-b"><p class="k">Avaliações de clientes</p><h2>Quem já deixou o carro aqui</h2></header><div class="avals">${avaliacoes.slice(1, 4).map(cartaoAval).join('')}</div></section>
<section class="oficina-b"><figure>${imgOficina(' loading="lazy"')}</figure><div class="oficina-b-caixa"><p class="k">Onde estamos</p><h2>${E.rua}</h2><p>${E.bairro}, Porto Alegre. ${E.horarioCurto}.</p><p class="bts"><a class="btn" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a><a class="btn btn-linha" href="${wa}" ${ext}>${icWa()}Agendar</a></p></div></section>
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
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#d50101', fundo: '#1c1c1c', claro: '#f3f3f1',
  fonteTitulo: "'Red Hat Display',system-ui,sans-serif", fonteTexto: "'Mulish',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com o vermelho do logo e fotos cortadas na diagonal, como a marca em "S". Destaca o laboratório de pintura próprio e os seis serviços em lista numerada.', pontos: ['Endereço, horário e WhatsApp logo na abertura', 'Laboratório de cor próprio em destaque', 'Avaliações reais de clientes'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais forte: abre num bloco vermelho com o carro da Car System, usa títulos em caixa alta e marca o ano de 1988 em destaque, com o salão da oficina no fim.', pontos: ['Serviços em grade com foto', '"Desde 1988" em destaque', 'Agendamento pelo WhatsApp sempre à vista'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
