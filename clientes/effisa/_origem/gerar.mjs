// Effisa (Braço do Norte/SC): máquinas para movimentação e tratamento de superfícies de perfis e painéis. Gera public/{a,b}/ e a página de escolha.
// node clientes/effisa/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs effisa https://effisa.com.br/)
// Textos, fotos, máquinas e contatos do site atual (effisa.com.br). Logo vetorizado do logotipo-fotter.png (vetorizar-logo.py).
// Línguas: o site atual tem PT/EN/ES. Aqui cada página leva as três (L(pt,en,es)) e o seletor troca sem recarregar (effisa.js).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';
import { E, processos as procOrig, maquinas, linhas, setores, clientes } from './dados.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const ext = 'target="_blank" rel="noopener"';
const L = (pt, en, es) => `<span class="l-pt">${pt}</span><span class="l-en">${en ?? pt}</span><span class="l-es">${es ?? pt}</span>`;
const LO = o => L(o.pt, o.en, o.es);
const telHref = t => `tel:${t.replace(/[^\d+]/g, '')}`;

// ordem de uma linha de produção: entra, corta, lixa, extruda, pinta, seca, lamina, embala
const ordem = ['movimentacao', 'corte', 'lixamento', 'extrusao', 'pintura', 'secagem', 'laminacao', 'embalagem'];
const processos = ordem.map(id => procOrig.find(p => p.id === id));
const maqDe = id => maquinas.filter(m => m.p === id);
const maqPorSlug = Object.fromEntries(maquinas.map(m => [m.s, m]));
const codigo = n => (n.match(/FF \d+(?: x \d+)?(?: [A-Z0-9]+)*/) || [''])[0];
const nomeSemCod = n => n.replace(/\s*FF \d+.*$/, '').replace(/\s*\(.*\)$/, '').replace(/\s*–.*$/, '');

const img = (n, alt, w, h, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt, w, h) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" fetchpriority="high" decoding="async">`;
const imgM = (m, extra = '') => img(`m-${m.s}`, m.n, m.w, m.h, extra);
const fotoM = m => `<a class="mq-foto" href="/assets/img/m-${m.s}.webp" data-foto="${esc(m.n)}">${imgM(m)}</a>`;

const nav = [
  { slug: 'index', n: ['Início', 'Home', 'Inicio'] },
  { slug: 'empresa', n: ['Empresa', 'Company', 'Empresa'] },
  { slug: 'processos', n: ['Máquinas', 'Machines', 'Máquinas'] },
  { slug: 'linhas', n: ['Linhas completas', 'Complete lines', 'Líneas completas'] },
  { slug: 'aplicacoes', n: ['Aplicações', 'Applications', 'Aplicaciones'] },
  { slug: 'servicos', n: ['Peças e serviços', 'Parts and service', 'Repuestos y servicio'] },
  { slug: 'contato', n: ['Contato', 'Contact', 'Contacto'] },
];
export const nomesVersao = { a: 'Evolução eficiente', b: 'Linha de automação' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@500;600;700;800&family=Fira+Sans:wght@400;500;600&display=swap';
const linguaHead = `<script>(function(){try{var q=new URLSearchParams(location.search).get('lang');var l=q||localStorage.getItem('effisa-lang')||'pt';if(!/^(pt|en|es)$/.test(l))l='pt';document.documentElement.setAttribute('data-l',l);if(q)localStorage.setItem('effisa-lang',l)}catch(e){}})()</script>`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Effisa | Máquinas para perfis, painéis e molduras' : `${titulo} | Effisa`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: v === 'a' ? '#ff0000' : '#26272b' })
  .replace('</head>', `${linguaHead}\n</head>`);

const btnCot = (v, cls = 'btn') => `<a class="${cls}" href="${link(v, 'contato')}">${L('Solicitar orçamento', 'Request a quote', 'Solicitar presupuesto')}</a>`;
const linguas = `<div class="linguas" role="group" aria-label="Idioma / Language"><button data-lang="pt" aria-label="Português">PT</button><button data-lang="en" aria-label="English">EN</button><button data-lang="es" aria-label="Español">ES</button></div>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span>${ic('relogio')}${L('Seg. a sex. 7h30–17h30', 'Mon–Fri 7:30–17:30', 'Lun. a vie. 7h30–17h30')}</span><span class="tb-dir"><a href="mailto:${E.email}">${ic('mail')}${E.email}</a><a href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a>${linguas}</span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Effisa, página inicial"><img src="/assets/${v === 'b' ? 'logo-branco' : 'logo'}.svg" alt="Effisa · Evolução Eficiente" width="200" height="60"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${L(...n.n)}</a></li>`).join('')}</ul>${linguas}</nav>
    ${btnCot(v, 'btn btn-topo')}
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
    <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Effisa · Evolução Eficiente" width="220" height="66" loading="lazy">
      <p>${L('Máquinas e equipamentos para movimentação e tratamento de superfícies de perfilados e painéis.', 'Machinery for handling and surface treatment of profiles and panels.', 'Máquinas y equipos para movimiento y tratamiento de superficies de perfiles y paneles.')}</p>
      <p class="rod-social"><a href="${E.social.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.social.face}" ${ext} aria-label="Facebook">${ic('face')}</a><a href="${E.social.yt}" ${ext} aria-label="YouTube">${ic('yt')}</a><a href="${E.social.linkedin}" ${ext} aria-label="LinkedIn">${ic('linkedin')}</a></p></div>
    <div><h3>${L('Máquinas', 'Machines', 'Máquinas')}</h3><ul>${processos.map(p => `<li><a href="${link(v, 'processos')}#${p.id}">${LO(p)}</a></li>`).join('')}</ul></div>
    <div><h3>${L('Atendimento', 'Contact', 'Atención')}</h3><ul class="rod-dados">
      <li>${ic('tel')}<span><a href="${telHref(E.fone1)}">${E.fone1}</a><br><a href="${telHref(E.fone2)}">${E.fone2}</a></span></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade} · ${E.cep}</span></li>
      <li>${ic('relogio')}<span>${L('Segunda a sexta', 'Monday to Friday', 'Lunes a viernes')}<br>7h30–12h00 · 13h10–17h30</span></li>
    </ul></div>
    <div class="rod-selos"><h3>${L('Formas de pagamento', 'Payment', 'Formas de pago')}</h3><img src="/assets/img/c-bndes.webp" alt="Cartão BNDES" width="103" height="77" loading="lazy"><img src="/assets/img/c-empresa-brasileira.webp" alt="Empresa brasileira" width="60" height="48" loading="lazy"></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>${L('Evolução Eficiente', 'Efficient Evolution', 'Evolución Eficiente')}</span></div>
