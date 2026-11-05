// INENF Escola Técnica (Instituto de Nivelamento de Enfermagem), Taguatinga Centro/DF. Gera public/{a,b}/ e a página de escolha.
// node clientes/inenf/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs inenf https://inenf.com.br/)
// Textos, cursos, logo e contatos do site atual. O site atual quase não tem fotos: as fotos de enfermagem são livres (Wikimedia Commons, créditos no LEIA-ME).
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'INENF Escola Técnica', url: 'https://inenf.overtus.com.br/', antigo: 'https://inenf.com.br/',
  fone: '(61) 3028-4439', cel1: '(61) 99612-9870', cel2: '(61) 99925-9870', email: 'contato@inenf.com.br',
  end1: 'C1, Lote 1/12, Edifício Taguatinga Trade Center', end2: '7º andar, sala 735', cidade: 'Taguatinga Centro, Brasília - DF',
  insta: 'https://www.instagram.com/inenfcursos/', face: 'https://www.facebook.com/INENF-1654212324864220/',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Saira+Semi+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap';
const LOGO = () => `<img class="logo" src="/assets/img/logo.webp" alt="INENF Escola Técnica" width="900" height="291">`;
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const ecg = (cls = '') => `<svg class="ecg ${cls}" viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30H230l12-18 14 40 14-52 12 46 10-16h308" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></svg>`;

