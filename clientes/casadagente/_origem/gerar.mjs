// Escola de Educação Infantil Casa da Gente, Nova Campinas, Campinas/SP: crianças de 1 a 6 anos, há mais de 40 anos. Gera public/{a,b}/ e a página de escolha.
// node clientes/casadagente/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs casadagente https://escolacasadagente.com.br/home)
// Textos, horários, downloads e fotos do site atual; logo redesenhado em vetor a partir do logo do site.
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Escola de Educação Infantil Casa da Gente', url: 'https://casadagente.overtus.com.br/', antigo: 'https://escolacasadagente.com.br/home',
  fone1: '(19) 3253-4241', fone2: '(19) 3201-0520', whats: '(19) 97416-2552', wa: '5519974162552',
  email: 'contato@escolacasadagente.com.br', email2: 'escolacasadagente@gmail.com',
  rua: 'Av. Dr. Jesuíno Marcondes Machado, 1001', bairro: 'Nova Campinas', cidade: 'Campinas - SP', cep: '13092-001',
  insta: 'https://www.instagram.com/escolacasadagente', face: 'https://www.facebook.com/escola.casadagente', yt: 'https://www.youtube.com/channel/UCEiOLJ7rh3Jeupp0GWjk9-A',
};
const CMS = 'https://cms.mediaplus.com.br/projetos/casadagente/uploads/download_arquivo/';
const FONTES = 'https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Figtree:wght@400;500;600;700&display=swap';
const LOGO = (c = '') => `<img class="logo" src="/assets/img/logo${c}.svg" alt="Casa da Gente, Escola de Educação Infantil" width="180" height="132">`;
const DIM = { fachada: [1600, 900], parque: [1600, 477] };
const img = (n, alt, extra = '') => { const d = DIM[n] || [800, 600]; return `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async" width="${d[0]}" height="${d[1]}"${extra}>`; };
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const WAMSG = 'Olá, gostaria de mais informações da Escola Casa da Gente.';

