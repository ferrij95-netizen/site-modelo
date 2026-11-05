// Real Car Funilaria e Pintura (Capão Raso, Curitiba). Gera public/{a,b}/ e a página de escolha.
// node clientes/oficinarealcar/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs oficinarealcar http://oficinarealcar.com.br/)
// Textos tirados do site atual (oficinarealcar.com.br, página única). Fotos de serviço são as do site atual; a fachada vem do fundo das avaliações.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Real Car Funilaria e Pintura', curto: 'Real Car', url: 'https://oficinarealcar.overtus.com.br/', antigo: 'http://oficinarealcar.com.br/',
  fone: '(41) 3078-7051', wa: '554130787051', email: 'realcar71@gmail.com', cnpj: '00.131.050/0001-08',
  rua: 'R. João Rodrigues Pinheiro, 559', bairro: 'Capão Raso', cidade: 'Curitiba/PR', cep: '81130-180',
};
const slogan = 'A confiança que seu carro merece';
const sobre = 'A Real Car Funilaria e Pintura é uma empresa especializada em serviços automotivos de alta qualidade. Com anos de experiência no mercado, somos referência em funilaria, pintura, martelinho de ouro e estética automotiva. Nosso compromisso é oferecer um atendimento personalizado e soluções eficazes para cada necessidade do seu veículo.';
const servicos = [
  { id: 'pintura', t: 'Pintura', d: 'Reparos realizados com máxima qualidade por técnicos altamente capacitados, utilizando produtos de alta tecnologia para garantir um acabamento impecável, preservando a cor original, o brilho e a durabilidade da pintura.' },
  { id: 'funilaria', t: 'Funilaria', d: 'Reparos especializados em riscos, amassados, para-choques e pintura, garantindo um acabamento impecável do jeito que seu carro merece.' },
  { id: 'polimento', t: 'Polimento', d: 'Com técnicas avançadas e materiais de alta qualidade, a equipe remove arranhões, manchas e marcas de oxidação, devolvendo à pintura do seu carro um aspecto renovado.' },
  { id: 'cristalizacao', t: 'Cristalização', d: 'Proteção duradoura para a pintura: a cristalização cria uma camada protetora que previne riscos leves, facilita a limpeza e a conservação e mantém o carro com brilho intenso.' },
  { id: 'rodas', t: 'Restauração de rodas', d: 'Devolvemos a beleza e o acabamento original das suas rodas. Reparamos riscos, arranhões e amassados, com acabamento impecável e duradouro.' },
  { id: 'martelinho', t: 'Martelinho de ouro', d: 'A técnica mais eficiente para remover amassados sem danificar a pintura original do veículo. Seu carro livre de marcas e imperfeições.' },
];
const difs = [
  { t: 'Materiais de qualidade', d: 'Apenas peças e materiais automotivos de qualidade premium para nossos clientes.' },
  { t: 'Atendimento personalizado', d: 'O maior conforto e a maior segurança para quem deixa o carro com a gente.' },
];
const seguradoras = ['Porto Seguro', 'Itaú Seguros', 'Mitsui Sumitomo Seguros', 'Azul Seguros'];
const segTxt1 = 'A Real Car é reconhecida pelas seguradoras mais conceituadas pela qualidade em funilaria e pintura, com confiança em cada trabalho realizado.';
const segTxt2 = 'Somos credenciados com as principais seguradoras, para que você tenha acesso a um serviço de excelência com a cobertura e os benefícios do seu seguro. Temos toda a documentação necessária para o atendimento junto às seguradoras e para executar o serviço com eficiência.';
const avals = [
  { n: 'Douglas Santos', t: 'Atendimento excelente e profissional, serviço muito bem executado e o melhor de tudo: comprometimento com a data da entrega. Vocês são nota 1.000, parabéns a toda equipe Real Car.' },
  { n: 'Farid Luiz', t: 'Quero deixar aqui meus agradecimentos a toda a equipe da Real Car pela excelência do serviço executado em meu veículo. Por mais que se procure, não se consegue achar onde foi o conserto.' },
  { n: 'Roberson Luiz Lopes', t: 'Os reparos em meu carro ficaram perfeitos! Serviço impecável e ótimo atendimento! Recomendo com certeza!' },
  { n: 'Gicele Ingenchki', t: 'Foi muito boa, são muito atenciosos e tentam resolver os problemas o mais rápido possível.' },
];
const fotos = {
  pintura: 'Pintor com pistola de pintura', funilaria: 'Funileiro trabalhando na lateral de um carro', polimento: 'Polimento da pintura com politriz',
  cristalizacao: 'Acabamento com pano de microfibra na lanterna', rodas: 'Roda esportiva com pinça de freio azul', martelinho: 'Lateral de carro preto sem amassados',
  detalhe: 'Limpeza detalhada do painel com pincel', fachada: 'Fachada da Real Car na R. João Rodrigues Pinheiro, Capão Raso',
};
const tam = { pintura: [267, 400], funilaria: [667, 1000], polimento: [667, 1000], cristalizacao: [667, 1000], rodas: [667, 1000], martelinho: [667, 1000], detalhe: [888, 592], fachada: [680, 382] };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'seguradoras', nome: 'Seguradoras' }, { slug: 'a-real-car', nome: 'A Real Car' }, { slug: 'orcamento', nome: 'Orçamento' }];
export const nomesVersao = { a: 'Leque de tinta', b: 'Cabine' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Forum&family=Inter+Tight:wght@400;500;600;700&family=Saira+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#f3f2ee', b: '#0f0f0f' };
const tel = telHref(E.fone);
const wa = waHref(E.wa, 'Olá! Vim pelo site da Real Car e gostaria de fazer um orçamento.');
const mapsQ = encodeURIComponent('R. João Rodrigues Pinheiro, 559, Capão Raso, Curitiba PR, 81130-180');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Funilaria e pintura no Capão Raso, Curitiba` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnWa = (txt = 'Orçamento pelo WhatsApp', cls = 'btn') => `<a class="${cls}" href="${wa}" ${ext}>${icWa()}${txt}</a>`;
const btnTel = (txt = E.fone, cls = 'btn btn-linha') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const raios = `<svg class="raios" viewBox="0 0 300 120" aria-hidden="true"><path d="M0 20 L300 70 L300 78 Z"/><path d="M0 34 L300 92 L300 100 Z"/><path d="M0 48 L300 114 L300 120 Z"/></svg>`;

const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site da Real Car e gostaria de fazer um orçamento.">
  <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>Telefone *<input name="telefone" required inputmode="tel" autocomplete="tel"></label></div>
  <div class="form-duas"><label>Modelo do veículo *<input name="modelo" required placeholder="Ex.: Onix 2019 prata"></label><label>Serviço<select name="servico">${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Sinistro pelo seguro</option><option>Outro</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="3" placeholder="Conte o que aconteceu com o carro"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Você também pode mandar fotos do carro direto no WhatsApp.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone e WhatsApp</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Real Car no Capão Raso, Curitiba" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const notaGoogle = `<div class="nota-g"><b>4,8</b><span class="estrelas" aria-hidden="true">★★★★★</span><span>260 avaliações no Google</span></div>`;
const blocoAvals = (n = 4) => `<div class="avals">${avals.slice(0, n).map(a => `<blockquote class="aval sobe"><p>${a.t}</p><footer>${a.n}</footer></blockquote>`).join('')}</div>`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Real Car Funilaria e Pintura, página inicial"><img src="/assets/${v === 'a' ? 'logo' : 'logo-claro'}.webp" alt="Real Car Funilaria e Pintura" width="535" height="399"></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Real Car Funilaria e Pintura" width="535" height="399" loading="lazy"><p>${slogan}. Funilaria, pintura, martelinho de ouro e estética automotiva no Capão Raso, em Curitiba.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Real Car Funilaria e Pintura · CNPJ ${E.cnpj}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa}" ${ext} aria-label="Falar com a Real Car pelo WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

function comum(v, pag, cab) {
  pag.servicos = head(v, 'servicos', 'Serviços', 'Pintura, funilaria, polimento, cristalização, restauração de rodas e martelinho de ouro no Capão Raso, Curitiba. Orçamento pelo WhatsApp.') + topo(v, 'servicos') + cab('Serviços', 'Do amassado ao brilho final', 'polimento') + `
<div class="in serv-pag">
${servicos.map((s, i) => `<section class="serv-det sobe" id="${s.id}"><figure>${foto(s.id)}</figure><div><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${s.t}</h2><p>${s.d}</p>${btnWa(`Orçamento de ${s.t.toLowerCase()}`, 'link-seta')}</div></section>`).join('\n')}
</div>
<section class="in cta-linha-sec"><h2>Mande as fotos do carro e receba o orçamento</h2><p class="bts">${btnWa()}${btnTel()}</p></section>
` + rodape(v);
  pag.seguradoras = head(v, 'seguradoras', 'Seguradoras', 'A Real Car é credenciada pela Porto Seguro, Itaú Seguros, Mitsui Sumitomo Seguros e Azul Seguros para funilaria e pintura em Curitiba.') + topo(v, 'seguradoras') + cab('Seguradoras credenciadas', 'Bateu o carro? O seguro pode cobrir o reparo aqui', 'funilaria') + `
<div class="in seg-pag">
<div class="seg-txt"><p class="lead">${segTxt1}</p><p>${segTxt2}</p><p class="bts">${btnWa('Falar sobre meu sinistro')}${btnTel()}</p></div>
<ol class="seg-lista">${seguradoras.map((s, i) => `<li class="sobe"><span class="n">${String(i + 1).padStart(2, '0')}</span>${s}</li>`).join('')}</ol>
</div>
` + rodape(v);
  pag['a-real-car'] = head(v, 'a-real-car', 'A Real Car', 'Empresa especializada em funilaria, pintura, martelinho de ouro e estética automotiva no Capão Raso, Curitiba. Nota 4,8 no Google.') + topo(v, 'a-real-car') + cab('A Real Car', slogan, 'fachada') + `
<div class="in sobre-pag">
<div class="sobre-txt"><p class="lead">${sobre}</p>${difs.map(d => `<div class="dif"><h2>${d.t}</h2><p>${d.d}</p></div>`).join('')}</div>
<figure class="sobre-foto">${foto('fachada')}<figcaption>${fotos.fachada}</figcaption></figure>
</div>
<section class="avals-sec"><div class="in"><header class="tit"><p class="k">O que dizem os clientes</p><h2>“Não se consegue achar onde foi o conserto”</h2>${notaGoogle}</header>${blocoAvals()}</div></section>
` + rodape(v);
  pag.orcamento = head(v, 'orcamento', 'Orçamento', `Faça seu orçamento de funilaria e pintura com a Real Car: ${E.rua}, ${E.bairro}, Curitiba. Telefone e WhatsApp ${E.fone}.`) + topo(v, 'orcamento') + cab('Orçamento', 'Conte o que aconteceu com o carro', 'detalhe') + `
<div class="in contato-pag"><div>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></div>${raios}</section>`;
  pag.index = head(v, 'index', '', 'Funilaria, pintura, polimento, cristalização, rodas e martelinho de ouro no Capão Raso, Curitiba. Credenciada pelas principais seguradoras. Nota 4,8 no Google.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Funilaria e pintura · Capão Raso, Curitiba</p><h1>${slogan}</h1><p>Pintura, funilaria, martelinho de ouro e estética automotiva, com materiais de qualidade e atendimento personalizado. Credenciada pelas principais seguradoras.</p>
  <p class="bts">${btnWa()}${btnTel()}</p>${notaGoogle}</div>
  <div class="hero-a-fotos">${foto('funilaria', 'h1f')}${foto('pintura', 'h2f')}</div>
</div>${raios}</section>
<section class="faixa-a"><div class="in"><ul>
  <li>${ic('pin')}<span><b>${E.rua}</b>${E.bairro}, Curitiba</span></li>
  <li>${ic('tel')}<span><b>Telefone e WhatsApp</b><a href="${tel}">${E.fone}</a></span></li>
  <li>${ic('escudo')}<span><b>Seguradoras</b>${seguradoras.length} credenciadas</span></li>
</ul></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>Seis serviços, um acabamento</h2></header>
<ol class="servs-lista">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${s.t}</h3><p>${s.d.split('. ')[0].replace(/\.$/, '')}.</p>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="seg-a"><div class="in seg-a-in"><div><p class="k">Nossos parceiros</p><h2>Seguradoras credenciadas</h2><p>${segTxt1}</p><a class="link-seta" href="${link(v, 'seguradoras')}">Como funciona com o seguro ${ic('seta')}</a></div><ul>${seguradoras.map(s => `<li>${s}</li>`).join('')}</ul></div></section>
<section class="in sobre-a"><figure>${foto('fachada')}</figure><div><p class="k">A Real Car</p><h2>Referência em funilaria e pintura no Capão Raso</h2><p>${sobre.split('. ').slice(1).join('. ')}</p><div class="difs-a">${difs.map(d => `<div><h3>${d.t}</h3><p>${d.d}</p></div>`).join('')}</div></div></section>
<section class="avals-sec"><div class="in"><header class="tit"><p class="k">Avaliações</p><h2>Quem deixou o carro aqui</h2>${notaGoogle}</header>${blocoAvals(3)}</div></section>
<section class="in orc-a"><div><p class="k">Orçamento</p><h2>Faça um orçamento</h2><p>Preencha e a mensagem sai pronta no WhatsApp da Real Car. Se preferir, ligue para ${E.fone}.</p>${contatoLista()}</div>${formulario()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b f-${f}">${img(f, ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', 'Real Car, funilaria e pintura no Capão Raso, Curitiba: pintura, funilaria, polimento, cristalização, rodas e martelinho de ouro. Credenciada por Porto Seguro, Itaú, Mitsui Sumitomo e Azul.') + topo(v, 'index') + `
<section class="hero-b">${img('detalhe', ' loading="eager" fetchpriority="high"')}${raios}<div class="in hero-b-in">
  <p class="k">Capão Raso · Curitiba</p><h1>Funilaria e pintura<br>com acabamento de cabine</h1><p>${slogan}. Seis serviços, das batidas ao brilho final, com as principais seguradoras.</p>
  <p class="bts">${btnWa()}${btnTel()}</p>
</div></section>
<section class="tira-b" aria-label="Serviços">${servicos.map((s, i) => `<a class="tira-item" href="${link(v, 'servicos')}#${s.id}">${img(s.id)}<span><small>${String(i + 1).padStart(2, '0')}</small>${s.t}</span></a>`).join('')}</section>
<section class="in num-b"><div><b>4,8</b><span>nota no Google, com 260 avaliações</span></div><div><b>${seguradoras.length}</b><span>seguradoras credenciadas</span></div><div><b>${servicos.length}</b><span>serviços de funilaria, pintura e estética</span></div></section>
<section class="seg-b"><div class="in"><p class="k">Seguradoras credenciadas</p><ul>${seguradoras.map(s => `<li>${s}</li>`).join('')}</ul><p class="seg-b-txt">${segTxt2.split('. ')[1].replace(/\.$/, '')}. <a href="${link(v, 'seguradoras')}">Saiba mais</a></p></div></section>
<section class="in servs-b"><header class="tit"><p class="k">Serviços</p><h2>O que sai da nossa cabine</h2></header>
<div class="servs-b-lista">${servicos.map((s, i) => `<article class="sobe"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${s.t}</h3><p>${s.d}</p></article>`).join('')}</div></section>
<section class="avals-sec"><div class="in"><header class="tit"><p class="k">Avaliações no Google</p><h2>Nota 1.000, nas palavras dos clientes</h2></header>${blocoAvals(4)}</div></section>
<section class="local-b"><div class="in local-b-in"><figure>${foto('fachada')}</figure><div><p class="k">Onde estamos</p><h2>${E.rua}</h2><p>${E.bairro}, ${E.cidade}, CEP ${E.cep}</p><p class="bts">${btnWa()}<a class="btn btn-linha" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a></p></div></div></section>
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
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#c9a10e', fundo: '#0f0f0f', claro: '#f3f2ee',
  fonteTitulo: "'Forum',Georgia,serif", fonteTexto: "'Inter Tight',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, em grafite e no dourado do jato da pistola do logo, que vira os três riscos que cortam as seções. Títulos em letras romanas como as do logo, serviços numerados em lista.', pontos: ['"A confiança que seu carro merece" logo na abertura', 'Seguradoras e nota 4,8 do Google em destaque', 'Orçamento que sai pronto no WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura como o fundo do logo, em preto e dourado, com letras condensadas. Abre na foto do detalhamento e mostra os seis serviços numa faixa de fotos lado a lado.', pontos: ['Os seis serviços numa faixa de fotos', 'Números grandes: nota 4,8, 4 seguradoras, 6 serviços', 'Fachada e endereço no fim da página'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
