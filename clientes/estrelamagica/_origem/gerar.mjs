// Centro Educacional Estrela Mágica (CEEM), Santa Terezinha, Juiz de Fora/MG: berçário ao 5º ano. Gera public/{a,b}/ e a página de escolha.
// node clientes/estrelamagica/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs estrelamagica http://estrelamagica.com.br/)
// Textos, turmas, equipe, horários, fotos dos ambientes e dos eventos: tudo do site atual. Logo vetorizado do original.
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Estrela Mágica', nomeLongo: 'Centro Educacional Estrela Mágica', url: 'https://estrelamagica.overtus.com.br/', antigo: 'http://estrelamagica.com.br/',
  fone: '(32) 3224-2330', cel: '(32) 99118-1098', email: 'ceem.estrelamagica@yahoo.com.br',
  rua: 'Rua Paracatu, 155', bairro: 'Santa Terezinha', cidade: 'Juiz de Fora - MG', cep: '36046-040',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap';
const LOGO = () => `<img class="logo" src="/assets/img/logo.svg" alt="Centro Educacional Estrela Mágica" width="193" height="193">`;
const tem = n => fs.existsSync(path.join(pub, `assets/img/${n}.webp`));
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const estrela = (cls = '') => `<svg class="estrela ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.8l3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.6l-6.3 3.6 1.5-7.1L1.8 9.2 9 8.4z" fill="currentColor"/></svg>`;
const f = n => `f-${n}`; // fotos do site atual: public/assets/img/f-<número original>.webp
const fotos = (nums, max = 99) => nums.map(f).filter(tem).slice(0, max);

// ---------- conteúdo do site atual ----------
const ESCOLA = [
  'O Centro Educacional Estrela Mágica foi fundado em 1995 com o objetivo de atender crianças na faixa etária de 0 a 6 anos, por acreditar no valor e na necessidade da educação e escolarização das crianças com estas idades.',
  'Em 2002, a escola passou a atender também as crianças do Ensino Fundamental.',
  'A escola foi idealizada dentro dos princípios da teoria construtivista, entretanto, não adota o construtivismo puro, utilizando-se de outros métodos pedagógicos, podendo então ser considerada eclética.',
];
const HIST = [
  ['1995', 'Fundação, para atender crianças de 0 a 6 anos.'],
  ['Até 2002', 'Funcionamento na Rua Alencar Tristão, 247, em Santa Terezinha.'],
  ['2002', 'Sede própria na Rua Paracatu, 155, e início do Ensino Fundamental.'],
  ['Hoje', 'Do berçário ao 5º ano, das 7h às 19h.'],
];
const TURMAS = [
  { grupo: 'Educação Infantil', itens: [['Maternal I', 'Rafaela'], ['Maternal II', 'Rafaela'], ['Maternal III', 'Rafaela'], ['1º Período', 'Stéfani'], ['2º Período', 'Letícia']] },
  { grupo: 'Ensino Fundamental', itens: [['1º ano', 'Schnemer'], ['2º ano', ''], ['3º ano', ''], ['4º ano', ''], ['5º ano', '']] },
];
const PROF_FUND = [['Matemática', 'Julimar'], ['Português', 'Tatiane'], ['História e Geografia', 'Márcia'], ['Ciências e Artes', 'Ana Paula'], ['Inglês', 'Lander'], ['Educação Física', 'Fabrício']];
const EQUIPE = [['Direção', 'Therezinha'], ['Secretaria', 'Jacqueline'], ['Serviços gerais', 'Eunice e Fabíola']];
const HORARIOS = [['07:00 às 19:00', 'Horário integral'], ['07:30 às 11:30', 'Turno da manhã'], ['13:00 às 17:00', 'Tarde, Educação Infantil'], ['13:00 às 17:25', 'Tarde, Ensino Fundamental']];
const CURSOS = [
  { nome: 'Inglês', txt: 'A partir do 1º período.' },
  { nome: 'Ballet', txt: 'Aulas de ballet na escola.' },
  { nome: 'Jiu-Jitsu', txt: 'Com o Mestre Flávio Naval. Terças e quintas: Educação Infantil, 17:00 às 17:50; Ensino Fundamental, 17:30 às 18:20.' },
];
const DOCS = ['Xerox da certidão de nascimento', 'Xerox do cartão de vacina', 'Xerox do comprovante de residência', '1 retrato 3x4', 'Xerox do CPF e da identidade do responsável', 'Pagamento da taxa de matrícula'];
const ESPACO = [
  ['A escola', [1248, 1249, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1259]],
  ['Maternal I', [1260, 1261, 1262, 1263]], ['Maternal II', [1264, 1265, 1266, 1267]], ['Maternal III', [1268, 1269, 1270, 1271]],
  ['1º período', [1302, 1303, 1304, 1305, 1306]], ['2º período', [1307, 1308, 1309]],
  ['Banheiro da Educação Infantil', [1272, 1273, 1274, 1275, 1276]], ['Fraldário', [1277, 1278]],
  ['1º ano', [1279, 1280]], ['2º ano', [1281, 1282, 1283, 1284]], ['3º ano', [1285, 1286, 1287, 1288]], ['4º ano', [1289, 1290, 1291, 1292]], ['5º ano', [1293, 1294, 1295, 1296]],
  ['Banheiro do Ensino Fundamental', [1297, 1298, 1299, 1300, 1301]], ['Lazer e recreação', [1310, 1311, 1312, 1313, 1314, 1315, 1316, 1317, 1318, 1319, 1320]],
];
const EVENTOS = [
  ['Carnaval de 2019', [1192, 1194, 1201, 1202, 1206, 1207, 1209, 1204, 1197, 1211]],
  ['Páscoa 2019', [1236, 1237, 1238, 1233, 1235, 1234]],
  ['Feira Cultural 2018: Folclore', [1170, 1175, 1182, 1187, 1184, 1181, 1168, 1176]],
  ['Dia das Crianças', [1162, 1164, 1165, 1159]],
  ['Feira de objetos antigos e Minhas memórias 2019', [1213, 1214, 1215, 1216, 1217, 1218, 1219, 1220, 1221, 1222]],
];

