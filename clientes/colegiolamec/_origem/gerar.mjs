// Colégio Lamec (Vila Belmiro, Santos/SP), Educação Infantil e Ensino Fundamental desde 1992. Gera public/{a,b}/ e a página de escolha.
// node clientes/colegiolamec/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs colegiolamec http://www.colegiolamec.com.br/)
// Textos e fotos do site atual (Quem Somos, Missão, Visão, Valores, Cursos, galerias). Formulário abre o e-mail contato@colegiolamec.com.br (o site não tem WhatsApp).
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Colégio Lamec', url: 'https://colegiolamec.overtus.com.br/', antigo: 'http://www.colegiolamec.com.br/',
  fone: '(13) 3251-6631', email: 'contato@colegiolamec.com.br',
  rua: 'Rua Doutor Carvalho de Mendonça, 590', bairro: 'Vila Belmiro', cidade: 'Santos - SP', cep: '11070-102',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@400;900&family=Inter:wght@400;500;600;700&display=swap';
const LOGO = (c = '') => `<img class="logo" src="/assets/img/logo${c}.svg" alt="Colégio Lamec, Ensino Infantil e Fundamental" width="257" height="114">`;
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;

const nav = [
  { slug: 'colegio', nome: 'Institucional' },
  { slug: 'educacao-infantil', nome: 'Educação Infantil' },
  { slug: 'ensino-fundamental', nome: 'Ensino Fundamental' },
  { slug: 'periodo-integral', nome: 'Período Integral' },
  { slug: 'galeria', nome: 'Galeria de Fotos' },
  { slug: 'contato', nome: 'Contato' },
];
const D = {
  quem: ['O Colégio Lamec, no bairro Vila Belmiro, em Santos, foi fundado em 1992. Nos três primeiros anos de sua existência, esteve voltado para o atendimento de crianças de 2 a 6 anos, no curso Pré-Escolar.',
    'Em 1995 obteve junto à Secretaria de Estado da Educação de São Paulo autorização definitiva para atender também alunos do 1º grau, hoje denominado Ensino Fundamental, do 1º ao 9º ano, sob o reconhecimento da Portaria DES 08/12/95, Aut. Proc. 122/95, D.O.E. 15/12/95.'],
  missao: 'Em nosso colégio, o aluno é preparado para enfrentar um mundo que se transforma em ritmo acelerado. Damos prioridade ao desenvolvimento de suas potencialidades. Respeitamos a individualidade e garantimos uma socialização integral, tendo em vista o tradicionalismo e o porte desta instituição, onde nossos futuros cidadãos não são considerados apenas um número, e sim uma pessoa na sua integralidade.',
  visao: [
    'Na Educação Infantil, valorizamos os direitos e deveres de nossas crianças, auxiliando-as nesta etapa inicial da vida escolar, e promovemos, através do lúdico, o desenvolvimento global da criança. Proporcionamos a todas, dentro de sua faixa etária, os conhecimentos específicos de cada área, até que, no término da pré-escola, a criança esteja preparada para iniciar uma nova etapa: o Ensino Fundamental.',
    'O Ensino Fundamental em seu ciclo I, do 1º ao 5º ano, consolida a primeira parte da base educacional. Toda a equipe pedagógica empenha-se em despertar o desejo de aprender e conscientizar sobre a importância do saber, iniciando um processo de escolha e aperfeiçoamento da personalidade.',
    'No ciclo II, do 6º ao 9º ano, o aluno desenvolve suas habilidades individuais e aprende a relacionar o conhecimento das diferentes áreas, preparando-se para o grande volume de informações do Ensino Médio. Neste processo constrói seu conhecimento voltado para os aspectos científico, tecnológico e artístico e desenvolve a capacidade de reflexão, comunicação, cooperação e ação.',
  ],
  valores: ['O pleno desenvolvimento da criança e do adolescente', 'O preparo para o exercício da cidadania', 'O fornecimento de meios para progredir em outros níveis de ensino', 'O desenvolvimento de suas potencialidades como elemento de autorrealização'],
  fases: [['Mini maternal', '1 a 2 anos'], ['Maternal', '2 a 3 anos'], ['Jardim I', '3 a 4 anos'], ['Jardim II', '4 a 5 anos'], ['Pré', '5 a 6 anos']],
  areas: ['Formação Pessoal e Social', 'Conhecimento de Mundo', 'Movimento', 'Música', 'Artes Visuais', 'Linguagem Oral e Escrita', 'Natureza e Sociedade', 'Matemática'],
  comum: ['Língua Portuguesa', 'História', 'Geografia', 'Matemática', 'Ciências', 'Educação Física', 'Arte'],
  diversificada: ['Inglês', 'Espanhol', 'Redação'],
  integral: [['aulas-de-ingles-3-x-por-semana', 'Inglês 3 vezes por semana'], ['aulas-de-ballet', 'Ballet'], ['aulas-de-judo', 'Judô'], ['aulas-de-teatro', 'Teatro'], ['amizade', 'Amizade']],
  extras: [['ballet', 'Ballet'], ['musica', 'Música'], ['judo', 'Judô']],
  infra: [['entrada-social', 'Entrada social'], ['sala-de-aula-ed-infantil', 'Sala de aula, Ed. Infantil'], ['sala-de-aula-ens-fundamental-ii', 'Sala de aula, Ens. Fundamental II'], ['brinquedoteca', 'Brinquedoteca'], ['biblioteca-ed-infantil', 'Biblioteca, Ed. Infantil'], ['sala-de-musicalizacao-e-teatro', 'Sala de Musicalização e Teatro'], ['sala-multimidia', 'Sala Multimídia'], ['biblioteca', 'Biblioteca'], ['laboratorio-de-informatica', 'Laboratório de Informática'], ['sala-de-ballet-e-judo', 'Sala de Ballet e Judô'], ['parque', 'Parque'], ['sala-de-convivencia-integral', 'Sala de Convivência, Integral'], ['refeitorio-ed-infantil', 'Refeitório, Ed. Infantil'], ['refeitorio-ens-fundamental-2', 'Refeitório, Ens. Fundamental'], ['quadra-coberta', 'Quadra coberta']],
};
const galerias = [
  ['Colégio Lamec: conheça-nos', [['entrada-social', 'Entrada social'], ['sala-de-aula-ed-infantil', 'Sala de aula, Ed. Infantil'], ['sala-de-aula-ed-infantil-2', 'Sala de aula, Ed. Infantil'], ['sala-de-aula-ens-fundamental-i', 'Sala de aula, Ens. Fundamental I'], ['sala-de-aula-ens-fundamental-ii', 'Sala de aula, Ens. Fundamental II'], ['sala-de-convivencia-integral', 'Sala de Convivência, Integral'], ['sala-de-convivencia-integral-2', 'Sala de Convivência, Integral'], ['brinquedoteca', 'Brinquedoteca'], ['biblioteca-ed-infantil', 'Biblioteca, Ed. Infantil'], ['sala-de-musicalizacao-e-teatro', 'Sala de Musicalização e Teatro'], ['sala-de-musicalizacao-e-teatro-2', 'Sala de Musicalização e Teatro'], ['sala-multimidia', 'Sala Multimídia'], ['biblioteca', 'Biblioteca'], ['biblioteca-2', 'Biblioteca'], ['laboratorio-de-informatica', 'Laboratório de Informática'], ['sala-de-ballet-e-judo', 'Sala de Ballet e Judô'], ['parque', 'Parque'], ['parque-2', 'Parque'], ['refeitorio-ed-infantil', 'Refeitório, Ed. Infantil'], ['refeitorio-ens-fundamental', 'Refeitório, Ens. Fundamental'], ['refeitorio-ens-fundamental-2', 'Refeitório, Ens. Fundamental'], ['quadra-coberta', 'Quadra coberta']]],
  ['Cursos extras', [['ballet', 'Ballet'], ['ballet-2', 'Ballet'], ['musica', 'Música'], ['musica-2', 'Música'], ['judo', 'Judô'], ['judo-2', 'Judô'], ['judo-3', 'Judô']]],
  ['Período Integral', [['aulas-de-ingles-3-x-por-semana', 'Aulas de Inglês 3 vezes por semana'], ['aulas-de-ballet', 'Aulas de Ballet'], ['aulas-de-judo', 'Aulas de Judô'], ['aulas-de-teatro', 'Aulas de Teatro'], ['atividade', 'Período Integral'], ['amizade', 'Amizade']]],
  ['Alunos', [['alunas', 'Alunas do Colégio Lamec'], ['infantil-tapete', 'Educação Infantil'], ['fundamental-roda', 'Ensino Fundamental'], ['placa', 'Fachada do Colégio Lamec']]],
];

