// Pele Clínica Dermatologia (Salvador/BA). Gera public/{a,b}/ e a página de escolha.
// node clientes/peleclinica/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs peleclinica http://www.peleclinicadermatologia.com.br/)
// Textos, equipe e tratamentos: do site atual (WordPress). Fotos da clínica e da equipe: wp-json/wp/v2/media do site atual.
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Pele Clínica', url: 'https://peleclinica.overtus.com.br/', antigo: 'http://www.peleclinicadermatologia.com.br/',
  wa: '557193867583', fwa: '(71) 9386-7583', fone: '(71) 3019-4350',
  rua: 'Rua Altino Seberto de Barros, 241, sala 701', bairro: 'Itaigara', cidade: 'Salvador - BA', cep: '41830-492',
  curto: 'Dermatologia clínica, cirúrgica, estética e laser em Salvador, desde 1991.',
};
const horarios = [['Segunda a sexta', '08:30 às 18:00'], ['Sábados', '08:30 às 12:00']];
const historia = [
  'A Pele Clínica, clínica cirúrgica e dermatológica, foi fundada em 1991.',
  'Destina-se ao estudo, acompanhamento e tratamento de pacientes com problemas dermatológicos, doenças de pele, unha e cabelo, cirurgias dermatológicas e cuidados com a saúde, estética e bem-estar da pele.',
  'Nossa equipe é composta por dermatologistas, membros da Sociedade Brasileira de Dermatologia, capacitadas para oferecer um atendimento humanizado, ético e de qualidade, com tratamentos seguros e eficazes, orientação adequada e comprovação científica.',
];
const equipe = [
  { n: 'Dra. Cibele Araújo', f: 'cibele', crm: 'CRM-BA 12959 · RQE 5749', l: ['Graduada em Medicina pela Universidade Federal da Bahia', 'Especialista pela Sociedade Brasileira de Dermatologia', 'Estágio no serviço de dermatologia do Hospital Pedro Ernesto (Rio de Janeiro) e do Hospital do Servidor Municipal (São Paulo)', 'Membro da Sociedade Brasileira de Dermatologia'] },
  { n: 'Dra. Hillane Rodrigues', f: 'hillane', crm: 'CRM-BA 21663 · RQE 13111', l: ['Graduada em Medicina pela Universidade Federal da Bahia', 'Especialista pela Sociedade Brasileira de Dermatologia', 'Residência em Dermatologia pelo Centro de Referência Nacional em Dermatologia Sanitária Dona Libânia, Escola de Saúde Pública do Ceará', 'Membro da Sociedade Brasileira de Dermatologia'] },
  { n: 'Dra. Karina Frias Mota', f: 'karina', crm: 'CRM-BA 15890 · RQE 11538', l: ['Graduação em Medicina pela Escola Bahiana de Medicina e Saúde Pública (EBMSP)', 'Especialização em Dermatologia pela Policlínica Geral do Rio de Janeiro e Instituto de Pesquisa Carlos Chagas', 'Especialista pela Sociedade Brasileira de Dermatologia', 'Membro da Sociedade Brasileira de Dermatologia'] },
  { n: 'Dra. Milene Vieira', f: 'milene', crm: 'CRM-BA 13859', l: ['Graduada em Medicina pela Universidade Federal da Bahia', 'Especialização em Dermatologia pela Universidade Federal da Bahia e estágio no serviço de dermatologia do Hospital Pedro Ernesto (Rio de Janeiro)', 'Estágio em oncologia cutânea no A.C. Camargo Cancer Center (São Paulo)', 'Membro da Sociedade Brasileira de Dermatologia'] },
  { n: 'Dra. Rosamaria Lopes', f: 'anarosa', crm: 'CRM-BA 33379', l: ['Graduada em Medicina pela PUC Minas', 'Especialização em Dermatologia pelo Centro de Medicina Especializada, Pesquisa e Ensino (Belo Horizonte)', 'Pós-graduação em Medicina e Cirurgia Estética pelo mesmo centro', 'Fellow em Tricologia pela Fapecs/CNA/AMB', 'Membro da Academia Brasileira de Dermatologia'] },
];
const consulta = { t: 'Consulta médica dermatológica', p: ['Consulta inicial ou de rotina para avaliação e escolha dos tratamentos necessários.'] };
const areas = {
  estetica: { nome: 'Estéticos', titulo: 'Tratamentos estéticos', d: 'Destina-se ao diagnóstico, à prevenção e ao tratamento de alterações na estética facial e corporal.', foto: 'sala-procedimentos', itens: [
    { t: 'Limpeza de pele', f: 'limpeza-de-pele', p: ['Com esteticista, promove uma limpeza profunda, removendo impurezas relacionadas ao uso constante do ar-condicionado, maquiagem, poluição e outros fatores externos.'] },
    { t: 'Peeling de diamante', s: 'Microdermoabrasão', f: 'peeling-diamante', p: ['Método coadjuvante à limpeza de pele que promove uma higiene profunda com esfoliação da camada mais superficial da pele.'] },
    { t: 'Peeling químico', f: 'peeling-quimico', p: ['Esfoliação química que promove renovação celular e melhora da textura, da cor e de rugas superficiais. Usado no tratamento de acne, cicatrizes de acne, manchas e rejuvenescimento.'] },
    { t: 'Rejuvenescimento facial', f: 'rejuvenescimento', p: ['Indicado para prevenir, suavizar e tratar linhas de expressão. As áreas mais tratadas são as linhas entre as sobrancelhas, os pés de galinha, as linhas horizontais da testa e as bandas do músculo do pescoço.'] },
    { t: 'MD Codes', s: 'Preenchimento, volumização e harmonização', f: 'md-codes', p: ['O ácido hialurônico faz parte da composição da pele. O preenchimento repõe áreas de perda de volume e gordura na face, como o bigode chinês, melhora olheiras profundas, devolve o volume natural dos lábios, melhora o contorno facial e o queixo e devolve a hidratação da pele.'] },
    { t: 'Bioestimulação dérmica', s: 'Facial e corporal', f: 'bioestimulacao', p: ['Feita com ácido polilático (Sculptra) e hidroxiapatita de cálcio (Radiesse), é um procedimento estético não cirúrgico que estimula a produção de colágeno, melhorando a flacidez e remodelando a área tratada.'] },
    { t: 'Skinbooster', s: 'Rejuvenescimento facial, das mãos e do colo', f: 'skinbooster', p: ['Tipo de ácido hialurônico que hidrata profundamente a pele, melhorando linhas finas na face, na área dos olhos e da boca e devolvendo elasticidade e estrutura dérmica, com aspecto jovem, hidratado e natural.'] },
    { t: 'Microagulhamento', s: 'IPCA, indução percutânea de colágeno', f: 'ipca', p: ['Técnica de indução percutânea de colágeno por agulhas de 1,5 a 2,5 mm, que atinge a derme de maneira mais profunda e estimula a produção de colágeno. Entre os furinhos restam áreas de pele sã, que promovem a recuperação.', 'Junto com a IPCA fazemos drug delivery: ativos clareadores, antioxidantes ou ácidos aplicados sobre a pele microagulhada, potencializando o tratamento. Trata manchas como melasma, cicatrizes, rugas e ameniza poros abertos.'] },
    { t: 'Tunelização dérmica', f: 'tunelizacao', p: ['Técnica indicada para melhorar celulite, cicatrizes e rugas profundas. Consiste em soltar as traves fibróticas da derme e estimular a produção de colágeno, com uma agulha e sob anestesia local.'] },
    { t: 'Radiofrequência', s: 'Pulsada com multiagulhas', f: 'radiofrequencia', p: ['Usada no tratamento de flacidez e rugas ao redor da boca e dos olhos. O calor das ondas eletromagnéticas age na derme, estimulando a produção de colágeno; a energia fracionada poupa parte da epiderme e permite recuperação rápida.', 'Flacidez, manchas solares, rugas finas, estrias e cicatrizes podem ser tratadas com essa tecnologia.'] },
    { t: 'Atria', s: 'Ultrassom micro e macrofocado', p: [] },
    { t: 'Laser fracionado de CO2', f: 'laser-co2', p: ['Laser em movimento contínuo, uniforme e seguro, usado no tratamento de rugas profundas, estrias e rejuvenescimento.'] },
  ] },
  clinicos: { nome: 'Clínicos', titulo: 'Tratamentos clínicos', d: 'Diagnóstico, prevenção e tratamento das doenças e problemas que atingem a pele.', foto: 'consultorio-3', itens: [
    consulta,
    { t: 'Hiperidrose localizada', p: ['A substância conhecida pelo tratamento de rugas também trata o suor excessivo. Pode ser aplicada nas axilas, mãos e pés: uma ótima opção, de baixo risco, segura e praticamente sem efeitos colaterais.'] },
    { t: 'Cauterização química', p: ['Aplicação de ácido tricloroacético ou outros agentes cáusticos para tratar lesões benignas, como verrugas e ceratoses.'] },
    { t: 'Correção de "orelha rasgada"', s: 'Lobuloplastia', p: ['Cirurgia de reconstrução do lóbulo rasgado ou bífido. O lóbulo não tem cartilagem, apenas pele e gordura; com o tempo e o peso dos brincos, o furo pode alargar e até dividir o lóbulo em duas partes.', 'É um procedimento ambulatorial simples e rápido, com anestesia local, que costuma deixar uma cicatriz discreta. É preciso aguardar pelo menos 1 mês para colocar brinco na orelha reconstruída.'] },
    { t: 'Remoção de "sinais" e pequenos tumores de pele', p: ['Pequena cirurgia que retira sinais e tumores de pele, com incisão e sutura ou eletrocoagulação, de acordo com a natureza benigna ou maligna da lesão.'] },
    { t: 'Crioterapia', p: ['Aplicação de nitrogênio líquido para tratar lesões benignas e malignas. Bastante rápida e com bons resultados estéticos.'] },
    { t: 'MMP', s: 'Microinfusão de medicamentos na pele', p: ['Técnica de entrega de medicamento de forma homogênea e segura na pele, que permite que os ativos atinjam diretamente as células responsáveis pela doença.'] },
    { t: 'IPCA', s: 'Indução percutânea de colágeno', p: ['Microagulhas estéreis estimulam a produção de colágeno, melhorando coloração, textura, brilho e firmeza da pele. Usada no tratamento de melasma, estrias, cicatrizes de acne, pós-trauma e pós-cirúrgicas.'] },
    { t: 'Dermatoscopia', p: ['Método auxiliar, não invasivo, para diagnóstico de doenças de pele e cabelos e para o acompanhamento de pintas e sinais, com o dermatoscópio, aparelho de lente com aumento e iluminação específica.'] },
    { t: 'Biópsia de pele e unha', p: ['Auxilia no diagnóstico das doenças da pele, da unha e do couro cabeludo, com a remoção de pequena parte de uma lesão para estudo anatomopatológico. Procedimento cirúrgico simples, feito em consultório e com anestesia local.'] },
  ] },
  capilares: { nome: 'Capilares', titulo: 'Tratamentos capilares', d: 'Diagnóstico, prevenção e tratamento de problemas e doenças do couro cabeludo.', foto: 'consultorio-1', itens: [
    consulta,
    { t: 'Mesoterapia capilar', p: ['Substâncias injetadas no couro cabeludo com agulhas bem fininhas, entregando nutrientes e medicamentos diretamente no local. Faz parte do tratamento da queda de cabelo, e as substâncias dependem da causa.'] },
    { t: 'Biópsia do couro cabeludo', p: ['Remoção de pequena parte de uma lesão para estudo anatomopatológico. Procedimento cirúrgico simples, feito em consultório e com anestesia local.'] },
    { t: 'Tricoscopia', p: ['Exame do couro cabeludo e do cabelo com o dermatoscópio. Não invasivo, feito no consultório, ajuda a diagnosticar distúrbios dos cabelos e dá indícios sobre o estágio e a progressão da doença.'] },
    { t: 'MMP', s: 'Microinfusão de medicamentos na pele', p: ['Ativos injetados por um equipamento com múltiplas agulhas, semelhante a uma máquina de tatuar, de maneira rápida, segura e eficaz. Muito usada no tratamento da calvície.', 'A microperfuração melhora o colágeno local e ativa a cicatrização com fatores de crescimento do próprio paciente, além de entregar os ativos diretamente no alvo.'] },
  ] },
};
const espaco = [['recepcao', 'Recepção e sala de espera'], ['consultorio-2', 'Consultório'], ['sala-procedimentos', 'Sala de procedimentos'], ['consultorio-1', 'Consultório'], ['consultorio-3', 'Consultório e sala de procedimentos'], ['balcao', 'Balcão de atendimento']];
const alt = {
  recepcao: 'Recepção da Pele Clínica', 'consultorio-1': 'Consultório da Pele Clínica', 'consultorio-2': 'Consultório da Pele Clínica', 'consultorio-3': 'Consultório com maca de procedimentos',
  'sala-procedimentos': 'Sala de procedimentos com equipamento', 'equipe-medicas': 'Dermatologistas da Pele Clínica', 'medica-consultorio': 'Dermatologista da Pele Clínica no consultório',
  'equipe-enfermagem': 'Equipe da Pele Clínica na sala de procedimentos', balcao: 'Balcão de atendimento da Pele Clínica', dermatoscopio: 'Dermatoscópio sobre papel timbrado da Pele Clínica', 'cuide-se': 'Rosto com flores',
};
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'clinica', nome: 'A clínica' }, { slug: 'equipe', nome: 'Equipe' }, { slug: 'estetica', nome: 'Estéticos' }, { slug: 'clinicos', nome: 'Clínicos' }, { slug: 'capilares', nome: 'Capilares' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Orquídea', b: 'Consultório' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&display=swap';
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá, gostaria de marcar uma consulta.') => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#5b3039', b: '#f7f1ee' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Dermatologia em Salvador` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Médica de preferência<select name="medica"><option>Sem preferência</option>${equipe.map(d => `<option>${d.n}</option>`).join('')}</select></label><label>Assunto<select name="assunto"><option>Consulta dermatológica</option><option>Tratamento estético</option><option>Tratamento clínico</option><option>Tratamento capilar</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Melhor dia e horário, dúvida sobre algum tratamento..."></textarea></label>
  <button class="btn" type="submit">${icWa()}Agendar pelo WhatsApp</button>
</form>`;
const horas = () => `<dl class="horas">${horarios.map(h => `<div><dt>${h[0]}</dt><dd>${h[1]}</dd></div>`).join('')}</dl>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.fwa}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}</span><span>${E.bairro}, ${E.cidade}, CEP ${E.cep}</span></div></li>
  <li>${ic('relogio')}<div><strong>Horários</strong>${horarios.map(h => `<span>${h[0]}: ${h[1]}</span>`).join('')}</div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Pele Clínica" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Altino Seberto de Barros, 241, Itaigara, Salvador BA')}&z=16&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="Pele Clínica Dermatologia" width="640" height="164"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" ${ext}>${icWa()}Agendar</a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Pele Clínica Dermatologia" width="640" height="164" loading="lazy"><p>Dermatologia clínica, cirúrgica, estética e laser. Salvador, desde 1991.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.fwa}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}, ${E.cep}</span></li>
      <li>${ic('relogio')}<span>Seg a sex 08:30-18:00<br>Sáb 08:30-12:00</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© 1991-${new Date().getFullYear()} Pele Clínica. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const medicas = (resumo = false) => `<ul class="medicas">${equipe.map(d => `<li class="sobe"><img src="/assets/img/dra-${d.f}.webp" alt="${esc(d.n)}" width="100" height="100" loading="lazy"><div><h3>${d.n}</h3><small>${d.crm}</small>${resumo ? `<p>${d.l[0]}</p>` : `<ul>${d.l.map(x => `<li>${x}</li>`).join('')}</ul>`}</div></li>`).join('')}</ul>`;
const procs = a => `<div class="procs">${a.itens.map((p, i) => `<details class="proc sobe"${i === 0 ? ' open' : ''}><summary><span><b>${p.t}</b>${p.s ? `<small>${p.s}</small>` : ''}</span>${ic('seta')}</summary><div class="proc-corpo">${p.f ? `<figure>${img(p.f, p.t)}</figure>` : ''}<div>${p.p.length ? p.p.map(x => `<p>${x}</p>`).join('') : '<p>Pergunte na consulta como funciona e para quem é indicado.</p>'}<a class="link-seta" href="${wa(`Olá! Gostaria de saber mais sobre ${p.t}.`)}" ${ext}>Perguntar pelo WhatsApp ${ic('seta')}</a></div></div></details>`).join('')}</div>`;
const areaCards = v => `<ul class="areas">${Object.entries(areas).map(([k, a]) => `<li class="sobe"><a href="${link(v, k)}"><figure>${img(a.foto)}</figure><div><small>Tratamentos</small><h3>${a.nome}</h3><p>${a.d}</p><span class="link-seta">${a.itens.length} tratamentos ${ic('seta')}</span></div></a></li>`).join('')}</ul>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Cuide-se. Agende sua visita.</h2><p>Atendimento de segunda a sexta, das 08:30 às 18:00, e aos sábados até 12:00.</p></div><p class="bts"><a class="btn btn-claro" href="${wa()}" ${ext}>${icWa()}Agendar pelo WhatsApp</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.clinica = head(v, 'clinica', 'A clínica', historia[1]) + topo(v, 'clinica') + cab('A clínica', 'Especializada em dermatologia clínica, cirúrgica, estética e laser', 'recepcao') + `
<div class="in"><section class="texto-pag"><div><p class="k">Nossa história</p>${historia.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><figure>${img('equipe-medicas')}<figcaption>Dermatologistas da Pele Clínica.</figcaption></figure></section>
<section class="espaco"><header class="tit"><p class="k">O espaço</p><h2>Nossa clínica no Itaigara</h2></header><ul class="galeria">${espaco.map(e => `<li><a href="/assets/img/${e[0]}.webp" data-foto="${esc(e[1])}">${img(e[0])}</a></li>`).join('')}</ul></section></div>
` + cta(v) + rodape(v);
  pag.equipe = head(v, 'equipe', 'Equipe', 'Dermatologistas credenciadas e membros da Sociedade Brasileira de Dermatologia.') + topo(v, 'equipe') + cab('Equipe', 'Dermatologistas membros da Sociedade Brasileira de Dermatologia', 'equipe-medicas') + `
<div class="in"><section class="equipe-pag"><p class="lead">Nossas dermatologistas são credenciadas e membros da Sociedade Brasileira de Dermatologia. Todas atuam nas diversas áreas da dermatologia: clínica, estética, cirúrgica e terapias médicas capilares.</p>${medicas()}</section></div>
` + cta(v) + rodape(v);
  for (const [k, a] of Object.entries(areas)) {
    pag[k] = head(v, k, a.titulo, a.d) + topo(v, k) + cab('Tratamentos', a.titulo, a.foto, a.d) + `
<div class="in"><section class="area-pag"><nav class="ancoras" aria-label="Áreas de tratamento">${Object.entries(areas).map(([k2, a2]) => `<a href="${link(v, k2)}"${k2 === k ? ' aria-current="page"' : ''}>${a2.nome}</a>`).join('')}</nav>${procs(a)}</section></div>
` + cta(v) + rodape(v);
  }
  pag.contato = head(v, 'contato', 'Contato', `Agende: ${E.fone} e WhatsApp ${E.fwa}. ${E.rua}, ${E.bairro}, ${E.cidade}.`) + topo(v, 'contato') + cab('Contato', 'Agende sua visita', 'balcao') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Envie sua mensagem</h2><p>Preencha e a mensagem abre pronta no WhatsApp.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Dermatologia em Salvador · desde 1991</p><h1>Cuide da sua pele com quem é especialista.</h1><p>${E.curto} Atendimento humanizado, ético e com comprovação científica.</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Agende sua visita</a><a class="btn btn-linha" href="${link(v, 'estetica')}">Ver tratamentos</a></p></div><div class="hero-a-fotos"><figure class="f1">${img('medica-consultorio', alt['medica-consultorio'], ' loading="eager" fetchpriority="high"')}</figure><figure class="f2">${img('recepcao', alt.recepcao, ' loading="eager"')}</figure><p class="selo"><b>1991</b><span>fundada em Salvador</span></p></div></div></section>
<section class="in areas-a"><header class="tit"><p class="k">Tratamentos</p><h2>Estéticos, clínicos e capilares</h2></header>${areaCards(v)}</section>
<section class="equipe-a"><div class="in"><header class="tit tit-linha"><div><p class="k">Equipe</p><h2>Cinco dermatologistas, membros da SBD</h2></div><a class="link-seta" href="${link(v, 'equipe')}">Conheça a equipe ${ic('seta')}</a></header>${medicas(true)}</div></section>
<section class="in clinica-a"><figure>${img('consultorio-2')}</figure><div><p class="k">A clínica</p><h2>Clínica cirúrgica e dermatológica desde 1991</h2><p>${historia[1]}</p><a class="link-seta" href="${link(v, 'clinica')}">Conheça o espaço ${ic('seta')}</a></div></section>
<section class="cuide-a"><div class="in cuide-a-in"><div><p class="k">Cuide-se</p><h2>Os benefícios de tratar bem a sua pele</h2><p>Quem tem uma rotina de cuidado com a pele se sente melhor, mais disposto e com a autoestima mais alta, não apenas pelos resultados visíveis.</p><p>Tire umas horas para cuidar de você, faça disso um hábito e esteja mais preparado para aproveitar a vida com saúde e bem-estar.</p></div>${horas()}</div></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div><div class="cab-b-foto">${img(foto, '', ' loading="eager"')}</div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in"><p class="k">Pele Clínica · Itaigara, Salvador</p><h1>Dermatologia clínica, cirúrgica, <em>estética e laser.</em></h1><div class="hero-b-linha"><p>Desde 1991, com dermatologistas membros da Sociedade Brasileira de Dermatologia e atendimento humanizado.</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Agendar consulta</a><a class="btn btn-linha" href="${link(v, 'equipe')}">Nossa equipe</a></p></div></div><div class="hero-b-foto">${img('equipe-enfermagem', alt['equipe-enfermagem'], ' loading="eager" fetchpriority="high"')}${img('consultorio-3', alt['consultorio-3'], ' loading="eager"')}${img('equipe-medicas', alt['equipe-medicas'], ' loading="eager"')}</div></section>
<section class="in areas-b"><header class="tit"><p class="k">Tratamentos</p><h2>Três frentes de cuidado</h2></header><ol class="areas-lista">${Object.entries(areas).map(([k, a], i) => `<li class="sobe"><a href="${link(v, k)}"><span class="n">0${i + 1}</span><div><h3>${a.titulo}</h3><p>${a.d}</p></div><ul>${a.itens.slice(1, 5).map(p => `<li>${p.t}</li>`).join('')}${a.itens.length > 5 ? `<li>e mais ${a.itens.length - 5}</li>` : ''}</ul>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="equipe-b"><div class="in"><header class="tit"><p class="k">Corpo clínico</p><h2>Nossas dermatologistas</h2></header>${medicas(true)}<p><a class="link-seta" href="${link(v, 'equipe')}">Formação de cada médica ${ic('seta')}</a></p></div></section>
<section class="in visita-b"><div><p class="k">Horários</p><h2>Agende sua visita</h2>${horas()}<p>${E.rua}, ${E.bairro}, ${E.cidade}.</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}${E.fwa}</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div><figure>${img('recepcao')}</figure></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Pele Clínica', artigo: 'da', url: E.url, lang: 'pt', cor: '#955a6c', fundo: '#5b3039', claro: '#f7f1ee',
  fonteTitulo: 'Nunito,system-ui,sans-serif', fonteTexto: '"Nunito Sans",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: 'Acolhedora, no vinho e rosa do logo da orquídea, com as fotos reais dos consultórios e das médicas.', pontos: ['Tratamentos estéticos, clínicos e capilares', 'As cinco dermatologistas com CRM e RQE', 'Agendamento direto no WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Clara e editorial, com títulos com serifa e a equipe da clínica em destaque logo na abertura.', pontos: ['Três frentes de cuidado, numeradas', 'Corpo clínico com formação de cada médica', 'Horários e endereço sempre à mão'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
