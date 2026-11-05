// Mecânica David Auto Peças (Hauer, Curitiba/PR). Gera public/{a,b}/ e a página de escolha.
// node clientes/mecanicadavid/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs mecanicadavid http://mecanicadavid.com.br/)
// Textos, produtos, fotos e contato tirados do site atual (WordPress/Divi de 2019). Logo redesenhado em vetor (_origem/logo/logo.mjs) a partir do PNG de 123 px.
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Mecânica David Auto Peças', url: 'https://mecanicadavid.overtus.com.br/', antigo: 'http://mecanicadavid.com.br/',
  fone: '(41) 3278-3507', cel: '(41) 99989-3246', wa: '5541999893246', email: 'atendimento@mecanicadavid.com.br',
  end: 'Rua das Carmelitas, 1473', bairro: 'Hauer', cidade: 'Curitiba/PR', cep: '81650-060',
  face: 'https://www.facebook.com/mecanicadavidautopecas',
  curto: 'Oficina mecânica e autopeças na Rua das Carmelitas, no Hauer, em Curitiba. Mais de 40 anos de experiência em revisões, reparos, suspensão, alinhamento e balanceamento de carros nacionais, importados e utilitários.',
};
const mapaQ = 'Rua das Carmelitas 1473 Hauer Curitiba PR';
const horario = [['Segunda a sexta', '8h às 12h'], ['', '13h10 às 18h']];
const horarioTxt = 'Segunda a sexta, das 8h às 12h e das 13h10 às 18h';
const waMsg = 'Olá! Vim pelo site da Mecânica David.';
const quem = 'A Oficina Mecânica David possui mais de 40 anos de experiência no ramo de assistência técnica automotiva, peças e acessórios. Dispomos da mais completa linha de ferramentas e equipamentos de última geração. Aqui você conta com a experiência de profissionais qualificados para prestar assistência técnica em veículos nacionais, importados e utilitários, com garantia e segurança.';
const frase = 'Andes devagar se tens pressa para chegar';
const servTxt = 'Realizamos revisões e reparos em veículos de passeio e utilitários, nacionais e importados. Nossa mão de obra é especializada e dispomos de equipamentos de última geração. Trabalhamos com um sistema de agendamento de serviços para sua maior comodidade.';
const pecas = [
  'A Autopeças da Mecânica David, localizada no mesmo endereço, possui um amplo estoque de peças, o que dá agilidade à execução dos serviços.',
  'Totalmente informatizada: cada item vendido, bem como cada serviço realizado, fica arquivado no cadastro do veículo. Com isso, nossos clientes contam com o histórico completo da manutenção do seu carro, com segurança, conforto e rapidez no atendimento.',
  'Nossa equipe está à disposição para tirar dúvidas e fazer orçamentos. Entre em contato!',
];
const estrutura = [
  { b: '30', t: 'Capacidade de atendimento simultâneo de até 30 veículos', i: 'carro' },
  { b: 'Multimarcas', t: 'Atendemos veículos nacionais e importados', i: 'engrenagem' },
  { b: '3x', t: 'Pagamento em até 3x nos cartões Visa e Mastercard', i: 'check' },
];
const servicos = [
  { id: 'revisoes', t: 'Revisões e reparos', d: servTxt, i: 'chave', f: 'elevador-caminhonete' },
  { id: 'alinhamento', t: 'Alinhamento e balanceamento', d: 'Executamos serviços de geometria e balanceamento de rodas: alinhamento, balanceamento, cambagem e caster.', i: 'disco', f: 'alinhamento' },
  { id: 'suspensao', t: 'Suspensão', d: 'Reparos e substituição dos itens que compõem a suspensão: amortecedores, molas, balanças, buchas e pivôs.', i: 'medidor', f: 'suspensao' },
  { id: 'diagnostico', t: 'Diagnóstico', d: 'Saber identificar um problema nunca é tarefa das mais fáceis: requer experiência e capacitação profissional. Quando falamos de carros, um bom diagnóstico pode nos livrar de gastos e de muitas dores de cabeça desnecessárias.', i: 'painel', f: 'scanner' },
];
const tambem = [['motor', 'Motor'], ['cambio-automatico', 'Câmbio automático'], ['cambio-manual', 'Câmbio manual'], ['eletronica', 'Eletrônica e painel']];
const preventiva = 'Com toda certeza você já ouviu a frase “prevenir é melhor do que remediar”. Estar com as manutenções preventivas em dia reflete diretamente no seu bolso.';
const produtos = [
  ['baterias', 'Baterias', 'Multimarcas e diversas voltagens'],
  ['bombas', 'Bombas', 'Combustível, óleo, injeção e água'],
  ['correias', 'Correias', 'Correias e rolamentos'],
  ['embreagem', 'Embreagem', 'Multimarcas'],
  ['filtros', 'Filtros', 'Óleo, ar, cabine e combustível'],
  ['lubrificantes', 'Lubrificantes', 'Mineral, semissintético e sintético'],
  ['lanternas-farois', 'Lanternas e faróis', 'Multimarcas'],
  ['palhetas', 'Palhetas', 'Multimarcas'],
  ['pneus', 'Pneus', 'Multimarcas'],
  ['tapetes', 'Tapetes', 'Multimarcas'],
  ['freios', 'Pastilhas e discos de freio', 'Multimarcas'],
  ['suspensao-pecas', 'Suspensão', 'Amortecedores, molas, balanças, buchas e pivôs'],
];
const depo = [
  { n: 'José Alves Ribeiro', q: 'Aposentado · Toyota Hilux SW4', t: 'Conheço a mecânica e o David há 25 anos e desde então só levo meus carros lá. Sempre que posso, passo lá para tomar um chimarrão e colocar o papo em dia. Recomendo: ambiente, atendimento e a qualidade dos serviços são excelentes.' },
  { n: 'Luciane Magalhães', q: 'Bancária · Honda Fit', t: 'Sempre tive dificuldade em encontrar um mecânico de confiança, pois já tive experiências ruins. Por indicação de um amigo da faculdade cheguei até a Mecânica David. Recomendo: o atendimento é excelente e o preço é muito justo.' },
  { n: 'Bruno Fortes', q: 'Gerente de frota · veículos leves', t: 'Precisamos que nossos veículos estejam sempre revisados, pois rodam diariamente e nossa logística depende disso. Optamos pela Mecânica David porque atendem desde os nossos carros pequenos até os utilitários e caminhões leves.' },
];
const fotos = [
  ['fachada', 'Entrada da oficina na Rua das Carmelitas'],
  ['patio', 'Pátio da oficina com os elevadores'],
  ['patio-alto', 'Vista do alto do pátio de serviço'],
  ['elevador-caminhonete', 'Caminhonete no elevador'],
  ['alinhamento', 'Alinhamento e balanceamento'],
  ['recepcao-autopecas', 'Recepção e balcão da autopeças'],
  ['carro-antigo', 'Carro antigo no pátio'],
  ['scanner', 'Diagnóstico com scanner'],
  ['david', 'David, o dono, no pátio da oficina'],
  ['suspensao', 'Conjunto de suspensão'],
  ['motor', 'Motor'], ['cambio-automatico', 'Câmbio automático'], ['cambio-manual', 'Câmbio manual'], ['eletronica', 'Painel do carro'],
];
const alt = Object.fromEntries(fotos);
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'oficina', nome: 'A oficina' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'autopecas', nome: 'Autopeças' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Ficha do Carro', b: 'Correia Verde' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&family=JetBrains+Mono:wght@500;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Anton&family=Manrope:wght@400;500;700;800&display=swap',
};
const cores = { a: '#006b34', b: '#121815' };
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Mecânica David Auto Peças | Oficina e autopeças no Hauer, Curitiba' : `${titulo} | Mecânica David`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const mapaFrame = () => `<iframe class="mapa" title="Mapa: ${E.end}, ${E.bairro}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(mapaQ)}&z=16&output=embed"></iframe>`;
const btnWa = (txt = 'Agendar pelo WhatsApp', cls = 'btn') => `<a class="${cls}" href="${waHref(E.wa, waMsg)}" target="_blank" rel="noopener">${icWa()}${txt}</a>`;
const btnTel = (cls = 'btn btn-linha') => `<a class="${cls}" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>`;