// ---------- cursos (texto do site atual) ----------
const cursos = [
  { slug: 'tecnico-de-enfermagem', nome: 'Técnico de Enfermagem', curto: 'Técnico de Enfermagem', nivel: 'medio', foto: 'simulacao-equipe',
    resumo: 'Formação técnica completa para atuar em hospitais, UPAs, clínicas, home care e muito mais.',
    ficha: [['Duração', '24 meses'], ['Horários', 'Manhã, tarde e noite'], ['Público-alvo', '18 anos de idade com Nível Médio completo'], ['Local', 'INENF Escola Técnica']],
    texto: ['<b>Objetivo do curso:</b> desenvolver talentos profissionais para a área da saúde, cuja prática profissional tenha base em sólida apreensão das competências e habilidades que lhe são atribuídas, sendo capaz de incorporar em seu fazer profissional as inovações sociais e tecnológicas da área.'],
    mercado: 'Unidades básicas de saúde, hospitais, unidades de pronto atendimento, clínicas, home care, centros de diagnóstico por imagem e análises clínicas, consultórios, ambulatórios, atendimento pré-hospitalar, instituições de longa permanência e organizações militares.' },
  { slug: 'cuidador-de-idosos', nome: 'Qualificação em Cuidador de Idosos', curto: 'Cuidador de Idosos', nivel: 'medio', foto: 'cuidado-idoso',
    resumo: 'Cuidados especiais a idosos e pessoas com alguma incapacidade, em casa ou em instituições.',
    ficha: [['Duração', '6 meses'], ['Turmas', 'Manhã, tarde e noite'], ['Exigência', '1º grau completo'], ['Expectativa salarial', '2 a 6 salários mínimos']],
    texto: ['<b>Objetivo do curso:</b> qualificar, treinar e preparar o aluno para cuidados especiais a idosos ou qualquer pessoa que esteja com alguma incapacidade, no próprio domicílio ou em instituições particulares ou públicas.', '<b>Conteúdo:</b> parte teórica semipresencial (apostilas, exercícios e provas) e parte prática através de estágio supervisionado.'],
    mercado: 'Idosos e enfermos (particular), casas de repouso e de recuperação.' },
  { slug: 'gesso-ortopedico', nome: 'Qualificação Técnica em Gesso Ortopédico', curto: 'Gesso Ortopédico', nivel: 'medio', foto: 'gesso',
    resumo: 'Habilita o aluno a fazer e remover imobilizações gessadas e não gessadas.',
    ficha: [['Carga horária', '450 horas'], ['Duração', '7 meses'], ['Horários', 'Segunda, 9h às 12h, 14h às 17h ou 19h às 22h'], ['Exigência', 'Ensino Médio completo'], ['Expectativa salarial', '2 a 9 salários mínimos']],
    texto: ['<b>Finalidade:</b> habilitar o aluno a fazer e remover imobilizações gessadas e não gessadas.'],
    disciplinas: ['Anatomia e Fisiologia Humana', 'Ética e Humanização', 'Biossegurança', 'Primeiros Socorros', 'Osteologia', 'Noções de Ortopedia e Traumatologia', 'Materiais e Equipamentos Ortopédicos', 'Técnicas de Imobilização Ortopédica'],
    mercado: 'Hospitais públicos e particulares, clínicas e centros de saúde.' },
  { slug: 'necropsia', nome: 'Qualificação Técnica em Necropsia', curto: 'Necropsia', nivel: 'medio', foto: '',
    resumo: 'Capacita o aluno a receber, cadastrar, transportar e auxiliar o legista em necropsias.',
    ficha: [['Duração', '7 meses'], ['Exigência', '2º grau completo ou cursando'], ['Expectativa salarial', '3 a 10 salários mínimos']],
    texto: ['<b>Conceito:</b> necropsia ou autópsia é o ato de examinar um corpo para determinar a causa da morte, para estudo das estruturas e para investigação criminal. Anatomia se refere ao estudo das peças anatômicas separadamente, de indivíduos vivos ou mortos.', '<b>Finalidade:</b> capacitar o aluno a receber, cadastrar, transportar e auxiliar o legista em necropsias.'],
    mercado: 'Hospitais públicos e particulares, necrotérios, funerárias e institutos de Medicina Legal.' },
  { slug: 'massoterapia', nome: 'Qualificação em Massoterapia', curto: 'Massoterapia', nivel: 'medio', foto: 'massoterapia',
    resumo: 'Qualificação com estágio incluso para atuar com massoterapia.',
    ficha: [['Carga horária', '160 horas + 80 horas de estágio'], ['Duração', '7 meses'], ['Exigência', '2º grau completo ou cursando'], ['Expectativa salarial', '2 a 5 salários mínimos']],
    texto: ['Curso de qualificação em massoterapia com 160 horas de carga horária e 80 horas de estágio.'] },
  { slug: 'enfermagem-do-trabalho', nome: 'Qualificação em Enfermagem do Trabalho', curto: 'Enfermagem do Trabalho', nivel: 'tecnico', foto: 'laboratorio-registro',
    resumo: 'Saúde do trabalhador de acordo com a OIT, para atuar no SESMT e em empresas.',
    ficha: [['Duração', '6 meses'], ['Horários', 'Sábado, 8h às 12h, ou quinta, 19h às 22h'], ['Público-alvo', 'Técnicos em Enfermagem formados ou concluindo o curso'], ['Área de atuação', 'SESMT e empresas de grande e pequeno porte']],
    texto: ['<b>Objetivo do curso:</b> capacitar profissionais Técnicos em Enfermagem para uma abordagem técnica e científica voltada à saúde do trabalhador, de acordo com a OIT. Habilitar o profissional a identificar, conhecer e solucionar as necessidades do trabalhador, visando a melhoria da saúde ocupacional e a promoção e prevenção das doenças ocupacionais.', 'Você aprende a organizar os serviços médicos e de enfermagem nas empresas, vê os principais tipos de lesões e seus tratamentos e estuda conceitos de segurança no trabalho.'] },
  { slug: 'instrumentacao-cirurgica', nome: 'Qualificação em Instrumentação Cirúrgica', curto: 'Instrumentação Cirúrgica', nivel: 'tecnico', foto: 'instrumentacao',
    resumo: 'Manejo de instrumentos cirúrgicos para colaborar com a equipe cirúrgica. Estágio incluso.',
    ficha: [['Duração', '7 meses'], ['Horários', 'Sábado, 8h às 12h, ou quinta, 19h às 22h'], ['Estágio', 'Incluso'], ['Exigência', 'Técnicos em Enfermagem e Enfermeiros']],
    texto: ['<b>Objetivo do curso:</b> habilitar o profissional Técnico em Enfermagem no manejo de instrumentos cirúrgicos, a fim de que possa colaborar com a equipe cirúrgica.'],
    mercado: 'Em expansão. O Instrumentador Cirúrgico é um profissional autônomo, podendo participar de cirurgias em diferentes dias.' },
  { slug: 'hemodialise', nome: 'Qualificação em Hemodiálise', curto: 'Hemodiálise', nivel: 'tecnico', foto: 'uti',
    resumo: 'Procedimentos de enfermagem para pacientes em tratamento de hemodiálise.',
    ficha: [['Duração', '7 meses'], ['Horário', 'Sábado, 8h às 16h'], ['Exigência', 'Técnico em Enfermagem']],
    texto: ['<b>Objetivo do curso:</b> aperfeiçoar os profissionais quanto aos procedimentos de enfermagem prestados aos pacientes submetidos ao tratamento de hemodiálise, que consiste na remoção do líquido e de substâncias tóxicas do sangue, como se fosse um rim artificial.'],
    mercado: 'O Técnico em Enfermagem com qualificação em Hemodiálise ganha um grande diferencial: trabalha com um procedimento especializado e com pacientes que ficam longos períodos em tratamento. O mercado também mostra escassez desses profissionais, o que facilita a inserção profissional.' },
  { slug: 'oratoria', nome: 'Curso de Oratória', curto: 'Oratória', nivel: 'livre', foto: 'oratoria',
    resumo: 'Curso teórico-prático para perder o medo de falar em público.',
    ficha: [['Formato', 'Teórico-prático'], ['Local', 'Instituto de Nivelamento de Enfermagem']],
    texto: ['Você sabe qual é o maior medo da humanidade? 1: falar em público; 2: morrer; ou 3: sofrer um acidente. Acertou quem pensou em <b>falar em público</b>.', 'Venha discutir essa temática conosco no Curso Teórico-Prático de Oratória.'] },
];
const NIVEIS = { medio: 'Para nível médio (cursando ou completo)', tecnico: 'Para Técnicos em Enfermagem (cursando ou completo)', livre: 'Curso livre' };
const nivelamento = ['Punção venosa', 'Cálculo de medicação', 'Feridas e curativos', 'Sondas e drenos'];
const valores = ['Integridade', 'Inovação', 'Respeito humano', 'Eficiência', 'Excelência didática'];
const MISSAO = 'Buscar a inovação com a plena qualidade no ensino profissionalizante de enfermagem, com disposição e presteza, gerando o bem-estar, a motivação e a paixão pelo exercício na área da saúde.';
const VISAO = 'Ser reconhecido como a melhor opção da formação profissionalizante de enfermagem do Distrito Federal.';

