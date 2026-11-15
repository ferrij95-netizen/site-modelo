// Gaidzinski Máquinas (Braço do Norte/SC, desde 1978): máquinas e linhas completas para acabamento de perfis, molduras, rodapés, portas e móveis. Gera public/{a,b}/ e a página de escolha.
// node clientes/gaidzinski/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs gaidzinski https://www.gaidzinski.com.br/)
// 70 máquinas com fotos, dados técnicos, detalhes e vídeos do site atual (gaidzinski.com.br). Logo vetorizado (vetorizar-logo.py).
// Línguas: o site atual tem PT/EN/ES. Cada página leva as três (L(pt,en,es)); nomes e dados técnicos das máquinas ficam em português.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const ext = 'target="_blank" rel="noopener"';
const L = (pt, en, es) => `<span class="l-pt">${pt}</span><span class="l-en">${en ?? pt}</span><span class="l-es">${es ?? pt}</span>`;
const D = JSON.parse(fs.readFileSync(path.join(aqui, 'maquinas.json'), 'utf8'));
const maquinas = D.prods.filter(p => p.w);

const E = {
  nome: 'Gaidzinski Máquinas', legal: 'Gaidzinski Máquinas', url: 'https://gaidzinski.overtus.com.br/', antigo: 'https://www.gaidzinski.com.br/',
  fone: '(48) 3658-2635', foneHref: 'tel:+554836582635', fones2: '(48) 3658-1195 · (48) 3658-1290', wa: '(48) 3658-2635', waNum: '554836582635', email: 'vendas@gaidzinski.com.br',
  end: 'Rua Tiago Artur da Rosa, 177, São Januário', cidade: 'Braço do Norte/SC · CEP 88750-000',
};
const waLink = `https://wa.me/${E.waNum}`;
const ANOS = 2026 - 1978;

// ordem do processo numa linha de acabamento
const cats = [
  { id: 'transferencia-e-armazenagem', n: ['Transferência e armazenagem', 'Handling and storage', 'Transferencia y almacenaje'], t: ['Alimentadores, descarregadores, transfers e robôs que levam a peça de uma máquina à outra.', 'Feeders, unloaders, transfers and robots that move the part from machine to machine.', 'Alimentadores, descargadores, transfers y robots que llevan la pieza de una máquina a otra.'] },
  { id: 'fresamento-lixamento-e-polimento', n: ['Fresamento, lixamento e polimento', 'Milling, sanding and polishing', 'Fresado, lijado y pulido'], t: ['Lixadeiras e fresadoras de 2 a 8 cabeçotes que preparam o perfil para o acabamento.', 'Sanders and moulders with 2 to 8 heads that prepare the profile for finishing.', 'Lijadoras y fresadoras de 2 a 8 cabezales que preparan el perfil para el acabado.'] },
  { id: 'extrusao', n: ['Extrusão de gesso', 'Gesso extrusion', 'Extrusión de yeso'], t: ['Engessadeiras que cobrem nós, fissuras e avarias e deixam o perfil liso.', 'Gesso coaters that fill knots, cracks and defects and leave the profile smooth.', 'Enyesadoras que cubren nudos, fisuras y defectos y dejan el perfil liso.'] },
  { id: 'pintura', n: ['Pintura', 'Painting', 'Pintura'], t: ['Pintura a vácuo e por spray, até robô de pintura para portas e painéis.', 'Vacuum and spray coating, up to a painting robot for doors and panels.', 'Pintura al vacío y por spray, hasta robot de pintura para puertas y paneles.'] },
  { id: 'secagem', n: ['Secagem UV', 'UV drying', 'Secado UV'], t: ['Túneis de secagem UV lineares e transversais, inclusive versão de laboratório.', 'Linear and transverse UV drying tunnels, including a lab version.', 'Túneles de secado UV lineales y transversales, incluso versión de laboratorio.'] },
  { id: 'recobrimento', n: ['Recobrimento', 'Profile wrapping', 'Revestimiento de perfiles'], t: ['Recobridoras de perfis N4 a N24, laminadoras de portas e pré-fusores de cola.', 'N4 to N24 profile wrappers, door laminators and hot-melt pre-melters.', 'Revestidoras de perfiles N4 a N24, laminadoras de puertas y prefusores de cola.'] },
  { id: 'gravacao', n: ['Gravação', 'Embossing', 'Grabado'], t: ['Gravação decorativa e industrial em relevo no perfil.', 'Decorative and industrial embossing on the profile.', 'Grabado decorativo e industrial en relieve sobre el perfil.'] },
  { id: 'corte-e-modelagem', n: ['Corte e modelagem', 'Cutting and shaping', 'Corte y modelado'], t: ['Destopadeiras, serras, separatrizes, modeladores e torno.', 'Cross-cut saws, rip saws, splitters, shapers and lathe.', 'Despuntadoras, sierras, separadoras, moldeadoras y torno.'] },
  { id: 'embalagem', n: ['Embalagem', 'Packaging', 'Embalaje'], t: ['Embaladeiras automáticas, seladoras com túnel de encolhimento e amarradores de pacotes.', 'Automatic wrappers, shrink-tunnel sealers and bundle tiers.', 'Embaladoras automáticas, selladoras con túnel termocontraíble y atadores de paquetes.'] },
];
maquinas.sort((a, b) => cats.findIndex(c => c.id === a.cat) - cats.findIndex(c => c.id === b.cat));
const deCat = id => maquinas.filter(p => p.cat === id);
const fotoCat = id => (deCat(id).find(p => p.dets.length) || deCat(id)[0]);
const apls = [
  ['molduras-e-quadros', ['Molduras e quadros', 'Frames and mouldings', 'Molduras y cuadros']],
  ['rodapes', ['Rodapés', 'Skirting boards', 'Zócalos']],
  ['kit-porta-pronta', ['Kit porta pronta', 'Pre-hung door kits', 'Kit puerta lista']],
  ['fabrica-de-moveis', ['Fábrica de móveis', 'Furniture plants', 'Fábricas de muebles']],
  ['fabrica-de-bercos', ['Fábrica de berços', 'Crib makers', 'Fábricas de cunas']],
  ['madeireira', ['Madeireiras', 'Sawmills and timber', 'Madereras']],
  ['forros-e-esquadrias-de-pvc', ['Forros e esquadrias de PVC', 'PVC ceilings and frames', 'Cielorrasos y aberturas de PVC']],
];
const aplPt = { 'Molduras e Quadros': 'molduras-e-quadros', 'Rodapés': 'rodapes', 'Kit Porta Pronta': 'kit-porta-pronta', 'Fábrica de Móveis': 'fabrica-de-moveis', 'Fábrica de Berços': 'fabrica-de-bercos', 'Madeireira': 'madeireira', 'Forros e Esquadrias de PVC': 'forros-e-esquadrias-de-pvc' };
const aplN = s => apls.find(a => a[0] === s)[1];

