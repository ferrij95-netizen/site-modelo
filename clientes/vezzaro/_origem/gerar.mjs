// Confecções Vezzaro, uniformes (Caxias do Sul/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/vezzaro/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs vezzaro https://www.vezzaro.com.br/)
// Textos e fotos do site atual (Wix). Produtos lidos do carrossel "Linha de produtos" (8 slides).
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Vezzaro Uniformes', url: 'https://vezzaro.overtus.com.br/', antigo: 'https://www.vezzaro.com.br/',
  wa: '555432232640', fone1: '(54) 3223-2640', fone2: '(54) 3223-6228', email: 'vezzarouniformes@gmail.com', insta: 'vezzarouniformes',
  rua: 'Rua Borges de Medeiros, 42', bairro: 'Centro', cidade: 'Caxias do Sul - RS',
  curto: 'Uniformes escolares, profissionais e de turma, personalizados com a marca da sua empresa, escola ou time. Confecção própria em Caxias do Sul desde 1986.',
};
const historia = [
  'Fundada em 1986, em Caxias do Sul, a Confecções Vezzaro nasceu do sonho de duas pessoas, um contador e uma professora de artes. Com muita dedicação e paixão pelo negócio, a confecção foi crescendo e se consolidando no ramo de uniformes, sempre prezando pela qualidade, conforto, estilo e durabilidade dos produtos.',
  'No início, vendia moda feminina, infantil e roupas esportivas por representantes, além de fornecer uniformes escolares para lojistas da cidade. Com a procura pelos uniformes direto na confecção, foi aberta a loja de fábrica.',
  'Em meados de 2000, a empresa passou a focar na linha de uniformes. Além da escolar, tem uma ampla linha de produtos personalizados com a marca dos clientes. Em 2015, mudou para um endereço com amplo espaço para atender melhor.',
];
const marcos = [['1986', 'Fundação da confecção em Caxias do Sul'], ['Loja de fábrica', 'Aberta pela procura dos uniformes direto na confecção'], ['2000', 'Foco total na linha de uniformes'], ['2015', 'Novo endereço, com amplo espaço']];
const produtos = [
  { id: 'jaquetas', t: 'Jaquetas', itens: ['Jaqueta de inverno acolchoada', 'Jaqueta corta-vento'] },
  { id: 'coletes', t: 'Coletes', itens: ['Colete acolchoado', 'Colete malha colegial'] },
  { id: 'polo-camisetas', t: 'Camisa polo e camisetas', itens: ['Camisa polo', 'Camisetas', 'Baby look', 'Sobrelegging'] },
  { id: 'moletom', t: 'Moletom', itens: ['Blusão decote redondo', 'Blusão canguru', 'Canguru com zíper', 'Jaqueta college', 'Calça'] },
  { id: 'termica', t: 'Linha térmica', itens: ['Básicas térmicas', 'Calças térmicas', 'Blusão de soft', 'Jaqueta fleece'] },
  { id: 'trico', t: 'Blusa tricô', itens: ['Blusão decote V', 'Blusão decote redondo', 'Cardigã', 'Básica'] },
  { id: 'avental', t: 'Avental', itens: ['Avental frente e costas', 'Avental frente única', 'Avental de cintura'] },
  { id: 'jaleco', t: 'Jaleco', itens: ['Jaleco feminino e masculino', 'Gola padre', 'Gola esporte', 'Guarda-pó'] },
];
const linhas = [
  { foto: 'escolar', t: 'Uniformes escolares', d: 'Uniformes das escolas parceiras, prontos na loja de fábrica.', pag: 'escolar' },
  { foto: 'turma', t: 'Blusões de turma', d: 'Moletons, camisetas e jaquetas de formatura com o nome e a arte da turma.', pag: 'escolar' },
  { foto: 'personalizadas', t: 'Peças personalizadas', d: 'Camisetas, polos e jalecos com a marca da sua empresa ou do seu time.', pag: 'produtos' },
  { foto: 'jaquetas', t: 'Jaquetas e coletes', d: 'Acolchoados e corta-vento para o inverno da Serra.', pag: 'produtos' },
];
const passos = [['Conte o que precisa', 'Peças, quantidades e a marca, turma ou escola.'], ['Escolha modelo e malha', 'Na loja ou pelo WhatsApp, com amostras das peças.'], ['Aprovação da arte', 'Bordado ou estampa com a sua marca, aprovado antes da produção.'], ['Produção e entrega', 'Confecção própria em Caxias do Sul.']];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'produtos', nome: 'Produtos' }, { slug: 'escolar', nome: 'Escolar e turmas' }, { slug: 'sobre', nome: 'Sobre' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Clássico', b: 'Ateliê de Uniformes' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Lato:wght@400;700&family=Marcellus&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da Vezzaro e gostaria de um orçamento de uniformes.') => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#1d3b63', b: '#eef2f4' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Uniformes escolares e personalizados em Caxias do Sul` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Empresa, escola ou turma<input name="para" autocomplete="organization"></label><label>Linha<select name="linha"><option>Uniforme escolar</option><option>Blusão / jaqueta de turma</option><option>Uniforme profissional</option>${produtos.map(p => `<option>${p.t}</option>`).join('')}</select></label></div>
  <div class="form-duas"><label>Quantidade aproximada<input name="quantidade" inputmode="numeric" placeholder="Ex.: 40 peças"></label><label>Personalização<select name="personalizacao"><option>Bordado</option><option>Estampa</option><option>Ainda não sei</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="3" placeholder="Cores, tamanhos, prazo"></textarea></label>
  <button class="btn" type="submit">${icWa()}Pedir orçamento pelo WhatsApp</button>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>Telefone e WhatsApp</strong><a href="${wa()}" ${ext}>${E.fone1}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone2)}">${E.fone2}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="https://www.instagram.com/${E.insta}/" ${ext}>@${E.insta}</a></div></li>
  <li>${ic('pin')}<div><strong>Loja de fábrica</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Vezzaro Uniformes" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Borges de Medeiros, 42, Centro, Caxias do Sul RS')}&z=16&output=embed"></iframe>`;

function topo(v, s) {
  if (v === 'a') return `<header class="topo">
  <div class="in topo-marca"><a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="Vezzaro" width="900" height="108"><span>Uniformes</span></a>${btnMenu}</div>
  <nav id="menu" class="menu" aria-label="Principal"><ul class="in">${menuItens(v, nav, s)}<li class="menu-wa"><a href="${wa()}" ${ext}>${icWa()}${E.fone1}</a></li></ul></nav>
