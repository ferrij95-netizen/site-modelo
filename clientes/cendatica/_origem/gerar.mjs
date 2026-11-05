// Cendatica Informática, Cascavel/PR: cursos de informática, profissionalizantes e idiomas desde 1993. Gera public/{a,b}/ e a página de escolha.
// node clientes/cendatica/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs cendatica https://cendatica.com.br/)
// Textos, cursos, cargas horárias, fotos da galeria (2005 a 2010) e logo (vetorizado) do site atual.
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Cendatica Informática', url: 'https://cendatica.overtus.com.br/', antigo: 'https://cendatica.com.br/',
  fone1: '(45) 3225-9123', fone2: '(45) 3223-7016', email: 'cendatica@cendatica.com.br',
  rua: 'Rua São Paulo, 1169, Sala 12', bairro: 'Centro (4 Estações)', cidade: 'Cascavel - PR', cep: '85801-020',
  face: 'https://www.facebook.com/cendaticainformatica',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Fira+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap';
const LOGO = (c = '') => `<img class="logo" src="/assets/img/logo${c}.svg" alt="Cendatica Informática" width="2280" height="720">`;
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async" width="640" height="480"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;

const SLOGAN = 'A escolha mais inteligente e econômica para você conquistar o seu espaço no mercado de trabalho.';
const METODO = [
  'A Cendatica mantém seu diferencial pela metodologia adotada: o método professor/aluno. A aprendizagem é individual, com um ensinamento direcionado às necessidades de cada participante.',
  'Desde a primeira aula, o aluno segue passo a passo as instruções do seu professor. O curso é eminentemente prático e não requer formação de turma: se existir vaga no horário escolhido, o aluno começa, se quiser, no mesmo dia da inscrição.',
];
const PASSOS = [['Escolha o curso', 'Informática básica, projetista, artes gráficas, programação, profissionalizantes ou idiomas.'], ['Escolha o horário', 'Manhã, tarde ou noite, de segunda a sábado.'], ['Comece no mesmo dia', 'Sem esperar turma fechar: havendo vaga no horário, a aula começa na hora.']];
const HIST = [
  'A Cendatica Informática iniciou suas atividades em 3 de março de 1993, como Escola de Ensino Profissionalizante de Datilografia e Informática com Auxiliar de Escritório, com a razão social Cendatica, Centro de Datilografia e Informática Ltda.',
  'Com o passar dos anos e o avanço da tecnologia, a escola ampliou conteúdos e criou novos cursos e treinamentos para acompanhar as exigências do mercado, e passou a atender como Centro de Ensino Profissionalizante de Informática: Cursos, Treinamentos e Idiomas.',
  'Hoje atua com cursos, treinamentos e idiomas, palestras, workshops e videoconferências, sempre buscando ensinar de maneira prática e funcional.',
];
const LINHA = [['1993', 'Fundação em 3 de março, como escola de datilografia e informática com auxiliar de escritório.'], ['Informática', 'Novos cursos e treinamentos acompanham o avanço da tecnologia.'], ['Idiomas', 'Inglês, Inglês Técnico e Espanhol entram no catálogo.'], ['Hoje', 'Cursos, treinamentos, idiomas e laboratórios para empresas no centro de Cascavel.']];
const NOME = [['CEN', 'Centro'], ['DAT', 'Didática'], ['ICA', 'Informática']];
const HORARIO = [['Manhã', '08:00 às 12:00', 'Segunda a sábado'], ['Tarde', '13:00 às 18:00', 'Segunda a sábado'], ['Noite', '18:00 às 21:00', 'Segunda a sexta']];