const img = (n, alt, w, h, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt, w, h) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" fetchpriority="high" decoding="async">`;
const M = s => maquinas.find(p => p.s === s);
const imgM = (p, topo) => (topo ? imgTopo : img)(`m-${p.s}`, `${p.n} ${p.cod}`.trim(), p.w, p.h);

const nav = [
  { slug: 'index', n: ['Início', 'Home', 'Inicio'] },
  { slug: 'empresa', n: ['Quem somos', 'About us', 'Quiénes somos'] },
  { slug: 'maquinas', n: ['Máquinas', 'Machines', 'Máquinas'] },
  { slug: 'linhas', n: ['Linhas e aplicações', 'Lines and applications', 'Líneas y aplicaciones'] },
  { slug: 'contato', n: ['Contato', 'Contact', 'Contacto'] },
];
export const nomesVersao = { a: 'Tecnologia para o melhor acabamento', b: 'Escuderia da eficiência' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,500;0,600;0,700;0,800;1,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap';
const linguaHead = `<script>(function(){try{var q=new URLSearchParams(location.search).get('lang');var l=q||localStorage.getItem('gaidzinski-lang')||'pt';if(!/^(pt|en|es)$/.test(l))l='pt';document.documentElement.setAttribute('data-l',l);if(q)localStorage.setItem('gaidzinski-lang',l)}catch(e){}})()</script>`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Gaidzinski Máquinas | Máquinas para acabamento de perfis, molduras e rodapés' : `${titulo} | Gaidzinski Máquinas`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#001d49' })
  .replace('</head>', `${linguaHead}\n</head>`);

const btnOrc = (v, cls = 'btn') => `<a class="${cls}" href="${link(v, 'contato')}">${L('Pedir orçamento', 'Request a quote', 'Pedir presupuesto')}</a>`;
const linguas = `<div class="linguas" role="group" aria-label="Idioma / Language"><button data-lang="pt" aria-label="Português">PT</button><button data-lang="en" aria-label="English">EN</button><button data-lang="es" aria-label="Español">ES</button></div>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const logo = (branco, w = 200) => `<img class="logo" src="/assets/${branco ? 'logo-branco' : 'logo'}.svg" alt="Gaidzinski Máquinas" width="${w}" height="${Math.round(w * 181 / 759)}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">${L('Tecnologia para o melhor acabamento', 'Technology for the finest finish', 'Tecnología para el mejor acabado')}</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a>${linguas}</span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Gaidzinski Máquinas, página inicial">${logo(v === 'b', 210)}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${L(...n.n)}</a></li>`).join('')}</ul>${linguas}</nav>
    ${btnOrc(v, 'btn btn-topo')}
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
    <div class="rod-marca">${logo(true, 220)}
      <p>${L(`Máquinas e linhas completas para acabamento de perfis. Braço do Norte/SC, desde 1978.`, 'Machines and complete lines for profile finishing. Braço do Norte, Brazil, since 1978.', 'Máquinas y líneas completas para acabado de perfiles. Braço do Norte, Brasil, desde 1978.')}</p></div>
    <div><h3>${L('Máquinas', 'Machines', 'Máquinas')}</h3><ul>${cats.map(c => `<li><a href="${link(v, 'maquinas')}?cat=${c.id}">${L(...c.n)}</a></li>`).join('')}</ul></div>
    <div><h3>${L('Atendimento', 'Contact', 'Atención')}</h3><ul class="rod-dados">
      <li>${ic('tel')}<span><a href="${E.foneHref}">${E.fone}</a><br>${E.fones2}</span></li>
      <li>${icWa()}<a href="${waLink}" ${ext}>WhatsApp ${E.wa}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>${L('Empresa', 'Company', 'Empresa')}</h3><ul>
      <li><a href="${link(v, 'empresa')}">${L('Quem somos', 'About us', 'Quiénes somos')}</a></li>
      <li><a href="${link(v, 'linhas')}">${L('Linhas de produção', 'Production lines', 'Líneas de producción')}</a></li>
      <li><a href="${link(v, 'contato')}#representantes">${L('Representantes', 'Sales reps', 'Representantes')}</a></li>
      <li><a href="${link(v, 'contato')}#trabalhe">${L('Trabalhe conosco', 'Careers', 'Trabaje con nosotros')}</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>${L('O aperto de mão é para nós um selo', 'A handshake is our seal', 'El apretón de manos es nuestro sello')}</span></div>
