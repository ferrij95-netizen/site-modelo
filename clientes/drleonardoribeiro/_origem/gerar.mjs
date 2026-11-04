// Dr. Leonardo Ribeiro, dermatologia, laser e estética (Natal/RN). Gera public/{a,b}/ e a página de escolha.
// node clientes/drleonardoribeiro/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs drleonardoribeiro https://www.drleonardoribeiro.com.br/)
// Textos: páginas do site atual (WordPress, wp-json/wp/v2/pages), em tratamentos.json. Fotos: wp-json/wp/v2/media do site atual.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const T = JSON.parse(fs.readFileSync(path.join(aqui, 'tratamentos.json'), 'utf8'));
const E = {
  nome: 'Dr. Leonardo Ribeiro', url: 'https://drleonardoribeiro.overtus.com.br/', antigo: 'https://www.drleonardoribeiro.com.br/',
  wa: '5584988957999', cel1: '(84) 98895-7999', cel2: '(84) 98701-3771', fone: '(84) 3322-1915', email: 'contato@personadermatologia.com.br',
  clinica: 'Persona Dermatologia', rua: 'Av. Rodrigues Alves, 800, Tyrol Business Center, Cobertura 1107', bairro: 'Tirol', cidade: 'Natal - RN',
  face: 'https://www.facebook.com/pages/DrLeonardoRibeiro/121389434673735',
  curto: 'Dermatologista em Natal-RN, com foco em laser e rejuvenescimento. Atendimento na Persona Dermatologia, no Tirol.',
};
const bio = 'Médico dermatologista, com residência médica feita na Universidade Federal do Rio de Janeiro (UFRJ), que atua em Natal-RN e Recife-PE com foco na área de laser e rejuvenescimento. Membro efetivo da Sociedade Brasileira de Dermatologia, do Colégio Ibero-Latino-Americano de Dermatologia e da Sociedade Brasileira de Laser em Medicina e Cirurgia.';
const registros = [['CRM-RN', '5111'], ['CRM-PE', '19564'], ['RQE', '1377']];
const sociedades = ['Sociedade Brasileira de Dermatologia', 'Colégio Ibero-Latino-Americano de Dermatologia', 'Sociedade Brasileira de Laser em Medicina e Cirurgia'];
const melasma = [
  ['É possível?', 'O tratamento do melasma é um desafio para nós, dermatologistas, e cada vez mais se buscam novas tecnologias eficazes no seu tratamento.'],
  ['Como funciona?', 'O laser de Nd-YAG tem afinidade pelo pigmento da mancha e, disparado em pulsos curtos e com alta energia, quebra esse pigmento e inibe o crescimento das células que dão vida às manchas.'],
  ['Como é o tratamento?', 'Inicialmente são programadas 10 sessões semanais para induzir o clareamento. Depois começa a fase de manutenção, com sessões quinzenais ou mensais, conforme cada caso.'],
];
const banners = [
  ['ultrassom', 'Ultrassom microfocado', 'Combate a flacidez da face e do pescoço', 'laser', 'ultrasom-microfocado-ulthera'],
  ['botox', 'Botox', 'Suaviza as rugas de expressão da testa e dos olhos', 'rejuvenescimento', 'botox'],
  ['co2', 'Laser de CO2 fracionado', 'Cicatrizes de acne, rugas finas e poros dilatados', 'laser', 'co2-fracionado'],
  ['depilacao', 'Depilação a laser', 'Laser de diodo, com resultado em menos sessões', 'laser', 'para-depilacao-luz-intensa-pulsada-e-diodo'],
  ['preenchimento', 'Preenchimento', 'Ácido hialurônico para sulcos, olheiras e lábios', 'rejuvenescimento', 'preenchimento'],
];
const areas = {
  laser: { nome: 'Laser', titulo: 'Tratamentos a laser', d: 'Tecnologias a laser, luz intensa pulsada, radiofrequência e ultrassom para pele, pelos, manchas e flacidez.', foto: 'laser' },
  rejuvenescimento: { nome: 'Rejuvenescimento', titulo: 'Rejuvenescimento', d: 'Botox, preenchimento e peelings para rugas, volume e textura da pele, do rosto às mãos.', foto: 'rosto' },
  estetica: { nome: 'Estética', titulo: 'Problemas estéticos', d: 'Rugas, celulite, estrias, olheiras, manchas, cicatrizes e gordura localizada, com tratamento indicado pelo dermatologista.', foto: 'celulite' },
  doencas: { nome: 'Doenças da pele', titulo: 'Doenças da pele', d: 'Diagnóstico e tratamento das doenças da pele, do cabelo e das unhas, da acne ao câncer de pele.', foto: 'problema-pele' },
};
for (const k of Object.keys(areas)) areas[k].itens = T[k];
const alt = {
  'dr-leonardo': 'Dr. Leonardo Ribeiro, dermatologista, no consultório', rosto: 'Rosto de mulher com pele tratada', laser: 'Aplicação de laser na pele', celulite: 'Tratamento de celulite',
  'problema-pele': 'Mulher sorrindo com a pele cuidada', maos: 'Mãos com manchas de sol', estrias: 'Tratamento de estrias', ultrassom: 'Ultrassom microfocado na face', botox: 'Aplicação de botox',
  co2: 'Laser de CO2 fracionado no rosto', depilacao: 'Depilação a laser na perna', preenchimento: 'Preenchimento com ácido hialurônico nos lábios', doencas: 'Pele saudável',
};
const nav = [{ slug: 'laser', nome: 'Laser' }, { slug: 'doencas', nome: 'Doenças da pele' }, { slug: 'rejuvenescimento', nome: 'Rejuvenescimento' }, { slug: 'estetica', nome: 'Estética' }, { slug: 'dr-leonardo', nome: 'Dr. Leonardo' }, { slug: 'contato', nome: 'Consulta' }];
export const nomesVersao = { a: 'Laser', b: 'Consultório' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500;600;700&family=Inter:wght@400;500;600&display=swap';
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá, gostaria de agendar uma consulta com o Dr. Leonardo Ribeiro.') => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#2f5a4e', b: '#f4f7f5' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Dermatologista em Natal-RN` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const marca = (claro = false) => `<span class="marca-lr"><img src="/assets/marca${claro ? '-clara' : ''}.svg" alt="" width="164" height="144"><span><b>Dr. Leonardo Ribeiro</b><small>Dermatologia, laser e estética</small></span></span>`;

// Texto de cada tratamento (blocos do WordPress): h -> subtítulo, "1- ..." -> lista numerada, "• a; • b" -> lista
function corpo(b) {
  const vistos = new Set(); let html = '', ol = [];
  const fecha = () => { if (ol.length) { html += `<ol class="passos-txt">${ol.map(x => `<li>${esc(x)}</li>`).join('')}</ol>`; ol = []; } };
  for (const [k, t0] of b) {
    let t = t0.replace(/^È/, 'É').replace(/(\S)\(/g, '$1 (').replace(/\s*Saiba mais no site do Grupo Brasileiro de Melanoma\.?/, '');
    if (vistos.has(t)) continue; vistos.add(t);
    const n = t.match(/^\d\s?-\s?(.*)$/);
    if (n) { ol.push(n[1].replace(/;$/, '')); continue; }
    fecha();
    if (k === 'h' && t.startsWith('(') && html.endsWith('</h4>')) html = html.slice(0, -5) + ` <small>${esc(t)}</small></h4>`;
    else if (k === 'h') html += `<h4>${esc(t)}</h4>`;
    else if (t.startsWith('•')) html += `<ul class="lista-check">${t.split('•').map(x => x.trim().replace(/[;.]$/, '')).filter(Boolean).map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
    else html += `<p>${esc(t)}</p>`;
  }
  fecha();
  return html || '<p>Pergunte na consulta como é o diagnóstico e o tratamento.</p>';
}
const resumo = it => { const p = it.b.find(x => x[0] === 'p' && !x[1].startsWith('•')); return p ? p[1].split(/(?<=\.)\s/)[0] : ''; };
const perguntar = t => `<a class="link-seta" href="${wa(`Olá! Gostaria de saber mais sobre ${t}.`)}" ${ext}>Perguntar pelo WhatsApp ${ic('seta')}</a>`;

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto"><option>Consulta dermatológica</option><option>Tratamento a laser</option><option>Rejuvenescimento</option><option>Problema estético</option><option>Doença da pele</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Melhor dia e horário, dúvida sobre algum tratamento..."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.cel1}</a><a href="tel:+55${E.cel2.replace(/\D/g, '')}">${E.cel2}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>${E.clinica}</strong><span>${E.rua}</span><span>${E.bairro}, ${E.cidade}</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Persona Dermatologia" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Av. Rodrigues Alves, 800, Tyrol Business Center, Tirol, Natal RN')}&z=16&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial">${marca(false)}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
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
    <div class="rod-marca">${marca(true)}<p>${registros.map(r => `${r[0]} ${r[1]}`).join(' · ')}</p><p><a href="${E.face}" ${ext} class="rod-social">${ic('face')}Facebook</a></p></div>
    <div><h3>Tratamentos</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Consultas</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.cel1}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.clinica}<br>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Dr. Leonardo Ribeiro. Responsável técnico: Dr. Leonardo Ribeiro, CRM-RN 5111, RQE 1377.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const melasmaPassos = () => `<ol class="melasma">${melasma.map((m, i) => `<li class="sobe"><span class="n">${i + 1}</span><h3>${m[0]}</h3><p>${m[1]}</p></li>`).join('')}</ol>`;
