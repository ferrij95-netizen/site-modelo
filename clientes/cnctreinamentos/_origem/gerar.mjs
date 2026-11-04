// CNC Treinamentos (Curitiba/PR). Gera public/{a,b}/ e a página de escolha.
// node clientes/cnctreinamentos/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs cnctreinamentos https://www.cnctreinamentos.com.br/)
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'CNC Treinamentos', url: 'https://cnctreinamentos.overtus.com.br/', antigo: 'https://www.cnctreinamentos.com.br/',
  fone: '(41) 3086-2023', wa: '5541995309848', waTxt: '(41) 99530-9848', adm: '(41) 99541-5624', email: 'contato@cnctreinamentos.com.br',
  rua: 'Rua José Zaleski, 1449', bairro: 'Cidade Industrial', cidade: 'Curitiba - PR',
  horario: [['Segunda a sexta', '8h30 às 21h30'], ['Sábado', '8h30 às 16h30']],
  quem: ['A CNC Treinamentos é uma escola especializada no ensino de cursos profissionalizantes nos setores industrial, de informática e de tecnologia.',
    'Nossa equipe de professores é formada por engenheiros, técnicos e tecnólogos, todos com experiência prática e teórica nas áreas em que atuam.',
    'Disponibilizamos uma estrutura completa para o seu aprendizado, aliando aulas teóricas em sala de aula com aulas práticas dentro de uma indústria metalúrgica (nos cursos industriais), para o máximo aproveitamento do seu treinamento.',
    'Trabalhamos no sentido de proporcionar a excelência em nossos serviços e a satisfação de nossos alunos.'],
  inCompany: ['Os cursos in company da CNC Treinamentos oferecem flexibilidade para se adequar às necessidades de cada organização. São adaptáveis em horários, dias da semana, local, quantidade de alunos e conteúdo, proporcionando o ensino conforme a identidade da empresa e suas demandas específicas.',
    'A CNC Treinamentos conta com profissionais altamente qualificados, com grande vivência no ramo de atuação abordado pelo curso e com experiência e dinamismo para ministrá-lo.',
    'A partir de uma abordagem consultiva, fazemos o levantamento das necessidades junto às áreas envolvidas, permitindo a escolha dos temas e do enfoque, para aplicação do conteúdo no dia a dia do colaborador.'],
  convenios: 'As empresas conveniadas com a CNC Treinamentos têm descontos e benefícios especiais para funcionários em todos os cursos ministrados na instituição.',
};
const areas = [
  { id: 'usinagem', nome: 'Usinagem e mecânica', icone: 'engrenagem' },
  { id: 'cnc', nome: 'Programação CNC', icone: 'painel' },
  { id: 'solda', nome: 'Solda', icone: 'chama' },
  { id: 'eletrica', nome: 'Elétrica', icone: 'sol' },
  { id: 'qualidade', nome: 'Qualidade', icone: 'escudo' },
  { id: 'cad', nome: 'CAD/CAM e projetos', icone: 'fabrica' },
];
const juntar = ls => { const o = []; for (const l of ls || []) { if (o.length && !/[.!?:;]$/.test(o[o.length - 1])) o[o.length - 1] += ' ' + l; else o.push(l); } return o.map(t => t.replace(/\.(?=[a-zà-ú])/g, '. ').replace(/\s+([,.])/g, '$1').replace(/\.\.+/g, '.')); };
const juntarLista = ls => { const o = []; for (const l of ls || []) { if (o.length && (/^[a-zà-ú(]/.test(l) || /(\s(o|a|de|do|da|e|em)|software|,)$/i.test(o[o.length - 1]))) o[o.length - 1] += ' ' + l; else o.push(l); } return o.map(t => t.replace(/[;.]$/, '')); };
const cursos = JSON.parse(fs.readFileSync(path.join(aqui, 'cursos.json'), 'utf8')).map(c => ({
  ...c, objetivo: juntar(c.objetivo), mercado: juntar(c.mercado), destinado: juntar(c.destinado),
  conteudo: juntarLista(c.conteudo), carga: (c.carga || []).map(t => t.replace(/\.$/, '')), requisitos: (c.requisitos || []).map(t => t.replace(/\.$/, '')),
  incluso: (c.incluso || []).map(t => t.replace(/\.$/, '')), documentos: (c.documentos || []).map(t => t.replace(/\.$/, '')),
  modalidade: (c.modalidade || []).map(t => t.replace(/\s+/g, ' ').trim()).filter(t => t.length > 3),
}));
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'sobre', nome: 'Quem somos' }, { slug: 'cursos', nome: 'Cursos' }, { slug: 'in-company', nome: 'In company' }, { slug: 'contato', nome: 'Fale conosco' }];
export const nomesVersao = { a: 'Placa Preta', b: 'Chão de Fábrica' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;500;600;700&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da CNC Treinamentos e quero informações sobre os cursos.') => waHref(E.wa, m);
const waCurso = c => wa(`Olá! Vi no site o curso de ${c.nome} e gostaria de receber mais informações e as próximas turmas.`);
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Escola técnica profissionalizante em Curitiba` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#e8262e' });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const lC = (v, c) => `/${v}/cursos/${c.slug}/`;
const resumo = c => { const t = c.objetivo[0] || c.sub; return t.length > 170 ? t.slice(0, 170).replace(/\s\S*$/, '') + '…' : t; };
const carga = c => (c.carga[0] || '').replace(/horas?\/aula/i, 'h/aula');
const lista = (ls, cls = 'lista-check') => `<ul class="${cls}">${ls.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;
const formulario = (curso = '') => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Curso<select name="curso" required><option value="">Escolha o curso</option>${cursos.map(c => `<option${c.nome === curso ? ' selected' : ''}>${c.nome}</option>`).join('')}<option>Curso in company para empresa</option></select></label>
  <label>Turma de preferência<select name="turma"><option>Manhã</option><option>Noite</option><option>Sábados</option><option>Online ao vivo</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Quero saber as próximas turmas</button>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}, ${E.cidade}</span></div></li>
  <li>${icWa()}<div><strong>Cursos e matrículas</strong><a href="${wa()}" target="_blank" rel="noopener">${E.waTxt}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('usuarios')}<div><strong>Administrativo e financeiro</strong><a href="${telHref(E.adm)}">${E.adm}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('relogio')}<div><strong>Atendimento</strong>${E.horario.map(h => `<span>${h[0]}: ${h[1]}</span>`).join('')}</div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da CNC Treinamentos" loading="lazy" src="https://maps.google.com/maps?q=Rua%20Jos%C3%A9%20Zaleski%2C%201449%2C%20Curitiba%20PR&z=15&output=embed"></iframe>`;