</footer>
<a class="wa-flutua" href="${waLink}" ${ext} aria-label="WhatsApp Gaidzinski">${icWa()}</a>
<script src="/assets/gaidzinski.js" defer></script>
</body>
</html>`;
}

// ---------- blocos ----------
const numeros = () => `<ul class="numeros">
  <li><b>1978</b><span>${L('fundada por Antônio Gaidzinski', 'founded by Antônio Gaidzinski', 'fundada por Antônio Gaidzinski')}</span></li>
  <li><b>${ANOS}</b><span>${L('anos fazendo máquinas', 'years building machines', 'años fabricando máquinas')}</span></li>
  <li><b>${maquinas.length}</b><span>${L('máquinas no catálogo', 'machines in the catalogue', 'máquinas en el catálogo')}</span></li>
  <li><b>9</b><span>${L('etapas do acabamento, da alimentação à embalagem', 'finishing steps, from feeding to packing', 'etapas del acabado, de la alimentación al embalaje')}</span></li>
  <li><b>5</b><span>${L('continentes com máquinas Gaidzinski', 'continents running Gaidzinski machines', 'continentes con máquinas Gaidzinski')}</span></li>
</ul>`;

const processo = (v, cls = '') => `<ol class="processo ${cls}">${cats.map((c, i) => { const p = fotoCat(c.id); return `<li class="sobe"><a href="${link(v, 'maquinas')}?cat=${c.id}"><span class="pc-n">${String(i + 1).padStart(2, '0')}</span><span class="pc-img">${imgM(p)}</span><b>${L(...c.n)}</b><span class="pc-t">${deCat(c.id).length} ${L('máquinas', 'machines', 'máquinas')}</span></a></li>`; }).join('')}</ol>`;

const aplicacoes = v => `<ul class="apls">${apls.map(([s, n]) => `<li class="sobe"><a href="${link(v, 'maquinas')}?apl=${s}">${img(`a-${s}`, n[0], 370, 247)}<b>${L(...n)}</b></a></li>`).join('')}</ul>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>${L('Monte a sua linha com a Gaidzinski', 'Build your line with Gaidzinski', 'Arme su línea con Gaidzinski')}</h2>
  <p>${L('Diga o perfil, as medidas e a produção que você precisa. A engenharia desenha a máquina ou a linha completa sob medida.', 'Tell us the profile, sizes and output you need. Our engineers design the machine or the full line to measure.', 'Indique el perfil, las medidas y la producción que necesita. La ingeniería diseña la máquina o la línea completa a medida.')}</p></div>
  <div class="ch-acoes">${btnOrc(v)}<a class="btn btn-linha" href="${waLink}" ${ext}>${icWa()}WhatsApp</a></div>
</div></section>`;

const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Contato pelo site da Gaidzinski">
  <div class="form-duas"><label>${L('Nome', 'Name', 'Nombre')} *<input name="nome" required autocomplete="name"></label><label>${L('Empresa', 'Company', 'Empresa')}<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>E-mail *<input name="email" type="email" required autocomplete="email"></label><label>${L('Telefone / WhatsApp', 'Phone / WhatsApp', 'Teléfono / WhatsApp')} *<input name="fone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>${L('Cidade / país', 'City / country', 'Ciudad / país')} *<input name="cidade" required autocomplete="address-level2"></label><label>${L('Interesse', 'Interest', 'Interés')}<select name="interesse"><option>Máquina avulsa</option><option>Linha de produção completa</option><option>Peças e assistência</option><option>Máquina usada</option><option>Outros</option></select></label></div>
  <label>${L('Perfil, medidas e produção desejada', 'Profile, sizes and output', 'Perfil, medidas y producción')} *<textarea name="mensagem" rows="5" required></textarea></label>
  <button class="btn" type="submit">${L('Enviar', 'Send', 'Enviar')} ${ic('seta')}</button>
  <p class="form-nota">${L('Abre o seu e-mail com a mensagem pronta para', 'Opens your e-mail with the message ready for', 'Abre su correo con el mensaje listo para')} ${E.email}.</p>
</form>`;