const nav = [
  { slug: 'quem-somos', nome: 'Quem somos' },
  { slug: 'cursos', nome: 'Cursos' },
  { slug: 'contato', nome: 'Contato' },
];
const cores = { a: '#1E9E38', b: '#B1192B' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Cursos de Enfermagem em Taguatinga/DF` : `${titulo} | INENF`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
function topo(v, s) {
  const sel = s === 'cursos' || cursos.some(c => c.slug === s) ? 'cursos' : s;
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="INENF, página inicial">${LOGO()}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${sel === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}">Inscreva-se</a>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  ${ecg('ecg-rod')}
  <div class="in rod-grade">
    <div class="rod-marca"><span class="logo-placa">${LOGO()}</span><p>Instituto de Nivelamento de Enfermagem. Cursos técnicos, de qualificação e de nivelamento em enfermagem em Taguatinga/DF.</p>
      <p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>Cursos</h3><ul>${cursos.map(c => `<li><a href="${link(v, c.slug)}">${c.curto}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados"><li>${ic('tel')}<span><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${telHref(E.cel1)}">${E.cel1}</a><br><a href="${telHref(E.cel2)}">${E.cel2}</a></span></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li><li>${ic('pin')}<span>${E.end1}, ${E.end2}<br>${E.cidade}</span></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} INENF. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}