const nav = [
  { slug: 'a-escola', nome: 'A Escola' },
  { slug: 'turmas', nome: 'Turmas e equipe' },
  { slug: 'nosso-espaco', nome: 'Nosso Espaço' },
  { slug: 'atividades', nome: 'Cursos' },
  { slug: 'eventos', nome: 'Eventos' },
  { slug: 'matricula', nome: 'Matrícula' },
  { slug: 'contato', nome: 'Contato' },
];
const cores = { a: '#0F218B', b: '#E3121B' };
const head = (v, s, titulo, descricao) => cabeca({ E: { ...E, nome: E.nomeLongo }, v, slug: s, titulo: s === 'index' ? `${E.nomeLongo} | Escola infantil e Ensino Fundamental em Juiz de Fora` : `${titulo} | Estrela Mágica`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Estrela Mágica, página inicial">${LOGO()}<span>Centro Educacional<b>Estrela Mágica</b></span></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <a class="btn-fone" href="${telHref(E.fone)}" aria-label="Ligar ${E.fone}">${ic('tel')}<span>${E.fone}</span></a>
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
    <div class="rod-marca">${LOGO()}<p>Do berçário ao 5º ano, das 7h às 19h, em Santa Terezinha, Juiz de Fora.</p></div>
    <div><h3>Páginas</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Fale conosco</h3><ul class="rod-dados"><li>${ic('tel')}<span><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${telHref(E.cel)}">${E.cel}</a></span></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li><li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}</span></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ${E.nomeLongo}. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}
const galeria = (nums, legenda, cls = 'galeria') => `<div class="${cls}">${fotos(nums).map(n => `<a class="sobe" href="/assets/img/${n}.webp" data-foto data-legenda="${esc(legenda)}">${img(n, legenda)}</a>`).join('')}</div>`;
const form = () => `<form class="form" data-email="${E.email}" data-assunto="Contato pelo site" novalidate>
  <label>Nome *<input name="nome" required autocomplete="name"></label>
  <div class="form-2"><label>Telefone *<input name="telefone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <label>Turma de interesse<select name="turma"><option>Maternal I</option><option>Maternal II</option><option>Maternal III</option><option>1º Período</option><option>2º Período</option><option>1º ano</option><option>2º ano</option><option>3º ano</option><option>4º ano</option><option>5º ano</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar mensagem</button>
</form>`;
const turmasHtml = () => `<div class="turmas">${TURMAS.map((g, gi) => `<div class="turma-g g${gi}"><h3>${g.grupo}</h3><ol>${g.itens.map(t => `<li>${estrela()}<b>${t[0]}</b>${t[1] ? `<span>Prof. ${t[1]}</span>` : ''}</li>`).join('')}</ol></div>`).join('')}</div>`;
const horariosHtml = () => `<ul class="horarios">${HORARIOS.map(h => `<li><b>${h[0]}</b><span>${h[1]}</span></li>`).join('')}</ul>`;

function paginas(v, cab, home) {
  const pag = {};
  pag.index = head(v, 'index', '', 'Centro Educacional Estrela Mágica: Educação Infantil e Ensino Fundamental, do berçário ao 5º ano, em Santa Terezinha, Juiz de Fora/MG. Horário integral das 7h às 19h.') + topo(v, 'index') + home() + rodape(v);

  pag['a-escola'] = head(v, 'a-escola', 'A Escola', 'A história e a proposta pedagógica do Centro Educacional Estrela Mágica, em Juiz de Fora.') + topo(v, 'a-escola') + cab('A Escola', 'Educação com carinho desde 1995', fotos([1250, 1248])[0]) + `
<div class="in">
<section class="texto-pag"><div class="sobe">${ESCOLA.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${p}</p>`).join('')}</div><figure class="sobe">${img(fotos([1252, 1254])[0], 'Corredor da escola')}</figure></section>
<section class="hist"><header class="tit"><p class="k">Histórico</p><h2>Nossa trajetória</h2></header><ol class="hist-lista">${HIST.map(h => `<li class="sobe">${estrela()}<b>${h[0]}</b><span>${h[1]}</span></li>`).join('')}</ol></section>
<section class="poema sobe"><p class="k">Mensagem de ex-aluno</p><h2>Quem é o professor?</h2><blockquote><p>O professor é aquele que ensina<br>Para abrir uma mina<br>De conhecimento em seus alunos.</p><p>O professor merece uma homenagem<br>Numa linguagem clara e verdadeira.<br>Feliz dia dos professores!</p></blockquote><p class="autor">Matheus Afonso Tagliatte, ex-aluno</p></section>
</div>
` + rodape(v);

  pag.turmas = head(v, 'turmas', 'Turmas e equipe', 'Turmas do Maternal I ao 5º ano, professores, equipe e horários do Centro Educacional Estrela Mágica.') + topo(v, 'turmas') + cab('Turmas e equipe', 'Do Maternal ao 5º ano', fotos([1304, 1303, 1280])[0]) + `
<div class="in">
<section class="sec-pad"><header class="tit"><p class="k">Turmas</p><h2>Educação Infantil e Ensino Fundamental</h2></header>${turmasHtml()}</section>
<section class="sec-pad"><header class="tit"><p class="k">Professores do 2º ao 5º ano</p><h2>Um professor para cada área</h2></header><ul class="areas">${PROF_FUND.map(p => `<li class="sobe"><span>${p[0]}</span><b>${p[1]}</b></li>`).join('')}</ul></section>
<section class="sec-pad duas"><div><header class="tit"><p class="k">Equipe</p><h2>Quem cuida da escola</h2></header><ul class="areas areas-3">${EQUIPE.map(p => `<li class="sobe"><span>${p[0]}</span><b>${p[1]}</b></li>`).join('')}</ul></div><div><header class="tit"><p class="k">Horários</p><h2>Das 7h às 19h</h2></header>${horariosHtml()}</div></section>
</div>
` + rodape(v);

  pag['nosso-espaco'] = head(v, 'nosso-espaco', 'Nosso Espaço', 'Salas, banheiros, fraldário e área de lazer do Centro Educacional Estrela Mágica, adaptados ao protocolo de reabertura das escolas.') + topo(v, 'nosso-espaco') + cab('Nosso Espaço', 'Cada turma com a sua sala', fotos([1314, 1315, 1320])[0]) + `
<div class="in">
<p class="lead intro sobe">Espaço adaptado ao protocolo de reabertura de escolas particulares de Educação Infantil.</p>
<nav class="indice" aria-label="Ambientes">${ESPACO.filter(e => fotos(e[1]).length).map((e, i) => `<a href="#amb${i}">${e[0]}</a>`).join('')}</nav>
${ESPACO.map((e, i) => fotos(e[1]).length ? `<section class="amb" id="amb${i}"><h2>${e[0]}</h2>${galeria(e[1], e[0])}</section>` : '').join('')}
</div>
` + rodape(v);

  pag.atividades = head(v, 'atividades', 'Cursos', 'Inglês, Ballet e Jiu-Jitsu no Centro Educacional Estrela Mágica.') + topo(v, 'atividades') + cab('Cursos', 'Inglês, Ballet e Jiu-Jitsu', fotos([1315, 1320])[0]) + `
<div class="in">
<section class="cursos sec-pad">${CURSOS.map((c, i) => `<article class="curso c${i} sobe">${estrela()}<h2>${c.nome}</h2><p>${c.txt}</p></article>`).join('')}</section>
<section class="sec-pad"><header class="tit"><p class="k">Horário integral</p><h2>A escola fica aberta das 7h às 19h</h2></header>${horariosHtml()}</section>
</div>
` + rodape(v);

  pag.eventos = head(v, 'eventos', 'Eventos', 'Carnaval, Páscoa, Feira Cultural, Dia das Crianças e outros eventos do Centro Educacional Estrela Mágica.') + topo(v, 'eventos') + cab('Eventos', 'Datas que a gente comemora junto', fotos([1201, 1194])[0]) + `
<div class="in">
<nav class="indice" aria-label="Eventos">${EVENTOS.filter(e => fotos(e[1]).length).map((e, i) => `<a href="#ev${i}">${e[0]}</a>`).join('')}</nav>
${EVENTOS.map((e, i) => fotos(e[1]).length ? `<section class="amb" id="ev${i}"><h2>${e[0]}</h2>${galeria(e[1], e[0], 'galeria galeria-ev')}</section>` : '').join('')}
<p class="nota sobe">Também no calendário: Passeio do Dia das Crianças, Festa da Família, Gincana da Educação, Homenagem às professoras, Halloween, Show da Galinha Pintadinha e Teatro da Consciência Negra.</p>
</div>
` + rodape(v);

  pag.matricula = head(v, 'matricula', 'Matrícula', 'Matrículas abertas no Centro Educacional Estrela Mágica: documentos necessários.') + topo(v, 'matricula') + cab('Matrícula', 'Matrículas abertas', fotos([1237, 1236])[0]) + `
<div class="in">
<section class="mat sec-pad"><div class="sobe"><p class="k">Documentos necessários</p><h2>O que trazer na matrícula</h2><ol class="docs">${DOCS.map((d, i) => `<li><span>${i + 1}</span>${d}</li>`).join('')}</ol></div>
<aside class="mat-caixa sobe"><h2>Agende uma visita</h2><p>Venha conhecer a escola na Rua Paracatu, 155, em Santa Terezinha.</p><p class="bts"><a class="btn" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a class="btn btn-linha" href="${telHref(E.cel)}">${ic('tel')}${E.cel}</a></p><a class="link-seta" href="${link(v, 'contato')}">Ou envie uma mensagem ${ic('seta')}</a></aside></section>
</div>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Centro Educacional Estrela Mágica: ${E.rua}, ${E.bairro}, ${E.cidade}. Telefone ${E.fone}.`) + topo(v, 'contato') + cab('Fale conosco', 'Estamos em Santa Terezinha', '') + `
<div class="in"><section class="contato-pag">
  <div class="sobe"><ul class="contato-dados"><li>${ic('tel')}<div><span>Telefones</span><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${telHref(E.cel)}">${E.cel}</a></div></li><li>${ic('mail')}<div><span>E-mail</span><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('pin')}<div><span>Endereço</span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</div></li><li>${ic('relogio')}<div><span>Funcionamento</span>Das 7h às 19h</div></li></ul>
  <iframe class="mapa" title="Mapa do Centro Educacional Estrela Mágica" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Paracatu, 155, Santa Terezinha, Juiz de Fora MG')}&z=16&output=embed"></iframe></div>
  <div class="form-caixa sobe"><h2>Envie uma mensagem</h2><p>Preencha e envie: o seu e-mail abre com a mensagem pronta para a escola.</p>${form()}</div>
</section></div>
` + rodape(v);
  return pag;
}

const destaqueEventos = () => EVENTOS.slice(0, 4).filter(e => fotos(e[1]).length).map(e => [e[0], fotos(e[1])[0]]);

// ---------- A "Constelação": azul do logo, estrelas amarelas, fotos arredondadas ----------
function A() {
  const v = 'a';
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${estrela()}${k}</p><h1>${t}</h1></div>${foto ? `<figure>${img(foto, '', ' loading="eager"')}</figure>` : ''}</div></section>`;
  return paginas(v, cab, () => `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="selo">${estrela()}Matrículas abertas</p><h1>Do berçário ao 5º ano, com carinho e método.</h1><p>Educação Infantil e Ensino Fundamental em Santa Terezinha, Juiz de Fora. Horário integral das 7h às 19h.</p><p class="bts"><a class="btn" href="${link(v, 'matricula')}">Quero matricular</a><a class="btn btn-linha" href="${link(v, 'nosso-espaco')}">Conheça o espaço</a></p></div>
  <div class="hero-a-fotos">${fotos([1201, 1237, 1194, 1170]).slice(0, 3).map((n, i) => `<figure class="hf${i}">${img(n, 'Alunos do Estrela Mágica', ' loading="eager"')}</figure>`).join('')}${estrela('e1')}${estrela('e2')}${estrela('e3')}</div>
</div></section>
<section class="numeros-a"><div class="in numeros-a-in">${[['1995', 'Educando crianças em Juiz de Fora'], ['Berçário', 'ao 5º ano, na mesma escola'], ['7h às 19h', 'horário integral'], ['Sede própria', 'na Rua Paracatu desde 2002']].map(n => `<div>${estrela()}<b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in proposta-a"><figure class="sobe">${img(fotos([1266, 1265])[0], 'Sala do Maternal II')}</figure><div class="sobe"><p class="k">A Escola</p><h2>Construtivista, mas sem rigidez</h2><p>${ESCOLA[2]}</p><a class="link-seta" href="${link(v, 'a-escola')}">Nossa história ${ic('seta')}</a></div></section>
<section class="turmas-a"><div class="in"><header class="tit"><p class="k">Turmas</p><h2>Uma turma para cada fase</h2></header>${turmasHtml()}<p><a class="link-seta" href="${link(v, 'turmas')}">Professores, equipe e horários ${ic('seta')}</a></p></div></section>
<section class="in espaco-a"><header class="tit"><p class="k">Nosso Espaço</p><h2>Salas, fraldário e área de lazer</h2></header><div class="espaco-grade">${[['Maternal I', [1261, 1262]], ['1º período', [1304, 1305]], ['3º ano', [1286, 1287]], ['Lazer e recreação', [1314, 1315]]].map(e => [e[0], fotos(e[1])[0]]).filter(e => e[1]).map(e => `<a class="ea sobe" href="${link(v, 'nosso-espaco')}">${img(e[1], e[0])}<span>${e[0]}</span></a>`).join('')}</div></section>
<section class="eventos-a"><div class="in"><header class="tit"><p class="k">Eventos</p><h2>Carnaval, Páscoa, Feira Cultural e muito mais</h2></header><div class="ev-faixa">${destaqueEventos().map(e => `<a class="ev sobe" href="${link(v, 'eventos')}">${img(e[1], e[0])}<b>${e[0]}</b></a>`).join('')}</div></div></section>
<section class="in extras-a"><header class="tit"><p class="k">Cursos na escola</p><h2>Inglês, Ballet e Jiu-Jitsu</h2></header><div class="cursos">${CURSOS.map((c, i) => `<article class="curso c${i} sobe">${estrela()}<h3>${c.nome}</h3><p>${c.txt}</p></article>`).join('')}</div></section>
<section class="cta-a"><div class="in cta-a-in">${estrela('cta-e')}<div><h2>Matrículas abertas</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}</p></div><p class="bts"><a class="btn btn-amarelo" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Enviar mensagem</a></p></div></section>
`);
}

// ---------- B "Caderno": papel pautado, margem vermelha, fotos como polaroides ----------
function B() {
  const v = 'b';
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div>${foto ? `<figure class="polaroide">${img(foto, '', ' loading="eager"')}</figure>` : ''}</div></section>`;
  return paginas(v, cab, () => `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Centro Educacional Estrela Mágica · Juiz de Fora</p><h1>Aqui cada criança tem o seu <span>lugar na turma.</span></h1><p>Educação Infantil e Ensino Fundamental, do berçário ao 5º ano, das 7h às 19h, em Santa Terezinha.</p><p class="bts"><a class="btn" href="${link(v, 'matricula')}">Matrículas abertas</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div>
  <div class="hero-b-polas">${fotos([1237, 1201, 1170, 1194]).slice(0, 3).map((n, i) => `<figure class="polaroide p${i}">${img(n, 'Alunos do Estrela Mágica', ' loading="eager"')}<figcaption>${['Páscoa 2019', 'Carnaval 2019', 'Feira Cultural'][i]}</figcaption></figure>`).join('')}</div>
</div></section>
<section class="in horario-b"><div class="sobe"><p class="k">Horário</p>${horariosHtml()}</div><div class="sobe"><p class="k">Desde 1995</p><h2>Construtivista, mas eclética</h2><p>${ESCOLA[2]}</p><a class="link-seta" href="${link(v, 'a-escola')}">Nossa história ${ic('seta')}</a></div></section>
<section class="turmas-b"><div class="in"><header class="tit"><p class="k">Turmas</p><h2>Do Maternal ao 5º ano</h2></header>${turmasHtml()}</div></section>
<section class="in espaco-b"><header class="tit"><p class="k">Nosso Espaço</p><h2>Adaptado ao protocolo de reabertura</h2></header>${galeria([1261, 1304, 1286, 1314, 1278, 1320, 1252, 1266], 'Nosso Espaço', 'galeria galeria-b')}<p><a class="link-seta" href="${link(v, 'nosso-espaco')}">Ver todos os ambientes ${ic('seta')}</a></p></section>
<section class="eventos-b"><div class="in"><header class="tit"><p class="k">Eventos</p><h2>O mural da escola</h2></header><div class="mural">${destaqueEventos().map((e, i) => `<a class="polaroide m${i} sobe" href="${link(v, 'eventos')}">${img(e[1], e[0])}<figcaption>${e[0]}</figcaption></a>`).join('')}</div></div></section>
<section class="in docs-b"><div class="sobe"><p class="k">Matrícula</p><h2>Documentos necessários</h2><ol class="docs">${DOCS.map((d, i) => `<li><span>${i + 1}</span>${d}</li>`).join('')}</ol></div><aside class="mat-caixa sobe"><h2>Fale com a escola</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}</p><p class="bts"><a class="btn" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a class="btn btn-linha" href="${telHref(E.cel)}">${ic('tel')}${E.cel}</a></p></aside></section>
`);
}

copiarSiteJs(pub, '');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8') + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Estrela Mágica', artigo: 'do', url: E.url, lang: 'pt', cor: '#FFD400', fundo: '#0F218B', claro: '#F5F7FF',
  fonteTitulo: "'Nunito',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Constelação', paginas: 8, texto: 'O azul e as estrelas amarelas do logo: fotos reais dos alunos na abertura, as turmas como uma constelação e os ambientes da escola.', pontos: ['Logo redesenhado em vetor', 'Turmas, professores e horários', 'Ambientes e eventos com fotos reais'] },
    { letra: 'b', nome: 'Caderno', paginas: 8, texto: 'Papel de caderno com margem vermelha e fotos em polaroides: o mural de eventos e os documentos da matrícula logo na página inicial.', pontos: ['Fotos dos eventos como mural', 'Documentos da matrícula na abertura', 'Nosso Espaço por turma'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