const cta = () => `<section class="cta"><div class="in cta-in"><div><h2>Agende sua consulta</h2><p>Atendimento na ${E.clinica}, no Tyrol Business Center, em Natal.</p></div><p class="bts"><a class="btn btn-claro" href="${wa()}" ${ext}>${icWa()}Agendar pelo WhatsApp</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;
const credenciais = () => `<ul class="credenciais">${registros.map(r => `<li><small>${r[0]}</small><b>${r[1]}</b></li>`).join('')}</ul>`;

// páginas iguais nas duas versões, com cabeçalho e lista de tratamentos de cada versão
function comum(v, pag, cab, lista) {
  pag['dr-leonardo'] = head(v, 'dr-leonardo', 'Dr. Leonardo Ribeiro', bio) + topo(v, 'dr-leonardo') + cab('O médico', 'Dr. Leonardo Ribeiro', 'dr-leonardo', 'Dermatologista com residência na UFRJ, com foco em laser e rejuvenescimento.') + `
<div class="in"><section class="dr-pag"><figure class="dr-foto">${img('dr-leonardo')}</figure><div><p class="lead">${bio}</p>${credenciais()}<h3>Sociedades</h3><ul class="lista-check">${sociedades.map(s => `<li>${s}</li>`).join('')}</ul><h3>Onde atende</h3><p>Em Natal, na ${E.clinica} (${E.rua}, ${E.bairro}). Também atende em Recife-PE.</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Agendar consulta</a></p></div></section></div>
` + cta() + rodape(v);
  for (const [k, a] of Object.entries(areas)) {
    pag[k] = head(v, k, a.titulo, a.d) + topo(v, k) + cab('Tratamentos', a.titulo, a.foto, a.d) + `
