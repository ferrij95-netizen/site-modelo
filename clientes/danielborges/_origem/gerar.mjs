// Dr. Daniel Borges Matias, cirurgião plástico em Belo Horizonte/MG. Gera public/{a,b}/ e a página de escolha.
// node clientes/danielborges/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs danielborges https://drdanielborgesplastica.com.br/)
// Textos: páginas do site atual (WordPress de 2016-2019): sobre, formação, cirurgias, estética, depoimentos, onde atende, contato.
// Fotos: retratos do Dr. (ensaio de Luiz Abranches, recortados), The Clinic, Hospital LifeCenter e as imagens de procedimento do site.
// Logo: o monograma "DB" em script do site, redesenhado em vetor no ciano #2bb3c8; o nome ao lado, como no logo original.
import path from 'node:path';
import fs from 'node:fs';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Dr. Daniel Borges', url: 'https://danielborges.overtus.com.br/', antigo: 'https://drdanielborgesplastica.com.br/',
  fone: '(31) 3586-2246', wa: '5531999608282', waVer: '(31) 99960-8282', email: 'contato@drdanielborgesplastica.com.br',
  horario: 'Segunda a sexta, das 9h às 12h e das 13h30 às 18h',
};
const locais = [
  { id: 'the-clinic', n: 'The Clinic Medicina Integrada', f: 'the-clinic', rua: 'Av. Raja Gabáglia, 1580, 12º andar', bairro: 'Gutierrez, Belo Horizonte/MG · CEP 30441-194', fone: '(31) 3586-2246', d: 'Consultório', q: 'Avenida Raja Gabáglia, 1580, Belo Horizonte' },
  { id: 'lifecenter', n: 'Hospital LifeCenter', f: 'lifecenter', rua: 'Av. do Contorno, 4747', bairro: 'Funcionários, Belo Horizonte/MG', fone: '(31) 3280-4000', d: 'Cirurgias', q: 'Hospital LifeCenter, Avenida do Contorno, 4747, Belo Horizonte' },
];
export const nomesVersao = { a: 'Céu', b: 'Grafite' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;1,400&family=Mulish:wght@400;600;700&display=swap';
const img = (n, alt = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const cores = { a: '#ffffff', b: '#1b2226' };
const waMsg = (m = 'Olá! Vim pelo site e quero agendar minha consulta com o Dr. Daniel Borges.') => waHref(E.wa, m);

const nav = [{ slug: 'sobre', nome: 'Dr. Daniel Borges' }, { slug: 'cirurgia-plastica', nome: 'Cirurgia plástica' }, { slug: 'estetica', nome: 'Estética' }, { slug: 'contato', nome: 'Contato' }];
const curto = 'Cirurgião plástico em Belo Horizonte, membro da Sociedade Brasileira de Cirurgia Plástica e professor da residência do Hospital das Clínicas da UFMG.';
const frase = 'Realce o que há de melhor em você e se sinta mais feliz. Muito mais que autoestima, cirurgia plástica é para quem quer qualidade de vida.';
const citacao = 'Para mim, a cirurgia plástica é uma forma de arte precisa, que busca alcançar uma aparência sob medida, não só para os seus desejos físicos, mas também para o seu estilo de vida. Eu me orgulho em alcançar resultados melhores e mais naturais possíveis a cada dia, com o mínimo de tempo de inatividade possível.';
const formacao = [
  'Especialista em Cirurgia Plástica pela Sociedade Brasileira de Cirurgia Plástica e pelo MEC',
  'Professor da Residência Médica de Cirurgia Plástica do Hospital das Clínicas da UFMG',
  'Membro da Equipe de Cirurgia Plástica dos hospitais Vera Cruz, LifeCenter, Mater Dei e João XXIII',
  'Residência médica em Cirurgia Plástica pela FHEMIG (Fundação Hospitalar do Estado de Minas Gerais)',
  'Residência médica em Cirurgia Geral pela Santa Casa de Belo Horizonte',
  'Graduação em Medicina pela Faculdade de Ciências Médicas de Minas Gerais',
];
const hospitais = ['Mater Dei', 'Vera Cruz', 'LifeCenter', 'João XXIII', 'HC-UFMG'];
const depos = [
  { c: 'Mamoplastia', t: 'Qualquer cirurgia envolve uma dose de preocupação por parte do paciente e cuidado por parte do médico. Neste caso, o cuidado em cada etapa fez toda a diferença. Me senti orientada e apoiada durante todo o processo.' },
  { c: 'Rinoplastia', t: 'Era um desejo antigo fazer a rinoplastia e com a ajuda e atenção do Dr. Daniel consegui realizá-lo. Ele me esclareceu todos os detalhes, tanto no pré como no pós-operatório. Estou muito feliz com o resultado!' },
  { c: 'Abdominoplastia e mastopexia com prótese', t: 'Escolhi o Dr. Daniel Borges porque ele me passou muita segurança desde a primeira consulta. Me explicou detalhadamente como os procedimentos seriam feitos, com muita paciência. Fiquei super satisfeita com o resultado!' },
  { c: 'Cirurgia plástica', t: 'O Dr. Daniel conversou muito comigo antes, explicando cada detalhe. Tudo transcorreu da melhor forma e não tive nenhuma complicação no pós-operatório. Recomendo o seu trabalho a todas as mulheres que desejam passar por uma cirurgia plástica.' },
];
const grupos = [
  { id: 'mamas', t: 'Mamas', f: 'p-silicone' },
  { id: 'corpo', t: 'Corpo', f: 'p-lipo' },
  { id: 'face', t: 'Face e cabelo', f: null },
  { id: 'intima', t: 'Íntima', f: null },
];
const procs = [
  { g: 'mamas', id: 'implante-de-silicone', t: 'Implante de silicone', s: 'Mamoplastia de aumento', f: 'p-silicone', p: ['É a segunda cirurgia plástica mais procurada no país, atrás só da lipoaspiração: aumenta, corrige ou devolve o volume dos seios.', 'Depois de anos de prática, podemos afirmar: o implante mamário não tem relação alguma com câncer. E uma boa infraestrutura hospitalar é essencial para o resultado final.'] },
  { g: 'mamas', id: 'mastopexia', t: 'Mastopexia', s: 'Levantamento das mamas', p: ['Com o envelhecimento, a gravidez ou a perda rápida de peso, os seios sofrem com a queda e a flacidez. A mastopexia levanta e remodela as mamas.', 'Pode ser associada à prótese de silicone, conforme o desejo e a anatomia de cada paciente.'] },
  { g: 'mamas', id: 'mamoplastia-redutora', t: 'Mamoplastia redutora', s: 'Redução das mamas', f: 'p-mamoplastia', p: ['Seios muito grandes causam dores nas costas e nos ombros, dificultam atividades físicas e a escolha de roupas, e afetam a autoestima.', 'A redutora deixa os seios proporcionais ao biótipo; em alguns casos, pode ser feita com prótese de silicone, o que é avaliado em consulta.'] },
  { g: 'corpo', id: 'abdominoplastia', t: 'Abdominoplastia', s: 'Cirurgia do abdome', f: 'p-abdominoplastia', p: ['Retira o excesso de gordura e de pele da barriga e da região abdominal, um problema que atinge muitos homens e mulheres.', 'Pode ser combinada à lipoaspiração e à mastopexia, conforme a avaliação na consulta.'] },
  { g: 'corpo', id: 'lipoaspiracao', t: 'Lipoaspiração', s: 'Gordura localizada', f: 'p-lipo', p: ['Uma das cirurgias mais procuradas do país: retira a gordura localizada da barriga, quadril, glúteos, coxas e braços, quando dieta e atividade física não bastam.', 'Lipolight e hidrolipo são variações do nome da mesma cirurgia. O que importa é operar em ambiente adequado, com um cirurgião membro da SBCP.'] },
  { g: 'corpo', id: 'lipoescultura', t: 'Lipoescultura', s: 'Contorno corporal', p: ['Une lipoaspiração e lipoenxertia: a gordura retirada de uma área é usada para esculpir outras, deixando a silhueta mais harmoniosa.', 'Tudo é combinado na consulta, sempre respeitando as características de cada pessoa para não causar exageros.'] },
  { g: 'corpo', id: 'gluteoplastia', t: 'Gluteoplastia', s: 'Cirurgia de bumbum', f: 'p-gluteo', p: ['Para quem sonha com um bumbum maior e mais arredondado: a prótese de glúteo dá projeção, simetria e uma nova remodelagem à região.', 'Também é possível aumentar os glúteos com a gordura do próprio corpo, por enxertia.'] },
  { g: 'corpo', id: 'ginecomastia', t: 'Ginecomastia', s: 'Cirurgia de peitoral', p: ['O aumento da glândula mamária em homens constrange e impede coisas simples, como tirar a camisa no calor ou ir à praia e à piscina.', 'A correção de ginecomastia é uma das cirurgias plásticas mais procuradas pelos homens, e resolve o problema.'] },
  { g: 'face', id: 'rinoplastia', t: 'Rinoplastia', s: 'Cirurgia do nariz', p: ['O nariz tem papel fundamental na harmonia do rosto. A rinoplastia corrige o que incomoda, e é cada vez mais procurada também pelos homens.'] },
  { g: 'face', id: 'blefaroplastia', t: 'Blefaroplastia', s: 'Cirurgia das pálpebras', p: ['A pele dos olhos é fina e delicada e denuncia o cansaço e o envelhecimento antes do resto do rosto. A blefaroplastia retira as bolsas de gordura e o excesso de pele e reposiciona os tecidos.'] },
  { g: 'face', id: 'otoplastia', t: 'Otoplastia', s: 'Orelhas de abano', p: ['Corrige a curvatura das orelhas afastadas, que atinge cerca de 5% das crianças e muitas vezes leva ao bullying na escola. Crianças e adultos voltam a ter uma vida normal, com excelentes resultados.'] },
  { g: 'face', id: 'transplante-capilar', t: 'Transplante capilar', s: 'Calvície', p: ['A queda de cabelo afeta muito a autoestima. O transplante capilar ficou mais acessível, é bastante simples e os resultados ficam dentro das expectativas dos pacientes.'] },
  { g: 'intima', id: 'cirurgia-intima', t: 'Cirurgia íntima', s: 'Ninfoplastia ou labioplastia', p: ['Diminui os pequenos lábios vaginais e ajuda a mulher a se sentir bem com o corpo de forma completa, mais confiante e com uma vida sexual mais plena.'] },
];
const esteticos = [
  { id: 'toxina-botulinica', t: 'Toxina botulínica', s: 'Rugas e linhas de expressão', p: ['Para as rugas e linhas de expressão, a toxina botulínica, conhecida como botox (uma marca da Allergan), proporciona resultados incríveis, e a procura no Brasil não para de crescer.'] },
  { id: 'preenchimento-facial', t: 'Preenchimento facial', s: 'Rugas, vincos e cicatrizes', p: ['Preenche as rugas e linhas de expressão mais fundas, deixando a pele mais uniforme e simétrica. Também ameniza cicatrizes e vincos na face.'] },
];

const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Dr. Daniel Borges | Cirurgião Plástico em BH' : `${titulo} | Dr. Daniel Borges`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = claro => `<span class="marca-db"><img src="/assets/db${claro ? '-clara' : ''}.svg" alt="" width="163" height="145"><span><b>Dr. Daniel Borges Matias</b><small>Cirurgia plástica · Belo Horizonte</small></span></span>`;
const fig = (n, alt) => n ? `<figure>${img(n, alt)}</figure>` : '';

function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('relogio')}${E.horario}</span><span class="faixa-dir"><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Dr. Daniel Borges, página inicial">${marca(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${waMsg()}" target="_blank" rel="noopener">Agendar consulta</a>
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
    <div class="rod-marca">${marca(true)}<p>${curto}</p></div>
    <div><h3>Páginas</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${waMsg()}" target="_blank" rel="noopener">WhatsApp ${E.waVer}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span><b>The Clinic</b>: ${locais[0].rua}, ${locais[0].bairro}</span></li>
      <li>${ic('relogio')}<span>${E.horario}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Dr. Daniel Borges Plástica. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waMsg()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site e quero agendar minha consulta com o Dr. Daniel Borges." id="agendar">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Procedimento<select name="procedimento">${[...procs, ...esteticos].map(p => `<option>${p.t}</option>`).join('')}<option>Ainda não sei</option></select></label>
  <label>Sua dúvida<textarea name="mensagem" rows="4" placeholder="Faça sua pergunta, o Dr. Daniel responde"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre pronta no WhatsApp do consultório. Se preferir, ligue: ${E.fone}.</p>
</form>`;
const mapa = q => `<iframe class="mapa" title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed"></iframe>`;
const orcar = p => `<a class="link-seta" href="${waMsg(`Olá! Vim pelo site e quero agendar uma avaliação de ${p.t.toLowerCase()} com o Dr. Daniel Borges.`)}" target="_blank" rel="noopener">Agendar avaliação ${ic('seta')}</a>`;
const cardLocal = l => `<article class="local sobe" id="${l.id}"><figure>${img(l.f, l.n)}</figure><div><p class="k">${l.d}</p><h3>${l.n}</h3><p>${ic('pin')}<span>${l.rua}<br>${l.bairro}</span></p><p>${ic('tel')}<a href="${telHref(l.fone)}">${l.fone}</a></p></div></article>`;

function comum(v, pag, cab, cta, listaProcs) {
  pag.sobre = head(v, 'sobre', 'Dr. Daniel Borges', curto) + topo(v, 'sobre') + cab('Dr. Daniel Borges', 'Cirurgião plástico em BH, membro da SBCP', 'dr-pb', 'Especializado em procedimentos estéticos e reparadores, com atuação nos principais hospitais de Belo Horizonte.') + `
<div class="in"><section class="dr-pag"><figure class="dr-recorte">${img('dr-jaleco-recorte', 'Dr. Daniel Borges Matias')}</figure><div><p class="k">Sobre</p><h2>Formação e especializações</h2><p class="lead">O Dr. Daniel Borges Matias é especializado em cirurgia plástica e filiado à SBCP, o único órgão que reconhece a formação de cirurgiões plásticos no Brasil.</p>${lista(formacao)}<blockquote class="citacao"><p>“${citacao}”</p></blockquote></div></section>
<section class="bloco" id="onde-atende"><header class="tit"><p class="k">Onde atende</p><h2>Consultório e hospital</h2></header><div class="locais">${locais.map(cardLocal).join('')}</div></section></div>
` + cta() + rodape(v);
  pag['cirurgia-plastica'] = head(v, 'cirurgia-plastica', 'Cirurgia plástica', 'Implante de silicone, mastopexia, mamoplastia, abdominoplastia, lipoaspiração, lipoescultura, gluteoplastia, rinoplastia e mais em Belo Horizonte.') + topo(v, 'cirurgia-plastica') + cab('Cirurgia plástica', 'Reparadora e estética, em hospitais de grande porte', 'dr-terno', 'Em qualquer cirurgia plástica, buscamos que a região mantenha o funcionamento e um aspecto natural.') + `
<div class="in"><nav class="grupos-nav" aria-label="Grupos">${grupos.map(g => `<a href="#${g.id}">${g.t}</a>`).join('')}</nav>${listaProcs(procs, grupos)}</div>
` + cta() + rodape(v);
  pag.estetica = head(v, 'estetica', 'Estética', 'Toxina botulínica e preenchimento facial com o Dr. Daniel Borges, em Belo Horizonte.') + topo(v, 'estetica') + cab('Estética', 'Procedimentos estéticos sem cirurgia', 'dr-jaleco-2', 'Para rugas, linhas de expressão e os sinais do tempo.') + `
<div class="in">${listaProcs(esteticos, [{ id: 'esteticos', t: 'Procedimentos estéticos' }].map(g => g), true)}</div>
` + cta() + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `WhatsApp ${E.waVer}. The Clinic, Av. Raja Gabáglia, 1580, Gutierrez, Belo Horizonte.`) + topo(v, 'contato') + cab('Contato', 'Tire suas dúvidas e agende sua consulta', 'the-clinic', 'Fale conosco para marcar sua consulta, será um prazer te atender!') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Envie sua pergunta</h2>${formulario()}</div><div><ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waMsg()}" target="_blank" rel="noopener">${E.waVer}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>${E.horario}</span></div></li>
</ul>${mapa(locais[0].q)}</div></section>
<section class="bloco"><div class="locais">${locais.map(cardLocal).join('')}</div></section></div>
` + rodape(v);
}

// ---------- A: Céu (branco, ciano do monograma e azul do site, leve) ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  const cta = () => `<section class="cta-a"><div class="in cta-in"><img src="/assets/db-clara.svg" alt="" width="163" height="145"><div><h2>Quero agendar minha consulta</h2><p>Fale conosco, será um prazer te atender.</p></div><p class="bts"><a class="btn btn-claro" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}WhatsApp</a><a class="btn btn-linha-clara" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
  const listaProcs = (lst, gs, est) => gs.map(g => `<section class="grupo-a" id="${g.id}"><header class="grupo-tit"><h2>${g.t}</h2></header><div class="procs-a">${lst.filter(p => est || p.g === g.id).map(p => `<article class="proc-a sobe${p.f ? '' : ' sem-foto'}" id="${p.id}">${fig(p.f, p.t)}<div><p class="k">${p.s}</p><h3>${p.t}</h3>${p.p.map(x => `<p>${x}</p>`).join('')}${orcar(p)}</div></article>`).join('')}</div></section>`).join('');
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Cirurgião plástico · Belo Horizonte</p><h1>Cirurgia plástica estética por Dr. Daniel Borges</h1><p>${frase}</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar consulta</a><a class="btn btn-linha" href="${link(v, 'cirurgia-plastica')}">Ver cirurgias</a></p><p class="selo-sbcp">${ic('escudo')}<span><b>Membro da SBCP</b>Escolha um especialista em cirurgia plástica</span></p></div>
<div class="hero-a-foto"><span class="disco" aria-hidden="true"></span><img class="db-fundo" src="/assets/db.svg" alt="" width="163" height="145">${img('dr-jaleco-recorte', 'Dr. Daniel Borges', ' loading="eager" fetchpriority="high"')}</div></div></section>
<section class="hosp-a"><div class="in"><span>Equipe de cirurgia plástica dos hospitais</span>${hospitais.map(h => `<b>${h}</b>`).join('')}</div></section>
<section class="in destaque-a"><header class="tit tit-linha"><div><p class="k">Mais procuradas</p><h2>As cirurgias mais procuradas</h2></div><a class="link-seta" href="${link(v, 'cirurgia-plastica')}">Todas as cirurgias ${ic('seta')}</a></header><div class="destaques">${['implante-de-silicone', 'abdominoplastia', 'lipoaspiracao', 'mamoplastia-redutora'].map(id => procs.find(p => p.id === id)).map(p => `<a class="destaque sobe" href="${link(v, 'cirurgia-plastica')}#${p.id}"><figure>${img(p.f, p.t)}</figure><h3>${p.t}</h3><p>${p.s}</p></a>`).join('')}</div></section>
<section class="outras-a"><div class="in"><header class="tit"><p class="k">Também realiza</p><h2>Do rosto ao corpo</h2></header><ul class="chips">${[...procs.filter(p => !p.f), ...esteticos].map(p => `<li><a href="${link(v, esteticos.includes(p) ? 'estetica' : 'cirurgia-plastica')}#${p.id}">${p.t}</a></li>`).join('')}</ul></div></section>
<section class="in sobre-a"><figure>${img('dr-terno', 'Dr. Daniel Borges')}</figure><div><p class="k">Formação e especializações</p><h2>Professor da residência de Cirurgia Plástica do HC-UFMG</h2>${lista(formacao.slice(0, 4))}<blockquote class="citacao"><p>“Para mim, a cirurgia plástica é uma forma de arte precisa, que busca alcançar uma aparência sob medida.”</p></blockquote><a class="link-seta" href="${link(v, 'sobre')}">Conheça o Dr. Daniel ${ic('seta')}</a></div></section>
<section class="depo-a"><div class="in"><header class="tit"><p class="k">Depoimentos</p><h2>O que nossos pacientes dizem</h2></header><div class="depos-a">${depos.map(d => `<figure class="sobe"><span class="estrelas">★★★★★</span><blockquote><p>${d.t}</p></blockquote><figcaption>${d.c}</figcaption></figure>`).join('')}</div></div></section>
<section class="in locais-a"><header class="tit"><p class="k">Onde atende</p><h2>Consultório no Gutierrez, cirurgias no LifeCenter</h2></header><div class="locais">${locais.map(cardLocal).join('')}</div></section>
` + cta() + rodape(v);
  comum(v, pag, cab, cta, listaProcs);
  return pag;
}

// ---------- B: Grafite (escuro, retrato P&B do Dr., ciano como única cor) ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div></section>`;
  const cta = () => `<section class="cta-b"><div class="in cta-in"><h2>Quero agendar minha consulta</h2><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
  const listaProcs = (lst, gs, est) => gs.map(g => `<section class="grupo-b" id="${g.id}"><header class="grupo-tit"><h2>${g.t}</h2></header><div class="procs">${lst.filter(p => est || p.g === g.id).map((p, i) => `<details class="proc sobe" id="${p.id}"${i === 0 ? ' open' : ''}><summary><b>${p.t}</b><small>${p.s}</small>${ic('seta')}</summary><div class="proc-corpo${p.f ? '' : ' sem-foto'}">${fig(p.f, p.t)}<div>${p.p.map(x => `<p>${x}</p>`).join('')}${orcar(p)}</div></div></details>`).join('')}</div></section>`).join('');
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div><p class="k">Dr. Daniel Borges Matias · Cirurgião plástico</p><h1>Muito mais que autoestima: qualidade de vida.</h1><p>Cirurgia plástica estética e reparadora em Belo Horizonte, com um especialista membro da Sociedade Brasileira de Cirurgia Plástica.</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar consulta</a><a class="btn btn-linha" href="${link(v, 'cirurgia-plastica')}">Cirurgias</a></p></div><figure class="hero-b-foto">${img('dr-pb', 'Dr. Daniel Borges', ' loading="eager" fetchpriority="high"')}</figure></div></section>
<section class="hosp-b"><div class="in"><span>Equipe de cirurgia plástica</span>${hospitais.map(h => `<b>${h}</b>`).join('')}</div></section>
<section class="in lista-b"><header class="tit"><p class="k">Cirurgias</p><h2>${procs.length} cirurgias e ${esteticos.length} procedimentos estéticos</h2></header><div class="lista-b-grade">${[...procs, ...esteticos].map((p, i) => `<a class="item-b sobe" href="${link(v, esteticos.includes(p) ? 'estetica' : 'cirurgia-plastica')}#${p.id}"><span class="num">${String(i + 1).padStart(2, '0')}</span><b>${p.t}</b><small>${p.s}</small></a>`).join('')}</div></section>
<section class="sobre-b"><div class="in sobre-b-in"><figure>${img('dr-terno-recorte', 'Dr. Daniel Borges')}</figure><div><p class="k">O cirurgião</p><blockquote><p>“${citacao}”</p><footer>Dr. Daniel Borges</footer></blockquote>${lista(formacao.slice(0, 3))}<a class="link-seta" href="${link(v, 'sobre')}">Formação completa ${ic('seta')}</a></div></div></section>
<section class="in depo-b"><header class="tit"><p class="k">Depoimentos</p><h2>Pacientes que confiaram</h2></header><div class="depos-b">${depos.map(d => `<figure class="sobe"><blockquote><p>“${d.t}”</p></blockquote><figcaption>${d.c}</figcaption></figure>`).join('')}</div></section>
<section class="locais-b"><div class="in"><header class="tit"><p class="k">Onde atende</p><h2>The Clinic e Hospital LifeCenter</h2></header><div class="locais">${locais.map(cardLocal).join('')}</div></div></section>
` + cta() + rodape(v);
  comum(v, pag, cab, cta, listaProcs);
  return pag;
}

copiarSiteJs(pub, E.wa);
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comumCss + '\n' + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Dr. Daniel Borges', artigo: 'do', url: E.url, lang: 'pt', cor: '#1f9bb4', fundo: '#1b2226', claro: '#ffffff',
  fonteTitulo: 'Spectral,Georgia,serif', fonteTexto: 'Mulish,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Branca e leve, no ciano do monograma DB: o Dr. Daniel em destaque, as cirurgias mais procuradas e os hospitais onde opera.', pontos: [`${procs.length} cirurgias explicadas`, 'Formação e hospitais à vista', 'Consulta pelo WhatsApp em um toque'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura e sóbria, com o retrato em preto e branco do Dr. Daniel e o ciano como única cor.', pontos: ['Todas as cirurgias numa lista só', 'Depoimentos de pacientes', 'Cirurgias em sanfona'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