const SOBRE = 'A Escola de Educação Infantil Casa da Gente tem mais de 40 anos de experiência na educação de crianças de 1 a 6 anos. Considera a educação infantil um investimento para o futuro de seres humanos de valores e, por isso, investe continuamente na formação da equipe, no espaço físico e na inovação da proposta pedagógica.';
const MISSAO = 'Oferecer uma educação infantil de excelência, humana e afetiva, que respeite a individualidade da criança e promova seu desenvolvimento integral.';
const DIFER = ['Turmas reduzidas', 'Alimentação acompanhada por nutricionista', 'Horta, animais e contato com a natureza', 'Teatro, música, circo e culinária', 'Psicólogos e equipe multidisciplinar', 'Mais de 40 anos de tradição em Campinas', 'Meio período, integral e horários especiais'];
const EQUIPE = ['2 psicólogos', 'Fonoaudióloga', 'Pediatra', 'Fisioterapeuta', 'Nutricionista', 'Professoras pedagogas especializadas em Educação Infantil', 'Auxiliares com curso de Pedagogia'];
const VALORES = ['Amizade', 'Respeito', 'Generosidade', 'Cidadania', 'Diversidade', 'Paz', 'Afeto', 'Alegria', 'Família'];
const VALORIZA = ['O brincar como linguagem da infância', 'O contato com a natureza', 'A escuta sensível e a observação do cotidiano', 'A construção do conhecimento a partir de projetos', 'A aprendizagem significativa, baseada nos interesses reais das crianças'];
const PILARES = [
  ['Equipe multidisciplinar', 'Professores formados em Pedagogia e em constante atualização, coordenação com duas pedagogas e dois psicólogos, e apoio de pediatra, fonoaudióloga, fisioterapeuta e enfermeira.'],
  ['Espaços que educam', 'Áreas verdes, horta, animais e parque ao ar livre, em ambientes amplos e acolhedores.'],
  ['Alimentação saudável', 'Cardápios balanceados por nutricionista e chef de cozinha, com pães, bolos e sucos naturais feitos na escola e educação alimentar desde a primeira infância.'],
  ['Acolhimento e adaptação', 'Processo gradual, com envolvimento da família, atenção emocional e suporte psicopedagógico constantes.'],
];
const METODO = ['Planejamentos semanais, construídos com intencionalidade pedagógica', 'Atividades na Zona de Desenvolvimento Proximal, respeitando a fase de cada criança', 'Estímulo à autonomia, à criatividade e à produção individual'];
const FAMILIA = ['Relatórios individuais de desenvolvimento', 'Reuniões pedagógicas e temáticas', 'Orientações personalizadas', 'Contato diário afetuoso e transparente'];
const ESPACOS = [
  ['Parque', 'Dois espaços: parque a céu aberto com árvores frutíferas, horta, tanque de areia, casa da árvore, casinha de bonecas, gira-gira e balanço, e um espaço coberto com tanque de areia colorida e a casa da tartaruga.', ['f-29', 'f-62', 'f-44']],
  ['Brinquedoteca', 'Brinquedos pedagógicos que estimulam a imaginação, a sociabilidade e o faz de conta, com a professora como facilitadora.', ['f-22', 'f-61']],
  ['Biblioteca', 'Hora do conto, criação e recriação de histórias e empréstimo semanal de livros no projeto "Leitura com a família", com acervo voltado a valores e curiosidades.', ['f-43']],
  ['Educação Física', 'Coordenação motora, lateralidade, concentração, equilíbrio e trabalho em equipe, com professor capacitado.', ['f-48', 'f-49']],
  ['Sala de sono', 'Espaço para descansar com tranquilidade, sem horário fixo: a criança usa conforme a necessidade.', []],
  ['Sala de fantasia', 'Personagens, contos e pequenas histórias para estimular o vocabulário, a imaginação e dar vazão aos sentimentos.', ['f-52']],
  ['Sala de arte', 'Pinturas e descoberta de novas texturas, como pintura com amora e com sagu.', ['f-56']],
];
const HORARIOS = [
  ['Manhã', '7h45 às 11h45', 'Tolerância 7h30 e 12h. Horário complementar até 12h30.'],
  ['Tarde', '13h30 às 17h30', 'Tolerância 13h15 e 17h45. Horário complementar até 18h30.'],
  ['Integral', '7h30 às 17h30', 'Almoço às 11h30.'],
];
const DOWNLOADS = [['Cardápio do mês', '20260602092305.pdf'], ['Calendário escolar 2026', '20260202150242.pdf'], ['Normas da escola', '20180226084101.pdf'], ['Autorização de funcionamento', '20180226083928.pdf']];
const MIDIA = [
  ['Diretora da Casa da Gente fala sobre bullying', '05/2024', ''],
  ['Amizade traz benefícios à saúde', '07/2022', ''],
  ['Disciplina Positiva é alternativa para tempos de crise', '12/2020', 'https://digitais.net.br/2020/12/disciplina-positiva-e-alternativa-para-tempos-de-crise/'],
  ['Entrevista sobre o Dia dos Professores', '', 'https://brasilcampinas.com.br/rita-khater-dia-dos-professores.html'],
  ['Os desafios da educação infantil na pandemia (podcast)', '', ''],
  ['Halloween motiva jogos pedagógicos para trabalhar o medo nas crianças', '', ''],
];

