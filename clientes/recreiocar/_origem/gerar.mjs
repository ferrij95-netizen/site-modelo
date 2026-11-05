// Recreio Car (Av. das Américas, 16271, Recreio dos Bandeirantes, Rio de Janeiro). Gera public/{a,b}/ e a página de escolha.
// node clientes/recreiocar/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs recreiocar http://www.recreiocar.com.br/)
// Textos tirados do site atual (recreiocar.com.br). Fotos: as 11 fotos reais da oficina (images/recre/WhatsApp-Image-2020-03-02-*.jpeg).
// As fotos de banco dos serviços (ALINHAMENTO.jpg etc.) e o boneco de atendimento ficaram de fora.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Recreio Car', url: 'https://recreiocar.overtus.com.br/', antigo: 'http://www.recreiocar.com.br/',
  fone: '(21) 4111-4493', rua: 'Av. das Américas, 16271', bairro: 'Recreio dos Bandeirantes', cidade: 'Rio de Janeiro/RJ',
};
const sobre = 'A Recreio Car é uma oficina de serviços automotivos situada no Rio de Janeiro, no Recreio dos Bandeirantes. Conta com uma infraestrutura capaz de consertar qualquer automóvel nacional ou importado. Utilizamos tecnologia de ponta com profissionais altamente capacitados, prezando sempre pelo bom atendimento e clareza em todas as informações.';
const servicos = [
  { id: 'alinhamento', t: 'Alinhamento e balanceamento', d: 'É realizado com máquinas super modernas, por funcionários gabaritados.' },
  { id: 'lataria', t: 'Lataria e funilaria', d: 'É realizada com a troca da peça ou com a sua recuperação, sempre por funcionários gabaritados.' },
  { id: 'martelinho', t: 'Martelinho de ouro', d: 'Pequenos amassados, esbarrões de porta e outros são facilmente removidos com essa técnica artesanal, preservando a originalidade do seu automóvel.' },
  { id: 'freios', t: 'Freios automotivos', d: 'É uma das partes mais importantes do veículo. Devidamente conservado e ajustado, o freio garante ao motorista uma frenagem segura nas mais diversas condições de uso.' },
  { id: 'suspensao', t: 'Suspensão geral', d: 'É o conjunto de eixos, molas, amortecedores, rodas, caixa de direção, pivôs, terminais e outras peças. Sua função é dar estabilidade, dirigibilidade, conforto e segurança ao veículo.' },
  { id: 'eletronica', t: 'Eletrônica embarcada', d: 'Gerenciamento eletrônico do veículo. Temos sistema computadorizado de diagnóstico e análise de defeitos em injeção eletrônica, airbags, freio e ABS.' },
  { id: 'oleo', t: 'Óleo do motor', d: 'Lubrificantes de tecnologia sintética, semissintética ou mineral, sempre de acordo com a recomendação do fabricante. O filtro de óleo retém as impurezas do motor: substitua-o a cada troca de óleo, pois o filtro usado guarda resíduos que podem contaminar o óleo novo.' },
  { id: 'preventiva', t: 'Manutenção preventiva', d: 'Manutenção planejada, que evita a corretiva: inspecionamos o veículo e seus componentes e diagnosticamos defeitos mecânicos e elétricos.' },
  { id: 'pintura', t: 'Pintura automotiva', d: 'Do acerto de cor ao brilho final.', itens: [
    ['Colorimetria', 'Técnica de acerto de tonalidade entre a cor original e a cor usada na repintura.'],
    ['Pintura de acabamento', 'Depois do acerto de tonalidade, começa a pintura final do veículo.'],
    ['Polimento e cristalização', 'Pinturas ficam sem brilho quando o verniz está danificado, mas voltam a ter aparência de nova com o polimento.'],
  ] },
];
const grupos = [
  { t: 'Mecânica', ids: ['alinhamento', 'freios', 'suspensao', 'oleo', 'preventiva'] },
  { t: 'Funilaria e pintura', ids: ['lataria', 'martelinho', 'pintura'] },
  { t: 'Eletrônica', ids: ['eletronica'] },
];
const S = id => servicos.find(s => s.id === id);
const fotos = {
  container: 'A frente da Recreio Car na Av. das Américas, com o telefone no letreiro',
  frente: 'Elevadores na entrada da oficina',
  galpao: 'Entrada e galpão da oficina',
  fachada: 'A oficina vista da calçada',
  box1: 'Box de serviço com rampa, dentro do galpão',
  box2: 'Rampa e box de serviço no galpão',
  tintas: 'Estoque de tintas para a pintura automotiva',
  rampas: 'Rampas no pátio coberto, com a cabine de pintura ao fundo',
  patio: 'Pátio coberto da oficina',
  estufa: 'Cabine de pintura',
  recepcao: 'Recepção da oficina',
};
const tam = { fachada: [848, 1280], tintas: [1091, 1280] };
const dim = n => tam[n] || [1280, 960];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'quem-somos', nome: 'Quem somos' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'a-oficina', nome: 'A oficina' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Faixa da oficina', b: 'Letreiro amarelo' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Sansita:ital,wght@0,800;1,800;1,900&family=Overpass:wght@400;500;600;700&family=Squada+One&family=Readex+Pro:wght@400;500;600&display=swap';
const img = (n, extra = '', p = false) => `<img src="/assets/img/${n}${p ? '-p' : ''}.webp" alt="${esc(fotos[n])}" width="${dim(n)[0]}" height="${dim(n)[1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '', p = true) => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n, '', p)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#d92025', b: '#111111' };
const tel = telHref(E.fone);
const mapsQ = encodeURIComponent('Av. das Américas, 16271, Recreio dos Bandeirantes, Rio de Janeiro RJ');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Oficina no Recreio dos Bandeirantes, Rio de Janeiro` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnTel = (txt = E.fone, cls = 'btn') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Recreio Car na Av. das Américas, 16271" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}</span><span>${E.bairro}, ${E.cidade}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
  <li>${ic('carro')}<div><strong>Atendemos</strong><span>Automóveis nacionais e importados</span></div></li>