function topo(v, s) {
  const faixa = v === 'a' ? `<div class="topo-faixa"><div class="in"><span>${ic('relogio')}${horarioTxt}</span><span>${ic('pin')}${E.end}, ${E.bairro}</span></div></div>` : '';
  return `<header class="topo">
  ${faixa}<div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Mecânica David Auto Peças, página inicial"><img src="/assets/${v === 'b' ? 'logo-claro' : 'logo'}.webp" alt="Mecânica David Auto Peças" width="640" height="302"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${waHref(E.wa, waMsg)}" target="_blank" rel="noopener">${icWa()}<span>Agendar</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Mecânica David Auto Peças" width="640" height="302" loading="lazy"><p>Oficina mecânica e autopeças no Hauer, em Curitiba. Mais de 40 anos de experiência.</p><p class="rod-frase">“${frase}” · David</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${icWa()}<a href="${waHref(E.wa, waMsg)}" target="_blank" rel="noopener">${E.cel}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}, ${E.bairro}<br>${E.cidade}, ${E.cep}</span></li>
      <li>${ic('face')}<a href="${E.face}" target="_blank" rel="noopener">/mecanicadavidautopecas</a></li>
    </ul></div>
    <div><h3>Horário</h3><p class="rod-hora">Segunda a sexta<br>8h às 12h<br>13h10 às 18h</p></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Mecânica David Auto Peças. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waHref(E.wa, waMsg)}" target="_blank" rel="noopener" aria-label="Conversar pelo WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const servCards = v => `<ul class="servs">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><figure>${img(s.f)}</figure><div><span class="servs-n">0${i + 1}</span><h3>${s.t}</h3><p>${s.d.split(':')[0].split('. ')[0]}.</p><span class="link-seta">Saiba mais ${ic('seta')}</span></div></a></li>`).join('')}</ul>`;
const tambemLista = () => `<ul class="tambem">${tambem.map(([f, t]) => `<li class="sobe"><figure>${img(f, t)}</figure><span>${t}</span></li>`).join('')}</ul>`;
const prodGrade = (lista = produtos) => `<ul class="prods">${lista.map(([f, t, d]) => `<li class="sobe">${img('p-' + f, t)}<h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>`;
const estrLista = () => `<ul class="estr">${estrutura.map(e => `<li class="sobe">${ic(e.i)}<b>${e.b}</b><span>${e.t}</span></li>`).join('')}</ul>`;
const depoLista = () => `<div class="depos">${depo.map(d => `<blockquote class="sobe"><p>${d.t}</p><footer><b>${d.n}</b><span>${d.q}</span></footer></blockquote>`).join('')}</div>`;
const galeria = (lista = fotos.slice(0, 8)) => `<div class="galeria">${lista.map(([f, a]) => `<a href="/assets/img/${f}.webp" data-foto="${esc(a)}" class="sobe">${img(f, a)}<span>${a}</span></a>`).join('')}</div>`;
const ficha = () => `<div class="ficha" aria-label="Como funciona o cadastro do veículo">
  <p class="ficha-cab"><span>Ficha do veículo</span><span>Mecânica David</span></p>
  <ul>
    <li><span>Peças compradas</span><b>${ic('check')}arquivadas</b></li>
    <li><span>Serviços realizados</span><b>${ic('check')}arquivados</b></li>
    <li><span>Histórico da manutenção</span><b>${ic('check')}completo</b></li>
  </ul>
  <p class="ficha-pe">Cada item vendido e cada serviço feito ficam no cadastro do seu carro.</p>
</div>`;
const fraseBloco = cls => `<figure class="${cls}"><div class="frase-foto">${img('david', alt.david)}</div><blockquote><p>“${frase}”</p><footer>David, proprietário da Mecânica David</footer></blockquote></figure>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa, waMsg)}" target="_blank" rel="noopener">${E.cel}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.end}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></div></li>
  <li>${ic('relogio')}<div><strong>Horário de atendimento</strong><span>Segunda a sexta<br>8h às 12h e 13h10 às 18h</span></div></li>
  <li>${ic('face')}<div><strong>Facebook</strong><a href="${E.face}" target="_blank" rel="noopener">/mecanicadavidautopecas</a></div></li>