<div class="in"><section class="area-pag"><nav class="ancoras" aria-label="Áreas">${Object.entries(areas).map(([k2, a2]) => `<a href="${link(v, k2)}"${k2 === k ? ' aria-current="page"' : ''}>${a2.nome}</a>`).join('')}</nav>${lista(a, k)}</section></div>
` + cta() + rodape(v);
  }
  pag.contato = head(v, 'contato', 'Consulta', `Agende: ${E.fone} e WhatsApp ${E.cel1}. ${E.clinica}, ${E.rua}, ${E.bairro}, ${E.cidade}.`) + topo(v, 'contato') + cab('Consulta', 'Agende sua consulta', 'rosto', 'Envie suas dúvidas ou agende pelo WhatsApp ou por telefone.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Envie sua mensagem</h2><p>Preencha e a mensagem abre pronta no WhatsApp.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

// A: sanfona com foto ao lado
const listaA = (a, k) => `<div class="procs">${a.itens.map((p, i) => `<details class="proc sobe" id="${p.slug}"${i === 0 ? ' open' : ''}><summary><span><b>${p.t}</b>${p.s ? `<small>${p.s}</small>` : ''}</span>${ic('seta')}</summary><div class="proc-corpo${p.f && k !== 'doencas' ? '' : ' sem-foto'}">${p.f && k !== 'doencas' ? `<figure>${img(p.f, p.t)}</figure>` : ''}<div>${corpo(p.b)}${perguntar(p.t)}</div></div></details>`).join('')}</div>`;
// B: índice lateral fixo e artigos em sequência
const listaB = (a, k) => `<div class="artigos"><aside class="indice"><p class="k">${a.itens.length} temas</p><ol>${a.itens.map(p => `<li><a href="#${p.slug}">${p.t}</a></li>`).join('')}</ol></aside><div>${a.itens.map(p => `<article class="artigo sobe" id="${p.slug}"><header><h2>${p.t}</h2>${p.s ? `<p class="sub">${p.s}</p>` : ''}</header>${p.f && k !== 'doencas' ? `<figure class="artigo-foto">${img(p.f, p.t)}</figure>` : ''}<div class="artigo-txt">${corpo(p.b)}${perguntar(p.t)}</div></article>`).join('')}</div></div>`;

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div><figure>${img(foto, alt[foto] || '', ' loading="eager"')}</figure></div></section>`;
  const area = (k, slug) => link(v, k) + '#' + slug;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Dermatologista em Natal-RN</p><h1>Dermatologia, laser e estética</h1><p>Tecnologia a laser e rejuvenescimento com o Dr. Leonardo Ribeiro, dermatologista com residência na UFRJ e membro da Sociedade Brasileira de Dermatologia.</p><p class="bts"><a class="btn btn-claro" href="${wa()}" ${ext}>${icWa()}Agendar consulta</a><a class="btn btn-linha" href="${link(v, 'laser')}">Ver tratamentos</a></p></div>