</footer>
<script src="/assets/effisa.js" defer></script>
</body>
</html>`;
}

// ---------- blocos ----------
const numeros = () => `<ul class="numeros">
  <li><b>13</b><span>${L('anos de Effisa', 'years of Effisa', 'años de Effisa')}</span></li>
  <li><b>27</b><span>${L('países com máquinas Effisa', 'countries with Effisa machines', 'países con máquinas Effisa')}</span></li>
  <li><b>${maquinas.length - linhas.length}</b><span>${L('equipamentos no catálogo', 'machines in the catalogue', 'equipos en el catálogo')}</span></li>
  <li><b>25+</b><span>${L('anos de experiência da equipe', 'years of team experience', 'años de experiencia del equipo')}</span></li>
</ul>`;

// Linha de produção: 8 estações ligadas por uma esteira
const esteira = v => `<ol class="esteira">${processos.map((p, i) => { const m = maqPorSlug[p.foto]; return `<li class="est sobe">
  <a href="${link(v, 'processos')}#${p.id}"><span class="est-num">${String(i + 1).padStart(2, '0')}</span>
  <span class="est-foto">${imgM(m)}</span><span class="est-nome">${LO(p)}</span><span class="est-qtd">${maqDe(p.id).length} ${L('máquinas', 'machines', 'máquinas')}</span></a></li>`; }).join('')}</ol>`;

const mosaicoSetores = v => `<div class="mosaico">${setores.map((s, i) => `<a class="mos mos-${i + 1} sobe" href="${link(v, 'aplicacoes')}#${s.id}">${img(`s-${s.id}`, s.pt, 999, 699)}<span>${LO(s)}</span></a>`).join('')}</div>`;

const faixaClientes = () => `<section class="clientes"><div class="in"><p class="cl-tit">${L('Alguns de nossos clientes', 'Some of our customers', 'Algunos de nuestros clientes')}</p>
  <ul>${clientes.map(([f, n]) => `<li>${img(`c-${f}`, n, f === 'santaluzia' ? 256 : 150, f === 'santaluzia' ? 41 : 37)}</li>`).join('')}</ul></div></section>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>${L('Vamos desenhar a sua linha?', 'Shall we design your line?', '¿Diseñamos su línea?')}</h2>
  <p>${L('Conte o que você produz, as medidas das peças e a velocidade que precisa. A engenharia da Effisa monta a proposta da máquina ou da linha completa.', 'Tell us what you make, part sizes and the speed you need. Effisa engineering will put together a proposal for a machine or a complete line.', 'Cuéntenos qué produce, las medidas de las piezas y la velocidad que necesita. La ingeniería de Effisa arma la propuesta de la máquina o de la línea completa.')}</p></div>
  <div class="ch-acoes">${btnCot(v)}<a class="btn btn-linha" href="${telHref(E.deptos[0].fone)}">${ic('tel')}${E.deptos[0].fone}</a></div>
