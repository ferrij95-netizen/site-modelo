// Os Caras de Pau do Vestibular (CPV), Boa Vista, Recife/PE: cursinho Pré-ENEM, SSA/UPE, IFPE, Pré-Militar e Isoladas. Gera public/{a,b}/ e a página de escolha.
// node clientes/carasdepau/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs carasdepau http://oscarasdepaudovestibular.com.br/)
// Textos, cursos, horários, fotos, e-books e logo (vetorizado) do site atual e das artes de divulgação.
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Os Caras de Pau do Vestibular', url: 'https://carasdepau.overtus.com.br/', antigo: 'http://oscarasdepaudovestibular.com.br/',
  fone: '(81) 3097-3041',
  rua: 'Rua Corredor do Bispo, 90', bairro: 'Boa Vista', cidade: 'Recife - PE',
  face: 'https://www.facebook.com/OsCarasDePauDoVestibular', insta: 'https://www.instagram.com/oscarasdepaudovestibular/',
  portal: 'https://portal.sistemaescolarweb.com.br/oscarasdepaudovestibular',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Source+Sans+3:wght@400;500;600;700&display=swap';
const LOGO = (c = '') => `<img class="logo" src="/assets/img/logo${c}.svg" alt="Os Caras de Pau do Vestibular" width="884" height="645">`;
const FOTOS = { alunos: [900, 292], 'sala-aula': [1080, 809], aulao: [1280, 772], turma: [1184, 666], 'turma-selfie': [960, 539], pulo: [385, 580], professor: [397, 600] };
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async" width="${FOTOS[n][0]}" height="${FOTOS[n][1]}"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;