</ul>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Recreio Car, página inicial"><img src="/assets/${logo}.webp" alt="Recreio Car" width="652" height="224"></a>
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
  <div class="faixa" aria-hidden="true"></div>
  <div class="in rod-grade">
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Recreio Car" width="652" height="224" loading="lazy"><p>Sua parceira em consertos automotivos no Rio de Janeiro. Confiança e preço nos serviços para o seu carro.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Recreio Car. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua tel-flutua" href="${tel}" aria-label="Ligar para a Recreio Car">${ic('tel')}</a>
</body>
</html>
`;
}

const servItem = (s, i) => `<article class="serv sobe" id="${s.id}"><span class="n">${String(i + 1).padStart(2, '0')}</span><div><h3>${s.t}</h3><p>${s.d}</p>${s.itens ? `<dl class="sub">${s.itens.map(x => `<div><dt>${x[0]}</dt><dd>${x[1]}</dd></div>`).join('')}</dl>` : ''}</div></article>`;
const listaNomes = () => `<ul class="nomes">${servicos.map(s => `<li><a href="SERV#${s.id}">${s.t}</a></li>`).join('')}</ul>`;

function comum(v, pag, cab) {
  pag['quem-somos'] = head(v, 'quem-somos', 'Quem somos', 'A Recreio Car é uma oficina de serviços automotivos no Recreio dos Bandeirantes, Rio de Janeiro, preparada para consertar qualquer automóvel nacional ou importado.') + topo(v, 'quem-somos') + cab('Quem somos', 'Uma oficina completa no Recreio dos Bandeirantes', 'container') + `
<div class="in">
<section class="sobre-pag"><div><p class="lead">${sobre}</p><p>Venha nos visitar, esperamos vocês!</p><p class="bts">${btnTel('Ligar para a oficina')}${btnMapa()}</p></div>
<ul class="valores">
  <li class="sobe">${ic('escudo')}<div><h2>Confiança</h2><p>Clareza em todas as informações sobre o serviço do seu carro.</p></div></li>
  <li class="sobe">${ic('engrenagem')}<div><h2>Tecnologia</h2><p>Equipamentos de ponta e diagnóstico computadorizado.</p></div></li>
  <li class="sobe">${ic('usuarios')}<div><h2>Equipe</h2><p>Profissionais altamente capacitados e bom atendimento.</p></div></li>
  <li class="sobe">${ic('carro')}<div><h2>Nacionais e importados</h2><p>Infraestrutura para consertar qualquer automóvel.</p></div></li>