</div></section>`;

const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Contato pelo site da Effisa">
  <div class="form-duas"><label>${L('Assunto', 'Subject', 'Asunto')}<select name="assunto"><option>Orçamento de máquina / Quote</option><option>Linha completa / Complete line</option><option>Peças de reposição / Spare parts</option><option>Assistência técnica / Service</option><option>Outros / Other</option></select></label><label>${L('Nome', 'Name', 'Nombre')} *<input name="nome" required autocomplete="name"></label></div>
  <div class="form-duas"><label>${L('Empresa', 'Company', 'Empresa')} *<input name="empresa" required autocomplete="organization"></label><label>${L('País / cidade', 'Country / city', 'País / ciudad')}<input name="cidade" autocomplete="address-level2"></label></div>
  <div class="form-duas"><label>E-mail *<input name="email" type="email" required autocomplete="email"></label><label>${L('Telefone / WhatsApp', 'Phone / WhatsApp', 'Teléfono / WhatsApp')}<input name="fone" type="tel" autocomplete="tel"></label></div>
  <label>${L('O que você produz e o que precisa', 'What you make and what you need', 'Qué produce y qué necesita')} *<textarea name="mensagem" rows="5" required></textarea></label>
  <button class="btn" type="submit">${L('Enviar', 'Send', 'Enviar')} ${ic('seta')}</button>
  <p class="form-nota">${L('Abre o seu e-mail com a mensagem pronta para', 'Opens your e-mail with the message ready for', 'Abre su correo con el mensaje listo para')} ${E.email}.</p>
</form>`;

const cabPag = (titulo, sub, foto) => `<section class="cab-pag${foto ? ' com-foto' : ''}">${foto ? `<div class="cp-foto">${foto}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

// ---------- páginas internas (iguais nas duas versões; muda o CSS) ----------
function empresa(v) {
  return head(v, 'empresa', 'Empresa', 'Effisa Indústria de Máquinas e Equipamentos: 13 anos, presença em 27 países, máquinas para tratamento de superfícies de perfis e painéis.') + topo(v, 'empresa') +
  cabPag(L('Empresa', 'Company', 'Empresa'), L('Moderna, eficiente, dinâmica e com objetivos claramente definidos.', 'Modern, efficient, dynamic and with clearly defined goals.', 'Moderna, eficiente, dinámica y con objetivos claramente definidos.'), imgTopo('h-fabrica', 'Linha de automação Effisa montada em cliente', 1384, 560)) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre(L('Quem somos', 'Who we are', 'Quiénes somos'))}
    <h2>${L('Especialista em movimentação e tratamento de superfícies', 'Specialists in handling and surface treatment', 'Especialistas en movimiento y tratamiento de superficies')}</h2>
    <p>${L('A Effisa é especializada na fabricação de máquinas e equipamentos dedicados à movimentação e ao tratamento de superfícies para perfilados e painéis. Com profissionais que somam mais de 25 anos de experiência em diversos segmentos, segue consolidando cada vez mais seus produtos.',
      'Effisa specialises in machinery for handling and surface treatment of profiles and panels. With a team that brings more than 25 years of experience across many segments, it keeps strengthening its product range.',
      'Effisa se especializa en la fabricación de máquinas y equipos dedicados al movimiento y al tratamiento de superficies de perfiles y paneles. Con profesionales que suman más de 25 años de experiencia en diversos segmentos, sigue consolidando sus productos.')}</p>
    <p>${L('Somos movidos pela tecnologia, desafiados constantemente na busca por soluções inovadoras e inspirados a desenvolver equipamentos reconhecidos internacionalmente pela qualidade e pela capacidade de atender cada cliente com excelência.',
      'We are driven by technology, constantly challenged to find innovative solutions and inspired to build equipment recognised internationally for its quality and for serving each customer with excellence.',
      'Nos mueve la tecnología, desafiados constantemente en la búsqueda de soluciones innovadoras e inspirados a desarrollar equipos reconocidos internacionalmente por su calidad y por atender a cada cliente con excelencia.')}</p>
  </div>
  <figure class="foto-recorte sobe">${img('h-extrusora', 'Extrusora de perfis Omega Special Edition da Effisa', 900, 560)}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in mvv">
  <div class="sobe"><h3>${L('Missão', 'Mission', 'Misión')}</h3><p>${L('Fabricar e comercializar máquinas e equipamentos com padrão de qualidade internacional. Oferecer ao cliente as melhores soluções em automação industrial no tratamento de superfícies. Desenvolver colaboradores comprometidos com a excelência. Produzir com eficiência, evolução e rentabilidade, com crescimento sustentável.',
    'To build and sell machinery to international quality standards. To offer customers the best industrial automation solutions in surface treatment. To develop people committed to excellence. To produce with efficiency, evolution and profitability, growing sustainably.',
    'Fabricar y comercializar máquinas y equipos con estándar de calidad internacional. Ofrecer al cliente las mejores soluciones en automatización industrial para el tratamiento de superficies. Desarrollar colaboradores comprometidos con la excelencia. Producir con eficiencia, evolución y rentabilidad, con crecimiento sostenible.')}</p></div>
  <div class="sobe"><h3>${L('Visão', 'Vision', 'Visión')}</h3><p>${L('Ser uma empresa de referência global dentro dos mercados em que atua.', 'To be a global reference in the markets we serve.', 'Ser una empresa de referencia global en los mercados en que actúa.')}</p></div>
  <div class="sobe"><h3>${L('Política da qualidade', 'Quality policy', 'Política de calidad')}</h3><ol class="degraus">
    <li>${L('Melhoria contínua do sistema de gestão da qualidade', 'Continuous improvement of the quality system', 'Mejora continua del sistema de gestión de calidad')}</li>
    <li>${L('Atender os requisitos aplicáveis', 'Meet applicable requirements', 'Atender los requisitos aplicables')}</li>
    <li>${L('Buscar a satisfação de clientes e colaboradores', 'Pursue customer and employee satisfaction', 'Buscar la satisfacción de clientes y colaboradores')}</li></ol></div>
