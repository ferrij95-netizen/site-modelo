// Route 66 Super Oil Change (Vila São José, Ipiranga, São Paulo). Gera public/{a,b}/ e a página de escolha.
// node clientes/route66soc/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs route66soc http://www.route66soc.com.br/)
// Textos tirados do site atual (route66soc.com.br). Única foto do site: a loja (imgUpload/Imagemdefundo_ID_2317.jpg), recortada em detalhes.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Route 66 Super Oil Change', curto: 'Route 66', url: 'https://route66soc.overtus.com.br/', antigo: 'http://www.route66soc.com.br/',
  fone: '(11) 2272-1362',
  rua: 'R. da Imprensa, 269', bairro: 'Vila São José, Ipiranga', cidade: 'São Paulo/SP', cep: '04265-000',
  horario: 'Segunda a sexta, das 8h às 18h. Sábados, das 8h às 14h',
};
const servicos = [
  { ic: 'filtro', t: 'Troca de filtros', nota: 'Carros e motos', itens: ['Ar', 'Combustível', 'Cabine', 'Separador', 'Ar-condicionado'] },
  { ic: 'oleo', t: 'Troca de óleo', nota: 'Carros e motos', itens: ['Motor', 'Transmissão', 'Direção', 'Freios'] },
  { ic: 'chave', t: 'Outros serviços', nota: 'Atendimento completo', itens: ['Limpeza do radiador', 'Higienização do ar-condicionado', 'Graxa e lubrificação em geral', 'Extintores', 'Lâmpadas automotivas', 'Tampas'] },
];
const produtos = [
  ['Óleos', 'Minerais, semissintéticos e sintéticos, para carros nacionais e importados.'],
  ['Filtros', 'Para carros nacionais e importados.'],
];
const conforto = ['Café', 'Internet sem fio', 'Televisão', 'Revistas atuais e jornal do dia', 'Banheiros masculino e feminino', 'Bebidas para consumo'];
const diferenciais = [
  { t: 'Limpeza', d: 'É difícil acreditar que está em uma troca de óleo. Não se vê uma gota de óleo no chão, os funcionários são uniformizados e as ferramentas, modernas e organizadas.' },
  { t: 'Ambiente temático', d: 'Antiguidades totalmente reformadas decoram a Route 66 Super Oil Change. Uma viagem no tempo.' },
  { t: 'Conforto', d: 'Revistas atuais e jornal do dia, internet sem fio, televisão, banheiros masculino e feminino e bebidas para consumo.' },
  { t: 'Atendimento personalizado', d: 'Equipe especializada para receber e atender você como merece. Venha tomar um café e ficar à vontade enquanto cuidamos do seu veículo.' },
];
const revisao = ['Abastecimento de água do para-brisa', 'Abastecimento de água do radiador', 'Lubrificação de portas e dobradiças', 'Revisão dos extintores, tampas e lâmpadas', 'Verificação dos níveis de óleo da direção, freio e câmbio', 'Calibragem'];
const tanque = 'Seguindo as obrigações para contribuir com a preservação ambiental, todo óleo recolhido vai para um tanque certificado pela Cetesb. O sistema possui um sensor de vazamento que evita qualquer problema e, quando cheio, uma empresa especializada recolhe todo o óleo para reciclagem.';
const oleos = [
  ['Mineral 20W40', '3.000'], ['Mineral 20W50', '5.000'], ['Base sintética 15W50', '7.000'], ['Sintético 15W50', '10.000'],
];
const dicas = [
  { t: 'Troque o filtro de óleo a cada 10.000 km rodados', d: 'Durante a lubrificação, o óleo carrega impurezas geradas pelo atrito das peças, na maior parte das vezes partículas de aço que podem danificar as superfícies por onde ele passa. Como os filtros usam um material têxtil poroso, eles retêm as partículas em suspensão no lubrificante.' },
  { t: 'O tempo de troca depende do tipo de óleo', d: 'Existem diferentes tipos de óleo lubrificante. O manual do proprietário traz a especificação para cada modelo de motor, e a orientação do fabricante sobre o lubrificante deve ser seguida.' },
  { t: 'Nunca misture óleo sintético com óleo mineral', d: 'Juntos, eles podem comprometer o funcionamento do motor, pois aceleram a formação de borra. Ao completar o óleo do motor, siga rigorosamente a classificação (SH, SJ e outras) que consta no manual do veículo.' },
  { t: 'O método tradicional, por gravidade, é o mais recomendado', d: 'O ideal seria a soma dos dois métodos. Mas, na vida real, o melhor é o tradicional: soltar o parafuso do cárter. A sucção é mais prática e rápida, porém não retira todo o óleo usado do motor.' },
];
const fotos = {
  loja: 'A loja da Route 66, aberta para a R. da Imprensa', fachada: 'A entrada da loja, no nº 269 da R. da Imprensa', cafe: 'Clientes à mesa enquanto o carro é atendido',
  bomba: 'A bomba de combustível antiga, restaurada, na entrada', placas: 'Placas antigas na parede da loja',
};
const tam = { loja: [1200, 377], fachada: [1000, 910], cafe: [600, 420], bomba: [320, 660], placas: [900, 190] };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'a-loja', nome: 'A loja' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'dicas', nome: 'Dicas' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Café na oficina', b: 'Coisa séria' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Figtree:wght@400;500;600;700&family=Big+Shoulders+Display:wght@700;800;900&family=Instrument+Sans:wght@400;500;600&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n === 'loja' ? 'loja-g' : n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#ef8a1d', b: '#1b1917' };
const tel = telHref(E.fone);
const mapsQ = encodeURIComponent('R. da Imprensa, 269, Vila São José, São Paulo SP, 04265-000');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Troca de óleo no Ipiranga, São Paulo` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const icF = n => n === 'filtro' ? ic('disco') : ic(n);
const btnTel = (txt = E.fone, cls = 'btn') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;

const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>Segunda a sexta, das 8h às 18h</span><span>Sábados, das 8h às 14h</span></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, Vila São José</span><span>${E.cidade}, CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Route 66 na R. da Imprensa, 269" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Route 66 Super Oil Change, página inicial"><img src="/assets/${logo}.webp" alt="Route 66 Super Oil Change" width="840" height="220"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${tel}">${ic('tel')}<span>${E.fone}</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Route 66 Super Oil Change" width="840" height="220" loading="lazy"><p>Troca de óleo e filtros no Ipiranga, com café, internet sem fio e uma loja decorada com antiguidades restauradas.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('pin')}<span>${E.rua}, Vila São José<br>${E.cidade}, CEP ${E.cep}</span></li>
      <li>${ic('relogio')}<span>Seg. a sex., 8h–18h<br>Sáb., 8h–14h</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Route 66 Super Oil Change. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua tel-flutua" href="${tel}" aria-label="Ligar para a Route 66">${ic('tel')}</a>
</body>
</html>
`;
}