const fones = (cls = '') => `<ul class="fones ${cls}"><li><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></li><li><a href="${telHref(E.cel1)}">${ic('tel')}${E.cel1}</a></li><li><a href="${telHref(E.cel2)}">${ic('tel')}${E.cel2}</a></li></ul>`;
const ficha = c => `<dl class="ficha">${c.ficha.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}</dl>`;
const form = (curso = '') => `<form class="form" data-email="${E.email}" data-assunto="Inscrição pelo site${curso ? `: ${esc(curso)}` : ''}" novalidate>
  <label>Nome *<input name="nome" required autocomplete="name"></label>
  <div class="form-2"><label>Telefone *<input name="telefone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <label>Curso de interesse<select name="curso">${cursos.map(c => `<option${c.nome === curso ? ' selected' : ''}>${c.nome}</option>`).join('')}<option>Cursos de nivelamento</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar inscrição</button>
</form>`;
const cursoFoto = (c, cls = '') => c.foto ? img(c.foto, c.nome) : `<div class="sem-foto ${cls}">${ecg()}<b>${c.curto}</b></div>`;

function paginas(v, cab, extrasIndex) {
  const pag = {};
  pag.index = head(v, 'index', '', 'INENF Escola Técnica, Taguatinga/DF: Técnico de Enfermagem e qualificações em Instrumentação Cirúrgica, Hemodiálise, Enfermagem do Trabalho, Gesso Ortopédico e mais. Mensalidades a partir de R$ 150.') + topo(v, 'index') + extrasIndex() + rodape(v);

  pag['quem-somos'] = head(v, 'quem-somos', 'Quem somos', 'INENF, Instituto de Nivelamento de Enfermagem: missão, visão e valores.') + topo(v, 'quem-somos') + cab('Quem somos', 'Instituto de Nivelamento de Enfermagem', 'turma-laboratorio') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">Conheça o INENF: há 8 anos no mercado com cursos técnicos, de qualificação profissional e de nivelamento em enfermagem, em Taguatinga Centro/DF.</p><p>Oferecemos cursos para quem tem nível médio (cursando ou completo) e para quem já é Técnico em Enfermagem e quer se especializar. Faça agora a diferença no mercado de trabalho.</p></div><figure class="sobe">${img('aula-pratica', 'Aula prática de enfermagem')}</figure></section>
<section class="mv"><article class="sobe"><p class="k">Nossa missão</p><p>${MISSAO}</p></article><article class="sobe"><p class="k">Nossa visão</p><p>${VISAO}</p></article></section>
<section class="valores-sec"><header class="tit"><p class="k">Nossos valores</p><h2>O que guia cada aula</h2></header><div class="valores">${ecg('ecg-val')}<ol>${valores.map(x => `<li class="sobe"><span></span>${x}</li>`).join('')}</ol></div></section>
</div>
` + rodape(v);

  const grupo = n => cursos.filter(c => c.nivel === n);
  pag.cursos = head(v, 'cursos', 'Cursos', 'Cursos do INENF: Técnico de Enfermagem, qualificações para nível médio e para Técnicos em Enfermagem, nivelamento e oratória.') + topo(v, 'cursos') + cab('Cursos', 'Faça a diferença no mercado de trabalho', 'simulacao-leito') + `
<div class="in">
${['medio', 'tecnico', 'livre'].map(n => `<section class="cursos-grupo"><header class="tit"><p class="k">${NIVEIS[n]}</p></header><div class="tabela-cursos">${grupo(n).map(c => `<a class="tc sobe" href="${link(v, c.slug)}"><b>${c.nome}</b><span>${c.ficha.find(f => /Dura/.test(f[0]))?.[1] || c.ficha[0][1]}</span><span class="tc-r">${c.resumo}</span>${ic('seta')}</a>`).join('')}</div></section>`).join('')}
<section class="nivel-sec sobe"><div><p class="k">Cursos de nivelamento</p><h2>Para Técnicos em Enfermagem e Enfermeiros</h2><p>Além das qualificações, o INENF oferece cursos de nivelamento, entre outros:</p></div><ul class="tags">${nivelamento.map(x => `<li>${x}</li>`).join('')}</ul></section>
</div>
` + rodape(v);

  for (const c of cursos) {
    const outros = cursos.filter(o => o !== c && o.nivel === c.nivel).concat(cursos.filter(o => o !== c && o.nivel !== c.nivel)).slice(0, 4);
    pag[c.slug] = head(v, c.slug, c.curto, `${c.nome} no INENF, Taguatinga/DF. ${c.resumo}`) + topo(v, c.slug) + cab(NIVEIS[c.nivel], c.nome, c.foto) + `
<div class="in curso-pag">
  <div class="curso-txt">
    <p class="lead sobe">${c.resumo}</p>
    ${ficha(c)}
    ${c.texto.map(p => `<p class="sobe">${p}</p>`).join('')}
    ${c.disciplinas ? `<h2 class="h-menor">Disciplinas</h2><ul class="tags">${c.disciplinas.map(d => `<li>${d}</li>`).join('')}</ul>` : ''}
    ${c.mercado ? `<div class="mercado sobe"><p class="k">Mercado de trabalho</p><p>${c.mercado}</p></div>` : ''}
    <p class="valor">Valor: <b>sob consulta</b></p>
  </div>
  <aside class="inscricao"><h2>Inscreva-se</h2><p>Inscrições na nossa sede: ${E.end1}, ${E.end2}, ${E.cidade}.</p>${fones()}<a class="btn" href="${link(v, 'contato')}">${ic('mail')}Enviar inscrição</a></aside>
</div>
<section class="in outros"><header class="tit"><p class="k">Veja também</p><h2>Outros cursos</h2></header><div class="outros-grade">${outros.map(o => `<a class="outro sobe" href="${link(v, o.slug)}">${cursoFoto(o, 'mini')}<b>${o.curto}</b></a>`).join('')}</div></section>
` + rodape(v);
  }

  pag.contato = head(v, 'contato', 'Contato', `INENF: ${E.end1}, ${E.end2}, ${E.cidade}. Telefone ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Faça agora sua inscrição', 'simulacao-equipe') + `
<div class="in"><section class="contato-pag">
  <div class="sobe"><h2>Fale com o INENF</h2><p>Atendimento comercial e inscrições na sede, em Taguatinga Centro.</p>
    <ul class="contato-dados"><li>${ic('tel')}<div><span>Comercial</span><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${telHref(E.cel1)}">${E.cel1}</a><br><a href="${telHref(E.cel2)}">${E.cel2}</a></div></li><li>${ic('mail')}<div><span>E-mail</span><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('pin')}<div><span>Endereço</span>${E.end1}<br>${E.end2}<br>${E.cidade}</div></li></ul>
    <iframe class="mapa" title="Mapa do INENF" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Taguatinga Trade Center, Taguatinga Centro, Brasília DF')}&z=16&output=embed"></iframe></div>
  <div class="form-caixa sobe"><h2>Pré-inscrição</h2><p>Preencha e envie: o seu e-mail abre com a mensagem pronta para o INENF.</p>${form()}</div>
</section></div>
` + rodape(v);
  return pag;
}

// ---------- A "Plantão": branco, verde do INENF, linha de ECG do logo ----------
function A() {
  const v = 'a';
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div>${foto ? `<figure>${img(foto, '', ' loading="eager"')}</figure>` : ''}</div>${ecg('ecg-cab')}</section>`;
  const destaque = cursos[0];
  return paginas(v, cab, () => `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Escola técnica · Taguatinga/DF</p><h1>Faça agora sua inscrição e dê um <em>passo à frente</em> no mercado.</h1><p>Técnico de Enfermagem e cursos de qualificação profissional em enfermagem. Mensalidades a partir de <b>R$ 150</b>.</p><p class="bts"><a class="btn" href="${link(v, 'cursos')}">Confira nossos cursos</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div>
  <figure class="hero-a-foto">${img('simulacao-leito', 'Aula prática de enfermagem em laboratório', ' loading="eager" fetchpriority="high"')}<figcaption><b>8 anos</b> formando profissionais de enfermagem</figcaption></figure>
</div>${ecg('ecg-hero')}</section>
<section class="in destaque-a"><figure class="sobe">${img('aula-pratica', 'Aula prática do curso Técnico de Enfermagem')}</figure><div class="sobe"><p class="k">Curso técnico</p><h2>${destaque.nome}</h2>${ficha(destaque)}<p>${destaque.resumo}</p><a class="link-seta" href="${link(v, destaque.slug)}">Detalhes do curso ${ic('seta')}</a></div></section>
<section class="in cursos-a"><header class="tit"><p class="k">Qualificação profissional</p><h2>Escolha a sua especialização</h2></header>
  <div class="grupo-a"><h3>${NIVEIS.medio}</h3><div class="cards-a">${cursos.filter(c => c.nivel === 'medio' && c !== destaque).map(c => `<a class="card-a sobe" href="${link(v, c.slug)}">${cursoFoto(c)}<div><b>${c.curto}</b><span>${c.ficha.find(f => /Dura/.test(f[0]))?.[1] || ''}</span></div></a>`).join('')}</div></div>
  <div class="grupo-a"><h3>${NIVEIS.tecnico}</h3><div class="cards-a">${cursos.filter(c => c.nivel === 'tecnico').map(c => `<a class="card-a sobe" href="${link(v, c.slug)}">${cursoFoto(c)}<div><b>${c.curto}</b><span>${c.ficha.find(f => /Dura/.test(f[0]))?.[1] || ''}</span></div></a>`).join('')}</div></div>
</section>
<section class="nivel-a"><div class="in nivel-a-in"><div><p class="k">Nivelamento</p><h2>Para Técnicos em Enfermagem e Enfermeiros</h2><p>Reforce a prática do dia a dia com os cursos de nivelamento do INENF.</p></div><ul>${nivelamento.map(x => `<li>${ic('check')}${x}</li>`).join('')}<li>${ic('check')}Entre outros</li></ul></div></section>
<section class="in valores-a"><div class="sobe"><p class="k">Nossa missão</p><h2>Qualidade no ensino profissionalizante de enfermagem</h2><p>${MISSAO}</p><a class="link-seta" href="${link(v, 'quem-somos')}">Quem somos ${ic('seta')}</a></div><div class="valores">${ecg('ecg-val')}<ol>${valores.map(x => `<li class="sobe"><span></span>${x}</li>`).join('')}</ol></div></section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Fique de olho no INENF</h2><p>${E.end1}, ${E.end2}, ${E.cidade}</p></div>${fones('fones-cta')}</div></section>
`);
}

