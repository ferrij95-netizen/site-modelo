// Gera as páginas de cada versão. A: Clássica (faixa de fotos, navy e branco). B: Industrial (navy com gradiente, blocos numerados). C: Oficina (foto de fundo, serviços com foto).
import { empresa, hero, valores, servicos, capacidades, qualidade, fotos } from './conteudo.mjs';
import { paginas, head, cabecalho, rodape } from './comum.mjs';

const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@500;700;800&family=Inter:wght@400;500;600;700&display=swap',
  c: 'https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap',
};

// Versão C, Oficina: foto de fundo no topo, serviços em linhas com foto, faixa de números.
function paginaHomeC(v) {
  const [destaque, ...outros] = servicos;
  const cardServ = (s, i, f) => `<a class="serv-foto${i === 0 ? ' grande' : ''}" href="/${v}/servicos/#${s.slug}" style="background-image:linear-gradient(180deg,rgba(1,23,80,.05) 30%,rgba(1,23,80,.92)),url(/assets/img/${f}.webp)"><span class="num">0${i + 1}</span><h3>${s.nome}</h3><span class="seta">Learn more <b aria-hidden="true">→</b></span></a>`;
  const servHtml = cardServ(destaque, 0, fotos[0].arquivo) + outros.map((s, i) => cardServ(s, i + 1, fotos[i + 1].arquivo)).join('');
  const etapas = [
    ['Send us what you have', 'A drawing, a sketch, an idea, or the original part.'],
    ['Project evaluation', 'We review the job and get back to you with a quote.'],
    ['Machining or repair', 'Precision machining, balancing, waterjet, welding and repair in our Peoria shop.'],
    ['On-time delivery', 'Accurate, reliable parts delivered when you need them.'],
  ];
  return `<div class="aviso"><div class="in"><span><b>Emergency work?</b> We handle critical equipment repairs.</span><a href="tel:${empresa.telefoneHref}">Call ${empresa.telefone}</a></div></div>
<section class="hero-c" style="background-image:linear-gradient(90deg,rgba(1,23,80,.95) 0%,rgba(1,23,80,.78) 50%,rgba(1,23,80,.25) 100%),url(/assets/img/foto-eixo.webp)">
  <div class="in">
    <p class="kicker">${empresa.desde} · ${empresa.cidade}</p>
    <h1>Full Service Machine Shop <span>in Peoria, Illinois</span></h1>
    <p class="lead">For more than 47 years, our customers have trusted us with their precision machining jobs and critical equipment repairs.</p>
    <div class="botoes"><a class="botao" href="/${v}/contato/">Request a project evaluation</a><a class="botao claro" href="tel:${empresa.telefoneHref}">Call ${empresa.telefone}</a></div>
    <ul class="hero-valores">${valores.map(x => `<li>${x.titulo}</li>`).join('')}</ul>
  </div>
</section>
<section class="numeros"><div class="in">
  <div><strong>47+</strong><span>years trusted by our customers</span></div>
  <div><strong>5</strong><span>services under one roof</span></div>
  <div><strong>28+</strong><span>kinds of parts machined and repaired</span></div>
  <div><strong>Any</strong><span>start: drawing, sketch, idea or original part</span></div>
</div></section>
<section class="servicos-c"><div class="in">
  <div class="titulo-linha"><div><p class="kicker">What we do</p><h2>Our Services</h2></div><a class="link" href="/${v}/servicos/">All services</a></div>
  <div class="mosaico">${servHtml}</div>
</div></section>
<section class="processo"><div class="in">
  <p class="kicker">How it works</p><h2>From a sketch to a finished part</h2>
  <ol>${etapas.map(([t, d], i) => `<li><span class="passo">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
<section class="capac-c"><div class="in">
  <div class="capac-titulo"><p class="kicker">Expert Capabilities</p><h2>What we machine and repair</h2><p>From pumps and fans to gears and flywheels, we make the part or repair it.</p></div>
  <ul>${capacidades.map(c => `<li>${c}</li>`).join('')}</ul>
</div></section>
<section class="qualidade-c"><div class="in">
  <figure class="foto"><img src="/assets/img/foto-peca.webp" alt="Machined part with bolt pattern" loading="lazy" width="1280" height="960"></figure>
  <div><p class="kicker">Quality Assurance</p><h2>Accurate and reliable, every part</h2><p>${qualidade}</p><a class="link" href="/${v}/qualidade/">Read more about our quality</a></div>
</div></section>
<section class="acoes"><div class="in">
  <h2>Contact Us for a Project Evaluation</h2>
  <div class="acoes-grade">
    <a href="tel:${empresa.telefoneHref}"><small>Call</small><strong>${empresa.telefone}</strong><span>Talk to the shop</span></a>
    <a href="mailto:${empresa.email}"><small>Email</small><strong>${empresa.email}</strong><span>Send your drawing or photos</span></a>
    <a href="/${v}/contato/"><small>Visit</small><strong>1506 SW Washington St.</strong><span>${empresa.cidade}</span></a>
  </div>
</div></section>`;
}

const tel = `<a class="botao" href="tel:${empresa.telefoneHref}">Call ${empresa.telefone}</a>`;
const mail = `<a class="botao claro" href="mailto:${empresa.email}">Email us</a>`;
const cta = v => `<section class="cta"><div class="in"><h2>Contact Us for a Project Evaluation</h2><p>${empresa.telefone} · ${empresa.email}</p><div class="botoes">${tel}${mail}</div></div></section>`;
const chips = `<ul class="chips">${capacidades.map(c => `<li>${c}</li>`).join('')}</ul>`;
const fotosHtml = (n) => fotos.slice(0, n).map((f, i) => `<figure class="foto f${i}"><img src="/assets/img/${f.arquivo}.webp" alt="${f.alt}" loading="lazy" width="1280" height="960"></figure>`).join('');

function paginaHome(v) {
  if (v === 'c') return paginaHomeC(v);
  const valoresHtml = valores.map((x, i) => `<li><span class="num">0${i + 1}</span><h3>${x.titulo}</h3></li>`).join('');
  const servicosHtml = servicos.map((s, i) => `<a class="servico" href="/${v}/servicos/#${s.slug}"><span class="num">0${i + 1}</span><h3>${s.nome}</h3><span class="seta">Learn more →</span></a>`).join('');
  return `<section class="hero">
  <div class="hero-txt">
    <p class="kicker">${empresa.desde}</p>
    <h1>${hero.titulo}</h1>
    <p class="lead">${hero.intro}</p>
    <div class="botoes">${tel}${mail}</div>
  </div>
  <div class="hero-img"><img src="/assets/img/faixa-fotos.webp" alt="Machined parts and equipment from the Tri-City shop" width="1160" height="250"></div>
</section>
<section class="valores"><ul>${valoresHtml}</ul></section>
<section class="servicos-home"><h2>Our Services</h2><div class="grade">${servicosHtml}</div></section>
<section class="capacidades"><h2>Expert Capabilities</h2>${chips}</section>
<section class="qualidade-home"><div class="in"><h2>Quality Assurance</h2><p>${qualidade}</p><a class="link" href="/${v}/qualidade/">Read more about our quality</a></div></section>
${cta(v)}`;
}

function paginaSobre(v) {
  return `<section class="pagina-topo"><p class="kicker">${empresa.desde}</p><h1>About Us</h1><p class="lead">We are a full service machine shop. For more than 47 years, our customers have trusted us with their precision machining jobs and critical equipment repairs.</p></section>
<section class="texto"><div class="in"><h2>What we do</h2><p>We can manufacture the part you need from a drawing, a sketch, an idea, or the original part.</p></div></section>
<section class="valores"><ul>${valoresHtml(v)}</ul></section>
<section class="fotos-linha">${fotosHtml(3)}</section>
${cta(v)}`;
}

function valoresHtml(v) {
  return valores.map((x, i) => `<li><span class="num">0${i + 1}</span><h3>${x.titulo}</h3></li>`).join('');
}

function paginaServicos(v) {
  const blocos = servicos.map((s, i) => `<section class="bloco-servico" id="${s.slug}"><div class="in"><span class="num">0${i + 1}</span><h2>${s.nome}</h2><p>${i === 0 ? 'We can manufacture the part you need from a drawing, a sketch, an idea, or the original part.' : 'Ask about this service and send us your drawing, part number or photo.'}</p><a class="link" href="/${v}/contato/">Request a quote</a></div></section>`).join('');
  return `<section class="pagina-topo"><h1>Services</h1><p class="lead">Precision machining, dynamic balancing, mechanical repair, waterjet cutting and weld fabrication, with emergency work when you need it.</p></section>
${blocos}
<section class="texto"><div class="in"><h2>Expert Capabilities</h2>${chips}</div></section>
${cta(v)}`;
}

function paginaQualidade(v) {
  return `<section class="pagina-topo"><h1>Quality</h1><p class="lead">${qualidade}</p></section>
<section class="valores"><ul>${valoresHtml(v)}</ul></section>
${cta(v)}`;
}

function paginaGaleria(v) {
  return `<section class="pagina-topo"><h1>Photo Gallery</h1><p class="lead">Work from our shop floor.</p></section>
<section class="galeria"><div class="in">${fotos.map((f, i) => `<figure class="foto f${i}"><img src="/assets/img/${f.arquivo}.webp" alt="${f.alt}" loading="lazy" width="1280" height="960"></figure>`).join('')}</div></section>
${cta(v)}`;
}

function paginaContato(v) {
  return `<section class="pagina-topo"><h1>Contact Us</h1><p class="lead">Send us a drawing, a sketch or the part itself and we will evaluate the project.</p></section>
<section class="contato"><div class="in">
  <div class="cartao"><h2>Phone</h2><p><a href="tel:${empresa.telefoneHref}">${empresa.telefone}</a></p><p>Fax ${empresa.fax}</p></div>
  <div class="cartao"><h2>Email</h2><p><a href="mailto:${empresa.email}">${empresa.email}</a></p></div>
  <div class="cartao"><h2>Address</h2><p>${empresa.endereco}</p><p>${empresa.cidade}</p></div>
</div></section>`;
}

const fabricas = { index: paginaHome, sobre: paginaSobre, servicos: paginaServicos, qualidade: paginaQualidade, galeria: paginaGaleria, contato: paginaContato };
const descricoes = {
  index: `${empresa.nome}: full service machine shop in Peoria, Illinois. Precision machining, dynamic balancing, mechanical repair, waterjet cutting and weld fabrication.`,
  sobre: `About ${empresa.nome}, a full service machine shop in Peoria, Illinois, ${empresa.desde.toLowerCase()}.`,
  servicos: `Services of ${empresa.nome}: precision machining, dynamic balancing, mechanical repair, waterjet cutting and weld fabrication.`,
  qualidade: `Quality assurance at ${empresa.nome}: our work meets or exceeds industry standards.`,
  galeria: `Photo gallery of ${empresa.nome}, Peoria, Illinois.`,
  contato: `Contact ${empresa.nome} in Peoria, Illinois. Phone ${empresa.telefone}.`,
};

export function gerarVersao(v) {
  const saida = {};
  for (const p of paginas) {
    const titulo = p.slug === 'index' ? `${empresa.nome} · Peoria, Illinois` : `${p.nome} · ${empresa.nome}`;
    const corpo = fabricas[p.slug](v);
    saida[p.slug] = head({ v, titulo, descricao: descricoes[p.slug], caminho: p.caminho, fontes: FONTES[v] })
      + cabecalho(v, p.slug) + corpo + '\n' + rodape(v);
  }
  return saida;
}
