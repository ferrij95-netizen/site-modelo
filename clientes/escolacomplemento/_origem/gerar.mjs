// Escola Técnica Complemento (ETC), Niterói/RJ. Gera public/{a,b}/ e a página de escolha.
// node clientes/escolacomplemento/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs escolacomplemento https://www.escolatecnicacomplemento.com.br/)
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const E = {
  nome: 'Escola Técnica Complemento', sigla: 'ETC', url: 'https://escolacomplemento.overtus.com.br/', antigo: 'https://www.escolatecnicacomplemento.com.br/',
  wa: '5521970327590', fones: ['(21) 3604-8771', '(21) 97032-7590'], email: 'atendimento@escolatecnicacomplemento.com.br',
  rua: 'Alameda São Boaventura, 51', bairro: 'Fonseca', cidade: 'Niterói - RJ', cep: '24130-005',
  facebook: 'https://www.facebook.com/pages/ETC-Escola-T%C3%A9cnica-Complemento/254261514618741',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Alameda+S%C3%A3o+Boaventura,+51,+Fonseca,+Niter%C3%B3i+RJ',
  sobre: 'A Escola Técnica Complemento foi contemplada com aprovação unânime pelo Conselho Estadual de Educação nos cursos que oferece, como Prótese Dentária, Radiologia, Enfermagem, Análises Clínicas, Segurança do Trabalho e Secretariado Escolar.',
  sobre2: 'Tem em sua ambiência a excelência necessária ao conforto e ao aprendizado que os equipamentos simuladores e os laboratórios completos podem proporcionar. Forma e viabiliza o ingresso de profissionais no mercado de forma inovadora, com profissionais altamente qualificados.',
  sobre3: 'Criada em 2008, a ETC desenvolve suas atividades voltadas à educação profissional, com um olhar de omnilateralidade e politecnia no processo formador. O curso propõe encaminhamento de estágio na área da saúde, com aulas práticas em seus laboratórios e aulas teóricas. O profissional se especializa mais rápido e com custo-benefício mais atraente.',
  compromisso: 'Tem como compromisso maior a Educação Profissional em Saúde, em nível técnico.',
};
const cursos = [
  { slug: 'radiologia', nome: 'Técnico em Radiologia', curto: 'Radiologia', foto: 'curso-radiologia', lab: 'lab-radiologia', icone: 'escudo', resumo: 'Atua em hospitais, clínicas e centros de diagnóstico por imagem.', texto: 'Desempenha atividades em hospitais, clínicas e outros estabelecimentos de assistência médica, embarcações e domicílios, atuando em cirurgia, terapia, puericultura, pediatria, psiquiatria, obstetrícia, saúde ocupacional, entre outras de extrema responsabilidade.' },
  { slug: 'enfermagem', nome: 'Técnico em Enfermagem', curto: 'Enfermagem', foto: 'curso-enfermagem', lab: 'lab-enfermagem', icone: 'coracao', resumo: 'Assistência de enfermagem segura e humanizada, sob supervisão do enfermeiro.', texto: 'Presta assistência de enfermagem segura, humanizada e individualizada aos clientes, sob supervisão do enfermeiro. Orienta e auxilia clientes com informações de higiene, alimentação, uso de medicamentos e cuidados em tratamento de saúde. Controla materiais, equipamentos e medicamentos e executa limpeza, desinfecção e esterilização de materiais.' },
  { slug: 'protese-dentaria', nome: 'Técnico em Prótese Dentária', curto: 'Prótese Dentária', foto: 'curso-protese', lab: 'lab-protese', icone: 'dente', resumo: 'Confecção de próteses odontológicas, em parceria com o dentista.', texto: 'Profissional da área da saúde responsável pela confecção de próteses odontológicas, cooperando com o trabalho do odontólogo na recuperação da integridade dentária do paciente. Via de regra, o Técnico em Prótese Dentária trabalha de forma autônoma.' },
  { slug: 'analises-clinicas', nome: 'Técnico em Análises Clínicas', curto: 'Análises Clínicas', foto: 'curso-analises', lab: 'lab-sala', icone: 'gota', resumo: 'Análise de sangue, urina e outros fluidos para apoiar o diagnóstico médico.', texto: 'Auxilia os médicos de diversas especialidades no diagnóstico e acompanhamento clínico de estados de saúde e doença, por meio da análise de fezes, urina, sangue e outros fluidos orgânicos, como líquor, líquido sinovial, líquido ascítico e fluido seminal.' },
];
const outros = ['Segurança do Trabalho', 'Secretariado Escolar'];
const livre = { nome: 'Curso livre de Cerâmica e Cerômero', texto: 'Os cursos livres especializam e ampliam o aluno ou profissional em suas carreiras.' };
const documentos = ['Certidão de Nascimento ou Casamento (cópia)', 'Comprovante de residência atual (cópia)', 'Certificado e Histórico Escolar do Ensino Médio ou Superior (original e cópia)', 'RG, CPF e Título de Eleitor (cópias)', '1 foto 3x4', 'Atestado de Sanidade Física e Mental', 'Certificado de Reservista (cópia)'];
const premios = [
  ['2023-quality-educacao', 'Prêmio Quality Educação', '2023'], ['2022-quality-mercosul', 'Prêmio Quality Mercosul', '2022'], ['2021-awards', 'Quality Awards', '2021'],
  ['2020-quality', 'Premiação Quality', '2020'], ['2019-quality', 'Premiação Quality', '2019'], ['2018-quality', 'Premiação Quality', '2018'],
  ['2017-quality', 'Premiação Quality', '2017'], ['2016-quality-diamante', 'Quality Diamante', '2016'], ['2015-platinum', 'Quality Platinum', '2015'],
  ['2015-top-business', 'Top Brazil Quality e Top Empreendedor', '2015'], ['2014-top-business', 'Top of Business Nacional', '2014'], ['2013-top-qualidade', 'Top Qualidade Brasil', '2013'],
];
const premiosTexto = ['Top Empreendedor 2012', 'Top Qualidade Brasil 2013', 'Top of Business Nacional 2013 e 2014', 'Quality Brasil 2014', 'Top Brazil Quality 2015', 'Top Empreendedor 2015', 'Quality Platinum 2015', 'Quality Diamante 2016', 'Quality 2017, 2018, 2019 e 2020', 'Quality Awards 2021', 'Quality Mercosul 2022', 'Quality Educação 2023'];
const nav = [
  { slug: 'index', nome: 'Principal' }, { slug: 'sobre', nome: 'Sobre a ETC' }, { slug: 'cursos', nome: 'Cursos' },
  { slug: 'matriculas', nome: 'Matrículas' }, { slug: 'contato', nome: 'Contato' },
];
export const nomesVersao = { a: 'Azul ETC', b: 'Laboratório' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,600;0,800;1,800&family=Inter:wght@400;500;600&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da ETC e quero informações sobre os cursos técnicos.') => waHref(E.wa, m);
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: v === 'a' ? '#1d5a93' : '#ffffff' });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const marca = v => `<a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img class="marca-logo" src="/assets/logo-etc.webp" alt="" width="600" height="524"><span class="marca-txt"><img src="/assets/nome-etc.webp" alt="${E.nome}" width="1200" height="102"><small>Cursos técnicos em saúde · Niterói</small></span></a>`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'matriculas')}">Pré-matrícula</a>
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
    <div class="rod-marca"><img src="/assets/logo-etc.webp" alt="" width="600" height="524" loading="lazy"><p><strong>${E.nome}</strong>Educação profissional em saúde desde 2008. Cursos aprovados pelo Conselho Estadual de Educação.</p></div>
    <div><h3>Cursos</h3><ul>${cursos.map(c => `<li><a href="${link(v, 'cursos')}#${c.slug}">${c.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<span>${E.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join('<br>')}</span></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro} · ${E.cidade} · ${E.cep}</span></li>
      <li>${ic('face')}<a href="${E.facebook}" target="_blank" rel="noopener">Facebook da ETC</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ETC · Escola Técnica Complemento</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const formulario = () => `<form class="form" data-wa="Olá! Quero fazer a pré-matrícula na Escola Técnica Complemento.">
  <label>Nome completo *<input name="nome" required autocomplete="name"></label>
  <div class="form-duas"><label>Telefone / WhatsApp *<input name="telefone" required inputmode="tel" autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <label>Curso de interesse *<select name="curso" required>${cursos.map(c => `<option>${c.nome}</option>`).join('')}${outros.map(o => `<option>Técnico em ${o}</option>`).join('')}<option>${livre.nome}</option></select></label>
  <div class="form-duas"><label>Escolaridade<select name="escolaridade"><option>Ensino Médio completo</option><option>Cursando o Ensino Médio</option><option>Ensino Superior</option></select></label><label>Turno preferido<select name="turno"><option>Manhã</option><option>Tarde</option><option>Noite</option><option>Sábado</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pré-matrícula</button>
  <p class="form-nota">Os dados chegam pelo WhatsApp da secretaria, que confirma vagas, turnos e valores.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefones</strong>${E.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join('')}</div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" target="_blank" rel="noopener">${E.fones[1]}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}<br>${E.cidade} · CEP ${E.cep}</span><a href="${E.mapa}" target="_blank" rel="noopener">Como chegar ${ic('ext')}</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Escola Técnica Complemento" loading="lazy" src="https://maps.google.com/maps?q=Alameda%20S%C3%A3o%20Boaventura%2C%2051%2C%20Fonseca%2C%20Niter%C3%B3i&z=15&output=embed"></iframe>`;
const docsLista = () => `<ol class="docs">${documentos.map(d => `<li>${ic('check')}<span>${d}</span></li>`).join('')}</ol>`;
const premiosGrade = (cls, lista = premios) => `<div class="${cls}">${lista.map(([f, t, a]) => `<a href="/assets/premios/${f}.webp" data-foto="${esc(`${t} ${a}`)}"><img src="/assets/premios/${f}.webp" alt="${esc(`${t} ${a}`)}" loading="lazy"><span><b>${a}</b>${t}</span></a>`).join('')}</div>`;

// ---------- Versão A: Azul ETC (fiel: fundo azul, logo e nome no topo, os 4 cursos com foto) ----------
function A() {
  const v = 'a';
  const pag = {};
  const faixa = (t, sub = '') => `<section class="faixa-a"><div class="in"><h1>${t}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;
  const cursosGrade = `<ul class="cursos-a">${cursos.map(c => `<li><a href="${link(v, 'cursos')}#${c.slug}">${img(c.foto, c.nome)}<span class="cursos-a-nome">${c.nome}</span><span class="cursos-a-mais">Conhecer o curso ${ic('seta')}</span></a></li>`).join('')}</ul>`;
  pag.index = head(v, 'index', 'Cursos técnicos em saúde em Niterói', E.sobre) + topo(v, 'index') + `
<section class="hero-a">
  <div class="in hero-a-in">
    <div>
      <p class="selo-a"><b>17</b> anos formando técnicos</p>
      <h1>Cursos técnicos em saúde</h1>
      <p>Radiologia, Enfermagem, Prótese Dentária e Análises Clínicas, com aulas práticas em laboratórios completos e encaminhamento de estágio.</p>
      <div class="bts"><a class="btn" href="${link(v, 'matriculas')}">Fazer pré-matrícula</a><a class="btn btn-linha" href="${wa()}" target="_blank" rel="noopener">${icWa()}Falar no WhatsApp</a></div>
    </div>
    <figure class="hero-a-foto">${img('alunos', 'Alunos da Escola Técnica Complemento', ' loading="eager" fetchpriority="high"')}</figure>
  </div>
</section>
<section class="sec-a">
  <div class="in"><header class="tit-a"><h2>Nossos cursos técnicos</h2><p>Aprovados por unanimidade pelo Conselho Estadual de Educação.</p></header>${cursosGrade}</div>
</section>
<section class="sec-a claro">
  <div class="in duas-a">
    <figure class="lab-mosaico">${img('lab-protese', 'Laboratório da ETC')}${img('lab-radiologia', 'Sala de radiologia da ETC')}${img('lab-sala', 'Laboratórios da ETC')}</figure>
    <div><h2>Laboratórios completos e simuladores</h2><p>${E.sobre2}</p><ul class="lista-check">${['Aulas práticas em laboratório e aulas teóricas', 'Encaminhamento de estágio na área da saúde', 'Especialização mais rápida, com custo-benefício atraente'].map(t => `<li>${ic('check')}${t}</li>`).join('')}</ul><a class="link-seta" href="${link(v, 'sobre')}">Sobre a ETC ${ic('seta')}</a></div>
  </div>
</section>
<section class="sec-a premios-a">
  <div class="in"><header class="tit-a"><h2>Escola premiada</h2><p>Reconhecimentos nacionais e internacionais de qualidade em educação desde 2012.</p></header>${premiosGrade('premios-faixa', premios.slice(0, 4))}<p class="centro"><a class="btn btn-linha" href="${link(v, 'sobre')}#premios">Ver todos os prêmios</a></p></div>
</section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Matrículas abertas</h2><p>Faça sua pré-matrícula e a secretaria entra em contato.</p></div><a class="btn" href="${link(v, 'matriculas')}">Pré-matrícula ${ic('seta')}</a></div></section>
` + rodape(v);

  pag.sobre = head(v, 'sobre', 'Sobre a ETC', E.sobre) + topo(v, 'sobre') + faixa('Sobre a ETC', E.compromisso) + `
<section class="sec-a claro"><div class="in duas-a">
  <div><h2>Educação profissional em saúde desde 2008</h2><p>${E.sobre}</p><p>${E.sobre2}</p><p>${E.sobre3}</p></div>
  <figure class="sobre-foto">${img('lab-sala', 'Laboratórios da Escola Técnica Complemento')}</figure>
</div></section>
<section class="sec-a" id="premios"><div class="in"><header class="tit-a"><h2>Prêmios e reconhecimentos</h2><p>Recebidos pelas diretoras Patrícia Vasconcellos, Marleth Oliveira e Patricia Kramm.</p></header>${premiosGrade('premios-grade')}</div></section>
` + rodape(v);

  pag.cursos = head(v, 'cursos', 'Cursos técnicos', 'Técnico em Radiologia, Enfermagem, Prótese Dentária e Análises Clínicas em Niterói.') + topo(v, 'cursos') + faixa('Sobre os cursos', 'Cursos técnicos em saúde com aulas práticas em laboratório.') + `
${cursos.map((c, i) => `<section id="${c.slug}" class="curso-a${i % 2 ? ' inv' : ''}"><div class="in curso-a-in">
  <figure>${img(c.foto, c.nome)}</figure>
  <div><span class="curso-a-n">0${i + 1}</span><h2>${c.nome}</h2><p>${c.texto}</p><a class="btn" href="${wa(`Olá! Quero informações sobre o curso ${c.nome}.`)}" target="_blank" rel="noopener">${icWa()}Quero saber mais</a></div>
</div></section>`).join('')}
<section class="sec-a claro"><div class="in duas-a outros-a">
  <div><h2>Outros cursos técnicos</h2><ul class="lista-check">${outros.map(o => `<li>${ic('check')}Técnico em ${o}</li>`).join('')}</ul></div>
  <div class="livre-a">${img('protese-ceramica', 'Peças em cerâmica')}<div><h3>${livre.nome}</h3><p>${livre.texto}</p></div></div>
</div></section>
` + rodape(v);

  pag.matriculas = head(v, 'matriculas', 'Matrículas', 'Pré-matrícula e documentos para matrícula na Escola Técnica Complemento.') + topo(v, 'matriculas') + faixa('Cursos e matrículas', 'Inscrição da pré-matrícula e documentos necessários.') + `
<section class="sec-a claro"><div class="in duas-a">
  <div class="caixa-form"><h2>Inscrição da pré-matrícula</h2>${formulario()}</div>
  <div><h2>Documentos para matrícula</h2>${docsLista()}</div>
</div></section>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Fale com a ETC: ${E.fones.join(', ')}. ${E.rua}, ${E.bairro}, ${E.cidade}.`) + topo(v, 'contato') + faixa('Contato') + `
<section class="sec-a claro"><div class="in duas-a"><div>${contatoLista()}</div><div>${mapaFrame}</div></div></section>
` + rodape(v);
  return pag;
}

