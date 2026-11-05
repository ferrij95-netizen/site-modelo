// Santa Oficina Mecatrônica Veicular (Santa Paula, São Caetano do Sul). Gera public/{a,b}/ e a página de escolha.
// node clientes/santaoficina/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs santaoficina http://www.santaoficina.com.br/)
// Textos tirados do site atual (santaoficina.com.br, tema WordPress Bridge de 2016). Fotos: as da própria oficina, de wp-content/uploads/2016/02 e 2017/03.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Santa Oficina', legal: 'Santa Oficina Mecatrônica Veicular', url: 'https://santaoficina.overtus.com.br/', antigo: 'http://www.santaoficina.com.br/',
  fone: '(11) 2311-5478', email: 'contato@santaoficina.com.br', face: 'https://www.facebook.com/SantaOficina/',
  rua: 'R. Antônio Bento, 23', bairro: 'Santa Paula', cidade: 'São Caetano do Sul/SP', cep: '09520-050',
};
const servicos = [
  { ic: 'engrenagem', t: 'Manutenção preventiva', d: 'A manutenção preventiva e adequada do veículo diminui os riscos de ficar parado, quebrado no trânsito ou na estrada.' },
  { ic: 'painel', t: 'Injeção eletrônica', d: 'Devido à sua complexidade, o sistema de injeção eletrônica somente deve ser manuseado por profissionais competentes.' },
  { ic: 'disco', t: 'Discos e pastilhas', d: 'O sistema de freio requer atenção especial, por ser um dos pontos fundamentais para manter a segurança do seu carro.' },
  { ic: 'oleo', t: 'Troca de óleo', d: 'A viscosidade do óleo evita o atrito entre as peças, garantindo o bom funcionamento, sem o desgaste no sistema mecânico.' },
];
const porque = [
  { t: 'Somos apaixonados por mecânica', d: 'Adoramos o que fazemos e fazemos o melhor: cuidar bem do seu carro. A Santa Oficina possui ferramentas de diagnóstico de injeção eletrônica de última geração e faz treinamento constante dos profissionais.' },
  { t: 'Orçamento sem susto', d: 'Todo veículo que chega na Santa Oficina passa por um check-in de vários itens. Esse processo ajuda no perfeito diagnóstico do problema e, assim, num orçamento detalhado e preciso.' },
  { t: 'Facilitamos o pagamento', d: 'Você pode parcelar o valor do seu serviço ou optar por pagar no cartão de crédito.' },
];
const numeros = [['2009', 'Data de inauguração'], ['789.998', 'Porcas apertadas'], ['1.298', 'Carros abençoados'], ['387', 'Clientes que viraram amigos']];
const depo = [
  { t: 'Comecei a levar meu carro por indicação de um amigo do trabalho. Gostei tanto do atendimento que o Fabiano cuida de todos os carros da família.', n: 'Kleber Souza', c: 'Gerente de produção' },
  { t: 'Depois que fechamos com a Santa Oficina, nossa frota está sempre em ordem e os custos abaixaram. O trabalho é excelente.', n: 'Francisco Siqueira', c: 'Diretor de manutenção' },
  { t: 'Sou cliente da Santa Oficina há 7 anos e faço sempre as revisões do meu carro com eles. Sempre sou muito bem atendido.', n: 'Luiz Carlos Pizoto', c: 'Empresário' },
];
const quem = 'A Santa Oficina Mecatrônica Veicular, fundada em 2009, é uma oficina mecânica sediada em São Caetano do Sul com larga experiência em reparação automotiva de veículos nacionais e importados.';
const duvida = 'Teremos o maior prazer em atendê-lo. Envie-nos um e-mail com suas dúvidas, agendamento de serviço ou simplesmente venha tomar um café conosco.';
const fotos = {
  fabiano: 'Na frente da parede vermelha com o nome da Santa Oficina',
  motor: 'Motor de um Porsche no box da oficina',
  garagem: 'O salão da oficina, com um Porsche Cayman à frente',
  diagnostico: 'Leitura de dados com o carro ligado, de dentro do veículo',
  parede: 'A parede vermelha da Santa Oficina',
  fox: 'Revisão sob o capô de um Volkswagen',
  'fusca-galaxie': 'Um Fusca e um Ford Galaxie no salão',
  elevador: 'Fusca no elevador e Jeep ao lado, com o emblema na parede',
  fuscas: 'Dois Fuscas lado a lado no salão',
  targa: 'Porsche 911 Targa com a tampa do motor aberta',
};
const tam = { fabiano: [1600, 1000], motor: [1600, 1178], garagem: [1600, 1000], diagnostico: [1600, 1067], parede: [600, 358], fox: [600, 358], 'fusca-galaxie': [600, 358], elevador: [600, 358], fuscas: [600, 358], targa: [600, 358] };
const galeria = ['elevador', 'targa', 'fusca-galaxie', 'garagem', 'fuscas', 'fox', 'diagnostico', 'motor', 'parede'];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'a-oficina', nome: 'A oficina' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'galeria', nome: 'Galeria' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Santinho', b: 'Parede vermelha' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Sorts+Mill+Goudy:ital@0;1&family=Be+Vietnam+Pro:wght@400;500;600;700&family=Gelasio:wght@500;600;700&family=Lexend:wght@400;500;600&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#b3141b', b: '#b3141b' };
const tel = telHref(E.fone);
const mapsQ = encodeURIComponent('R. Antônio Bento, 23, Santa Paula, São Caetano do Sul SP, 09520-050');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Oficina mecânica em São Caetano do Sul` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnTel = (txt = E.fone, cls = 'btn') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMail = (txt = 'Enviar e-mail', cls = 'btn btn-linha') => `<a class="${cls}" href="mailto:${E.email}">${ic('mail')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Santa Oficina na R. Antônio Bento, 23" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;

const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
  <li>${ic('face')}<div><strong>Facebook</strong><a href="${E.face}" ${ext}>/SantaOficina</a></div></li>
</ul>`;
const form = () => `<form class="form" id="mensagem" data-email="${E.email}" data-assunto="Contato pelo site da Santa Oficina" novalidate>
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Carro (marca, modelo e ano)<input name="carro"></label><label>Assunto<select name="assunto"><option>Agendar serviço</option><option>Pedir orçamento</option><option>Tirar uma dúvida</option></select></label></div>
  <label>Mensagem*<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar por e-mail</button>
  <p class="form-nota">O botão abre o seu e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Santa Oficina, página inicial"><img src="/assets/${logo}.webp" alt="Santa Oficina" width="964" height="150"></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Santa Oficina" width="964" height="150" loading="lazy"><p>Oficina mecânica em São Caetano do Sul desde 2009, para carros nacionais e importados.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Onde estamos</h3><ul class="rod-dados">
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('face')}<a href="${E.face}" ${ext}>Facebook</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ${E.legal}. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua tel-flutua" href="${tel}" aria-label="Ligar para a Santa Oficina">${ic('tel')}</a>
</body>
</html>
`;
}

const numerosLista = cls => `<ul class="${cls}">${numeros.map(n => `<li class="sobe"><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul>`;
const depoLista = cls => `<div class="${cls}">${depo.map(d => `<figure class="depo sobe"><blockquote>${d.t}</blockquote><figcaption><b>${d.n}</b>${d.c}</figcaption></figure>`).join('')}</div>`;

function comum(v, pag, cab) {
  pag['a-oficina'] = head(v, 'a-oficina', 'A oficina', 'A Santa Oficina, fundada em 2009 em São Caetano do Sul, cuida de carros nacionais e importados com diagnóstico de injeção de última geração, check-in completo e orçamento detalhado.') + topo(v, 'a-oficina') + cab('A oficina', 'Desde 2009 fazendo milagres nos carros que nos trazem', 'elevador') + `
<div class="in">
<section class="quem-pag"><p class="quem-lead">${quem}</p><div class="quem-fotos">${foto('fabiano', 'q1')}${foto('fuscas', 'q2')}</div></section>
<section class="porque-pag"><header class="tit"><p class="k">Por que escolher a Santa Oficina</p><h2>Profissionalismo, rapidez e qualidade</h2></header><div class="porque-lista">${porque.map((p, i) => `<article class="sobe"><span class="n">${['I', 'II', 'III'][i]}</span><h3>${p.t}</h3><p>${p.d}</p></article>`).join('')}</div></section>
</div>
<section class="nums-pag"><div class="in">${numerosLista('nums')}</div></section>
<div class="in"><section class="depo-pag"><header class="tit"><p class="k">Opiniões de nossos clientes</p><h2>Clientes que viraram amigos</h2></header>${depoLista('depos')}</section></div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Manutenção preventiva, injeção eletrônica, discos e pastilhas de freio e troca de óleo, com check-in completo e orçamento detalhado. Santa Oficina, São Caetano do Sul.') + topo(v, 'servicos') + cab('Serviços', 'A oficina mecânica certa para quem procura profissionalismo', 'diagnostico') + `
<div class="in">
<section class="servs-pag">${servicos.map((s, i) => `<article class="serv-linha sobe"><span class="n">0${i + 1}</span>${ic(s.ic)}<h2>${s.t}</h2><p>${s.d}</p></article>`).join('')}</section>
<section class="checkin-pag"><div><p class="k">Antes de qualquer serviço</p><h2>Orçamento sem susto</h2><p>${porque[1].d}</p><p>${porque[0].d}</p></div><figure>${foto('motor')}<figcaption>${fotos.motor}</figcaption></figure></section>
<section class="pag-pag"><h2>Facilitamos o pagamento</h2><p>${porque[2].d}</p><p class="bts">${btnTel('Ligar para agendar')}${btnMail('Pedir orçamento por e-mail')}</p></section>
</div>
` + rodape(v);
  pag.galeria = head(v, 'galeria', 'Galeria', 'Fotos da Santa Oficina em São Caetano do Sul: Fuscas, Jeep, Galaxie e Porsches no salão da oficina.') + topo(v, 'galeria') + cab('Galeria', 'Carros abençoados, do Fusca ao Porsche', 'targa') + `
<div class="in"><section class="galeria g-pag">${galeria.map(f => `<figure class="sobe f-${f}">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Santa Oficina: ${E.rua}, ${E.bairro}, São Caetano do Sul. Telefone ${E.fone}, e-mail ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Alguma dúvida? Venha tomar um café conosco', 'parede') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}<p class="bts">${btnTel('Ligar agora')}${btnMapa()}</p></div><div><p class="contato-txt">${duvida}</p>${form()}</div></section>${mapaFrame}</div>
` + rodape(v);
}

// Versão A "Santinho": clara, cinza-concreto e branco, vermelho da parede só nos botões e nos números, títulos em Sorts Mill Goudy (próxima do nome no logotipo).
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in"><p class="k halo">${k}</p><h1>${t}</h1></div><figure class="tit-a-foto f-${f}">${img(f, ' loading="eager"')}</figure></section>`;
  pag.index = head(v, 'index', '', 'Oficina mecânica em São Caetano do Sul desde 2009: manutenção preventiva, injeção eletrônica, discos e pastilhas e troca de óleo, em carros nacionais e importados.') + topo(v, 'index') + `
<section class="hero-a"><div class="in">
  <img class="hero-a-emb" src="/assets/emblema.webp" alt="" width="599" height="268">
  <h1>Pelo amor de Deus, não leve seu carro em qualquer lugar.</h1>
  <div class="hero-a-pe"><p>Ele merece a bênção da Santa Oficina. Mecânica de nacionais e importados em São Caetano do Sul, desde 2009.</p><p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div>
</div>
<div class="tira-a">${foto('fabiano', 't1')}${foto('elevador', 't2')}${foto('targa', 't3')}</div></section>
<section class="in servs-a"><header class="tit"><p class="k halo">Bem-vindo à Santa Oficina</p><h2>A oficina mecânica certa para quem procura profissionalismo, rapidez e qualidade</h2></header>
<ol class="servs-a-lista">${servicos.map((s, i) => `<li class="sobe"><span class="n">0${i + 1}</span><h3>${s.t}</h3><p>${s.d}</p></li>`).join('')}</ol><a class="link-seta" href="${link(v, 'servicos')}">Todos os serviços ${ic('seta')}</a></section>
<section class="nums-a"><div class="in"><p class="k">Desde 2009 fazendo milagres nos carros que nos trazem</p>${numerosLista('nums')}</div></section>
<section class="in porque-a"><figure>${foto('diagnostico')}</figure><div><p class="k halo">Por que escolher a Santa Oficina</p>${porque.map(p => `<article class="sobe"><h3>${p.t}</h3><p>${p.d}</p></article>`).join('')}</div></section>
<section class="quem-a"><div class="in quem-a-in"><div><p class="k halo">Quem somos</p><p class="quem-a-txt">${quem}</p><a class="link-seta" href="${link(v, 'a-oficina')}">Conheça a oficina ${ic('seta')}</a></div><div class="quem-a-fotos">${foto('fusca-galaxie')}${foto('fuscas')}</div></div></section>
<section class="in depo-a"><header class="tit"><p class="k halo">Opiniões de nossos clientes</p></header>${depoLista('depos')}</section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Alguma dúvida?</h2><p>${duvida}</p><p class="cta-a-end">${ic('pin')}${E.rua}, ${E.bairro}, ${E.cidade}</p></div><p class="bts">${btnTel()}${btnMail()}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

// Versão B "Parede vermelha": o vermelho da parede da oficina como fundo dominante, preto e branco, títulos em Gelasio negrito e texto em Lexend.
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Santa Oficina, São Caetano do Sul: injeção eletrônica, freios, troca de óleo e manutenção preventiva desde 2009. Check-in completo e orçamento sem susto.') + topo(v, 'index') + `
<section class="hero-b">${img('fabiano', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in">
  <h1>Pelo amor de Deus, não leve seu carro em qualquer lugar.</h1>
  <p>Ele merece a bênção da Santa Oficina.</p>
  <p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'contato')}">Agendar serviço</a></p>
</div></section>
<section class="nums-b"><div class="in">${numerosLista('nums')}</div></section>
<section class="servs-b"><div class="in"><header class="tit-b"><p class="k">Serviços</p><h2>Profissionalismo, rapidez e qualidade</h2></header>
<ol class="servs-b-lista">${servicos.map((s, i) => `<li class="sobe"><span class="n">${['I', 'II', 'III', 'IV'][i]}</span><h3>${s.t}</h3><p>${s.d}</p></li>`).join('')}</ol></div></section>
<section class="check-b"><div class="in check-b-in"><figure>${foto('motor')}</figure><div><p class="k">Check-in de vários itens</p><h2>Orçamento sem susto</h2><p>${porque[1].d}</p><ul class="check-b-lista">${porque.filter((_, i) => i !== 1).map(p => `<li><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ul></div></div></section>
<section class="gal-b"><div class="in"><header class="tit-b"><p class="k">Nacionais e importados</p><h2>Do Fusca ao Porsche</h2></header><div class="gal-b-grade">${['elevador', 'targa', 'fusca-galaxie', 'fuscas', 'fox'].map((f, i) => foto(f, `g${i + 1}`)).join('')}</div><a class="link-seta" href="${link(v, 'galeria')}">Ver a galeria ${ic('seta')}</a></div></section>
<section class="depo-b"><div class="in">${depoLista('depos')}</div></section>
<section class="cta-b"><div class="in cta-b-in"><div><p class="k">Onde estamos</p><h2>${E.rua}, ${E.bairro}</h2><p>${E.cidade}, CEP ${E.cep}. ${duvida}</p></div><p class="bts">${btnTel()}${btnMapa()}</p></div></section>
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
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#b3141b', fundo: '#1c1617', claro: '#efeeec',
  fonteTitulo: "'Sorts Mill Goudy',Georgia,serif", fonteTexto: "'Be Vietnam Pro',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, em branco e cinza-concreto, com o emblema de motor alado e auréola no topo e títulos na serifa do logotipo. Abre com a frase do site atual, "Pelo amor de Deus, não leve seu carro em qualquer lugar."', pontos: ['Faixa de fotos reais logo na abertura', 'Os contadores da oficina em destaque', 'Telefone e e-mail sempre à mão'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'O vermelho da parede da oficina toma a página, com preto e branco. Abre na foto em frente à parede com o nome da Santa Oficina e mostra os carros do salão, do Fusca ao Porsche.', pontos: ['"Ele merece a bênção da Santa Oficina."', 'Serviços numerados em algarismos romanos', 'Galeria com os carros da oficina'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