const CAT = [
  { slug: 'informatica-basica', nome: 'Informática Básica', curto: 'Informática básica', foto: 'f-2005-01', resumo: 'Windows, pacote Office, internet e digitação: a base para qualquer profissão.',
    intro: 'O primeiro passo para usar o computador com segurança no trabalho, nos estudos e no dia a dia. Os cursos de 24 h/aula podem ser feitos em 2 meses (3 h/aula por semana), 1 mês (6 h/aula) ou 2 semanas (12 h/aula).',
    cursos: [
      ['Windows', '16 h/aula', 'As principais funções do sistema operacional mais usado no mundo, do gerenciamento de arquivos aos recursos do dia a dia.'],
      ['Word', '24 h/aula', 'Editor de textos: criar, formatar e editar documentos, cartas e tabelas com eficiência e agilidade.'],
      ['Excel', '24 h/aula', 'Planilhas, fórmulas e gráficos para cálculos, custos, orçamentos domésticos e empresariais.'],
      ['PowerPoint', '24 h/aula', 'Apresentações com imagens, sons, textos e vídeos, modelos prontos e efeitos de animação.'],
      ['Internet', '24 h/aula', 'Navegador, buscas, downloads e os principais recursos e serviços da web.'],
      ['Digitação', '48 h/aula', 'Domínio do teclado, postura correta do corpo e dos pulsos e rapidez, inclusive para concursos com teste de digitação.'],
      ['Info 3ª Idade', '', 'Inclusão digital no ritmo da melhor idade: teclado, mouse, internet, e-mail e texto, com aulas 100% práticas.'],
    ] },
  { slug: 'projetista', nome: 'Cursos Projetista', curto: 'Projetista', foto: 'f-2010-02', resumo: 'AutoCAD 2D e 3D, SketchUp + V-Ray, 3DS Max, maquete eletrônica e SolidWorks.',
    intro: 'Ferramentas de desenho e modelagem para arquitetura, engenharia civil, mecânica e elétrica, design de interiores e projeto de produtos.',
    cursos: [
      ['AutoCAD 2D', '40 h/aula', 'Desenhos e projetos de plantas residenciais e prediais, tubulações e redes elétricas na ferramenta de CAD mais popular do mercado.'],
      ['AutoCAD 3D', '40 h/aula', 'Projetos em três dimensões de construção, interiores, decoração, produtos, peças e máquinas.'],
      ['SketchUp + V-Ray', '40 h/aula', 'Criação rápida de modelos 3D para estudo de projeto em arquitetura, engenharia e decoração de interiores.'],
      ['3DS Max', '75 h/aula', 'Modelagem tridimensional, materiais, câmera, iluminação e renderização de imagens e animações.'],
      ['Maquete Eletrônica', '52 h/aula', 'Modelagem de edifícios, ambientes e mobiliário no 3DS Max, com materiais e iluminação do V-Ray.'],
      ['Renderização', '', 'Imagens fotorrealistas com o V-Ray, de ambientes internos e externos, de dia ou à noite.'],
      ['SolidWorks', '48 h/aula', 'Modelos paramétricos de peças e montagens e os desenhos técnicos de cada uma.'],
    ] },
  { slug: 'artes-graficas', nome: 'Artes Gráficas', curto: 'Artes gráficas', foto: 'f-2005-09', resumo: 'CorelDRAW, Photoshop, Planta Humanizada e Designer de Moda.',
    intro: 'Criação de peças gráficas, tratamento de imagens e desenho digital para quem trabalha ou quer trabalhar com design.',
    cursos: [
      ['CorelDRAW', '32 h/aula', 'Peças gráficas, banners, calendários e ilustrações com mistura interativa, contorno, sombreamento e vetorização.'],
      ['Photoshop', '32 h/aula', 'Edição fotográfica e fotomontagens com os truques e técnicas usados por profissionais.'],
      ['Planta Humanizada', '32 h/aula', 'Plantas baixas decoradas no CorelDRAW, para arquitetos, engenheiros, decoradores e estudantes.'],
      ['Designer de Moda', '32 h/aula', 'Desenho técnico de moda e croquis femininos, masculinos e infantis, com forma, brilho, volume e textura.'],
    ] },
  { slug: 'programacao', nome: 'Programação e Vídeo', curto: 'Programação e vídeo', foto: 'f-2005-21', resumo: 'Delphi, Java, PHP, Web Design, Linux e Edição de Vídeo.',
    intro: 'Da lógica de programação ao desenvolvimento de sistemas e sites, além da edição de vídeo com prática de filmagem.',
    cursos: [
      ['Delphi', '72 h/aula', 'Lógica, algoritmos e sistemas comerciais em ambiente visual, com banco de dados e relatórios.'],
      ['Java', '144 h/aula', 'Introdução à programação, orientação a objetos, banco de dados MySQL e desenvolvimento de sistemas.'],
      ['PHP Básico', '32 h/aula', 'Programação voltada para a web: sistemas dinâmicos, sites colaborativos e banco de dados.'],
      ['Web Design', '96 h/aula', 'Criação de sites personalizados: planejamento, layout, HTML, CSS, JavaScript, PHP e MySQL.'],
      ['Linux', '6 semanas', 'Redes e compartilhamento de arquivos em software livre, com ênfase no modo comando. Aulas aos sábados ou domingos.'],
      ['Edição de Vídeo', '24 h/aula', 'Captura, edição, efeitos e montagem: 15 horas de laboratório e 9 horas de filmagem.'],
    ] },
  { slug: 'profissionalizantes', nome: 'Profissionalizantes', curto: 'Profissionalizantes', foto: 'f-2010-05', resumo: 'Operador de Micro, Secretariado, Administrativo, RH, Vendas, HP 12C e manutenção.',
    intro: 'Cursos livres presenciais, de curta duração, para quem quer entrar logo no mercado de trabalho ou precisa se atualizar às novas tecnologias adotadas nas empresas.',
    cursos: [
      ['Operador de Micro', '64 h/aula', 'O primeiro passo para trabalhar com o computador: processamento de dados, Windows e os principais aplicativos.'],
      ['Secretariado Informatizado', '160 h/aula', 'Informática para as rotinas de secretariado e administração.'],
      ['Auxiliar Administrativo', '', 'Informática e rotinas de escritório para entrar no mercado de trabalho.'],
      ['Departamento Pessoal e RH', '', 'Rotinas trabalhistas e previdenciárias do DP, com base na legislação atualizada.'],
      ['Profissional de Vendas', '32 h/aula', 'Negociação, relacionamento, postura, organização e planejamento para vender mais e melhor.'],
      ['Matemática Financeira HP 12C', '20 h/aula', 'Juros, descontos, taxas e rendas resolvidos na calculadora HP 12C.'],
      ['Montagem e Manutenção de Computadores', '', 'Hardware, setup, partições, configuração de placas e diagnóstico de defeitos.'],
      ['Manutenção de Celular', '48 h/aula', 'Montagem, desmontagem e solução de defeitos em aparelhos de várias marcas.'],
    ] },
  { slug: 'idiomas', nome: 'Idiomas', curto: 'Idiomas', foto: 'f-2005-22', resumo: 'Inglês, Inglês Técnico e Espanhol.',
    intro: 'Cursos com livro didático e recursos audiovisuais, para a vida profissional, os estudos e as viagens.',
    cursos: [
      ['Inglês', '240 h/aula', 'As quatro habilidades do idioma (falar, escrever, ouvir e ler) em seis módulos, com livro e livro de exercícios.'],
      ['Inglês Técnico', '100 h/aula', 'Leitura de manuais e textos técnicos de informática, vocabulário e técnicas de leitura.'],
      ['Espanhol', '120 h/aula', 'Enfoque comunicativo até o nível intermediário, com quadros comparativos para não confundir com o português.'],
    ] },
];
const TOTAL = CAT.reduce((s, c) => s + c.cursos.length, 0);
const LAB = ['Computadores interligados em rede', 'Ambiente climatizado', 'Acesso à internet', 'Equipamento de projeção (data show)', 'Quadro branco', 'Local para coffee break'];
const GAL = [
  ['2005', 'Laboratórios e alunos', ['f-2005-16', 'f-2005-19', 'f-2005-06', 'f-2005-02', 'f-2005-13', 'f-2005-05', 'f-2005-03', 'f-2005-01', 'f-2005-04', 'f-2005-07', 'f-2005-08', 'f-2005-09', 'f-2005-11', 'f-2005-14', 'f-2005-21', 'f-2005-22']],
  ['2006', 'Info 3ª Idade e estande em feira', ['f-2006-02', 'f-2006-04', 'f-2006-05', 'f-2006-06', 'f-2006-07', 'f-2006-08']],
  ['2010', 'Turmas no laboratório', ['f-2010-06', 'f-2010-01', 'f-2010-02', 'f-2010-03', 'f-2010-04', 'f-2010-05']],
];

