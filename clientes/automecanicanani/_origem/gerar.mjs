// Auto Mecânica Nani (Boa Vista, Novo Hamburgo/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/automecanicanani/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs automecanicanani http://www.automecanicanani.com.br/)
// Textos tirados do site atual (automecanicanani.com.br: home, empresa, serviços, fotos, localização, contato). Fotos reais do site, em webp.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Auto Mecânica Nani', curto: 'Nani', url: 'https://automecanicanani.overtus.com.br/', antigo: 'http://www.automecanicanani.com.br/',
  fone: '(51) 3594-3210', fone2: '(51) 3035-3210', email: 'silvia@automecanicanani.com.br',
  rua: 'Rua Wolfram Metzler, 236', bairro: 'Boa Vista', cidade: 'Novo Hamburgo/RS',
};
const areas = [
  { ic: 'chave', t: 'Mecânica em geral', d: 'Mecânica especializada em veículos nacionais e importados.', f: 'elevadores' },
  { ic: 'medidor', t: 'Injeção eletrônica', d: 'Somos especializados em reparo e manutenção de injeção eletrônica.', f: 'box' },
  { ic: 'sol', t: 'Auto elétrica', d: 'Troca de lâmpadas, alternadores, motor de arranque e scanner computadorizado.', f: 'galpao' },
  { ic: 'disco', t: 'Suspensão', d: 'Realizamos a troca de amortecedores, molas, bandejas, batentes e outros serviços.', f: 'carro' },
];
const lista = [
  ['Reforma de motores', ''], ['Suspensão', ''], ['Freio', ''], ['Injeção eletrônica', ''], ['Troca de embreagem', ''],
  ['Troca de correia dentada', 'Evita quebra de motor'], ['Troca de água do motor', 'Evita corrosão'], ['Diagnóstico computadorizado', ''],
];
const injecao = [
  'A Auto Mecânica Nani é especializada em serviços de reparo e manutenção do sistema de injeção eletrônica automotivo.',
  'A injeção eletrônica é um sistema de alimentação de combustível e gerenciamento eletrônico do motor de um automóvel. Esse sistema permite um controle mais eficaz da mistura admitida pelo motor, o que se traduz em maior economia de combustível, já que o motor trabalha sempre com a mistura adequada, e também melhora o desempenho do motor.',
  'Faça a revisão do sistema de injeção eletrônica e a regulagem do motor do seu veículo na Mecânica Nani.',
];
const suspensao = [
  'A suspensão é um sistema presente nos veículos, responsável por absorver as irregularidades do terreno e manter todas as rodas no chão.',
  'Realizamos a troca de amortecedores, molas, bandejas, batentes e outros serviços. Tudo para que seu veículo tenha uma direção segura.',
];
const empresa = [
  { t: 'Nossa missão', d: 'Contribuir no desenvolvimento da região do Vale dos Sinos, e em particular do município de Novo Hamburgo, por meio da prestação de serviços mecânicos, auxiliando a sociedade com a geração de empregos e os órgãos públicos com o recolhimento de tributos e encargos sociais. A empresa também se sente responsável pelo meio ambiente e, por isso, utiliza técnicas não poluentes para a preservação da natureza.' },
  { t: 'Nosso objetivo', d: 'Buscar o bem-estar de nossos clientes, para melhor satisfazê-los em suas necessidades econômicas, pessoais e sociais.' },
  { t: 'Nosso preço', d: 'O nosso preço é aquele que cobre os custos e deixa uma margem adequada de retorno para a empresa. Cobramos preços justos, nem mais, nem menos.' },
];
const diferencial = ['Toda a infraestrutura montada', 'Localização em ponto estratégico, para melhor atender e oferecer conforto aos clientes', 'Mais de 30 anos de experiência no mercado'];
const fotos = {
  fachada: 'A fachada da Auto Mecânica Nani, na Rua Wolfram Metzler, 236',
  galpao: 'O galpão, com carros em atendimento nos elevadores',
  elevadores: 'Os elevadores do galpão',
  box: 'Carros nos elevadores',
  carro: 'O carro da Nani, com a marca nas portas',
  recepcao: 'O escritório, de frente para o galpão',
  balcao: 'Escritório e prateleiras de peças',
  escritorio: 'O escritório da oficina',
};
const copa = ['copa6', 'copa1', 'copa3', 'copa5', 'copa9', 'copa2', 'copa4', 'copa7', 'copa8', 'capacete', 'box-copa', 'piloto'];
const legCopa = 'Copa Peugeot 2011, última etapa';
const tam = n => n.startsWith('copa') || ['capacete', 'box-copa', 'piloto'].includes(n) ? [800, 533] : [800, 600];
const alt = n => fotos[n] || legCopa;
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt(n))}" width="${tam(n)[0]}" height="${tam(n)[1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt(n))}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'fotos', nome: 'Fotos' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Galpão', b: 'Hexágono' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Asap+Condensed:ital,wght@0,600;0,800;1,800&family=Commissioner:wght@400;500;600&family=Bebas+Neue&family=Overpass:wght@400;600;700&display=swap';
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#373435', b: '#ed3237' };
const tel = telHref(E.fone), tel2 = telHref(E.fone2);
const mapsQ = encodeURIComponent('Rua Wolfram Metzler, 236, Boa Vista, Novo Hamburgo RS');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const hex = (cls = 'hex') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8.7 5v10L12 22l-8.7-5V7z" fill="currentColor"/></svg>`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Nacionais e importados em Novo Hamburgo` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnTel = (txt = E.fone, cls = 'btn') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;

