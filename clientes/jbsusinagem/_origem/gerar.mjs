// JBS Soluções em Usinagem (Sapucaia do Sul/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/jbsusinagem/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs jbsusinagem https://jbsusinagem.com.br/)
// Textos do site atual (WordPress, tema Spacious). Fotos: portfólio do próprio cliente (wp-json/wp/v2/media), convertidas em webp.
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'JBS Soluções em Usinagem', url: 'https://jbsusinagem.overtus.com.br/', antigo: 'https://jbsusinagem.com.br/',
  wa: '5551995979781', wa2: '5551998987466', fone1: '(51) 99597-9781', fone2: '(51) 99898-7466', insta: 'jbssolucoesemusinagem',
  rua: 'Rua Delfim Moreira, 395', bairro: 'Dihel', cidade: 'Sapucaia do Sul - RS', cep: '93210-070',
  curto: 'Ferramentaria, usinagem sob encomenda e produção de peças seriadas, metálicas e não metálicas, a partir do projeto do cliente. Sapucaia do Sul/RS.',
};
const sobre = [
  'A JBS Soluções em Usinagem fica em Sapucaia do Sul, na Rua Delfim Moreira, 395, bairro Dihel, numa área de 460 metros quadrados. A empresa começou em 27 de julho de 2024 e, em 11 de outubro de 2024, iniciou a formação da área fabril com a aquisição de diversas máquinas e ferramentas novas.',
  'Hoje somos uma empresa especializada em ferramentaria, prestação de serviço e produção de peças seriadas, buscando sempre criatividade, inovação, aperfeiçoamento técnico e tecnológico, e soluções com foco no aumento da produtividade, redução de custos, qualidade e competitividade para os nossos clientes.',
  'Entendemos que superar as expectativas é primordial para o sucesso. Por isso valorizamos a confiança, o respeito e os valores de nossos clientes.',
];
const desenvolvimento = 'Desenvolvimento de produtos e peças dos nossos clientes, metálicas e não metálicas, com equipe especializada. A prioridade é o menor tempo de execução em todos os processos, com máquinas e ferramentas de última geração, para o mais alto padrão de qualidade e produtividade.';
const pilares = [
  { t: 'Produtividade', foto: 'serie-aco', d: 'Com grande experiência na área, garantimos precisão e qualidade nas peças usinadas, sempre considerando o menor tempo de execução, com materiais adequados e equipamentos de melhor desempenho.' },
  { t: 'Qualidade', foto: 'flange-polida', d: 'Levamos os planos de controle dimensional rigorosamente a sério em todos os nossos processos de usinagem, tanto em peças seriadas quanto em projetos especiais.' },
  { t: 'Processo', foto: 'fresamento-cnc', d: 'Em nossos processos contamos com máquinas, ferramentas e instrumentos de ponta para a confecção de qualquer projeto ou demanda.' },
  { t: 'Equipe profissional', foto: 'torno', d: 'Uma equipe que abraça os projetos dos clientes, acredita que cada contribuição é significativa e dá o melhor de si, com qualidade, competência e excelência, compartilhando valores de confiança, respeito e apoio.' },
];
const servicos = [
  { id: 'ferramentaria', t: 'Ferramentaria', foto: 'morsa', d: 'Dispositivos, morsas, placas e peças de ferramental feitos sob medida para a sua produção.', ex: ['morsa-2', 'placas', 'blocos-v'] },
  { id: 'sob-encomenda', t: 'Usinagem sob encomenda', foto: 'disco-raiado', d: 'Desenvolvimento de peças a partir do desenho ou da amostra do cliente, em metais e materiais não metálicos.', ex: ['peca-usinada', 'flange-dupla', 'tubo-roscado'] },
  { id: 'seriadas', t: 'Peças seriadas', foto: 'serie-latao', d: 'Produção em série com controle dimensional em todos os processos, do primeiro ao último lote.', ex: ['buchas-bronze', 'pinos', 'parafusos'] },
  { id: 'projetos-especiais', t: 'Projetos especiais', foto: 'carcaca', d: 'Carcaças, mancais, flanges e componentes únicos, com o mesmo controle das peças seriadas.', ex: ['mancais', 'carcacas', 'flanges'] },
];
const galeria = [
  ['disco-raiado', 'Disco com rasgos radiais usinado em alumínio'], ['disco-raiado-2', 'Disco usinado, vista de cima'], ['flange-polida', 'Flange polida na placa'], ['peca-placa-torno', 'Peça presa na placa do torno'],
  ['fresamento-cnc', 'Fresamento em centro de usinagem CNC'], ['mesa-cnc', 'Peça na mesa do centro de usinagem'], ['torno', 'Peça de grande diâmetro no torno'], ['flanges', 'Flanges usinadas'],
  ['buchas-bronze', 'Lote de buchas de bronze'], ['eixos', 'Eixos retificados'], ['blocos-aluminio', 'Blocos de alumínio usinados'], ['peca-usinada', 'Peça usinada em alumínio'],
  ['pinos', 'Pinos usinados'], ['carcaca', 'Carcaça usinada em aço'], ['carcacas', 'Carcaças usinadas'], ['suportes', 'Lote de suportes'],
  ['buchas-flange', 'Buchas com flange'], ['placas', 'Placas furadas'], ['morsa', 'Morsa de usinagem'], ['morsa-2', 'Morsa, vista de cima'],
  ['parafusos', 'Parafusos especiais'], ['buchas', 'Buchas e tampas usinadas'], ['blocos', 'Blocos com furação'], ['cilindros', 'Cilindros usinados'],
  ['serie-aco', 'Série de peças em aço'], ['serie-latao', 'Série de peças em latão'], ['flange-dupla', 'Flange dupla usinada'], ['mancais', 'Mancais usinados'],
  ['tubo-roscado', 'Tubo roscado com flange'], ['blocos-v', 'Blocos em V'], ['conjunto-pecas', 'Conjunto de peças usinadas'],
];
const alt = n => (galeria.find(g => g[0] === n) || [n, ''])[1];

