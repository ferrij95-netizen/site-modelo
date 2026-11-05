// Colégio Elo, São José dos Campos/SP: do berçário (Elo Kids) ao Ensino Médio, sistema SAS, três unidades. Gera public/{a,b}/ e a página de escolha.
// node clientes/colegioelo/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs colegioelo https://colegioelo.sjc.br/)
// Textos do site atual (colegioelo.sjc.br, /ensino-medio) e do site novo da Elo Kids (elokidssjc.com.br); fotos dos dois, em webp.
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Colégio Elo', url: 'https://colegioelo.overtus.com.br/', antigo: 'https://colegioelo.sjc.br/',
  fone: '(12) 3904-7080', whats: '(12) 99655-5886', wa: '5512996555886',
  email: 'contato@colegioelo.sjc.br', email2: 'diretoria@colegioelo.sjc.br',
  insta: 'https://www.instagram.com/colegio.elo/', face: 'https://www.facebook.com/colegioelo/', blog: 'http://www.blog.colegioelo.sjc.br',
  kids: 'https://elokidssjc.com.br', portal: 'http://187.75.157.31:80/sg_web/Acesso.aspx?ReturnUrl=%2fsg_web%2fdefault.aspx%3fescola%3d4635&escola=4635',
};
const DOCS = 'https://www.colegioelo.sjc.br/imagens/informativos/';
const FONTES = 'https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Mulish:wght@400;500;600;700;800&display=swap';
const LOGO = `<img class="logo" src="/assets/img/logo.webp" alt="Colégio Elo" width="160" height="160">`;
const DIM = { fachada: [1200, 820], oriente: [837, 1024], 'oriente-largo': [1600, 900], robotica: [620, 350], 'kids-muro': [1200, 900], 'k-fachada': [1195, 896] };
const img = (n, alt, extra = '') => { const d = DIM[n] || (n.startsWith('dep-') ? [300, 360] : [720, 900]); return `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async" width="${d[0]}" height="${d[1]}"${extra}>`; };
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const WAMSG = 'Olá, gostaria de mais informações sobre o Colégio Elo.';