const nav = [
  { slug: 'a-escola', nome: 'A escola' },
  { slug: 'cursos', nome: 'Cursos' },
  { slug: 'empresas', nome: 'Para empresas' },
  { slug: 'galeria', nome: 'Galeria' },
  { slug: 'contato', nome: 'Contato' },
];
const cores = { a: '#0B2E8A', b: '#0B2E8A' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Cursos, Treinamentos e Idiomas em Cascavel` : `${titulo} | Cendatica`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const ativo = (s, n) => s === n.slug || (n.slug === 'cursos' && CAT.some(c => c.slug === s));
function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('relogio')}Seg a sáb, 8h às 18h · seg a sex até 21h</span><span>${ic('tel')}<a href="${telHref(E.fone1)}">${E.fone1}</a> <i>/</i> <a href="${telHref(E.fone2)}">${E.fone2}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Cendatica Informática, página inicial">${LOGO()}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${ativo(s, n) ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}">Fazer inscrição</a>
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
    <div class="rod-marca">${LOGO('-branco')}<p>Cursos, treinamentos e idiomas no centro de Cascavel desde 1993. CENDATICA, o futuro, hoje.</p><a class="rede" href="${E.face}" target="_blank" rel="noopener">${ic('face')}Facebook</a></div>
    <div><h3>Cursos</h3><ul>${CAT.map(c => `<li><a href="${link(v, c.slug)}">${c.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Expediente</h3><ul class="rod-hor">${HORARIO.map(h => `<li><b>${h[0]}</b> ${h[1]}<br><span>${h[2]}</span></li>`).join('')}</ul></div>
    <div><h3>Fale conosco</h3><ul class="rod-dados"><li>${ic('tel')}<span><a href="${telHref(E.fone1)}">${E.fone1}</a><br><a href="${telHref(E.fone2)}">${E.fone2}</a></span></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li><li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}<br>CEP ${E.cep}</span></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© 1993 a ${new Date().getFullYear()} Cendatica Informática Ltda. Cursos, Treinamentos e Idiomas.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}
