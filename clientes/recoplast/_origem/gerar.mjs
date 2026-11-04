// Recoplast, reciclagem de plásticos e resinas (Sapucaia do Sul/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/recoplast/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs recoplast https://recoplast.com.br/)
// Textos do site atual (WordPress). Fotos do site atual são banco de imagens com moldura (e uma com marca d'água),
// por isso as fotos aqui são CC0 (rawpixel via Openverse), listadas no LEIA-ME. Logo: isotipo original + nome em fonte.
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Recoplast', url: 'https://recoplast.overtus.com.br/', antigo: 'https://recoplast.com.br/',
  wa: '5551995450897', fone1: '(51) 3451-5011', fone2: '(51) 99545-0897', email: 'recoplast@recoplast.com.br',
  insta: 'recoplast.ltda', face: 'recoplast.ltda',
  rua: 'Rodovia RS-118, nº 6874', bairro: 'Boa Vista', cidade: 'Sapucaia do Sul - RS', horario: 'Segunda a sexta, das 8h às 18h',
  curto: 'Indústria de reciclagem de resíduos plásticos pós-industriais, pós-consumo e petroquímicos, e comercializadora de resinas plásticas. Quase 30 anos em Sapucaia do Sul.',
};
const sobre = [
  'A Recoplast é uma indústria de reciclagem de resíduos plásticos pós-industriais, pós-consumo, petroquímicos e comercializadora de resinas plásticas. Com quase 30 anos, trabalhamos com muita dedicação e somos grandes parceiros de nossos fornecedores e clientes.',
  'Buscamos diariamente colocar mais plásticos reciclados no mercado. O impacto ambiental e social deste movimento é peça-chave para fazer nossa economia retomar o eixo e nosso mercado voltar a produzir empregos.',
  'Temos equipamentos de última geração e mão de obra qualificada para oferecer o melhor serviço e o melhor material reciclado do mercado, que fazem do nosso trabalho uma referência regional. Sabemos o que fazer por você.',
];
const visao = 'Estar entre os melhores industrializadores de resíduos plásticos e comercializadores de resinas plásticas do país, sendo uma referência no modelo de trabalho e padrão de qualidade.';
const missao = 'Atuar de forma dinâmica e objetiva para satisfazer nossos clientes, com produtos e serviços de excelente qualidade, visando conjuntamente a preservação ambiental e o desenvolvimento social.';
const valores = ['Respeito', 'Empreendedorismo', 'Comprometimento', 'Inovação', 'Cooperação', 'Liderança', 'Amizade', 'Reconhecimento'];
const passos = [
  ['Coleta', 'Coletamos o insumo na sua empresa.', 'caminhao'],
  ['Processo', 'Separamos, identificamos e processamos de acordo com a sua especificação.', 'engrenagem'],
  ['Entrega', 'Entregamos a resina plástica pronta para o uso da sua produção.', 'pacote'],
];
const origens = [
  { t: 'Pós-industrial', d: 'Ligado diretamente a indústrias variadas.', foto: 'aparas' },
  { t: 'Pós-consumo', d: 'Coleta de plásticos usados pelo consumidor final.', foto: 'garrafas' },
  { t: 'Petroquímico', d: 'Resíduos vindos da indústria fabricante do plástico.', foto: 'pellets' },
];
const produtos = [
  { id: 'recicladas', t: 'Resinas recicladas', foto: 'flocos', d: 'Materiais feitos a partir de resíduos plásticos industriais ou pós-consumo, oferecendo maior variedade em tipos e opções.', itens: ['Produto ecológico, ambientalmente correto', 'Excelente qualidade, trabalhado no detalhe', 'Ressignificação para o seu negócio: aumenta o valor da marca e reduz custo'] },
  { id: 'virgens', t: 'Resinas virgens', foto: 'pellets', d: 'Uma seleção com produtos de alta qualidade para a melhor aplicação possível no seu processo produtivo, buscando sempre o melhor custo-benefício para você.' },
  { id: 'off-grade', t: 'Resinas off-grade', foto: 'tampinhas', d: 'Ampla variedade de grades e atendimento personalizado para reduzir seu custo, manter seu processo produtivo alinhado e a qualidade dos seus produtos preservada.' },
  { id: 'masterbatches', t: 'Masterbatches e aditivos', foto: 'aparas', d: 'Os masterbatches são concentrados de cores criados da mistura de pigmentos e aditivos. O uso é ideal para colorir produtos finais.' },
  { id: 'aparas', t: 'Aparas e sucatas plásticas', foto: 'fardos', d: 'Trabalhamos com os melhores materiais do mercado, comprando-os para a nossa produção e também vendendo-os para indústrias parceiras.' },
];
const compromisso = [
  ['Logística reversa', 'A Recoplast é uma peça fundamental sendo indústria recuperadora de plásticos, pois proporciona a reutilização do resíduo e gera renda e emprego a partir dela.'],
  ['Mercado consciente', 'Almejamos aumentar a quantidade de plásticos recicláveis no mercado e incentivar os processos de despoluição de cidades. Nosso lema é repensar, reduzir, reutilizar, reciclar e recusar.'],
  ['Responsabilidade social', 'Junto a parceiros da indústria, fornecedores e clientes, buscamos envolver a sociedade com a cultura da reciclagem como futurista e sustentável.'],
  ['Economia circular', 'Somos participantes da economia circular nos colocando como facilitadores no mercado de plástico reciclado, buscando reduzir o custo da indústria a curto e longo prazo, engajando coletores e demais participantes.'],
  ['Preservação ambiental', 'Além da recuperação do plástico que não será descartado na natureza, investir neste mercado é reduzir a fabricação de novos plásticos, processo que demanda extração de recursos minerais e maior interferência no meio ambiente.'],
];
const atendemos = 'Buscamos prestar o melhor serviço de industrialização possível. Com equipamentos de ponta, mão de obra qualificada e bastante experiência, desenvolvemos junto com nossos clientes o melhor produto possível, desde a coleta até a entrega. Atendemos as empresas que procuram ressignificar seus materiais.';
const rodTexto = 'Utilizando nossos produtos, você está participando ativamente da economia circular. Vamos trabalhar juntos pela preservação ambiental e construir um mercado sustentável com plásticos recicláveis.';