const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefones</strong><a href="${tel}">${E.fone}</a><a href="${tel2}">${E.fone2}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, bairro ${E.bairro}</span><span>${E.cidade}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Auto Mecânica Nani na Rua Wolfram Metzler, 236" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const form = () => `<form class="form" data-email="${E.email}" data-assunto="Contato pelo site da Auto Mecânica Nani" novalidate>
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>E-mail<input name="email" type="email" autocomplete="email"></label><label>Cidade<input name="cidade" autocomplete="address-level2"></label></div>
  <label>Mensagem*<textarea name="mensagem" rows="5" required placeholder="Carro, ano e o que precisa ser feito"></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar por e-mail</button>
  <p class="form-nota">O envio abre o seu programa de e-mail com a mensagem pronta. Se preferir, ligue: ${E.fone}.</p>
</form>`;

function topo(v, slug) {
  const logo = v === 'b' ? 'logo-claro' : 'logo';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Auto Mecânica Nani, página inicial"><img src="/assets/${logo}.webp" alt="Nani Multimarcas" width="900" height="214"></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Nani Multimarcas" width="900" height="214" loading="lazy"><p>Mecânica em geral, injeção eletrônica, auto elétrica e suspensão para carros nacionais e importados, no bairro Boa Vista, em Novo Hamburgo.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<span><a href="${tel}">${E.fone}</a><br><a href="${tel2}">${E.fone2}</a></span></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}</span></li>
    </ul><p class="cartoes">Aceitamos Visa e Mastercard</p></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Auto Mecânica Nani. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua tel-flutua" href="${tel}" aria-label="Ligar para a Auto Mecânica Nani">${ic('tel')}</a>
</body>
</html>
`;
}