const UNIDADES = [
  { nome: 'Vila Bethânia', rua: 'Alameda Cândido Marciano Leite, 65', bairro: 'Vila Bethânia, São José dos Campos - SP', cep: '12245-486', fones: ['(12) 3904-7080'], whats: '(12) 99655-5886', wa: '5512996555886', foto: 'fachada', texto: 'A sede do colégio, com cerca de 5 mil m² de instalações e a quadra coberta por 90 placas solares.' },
  { nome: 'Shopping Jardim Oriente', rua: 'Rua Andorra, 500, Loja C2 A', bairro: 'Jardim América, São José dos Campos - SP', cep: '12235-050', fones: ['(12) 3570-0077'], whats: '(12) 98898-0835', wa: '5512988980835', foto: 'oriente', texto: 'Unidade do Ensino Médio, no Shopping Jardim Oriente.' },
  { nome: 'Elo Kids', rua: 'Av. Eng. Francisco José Longo, 414', bairro: 'Jardim São Dimas, São José dos Campos - SP', cep: '12245-000', fones: ['(12) 3943-4450', '(12) 3922-1314'], whats: '(12) 99613-2229', wa: '5512996132229', foto: 'k-fachada', texto: 'Berçário e educação infantil, de 4 meses a 5 anos e 11 meses, com o Elo Baby em prédio exclusivo.' },
];
const SEGMENTOS = [
  { slug: 'educacao-infantil', nome: 'Educação Infantil', idade: '4 meses a 5 anos', texto: 'Na Elo Kids: berçário em unidade exclusiva, proposta construtivista, aulas extras desde o berçário e cardápio zero açúcar.', foto: 'k-turma' },
  { slug: 'ensino-fundamental', nome: 'Ensino Fundamental', idade: '1º ao 9º ano', texto: 'Sistema de Ensino SAS, robótica e imersão em inglês, com apoio socioemocional e ferramentas tecnológicas.', foto: 'robotica' },
  { slug: 'ensino-medio', nome: 'Ensino Médio', idade: '1ª à 3ª série', texto: 'Formação geral pela manhã, trilhas de aprendizagem à tarde, Projeto de Vida e simulados ENEM, FUVEST e UNICAMP.', foto: 'oriente-largo' },
];
const DIFER = [
  ['Sistema de Ensino SAS', 'Primeiro colégio do estado de São Paulo a adotar o Sistema Ari de Sá, presente há mais de 30 anos no mercado.'],
  ['Robótica', 'O estudo dos comandos feitos por computadores junto à engenharia realizada nos robôs.'],
  ['Imersão em inglês', 'A criança ou o adolescente aprende a se comunicar como se estivesse num ambiente estrangeiro.'],
  ['Energia 100% renovável', 'Primeira escola do Vale do Paraíba a usar 100% de energia renovável: 90 placas fotovoltaicas sobre a quadra.'],
];
const DEPO = [
  ['dep-bruno', 'Bruno Willians', 'Formado em 2015', 'Desde a 6ª série até me formar no ensino médio, pude conviver com o verdadeiro significado da palavra excelência em educação! Tínhamos uma relação muito próxima com os professores, inspetores e diretor. Na Elo eu pude expandir meus conhecimentos e valores, que me prepararam para o ensino superior e para a vida.'],
  ['dep-larissa', 'Larissa', 'Formada em 2017', 'Além da educação de excelente qualidade, a Elo tem um olhar humanizado para as diferenças e individualidades dos alunos e a preocupação em ser uma instituição sustentável e amiga do meio ambiente. Recomendo a escola para todos que têm o futuro e a felicidade de seus filhos como prioridade.'],
  ['dep-ighor', 'Ighor de Mello', 'Aluno do 3º Médio, 2019', 'O colégio é muito forte, e bem puxado, mas dá para entrar no ritmo, e tudo isso vale a pena lá no futuro. Todos os funcionários, não só os professores, são muito atenciosos: você pode contar com eles para o que precisar.'],
];
const TRILHAS = [
  ['1ª série', [['Matemática e suas tecnologias', 'Fechando a conta', 'desenvolvendo consciência financeira'], ['Linguagens e suas tecnologias', 'Muito além da influência', 'argumentação na linguagem'], ['Ciências humanas e sociais aplicadas', 'Mundo em movimento', 'explorando fatos e contextos'], ['Ciências da natureza e suas tecnologias', 'Ambiente-se', 'escolhas de hoje para viver o amanhã']]],
  ['2ª série', [['Linguagens e suas tecnologias', 'Eu, tu, nós e quem mais?', 'literatura e arte'], ['Matemática e suas tecnologias', 'Residências sustentáveis', 'arquitetando um projeto STEM'], ['Ciências da natureza e suas tecnologias', 'Mens sana in corpore sano?', 'mente, corpo e ciência'], ['Ciências humanas e sociais aplicadas', 'Os antigos, os clássicos e os esquecidos', 'economia, sociedade e cultura']]],
];
const PROJ_VIDA = ['Orientações de estudo coletivas e individuais', 'Palestras e rodas de conversa para montar uma rotina de estudo eficiente, equilibrando estudo, lazer, atividade física e responsabilidades', 'Direcionamento profissional, inteligência emocional e organização acadêmica e pessoal', 'Projeto "Conhecendo o futuro": profissionais conversam com os alunos sobre cada profissão', 'Simulados ENEM, FUVEST e UNICAMP durante todo o 3º Médio'];
const KIDS_EXTRAS = ['Ballet', 'Capoeira', 'Educação Física', 'Futebol', 'Inglês', 'Musicalização'];
const KIDS_PROJ = [
  ['Culinária', 'As crianças elaboram receitas, servem refeições, compartilham utensílios e ajudam os colegas: habilidades sociais aprendidas com diversão.', 'k-culinaria'],
  ['Horta', 'Os alunos participam de todas as etapas do cultivo, da plantação à colheita e degustação. O que é produzido vai para a culinária e o cardápio.', 'k-horta'],
  ['Socioemocional', 'Empatia, relacionamentos saudáveis e a capacidade de lidar com os desafios da vida.', 'k-pintura'],
  ['Educação Física', 'Correr, saltar, lateralidade e noção de espaço, com modalidades esportivas e campeonatos.', 'k-edfisica'],
];
const DOCS_MAT = ['Cópia simples da certidão de nascimento', 'Cópia simples do RG do aluno', 'Cópia simples do CPF e RG do responsável pela matrícula', 'Declaração de transferência', 'Cópia do histórico escolar do 9º ano (para o Ensino Médio)'];
const MISSAO = 'Proporcionar aos alunos, através da educação, a consciência dos direitos e deveres que contribuem com a formação de cidadãos no que se refere ao potencial intelectual, social e emocional, contribuindo para o desenvolvimento da autonomia, solidariedade e ações inovadoras.';
const VISAO = 'Aprimorar-se cada vez mais para oferecer um ensino de qualidade e que, ao final do Ensino Médio, os alunos atinjam um alto desempenho no ENEM e nos vestibulares, ingressando nas universidades almejadas.';
const VALORES = 'Conhecimento, autonomia e cooperação permeiam a prática pedagógica da escola. A integração do conhecimento com a dinâmica da sociedade e da cultura colabora na construção de relações solidárias, sustentáveis e autônomas.';