</ul></section>
<section class="tira-fotos">${['recepcao', 'estufa', 'rampas'].map(f => `<figure class="sobe">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Alinhamento e balanceamento, lataria e funilaria, martelinho de ouro, freios, suspensão, eletrônica embarcada, óleo do motor, manutenção preventiva e pintura automotiva no Recreio.') + topo(v, 'servicos') + cab('Serviços', 'Equipe especializada, pronta para te atender', 'box2') + `
<div class="in">
<p class="intro">Da mecânica à pintura, a Recreio Car cuida do seu carro num só lugar. Escolha o serviço e fale com a oficina.</p>
${grupos.map(g => `<section class="grupo"><h2 class="grupo-t">${g.t}</h2><div class="servs">${g.ids.map(id => servItem(S(id), servicos.indexOf(S(id)))).join('')}</div></section>`).join('')}
<p class="cta-linha">${btnTel('Ligar e pedir orçamento')}${btnMapa()}</p>
</div>
` + rodape(v);
  pag['a-oficina'] = head(v, 'a-oficina', 'A oficina', 'Conheça a estrutura da Recreio Car na Av. das Américas: galpão com rampas, pátio coberto, cabine de pintura e recepção.') + topo(v, 'a-oficina') + cab('A oficina', 'Estrutura para consertar qualquer automóvel', 'patio') + `
<div class="in">
<p class="intro">Galpão com rampas e boxes de serviço, pátio coberto, cabine de pintura e estoque de tintas. Tudo na Av. das Américas, 16271.</p>
<section class="galeria">${['frente', 'box1', 'estufa', 'tintas', 'rampas', 'galpao', 'box2', 'recepcao', 'fachada', 'patio', 'container'].map(f => `<figure class="sobe g-${f}">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<p class="cta-linha">${btnTel('Agendar uma visita')}${btnMapa()}</p>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Recreio Car: ${E.rua}, ${E.bairro}, Rio de Janeiro. Telefone ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Venha nos visitar, esperamos vocês', 'container') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}<p class="bts">${btnTel('Ligar agora')}${btnMapa()}</p></div><div>${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(f, ' loading="eager"', true)}</figure></div><div class="faixa" aria-hidden="true"></div></section>`;
  pag.index = head(v, 'index', '', 'Oficina no Recreio dos Bandeirantes, Rio de Janeiro: alinhamento, freios, suspensão, eletrônica, funilaria, pintura e martelinho de ouro para carros nacionais e importados.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Oficina no Recreio dos Bandeirantes</p><h1>Confiança e preço nos serviços <span class="marca-texto">para o seu carro</span></h1><p>Mecânica, funilaria, pintura e eletrônica para qualquer automóvel nacional ou importado, na Av. das Américas.</p>
  <p class="bts">${btnTel()}${btnMapa()}</p></div>
  <figure class="hero-a-foto">${foto('frente', '', false)}</figure>
</div><div class="faixa" aria-hidden="true"></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Nossos serviços</p><h2>Nove serviços, uma oficina só</h2></header>
<ol class="lista-a">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${s.t}</span>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="sobre-a"><div class="in sobre-a-in"><div class="sobre-a-fotos">${foto('recepcao', 's1')}${foto('box1', 's2')}</div><div><p class="k">Quem somos</p><h2>Sua parceira em consertos automotivos no Rio</h2><p>${sobre}</p><a class="link-seta" href="${link(v, 'quem-somos')}">Conheça a Recreio Car ${ic('seta')}</a></div></div></section>
<section class="in pintura-a"><div><p class="k">Funilaria e pintura</p><h2>Do amassado ao brilho de novo</h2><p>${S('martelinho').d}</p>${S('pintura').itens.map(x => `<h3>${x[0]}</h3><p>${x[1]}</p>`).join('')}</div><div class="pintura-a-fotos">${foto('estufa', 'p1')}${foto('tintas', 'p2')}</div></section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Venha nos visitar, esperamos vocês!</h2><p>${E.rua}, ${E.bairro}, Rio de Janeiro.</p></div><p class="bts">${btnTel()}${btnMapa('btn btn-linha btn-claro')}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div></div><figure class="cab-b-foto">${img(f, ' loading="eager"')}</figure></section>`;
  pag.index = head(v, 'index', '', 'Recreio Car, oficina na Av. das Américas, 16271, Recreio dos Bandeirantes. Mecânica, funilaria, pintura e eletrônica embarcada. Telefone (21) 4111-4493.') + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div><p class="k">Av. das Américas, 16271 · Recreio</p><h1>Seu carro<br>no lugar <span>certo.</span></h1><p>Infraestrutura para consertar qualquer automóvel nacional ou importado, com tecnologia de ponta e clareza em todas as informações.</p>
  <p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div>
  <figure class="hero-b-foto">${img('container', ' loading="eager" fetchpriority="high"')}</figure>
</div></section>
<section class="faixa-b"><div class="in"><ul><li>${ic('carro')}Nacionais e importados</li><li>${ic('engrenagem')}Diagnóstico computadorizado</li><li>${ic('escudo')}Clareza em cada orçamento</li></ul></div></section>
<section class="in servs-b"><header class="tit"><p class="k">O que fazemos</p><h2>Serviços</h2></header>
<div class="servs-b-grade">${grupos.map(g => `<div class="col-b sobe"><h3>${g.t}</h3><ul>${g.ids.map(id => `<li><a href="${link(v, 'servicos')}#${id}">${S(id).t}</a></li>`).join('')}</ul></div>`).join('')}</div>
<a class="link-seta" href="${link(v, 'servicos')}">Detalhes de cada serviço ${ic('seta')}</a></section>
<section class="mosaico-b"><div class="in"><header class="tit"><p class="k">A oficina</p><h2>Galpão, pátio coberto e cabine de pintura</h2></header><div class="mosaico">${['rampas', 'estufa', 'tintas', 'box1', 'recepcao'].map((f, i) => foto(f, `m${i + 1}`)).join('')}</div><a class="link-seta" href="${link(v, 'a-oficina')}">Ver todas as fotos ${ic('seta')}</a></div></section>
<section class="in sobre-b"><div><p class="k">Quem somos</p><h2>Bom atendimento e clareza em todas as informações</h2></div><div><p>${sobre}</p><a class="link-seta" href="${link(v, 'quem-somos')}">Mais sobre a oficina ${ic('seta')}</a></div></section>
<section class="cta-b"><div class="in cta-b-in"><h2>Venha nos visitar, esperamos vocês!</h2><p class="bts">${btnTel()}${btnMapa()}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
const fixa = p => Object.fromEntries(Object.entries(p).map(([k, h]) => [k, h.replaceAll('SERV#', '')]));
escreverVersao(pub, 'a', fixa(A()));
escreverVersao(pub, 'b', fixa(B()));
await escolha(pub, {
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#d92025', fundo: '#111111', claro: '#f2f2ef',
  fonteTitulo: "'Sansita',Georgia,sans-serif", fonteTexto: "'Overpass',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, em preto e vermelho, com a faixa azul e vermelha das paredes da oficina separando as seções. Títulos em itálico pesado, como as letras do logo, e os nove serviços numerados logo na abertura.', pontos: ['"Confiança e preço nos serviços para o seu carro"', 'Funilaria e pintura com a cabine e o estoque de tintas', 'Telefone sempre à vista'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Preto e amarelo, como o letreiro "Recreio Car", com letras de placa de oficina. Abre na fachada da Av. das Américas e mostra a estrutura num mosaico de fotos reais.', pontos: ['Fachada real na abertura', 'Serviços em três grupos: mecânica, funilaria e pintura, eletrônica', 'Mosaico do galpão, pátio e cabine de pintura'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