const opcoes = CAT.map(c => `<optgroup label="${c.nome}">${c.cursos.map(k => `<option>${k[0]}</option>`).join('')}</optgroup>`).join('');
const form = (assunto = 'Inscrição pelo site') => `<form class="form" data-email="${E.email}" data-assunto="${assunto}" novalidate>
  <label>Nome *<input name="nome" required autocomplete="name"></label>
  <div class="form-2"><label>Telefone *<input name="telefone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <div class="form-2"><label>Curso de interesse<select name="curso"><option>Ainda não sei</option>${opcoes}<option>Locação de laboratório</option><option>Projeto para instituição</option></select></label><label>Período<select name="periodo"><option>Manhã</option><option>Tarde</option><option>Noite</option><option>Sábado</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar</button>
</form>`;
const horario = (cls = '') => `<table class="horario ${cls}"><thead><tr><th>Período</th><th>Horário</th><th>Dias</th></tr></thead><tbody>${HORARIO.map(h => `<tr><th>${h[0]}</th><td>${h[1]}</td><td>${h[2]}</td></tr>`).join('')}</tbody></table>`;
const galeria = (nums, legenda) => `<div class="galeria">${nums.map(n => `<a class="sobe" href="/assets/img/${n}.webp" data-foto data-legenda="${esc(legenda)}">${img(n, legenda)}</a>`).join('')}</div>`;
const cursoCard = k => `<article class="curso sobe"><header><h3>${k[0]}</h3>${k[1] ? `<span class="ch">${k[1]}</span>` : ''}</header><p>${k[2]}</p></article>`;

