// Escola Carlitos (Higienópolis, São Paulo/SP). Gera public/{a,b}/ e a página de escolha.
// node clientes/escolacarlitos/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs escolacarlitos https://www.escolacarlitos.com.br/)
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const C = JSON.parse(fs.readFileSync(path.join(aqui, 'conteudo.json'), 'utf8'));
const E = {
  nome: 'Escola Carlitos', url: 'https://escolacarlitos.overtus.com.br/', antigo: 'https://www.escolacarlitos.com.br/',
  fone: '(11) 3662-9591', wa: '551136629591', email: 'secretaria@escolacarlitos.com.br',
  rua: 'Avenida Angélica, 352', bairro: 'Higienópolis', cidade: 'São Paulo - SP', cep: '01228-000',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Av.+Ang%C3%A9lica,+352,+S%C3%A3o+Paulo+SP',
  facebook: 'https://www.facebook.com/escolacarlitos', instagram: 'https://www.instagram.com/escolacarlitos/', linkedin: 'https://www.linkedin.com/company/escola-carlitos',
  portal: 'https://carlitosescola152947.rm.cloudtotvs.com.br/FrameHTML/Web/App/Edu/PortalEducacional/login/',
  docentes: 'https://carlitosescola152947.rm.cloudtotvs.com.br/Corpore.Net/Login.aspx',
  calendario: 'https://www.escolacarlitos.com.br/images/calendario_2026.pdf', cardapio: 'https://www.escolacarlitos.com.br/images/cardapio_07_2026.pdf',
  regimento: 'https://www.escolacarlitos.com.br/images/regimento_escolar.pdf',
};
const cursos = [
  { slug: 'educacao-infantil', chave: 'infantil', nome: 'Educação Infantil', idade: 'A partir de 1 ano · G1 a G5', capa: 'ed_infantil_1' },
  { slug: 'fundamental-anos-iniciais', chave: 'fundamental1', nome: 'Ensino Fundamental · Anos Iniciais', curto: 'Anos Iniciais', idade: '1º ao 5º ano', capa: 'ensino_fundamental_1_3' },
  { slug: 'fundamental-anos-finais', chave: 'fundamental2', nome: 'Ensino Fundamental · Anos Finais', curto: 'Anos Finais', idade: '6º ao 9º ano', capa: 'ensino_fundamental_ii_1' },
].map(c => ({ ...c, ...C[c.chave], lema: C[c.chave].blocos[0].p }));
const vivencias = ['aprendiz-de-cinema', 'jornal-ipe-amarelo', 'passeios-educativos', 'semana-literaria', 'musica-na-primavera', 'exposicao-de-artes-plasticas', 'festa-junina', 'memorias-e-vivencias-em-higienopolis', 'festa-dos-formandos-de-ensino-fundamental', 'projetos-sociais-carlitos-1']
  .map(slug => ({ slug, ...C[slug], capa: C[slug].fotos[0] || 'slides_3' }));
