// Creche Escola Infantil Novo Espaço, Santa Helena, Juiz de Fora/MG: berçário, creche e educação infantil desde 1999. Gera public/{a,b}/ e a página de escolha.
// node clientes/novoespaco/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs novoespaco http://www.novoespacojf.com.br/)
// Textos, fotos, guias e listas do site atual; logo vetorizado da capa do Guia dos Pais.
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Creche Escola Infantil Novo Espaço', url: 'https://novoespaco.overtus.com.br/', antigo: 'http://www.novoespacojf.com.br/',
  fone: '(32) 3211-0930', whats: '(32) 99935-5401', wa: '5532999355401', email: 'contato@novoespacojf.com.br', email2: 'novoespacojf@gmail.com',
  rua: 'Rua Silva Jardim, 480', bairro: 'Santa Helena', cidade: 'Juiz de Fora - MG',
  face: 'https://www.facebook.com/Escola-Infantil-Novo-Espa%C3%A7o-JF-192980830823537/',
  insta: 'https://www.instagram.com/explore/locations/1017029998/escola-infantil-novo-espaco-jf/',
};
const UP = 'http://www.novoespacojf.com.br/wp-content/uploads/';
const FONTES = 'https://fonts.googleapis.com/css2?family=Lexend:wght@500;600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&display=swap';
const LOGO = (c = '') => `<img class="logo" src="/assets/img/logo${c}.svg" alt="Creche-Escola Novo Espaço" width="2140" height="705">`;
const FOTOS = { 'creche-sala': [1600, 1066], 'giz-parede': [1080, 720], 'atividade-patio': [1080, 720], 'areia-azul': [1080, 720], 'turma-joinha': [1080, 720], 'bebe-1': [1080, 720], 'bebe-2': [1080, 720], 'bercario-chao': [1080, 720], corredor: [1080, 720], fachada: [1080, 720], brinquedoteca: [1080, 720], refeitorio: [1080, 720], mural: [1080, 720], familia: [1600, 900], 'bebe-copo': [1200, 1600], horta: [1080, 720], 'bercario-letras': [1600, 1066], sala: [1280, 853], artes: [1600, 1066], 'tanque-areia': [1080, 720], mascote: [250, 274] };
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async" width="${FOTOS[n][0]}" height="${FOTOS[n][1]}"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const WAMSG = 'Olá! Estou no site da Novo Espaço e gostaria de mais informações sobre a escola.';