const cabPag = (titulo, sub, foto) => `<section class="cab-pag${foto ? ' com-foto' : ''}">${foto ? `<div class="cp-foto">${foto}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

// ---------- catálogo ----------
const dados = t => {
  if (!t || t === 'value') return '';
  const ls = t.split('\n').map(l => l.replace(/^-\s*/, '').trim()).filter(Boolean);
  return `<ul class="mq-dados">${ls.map(l => /:$/.test(l) ? `<li class="mq-sub">${esc(l.replace(/:$/, ''))}</li>` : `<li>${esc(l)}</li>`).join('')}</ul>`;
};
const cardMaq = v => p => `<li class="mq" data-cat="${p.cat}" data-apl="${p.apl.map(a => aplPt[a] || '').join(' ')}" data-busca="${esc((p.n + ' ' + p.cod + ' ' + p.desc).toLowerCase())}">
  <a class="mq-foto" href="/assets/img/m-${p.s}.webp" data-foto="${esc(`${p.n} ${p.cod}`)}">${imgM(p)}</a>
  <div class="mq-txt"><p class="mq-cod">${p.cod || '&nbsp;'}</p><h3>${esc(p.n)}</h3><p class="mq-desc">${esc(p.desc)}</p>
  ${p.apl.length ? `<p class="mq-apl">${p.apl.map(a => aplPt[a] ? `<span>${L(...aplN(aplPt[a]))}</span>` : '').join('')}</p>` : ''}
  ${dados(p.dados) || p.dets.length ? `<details><summary>${L('Dados técnicos e detalhes', 'Specs and details', 'Datos técnicos y detalles')}</summary>${dados(p.dados)}${p.dets.length ? `<ul class="mq-dets">${p.dets.map(([t, w, h], i) => `<li><a href="/assets/img/d-${p.s}-${i}.webp" data-foto="${esc(t)}">${img(`d-${p.s}-${i}`, t || p.n, w, h)}</a>${t ? `<span>${esc(t)}</span>` : ''}</li>`).join('')}</ul>` : ''}</details>` : ''}
  ${p.yt ? `<a class="mq-video" href="https://www.youtube.com/watch?v=${p.yt}" ${ext}>${ic('yt')} ${L('Ver a máquina trabalhando', 'Watch it running', 'Verla trabajando')}</a>` : ''}</div></li>`;

// ---------- páginas internas ----------
function empresa(v) {
  return head(v, 'empresa', 'Quem somos', `Gaidzinski Máquinas: desde 1978 em Braço do Norte/SC. De ferraria a líder em máquinas de acabamento para o setor moldureiro, com clientes no Brasil, Américas, Europa, África e Ásia.`) + topo(v, 'empresa') +
  cabPag(L('De Braço do Norte para o mundo', 'From Braço do Norte to the world', 'De Braço do Norte al mundo'), L('Há quase meio século equipando a indústria de perfis, molduras, portas e móveis.', 'Equipping the profile, moulding, door and furniture industry for almost half a century.', 'Hace casi medio siglo equipando la industria de perfiles, molduras, puertas y muebles.'), imgTopo('h-robo', 'Robô Gaidzinski movimentando perfis de madeira', 735, 558)) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre(L('Nossa história', 'Our story', 'Nuestra historia'))}
    <h2>${L('Começou como ferraria, virou referência em acabamento', 'It began as a forge and became a finishing benchmark', 'Empezó como herrería y se volvió referencia en acabado')}</h2>
    <p>${L('A Gaidzinski começou em 1978, pelas mãos de Antônio Gaidzinski, como uma ferraria que atendia a agricultura de Braço do Norte, no sul de Santa Catarina. Depois vieram a usinagem, a solda, a funilaria e a caldeiraria.', 'Gaidzinski was started in 1978 by Antônio Gaidzinski as a forge serving farmers around Braço do Norte, in southern Santa Catarina. Machining, welding, sheet metal and boiler work followed.', 'Gaidzinski nació en 1978, de la mano de Antônio Gaidzinski, como una herrería para el campo de Braço do Norte, en el sur de Santa Catarina. Luego llegaron el mecanizado, la soldadura, la chapistería y la calderería.')}</p>
    <p>${L('Hoje é líder em acabamento no setor moldureiro civil e decorativo e entrega desde máquinas avulsas até linhas completas, que trabalham integradas da alimentação à embalagem.', 'Today it leads finishing for the construction and decorative moulding sector, delivering single machines and complete lines that run integrated from feeding to packing.', 'Hoy lidera el acabado en el sector de molduras civil y decorativo, y entrega desde máquinas sueltas hasta líneas completas integradas de la alimentación al embalaje.')}</p>
  </div>
  <figure class="sobe">${img('h-equipe', 'Equipe Gaidzinski na fábrica de Braço do Norte', 520, 414)}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Como trabalhamos', 'How we work', 'Cómo trabajamos'))}<h2>${L('Projeto sob medida, suporte que resolve', 'Custom design, support that solves', 'Proyecto a medida, soporte que resuelve')}</h2></div>
  <ul class="valores">
    <li class="sobe">${ic('engrenagem')}<h3>${L('Personalização', 'Customisation', 'Personalización')}</h3><p>${L('Cada projeto se adapta ao perfil, à medida e à produção do cliente.', 'Each project fits the customer’s profile, sizes and output.', 'Cada proyecto se adapta al perfil, la medida y la producción del cliente.')}</p></li>
    <li class="sobe">${ic('chave')}<h3>${L('Suporte próximo', 'Close support', 'Soporte cercano')}</h3><p>${L('Um suporte reconhecido por ser resolutivo e confiável, do start-up à manutenção.', 'Support known for solving problems, from start-up to maintenance.', 'Un soporte reconocido por resolver, del arranque al mantenimiento.')}</p></li>
    <li class="sobe">${ic('fabrica')}<h3>${L('Linha completa', 'Complete lines', 'Línea completa')}</h3><p>${L('Grupos de máquinas integradas que aceleram todo o processo produtivo.', 'Integrated machine groups that speed up the whole process.', 'Grupos de máquinas integradas que aceleran todo el proceso.')}</p></li>
    <li class="sobe">${ic('estrela')}<h3>${L('Indústria 4.0', 'Industry 4.0', 'Industria 4.0')}</h3><p>${L('Robôs de alimentação, descarga e pintura, e introdução constante de tecnologia.', 'Feeding, unloading and painting robots and constant new technology.', 'Robots de alimentación, descarga y pintura, y tecnología nueva constante.')}</p></li>
  </ul>
