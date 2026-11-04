// Clínica Dermacenter, dermatologia clínica, estética e oncologia cutânea (Centro Histórico, Porto Alegre). Gera public/{a,b}/ e a página de escolha.
// node clientes/dermacenter/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs dermacenter http://www.clinicadermacenter.com.br/)
// Textos do site atual (procedimentos em procedimentos.json, copiados das páginas de cada procedimento). Fotos da clínica: as do próprio site.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const PROC = JSON.parse(fs.readFileSync(path.join(aqui, 'procedimentos.json'), 'utf8'));
const E = {
  nome: 'Clínica Dermacenter', url: 'https://dermacenter.overtus.com.br/', antigo: 'http://www.clinicadermacenter.com.br/',
  wa: '5551993820442', fone: '(51) 3022-2223', fwa: '(51) 99382-0442', email: 'contato@clinicadermacenter.com.br', insta: 'clinica.dermacenter', face: 'clinicadermacenter',
  rua: 'Rua dos Andradas, 1234, conj. 503/504/505', bairro: 'Centro Histórico', cidade: 'Porto Alegre - RS',
  curto: 'Clínica de dermatologia no Centro Histórico de Porto Alegre: dermatologia clínica, estética e diagnóstico e cirurgia de câncer de pele, com equipe de dermatologistas e cirurgiões.',
};
const sobre = [
  'Os cuidados com a pele têm papel fundamental na busca da autoestima, da confiança e da saúde física e emocional, merecendo uma atenção especial pelos benefícios que nos proporciona.',
  'Pensando nisso, a Dermacenter coloca à sua disposição uma equipe altamente qualificada para oferecer todos os tipos de tratamentos e serviços na área de dermatologia clínica e estética.',
  'Contamos ainda com a unidade DermaOnco, especializada em diagnóstico e cirurgia de câncer de pele, coordenada pelo Dr. Ronaldo Oliveira (CREMERS 20361), integrante do corpo clínico do Hospital do Câncer Mãe de Deus, com mais de 18 anos de experiência nesta área.',
  'São seis consultórios, duas salas para procedimentos e estrutura moderna com tecnologia avançada, garantindo acessibilidade, segurança e toda a conveniência necessária para proporcionar excelência em atendimento e plena satisfação com os resultados.',
];
const equipe = [
  ['Dr. Ronaldo Oliveira da Silva', '20361', 'Cirurgião de pele'], ['Dr. Danilo Barros', '11874', 'Cirurgião geral'], ['Dr. Sérgio Luis Thiesen Hilgert', '16386', 'Cirurgião geral'],
  ['Dra. Jacqueline Fernandes', '47004', 'Dermatologista'], ['Dra. Cristina Bergamaschi', '31408', 'Dermatologista'], ['Dra. Débora Brinker', '30851', 'Dermatologista'],
  ['Dra. Ana Cristina Schmitt Dornelles', '35653', 'Dermatologista'], ['Dr. Rodrigo Oliveira Almeida', '48337', 'Dermatologista'], ['Dr. Rafael Borba', '49484', 'Dermatologista'],
  ['Dra. Luciana Longo Ferlin', '48352', 'Cirurgia vascular'], ['Dra. Thaíse Ferrari', '44501', 'Dermatologista'], ['Dr. Jorge Ricardo Moller', '15997', 'Dermatologista'],
  ['Dra. Sabrina Stefani', '25789', 'Dermatologista'], ['Dra. Samara Khoury', '60582', 'Dermatologista'], ['Dra. Juliane da Costa', '47832', 'Dermatologista'],
  ['Dra. Vanessa de Mello Terroso', '30677', 'Ginecologista e obstetra'], ['Dr. Rodrigo Perez Pereira', '22670', 'Oncologista'],
];
const convenios = ['IBCM', 'Bradesco Saúde', 'Cabergs', 'Danamed', 'Ipê', 'Saúde Pas', 'Saúde Caixa', 'Mediservice', 'Unimed', 'Humana Saúde'];
const areas = [
  { slug: 'estetica', h: 'Rejuvenescimento e cuidados com a pele', t: 'Dermatologia estética', foto: 'sala-procedimento', cor: 'r', d: 'Laser, peeling, toxina botulínica, preenchimento, skinboosters e bioestimuladores de colágeno, com avaliação individual do médico.', intro: ['A dermatologia estética é a área que se dedica aos cuidados com pele, cabelos e unhas, focando na autoestima do paciente. A partir de uma avaliação criteriosa do médico, decide-se qual o procedimento correto a adotar para cada caso.', 'Na Dermacenter, são realizados diversos procedimentos com enfoque no rejuvenescimento da pele e nos cuidados e tratamentos, propiciando resultados satisfatórios. Cada caso deve ser analisado individualmente pelo seu médico.'] },
  { slug: 'dermatologia-clinica', h: 'Doenças da pele, do couro cabeludo e das unhas', t: 'Dermatologia clínica', foto: 'consultorio-maca', cor: 't', d: 'Doenças da pele, do couro cabeludo e das unhas: diagnóstico, biópsias e tratamentos em consultório.', intro: ['A área de dermatologia clínica abrange doenças da pele, cabelos e unhas. A Dermacenter conta com profissionais especializados, além de uma estrutura moderna e acolhedora para atender a diversos tipos de necessidades na área da dermatologia.'] },
  { slug: 'oncologia', h: 'Diagnóstico e cirurgia de câncer de pele', t: 'Oncologia cutânea', foto: 'dermatoscopia', cor: 'a', d: 'Diagnóstico e cirurgia de câncer de pele com a DermaOnco e mapeamento digital de sinais com FotoFinder.', intro: [] },
];
const grupos = { pele: 'Doenças da pele', couro: 'Doenças do couro cabeludo', unhas: 'Doenças das unhas' };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'clinica', nome: 'A clínica' }, { slug: 'estetica', nome: 'Estética' }, { slug: 'dermatologia-clinica', nome: 'Dermatologia clínica' }, { slug: 'oncologia', nome: 'Oncologia' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Consultório', b: 'Corpo Clínico' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da Dermacenter e gostaria de agendar uma consulta.') => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#00ada2', b: '#0f3b39' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Dermatologia em Porto Alegre` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const bolinhas = `<span class="bolinhas" aria-hidden="true"><i></i><i></i><i></i></span>`;

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Área<select name="area"><option>Consulta de dermatologia</option>${areas.map(a => `<option>${a.t}</option>`).join('')}<option>Outro assunto</option></select></label><label>Convênio<select name="convenio"><option>Particular</option>${convenios.map(c => `<option>${c}</option>`).join('')}<option>Outro</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="3" placeholder="Conte o que você gostaria de tratar ou o melhor horário para você"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp da clínica com a mensagem pronta.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.fwa}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}</span><span>${E.bairro}, ${E.cidade}</span></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="https://www.instagram.com/${E.insta}/" ${ext}>@${E.insta}</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Clínica Dermacenter" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua dos Andradas, 1234, Centro Histórico, Porto Alegre RS')}&z=16&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/${v === 'b' ? 'logo-claro' : 'logo'}.webp" alt="Dermacenter" width="330" height="80"></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Dermacenter" width="330" height="80" loading="lazy"><p>Dermatologia clínica, estética e oncologia cutânea no Centro Histórico de Porto Alegre.</p><p class="rod-redes"><a href="https://www.instagram.com/${E.insta}/" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="https://www.facebook.com/${E.face}/" ${ext} aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.fwa}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Dermacenter. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const procItem = p => `<details class="proc" id="${p.id}"><summary><span>${p.t}</span>${ic('seta')}</summary><div class="proc-txt">${p.p.map(x => x.startsWith('»') ? `<p class="proc-q">${esc(x.replace(/^»\s*/, ''))}</p>` : `<p>${esc(x)}</p>`).join('')}<a class="link-seta" href="${wa(`Olá! Vim pelo site e gostaria de saber mais sobre ${p.t.toLowerCase()}.`)}" ${ext}>Perguntar pelo WhatsApp ${ic('seta')}</a></div></details>`;
const equipeLista = () => `<ul class="equipe">${equipe.map(m => `<li><b>${m[0]}</b><span>${m[2]}</span><small>CRM ${m[1]}</small></li>`).join('')}</ul>`;
const conveniosLista = () => `<ul class="convenios">${convenios.map(c => `<li>${c}</li>`).join('')}</ul>`;
const estrutura = ['recepcao-balcao', 'espera', 'consultorio', 'sala-procedimento-2', 'consultorio-maca', 'recepcao'];
const altEstr = { 'recepcao-balcao': 'Recepção da Dermacenter', espera: 'Sala de espera', consultorio: 'Consultório', 'sala-procedimento-2': 'Sala de procedimentos', 'consultorio-maca': 'Consultório com maca', recepcao: 'Recepção e corredor' };
const galeria = () => `<ul class="estrutura">${estrutura.map(n => `<li><a href="/assets/img/${n}.webp" data-foto="${altEstr[n]}">${img(n, altEstr[n])}</a></li>`).join('')}</ul>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div>${bolinhas}<h2>Agende sua consulta</h2><p>Atendimento particular e pelos principais convênios. ${E.bairro}, Porto Alegre.</p></div><p class="bts"><a class="btn btn-claro" href="${wa()}" ${ext}>${icWa()}WhatsApp</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.clinica = head(v, 'clinica', 'A clínica', sobre[1]) + topo(v, 'clinica') + cab('A Dermacenter', 'Uma clínica de dermatologia no Centro Histórico', 'recepcao-balcao') + `
<div class="in"><section class="texto-pag"><div>${sobre.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><ul class="numeros"><li><b>6</b><span>consultórios</span></li><li><b>2</b><span>salas de procedimentos</span></li><li><b>${equipe.length}</b><span>médicos no corpo clínico</span></li><li><b>${convenios.length}</b><span>convênios atendidos</span></li></ul></section>
<section class="estr-sec"><header class="tit"><p class="k">Estrutura</p><h2>Moderna, aconchegante e de fácil acesso</h2></header>${galeria()}</section>
<section class="equipe-sec" id="profissionais"><header class="tit"><p class="k">Profissionais</p><h2>Corpo clínico</h2></header>${equipeLista()}</section></div>
` + cta(v) + rodape(v);
  for (const a of areas) {
    const lista = PROC.filter(p => a.slug === 'estetica' ? p.g === 'estetica' : a.slug === 'oncologia' ? p.g === 'onco' : ['pele', 'couro', 'unhas'].includes(p.g));
    const corpo = a.slug === 'dermatologia-clinica'
      ? Object.entries(grupos).map(([g, t]) => `<section class="proc-grupo"><h2>${t}</h2>${lista.filter(p => p.g === g).map(procItem).join('')}</section>`).join('')
      : `<section class="proc-grupo">${a.slug === 'oncologia' ? '' : `<h2>Procedimentos</h2>`}${lista.map(procItem).join('')}</section>`;
    pag[a.slug] = head(v, a.slug, a.t, a.d) + topo(v, a.slug) + cab(a.t, a.h, a.foto) + `
<div class="in area-pag"><aside class="area-lado">${a.intro.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}${a.slug === 'oncologia' ? `<div class="alerta">${bolinhas}<h3>Fique atento aos sinais</h3><p>Sinais assimétricos, de bordas irregulares, com várias cores ou que coçam, ardem ou sangram devem ser avaliados por um especialista.</p></div>` : ''}<a class="btn" href="${wa(`Olá! Gostaria de agendar uma consulta de ${a.t.toLowerCase()}.`)}" ${ext}>${icWa()}Agendar consulta</a></aside><div class="area-lista">${corpo}</div></div>
` + cta(v) + rodape(v);
  }
  pag.contato = head(v, 'contato', 'Contato', `Clínica Dermacenter: ${E.rua}, ${E.bairro}, ${E.cidade}. Telefone ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Agende sua consulta', 'espera') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Fale com a Dermacenter</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section>
<section class="conv-sec" id="convenios"><header class="tit"><p class="k">Convênios</p><h2>Para a sua conveniência, atendemos pelos seguintes convênios</h2></header>${conveniosLista()}<p class="conv-nota">Não encontrou o seu convênio? Ligue para ${E.fone}.</p></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div>${bolinhas}<p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt">${bolinhas}<p class="k">Dermatologia · Centro Histórico de Porto Alegre</p><h1>Cuidar da pele é cuidar da saúde e da autoestima.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Agendar consulta</a><a class="btn btn-linha" href="${link(v, 'clinica')}">Conheça a clínica</a></p></div><figure class="hero-a-foto">${img('recepcao-balcao', 'Recepção da Clínica Dermacenter', ' loading="eager" fetchpriority="high"')}<figcaption><b>6 consultórios</b> e 2 salas de procedimentos</figcaption></figure></div></section>
<section class="in areas-a"><header class="tit"><p class="k">Serviços</p><h2>Três áreas, uma equipe</h2></header><div class="areas">${areas.map(a => `<a class="area area-${a.cor} sobe" href="${link(v, a.slug)}"><figure>${img(a.foto, a.t)}</figure><div><h3>${a.t}</h3><p>${a.d}</p><span class="link-seta">Ver procedimentos ${ic('seta')}</span></div></a>`).join('')}</div></section>
<section class="onco-a"><div class="in onco-in"><figure>${img('mapeamento', 'Exame dermatoscópico de sinal na pele')}</figure><div><p class="k">DermaOnco</p><h2>Diagnóstico e cirurgia de câncer de pele</h2><p>${sobre[2]}</p><p>Muitos sinais ou pintas na pele são câncer sem que o paciente desconfie. Com o mapeamento digital (FotoFinder), o estado da sua pele fica guardado para comparação a cada check-up.</p><a class="link-seta" href="${link(v, 'oncologia')}">Oncologia cutânea ${ic('seta')}</a></div></div></section>
<section class="in estr-a"><header class="tit tit-linha"><div><p class="k">Estrutura</p><h2>Moderna e aconchegante</h2></div><a class="link-seta" href="${link(v, 'clinica')}">Sobre a clínica ${ic('seta')}</a></header>${galeria()}</section>
<section class="conv-a"><div class="in conv-in"><div><p class="k">Convênios</p><h2>Atendemos ${convenios.length} convênios</h2><p>Não encontrou o seu? Ligue para ${E.fone}.</p></div>${conveniosLista()}</div></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div></div><figure class="cab-b-foto">${img(foto, '', ' loading="eager"')}</figure></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div><p class="k">Clínica de dermatologia · Porto Alegre</p><h1>Pele saudável, <em>avaliada caso a caso</em> por quem é especialista.</h1><p>${E.curto}</p><p class="bts"><a class="btn btn-claro" href="${wa()}" ${ext}>${icWa()}Agendar pelo WhatsApp</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div><div class="hero-b-fotos"><figure class="f1">${img('consultorio', 'Consultório da Dermacenter', ' loading="eager" fetchpriority="high"')}</figure><figure class="f2">${img('dermatoscopia', 'Exame de pele com dermatoscópio', ' loading="eager"')}</figure></div></div></section>
<section class="faixa-b"><div class="in"><ul><li><b>${equipe.length}</b><span>médicos no corpo clínico</span></li><li><b>6</b><span>consultórios</span></li><li><b>${PROC.length}</b><span>procedimentos descritos</span></li><li><b>${convenios.length}</b><span>convênios</span></li></ul></div></section>
<section class="in areas-b"><header class="tit"><p class="k">Áreas de atendimento</p><h2>Clínica, estética e oncologia cutânea</h2></header><ol class="areas-lista">${areas.map((a, i) => `<li class="sobe"><a href="${link(v, a.slug)}"><span class="n">0${i + 1}</span><div><h3>${a.t}</h3><p>${a.d}</p><ul class="tags">${PROC.filter(p => a.slug === 'estetica' ? p.g === 'estetica' : a.slug === 'oncologia' ? p.g === 'onco' : ['pele', 'couro', 'unhas'].includes(p.g)).slice(0, 6).map(p => `<li>${p.t}</li>`).join('')}</ul></div>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="equipe-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Corpo clínico</p><h2>Dermatologistas, cirurgiões e oncologista</h2></div><a class="link-seta" href="${link(v, 'clinica')}#profissionais">Ver a equipe ${ic('seta')}</a></header>${equipeLista()}</div></section>
<section class="in estr-b"><div class="estr-b-txt"><p class="k">A clínica</p><h2>Seis consultórios e duas salas de procedimentos</h2><p>${sobre[3]}</p><a class="link-seta" href="${link(v, 'clinica')}">Conheça a estrutura ${ic('seta')}</a></div>${galeria()}</section>
<section class="in conv-b"><p class="k">Convênios atendidos</p>${conveniosLista()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Dermacenter', artigo: 'da', url: E.url, lang: 'pt', cor: '#00ada2', fundo: '#0f3b39', claro: '#f6f8f7',
  fonteTitulo: 'Ubuntu,system-ui,sans-serif', fonteTexto: '"Nunito Sans",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara e acolhedora, com as bolinhas coloridas do logo e as fotos reais da recepção e dos consultórios.', pontos: ['Estética, clínica e oncologia em páginas próprias', `Os ${PROC.length} procedimentos explicados com o texto da clínica`, 'Convênios e agendamento pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Mais sóbria, em verde-petróleo, com o corpo clínico e os números da clínica em destaque logo na abertura.', pontos: ['Os 17 médicos com especialidade e CRM', 'Áreas com a lista dos procedimentos', 'Telefone e WhatsApp sempre à mão'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