const LEMA = 'Uma escola para aprender e ser feliz';
const SOBRE = 'A Creche Escola Novo Espaço nasceu em 1999 com o propósito de oferecer uma educação que acolhesse a criança em suas necessidades e potencialidades, valorizando cada aluno como sujeito de sua trajetória.';
const SOBRE2 = 'Nossos alunos vivenciam experiências de cuidados e educação norteados por um planejamento criterioso, favorecendo o acesso à cultura, ao lazer e aos conhecimentos sistematizados de maneira lúdica, significativa e transformadora. Os objetivos pedagógicos defendem o direito de ser criança e respeitam a liberdade de expressão, inserindo brincadeiras, música, esportes e outras atividades no cotidiano.';
const ESTRUTURA = ['Espaço aconchegante para atividades diversas', 'Equipe especializada em educação infantil, capacitada em Primeiros Socorros', 'Parques com brinquedos e tanque de areia', 'Cardápio elaborado por nutricionista', 'Horta para plantio', 'Área Protegida Unimed', 'Sala Multimeios'];
const VALORES = ['Honestidade', 'Afetividade', 'Comprometimento', 'Transparência', 'Alegria', 'Cooperação', 'Responsabilidade socioambiental'];
const SERV = [
  { slug: 'bercario', nome: 'Berçário', idade: '4 meses a 2 anos', foto: 'bebe-1', resumo: 'Ambiente acolhedor e adaptado aos bebês, com liberdade de movimentos e protagonismo.',
    sub: 'Liberdade de movimentos e protagonismo',
    texto: ['A Creche Escola Infantil Novo Espaço oferece berçário em ambiente acolhedor e adaptado às necessidades dos bebês a partir de 4 meses de vida. O atendimento une as atividades de cuidados diários ao fortalecimento dos vínculos afetivos entre o bebê e as suas cuidadoras, com experiências de autonomia e participação ativa na rotina.', 'Nosso berçário valoriza sobretudo a liberdade de movimentos e as brincadeiras espontâneas do bebê como fator preponderante para o seu desenvolvimento. A equipe de berçaristas tem larga experiência e é constantemente capacitada para oferecer toda a atenção e o cuidado que a criança precisa.', 'Ao completar 2 anos, a criança passa a compartilhar as experiências de sala de aula da Escola Infantil, no Maternal I.'],
    itens: ['Espaço amplo e totalmente seguro', 'Berços confortáveis', 'Carrinhos de passeio e bebê conforto', 'Baby floor e fraldário', 'Área aberta para o sol da manhã', 'Higiene conforme a legislação'],
    fotos: ['bebe-2', 'bercario-letras', 'bebe-copo'] },
  { slug: 'creche', nome: 'Creche', idade: 'das 7h às 19h', foto: 'creche-sala', resumo: 'Atenção e cuidado em tempo integral, com horário flexível para a rotina dos pais.',
    sub: 'Atendimento diferenciado e flexibilidade de horário',
    texto: ['A creche funciona das 7h às 19h para famílias que precisam de flexibilidade de horário, e inclui alimentação completa com cardápio elaborado por nutricionista, banho e, conforme a idade da criança, as atividades da escola infantil à tarde.', 'Os horários podem ser fracionados de acordo com o trabalho ou a necessidade dos pais. Os preços variam com o tempo de permanência e são proporcionalmente menores para quem fica mais horas na escola.', 'As refeições são preparadas em cozinha própria, com cardápio variado e rico em frutas, legumes, carnes e ovos, para estimular o paladar infantil na descoberta de novos sabores. Pela manhã, as crianças participam de oficinas lúdicas e criativas com a equipe de recreadoras.'],
    itens: ['Funcionamento das 7h às 19h', 'Horários fracionados', 'Alimentação completa com nutricionista', 'Cozinha própria', 'Oficinas pela manhã incluídas', 'Escola infantil à tarde, conforme a idade'],
    fotos: ['refeitorio', 'brinquedoteca', 'tanque-areia'] },
  { slug: 'educacao-infantil', nome: 'Educação Infantil', idade: 'Maternal I ao 2º Período', foto: 'turma-joinha', resumo: 'Aprendizagem pela experimentação e pelas brincadeiras, das 13h às 17h.',
    sub: 'Aprendizagem pela experimentação e pelas brincadeiras',
    texto: ['O trabalho da Escola Infantil Novo Espaço é embasado nas Diretrizes Curriculares Nacionais para a Educação Infantil e na Base Nacional Comum Curricular (BNCC), com os direitos de aprendizagem garantidos por meio de brincadeiras e experiências e o protagonismo da criança.', 'Desenvolvemos projetos pedagógicos anuais, divididos nos dois semestres, sobre identidade, família, sociedade, meio ambiente, atualidades, literatura, tradições, datas comemorativas, alimentação, festa junina e apresentações culturais e artísticas.'],
    campos: ['O eu, o outro e o nós', 'Corpo, gesto e movimentos', 'Traços, sons, cores e formas', 'Espaço, tempo, quantidades, relações e transformações', 'Escuta, fala, pensamento e imaginação'],
    turmas: [['Maternal I', '1 ano'], ['Maternal II', '2 anos'], ['Maternal III', '3 anos'], ['1º Período', '4 anos'], ['2º Período', '5 anos']],
    itens: ['Aulas à tarde, das 13h às 17h', 'Base Nacional Comum Curricular', 'Projetos anuais por semestre', 'Integração com as famílias'],
    fotos: ['giz-parede', 'areia-azul', 'artes'] },
];
const ATIV = [
  ['Musicalização', 'Contato com os instrumentos, seus sons, a melodia, o ritmo e as vivências sensoriais que a música proporciona. Aulas semanais.'],
  ['Inglês', 'Vivências com a língua inglesa a partir do Maternal II, contextualizadas no planejamento de cada faixa etária, dentro do campo de experiência "Escuta, fala, pensamento e imaginação".'],
  ['Oficinas', 'Artes, recreação, dramatização e movimento, semanais, no turno da manhã. Incluídas na mensalidade para as crianças em regime de creche.'],
  ['Ballet', 'Contribui para o desenvolvimento emocional, motor e artístico, proporcionando prazer e novas descobertas. Aulas semanais.'],
  ['Capoeira', 'Contribui para o desenvolvimento da criança, diverte e ensina. Aulas semanais.'],
];
const DOCS = ['Xerox do RG e CPF dos responsáveis', 'Xerox do comprovante de residência', 'Xerox da certidão de nascimento e do cartão de vacinação da criança', '1 foto 3x4 e 1 foto 10x15'];
const LISTAS = [['Maternal I', 'LISTA-DE-MATERIAL-MAT-1-2026-1.jpg'], ['Maternal II', 'LISTA-DE-MATERIAL-MAT-2-2026.jpg'], ['Maternal III', 'LISTA-DE-MATERIAL-MAT-3-2026-1.jpg'], ['1º Período', 'LISTA-DE-MATERIAL-1P-2026.jpg'], ['2º Período', 'LISTA-DE-MATERIAL-2P-2026.jpg']];
const GUIAS = [
  ['Guia dos Pais', 'Prática pedagógica e questões administrativas da rotina dos alunos e do funcionamento da creche e da escola.', '2019/03/GUIA-DOS-PAIS-2024.pdf'],
  ['Guia de adaptação escolar', 'Orientações para os primeiros dias da criança na escola.', '2024/01/Orientações-sobre-adaptação-escolar-A4.pdf'],
  ['Alimentação infantil', 'Dúvidas frequentes sobre alimentação na primeira infância e como incluir frutas, verduras e legumes em casa.', '2023/05/Ebook-Alimentação-Infantil-Novo-Espaço.pdf'],
  ['Como fazer o desfralde', 'Sono, berço, chupeta, mamadeira e a idade certa para tirar a fralda.', '2019/03/ebook-desfralde-novo-espaco.pdf'],
];
const HORAS = [['Creche', '7h às 19h', 'horário flexível'], ['Pré-escola', '13h às 17h', 'segunda a sexta']];