const cores = { a: '#F07820', b: '#1F6B3A' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Educação Infantil e Ensino Fundamental em Santos/SP desde 1992` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial">${LOGO()}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map((n, i) => `<li class="m${i}"><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <a class="fone-topo" href="${telHref(E.fone)}">${ic('tel')}<span><small>Telefone</small>${E.fone}</span></a>
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
    <div class="rod-marca">${LOGO('-branco')}<p>Educação Infantil e Ensino Fundamental (1º ao 9º ano) na Vila Belmiro, em Santos, desde 1992.</p></div>
    <div><h3>Páginas</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}<br>CEP ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ${E.nome}. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}
const mapaFrame = () => `<iframe class="mapa" title="Mapa do Colégio Lamec" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Doutor Carvalho de Mendonça, 590, Vila Belmiro, Santos SP')}&z=16&output=embed"></iframe>`;
const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Contato pelo site do Colégio Lamec">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Telefone*<input name="fone" type="tel" required autocomplete="tel"></label></div>
  <label>E-mail*<input name="email" type="email" required autocomplete="email"></label>
  <label>Assunto<select name="assunto"><option>Quero agendar uma visita</option><option>Matrícula na Educação Infantil</option><option>Matrícula no Ensino Fundamental</option><option>Período Integral</option><option>Sugestões e dúvidas</option></select></label>
  <label>Mensagem*<textarea name="msg" rows="5" required></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar mensagem</button>
  <p class="form-nota">A mensagem abre no seu e-mail, já preenchida, para ${E.email}.</p>
