// Studio Z Hair Design (Caxias do Sul/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/studioz/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs studioz https://studiozhairdesign.com.br/)
// O site atual (Adobe Muse) é todo em imagem: dados lidos das imagens topo/agenda/rodape; fotos recortadas de topo.jpg e cabelos.jpg.
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Studio Z Hair Design', url: 'https://studioz.overtus.com.br/', antigo: 'https://studiozhairdesign.com.br/',
  wa: '555432144182', fone: '(54) 3214-4182', email: 'atendimento@studiohairdesign.com.br', insta: 'studiozcaxias', face: 'StudioZHairDesign',
  rua: 'Rua La Salle, 753', cidade: 'Caxias do Sul - RS', cep: '95020-100',
  frase: 'Para quem quer ficar ainda mais bonita e nas mãos de quem entende de beleza.',
  sonho: 'Você sonha com cabelos elegantes e saudáveis, que parecem perfeitos, prontos para arrasar em qualquer ocasião? Vamos tornar o seu sonho realidade.',
};
const mapsQ = encodeURIComponent('Studio Z Hair Design, Rua La Salle, 753, Caxias do Sul RS');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const horarios = [['Terça', '9h às 20h'], ['Quarta', '9h às 20h'], ['Quinta', '9h às 20h'], ['Sexta', '9h às 20h'], ['Sábado', '9h às 20h']];
const servicos = [
  { id: 'mulher', t: 'Mulher', foto: 'corte', d: 'Corte, coloração, mechas, escova e tratamentos para deixar os fios bonitos e saudáveis.', itens: ['Corte', 'Coloração e mechas', 'Escova', 'Tratamentos e hidratação'] },
  { id: 'noiva', t: 'Dia da Noiva', foto: 'modelo', d: 'Cabelo e maquiagem para o grande dia, com tempo e atenção para cada detalhe.', itens: ['Penteado', 'Maquiagem', 'Preparação dos fios'] },
  { id: 'make', t: 'Make-up', foto: 'textura', d: 'Maquiagem para festas, formaturas, eventos e ensaios fotográficos.', itens: ['Maquiagem social', 'Eventos e formaturas'] },
  { id: 'barbearia', t: 'Barbearia', foto: 'lavatorio', d: 'Corte masculino e barba, no mesmo endereço.', itens: ['Corte masculino', 'Barba'] },
  { id: 'shop', t: 'Shop', foto: 'tratamento', d: 'Produtos profissionais para manter em casa o resultado do salão. Pergunte qual é o certo para o seu cabelo.', itens: ['Produtos profissionais', 'Indicação para o seu tipo de fio'] },
];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'studio', nome: 'O Studio' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Noir', b: 'Fio Claro' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Nunito:ital,wght@1,800;1,900&family=Allura&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site e gostaria de agendar um horário no Studio Z.') => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#111111', b: '#f5f2ee' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Salão de beleza em Caxias do Sul` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const LOGO = `<span class="logo" aria-hidden="true"><span class="logo-studio">Studio</span><span class="logo-z">Z</span><span class="logo-hd">Hair Design</span></span>`;
const tabelaHoras = () => `<ul class="horas">${horarios.map(h => `<li><span>${h[0]}</span><b>${h[1]}</b></li>`).join('')}<li class="obs">Último horário às 19h · domingo e segunda fechado</li></ul>`;

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Serviço<select name="servico">${servicos.map(s => `<option>${s.t}</option>`).join('')}</select></label><label>Dia que prefere<select name="dia">${horarios.map(h => `<option>${h[0]}</option>`).join('')}</select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="3" placeholder="Conte o que deseja fazer"></textarea></label>
  <button class="btn" type="submit">${icWa()}Pedir horário pelo WhatsApp</button>
  <p class="form-nota">Se preferir, ligue: ${E.fone}.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.cidade}</span><span>CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Ver no Google Maps</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="https://www.instagram.com/${E.insta}/" ${ext}>@${E.insta}</a></div></li>
  <li>${ic('face')}<div><strong>Facebook</strong><a href="https://www.facebook.com/${E.face}" ${ext}>/${E.face}</a></div></li>
  <li>${ic('check')}<div><strong>Pagamento</strong><span>Cartão de crédito e de débito</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa do Studio Z" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial">${LOGO}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="btn btn-topo" href="${telHref(E.fone)}">${ic('tel')}<span>Agendar</span></a>
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
    <div class="rod-marca">${LOGO}<p>${E.frase}</p><p class="redes"><a href="https://www.instagram.com/${E.insta}/" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="https://www.facebook.com/${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>Endereço</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.rua}<br>${E.cidade}, CEP ${E.cep}</span></li><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
    <div><h3>Horários</h3>${tabelaHoras()}</div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Studio Z Hair Design. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