const nav = [
  { slug: 'quem-somos', nome: 'Quem somos' },
  { slug: 'bercario', nome: 'Berçário' },
  { slug: 'creche', nome: 'Creche' },
  { slug: 'educacao-infantil', nome: 'Educação Infantil' },
  { slug: 'atividades', nome: 'Atividades' },
  { slug: 'familias', nome: 'Famílias' },
  { slug: 'contato', nome: 'Contato' },
];
const cores = { a: '#0F699A', b: '#0F699A' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Berçário, creche e escola infantil em Juiz de Fora` : `${titulo} | Novo Espaço`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('pin')}${E.rua}, ${E.bairro}, Juiz de Fora</span><span>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Novo Espaço, página inicial">${LOGO()}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}">Agende sua visita</a>
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
    <div class="rod-marca">${LOGO('-branco')}<p>${LEMA}. Berçário, creche e educação infantil em Juiz de Fora desde 1999.</p><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>A escola</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Funcionamento</h3><ul class="rod-hor">${HORAS.map(h => `<li><b>${h[0]}</b> ${h[1]}<br><span>${h[2]}</span></li>`).join('')}</ul></div>
    <div><h3>Fale conosco</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${icWa()}<a href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${E.whats}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li><li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Creche Escola Novo Espaço. Juiz de Fora, MG.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const form = () => `<form class="form" data-wa="Olá! Quero agendar uma visita à Novo Espaço." novalidate>
  <label>Nome do responsável *<input name="responsavel" required autocomplete="name"></label>
  <div class="form-2"><label>Nome da criança *<input name="crianca" required></label><label>Data de nascimento<input name="nascimento" type="date"></label></div>
  <div class="form-2"><label>Interesse<select name="interesse"><option>Berçário</option><option>Creche</option><option>Educação Infantil (tarde)</option></select></label><label>Data da visita<input name="visita" type="date"></label></div>
  <div class="form-2"><label>Horário pretendido<input name="horario" placeholder="Ex.: 7h às 13h"></label><label>Escola atual<input name="escola-atual"></label></div>
  <label>Observações<textarea name="obs" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const horas = cls => `<div class="horas ${cls || ''}">${HORAS.map(h => `<div><span>${h[0]}</span><b>${h[1]}</b><em>${h[2]}</em></div>`).join('')}</div>`;
const galeria = (nums, cls = 'galeria') => `<div class="${cls}">${nums.map(n => `<a class="sobe" href="/assets/img/${n}.webp" data-foto data-legenda="Novo Espaço">${img(n, 'Novo Espaço')}</a>`).join('')}</div>`;
const cta = v => `<section class="cta-seg sobe"><div><h2>Venha conhecer a Novo Espaço</h2><p>Agende uma visita e veja de perto os espaços, a rotina e a equipe.</p></div><p class="bts"><a class="btn" href="${link(v, 'contato')}">Agendar visita</a><a class="btn btn-linha" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${icWa()}WhatsApp</a></p></section>`;

function paginas(v, cab, home) {
  const pag = {};
  pag.index = head(v, 'index', '', 'Creche Escola Infantil Novo Espaço, no Santa Helena em Juiz de Fora: berçário a partir de 4 meses, creche das 7h às 19h e educação infantil. Desde 1999.') + topo(v, 'index') + home() + rodape(v);

  pag['quem-somos'] = head(v, 'quem-somos', 'Quem somos', 'A história, a missão e as conquistas da Creche Escola Novo Espaço, em Juiz de Fora, desde 1999.') + topo(v, 'quem-somos') + cab('Quem somos', 'Um espaço cooperativo e solidário', 'fachada') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">${SOBRE}</p><p>${SOBRE2}</p></div><figure class="sobe">${img('familia', 'Família e aluna da Novo Espaço')}</figure></section>
<section class="ident"><article class="sobe"><span>Missão</span><p>Construir um mundo melhor a partir da criança.</p></article><article class="sobe"><span>Visão</span><p>Estar entre as melhores escolas de educação infantil pelas práticas pedagógicas que privilegiam o brincar, a vivência e a experimentação e pela criteriosa política de cuidados.</p></article><article class="sobe"><span>Valores</span><ul class="valores">${VALORES.map(x => `<li>${x}</li>`).join('')}</ul></article></section>
<section class="selo-sec sobe"><div class="selo"><b>Aqui se brinca.</b><span>Aqui se aprende pela experiência.</span></div><div><p class="k">Conquistas</p><h2>Premiada no Programa Pelo Direito de Ser Criança</h2><p>Em 2011 a Novo Espaço recebeu o selo "Aqui se Brinca", do programa realizado pela Unilever com apoio do Governo de Minas Gerais e da Fundação OMO, que reconhece escolas que valorizam o brincar e o aprender pela experiência. Foram 734 escolas participantes no país, 18 selecionadas, e a Novo Espaço foi a única escola de Minas Gerais a receber o selo.</p><p>Em maio de 2013, a escola esteve com estande próprio no Seminário Internacional de Educação, em Juiz de Fora, com o tema "Ensinar e Aprender no Século XXI".</p></div></section>
<section class="estrutura-pag"><header class="tit"><p class="k">Estrutura</p><h2>Ambiente estimulante para o desenvolvimento natural das crianças</h2></header><div class="estr-grade"><div class="sobe">${lista(ESTRUTURA)}</div>${galeria(['corredor', 'horta', 'mural', 'sala'], 'galeria g4')}</div></section>
${cta(v)}
</div>
` + rodape(v);

  for (const s of SERV) {
    pag[s.slug] = head(v, s.slug, s.nome, `${s.nome} na Creche Escola Novo Espaço, Juiz de Fora. ${s.resumo}`) + topo(v, s.slug) + cab(s.idade, s.nome, s.foto) + `
<div class="in">
<section class="serv-pag"><div class="sobe"><h2>${s.sub}</h2>${s.texto.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${p}</p>`).join('')}</div><aside class="serv-lado sobe"><h3>Na prática</h3>${lista(s.itens)}<a class="btn" href="${link(v, 'contato')}">Agendar visita</a></aside></section>
${s.campos ? `<section class="campos sobe"><header class="tit"><p class="k">BNCC</p><h2>Campos de experiência</h2></header><ol>${s.campos.map((c, i) => `<li><span>${i + 1}</span>${c}</li>`).join('')}</ol></section>` : ''}
${s.turmas ? `<section class="turmas sobe"><header class="tit"><p class="k">Turmas</p><h2>Por faixa etária, sempre à tarde</h2></header><div class="turmas-l">${s.turmas.map(t => `<div><b>${t[0]}</b><span>${t[1]}</span></div>`).join('')}</div></section>` : ''}
${galeria(s.fotos)}
${cta(v)}
</div>
` + rodape(v);
  }

  pag.atividades = head(v, 'atividades', 'Atividades', 'Musicalização, inglês, oficinas, ballet e capoeira na Creche Escola Novo Espaço, Juiz de Fora.') + topo(v, 'atividades') + cab('Cultura, esporte e muita arte', 'Atividades', 'atividade-patio') + `
<div class="in">
<p class="lead intro sobe">Para tornar ainda mais rica e prazerosa a vivência dos alunos, a Novo Espaço oferece atividades semanais de enriquecimento do currículo, com práticas esportivas e artísticas e aulas de inglês.</p>
<section class="ativ-grade">${ATIV.map((a, i) => `<article class="ativ a${i} sobe"><h2>${a[0]}</h2><p>${a[1]}</p></article>`).join('')}<figure class="ativ-foto sobe">${img('artes', 'Materiais de artes da Novo Espaço')}</figure></section>
${cta(v)}
</div>
` + rodape(v);

  pag.familias = head(v, 'familias', 'Para as famílias', 'Documentos para matrícula, listas de material 2026, Guia dos Pais e e-books da Creche Escola Novo Espaço.') + topo(v, 'familias') + cab('Secretaria', 'Para as famílias', 'familia') + `
<div class="in">
<section class="fam-grade"><article class="fam sobe"><h2>Documentos para matrícula</h2>${lista(DOCS)}<a class="link-seta" href="${link(v, 'contato')}">Agendar visita ${ic('seta')}</a></article><article class="fam sobe"><h2>Lista de material 2026</h2><ul class="listas">${LISTAS.map(l => `<li><a href="${UP}2018/11/${l[1]}" target="_blank" rel="noopener">${l[0]}<span>Ver lista ${ic('seta')}</span></a></li>`).join('')}</ul></article></section>
<section class="guias-sec"><header class="tit"><p class="k">Para ler em casa</p><h2>Guias e e-books</h2></header><div class="guias">${GUIAS.map(g => `<a class="guia sobe" href="${UP}${g[2]}" target="_blank" rel="noopener">${ic('livro')}<div><h3>${g[0]}</h3><p>${g[1]}</p><span class="link-seta">Baixar PDF ${ic('seta')}</span></div></a>`).join('')}</div></section>
<section class="hor-sec sobe"><h2>Funcionamento</h2>${horas()}</section>
</div>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Creche Escola Novo Espaço: ${E.rua}, ${E.bairro}, ${E.cidade}. Telefone ${E.fone}, WhatsApp ${E.whats}.`) + topo(v, 'contato') + cab('Agende sua visita', 'Fale com a Novo Espaço', '') + `
<div class="in"><section class="contato-pag">
  <div class="sobe"><ul class="contato-dados"><li>${ic('tel')}<div><span>Telefone</span><a href="${telHref(E.fone)}">${E.fone}</a></div></li><li>${icWa()}<div><span>WhatsApp</span><a href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${E.whats}</a></div></li><li>${ic('mail')}<div><span>E-mail</span><a href="mailto:${E.email}">${E.email}</a><br><a href="mailto:${E.email2}">${E.email2}</a></div></li><li>${ic('pin')}<div><span>Endereço</span>${E.rua}, ${E.bairro}<br>${E.cidade}</div></li></ul>
  ${horas()}
  <iframe class="mapa" title="Mapa da Novo Espaço" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Silva Jardim, 480, Santa Helena, Juiz de Fora MG')}&z=16&output=embed"></iframe></div>
  <div class="form-caixa sobe"><h2>Agende sua visita</h2><p>Preencha e envie: a mensagem abre pronta no WhatsApp da escola.</p>${form()}</div>
</section></div>
` + rodape(v);
  return pag;
}

