// Auto Mecânica Adir (Rebouças, Curitiba/PR). Gera public/{a,b}/ e a página de escolha.
// node clientes/automecanicaadir/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs automecanicaadir http://automecanicaadir.com.br/)
// Textos e fotos tirados do site atual (Divi/WordPress de 2019). Os banners de banco de imagem do site antigo não foram usados.
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Auto Mecânica Adir', url: 'https://automecanicaadir.overtus.com.br/', antigo: 'http://automecanicaadir.com.br/',
  fone: '(41) 3333-7338', end: 'Rua Iapó, 719', bairro: 'Rebouças', cidade: 'Curitiba/PR', cep: '80215-223',
  curto: 'Oficina mecânica no Rebouças, em Curitiba, desde 1984. Centro Automotivo Bosch Service: eletrônica embarcada, mecânica geral e serviços express para carros nacionais e importados.',
  avaliar: 'http://bit.ly/2Yki3rV',
};
const mapaQ = 'Rua Iapó 719 Rebouças Curitiba PR';
const historia = [
  'No mercado desde 1984, a Auto Mecânica Adir oferece os melhores serviços automotivos disponíveis no mercado. Atualmente possuímos uma clientela fiel, devido ao alto grau de comprometimento que temos enraizado em nossa base empresarial.',
  'Manter um alto padrão de atendimento, serviço e qualidade é uma tarefa contínua, que para nós realizarmos é preciso uma sintonia entre todos os colaboradores envolvidos.',
  'Nossa cultura foi construída sobre uma base familiar. Aliamos a isso o compromisso com nossos parceiros, por meio de iniciativas e benefícios que resultam no sucesso do nosso trabalho e na satisfação dos nossos clientes.',
  'O objetivo da Auto Mecânica Adir é trazer conforto e segurança para todos. Para tornar isso possível, prezamos muito pela rapidez e pela eficiência em buscar soluções que melhorem cada vez mais o nosso dia a dia.',
];
const bosch = 'Somos um Centro Automotivo Bosch Service: temos profissionais capacitados e equipamentos de ponta para atender os mais variados veículos nacionais e importados. Por isso também oferecemos garantia dos nossos serviços.';
const espera = 'Temos uma estrutura diferenciada para receber nossos clientes: sala de espera com TV, wi-fi e aquele cafezinho especial.';
const servicos = [
  { id: 'eletronica', t: 'Eletrônica embarcada', d: 'Com os avanços tecnológicos, os carros estão cada dia mais computadorizados. É tarefa importante do profissional ter o conhecimento para diagnosticar e reparar os defeitos que o veículo possa apresentar.', i: 'painel', f: 'patio-3' },
  { id: 'mecanica', t: 'Mecânica geral', d: 'O coração do seu carro é o motor, mas existe uma série de componentes que fazem a sua máquina girar. Temos profissionais capacitados para atender qualquer tipo de veículo nacional ou importado.', i: 'engrenagem', f: 'patio-1' },
  { id: 'express', t: 'Serviços express', d: 'Executamos com rapidez e eficiência serviços como troca de óleo e filtros e substituição de baterias. Agende seu horário e não perca mais tempo procurando um mecânico de confiança.', i: 'oleo', f: 'patio-2' },
];
const vantagens = [
  { id: 'leva-traz', t: 'Leva & Traz', d: 'Sabemos a importância e o valor que o seu tempo tem. Por isso temos mais essa vantagem, o serviço Leva & Traz, para que você não perca tempo com deslocamentos e possa priorizar as suas atividades.', i: 'carro' },
  { id: 'car-wash', t: 'Car wash', d: 'Aqui nossos clientes são tratados como únicos, e não medimos esforços para entregar o melhor serviço sempre. Depois da revisão, sempre damos um trato no seu veículo para você sair com o carro limpinho e cheiroso.', i: 'gota' },
  { id: 'sala-de-espera', t: 'Sala de espera', d: espera, i: 'casa' },
];
const depo = [
  { n: 'Henrique Zanatta Baron', t: 'Excelente oficina! Faz mais de 10 anos que levo meus carros no Adir e mais uma vez quero parabenizar toda a equipe pela qualidade, compromisso, atenção e respeito. Eu recomendo!' },
  { n: 'Wolffgi Wolff', t: 'Que lugar maravilhoso! Pessoas educadas e respeitosas. Quando vou sozinha a uma oficina sempre fico nervosa, mas esse lugar me tranquiliza. Recomendo sempre!' },
  { n: 'Vinicius Lobo', t: 'Frequento a oficina do Adir há 15 anos. Atendimento sempre cordial, local limpo e arejado, serviço de excelente qualidade a preço justo. Sem sombra de dúvidas, uma das melhores oficinas de Curitiba.' },
  { n: 'Mauro L. Filho', t: 'Conheço o trabalho da Automecânica Adir desde 2010. Todos os procedimentos sempre ocorreram de acordo com o que foi autorizado, e quando tive problema com uma peça com defeito de fábrica, o reparo foi feito no tempo mais breve possível e sem custos. Aplica preços justos e pratica excelência.' },
];
const fotos = [
  ['fachada', 'Fachada da Auto Mecânica Adir na Rua Iapó'],
  ['recepcao', 'Recepção'],
  ['sala-espera', 'Sala de espera com café'],
  ['patio-3', 'Pátio interno com elevadores'],
  ['patio-1', 'Área de serviço'],
  ['portao-mural', 'Portão com o mural da Rota 66'],
  ['fachada-lateral', 'Entrada lateral'],
  ['patio-2', 'Pátio interno'],
];
const alt = Object.fromEntries(fotos);
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'oficina', nome: 'A oficina' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'vantagens', nome: 'Vantagens' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Losango Azul', b: 'Rota 1984' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@112,700;112,800;125,800&family=Figtree:wght@400;500;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=IBM+Plex+Sans:wght@400;500;600&display=swap',
};
const cores = { a: '#005da4', b: '#0c1420' };
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Auto Mecânica Adir | Oficina no Rebouças, Curitiba, desde 1984' : `${titulo} | Auto Mecânica Adir`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const mapaFrame = () => `<iframe class="mapa" title="Mapa: ${E.end}, ${E.bairro}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(mapaQ)}&z=16&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Auto Mecânica Adir, página inicial"><img src="/assets/${v === 'b' ? 'logo-claro' : 'logo'}.webp" alt="Adir Auto Mecânica" width="530" height="332"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Adir Auto Mecânica" width="530" height="332" loading="lazy"><p>Mecânica de base familiar no Rebouças desde 1984. Centro Automotivo Bosch Service.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Fale com a oficina</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('pin')}<span>${E.end}, ${E.bairro}<br>${E.cidade}, ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Auto Mecânica Adir. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const servLista = v => `<ul class="servs">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><span class="servs-n">0${i + 1}</span>${ic(s.i)}<h3>${s.t}</h3><p>${s.d}</p><span class="link-seta">Saiba mais ${ic('seta')}</span></a></li>`).join('')}</ul>`;
const vantLista = () => `<ul class="vants">${vantagens.map(s => `<li class="sobe" id="${s.id}">${ic(s.i)}<div><h3>${s.t}</h3><p>${s.d}</p></div></li>`).join('')}</ul>`;
const depoLista = (n = 4) => `<div class="depos">${depo.slice(0, n).map(d => `<blockquote class="sobe"><p>${d.t}</p><footer><b>${d.n}</b><span>Avaliação no Google</span></footer></blockquote>`).join('')}</div>`;
const galeria = (lista = fotos) => `<div class="galeria">${lista.map(([f, a]) => `<a href="/assets/img/${f}.webp" data-foto="${esc(a)}" class="sobe">${img(f, a)}<span>${a}</span></a>`).join('')}</div>`;
const boschSelo = () => `<p class="selo">${ic('escudo')}<span><b>Centro Automotivo Bosch Service</b>Serviços com garantia, para nacionais e importados</span></p>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a><span>Ligue para agendar o seu horário.</span></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.end}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></div></li>
  <li>${ic('estrela')}<div><strong>Já é cliente?</strong><a href="${E.avaliar}" target="_blank" rel="noopener">Avalie a oficina no Google</a></div></li>
</ul>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Precisa de um mecânico de confiança?</h2><p>Ligue e agende um horário na Rua Iapó, 719, no Rebouças.</p></div><p class="bts"><a class="btn btn-claro" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Como chegar</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.oficina = head(v, 'oficina', 'A oficina', historia[0]) + topo(v, 'oficina') + cab('A oficina', 'Base familiar, clientela fiel e mais de quatro décadas de oficina', 'fachada') + `
<div class="in"><section class="texto-pag"><div><p class="k">Nossa história</p>${historia.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><aside class="desde"><b>1984</b><span>no mercado desde</span>${boschSelo()}</aside></section>
<section class="gal-sec"><header class="tit"><p class="k">Estrutura</p><h2>Conheça a oficina por dentro</h2><p>${espera}</p></header>${galeria()}</section></div>
` + cta(v) + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Eletrônica embarcada, mecânica geral e serviços express como troca de óleo, filtros e baterias. Centro Automotivo Bosch Service no Rebouças, Curitiba.') + topo(v, 'servicos') + cab('Serviços', 'Eletrônica, mecânica geral e serviços express', 'fachada-lateral') + `
<div class="in"><section class="bosch-intro"><p class="lead">${bosch}</p>${boschSelo()}</section>
<section class="serv-pag">${servicos.map((s, i) => `<article class="serv-bloco sobe" id="${s.id}"><figure>${img(s.f)}</figure><div><span class="n">0${i + 1}</span><h2>${s.t}</h2><p>${s.d}</p><a class="link-seta" href="${telHref(E.fone)}">Agendar pelo ${E.fone} ${ic('seta')}</a></div></article>`).join('')}</section></div>
` + cta(v) + rodape(v);
  pag.vantagens = head(v, 'vantagens', 'Vantagens', 'Leva & Traz, car wash depois da revisão e sala de espera com TV, wi-fi e café. Veja o que dizem os clientes da Auto Mecânica Adir.') + topo(v, 'vantagens') + cab('Vantagens', 'Leva & Traz, car wash e um cafezinho na espera', 'sala-espera') + `
<div class="in"><section class="vant-sec">${vantLista()}</section>
<section class="depo-sec" id="depoimentos"><header class="tit"><p class="k">O que dizem os nossos clientes</p><h2>Clientes de 10, 15 anos</h2></header>${depoLista()}<p><a class="link-seta" href="${E.avaliar}" target="_blank" rel="noopener">Avalie a oficina no Google ${ic('seta')}</a></p></section></div>
` + cta(v) + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Auto Mecânica Adir: ${E.end}, ${E.bairro}, ${E.cidade}. Telefone ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Ligue, agende e venha tomar um café', 'portao-mural') + `
<div class="in"><section class="contato-pag"><div><h2>Agende seu horário</h2><p class="lead">O agendamento é pelo telefone. Vai viajar? Não deixe para a última hora: antes de pegar a estrada, passe na Auto Mecânica Adir.</p><a class="btn btn-grande" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>${contatoLista()}</div><div>${mapaFrame()}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="cab-a-foto">${img(foto, alt[foto], ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Rebouças · Curitiba · desde 1984</p><h1>Precisa de um mecânico <em>de confiança?</em></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${telHref(E.fone)}">${ic('tel')}Agendar: ${E.fone}</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div><figure class="hero-a-foto">${img('fachada', alt.fachada, ' loading="eager" fetchpriority="high"')}<figcaption>${E.end}, ${E.bairro}</figcaption></figure></div>
<div class="in faixa-a"><p><b>1984</b>no mercado desde</p><p><b>Bosch Service</b>centro automotivo da rede</p><p><b>Leva &amp; Traz</b>buscamos e devolvemos o carro</p></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>Do diagnóstico eletrônico à troca de óleo</h2><p>${bosch}</p></header>${servLista(v)}</section>
<section class="estr-a"><div class="in estr-a-in"><div class="estr-a-fotos"><figure>${img('patio-3')}</figure><figure>${img('recepcao')}</figure><figure>${img('sala-espera')}</figure></div><div><p class="k">A oficina</p><h2>Pátio limpo, recepção e sala de espera com café</h2><p>${historia[2]}</p><a class="link-seta" href="${link(v, 'oficina')}">Nossa história e estrutura ${ic('seta')}</a></div></div></section>
<section class="in vant-a"><header class="tit"><p class="k">Vantagens</p><h2>Seu tempo vale muito</h2></header>${vantLista()}</section>
<section class="depo-a"><div class="in"><header class="tit"><p class="k">Avaliações no Google</p><h2>O que dizem os nossos clientes</h2></header>${depoLista(3)}<a class="link-seta" href="${link(v, 'vantagens')}#depoimentos">Mais avaliações ${ic('seta')}</a></div></section>
<section class="in viagem-a"><figure>${img('portao-mural')}</figure><div><p class="k">Vai viajar?</p><h2>Não deixe para a última hora</h2><p>Antes de pegar a estrada, passe na Auto Mecânica Adir para uma revisão. Agende pelo telefone.</p><p class="bts"><a class="btn" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, alt[foto], ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${img('portao-mural', alt['portao-mural'], ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Auto Mecânica Adir · Rebouças · Curitiba</p><h1>Antes de pegar a estrada, <span>passe no Adir.</span></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Serviços</a></p></div></section>
<section class="placa-b"><div class="in placa-b-in"><div class="placa"><span>desde</span><b>1984</b></div><p>${historia[0]}</p>${boschSelo()}</div></section>
<section class="in servs-b"><header class="tit"><p class="k">Serviços</p><h2>Três frentes na mesma oficina</h2></header>${servLista(v)}</section>
<section class="gal-b"><div class="in"><header class="tit"><p class="k">Estrutura</p><h2>Da recepção ao pátio</h2><p>${espera}</p></header>${galeria(fotos.slice(0, 6))}</div></section>
<section class="in vant-b"><header class="tit"><p class="k">Vantagens</p><h2>Leva &amp; Traz e car wash depois da revisão</h2></header>${vantLista()}</section>
<section class="depo-b"><div class="in"><header class="tit"><p class="k">Avaliações no Google</p><h2>"Uma das melhores oficinas de Curitiba"</h2></header>${depoLista(4)}</div></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Auto Mecânica Adir', artigo: 'da', url: E.url, lang: 'pt', cor: '#005da4', fundo: '#0c1420', claro: '#eef4fa',
  fonteTitulo: 'Archivo,system-ui,sans-serif', fonteTexto: 'Figtree,system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, no azul do logo, com o losango inclinado da marca repetido nos recortes das fotos e nos selos.', pontos: ['"Precisa de um mecânico de confiança?"', 'Eletrônica, mecânica geral e serviços express', 'Leva & Traz, car wash e avaliações do Google'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura, abrindo com o portão da Rota 66 e uma placa "desde 1984", no clima de garagem de estrada.', pontos: ['"Antes de pegar a estrada, passe no Adir"', 'Galeria da recepção ao pátio', 'Quatro avaliações de clientes antigos'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