const nav = [
  { slug: 'a-escola', nome: 'A escola' },
  { slug: 'educacao-infantil', nome: 'Educação Infantil' },
  { slug: 'ensino-fundamental', nome: 'Fundamental' },
  { slug: 'ensino-medio', nome: 'Ensino Médio' },
  { slug: 'unidades', nome: 'Unidades' },
  { slug: 'matricula', nome: 'Matrícula' },
  { slug: 'contato', nome: 'Contato' },
];
const cores = { a: '#1F1956', b: '#0072BE' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Colégio Elo | Do berçário ao Ensino Médio em São José dos Campos' : `${titulo} | Colégio Elo`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a><i>·</i>${icWa()}<a href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${E.whats}</a></span><span class="faixa-links"><a href="${E.portal}" target="_blank" rel="noopener">Área dos pais</a><a href="${E.portal}" target="_blank" rel="noopener">Área dos professores</a><a href="${E.blog}" target="_blank" rel="noopener">Blog</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Colégio Elo, página inicial">${LOGO}<span>Colégio Elo<small>São José dos Campos</small></span></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}">Agende uma visita</a>
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
    <div class="rod-marca">${LOGO}<p>Do berçário ao Ensino Médio em São José dos Campos, com o Sistema de Ensino SAS.</p><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>O colégio</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Unidades</h3><ul class="rod-un">${UNIDADES.map(u => `<li><b>${u.nome}</b><span>${u.rua}</span><a href="${telHref(u.fones[0])}">${u.fones[0]}</a></li>`).join('')}</ul></div>
    <div><h3>Fale conosco</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${icWa()}<a href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${E.whats}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Elo Educacional</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const form = () => `<form class="form" data-wa="Olá! Quero agendar uma visita ao Colégio Elo." novalidate>
  <label>Nome do responsável *<input name="nome" required autocomplete="name"></label>
  <div class="form-2"><label>Telefone *<input name="telefone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <div class="form-2"><label>Segmento<select name="segmento"><option>Berçário (Elo Baby)</option><option>Educação Infantil</option><option>Ensino Fundamental</option><option>Ensino Médio</option></select></label><label>Unidade<select name="unidade">${UNIDADES.map(u => `<option>${u.nome}</option>`).join('')}</select></label></div>
  <label>Assunto<select name="assunto"><option>Matrículas</option><option>Agendar uma visita</option><option>Dúvidas</option><option>Outros</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const galeria = (nums, cls = 'galeria') => `<div class="${cls}">${nums.map(n => `<a class="sobe" href="/assets/img/${n[0]}.webp" data-foto data-legenda="${esc(n[1])}">${img(n[0], n[1])}</a>`).join('')}</div>`;
const trilhas = () => TRILHAS.map(t => `<div class="trilha-bloco"><h3>Trilhas da ${t[0]}</h3><div class="trilhas">${t[1].map(x => `<article class="trilha sobe"><span>${x[0]}</span><b>${x[1]}</b><p>${x[2]}</p></article>`).join('')}</div></div>`).join('');
const depo = () => `<div class="depos">${DEPO.map(d => `<figure class="depo sobe">${img(d[0], d[1])}<blockquote>“${d[3]}”</blockquote><figcaption><b>${d[1]}</b>${d[2]}</figcaption></figure>`).join('')}</div>`;
const unidadesCards = v => `<div class="unidades">${UNIDADES.map(u => `<article class="unid sobe">${img(u.foto, `Unidade ${u.nome}`)}<div><h3>${u.nome}</h3><p>${u.texto}</p><p class="unid-end">${ic('pin')}<span>${u.rua}<br>${u.bairro}</span></p><p class="unid-fone">${ic('tel')}<span>${u.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join(' · ')}</span></p><p class="unid-fone">${icWa()}<a href="${waHref(u.wa, WAMSG)}" target="_blank" rel="noopener">${u.whats}</a></p></div></article>`).join('')}</div>`;
const cta = v => `<section class="cta-seg sobe"><div><h2>Venha conhecer o Colégio Elo</h2><p>Agende um horário e conheça a estrutura e a equipe.</p></div><p class="bts"><a class="btn" href="${link(v, 'contato')}">Agendar visita</a><a class="btn btn-linha" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${icWa()}WhatsApp</a></p></section>`;

function paginas(v, cab, home) {
  const pag = {};
  pag.index = head(v, 'index', '', 'Colégio Elo, em São José dos Campos: do berçário ao Ensino Médio, Sistema de Ensino SAS, robótica, imersão em inglês e energia 100% renovável. Três unidades.') + topo(v, 'index') + home() + rodape(v);

  pag['a-escola'] = head(v, 'a-escola', 'A escola', 'A história do Colégio Elo, nascido como cooperativa de pais, missão, visão, valores, proposta pedagógica com o SAS e energia 100% renovável.') + topo(v, 'a-escola') + cab('A escola', 'Nascida de uma cooperativa de pais', 'fachada') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">A Escola Elo, antes conhecida como Escola Livre Opção, surgiu como uma cooperativa de pais que buscavam boa educação para os filhos com preço justo.</p><p>O crescimento da escola levou a instalações cada vez maiores, sem afastar o compromisso com o modelo didático implantado, que permanece intacto. A Elo foi a primeira escola do estado de São Paulo a adotar o Sistema Ari de Sá.</p><p>O colégio busca reconhecer os estudantes por suas potencialidades: a prática educacional desenvolve o protagonismo, a autonomia e o desenvolvimento singular de cada um, com apoio socioemocional e ferramentas tecnológicas.</p></div><figure class="sobe">${img('fachada', 'Fachada do Colégio Elo na Vila Bethânia')}</figure></section>
<section class="mvv">${[['Missão', MISSAO], ['Visão', VISAO], ['Valores', VALORES]].map((m, i) => `<article class="mv${i} sobe"><h2>${m[0]}</h2><p>${m[1]}</p></article>`).join('')}</section>
<section class="proposta sobe"><div><p class="k">Proposta pedagógica</p><h2>Gestão pedagógica baseada em dados</h2></div><div><p>A proposta é uma gestão que viabiliza a evolução efetiva do resultado pedagógico por meio do PDCA, um método interativo de melhoria contínua.</p><p>A Plataforma Educacional SAS dá ferramentas para que toda a comunidade escolar reflita constantemente sobre a prática pedagógica: as avaliações fornecem dados que viram diagnósticos e orientam planos de ação.</p></div></section>
<section class="energia sobe"><div class="energia-num"><b>90</b><span>placas fotovoltaicas</span></div><div><p class="k">Energia sustentável</p><h2>Primeira escola do Vale do Paraíba com 100% de energia renovável</h2><p>As placas instaladas sobre a quadra geram mais de 20.000 W no horário de pico. Com isso, o colégio contribui com o plantio de cerca de uma árvore por dia e deixa de produzir 500 kg de gás carbônico.</p></div></section>
<section class="manual sobe"><div><p class="k">Manual do estudante</p><h2>Uma educação neo-humanista</h2><p>O compromisso da Elo com pais, alunos, professores e funcionários é uma educação fundamentada nas relações pessoais e interpessoais e em valores como o respeito, o afeto, a conquista da autonomia e o desenvolvimento intelectual. O manual traz as regras da rotina escolar.</p></div><a class="btn" href="${DOCS}manual-estudande.pdf" target="_blank" rel="noopener">${ic('livro')}Baixar o manual</a></section>
${cta(v)}
</div>
` + rodape(v);

  pag['educacao-infantil'] = head(v, 'educacao-infantil', 'Educação Infantil', 'Elo Kids: berçário e educação infantil de 4 meses a 5 anos e 11 meses em São José dos Campos, com o Elo Baby, aulas extras e cardápio zero açúcar.') + topo(v, 'educacao-infantil') + cab('Educação Infantil · Elo Kids', 'O elo com o aprendizado começa aqui', 'k-fachada') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">A Elo Kids foi projetada para acolher crianças de 4 meses a 5 anos e 11 meses, com uma proposta construtivista e um aprendizado cheio de cuidado, segurança e carinho.</p><p>Um lugar para que pais e escola construam um elo e apoiem uns aos outros no crescimento das crianças, respeitando o tempo de aprendizagem de cada uma.</p>${lista(['Mais de 1.400 m² pensados para crianças', 'Quatro parques, espaço verde e mini quadra coberta', 'Salas amplas e adaptadas por faixa etária', 'Meio período, integral e horários combinados com a família'])}<a class="link-seta" href="${E.kids}" target="_blank" rel="noopener">Site da Elo Kids ${ic('ext')}</a></div><figure class="sobe">${img('k-turma', 'Turma da Elo Kids')}</figure></section>
<section class="baby sobe"><figure>${img('k-elobaby', 'Unidade Elo Baby')}</figure><div><p class="k">Unidade exclusiva do berçário I</p><h2>Elo Baby, a partir de 4 meses</h2><p>Tudo foi pensado para os bebês: caminhas individuais, lactário, trocadores, piso emborrachado, salas com temperatura e iluminação controladas e uma proporção de adultos por criança que permite colo, atenção e rotina de verdade.</p>${lista(['Ambiente na escala do bebê', 'Rotina de sono e alimentação sem a movimentação das turmas maiores', 'Equipe dedicada à primeira infância', 'Aulas extras já no berçário'])}</div></section>
<section class="kids-proj"><header class="tit"><p class="k">Projetos Elo e aulas extras</p><h2>Muito além da sala de aula</h2><p>Aulas extras desde o berçário: ${KIDS_EXTRAS.join(', ')}. Inglês pelo programa bilíngue PES English.</p></header><div class="kproj">${KIDS_PROJ.map(p => `<article class="sobe">${img(p[2], p[0])}<h3>${p[0]}</h3><p>${p[1]}</p></article>`).join('')}</div></section>
<section class="zero sobe"><div class="zero-selo"><b>Zero</b><span>açúcar</span></div><div><p class="k">Alimentação saudável</p><h2>Feito na hora, todos os dias</h2><p>Refeições balanceadas com menu da nutricionista, preparadas na cozinha da escola com ingredientes frescos. Do berçário ao Infantil II, o cardápio é zero açúcar: da fruta ao bolo da tarde, tudo sem açúcar refinado.</p></div></section>
${galeria([['k-ballet', 'Ballet'], ['k-capoeira', 'Capoeira'], ['k-musica', 'Musicalização'], ['k-sensorial', 'Atividade sensorial'], ['k-bercario', 'Berçário'], ['k-roda', 'Roda com a turma']], 'galeria g6')}
${cta(v)}
</div>
` + rodape(v);

  pag['ensino-fundamental'] = head(v, 'ensino-fundamental', 'Ensino Fundamental', 'Ensino Fundamental no Colégio Elo: Sistema de Ensino SAS, robótica, imersão em inglês e apoio socioemocional em São José dos Campos.') + topo(v, 'ensino-fundamental') + cab('Ensino Fundamental', 'Lições que levamos para a vida toda', 'robotica') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">O Ensino Fundamental prioriza o processo de ensino e aprendizagem como ressignificação do conhecimento, o desenvolvimento pleno das potencialidades do aluno e sua inserção no ambiente social.</p><p>Além do ensino de qualidade, oferecemos apoio socioemocional e ferramentas tecnológicas para alavancar os estudos. Os alunos não aprendem apenas as matérias do currículo: têm acesso a vivências que transformam a aprendizagem em descobertas para a vida.</p></div><div class="numeros sobe"><div><b>5 mil m²</b><span>de instalações</span></div><div><b>30</b><span>aulas semanais</span></div><div><b>100%</b><span>energia renovável</span></div></div></section>
<section class="difer">${DIFER.map((d, i) => `<article class="d${i} sobe"><span class="n">0${i + 1}</span><h3>${d[0]}</h3><p>${d[1]}</p></article>`).join('')}</section>
<section class="texto-pag inv"><figure class="sobe">${img('robotica', 'Robótica no Colégio Elo')}</figure><div class="sobe"><p class="k">Robótica e imersão em inglês</p><h2>Cursos independentes, com vagas limitadas</h2><p>A imersão em inglês faz com que a criança ou o adolescente consiga se comunicar como se estivesse num ambiente estrangeiro. A robótica une o estudo dos comandos feitos por computadores à engenharia dos robôs.</p><a class="btn" href="${link(v, 'contato')}">Quero saber mais</a></div></section>
${cta(v)}
</div>
` + rodape(v);

  pag['ensino-medio'] = head(v, 'ensino-medio', 'Ensino Médio', 'Ensino Médio do Colégio Elo: formação geral pela manhã, trilhas de aprendizagem à tarde, Projeto de Vida, oficinas de redação e matemática e simulados.') + topo(v, 'ensino-medio') + cab('Ensino Médio', 'A mudança começa por você', 'oriente-largo') + `
<div class="in">
<section class="pilares4 sobe">${['Aprender a conhecer', 'Aprender a fazer', 'Aprender a conviver', 'Aprender a ser'].map(x => `<b>${x}</b>`).join('')}</section>
<section class="texto-pag"><div class="sobe"><p class="lead">Nosso objetivo é formar, informar e despertar no aluno uma postura de valorização do estudo e da vida, para a construção da cidadania e da criticidade.</p><p>A metodologia SAS prepara o aluno para excelentes resultados no ENEM e nos vestibulares e desenvolve a formação crítica: não preparamos os estudantes só para uma prova, mas para os desafios do século XXI.</p></div><div class="estrutura sobe"><p class="k">Estrutura</p><h2>Manhã e tarde</h2><p>Pela manhã, todas as disciplinas da formação geral básica. À tarde, três vezes por semana, os alunos escolhem duas trilhas de aprendizagem e têm Projeto de Vida e Educação Física.</p></div></section>
<section class="trilhas-sec"><header class="tit"><p class="k">Trilhas de aprendizagem</p><h2>O aluno escolhe o caminho</h2></header>${trilhas()}</section>
<section class="oficinas">${[['Oficina de redação', 'Os alunos sanam as dificuldades individualmente, com toda a atenção do professor, e se preparam para as redações do ENEM e dos vestibulares.'], ['Aprofundamento de Matemática e Física', 'Desperta o interesse pelas ciências, desenvolve o raciocínio lógico e motiva a escolha por carreiras científicas e tecnológicas.'], ['Projetos de aprendizagem', 'Muitos sugeridos pelos próprios alunos, para ampliar a visão de mundo e desenvolver habilidades acadêmicas e pessoais.']].map(o => `<article class="sobe"><h3>${o[0]}</h3><p>${o[1]}</p></article>`).join('')}</section>
<section class="projvida sobe"><div><p class="k">Projeto de Vida</p><h2>O aluno no centro da própria história</h2></div>${lista(PROJ_VIDA)}</section>
<section class="depo-sec"><header class="tit"><p class="k">Depoimentos</p><h2>O que os alunos falam da Elo</h2></header>${depo()}</section>
${cta(v)}
</div>
` + rodape(v);

  pag.unidades = head(v, 'unidades', 'Unidades', 'As três unidades do Colégio Elo em São José dos Campos: Vila Bethânia, Shopping Jardim Oriente e Elo Kids.') + topo(v, 'unidades') + cab('Unidades', 'Três unidades em São José dos Campos', '') + `
<div class="in">
<section class="un-pag">${unidadesCards(v)}</section>
${cta(v)}
</div>
` + rodape(v);

  pag.matricula = head(v, 'matricula', 'Matrícula', 'Matrículas abertas no Colégio Elo: documentos necessários, material escolar e regimento.') + topo(v, 'matricula') + cab('Matrículas abertas', 'Do berçário ao Ensino Médio', 'k-tatame') + `
<div class="in">
<section class="mat-pag"><div class="sobe"><h2>Documentos para matrícula</h2>${lista(DOCS_MAT)}<p class="bts"><a class="btn" href="${waHref(E.wa, 'Olá! Quero fazer a matrícula no Colégio Elo.')}" target="_blank" rel="noopener">${icWa()}Fazer matrícula</a></p></div>
<div class="mat-docs"><article class="sobe">${ic('livro')}<h3>Material escolar</h3><p>Cada turma tem sua lista. Peça à secretaria para enviar a lista por e-mail ou retirar na escola.</p><a class="link-seta" href="mailto:${E.email}?subject=Lista%20de%20material">Pedir a lista ${ic('seta')}</a></article><article class="sobe">${ic('livro')}<h3>Regimento escolar</h3><p>As regras e o funcionamento do colégio.</p><a class="link-seta" href="${DOCS}regimento.pdf" target="_blank" rel="noopener">Baixar o regimento (PDF) ${ic('seta')}</a></article><article class="sobe">${ic('livro')}<h3>Manual do estudante</h3><p>Leitura importante para pais e alunos.</p><a class="link-seta" href="${DOCS}manual-estudande.pdf" target="_blank" rel="noopener">Baixar o manual (PDF) ${ic('seta')}</a></article></div></section>
${cta(v)}
</div>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Colégio Elo: ${E.fone}, WhatsApp ${E.whats}, ${E.email}. Unidades Vila Bethânia, Shopping Jardim Oriente e Elo Kids em São José dos Campos.`) + topo(v, 'contato') + cab('Contato', 'Venha conversar com a gente e planejar o futuro do seu filho', '') + `
<div class="in"><section class="contato-pag">
  <div class="sobe"><ul class="contato-dados"><li>${ic('tel')}<div><span>Telefone</span><a href="${telHref(E.fone)}">${E.fone}</a></div></li><li>${icWa()}<div><span>WhatsApp</span><a href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${E.whats}</a></div></li><li>${ic('mail')}<div><span>E-mail</span><a href="mailto:${E.email}">${E.email}</a><br><a href="mailto:${E.email2}">${E.email2}</a></div></li></ul>
  <ul class="contato-un">${UNIDADES.map(u => `<li><b>${u.nome}</b><span>${u.rua}, ${u.bairro}</span><span>${u.fones.join(' · ')} · WhatsApp ${u.whats}</span></li>`).join('')}</ul>
  <iframe class="mapa" title="Mapa do Colégio Elo" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Alameda Cândido Marciano Leite, 65, Vila Bethânia, São José dos Campos SP')}&z=15&output=embed"></iframe></div>
  <div class="form-caixa sobe"><h2>Agende uma visita</h2><p>Preencha e envie: a mensagem abre pronta no WhatsApp do colégio.</p>${form()}</div>
</section></div>
` + rodape(v);
  return pag;
}