// ---------- A "Casinha": azul do logo, bolinhas coloridas da fachada, fachada na abertura ----------
function A() {
  const v = 'a';
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div>${foto ? `<figure>${img(foto, '', ' loading="eager"')}</figure>` : ''}</div><i class="bola b1"></i><i class="bola b2"></i></section>`;
  return paginas(v, cab, () => `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Berçário · Creche · Educação Infantil</p><h1>${LEMA}.</h1><p>Atenção integral às crianças e respeito pela infância no Santa Helena, em Juiz de Fora, desde 1999.</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Agende sua visita</a><a class="btn btn-linha" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${icWa()}WhatsApp</a></p></div>
  <figure class="hero-a-foto">${img('turma-joinha', 'Alunos da Novo Espaço fazendo joinha', ' loading="eager" fetchpriority="high"')}<i class="bola b1"></i><i class="bola b2"></i><i class="bola b3"></i></figure>
</div></section>
<section class="in serv-a"><header class="tit"><p class="k">Educação e serviços</p><h2>Da chegada do bebê ao 2º Período</h2></header>
  <div class="serv-cards">${SERV.map((s, i) => `<a class="serv s${i} sobe" href="${link(v, s.slug)}">${img(s.foto, s.nome)}<div><span class="idade">${s.idade}</span><h3>${s.nome}</h3><p>${s.resumo}</p><span class="link-seta">Saiba mais ${ic('seta')}</span></div></a>`).join('')}</div>
</section>
<section class="selo-a"><div class="in selo-a-in"><div class="selo sobe"><b>Aqui se brinca.</b><span>Aqui se aprende pela experiência.</span></div><div class="sobe"><p class="k">Programa Pelo Direito de Ser Criança</p><h2>A única escola de Minas a receber o selo</h2><p>Entre 734 escolas do país, a Novo Espaço foi premiada em 2011 pelo reconhecimento das boas práticas do brincar.</p><a class="link-seta" href="${link(v, 'quem-somos')}">Nossa história ${ic('seta')}</a></div></div></section>
<section class="in estr-a"><div class="sobe"><p class="k">Estrutura</p><h2>Ambiente estimulante para o desenvolvimento natural</h2>${lista(ESTRUTURA)}</div>${galeria(['horta', 'brinquedoteca', 'mural', 'refeitorio'], 'galeria g4')}</section>
<section class="ativ-a"><div class="in"><header class="tit"><p class="k">Atividades</p><h2>Cultura, esporte e muita arte</h2></header><ul class="ativ-chips">${ATIV.map(a => `<li class="sobe"><b>${a[0]}</b></li>`).join('')}</ul><a class="link-seta" href="${link(v, 'atividades')}">Conheça as atividades ${ic('seta')}</a></div></section>
<section class="in visita-a"><figure class="sobe">${img('fachada', 'Fachada da Novo Espaço com bolinhas coloridas')}</figure><div class="sobe"><p class="k">Agende sua visita</p><h2>${E.rua}, ${E.bairro}</h2><p>${E.cidade}</p>${horas()}<p class="bts"><a class="btn" href="${link(v, 'contato')}">Agendar visita</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>
`);
}

// ---------- B "Brincar": creme e amarelo do sol do logo, mascote, rotina como linha do tempo ----------
function B() {
  const v = 'b';
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div>${foto ? `<figure>${img(foto, '', ' loading="eager"')}</figure>` : ''}</div></section>`;
  return paginas(v, cab, () => `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Creche Escola Infantil · Juiz de Fora</p><h1>Aqui se brinca. <em>Aqui se aprende pela experiência.</em></h1><p>Berçário a partir de 4 meses, creche das 7h às 19h e educação infantil à tarde, no Santa Helena, desde 1999.</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Agende sua visita</a><a class="btn btn-linha" href="${link(v, 'quem-somos')}">Conheça a escola</a></p></div>
  <div class="hero-b-fotos"><figure class="hb1">${img('giz-parede', 'Crianças desenhando com giz na parede', ' loading="eager" fetchpriority="high"')}</figure><figure class="hb2">${img('bebe-copo', 'Bebê do berçário da Novo Espaço', ' loading="eager"')}</figure><img class="mascote" src="/assets/img/mascote.webp" alt="" width="250" height="274" loading="eager"></div>
</div></section>
<section class="in dia-b"><header class="tit"><p class="k">Um dia na Novo Espaço</p><h2>A rotina de quem fica o dia todo</h2></header>
  <ol class="dia">${[['7h', 'Chegada da creche', 'Horários fracionados conforme a rotina da família.'], ['Manhã', 'Oficinas', 'Artes, recreação, dramatização e movimento com as recreadoras.'], ['Refeições', 'Cozinha própria', 'Cardápio elaborado por nutricionista, sempre fresquinho.'], ['13h às 17h', 'Educação Infantil', 'Projetos, brincadeiras e experiências por faixa etária.'], ['Até 19h', 'Saída', 'Banho e cuidado até a família chegar.']].map(d => `<li class="sobe"><span class="h">${d[0]}</span><b>${d[1]}</b><p>${d[2]}</p></li>`).join('')}</ol>
</section>
<section class="serv-b"><div class="in">${SERV.map((s, i) => `<article class="servb${i % 2 ? ' inv' : ''} sobe"><figure>${img(s.foto, s.nome)}</figure><div><span class="idade">${s.idade}</span><h2>${s.nome}</h2><p>${s.resumo}</p>${lista(s.itens.slice(0, 3))}<a class="link-seta" href="${link(v, s.slug)}">Saiba mais ${ic('seta')}</a></div></article>`).join('')}</div></section>
<section class="in mvv-b"><div class="sobe"><p class="k">Missão</p><h2>Construir um mundo melhor a partir da criança.</h2></div><ul class="valores sobe">${VALORES.map(x => `<li>${x}</li>`).join('')}</ul></section>
<section class="fotos-b"><div class="in">${galeria(['areia-azul', 'bercario-letras', 'horta', 'atividade-patio', 'artes'], 'galeria g5')}</div></section>
<section class="in visita-b"><div class="sobe"><p class="k">Venha conhecer</p><h2>Agende sua visita</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Agendar visita</a><a class="btn btn-linha" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${icWa()}${E.whats}</a></p></div>${horas('horas-b')}</section>
`);
}

copiarSiteJs(pub, E.wa);
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8') + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Novo Espaço', artigo: 'da', url: E.url, lang: 'pt', cor: '#F2B91E', fundo: '#0F699A', claro: '#FFF8E6',
  fonteTitulo: "'Lexend',system-ui,sans-serif", fonteTexto: "'Nunito Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Casinha', paginas: 8, texto: 'Azul do logo e as bolinhas coloridas da fachada: a turma na abertura, berçário, creche e educação infantil em cartões, o selo "Aqui se brinca" e a estrutura com fotos.', pontos: ['Logo redesenhado em vetor', 'Agendamento de visita pelo WhatsApp', 'Listas de material 2026 e guias'] },
    { letra: 'b', nome: 'Brincar', paginas: 8, texto: 'Creme e amarelo do sol do logo, com o mascote: o selo como título, a rotina de um dia na escola em linha do tempo e os três serviços em blocos com foto.', pontos: ['Um dia na Novo Espaço', 'Missão e valores na página inicial', 'Galeria com fotos reais'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
