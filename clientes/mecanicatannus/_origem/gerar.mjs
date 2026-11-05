// Mecânica Tannus (Jd. Tânnus, Jundiaí/SP; unidades em Jundiaí e Itupeva). Gera public/{a,b}/ e a página de escolha.
// node clientes/mecanicatannus/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs mecanicatannus http://www.mecanicatannus.com.br/)
// Textos tirados do site atual (mecanicatannus.com.br). Fotos reais: fachada e oficina (recortes de file_upload/imagens/banner2.jpg).
// motor.webp e elevador.webp são fotos de banco de imagem do site atual (banner.jpg e banner3.jpg): ver LEIA-ME.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Mecânica Tannus', curto: 'Mecânica Tannus', url: 'https://mecanicatannus.overtus.com.br/', antigo: 'http://www.mecanicatannus.com.br/',
  fone: '(11) 4582-6094', cel: '(11) 94765-8504', waNum: '5511947658504', email: 'contato@mecanicatannus.com.br',
  rua: 'Av. Benedito Castilho de Andrade, 219', bairro: 'Jd. Tânnus', cidade: 'Jundiaí/SP', cep: '13212-070',
  face: 'https://www.facebook.com/pages/Mecanica-Tannus',
};
const horas = [['Segunda a quinta', '07:30', '18:00'], ['Sexta', '07:30', '17:00']];
const servicos = [
  { t: 'Manutenção preventiva', ic: 'calendario' },
  { t: 'Revisão de itens antes da sua viagem', ic: 'carro' },
  { t: 'Manutenção corretiva em veículos carburados e com injeção eletrônica', ic: 'chave' },
  { t: 'Manutenção em suspensão, freios, escapamentos, motor, câmbio e embreagens', ic: 'engrenagem', partes: ['Suspensão', 'Freios', 'Escapamentos', 'Motor', 'Câmbio', 'Embreagens'] },
  { t: 'Regulagem eletrônica e limpeza de bico injetor', ic: 'medidor' },
  { t: 'Troca de óleo e filtros', ic: 'oleo' },
];
const boasVindas = 'Nossa equipe conta com especialistas em várias áreas de atuação, para que você, como nosso cliente, possa ficar tranquilo e seguro que seu veículo terá a melhor manutenção, no prazo estipulado e dentro do orçamento combinado.';
const confianca = 'Nosso atendimento e forma de trabalho sempre estimularam nossos clientes a confiar em nossa equipe.';
const clientesTxt = 'A Mecânica Tannus tem a honestidade e a confiança em seu perfil, além da paixão por automotores, mantendo sempre a qualidade nos serviços e a rapidez no atendimento. Como resultado, conseguimos diversas parcerias duradouras.';
const empresas = ['Foxconn', 'Closure Systems International', 'Japi', 'Amcor', 'WAGO', 'EPA Química'];
const marcas = ['Toyota', 'Kia', 'Audi', 'Dodge', 'Honda', 'Chrysler'];
const fotos = {
  oficina: 'A oficina da Auto Mecânica Tânnus, com carros nos boxes', fachada: 'Fachada da Mecânica Tannus com o logotipo na parede',
  motor: 'Mecânico trabalhando no motor de um carro', elevador: 'Carro no elevador durante a manutenção',
};
const tam = { oficina: [642, 540], fachada: [648, 516], motor: [1042, 534], elevador: [1302, 412] };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'empresas', nome: 'Empresas' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Carinho e respeito', b: 'Faixa azul' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@500;700;800&family=Red+Hat+Text:wght@400;500;600;700&family=Darker+Grotesque:wght@600;700;800;900&family=Inclusive+Sans:ital@0;1&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '', extra = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n, extra)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#00a0e0', b: '#00a0e0' };
const tel = telHref(E.fone);
const telCel = telHref(E.cel);
const wa = waHref(E.waNum, 'Olá! Vim pelo site da Mecânica Tannus.');
const mapsQ = encodeURIComponent('Av. Benedito Castilho de Andrade, 219, Jundiaí SP, 13212-070');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Solução em serviços automotivos em Jundiaí` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnWa = (txt = 'Chamar no WhatsApp', cls = 'btn') => `<a class="${cls}" href="${wa}" ${ext}>${icWa()}${txt}</a>`;
const btnTel = (txt = E.fone, cls = 'btn btn-linha') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;
const horasLista = () => horas.map(h => `<span>${h[0]}: ${h[1]} às ${h[2]}</span>`).join('');

const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site da Mecânica Tannus.">
  <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>Telefone *<input name="telefone" required inputmode="tel" autocomplete="tel"></label></div>
  <div class="form-duas"><label>Veículo *<input name="veiculo" required placeholder="Ex.: Corolla 2018"></label><label>Assunto<select name="assunto"><option>Orçamento</option>${servicos.map(s => `<option>${esc(s.t)}</option>`).join('')}<option>Atendimento para empresa</option><option>Outros</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Conte o que o carro está apresentando"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp da oficina, ${E.cel}. Se preferir, escreva para <a href="mailto:${E.email}">${E.email}</a>.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa}" ${ext}>${E.cel}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong>${horasLista()}</div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Mecânica Tannus no Jd. Tânnus, Jundiaí" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Mecânica Tannus, página inicial"><img src="/assets/${logo}.webp" alt="Mecânica Tannus, solução em serviços automotivos" width="393" height="127"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Mecânica Tannus" width="393" height="127" loading="lazy"><p>Solução em serviços automotivos. Unidades em Jundiaí e Itupeva.</p><p><a class="rod-face" href="${E.face}" ${ext}>${ic('face')}Facebook</a></p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${icWa()}<a href="${wa}" ${ext}>${E.cel}</a></li>
      <li>${ic('relogio')}<span>Seg. a qui., 07:30–18:00<br>Sex., 07:30–17:00</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Mecânica Tannus. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa}" ${ext} aria-label="Conversar com a Mecânica Tannus no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const listaServ = (cls = '') => `<ol class="lserv ${cls}">${servicos.map((s, i) => `<li class="sobe"><span class="n">${String(i + 1).padStart(2, '0')}</span><div><h3>${s.t}</h3>${s.partes ? `<ul class="partes">${s.partes.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}</div></li>`).join('')}</ol>`;
const listaEmpresas = (cls = '') => `<ul class="empresas ${cls}">${empresas.map(e => `<li>${e}</li>`).join('')}</ul>`;

function comum(v, pag, cab) {
  pag.servicos = head(v, 'servicos', 'Serviços', 'Manutenção preventiva e corretiva, revisão antes de viajar, injeção eletrônica e carburados, suspensão, freios, escapamento, motor, câmbio, embreagem, limpeza de bico e troca de óleo em Jundiaí.') + topo(v, 'servicos') + cab('Serviços', 'Na Mecânica Tannus seu veículo é tratado com carinho e respeito', 'elevador') + `
<div class="in">
<p class="intro">${boasVindas}</p>
${listaServ('lserv-pag')}
<section class="serv-cta"><div><h2>Precisa de um orçamento?</h2><p>Mande o modelo do carro e o que ele está apresentando pelo WhatsApp, ou ligue para a oficina.</p></div><p class="bts">${btnWa()}${btnTel()}</p></section>
</div>
` + rodape(v);
  pag.empresas = head(v, 'empresas', 'Empresas', 'Empresas como Foxconn, Closure Systems International, Japi, Amcor, WAGO e EPA Química estão entre os clientes da Mecânica Tannus, em Jundiaí.') + topo(v, 'empresas') + cab('Clientes', 'Parcerias duradouras com empresas da região', 'oficina') + `
<div class="in">
<section class="emp-pag"><div><p class="intro">${clientesTxt}</p><p class="emp-sub">Algumas empresas que são clientes da Mecânica Tannus:</p></div>${listaEmpresas('emp-lista')}</section>
<section class="emp-cta"><div><h2>Sua empresa também pode contar com a Tannus</h2><p>${confianca}</p></div><p class="bts">${btnWa('Falar com a oficina')}<a class="btn btn-linha" href="mailto:${E.email}">${ic('mail')}Enviar e-mail</a></p></section>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Mecânica Tannus: ${E.rua}, ${E.bairro}, Jundiaí. Telefone ${E.fone}, WhatsApp ${E.cel}. Segunda a quinta, 07:30 às 18:00; sexta, 07:30 às 17:00.`) + topo(v, 'contato') + cab('Contato e localização', 'Fale com a gente ou venha até a oficina', 'fachada') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}<p class="bts">${btnWa()}${btnMapa()}</p></div><div class="contato-form"><h2>Peça um orçamento</h2>${formulario()}</div></section>
<section class="mapa-pag">${mapaFrame}</section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Mecânica em Jundiaí: manutenção preventiva e corretiva, injeção eletrônica, suspensão, freios, motor, câmbio e troca de óleo. Unidades em Jundiaí e Itupeva.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Mecânica em Jundiaí e Itupeva</p><h1>Aqui seu veículo é tratado com <em>carinho e respeito</em></h1><p>${boasVindas}</p>
  <p class="bts">${btnWa()}${btnTel()}</p></div>
  <div class="hero-a-fotos">${foto('oficina', 'h1f', ' loading="eager" fetchpriority="high"')}${foto('fachada', 'h2f', ' loading="eager"')}<p class="hero-a-leg">Unidades em Jundiaí e Itupeva</p></div>
</div></section>
<section class="info-a"><div class="in"><ul>
  <li>${ic('pin')}<span><b>${E.rua}</b>${E.bairro}, ${E.cidade}</span></li>
  <li>${ic('relogio')}<span><b>Seg. a qui., 07:30–18:00</b>Sexta, 07:30–17:00</span></li>
  <li>${icWa()}<span><b>WhatsApp</b><a href="${wa}" ${ext}>${E.cel}</a></span></li>
  <li>${ic('tel')}<span><b>Telefone</b><a href="${tel}">${E.fone}</a></span></li>
</ul></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>Prestamos serviços de</h2></header>${listaServ()}<a class="link-seta" href="${link(v, 'servicos')}">Ver os serviços ${ic('seta')}</a></section>
<section class="tres-a"><div class="in"><p class="k">Por que a Tannus</p><ul>
  <li class="sobe"><b>Especialistas</b><span>em várias áreas de atuação</span></li>
  <li class="sobe"><b>No prazo</b><span>estipulado</span></li>
  <li class="sobe"><b>No orçamento</b><span>combinado</span></li>
</ul><p class="tres-a-txt">${confianca}</p></div></section>
<section class="in emp-a"><div><p class="k">Alguns de nossos clientes</p><h2>Empresas que confiam na Tannus</h2><p>${clientesTxt}</p><a class="link-seta" href="${link(v, 'empresas')}">Atendimento para empresas ${ic('seta')}</a></div>${listaEmpresas()}</section>
<section class="marcas-a"><div class="in"><p class="k">Algumas das marcas atendidas</p><ul>${marcas.map(m => `<li>${m}</li>`).join('')}</ul></div></section>
<section class="in cta-a"><div><h2>Ficou com alguma dúvida? Fale com a gente.</h2><p>${E.rua}, ${E.bairro}, Jundiaí.</p></div><p class="bts">${btnWa()}${btnMapa()}</p></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t) => `<section class="cab-b"><div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', 'Solução em serviços automotivos em Jundiaí e Itupeva. Manutenção preventiva e corretiva, revisão antes de viajar, injeção eletrônica, suspensão, freios e troca de óleo.') + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Jundiaí · Itupeva</p><h1>Solução em serviços automotivos.</h1><p>Especialistas em várias áreas de atuação, para o seu carro ficar pronto no prazo estipulado e dentro do orçamento combinado.</p>
  <p class="bts">${btnWa('Chamar no WhatsApp', 'btn btn-preto')}${btnTel(E.fone, 'btn btn-linha')}</p></div>
  <figure class="hero-b-foto">${foto('oficina', '', ' loading="eager" fetchpriority="high"')}</figure>
</div></section>
<section class="hora-b"><div class="in hora-b-in">
  ${horas.map(h => `<div><small>${h[0]}</small><b>${h[1]}<i>–</i>${h[2]}</b></div>`).join('')}
  <div><small>WhatsApp</small><b><a href="${wa}" ${ext}>${E.cel}</a></b></div>
</div></section>
<section class="in servs-b"><header class="tit-b"><p class="k">O que fazemos</p><h2>Serviços</h2></header>${listaServ('lserv-b')}<a class="link-seta" href="${link(v, 'servicos')}">Detalhes dos serviços ${ic('seta')}</a></section>
<section class="frase-b"><div class="in"><p>Aqui seu veículo é tratado com <em>carinho e respeito.</em></p></div></section>
<section class="in emp-b"><header class="tit-b"><p class="k">Alguns de nossos clientes</p><h2>Parcerias duradouras</h2></header><p class="emp-b-txt">${clientesTxt}</p>${listaEmpresas('emp-barra')}</section>
<section class="local-b"><div class="in local-b-in"><figure>${foto('fachada')}</figure><div><p class="k">Onde estamos</p><h2>${E.rua}</h2><p>${E.bairro}, ${E.cidade}, CEP ${E.cep}</p><p class="local-hora">${horasLista()}</p><p class="bts">${btnMapa('btn btn-preto')}<a class="btn btn-linha" href="${link(v, 'contato')}">${ic('mail')}Contato</a></p></div></div></section>
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
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#00a0e0', fundo: '#121416', claro: '#f3f5f6',
  fonteTitulo: "'Alegreya Sans SC',system-ui,sans-serif", fonteTexto: "'Red Hat Text',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4, texto: 'Clara, em preto e no azul do logo, com títulos em versalete como o nome "Mecânica Tannus". Abre com a frase do site atual, "Aqui seu veículo é tratado com carinho e respeito", ao lado das fotos da oficina e da fachada.', pontos: ['Fotos reais das unidades logo na abertura', 'Endereço, horário e WhatsApp numa faixa só', 'Empresas clientes em destaque'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4, texto: 'Faixas largas no azul do cabeçalho antigo, com letras pretas e grossas. Abre com "Solução em serviços automotivos" e mostra o horário em números grandes, como um quadro de oficina.', pontos: ['Horário e WhatsApp em números grandes', 'Serviços numerados de 01 a 06', 'Fachada e endereço no fim da página'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