</div></section>
<section class="sec sec-escura"><div class="in duas">
  <div class="sobe">${sobre(L('Effisa no mundo', 'Effisa worldwide', 'Effisa en el mundo'))}<h2>${L('Máquinas de Braço do Norte para 27 países', 'Machines from Braço do Norte to 27 countries', 'Máquinas de Braço do Norte a 27 países')}</h2>
  <p>${L('Uma ampla rede de contatos em mais de 27 países fez a Effisa cruzar fronteiras e marcar presença em nível mundial.', 'A wide network of contacts in more than 27 countries took Effisa across borders to a worldwide presence.', 'Una amplia red de contactos en más de 27 países llevó a Effisa a cruzar fronteras y estar presente a nivel mundial.')}</p>
  <blockquote>“${L('Somos uma empresa que investe continuamente em pesquisas e novas tecnologias para desenvolver os melhores equipamentos do mercado e garantir sucesso e eficácia aos nossos clientes.', 'We continuously invest in research and new technology to build the best equipment on the market and ensure our customers’ success.', 'Somos una empresa que invierte continuamente en investigación y nuevas tecnologías para desarrollar los mejores equipos del mercado y garantizar el éxito de nuestros clientes.')}”<cite>${L('Direção Effisa', 'Effisa management', 'Dirección Effisa')}</cite></blockquote></div>
  <figure class="sobe">${img('h-laminadora', 'Linha de laminação de superfícies Omega Special Edition', 1124, 561)}</figure>
</div></section>` + faixaClientes() + chamada(v) + rodape(v);
}

function processosPag(v) {
  return head(v, 'processos', 'Máquinas', `Catálogo Effisa: ${maquinas.length - linhas.length} máquinas para movimentação, corte, lixamento, extrusão, pintura, secagem, laminação e embalagem de perfis e painéis.`) + topo(v, 'processos') +
  cabPag(L('Máquinas por processo', 'Machines by process', 'Máquinas por proceso'), L(`${maquinas.length - linhas.length} equipamentos das linhas Alfa, Beta e Omega, do alimentador à embaladora.`, `${maquinas.length - linhas.length} machines from the Alfa, Beta and Omega ranges, from infeed to packing.`, `${maquinas.length - linhas.length} equipos de las líneas Alfa, Beta y Omega, del alimentador a la embaladora.`)) + `