</form>`;
const galeriaGrade = (fotos, cls = 'galeria') => `<div class="${cls}">${fotos.map(f => `<a class="sobe" href="/assets/img/${f[0]}.webp" data-foto data-legenda="${esc(f[1])}">${img(f[0], f[1])}<span>${f[1]}</span></a>`).join('')}</div>`;

function internas(v, pag, cab) {
  pag.colegio = head(v, 'colegio', 'Institucional', 'Colégio Lamec: fundado em 1992 na Vila Belmiro, Santos. Missão, visão, valores e infraestrutura.') + topo(v, 'colegio') + cab('Institucional', 'Quem somos', 'sala-de-aula-ens-fundamental-ii') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">${D.quem[0]}</p><p>${D.quem[1]}</p></div><figure class="sobe foto-incl">${img('placa', 'Fachada do Colégio Lamec, nº 590')}</figure></section>
<section class="linha-tempo sobe"><div><b>1992</b><span>Fundação, com o curso Pré-Escolar (2 a 6 anos)</span></div><div><b>1995</b><span>Autorização definitiva para o Ensino Fundamental, do 1º ao 9º ano</span></div><div><b>Hoje</b><span>Do Mini maternal ao 9º ano, com Período Integral e cursos extras</span></div></section>
<section class="mvv">
  <article class="mvv-c c1 sobe"><h2>Nossa missão</h2><p>${D.missao}</p></article>
  <article class="mvv-c c2 sobe"><h2>Nossos valores</h2><p>Com base nos princípios de liberdade e nos ideais de solidariedade, temos por finalidade:</p>${lista(D.valores)}</article>
  <article class="mvv-c c3 sobe"><h2>Nossa visão</h2>${D.visao.map(p => `<p>${p}</p>`).join('')}</article>
</section>
<section class="infra"><header class="tit"><p class="k">Infraestrutura</p><h2>Espaços para cada idade</h2></header>${galeriaGrade(D.infra)}</section>
</div>
` + rodape(v);

  pag['educacao-infantil'] = head(v, 'educacao-infantil', 'Educação Infantil', 'Educação Infantil no Colégio Lamec: Mini maternal, Maternal, Jardim I, Jardim II e Pré, de 1 a 6 anos.') + topo(v, 'educacao-infantil') + cab('Cursos', 'Educação Infantil', 'infantil-tapete') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">As atividades da Educação Infantil são divididas em fases, respeitando-se a faixa etária da criança.</p><p>${D.visao[0]}</p></div><figure class="sobe foto-incl">${img('brinquedoteca', 'Brinquedoteca do Colégio Lamec')}</figure></section>