const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'A Recoplast' }, { slug: 'produtos', nome: 'Produtos' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Ciclo', b: 'Pátio' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&family=Red+Hat+Display:wght@500;700;900&family=Red+Hat+Text:wght@400;500;700&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da Recoplast e gostaria de um orçamento.') => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#2fa896', b: '#16201f' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Reciclagem de plásticos e resinas em Sapucaia do Sul` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const marca = v => `<a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><span class="marca-nome">Reco<b>Plast</b></span><img src="/assets/img/isotipo.webp" alt="" width="155" height="160"></a>`;

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <div class="form-duas"><label>Assunto<select name="assunto"><option>Comprar resina</option>${produtos.map(p => `<option>${p.t}</option>`).join('')}<option>Destinar resíduo plástico</option><option>Outro assunto</option></select></label><label>Prefiro o primeiro contato por<select name="contato"><option>WhatsApp</option><option>Ligação</option><option>E-mail</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="3" placeholder="Material, quantidade, especificação"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.fone2}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone1)}">${E.fone1}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Sede</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}</span></div></li>
  <li>${ic('relogio')}<div><strong>Atendimento</strong><span>${E.horario}</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Recoplast" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Recoplast, Rodovia RS-118, 6874, Boa Vista, Sapucaia do Sul RS')}&z=15&output=embed"></iframe>`;
const redes = `<a href="https://www.instagram.com/${E.insta}/" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="https://www.facebook.com/${E.face}/" ${ext} aria-label="Facebook">${ic('face')}</a>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" ${ext}>${icWa()}Fale conosco</a>
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
    <div class="rod-marca">${marca(v)}<p>${rodTexto}</p><p class="rod-redes">${redes}</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Sede</h3><ul class="rod-dados">
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}</span></li>
      <li>${ic('tel')}<a href="${telHref(E.fone1)}">${E.fone1}</a></li>
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.fone2}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('relogio')}<span>${E.horario}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Recoplast Recuperação e Comércio de Plásticos. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const prodBloco = (p, i) => `<article class="prod-linha sobe" id="${p.id}"><figure>${img(p.foto, p.t)}</figure><div><p class="prod-n">0${i + 1}</p><h2>${p.t}</h2><p>${p.d}</p>${p.itens ? `<ul class="lista-check">${p.itens.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>` : ''}<a class="link-seta" href="${wa(`Olá! Vim pelo site e quero orçamento de ${p.t.toLowerCase()}.`)}" ${ext}>Pedir orçamento ${ic('seta')}</a></div></article>`;
const passosLista = cls => `<ol class="${cls}">${passos.map((p, i) => `<li class="sobe"><span class="passo-ic">${ic(p[2])}</span><b>0${i + 1}</b><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol>`;
const origensLista = () => `<ul class="origens">${origens.map(o => `<li class="sobe"><figure>${img(o.foto, o.t)}</figure><h3>${o.t}</h3><p>${o.d}</p></li>`).join('')}</ul>`;
const valoresLista = () => `<ul class="valores">${valores.map(x => `<li><b>${x[0]}</b>${x}</li>`).join('')}</ul>`;
const equipe = v => `<section class="equipe"><div class="in equipe-in"><div><p class="k">Para dar o suporte que sua empresa necessita</p><h2>Equipe de atendimento especializado</h2><p>A solução necessária para a sua produção, com agilidade e eficiência.</p></div><p class="bts"><a class="btn btn-claro" href="${wa()}" ${ext}>${icWa()}${E.fone2}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Outros contatos</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'A Recoplast', sobre[0]) + topo(v, 'empresa') + cab('Somos a Recoplast', 'Recuperação e comércio de plásticos', 'triagem') + `
<div class="in"><section class="texto-pag"><div>${sobre.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><figure>${img('sede', 'Sede da Recoplast na RS-118, em Sapucaia do Sul')}<figcaption>Nossa sede, na RS-118, em Sapucaia do Sul.</figcaption></figure></section>
<section class="vm"><article class="sobe"><h2>Nossa visão</h2><p>${visao}</p></article><article class="sobe"><h2>Nossa missão</h2><p>${missao}</p></article></section>
<section class="valores-sec"><header><p class="k">Nossos valores</p><h2>Os valores formam a palavra que nos move</h2></header>${valoresLista()}</section></div>
<section class="compromisso" id="compromisso"><div class="in"><header><p class="k">Compromisso</p><h2>Temos papel indispensável na economia circular</h2></header><ol class="comp-lista">${compromisso.map((c, i) => `<li class="sobe"><b>0${i + 1}</b><h3>${c[0]}</h3><p>${c[1]}</p></li>`).join('')}</ol></div></section>
` + equipe(v) + rodape(v);
  pag.produtos = head(v, 'produtos', 'Produtos', 'Resinas recicladas, virgens e off-grade, masterbatches e aditivos, aparas e sucatas plásticas. Recoplast, Sapucaia do Sul/RS.') + topo(v, 'produtos') + cab('Nossos produtos', 'Atendemos com qualidade e com variedade', 'pellets') + `
<div class="in"><section class="intro-pag"><p class="lead">O perfil consumidor de plásticos recicláveis está cada vez mais abrangente, e a Recoplast tem a marca de ser uma empresa inovadora no conceito de empresas de reciclagem. Buscamos trabalhar com organização, métodos, gerenciamento, planejamento e muito profissionalismo.</p><p>Com equipamentos de última geração, trabalhadores qualificados e as melhores matérias-primas, nossos produtos estão entre os melhores, com excelente qualidade, fazendo muita diferença para os clientes.</p></section>
<section class="prods-lista">${produtos.map(prodBloco).join('')}</section>
<section class="origens-sec"><header><p class="k">De onde vem o material</p><h2>Três origens de resíduo</h2></header>${origensLista()}</section></div>
` + equipe(v) + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', atendemos) + topo(v, 'servicos') + cab('A quem atendemos', 'Referência em matéria-prima plástica', 'fardos') + `
<div class="in"><section class="duas sobe"><figure>${img('triagem', 'Pátio de triagem de resíduos plásticos')}</figure><div><h2>Industrialização de resíduos plásticos</h2><p>${atendemos}</p><p>Nosso trabalho é criar novos e melhores destinos para os seus resíduos plásticos. Todos os processos de produção são regulamentados e comandados por profissionais capacitados. Nossa missão é ressignificar o plástico, e seu tratamento faz parte deste caminho.</p><p class="bts"><a class="btn" href="${wa('Olá! Minha empresa tem resíduo plástico e quero saber da coleta.')}" ${ext}>${icWa()}Destinar meu resíduo</a></p></div></section>
<section class="passos-sec"><header><p class="k">Como funciona</p><h2>Da coleta à resina pronta para usar</h2></header>${passosLista('passos')}</section>
<section class="origens-sec"><header><p class="k">Resíduos que recebemos</p><h2>Pós-industrial, pós-consumo e petroquímico</h2></header>${origensLista()}</section></div>
` + equipe(v) + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Recoplast: ${E.rua}, ${E.bairro}, ${E.cidade}. Telefone ${E.fone1}, WhatsApp ${E.fone2}.`) + topo(v, 'contato') + cab('Fale com a Recoplast', 'Orçamento, sugestão ou visita', 'sede') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Precisa de um orçamento?</h2><p>Preencha os campos e a mensagem abre pronta no WhatsApp. Se preferir, ligue ou mande e-mail.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Recuperação e comércio de plásticos · há quase 30 anos</p><h1>Reciclar para <em>gerar impacto</em></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Ver os produtos</a></p></div><div class="hero-a-fotos"><figure class="f1">${img('flocos', 'Flocos de plástico reciclado nas mãos', ' loading="eager" fetchpriority="high"')}</figure><figure class="f2">${img('pellets', 'Resina plástica em grãos', ' loading="eager"')}</figure><span class="selo" aria-hidden="true"><img src="/assets/img/isotipo.webp" alt="" width="155" height="160"></span></div></div></section>
<section class="in ciclo-a"><header class="tit"><p class="k">Especialistas em reciclagem</p><h2>Nosso trabalho é criar novos e melhores destinos para os seus resíduos plásticos</h2><p>Todos os processos de produção são regulamentados e comandados por profissionais capacitados.</p></header>${passosLista('passos passos-a')}</section>
<section class="mix-a"><div class="in"><header class="tit"><p class="k">Produtos</p><h2>Um amplo mix, com qualidade e variedade</h2></header><ul class="mix">${produtos.map(p => `<li class="sobe"><a href="${link(v, 'produtos')}#${p.id}"><figure>${img(p.foto, p.t)}</figure><h3>${p.t}</h3><span>${ic('seta')}</span></a></li>`).join('')}</ul></div></section>
<section class="in sobre-a"><figure>${img('triagem', 'Triagem de resíduos plásticos')}</figure><div><p class="k">Quase 30 anos</p><h2>Parceiros de fornecedores e clientes</h2><p>Com quase 30 anos de experiência, trabalhamos com muita dedicação e somos grandes parceiros de nossos fornecedores e clientes. Trabalhamos com resíduos plásticos pós-industriais, pós-consumo e petroquímicos.</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a Recoplast ${ic('seta')}</a></div></section>
<section class="in origens-sec"><header class="tit"><p class="k">Origem dos resíduos</p><h2>Três frentes de recuperação</h2></header>${origensLista()}</section>
<section class="in visita-a"><figure>${img('sede', 'Sede da Recoplast na RS-118')}</figure><div><p class="k">Venha nos visitar</p><h2>Nossa sede fica na RS‑118, em Sapucaia do Sul</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}<br>${E.horario}</p><p class="bts"><a class="btn" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Rodovia RS-118, 6874, Sapucaia do Sul RS')}" ${ext}>${ic('pin')}Abrir no GPS</a></p></div></section>
` + equipe(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${img('triagem', 'Pátio com resíduos plásticos separados para reciclagem', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Sapucaia do Sul · RS-118</p><h1>Resíduo plástico entra.<br><span>Resina pronta sai.</span></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Orçamento pelo WhatsApp</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Como funciona</a></p></div></section>
<section class="faixa-b"><div class="in"><ul><li><b>~30</b><span>anos de reciclagem</span></li><li><b>3</b><span>origens: pós-industrial, pós-consumo e petroquímico</span></li><li><b>5</b><span>linhas de produto</span></li><li><b>Coleta</b><span>na sua empresa</span></li></ul></div></section>
<section class="in fluxo-b"><header class="tit-b"><p class="k">O processo</p><h2>Três etapas, um ciclo fechado</h2></header>${passosLista('passos passos-b')}</section>
<section class="prods-b"><div class="in"><header class="tit-b"><p class="k">Produtos</p><h2>Do reciclado ao virgem, no grade que a sua produção pede</h2></header><div class="tabela-b">${produtos.map((p, i) => `<a class="linha-b sobe" href="${link(v, 'produtos')}#${p.id}"><span class="n">0${i + 1}</span><figure>${img(p.foto, p.t)}</figure><h3>${p.t}</h3><p>${p.d}</p>${ic('seta')}</a>`).join('')}</div></div></section>
<section class="in comp-b"><div><p class="k">Compromisso</p><h2>Repensar, reduzir, reutilizar, reciclar e recusar.</h2><p>Temos papel indispensável na economia circular: logística reversa, mercado consciente, responsabilidade social e preservação ambiental.</p><a class="link-seta" href="${link(v, 'empresa')}#compromisso">Nosso compromisso ${ic('seta')}</a></div><ul>${compromisso.slice(0, 4).map(c => `<li><h3>${c[0]}</h3><p>${c[1]}</p></li>`).join('')}</ul></section>
<section class="in origens-sec"><header class="tit-b"><p class="k">O que recebemos</p><h2>Resíduos de três origens</h2></header>${origensLista()}</section>
` + equipe(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Recoplast', artigo: 'da', url: E.url, lang: 'pt', cor: '#38b9a8', fundo: '#16201f', claro: '#f2f7f6',
  fonteTitulo: 'Nunito,system-ui,sans-serif', fonteTexto: '"Nunito Sans",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com o verde-água e o laranja do símbolo da Recoplast e as letras arredondadas do logo. Começa pelo lema "Reciclar para gerar impacto".', pontos: ['Coleta, processo e entrega em três passos', 'Os 5 produtos com página própria', 'Sede, visão, missão e os valores R-E-C-I-C-L-A-R'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais industrial: fundo escuro, foto do pátio de triagem e os produtos em lista técnica, para quem compra resina.', pontos: ['"Resíduo plástico entra. Resina pronta sai."', 'Números da empresa logo na abertura', 'Compromisso com a economia circular em destaque'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