<nav class="sub-nav" aria-label="Processos"><div class="in"><ul>${processos.map((p, i) => `<li><a href="#${p.id}"><span class="sn-n">${String(i + 1).padStart(2, '0')}</span>${LO(p)}</a></li>`).join('')}</ul></div></nav>
${processos.map((p, i) => `<section class="proc sec${i % 2 ? ' sec-cinza' : ''}" id="${p.id}"><div class="in">
  <header class="proc-cab sobe"><span class="proc-num">${String(i + 1).padStart(2, '0')}</span><div><h2>${LO(p)}</h2><p>${L(p.dpt, p.den, p.des)}</p></div></header>
  <ul class="mq-lista">${maqDe(p.id).map(m => `<li class="mq sobe">${fotoM(m)}<div class="mq-txt"><h3>${esc(nomeSemCod(m.n))}</h3>${codigo(m.n) ? `<p class="mq-cod">${codigo(m.n)}</p>` : ''}${m.d ? `<p class="mq-d l-pt">${esc(m.d)}</p>` : ''}</div></li>`).join('')}</ul>
</div></section>`).join('')}` + chamada(v) + rodape(v);
}

function linhasPag(v) {
  return head(v, 'linhas', 'Linhas completas', 'Linhas completas Effisa: pintura e gesso para molduras e boards, hot coating, extrusão e pintura, pintura UV para cabos e automação de plainas moldureiras.') + topo(v, 'linhas') +
  cabPag(L('Linhas completas', 'Complete lines', 'Líneas completas'), L('Máquinas Effisa ligadas entre si: a peça entra crua e sai pintada, seca e pronta para embalar.', 'Effisa machines linked together: the part goes in raw and comes out painted, cured and ready to pack.', 'Máquinas Effisa conectadas entre sí: la pieza entra cruda y sale pintada, seca y lista para embalar.'), imgTopo('h-fabrica', 'Linha para automação de processos Effisa', 1384, 560)) + `
<section class="sec"><div class="in"><ul class="linhas-lista">${linhas.map((m, i) => `<li class="ln sobe">${fotoM(m)}<div><span class="ln-num">${String(i + 1).padStart(2, '0')}</span><h2>${esc(m.n)}</h2>${m.d && m.d !== '-' ? `<p class="l-pt">${esc(m.d)}</p>` : ''}</div></li>`).join('')}</ul></div></section>` + chamada(v) + rodape(v);
}

function aplicacoes(v) {
  return head(v, 'aplicacoes', 'Aplicações', 'Onde as máquinas Effisa trabalham: molduras e boards, molduras decorativas, móveis, kit portas e rodapés, hot coating, esquadrias, forros de PVC e cabos.') + topo(v, 'aplicacoes') +
  cabPag(L('Aplicações', 'Applications', 'Aplicaciones'), L('Oito mercados onde as máquinas Effisa já estão produzindo.', 'Eight markets where Effisa machines are already in production.', 'Ocho mercados donde las máquinas Effisa ya están produciendo.')) + `
${setores.map((s, i) => `<section class="apl sec${i % 2 ? ' apl-inv' : ''}" id="${s.id}"><div class="in apl-grade">
  <figure class="apl-foto sobe">${img(`s-${s.id}`, s.pt, 999, 699)}</figure>
  <div class="sobe"><span class="apl-num">${String(i + 1).padStart(2, '0')}</span><h2>${LO(s)}</h2><p>${L(s.dpt, s.den, s.des)}</p>
  <a class="link-seta" href="${link(v, 'contato')}">${L('Falar com a engenharia', 'Talk to our engineers', 'Hablar con ingeniería')} ${ic('seta')}</a></div>
</div></section>`).join('')}` + faixaClientes() + chamada(v) + rodape(v);
}

function servicos(v) {
  return head(v, 'servicos', 'Peças e serviços', 'Assistência técnica, peças de reposição e SAC da Effisa: contatos diretos de cada departamento.') + topo(v, 'servicos') +
  cabPag(L('Peças e serviços', 'Parts and service', 'Repuestos y servicio'), L('Este espaço foi feito para deixar nosso contato a você: dúvidas, opiniões, peças e assistência.', 'Everything you need after the sale: questions, feedback, parts and service.', 'Este espacio es para dejarle nuestro contacto: dudas, opiniones, repuestos y asistencia.')) + `
<section class="sec"><div class="in">
  <ul class="deptos">${E.deptos.map((d, i) => `<li class="sobe"><span class="dp-ic">${ic(['usuarios', 'chave', 'engrenagem'][i])}</span><h2>${LO(d)}</h2>
    <a href="${telHref(d.fone)}">${ic('tel')}${d.fone}</a><a href="mailto:${d.email}">${ic('mail')}${d.email}</a></li>`).join('')}</ul>
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <div class="sobe">${sobre(L('Peças de reposição', 'Spare parts', 'Repuestos'))}<h2>${L('Grande variedade de peças para a sua Effisa', 'A wide range of parts for your Effisa', 'Gran variedad de repuestos para su Effisa')}</h2>
  <p>${L('Preencha o formulário com o modelo da máquina (o código FF está na plaqueta) e a peça que precisa. O setor de peças responde com o orçamento.', 'Fill in the form with the machine model (the FF code is on the nameplate) and the part you need. Our parts team will reply with a quote.', 'Complete el formulario con el modelo de la máquina (el código FF está en la placa) y el repuesto que necesita. El sector de repuestos responde con el presupuesto.')}</p>
  ${fotoM(maqPorSlug['lixadeira-de-perfis-beta-ff-300-lpb10a'])}</div>
  <div class="sobe caixa-form">${formulario()}</div>