<section class="fases"><header class="tit"><p class="k">Fases</p><h2>Do Mini maternal ao Pré</h2></header><ol class="fases-lista">${D.fases.map((f, i) => `<li class="sobe f${i}"><b>${f[0]}</b><span>${f[1]}</span></li>`).join('')}</ol></section>
<section class="areas sobe"><div><p class="k">Áreas estimuladas</p><h2>O que a criança desenvolve</h2><p>Em todas as fases, os alunos são estimulados nestas áreas:</p></div><ul class="tags">${D.areas.map(a => `<li>${a}</li>`).join('')}</ul></section>
<section class="fotos-trio">${[['sala-de-aula-ed-infantil', 'Sala de aula da Educação Infantil'], ['biblioteca-ed-infantil', 'Biblioteca da Educação Infantil'], ['parque', 'Parque']].map(f => `<figure class="sobe">${img(f[0], f[1])}<figcaption>${f[1]}</figcaption></figure>`).join('')}</section>
</div>
${proxima(v, 'ensino-fundamental')}
` + rodape(v);

  pag['ensino-fundamental'] = head(v, 'ensino-fundamental', 'Ensino Fundamental', 'Ensino Fundamental do 1º ao 9º ano no Colégio Lamec, em Santos: parte comum e parte diversificada com Inglês, Espanhol e Redação.') + topo(v, 'ensino-fundamental') + cab('Cursos', 'Ensino Fundamental', 'sala-de-aula-ens-fundamental-ii') + `
<div class="in">
<section class="ciclos">
  <article class="ciclo sobe"><p class="k">Ciclo I</p><h2>1º ao 5º ano</h2><p>${D.visao[1]}</p></article>
  <article class="ciclo sobe"><p class="k">Ciclo II</p><h2>6º ao 9º ano</h2><p>${D.visao[2]}</p></article>
</section>
<section class="grade sobe"><header><p class="k">Grade curricular</p><h2>Parte comum e parte diversificada</h2><p>As disciplinas desenvolvidas são as que compõem o Currículo Nacional Comum.</p></header>
  <div class="grade-cols"><div><h3>Parte comum</h3><ul class="tags">${D.comum.map(a => `<li>${a}</li>`).join('')}</ul></div><div class="div"><h3>Parte diversificada</h3><ul class="tags">${D.diversificada.map(a => `<li>${a}</li>`).join('')}</ul></div></div></section>
<section class="fotos-trio">${[['sala-de-aula-ens-fundamental-i', 'Sala de aula do Ensino Fundamental I'], ['laboratorio-de-informatica', 'Laboratório de Informática'], ['quadra-coberta', 'Quadra coberta']].map(f => `<figure class="sobe">${img(f[0], f[1])}<figcaption>${f[1]}</figcaption></figure>`).join('')}</section>
</div>
${proxima(v, 'periodo-integral')}
` + rodape(v);

  pag['periodo-integral'] = head(v, 'periodo-integral', 'Período Integral e cursos extras', 'Período Integral no Colégio Lamec com Inglês 3 vezes por semana, Ballet, Judô e Teatro. Cursos extras de Ballet, Música e Judô.') + topo(v, 'periodo-integral') + cab('Período Integral', 'O dia todo aprendendo e convivendo', 'aulas-de-ingles-3-x-por-semana') + `