</ul>`;
const formAgenda = () => `<form class="form" data-wa="Olá! Quero agendar um serviço na Mecânica David.">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Carro (modelo e ano)<input name="carro" placeholder="Ex.: Fit 2015"></label><label>Assunto<select name="assunto"><option>Oficina</option><option>Autopeças</option><option>RH</option><option>Administrativo</option><option>Compras</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" required placeholder="Conte o que o carro está apresentando ou qual peça você procura."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp com a mensagem pronta para ${E.cel}. Se preferir, escreva para <a href="mailto:${E.email}">${E.email}</a>.</p>
</form>`;
const formPeca = () => `<form class="form" data-wa="Olá! Quero um orçamento de peça na Mecânica David.">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Carro (modelo e ano)<input name="carro" required placeholder="Ex.: Gol 2014"></label></div>
  <label>Peça que você procura<input name="peca" required placeholder="Ex.: pastilha de freio dianteira"></label>
  <button class="btn" type="submit">${icWa()}Pedir orçamento</button>
</form>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Agende a revisão do seu carro</h2><p>Trabalhamos com agendamento para sua comodidade. ${horarioTxt}.</p></div><p class="bts">${btnWa('WhatsApp', 'btn btn-claro')}<a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.oficina = head(v, 'oficina', 'A oficina', quem) + topo(v, 'oficina') + cab('A oficina', 'Mais de 40 anos de assistência técnica automotiva', 'patio') + `
<div class="in"><section class="texto-pag"><div><p class="k">Quem somos</p><p class="lead">${quem}</p><p>A oficina e a autopeças funcionam no mesmo endereço, na Rua das Carmelitas, no Hauer. ${servTxt.split('. ').slice(-1)[0]}</p></div>${fraseBloco('frase frase-lado')}</section>
<section class="estr-sec"><header class="tit"><p class="k">Nossa estrutura</p><h2>Espaço para até 30 carros ao mesmo tempo</h2></header>${estrLista()}</section>
<section class="gal-sec"><header class="tit"><p class="k">Por dentro</p><h2>Conheça a oficina</h2></header>${galeria(fotos.slice(0, 8))}</section>
<section class="depo-sec" id="depoimentos"><header class="tit"><p class="k">O que dizem nossos clientes</p><h2>Clientes de muitos anos</h2></header>${depoLista()}</section></div>
` + cta(v) + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Revisões e reparos, alinhamento e balanceamento, suspensão e diagnóstico para carros nacionais, importados e utilitários. Mecânica David, Hauer, Curitiba.') + topo(v, 'servicos') + cab('Serviços', 'Revisões, reparos, suspensão e alinhamento', 'patio-alto') + `
<div class="in"><section class="serv-intro"><p class="lead">${servTxt}</p><p class="bts">${btnWa()}${btnTel()}</p></section>
<section class="serv-pag">${servicos.map((s, i) => `<article class="serv-bloco sobe" id="${s.id}"><figure>${img(s.f)}</figure><div><span class="n">0${i + 1}</span><h2>${s.t}</h2><p>${s.d}</p>${btnWa('Agendar', 'link-seta')}</div></article>`).join('')}</section>
<section class="tambem-sec"><header class="tit"><p class="k">Também na oficina</p><h2>Motor, câmbio e eletrônica</h2><p>Assistência técnica para veículos de passeio e utilitários, nacionais e importados. Pergunte pelo WhatsApp.</p></header>${tambemLista()}</section>
<section class="prev-sec"><div><p class="k">Manutenção programada</p><h2>Prevenir sai mais barato</h2><p class="lead">${preventiva}</p><p>Com a ficha de cada carro guardada no sistema, a oficina sabe o que já foi trocado e quando.</p></div>${ficha()}</section></div>
` + cta(v) + rodape(v);
  pag.autopecas = head(v, 'autopecas', 'Autopeças', 'Autopeças no mesmo endereço da oficina: baterias, filtros, lubrificantes, freios, suspensão, pneus e mais. Mecânica David, Hauer, Curitiba.') + topo(v, 'autopecas') + cab('Autopeças', 'Peças em estoque, no mesmo endereço da oficina', 'recepcao-autopecas') + `