// ---------- B "Prontuário": vermelho do logo, cursos como ficha de prontuário ----------
function B() {
  const v = 'b';
  const cab = (k, t, foto) => `<section class="cab-b">${foto ? img(foto, '', ' loading="eager"') : ''}<div class="in cab-b-in"><div class="cab-b-caixa"><p class="k">${k}</p><h1>${t}</h1></div></div></section>`;
  return paginas(v, cab, () => `
<section class="hero-b">${img('turma-laboratorio', 'Turma em aula prática de enfermagem', ' loading="eager" fetchpriority="high"')}
  <div class="in hero-b-in"><div class="hero-b-caixa"><p class="k">INENF · Instituto de Nivelamento de Enfermagem</p><h1>Cursos de enfermagem em Taguatinga</h1><p>Técnico de Enfermagem, qualificação profissional e nivelamento. Mensalidades a partir de R$ 150.</p><p class="bts"><a class="btn btn-claro" href="${link(v, 'cursos')}">Ver os cursos</a><a class="btn btn-linha" href="${link(v, 'contato')}">Inscreva-se</a></p></div></div>
</section>
<section class="faixa-b"><div class="in faixa-b-in"><div><b>9</b><span>cursos</span></div><div><b>24</b><span>meses de Técnico de Enfermagem</span></div><div><b>R$ 150</b><span>mensalidades a partir de</span></div><div><b>8 anos</b><span>no mercado</span></div></div></section>
<section class="in prontuario"><header class="tit"><p class="k">Nossos cursos</p><h2>Navegue pelos cursos</h2></header>
  <div class="pront-tabela" role="table" aria-label="Cursos do INENF"><div class="pt-cab" role="row"><span role="columnheader">Curso</span><span role="columnheader">Para quem</span><span role="columnheader">Duração</span><span role="columnheader">Horários</span><span></span></div>
  ${cursos.map(c => `<a class="pt-linha sobe" role="row" href="${link(v, c.slug)}"><span role="cell"><b>${c.nome}</b></span><span role="cell">${{ medio: 'Nível médio', tecnico: 'Técnicos em Enfermagem', livre: 'Livre' }[c.nivel]}</span><span role="cell">${c.ficha.find(f => /Dura/.test(f[0]))?.[1] || '-'}</span><span role="cell">${c.ficha.find(f => /Hor|Turma/.test(f[0]))?.[1] || 'Sob consulta'}</span>${ic('seta')}</a>`).join('')}</div>
</section>
<section class="mosaico-b"><div class="in mosaico-b-in">${[['instrumentacao-cirurgica', 'instrumentacao'], ['gesso-ortopedico', 'gesso'], ['hemodialise', 'uti'], ['massoterapia', 'massoterapia']].map(([s, f]) => { const c = cursos.find(x => x.slug === s); return `<a class="mb sobe" href="${link(v, s)}">${img(f, c.nome)}<span>${c.curto}</span></a>`; }).join('')}</div></section>
<section class="in mv-b"><article class="sobe"><p class="k">Missão</p><p>${MISSAO}</p></article><article class="sobe"><p class="k">Visão</p><p>${VISAO}</p></article><article class="sobe"><p class="k">Valores</p><ul class="tags">${valores.map(x => `<li>${x}</li>`).join('')}</ul></article></section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>Inscrições abertas</h2><p>Inscreva-se na sede ou envie a sua pré-inscrição pelo site.</p></div><a class="btn btn-claro" href="${link(v, 'contato')}">Fazer pré-inscrição</a></div></section>
`);
}

copiarSiteJs(pub, '');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8') + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'INENF', artigo: 'do', url: E.url, lang: 'pt', cor: '#1E9E38', fundo: '#7E1220', claro: '#F4F8F5',
  fonteTitulo: "'Saira Semi Condensed',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Plantão', paginas: 13, texto: 'Branca com o verde do INENF e a linha de batimento do logo: o Técnico de Enfermagem em destaque e as qualificações separadas por público.', pontos: ['Página própria para cada um dos 9 cursos', 'Ficha de cada curso: duração, horários e exigência', 'Pré-inscrição pelo site'] },
    { letra: 'b', nome: 'Prontuário', paginas: 13, texto: 'Vermelho do logo: abertura com a turma em aula prática, números da escola e todos os cursos numa tabela, como um prontuário.', pontos: ['Todos os cursos comparados numa tabela', 'Missão, visão e valores', 'Pré-inscrição pelo site'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