const nav = [
  { slug: 'a-escola', nome: 'A escola' },
  { slug: 'proposta', nome: 'Proposta pedagógica' },
  { slug: 'adaptacao', nome: 'Adaptação' },
  { slug: 'espaco', nome: 'Espaço' },
  { slug: 'rotina', nome: 'Horários e cardápio' },
  { slug: 'contato', nome: 'Contato' },
];
const cores = { a: '#0054A6', b: '#2F6B1F' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Casa da Gente | Escola de Educação Infantil em Campinas' : `${titulo} | Casa da Gente`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('pin')}${E.rua}, ${E.bairro}</span><span>${ic('tel')}<a href="${telHref(E.fone1)}">${E.fone1}</a><i>/</i><a href="${telHref(E.fone2)}">${E.fone2}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Casa da Gente, página inicial">${LOGO()}</a>
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
    <div class="rod-marca">${LOGO('-branco')}<p>Educação infantil para crianças de 1 a 6 anos em Campinas, há mais de 40 anos.</p><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" target="_blank" rel="noopener" aria-label="YouTube">${ic('yt')}</a></p></div>
    <div><h3>A escola</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Horários</h3><ul class="rod-hor">${HORARIOS.map(h => `<li><b>${h[0]}</b> ${h[1]}</li>`).join('')}<li><b>Secretaria</b> 8h às 18h30</li></ul></div>
    <div><h3>Fale conosco</h3><ul class="rod-dados"><li>${ic('tel')}<span><a href="${telHref(E.fone1)}">${E.fone1}</a><br><a href="${telHref(E.fone2)}">${E.fone2}</a></span></li><li>${icWa()}<a href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${E.whats}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li><li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Escola de Educação Infantil Casa da Gente LTDA EPP. Portaria de Funcionamento 2015/10/29/388.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const form = () => `<form class="form" data-wa="Olá! Quero agendar uma visita à Casa da Gente." novalidate>
  <label>Nome do responsável *<input name="responsavel" required autocomplete="name"></label>
  <div class="form-2"><label>Telefone *<input name="telefone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <div class="form-2"><label>Nome da criança<input name="crianca"></label><label>Idade<select name="idade"><option>1 ano</option><option>2 anos</option><option>3 anos</option><option>4 anos</option><option>5 anos</option><option>6 anos</option></select></label></div>
  <label>Período de interesse<select name="periodo"><option>Manhã</option><option>Tarde</option><option>Integral</option><option>Ainda não sei</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const galeria = (nums, cls = 'galeria') => nums.length ? `<div class="${cls}">${nums.map(n => `<a class="sobe" href="/assets/img/${n}.webp" data-foto data-legenda="Casa da Gente">${img(n, 'Casa da Gente')}</a>`).join('')}</div>` : '';
const horarios = () => `<div class="horarios">${HORARIOS.map(h => `<div class="sobe"><span>${h[0]}</span><b>${h[1]}</b><p>${h[2]}</p></div>`).join('')}</div>`;
const cta = v => `<section class="cta-seg sobe"><div><h2>Agende uma visita</h2><p>Venha conhecer o parque, a horta, os animais e a equipe.</p></div><p class="bts"><a class="btn" href="${link(v, 'contato')}">Agendar visita</a><a class="btn btn-linha" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${icWa()}WhatsApp</a></p></section>`;

function paginas(v, cab, home) {
  const pag = {};
  pag.index = head(v, 'index', '', 'Escola de Educação Infantil Casa da Gente, em Nova Campinas: crianças de 1 a 6 anos, turmas reduzidas, natureza, equipe multidisciplinar e alimentação saudável. Há mais de 40 anos em Campinas.') + topo(v, 'index') + home() + rodape(v);

  pag['a-escola'] = head(v, 'a-escola', 'A escola', 'Mais de 40 anos de educação infantil em Campinas: equipe multidisciplinar, missão e valores da Casa da Gente.') + topo(v, 'a-escola') + cab('A escola', 'Mais de 40 anos educando crianças de 1 a 6 anos', 'fachada') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">${SOBRE}</p><p>Trabalhamos com turmas reduzidas, alimentação saudável, natureza, equipe multidisciplinar e acompanhamento próximo das famílias. A direção é de Rita Khater, pedagoga, psicóloga e doutora em Psicologia pela PUC-Campinas.</p></div><figure class="sobe">${img('f-23', 'Crianças brincando com o paraquedas colorido')}</figure></section>
<section class="equipe sobe"><div><p class="k">Equipe de saúde</p><h2>Acompanhamento e avaliações regulares das crianças</h2></div>${lista(EQUIPE)}</section>
<section class="missao sobe"><p class="k">Nossa missão</p><p class="frase">${MISSAO}</p><ul class="valores">${VALORES.map(x => `<li>${x}</li>`).join('')}</ul><p class="nota">Valores trabalhados em projetos mensais.</p></section>
<section class="texto-pag inv"><figure class="sobe">${img('f-69', 'Roda com as crianças no pátio')}</figure><div class="sobe"><p class="k">Responsabilidade social</p><h2>Respeito às diferenças e sustentabilidade</h2><p>A Casa da Gente educa para o respeito às diferenças e à sustentabilidade. Valorizamos a diversidade e promovemos práticas conscientes que formam cidadãos éticos e engajados com o bem comum.</p></div></section>
<section class="midia"><header class="tit"><p class="k">Na mídia</p><h2>A Casa da Gente nas reportagens</h2></header><ul>${MIDIA.map(m => `<li class="sobe">${m[2] ? `<a href="${m[2]}" target="_blank" rel="noopener">${m[0]} ${ic('ext')}</a>` : `<span>${m[0]}</span>`}${m[1] ? `<em>${m[1]}</em>` : ''}</li>`).join('')}</ul></section>
${cta(v)}
</div>
` + rodape(v);

  pag.proposta = head(v, 'proposta', 'Proposta pedagógica', 'Proposta pedagógica da Casa da Gente: o brincar, a natureza, projetos criados a cada ano e parceria com as famílias.') + topo(v, 'proposta') + cab('Proposta pedagógica', 'O conhecimento nasce da experiência', 'f-39') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">Na Casa da Gente, cada criança é recebida com cuidado e afeto desde o primeiro dia de aula. Trabalhamos com base na BNCC, mas vamos além dela: respeitamos o tempo e as necessidades individuais de cada aluno, inclusive aqueles com demandas específicas.</p><h3>Nosso projeto pedagógico valoriza</h3>${lista(VALORIZA)}</div><figure class="sobe">${img('f-41', 'Atividade de culinária com as crianças')}</figure></section>
<section class="pilares">${PILARES.map((p, i) => `<article class="pilar p${i} sobe"><h3>${p[0]}</h3><p>${p[1]}</p></article>`).join('')}</section>
<section class="metodo sobe"><div><p class="k">Nossa metodologia</p><h2>Uma proposta viva e personalizada</h2><p>Nossos projetos são únicos, criados a cada ano conforme o grupo, sem apostilas ou temas engessados.</p></div>${lista(METODO)}</section>
<section class="texto-pag inv"><figure class="sobe">${img('f-70', 'Desenho de família feito por uma criança')}</figure><div class="sobe"><p class="k">Parceria com as famílias</p><h2>Educação construída com diálogo e confiança</h2>${lista(FAMILIA)}</div></section>
${cta(v)}
</div>
` + rodape(v);

  pag.adaptacao = head(v, 'adaptacao', 'Adaptação', 'Adaptação escolar na Casa da Gente: acolhimento gradual da criança e da família, sem prazo fixo.') + topo(v, 'adaptacao') + cab('Adaptação escolar', 'Um momento de cuidado, acolhimento e vínculo', 'f-54') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">O ingresso na primeira escola é um marco no crescimento infantil: o início da construção da autonomia fora do ambiente familiar. Um momento delicado para a criança e para a família.</p><p>Durante a adaptação, nossa principal meta é que a criança compreenda, no seu tempo, que a escola é um lugar seguro, onde ela será bem cuidada e poderá brincar, aprender e fazer amigos, e que ao final do dia volta para os braços da família.</p></div><figure class="sobe">${img('f-55', 'Criança na escola')}</figure></section>
<section class="adapt">${[['Para a criança', ['Entrar em um ambiente novo, com novas regras e rotinas', 'Dividir a atenção da professora com outras crianças', 'Passar parte do dia longe da principal figura de apego']], ['Para os pais', ['Conhecer a equipe pedagógica que vai cuidar do filho', 'Acompanhar a rotina da escola nos primeiros dias', 'Compreender os espaços e os momentos do cotidiano']]].map((c, i) => `<article class="ad${i} sobe"><h2>${c[0]}</h2>${lista(c[1])}</article>`).join('')}</section>
<p class="frase destaque sobe">Nossa adaptação não tem prazo fixo: respeita a individualidade de cada criança, com escuta atenta, carinho e orientação profissional.</p>
${cta(v)}
</div>
` + rodape(v);

  pag.espaco = head(v, 'espaco', 'Espaço físico', 'Espaço físico da Casa da Gente em Campinas: parque com árvores frutíferas e horta, casa da tartaruga, brinquedoteca, biblioteca, salas de arte, fantasia e sono.') + topo(v, 'espaco') + cab('Espaço físico', 'Uma casa adaptada para a infância', 'parque') + `
<div class="in">
<p class="lead intro sobe">A escola fica numa casa residencial na Av. Dr. Jesuíno Marcondes Machado, adaptada para a educação infantil, com a infraestrutura necessária para o desenvolvimento e a segurança das crianças.</p>
${ESPACOS.map((e, i) => `<section class="esp${i % 2 ? ' inv' : ''}${e[2].length ? '' : ' sem'}"><div class="sobe"><span class="n">0${i + 1}</span><h2>${e[0]}</h2><p>${e[1]}</p></div>${galeria(e[2], `galeria g${e[2].length}`)}</section>`).join('')}
${cta(v)}
</div>
` + rodape(v);

  pag.rotina = head(v, 'rotina', 'Horários e cardápio', 'Horários da Casa da Gente (manhã, tarde e integral), lanches preparados na escola com nutricionista e downloads: cardápio do mês e calendário 2026.') + topo(v, 'rotina') + cab('Horários e cardápio', 'Meio período, integral e semi-integral', 'f-40') + `
<div class="in">
<section class="rot-sec"><p class="lead sobe">A escola funciona nos dois períodos e atende as famílias em meio período, período integral e semi-integral. A secretaria atende das 8h às 18h30.</p>${horarios()}</section>
<section class="texto-pag inv"><figure class="sobe">${img('f-39', 'Crianças na atividade de culinária')}</figure><div class="sobe"><p class="k">A hora do lanche</p><h2>Feito na escola, com alimentos frescos</h2><p>O lanche é um momento de convivência, acolhimento e aprendizado. Os lanches são preparados na própria escola, com alimentos frescos, naturais e livres de industrializados, e o cardápio é elaborado todo mês pela nutricionista, respeitando a sazonalidade e as orientações das famílias e pediatras.</p><a class="btn" href="${CMS}${DOWNLOADS[0][1]}" target="_blank" rel="noopener">Ver o cardápio do mês</a></div></section>
<section class="downloads"><header class="tit"><p class="k">Downloads</p><h2>Documentos da escola</h2></header><div class="dl">${DOWNLOADS.map(d => `<a class="sobe" href="${CMS}${d[1]}" target="_blank" rel="noopener">${ic('livro')}<b>${d[0]}</b><span>PDF ${ic('seta')}</span></a>`).join('')}</div></section>
${cta(v)}
</div>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Casa da Gente: ${E.rua}, ${E.bairro}, ${E.cidade}. Telefones ${E.fone1} e ${E.fone2}, WhatsApp ${E.whats}.`) + topo(v, 'contato') + cab('Agende uma visita', 'Fale com a Casa da Gente', '') + `
<div class="in"><section class="contato-pag">
  <div class="sobe"><ul class="contato-dados"><li>${ic('tel')}<div><span>Telefones</span><a href="${telHref(E.fone1)}">${E.fone1}</a><br><a href="${telHref(E.fone2)}">${E.fone2}</a></div></li><li>${icWa()}<div><span>WhatsApp</span><a href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${E.whats}</a></div></li><li>${ic('mail')}<div><span>E-mail</span><a href="mailto:${E.email}">${E.email}</a><br><a href="mailto:${E.email2}">${E.email2}</a></div></li><li>${ic('pin')}<div><span>Endereço</span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</div></li><li>${ic('relogio')}<div><span>Visitas</span>A partir das 17h30. Secretaria das 8h às 18h30.</div></li></ul>
  <iframe class="mapa" title="Mapa da Casa da Gente" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Av. Dr. Jesuíno Marcondes Machado, 1001, Nova Campinas, Campinas SP')}&z=16&output=embed"></iframe></div>
  <div class="form-caixa sobe"><h2>Agende uma visita</h2><p>Preencha e envie: a mensagem abre pronta no WhatsApp da escola.</p>${form()}</div>
</section></div>
` + rodape(v);
  return pag;
}