const listaServ = () => `<ol class="lista-serv">${lista.map((s, i) => `<li class="sobe"><span class="n">${String(i + 1).padStart(2, '0')}</span><b>${s[0]}</b>${s[1] ? `<small>${s[1]}</small>` : ''}</li>`).join('')}</ol>`;
const galCopa = (cls = '') => `<div class="g-copa ${cls}">${copa.map((f, i) => `<figure class="sobe c${i + 1}">${foto(f)}</figure>`).join('')}</div>`;

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Empresa', 'Missão, objetivo e preço justo: a Auto Mecânica Nani atende Novo Hamburgo e o Vale dos Sinos há mais de 30 anos, com infraestrutura própria no bairro Boa Vista.') + topo(v, 'empresa') + cab('Empresa', 'Preço justo, nem mais, nem menos', 'fachada') + `
<div class="in">
<section class="emp-pag">${empresa.map((d, i) => `<article class="sobe"><p class="n">0${i + 1}</p><h2>${d.t}</h2><p>${d.d}</p></article>`).join('')}</section>
<section class="dif-pag"><div class="dif-txt"><p class="k">Nosso diferencial</p><h2>Alta qualidade, bom atendimento e preço justo</h2><p>Porque a Nani tem:</p><ul class="lista-hex">${diferencial.map(d => `<li>${hex()}<span>${d}</span></li>`).join('')}</ul></div><div class="dif-fotos">${foto('galpao', 'd1')}${foto('recepcao', 'd2')}</div></section>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Reforma de motores, injeção eletrônica, auto elétrica, suspensão, freio, embreagem, correia dentada, troca de água do motor e diagnóstico computadorizado. Nacionais e importados.') + topo(v, 'servicos') + cab('Serviços', 'Especializada em nacionais e importados', 'box') + `
<div class="in">
<section class="serv-pag"><div><p class="k">O que fazemos</p><h2>Do motor à suspensão</h2><p>Atendemos carros nacionais e importados, com diagnóstico computadorizado.</p></div>${listaServ()}</section>
<section class="det-pag" id="injecao"><figure>${foto('elevadores')}</figure><div><p class="k">Injeção eletrônica</p><h2>Mais economia e mais desempenho</h2>${injecao.map(p => `<p>${p}</p>`).join('')}</div></section>
<section class="det-pag inv" id="eletrica"><figure>${foto('galpao')}</figure><div><p class="k">Auto elétrica</p><h2>Lâmpadas, alternador e motor de arranque</h2><p>Troca de lâmpadas, alternadores, motor de arranque e scanner computadorizado.</p></div></section>
<section class="det-pag" id="suspensao"><figure>${foto('carro')}</figure><div><p class="k">Suspensão</p><h2>Todas as rodas no chão</h2>${suspensao.map(p => `<p>${p}</p>`).join('')}</div></section>
<p class="cta-linha">${btnTel('Ligar para agendar')}${btnMapa()}</p>
</div>
` + rodape(v);
  pag.fotos = head(v, 'fotos', 'Fotos', 'Fotos da Auto Mecânica Nani em Novo Hamburgo: fachada, galpão, elevadores e escritório. E a marca Nani na última etapa da Copa Peugeot 2011.') + topo(v, 'fotos') + cab('Fotos', 'Por dentro da oficina', 'elevadores') + `
