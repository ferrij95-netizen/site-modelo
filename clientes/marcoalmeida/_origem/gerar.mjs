// Clínica Marco Almeida (Natal/RN). Gera public/{a,b}/ e a página de escolha.
// node clientes/marcoalmeida/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs marcoalmeida http://clinicama.com.br/)
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Clínica Marco Almeida', url: 'https://marcoalmeida.overtus.com.br/', antigo: 'http://clinicama.com.br/',
  fone: '(84) 4009-5050', wa: '5584998191333', waTxt: '(84) 9 9819-1333', email: 'contato@clinicama.com.br',
  rua: 'Av. Campos Sales, 901', bairro: 'Petrópolis', cidade: 'Natal/RN', predio: 'Manhattan Business Office, Loja 1',
  horario: 'Segunda a sexta, das 8h às 18h',
  insta: 'https://www.instagram.com/clinicamarcoalmeida/', face: 'https://www.facebook.com/clinicamarcoalmeida/',
  yt: 'https://www.youtube.com/channel/UCx25gvjc25i3VsxONQ6ni3A',
  mapa: 'https://goo.gl/maps/oQ6mMMQn929FeEKU6',
  quem: 'A Clínica Marco Almeida, considerada uma das melhores do Brasil, tem no seguimento da cirurgia plástica reconhecimento nacional e internacional. Desde a sua fundação em 1999 são realizadas consultas, atendimentos estéticos e cirurgias plásticas em clientes de todo o Brasil e de outros países, o que para nós é motivo de orgulho.',
  estat: 'Destacamos aqui uma estatística gratificante: após mais de 60 mil atendimentos, a maioria das pessoas relata ter procurado a clínica após recomendação de clientes satisfeitos e felizes com os procedimentos realizados.',
  trajetoria: ['Temos por objetivo a qualidade nos serviços oferecidos e a satisfação dos nossos clientes. Investimos em instalações e equipamentos que priorizam o conforto, a segurança e o bem-estar de todos.',
    'A clínica está localizada próxima aos principais pontos de interesse na cidade, dispõe de ampla acessibilidade, estacionamento, segurança 24 horas, poltronas confortáveis e atendimento aconchegante e humanizado, o que demonstra parte da nossa dedicação.',
    'Desde a porta de entrada até as salas de procedimento, toda a equipe está comprometida em proporcionar o melhor atendimento com tranquilidade, eficiência e profissionalismo. Com foco no compromisso, respeito e dedicação a você, a Clínica Marco Almeida tornou-se referência e destaca-se pela credibilidade e confiança em cirurgia plástica, além de procedimentos minimamente invasivos e complementares.'],
  equipe: 'Nossa equipe médica, liderada pelo Dr. Marco Almeida, que tem mais de 30 anos de experiência em cirurgia plástica, é formada por um time comprometido com a segurança e o bem-estar dos pacientes.',
  mymoment: 'A Mymoment é uma empresa dedicada a promover a prática do autocuidado, um lugar para restaurar as energias necessárias para vencer os desafios diários, onde os serviços estão focados na manutenção da saúde e bem-estar das pessoas.',
  posop: ['É um tratamento complementar que visa preparar o paciente antes da cirurgia e auxiliá-lo no período de recuperação pós-cirúrgica, tendo como principais funções: ativar a circulação linfática e venosa por meio de drenagem linfática, orientar durante o processo de recuperação, estabelecer contato com o médico sobre qualquer alteração percebida durante a evolução do tratamento e auxiliar no processo de cicatrização, com o uso de técnicas e equipamentos adequados, visando promover a rápida reintegração do paciente às suas atividades.',
    'O período médio estimado para iniciar o tratamento pós-operatório é a partir de 5 a 7 dias. Os relatos de sensação de alívio por parte dos clientes são comuns já no primeiro dia de atendimento.'],
  conversando: 'Quadro com vídeos informativos em que abordamos assuntos de interesse coletivo e esclarecemos dúvidas e mitos, numa conversa informal, descontraída e cheia de novidades, onde todos podem participar e enviar perguntas.',
};
const resumoCat = {
  'cirurgias-plasticas': { img: 'plastic-surgery', icone: 'coracao', txt: 'Para além dos tradicionais objetivos estéticos, a cirurgia plástica tem um papel importante na manutenção do bem-estar físico e emocional das pessoas, além de restaurar a autoestima e o entusiasmo pela vida.' },
  'pequenas-cirurgias': { img: 'col-bgimage-11', icone: 'escudo', txt: 'As pequenas cirurgias podem ter finalidade estética ou reparadora e abrangem diversos procedimentos cirúrgicos de menor complexidade e resolução rápida do problema. Podem ser realizadas por plano de saúde e em geral não apresentam restrições significativas.' },
  'procedimentos-esteticos': { img: 'col-bgimage-6', icone: 'estrela', txt: 'São procedimentos que ressaltam a beleza e amenizam as imperfeições, harmonizando os contornos e prevenindo os efeitos causados pelo tempo.' },
  'curativos-e-queimaduras': { img: 'col-bgimage-8', icone: 'check', txt: 'Protocolos diferenciados e atendimentos feitos por profissionais especialistas que acompanham de perto todo o processo de cicatrização.' },
  'praticas-integrativas': { img: 'col-bgimage-9', icone: 'gota', txt: 'Conjunto de procedimentos e terapias que dão suporte e auxiliam o processo de diagnóstico, tratamento e recuperação de diversas patologias, trazendo alívio de dores, conforto emocional e bem-estar.' },
};
const PARCEIRA = 'Serviço realizado na empresa parceira Mymoment.';
const cats = JSON.parse(fs.readFileSync(path.join(aqui, 'servicos.json'), 'utf8')).map(c => ({
  ...c, ...resumoCat[c.slug],
  servicos: c.servicos.map(s => {
    const nomes = new Set(c.servicos.map(x => x.nome.toLowerCase()));
    const texto = s.texto.filter(t => !nomes.has(t.toLowerCase()) && t !== PARCEIRA && t.length > 40);
    return { ...s, texto, parceira: s.texto.includes(PARCEIRA), fatos: s.fatos.map(f => [f[0].replace('Tempo de Cirurgia', 'Tempo de cirurgia').replace('Tempo de Recuperação', 'Recuperação'), f[1].replace(/c\/ /, 'com ').replace(/3horas/, '3 horas')]) };
  }),
}));
const todos = cats.flatMap(c => c.servicos.map(s => ({ ...s, cat: c })));
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'clinica', nome: 'Quem somos' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'equipe', nome: 'Equipe médica' }, { slug: 'parceiros', nome: 'Parceiros' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Verde Clínico', b: 'Linha Fina' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Ubuntu:wght@400;500&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Mulish:wght@400;600;700&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da Clínica Marco Almeida e gostaria de agendar uma consulta.') => waHref(E.wa, m);
const waServ = s => wa(`Olá! Vi no site o procedimento ${s.nome} e gostaria de agendar uma avaliação com a Clínica Marco Almeida.`);
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Cirurgia plástica em Natal/RN` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#84bb3d' });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const lCat = (v, c) => link(v, `servicos/${c.slug}`);
const lServ = (v, s, c = s.cat) => `${lCat(v, c)}#${s.slug}`;
const lista = ls => `<ul class="lista-check">${ls.map(t => `<li><span>${esc(t)}</span></li>`).join('')}</ul>`;
const formulario = (proc = '') => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Procedimento de interesse<select name="procedimento"><option value="">Ainda não sei, quero uma avaliação</option>${cats.map(c => `<optgroup label="${c.nome}">${c.servicos.map(s => `<option${s.nome === proc ? ' selected' : ''}>${s.nome}</option>`).join('')}</optgroup>`).join('')}</select></label>
  <label>Melhor período<select name="periodo"><option>Manhã</option><option>Tarde</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar e agendar pelo WhatsApp</button>
  <p class="form-nota">Sua mensagem abre no WhatsApp da clínica. Nenhum dado fica guardado no site.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}, ${E.cidade}</span><span>${E.predio}</span><a href="${E.mapa}" target="_blank" rel="noopener">Como chegar</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" target="_blank" rel="noopener">${E.waTxt}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>${E.horario}</span></div></li>
  <li>${ic('insta')}<div><strong>Redes</strong><span><a href="${E.insta}" target="_blank" rel="noopener">@clinicamarcoalmeida</a> · <a href="${E.face}" target="_blank" rel="noopener">Facebook</a> · <a href="${E.yt}" target="_blank" rel="noopener">YouTube</a></span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Clínica Marco Almeida" loading="lazy" src="https://maps.google.com/maps?q=Av.%20Campos%20Sales%2C%20901%2C%20Petr%C3%B3polis%2C%20Natal%20RN&z=16&output=embed"></iframe>`;
