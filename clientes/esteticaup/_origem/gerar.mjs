// Estética Up (São Paulo/SP): toxina botulínica, preenchimento e harmonização facial, 3 unidades. Gera public/{a,b}/ e a página de escolha.
// node clientes/esteticaup/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs esteticaup https://www.esteticaup.com.br/)
// Textos: páginas do site atual (modelo de site de SEO com dezenas de páginas de palavra-chave; aqui só o conteúdo real).
// Fotos: pasta /imagens do site atual (Dr. Sérgio, recepção, salas; procedimentos são fotos de banco já usadas no site).
// Logo: a borboleta foi redesenhada em vetor a partir do PNG do site; o nome "Estética Up" é escrito em Alice, a fonte do site.
import path from 'node:path';
import fs from 'node:fs';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Estética Up', url: 'https://esteticaup.overtus.com.br/', antigo: 'https://www.esteticaup.com.br/',
  fone: '(11) 5084-5198', wa: '5511961627710', waVer: '(11) 96162-7710', email: 'contato@esteticaup.com.br',
  insta: 'https://www.instagram.com/esteticaup/', face: 'https://www.facebook.com/esteticaupoficial',
};
export const nomesVersao = { a: 'Seda', b: 'Nogueira' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Alice&family=Nunito+Sans:wght@400;600;700&display=swap';
const img = (n, alt = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const cores = { a: '#faf6f0', b: '#2e2620' };
const waMsg = (m = 'Olá! Vim pelo site da Estética Up e quero agendar uma avaliação gratuita.') => waHref(E.wa, m);

const nav = [{ slug: 'sobre', nome: 'Sobre' }, { slug: 'procedimentos', nome: 'Procedimentos' }, { slug: 'unidades', nome: 'Unidades' }, { slug: 'contato', nome: 'Contato' }];
const curto = 'Referência em toxina botulínica e preenchimento em São Paulo, com três unidades e pagamento em até 10x sem juros.';
const sobre = [
  'A Estética Up foi fundada em janeiro de 2012 pelo biomédico esteta Dr. Sérgio Moreira, com especialização pela American Society Anatomy – Harvard Medical School.',
  'Referência em aplicação de toxina botulínica e preenchimento em São Paulo, a empresa dispõe de três unidades e conta com profissionais pós-graduados, com amplo know-how na área de especialização.',
  'A família Up acredita que beleza e bem-estar também são pilares da saúde, e tem como objetivo oferecer procedimentos estéticos com produtos de primeira linha, preço justo e pagamento em até 10x sem juros.',
];
const numeros = [['14', 'anos de atuação'], ['10x', 'sem juros'], ['+120 mil', 'aplicações'], ['3', 'unidades em São Paulo']];
const procs = [
  { id: 'toxina-botulinica', f: 'toxina', t: 'Toxina botulínica', s: 'Rugas e linhas de expressão', d: 'Impede a contração dos músculos faciais que dão origem às rugas e linhas de expressão. Os principais locais são a testa, a glabela (entre as sobrancelhas) e o contorno dos olhos. Também trata enxaqueca, suor excessivo (inclusive nas axilas), bruxismo e outras questões funcionais.', onde: ['Testa', 'Entre as sobrancelhas', 'Contorno dos olhos', 'Axilas (suor excessivo)', 'Bruxismo'] },
  { id: 'preenchimento', f: 'preenchimento', t: 'Preenchimento e harmonização facial', s: 'Volume e simetria', d: 'Técnica para dar volume e melhorar ou corrigir assimetrias na face. De forma rápida e segura, o preenchimento traz de volta o aspecto jovem e saudável da pele. Um dos produtos mais seguros é o ácido hialurônico, produzido naturalmente pelo organismo, que retém água e dá hidratação e volume.', onde: ['Lábios', 'Bigode chinês', 'Malar e contorno', 'Olheiras', 'Queixo e mandíbula'] },
  { id: 'bioestimulador', f: 'bioestimulador', t: 'Bioestimulador de colágeno', s: 'Firmeza da pele', d: 'Aplicação que estimula a produção de colágeno pelo próprio organismo, para devolver firmeza e sustentação à pele de forma gradual e natural.' },
  { id: 'fios-pdo', f: 'fios', t: 'Fios de PDO', s: 'Sustentação e viço', d: 'Filamentos de polidioxanona, um material biológico e seguro, inseridos no tecido subcutâneo sem risco de rejeição ou alergia. Estimulam o colágeno, melhoram o viço da pele e recuperam o aspecto jovial.' },
  { id: 'skinbooster', f: 'skinbooster', t: 'Skinbooster', s: 'Hidratação injetável', d: 'Hidratação injetável com um mix de ativos, como ácido hialurônico, colágeno, DMAE, vitamina C e silício orgânico: substâncias fluidas que dão um efeito natural à pele.' },
  { id: 'peeling-quimico', f: 'peeling', t: 'Peeling químico', s: 'Renovação da pele', d: 'Aplicação de ácido que promove a descamação e a renovação da pele de maneira delicada. Indicado para melhorar cicatrizes, acne e hiperpigmentação.' },
  { id: 'microagulhamento', f: 'microagulhamento', t: 'Microagulhamento', s: 'Colágeno e textura', d: 'Microperfurações na pele com agulhas finas para estimular a produção de colágeno. Trata cicatrizes de acne, estrias, flacidez, calvície, manchas e linhas finas.' },
];
const unidades = [
  { id: 'vila-mariana', n: 'Vila Mariana', rua: 'Rua Vergueiro, 2949, cj. 152', cep: 'Vila Mariana, São Paulo/SP · CEP 04101-300', h: 'Segunda a sexta, das 10h às 20h · Sábado, das 9h às 14h', e: 'contato@esteticaup.com.br', mapa: 'Rua Vergueiro, 2949, São Paulo' },
  { id: 'campo-belo', n: 'Campo Belo', rua: 'Rua Vieira de Morais, 2110, 6º andar, cj. 607', cep: 'Campo Belo, São Paulo/SP · CEP 04617-007', h: 'Terça, quarta e quinta, das 10h às 20h', e: 'campobelo@esteticaup.com.br', mapa: 'Rua Vieira de Morais, 2110, São Paulo' },
  { id: 'pinheiros', n: 'Pinheiros', rua: 'Av. Brigadeiro Faria Lima, 1795, sobreloja 35', cep: 'Pinheiros, São Paulo/SP', h: 'Sextas, das 10h às 20h', e: 'pinheiros@esteticaup.com.br', mapa: 'Avenida Brigadeiro Faria Lima, 1795, São Paulo' },
];
const espaco = [['recepcao', 'Recepção'], ['espera', 'Sala de espera'], ['sala', 'Sala de procedimentos'], ['tratamento', 'Atendimento'], ['sala-aparelho', 'Sala com aparelho'], ['aparelhos', 'Aparelhos']];

const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Estética Up | Toxina Botulínica e Preenchimento em São Paulo' : `${titulo} | Estética Up`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = claro => `<span class="marca-up"><img src="/assets/borboleta${claro ? '-clara' : ''}.svg" alt="" width="335" height="526"><span><b>Estética Up</b><small>Toxina botulínica e preenchimento</small></span></span>`;
function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('pin')}Vila Mariana · Campo Belo · Pinheiros</span><span class="faixa-dir"><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Estética Up, página inicial">${marca(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${waMsg()}" target="_blank" rel="noopener">Avaliação gratuita</a>
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
    <div class="rod-marca">${marca(true)}<p>${curto}</p><p>Responsável: Dr. Sérgio Moreira, biomédico esteta.</p></div>
    <div><h3>Páginas</h3><ul>${[{ slug: 'index', nome: 'Início' }, ...nav].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${waMsg()}" target="_blank" rel="noopener">WhatsApp ${E.waVer}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      ${unidades.map(u => `<li>${ic('pin')}<span><b>${u.n}</b>: ${u.rua}</span></li>`).join('')}
    </ul><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Estética Up. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waMsg()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site da Estética Up e quero agendar uma avaliação gratuita." id="agendar">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Unidade<select name="unidade">${unidades.map(u => `<option>${u.n}</option>`).join('')}</select></label><label>Procedimento<select name="procedimento">${procs.map(p => `<option>${p.t}</option>`).join('')}<option>Ainda não sei</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Dúvidas, melhor dia e horário"></textarea></label>
  <button class="btn" type="submit">${icWa()}Agendar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre pronta no WhatsApp da clínica. Se preferir, ligue: ${E.fone}.</p>
</form>`;
const mapa = q => `<iframe class="mapa" title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed"></iframe>`;
const cardUnid = u => `<article class="unid sobe" id="${u.id}"><h3>${u.n}</h3><p>${ic('pin')}<span>${u.rua}<br>${u.cep}</span></p><p>${ic('relogio')}<span>${u.h}</span></p><p>${ic('mail')}<a href="mailto:${u.e}">${u.e}</a></p></article>`;

function comum(v, pag, cab, cta, listaProcs) {
  pag.sobre = head(v, 'sobre', 'Sobre', sobre[0]) + topo(v, 'sobre') + cab('Sobre', 'A família Up', 'recepcao', 'Desde 2012, beleza e bem-estar como pilares da saúde.') + `
<div class="in"><section class="dr-pag"><figure>${img('dr-sergio', 'Dr. Sérgio Moreira')}</figure><div><p class="k">Fundador</p><h2>Dr. Sérgio Moreira</h2><p class="lead">${sobre[0]}</p><p>${sobre[1]}</p><p>${sobre[2]}</p><ul class="numeros-lin">${numeros.map(n => `<li><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul></div></section>
<section class="bloco"><header class="tit"><p class="k">Nosso espaço</p><h2>Conheça um pouco do nosso espaço</h2></header><ul class="galeria galeria-3">${espaco.map(e => `<li><a href="/assets/img/${e[0]}.webp" data-foto="${esc(e[1])}">${img(e[0], e[1])}</a></li>`).join('')}</ul></section></div>
` + cta() + rodape(v);
  pag.procedimentos = head(v, 'procedimentos', 'Procedimentos', 'Toxina botulínica, preenchimento, bioestimulador, fios de PDO, skinbooster, peeling e microagulhamento em São Paulo.') + topo(v, 'procedimentos') + cab('Procedimentos', 'Produtos de primeira linha e preço justo', 'harmonizacao', 'Avaliação gratuita em qualquer unidade e pagamento em até 10x sem juros.') + `
<div class="in"><section class="bloco bloco-topo">${listaProcs()}</section></div>
` + cta() + rodape(v);
  pag.unidades = head(v, 'unidades', 'Unidades', 'Vila Mariana, Campo Belo e Pinheiros.') + topo(v, 'unidades') + cab('Unidades', 'Três endereços em São Paulo', 'espera', 'Vila Mariana, Campo Belo e Pinheiros. Escolha a mais perto de você.') + `
<div class="in"><section class="bloco bloco-topo">${unidades.map(u => `<div class="unid-linha">${cardUnid(u)}${mapa(u.mapa)}</div>`).join('')}</section></div>
` + cta() + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `WhatsApp ${E.waVer}. Vila Mariana, Campo Belo e Pinheiros.`) + topo(v, 'contato') + cab('Contato', 'Avaliação gratuita. Agende agora', 'dr-sergio', 'Fale com a gente pelo WhatsApp, telefone ou e-mail.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Agende sua avaliação</h2>${formulario()}</div><div><ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waMsg()}" target="_blank" rel="noopener">${E.waVer}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="${E.insta}" target="_blank" rel="noopener">@esteticaup</a></div></li>
</ul><div class="unid-mini">${unidades.map(cardUnid).join('')}</div></div></section></div>
` + rodape(v);
}

// ---------- A: Seda (creme e dourado, delicada, com a borboleta) ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  const cta = () => `<section class="cta-a"><div class="in cta-in"><img class="cta-borb" src="/assets/borboleta-clara.svg" alt="" width="335" height="526"><div><h2>Avaliação gratuita</h2><p>Entre em contato conosco e agende a sua, em qualquer unidade.</p></div><p class="bts"><a class="btn btn-claro" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Agendar pelo WhatsApp</a></p></div></section>`;
  const listaProcs = () => `<div class="procs-a">${procs.map(p => `<article class="proc-a sobe" id="${p.id}"><figure>${img(p.f, p.t)}</figure><div><p class="k">${p.s}</p><h3>${p.t}</h3><p>${p.d}</p>${p.onde ? `<ul class="tags">${p.onde.map(o => `<li>${o}</li>`).join('')}</ul>` : ''}<a class="link-seta" href="${waMsg(`Olá! Vim pelo site e quero um orçamento de ${p.t.toLowerCase()}.`)}" target="_blank" rel="noopener">Pedir orçamento ${ic('seta')}</a></div></article>`).join('')}</div>`;
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Toxina botulínica e preenchimento · São Paulo</p><h1>Beleza e bem-estar também são saúde.</h1><p>${curto} Mais de 14 anos de atuação, com o biomédico esteta Dr. Sérgio Moreira.</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Avaliação gratuita</a><a class="btn btn-linha" href="${link(v, 'procedimentos')}">Ver procedimentos</a></p></div>
<div class="hero-a-fotos"><figure class="arco">${img('recepcao', 'Recepção da Estética Up', ' loading="eager" fetchpriority="high"')}</figure><figure class="dr-selo">${img('dr-sergio', 'Dr. Sérgio Moreira', ' loading="eager"')}<figcaption><b>Dr. Sérgio Moreira</b>Especialização pela American Society Anatomy, Harvard</figcaption></figure><img class="borb-hero" src="/assets/borboleta.svg" alt="" width="335" height="526"></div></div></section>
<section class="numeros-a"><div class="in">${numeros.map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in procs-sec"><header class="tit tit-linha"><div><p class="k">Procedimentos</p><h2>Do botox ao skinbooster</h2></div><a class="link-seta" href="${link(v, 'procedimentos')}">Todos os procedimentos ${ic('seta')}</a></header><div class="mini-procs">${procs.map(p => `<a class="mini-proc sobe" href="${link(v, 'procedimentos')}#${p.id}"><figure>${img(p.f, p.t)}</figure><h3>${p.t}</h3><p>${p.s}</p></a>`).join('')}<a class="mini-mais sobe" href="${waMsg()}" target="_blank" rel="noopener"><img src="/assets/borboleta-clara.svg" alt="" width="335" height="526"><b>Avaliação gratuita</b><span>Em qualquer unidade, com pagamento em até 10x sem juros.</span><em>Agendar ${ic('seta')}</em></a></div></section>
<section class="sobre-a"><div class="in sobre-a-in"><div class="sobre-a-fotos">${img('espera', 'Sala de espera da Estética Up')}${img('sala', 'Sala de procedimentos')}</div><div><p class="k">A clínica</p><h2>Fundada em 2012 pelo Dr. Sérgio Moreira</h2><p>${sobre[1]}</p><p>${sobre[2]}</p><a class="link-seta" href="${link(v, 'sobre')}">Conheça a família Up ${ic('seta')}</a></div></div></section>
<section class="in unid-a"><header class="tit"><p class="k">Unidades</p><h2>Perto de você, em três bairros de São Paulo</h2></header><div class="unids">${unidades.map(cardUnid).join('')}</div></section>
` + cta() + rodape(v);
  comum(v, pag, cab, cta, listaProcs);
  return pag;
}

// ---------- B: Nogueira (marrom #64584d do site, dourado, mais editorial) ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div></section>`;
  const cta = () => `<section class="cta-b"><div class="in cta-in"><h2>Avaliação gratuita. Agende agora.</h2><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.waVer}</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
  const listaProcs = () => `<div class="procs">${procs.map((p, i) => `<details class="proc sobe" id="${p.id}"${i === 0 ? ' open' : ''}><summary><span class="num">${String(i + 1).padStart(2, '0')}</span><b>${p.t}</b><small>${p.s}</small>${ic('seta')}</summary><div class="proc-corpo"><figure>${img(p.f, p.t)}</figure><div><p>${p.d}</p>${p.onde ? lista(p.onde) : ''}<a class="link-seta" href="${waMsg(`Olá! Vim pelo site e quero um orçamento de ${p.t.toLowerCase()}.`)}" target="_blank" rel="noopener">Pedir orçamento ${ic('seta')}</a></div></div></details>`).join('')}</div>`;
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div><p class="k">Estética Up · desde 2012</p><h1>Toxina botulínica e preenchimento em São Paulo.</h1><p>Produtos de primeira linha, preço justo e pagamento em até 10x sem juros, em três unidades: Vila Mariana, Campo Belo e Pinheiros.</p><p class="bts"><a class="btn" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}Avaliação gratuita</a><a class="btn btn-linha" href="${link(v, 'unidades')}">Ver unidades</a></p></div><figure class="hero-b-dr">${img('dr-sergio', 'Dr. Sérgio Moreira', ' loading="eager" fetchpriority="high"')}<figcaption>Dr. Sérgio Moreira · biomédico esteta</figcaption></figure></div></section>
<section class="numeros-b"><div class="in">${numeros.map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in duo-b"><a class="duo-card sobe" href="${link(v, 'procedimentos')}#toxina-botulinica">${img('toxina', 'Toxina botulínica')}<div><span class="num">01</span><h2>Toxina botulínica</h2><p>${procs[0].d.split('. ')[0]}.</p></div></a><a class="duo-card sobe" href="${link(v, 'procedimentos')}#preenchimento">${img('labial', 'Preenchimento labial')}<div><span class="num">02</span><h2>Preenchimento e harmonização</h2><p>${procs[1].d.split('. ')[0]}.</p></div></a></section>
<section class="outros-b"><div class="in"><header class="tit"><p class="k">Também fazemos</p><h2>Pele com colágeno, viço e textura</h2></header><ul class="outros">${procs.slice(2).map(p => `<li class="sobe"><a href="${link(v, 'procedimentos')}#${p.id}">${img(p.f, p.t)}<b>${p.t}</b><span>${p.s}</span></a></li>`).join('')}</ul></div></section>
<section class="in sobre-b"><div><p class="k">A família Up</p><h2>Beleza e bem-estar também são pilares da saúde</h2><p class="lead">${sobre[0]}</p><p>${sobre[1]}</p></div><div class="sobre-b-fotos">${img('recepcao', 'Recepção')}${img('espera', 'Sala de espera')}${img('sala', 'Sala de procedimentos')}</div></section>
<section class="unid-b"><div class="in"><header class="tit"><p class="k">Unidades</p><h2>Vila Mariana, Campo Belo e Pinheiros</h2></header><div class="unids">${unidades.map(cardUnid).join('')}</div></div></section>
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
  nome: 'Estética Up', artigo: 'da', url: E.url, lang: 'pt', cor: '#b0863c', fundo: '#3b3129', claro: '#faf6f0',
  fonteTitulo: 'Alice,Georgia,serif', fonteTexto: '"Nunito Sans",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Creme e dourado, delicada, com a borboleta do logo: preenchimento e o Dr. Sérgio na abertura, procedimentos em cartões e as três unidades.', pontos: ['14 anos, 10x sem juros e +120 mil aplicações à vista', '7 procedimentos explicados', 'Avaliação gratuita pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'No marrom e no dourado do site atual, mais editorial: toxina e preenchimento em destaque e procedimentos em sanfona.', pontos: ['Dr. Sérgio Moreira na abertura', 'Unidades com mapa e horário', 'Fácil de ler no celular'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