<div class="hero-a-car" data-carrossel>${banners.map((b, i) => `<a class="slide${i ? '' : ' ativo'}" href="${area(b[3], b[4])}">${img(b[0], alt[b[0]], i ? '' : ' loading="eager" fetchpriority="high"')}<span class="legenda"><b>${b[1]}</b>${b[2]}</span></a>`).join('')}<div class="pontos"></div></div></div></section>
<section class="in destaques-a"><header class="tit"><p class="k">Dermatologista atendendo em Natal-RN</p><h2>Procedimentos mais procurados</h2></header><ul class="destaques">
  <li class="sobe"><a href="${area('laser', 'remocao-de-tatuagem-nd-yag-q-switched')}">${ic('disco')}<h3>Tatuagem</h3><p>Remoção de tatuagem a laser, sem marcas.</p></a></li>
  <li class="sobe"><a href="${area('laser', 'blefaroplastia-plastica-das-palpebras')}">${ic('estrela')}<h3>Blefaroplastia</h3><p>Cirurgia plástica das pálpebras com laser.</p></a></li>
  <li class="sobe"><a href="${area('rejuvenescimento', 'peeling')}">${ic('gota')}<h3>Peeling</h3><p>Renovação da pele para manchas, acne e rugas.</p></a></li>
</ul></section>
<section class="melasma-a"><div class="in"><header class="tit tit-linha"><div><p class="k">Novidade em laser</p><h2>Tratamento do melasma com laser</h2></div><a class="link-seta" href="${area('laser', 'tratamento-do-melasma-com-laser')}">Saiba mais ${ic('seta')}</a></header>${melasmaPassos()}</div></section>
<section class="in duo-a">
  <a class="duo sobe" href="${area('rejuvenescimento', 'rejuvenescimento-das-maos')}"><figure>${img('maos')}</figure><div><p class="k">Rejuvenescimento</p><h3>Rejuvenescimento das mãos</h3><p>Preenchimento para os sulcos entre os tendões, laser e peelings para as manchas de sol.</p><span class="link-seta">Conheça ${ic('seta')}</span></div></a>
  <a class="duo sobe" href="${area('estetica', 'estrias')}"><figure>${img('estrias')}</figure><div><p class="k">Estética</p><h3>Tratamento de estrias</h3><p>Peelings, laser de CO2 fracionado, preenchimento e outras técnicas, conforme o tipo de estria.</p><span class="link-seta">Conheça ${ic('seta')}</span></div></a>