const redes = `<p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" target="_blank" rel="noopener" aria-label="YouTube">${ic('yt')}</a></p>`;
const passos = ['Escolha o procedimento ou peça uma avaliação', 'Combine o dia e o horário pelo WhatsApp', 'Venha à clínica no Manhattan Business Office'];
const fatosDl = s => s.fatos.length ? `<dl class="fatos">${s.fatos.map(f => `<div><dt>${f[0]}</dt><dd>${esc(f[1])}</dd></div>`).join('')}</dl>` : '';

function topo(v, slug) {
  if (v === 'a') return `<header class="topo">
  <div class="topo-barra"><div class="in topo-barra-in"><span>${ic('pin')}${E.rua} · ${E.bairro}, ${E.cidade} · ${E.predio}</span><span class="topo-barra-dir"><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>${redes}</span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="Clínica Marco Almeida" width="217" height="139"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" target="_blank" rel="noopener">Agende sua consulta</a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="Clínica Marco Almeida" width="217" height="139"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), slug)}</ul></nav>
    <a class="btn-topo" href="${wa()}" target="_blank" rel="noopener">${icWa()}<span>Agendar</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Clínica Marco Almeida" width="217" height="139" loading="lazy"><p>Cirurgia plástica, pequenas cirurgias e procedimentos estéticos em Natal/RN desde 1999.</p>${redes}</div>
    <div><h3>Serviços</h3><ul>${cats.map(c => `<li><a href="${lCat(v, c)}">${c.nome}</a></li>`).join('')}<li><a href="${link(v, 'conversando')}">Conversando com meu médico</a></li></ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" target="_blank" rel="noopener">${E.waTxt}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.predio}, ${E.cidade}</span></li>
      <li>${ic('relogio')}<span>${E.horario}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Clínica Marco Almeida. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" target="_blank" rel="noopener" aria-label="Agendar pelo WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

function servicoArt(v, s) {
  const extra = [s.texto.map(p => `<p>${esc(p)}</p>`).join(''), fatosDl(s), s.parceira ? `<p class="parceira">${ic('estrela')}Realizado na parceira <a href="${link(v, 'parceiros')}">Mymoment</a>, no mesmo prédio da clínica.</p>` : ''].join('');
  return `<article class="serv sobe" id="${s.slug}"><figure>${img(s.img, s.nome)}</figure><div class="serv-txt"><h2>${s.nome}</h2><p class="serv-desc">${esc(s.desc)}</p>${extra}<a class="link-seta" href="${waServ(s)}" target="_blank" rel="noopener">Agendar avaliação ${ic('seta')}</a></div></article>`;
}

function comum(v, pag, cab) {
  for (const c of cats) {
    const outras = cats.filter(o => o !== c);
    pag[`servicos/${c.slug}`] = head(v, `servicos/${c.slug}`, c.nome, c.txt) + topo(v, 'servicos') + cab('Serviços', c.nome, c.img, c.txt) + `
<div class="in cat-pag"><nav class="indice" aria-label="Nesta página"><p>Nesta página</p><ul>${c.servicos.map(s => `<li><a href="#${s.slug}">${s.nome}</a></li>`).join('')}</ul><a class="btn" href="${wa(`Olá! Gostaria de agendar uma avaliação de ${c.nome.toLowerCase()} na Clínica Marco Almeida.`)}" target="_blank" rel="noopener">${icWa()}Agendar avaliação</a></nav>
<div class="servs">${c.servicos.map(s => servicoArt(v, s)).join('')}<p class="aviso">Tempos de cirurgia, internação e recuperação são referências. A indicação de cada procedimento é feita em consulta, de acordo com a avaliação individual.</p></div></div>
<section class="in outras-cat"><h2>Outras áreas</h2><ul>${outras.map(o => `<li><a href="${lCat(v, o)}">${img(o.img, o.nome)}<span>${o.nome}</span></a></li>`).join('')}</ul></section>
` + rodape(v);
  }
  pag.conversando = head(v, 'conversando', 'Conversando com meu médico', E.conversando) + topo(v, 'servicos') + cab('Vídeos', 'Conversando com meu médico', 'col-bgimage-10', E.conversando) + `
<div class="in"><section class="texto-pag"><div><p>${E.conversando}</p><p>O Dr. Marco Almeida responde dúvidas comuns sobre cirurgia plástica, recuperação e procedimentos estéticos. Os episódios ficam no canal da clínica no YouTube, e você pode mandar a sua pergunta pelo Instagram ou pelo WhatsApp.</p><p class="bts"><a class="btn" href="${E.yt}" target="_blank" rel="noopener">${ic('yt')}Assistir no YouTube</a><a class="btn btn-linha" href="${wa('Olá! Tenho uma pergunta para o quadro Conversando com meu médico.')}" target="_blank" rel="noopener">${icWa()}Enviar uma pergunta</a></p></div><figure>${img('col-bgimage-10', 'Quadro Conversando com meu médico, com o Dr. Marco Almeida')}</figure></section></div>
` + rodape(v);
  pag.parceiros = head(v, 'parceiros', 'Parceiros e convênio', E.mymoment) + topo(v, 'parceiros') + cab('Parceiros', 'Os melhores serviços com quem caminha junto', 'col-bgimage-6', 'Pré e pós-operatório, estética e bem-estar na Mymoment, e atendimento pelo plano Humana Saúde.') + `
<div class="in">
<section class="parc" id="mymoment"><figure>${img('mymomment-360x360', 'Mymoment, pré e pós-operatório')}</figure><div><img class="parc-logo" src="/assets/img/mymoment-logo.webp" alt="Mymoment" width="214" height="88" loading="lazy"><p>${E.mymoment}</p><h3>Pré e pós-operatório</h3>${E.posop.map(p => `<p>${p}</p>`).join('')}<p>Além de outros serviços como intradermoterapia pressurizada, laserterapia, microagulhamento, peeling, plasma therapy, fios de sustentação, nanoagulhamento, preenchimento, toxina botulínica e florais.</p>
<ul class="parc-dados"><li>${ic('pin')}Mesmo prédio da clínica: ${E.rua}, Loja 1, 1º piso</li><li>${ic('tel')}<a href="tel:+558440095055">(84) 4009-5055</a></li><li>${icWa()}<a href="${waHref('5584996101050', 'Olá! Vim pelo site da Clínica Marco Almeida e quero saber sobre o pós-operatório na Mymoment.')}" target="_blank" rel="noopener">(84) 9 9610-1050</a></li><li>${ic('mail')}<a href="mailto:atendimento@mymoment.com.br">atendimento@mymoment.com.br</a></li><li>${ic('ext')}<a href="https://mymoment.com.br/" target="_blank" rel="noopener">mymoment.com.br</a></li></ul></div></section>
<section class="parc parc-plano" id="convenio"><figure>${img('humana-saude-interna', 'Humana Saúde')}</figure><div><p class="k">Plano de saúde</p><h2>Humana Saúde</h2><p>Atendemos pela rede credenciada da Humana Saúde (ANS 357511). Pequenas cirurgias, como retirada de tumores cutâneos, correção de cicatrizes e lóbulo de orelha, podem ser realizadas pelo plano. Para saber o que o seu plano cobre, fale com a nossa equipe antes de agendar.</p><p class="bts"><a class="btn" href="${wa('Olá! Tenho Humana Saúde e quero saber quais procedimentos posso fazer pelo plano na Clínica Marco Almeida.')}" target="_blank" rel="noopener">${icWa()}Consultar meu plano</a><a class="btn btn-linha" href="https://www2.humanasaude.com.br/rn/" target="_blank" rel="noopener">${ic('ext')}Site da Humana</a></p></div></section>
</div>
` + rodape(v);
  pag.equipe = head(v, 'equipe', 'Equipe médica', E.equipe) + topo(v, 'equipe') + cab('Equipe médica', 'Liderada pelo Dr. Marco Almeida', 'dr-marco-almeida-quadroclinico', E.equipe) + `
<div class="in"><section class="medico"><figure>${img('dr-marco-almeida-quadroclinico', 'Dr. Marco Almeida, cirurgião plástico, em seu consultório')}</figure><div><p class="k">Cirurgião plástico</p><h2>Dr. Marco Almeida</h2><p>${E.equipe}</p><p>Com mais de 30 anos de dedicação à cirurgia plástica, o Dr. Marco Almeida fundou a clínica em 1999 e é referência nacional na técnica One S.T.E.P. Atende pacientes de todo o Brasil e de outros países.</p>${lista(['Mais de 30 anos de experiência em cirurgia plástica', 'Referência nacional na técnica One S.T.E.P.', 'Reconhecimento nacional e internacional', 'Apresenta o quadro Conversando com meu médico'])}<p class="bts"><a class="btn" href="${wa('Olá! Gostaria de agendar uma consulta com o Dr. Marco Almeida.')}" target="_blank" rel="noopener">${icWa()}Agendar com o Dr. Marco</a></p></div></section>
<section class="valores">${[['escudo', 'Certificação', 'Profissionais habilitados e protocolos de segurança em cada procedimento.'], ['estrela', 'Reconhecimento', 'Referência em cirurgia plástica no Nordeste, com pacientes de todo o país.'], ['coracao', 'Comprometimento', 'Acompanhamento próximo da consulta à recuperação.']].map(x => `<div class="sobe">${ic(x[0])}<h3>${x[1]}</h3><p>${x[2]}</p></div>`).join('')}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Clínica Marco Almeida: ${E.rua}, ${E.bairro}, ${E.cidade}. WhatsApp ${E.waTxt}.`) + topo(v, 'contato') + cab('Contato', 'Agende sua consulta', 'about_clinicamarcoalmeida', 'Em caso de dúvidas, envie uma mensagem e nossa equipe responde pelo WhatsApp.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Fale com a clínica</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t) => `<section class="tit-a"><div class="in"><p class="trilha"><a href="${link(v, 'index')}">Home</a> | ${k}</p><h1>${t}</h1></div></section>`;
  const banners = [['20220215_MA__banner_1', 'Mais de 30 anos de dedicação à cirurgia plástica'], ['20220215_MA__banner_2', 'Cuidando de você durante todo o seu processo'], ['20220215_MA__banner_3_FcGnul2', 'Referência nacional na técnica One S.T.E.P.']];
  const catCard = c => `<li class="sobe"><a href="${lCat(v, c)}">${img(c.img, c.nome)}<div><h3>${c.nome}</h3><p>${c.txt}</p><b>Conheça</b></div></a></li>`;
  pag.index = head(v, 'index', '', E.quem) + topo(v, 'index') + `
<section class="carrossel-a" data-carrossel aria-label="Destaques">${banners.map((b, i) => `<div class="slide${i ? '' : ' ativo'}">${img(b[0], b[1], i ? '' : ' loading="eager" fetchpriority="high"')}</div>`).join('')}<button class="car-ant" data-ant aria-label="Anterior">${ic('seta')}</button><button class="car-prox" data-prox aria-label="Próximo">${ic('seta')}</button><div class="pontos"></div></section>
<section class="in quem-a"><div><p class="k">Quem somos</p><h2>Clínica Marco Almeida</h2><p>${E.quem}</p>${lista(['Localização privilegiada', 'Segurança e credibilidade', 'Considerada uma das melhores do Brasil', 'Reconhecimento nacional e internacional', 'Mais de 60 mil atendimentos'])}<a class="btn" href="${link(v, 'clinica')}">Conheça a clínica</a></div><figure>${img('about_clinicamarcoalmeida', 'Recepção, consultório e sala de procedimentos da clínica')}</figure></section>
<section class="serv-a"><div class="in"><header class="tit-sec"><p class="k">Conheça</p><h2>Serviços</h2><p>Temos por objetivo a qualidade nos serviços oferecidos e a satisfação dos nossos clientes.</p></header><ul class="cat-grade">${cats.map(catCard).join('')}<li class="sobe"><a href="${link(v, 'conversando')}">${img('col-bgimage-10', 'Conversando com meu médico')}<div><h3>Conversando com meu médico</h3><p>${E.conversando}</p><b>Conheça</b></div></a></li></ul></div></section>
<section class="in equipe-a"><figure>${img('dr-marco-almeida-quadroclinico', 'Dr. Marco Almeida')}</figure><div><p class="k">Equipe médica</p><h2>Dr. Marco Almeida</h2><p>${E.equipe}</p><ul class="selos">${[['escudo', 'Certificação'], ['estrela', 'Reconhecimento'], ['coracao', 'Comprometimento']].map(x => `<li>${ic(x[0])}<span>${x[1]}</span></li>`).join('')}</ul><a class="btn btn-linha" href="${link(v, 'equipe')}">Ver equipe</a></div></section>
<section class="agenda-a"><div class="in agenda-a-in"><figure>${img('agendamento', 'Agendamento')}</figure><div><p class="k">Para sua comodidade</p><h2>Agende a sua consulta pelo WhatsApp</h2><p>Para facilitar o seu dia a dia, a nossa equipe marca a sua consulta no dia e horário disponíveis. É simples:</p><ol class="passos">${passos.map(p => `<li>${p}</li>`).join('')}</ol><a class="btn" href="${wa()}" target="_blank" rel="noopener">${icWa()}Marcar uma consulta</a></div></div></section>
<section class="in parc-a"><figure>${img('mymomment-360x240', 'Mymoment')}</figure><div><p class="k">Parceiro</p><h2>Mymoment</h2><p>${E.mymoment}</p><ul class="tags">${['Pós-operatório', 'Tratamentos faciais', 'Orientação nutricional', 'Bem-estar', 'Estética corporal', 'Pacotes de serviços'].map(t => `<li>${t}</li>`).join('')}</ul><a class="btn btn-linha" href="${link(v, 'parceiros')}">Conheça</a></div><div class="plano-a"><img src="/assets/img/humana.webp" alt="Humana Saúde" width="134" height="66" loading="lazy"><p><strong>Planos de saúde</strong>Conheça nossa rede credenciada.</p><a class="link-seta" href="${link(v, 'parceiros')}#convenio">Ver convênio ${ic('seta')}</a></div></section>
` + rodape(v);
  pag.clinica = head(v, 'clinica', 'Quem somos', E.quem) + topo(v, 'clinica') + cab('Quem somos', 'Clínica Marco Almeida') + `
<div class="in"><section class="texto-pag"><div><p>${E.quem}</p><p>${E.estat}</p>${lista(['Localização privilegiada', 'Segurança e credibilidade', 'Considerada uma das melhores do Brasil', 'Reconhecimento nacional e internacional'])}</div><figure>${img('about_clinicamarcoalmeida', 'Ambientes da Clínica Marco Almeida')}</figure></section>
<section class="numeros-a">${[['1999', 'Ano de fundação'], ['30+', 'Anos de experiência do Dr. Marco'], ['60 mil+', 'Atendimentos']].map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</section>
<section class="texto-pag inverso"><figure>${img('about_trajetoria_clinicamarcoalmeida', 'Trajetória da clínica: 1999, 2010 e 2018')}</figure><div><h2>Nossa trajetória</h2>${E.trajetoria.map(p => `<p>${p}</p>`).join('')}<a class="btn" href="${wa()}" target="_blank" rel="noopener">${icWa()}Marcar uma consulta</a></div></section></div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', `Serviços da Clínica Marco Almeida em Natal: ${cats.map(c => c.nome.toLowerCase()).join(', ')}.`) + topo(v, 'servicos') + cab('Serviços', 'Nossos serviços') + `
<div class="in"><ul class="cat-grade cat-grade-pag">${cats.map(catCard).join('')}<li class="sobe"><a href="${link(v, 'conversando')}">${img('col-bgimage-10', 'Conversando com meu médico')}<div><h3>Conversando com meu médico</h3><p>${E.conversando}</p><b>Conheça</b></div></a></li></ul>
${cats.map(c => `<section class="lista-cat"><h2>${c.nome}</h2><ul>${c.servicos.map(s => `<li><a href="${lServ(v, s, c)}">${img(s.img, s.nome)}<span><strong>${s.nome}</strong>${esc(s.desc)}</span></a></li>`).join('')}</ul></section>`).join('')}</div>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto, sub = '') => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1>${sub ? `<p>${sub}</p>` : ''}</div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.quem) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Cirurgia plástica · Natal/RN · desde 1999</p><h1>Cirurgia plástica com <em>tempo</em>, cuidado e técnica</h1><p>Mais de 30 anos de dedicação do Dr. Marco Almeida, referência nacional na técnica One S.T.E.P. Da primeira consulta ao pós-operatório, a gente acompanha cada etapa.</p><p class="bts"><a class="btn" href="${wa()}" target="_blank" rel="noopener">${icWa()}Agendar consulta</a><a class="link-seta" href="${link(v, 'servicos')}">Ver procedimentos ${ic('seta')}</a></p></div>
  <figure class="hero-b-foto">${img('dr-marco-almeida-quadroclinico', 'Dr. Marco Almeida em seu consultório', ' loading="eager" fetchpriority="high"')}<figcaption><b>Dr. Marco Almeida</b>Cirurgião plástico</figcaption></figure>
