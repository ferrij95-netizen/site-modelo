// Centro Educacional Excelente (CEE), Cidade Nova, Manaus/AM: Educação Infantil, Fundamental I e II e Ensino Médio. Gera public/{a,b}/ e a página de escolha.
// node clientes/excelente/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs excelente https://www.centroeducacionalexcelente.com.br/portal/)
// Textos, campanha de matrícula, fotos e logo (vetorizado) do site atual.
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Centro Educacional Excelente', url: 'https://excelente.overtus.com.br/', antigo: 'https://www.centroeducacionalexcelente.com.br/portal/',
  fone1: '(92) 99116-9313', fone2: '(92) 99193-3516', email: 'excelente.2008@hotmail.com',
  rua: 'Rua Rio Bijogó, 29', bairro: 'Cidade Nova', cidade: 'Manaus - AM', cep: '69098-187',
  face: 'https://www.facebook.com/CEE-Centro-Educacional-Excelente-154248248043570/',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap';
const LOGO = (c = '') => `<img class="logo" src="/assets/img/logo${c}.svg" alt="Excelente, Ensino com Qualidade" width="2456" height="904">`;
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;

const HIST = [
  'O Centro Educacional Excelente é uma instituição de ensino privado que oferta o Ensino Fundamental de nove anos e o Ensino Médio, e tem como objetivo servir a comunidade e o educando, contribuindo para o desenvolvimento em todas as dimensões do indivíduo no seu meio, como agente de transformações, cidadão autêntico e ético.',
  'O Centro Educacional Excelente iniciou suas atividades em 1997 para atender o Ensino Fundamental de 1ª a 4ª série como reforço escolar, até reunir condições satisfatórias para ser uma escola de referência no bairro e nas adjacências.',
  'Com o intuito de fortalecer o conhecimento, em 2019 passou a ofertar o Ensino Médio, ampliando as oportunidades de ensino com a perspectiva centrada na aprendizagem e foco nos processos seletivos das universidades públicas da região.',
];
const LINHA = [['1997', 'Início das atividades, com o Fundamental de 1ª a 4ª série como reforço escolar.'], ['Referência', 'Escola de referência no bairro Cidade Nova e adjacências.'], ['2019', 'Início do Ensino Médio, com foco nos processos seletivos das universidades públicas.'], ['Hoje', 'Educação Infantil ao Ensino Médio, com Sistema Positivo e Google for Education.']];
const SEG = [
  { slug: 'educacao-infantil', nome: 'Educação Infantil', foto: 'sala-infantil', resumo: 'Atividades lúdicas que estimulam as descobertas, a curiosidade e as capacidades motoras e cognitivas da criança.',
    texto: ['A construção do conhecimento acontece por meio de atividades lúdicas que estimulam as descobertas, a curiosidade e as capacidades motoras e cognitivas da criança.', 'O desenvolvimento integral, um dos princípios da educação do Centro Educacional Excelente, é estimulado de forma global mediante atividades de socialização, convivência, de cuidado e de respeito com o outro, de conhecimento próprio e de desenvolvimento da autoestima e da autonomia.'] },
  { slug: 'ensino-fundamental', nome: 'Ensino Fundamental', foto: 'sala-fundamental', resumo: 'Metodologia interdisciplinar e ensino híbrido, do 1º ao 9º ano.',
    blocos: [['Ensino Fundamental I', 'O desenvolvimento de habilidades acontece por meio de confiança, e uma base sólida é diferencial na construção do conhecimento. Em nossa escola, o aluno percebe as trocas de informações que acontecem em seu cotidiano e pode usar sua curiosidade para fazer novas descobertas sobre o mundo. Com uma metodologia interdisciplinar fundamentada em uma proposta pedagógica que promove a formação humana, os alunos passam a valorizar as experiências enquanto se tornam agentes ativos de seu processo de aprendizagem.'],
      ['Ensino Fundamental II', 'Para ampliar seus conhecimentos, o aluno é encorajado a tornar a assimilação de conteúdos um processo prazeroso. Para isso, ele tem à disposição materiais atrativos que abordam as disciplinas de maneira prática e próxima de sua rotina. Ao aliar aprendizagem formal com valores, o aluno solidifica sua consciência cidadã. Nesta fase, ele ainda conta com materiais de apoio específicos, resgatando a relação cooperativa entre professor e aluno para uma formação integral.']],
    extra: ['Ensino híbrido', 'O ensino híbrido é uma das maiores tendências da Educação do século 21: uma mistura entre o ensino presencial e propostas de ensino online, integrando a Educação à tecnologia que já permeia tantos aspectos da vida do estudante. O Centro Educacional Excelente está preparado para essa modalidade de ensino. Rumo a uma nova era.'] },
  { slug: 'ensino-medio', nome: 'Ensino Médio', foto: 'ensino-medio', resumo: 'Formação para o mercado de trabalho e foco nos processos seletivos das universidades públicas.',
    texto: ['O Ensino Médio é a última etapa da educação básica no Brasil. Ele tem a duração média de três anos e antecede o ingresso no ensino superior.', 'O objetivo do Centro Educacional Excelente nesta etapa é dar uma formação voltada para o mercado de trabalho, além de aprimorar os conhecimentos já adquiridos nas etapas anteriores.'],
    extra: ['Parceria com o Sistema Positivo de Ensino', 'Para oferecer a melhor aprendizagem, o Excelente buscou um dos melhores materiais didáticos do país: o Sistema Positivo de Ensino. Os conteúdos são interligados de uma série para outra, a aprendizagem acontece de forma progressiva e interdisciplinar, e a escola garante os livros didáticos digitais e o Portal Positivo.'] },
];
const GOOGLE = ['Alunos mais satisfeitos, com aulas dinâmicas que utilizam o universo digital.', 'Satisfação dos pais, que percebem os avanços no aprendizado dos filhos.', 'Professores com o apoio de ferramentas intuitivas que facilitam a rotina escolar.', 'A força das marcas Google e Positivo na escola.'];
const EXTRAS = [
  { nome: 'Balé', foto: 'bale', txt: 'Favorece a criatividade, a musicalidade e o trabalho em grupo.', itens: ['Melhora da coordenação motora', 'Aumento da concentração', 'Noções de espaço e de localização', 'Mais flexibilidade e resistência', 'Correção da postura', 'Expressão e memória', 'Autoestima e novas amizades', 'Equilíbrio e reflexos'] },
  { nome: 'Judô', foto: 'judo', txt: 'Desenvolvimento físico, psíquico e social de forma integrada.', itens: ['Desenvolve habilidades e capacidades específicas do aluno', 'Prepara os jovens para uma convivência harmônica', 'Estimula o interesse pela competição sadia', 'Desenvolve o educando como um todo'] },
  { nome: 'Informática', foto: 'informatica', txt: 'Os alunos ampliam na prática os conhecimentos da sala de aula.', itens: ['Atividades ligadas ao conteúdo escolar', 'Teoria aliada à prática', 'Comunicação, pesquisa e informação'] },
];
const CAMPANHA = ['Matrícula grátis', '10% de desconto nas mensalidades de janeiro a dezembro', 'Aula de Robótica', 'Matrícula premiada: estoure o balão e ganhe um prêmio especial', 'Indique alunos e ganhe desconto nas mensalidades', 'Concorra ao sorteio de uma bicicleta Caloi'];