</section>
<section class="pele-a"><div class="in pele-a-in"><div><p class="k">Problemas de pele</p><h2>Doenças da pele, do cabelo e das unhas</h2><p>Diagnóstico e tratamento de ${T.doencas.length} condições, da acne ao câncer de pele.</p><a class="btn" href="${link(v, 'doencas')}">Ver todas ${ic('seta')}</a></div><ul class="chips">${T.doencas.map(d => `<li><a href="${area('doencas', d.slug)}">${d.t}</a></li>`).join('')}</ul></div></section>
<section class="in dr-a"><figure>${img('dr-leonardo')}</figure><div><p class="k">O médico</p><h2>Dr. Leonardo Ribeiro</h2><p>${bio}</p>${credenciais()}<a class="link-seta" href="${link(v, 'dr-leonardo')}">Formação e sociedades ${ic('seta')}</a></div></section>
` + cta() + rodape(v);
  comum(v, pag, cab, listaA);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto, d = '') => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div></div></section>`;
  const area = (k, slug) => link(v, k) + '#' + slug;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div class="hero-b-txt"><p class="k">Persona Dermatologia · Tirol, Natal</p><h1>Cuidado com a pele, com a precisão do laser.</h1><p>${E.curto}</p>${credenciais()}<p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Agendar consulta</a><a class="btn btn-linha" href="${link(v, 'dr-leonardo')}">Conheça o médico</a></p></div><figure class="hero-b-foto">${img('dr-leonardo', alt['dr-leonardo'], ' loading="eager" fetchpriority="high"')}<figcaption><b>Dr. Leonardo Ribeiro</b>Dermatologista · residência na UFRJ</figcaption></figure></div></section>
<section class="in areas-b"><header class="tit"><p class="k">Tratamentos</p><h2>Quatro frentes de cuidado</h2></header><ol class="areas-lista">${Object.entries(areas).map(([k, a], i) => `<li class="sobe"><a href="${link(v, k)}"><span class="n">0${i + 1}</span><div><h3>${a.titulo}</h3><p>${a.d}</p></div><ul>${a.itens.slice(0, 4).map(p => `<li>${p.t}</li>`).join('')}${a.itens.length > 4 ? `<li>e mais ${a.itens.length - 4}</li>` : ''}</ul>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="faixa-b"><div class="faixa-b-fotos">${banners.slice(0, 3).map(b => `<a href="${area(b[3], b[4])}"><figure>${img(b[0])}</figure><span><b>${b[1]}</b>${b[2]}</span></a>`).join('')}</div></section>
<section class="in melasma-b"><div class="melasma-b-intro"><p class="k">Laser Nd-YAG</p><h2>Melasma tem tratamento com laser</h2><p>Junto com cremes e peelings, o laser se soma como uma opção real e eficaz, principalmente nos casos que não respondem aos tratamentos convencionais.</p><a class="link-seta" href="${area('laser', 'tratamento-do-melasma-com-laser')}">Ler sobre o tratamento ${ic('seta')}</a></div>${melasmaPassos()}</section>
<section class="pele-b"><div class="in"><header class="tit tit-linha"><div><p class="k">De A a Z</p><h2>Doenças da pele</h2></div><a class="link-seta" href="${link(v, 'doencas')}">Ver todas ${ic('seta')}</a></header><ul class="az">${T.doencas.map(d => `<li><a href="${area('doencas', d.slug)}"><b>${d.t[0]}</b>${d.t}</a></li>`).join('')}</ul></div></section>
<section class="in visita-b"><div><p class="k">Consultas</p><h2>Onde atendemos</h2><p><b>${E.clinica}</b><br>${E.rua}<br>${E.bairro}, ${E.cidade}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}${E.cel1}</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div>${mapaFrame}</section>
` + cta() + rodape(v);
  comum(v, pag, cab, listaB);
  return pag;
}

copiarSiteJs(pub, E.wa);
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Dr. Leonardo Ribeiro', artigo: 'do', url: E.url, lang: 'pt', cor: '#4f8a7a', fundo: '#2f5a4e', claro: '#f4f7f5',
  fonteTitulo: '"Noto Sans",system-ui,sans-serif', fonteTexto: 'Inter,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: 'No verde do logo, com o carrossel de tratamentos do site atual e o melasma com laser em três passos.', pontos: ['Laser, rejuvenescimento, estética e doenças da pele', 'Cada tratamento com o texto do Dr. Leonardo', 'Agendamento direto no WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Clara e direta, com o médico e os registros CRM e RQE logo na abertura e as doenças de A a Z.', pontos: ['Quatro frentes de cuidado, numeradas', 'Artigos com índice lateral em cada área', 'Mapa e contatos sempre à mão'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