const blocoServicos = (cls = '') => `<div class="servs ${cls}">${servicos.map((s, i) => `<article class="serv sobe" id="s${i + 1}"><div class="serv-cab">${icF(s.ic)}<div><h3>${s.t}</h3><p class="nota">${s.nota}</p></div></div><ul>${s.itens.map(x => `<li>${x}</li>`).join('')}</ul></article>`).join('')}</div>`;
const tabelaOleo = () => `<table class="tab-oleo"><caption>Quando trocar, conforme o tipo de óleo</caption><thead><tr><th scope="col">Óleo</th><th scope="col">Troca a cada</th></tr></thead><tbody>${oleos.map(o => `<tr><th scope="row">${o[0]}</th><td><b>${o[1]}</b> km</td></tr>`).join('')}</tbody></table>`;
const listaRevisao = () => `<ul class="lista-check">${revisao.map(r => `<li>${ic('check')}<span>${r}</span></li>`).join('')}</ul>`;

function comum(v, pag, cab) {
  pag['a-loja'] = head(v, 'a-loja', 'A loja', 'Loja limpa, ambiente temático com antiguidades restauradas, café, internet sem fio e revisão gratuita de itens essenciais. R. da Imprensa, 269, Ipiranga.') + topo(v, 'a-loja') + cab('A loja', 'Para ser melhor do que os outros, é preciso ser diferente', 'fachada') + `
<div class="in">
<section class="dif-pag">${diferenciais.map((d, i) => `<article class="sobe"><span class="n">0${i + 1}</span><h2>${d.t}</h2><p>${d.d}</p></article>`).join('')}</section>
<section class="galeria g-loja">${['loja', 'bomba', 'cafe', 'placas'].map(f => `<figure class="sobe f-${f}">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<section class="revisao-pag"><div><p class="k">Sem custo</p><h2>Revisão gratuita</h2><p>O cuidado da Route 66 não se limita a oferecer o melhor serviço: fazemos uma revisão totalmente gratuita de itens essenciais do seu veículo.</p></div>${listaRevisao()}</section>
<section class="tanque-pag"><div class="tanque-ic">${ic('gota')}</div><div><p class="k">Lugar de óleo é no motor</p><h2>Tanques ecológicos</h2><p>${tanque}</p></div></section>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Troca de óleo de motor, transmissão, direção e freios; troca de filtros de ar, combustível, cabine e ar-condicionado; limpeza de radiador e higienização do ar-condicionado. Carros e motos.') + topo(v, 'servicos') + cab('Serviços', 'Muito além da troca de óleo e filtros', 'loja') + `
<div class="in">
<p class="intro">Oferecemos atendimento completo para os clientes. Usando sempre produtos originais e de primeira qualidade, cuidamos do seu carro com o que o mercado oferece de melhor em tecnologia.</p>
${blocoServicos('servs-pag')}
<section class="produtos"><header class="tit"><p class="k">Produtos</p><h2>As melhores marcas para o seu carro</h2><p>Toda a qualidade que você precisa para um bom desempenho no dia a dia.</p></header><div class="prod-grade">${produtos.map(p => `<article class="sobe"><h3>${p[0]}</h3><p>${p[1]}</p></article>`).join('')}</div></section>
<p class="cta-linha">${btnTel('Ligar para agendar')}${btnMapa()}</p>
</div>
` + rodape(v);
  pag.dicas = head(v, 'dicas', 'Dicas', 'Quando trocar o óleo e o filtro, por que não misturar óleo sintético com mineral e qual o melhor método de troca. Dicas da Route 66 Super Oil Change.') + topo(v, 'dicas') + cab('Dicas', 'Manutenção simples, motor mais saudável', 'placas') + `
<div class="in">
<p class="intro">Algumas dicas simples para a manutenção do veículo, como saber se é hora de trocar o óleo e o filtro.</p>
<section class="dicas-pag"><div class="dicas-lista">${dicas.map((d, i) => `<article class="dica sobe"><span class="n">${i + 1}</span><div><h2>${d.t}</h2><p>${d.d}</p></div></article>`).join('')}</div><aside>${tabelaOleo()}<p class="nota-tab">Sempre confira o manual do proprietário do seu veículo.</p></aside></section>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Route 66 Super Oil Change: ${E.rua}, Vila São José, São Paulo. Telefone ${E.fone}. Segunda a sexta, 8h às 18h; sábados, 8h às 14h.`) + topo(v, 'contato') + cab('Contato', 'Venha tomar um café com a gente', 'cafe') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}<p class="bts">${btnTel('Ligar agora')}${btnMapa()}</p><p class="contato-txt">Entre em contato. Seus comentários e sugestões são muito importantes para nós.</p></div><div>${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Troca de óleo e filtros no Ipiranga, São Paulo, numa loja limpa e decorada com antiguidades, com café e internet sem fio. R. da Imprensa, 269.') + topo(v, 'index') + `
<section class="hero-a"><div class="in">
  <div class="hero-a-txt"><p class="k">Troca de óleo no Ipiranga</p><h1>Óleo para motor e <em>colírio para os olhos</em></h1><p>Internet sem fio, um café bem forte e uma decoração impecável em cada detalhe. Na Route 66 você pode relaxar ou até trabalhar enquanto uma equipe experiente cuida do seu carro.</p>
  <p class="bts">${btnTel()}${btnMapa()}</p></div>
</div>
<figure class="hero-a-foto">${foto('loja')}</figure>
<div class="info-a"><div class="in"><ul>
  <li>${ic('pin')}<span><b>${E.rua}</b>Vila São José, Ipiranga</span></li>
  <li>${ic('relogio')}<span><b>Seg. a sex., 8h–18h</b>Sábados, 8h–14h</span></li>
  <li>${ic('tel')}<span><b>Telefone</b><a href="${tel}">${E.fone}</a></span></li>
</ul></div></div></section>
<section class="in espera-a"><div class="espera-a-fotos">${foto('cafe', 'e1')}${foto('bomba', 'e2')}</div><div><p class="k">Enquanto cuidamos do seu carro</p><h2>Não é só o seu carro que sai renovado</h2><p>Antiguidades totalmente reformadas decoram a loja. Uma viagem no tempo, com tudo isso à sua disposição:</p><ul class="conforto">${conforto.map(c => `<li>${c}</li>`).join('')}</ul><a class="link-seta" href="${link(v, 'a-loja')}">Conheça a loja ${ic('seta')}</a></div></section>
<section class="servs-a"><div class="in"><header class="tit"><p class="k">Serviços · carros e motos</p><h2>Muito além da troca de óleo</h2></header>${blocoServicos()}<a class="link-seta" href="${link(v, 'servicos')}">Todos os serviços e produtos ${ic('seta')}</a></div></section>
<section class="in revisao-a"><div><p class="k">Sem custo</p><h2>Revisão gratuita de itens essenciais</h2><p>Junto com a troca, a equipe confere o que costuma passar despercebido.</p></div>${listaRevisao()}</section>
<section class="placas-a">${img('placas')}</section>
<section class="in oleo-a"><div><p class="k">Dicas</p><h2>Cada óleo tem seu tempo</h2><p>O intervalo de troca depende do tipo de óleo. Na dúvida, siga o manual do veículo ou pergunte para a equipe.</p><a class="link-seta" href="${link(v, 'dicas')}">Mais dicas ${ic('seta')}</a></div>${tabelaOleo()}</section>
<section class="tanque-a"><div class="in tanque-a-in"><div><p class="k">Lugar de óleo é no motor</p><h2>Troca de óleo é coisa séria. Preservação ambiental também.</h2></div><p>Todo óleo recolhido vai para um tanque certificado pela Cetesb, com sensor de vazamento, e depois segue para reciclagem.</p></div></section>
<section class="in cta-a"><div><h2>Venha tomar um café e ficar à vontade</h2><p>${E.rua}, Vila São José. ${E.horario}.</p></div><p class="bts">${btnTel()}${btnMapa()}</p></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b f-${f}">${img(f, ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', 'Troca de óleo e filtros no Ipiranga, São Paulo. Tanque certificado pela Cetesb, revisão gratuita de itens essenciais e café enquanto você espera. R. da Imprensa, 269.') + topo(v, 'index') + `
<section class="hero-b">${img('loja', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in">
  <p class="k">R. da Imprensa, 269 · Ipiranga · São Paulo</p><h1>Troca de óleo<br><em>é coisa séria.</em></h1><p>Produtos originais, equipe uniformizada e uma loja sem uma gota de óleo no chão. Carros e motos.</p>
  <p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div></section>
<section class="odo-b"><div class="in"><header class="tit-b"><p class="k">Quando trocar</p><h2>Cada óleo tem seu tempo</h2></header><ol class="odo">${oleos.map(o => `<li class="sobe"><b>${o[1]}</b><span>km</span><small>${o[0]}</small></li>`).join('')}</ol><p class="odo-nota">Intervalos indicados no site da Route 66. Sempre confira o manual do seu veículo. <a href="${link(v, 'dicas')}">Ver dicas</a></p></div></section>
<section class="in servs-b"><header class="tit-b"><p class="k">Serviços</p><h2>O que fazemos</h2></header>${blocoServicos('servs-lista')}</section>
<section class="loja-b"><div class="in loja-b-in"><div class="loja-b-txt"><p class="k">A loja</p><h2>Uma viagem no tempo enquanto você espera</h2><p>Antiguidades totalmente reformadas, café, internet sem fio, televisão e jornal do dia. Dá para relaxar ou trabalhar.</p><ul class="lista-check">${diferenciais.map(d => `<li>${ic('check')}<span>${d.t}</span></li>`).join('')}</ul><a class="link-seta" href="${link(v, 'a-loja')}">Conheça a loja ${ic('seta')}</a></div><div class="loja-b-fotos">${foto('bomba', 'l1')}${foto('cafe', 'l2')}${foto('fachada', 'l3')}</div></div></section>
<section class="in duas-b"><article class="sobe"><p class="k">Sem custo</p><h2>Revisão gratuita</h2>${listaRevisao()}</article><article class="sobe"><p class="k">Cetesb</p><h2>Tanque ecológico</h2><p>${tanque}</p></article></section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>Venha tomar um café enquanto cuidamos do seu carro</h2><p>${E.horario}.</p></div><p class="bts">${btnTel()}${btnMapa()}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#ef8a1d', fundo: '#1b1917', claro: '#f6f1e8',
  fonteTitulo: "'Alfa Slab One',Georgia,serif", fonteTexto: "'Figtree',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, no laranja da loja e com títulos em serifa grossa, como a placa da fachada. Abre com a frase do site atual, "Óleo para motor e colírio para os olhos", e mostra o café e as antiguidades.', pontos: ['O conforto da espera em destaque', 'Revisão gratuita e tabela de troca de óleo', 'Telefone e endereço sempre à vista'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura, em grafite e laranja, com letras altas de letreiro. Abre na foto da loja com "Troca de óleo é coisa séria" e mostra os intervalos de troca como um hodômetro.', pontos: ['"Troca de óleo é coisa séria."', 'Intervalos de troca em números grandes', 'Tanque Cetesb e revisão gratuita lado a lado'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