function paginas(v, cab, home) {
  const pag = {};
  pag.index = head(v, 'index', '', `Cendatica Informática, no centro de Cascavel/PR desde 1993: ${TOTAL} cursos de informática, projetista, artes gráficas, programação, profissionalizantes e idiomas, com aulas práticas e início imediato.`) + topo(v, 'index') + home() + rodape(v);

  pag['a-escola'] = head(v, 'a-escola', 'A escola', 'A história da Cendatica Informática em Cascavel desde 1993 e o método professor/aluno.') + topo(v, 'a-escola') + cab('A escola', 'Desde 1993 formando para o mercado de trabalho', 'f-2005-19') + `
<div class="in">
<section class="texto-pag"><div class="sobe">${HIST.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${p}</p>`).join('')}</div><figure class="sobe">${img('f-2005-03', 'Equipe da Cendatica Informática no laboratório')}</figure></section>
<section class="nome-sec sobe"><p class="k">Você sabe o que significa Cendatica?</p><div class="nome">${NOME.map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="linha-sec"><header class="tit"><p class="k">Trajetória</p><h2>Da datilografia aos cursos de hoje</h2></header><ol class="linha">${LINHA.map(l => `<li class="sobe"><b>${l[0]}</b><span>${l[1]}</span></li>`).join('')}</ol></section>
<section class="metodo-pag"><figure class="sobe">${img('f-2005-08', 'Alunas no laboratório da Cendatica')}</figure><div class="sobe"><p class="k">Como funciona</p><h2>O método professor/aluno</h2>${METODO.map(p => `<p>${p}</p>`).join('')}${lista(['Aulas 100% práticas', 'Não depende de formação de turma', 'Início imediato, até no mesmo dia da inscrição'])}</div></section>
<p class="frase sobe">CENDATICA, o futuro, hoje. Inclusão digital.</p>
</div>
` + rodape(v);

  pag.cursos = head(v, 'cursos', 'Cursos', `Os ${TOTAL} cursos da Cendatica Informática em Cascavel: informática básica, projetista, artes gráficas, programação, profissionalizantes e idiomas.`) + topo(v, 'cursos') + cab('Cursos', `${TOTAL} cursos em seis áreas`, 'f-2010-01') + `
<div class="in">
<section class="cats-pag">${CAT.map(c => `<article class="cat-bloco sobe"><a class="cat-cab" href="${link(v, c.slug)}">${img(c.foto, c.nome)}<div><h2>${c.nome}</h2><p>${c.resumo}</p><span class="link-seta">Ver os cursos ${ic('seta')}</span></div></a><ul class="cat-lista">${c.cursos.map(k => `<li><a href="${link(v, c.slug)}">${k[0]}</a>${k[1] ? `<span>${k[1]}</span>` : ''}</li>`).join('')}</ul></article>`).join('')}</section>
<section class="cta-seg sobe"><div><h2>Não sabe qual escolher?</h2><p>Ligue ou mande uma mensagem: ajudamos a montar o caminho certo para o seu objetivo.</p></div><a class="btn" href="${link(v, 'contato')}">Falar com a Cendatica</a></section>
</div>
` + rodape(v);

  for (const c of CAT) {
    pag[c.slug] = head(v, c.slug, c.nome, `${c.nome} na Cendatica Informática, Cascavel: ${c.cursos.map(k => k[0]).join(', ')}.`) + topo(v, c.slug) + cab('Cursos', c.nome, c.foto) + `
<div class="in">
<section class="cat-pag"><div class="cat-txt"><p class="lead sobe">${c.intro}</p><div class="cursos">${c.cursos.map(cursoCard).join('')}</div></div>
<aside class="cat-lado sobe"><h2>Como funciona</h2><ol class="passos-mini">${PASSOS.map((p, i) => `<li><span>${i + 1}</span><div><b>${p[0]}</b><p>${p[1]}</p></div></li>`).join('')}</ol><a class="btn" href="${link(v, 'contato')}">Fazer inscrição</a><p class="lado-tel">${ic('tel')}<a href="${telHref(E.fone1)}">${E.fone1}</a></p>
<nav class="outras" aria-label="Outras áreas"><h3>Outras áreas</h3><ul>${CAT.filter(o => o !== c).map(o => `<li><a href="${link(v, o.slug)}">${o.nome}</a></li>`).join('')}</ul></nav></aside></section>
</div>
` + rodape(v);
  }

  pag.empresas = head(v, 'empresas', 'Para empresas e instituições', 'Locação de laboratórios de informática no centro de Cascavel (18 e 10 computadores) e projeto técnico de cursos para instituições.') + topo(v, 'empresas') + cab('Para empresas e instituições', 'Laboratórios e treinamentos sob medida', 'f-2010-03') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="k">Locação de laboratórios</p><h2>Espaço pronto para cursos, eventos, palestras e workshops</h2><p class="lead">Laboratórios com computadores interligados em rede, notebook, internet wireless, data show e acompanhamento individual dos participantes, em ambiente agradável e funcional.</p><p>Opções para 8, 12, 14, 16 ou 18 participantes, com um participante por computador. O custo depende dos dias e das horas de uso do espaço e dos equipamentos, e o cliente define a melhor solução para a sua necessidade.</p></div><figure class="sobe">${img('f-2005-06', 'Laboratório de informática da Cendatica')}</figure></section>
<section class="labs"><article class="lab sobe"><span class="lab-n">18</span><div><h3>Laboratório A</h3><p>18 computadores</p></div></article><article class="lab sobe"><span class="lab-n">10</span><div><h3>Laboratório B</h3><p>10 computadores</p></div></article><article class="lab-itens sobe"><h3>Incluído</h3>${lista(LAB)}<p class="nota">Reserva com 30 dias de antecedência.</p></article></section>
<section class="local-emp sobe"><div><p class="k">Localização</p><h2>No centro de Cascavel</h2><p>Acesso por ônibus, estacionamento interno em horário comercial e noturno, local iluminado e perto de restaurantes, lanchonetes, bancos, shopping center e hotéis.</p></div></section>
<section class="texto-pag inv"><figure class="sobe">${img('f-2006-07', 'Estande da Cendatica em feira')}</figure><div class="sobe"><p class="k">Projeto técnico</p><h2>Cursos de informática para instituições</h2><p>A revolução de conhecimentos trazida pela informática exige que as instituições se adaptem rápido às novas tecnologias. Com a experiência em cursos desde 1993, a Cendatica oferece seus serviços a instituições que buscam soluções diferenciadas, com metodologia atual e foco em preparar o aluno para o mercado de trabalho.</p><a class="btn" href="${link(v, 'contato')}">Solicitar proposta</a></div></section>
</div>
` + rodape(v);

  pag.galeria = head(v, 'galeria', 'Galeria', 'Fotos da Cendatica Informática: laboratórios, alunos, turmas e eventos.') + topo(v, 'galeria') + cab('Seu espaço', 'Galeria de fotos', '') + `
<div class="in galeria-pag">${GAL.map(g => `<section><header class="gal-cab"><b>${g[0]}</b><span>${g[1]}</span></header>${galeria(g[2], `${g[1]}, ${g[0]}`)}</section>`).join('')}</div>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Fale conosco', `Cendatica Informática: ${E.rua}, ${E.bairro}, ${E.cidade}. Telefones ${E.fone1} e ${E.fone2}.`) + topo(v, 'contato') + cab('Fale conosco', 'Inscrições e informações', '') + `
<div class="in"><section class="contato-pag">
  <div class="sobe"><ul class="contato-dados"><li>${ic('tel')}<div><span>Telefones</span><a href="${telHref(E.fone1)}">${E.fone1}</a><br><a href="${telHref(E.fone2)}">${E.fone2}</a></div></li><li>${ic('mail')}<div><span>E-mail</span><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('pin')}<div><span>Endereço</span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</div></li></ul>
  <h2 class="h-hor">Expediente</h2>${horario()}
  <iframe class="mapa" title="Mapa da Cendatica Informática" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua São Paulo, 1169, Centro, Cascavel PR')}&z=16&output=embed"></iframe></div>
  <div class="form-caixa sobe"><h2>Faça sua inscrição</h2><p>Escolha o curso e o período. O seu e-mail abre com a mensagem pronta para a Cendatica.</p>${form()}</div>