// ---------- A "Círculo": o azul-marinho e o anel azul do logo, formas redondas ----------
function A() {
  const v = 'a';
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div>${foto ? `<figure>${img(foto, '', ' loading="eager"')}</figure>` : ''}</div></section>`;
  return paginas(v, cab, () => `
<section class="hero-a"><div class="in hero-a-in">
  <div><p class="k">Matrículas abertas · do berçário ao Ensino Médio</p><h1>Existem lições que levamos para a vida toda.</h1><p>Em São José dos Campos, o Colégio Elo nasceu de uma cooperativa de pais e foi o primeiro do estado a adotar o Sistema de Ensino SAS.</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Agende uma visita</a><a class="btn btn-linha" href="${link(v, 'matricula')}">Matrículas</a></p></div>
  <figure class="hero-a-foto"><span class="anel"></span>${img('fachada', 'Fachada do Colégio Elo', ' loading="eager" fetchpriority="high"')}<span class="hero-a-kid">${img('k-turma', 'Turma da Elo Kids', ' loading="eager"')}</span></figure>
</div></section>
<section class="in seg-a"><header class="tit"><p class="k">Segmentos</p><h2>Uma escola para cada fase</h2></header><div class="seg-cards">${SEGMENTOS.map((s, i) => `<a class="seg s${i} sobe" href="${link(v, s.slug)}">${img(s.foto, s.nome)}<div><span class="idade">${s.idade}</span><h3>${s.nome}</h3><p>${s.texto}</p><span class="link-seta">Saiba mais ${ic('seta')}</span></div></a>`).join('')}</div></section>
<section class="difer-a"><div class="in"><header class="tit"><p class="k">Por que o Colégio Elo</p><h2>Nossos diferenciais</h2></header><div class="difer">${DIFER.map((d, i) => `<article class="d${i} sobe"><span class="n">0${i + 1}</span><h3>${d[0]}</h3><p>${d[1]}</p></article>`).join('')}</div></div></section>
<section class="in kids-a"><div class="kids-a-fotos sobe">${['k-horta', 'k-culinaria', 'k-musica'].map(n => img(n, 'Elo Kids')).join('')}</div><div class="sobe"><p class="k">Elo Kids</p><h2>Berçário e educação infantil, a partir de 4 meses</h2><p>Proposta construtivista, Elo Baby em prédio exclusivo, aulas extras desde o berçário e cardápio zero açúcar.</p><a class="link-seta" href="${link(v, 'educacao-infantil')}">Conheça a Elo Kids ${ic('seta')}</a></div></section>
<section class="depo-a"><div class="in"><header class="tit"><p class="k">Depoimentos</p><h2>Quem passou pela Elo</h2></header>${depo()}</div></section>
<section class="in un-a"><header class="tit"><p class="k">Unidades</p><h2>Três endereços em São José dos Campos</h2></header>${unidadesCards(v)}</section>
`);
}

// ---------- B "Trilhas": o amarelo e o azul do material do Ensino Médio, blocos com sombra deslocada ----------
function B() {
  const v = 'b';
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div class="cab-b-txt"><p class="k">${k}</p><h1>${t}</h1></div>${foto ? `<figure>${img(foto, '', ' loading="eager"')}</figure>` : ''}</div></section>`;
  return paginas(v, cab, () => `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Colégio Elo · São José dos Campos</p><h1>Quais lições você deseja levar para a vida?</h1><p>Do berçário ao Ensino Médio, com Sistema de Ensino SAS, robótica, imersão em inglês e a primeira escola da região com energia 100% renovável.</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Agende uma visita</a><a class="btn btn-linha" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${icWa()}${E.whats}</a></p></div>
  <div class="hero-b-fotos">${img('k-pintura', 'Crianças desenhando na Elo Kids', ' loading="eager" fetchpriority="high"')}${img('oriente', 'Unidade Shopping Jardim Oriente', ' loading="eager"')}</div>
</div></section>
<section class="faixa-num"><div class="in">${[['5 mil m²', 'de instalações na Vila Bethânia'], ['30', 'aulas semanais'], ['3', 'unidades'], ['100%', 'energia renovável']].map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in seg-b"><header class="tit"><p class="k">Segmentos</p><h2>Do berçário ao vestibular</h2></header><div class="seg-cards">${SEGMENTOS.map((s, i) => `<a class="seg s${i} sobe" href="${link(v, s.slug)}"><span class="idade">${s.idade}</span><h3>${s.nome}</h3><p>${s.texto}</p><span class="link-seta">Saiba mais ${ic('seta')}</span></a>`).join('')}</div></section>
<section class="medio-b"><div class="in"><header class="tit"><p class="k">Ensino Médio de cara nova</p><h2>Trilhas de aprendizagem à tarde, três vezes por semana</h2></header>${trilhas()}<a class="btn" href="${link(v, 'ensino-medio')}">Conheça o Ensino Médio</a></div></section>
<section class="in energia-b"><div class="sobe"><p class="k">Energia sustentável</p><h2>90 placas solares sobre a quadra</h2><p>Primeira escola do Vale do Paraíba a usar 100% de energia renovável: mais de 20.000 W no pico, 500 kg de gás carbônico a menos.</p></div><div class="sobe"><p class="k">Elo Kids</p><h2>Cardápio zero açúcar</h2><p>Do berçário ao Infantil II, tudo preparado na cozinha da escola, sem açúcar refinado, e às vezes com o que vem da própria horta.</p></div></section>
<section class="depo-b"><div class="in"><header class="tit"><p class="k">Depoimentos</p><h2>Quem passou pela Elo</h2></header>${depo()}</div></section>
<section class="visita-b"><div class="in visita-b-in"><div><h2>Venha conversar com a gente e planejar o futuro do seu filho</h2></div><p class="bts"><a class="btn" href="${link(v, 'contato')}">Agendar visita</a><a class="btn btn-linha" href="${link(v, 'unidades')}">Ver unidades</a></p></div></section>
`);
}

copiarSiteJs(pub, E.wa);
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8') + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Colégio Elo', artigo: 'do', url: E.url, lang: 'pt', cor: '#0072BE', fundo: '#1F1956', claro: '#E8F2FA',
  fonteTitulo: "'Outfit',system-ui,sans-serif", fonteTexto: "'Mulish',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Círculo', paginas: 8, texto: 'O azul-marinho e o anel azul do logo: a fachada num círculo, os três segmentos em cartões, os diferenciais, a Elo Kids, depoimentos e as três unidades.', pontos: ['Do berçário ao Ensino Médio', 'Agendamento pelo WhatsApp', 'Três unidades com endereço e telefone'] },
    { letra: 'b', nome: 'Trilhas', paginas: 8, texto: 'O amarelo e o azul do material do Ensino Médio: números do colégio, segmentos, as trilhas de aprendizagem na página inicial, energia solar e depoimentos.', pontos: ['Trilhas do Ensino Médio em destaque', 'Blocos no estilo do material da escola', 'Fotos reais da Elo Kids'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