</header>
<main id="conteudo">
`;
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/simbolo.webp" alt="" width="300" height="300"><span><img src="/assets/logo.webp" alt="Vezzaro" width="900" height="108"><small>Uniformes desde 1986</small></span></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" ${ext}>${icWa()}Orçamento</a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Vezzaro" width="900" height="108" loading="lazy"><p>Uniformes escolares, profissionais e de turma. Confecção própria em Caxias do Sul desde 1986.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Loja de fábrica</h3><ul class="rod-dados">
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}</span></li>
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.fone1}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone2)}">${E.fone2}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('insta')}<a href="https://www.instagram.com/${E.insta}/" ${ext}>@${E.insta}</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Confecções Vezzaro Ltda. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const cardProduto = p => `<article class="prod sobe" id="${p.id}"><figure>${img('p-' + p.id, p.t)}</figure><h3>${p.t}</h3><ul>${p.itens.map(i => `<li>${i}</li>`).join('')}</ul><a class="link-seta" href="${wa(`Olá! Vim pelo site e quero orçamento de ${p.t.toLowerCase()}.`)}" ${ext}>Orçamento ${ic('seta')}</a></article>`;

function comum(v, pag, cab) {
  pag.produtos = head(v, 'produtos', 'Produtos', 'Jaquetas, coletes, polos, camisetas, moletons, linha térmica, tricô, aventais e jalecos personalizados com a marca da sua empresa, turma ou time.') + topo(v, 'produtos') + cab('Linha de produtos', 'Personalizamos com a marca da sua empresa, turma ou time.', 'personalizadas') + `