<div class="in">
<section class="integral"><header class="tit"><p class="k">Período Integral</p><h2>Atividades incluídas no Integral</h2><p>Os alunos do Período Integral têm sala de convivência própria e uma rotina de aulas e atividades ao longo do dia.</p></header>
  <div class="integral-grade">${D.integral.map((f, i) => `<figure class="sobe i${i}">${img(f[0], f[1])}<figcaption>${f[1]}</figcaption></figure>`).join('')}</div></section>
<section class="extras"><header class="tit"><p class="k">Cursos extras</p><h2>Ballet, Música e Judô</h2><p>Atividades com professores especializados, em salas próprias: sala de Ballet e Judô e sala de Musicalização e Teatro.</p></header>
  <div class="extras-grade">${D.extras.map((f, i) => `<figure class="sobe e${i}">${img(f[0], f[1])}<figcaption>${f[1]}</figcaption></figure>`).join('')}</div></section>
</div>
${proxima(v, 'galeria')}
` + rodape(v);

  pag.galeria = head(v, 'galeria', 'Galeria de Fotos', 'Fotos do Colégio Lamec: salas, biblioteca, parque, quadra, Período Integral e cursos extras.') + topo(v, 'galeria') + cab('Galeria de Fotos', 'Conheça o Lamec por dentro', 'parque') + `
<div class="in">
<nav class="indice" aria-label="Álbuns">${galerias.map((g, i) => `<a href="#album-${i}">${g[0]}</a>`).join('')}</nav>
${galerias.map((g, i) => `<section class="album" id="album-${i}"><h2>${g[0]}</h2>${galeriaGrade(g[1])}</section>`).join('\n')}
</div>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `${E.nome}: ${E.rua}, ${E.bairro}, ${E.cidade}. Telefone ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Venha conhecer o Lamec', 'entrada-social') + `
<div class="in"><section class="contato-pag">
  <div class="sobe"><h2>Fale com a secretaria</h2><p>Utilize nosso formulário para enviar sugestões, esclarecer dúvidas ou agendar uma visita.</p>${formulario()}</div>
  <div class="contato-lado sobe">
    <ul class="contato-dados">
      <li>${ic('tel')}<div><span>Telefone</span><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
      <li>${ic('mail')}<div><span>E-mail</span><a href="mailto:${E.email}">${E.email}</a></div></li>
      <li>${ic('pin')}<div><span>Endereço</span>${E.rua}<br>${E.bairro}, ${E.cidade} · CEP ${E.cep}</div></li>
    </ul>
    ${mapaFrame()}
  </div>
</section></div>
` + rodape(v);
}
function proxima(v, slug) {
  const n = nav.find(x => x.slug === slug);
  return `<section class="proxima"><div class="in"><a href="${link(v, slug)}"><span>Continue</span><b>${n.nome}</b>${ic('seta')}</a></div></section>`;
}

// ---------- A "Recreio": fiel ao site atual (céu, abas coloridas, cards inclinados em laranja, azul e roxo, gramado) ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Colégio Lamec, em Santos: Educação Infantil do Mini maternal ao Pré e Ensino Fundamental do 1º ao 9º ano, com Período Integral e cursos extras.') + topo(v, 'index') + `
<section class="hero-a"><div class="in">
  <div class="palco" data-carrossel>
    ${[['sala-de-aula-ens-fundamental-ii', 'Alunos do Ensino Fundamental em sala de aula'], ['aulas-de-ingles-3-x-por-semana', 'Aula de Inglês do Período Integral'], ['ballet', 'Aula de Ballet'], ['amizade', 'Alunos do Colégio Lamec'], ['judo', 'Aula de Judô']].map((f, i) => `<div class="slide${i ? '' : ' ativo'}">${img(f[0], f[1], i ? '' : ' loading="eager" fetchpriority="high"')}</div>`).join('')}
    <div class="palco-txt"><p class="k">Desde 1992 na Vila Belmiro, Santos</p><h1>Educação Infantil e Ensino Fundamental, do Mini maternal ao 9º ano.</h1></div>
    <a class="tag-fone" href="${telHref(E.fone)}"><small>Telefone:</small>${E.fone}</a>
  </div>