</div></section>` + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Effisa, Rua Olavio Cardoso, 567, Braço do Norte - SC');
  return head(v, 'contato', 'Contato', 'Fale com a Effisa: (48) 3658-2242, effisa@effisa.com.br, Rua Olavio Cardoso, 567, Braço do Norte/SC.') + topo(v, 'contato') +
  cabPag(L('Contato', 'Contact', 'Contacto'), L('Ficou com alguma dúvida? Fale com a gente.', 'Any questions? Get in touch.', '¿Alguna duda? Hable con nosotros.')) + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe caixa-form">${formulario()}</div>
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<span><a href="${telHref(E.fone1)}">${E.fone1}</a><br><a href="${telHref(E.fone2)}">${E.fone2}</a></span></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade} · ${E.cep}</span></li>
    <li>${ic('relogio')}<span>${L('Segunda a sexta', 'Monday to Friday', 'Lunes a viernes')}: 7h30–12h00 · 13h10–17h30</span></li></ul>
    <ul class="deptos deptos-mini">${E.deptos.map(d => `<li><h3>${LO(d)}</h3><a href="${telHref(d.fone)}">${d.fone}</a><a href="mailto:${d.email}">${d.email}</a></li>`).join('')}</ul>
    <iframe class="mapa" title="Mapa da Effisa em Braço do Norte/SC" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe></div>
</div></section>` + rodape(v);
}