// ---------- A "Muro": o amarelo com bolinhas brancas do muro da escola e o azul do logo ----------
function A() {
  const v = 'a';
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div>${foto ? `<figure>${img(foto, '', ' loading="eager"')}</figure>` : ''}</div></section>`;
  return paginas(v, cab, () => `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Escola de Educação Infantil · Nova Campinas</p><h1>Crianças de 1 a 6 anos, educadas com afeto há mais de 40 anos.</h1><p>Turmas reduzidas, natureza, alimentação saudável e uma equipe com pedagogas, psicólogos, fonoaudióloga, pediatra e nutricionista.</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Agende uma visita</a><a class="btn btn-linha" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${icWa()}${E.whats}</a></p></div>
  <figure class="hero-a-foto">${img('fachada', 'Muro amarelo da Casa da Gente com bolinhas brancas', ' loading="eager" fetchpriority="high"')}</figure>
</div></section>
<section class="in difer-a"><header class="tit"><p class="k">Diferenciais</p><h2>Por que a Casa da Gente</h2></header><ul class="bolhas">${DIFER.map((d, i) => `<li class="sobe b${i}">${d}</li>`).join('')}</ul></section>
<section class="prop-a"><div class="in prop-a-in"><div class="sobe"><p class="k">Proposta pedagógica</p><h2>O brincar como linguagem da infância</h2><p>Projetos criados a cada ano conforme o grupo, sem apostilas ou temas engessados, com base na BNCC e respeito ao tempo de cada criança.</p>${lista(VALORIZA.slice(0, 3))}<a class="link-seta" href="${link(v, 'proposta')}">Conheça a proposta ${ic('seta')}</a></div><div class="mosaico sobe">${['f-23', 'f-39', 'f-26', 'f-45'].map(n => img(n, 'Crianças da Casa da Gente')).join('')}</div></div></section>
<section class="in turnos-a"><header class="tit"><p class="k">Horários</p><h2>Meio período, integral e semi-integral</h2></header>${horarios()}</section>
<section class="esp-a"><div class="in"><header class="tit"><p class="k">Espaço físico</p><h2>Parque com árvores frutíferas, horta e a casa da tartaruga</h2></header>${galeria(['f-29', 'f-44', 'f-62', 'f-22', 'f-68', 'f-34'], 'galeria g6')}<a class="link-seta" href="${link(v, 'espaco')}">Todos os espaços ${ic('seta')}</a></div></section>
<section class="in equipe-a"><div class="sobe"><p class="k">Equipe de saúde</p><h2>Acompanhamento regular de cada criança</h2><p>Direção de Rita Khater, pedagoga, psicóloga e doutora em Psicologia pela PUC-Campinas.</p></div>${lista(EQUIPE)}</section>
<section class="visita-a"><div class="in visita-a-in"><div><h2>Venha conhecer a Casa da Gente</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}. Visitas a partir das 17h30.</p></div><p class="bts"><a class="btn" href="${link(v, 'contato')}">Agendar visita</a><a class="btn btn-linha" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a></p></div></section>
`);
}

// ---------- B "Quintal": o verde da árvore do logo, natureza e rotina em destaque ----------
function B() {
  const v = 'b';
  const cab = (k, t, foto) => `<section class="cab-b">${foto ? img(foto, '', ' loading="eager"') : ''}<div class="in cab-b-in"><div class="cab-b-caixa"><p class="k">${k}</p><h1>${t}</h1></div></div></section>`;
  return paginas(v, cab, () => `