// ---------- Versão B: Laboratório (clara, azul e laranja do logo, foco nas aulas práticas) ----------
function B() {
  const v = 'b';
  const pag = {};
  const sub = (k, h, p) => `<section class="sub-b"><div class="in"><p class="k">${k}</p><h1>${h}</h1>${p ? `<p>${p}</p>` : ''}</div></section>`;
  const trilha = `<section class="trilha-b"><div class="in">
  <header class="tit-b"><p class="k">Do primeiro dia ao mercado</p><h2>Como é a formação na ETC</h2></header>
  <ol class="trilha">${[
    ['capelo', 'Pré-matrícula', 'Escolha o curso e envie seus dados. A secretaria confirma turma e documentos.'],
    ['livro', 'Aulas teóricas', 'Conteúdo técnico com professores da área da saúde.'],
    ['engrenagem', 'Laboratório', 'Aulas práticas com equipamentos simuladores e laboratórios completos.'],
    ['usuarios', 'Estágio', 'Encaminhamento de estágio na área da saúde.'],
    ['estrela', 'Mercado', 'Diploma técnico reconhecido e preparo para atuar.'],
  ].map(([i, t, d], n) => `<li class="sobe"><span class="trilha-ic">${ic(i)}</span><b>${String(n + 1).padStart(2, '0')}</b><strong>${t}</strong><p>${d}</p></li>`).join('')}</ol>
</div></section>`;

  pag.index = head(v, 'index', 'Cursos técnicos em saúde em Niterói', E.sobre) + topo(v, 'index') + `
<section class="hero-b">
  <div class="in hero-b-in">
    <div class="hero-b-txt">
      <p class="k">Niterói · desde 2008</p>
      <h1>Aprenda na prática. Saia pronto para a saúde.</h1>
      <p>Cursos técnicos em Radiologia, Enfermagem, Prótese Dentária e Análises Clínicas, aprovados pelo Conselho Estadual de Educação.</p>
      <div class="bts"><a class="btn" href="${link(v, 'matriculas')}">Pré-matrícula</a><a class="btn btn-linha" href="${link(v, 'cursos')}">Ver os cursos ${ic('seta')}</a></div>
    </div>
    <div class="hero-b-fotos">${img('lab-protese', 'Laboratório da ETC', ' loading="eager"')}${img('curso-enfermagem', 'Técnica em enfermagem')}<p class="hero-b-selo"><b>17</b>anos de ETC</p></div>
  </div>
</section>
<section class="cursos-b"><div class="in">
  <header class="tit-b linha"><div><p class="k">Cursos técnicos</p><h2>Escolha sua área</h2></div><a class="link-seta" href="${link(v, 'cursos')}">Detalhes dos cursos ${ic('seta')}</a></header>
  <ol class="cursos-b-lista">${cursos.map((c, i) => `<li class="sobe"><a href="${link(v, 'cursos')}#${c.slug}"><span class="cb-n">0${i + 1}</span><span class="cb-ic">${ic(c.icone)}</span><strong>${c.curto}</strong><span class="cb-t">${c.resumo}</span>${img(c.foto, c.nome)}</a></li>`).join('')}</ol>
</div></section>
${trilha}
<section class="premios-b"><div class="in premios-b-in">
  <div><p class="k">Reconhecimento</p><h2>Mais de dez prêmios de qualidade em educação</h2><ul class="anos">${premiosTexto.slice(-6).reverse().map(p => `<li>${p}</li>`).join('')}</ul><a class="link-seta" href="${link(v, 'sobre')}#premios">Todos os prêmios ${ic('seta')}</a></div>
  ${premiosGrade('premios-b-fotos', premios.slice(0, 3))}
</div></section>
<section class="cta-b"><div class="in cta-b-in"><h2>Garanta sua vaga na próxima turma</h2><div class="bts"><a class="btn" href="${link(v, 'matriculas')}">Pré-matrícula</a><a class="btn btn-linha" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a></div></div></section>
` + rodape(v);

  pag.sobre = head(v, 'sobre', 'Sobre a ETC', E.sobre) + topo(v, 'sobre') + sub('Sobre a ETC', 'Educação profissional em saúde, em nível técnico', E.compromisso) + `
<section class="sobre-b in">
  <div class="sobre-b-txt"><p class="destaque">${E.sobre}</p><p>${E.sobre2}</p><p>${E.sobre3}</p></div>
  <div class="sobre-b-fotos">${img('lab-sala', 'Laboratórios da ETC')}${img('lab-radiologia', 'Sala de radiologia')}</div>
</section>
${trilha}
<section class="premios-todos in" id="premios"><header class="tit-b"><p class="k">Prêmios</p><h2>Linha do tempo de reconhecimentos</h2><p>Recebidos pelas diretoras Patrícia Vasconcellos, Marleth Oliveira e Patricia Kramm.</p></header>
  <ol class="linha-tempo">${premios.map(([f, t, a]) => `<li class="sobe"><span class="lt-ano">${a}</span><a href="/assets/premios/${f}.webp" data-foto="${esc(`${t} ${a}`)}"><img src="/assets/premios/${f}.webp" alt="${esc(`${t} ${a}`)}" loading="lazy"></a><strong>${t}</strong></li>`).join('')}</ol>
</section>
` + rodape(v);

  pag.cursos = head(v, 'cursos', 'Cursos técnicos', 'Técnico em Radiologia, Enfermagem, Prótese Dentária e Análises Clínicas em Niterói.') + topo(v, 'cursos') + sub('Cursos', 'Quatro áreas técnicas da saúde', 'Todos com aulas práticas em laboratório e encaminhamento de estágio.') + `
<nav class="abas in" aria-label="Cursos">${cursos.map(c => `<a href="#${c.slug}">${ic(c.icone)}${c.curto}</a>`).join('')}</nav>
${cursos.map((c, i) => `<section id="${c.slug}" class="curso-b in">
  <div class="curso-b-fotos">${img(c.foto, c.nome)}${img(c.lab, `Laboratório de ${c.curto}`)}</div>
  <div class="curso-b-txt"><p class="k">Curso 0${i + 1}</p><h2>${c.nome}</h2><p>${c.texto}</p><dl><div><dt>Formato</dt><dd>Teoria + laboratório</dd></div><div><dt>Estágio</dt><dd>Com encaminhamento</dd></div></dl><a class="btn" href="${wa(`Olá! Quero informações sobre o curso ${c.nome}.`)}" target="_blank" rel="noopener">${icWa()}Pedir informações</a></div>
</section>`).join('')}
<section class="outros-b"><div class="in outros-b-in">
  <div><p class="k">Também na ETC</p><h2>Outros cursos</h2><ul class="lista-check">${outros.map(o => `<li>${ic('check')}Técnico em ${o}</li>`).join('')}<li>${ic('check')}${livre.nome}</li></ul><p>${livre.texto}</p></div>
  ${img('protese-ceramica', 'Peças de cerâmica feitas em aula')}
</div></section>
` + rodape(v);

  pag.matriculas = head(v, 'matriculas', 'Matrículas', 'Pré-matrícula e documentos para matrícula na Escola Técnica Complemento.') + topo(v, 'matriculas') + sub('Matrículas', 'Pré-matrícula em dois minutos', 'Preencha, envie pelo WhatsApp e separe os documentos da lista.') + `
<section class="matr-b in">
  <div class="matr-b-form">${formulario()}</div>
  <aside class="matr-b-docs"><h2>Documentos para matrícula</h2>${docsLista()}<p class="form-nota">Leve os documentos à secretaria: ${E.rua}, ${E.bairro}, ${E.cidade}.</p></aside>
</section>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Fale com a ETC: ${E.fones.join(', ')}. ${E.rua}, ${E.bairro}, ${E.cidade}.`) + topo(v, 'contato') + sub('Contato', 'Fale com a secretaria da ETC') + `
<section class="contato-b in">${contatoLista()}${mapaFrame}</section>
` + rodape(v);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#f28c1b', corTextoBotao: '#1a1a1a', fundo: '#123b63', claro: '#eef4fa',
  fonteTitulo: "'Exo 2',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Fiel ao site atual: o azul da ETC no fundo, o logo e o nome no topo, a foto dos alunos e os quatro cursos com foto, agora organizados e adaptados ao celular.', pontos: ['Mesmas páginas: principal, sobre, cursos, matrículas e contato', 'Pré-matrícula que chega pronta no WhatsApp', 'Prêmios da escola em destaque'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais moderna: clara, com o laranja do logo nos destaques, os laboratórios na abertura e a trilha do aluno, da pré-matrícula ao mercado.', pontos: ['Cada curso com foto e laboratório', 'Linha do tempo dos prêmios', 'Lista de documentos ao lado da pré-matrícula'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