</section></div>
` + rodape(v);
  return pag;
}

// ---------- A "Rede": azul do logo, fachada de 2005 na abertura, áreas de curso em cartões ----------
function A() {
  const v = 'a';
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div>${foto ? `<figure>${img(foto, '', ' loading="eager"')}</figure>` : ''}</div></section>`;
  return paginas(v, cab, () => `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Cursos · Treinamentos · Idiomas</p><h1>${SLOGAN}</h1><p>Informática, projetos, programação, profissionalizantes e idiomas no centro de Cascavel desde 1993, com aulas práticas e professor acompanhando cada aluno.</p><p class="bts"><a class="btn" href="${link(v, 'cursos')}">Ver os cursos</a><a class="btn btn-linha" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a></p></div>
  <div class="hero-a-fotos"><figure class="ha1">${img('f-2005-16', 'Fachada da Cendatica Informática', ' loading="eager" fetchpriority="high"')}</figure><figure class="ha2">${img('f-2010-06', 'Turma de alunos da Cendatica', ' loading="eager"')}</figure></div>
</div></section>
<section class="nums-a"><div class="in nums-in"><div><b>1993</b><span>ano de fundação</span></div><div><b>${TOTAL}</b><span>cursos em 6 áreas</span></div><div><b>2</b><span>laboratórios (18 e 10 micros)</span></div><div><b>3</b><span>turnos, de manhã à noite</span></div></div></section>
<section class="in cats-a"><header class="tit"><p class="k">Cursos</p><h2>Escolha a sua área</h2></header>
  <div class="cats">${CAT.map(c => `<a class="cat sobe" href="${link(v, c.slug)}">${img(c.foto, c.nome)}<div><h3>${c.nome}</h3><p>${c.cursos.map(k => k[0]).join(' · ')}</p><span class="link-seta">${c.cursos.length} cursos ${ic('seta')}</span></div></a>`).join('')}</div>
</section>
<section class="metodo-a"><div class="in metodo-a-in"><div class="sobe"><p class="k">Método professor/aluno</p><h2>Sem esperar turma. Se tem vaga no horário, você começa hoje.</h2><p>${METODO[0]}</p><ol class="passos-a">${PASSOS.map((p, i) => `<li><span>${i + 1}</span><div><b>${p[0]}</b><p>${p[1]}</p></div></li>`).join('')}</ol></div><figure class="sobe">${img('f-2005-14', 'Alunos com o professor no laboratório')}</figure></div></section>
<section class="in emp-a"><figure class="sobe">${img('f-2005-13', 'Laboratório de informática da Cendatica')}</figure><div class="sobe"><p class="k">Para empresas</p><h2>Laboratórios para treinamentos, palestras e workshops</h2><p>Laboratório A com 18 computadores e Laboratório B com 10, em rede, climatizados, com projeção e quadro branco. Também montamos projetos de cursos para instituições.</p><a class="link-seta" href="${link(v, 'empresas')}">Locação e projeto técnico ${ic('seta')}</a></div></section>
<section class="hor-a"><div class="in hor-a-in"><div><p class="k">Expediente</p><h2>Aulas de manhã, à tarde e à noite</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Fazer inscrição</a><a class="btn btn-linha-cl" href="${telHref(E.fone2)}">${ic('tel')}${E.fone2}</a></p></div>${horario('hor-cl')}</div></section>
`);
}