const LEMA = 'Vamos dominar o mundo!';
const SOBRE = 'Jovens, inteligentes e divertidos: essa é a fórmula que compõe esta equipe de professores, que surgiu para revolucionar o cenário educacional de Pernambuco.';
const CURSOS = [
  { slug: 'pre-enem', nome: 'Pré-ENEM', tag: 'Todas as matérias', foto: 'sala-aula', resumo: 'O pré-ENEM de todas as tribos: manhã, tarde, noite ou fim de semana.',
    texto: ['Turma regular de fevereiro a novembro com todas as matérias do ENEM, em quatro opções de horário para caber na sua rotina, seja você aluno do 3º ano, de cursinho ou já formado.', 'Aluno de escola pública e ex-aluno do CPV têm condição especial na mensalidade.'],
    horarios: [['Manhã', 'Segunda a sexta', '8h às 12h30'], ['Tarde', 'Segunda a sexta', '13h30 às 18h'], ['Noite', 'Segunda a sexta', '18h30 às 22h'], ['Fim de semana', 'Sábado e domingo', 'Sáb 8h às 18h · Dom 8h às 12h']],
    inclui: ['Todas as áreas do ENEM', 'Turmas de fevereiro a novembro', 'Desconto para aluno de escola pública', 'Condição especial para ex-aluno do CPV'] },
  { slug: 'pre-ssa', nome: 'Pré-SSA', tag: 'UPE', foto: 'turma', resumo: 'Preparação para o SSA da UPE, aos sábados e domingos.',
    texto: ['Preparação para o Sistema Seriado de Avaliação (SSA) da Universidade de Pernambuco, com aulas concentradas no fim de semana para quem estuda durante a semana.', 'A turma vai de fevereiro a novembro e inclui apostila e fardamento.'],
    horarios: [['Sábado', 'Fim de semana', '8h às 18h'], ['Domingo', 'Fim de semana', '8h às 12h30']],
    inclui: ['Apostila e fardamento', 'Turmas de fevereiro a novembro', 'Desconto para aluno de escola pública'] },
  { slug: 'pre-ifpe', nome: 'Pré-IFPE', tag: '9º ano', foto: 'turma-selfie', resumo: 'Para alunos do 9º ano: IFPE, Colégio de Aplicação e Colégio Militar do Recife.',
    texto: ['Curso para alunos do 9º ano que vão disputar uma vaga no IFPE, no Colégio de Aplicação ou no Colégio Militar do Recife.', 'As aulas são aos sábados, de fevereiro a novembro, com material didático e fardamento.'],
    horarios: [['Sábado', 'Pré-IFPE e Colégio de Aplicação', '8h às 17h'], ['Sábado', 'Colégio Militar do Recife', '8h às 17h']],
    inclui: ['Material didático e fardamento', 'IFPE, Colégio de Aplicação e Colégio Militar', 'Aulas aos sábados'] },
  { slug: 'pre-militar', nome: 'Pré-Militar', tag: 'AFA · EFOMM · EsPCEx · ESA · EEAR', foto: 'aulao', resumo: 'AFA, EFOMM, EsPCEx, ESA e EEAR.',
    texto: ['Preparação para as provas das escolas militares: Academia da Força Aérea (AFA), Escola de Formação de Oficiais da Marinha Mercante (EFOMM), Escola Preparatória de Cadetes do Exército (EsPCEx), Escola de Sargentos das Armas (ESA) e Escola de Especialistas de Aeronáutica (EEAR).', 'Turma regular com início em fevereiro.'],
    provas: [['AFA', 'Academia da Força Aérea'], ['EFOMM', 'Formação de Oficiais da Marinha Mercante'], ['EsPCEx', 'Preparatória de Cadetes do Exército'], ['ESA', 'Escola de Sargentos das Armas'], ['EEAR', 'Especialistas de Aeronáutica']],
    inclui: ['Turma regular com início em fevereiro', 'Material didático', 'Cinco provas militares'] },
  { slug: 'isoladas', nome: 'Isoladas', tag: 'Por área', foto: 'turma', resumo: 'Matemática, Ciências Humanas, Linguagens e Ciências da Natureza.',
    texto: ['Para reforçar a área que mais pesa na sua nota: turmas isoladas de Matemática, Ciências Humanas, Linguagens e Ciências da Natureza.', 'Em Natureza, Física, Biologia e Química andam juntas na turma "A Natureza Mágica".'],
    areas: [['Matemática', 'Matemática e suas tecnologias.'], ['Ciências Humanas', 'História, Geografia, Filosofia e Sociologia.'], ['Linguagens', 'Língua portuguesa, literatura e interpretação de texto.'], ['Ciências da Natureza', 'Física, Biologia e Química, na turma A Natureza Mágica.']],
    inclui: ['Escolha só a área que precisa', 'Turmas ao longo do ano'] },
];
const EBOOKS = [
  { arq: 'ebook-antes-durante-depois-enem.pdf', nome: 'Antes, durante e depois do ENEM', txt: 'Um guia leve para entender o exame, o que fazer na reta final, no dia da prova e depois dela.', pag: '17 páginas' },
  { arq: 'ebook-humanas-no-enem.pdf', nome: 'Humanas no ENEM', txt: 'Todas as questões de Filosofia e Sociologia do ENEM de 2016 a 2023, organizadas por ano e com gabarito.', pag: '20 páginas' },
];
const ATEND = [['Segunda a sexta', '8h às 20h'], ['Sábado', '8h às 16h']];