</div></section>
<section class="sec sec-escura"><div class="in duas">
  <div class="sobe">${sobre(L('Presença global', 'Global reach', 'Presencia global'))}<h2>${L('Todo o Brasil, Américas, Europa, África e Ásia', 'All of Brazil, the Americas, Europe, Africa and Asia', 'Todo Brasil, las Américas, Europa, África y Asia')}</h2>
  <p>${L('Uma das líderes mundiais no fornecimento de equipamentos para a indústria madeireira e moveleira, com máquinas trabalhando em vários continentes.', 'One of the world’s leading suppliers of equipment for the timber and furniture industry, with machines running on several continents.', 'Uno de los líderes mundiales en equipos para la industria maderera y del mueble, con máquinas en varios continentes.')}</p>
  <a class="link-seta" href="${link(v, 'maquinas')}">${L('Ver as máquinas', 'See the machines', 'Ver las máquinas')} ${ic('seta')}</a></div>
  <figure class="sobe">${img('h-recobridora', 'Recobridora de perfis Gaidzinski', 770, 475)}</figure>
</div></section>` + chamada(v) + rodape(v);
}

function maquinasPag(v) {
  return head(v, 'maquinas', 'Máquinas', `Catálogo Gaidzinski: ${maquinas.length} máquinas para acabamento de perfis. Lixadeiras, engessadeiras, pintura a vácuo, túneis UV, recobridoras, gravação, serras e embaladeiras.`) + topo(v, 'maquinas') +
  cabPag(L('Máquinas', 'Machines', 'Máquinas'), L(`${maquinas.length} máquinas com dados técnicos, detalhes e vídeo. Filtre pela etapa do processo ou pela aplicação.`, `${maquinas.length} machines with specs, details and video. Filter by process step or application.`, `${maquinas.length} máquinas con datos técnicos, detalles y video. Filtre por etapa o aplicación.`)) + `
<section class="sec cat-sec"><div class="in">
  <div class="filtros" data-filtros>
    <div class="f-linhas" role="group" aria-label="Etapas"><button type="button" data-cat="" aria-pressed="true">${L('Todas', 'All', 'Todas')} <span>${maquinas.length}</span></button>${cats.map(c => `<button type="button" data-cat="${c.id}" aria-pressed="false">${L(...c.n)} <span>${deCat(c.id).length}</span></button>`).join('')}</div>
    <div class="f-campos"><label>${L('Aplicação', 'Application', 'Aplicación')}<select data-apl><option value="">Todas · All</option>${apls.map(([s, n]) => `<option value="${s}">${n[0]}</option>`).join('')}</select></label>
    <label>${L('Buscar', 'Search', 'Buscar')}<input type="search" data-busca placeholder="IG-RP, lixadeira, UV, portas..."></label>
    <p class="f-total" aria-live="polite"><b data-total>${maquinas.length}</b> ${L('máquinas', 'machines', 'máquinas')}</p></div>
  </div>
  <ul class="catalogo">${maquinas.map(cardMaq(v)).join('')}</ul>
  <p class="cat-vazio" hidden>${L('Nenhuma máquina com esse filtro. Fale com a Gaidzinski: projetamos sob medida.', 'No machine matches. Talk to Gaidzinski: we design to measure.', 'Ninguna máquina con ese filtro. Hable con Gaidzinski: diseñamos a medida.')}</p>
