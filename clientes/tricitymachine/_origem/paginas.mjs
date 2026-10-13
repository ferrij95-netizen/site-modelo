// Gera as páginas de cada versão. A: Clássica (faixa de fotos, navy e branco). B: Industrial (navy com gradiente, blocos numerados).
import { empresa, hero, valores, servicos, capacidades, qualidade, fotos } from './conteudo.mjs';
import { paginas, head, cabecalho, rodape } from './comum.mjs';

const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@500;700;800&family=Inter:wght@400;500;600;700&display=swap',
};

const tel = `<a class="botao" href="tel:${empresa.telefoneHref}">Call ${empresa.telefone}</a>`;
const mail = `<a class="botao claro" href="mailto:${empresa.email}">Email us</a>`;
const cta = v => `<section class="cta"><div class="in"><h2>Contact Us for a Project Evaluation</h2><p>${empresa.telefone} · ${empresa.email}</p><div class="botoes">${tel}${mail}</div></div></section>`;
const chips = `<ul class="chips">${capacidades.map(c => `<li>${c}</li>`).join('')}</ul>`;
const fotosHtml = (n) => fotos.slice(0, n).map((f, i) => `<figure class="foto f${i}"><img src="/assets/img/${f.arquivo}.webp" alt="${f.alt}" loading="lazy" width="1280" height="960"></figure>`).join('');

function paginaHome(v) {
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