const nav = [
  { slug: 'o-cpv', nome: 'O CPV' },
  { slug: 'pre-enem', nome: 'Pré-ENEM' },
  { slug: 'pre-ssa', nome: 'SSA/UPE' },
  { slug: 'pre-ifpe', nome: 'IFPE' },
  { slug: 'pre-militar', nome: 'Pré-Militar' },
  { slug: 'isoladas', nome: 'Isoladas' },
  { slug: 'materiais', nome: 'E-books' },
  { slug: 'contato', nome: 'Contato' },
];
const cores = { a: '#141414', b: '#2079A6' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Cursinho pré-vestibular na Boa Vista, Recife` : `${titulo} | Os Caras de Pau do Vestibular`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Os Caras de Pau do Vestibular, página inicial">${LOGO(v === 'a' ? '-branco' : '')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}<li class="menu-portal"><a href="${E.portal}" target="_blank" rel="noopener">Portal do Aluno</a></li></ul></nav>
    <a class="btn btn-topo" href="${telHref(E.fone)}">${ic('tel')}<span>${E.fone}</span></a>
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
    <div class="rod-marca">${LOGO('-branco')}<p>${LEMA} Cursinho pré-vestibular na Boa Vista, Recife.</p><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>Cursos</h3><ul>${CURSOS.map(c => `<li><a href="${link(v, c.slug)}">${c.nome}</a></li>`).join('')}</ul></div>
    <div><h3>CPV</h3><ul><li><a href="${link(v, 'o-cpv')}">Quem somos</a></li><li><a href="${link(v, 'materiais')}">E-books gratuitos</a></li><li><a href="${E.portal}" target="_blank" rel="noopener">Portal do Aluno</a></li><li><a href="${link(v, 'contato')}">Contato</a></li></ul></div>
    <div><h3>Fale com a gente</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li><li>${ic('relogio')}<span>${ATEND.map(a => `${a[0]}: ${a[1]}`).join('<br>')}</span></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Os Caras de Pau do Vestibular. O pré-ENEM de todas as tribos.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}
const horarios = c => c.horarios ? `<table class="horario"><thead><tr><th>Turma</th><th>Dias</th><th>Horário</th></tr></thead><tbody>${c.horarios.map(h => `<tr><th>${h[0]}</th><td>${h[1]}</td><td>${h[2]}</td></tr>`).join('')}</tbody></table>` : '';
const ebooks = cls => `<div class="ebooks ${cls || ''}">${EBOOKS.map(e => `<a class="ebook sobe" href="/assets/docs/${e.arq}" target="_blank" rel="noopener"><span class="ebook-capa"><b>e-book</b>${e.nome}</span><div><h3>${e.nome}</h3><p>${e.txt}</p><span class="link-seta">Baixar PDF grátis, ${e.pag} ${ic('seta')}</span></div></a>`).join('')}</div>`;
const ctaCurso = (v, c) => `<section class="cta-seg sobe"><div><h2>Garanta sua vaga no ${c ? c.nome : 'CPV'}</h2><p>Ligue ou passe na Boa Vista para saber valores, descontos e a próxima turma.</p></div><p class="bts"><a class="btn" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Como chegar</a></p></section>`;

function paginas(v, cab, home) {
  const pag = {};
  pag.index = head(v, 'index', '', 'Os Caras de Pau do Vestibular, cursinho na Boa Vista, Recife: Pré-ENEM, SSA/UPE, Pré-IFPE, Pré-Militar (AFA, EFOMM, EsPCEx, ESA e EEAR) e Isoladas. Vamos dominar o mundo!') + topo(v, 'index') + home() + rodape(v);

  pag['o-cpv'] = head(v, 'o-cpv', 'O CPV', 'Quem são Os Caras de Pau do Vestibular: uma equipe de professores jovens, inteligentes e divertidos no Recife.') + topo(v, 'o-cpv') + cab('O CPV', LEMA, 'alunos') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">${SOBRE}</p><p>Na Boa Vista, no Recife, o smoking da marca vira fardamento, as aulas viram aulões lotados e a meta é uma só: aprovação nos melhores vestibulares públicos.</p>${lista(['Pré-ENEM em quatro turnos', 'SSA/UPE, IFPE e Colégio Militar', 'Pré-Militar para cinco provas', 'Isoladas por área do conhecimento'])}</div><figure class="sobe">${img('professor', 'Professor do CPV com a camisa de smoking')}</figure></section>
<section class="fotos-cpv">${[['aulao', 'Aulão do CPV com o auditório lotado'], ['sala-aula', 'Aula do Pré-ENEM'], ['turma-selfie', 'Turma do CPV']].map((f, i) => `<figure class="fc${i} sobe">${img(f[0], f[1])}<figcaption>${f[1]}</figcaption></figure>`).join('')}</section>
<section class="smoking sobe"><div><p class="k">Fardamento</p><h2>O smoking é o uniforme</h2><p>A camisa preta com o smoking do logo identifica quem é da turma, dentro e fora da sala.</p></div>${img('pulo', 'Aluno do CPV pulando com a camisa de smoking')}</section>
<section class="portal sobe"><div><h2>Já é aluno?</h2><p>O acesso ao sistema escolar do CPV fica no Portal do Aluno.</p></div><a class="btn" href="${E.portal}" target="_blank" rel="noopener">Entrar no Portal do Aluno</a></section>
</div>
` + rodape(v);

  for (const c of CURSOS) {
    pag[c.slug] = head(v, c.slug, c.nome, `${c.nome} no CPV, Os Caras de Pau do Vestibular, Boa Vista, Recife. ${c.resumo}`) + topo(v, c.slug) + cab(c.tag, c.nome, c.foto) + `
<div class="in">
<section class="curso-pag"><div class="sobe">${c.texto.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${p}</p>`).join('')}
${c.provas ? `<div class="provas">${c.provas.map(p => `<div><b>${p[0]}</b><span>${p[1]}</span></div>`).join('')}</div>` : ''}
${c.areas ? `<div class="areas">${c.areas.map(p => `<div><b>${p[0]}</b><span>${p[1]}</span></div>`).join('')}</div>` : ''}
${c.horarios ? `<h2 class="h-hor">Horários</h2>${horarios(c)}` : ''}</div>
<aside class="curso-lado sobe"><h2>O que tem no curso</h2>${lista(c.inclui)}<a class="btn" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><p class="nota">Valores e descontos por telefone ou na secretaria.</p>
<nav class="outras" aria-label="Outros cursos"><h3>Outros cursos</h3><ul>${CURSOS.filter(o => o !== c).map(o => `<li><a href="${link(v, o.slug)}">${o.nome}</a></li>`).join('')}</ul></nav></aside></section>
${ctaCurso(v, c)}
</div>
` + rodape(v);
  }

  pag.materiais = head(v, 'materiais', 'E-books gratuitos', 'E-books gratuitos do CPV para o ENEM: Antes, durante e depois do ENEM e Humanas no ENEM (Filosofia e Sociologia de 2016 a 2023).') + topo(v, 'materiais') + cab('Material gratuito', 'E-books para o ENEM', '') + `