const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'portfolio', nome: 'Portfólio' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Bancada', b: 'Preto e Ouro' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Raleway:wght@600;700;800&family=Source+Sans+3:wght@400;600;700&family=Saira:wght@500;600;700;800&family=Archivo:wght@400;500;600&display=swap';
const img = (n, a = alt(n), extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da JBS e gostaria de um orçamento de usinagem.') => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#111111', b: '#0d0d0d' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Usinagem e ferramentaria em Sapucaia do Sul` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>Serviço<select name="servico">${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Outro</option></select></label></div>
  <div class="form-duas"><label>Material<input name="material" placeholder="Aço, alumínio, latão, bronze, plástico..."></label><label>Quantidade<input name="quantidade" inputmode="numeric" placeholder="Ex.: 1 peça, 500 peças"></label></div>
  <label>Descreva a peça<textarea name="mensagem" rows="3" placeholder="Medidas, tolerâncias, prazo. Se tiver desenho, mande pelo WhatsApp depois."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.fone1}</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa2, 'Olá! Vim pelo site da JBS e gostaria de um orçamento de usinagem.')}" ${ext}>${E.fone2}</a></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="https://www.instagram.com/${E.insta}/" ${ext}>@${E.insta}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da JBS Soluções em Usinagem" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Delfim Moreira, 395, Dihel, Sapucaia do Sul RS')}&z=16&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/${v === 'a' ? 'logo' : 'logo-claro'}.webp" alt="JBS Soluções em Usinagem" width="600" height="242"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="JBS Soluções em Usinagem" width="600" height="242" loading="lazy"><p>Ferramentaria, usinagem sob encomenda e peças seriadas em Sapucaia do Sul/RS.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.fone1}</a></li>
      <li>${icWa()}<a href="${waHref(E.wa2)}" ${ext}>${E.fone2}</a></li>
      <li>${ic('insta')}<a href="https://www.instagram.com/${E.insta}/" ${ext}>@${E.insta}</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} JBS Soluções em Usinagem Ltda. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const servicoBloco = (s, i) => `<article class="serv sobe" id="${s.id}"><figure class="serv-foto">${img(s.foto)}</figure><div class="serv-txt"><p class="serv-n">0${i + 1}</p><h2>${s.t}</h2><p>${s.d}</p><ul class="serv-ex">${s.ex.map(n => `<li><a href="/assets/img/${n}.webp" data-foto="${esc(alt(n))}">${img(n)}</a></li>`).join('')}</ul><a class="link-seta" href="${wa(`Olá! Vim pelo site e quero orçamento de ${s.t.toLowerCase()}.`)}" ${ext}>Pedir orçamento ${ic('seta')}</a></div></article>`;
const pilaresLista = () => `<ul class="pilares">${pilares.map((p, i) => `<li class="sobe"><figure>${img(p.foto)}</figure><div><b>0${i + 1}</b><h3>${p.t}</h3><p>${p.d}</p></div></li>`).join('')}</ul>`;
const grade = (lista = galeria) => `<ul class="galeria">${lista.map(g => `<li><a href="/assets/img/${g[0]}.webp" data-foto="${esc(g[1])}">${img(g[0], g[1])}</a></li>`).join('')}</ul>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Tem um desenho ou uma amostra?</h2><p>Mande pelo WhatsApp com material e quantidade. A gente responde com prazo e orçamento.</p></div><p class="bts"><a class="btn btn-ouro" href="${wa()}" ${ext}>${icWa()}${E.fone1}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Outros contatos</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Empresa', sobre[0]) + topo(v, 'empresa') + cab('Sobre a empresa', 'Usinagem com controle, do desenho à peça pronta', 'torno') + `
<div class="in"><section class="texto-pag"><div>${sobre.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><figure>${img('fresamento-cnc')}<figcaption>Fresamento em centro de usinagem CNC.</figcaption></figure></section>
<section class="numeros"><ul><li><b>460 m²</b><span>de área em Sapucaia do Sul</span></li><li><b>2024</b><span>início da empresa e da área fabril</span></li><li><b>Metálicas</b><span>e não metálicas</span></li><li><b>Série</b><span>e projetos especiais</span></li></ul></section>
<section class="pilares-sec"><header class="tit"><p class="k">Como trabalhamos</p><h2>Quatro compromissos em cada peça</h2></header>${pilaresLista()}</section></div>
` + cta(v) + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Ferramentaria, usinagem sob encomenda, peças seriadas e projetos especiais em Sapucaia do Sul/RS.') + topo(v, 'servicos') + cab('Serviços', 'Ferramentaria, peças sob encomenda e produção seriada', 'serie-aco') + `
<div class="in"><section class="intro-pag"><p class="lead">${desenvolvimento}</p></section>
<section class="servs">${servicos.map(servicoBloco).join('')}</section></div>
` + cta(v) + rodape(v);
  pag.portfolio = head(v, 'portfolio', 'Portfólio', 'Peças usinadas pela JBS: flanges, buchas, eixos, carcaças, mancais, morsas e peças seriadas em aço, alumínio, latão e bronze.') + topo(v, 'portfolio') + cab('Portfólio', 'Peças que saíram da nossa usinagem', 'buchas-bronze') + `
<div class="in"><section class="portf"><p class="portf-nota">Fotos reais da produção da JBS. Clique para ampliar.</p>${grade()}</section></div>
` + cta(v) + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `JBS Soluções em Usinagem: ${E.rua}, ${E.bairro}, ${E.cidade}. WhatsApp ${E.fone1} e ${E.fone2}.`) + topo(v, 'contato') + cab('Contato', 'Peça seu orçamento', 'mesa-cnc') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Orçamento de usinagem</h2><p>Preencha e a mensagem abre pronta no WhatsApp. Depois é só anexar o desenho ou a foto da peça.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, alt(foto), ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Usinagem · Ferramentaria · Peças seriadas</p><h1>Sua peça, do desenho ao lote.</h1><p>${desenvolvimento}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'portfolio')}">Ver o portfólio</a></p></div><div class="hero-a-fotos"><figure class="f1">${img('disco-raiado', alt('disco-raiado'), ' loading="eager" fetchpriority="high"')}</figure><figure class="f2">${img('flange-polida', alt('flange-polida'), ' loading="eager"')}</figure><figure class="f3">${img('buchas-bronze', alt('buchas-bronze'), ' loading="eager"')}</figure></div></div></section>
<section class="faixa-a"><div class="in"><ul><li>Ferramentaria</li><li>Usinagem sob encomenda</li><li>Peças seriadas</li><li>Projetos especiais</li><li>Metálicas e não metálicas</li></ul></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>O que fazemos</h2></header><div class="cards">${servicos.map(s => `<a class="card sobe" href="${link(v, 'servicos')}#${s.id}"><figure>${img(s.foto)}</figure><div><h3>${s.t}</h3><p>${s.d}</p></div></a>`).join('')}</div></section>
<section class="oficina-a"><div class="in oficina-in"><figure>${img('torno')}</figure><div><p class="k">A empresa</p><h2>460 m² de área fabril em Sapucaia do Sul</h2><p>${sobre[0]}</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a JBS ${ic('seta')}</a></div></div></section>
<section class="in pilares-sec"><header class="tit"><p class="k">Como trabalhamos</p><h2>Produtividade, qualidade, processo e equipe</h2></header>${pilaresLista()}</section>
<section class="in portf-a"><header class="tit tit-linha"><div><p class="k">Portfólio</p><h2>Peças reais da nossa produção</h2></div><a class="link-seta" href="${link(v, 'portfolio')}">Ver todas as ${galeria.length} fotos ${ic('seta')}</a></header>${grade(galeria.slice(0, 8))}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div class="hero-b-txt"><p class="k">Sapucaia do Sul · RS</p><h1>Usinagem de precisão, <span>peça por peça.</span></h1><p>${E.curto}</p><p class="bts"><a class="btn btn-ouro" href="${wa()}" ${ext}>${icWa()}Orçamento pelo WhatsApp</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Serviços</a></p></div><figure class="hero-b-foto">${img('disco-raiado-2', alt('disco-raiado-2'), ' loading="eager" fetchpriority="high"')}</figure></div></section>
<section class="faixa-b"><div class="in"><ul><li><b>460 m²</b><span>de área fabril</span></li><li><b>4</b><span>frentes: ferramentaria, sob encomenda, série e especiais</span></li><li><b>${galeria.length}</b><span>fotos de peças reais no portfólio</span></li><li><b>2024</b><span>início da área fabril, com máquinas novas</span></li></ul></div></section>
<section class="in servs-b"><header class="tit"><p class="k">Serviços</p><h2>Quatro frentes de trabalho</h2></header><div class="lista-b">${servicos.map((s, i) => `<a class="item-b sobe" href="${link(v, 'servicos')}#${s.id}"><span class="n">0${i + 1}</span><h3>${s.t}</h3><p>${s.d}</p><figure>${img(s.foto)}</figure></a>`).join('')}</div></section>
<section class="mosaico-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Portfólio</p><h2>O que sai da nossa máquina</h2></div><a class="link-seta" href="${link(v, 'portfolio')}">Portfólio completo ${ic('seta')}</a></header><ul class="mosaico">${['peca-usinada', 'serie-latao', 'eixos', 'flanges', 'carcaca', 'mancais', 'pinos'].map((n, i) => `<li class="m${i + 1}"><a href="/assets/img/${n}.webp" data-foto="${esc(alt(n))}">${img(n)}</a></li>`).join('')}</ul></div></section>
<section class="in pilares-sec"><header class="tit"><p class="k">Como trabalhamos</p><h2>Controle dimensional em todo processo</h2></header>${pilaresLista()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'JBS Usinagem', artigo: 'da', url: E.url, lang: 'pt', cor: '#c9a24a', fundo: '#111111', claro: '#f4f2ee',
  fonteTitulo: 'Raleway,system-ui,sans-serif', fonteTexto: '"Source Sans 3",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com o preto e o dourado do logo e as fotos reais das peças da JBS em destaque. Direta para quem precisa de orçamento.', pontos: ['"Sua peça, do desenho ao lote."', 'Os 4 serviços com fotos de peças feitas', 'Portfólio com 31 fotos ampliáveis'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Fundo preto com detalhes em dourado, como o logo. Mais impacto visual: mosaico de peças e números da empresa logo na abertura.', pontos: ['"Usinagem de precisão, peça por peça."', 'Mosaico de peças ampliável', 'Orçamento com material e quantidade'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
