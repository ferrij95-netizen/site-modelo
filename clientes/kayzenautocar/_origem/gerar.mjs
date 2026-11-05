// Kayzen Auto Car (Ramos, Rio de Janeiro). Gera public/{a,b}/ e a página de escolha.
// node clientes/kayzenautocar/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs kayzenautocar http://www.kayzenautocar.com.br/)
// Textos tirados do site atual (kayzenautocar.com.br). As fotos são as do site atual (todas de banco de imagens, nenhuma da oficina): ver LEIA-ME.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref, icWa } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Kayzen Auto Car', curto: 'Kayzen', url: 'https://kayzenautocar.overtus.com.br/', antigo: 'http://www.kayzenautocar.com.br/',
  fone: '(21) 96442-2945', wa: '5521964422945',
  rua: 'R. Uranos, 1243', bairro: 'Ramos', cidade: 'Rio de Janeiro/RJ', cep: '21060-425',
};
const missao = 'Proporcionar serviços automotivos de excelência, unindo tecnologia, especialização e atendimento personalizado para oferecer aos nossos clientes a máxima performance, segurança e confiabilidade em seus veículos.';
const visao = 'Ser referência em oficina de alto padrão no mercado automotivo, reconhecida pela inovação, qualidade e experiência diferenciada no cuidado com veículos populares e premium.';
const valores = ['Excelência', 'Confiança', 'Inovação', 'Cuidado personalizado', 'Sustentabilidade'];
const servicos = [
  { ic: 'calendario', t: 'Manutenção preventiva' },
  { ic: 'engrenagem', t: 'Serviços de motor e câmbio' },
  { ic: 'disco', t: 'Sistema de freios e suspensão' },
  { ic: 'medidor', t: 'Sistema elétrico e eletrônico' },
];
const sobre = [
  'Na Kayzen Autocar, acreditamos que cuidar de um carro exige muito mais do que manutenção: exige dedicação, conhecimento especializado e atenção a cada detalhe.',
  'Somos uma oficina de alto padrão há 34 anos, preparada para oferecer serviços completos com tecnologia avançada, equipe altamente qualificada e atendimento exclusivo. Nosso compromisso é garantir que cada veículo mantenha sua performance, segurança e sofisticação, como no primeiro dia.',
  'Aqui, o cliente encontra mais do que reparos: encontra confiança, transparência e uma experiência diferenciada, pensada para quem não abre mão da excelência no cuidado automotivo.',
];
const razoes = [
  { t: 'Populares e premium', d: 'Uma oficina de alto padrão, especializada em veículos populares e premium, com tecnologia avançada e atendimento exclusivo.' },
  { t: 'Atendimento personalizado', d: 'Qualidade, inovação e atendimento personalizado no cuidado com veículos populares ou de alto padrão.' },
  { t: '34 anos de experiência', d: 'A confiança que dirige você. Seu carro, nossa paixão pela excelência.' },
];
const prevenir = 'Uma oficina de qualidade foca não só em resolver problemas, mas em prevenir falhas, oferecer confiança, transparência e comodidade ao cliente.';
const fotos = {
  audi: 'Sedã esportivo prata', mclaren: 'Esportivo prata estacionado', lambo: 'Esportivo laranja na rua', amg: 'Esportivos em pista molhada',
  mini: 'Hatch preto na neblina', volante: 'Motorista ao volante', janela: 'Passageira na janela do carro', kombi: 'Furgão antigo na estrada', estrada: 'Carro em estrada de serra',
};
const tam = { audi: [594, 800], mclaren: [1000, 667], lambo: [1000, 667], amg: [1000, 563], mini: [675, 675], volante: [1080, 1080], janela: [720, 720], kombi: [720, 720], estrada: [1200, 801] };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'quem-somos', nome: 'Quem somos' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Engrenagem', b: 'Garagem noturna' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Michroma&family=Manrope:wght@400;500;600;700&family=Oxanium:wght@500;600;700&family=Inter+Tight:wght@400;500;600&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#f4f5f6', b: '#0e0f11' };
const tel = telHref(E.fone);
const wa = waHref(E.wa, 'Olá! Vim pelo site da Kayzen Auto Car.');
const mapsQ = encodeURIComponent('R. Uranos, 1243, Ramos, Rio de Janeiro RJ, 21060-425');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Oficina de alto padrão em Ramos, Rio de Janeiro` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnWa = (txt = 'Chamar no WhatsApp', cls = 'btn') => `<a class="${cls}" href="${wa}" ${ext}>${icWa()}${txt}</a>`;
const btnTel = (txt = E.fone, cls = 'btn btn-linha') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;
// engrenagem do logo, em traço
const gear = (cls = 'gear') => `<svg class="${cls}" viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.4">${Array.from({ length: 12 }, (_, i) => `<rect x="92" y="6" width="16" height="26" rx="2" transform="rotate(${i * 30} 100 100)"/>`).join('')}<circle cx="100" cy="100" r="70"/><circle cx="100" cy="100" r="48"/></g></svg>`;

