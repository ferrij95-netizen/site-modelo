// Kingdom School (Sorocaba/SP), escola bilíngue de imersão do berçário ao Year 5. Gera public/{a,b}/ (pt) e public/{a,b}/en/ (inglês) e a página de escolha.
// node clientes/kingdomschool/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs kingdomschool https://www.kingdomschool.com.br/)
// Textos do site atual em português e inglês (o site atual troca de idioma pelas bandeiras). Fotos do site atual e do canal da escola no YouTube.
import { esc, ic, icWa, cabeca, link as linkPt, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
let L = 'pt';
const t = (pt, en) => (L === 'en' ? en : pt);
const link = (v, s) => (L === 'en' ? `/${v}/en/${s === 'index' ? '' : `${s}/`}` : linkPt(v, s));
const linkOutro = (v, s) => (L === 'en' ? linkPt(v, s) : `/${v}/en/${s === 'index' ? '' : `${s}/`}`);
const chave = s => (L === 'en' ? (s === 'index' ? 'en' : `en/${s}`) : s);

const E = {
  nome: 'Kingdom School', url: 'https://kingdomschool.overtus.com.br/', antigo: 'https://www.kingdomschool.com.br/',
  fone: '(15) 3218-3141', wa: '551532183141', email: 'ks@kingdomschool.com.br', rh: 'team@kingdomschool.com.br',
  rua: 'Av. Três de Março, 977', bairro: 'Alto da Boa Vista', cidade: 'Sorocaba - SP',
  insta: 'https://instagram.com/kingdomschoolsorocaba', face: 'http://facebook.com/kingdomschoolsorocaba', yt: 'https://www.youtube.com/channel/UCt-B3arejNPJQBohr-ZbWTA',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Bree+Serif&family=Inter:wght@400;500;600;700&display=swap';
const LOGO = (cor = '') => `<img class="logo" src="/assets/img/logo${cor}.svg" alt="Kingdom School" width="236" height="170">`;
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const yt = id => `https://www.youtube.com/watch?v=${id}`;

// ---------- conteúdo (pt / en), do site atual ----------
const D = () => ({
  nav: [
    { slug: 'escola', nome: t('Escola', 'Our School') },
    { slug: 'kingdom-baby', nome: 'Kingdom Baby' },
    { slug: 'k3-k5', nome: t('K3 a K5', 'K3 to K5') },
    { slug: 'fundamental', nome: t('Ens. Fundamental', 'Elementary') },
    { slug: 'contato', nome: t('Contato', 'Contact') },
  ],
  slogan: t('Há 12 anos, a escola bilíngue de Sorocaba.', 'For 12 years, Sorocaba\'s bilingual school.'),
  curto: t('Escola bilíngue de imersão, do berçário ao Ensino Fundamental, com sede própria no Alto da Boa Vista, em Sorocaba.',
    'A bilingual immersion school, from nursery to Elementary School, on its own campus in Alto da Boa Vista, Sorocaba.'),
  etapas: [
    { slug: 'kingdom-baby', foto: 'bercario', nome: t('Berçário', 'Nursery'), sub: 'K-Baby · Kiddo', idade: t('bebês', 'babies'),
      d: t('Professora bilíngue e auxiliar berçarista, assessorias nutricional e psicomotora, em um ambiente acolhedor.', 'A bilingual teacher and nursery assistant, nutritional and motor development support, in a cozy space.') },
    { slug: 'k3-k5', foto: 'infantil', nome: t('Educação Infantil', 'Preschool'), sub: 'K3 · K4 · K5', idade: t('3 a 5 anos', '3 to 5 years'),
      d: t('Pré-escola bilíngue de imersão, sem apostilas: movimento, ação e emoção.', 'Bilingual immersion preschool, no textbooks: movement, action and emotion.') },
    { slug: 'fundamental', foto: 'fundamental', nome: t('Ensino Fundamental', 'Elementary School'), sub: 'Year 1 – Year 5', idade: t('6 a 10 anos', '6 to 10 years'),
      d: t('Anos iniciais em período integral, com todo o currículo nas duas línguas.', 'Full-day early years, with the whole curriculum in both languages.') },
  ],
  pilares: [
    { id: 'bilinguismo', cor: 'laranja', foto: 'bilinguismo', banner: 'banner-bilinguismo', video: 'OEySYyk78uU', t: t('Bilinguismo de imersão', 'Bilingual immersion'),
      curto: t('A criança adquire o inglês do jeito que aprendeu a primeira língua: usando.', 'Children acquire English the way they learned their first language: by using it.'),
      p: [t('A Educação na Kingdom School tem como seu maior diferencial utilizar uma língua adicional como meio de comunicação, permitindo que a criança a adquira de forma muito parecida com a aquisição da primeira língua. As pesquisas na área apontam que, quanto mais cedo ocorrer o início do aprendizado de uma segunda língua, maiores são as vantagens, tanto linguísticas como cognitivas.',
        'The educational system at Kingdom School differentiates itself by utilizing an additional language to communicate with its students. This allows children to learn a second language in a very similar way that their first language was learned. Research in the language acquisition area shows that the earlier a second language is learned, the better it is for both linguistic and cognitive matters.'),
      t('No espaço educacional, buscamos criar um ambiente de imersão na Língua Inglesa, que envolva aspectos cognitivos, emocionais e culturais, possibilitando a aprendizagem significativa e a utilização natural da nova língua.',
        'At Kingdom School, we seek to create an environment with the immersion of the English Language by bringing in cognitive, emotional, and cultural aspects; thus, providing a meaningful education with a natural use of the new language.')] },
    { id: 'socioconstrutivismo', cor: 'verde', foto: 'socioconstrutivismo', banner: 'banner-socioconstrutivismo', video: '5F49JvL1cE4', t: t('Socioconstrutivismo', 'Social constructivism'),
      curto: t('A brincadeira é o suporte do desenvolvimento integral da criança.', 'Play is what supports the child\'s whole development.'),
      p: [t('Nossa escola segue uma abordagem socioconstrutivista, que privilegia a ação da criança e suas relações com o mundo, com os adultos e com as outras crianças. Na nossa prática educacional, valorizamos a atividade mais espontânea da criança, que é a brincadeira.',
        'Our school follows a social constructivism approach, which provides children with the ability to take action and create relationships with the world, adults and other children. Our educational practice values a child\'s most spontaneous activity: to play.'),
      t('Por meio da experiência lúdica, a criança estabelece relações com o mundo, reflete sobre a sociedade e sobre suas ações, estabelece novas experiências com os objetos do conhecimento, elabora pensamentos e hipóteses. Por meio também da mediação e de propostas de atividades e projetos, a Kingdom School garante a aprendizagem integral.',
        'Through play, children build relationships with the world, reflect on society and on their own actions, try new experiences with the objects of knowledge and form thoughts and hypotheses. Through mediation, activities and projects, Kingdom School ensures whole-child learning.')] },
    { id: 'autonomia-moral', cor: 'azul', foto: 'autonomia-moral', banner: 'banner-autonomia-moral', video: 'KSEtNEfSef8', t: t('Autonomia moral', 'Moral autonomy'),
      curto: t('Conflitos viram aprendizado: buscar soluções cada vez mais justas e respeitosas.', 'Conflicts become learning: finding fairer and more respectful solutions.'),
      p: [t('Parte das vivências sociais que a escola proporciona são os chamados “conflitos” entre as crianças. Tais situações possibilitam a busca pelas mediações e resoluções cada vez mais justas e respeitosas, e este aprendizado é que enriquece nosso meio educacional. Portanto, nosso objetivo nunca será que os conflitos cessem, mas sim a busca pelo desenvolvimento das resoluções.',
        'Another part of the social experience that the school offers is referred to as “conflicts” between children. Our goal is not to cease these interactions, but to enable the search for mediations and resolutions. Over time, the children will begin to find resolutions that are more fair and respectful to each other. This learning opportunity enriches our educational environment.'),
      t('Por meio dessas situações, podemos mediar e incentivar os avanços cognitivos e emocionais que ampliam as possibilidades de relacionamento da criança. Mesmo sem se atingir uma “solução”, mantemos abertos os caminhos de comunicação, pelo respeito ao convívio e à independência de cada um.',
        'Through these situations we mediate and encourage the cognitive and emotional progress that widens each child\'s ways of relating to others. Even when no “solution” is reached, we keep communication open, out of respect for living together and for each child\'s independence.')] },
    { id: 'outdoor', cor: 'ceu', foto: 'outdoor', banner: 'banner-outdoor', video: 'XEVRrWFWqqU', t: 'Outdoor Day',
      curto: t('Aprender ao ar livre, no Woods, o bosque da escola: o único teto é o céu.', 'Learning outdoors in the Woods, the school\'s own forest: the only roof is the sky.'),
      p: [t('Com base nos estudos e fundamentos das forest schools (“escolas na floresta”), a Kingdom School inova ao trazer para sua prática o projeto fixo “Outdoor Day”, cujo principal aspecto é oferecer às crianças um espaço para aprender que seja livre, ao ar livre, cujo único teto é o céu.',
        'Kingdom School also innovates by bringing its fixed “Outdoor Day” project to its practice. This project is based on the studies and fundamentals of the “forest schools”, whose main aspect is to offer children a space to learn that is free and outdoors, where the only roof is the sky.'),
      t('Os benefícios de estar ao ar livre são inúmeros e há pesquisas que já comprovam a eficácia das “escolas na floresta”. O projeto é desenvolvido no Woods, o bosque da escola.',
        'Extensive research of forest schools has proven the effectiveness of outdoor learning. The project takes place in the Woods, the school\'s own forest.')],
      lista: t(['Usar o movimento, a brincadeira e as sensações para aprender', 'Incentivar a imaginação e a criatividade', 'Desenvolver habilidades sociais de negociação, troca de ideias e colaboração', 'Aprender a arriscar-se e a tentar novamente', 'Promover a autoestima e o autoconhecimento', 'Ampliar habilidades cognitivas, a confiança e o interesse para aprender'],
        ['Using movement, play and the senses to learn', 'Encouraging imagination and creativity', 'Developing social skills: negotiation, sharing ideas and collaboration', 'Learning to take risks and try again', 'Building self-esteem and self-knowledge', 'Growing cognitive skills, confidence and the will to learn']) },
  ],
  baby: {
    titulo: t('Por que o berçário bilíngue?', 'Why a bilingual nursery?'),
    p: [t('Os bebês nascem cidadãos do mundo: são capazes de distinguir qualquer som de qualquer língua. Mas estudos mostraram que esta habilidade tem um período crítico de aprendizagem, que está entre os 6 e 12 meses de idade! Pouco antes do primeiro aniversário, os bebês passam a limitar o aprendizado de sons de acordo com sua experiência cultural e social, ou seja, continuam a ser bons ouvintes somente das línguas a que estão expostos.',
      'Babies are born global citizens: they\'re capable of distinguishing any sound in any language. However, studies have shown that this learning skill has a crucial period, from 6 to 12 months old! Before their first birthday, babies start to limit their language learning skills to their social and cultural experiences. This means they remain good listeners only to the languages they are exposed to.'),
    t('Pesquisas comprovaram a importância do papel da professora bilíngue, que estabelece vínculos e interage com alta qualidade, o que não é possível garantir com a exposição à TV ou a áudios. Para os bebês, que têm os cérebros mais poderosos do mundo, o que importa mesmo é a interação com o outro, e esta interação terá atenção garantida no nosso Kingdom Baby!',
      'Research has proven the importance of the bilingual teacher, creating connections and high-quality interactions, something that is not guaranteed by TV or audio exposure. For babies, who have the most powerful brains in the world, what matters the most is active human interaction, and this interaction will be ensured in our Kingdom Baby!')],
    grupos: [
      ['K-Baby', t('Nosso atendimento aos bebês conta com professora bilíngue e auxiliar berçarista, assessorias nutricional e psicomotora, alimentação adequada, rica em variedade tanto nos lanches como no almoço e jantar. Em um ambiente acolhedor, os bebês vivenciam cuidados, descanso, acolhimento, vínculo, socialização e momentos de muito aprendizado, com liberdade para explorar e pesquisar.',
        'The nursery staff is composed of a bilingual teacher and nursery assistant, with nutritional and motor development support and meals that include all food groups: snacks, lunch and dinner. In its cozy space, babies experience care, rest, bonding, socialization and a lot of learning moments, with the freedom to explore and research.')],
      ['Kiddo', t('Quando os bebês crescem, passam ao grupo Kiddo, no qual ampliarão suas experiências na escola. São diversas propostas para socialização, integração, autonomia e aprendizado bilíngue.',
        'Babies that have grown up go to the Kiddo group and enhance their school experiences, with many moments of socialization, integration, autonomy and bilingual learning.')],
    ],
    marcos: t([['6–12', 'meses: o período crítico para os sons das línguas'], ['2', 'adultos por turma: professora bilíngue e auxiliar berçarista'], ['3', 'refeições: lanches, almoço e jantar']],
      [['6–12', 'months: the critical window for language sounds'], ['2', 'adults per group: bilingual teacher and nursery assistant'], ['3', 'meals: snacks, lunch and dinner']]),
  },
  infantil: {
    p: [t('A Kingdom é uma escola bilíngue de imersão: as crianças ficam expostas ao inglês durante a maior parte do tempo, portanto se tornarão competentes em duas línguas ao final do ciclo. Além deste diferencial, a Kingdom possui um Projeto Pedagógico embasado nas mais atuais pesquisas pedagógicas, com um currículo baseado nos objetivos da Base Nacional Comum Curricular e com propostas também inspiradas nos currículos de Educação Infantil da Austrália e da Nova Zelândia, exemplos de sucesso no atendimento a este período da infância.',
      'Kingdom is a bilingual immersion school: children are exposed to English most of the time, so they become competent in both languages by the end of the cycle. Kingdom also offers a pedagogical project based on the latest research in early childhood education, with a curriculum built on the Brazilian common core (BNCC) and inspired by the Australian and New Zealand early childhood curricula, known worldwide for their success.'),
    t('Na Kingdom a criança é ativa e criativa, tem liberdade para ser e para aprender, por isso não trabalhamos com apostilas ou material didático impresso. Trabalhamos com o movimento, a ação e a emoção!',
      'At Kingdom, children are active and creative, free to learn and to be themselves, and that\'s why we don\'t use premade printed textbooks. Instead, we work with movement, action and emotion!')],
    turmas: t('Nossas turmas podem ser organizadas por faixa etária ou multietárias. As turmas K3 até K5 são atendidas por professora e auxiliar bilíngues, todas formadas na área de Educação. Também têm aulas de P.E. (Educação Física) e Musicalização, com professoras especialistas.',
      'Our groups may be organized by age or multiage. Groups from K3 to K5 have bilingual teachers and assistants, all with a degree in Education. They also have P.E. and Music classes with specialist teachers.'),
    k5: t('A turma K5 amplia a carga horária em Língua Portuguesa, com foco no processo de alfabetização: literatura brasileira e reflexões sobre o sistema de escrita.',
      'K5 has more Portuguese classes each week, focused on literacy: Brazilian literature and discovering how our writing system works.'),
    periodos: t('As opções de frequência abrangem diferentes períodos, do Parcial ao Integral. As professoras ficam o período todo com o mesmo grupo para um atendimento de excelência, cuidadoso e rico em bons resultados.',
      'Attendance options go from Part Time to Full Time. Teachers spend the entire period with the same group, for excellent, careful care and the best results.'),
  },
  fund: [
    [t('Anos iniciais, do Year 1 ao Year 5', 'Early years, Year 1 to Year 5'), t('Esta etapa garante a continuidade da nossa proposta educacional especializada em Infância e a formação de excelência em duas línguas até o Year 5. As disciplinas da base comum integram o currículo junto com as disciplinas diversificadas. Todos os componentes curriculares são estudados nas duas línguas de instrução, e as crianças chegam ao final da etapa com competências cognitivas, sociais e linguísticas sólidas tanto em português quanto em inglês. Gradualmente, vão adquirindo uma postura de estudante e ampliando as competências e habilidades em todas as áreas.',
      'Elementary School ensures the continuity of our educational approach, specialized in Childhood, and guarantees excellent bilingual education through Year 5. Core curriculum subjects are integrated with diversified subjects. All curricular components are studied in both languages of instruction, so that by the end of this stage, students develop strong cognitive, social, and linguistic competencies in both Portuguese and English. Gradually, children build a learner\'s mindset and expand their skills across all areas of learning.')],
    [t('Assessorias', 'Advisory teams'), t('Para concretizar este projeto com alta qualidade, oferecemos um currículo bilíngue embasado pelas mais atuais práticas pedagógicas, contando com assessorias nas diferentes áreas do conhecimento: Matemática e Ciências, História e Geografia e Língua Portuguesa e Curadoria Literária, além de uma consultoria em Bilingual Education.',
      'To bring this project to life with high quality, we offer a bilingual curriculum grounded in the most up-to-date pedagogical practices, supported by specialized consultants in Bilingual Education and in Mathematics and Science, History and Geography, Portuguese Language, and Literary Curation.')],
    [t('Educação integral', 'Full-day education'), t('O ensino é em período integral. Do Year 1 em diante, as crianças têm uma rotina embasada nas mais modernas propostas educacionais do mundo: metodologias ativas em uma abordagem socioconstrutivista, momentos livres e dirigidos, espaço e tempo para brincar e refeições balanceadas inclusas. Esportes complementam as vivências após o horário das aulas, e as crianças dos períodos Estendido e Integral têm recreação bilíngue ao final do dia.',
      'Instruction is offered on a full-day basis. From Year 1 onwards, children follow a routine grounded in the most contemporary educational approaches worldwide: active methodologies within a socioconstructivist framework, free and guided moments, time and space for play, and balanced meals included. Sports expand learning after class hours, and children in the Extended and Full-Day programs enjoy bilingual recreation at the end of the day.')],
  ],
  assessorias: t(['Matemática e Ciências', 'História e Geografia', 'Língua Portuguesa e Curadoria Literária', 'Bilingual Education'], ['Mathematics and Science', 'History and Geography', 'Portuguese and Literary Curation', 'Bilingual Education']),
  galeria: [['acolhimento', t('Professora e crianças no Kiddo', 'Teacher and children at Kiddo')], ['professora-alunos', t('Atividade em sala com a professora', 'Classroom activity with the teacher')], ['turma-outdoor', t('Chegada à escola', 'Arriving at school')], ['festa-junina', t('Festa junina na Kingdom', 'June festival at Kingdom')], ['girassol', t('Projeto de plantio', 'Planting project')], ['fantasia', t('Dia de fantasia', 'Costume day')], ['familia', t('Formatura do Preschool', 'Preschool graduation')]],
});

const cores = { a: '#A12729', b: '#7A1E4E' };
function head(v, s, titulo, descricao) {
  const tt = s === 'index' ? `${E.nome} | ${t('Escola bilíngue em Sorocaba, do berçário ao Ensino Fundamental', 'Bilingual school in Sorocaba, Brazil')}` : `${titulo} | ${E.nome}`;
  let h = cabeca({ E, v, slug: chave(s), titulo: tt, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v], lang: t('pt-BR', 'en') });
  const pt = `${E.url}${v}/${s === 'index' ? '' : `${s}/`}`, en = `${E.url}${v}/en/${s === 'index' ? '' : `${s}/`}`;
  h = h.replace('<link rel="icon"', `<link rel="alternate" hreflang="pt-BR" href="${pt}">\n<link rel="alternate" hreflang="en" href="${en}">\n<link rel="icon"`);
  if (L === 'en') h = h.replace('og:locale" content="pt_BR"', 'og:locale" content="en_US"').replace('Pular para o conteúdo', 'Skip to content');
  return h;
}
const BAND = {
  pt: '<svg viewBox="0 0 3 2" aria-hidden="true"><rect width="3" height="2" fill="#009b3a"/><path d="M1.5.2 2.8 1 1.5 1.8.2 1z" fill="#fedf00"/><circle cx="1.5" cy="1" r=".42" fill="#002776"/></svg>',
  en: '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#012169"/><path d="M0 0l60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" stroke-width="3"/><path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="12"/><path d="M30 0v40M0 20h60" stroke="#C8102E" stroke-width="7"/></svg>',
};
function idiomas(v, s) {
  const a = `<a href="${link(v, s)}" class="ativo" aria-current="true" lang="${t('pt-BR', 'en')}">${BAND[L]}<span>${t('PT', 'EN')}</span></a>`;
  const b = `<a href="${linkOutro(v, s)}" lang="${t('en', 'pt-BR')}" hreflang="${t('en', 'pt-BR')}" title="${t('English version', 'Versão em português')}">${BAND[L === 'pt' ? 'en' : 'pt']}<span>${t('EN', 'PT')}</span></a>`;
  return `<div class="idiomas">${L === 'pt' ? a + b : b + a}</div>`;
}
const redes = () => `<div class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" target="_blank" rel="noopener" aria-label="YouTube">${ic('yt')}</a></div>`;
const waMsg = () => t('Estou no site da escola e gostaria de mais informações.', 'I\'m on the school website and would like more information.');

function topo(v, s, d) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, ${t('página inicial', 'home page')}">${LOGO(v === 'a' ? '-branco' : '')}</a>
    <nav id="menu" class="menu" aria-label="${t('Principal', 'Main')}"><ul>${d.nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <div class="topo-extra">${idiomas(v, s)}<a class="btn btn-topo" href="${waHref(E.wa, waMsg())}" target="_blank" rel="noopener">${icWa()}<span>${t('Agende uma visita', 'Book a visit')}</span></a></div>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="${t('Abrir menu', 'Open menu')}">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v, d) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca">${LOGO('-branco')}<p>${t('Educação bilíngue', 'Bilingual education')} · ${t('Berçário, Educação Infantil e Ensino Fundamental', 'Nursery, Preschool and Elementary School')}</p>${redes()}</div>
    <div><h3>${t('Páginas', 'Pages')}</h3><ul>${[{ slug: 'index', nome: t('Início', 'Home') }, ...d.nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>${t('Contato', 'Contact')}</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${icWa()}<a href="${waHref(E.wa, waMsg())}" target="_blank" rel="noopener">WhatsApp</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ${E.nome}. ${t('Todos os direitos reservados.', 'All rights reserved.')}</span><span>${t('Prévia feita pela Overtus', 'Preview by Overtus')}</span></div></div>
</footer>
<a class="wa-flutua" href="${waHref(E.wa, waMsg())}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const mapaFrame = () => `<iframe class="mapa" title="${t('Mapa da Kingdom School', 'Map to Kingdom School')}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Kingdom School, Av. Três de Março, 977, Sorocaba SP')}&z=15&output=embed"></iframe>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const video = (p, cls = '') => `<a class="video ${cls}" href="${yt(p.video)}" target="_blank" rel="noopener">${ic('yt')}<span>${t('Assista ao vídeo', 'Watch the video')}</span></a>`;
const formulario = () => `<form class="form" data-wa="${esc(t('Olá! Vim pelo site da Kingdom School.', 'Hello! I came from the Kingdom School website.'))}">
  <div class="form-duas"><label>${t('Nome', 'Name')}*<input name="nome" required autocomplete="name"></label><label>${t('Telefone', 'Phone')}*<input name="fone" type="tel" required autocomplete="tel"></label></div>
  <label>E-mail<input name="email" type="email" autocomplete="email"></label>
  <label>${t('Assunto', 'Subject')}<select name="assunto"><option>${t('Quero agendar uma visita', 'I\'d like to book a visit')}</option><option>${t('Matrícula no Berçário (Kingdom Baby)', 'Nursery enrollment (Kingdom Baby)')}</option><option>${t('Matrícula na Educação Infantil (K3 a K5)', 'Preschool enrollment (K3 to K5)')}</option><option>${t('Matrícula no Ensino Fundamental', 'Elementary School enrollment')}</option><option>${t('Outro assunto', 'Other')}</option></select></label>
  <label>${t('Idade da criança', 'Child\'s age')}<input name="idade"></label>
  <label>${t('Mensagem', 'Message')}<textarea name="msg" rows="4"></textarea></label>
  <button class="btn" type="submit">${icWa()}${t('Enviar pelo WhatsApp', 'Send via WhatsApp')}</button>
  <p class="form-nota">${t('Currículos para', 'Resumes to')} <a href="mailto:${E.rh}">${E.rh}</a></p>
</form>`;

// ---------- páginas internas (mesmo conteúdo, visual de cada versão via cab e classes) ----------
function internas(v, pag, cab, d) {
  pag[chave('escola')] = head(v, 'escola', t('Escola', 'Our School'), t('Bilinguismo de imersão, socioconstrutivismo, autonomia moral e Outdoor Day: a proposta da Kingdom School.', 'Bilingual immersion, social constructivism, moral autonomy and Outdoor Day: the Kingdom School approach.')) + topo(v, 'escola', d) + cab(t('Escola', 'Our School'), t('Quatro ideias que fazem a Kingdom diferente', 'Four ideas that make Kingdom different'), 'professora-alunos') + `
<div class="in"><nav class="indice" aria-label="${t('Nesta página', 'On this page')}">${d.pilares.map((p, i) => `<a href="#${p.id}" class="c-${p.cor}"><span>0${i + 1}</span>${p.t}</a>`).join('')}</nav></div>
${d.pilares.map((p, i) => `<section class="pilar-pag c-${p.cor}" id="${p.id}"><div class="in pilar-pag-in${i % 2 ? ' inv' : ''}">
  <div class="pilar-txt sobe"><p class="k">0${i + 1}</p><h2>${p.t}</h2><p class="lead">${p.curto}</p>${p.p.map(x => `<p>${x}</p>`).join('')}${p.lista ? `<h3>${t('Benefícios que buscamos', 'Benefits we aim for')}</h3>${lista(p.lista)}` : ''}${video(p)}</div>
  <figure class="pilar-foto sobe">${img(p.banner, p.t)}</figure>
</div></section>`).join('\n')}
<section class="in frase-final"><p>${t('É a mistura de imersão na língua, socioconstrutivismo, autonomia moral e aprendizagem ao ar livre que torna a Kingdom School única.', 'It is the mix of language immersion, social constructivism, moral autonomy and outdoor play that makes Kingdom School unique.')}</p><a class="btn" href="${link(v, 'contato')}">${t('Agende uma visita', 'Book a visit')}</a></section>
` + rodape(v, d);

  const b = d.baby;
  pag[chave('kingdom-baby')] = head(v, 'kingdom-baby', 'Kingdom Baby', t('Berçário bilíngue em Sorocaba: professora bilíngue, auxiliar berçarista, assessorias nutricional e psicomotora.', 'Bilingual nursery in Sorocaba: bilingual teacher, nursery assistant, nutritional and motor development support.')) + topo(v, 'kingdom-baby', d) + cab(t('Berçário bilíngue', 'Bilingual nursery'), 'Kingdom Baby', 'acolhimento') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><h2>${b.titulo}</h2>${b.p.map((x, i) => `<p${i ? '' : ' class="lead"'}>${x}</p>`).join('')}</div><figure class="redonda sobe">${img('bercario', t('Bebê pintando com as mãos no Kingdom Baby', 'Baby finger painting at Kingdom Baby'))}</figure></section>
<section class="marcos">${b.marcos.map(m => `<div class="sobe"><b>${m[0]}</b><span>${m[1]}</span></div>`).join('')}</section>
<section class="grupos">${b.grupos.map((g, i) => `<article class="grupo sobe"><p class="k">${t('Grupo', 'Group')} ${i + 1}</p><h2>${g[0]}</h2><p>${g[1]}</p></article>`).join('')}</section>
</div>
${proxima(v, d, 'k3-k5')}
` + rodape(v, d);

  const f = d.infantil;
  pag[chave('k3-k5')] = head(v, 'k3-k5', t('K3 a K5', 'K3 to K5'), t('Pré-escola bilíngue de imersão em Sorocaba, com currículo inspirado na Austrália e na Nova Zelândia, sem apostilas.', 'Bilingual immersion preschool in Sorocaba, with a curriculum inspired by Australia and New Zealand, no textbooks.')) + topo(v, 'k3-k5', d) + cab(t('A pré-escola bilíngue', 'Bilingual preschool'), 'K3, K4 & K5', 'professora-alunos') + `
<div class="in">
<section class="texto-pag"><div class="sobe">${f.p.map((x, i) => `<p${i ? '' : ' class="lead"'}>${x}</p>`).join('')}</div><figure class="redonda sobe">${img('infantil', t('Crianças lendo no chão da sala', 'Children reading on the classroom floor'))}</figure></section>
<section class="turmas">
  ${['K3', 'K4', 'K5'].map((k, i) => `<div class="turma sobe"><b>${k}</b><span>${t(`${i + 3} anos`, `age ${i + 3}`)}</span><p>${i === 2 ? f.k5 : t('Professora e auxiliar bilíngues, P.E. e Musicalização com especialistas.', 'Bilingual teacher and assistant, P.E. and Music with specialists.')}</p></div>`).join('')}
</section>
<section class="duas sobe"><div><h2>${t('Turmas', 'Groups')}</h2><p>${f.turmas}</p></div><div><h2>${t('Períodos', 'School times')}</h2><p>${f.periodos}</p></div></section>
</div>
${proxima(v, d, 'fundamental')}
` + rodape(v, d);

  pag[chave('fundamental')] = head(v, 'fundamental', t('Ensino Fundamental', 'Elementary School'), t('Ensino Fundamental bilíngue em período integral em Sorocaba, do Year 1 ao Year 5.', 'Full-day bilingual Elementary School in Sorocaba, Year 1 to Year 5.')) + topo(v, 'fundamental', d) + cab(t('Ensino Fundamental', 'Elementary School'), t('Excelência em duas línguas até o Year 5', 'Excellence in two languages through Year 5'), 'turma-outdoor') + `
<div class="in">
<section class="years sobe">${[1, 2, 3, 4, 5].map(n => `<span>Year ${n}</span>`).join('')}</section>
<section class="texto-pag"><div class="sobe"><h2>${d.fund[0][0]}</h2><p class="lead">${d.fund[0][1]}</p></div><figure class="redonda sobe">${img('fundamental', t('Alunos subindo em árvore no Woods', 'Students climbing a tree in the Woods'))}</figure></section>
<section class="duas"><div class="sobe"><h2>${d.fund[1][0]}</h2><p>${d.fund[1][1]}</p><ul class="tags">${d.assessorias.map(a => `<li>${a}</li>`).join('')}</ul></div><div class="sobe"><h2>${d.fund[2][0]}</h2><p>${d.fund[2][1]}</p></div></section>
</div>
${proxima(v, d, 'contato')}
` + rodape(v, d);

  pag[chave('contato')] = head(v, 'contato', t('Contato', 'Contact'), `${E.nome}: ${E.rua}, ${E.bairro}, ${E.cidade}. ${t('Telefone', 'Phone')} ${E.fone}.`) + topo(v, 'contato', d) + cab(t('Contato', 'Contact'), t('Venha conhecer a Kingdom', 'Come and visit Kingdom'), 'fachada') + `
<div class="in"><section class="contato-pag">
  <div class="sobe"><h2>${t('Fale com a secretaria', 'Talk to our office')}</h2>${formulario()}</div>
  <div class="contato-lado sobe">
    <ul class="contato-dados">
      <li>${ic('tel')}<div><span>${t('Telefone', 'Phone')}</span><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
      <li>${icWa()}<div><span>WhatsApp</span><a href="${waHref(E.wa, waMsg())}" target="_blank" rel="noopener">${E.fone}</a></div></li>
      <li>${ic('mail')}<div><span>E-mail</span><a href="mailto:${E.email}">${E.email}</a></div></li>
      <li>${ic('pin')}<div><span>${t('Endereço', 'Address')}</span>${E.rua}<br>${E.bairro}, ${E.cidade}</div></li>
    </ul>
    ${mapaFrame()}
    ${redes()}
  </div>
</section></div>
` + rodape(v, d);
}
function proxima(v, d, slug) {
  const n = d.nav.find(x => x.slug === slug);
  const e = d.etapas.find(x => x.slug === slug);
  return `<section class="proxima"><div class="in"><a href="${link(v, slug)}"><span>${t('Próxima etapa', 'Next')}</span><b>${e ? e.nome : n.nome}${e ? ` <small>${e.sub}</small>` : ''}</b>${ic('seta')}</a></div></section>`;
}

// ---------- versão A: Chave (fiel ao site atual: vermelho com curva dourada, os três círculos e os banners coloridos) ----------
function A() {
  const v = 'a', pag = {};
  for (const lang of ['pt', 'en']) {
    L = lang; const d = D();
    const cab = (k, tt, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${tt}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div><svg class="curva" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0h1440v6C1000 64 440 64 0 18z" fill="currentColor"/><path d="M0 18c440 46 1000 46 1440-12" fill="none" stroke="#DBAB00" stroke-width="6"/></svg></section>`;
    pag[chave('index')] = head(v, 'index', '', d.curto) + topo(v, 'index', d) + `
<section class="hero-a">
  <div class="in hero-a-in">
    <div class="hero-a-txt"><p class="k">${t('Educação bilíngue · Sorocaba', 'Bilingual education · Sorocaba, Brazil')}</p><h1>${t('Há 12 anos, a escola bilíngue de Sorocaba.', 'For 12 years, Sorocaba\'s bilingual school.')}</h1><p>${d.curto}</p>
      <p class="bts"><a class="btn btn-ouro" href="${link(v, 'contato')}">${t('Agende uma visita', 'Book a visit')}</a><a class="btn btn-linha" href="${link(v, 'escola')}">${t('Conheça a escola', 'Discover our school')}</a></p></div>
    <div class="hero-a-fotos"><figure class="f1">${img('professora-alunos', t('Professora bilíngue com alunos', 'Bilingual teacher with students'), ' loading="eager" fetchpriority="high"')}</figure><figure class="f2">${img('acolhimento', t('Professora acolhendo as crianças', 'Teacher welcoming children'), ' loading="eager"')}</figure></div>
  </div>
  <svg class="curva" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0h1440v10C1000 84 440 84 0 24z" fill="currentColor"/><path d="M0 24c440 60 1000 60 1440-14" fill="none" stroke="#DBAB00" stroke-width="7"/></svg>
</section>
<section class="in etapas-a"><header class="tit"><p class="k">${t('Do berçário ao Year 5', 'From nursery to Year 5')}</p><h2>${t('Uma escola para cada fase da infância', 'A school for every stage of childhood')}</h2></header>
  <div class="etapas-grade">${d.etapas.map(e => `<a class="etapa sobe" href="${link(v, e.slug)}"><figure>${img(e.foto, e.nome)}</figure><span class="idade">${e.idade}</span><h3>${e.nome}</h3><p class="sub">${e.sub}</p><p>${e.d}</p><span class="link-seta">${t('Saiba mais', 'Learn more')} ${ic('seta')}</span></a>`).join('')}</div>
</section>
<section class="pilares-a"><div class="in"><header class="tit"><p class="k">${t('Nossa proposta', 'Our approach')}</p><h2>${t('Quatro pilares, uma infância bilíngue', 'Four pillars, one bilingual childhood')}</h2></header></div>
  ${d.pilares.map((p, i) => `<article class="pilar c-${p.cor}"><div class="in pilar-in${i % 2 ? ' inv' : ''}"><figure class="sobe">${img(p.foto, p.t)}</figure><div class="sobe"><span class="num">0${i + 1}</span><h3>${p.t}</h3><p>${p.curto}</p><p class="bts"><a class="link-seta" href="${link(v, 'escola')}#${p.id}">${t('Ler mais', 'Read more')} ${ic('seta')}</a>${video(p)}</p></div></div></article>`).join('')}
</section>
<section class="in galeria-a"><header class="tit"><p class="k">${t('Dia a dia', 'Everyday life')}</p><h2>${t('A vida na Kingdom', 'Life at Kingdom')}</h2></header><div class="galeria">${d.galeria.slice(2).map(g => `<a class="sobe" href="/assets/img/${g[0]}.webp" data-foto data-legenda="${esc(g[1])}">${img(g[0], g[1])}</a>`).join('')}</div><p><a class="link-seta" href="${E.yt}" target="_blank" rel="noopener">${t('Mais vídeos no canal da escola', 'More videos on the school channel')} ${ic('seta')}</a></p></section>
<section class="cta-a"><div class="in cta-a-in"><figure>${img('fachada', t('Sede da Kingdom School no Alto da Boa Vista', 'Kingdom School campus in Alto da Boa Vista'))}</figure><div><h2>${t('Venha conhecer nossa sede no Alto da Boa Vista', 'Visit our campus in Alto da Boa Vista')}</h2><p>${E.rua} · ${E.bairro}, ${E.cidade}</p><p class="bts"><a class="btn btn-ouro" href="${waHref(E.wa, waMsg())}" target="_blank" rel="noopener">${icWa()}WhatsApp</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></div></section>
` + rodape(v, d);
    internas(v, pag, cab, d);
  }
  return pag;
}

// ---------- versão B: Woods (creme e ameixa da fachada, trilha das idades, vídeos do canal) ----------
function B() {
  const v = 'b', pag = {};
  for (const lang of ['pt', 'en']) {
    L = lang; const d = D();
    const cab = (k, tt, foto) => (foto === 'fachada' && (foto = 'festa-junina'), '') + `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${tt}</h1></div></div><figure>${img(foto, '', ' loading="eager"')}</figure></section>`;
    pag[chave('index')] = head(v, 'index', '', d.curto) + topo(v, 'index', d) + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="selo">${t('Escola bilíngue de imersão', 'Bilingual immersion school')}</p><h1>${t('Duas línguas, uma infância livre para brincar e aprender.', 'Two languages, one childhood free to play and learn.')}</h1><p>${d.curto}</p>
    <p class="bts"><a class="btn" href="${link(v, 'contato')}">${t('Agende uma visita', 'Book a visit')}</a><a class="link-seta" href="${link(v, 'escola')}">${t('Nossa proposta', 'Our approach')} ${ic('seta')}</a></p>
    <ul class="hero-b-dados"><li><b>12</b>${t('anos em Sorocaba', 'years in Sorocaba')}</li><li><b>2</b>${t('línguas de instrução', 'languages of instruction')}</li><li><b>Woods</b>${t('o bosque da escola', 'our own forest')}</li></ul></div>
  <div class="hero-b-fotos"><figure class="g1">${img('turma-outdoor', t('Alunas chegando à escola', 'Students arriving at school'), ' loading="eager" fetchpriority="high"')}</figure><figure class="g2">${img('bercario', t('Bebê pintando com as mãos', 'Baby finger painting'), ' loading="eager"')}</figure><figure class="g3">${img('fundamental', t('Crianças na árvore do Woods', 'Children in a tree in the Woods'), ' loading="eager"')}</figure></div>
</div></section>
<section class="trilha"><div class="in"><header class="tit-b"><p class="k">${t('A trilha da Kingdom', 'The Kingdom path')}</p><h2>${t('Do primeiro balbucio ao Year 5', 'From first babble to Year 5')}</h2></header>
  <ol class="trilha-lista">${[
    ['kingdom-baby', 'K-Baby', t('Bebês', 'Babies'), t('Professora bilíngue no período crítico de 6 a 12 meses.', 'A bilingual teacher during the critical 6–12 month window.')],
    ['kingdom-baby', 'Kiddo', t('Bebês maiores', 'Toddlers'), t('Socialização, integração e autonomia.', 'Socialization, integration and autonomy.')],
    ['k3-k5', 'K3 · K4 · K5', t('3 a 5 anos', '3 to 5 years'), t('Imersão em inglês, sem apostilas. K5 inicia a alfabetização.', 'English immersion, no textbooks. K5 starts literacy.')],
    ['fundamental', 'Year 1 – 5', t('6 a 10 anos', '6 to 10 years'), t('Período integral, todo o currículo em duas línguas.', 'Full day, the whole curriculum in two languages.')],
  ].map((x, i) => `<li class="sobe"><a href="${link(v, x[0])}"><span class="no">${i + 1}</span><b>${x[1]}</b><em>${x[2]}</em><p>${x[3]}</p></a></li>`).join('')}</ol>
</div></section>
<section class="in pilares-b"><header class="tit-b"><p class="k">${t('Nossa proposta', 'Our approach')}</p><h2>${t('O que faz a Kingdom diferente', 'What makes Kingdom different')}</h2></header>
  <div class="pilares-b-grade">${d.pilares.map((p, i) => `<a class="pb c-${p.cor} sobe" href="${link(v, 'escola')}#${p.id}"><figure>${img(p.foto, p.t)}</figure><div><span class="num">0${i + 1}</span><h3>${p.t}</h3><p>${p.curto}</p></div></a>`).join('')}</div>
</section>
<section class="woods"><div class="in woods-in"><figure>${img('outdoor', t('Turma no Outdoor Day', 'Class on Outdoor Day'))}</figure><div><p class="k">Outdoor Day</p><h2>${t('No Woods, o único teto é o céu.', 'In the Woods, the only roof is the sky.')}</h2><p>${d.pilares[3].p[0]}</p>${lista(d.pilares[3].lista.slice(0, 4))}</div></div></section>
<section class="in videos-b"><header class="tit-b"><p class="k">${t('Vídeos da escola', 'School videos')}</p><h2>${t('Veja a Kingdom por dentro', 'See Kingdom from the inside')}</h2></header>
  <div class="videos-grade">${d.pilares.map(p => `<a class="vid sobe" href="${yt(p.video)}" target="_blank" rel="noopener">${img(p.banner, p.t)}<span class="play">${ic('yt')}</span></a>`).join('')}</div>
</section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>${t('Matrículas e visitas', 'Enrollment and visits')}</h2><p>${t('Fale com a secretaria e conheça a nossa sede no Alto da Boa Vista.', 'Talk to our office and visit our campus in Alto da Boa Vista.')}</p></div><p class="bts"><a class="btn btn-ouro" href="${waHref(E.wa, waMsg())}" target="_blank" rel="noopener">${icWa()}WhatsApp</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>
` + rodape(v, d);
    internas(v, pag, cab, d);
  }
  return pag;
}

copiarSiteJs(pub, E.wa);
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8') + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
L = 'pt';
await escolha(pub, {
  nome: 'Kingdom School', artigo: 'da', url: E.url, lang: 'pt', cor: '#A12729', fundo: '#7A1E4E', claro: '#FFF7EA',
  fonteTitulo: "'Bree Serif',Georgia,serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Chave', paginas: 6, texto: 'Fiel ao site atual: topo vermelho com a curva dourada, os três círculos (Berçário, Infantil, Fundamental) e os quatro pilares nas cores dos banners da escola.', pontos: ['Português e inglês, como o site atual', 'Logo redesenhado em vetor, nítido em qualquer tela', 'Vídeos da escola em cada pilar'] },
    { letra: 'b', nome: 'Woods', paginas: 6, texto: 'Creme com o ameixa da fachada e o dourado da chave: trilha das idades do K-Baby ao Year 5, Outdoor Day em destaque e vídeos do canal.', pontos: ['"Duas línguas, uma infância livre para brincar e aprender"', 'Português e inglês', 'Trilha visual das etapas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