<div class="in"><section class="mat-pag"><p class="lead sobe">Material feito pelos professores do CPV para estudar em casa. É só baixar.</p>${ebooks()}</section></div>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Os Caras de Pau do Vestibular: ${E.rua}, ${E.bairro}, ${E.cidade}. Telefone ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Estamos na Boa Vista', '') + `
<div class="in"><section class="contato-pag">
  <div class="sobe"><ul class="contato-dados"><li>${ic('tel')}<div><span>Telefone</span><a href="${telHref(E.fone)}">${E.fone}</a></div></li><li>${ic('pin')}<div><span>Endereço</span>${E.rua}, ${E.bairro}<br>${E.cidade}</div></li><li>${ic('relogio')}<div><span>Atendimento</span>${ATEND.map(a => `${a[0]}: ${a[1]}`).join('<br>')}</div></li><li>${ic('insta')}<div><span>Instagram</span><a href="${E.insta}" target="_blank" rel="noopener">@oscarasdepaudovestibular</a></div></li><li>${ic('face')}<div><span>Facebook</span><a href="${E.face}" target="_blank" rel="noopener">Os Caras de Pau do Vestibular</a></div></li></ul>
  <p class="bts"><a class="btn" href="${telHref(E.fone)}">${ic('tel')}Ligar agora</a><a class="btn btn-linha" href="${E.portal}" target="_blank" rel="noopener">Portal do Aluno</a></p></div>
  <iframe class="mapa sobe" title="Mapa do CPV" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Corredor do Bispo, 90, Boa Vista, Recife PE')}&z=16&output=embed"></iframe>