const nav = [
  { slug: 'institucional', nome: 'Institucional' },
  { slug: 'educacao-infantil', nome: 'Infantil' },
  { slug: 'ensino-fundamental', nome: 'Fundamental' },
  { slug: 'ensino-medio', nome: 'Ensino Médio' },
  { slug: 'tecnologia', nome: 'Positivo e Google' },
  { slug: 'extracurriculares', nome: 'Extracurriculares' },
  { slug: 'contato', nome: 'Contato' },
];
const cores = { a: '#0774B7', b: '#0B2545' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Escola na Cidade Nova, Manaus` : `${titulo} | Excelente`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('tel')}<a href="${telHref(E.fone1)}">${E.fone1}</a> / <a href="${telHref(E.fone2)}">${E.fone2}</a></span><span class="ft-mail">${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Excelente, página inicial">${LOGO()}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'matriculas')}">Matrículas 2026</a>
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
    <div class="rod-marca">${LOGO('-branco')}<p>Educação Infantil, Ensino Fundamental e Ensino Médio na Cidade Nova, em Manaus. Desde 1997.</p><a class="rede" href="${E.face}" target="_blank" rel="noopener">${ic('face')}Facebook</a></div>
    <div><h3>Páginas</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav, { slug: 'matriculas', nome: 'Matrículas' }].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Fale conosco</h3><ul class="rod-dados"><li>${ic('tel')}<span><a href="${telHref(E.fone1)}">${E.fone1}</a><br><a href="${telHref(E.fone2)}">${E.fone2}</a></span></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li><li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} CEE, Centro Educacional Excelente. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}
const form = (assunto = 'Pré-matrícula pelo site') => `<form class="form" data-email="${E.email}" data-assunto="${assunto}" novalidate>
  <label>Nome do responsável *<input name="responsavel" required autocomplete="name"></label>
  <div class="form-2"><label>Nome do aluno *<input name="aluno" required></label><label>Data de nascimento<input name="nascimento" type="date"></label></div>
  <div class="form-2"><label>Telefone *<input name="telefone" type="tel" required autocomplete="tel"></label><label>Segmento<select name="segmento"><option>Educação Infantil</option><option>Ensino Fundamental I</option><option>Ensino Fundamental II</option><option>Ensino Médio</option></select></label></div>
  <label>O aluno já estudou no Excelente?<select name="ja-estudou"><option>Não</option><option>Sim</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar pré-matrícula</button>
</form>`;
const campanha = (cls = '') => `<div class="campanha ${cls}"><p class="k">Matrícula 2026</p><h2>Matricule em novembro e garanta:</h2>${lista(CAMPANHA)}</div>`;

function paginas(v, cab, home) {
  const pag = {};
  pag.index = head(v, 'index', '', 'Centro Educacional Excelente, na Cidade Nova em Manaus: Educação Infantil, Ensino Fundamental e Ensino Médio com Sistema Positivo e Google for Education. Matrículas 2026 abertas.') + topo(v, 'index') + home() + rodape(v);

  pag.institucional = head(v, 'institucional', 'Institucional', 'A história do Centro Educacional Excelente, em Manaus, desde 1997.') + topo(v, 'institucional') + cab('Institucional', 'Ensino com qualidade desde 1997', 'fachada') + `
<div class="in">
<section class="texto-pag"><div class="sobe">${HIST.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${p}</p>`).join('')}</div><figure class="sobe">${img('biblioteca', 'Biblioteca do Centro Educacional Excelente')}</figure></section>
<section class="linha-sec"><header class="tit"><p class="k">Histórico</p><h2>Do reforço escolar ao Ensino Médio</h2></header><ol class="linha">${LINHA.map(l => `<li class="sobe"><b>${l[0]}</b><span>${l[1]}</span></li>`).join('')}</ol></section>
<p class="frase sobe">Oferecemos um ensino de qualidade com dedicação, aprendizado, respeito e amor!</p>
</div>
` + rodape(v);

  for (const s of SEG) {
    pag[s.slug] = head(v, s.slug, s.nome, `${s.nome} no Centro Educacional Excelente, Manaus. ${s.resumo}`) + topo(v, s.slug) + cab('Segmentos', s.nome, s.foto) + `
<div class="in">
${s.texto ? `<section class="texto-pag"><div class="sobe">${s.texto.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${p}</p>`).join('')}</div><figure class="sobe">${img(s.slug === 'ensino-medio' ? 'aula-online' : 'sala-google', s.nome)}</figure></section>` : ''}
${s.blocos ? `<section class="blocos">${s.blocos.map((b, i) => `<article class="bloco b${i} sobe"><span class="num">${i === 0 ? 'I' : 'II'}</span><h2>${b[0]}</h2><p>${b[1]}</p></article>`).join('')}</section>` : ''}
${s.extra ? `<section class="extra-seg sobe"><div><p class="k">${s.slug === 'ensino-medio' ? 'Material didático' : 'Tecnologia'}</p><h2>${s.extra[0]}</h2><p>${s.extra[1]}</p><a class="link-seta" href="${link(v, 'tecnologia')}">Positivo e Google for Education ${ic('seta')}</a></div><figure>${img(s.slug === 'ensino-medio' ? 'biblioteca' : 'informatica', s.extra[0])}</figure></section>` : ''}
<section class="cta-seg sobe"><div><h2>Matrícula 2026 aberta</h2><p>Matricule em novembro e ganhe matrícula grátis e 10% de desconto nas mensalidades.</p></div><a class="btn" href="${link(v, 'matriculas')}">Fazer pré-matrícula</a></section>
</div>
` + rodape(v);
  }

  pag.tecnologia = head(v, 'tecnologia', 'Positivo e Google for Education', 'Sistema Positivo de Ensino, Positivo ON Escola Interativa e Google for Education no Centro Educacional Excelente.') + topo(v, 'tecnologia') + cab('Tecnologia na sala de aula', 'Sistema Positivo e Google for Education', 'sala-google') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="k">Google for Education</p><h2>Um salto para o futuro da educação</h2><p>Mais de 70 milhões de pessoas no mundo utilizam e aprovam esse pacote de ferramentas.</p>${lista(GOOGLE)}</div><figure class="sobe">${img('informatica', 'Aula com computadores')}</figure></section>
<section class="duas-tec"><article class="sobe"><p class="k">Sistema Positivo de Ensino</p><h2>Livros digitais e Portal Positivo</h2><p>Conteúdos interligados de uma série para outra, aprendizagem progressiva e interdisciplinar, e assessoria de um grupo educacional que oferece excelência em educação.</p></article><article class="sobe"><p class="k">Positivo ON Escola Interativa</p><h2>A plataforma de ensino do Positivo</h2><p>A plataforma Positivo ON Escola Interativa faz parte da rotina dos alunos e apoia o ensino híbrido do Excelente.</p>${img('aula-online', 'Aula online pela plataforma Positivo')}</article></section>
</div>
` + rodape(v);

  pag.extracurriculares = head(v, 'extracurriculares', 'Extracurriculares', 'Balé, Judô e Informática no Centro Educacional Excelente.') + topo(v, 'extracurriculares') + cab('Extracurriculares', 'Balé, Judô e Informática', 'bale') + `
<div class="in">
${EXTRAS.map((x, i) => `<section class="extra-pag${i % 2 ? ' inv' : ''}"><figure class="sobe">${img(x.foto, x.nome)}</figure><div class="sobe"><h2>${x.nome}</h2><p class="lead">${x.txt}</p>${lista(x.itens)}</div></section>`).join('')}
</div>
` + rodape(v);

  pag.matriculas = head(v, 'matriculas', 'Matrículas', 'Matrícula 2026 no Centro Educacional Excelente: matrícula grátis em novembro, 10% de desconto, aula de Robótica e mais.') + topo(v, 'matriculas') + cab('Matrículas abertas', 'Matrícula 2026', 'fachada') + `
<div class="in"><section class="mat-pag">${campanha('sobe')}<div class="form-caixa sobe"><h2>Pré-matrícula</h2><p>Preencha e envie: o seu e-mail abre com os dados prontos para a escola. Entraremos em contato em breve.</p>${form()}</div></section></div>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Fale conosco', `Centro Educacional Excelente: ${E.rua}, ${E.bairro}, ${E.cidade}. Telefones ${E.fone1} e ${E.fone2}.`) + topo(v, 'contato') + cab('Fale conosco', 'Estamos na Cidade Nova', '') + `
<div class="in"><section class="contato-pag">
  <div class="sobe"><ul class="contato-dados"><li>${ic('tel')}<div><span>Telefones</span><a href="${telHref(E.fone1)}">${E.fone1}</a><br><a href="${telHref(E.fone2)}">${E.fone2}</a></div></li><li>${ic('mail')}<div><span>E-mail</span><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('pin')}<div><span>Endereço</span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</div></li><li>${ic('face')}<div><span>Facebook</span><a href="${E.face}" target="_blank" rel="noopener">CEE, Centro Educacional Excelente</a></div></li></ul>
  <iframe class="mapa" title="Mapa do Centro Educacional Excelente" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Rio Bijogó, 29, Cidade Nova, Manaus AM')}&z=16&output=embed"></iframe></div>
  <div class="form-caixa sobe"><h2>Envie sua mensagem</h2>${form('Contato pelo site')}</div>
</section></div>
` + rodape(v);
  return pag;
}

// ---------- A "Qualidade": azul do logo, fachada na abertura, campanha em amarelo ----------
function A() {
  const v = 'a';
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div>${foto ? `<figure>${img(foto, '', ' loading="eager"')}</figure>` : ''}</div></section>`;
  return paginas(v, cab, () => `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Cidade Nova · Manaus · desde 1997</p><h1>Ensino com qualidade, da Educação Infantil ao Ensino Médio.</h1><p>Dedicação, aprendizado, respeito e amor, com Sistema Positivo de Ensino e Google for Education na sala de aula.</p><p class="bts"><a class="btn" href="${link(v, 'matriculas')}">Matrícula 2026</a><a class="btn btn-linha" href="${telHref(E.fone2)}">${ic('tel')}${E.fone2}</a></p></div>
  <figure class="hero-a-foto">${img('fachada', 'Fachada do Centro Educacional Excelente', ' loading="eager" fetchpriority="high"')}</figure>
</div></section>
<section class="selos-a"><div class="in selos-in"><span>${ic('check')}Sistema Positivo de Ensino</span><span>${ic('check')}Google for Education</span><span>${ic('check')}Ensino híbrido</span><span>${ic('check')}Balé, Judô e Informática</span></div></section>
<section class="in segs-a"><header class="tit"><p class="k">Segmentos</p><h2>Uma escola para toda a vida escolar</h2></header>
  <div class="segs">${SEG.map((s, i) => `<a class="seg sobe s${i}" href="${link(v, s.slug)}">${img(s.foto, s.nome)}<div><h3>${s.nome}</h3><p>${s.resumo}</p><span class="link-seta">Saiba mais ${ic('seta')}</span></div></a>`).join('')}</div>
</section>
<section class="campanha-a"><div class="in campanha-a-in">${campanha()}<figure>${img('sala-fundamental', 'Alunos em sala de aula')}<a class="btn btn-escuro" href="${link(v, 'matriculas')}">Fazer pré-matrícula</a></figure></div></section>
<section class="in tec-a"><figure class="sobe">${img('sala-google', 'Sala Google for Education')}</figure><div class="sobe"><p class="k">Tecnologia</p><h2>Google for Education e Sistema Positivo</h2><p>Um salto para o futuro da educação: aulas dinâmicas, livros didáticos digitais, Portal Positivo e a plataforma Positivo ON Escola Interativa.</p><a class="link-seta" href="${link(v, 'tecnologia')}">Como usamos a tecnologia ${ic('seta')}</a></div></section>
<section class="extras-a"><div class="in"><header class="tit"><p class="k">Extracurriculares</p><h2>Balé, Judô e Informática</h2></header><div class="extras-grade">${EXTRAS.map(x => `<a class="ex sobe" href="${link(v, 'extracurriculares')}">${img(x.foto, x.nome)}<b>${x.nome}</b><span>${x.txt}</span></a>`).join('')}</div></div></section>
<section class="in hist-a"><div class="sobe"><p class="k">Institucional</p><h2>Desde 1997 na Cidade Nova</h2><p>${HIST[1]}</p><a class="link-seta" href="${link(v, 'institucional')}">Nossa história ${ic('seta')}</a></div><ol class="linha">${LINHA.map(l => `<li class="sobe"><b>${l[0]}</b><span>${l[1]}</span></li>`).join('')}</ol></section>
`);
}

// ---------- B "Turma": azul-marinho e turquesa do uniforme, segmentos em trilha ----------
function B() {
  const v = 'b';
  const cab = (k, t, foto) => `<section class="cab-b">${foto ? img(foto, '', ' loading="eager"') : ''}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  return paginas(v, cab, () => `
<section class="hero-b">${img('sala-fundamental', 'Alunos do Excelente em sala de aula', ' loading="eager" fetchpriority="high"')}
  <div class="in hero-b-in"><div class="hero-b-caixa"><p class="k">Centro Educacional Excelente · Manaus</p><h1>Dedicação, aprendizado, respeito e amor.</h1><p>Educação Infantil, Ensino Fundamental e Ensino Médio na Cidade Nova, desde 1997.</p><p class="bts"><a class="btn" href="${link(v, 'matriculas')}">Matrícula 2026</a><a class="btn btn-linha" href="${link(v, 'contato')}">Fale conosco</a></p></div></div>
</section>
<section class="in trilha-b"><header class="tit"><p class="k">Segmentos</p><h2>A trilha do aluno Excelente</h2></header>
  <ol class="trilha">${[['Educação Infantil', 'educacao-infantil', 'Atividades lúdicas, socialização e autonomia.'], ['Fundamental I', 'ensino-fundamental', 'Base sólida e metodologia interdisciplinar.'], ['Fundamental II', 'ensino-fundamental', 'Conteúdos práticos e consciência cidadã.'], ['Ensino Médio', 'ensino-medio', 'Foco nos processos seletivos das universidades públicas.']].map((t, i) => `<li class="sobe"><a href="${link(v, t[1])}"><span class="n">0${i + 1}</span><b>${t[0]}</b><span>${t[2]}</span></a></li>`).join('')}</ol>
</section>
<section class="fotos-b"><div class="in fotos-b-in">${[['sala-infantil', 'Educação Infantil'], ['sala-google', 'Google for Education'], ['biblioteca', 'Biblioteca'], ['informatica', 'Informática'], ['ensino-medio', 'Ensino Médio']].map((f, i) => `<figure class="fb${i} sobe">${img(f[0], f[1])}<figcaption>${f[1]}</figcaption></figure>`).join('')}</div></section>
<section class="campanha-b"><div class="in campanha-b-in">${campanha('ticket')}<div class="campanha-b-txt"><h2>Pré-matrícula pelo site</h2><p>Preencha os dados do aluno e a escola entra em contato.</p><a class="btn btn-claro" href="${link(v, 'matriculas')}">Fazer pré-matrícula</a></div></div></section>
<section class="in extras-b"><header class="tit"><p class="k">Extracurriculares</p><h2>Além da sala de aula</h2></header><div class="extras-lista">${EXTRAS.map(x => `<a class="exb sobe" href="${link(v, 'extracurriculares')}">${img(x.foto, x.nome)}<div><h3>${x.nome}</h3><p>${x.txt}</p></div></a>`).join('')}</div></section>
<section class="fachada-b"><div class="in fachada-b-in"><figure class="sobe">${img('fachada', 'Fachada do Centro Educacional Excelente')}</figure><div class="sobe"><p class="k">Visite a escola</p><h2>${E.rua}, ${E.bairro}</h2><p>${E.cidade}, CEP ${E.cep}</p><p class="bts"><a class="btn" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a><a class="btn btn-linha" href="${telHref(E.fone2)}">${ic('tel')}${E.fone2}</a></p></div></div></section>
`);
}

copiarSiteJs(pub, '');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8') + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Excelente', artigo: 'do', url: E.url, lang: 'pt', cor: '#E4AF00', fundo: '#0B2545', claro: '#F2F7FB',
  fonteTitulo: "'Sora',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Qualidade', paginas: 9, texto: 'Azul do logo com a fachada da escola na abertura, os três segmentos, a campanha de Matrícula 2026 em destaque e a tecnologia Positivo e Google.', pontos: ['Logo redesenhado em vetor', 'Campanha de matrícula de novembro', 'Pré-matrícula pelo site'] },
    { letra: 'b', nome: 'Turma', paginas: 9, texto: 'Azul-marinho e turquesa do uniforme: alunos na abertura, a trilha do aluno da Educação Infantil ao Ensino Médio e a campanha como um cupom.', pontos: ['Trilha dos segmentos', 'Fotos reais das salas', 'Endereço e telefones na página inicial'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