</div></section>` + chamada(v) + rodape(v);
}

function linhas(v) {
  return head(v, 'linhas', 'Linhas e aplicações', 'Linhas de produção completas Gaidzinski para molduras, rodapés, kit porta pronta, móveis, berços, madeireiras e PVC: da alimentação à embalagem.') + topo(v, 'linhas') +
  cabPag(L('Linhas e aplicações', 'Lines and applications', 'Líneas y aplicaciones'), L('Da peça bruta ao pacote pronto: as máquinas Gaidzinski trabalham sozinhas ou integradas numa linha.', 'From raw part to finished pack: Gaidzinski machines run alone or integrated in a line.', 'De la pieza bruta al paquete listo: las máquinas Gaidzinski trabajan solas o integradas en una línea.'), imgTopo('h-recobridora', 'Linha de recobrimento Gaidzinski', 770, 475)) + `
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Linha de acabamento', 'Finishing line', 'Línea de acabado'))}<h2>${L('Nove etapas, um fornecedor', 'Nine steps, one supplier', 'Nueve etapas, un proveedor')}</h2><p>${L('Escolha as etapas que a sua fábrica precisa. A Gaidzinski projeta os transfers entre elas para a linha andar sem parar.', 'Pick the steps your plant needs. Gaidzinski designs the transfers between them so the line never stops.', 'Elija las etapas que su fábrica necesita. Gaidzinski diseña los transfers entre ellas para que la línea no pare.')}</p></div>
  ${processo(v, 'processo-largo')}
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Aplicações', 'Applications', 'Aplicaciones'))}<h2>${L('Para quem a Gaidzinski fabrica', 'Who Gaidzinski builds for', 'Para quién fabrica Gaidzinski')}</h2></div>
  ${aplicacoes(v)}
</div></section>
<section class="sec"><div class="in duas">
  <figure class="sobe">${img('h-robo', 'Robô de alimentação Gaidzinski', 735, 558)}</figure>
  <div class="sobe">${sobre(L('Automação', 'Automation', 'Automatización'))}<h2>${L('Robôs para movimentar perfis, portas, painéis e chapas', 'Robots to move profiles, doors, panels and boards', 'Robots para mover perfiles, puertas, paneles y chapas')}</h2>
  <p>${L('Alimentação e descarga automáticas tiram o operador do trabalho pesado e mantêm o ritmo da linha.', 'Automatic feeding and unloading take operators off heavy work and keep the line’s pace.', 'La alimentación y descarga automáticas sacan al operador del trabajo pesado y mantienen el ritmo de la línea.')}</p>
  <a class="link-seta" href="${link(v, 'maquinas')}?cat=transferencia-e-armazenagem">${L('Transferência e armazenagem', 'Handling and storage', 'Transferencia y almacenaje')} ${ic('seta')}</a></div>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Gaidzinski Máquinas, Rua Tiago Artur da Rosa, 177, Braço do Norte - SC');
  return head(v, 'contato', 'Contato', 'Fale com a Gaidzinski: (48) 3658-2635, vendas@gaidzinski.com.br. Rua Tiago Artur da Rosa, 177, São Januário, Braço do Norte/SC.') + topo(v, 'contato') +
  cabPag(L('Contato', 'Contact', 'Contacto'), L('Orçamentos, linhas completas, peças, representantes e vagas.', 'Quotes, complete lines, parts, reps and careers.', 'Presupuestos, líneas completas, repuestos, representantes y empleo.')) + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe caixa-form">${formulario()}</div>
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<span><a href="${E.foneHref}">${E.fone}</a><br>${E.fones2}</span></li>
    <li>${icWa()}<a href="${waLink}" ${ext}>WhatsApp ${E.wa}</a></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <iframe class="mapa" title="Mapa da Gaidzinski em Braço do Norte/SC" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=14&output=embed"></iframe></div>
</div></section>
<section class="sec sec-cinza"><div class="in duas-cartoes">
  <div class="cartao sobe" id="representantes">${ic('usuarios')}<h2>${L('Representantes', 'Sales reps', 'Representantes')}</h2><p>${L('Quer representar a Gaidzinski na sua região ou país? Mande o seu cadastro.', 'Want to represent Gaidzinski in your region or country? Send us your details.', '¿Quiere representar a Gaidzinski en su región o país? Envíe sus datos.')}</p><a class="btn" href="mailto:${E.email}?subject=${encodeURIComponent('Quero representar a Gaidzinski')}">${L('Enviar cadastro', 'Send details', 'Enviar datos')}</a></div>
  <div class="cartao sobe" id="trabalhe">${ic('chave')}<h2>${L('Gosta de grandes desafios?', 'Like big challenges?', '¿Le gustan los grandes desafíos?')}</h2><p>${L('Faça parte da nossa escuderia da eficiência e trabalhe em projetos que vão para o mundo todo.', 'Join our efficiency team and work on projects shipped worldwide.', 'Forme parte de nuestra escudería de la eficiencia y trabaje en proyectos que van a todo el mundo.')}</p><a class="btn btn-linha" href="mailto:${E.email}?subject=${encodeURIComponent('Trabalhe conosco')}">${L('Enviar currículo', 'Send CV', 'Enviar currículum')}</a></div>