function comum(v, pag, cab) {
  pag.studio = head(v, 'studio', 'O Studio', E.frase) + topo(v, 'studio') + cab('O Studio', 'Nas mãos de quem entende de beleza.', 'textura') + `
<div class="in"><section class="texto-pag"><div><p class="lead">${E.sonho}</p><p>O Studio Z Hair Design é um salão de beleza na ${E.rua}, em Caxias do Sul. Cabelo feminino, dia da noiva, make-up e barbearia no mesmo endereço, além de produtos profissionais para levar para casa.</p><p>O atendimento é com hora marcada, de terça a sábado, das 9h às 20h. Aceitamos cartão de crédito e de débito.</p><p class="bts"><a class="btn" href="${telHref(E.fone)}">${ic('tel')}Ligar e agendar</a><a class="link-seta" href="${link(v, 'servicos')}">Ver serviços ${ic('seta')}</a></p></div><figure>${img('modelo', 'Cabelo preso em rabo alto')}</figure></section>
<section class="pilares">${[['coracao', 'Cabelo', 'Corte, cor, mechas e tratamento.'], ['estrela', 'Noiva e make', 'Penteado e maquiagem para eventos.'], ['usuarios', 'Barbearia', 'Corte masculino e barba.'], ['pacote', 'Shop', 'Produtos profissionais para casa.']].map(x => `<div class="sobe">${ic(x[0])}<h3>${x[1]}</h3><p>${x[2]}</p></div>`).join('')}</section></div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Mulher, dia da noiva, make-up, barbearia e shop de produtos profissionais no Studio Z, em Caxias do Sul.') + topo(v, 'servicos') + cab('Serviços', 'Do corte ao grande dia.', 'corte') + `
<div class="in"><section class="servs">${servicos.map((s, i) => `<article class="serv sobe" id="${s.id}"><figure>${img(s.foto, s.t)}</figure><div><p class="num">0${i + 1}</p><h2>${s.t}</h2><p>${s.d}</p><ul class="itens">${s.itens.map(x => `<li>${x}</li>`).join('')}</ul><a class="link-seta" href="${wa(`Olá! Vim pelo site e gostaria de agendar: ${s.t}.`)}" ${ext}>Agendar ${ic('seta')}</a></div></article>`).join('')}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Studio Z Hair Design: ${E.rua}, ${E.cidade}. Telefone ${E.fone}. Terça a sábado, 9h às 20h.`) + topo(v, 'contato') + cab('Contato', 'Reserve o seu horário.', 'lavatorio') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Agendar</h2><p>Atendimento com hora marcada, de terça a sábado.</p>${formulario()}</div><div>${contatoLista()}<div class="horas-box"><h3>Horários</h3>${tabelaHoras()}</div>${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="tit-a">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.frase) + topo(v, 'index') + `
<section class="hero-a"><div class="hero-a-foto">${img('modelo', 'Cabelo preso em rabo alto, perfil', ' loading="eager" fetchpriority="high"')}</div><div class="in hero-a-in"><p class="script">Elegante</p><h1>Cabelo, make e noiva<br>no Studio Z.</h1><p>${E.frase}</p><p class="bts"><a class="btn" href="${telHref(E.fone)}">${ic('tel')}Ligar e agendar</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div></section>
<section class="agenda-a"><div class="in"><div><p class="script">Agenda</p><p>Reserva de horário sob consulta</p><a class="btn" href="${link(v, 'contato')}">Reservar horário</a></div><div><p class="script">Horários</p><p class="dias">${['Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => `<span>${d}</span>`).join('')}</p><p><b>9h às 20h</b> · último horário 19h</p></div><div><p class="script">Ligue</p><p><a class="fone-grande" href="${telHref(E.fone)}">${E.fone}</a></p><a class="btn btn-linha" href="${wa()}" ${ext}>${icWa()}WhatsApp</a></div></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>O que você encontra aqui</h2></header><ol>${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><b>0${i + 1}</b><span>${s.t}</span><small>${s.d}</small>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="sonho-a"><div class="in sonho-a-in"><div class="mosaico">${['textura', 'lavatorio', 'tratamento', 'corte'].map((f, i) => `<figure class="m${i + 1}">${img(f, '')}</figure>`).join('')}</div><div><p class="script">Seu sonho</p><h2>${E.sonho}</h2><a class="btn" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></div></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.frase) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div><p class="k">Salão de beleza · Caxias do Sul</p><h1>Cabelos elegantes, <em>saudáveis</em> e prontos para qualquer ocasião.</h1><p>${E.frase}</p><p class="bts"><a class="btn" href="${telHref(E.fone)}">${ic('tel')}Agendar: ${E.fone}</a><a class="link-seta" href="${link(v, 'servicos')}">Serviços ${ic('seta')}</a></p></div><figure>${img('modelo', 'Cabelo preso em rabo alto, perfil', ' loading="eager" fetchpriority="high"')}</figure></div></section>
<section class="faixa-b"><div class="in"><span>${ic('relogio')}Terça a sábado, 9h às 20h</span><span>${ic('pin')}${E.rua}</span><span>${ic('check')}Crédito e débito</span></div></section>
<section class="in servs-b"><header class="tit-b"><p class="k">Serviços</p><h2>Cinco formas de cuidar de você</h2></header><div class="cards">${servicos.map(s => `<a class="card sobe" href="${link(v, 'servicos')}#${s.id}"><figure>${img(s.foto, s.t)}</figure><h3>${s.t}</h3><p>${s.d}</p></a>`).join('')}</div></section>
<section class="citacao-b"><div class="in"><p>“${E.sonho}”</p><a class="btn" href="${link(v, 'contato')}">Reservar horário</a></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Studio Z', artigo: 'do', url: E.url, lang: 'pt', cor: '#f07c1e', fundo: '#111111', claro: '#f5f2ee',
  fonteTitulo: 'Montserrat,system-ui,sans-serif', fonteTexto: 'Montserrat,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4, texto: 'Fiel ao site atual: preto com laranja, a palavra "Elegante" em letra cursiva e o bloco Agenda, Horários e Ligue, agora com texto de verdade (o site atual é todo em imagem e o Google não lê).', pontos: ['Horário e telefone logo na abertura', 'Os cinco serviços com página própria', 'Agendamento por telefone ou WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4, texto: 'Mais leve e atual: fundo claro, títulos serifados e cartões de serviço com foto.', pontos: ['Faixa com horário, endereço e pagamento', 'Cartões de serviço com foto', 'Mapa e horários na página de contato'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