const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp e telefone</strong><a href="${wa}" ${ext}>${E.fone}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Kayzen Auto Car na R. Uranos, 1243, Ramos" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const form = () => `<form class="form" data-wa="Olá! Vim pelo site da Kayzen Auto Car." data-numero="${E.wa}" novalidate>
  <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label></div>
  <label>Carro (marca, modelo e ano)<input name="carro"></label>
  <label>Serviço<select name="servico"><option>Manutenção preventiva</option><option>Motor e câmbio</option><option>Freios e suspensão</option><option>Elétrica e eletrônica</option><option>Outro</option></select></label>
  <label>Mensagem *<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp da oficina, pronta para enviar.</p>
</form>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo-preto' : 'logo-claro';
  const [w, h] = v === 'a' ? [576, 251] : [488, 215];
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Kayzen Auto Car, página inicial"><img src="/assets/${logo}.webp" alt="Kayzen Auto Car" width="${w}" height="${h}"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa}" ${ext}>${icWa()}<span>WhatsApp</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Kayzen Auto Car" width="488" height="215" loading="lazy"><p>Na Kayzen Autocar, cada detalhe importa: excelência, transparência e performance para quem exige o melhor cuidado automotivo.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa}" ${ext}>${E.fone}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Kayzen Auto Car. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa}" ${ext} aria-label="Chamar a Kayzen no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const listaServ = (cls = '') => `<ol class="servs ${cls}">${servicos.map((s, i) => `<li class="serv sobe">${ic(s.ic)}<span class="n">0${i + 1}</span><h3>${s.t}</h3></li>`).join('')}</ol>`;
const listaValores = () => `<ol class="valores">${valores.map((x, i) => `<li><span class="n">0${i + 1}</span>${x}</li>`).join('')}</ol>`;