// ---------- B "Didática": o nome CEN·DAT·ICA na abertura, laranja das paredes do laboratório, catálogo em índice ----------
function B() {
  const v = 'b';
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div>${foto ? `<figure>${img(foto, '', ' loading="eager"')}</figure>` : ''}</div></section>`;
  return paginas(v, cab, () => `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><div class="nome nome-hero">${NOME.map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div><h1>Cursos, treinamentos e idiomas no centro de Cascavel.</h1><p>${SLOGAN}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Fazer inscrição</a><a class="btn btn-linha" href="${link(v, 'cursos')}">Todos os ${TOTAL} cursos</a></p></div>
  <figure class="hero-b-foto">${img('f-2005-19', 'Laboratório da Cendatica com paredes laranja', ' loading="eager" fetchpriority="high"')}<figcaption>Desde 3 de março de 1993</figcaption></figure>
</div></section>
<section class="passos-b"><div class="in"><header class="tit"><p class="k">Método professor/aluno</p><h2>Como começar</h2></header><ol class="passos-b-l">${PASSOS.map((p, i) => `<li class="sobe"><span>0${i + 1}</span><b>${p[0]}</b><p>${p[1]}</p></li>`).join('')}</ol></div></section>
<section class="in indice-b"><header class="tit"><p class="k">Catálogo</p><h2>Índice de cursos</h2></header>
  <div class="indice">${CAT.map(c => `<section class="ind sobe"><h3><a href="${link(v, c.slug)}">${c.nome}</a></h3><ul>${c.cursos.map(k => `<li><a href="${link(v, c.slug)}"><span>${k[0]}</span><i></i><em>${k[1] || 'consulte'}</em></a></li>`).join('')}</ul></section>`).join('')}</div>
</section>
<section class="fotos-b"><div class="in fotos-b-in">${[['f-2005-01', 'Aula de informática'], ['f-2006-02', 'Info 3ª Idade'], ['f-2010-04', 'Turma de 2010'], ['f-2005-03', 'Equipe Cendatica']].map((f, i) => `<figure class="fb${i} sobe">${img(f[0], f[1])}<figcaption>${f[1]}</figcaption></figure>`).join('')}</div><p class="in fotos-b-link"><a class="link-seta" href="${link(v, 'galeria')}">Ver a galeria ${ic('seta')}</a></p></section>
<section class="in emp-b"><div class="sobe"><p class="k">Para empresas e instituições</p><h2>Alugue um laboratório</h2><p>Para cursos, eventos, palestras e workshops, com opções de 8 a 18 participantes.</p><a class="link-seta" href="${link(v, 'empresas')}">Saiba mais ${ic('seta')}</a></div><div class="labs-b sobe"><div><b>18</b><span>micros no Laboratório A</span></div><div><b>10</b><span>micros no Laboratório B</span></div></div></section>
<section class="hor-b"><div class="in hor-b-in"><div><p class="k">Expediente</p><h2>Escolha o seu horário</h2><ul class="contato-mini"><li>${ic('tel')}<a href="${telHref(E.fone1)}">${E.fone1}</a> / <a href="${telHref(E.fone2)}">${E.fone2}</a></li><li>${ic('pin')}<span>${E.rua}, ${E.bairro}, ${E.cidade}</span></li></ul></div>${horario()}</div></section>
`);
}

copiarSiteJs(pub, '');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8') + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Cendatica', artigo: 'da', url: E.url, lang: 'pt', cor: '#F07A2A', fundo: '#0B2E8A', claro: '#F3F6FC',
  fonteTitulo: "'Fira Sans',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Rede', paginas: 12, texto: `Azul do logo com a fachada da escola e uma turma na abertura, as seis áreas de curso em cartões, o método professor/aluno e o expediente.`, pontos: ['Logo redesenhado em vetor', `${TOTAL} cursos com carga horária`, 'Inscrição pelo site'] },
    { letra: 'b', nome: 'Didática', paginas: 12, texto: 'O significado do nome (Centro, Didática, Informática) na abertura, o laranja das paredes do laboratório e o catálogo como um índice de cursos.', pontos: ['Como começar em 3 passos', 'Índice com todos os cursos', 'Laboratórios para empresas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