<div class="in">
<section class="g-oficina">${['fachada', 'galpao', 'elevadores', 'box', 'carro', 'recepcao', 'balcao', 'escritorio'].map((f, i) => `<figure class="sobe o${i + 1}">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<section class="copa-pag"><header class="tit"><p class="k">Nas pistas</p><h2>Última etapa da Copa Peugeot 2011</h2><p>Fotos publicadas pela Nani, com a marca nos carros da prova.</p></header>${galCopa()}</section>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Auto Mecânica Nani: ${E.rua}, bairro Boa Vista, Novo Hamburgo/RS. Telefones ${E.fone} e ${E.fone2}. E-mail ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Nani', 'fachada') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}<p class="bts">${btnTel('Ligar agora')}${btnMapa()}</p><h2 class="form-tit">Envie uma mensagem</h2>${form()}</div><div>${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${hex()}${k}</p><h1>${t}</h1></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Auto Mecânica Nani, em Novo Hamburgo: mecânica em geral, injeção eletrônica, auto elétrica e suspensão para nacionais e importados. Rua Wolfram Metzler, 236, Boa Vista.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">${hex()}Novo Hamburgo · Boa Vista</p><h1>Nacionais e importados, <em>no mesmo galpão</em></h1><p>Mecânica em geral, injeção eletrônica, auto elétrica e suspensão. Há mais de 30 anos atendendo Novo Hamburgo e o Vale dos Sinos, com infraestrutura própria e preço justo.</p>
  <p class="bts">${btnTel()}${btnMapa()}</p></div>
  <figure class="hero-a-foto">${foto('galpao')}<figcaption>${fotos.galpao}</figcaption></figure>
</div></section>
<section class="faixa-a"><div class="in"><ul>
  <li><b>30+</b><span>anos de experiência</span></li>
  <li><b>4</b><span>áreas: mecânica, injeção, elétrica e suspensão</span></li>
  <li><b>236</b><span>Rua Wolfram Metzler, bairro Boa Vista</span></li>
</ul></div></section>
<section class="in areas-a"><header class="tit"><p class="k">${hex()}Serviços</p><h2>O que a Nani faz</h2></header>
<div class="areas-a-grade">${areas.map((a, i) => `<article class="area-a sobe"><span class="hx">${hex()}<b>${i + 1}</b></span><h3>${a.t}</h3><p>${a.d}</p></article>`).join('')}</div>
<a class="link-seta" href="${link(v, 'servicos')}">Todos os serviços ${ic('seta')}</a></section>
<section class="oficina-a"><div class="in oficina-a-in"><div class="oficina-a-fotos">${foto('fachada', 'o1')}${foto('elevadores', 'o2')}${foto('recepcao', 'o3')}</div><div><p class="k">${hex()}A empresa</p><h2>Preço justo, nem mais, nem menos</h2><p>${empresa[2].d}</p><ul class="lista-hex">${diferencial.map(d => `<li>${hex()}<span>${d}</span></li>`).join('')}</ul><a class="link-seta" href="${link(v, 'empresa')}">Conheça a empresa ${ic('seta')}</a></div></div></section>
<section class="in lista-a"><div><p class="k">${hex()}Lista completa</p><h2>Do motor à suspensão</h2><p>Especializada em nacionais e importados, com diagnóstico computadorizado.</p></div>${listaServ()}</section>
<section class="copa-a"><div class="in copa-a-in"><div><p class="k">${hex()}Nas pistas</p><h2>A marca Nani na Copa Peugeot 2011</h2><a class="link-seta" href="${link(v, 'fotos')}">Ver as fotos ${ic('seta')}</a></div><div class="copa-a-fotos">${foto('copa6')}${foto('copa1')}${foto('capacete')}</div></div></section>
<section class="in cta-a"><div><h2>Traga seu carro para a Nani</h2><p>${E.rua}, bairro ${E.bairro}, ${E.cidade}. Telefones ${E.fone} e ${E.fone2}.</p></div><p class="bts">${btnTel()}${btnMapa()}</p></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b f-${f}">${img(f, ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', 'Auto Mecânica Nani, Novo Hamburgo/RS: reforma de motores, injeção eletrônica, auto elétrica, suspensão, freio e embreagem. Nacionais e importados. Telefone (51) 3594-3210.') + topo(v, 'index') + `
<section class="hero-b"><div class="hero-b-foto">${img('elevadores', ' loading="eager" fetchpriority="high"')}</div><div class="in hero-b-in"><div class="hero-b-box">
  <p class="k">Auto Mecânica Nani · Novo Hamburgo</p><h1>Mecânica para nacionais e importados</h1><p>Do motor à suspensão, com diagnóstico computadorizado e preço justo. Rua Wolfram Metzler, 236, bairro Boa Vista.</p>
  <p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div></div></section>
<section class="areas-b"><div class="in"><ol class="areas-b-lista">${areas.map((a, i) => `<li class="sobe"><span class="hxb">${hex()}<b>0${i + 1}</b></span><div><h2>${a.t}</h2><p>${a.d}</p></div></li>`).join('')}</ol></div></section>
<section class="in emp-b"><figure>${foto('fachada')}</figure><div><p class="k">Mais de 30 anos</p><h2>Infraestrutura montada, ponto estratégico</h2><p>${empresa[0].d}</p><a class="link-seta" href="${link(v, 'empresa')}">Missão, objetivo e preço ${ic('seta')}</a></div></section>
<section class="preco-b"><div class="in preco-b-in"><p class="k">Nosso preço</p><blockquote>Cobramos preços justos, nem mais, nem menos.</blockquote></div></section>
<section class="in lista-b"><header class="tit"><p class="k">Serviços</p><h2>Tudo o que o seu carro precisa</h2></header>${listaServ()}</section>
<section class="copa-b"><div class="in"><header class="tit tit-claro"><p class="k">Nas pistas</p><h2>Copa Peugeot 2011</h2><p>A marca Nani nos carros da última etapa.</p></header>${galCopa('g-copa-b')}<a class="link-seta claro" href="${link(v, 'fotos')}">Todas as fotos ${ic('seta')}</a></div></section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>Ligue e agende</h2><p>${E.fone} · ${E.fone2} · ${E.email}</p></div><p class="bts">${btnTel()}${btnMapa('btn btn-linha')}</p></div></section>
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
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#ed3237', fundo: '#2b2829', claro: '#f1f2f2',
  fonteTitulo: "'Asap Condensed',system-ui,sans-serif", fonteTexto: "'Commissioner',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, no cinza do piso e no grafite e vermelho da marca, com o hexágono do logo marcando as seções. Abre com o galpão e os elevadores e mostra as quatro áreas de serviço logo no início.', pontos: ['Quatro áreas de serviço em destaque', 'Preço justo e diferenciais da empresa', 'Copa Peugeot 2011 na página inicial'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais forte: foto dos elevadores em tela cheia, títulos altos de letreiro e faixas em grafite e vermelho. Serviços numerados em hexágonos e uma faixa com a frase do preço justo.', pontos: ['"Nem mais, nem menos" em destaque', 'Serviços numerados de 01 a 04', 'Galeria da Copa Peugeot 2011'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