</section></div>
` + rodape(v);
  return pag;
}

// ---------- A "Smoking": preto e branco do logo, amarelo das artes de matrícula ----------
function A() {
  const v = 'a';
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div>${foto ? `<figure>${img(foto, '', ' loading="eager"')}</figure>` : ''}</div></section>`;
  return paginas(v, cab, () => `
<section class="hero-a"><div class="in">
  <div class="hero-a-txt"><p class="k">Cursinho pré-vestibular · Boa Vista · Recife</p><h1>${LEMA}</h1><p>Pré-ENEM, SSA/UPE, IFPE, Pré-Militar e Isoladas com uma equipe de professores jovens, inteligentes e divertidos.</p><p class="bts"><a class="btn" href="${link(v, 'pre-enem')}">Conheça o Pré-ENEM</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div>
  <figure class="hero-a-foto">${img('alunos', 'Alunos do CPV com a camisa de smoking', ' loading="eager" fetchpriority="high"')}</figure>
</div></section>
<section class="in cursos-a"><header class="tit"><p class="k">Cursos</p><h2>Escolha a sua prova</h2></header>
  <div class="cursos-grade">${CURSOS.map((c, i) => `<a class="curso-a c${i} sobe" href="${link(v, c.slug)}"><span class="tag">${c.tag}</span><h3>${c.nome}</h3><p>${c.resumo}</p><span class="link-seta">Saiba mais ${ic('seta')}</span></a>`).join('')}<a class="curso-a ce sobe" href="${link(v, 'materiais')}"><span class="tag">Grátis</span><h3>E-books</h3><p>Antes, durante e depois do ENEM e Humanas no ENEM.</p><span class="link-seta">Baixar ${ic('seta')}</span></a></div>
</section>
<section class="aulao-a">${img('aulao', 'Aulão do CPV com o auditório lotado')}<div class="in aulao-a-in"><blockquote class="sobe"><p>${SOBRE}</p><cite>Aprovação nos melhores vestibulares públicos!</cite></blockquote></div></section>
<section class="in turnos-a"><div class="sobe"><p class="k">Pré-ENEM</p><h2>Quatro turnos para caber na sua rotina</h2><p>Turmas de fevereiro a novembro, com condição especial para aluno de escola pública e ex-aluno do CPV.</p><a class="link-seta" href="${link(v, 'pre-enem')}">Ver o Pré-ENEM ${ic('seta')}</a></div><div class="turnos sobe">${CURSOS[0].horarios.map(h => `<div><b>${h[0]}</b><span>${h[2].replace(' · ', '<br>')}</span></div>`).join('')}</div></section>
<section class="fotos-a"><div class="in fotos-a-in">${[['sala-aula', 'Pré-ENEM'], ['turma', 'Turma do CPV'], ['turma-selfie', 'Selfie com a turma']].map((f, i) => `<figure class="sobe">${img(f[0], f[1])}<figcaption>${f[1]}</figcaption></figure>`).join('')}</div></section>
<section class="in ebooks-a"><header class="tit"><p class="k">Material gratuito</p><h2>Comece a estudar agora</h2></header>${ebooks()}</section>
<section class="local-a"><div class="in local-a-in"><div><p class="k">Onde estamos</p><h2>${E.rua}, ${E.bairro}</h2><p>${E.cidade} · ${ATEND.map(a => `${a[0]} ${a[1]}`).join(' · ')}</p></div><p class="bts"><a class="btn" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Como chegar</a></p></div></section>
`);
}