</div></section>
<section class="gramado"><div class="in">
  <div class="tres">${[
    ['laranja', 'placa', 'Bem-vindos', 'Seja bem-vindo ao Colégio Lamec. Conheça nossa infraestrutura e os cursos oferecidos. Para mais informações, entre em contato.', 'colegio', 'Conheça o colégio'],
    ['azul', 'infantil-tapete', 'Educação Infantil', 'As atividades da Educação Infantil são divididas em fases, respeitando-se a faixa etária da criança: do Mini maternal (1 ano) ao Pré (6 anos).', 'educacao-infantil', 'Saiba mais'],
    ['roxo', 'fundamental-roda', 'Ensino Fundamental', 'Do 1º ao 9º ano. Nossa grade é composta de uma parte comum e uma parte diversificada, com Inglês, Espanhol e Redação.', 'ensino-fundamental', 'Saiba mais'],
  ].map(c => `<article class="card-incl c-${c[0]} sobe"><figure>${img(c[1], c[2])}</figure><h2>${c[2]}</h2><p>${c[3]}</p><a class="seta-verde" href="${link(v, c[4])}">${c[5]} +</a></article>`).join('')}</div>
</div></section>
<section class="faixa-integral"><div class="in fi-in">
  <div class="sobe"><p class="k">Período Integral</p><h2>O dia todo no Lamec, com Inglês 3 vezes por semana, Ballet, Judô e Teatro.</h2><p>E cursos extras de Ballet, Música e Judô em salas próprias.</p><a class="btn" href="${link(v, 'periodo-integral')}">Conheça o Período Integral</a></div>
  <div class="fi-fotos">${[['aulas-de-ingles-3-x-por-semana', 'Inglês'], ['aulas-de-ballet', 'Ballet'], ['aulas-de-judo', 'Judô'], ['aulas-de-teatro', 'Teatro']].map(f => `<figure class="sobe">${img(f[0], f[1])}<figcaption>${f[1]}</figcaption></figure>`).join('')}</div>
</div></section>
<section class="in infra-a"><header class="tit"><p class="k">Infraestrutura</p><h2>Conheça nosso colégio através de nossas fotos</h2></header>
  ${galeriaGrade(D.infra.slice(0, 8), 'galeria galeria-a')}
  <p><a class="link-seta" href="${link(v, 'galeria')}">Ver todos os álbuns ${ic('seta')}</a></p></section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Venha conhecer o Colégio Lamec</h2><p>${E.rua} · ${E.bairro}, ${E.cidade}</p></div><p class="bts"><a class="btn btn-claro" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a class="btn btn-linha" href="${link(v, 'contato')}">${ic('mail')}Enviar mensagem</a></p></div></section>