function comum(v, pag, cab) {
  pag['quem-somos'] = head(v, 'quem-somos', 'Quem somos', 'Oficina de alto padrão há 34 anos em Ramos, Rio de Janeiro: tecnologia, equipe qualificada e atendimento exclusivo para veículos populares e premium.') + topo(v, 'quem-somos') + cab('Quem somos', 'Há 34 anos cuidando de carro como se deve', 'volante') + `
<div class="in">
<section class="sobre-pag"><div class="sobre-txt">${sobre.map(p => `<p>${p}</p>`).join('')}<p class="destaque">A Kayzen Autocar é sinônimo de qualidade, inovação e exclusividade no mercado automotivo.</p></div>
<aside class="anos sobe">${gear()}<b>34</b><span>anos de experiência</span></aside></section>
<section class="mvv">
  <article class="sobe"><p class="k">Missão</p><p>${missao}</p></article>
  <article class="sobe"><p class="k">Visão</p><p>${visao}</p></article>
  <article class="sobe"><p class="k">Valores</p>${listaValores()}</article>
</section>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Manutenção preventiva, motor e câmbio, freios e suspensão, sistema elétrico e eletrônico. Kayzen Auto Car, Ramos, Rio de Janeiro.') + topo(v, 'servicos') + cab('Serviços', 'Do preventivo ao eletrônico', 'mini') + `
<div class="in">
<p class="intro">${prevenir}</p>
${listaServ('servs-pag')}
<section class="faixa-pop"><div><p class="k">Veículos</p><h2>Populares e de alto padrão</h2><p>O mesmo cuidado, com tecnologia avançada e atendimento exclusivo, para o carro do dia a dia e para o esportivo.</p></div><p class="bts">${btnWa('Pedir orçamento')}${btnTel()}</p></section>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Kayzen Auto Car: ${E.rua}, ${E.bairro}, Rio de Janeiro. WhatsApp e telefone ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a oficina', 'janela') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}<p class="bts">${btnWa()}${btnMapa()}</p>${mapaFrame}</div><div class="form-caixa"><h2>Peça um orçamento</h2>${form()}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div>${gear('gear tit-gear')}</div></section>`;
  pag.index = head(v, 'index', '', 'Oficina de alto padrão em Ramos, Rio de Janeiro, para veículos populares e premium. 34 anos de experiência, tecnologia avançada e atendimento personalizado.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Oficina de alto padrão · Ramos, Rio de Janeiro</p><h1>Sempre a melhor escolha</h1><p>Uma oficina especializada em veículos populares e premium, com tecnologia avançada e atendimento exclusivo. Há 34 anos.</p>
  <p class="bts">${btnWa()}${btnTel()}</p></div>
  <figure class="hero-a-foto">${img('audi', ' loading="eager" fetchpriority="high"')}<div class="selo-a">${gear()}<b>34</b><span>anos</span></div></figure>
</div></section>
<section class="faixa-a"><div class="in"><ul>${valores.map(x => `<li>${x}</li>`).join('')}</ul></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>O que a oficina faz</h2><p>${prevenir}</p></header>${listaServ()}<a class="link-seta" href="${link(v, 'servicos')}">Ver serviços ${ic('seta')}</a></section>
<section class="razoes-a"><div class="in"><header class="tit"><p class="k">Por que a Kayzen</p><h2>A confiança que dirige você</h2></header>
<div class="razoes">${razoes.map((r, i) => `<article class="sobe">${img(['lambo', 'janela', 'amg'][i])}<h3>${r.t}</h3><p>${r.d}</p></article>`).join('')}</div></div></section>
<section class="in mv-a"><article><p class="k">Missão</p><p>${missao}</p></article><article><p class="k">Visão</p><p>${visao}</p></article><a class="link-seta" href="${link(v, 'quem-somos')}">Conheça a Kayzen ${ic('seta')}</a></section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Seu carro, nossa paixão pela excelência</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}.</p></div><p class="bts">${btnWa()}${btnMapa('btn btn-linha')}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b">${img(f, ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', 'Kayzen Auto Car, oficina em Ramos, Rio de Janeiro: manutenção preventiva, motor e câmbio, freios e suspensão, elétrica e eletrônica para carros populares e premium.') + topo(v, 'index') + `
<section class="hero-b">${img('mclaren', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in">
  <p class="k">Kayzen Autocar · Ramos, Rio de Janeiro</p><h1>A confiança que <em>dirige você.</em></h1><p>Excelência, transparência e performance para quem exige o melhor cuidado automotivo.</p>
  <p class="bts">${btnWa()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div></section>
<section class="dados-b"><div class="in"><ul>
  <li><b>34</b><span>anos de experiência</span></li>
  <li><b>4</b><span>frentes de serviço</span></li>
  <li><b>Populares</b><span>e de alto padrão</span></li>
</ul></div></section>
<section class="in servs-b"><header class="tit-b"><p class="k">Serviços</p><h2>Do preventivo ao eletrônico</h2></header>${listaServ('servs-lista')}<p class="servs-nota">${prevenir} <a class="link-seta" href="${link(v, 'servicos')}">Mais ${ic('seta')}</a></p></section>
<section class="duas-b"><figure>${img('estrada')}</figure><div class="duas-b-txt"><p class="k">Quem somos</p><h2>Mais do que reparos</h2><p>${sobre[2]}</p><a class="link-seta" href="${link(v, 'quem-somos')}">Conheça a Kayzen ${ic('seta')}</a></div></section>
<section class="in valores-b"><header class="tit-b"><p class="k">Valores</p><h2>O que guia a oficina</h2></header>${listaValores()}</section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>Kayzen Autocar. Sempre a melhor escolha.</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}.</p></div><p class="bts">${btnWa()}${btnMapa()}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#b88a2e', fundo: '#0e0f11', claro: '#f4f5f6',
  fonteTitulo: "'Michroma',system-ui,sans-serif", fonteTexto: "'Manrope',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4, texto: 'Clara, em branco frio, preto e o dourado do carro do logo. Títulos largos como as letras do logo e a engrenagem do símbolo desenhada em traço, marcando os 34 anos.', pontos: ['"Sempre a melhor escolha" na abertura', 'Os cinco valores numa faixa preta', 'WhatsApp e endereço sempre à vista'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4, texto: 'Escura, em preto e prata, com o dourado só nos detalhes. Abre em foto cheia com "A confiança que dirige você" e lista os serviços numerados.', pontos: ['Foto em tela cheia na abertura', '34 anos em números grandes', 'Serviços numerados de 01 a 04'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