<div class="in"><section class="prods">${produtos.map(cardProduto).join('')}</section>
<section class="passos-sec"><h2>Como funciona o pedido</h2><ol>${passos.map((p, i) => `<li class="sobe"><b>${i + 1}</b><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol></section></div>
` + rodape(v);
  pag.escolar = head(v, 'escolar', 'Escolar e turmas', 'Uniformes escolares na loja de fábrica e blusões, camisetas e jaquetas de turma e formatura em Caxias do Sul.') + topo(v, 'escolar') + cab('Escolar e turmas', 'Do uniforme do dia a dia ao blusão do terceirão.', 'escolar') + `
<div class="in"><section class="duas sobe"><figure>${img('escolar', 'Jaqueta college e blusão de uniforme escolar')}</figure><div><h2>Uniformes escolares</h2><p>A Vezzaro começou fornecendo uniformes escolares para os lojistas de Caxias do Sul. Hoje os uniformes das escolas parceiras ficam prontos na loja de fábrica, com moletons, jaquetas, camisetas, calças e a linha térmica para o inverno.</p><p class="bts"><a class="btn" href="${wa('Olá! Quero saber dos uniformes da escola do meu filho.')}" ${ext}>${icWa()}Consultar a escola</a></p></div></section>
<section class="escolas"><h2>Algumas escolas atendidas</h2>${img('escolas', 'Logos de escolas atendidas pela Vezzaro')}</section>
<section class="duas inv sobe"><figure>${img('turma', 'Blusões de turma com nome e ano')}</figure><div><h2>Blusões de turma e formatura</h2><p>Moletom canguru, blusão, jaqueta college e camisetas com o nome, o ano e a arte da turma. Bordado ou estampa, nas cores que a turma escolher.</p><ul class="lista-check">${['Canguru, canguru com zíper e blusão', 'Jaqueta college', 'Camisetas e baby look', 'Arte aprovada antes da produção'].map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul><p class="bts"><a class="btn" href="${wa('Olá! Quero orçamento de blusão de turma.')}" ${ext}>${icWa()}Orçamento para a turma</a></p></div></section></div>
` + rodape(v);
  pag.sobre = head(v, 'sobre', 'Sobre', historia[0]) + topo(v, 'sobre') + cab('Sobre nós', 'Uma confecção de família, desde 1986.', 'predio') + `
<div class="in"><section class="texto-pag"><div>${historia.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><figure>${img('loja', 'Loja de fábrica da Vezzaro')}<figcaption>A loja de fábrica, na Rua Borges de Medeiros.</figcaption></figure></section>
<section class="linha-tempo"><h2>Nossa história</h2><ol>${marcos.map(m => `<li class="sobe"><b>${m[0]}</b><p>${m[1]}</p></li>`).join('')}</ol></section>
<figure class="predio sobe">${img('predio', 'Prédio da Vezzaro em Caxias do Sul')}</figure></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Vezzaro Uniformes: ${E.rua}, ${E.bairro}, ${E.cidade}. Telefone e WhatsApp ${E.fone1}.`) + topo(v, 'contato') + cab('Contato', 'Tem perguntas ou pedidos especiais? Fale com a gente.', 'loja') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Peça seu orçamento</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><span class="risco" aria-hidden="true"></span><h1>Uniformes com a marca da sua escola, empresa ou turma</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Ver a linha de produtos</a></p></div><figure class="hero-a-foto">${img('turma', 'Blusões de turma personalizados', ' loading="eager" fetchpriority="high"')}</figure></div></section>
<section class="in linhas-a"><header class="tit"><p class="k">O que fazemos</p><h2>Quatro linhas, uma confecção</h2></header><div class="linhas">${linhas.map(l => `<a class="linha sobe" href="${link(v, l.pag)}"><figure>${img(l.foto, l.t)}</figure><h3>${l.t}</h3><p>${l.d}</p></a>`).join('')}</div></section>
<section class="faixa-a"><div class="in"><h2>Linha de produtos</h2><p>Personalizamos com a marca da sua empresa, turma ou time.</p><ul class="mini-prods">${produtos.map(p => `<li><a href="${link(v, 'produtos')}#${p.id}">${img('p-' + p.id, p.t)}<span>${p.t}</span></a></li>`).join('')}</ul></div></section>
<section class="in sobre-a"><figure>${img('loja', 'Loja de fábrica')}</figure><div><p class="k">Desde 1986</p><h2>Do sonho de um contador e uma professora de artes</h2><p>${historia[0]}</p><a class="link-seta" href="${link(v, 'sobre')}">Nossa história ${ic('seta')}</a></div></section>
<section class="in escolas-a"><p class="k">Escolas atendidas</p>${img('escolas', 'Logos de escolas atendidas')}</section>
<section class="cta-a"><div class="in"><div><h2>Visite a loja de fábrica</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}</p></div><p class="bts"><a class="btn btn-claro" href="${wa()}" ${ext}>${icWa()}${E.fone1}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Como chegar</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div><p class="k">Confecção própria · Caxias do Sul · desde 1986</p><h1>Feito sob medida para quem veste a camisa.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Orçamento pelo WhatsApp</a><a class="link-seta" href="${link(v, 'escolar')}">Uniforme escolar ${ic('seta')}</a></p></div><div class="hero-b-grade">${['escolar', 'turma', 'jaquetas', 'personalizadas'].map((f, i) => `<figure class="g${i + 1}">${img(f, linhas.find(l => l.foto === f).t, i < 2 ? ' loading="eager"' : '')}</figure>`).join('')}</div></div></section>
<section class="numeros-b"><div class="in"><ul><li><b>1986</b><span>fundação</span></li><li><b>8</b><span>linhas de produtos</span></li><li><b>Loja</b><span>de fábrica no Centro</span></li><li><b>Bordado</b><span>ou estampa com a sua marca</span></li></ul></div></section>
<section class="in prods-b"><header class="tit-b"><p class="k">Linha de produtos</p><h2>Escolha a peça. A marca é sua.</h2></header><section class="prods">${produtos.map(cardProduto).join('')}</section></section>
<section class="turma-b"><div class="in turma-b-in"><div><p class="k">Terceirão e formatura</p><h2>O blusão que a turma vai guardar.</h2><p>Moletom canguru, jaqueta college e camisetas com o nome, o ano e a arte da turma.</p><a class="btn" href="${wa('Olá! Quero orçamento de blusão de turma.')}" ${ext}>${icWa()}Orçamento para a turma</a></div><figure>${img('turma', 'Blusões de turma')}</figure></div></section>
<section class="in passos-b"><header class="tit-b"><p class="k">Como funciona</p><h2>Do pedido à entrega</h2></header><ol>${passos.map((p, i) => `<li class="sobe"><b>0${i + 1}</b><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol></section>
<section class="in historia-b"><figure>${img('predio', 'Prédio da Vezzaro')}</figure><div><p class="k">Sobre nós</p><h2>Uma confecção de família</h2><p>${historia[0]}</p><a class="link-seta" href="${link(v, 'sobre')}">Conheça a história ${ic('seta')}</a></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Vezzaro', artigo: 'da', url: E.url, lang: 'pt', cor: '#5d7a99', fundo: '#1d3b63', claro: '#eef2f4',
  fonteTitulo: 'Cinzel,Georgia,serif', fonteTexto: 'Lato,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Fiel ao site atual: o logo VEZZARO no alto, os tons azul e verde-acinzentado e o traço branco dos banners, agora com página para cada linha.', pontos: ['As 8 linhas de produtos com o que tem em cada uma', 'Página de uniforme escolar e blusão de turma', 'História desde 1986 e a loja de fábrica'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais comercial: abertura com quatro fotos das linhas, números da empresa e o passo a passo do pedido personalizado.', pontos: ['"Feito sob medida para quem veste a camisa"', 'Orçamento com quantidade e tipo de personalização', 'Seção própria para terceirão e formatura'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