// ---------- B "Todas as tribos": azul e amarelo das artes de matrícula, aluno pulando na abertura ----------
function B() {
  const v = 'b';
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div>${foto ? `<figure>${img(foto, '', ' loading="eager"')}</figure>` : ''}</div></section>`;
  return paginas(v, cab, () => `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Os Caras de Pau do Vestibular</p><h1>O pré-ENEM de <em>todas as tribos.</em></h1><p>Cursinho na Boa Vista, Recife, com Pré-ENEM em quatro turnos, SSA/UPE, IFPE, Pré-Militar e Isoladas.</p><p class="bts"><a class="btn" href="${link(v, 'pre-enem')}">Quero fazer o Pré-ENEM</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div>
  <figure class="hero-b-foto">${img('pulo', 'Aluno do CPV pulando com a camisa de smoking', ' loading="eager" fetchpriority="high"')}</figure>
</div></section>
<section class="in lista-b"><header class="tit"><p class="k">Cursos</p><h2>Qual é a sua prova?</h2></header>
  <ol class="cursos-b">${CURSOS.map((c, i) => `<li class="sobe"><a href="${link(v, c.slug)}"><span class="n">0${i + 1}</span><b>${c.nome}</b><span class="r">${c.resumo}</span><span class="t">${c.tag}</span>${ic('seta')}</a></li>`).join('')}</ol>
</section>
<section class="mosaico-b"><div class="in mosaico-in">${[['aulao', 'Aulão lotado'], ['sala-aula', 'Sala do Pré-ENEM'], ['turma-selfie', 'Selfie com a turma'], ['alunos', 'A turma do smoking']].map((f, i) => `<figure class="m${i} sobe">${img(f[0], f[1])}<figcaption>${f[1]}</figcaption></figure>`).join('')}<div class="m-txt sobe"><p class="k">O CPV</p><h2>${LEMA}</h2><p>${SOBRE}</p><a class="link-seta" href="${link(v, 'o-cpv')}">Conheça o CPV ${ic('seta')}</a></div></div></section>
<section class="in turnos-b"><header class="tit"><p class="k">Horários do Pré-ENEM</p><h2>Manhã, tarde, noite ou fim de semana</h2></header>${horarios(CURSOS[0])}</section>
<section class="ebooks-b"><div class="in"><header class="tit"><p class="k">Grátis</p><h2>E-books dos professores do CPV</h2></header>${ebooks('claro')}</div></section>
<section class="in local-b"><div class="sobe"><p class="k">Visite a gente</p><h2>${E.rua}, ${E.bairro}, ${E.cidade}</h2><p>${ATEND.map(a => `${a[0]}: ${a[1]}`).join(' · ')}</p><p class="bts"><a class="btn" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a class="btn btn-linha" href="${E.insta}" target="_blank" rel="noopener">${ic('insta')}Instagram</a></p></div><iframe class="mapa sobe" title="Mapa do CPV" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Corredor do Bispo, 90, Boa Vista, Recife PE')}&z=16&output=embed"></iframe></section>
`);
}

copiarSiteJs(pub, '');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8') + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Caras de Pau', artigo: 'dos', url: E.url, lang: 'pt', cor: '#F6B800', fundo: '#141414', claro: '#F6F4EE',
  fonteTitulo: "'Nunito',system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Smoking', paginas: 9, texto: 'Preto e branco do logo com o amarelo das artes de matrícula: a turma de smoking na abertura, os cursos em cartões, o aulão lotado e os turnos do Pré-ENEM.', pontos: ['Logo redesenhado em vetor', 'E-books gratuitos para baixar', 'Portal do Aluno no menu'] },
    { letra: 'b', nome: 'Todas as tribos', paginas: 9, texto: 'Azul e amarelo das artes de 2022: o aluno pulando na abertura, os cursos como uma lista numerada, mosaico de fotos das aulas e mapa na página inicial.', pontos: ['Cursos numerados por prova', 'Horários do Pré-ENEM em tabela', 'Mapa e Instagram no fim'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