// ---------- inícios ----------
function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'Effisa, Braço do Norte/SC: máquinas e linhas completas para movimentação, pintura, secagem, laminação e embalagem de perfis, painéis e molduras. Presente em 27 países.') + topo(v, 'index') + `
<section class="heroa">
  <svg class="ha-anel" viewBox="0 0 100 100" aria-hidden="true"><path d="M30 22a36 36 0 1 0 40 0" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M50 8v38" stroke="currentColor" stroke-width="7" stroke-linecap="round"/></svg>
  <div class="in ha-grade">
    <div class="ha-txt">
      <p class="sobrelinha">${L('Indústria de máquinas · Braço do Norte/SC', 'Machine builder · Braço do Norte, Brazil', 'Fábrica de máquinas · Braço do Norte, Brasil')}</p>
      <h1>${L('Máquinas que transformam perfil cru em produto acabado.', 'Machines that turn raw profiles into finished products.', 'Máquinas que convierten el perfil crudo en producto terminado.')}</h1>
      <p class="ha-sub">${L('Movimentação, extrusão, pintura, secagem, laminação e embalagem para molduras, boards, móveis, portas, esquadrias e forros. Da máquina avulsa à linha completa.', 'Handling, extrusion, painting, curing, laminating and packing for mouldings, boards, furniture, doors, window frames and ceilings. From a single machine to a complete line.', 'Movimiento, extrusión, pintura, secado, laminación y embalaje para molduras, boards, muebles, puertas, aberturas y cielorrasos. De la máquina individual a la línea completa.')}</p>
      <p class="ha-acoes">${btnCot(v)}<a class="btn btn-linha" href="${link(v, 'processos')}">${L('Ver as máquinas', 'See the machines', 'Ver las máquinas')}</a></p>
    </div>
    <figure class="ha-foto">${imgTopo('h-extrusora', 'Extrusora de perfis Omega Special Edition fabricada pela Effisa', 900, 560)}<figcaption>${L('Extrusora de perfis Omega · Special Edition', 'Omega profile extruder · Special Edition', 'Extrusora de perfiles Omega · Special Edition')}</figcaption></figure>
  </div>
  <div class="in">${numeros()}</div>
</section>

<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Do alimentador à embaladora', 'From infeed to packing', 'Del alimentador a la embaladora'))}<h2>${L('Uma linha inteira, uma estação de cada vez', 'A whole line, one station at a time', 'Una línea entera, una estación a la vez')}</h2>
  <p>${L('Cada etapa tem máquinas próprias da Effisa, que funcionam sozinhas ou ligadas entre si.', 'Every stage has its own Effisa machines, working alone or linked together.', 'Cada etapa tiene máquinas propias de Effisa, que funcionan solas o conectadas entre sí.')}</p></div>
  ${esteira(v)}
</div></section>

<section class="faixa-foto"><div class="ff-img">${img('h-laminadora', 'Linha de laminação de superfícies Omega Special Edition', 1124, 561)}</div><div class="in ff-txt sobe">
  ${sobre('Special Edition')}<h2>${L('Laminação de superfícies em madeira, PVC e alumínio', 'Surface laminating for wood, PVC and aluminium', 'Laminación de superficies en madera, PVC y aluminio')}</h2>
  <p>${L('Recobridoras com fusor para EVA, PO e PUR, hot stamping e coladeiras para painéis ripados, perfis e esquadrias.', 'Wrappers with EVA, PO and PUR melters, hot stamping and gluers for slatted panels, profiles and window frames.', 'Recubridoras con fusor para EVA, PO y PUR, hot stamping y encoladoras para paneles ranurados, perfiles y aberturas.')}</p>
  <a class="link-seta" href="${link(v, 'processos')}#laminacao">${L('Máquinas de laminação', 'Laminating machines', 'Máquinas de laminación')} ${ic('seta')}</a></div></section>

<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Aplicações', 'Applications', 'Aplicaciones'))}<h2>${L('Onde as máquinas Effisa produzem', 'Where Effisa machines are at work', 'Dónde producen las máquinas Effisa')}</h2></div>
  ${mosaicoSetores(v)}
</div></section>

<section class="sec sec-cinza"><div class="in duas linhas-home">
  <div class="sobe">${sobre(L('Linhas completas', 'Complete lines', 'Líneas completas'))}<h2>${L('Projetadas para a sua fábrica', 'Engineered for your plant', 'Proyectadas para su fábrica')}</h2>
  <ul class="lh-lista">${linhas.slice(0, 6).map(m => `<li><a href="${link(v, 'linhas')}">${esc(m.n)}</a></li>`).join('')}</ul>
  <a class="link-seta" href="${link(v, 'linhas')}">${L(`Ver as ${linhas.length} linhas`, `See all ${linhas.length} lines`, `Ver las ${linhas.length} líneas`)} ${ic('seta')}</a></div>
  <figure class="sobe">${img('h-fabrica', 'Linha para automação de processos de molduras, marcos e boards', 1384, 560)}</figure>
</div></section>

<section class="sec mundo"><div class="in duas">
  <div class="sobe"><p class="mundo-num">27</p><h2>${L('países com máquinas Effisa', 'countries running Effisa machines', 'países con máquinas Effisa')}</h2>
  <p>${L('Uma ampla rede de contatos fez a Effisa cruzar fronteiras e marcar presença em nível mundial. O site atende em português, inglês e espanhol.', 'A wide network of contacts took Effisa across borders to a worldwide presence. This site serves you in Portuguese, English and Spanish.', 'Una amplia red de contactos llevó a Effisa a cruzar fronteras y estar presente a nivel mundial. Este sitio atiende en portugués, inglés y español.')}</p></div>
  <blockquote class="sobe">“${L('Investimos continuamente em pesquisas e novas tecnologias para desenvolver os melhores equipamentos do mercado e garantir sucesso e eficácia aos nossos clientes.', 'We continuously invest in research and new technology to build the best equipment on the market and ensure our customers’ success.', 'Invertimos continuamente en investigación y nuevas tecnologías para desarrollar los mejores equipos del mercado y garantizar el éxito de nuestros clientes.')}”<cite>${L('Direção Effisa', 'Effisa management', 'Dirección Effisa')}</cite></blockquote>
</div></section>
` + faixaClientes() + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Effisa, Braço do Norte/SC: linhas de automação para perfis, painéis e molduras. Movimentação, extrusão, pintura, secagem, laminação e embalagem. Presente em 27 países.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('h-fabrica', 'Linha de automação Effisa para molduras, marcos e boards', 1384, 560)}</div>
  <div class="in hb-txt">
    <p class="sobrelinha">${L('Linhas de automação · desde 2013', 'Automation lines · since 2013', 'Líneas de automatización · desde 2013')}</p>
    <h1>${L('Sua fábrica de perfis, <em>no automático.</em>', 'Your profile plant, <em>on automatic.</em>', 'Su fábrica de perfiles, <em>en automático.</em>')}</h1>
    <p class="hb-sub">${L('Máquinas e linhas completas Effisa para molduras, boards, móveis, portas, esquadrias e forros, em operação em 27 países.', 'Effisa machines and complete lines for mouldings, boards, furniture, doors, window frames and ceilings, running in 27 countries.', 'Máquinas y líneas completas Effisa para molduras, boards, muebles, puertas, aberturas y cielorrasos, operando en 27 países.')}</p>
    <p class="ha-acoes">${btnCot(v)}<a class="btn btn-linha" href="${link(v, 'linhas')}">${L('Ver linhas completas', 'See complete lines', 'Ver líneas completas')}</a></p>
  </div>