<section class="hero-b">${img('parque', 'Parque da Casa da Gente com árvores', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><div class="hero-b-caixa"><p class="k">Casa da Gente · Campinas</p><h1>Uma escola com quintal, horta e bichos.</h1><p>Educação infantil para crianças de 1 a 6 anos, com turmas reduzidas e mais de 40 anos de tradição.</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Agende uma visita</a><a class="btn btn-linha" href="${link(v, 'espaco')}">Ver o espaço</a></p></div></div></section>
<section class="in pilares-b"><header class="tit"><p class="k">Nossos diferenciais</p><h2>Cuidado, natureza e uma equipe completa</h2></header><div class="pilares">${PILARES.map((p, i) => `<article class="pilar p${i} sobe"><h3>${p[0]}</h3><p>${p[1]}</p></article>`).join('')}</div></section>
<section class="fotos-b"><div class="in fotos-b-in">${[['f-44', 'Casa da tartaruga'], ['f-68', 'Horta'], ['f-41', 'Culinária'], ['f-51', 'Teatro'], ['f-26', 'No gramado']].map((f, i) => `<figure class="fb${i} sobe">${img(f[0], f[1])}<figcaption>${f[1]}</figcaption></figure>`).join('')}</div></section>
<section class="in dia-b"><div class="sobe"><p class="k">Horários</p><h2>Do jeito que a família precisa</h2><p>Meio período, integral ou semi-integral. A secretaria atende das 8h às 18h30.</p><a class="link-seta" href="${link(v, 'rotina')}">Horários e cardápio ${ic('seta')}</a></div>${horarios()}</section>
<section class="valores-b"><div class="in"><p class="k">Projetos mensais de valores</p><ul class="valores">${VALORES.map(x => `<li>${x}</li>`).join('')}</ul><p class="frase">${MISSAO}</p></div></section>
<section class="in adapt-b"><figure class="sobe">${img('f-54', 'Professora com criança na adaptação')}</figure><div class="sobe"><p class="k">Adaptação</p><h2>Sem prazo fixo, no tempo de cada criança</h2><p>Uma adaptação gradual, que acolhe também os pais: conhecer a equipe, acompanhar os primeiros dias e entender a rotina da escola.</p><a class="link-seta" href="${link(v, 'adaptacao')}">Como funciona ${ic('seta')}</a></div></section>
<section class="visita-b"><div class="in visita-b-in"><div><p class="k">Visitas a partir das 17h30</p><h2>${E.rua}, ${E.bairro}</h2><p>${E.cidade}</p></div><p class="bts"><a class="btn" href="${link(v, 'contato')}">Agendar visita</a><a class="btn btn-linha" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${icWa()}WhatsApp</a></p></div></section>
`);
}

copiarSiteJs(pub, E.wa);
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8') + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Casa da Gente', artigo: 'da', url: E.url, lang: 'pt', cor: '#F5C400', fundo: '#0054A6', claro: '#FFF9E0',
  fonteTitulo: "'Archivo',system-ui,sans-serif", fonteTexto: "'Figtree',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Muro', paginas: 7, texto: 'O amarelo com bolinhas brancas do muro da escola e o azul do logo: a fachada na abertura, os diferenciais em bolhas, a proposta pedagógica, os horários e o espaço com fotos.', pontos: ['Logo redesenhado em vetor', 'Agendamento de visita pelo WhatsApp', 'Cardápio e calendário 2026 para baixar'] },
    { letra: 'b', nome: 'Quintal', paginas: 7, texto: 'O verde da árvore do logo: o parque na abertura, os quatro pilares da escola, fotos da horta, da tartaruga e da culinária, valores e adaptação.', pontos: ['Natureza em primeiro plano', 'Pilares da proposta', 'Missão e valores na página inicial'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