const ciclos = [
  { curso: 'Educação Infantil', ciclos: [['1', 'G1, G2, G3, G4'], ['2', 'G5']] },
  { curso: 'Fundamental · Anos Iniciais', ciclos: [['2', '1º e 2º ano'], ['3', '3º, 4º e 5º ano']] },
  { curso: 'Fundamental · Anos Finais', ciclos: [['4', '6º e 7º ano'], ['5', '8º e 9º ano']] },
];
const horarios = [
  { classe: 'Grupo 1 ao 4', linhas: [['2ª a 6ª feira', '7h40 às 12h40', '13h10 às 18h10']] },
  { classe: 'Grupo 5 e 1º ao 5º ano', linhas: [['2ª, 4ª e 6ª feira', '7h40 às 12h40', '13h10 às 18h10'], ['3ª e 5ª feira', '7h40 às 16h40', '9h10 às 18h10']] },
  { classe: '6º ao 9º ano', linhas: [['2ª, 4ª e 6ª feira', '7h30 às 13h', '-'], ['3ª e 5ª feira', '7h30 às 16h30', '-']] },
];
const docs = { estudante: ['2 fotos 3x4', 'Cópia da certidão de nascimento, RG e CPF', 'Cópia da carteirinha de vacinação', 'Declaração de escolaridade', 'Histórico escolar (Ensino Fundamental)', 'Termo de quitação das mensalidades da escola anterior'], responsaveis: ['Cópia do RG e CPF', 'Comprovante de residência'] };
const anos = ['1º ano', '2º ano', '3º ano', '4º ano', '5º ano', '6º ano', '7º ano', '8º ano', '9º ano'];
const nav = [{ slug: 'escola', nome: 'A Escola' }, { slug: 'cursos', nome: 'Cursos' }, { slug: 'vivencias', nome: 'Vivências' }, { slug: 'informacoes', nome: 'Informações' }, { slug: 'ingresso', nome: 'Ingresso' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Faixa Amarela', b: 'Caderno Aberto' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Inter:wght@400;500;600&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da Escola Carlitos e gostaria de informações.') => waHref(E.wa, m);
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Educação Infantil e Ensino Fundamental em Higienópolis` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#ffed00' });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const lC = (v, c) => `/${v}/cursos/${c.slug}/`;
const lV = (v, x) => `/${v}/vivencias/${x.slug}/`;
const blocos = (bs, pular = 0) => {
  let h = '', lista = false;
  for (const b of bs.slice(pular)) {
    if (b.li && !lista) { h += '<ul class="lista-check">'; lista = true; }
    if (!b.li && lista) { h += '</ul>'; lista = false; }
    h += b.li ? `<li>${esc(b.li)}</li>` : b.h ? `<h3>${esc(b.h)}</h3>` : `<p>${esc(b.p)}</p>`;
  }
  return h + (lista ? '</ul>' : '');
};
const primeiro = x => (x.blocos.find(b => b.p) || {}).p || '';
const resumo = (t, n = 170) => t.length <= n ? t : t.slice(0, n).replace(/\s\S*$/, '') + '…';
const fotos = (lista, alt) => lista.map(f => `<a href="/assets/img/${f}.webp" data-foto>${img(f, alt)}</a>`).join('');
const tabelaHorarios = () => `<div class="tabela-rola"><table class="tabela"><thead><tr><th>Classe</th><th>Dias</th><th>Manhã</th><th>Tarde</th></tr></thead><tbody>${horarios.map(h => h.linhas.map((l, i) => `<tr>${i ? '' : `<th scope="rowgroup" rowspan="${h.linhas.length}">${h.classe}</th>`}<td>${l[0]}</td><td>${l[1]}</td><td>${l[2]}</td></tr>`).join('')).join('')}</tbody></table></div>`;
const tabelaCiclos = () => `<div class="tabela-rola"><table class="tabela"><thead><tr><th>Curso</th><th>Ciclo</th><th>Anos</th></tr></thead><tbody>${ciclos.map(c => c.ciclos.map((l, i) => `<tr>${i ? '' : `<th scope="rowgroup" rowspan="${c.ciclos.length}">${c.curso}</th>`}<td>${l[0]}</td><td>${l[1]}</td></tr>`).join('')).join('')}</tbody></table></div>`;
const formVaga = () => `<form class="form" data-wa>
  <fieldset><legend>Estudante</legend>
  <div class="form-duas"><label>Nome do estudante<input name="estudante" required></label><label>Data de nascimento<input name="nascimento" type="date" required></label></div>
  <div class="form-duas"><label>Série pretendida<select name="serie" required><option value="">Escolha</option>${['G1', 'G2', 'G3', 'G4', 'G5', ...anos].map(s => `<option>${s}</option>`).join('')}</select></label><label>Período<select name="periodo"><option>Manhã</option><option>Tarde</option></select></label></div>
  <label>Escola que frequenta<input name="escola-atual"></label></fieldset>
  <fieldset><legend>Responsável</legend>
  <div class="form-duas"><label>Nome<input name="responsavel" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>E-mail<input name="email" type="email" required autocomplete="email"></label></fieldset>
  <label>Quais motivos levaram a procurar a Escola Carlitos?<textarea name="motivos" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar solicitação de vaga</button>
</form>`;
const formContato = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
  <label>Assunto<select name="assunto"><option>Agendar visita</option><option>Informações</option><option>Trabalhe conosco</option><option>Outro</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}<br>CEP ${E.cep} · ${E.cidade}</span><a href="${E.mapa}" target="_blank" rel="noopener">Ver mapa</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" target="_blank" rel="noopener">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>Secretaria</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Escola Carlitos" loading="lazy" src="https://maps.google.com/maps?q=Av.%20Ang%C3%A9lica%2C%20352%2C%20S%C3%A3o%20Paulo%20SP&z=16&output=embed"></iframe>`;
const redes = `<a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ic('linkedin')}</a><a href="${wa()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>`;
const vida = [['vida-na-escola-educacao-infantil', 'Educação Infantil'], ['vida-na-escola-ensino-fundamental-l', 'Anos Iniciais'], ['vida-na-escola-ensino-fundamental-ll', 'Anos Finais']];
const arquivos = () => `<ul class="arquivos">
  <li><a href="${E.calendario}" target="_blank" rel="noopener">${ic('calendario')}<span><strong>Calendário 2026</strong>PDF</span></a></li>
  <li><a href="${E.cardapio}" target="_blank" rel="noopener">${ic('livro')}<span><strong>Cardápio do mês</strong>PDF</span></a></li>
  <li><a href="${E.regimento}" target="_blank" rel="noopener">${ic('escudo')}<span><strong>Regimento escolar</strong>PDF</span></a></li>
</ul>`;
const listas = () => `<ul class="listas">${anos.map((a, i) => C._listas[i] ? `<li><a href="${C._listas[i]}" target="_blank" rel="noopener">${a}</a></li>` : '').join('')}</ul>`;

function topo(v, slug) {
  if (v === 'a') return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="Escola Carlitos" width="337" height="61"></a>
    <p class="topo-acesso"><a href="${E.portal}" target="_blank" rel="noopener">Estudantes</a><a href="${E.docentes}" target="_blank" rel="noopener">Corpo docente</a><a class="topo-fone" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p>
    ${btnMenu}
  </div>
  <nav id="menu" class="menu" aria-label="Principal"><ul class="in">${menuItens(v, nav, slug)}</ul></nav>
</header>
<main id="conteudo">
`;
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="Escola Carlitos" width="337" height="61"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'ingresso')}">Agendar visita</a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Escola Carlitos" width="337" height="61" loading="lazy"><p>Educação Infantil e Ensino Fundamental em Higienópolis desde 1980.</p><p class="rod-redes">${redes}</p></div>
    <div><h3>A Escola</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Acesso</h3><ul><li><a href="${E.portal}" target="_blank" rel="noopener">Estudantes</a></li><li><a href="${E.docentes}" target="_blank" rel="noopener">Corpo docente</a></li><li><a href="https://mail.google.com/" target="_blank" rel="noopener">Webmail</a></li></ul></div>
    <div><h3>Endereço</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.rua}<br>CEP ${E.cep} · ${E.cidade}</span></li><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Escola Carlitos. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

function paginaCurso(v, c) {
  const lado = `<aside class="curso-lado"><dl class="ficha"><div><dt>Idade</dt><dd>${c.idade}</dd></div><div><dt>Períodos</dt><dd>Manhã ou tarde</dd></div></dl><div class="curso-fotos">${fotos(c.fotos, c.nome)}</div><a class="btn" href="${link(v, 'ingresso')}">Solicitar vaga</a></aside>`;
  const corpo = `<div class="curso-corpo"><div class="curso-txt">${blocos(c.blocos, 1)}</div>${lado}</div>`;
  const outros = `<section class="outros-cursos"><h2>Outros cursos</h2><ul>${cursos.filter(o => o.slug !== c.slug).map(o => `<li><a href="${lC(v, o)}">${img(o.capa, o.nome)}<span><strong>${o.nome}</strong>${o.idade}</span></a></li>`).join('')}</ul></section>`;
  const t = head(v, 'cursos', c.nome, `${c.nome} na Escola Carlitos: ${c.lema}`) + topo(v, 'cursos');
  if (v === 'a') return t + `<div class="in"><p class="trilha"><a href="${link(v, 'cursos')}">Cursos</a> / ${c.nome}</p><header class="tit-a"><h1>${c.nome}</h1><p class="lema">${c.lema}</p></header>${corpo}${outros}</div>` + rodape(v);
  return t + `<section class="pag-b-topo"><div class="in pag-b-topo-in"><div><p class="k"><a href="${link(v, 'cursos')}">Cursos</a> · ${c.idade}</p><h1>${c.nome}</h1><p class="lema">${c.lema}</p></div>${img(c.capa, c.nome, ' loading="eager"')}</div></section><div class="in">${corpo}${outros}</div>` + rodape(v);
}
function paginaVivencia(v, x) {
  const outras = vivencias.filter(o => o.slug !== x.slug).slice(0, 4);
  const t = head(v, 'vivencias', x.titulo, resumo(primeiro(x), 155)) + topo(v, 'vivencias');
  const corpo = `<div class="viv-corpo"><div class="viv-txt">${blocos(x.blocos)}</div>${x.fotos.length ? `<div class="viv-fotos">${fotos(x.fotos, x.titulo)}</div>` : ''}</div>
<section class="outras-viv"><h2>Outras vivências</h2><ul>${outras.map(o => `<li><a href="${lV(v, o)}">${img(o.capa, o.titulo)}<span>${o.titulo}</span></a></li>`).join('')}</ul></section>`;
  if (v === 'a') return t + `<div class="in"><p class="trilha"><a href="${link(v, 'vivencias')}">Vivências</a> / ${x.titulo}</p><header class="tit-a"><h1>${x.titulo}</h1></header>${corpo}</div>` + rodape(v);
  return t + `<section class="pag-b-topo pag-b-topo-simples"><div class="in"><p class="k"><a href="${link(v, 'vivencias')}">Vivências</a></p><h1>${x.titulo}</h1></div></section><div class="in">${corpo}</div>` + rodape(v);
}

function comum(v, pag, cab) {
  pag.escola = head(v, 'escola', 'A Escola', resumo(C['apresentacao-e-historico'].blocos[0].p, 155)) + topo(v, 'escola') + cab('A Escola', 'Desde 1980 em Higienópolis', 'slides_1') + `
<div class="in"><section class="texto-pag"><div class="texto-col">${blocos(C['apresentacao-e-historico'].blocos)}</div><aside class="destaque-lado"><b>1980</b><p>Início das atividades na região de Higienópolis.</p><b>1 a 14 anos</b><p>Da Educação Infantil ao 9º ano.</p><b>3 línguas</b><p>Espanhol, francês e inglês desde os Anos Iniciais.</p><a class="link-seta" href="${E.regimento}" target="_blank" rel="noopener">Regimento escolar ${ic('seta')}</a></aside></section>
<section class="ideario" id="ideario"><h2>Ideário da prática educativa</h2><p class="lead">${C['ideario-da-pratica-educativa'].blocos[0].p}</p><div class="ideario-grade">${(() => { const out = []; let cur = null; for (const b of C['ideario-da-pratica-educativa'].blocos.slice(1)) { if (b.h) { cur = { h: b.h, ps: [] }; out.push(cur); } else if (cur) cur.ps.push(b.p || b.li); } return out.map((o, i) => `<article class="sobe"><span>${String(i + 1).padStart(2, '0')}</span><h3>${o.h}</h3>${o.ps.map(p => `<p>${p}</p>`).join('')}</article>`).join(''); })()}</div></section></div>
` + rodape(v);
  for (const c of cursos) pag[`cursos/${c.slug}`] = paginaCurso(v, c);
  for (const x of vivencias) pag[`vivencias/${x.slug}`] = paginaVivencia(v, x);

  pag.informacoes = head(v, 'informacoes', 'Informações', 'Vida na escola, calendário, cardápio do mês e listas de materiais da Escola Carlitos.') + topo(v, 'informacoes') + cab('Informações', 'Vida na escola', 'ed_infantil_3') + `
<div class="in"><section class="info-arq"><h2>Para as famílias</h2>${arquivos()}</section>
<section class="vida">${vida.map(([k, n]) => `<article><p class="k">${n}</p><h2>${C[k].titulo}</h2>${blocos(C[k].blocos)}</article>`).join('')}</section>
<section class="info-listas"><h2>Listas de materiais 2026</h2>${listas()}<p class="nota">Horário de funcionamento da secretaria: segunda a sexta-feira, das 7h45 às 13h45.</p></section></div>
` + rodape(v);

  pag.ingresso = head(v, 'ingresso', 'Ingresso', 'Matrículas o ano todo, a partir de 1 ano de idade. Agende uma visita à Escola Carlitos.') + topo(v, 'ingresso') + cab('Ingresso', 'Venha visitar a Escola', 'passeios_educativos1') + `
<div class="in"><section class="ingresso">
  <div class="ingresso-txt">
    <p>A Escola Carlitos recebe estudantes a partir de 1 ano de idade completo. As matrículas podem ser feitas durante todo o ano, desde que existam vagas para a série pretendida.</p>
    <p>A inscrição é feita pela ficha de solicitação de vaga, preenchida pela(o) responsável pessoalmente na secretaria ou aqui pelo site.</p>
    <p>No dia marcado, a família é acompanhada por uma orientadora educacional e pedagógica, que apresenta os principais pontos da proposta educacional e o espaço físico da Escola. As visitas são individuais ou em grupo, com até duas pessoas por estudante, e os responsáveis vêm sem as crianças. Agende por telefone, <a href="${telHref(E.fone)}">${E.fone}</a>, ou pelo e-mail <a href="mailto:${E.email}">${E.email}</a>.</p>
    <h2>Reserva de vagas e matrículas</h2><p>As reservas de vagas podem ser efetivadas na secretaria da Escola, logo após a visita.</p>
    <h2>Horários</h2>${tabelaHorarios()}
    <h2>Desconto</h2><p>A Escola concede 20% de desconto para a(o) segunda(o) irmã(o) de estudante, a partir da(o) terceira(o) filha(o).</p>
    <h2>Documentos para matrícula</h2><div class="docs-duas"><div><h3>Estudante</h3><ul class="lista-check">${docs.estudante.map(d => `<li>${d}</li>`).join('')}</ul></div><div><h3>Responsáveis legais</h3><ul class="lista-check">${docs.responsaveis.map(d => `<li>${d}</li>`).join('')}</ul></div></div>
  </div>
  <div class="ingresso-form"><h2>Solicitação de vaga</h2>${formVaga()}</div>
</section></div>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Escola Carlitos: ${E.rua}, ${E.bairro}, ${E.cidade}. Telefone ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a secretaria', 'memorias_higienopolis_1') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Envie sua mensagem</h2>${formContato()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (t, sub) => `<div class="in"><header class="tit-a"><h1>${t}</h1>${sub ? `<p class="lema">${sub}</p>` : ''}</header></div>`;
  pag.index = head(v, 'index', '', resumo(C['apresentacao-e-historico'].blocos[0].p, 155)) + topo(v, 'index') + `
<div class="in palco">
  <section class="banner-a" data-carrossel aria-label="Fotos da escola">
    ${['slides_2', 'slides_1', 'slides_3'].map((s, i) => `<div class="slide${i ? '' : ' ativo'}">${img(s, 'Estudantes da Escola Carlitos', i ? '' : ' loading="eager" fetchpriority="high"')}</div>`).join('')}
    <button class="car-ant" data-ant aria-label="Anterior">${ic('seta')}</button><button class="car-prox" data-prox aria-label="Próximo">${ic('seta')}</button>
  </section>
  <nav class="cursos-a" aria-label="Cursos">${cursos.map(c => `<a href="${lC(v, c)}">${c.nome.replace('Ensino Fundamental · ', 'Ensino Fundamental - ')}</a>`).join('')}</nav>
</div>
<section class="in lemas-a">${cursos.map(c => `<article class="sobe"><a href="${lC(v, c)}">${img(c.capa, c.nome)}</a><h2>${c.nome}</h2><p>${c.lema}</p><a class="link-seta" href="${lC(v, c)}">Saiba mais ${ic('seta')}</a></article>`).join('')}</section>
<section class="in sobre-a"><div><h2>Apresentação e histórico</h2><p>${C['apresentacao-e-historico'].blocos[0].p}</p><a class="link-seta" href="${link(v, 'escola')}">Conheça a Escola ${ic('seta')}</a></div>${img('ipe_amarelo_1', 'Alunos lendo o jornal Ipê Amarelo')}</section>
<section class="viv-a"><div class="in"><h2>Vivências</h2><ul>${vivencias.slice(0, 6).map(x => `<li class="sobe"><a href="${lV(v, x)}">${img(x.capa, x.titulo)}<span>${x.titulo}</span></a></li>`).join('')}</ul><p class="centro"><a class="btn" href="${link(v, 'vivencias')}">Todas as vivências</a></p></div></section>
<section class="in visita-a"><div><h2>Venha visitar a Escola</h2><p>Matrículas durante todo o ano, a partir de 1 ano de idade, conforme as vagas.</p></div><a class="btn" href="${link(v, 'ingresso')}">Agendar visita</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></section>
` + rodape(v);

  pag.cursos = head(v, 'cursos', 'Cursos e ciclos', resumo(C['componentes-curriculares'].blocos[0].p, 155)) + topo(v, 'cursos') + cab('Cursos e ciclos', 'Estudantes de um a quatorze anos, aproximadamente.') + `
<div class="in"><section class="cursos-pag">${cursos.map(c => `<article><a href="${lC(v, c)}">${img(c.capa, c.nome)}</a><div><h2><a href="${lC(v, c)}">${c.nome}</a></h2><p class="idade">${c.idade}</p><p>${c.lema}</p><a class="link-seta" href="${lC(v, c)}">Saiba mais ${ic('seta')}</a></div></article>`).join('')}</section>
<section class="caixa"><h2>Cursos e ciclos</h2><p>Assim como acontece nacionalmente, a prática está organizada em séries anuais. Os anos compõem ciclos, interligados pelo projeto pedagógico, que levam em conta as especificidades curriculares de cada faixa etária.</p>${tabelaCiclos()}</section>
<section class="caixa"><h2>Componentes curriculares</h2>${blocos(C['componentes-curriculares'].blocos)}</section></div>
` + rodape(v);

  pag.vivencias = head(v, 'vivencias', 'Vivências', 'Cinema, jornal, passeios, literatura, música e artes: as vivências da Escola Carlitos.') + topo(v, 'vivencias') + cab('Vivências', 'Aprender fora da sala também.') + `
<div class="in"><ul class="viv-grade">${vivencias.map(x => `<li class="sobe"><a href="${lV(v, x)}">${img(x.capa, x.titulo)}<div><strong>${x.titulo}</strong><span>${resumo(primeiro(x), 120)}</span></div></a></li>`).join('')}</ul></div>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="pag-b-topo"><div class="in pag-b-topo-in"><div><p class="k">${k}</p><h1>${t}</h1></div>${img(foto, '', ' loading="eager"')}</div></section>`;
  pag.index = head(v, 'index', '', resumo(C['apresentacao-e-historico'].blocos[0].p, 155)) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Higienópolis · desde 1980</p><h1>Uma escola onde o saber acontece <em>junto</em></h1><p>Educação Infantil e Ensino Fundamental num ambiente muito mais solidário que competitivo, com espanhol, francês e inglês desde os primeiros anos.</p><p class="bts"><a class="btn" href="${link(v, 'ingresso')}">Agendar visita</a><a class="btn btn-linha" href="${link(v, 'escola')}">Conheça a Escola</a></p></div>
  <div class="hero-b-fotos"><span class="sol" aria-hidden="true"></span>${img('ed_infantil_1', 'Crianças da Educação Infantil no pátio', ' loading="eager" fetchpriority="high"')}${img('ensino_fundamental_ii_1', 'Aula de ciências dos Anos Finais', ' loading="eager"')}${img('ipe_amarelo_2', 'Roda de leitura', ' loading="eager"')}</div>
</div></section>
<section class="in cursos-b"><header class="tit-b"><p class="k">Cursos</p><h2>Do primeiro ano de vida ao 9º ano</h2></header><div class="cursos-b-grade">${cursos.map((c, i) => `<a class="sobe" href="${lC(v, c)}"><figure>${img(c.capa, c.nome)}</figure><small>${c.idade}</small><h3>${c.curto || c.nome}</h3><p>${c.lema}</p><span class="link-seta">Saiba mais ${ic('seta')}</span></a>`).join('')}</div></section>
<section class="chaplin-b"><div class="in chaplin-b-in"><span class="sol" aria-hidden="true"></span><div><p class="k">Por que Carlitos</p><blockquote>${C['apresentacao-e-historico'].blocos[2].p.split(' – ')[0].replace(/^É Carlitos, no mundo da arte, o personagem que mais retrata, pela imagem em movimento, /, 'Carlitos, o personagem de Chaplin, retrata ')}.</blockquote><p>Liberdade, igualdade, respeito, solidariedade e responsabilidade são os alicerces do Projeto Educacional da Escola Carlitos.</p><a class="link-seta" href="${link(v, 'escola')}">Apresentação e histórico ${ic('seta')}</a></div></div></section>
<section class="in viv-b"><header class="tit-b"><p class="k">Vivências</p><h2>Cinema, jornal, passeios e muita leitura</h2></header><ul class="viv-b-mosaico">${vivencias.slice(0, 5).map(x => `<li class="sobe"><a href="${lV(v, x)}">${img(x.capa, x.titulo)}<span>${x.titulo}</span></a></li>`).join('')}</ul><a class="link-seta" href="${link(v, 'vivencias')}">Ver todas as vivências ${ic('seta')}</a></section>
<section class="visita-b"><div class="in visita-b-in"><div><p class="k">Ingresso</p><h2>Venha visitar a Escola</h2><p>Matrículas o ano todo, a partir de 1 ano de idade. A visita é com uma orientadora educacional e pedagógica.</p></div><div class="bts"><a class="btn" href="${link(v, 'ingresso')}">Solicitar vaga</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></div></div></section>
` + rodape(v);

  pag.cursos = head(v, 'cursos', 'Cursos e ciclos', resumo(C['componentes-curriculares'].blocos[0].p, 155)) + topo(v, 'cursos') + cab('Cursos e ciclos', 'De um a quatorze anos, em cinco ciclos', 'lingua_portuguesa_2') + `
<div class="in"><section class="cursos-b cursos-b-pag"><div class="cursos-b-grade">${cursos.map(c => `<a href="${lC(v, c)}"><figure>${img(c.capa, c.nome)}</figure><small>${c.idade}</small><h3>${c.curto || c.nome}</h3><p>${c.lema}</p><span class="link-seta">Saiba mais ${ic('seta')}</span></a>`).join('')}</div></section>
<section class="duas-b"><div><h2>Cursos e ciclos</h2><p>A prática está organizada em séries anuais. Os anos compõem ciclos, interligados pelo projeto pedagógico, que levam em conta as especificidades de cada faixa etária.</p>${tabelaCiclos()}</div><div><h2>Componentes curriculares</h2>${blocos(C['componentes-curriculares'].blocos)}</div></section></div>
` + rodape(v);

  pag.vivencias = head(v, 'vivencias', 'Vivências', 'Cinema, jornal, passeios, literatura, música e artes: as vivências da Escola Carlitos.') + topo(v, 'vivencias') + cab('Vivências', 'Aprender fora da sala também', 'camera_claquete_ac') + `
<div class="in"><ul class="viv-grade">${vivencias.map(x => `<li class="sobe"><a href="${lV(v, x)}">${img(x.capa, x.titulo)}<div><strong>${x.titulo}</strong><span>${resumo(primeiro(x), 120)}</span></div></a></li>`).join('')}</ul></div>
` + rodape(v);
  comum(v, pag, (k, t, foto) => cab(k, t, foto));
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#e8c800', fundo: '#2f2f2f', claro: '#fbf8ef',
  fonteTitulo: "'Tenor Sans',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6 + cursos.length + vivencias.length, texto: 'Fiel ao site atual: logo no topo branco, a barra cinza-escura entre faixas amarelas, as fotos em destaque e os três cursos logo abaixo, agora com textos, vivências e ingresso organizados.', pontos: ['Uma página para cada curso e cada vivência', 'Horários, documentos e ficha de vaga no Ingresso', 'Calendário, cardápio e listas de materiais'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6 + cursos.length + vivencias.length, texto: 'Mais moderna e editorial: o círculo amarelo do logo como marca, fotos grandes das crianças, a história do nome Carlitos e as vivências em mosaico.', pontos: ['Desde 1980 em Higienópolis logo na abertura', 'Os três cursos com o lema de cada um', 'Botão de agendar visita em todas as páginas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: false },
});