</div></section>` + rodape(v);
}

// ---------- inícios ----------
const destaque = ['recobridora-de-perfis-industrial-master-n19', 'robo-de-pintura-automatica-para-portas-e-paineis-ig-pap', 'lixadeira-industrial-master-08-cabecotes', 'tunel-de-secagem-linear-0-8-uv-ig-tsl'].map(s => maquinas.find(p => p.s.startsWith(s.slice(0, 30)))).filter(Boolean);

function inicioA() {
  const v = 'a';
  const h = destaque[0] || maquinas[0];
  return head(v, 'index', '', 'Gaidzinski Máquinas, Braço do Norte/SC: máquinas e linhas completas para acabamento de perfis, molduras, rodapés, portas e móveis. Lixamento, gesso, pintura, secagem UV, recobrimento e embalagem. Desde 1978.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      <p class="sobrelinha">${L('Braço do Norte/SC · desde 1978', 'Braço do Norte, Brazil · since 1978', 'Braço do Norte, Brasil · desde 1978')}</p>
      <h1>${L('Tecnologia para o <em>melhor acabamento.</em>', 'Technology for the <em>finest finish.</em>', 'Tecnología para el <em>mejor acabado.</em>')}</h1>
      <p class="ha-sub">${L('Máquinas e linhas completas para lixar, engessar, pintar, secar, recobrir, cortar e embalar perfis, molduras, rodapés, portas e móveis.', 'Machines and complete lines to sand, coat, paint, dry, wrap, cut and pack profiles, mouldings, skirting, doors and furniture.', 'Máquinas y líneas completas para lijar, enyesar, pintar, secar, revestir, cortar y embalar perfiles, molduras, zócalos, puertas y muebles.')}</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'maquinas')}">${L('Ver as máquinas', 'See the machines', 'Ver las máquinas')}</a>${btnOrc(v, 'btn btn-linha')}</p>
    </div>
    <figure class="ha-foto">${imgM(h, true)}</figure>
  </div>
  <div class="in">${numeros()}</div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Da peça bruta ao pacote', 'From raw part to pack', 'De la pieza bruta al paquete'))}<h2>${L('Uma máquina para cada etapa do acabamento', 'A machine for every finishing step', 'Una máquina para cada etapa del acabado')}</h2></div>
  ${processo(v)}
</div></section>
<section class="faixa-foto"><div class="ff-img">${img('h-robo', 'Robô Gaidzinski movimentando perfis', 735, 558)}</div><div class="in ff-txt sobe">
  ${sobre(L('Indústria 4.0', 'Industry 4.0', 'Industria 4.0'))}<h2>${L('Robôs para movimentar perfis, portas, painéis e chapas', 'Robots to move profiles, doors, panels and boards', 'Robots para mover perfiles, puertas, paneles y chapas')}</h2>
  <p>${L('Alimentadores, descarregadores e robôs que ligam uma máquina à outra e transformam máquinas avulsas numa linha contínua.', 'Feeders, unloaders and robots that link machine to machine and turn single machines into a continuous line.', 'Alimentadores, descargadores y robots que unen una máquina a otra y convierten máquinas sueltas en una línea continua.')}</p>
  <a class="link-seta" href="${link(v, 'linhas')}">${L('Linhas de produção', 'Production lines', 'Líneas de producción')} ${ic('seta')}</a></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Aplicações', 'Applications', 'Aplicaciones'))}<h2>${L('Para molduras, rodapés, portas, móveis e PVC', 'For mouldings, skirting, doors, furniture and PVC', 'Para molduras, zócalos, puertas, muebles y PVC')}</h2></div>
  ${aplicacoes(v)}
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <figure class="sobe">${img('h-equipe', 'Equipe Gaidzinski', 520, 414)}</figure>
  <div class="sobe">${sobre(L(`${ANOS} anos`, `${ANOS} years`, `${ANOS} años`))}<h2>${L('O aperto de mão é para nós um selo', 'A handshake is our seal', 'El apretón de manos es nuestro sello')}</h2>
  <p>${L('Começamos em 1978 como ferraria em Braço do Norte. Hoje somos líderes em acabamento no setor moldureiro, com suporte próximo e projetos sob medida.', 'We began in 1978 as a forge in Braço do Norte. Today we lead finishing in the moulding sector, with close support and custom projects.', 'Empezamos en 1978 como herrería en Braço do Norte. Hoy lideramos el acabado en el sector de molduras, con soporte cercano y proyectos a medida.')}</p>
  <a class="link-seta" href="${link(v, 'empresa')}">${L('Quem somos', 'About us', 'Quiénes somos')} ${ic('seta')}</a></div>
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Gaidzinski Máquinas: linhas completas de acabamento para a indústria de perfis, molduras, rodapés, portas e móveis. 70 máquinas, robôs e projetos sob medida. Braço do Norte/SC desde 1978.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('h-recobridora', 'Recobridora de perfis Gaidzinski', 770, 475)}</div>
  <div class="in hb-grade">
    <div class="hb-txt">
      <p class="sobrelinha">${L(`${ANOS} anos · Braço do Norte/SC`, `${ANOS} years · Braço do Norte, Brazil`, `${ANOS} años · Braço do Norte, Brasil`)}</p>
      <h1>${L('A escuderia <em>da eficiência.</em>', 'The <em>efficiency</em> team.', 'La escudería <em>de la eficiencia.</em>')}</h1>
      <p class="hb-sub">${L('Linhas completas de acabamento que trabalham integradas, da alimentação à embalagem, para quem produz perfis, molduras, portas e móveis.', 'Complete finishing lines running integrated from feeding to packing, for makers of profiles, mouldings, doors and furniture.', 'Líneas completas de acabado integradas de la alimentación al embalaje, para quien produce perfiles, molduras, puertas y muebles.')}</p>
      <p class="ha-acoes">${btnOrc(v)}<a class="btn btn-linha" href="${link(v, 'maquinas')}">${L('Catálogo', 'Catalogue', 'Catálogo')}</a></p>
    </div>
  </div>
</section>
<section class="faixa-num"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Destaques', 'Highlights', 'Destacados'))}<h2>${L('Máquinas que seguram a linha', 'Machines that carry the line', 'Máquinas que sostienen la línea')}</h2></div>
  <ul class="destaques">${destaque.map(p => `<li class="sobe"><a href="${link(v, 'maquinas')}?cat=${p.cat}"><span class="ds-img">${imgM(p)}</span><span class="ds-cod">${p.cod}</span><b>${esc(p.n)}</b><span>${esc(p.desc.slice(0, 140))}${p.desc.length > 140 ? '…' : ''}</span></a></li>`).join('')}</ul>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Processo', 'Process', 'Proceso'))}<h2>${L('Nove etapas, um fornecedor', 'Nine steps, one supplier', 'Nueve etapas, un proveedor')}</h2></div>
  ${processo(v)}
</div></section>
<section class="sec sec-escura"><div class="in duas">
  <div class="sobe">${sobre(L('Desde 1978', 'Since 1978', 'Desde 1978'))}<h2>${L('De ferraria em Braço do Norte a máquinas em cinco continentes', 'From a forge in Braço do Norte to machines on five continents', 'De herrería en Braço do Norte a máquinas en cinco continentes')}</h2>
  <p>${L('Antônio Gaidzinski abriu uma ferraria para a agricultura local. A família somou usinagem, solda e caldeiraria e hoje projeta linhas inteiras para a indústria madeireira e moveleira.', 'Antônio Gaidzinski opened a forge for local farmers. The family added machining, welding and boiler work and now designs entire lines for the timber and furniture industry.', 'Antônio Gaidzinski abrió una herrería para el campo local. La familia sumó mecanizado, soldadura y calderería y hoy diseña líneas enteras para la industria maderera y del mueble.')}</p>
  <a class="link-seta" href="${link(v, 'empresa')}">${L('Quem somos', 'About us', 'Quiénes somos')} ${ic('seta')}</a></div>
  <figure class="sobe">${img('h-solda', 'Soldador na fábrica Gaidzinski', 400, 475)}</figure>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre(L('Aplicações', 'Applications', 'Aplicaciones'))}<h2>${L('Escolha pelo que você fabrica', 'Choose by what you make', 'Elija por lo que fabrica')}</h2></div>
  ${aplicacoes(v)}
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), maquinas: maquinasPag(v), linhas: linhas(v), contato: contato(v) });

copiarSiteJs(pub, E.waNum);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
fs.copyFileSync(path.join(aqui, 'gaidzinski.js'), path.join(pub, 'assets/gaidzinski.js'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Gaidzinski', artigo: 'da', url: E.url, lang: 'pt', cor: '#ffb434', fundo: '#001d49', claro: '#f3f5f8',
  fonteTitulo: "'Exo 2',system-ui,sans-serif", fonteTexto: "'IBM Plex Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com o laranja dos losangos e as nove etapas do acabamento logo na abertura.', pontos: [`Catálogo com as ${maquinas.length} máquinas, dados técnicos e vídeos`, 'Filtro por etapa e por aplicação', 'Português, inglês e espanhol'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Azul-marinho e laranja, abre com a recobridora e fala de linhas completas.', pontos: ['Máquinas em destaque', 'História desde 1978', 'Aplicações: molduras, rodapés, portas, móveis, PVC'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
