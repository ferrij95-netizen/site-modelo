// Colégio Bionatus (Campo Grande/MS, com unidade no Rio de Janeiro): Ensino Fundamental, Ensino Médio e Pré-Vestibular. Gera public/{a,b}/ e a página de escolha.
// node clientes/colegiobionatus/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs colegiobionatus https://colegiobionatus.com.br/)
// Textos, fotos, professores e aprovados do site atual. O site não divulga e-mail nem WhatsApp: contato por telefone.
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const meta = JSON.parse(fs.readFileSync(path.join(aqui, 'meta.json'), 'utf8'));
const E = {
  nome: 'Colégio Bionatus', url: 'https://colegiobionatus.overtus.com.br/', antigo: 'https://colegiobionatus.com.br/',
  fone: '(67) 3321-8196', foneRj: '(21) 3496-8314',
  rua: 'Rua Rio Grande do Sul, 1000', bairro: 'Jardim dos Estados', cidade: 'Campo Grande - MS',
  ruaRj: 'Rua Sorocaba, 674', bairroRj: 'Botafogo', cidadeRj: 'Rio de Janeiro - RJ',
  face: 'https://www.facebook.com/Col%C3%A9gio-Bionatus-OFICIAL-203608773048909',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap';
const LOGO = (c = '') => `<img class="logo" src="/assets/img/logo${c}.svg" alt="Colégio Bionatus" width="436" height="300">`;
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const yt = id => `https://www.youtube.com/watch?v=${id}`;

const nav = [
  { slug: 'institucional', nome: 'Institucional' },
  { slug: 'ensino-fundamental', nome: 'Fundamental' },
  { slug: 'ensino-medio', nome: 'Ensino Médio' },
  { slug: 'pre-vestibular', nome: 'Pré-Vestibular' },
  { slug: 'aprovados', nome: 'Aprovados' },
  { slug: 'unidade-rj', nome: 'Unidade RJ' },
  { slug: 'contato', nome: 'Contato' },
];
const D = {
  ref: 'Referência de ensino em nosso país, o Colégio Bionatus está no topo da lista dos que mais aprovam vestibulandos em cursos de alta competitividade: Medicina, Direito, Engenharia, Relações Internacionais, dentre outras. Intermediando sonhos de jovens que querem se profissionalizar em grandes centros acadêmicos como USP, UNICAMP, UFRJ, UERJ, UEL, UEM, UFPR, UFMS, UFSC, bem como em outras universidades de nossa federação.',
  enem: [
    ['2006', '1º lugar do MS'],
    ['2007', '1º lugar do Centro-Oeste e 8º do Brasil'],
    ['2009', '11º lugar do Brasil'],
    ['2010', '1º lugar do Centro-Oeste e 16º do Brasil'],
    ['2011', '1º lugar do MS e 6ª melhor nota de redação do Brasil'],
    ['2013', '1º lugar do MS (escolas com mais de 60 alunos), 8º do Brasil no ranking dos 30 melhores alunos e 6ª melhor nota de redação do país'],
    ['2014', '1º lugar do Brasil (provas objetivas + redação, escolas com mais de 60 alunos avaliados)'],
    ['2015', '1º lugar do Centro-Oeste e 8º lugar do Brasil (provas objetivas + redação)'],
    ['2023', '1º lugar do Estado'],
  ],
  equipe: ['O universo educacional exige, para fins de excelência, profissionais hábeis e motivados em suas áreas de atuação.', 'A competência vem da compreensão da importância de cada indivíduo, de cada grupo, de cada célula que compõe o Colégio Bionatus. Por isso, direção, coordenação, corpo docente e demais colaboradores estão imbuídos de uma responsabilidade que visa a uma sóbria diretriz organizacional, proporcionando o alcance de uma satisfação ao mesmo tempo coletiva e individual.'],
  editora: 'O corpo docente do Colégio Bionatus é o responsável pela escrita do material didático e, para isso, conta com uma editora própria, com larga capacidade operacional, a Editora Bionatus, conduzida por uma equipe especialista em gerenciar, aprimorar e subsidiar a parte técnica desse processo.',
  universidades: ['USP', 'UNICAMP', 'UFRJ', 'UERJ', 'UEL', 'UEM', 'UFPR', 'UFMS', 'UFSC'],
  cursos: ['Medicina', 'Direito', 'Engenharia', 'Relações Internacionais'],
  passos: [['Disciplina', 'list'], ['Dedicação', 'like'], ['Organização', 'relogio']],
  videosFund: [['zN0V4bPGvAs', 'Tour do Conhecimento: 1º, 2º e 3º ano'], ['KcF8I7cWhqA', 'Ensino Fundamental no Colégio Bionatus'], ['aica2kp5f0w', 'Varal da Poesia: poema "A paz"'], ['XUfYQtckrXs', 'Inauguração Bionatus']],
  videosMedio: [['UBclzatFFcE', 'BIOCAST #001'], ['XUfYQtckrXs', 'Inauguração Bionatus']],
};
const profs = (q) => meta.prof.filter(p => !q || p[2] === q);
const aprovados = Array.from({ length: meta.aprov }, (_, i) => `aprovado-${String(i + 1).padStart(2, '0')}`);

const cores = { a: '#2E3471', b: '#F07E2C' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Ensino Fundamental, Médio e Pré-Vestibular em Campo Grande/MS` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial">${LOGO(v === 'a' ? '-branco' : '')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
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
    <div class="rod-marca">${LOGO('-branco')}<p>Ensino Fundamental, Ensino Médio e Curso Pré-Vestibular. Entre os melhores do Brasil no ENEM.</p><a class="rede" href="${E.face}" target="_blank" rel="noopener">${ic('face')}Facebook</a></div>
    <div><h3>Páginas</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Campo Grande/MS</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li></ul>
      <h3 class="rod-h3b">Rio de Janeiro/RJ</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.foneRj)}">${E.foneRj}</a></li><li>${ic('pin')}<span>${E.ruaRj}, ${E.bairroRj}<br>${E.cidadeRj}</span></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ${E.nome}. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}
const mapa = (q, t) => `<iframe class="mapa" title="${t}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed"></iframe>`;
const galeria = (fotos, cls = 'galeria') => `<div class="${cls}">${fotos.map(f => `<a class="sobe" href="/assets/img/${f[0]}.webp" data-foto data-legenda="${esc(f[1])}">${img(f[0], f[1])}${f[1] ? `<span>${f[1]}</span>` : ''}</a>`).join('')}</div>`;
const professores = (q) => `<div class="profs">${profs(q).map(p => `<figure class="prof sobe">${img(p[0], p[1])}<figcaption>${p[1].replace(' | ', '<small>')}${p[1].includes('|') ? '</small>' : ''}</figcaption></figure>`).join('')}</div>`;
const videos = arr => `<div class="videos">${arr.map(x => `<a class="video sobe" href="${yt(x[0])}" target="_blank" rel="noopener"><img src="https://img.youtube.com/vi/${x[0]}/hqdefault.jpg" alt="" loading="lazy"><span class="play">${ic('yt')}</span><b>${x[1]}</b></a>`).join('')}</div>`;
const ligue = () => `<p class="bts"><a class="btn" href="${telHref(E.fone)}">${ic('tel')}Campo Grande ${E.fone}</a><a class="btn btn-linha" href="${telHref(E.foneRj)}">${ic('tel')}Rio de Janeiro ${E.foneRj}</a></p>`;
const enemLinha = () => `<ol class="enem">${D.enem.map(e => `<li class="sobe${/^1º lugar do Brasil/.test(e[1]) ? ' topo-br' : ''}"><b>${e[0]}</b><span>${e[1]}</span></li>`).join('')}</ol>`;

function internas(v, pag, cab) {
  pag.institucional = head(v, 'institucional', 'Institucional', 'Colégio Bionatus: referência em aprovação em cursos de alta concorrência, ENEM entre os melhores do Brasil e editora própria.') + topo(v, 'institucional') + cab('Institucional', 'Referência de ensino no país', 'fachada-ms') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">${D.ref}</p><ul class="tags">${D.universidades.map(u => `<li>${u}</li>`).join('')}</ul></div><figure class="sobe">${img('fachada-noite', 'Sede do Colégio Bionatus em Campo Grande, à noite')}</figure></section>
<section class="enem-sec"><header class="tit"><p class="k">Colégio Bionatus e ENEM</p><h2>Qualidade e crescimento constante</h2></header>${enemLinha()}</section>
<section class="duas-img"><figure class="sobe">${img('aula-medio', 'Sala de aula do Colégio Bionatus')}</figure><div class="sobe"><p class="k">Nossa equipe</p><h2>Profissionais hábeis e motivados</h2>${D.equipe.map(p => `<p>${p}</p>`).join('')}</div></section>
<section class="duas-img inv"><figure class="sobe">${img('editora-apostilas', 'Apostilas da Editora Bionatus')}</figure><div class="sobe"><p class="k">Reprografia</p><h2>Material didático escrito pelos nossos professores</h2><p>${D.editora}</p></div></section>
</div>
` + rodape(v);

  pag['ensino-fundamental'] = head(v, 'ensino-fundamental', 'Ensino Fundamental', 'Ensino Fundamental do Colégio Bionatus em Campo Grande: ações educativas que respeitam o desenvolvimento do raciocínio de cada criança.') + topo(v, 'ensino-fundamental') + cab('Ensino Fundamental', 'Respeitar o raciocínio de cada criança', 'fund-fachada') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">O principal objetivo do Colégio Bionatus é desenvolver ações educativas que respeitem o desenvolvimento do raciocínio de cada criança.</p><p>O Fundamental tem prédio próprio, com jardim, pátio, quadra coberta, salas amplas e sala de dança, e a mesma base de ensino que leva o Bionatus ao topo do ENEM.</p></div><figure class="sobe">${img('fund-alunos', 'Alunos do Ensino Fundamental')}</figure></section>
<section><header class="tit"><p class="k">Infraestrutura</p><h2>A casa do Fundamental</h2></header>${galeria([['fund-fachada', 'Entrada do Fundamental'], ['fund-patio', 'Pátio'], ['fund-quadra', 'Quadra coberta'], ['fund-sala', 'Sala de aula'], ['fund-jardim', 'Jardim'], ['fund-sala-danca', 'Sala de dança'], ['fund-sala-3', 'Sala de aula'], ['fund-corredor', 'Circulação']])}</section>
<section class="vida"><header class="tit"><p class="k">Dia a dia</p><h2>Projetos, esporte e datas especiais</h2></header>${galeria([['fund-experimento', 'Feira de ciências'], ['fund-judo', 'Judô'], ['fund-leitura', 'Momento de leitura'], ['fund-gincana', 'Educação física'], ['fund-dia-dos-pais', 'Dia dos Pais'], ['fund-dia-das-maes', 'Dia das Mães'], ['fund-informatica', 'Informática'], ['fund-apresentacao', 'Apresentação']], 'galeria galeria-vida')}</section>
<section><header class="tit"><p class="k">Professores</p><h2>Quem ensina no Fundamental</h2></header>${professores('fund')}</section>
<section class="vids"><header class="tit"><p class="k">Vídeos</p><h2>Varal da Poesia, Tour do Conhecimento e mais</h2></header>${videos(D.videosFund)}</section>
</div>
` + rodape(v);

  pag['ensino-medio'] = head(v, 'ensino-medio', 'Ensino Médio', 'Ensino Médio do Colégio Bionatus: a melhor escolha para o seu sucesso, com aprovação em Medicina, Direito e Engenharia.') + topo(v, 'ensino-medio') + cab('Ensino Médio', 'A melhor escolha para o seu sucesso', 'aula-medio') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">${D.ref}</p><h3>Cursos de alta concorrência</h3><ul class="tags">${D.cursos.map(u => `<li>${u}</li>`).join('')}</ul></div><figure class="sobe">${img('sala-aula-estudos', 'Sala de aula e estudos')}</figure></section>
<section class="passe sobe"><div><p class="k">PASSE UFMS</p><h2>Preparação para as três etapas do PASSE</h2><p>Aulas com teorias e resolução de exercícios para as três etapas do Programa de Avaliação Seriada Seletiva da UFMS.</p></div><a class="link-seta" href="${link(v, 'aprovados')}">Veja os aprovados ${ic('seta')}</a></section>
<section><header class="tit"><p class="k">Infraestrutura</p><h2>Feita para estudar</h2></header>${galeria([['sala-de-aula', 'Sala de aula'], ['sala-plantao-duvidas', 'Sala de plantão de dúvidas'], ['sala-de-estudos', 'Sala de estudos'], ['recepcao', 'Recepção'], ['cantina', 'Cantina'], ['refeitorio', 'Refeitório'], ['auditorio', 'Sala de aula'], ['recepcao-2', 'Recepção']])}</section>
<section><header class="tit"><p class="k">Professores</p><h2>Quem ensina no Médio e no Pré-Vestibular</h2></header>${professores('medio')}</section>
<section class="vids"><header class="tit"><p class="k">Vídeos</p><h2>BIOCAST e mais</h2></header>${videos(D.videosMedio)}</section>
</div>
` + rodape(v);

  pag['pre-vestibular'] = head(v, 'pre-vestibular', 'Pré-Vestibular', 'Curso Pré-Vestibular do Colégio Bionatus: maior índice de aprovação do MS.') + topo(v, 'pre-vestibular') + cab('Curso Pré-Vestibular', 'Maior índice de aprovação do MS', 'aulao') + `
<div class="in">
<section class="passos"><header class="tit"><p class="k">Passos para o sucesso</p><h2>Disciplina, dedicação e organização</h2></header><ol class="passos-lista">${D.passos.map((p, i) => `<li class="sobe"><span class="n">${i + 1}</span><b>${p[0]}</b></li>`).join('')}</ol></section>
<section class="texto-pag"><div class="sobe"><p class="lead">${D.ref}</p></div><figure class="sobe">${img('aulao-2', 'Aula do Pré-Vestibular')}</figure></section>
<section class="aprov-faixa"><header class="tit"><p class="k">Aprovados</p><h2>Quem passou pelo Bionatus</h2></header>${galeria(aprovados.slice(0, 10).map(a => [a, '']), 'galeria galeria-aprov')}<p><a class="link-seta" href="${link(v, 'aprovados')}">Todos os aprovados ${ic('seta')}</a></p></section>
</div>
` + rodape(v);

  pag.aprovados = head(v, 'aprovados', 'Aprovados', 'Alunos do Colégio Bionatus aprovados em Medicina, Engenharia, Direito e outros cursos na UFMS, USP, UEM, UFPR e mais.') + topo(v, 'aprovados') + cab('Aprovados', 'Sonhos que viraram matrícula', 'aprovados-grupo') + `
<div class="in">
<section class="texto-pag sem-img"><div class="sobe"><p class="lead">Medicina, Engenharia, Direito e outros cursos de alta concorrência na UFMS, USP, UNICAMP, UEM, UFPR e em universidades de todo o país. Cada camiseta pintada é um aluno do Bionatus aprovado.</p></div></section>
${galeria(aprovados.map(a => [a, '']), 'galeria galeria-aprov')}
<section class="enem-sec"><header class="tit"><p class="k">ENEM</p><h2>17 anos entre os melhores do Brasil</h2></header>${enemLinha()}</section>
</div>
` + rodape(v);

  pag['unidade-rj'] = head(v, 'unidade-rj', 'Unidade Rio de Janeiro', 'Colégio e Curso Pré-Vestibular Bionatus no Rio de Janeiro: Rua Sorocaba, 674, Botafogo.') + topo(v, 'unidade-rj') + cab('Unidade Rio de Janeiro', 'Colégio e Curso Pré-Vestibular em Botafogo', 'rj-fachada-2') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">A mesma proposta que colocou o Bionatus entre os melhores do Brasil no ENEM, agora em Botafogo, no Rio de Janeiro: colégio e curso pré-vestibular, com preparação para o ENEM e a UERJ e bolsão de estudos.</p><ul class="contato-dados"><li>${ic('pin')}<div><span>Endereço</span>${E.ruaRj}, ${E.bairroRj}<br>${E.cidadeRj}</div></li><li>${ic('tel')}<div><span>Telefone</span><a href="${telHref(E.foneRj)}">${E.foneRj}</a></div></li></ul></div><figure class="sobe">${img('rj-recepcao', 'Recepção da unidade Rio de Janeiro')}</figure></section>
${galeria([['rj-fachada', 'Fachada Bionatus RJ'], ['rj-sala', 'Sala de aula e estudos'], ['rj-plantao', 'Sala de plantão de dúvidas'], ['rj-circulacao', 'Área de circulação'], ['rj-atendimento', 'Sala de atendimento'], ['rj-cantina-2', 'Área de circulação da cantina'], ['rj-sala-2', 'Sala de aula e estudos'], ['rj-cantina', 'Cantina']])}
<section class="mapa-sec">${mapa(`${E.ruaRj}, ${E.bairroRj}, Rio de Janeiro`, 'Mapa da unidade Rio de Janeiro')}</section>
</div>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `${E.nome}: ${E.rua}, ${E.bairro}, ${E.cidade}. Telefone ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Matrículas abertas', 'recepcao') + `
<div class="in"><section class="contato-pag">
  <article class="unid sobe"><p class="k">Sede</p><h2>Campo Grande/MS</h2><ul class="contato-dados"><li>${ic('tel')}<div><span>Telefone</span><a href="${telHref(E.fone)}">${E.fone}</a></div></li><li>${ic('pin')}<div><span>Endereço</span>${E.rua}<br>${E.bairro}, ${E.cidade}</div></li></ul>${mapa(`${E.rua}, ${E.bairro}, Campo Grande MS`, 'Mapa do Colégio Bionatus em Campo Grande')}</article>
  <article class="unid sobe"><p class="k">Unidade</p><h2>Rio de Janeiro/RJ</h2><ul class="contato-dados"><li>${ic('tel')}<div><span>Telefone</span><a href="${telHref(E.foneRj)}">${E.foneRj}</a></div></li><li>${ic('pin')}<div><span>Endereço</span>${E.ruaRj}, ${E.bairroRj}<br>${E.cidadeRj}</div></li></ul>${mapa(`${E.ruaRj}, ${E.bairroRj}, Rio de Janeiro`, 'Mapa da unidade Rio de Janeiro')}</article>
</section>
<p class="nota-contato">Para matrículas, ligue para a unidade ou fale com a gente pelo <a href="${E.face}" target="_blank" rel="noopener">Facebook</a>.</p></div>
` + rodape(v);
}

const segmentos = [
  ['ensino-fundamental', 'Ensino Fundamental', 'fund-alunos', 'Ações educativas que respeitam o desenvolvimento do raciocínio de cada criança, em prédio próprio.'],
  ['ensino-medio', 'Ensino Médio', 'aula-medio', 'A melhor escolha para o seu sucesso, com preparação para o ENEM e o PASSE UFMS.'],
  ['pre-vestibular', 'Pré-Vestibular', 'aulao', 'Maior índice de aprovação do MS: disciplina, dedicação e organização.'],
];

// ---------- A "Aprovação": azul-marinho do logo, faixa laranja, sede iluminada na abertura ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Colégio Bionatus: Ensino Fundamental, Ensino Médio e Pré-Vestibular em Campo Grande/MS e no Rio de Janeiro. 17 anos entre os melhores do Brasil no ENEM.') + topo(v, 'index') + `
<section class="hero-a">${img('fachada-ms', 'Sede do Colégio Bionatus em Campo Grande', ' loading="eager" fetchpriority="high"')}
  <div class="in hero-a-in"><p class="k">Campo Grande/MS · Rio de Janeiro/RJ</p><h1>17 anos entre os melhores do Brasil no ENEM.</h1><p>Ensino Fundamental, Ensino Médio e Curso Pré-Vestibular. ENEM 2014: 1º lugar do Brasil. ENEM 2023: 1º lugar do Estado.</p>${ligue()}</div>
  <div class="faixa-laranja"></div>
</section>
<section class="in segs-a"><header class="tit"><p class="k">Seja bem-vindo ao Colégio Bionatus</p><h2>Do Fundamental à aprovação</h2></header>
  <div class="segs">${segmentos.map((s, i) => `<a class="seg sobe s${i}" href="${link(v, s[0])}">${img(s[2], s[1])}<div><h3>${s[1]}</h3><p>${s[3]}</p><span class="link-seta">Conheça ${ic('seta')}</span></div></a>`).join('')}</div>
</section>
<section class="enem-a"><div class="in enem-a-in"><div><p class="k">Colégio Bionatus e ENEM</p><h2>Qualidade e crescimento constante</h2><p>${D.ref.split('.')[0]}.</p><a class="link-seta" href="${link(v, 'institucional')}">Nossa história ${ic('seta')}</a></div>${enemLinha()}</div></section>
<section class="in aprov-a"><header class="tit"><p class="k">Aprovados</p><h2>Medicina, Engenharia, Direito: a camiseta pintada é o nosso troféu</h2></header>${galeria(aprovados.slice(0, 12).map(a => [a, '']), 'galeria galeria-aprov')}<p><a class="link-seta" href="${link(v, 'aprovados')}">Ver todos os aprovados ${ic('seta')}</a></p></section>
<section class="editora-a"><div class="in editora-in"><figure class="sobe">${img('editora-apostilas', 'Apostilas da Editora Bionatus')}</figure><div class="sobe"><p class="k">Editora própria</p><h2>O material é escrito pelos nossos professores</h2><p>${D.editora}</p></div></div></section>
<section class="in profs-a"><header class="tit"><p class="k">Professores</p><h2>Nossa equipe</h2></header>${professores('medio')}</section>
<section class="rj-a"><div class="in rj-in"><div><p class="k">Unidade Rio de Janeiro</p><h2>Colégio e Pré-Vestibular em Botafogo</h2><p>${E.ruaRj}, ${E.bairroRj} · ${E.foneRj}</p><a class="btn btn-claro" href="${link(v, 'unidade-rj')}">Conheça a unidade RJ</a></div><figure>${img('rj-fachada-2', 'Fachada da unidade Rio de Janeiro')}</figure></div></section>
` + rodape(v);
  internas(v, pag, cab);
  return pag;
}

// ---------- B "Ranking": claro, laranja forte, ranking do ENEM como peça principal e mural de aprovados ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Colégio Bionatus: Ensino Fundamental, Ensino Médio e Pré-Vestibular em Campo Grande/MS e no Rio de Janeiro. 17 anos entre os melhores do Brasil no ENEM.') + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="selo">ENEM 2014 · 1º lugar do Brasil</p><h1>Aqui o sonho vira <span>aprovação.</span></h1><p>Ensino Fundamental, Ensino Médio e Pré-Vestibular com o maior índice de aprovação do MS. Também no Rio de Janeiro.</p>${ligue()}</div>
  <div class="mosaico">${aprovados.slice(0, 9).map((a, i) => `<figure class="mo${i}">${img(a, 'Aluno aprovado do Colégio Bionatus', ' loading="eager"')}</figure>`).join('')}</div>
</div></section>
<section class="numeros-b"><div class="in">${[['17', 'anos entre os melhores do Brasil no ENEM'], ['1º', 'lugar do Brasil no ENEM 2014'], ['1º', 'lugar do Estado no ENEM 2023'], ['2', 'unidades: Campo Grande e Rio']].map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in segs-b"><header class="tit"><p class="k">Segmentos</p><h2>Escolha o seu caminho</h2></header>
  <div class="linhas">${segmentos.map((s, i) => `<a class="linha sobe" href="${link(v, s[0])}"><span class="num">0${i + 1}</span>${img(s[2], s[1])}<div><h3>${s[1]}</h3><p>${s[3]}</p></div>${ic('seta')}</a>`).join('')}<a class="linha sobe" href="${link(v, 'unidade-rj')}"><span class="num">04</span>${img('rj-fachada-2', 'Unidade RJ')}<div><h3>Unidade Rio de Janeiro</h3><p>Colégio e Curso Pré-Vestibular em Botafogo.</p></div>${ic('seta')}</a></div>
</section>
<section class="ranking"><div class="in"><header class="tit"><p class="k">Colégio Bionatus e ENEM</p><h2>Ano após ano no topo</h2></header>${enemLinha()}</div></section>
<section class="in passos-b"><div class="sobe"><p class="k">Passos para o sucesso</p><h2>Disciplina. Dedicação. Organização.</h2><p>${D.ref}</p></div><figure class="sobe">${img('fachada-noite-2', 'Sede do Colégio Bionatus iluminada à noite')}</figure></section>
<section class="profs-b"><div class="in"><header class="tit"><p class="k">Professores</p><h2>Quem faz a aprovação acontecer</h2></header>${professores('medio')}</div></section>
<section class="cta-b"><div class="in cta-b-in"><h2>Matrículas abertas</h2>${ligue()}</div></section>
` + rodape(v);
  internas(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8') + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Colégio Bionatus', artigo: 'do', url: E.url, lang: 'pt', cor: '#F07E2C', fundo: '#2E3471', claro: '#F5F6FB',
  fonteTitulo: "'Montserrat',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Aprovação', paginas: 8, texto: 'Azul-marinho do logo com faixa laranja: a sede iluminada na abertura, os três segmentos, a linha do tempo do ENEM e o mural de aprovados.', pontos: ['Logo redesenhado em vetor', 'Professores com foto e nome', 'Unidade Rio de Janeiro com página própria'] },
    { letra: 'b', nome: 'Ranking', paginas: 8, texto: 'Clara com laranja forte: mosaico de aprovados na abertura, números do ENEM em destaque e os segmentos em lista numerada.', pontos: ['"Aqui o sonho vira aprovação"', '1º lugar do Brasil no ENEM 2014 em destaque', 'Página só de aprovados'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
