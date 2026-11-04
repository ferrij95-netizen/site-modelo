// Clínica de Santi, dermatologia e estética (Londrina/PR). Gera public/{a,b}/ e a página de escolha.
// node clientes/desanti/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs desanti https://clinicadesanti.com.br/)
// Textos: páginas do site atual (tema próprio em WordPress), em tratamentos.json. Fotos: pasta img do tema do site atual.
// O site atual não tem WhatsApp: os formulários abrem o e-mail (form data-email) e o botão flutuante liga para a clínica.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const T = JSON.parse(fs.readFileSync(path.join(aqui, 'tratamentos.json'), 'utf8'));
const E = {
  nome: 'Clínica de Santi', url: 'https://desanti.overtus.com.br/', antigo: 'https://clinicadesanti.com.br/',
  fone: '(43) 3324-0702', email: 'clinicadesanti@gmail.com', rua: 'Rua Senador Souza Naves, 626, sala 95', bairro: 'Centro', cidade: 'Londrina - PR',
  face: 'https://www.facebook.com/clinicadesanti',
  curto: 'Dermatologia, estética e laser no centro de Londrina, com mais de 10 anos de tradição.',
};
const historia = [
  'A Clínica de Santi é especializada em dermatologia, estética e laser, e já conta com mais de 10 anos de tradição, experiência e bom atendimento.',
  'Localizada no coração de Londrina - PR, a clínica possui estacionamento e um ambiente agradável e confortável para seus pacientes.',
  'Atendemos desde crianças até idosos, e oferecemos tratamentos nas áreas da saúde, como doenças de pele, queda de cabelos e outros, e também na estética, como tratamentos corporais e faciais para estrias, celulite, gordura localizada, manchas e rugas.',
];
const filosofia = [
  'Buscamos por meio de nossos tratamentos trazer resultados positivos ao dia a dia de nossos clientes, assim como proporcionar saúde, bem-estar e, consequentemente, um aumento significativo em sua qualidade de vida.',
  'Por isso, trabalhamos com os melhores produtos e aparelhos estéticos do mercado e temos uma equipe qualificada, sempre pronta a atender e sanar dúvidas. Em nossa clínica aliamos a beleza à saúde: todos os procedimentos são supervisionados por um profissional da área da saúde.',
];
const equipe = [
  { n: 'Dra. Elaine de Santi', c: 'Dermatologista', f: 'dra-elaine', l: ['Título de especialista pela Sociedade Brasileira de Dermatologia', 'Graduada pela Universidade Estadual de Londrina (UEL)', 'Residência médica em dermatologia pela UNESP (Botucatu - SP)'] },
  { n: 'Dra. Roberta Chaves Penco Amorese', c: 'Fisioterapeuta', f: 'dra-roberta', l: ['Graduada em Fisioterapia pela Universidade Norte do Paraná (2004)', 'Especialista em fisioterapia dermato funcional pela Faculdade Evangélica do Paraná (2007)', 'Vasta experiência em fisioterapia dermato funcional, incluindo pós-operatório de cirurgia plástica, atendimento clínico corporal e facial e gerenciamento de clínica médica', 'Membro do corpo docente do Instituto Filadélfia de Londrina (UniFil)'] },
];
const convenios = ['Unimed', 'Hospitalar', 'Bradesco Saúde', 'Cassi', 'Correios', 'Caapsml', 'Sanepar', 'Copel', 'SSG'];
const areas = {
  dermatologia: { nome: 'Dermatologia', titulo: 'Dermatologia', d: 'É a especialidade médica que trata doenças e afecções da pele e seus anexos. O dermatologista também ajuda a solucionar problemas estéticos, como manchas, celulite, estrias e cicatrizes.', foto: 'clinica-4', grupos: [['Doenças da pele', T.doencas]] },
  laser: { nome: 'Laser e botox', titulo: 'Laser, botox e preenchimento', d: 'Laser Harmony, depilação a laser Light Sheer, laser CO2 fracionado, toxina botulínica e preenchimento, com a dermatologista.', foto: 'rosto-manchas', grupos: [['Laser e injetáveis', T.laser]] },
  estetica: { nome: 'Estética', titulo: 'Estética facial e corporal', d: 'Cuidados com o rosto e o corpo, com cosméticos e aparelhos de alta tecnologia, para saúde, beleza e bem-estar.', foto: 'rosto-peeling', grupos: [['Estética facial', T.facial], ['Estética corporal', T.corporal]] },
};
const espaco = [['clinica-1', 'Entrada da clínica'], ['clinica-2', 'Recepção'], ['clinica-3', 'Sala de procedimentos'], ['clinica-4', 'Consultório']];
const alt = { 'clinica-1': 'Entrada da Clínica de Santi', 'clinica-2': 'Recepção da Clínica de Santi', 'clinica-3': 'Sala de procedimentos estéticos', 'clinica-4': 'Consultório da Clínica de Santi', 'dra-elaine': 'Dra. Elaine de Santi, dermatologista', 'dra-roberta': 'Dra. Roberta Amorese, fisioterapeuta', 'rosto-olheiras': 'Tratamento para olheiras', 'rosto-manchas': 'Pele tratada, sem manchas', 'rosto-peeling': 'Peeling facial' };
const nav = [{ slug: 'clinica', nome: 'A clínica' }, { slug: 'equipe', nome: 'Equipe' }, { slug: 'dermatologia', nome: 'Dermatologia' }, { slug: 'laser', nome: 'Laser e botox' }, { slug: 'estetica', nome: 'Estética' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Folha', b: 'Consultório' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@600;700;800&family=Lato:wght@400;700&display=swap';
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const cores = { a: '#006b39', b: '#f6f8f5' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Dermatologia e Estética em Londrina` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const marca = (claro = false) => `<span class="marca-cds"><img src="/assets/marca${claro ? '-clara' : ''}.svg" alt="" width="412" height="170"><span><b>Clínica de Santi</b><small>Dermatologia e Estética</small></span></span>`;
const agendar = link('a', 'contato');

function corpo(b) {
  let html = '', li = [];
  const fecha = () => { if (li.length) { html += `<ul class="lista-check">${li.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`; li = []; } };
  for (const [k, t] of b) {
    if (k === 'li') { li.push(t); continue; }
    fecha();
    html += k === 'h' ? `<h4>${esc(t)}</h4>` : `<p>${esc(t)}</p>`;
  }
  fecha();
  return html;
}
const perguntar = (v, t) => `<a class="link-seta" href="${link(v, 'contato')}#agendar">Agendar avaliação ${ic('seta')}</a>`;

const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Agendamento de consulta pelo site" id="agendar">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>E-mail<input name="email" type="email" autocomplete="email"></label><label>Interesse<select name="interesse"><option>Dermatologia</option><option>Estética</option><option>Laser</option></select></label></div>
  <label>Convênio médico<select name="convenio"><option>Particular</option>${convenios.map(c => `<option>${c}</option>`).join('')}</select></label>
  <label>Observações<textarea name="observacoes" rows="4" placeholder="Melhor dia e horário, tratamento de interesse..."></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar pedido de agendamento</button>
  <p class="form-nota">O pedido abre pronto no seu e-mail. Se preferir, ligue: ${E.fone}.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}</span><span>${E.bairro}, ${E.cidade}</span><span>Com estacionamento</span></div></li>
  <li>${ic('face')}<div><strong>Facebook</strong><a href="${E.face}" target="_blank" rel="noopener">Clínica de Santi</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Clínica de Santi" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Senador Souza Naves, 626, Centro, Londrina PR')}&z=16&output=embed"></iframe>`;
const listaConv = () => `<ul class="convenios">${convenios.map(c => `<li>${c}</li>`).join('')}</ul>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('pin')}${E.rua}, ${E.bairro}, Londrina</span><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial">${marca(false)}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}#agendar">${ic('calendario')}Agendar</a>
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
    <div class="rod-marca">${marca(true)}<p>${E.curto}</p><p>Responsável técnica: Dra. Elaine de Santi, dermatologista.</p></div>
    <div><h3>Páginas</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li>
      <li>${ic('face')}<a href="${E.face}" target="_blank" rel="noopener">Facebook</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Clínica de Santi. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="fone-flutua" href="${telHref(E.fone)}" aria-label="Ligar para a clínica">${ic('tel')}</a>
</body>
</html>
`;
}
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Agende seu horário</h2><p>Tudo para sua maior comodidade e praticidade. Atendemos diversos convênios médicos.</p></div><p class="bts"><a class="btn btn-claro" href="${link(v, 'contato')}#agendar">${ic('calendario')}Agendar consulta</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
const profissionais = (resumo) => `<ul class="equipe">${equipe.map(d => `<li class="sobe"><img src="/assets/img/${d.f}.webp" alt="${esc(alt[d.f])}" width="237" height="297" loading="lazy"><div><h3>${d.n}</h3><small>${d.c}</small>${resumo ? `<p>${d.l[0]}</p>` : `<ul class="lista-check">${d.l.map(x => `<li>${x}</li>`).join('')}</ul>`}</div></li>`).join('')}</ul>`;

// páginas iguais nas duas versões; cada versão passa o cabeçalho e a forma da lista de tratamentos
function comum(v, pag, cab, lista) {
  pag.clinica = head(v, 'clinica', 'A clínica', historia[0]) + topo(v, 'clinica') + cab('A clínica', '10 anos de tradição em Londrina', 'clinica-2') + `
<div class="in"><section class="texto-pag"><div><p class="lead">${historia[0]}</p>${historia.slice(1).map(p => `<p>${p}</p>`).join('')}<h3>Nossa filosofia</h3>${filosofia.map(p => `<p>${p}</p>`).join('')}</div><aside class="conv-box"><h3>Convênios</h3><p>Atendemos diversos convênios médicos:</p>${listaConv()}</aside></section>
<section class="espaco"><header class="tit"><p class="k">O espaço</p><h2>Ambiente agradável e confortável</h2></header><ul class="galeria">${espaco.map(e => `<li><a href="/assets/img/${e[0]}.webp" data-foto="${esc(e[1])}">${img(e[0])}</a></li>`).join('')}</ul></section></div>
` + cta(v) + rodape(v);
  pag.equipe = head(v, 'equipe', 'Equipe', 'Dermatologista com título da SBD e fisioterapeuta especialista em dermato funcional.') + topo(v, 'equipe') + cab('Nossa equipe', 'Conheça os profissionais', 'clinica-3') + `
<div class="in"><section class="equipe-pag">${profissionais(false)}</section></div>
` + cta(v) + rodape(v);
  for (const [k, a] of Object.entries(areas)) {
    pag[k] = head(v, k, a.titulo, a.d) + topo(v, k) + cab(k === 'dermatologia' ? 'Atendemos diversos convênios' : 'Tratamentos', a.titulo, a.foto, a.d) + `
<div class="in"><section class="area-pag"><nav class="ancoras" aria-label="Áreas">${Object.entries(areas).map(([k2, a2]) => `<a href="${link(v, k2)}"${k2 === k ? ' aria-current="page"' : ''}>${a2.nome}</a>`).join('')}</nav>${a.grupos.map(([g, itens]) => `${a.grupos.length > 1 ? `<h2 class="grupo">${g}</h2>` : ''}${lista(itens, v)}`).join('')}</section></div>
` + cta(v) + rodape(v);
  }
  pag.contato = head(v, 'contato', 'Contato', `Agende: ${E.fone}. ${E.rua}, ${E.bairro}, ${E.cidade}.`) + topo(v, 'contato') + cab('Agendar consulta', 'Fale com a gente', 'clinica-1', 'Preencha o formulário e agende sua consulta, ou ligue para a clínica.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Agende sua consulta</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}<h3 class="conv-tit">Convênios atendidos</h3>${listaConv()}</div></section></div>
` + rodape(v);
}

// A: cartões alternados com foto e texto completo
const listaA = (itens, v) => `<div class="itens-a">${itens.map(p => `<article class="item-a sobe${p.f ? '' : ' sem-foto'}" id="${p.slug}">${p.f ? `<figure>${img(p.f, p.t)}</figure>` : ''}<div><h3>${p.t}</h3>${p.s ? `<p class="sub">${p.s}</p>` : ''}${corpo(p.b)}${perguntar(v, p.t)}</div></article>`).join('')}</div>`;
// B: sanfona compacta
const listaB = (itens, v) => `<div class="procs">${itens.map((p, i) => `<details class="proc sobe" id="${p.slug}"${i === 0 ? ' open' : ''}><summary><span><b>${p.t}</b>${p.s ? `<small>${p.s}</small>` : ''}</span>${ic('seta')}</summary><div class="proc-corpo${p.f ? '' : ' sem-foto'}">${p.f ? `<figure>${img(p.f, p.t)}</figure>` : ''}<div>${corpo(p.b)}${perguntar(v, p.t)}</div></div></details>`).join('')}</div>`;
const trat = (v, k, slug) => `${link(v, k)}#${slug}`;

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Dermatologia e Estética · Londrina</p><h1>Beleza e saúde para o seu bem-estar.</h1><p>${E.curto} Atendemos diversos convênios médicos.</p><p class="bts"><a class="btn btn-claro" href="${link(v, 'contato')}#agendar">${ic('calendario')}Agende seu horário</a><a class="btn btn-linha" href="${link(v, 'dermatologia')}">Ver tratamentos</a></p></div>
<div class="hero-a-car" data-carrossel>
  <a class="slide ativo" href="${trat(v, 'estetica', 'peeling-de-cristal')}">${img('rosto-peeling', alt['rosto-peeling'], ' loading="eager" fetchpriority="high"')}<span class="legenda"><b>A temporada de peelings está aberta</b>Manchas, rejuvenescimento, acne e marcas de expressão</span></a>
  <a class="slide" href="${trat(v, 'laser', 'harmony')}">${img('rosto-manchas')}<span class="legenda"><b>Rejuvenescer, clarear manchas, tratar a acne</b>Tudo de uma vez só? Temos o tratamento ideal para você</span></a>
  <a class="slide" href="${trat(v, 'estetica', 'linfatica-facial')}">${img('rosto-olheiras')}<span class="legenda"><b>Tratamento para olheiras</b>Pacote com 5 sessões</span></a>
  <div class="pontos"></div></div></div></section>
<section class="in duas-a">
  <a class="area-a sobe" href="${link(v, 'dermatologia')}"><span class="n">${ic('escudo')}</span><div><h2>Dermatologia</h2><p>${areas.dermatologia.d}</p><ul class="mini">${T.doencas.slice(0, 6).map(d => `<li>${d.t}</li>`).join('')}<li>e mais ${T.doencas.length - 6}</li></ul></div></a>
  <a class="area-a sobe" href="${link(v, 'estetica')}"><span class="n">${ic('gota')}</span><div><h2>Estética</h2><p>O profissional de estética é especialista nos cuidados com o corpo, o rosto e o cabelo. Com cosméticos e aparelhos de alta tecnologia, melhora o aspecto da pele.</p><ul class="mini">${[...T.facial.slice(0, 4), ...T.corporal.slice(0, 2)].map(d => `<li>${d.t}</li>`).join('')}<li>e mais ${T.facial.length + T.corporal.length - 6}</li></ul></div></a>
</section>
<section class="laser-a"><div class="in"><header class="tit tit-linha"><div><p class="k">Tecnologia</p><h2>Laser, botox e preenchimento</h2></div><a class="link-seta" href="${link(v, 'laser')}">Ver todos ${ic('seta')}</a></header><ul class="aparelhos">${T.laser.map(p => `<li class="sobe"><a href="${trat(v, 'laser', p.slug)}"><figure>${img(p.f, p.t)}</figure><h3>${p.t}</h3><p>${p.s}</p></a></li>`).join('')}</ul></div></section>
<section class="in clinica-a"><div class="clinica-a-fotos">${img('clinica-2')}${img('clinica-3')}</div><div><p class="k">A clínica</p><h2>10 anos de tradição no coração de Londrina</h2><p>${historia[1]}</p><p>${historia[2]}</p><a class="link-seta" href="${link(v, 'clinica')}">Conheça a clínica ${ic('seta')}</a></div></section>
<section class="equipe-a"><div class="in"><header class="tit"><p class="k">Equipe</p><h2>Quem cuida de você</h2></header>${profissionais(true)}</div></section>
<section class="in conv-a"><div><p class="k">Convênios</p><h2>Atendemos diversos convênios médicos</h2></div>${listaConv()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab, listaA);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div><p class="k">Clínica de Santi · mais de 10 anos de tradição</p><h1>Dermatologia e estética no centro de Londrina.</h1><p>Da doença de pele ao rejuvenescimento, com a dermatologista Dra. Elaine de Santi e uma equipe qualificada.</p><p class="bts"><a class="btn" href="${link(v, 'contato')}#agendar">${ic('calendario')}Agendar consulta</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div><div class="hero-b-fotos">${img('clinica-2', alt['clinica-2'], ' loading="eager" fetchpriority="high"')}${img('clinica-4', alt['clinica-4'], ' loading="eager"')}<figure class="hero-b-dra">${img('dra-elaine', alt['dra-elaine'], ' loading="eager"')}<figcaption><b>Dra. Elaine de Santi</b>Dermatologista · SBD</figcaption></figure></div></div></section>
<section class="agenda-b"><div class="in agenda-b-in">${ic('calendario')}<div><b>Agende seu horário pelo nosso site</b><span>Tudo para sua maior comodidade e praticidade.</span></div><a class="btn" href="${link(v, 'contato')}#agendar">Agendar consulta</a></div></section>
<section class="in areas-b"><header class="tit"><p class="k">Tratamentos</p><h2>Três áreas de cuidado</h2></header><ol class="areas-lista">${Object.entries(areas).map(([k, a], i) => { const it = a.grupos.flatMap(g => g[1]); return `<li class="sobe"><a href="${link(v, k)}"><span class="n">0${i + 1}</span><div><h3>${a.titulo}</h3><p>${a.d}</p></div><ul>${it.slice(0, 4).map(p => `<li>${p.t}</li>`).join('')}${it.length > 4 ? `<li>e mais ${it.length - 4}</li>` : ''}</ul>${ic('seta')}</a></li>`; }).join('')}</ol></section>
<section class="faixa-b"><div class="faixa-b-fotos">${[['rosto-peeling', 'Temporada de peelings', 'estetica', 'peeling-de-cristal'], ['rosto-manchas', 'Laser Harmony', 'laser', 'harmony'], ['rosto-olheiras', 'Tratamento para olheiras', 'estetica', 'linfatica-facial']].map(b => `<a href="${trat(v, b[2], b[3])}"><figure>${img(b[0])}</figure><span><b>${b[1]}</b></span></a>`).join('')}</div></section>
<section class="in equipe-b"><header class="tit"><p class="k">Equipe</p><h2>Conheça os profissionais</h2></header>${profissionais(true)}<p><a class="link-seta" href="${link(v, 'equipe')}">Formação de cada profissional ${ic('seta')}</a></p></section>
<section class="visita-b"><div class="in visita-b-in"><div><p class="k">Venha nos fazer uma visita</p><h2>No centro, com estacionamento</h2><p>${E.rua}<br>${E.bairro}, ${E.cidade}</p><h3 class="conv-tit">Convênios</h3>${listaConv()}</div>${mapaFrame}</div></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab, listaB);
  return pag;
}

copiarSiteJs(pub, '');
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Clínica de Santi', artigo: 'da', url: E.url, lang: 'pt', cor: '#008547', fundo: '#004d2a', claro: '#f6f8f5',
  fonteTitulo: '"Open Sans",system-ui,sans-serif', fonteTexto: 'Lato,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: 'No verde do logo, com o carrossel de promoções do site atual e os aparelhos de laser em destaque.', pontos: ['Dermatologia, laser e estética facial e corporal', 'Fotos reais da clínica e da equipe', 'Convênios atendidos à vista'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Clara e organizada, com a clínica e a dermatologista na abertura e o agendamento sempre à mão.', pontos: ['Três áreas de cuidado, numeradas', 'Tratamentos em sanfona, fáceis de ler no celular', 'Mapa, estacionamento e convênios'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