function topo(v, slug) {
  if (v === 'a') return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="CNC Treinamentos, escola técnica profissionalizante" width="838" height="502"></a>
    <div class="topo-info"><p class="topo-nome">CNC Treinamentos Escola Técnica</p><p class="topo-end">${E.rua} · ${E.bairro} · Curitiba/PR</p>
    <p class="topo-fones"><a href="${wa()}" target="_blank" rel="noopener">${icWa()}<span><b>${E.waTxt}</b><small>Cursos e matrículas</small></span></a><a href="${telHref(E.adm)}">${ic('tel')}<span><b>${E.adm}</b><small>Administrativo/financeiro</small></span></a></p></div>
    ${btnMenu}
  </div>
  <nav id="menu" class="menu" aria-label="Principal"><ul class="in">${menuItens(v, nav, slug)}</ul></nav>
</header>
<main id="conteudo">
`;
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="CNC Treinamentos" width="838" height="502"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" target="_blank" rel="noopener">${icWa()}Matrículas</a>
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
    <div class="rod-marca"><img src="/assets/logo.webp" alt="CNC Treinamentos" width="838" height="502" loading="lazy"><p>Formando os melhores profissionais da indústria em Curitiba, com aulas práticas dentro de uma indústria metalúrgica.</p></div>
    <div><h3>Cursos</h3><ul>${areas.map(a => `<li><a href="${link(v, 'cursos')}#${a.id}">${a.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Fale conosco</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" target="_blank" rel="noopener">${E.waTxt}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li>
      <li>${ic('relogio')}<span>Seg. a sex. 8h30 às 21h30<br>Sáb. 8h30 às 16h30</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} CNC Treinamentos. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

function paginaCurso(v, c) {
  const area = areas.find(a => a.id === c.area);
  const secoes = [
    c.objetivo.length && `<section><h2>Objetivo</h2>${c.objetivo.map(p => `<p>${esc(p)}</p>`).join('')}</section>`,
    c.mercado.length && `<section><h2>Mercado de trabalho</h2>${c.mercado.map(p => `<p>${esc(p)}</p>`).join('')}</section>`,
    c.destinado.length && `<section><h2>Destinado para</h2>${c.destinado.map(p => `<p>${esc(p)}</p>`).join('')}</section>`,
    c.niveis && `<section><h2>Níveis</h2><ol class="niveis">${c.niveis.map(n => `<li><strong>${n[0]}</strong><span>${n[1]}</span></li>`).join('')}</ol>${img('solidworks-moldes', 'Projeto de molde no SolidWorks')}</section>`,
    c.conteudo.length && `<section><h2>Conteúdo do curso</h2><ol class="conteudo">${c.conteudo.map(t => /^\d+\s*[-–]\s*/.test(t) ? `<li class="grupo">${esc(t.replace(/^\d+\s*[-–]\s*/, ''))}</li>` : `<li>${esc(t)}</li>`).join('')}</ol></section>`,
    c.slug === 'mecanica-industrial-geral' && `<section><h2>Módulos e conteúdos</h2><div class="modulos-img"><a href="/assets/img/mecanica-geral-modulos-1.webp" data-foto>${img('mecanica-geral-modulos-1', 'Módulos do curso de Mecânica Industrial Geral, parte 1')}</a><a href="/assets/img/mecanica-geral-modulos-2.webp" data-foto>${img('mecanica-geral-modulos-2', 'Módulos do curso de Mecânica Industrial Geral, parte 2')}</a></div></section>`,
  ].filter(Boolean).join('');
  const ficha = `<dl class="ficha">${c.carga.length ? `<div><dt>Carga horária</dt><dd>${c.carga.join('<br>')}</dd></div>` : ''}${c.requisitos.length ? `<div><dt>Pré-requisitos</dt><dd>${c.requisitos.join('<br>')}</dd></div>` : ''}${c.modalidade.length ? `<div><dt>Modalidade</dt><dd>${c.modalidade.join('<br>')}</dd></div>` : ''}</dl>`;
  const lado = `<aside class="curso-lado">${ficha}${c.incluso.length ? `<div class="caixa-lado"><h3>Incluso</h3>${lista(c.incluso)}</div>` : ''}${c.documentos.length ? `<div class="caixa-lado"><h3>Documentos para matrícula</h3>${lista(c.documentos)}</div>` : ''}<div class="curso-cta"><p>Consulte as próximas turmas e o investimento pelo WhatsApp.</p><a class="btn" href="${waCurso(c)}" target="_blank" rel="noopener">${icWa()}Próximas turmas</a></div></aside>`;
  const outros = cursos.filter(o => o.area === c.area && o.slug !== c.slug).concat(cursos.filter(o => o.area !== c.area)).slice(0, 4);
  const corpo = `<div class="curso-corpo"><div class="curso-txt">${secoes}</div>${lado}</div><section class="outros"><h2>Outros cursos</h2><ul>${outros.map(o => `<li><a href="${lC(v, o)}">${img('cursos/' + o.slug, o.nome)}<span>${o.nome}</span></a></li>`).join('')}</ul></section>`;
  const t = head(v, 'cursos', `Curso de ${c.nome}`, `Curso de ${c.nome} em Curitiba. ${resumo(c)}`) + topo(v, 'cursos');
  if (v === 'a') return t + `<div class="in"><p class="trilha"><a href="${link(v, 'cursos')}">Cursos</a> / ${area.nome}</p><header class="curso-cab-a">${img('cursos/' + c.slug, c.nome, ' loading="eager"')}<div><h1>${c.nome}</h1><p class="sub">${c.sub}</p>${carga(c) ? `<p class="carga">${ic('relogio')}${carga(c)}</p>` : ''}</div></header>${corpo}</div>` + rodape(v);
  return t + `<section class="curso-cab-b"><div class="in curso-cab-b-in"><div><p class="k"><a href="${link(v, 'cursos')}">Cursos</a> · ${area.nome}</p><h1>${c.nome}</h1><p class="sub">${c.sub}</p><p class="bts"><a class="btn" href="${waCurso(c)}" target="_blank" rel="noopener">${icWa()}Próximas turmas</a>${carga(c) ? `<span class="carga">${ic('relogio')}${carga(c)}</span>` : ''}</p></div>${img('cursos/' + c.slug, c.nome, ' loading="eager"')}</div></section><div class="in">${corpo}</div>` + rodape(v);
}

function comum(v, pag, cab) {
  for (const c of cursos) pag[`cursos/${c.slug}`] = paginaCurso(v, c);
  pag['in-company'] = head(v, 'in-company', 'Cursos in company', E.inCompany[0]) + topo(v, 'in-company') + cab('Para empresas', 'Cursos in company e convênios', 'faixa-inspetor') + `
<div class="in"><section class="texto-pag"><div>${E.inCompany.map(p => `<p>${p}</p>`).join('')}<p>A CNC Treinamentos propõe uma parceria que transforma as estratégias de treinamento em ações concretas, com total liberdade para a empresa definir as características que realmente precisa no curso.</p></div><aside class="caixa-lado destaque"><h2>Convênios</h2><p>${E.convenios}</p><p>Para elaborar um curso in company ou firmar um convênio, fale com a gente:</p><a class="btn" href="mailto:${E.email}">${ic('mail')}${E.email}</a><a class="btn btn-linha" href="${wa('Olá! Sou de uma empresa e quero falar sobre cursos in company ou convênio com a CNC Treinamentos.')}" target="_blank" rel="noopener">${icWa()}WhatsApp</a></aside></section>
<section class="adapta"><h2>O que pode ser adaptado</h2><ul>${[['calendario', 'Horários e dias da semana'], ['pin', 'Local das aulas'], ['usuarios', 'Quantidade de alunos'], ['livro', 'Conteúdo e enfoque']].map(a => `<li>${ic(a[0])}<span>${a[1]}</span></li>`).join('')}</ul></section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Fale conosco', `CNC Treinamentos: ${E.rua}, ${E.bairro}, Curitiba. WhatsApp ${E.waTxt}.`) + topo(v, 'contato') + cab('Fale conosco', 'Informações de cursos e matrículas', 'faixa-usinagem') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Consulte as próximas turmas</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t) => `<div class="in"><header class="tit-a"><p class="k">${k}</p><h1>${t}</h1></header></div>`;
  const cartao = c => `<li class="sobe"><a href="${lC(v, c)}">${img('cursos/' + c.slug, c.nome)}<strong>${c.nome}</strong><em>${c.sub}</em><span>${resumo(c)}</span><b>+ Informações</b></a></li>`;
  pag.index = head(v, 'index', '', E.quem[0]) + topo(v, 'index') + `
<section class="faixa-a"><div class="in faixa-a-in"><div><h1>Cursos profissionalizantes para a indústria em Curitiba</h1><p>Aulas teóricas em sala e aulas práticas dentro de uma indústria metalúrgica. Professores engenheiros, técnicos e tecnólogos.</p><p class="bts"><a class="btn" href="${link(v, 'cursos')}">Ver os cursos</a><a class="btn btn-linha" href="${wa()}" target="_blank" rel="noopener">${icWa()}${E.waTxt}</a></p></div>${img('ferramenta', 'Ferramenta de usinagem CNC em operação', ' loading="eager"')}</div></section>
<section class="in quem-a"><h2>Quem somos</h2>${E.quem.slice(0, 3).map(p => `<p>${p}</p>`).join('')}</section>
<section class="in cursos-a"><h2 class="barra">Cursos na área industrial</h2><ul class="grade-a">${cursos.filter(c => c.area !== 'cad').map(cartao).join('')}</ul>
<h2 class="barra">Cursos de CAD/CAM e projetos</h2><ul class="grade-a">${cursos.filter(c => c.area === 'cad').map(cartao).join('')}</ul></section>
<section class="in empresas-a"><div><h2>Para empresas</h2><p>Cursos in company adaptados à rotina da sua equipe e convênios com descontos para funcionários.</p></div><a class="btn" href="${link(v, 'in-company')}">Saiba mais</a></section>
` + rodape(v);
  pag.sobre = head(v, 'sobre', 'Quem somos', E.quem[0]) + topo(v, 'sobre') + cab('Quem somos', 'Formando os melhores profissionais da indústria') + `
<div class="in"><section class="texto-pag"><div>${E.quem.map(p => `<p>${p}</p>`).join('')}</div><aside class="caixa-lado destaque"><h2>Estrutura</h2>${lista(['Aulas teóricas em sala de aula', 'Aulas práticas dentro de uma indústria metalúrgica', 'Torno, fresa, centro de usinagem e torno CNC', 'Simulador CNC 3D', 'Turmas presenciais e online ao vivo'])}</aside></section>
<figure class="faixa-foto">${img('faixa-usinagem', 'Aulas práticas de usinagem')}</figure><figure class="faixa-foto">${img('faixa-projetos', 'Projetos mecânicos em CAD')}</figure></div>
` + rodape(v);
  pag.cursos = head(v, 'cursos', 'Cursos', `Cursos da CNC Treinamentos em Curitiba: ${cursos.map(c => c.nome).join(', ')}.`) + topo(v, 'cursos') + cab('Cursos', '14 cursos profissionalizantes') + `
<div class="in">${areas.map(a => { const cs = cursos.filter(c => c.area === a.id); return cs.length ? `<section class="area-a" id="${a.id}"><h2 class="barra">${ic(a.icone)}${a.nome}</h2><ul class="grade-a">${cs.map(cartao).join('')}</ul></section>` : ''; }).join('')}</div>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="cab-b-foto">${img(foto, '', ' loading="eager"')}</div><div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  const gcode = ['G21 G90 G94', 'T01 M06', 'S2500 M03', 'G00 X0 Y0 Z5.', 'G01 Z-2. F120', 'G02 X40. Y0 R20.', 'G01 X40. Y-30.', 'G03 X0 Y-30. R20.', 'G00 Z50.', 'M30'];
  const cartao = c => `<li class="sobe" data-area="${c.area}"><a href="${lC(v, c)}"><figure>${img('cursos/' + c.slug, c.nome)}</figure><div><small>${areas.find(a => a.id === c.area).nome}</small><strong>${c.nome}</strong><span>${c.sub}</span>${carga(c) ? `<em>${ic('relogio')}${carga(c)}</em>` : ''}</div></a></li>`;
  pag.index = head(v, 'index', '', E.quem[0]) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Escola técnica profissionalizante · Curitiba/PR</p><h1>Aprenda dentro de uma indústria de verdade</h1><p>Torno, fresa, CNC, solda, elétrica e projetos com professores engenheiros, técnicos e tecnólogos. Aulas práticas em máquina e turmas online ao vivo.</p><p class="bts"><a class="btn" href="${link(v, 'cursos')}">Escolher meu curso</a><a class="btn btn-linha" href="${wa()}" target="_blank" rel="noopener">${icWa()}${E.waTxt}</a></p></div>
  <div class="hero-b-tela" aria-hidden="true"><div class="tela-topo"><i></i><i></i><i></i><span>PROGRAMA O0001</span></div><pre>${gcode.map((l, i) => `<span><b>N${String((i + 1) * 10).padStart(3, '0')}</b> ${l}</span>`).join('\n')}</pre>${img('ferramenta', '')}</div>
</div></section>
<section class="faixa-num-b"><div class="in faixa-num-b-in"><div><b>14</b><span>cursos profissionalizantes</span></div><div><b>Prática</b><span>em máquina, dentro da indústria</span></div><div><b>Online</b><span>ao vivo em vários cursos</span></div><div><b>Sem taxa</b><span>de matrícula na maioria dos cursos</span></div></div></section>
<section class="in cursos-b"><header class="tit-b"><p class="k">Cursos</p><h2>Do primeiro emprego à especialização</h2></header>
  <div class="filtro-b" role="group" aria-label="Filtrar por área"><button class="ativo" data-filtro="">Todos</button>${areas.map(a => `<button data-filtro="${a.id}">${a.nome}</button>`).join('')}</div>
  <ul class="cursos-b-grade">${cursos.map(cartao).join('')}</ul>
</section>
<section class="pratica-b"><div class="in pratica-b-in"><div><p class="k">Como é a aula</p><h2>Teoria em sala, prática na indústria metalúrgica</h2>${E.quem.slice(1, 3).map(p => `<p>${p}</p>`).join('')}<a class="link-seta" href="${link(v, 'sobre')}">Quem somos ${ic('seta')}</a></div><div class="pratica-b-fotos">${img('faixa-usinagem', 'Aulas práticas de usinagem')}${img('faixa-projetos', 'Projetos mecânicos')}</div></div></section>
<section class="in empresas-b"><div><p class="k">Para empresas</p><h2>Treinamento in company e convênios</h2><p>Cursos adaptados em horário, local, número de alunos e conteúdo, e descontos para funcionários de empresas conveniadas.</p></div><a class="btn" href="${link(v, 'in-company')}">Falar sobre a minha empresa</a></section>
` + rodape(v);
  pag.sobre = head(v, 'sobre', 'Quem somos', E.quem[0]) + topo(v, 'sobre') + cab('Quem somos', 'Formando os melhores profissionais da indústria', 'faixa-projetos') + `
<div class="in"><section class="texto-pag"><div>${E.quem.map(p => `<p>${p}</p>`).join('')}</div><aside class="caixa-lado destaque"><h2>Estrutura</h2>${lista(['Aulas teóricas em sala de aula', 'Aulas práticas dentro de uma indústria metalúrgica', 'Torno, fresa, centro de usinagem e torno CNC', 'Simulador CNC 3D', 'Turmas presenciais e online ao vivo'])}</aside></section>
<figure class="faixa-foto">${img('faixa-inspetor', 'Inspeção de qualidade e metrologia')}</figure></div>
` + rodape(v);
  pag.cursos = head(v, 'cursos', 'Cursos', `Cursos da CNC Treinamentos em Curitiba: ${cursos.map(c => c.nome).join(', ')}.`) + topo(v, 'cursos') + cab('Cursos', '14 cursos para entrar e crescer na indústria', 'faixa-usinagem') + `
<section class="in cursos-b cursos-b-pag"><div class="filtro-b" role="group" aria-label="Filtrar por área"><button class="ativo" data-filtro="">Todos</button>${areas.map(a => `<button data-filtro="${a.id}">${a.nome}</button>`).join('')}</div><ul class="cursos-b-grade">${cursos.map(cartao).join('')}</ul></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
fs.writeFileSync(path.join(pub, 'assets/filtro.js'), `document.querySelectorAll('.filtro-b').forEach(g=>{const l=g.nextElementSibling;g.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;g.querySelectorAll('button').forEach(x=>x.classList.toggle('ativo',x===b));l.querySelectorAll('li').forEach(li=>{li.hidden=!!b.dataset.filtro&&li.dataset.area!==b.dataset.filtro})})});\n`);
const comFiltro = p => Object.fromEntries(Object.entries(p).map(([k, h]) => [k, h.includes('filtro-b') ? h.replace('</body>', '<script src="/assets/filtro.js" defer></script>\n</body>') : h]));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', comFiltro(B()));
await escolha(pub, {
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#e8262e', fundo: '#1c1c1e', claro: '#f4f4f2',
  fonteTitulo: "'Libre Baskerville',Georgia,serif", fonteTexto: 'Inter,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5 + cursos.length, texto: 'Fiel ao site atual: a placa preta do logo no topo com os dois WhatsApp, os títulos em vermelho e os cursos em quadros com foto e "+ Informações", agora com uma página organizada para cada curso.', pontos: ['14 cursos separados por área', 'Objetivo, conteúdo, documentos e incluso em cada curso', 'Próximas turmas pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5 + cursos.length, texto: 'Mais moderna: fundo grafite, um programa CNC de verdade na abertura, filtro de cursos por área e a aula prática dentro da indústria em destaque.', pontos: ['Filtro por área: usinagem, CNC, solda, elétrica, qualidade e CAD/CAM', 'Carga horária em cada cartão', 'Página para empresas: in company e convênios'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