</div></section>
<section class="faixa-num-b"><div class="in faixa-num-b-in">${[['1999', 'clínica fundada em Natal'], ['30+', 'anos em cirurgia plástica'], ['60 mil+', 'atendimentos'], ['One S.T.E.P.', 'referência nacional na técnica']].map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in areas-b"><header class="tit-b"><p class="k">Procedimentos</p><h2>Cinco áreas, um mesmo cuidado</h2></header>
  <ol class="areas-b-lista">${cats.map((c, i) => `<li class="sobe"><a href="${lCat(v, c)}"><span class="num">0${i + 1}</span><span class="nome">${c.nome}</span><span class="qtd">${c.servicos.length} procedimentos</span><span class="desc">${c.txt}</span><figure>${img(c.img, c.nome)}</figure></a></li>`).join('')}</ol>
</section>
<section class="clinica-b"><div class="in clinica-b-in"><figure>${img('about_trajetoria_clinicamarcoalmeida', 'Trajetória da clínica: 1999, 2010 e 2018')}</figure><div><p class="k">A clínica</p><h2>Conforto e segurança da porta de entrada à sala de procedimento</h2><p>${E.trajetoria[1]}</p><p>${E.estat}</p><a class="link-seta" href="${link(v, 'clinica')}">Nossa trajetória ${ic('seta')}</a></div></div></section>
<section class="in jornada-b"><header class="tit-b"><p class="k">Como funciona</p><h2>Do primeiro contato à recuperação</h2></header><ol>${[['Consulta e avaliação', 'O Dr. Marco ouve o que você deseja, avalia e indica o procedimento mais adequado.'], ['Procedimento', 'Cirurgias em Day Clinic ou com internação de 24 horas, com anestesia definida em consulta.'], ['Pós-operatório', 'Drenagem e acompanhamento na parceira Mymoment, no mesmo prédio, a partir de 5 a 7 dias.'], ['Acompanhamento', 'Retornos com o médico e orientação até a liberação para as atividades do dia a dia.']].map((p, i) => `<li class="sobe"><b>${i + 1}</b><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol></section>
<section class="video-b"><div class="in video-b-in"><div><p class="k">Vídeos</p><h2>Conversando com meu médico</h2><p>${E.conversando}</p><a class="btn btn-linha" href="${link(v, 'conversando')}">Assistir</a></div>${img('col-bgimage-10', 'Quadro Conversando com meu médico')}</div></section>
<section class="in agenda-b"><div><p class="k">Agendamento</p><h2>Marque a sua avaliação</h2><p>${E.rua}, ${E.bairro} · ${E.predio} · ${E.horario}.</p></div><a class="btn" href="${wa()}" target="_blank" rel="noopener">${icWa()}${E.waTxt}</a></section>
` + rodape(v);
  pag.clinica = head(v, 'clinica', 'Quem somos', E.quem) + topo(v, 'clinica') + cab('Quem somos', 'Uma clínica construída sobre recomendação', 'about_clinicamarcoalmeida', E.quem) + `
<div class="in"><section class="texto-pag"><div><h2>Nossa trajetória</h2>${E.trajetoria.map(p => `<p>${p}</p>`).join('')}<p>${E.estat}</p></div><figure>${img('about_trajetoria_clinicamarcoalmeida', 'Trajetória da clínica: 1999, 2010 e 2018')}</figure></section>
<section class="valores">${[['pin', 'Localização privilegiada', 'Perto dos principais pontos da cidade, com estacionamento e ampla acessibilidade.'], ['escudo', 'Segurança e credibilidade', 'Segurança 24 horas e protocolos em cada etapa do atendimento.'], ['coracao', 'Atendimento humanizado', 'Ambientes confortáveis e uma equipe que acompanha você de perto.']].map(x => `<div class="sobe">${ic(x[0])}<h3>${x[1]}</h3><p>${x[2]}</p></div>`).join('')}</section></div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Procedimentos', `Procedimentos da Clínica Marco Almeida em Natal: ${cats.map(c => c.nome.toLowerCase()).join(', ')}.`) + topo(v, 'servicos') + cab('Procedimentos', `${todos.length} procedimentos em cinco áreas`, 'plastic-surgery', 'Escolha uma área para ver cada procedimento com tempo de cirurgia, internação, anestesia e recuperação.') + `
<div class="in">${cats.map((c, i) => `<section class="lista-cat-b"><header><span class="num">0${i + 1}</span><h2><a href="${lCat(v, c)}">${c.nome}</a></h2><p>${c.txt}</p></header><ul>${c.servicos.map(s => `<li><a href="${lServ(v, s, c)}"><strong>${s.nome}</strong><span>${esc(s.desc)}</span>${ic('seta')}</a></li>`).join('')}</ul></section>`).join('')}
<section class="lista-cat-b"><header><span class="num">06</span><h2><a href="${link(v, 'conversando')}">Conversando com meu médico</a></h2><p>${E.conversando}</p></header></section></div>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#84bb3d', fundo: '#2b2b24', claro: '#f6f6f1',
  fonteTitulo: "'Cormorant Garamond',Georgia,serif", fonteTexto: 'Mulish,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 12, texto: 'Fiel ao site atual: barra cinza com endereço, botão verde "Agende sua consulta", os banners da clínica e os serviços em quadros com foto, agora com cada procedimento detalhado.', pontos: ['33 procedimentos em 5 áreas', 'Tempo de cirurgia, internação, anestesia e recuperação', 'Agendamento direto pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 12, texto: 'Mais elegante: títulos com serifa fina, o Dr. Marco em destaque na abertura, as cinco áreas numeradas e a jornada do paciente da consulta à recuperação.', pontos: ['Dr. Marco Almeida e a técnica One S.T.E.P. na abertura', 'Jornada: consulta, procedimento, pós-operatório', 'Pós-operatório na Mymoment e convênio Humana'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