` + rodape(v);
  internas(v, pag, cab);
  return pag;
}

// ---------- B "Lousa": verde de lousa com o laranja do logo, régua das idades, mural de fotos ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Colégio Lamec, em Santos: Educação Infantil do Mini maternal ao Pré e Ensino Fundamental do 1º ao 9º ano, com Período Integral e cursos extras.') + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Colégio Lamec · Vila Belmiro, Santos</p><h1>Aqui o aluno é uma pessoa, <em>não um número.</em></h1><p>Educação Infantil e Ensino Fundamental desde 1992, com Período Integral, Inglês, Ballet, Judô, Música e Teatro.</p>
    <p class="bts"><a class="btn" href="${link(v, 'contato')}">Agende uma visita</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div>
  <div class="mural">${[['alunas', 'Alunas do Colégio Lamec', 'm1'], ['sala-de-aula-ens-fundamental-ii', 'Ensino Fundamental', 'm2'], ['infantil-tapete', 'Educação Infantil', 'm3']].map(f => `<figure class="${f[2]}">${img(f[0], f[1], ' loading="eager"')}</figure>`).join('')}</div>
</div></section>
<section class="regua"><div class="in"><header class="tit"><p class="k">Do primeiro ano de vida ao 9º ano</p><h2>Uma escola para toda a infância</h2></header>
  <ol class="regua-lista">${[...D.fases.map(f => [f[0], f[1], 'educacao-infantil']), ['1º ao 5º ano', 'Ciclo I', 'ensino-fundamental'], ['6º ao 9º ano', 'Ciclo II', 'ensino-fundamental']].map((f, i) => `<li class="sobe r${i}"><a href="${link(v, f[2])}"><b>${f[0]}</b><span>${f[1]}</span></a></li>`).join('')}</ol>
  <div class="regua-legenda"><span class="l1">Educação Infantil</span><span class="l2">Ensino Fundamental</span></div>
</div></section>
<section class="in duas-b">
  <a class="bloco sobe" href="${link(v, 'educacao-infantil')}">${img('brinquedoteca', 'Brinquedoteca')}<div><p class="k">Educação Infantil</p><h3>Através do lúdico, o desenvolvimento global da criança</h3><p>Formação pessoal e social, movimento, música, artes visuais, linguagem oral e escrita, natureza e sociedade e matemática.</p></div></a>
  <a class="bloco sobe" href="${link(v, 'ensino-fundamental')}">${img('laboratorio-de-informatica', 'Laboratório de Informática')}<div><p class="k">Ensino Fundamental</p><h3>Base comum e parte diversificada com Inglês, Espanhol e Redação</h3><p>Ciclo I do 1º ao 5º ano e Ciclo II do 6º ao 9º ano, preparando para o Ensino Médio.</p></div></a>
</section>
<section class="extras-b"><div class="in"><header class="tit"><p class="k">Período Integral e cursos extras</p><h2>Depois da aula, tem mais</h2></header>
  <div class="extras-b-grade">${[['aulas-de-ingles-3-x-por-semana', 'Inglês', '3 vezes por semana no Integral'], ['ballet', 'Ballet', 'Sala própria com barras'], ['judo-2', 'Judô', 'Tatame na sala de Judô'], ['musica', 'Música', 'Sala de Musicalização'], ['aulas-de-teatro', 'Teatro', 'No Período Integral']].map((f, i) => `<a class="ex sobe x${i}" href="${link(v, 'periodo-integral')}">${img(f[0], f[1])}<b>${f[1]}</b><span>${f[2]}</span></a>`).join('')}</div>
</div></section>
<section class="in missao-b sobe"><blockquote><p>“Respeitamos a individualidade e garantimos uma socialização integral, onde nossos futuros cidadãos não são considerados apenas um número, e sim uma pessoa na sua integralidade.”</p></blockquote><a class="link-seta" href="${link(v, 'colegio')}">Missão, visão e valores ${ic('seta')}</a></section>
<section class="in infra-b"><header class="tit"><p class="k">Infraestrutura</p><h2>Biblioteca, parque, quadra coberta e mais</h2></header>${galeriaGrade([D.infra[7], D.infra[10], D.infra[14], D.infra[6], D.infra[12], D.infra[3]], 'galeria galeria-b')}<p><a class="link-seta" href="${link(v, 'galeria')}">Galeria de fotos ${ic('seta')}</a></p></section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>Matrículas e visitas</h2><p>${E.rua} · ${E.bairro}, ${E.cidade}</p></div><p class="bts"><a class="btn btn-claro" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a class="btn btn-linha" href="${link(v, 'contato')}">${ic('mail')}Enviar mensagem</a></p></div></section>
` + rodape(v);
  internas(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8') + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Colégio Lamec', artigo: 'do', url: E.url, lang: 'pt', cor: '#F07820', fundo: '#1F6B3A', claro: '#FFF8EE',
  fonteTitulo: "'Londrina Solid',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Recreio', paginas: 7, texto: 'Fiel ao site atual: céu claro, menu em abas coloridas, os três cards inclinados (laranja, azul e roxo) sobre o gramado e o telefone em destaque.', pontos: ['Logo redesenhado em vetor', 'Fotos reais das salas, do parque e das aulas', 'Nova página do Período Integral'] },
    { letra: 'b', nome: 'Lousa', paginas: 7, texto: 'Verde de lousa com o laranja do logo: régua das idades do Mini maternal ao 9º ano, cursos extras em destaque e a missão da escola na página inicial.', pontos: ['"Aqui o aluno é uma pessoa, não um número"', 'Régua visual das fases', 'Galeria com os álbuns do site'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