</section>
<section class="sec faixa-num"><div class="in">${numeros()}</div></section>

<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Processos', 'Processes', 'Procesos'))}<h2>${L('Oito etapas, uma só fabricante', 'Eight stages, one manufacturer', 'Ocho etapas, un solo fabricante')}</h2></div>
  <div class="proc-abas" data-abas>
    <div class="pa-lista" role="tablist">${processos.map((p, i) => `<button role="tab" aria-selected="${i === 0}" data-aba="${p.id}"><span class="pa-n">${String(i + 1).padStart(2, '0')}</span>${LO(p)}</button>`).join('')}</div>
    ${processos.map((p, i) => { const ms = maqDe(p.id).slice(0, 3); return `<div class="pa-painel" role="tabpanel" data-painel="${p.id}"${i ? ' hidden' : ''}>
      <div class="pa-txt"><h3>${LO(p)}</h3><p>${L(p.dpt, p.den, p.des)}</p><ul class="lista-check">${maqDe(p.id).slice(0, 5).map(m => `<li>${esc(nomeSemCod(m.n))}</li>`).join('')}</ul>
      <a class="link-seta" href="${link(v, 'processos')}#${p.id}">${L(`Todas as ${maqDe(p.id).length} máquinas`, `All ${maqDe(p.id).length} machines`, `Las ${maqDe(p.id).length} máquinas`)} ${ic('seta')}</a></div>
      <div class="pa-fotos">${ms.map(m => imgM(m)).join('')}</div></div>`; }).join('')}
  </div>
</div></section>

<section class="sec sec-escura"><div class="in duas">
  <figure class="sobe">${img('h-extrusora', 'Extrusora de perfis Omega Special Edition', 900, 560)}</figure>
  <div class="sobe">${sobre(L('Extrusão e gravação', 'Extrusion and embossing', 'Extrusión y grabado'))}<h2>${L('Gesso, massa acrílica e UV com acabamento de fábrica grande', 'Gesso, acrylic filler and UV with big-plant finish', 'Yeso, masilla acrílica y UV con terminación de gran fábrica')}</h2>
  <p>${L('A extrusora Omega aplica uma camada fina sobre substratos de madeira, corrige imperfeições e nivela a face do perfil. A alimentação é contínua, por rosca helicoidal, até a câmara lacrada de alta pressão.', 'The Omega extruder applies a thin layer over wood substrates, corrects imperfections and levels the profile face. Feeding is continuous, by screw conveyor, into a sealed high-pressure chamber.', 'La extrusora Omega aplica una capa fina sobre sustratos de madera, corrige imperfecciones y nivela la cara del perfil. La alimentación es continua, por tornillo helicoidal, hasta la cámara sellada de alta presión.')}</p>
  <img class="perfis" src="/assets/img/h-perfis.webp" alt="Perfis de madeira com acabamento branco" width="844" height="460" loading="lazy"></div>
</div></section>

<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Aplicações', 'Applications', 'Aplicaciones'))}<h2>${L('Para quem produz', 'Built for', 'Para quien produce')}</h2></div>
  <ul class="setores-b">${setores.map(s => `<li class="sobe"><a href="${link(v, 'aplicacoes')}#${s.id}">${img(`s-${s.id}`, s.pt, 999, 699)}<span>${LO(s)}</span>${ic('seta')}</a></li>`).join('')}</ul>
</div></section>
` + faixaClientes() + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), processos: processosPag(v), linhas: linhasPag(v), aplicacoes: aplicacoes(v), servicos: servicos(v), contato: contato(v) });

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
fs.copyFileSync(path.join(aqui, 'effisa.js'), path.join(pub, 'assets/effisa.js'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Effisa', artigo: 'da', url: E.url, lang: 'pt', cor: '#ff0000', fundo: '#26272b', claro: '#f2f2f3',
  fonteTitulo: "'Fira Sans Condensed',system-ui,sans-serif", fonteTexto: "'Fira Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: 'Clara, com o vermelho do botão do logo e as máquinas recortadas em fundo branco, como no catálogo. Abre com a extrusora Special Edition.', pontos: ['Linha de produção em 8 estações, do alimentador à embaladora', `Catálogo com as ${maquinas.length - linhas.length} máquinas do site, por processo`, 'Português, inglês e espanhol em todas as páginas'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Mais industrial: grafite e vermelho, abre com a foto de uma linha Effisa montada no cliente.', pontos: ['Processos em abas com as máquinas de cada etapa', 'Faixa escura da extrusora com os perfis acabados', 'Mesmas 7 páginas e as três línguas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