<div class="in"><section class="pecas-intro"><div>${pecas.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div>${ficha()}</section>
<section class="prod-sec"><header class="tit"><p class="k">Produtos</p><h2>O que você encontra no balcão</h2></header>${prodGrade()}</section>
<section class="orc-sec"><figure>${img('recepcao-autopecas')}</figure><div><h2>Orçamento de peça</h2><p>Diga o carro e a peça: a equipe responde pelo WhatsApp.</p>${formPeca()}</div></section></div>
` + cta(v) + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Mecânica David Auto Peças: ${E.end}, ${E.bairro}, ${E.cidade}. Telefone ${E.fone}, WhatsApp ${E.cel}.`) + topo(v, 'contato') + cab('Contato', 'Agende pelo WhatsApp ou venha até o Hauer', 'fachada') + `
<div class="in"><section class="contato-pag"><div><h2>Fale com a Mecânica David</h2>${contatoLista()}</div><div class="form-caixa"><h2>Mande sua mensagem</h2>${formAgenda()}</div></section>
<section class="mapa-sec">${mapaFrame()}</section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, alt[foto], ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Hauer · Curitiba/PR · mais de 40 anos</p><h1>Mecânica e autopeças <em>no mesmo endereço.</em></h1><p>${E.curto}</p><p class="bts">${btnWa()}${btnTel()}</p></div>
<div class="hero-a-vis"><figure>${img('patio-alto', alt['patio-alto'], ' loading="eager" fetchpriority="high"')}</figure>${ficha()}</div></div></section>
<section class="nums-a"><div class="in nums-a-in"><p><b>40+</b>anos de experiência</p><p><b>30</b>carros atendidos ao mesmo tempo</p><p><b>3x</b>nos cartões Visa e Mastercard</p><p><b>1</b>endereço para oficina e peças</p></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>Revisão, reparo e diagnóstico</h2><p>${servTxt}</p></header>${servCards(v)}<p class="mais"><a class="link-seta" href="${link(v, 'servicos')}">Todos os serviços ${ic('seta')}</a></p></section>
<section class="pecas-a"><div class="in pecas-a-in"><div><p class="k">Autopeças</p><h2>A peça já está aqui</h2><p>${pecas[0]}</p><p>${pecas[1]}</p><a class="btn" href="${link(v, 'autopecas')}">Ver produtos</a></div><div>${prodGrade(produtos.slice(0, 6))}</div></div></section>
<section class="in david-a">${fraseBloco('frase')}<div><p class="k">Quem somos</p><h2>Experiência de mais de quatro décadas</h2><p>${quem}</p><a class="link-seta" href="${link(v, 'oficina')}">Conheça a oficina ${ic('seta')}</a></div></section>
<section class="gal-a"><div class="in"><header class="tit"><p class="k">Estrutura</p><h2>Pátio amplo e equipado</h2></header>${galeria(fotos.slice(0, 4))}</div></section>
<section class="in depo-a"><header class="tit"><p class="k">Clientes</p><h2>O que dizem nossos clientes</h2></header>${depoLista()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, alt[foto], ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${img('patio', alt.patio, ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Mecânica David Auto Peças · Hauer</p><h1>Mais de 40 anos de oficina <span>em Curitiba.</span></h1><p>${E.curto}</p><p class="bts">${btnWa()}${btnTel()}</p></div></section>
<section class="correia-b"><div class="in correia-b-in"><p><b>40+</b><span>anos de experiência</span></p><p><b>30</b><span>veículos ao mesmo tempo</span></p><p><b>3x</b><span>Visa e Mastercard</span></p></div></section>
<section class="in servs-b"><header class="tit"><p class="k">Serviços</p><h2>Da revisão ao diagnóstico</h2></header>${servCards(v)}<div class="tambem-b"><p>Também: motor, câmbio automático e manual, eletrônica.</p><a class="link-seta" href="${link(v, 'servicos')}">Ver serviços ${ic('seta')}</a></div></section>
<section class="frase-b"><div class="in">${fraseBloco('frase')}</div></section>
<section class="in pecas-b"><header class="tit"><p class="k">Autopeças no mesmo endereço</p><h2>Estoque amplo, peça na hora</h2><p>${pecas[1]}</p></header>${prodGrade()}<p class="mais"><a class="btn" href="${link(v, 'autopecas')}">Pedir orçamento de peça</a></p></section>
<section class="gal-b"><div class="in"><header class="tit"><p class="k">Estrutura</p><h2>Até 30 carros ao mesmo tempo</h2></header>${galeria(fotos.slice(0, 8))}</div></section>
<section class="in depo-b"><header class="tit"><p class="k">Clientes</p><h2>Quem conhece, volta</h2></header>${depoLista()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Mecânica David Auto Peças', artigo: 'da', url: E.url, lang: 'pt', cor: '#006b34', fundo: '#121815', claro: '#eef5f0',
  fonteTitulo: '"Saira Condensed",system-ui,sans-serif', fonteTexto: '"Nunito Sans",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, no verde do logo, com a "ficha do veículo" da autopeças informatizada como fio condutor.', pontos: ['"Mecânica e autopeças no mesmo endereço"', 'Serviços, produtos e a frase do David', 'Agendamento pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura, em grafite e verde, abrindo com o pátio da oficina e uma faixa verde como a correia do logo.', pontos: ['"Mais de 40 anos de oficina em Curitiba"', 'Os 12 grupos de peças na página inicial', 'Pátio, estrutura e depoimentos'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
